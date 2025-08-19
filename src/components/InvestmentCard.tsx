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
    // New stock information properties
    sharesAvailable?: boolean;
    totalShares?: number;
    availableShares?: number;
    stockPrice?: number;
  };
  loading?: boolean;
}

const InvestmentCard = ({ investment, loading = false }: InvestmentCardProps) => {
  const formatCurrency = (amount: number) => {
    return `${amount.toLocaleString('en-US')} د.ل`;
  };

  const formatStockPrice = (price: number) => {
    return `${price.toLocaleString('en-US')} د.ل`;
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
  const fundingProgress = (investment.currentValue / investment.totalValue) * 100;
  const remainingInvestment = investment.totalValue - investment.currentValue;

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
    <Card className="group hover:shadow-xl transition-all duration-500 border border-gray-200 overflow-hidden h-full flex flex-col bg-white hover:bg-gray-50/50">
      {/* Image Section */}
      <div className="relative">
        <img 
          src={investment.image} 
          alt={investment.title}
          className="w-full h-40 sm:h-48 lg:h-52 object-cover group-hover:scale-105 transition-transform duration-500"
        />
        
        {/* Status Badge */}
        <Badge className={`absolute top-3 right-3 text-xs px-3 py-1.5 border-2 font-semibold shadow-lg rounded-xl ${getStatusColor(investment.status)}`}>
          {getStatusText(investment.status)}
        </Badge>
        
        {/* Expected Return Badge */}
        <Badge className="absolute top-3 left-3 bg-gradient-to-r from-blue-600 to-blue-700 text-white text-xs px-3 py-1.5 border-0 font-semibold shadow-lg rounded-xl">
          <TrendingUp className="h-3 w-3 mr-1" />
          {investment.expectedReturn}%
        </Badge>
        
        {/* Views */}
        <div className="absolute bottom-3 right-3 bg-white/95 backdrop-blur-sm rounded-xl px-2.5 py-1.5 flex items-center gap-1.5 shadow-lg">
          <Eye className="h-3.5 w-3.5 text-gray-600" />
          <span className="text-xs font-semibold text-gray-700">{investment.views}</span>
        </div>
      </div>

      {/* Content Section */}
      <CardContent className="p-5 sm:p-6 lg:p-7 flex-1 flex flex-col">
        {/* Header */}
        <div className="mb-4 sm:mb-5">
          <div className="flex items-start justify-between gap-3 mb-3">
            <h3 className="font-bold text-base sm:text-lg lg:text-xl text-gray-900 leading-tight line-clamp-2 flex-1 group-hover:text-blue-700 transition-colors duration-300">
              {investment.title}
            </h3>
            <Badge variant="outline" className="text-xs px-3 py-1.5 flex-shrink-0 border-2 border-blue-200 text-blue-700 bg-blue-50 font-semibold rounded-xl">
              {investment.propertyType}
            </Badge>
          </div>
          
          <div className="flex items-center gap-2 text-gray-600 mb-3">
            <MapPin className="h-4 w-4 sm:h-5 sm:w-5 text-blue-500 flex-shrink-0" />
            <span className="text-sm sm:text-base line-clamp-1 font-medium">{investment.location}</span>
          </div>
        </div>

        {/* Stock Information - New Section */}
        {investment.sharesAvailable && investment.totalShares && investment.availableShares && investment.stockPrice && (
          <div className="mb-4 sm:mb-5 p-4 bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl border-2 border-blue-200 shadow-sm">
            <div className="flex items-center gap-2 mb-3">
              <PieChart className="h-5 w-5 text-blue-600" />
              <span className="text-sm font-bold text-blue-800">معلومات الأسهم</span>
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              {/* Available Shares */}
              <div className="text-center">
                <div className="text-xl sm:text-2xl font-bold text-blue-600">
                  {investment.availableShares.toLocaleString('en-US')}
                </div>
                <div className="text-sm text-blue-700 font-semibold">الأسهم المتاحة</div>
                <div className="text-xs text-blue-600">
                  من {investment.totalShares.toLocaleString('en-US')}
                </div>
              </div>
              
              {/* Stock Price */}
              <div className="text-center">
                <div className="text-xl sm:text-2xl font-bold text-green-600">
                  {investment.stockPrice.toLocaleString('en-US')} د.ل
                </div>
                <div className="text-sm text-green-700 font-semibold">سعر السهم</div>
                <div className="text-xs text-green-600">
                  الحد الأدنى
                </div>
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
            <span>تم جمع: {formatCurrency(investment.currentValue)}</span>
            <span>المطلوب: {formatCurrency(investment.totalValue)}</span>
          </div>
        </div>

        {/* Investment Details Grid */}
        <div className="grid grid-cols-2 gap-4 sm:gap-5 mb-5 sm:mb-6">
          <div className="flex items-center gap-3 text-gray-700 bg-gray-50 rounded-xl p-3">
            <Clock className="h-5 w-5 text-blue-500" />
            <div>
              <div className="text-xs text-gray-500 font-medium">المدة</div>
              <div className="text-sm font-bold">{investment.duration} شهر</div>
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
              <div className="text-sm font-bold">{investment.investors}/{investment.maxInvestors}</div>
            </div>
          </div>
          
          <div className="flex items-center gap-3 text-gray-700 bg-gray-50 rounded-xl p-3">
            <Calendar className="h-5 w-5 text-orange-500" />
            <div>
              <div className="text-xs text-gray-500 font-medium">ينتهي</div>
              <div className="text-sm font-bold">{investment.endDate}</div>
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
