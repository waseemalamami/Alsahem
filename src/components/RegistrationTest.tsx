import React, { useState } from 'react';
import { AuthService } from '../services/auth.service';
import { Button } from './ui/button';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Alert, AlertDescription } from './ui/alert';
import { Badge } from './ui/badge';

export const RegistrationTest: React.FC = () => {
  const [testResult, setTestResult] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const testRegistration = async () => {
    setIsLoading(true);
    setError(null);
    setTestResult(null);

    try {
      const testData = {
        name: "Test User",
        email: `test${Date.now()}@example.com`,
        phoneNumber: `091234${Date.now().toString().slice(-4)}`,
        password: "Test123!",
        userType: 1
      };

      console.log('🔍 Testing registration with:', testData);

      const response = await AuthService.register(testData);
      
      console.log('🔍 Registration response:', response);
      console.log('🔍 Response type:', typeof response);
      console.log('🔍 Response keys:', Object.keys(response || {}));
      
      setTestResult({
        success: true,
        data: response,
        requestData: testData
      });

      if (response && response.success) {
        console.log('✅ Registration successful!');
      } else {
        console.log('❌ Registration failed:', response?.message || 'Unknown error');
      }
    } catch (err: any) {
      console.error('❌ Registration error:', err);
      console.error('❌ Error type:', typeof err);
      console.error('❌ Error name:', err.name);
      console.error('❌ Error message:', err.message);
      setError(err.message || 'Registration failed');
    } finally {
      setIsLoading(false);
    }
  };

  const testLogin = async () => {
    setIsLoading(true);
    setError(null);
    setTestResult(null);

    try {
      const testData = {
        phoneNumber: "0912345678",
        password: "Test123!"
      };

      console.log('Testing login with:', testData);

      const response = await AuthService.login(testData);
      
      console.log('Login response:', response);
      
      setTestResult({
        success: true,
        data: response,
        requestData: testData
      });

      if (response.success) {
        console.log('✅ Login successful!');
      } else {
        console.log('❌ Login failed:', response.message);
      }
    } catch (err: any) {
      console.error('Login error:', err);
      setError(err.message || 'Login failed');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          🔐 Authentication Test
          <Badge variant="secondary">API Integration</Badge>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex gap-2">
          <Button 
            onClick={testRegistration} 
            disabled={isLoading}
            variant="outline"
          >
            {isLoading ? 'Testing...' : 'Test Registration'}
          </Button>
          <Button 
            onClick={testLogin} 
            disabled={isLoading}
            variant="outline"
          >
            {isLoading ? 'Testing...' : 'Test Login'}
          </Button>
        </div>

        {error && (
          <Alert variant="destructive">
            <AlertDescription>
              <strong>Error:</strong> {error}
            </AlertDescription>
          </Alert>
        )}

        {testResult && (
          <div className="space-y-4">
            <Alert variant={testResult.data.success ? "default" : "destructive"}>
              <AlertDescription>
                <strong>{testResult.data.success ? 'Success!' : 'Failed!'}</strong> 
                {testResult.data.message || 'API call completed.'}
              </AlertDescription>
            </Alert>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <h4 className="font-semibold mb-2">Request Data:</h4>
                <pre className="bg-gray-100 p-3 rounded text-sm overflow-auto">
                  {JSON.stringify(testResult.requestData, null, 2)}
                </pre>
              </div>
              <div>
                <h4 className="font-semibold mb-2">Response Data:</h4>
                <pre className="bg-gray-100 p-3 rounded text-sm overflow-auto">
                  {JSON.stringify(testResult.data, null, 2)}
                </pre>
              </div>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};
