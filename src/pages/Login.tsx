import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Building2, Eye, EyeOff, Phone } from "lucide-react";
import Navigation from '@/components/Navigation';
import { useAuth } from '@/contexts/AuthContext';
import { LoadingSpinner } from '@/components/ui/loading-spinner';
import { toast } from 'sonner';

const Login = () => {
  const [phoneNumber, setPhoneNumber] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const { login, isLoading, error, clearError } = useAuth();

  useEffect(() => {
    if (error) {
      toast.error(error);
      clearError();
    }
  }, [error, clearError]);

  const validateForm = () => {
    if (!phoneNumber.trim()) {
      toast.error("يرجى إدخال رقم الهاتف");
      return false;
    }

    if (phoneNumber.length < 10) {
      toast.error("يرجى إدخال رقم هاتف صحيح");
      return false;
    }

    if (!password) {
      toast.error("يرجى إدخال كلمة المرور");
      return false;
    }

    return true;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    try {
      await login({ phoneNumber: phoneNumber.trim(), password });
      toast.success("تم تسجيل الدخول بنجاح!");
    } catch (error) {
      // Error is handled by the context
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-blue-50 font-['Cairo',sans-serif]" dir="rtl">
      <Navigation />
      <div className="flex items-center justify-center min-h-screen py-12 px-4">
        <div className="w-full max-w-md">
          {/* Logo and Title */}
          <div className="text-center mb-8">
            <div className="flex items-center justify-center mb-4">
              <Building2 className="h-12 w-12 text-blue-600" />
            </div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">مرحباً بك مرة أخرى</h1>
            <p className="text-gray-600">سجل دخولك للوصول إلى حسابك</p>
          </div>
          {/* Login Form */}
          <Card className="shadow-lg">
            <CardContent className="p-6">
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">رقم الهاتف *</label>
                  <div className="relative">
                    <input
                      type="tel"
                      value={phoneNumber}
                      onChange={e => setPhoneNumber(e.target.value)}
                      className="w-full p-3 pr-10 rounded border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="0912345678"
                      required
                    />
                    <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">كلمة المرور *</label>
                  <div className="relative">
                    <input
                      type={showPassword ? "text" : "password"}
                      value={password}
                      onChange={e => setPassword(e.target.value)}
                      className="w-full p-3 pr-10 rounded border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="••••••••"
                      required
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                    >
                      {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                    </button>
                  </div>
                </div>
                <Button 
                  type="submit" 
                  disabled={isLoading}
                  className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded disabled:opacity-50"
                >
                  {isLoading ? (
                    <div className="flex items-center gap-2">
                      <LoadingSpinner size="sm" />
                      جاري تسجيل الدخول...
                    </div>
                  ) : (
                    'تسجيل الدخول'
                  )}
                </Button>
              </form>
            </CardContent>
          </Card>
          
          {/* Additional Info */}
          <div className="mt-6 text-center">
            <p className="text-sm text-gray-600">
              ليس لديك حساب؟{' '}
              <a href="/register" className="text-blue-600 hover:underline font-medium">
                إنشاء حساب جديد
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login; 