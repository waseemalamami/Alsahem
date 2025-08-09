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
  // Get all investments with pagination and filters
  static async getInvestments(
    params?: SearchParams & { filters?: InvestmentFilters }
  ): Promise<PaginatedResponse<Investment>> {
    const queryParams = new URLSearchParams();
    
    if (params?.query) {
      queryParams.append('query', params.query);
    }
    
    if (params?.pagination) {
      if (params.pagination.page) queryParams.append('page', params.pagination.page.toString());
      if (params.pagination.limit) queryParams.append('limit', params.pagination.limit.toString());
      if (params.pagination.sortBy) queryParams.append('sortBy', params.pagination.sortBy);
      if (params.pagination.sortOrder) queryParams.append('sortOrder', params.pagination.sortOrder);
    }
    
    if (params?.filters) {
      Object.entries(params.filters).forEach(([key, value]) => {
        if (value !== undefined && value !== null) {
          if (Array.isArray(value)) {
            value.forEach(v => queryParams.append(key, v));
          } else {
            queryParams.append(key, value.toString());
          }
        }
      });
    }

    const endpoint = `${API_ENDPOINTS.INVESTMENTS.LIST}?${queryParams.toString()}`;
    const response = await apiClient.get<PaginatedResponse<Investment>>(endpoint);
    return response.data;
  }

  // Get investment by ID
  static async getInvestmentById(id: string): Promise<Investment> {
    const response = await apiClient.get<Investment>(
      API_ENDPOINTS.INVESTMENTS.DETAIL(id)
    );
    return response.data;
  }

  // Search investments
  static async searchInvestments(searchParams: SearchParams): Promise<PaginatedResponse<Investment>> {
    const response = await apiClient.post<PaginatedResponse<Investment>>(
      API_ENDPOINTS.INVESTMENTS.SEARCH,
      searchParams
    );
    return response.data;
  }

  // Filter investments
  static async filterInvestments(filters: InvestmentFilters, pagination?: PaginationParams): Promise<PaginatedResponse<Investment>> {
    const response = await apiClient.post<PaginatedResponse<Investment>>(
      API_ENDPOINTS.INVESTMENTS.FILTER,
      { filters, pagination }
    );
    return response.data;
  }

  // Invest in an investment
  static async invest(investmentRequest: InvestmentRequest): Promise<{
    message: string;
    transactionId: string;
    status: string;
  }> {
    const response = await apiClient.post<{
      message: string;
      transactionId: string;
      status: string;
    }>(
      API_ENDPOINTS.INVESTMENTS.INVEST(investmentRequest.investmentId),
      investmentRequest
    );
    return response.data;
  }

  // Get investment statistics
  static async getInvestmentStatistics(): Promise<{
    totalInvestments: number;
    activeInvestments: number;
    completedInvestments: number;
    totalValue: number;
    averageReturn: number;
    totalInvestors: number;
  }> {
    const response = await apiClient.get<{
      totalInvestments: number;
      activeInvestments: number;
      completedInvestments: number;
      totalValue: number;
      averageReturn: number;
      totalInvestors: number;
    }>(API_ENDPOINTS.INVESTMENTS.STATISTICS);
    return response.data;
  }

  // Get featured investments
  static async getFeaturedInvestments(limit: number = 6): Promise<Investment[]> {
    const response = await apiClient.get<Investment[]>(
      `${API_ENDPOINTS.INVESTMENTS.LIST}?featured=true&limit=${limit}`
    );
    return response.data;
  }

  // Get investments by category/type
  static async getInvestmentsByType(propertyType: string, pagination?: PaginationParams): Promise<PaginatedResponse<Investment>> {
    const queryParams = new URLSearchParams();
    queryParams.append('propertyType', propertyType);
    
    if (pagination) {
      if (pagination.page) queryParams.append('page', pagination.page.toString());
      if (pagination.limit) queryParams.append('limit', pagination.limit.toString());
      if (pagination.sortBy) queryParams.append('sortBy', pagination.sortBy);
      if (pagination.sortOrder) queryParams.append('sortOrder', pagination.sortOrder);
    }

    const endpoint = `${API_ENDPOINTS.INVESTMENTS.LIST}?${queryParams.toString()}`;
    const response = await apiClient.get<PaginatedResponse<Investment>>(endpoint);
    return response.data;
  }

  // Get investments by location
  static async getInvestmentsByLocation(location: string, pagination?: PaginationParams): Promise<PaginatedResponse<Investment>> {
    const queryParams = new URLSearchParams();
    queryParams.append('location', location);
    
    if (pagination) {
      if (pagination.page) queryParams.append('page', pagination.page.toString());
      if (pagination.limit) queryParams.append('limit', pagination.limit.toString());
      if (pagination.sortBy) queryParams.append('sortBy', pagination.sortBy);
      if (pagination.sortOrder) queryParams.append('sortOrder', pagination.sortOrder);
    }

    const endpoint = `${API_ENDPOINTS.INVESTMENTS.LIST}?${queryParams.toString()}`;
    const response = await apiClient.get<PaginatedResponse<Investment>>(endpoint);
    return response.data;
  }

  // Get investments by risk level
  static async getInvestmentsByRiskLevel(riskLevel: 'low' | 'medium' | 'high', pagination?: PaginationParams): Promise<PaginatedResponse<Investment>> {
    const queryParams = new URLSearchParams();
    queryParams.append('riskLevel', riskLevel);
    
    if (pagination) {
      if (pagination.page) queryParams.append('page', pagination.page.toString());
      if (pagination.limit) queryParams.append('limit', pagination.limit.toString());
      if (pagination.sortBy) queryParams.append('sortBy', pagination.sortBy);
      if (pagination.sortOrder) queryParams.append('sortOrder', pagination.sortOrder);
    }

    const endpoint = `${API_ENDPOINTS.INVESTMENTS.LIST}?${queryParams.toString()}`;
    const response = await apiClient.get<PaginatedResponse<Investment>>(endpoint);
    return response.data;
  }

  // Get similar investments
  static async getSimilarInvestments(investmentId: string, limit: number = 4): Promise<Investment[]> {
    const response = await apiClient.get<Investment[]>(
      `${API_ENDPOINTS.INVESTMENTS.DETAIL(investmentId)}/similar?limit=${limit}`
    );
    return response.data;
  }

  // Get investment documents
  static async getInvestmentDocuments(investmentId: string): Promise<{
    documents: Array<{
      id: string;
      name: string;
      url: string;
      type: string;
      size: number;
    }>;
  }> {
    const response = await apiClient.get<{
      documents: Array<{
        id: string;
        name: string;
        url: string;
        type: string;
        size: number;
      }>;
    }>(`${API_ENDPOINTS.INVESTMENTS.DETAIL(investmentId)}/documents`);
    return response.data;
  }

  // Get investment gallery
  static async getInvestmentGallery(investmentId: string): Promise<{
    images: Array<{
      id: string;
      url: string;
      alt: string;
      isPrimary: boolean;
    }>;
  }> {
    const response = await apiClient.get<{
      images: Array<{
        id: string;
        url: string;
        alt: string;
        isPrimary: boolean;
      }>;
    }>(`${API_ENDPOINTS.INVESTMENTS.DETAIL(investmentId)}/gallery`);
    return response.data;
  }

  // Track investment view (for analytics)
  static async trackInvestmentView(investmentId: string): Promise<void> {
    await apiClient.post(`${API_ENDPOINTS.INVESTMENTS.DETAIL(investmentId)}/view`);
  }

  // Get investment progress
  static async getInvestmentProgress(investmentId: string): Promise<{
    currentValue: number;
    totalValue: number;
    percentage: number;
    investors: number;
    maxInvestors: number;
    daysLeft: number;
  }> {
    const response = await apiClient.get<{
      currentValue: number;
      totalValue: number;
      percentage: number;
      investors: number;
      maxInvestors: number;
      daysLeft: number;
    }>(`${API_ENDPOINTS.INVESTMENTS.DETAIL(investmentId)}/progress`);
    return response.data;
  }
} 