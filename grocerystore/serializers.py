from rest_framework import serializers
from decimal import Decimal
from .models import Category, Product, Order , OrderItem , Customer, Cart , CartItem

class CategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = Category
        fields = ('id', 'name', 'slug')
from rest_framework import serializers
from .models import Category, Product, Cart, CartItem, Order, OrderItem




class ProductSerializer(serializers.ModelSerializer):
    class Meta:
        model = Product
        fields = ('id', 'name', 'slug', 'description', 'price', 'image', 'stock', 'available', 'created', 'updated', 'category')

class CategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = Category
        fields = ('id', 'name', 'slug' , "products_count")
        products_count = serializers.IntegerField(read_only=True)

class CartItemSerializer(serializers.ModelSerializer):
    class Meta:
        model = CartItem
        fields = ('id', 'product', 'quantity')


class CartSerializer(serializers.ModelSerializer):
    class Meta:
        model = Cart
        fields = ('id', 'customer', 'created', 'items')


class OrderItemSerializer(serializers.ModelSerializer):
    class Meta:
        model = OrderItem
        fields = ('id', 'product', 'quantity' )


class OrderSerializer(serializers.ModelSerializer):
    class Meta:
        model = Order
        fields = ('id', 'customer', 'placed_at', 'payment_status')        