import { useState, useEffect } from 'react';
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
  TrendingDown,
  RefreshCw
} from "lucide-react";
import Navigation from '@/components/Navigation';
import { useAuth } from '@/contexts/AuthContext';
import { InvestmentService } from '@/services/investment.service';
import { Investment } from '@/types/api';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Skeleton } from '@/components/ui/skeleton';

const InvestmentDetail = () => {
  const { id } = useParams();
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isWatching, setIsWatching] = useState(false);
  const [activeTab, setActiveTab] = useState("overview");
  const [investment, setInvestment] = useState<Investment | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  
  // Use actual authentication context
  const { isAuthenticated } = useAuth();

  // Load investment data from backend
  useEffect(() => {
    if (id) {
      loadInvestmentData();
    }
  }, [id]);

  const loadInvestmentData = async () => {
    try {
      setLoading(true);
      setError(null);
      
      console.log('🔍 Loading investment details for ID:', id);
      
      // For now, we'll get all investments and find the one with matching ID
      // In a real app, you'd have a dedicated endpoint like `/Investment/getInvestmentById/${id}`
      const response = await InvestmentService.getInvestments();
      const allInvestments = response.data || [];
      
      const foundInvestment = allInvestments.find(inv => inv.id.toString() === id);
      
      if (foundInvestment) {
        console.log('✅ Found investment:', foundInvestment);
        setInvestment(foundInvestment);
      } else {
        console.log('❌ Investment not found');
        setError('Investment not found');
      }
    } catch (err: any) {
      console.error('❌ Error loading investment details:', err);
      setError(err.message || 'Failed to load investment details');
    } finally {
      setLoading(false);
    }
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
    }).format(amount);
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('ar-LY');
  };

  const nextImage = () => {
    if (!investment?.images) return;
    setCurrentImageIndex((prev) => 
      prev === investment.images.length - 1 ? 0 : prev + 1
    );
  };

  const prevImage = () => {
    if (!investment?.images) return;
    setCurrentImageIndex((prev) => 
      prev === 0 ? investment.images.length - 1 : prev - 1
    );
  };

  const handleWatch = () => {
    setIsWatching(!isWatching);
  };

  // Loading state
  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 font-['Cairo',sans-serif]" dir="rtl">
        <Navigation />
        <div className="max-w-6xl mx-auto px-4 py-6">
          <div className="space-y-6">
            <Skeleton className="h-8 w-3/4" />
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <div className="lg:col-span-2 space-y-6">
                <Skeleton className="h-96 w-full" />
                <Skeleton className="h-32 w-full" />
                <Skeleton className="h-64 w-full" />
              </div>
              <div className="space-y-6">
                <Skeleton className="h-48 w-full" />
                <Skeleton className="h-32 w-full" />
                <Skeleton className="h-64 w-full" />
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Error state
  if (error || !investment) {
    return (
      <div className="min-h-screen bg-gray-50 font-['Cairo',sans-serif]" dir="rtl">
        <Navigation />
        <div className="max-w-6xl mx-auto px-4 py-6">
          <Alert>
            <AlertDescription>
              <div className="flex justify-between items-center">
                <span>Error loading investment: {error || 'Investment not found'}</span>
                <Button onClick={loadInvestmentData} variant="outline" size="sm">
                  <RefreshCw className="h-4 w-4 ml-2" />
                  Retry
                </Button>
              </div>
            </AlertDescription>
          </Alert>
        </div>
      </div>
    );
  }

  // Calculate progress percentages
  const progressPercentage = investment.currentValue && investment.totalValue 
    ? (investment.currentValue / investment.totalValue) * 100 
    : 0;
  
  const soldShares = investment.totalShares && investment.availableShares 
    ? investment.totalShares - investment.availableShares 
    : 0;
  
  const soldPercentage = investment.totalShares 
    ? (soldShares / investment.totalShares) * 100 
    : 0;

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

  // Use mapped image for this investment
  const images = [getInvestmentImage(investment.id)];

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
                  src={images[currentImageIndex]} 
                  alt={investment.title}
                  className="w-full h-96 object-cover"
                />
                
                {/* Navigation Arrows */}
                {images.length > 1 && (
                  <>
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
                  </>
                )}

                {/* Image Counter */}
                {images.length > 1 && (
                  <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 bg-black/50 text-white px-3 py-1 rounded-full text-sm">
                    {currentImageIndex + 1} / {images.length}
                  </div>
                )}

                {/* Action Buttons */}
                <div className="absolute top-4 right-4 flex gap-2">
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    className="bg-white/80 hover:bg-white"
                    onClick={handleWatch}
                  >
                    <Heart className={`h-4 w-4 ${isWatching ? 'fill-red-500 text-red-500' : ''}`} />
                  </Button>
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    className="bg-white/80 hover:bg-white"
                  >
                    <Share2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </Card>

            {/* Investment Info */}
            <Card>
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div>
                    <CardTitle className="text-2xl mb-2">{investment.title}</CardTitle>
                    <div className="flex items-center gap-4 text-gray-600">
                      <div className="flex items-center gap-1">
                        <MapPin className="h-4 w-4" />
                        <span>{investment.location}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Building2 className="h-4 w-4" />
                        <span>{investment.propertyType}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Eye className="h-4 w-4" />
                        <span>{investment.views || 0} مشاهدة</span>
                      </div>
                    </div>
                  </div>
                  <Badge variant={investment.status === 'active' ? 'default' : 'secondary'}>
                    {investment.status === 'active' ? 'نشط' : 'مكتمل'}
                  </Badge>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-gray-700 leading-relaxed">
                  {investment.description || 'مشروع استثماري مميز في العقارات مع عوائد مجزية ومخاطر منخفضة.'}
                </p>
              </CardContent>
            </Card>

            {/* Tabs */}
            <Card>
              <CardHeader>
                <Tabs value={activeTab} onValueChange={setActiveTab}>
                  <TabsList className="grid w-full grid-cols-4">
                    <TabsTrigger value="overview">نظرة عامة</TabsTrigger>
                    <TabsTrigger value="financials">المالية</TabsTrigger>
                    <TabsTrigger value="timeline">الجدول الزمني</TabsTrigger>
                    <TabsTrigger value="documents">المستندات</TabsTrigger>
                  </TabsList>
                </Tabs>
              </CardHeader>
              <CardContent>
                <Tabs value={activeTab} onValueChange={setActiveTab}>
                  {/* Overview Tab */}
                  <TabsContent value="overview" className="space-y-6">
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                      <div className="text-center p-4 bg-blue-50 rounded-lg">
                        <div className="text-2xl font-bold text-blue-600">{formatCurrency(investment.totalValue || 0)}</div>
                        <div className="text-sm text-gray-600">القيمة الإجمالية</div>
                      </div>
                      <div className="text-center p-4 bg-green-50 rounded-lg">
                        <div className="text-2xl font-bold text-green-600">{formatCurrency(investment.currentValue || 0)}</div>
                        <div className="text-sm text-gray-600">القيمة الحالية</div>
                      </div>
                      <div className="text-center p-4 bg-purple-50 rounded-lg">
                        <div className="text-2xl font-bold text-purple-600">{investment.expectedReturn || 0}%</div>
                        <div className="text-sm text-gray-600">العائد المتوقع</div>
                      </div>
                      <div className="text-center p-4 bg-orange-50 rounded-lg">
                        <div className="text-2xl font-bold text-orange-600">{investment.duration || 0} شهر</div>
                        <div className="text-sm text-gray-600">المدة</div>
                      </div>
                    </div>

                    <div className="space-y-4">
                      <h3 className="text-lg font-semibold">معلومات الأسهم</h3>
                      <div className="space-y-3">
                        <div className="flex justify-between items-center">
                          <span className="text-gray-600">الأسهم المباعة</span>
                          <span className="font-semibold">{soldShares} / {investment.totalShares}</span>
                        </div>
                        <Progress value={soldPercentage} className="h-2" />
                        <div className="flex justify-between text-sm text-gray-500">
                          <span>{soldPercentage.toFixed(1)}%</span>
                          <span>{investment.availableShares} أسهم متاحة</span>
                        </div>
                      </div>
                    </div>
                  </TabsContent>

                  {/* Financials Tab */}
                  <TabsContent value="financials" className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <Card>
                        <CardHeader>
                          <CardTitle className="text-lg">تفاصيل الاستثمار</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-3">
                          <div className="flex justify-between">
                            <span>الحد الأدنى للاستثمار</span>
                            <span className="font-semibold">{formatCurrency(investment.minInvestment || 0)}</span>
                          </div>
                          <div className="flex justify-between">
                            <span>سعر السهم</span>
                            <span className="font-semibold">{formatCurrency(investment.sharePrice || 0)}</span>
                          </div>
                          <div className="flex justify-between">
                            <span>العائد الشهري</span>
                            <span className="font-semibold text-green-600">{(investment.expectedReturn || 0) / 12}%</span>
                          </div>
                        </CardContent>
                      </Card>

                      <Card>
                        <CardHeader>
                          <CardTitle className="text-lg">المخاطر والعوائد</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-3">
                          <div className="flex justify-between">
                            <span>مستوى المخاطر</span>
                            <Badge variant={investment.riskLevel === 'low' ? 'default' : investment.riskLevel === 'medium' ? 'secondary' : 'destructive'}>
                              {investment.riskLevel === 'low' ? 'منخفض' : investment.riskLevel === 'medium' ? 'متوسط' : 'عالي'}
                            </Badge>
                          </div>
                          <div className="flex justify-between">
                            <span>العائد المتوقع</span>
                            <span className="font-semibold text-green-600">{investment.expectedReturn || 0}%</span>
                          </div>
                          <div className="flex justify-between">
                            <span>تاريخ الانتهاء</span>
                            <span className="font-semibold">{investment.endDate ? formatDate(investment.endDate) : 'غير محدد'}</span>
                          </div>
                        </CardContent>
                      </Card>
                    </div>
                  </TabsContent>

                  {/* Timeline Tab */}
                  <TabsContent value="timeline" className="space-y-6">
                    <div className="space-y-4">
                      <div className="flex items-center gap-2">
                        <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                        <div>
                          <div className="font-semibold">المرحلة الأولى - التخطيط</div>
                          <div className="text-sm text-gray-600">مكتمل - يناير 2024</div>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                        <div>
                          <div className="font-semibold">المرحلة الثانية - البناء</div>
                          <div className="text-sm text-gray-600">قيد التنفيذ - يونيو 2024</div>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="w-3 h-3 bg-gray-300 rounded-full"></div>
                        <div>
                          <div className="font-semibold">المرحلة الثالثة - التسليم</div>
                          <div className="text-sm text-gray-600">مخطط - ديسمبر 2024</div>
                        </div>
                      </div>
                    </div>
                  </TabsContent>

                  {/* Documents Tab */}
                  <TabsContent value="documents" className="space-y-6">
                    <div className="space-y-3">
                      <div className="flex items-center justify-between p-3 border rounded-lg">
                        <div className="flex items-center gap-3">
                          <FileText className="h-5 w-5 text-blue-600" />
                          <div>
                            <div className="font-semibold">عقد الاستثمار</div>
                            <div className="text-sm text-gray-600">PDF - 2.3 MB</div>
                          </div>
                        </div>
                        <Button variant="outline" size="sm">
                          <Download className="h-4 w-4 ml-2" />
                          تحميل
                        </Button>
                      </div>
                      <div className="flex items-center justify-between p-3 border rounded-lg">
                        <div className="flex items-center gap-3">
                          <FileText className="h-5 w-5 text-green-600" />
                          <div>
                            <div className="font-semibold">مخطط المشروع</div>
                            <div className="text-sm text-gray-600">PDF - 1.8 MB</div>
                          </div>
                        </div>
                        <Button variant="outline" size="sm">
                          <Download className="h-4 w-4 ml-2" />
                          تحميل
                        </Button>
                      </div>
                    </div>
                  </TabsContent>
                </Tabs>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Investment Card */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">استثمر الآن</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="text-center">
                  <div className="text-3xl font-bold text-green-600">{formatCurrency(investment.minInvestment || 0)}</div>
                  <div className="text-sm text-gray-600">الحد الأدنى للاستثمار</div>
                </div>
                
                <div className="space-y-3">
                  <div className="flex justify-between text-sm">
                    <span>العائد المتوقع</span>
                    <span className="font-semibold text-green-600">{investment.expectedReturn || 0}%</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span>المدة</span>
                    <span className="font-semibold">{investment.duration || 0} شهر</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span>المستثمرون</span>
                    <span className="font-semibold">{investment.investors || 0} / {investment.maxInvestors || 0}</span>
                  </div>
                </div>

                <Progress value={progressPercentage} className="h-2" />
                <div className="text-center text-sm text-gray-600">
                  {progressPercentage.toFixed(1)}% مكتمل
                </div>

                {isAuthenticated ? (
                  <Button className="w-full" size="lg">
                    إستثمر الآن
                  </Button>
                ) : (
                  <Link to="/login">
                    <Button className="w-full" size="lg">
                      تسجيل الدخول للاستثمار
                    </Button>
                  </Link>
                )}
              </CardContent>
            </Card>

            {/* Quick Stats */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">إحصائيات سريعة</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-gray-600">التقييم</span>
                  <div className="flex items-center gap-1">
                    <Star className="h-4 w-4 text-yellow-500 fill-current" />
                    <span className="font-semibold">{investment.rating || 4.5}</span>
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-600">المشاهدات</span>
                  <span className="font-semibold">{investment.views || 0}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-600">تاريخ الإطلاق</span>
                  <span className="font-semibold">{investment.launchDate ? formatDate(investment.launchDate) : 'غير محدد'}</span>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InvestmentDetail; 