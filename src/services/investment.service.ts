import { apiClient } from '../lib/api-client';
import { API_ENDPOINTS } from '../lib/constants';
import { 
  Investment, 
  InvestmentFilters, 
  InvestmentRequest, 
  PaginatedResponse,
  SearchParams,
  PaginationParams,
  ApiResponse 
} from '../types/api';

export class InvestmentService {
  // Get all investments from .NET backend
  static async getInvestments(
    params?: SearchParams & { filters?: InvestmentFilters }
  ): Promise<PaginatedResponse<Investment>> {
    try {
      console.log('🔍 Fetching investments from backend...');
      
      // Call the .NET backend endpoint
      const response = await apiClient.get<Investment[]>(API_ENDPOINTS.INVESTMENTS.LIST);
      
      console.log('🔍 Raw investments response:', response);
      
      // The API client returns the parsed JSON directly
      const investments = response || [];
      
      console.log(`✅ Found ${investments.length} investments`);
      
      // Apply client-side filtering and pagination
      let filteredInvestments = investments;
      
      if (params?.filters) {
        filteredInvestments = investments.filter(investment => {
          if (params.filters?.minSharePrice && investment.sharePrice < params.filters.minSharePrice) return false;
          if (params.filters?.maxSharePrice && investment.sharePrice > params.filters.maxSharePrice) return false;
          if (params.filters?.minInvestment && investment.minInvestment < params.filters.minInvestment) return false;
          if (params.filters?.maxInvestment && investment.minInvestment > params.filters.maxInvestment) return false;
          return true;
        });
      }
      
      // Apply client-side pagination
      const page = params?.pagination?.page || 1;
      const limit = params?.pagination?.limit || 10;
      const startIndex = (page - 1) * limit;
      const endIndex = startIndex + limit;
      const paginatedInvestments = filteredInvestments.slice(startIndex, endIndex);
      
      return {
        data: paginatedInvestments,
        pagination: {
          page,
          limit,
          total: filteredInvestments.length,
          totalPages: Math.ceil(filteredInvestments.length / limit),
        },
      };
    } catch (error: any) {
      console.error('❌ Error fetching investments:', error);
      return {
        data: [],
        pagination: {
          page: 1,
          limit: 10,
          total: 0,
          totalPages: 0,
        },
      };
    }
  }

  // Get investment by ID from .NET backend
  static async getInvestmentById(id: string): Promise<Investment | null> {
    try {
      console.log(`🔍 Fetching investment ${id} from backend...`);
      
      const response = await apiClient.get<Investment>(
        API_ENDPOINTS.INVESTMENTS.DETAIL(id)
      );
      
      console.log('🔍 Investment detail response:', response);
      
      return response || null;
    } catch (error: any) {
      console.error(`❌ Error fetching investment ${id}:`, error);
      return null;
    }
  }

  // Get user investments from .NET backend
  static async getUserInvestments(): Promise<Investment[]> {
    try {
      console.log('🔍 Fetching user investments from backend...');
      
      const response = await apiClient.get<Investment[]>(
        API_ENDPOINTS.USER.INVESTMENTS
      );
      
      console.log('🔍 User investments response:', response);
      
      return response || [];
    } catch (error: any) {
      console.error('❌ Error fetching user investments:', error);
      return [];
    }
  }
} 