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
      start.setDate(start.getDate() - start.getDay());
      for (let i = 0; i < 7; i++) {
        const date = new Date(start);
        date.setDate(start.getDate() + i);
        dates.push(date);
      }
    } else if (timeScale === 'month') {
      start.setDate(start.getDate() - start.getDay());
      for (let i = 0; i < 28; i++) {
        const date = new Date(start);
        date.setDate(start.getDate() + i);
        dates.push(date);
      }
    } else {
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
          <h3 className="text-[15px] font-bold" style={{ color: '#10264A' }}>
            Órdenes
          </h3>
          
          {/* Time Scale Selector */}
          <div className="flex gap-1 p-1 rounded-full" style={{ background: 'rgba(241, 245, 249, 0.8)' }}>
            {(['week', 'month', 'year'] as TimeScale[]).map((scale) => (
              <button
                key={scale}
                onClick={() => setTimeScale(scale)}
                className="px-3 py-1 rounded-full text-[11px] font-semibold transition-all duration-200"
                style={{
                  background: timeScale === scale ? 'linear-gradient(135deg, #10264A 0%, #1A3A5C 100%)' : 'transparent',
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
          
          <div className="px-3 py-1.5 rounded-lg text-[12px] font-medium" style={{ background: 'rgba(241, 245, 249, 0.8)', color: '#10264A' }}>
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

          <button
            className="w-8 h-8 rounded-lg flex items-center justify-center transition-all duration-150 hover:bg-gray-100"
            aria-label="Buscar"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#7B8BA5" strokeWidth="2">
              <circle cx="11" cy="11" r="8" />
              <path d="M21 21l-4.35-4.35" />
            </svg>
          </button>

          <button
            className="w-8 h-8 rounded-lg flex items-center justify-center transition-all duration-150 hover:bg-gray-100"
            style={{ background: 'rgba(40, 120, 255, 0.1)' }}
            aria-label="Nueva orden"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#2878FF" strokeWidth="2">
              <path d="M12 5v14M5 12h14" />
            </svg>
          </button>
        </div>
      </div>

      {/* Timeline Visualization */}
      <div className="flex-1 px-5 py-6 overflow-x-auto flex flex-col">
        <div className="relative min-w-full flex-1 flex flex-col" style={{ minHeight: '280px' }}>
          {/* Date Labels Area (top) */}
          <div className="relative h-16 mb-2">
            {timelineDates.map((date, index) => {
              const dateOrders = getOrdersByDate(date);
              const hasOrders = dateOrders.length > 0;
              
              return hasOrders ? (
                <div 
                  key={index} 
                  className="absolute flex flex-col items-center"
                  style={{ 
                    left: `${(index / timelineDates.length) * 100}%`,
                    transform: 'translateX(-50%)',
                  }}
                >
                  <span className="text-[10px] font-medium" style={{ color: '#7B8BA5' }}>
                    {date.toLocaleDateString('es-ES', { weekday: 'short' })}
                  </span>
                  <span className="text-[12px] font-bold" style={{ color: '#10264A' }}>
                    {date.getDate()}
                  </span>
                </div>
              ) : null;
            })}
          </div>

          {/* Main Timeline Line (middle-upper area) */}
          <div 
            className="absolute left-0 right-0 h-[2px]"
            style={{ 
              top: '80px',
              background: 'linear-gradient(90deg, transparent 0%, #CBD5E1 10%, #CBD5E1 90%, transparent 100%)' 
            }}
          />

          {/* Timeline Nodes Container */}
          <div 
            className="relative flex items-start justify-between"
            style={{ 
              minWidth: timeScale === 'week' ? '100%' : '1200px',
              marginTop: '56px',
            }}
          >
            {timelineDates.map((date, index) => {
              const dateOrders = getOrdersByDate(date);
              const hasOrders = dateOrders.length > 0;
              const isToday = date.toDateString() === new Date().toDateString();

              return (
                <div key={index} className="relative flex flex-col items-center" style={{ flex: '1 1 0' }}>
                  {/* Order Nodes with Organic Branching (below the line) */}
                  {hasOrders && (
                    <div className="relative mb-3" style={{ width: '100%', minHeight: '160px' }}>
                      {/* SVG Branches */}
                      <svg 
                        className="absolute inset-0 pointer-events-none" 
                        style={{ width: '100%', height: '100%', overflow: 'visible' }}
                      >
                        {dateOrders.slice(0, 3).map((order, orderIndex) => {
                          // Deterministic branch geometry based on order index
                          const variants = [
                            { stemLength: 40, offsetX: 0, curveDepth: 20, nodeY: 60 },
                            { stemLength: 50, offsetX: -15, curveDepth: 30, nodeY: 80 },
                            { stemLength: 45, offsetX: 15, curveDepth: 25, nodeY: 70 },
                          ];
                          const variant = variants[orderIndex % variants.length];
                          
                          // Calculate branch path with smooth curves
                          const startX = 50; // Center of day column (percentage)
                          const startY = 0; // Top of branch area
                          const endX = startX + variant.offsetX;
                          const endY = variant.nodeY;
                          
                          // Create smooth cubic bezier curve
                          const control1X = startX;
                          const control1Y = startY + variant.stemLength * 0.5;
                          const control2X = endX;
                          const control2Y = endY - variant.curveDepth;
                          
                          return (
                            <path
                              key={order.id}
                              d={`M ${startX}% ${startY} C ${control1X}% ${control1Y}, ${control2X}% ${control2Y}, ${endX}% ${endY}`}
                              fill="none"
                              stroke="#CBD5E1"
                              strokeWidth="1.5"
                              strokeLinecap="round"
                              style={{ opacity: 0.6 }}
                            />
                          );
                        })}
                      </svg>
                      
                      {/* Order nodes positioned along branches */}
                      {dateOrders.slice(0, 3).map((order, orderIndex) => {
                        const variants = [
                          { offsetX: 0, nodeY: 60 },
                          { offsetX: -15, nodeY: 80 },
                          { offsetX: 15, nodeY: 70 },
                        ];
                        const variant = variants[orderIndex % variants.length];
                        
                        return (
                          <div
                            key={order.id}
                            className="absolute"
                            style={{
                              left: `calc(50% + ${variant.offsetX}px)`,
                              top: `${variant.nodeY}px`,
                              transform: 'translateX(-50%)',
                            }}
                          >
                            <TimelineOrderNode
                              order={order}
                              onClick={() => setSelectedOrder(order)}
                              delay={orderIndex * 50}
                            />
                          </div>
                        );
                      })}
                      
                      {/* Overflow indicator */}
                      {dateOrders.length > 3 && (
                        <div 
                          className="absolute bottom-0 left-1/2 -translate-x-1/2 text-[10px] font-semibold px-2 py-1 rounded-full cursor-pointer transition-all duration-150 hover:scale-105"
                          style={{ background: 'rgba(40, 120, 255, 0.1)', color: '#2878FF' }}
                        >
                          +{dateOrders.length - 3}
                        </div>
                      )}
                    </div>
                  )}

                  {/* Timeline Dot (on the line) */}
                  <div
                    className="relative z-10 rounded-full transition-all duration-200"
                    style={{
                      width: hasOrders ? '12px' : '8px',
                      height: hasOrders ? '12px' : '8px',
                      background: hasOrders ? '#2878FF' : '#CBD5E1',
                      boxShadow: hasOrders ? '0 0 0 4px rgba(40, 120, 255, 0.15)' : 'none',
                      border: isToday ? '2px solid #2878FF' : 'none',
                    }}
                  />

                  {/* Today Indicator */}
                  {isToday && (
                    <div className="mt-2 text-[9px] font-bold" style={{ color: '#2878FF' }}>
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
                      background: isCurrentWeek ? 'linear-gradient(135deg, #10264A 0%, #1A3A5C 100%)' : 'transparent',
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
      case 'pending': return { main: '#F59E0B', glow: 'rgba(245, 158, 11, 0.4)' };
      case 'in_progress': return { main: '#2878FF', glow: 'rgba(40, 120, 255, 0.4)' };
      case 'ready': return { main: '#10B981', glow: 'rgba(16, 185, 129, 0.4)' };
      case 'delivered': return { main: '#8B5CF6', glow: 'rgba(139, 92, 246, 0.4)' };
      default: return { main: '#CBD5E1', glow: 'rgba(203, 213, 225, 0.4)' };
    }
  };

  const getTreatmentIcon = (treatment: string) => {
    const treatmentLower = treatment.toLowerCase();
    if (treatmentLower.includes('alineador')) {
      return (
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke={getStatusColor(order.status).main} strokeWidth="2">
          <path d="M12 2L2 7l10 5 10-5-10-5z" />
          <path d="M2 17l10 5 10-5" />
          <path d="M2 12l10 5 10-5" />
        </svg>
      );
    } else if (treatmentLower.includes('retenedor')) {
      return (
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke={getStatusColor(order.status).main} strokeWidth="2">
          <circle cx="12" cy="12" r="10" />
          <circle cx="12" cy="12" r="6" />
        </svg>
      );
    } else if (treatmentLower.includes('modelo')) {
      return (
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke={getStatusColor(order.status).main} strokeWidth="2">
          <path d="M21 16V8a2 2 0 00-1-1.73l-7-4a2 2 0 00-2 0l-7 4A2 2 0 002 8v8a2 2 0 001 1.73l7 4a2 2 0 002 0l7-4A2 2 0 0021 16z" />
        </svg>
      );
    } else if (treatmentLower.includes('guía')) {
      return (
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke={getStatusColor(order.status).main} strokeWidth="2">
          <path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z" />
          <path d="M14 2v6h6" />
          <path d="M9 15l2 2 4-4" />
        </svg>
      );
    } else {
      return (
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke={getStatusColor(order.status).main} strokeWidth="2">
          <path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z" />
          <path d="M14 2v6h6" />
        </svg>
      );
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
      {/* Enhanced Glow Effect - Subtle ambient light */}
      <div
        className="absolute inset-0 rounded-full transition-all duration-300"
        style={{
          background: `radial-gradient(circle, ${statusColor.glow} 0%, transparent 60%)`,
          opacity: isHovered ? 0.8 : 0.4,
          transform: isHovered ? 'scale(1.8)' : 'scale(1.4)',
          filter: 'blur(6px)',
        }}
      />

      {/* Main Node */}
      <div
        className="relative w-12 h-12 rounded-full flex items-center justify-center transition-all duration-200"
        style={{
          background: 'white',
          boxShadow: isHovered 
            ? `0 6px 20px ${statusColor.glow}, 0 0 0 2px ${statusColor.main}40`
            : `0 3px 12px rgba(17, 26, 53, 0.08), 0 0 0 1px ${statusColor.main}20`,
          transform: isHovered ? 'scale(1.08)' : 'scale(1)',
        }}
      >
        {/* Status Indicator with Refined Glow */}
        <div
          className="absolute -top-1 -right-1 w-4 h-4 rounded-full transition-all duration-200"
          style={{
            background: statusColor.main,
            boxShadow: `0 0 0 2px white, 0 0 10px ${statusColor.glow}, 0 0 20px ${statusColor.glow}`,
            opacity: isHovered ? 1 : 0.85,
          }}
        />

        {/* Treatment Icon */}
        {getTreatmentIcon(order.treatment)}
      </div>

      {/* Hover Tooltip */}
      {isHovered && (
        <div
          className="absolute left-1/2 -translate-x-1/2 -top-24 w-52 p-3 rounded-xl animate-fadeIn"
          style={{
            background: 'rgba(255, 255, 255, 0.98)',
            backdropFilter: 'blur(12px)',
            boxShadow: '0 8px 24px rgba(17, 26, 53, 0.12)',
            zIndex: 50,
            border: '1px solid rgba(255, 255, 255, 0.8)',
          }}
        >
          <div className="text-[12px] font-bold mb-1" style={{ color: '#10264A' }}>
            {order.patient}
          </div>
          <div className="text-[10px] mb-2" style={{ color: '#7B8BA5' }}>
            {order.treatment}
          </div>
          <div className="flex items-center gap-2 mb-1">
            <div className="w-2 h-2 rounded-full" style={{ background: statusColor.main, boxShadow: `0 0 8px ${statusColor.glow}` }} />
            <span className="text-[10px] font-semibold" style={{ color: statusColor.main }}>
              {order.status === 'pending' ? 'Pendiente' :
               order.status === 'in_progress' ? 'En proceso' :
               order.status === 'ready' ? 'Listo' : 'Entregado'}
            </span>
          </div>
          <div className="text-[9px]" style={{ color: '#7B8BA5' }}>
            Responsable: {order.doctor || 'No asignado'}
          </div>
        </div>
      )}
    </div>
  );
}
