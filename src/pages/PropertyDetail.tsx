import { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";
import { Separator } from "@/components/ui/separator";
import { 
  MapPin, 
  Bed, 
  Bath, 
  Square, 
  Car, 
  Star, 
  TrendingUp,
  Building2,
  Calendar,
  Eye,
  Heart,
  Phone,
  Mail,
  Clock,
  Users,
  Target,
  DollarSign,
  ArrowLeft,
  ChevronLeft,
  ChevronRight,
  Download,
  FileText,
  CheckCircle,
  AlertCircle
} from "lucide-react";
import Navigation from '@/components/Navigation';

const PropertyDetail = () => {
  const { id } = useParams();
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isFavorite, setIsFavorite] = useState(false);
  const [activeTab, setActiveTab] = useState("overview");

  // Sample property data - in real app this would come from API
  const property = {
    id: "1",
    title: "فيلا فاخرة في حي السكني",
    location: "طرابلس، حي السكني",
    price: 850000,
    originalPrice: 900000,
    bedrooms: 4,
    bathrooms: 3,
    area: 280,
    parking: 2,
    type: "فيلا",
    status: "available" as const,
    images: [
      "https://images.unsplash.com/photo-1613490493576-7fde63acd811?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1570129477492-45c003edd2be?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800&h=600&fit=crop"
    ],
    rating: 4.8,
    views: 156,
    listedDate: "2024-01-15",
    investmentReturn: 12.5,
    installmentAvailable: true,
    sharesAvailable: true,
    description: "فيلا فاخرة حديثة البناء في أحد أفضل الأحياء السكنية في طرابلس. تتميز بتصميم عصري ومساحات واسعة مع إطلالات خلابة. الفيلا مجهزة بأحدث التقنيات والمواد عالية الجودة.",
    features: [
      "مكيفات مركزية",
      "مطبخ مجهز بالكامل",
      "حديقة خاصة",
      "مسبح",
      "مصعد",
      "نظام أمان متطور",
      "موقف سيارات مغطى",
      "غرفة خادمة"
    ],
    amenities: [
      "مدرسة قريبة",
      "مستشفى",
      "مركز تجاري",
      "مطاعم",
      "حديقة عامة",
      "محطة بنزين",
      "مسجد"
    ],
    specifications: {
      constructionYear: 2023,
      floors: 3,
      landArea: 400,
      buildingArea: 280,
      orientation: "شمال شرق",
      parkingType: "مغطى",
      heating: "مركزي",
      cooling: "مكيفات",
      internet: "ألياف بصرية"
    },
    agent: {
      name: "أحمد محمد",
      phone: "+218 91 234 5678",
      email: "ahmed@alsaham.ly",
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face",
      rating: 4.9,
      properties: 45
    },
    documents: [
      { name: "عقد البيع", type: "pdf", size: "2.3 MB" },
      { name: "مخطط الأرض", type: "pdf", size: "1.8 MB" },
      { name: "شهادة الملكية", type: "pdf", size: "1.2 MB" }
    ]
  };

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('ar-LY', {
      style: 'currency',
      currency: 'LYD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(price);
  };

  const nextImage = () => {
    setCurrentImageIndex((prev) => 
      prev === property.images.length - 1 ? 0 : prev + 1
    );
  };

  const prevImage = () => {
    setCurrentImageIndex((prev) => 
      prev === 0 ? property.images.length - 1 : prev - 1
    );
  };

  const handleFavorite = () => {
    setIsFavorite(!isFavorite);
  };

  return (
    <div className="min-h-screen bg-gray-50 font-['Cairo',sans-serif]" dir="rtl">
      <Navigation />
      
      {/* Breadcrumb */}
      <div className="bg-white border-b border-gray-200 py-3">
        <div className="max-w-6xl mx-auto px-4">
          <div className="flex items-center space-x-2 space-x-reverse text-sm text-gray-600">
            <Link to="/" className="hover:text-blue-600">الرئيسية</Link>
            <span>/</span>
            <Link to="/properties" className="hover:text-blue-600">العقارات</Link>
            <span>/</span>
            <span className="text-gray-900">{property.title}</span>
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 py-6">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Image Gallery */}
            <Card className="overflow-hidden">
              <div className="relative">
                <img 
                  src={property.images[currentImageIndex]} 
                  alt={property.title}
                  className="w-full h-96 object-cover"
                />
                
                {/* Navigation Arrows */}
                <Button 
                  variant="ghost" 
                  size="sm" 
                  className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white/80 hover:bg-white"
                  onClick={prevImage}
                >
                  <ChevronLeft className="h-4 w-4" />
                </Button>
                <Button 
                  variant="ghost" 
                  size="sm" 
                  className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white/80 hover:bg-white"
                  onClick={nextImage}
                >
                  <ChevronRight className="h-4 w-4" />
                </Button>

                {/* Image Counter */}
                <div className="absolute bottom-4 left-4 bg-black/60 text-white px-2 py-1 rounded text-sm">
                  {currentImageIndex + 1} / {property.images.length}
                </div>

                                 {/* Action Buttons */}
                 <div className="absolute top-4 right-4 flex space-x-2 space-x-reverse">
                   <Button 
                     size="sm" 
                     variant="ghost" 
                     className="bg-white/80 hover:bg-white"
                     onClick={handleFavorite}
                   >
                     <Heart className={`h-4 w-4 ${isFavorite ? 'fill-red-500 text-red-500' : ''}`} />
                   </Button>
                 </div>


              </div>

              {/* Thumbnail Gallery */}
              <div className="p-4">
                <div className="flex space-x-2 space-x-reverse overflow-x-auto">
                  {property.images.map((image, index) => (
                    <img 
                      key={index}
                      src={image} 
                      alt={`صورة ${index + 1}`}
                      className={`w-20 h-16 object-cover rounded cursor-pointer border-2 ${
                        index === currentImageIndex ? 'border-blue-600' : 'border-gray-200'
                      }`}
                      onClick={() => setCurrentImageIndex(index)}
                    />
                  ))}
                </div>
              </div>
            </Card>

            {/* Property Info Tabs */}
            <Card>
              <Tabs value={activeTab} onValueChange={setActiveTab}>
                <TabsList className="grid w-full grid-cols-4">
                  <TabsTrigger value="overview">نظرة عامة</TabsTrigger>
                  <TabsTrigger value="details">التفاصيل</TabsTrigger>
                  <TabsTrigger value="location">الموقع</TabsTrigger>
                  <TabsTrigger value="documents">المستندات</TabsTrigger>
                </TabsList>

                <TabsContent value="overview" className="p-6">
                  <div className="space-y-6">
                    <div>
                      <h3 className="text-lg font-semibold mb-3">الوصف</h3>
                      <p className="text-gray-600 leading-relaxed">{property.description}</p>
                    </div>

                    <div>
                      <h3 className="text-lg font-semibold mb-3">المميزات</h3>
                      <div className="grid grid-cols-2 gap-2">
                        {property.features.map((feature, index) => (
                          <div key={index} className="flex items-center space-x-2 space-x-reverse">
                            <CheckCircle className="h-4 w-4 text-green-600" />
                            <span className="text-sm text-gray-700">{feature}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div>
                      <h3 className="text-lg font-semibold mb-3">المرافق القريبة</h3>
                      <div className="grid grid-cols-2 gap-2">
                        {property.amenities.map((amenity, index) => (
                          <div key={index} className="flex items-center space-x-2 space-x-reverse">
                            <MapPin className="h-4 w-4 text-blue-600" />
                            <span className="text-sm text-gray-700">{amenity}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </TabsContent>

                <TabsContent value="details" className="p-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <h3 className="text-lg font-semibold mb-3">المواصفات</h3>
                      <div className="space-y-3">
                        <div className="flex justify-between">
                          <span className="text-gray-600">سنة البناء</span>
                          <span className="font-medium">{property.specifications.constructionYear}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600">عدد الطوابق</span>
                          <span className="font-medium">{property.specifications.floors}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600">مساحة الأرض</span>
                          <span className="font-medium">{property.specifications.landArea} م²</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600">مساحة البناء</span>
                          <span className="font-medium">{property.specifications.buildingArea} م²</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600">الاتجاه</span>
                          <span className="font-medium">{property.specifications.orientation}</span>
                        </div>
                      </div>
                    </div>

                    <div>
                      <h3 className="text-lg font-semibold mb-3">الخدمات</h3>
                      <div className="space-y-3">
                        <div className="flex justify-between">
                          <span className="text-gray-600">نوع المواقف</span>
                          <span className="font-medium">{property.specifications.parkingType}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600">التدفئة</span>
                          <span className="font-medium">{property.specifications.heating}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600">التكييف</span>
                          <span className="font-medium">{property.specifications.cooling}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600">الإنترنت</span>
                          <span className="font-medium">{property.specifications.internet}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </TabsContent>

                <TabsContent value="location" className="p-6">
                  <div className="space-y-4">
                    <div className="bg-gray-100 rounded-lg p-4">
                      <h3 className="font-semibold mb-2">الموقع على الخريطة</h3>
                      <div className="h-64 bg-gray-200 rounded flex items-center justify-center">
                        <span className="text-gray-500">خريطة تفاعلية ستظهر هنا</span>
                      </div>
                    </div>
                    
                    <div>
                      <h3 className="font-semibold mb-2">العنوان</h3>
                      <p className="text-gray-600">{property.location}</p>
                    </div>
                  </div>
                </TabsContent>

                <TabsContent value="documents" className="p-6">
                  <div className="space-y-3">
                    {property.documents.map((doc, index) => (
                      <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                        <div className="flex items-center space-x-3 space-x-reverse">
                          <FileText className="h-5 w-5 text-blue-600" />
                          <div>
                            <div className="font-medium">{doc.name}</div>
                            <div className="text-sm text-gray-500">{doc.size}</div>
                          </div>
                        </div>
                        <Button size="sm" variant="outline">
                          <Download className="h-4 w-4 ml-1" />
                          تحميل
                        </Button>
                      </div>
                    ))}
                  </div>
                </TabsContent>
              </Tabs>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Price Card */}
            <Card>
              <CardContent className="p-6">
                <div className="text-center mb-4">
                  <div className="text-3xl font-bold text-blue-600 mb-1">
                    {formatPrice(property.price)}
                  </div>
                  {property.originalPrice && property.originalPrice > property.price && (
                    <div className="text-lg text-gray-500 line-through">
                      {formatPrice(property.originalPrice)}
                    </div>
                  )}
                  <div className="text-sm text-gray-600">دينار ليبي</div>
                </div>

                <div className="space-y-3">
                  <Button className="w-full bg-blue-600 hover:bg-blue-700">
                    <Phone className="h-4 w-4 ml-2" />
                    اتصل بالوكيل
                  </Button>
                  <Button variant="outline" className="w-full">
                    <Mail className="h-4 w-4 ml-2" />
                    إرسال رسالة
                  </Button>
                  <Button variant="outline" className="w-full">
                    <Calendar className="h-4 w-4 ml-2" />
                    حجز معاينة
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Agent Card */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">الوكيل العقاري</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center space-x-3 space-x-reverse mb-4">
                  <img 
                    src={property.agent.image} 
                    alt={property.agent.name}
                    className="w-12 h-12 rounded-full object-cover"
                  />
                  <div>
                    <div className="font-semibold">{property.agent.name}</div>
                    <div className="text-sm text-gray-600">{property.agent.properties} عقار</div>
                    <div className="flex items-center space-x-1 space-x-reverse">
                      <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                      <span className="text-sm">{property.agent.rating}</span>
                    </div>
                  </div>
                </div>

                <div className="space-y-2">
                  <div className="flex items-center space-x-2 space-x-reverse text-sm">
                    <Phone className="h-4 w-4 text-gray-500" />
                    <span>{property.agent.phone}</span>
                  </div>
                  <div className="flex items-center space-x-2 space-x-reverse text-sm">
                    <Mail className="h-4 w-4 text-gray-500" />
                    <span>{property.agent.email}</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Investment Options */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">خيارات الاستثمار</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {property.installmentAvailable && (
                  <div className="p-3 border rounded-lg">
                    <div className="flex items-center justify-between mb-2">
                      <span className="font-medium">التقسيط</span>
                      <Badge className="bg-green-100 text-green-800">متاح</Badge>
                    </div>
                    <div className="text-sm text-gray-600">
                      القسط الشهري: {formatPrice(Math.floor(property.price / 60))}
                    </div>
                  </div>
                )}

                {property.sharesAvailable && (
                  <div className="p-3 border rounded-lg">
                    <div className="flex items-center justify-between mb-2">
                      <span className="font-medium">الأسهم</span>
                      <Badge className="bg-blue-100 text-blue-800">متاح</Badge>
                    </div>
                    <div className="text-sm text-gray-600">
                      العائد المتوقع: {property.investmentReturn}%
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Property Stats */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">إحصائيات العقار</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">المشاهدات</span>
                  <div className="flex items-center space-x-1 space-x-reverse">
                    <Eye className="h-4 w-4 text-gray-500" />
                    <span className="font-medium">{property.views}</span>
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">التقييم</span>
                  <div className="flex items-center space-x-1 space-x-reverse">
                    <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                    <span className="font-medium">{property.rating}</span>
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">تاريخ الإعلان</span>
                  <span className="font-medium">{property.listedDate}</span>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PropertyDetail; 