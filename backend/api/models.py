from django.db import models
from django.contrib.auth.models import AbstractUser
from django.core.validators import MinValueValidator, MaxValueValidator

class CustomUser(AbstractUser):
    is_admin = models.BooleanField(default=False)
    password = models.CharField(max_length=128, null=True, blank=True)

class Complaint(models.Model):

    title = models.CharField(max_length=400)
    description = models.CharField(max_length=10000)
    location = models.CharField(max_length=500, default='none')
    created_at = models.DateTimeField(auto_now_add=True)
    user = models.ForeignKey(CustomUser, on_delete=models.CASCADE)
    progress = models.IntegerField( validators=[
            MinValueValidator(0),
            MaxValueValidator(100)
        ],default=0)
    admin_verified = models.BooleanField(default=False)