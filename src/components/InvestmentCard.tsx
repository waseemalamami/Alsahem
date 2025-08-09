import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { 
  TrendingUp, 
  Users, 
  Calendar, 
  Target, 
  Building2,
  MapPin,
  Eye,
  Clock,
  DollarSign
} from "lucide-react";
import { Link } from 'react-router-dom';

interface InvestmentCardProps {
  investment: {
    id: string;
    title: string;
    location: string;
    totalValue: number;
    currentValue: number;
    minInvestment: number;
    expectedReturn: number;
    duration: number;
    investors: number;
    maxInvestors: number;
    status: 'active' | 'funded' | 'completed';
    image: string;
    views: number;
    endDate: string;
    propertyType: string;
    riskLevel: 'low' | 'medium' | 'high';
  };
  loading?: boolean;
}

const InvestmentCard = ({ investment, loading = false }: InvestmentCardProps) => {
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('ar-LY', {
      style: 'currency',
      currency: 'LYD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active':
        return 'bg-green-100 text-green-800 border-green-200';
      case 'funded':
        return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'completed':
        return 'bg-purple-100 text-purple-800 border-purple-200';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'active':
        return 'نشط';
      case 'funded':
        return 'ممول';
      case 'completed':
        return 'مكتمل';
      default:
        return 'غير محدد';
    }
  };





  if (loading) {
    return (
      <Card className="group hover:shadow-lg transition-all duration-300 border border-gray-200 overflow-hidden">
        <div className="relative">
          <Skeleton className="w-full h-40" />
        </div>
        <CardContent className="p-4">
          <Skeleton className="h-4 w-3/4 mb-2" />
          <Skeleton className="h-3 w-1/2 mb-3" />
          <Skeleton className="h-2 w-full mb-2" />
          <Skeleton className="h-2 w-2/3 mb-3" />
          <div className="grid grid-cols-2 gap-3 mb-3">
            <Skeleton className="h-12" />
            <Skeleton className="h-12" />
          </div>
          <Skeleton className="h-8 w-full" />
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="group hover:shadow-lg transition-all duration-300 border border-gray-200 overflow-hidden">
      {/* Image Section - More Compact */}
      <div className="relative">
        <img 
          src={investment.image} 
          alt={investment.title}
          className="w-full h-40 object-cover group-hover:scale-105 transition-transform duration-300"
        />
        
        {/* Status Badge - Smaller */}
        <Badge className={`absolute top-2 right-2 text-xs px-2 py-0.5 border ${getStatusColor(investment.status)}`}>
          {getStatusText(investment.status)}
        </Badge>
        

        

        
        {/* Views - Smaller */}
        <div className="absolute bottom-2 right-2 bg-white/90 backdrop-blur-sm rounded-lg px-2 py-1 flex items-center gap-1">
          <Eye className="h-3 w-3 text-gray-600" />
          <span className="text-xs font-semibold text-gray-800">{investment.views}</span>
        </div>
      </div>

      {/* Content Section - More Compact */}
      <CardContent className="p-4">
        {/* Title and Type - More Compact */}
        <div className="mb-3">
          <h3 className="font-bold text-gray-900 text-sm mb-1 line-clamp-1 group-hover:text-blue-600 transition-colors">
            {investment.title}
          </h3>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-1 text-xs text-gray-600">
              <Building2 className="h-3 w-3" />
              <span>{investment.propertyType}</span>
            </div>
            <div className="flex items-center gap-1 text-xs text-gray-500">
              <Calendar className="h-3 w-3" />
              <span>ينتهي {investment.endDate}</span>
            </div>
          </div>
        </div>

        {/* Location - More Compact */}
        <div className="flex items-center gap-1 text-xs text-gray-600 mb-3">
          <MapPin className="h-3 w-3 text-blue-600" />
          <span className="line-clamp-1">{investment.location}</span>
        </div>



        {/* Key Metrics - More Compact */}
        <div className="grid grid-cols-2 gap-3 mb-3">
          <div className="bg-blue-50 rounded-lg p-2">
            <div className="flex items-center gap-1 text-xs text-gray-600 mb-1">
              <TrendingUp className="h-3 w-3 text-green-600" />
              <span>العائد المتوقع</span>
            </div>
            <div className="text-sm font-bold text-green-600">{investment.expectedReturn}%</div>
          </div>
          
          <div className="bg-purple-50 rounded-lg p-2">
            <div className="flex items-center gap-1 text-xs text-gray-600 mb-1">
              <Clock className="h-3 w-3 text-purple-600" />
              <span>المدة</span>
            </div>
            <div className="text-sm font-bold text-purple-600">{investment.duration} شهر</div>
          </div>
        </div>

        {/* Investors Info - More Compact */}
        <div className="flex items-center justify-between text-xs text-gray-600 mb-3">
          <div className="flex items-center gap-1">
            <Users className="h-3 w-3" />
            <span>{investment.investors} / {investment.maxInvestors} مستثمر</span>
          </div>
          <div className="flex items-center gap-1">
            <DollarSign className="h-3 w-3" />
            <span>الحد الأدنى: {formatCurrency(investment.minInvestment)}</span>
          </div>
        </div>

        {/* Action Buttons - More Compact */}
        <div className="flex gap-2">
          <Link to={`/investments/${investment.id}`} className="flex-1">
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

export default InvestmentCard;
