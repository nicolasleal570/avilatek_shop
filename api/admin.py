from django.contrib import admin
from .models import (
    Product,
    ProductAttribute,
    Category,
    Attribute,
    Favorite,
)

admin.site.register(Product)
admin.site.register(Category)
admin.site.register(Attribute)
admin.site.register(ProductAttribute)
admin.site.register(Favorite)
