import { Home, ClipboardList, Calendar, Package, Box, Settings } from 'lucide-react';
import { useNavigation } from '../contexts/NavigationContext';

const navItems = [
  { id: 'home', label: 'Home', icon: Home },
  { id: 'ordenes', label: 'Órdenes', icon: ClipboardList },
  { id: 'horario', label: 'Horario', icon: Calendar },
  { id: 'inventario', label: 'Inventario', icon: Package },
  { id: 'captura3d', label: 'Captura 3D', icon: Box },
  { id: 'settings', label: 'Ajustes', icon: Settings }
];

export function AdaptiveNavRail() {
  const { activeSection, setActiveSection } = useNavigation();

  return (
    <aside className="fixed left-0 top-0 z-50 flex items-center justify-center h-dvh pointer-events-none">
      <div
        className="pointer-events-auto relative"
        style={{
          width: '72px',
          height: 'clamp(480px, 62dvh, 560px)',
        }}
      >
        {/* Organic SVG silhouette */}
        <svg
          className="absolute inset-0 w-full h-full pointer-events-none"
          viewBox="0 0 72 560"
          preserveAspectRatio="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            <linearGradient id="sidebarGrad" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#0F1729" />
              <stop offset="70%" stopColor="#15213A" />
              <stop offset="100%" stopColor="#1A2847" />
            </linearGradient>
            <filter id="softShadow">
              <feGaussianBlur in="SourceAlpha" stdDeviation="4" />
              <feOffset dx="3" dy="0" result="offsetblur" />
              <feComponentTransfer>
                <feFuncA type="linear" slope="0.15" />
              </feComponentTransfer>
              <feMerge>
                <feMergeNode />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
          </defs>

          {/* Organic shape with smooth curves */}
          <path
            d="M 0,0 L 48,0 C 60,0 72,12 72,24 L 72,536 C 72,548 60,560 48,560 L 0,560 Z"
            fill="url(#sidebarGrad)"
            filter="url(#softShadow)"
          />

          {/* Inner edge highlight */}
          <path
            d="M 72,24 L 72,536"
            stroke="rgba(255,255,255,0.06)"
            strokeWidth="1"
            fill="none"
          />
        </svg>

        {/* Navigation Items */}
        <nav className="relative z-10 flex flex-col items-center gap-1 pt-14 pb-10 h-full">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeSection === item.id;
            
            return (
              <button
                key={item.id}
                onClick={() => setActiveSection(item.id as any)}
                className="relative flex items-center justify-center transition-all duration-200"
                style={{
                  width: '48px',
                  height: '48px',
                  borderRadius: '14px',
                }}
                title={item.label}
                aria-label={item.label}
              >
                {/* Active background */}
                {isActive && (
                  <div
                    className="absolute inset-0 pointer-events-none"
                    style={{
                      background: 'linear-gradient(135deg, #2878FF 0%, #1D65E0 100%)',
                      borderRadius: '14px',
                      boxShadow: '0 0 24px rgba(40, 120, 255, 0.4), inset 0 1px 0 rgba(255, 255, 255, 0.25), 0 2px 8px rgba(0, 0, 0, 0.2)',
                    }}
                  />
                )}

                <Icon
                  size={20}
                  className="relative z-10 pointer-events-none"
                  style={{
                    color: isActive ? '#FFFFFF' : '#7B8BA5',
                  }}
                />
              </button>
            );
          })}
        </nav>
      </div>
    </aside>
  );
}
