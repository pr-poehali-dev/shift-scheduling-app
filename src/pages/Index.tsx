import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import Icon from '@/components/ui/icon';

type TabType = 'board' | 'my-shifts' | 'profile';

interface AvailableShift {
  id: string;
  date: string;
  dayOfWeek: string;
  time: string;
  type: 'day' | 'night';
  location: string;
  slots: number;
  pay: number;
}

interface MyShift {
  id: string;
  date: string;
  time: string;
  type: 'day' | 'night';
  location: string;
  status: 'upcoming' | 'completed';
  pay: number;
}

const Index = () => {
  const [activeTab, setActiveTab] = useState<TabType>('board');

  const availableShifts: AvailableShift[] = [
    { id: '1', date: '2 дек', dayOfWeek: 'Понедельник', time: '8:00 - 20:00', type: 'day', location: 'Склад Север', slots: 5, pay: 2400 },
    { id: '2', date: '2 дек', dayOfWeek: 'Понедельник', time: '20:00 - 8:00', type: 'night', location: 'Склад Юг', slots: 3, pay: 2800 },
    { id: '3', date: '3 дек', dayOfWeek: 'Вторник', time: '8:00 - 20:00', type: 'day', location: 'Склад Запад', slots: 8, pay: 2400 },
    { id: '4', date: '3 дек', dayOfWeek: 'Вторник', time: '20:00 - 8:00', type: 'night', location: 'Склад Север', slots: 4, pay: 2800 },
    { id: '5', date: '4 дек', dayOfWeek: 'Среда', time: '8:00 - 20:00', type: 'day', location: 'Склад Центр', slots: 10, pay: 2400 },
    { id: '6', date: '4 дек', dayOfWeek: 'Среда', time: '20:00 - 8:00', type: 'night', location: 'Склад Восток', slots: 2, pay: 2800 },
  ];

  const myShifts: MyShift[] = [
    { id: '1', date: '5 декабря', time: '8:00 - 20:00', type: 'day', location: 'Склад Север', status: 'upcoming', pay: 2400 },
    { id: '2', date: '6 декабря', time: '20:00 - 8:00', type: 'night', location: 'Склад Юг', status: 'upcoming', pay: 2800 },
    { id: '3', date: '1 декабря', time: '8:00 - 20:00', type: 'day', location: 'Склад Запад', status: 'completed', pay: 2400 },
  ];

  const renderBoard = () => (
    <div className="space-y-4 animate-fade-in">
      <Card className="p-4 gradient-blue text-white border-0">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-lg font-semibold">Доступно смен</h3>
            <p className="text-white/90 text-sm">{availableShifts.length} вариантов</p>
          </div>
          <Icon name="Briefcase" size={32} className="text-white/80" />
        </div>
      </Card>

      <div className="flex gap-2 mb-4">
        <Button className="flex-1 bg-day-shift text-yellow-900 border-2 border-yellow-400 hover:bg-yellow-100">
          <Icon name="Sun" size={18} className="mr-2" />
          Дневные
        </Button>
        <Button className="flex-1 bg-night-shift text-blue-900 border-2 border-blue-400 hover:bg-blue-100">
          <Icon name="Moon" size={18} className="mr-2" />
          Ночные
        </Button>
      </div>

      <div className="space-y-3">
        {availableShifts.map((shift, index) => (
          <Card 
            key={shift.id} 
            className="p-4 border-2 hover:shadow-lg transition-all animate-scale-in"
            style={{ animationDelay: `${index * 50}ms` }}
          >
            <div className="flex items-start justify-between mb-3">
              <div className="flex items-start gap-3">
                <div className={`w-14 h-14 rounded-xl flex items-center justify-center ${
                  shift.type === 'day' ? 'bg-day-shift' : 'bg-night-shift'
                }`}>
                  <Icon 
                    name={shift.type === 'day' ? 'Sun' : 'Moon'} 
                    className={shift.type === 'day' ? 'text-yellow-700' : 'text-blue-700'} 
                    size={28} 
                  />
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <h3 className="font-bold text-lg">{shift.date}</h3>
                    <Badge className={shift.type === 'day' ? 'bg-yellow-500' : 'bg-blue-500'}>
                      {shift.type === 'day' ? 'День' : 'Ночь'}
                    </Badge>
                  </div>
                  <p className="text-sm text-muted-foreground">{shift.dayOfWeek}</p>
                  <div className="flex items-center gap-4 mt-2">
                    <div className="flex items-center gap-1 text-sm">
                      <Icon name="Clock" size={14} className="text-muted-foreground" />
                      <span className="font-medium">{shift.time}</span>
                    </div>
                    <div className="flex items-center gap-1 text-sm">
                      <Icon name="MapPin" size={14} className="text-muted-foreground" />
                      <span>{shift.location}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="flex items-center justify-between pt-3 border-t">
              <div className="flex items-center gap-3">
                <div className="text-center">
                  <p className="text-xs text-muted-foreground">Мест</p>
                  <p className="text-lg font-bold text-primary">{shift.slots}</p>
                </div>
                <div className="w-px h-8 bg-border"></div>
                <div className="text-center">
                  <p className="text-xs text-muted-foreground">Оплата</p>
                  <p className="text-lg font-bold text-secondary">{shift.pay} ₽</p>
                </div>
              </div>
              <Button className="gradient-blue text-white border-0 hover:opacity-90">
                <Icon name="Plus" size={18} className="mr-1" />
                Записаться
              </Button>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );

  const renderMyShifts = () => (
    <div className="space-y-4 animate-fade-in">
      <Card className="p-4 gradient-green text-white border-0 mb-4">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-lg font-semibold">Мои смены</h3>
            <p className="text-white/90 text-sm">
              {myShifts.filter(s => s.status === 'upcoming').length} предстоящих
            </p>
          </div>
          <div className="text-right">
            <p className="text-white/90 text-sm">Заработок</p>
            <p className="text-2xl font-bold">
              {myShifts.filter(s => s.status === 'upcoming').reduce((sum, s) => sum + s.pay, 0)} ₽
            </p>
          </div>
        </div>
      </Card>

      <div className="space-y-3">
        {myShifts.map((shift, index) => (
          <Card 
            key={shift.id} 
            className={`p-4 border-2 hover:shadow-lg transition-all animate-scale-in ${
              shift.status === 'completed' ? 'opacity-60' : ''
            }`}
            style={{ animationDelay: `${index * 50}ms` }}
          >
            <div className="flex items-start justify-between">
              <div className="flex items-start gap-3 flex-1">
                <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${
                  shift.type === 'day' ? 'bg-day-shift' : 'bg-night-shift'
                }`}>
                  <Icon 
                    name={shift.type === 'day' ? 'Sun' : 'Moon'} 
                    className={shift.type === 'day' ? 'text-yellow-700' : 'text-blue-700'} 
                    size={24} 
                  />
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <h3 className="font-bold">{shift.date}</h3>
                    <Badge className={
                      shift.status === 'upcoming' ? 'bg-green-500' : 'bg-gray-400'
                    }>
                      {shift.status === 'upcoming' ? 'Предстоит' : 'Завершена'}
                    </Badge>
                  </div>
                  <div className="flex items-center gap-1 text-sm text-muted-foreground mb-1">
                    <Icon name="Clock" size={14} />
                    <span>{shift.time}</span>
                  </div>
                  <div className="flex items-center gap-1 text-sm text-muted-foreground">
                    <Icon name="MapPin" size={14} />
                    <span>{shift.location}</span>
                  </div>
                </div>
              </div>
              <div className="text-right">
                <p className="text-xs text-muted-foreground">Оплата</p>
                <p className="text-xl font-bold text-secondary">{shift.pay} ₽</p>
                {shift.status === 'upcoming' && (
                  <Button 
                    variant="outline" 
                    size="sm" 
                    className="mt-2 text-red-600 border-red-600 hover:bg-red-50"
                  >
                    Отменить
                  </Button>
                )}
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );

  const renderProfile = () => (
    <div className="space-y-4 animate-fade-in">
      <Card className="p-5 gradient-blue text-white border-0">
        <div className="flex items-center gap-4">
          <Avatar className="w-20 h-20 border-4 border-white">
            <AvatarFallback className="text-2xl bg-white text-primary font-bold">
              АП
            </AvatarFallback>
          </Avatar>
          <div>
            <h2 className="text-2xl font-bold">Алексей Петров</h2>
            <p className="text-white/90">ID: 78945</p>
            <div className="flex items-center gap-1 mt-1">
              <Icon name="Star" size={16} className="text-yellow-300 fill-yellow-300" />
              <span className="font-semibold">4.9</span>
            </div>
          </div>
        </div>
      </Card>

      <div className="grid grid-cols-2 gap-3">
        <Card className="p-4 text-center border-2">
          <div className="w-12 h-12 rounded-full gradient-blue mx-auto mb-2 flex items-center justify-center">
            <Icon name="Clock" className="text-white" size={24} />
          </div>
          <div className="text-2xl font-bold text-primary mb-1">248</div>
          <div className="text-xs text-muted-foreground">Часов отработано</div>
        </Card>

        <Card className="p-4 text-center border-2">
          <div className="w-12 h-12 rounded-full gradient-green mx-auto mb-2 flex items-center justify-center">
            <Icon name="Wallet" className="text-white" size={24} />
          </div>
          <div className="text-2xl font-bold text-secondary mb-1">59,200₽</div>
          <div className="text-xs text-muted-foreground">Заработано</div>
        </Card>

        <Card className="p-4 text-center border-2">
          <div className="w-12 h-12 rounded-full bg-yellow-400 mx-auto mb-2 flex items-center justify-center">
            <Icon name="CalendarCheck" className="text-yellow-900" size={24} />
          </div>
          <div className="text-2xl font-bold mb-1">42</div>
          <div className="text-xs text-muted-foreground">Смен завершено</div>
        </Card>

        <Card className="p-4 text-center border-2">
          <div className="w-12 h-12 rounded-full bg-blue-400 mx-auto mb-2 flex items-center justify-center">
            <Icon name="TrendingUp" className="text-blue-900" size={24} />
          </div>
          <div className="text-2xl font-bold mb-1">98%</div>
          <div className="text-xs text-muted-foreground">Явка</div>
        </Card>
      </div>

      <Card className="p-4 border-2">
        <h3 className="font-semibold text-base mb-3">Контакты</h3>
        <div className="space-y-2">
          <div className="flex items-center gap-2 text-sm">
            <Icon name="Phone" size={18} className="text-muted-foreground" />
            <span>+7 (999) 876-54-32</span>
          </div>
          <div className="flex items-center gap-2 text-sm">
            <Icon name="Mail" size={18} className="text-muted-foreground" />
            <span>aleksey.petrov@email.com</span>
          </div>
        </div>
      </Card>

      <Button className="w-full gradient-blue text-white border-0 h-12 hover:opacity-90">
        Редактировать профиль
      </Button>
    </div>
  );

  const renderContent = () => {
    switch (activeTab) {
      case 'board':
        return renderBoard();
      case 'my-shifts':
        return renderMyShifts();
      case 'profile':
        return renderProfile();
      default:
        return renderBoard();
    }
  };

  return (
    <div className="min-h-screen bg-background pb-20">
      <header className="gradient-blue text-white p-5 shadow-lg sticky top-0 z-10">
        <div className="max-w-2xl mx-auto">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold">Работа на складе</h1>
              <p className="text-white/90 text-sm">Выбирайте смены и зарабатывайте</p>
            </div>
            <Button variant="ghost" className="text-white hover:bg-white/20">
              <Icon name="Bell" size={24} />
            </Button>
          </div>
        </div>
      </header>

      <main className="max-w-2xl mx-auto px-4 py-4">
        {renderContent()}
      </main>

      <nav className="fixed bottom-0 left-0 right-0 bg-white border-t shadow-lg">
        <div className="max-w-2xl mx-auto grid grid-cols-3">
          <button
            onClick={() => setActiveTab('board')}
            className={`flex flex-col items-center justify-center py-3 transition-all ${
              activeTab === 'board' ? 'text-primary' : 'text-muted-foreground'
            }`}
          >
            <Icon name="LayoutGrid" size={24} />
            <span className="text-xs mt-1 font-medium">Доска смен</span>
          </button>

          <button
            onClick={() => setActiveTab('my-shifts')}
            className={`flex flex-col items-center justify-center py-3 transition-all ${
              activeTab === 'my-shifts' ? 'text-primary' : 'text-muted-foreground'
            }`}
          >
            <Icon name="CalendarDays" size={24} />
            <span className="text-xs mt-1 font-medium">Мои смены</span>
          </button>

          <button
            onClick={() => setActiveTab('profile')}
            className={`flex flex-col items-center justify-center py-3 transition-all ${
              activeTab === 'profile' ? 'text-primary' : 'text-muted-foreground'
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
