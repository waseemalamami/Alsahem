import { apiClient } from '../lib/api-client';
import { API_ENDPOINTS } from '../lib/constants';
import { 
  LoginRequest, 
  RegisterRequest, 
  AuthResponse, 
  UpdateProfileRequest,
  KYCRequest,
  BankDetailsRequest,
  ApiResponse 
} from '../types/api';

export class AuthService {
  // Login user
  static async login(credentials: LoginRequest): Promise<AuthResponse> {
    const response = await apiClient.post<AuthResponse>(
      API_ENDPOINTS.AUTH.LOGIN,
      credentials
    );
    return response.data;
  }

  // Register new user
  static async register(userData: RegisterRequest): Promise<AuthResponse> {
    const response = await apiClient.post<AuthResponse>(
      API_ENDPOINTS.AUTH.REGISTER,
      userData
    );
    return response.data;
  }

  // Logout user
  static async logout(): Promise<void> {
    await apiClient.post(API_ENDPOINTS.AUTH.LOGOUT);
    apiClient.logout();
  }

  // Get current user profile
  static async getCurrentUser(): Promise<AuthResponse['user']> {
    const response = await apiClient.get<AuthResponse['user']>(
      API_ENDPOINTS.AUTH.ME
    );
    return response.data;
  }

  // Refresh authentication token
  static async refreshToken(): Promise<{ token: string; refreshToken: string }> {
    const response = await apiClient.post<{ token: string; refreshToken: string }>(
      API_ENDPOINTS.AUTH.REFRESH
    );
    return response.data;
  }

  // Forgot password
  static async forgotPassword(email: string): Promise<{ message: string }> {
    const response = await apiClient.post<{ message: string }>(
      API_ENDPOINTS.AUTH.FORGOT_PASSWORD,
      { email }
    );
    return response.data;
  }

  // Reset password
  static async resetPassword(token: string, newPassword: string): Promise<{ message: string }> {
    const response = await apiClient.post<{ message: string }>(
      API_ENDPOINTS.AUTH.RESET_PASSWORD,
      { token, newPassword }
    );
    return response.data;
  }

  // Update user profile
  static async updateProfile(profileData: UpdateProfileRequest): Promise<AuthResponse['user']> {
    const response = await apiClient.put<AuthResponse['user']>(
      API_ENDPOINTS.USER.UPDATE_PROFILE,
      profileData
    );
    return response.data;
  }

  // Submit KYC verification
  static async submitKYC(kycData: KYCRequest): Promise<{ message: string; kycStatus: string }> {
    const response = await apiClient.post<{ message: string; kycStatus: string }>(
      API_ENDPOINTS.USER.KYC,
      kycData
    );
    return response.data;
  }

  // Get KYC status
  static async getKYCStatus(): Promise<{ kycStatus: string; message?: string }> {
    const response = await apiClient.get<{ kycStatus: string; message?: string }>(
      API_ENDPOINTS.USER.KYC
    );
    return response.data;
  }

  // Update bank details
  static async updateBankDetails(bankData: BankDetailsRequest): Promise<{ message: string }> {
    const response = await apiClient.put<{ message: string }>(
      API_ENDPOINTS.USER.BANK_DETAILS,
      bankData
    );
    return response.data;
  }

  // Get bank details
  static async getBankDetails(): Promise<BankDetailsRequest> {
    const response = await apiClient.get<BankDetailsRequest>(
      API_ENDPOINTS.USER.BANK_DETAILS
    );
    return response.data;
  }

  // Update user preferences
  static async updatePreferences(preferences: {
    language: 'ar' | 'en';
    currency: 'LYD' | 'USD';
  }): Promise<{ message: string }> {
    const response = await apiClient.put<{ message: string }>(
      API_ENDPOINTS.USER.PREFERENCES,
      preferences
    );
    return response.data;
  }

  // Get user preferences
  static async getPreferences(): Promise<{
    language: 'ar' | 'en';
    currency: 'LYD' | 'USD';
  }> {
    const response = await apiClient.get<{
      language: 'ar' | 'en';
      currency: 'LYD' | 'USD';
    }>(API_ENDPOINTS.USER.PREFERENCES);
    return response.data;
  }

  // Check if user is authenticated (utility method)
  static isAuthenticated(): boolean {
    return !!localStorage.getItem('saham_auth_token');
  }

  // Get stored auth token (utility method)
  static getAuthToken(): string | null {
    return localStorage.getItem('saham_auth_token');
  }

  // Set auth token (utility method)
  static setAuthToken(token: string): void {
    localStorage.setItem('saham_auth_token', token);
  }

  // Clear auth data (utility method)
  static clearAuthData(): void {
    localStorage.removeItem('saham_auth_token');
    localStorage.removeItem('saham_refresh_token');
    localStorage.removeItem('saham_user_data');
  }
} 