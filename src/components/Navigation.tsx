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
    <nav className="bg-white shadow-md border-b border-gray-100 sticky top-0 z-50 w-full">
      <div className="w-full px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-14 sm:h-16 lg:h-18">
          {/* Logo - Responsive sizing */}
          <Link to="/" className="flex items-center space-x-2 space-x-reverse">
            <div className="bg-blue-600 rounded-lg p-1.5 sm:p-2">
              <Home className="h-4 w-4 sm:h-5 sm:w-5 text-white" />
            </div>
            <div className="text-right">
              <h1 className="text-base sm:text-lg lg:text-xl font-bold text-blue-600 leading-tight">
                منصة السهم العقارية
              </h1>
              <p className="text-xs sm:text-sm text-gray-600 leading-tight hidden xs:block">
                الاستثمار العقاري في ليبيا
              </p>
            </div>
          </Link>

          {/* Desktop Navigation - Hidden on mobile */}
          <div className="hidden lg:flex items-center space-x-6 space-x-reverse">
            <Link 
              to="/" 
              className={`flex items-center space-x-1.5 space-x-reverse px-3 py-2 rounded-md transition-colors text-sm font-medium ${
                isActive('/') ? 'bg-blue-100 text-blue-600' : 'text-gray-700 hover:text-blue-600 hover:bg-blue-50'
              }`}
            >
              <Home className="h-4 w-4" />
              <span>الرئيسية</span>
            </Link>
            
            <Link 
              to="/investments" 
              className={`flex items-center space-x-1.5 space-x-reverse px-3 py-2 rounded-md transition-colors text-sm font-medium ${
                isActive('/investments') ? 'bg-blue-100 text-blue-600' : 'text-gray-700 hover:text-blue-600 hover:bg-blue-50'
              }`}
            >
              <TrendingUp className="h-4 w-4" />
              <span>الاستثمارات</span>
            </Link>
            
            <Link 
              to="/about" 
              className={`px-3 py-2 rounded-md transition-colors text-sm font-medium ${
                isActive('/about') ? 'bg-blue-100 text-blue-600' : 'text-gray-700 hover:text-blue-600 hover:bg-blue-50'
              }`}
            >
              عن الشركة
            </Link>
            
            <Link 
              to="/contact" 
              className={`px-3 py-2 rounded-md transition-colors text-sm font-medium ${
                isActive('/contact') ? 'bg-blue-100 text-blue-600' : 'text-gray-700 hover:text-blue-600 hover:bg-blue-50'
              }`}
            >
              اتصل بنا
            </Link>
          </div>

          {/* Right Side Actions - Responsive */}
          <div className="hidden md:flex items-center space-x-3 space-x-reverse">
            {isAuthenticated && isInvestor && (
              <Button variant="ghost" size="sm" className="relative h-9 w-9 p-0 hover:bg-blue-50">
                <Bell className="h-4 w-4" />
                <Badge className="absolute -top-1 -right-1 h-5 w-5 rounded-full text-xs flex items-center justify-center">3</Badge>
              </Button>
            )}
            
            <div className="flex items-center space-x-2 space-x-reverse">
              {isAuthenticated && isInvestor ? (
                <>
                  <Link to="/dashboard">
                    <Button variant="outline" size="sm" className="h-9 px-3 text-sm font-medium">
                      <UserCheck className="mr-1 h-3 w-3" />
                      لوحة التحكم
                    </Button>
                  </Link>
                  <Button 
                    size="sm" 
                    variant="outline"
                    className="h-9 px-3 text-sm font-medium text-red-600 hover:text-red-700 hover:bg-red-50"
                    onClick={logout}
                  >
                    <LogOut className="mr-1 h-3 w-3" />
                    خروج
                  </Button>
                </>
              ) : (
                <>
                  <Link to="/login">
                    <Button variant="outline" size="sm" className="h-9 px-3 text-sm font-medium">
                      تسجيل الدخول
                    </Button>
                  </Link>
                  <Link to="/register">
                    <Button size="sm" className="bg-blue-600 hover:bg-blue-700 h-9 px-3 text-sm font-medium">
                      التسجيل
                    </Button>
                  </Link>
                </>
              )}
            </div>
          </div>

          {/* Mobile Menu Button - Touch friendly */}
          <div className="lg:hidden">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="h-10 w-10 p-0 touch-manipulation"
              aria-label="Toggle menu"
            >
              {isMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </Button>
          </div>
        </div>

        {/* Mobile Menu - Enhanced responsive design */}
        {isMenuOpen && (
          <div className="lg:hidden border-t border-gray-100 bg-white">
            <div className="px-4 py-4 space-y-2">
              {/* Navigation Links */}
              <Link 
                to="/" 
                className={`flex items-center space-x-2 space-x-reverse px-4 py-3 rounded-lg transition-colors text-base font-medium ${
                  isActive('/') ? 'bg-blue-100 text-blue-600' : 'text-gray-700 hover:text-blue-600 hover:bg-blue-50'
                }`}
                onClick={() => setIsMenuOpen(false)}
              >
                <Home className="h-5 w-5" />
                <span>الرئيسية</span>
              </Link>
              
              <Link 
                to="/investments" 
                className={`flex items-center space-x-2 space-x-reverse px-4 py-3 rounded-lg transition-colors text-base font-medium ${
                  isActive('/investments') ? 'bg-blue-100 text-blue-600' : 'text-gray-700 hover:text-blue-600 hover:bg-blue-50'
                }`}
                onClick={() => setIsMenuOpen(false)}
              >
                <TrendingUp className="h-5 w-5" />
                <span>الاستثمارات</span>
              </Link>
              
              <Link 
                to="/about" 
                className={`block px-4 py-3 rounded-lg transition-colors text-base font-medium ${
                  isActive('/about') ? 'bg-blue-100 text-blue-600' : 'text-gray-700 hover:text-blue-600 hover:bg-blue-50'
                }`}
                onClick={() => setIsMenuOpen(false)}
              >
                عن الشركة
              </Link>
              
              <Link 
                to="/contact" 
                className={`block px-4 py-3 rounded-lg transition-colors text-base font-medium ${
                  isActive('/contact') ? 'bg-blue-100 text-blue-600' : 'text-gray-700 hover:text-blue-600 hover:bg-blue-50'
                }`}
                onClick={() => setIsMenuOpen(false)}
              >
                اتصل بنا
              </Link>

              {/* Mobile Auth Buttons - Full width for touch */}
              <div className="pt-4 border-t border-gray-200 space-y-3">
                {isAuthenticated && isInvestor ? (
                  <>
                    <Link to="/dashboard" onClick={() => setIsMenuOpen(false)}>
                      <Button variant="outline" size="sm" className="w-full h-11 text-base font-medium">
                        <UserCheck className="mr-2 h-4 w-4" />
                        لوحة التحكم
                      </Button>
                    </Link>
                    <Button 
                      size="sm" 
                      variant="outline"
                      className="w-full h-11 text-base font-medium text-red-600 hover:text-red-700 hover:bg-red-50"
                      onClick={() => {
                        logout();
                        setIsMenuOpen(false);
                      }}
                    >
                      <LogOut className="mr-2 h-4 w-4" />
                      خروج
                    </Button>
                  </>
                ) : (
                  <>
                    <Link to="/login" onClick={() => setIsMenuOpen(false)}>
                      <Button variant="outline" size="sm" className="w-full h-11 text-base font-medium">
                        تسجيل الدخول
                      </Button>
                    </Link>
                    <Link to="/register" onClick={() => setIsMenuOpen(false)}>
                      <Button size="sm" className="w-full bg-blue-600 hover:bg-blue-700 h-11 text-base font-medium">
                        التسجيل
                      </Button>
                    </Link>
                  </>
                )}
              </div>

              {/* Mobile Contact Info - Responsive grid */}
              <div className="pt-4 border-t border-gray-200">
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-sm">
                  <div className="flex items-center space-x-2 space-x-reverse text-gray-600">
                    <Phone className="h-4 w-4 text-blue-500" />
                    <span className="text-xs sm:text-sm">+218 21 123 4567</span>
                  </div>
                  <div className="flex items-center space-x-2 space-x-reverse text-gray-600">
                    <Mail className="h-4 w-4 text-blue-500" />
                    <span className="text-xs sm:text-sm">info@alsaham.ly</span>
                  </div>
                  <div className="flex items-center space-x-2 space-x-reverse text-gray-600">
                    <MapPin className="h-4 w-4 text-blue-500" />
                    <span className="text-xs sm:text-sm">طرابلس، ليبيا</span>
                  </div>
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
