import { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { 
  MapPin, 
  TrendingUp, 
  Users, 
  Calendar, 
  Star, 
  Eye,
  Heart,
  Phone,
  Mail,
  Clock,
  Target,
  DollarSign,
  ArrowLeft,
  ChevronLeft,
  ChevronRight,
  Download,
  FileText,
  CheckCircle,
  AlertCircle,
  BarChart3,
  PieChart,
  LineChart,
  Building2,
  Shield,
  Zap,
  Award,
  Gift
} from "lucide-react";
import Navigation from '@/components/Navigation';
import { useAuth } from '@/contexts/AuthContext';

const InvestmentDetail = () => {
  const { id } = useParams();
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isWatching, setIsWatching] = useState(false);
  const [activeTab, setActiveTab] = useState("overview");
  
  // Use actual authentication context
  const { isAuthenticated } = useAuth();

  // Sample investment data
  const investment = {
    id: "1",
    title: "مشروع فيلات السكني الفاخرة",
    location: "طرابلس، حي السكني",
    totalValue: 5000000,
    currentValue: 3200000,
    minInvestment: 50000,
    expectedReturn: 15.5,
    duration: 24,
    investors: 45,
    maxInvestors: 100,
    status: "active" as const,
    images: [
      "https://images.unsplash.com/photo-1613490493576-7fde63acd811?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1570129477492-45c003edd2be?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=800&h=600&fit=crop"
    ],
    rating: 4.8,
    views: 234,
    endDate: "2026-03-15",
    propertyType: "فيلا",
    riskLevel: "medium" as const,
    description: "مشروع استثماري فاخر يتضمن بناء مجموعة من الفيلات السكنية المميزة في أحد أفضل الأحياء السكنية في طرابلس. المشروع يتميز بتصميم عصري ومواد بناء عالية الجودة مع مرافق ترفيهية متكاملة.",
    features: [
      "تصميم عصري فاخر",
      "مواد بناء عالية الجودة",
      "مرافق ترفيهية متكاملة",
      "نظام أمان متطور",
      "حدائق خاصة",
      "مواقف سيارات مغطاة",
      "مصاعد فاخرة",
      "خدمات 24/7"
    ],
    timeline: [
      { phase: "المرحلة الأولى", status: "مكتمل", date: "2024-01", progress: 100 },
      { phase: "المرحلة الثانية", status: "قيد التنفيذ", date: "2024-06", progress: 65 },
      { phase: "المرحلة الثالثة", status: "مخطط", date: "2024-12", progress: 0 },
      { phase: "التسليم النهائي", status: "مخطط", date: "2026-03", progress: 0 }
    ],
    financials: {
      totalShares: 100,
      availableShares: 55,
      sharePrice: 50000,
      currentReturn: 8.2,
      projectedReturn: 15.5,
      monthlyReturn: 1.2,
      totalInvested: 2250000,
      expectedValue: 2875000
    },
    team: {
      developer: {
        name: "شركة السهم العقارية",
        experience: "15+ سنة",
        projects: 45,
        rating: 4.9,
        image: "https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=100&h=100&fit=crop"
      },
      manager: {
        name: "أحمد محمد",
        role: "مدير المشروع",
        experience: "8 سنوات",
        phone: "+218 91 234 5678",
        email: "ahmed@alsaham.ly",
        image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face"
      }
    },
    documents: [
      { name: "عقد الاستثمار", type: "pdf", size: "2.3 MB" },
      { name: "مخطط المشروع", type: "pdf", size: "1.8 MB" },
      { name: "التقرير المالي", type: "pdf", size: "3.1 MB" },
      { name: "شهادة الجودة", type: "pdf", size: "1.2 MB" }
    ],
    recentInvestors: [
      { name: "محمد علي", amount: 100000, date: "2024-01-15", avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=50&h=50&fit=crop&crop=face" },
      { name: "فاطمة أحمد", amount: 75000, date: "2024-01-14", avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=50&h=50&fit=crop&crop=face" },
      { name: "علي حسن", amount: 150000, date: "2024-01-13", avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=50&h=50&fit=crop&crop=face" }
    ]
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('ar-LY', {
      style: 'currency',
      currency: 'LYD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount);
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('ar-LY');
  };

  const nextImage = () => {
    setCurrentImageIndex((prev) => 
      prev === investment.images.length - 1 ? 0 : prev + 1
    );
  };

  const prevImage = () => {
    setCurrentImageIndex((prev) => 
      prev === 0 ? investment.images.length - 1 : prev - 1
    );
  };

  const handleWatch = () => {
    setIsWatching(!isWatching);
  };

  const progressPercentage = (investment.currentValue / investment.totalValue) * 100;
  const soldShares = investment.financials.totalShares - investment.financials.availableShares;
  const soldPercentage = (soldShares / investment.financials.totalShares) * 100;

  return (
    <div className="min-h-screen bg-gray-50 font-['Cairo',sans-serif]" dir="rtl">
      <Navigation />
      
      {/* Breadcrumb */}
      <div className="bg-white border-b border-gray-200 py-3">
        <div className="max-w-6xl mx-auto px-4">
          <div className="flex items-center space-x-2 space-x-reverse text-sm text-gray-600">
            <Link to="/" className="hover:text-blue-600">الرئيسية</Link>
            <span>/</span>
            <Link to="/investments" className="hover:text-blue-600">الاستثمارات</Link>
            <span>/</span>
            <span className="text-gray-900">{investment.title}</span>
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 py-6">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Image Gallery */}
            <Card className="overflow-hidden">
              <div className="relative">
                <img 
                  src={investment.images[currentImageIndex]} 
                  alt={investment.title}
                  className="w-full h-96 object-cover"
                />
                
                {/* Navigation Arrows */}
                <Button 
                  variant="ghost" 
                  size="sm" 
                  className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white/80 hover:bg-white"
                  onClick={prevImage}
                >
                  <ChevronLeft className="h-4 w-4" />
                </Button>
                <Button 
                  variant="ghost" 
                  size="sm" 
                  className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white/80 hover:bg-white"
                  onClick={nextImage}
                >
                  <ChevronRight className="h-4 w-4" />
                </Button>

                {/* Image Counter */}
                <div className="absolute bottom-4 left-4 bg-black/60 text-white px-2 py-1 rounded text-sm">
                  {currentImageIndex + 1} / {investment.images.length}
                </div>

                                 {/* Action Buttons */}
                 <div className="absolute top-4 right-4 flex space-x-2 space-x-reverse">
                   <Button 
                     size="sm" 
                     variant="ghost" 
                     className="bg-white/80 hover:bg-white"
                     onClick={handleWatch}
                   >
                     <Eye className={`h-4 w-4 ${isWatching ? 'text-blue-600' : ''}`} />
                   </Button>
                 </div>


              </div>

              {/* Thumbnail Gallery */}
              <div className="p-4">
                <div className="flex space-x-2 space-x-reverse overflow-x-auto">
                  {investment.images.map((image, index) => (
                    <img 
                      key={index}
                      src={image} 
                      alt={`صورة ${index + 1}`}
                      className={`w-20 h-16 object-cover rounded cursor-pointer border-2 ${
                        index === currentImageIndex ? 'border-blue-600' : 'border-gray-200'
                      }`}
                      onClick={() => setCurrentImageIndex(index)}
                    />
                  ))}
                </div>
              </div>
            </Card>

            {/* Investment Info Tabs */}
            <Card>
                             <Tabs value={activeTab} onValueChange={setActiveTab}>
                 <TabsList className="grid w-full grid-cols-1">
                   <TabsTrigger value="overview">نظرة عامة</TabsTrigger>
                 </TabsList>

                <TabsContent value="overview" className="p-6">
                  <div className="space-y-6">
                                         <div>
                       <h3 className="text-lg font-semibold mb-3">وصف المشروع</h3>
                       <p className="text-gray-600 leading-relaxed">{investment.description}</p>
                     </div>
                  </div>
                                 </TabsContent>
               </Tabs>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Investment Summary */}
            <Card>
              <CardContent className="p-6">
                <div className="text-center mb-4">
                  <div className="text-3xl font-bold text-blue-600 mb-1">
                    {formatCurrency(investment.financials.sharePrice)}
                  </div>
                  <div className="text-sm text-gray-600">سعر السهم الواحد</div>
                </div>

                                                   <div className="space-y-3">
                    <Button className="w-full bg-blue-600 hover:bg-blue-700">
                      <TrendingUp className="h-4 w-4 ml-2" />
                      {isAuthenticated ? 'استثمر الآن' : 'تسجيل الدخول للاستثمار'}
                    </Button>
                  </div>
              </CardContent>
            </Card>

            {/* Investment Stats */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">إحصائيات الاستثمار</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">إجمالي القيمة</span>
                  <span className="font-medium">{formatCurrency(investment.totalValue)}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">المستثمرون</span>
                  <div className="flex items-center space-x-1 space-x-reverse">
                    <Users className="h-4 w-4 text-gray-500" />
                    <span className="font-medium">{investment.investors}</span>
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">الحد الأدنى</span>
                  <span className="font-medium">{formatCurrency(investment.minInvestment)}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">المدة</span>
                  <div className="flex items-center space-x-1 space-x-reverse">
                    <Clock className="h-4 w-4 text-gray-500" />
                    <span className="font-medium">{investment.duration} شهر</span>
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">تاريخ الانتهاء</span>
                  <span className="font-medium">{formatDate(investment.endDate)}</span>
                </div>
              </CardContent>
            </Card>

            {/* Risk Analysis */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">تحليل المخاطر</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">مستوى المخاطرة</span>
                  <Badge className={
                    investment.riskLevel === 'low' ? 'bg-green-100 text-green-800' :
                    investment.riskLevel === 'medium' ? 'bg-yellow-100 text-yellow-800' :
                    'bg-red-100 text-red-800'
                  }>
                    {investment.riskLevel === 'low' ? 'منخفض' : 
                     investment.riskLevel === 'medium' ? 'متوسط' : 'عالي'}
                  </Badge>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">العائد المتوقع</span>
                  <span className="font-medium text-green-600">{investment.expectedReturn}%</span>
                </div>
                                 <div className="flex items-center justify-between">
                   <span className="text-sm text-gray-600">نوع العقار</span>
                   <span className="font-medium">{investment.propertyType}</span>
                 </div>
              </CardContent>
            </Card>

                         {/* Documents - Only show when logged in */}
             {isAuthenticated && (
               <Card>
                 <CardHeader>
                   <CardTitle className="text-lg">المستندات</CardTitle>
                 </CardHeader>
                 <CardContent className="space-y-3">
                   {investment.documents.map((doc, index) => (
                     <div key={index} className="flex items-center justify-between p-2 border rounded-lg">
                       <div className="flex items-center space-x-2 space-x-reverse">
                         <FileText className="h-4 w-4 text-blue-600" />
                         <div>
                           <div className="text-sm font-medium">{doc.name}</div>
                           <div className="text-xs text-gray-500">{doc.size}</div>
                         </div>
                       </div>
                       <Button size="sm" variant="outline">
                         <Download className="h-3 w-3" />
                       </Button>
                     </div>
                   ))}
                 </CardContent>
               </Card>
             )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default InvestmentDetail; 