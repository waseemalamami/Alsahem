import React from 'react';
import { ApiConnectionTest } from '../components/ApiConnectionTest';
import { ConnectionStatus } from '../components/ConnectionStatus';
import { BackendIntegrationTest } from '../components/BackendIntegrationTest';
import { RegistrationTest } from '../components/RegistrationTest';
import { RealDataPropertyList } from '../components/RealDataPropertyList';
import { RealDataInvestmentList } from '../components/RealDataInvestmentList';
import { RealDataUserDashboard } from '../components/RealDataUserDashboard';
import Navigation from '../components/Navigation';

export const ApiTest: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation />
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-6xl mx-auto">
          <h1 className="text-3xl font-bold text-gray-900 mb-8 text-center">
            API Connection Test
          </h1>
          <p className="text-gray-600 mb-8 text-center">
            This page tests the connection between the React frontend and .NET backend API.
          </p>
          <div className="space-y-8">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              <div className="lg:col-span-2">
                <ApiConnectionTest />
              </div>
              <div>
                <ConnectionStatus />
              </div>
            </div>
            <BackendIntegrationTest />
            <RegistrationTest />
            <RealDataPropertyList />
            <RealDataInvestmentList />
            <RealDataUserDashboard />
          </div>
        </div>
      </div>
    </div>
  );
};
