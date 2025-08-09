// Application Configuration
export const APP_CONFIG = {
  API_BASE_URL: import.meta.env.VITE_API_URL || 'http://localhost:3000/api/v1',
  APP_NAME: 'Saham Real Estate',
  APP_VERSION: '1.0.0',
  DEFAULT_LOCALE: 'ar',
  DEFAULT_CURRENCY: 'LYD',
  DEFAULT_LANGUAGE: 'ar',
} as const;

// API Endpoints
export const API_ENDPOINTS = {
  // Authentication
  AUTH: {
    LOGIN: '/auth/login',
    REGISTER: '/auth/register',
    LOGOUT: '/auth/logout',
    ME: '/auth/me',
    REFRESH: '/auth/refresh',
    FORGOT_PASSWORD: '/auth/forgot-password',
    RESET_PASSWORD: '/auth/reset-password',
  },
  
  // User Management
  USER: {
    PROFILE: '/user/profile',
    UPDATE_PROFILE: '/user/profile',
    KYC: '/user/kyc',
    PORTFOLIO: '/user/portfolio',
    INVESTMENTS: '/user/investments',
    TRANSACTIONS: '/user/transactions',
    BANK_DETAILS: '/user/bank-details',
    PREFERENCES: '/user/preferences',
  },
  
  // Investments
  INVESTMENTS: {
    LIST: '/investments',
    DETAIL: (id: string) => `/investments/${id}`,
    INVEST: (id: string) => `/investments/${id}/invest`,
    SEARCH: '/investments/search',
    FILTER: '/investments/filter',
    STATISTICS: '/investments/statistics',
  },
  
  // Properties
  PROPERTIES: {
    LIST: '/properties',
    DETAIL: (id: string) => `/properties/${id}`,
    SEARCH: '/properties/search',
    FILTER: '/properties/filter',
    GALLERY: (id: string) => `/properties/${id}/gallery`,
  },
  
  // Admin (if needed)
  ADMIN: {
    USERS: '/admin/users',
    INVESTMENTS: '/admin/investments',
    STATISTICS: '/admin/statistics',
    SETTINGS: '/admin/settings',
  },
  
  // File Upload
  UPLOAD: {
    IMAGE: '/upload/image',
    DOCUMENT: '/upload/document',
    AVATAR: '/upload/avatar',
  },
  
  // Notifications
  NOTIFICATIONS: {
    LIST: '/notifications',
    MARK_READ: (id: string) => `/notifications/${id}/read`,
    MARK_ALL_READ: '/notifications/mark-all-read',
    SETTINGS: '/notifications/settings',
  },
} as const;

// HTTP Status Codes
export const HTTP_STATUS = {
  OK: 200,
  CREATED: 201,
  NO_CONTENT: 204,
  BAD_REQUEST: 400,
  UNAUTHORIZED: 401,
  FORBIDDEN: 403,
  NOT_FOUND: 404,
  CONFLICT: 409,
  UNPROCESSABLE_ENTITY: 422,
  INTERNAL_SERVER_ERROR: 500,
  BAD_GATEWAY: 502,
  SERVICE_UNAVAILABLE: 503,
} as const;

// Error Messages
export const ERROR_MESSAGES = {
  NETWORK_ERROR: 'خطأ في الاتصال بالشبكة. يرجى التحقق من اتصالك بالإنترنت.',
  UNAUTHORIZED: 'غير مصرح لك بالوصول. يرجى تسجيل الدخول مرة أخرى.',
  FORBIDDEN: 'ليس لديك صلاحية للوصول إلى هذا المورد.',
  NOT_FOUND: 'المورد المطلوب غير موجود.',
  VALIDATION_ERROR: 'بيانات غير صحيحة. يرجى التحقق من المدخلات.',
  SERVER_ERROR: 'حدث خطأ في الخادم. يرجى المحاولة مرة أخرى لاحقاً.',
  TIMEOUT_ERROR: 'انتهت مهلة الطلب. يرجى المحاولة مرة أخرى.',
  UNKNOWN_ERROR: 'حدث خطأ غير متوقع. يرجى المحاولة مرة أخرى.',
} as const;

// Request Configuration
export const REQUEST_CONFIG = {
  TIMEOUT: 30000, // 30 seconds
  RETRY_ATTEMPTS: 3,
  RETRY_DELAY: 1000, // 1 second
  CACHE_DURATION: 5 * 60 * 1000, // 5 minutes
} as const;

// Local Storage Keys
export const STORAGE_KEYS = {
  AUTH_TOKEN: 'saham_auth_token',
  REFRESH_TOKEN: 'saham_refresh_token',
  USER_DATA: 'saham_user_data',
  USER_PREFERENCES: 'saham_user_preferences',
  THEME: 'saham_theme',
  LANGUAGE: 'saham_language',
} as const;

// User Roles
export const USER_ROLES = {
  VISITOR: 'visitor',
  INVESTOR: 'investor',
  ADMIN: 'admin',
} as const;

// Investment Status
export const INVESTMENT_STATUS = {
  ACTIVE: 'active',
  FUNDED: 'funded',
  COMPLETED: 'completed',
  CANCELLED: 'cancelled',
} as const;

// KYC Status
export const KYC_STATUS = {
  PENDING: 'pending',
  APPROVED: 'approved',
  REJECTED: 'rejected',
} as const; 