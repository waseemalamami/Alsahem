import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { LoadingSpinner } from './ui/loading-spinner';

interface ProtectedRouteProps {
  children: React.ReactNode;
  requireAuth?: boolean;
  requireInvestor?: boolean;
  redirectTo?: string;
}

export const ProtectedRoute: React.FC<ProtectedRouteProps> = ({
  children,
  requireAuth = false,
  requireInvestor = false,
  redirectTo = '/login'
}) => {
  const { isAuthenticated, isInvestor, isLoading } = useAuth();
  const location = useLocation();

  // Show loading spinner while checking authentication
  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <LoadingSpinner size="lg" />
          <p className="mt-4 text-gray-600">جاري التحقق من الحساب...</p>
        </div>
      </div>
    );
  }

  // If authentication is required but user is not authenticated
  if (requireAuth && !isAuthenticated) {
    return <Navigate to={redirectTo} state={{ from: location }} replace />;
  }

  // If investor role is required but user is not an investor
  if (requireInvestor && !isInvestor) {
    return <Navigate to="/register" state={{ from: location }} replace />;
  }

  // If user is authenticated but trying to access login/register pages
  if (isAuthenticated && (location.pathname === '/login' || location.pathname === '/register')) {
    return <Navigate to="/dashboard" replace />;
  }

  return <>{children}</>;
};

// Specific route components for different access levels
export const VisitorRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return <ProtectedRoute>{children}</ProtectedRoute>;
};

export const InvestorRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <ProtectedRoute requireAuth requireInvestor redirectTo="/login">
      {children}
    </ProtectedRoute>
  );
};

export const AuthRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <ProtectedRoute requireAuth redirectTo="/login">
      {children}
    </ProtectedRoute>
  );
}; 