# 🚀 Saham Real Estate - API Service Layer Documentation

## 📋 Table of Contents
1. [Overview](#overview)
2. [Architecture](#architecture)
3. [Installation & Setup](#installation--setup)
4. [Core Components](#core-components)
5. [Services](#services)
6. [Custom Hooks](#custom-hooks)
7. [Usage Examples](#usage-examples)
8. [Error Handling](#error-handling)
9. [Caching](#caching)
10. [Testing](#testing)
11. [Best Practices](#best-practices)

---

## 🌟 Overview

The API Service Layer provides a comprehensive, type-safe abstraction for all backend API interactions in the Saham Real Estate application. It includes:

- **Centralized API client** with interceptors, retry logic, and caching
- **Service classes** for different domains (Auth, Investments, Users, Properties, Uploads)
- **Custom React hooks** for easy integration with components
- **Type-safe interfaces** for all API requests and responses
- **Error handling** with Arabic error messages
- **Request/response interceptors** for authentication and logging

---

## 🏗️ Architecture

```
src/
├── lib/
│   ├── constants.ts          # Application constants and configuration
│   └── api-client.ts         # Core API client with interceptors
├── types/
│   └── api.ts               # TypeScript interfaces for API
├── services/
│   ├── auth.service.ts      # Authentication service
│   ├── investment.service.ts # Investment management service
│   ├── user.service.ts      # User profile and portfolio service
│   ├── property.service.ts  # Property management service
│   ├── upload.service.ts    # File upload service
│   └── index.ts             # Service exports
└── hooks/
    └── use-api.ts           # Custom React hooks for API operations
```

---

## ⚙️ Installation & Setup

### 1. Environment Configuration

Create a `.env` file based on `env.example`:

```bash
# API Configuration
VITE_API_URL=http://localhost:3000/api/v1
VITE_API_TIMEOUT=30000
VITE_API_RETRY_ATTEMPTS=3
VITE_API_RETRY_DELAY=1000

# Application Configuration
VITE_APP_NAME=Saham Real Estate
VITE_APP_VERSION=1.0.0
VITE_APP_ENVIRONMENT=development
```

### 2. Import Services

```typescript
// Import all services
import { 
  AuthService, 
  InvestmentService, 
  UserService, 
  PropertyService, 
  UploadService 
} from '@/services';

// Import custom hooks
import { useApi, useApiGet, useApiPost } from '@/hooks/use-api';
```

---

## 🔧 Core Components

### API Client

The core API client handles all HTTP requests with built-in features:

```typescript
import { apiClient } from '@/lib/api-client';

// Basic usage
const response = await apiClient.get('/investments');
const result = await apiClient.post('/auth/login', credentials);
const file = await apiClient.upload('/upload/image', imageFile);
```

**Features:**
- Automatic retry logic
- Request/response interceptors
- Token management
- Error handling
- Caching support

### Constants

Centralized configuration and constants:

```typescript
import { 
  API_ENDPOINTS, 
  APP_CONFIG, 
  ERROR_MESSAGES,
  HTTP_STATUS 
} from '@/lib/constants';

// Use endpoints
const loginUrl = API_ENDPOINTS.AUTH.LOGIN;
const investmentsUrl = API_ENDPOINTS.INVESTMENTS.LIST;
```

---

## 🛠️ Services

### Authentication Service

```typescript
import { AuthService } from '@/services';

// Login
const authResponse = await AuthService.login({
  email: 'user@example.com',
  password: 'password123'
});

// Register
const newUser = await AuthService.register({
  name: 'أحمد محمد',
  email: 'ahmed@example.com',
  password: 'SecurePassword123!',
  phone: '+218 91 234 5678',
  agreeToTerms: true
});

// Get current user
const user = await AuthService.getCurrentUser();

// Update profile
const updatedUser = await AuthService.updateProfile({
  name: 'أحمد محمد علي',
  phone: '+218 91 234 5679'
});

// Submit KYC
const kycResult = await AuthService.submitKYC({
  nationalId: '1234567890',
  dateOfBirth: '1990-01-01',
  address: {
    street: 'شارع طرابلس',
    city: 'طرابلس',
    postalCode: '12345',
    country: 'ليبيا'
  },
  documents: {
    nationalIdFront: file1,
    nationalIdBack: file2,
    proofOfAddress: file3
  }
});
```

### Investment Service

```typescript
import { InvestmentService } from '@/services';

// Get all investments with filters
const investments = await InvestmentService.getInvestments({
  query: 'apartment',
  filters: {
    propertyType: ['apartment', 'villa'],
    minInvestment: 50000,
    maxInvestment: 500000,
    expectedReturn: 15,
    riskLevel: ['low', 'medium']
  },
  pagination: {
    page: 1,
    limit: 10,
    sortBy: 'expectedReturn',
    sortOrder: 'desc'
  }
});

// Get investment by ID
const investment = await InvestmentService.getInvestmentById('inv_123');

// Invest in an investment
const investmentResult = await InvestmentService.invest({
  investmentId: 'inv_123',
  amount: 100000,
  paymentMethod: 'bank_transfer',
  termsAccepted: true
});

// Get featured investments
const featured = await InvestmentService.getFeaturedInvestments(6);

// Get investment statistics
const stats = await InvestmentService.getInvestmentStatistics();
```

### User Service

```typescript
import { UserService } from '@/services';

// Get user portfolio
const portfolio = await UserService.getPortfolio();

// Get user investments
const userInvestments = await UserService.getUserInvestments({
  page: 1,
  limit: 20,
  sortBy: 'investedAt',
  sortOrder: 'desc'
});

// Get user transactions
const transactions = await UserService.getUserTransactions({
  page: 1,
  limit: 50
});

// Get user statistics
const userStats = await UserService.getUserStatistics();

// Get activity feed
const activities = await UserService.getActivityFeed({
  page: 1,
  limit: 10
});
```

### Property Service

```typescript
import { PropertyService } from '@/services';

// Get properties with filters
const properties = await PropertyService.getProperties({
  query: 'villa',
  filters: {
    propertyType: ['villa', 'apartment'],
    minPrice: 200000,
    maxPrice: 1000000,
    bedrooms: 3,
    bathrooms: 2
  },
  pagination: {
    page: 1,
    limit: 12
  }
});

// Get property by ID
const property = await PropertyService.getPropertyById('prop_123');

// Get property gallery
const gallery = await PropertyService.getPropertyGallery('prop_123');

// Contact property owner
const contactResult = await PropertyService.contactPropertyOwner('prop_123', {
  name: 'أحمد محمد',
  email: 'ahmed@example.com',
  phone: '+218 91 234 5678',
  message: 'أريد معلومات أكثر عن هذا العقار'
});
```

### Upload Service

```typescript
import { UploadService } from '@/services';

// Upload single image
const imageResult = await UploadService.uploadImage(imageFile);

// Upload multiple files
const filesResult = await UploadService.uploadMultipleFiles(
  [file1, file2, file3], 
  'image'
);

// Upload KYC documents
const kycDocs = await UploadService.uploadKYCDocuments({
  nationalIdFront: idFrontFile,
  nationalIdBack: idBackFile,
  proofOfAddress: addressFile
});

// Validate file before upload
const validation = UploadService.validateFile(file, {
  maxSize: 5 * 1024 * 1024, // 5MB
  allowedTypes: ['image/jpeg', 'image/png'],
  maxWidth: 1920,
  maxHeight: 1080
});

// Compress image
const compressedFile = await UploadService.compressImage(file, {
  quality: 0.8,
  maxWidth: 1920,
  maxHeight: 1080
});
```

---

## 🎣 Custom Hooks

### Basic API Hook

```typescript
import { useApi } from '@/hooks/use-api';

function InvestmentList() {
  const { data, loading, error, execute } = useApi({
    onSuccess: (data) => console.log('Investments loaded:', data),
    onError: (error) => console.error('Failed to load investments:', error),
    cache: true,
    cacheDuration: 5 * 60 * 1000 // 5 minutes
  });

  useEffect(() => {
    execute(() => InvestmentService.getInvestments());
  }, [execute]);

  if (loading) return <LoadingSpinner />;
  if (error) return <ErrorMessage message={error} />;
  
  return <InvestmentGrid investments={data?.data || []} />;
}
```

### Specialized Hooks

```typescript
import { useApiGet, useApiPost, useOptimisticUpdate } from '@/hooks/use-api';

// GET requests
function UserProfile({ userId }: { userId: string }) {
  const { data, loading, error, get } = useApiGet<User>();

  useEffect(() => {
    get(`/users/${userId}`);
  }, [userId, get]);

  return <ProfileCard user={data} loading={loading} error={error} />;
}

// POST requests
function LoginForm() {
  const { data, loading, error, post } = useApiPost<AuthResponse>();

  const handleSubmit = async (credentials: LoginCredentials) => {
    const result = await post('/auth/login', credentials);
    if (result) {
      // Handle successful login
    }
  };

  return <LoginForm onSubmit={handleSubmit} loading={loading} error={error} />;
}

// Optimistic updates
function LikeButton({ investmentId, initialLikes }: { investmentId: string; initialLikes: number }) {
  const { optimisticData, optimisticUpdate } = useOptimisticUpdate<number>();

  const handleLike = async () => {
    const newLikes = (optimisticData || initialLikes) + 1;
    
    await optimisticUpdate(
      newLikes,
      () => InvestmentService.likeInvestment(investmentId),
      () => console.log('Rollback to previous likes')
    );
  };

  return (
    <Button onClick={handleLike}>
      ❤️ {optimisticData || initialLikes}
    </Button>
  );
}
```

### Infinite Scroll Hook

```typescript
import { useInfiniteApi } from '@/hooks/use-api';

function InvestmentList() {
  const { data, hasMore, loading, loadMore, reset } = useInfiniteApi<Investment>();

  useEffect(() => {
    loadMore((page) => InvestmentService.getInvestments({ 
      pagination: { page, limit: 10 } 
    }));
  }, [loadMore]);

  const handleLoadMore = () => {
    if (hasMore && !loading) {
      loadMore((page) => InvestmentService.getInvestments({ 
        pagination: { page, limit: 10 } 
      }));
    }
  };

  return (
    <div>
      <InvestmentGrid investments={data} />
      {hasMore && (
        <Button onClick={handleLoadMore} disabled={loading}>
          {loading ? 'جاري التحميل...' : 'تحميل المزيد'}
        </Button>
      )}
    </div>
  );
}
```

---

## ⚠️ Error Handling

### Error Types

```typescript
import { ApiError } from '@/lib/api-client';

try {
  const result = await AuthService.login(credentials);
} catch (error) {
  if (error instanceof ApiError) {
    console.log('API Error:', error.error.message);
    console.log('Error Code:', error.error.code);
    console.log('Error Details:', error.error.details);
  } else {
    console.log('Network Error:', error.message);
  }
}
```

### Error Messages

All error messages are in Arabic and centralized in constants:

```typescript
import { ERROR_MESSAGES } from '@/lib/constants';

// Available error messages
ERROR_MESSAGES.NETWORK_ERROR      // خطأ في الاتصال بالشبكة
ERROR_MESSAGES.UNAUTHORIZED        // غير مصرح لك بالوصول
ERROR_MESSAGES.FORBIDDEN          // ليس لديك صلاحية للوصول
ERROR_MESSAGES.NOT_FOUND          // المورد المطلوب غير موجود
ERROR_MESSAGES.VALIDATION_ERROR   // بيانات غير صحيحة
ERROR_MESSAGES.SERVER_ERROR       // حدث خطأ في الخادم
ERROR_MESSAGES.TIMEOUT_ERROR      // انتهت مهلة الطلب
ERROR_MESSAGES.UNKNOWN_ERROR      // حدث خطأ غير متوقع
```

---

## 💾 Caching

### Automatic Caching

```typescript
// Enable caching for GET requests
const { data, execute } = useApi({
  cache: true,
  cacheDuration: 10 * 60 * 1000 // 10 minutes
});

// Cache with custom key
const { data, execute } = useApi({
  cache: true
});

useEffect(() => {
  execute(
    () => InvestmentService.getInvestments(),
    'investments-list' // Custom cache key
  );
}, [execute]);
```

### Manual Cache Management

```typescript
import { apiClient } from '@/lib/api-client';

// Clear specific cache
apiClient.clearCache('investments-list');

// Clear all cache
apiClient.clearCache();
```

---

## 🧪 Testing

### Mock API Client

```typescript
// __mocks__/api-client.ts
export const mockApiClient = {
  get: jest.fn(),
  post: jest.fn(),
  put: jest.fn(),
  delete: jest.fn(),
  upload: jest.fn(),
  clearCache: jest.fn(),
};

// Test setup
jest.mock('@/lib/api-client', () => ({
  apiClient: mockApiClient,
}));
```

### Service Testing

```typescript
import { AuthService } from '@/services';
import { mockApiClient } from '@/__mocks__/api-client';

describe('AuthService', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should login user successfully', async () => {
    const mockResponse = {
      success: true,
      data: {
        user: { id: '1', name: 'أحمد محمد' },
        token: 'jwt_token'
      },
      message: 'تم تسجيل الدخول بنجاح'
    };

    mockApiClient.post.mockResolvedValue(mockResponse);

    const result = await AuthService.login({
      email: 'test@example.com',
      password: 'password123'
    });

    expect(result).toEqual(mockResponse.data);
    expect(mockApiClient.post).toHaveBeenCalledWith(
      '/auth/login',
      { email: 'test@example.com', password: 'password123' }
    );
  });
});
```

### Hook Testing

```typescript
import { renderHook, act } from '@testing-library/react';
import { useApi } from '@/hooks/use-api';

describe('useApi', () => {
  it('should handle successful API calls', async () => {
    const mockApiCall = jest.fn().mockResolvedValue({ data: 'test' });
    
    const { result } = renderHook(() => useApi());

    await act(async () => {
      await result.current.execute(mockApiCall);
    });

    expect(result.current.data).toEqual({ data: 'test' });
    expect(result.current.loading).toBe(false);
    expect(result.current.error).toBe(null);
  });

  it('should handle API errors', async () => {
    const mockApiCall = jest.fn().mockRejectedValue(new Error('API Error'));
    
    const { result } = renderHook(() => useApi());

    await act(async () => {
      await result.current.execute(mockApiCall);
    });

    expect(result.current.error).toBe('API Error');
    expect(result.current.loading).toBe(false);
  });
});
```

---

## 📚 Best Practices

### 1. Service Organization

```typescript
// ✅ Good: Use service classes for domain-specific operations
const investments = await InvestmentService.getInvestments(filters);

// ❌ Bad: Direct API calls in components
const response = await fetch('/api/investments');
```

### 2. Error Handling

```typescript
// ✅ Good: Use try-catch with proper error types
try {
  const result = await AuthService.login(credentials);
} catch (error) {
  if (error instanceof ApiError) {
    showToast(error.error.message);
  } else {
    showToast(ERROR_MESSAGES.UNKNOWN_ERROR);
  }
}

// ❌ Bad: Ignoring errors
const result = await AuthService.login(credentials);
```

### 3. Loading States

```typescript
// ✅ Good: Use loading states from hooks
const { data, loading, error } = useApi();

if (loading) return <LoadingSpinner />;
if (error) return <ErrorMessage message={error} />;

// ❌ Bad: Manual loading state management
const [loading, setLoading] = useState(false);
```

### 4. Caching Strategy

```typescript
// ✅ Good: Cache frequently accessed data
const { data } = useApi({
  cache: true,
  cacheDuration: 5 * 60 * 1000 // 5 minutes
});

// ❌ Bad: No caching for expensive operations
const { data } = useApi();
```

### 5. Type Safety

```typescript
// ✅ Good: Use proper TypeScript types
const { data } = useApi<Investment[]>();

// ❌ Bad: Using any type
const { data } = useApi<any>();
```

### 6. Request Cancellation

```typescript
// ✅ Good: Cancel requests on component unmount
const { execute, cancel } = useApi();

useEffect(() => {
  execute(() => InvestmentService.getInvestments());
  
  return () => {
    cancel(); // Cancel pending requests
  };
}, [execute, cancel]);
```

---

## 🔄 Migration Guide

### From Direct Fetch Calls

**Before:**
```typescript
const fetchInvestments = async () => {
  const response = await fetch('/api/investments');
  const data = await response.json();
  setInvestments(data);
};
```

**After:**
```typescript
const { data, loading, error } = useApi<Investment[]>();

useEffect(() => {
  execute(() => InvestmentService.getInvestments());
}, [execute]);
```

### From Axios

**Before:**
```typescript
import axios from 'axios';

const login = async (credentials) => {
  const response = await axios.post('/api/auth/login', credentials);
  return response.data;
};
```

**After:**
```typescript
import { AuthService } from '@/services';

const login = async (credentials) => {
  return await AuthService.login(credentials);
};
```

---

## 📞 Support

For questions or issues with the API Service Layer:

1. Check the [API Documentation](./API_DOCUMENTATION.md)
2. Review the [TypeScript interfaces](./src/types/api.ts)
3. Examine the [service implementations](./src/services/)
4. Look at [usage examples](#usage-examples)

The API Service Layer is designed to be:
- **Type-safe** with comprehensive TypeScript support
- **Performant** with built-in caching and retry logic
- **Maintainable** with clear separation of concerns
- **Testable** with easy mocking and testing utilities
- **User-friendly** with Arabic error messages and loading states 