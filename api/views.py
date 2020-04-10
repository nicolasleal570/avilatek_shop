from django.conf import settings
from django.shortcuts import get_object_or_404
from .serializers import UserSerializer
from rest_framework import viewsets
from rest_framework.generics import (
    ListAPIView, RetrieveAPIView, CreateAPIView,
    UpdateAPIView, DestroyAPIView
)
from rest_framework.views import APIView

from rest_framework.permissions import AllowAny, IsAuthenticated
from rest_framework.response import Response
from rest_framework.status import HTTP_200_OK, HTTP_400_BAD_REQUEST

from django.conf import settings
from django.core.exceptions import ObjectDoesNotExist
from django.http import Http404
from django.shortcuts import render, get_object_or_404

from django.contrib.auth.models import User
from .models import (
    Product,
    Category,
    Attribute,
    Favorite,
    ProductAttribute
)

from .serializers import (
    UserSerializer,
    ProductSerializer,
    CategorySerializer,
    AttributeSerializer,
    FavoriteSerializer,
    ProductAttributeSerializer
)


class UserListView(ListAPIView):
    permission_classes = (AllowAny,)
    serializer_class = UserSerializer
    queryset = User.objects.all()


class ProductListView(ListAPIView):
    permission_classes = (AllowAny,)
    serializer_class = ProductSerializer
    queryset = Product.objects.all()


class ProductAttributesListView(ListAPIView):
    permission_classes = (AllowAny,)
    serializer_class = ProductAttributeSerializer
    queryset = ProductAttribute.objects.all()


class CategoryListView(ListAPIView):
    permission_classes = (AllowAny,)
    serializer_class = CategorySerializer
    queryset = Category.objects.all()


class FavoriteListView(ListAPIView):
    permission_classes = (AllowAny,)
    serializer_class = FavoriteSerializer
    queryset = Favorite.objects.all()


class AttributeListView(ListAPIView):
    permission_classes = (AllowAny,)
    serializer_class = AttributeSerializer
    queryset = Attribute.objects.all()
