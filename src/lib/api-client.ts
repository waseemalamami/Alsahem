import { 
  ApiResponse, 
  ApiError as ApiErrorType, 
  RequestOptions, 
  CacheEntry, 
  ApiClientConfig,
  RequestInterceptor,
  ResponseInterceptor,
  IApiService
} from '../types/api';
import { 
  APP_CONFIG, 
  REQUEST_CONFIG, 
  ERROR_MESSAGES, 
  HTTP_STATUS,
  STORAGE_KEYS 
} from './constants';

// ApiError class for error handling
export class ApiError extends Error {
  public error: {
    code: string;
    message: string;
    details?: Record<string, string[]>;
  };
  public timestamp: string;

  constructor(errorData: ApiErrorType) {
    super(errorData.error.message);
    this.name = 'ApiError';
    this.error = errorData.error;
    this.timestamp = errorData.timestamp;
  }
}

// Cache storage
class CacheManager {
  private cache = new Map<string, CacheEntry<any>>();

  set<T>(key: string, data: T, duration: number): void {
    const expiresAt = Date.now() + duration;
    this.cache.set(key, { data, timestamp: Date.now(), expiresAt });
  }

  get<T>(key: string): T | null {
    const entry = this.cache.get(key);
    if (!entry) return null;
    
    if (Date.now() > entry.expiresAt) {
      this.cache.delete(key);
      return null;
    }
    
    return entry.data;
  }

  clear(): void {
    this.cache.clear();
  }

  delete(key: string): void {
    this.cache.delete(key);
  }
}

// Retry logic
class RetryManager {
  async executeWithRetry<T>(
    operation: () => Promise<T>,
    maxAttempts: number = REQUEST_CONFIG.RETRY_ATTEMPTS,
    delay: number = REQUEST_CONFIG.RETRY_DELAY
  ): Promise<T> {
    let lastError: Error;
    
    for (let attempt = 1; attempt <= maxAttempts; attempt++) {
      try {
        return await operation();
      } catch (error) {
        lastError = error as Error;
        
        if (attempt === maxAttempts) {
          throw lastError;
        }
        
        // Don't retry on client errors (4xx)
        if (error instanceof ApiError && error.error.code.startsWith('4')) {
          throw error;
        }
        
        // Wait before retrying
        await new Promise(resolve => setTimeout(resolve, delay * attempt));
      }
    }
    
    throw lastError!;
  }
}

// Main API Client
export class ApiClient implements IApiService {
  private config: ApiClientConfig;
  private cache: CacheManager;
  private retry: RetryManager;
  private requestInterceptors: RequestInterceptor[] = [];
  private responseInterceptors: ResponseInterceptor[] = [];

  constructor(config?: Partial<ApiClientConfig>) {
    this.config = {
      baseURL: APP_CONFIG.API_BASE_URL,
      timeout: REQUEST_CONFIG.TIMEOUT,
      retryAttempts: REQUEST_CONFIG.RETRY_ATTEMPTS,
      retryDelay: REQUEST_CONFIG.RETRY_DELAY,
      defaultHeaders: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'Accept-Language': 'ar',
      },
      ...config,
    };
    
