import React, { createContext, useContext, useReducer, useEffect } from 'react';
import { AuthState, User, Investor, Visitor, LoginCredentials, RegisterData } from '../types/user';

// Initial state
const initialState: AuthState = {
  user: {
    role: 'visitor',
    sessionId: Math.random().toString(36).substr(2, 9),
    preferences: {
      language: 'ar',
      currency: 'LYD'
    }
  } as Visitor,
  isAuthenticated: false,
  isLoading: false,
  error: null
};

// Action types
type AuthAction =
  | { type: 'LOGIN_START' }
  | { type: 'LOGIN_SUCCESS'; payload: User | Investor }
  | { type: 'LOGIN_FAILURE'; payload: string }
  | { type: 'LOGOUT' }
  | { type: 'REGISTER_START' }
  | { type: 'REGISTER_SUCCESS'; payload: User | Investor }
  | { type: 'REGISTER_FAILURE'; payload: string }
  | { type: 'CLEAR_ERROR' }
  | { type: 'SET_LOADING'; payload: boolean };

// Reducer
const authReducer = (state: AuthState, action: AuthAction): AuthState => {
  switch (action.type) {
    case 'LOGIN_START':
    case 'REGISTER_START':
      return {
        ...state,
        isLoading: true,
        error: null
      };
    
    case 'LOGIN_SUCCESS':
    case 'REGISTER_SUCCESS':
      return {
        ...state,
        user: action.payload,
        isAuthenticated: true,
        isLoading: false,
        error: null
      };
    
    case 'LOGIN_FAILURE':
    case 'REGISTER_FAILURE':
      return {
        ...state,
        user: {
          role: 'visitor',
          sessionId: Math.random().toString(36).substr(2, 9),
          preferences: {
            language: 'ar',
            currency: 'LYD'
          }
        } as Visitor,
        isAuthenticated: false,
        isLoading: false,
        error: action.payload
      };
    
    case 'LOGOUT':
      return {
        ...state,
        user: {
          role: 'visitor',
          sessionId: Math.random().toString(36).substr(2, 9),
          preferences: {
            language: 'ar',
            currency: 'LYD'
          }
        } as Visitor,
        isAuthenticated: false,
        isLoading: false,
        error: null
      };
    
    case 'CLEAR_ERROR':
      return {
        ...state,
        error: null
      };
    
    case 'SET_LOADING':
      return {
        ...state,
        isLoading: action.payload
      };
    
    default:
      return state;
  }
};

// Context
interface AuthContextType extends AuthState {
  login: (credentials: LoginCredentials) => Promise<void>;
  register: (data: RegisterData) => Promise<void>;
  logout: () => void;
  clearError: () => void;
  isInvestor: boolean;
  isVisitor: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Provider component
export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [state, dispatch] = useReducer(authReducer, initialState);

  // Check for existing session on mount
  useEffect(() => {
    const savedUser = localStorage.getItem('saham_user');
    if (savedUser) {
      try {
        const user = JSON.parse(savedUser);
        dispatch({ type: 'LOGIN_SUCCESS', payload: user });
      } catch (error) {
        localStorage.removeItem('saham_user');
      }
    }
  }, []);

  // Save user to localStorage when authenticated
  useEffect(() => {
    if (state.isAuthenticated && state.user && state.user.role !== 'visitor') {
      localStorage.setItem('saham_user', JSON.stringify(state.user));
    } else {
      localStorage.removeItem('saham_user');
    }
  }, [state.isAuthenticated, state.user]);

  const login = async (credentials: LoginCredentials) => {
    dispatch({ type: 'LOGIN_START' });
    
    try {
      // Mock API call - replace with real API
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Simulate successful login
      const mockUser: Investor = {
        id: '1',
        name: 'أحمد محمد',
        email: credentials.email,
        role: 'investor',
        avatar: 'https://randomuser.me/api/portraits/men/32.jpg',
        phone: '+218 91 234 5678',
        isVerified: true,
        createdAt: '2024-01-01',
        lastLoginAt: new Date().toISOString(),
        portfolio: {
          totalInvested: 150000,
          activeInvestments: 3,
          completedInvestments: 2,
          totalReturns: 25000,
          averageReturn: 15.5
        },
        kycStatus: 'approved',
        bankDetails: {
          accountNumber: '1234567890',
          bankName: 'بنك ليبيا المركزي'
        }
      };
      
      dispatch({ type: 'LOGIN_SUCCESS', payload: mockUser });
    } catch (error) {
      dispatch({ type: 'LOGIN_FAILURE', payload: 'فشل في تسجيل الدخول. يرجى التحقق من البيانات.' });
    }
  };

  const register = async (data: RegisterData) => {
    dispatch({ type: 'REGISTER_START' });
    
    try {
      // Mock API call - replace with real API
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Simulate successful registration
      const mockUser: Investor = {
        id: '2',
        name: data.name,
        email: data.email,
        role: 'investor',
        avatar: undefined,
        phone: data.phone,
        isVerified: false,
        createdAt: new Date().toISOString(),
        lastLoginAt: new Date().toISOString(),
        portfolio: {
          totalInvested: 0,
          activeInvestments: 0,
          completedInvestments: 0,
          totalReturns: 0,
          averageReturn: 0
        },
        kycStatus: 'pending'
      };
      
      dispatch({ type: 'REGISTER_SUCCESS', payload: mockUser });
    } catch (error) {
      dispatch({ type: 'REGISTER_FAILURE', payload: 'فشل في إنشاء الحساب. يرجى المحاولة مرة أخرى.' });
    }
  };

  const logout = () => {
    dispatch({ type: 'LOGOUT' });
  };

  const clearError = () => {
    dispatch({ type: 'CLEAR_ERROR' });
  };

  const isInvestor = state.isAuthenticated && state.user?.role === 'investor';
  const isVisitor = !state.isAuthenticated || state.user?.role === 'visitor';

  const value: AuthContextType = {
    ...state,
    login,
    register,
    logout,
    clearError,
    isInvestor,
    isVisitor
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

// Hook to use auth context
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}; 