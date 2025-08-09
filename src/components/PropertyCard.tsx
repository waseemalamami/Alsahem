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
  Eye
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
  };
}

const PropertyCard = ({ property }: PropertyCardProps) => {
  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('ar-LY', {
      style: 'currency',
      currency: 'LYD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(price);
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
    <Card className="group hover:shadow-lg transition-all duration-300 border border-gray-200 overflow-hidden">
      {/* Image Section - More Compact */}
      <div className="relative">
        <img 
          src={property.image} 
          alt={property.title}
          className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
        />
        
        {/* Status Badge - Smaller */}
        <Badge className={`absolute top-2 right-2 text-xs px-2 py-0.5 border ${getStatusColor(property.status)}`}>
          {getStatusText(property.status)}
        </Badge>
        
        {/* Investment Return Badge - Smaller */}
        {property.investmentReturn && (
          <Badge className="absolute top-2 left-2 bg-blue-600 text-white text-xs px-2 py-0.5">
            <TrendingUp className="h-3 w-3 mr-1" />
            {property.investmentReturn}%
          </Badge>
        )}
        
        {/* Rating - Smaller */}
        <div className="absolute bottom-2 left-2 bg-white/90 backdrop-blur-sm rounded-lg px-2 py-1 flex items-center gap-1">
          <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
          <span className="text-xs font-semibold text-gray-800">{property.rating}</span>
        </div>
        
        {/* Views - Smaller */}
        <div className="absolute bottom-2 right-2 bg-white/90 backdrop-blur-sm rounded-lg px-2 py-1 flex items-center gap-1">
          <Eye className="h-3 w-3 text-gray-600" />
          <span className="text-xs font-semibold text-gray-800">{property.views}</span>
        </div>
      </div>

      {/* Content Section - More Compact */}
      <CardContent className="p-4">
        {/* Title and Type - More Compact */}
        <div className="mb-3">
          <h3 className="font-bold text-gray-900 text-sm mb-1 line-clamp-1 group-hover:text-blue-600 transition-colors">
            {property.title}
          </h3>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-1 text-xs text-gray-600">
              <Building2 className="h-3 w-3" />
              <span>{property.type}</span>
            </div>
            <div className="flex items-center gap-1 text-xs text-gray-500">
              <Calendar className="h-3 w-3" />
              <span>{property.listedDate}</span>
            </div>
          </div>
        </div>

        {/* Location - More Compact */}
        <div className="flex items-center gap-1 text-xs text-gray-600 mb-3">
          <MapPin className="h-3 w-3 text-blue-600" />
          <span className="line-clamp-1">{property.location}</span>
        </div>

        {/* Property Details - More Compact */}
        <div className="grid grid-cols-4 gap-2 mb-3">
          <div className="flex items-center gap-1 text-xs text-gray-600">
            <Bed className="h-3 w-3" />
            <span>{property.bedrooms}</span>
          </div>
          <div className="flex items-center gap-1 text-xs text-gray-600">
            <Bath className="h-3 w-3" />
            <span>{property.bathrooms}</span>
          </div>
          <div className="flex items-center gap-1 text-xs text-gray-600">
            <Square className="h-3 w-3" />
            <span>{property.area}m²</span>
          </div>
          <div className="flex items-center gap-1 text-xs text-gray-600">
            <Car className="h-3 w-3" />
            <span>{property.parking}</span>
          </div>
        </div>

        {/* Price Section - More Compact */}
        <div className="mb-3">
          <div className="flex items-center justify-between">
            <div className="text-right">
              <div className="text-lg font-bold text-blue-600">
                {formatPrice(property.price)}
              </div>
              {property.originalPrice && property.originalPrice > property.price && (
                <div className="text-xs text-gray-500 line-through">
                  {formatPrice(property.originalPrice)}
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Investment Options - More Compact */}
        <div className="flex flex-wrap gap-1 mb-3">
          {property.installmentAvailable && (
            <Badge variant="outline" className="text-xs px-2 py-0.5 border-green-300 text-green-700">
              تقسيط متاح
            </Badge>
          )}
          {property.sharesAvailable && (
            <Badge variant="outline" className="text-xs px-2 py-0.5 border-blue-300 text-blue-700">
              أسهم متاحة
            </Badge>
          )}
        </div>

        {/* Action Buttons - More Compact */}
        <div className="flex gap-2">
          <Link to={`/properties/${property.id}`} className="flex-1">
            <Button size="sm" className="w-full h-8 text-xs bg-blue-600 hover:bg-blue-700">
              عرض التفاصيل
            </Button>
          </Link>
          <Button size="sm" variant="outline" className="h-8 px-3 text-xs">
            المفضلة
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default PropertyCard;
