
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface LoginFormProps {
  type: 'visitor' | 'client' | 'investor';
  onLogin: () => void;
  icon: React.ReactNode;
  description: string;
}

const LoginForm = ({ type, onLogin, icon, description }: LoginFormProps) => {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onLogin();
  };

  const getButtonColor = () => {
    switch (type) {
      case 'visitor': return 'bg-blue-600 hover:bg-blue-700';
      case 'client': return 'bg-green-600 hover:bg-green-700';
      case 'investor': return 'bg-purple-600 hover:bg-purple-700';
    }
  };

  return (
    <div className="space-y-4">
      <div className="text-center">
        {icon}
        <p className="text-gray-600 text-sm">{description}</p>
      </div>
      
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <Label htmlFor="email">البريد الإلكتروني</Label>
          <Input 
            id="email" 
            type="email" 
            placeholder="أدخل بريدك الإلكتروني"
            className="text-right"
            required
          />
        </div>
        <div>
          <Label htmlFor="password">كلمة المرور</Label>
          <Input 
            id="password" 
            type="password" 
            placeholder="أدخل كلمة المرور"
            className="text-right"
            required
          />
        </div>
        <Button type="submit" className={`w-full ${getButtonColor()}`}>
          دخول
        </Button>
      </form>
      
      <div className="text-center">
        <Button variant="link" className="text-sm text-gray-600">
          نسيت كلمة المرور؟
        </Button>
      </div>
    </div>
  );
};

export default LoginForm;
