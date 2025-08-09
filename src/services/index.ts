// Export all services
export { AuthService } from './auth.service';
export { InvestmentService } from './investment.service';
export { UserService } from './user.service';
export { PropertyService } from './property.service';
export { UploadService } from './upload.service';

// Export API client
export { apiClient } from '../lib/api-client';

// Export types
export type {
  ApiResponse,
  ApiError,
  LoginRequest,
  RegisterRequest,
  AuthResponse,
  Investment,
  Property,
  Portfolio,
  UserInvestment,
  Transaction,
  PaginatedResponse,
  PaginationParams,
  SearchParams,
  RequestOptions,
  FileUploadResponse,
} from '../types/api';

// Export constants
export {
  API_ENDPOINTS,
  APP_CONFIG,
  HTTP_STATUS,
  ERROR_MESSAGES,
  REQUEST_CONFIG,
  STORAGE_KEYS,
  USER_ROLES,
  INVESTMENT_STATUS,
  KYC_STATUS,
} from '../lib/constants'; 