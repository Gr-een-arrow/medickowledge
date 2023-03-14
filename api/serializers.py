from rest_framework import serializers
from .models import *
from django.contrib.auth import get_user_model, password_validation

User = get_user_model()

class UserSerializer(serializers.ModelSerializer):
    # profile_picture = serializers.ImageField(max_length=None, allow_empty_file=True, use_url=True)

    class Meta:
        model = User
        fields = ['id', 'username', 'email', 'password', 'profile']
        extra_kwargs = {'password': {'write_only': True}}

    def validate_password(self, value):
        password_validation.validate_password(value)
        return value
    
    def create(self, validated_data):
        user = User.objects.create_user(
            username=validated_data['username'],
            email=validated_data['email'],
            password=validated_data['password']
        )
        return user


# class UserListSerializer(serializers.ModelSerializer):
#     class Meta:
#         model = User
#         fields = ['id', 'username', 'email', 'password']


class CustomerSerializer(serializers.ModelSerializer):
    class Meta:
        model = Customer
        fields = ['id', 'name', 'pincode', 'address']

    address = serializers.CharField(max_length=500, required=False)

    def create(self, validated_data):
        validated_data['profile'] = self.context['request'].user
        return super().create(validated_data)

class CustomerDetailSerializer(serializers.ModelSerializer):
    class Meta:
        model = Customer
        field = ['id', 'name', '']

# class UserProfileSerializer(serializers.ModelSerializer):
#     class Meta:
#         model = UserProfile
#         field = ['id', 'name']