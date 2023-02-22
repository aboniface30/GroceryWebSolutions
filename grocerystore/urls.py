from django.urls import path
from  rest_framework.routers import SimpleRouter 
from rest_framework_nested import routers

# from store import views
from . import views


router = routers.DefaultRouter()

router.register('products' , views.ProductViewSet , basename='products')
router.register('categorys' , views.CategoryViewSet)


urlpatterns = router.urls 