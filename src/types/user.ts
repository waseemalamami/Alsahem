export type UserRole = 'visitor' | 'investor' | 'admin';

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  avatar?: string;
  phone?: string;
  isVerified: boolean;
  createdAt: string;
  lastLoginAt: string;
}

export interface Visitor {
  role: 'visitor';
  sessionId: string;
  preferences?: {
    language: 'ar' | 'en';
    currency: 'LYD' | 'USD';
  };
}

export interface Investor extends User {
  role: 'investor';
  portfolio: {
    totalInvested: number;
    activeInvestments: number;
    completedInvestments: number;
    totalReturns: number;
    averageReturn: number;
  };
  kycStatus: 'pending' | 'approved' | 'rejected';
  bankDetails?: {
    accountNumber: string;
    bankName: string;
  };
}

export interface AuthState {
  user: User | Investor | Visitor | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;
}

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface RegisterData {
  name: string;
  email: string;
  password: string;
  phone?: string;
  agreeToTerms: boolean;
} 