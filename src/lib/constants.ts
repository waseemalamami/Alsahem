// Application Configuration
export const APP_CONFIG = {
  API_BASE_URL: import.meta.env.VITE_API_URL || 'https://localhost:7000/api',
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
    LOGIN: '/Account/Login',
    REGISTER: '/Account/RegisterNewUser',
    LOGOUT: '/Account/Logout',
    ME: '/Account/Me',
    REFRESH: '/Account/Refresh',
    FORGOT_PASSWORD: '/Account/ForgotPassword',
    RESET_PASSWORD: '/Account/ResetPassword',
    UPDATE_USER: '/Account/UpdateUser',
  },
  
  // User Management
  USER: {
    PROFILE: '/Account/Profile',
    UPDATE_PROFILE: '/Account/UpdateUser',
    KYC: '/User/KYC',
    PORTFOLIO: '/User/Portfolio',
    INVESTMENTS: '/UserInvestment/getAllUserInvestment',
    TRANSACTIONS: '/User/Transactions',
    BANK_DETAILS: '/User/BankDetails',
    PREFERENCES: '/User/Preferences',
  },
  
  // Investments
  INVESTMENTS: {
    LIST: '/Investment/getAllInvestment',
    DETAIL: (id: string) => `/Investment/GetInvestmentById/${id}`,
    INVEST: (id: string) => `/Investment/Invest/${id}`,
    SEARCH: '/Investment/Search',
    FILTER: '/Investment/Filter',
    STATISTICS: '/Investment/Statistics',
  },
  
  // Properties
  PROPERTIES: {
    LIST: '/Property/getAllProperty',
    DETAIL: (id: string) => `/Property/getPropertyById/${id}`,
    SEARCH: '/Property/Search',
    FILTER: '/Property/Filter',
    GALLERY: (id: string) => `/Property/getPropertyImages/${id}`,
    BY_CITY: (cityId: string) => `/Property/getPropertyByCityId/${cityId}`,
    BY_TYPE: (typeId: string) => `/Property/getPropertyByTypePropertyId/${typeId}`,
  },
  
  // Cities and Types
  CITIES: {
    LIST: '/City/GetAllCities',
    DETAIL: (id: string) => `/City/GetCityById/${id}`,
  },
  
  PROPERTY_TYPES: {
    LIST: '/TypeProperty/getAllTypeProperty',
    DETAIL: (id: string) => `/TypeProperty/getTypePropertyById/${id}`,
  },
  
  // Admin (if needed)
  ADMIN: {
    USERS: '/Admin/Users',
    INVESTMENTS: '/Admin/Investments',
    STATISTICS: '/Admin/Statistics',
    SETTINGS: '/Admin/Settings',
  },
  
  // File Upload
  UPLOAD: {
    IMAGE: '/Upload/Image',
    DOCUMENT: '/Upload/Document',
    AVATAR: '/Upload/Avatar',
  },
  
  // Notifications
  NOTIFICATIONS: {
    LIST: '/Notification/GetAllNotifications',
    MARK_READ: (id: string) => `/Notification/MarkAsRead/${id}`,
    MARK_ALL_READ: '/Notification/MarkAllAsRead',
    SETTINGS: '/Notification/Settings',
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