import { useState } from 'react';
import { useData, Order } from '../contexts/DataContext';
import { OrderCard } from './OrderCard';

type TimeScale = 'week' | 'month' | 'year';

export function Timeline() {
  const { orders } = useData();
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
  const [timeScale, setTimeScale] = useState<TimeScale>('week');
  const [currentDate, setCurrentDate] = useState(new Date());

  // Get orders with delivery dates
  const ordersWithDates = orders.filter(order => order.deliveryDate);

  // Generate timeline dates based on scale
  const getTimelineDates = () => {
    const dates: Date[] = [];
    const start = new Date(currentDate);
    
    if (timeScale === 'week') {
      // Show 7 days starting from current week
      start.setDate(start.getDate() - start.getDay());
      for (let i = 0; i < 7; i++) {
        const date = new Date(start);
        date.setDate(start.getDate() + i);
        dates.push(date);
      }
    } else if (timeScale === 'month') {
      // Show 4 weeks
      start.setDate(start.getDate() - start.getDay());
      for (let i = 0; i < 28; i++) {
        const date = new Date(start);
        date.setDate(start.getDate() + i);
        dates.push(date);
      }
    } else {
      // Show 12 months
      for (let i = 0; i < 12; i++) {
        const date = new Date(start);
        date.setMonth(start.getMonth() + i);
        dates.push(date);
      }
    }
    
    return dates;
  };

  const timelineDates = getTimelineDates();

  // Group orders by date
  const getOrdersByDate = (date: Date) => {
    const dateStr = date.toISOString().split('T')[0];
    return ordersWithDates.filter(order => order.deliveryDate === dateStr);
  };

  const navigateTimeline = (direction: 'prev' | 'next') => {
    const newDate = new Date(currentDate);
    if (timeScale === 'week') {
      newDate.setDate(newDate.getDate() + (direction === 'next' ? 7 : -7));
    } else if (timeScale === 'month') {
      newDate.setMonth(newDate.getMonth() + (direction === 'next' ? 1 : -1));
    } else {
      newDate.setFullYear(newDate.getFullYear() + (direction === 'next' ? 1 : -1));
    }
    setCurrentDate(newDate);
  };

  const goToToday = () => {
    setCurrentDate(new Date());
  };

  const formatDateRange = () => {
    if (timeScale === 'week') {
      const start = new Date(currentDate);
      start.setDate(start.getDate() - start.getDay());
      const end = new Date(start);
      end.setDate(start.getDate() + 6);
      return `${start.toLocaleDateString('es-ES', { day: 'numeric', month: 'short' })} – ${end.toLocaleDateString('es-ES', { day: 'numeric', month: 'short', year: 'numeric' })}`;
    } else if (timeScale === 'month') {
      return currentDate.toLocaleDateString('es-ES', { month: 'long', year: 'numeric' });
    } else {
      return currentDate.getFullYear().toString();
    }
  };

  return (
    <div className="h-full flex flex-col" style={{ 
      background: 'rgba(255, 255, 255, 0.94)',
      borderRadius: '24px',
      backdropFilter: 'blur(8px)',
      boxShadow: '0 8px 32px rgba(17, 26, 53, 0.06), inset 0 1px 0 rgba(255, 255, 255, 0.9)',
    }}>
      {/* Header */}
      <div className="flex items-center justify-between px-5 py-4 border-b border-gray-100">
        <div className="flex items-center gap-3">
          <h3 className="text-[15px] font-bold" style={{ color: '#111A35' }}>
            Timeline de Órdenes
          </h3>
          
          {/* Time Scale Selector */}
          <div className="flex gap-1 p-1 rounded-full" style={{ background: 'rgba(241, 245, 249, 0.8)' }}>
            {(['week', 'month', 'year'] as TimeScale[]).map((scale) => (
              <button
                key={scale}
                onClick={() => setTimeScale(scale)}
                className="px-3 py-1 rounded-full text-[11px] font-semibold transition-all duration-200"
                style={{
                  background: timeScale === scale ? 'linear-gradient(135deg, #121A30 0%, #1C2942 100%)' : 'transparent',
                  color: timeScale === scale ? '#FFFFFF' : '#4A5568',
                }}
              >
                {scale === 'week' ? 'Semana' : scale === 'month' ? 'Mes' : 'Año'}
              </button>
            ))}
          </div>
        </div>

        {/* Navigation Controls */}
        <div className="flex items-center gap-2">
          <button
            onClick={() => navigateTimeline('prev')}
            className="w-8 h-8 rounded-lg flex items-center justify-center transition-all duration-150 hover:bg-gray-100"
            aria-label="Anterior"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M15 18l-6-6 6-6" />
            </svg>
          </button>
          
          <div className="px-3 py-1.5 rounded-lg text-[12px] font-medium" style={{ background: 'rgba(241, 245, 249, 0.8)', color: '#3D4F6F' }}>
            {formatDateRange()}
          </div>
          
          <button
            onClick={() => navigateTimeline('next')}
            className="w-8 h-8 rounded-lg flex items-center justify-center transition-all duration-150 hover:bg-gray-100"
            aria-label="Siguiente"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M9 18l6-6-6-6" />
            </svg>
          </button>

          <button
            onClick={goToToday}
            className="px-3 py-1.5 rounded-lg text-[11px] font-semibold transition-all duration-150 hover:bg-gray-100"
            style={{ background: 'rgba(40, 120, 255, 0.1)', color: '#2878FF' }}
          >
            Hoy
          </button>
        </div>
      </div>

      {/* Timeline Visualization */}
      <div className="flex-1 px-5 py-6 overflow-x-auto">
        <div className="relative min-w-full" style={{ minHeight: '300px' }}>
          {/* Main Timeline Line */}
          <div 
            className="absolute left-0 right-0 top-1/2 h-[2px]"
            style={{ background: 'linear-gradient(90deg, transparent 0%, #E2E8F0 10%, #E2E8F0 90%, transparent 100%)' }}
          />

          {/* Timeline Nodes */}
          <div className="relative flex items-center justify-between h-full" style={{ minWidth: timeScale === 'week' ? '100%' : '1200px' }}>
            {timelineDates.map((date, index) => {
              const dateOrders = getOrdersByDate(date);
              const hasOrders = dateOrders.length > 0;
              const isToday = date.toDateString() === new Date().toDateString();

              return (
                <div key={index} className="relative flex flex-col items-center" style={{ flex: '1 1 0' }}>
                  {/* Date Label (only for dates with orders) */}
                  {hasOrders && (
                    <div className="absolute -top-12 flex flex-col items-center">
                      <span className="text-[10px] font-medium" style={{ color: '#7B8BA5' }}>
                        {date.toLocaleDateString('es-ES', { weekday: 'short' })}
                      </span>
                      <span className="text-[11px] font-bold" style={{ color: '#111A35' }}>
                        {date.getDate()}
                      </span>
                    </div>
                  )}

                  {/* Order Nodes */}
                  {hasOrders && (
                    <div className="absolute -top-2 flex flex-col gap-2 items-center">
                      {dateOrders.slice(0, 3).map((order, orderIndex) => (
                        <TimelineOrderNode
                          key={order.id}
                          order={order}
                          onClick={() => setSelectedOrder(order)}
                          delay={orderIndex * 50}
                        />
                      ))}
                      {dateOrders.length > 3 && (
                        <div className="text-[10px] font-semibold px-2 py-1 rounded-full" style={{ background: 'rgba(40, 120, 255, 0.1)', color: '#2878FF' }}>
                          +{dateOrders.length - 3}
                        </div>
                      )}
                    </div>
                  )}

                  {/* Timeline Dot */}
                  <div
                    className="relative z-10 rounded-full transition-all duration-200"
                    style={{
                      width: hasOrders ? '12px' : '8px',
                      height: hasOrders ? '12px' : '8px',
                      background: hasOrders ? '#2878FF' : '#CBD5E1',
                      boxShadow: hasOrders ? '0 0 0 4px rgba(40, 120, 255, 0.1)' : 'none',
                      border: isToday ? '2px solid #2878FF' : 'none',
                    }}
                  />

                  {/* Today Indicator */}
                  {isToday && (
                    <div className="absolute top-4 text-[9px] font-bold" style={{ color: '#2878FF' }}>
                      HOY
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Week Navigator Bar */}
      {timeScale === 'week' && (
        <div className="px-5 py-3 border-t border-gray-100">
          <div className="flex items-center justify-between">
            <button
              onClick={() => navigateTimeline('prev')}
              className="w-7 h-7 rounded-lg flex items-center justify-center transition-all duration-150 hover:bg-gray-100"
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M15 18l-6-6 6-6" />
              </svg>
            </button>

            <div className="flex gap-2">
              {Array.from({ length: 4 }).map((_, weekIndex) => {
                const weekStart = new Date(currentDate);
                weekStart.setDate(weekStart.getDate() - weekStart.getDay() + (weekIndex * 7));
                const weekEnd = new Date(weekStart);
                weekEnd.setDate(weekStart.getDate() + 6);
                const isCurrentWeek = weekStart.toDateString() === new Date(currentDate.setDate(currentDate.getDate() - currentDate.getDay())).toDateString();

                return (
                  <button
                    key={weekIndex}
                    onClick={() => setCurrentDate(weekStart)}
                    className="px-3 py-1.5 rounded-full text-[10px] font-semibold transition-all duration-200"
                    style={{
                      background: isCurrentWeek ? 'linear-gradient(135deg, #121A30 0%, #1C2942 100%)' : 'transparent',
                      color: isCurrentWeek ? '#FFFFFF' : '#7B8BA5',
                    }}
                  >
                    {weekStart.getDate()}–{weekEnd.getDate()}
                  </button>
                );
              })}
            </div>

            <button
              onClick={() => navigateTimeline('next')}
              className="w-7 h-7 rounded-lg flex items-center justify-center transition-all duration-150 hover:bg-gray-100"
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M9 18l6-6-6-6" />
              </svg>
            </button>
          </div>
        </div>
      )}

      {/* Order Card Modal */}
      {selectedOrder && (
        <OrderCard
          order={selectedOrder}
          onClose={() => setSelectedOrder(null)}
        />
      )}
    </div>
  );
}

function TimelineOrderNode({ order, onClick, delay = 0 }: { order: Order; onClick: () => void; delay?: number }) {
  const [isHovered, setIsHovered] = useState(false);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending': return { main: '#F59E0B', glow: 'rgba(245, 158, 11, 0.3)' };
      case 'in_progress': return { main: '#2878FF', glow: 'rgba(40, 120, 255, 0.3)' };
      case 'ready': return { main: '#10B981', glow: 'rgba(16, 185, 129, 0.3)' };
      case 'delivered': return { main: '#8B5CF6', glow: 'rgba(139, 92, 246, 0.3)' };
      default: return { main: '#CBD5E1', glow: 'rgba(203, 213, 225, 0.3)' };
    }
  };

  const statusColor = getStatusColor(order.status);

  return (
    <div
      className="relative cursor-pointer transition-all duration-200"
      style={{
        animation: `fadeIn 300ms cubic-bezier(0.22, 1, 0.36, 1) ${delay}ms both`,
      }}
      onClick={onClick}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Glow Effect */}
      <div
        className="absolute inset-0 rounded-full transition-opacity duration-200"
        style={{
          background: `radial-gradient(circle, ${statusColor.glow} 0%, transparent 70%)`,
          opacity: isHovered ? 1 : 0.5,
          transform: 'scale(1.5)',
        }}
      />

      {/* Main Node */}
      <div
        className="relative w-10 h-10 rounded-full flex items-center justify-center transition-all duration-200"
        style={{
          background: 'white',
          boxShadow: isHovered 
            ? `0 4px 12px ${statusColor.glow}, 0 0 0 2px ${statusColor.main}`
            : '0 2px 8px rgba(17, 26, 53, 0.1)',
          transform: isHovered ? 'scale(1.1)' : 'scale(1)',
        }}
      >
        {/* Status Indicator */}
        <div
          className="absolute -top-1 -right-1 w-3 h-3 rounded-full"
          style={{
            background: statusColor.main,
            boxShadow: `0 0 0 2px white, 0 0 8px ${statusColor.glow}`,
          }}
        />

        {/* Icon */}
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke={statusColor.main} strokeWidth="2">
          <path d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
        </svg>
      </div>

      {/* Hover Tooltip */}
      {isHovered && (
        <div
          className="absolute left-1/2 -translate-x-1/2 -top-20 w-48 p-3 rounded-xl animate-fadeIn"
          style={{
            background: 'rgba(255, 255, 255, 0.98)',
            backdropFilter: 'blur(12px)',
            boxShadow: '0 8px 24px rgba(17, 26, 53, 0.12)',
            zIndex: 50,
          }}
        >
          <div className="text-[11px] font-bold mb-1" style={{ color: '#111A35' }}>
            {order.patient}
          </div>
          <div className="text-[10px] mb-2" style={{ color: '#7B8BA5' }}>
            {order.treatment}
          </div>
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full" style={{ background: statusColor.main }} />
            <span className="text-[9px] font-semibold" style={{ color: statusColor.main }}>
              {order.status === 'pending' ? 'Pendiente' :
               order.status === 'in_progress' ? 'En proceso' :
               order.status === 'ready' ? 'Listo' : 'Entregado'}
            </span>
          </div>
          <div className="text-[9px] mt-1" style={{ color: '#7B8BA5' }}>
            Responsable: {order.doctor || 'No asignado'}
          </div>
        </div>
      )}
    </div>
  );
}
