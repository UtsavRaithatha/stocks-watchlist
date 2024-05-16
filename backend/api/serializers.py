from django.contrib.auth.models import User
from rest_framework import serializers
from .models import WatchList

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ["id", "username", "password"]
        extra_kwargs = {"password": {"write_only": True}}

    def create(self, validated_data):
        user = User.objects.create_user(**validated_data)
        return user

class WatchListSerializer(serializers.ModelSerializer):
    class Meta:
        model = WatchList
        fields = ["id", "user", "stock_symbol", "name", "type", "region", "market_open", "market_close", "timezone", "currency"]
        extra_kwargs = {"user": {"read_only": True}}
    
    def create(self, validated_data):
        watchlist = WatchList.objects.create(**validated_data)
        return watchlist
