import React, { useState, useEffect } from 'react';
import { apiClient } from '../lib/api-client';
import { API_ENDPOINTS } from '../lib/constants';
import { Button } from './ui/button';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Alert, AlertDescription } from './ui/alert';
import { Badge } from './ui/badge';

interface ConnectionTestResult {
  endpoint: string;
  status: 'success' | 'error' | 'loading';
  message: string;
  data?: any;
}

export const ApiConnectionTest: React.FC = () => {
  const [testResults, setTestResults] = useState<ConnectionTestResult[]>([]);
  const [isRunning, setIsRunning] = useState(false);

  const testEndpoints = [
    { name: 'Properties List', endpoint: API_ENDPOINTS.PROPERTIES.LIST },
    { name: 'Cities List', endpoint: API_ENDPOINTS.CITIES.LIST },
    { name: 'Property Types', endpoint: API_ENDPOINTS.PROPERTY_TYPES.LIST },
    { name: 'Notifications', endpoint: API_ENDPOINTS.NOTIFICATIONS.LIST },
  ];

  const runConnectionTest = async () => {
    setIsRunning(true);
    setTestResults([]);

    const results: ConnectionTestResult[] = [];

    for (const test of testEndpoints) {
      // Add loading state
      setTestResults([...results, {
        endpoint: test.name,
        status: 'loading',
        message: 'Testing connection...',
      }]);

      try {
        const response = await apiClient.get(test.endpoint);
        results.push({
          endpoint: test.name,
          status: 'success',
          message: 'Connection successful',
          data: response.data,
        });
      } catch (error: any) {
        results.push({
          endpoint: test.name,
          status: 'error',
          message: error.message || 'Connection failed',
        });
      }

      setTestResults([...results]);
    }

    setIsRunning(false);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'success':
        return 'bg-green-100 text-green-800';
      case 'error':
        return 'bg-red-100 text-red-800';
      case 'loading':
        return 'bg-yellow-100 text-yellow-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <Card className="w-full max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          API Connection Test
          <Button 
            onClick={runConnectionTest} 
            disabled={isRunning}
            variant="outline"
          >
            {isRunning ? 'Testing...' : 'Run Test'}
          </Button>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {testResults.length === 0 && !isRunning && (
            <Alert>
              <AlertDescription>
                Click "Run Test" to verify the connection between frontend and .NET backend.
              </AlertDescription>
            </Alert>
          )}
          
          {testResults.map((result, index) => (
            <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
              <div className="flex items-center space-x-3">
                <Badge className={getStatusColor(result.status)}>
                  {result.status.toUpperCase()}
                </Badge>
                <span className="font-medium">{result.endpoint}</span>
              </div>
              <span className="text-sm text-gray-600">{result.message}</span>
            </div>
          ))}
          
          {isRunning && testResults.length === 0 && (
            <div className="text-center py-8">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto"></div>
              <p className="mt-2 text-gray-600">Testing API connections...</p>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};
