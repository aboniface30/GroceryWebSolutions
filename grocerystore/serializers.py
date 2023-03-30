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
        fields = ('id', 'name', 'description', 'price', 'imageLink', 'stock', 'available', 'created', 'updated', 'category')

class SimpleProductSerializer(serializers.ModelSerializer):
    class Meta:
        model = Product
        fieds = ('id' , 'name' , 'description' , 'price')

class CategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = Category
        fields = ('id', 'name' , "products_count")
        products_count = serializers.IntegerField(read_only=True)

class CartItemSerializer(serializers.ModelSerializer):
    product = SimpleProductSerializer()
    total_price = serializers.SerializerMethodField()

    def get_total_price(self, cart_item: CartItem):
        return cart_item.quantity * cart_item.product.price

    class Meta:
        model = CartItem
        fields = ('id', 'product', 'quantity' , 'total_price')


class CartSerializer(serializers.ModelSerializer):

    id = serializers.UUIDField(read_only=True)
    items  = CartItemSerializer(many=True , read_only=True)
    total_price = serializers.SerializerMethodField()

    def get_total_price(self, cart):
        return sum([item.quantity * item.product.price for item in cart.items.all()])

    class Meta:
        model = Cart
        fields = ('id', 'items' , 'total_price')


class OrderItemSerializer(serializers.ModelSerializer):
    product = ProductSerializer()
    class Meta:
        model = OrderItem
        fields = ('id', 'product', 'quantity' )


class OrderSerializer(serializers.ModelSerializer):
    items = OrderItemSerializer(many=True)
    class Meta:
        model = Order
        fields = ('id', 'customer', 'placed_at', 'items', 'payment_status')        