# Generated by Django 4.1.7 on 2023-03-26 10:55

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('grocerystore', '0002_remove_product_image_product_imagelink_and_more'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='category',
            name='slug',
        ),
    ]