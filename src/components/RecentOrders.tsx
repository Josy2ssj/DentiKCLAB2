import { useState } from 'react';
import { useData, Order } from '../contexts/DataContext';
import { OrderCard } from './OrderCard';

export function RecentOrders() {
  const { orders } = useData();
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);

  // Get recent orders (last 5 by requested date)
  const recentOrders = [...orders]
    .sort((a, b) => new Date(b.requestedDate).getTime() - new Date(a.requestedDate).getTime())
    .slice(0, 5);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending': return { main: '#F59E0B', bg: 'rgba(245, 158, 11, 0.15)' };
      case 'in_progress': return { main: '#4A90E8', bg: 'rgba(74, 144, 232, 0.15)' };
      case 'ready': return { main: '#10B981', bg: 'rgba(16, 185, 129, 0.15)' };
      case 'delivered': return { main: '#5A9FD4', bg: 'rgba(90, 159, 212, 0.15)' };
      default: return { main: '#9ECCDC', bg: 'rgba(158, 204, 220, 0.15)' };
    }
  };

  const formatDate = (dateStr: string) => {
    if (!dateStr) return '';
    const date = new Date(dateStr);
    const today = new Date();
    const diffTime = Math.abs(today.getTime() - date.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    
    if (diffDays === 0) return 'Hoy';
    if (diffDays === 1) return 'Ayer';
    if (diffDays < 7) return `Hace ${diffDays} días`;
    return date.toLocaleDateString('es-ES', { day: 'numeric', month: 'short' });
  };

  return (
    <>
      <div className="h-full flex flex-col" style={{ 
        background: 'rgba(255, 255, 255, 0.94)',
        borderRadius: '24px',
        backdropFilter: 'blur(8px)',
        boxShadow: '0 8px 32px rgba(17, 26, 53, 0.06), inset 0 1px 0 rgba(255, 255, 255, 0.9)',
      }}>
        {/* Header */}
        <div className="px-5 py-4 border-b border-gray-100">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div
                className="w-7 h-7 rounded-full flex items-center justify-center"
                style={{ background: 'rgba(158, 203, 228, 0.3)' }}
              >
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#4A90E8" strokeWidth="2">
                  <path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z" />
                  <path d="M14 2v6h6" />
                  <path d="M16 13H8" />
                  <path d="M16 17H8" />
                  <path d="M10 9H8" />
                </svg>
              </div>
              <h3 className="text-[13px] font-bold" style={{ color: '#2D5F8D' }}>
                Órdenes recientes
              </h3>
            </div>
            <button
              className="text-[11px] font-semibold transition-all duration-150 hover:underline"
              style={{ color: '#4A90E8' }}
            >
              Ver todas &gt;
            </button>
          </div>
        </div>

        {/* Orders List */}
        <div className="flex-1 overflow-y-auto px-3 py-3">
          {recentOrders.map((order) => {
            const statusColor = getStatusColor(order.status);
            
            return (
              <button
                key={order.id}
                onClick={() => setSelectedOrder(order)}
                className="w-full flex items-center gap-3 p-3 rounded-xl transition-all duration-200 hover:bg-gray-50 text-left group"
              >
                {/* Avatar */}
                <div
                  className="w-10 h-10 rounded-xl flex items-center justify-center text-[11px] font-bold shrink-0"
                  style={{
                    background: statusColor.bg,
                    color: statusColor.main,
                  }}
                >
                  {order.patient.split(' ').map(n => n[0]).join('').slice(0, 2)}
                </div>

                {/* Info */}
                <div className="flex-1 min-w-0">
                  <div className="text-[12px] font-semibold truncate" style={{ color: '#2D5F8D' }}>
                    {order.patient}
                  </div>
                  <div className="text-[10px] truncate mt-0.5" style={{ color: '#6B8CA5' }}>
                    {order.treatment}
                  </div>
                  <div className="flex items-center gap-2 mt-1">
                    <span className="text-[9px] font-mono font-semibold" style={{ color: '#4A90E8' }}>
                      {order.id}
                    </span>
                    <span className="text-[9px]" style={{ color: '#6B8CA5' }}>
                      {formatDate(order.requestedDate)}
                    </span>
                  </div>
                </div>

                {/* Status + Chevron */}
                <div className="flex items-center gap-2 shrink-0">
                  <div
                    className="w-2 h-2 rounded-full"
                    style={{
                      background: statusColor.main,
                      boxShadow: `0 0 0 3px ${statusColor.bg}`,
                    }}
                  />
                  <svg
                    width="14"
                    height="14"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    className="opacity-0 group-hover:opacity-100 transition-opacity duration-200"
                    style={{ color: '#6B8CA5' }}
                  >
                    <path d="M9 18l6-6-6-6" />
                  </svg>
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Order Card Modal */}
      {selectedOrder && (
        <OrderCard
          order={selectedOrder}
          onClose={() => setSelectedOrder(null)}
        />
      )}
    </>
  );
}
