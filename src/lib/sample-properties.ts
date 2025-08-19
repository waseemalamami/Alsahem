export interface Property {
  id: string;
  title: string;
  location: string;
  price: number;
  originalPrice?: number;
  bedrooms: number;
  bathrooms: number;
  area: number;
  parking: number;
  type: string;
  status: 'available' | 'sold' | 'reserved';
  image: string;
  rating: number;
  views: number;
  listedDate: string;
  investmentReturn?: number;
  installmentAvailable?: boolean;
  sharesAvailable?: boolean;
  // Stock information
  totalShares?: number;
  availableShares?: number;
  stockPrice?: number;
  totalInvestmentValue?: number;
}

export const sampleProperties: Property[] = [
  {
    id: "1",
    title: "مجمع تجاري سكني",
    location: "مصراتة، حي العزيزية",
    price: 8000000,
    originalPrice: 8500000,
    bedrooms: 4,
    bathrooms: 3,
    area: 450,
    parking: 2,
    type: "تجاري",
    status: "available",
    image: "/public/lovable-uploads/6b9bacd9-5e84-43c8-9ddc-a1fa7d121cf0.png",
    rating: 4.8,
    views: 189,
    listedDate: "15-01-2024",
    investmentReturn: 18.7,
    installmentAvailable: true,
    sharesAvailable: true,
    // Stock information
    totalShares: 8000,
    availableShares: 2340,
    stockPrice: 1000,
    totalInvestmentValue: 8000000
  },
  {
    id: "2",
    title: "برج الشقق السكنية",
    location: "بنغازي، وسط المدينة",
    price: 4500000,
    bedrooms: 2,
    bathrooms: 2,
    area: 120,
    parking: 1,
    type: "شقة",
    status: "available",
    image: "/public/lovable-uploads/72555550-2f5a-402f-8aa8-8b5bd697d43f.png",
    rating: 4.6,
    views: 156,
    listedDate: "20-01-2024",
    investmentReturn: 12.3,
    installmentAvailable: true,
    sharesAvailable: true,
    // Stock information
    totalShares: 4500,
    availableShares: 1830,
    stockPrice: 1000,
    totalInvestmentValue: 4500000
  },
  {
    id: "3",
    title: "مشروع فيلات السكنى الفاخرة",
    location: "طرابلس، حي السكني",
    price: 12000000,
    bedrooms: 5,
    bathrooms: 4,
    area: 800,
    parking: 3,
    type: "فيلا",
    status: "available",
    image: "/public/lovable-uploads/6b9bacd9-5e84-43c8-9ddc-a1fa7d121cf0.png",
    rating: 4.9,
    views: 234,
    listedDate: "25-01-2024",
    investmentReturn: 15.5,
    installmentAvailable: true,
    sharesAvailable: true,
    // Stock information
    totalShares: 12000,
    availableShares: 5500,
    stockPrice: 1000,
    totalInvestmentValue: 12000000
  },
  {
    id: "4",
    title: "شقق طلابية",
    location: "طرابلس، جامعة طرابلس",
    price: 3000000,
    bedrooms: 1,
    bathrooms: 1,
    area: 60,
    parking: 0,
    type: "شقة",
    status: "available",
    image: "/public/lovable-uploads/72555550-2f5a-402f-8aa8-8b5bd697d43f.png",
    rating: 4.4,
    views: 267,
    listedDate: "30-01-2024",
    investmentReturn: 8.5,
    installmentAvailable: false,
    sharesAvailable: true,
    // Stock information
    totalShares: 3000,
    availableShares: 1440,
    stockPrice: 1000,
    totalInvestmentValue: 3000000
  },
  {
    id: "5",
    title: "أراضي سكنية للبناء",
    location: "الزاوية، شارع البحر",
    price: 2500000,
    bedrooms: 0,
    bathrooms: 0,
    area: 500,
    parking: 0,
    type: "أرض",
    status: "available",
    image: "/public/lovable-uploads/6b9bacd9-5e84-43c8-9ddc-a1fa7d121cf0.png",
    rating: 4.2,
    views: 98,
    listedDate: "05-02-2024",
    investmentReturn: 10.2,
    installmentAvailable: true,
    sharesAvailable: true,
    // Stock information
    totalShares: 2500,
    availableShares: 1610,
    stockPrice: 1000,
    totalInvestmentValue: 2500000
  }
];

// Helper function to calculate stock metrics
export const calculateStockMetrics = (property: Property) => {
  if (!property.sharesAvailable || !property.totalShares || !property.stockPrice) {
    return null;
  }

  const soldShares = property.totalShares - property.availableShares;
  const soldPercentage = (soldShares / property.totalShares) * 100;
  const availablePercentage = (property.availableShares / property.totalShares) * 100;

  return {
    soldShares,
    soldPercentage,
    availablePercentage,
    minInvestment: property.stockPrice,
    maxInvestment: property.availableShares * property.stockPrice
  };
};

// Helper function to format stock numbers in English
export const formatStockNumber = (number: number) => {
  return number.toLocaleString('en-US');
};

// Helper function to get stock status
export const getStockStatus = (property: Property) => {
  if (!property.sharesAvailable) return 'not-available';
  
  const metrics = calculateStockMetrics(property);
  if (!metrics) return 'not-available';
  
  if (metrics.availablePercentage === 0) return 'fully-funded';
  if (metrics.availablePercentage < 25) return 'almost-funded';
  if (metrics.availablePercentage < 50) return 'partially-funded';
  return 'available';
};
