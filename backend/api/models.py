from django.db import models
from django.contrib.auth.models import User

# Create your models here.

class WatchList(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name="watchlist")
    stock_symbol = models.CharField(max_length=10, unique=True)
    name = models.CharField(max_length=100, default="")
    type = models.CharField(max_length=50, default="")
    region = models.CharField(max_length=50, default="")
    market_open = models.CharField(max_length=10, default="08:00")
    market_close = models.CharField(max_length=10, default="16:30")
    timezone = models.CharField(max_length=20, default="UTC+00")
    currency = models.CharField(max_length=10, default="USD")

    def __str__(self):
        return self.stock_symbol