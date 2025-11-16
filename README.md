# MedicKnowledge

[![Django](https://img.shields.io/badge/Django-5.2.8-green.svg)](https://www.djangoproject.com/)
[![React](https://img.shields.io/badge/React-18.2.0-blue.svg)](https://reactjs.org/)
[![DRF](https://img.shields.io/badge/DRF-3.14.0-red.svg)](https://www.django-rest-framework.org/)

A real-time drug availability checking platform that connects customers with local pharmacies, enabling quick medication searches and availability confirmations.

## 🎯 Overview

MedicKnowledge is a web-based platform designed to streamline the process of finding medication at nearby pharmacies. The system bridges the gap between customers seeking urgent medication and local medical stores, providing a hassle-free way to check drug availability, compare prices, and make informed purchasing decisions.

### Key Features

- **Real-time Drug Requests**: Customers can submit drug inquiries with name, description, and optional photos
- **Location-Based Matching**: Automatically connects customers with pharmacies in their pincode area
- **Acknowledgement System**: Medical stores respond with availability status and pricing information
- **User Roles**: Separate interfaces and permissions for customers and medical store admins
- **Profile Management**: Complete user profiles with pictures and contact information
- **Inventory Visibility**: Helps medical stores increase visibility and manage customer inquiries efficiently

## 🏗️ System Architecture

The project follows a modern full-stack architecture:

```
medicknowledge/
├── medicknowledge-backend/     # Django REST API
└── medicknowledge-frontend/    # React SPA
```

### Backend (Django)

- **Framework**: Django 5.2.8 with Django REST Framework
- **Authentication**: JWT-based authentication using SimpleJWT
- **Database**: SQLite (development), PostgreSQL (production)
- **Role Management**: Django Role Permissions for customer/medical admin separation
- **Media Handling**: Support for profile pictures and medicine images

### Frontend (React)

- **Framework**: React 18.2.0
- **UI Libraries**: Material-UI, RSuite, Bootstrap
- **State Management**: Valtio for global state
- **Routing**: React Router v6
- **Form Handling**: Formik with Yup validation
- **HTTP Client**: Axios

## 📋 Prerequisites

- Python 3.8+
- Node.js 14+
- npm or yarn
- Virtual environment tool (venv/virtualenv)

## 🚀 Installation

### Backend Setup

1. Navigate to the backend directory:
```bash
cd medicknowledge-backend
```

2. Create and activate a virtual environment:
```bash
python -m venv venv
# Windows
.\venv\Scripts\activate
# Linux/Mac
source venv/bin/activate
```

3. Install dependencies:
```bash
pip install -r requirements.txt
```

4. Configure environment variables (create `.env` file):
```env
ENVIRONMENT=local
SECRET_KEY=your-secret-key
DB_NAME=your_db_name          # For production
DB_USER=your_db_user          # For production
DB_PASSWORD=your_db_password  # For production
DB_HOST=localhost             # For production
DB_PORT=5432                  # For production
```

5. Run migrations:
```bash
python manage.py migrate
```

6. Create a superuser (optional):
```bash
python manage.py createsuperuser
```

7. Start the development server:
```bash
python manage.py runserver
```

Backend will be available at: `http://localhost:8000`

### Frontend Setup

1. Navigate to the frontend directory:
```bash
cd medicknowledge-frontend
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm start
```

Frontend will be available at: `http://localhost:3000`

## 📱 User Roles & Workflows

### Customer Workflow

1. **Register** as a customer with address and pincode
2. **Create Profile** with personal details
3. **Submit Requests** for medication with drug name, description, and optional photo
4. **View Acknowledgements** from nearby medical stores
5. **Compare** availability and prices from different pharmacies
6. **Make Decisions** based on location, availability, and pricing

### Medical Store Admin Workflow

1. **Register** as a medical store with complete store details
2. **Create Profile** with store information and contact details
3. **View Requests** from customers in the same pincode area
4. **Send Responses** with availability status and pricing
5. **Manage Inventory** inquiries efficiently
6. **Connect** with potential customers in the locality

## 🛠️ API Endpoints

### Authentication
- `POST /api/create-user/` - Register new user
- `POST /api/token/` - Obtain JWT token
- `POST /api/token/refresh/` - Refresh JWT token

### User Management
- `GET /api/users/me/` - Get current user details
- `PUT /api/users/me/` - Update user profile
- `POST /api/users/create-profile/` - Create customer/medical profile
- `POST /api/users/me/upload-picture/` - Upload profile picture
- `GET /api/users/me/picture/` - Get profile picture

### Requests (Customer)
- `GET /api/requests/` - List user's requests
- `POST /api/requests/` - Create new request
- `GET /api/requests/{id}/responses/` - View responses for a request

### Responses (Medical)
- `GET /api/response/` - List medical store's responses
- `POST /api/response/` - Create new response

### Medical Stores
- `GET /api/medicals/` - List nearby medical stores (by pincode)

## 🗄️ Database Models

### User
- Custom user model with role-based access (Customer/Medical/Admin)
- Email-based authentication
- Role assignment on creation

### Customer
- Profile linked to User
- Address and pincode for location matching
- One-to-one relationship with User

### Medical
- Store profile linked to User
- Complete address, contact, and description
- Pincode-based service area

### Request
- Drug inquiry by customer
- Medicine name, description, and optional photo
- Linked to customer user

### Response
- Acknowledgement from medical store
- Availability status and description (price/details)
- Linked to request and medical user

## 🔐 Security Features

- JWT-based authentication
- Role-based access control
- CORS configuration for frontend integration
- Password validation
- Secure media file handling

## 🐳 Docker Support

The project includes a Dockerfile for Jenkins CI/CD integration:

```bash
docker build -t medicknowledge-jenkins .
```

## 📦 Key Dependencies

### Backend
- Django 5.2.8
- djangorestframework 3.14.0
- djangorestframework-simplejwt 5.5.1
- django-role-permissions 3.1.1
- Pillow 9.4.0 (image processing)
- psycopg2-binary 2.9.5 (PostgreSQL)

### Frontend
- React 18.2.0
- Material-UI 5.11.16
- Axios 1.3.3
- Formik 2.2.9
- React Router 6.9.0
- SweetAlert2 11.7.1

## 🧪 Testing

### Backend Tests
```bash
cd medicknowledge-backend
python manage.py test
```

### Frontend Tests
```bash
cd medicknowledge-frontend
npm test
```

## 📁 Project Structure

### Backend Structure
```
medicknowledge-backend/
├── api/                    # Main application
│   ├── models.py          # Database models
│   ├── views.py           # API views
│   ├── serializers.py     # DRF serializers
│   ├── urls.py            # API routing
│   └── tests/             # Test cases
├── backend/               # Project configuration
│   ├── settings.py        # Django settings
│   ├── urls.py            # Root URL configuration
│   └── roles.py           # Role definitions
├── media/                 # User uploads
│   ├── profiles/          # Profile pictures
│   └── medicine-images/   # Drug photos
└── manage.py              # Django management script
```

### Frontend Structure
```
medicknowledge-frontend/
├── src/
│   ├── Components/        # Reusable components
│   │   ├── Medicals/     # Medical-specific components
│   │   ├── Profile/      # Profile components
│   │   └── Request/      # Request components
│   ├── Pages/            # Route pages
│   │   ├── Home.js
│   │   ├── Login.js
│   │   └── Register.js
│   ├── Root/             # Root components
│   │   ├── Customer.js
│   │   └── Medical.js
│   ├── Store/            # Global state management
│   └── App.js            # Main application component
└── public/               # Static assets
```

## 🌟 Benefits

### For Customers
- Quick drug availability checks
- Compare prices across multiple pharmacies
- Save time in urgent situations
- Location-based pharmacy discovery
- Informed purchasing decisions

### For Medical Stores
- Increased visibility in the local area
- Better inventory management
- Direct connection with potential customers
- Digital presence enhancement
- Efficient customer inquiry handling

## 🚧 Future Enhancements

- Real-time notifications
- Advanced search and filtering
- Pharmacy ratings and reviews
- Order placement integration
- Mobile application
- Analytics dashboard for medical stores
- Prescription upload and verification
- Delivery integration

## 📄 License

This project is developed as a community service platform for connecting customers with local pharmacies.