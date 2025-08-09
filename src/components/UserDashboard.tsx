import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { User } from "lucide-react";
import Navigation from '@/components/Navigation';
import InvestmentCard from '@/components/InvestmentCard';
import { useAuth } from '@/contexts/AuthContext';


const UserDashboard = () => {
  const { user, isAuthenticated, isInvestor } = useAuth();
  
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
  const investments = [
    { id: 1, title: "مشروع فيلات السكني الفاخرة", amount: 50000, status: "active", expectedReturn: 15.5 },
    { id: 2, title: "برج الأعمال المركزي", amount: 30000, status: "completed", expectedReturn: 12.3 },
    { id: 3, title: "مجمع تجاري سكني", amount: 100000, status: "active", expectedReturn: 18.7 },
  ];
  const totalInvested = investments.reduce((sum, inv) => sum + inv.amount, 0);
  const activeInvestments = investments.filter(inv => inv.status === 'active').length;
  const completedInvestments = investments.filter(inv => inv.status === 'completed').length;
  const avgReturn = (investments.reduce((sum, inv) => sum + inv.expectedReturn, 0) / investments.length).toFixed(1);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-blue-50 font-['Cairo',sans-serif]" dir="rtl">
      <Navigation />
      <div className="max-w-5xl mx-auto py-10 px-4">

        <div className="flex flex-col md:flex-row gap-8 mb-10 mt-8">
          {/* Profile Card */}
          <Card className="w-full md:w-1/3 flex-shrink-0">
            <CardHeader className="flex flex-col items-center">
              <div className="w-20 h-20 mb-4 bg-blue-100 rounded-full flex items-center justify-center">
                <User className="w-10 h-10 text-blue-600" />
              </div>
              <CardTitle className="text-xl font-bold text-blue-700 mb-1">{investor.name}</CardTitle>
              <p className="text-gray-500 text-sm mb-2">{investor.email}</p>
              <div className="flex gap-2 mb-2">
                <Badge className="bg-blue-100 text-blue-700 border-blue-200">
                  مستثمر
                </Badge>
                {investor.isVerified && (
                  <Badge className="bg-green-100 text-green-700 border-green-200">
                    موثق
                  </Badge>
                )}
                {investor.kycStatus === 'pending' && (
                  <Badge className="bg-yellow-100 text-yellow-700 border-yellow-200">
                    قيد المراجعة
                  </Badge>
                )}
              </div>
            </CardHeader>
            <CardContent className="flex flex-col items-center mt-4">
              <Button variant="outline" className="w-full" asChild>
                <a href="/investments">استكشاف الاستثمارات</a>
              </Button>
            </CardContent>
          </Card>
          {/* Dashboard Tabs */}
          <div className="w-full md:w-2/3">
                         <Tabs defaultValue="investments" className="w-full">
               <TabsList className="grid grid-cols-1 w-full mb-4">
                 <TabsTrigger value="investments">استثماراتي</TabsTrigger>
               </TabsList>
              <TabsContent value="investments">
                {/* Investment Summary */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                  <div className="text-center">
                    <div className="text-lg font-bold text-blue-600">
                      {investor.portfolio?.totalInvested?.toLocaleString() || 0} د.ل
                    </div>
                    <div className="text-xs text-gray-600">إجمالي الاستثمار</div>
                  </div>
                  <div className="text-center">
                    <div className="text-lg font-bold text-green-600">
                      {investor.portfolio?.activeInvestments || 0}
                    </div>
                    <div className="text-xs text-gray-600">استثمار نشط</div>
                  </div>
                  <div className="text-center">
                    <div className="text-lg font-bold text-purple-600">
                      {investor.portfolio?.completedInvestments || 0}
                    </div>
                    <div className="text-xs text-gray-600">استثمار مكتمل</div>
                  </div>
                  <div className="text-center">
                    <div className="text-lg font-bold text-orange-600">
                      {investor.portfolio?.averageReturn || 0}%
                    </div>
                    <div className="text-xs text-gray-600">متوسط العائد المتوقع</div>
                  </div>
                </div>
                {/* Additional Investment Cards */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                  {/* Latest Investment */}
                  {investments.length > 0 && (
                    <Card>
                      <CardHeader>
                        <CardTitle className="text-base text-blue-700">أحدث استثمار</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="font-semibold text-gray-800 mb-1">{investments[investments.length-1].title}</div>
                        <div className="text-sm text-gray-600">المبلغ: {investments[investments.length-1].amount.toLocaleString()} د.ل</div>
                        <div className="text-xs text-gray-500">العائد المتوقع: {investments[investments.length-1].expectedReturn}%</div>
                      </CardContent>
                    </Card>
                  )}
                  {/* Highest Expected Return */}
                  {investments.length > 0 && (
                    <Card>
                      <CardHeader>
                        <CardTitle className="text-base text-green-700">أعلى عائد متوقع</CardTitle>
                      </CardHeader>
                      <CardContent>
                        {(() => {
                          const maxInv = investments.reduce((max, inv) => inv.expectedReturn > max.expectedReturn ? inv : max, investments[0]);
                          return (
                            <>
                              <div className="font-semibold text-gray-800 mb-1">{maxInv.title}</div>
                              <div className="text-sm text-gray-600">العائد المتوقع: {maxInv.expectedReturn}%</div>
                              <div className="text-xs text-gray-500">المبلغ: {maxInv.amount.toLocaleString()} د.ل</div>
                            </>
                          );
                        })()}
                      </CardContent>
                    </Card>
                  )}
                  {/* Most Active Investment (by amount) */}
                  {investments.length > 0 && (
                    <Card>
                      <CardHeader>
                        <CardTitle className="text-base text-purple-700">أكثر استثمار نشط</CardTitle>
                      </CardHeader>
                      <CardContent>
                        {(() => {
                          const activeInvs = investments.filter(inv => inv.status === 'active');
                          if (activeInvs.length === 0) return <div className="text-gray-500 text-sm">لا يوجد استثمار نشط</div>;
                          const maxActive = activeInvs.reduce((max, inv) => inv.amount > max.amount ? inv : max, activeInvs[0]);
                          return (
                            <>
                              <div className="font-semibold text-gray-800 mb-1">{maxActive.title}</div>
                              <div className="text-sm text-gray-600">المبلغ: {maxActive.amount.toLocaleString()} د.ل</div>
                              <div className="text-xs text-gray-500">العائد المتوقع: {maxActive.expectedReturn}%</div>
                            </>
                          );
                        })()}
                      </CardContent>
                    </Card>
                  )}
                </div>
                {/* Investment Table */}
                <div className="overflow-x-auto">
                  <table className="min-w-full bg-white rounded-lg shadow">
                    <thead>
                      <tr className="bg-blue-100 text-blue-700 text-sm">
                        <th className="py-2 px-3 text-right">اسم الاستثمار</th>
                        <th className="py-2 px-3 text-right">المبلغ المستثمر</th>
                        <th className="py-2 px-3 text-right">الحالة</th>
                        <th className="py-2 px-3 text-right">العائد المتوقع</th>
                      </tr>
                    </thead>
                    <tbody>
                      {investments.map(inv => (
                        <tr key={inv.id} className="border-b last:border-b-0 hover:bg-blue-50">
                          <td className="py-2 px-3 font-semibold text-gray-800">{inv.title}</td>
                          <td className="py-2 px-3">{inv.amount.toLocaleString()} د.ل</td>
                          <td className="py-2 px-3">
                            <span className={`inline-block px-2 py-0.5 rounded text-xs font-semibold ${inv.status === 'active' ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-500'}`}>
                              {inv.status === 'active' ? 'نشط' : 'مكتمل'}
                            </span>
                          </td>
                          <td className="py-2 px-3">{inv.expectedReturn}%</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                             </TabsContent>
             </Tabs>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserDashboard; 