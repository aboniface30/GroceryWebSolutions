from django.urls import path
from  rest_framework.routers import SimpleRouter 
from rest_framework_nested import routers

# from store import views
from . import views


router = routers.DefaultRouter()

router.register('products' , views.ProductViewSet , basename='products')
router.register('customers' , views.ProductViewSet , basename='customers')
router.register('categorys' , views.CategoryViewSet)
router.register('carts' , views.CartViewSet)
router.register('orders' , views.OrderViewSet , basename="orders")

carts_router = routers.NestedDefaultRouter(router, 'carts', lookup='cart')
carts_router.register('items', views.CartItemViewSet, basename='cart-items')

urlpatterns = router.urls + carts_router.urls