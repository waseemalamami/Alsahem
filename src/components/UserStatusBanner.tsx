import React from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { useAuth } from '@/contexts/AuthContext';
import { Link } from 'react-router-dom';
import { 
  User, 
  TrendingUp, 
  Shield, 
  AlertTriangle, 
  CheckCircle,
  ArrowRight,
  LogOut
} from 'lucide-react';

export const UserStatusBanner: React.FC = () => {
  const { user, isAuthenticated, isInvestor, logout } = useAuth();

  if (!isAuthenticated || !isInvestor) {
    return (
      <Card className="bg-gradient-to-r from-blue-50 to-purple-50 border-blue-200">
        <CardContent className="p-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <User className="h-5 w-5 text-blue-600" />
              <div>
                <h3 className="font-semibold text-gray-900">مرحباً بك في منصة السهم</h3>
                <p className="text-sm text-gray-600">سجل دخولك للوصول إلى جميع الميزات</p>
              </div>
            </div>
            <div className="flex gap-2">
              <Link to="/login">
                <Button size="sm" variant="outline">
                  تسجيل الدخول
                </Button>
              </Link>
              <Link to="/register">
                <Button size="sm">
                  إنشاء حساب
                  <ArrowRight className="mr-2 h-4 w-4" />
                </Button>
              </Link>
            </div>
          </div>
        </CardContent>
      </Card>
    );
  }

  const investor = user as any; // Type assertion for investor

  return (
    <Card className="bg-gradient-to-r from-green-50 to-blue-50 border-green-200">
      <CardContent className="p-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2">
              <TrendingUp className="h-5 w-5 text-green-600" />
              <div>
                <h3 className="font-semibold text-gray-900">مرحباً {investor.name}</h3>
                <div className="flex items-center gap-2 mt-1">
                  <Badge variant="secondary" className="text-xs">
                    مستثمر
                  </Badge>
                  {investor.isVerified && (
                    <Badge className="bg-green-100 text-green-700 border-green-200 text-xs">
                      <CheckCircle className="mr-1 h-3 w-3" />
                      موثق
                    </Badge>
                  )}
                  {investor.kycStatus === 'pending' && (
                    <Badge className="bg-yellow-100 text-yellow-700 border-yellow-200 text-xs">
                      <AlertTriangle className="mr-1 h-3 w-3" />
                      قيد المراجعة
                    </Badge>
                  )}
                </div>
              </div>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <div className="text-right">
              <p className="text-sm text-gray-600">إجمالي الاستثمار</p>
              <p className="font-semibold text-gray-900">
                {investor.portfolio?.totalInvested?.toLocaleString() || 0} د.ل
              </p>
            </div>
            <div className="flex gap-2">
              <Link to="/dashboard">
                <Button size="sm" variant="outline">
                  لوحة التحكم
                </Button>
              </Link>
              <Button size="sm" variant="outline" onClick={logout}>
                <LogOut className="mr-1 h-4 w-4" />
                خروج
              </Button>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}; 