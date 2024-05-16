from django.shortcuts import render
from django.contrib.auth.models import User
from rest_framework import generics, permissions
from .serializers import UserSerializer,  WatchListSerializer
from rest_framework.permissions import IsAuthenticated, AllowAny
from .models import WatchList

# Create your views here.

class CreateUserView(generics.CreateAPIView):
    queryset = User.objects.all()
    serializer_class = UserSerializer
    permission_classes = [AllowAny]

class WatchListAddView(generics.ListCreateAPIView):
    serializer_class = WatchListSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        return WatchList.objects.filter(user=self.request.user)
    
    def perform_create(self, serializer):
        serializer.save(user=self.request.user)

class WatchListDeleteView(generics.DestroyAPIView):
    serializer_class = WatchListSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        return WatchList.objects.filter(user=self.request.user)
