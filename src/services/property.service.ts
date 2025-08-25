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
  // Get all properties from .NET backend
  static async getProperties(
    params?: SearchParams & { filters?: PropertyFilters }
  ): Promise<PaginatedResponse<Property>> {
    try {
      console.log('🔍 Fetching properties from backend...');
      
      // Call the .NET backend endpoint
      const response = await apiClient.get<Property[]>(API_ENDPOINTS.PROPERTIES.LIST);
      
      console.log('🔍 Raw properties response:', response);
      
      // The API client returns the parsed JSON directly
      const properties = response || [];
      
      console.log(`✅ Found ${properties.length} properties`);
      
      // Apply client-side filtering and pagination
      let filteredProperties = properties;
      
      if (params?.filters) {
        filteredProperties = properties.filter(property => {
          if (params.filters?.cityId && property.cityId !== params.filters.cityId) return false;
          if (params.filters?.typePropertyId && property.typePropertyId !== params.filters.typePropertyId) return false;
          if (params.filters?.minPrice && property.price < params.filters.minPrice) return false;
          if (params.filters?.maxPrice && property.price > params.filters.maxPrice) return false;
          if (params.filters?.bedrooms && property.bedrooms < params.filters.bedrooms) return false;
          if (params.filters?.bathrooms && property.bathrooms < params.filters.bathrooms) return false;
          return true;
        });
      }
      
      // Apply client-side pagination
      const page = params?.pagination?.page || 1;
      const limit = params?.pagination?.limit || 10;
      const startIndex = (page - 1) * limit;
      const endIndex = startIndex + limit;
      const paginatedProperties = filteredProperties.slice(startIndex, endIndex);
      
      return {
        data: paginatedProperties,
        pagination: {
          page,
          limit,
          total: filteredProperties.length,
          totalPages: Math.ceil(filteredProperties.length / limit),
        },
      };
    } catch (error: any) {
      console.error('❌ Error fetching properties:', error);
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

  // Get property by ID from .NET backend
  static async getPropertyById(id: string): Promise<Property | null> {
    try {
      console.log(`🔍 Fetching property ${id} from backend...`);
      
      const response = await apiClient.get<Property>(
        API_ENDPOINTS.PROPERTIES.DETAIL(id)
      );
      
      console.log('🔍 Property detail response:', response);
      
      return response || null;
    } catch (error: any) {
      console.error(`❌ Error fetching property ${id}:`, error);
      return null;
    }
  }

  // Get cities for filtering
  static async getCities(): Promise<Array<{ id: number; name: string }>> {
    try {
      console.log('🔍 Fetching cities from backend...');
      
      const response = await apiClient.get<Array<{ id: number; name: string }>>(
        API_ENDPOINTS.CITIES.LIST
      );
      
      console.log('🔍 Cities response:', response);
      
      return response || [];
    } catch (error: any) {
      console.error('❌ Error fetching cities:', error);
      return [];
    }
  }

  // Get property types for filtering
  static async getPropertyTypes(): Promise<Array<{ id: number; name: string }>> {
    try {
      console.log('🔍 Fetching property types from backend...');
      
      const response = await apiClient.get<Array<{ id: number; name: string }>>(
        API_ENDPOINTS.PROPERTY_TYPES.LIST
      );
      
      console.log('🔍 Property types response:', response);
      
      return response || [];
    } catch (error: any) {
      console.error('❌ Error fetching property types:', error);
      return [];
    }
  }
} 