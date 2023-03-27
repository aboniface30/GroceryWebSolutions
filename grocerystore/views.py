from rest_framework import viewsets
from rest_framework.viewsets import GenericViewSet
from django.shortcuts import get_object_or_404
from rest_framework.response import Response
from django_filters.rest_framework import DjangoFilterBackend
from django.db.models import Sum,Avg,Max,Min,Count,F,Q
from rest_framework.mixins import CreateModelMixin, DestroyModelMixin, RetrieveModelMixin, UpdateModelMixin
from .models import Category, Product, Cart, CartItem, Order, OrderItem
from .serializers import CategorySerializer, ProductSerializer, CartSerializer, CartItemSerializer, OrderSerializer, OrderItemSerializer


class CategoryViewSet(viewsets.ModelViewSet):
    queryset = Category.objects.annotate(products_count=Count('products'))
    serializer_class = CategorySerializer

    def delete(self , request , pk):
        collection = get_object_or_404(Category , pk=pk)
        if collection.products.count() > 0:
            return Response({'error': 'This Category cannot be deleted'})
        collection.delete()



class ProductViewSet(viewsets.ModelViewSet):
    queryset = Product.objects.all() 
    serializer_class = ProductSerializer
    filter_backends = [DjangoFilterBackend]
    filterset_fields = ['category_id']

    def get_serializer_context(self):
        return {'request':self.request} 

    def destroy(self, request, *args, **kwargs):
        if OrderItem.objects.filter(product_id = kwargs['pk']).count()>0:
            return Response({'error':'Product cannot be deleted because it contains an order'})
        return super().destroy(request, *args, **kwargs)



class CartViewSet(CreateModelMixin,
                  RetrieveModelMixin,
                  DestroyModelMixin,
                  GenericViewSet):
    queryset = Cart.objects.prefetch_related('items__product').all()
    serializer_class = CartSerializer


class OrderViewSet(viewsets.ModelViewSet):
    queryset = Order.objects.all()
    serializer_class = OrderSerializer


class OrderItemViewSet(viewsets.ModelViewSet):
    queryset = OrderItem.objects.all()
    serializer_class = OrderItemSerializer
