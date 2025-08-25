import React, { useState, useEffect } from 'react';
import { PropertyService } from '../services/property.service';
import { Property } from '../types/api';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { Button } from './ui/button';
import { Alert, AlertDescription } from './ui/alert';
import { Skeleton } from './ui/skeleton';

export const RealDataPropertyList: React.FC = () => {
  const [properties, setProperties] = useState<Property[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [cities, setCities] = useState<Array<{ id: number; name: string }>>([]);
  const [propertyTypes, setPropertyTypes] = useState<Array<{ id: number; name: string }>>([]);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      setLoading(true);
      setError(null);

      // Load properties, cities, and property types in parallel
      const [propertiesResult, citiesResult, typesResult] = await Promise.all([
        PropertyService.getProperties(),
        PropertyService.getCities(),
        PropertyService.getPropertyTypes(),
      ]);

      setProperties(propertiesResult.data);
      setCities(citiesResult);
      setPropertyTypes(typesResult);

      console.log('✅ Data loaded successfully:', {
        properties: propertiesResult.data.length,
        cities: citiesResult.length,
        types: typesResult.length,
      });
    } catch (err: any) {
      console.error('❌ Error loading data:', err);
      setError(err.message || 'Failed to load data');
    } finally {
      setLoading(false);
    }
  };

  const getCityName = (cityId: number) => {
    return cities.find(city => city.id === cityId)?.name || 'Unknown City';
  };

  const getPropertyTypeName = (typeId: number) => {
    return propertyTypes.find(type => type.id === typeId)?.name || 'Unknown Type';
  };

  if (loading) {
    return (
      <div className="space-y-4">
        <Card>
          <CardHeader>
            <CardTitle>🏠 Real Properties from Backend</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[1, 2, 3].map((i) => (
                <div key={i} className="flex space-x-4">
                  <Skeleton className="h-24 w-24" />
                  <div className="space-y-2 flex-1">
                    <Skeleton className="h-4 w-3/4" />
                    <Skeleton className="h-4 w-1/2" />
                    <Skeleton className="h-4 w-1/4" />
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  if (error) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>🏠 Real Properties from Backend</CardTitle>
        </CardHeader>
        <CardContent>
          <Alert variant="destructive">
            <AlertDescription>
              <strong>Error:</strong> {error}
            </AlertDescription>
          </Alert>
          <Button onClick={loadData} className="mt-4">
            Retry
          </Button>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          🏠 Real Properties from Backend
          <Badge variant="secondary">
            {properties.length} properties
          </Badge>
        </CardTitle>
      </CardHeader>
      <CardContent>
        {properties.length === 0 ? (
          <Alert>
            <AlertDescription>
              <strong>No properties found.</strong> The database is empty. 
              You can add properties through the backend API.
            </AlertDescription>
          </Alert>
        ) : (
          <div className="space-y-4">
            {properties.map((property) => (
              <div
                key={property.id}
                className="border rounded-lg p-4 hover:shadow-md transition-shadow"
              >
                <div className="flex items-start gap-4">
                  <div className="w-24 h-24 bg-gray-200 rounded-lg flex items-center justify-center">
                    <span className="text-gray-500 text-sm">Image</span>
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold text-lg">{property.title}</h3>
                    <p className="text-gray-600 text-sm mb-2">{property.description}</p>
                    <div className="flex items-center gap-4 text-sm text-gray-500">
                      <span>📍 {getCityName(property.cityId)}</span>
                      <span>🏠 {getPropertyTypeName(property.typePropertyId)}</span>
                      <span>🛏️ {property.bedrooms} beds</span>
                      <span>🚿 {property.bathrooms} baths</span>
                      <span>📐 {property.area}m²</span>
                    </div>
                    <div className="mt-2">
                      <span className="text-lg font-bold text-green-600">
                        ${property.price?.toLocaleString() || 'N/A'}
                      </span>
                      {property.originalPrice && property.originalPrice > property.price && (
                        <span className="text-sm text-gray-500 line-through ml-2">
                          ${property.originalPrice.toLocaleString()}
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
        
        <div className="mt-6 p-4 bg-gray-50 rounded-lg">
          <h4 className="font-semibold mb-2">📊 Data Summary:</h4>
          <div className="grid grid-cols-3 gap-4 text-sm">
            <div>
              <span className="font-medium">Properties:</span> {properties.length}
            </div>
            <div>
              <span className="font-medium">Cities:</span> {cities.length}
            </div>
            <div>
              <span className="font-medium">Property Types:</span> {propertyTypes.length}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
