import React, { useState, useEffect } from 'react';
import { UserService } from '../services/user.service';
import { UserInvestment } from '../types/api';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { Button } from './ui/button';
import { Alert, AlertDescription } from './ui/alert';
import { Skeleton } from './ui/skeleton';

export const RealDataUserDashboard: React.FC = () => {
  const [userProfile, setUserProfile] = useState<any>(null);
  const [userInvestments, setUserInvestments] = useState<UserInvestment[]>([]);
  const [portfolioSummary, setPortfolioSummary] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      setLoading(true);
      setError(null);

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

  if (loading) {
    return (
      <div className="space-y-4">
        <Card>
          <CardHeader>
            <CardTitle>👤 Real User Dashboard from Backend</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex space-x-4">
                <Skeleton className="h-16 w-16 rounded-full" />
                <div className="space-y-2 flex-1">
                  <Skeleton className="h-4 w-3/4" />
                  <Skeleton className="h-4 w-1/2" />
                </div>
              </div>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {[1, 2, 3, 4].map((i) => (
                  <div key={i} className="space-y-2">
                    <Skeleton className="h-8 w-full" />
                    <Skeleton className="h-4 w-3/4" />
                  </div>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  if (error) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>👤 Real User Dashboard from Backend</CardTitle>
        </CardHeader>
        <CardContent>
          <Alert variant="destructive">
            <AlertDescription>
              <strong>Error:</strong> {error}
            </AlertDescription>
          </Alert>
          <Button onClick={loadData} className="mt-4">
            Retry
          </Button>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          👤 Real User Dashboard from Backend
          <Badge variant="secondary">
            {userProfile ? 'Logged In' : 'Not Logged In'}
          </Badge>
        </CardTitle>
      </CardHeader>
      <CardContent>
        {/* User Profile Section */}
        {userProfile ? (
          <div className="mb-6 p-4 bg-blue-50 rounded-lg">
            <h3 className="font-semibold text-lg mb-3">👤 User Profile</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
              <div>
                <span className="font-medium text-gray-700">Name:</span>
                <div className="text-blue-600 font-semibold">{userProfile.name}</div>
              </div>
              <div>
                <span className="font-medium text-gray-700">Email:</span>
                <div className="text-blue-600 font-semibold">{userProfile.email}</div>
              </div>
              <div>
                <span className="font-medium text-gray-700">Phone:</span>
                <div className="text-blue-600 font-semibold">{userProfile.phoneNumber}</div>
              </div>
              <div>
                <span className="font-medium text-gray-700">Role:</span>
                <div className="text-blue-600 font-semibold">{userProfile.role}</div>
              </div>
            </div>
          </div>
        ) : (
          <Alert className="mb-6">
            <AlertDescription>
              <strong>No user profile found.</strong> Please log in to see your profile information.
            </AlertDescription>
          </Alert>
        )}

        {/* Portfolio Summary Section */}
        {portfolioSummary && (
          <div className="mb-6 p-4 bg-green-50 rounded-lg">
            <h3 className="font-semibold text-lg mb-3">📊 Portfolio Summary</h3>
            <div className="grid grid-cols-2 md:grid-cols-5 gap-4 text-sm">
              <div className="text-center">
                <div className="text-2xl font-bold text-green-600">{portfolioSummary.totalInvestments}</div>
                <div className="text-gray-600">Total Investments</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-blue-600">{formatCurrency(portfolioSummary.totalValue)}</div>
                <div className="text-gray-600">Total Value</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-purple-600">{portfolioSummary.totalShares}</div>
                <div className="text-gray-600">Total Shares</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-orange-600">{portfolioSummary.activeInvestments}</div>
                <div className="text-gray-600">Active</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-gray-600">{portfolioSummary.completedInvestments}</div>
                <div className="text-gray-600">Completed</div>
              </div>
            </div>
          </div>
        )}

        {/* User Investments Section */}
        <div className="mb-6">
          <h3 className="font-semibold text-lg mb-3">💰 User Investments</h3>
          {userInvestments.length === 0 ? (
            <Alert>
              <AlertDescription>
                <strong>No investments found.</strong> You haven't made any investments yet.
              </AlertDescription>
            </Alert>
          ) : (
            <div className="space-y-3">
              {userInvestments.map((investment) => (
                <div
                  key={investment.id}
                  className="border rounded-lg p-3 hover:shadow-sm transition-shadow"
                >
                  <div className="flex justify-between items-center">
                    <div>
                      <div className="font-medium">Investment #{investment.investmentId}</div>
                      <div className="text-sm text-gray-600">
                        {investment.shares} shares • {formatCurrency(investment.amount || 0)}
                      </div>
                    </div>
                    <Badge variant={investment.status === 'active' ? 'default' : 'secondary'}>
                      {investment.status || 'Unknown'}
                    </Badge>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
        
        <div className="mt-6 p-4 bg-gray-50 rounded-lg">
          <h4 className="font-semibold mb-2">📋 Dashboard Summary:</h4>
          <div className="grid grid-cols-2 gap-4 text-sm">
            <div>
              <span className="font-medium">Profile Loaded:</span> {userProfile ? 'Yes' : 'No'}
            </div>
            <div>
              <span className="font-medium">User Investments:</span> {userInvestments.length}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
