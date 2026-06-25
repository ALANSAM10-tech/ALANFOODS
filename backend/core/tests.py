from django.test import TestCase
from django.urls import reverse
from rest_framework import status
from rest_framework.test import APIClient
from .models import Product, ProductVariant, Cart, CartItem, Order, OrderItem

class ECommerceAPITests(TestCase):
    def setUp(self):
        self.client = APIClient()
        
        # Create test product and variant
        self.product = Product.objects.create(
            name="Test Pepper",
            description="Premium black pepper from Wayanad.",
            category="SPICES"
        )
        self.variant_250 = ProductVariant.objects.create(
            product=self.product,
            weight="250g",
            price=8.99,
            stock=50,
            sku="TEST-PEP-250"
        )
        self.variant_500 = ProductVariant.objects.create(
            product=self.product,
            weight="500g",
            price=15.99,
            stock=10,
            sku="TEST-PEP-500"
        )

    def test_get_product_list(self):
        url = reverse('product-list')
        response = self.client.get(url)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(len(response.data), 1)
        self.assertEqual(response.data[0]['name'], "Test Pepper")

    def test_filter_product_by_category(self):
        url = reverse('product-list')
        # Filter matching
        response = self.client.get(url, {'category': 'SPICES'})
        self.assertEqual(len(response.data), 1)
        
        # Filter not matching
        response = self.client.get(url, {'category': 'NUTS'})
        self.assertEqual(len(response.data), 0)

    def test_cart_operations(self):
        # 1. Retrieve cart (creates one)
        url = reverse('cart-list')
        response = self.client.get(url, HTTP_X_SESSION_KEY="test-session")
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        cart_id = response.data['cart']['id']
        
        # 2. Add item to cart
        add_url = reverse('cart-add-item')
        response = self.client.post(
            add_url,
            {'variant_id': self.variant_250.id, 'quantity': 2},
            format='json',
            HTTP_X_SESSION_KEY="test-session"
        )
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        
        cart = Cart.objects.get(id=cart_id)
        self.assertEqual(cart.items.count(), 1)
        self.assertEqual(cart.items.first().quantity, 2)

    def test_checkout_reduces_stock(self):
        # 1. Create a cart with item
        cart = Cart.objects.create(session_key="test-session")
        CartItem.objects.create(cart=cart, variant=self.variant_500, quantity=3)

        # 2. Place order
        url = reverse('order-list')
        checkout_data = {
            'cart_id': cart.id,
            'email': 'customer@test.com',
            'phone': '1234567890',
            'shipping_address': '456 organic lane, Kerala, India',
            'payment_reference': 'ch_mock123'
        }
        
        response = self.client.post(
            url,
            checkout_data,
            format='json',
            HTTP_X_SESSION_KEY="test-session"
        )
        
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        
        # 3. Confirm stock was deducted
        self.variant_500.refresh_from_db()
        self.assertEqual(self.variant_500.stock, 7) # 10 initial - 3 purchased

        # 4. Confirm cart was cleared
        self.assertEqual(cart.items.count(), 0)
