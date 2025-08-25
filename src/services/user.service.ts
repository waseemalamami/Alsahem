import { apiClient } from '../lib/api-client';
import { API_ENDPOINTS } from '../lib/constants';
import { 
  Portfolio, 
  UserInvestment, 
  Transaction, 
  PaginatedResponse,
  PaginationParams,
  ApiResponse 
} from '../types/api';

export class UserService {
  // Get user profile from auth context (since backend doesn't have a profile endpoint)
  static async getUserProfile(): Promise<{
    id: string;
    name: string;
    email: string;
    phoneNumber: string;
    role: string;
    isVerified: boolean;
    kycStatus?: string;
    createdAt: string;
    lastLoginAt?: string;
  } | null> {
    try {
      console.log('🔍 Getting user profile from auth context...');
      
      // Get user data from localStorage (stored by AuthContext)
      const savedUser = localStorage.getItem('saham_user');
      if (savedUser) {
        const user = JSON.parse(savedUser);
        console.log('🔍 User profile from context:', user);
        
        return {
          id: user.id || '',
          name: user.name || '',
          email: user.email || '',
          phoneNumber: user.phone || '',
          role: user.role || 'investor',
          isVerified: user.isVerified || true,
          kycStatus: user.kycStatus || 'pending',
          createdAt: user.createdAt || new Date().toISOString(),
          lastLoginAt: user.lastLoginAt || new Date().toISOString(),
        };
      }
      
      console.log('❌ No user data found in context');
      return null;
    } catch (error: any) {
      console.error('❌ Error getting user profile from context:', error);
      return null;
    }
  }

  // Get user investments from .NET backend
  static async getUserInvestments(): Promise<UserInvestment[]> {
    try {
      console.log('🔍 Fetching user investments from backend...');
      
      const response = await apiClient.get<UserInvestment[]>(
        API_ENDPOINTS.USER.INVESTMENTS
      );
      
      console.log('🔍 User investments response:', response);
      
      return response || [];
    } catch (error: any) {
      console.error('❌ Error fetching user investments:', error);
      return [];
    }
  }

  // Get user portfolio summary
  static async getPortfolioSummary(): Promise<{
    totalInvestments: number;
    totalValue: number;
    totalShares: number;
    activeInvestments: number;
    completedInvestments: number;
  }> {
    try {
      console.log('🔍 Fetching portfolio summary from backend...');
      
      const userInvestments = await this.getUserInvestments();
      
      const totalInvestments = userInvestments.length;
      const totalValue = userInvestments.reduce((sum, inv) => sum + (inv.amount || 0), 0);
      const totalShares = userInvestments.reduce((sum, inv) => sum + (inv.shares || 0), 0);
      const activeInvestments = userInvestments.filter(inv => inv.status === 'active').length;
      const completedInvestments = userInvestments.filter(inv => inv.status === 'completed').length;
      
      return {
        totalInvestments,
        totalValue,
        totalShares,
        activeInvestments,
        completedInvestments,
      };
    } catch (error: any) {
      console.error('❌ Error fetching portfolio summary:', error);
      return {
        totalInvestments: 0,
        totalValue: 0,
        totalShares: 0,
        activeInvestments: 0,
        completedInvestments: 0,
      };
    }
  }

  // Update user profile
  static async updateUserProfile(profileData: {
    name: string;
    email: string;
    phoneNumber: string;
  }): Promise<{ success: boolean; message: string }> {
    try {
      console.log('🔍 Updating user profile...');
      
      const response = await apiClient.post<any>(
        API_ENDPOINTS.AUTH.UPDATE_USER,
        profileData
      );
      
      console.log('🔍 Update profile response:', response);
      
      return {
        success: true,
        message: response?.Message || 'Profile updated successfully',
      };
    } catch (error: any) {
      console.error('❌ Error updating user profile:', error);
      return {
        success: false,
        message: error.message || 'Failed to update profile',
      };
    }
  }
} 