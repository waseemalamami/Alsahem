import { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  Wallet as WalletIcon, 
  TrendingUp, 
  TrendingDown, 
  Plus, 
  Minus, 
  ArrowUpDown,
  CreditCard,
  Building,
  Smartphone,
  Shield,
  History,
  Download,
  Eye,
  EyeOff,
  RefreshCw,
  AlertCircle,
  CheckCircle,
  Clock
} from "lucide-react";

interface Transaction {
  id: string;
  type: 'deposit' | 'withdrawal' | 'investment' | 'return' | 'transfer' | 'company_transfer';
  amount: number;
  status: 'pending' | 'processing' | 'completed' | 'failed' | 'cancelled';
  description: string;
  date: string;
  reference: string;
  companyReference?: string; // Reference from main company system
  estimatedCompletion?: string; // Estimated completion time
}

interface PaymentMethod {
  id: string;
  type: 'bank' | 'card' | 'mobile' | 'company_system';
  name: string;
  last4?: string;
  isDefault: boolean;
  isActive: boolean;
  companyAccountId?: string; // ID in main company system
}

interface VirtualWalletData {
  balance: {
    available: number;
    invested: number;
    pending: number;
    frozen: number;
    processing: number; // Transactions being processed by main company
  };
  totalBalance: number;
  lastSync: string;
  syncStatus: 'synced' | 'syncing' | 'error';
  nextSync: string;
}

