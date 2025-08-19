import { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
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
  Heart,
  Share2,
  Download,
  Star,
  ChevronLeft,
  ChevronRight,
  Shield,
  BarChart3,
  FileText,
  TrendingDown
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
    launchDate: "2024-01-01", // Added launchDate
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
    return `${amount.toLocaleString('en-US')} د.ل`;
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
                   <div className="space-y-8">
                     {/* Project Description with Enhanced Styling */}
                     <div className="bg-gradient-to-r from-blue-50 to-indigo-50 p-6 rounded-2xl border border-blue-100">
                       <h3 className="text-xl font-bold text-blue-800 mb-4 flex items-center gap-2">
                         <Building2 className="h-6 w-6 text-blue-600" />
                         وصف المشروع
                       </h3>
                       <p className="text-gray-700 leading-relaxed text-lg">{investment.description}</p>
                     </div>

                     {/* Project Features with Better Visual Hierarchy */}
                     <div>
                       <h3 className="text-xl font-bold text-gray-800 mb-6 flex items-center gap-2">
                         <Target className="h-6 w-6 text-green-600" />
                         مميزات المشروع
                       </h3>
                       <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                         <div className="flex items-center gap-4 p-4 bg-white rounded-2xl border-2 border-blue-100 shadow-sm hover:shadow-md transition-all duration-300 hover:border-blue-200">
                           <div className="p-3 bg-blue-100 rounded-xl">
                             <Building2 className="h-6 w-6 text-blue-600" />
                           </div>
                           <div>
                             <span className="text-gray-800 font-semibold text-lg">تصميم عصري ومتطور</span>
                             <p className="text-gray-600 text-sm mt-1">أحدث التقنيات في التصميم المعماري</p>
                           </div>
                         </div>
                         <div className="flex items-center gap-4 p-4 bg-white rounded-2xl border-2 border-green-100 shadow-sm hover:shadow-md transition-all duration-300 hover:border-green-200">
                           <div className="p-3 bg-green-100 rounded-xl">
                             <Target className="h-6 w-6 text-green-600" />
                           </div>
                           <div>
                             <span className="text-gray-800 font-semibold text-lg">مواد بناء عالية الجودة</span>
                             <p className="text-gray-600 text-sm mt-1">أفضل المواد المستوردة والمحلية</p>
                           </div>
                         </div>
                         <div className="flex items-center gap-4 p-4 bg-white rounded-2xl border-2 border-purple-100 shadow-sm hover:shadow-md transition-all duration-300 hover:border-purple-200">
                           <div className="p-3 bg-purple-100 rounded-xl">
                             <Users className="h-6 w-6 text-purple-600" />
                           </div>
                           <div>
                             <span className="text-gray-800 font-semibold text-lg">مرافق ترفيهية متكاملة</span>
                             <p className="text-gray-600 text-sm mt-1">حدائق، مسبح، صالة رياضية</p>
                           </div>
                         </div>
                         <div className="flex items-center gap-4 p-4 bg-white rounded-2xl border-2 border-orange-100 shadow-sm hover:shadow-md transition-all duration-300 hover:border-orange-200">
                           <div className="p-3 bg-orange-100 rounded-xl">
                             <MapPin className="h-6 w-6 text-orange-600" />
                           </div>
                           <div>
                             <span className="text-gray-800 font-semibold text-lg">موقع استراتيجي مميز</span>
                             <p className="text-gray-600 text-sm mt-1">قرب من الخدمات والمواصلات</p>
                           </div>
                         </div>
                       </div>
                     </div>

                     {/* Enhanced Project Timeline */}
                     <div>
                       <h3 className="text-xl font-bold text-gray-800 mb-6 flex items-center gap-2">
                         <Clock className="h-6 w-6 text-purple-600" />
                         جدول المشروع
                       </h3>
                       <div className="space-y-4">
                         <div className="flex items-center gap-6 p-6 bg-gradient-to-r from-blue-50 to-blue-100 rounded-2xl border-2 border-blue-200 shadow-sm">
                           <div className="w-4 h-4 bg-blue-500 rounded-full shadow-lg"></div>
                           <div className="flex-1">
                             <div className="font-bold text-blue-800 text-lg">مرحلة التخطيط</div>
                             <div className="text-blue-600 text-base">يناير 2024 - مارس 2024</div>
                             <div className="text-blue-500 text-sm mt-1">✓ تم إكمال التصاميم والتراخيص</div>
                           </div>
                           <div className="text-right">
                             <div className="w-16 h-16 bg-blue-500 rounded-full flex items-center justify-center text-white font-bold text-lg">100%</div>
                           </div>
                         </div>
                         <div className="flex items-center gap-6 p-6 bg-gradient-to-r from-green-50 to-green-100 rounded-2xl border-2 border-green-200 shadow-sm">
                           <div className="w-4 h-4 bg-green-500 rounded-full shadow-lg"></div>
                           <div className="flex-1">
                             <div className="font-bold text-green-800 text-lg">مرحلة البناء</div>
                             <div className="text-green-600 text-base">أبريل 2024 - ديسمبر 2025</div>
                             <div className="text-green-500 text-sm mt-1">🔄 قيد التنفيذ - 65% مكتمل</div>
                           </div>
                           <div className="text-right">
                             <div className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center text-white font-bold text-lg">65%</div>
                           </div>
                         </div>
                         <div className="flex items-center gap-6 p-6 bg-gradient-to-r from-purple-50 to-purple-100 rounded-2xl border-2 border-purple-200 shadow-sm">
                           <div className="w-4 h-4 bg-purple-500 rounded-full shadow-lg"></div>
                           <div className="flex-1">
                             <div className="font-bold text-purple-800 text-lg">مرحلة التسليم</div>
                             <div className="text-purple-600 text-base">يناير 2026 - مارس 2026</div>
                             <div className="text-purple-500 text-sm mt-1">⏳ مخطط - تسليم المفاتيح</div>
                           </div>
                           <div className="text-right">
                             <div className="w-16 h-16 bg-purple-500 rounded-full flex items-center justify-center text-white font-bold text-lg">0%</div>
                           </div>
                         </div>
                       </div>
                     </div>

                     {/* Enhanced Investment Benefits */}
                     <div>
                       <h3 className="text-xl font-bold text-gray-800 mb-6 flex items-center gap-2">
                         <TrendingUp className="h-6 w-6 text-green-600" />
                         مزايا الاستثمار
                       </h3>
                       <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                         <div className="p-6 bg-gradient-to-br from-green-50 to-green-100 rounded-2xl border-2 border-green-200 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-[1.02]">
                           <div className="flex items-center gap-3 mb-4">
                             <div className="p-3 bg-green-200 rounded-xl">
                               <TrendingUp className="h-7 w-7 text-green-700" />
                             </div>
                             <span className="font-bold text-green-800 text-xl">عوائد عالية</span>
                           </div>
                           <p className="text-green-700 text-base leading-relaxed">احصل على عوائد استثمارية مميزة تصل إلى <span className="font-bold text-2xl">{investment.expectedReturn}%</span> مع ضمانات قانونية كاملة</p>
                         </div>
                         <div className="p-6 bg-gradient-to-br from-blue-50 to-blue-100 rounded-2xl border-2 border-blue-200 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-[1.02]">
                           <div className="flex items-center gap-3 mb-4">
                             <div className="p-3 bg-blue-200 rounded-xl">
                               <Shield className="h-7 w-7 text-blue-700" />
                             </div>
                             <span className="font-bold text-blue-800 text-xl">استثمار آمن</span>
                           </div>
                           <p className="text-blue-700 text-base leading-relaxed">استثمار في عقارات حقيقية مع ضمانات قانونية كاملة ووثائق رسمية موثقة</p>
                         </div>
                         <div className="p-6 bg-gradient-to-br from-purple-50 to-purple-100 rounded-2xl border-2 border-purple-200 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-[1.02]">
                           <div className="flex items-center gap-3 mb-4">
                             <div className="p-3 bg-purple-200 rounded-xl">
                               <Clock className="h-7 w-7 text-purple-700" />
                             </div>
                             <span className="font-bold text-purple-800 text-xl">مرونة في الاستثمار</span>
                           </div>
                           <p className="text-purple-700 text-base leading-relaxed">ابدأ بمبلغ صغير وزد استثمارك تدريجياً حسب إمكانياتك المالية</p>
                         </div>
                         <div className="p-6 bg-gradient-to-br from-orange-50 to-orange-100 rounded-2xl border-2 border-orange-200 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-[1.02]">
                           <div className="flex items-center gap-3 mb-4">
                             <div className="p-3 bg-orange-200 rounded-xl">
                               <BarChart3 className="h-7 w-7 text-orange-700" />
                             </div>
                             <span className="font-bold text-orange-800 text-xl">شفافية كاملة</span>
                           </div>
                           <p className="text-orange-700 text-base leading-relaxed">متابعة مستمرة لتقدم المشروع وتفاصيل الاستثمار مع تقارير دورية</p>
                         </div>
                       </div>
                     </div>

                     {/* New Section: Project Specifications */}
                     <div>
                       <h3 className="text-xl font-bold text-gray-800 mb-6 flex items-center gap-2">
                         <Building2 className="h-6 w-6 text-indigo-600" />
                         مواصفات المشروع
                       </h3>
                       <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                         <div className="p-4 bg-white rounded-2xl border-2 border-gray-100 shadow-sm">
                           <div className="text-center">
                             <div className="text-2xl font-bold text-indigo-600 mb-2">24</div>
                             <div className="text-gray-700 font-semibold">شهر مدة المشروع</div>
                           </div>
                         </div>
                         <div className="p-4 bg-white rounded-2xl border-2 border-gray-100 shadow-sm">
                           <div className="text-center">
                             <div className="text-2xl font-bold text-green-600 mb-2">100</div>
                             <div className="text-gray-700 font-semibold">سهم إجمالي</div>
                           </div>
                         </div>
                         <div className="p-4 bg-white rounded-2xl border-2 border-gray-100 shadow-sm">
                           <div className="text-center">
                             <div className="text-2xl font-bold text-blue-600 mb-2">45</div>
                             <div className="text-gray-700 font-semibold">مستثمر حالياً</div>
                           </div>
                         </div>
                       </div>
                     </div>
                   </div>
                 </TabsContent>
               </Tabs>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Investment Summary */}
            <Card className="border-2 border-blue-100 shadow-lg hover:shadow-xl transition-all duration-300">
              <CardContent className="p-6">
                <div className="text-center mb-6">
                  <div className="text-4xl font-bold text-blue-600 mb-2">
                    {formatCurrency(investment.financials.sharePrice)}
                  </div>
                  <div className="text-sm text-gray-600 bg-blue-50 px-3 py-1 rounded-full inline-block">سعر السهم الواحد</div>
                </div>

                {/* Enhanced Stock Information Section */}
                <div className="mb-6 p-5 bg-gradient-to-br from-blue-50 to-blue-100 rounded-2xl border-2 border-blue-200 shadow-sm">
                  <div className="grid grid-cols-2 gap-4 mb-4">
                    {/* Available Shares */}
                    <div className="text-center p-3 bg-white rounded-xl border border-blue-200">
                      <div className="text-2xl font-bold text-blue-600 mb-1">
                        {investment.financials.availableShares?.toLocaleString('en-US') || 'N/A'}
                      </div>
                      <div className="text-sm text-blue-700 font-semibold">الأسهم المتاحة</div>
                      <div className="text-xs text-blue-600">
                        من {investment.financials.totalShares?.toLocaleString('en-US') || 'N/A'}
                      </div>
                    </div>
                    
                    {/* Total Shares */}
                    <div className="text-center p-3 bg-white rounded-xl border border-green-200">
                      <div className="text-2xl font-bold text-green-600 mb-1">
                        {investment.financials.totalShares?.toLocaleString('en-US') || 'N/A'}
                      </div>
                      <div className="text-sm text-green-700 font-semibold">إجمالي الأسهم</div>
                      <div className="text-xs text-green-600">
                        في المشروع
                      </div>
                    </div>
                  </div>
                  
                  {/* Enhanced Funding Progress */}
                  {investment.financials.totalShares && investment.financials.availableShares && (
                    <div className="pt-4 border-t border-blue-200">
                      <div className="flex justify-between items-center mb-3">
                        <span className="text-sm text-blue-700 font-semibold">تقدم التمويل</span>
                        <span className="text-lg font-bold text-blue-600 bg-white px-3 py-1 rounded-full">
                          {((investment.financials.totalShares - investment.financials.availableShares) / investment.financials.totalShares * 100).toFixed(1)}%
                        </span>
                      </div>
                      <div className="w-full bg-blue-200 rounded-full h-3 shadow-inner">
                        <div 
                          className="bg-gradient-to-r from-blue-500 to-blue-600 h-3 rounded-full transition-all duration-500 shadow-sm"
                          style={{ 
                            width: `${((investment.financials.totalShares - investment.financials.availableShares) / investment.financials.totalShares * 100)}%` 
                          }}
                        ></div>
                      </div>
                      <div className="text-center mt-2">
                        <span className="text-xs text-blue-600">
                          تم جمع {formatCurrency(investment.financials.totalShares * investment.financials.sharePrice - investment.financials.availableShares * investment.financials.sharePrice)}
                        </span>
                      </div>
                    </div>
                  )}
                </div>

                <div className="space-y-4">
                  {isAuthenticated ? (
                    <Button className="w-full bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-[1.02] rounded-2xl h-14 font-bold text-lg">
                      <TrendingUp className="h-5 w-5 ml-2" />
                      استثمر الآن
                    </Button>
                  ) : (
                    <div className="space-y-4">
                      <Button 
                        className="w-full bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-[1.02] rounded-2xl h-14 font-bold text-lg"
                        onClick={() => window.location.href = '/login'}
                      >
                        <TrendingUp className="h-5 w-5 ml-2" />
                        تسجيل الدخول للاستثمار
                      </Button>
                      
                      {/* Show registration link when not authenticated */}
                      <div className="text-center p-4 bg-gray-50 rounded-2xl">
                        <p className="text-sm text-gray-600 mb-3">ليس لديك حساب؟</p>
                        <Link to="/register">
                          <Button variant="outline" className="w-full border-2 border-blue-300 text-blue-600 hover:bg-blue-50 rounded-2xl font-semibold">
                            إنشاء حساب جديد
                          </Button>
                        </Link>
                      </div>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>

            {/* Enhanced Investment Stats */}
            <Card className="border-2 border-gray-100 shadow-lg hover:shadow-xl transition-all duration-300">
              <CardHeader className="bg-gradient-to-r from-gray-50 to-gray-100 rounded-t-2xl">
                <CardTitle className="text-lg text-gray-800 flex items-center gap-2">
                  <BarChart3 className="h-5 w-5 text-blue-600" />
                  إحصائيات الاستثمار
                </CardTitle>
              </CardHeader>
              <CardContent className="p-6 space-y-4">
                <div className="flex items-center justify-between p-3 bg-blue-50 rounded-xl">
                  <span className="text-sm text-gray-700 font-medium">إجمالي القيمة</span>
                  <span className="font-bold text-lg text-blue-600">{formatCurrency(investment.totalValue)}</span>
                </div>
                <div className="flex items-center justify-between p-3 bg-green-50 rounded-xl">
                  <span className="text-sm text-gray-700 font-medium">القيمة الحالية</span>
                  <span className="font-bold text-lg text-green-600">{formatCurrency(investment.currentValue)}</span>
                </div>
                <div className="flex items-center justify-between p-3 bg-purple-50 rounded-xl">
                  <span className="text-sm text-gray-700 font-medium">المستثمرون</span>
                  <div className="flex items-center space-x-2 space-x-reverse">
                    <Users className="h-5 w-5 text-purple-500" />
                    <span className="font-bold text-lg text-purple-600">{investment.investors}/{investment.maxInvestors}</span>
                  </div>
                </div>
                <div className="flex items-center justify-between p-3 bg-orange-50 rounded-xl">
                  <span className="text-sm text-gray-700 font-medium">الحد الأدنى</span>
                  <span className="font-bold text-lg text-orange-600">{formatCurrency(investment.minInvestment)}</span>
                </div>
                <div className="flex items-center justify-between p-3 bg-indigo-50 rounded-xl">
                  <span className="text-sm text-gray-700 font-medium">المدة</span>
                  <div className="flex items-center space-x-2 space-x-reverse">
                    <Clock className="h-5 w-5 text-indigo-500" />
                    <span className="font-bold text-lg text-indigo-600">{investment.duration} شهر</span>
                  </div>
                </div>
                <div className="flex items-center justify-between p-3 bg-pink-50 rounded-xl">
                  <span className="text-sm text-gray-700 font-medium">تاريخ الانتهاء</span>
                  <span className="font-bold text-lg text-pink-600">{formatDate(investment.endDate)}</span>
                </div>
                <div className="flex items-center justify-between p-3 bg-teal-50 rounded-xl">
                  <span className="text-sm text-gray-700 font-medium">تاريخ الإطلاق</span>
                  <span className="font-bold text-lg text-teal-600">{formatDate(investment.launchDate || investment.endDate)}</span>
                </div>
              </CardContent>
            </Card>

            {/* Enhanced Financial Details */}
            <Card className="border-2 border-green-100 shadow-lg hover:shadow-xl transition-all duration-300">
              <CardHeader className="bg-gradient-to-r from-green-50 to-green-100 rounded-t-2xl">
                <CardTitle className="text-lg text-gray-800 flex items-center gap-2">
                  <TrendingUp className="h-5 w-5 text-green-600" />
                  التفاصيل المالية
                </CardTitle>
              </CardHeader>
              <CardContent className="p-6 space-y-4">
                <div className="flex items-center justify-between p-3 bg-green-50 rounded-xl">
                  <span className="text-sm text-gray-700 font-medium">العائد المتوقع</span>
                  <span className="font-bold text-lg text-green-600 bg-white px-3 py-1 rounded-full">{investment.expectedReturn}%</span>
                </div>
                <div className="flex items-center justify-between p-3 bg-blue-50 rounded-xl">
                  <span className="text-sm text-gray-700 font-medium">العائد السنوي</span>
                  <span className="font-bold text-lg text-blue-600">
                    {((investment.expectedReturn / investment.duration) * 12).toFixed(1)}%
                  </span>
                </div>
                <div className="flex items-center justify-between p-3 bg-purple-50 rounded-xl">
                  <span className="text-sm text-gray-700 font-medium">العائد الشهري</span>
                  <span className="font-bold text-lg text-purple-600">
                    {(investment.expectedReturn / investment.duration).toFixed(2)}%
                  </span>
                </div>
                <div className="flex items-center justify-between p-3 bg-orange-50 rounded-xl">
                  <span className="text-sm text-gray-700 font-medium">الحد الأقصى للاستثمار</span>
                  <span className="font-bold text-lg text-orange-600">{formatCurrency(investment.financials.availableShares * investment.financials.sharePrice)}</span>
                </div>
                <div className="flex items-center justify-between p-3 bg-indigo-50 rounded-xl">
                  <span className="text-sm text-gray-700 font-medium">الحد الأدنى للأسهم</span>
                  <span className="font-bold text-lg text-indigo-600">1 سهم</span>
                </div>
              </CardContent>
            </Card>

            {/* Enhanced Risk Analysis */}
            <Card className="border-2 border-yellow-100 shadow-lg hover:shadow-xl transition-all duration-300">
              <CardHeader className="bg-gradient-to-r from-yellow-50 to-yellow-100 rounded-t-2xl">
                <CardTitle className="text-lg text-gray-800 flex items-center gap-2">
                  <Shield className="h-5 w-5 text-yellow-600" />
                  تحليل المخاطر
                </CardTitle>
              </CardHeader>
              <CardContent className="p-6 space-y-4">
                <div className="flex items-center justify-between p-3 bg-yellow-50 rounded-xl">
                  <span className="text-sm text-gray-700 font-medium">مستوى المخاطرة</span>
                  <Badge className={`rounded-2xl px-4 py-2 font-bold text-lg ${
                    investment.riskLevel === 'low' ? 'bg-green-100 text-green-800 border-2 border-green-200' :
                    investment.riskLevel === 'medium' ? 'bg-yellow-100 text-yellow-800 border-2 border-yellow-200' :
                    'bg-red-100 text-red-800 border-2 border-red-200'
                  }`}>
                    {investment.riskLevel === 'low' ? 'منخفض' : 
                     investment.riskLevel === 'medium' ? 'متوسط' : 'عالي'}
                  </Badge>
                </div>
                <div className="flex items-center justify-between p-3 bg-blue-50 rounded-xl">
                  <span className="text-sm text-gray-700 font-medium">نوع العقار</span>
                  <span className="font-bold text-lg text-blue-600">{investment.propertyType}</span>
                </div>
                <div className="flex items-center justify-between p-3 bg-green-50 rounded-xl">
                  <span className="text-sm text-gray-700 font-medium">الموقع</span>
                  <span className="font-bold text-lg text-green-600">{investment.location}</span>
                </div>
                <div className="flex items-center justify-between p-3 bg-purple-50 rounded-xl">
                  <span className="text-sm text-gray-700 font-medium">الحالة</span>
                  <Badge className={`rounded-2xl px-4 py-2 font-bold text-lg ${
                    investment.status === 'active' ? 'bg-green-100 text-green-800 border-2 border-green-200' :
                    investment.status === 'funded' ? 'bg-blue-100 text-blue-800 border-2 border-blue-200' :
                    'bg-purple-100 text-purple-800 border-2 border-purple-200'
                  }`}>
                    {investment.status === 'active' ? 'نشط' : 
                     investment.status === 'funded' ? 'ممول' : 'مكتمل'}
                  </Badge>
                </div>
              </CardContent>
            </Card>

            {/* Enhanced Documents - Only show when logged in */}
            {isAuthenticated && (
              <Card className="border-2 border-indigo-100 shadow-lg hover:shadow-xl transition-all duration-300">
                <CardHeader className="bg-gradient-to-r from-indigo-50 to-indigo-100 rounded-t-2xl">
                  <CardTitle className="text-lg text-gray-800 flex items-center gap-2">
                    <FileText className="h-5 w-5 text-indigo-600" />
                    المستندات
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-6 space-y-4">
                  {investment.documents.map((doc, index) => (
                    <div key={index} className="flex items-center justify-between p-4 bg-white rounded-2xl border-2 border-indigo-100 shadow-sm hover:shadow-md transition-all duration-300 hover:border-indigo-200">
                      <div className="flex items-center space-x-3 space-x-reverse">
                        <div className="p-2 bg-indigo-100 rounded-xl">
                          <FileText className="h-5 w-5 text-indigo-600" />
                        </div>
                        <div>
                          <div className="text-sm font-semibold text-gray-800">{doc.name}</div>
                          <div className="text-xs text-gray-500">{doc.size}</div>
                        </div>
                      </div>
                      <Button size="sm" variant="outline" className="border-2 border-indigo-200 text-indigo-600 hover:bg-indigo-50 rounded-xl">
                        <Download className="h-4 w-4" />
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