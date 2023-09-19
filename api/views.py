from backend import roles
from django.shortcuts import get_object_or_404
from rest_framework.response import Response as DRFResponse
from rest_framework import status
from rest_framework import generics, viewsets, mixins
from rest_framework.permissions import IsAuthenticated, IsAdminUser
from rolepermissions.checkers import has_role
from rolepermissions.mixins import HasRoleMixin
from .serializers import *
from .models import *

class UserListAPIView(generics.ListAPIView):
    # [ TODO Authentiction 'Admin Only' ]
    permission_classes = [IsAuthenticated, IsAdminUser]
    serializer_class = UserSerializer
    queryset = User.objects.all()

# class UserProfileCreateAPIView(generics.CreateAPIView):
#     serializer_class = UserSerializer

class UserDetailAPIView(generics.RetrieveUpdateDestroyAPIView):
    permission_classes = [IsAuthenticated]
    serializer_class = UserDetailSerializer

    def get_object(self):
        return User.objects.select_related('medical_profile', 'customer_profile').prefetch_related('groups').get(pk=self.request.user.pk)

class CreateProfileAPIView(generics.CreateAPIView):
    permission_classes = [IsAuthenticated]
    def get_queryset(self):
        return Medical.objects.all() if has_role(self.request.user, roles.MedicalRole) else Customer.objects.all()
    
    def get_serializer_class(self):
        return MedicalSerializer if has_role(self.request.user, roles.MedicalRole) else CustomerSerializer

class CreateUserAPIView(generics.CreateAPIView):
    serializer_class = UserSerializer
    queryset = User.objects.all()
# TODO: user/me - returns: username, email along with the profile


class UserProfilePictureCreateAPIView(generics.CreateAPIView):
    permission_classes = [IsAuthenticated]
    serializer_class = UserProfilePictureSerializer
    queryset = UserProfilePicture.objects.all()

class UserProfilePictureRetrieveUpdateDeleteAPIView(generics.RetrieveUpdateDestroyAPIView):
    permission_classes = [IsAuthenticated]
    serializer_class = UserProfilePictureSerializer
    def get_object(self):
        # return UserProfilePicture.objects.get(user=self.request.user.pk)
        return get_object_or_404(UserProfilePicture, user=self.request.user.pk)

# class CustomerListAPIView(generics.ListCreateAPIView):
#     queryset = Customer.objects.all()
#     serializer_class = CustomerSerializer

class RequestListCreateAPIView(generics.ListCreateAPIView):
    permission_classes = [IsAuthenticated]
    serializer_class = RequestSerializer

    def get_queryset(self):
        user = self.request.user
        if user.roles == User.CUSTOMER:
            return Request.objects.filter(user=self.request.user)
        else:
            if hasattr(user, 'medical_profile'):
                return Request.objects.select_related('user').filter(user__customer_profile__pincode=self.request.user.medical_profile.pincode)
            # else:
            #     return DRFResponse({'detail': 'Create profile to see request'}, status=status.HTTP_400_BAD_REQUEST)
    
    def post(self, request, *args, **kwargs):
        user = self.request.user
        if user.roles == User.CUSTOMER:
            if hasattr(user, 'customer_profile'):
                return self.create(request, *args, **kwargs)
            else:
                return DRFResponse({'detail': 'Create profile to send request'}, status=status.HTTP_400_BAD_REQUEST)

        else:
            return DRFResponse({'detail': 'only customers can send request'}, status=status.HTTP_400_BAD_REQUEST)

class ResponseListAPIView(HasRoleMixin, generics.ListAPIView):
    permission_classes = [IsAuthenticated]
    allowed_roles = 'customer_role'
    serializer_class = ResponseSerializer

    def get_queryset(self):
        request = get_object_or_404(Request, id=self.kwargs['pk'])
        return Response.objects.prefetch_related('request', 'user').filter(request=request)

class ResponseListCreateAPIView(HasRoleMixin, generics.ListCreateAPIView):
    permission_classes = [IsAuthenticated]
    allowed_roles = 'medical_role'
    serializer_class = ResponseSerializer

    def get_queryset(self):
        return Response.objects.select_related('request', 'user').filter(user=self.request.user, status=1)

    def post(self, request, *args, **kwargs):
        user = self.request.user
        if hasattr(user, 'medical_profile'):
            return self.create(request, *args, **kwargs)
        else:
            return DRFResponse({'detail': 'Create profile to send request'}, status=status.HTTP_400_BAD_REQUEST)

class MedicalListAPIView(HasRoleMixin, generics.ListAPIView):
    permission_classes = [IsAuthenticated]
    allowed_roles = 'customer_role'
    serializer_class = MedicalSerializer
    def get_queryset(self):
        current_user = self.request.user
        return Medical.objects.filter(pincode=current_user.customer_profile.pincode)

    def list(self, request):
        if hasattr(self.request.user, 'customer_profile'):
            queryset = self.filter_queryset(self.get_queryset())
            serializer = self.get_serializer(queryset, many=True)
        else:
            return DRFResponse({'detail': 'Create profile to see nearby medicals'}, status=status.HTTP_400_BAD_REQUEST)

        return DRFResponse(serializer.data)
        
    