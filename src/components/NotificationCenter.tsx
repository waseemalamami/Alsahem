import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Bell, 
  CheckCircle, 
  AlertCircle, 
  Info, 
  X, 
  Clock, 
  DollarSign, 
  TrendingUp,
  Calendar,
  MessageCircle,
  Settings
} from "lucide-react";

interface Notification {
  id: string;
  type: 'success' | 'warning' | 'info' | 'error';
  title: string;
  message: string;
  timestamp: string;
  read: boolean;
  action?: string;
  category: 'payment' | 'investment' | 'property' | 'system' | 'offer';
}

interface NotificationCenterProps {
  userRole: 'visitor' | 'client' | 'investor';
}

const NotificationCenter = ({ userRole }: NotificationCenterProps) => {
  const [notifications, setNotifications] = useState<Notification[]>([
    {
      id: '1',
      type: 'warning',
      title: 'قسط مستحق الدفع',
      message: 'القسط الشهري مستحق الدفع منذ 5 أيام. يرجى الدفع لتجنب التأخير.',
      timestamp: 'منذ 5 دقائق',
      read: false,
      action: 'دفع الآن',
      category: 'payment'
    },
    {
      id: '2',
      type: 'success',
      title: 'تم قبول عرضك',
      message: 'تم قبول عرضك لشراء أسهم في مشروع المجمع السكني.',
      timestamp: 'منذ ساعة',
      read: false,
      action: 'عرض التفاصيل',
      category: 'investment'
    },
    {
      id: '3',
      type: 'info',
      title: 'عرض جديد متاح',
      message: 'عرض جديد للاستثمار في برج تجاري بموقع استراتيجي.',
      timestamp: 'منذ 3 ساعات',
      read: true,
      action: 'استكشف العرض',
      category: 'investment'
    },
    {
      id: '4',
      type: 'success',
      title: 'تم تحديث المحفظة',
      message: 'تم تحديث قيمة محفظتك الاستثمارية بنسبة +2.5%.',
      timestamp: 'منذ يوم',
      read: true,
      category: 'investment'
    },
    {
      id: '5',
      type: 'info',
      title: 'صيانة مجدولة',
      message: 'سيتم إجراء صيانة دورية في العقار يوم الأحد القادم.',
      timestamp: 'منذ يومين',
      read: true,
      category: 'property'
    }
  ]);

  const [isOpen, setIsOpen] = useState(false);

  const getNotificationIcon = (type: string) => {
    switch (type) {
      case 'success': return <CheckCircle className="h-5 w-5 text-green-600" />;
      case 'warning': return <AlertCircle className="h-5 w-5 text-yellow-600" />;
      case 'error': return <X className="h-5 w-5 text-red-600" />;
      case 'info': return <Info className="h-5 w-5 text-blue-600" />;
      default: return <Info className="h-5 w-5 text-gray-600" />;
    }
  };

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'payment': return <DollarSign className="h-4 w-4" />;
      case 'investment': return <TrendingUp className="h-4 w-4" />;
      case 'property': return <Calendar className="h-4 w-4" />;
      case 'system': return <Settings className="h-4 w-4" />;
      case 'offer': return <MessageCircle className="h-4 w-4" />;
      default: return <Info className="h-4 w-4" />;
    }
  };

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'payment': return 'bg-green-100 text-green-800';
      case 'investment': return 'bg-purple-100 text-purple-800';
      case 'property': return 'bg-blue-100 text-blue-800';
      case 'system': return 'bg-gray-100 text-gray-800';
      case 'offer': return 'bg-orange-100 text-orange-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const markAsRead = (id: string) => {
    setNotifications(prev => 
      prev.map(notification => 
        notification.id === id ? { ...notification, read: true } : notification
      )
    );
  };

  const markAllAsRead = () => {
    setNotifications(prev => 
      prev.map(notification => ({ ...notification, read: true }))
    );
  };

  const deleteNotification = (id: string) => {
    setNotifications(prev => prev.filter(notification => notification.id !== id));
  };

  const unreadCount = notifications.filter(n => !n.read).length;

  const getNotificationsByCategory = (category: string) => {
    return notifications.filter(n => n.category === category);
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" size="sm" className="relative">
          <Bell className="h-4 w-4" />
          {unreadCount > 0 && (
            <Badge className="absolute -top-1 -right-1 h-5 w-5 p-0 text-xs bg-red-500">
              {unreadCount}
            </Badge>
          )}
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-2xl max-h-[80vh] overflow-hidden" dir="rtl">
        <DialogHeader>
          <DialogTitle className="flex items-center justify-between">
            <span className="flex items-center gap-2">
              <Bell className="h-5 w-5" />
              مركز الإشعارات
            </span>
            <div className="flex items-center gap-2">
              <Button variant="outline" size="sm" onClick={markAllAsRead}>
                تحديد الكل كمقروء
              </Button>
              <Badge variant="secondary">{notifications.length} إشعار</Badge>
            </div>
          </DialogTitle>
        </DialogHeader>

        <Tabs defaultValue="all" className="w-full">
          <TabsList className="grid w-full grid-cols-5">
            <TabsTrigger value="all">الكل</TabsTrigger>
            <TabsTrigger value="payment">المدفوعات</TabsTrigger>
            <TabsTrigger value="investment">الاستثمارات</TabsTrigger>
            <TabsTrigger value="property">العقارات</TabsTrigger>
            <TabsTrigger value="system">النظام</TabsTrigger>
          </TabsList>

          <div className="max-h-[60vh] overflow-y-auto mt-4">
            <TabsContent value="all" className="space-y-3">
              {notifications.map((notification) => (
                <NotificationItem 
                  key={notification.id}
                  notification={notification}
                  onMarkAsRead={markAsRead}
                  onDelete={deleteNotification}
                  getNotificationIcon={getNotificationIcon}
                  getCategoryIcon={getCategoryIcon}
                  getCategoryColor={getCategoryColor}
                />
              ))}
            </TabsContent>

            <TabsContent value="payment" className="space-y-3">
              {getNotificationsByCategory('payment').map((notification) => (
                <NotificationItem 
                  key={notification.id}
                  notification={notification}
                  onMarkAsRead={markAsRead}
                  onDelete={deleteNotification}
                  getNotificationIcon={getNotificationIcon}
                  getCategoryIcon={getCategoryIcon}
                  getCategoryColor={getCategoryColor}
                />
              ))}
            </TabsContent>

            <TabsContent value="investment" className="space-y-3">
              {getNotificationsByCategory('investment').map((notification) => (
                <NotificationItem 
                  key={notification.id}
                  notification={notification}
                  onMarkAsRead={markAsRead}
                  onDelete={deleteNotification}
                  getNotificationIcon={getNotificationIcon}
                  getCategoryIcon={getCategoryIcon}
                  getCategoryColor={getCategoryColor}
                />
              ))}
            </TabsContent>

            <TabsContent value="property" className="space-y-3">
              {getNotificationsByCategory('property').map((notification) => (
                <NotificationItem 
                  key={notification.id}
                  notification={notification}
                  onMarkAsRead={markAsRead}
                  onDelete={deleteNotification}
                  getNotificationIcon={getNotificationIcon}
                  getCategoryIcon={getCategoryIcon}
                  getCategoryColor={getCategoryColor}
                />
              ))}
            </TabsContent>

            <TabsContent value="system" className="space-y-3">
              {getNotificationsByCategory('system').map((notification) => (
                <NotificationItem 
                  key={notification.id}
                  notification={notification}
                  onMarkAsRead={markAsRead}
                  onDelete={deleteNotification}
                  getNotificationIcon={getNotificationIcon}
                  getCategoryIcon={getCategoryIcon}
                  getCategoryColor={getCategoryColor}
                />
              ))}
            </TabsContent>
          </div>
        </Tabs>
      </DialogContent>
    </Dialog>
  );
};

