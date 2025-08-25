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
    try {
      console.log('🔍 Sending login request:', credentials);
      
      const response = await apiClient.post<any>(
        API_ENDPOINTS.AUTH.LOGIN,
        credentials
      );
      
      console.log('🔍 Raw login response:', response);
      console.log('🔍 Response type:', typeof response);
      console.log('🔍 Response keys:', Object.keys(response || {}));
      
      // Handle .NET backend response format
      // Backend returns: { token: "...", expiration: "...", user: {...} }
      if (response && (response.Token || response.token)) {
        const token = response.Token || response.token;
        const expiration = response.Expiration || response.expiration;
        const user = response.User || response.user;
        
        console.log('✅ Login successful, token found:', !!token);
        console.log('✅ User data:', user);
        
        // Store the JWT token
        AuthService.setAuthToken(token);
        
        // Transform .NET response to frontend format
        return {
          success: true,
          token: token,
          refreshToken: response.RefreshToken || response.refreshToken || '',
          user: {
            id: user?.Id || user?.id || '',
            name: user?.Name || user?.name || '',
            email: user?.Email || user?.email || '',
            phoneNumber: user?.PhoneNumber || user?.phoneNumber || '',
            roles: user?.Roles || user?.roles || [],
          },
          expiresAt: expiration,
        };
      }
      
      console.log('❌ Login failed: No token found in response');
      return {
        success: false,
        message: response?.Message || response?.message || 'Login failed',
      };
    } catch (error: any) {
      console.error('Login error:', error);
      
      // Handle ApiError instances (from our API client)
      if (error instanceof Error && error.name === 'ApiError') {
        return {
          success: false,
          message: error.message || 'Login failed',
        };
      }
      
      // Handle different error response formats
      if (error.response?.data) {
        const errorData = error.response.data;
        
        // Handle ModelState errors from .NET
        if (errorData.errors) {
          const errorMessages = Object.values(errorData.errors).flat();
          return {
            success: false,
            message: errorMessages.join(', '),
          };
        }
        
        // Handle simple error message
        if (errorData.Message) {
          return {
            success: false,
            message: errorData.Message,
          };
        }
        
        return {
          success: false,
          message: errorData.message || 'Login failed',
        };
      }
      
      return {
        success: false,
        message: error.message || 'Login failed',
      };
    }
  }

  // Register new user
  static async register(userData: RegisterRequest): Promise<AuthResponse> {
    try {
      console.log('Sending registration request:', userData);
      
      const response = await apiClient.post<any>(
        API_ENDPOINTS.AUTH.REGISTER,
        userData
      );
      
      console.log('Raw registration response:', response);
      
      // The API client returns the parsed JSON directly from the backend
      // Backend returns: { message: "User registered successfully", userId: "..." }
      if (response && (response.Message || response.message)) {
        const message = response.Message || response.message;
        console.log('✅ Registration successful:', message);
        return {
          success: true,
          message: message,
          userId: response.UserId || response.userId,
        };
      }
      
      // Fallback: if we get a response but no Message, assume success
      if (response && typeof response === 'object') {
        console.log('✅ Registration successful (fallback)');
        return {
          success: true,
          message: 'User registered successfully',
          userId: response.UserId || 'unknown',
        };
      }
      
      console.log('❌ Registration failed: Invalid response format');
      return {
        success: false,
        message: 'Registration failed: Invalid response format',
      };
    } catch (error: any) {
      console.error('Registration error:', error);
      
      // Handle ApiError instances (from our API client)
      if (error instanceof Error && error.name === 'ApiError') {
        return {
          success: false,
          message: error.message || 'Registration failed',
        };
      }
      
      // Handle different error response formats
      if (error.response?.data) {
        const errorData = error.response.data;
        
        // Handle ModelState errors from .NET
        if (errorData.errors) {
          const errorMessages = Object.values(errorData.errors).flat();
          return {
            success: false,
            message: errorMessages.join(', '),
          };
        }
        
        // Handle simple error message
        if (errorData.Message) {
          return {
            success: false,
            message: errorData.Message,
          };
        }
        
        return {
          success: false,
          message: errorData.message || 'Registration failed',
        };
      }
      
      return {
        success: false,
        message: error.message || 'Registration failed',
      };
    }
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