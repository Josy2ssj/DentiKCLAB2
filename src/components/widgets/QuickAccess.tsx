import { Plus, Box, Users, Package, ArrowUpRight } from 'lucide-react';
import { useNavigation } from '../../contexts/NavigationContext';

const actions = [
  {
    id: 'new-order',
    title: 'Nueva orden',
    description: 'Crear orden de trabajo',
    icon: Plus,
    tint: 'rgba(219, 234, 254, 0.5)',
    iconColor: '#2878FF',
    iconBg: 'rgba(219, 234, 254, 0.7)',
    route: 'ordenes',
  },
  {
    id: 'capture-3d',
    title: 'Captura 3D',
    description: 'Escanear y exportar',
    icon: Box,
    tint: 'rgba(238, 233, 255, 0.5)',
    iconColor: '#8B5CF6',
    iconBg: 'rgba(238, 233, 255, 0.7)',
    route: 'captura3d',
  },
  {
    id: 'patients',
    title: 'Pacientes',
    description: 'Gestionar pacientes',
    icon: Users,
    tint: 'rgba(209, 250, 229, 0.45)',
    iconColor: '#10B981',
    iconBg: 'rgba(209, 250, 229, 0.7)',
    route: 'home',
  },
  {
    id: 'inventory',
    title: 'Inventario',
    description: 'Materiales y stock',
    icon: Package,
    tint: 'rgba(254, 243, 199, 0.5)',
    iconColor: '#F59E0B',
    iconBg: 'rgba(254, 243, 199, 0.7)',
    route: 'inventario',
  },
];

export default function QuickAccess() {
  const { setActiveSection } = useNavigation();

  return (
    <div
      className="h-full flex flex-col px-4 pt-4"
      style={{
        background: 'rgba(255, 255, 255, 0.88)',
        borderRadius: '22px',
        backdropFilter: 'blur(8px)',
        boxShadow: '0 8px 32px rgba(17, 26, 53, 0.05), 0 2px 8px rgba(17, 26, 53, 0.02), inset 0 1px 0 rgba(255, 255, 255, 0.8)',
        paddingBottom: '18px',
      }}
    >
      {/* Header */}
      <div className="mb-3">
        <h3 className="text-[13.5px] font-bold" style={{ color: '#111A35' }}>
          Accesos rápidos
        </h3>
        <p className="text-[11px] mt-0.5" style={{ color: '#7B8BA5' }}>
          Todo lo que necesitas, en un solo lugar.
        </p>
      </div>

      {/* 2x2 Grid */}
      <div className="flex-1 grid grid-cols-2 gap-2">
        {actions.map((action) => {
          const Icon = action.icon;
          return (
            <button
              key={action.id}
              onClick={() => setActiveSection(action.route as any)}
              className="flex flex-col items-start p-3 rounded-xl transition-all duration-200 hover:brightness-105 active:scale-[0.98] group text-left relative"
              style={{ background: action.tint }}
            >
              <div className="flex items-center justify-between w-full">
                <div
                  className="w-7 h-7 rounded-lg flex items-center justify-center transition-transform duration-200 group-hover:scale-110"
                  style={{ background: action.iconBg }}
                >
                  <Icon size={14} style={{ color: action.iconColor }} />
                </div>
                <div
                  className="w-5 h-5 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-200 group-hover:translate-x-0.5"
                  style={{ background: 'rgba(255, 255, 255, 0.7)' }}
                >
                  <ArrowUpRight size={10} style={{ color: action.iconColor }} />
                </div>
              </div>
              <p className="text-[11px] font-semibold mt-2" style={{ color: '#111A35' }}>
                {action.title}
              </p>
              <p className="text-[9.5px] mt-0.5" style={{ color: '#7B8BA5' }}>
                {action.description}
              </p>
            </button>
          );
        })}
      </div>
    </div>
  );
}
