import { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import { 
  Search, 
  Filter, 
  Building2, 
  RefreshCw
} from "lucide-react";
import Navigation from '@/components/Navigation';
import PropertyCard from '@/components/PropertyCard';
import { PropertyService } from '@/services/property.service';
import { Property } from '@/types/api';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Skeleton } from '@/components/ui/skeleton';

const Properties = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedType, setSelectedType] = useState('');
  const [priceRange, setPriceRange] = useState([0, 1000000]);
  const [selectedLocation, setSelectedLocation] = useState('');
  const [showFilters, setShowFilters] = useState(false);
  const [properties, setProperties] = useState<Property[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [propertyTypes, setPropertyTypes] = useState<string[]>([]);
  const [cities, setCities] = useState<string[]>([]);

  // Load data from backend
  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      setLoading(true);
      setError(null);
      
      // Load properties
      const propertiesResponse = await PropertyService.getProperties();
      const propertyData = propertiesResponse.data || [];
      setProperties(propertyData);
      
      // Extract unique types and cities for filters
      const types = [...new Set(propertyData.map(p => p.typeProperty?.name).filter(Boolean))];
      const cityList = [...new Set(propertyData.map(p => p.city?.name).filter(Boolean))];
      
      setPropertyTypes(types);
      setCities(cityList);
      
      // Update price range based on actual data
      if (propertyData.length > 0) {
        const prices = propertyData.map(p => p.price).filter(p => p > 0);
        const maxPrice = Math.max(...prices);
        setPriceRange([0, maxPrice]);
      }
    } catch (err: any) {
      setError(err.message || 'Failed to load properties');
      console.error('Error loading properties:', err);
    } finally {
      setLoading(false);
    }
  };

  const formatPrice = (price: number) => {
    return `${price.toLocaleString('en-US')} د.ل`;
  };

  const filteredProperties = properties.filter(property => {
    const matchesSearch = property.title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         property.city?.name?.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesType = !selectedType || property.typeProperty?.name === selectedType;
    const matchesLocation = !selectedLocation || property.city?.name?.includes(selectedLocation);
    const matchesPrice = property.price >= priceRange[0] && property.price <= priceRange[1];
    
    return matchesSearch && matchesType && matchesLocation && matchesPrice;
  });

  return (
    <div className="min-h-screen bg-gray-50 font-['Cairo',sans-serif]" dir="rtl">
      <Navigation />
      
      {/* Header Section */}
      <section className="bg-gradient-to-br from-blue-600 to-blue-800 text-white py-8">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center mb-6">
            <h1 className="text-3xl font-bold mb-2">العقارات المتاحة</h1>
            <p className="text-blue-100">اختر من مجموعة متنوعة من العقارات المميزة في ليبيا</p>
          </div>
          
          {/* Search Bar */}
          <div className="max-w-2xl mx-auto">
            <div className="relative">
              <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <Input
                type="text"
                placeholder="ابحث عن عقار أو موقع..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 pr-12 h-10 bg-white/10 border-white/20 text-white placeholder:text-blue-200 focus:bg-white/20"
              />
              <Button 
                size="sm" 
                variant="outline" 
                className="absolute left-2 top-1/2 transform -translate-y-1/2 h-6 px-2 text-xs bg-white border-blue-600 text-blue-600 hover:bg-blue-50 hover:text-blue-700 hover:border-blue-700"
                onClick={() => setShowFilters(!showFilters)}
              >
                <Filter className="h-3 w-3 ml-1" />
                فلاتر
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Filters Section */}
      {showFilters && (
        <section className="bg-white border-b border-gray-200 py-4">
          <div className="max-w-6xl mx-auto px-4">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div>
                <label className="text-xs font-medium text-gray-700 mb-1 block">نوع العقار</label>
                <Select value={selectedType} onValueChange={setSelectedType}>
                  <SelectTrigger className="h-8 text-xs">
                    <SelectValue placeholder="اختر النوع" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="">جميع الأنواع</SelectItem>
                    {propertyTypes.map((type) => (
                      <SelectItem key={type} value={type}>{type}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              
              <div>
                <label className="text-xs font-medium text-gray-700 mb-1 block">الموقع</label>
                <Select value={selectedLocation} onValueChange={setSelectedLocation}>
                  <SelectTrigger className="h-8 text-xs">
                    <SelectValue placeholder="اختر الموقع" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="">جميع المواقع</SelectItem>
                    {cities.map((city) => (
                      <SelectItem key={city} value={city}>{city}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              
              <div>
                <label className="text-xs font-medium text-gray-700 mb-1 block">نطاق السعر</label>
                <div className="text-xs text-gray-600 mb-2">
                  {formatPrice(priceRange[0])} - {formatPrice(priceRange[1])}
                </div>
                <Slider
                  value={priceRange}
                  onValueChange={setPriceRange}
                  max={1000000}
                  step={10000}
                  className="w-full"
                />
              </div>
              
              <div className="flex items-end">
                <Button 
                  size="sm" 
                  variant="outline" 
                  className="h-8 text-xs"
                  onClick={() => {
                    setSearchTerm('');
                    setSelectedType('');
                    setSelectedLocation('');
                    setPriceRange([0, 1000000]);
                  }}
                >
                  مسح الفلاتر
                </Button>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Properties Grid */}
      <section className="py-8">
        <div className="max-w-6xl mx-auto px-4">
          {/* Loading State */}
          {loading && (
            <div className="space-y-6">
              <div className="flex justify-between items-center">
                <Skeleton className="h-6 w-32" />
                <Skeleton className="h-8 w-32" />
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {[1, 2, 3, 4, 5, 6].map((i) => (
                  <div key={i} className="space-y-3">
                    <Skeleton className="h-48 w-full" />
                    <Skeleton className="h-4 w-3/4" />
                    <Skeleton className="h-4 w-1/2" />
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Error State */}
          {error && !loading && (
            <Alert>
              <AlertDescription>
                <div className="flex justify-between items-center">
                  <span>Error loading properties: {error}</span>
                  <Button onClick={loadData} variant="outline" size="sm">
                    <RefreshCw className="h-4 w-4 mr-2" />
                    Retry
                  </Button>
                </div>
              </AlertDescription>
            </Alert>
          )}

          {/* Results Header */}
          {!loading && !error && (
            <>
              <div className="flex items-center justify-between mb-6">
                <div className="text-sm text-gray-600">
                  تم العثور على <span className="font-semibold text-blue-600">{filteredProperties.length}</span> عقار
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-xs text-gray-600">ترتيب حسب:</span>
                  <Select>
                    <SelectTrigger className="h-8 w-32 text-xs">
                      <SelectValue placeholder="الأحدث" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="newest">الأحدث</SelectItem>
                      <SelectItem value="price-low">السعر: من الأقل</SelectItem>
                      <SelectItem value="price-high">السعر: من الأعلى</SelectItem>
                      <SelectItem value="rating">التقييم</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              {/* Properties Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {filteredProperties.map((property) => (
                  <PropertyCard key={property.id} property={property} />
                ))}
              </div>

              {/* No Results */}
              {filteredProperties.length === 0 && (
                <div className="text-center py-12">
                  <Building2 className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">لا توجد نتائج</h3>
                  <p className="text-gray-600 mb-4">جرب تغيير معايير البحث أو الفلاتر</p>
                  <Button 
                    variant="outline" 
                    onClick={() => {
                      setSearchTerm('');
                      setSelectedType('');
                      setSelectedLocation('');
                      setPriceRange([0, 1000000]);
                    }}
                  >
                    مسح جميع الفلاتر
                  </Button>
                </div>
              )}
            </>
          )}
        </div>
      </section>
    </div>
  );
};

export default Properties; 