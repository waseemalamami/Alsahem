import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Mail, Phone, MapPin } from "lucide-react";
import Navigation from '@/components/Navigation';


const Contact = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-blue-50 font-['Cairo',sans-serif]" dir="rtl">
      <Navigation />
      

      
      <section className="py-20">
        <div className="max-w-4xl mx-auto px-4">
          <Card className="shadow-lg">
            <CardHeader>
              <CardTitle className="text-3xl font-bold text-blue-600 mb-2">تواصل معنا</CardTitle>
              <p className="text-gray-600">نحن هنا للإجابة على جميع استفساراتك</p>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-8">
                <div className="flex flex-col items-center">
                  <MapPin className="h-8 w-8 text-blue-600 mb-2" />
                  <h3 className="font-semibold mb-1">العنوان</h3>
                  <p className="text-gray-600 text-sm">طرابلس، ليبيا</p>
                </div>
                <div className="flex flex-col items-center">
                  <Phone className="h-8 w-8 text-blue-600 mb-2" />
                  <h3 className="font-semibold mb-1">الهاتف</h3>
                  <p className="text-gray-600 text-sm">+218 91 234 5678</p>
                </div>
                <div className="flex flex-col items-center">
                  <Mail className="h-8 w-8 text-blue-600 mb-2" />
                  <h3 className="font-semibold mb-1">البريد الإلكتروني</h3>
                  <p className="text-gray-600 text-sm">info@alsaham.ly</p>
                </div>
              </div>
              <form className="mt-12 grid grid-cols-1 gap-6">
                <input type="text" placeholder="الاسم الكامل" className="p-3 rounded border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500" />
                <input type="email" placeholder="البريد الإلكتروني" className="p-3 rounded border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500" />
                <textarea placeholder="رسالتك" rows={5} className="p-3 rounded border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500" />
                <Button type="submit" className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded">
                  إرسال
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>
      </section>
    </div>
  );
};

export default Contact; 