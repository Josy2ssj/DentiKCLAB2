import { Search, Bell, User } from 'lucide-react';
import { useData } from '../contexts/DataContext';

export function TopHeader() {
  const { unreadNotificationCount } = useData();

  return (
    <header className="bg-white/80 backdrop-blur-sm border-b border-slate-200 px-6 py-4 flex items-center justify-between">
      <div className="flex items-center gap-4">
        <h1 className="text-2xl font-bold text-slate-900">DentiKC LAB OS</h1>
      </div>
      
      <div className="flex items-center gap-4">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
          <input
            type="text"
            placeholder="Buscar..."
            className="pl-10 pr-4 py-2 bg-slate-100 rounded-lg border-0 focus:ring-2 focus:ring-blue-500"
          />
        </div>
        
        <button className="relative p-2 hover:bg-slate-100 rounded-lg">
          <Bell size={20} className="text-slate-600" />
          {unreadNotificationCount > 0 && (
            <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full" />
          )}
        </button>
        
        <button className="flex items-center gap-2 p-2 hover:bg-slate-100 rounded-lg">
          <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center text-white">
            <User size={16} />
          </div>
          <span className="text-sm font-medium text-slate-700">Josy</span>
        </button>
      </div>
    </header>
  );
}
