from django.urls import path
from . import views

urlpatterns = [
    path('create-user/', views.CreateUserAPIView.as_view(), name='create-user'),
    path('users/', views.UserListAPIView.as_view(), name='user-list'),
    path('users/me/', views.UserDetailAPIView.as_view(), name='user-create-update-destroy'),
    path('users/create-profile/', views.CreateProfileAPIView.as_view(), name='user-create-update-destroy'),
    path('users/me/upload-picture/', views.UserProfilePictureCreateAPIView.as_view(), name='user-upload-picture'),
    path('users/me/picture/', views.UserProfilePictureRetrieveUpdateDeleteAPIView.as_view(), name='user-retrieve-update-delete-picture'),

    path('requests/', views.RequestListCreateAPIView.as_view(), name='requests'),

    path('requests/<int:pk>/responses/', views.ResponseListAPIView.as_view(), name='responses'),
    path('response/', views.ResponseListCreateAPIView.as_view(), name='response-list-create'),

    path('medicals/', views.MedicalListAPIView.as_view(), name='response-list-create'),

    # path('user_profile/', views.UserProfileCreateAPIView.as_view(), name='user_profile_create'),


    # path('create-cutomer/', views.CustomerListAPIView.as_view(), name='create-user'),


]
