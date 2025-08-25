import { useState, useEffect } from 'react';
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
  Coins,
  Target,
  RefreshCw
} from "lucide-react";
import Navigation from '@/components/Navigation';
import InvestmentCard from '@/components/InvestmentCard';
import { InvestmentService } from '@/services/investment.service';
import { Investment } from '@/types/api';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Skeleton } from '@/components/ui/skeleton';

const Investments = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedType, setSelectedType] = useState('');
  const [selectedRisk, setSelectedRisk] = useState('');
  const [returnRange, setReturnRange] = useState([0, 20]);
  const [showFilters, setShowFilters] = useState(false);
  const [investments, setInvestments] = useState<Investment[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Load data from backend
  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      setLoading(true);
      setError(null);
      
      console.log('🔍 Loading investments from backend...');
      const response = await InvestmentService.getInvestments();
      const investmentData = response.data || [];
      
      console.log('✅ Loaded investments:', investmentData.length);
      setInvestments(investmentData);
    } catch (err: any) {
      console.error('❌ Error loading investments:', err);
      setError(err.message || 'Failed to load investments');
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

  const filteredInvestments = investments.filter(investment => {
    const matchesSearch = investment.title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         investment.description?.toLowerCase().includes(searchTerm.toLowerCase());
    // For now, skip type and risk filtering since backend doesn't have these fields
    // const matchesType = !selectedType || investment.propertyType === selectedType;
    // const matchesRisk = !selectedRisk || investment.riskLevel === selectedRisk;
    // const matchesReturn = investment.expectedReturn >= returnRange[0] && investment.expectedReturn <= returnRange[1];
    
    return matchesSearch; // && matchesType && matchesRisk && matchesReturn;
  });

  return (
    <div className="min-h-screen bg-gray-50 font-['Cairo',sans-serif]" dir="rtl">
      <Navigation />
      
      {/* Header Section */}
      <section className="bg-gradient-to-br from-green-600 to-green-800 text-white py-8">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center mb-6">
            <h1 className="text-3xl font-bold mb-2">فرص الاستثمار العقاري</h1>
            <p className="text-green-100">استثمر في عقارات مميزة واحصل على عوائد مجزية</p>
          </div>
          
          {/* Search Bar */}
          <div className="max-w-2xl mx-auto">
            <div className="relative">
              <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <Input
                type="text"
                placeholder="ابحث عن فرصة استثمارية..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 pr-12 h-10 bg-white/10 border-white/20 text-white placeholder:text-green-200 focus:bg-white/20"
              />
              <Button 
                size="sm" 
                variant="outline" 
                className="absolute left-2 top-1/2 transform -translate-y-1/2 h-6 px-2 text-xs bg-white border-green-600 text-green-600 hover:bg-green-50 hover:text-green-700 hover:border-green-700"
                onClick={() => setShowFilters(!showFilters)}
              >
                <Filter className="h-3 w-3 ml-1" />
                فلاتر
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Filters Section */}
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
                  </SelectContent>
                </Select>
              </div>
              
              <div>
                <label className="text-xs font-medium text-gray-700 mb-1 block">مستوى المخاطر</label>
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
                <label className="text-xs font-medium text-gray-700 mb-1 block">العائد المتوقع (%)</label>
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

      {/* Investments Grid */}
      <section className="py-8">
        <div className="max-w-6xl mx-auto px-4">
          {/* Loading State */}
          {loading && (
            <div className="space-y-6">
              <div className="flex justify-between items-center">
                <Skeleton className="h-6 w-32" />
                <Skeleton className="h-8 w-32" />
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {[1, 2, 3, 4, 5, 6].map((i) => (
                  <div key={i} className="space-y-3">
                    <Skeleton className="h-48 w-full" />
                    <Skeleton className="h-4 w-3/4" />
                    <Skeleton className="h-4 w-1/2" />
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Error State */}
          {error && !loading && (
            <Alert>
              <AlertDescription>
                <div className="flex justify-between items-center">
                  <span>Error loading investments: {error}</span>
                  <Button onClick={loadData} variant="outline" size="sm">
                    <RefreshCw className="h-4 w-4 mr-2" />
                    Retry
                  </Button>
                </div>
              </AlertDescription>
            </Alert>
          )}

          {/* Results Header */}
          {!loading && !error && (
            <>
              <div className="flex items-center justify-between mb-6">
                <div className="text-sm text-gray-600">
                  تم العثور على <span className="font-semibold text-green-600">{filteredInvestments.length}</span> فرصة استثمارية
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
                      <SelectItem value="duration">المدة</SelectItem>
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
            </>
          )}
        </div>
      </section>
    </div>
  );
};

export default Investments; 