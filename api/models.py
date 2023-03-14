from django.db import models
from django.contrib.auth.models import AbstractUser

# Create your models here.
class User(AbstractUser):
    email = models.EmailField(unique=True)

    def __str__(self):
        return self.username

class Medical(models.Model):
    name = models.CharField(max_length=255)
    profile = models.OneToOneField(
        User, 
        on_delete=models.CASCADE, 
        related_name='medical_profile'
    )
    address = models.TextField()
    state = models.CharField(max_length=255)
    country = models.CharField(max_length=255)
    pincode = models.IntegerField()
    phone = models.CharField(max_length=10, default='')
    description = models.TextField(null=True, blank=True)

    def __str__(self):
        return self.name

class Customer(models.Model):
    name = models.CharField(max_length=255)
    profile = models.OneToOneField(
        User, 
        on_delete=models.CASCADE, 
        related_name='customer_profile'
    )
    address = models.TextField()
    pincode = models.IntegerField()

    def __str__(self):
        return self.name
    
# class UserProfile(models.Model):
#     user = models.ForeignKey(User, on_delete=models.CASCADE, related_name='profile_picture')
#     profile = models.ImageField(upload_to='profiles/', blank=True, null=True)

class Request(models.Model):
    customer = models.ForeignKey(Customer, related_name='requests', on_delete=models.DO_NOTHING)
    medicine = models.CharField(max_length=255)
    
    def __str__(self):
        return self.medicine
    
class Response(models.Model):
    request = models.ForeignKey(Request, on_delete=models.DO_NOTHING, related_name='acknowledgements')
    medical = models.ForeignKey(Medical, on_delete=models.DO_NOTHING, related_name='responses')
    status = models.BooleanField()
    description = models.TextField()

    def __str__(self):
        if self.request:
            return self.request.medicine + self.status
    

