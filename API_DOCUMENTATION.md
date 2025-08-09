# 🚀 Saham Real Estate - Backend API Documentation

## 📋 Table of Contents
1. [Overview](#overview)
2. [Authentication & Authorization](#authentication--authorization)
3. [User Management](#user-management)
4. [Investment Management](#investment-management)
5. [Property Management](#property-management)
6. [Portfolio & Transactions](#portfolio--transactions)
7. [Admin Management](#admin-management)
8. [File Upload](#file-upload)
9. [Notifications](#notifications)
10. [Error Handling](#error-handling)
11. [Database Schema](#database-schema)
12. [Security Requirements](#security-requirements)
13. [Deployment](#deployment)

---

## 🌟 Overview

### Base URL
```
Production: https://api.alsaham.ly
Development: http://localhost:3000
```

### API Version
```
/api/v1
```

### Content Type
```
Content-Type: application/json
Accept: application/json
```

### Response Format
```json
{
  "success": true,
  "data": {},
  "message": "Operation completed successfully",
  "timestamp": "2024-01-15T10:30:00Z"
}
```

### Error Response Format
```json
{
  "success": false,
  "error": {
    "code": "VALIDATION_ERROR",
    "message": "Validation failed",
    "details": {
      "email": ["Email is required"],
      "password": ["Password must be at least 8 characters"]
    }
  },
  "timestamp": "2024-01-15T10:30:00Z"
}
```

---

## 🔐 Authentication & Authorization

### JWT Token Structure
```json
{
  "header": {
    "alg": "HS256",
    "typ": "JWT"
  },
  "payload": {
    "sub": "user_id",
    "email": "user@example.com",
    "role": "investor",
    "iat": 1642234567,
    "exp": 1642320967
  }
}
```

### Authentication Headers
```
Authorization: Bearer <jwt_token>
```

---

## 👤 User Management

### 1. User Registration
```http
POST /api/v1/auth/register
```

**Request Body:**
```json
{
  "name": "أحمد محمد",
  "email": "ahmed@example.com",
  "password": "SecurePassword123!",
  "phone": "+218 91 234 5678",
  "agreeToTerms": true,
  "preferences": {
    "language": "ar",
    "currency": "LYD"
  }
}
```

**Response:**
```json
{
  "success": true,
  "data": {
    "user": {
      "id": "user_123",
      "name": "أحمد محمد",
      "email": "ahmed@example.com",
      "phone": "+218 91 234 5678",
      "role": "investor",
      "isVerified": false,
      "kycStatus": "pending",
      "createdAt": "2024-01-15T10:30:00Z",
      "lastLoginAt": "2024-01-15T10:30:00Z"
    },
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
  },
  "message": "تم إنشاء الحساب بنجاح"
}
```

### 2. User Login
```http
POST /api/v1/auth/login
```

**Request Body:**
```json
{
  "email": "ahmed@example.com",
  "password": "SecurePassword123!"
}
```

**Response:**
```json
{
  "success": true,
  "data": {
    "user": {
      "id": "user_123",
      "name": "أحمد محمد",
      "email": "ahmed@example.com",
      "role": "investor",
      "avatar": "https://example.com/avatar.jpg",
      "phone": "+218 91 234 5678",
      "isVerified": true,
      "kycStatus": "approved",
      "portfolio": {
        "totalInvested": 150000,
        "activeInvestments": 3,
        "completedInvestments": 2,
        "totalReturns": 25000,
        "averageReturn": 15.5
      },
      "bankDetails": {
        "accountNumber": "1234567890",
        "bankName": "بنك ليبيا المركزي"
      },
      "createdAt": "2024-01-01T00:00:00Z",
      "lastLoginAt": "2024-01-15T10:30:00Z"
    },
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
  },
  "message": "تم تسجيل الدخول بنجاح"
}
```

### 3. Get Current User
```http
GET /api/v1/auth/me
```

**Response:**
```json
{
  "success": true,
  "data": {
    "user": {
      "id": "user_123",
      "name": "أحمد محمد",
      "email": "ahmed@example.com",
      "role": "investor",
      "avatar": "https://example.com/avatar.jpg",
      "phone": "+218 91 234 5678",
      "isVerified": true,
      "kycStatus": "approved",
      "portfolio": {
        "totalInvested": 150000,
        "activeInvestments": 3,
        "completedInvestments": 2,
        "totalReturns": 25000,
        "averageReturn": 15.5
      },
      "bankDetails": {
        "accountNumber": "1234567890",
        "bankName": "بنك ليبيا المركزي"
      },
      "createdAt": "2024-01-01T00:00:00Z",
      "lastLoginAt": "2024-01-15T10:30:00Z"
    }
  }
}
```

### 4. Update User Profile
```http
PUT /api/v1/auth/profile
```

**Request Body:**
```json
{
  "name": "أحمد محمد علي",
  "phone": "+218 91 234 5679",
  "avatar": "https://example.com/new-avatar.jpg"
}
```

### 5. Change Password
```http
PUT /api/v1/auth/password
```

**Request Body:**
```json
{
  "currentPassword": "OldPassword123!",
  "newPassword": "NewSecurePassword456!"
}
```

### 6. Logout
```http
POST /api/v1/auth/logout
```

---

## 🏢 Investment Management

### 1. Get All Investments
```http
GET /api/v1/investments
```

**Query Parameters:**
```
?page=1&limit=10&type=فيلا&riskLevel=medium&minReturn=10&maxReturn=20&status=active&search=فيلا
```

**Response:**
```json
{
  "success": true,
  "data": {
    "investments": [
      {
        "id": "inv_001",
        "title": "مشروع فيلات السكني الفاخرة",
        "location": "طرابلس، حي السكني",
        "totalValue": 5000000,
        "currentValue": 3200000,
        "minInvestment": 50000,
        "expectedReturn": 15.5,
        "duration": 24,
        "investors": 45,
        "maxInvestors": 100,
        "status": "active",
        "image": "https://example.com/investment1.jpg",
        "rating": 4.8,
        "views": 234,
        "endDate": "2026-03-15",
        "propertyType": "فيلا",
        "riskLevel": "medium",
        "progress": 64,
        "createdAt": "2024-01-01T00:00:00Z"
      }
    ],
    "pagination": {
      "page": 1,
      "limit": 10,
      "total": 25,
      "totalPages": 3
    }
  }
}
```

### 2. Get Investment Details
```http
GET /api/v1/investments/{id}
```

**Response:**
```json
{
  "success": true,
  "data": {
    "investment": {
      "id": "inv_001",
      "title": "مشروع فيلات السكني الفاخرة",
      "location": "طرابلس، حي السكني",
      "totalValue": 5000000,
      "currentValue": 3200000,
      "minInvestment": 50000,
      "expectedReturn": 15.5,
      "duration": 24,
      "investors": 45,
      "maxInvestors": 100,
      "status": "active",
      "images": [
        "https://example.com/investment1-1.jpg",
        "https://example.com/investment1-2.jpg"
      ],
      "rating": 4.8,
      "views": 234,
      "endDate": "2026-03-15",
      "propertyType": "فيلا",
      "riskLevel": "medium",
      "description": "مشروع استثماري فاخر يتضمن بناء مجموعة من الفيلات السكنية المميزة...",
      "features": [
        "تصميم عصري فاخر",
        "مواد بناء عالية الجودة",
        "مرافق ترفيهية متكاملة"
      ],
      "timeline": [
        {
          "phase": "المرحلة الأولى",
          "status": "مكتمل",
          "date": "2024-01",
          "progress": 100
        },
        {
          "phase": "المرحلة الثانية",
          "status": "قيد التنفيذ",
          "date": "2024-06",
          "progress": 65
        }
      ],
      "financials": {
        "totalShares": 100,
        "availableShares": 55,
        "sharePrice": 50000,
        "currentReturn": 8.2,
        "projectedReturn": 15.5,
        "monthlyReturn": 1.2,
        "totalInvested": 2250000,
        "expectedValue": 2875000
      },
      "team": {
        "developer": {
          "name": "شركة السهم العقارية",
          "experience": "15+ سنة",
          "projects": 45,
          "rating": 4.9,
          "image": "https://example.com/developer.jpg"
        },
        "manager": {
          "name": "أحمد محمد",
          "role": "مدير المشروع",
          "experience": "8 سنوات",
          "phone": "+218 91 234 5678",
          "email": "ahmed@alsaham.ly",
          "image": "https://example.com/manager.jpg"
        }
      },
      "documents": [
        {
          "id": "doc_001",
          "name": "عقد الاستثمار",
          "type": "pdf",
          "size": "2.3 MB",
          "url": "https://example.com/documents/contract.pdf"
        }
      ],
      "recentInvestors": [
        {
          "name": "محمد علي",
          "amount": 100000,
          "date": "2024-01-15",
          "avatar": "https://example.com/avatar1.jpg"
        }
      ],
      "createdAt": "2024-01-01T00:00:00Z",
      "updatedAt": "2024-01-15T10:30:00Z"
    }
  }
}
```

### 3. Invest in Property
```http
POST /api/v1/investments/{id}/invest
```

**Request Body:**
```json
{
  "amount": 100000,
  "paymentMethod": "bank_transfer",
  "bankDetails": {
    "accountNumber": "1234567890",
    "bankName": "بنك ليبيا المركزي"
  },
  "agreement": true
}
```

**Response:**
```json
{
  "success": true,
  "data": {
    "transaction": {
      "id": "txn_001",
      "investmentId": "inv_001",
      "userId": "user_123",
      "amount": 100000,
      "status": "pending",
      "paymentMethod": "bank_transfer",
      "reference": "TXN-2024-001",
      "createdAt": "2024-01-15T10:30:00Z"
    }
  },
  "message": "تم إنشاء طلب الاستثمار بنجاح"
}
```

### 4. Get Investment Statistics
```http
GET /api/v1/investments/statistics
```

**Response:**
```json
{
  "success": true,
  "data": {
    "totalInvestments": 25,
    "activeInvestments": 18,
    "completedInvestments": 7,
    "totalValue": 75000000,
    "totalInvested": 45000000,
    "averageReturn": 12.5,
    "totalInvestors": 800
  }
}
```

---

## 🏠 Property Management

### 1. Get All Properties
```http
GET /api/v1/properties
```

**Query Parameters:**
```
?page=1&limit=10&type=فيلا&status=available&minPrice=100000&maxPrice=500000&location=طرابلس&search=فيلا
```

**Response:**
```json
{
  "success": true,
  "data": {
    "properties": [
      {
        "id": "prop_001",
        "title": "فيلا فاخرة في حي السكني",
        "location": "طرابلس، حي السكني",
        "price": 500000,
        "originalPrice": 550000,
        "bedrooms": 4,
        "bathrooms": 3,
        "area": 250,
        "parking": 2,
        "type": "فيلا",
        "status": "available",
        "image": "https://example.com/property1.jpg",
        "rating": 4.8,
        "views": 156,
        "listedDate": "2024-01-01",
        "investmentReturn": 12.5,
        "installmentAvailable": true,
        "sharesAvailable": true,
        "features": ["مسبح", "حديقة", "مطبخ مجهز"],
        "createdAt": "2024-01-01T00:00:00Z"
      }
    ],
    "pagination": {
      "page": 1,
      "limit": 10,
      "total": 50,
      "totalPages": 5
    }
  }
}
```

### 2. Get Property Details
```http
GET /api/v1/properties/{id}
```

**Response:**
```json
{
  "success": true,
  "data": {
    "property": {
      "id": "prop_001",
      "title": "فيلا فاخرة في حي السكني",
      "location": "طرابلس، حي السكني",
      "price": 500000,
      "originalPrice": 550000,
      "bedrooms": 4,
      "bathrooms": 3,
      "area": 250,
      "parking": 2,
      "type": "فيلا",
      "status": "available",
      "images": [
        "https://example.com/property1-1.jpg",
        "https://example.com/property1-2.jpg"
      ],
      "rating": 4.8,
      "views": 156,
      "listedDate": "2024-01-01",
      "investmentReturn": 12.5,
      "installmentAvailable": true,
      "sharesAvailable": true,
      "description": "فيلا فاخرة في أحد أفضل الأحياء السكنية...",
      "features": ["مسبح", "حديقة", "مطبخ مجهز"],
      "amenities": ["مصعد", "نظام أمان", "موقف سيارات"],
      "location": {
        "address": "طرابلس، حي السكني",
        "latitude": 32.8872,
        "longitude": 13.1913,
        "nearby": ["مدرسة", "مستشفى", "مركز تجاري"]
      },
      "financials": {
        "price": 500000,
        "originalPrice": 550000,
        "discount": 9.1,
        "installmentPlan": {
          "available": true,
          "downPayment": 100000,
          "monthlyPayment": 5000,
          "duration": 60
        },
        "sharesPlan": {
          "available": true,
          "totalShares": 100,
          "sharePrice": 5000,
          "availableShares": 80
        }
      },
      "createdAt": "2024-01-01T00:00:00Z",
      "updatedAt": "2024-01-15T10:30:00Z"
    }
  }
}
```

---

## 💼 Portfolio & Transactions

### 1. Get User Portfolio
```http
GET /api/v1/user/portfolio
```

**Response:**
```json
{
  "success": true,
  "data": {
    "portfolio": {
      "totalInvested": 150000,
      "activeInvestments": 3,
      "completedInvestments": 2,
      "totalReturns": 25000,
      "averageReturn": 15.5,
      "currentValue": 175000,
      "profitLoss": 25000,
      "profitLossPercentage": 16.7
    },
    "investments": [
      {
        "id": "inv_001",
        "title": "مشروع فيلات السكني الفاخرة",
        "amount": 100000,
        "shares": 2,
        "status": "active",
        "currentValue": 115000,
        "profitLoss": 15000,
        "profitLossPercentage": 15.0,
        "expectedReturn": 15.5,
        "endDate": "2026-03-15",
        "investedAt": "2024-01-01T00:00:00Z"
      }
    ]
  }
}
```

### 2. Get Transaction History
```http
GET /api/v1/user/transactions
```

**Query Parameters:**
```
?page=1&limit=10&type=investment&status=completed&startDate=2024-01-01&endDate=2024-01-31
```

**Response:**
```json
{
  "success": true,
  "data": {
    "transactions": [
      {
        "id": "txn_001",
        "type": "investment",
        "amount": 100000,
        "status": "completed",
        "reference": "TXN-2024-001",
        "description": "استثمار في مشروع فيلات السكني الفاخرة",
        "investmentId": "inv_001",
        "createdAt": "2024-01-15T10:30:00Z"
      }
    ],
    "pagination": {
      "page": 1,
      "limit": 10,
      "total": 25,
      "totalPages": 3
    }
  }
}
```

### 3. Get Transaction Details
```http
GET /api/v1/user/transactions/{id}
```

---

## 👨‍💼 Admin Management

### 1. Get Dashboard Statistics
```http
GET /api/v1/admin/dashboard
```

**Response:**
```json
{
  "success": true,
  "data": {
    "statistics": {
      "totalUsers": 800,
      "activeUsers": 650,
      "totalInvestments": 25,
      "activeInvestments": 18,
      "totalValue": 75000000,
      "totalInvested": 45000000,
      "monthlyRevenue": 2500000,
      "monthlyGrowth": 12.5
    },
    "recentActivity": [
      {
        "id": "act_001",
        "type": "new_investment",
        "description": "مستثمر جديد انضم للمشروع",
        "userId": "user_123",
        "investmentId": "inv_001",
        "amount": 100000,
        "createdAt": "2024-01-15T10:30:00Z"
      }
    ],
    "topInvestments": [
      {
        "id": "inv_001",
        "title": "مشروع فيلات السكني الفاخرة",
        "totalInvested": 3200000,
        "investors": 45,
        "progress": 64
      }
    ]
  }
}
```

### 2. Get All Users (Admin)
```http
GET /api/v1/admin/users
```

**Query Parameters:**
```
?page=1&limit=10&role=investor&status=active&search=أحمد
```

### 3. Update User Status (Admin)
```http
PUT /api/v1/admin/users/{id}/status
```

**Request Body:**
```json
{
  "isVerified": true,
  "kycStatus": "approved",
  "role": "investor"
}
```

### 4. Get All Investments (Admin)
```http
GET /api/v1/admin/investments
```

### 5. Create Investment (Admin)
```http
POST /api/v1/admin/investments
```

**Request Body:**
```json
{
  "title": "مشروع جديد",
  "location": "طرابلس، حي السكني",
  "totalValue": 5000000,
  "minInvestment": 50000,
  "expectedReturn": 15.5,
  "duration": 24,
  "maxInvestors": 100,
  "propertyType": "فيلا",
  "riskLevel": "medium",
  "description": "وصف المشروع...",
  "features": ["ميزة 1", "ميزة 2"],
  "endDate": "2026-03-15"
}
```

### 6. Update Investment (Admin)
```http
PUT /api/v1/admin/investments/{id}
```

### 7. Delete Investment (Admin)
```http
DELETE /api/v1/admin/investments/{id}
```

---

## 📁 File Upload

### 1. Upload Investment Images
```http
POST /api/v1/upload/investment-images
Content-Type: multipart/form-data
```

**Request Body:**
```
images: [file1, file2, file3]
investmentId: inv_001
```

**Response:**
```json
{
  "success": true,
  "data": {
    "images": [
      {
        "id": "img_001",
        "url": "https://example.com/investment1-1.jpg",
        "filename": "investment1-1.jpg",
        "size": 2048576
      }
    ]
  }
}
```

### 2. Upload User Avatar
```http
POST /api/v1/upload/avatar
Content-Type: multipart/form-data
```

### 3. Upload Documents
```http
POST /api/v1/upload/documents
Content-Type: multipart/form-data
```

---

## 🔔 Notifications

### 1. Get User Notifications
```http
GET /api/v1/notifications
```

**Query Parameters:**
```
?page=1&limit=10&type=investment&read=false
```

**Response:**
```json
{
  "success": true,
  "data": {
    "notifications": [
      {
        "id": "notif_001",
        "type": "investment_update",
        "title": "تحديث المشروع",
        "message": "تم تحديث حالة مشروع فيلات السكني الفاخرة",
        "read": false,
        "data": {
          "investmentId": "inv_001",
          "status": "active"
        },
        "createdAt": "2024-01-15T10:30:00Z"
      }
    ],
    "unreadCount": 3
  }
}
```

### 2. Mark Notification as Read
```http
PUT /api/v1/notifications/{id}/read
```

### 3. Mark All Notifications as Read
```http
PUT /api/v1/notifications/read-all
```

---

## ❌ Error Handling

### Error Codes
```json
{
  "VALIDATION_ERROR": "Validation failed",
  "AUTHENTICATION_ERROR": "Authentication required",
  "AUTHORIZATION_ERROR": "Insufficient permissions",
  "NOT_FOUND_ERROR": "Resource not found",
  "CONFLICT_ERROR": "Resource conflict",
  "RATE_LIMIT_ERROR": "Rate limit exceeded",
  "SERVER_ERROR": "Internal server error"
}
```

### HTTP Status Codes
- `200` - Success
- `201` - Created
- `400` - Bad Request
- `401` - Unauthorized
- `403` - Forbidden
- `404` - Not Found
- `409` - Conflict
- `422` - Validation Error
- `429` - Rate Limited
- `500` - Internal Server Error

---

## 🗄️ Database Schema

### Users Table
```sql
CREATE TABLE users (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name VARCHAR(255) NOT NULL,
  email VARCHAR(255) UNIQUE NOT NULL,
  password_hash VARCHAR(255) NOT NULL,
  phone VARCHAR(20),
  role VARCHAR(20) DEFAULT 'investor',
  avatar_url TEXT,
  is_verified BOOLEAN DEFAULT FALSE,
  kyc_status VARCHAR(20) DEFAULT 'pending',
  bank_details JSONB,
  preferences JSONB,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  last_login_at TIMESTAMP
);
```

### Investments Table
```sql
CREATE TABLE investments (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title VARCHAR(255) NOT NULL,
  location VARCHAR(255) NOT NULL,
  total_value DECIMAL(15,2) NOT NULL,
  current_value DECIMAL(15,2) NOT NULL,
  min_investment DECIMAL(15,2) NOT NULL,
  expected_return DECIMAL(5,2) NOT NULL,
  duration INTEGER NOT NULL,
  max_investors INTEGER NOT NULL,
  status VARCHAR(20) DEFAULT 'active',
  property_type VARCHAR(50) NOT NULL,
  risk_level VARCHAR(20) NOT NULL,
  description TEXT,
  features JSONB,
  timeline JSONB,
  financials JSONB,
  team JSONB,
  images JSONB,
  documents JSONB,
  end_date DATE NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

### User Investments Table
```sql
CREATE TABLE user_investments (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES users(id),
  investment_id UUID REFERENCES investments(id),
  amount DECIMAL(15,2) NOT NULL,
  shares INTEGER,
  status VARCHAR(20) DEFAULT 'active',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

### Transactions Table
```sql
CREATE TABLE transactions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES users(id),
  investment_id UUID REFERENCES investments(id),
  type VARCHAR(20) NOT NULL,
  amount DECIMAL(15,2) NOT NULL,
  status VARCHAR(20) DEFAULT 'pending',
  payment_method VARCHAR(20),
  reference VARCHAR(50) UNIQUE,
  description TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

### Notifications Table
```sql
CREATE TABLE notifications (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES users(id),
  type VARCHAR(50) NOT NULL,
  title VARCHAR(255) NOT NULL,
  message TEXT NOT NULL,
  data JSONB,
  read BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

---

## 🔒 Security Requirements

### 1. Authentication
- JWT tokens with 24-hour expiration
- Refresh token mechanism
- Password hashing with bcrypt (salt rounds: 12)
- Rate limiting on auth endpoints

### 2. Authorization
- Role-based access control (RBAC)
- Resource-level permissions
- Admin-only endpoints protection

### 3. Data Protection
- Input validation and sanitization
- SQL injection prevention
- XSS protection
- CORS configuration
- HTTPS enforcement

### 4. Rate Limiting
```
Auth endpoints: 5 requests per minute
API endpoints: 100 requests per minute
File upload: 10 requests per minute
```

### 5. File Upload Security
- File type validation
- File size limits (10MB max)
- Virus scanning
- Secure file storage

---

## 🚀 Deployment

### Environment Variables
```bash
# Database
DATABASE_URL=postgresql://user:password@localhost:5432/saham_db

# JWT
JWT_SECRET=your-super-secret-jwt-key
JWT_EXPIRES_IN=24h

# File Storage
AWS_ACCESS_KEY_ID=your-aws-access-key
AWS_SECRET_ACCESS_KEY=your-aws-secret-key
AWS_S3_BUCKET=saham-uploads
AWS_REGION=us-east-1

# Email
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your-email@gmail.com
SMTP_PASS=your-app-password

# Redis (for caching)
REDIS_URL=redis://localhost:6379

# API
API_PORT=3000
NODE_ENV=production
CORS_ORIGIN=https://alsaham.ly
```

### Docker Configuration
```dockerfile
FROM node:18-alpine

WORKDIR /app

COPY package*.json ./
RUN npm ci --only=production

COPY . .

EXPOSE 3000

CMD ["npm", "start"]
```

### Docker Compose
```yaml
version: '3.8'
services:
  api:
    build: .
    ports:
      - "3000:3000"
    environment:
      - DATABASE_URL=postgresql://user:password@db:5432/saham_db
      - REDIS_URL=redis://redis:6379
    depends_on:
      - db
      - redis

  db:
    image: postgres:15
    environment:
      - POSTGRES_DB=saham_db
      - POSTGRES_USER=user
      - POSTGRES_PASSWORD=password
    volumes:
      - postgres_data:/var/lib/postgresql/data

  redis:
    image: redis:7-alpine
    volumes:
      - redis_data:/data

volumes:
  postgres_data:
  redis_data:
```

---

## 📞 Contact Information

### Company Details
- **Name:** شركة السهم العقارية
- **Address:** طرابلس، ليبيا
- **Phone:** +218 91 234 5678
- **Email:** info@alsaham.ly
- **Website:** https://alsaham.ly

### Technical Support
- **Email:** tech@alsaham.ly
- **Documentation:** https://docs.alsaham.ly
- **GitHub:** https://github.com/alsaham/api

---

## 📋 Implementation Checklist

### Phase 1: Core Setup
- [ ] Set up Node.js/Express server
- [ ] Configure PostgreSQL database
- [ ] Set up JWT authentication
- [ ] Implement user registration/login
- [ ] Set up file upload system
- [ ] Configure CORS and security middleware

### Phase 2: User Management
- [ ] User CRUD operations
- [ ] Profile management
- [ ] KYC verification system
- [ ] Password reset functionality
- [ ] Email verification

### Phase 3: Investment System
- [ ] Investment CRUD operations
- [ ] Investment search and filtering
- [ ] Investment statistics
- [ ] Document management
- [ ] Image upload for investments

### Phase 4: Transaction System
- [ ] Transaction processing
- [ ] Payment integration
- [ ] Portfolio management
- [ ] Transaction history
- [ ] Financial calculations

### Phase 5: Admin Features
- [ ] Admin dashboard
- [ ] User management for admins
- [ ] Investment management for admins
- [ ] System statistics
- [ ] Notification system

### Phase 6: Advanced Features
- [ ] Real-time notifications
- [ ] Advanced search and filtering
- [ ] Reporting system
- [ ] Analytics dashboard
- [ ] API rate limiting

### Phase 7: Testing & Deployment
- [ ] Unit tests
- [ ] Integration tests
- [ ] API documentation
- [ ] Docker configuration
- [ ] Production deployment

---

## 🎯 Technology Stack Recommendations

### Backend Framework
- **Node.js** with **Express.js** or **NestJS**
- **TypeScript** for type safety
- **PostgreSQL** for primary database
- **Redis** for caching and sessions

### Authentication & Security
- **JWT** for token-based authentication
- **bcrypt** for password hashing
- **helmet** for security headers
- **express-rate-limit** for rate limiting

### File Storage
- **AWS S3** or **Cloudinary** for file storage
- **multer** for file upload handling
- **sharp** for image processing

### Additional Libraries
- **joi** or **zod** for validation
- **nodemailer** for email sending
- **socket.io** for real-time features
- **winston** for logging

---

This comprehensive API documentation provides everything your backend developer partner needs to create a robust, secure, and scalable backend system for the Saham Real Estate platform. The documentation includes all endpoints, data structures, security requirements, and deployment configurations. 