import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  MapPin, 
  Bed, 
  Bath, 
  Square, 
  Car, 
  Star, 
  TrendingUp,
  Building2,
  Calendar,
  Eye,
  Coins,
  PieChart
} from "lucide-react";
import { Link } from 'react-router-dom';

interface PropertyCardProps {
  property: {
    id: string;
    title: string;
    location: string;
    price: number;
    originalPrice?: number;
    bedrooms: number;
    bathrooms: number;
    area: number;
    parking: number;
    type: string;
    status: 'available' | 'sold' | 'reserved';
    image: string;
    rating: number;
    views: number;
    listedDate: string;
    investmentReturn?: number;
    installmentAvailable?: boolean;
    sharesAvailable?: boolean;
    // New properties for stock information
    totalShares?: number;
    availableShares?: number;
    stockPrice?: number;
    totalInvestmentValue?: number;
  };
}

const PropertyCard = ({ property }: PropertyCardProps) => {
  const formatPrice = (price: number) => {
    return `${price.toLocaleString('en-US')} د.ل`;
  };

  const formatStockPrice = (price: number) => {
    return `${price.toLocaleString('en-US')} د.ل`;
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'available':
        return 'bg-green-100 text-green-800 border-green-200';
      case 'sold':
        return 'bg-red-100 text-red-800 border-red-200';
      case 'reserved':
        return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'available':
        return 'متاح';
      case 'sold':
        return 'مباع';
      case 'reserved':
        return 'محجوز';
      default:
        return 'غير محدد';
    }
  };

  return (
    <Card className="group hover:shadow-xl transition-all duration-500 border border-gray-200 overflow-hidden h-full flex flex-col bg-white hover:bg-gray-50/50">
      {/* Image Section - Responsive */}
      <div className="relative">
        <img 
          src={property.image} 
          alt={property.title}
          className="w-full h-40 sm:h-48 lg:h-52 object-cover group-hover:scale-105 transition-transform duration-500"
        />
        
        {/* Status Badge - Responsive positioning */}
        <Badge className={`absolute top-3 right-3 text-xs px-3 py-1.5 border-2 font-semibold shadow-lg rounded-xl ${getStatusColor(property.status)}`}>
          {getStatusText(property.status)}
        </Badge>
        
        {/* Investment Return Badge - Responsive positioning */}
        {property.investmentReturn && (
          <Badge className="absolute top-3 left-3 bg-gradient-to-r from-blue-600 to-blue-700 text-white text-xs px-3 py-1.5 border-0 font-semibold shadow-lg rounded-xl">
            <TrendingUp className="h-3 w-3 mr-1" />
            {property.investmentReturn}%
          </Badge>
        )}
        
        {/* Rating - Responsive positioning */}
        <div className="absolute bottom-3 left-3 bg-white/95 backdrop-blur-sm rounded-xl px-2.5 py-1.5 flex items-center gap-1.5 shadow-lg">
          <Star className="h-3.5 w-3.5 text-yellow-500 fill-current" />
          <span className="text-xs font-semibold text-gray-700">{property.rating}</span>
        </div>
        
        {/* Views - Responsive positioning */}
        <div className="absolute bottom-3 right-3 bg-white/95 backdrop-blur-sm rounded-xl px-2.5 py-1.5 flex items-center gap-1.5 shadow-lg">
          <Eye className="h-3.5 w-3.5 text-gray-600" />
          <span className="text-xs font-semibold text-gray-700">{property.views}</span>
        </div>
      </div>

      {/* Content Section - Responsive */}
      <CardContent className="p-5 sm:p-6 lg:p-7 flex-1 flex flex-col">
        {/* Header */}
        <div className="mb-4 sm:mb-5">
          <div className="flex items-start justify-between gap-3 mb-3">
            <h3 className="font-bold text-base sm:text-lg lg:text-xl text-gray-900 leading-tight line-clamp-2 flex-1 group-hover:text-blue-700 transition-colors duration-300">
              {property.title}
            </h3>
            <Badge variant="outline" className="text-xs px-3 py-1.5 flex-shrink-0 border-2 border-blue-200 text-blue-700 bg-blue-50 font-semibold rounded-xl">
              {property.type}
            </Badge>
          </div>
          
          <div className="flex items-center gap-2 text-gray-600 mb-3">
            <MapPin className="h-4 w-4 sm:h-5 sm:w-5 text-blue-500 flex-shrink-0" />
            <span className="text-sm sm:text-base line-clamp-1 font-medium">{property.location}</span>
          </div>
        </div>

        {/* Stock Information - New Section */}
        {property.sharesAvailable && property.totalShares && property.availableShares && property.stockPrice && (
          <div className="mb-4 sm:mb-5 p-4 bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl border-2 border-blue-200 shadow-sm">
            <div className="flex items-center gap-2 mb-3">
              <PieChart className="h-5 w-5 text-blue-600" />
              <span className="text-sm font-bold text-blue-800">معلومات الأسهم</span>
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              {/* Available Shares */}
              <div className="text-center">
                <div className="text-xl sm:text-2xl font-bold text-blue-600">
                  {property.availableShares.toLocaleString('en-US')}
                </div>
                <div className="text-sm text-blue-700 font-semibold">الأسهم المتاحة</div>
                <div className="text-xs text-blue-600">
                  من {property.totalShares.toLocaleString('en-US')}
                </div>
              </div>
              
              {/* Stock Price */}
              <div className="text-center">
                <div className="text-xl sm:text-2xl font-bold text-green-600">
                  {property.stockPrice.toLocaleString('en-US')} د.ل
                </div>
                <div className="text-sm text-green-700 font-semibold">سعر السهم</div>
                <div className="text-xs text-green-600">
                  الحد الأدنى
                </div>
              </div>
            </div>
            
            {/* Total Investment Value */}
            {property.totalInvestmentValue && (
              <div className="mt-3 pt-3 border-t border-blue-200 text-center">
                <div className="text-sm font-bold text-gray-700">
                  إجمالي قيمة الاستثمار
                </div>
                <div className="text-lg font-bold text-gray-900">
                  {formatPrice(property.totalInvestmentValue)}
                </div>
              </div>
            )}
          </div>
        )}

        {/* Price Section - Responsive */}
        <div className="mb-4 sm:mb-5">
          <div className="flex items-center gap-3 mb-3">
            <span className="text-xl sm:text-2xl lg:text-3xl font-bold text-blue-600">
              {formatPrice(property.price)}
            </span>
            {property.originalPrice && property.originalPrice > property.price && (
              <span className="text-sm text-gray-500 line-through">
                {formatPrice(property.originalPrice)}
              </span>
            )}
          </div>
          
          {/* Investment Options - Responsive badges */}
          <div className="flex flex-wrap gap-2">
            {property.installmentAvailable && (
              <Badge variant="secondary" className="text-xs px-3 py-1.5 bg-green-100 text-green-700 border-2 border-green-200 font-semibold rounded-xl">
                تقسيط متاح
              </Badge>
            )}
            {property.sharesAvailable && (
              <Badge variant="secondary" className="text-xs px-3 py-1.5 bg-blue-100 text-blue-700 border-2 border-blue-200 font-semibold rounded-xl">
                أسهم متاحة
              </Badge>
            )}
          </div>
        </div>

        {/* Property Details - Responsive grid */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4 mb-5 sm:mb-6">
          <div className="flex items-center gap-2 text-gray-700 bg-gray-50 rounded-xl p-3">
            <Bed className="h-4 w-4 sm:h-5 sm:w-5 text-blue-500 flex-shrink-0" />
            <span className="text-sm sm:text-base font-bold">{property.bedrooms}</span>
          </div>
          <div className="flex items-center gap-2 text-gray-700 bg-gray-50 rounded-xl p-3">
            <Bath className="h-4 w-4 sm:h-5 sm:w-5 text-blue-500 flex-shrink-0" />
            <span className="text-sm sm:text-base font-bold">{property.bathrooms}</span>
          </div>
          <div className="flex items-center gap-2 text-gray-700 bg-gray-50 rounded-xl p-3">
            <Square className="h-4 w-4 sm:h-5 sm:w-5 text-blue-500 flex-shrink-0" />
            <span className="text-sm sm:text-base font-bold">{property.area}m²</span>
          </div>
          <div className="flex items-center gap-2 text-gray-700 bg-gray-50 rounded-xl p-3">
            <Car className="h-4 w-4 sm:h-5 sm:w-5 text-blue-500 flex-shrink-0" />
            <span className="text-sm sm:text-base font-bold">{property.parking}</span>
          </div>
        </div>

        {/* Footer - Responsive */}
        <div className="mt-auto">
          <div className="flex gap-3">
            <Link to={`/investments/${property.id}`} className="flex-1">
              <Button 
                size="sm" 
                className="w-full h-11 sm:h-12 text-base font-bold bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-[1.02] rounded-2xl"
              >
                إستثمر الآن
              </Button>
            </Link>
            
            <Button 
              variant="outline" 
              size="sm" 
              className="h-11 sm:h-12 w-11 sm:w-12 p-0 flex-shrink-0 border-2 border-gray-200 hover:border-blue-300 hover:bg-blue-50 transition-all duration-300 rounded-2xl"
              aria-label="Add to favorites"
            >
              <Star className="h-5 w-5 text-gray-600 hover:text-blue-600 transition-colors" />
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default PropertyCard;
