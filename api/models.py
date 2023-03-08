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
        on_delete=models.DO_NOTHING, 
        related_name='medical_profile'
    )
    address = models.TextField()
    state = models.CharField(max_length=255)
    country = models.CharField(max_length=255)
    pincode = models.IntegerField()
    description = models.TextField(null=True, blank=True)

    def __str__(self):
        return self.name

class Customer(models.Model):
    name = models.CharField(max_length=255)
    profile = models.OneToOneField(
        User, 
        on_delete=models.DO_NOTHING, 
        related_name='customer_profile'
    )
    address = models.TextField()
    pincode = models.IntegerField()

    def __str__(self):
        return self.name
    

class Request(models.Model):
    customer = models.ManyToManyField(Customer)
    medicine = models.CharField(max_length=255)
    
    def __str__(self):
        return self.medicine
    
class Response(models.Model):
    reqeust = models.ForeignKey(Request, on_delete=models.DO_NOTHING)
    medical = models.ForeignKey(Medical, on_delete=models.DO_NOTHING)
    status = models.BooleanField()
    description = models.TextField()

    def __str__(self):
        return self.reqeust.medicine + self.status
    

