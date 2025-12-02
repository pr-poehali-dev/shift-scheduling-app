import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import Icon from '@/components/ui/icon';

type TabType = 'shifts' | 'schedule' | 'profile' | 'notifications';

interface Shift {
  id: string;
  date: string;
  time: string;
  type: 'day' | 'night';
  status: 'active' | 'upcoming' | 'completed';
  location: string;
}

interface Notification {
  id: string;
  title: string;
  message: string;
  time: string;
  type: 'new-shift' | 'reminder' | 'info';
  read: boolean;
}

const Index = () => {
  const [activeTab, setActiveTab] = useState<TabType>('shifts');

  const shifts: Shift[] = [
    {
      id: '1',
      date: '2 декабря',
      time: '8:00 - 20:00',
      type: 'day',
      status: 'active',
      location: 'Склад №1',
    },
    {
      id: '2',
      date: '3 декабря',
      time: '20:00 - 8:00',
      type: 'night',
      status: 'upcoming',
      location: 'Склад №2',
    },
    {
      id: '3',
      date: '5 декабря',
      time: '8:00 - 20:00',
      type: 'day',
      status: 'upcoming',
      location: 'Склад №1',
    },
  ];

  const availableShifts = [
    { id: '4', date: '6 декабря', time: '8:00 - 20:00', type: 'day' as const, location: 'Склад №1' },
    { id: '5', date: '6 декабря', time: '20:00 - 8:00', type: 'night' as const, location: 'Склад №2' },
    { id: '6', date: '7 декабря', time: '8:00 - 20:00', type: 'day' as const, location: 'Склад №3' },
    { id: '7', date: '7 декабря', time: '20:00 - 8:00', type: 'night' as const, location: 'Склад №1' },
    { id: '8', date: '8 декабря', time: '8:00 - 20:00', type: 'day' as const, location: 'Склад №2' },
  ];

  const notifications: Notification[] = [
    {
      id: '1',
      title: 'Новая смена доступна',
      message: 'Открыта дневная смена 6 декабря на Склад №1',
      time: '10 мин назад',
      type: 'new-shift',
      read: false,
    },
    {
      id: '2',
      title: 'Напоминание о смене',
      message: 'Ваша смена начнется завтра в 8:00',
      time: '2 часа назад',
      type: 'reminder',
      read: false,
    },
    {
      id: '3',
      title: 'Смена завершена',
      message: 'Спасибо за работу! Смена 1 декабря зачтена',
      time: 'вчера',
      type: 'info',
      read: true,
    },
  ];

  const getShiftBadgeColor = (type: 'day' | 'night') => {
    return type === 'day' 
      ? 'bg-yellow-100 text-yellow-800 hover:bg-yellow-200' 
      : 'bg-indigo-100 text-indigo-800 hover:bg-indigo-200';
  };

  const getStatusBadge = (status: Shift['status']) => {
    const colors = {
      active: 'bg-green-100 text-green-800',
      upcoming: 'bg-blue-100 text-blue-800',
      completed: 'bg-gray-100 text-gray-800',
    };
    const labels = {
      active: 'Активна',
      upcoming: 'Предстоит',
      completed: 'Завершена',
    };
    return <Badge className={colors[status]}>{labels[status]}</Badge>;
  };

  const weekDays = ['Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб', 'Вс'];
  const weekDates = ['2 дек', '3 дек', '4 дек', '5 дек', '6 дек', '7 дек', '8 дек'];

  const renderShifts = () => (
    <div className="space-y-4 animate-fade-in">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold">Мои смены</h2>
        <Badge className="gradient-purple-pink text-white px-4 py-2 text-sm">
          {shifts.filter(s => s.status === 'upcoming').length} предстоит
        </Badge>
      </div>

      <Card className="p-5 border-2 mb-6">
        <div className="flex items-center gap-2 mb-4">
          <Icon name="Sun" className="text-yellow-600" size={24} />
          <h3 className="font-semibold text-lg">Дневные смены (8:00 - 20:00)</h3>
        </div>
        <div className="grid grid-cols-7 gap-2 mb-2">
          {weekDays.map((day, index) => (
            <div key={index} className="text-center text-xs font-medium text-muted-foreground">
              {day}
            </div>
          ))}
        </div>
        <div className="grid grid-cols-7 gap-2 mb-2">
          {weekDates.map((date, index) => (
            <div key={index} className="text-center text-xs text-muted-foreground">
              {date}
            </div>
          ))}
        </div>
        <div className="grid grid-cols-7 gap-2">
          {[true, false, true, true, false, true, false].map((hasShift, index) => (
            <div 
              key={index} 
              className={`h-16 rounded-lg flex items-center justify-center cursor-pointer transition-all hover:scale-105 ${
                hasShift 
                  ? 'gradient-purple-pink text-white' 
                  : 'bg-gray-100 hover:bg-gray-200 border-2 border-dashed border-gray-300'
              }`}
            >
              {hasShift ? (
                <Icon name="Check" className="text-white" size={20} />
              ) : (
                <Icon name="Plus" className="text-gray-400" size={20} />
              )}
            </div>
          ))}
        </div>
      </Card>

      <Card className="p-5 border-2 mb-6">
        <div className="flex items-center gap-2 mb-4">
          <Icon name="Moon" className="text-indigo-600" size={24} />
          <h3 className="font-semibold text-lg">Ночные смены (20:00 - 8:00)</h3>
        </div>
        <div className="grid grid-cols-7 gap-2 mb-2">
          {weekDays.map((day, index) => (
            <div key={index} className="text-center text-xs font-medium text-muted-foreground">
              {day}
            </div>
          ))}
        </div>
        <div className="grid grid-cols-7 gap-2 mb-2">
          {weekDates.map((date, index) => (
            <div key={index} className="text-center text-xs text-muted-foreground">
              {date}
            </div>
          ))}
        </div>
        <div className="grid grid-cols-7 gap-2">
          {[false, true, false, false, true, true, false].map((hasShift, index) => (
            <div 
              key={index} 
              className={`h-16 rounded-lg flex items-center justify-center cursor-pointer transition-all hover:scale-105 ${
                hasShift 
                  ? 'bg-indigo-600 text-white' 
                  : 'bg-gray-100 hover:bg-gray-200 border-2 border-dashed border-gray-300'
              }`}
            >
              {hasShift ? (
                <Icon name="Check" className="text-white" size={20} />
              ) : (
                <Icon name="Plus" className="text-gray-400" size={20} />
              )}
            </div>
          ))}
        </div>
      </Card>

      {shifts.map((shift, index) => (
        <Card 
          key={shift.id} 
          className="p-5 hover:shadow-lg transition-all duration-300 border-2 animate-scale-in"
          style={{ animationDelay: `${index * 100}ms` }}
        >
          <div className="flex items-start justify-between">
            <div className="flex-1">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-12 h-12 rounded-2xl gradient-purple-pink flex items-center justify-center">
                  <Icon name={shift.type === 'day' ? 'Sun' : 'Moon'} className="text-white" size={24} />
                </div>
                <div>
                  <h3 className="font-semibold text-lg">{shift.date}</h3>
                  <p className="text-muted-foreground text-sm">{shift.location}</p>
                </div>
              </div>
              
              <div className="flex items-center gap-2 mb-3">
                <Icon name="Clock" size={16} className="text-muted-foreground" />
                <span className="font-medium">{shift.time}</span>
                <Badge className={getShiftBadgeColor(shift.type)}>
                  {shift.type === 'day' ? '☀️ День' : '🌙 Ночь'}
                </Badge>
              </div>

              <div className="flex items-center gap-2">
                {getStatusBadge(shift.status)}
              </div>
            </div>

            {shift.status === 'active' && (
              <Button className="gradient-purple-orange text-white border-0 hover:opacity-90 transition-opacity">
                Детали
              </Button>
            )}
          </div>
        </Card>
      ))}
    </div>
  );

  const renderSchedule = () => (
    <div className="space-y-4 animate-fade-in">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold">Доступные смены</h2>
        <Button className="gradient-purple-pink text-white border-0">
          <Icon name="Filter" size={18} className="mr-2" />
          Фильтры
        </Button>
      </div>

      <div className="grid gap-4">
        {availableShifts.map((shift, index) => (
          <Card 
            key={shift.id} 
            className="p-5 hover:shadow-lg transition-all duration-300 border-2 animate-scale-in"
            style={{ animationDelay: `${index * 80}ms` }}
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-2xl gradient-purple-orange flex items-center justify-center">
                  <Icon name={shift.type === 'day' ? 'Sun' : 'Moon'} className="text-white" size={24} />
                </div>
                <div>
                  <h3 className="font-semibold text-lg">{shift.date}</h3>
                  <div className="flex items-center gap-2 mt-1">
                    <Icon name="Clock" size={14} className="text-muted-foreground" />
                    <span className="text-sm text-muted-foreground">{shift.time}</span>
                    <Badge className={getShiftBadgeColor(shift.type) + ' text-xs'}>
                      {shift.type === 'day' ? 'День' : 'Ночь'}
                    </Badge>
                  </div>
                  <p className="text-sm text-muted-foreground mt-1">{shift.location}</p>
                </div>
              </div>
              <Button className="gradient-purple-pink text-white border-0 hover:opacity-90 transition-opacity">
                Записаться
              </Button>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );

  const renderProfile = () => (
    <div className="space-y-6 animate-fade-in">
      <Card className="p-6 gradient-purple-pink text-white border-0">
        <div className="flex items-center gap-4">
          <Avatar className="w-20 h-20 border-4 border-white">
            <AvatarImage src="" />
            <AvatarFallback className="text-2xl bg-white text-primary font-bold">ИВ</AvatarFallback>
          </Avatar>
          <div>
            <h2 className="text-2xl font-bold">Иван Васильев</h2>
            <p className="text-white/90">ID: 12345</p>
          </div>
        </div>
      </Card>

      <div className="grid grid-cols-2 gap-4">
        <Card className="p-5 text-center border-2 hover:shadow-lg transition-all">
          <div className="w-12 h-12 rounded-full gradient-purple-pink mx-auto mb-3 flex items-center justify-center">
            <Icon name="Clock" className="text-white" size={24} />
          </div>
          <div className="text-3xl font-bold text-primary mb-1">156</div>
          <div className="text-sm text-muted-foreground">Часов отработано</div>
        </Card>

        <Card className="p-5 text-center border-2 hover:shadow-lg transition-all">
          <div className="w-12 h-12 rounded-full gradient-purple-orange mx-auto mb-3 flex items-center justify-center">
            <Icon name="CalendarCheck" className="text-white" size={24} />
          </div>
          <div className="text-3xl font-bold text-secondary mb-1">24</div>
          <div className="text-sm text-muted-foreground">Смен завершено</div>
        </Card>
      </div>

      <Card className="p-5 border-2">
        <h3 className="font-semibold text-lg mb-4">Контактная информация</h3>
        <div className="space-y-3">
          <div className="flex items-center gap-3">
            <Icon name="Phone" size={20} className="text-muted-foreground" />
            <span>+7 (999) 123-45-67</span>
          </div>
          <div className="flex items-center gap-3">
            <Icon name="Mail" size={20} className="text-muted-foreground" />
            <span>ivan.vasilev@email.com</span>
          </div>
        </div>
      </Card>

      <Button className="w-full gradient-purple-pink text-white border-0 h-12 text-base hover:opacity-90 transition-opacity">
        Редактировать профиль
      </Button>
    </div>
  );

  const renderNotifications = () => (
    <div className="space-y-4 animate-fade-in fixed bottom-24 left-4 w-80 bg-background p-4 rounded-lg shadow-xl border-2 max-h-96 overflow-y-auto">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold">Уведомления</h2>
        <Badge className="bg-red-500 text-white">
          {notifications.filter(n => !n.read).length} новых
        </Badge>
      </div>

      {notifications.map((notif, index) => (
        <Card 
          key={notif.id} 
          className={`p-5 hover:shadow-lg transition-all duration-300 border-2 animate-scale-in ${
            !notif.read ? 'border-primary bg-purple-50' : ''
          }`}
          style={{ animationDelay: `${index * 100}ms` }}
        >
          <div className="flex gap-4">
            <div className={`w-12 h-12 rounded-2xl flex items-center justify-center flex-shrink-0 ${
              notif.type === 'new-shift' ? 'gradient-purple-pink' :
              notif.type === 'reminder' ? 'gradient-purple-orange' :
              'bg-gray-200'
            }`}>
              <Icon 
                name={
                  notif.type === 'new-shift' ? 'CalendarPlus' :
                  notif.type === 'reminder' ? 'Bell' :
                  'Info'
                } 
                className={notif.type === 'info' ? 'text-gray-600' : 'text-white'} 
                size={24} 
              />
            </div>
            <div className="flex-1">
              <div className="flex items-start justify-between mb-2">
                <h3 className="font-semibold text-base">{notif.title}</h3>
                {!notif.read && (
                  <div className="w-2 h-2 rounded-full bg-red-500"></div>
                )}
              </div>
              <p className="text-sm text-muted-foreground mb-2">{notif.message}</p>
              <span className="text-xs text-muted-foreground">{notif.time}</span>
            </div>
          </div>
        </Card>
      ))}
    </div>
  );

  const renderContent = () => {
    switch (activeTab) {
      case 'shifts':
        return renderShifts();
      case 'schedule':
        return renderSchedule();
      case 'profile':
        return renderProfile();
      case 'notifications':
        return renderNotifications();
      default:
        return renderShifts();
    }
  };

  return (
    <div className="min-h-screen bg-background pb-24">
      <header className="gradient-purple-pink text-white p-6 pb-8 rounded-b-3xl shadow-lg">
        <div className="max-w-md mx-auto">
          <div className="flex items-center justify-between mb-6">
            <h1 className="text-4xl font-bold text-green-400">Персонал 24/7</h1>
            <Button variant="ghost" className="text-white hover:bg-white/20">
              <Icon name="Settings" size={24} />
            </Button>
          </div>
          <p className="text-white/90">Управление сменами сотрудников</p>
        </div>
      </header>

      <main className="fixed bottom-32 left-4 w-96 px-4">
        {renderContent()}
      </main>

      <nav className="fixed bottom-0 left-0 right-0 bg-white border-t shadow-lg">
        <div className="max-w-md mx-auto grid grid-cols-4 gap-1">
          <button
            onClick={() => setActiveTab('shifts')}
            className={`flex flex-col items-center justify-center py-3 transition-all ${
              activeTab === 'shifts' 
                ? 'text-primary' 
                : 'text-muted-foreground'
            }`}
          >
            <Icon name="Briefcase" size={24} />
            <span className="text-xs mt-1 font-medium">Смены</span>
          </button>
          
          <button
            onClick={() => setActiveTab('schedule')}
            className={`flex flex-col items-center justify-center py-3 transition-all ${
              activeTab === 'schedule' 
                ? 'text-primary' 
                : 'text-muted-foreground'
            }`}
          >
            <Icon name="Calendar" size={24} />
            <span className="text-xs mt-1 font-medium">Расписание</span>
          </button>

          <button
            onClick={() => setActiveTab('notifications')}
            className={`flex flex-col items-center justify-center py-3 transition-all relative ${
              activeTab === 'notifications' 
                ? 'text-primary' 
                : 'text-muted-foreground'
            }`}
          >
            <Icon name="Bell" size={24} />
            {notifications.filter(n => !n.read).length > 0 && (
              <div className="absolute top-2 right-1/4 w-2 h-2 bg-red-500 rounded-full"></div>
            )}
            <span className="text-xs mt-1 font-medium">Уведомления</span>
          </button>
          
          <button
            onClick={() => setActiveTab('profile')}
            className={`flex flex-col items-center justify-center py-3 transition-all ${
              activeTab === 'profile' 
                ? 'text-primary' 
                : 'text-muted-foreground'
            }`}
          >
            <Icon name="User" size={24} />
            <span className="text-xs mt-1 font-medium">Профиль</span>
          </button>
        </div>
      </nav>
    </div>
  );
};

export default Index;