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
  Coins,
  PieChart,
  Star
} from "lucide-react";
import { Link } from 'react-router-dom';
import { Progress } from "@/components/ui/progress";

interface InvestmentCardProps {
  investment: {
    id: number;
    title: string;
    location?: string;
    totalValue?: number;
    currentValue?: number;
    minInvestment: number;
    expectedReturn?: number;
    duration?: number;
    durationByMonths?: number;
    investors?: number;
    maxInvestors?: number;
    status: 'active' | 'funded' | 'completed';
    image?: string;
    views: number;
    endDate: string;
    propertyType?: string;
    riskLevel?: 'low' | 'medium' | 'high';
    // Stock information properties
    sharesAvailable?: boolean;
    totalShares?: number;
    availableShares?: number;
    stockPrice?: number;
    sharePrice?: number;
    description?: string;
  };
  loading?: boolean;
}

const InvestmentCard = ({ investment, loading = false }: InvestmentCardProps) => {
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
    }).format(amount);
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('ar-LY', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });
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

  // Calculate funding progress
  const totalValue = investment.totalValue || (investment.totalShares || 0) * (investment.sharePrice || 0);
  const currentValue = investment.currentValue || ((investment.totalShares || 0) - (investment.availableShares || 0)) * (investment.sharePrice || 0);
  const fundingProgress = totalValue > 0 ? (currentValue / totalValue) * 100 : 0;
  const duration = investment.duration || investment.durationByMonths || 0;

  // Map investment IDs to local images
  const getInvestmentImage = (id: number) => {
    const imageMap: { [key: number]: string } = {
      1: '/images/investments/tripoli-apartment.jpg',
      2: '/images/investments/benghazi-villa.jpg',
      4: '/images/investments/misrata-commercial.jpg',
      5: '/images/investments/albayda-residential.jpg',
      6: '/images/investments/tobruk-industrial.jpg',
      7: '/images/investments/sabratha-resort.jpg',
      8: '/images/investments/zawiya-mall.jpg'
    };
    return imageMap[id] || '/images/investments/tripoli-apartment.jpg'; // fallback
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
          <Skeleton className="h-10 w-full" />
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="group hover:shadow-lg transition-all duration-300 border border-gray-200 overflow-hidden">
      <div className="relative">
        <img 
          src={getInvestmentImage(investment.id)} 
          alt={investment.title}
          className="w-full h-40 object-cover group-hover:scale-105 transition-transform duration-300"
        />
        
        {/* Status Badge */}
        <div className="absolute top-3 right-3">
          <Badge className={`${getStatusColor(investment.status)} border-2 font-semibold`}>
            {getStatusText(investment.status)}
          </Badge>
        </div>

        {/* Views Counter */}
        <div className="absolute top-3 left-3 bg-black/50 text-white px-2 py-1 rounded-full text-xs flex items-center gap-1">
          <Eye className="h-3 w-3" />
          {investment.views || 0}
        </div>
      </div>

      <CardContent className="p-4">
        {/* Title and Location */}
        <div className="mb-3">
          <h3 className="font-bold text-lg text-gray-900 mb-2 line-clamp-2 group-hover:text-blue-600 transition-colors">
            {investment.title}
          </h3>
          <div className="flex items-center gap-2 text-gray-600 text-sm">
            <MapPin className="h-4 w-4" />
            <span>{investment.location || 'طرابلس، ليبيا'}</span>
          </div>
        </div>

        {/* Expected Return */}
        <div className="mb-4 bg-gradient-to-r from-green-50 to-green-100 rounded-xl p-3 border border-green-200">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <TrendingUp className="h-5 w-5 text-green-600" />
              <span className="text-sm font-semibold text-green-800">العائد المتوقع</span>
            </div>
            <div className="text-2xl font-bold text-green-600">
              {investment.expectedReturn || 12}%
            </div>
          </div>
        </div>

        {/* Stock Information */}
        {investment.totalShares && investment.availableShares && (
          <div className="grid grid-cols-2 gap-3 mb-4">
            {/* Available Shares */}
            <div className="text-center bg-blue-50 rounded-xl p-3 border border-blue-200">
              <div className="text-xl sm:text-2xl font-bold text-blue-600">
                {investment.availableShares.toLocaleString('en-US')}
              </div>
              <div className="text-sm text-blue-700 font-semibold">الأسهم المتاحة</div>
              <div className="text-xs text-blue-600">
                من {investment.totalShares.toLocaleString('en-US')}
              </div>
            </div>
            
            {/* Stock Price */}
            <div className="text-center bg-green-50 rounded-xl p-3 border border-green-200">
              <div className="text-xl sm:text-2xl font-bold text-green-600">
                {formatCurrency(investment.sharePrice || investment.stockPrice || 0)}
              </div>
              <div className="text-sm text-green-700 font-semibold">سعر السهم</div>
              <div className="text-xs text-green-600">
                الحد الأدنى
              </div>
            </div>
          </div>
        )}

        {/* Investment Progress */}
        <div className="mb-4 sm:mb-5">
          <div className="flex justify-between items-center mb-3">
            <span className="text-sm font-bold text-gray-700">تقدم التمويل</span>
            <span className="text-sm font-bold text-blue-600">{fundingProgress.toFixed(1)}%</span>
          </div>
          <Progress value={fundingProgress} className="h-3 mb-3 bg-gray-200" />
          <div className="flex justify-between text-xs text-gray-600 font-medium">
            <span>تم جمع: {formatCurrency(currentValue)}</span>
            <span>المطلوب: {formatCurrency(totalValue)}</span>
          </div>
        </div>

        {/* Investment Details Grid */}
        <div className="grid grid-cols-2 gap-4 sm:gap-5 mb-5 sm:mb-6">
          <div className="flex items-center gap-3 text-gray-700 bg-gray-50 rounded-xl p-3">
            <Clock className="h-5 w-5 text-blue-500" />
            <div>
              <div className="text-xs text-gray-500 font-medium">المدة</div>
              <div className="text-sm font-bold">{duration} شهر</div>
            </div>
          </div>
          
          <div className="flex items-center gap-3 text-gray-700 bg-gray-50 rounded-xl p-3">
            <Coins className="h-5 w-5 text-green-500" />
            <div>
              <div className="text-xs text-gray-500 font-medium">الحد الأدنى</div>
              <div className="text-sm font-bold">{formatCurrency(investment.minInvestment)}</div>
            </div>
          </div>
          
          <div className="flex items-center gap-3 text-gray-700 bg-gray-50 rounded-xl p-3">
            <Users className="h-5 w-5 text-purple-500" />
            <div>
              <div className="text-xs text-gray-500 font-medium">المستثمرون</div>
              <div className="text-sm font-bold">{investment.investors || 0}/{investment.maxInvestors || 100}</div>
            </div>
          </div>
          
          <div className="flex items-center gap-3 text-gray-700 bg-gray-50 rounded-xl p-3">
            <Calendar className="h-5 w-5 text-orange-500" />
            <div>
              <div className="text-xs text-gray-500 font-medium">ينتهي</div>
              <div className="text-sm font-bold">{formatDate(investment.endDate)}</div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="mt-auto">
          <div className="flex gap-3">
            <Link to={`/investments/${investment.id}`} className="flex-1">
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

export default InvestmentCard;
