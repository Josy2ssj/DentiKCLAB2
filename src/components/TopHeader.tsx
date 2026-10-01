import { Search, Bell, User, ChevronDown } from 'lucide-react';
import { useData } from '../contexts/DataContext';
import { useNavigation } from '../contexts/NavigationContext';
import { useState, useEffect, useRef } from 'react';

export function TopHeader() {
  const { unreadNotificationCount, orders, patients, inventory } = useData();
  const { activeSection, setActiveSection } = useNavigation();
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState<any[]>([]);
  const searchRef = useRef<HTMLDivElement>(null);

  const navItems = [
    { id: 'home', label: 'Home' },
    { id: 'ordenes', label: 'Órdenes' },
    { id: 'horario', label: 'Horario' },
    { id: 'inventario', label: 'Inventario' },
    { id: 'captura3d', label: 'Captura 3D' }
  ];

  // Global search shortcut
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === '/' && !searchOpen) {
        e.preventDefault();
        setSearchOpen(true);
      }
      if (e.key === 'Escape' && searchOpen) {
        setSearchOpen(false);
        setSearchQuery('');
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [searchOpen]);

  // Search functionality
  useEffect(() => {
    if (!searchQuery.trim()) {
      setSearchResults([]);
      return;
    }

    const query = searchQuery.toLowerCase();
    const results: Array<{
      type: string;
      title: string;
      subtitle: string;
      action: () => void;
    }> = [];

    // Search orders
    orders.forEach(order => {
      if (order.patient.toLowerCase().includes(query) || 
          order.id.toLowerCase().includes(query) ||
          order.treatment.toLowerCase().includes(query)) {
        results.push({
          type: 'Orden',
          title: order.patient,
          subtitle: `${order.id} · ${order.treatment}`,
          action: () => {
            setActiveSection('ordenes');
            setSearchOpen(false);
            setSearchQuery('');
          }
        });
      }
    });

    // Search patients
    patients.forEach(patient => {
      if (patient.name.toLowerCase().includes(query)) {
        results.push({
          type: 'Paciente',
          title: patient.name,
          subtitle: `${patient.orderCount} órdenes`,
          action: () => {
            setActiveSection('home');
            setSearchOpen(false);
            setSearchQuery('');
          }
        });
      }
    });

    // Search inventory
    inventory.forEach(item => {
      if (item.name.toLowerCase().includes(query)) {
        results.push({
          type: 'Inventario',
          title: item.name,
          subtitle: `${item.stock} ${item.unit}`,
          action: () => {
            setActiveSection('inventario');
            setSearchOpen(false);
            setSearchQuery('');
          }
        });
      }
    });

    // Search navigation
    navItems.forEach(item => {
      if (item.label.toLowerCase().includes(query)) {
        results.push({
          type: 'Módulo',
          title: item.label,
          subtitle: 'Ir a sección',
          action: () => {
            setActiveSection(item.id as any);
            setSearchOpen(false);
            setSearchQuery('');
          }
        });
      }
    });

    setSearchResults(results.slice(0, 8));
  }, [searchQuery, orders, patients, inventory]);

  // Click outside to close
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setSearchOpen(false);
        setSearchQuery('');
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <header className="relative z-20 px-6 py-4">
      <div className="flex items-center justify-between">
        {/* LEFT: Brand */}
        <div className="flex items-baseline gap-1.5">
          <span className="text-[17px] font-bold tracking-tight" style={{ color: '#111A35' }}>
            DentiKC
          </span>
          <span className="text-[11px] font-semibold tracking-wide uppercase" style={{ color: '#7B8BA5' }}>
            LAB OS
          </span>
        </div>

        {/* CENTER: Navigation Pill */}
        <nav
          className="flex items-center gap-0.5 p-1 rounded-full"
          style={{
            background: 'rgba(255, 255, 255, 0.7)',
            backdropFilter: 'blur(8px)',
            boxShadow: '0 2px 12px rgba(17, 26, 53, 0.04), inset 0 1px 0 rgba(255, 255, 255, 0.6)',
          }}
        >
          {navItems.map((item) => {
            const isActive = activeSection === item.id;
            return (
              <button
                key={item.id}
                onClick={() => setActiveSection(item.id as any)}
                className="px-3.5 py-1.5 rounded-full text-[13px] font-medium"
                style={{
                  background: isActive
                    ? 'linear-gradient(135deg, #121A30 0%, #1C2942 100%)'
                    : 'transparent',
                  color: isActive ? '#FFFFFF' : '#3D4F6F',
                  boxShadow: isActive
                    ? '0 2px 8px rgba(17, 26, 53, 0.15), inset 0 1px 0 rgba(255, 255, 255, 0.05)'
                    : 'none',
                  transition: 'all 200ms cubic-bezier(0.22, 1, 0.36, 1)',
                }}
                onMouseEnter={(e) => {
                  if (!isActive) {
                    e.currentTarget.style.background = 'rgba(255, 255, 255, 0.6)';
                    e.currentTarget.style.color = '#111A35';
                    e.currentTarget.style.transform = 'translateY(-1px)';
                  }
                }}
                onMouseLeave={(e) => {
                  if (!isActive) {
                    e.currentTarget.style.background = 'transparent';
                    e.currentTarget.style.color = '#3D4F6F';
                    e.currentTarget.style.transform = 'translateY(0)';
                  }
                }}
                onMouseDown={(e) => {
                  e.currentTarget.style.transform = 'scale(0.97)';
                }}
                onMouseUp={(e) => {
                  e.currentTarget.style.transform = isActive ? 'translateY(0)' : 'translateY(-1px)';
                }}
              >
                {item.label}
              </button>
            );
          })}
        </nav>

        {/* RIGHT: Search + Notifications + Profile */}
        <div className="flex items-center gap-3">
          {/* Search */}
          <div ref={searchRef} className="relative">
            <button
              onClick={() => setSearchOpen(!searchOpen)}
              className="flex items-center gap-2 px-3 py-2 rounded-full transition-all duration-150"
              style={{
                background: searchOpen ? 'rgba(255, 255, 255, 0.9)' : 'rgba(255, 255, 255, 0.5)',
                boxShadow: '0 2px 8px rgba(17, 26, 53, 0.03), inset 0 1px 0 rgba(255, 255, 255, 0.6)',
              }}
            >
              <Search size={14} style={{ color: '#7B8BA5' }} />
              <span className="text-[11px]" style={{ color: '#7B8BA5' }}>
                {searchOpen ? '' : 'Buscar... (/)'}
              </span>
            </button>

            {/* Search Results */}
            {searchOpen && (
              <div
                className="absolute right-0 top-full mt-2 w-80 rounded-2xl overflow-hidden animate-fadeIn z-50"
                style={{
                  background: 'rgba(255, 255, 255, 0.97)',
                  boxShadow: '0 16px 48px rgba(17, 26, 53, 0.12), 0 4px 12px rgba(17, 26, 53, 0.04)',
                  backdropFilter: 'blur(12px)',
                }}
              >
                <div className="flex items-center gap-2 p-3 border-b border-gray-100">
                  <Search size={14} style={{ color: '#7B8BA5' }} />
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Buscar órdenes, pacientes, módulos..."
                    className="flex-1 bg-transparent border-none outline-none text-[12px]"
                    style={{ color: '#111A35' }}
                    autoFocus
                  />
                </div>

                <div className="max-h-80 overflow-y-auto p-2">
                  {searchQuery && searchResults.length === 0 && (
                    <p className="text-[11px] text-center py-4" style={{ color: '#7B8BA5' }}>
                      Sin resultados
                    </p>
                  )}
                  {searchResults.map((result, idx) => (
                    <button
                      key={idx}
                      onClick={result.action}
                      className="w-full flex items-center gap-2.5 px-2.5 py-2 rounded-lg text-left transition-all duration-100 hover:bg-blue-50"
                    >
                      <div
                        className="w-7 h-7 rounded-lg flex items-center justify-center shrink-0"
                        style={{
                          background: result.type === 'Orden' ? 'rgba(40, 120, 255, 0.1)' :
                                     result.type === 'Paciente' ? 'rgba(16, 185, 129, 0.1)' :
                                     result.type === 'Inventario' ? 'rgba(245, 158, 11, 0.1)' :
                                     'rgba(139, 92, 246, 0.1)',
                        }}
                      >
                        <span className="text-[9px] font-bold" style={{
                          color: result.type === 'Orden' ? '#2878FF' :
                                 result.type === 'Paciente' ? '#10B981' :
                                 result.type === 'Inventario' ? '#F59E0B' :
                                 '#8B5CF6',
                        }}>
                          {result.type[0]}
                        </span>
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-[11.5px] font-medium truncate" style={{ color: '#111A35' }}>
                          {result.title}
                        </p>
                        <p className="text-[9.5px] truncate" style={{ color: '#7B8BA5' }}>
                          {result.subtitle}
                        </p>
                      </div>
                      <span className="text-[9px] font-medium px-1.5 py-0.5 rounded" style={{ background: '#F1F5F9', color: '#7B8BA5' }}>
                        {result.type}
                      </span>
                    </button>
                  ))}
                  {!searchQuery && (
                    <p className="text-[10px] text-center py-3" style={{ color: '#7B8BA5' }}>
                      Escribe para buscar · Esc para cerrar
                    </p>
                  )}
                </div>
              </div>
            )}
          </div>

          {/* Notifications */}
          <button className="relative p-2 hover:bg-white/60 rounded-full transition-all duration-150">
            <Bell size={16} style={{ color: '#3D4F6F' }} />
            {unreadNotificationCount > 0 && (
              <span
                className="absolute top-1 right-1 min-w-[14px] h-[14px] rounded-full flex items-center justify-center text-[8px] font-bold px-1"
                style={{ background: '#EF4444', color: '#FFFFFF', boxShadow: '0 0 0 2px rgba(255,255,255,0.8)' }}
              >
                {unreadNotificationCount}
              </span>
            )}
          </button>

          {/* Profile */}
          <button className="flex items-center gap-2 pl-1 pr-2 py-1 rounded-full transition-all duration-150 hover:bg-white/60">
            <div
              className="w-7 h-7 rounded-full flex items-center justify-center text-[11px] font-bold"
              style={{
                background: 'linear-gradient(135deg, #2878FF 0%, #1D65E0 100%)',
                color: '#FFFFFF',
                boxShadow: '0 2px 6px rgba(40, 120, 255, 0.2)',
              }}
            >
              J
            </div>
            <div className="flex flex-col items-start">
              <span className="text-[12px] font-semibold leading-tight" style={{ color: '#111A35' }}>
                Josy
              </span>
              <span className="text-[10px] leading-tight" style={{ color: '#7B8BA5' }}>
                Administrador
              </span>
            </div>
            <ChevronDown size={12} style={{ color: '#7B8BA5' }} />
          </button>
        </div>
      </div>
    </header>
  );
}
