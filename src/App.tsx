import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import { ErrorBoundary } from './components/error-boundary';
import { ToastProvider } from './components/ui/toast-provider';
import { AuthProvider } from './contexts/AuthContext';
import { VisitorRoute, InvestorRoute, AuthRoute } from './components/ProtectedRoute';
import Index from './pages/Index';
import Investments from './pages/Investments';
import InvestmentDetail from './pages/InvestmentDetail';
import About from './pages/About';
import Contact from './pages/Contact';
import Login from './pages/Login';
import Register from './pages/Register';
import UserDashboard from './components/UserDashboard';
import NotFound from './pages/NotFound';

function App() {
  return (
    <ErrorBoundary>
      <AuthProvider>
        <Router>
          <div className="App">
            <Routes>
              {/* Public Routes - Available to all users */}
              <Route path="/" element={<VisitorRoute><Index /></VisitorRoute>} />
              <Route path="/investments" element={<VisitorRoute><Investments /></VisitorRoute>} />
              <Route path="/investments/:id" element={<VisitorRoute><InvestmentDetail /></VisitorRoute>} />
              <Route path="/about" element={<VisitorRoute><About /></VisitorRoute>} />
              <Route path="/contact" element={<VisitorRoute><Contact /></VisitorRoute>} />
              
              {/* Authentication Routes - Redirect if already logged in */}
              <Route path="/login" element={<VisitorRoute><Login /></VisitorRoute>} />
              <Route path="/register" element={<VisitorRoute><Register /></VisitorRoute>} />
              
              {/* Protected Routes - Require authentication */}
              <Route path="/dashboard" element={<InvestorRoute><UserDashboard /></InvestorRoute>} />
              
              {/* 404 Route */}
              <Route path="*" element={<NotFound />} />
            </Routes>
          </div>
          <ToastProvider />
        </Router>
      </AuthProvider>
    </ErrorBoundary>
  );
}

export default App;