interface NotificationItemProps {
  notification: Notification;
  onMarkAsRead: (id: string) => void;
  onDelete: (id: string) => void;
  getNotificationIcon: (type: string) => React.ReactNode;
  getCategoryIcon: (category: string) => React.ReactNode;
  getCategoryColor: (category: string) => string;
}

const NotificationItem = ({ 
  notification, 
  onMarkAsRead, 
  onDelete, 
  getNotificationIcon, 
  getCategoryIcon, 
  getCategoryColor 
}: NotificationItemProps) => {
  return (
    <Card className={`transition-all duration-200 ${!notification.read ? 'bg-blue-50 border-blue-200' : 'bg-white'}`}>
      <CardContent className="p-4">
        <div className="flex items-start gap-3">
          <div className="flex-shrink-0 mt-1">
            {getNotificationIcon(notification.type)}
          </div>
          
          <div className="flex-1 min-w-0">
            <div className="flex items-start justify-between mb-2">
              <div className="flex items-center gap-2">
                <h4 className={`font-semibold ${!notification.read ? 'text-blue-900' : 'text-gray-900'}`}>
                  {notification.title}
                </h4>
                {!notification.read && (
                  <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                )}
              </div>
              <div className="flex items-center gap-2">
                <Badge className={getCategoryColor(notification.category)}>
                  {getCategoryIcon(notification.category)}
                  <span className="mr-1">{notification.category}</span>
                </Badge>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => onDelete(notification.id)}
                  className="h-6 w-6 p-0 text-gray-400 hover:text-red-600"
                >
                  <X className="h-3 w-3" />
                </Button>
              </div>
            </div>
            
            <p className="text-sm text-gray-600 mb-3 line-clamp-2">
              {notification.message}
            </p>
            
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 text-xs text-gray-500">
                <Clock className="h-3 w-3" />
                {notification.timestamp}
              </div>
              
              <div className="flex items-center gap-2">
                {notification.action && (
                  <Button size="sm" variant="outline" className="text-xs">
                    {notification.action}
                  </Button>
                )}
                {!notification.read && (
                  <Button 
                    size="sm" 
                    variant="ghost" 
                    onClick={() => onMarkAsRead(notification.id)}
                    className="text-xs text-blue-600 hover:text-blue-800"
                  >
                    تحديد كمقروء
                  </Button>
                )}
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default NotificationCenter; 