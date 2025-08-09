import { apiClient } from '../lib/api-client';
import { API_ENDPOINTS } from '../lib/constants';
import { 
  Property, 
  PropertyFilters, 
  PaginatedResponse,
  SearchParams,
  PaginationParams,
  ApiResponse 
} from '../types/api';

export class PropertyService {
  // Get all properties with pagination and filters
  static async getProperties(
    params?: SearchParams & { filters?: PropertyFilters }
  ): Promise<PaginatedResponse<Property>> {
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

    const endpoint = `${API_ENDPOINTS.PROPERTIES.LIST}?${queryParams.toString()}`;
    const response = await apiClient.get<PaginatedResponse<Property>>(endpoint);
    return response.data;
  }

  // Get property by ID
  static async getPropertyById(id: string): Promise<Property> {
    const response = await apiClient.get<Property>(
      API_ENDPOINTS.PROPERTIES.DETAIL(id)
    );
    return response.data;
  }

  // Search properties
  static async searchProperties(searchParams: SearchParams): Promise<PaginatedResponse<Property>> {
    const response = await apiClient.post<PaginatedResponse<Property>>(
      API_ENDPOINTS.PROPERTIES.SEARCH,
      searchParams
    );
    return response.data;
  }

  // Filter properties
  static async filterProperties(filters: PropertyFilters, pagination?: PaginationParams): Promise<PaginatedResponse<Property>> {
    const response = await apiClient.post<PaginatedResponse<Property>>(
      API_ENDPOINTS.PROPERTIES.FILTER,
      { filters, pagination }
    );
    return response.data;
  }

  // Get property gallery
  static async getPropertyGallery(propertyId: string): Promise<{
    images: Array<{
      id: string;
      url: string;
      alt: string;
      isPrimary: boolean;
      category: 'exterior' | 'interior' | 'amenities' | 'floorplan';
    }>;
  }> {
    const response = await apiClient.get<{
      images: Array<{
        id: string;
        url: string;
        alt: string;
        isPrimary: boolean;
        category: 'exterior' | 'interior' | 'amenities' | 'floorplan';
      }>;
    }>(API_ENDPOINTS.PROPERTIES.GALLERY(propertyId));
    return response.data;
  }

  // Get properties by type
  static async getPropertiesByType(propertyType: string, pagination?: PaginationParams): Promise<PaginatedResponse<Property>> {
    const queryParams = new URLSearchParams();
    queryParams.append('propertyType', propertyType);
    
    if (pagination) {
      if (pagination.page) queryParams.append('page', pagination.page.toString());
      if (pagination.limit) queryParams.append('limit', pagination.limit.toString());
      if (pagination.sortBy) queryParams.append('sortBy', pagination.sortBy);
      if (pagination.sortOrder) queryParams.append('sortOrder', pagination.sortOrder);
    }

    const endpoint = `${API_ENDPOINTS.PROPERTIES.LIST}?${queryParams.toString()}`;
    const response = await apiClient.get<PaginatedResponse<Property>>(endpoint);
    return response.data;
  }

  // Get properties by location
  static async getPropertiesByLocation(location: string, pagination?: PaginationParams): Promise<PaginatedResponse<Property>> {
    const queryParams = new URLSearchParams();
    queryParams.append('location', location);
    
    if (pagination) {
      if (pagination.page) queryParams.append('page', pagination.page.toString());
      if (pagination.limit) queryParams.append('limit', pagination.limit.toString());
      if (pagination.sortBy) queryParams.append('sortBy', pagination.sortBy);
      if (pagination.sortOrder) queryParams.append('sortOrder', pagination.sortOrder);
    }

    const endpoint = `${API_ENDPOINTS.PROPERTIES.LIST}?${queryParams.toString()}`;
    const response = await apiClient.get<PaginatedResponse<Property>>(endpoint);
    return response.data;
  }

  // Get properties by price range
  static async getPropertiesByPriceRange(
    minPrice: number, 
    maxPrice: number, 
    pagination?: PaginationParams
  ): Promise<PaginatedResponse<Property>> {
    const queryParams = new URLSearchParams();
    queryParams.append('minPrice', minPrice.toString());
    queryParams.append('maxPrice', maxPrice.toString());
    
    if (pagination) {
      if (pagination.page) queryParams.append('page', pagination.page.toString());
      if (pagination.limit) queryParams.append('limit', pagination.limit.toString());
      if (pagination.sortBy) queryParams.append('sortBy', pagination.sortBy);
      if (pagination.sortOrder) queryParams.append('sortOrder', pagination.sortOrder);
    }

    const endpoint = `${API_ENDPOINTS.PROPERTIES.LIST}?${queryParams.toString()}`;
    const response = await apiClient.get<PaginatedResponse<Property>>(endpoint);
    return response.data;
  }

