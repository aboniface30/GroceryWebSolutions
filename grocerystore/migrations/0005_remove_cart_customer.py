# Generated by Django 4.1.7 on 2023-03-27 13:30

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('grocerystore', '0004_alter_cart_id_alter_cartitem_product'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='cart',
            name='customer',
        ),
    ]
