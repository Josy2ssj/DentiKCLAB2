import { FileText, CheckCircle2, Clock, ChevronRight } from 'lucide-react';
import { useData } from '../contexts/DataContext';
import { useNavigation } from '../contexts/NavigationContext';
import { getPendingOrders, getWeeklyDeliveredOrders } from '../lib/orderSelectors';

interface OrderStatusNotchProps {
  type: 'pending' | 'weekly-delivered';
  compact?: boolean;
}

export default function OrderStatusNotch({ type, compact = false }: OrderStatusNotchProps) {
  const { orders } = useData();
  const { setActiveSection } = useNavigation();

  const handleClick = () => {
    if (type === 'pending') {
      setActiveSection('ordenes');
      // TODO: Apply filter for pending orders
    } else {
      setActiveSection('ordenes');
      // TODO: Apply filter for weekly delivered orders
    }
  };

  if (type === 'pending') {
    const pendingOrders = getPendingOrders(orders);
    const count = pendingOrders.length;

    return (
      <div
        onClick={handleClick}
        className="cursor-pointer transition-all duration-200 hover:brightness-105 active:scale-[0.99]"
        style={{
          background: 'linear-gradient(155deg, #FFE477 0%, #FFD052 40%, #F6B62E 100%)',
          borderRadius: '20px 20px 0 0',
          boxShadow: '0 4px 20px rgba(246, 182, 46, 0.15)',
          height: '100px',
          position: 'relative',
        }}
      >
        {/* Highlight */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background: 'radial-gradient(ellipse 80% 60% at 30% 20%, rgba(255, 255, 255, 0.4) 0%, transparent 60%)',
            borderRadius: 'inherit',
          }}
        />

        {/* Content */}
        <div className="relative px-4 pt-3 pb-2 flex items-center justify-between" style={{ height: '76px' }}>
          <div className="flex items-center gap-2.5">
            <div
              className="w-8 h-8 rounded-xl flex items-center justify-center"
              style={{
                background: 'rgba(255, 255, 255, 0.3)',
                backdropFilter: 'blur(4px)',
                boxShadow: 'inset 0 1px 0 rgba(255, 255, 255, 0.4)',
              }}
            >
              <FileText size={15} style={{ color: '#7C2D12' }} />
            </div>
            <div>
              <h3 className="text-[14px] font-bold leading-tight" style={{ color: '#7C2D12' }}>
                Pendientes
              </h3>
            </div>
            <span
              className="text-[22px] font-extrabold leading-none ml-1"
              style={{ color: '#7C2D12' }}
            >
              {count}
            </span>
          </div>

          <div className="flex items-center gap-2">
            <div className="flex items-center gap-1">
              <Clock size={11} style={{ color: '#7C2D12' }} />
              <span className="text-[10px] font-medium" style={{ color: '#7C2D12' }}>
                Hoy
              </span>
            </div>
            <button
              className="flex items-center gap-1 px-2 py-1 rounded-full text-[10px] font-semibold transition-all duration-150"
              style={{
                background: 'rgba(255, 255, 255, 0.3)',
                color: '#7C2D12',
                backdropFilter: 'blur(4px)',
              }}
            >
              Ver todos
              <ChevronRight size={10} />
            </button>
          </div>
        </div>

        {/* Visual extension behind widget - 40px */}
        <div
          className="absolute left-0 right-0 pointer-events-none"
          style={{
            top: '76px',
            height: '40px',
            background: 'linear-gradient(155deg, #FFE477 0%, #FFD052 40%, #F6B62E 100%)',
          }}
        />
      </div>
    );
  }

  // Weekly delivered
  const weeklyDelivered = getWeeklyDeliveredOrders(orders);
  const count = weeklyDelivered.length;

  return (
    <div
      onClick={handleClick}
      className="cursor-pointer transition-all duration-200 hover:brightness-105 active:scale-[0.99]"
      style={{
        background: 'linear-gradient(155deg, #79E4C2 0%, #51D8B5 40%, #2EC5A5 100%)',
        borderRadius: '20px 20px 0 0',
        boxShadow: '0 4px 20px rgba(46, 197, 165, 0.15)',
        height: '100px',
        position: 'relative',
      }}
    >
      {/* Highlight */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse 80% 60% at 70% 20%, rgba(255, 255, 255, 0.35) 0%, transparent 60%)',
          borderRadius: 'inherit',
        }}
      />

      {/* Content */}
      <div className="relative px-4 pt-3 pb-2 flex items-center justify-between" style={{ height: '76px' }}>
        <div className="flex items-center gap-2.5">
          <div
            className="w-8 h-8 rounded-xl flex items-center justify-center"
            style={{
              background: 'rgba(255, 255, 255, 0.3)',
              backdropFilter: 'blur(4px)',
              boxShadow: 'inset 0 1px 0 rgba(255, 255, 255, 0.4)',
            }}
          >
            <CheckCircle2 size={15} style={{ color: '#064E3B' }} />
          </div>
          <div>
            <h3 className="text-[14px] font-bold leading-tight" style={{ color: '#064E3B' }}>
              Entregadas esta semana
            </h3>
          </div>
          <span
            className="text-[22px] font-extrabold leading-none ml-1"
            style={{ color: '#064E3B' }}
          >
            {count}
          </span>
        </div>

        <button
          className="flex items-center gap-1 px-2 py-1 rounded-full text-[10px] font-semibold transition-all duration-150"
          style={{
            background: 'rgba(255, 255, 255, 0.3)',
            color: '#064E3B',
            backdropFilter: 'blur(4px)',
          }}
        >
          Ver todos
          <ChevronRight size={10} />
        </button>
      </div>

      {/* Visual extension behind widget - 40px */}
      <div
        className="absolute left-0 right-0 pointer-events-none"
        style={{
          top: '76px',
          height: '40px',
          background: 'linear-gradient(155deg, #79E4C2 0%, #51D8B5 40%, #2EC5A5 100%)',
        }}
      />
    </div>
  );
}
