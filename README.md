# Property Rental System - Backend Documentation

A complete Node.js/Express backend for a property rental platform with user authentication, property management, booking system, and admin features.

## 🚀 Features

### Authentication & Authorization
- ✅ User Signup (Tenant, Property Owner, Admin)
- ✅ User Login with JWT Authentication
- ✅ Role-Based Access Control (RBAC)
- ✅ Profile Management

### Property Management
- ✅ Create, Read, Update, Delete Properties
- ✅ Search and Filter Properties (location, price, type)
- ✅ Property Approval System
- ✅ Property Ratings

### Booking System
- ✅ Request Bookings
- ✅ Accept/Reject Bookings
- ✅ Cancel Bookings
- ✅ View Booking History

### Wishlist
- ✅ Add/Remove Properties to Wishlist
- ✅ View Saved Properties
- ✅ Clear Wishlist

### Admin Panel
- ✅ Manage Users (Block/Unblock)
- ✅ Approve/Remove Properties
- ✅ View Platform Statistics

## 📋 Prerequisites

- Node.js (v14 or higher)
- MongoDB (Local or Atlas)
- npm or yarn

## 🔧 Installation

### 1. Clone Repository
```bash
git clone <repository-url>
cd backend
```

### 2. Install Dependencies
```bash
npm install
```

### 3. Setup Environment Variables
Create a `.env` file in the backend directory:

```bash
# Database
MONGODB_URI=mongodb://localhost:27017/property-rental-app

# JWT Configuration
JWT_SECRET=your_super_secret_jwt_key_change_in_production
JWT_EXPIRE=7d

# Server
PORT=5000
NODE_ENV=development
```

### 4. Start MongoDB
Ensure MongoDB is running on your system:
```bash
mongod
```

### 5. Run Server
```bash
# Development (with auto-reload)
npm run dev

# Production
npm start
```

Server will start on `http://localhost:5000`

## 📁 Project Structure

```
backend/
├── models/
│   ├── User.js           # User schema with roles
│   ├── Property.js       # Property listing schema
│   ├── Booking.js        # Booking request schema
│   └── Wishlist.js       # Wishlist schema
│
├── controllers/
│   ├── authController.js      # Signup, login, profile
│   ├── propertyController.js  # Property CRUD & search
│   ├── bookingController.js   # Booking operations
│   ├── wishlistController.js  # Wishlist operations
│   └── adminController.js     # Admin operations
│
├── routes/
│   ├── authRoutes.js      # /auth endpoints
│   ├── propertyRoutes.js  # /properties endpoints
│   ├── bookingRoutes.js   # /bookings endpoints
│   ├── wishlistRoutes.js  # /wishlist endpoints
│   └── adminRoutes.js     # /admin endpoints
│
├── middleware/
│   └── authMiddleware.js  # JWT verification, role checks
│
├── config/
│   └── database.js        # MongoDB connection
│
├── server.js              # Express app setup
├── package.json           # Dependencies
├── .env                   # Environment variables
└── README.md              # This file
```

## 🔐 Authentication

### JWT Token
All protected routes require an Authorization header:
```
Authorization: Bearer <token>
```

### User Roles
- **Tenant**: Can search properties, make bookings, create wishlist
- **Property Owner**: Can create/manage properties, accept/reject bookings
- **Admin**: Can approve properties, manage users, view statistics

## 📡 API Endpoints

### Authentication

#### POST `/auth/signup`
Register a new user
```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "password123",
  "phone": "1234567890",
  "role": "Tenant"
}
```

#### POST `/auth/login`
Login user
```json
{
  "email": "john@example.com",
  "password": "password123"
}
```

#### GET `/auth/profile`
Get user profile (Protected)

#### PUT `/auth/profile`
Update user profile (Protected)
```json
{
  "name": "John Updated",
  "phone": "9876543210",
  "address": "123 Main St"
}
```

---

### Properties

#### GET `/properties`
Get all approved properties with filters
```
Query Parameters:
- location: string (search by location)
- minPrice: number
- maxPrice: number
- propertyType: "House" | "PG" | "Apartment"
- sortBy: "low-to-high" | "high-to-low" | "rating"
- page: number (default: 1)
- limit: number (default: 10)
```

#### POST `/properties`
Add new property (Property Owner only)
```json
{
  "title": "Beautiful 2BHK Apartment",
  "description": "Spacious apartment with modern amenities",
  "propertyType": "Apartment",
  "location": "Downtown City",
  "address": "123 Main Street",
  "price": 1500,
  "bedrooms": 2,
  "bathrooms": 2,
  "area": 1200,
  "amenities": ["WiFi", "Kitchen", "Parking", "AC"],
  "image": "url-to-image"
}
```

#### GET `/properties/:id`
Get specific property details

#### PUT `/properties/:id`
Update property (Owner only)

