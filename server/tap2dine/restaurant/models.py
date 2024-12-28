from django.db import models

# Create your models here.
class Table(models.Model):
    name = models.CharField(unique=True, max_length=40)
    qr_code = models.ImageField(upload_to = "qrcodes/", blank=True, null=True)

    def __str__(self):
        return self.name

class Dish(models.Model):
    name = models.CharField(max_length=100, unique=True)
    description = models.TextField(blank=True)
    price = models.DecimalField(max_digits=10, decimal_places=2)
    ingredients = models.ManyToManyField('Ingredient', related_name='dishes', blank=True)
    add_ons = models.ManyToManyField('AddOn', related_name='dishes', blank=True)

    def __str__(self):
        return self.name


class Ingredient(models.Model):
    name = models.CharField(max_length=100, unique=True)
    quantity_available = models.PositiveIntegerField(default=0)

    def __str__(self):
        return self.name


class AddOn(models.Model):
    name = models.CharField(max_length=100, unique=True)
    price = models.DecimalField(max_digits=10, decimal_places=2)

    def __str__(self):
        return self.name
