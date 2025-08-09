import Navigation from '@/components/Navigation';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';

const NotFound = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-blue-50 via-white to-blue-50 font-['Cairo',sans-serif]" dir="rtl">
      <Navigation />
      <div className="flex flex-col items-center justify-center flex-1">
        <h1 className="text-6xl font-bold text-blue-600 mb-4">404</h1>
        <p className="text-xl text-gray-700 mb-8">عذراً، الصفحة غير موجودة</p>
        <Link to="/">
          <Button className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-6 py-3 rounded">
            العودة إلى الرئيسية
          </Button>
        </Link>
      </div>
    </div>
  );
};

export default NotFound; 