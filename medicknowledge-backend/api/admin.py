from django.contrib import admin
from . import models

# Register your models here.

@admin.register(models.User)
class UserAdmin(admin.ModelAdmin):
    list_display = ['username', 'email', 'roles', 'medical_profile', 'customer_profile']
    list_editable = ['email', 'roles']

    list_per_page = 10


@admin.register(models.Medical)
class UserAdmin(admin.ModelAdmin):
    list_display = ['user', 'name', 'phone', 'address', 'state', 'pincode', 'description']
    list_editable = ['name', 'phone', 'description', 'address']

    def user(self, medical):
        return str(medical.profile)

    list_per_page = 10

@admin.register(models.Customer)
class UserAdmin(admin.ModelAdmin):
    list_display = ['user', 'name', 'address', 'pincode']
    list_editable = ['name', 'address']

    def user(self, customer):
        return str(customer.profile)

    list_per_page = 10

@admin.register(models.Request)
class UserAdmin(admin.ModelAdmin):
    list_display = ['user', 'medicine']

    def user(self, request):
        return str(request.user)

    list_per_page = 10

@admin.register(models.Response)
class UserAdmin(admin.ModelAdmin):
    list_display = ['user','request', 'status', 'description']


    list_per_page = 10
