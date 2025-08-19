import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { User, TrendingUp, TrendingDown, Coins, Building2, Calendar, Target, Eye, Download, Star, ChevronLeft, ChevronRight, Shield, BarChart3, FileText } from "lucide-react";
import Navigation from '@/components/Navigation';
import InvestmentCard from '@/components/InvestmentCard';
import { useAuth } from '@/contexts/AuthContext';
import Wallet from './Wallet';

const UserDashboard = () => {
  const { user, isAuthenticated, isInvestor } = useAuth();
  const [selectedInvestment, setSelectedInvestment] = useState<number | null>(null);
  const [sellQuantity, setSellQuantity] = useState<number>(1);
  
  if (!isAuthenticated || !isInvestor) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-blue-50 font-['Cairo',sans-serif]" dir="rtl">
        <Navigation />
        <div className="max-w-5xl mx-auto py-10 px-4">
          <div className="text-center">
            <h1 className="text-2xl font-bold text-gray-900 mb-4">يجب تسجيل الدخول للوصول إلى لوحة التحكم</h1>
            <p className="text-gray-600 mb-6">يرجى تسجيل الدخول أو إنشاء حساب جديد</p>
            <div className="flex gap-4 justify-center">
              <Button asChild>
                <a href="/login">تسجيل الدخول</a>
              </Button>
              <Button variant="outline" asChild>
                <a href="/register">إنشاء حساب</a>
              </Button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  const investor = user as any; // Type assertion for investor
  
  // Enhanced investment data with stock information
  const investments = [
    { 
      id: 1, 
      title: "مشروع فيلات السكني الفاخرة", 
      amount: 50000, 
      status: "active", 
      expectedReturn: 15.5,
      sharesOwned: 25,
      totalShares: 100,
      sharePrice: 2000,
      propertyType: "فيلا",
      location: "طرابلس",
      startDate: "2024-01-01",
      endDate: "2026-03-15",
      currentValue: 55000,
      documents: [
        { name: "عقد الاستثمار", size: "2.5 MB" },
        { name: "الخرائط المعمارية", size: "1.8 MB" },
        { name: "التصاريح الرسمية", size: "3.2 MB" }
      ]
    },
    { 
      id: 2, 
      title: "برج الأعمال المركزي", 
      amount: 30000, 
      status: "completed", 
      expectedReturn: 12.3,
      sharesOwned: 15,
      totalShares: 80,
      sharePrice: 2000,
      propertyType: "برج تجاري",
      location: "بنغازي",
      startDate: "2023-06-01",
      endDate: "2025-08-30",
      currentValue: 35000,
      documents: [
        { name: "شهادة الإنجاز", size: "1.5 MB" },
        { name: "تقرير الربحية", size: "2.1 MB" }
      ]
    },
    { 
      id: 3, 
      title: "مجمع تجاري سكني", 
      amount: 100000, 
      status: "active", 
      expectedReturn: 18.7,
      sharesOwned: 50,
      totalShares: 200,
      sharePrice: 2000,
      propertyType: "مجمع متكامل",
      location: "مصراتة",
      startDate: "2024-03-01",
      endDate: "2027-06-30",
      currentValue: 110000,
      documents: [
        { name: "دراسة الجدوى", size: "4.2 MB" },
        { name: "التراخيص البلدية", size: "2.8 MB" },
        { name: "التصميم النهائي", size: "5.1 MB" }
      ]
    },
  ];

  const totalInvested = investments.reduce((sum, inv) => sum + inv.amount, 0);
  const activeInvestments = investments.filter(inv => inv.status === 'active').length;
  const completedInvestments = investments.filter(inv => inv.status === 'completed').length;
  const avgReturn = (investments.reduce((sum, inv) => sum + inv.expectedReturn, 0) / investments.length).toFixed(1);
  const totalCurrentValue = investments.reduce((sum, inv) => sum + inv.currentValue, 0);
  const totalProfit = totalCurrentValue - totalInvested;

  const formatCurrency = (amount: number) => {
    return `${amount.toLocaleString('en-US')} د.ل`;
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('ar-LY');
  };

  const handleSellShares = (investmentId: number) => {
    const investment = investments.find(inv => inv.id === investmentId);
    if (investment && sellQuantity > 0 && sellQuantity <= investment.sharesOwned) {
      const totalValue = sellQuantity * investment.sharePrice;
      alert(`تم إرسال طلب بيع ${sellQuantity} سهم من مشروع "${investment.title}" بقيمة ${formatCurrency(totalValue)}. سيتم التواصل معك خلال 24 ساعة لتأكيد عملية البيع.`);
      setSelectedInvestment(null);
      setSellQuantity(1);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-blue-50 font-['Cairo',sans-serif]" dir="rtl">
      <Navigation />
      <div className="max-w-7xl mx-auto py-10 px-4">

        <div className="flex flex-col lg:flex-row gap-8 mb-10 mt-8">
          {/* Profile Card */}
          <Card className="w-full lg:w-1/3 flex-shrink-0 border-2 border-blue-100 shadow-lg">
            <CardHeader className="flex flex-col items-center bg-gradient-to-br from-blue-50 to-blue-100 rounded-t-2xl">
              <div className="w-24 h-24 mb-4 bg-blue-200 rounded-full flex items-center justify-center shadow-lg">
                <User className="w-12 h-12 text-blue-700" />
              </div>
              <CardTitle className="text-2xl font-bold text-blue-800 mb-2">{investor.name}</CardTitle>
              <p className="text-gray-600 text-sm mb-3">{investor.email}</p>
              <div className="flex gap-2 mb-3">
                <Badge className="bg-blue-200 text-blue-800 border-2 border-blue-300 rounded-xl px-3 py-1 font-semibold">
                  مستثمر
                </Badge>
                {investor.isVerified && (
                  <Badge className="bg-green-200 text-green-800 border-2 border-green-300 rounded-xl px-3 py-1 font-semibold">
                    موثق
                  </Badge>
                )}
                {investor.kycStatus === 'pending' && (
                  <Badge className="bg-yellow-200 text-yellow-800 border-2 border-yellow-300 rounded-xl px-3 py-1 font-semibold">
                    قيد المراجعة
                  </Badge>
                )}
              </div>
            </CardHeader>
            <CardContent className="flex flex-col items-center mt-4 p-6">
              <Button variant="outline" className="w-full border-2 border-blue-300 text-blue-600 hover:bg-blue-50 rounded-2xl font-semibold h-12 mb-4" asChild>
                <a href="/investments">استكشاف الاستثمارات</a>
              </Button>
              
              {/* Wallet Summary */}
              <div className="w-full p-4 bg-gradient-to-br from-green-50 to-green-100 rounded-2xl border-2 border-green-200">
                <div className="text-center">
                  <div className="text-2xl font-bold text-green-700 mb-1">
                    {formatCurrency(25000)}
                  </div>
                  <div className="text-sm text-green-600 font-semibold">الرصيد المتاح</div>
                  <div className="text-xs text-green-500 mt-1">في المحفظة الرقمية</div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Dashboard Tabs */}
          <div className="w-full lg:w-2/3">
            <Tabs defaultValue="investments" className="w-full">
              <TabsList className="grid grid-cols-2 w-full mb-6 bg-white border-2 border-blue-100 rounded-2xl p-1">
                <TabsTrigger value="investments" className="rounded-xl data-[state=active]:bg-blue-100 data-[state=active]:text-blue-800 font-semibold">
                  إستثماراتي
                </TabsTrigger>
                <TabsTrigger value="wallet" className="rounded-xl data-[state=active]:bg-blue-100 data-[state=active]:text-blue-800 font-semibold">
                  المحفظة الرقمية
                </TabsTrigger>
              </TabsList>

              <TabsContent value="investments" className="space-y-6">
                {/* Investment Summary Cards */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                  <Card className="border-2 border-blue-100 shadow-lg hover:shadow-xl transition-all duration-300">
                    <CardContent className="p-4 text-center">
                      <div className="text-2xl font-bold text-blue-600 mb-1">
                        {formatCurrency(totalInvested)}
                      </div>
                      <div className="text-xs text-gray-600">إجمالي الاستثمار</div>
                    </CardContent>
                  </Card>
                  <Card className="border-2 border-green-100 shadow-lg hover:shadow-xl transition-all duration-300">
                    <CardContent className="p-4 text-center">
                      <div className="text-2xl font-bold text-green-600 mb-1">
                        {activeInvestments}
                      </div>
                      <div className="text-xs text-gray-600">استثمار نشط</div>
                    </CardContent>
                  </Card>
                  <Card className="border-2 border-purple-100 shadow-lg hover:shadow-xl transition-all duration-300">
                    <CardContent className="p-4 text-center">
                      <div className="text-2xl font-bold text-purple-600 mb-1">
                        {completedInvestments}
                      </div>
                      <div className="text-xs text-gray-600">استثمار مكتمل</div>
                    </CardContent>
                  </Card>
                  <Card className="border-2 border-orange-100 shadow-lg hover:shadow-xl transition-all duration-300">
                    <CardContent className="p-4 text-center">
                      <div className="text-2xl font-bold text-orange-600 mb-1">
                        {avgReturn}%
                      </div>
                      <div className="text-xs text-gray-600">متوسط العائد</div>
                    </CardContent>
                  </Card>
                </div>

                {/* Profit/Loss Summary */}
                <Card className="border-2 border-indigo-100 shadow-lg">
                  <CardHeader className="bg-gradient-to-r from-indigo-50 to-indigo-100 rounded-t-2xl">
                    <CardTitle className="text-lg text-indigo-800 flex items-center gap-2">
                      <TrendingUp className="h-5 w-5 text-indigo-600" />
                      ملخص الأرباح والخسائر
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="p-6">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div className="text-center p-4 bg-white rounded-2xl border-2 border-indigo-100">
                        <div className="text-2xl font-bold text-indigo-600 mb-1">
                          {formatCurrency(totalCurrentValue)}
                        </div>
                        <div className="text-sm text-indigo-700 font-semibold">القيمة الحالية</div>
                      </div>
                      <div className="text-center p-4 bg-white rounded-2xl border-2 border-green-100">
                        <div className="text-2xl font-bold text-green-600 mb-1">
                          {formatCurrency(totalProfit)}
                        </div>
                        <div className="text-sm text-green-700 font-semibold">إجمالي الأرباح</div>
                      </div>
                      <div className="text-center p-4 bg-white rounded-2xl border-2 border-blue-100">
                        <div className="text-2xl font-bold text-blue-600 mb-1">
                          {((totalProfit / totalInvested) * 100).toFixed(1)}%
                        </div>
                        <div className="text-sm text-blue-700 font-semibold">نسبة الربح</div>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Detailed Investment Table */}
                <Card className="border-2 border-gray-100 shadow-lg">
                  <CardHeader className="bg-gradient-to-r from-gray-50 to-gray-100 rounded-t-2xl">
                    <CardTitle className="text-lg text-gray-800 flex items-center gap-2">
                      <Building2 className="h-5 w-5 text-gray-600" />
                      تفاصيل الاستثمارات
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="p-6">
                    <div className="space-y-4">
                      {investments.map((investment) => (
                        <div key={investment.id} className="border-2 border-gray-200 rounded-2xl p-6 hover:shadow-lg transition-all duration-300">
                          {/* Investment Header */}
                          <div className="flex flex-col md:flex-row md:items-center justify-between mb-4">
                            <div className="flex-1">
                              <h3 className="text-xl font-bold text-gray-800 mb-2">{investment.title}</h3>
                              <div className="flex flex-wrap gap-2 mb-3">
                                <Badge className={`rounded-xl px-3 py-1 font-semibold ${
                                  investment.status === 'active' ? 'bg-green-200 text-green-800 border-2 border-green-300' : 
                                  'bg-gray-200 text-gray-800 border-2 border-gray-300'
                                }`}>
                                  {investment.status === 'active' ? 'نشط' : 'مكتمل'}
                                </Badge>
                                <Badge className="bg-blue-200 text-blue-800 border-2 border-blue-300 rounded-xl px-3 py-1 font-semibold">
                                  {investment.propertyType}
                                </Badge>
                                <Badge className="bg-purple-200 text-purple-800 border-2 border-purple-300 rounded-xl px-3 py-1 font-semibold">
                                  {investment.location}
                                </Badge>
                              </div>
                            </div>
                            <div className="text-left md:text-right">
                              <div className="text-2xl font-bold text-blue-600 mb-1">
                                {formatCurrency(investment.currentValue)}
                              </div>
                              <div className="text-sm text-gray-600">القيمة الحالية</div>
                            </div>
                          </div>

                          {/* Investment Details Grid */}
                          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
                            <div className="text-center p-3 bg-blue-50 rounded-xl border border-blue-200">
                              <div className="text-lg font-bold text-blue-600 mb-1">
                                {investment.sharesOwned}
                              </div>
                              <div className="text-xs text-blue-700 font-semibold">الأسهم المملوكة</div>
                            </div>
                            <div className="text-center p-3 bg-green-50 rounded-xl border border-green-200">
                              <div className="text-lg font-bold text-green-600 mb-1">
                                {formatCurrency(investment.sharePrice)}
                              </div>
                              <div className="text-xs text-green-700 font-semibold">سعر السهم</div>
                            </div>
                            <div className="text-center p-3 bg-purple-50 rounded-xl border border-purple-200">
                              <div className="text-lg font-bold text-purple-600 mb-1">
                                {investment.expectedReturn}%
                              </div>
                              <div className="text-xs text-purple-700 font-semibold">العائد المتوقع</div>
                            </div>
                            <div className="text-center p-3 bg-orange-50 rounded-xl border border-orange-200">
                              <div className="text-lg font-bold text-orange-600 mb-1">
                                {formatDate(investment.endDate)}
                              </div>
                              <div className="text-xs text-orange-700 font-semibold">تاريخ الانتهاء</div>
                            </div>
                          </div>

                          {/* Action Buttons */}
                          <div className="flex flex-col sm:flex-row gap-3">
                            <Button 
                              variant="outline" 
                              className="flex-1 border-2 border-blue-300 text-blue-600 hover:bg-blue-50 rounded-2xl font-semibold h-11"
                              onClick={() => setSelectedInvestment(investment.id)}
                            >
                              <Eye className="h-4 w-4 ml-2" />
                              عرض التفاصيل
                            </Button>
                            
                            {investment.status === 'active' && (
                              <Button 
                                variant="outline" 
                                className="flex-1 border-2 border-red-300 text-red-600 hover:bg-red-50 rounded-2xl font-semibold h-11"
                                onClick={() => setSelectedInvestment(investment.id)}
                              >
                                <TrendingDown className="h-4 w-4 ml-2" />
                                عرض أسهم للبيع
                              </Button>
                            )}

                            <Button 
                              variant="outline" 
                              className="flex-1 border-2 border-indigo-300 text-indigo-600 hover:bg-indigo-50 rounded-2xl font-semibold h-11"
                            >
                              <Download className="h-4 w-4 ml-2" />
                              المستندات
                            </Button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="wallet" className="space-y-6">
                <Wallet />
              </TabsContent>
            </Tabs>
          </div>
        </div>

        {/* Sell Shares Modal */}
        {selectedInvestment && (
          <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 z-50">
            <Card className="w-full max-w-sm border-0 shadow-2xl bg-white rounded-3xl">
              <CardHeader className="bg-gradient-to-r from-red-500 to-red-600 text-white rounded-t-3xl pb-4">
                <CardTitle className="text-lg flex items-center gap-2 justify-center">
                  <TrendingDown className="h-5 w-5" />
                  عرض أسهم للبيع
                </CardTitle>
              </CardHeader>
              <CardContent className="p-6">
                {(() => {
                  const investment = investments.find(inv => inv.id === selectedInvestment);
                  if (!investment) return null;
                  
                  return (
                    <div className="space-y-4">
                      {/* Investment Info - Compact */}
                      <div className="text-center p-4 bg-gradient-to-br from-red-50 to-red-100 rounded-3xl border border-red-200">
                        <div className="text-2xl font-bold text-red-600 mb-1">
                          {investment.title}
                        </div>
                        <div className="text-sm text-red-700 mb-3">{investment.location}</div>
                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <div className="text-xl font-bold text-red-600 mb-1">
                              {investment.sharesOwned}
                            </div>
                            <div className="text-xs text-red-700">الأسهم المملوكة</div>
                          </div>
                          <div>
                            <div className="text-lg font-bold text-gray-800 mb-1">
                              {formatCurrency(investment.sharesOwned * investment.sharePrice)}
                            </div>
                            <div className="text-xs text-gray-600">القيمة الإجمالية</div>
                          </div>
                        </div>
                      </div>

                      {/* Sell Form - Compact */}
                      <div className="space-y-3">
                        {/* Quantity Input */}
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2 text-center">
                            عدد الأسهم للبيع
                          </label>
                          <div className="flex items-center gap-2">
                            <input
                              type="number"
                              min="1"
                              max={investment.sharesOwned}
                              value={sellQuantity}
                              onChange={(e) => setSellQuantity(Number(e.target.value))}
                              className="flex-1 p-3 border-2 border-red-200 rounded-3xl focus:border-red-400 focus:outline-none text-center text-lg font-semibold bg-white"
                              placeholder="0"
                            />
                            <span className="text-sm text-gray-600 font-medium">سهم</span>
                          </div>
                        </div>

                        {/* Price and Total - Side by Side */}
                        <div className="grid grid-cols-2 gap-3">
                          <div className="p-3 bg-gray-50 rounded-3xl text-center border border-gray-200">
                            <div className="text-sm text-gray-600 mb-1">سعر السهم</div>
                            <div className="text-lg font-bold text-gray-700">
                              {formatCurrency(investment.sharePrice)}
                            </div>
                          </div>
                          <div className="p-3 bg-red-50 rounded-3xl text-center border-2 border-red-200">
                            <div className="text-sm text-red-600 mb-1">إجمالي البيع</div>
                            <div className="text-lg font-bold text-red-700">
                              {formatCurrency(sellQuantity * investment.sharePrice)}
                            </div>
                          </div>
                        </div>

                        {/* Action Buttons */}
                        <div className="flex gap-3 pt-2">
                          <Button 
                            className="flex-1 bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-[1.02] rounded-3xl h-11 font-bold"
                            onClick={() => handleSellShares(investment.id)}
                          >
                            <TrendingDown className="h-4 w-4 ml-2" />
                            تأكيد البيع
                          </Button>
                          <Button 
                            variant="outline" 
                            className="flex-1 border-2 border-gray-300 text-gray-600 hover:bg-gray-50 rounded-3xl font-semibold h-11"
                            onClick={() => setSelectedInvestment(null)}
                          >
                            إلغاء
                          </Button>
                        </div>

                        {/* Info Text - Compact */}
                        <div className="text-center p-3 bg-blue-50 rounded-3xl border border-blue-200">
                          <p className="text-xs text-blue-700">
                            💡 سيتم مراجعة طلبك خلال 24 ساعة
                          </p>
                        </div>
                      </div>
                    </div>
                  );
                })()}
              </CardContent>
            </Card>
          </div>
        )}
      </div>
    </div>
  );
};

export default UserDashboard; 