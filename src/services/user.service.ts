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
  // Get user portfolio
  static async getPortfolio(): Promise<Portfolio> {
    const response = await apiClient.get<Portfolio>(
      API_ENDPOINTS.USER.PORTFOLIO
    );
    return response.data;
  }

  // Get user investments
  static async getUserInvestments(pagination?: PaginationParams): Promise<PaginatedResponse<UserInvestment>> {
    const queryParams = new URLSearchParams();
    
    if (pagination) {
      if (pagination.page) queryParams.append('page', pagination.page.toString());
      if (pagination.limit) queryParams.append('limit', pagination.limit.toString());
      if (pagination.sortBy) queryParams.append('sortBy', pagination.sortBy);
      if (pagination.sortOrder) queryParams.append('sortOrder', pagination.sortOrder);
    }

    const endpoint = `${API_ENDPOINTS.USER.INVESTMENTS}?${queryParams.toString()}`;
    const response = await apiClient.get<PaginatedResponse<UserInvestment>>(endpoint);
    return response.data;
  }

  // Get user investment by ID
  static async getUserInvestmentById(investmentId: string): Promise<UserInvestment> {
    const response = await apiClient.get<UserInvestment>(
      `${API_ENDPOINTS.USER.INVESTMENTS}/${investmentId}`
    );
    return response.data;
  }

  // Get user transactions
  static async getUserTransactions(pagination?: PaginationParams): Promise<PaginatedResponse<Transaction>> {
    const queryParams = new URLSearchParams();
    
    if (pagination) {
      if (pagination.page) queryParams.append('page', pagination.page.toString());
      if (pagination.limit) queryParams.append('limit', pagination.limit.toString());
      if (pagination.sortBy) queryParams.append('sortBy', pagination.sortBy);
      if (pagination.sortOrder) queryParams.append('sortOrder', pagination.sortOrder);
    }

    const endpoint = `${API_ENDPOINTS.USER.TRANSACTIONS}?${queryParams.toString()}`;
    const response = await apiClient.get<PaginatedResponse<Transaction>>(endpoint);
    return response.data;
  }

  // Get transaction by ID
  static async getTransactionById(transactionId: string): Promise<Transaction> {
    const response = await apiClient.get<Transaction>(
      `${API_ENDPOINTS.USER.TRANSACTIONS}/${transactionId}`
    );
    return response.data;
  }

  // Get user profile
  static async getUserProfile(): Promise<{
    id: string;
    name: string;
    email: string;
    role: 'visitor' | 'investor' | 'admin';
    avatar?: string;
    phone?: string;
    isVerified: boolean;
    kycStatus?: 'pending' | 'approved' | 'rejected';
    portfolio?: Portfolio;
    bankDetails?: {
      accountNumber: string;
      bankName: string;
    };
    createdAt: string;
    lastLoginAt: string;
  }> {
    const response = await apiClient.get<{
      id: string;
      name: string;
      email: string;
      role: 'visitor' | 'investor' | 'admin';
      avatar?: string;
      phone?: string;
      isVerified: boolean;
      kycStatus?: 'pending' | 'approved' | 'rejected';
      portfolio?: Portfolio;
      bankDetails?: {
        accountNumber: string;
        bankName: string;
      };
      createdAt: string;
      lastLoginAt: string;
    }>(API_ENDPOINTS.USER.PROFILE);
    return response.data;
  }

  // Get user statistics
  static async getUserStatistics(): Promise<{
    totalInvestments: number;
    activeInvestments: number;
    completedInvestments: number;
    totalInvested: number;
    totalReturns: number;
    averageReturn: number;
    lastInvestmentDate?: string;
    memberSince: string;
  }> {
    const response = await apiClient.get<{
      totalInvestments: number;
      activeInvestments: number;
      completedInvestments: number;
      totalInvested: number;
      totalReturns: number;
      averageReturn: number;
      lastInvestmentDate?: string;
      memberSince: string;
    }>(`${API_ENDPOINTS.USER.PORTFOLIO}/statistics`);
    return response.data;
  }

  // Get user investment history
  static async getInvestmentHistory(pagination?: PaginationParams): Promise<PaginatedResponse<{
    investment: UserInvestment;
    transaction: Transaction;
  }>> {
    const queryParams = new URLSearchParams();
    
    if (pagination) {
      if (pagination.page) queryParams.append('page', pagination.page.toString());
      if (pagination.limit) queryParams.append('limit', pagination.limit.toString());
      if (pagination.sortBy) queryParams.append('sortBy', pagination.sortBy);
      if (pagination.sortOrder) queryParams.append('sortOrder', pagination.sortOrder);
    }

    const endpoint = `${API_ENDPOINTS.USER.INVESTMENTS}/history?${queryParams.toString()}`;
    const response = await apiClient.get<PaginatedResponse<{
      investment: UserInvestment;
      transaction: Transaction;
    }>>(endpoint);
    return response.data;
  }

  // Get user returns history
  static async getReturnsHistory(pagination?: PaginationParams): Promise<PaginatedResponse<{
    date: string;
    amount: number;
    investmentId: string;
    investmentTitle: string;
    returnPercentage: number;
  }>> {
    const queryParams = new URLSearchParams();
    
    if (pagination) {
      if (pagination.page) queryParams.append('page', pagination.page.toString());
      if (pagination.limit) queryParams.append('limit', pagination.limit.toString());
      if (pagination.sortBy) queryParams.append('sortBy', pagination.sortBy);
      if (pagination.sortOrder) queryParams.append('sortOrder', pagination.sortOrder);
    }

    const endpoint = `${API_ENDPOINTS.USER.PORTFOLIO}/returns?${queryParams.toString()}`;
    const response = await apiClient.get<PaginatedResponse<{
      date: string;
      amount: number;
      investmentId: string;
      investmentTitle: string;
      returnPercentage: number;
    }>>(endpoint);
    return response.data;
  }

  // Get user activity feed
  static async getActivityFeed(pagination?: PaginationParams): Promise<PaginatedResponse<{
    id: string;
    type: 'investment' | 'return' | 'withdrawal' | 'kyc' | 'profile_update';
    title: string;
    description: string;
    amount?: number;
    date: string;
    status: 'completed' | 'pending' | 'failed';
  }>> {
    const queryParams = new URLSearchParams();
    
    if (pagination) {
      if (pagination.page) queryParams.append('page', pagination.page.toString());
      if (pagination.limit) queryParams.append('limit', pagination.limit.toString());
      if (pagination.sortBy) queryParams.append('sortBy', pagination.sortBy);
      if (pagination.sortOrder) queryParams.append('sortOrder', pagination.sortOrder);
    }

    const endpoint = `${API_ENDPOINTS.USER.PROFILE}/activity?${queryParams.toString()}`;
    const response = await apiClient.get<PaginatedResponse<{
      id: string;
      type: 'investment' | 'return' | 'withdrawal' | 'kyc' | 'profile_update';
      title: string;
      description: string;
      amount?: number;
      date: string;
      status: 'completed' | 'pending' | 'failed';
    }>>(endpoint);
    return response.data;
  }

  // Get user preferences
  static async getUserPreferences(): Promise<{
    language: 'ar' | 'en';
    currency: 'LYD' | 'USD';
    notifications: {
      email: boolean;
      sms: boolean;
      push: boolean;
    };
    privacy: {
      profileVisibility: 'public' | 'private';
      showPortfolio: boolean;
      showInvestments: boolean;
    };
  }> {
    const response = await apiClient.get<{
      language: 'ar' | 'en';
      currency: 'LYD' | 'USD';
      notifications: {
        email: boolean;
        sms: boolean;
        push: boolean;
      };
      privacy: {
        profileVisibility: 'public' | 'private';
        showPortfolio: boolean;
        showInvestments: boolean;
      };
    }>(`${API_ENDPOINTS.USER.PREFERENCES}/full`);
    return response.data;
  }

  // Update user preferences
  static async updateUserPreferences(preferences: {
    language?: 'ar' | 'en';
    currency?: 'LYD' | 'USD';
    notifications?: {
      email?: boolean;
      sms?: boolean;
      push?: boolean;
    };
    privacy?: {
      profileVisibility?: 'public' | 'private';
      showPortfolio?: boolean;
      showInvestments?: boolean;
    };
  }): Promise<{ message: string }> {
    const response = await apiClient.put<{ message: string }>(
      `${API_ENDPOINTS.USER.PREFERENCES}/full`,
      preferences
    );
    return response.data;
  }

  // Get user documents
  static async getUserDocuments(): Promise<{
    documents: Array<{
      id: string;
      name: string;
      type: string;
      url: string;
      uploadedAt: string;
      status: 'pending' | 'approved' | 'rejected';
    }>;
  }> {
    const response = await apiClient.get<{
      documents: Array<{
        id: string;
        name: string;
        type: string;
        url: string;
        uploadedAt: string;
        status: 'pending' | 'approved' | 'rejected';
      }>;
    }>(`${API_ENDPOINTS.USER.PROFILE}/documents`);
    return response.data;
  }

  // Upload user document
  static async uploadDocument(file: File, type: string): Promise<{
    message: string;
    documentId: string;
    url: string;
  }> {
    const formData = new FormData();
    formData.append('file', file);
    formData.append('type', type);

    const response = await apiClient.post<{
      message: string;
      documentId: string;
      url: string;
    }>(`${API_ENDPOINTS.USER.PROFILE}/documents`, formData);
    return response.data;
  }

  // Delete user document
  static async deleteDocument(documentId: string): Promise<{ message: string }> {
    const response = await apiClient.delete<{ message: string }>(
      `${API_ENDPOINTS.USER.PROFILE}/documents/${documentId}`
    );
    return response.data;
  }

  // Get user notifications
  static async getUserNotifications(pagination?: PaginationParams): Promise<PaginatedResponse<{
    id: string;
    title: string;
    message: string;
    type: 'info' | 'success' | 'warning' | 'error';
    isRead: boolean;
    createdAt: string;
    actionUrl?: string;
    actionText?: string;
  }>> {
    const queryParams = new URLSearchParams();
    
    if (pagination) {
      if (pagination.page) queryParams.append('page', pagination.page.toString());
      if (pagination.limit) queryParams.append('limit', pagination.limit.toString());
      if (pagination.sortBy) queryParams.append('sortBy', pagination.sortBy);
      if (pagination.sortOrder) queryParams.append('sortOrder', pagination.sortOrder);
    }

    const endpoint = `${API_ENDPOINTS.NOTIFICATIONS.LIST}?${queryParams.toString()}`;
    const response = await apiClient.get<PaginatedResponse<{
      id: string;
      title: string;
      message: string;
      type: 'info' | 'success' | 'warning' | 'error';
      isRead: boolean;
      createdAt: string;
      actionUrl?: string;
      actionText?: string;
    }>>(endpoint);
    return response.data;
  }

  // Mark notification as read
  static async markNotificationAsRead(notificationId: string): Promise<{ message: string }> {
    const response = await apiClient.put<{ message: string }>(
      API_ENDPOINTS.NOTIFICATIONS.MARK_READ(notificationId)
    );
    return response.data;
  }

  // Mark all notifications as read
  static async markAllNotificationsAsRead(): Promise<{ message: string }> {
    const response = await apiClient.put<{ message: string }>(
      API_ENDPOINTS.NOTIFICATIONS.MARK_ALL_READ
    );
    return response.data;
  }
} 