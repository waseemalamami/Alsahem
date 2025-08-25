import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Building2, Eye, EyeOff, User, Mail, Lock, Phone } from "lucide-react";
import Navigation from '@/components/Navigation';
import { useAuth } from '@/contexts/AuthContext';
import { LoadingSpinner } from '@/components/ui/loading-spinner';
import { toast } from 'sonner';

const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phone, setPhone] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [agreeToTerms, setAgreeToTerms] = useState(false);
  const { register, isLoading, error, clearError } = useAuth();

  useEffect(() => {
    if (error) {
      toast.error(error);
      clearError();
    }
  }, [error, clearError]);

  const validateForm = () => {
    if (!name.trim()) {
      toast.error("يرجى إدخال الاسم الكامل");
      return false;
    }

    if (!email.trim()) {
      toast.error("يرجى إدخال البريد الإلكتروني");
      return false;
    }

    if (!email.includes('@')) {
      toast.error("يرجى إدخال بريد إلكتروني صحيح");
      return false;
    }

    if (!phone.trim()) {
      toast.error("يرجى إدخال رقم الهاتف");
      return false;
    }

    if (phone.length < 10) {
      toast.error("يرجى إدخال رقم هاتف صحيح");
      return false;
    }

    if (!password) {
      toast.error("يرجى إدخال كلمة المرور");
      return false;
    }

    if (password.length < 6) {
      toast.error("كلمة المرور يجب أن تكون 6 أحرف على الأقل");
      return false;
    }

    if (!agreeToTerms) {
      toast.error("يجب الموافقة على الشروط والأحكام");
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
      await register({ 
        name: name.trim(), 
        email: email.trim(), 
        password, 
        phone: phone.trim(), 
        agreeToTerms 
      });
      toast.success("تم إنشاء الحساب بنجاح!");
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
            <h1 className="text-3xl font-bold text-gray-900 mb-2">إنشاء حساب جديد</h1>
            <p className="text-gray-600">سجل بياناتك للانضمام إلى منصة السهم</p>
          </div>
          
          {/* Register Form */}
          <Card className="shadow-lg">
            <CardContent className="p-6">
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">الاسم الكامل *</label>
                  <div className="relative">
                    <input
                      type="text"
                      value={name}
                      onChange={e => setName(e.target.value)}
                      className="w-full p-3 pr-10 rounded border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="اسمك الكامل"
                      required
                    />
                    <User className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                  </div>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">البريد الإلكتروني *</label>
                  <div className="relative">
                    <input
                      type="email"
                      value={email}
                      onChange={e => setEmail(e.target.value)}
                      className="w-full p-3 pr-10 rounded border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="example@email.com"
                      required
                    />
                    <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                  </div>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">رقم الهاتف *</label>
                  <div className="relative">
                    <input
                      type="tel"
                      value={phone}
                      onChange={e => setPhone(e.target.value)}
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
                      minLength={6}
                      required
                    />
                    <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute left-10 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                    >
                      {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                    </button>
                  </div>
                </div>
                
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    id="terms"
                    checked={agreeToTerms}
                    onChange={e => setAgreeToTerms(e.target.checked)}
                    className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                    required
                  />
                  <label htmlFor="terms" className="mr-2 block text-sm text-gray-700">
                    أوافق على <a href="#" className="text-blue-600 hover:underline">الشروط والأحكام</a> *
                  </label>
                </div>
                
                <Button 
                  type="submit" 
                  disabled={isLoading}
                  className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded disabled:opacity-50"
                >
                  {isLoading ? (
                    <div className="flex items-center gap-2">
                      <LoadingSpinner size="sm" />
                      جاري إنشاء الحساب...
                    </div>
                  ) : (
                    'إنشاء الحساب'
                  )}
                </Button>
              </form>
            </CardContent>
          </Card>
          
          {/* Benefits Section */}
          <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="text-center p-4 bg-white rounded-lg shadow-sm border border-gray-100">
              <div className="text-2xl mb-2">🏠</div>
              <h3 className="font-semibold text-sm mb-1">تصفح العقارات</h3>
              <p className="text-xs text-gray-600">وصول كامل لقاعدة البيانات</p>
            </div>
            <div className="text-center p-4 bg-white rounded-lg shadow-sm border border-gray-100">
              <div className="text-2xl mb-2">📈</div>
              <h3 className="font-semibold text-sm mb-1">استثمار آمن</h3>
              <p className="text-xs text-gray-600">فرص استثمارية موثوقة</p>
            </div>
            <div className="text-center p-4 bg-white rounded-lg shadow-sm border border-gray-100">
              <div className="text-2xl mb-2">💳</div>
              <h3 className="font-semibold text-sm mb-1">دفع مرن</h3>
              <p className="text-xs text-gray-600">خيارات تقسيط متعددة</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register; 