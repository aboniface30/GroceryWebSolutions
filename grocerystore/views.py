from rest_framework import viewsets
from rest_framework.viewsets import GenericViewSet
from django.shortcuts import get_object_or_404
from rest_framework.response import Response
from django_filters.rest_framework import DjangoFilterBackend
from django.db.models import Sum,Avg,Max,Min,Count,F,Q
from rest_framework.permissions import IsAdminUser, IsAuthenticated
from rest_framework.mixins import CreateModelMixin, DestroyModelMixin, RetrieveModelMixin, UpdateModelMixin
from .models import Category, Product,Customer, Cart, CartItem, Order, OrderItem
from .serializers import CategorySerializer, ProductSerializer, CartSerializer, CartItemSerializer, OrderSerializer, OrderItemSerializer,AddCartItemSerializer,UpdateCartItemSerializer,UpdateOrderSerializer,CreateOrderSerializer


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



class CartItemViewSet(viewsets.ModelViewSet):
    http_method_names = ['get', 'post', 'patch', 'delete']

    def get_serializer_class(self):
        if self.request.method == 'POST':
            return AddCartItemSerializer
        elif self.request.method == 'PATCH':
            return UpdateCartItemSerializer
        return CartItemSerializer

    def get_serializer_context(self):
        return {'cart_id': self.kwargs['cart_pk']}

    def get_queryset(self):
        return CartItem.objects \
            .filter(cart_id=self.kwargs['cart_pk']) \
            .select_related('product')




class OrderViewSet(viewsets.ModelViewSet):
    http_method_names = ['get', 'post', 'patch', 'delete', 'head', 'options']

    def get_permissions(self):
        if self.request.method in ['PATCH', 'DELETE']:
            return [IsAdminUser()]
        return [IsAuthenticated()]

    def create(self, request, *args, **kwargs):
        serializer = CreateOrderSerializer(
            data=request.data,
            context={'user_id': self.request.user.id})
        serializer.is_valid(raise_exception=True)
        order = serializer.save()
        serializer = OrderSerializer(order)
        return Response(serializer.data)

    def get_serializer_class(self):
        if self.request.method == 'POST':
            return CreateOrderSerializer
        elif self.request.method == 'PATCH':
            return UpdateOrderSerializer
        return OrderSerializer

    def get_queryset(self):
        user = self.request.user

        if user.is_staff:
            return Order.objects.all()

        (customer_id,created) = Customer.objects.only(
            'id').get_or_create(user_id=user.id)
        return Order.objects.filter(customer_id=customer_id)



# class OrderItemViewSet(viewsets.ModelViewSet):
#     queryset = OrderItem.objects.all()
#     serializer_class = OrderItemSerializer
