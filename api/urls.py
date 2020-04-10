from django.urls import path
from rest_framework.routers import DefaultRouter
from .views import (
    UserListView,
    ProductListView,
    ProductAttributesListView,
    CategoryListView,
    FavoriteListView,
    AttributeListView
)

app_name = 'api'

urlpatterns = [
    path('users/', UserListView.as_view(), name='users'),
    path('products/', ProductListView.as_view(), name='products'),
    path('products-attributes/', ProductAttributesListView.as_view(),
         name='products-attributes'),
    path('categories/', CategoryListView.as_view(), name='categories'),
    path('favorites/', FavoriteListView.as_view(), name='favorites'),
    path('attributes/', AttributeListView.as_view(), name='attributes'),
]