#### DELETE `/properties/:id`
Delete property (Owner only)

#### GET `/properties/my-properties`
Get owner's properties (Protected)

#### GET `/properties/search`
Advanced search with multiple filters

---

### Bookings

#### POST `/bookings`
Request a booking (Tenant only)
```json
{
  "propertyId": "property_id",
  "checkInDate": "2024-04-01",
  "checkOutDate": "2024-04-30",
  "numberOfTenants": 2,
  "message": "Looking for a comfortable place"
}
```

#### GET `/bookings/tenant/my-bookings`
Get all bookings by tenant (Protected)

#### GET `/bookings/owner/requests`
Get all booking requests for owner (Protected)

#### GET `/bookings/:id`
Get booking details (Protected)

#### PUT `/bookings/:id/accept`
Accept booking request (Owner only)

#### PUT `/bookings/:id/reject`
Reject booking request (Owner only)

#### PUT `/bookings/:id/cancel`
Cancel booking (Tenant only)

---

### Wishlist

#### GET `/wishlist`
Get user's wishlist (Tenant only)

#### POST `/wishlist`
Add property to wishlist (Tenant only)
```json
{
  "propertyId": "property_id"
}
```

#### DELETE `/wishlist`
Remove property from wishlist (Tenant only)
```json
{
  "propertyId": "property_id"
}
```

#### GET `/wishlist/check?propertyId=xxx`
Check if property is in wishlist

#### DELETE `/wishlist/clear`
Clear entire wishlist (Tenant only)

---

### Admin

#### GET `/admin/users`
Get all users with optional role filter

#### PUT `/admin/users/:userId/block`
Block a user account (Admin only)

#### PUT `/admin/users/:userId/unblock`
Unblock a user account (Admin only)

#### DELETE `/admin/users/:userId`
Delete a user (Admin only)

#### GET `/admin/properties/pending`
Get pending property approvals (Admin only)

#### PUT `/admin/properties/:propertyId/approve`
Approve a property (Admin only)

#### DELETE `/admin/properties/:propertyId`
Remove a property (Admin only)

#### GET `/admin/stats`
Get platform statistics (Admin only)

---

## 🔒 Security

- Passwords are hashed using bcrypt
- JWT tokens expire after set time
- Role-based access control implemented
- Input validation on all endpoints
- CORS enabled for cross-origin requests

## 🧪 Testing

### Example: Signup and Get Token
```bash
# Signup
curl -X POST http://localhost:5000/auth/signup \
  -H "Content-Type: application/json" \
  -d '{
    "name": "John Doe",
    "email": "john@example.com",
    "password": "password123",
    "role": "Tenant"
  }'

# Response includes token
# Use this token for protected routes
```

### Example: Add Property
```bash
curl -X POST http://localhost:5000/properties \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer <token>" \
  -d '{
    "title": "Beautiful Apartment",
    "description": "Spacious and modern",
    "propertyType": "Apartment",
    "location": "Downtown",
    "address": "123 Main St",
    "price": 1500,
    "bedrooms": 2,
    "bathrooms": 2,
    "area": 1200,
    "amenities": ["WiFi", "Kitchen"]
  }'
```

## 🛠 Database Models

### User Schema
- name, email, password (hashed), phone
- role (Tenant, Property Owner, Admin)
- profilePicture, address
- isBlocked, createdAt, updatedAt

### Property Schema
- title, description, propertyType
- location, address, price
- bedrooms, bathrooms, area
- amenities (array), images
- owner (reference to User)
- isApproved, isAvailable
- rating, reviewCount
- createdAt, updatedAt

### Booking Schema
- tenant, property, propertyOwner
- status (Pending, Accepted, Rejected, Cancelled)
- checkInDate, checkOutDate
- totalAmount, numberOfTenants
- message, createdAt, updatedAt

### Wishlist Schema
- tenant (reference to User)
- properties (array of Property references)
- createdAt, updatedAt

## 📝 Error Handling

All endpoints return consistent JSON responses:

### Success Response
```json
{
  "success": true,
  "message": "Operation successful",
  "data": {}
}
```

### Error Response
```json
{
  "success": false,
  "message": "Error description",
  "error": "Detailed error message"
}
```

## 🚀 Deployment

### Using Heroku
```bash
# Install Heroku CLI
# Login to Heroku
heroku login

# Create app
heroku create app-name

# Add MongoDB Atlas URL to environment
heroku config:set MONGODB_URI=your_mongodb_uri
heroku config:set JWT_SECRET=your_secret

# Deploy
git push heroku main
```

### Using AWS, Azure, or GCP
Follow standard Node.js deployment procedures for your platform.

## 📞 Support

For issues or questions, please create an issue in the repository.

## 📄 License

MIT License

---

**Built with ❤️ using Express.js and MongoDB**
