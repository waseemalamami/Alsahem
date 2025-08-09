import { Button } from "@/components/ui/button";

const HeroBanner = () => {
  return (
    <div className="relative h-96 bg-gradient-to-r from-blue-600 to-blue-800 text-white overflow-hidden">
      <div className="absolute inset-0 bg-black opacity-20"></div>
      <div 
        className="absolute inset-0 bg-cover bg-center opacity-30"
        style={{
          backgroundImage: `url('/lovable-uploads/72555550-2f5a-402f-8aa8-8b5bd697d43f.png')`
        }}
      ></div>
      
      <div className="relative z-10 h-full flex items-center justify-center">
        <div className="text-center max-w-4xl mx-auto px-4">
          <h1 className="text-4xl md:text-6xl font-bold mb-6">
            اكتشف العقارات
          </h1>
          <p className="text-xl md:text-2xl mb-8 opacity-90">
            نقدم لك خيارات متنوعة من الشقق، الفيلات، والمنازل
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Button size="lg" className="bg-white text-blue-600 hover:bg-gray-100 font-semibold px-8">
              ابدأ الآن
            </Button>
            <Button size="lg" variant="outline" className="bg-white border-blue-600 text-blue-600 hover:bg-blue-50 hover:text-blue-700 hover:border-blue-700 px-8 font-semibold">
              تصفح العقارات
            </Button>
          </div>
          
          {/* Property Type Icons */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-12 max-w-2xl mx-auto">
            <div className="bg-white bg-opacity-20 backdrop-blur-sm rounded-lg p-4 text-center hover:bg-opacity-30 transition-all cursor-pointer">
              <div className="text-3xl mb-2">🏢</div>
              <p className="font-semibold">شقق</p>
            </div>
            <div className="bg-white bg-opacity-20 backdrop-blur-sm rounded-lg p-4 text-center hover:bg-opacity-30 transition-all cursor-pointer">
              <div className="text-3xl mb-2">🏠</div>
              <p className="font-semibold">منازل</p>
            </div>
            <div className="bg-white bg-opacity-20 backdrop-blur-sm rounded-lg p-4 text-center hover:bg-opacity-30 transition-all cursor-pointer">
              <div className="text-3xl mb-2">🏰</div>
              <p className="font-semibold">فيلات</p>
            </div>
            <div className="bg-white bg-opacity-20 backdrop-blur-sm rounded-lg p-4 text-center hover:bg-opacity-30 transition-all cursor-pointer">
              <div className="text-3xl mb-2">🌍</div>
              <p className="font-semibold">أراضي</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroBanner;
