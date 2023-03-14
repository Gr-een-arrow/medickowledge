from django.urls import path
from . import views

urlpatterns = [
    path('users/', views.UserListAPIView.as_view(), name='user-list'),
    path('users/<int:pk>', views.UserDetailAPIView.as_view(), name='user-create-update-destroy'),
    path('create-user/', views.CreateUserAPIView.as_view(), name='create-user'),
    path('user_profile/', views.UserProfileCreateAPIView.as_view(), name='user_profile_create'),


    path('create-cutomer/', views.CustomerListAPIView.as_view(), name='create-user'),


]
