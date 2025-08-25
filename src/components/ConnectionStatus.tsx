import React, { useState, useEffect } from 'react';
import { apiClient } from '../lib/api-client';
import { API_ENDPOINTS } from '../lib/constants';
import { Badge } from './ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Alert, AlertDescription } from './ui/alert';

interface ConnectionStatus {
  isConnected: boolean;
  lastChecked: Date;
  error?: string;
  responseTime?: number;
}

export const ConnectionStatus: React.FC = () => {
  const [status, setStatus] = useState<ConnectionStatus>({
    isConnected: false,
    lastChecked: new Date(),
  });
  const [isChecking, setIsChecking] = useState(false);

  const checkConnection = async () => {
    setIsChecking(true);
    const startTime = Date.now();
    
    try {
      await apiClient.get(API_ENDPOINTS.PROPERTIES.LIST);
      const responseTime = Date.now() - startTime;
      
      setStatus({
        isConnected: true,
        lastChecked: new Date(),
        responseTime,
      });
    } catch (error: any) {
      setStatus({
        isConnected: false,
        lastChecked: new Date(),
        error: error.message,
      });
    } finally {
      setIsChecking(false);
    }
  };

  useEffect(() => {
    checkConnection();
    
    // Check connection every 30 seconds
    const interval = setInterval(checkConnection, 30000);
    return () => clearInterval(interval);
  }, []);

  const getStatusColor = () => {
    if (isChecking) return 'bg-yellow-100 text-yellow-800';
    return status.isConnected ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800';
  };

  const getStatusText = () => {
    if (isChecking) return 'CHECKING';
    return status.isConnected ? 'CONNECTED' : 'DISCONNECTED';
  };

  return (
    <Card className="w-full max-w-md">
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          Backend Connection
          <Badge className={getStatusColor()}>
            {getStatusText()}
          </Badge>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          <div className="flex justify-between">
            <span className="text-sm text-gray-600">Status:</span>
            <span className="text-sm font-medium">
              {status.isConnected ? 'Connected' : 'Disconnected'}
            </span>
          </div>
          
          {status.responseTime && (
            <div className="flex justify-between">
              <span className="text-sm text-gray-600">Response Time:</span>
              <span className="text-sm font-medium">{status.responseTime}ms</span>
            </div>
          )}
          
          <div className="flex justify-between">
            <span className="text-sm text-gray-600">Last Checked:</span>
            <span className="text-sm font-medium">
              {status.lastChecked.toLocaleTimeString()}
            </span>
          </div>
          
          {status.error && (
            <Alert>
              <AlertDescription>
                Error: {status.error}
              </AlertDescription>
            </Alert>
          )}
          
          <button
            onClick={checkConnection}
            disabled={isChecking}
            className="w-full px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isChecking ? 'Checking...' : 'Check Connection'}
          </button>
        </div>
      </CardContent>
    </Card>
  );
};
