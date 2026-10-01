import { Order } from '../contexts/DataContext';

interface OrderCardProps {
  order: Order;
  onClose: () => void;
}

export function OrderCard({ order, onClose }: OrderCardProps) {
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending': return { main: '#F59E0B', bg: 'rgba(245, 158, 11, 0.1)', text: '#92400E' };
      case 'in_progress': return { main: '#2878FF', bg: 'rgba(40, 120, 255, 0.1)', text: '#1E40AF' };
      case 'ready': return { main: '#10B981', bg: 'rgba(16, 185, 129, 0.1)', text: '#065F46' };
      case 'delivered': return { main: '#8B5CF6', bg: 'rgba(139, 92, 246, 0.1)', text: '#6D28D9' };
      default: return { main: '#CBD5E1', bg: 'rgba(203, 213, 225, 0.1)', text: '#475569' };
    }
  };

  const statusColor = getStatusColor(order.status);

  const formatDate = (dateStr: string) => {
    if (!dateStr) return 'No definida';
    const date = new Date(dateStr);
    return date.toLocaleDateString('es-ES', { day: 'numeric', month: 'short', year: 'numeric' });
  };

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center p-4 animate-fadeIn"
      style={{ background: 'rgba(17, 26, 53, 0.2)', backdropFilter: 'blur(4px)' }}
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-2xl rounded-3xl overflow-hidden animate-fadeIn"
        style={{
          background: 'rgba(255, 255, 255, 0.98)',
          backdropFilter: 'blur(12px)',
          boxShadow: '0 24px 64px rgba(17, 26, 53, 0.15)',
          maxHeight: '90vh',
          overflow: 'auto',
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="sticky top-0 px-6 py-4 border-b border-gray-100" style={{ background: 'rgba(255, 255, 255, 0.95)', backdropFilter: 'blur(8px)' }}>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ background: statusColor.bg }}>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke={statusColor.main} strokeWidth="2">
                  <path d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
              </div>
              <div>
                <div className="text-[11px] font-mono font-semibold" style={{ color: '#2878FF' }}>
                  {order.id}
                </div>
                <div className="text-[14px] font-bold" style={{ color: '#111A35' }}>
                  {order.patient}
                </div>
              </div>
            </div>

            <button
              onClick={onClose}
              className="w-8 h-8 rounded-full flex items-center justify-center transition-all duration-150 hover:bg-gray-100"
              aria-label="Cerrar"
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M18 6L6 18M6 6l12 12" />
              </svg>
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="px-6 py-5">
          {/* Status Badge */}
          <div className="mb-5">
            <div
              className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full"
              style={{ background: statusColor.bg }}
            >
              <div className="w-2 h-2 rounded-full" style={{ background: statusColor.main }} />
              <span className="text-[11px] font-semibold" style={{ color: statusColor.text }}>
                {order.status === 'pending' ? 'Pendiente' :
                 order.status === 'in_progress' ? 'En proceso' :
                 order.status === 'ready' ? 'Listo' : 'Entregado'}
              </span>
            </div>
          </div>

          {/* Info Grid */}
          <div className="grid grid-cols-2 gap-4 mb-5">
            {/* Clínica */}
            <div>
              <div className="text-[10px] font-medium mb-1" style={{ color: '#7B8BA5' }}>
                CLÍNICA
              </div>
              <div className="text-[13px] font-semibold" style={{ color: '#111A35' }}>
                {order.clinic || 'No especificada'}
              </div>
            </div>

            {/* Doctor */}
            <div>
              <div className="text-[10px] font-medium mb-1" style={{ color: '#7B8BA5' }}>
                DOCTOR
              </div>
              <div className="text-[13px] font-semibold" style={{ color: '#111A35' }}>
                {order.doctor || 'No asignado'}
              </div>
            </div>

            {/* Tratamiento */}
            <div>
              <div className="text-[10px] font-medium mb-1" style={{ color: '#7B8BA5' }}>
                TRATAMIENTO
              </div>
              <div className="text-[13px] font-semibold" style={{ color: '#111A35' }}>
                {order.treatment}
              </div>
            </div>

            {/* Arcada */}
            <div>
              <div className="text-[10px] font-medium mb-1" style={{ color: '#7B8BA5' }}>
                ARCADA
              </div>
              <div className="text-[13px] font-semibold" style={{ color: '#111A35' }}>
                {order.arch}
              </div>
            </div>
          </div>

          {/* Dates */}
          <div className="mb-5 p-4 rounded-2xl" style={{ background: 'rgba(248, 250, 252, 0.8)' }}>
            <div className="text-[10px] font-semibold mb-3" style={{ color: '#7B8BA5' }}>
              FECHAS
            </div>
            <div className="grid grid-cols-3 gap-4">
              <div>
                <div className="text-[9px] font-medium mb-1" style={{ color: '#7B8BA5' }}>
                  INGRESO
                </div>
                <div className="text-[12px] font-semibold" style={{ color: '#111A35' }}>
                  {formatDate(order.requestedDate)}
                </div>
              </div>
              <div>
                <div className="text-[9px] font-medium mb-1" style={{ color: '#7B8BA5' }}>
                  SOLICITADA
                </div>
                <div className="text-[12px] font-semibold" style={{ color: '#111A35' }}>
                  {formatDate(order.requestedDate)}
                </div>
              </div>
              <div>
                <div className="text-[9px] font-medium mb-1" style={{ color: '#7B8BA5' }}>
                  ENTREGA
                </div>
                <div className="text-[12px] font-semibold" style={{ color: '#111A35' }}>
                  {formatDate(order.deliveryDate)}
                </div>
              </div>
            </div>
          </div>

          {/* Notes */}
          {order.notes && (
            <div className="mb-5">
              <div className="text-[10px] font-semibold mb-2" style={{ color: '#7B8BA5' }}>
                NOTAS
              </div>
              <div className="p-3 rounded-xl text-[12px]" style={{ background: 'rgba(248, 250, 252, 0.8)', color: '#3D4F6F' }}>
                {order.notes}
              </div>
            </div>
          )}

          {/* Files */}
          <div>
            <div className="text-[10px] font-semibold mb-2" style={{ color: '#7B8BA5' }}>
              ARCHIVOS
            </div>
            <div className="flex items-center gap-2 p-3 rounded-xl" style={{ background: 'rgba(248, 250, 252, 0.8)' }}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#7B8BA5" strokeWidth="2">
                <path d="M13 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V9z" />
                <path d="M13 2v7h7" />
              </svg>
              <span className="text-[11px]" style={{ color: '#7B8BA5' }}>
                Sin archivos adjuntos
              </span>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="sticky bottom-0 px-6 py-4 border-t border-gray-100 flex items-center justify-end gap-2" style={{ background: 'rgba(255, 255, 255, 0.95)', backdropFilter: 'blur(8px)' }}>
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-xl text-[12px] font-semibold transition-all duration-150 hover:bg-gray-100"
            style={{ color: '#3D4F6F' }}
          >
            Cerrar
          </button>
          <button
            className="px-4 py-2 rounded-xl text-[12px] font-semibold transition-all duration-150 hover:scale-[1.02] active:scale-[0.98]"
            style={{
              background: 'linear-gradient(135deg, #2878FF 0%, #1D65E0 100%)',
              color: '#FFFFFF',
              boxShadow: '0 2px 8px rgba(40, 120, 255, 0.25)',
            }}
          >
            Editar Orden
          </button>
        </div>
      </div>
    </div>
  );
}
