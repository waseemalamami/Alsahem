import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  Home, 
  Building2, 
  TrendingUp, 
  User, 
  Menu, 
  X, 
  Bell, 
  Search,
  MapPin,
  Phone,
  Mail,
  LogOut,
  UserCheck
} from "lucide-react";
import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';

const Navigation = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();
  const { user, isAuthenticated, isInvestor, logout } = useAuth();

  const isActive = (path: string) => {
    return location.pathname === path;
  };

  return (
    <nav className="bg-white shadow-md border-b border-gray-100 sticky top-0 z-50">
      <div className="max-w-6xl mx-auto px-4">
        <div className="flex justify-between items-center h-14">
          {/* Logo - More Compact */}
          <Link to="/" className="flex items-center space-x-2 space-x-reverse">
            <div className="bg-blue-600 rounded-lg p-1.5">
              <Home className="h-5 w-5 text-white" />
            </div>
            <div className="text-right">
              <h1 className="text-lg font-bold text-blue-600">منصة السهم العقارية</h1>
              <p className="text-xs text-gray-600">الاستثمار العقاري في ليبيا</p>
            </div>
          </Link>

          {/* Desktop Navigation - More Compact */}
          <div className="hidden md:flex items-center space-x-6 space-x-reverse">
            <Link 
              to="/" 
              className={`flex items-center space-x-1.5 space-x-reverse px-2.5 py-1.5 rounded-md transition-colors text-sm ${
                isActive('/') ? 'bg-blue-100 text-blue-600' : 'text-gray-700 hover:text-blue-600'
              }`}
            >
              <Home className="h-3.5 w-3.5" />
              <span>الرئيسية</span>
            </Link>
            
            <Link 
              to="/investments" 
              className={`flex items-center space-x-1.5 space-x-reverse px-2.5 py-1.5 rounded-md transition-colors text-sm ${
                isActive('/investments') ? 'bg-blue-100 text-blue-600' : 'text-gray-700 hover:text-blue-600'
              }`}
            >
              <TrendingUp className="h-3.5 w-3.5" />
              <span>الاستثمارات</span>
            </Link>
            
            <Link 
              to="/about" 
              className={`px-2.5 py-1.5 rounded-md transition-colors text-sm ${
                isActive('/about') ? 'bg-blue-100 text-blue-600' : 'text-gray-700 hover:text-blue-600'
              }`}
            >
              عن الشركة
            </Link>
            
            <Link 
              to="/contact" 
              className={`px-2.5 py-1.5 rounded-md transition-colors text-sm ${
                isActive('/contact') ? 'bg-blue-100 text-blue-600' : 'text-gray-700 hover:text-blue-600'
              }`}
            >
              اتصل بنا
            </Link>
          </div>

          {/* Right Side Actions - More Compact */}
          <div className="hidden md:flex items-center space-x-3 space-x-reverse">
            {isAuthenticated && isInvestor && (
              <Button variant="ghost" size="sm" className="relative h-8 w-8 p-0">
                <Bell className="h-4 w-4" />
                <Badge className="absolute -top-0.5 -right-0.5 h-4 w-4 rounded-full text-xs">3</Badge>
              </Button>
            )}
            
            <div className="flex items-center space-x-1.5 space-x-reverse">
              {isAuthenticated && isInvestor ? (
                <>
                  <Link to="/dashboard">
                    <Button variant="outline" size="sm" className="h-8 px-3 text-sm">
                      <UserCheck className="mr-1 h-3 w-3" />
                      لوحة التحكم
                    </Button>
                  </Link>
                  <Button 
                    size="sm" 
                    variant="outline"
                    className="h-8 px-3 text-sm text-red-600 hover:text-red-700"
                    onClick={logout}
                  >
                    <LogOut className="mr-1 h-3 w-3" />
                    خروج
                  </Button>
                </>
              ) : (
                <>
                  <Link to="/login">
                    <Button variant="outline" size="sm" className="h-8 px-3 text-sm">
                      تسجيل الدخول
                    </Button>
                  </Link>
                  <Link to="/register">
                    <Button size="sm" className="bg-blue-600 hover:bg-blue-700 h-8 px-3 text-sm">
                      التسجيل
                    </Button>
                  </Link>
                </>
              )}
            </div>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="h-8 w-8 p-0"
            >
              {isMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </Button>
          </div>
        </div>

        {/* Mobile Menu - More Compact */}
        {isMenuOpen && (
          <div className="md:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1 bg-white border-t border-gray-100">
              <Link 
                to="/" 
                className={`block px-3 py-2 rounded-md transition-colors text-sm ${
                  isActive('/') ? 'bg-blue-100 text-blue-600' : 'text-gray-700 hover:text-blue-600'
                }`}
                onClick={() => setIsMenuOpen(false)}
              >
                <div className="flex items-center space-x-2 space-x-reverse">
                  <Home className="h-4 w-4" />
                  <span>الرئيسية</span>
                </div>
              </Link>
              
              <Link 
                to="/investments" 
                className={`block px-3 py-2 rounded-md transition-colors text-sm ${
                  isActive('/investments') ? 'bg-blue-100 text-blue-600' : 'text-gray-700 hover:text-blue-600'
                }`}
                onClick={() => setIsMenuOpen(false)}
              >
                <div className="flex items-center space-x-2 space-x-reverse">
                  <TrendingUp className="h-4 w-4" />
                  <span>الاستثمارات</span>
                </div>
              </Link>
              
              <Link 
                to="/about" 
                className={`block px-3 py-2 rounded-md transition-colors text-sm ${
                  isActive('/about') ? 'bg-blue-100 text-blue-600' : 'text-gray-700 hover:text-blue-600'
                }`}
                onClick={() => setIsMenuOpen(false)}
              >
                عن الشركة
              </Link>
              
              <Link 
                to="/contact" 
                className={`block px-3 py-2 rounded-md transition-colors text-sm ${
                  isActive('/contact') ? 'bg-blue-100 text-blue-600' : 'text-gray-700 hover:text-blue-600'
                }`}
                onClick={() => setIsMenuOpen(false)}
              >
                اتصل بنا
              </Link>

              {/* Mobile Auth Buttons - More Compact */}
              <div className="pt-3 border-t border-gray-200 space-y-2">
                <Link to="/login" onClick={() => setIsMenuOpen(false)}>
                  <Button variant="outline" size="sm" className="w-full h-8 text-sm">
                    تسجيل الدخول
                  </Button>
                </Link>
                <Link to="/register" onClick={() => setIsMenuOpen(false)}>
                  <Button size="sm" className="w-full bg-blue-600 hover:bg-blue-700 h-8 text-sm">
                    التسجيل
                  </Button>
                </Link>
              </div>

              {/* Mobile Contact Info - More Compact */}
              <div className="pt-3 border-t border-gray-200 space-y-1.5">
                <div className="flex items-center space-x-2 space-x-reverse text-xs text-gray-600">
                  <Phone className="h-3 w-3" />
                  <span>+218 21 123 4567</span>
                </div>
                <div className="flex items-center space-x-2 space-x-reverse text-xs text-gray-600">
                  <Mail className="h-3 w-3" />
                  <span>info@alsaham.ly</span>
                </div>
                <div className="flex items-center space-x-2 space-x-reverse text-xs text-gray-600">
                  <MapPin className="h-3 w-3" />
                  <span>طرابلس، ليبيا</span>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navigation;