  // Get featured properties
  static async getFeaturedProperties(limit: number = 6): Promise<Property[]> {
    const response = await apiClient.get<Property[]>(
      `${API_ENDPOINTS.PROPERTIES.LIST}?featured=true&limit=${limit}`
    );
    return response.data;
  }

  // Get similar properties
  static async getSimilarProperties(propertyId: string, limit: number = 4): Promise<Property[]> {
    const response = await apiClient.get<Property[]>(
      `${API_ENDPOINTS.PROPERTIES.DETAIL(propertyId)}/similar?limit=${limit}`
    );
    return response.data;
  }

  // Get property statistics
  static async getPropertyStatistics(): Promise<{
    totalProperties: number;
    availableProperties: number;
    soldProperties: number;
    averagePrice: number;
    priceRange: {
      min: number;
      max: number;
    };
    popularLocations: Array<{
      location: string;
      count: number;
    }>;
  }> {
    const response = await apiClient.get<{
      totalProperties: number;
      availableProperties: number;
      soldProperties: number;
      averagePrice: number;
      priceRange: {
        min: number;
        max: number;
      };
      popularLocations: Array<{
        location: string;
        count: number;
      }>;
    }>(`${API_ENDPOINTS.PROPERTIES.LIST}/statistics`);
    return response.data;
  }

  // Get property amenities
  static async getPropertyAmenities(propertyId: string): Promise<{
    amenities: Array<{
      id: string;
      name: string;
      description: string;
      icon: string;
      isAvailable: boolean;
    }>;
  }> {
    const response = await apiClient.get<{
      amenities: Array<{
        id: string;
        name: string;
        description: string;
        icon: string;
        isAvailable: boolean;
      }>;
    }>(`${API_ENDPOINTS.PROPERTIES.DETAIL(propertyId)}/amenities`);
    return response.data;
  }

  // Get property features
  static async getPropertyFeatures(propertyId: string): Promise<{
    features: Array<{
      id: string;
      name: string;
      value: string;
      unit?: string;
    }>;
  }> {
    const response = await apiClient.get<{
      features: Array<{
        id: string;
        name: string;
        value: string;
        unit?: string;
      }>;
    }>(`${API_ENDPOINTS.PROPERTIES.DETAIL(propertyId)}/features`);
    return response.data;
  }

  // Get property location details
  static async getPropertyLocation(propertyId: string): Promise<{
    coordinates: {
      lat: number;
      lng: number;
    };
    address: {
      street: string;
      city: string;
      state: string;
      postalCode: string;
      country: string;
    };
    nearbyAmenities: Array<{
      name: string;
      type: 'school' | 'hospital' | 'shopping' | 'transport' | 'park';
      distance: number;
      coordinates: {
        lat: number;
        lng: number;
      };
    }>;
  }> {
    const response = await apiClient.get<{
      coordinates: {
        lat: number;
        lng: number;
      };
      address: {
        street: string;
        city: string;
        state: string;
        postalCode: string;
        country: string;
      };
      nearbyAmenities: Array<{
        name: string;
        type: 'school' | 'hospital' | 'shopping' | 'transport' | 'park';
        distance: number;
        coordinates: {
          lat: number;
          lng: number;
        };
      }>;
    }>(`${API_ENDPOINTS.PROPERTIES.DETAIL(propertyId)}/location`);
    return response.data;
  }

  // Track property view (for analytics)
  static async trackPropertyView(propertyId: string): Promise<void> {
    await apiClient.post(`${API_ENDPOINTS.PROPERTIES.DETAIL(propertyId)}/view`);
  }

  // Contact property owner/agent
  static async contactPropertyOwner(propertyId: string, contactData: {
    name: string;
    email: string;
    phone: string;
    message: string;
  }): Promise<{ message: string }> {
    const response = await apiClient.post<{ message: string }>(
      `${API_ENDPOINTS.PROPERTIES.DETAIL(propertyId)}/contact`,
      contactData
    );
    return response.data;
  }

  // Get property availability
  static async getPropertyAvailability(propertyId: string): Promise<{
    isAvailable: boolean;
    availableFrom?: string;
    availableTo?: string;
    viewingSlots: Array<{
      date: string;
      timeSlots: string[];
    }>;
  }> {
    const response = await apiClient.get<{
      isAvailable: boolean;
      availableFrom?: string;
      availableTo?: string;
      viewingSlots: Array<{
        date: string;
        timeSlots: string[];
      }>;
    }>(`${API_ENDPOINTS.PROPERTIES.DETAIL(propertyId)}/availability`);
    return response.data;
  }

  // Schedule property viewing
  static async scheduleViewing(propertyId: string, viewingData: {
    date: string;
    time: string;
    name: string;
    email: string;
    phone: string;
    message?: string;
  }): Promise<{ message: string; viewingId: string }> {
    const response = await apiClient.post<{ message: string; viewingId: string }>(
      `${API_ENDPOINTS.PROPERTIES.DETAIL(propertyId)}/schedule-viewing`,
      viewingData
    );
    return response.data;
  }
} 