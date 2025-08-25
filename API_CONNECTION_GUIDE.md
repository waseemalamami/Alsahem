# API Connection Guide

## Overview

This guide explains how the React frontend connects to the .NET Core backend API for the Saham Real Estate project.

## Architecture

```
Frontend (React + TypeScript) ←→ Backend (.NET Core API)
     ↓                              ↓
  Port 8080                    Port 7001
```

## Backend API (.NET Core)

### Location
- **Path**: `C:\SahamRealEstateAPI`
- **Port**: `https://localhost:7001`
- **Base URL**: `https://localhost:7001/api`

### Key Controllers
- `AccountController` - Authentication and user management
- `PropertyController` - Property listings and details
- `InvestmentController` - Investment management
- `NotificationController` - User notifications
- `UserInvestmentController` - User investment tracking

### Authentication
- Uses JWT (JSON Web Tokens)
- CORS configured to allow any origin
- Token-based authentication with refresh tokens

## Frontend Configuration

### API Base URL
```typescript
// src/lib/constants.ts
export const APP_CONFIG = {
  API_BASE_URL: import.meta.env.VITE_API_URL || 'https://localhost:7001/api',
  // ...
}
```

### API Endpoints
```typescript
// src/lib/constants.ts
export const API_ENDPOINTS = {
  AUTH: {
    LOGIN: '/Account/Login',
    REGISTER: '/Account/RegisterNewUser',
    // ...
  },
  PROPERTIES: {
    LIST: '/Property/getAllProperty',
    DETAIL: (id: string) => `/Property/getPropertyById/${id}`,
    // ...
  },
  // ...
}
```

## Connection Setup

### 1. Start Backend
```bash
cd C:\SahamRealEstateAPI
dotnet run
```

### 2. Start Frontend
```bash
cd C:\saham-real-estate-design-main
npm run dev
```

### 3. Test Connection
Visit: `http://localhost:8080/api-test`

## API Client Features

### Authentication
- Automatic JWT token handling
- Token storage in localStorage
- Automatic token refresh
- Logout functionality

### Error Handling
- Network error detection
- HTTP status code mapping
- Retry logic for failed requests
- User-friendly error messages

### Caching
- Response caching for GET requests
- Configurable cache duration
- Cache invalidation on logout

### Request/Response Interceptors
- Request ID generation
- Response logging (development)
- Error logging (development)

## Data Flow

### 1. User Authentication
```
Frontend → POST /api/Account/Login → Backend
Frontend ← JWT Token ← Backend
```

### 2. Property Listing
```
Frontend → GET /api/Property/getAllProperty → Backend
Frontend ← Property Array ← Backend
```

### 3. User Dashboard
```
Frontend → GET /api/UserInvestment/GetUserInvestments → Backend
Frontend ← Investment Data ← Backend
```

## Error Handling

### Network Errors
- Automatic retry (3 attempts)
- Exponential backoff
- User notification via toast

### Authentication Errors
- Automatic token removal
- Redirect to login page
- Clear user data

### Validation Errors
- Field-level error display
- Arabic error messages
- Form validation feedback

## Development Tools

### API Test Page
- **URL**: `/api-test`
- **Features**:
  - Connection status monitoring
  - Endpoint testing
  - Response time measurement
  - Error reporting

### Connection Status Component
- Real-time connection monitoring
- Automatic health checks
- Visual status indicators

## Troubleshooting

### Common Issues

1. **CORS Errors**
   - Ensure backend CORS is configured
   - Check if backend is running on correct port

2. **Authentication Failures**
   - Verify JWT configuration in backend
   - Check token expiration settings

3. **Network Timeouts**
   - Increase timeout in `REQUEST_CONFIG.TIMEOUT`
   - Check network connectivity

4. **Port Conflicts**
   - Backend: Ensure port 7001 is available
   - Frontend: Ensure port 5173 is available

### Debug Steps

1. Check browser console for errors
2. Verify backend is running: `https://localhost:7001`
3. Test API endpoints directly in browser
4. Check network tab for failed requests
5. Verify environment variables

## Environment Variables

### Frontend (.env)
```env
VITE_API_URL=https://localhost:7001/api
```

### Backend (appsettings.json)
```json
{
  "ConnectionStrings": {
    "DefaultConnection": "..."
  },
  "JWT": {
    "SecretKey": "...",
    "Issuer": "...",
    "Audience": "...",
    "ExpireHours": "24"
  }
}
```

## Security Considerations

1. **HTTPS**: Use HTTPS in production
2. **CORS**: Configure CORS properly for production
3. **JWT**: Secure JWT secret key
4. **Validation**: Server-side validation required
5. **Rate Limiting**: Implement rate limiting on backend

## Performance Optimization

1. **Caching**: Implement response caching
2. **Pagination**: Use pagination for large datasets
3. **Lazy Loading**: Load data on demand
4. **Compression**: Enable response compression
5. **CDN**: Use CDN for static assets

## Monitoring

1. **Health Checks**: Regular API health monitoring
2. **Error Tracking**: Log and track API errors
3. **Performance Metrics**: Monitor response times
4. **User Analytics**: Track API usage patterns

## Deployment

### Frontend
- Build: `npm run build`
- Deploy to static hosting (Vercel, Netlify, etc.)

### Backend
- Publish: `dotnet publish`
- Deploy to cloud hosting (Azure, AWS, etc.)

### Environment Configuration
- Update API URLs for production
- Configure CORS for production domains
- Set up SSL certificates
- Configure database connections
