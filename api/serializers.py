from rest_framework import serializers
from backend import roles
from rolepermissions.checkers import has_role
from django.contrib.auth import get_user_model, password_validation
from .models import *
User = get_user_model()

class UserSerializer(serializers.ModelSerializer):
    # profile_picture = serializers.ImageField(max_length=None, allow_empty_file=True, use_url=True)

    class Meta:
        model = User
        fields = ['id', 'username', 'email', 'password', 'roles']
        extra_kwargs = {'password': {'write_only': True}}

    def validate_password(self, value):
        password_validation.validate_password(value)
        return value
    
    def create(self, validated_data):
        
        user = User.objects.create_user(
            username=validated_data['username'],
            email=validated_data['email'],
            password=validated_data['password'],
            roles=validated_data['roles']
        )
        return user


class UserProfilePictureSerializer(serializers.ModelSerializer):
    class Meta:
        model = UserProfilePicture
        fields = ['id', 'profile_picture']

    def create(self, validated_data):
        validated_data['user'] = self.context['request'].user
        return super().create(validated_data)

class CustomerSerializer(serializers.ModelSerializer):
    class Meta:
        model = Customer
        fields = ['id', 'name', 'address', 'pincode']

    def create(self, validated_data):
        validated_data['profile'] = self.context['request'].user
        return super().create(validated_data)

class MedicalSerializer(serializers.ModelSerializer):
    class Meta:
        model = Medical
        fields = ['id', 'name', 'address', 'state', 'country', 'pincode', 'phone', 'description']

    def create(self, validated_data):
        validated_data['profile'] = self.context['request'].user
        return super().create(validated_data)


class UserDetailSerializer(serializers.ModelSerializer):
       
    def profile(self, obj):
        try:
            profile = obj.medical_profile if has_role(obj, roles.MedicalRole) else obj.customer_profile
            serializer = MedicalSerializer(profile) if has_role(obj, roles.MedicalRole) else CustomerSerializer(profile)
            return serializer.data
        except:
            return None

    class Meta:
        model = User
        fields = ['id', 'email', 'username', 'user_profile']
        # extra_kwagrs = {'profile': {'read_only': True}}

    user_profile = serializers.SerializerMethodField(method_name='profile')
 


class RequestSerializer(serializers.ModelSerializer):
    photo = serializers.ImageField(required=False)
    description = serializers.CharField(max_length=500, required=False)
    class Meta:
        model = Request
        fields = ['id', 'medicine','description', 'photo']

    def create(self, validated_data):
        validated_data['user'] = self.context['request'].user
        return super().create(validated_data)
    



class ResponseSerializer(serializers.ModelSerializer):
    class Meta:
        model = Response
        fields = ['id', 'request', 'medical', 'status', 'description']
        

    def create(self, validated_data):
        validated_data['user'] = self.context['request'].user
        return super().create(validated_data)

    medical = serializers.SerializerMethodField(method_name='get_medical')

    def get_medical(self, obj):
        profile = obj.user.medical_profile
        serializer = MedicalSerializer(profile)
        return serializer.data