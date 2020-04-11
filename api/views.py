from django.conf import settings
from django.shortcuts import get_object_or_404
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
from django.shortcuts import get_object_or_404

from .serializers import UserSerializer

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

from .pagination import (
    ProductsLimitOffsetPagination,
    ProductPageNumberPagination
)


class UserListView(ListAPIView):
    permission_classes = (AllowAny,)
    serializer_class = UserSerializer
    queryset = User.objects.all()


class ProductListView(ListAPIView):
    permission_classes = (AllowAny,)
    serializer_class = ProductSerializer
    queryset = Product.objects.all()
    pagination_class = ProductsLimitOffsetPagination


class ProductAttributesListView(ListAPIView):
    permission_classes = (AllowAny,)
    serializer_class = ProductAttributeSerializer
    queryset = ProductAttribute.objects.all()
    pagination_class = ProductsLimitOffsetPagination


class CategoryListView(ListAPIView):
    permission_classes = (AllowAny,)
    serializer_class = CategorySerializer
    queryset = Category.objects.all()
    pagination_class = ProductsLimitOffsetPagination


class FavoriteListView(RetrieveAPIView):
    serializer_class = FavoriteSerializer
    permission_classes = (IsAuthenticated,)

    def get_object(self):
        try:
            favorite = Favorite.objects.get(user=self.request.user)
            return favorite
        except ObjectDoesNotExist:
            raise Http404("Aun no has agregado objetos a tus favoritos.")


class AttributeListView(ListAPIView):
    permission_classes = (AllowAny,)
    serializer_class = AttributeSerializer
    queryset = Attribute.objects.all()
    pagination_class = ProductsLimitOffsetPagination


class AddToFavorite(APIView):
    permission_classes = (IsAuthenticated,)

    def post(self, request, *args, **kwargs):
        slug = request.data.get('slug', None)
        user = request.user

        if slug is None:
            return Response({"message": "El slug es requerido"}, status=HTTP_400_BAD_REQUEST)

        product = get_object_or_404(Product, slug=slug)

        favorites = Favorite.objects.filter(user=user)

        if favorites.exists():
            favorite = favorites.first()
            favorite.products.add(product)
        else:
            favorite = Favorite.objects.create(
                user=user
            )
            favorite.products.add(product)
            favorite.save()

        return Response(status=HTTP_200_OK)
