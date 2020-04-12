from django.db import models
from django.conf import settings
from django.shortcuts import reverse


class Product(models.Model):

    name = models.CharField(max_length=200)
    price = models.FloatField()
    description = models.TextField()
    slug = models.SlugField()
    category = models.ForeignKey("api.Category", on_delete=models.CASCADE)

    class Meta:
        verbose_name = "product"
        verbose_name_plural = "products"

    def __str__(self):
        return self.name

    def get_absolute_url(self):
        return reverse("api:product_detail", kwargs={"slug": self.slug})


class ProductAttribute(models.Model):

    product = models.ForeignKey("api.Product", on_delete=models.CASCADE)
    attribute = models.ForeignKey("api.Attribute", on_delete=models.CASCADE)
    value = models.CharField(max_length=50)

    def __str__(self):
        return self.attribute.public_name + ' - ' + self.value


class Category(models.Model):

    public_name = models.CharField(max_length=100)
    slug = models.SlugField()

    class Meta:
        verbose_name = "category"
        verbose_name_plural = "categories"

    def __str__(self):
        return self.public_name

    def get_absolute_url(self):
        return reverse("api:category_detail", kwargs={"slug": self.slug})


class Attribute(models.Model):

    public_name = models.CharField(max_length=200)
    description = models.TextField()
    slug = models.SlugField()

    class Meta:
        verbose_name = "attribute"
        verbose_name_plural = "attributes"

    def __str__(self):
        return self.public_name


class Favorite(models.Model):

    products = models.ManyToManyField("api.Product")
    user = models.ForeignKey(settings.AUTH_USER_MODEL,
                             on_delete=models.CASCADE)

    class Meta:
        verbose_name = "favorite"
        verbose_name_plural = "favorites"

    def __str__(self):
        return self.user.username
