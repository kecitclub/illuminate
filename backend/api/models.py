from django.db import models
from django.contrib.auth.models import AbstractUser

class CustomUser(AbstractUser):
    is_admin = models.BooleanField(default=False)
    password = models.CharField(max_length=128, null=True, blank=True)

class Complaint(models.Model):

    title = models.CharField(max_length=400)
    description = models.CharField(max_length=10000)
    created_at = models.DateTimeField(auto_now_add=True)
    user = models.ForeignKey(CustomUser, on_delete=models.CASCADE)