from rest_framework import serializers
from .models import CustomUser, Product, ProductVariant, Cart, CartItem, Order, OrderItem

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = CustomUser
        fields = ['id', 'username', 'email', 'avatar_url']

class ProductVariantSerializer(serializers.ModelSerializer):
    class Meta:
        model = ProductVariant
        fields = ['id', 'sku', 'weight', 'price', 'stock']

class ProductSerializer(serializers.ModelSerializer):
    variants = ProductVariantSerializer(many=True, read_only=True)
    
    class Meta:
        model = Product
        fields = ['id', 'name', 'description', 'category', 'image_url', 'is_active', 'variants']

class CartItemSerializer(serializers.ModelSerializer):
    variant_details = ProductVariantSerializer(source='variant', read_only=True)
    product_name = serializers.ReadOnlyField(source='variant.product.name')
    product_image = serializers.ReadOnlyField(source='variant.product.image_url')

    class Meta:
        model = CartItem
        fields = ['id', 'variant', 'variant_details', 'product_name', 'product_image', 'quantity']

class CartSerializer(serializers.ModelSerializer):
    items = CartItemSerializer(many=True, read_only=True)

    class Meta:
        model = Cart
        fields = ['id', 'user', 'session_key', 'items', 'created_at', 'updated_at']

class OrderItemSerializer(serializers.ModelSerializer):
    product_name = serializers.ReadOnlyField(source='variant.product.name')
    weight = serializers.ReadOnlyField(source='variant.weight')

    class Meta:
        model = OrderItem
        fields = ['id', 'variant', 'product_name', 'weight', 'quantity', 'price_at_purchase']

class OrderSerializer(serializers.ModelSerializer):
    items = OrderItemSerializer(many=True, read_only=True)

    class Meta:
        model = Order
        fields = [
            'id', 'user', 'session_key', 'email', 'phone', 
            'shipping_address', 'status', 'total_amount', 
            'payment_reference', 'zoho_invoice_id', 'items', 
            'created_at', 'updated_at'
        ]
