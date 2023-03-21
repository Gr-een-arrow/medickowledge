from django.db import models
from django.contrib.auth import get_user_model
from django.contrib.auth.models import AbstractUser, BaseUserManager
from django.core.exceptions import ValidationError
from django.dispatch import receiver
from django.db.models.signals import post_save
from rolepermissions.roles import assign_role
from backend import roles


def validate_phone_number(value):
    if len(value) != 10:
        raise ValidationError("Phone number must be of Ten Digits")

class UserManager(BaseUserManager):
    def create_user(self, email, username, password):
        if not email:
            raise ValueError('Users must have an email address')
        if not username:
            raise ValueError('Users must have an username address')
        if not password:
            raise ValueError('Users must Possess a Password')

        user = self.model(
            email=self.normalize_email(email),
            username=username,
        )

        user.set_password(password)
        user.save(using=self._db)
        return user

# Create your models here.
class User(AbstractUser):
    MEDICAL = 'MED'
    CUSTOMER = 'CUS'
    ADMIN = 'ADM'
    ROLES_CHOICE = [
        (MEDICAL, 'medical'),
        (CUSTOMER, 'customer'),
        (ADMIN, 'admin'),
    ]
    email = models.EmailField(unique=True, null=False)
    roles = models.CharField(max_length=3, choices=ROLES_CHOICE, default=CUSTOMER)

    REQUIRED_FIELDS = ['email', 'password', 'roles']

    def save(self, *args, **kwargs):
        # if not self.pk:
        #     super().save(*args, **kwargs)
            # else:
        super().save(*args, **kwargs)
        if self.roles == User.CUSTOMER:
            assign_role(self, roles.CustomerRole)
        elif self.roles == User.MEDICAL:
            assign_role(self, roles.MedicalRole)


    def __str__(self):
        return self.username

class UserProfilePicture(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    profile_picture = models.ImageField(upload_to='profiles/', blank=True, null=True)

class Medical(models.Model):
    name = models.CharField(max_length=255)
    profile = models.OneToOneField(
        User, 
        on_delete=models.CASCADE, 
        related_name='medical_profile'
    )
    address = models.TextField(unique=True)
    state = models.CharField(max_length=255)
    country = models.CharField(max_length=255)
    pincode = models.IntegerField()
    phone = models.CharField(max_length=10, default='', validators=[validate_phone_number], unique=True)
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
    address = models.TextField(unique=True)
    pincode = models.IntegerField()

    def __str__(self):
        return self.name
    
# class UserProfile(models.Model):
#     user = models.ForeignKey(User, on_delete=models.CASCADE, related_name='profile_picture')
#     profile = models.ImageField(upload_to='profiles/', blank=True, null=True)

class Request(models.Model):
    user = models.ForeignKey(User, related_name='requests', on_delete=models.CASCADE, default=1)
    medicine = models.CharField(max_length=255)
    
    def __str__(self):
        return self.medicine
    
class Response(models.Model):
    request = models.ForeignKey(Request, on_delete=models.DO_NOTHING, related_name='acknowledgements',)
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name='responses', default=1)
    status = models.BooleanField()
    description = models.TextField(null=True, blank=True)

    def __str__(self):
        if self.request:
            return 'For ' + self.request.medicine

    def save(self, *args, **kwargs):
        if self.user.roles != roles.MedicalRole:
            raise ValidationError('Only Medicals can send response')
        super().save(*args, **kwargs)