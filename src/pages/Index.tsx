import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  TrendingUp, 
  Users, 
  Building2, 
  Target, 
  Star, 
  Play, 
  ArrowLeft,
  CheckCircle,
  Shield,
  Zap,
  Award,
  MapPin,
  Phone,
  Mail,
  ArrowRight
} from "lucide-react";
import Navigation from '@/components/Navigation';
import { useAuth } from '@/contexts/AuthContext';
import { Link } from 'react-router-dom';

const Index = () => {
  const { isAuthenticated, isInvestor } = useAuth();
  
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-blue-50 font-['Cairo',sans-serif] w-full" dir="rtl">
      <Navigation />
      
      {/* Enhanced Hero Section - Responsive */}
      <section className="relative bg-gradient-to-br from-blue-600 via-blue-700 to-blue-800 text-white overflow-hidden min-h-[70vh] sm:min-h-[80vh] flex items-center w-full">
        {/* Background Pattern */}
        <div className="absolute inset-0 bg-black opacity-10"></div>
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-gradient-to-r from-blue-900/60 to-transparent z-10"></div>
          <div className="absolute top-0 right-0 w-48 h-48 sm:w-96 sm:h-96 bg-blue-500/20 rounded-full blur-3xl"></div>
          <div className="absolute bottom-0 left-0 w-48 h-48 sm:w-96 sm:h-96 bg-purple-500/20 rounded-full blur-3xl"></div>
        </div>
        
        <div className="relative z-20 w-full px-4 sm:px-6 lg:px-8 py-12 sm:py-16 lg:py-20">
          <div className="max-w-7xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
              <div className="space-y-6 sm:space-y-8 text-center lg:text-right">
                <div className="space-y-4 sm:space-y-6">
                  <Badge className="bg-white/20 text-white border-white/30 backdrop-blur-sm text-xs sm:text-sm px-3 sm:px-4 py-1.5 sm:py-2">
                    🏆 منصة الاستثمار العقاري الرائدة في ليبيا
                  </Badge>
                  <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold leading-tight">
                    استثمر في العقارات
                    <span className="block text-blue-200 mt-2">بالأسهم والأقساط</span>
                  </h1>
                  <p className="text-base sm:text-lg lg:text-xl text-blue-100 leading-relaxed max-w-xl mx-auto lg:mx-0">
                    منصة السهم توفر لك استثمار آمن في العقارات المميزة من خلال نظام الأسهم أو 
                    نظام الأقساط المرنة لتحقيق أحلامك العقارية في ليبيا
                  </p>
                </div>
                
                {/* Key Benefits - Responsive grid */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4">
                  <div className="flex items-center justify-center sm:justify-start gap-2 sm:gap-3 text-blue-100">
                    <CheckCircle className="h-4 w-4 sm:h-5 sm:w-5 text-green-300 flex-shrink-0" />
                    <span className="text-xs sm:text-sm">استثمار آمن</span>
                  </div>
                  <div className="flex items-center justify-center sm:justify-start gap-2 sm:gap-3 text-blue-100">
                    <Shield className="h-4 w-4 sm:h-5 sm:w-5 text-green-300 flex-shrink-0" />
                    <span className="text-xs sm:text-sm">شفافية كاملة</span>
                  </div>
                  <div className="flex items-center justify-center sm:justify-start gap-2 sm:gap-3 text-blue-100">
                    <Zap className="h-4 w-4 sm:h-5 sm:w-5 text-green-300 flex-shrink-0" />
                    <span className="text-xs sm:text-sm">عوائد مميزة</span>
                  </div>
                </div>
                
                <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center lg:justify-start">
                  <Link to="/investments">
                    <Button size="lg" className="w-full sm:w-auto bg-white text-blue-600 hover:bg-blue-50 px-6 sm:px-8 py-3 sm:py-4 text-base sm:text-lg font-semibold shadow-lg hover:shadow-xl transition-all duration-300">
                      📈 الاستثمارات المتاحة
                      <ArrowRight className="mr-2 h-4 w-4 sm:h-5 sm:w-5" />
                    </Button>
                  </Link>
                </div>
              </div>
              
              {/* Hero Image/Illustration - Responsive */}
              <div className="relative order-first lg:order-last">
                <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 sm:p-8 border border-white/20">
                  <div className="text-center space-y-3 sm:space-y-4">
                    <div className="w-16 h-16 sm:w-20 sm:h-20 lg:w-24 lg:h-24 bg-white/20 rounded-full flex items-center justify-center mx-auto">
                      <Building2 className="h-8 w-8 sm:h-10 sm:w-10 lg:h-12 lg:w-12 text-white" />
                    </div>
                    <h3 className="text-lg sm:text-xl font-semibold">استثمارات حقيقية</h3>
                    <p className="text-blue-100 text-sm sm:text-base">عقارات متميزة في أفضل المواقع</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Enhanced Services Section - Responsive */}
      <section className="py-12 sm:py-16 lg:py-20 px-4 sm:px-6 lg:px-8 w-full">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12 sm:mb-16">
            <Badge className="bg-blue-100 text-blue-700 border-blue-200 text-xs sm:text-sm px-3 sm:px-4 py-1.5 sm:py-2 mb-3 sm:mb-4">
              خدماتنا
            </Badge>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 mb-3 sm:mb-4">خدماتنا الرئيسية</h2>
            <p className="text-base sm:text-lg lg:text-xl text-gray-600 max-w-2xl mx-auto">اختر الخدمة المناسبة لك وابدأ رحلتك الاستثمارية</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8 max-w-4xl mx-auto">
            <Link to="/investments">
              <Card className="group hover:shadow-2xl transition-all duration-500 hover:scale-105 cursor-pointer border-0 bg-gradient-to-br from-green-500 to-green-600 text-white overflow-hidden relative h-full">
                <div className="absolute top-0 right-0 w-24 h-24 sm:w-32 sm:h-32 bg-white/10 rounded-full blur-2xl"></div>
                <CardContent className="p-6 sm:p-8 text-center relative z-10 h-full flex flex-col justify-between">
                  <div>
                    <div className="w-12 h-12 sm:w-14 sm:h-14 lg:w-16 lg:h-16 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4 sm:mb-6 group-hover:scale-110 transition-transform duration-300">
                      <Target className="h-6 w-6 sm:h-7 sm:w-7 lg:h-8 lg:w-8" />
                    </div>
                    <h3 className="font-bold text-xl sm:text-2xl mb-3 sm:mb-4">استثمار أسهم</h3>
                    <p className="text-green-100 text-sm sm:text-base lg:text-lg mb-4 sm:mb-6 leading-relaxed">استثمر في المشاريع العقارية الواعدة واحصل على عوائد مميزة</p>
                  </div>
                  <Button
                    variant="outline"
                    size="lg"
                    className="bg-white border-white text-green-600 hover:bg-green-50 hover:text-green-700 hover:border-green-50 font-semibold text-sm sm:text-base"
                  >
                    عرض الاستثمارات
                    <ArrowRight className="mr-2 h-3 w-3 sm:h-4 sm:w-4" />
                  </Button>
                </CardContent>
              </Card>
            </Link>
            
            <Link to="/dashboard">
              <Card className="group hover:shadow-2xl transition-all duration-500 hover:scale-105 cursor-pointer border-0 bg-gradient-to-br from-purple-500 to-purple-600 text-white overflow-hidden relative h-full">
                <div className="absolute top-0 right-0 w-24 h-24 sm:w-32 sm:h-32 bg-white/10 rounded-full blur-2xl"></div>
                <CardContent className="p-6 sm:p-8 text-center relative z-10 h-full flex flex-col justify-between">
                  <div>
                    <div className="w-12 h-12 sm:w-14 sm:h-14 lg:w-16 lg:h-16 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4 sm:mb-6 group-hover:scale-110 transition-transform duration-300">
                      <TrendingUp className="h-6 w-6 sm:h-7 sm:w-7 lg:h-8 lg:w-8" />
                    </div>
                    <h3 className="font-bold text-xl sm:text-2xl mb-3 sm:mb-4">متابعة الأرباح</h3>
                    <p className="text-purple-100 text-sm sm:text-base lg:text-lg mb-4 sm:mb-6 leading-relaxed">راقب عوائد استثماراتك بسهولة وشفافية كاملة</p>
                  </div>
                  <Button
                    variant="outline"
                    size="lg"
                    className="bg-white border-white text-purple-600 hover:bg-purple-50 hover:text-purple-700 hover:border-purple-50 font-semibold text-sm sm:text-base"
                  >
                    عرض المحفظة
                    <ArrowRight className="mr-2 h-3 w-3 sm:h-4 sm:w-4" />
                  </Button>
                </CardContent>
              </Card>
            </Link>
          </div>
        </div>
      </section>

      {/* Enhanced About Section with Stats - Responsive */}
      <section className="py-12 sm:py-16 lg:py-20 bg-gradient-to-br from-gray-50 to-blue-50 w-full">
        <div className="px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-12 lg:gap-16 items-center mb-12 sm:mb-16">
              <div className="space-y-6 sm:space-y-8 text-center lg:text-right">
                <Badge className="bg-blue-100 text-blue-700 border-blue-200 text-xs sm:text-sm px-3 sm:px-4 py-1.5 sm:py-2">
                  عن الشركة
                </Badge>
                <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900">عن شركة السهم العقارية</h2>
                <p className="text-base sm:text-lg lg:text-xl text-gray-600 leading-relaxed">
                  شركة رائدة في مجال الاستثمار العقاري في ليبيا، نقدم حلولاً مبتكرة للاستثمار في العقارات 
                  من خلال نظام الأسهم والتقسيط المرن لعملائنا الكرام. نتميز بالشفافية والموثوقية 
                  في جميع معاملاتنا العقارية
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
                  <div className="flex items-center justify-center sm:justify-start gap-2 sm:gap-3">
                    <CheckCircle className="h-5 w-5 sm:h-6 sm:w-6 text-green-500 flex-shrink-0" />
                    <span className="text-sm sm:text-base text-gray-700 font-medium">خبرة 10+ سنوات</span>
                  </div>
                  <div className="flex items-center justify-center sm:justify-start gap-2 sm:gap-3">
                    <Shield className="h-5 w-5 sm:h-6 sm:w-6 text-green-500 flex-shrink-0" />
                    <span className="text-sm sm:text-base text-gray-700 font-medium">ضمان الاستثمار</span>
                  </div>
                  <div className="flex items-center justify-center sm:justify-start gap-2 sm:gap-3">
                    <Zap className="h-5 w-5 sm:h-6 sm:w-6 text-green-500 flex-shrink-0" />
                    <span className="text-sm sm:text-base text-gray-700 font-medium">عوائد مميزة</span>
                  </div>
                  <div className="flex items-center justify-center sm:justify-start gap-2 sm:gap-3">
                    <Award className="h-5 w-5 sm:h-6 sm:w-6 text-green-500 flex-shrink-0" />
                    <span className="text-sm sm:text-base text-gray-700 font-medium">جودة عالية</span>
                  </div>
                </div>
              </div>
              
              <div className="relative order-first lg:order-last">
                <div className="bg-white rounded-2xl p-6 sm:p-8 shadow-xl">
                  <h3 className="text-xl sm:text-2xl font-bold text-gray-900 mb-4 sm:mb-6 text-center">إحصائيات الشركة</h3>
                  <div className="grid grid-cols-2 gap-4 sm:gap-6">
                    <div className="text-center p-3 sm:p-4 bg-blue-50 rounded-xl">
                      <div className="text-2xl sm:text-3xl font-bold text-blue-600 mb-1 sm:mb-2">+300</div>
                      <div className="text-xs sm:text-sm text-gray-600 font-medium">عقار متاح</div>
                    </div>
                    <div className="text-center p-3 sm:p-4 bg-green-50 rounded-xl">
                      <div className="text-2xl sm:text-3xl font-bold text-green-600 mb-1 sm:mb-2">15.2%</div>
                      <div className="text-xs sm:text-sm text-gray-600 font-medium">متوسط العائد</div>
                    </div>
                    <div className="text-center p-3 sm:p-4 bg-purple-50 rounded-xl">
                      <div className="text-2xl sm:text-3xl font-bold text-purple-600 mb-1 sm:mb-2">10+</div>
                      <div className="text-xs sm:text-sm text-gray-600 font-medium">سنوات من الخبرة</div>
                    </div>
                    <div className="text-center p-3 sm:p-4 bg-orange-50 rounded-xl">
                      <div className="text-2xl sm:text-3xl font-bold text-orange-600 mb-1 sm:mb-2">+500</div>
                      <div className="text-xs sm:text-sm text-gray-600 font-medium">مشروع مكتمل</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Enhanced Call to Action - Responsive */}
      <section className="py-12 sm:py-16 lg:py-20 bg-gradient-to-br from-blue-600 to-blue-800 text-white w-full">
        <div className="px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-4 sm:mb-6">ابدأ رحلتك الاستثمارية اليوم</h2>
            <p className="text-base sm:text-lg lg:text-xl text-blue-100 mb-6 sm:mb-8 max-w-2xl mx-auto">
              انضم إلى آلاف المستثمرين الناجحين واحقق أحلامك العقارية في ليبيا
            </p>
            <div className="flex justify-center">
              <Link to="/investments">
                <Button size="lg" className="bg-white text-blue-600 hover:bg-blue-50 px-6 sm:px-8 py-3 sm:py-4 text-base sm:text-lg font-semibold shadow-lg hover:shadow-xl transition-all duration-300">
                  📈 استثمر الآن
                  <ArrowRight className="mr-2 h-4 w-4 sm:h-5 sm:w-5" />
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Info Footer - Responsive */}
      <section className="py-8 sm:py-12 bg-gray-900 text-white w-full">
        <div className="px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 sm:gap-8 text-center">
              <div className="flex flex-col items-center gap-2 sm:gap-3">
                <MapPin className="h-6 w-6 sm:h-8 sm:w-8 text-blue-400" />
                <h3 className="font-semibold text-sm sm:text-base">العنوان</h3>
                <p className="text-gray-300 text-xs sm:text-sm">طرابلس، ليبيا</p>
              </div>
              <div className="flex flex-col items-center gap-2 sm:gap-3">
                <Phone className="h-6 w-6 sm:h-8 sm:w-8 text-blue-400" />
                <h3 className="font-semibold text-sm sm:text-base">الهاتف</h3>
                <p className="text-gray-300 text-xs sm:text-sm">+218 21 123 4567</p>
              </div>
              <div className="flex flex-col items-center gap-2 sm:gap-3">
                <Mail className="h-6 w-6 sm:h-8 sm:w-8 text-blue-400" />
                <h3 className="font-semibold text-sm sm:text-base">البريد الإلكتروني</h3>
                <p className="text-gray-300 text-xs sm:text-sm">info@alsaham.ly</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Index; 