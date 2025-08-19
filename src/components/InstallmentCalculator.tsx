import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Calculator } from "lucide-react";

const InstallmentCalculator = () => {
  const [propertyPrice, setPropertyPrice] = useState<string>('');
  const [downPayment, setDownPayment] = useState<string>('');
  const [installmentPeriod, setInstallmentPeriod] = useState<string>('');
  const [monthlyPayment, setMonthlyPayment] = useState<number>(0);

  const calculateInstallment = () => {
    const price = parseFloat(propertyPrice);
    const down = parseFloat(downPayment);
    const months = parseInt(installmentPeriod);
    
    if (price && down && months) {
      const remaining = price - down;
      const monthly = remaining / months;
      setMonthlyPayment(monthly);
    }
  };

  return (
    <Card className="w-full max-w-md">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Calculator className="h-5 w-5" />
          حاسبة التقسيط
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div>
          <Label htmlFor="price">سعر العقار (دينار ليبي)</Label>
          <Input
            id="price"
            type="number"
            placeholder="50,000"
            value={propertyPrice}
            onChange={(e) => setPropertyPrice(e.target.value)}
            className="text-right"
          />
        </div>
        
        <div>
          <Label htmlFor="down">الدفعة المقدمة (دينار ليبي)</Label>
          <Input
            id="down"
            type="number"
            placeholder="10,000"
            value={downPayment}
            onChange={(e) => setDownPayment(e.target.value)}
            className="text-right"
          />
        </div>
        
        <div>
          <Label htmlFor="period">فترة التقسيط</Label>
          <Select value={installmentPeriod} onValueChange={setInstallmentPeriod}>
            <SelectTrigger>
              <SelectValue placeholder="اختر الفترة" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="12">12 شهر</SelectItem>
              <SelectItem value="24">24 شهر</SelectItem>
              <SelectItem value="36">36 شهر</SelectItem>
              <SelectItem value="48">48 شهر</SelectItem>
              <SelectItem value="60">60 شهر</SelectItem>
            </SelectContent>
          </Select>
        </div>
        
        <Button onClick={calculateInstallment} className="w-full rounded-2xl">
          احسب القسط الشهري
        </Button>
        
        {monthlyPayment > 0 && (
          <div className="p-4 bg-blue-50 rounded-2xl text-center">
            <p className="text-sm text-gray-600 mb-1">القسط الشهري</p>
            <p className="text-2xl font-bold text-blue-600">
              {monthlyPayment.toLocaleString('en-US')} دينار ليبي
            </p>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default InstallmentCalculator;
