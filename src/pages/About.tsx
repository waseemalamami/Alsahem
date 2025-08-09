import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Users, Award, Target, TrendingUp, MapPin, Phone, Mail, Building2 } from "lucide-react";
import Navigation from '@/components/Navigation';

import { Link } from 'react-router-dom';

const About = () => {
  const teamMembers = [
    {
      name: "أحمد محمد",
      position: "الرئيس التنفيذي",
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&h=200&fit=crop&crop=face",
      experience: "15+ سنة",
      specialty: "الاستثمار العقاري"
    },
    {
      name: "فاطمة علي",
      position: "مدير العمليات",
      image: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=200&h=200&fit=crop&crop=face",
      experience: "12+ سنة",
      specialty: "إدارة المشاريع"
    },
    {
      name: "محمد حسن",
      position: "مدير المبيعات",
      image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=200&h=200&fit=crop&crop=face",
      experience: "10+ سنة",
      specialty: "المبيعات والتسويق"
    },
    {
      name: "سارة أحمد",
      position: "مدير التطوير",
      image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=200&h=200&fit=crop&crop=face",
      experience: "8+ سنة",
      specialty: "تطوير الأعمال"
    }
  ];

  const achievements = [
    { number: "300+", label: "عقار متاح", icon: Building2 },
    { number: "800+", label: "مستثمر راضٍ", icon: Users },
    { number: "10+", label: "سنوات من الخبرة", icon: Award },
    { number: "92%", label: "معدل الرضا", icon: TrendingUp }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-blue-50 font-['Cairo',sans-serif]" dir="rtl">
      <Navigation />
      

      
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-blue-600 via-blue-700 to-blue-800 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-6">عن شركة السهم العقارية</h1>
          <p className="text-xl text-blue-100 max-w-3xl mx-auto mb-8">
            نعمل على تطوير وتقديم حلول مبتكرة في مجال الاستثمار العقاري في ليبيا
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Button size="lg" className="bg-white text-blue-600 hover:bg-blue-50">
              <Target className="ml-2 h-5 w-5" />
              رؤيتنا
            </Button>
            <Button size="lg" variant="outline" className="bg-white border-blue-600 text-blue-600 hover:bg-blue-50 hover:text-blue-700 hover:border-blue-700">
              <Users className="ml-2 h-5 w-5" />
              فريق العمل
            </Button>
          </div>
        </div>
      </section>
      {/* Company Story */}
      <section className="py-16 px-4 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-3xl font-bold text-gray-900 mb-6">قصتنا</h2>
            <p className="text-gray-600 mb-6 leading-relaxed">
              تأسست شركة السهم العقارية في عام 2014 بهدف تطوير قطاع الاستثمار العقاري في ليبيا 
              وتقديم حلول مبتكرة للمستثمرين والعملاء الراغبين في امتلاك العقارات.
            </p>
            <p className="text-gray-600 mb-6 leading-relaxed">
              نؤمن بأهمية الشفافية والموثوقية في جميع معاملاتنا، ونعمل على توفير أفضل الفرص 
              الاستثمارية لعملائنا الكرام من خلال نظام الأسهم والتقسيط المرن.
            </p>
            <p className="text-gray-600 leading-relaxed">
              على مدار أكثر من 10 سنوات، نجحنا في تطوير أكثر من 300 مشروع عقاري 
              وخدمة أكثر من 800 مستثمر في مختلف أنحاء ليبيا.
            </p>
          </div>
          <div className="relative">
            <img 
              src="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=600&h=400&fit=crop" 
              alt="Company Building"
              className="rounded-2xl shadow-2xl"
            />
            <div className="absolute -bottom-6 -right-6 bg-white rounded-xl p-4 shadow-lg">
              <div className="text-2xl font-bold text-blue-600">10+</div>
              <div className="text-sm text-gray-600">سنوات من الخبرة</div>
            </div>
          </div>
        </div>
      </section>
      {/* Achievements */}
      <section className="py-16 px-4 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <Card className="border-2 border-green-100">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-green-600">
                <Target className="h-6 w-6" />
                رؤيتنا
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600 leading-relaxed">
                نسعى لأن نكون الشركة الرائدة في مجال الاستثمار العقاري في ليبيا، 
                ونعمل على تطوير حلول مبتكرة تساعد المستثمرين على تحقيق أحلامهم العقارية 
                بطريقة آمنة وموثوقة.
              </p>
            </CardContent>
          </Card>
          <Card className="border-2 border-blue-100">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-blue-600">
                <TrendingUp className="h-6 w-6" />
                مهمتنا
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600 leading-relaxed">
                تقديم خدمات استثمارية عالية الجودة من خلال نظام الأسهم والتقسيط المرن، 
                مع ضمان الشفافية والموثوقية في جميع معاملاتنا، ومساعدة عملائنا على 
                تحقيق عوائد استثمارية مميزة.
              </p>
            </CardContent>
          </Card>
        </div>
      </section>
      {/* Team Section */}
      <section className="py-16 px-4 max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">قيمنا</h2>
          <p className="text-gray-600 max-w-3xl mx-auto">
            القيم التي نؤمن بها ونسعى لتطبيقها في جميع أعمالنا
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <Card className="text-center border-2 border-green-100">
            <CardContent className="p-6">
              <div className="text-4xl mb-4">🤝</div>
              <h3 className="font-bold text-lg mb-3">الشفافية</h3>
              <p className="text-gray-600">
                نؤمن بأهمية الشفافية في جميع معاملاتنا ونسعى لتوفير معلومات واضحة ودقيقة لعملائنا
              </p>
            </CardContent>
          </Card>
          <Card className="text-center border-2 border-blue-100">
            <CardContent className="p-6">
              <div className="text-4xl mb-4">🎯</div>
              <h3 className="font-bold text-lg mb-3">الموثوقية</h3>
              <p className="text-gray-600">
                نلتزم بتقديم خدمات موثوقة وعالية الجودة لضمان رضا عملائنا وثقتهم
              </p>
            </CardContent>
          </Card>
          <Card className="text-center border-2 border-purple-100">
            <CardContent className="p-6">
              <div className="text-4xl mb-4">💡</div>
              <h3 className="font-bold text-lg mb-3">الابتكار</h3>
              <p className="text-gray-600">
                نسعى لتطوير حلول مبتكرة تلبي احتياجات عملائنا وتواكب التطورات الحديثة
              </p>
            </CardContent>
          </Card>
        </div>
      </section>
    </div>
  );
};

export default About; 