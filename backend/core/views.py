from rest_framework import viewsets, status
from rest_framework.decorators import action
from rest_framework.response import Response
from rest_framework.permissions import AllowAny, IsAdminUser
from decimal import Decimal
from django.db import transaction
from django.db.models import Q
from django.shortcuts import get_object_or_404
from .models import CustomUser, Product, ProductVariant, Cart, CartItem, Order, OrderItem
from .serializers import (
    ProductSerializer, ProductVariantSerializer, 
    CartSerializer, CartItemSerializer, OrderSerializer
)

class ProductViewSet(viewsets.ModelViewSet):
    queryset = Product.objects.filter(is_active=True).order_by('-created_at')
    serializer_class = ProductSerializer
    permission_classes = [AllowAny]

    def get_queryset(self):
        queryset = super().get_queryset()
        category = self.request.query_params.get('category')
        search = self.request.query_params.get('search')
        
        if category:
            queryset = queryset.filter(category=category)
        if search:
            queryset = queryset.filter(
                Q(name__icontains=search) | 
                Q(description__icontains=search)
            )
        return queryset

class AdminInventoryViewSet(viewsets.ModelViewSet):
    queryset = Product.objects.all().order_by('-created_at')
    serializer_class = ProductSerializer
    permission_classes = [AllowAny] # Can be restricted to IsAdminUser in production

    @action(detail=True, methods=['post'])
    def update_stock(self, request, pk=None):
        product = self.get_object()
        variant_id = request.data.get('variant_id')
        new_stock = request.data.get('stock')
        
        try:
            variant = product.variants.get(id=variant_id)
            variant.stock = new_stock
            variant.save()
            return Response(ProductVariantSerializer(variant).data)
        except ProductVariant.DoesNotExist:
            return Response({'error': 'Variant not found'}, status=status.HTTP_404_NOT_FOUND)

class CartViewSet(viewsets.ViewSet):
    permission_classes = [AllowAny]

    def _get_or_create_cart(self, request):
        user = request.user if request.user.is_authenticated else None
        session_key = request.META.get('HTTP_X_SESSION_KEY') or request.session.session_key
        
        if not session_key and not user:
            # Generate a temporary session key if not provided
            import uuid
            session_key = str(uuid.uuid4())
            
        if user:
            cart, _ = Cart.objects.get_or_create(user=user)
        else:
            cart, _ = Cart.objects.get_or_create(session_key=session_key)
            
        return cart, session_key

    def list(self, request):
        cart, session_key = self._get_or_create_cart(request)
        serializer = CartSerializer(cart)
        # Return both cart and the session key in headers/body for guest persistence
        return Response({
            'cart': serializer.data,
            'session_key': session_key
        })

    @action(detail=False, methods=['post'])
    def add_item(self, request):
        cart, _ = self._get_or_create_cart(request)
        variant_id = request.data.get('variant_id')
        quantity = int(request.data.get('quantity', 1))

        try:
            variant = ProductVariant.objects.get(id=variant_id)
        except ProductVariant.DoesNotExist:
            return Response({'error': 'Product variant not found'}, status=status.HTTP_404_NOT_FOUND)

        cart_item, created = CartItem.objects.get_or_create(cart=cart, variant=variant)
        if not created:
            cart_item.quantity += quantity
        else:
            cart_item.quantity = quantity
        cart_item.save()

        return Response(CartSerializer(cart).data)

    @action(detail=False, methods=['post'])
    def remove_item(self, request):
        cart, _ = self._get_or_create_cart(request)
        variant_id = request.data.get('variant_id')
        
        try:
            cart_item = CartItem.objects.get(cart=cart, variant_id=variant_id)
            cart_item.delete()
        except CartItem.DoesNotExist:
            pass

        return Response(CartSerializer(cart).data)

class OrderViewSet(viewsets.ModelViewSet):
    serializer_class = OrderSerializer
    permission_classes = [AllowAny]

    def get_queryset(self):
        if self.request.user.is_authenticated:
            return Order.objects.filter(user=self.request.user).order_by('-created_at')
        session_key = self.request.META.get('HTTP_X_SESSION_KEY')
        if session_key:
            return Order.objects.filter(session_key=session_key).order_by('-created_at')
        return Order.objects.none()

    @transaction.atomic
    def create(self, request, *args, **kwargs):
        user = request.user if request.user.is_authenticated else None
        session_key = request.META.get('HTTP_X_SESSION_KEY')
        cart_id = request.data.get('cart_id')

        try:
            cart = Cart.objects.prefetch_related('items__variant').get(id=cart_id)
        except Cart.DoesNotExist:
            return Response({'error': 'Cart not found'}, status=status.HTTP_404_NOT_FOUND)

        if not cart.items.exists():
            return Response({'error': 'Cart is empty'}, status=status.HTTP_400_BAD_REQUEST)

        # Validate stock levels
        for item in cart.items.all():
            if item.variant.stock < item.quantity:
                return Response({
                    'error': f"Insufficient stock for {item.variant.product.name} ({item.variant.weight}). Only {item.variant.stock} left."
                }, status=status.HTTP_400_BAD_REQUEST)

        # Create Order
        email = request.data.get('email')
        phone = request.data.get('phone')
        shipping_address = request.data.get('shipping_address')
        payment_reference = request.data.get('payment_reference') # e.g. from Stripe checkout

        subtotal = sum(item.variant.price * item.quantity for item in cart.items.all())
        shipping_cost = Decimal('0') if subtotal > 35 else Decimal('5.0')
        tax = subtotal * Decimal('0.08')
        total_amount = subtotal + shipping_cost + tax

        order = Order.objects.create(
            user=user,
            session_key=session_key,
            email=email,
            phone=phone,
            shipping_address=shipping_address,
            total_amount=total_amount,
            payment_reference=payment_reference,
            status='PAID' if payment_reference else 'PENDING'
        )

        # Create OrderItems & deduct stock
        for item in cart.items.all():
            OrderItem.objects.create(
                order=order,
                variant=item.variant,
                quantity=item.quantity,
                price_at_purchase=item.variant.price
            )
            item.variant.stock -= item.quantity
            item.variant.save()

        # Clear Cart
        cart.items.all().delete()

        # Mock Zoho Invoice sync trigger
        # In production, Celery background job is triggered here.
        order.zoho_invoice_id = f"ZOHO-INV-{order.id}"
        order.save()

        return Response(OrderSerializer(order).data, status=status.HTTP_201_CREATED)
