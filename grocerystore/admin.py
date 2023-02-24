from django.contrib import admin
from .models import Customer, Category, Product

@admin.register(Customer)
class CustomerAdmin(admin.ModelAdmin):
    list_display = ('first_name', 'last_name', 'email', 'phone')
    list_per_page = 25
    search_fields = ('first_name', 'last_name', 'email')

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

