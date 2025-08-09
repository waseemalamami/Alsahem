// Base API Response Structure
export interface ApiResponse<T = any> {
  success: boolean;
  data: T;
  message: string;
  timestamp: string;
}

// API Error Response Structure
export interface ApiError {
  success: false;
  error: {
    code: string;
    message: string;
    details?: Record<string, string[]>;
  };
  timestamp: string;
}

// Pagination Types
export interface PaginationParams {
  page?: number;
  limit?: number;
  sortBy?: string;
  sortOrder?: 'asc' | 'desc';
}

export interface PaginatedResponse<T> {
  data: T[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
    hasNext: boolean;
    hasPrev: boolean;
  };
}

// Search and Filter Types
export interface SearchParams {
  query?: string;
  filters?: Record<string, any>;
  pagination?: PaginationParams;
}

// Authentication Types
export interface LoginRequest {
  email: string;
  password: string;
}

export interface RegisterRequest {
  name: string;
  email: string;
  password: string;
  phone?: string;
  agreeToTerms: boolean;
  preferences?: {
    language: 'ar' | 'en';
    currency: 'LYD' | 'USD';
  };
}

export interface AuthResponse {
  user: {
    id: string;
    name: string;
    email: string;
    role: 'visitor' | 'investor' | 'admin';
    avatar?: string;
    phone?: string;
    isVerified: boolean;
    kycStatus?: 'pending' | 'approved' | 'rejected';
    portfolio?: {
      totalInvested: number;
      activeInvestments: number;
      completedInvestments: number;
      totalReturns: number;
      averageReturn: number;
    };
    bankDetails?: {
      accountNumber: string;
      bankName: string;
    };
    createdAt: string;
    lastLoginAt: string;
  };
  token: string;
  refreshToken?: string;
}

// User Management Types
export interface UpdateProfileRequest {
  name?: string;
  phone?: string;
  avatar?: string;
  preferences?: {
    language: 'ar' | 'en';
    currency: 'LYD' | 'USD';
  };
}

export interface KYCRequest {
  nationalId: string;
  passportNumber?: string;
  dateOfBirth: string;
  address: {
    street: string;
    city: string;
    postalCode: string;
    country: string;
  };
  documents: {
    nationalIdFront: File;
    nationalIdBack: File;
    passport?: File;
    proofOfAddress: File;
  };
}

export interface BankDetailsRequest {
  accountNumber: string;
  bankName: string;
  accountHolderName: string;
  swiftCode?: string;
  iban?: string;
}

// Investment Types
export interface Investment {
  id: string;
  title: string;
  description: string;
  location: string;
  propertyType: string;
  totalValue: number;
  currentValue: number;
  minInvestment: number;
  maxInvestment: number;
  expectedReturn: number;
  duration: number;
  investors: number;
  maxInvestors: number;
  status: 'active' | 'funded' | 'completed' | 'cancelled';
  riskLevel: 'low' | 'medium' | 'high';
  images: string[];
  documents: string[];
  endDate: string;
  createdAt: string;
  updatedAt: string;
  rating: number;
  views: number;
  isFeatured: boolean;
  tags: string[];
}

export interface InvestmentFilters {
  propertyType?: string[];
  location?: string[];
  minInvestment?: number;
  maxInvestment?: number;
  expectedReturn?: number;
  duration?: number;
  riskLevel?: string[];
  status?: string[];
  isFeatured?: boolean;
}

export interface InvestmentRequest {
  investmentId: string;
  amount: number;
  paymentMethod: 'bank_transfer' | 'card' | 'wallet';
  termsAccepted: boolean;
}

// Property Types
export interface Property {
  id: string;
  title: string;
  description: string;
  location: string;
  propertyType: string;
  area: number;
  bedrooms: number;
  bathrooms: number;
  price: number;
  currency: 'LYD' | 'USD';
  images: string[];
  features: string[];
  amenities: string[];
  coordinates: {
    lat: number;
    lng: number;
  };
  status: 'available' | 'sold' | 'reserved';
  createdAt: string;
  updatedAt: string;
}

export interface PropertyFilters {
  propertyType?: string[];
  location?: string[];
  minPrice?: number;
  maxPrice?: number;
  bedrooms?: number;
  bathrooms?: number;
  area?: number;
  status?: string[];
}

// Portfolio Types
export interface Portfolio {
  totalInvested: number;
  activeInvestments: number;
  completedInvestments: number;
  totalReturns: number;
  averageReturn: number;
  currentValue: number;
  profitLoss: number;
  profitLossPercentage: number;
}

export interface UserInvestment {
  id: string;
  investmentId: string;
  investment: Investment;
  amount: number;
  status: 'pending' | 'active' | 'completed' | 'cancelled';
  returns: number;
  returnPercentage: number;
  investedAt: string;
  expectedReturnDate: string;
}

// Transaction Types
export interface Transaction {
  id: string;
  type: 'investment' | 'withdrawal' | 'dividend' | 'refund';
  amount: number;
  currency: 'LYD' | 'USD';
  status: 'pending' | 'completed' | 'failed' | 'cancelled';
  description: string;
  reference: string;
  createdAt: string;
  completedAt?: string;
}

// Notification Types
export interface Notification {
  id: string;
  title: string;
  message: string;
  type: 'info' | 'success' | 'warning' | 'error';
  isRead: boolean;
  createdAt: string;
  actionUrl?: string;
  actionText?: string;
}

// File Upload Types
export interface FileUploadResponse {
  url: string;
  filename: string;
  size: number;
  mimeType: string;
}

// API Request Headers
export interface ApiHeaders {
  'Content-Type': string;
  'Authorization'?: string;
  'Accept-Language'?: string;
  'X-Request-ID'?: string;
}

// Request Options
export interface RequestOptions {
  headers?: Record<string, string>;
  timeout?: number;
  retryAttempts?: number;
  retryDelay?: number;
  cache?: boolean;
  cacheDuration?: number;
}

// Cache Entry
export interface CacheEntry<T> {
  data: T;
  timestamp: number;
  expiresAt: number;
}

// API Client Configuration
export interface ApiClientConfig {
  baseURL: string;
  timeout: number;
  retryAttempts: number;
  retryDelay: number;
  defaultHeaders: Record<string, string>;
}

// Request Interceptor
export interface RequestInterceptor {
  onRequest?: (config: RequestOptions) => RequestOptions | Promise<RequestOptions>;
  onRequestError?: (error: Error) => Error | Promise<Error>;
}

// Response Interceptor
export interface ResponseInterceptor {
  onResponse?: <T>(response: ApiResponse<T>) => ApiResponse<T> | Promise<ApiResponse<T>>;
  onResponseError?: (error: ApiError) => ApiError | Promise<ApiError>;
}

// API Service Interface
export interface IApiService {
  get<T>(endpoint: string, options?: RequestOptions): Promise<ApiResponse<T>>;
  post<T>(endpoint: string, data?: any, options?: RequestOptions): Promise<ApiResponse<T>>;
  put<T>(endpoint: string, data?: any, options?: RequestOptions): Promise<ApiResponse<T>>;
  patch<T>(endpoint: string, data?: any, options?: RequestOptions): Promise<ApiResponse<T>>;
  delete<T>(endpoint: string, options?: RequestOptions): Promise<ApiResponse<T>>;
  upload<T>(endpoint: string, file: File, options?: RequestOptions): Promise<ApiResponse<T>>;
} 