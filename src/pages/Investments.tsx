import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import { Progress } from "@/components/ui/progress";
import { 
  Search, 
  Filter, 
  TrendingUp, 
  Building2, 
  MapPin, 
  Users, 
  Calendar,
  Star,
  Eye,
  Clock,
  DollarSign,
  Target
} from "lucide-react";
import Navigation from '@/components/Navigation';

import InvestmentCard from '@/components/InvestmentCard';

const Investments = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedType, setSelectedType] = useState('');
  const [selectedRisk, setSelectedRisk] = useState('');
  const [returnRange, setReturnRange] = useState([0, 20]);
  const [showFilters, setShowFilters] = useState(false);

  // Sample investments data
  const investments = [
    {
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
      image: "https://images.unsplash.com/photo-1613490493576-7fde63acd811?w=400&h=300&fit=crop",
      rating: 4.8,
      views: 234,
      endDate: "2026-03-15",
      propertyType: "فيلا",
      riskLevel: "medium" as const
    },
    {
      id: "2",
      title: "برج الشقق السكنية",
      location: "بنغازي، وسط المدينة",
      totalValue: 3000000,
      currentValue: 1800000,
      minInvestment: 30000,
      expectedReturn: 12.3,
      duration: 18,
      investors: 67,
      maxInvestors: 150,
      status: "active" as const,
      image: "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=400&h=300&fit=crop",
      rating: 4.6,
      views: 156,
      endDate: "2025-09-20",
      propertyType: "شقة",
      riskLevel: "low" as const
    },
    {
      id: "3",
      title: "مجمع تجاري سكني",
      location: "مصراتة، حي العزيزية",
      totalValue: 8000000,
      currentValue: 7200000,
      minInvestment: 100000,
      expectedReturn: 18.7,
      duration: 36,
      investors: 23,
      maxInvestors: 80,
      status: "funded" as const,
      image: "https://images.unsplash.com/photo-1570129477492-45c003edd2be?w=400&h=300&fit=crop",
      rating: 4.9,
      views: 189,
      endDate: "2027-06-10",
      propertyType: "تجاري",
      riskLevel: "high" as const
    },
    {
      id: "4",
      title: "أراضي سكنية للبناء",
      location: "الزاوية، شارع البحر",
      totalValue: 2000000,
      currentValue: 800000,
      minInvestment: 25000,
      expectedReturn: 10.2,
      duration: 12,
      investors: 89,
      maxInvestors: 200,
      status: "active" as const,
      image: "https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=400&h=300&fit=crop",
      rating: 4.4,
      views: 98,
      endDate: "2025-01-30",
      propertyType: "أرض",
      riskLevel: "low" as const
    },
    {
      id: "5",
      title: "فيلات شاطئية فاخرة",
      location: "زوارة، الشاطئ",
      totalValue: 12000000,
      currentValue: 6000000,
      minInvestment: 150000,
      expectedReturn: 22.1,
      duration: 48,
      investors: 12,
      maxInvestors: 50,
      status: "active" as const,
      image: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=400&h=300&fit=crop",
      rating: 4.9,
      views: 345,
      endDate: "2028-12-01",
      propertyType: "فيلا",
      riskLevel: "high" as const
    },
    {
      id: "6",
      title: "شقق طلابية",
      location: "طرابلس، جامعة طرابلس",
      totalValue: 1500000,
      currentValue: 1500000,
      minInvestment: 20000,
      expectedReturn: 8.5,
      duration: 15,
      investors: 156,
      maxInvestors: 300,
      status: "completed" as const,
      image: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=400&h=300&fit=crop",
      rating: 4.7,
      views: 267,
      endDate: "2025-05-15",
      propertyType: "شقة",
      riskLevel: "low" as const
    }
  ];

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('ar-LY', {
      style: 'currency',
      currency: 'LYD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount);
  };

  const filteredInvestments = investments.filter(investment => {
    const matchesSearch = investment.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         investment.location.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesType = !selectedType || investment.propertyType === selectedType;
    const matchesRisk = !selectedRisk || investment.riskLevel === selectedRisk;
    const matchesReturn = investment.expectedReturn >= returnRange[0] && investment.expectedReturn <= returnRange[1];
    
    return matchesSearch && matchesType && matchesRisk && matchesReturn;
  });

  return (
    <div className="min-h-screen bg-gray-50 font-['Cairo',sans-serif]" dir="rtl">
      <Navigation />
      

      
      {/* Header Section - More Compact */}
      <section className="bg-gradient-to-br from-purple-600 to-purple-800 text-white py-8">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center mb-6">
            <h1 className="text-3xl font-bold mb-2">الاستثمارات العقارية</h1>
            <p className="text-purple-100">استثمر في المشاريع العقارية الواعدة واحصل على عوائد مميزة</p>
          </div>
          
          {/* Search Bar - More Compact */}
          <div className="max-w-2xl mx-auto">
            <div className="relative">
              <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <Input
                type="text"
                placeholder="ابحث عن استثمار..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 pr-12 h-10 bg-white/10 border-white/20 text-white placeholder:text-purple-200 focus:bg-white/20"
              />
              <Button 
                size="sm" 
                variant="outline" 
                className="absolute left-2 top-1/2 transform -translate-y-1/2 h-6 px-2 text-xs bg-white border-purple-600 text-purple-600 hover:bg-purple-50 hover:text-purple-700 hover:border-purple-700"
                onClick={() => setShowFilters(!showFilters)}
              >
                <Filter className="h-3 w-3 ml-1" />
                فلاتر
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section - More Compact */}
      <section className="py-6 bg-white border-b border-gray-200">
        <div className="max-w-6xl mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="text-center">
              <div className="text-lg font-bold text-blue-600">{investments.length}</div>
              <div className="text-xs text-gray-600">مشروع نشط</div>
            </div>
            <div className="text-center">
              <div className="text-lg font-bold text-green-600">15.2%</div>
              <div className="text-xs text-gray-600">متوسط العائد</div>
            </div>
            <div className="text-center">
              <div className="text-lg font-bold text-purple-600">392</div>
              <div className="text-xs text-gray-600">مستثمر نشط</div>
            </div>
            <div className="text-center">
              <div className="text-lg font-bold text-orange-600">+500</div>
              <div className="text-xs text-gray-600">مشروع مكتمل</div>
            </div>
          </div>
        </div>
      </section>

      {/* Filters Section - More Compact */}
      {showFilters && (
        <section className="bg-white border-b border-gray-200 py-4">
          <div className="max-w-6xl mx-auto px-4">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div>
                <label className="text-xs font-medium text-gray-700 mb-1 block">نوع العقار</label>
                <Select value={selectedType} onValueChange={setSelectedType}>
                  <SelectTrigger className="h-8 text-xs">
                    <SelectValue placeholder="اختر النوع" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="">جميع الأنواع</SelectItem>
                    <SelectItem value="فيلا">فيلا</SelectItem>
                    <SelectItem value="شقة">شقة</SelectItem>
                    <SelectItem value="تجاري">تجاري</SelectItem>
                    <SelectItem value="أرض">أرض</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div>
                <label className="text-xs font-medium text-gray-700 mb-1 block">مستوى المخاطرة</label>
                <Select value={selectedRisk} onValueChange={setSelectedRisk}>
                  <SelectTrigger className="h-8 text-xs">
                    <SelectValue placeholder="اختر المستوى" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="">جميع المستويات</SelectItem>
                    <SelectItem value="low">منخفض</SelectItem>
                    <SelectItem value="medium">متوسط</SelectItem>
                    <SelectItem value="high">عالي</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div>
                <label className="text-xs font-medium text-gray-700 mb-1 block">نطاق العائد</label>
                <div className="text-xs text-gray-600 mb-2">
                  {returnRange[0]}% - {returnRange[1]}%
                </div>
                <Slider
                  value={returnRange}
                  onValueChange={setReturnRange}
                  max={30}
                  step={1}
                  className="w-full"
                />
              </div>
              
              <div className="flex items-end">
                <Button 
                  size="sm" 
                  variant="outline" 
                  className="h-8 text-xs"
                  onClick={() => {
                    setSearchTerm('');
                    setSelectedType('');
                    setSelectedRisk('');
                    setReturnRange([0, 20]);
                  }}
                >
                  مسح الفلاتر
                </Button>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Investments Grid - More Compact */}
      <section className="py-8">
        <div className="max-w-6xl mx-auto px-4">
          {/* Results Header - More Compact */}
          <div className="flex items-center justify-between mb-6">
            <div className="text-sm text-gray-600">
              تم العثور على <span className="font-semibold text-purple-600">{filteredInvestments.length}</span> استثمار
            </div>
            <div className="flex items-center gap-2">
              <span className="text-xs text-gray-600">ترتيب حسب:</span>
              <Select>
                <SelectTrigger className="h-8 w-32 text-xs">
                  <SelectValue placeholder="الأحدث" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="newest">الأحدث</SelectItem>
                  <SelectItem value="return-high">العائد: من الأعلى</SelectItem>
                  <SelectItem value="return-low">العائد: من الأقل</SelectItem>
                  <SelectItem value="rating">التقييم</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Investments Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredInvestments.map((investment) => (
              <InvestmentCard key={investment.id} investment={investment} />
            ))}
          </div>

          {/* No Results */}
          {filteredInvestments.length === 0 && (
            <div className="text-center py-12">
              <TrendingUp className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-gray-900 mb-2">لا توجد نتائج</h3>
              <p className="text-gray-600 mb-4">جرب تغيير معايير البحث أو الفلاتر</p>
              <Button 
                variant="outline" 
                onClick={() => {
                  setSearchTerm('');
                  setSelectedType('');
                  setSelectedRisk('');
                  setReturnRange([0, 20]);
                }}
              >
                مسح جميع الفلاتر
              </Button>
            </div>
          )}
        </div>
      </section>
    </div>
  );
};

export default Investments; 