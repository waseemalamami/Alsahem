import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import { Checkbox } from "@/components/ui/checkbox";
import { 
  Search, 
  Filter, 
  MapPin, 
  Building2, 
  Bed, 
  Bath, 
  Square, 
  Car,
  Star,
  TrendingUp,
  Calendar,
  Eye
} from "lucide-react";
import Navigation from '@/components/Navigation';
import PropertyCard from '@/components/PropertyCard';

const Properties = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedType, setSelectedType] = useState('');
  const [priceRange, setPriceRange] = useState([0, 1000000]);
  const [selectedLocation, setSelectedLocation] = useState('');
  const [showFilters, setShowFilters] = useState(false);

  // Sample properties data
  const properties = [
    {
      id: "1",
      title: "فيلا فاخرة في حي السكني",
      location: "طرابلس، حي السكني",
      price: 850000,
      originalPrice: 900000,
      bedrooms: 4,
      bathrooms: 3,
      area: 280,
      parking: 2,
      type: "فيلا",
      status: "available" as const,
      image: "https://images.unsplash.com/photo-1613490493576-7fde63acd811?w=400&h=300&fit=crop",
      rating: 4.8,
      views: 156,
      listedDate: "2024-01-15",
      investmentReturn: 12.5,
      installmentAvailable: true,
      sharesAvailable: true
    },
    {
      id: "2",
      title: "شقة مميزة في وسط المدينة",
      location: "بنغازي، وسط المدينة",
      price: 450000,
      bedrooms: 3,
      bathrooms: 2,
      area: 120,
      parking: 1,
      type: "شقة",
      status: "available" as const,
      image: "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=400&h=300&fit=crop",
      rating: 4.6,
      views: 89,
      listedDate: "2024-01-10",
      investmentReturn: 10.2,
      installmentAvailable: true,
      sharesAvailable: false
    },
    {
      id: "3",
      title: "منزل عائلي في حي هادئ",
      location: "مصراتة، حي السلام",
      price: 650000,
      bedrooms: 5,
      bathrooms: 4,
      area: 350,
      parking: 3,
      type: "منزل",
      status: "reserved" as const,
      image: "https://images.unsplash.com/photo-1570129477492-45c003edd2be?w=400&h=300&fit=crop",
      rating: 4.9,
      views: 234,
      listedDate: "2024-01-05",
      investmentReturn: 15.3,
      installmentAvailable: false,
      sharesAvailable: true
    },
    {
      id: "4",
      title: "أرض سكنية للبناء",
      location: "الزاوية، شارع البحر",
      price: 320000,
      bedrooms: 0,
      bathrooms: 0,
      area: 500,
      parking: 0,
      type: "أرض",
      status: "available" as const,
      image: "https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=400&h=300&fit=crop",
      rating: 4.4,
      views: 67,
      listedDate: "2024-01-12",
      investmentReturn: 8.7,
      installmentAvailable: true,
      sharesAvailable: true
    },
    {
      id: "5",
      title: "شقة دوبلكس في برج سكني",
      location: "طرابلس، برج السكني",
      price: 780000,
      bedrooms: 4,
      bathrooms: 3,
      area: 200,
      parking: 2,
      type: "دوبلكس",
      status: "available" as const,
      image: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=400&h=300&fit=crop",
      rating: 4.7,
      views: 123,
      listedDate: "2024-01-08",
      investmentReturn: 13.1,
      installmentAvailable: true,
      sharesAvailable: true
    },
    {
      id: "6",
      title: "فيلا شاطئية في زوارة",
      location: "زوارة، الشاطئ",
      price: 1200000,
      bedrooms: 6,
      bathrooms: 5,
      area: 450,
      parking: 4,
      type: "فيلا",
      status: "sold" as const,
      image: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=400&h=300&fit=crop",
      rating: 4.9,
      views: 345,
      listedDate: "2024-01-03",
      investmentReturn: 18.2,
      installmentAvailable: false,
      sharesAvailable: false
    }
  ];

  const formatPrice = (price: number) => {
    return `${price.toLocaleString('en-US')} د.ل`;
  };

  const filteredProperties = properties.filter(property => {
    const matchesSearch = property.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         property.location.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesType = !selectedType || property.type === selectedType;
    const matchesLocation = !selectedLocation || property.location.includes(selectedLocation);
    const matchesPrice = property.price >= priceRange[0] && property.price <= priceRange[1];
    
    return matchesSearch && matchesType && matchesLocation && matchesPrice;
  });

  return (
    <div className="min-h-screen bg-gray-50 font-['Cairo',sans-serif]" dir="rtl">
      <Navigation />
      
      {/* Header Section - More Compact */}
      <section className="bg-gradient-to-br from-blue-600 to-blue-800 text-white py-8">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center mb-6">
            <h1 className="text-3xl font-bold mb-2">العقارات المتاحة</h1>
            <p className="text-blue-100">اختر من مجموعة متنوعة من العقارات المميزة في ليبيا</p>
          </div>
          
          {/* Search Bar - More Compact */}
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

      {/* Filters Section - More Compact */}
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
                    <SelectItem value="فيلا">فيلا</SelectItem>
                    <SelectItem value="شقة">شقة</SelectItem>
                    <SelectItem value="منزل">منزل</SelectItem>
                    <SelectItem value="دوبلكس">دوبلكس</SelectItem>
                    <SelectItem value="أرض">أرض</SelectItem>
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
                    <SelectItem value="طرابلس">طرابلس</SelectItem>
                    <SelectItem value="بنغازي">بنغازي</SelectItem>
                    <SelectItem value="مصراتة">مصراتة</SelectItem>
                    <SelectItem value="الزاوية">الزاوية</SelectItem>
                    <SelectItem value="زوارة">زوارة</SelectItem>
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

      {/* Properties Grid - More Compact */}
      <section className="py-8">
        <div className="max-w-6xl mx-auto px-4">
          {/* Results Header - More Compact */}
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
        </div>
      </section>
    </div>
  );
};

export default Properties; 