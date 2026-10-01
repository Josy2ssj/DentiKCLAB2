import { Home, ClipboardList, Calendar, Package, Box, Settings } from 'lucide-react';
import { useNavigation } from '../contexts/NavigationContext';

const navItems = [
  { id: 'home', label: 'Home', icon: Home },
  { id: 'orders', label: 'Órdenes', icon: ClipboardList },
  { id: 'schedule', label: 'Horario', icon: Calendar },
  { id: 'inventory', label: 'Inventario', icon: Package },
  { id: 'capture3d', label: 'Captura 3D', icon: Box },
  { id: 'settings', label: 'Ajustes', icon: Settings }
];

export function AdaptiveNavRail() {
  const { activeSection, setActiveSection } = useNavigation();

  return (
    <aside className="fixed left-0 top-0 h-screen w-20 bg-gradient-to-b from-slate-900 to-slate-800 flex flex-col items-center py-8 z-40">
      <div className="text-white font-bold text-xl mb-8">DK</div>
      <nav className="flex flex-col gap-2 flex-1">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = activeSection === item.id;
          
          return (
            <button
              key={item.id}
              onClick={() => setActiveSection(item.id as any)}
              className={`w-12 h-12 rounded-xl flex items-center justify-center transition-all duration-200 ${
                isActive
                  ? 'bg-blue-500 text-white shadow-lg shadow-blue-500/50'
                  : 'text-slate-400 hover:bg-slate-700 hover:text-white'
              }`}
              title={item.label}
            >
              <Icon size={20} />
            </button>
          );
        })}
      </nav>
    </aside>
  );
}