    this.cache = new CacheManager();
    this.retry = new RetryManager();
  }

  // Interceptor management
  addRequestInterceptor(interceptor: RequestInterceptor): void {
    this.requestInterceptors.push(interceptor);
  }

  addResponseInterceptor(interceptor: ResponseInterceptor): void {
    this.responseInterceptors.push(interceptor);
  }

  // Token management
  private getAuthToken(): string | null {
    return localStorage.getItem(STORAGE_KEYS.AUTH_TOKEN);
  }

  private setAuthToken(token: string): void {
    localStorage.setItem(STORAGE_KEYS.AUTH_TOKEN, token);
  }

  private removeAuthToken(): void {
    localStorage.removeItem(STORAGE_KEYS.AUTH_TOKEN);
  }

  // Request preparation
  private async prepareRequest(endpoint: string, options: RequestOptions = {}): Promise<RequestInit> {
    const url = `${this.config.baseURL}${endpoint}`;
    const token = this.getAuthToken();
    
    const headers: Record<string, string> = {
      ...this.config.defaultHeaders,
      ...options.headers,
    };

    if (token) {
      headers['Authorization'] = `Bearer ${token}`;
    }

    // Apply request interceptors
    let finalOptions = { ...options, headers };
    for (const interceptor of this.requestInterceptors) {
      if (interceptor.onRequest) {
        finalOptions = await interceptor.onRequest(finalOptions);
      }
    }

    return {
      method: 'GET',
      headers: finalOptions.headers,
      signal: AbortSignal.timeout(finalOptions.timeout || this.config.timeout),
    };
  }

  // Response handling
  private async handleResponse<T>(response: Response): Promise<ApiResponse<T>> {
    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      const apiError = new ApiError({
        success: false,
        error: {
          code: errorData.error?.code || `HTTP_${response.status}`,
          message: errorData.error?.message || this.getErrorMessage(response.status),
          details: errorData.error?.details,
        },
        timestamp: new Date().toISOString(),
      });

      // Handle authentication errors
      if (response.status === HTTP_STATUS.UNAUTHORIZED) {
        this.removeAuthToken();
        // You can dispatch a logout event here if needed
      }

      throw apiError;
    }

    const data = await response.json();
    
    // Apply response interceptors
    let finalResponse = data;
    for (const interceptor of this.responseInterceptors) {
      if (interceptor.onResponse) {
        finalResponse = await interceptor.onResponse(finalResponse);
      }
    }

    return finalResponse;
  }

  // Error message mapping
  private getErrorMessage(status: number): string {
    switch (status) {
      case HTTP_STATUS.BAD_REQUEST:
        return ERROR_MESSAGES.VALIDATION_ERROR;
      case HTTP_STATUS.UNAUTHORIZED:
        return ERROR_MESSAGES.UNAUTHORIZED;
      case HTTP_STATUS.FORBIDDEN:
        return ERROR_MESSAGES.FORBIDDEN;
      case HTTP_STATUS.NOT_FOUND:
        return ERROR_MESSAGES.NOT_FOUND;
      case HTTP_STATUS.INTERNAL_SERVER_ERROR:
        return ERROR_MESSAGES.SERVER_ERROR;
      case HTTP_STATUS.SERVICE_UNAVAILABLE:
        return ERROR_MESSAGES.SERVER_ERROR;
      default:
        return ERROR_MESSAGES.UNKNOWN_ERROR;
    }
  }

  // HTTP Methods
  async get<T>(endpoint: string, options: RequestOptions = {}): Promise<ApiResponse<T>> {
    const cacheKey = `GET:${endpoint}:${JSON.stringify(options)}`;
    
    // Check cache first
    if (options.cache !== false) {
      const cached = this.cache.get<T>(cacheKey);
      if (cached) return cached;
    }

    return this.retry.executeWithRetry(async () => {
      const requestInit = await this.prepareRequest(endpoint, options);
      const response = await fetch(`${this.config.baseURL}${endpoint}`, requestInit);
      const result = await this.handleResponse<T>(response);
      
      // Cache successful responses
      if (options.cache !== false) {
        this.cache.set(cacheKey, result, options.cacheDuration || REQUEST_CONFIG.CACHE_DURATION);
      }
      
      return result;
    }, options.retryAttempts, options.retryDelay);
  }

  async post<T>(endpoint: string, data?: any, options: RequestOptions = {}): Promise<ApiResponse<T>> {
    return this.retry.executeWithRetry(async () => {
      const requestInit = await this.prepareRequest(endpoint, options);
      const response = await fetch(`${this.config.baseURL}${endpoint}`, {
        ...requestInit,
        method: 'POST',
        body: data ? JSON.stringify(data) : undefined,
      });
      
      return this.handleResponse<T>(response);
    }, options.retryAttempts, options.retryDelay);
  }

  async put<T>(endpoint: string, data?: any, options: RequestOptions = {}): Promise<ApiResponse<T>> {
    return this.retry.executeWithRetry(async () => {
      const requestInit = await this.prepareRequest(endpoint, options);
      const response = await fetch(`${this.config.baseURL}${endpoint}`, {
        ...requestInit,
        method: 'PUT',
        body: data ? JSON.stringify(data) : undefined,
      });
      
      return this.handleResponse<T>(response);
    }, options.retryAttempts, options.retryDelay);
  }

  async patch<T>(endpoint: string, data?: any, options: RequestOptions = {}): Promise<ApiResponse<T>> {
    return this.retry.executeWithRetry(async () => {
      const requestInit = await this.prepareRequest(endpoint, options);
      const response = await fetch(`${this.config.baseURL}${endpoint}`, {
        ...requestInit,
        method: 'PATCH',
        body: data ? JSON.stringify(data) : undefined,
      });
      
      return this.handleResponse<T>(response);
    }, options.retryAttempts, options.retryDelay);
  }

  async delete<T>(endpoint: string, options: RequestOptions = {}): Promise<ApiResponse<T>> {
    return this.retry.executeWithRetry(async () => {
      const requestInit = await this.prepareRequest(endpoint, options);
      const response = await fetch(`${this.config.baseURL}${endpoint}`, {
        ...requestInit,
        method: 'DELETE',
      });
      
      return this.handleResponse<T>(response);
    }, options.retryAttempts, options.retryDelay);
  }

  async upload<T>(endpoint: string, file: File, options: RequestOptions = {}): Promise<ApiResponse<T>> {
    return this.retry.executeWithRetry(async () => {
      const requestInit = await this.prepareRequest(endpoint, options);
      
      const formData = new FormData();
      formData.append('file', file);
      
      const response = await fetch(`${this.config.baseURL}${endpoint}`, {
        ...requestInit,
        method: 'POST',
        body: formData,
        headers: {
          // Remove Content-Type to let browser set it with boundary
          ...Object.fromEntries(
            Object.entries(requestInit.headers as Record<string, string>).filter(
              ([key]) => key.toLowerCase() !== 'content-type'
            )
          ),
        },
      });
      
      return this.handleResponse<T>(response);
    }, options.retryAttempts, options.retryDelay);
  }

  // Utility methods
  clearCache(): void {
    this.cache.clear();
  }

  setAuthToken(token: string): void {
    this.setAuthToken(token);
  }

  logout(): void {
    this.removeAuthToken();
    this.clearCache();
  }
}

// Create and export default instance
export const apiClient = new ApiClient();

// Add default interceptors
apiClient.addRequestInterceptor({
  onRequest: (config) => {
    // Add request ID for tracking
    config.headers = {
      ...config.headers,
      'X-Request-ID': crypto.randomUUID(),
    };
    return config;
  },
});

apiClient.addResponseInterceptor({
  onResponse: (response) => {
    // Log successful responses in development
    if (import.meta.env.DEV) {
      console.log('API Response:', response);
    }
    return response;
  },
  onResponseError: (error) => {
    // Log errors in development
    if (import.meta.env.DEV) {
      console.error('API Error:', error);
    }
    return error;
  },
}); 