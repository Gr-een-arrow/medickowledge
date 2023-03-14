from rest_framework import generics, viewsets
from .serializers import *
from .models import *

class UserListAPIView(generics.ListAPIView):
    # [ TODO Authentiction 'Admin Only' ]
    serializer_class = UserSerializer
    queryset = User.objects.all()

class UserProfileCreateAPIView(generics.CreateAPIView):
    serializer_class = UserSerializer

class UserDetailAPIView(generics.RetrieveUpdateDestroyAPIView):
    queryset = User.objects.all()
    serializer_class = UserSerializer

class CreateUserAPIView(generics.CreateAPIView):
    queryset = User.objects.all()
    serializer_class = UserSerializer

# TODO: user/me - returns: username, email along with the profile


class CustomerListAPIView(generics.ListCreateAPIView):
    queryset = Customer.objects.all()
    serializer_class = CustomerSerializer