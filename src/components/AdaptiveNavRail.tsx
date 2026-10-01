import { Home, ClipboardList, Calendar, Package, Box, Settings } from 'lucide-react';
import { useNavigation } from '../contexts/NavigationContext';

const navItems = [
  { id: 'home', label: 'Home', icon: Home },
  { id: 'ordenes', label: 'Órdenes', icon: ClipboardList },
  { id: 'horario', label: 'Horario', icon: Calendar },
  { id: 'inventario', label: 'Inventario', icon: Package },
  { id: 'captura3d', label: 'Captura 3D', icon: Box }
];

export function AdaptiveNavRail() {
  const { activeSection, setActiveSection } = useNavigation();

  return (
    <aside className="fixed left-4 top-1/2 -translate-y-1/2 z-50 flex items-center justify-center pointer-events-none">
      <div
        className="pointer-events-auto relative"
        style={{
          width: '64px',
          height: 'clamp(420px, 60dvh, 520px)',
        }}
      >
        {/* Light translucent capsule */}
        <div
          className="absolute inset-0 rounded-[32px]"
          style={{
            background: 'rgba(255, 255, 255, 0.7)',
            backdropFilter: 'blur(20px)',
            boxShadow: '0 8px 32px rgba(17, 38, 74, 0.08), inset 0 1px 0 rgba(255, 255, 255, 0.9)',
            border: '1px solid rgba(255, 255, 255, 0.8)',
          }}
        />

        {/* Navigation Items */}
        <nav className="relative z-10 flex flex-col items-center gap-2 pt-6 pb-6 h-full">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeSection === item.id;
            
            return (
              <button
                key={item.id}
                onClick={() => setActiveSection(item.id as any)}
                className="relative flex items-center justify-center"
                style={{
                  width: '44px',
                  height: '44px',
                  borderRadius: '14px',
                  transition: 'all 180ms cubic-bezier(0.22, 1, 0.36, 1)',
                }}
                title={item.label}
                aria-label={item.label}
                onMouseEnter={(e) => {
                  if (!isActive) {
                    e.currentTarget.style.background = 'rgba(40, 120, 255, 0.08)';
                    e.currentTarget.style.transform = 'scale(1.05)';
                    const icon = e.currentTarget.querySelector('svg');
                    if (icon) icon.style.color = '#2878FF';
                  }
                }}
                onMouseLeave={(e) => {
                  if (!isActive) {
                    e.currentTarget.style.background = 'transparent';
                    e.currentTarget.style.transform = 'scale(1)';
                    const icon = e.currentTarget.querySelector('svg');
                    if (icon) icon.style.color = '#10264A';
                  }
                }}
                onMouseDown={(e) => {
                  e.currentTarget.style.transform = 'scale(0.95)';
                }}
                onMouseUp={(e) => {
                  e.currentTarget.style.transform = isActive ? 'scale(1)' : 'scale(1.05)';
                }}
              >
                {/* Active background */}
                {isActive && (
                  <div
                    className="absolute inset-0 pointer-events-none animate-fadeIn"
                    style={{
                      background: 'linear-gradient(135deg, #2878FF 0%, #1D65E0 100%)',
                      borderRadius: '14px',
                      boxShadow: '0 0 20px rgba(40, 120, 255, 0.3), inset 0 1px 0 rgba(255, 255, 255, 0.3)',
                      animation: 'fadeIn 220ms cubic-bezier(0.22, 1, 0.36, 1)',
                    }}
                  />
                )}

                <Icon
                  size={20}
                  strokeWidth={isActive ? 2.2 : 1.8}
                  className="relative z-10 pointer-events-none"
                  style={{
                    color: isActive ? '#FFFFFF' : '#10264A',
                    transition: 'all 180ms cubic-bezier(0.22, 1, 0.36, 1)',
                  }}
                />
              </button>
            );
          })}

          {/* Settings at bottom */}
          <div className="flex-1" />
          <button
            className="relative flex items-center justify-center"
            style={{
              width: '44px',
              height: '44px',
              borderRadius: '14px',
              transition: 'all 180ms cubic-bezier(0.22, 1, 0.36, 1)',
            }}
            title="Configuración"
            aria-label="Configuración"
            onMouseEnter={(e) => {
              e.currentTarget.style.background = 'rgba(40, 120, 255, 0.08)';
              e.currentTarget.style.transform = 'scale(1.05)';
              const icon = e.currentTarget.querySelector('svg');
              if (icon) icon.style.color = '#2878FF';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = 'transparent';
              e.currentTarget.style.transform = 'scale(1)';
              const icon = e.currentTarget.querySelector('svg');
              if (icon) icon.style.color = '#10264A';
            }}
            onMouseDown={(e) => {
              e.currentTarget.style.transform = 'scale(0.95)';
            }}
            onMouseUp={(e) => {
              e.currentTarget.style.transform = 'scale(1.05)';
            }}
          >
            <Settings
              size={20}
              strokeWidth={1.8}
              className="relative z-10 pointer-events-none"
              style={{
                color: '#10264A',
                transition: 'all 180ms cubic-bezier(0.22, 1, 0.36, 1)',
              }}
            />
          </button>
        </nav>
      </div>
    </aside>
  );
}
