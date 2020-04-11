from rest_framework.pagination import (
    LimitOffsetPagination,
    PageNumberPagination
)


class ProductsLimitOffsetPagination(LimitOffsetPagination):
    default_limit = 1
    max_limit = 10


class ProductPageNumberPagination(PageNumberPagination):
    page_size = 2
