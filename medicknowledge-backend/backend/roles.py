from rolepermissions.roles import AbstractUserRole

class CustomerRole(AbstractUserRole):
    available_permissions = {
        'customer_permissions': True,    
    }

class MedicalRole(AbstractUserRole):
    available_permissions = {
        'medical_permissions': True,
    }

