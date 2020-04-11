from rest_framework import serializers
from rest_framework.response import Response
from rest_framework import status

from .models import (
    Product,
    Category,
    Attribute,
    Favorite,
    ProductAttribute
)
from django.contrib.auth.models import User
from django.conf import settings
from django.core.paginator import Paginator


class CategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = Category
        fields = ('id', 'public_name', 'slug')


class ProductSerializer(serializers.ModelSerializer):
    category = serializers.SerializerMethodField()

    class Meta:
        model = Product
        fields = ('id', 'name', 'price', 'description',
                  'slug', 'category')

    def get_category(self, obj):
        return CategorySerializer(obj.category).data


class ProductAttributeSerializer(serializers.ModelSerializer):
    product = serializers.SerializerMethodField()
    attribute = serializers.SerializerMethodField()

    class Meta:
        model = ProductAttribute
        fields = (
            'id', 'product', 'attribute', 'value'
        )

    def get_product(self, obj):
        return ProductSerializer(obj.product).data

    def get_attribute(self, obj):
        return AttributeSerializer(obj.attribute).data


class AttributeSerializer(serializers.ModelSerializer):
    class Meta:
        model = Attribute
        fields = ('id', 'public_name', 'description', 'slug')


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = '__all__'


class FavoriteSerializer(serializers.ModelSerializer):
    products = serializers.SerializerMethodField()
    user = serializers.SerializerMethodField()

    class Meta:
        model = Favorite
        fields = ('id', 'products', 'user')

    def get_products(self, obj):
        page_size = self.context['request'].query_params.get('size') or 5
        paginator = Paginator(obj.products.all(), page_size)
        page = self.context['request'].query_params.get('page') or 1

        products_in_page = paginator.page(page)
        serializer = ProductSerializer(products_in_page, many=True)

        return serializer.data

    def get_user(self, obj):
        return UserSerializer(obj.user).data

    def paginated_products(self, obj):
        page_size = self.context['request'].query_params.get('size') or 1
        paginator = Paginator(obj.products.all(), page_size)
        page = self.context['request'].query_params.get('page') or 1

        products_in_page = paginator.page(page)
        serializer = ProductSerializer(products_in_page, many=True)

        return serializer.data