const Wallet = () => {
  const [showBalance, setShowBalance] = useState(true);
  const [selectedAction, setSelectedAction] = useState<'deposit' | 'withdrawal' | 'transfer' | null>(null);
  const [amount, setAmount] = useState('');
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState<string>('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [syncStatus, setSyncStatus] = useState<'synced' | 'syncing' | 'error'>('synced');

  // Virtual wallet data - would sync with main company system
  const [walletData, setWalletData] = useState<VirtualWalletData>({
    balance: {
      available: 25000,
      invested: 180000,
      pending: 5000,
      frozen: 0,
      processing: 15000
    },
    totalBalance: 25000 + 180000 + 5000 + 15000,
    lastSync: new Date().toISOString(),
    syncStatus: 'synced',
    nextSync: new Date(Date.now() + 5 * 60 * 1000).toISOString() // 5 minutes from now
  });

  const transactions: Transaction[] = [
    {
      id: '1',
      type: 'deposit',
      amount: 50000,
      status: 'completed',
      description: 'إيداع من البنك التجاري',
      date: '2024-01-15',
      reference: 'DEP-001',
      companyReference: 'COMP-2024-001-50000',
      estimatedCompletion: '2024-01-15T10:30:00Z'
    },
    {
      id: '2',
      type: 'investment',
      amount: -25000,
      status: 'completed',
      description: 'استثمار في مشروع فيلات السكني',
      date: '2024-01-10',
      reference: 'INV-001',
      companyReference: 'COMP-2024-001-25000',
      estimatedCompletion: '2024-01-10T14:15:00Z'
    },
    {
      id: '3',
      type: 'return',
      amount: 3000,
      status: 'completed',
      description: 'عائد من مشروع برج الأعمال',
      date: '2024-01-08',
      reference: 'RET-001',
      companyReference: 'COMP-2024-001-3000',
      estimatedCompletion: '2024-01-08T09:45:00Z'
    },
    {
      id: '4',
      type: 'withdrawal',
      amount: -10000,
      status: 'processing',
      description: 'سحب إلى البنك التجاري',
      date: '2024-01-12',
      reference: 'WTH-001',
      companyReference: 'COMP-2024-001-10000',
      estimatedCompletion: '2024-01-13T16:00:00Z'
    },
    {
      id: '5',
      type: 'company_transfer',
      amount: 15000,
      status: 'processing',
      description: 'تحويل من النظام الرئيسي للشركة',
      date: '2024-01-16',
      reference: 'CT-001',
      companyReference: 'COMP-2024-001-15000',
      estimatedCompletion: '2024-01-16T18:00:00Z'
    }
  ];

  const paymentMethods: PaymentMethod[] = [
    {
      id: '1',
      type: 'company_system',
      name: 'النظام الرئيسي للشركة',
      isDefault: true,
      isActive: true,
      companyAccountId: 'COMP-ACC-001'
    },
    {
      id: '2',
      type: 'bank',
      name: 'البنك التجاري',
      last4: '1234',
      isDefault: false,
      isActive: true,
      companyAccountId: 'COMP-BANK-001'
    },
    {
      id: '3',
      type: 'card',
      name: 'بطاقة ائتمان',
      last4: '5678',
      isDefault: false,
      isActive: true,
      companyAccountId: 'COMP-CARD-001'
    },
    {
      id: '4',
      type: 'mobile',
      name: 'محفظة إلكترونية',
      isDefault: false,
      isActive: false,
      companyAccountId: 'COMP-MOBILE-001'
    }
  ];

  const formatCurrency = (amount: number) => {
    return `${amount.toLocaleString('en-US')} د.ل`;
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('ar-LY');
  };

  const formatTime = (dateString: string) => {
    return new Date(dateString).toLocaleTimeString('ar-LY', { 
      hour: '2-digit', 
      minute: '2-digit' 
    });
  };

  const getTransactionIcon = (type: string) => {
    switch (type) {
      case 'deposit': return <Plus className="h-4 w-4 text-green-600" />;
      case 'withdrawal': return <Minus className="h-4 w-4 text-red-600" />;
      case 'investment': return <TrendingUp className="h-4 w-4 text-blue-600" />;
      case 'return': return <TrendingUp className="h-4 w-4 text-green-600" />;
      case 'transfer': return <ArrowUpDown className="h-4 w-4 text-purple-600" />;
      case 'company_transfer': return <Building className="h-4 w-4 text-indigo-600" />;
      default: return <ArrowUpDown className="h-4 w-4 text-gray-600" />;
    }
  };

  const getTransactionColor = (type: string) => {
    switch (type) {
      case 'deposit': return 'text-green-600';
      case 'return': return 'text-green-600';
      case 'withdrawal': return 'text-red-600';
      case 'investment': return 'text-blue-600';
      case 'company_transfer': return 'text-indigo-600';
      default: return 'text-gray-600';
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'completed':
        return <Badge className="bg-green-100 text-green-800 border-2 border-green-300 rounded-xl px-2 py-1 text-xs flex items-center gap-1">
          <CheckCircle className="h-3 w-3" />
          مكتمل
        </Badge>;
      case 'processing':
        return <Badge className="bg-blue-100 text-blue-800 border-2 border-blue-300 rounded-xl px-2 py-1 text-xs flex items-center gap-1">
          <Clock className="h-3 w-3" />
          قيد المعالجة
        </Badge>;
      case 'pending':
        return <Badge className="bg-yellow-100 text-yellow-800 border-2 border-yellow-300 rounded-xl px-2 py-1 text-xs flex items-center gap-1">
          <Clock className="h-3 w-3" />
          في انتظار التأكيد
        </Badge>;
      case 'failed':
        return <Badge className="bg-red-100 text-red-800 border-2 border-red-300 rounded-xl px-2 py-1 text-xs flex items-center gap-1">
          <AlertCircle className="h-3 w-3" />
          فشل
        </Badge>;
      case 'cancelled':
        return <Badge className="bg-gray-100 text-gray-800 border-2 border-gray-300 rounded-xl px-2 py-1 text-xs flex items-center gap-1">
          <AlertCircle className="h-3 w-3" />
          ملغي
        </Badge>;
      default:
        return <Badge className="bg-gray-100 text-gray-800 border-2 border-gray-300 rounded-xl px-2 py-1 text-xs">غير معروف</Badge>;
    }
  };

  const syncWithMainSystem = async () => {
    setSyncStatus('syncing');
    setIsProcessing(true);
    
    try {
      // Simulate API call to main company system
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Update wallet data (in real app, this would come from main system)
      setWalletData(prev => ({
        ...prev,
        lastSync: new Date().toISOString(),
        syncStatus: 'synced',
        nextSync: new Date(Date.now() + 5 * 60 * 1000).toISOString()
      }));
      
      setSyncStatus('synced');
    } catch (error) {
      setSyncStatus('error');
      console.error('Failed to sync with main system:', error);
    } finally {
      setIsProcessing(false);
    }
  };

  const handleTransaction = async () => {
    if (!amount || !selectedPaymentMethod) return;
    
    const numAmount = parseFloat(amount);
    if (isNaN(numAmount) || numAmount <= 0) return;

    setIsProcessing(true);
    
    try {
      // Simulate sending transaction to main company system
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Here you would integrate with your main company system
      const actionText = selectedAction === 'deposit' ? 'الإيداع' : 
                        selectedAction === 'withdrawal' ? 'السحب' : 'التحويل';
      
      alert(`تم إرسال طلب ${actionText} بقيمة ${formatCurrency(numAmount)} إلى النظام الرئيسي للشركة. سيتم معالجته خلال 24-48 ساعة حسب نوع العملية.`);
      
      setSelectedAction(null);
      setAmount('');
      setSelectedPaymentMethod('');
      
      // Refresh wallet data after transaction
      await syncWithMainSystem();
      
    } catch (error) {
      alert('حدث خطأ أثناء إرسال الطلب. يرجى المحاولة مرة أخرى.');
      console.error('Transaction error:', error);
    } finally {
      setIsProcessing(false);
    }
  };

  // Auto-sync every 5 minutes
  useEffect(() => {
    const interval = setInterval(syncWithMainSystem, 5 * 60 * 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="space-y-6">
      {/* Wallet Header with Sync Status */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="p-3 bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl">
            <WalletIcon className="h-6 w-6 text-white" />
          </div>
          <div>
            <h2 className="text-2xl font-bold text-gray-800">المحفظة الافتراضية</h2>
            <p className="text-gray-600">متصلة بالنظام الرئيسي للشركة</p>
          </div>
        </div>
        <div className="flex items-center gap-3">
          {/* Sync Status */}
          <div className="flex items-center gap-2">
            <div className={`w-2 h-2 rounded-full ${
              syncStatus === 'synced' ? 'bg-green-500' : 
              syncStatus === 'syncing' ? 'bg-yellow-500' : 'bg-red-500'
            }`}></div>
            <span className="text-xs text-gray-600">
              {syncStatus === 'synced' ? 'متزامن' : 
               syncStatus === 'syncing' ? 'جاري التزامن' : 'خطأ في التزامن'}
            </span>
          </div>
          
          {/* Sync Button */}
          <Button
            variant="outline"
            size="sm"
            onClick={syncWithMainSystem}
            disabled={isProcessing || syncStatus === 'syncing'}
            className="border-2 border-blue-300 text-blue-600 hover:bg-blue-50 rounded-xl"
          >
            <RefreshCw className={`h-4 w-4 ml-2 ${syncStatus === 'syncing' ? 'animate-spin' : ''}`} />
            تحديث
          </Button>
          
          {/* Balance Toggle */}
          <Button
            variant="outline"
            size="sm"
            onClick={() => setShowBalance(!showBalance)}
            className="border-2 border-gray-300 rounded-xl"
          >
            {showBalance ? <EyeOff className="h-4 w-4 ml-2" /> : <Eye className="h-4 w-4 ml-2" />}
            {showBalance ? 'إخفاء الرصيد' : 'إظهار الرصيد'}
          </Button>
        </div>
      </div>

      {/* System Integration Notice */}
      <Card className="border-2 border-blue-200 bg-gradient-to-r from-blue-50 to-blue-100">
        <CardContent className="p-4">
          <div className="flex items-center gap-3">
            <Building className="h-5 w-5 text-blue-600" />
            <div className="flex-1">
              <p className="text-sm text-blue-800 font-semibold">
                محفظة افتراضية متصلة بالنظام الرئيسي للشركة
              </p>
              <p className="text-xs text-blue-700">
                جميع المعاملات تتم من خلال النظام المالي الرئيسي للشركة مع ضمانات أمنية كاملة
              </p>
            </div>
            <Badge className="bg-blue-200 text-blue-800 border-2 border-blue-300 rounded-xl px-2 py-1 text-xs">
              نظام آمن
            </Badge>
          </div>
        </CardContent>
      </Card>

      {/* Balance Overview */}
      <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
        <Card className="border-2 border-blue-100 shadow-lg hover:shadow-xl transition-all duration-300">
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-blue-600 mb-1">
              {showBalance ? formatCurrency(walletData.balance.available) : '***'}
            </div>
            <div className="text-xs text-gray-600">الرصيد المتاح</div>
          </CardContent>
        </Card>
        <Card className="border-2 border-green-100 shadow-lg hover:shadow-xl transition-all duration-300">
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-green-600 mb-1">
              {showBalance ? formatCurrency(walletData.balance.invested) : '***'}
            </div>
            <div className="text-xs text-gray-600">المستثمر</div>
          </CardContent>
        </Card>
        <Card className="border-2 border-yellow-100 shadow-lg hover:shadow-xl transition-all duration-300">
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-yellow-600 mb-1">
              {showBalance ? formatCurrency(walletData.balance.pending) : '***'}
            </div>
            <div className="text-xs text-gray-600">في انتظار التأكيد</div>
          </CardContent>
        </Card>
        <Card className="border-2 border-blue-200 shadow-lg hover:shadow-xl transition-all duration-300">
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-blue-600 mb-1">
              {showBalance ? formatCurrency(walletData.balance.processing) : '***'}
            </div>
            <div className="text-xs text-gray-600">قيد المعالجة</div>
          </CardContent>
        </Card>
        <Card className="border-2 border-purple-100 shadow-lg hover:shadow-xl transition-all duration-300">
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-purple-600 mb-1">
              {showBalance ? formatCurrency(walletData.totalBalance) : '***'}
            </div>
            <div className="text-xs text-gray-600">إجمالي الرصيد</div>
          </CardContent>
        </Card>
      </div>

      {/* Last Sync Info */}
      <div className="text-center text-xs text-gray-500">
        آخر تحديث: {formatDate(walletData.lastSync)} {formatTime(walletData.lastSync)} | 
        التحديث التالي: {formatDate(walletData.nextSync)} {formatTime(walletData.nextSync)}
      </div>

      {/* Quick Actions */}
      <Card className="border-2 border-gray-100 shadow-lg">
        <CardHeader className="bg-gradient-to-r from-gray-50 to-gray-100 rounded-t-2xl">
          <CardTitle className="text-lg text-gray-800 flex items-center gap-2">
            <Shield className="h-5 w-5 text-gray-600" />
            العمليات السريعة
          </CardTitle>
        </CardHeader>
        <CardContent className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Button 
              className="h-16 bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-[1.02] rounded-2xl font-bold"
              onClick={() => setSelectedAction('deposit')}
              disabled={isProcessing}
            >
              <Plus className="h-5 w-5 ml-2" />
              إيداع
            </Button>
            <Button 
              className="h-16 bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-[1.02] rounded-2xl font-bold"
              onClick={() => setSelectedAction('withdrawal')}
              disabled={isProcessing}
            >
              <Minus className="h-5 w-5 ml-2" />
              سحب
            </Button>
            <Button 
              className="h-16 bg-gradient-to-r from-purple-500 to-purple-600 hover:from-purple-600 hover:to-purple-700 text-white shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-[1.02] rounded-2xl font-bold"
              onClick={() => setSelectedAction('transfer')}
              disabled={isProcessing}
            >
              <ArrowUpDown className="h-5 w-5 ml-2" />
              تحويل
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Payment Methods */}
      <Card className="border-2 border-indigo-100 shadow-lg">
        <CardHeader className="bg-gradient-to-r from-indigo-50 to-indigo-100 rounded-t-2xl">
          <CardTitle className="text-lg text-indigo-800 flex items-center gap-2">
            <CreditCard className="h-5 w-5 text-indigo-600" />
            طرق الدفع المتصلة
          </CardTitle>
        </CardHeader>
        <CardContent className="p-6">
          <div className="space-y-3">
            {paymentMethods.map((method) => (
              <div key={method.id} className={`flex items-center justify-between p-4 rounded-2xl border-2 shadow-sm hover:shadow-md transition-all duration-300 ${
                method.isActive ? 'bg-white border-indigo-100' : 'bg-gray-50 border-gray-200'
              }`}>
                <div className="flex items-center gap-3">
                  <div className={`p-2 rounded-xl ${
                    method.isActive ? 'bg-indigo-100' : 'bg-gray-100'
                  }`}>
                    {method.type === 'company_system' && <Building className="h-5 w-5 text-indigo-600" />}
                    {method.type === 'bank' && <Building className="h-5 w-5 text-indigo-600" />}
                    {method.type === 'card' && <CreditCard className="h-5 w-5 text-indigo-600" />}
                    {method.type === 'mobile' && <Smartphone className="h-5 w-5 text-indigo-600" />}
                  </div>
                  <div>
                    <div className={`font-semibold ${method.isActive ? 'text-gray-800' : 'text-gray-500'}`}>
                      {method.name}
                    </div>
                    {method.last4 && <div className="text-sm text-gray-500">**** {method.last4}</div>}
                    {method.companyAccountId && (
                      <div className="text-xs text-indigo-600 font-mono">ID: {method.companyAccountId}</div>
                    )}
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  {method.isDefault && (
                    <Badge className="bg-green-100 text-green-800 border-2 border-green-300 rounded-xl px-2 py-1 text-xs">
                      افتراضي
                    </Badge>
                  )}
                  {!method.isActive && (
                    <Badge className="bg-gray-100 text-gray-800 border-2 border-gray-300 rounded-xl px-2 py-1 text-xs">
                      غير نشط
                    </Badge>
                  )}
                  <Button 
                    variant="outline" 
                    size="sm" 
                    className={`rounded-xl ${
                      method.isActive 
                        ? 'border-2 border-indigo-200 text-indigo-600 hover:bg-indigo-50' 
                        : 'border-2 border-gray-200 text-gray-500 cursor-not-allowed'
                    }`}
                    disabled={!method.isActive}
                  >
                    تعديل
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Transaction History */}
      <Card className="border-2 border-gray-100 shadow-lg">
        <CardHeader className="bg-gradient-to-r from-gray-50 to-gray-100 rounded-t-2xl">
          <CardTitle className="text-lg text-gray-800 flex items-center gap-2">
            <History className="h-5 w-5 text-gray-600" />
            سجل المعاملات
          </CardTitle>
        </CardHeader>
        <CardContent className="p-6">
          <div className="space-y-3">
            {transactions.map((transaction) => (
              <div key={transaction.id} className="flex items-center justify-between p-4 bg-white rounded-2xl border-2 border-gray-100 shadow-sm hover:shadow-md transition-all duration-300">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-gray-100 rounded-xl">
                    {getTransactionIcon(transaction.type)}
                  </div>
                  <div>
                    <div className="font-semibold text-gray-800">{transaction.description}</div>
                    <div className="text-sm text-gray-500">{formatDate(transaction.date)}</div>
                    <div className="text-xs text-gray-400">رقم المرجع: {transaction.reference}</div>
                    {transaction.companyReference && (
                      <div className="text-xs text-indigo-600 font-mono">
                        مرجع الشركة: {transaction.companyReference}
                      </div>
                    )}
                  </div>
                </div>
                <div className="text-right">
                  <div className={`font-bold text-lg ${getTransactionColor(transaction.type)}`}>
                    {transaction.amount > 0 ? '+' : ''}{formatCurrency(Math.abs(transaction.amount))}
                  </div>
                  {getStatusBadge(transaction.status)}
                  {transaction.estimatedCompletion && transaction.status === 'processing' && (
                    <div className="text-xs text-blue-600 mt-1">
                      متوقع: {formatDate(transaction.estimatedCompletion)}
                    </div>
                  )}
                </div>
              </div>
            ))}
            <div className="text-center pt-4">
              <Button variant="outline" className="border-2 border-gray-300 text-gray-600 hover:bg-gray-50 rounded-2xl">
                <Download className="h-4 w-4 ml-2" />
                تحميل كشف الحساب
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Transaction Modal */}
      {selectedAction && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 z-50">
          <Card className="w-full max-w-sm border-0 shadow-2xl bg-white rounded-3xl">
            <CardHeader className={`text-white rounded-t-3xl pb-4 ${
              selectedAction === 'deposit' ? 'bg-gradient-to-r from-green-500 to-green-600' :
              selectedAction === 'withdrawal' ? 'bg-gradient-to-r from-red-500 to-red-600' :
              'bg-gradient-to-r from-purple-500 to-purple-600'
            }`}>
              <CardTitle className="text-lg flex items-center gap-2 justify-center">
                {selectedAction === 'deposit' && <Plus className="h-5 w-5" />}
                {selectedAction === 'withdrawal' && <Minus className="h-5 w-5" />}
                {selectedAction === 'transfer' && <ArrowUpDown className="h-5 w-5" />}
                {selectedAction === 'deposit' ? 'إيداع' : selectedAction === 'withdrawal' ? 'سحب' : 'تحويل'}
              </CardTitle>
            </CardHeader>
            <CardContent className="p-6">
              <div className="space-y-4">
                {/* System Notice */}
                <div className="p-3 bg-blue-50 rounded-2xl border border-blue-200">
                  <div className="flex items-center gap-2 mb-2">
                    <Building className="h-4 w-4 text-blue-600" />
                    <span className="text-sm font-semibold text-blue-800">النظام الرئيسي للشركة</span>
                  </div>
                  <p className="text-xs text-blue-700">
                    سيتم إرسال طلبك إلى النظام المالي الرئيسي للشركة للمعالجة والموافقة
                  </p>
                </div>

                {/* Amount Input */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2 text-center">
                    المبلغ
                  </label>
                  <div className="flex items-center gap-2">
                    <input
                      type="number"
                      min="0.01"
                      step="0.01"
                      value={amount}
                      onChange={(e) => setAmount(e.target.value)}
                      className="flex-1 p-3 border-2 border-gray-200 rounded-3xl focus:border-blue-400 focus:outline-none text-center text-lg font-semibold bg-white"
                      placeholder="0.00"
                      disabled={isProcessing}
                    />
                    <span className="text-sm text-gray-600 font-medium">د.ل</span>
                  </div>
                </div>

                {/* Payment Method Selection */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2 text-center">
                    طريقة الدفع
                  </label>
                  <select
                    value={selectedPaymentMethod}
                    onChange={(e) => setSelectedPaymentMethod(e.target.value)}
                    className="w-full p-3 border-2 border-gray-200 rounded-3xl focus:border-blue-400 focus:outline-none text-center text-lg font-semibold bg-white"
                    disabled={isProcessing}
                  >
                    <option value="">اختر طريقة الدفع</option>
                    {paymentMethods.filter(m => m.isActive).map((method) => (
                      <option key={method.id} value={method.id}>
                        {method.name}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Action Buttons */}
                <div className="flex gap-3 pt-2">
                  <Button 
                    className={`flex-1 text-white shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-[1.02] rounded-3xl h-11 font-bold ${
                      selectedAction === 'deposit' ? 'bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700' :
                      selectedAction === 'withdrawal' ? 'bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700' :
                      'bg-gradient-to-r from-purple-500 to-purple-600 hover:from-purple-600 hover:to-purple-700'
                    }`}
                    onClick={handleTransaction}
                    disabled={!amount || !selectedPaymentMethod || isProcessing}
                  >
                    {isProcessing ? (
                      <>
                        <RefreshCw className="h-4 w-4 ml-2 animate-spin" />
                        جاري المعالجة...
                      </>
                    ) : (
                      <>
                        {selectedAction === 'deposit' ? 'تأكيد الإيداع' : 
                         selectedAction === 'withdrawal' ? 'تأكيد السحب' : 'تأكيد التحويل'}
                      </>
                    )}
                  </Button>
                  <Button 
                    variant="outline" 
                    className="flex-1 border-2 border-gray-300 text-gray-600 hover:bg-gray-50 rounded-3xl font-semibold h-11"
                    onClick={() => {
                      setSelectedAction(null);
                      setAmount('');
                      setSelectedPaymentMethod('');
                    }}
                    disabled={isProcessing}
                  >
                    إلغاء
                  </Button>
                </div>

                {/* Processing Info */}
                <div className="text-center p-3 bg-yellow-50 rounded-3xl border border-yellow-200">
                  <p className="text-xs text-yellow-700">
                    ⏱️ وقت المعالجة: 24-48 ساعة حسب نوع العملية
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
};

export default Wallet;
