import React, { useState, useEffect } from 'react';
import { InvestmentService } from '../services/investment.service';
import { Investment } from '../types/api';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { Button } from './ui/button';
import { Alert, AlertDescription } from './ui/alert';
import { Skeleton } from './ui/skeleton';

export const RealDataInvestmentList: React.FC = () => {
  const [investments, setInvestments] = useState<Investment[]>([]);
  const [userInvestments, setUserInvestments] = useState<Investment[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      setLoading(true);
      setError(null);

      // Load all investments and user investments in parallel
      const [investmentsResult, userInvestmentsResult] = await Promise.all([
        InvestmentService.getInvestments(),
        InvestmentService.getUserInvestments(),
      ]);

      setInvestments(investmentsResult.data);
      setUserInvestments(userInvestmentsResult);

      console.log('✅ Investment data loaded successfully:', {
        allInvestments: investmentsResult.data.length,
        userInvestments: userInvestmentsResult.length,
      });
    } catch (err: any) {
      console.error('❌ Error loading investment data:', err);
      setError(err.message || 'Failed to load investment data');
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

  const calculateProgress = (investment: Investment) => {
    if (!investment.totalShares || !investment.availableShares) return 0;
    const invested = investment.totalShares - investment.availableShares;
    return Math.round((invested / investment.totalShares) * 100);
  };

  if (loading) {
    return (
      <div className="space-y-4">
        <Card>
          <CardHeader>
            <CardTitle>💰 Real Investments from Backend</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[1, 2, 3].map((i) => (
                <div key={i} className="flex space-x-4">
                  <Skeleton className="h-24 w-24" />
                  <div className="space-y-2 flex-1">
                    <Skeleton className="h-4 w-3/4" />
                    <Skeleton className="h-4 w-1/2" />
                    <Skeleton className="h-4 w-1/4" />
                  </div>
                </div>
              ))}
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
          <CardTitle>💰 Real Investments from Backend</CardTitle>
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
          💰 Real Investments from Backend
          <Badge variant="secondary">
            {investments.length} investments
          </Badge>
        </CardTitle>
      </CardHeader>
      <CardContent>
        {investments.length === 0 ? (
          <Alert>
            <AlertDescription>
              <strong>No investments found.</strong> The database is empty. 
              You can add investments through the backend API.
            </AlertDescription>
          </Alert>
        ) : (
          <div className="space-y-4">
            {investments.map((investment) => (
              <div
                key={investment.id}
                className="border rounded-lg p-4 hover:shadow-md transition-shadow"
              >
                <div className="flex items-start gap-4">
                  <div className="w-24 h-24 bg-blue-100 rounded-lg flex items-center justify-center">
                    <span className="text-blue-600 text-sm font-medium">💰</span>
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold text-lg">{investment.title}</h3>
                    <p className="text-gray-600 text-sm mb-2">{investment.description}</p>
                    
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm mb-3">
                      <div>
                        <span className="font-medium text-gray-700">Share Price:</span>
                        <div className="text-green-600 font-semibold">
                          {formatCurrency(investment.sharePrice || 0)}
                        </div>
                      </div>
                      <div>
                        <span className="font-medium text-gray-700">Min Investment:</span>
                        <div className="text-blue-600 font-semibold">
                          {formatCurrency(investment.minInvestment || 0)}
                        </div>
                      </div>
                      <div>
                        <span className="font-medium text-gray-700">Available Shares:</span>
                        <div className="text-orange-600 font-semibold">
                          {investment.availableShares || 0}
                        </div>
                      </div>
                      <div>
                        <span className="font-medium text-gray-700">Duration:</span>
                        <div className="text-purple-600 font-semibold">
                          {investment.durationByMonths || 0} months
                        </div>
                      </div>
                    </div>

                    {/* Progress Bar */}
                    <div className="mb-3">
                      <div className="flex justify-between text-sm text-gray-600 mb-1">
                        <span>Investment Progress</span>
                        <span>{calculateProgress(investment)}%</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div 
                          className="bg-green-600 h-2 rounded-full transition-all duration-300"
                          style={{ width: `${calculateProgress(investment)}%` }}
                        ></div>
                      </div>
                    </div>

                    <div className="flex items-center gap-4 text-sm text-gray-500">
                      <span>📅 End Date: {investment.endDate ? new Date(investment.endDate).toLocaleDateString() : 'N/A'}</span>
                      <span>💳 Down Payment: {formatCurrency(investment.downPayment || 0)}</span>
                      <span>📊 Monthly Payment: {formatCurrency(investment.monthlyPayment || 0)}</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
        
        <div className="mt-6 p-4 bg-gray-50 rounded-lg">
          <h4 className="font-semibold mb-2">📊 Investment Summary:</h4>
          <div className="grid grid-cols-2 gap-4 text-sm">
            <div>
              <span className="font-medium">All Investments:</span> {investments.length}
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
