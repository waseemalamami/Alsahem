import React, { useState, useEffect } from 'react';
import { apiClient } from '../lib/api-client';
import { API_ENDPOINTS } from '../lib/constants';
import { Button } from './ui/button';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Alert, AlertDescription } from './ui/alert';
import { Badge } from './ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';

interface EndpointTest {
  name: string;
  endpoint: string;
  method: 'GET' | 'POST';
  data?: any;
  description: string;
}

interface TestResult {
  endpoint: string;
  status: 'success' | 'error' | 'loading';
  message: string;
  data?: any;
  responseTime?: number;
}

export const BackendIntegrationTest: React.FC = () => {
  const [testResults, setTestResults] = useState<TestResult[]>([]);
  const [isRunning, setIsRunning] = useState(false);
  const [selectedTab, setSelectedTab] = useState('properties');

  const endpointTests: Record<string, EndpointTest[]> = {
    properties: [
      {
        name: 'Get All Properties',
        endpoint: API_ENDPOINTS.PROPERTIES.LIST,
        method: 'GET',
        description: 'Fetch all available properties'
      },
      {
        name: 'Get Property Types',
        endpoint: API_ENDPOINTS.PROPERTY_TYPES.LIST,
        method: 'GET',
        description: 'Fetch all property types'
      },
      {
        name: 'Get Cities',
        endpoint: API_ENDPOINTS.CITIES.LIST,
        method: 'GET',
        description: 'Fetch all cities'
      }
    ],
    investments: [
      {
        name: 'Get All Investments',
        endpoint: API_ENDPOINTS.INVESTMENTS.LIST,
        method: 'GET',
        description: 'Fetch all available investments'
      }
    ],
    notifications: [
      {
        name: 'Get All Notifications',
        endpoint: API_ENDPOINTS.NOTIFICATIONS.LIST,
        method: 'GET',
        description: 'Fetch all notifications'
      }
    ],
    auth: [
      {
        name: 'Test Login Endpoint',
        endpoint: API_ENDPOINTS.AUTH.LOGIN,
        method: 'POST',
        data: {
          phoneNumber: '0913433722',
          password: 'Aa@123456789'
        },
        description: 'Test authentication endpoint'
      }
    ]
  };

  const runEndpointTest = async (test: EndpointTest): Promise<TestResult> => {
    const startTime = Date.now();
    
    try {
      let response;
      if (test.method === 'GET') {
        response = await apiClient.get(test.endpoint);
      } else {
        response = await apiClient.post(test.endpoint, test.data);
      }
      
      const responseTime = Date.now() - startTime;
      
      return {
        endpoint: test.name,
        status: 'success',
        message: `Success - ${responseTime}ms`,
        data: response.data,
        responseTime
      };
    } catch (error: any) {
      const responseTime = Date.now() - startTime;
      
      return {
        endpoint: test.name,
        status: 'error',
        message: error.message || 'Request failed',
        responseTime
      };
    }
  };

  const runAllTests = async () => {
    setIsRunning(true);
    setTestResults([]);

    const allTests = Object.values(endpointTests).flat();
    const results: TestResult[] = [];

    for (const test of allTests) {
      // Add loading state
      setTestResults([...results, {
        endpoint: test.name,
        status: 'loading',
        message: 'Testing...',
      }]);

      const result = await runEndpointTest(test);
      results.push(result);
      setTestResults([...results]);
    }

    setIsRunning(false);
  };

  const runCategoryTests = async (category: string) => {
    setIsRunning(true);
    setTestResults([]);

    const tests = endpointTests[category] || [];
    const results: TestResult[] = [];

    for (const test of tests) {
      setTestResults([...results, {
        endpoint: test.name,
        status: 'loading',
        message: 'Testing...',
      }]);

      const result = await runEndpointTest(test);
      results.push(result);
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

  const renderDataPreview = (data: any) => {
    if (!data) return null;
    
    if (Array.isArray(data)) {
      return (
        <div className="mt-2 text-sm text-gray-600">
          <span className="font-medium">Items: {data.length}</span>
          {data.length > 0 && (
            <div className="mt-1">
              <span className="font-medium">Sample:</span> {JSON.stringify(data[0], null, 2).substring(0, 100)}...
            </div>
          )}
        </div>
      );
    }
    
    return (
      <div className="mt-2 text-sm text-gray-600">
        <span className="font-medium">Response:</span> {JSON.stringify(data, null, 2).substring(0, 100)}...
      </div>
    );
  };

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          Backend Integration Test
          <div className="space-x-2">
            <Button 
              onClick={() => runCategoryTests(selectedTab)} 
              disabled={isRunning}
              variant="outline"
              size="sm"
            >
              {isRunning ? 'Testing...' : 'Test Category'}
            </Button>
            <Button 
              onClick={runAllTests} 
              disabled={isRunning}
              size="sm"
            >
              {isRunning ? 'Testing...' : 'Test All'}
            </Button>
          </div>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <Tabs value={selectedTab} onValueChange={setSelectedTab}>
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="properties">Properties</TabsTrigger>
            <TabsTrigger value="investments">Investments</TabsTrigger>
            <TabsTrigger value="notifications">Notifications</TabsTrigger>
            <TabsTrigger value="auth">Authentication</TabsTrigger>
          </TabsList>
          
          {Object.entries(endpointTests).map(([category, tests]) => (
            <TabsContent key={category} value={category}>
              <div className="space-y-4">
                <div className="text-sm text-gray-600 mb-4">
                  {tests.length} endpoint(s) available for {category}
                </div>
                
                {tests.map((test, index) => (
                  <div key={index} className="p-3 border rounded-lg">
                    <div className="flex items-center justify-between mb-2">
                      <div>
                        <h4 className="font-medium">{test.name}</h4>
                        <p className="text-sm text-gray-600">{test.description}</p>
                      </div>
                      <Badge variant="outline">{test.method}</Badge>
                    </div>
                    <div className="text-xs text-gray-500 font-mono">
                      {test.endpoint}
                    </div>
                  </div>
                ))}
              </div>
            </TabsContent>
          ))}
        </Tabs>
        
        <div className="mt-6">
          <h3 className="text-lg font-medium mb-4">Test Results</h3>
          <div className="space-y-3">
            {testResults.length === 0 && !isRunning && (
              <Alert>
                <AlertDescription>
                  Click "Test Category" or "Test All" to verify backend endpoints.
                </AlertDescription>
              </Alert>
            )}
            
            {testResults.map((result, index) => (
              <div key={index} className="flex items-start justify-between p-3 border rounded-lg">
                <div className="flex-1">
                  <div className="flex items-center space-x-3 mb-2">
                    <Badge className={getStatusColor(result.status)}>
                      {result.status.toUpperCase()}
                    </Badge>
                    <span className="font-medium">{result.endpoint}</span>
                    {result.responseTime && (
                      <span className="text-sm text-gray-500">
                        {result.responseTime}ms
                      </span>
                    )}
                  </div>
                  <span className="text-sm text-gray-600">{result.message}</span>
                  {result.data && renderDataPreview(result.data)}
                </div>
              </div>
            ))}
            
            {isRunning && testResults.length === 0 && (
              <div className="text-center py-8">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto"></div>
                <p className="mt-2 text-gray-600">Testing backend endpoints...</p>
              </div>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
