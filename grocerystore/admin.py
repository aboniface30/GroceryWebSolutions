from django.contrib import admin
from django.contrib import admin, messages
from django.db.models.aggregates import Count
from django.db.models.query import QuerySet
from django.utils.html import format_html, urlencode
from django.urls import reverse
from .models import Customer, Category, Product , Order

@admin.register(Customer)
class CustomerAdmin(admin.ModelAdmin):
    list_display = ('first_name', 'email', 'orders')
    list_per_page = 25
    search_fields = ('first_name', 'last_name', 'email')

    @admin.display(ordering='orders_count')
    def orders(self, customer):

        return customer.orders_count

    def get_queryset(self, request):
        return super().get_queryset(request).annotate(
            orders_count=Count('order')
        )

@admin.register(Category)
class CategoryAdmin(admin.ModelAdmin):
    list_display = ('name',)
    list_per_page = 25
    ordering = ('name',)
    search_fields = ('name',)

@admin.register(Product)
class ProductAdmin(admin.ModelAdmin):
    list_display = ('name', 'description', 'price', 'stock','category' )
    list_per_page = 25
    ordering = ('-id',)
    list_editable =['price']
    search_fields = ('name', 'description', 'category__name')
    autocomplete_fields = ['category']
    prepopulated_fields = {
        'slug': ['name']
    }

    list_select_related = ['category']


@admin.register(Order)
class OrderAdmin(admin.ModelAdmin):
    list_display = ('placed_at', 'payment_status', 'customer_username' )
    list_per_page = 25
    ordering = ('-id',)
    list_editable =['payment_status']
    search_fields = ('customer__name',)
    
    list_select_related = ['customer']


    def customer_username(self, order):
        return order.customer.user.username

