import qrcode
from io import BytesIO
from django.core.files.base import ContentFile
from django.db import models

# Create your models here.
class Table(models.Model):
    table_name = models.CharField(unique=True, max_length=40)
    qr_code = models.ImageField(upload_to = "qrcodes/", blank=True, null=True)

    def __str__(self):
        return self.table_name
