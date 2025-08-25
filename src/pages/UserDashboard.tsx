import React, { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { 
  TrendingUp, 
  Users, 
  Building2, 
  Target, 
  Star, 
  ArrowRight,
  CheckCircle,
  Shield,
  Zap,
  Award,
  MapPin,
  Phone,
  Mail,
  Calendar,
  Coins,
  RefreshCw,
  User,
  Settings,
  Bell,
  LogOut
} from "lucide-react";
import Navigation from '@/components/Navigation';
import { useAuth } from '@/contexts/AuthContext';
import { Link } from 'react-router-dom';
import { UserService } from '@/services/user.service';
import { UserInvestment } from '@/types/api';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Skeleton } from '@/components/ui/skeleton';

const UserDashboard = () => {
  const { isAuthenticated, isInvestor, user, logout } = useAuth();
  const [userProfile, setUserProfile] = useState<any>(null);
  const [userInvestments, setUserInvestments] = useState<UserInvestment[]>([]);
  const [portfolioSummary, setPortfolioSummary] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Load user data from backend
  useEffect(() => {
    if (isAuthenticated) {
      loadData();
    } else {
      setLoading(false);
    }
  }, [isAuthenticated]);

  const loadData = async () => {
    try {
      setLoading(true);
      setError(null);
      
      console.log('🔍 Loading user dashboard data...');
      
      // Load user data in parallel
      const [profileResult, investmentsResult, summaryResult] = await Promise.all([
        UserService.getUserProfile(),
        UserService.getUserInvestments(),
        UserService.getPortfolioSummary(),
      ]);

      setUserProfile(profileResult);
      setUserInvestments(investmentsResult);
      setPortfolioSummary(summaryResult);

      console.log('✅ User dashboard data loaded successfully:', {
        profile: !!profileResult,
        investments: investmentsResult.length,
        summary: summaryResult,
      });
    } catch (err: any) {
      console.error('❌ Error loading user dashboard data:', err);
      setError(err.message || 'Failed to load user dashboard data');
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
    return new Date(dateString).toLocaleDateString('ar-SA', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  // If not authenticated, show login prompt
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-gray-50 font-['Cairo',sans-serif]" dir="rtl">
        <Navigation />
        <div className="max-w-6xl mx-auto px-4 py-8">
          <Card className="max-w-md mx-auto">
            <CardHeader className="text-center">
              <CardTitle>تسجيل الدخول مطلوب</CardTitle>
            </CardHeader>
            <CardContent className="text-center space-y-4">
              <p className="text-gray-600">يجب تسجيل الدخول لعرض لوحة التحكم الخاصة بك</p>
              <div className="flex gap-2 justify-center">
                <Link to="/login">
                  <Button>تسجيل الدخول</Button>
                </Link>
                <Link to="/register">
                  <Button variant="outline">إنشاء حساب</Button>
                </Link>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 font-['Cairo',sans-serif]" dir="rtl">
      <Navigation />
      
      {/* Header Section */}
      <section className="bg-gradient-to-br from-purple-600 to-purple-800 text-white py-8">
        <div className="max-w-6xl mx-auto px-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold mb-2">لوحة التحكم</h1>
              <p className="text-purple-100">مرحباً بك في منصة السهم العقارية</p>
            </div>
            <div className="flex items-center gap-4">
              <Button variant="outline" size="sm" className="bg-white/10 border-white/20 text-white hover:bg-white/20">
                <Settings className="h-4 w-4 ml-2" />
                الإعدادات
              </Button>
              <Button variant="outline" size="sm" className="bg-white/10 border-white/20 text-white hover:bg-white/20">
                <Bell className="h-4 w-4 ml-2" />
                الإشعارات
              </Button>
            </div>
          </div>
        </div>
      </section>

      <div className="max-w-6xl mx-auto px-4 py-8">
        {/* Loading State */}
        {loading && (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {[1, 2, 3].map((i) => (
                <Card key={i}>
                  <CardHeader>
                    <Skeleton className="h-6 w-32" />
                  </CardHeader>
                  <CardContent>
                    <Skeleton className="h-8 w-full mb-2" />
                    <Skeleton className="h-4 w-3/4" />
                  </CardContent>
                </Card>
              ))}
            </div>
            <Card>
              <CardHeader>
                <Skeleton className="h-6 w-48" />
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {[1, 2, 3].map((i) => (
                    <div key={i} className="flex items-center space-x-4">
                      <Skeleton className="h-12 w-12 rounded-full" />
                      <div className="space-y-2 flex-1">
                        <Skeleton className="h-4 w-3/4" />
                        <Skeleton className="h-4 w-1/2" />
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        {/* Error State */}
        {error && !loading && (
          <Alert>
            <AlertDescription>
              <div className="flex justify-between items-center">
                <span>Error loading dashboard: {error}</span>
                <Button onClick={loadData} variant="outline" size="sm">
                  <RefreshCw className="h-4 w-4 ml-2" />
                  Retry
                </Button>
              </div>
            </AlertDescription>
          </Alert>
        )}

        {/* Dashboard Content */}
        {!loading && !error && (
          <div className="space-y-6">
            {/* User Profile Section */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <User className="h-5 w-5" />
                  الملف الشخصي
                </CardTitle>
              </CardHeader>
              <CardContent>
                {userProfile ? (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-4">
                      <div>
                        <label className="text-sm font-medium text-gray-700">الاسم</label>
                        <div className="text-lg font-semibold text-gray-900">{userProfile.name}</div>
                      </div>
                      <div>
                        <label className="text-sm font-medium text-gray-700">البريد الإلكتروني</label>
                        <div className="text-lg font-semibold text-gray-900">{userProfile.email}</div>
                      </div>
                      <div>
                        <label className="text-sm font-medium text-gray-700">رقم الهاتف</label>
                        <div className="text-lg font-semibold text-gray-900">{userProfile.phoneNumber}</div>
                      </div>
                    </div>
                    <div className="space-y-4">
                      <div>
                        <label className="text-sm font-medium text-gray-700">نوع المستخدم</label>
                        <div className="text-lg font-semibold text-gray-900">{userProfile.role}</div>
                      </div>
                      <div>
                        <label className="text-sm font-medium text-gray-700">حالة الحساب</label>
                        <Badge variant={userProfile.isVerified ? "default" : "secondary"}>
                          {userProfile.isVerified ? "مفعل" : "غير مفعل"}
                        </Badge>
                      </div>
                    </div>
                  </div>
                ) : (
                  <Alert>
                    <AlertDescription>
                      <strong>لا يمكن تحميل الملف الشخصي.</strong> يرجى المحاولة مرة أخرى.
                    </AlertDescription>
                  </Alert>
                )}
              </CardContent>
            </Card>

            {/* Portfolio Summary Section */}
            {portfolioSummary && (
              <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                <Card>
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm font-medium text-gray-600">إجمالي الاستثمارات</p>
                        <p className="text-2xl font-bold text-blue-600">{portfolioSummary.totalInvestments}</p>
                      </div>
                      <Target className="h-8 w-8 text-blue-600" />
                    </div>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm font-medium text-gray-600">إجمالي القيمة</p>
                        <p className="text-2xl font-bold text-green-600">{formatCurrency(portfolioSummary.totalValue)}</p>
                      </div>
                      <Coins className="h-8 w-8 text-green-600" />
                    </div>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm font-medium text-gray-600">إجمالي الأسهم</p>
                        <p className="text-2xl font-bold text-purple-600">{portfolioSummary.totalShares}</p>
                      </div>
                      <TrendingUp className="h-8 w-8 text-purple-600" />
                    </div>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm font-medium text-gray-600">الاستثمارات النشطة</p>
                        <p className="text-2xl font-bold text-orange-600">{portfolioSummary.activeInvestments}</p>
                      </div>
                      <CheckCircle className="h-8 w-8 text-orange-600" />
                    </div>
                  </CardContent>
                </Card>
              </div>
            )}

            {/* User Investments Section */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Building2 className="h-5 w-5" />
                  استثماراتي
                </CardTitle>
              </CardHeader>
              <CardContent>
                {userInvestments.length === 0 ? (
                  <div className="text-center py-8">
                    <Building2 className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">لا توجد استثمارات</h3>
                    <p className="text-gray-600 mb-4">ابدأ رحلتك الاستثمارية مع منصة السهم</p>
                    <Link to="/investments">
                      <Button>
                        عرض الاستثمارات المتاحة
                        <ArrowRight className="h-4 w-4 mr-2" />
                      </Button>
                    </Link>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {userInvestments.map((investment) => (
                      <div
                        key={investment.id}
                        className="border rounded-lg p-4 hover:shadow-md transition-shadow"
                      >
                        <div className="flex justify-between items-center">
                          <div>
                            <div className="font-medium">استثمار #{investment.investmentId}</div>
                            <div className="text-sm text-gray-600">
                              {investment.shares} أسهم • {formatCurrency(investment.amount || 0)}
                            </div>
                          </div>
                          <Badge variant={investment.status === 'active' ? 'default' : 'secondary'}>
                            {investment.status || 'غير محدد'}
                          </Badge>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Quick Actions */}
            <Card>
              <CardHeader>
                <CardTitle>إجراءات سريعة</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <Link to="/investments">
                    <Button variant="outline" className="w-full h-16 flex flex-col gap-2">
                      <Target className="h-5 w-5" />
                      <span>عرض الاستثمارات</span>
                    </Button>
                  </Link>
                  {/* Properties link hidden for now - focusing on investments */}
                  {/* <Link to="/properties">
                    <Button variant="outline" className="w-full h-16 flex flex-col gap-2">
                      <Building2 className="h-5 w-5" />
                      <span>عرض العقارات</span>
                    </Button>
                  </Link> */}
                  <Button variant="outline" className="w-full h-16 flex flex-col gap-2" onClick={logout}>
                    <LogOut className="h-5 w-5" />
                    <span>تسجيل الخروج</span>
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        )}
      </div>
    </div>
  );
};

export default UserDashboard;
