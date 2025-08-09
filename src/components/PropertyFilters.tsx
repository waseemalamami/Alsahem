import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Filter, Search } from "lucide-react";

interface FilterOptions {
  propertyType?: string;
  city?: string;
  minPrice?: number;
  maxPrice?: number;
}

interface PropertyFiltersProps {
  onFilterChange: (filters: FilterOptions) => void;
}

const PropertyFilters = ({ onFilterChange }: PropertyFiltersProps) => {
  return (
    <div className="bg-white p-6 rounded-lg shadow-sm border mb-6">
      <div className="flex items-center gap-2 mb-4">
        <Filter className="h-5 w-5 text-blue-600" />
        <h3 className="font-semibold">تصفية العقارات</h3>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div>
          <Label>نوع العقار</Label>
          <Select>
            <SelectTrigger>
              <SelectValue placeholder="جميع الأنواع" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">جميع الأنواع</SelectItem>
              <SelectItem value="villa">فيلا</SelectItem>
              <SelectItem value="apartment">شقة</SelectItem>
              <SelectItem value="house">منزل</SelectItem>
              <SelectItem value="land">أرض</SelectItem>
            </SelectContent>
          </Select>
        </div>
        
        <div>
          <Label>المدينة</Label>
          <Select>
            <SelectTrigger>
              <SelectValue placeholder="جميع المدن" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">جميع المدن</SelectItem>
              <SelectItem value="tripoli">طرابلس</SelectItem>
              <SelectItem value="benghazi">بنغازي</SelectItem>
              <SelectItem value="misrata">مصراتة</SelectItem>
              <SelectItem value="zawiya">الزاوية</SelectItem>
              <SelectItem value="sabha">سبها</SelectItem>
              <SelectItem value="tobruk">طبرق</SelectItem>
              <SelectItem value="derna">درنة</SelectItem>
            </SelectContent>
          </Select>
        </div>
        
        <div>
          <Label>السعر الأدنى</Label>
          <Input type="number" placeholder="10,000" className="text-right" />
        </div>
        
        <div>
          <Label>السعر الأعلى</Label>
          <Input type="number" placeholder="100,000" className="text-right" />
        </div>
      </div>
      
      <div className="flex gap-2 mt-4">
        <Button className="flex items-center gap-2">
          <Search className="h-4 w-4" />
          بحث
        </Button>
        <Button variant="outline">
          إعادة تعيين
        </Button>
      </div>
    </div>
  );
};

export default PropertyFilters;
