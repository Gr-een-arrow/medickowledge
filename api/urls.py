from django.urls import path
from . import views

urlpatterns = [
    path('customers/', views.customer_view)
]