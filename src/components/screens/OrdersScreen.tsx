import { useState } from 'react';
import { useData, Order } from '../../contexts/DataContext';
import { Search, Plus, X, ChevronRight, Edit2, Trash2, ArrowLeft, MoreVertical, FileText, Calendar, User, Building2, Clock, AlertCircle } from 'lucide-react';

type FilterType = 'all' | 'pending' | 'in_progress' | 'ready' | 'delivered' | 'late';
type DetailTab = 'resumen' | 'archivos' | 'notas' | 'historial';

export function OrdersScreen() {
  const { orders, addOrder, updateOrder, deleteOrder } = useData();
  const [activeFilter, setActiveFilter] = useState<FilterType>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
  const [showNewOrderModal, setShowNewOrderModal] = useState(false);
  const [showDetailPanel, setShowDetailPanel] = useState(false);
  const [activeDetailTab, setActiveDetailTab] = useState<DetailTab>('resumen');

  // Check if order is late
  const isOrderLate = (order: Order) => {
    if (order.status === 'delivered' || order.status === 'ready') return false;
    const today = new Date();
    const deliveryDate = new Date(order.deliveryDate);
    return deliveryDate < today;
  };

  // Filter orders
  const filteredOrders = orders.filter(order => {
    let matchesFilter = false;
    
    if (activeFilter === 'all') {
      matchesFilter = true;
    } else if (activeFilter === 'late') {
      matchesFilter = isOrderLate(order);
    } else {
      matchesFilter = order.status === activeFilter;
    }

    const matchesSearch = searchQuery === '' || 
      order.patient.toLowerCase().includes(searchQuery.toLowerCase()) ||
      order.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      order.clinic.toLowerCase().includes(searchQuery.toLowerCase()) ||
      order.doctor.toLowerCase().includes(searchQuery.toLowerCase()) ||
      order.treatment.toLowerCase().includes(searchQuery.toLowerCase());
    
    return matchesFilter && matchesSearch;
  });

  const handleOrderClick = (order: Order) => {
    setSelectedOrder(order);
    setShowDetailPanel(true);
  };

  const handleNewOrder = (newOrder: Omit<Order, 'id'>) => {
    addOrder(newOrder);
    setShowNewOrderModal(false);
  };

  const handleUpdateOrder = (updates: Partial<Order>) => {
    if (selectedOrder) {
      updateOrder(selectedOrder.id, updates);
      setSelectedOrder({ ...selectedOrder, ...updates });
    }
  };

  const handleDeleteOrder = () => {
    if (selectedOrder) {
      deleteOrder(selectedOrder.id);
      setSelectedOrder(null);
      setShowDetailPanel(false);
    }
  };

  const getStatusColor = (status: string, isLate: boolean) => {
    if (isLate) return { bg: 'rgba(239, 68, 68, 0.1)', text: '#EF4444', dot: '#EF4444' };
    switch (status) {
      case 'pending': return { bg: 'rgba(245, 158, 11, 0.1)', text: '#F59E0B', dot: '#F59E0B' };
      case 'in_progress': return { bg: 'rgba(74, 144, 232, 0.1)', text: '#4A90E8', dot: '#4A90E8' };
      case 'ready': return { bg: 'rgba(16, 185, 129, 0.1)', text: '#10B981', dot: '#10B981' };
      case 'delivered': return { bg: 'rgba(90, 159, 212, 0.1)', text: '#5A9FD4', dot: '#5A9FD4' };
      default: return { bg: 'rgba(158, 204, 220, 0.1)', text: '#9ECCDC', dot: '#9ECCDC' };
    }
  };

  const getTreatmentIcon = (treatment: string) => {
    const treatmentLower = treatment.toLowerCase();
    if (treatmentLower.includes('alineador')) {
      return (
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#4A90E8" strokeWidth="2">
          <path d="M12 2L2 7l10 5 10-5-10-5z" />
          <path d="M2 17l10 5 10-5" />
          <path d="M2 12l10 5 10-5" />
        </svg>
      );
    } else if (treatmentLower.includes('retenedor')) {
      return (
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#8CC5F2" strokeWidth="2">
          <circle cx="12" cy="12" r="10" />
          <circle cx="12" cy="12" r="6" />
        </svg>
      );
    } else if (treatmentLower.includes('modelo')) {
      return (
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#10B981" strokeWidth="2">
          <path d="M21 16V8a2 2 0 00-1-1.73l-7-4a2 2 0 00-2 0l-7 4A2 2 0 002 8v8a2 2 0 001 1.73l7 4a2 2 0 002 0l7-4A2 2 0 0021 16z" />
        </svg>
      );
    } else if (treatmentLower.includes('guía')) {
      return (
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#8B5CF6" strokeWidth="2">
          <path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z" />
          <path d="M14 2v6h6" />
          <path d="M9 15l2 2 4-4" />
        </svg>
      );
    } else {
      return (
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#6B8CA5" strokeWidth="2">
          <path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z" />
          <path d="M14 2v6h6" />
        </svg>
      );
    }
  };

  return (
    <div className="h-full flex flex-col" style={{ padding: 'clamp(16px, 3vh, 32px)' }}>
      {/* Header */}
      <div className="shrink-0 mb-6">
        <h1 className="text-[32px] font-bold tracking-tight" style={{ color: '#081B40' }}>
          Órdenes
        </h1>
        <p className="text-[14px] mt-1" style={{ color: '#6B8CA5' }}>
          Gestiona las órdenes de trabajo del laboratorio.
        </p>
      </div>

      {/* Main Workspace */}
      <div className="flex-1 min-h-0 flex gap-6">
        {/* Left: Orders List */}
        <div className="flex-1 flex flex-col min-w-0 bg-white/90 backdrop-blur-sm rounded-2xl p-6 shadow-sm">
          {/* Filters */}
          <div className="flex items-center gap-2 mb-5 flex-wrap">
            <button 
              onClick={() => setActiveFilter('all')}
              className="px-4 py-2 rounded-full text-[13px] font-semibold transition-all"
              style={{
                background: activeFilter === 'all' ? 'linear-gradient(135deg, #4A90E8 0%, #3E83DE 100%)' : 'rgba(248, 250, 252, 0.9)',
                color: activeFilter === 'all' ? '#FFFFFF' : '#4A6B8A',
                boxShadow: activeFilter === 'all' ? '0 2px 8px rgba(74, 144, 232, 0.25)' : 'none',
              }}
            >
              Todas
            </button>
            <button 
              onClick={() => setActiveFilter('pending')}
              className="px-4 py-2 rounded-full text-[13px] font-semibold transition-all"
              style={{
                background: activeFilter === 'pending' ? 'linear-gradient(135deg, #4A90E8 0%, #3E83DE 100%)' : 'rgba(248, 250, 252, 0.9)',
                color: activeFilter === 'pending' ? '#FFFFFF' : '#4A6B8A',
                boxShadow: activeFilter === 'pending' ? '0 2px 8px rgba(74, 144, 232, 0.25)' : 'none',
              }}
            >
              Pendientes
            </button>
            <button 
              onClick={() => setActiveFilter('in_progress')}
              className="px-4 py-2 rounded-full text-[13px] font-semibold transition-all"
              style={{
                background: activeFilter === 'in_progress' ? 'linear-gradient(135deg, #4A90E8 0%, #3E83DE 100%)' : 'rgba(248, 250, 252, 0.9)',
                color: activeFilter === 'in_progress' ? '#FFFFFF' : '#4A6B8A',
                boxShadow: activeFilter === 'in_progress' ? '0 2px 8px rgba(74, 144, 232, 0.25)' : 'none',
              }}
            >
              En proceso
            </button>
            <button 
              onClick={() => setActiveFilter('delivered')}
              className="px-4 py-2 rounded-full text-[13px] font-semibold transition-all"
              style={{
                background: activeFilter === 'delivered' ? 'linear-gradient(135deg, #4A90E8 0%, #3E83DE 100%)' : 'rgba(248, 250, 252, 0.9)',
                color: activeFilter === 'delivered' ? '#FFFFFF' : '#4A6B8A',
                boxShadow: activeFilter === 'delivered' ? '0 2px 8px rgba(74, 144, 232, 0.25)' : 'none',
              }}
            >
              Entregadas
            </button>
            <button 
              onClick={() => setActiveFilter('late')}
              className="px-4 py-2 rounded-full text-[13px] font-semibold transition-all flex items-center gap-1.5"
              style={{
                background: activeFilter === 'late' ? 'linear-gradient(135deg, #EF4444 0%, #DC2626 100%)' : 'rgba(248, 250, 252, 0.9)',
                color: activeFilter === 'late' ? '#FFFFFF' : '#4A6B8A',
                boxShadow: activeFilter === 'late' ? '0 2px 8px rgba(239, 68, 68, 0.25)' : 'none',
              }}
            >
              <AlertCircle size={14} />
              Atrasadas
            </button>
          </div>

          {/* Search + New Order */}
          <div className="flex items-center gap-3 mb-5">
            <div className="flex-1 relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2" size={18} style={{ color: '#6B8CA5' }} />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Buscar órdenes..."
                className="w-full pl-11 pr-4 py-2.5 rounded-full text-[13px] transition-all"
                style={{
                  background: 'rgba(248, 250, 252, 0.9)',
                  border: '1px solid rgba(220, 236, 246, 0.6)',
                  color: '#081B40',
                }}
              />
            </div>
            <button 
              onClick={() => setShowNewOrderModal(true)}
              className="flex items-center gap-2 px-5 py-2.5 rounded-full text-[13px] font-semibold transition-all hover:shadow-lg"
              style={{
                background: 'linear-gradient(135deg, #4A90E8 0%, #3E83DE 100%)',
                color: '#FFFFFF',
                boxShadow: '0 2px 8px rgba(74, 144, 232, 0.3)',
              }}
            >
              <Plus size={16} />
              Nueva orden
            </button>
          </div>

          {/* Orders Table */}
          <div className="flex-1 overflow-y-auto">
            {filteredOrders.length === 0 ? (
              <div className="flex items-center justify-center h-32 text-[13px]" style={{ color: '#6B8CA5' }}>
                No se encontraron órdenes
              </div>
            ) : (
              <div className="space-y-1">
                {filteredOrders.map(order => {
                  const isLate = isOrderLate(order);
                  const statusColor = getStatusColor(order.status, isLate);
                  
                  return (
                    <div 
                      key={order.id} 
                      onClick={() => handleOrderClick(order)}
                      className="flex items-center gap-4 p-4 rounded-xl cursor-pointer transition-all group"
                      style={{
                        background: selectedOrder?.id === order.id ? 'rgba(74, 144, 232, 0.05)' : 'transparent',
                        border: selectedOrder?.id === order.id ? '2px solid rgba(74, 144, 232, 0.2)' : '2px solid transparent',
                      }}
                      onMouseEnter={(e) => {
                        if (selectedOrder?.id !== order.id) {
                          e.currentTarget.style.background = 'rgba(220, 236, 246, 0.3)';
                        }
                      }}
                      onMouseLeave={(e) => {
                        if (selectedOrder?.id !== order.id) {
                          e.currentTarget.style.background = 'transparent';
                        }
                      }}
                    >
                      {/* Avatar */}
                      <div 
                        className="w-10 h-10 rounded-full flex items-center justify-center text-[11px] font-bold shrink-0"
                        style={{
                          background: `${statusColor.bg}`,
                          color: statusColor.text,
                        }}
                      >
                        {order.patient.split(' ').map(n => n[0]).join('').slice(0, 2)}
                      </div>

                      {/* Order Info */}
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-1">
                          <span className="text-[11px] font-mono font-semibold" style={{ color: '#4A90E8' }}>
                            {order.id}
                          </span>
                          <div className="flex items-center gap-1">
                            {getTreatmentIcon(order.treatment)}
                            <span className="text-[12px] font-semibold truncate" style={{ color: '#081B40' }}>
                              {order.patient}
                            </span>
                          </div>
                        </div>
                        <div className="text-[11px] truncate" style={{ color: '#6B8CA5' }}>
                          {order.treatment} · {order.arch}
                        </div>
                      </div>

                      {/* Clinic/Doctor */}
                      <div className="w-32 hidden lg:block">
                        <div className="text-[11px] truncate" style={{ color: '#4A6B8A' }}>
                          {order.clinic}
                        </div>
                        <div className="text-[10px] truncate" style={{ color: '#6B8CA5' }}>
                          {order.doctor}
                        </div>
                      </div>

                      {/* Status */}
                      <div className="w-28">
                        <span 
                          className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-semibold"
                          style={{ 
                            background: statusColor.bg,
                            color: statusColor.text,
                          }}
                        >
                          <span className="w-1.5 h-1.5 rounded-full" style={{ background: statusColor.dot }} />
                          {isLate ? 'Atrasada' :
                           order.status === 'pending' ? 'Pendiente' :
                           order.status === 'in_progress' ? 'En proceso' :
                           order.status === 'ready' ? 'Listo' : 'Entregado'}
                        </span>
                      </div>

                      {/* Date */}
                      <div className="w-24 hidden md:block">
                        <div className="text-[11px]" style={{ color: '#6B8CA5' }}>
                          {new Date(order.deliveryDate).toLocaleDateString('es-ES', { day: '2-digit', month: 'short' })}
                        </div>
                      </div>

                      {/* Chevron */}
                      <ChevronRight 
                        size={16} 
                        className="opacity-0 group-hover:opacity-100 transition-opacity"
                        style={{ color: '#6B8CA5' }}
                      />
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        </div>

        {/* Right: Detail Panel */}
        {showDetailPanel && selectedOrder && (
          <div className="w-96 bg-white/90 backdrop-blur-sm rounded-2xl shadow-sm flex flex-col">
            {/* Panel Header */}
            <div className="flex items-center justify-between p-5 border-b border-slate-100">
              <button 
                onClick={() => setShowDetailPanel(false)}
                className="w-8 h-8 rounded-full flex items-center justify-center hover:bg-slate-100 transition-all"
              >
                <ArrowLeft size={16} style={{ color: '#4A6B8A' }} />
              </button>
              <div className="flex items-center gap-2">
                <button className="px-4 py-1.5 rounded-full text-[12px] font-semibold transition-all hover:shadow-md"
                  style={{
                    background: 'linear-gradient(135deg, #4A90E8 0%, #3E83DE 100%)',
                    color: '#FFFFFF',
                  }}
                >
                  Editar
                </button>
                <button className="w-8 h-8 rounded-full flex items-center justify-center hover:bg-slate-100 transition-all">
                  <MoreVertical size={16} style={{ color: '#4A6B8A' }} />
                </button>
              </div>
            </div>

            {/* Order Header */}
            <div className="p-5 border-b border-slate-100">
              <div className="text-[11px] font-mono font-semibold mb-1" style={{ color: '#4A90E8' }}>
                {selectedOrder.id}
              </div>
              <h2 className="text-[18px] font-bold mb-2" style={{ color: '#081B40' }}>
                {selectedOrder.patient}
              </h2>
              <div className="text-[12px] mb-3" style={{ color: '#6B8CA5' }}>
                {selectedOrder.treatment} · {selectedOrder.arch}
              </div>
              <span 
                className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-semibold"
                style={{ 
                  background: getStatusColor(selectedOrder.status, isOrderLate(selectedOrder)).bg,
                  color: getStatusColor(selectedOrder.status, isOrderLate(selectedOrder)).text,
                }}
              >
                <span className="w-1.5 h-1.5 rounded-full" style={{ background: getStatusColor(selectedOrder.status, isOrderLate(selectedOrder)).dot }} />
                {isOrderLate(selectedOrder) ? 'Atrasada' :
                 selectedOrder.status === 'pending' ? 'Pendiente' :
                 selectedOrder.status === 'in_progress' ? 'En proceso' :
                 selectedOrder.status === 'ready' ? 'Listo' : 'Entregado'}
              </span>
            </div>

            {/* Tabs */}
            <div className="flex gap-1 p-2 border-b border-slate-100">
              {(['resumen', 'archivos', 'notas', 'historial'] as DetailTab[]).map(tab => (
                <button
                  key={tab}
                  onClick={() => setActiveDetailTab(tab)}
                  className="flex-1 px-3 py-1.5 rounded-full text-[12px] font-semibold transition-all"
                  style={{
                    background: activeDetailTab === tab ? 'rgba(74, 144, 232, 0.1)' : 'transparent',
                    color: activeDetailTab === tab ? '#4A90E8' : '#6B8CA5',
                  }}
                >
                  {tab.charAt(0).toUpperCase() + tab.slice(1)}
                </button>
              ))}
            </div>

            {/* Tab Content */}
            <div className="flex-1 overflow-y-auto p-5">
              {activeDetailTab === 'resumen' && (
                <div className="space-y-4">
                  {/* Dental Visual Area */}
                  <div className="aspect-video bg-gradient-to-br from-blue-50 to-cyan-50 rounded-xl flex items-center justify-center mb-4">
                    <FileText size={48} style={{ color: '#4A90E8', opacity: 0.3 }} />
                  </div>

                  {/* Information */}
                  <div className="space-y-3">
                    <div className="flex items-start gap-3">
                      <User size={16} className="mt-0.5" style={{ color: '#6B8CA5' }} />
                      <div className="flex-1">
                        <div className="text-[11px]" style={{ color: '#6B8CA5' }}>Paciente</div>
                        <div className="text-[13px] font-semibold" style={{ color: '#081B40' }}>{selectedOrder.patient}</div>
                      </div>
                    </div>

                    <div className="flex items-start gap-3">
                      <Building2 size={16} className="mt-0.5" style={{ color: '#6B8CA5' }} />
                      <div className="flex-1">
                        <div className="text-[11px]" style={{ color: '#6B8CA5' }}>Clínica</div>
                        <div className="text-[13px] font-semibold" style={{ color: '#081B40' }}>{selectedOrder.clinic}</div>
                      </div>
                    </div>

                    <div className="flex items-start gap-3">
                      <User size={16} className="mt-0.5" style={{ color: '#6B8CA5' }} />
                      <div className="flex-1">
                        <div className="text-[11px]" style={{ color: '#6B8CA5' }}>Doctor</div>
                        <div className="text-[13px] font-semibold" style={{ color: '#081B40' }}>{selectedOrder.doctor}</div>
                      </div>
                    </div>

                    <div className="flex items-start gap-3">
                      <Calendar size={16} className="mt-0.5" style={{ color: '#6B8CA5' }} />
                      <div className="flex-1">
                        <div className="text-[11px]" style={{ color: '#6B8CA5' }}>Fecha solicitada</div>
                        <div className="text-[13px] font-semibold" style={{ color: '#081B40' }}>
                          {new Date(selectedOrder.requestedDate).toLocaleDateString('es-ES', { day: '2-digit', month: 'long', year: 'numeric' })}
                        </div>
                      </div>
                    </div>

                    <div className="flex items-start gap-3">
                      <Clock size={16} className="mt-0.5" style={{ color: '#6B8CA5' }} />
                      <div className="flex-1">
                        <div className="text-[11px]" style={{ color: '#6B8CA5' }}>Fecha de entrega</div>
                        <div className="text-[13px] font-semibold" style={{ color: '#081B40' }}>
                          {new Date(selectedOrder.deliveryDate).toLocaleDateString('es-ES', { day: '2-digit', month: 'long', year: 'numeric' })}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {activeDetailTab === 'archivos' && (
                <div className="text-center py-12">
                  <FileText size={48} className="mx-auto mb-3" style={{ color: '#9EC5E0' }} />
                  <p className="text-[13px]" style={{ color: '#6B8CA5' }}>No hay archivos adjuntos</p>
                </div>
              )}

              {activeDetailTab === 'notas' && (
                <div>
                  {selectedOrder.notes ? (
                    <p className="text-[13px] leading-relaxed" style={{ color: '#081B40' }}>
                      {selectedOrder.notes}
                    </p>
                  ) : (
                    <div className="text-center py-12">
                      <FileText size={48} className="mx-auto mb-3" style={{ color: '#9EC5E0' }} />
                      <p className="text-[13px]" style={{ color: '#6B8CA5' }}>No hay notas</p>
                    </div>
                  )}
                </div>
              )}

              {activeDetailTab === 'historial' && (
                <div className="space-y-3">
                  <div className="flex items-start gap-3">
                    <div className="w-2 h-2 rounded-full mt-1.5" style={{ background: '#4A90E8' }} />
                    <div className="flex-1">
                      <div className="text-[12px] font-semibold" style={{ color: '#081B40' }}>Orden creada</div>
                      <div className="text-[11px]" style={{ color: '#6B8CA5' }}>
                        {new Date(selectedOrder.requestedDate).toLocaleDateString('es-ES')}
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Panel Footer */}
            <div className="flex gap-2 p-5 border-t border-slate-100">
              <button 
                onClick={handleDeleteOrder}
                className="flex items-center justify-center gap-2 px-4 py-2 rounded-full text-[12px] font-semibold transition-all hover:shadow-md"
                style={{
                  background: 'rgba(239, 68, 68, 0.1)',
                  color: '#EF4444',
                }}
              >
                <Trash2 size={14} />
                Eliminar
              </button>
            </div>
          </div>
        )}
      </div>

      {/* New Order Modal */}
      {showNewOrderModal && (
        <NewOrderModal 
          onClose={() => setShowNewOrderModal(false)}
          onSave={handleNewOrder}
        />
      )}
    </div>
  );
}

// New Order Modal Component
function NewOrderModal({ onClose, onSave }: { onClose: () => void; onSave: (order: Omit<Order, 'id'>) => void }) {
  const [formData, setFormData] = useState({
    patient: '',
    clinic: '',
    doctor: '',
    treatment: '',
    arch: 'Superior',
    status: 'pending' as Order['status'],
    requestedDate: new Date().toISOString().split('T')[0],
    deliveryDate: '',
    notes: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(formData);
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 animate-fadeIn">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-hidden flex flex-col">
        {/* Modal Header */}
        <div className="flex items-center justify-between p-6 border-b border-slate-100">
          <h2 className="text-[18px] font-bold" style={{ color: '#081B40' }}>Nueva Orden</h2>
          <button 
            onClick={onClose}
            className="w-8 h-8 rounded-full flex items-center justify-center hover:bg-slate-100 transition-all"
          >
            <X size={18} style={{ color: '#6B8CA5' }} />
          </button>
        </div>

        {/* Modal Content */}
        <form onSubmit={handleSubmit} className="flex-1 overflow-y-auto p-6 space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="text-[12px] font-semibold mb-2 block" style={{ color: '#4A6B8A' }}>Paciente *</label>
              <input
                type="text"
                required
                value={formData.patient}
                onChange={(e) => setFormData({ ...formData, patient: e.target.value })}
                className="w-full px-4 py-2.5 rounded-xl text-[13px] transition-all"
                style={{
                  background: 'rgba(248, 250, 252, 0.9)',
                  border: '1px solid rgba(220, 236, 246, 0.6)',
                  color: '#081B40',
                }}
                placeholder="Nombre del paciente"
              />
            </div>
            <div>
              <label className="text-[12px] font-semibold mb-2 block" style={{ color: '#4A6B8A' }}>Clínica *</label>
              <input
                type="text"
                required
                value={formData.clinic}
                onChange={(e) => setFormData({ ...formData, clinic: e.target.value })}
                className="w-full px-4 py-2.5 rounded-xl text-[13px] transition-all"
                style={{
                  background: 'rgba(248, 250, 252, 0.9)',
                  border: '1px solid rgba(220, 236, 246, 0.6)',
                  color: '#081B40',
                }}
                placeholder="Nombre de la clínica"
              />
            </div>
          </div>

          <div>
            <label className="text-[12px] font-semibold mb-2 block" style={{ color: '#4A6B8A' }}>Doctor *</label>
            <input
              type="text"
              required
              value={formData.doctor}
              onChange={(e) => setFormData({ ...formData, doctor: e.target.value })}
              className="w-full px-4 py-2.5 rounded-xl text-[13px] transition-all"
              style={{
                background: 'rgba(248, 250, 252, 0.9)',
                border: '1px solid rgba(220, 236, 246, 0.6)',
                color: '#081B40',
              }}
              placeholder="Nombre del doctor"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="text-[12px] font-semibold mb-2 block" style={{ color: '#4A6B8A' }}>Tratamiento *</label>
              <input
                type="text"
                required
                value={formData.treatment}
                onChange={(e) => setFormData({ ...formData, treatment: e.target.value })}
                className="w-full px-4 py-2.5 rounded-xl text-[13px] transition-all"
                style={{
                  background: 'rgba(248, 250, 252, 0.9)',
                  border: '1px solid rgba(220, 236, 246, 0.6)',
                  color: '#081B40',
                }}
                placeholder="Tipo de tratamiento"
              />
            </div>
            <div>
              <label className="text-[12px] font-semibold mb-2 block" style={{ color: '#4A6B8A' }}>Arcada</label>
              <select
                value={formData.arch}
                onChange={(e) => setFormData({ ...formData, arch: e.target.value })}
                className="w-full px-4 py-2.5 rounded-xl text-[13px] transition-all"
                style={{
                  background: 'rgba(248, 250, 252, 0.9)',
                  border: '1px solid rgba(220, 236, 246, 0.6)',
                  color: '#081B40',
                }}
              >
                <option value="Superior">Superior</option>
                <option value="Inferior">Inferior</option>
                <option value="Ambos">Ambos</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="text-[12px] font-semibold mb-2 block" style={{ color: '#4A6B8A' }}>Fecha Solicitada *</label>
              <input
                type="date"
                required
                value={formData.requestedDate}
                onChange={(e) => setFormData({ ...formData, requestedDate: e.target.value })}
                className="w-full px-4 py-2.5 rounded-xl text-[13px] transition-all"
                style={{
                  background: 'rgba(248, 250, 252, 0.9)',
                  border: '1px solid rgba(220, 236, 246, 0.6)',
                  color: '#081B40',
                }}
              />
            </div>
            <div>
              <label className="text-[12px] font-semibold mb-2 block" style={{ color: '#4A6B8A' }}>Fecha de Entrega *</label>
              <input
                type="date"
                required
                value={formData.deliveryDate}
                onChange={(e) => setFormData({ ...formData, deliveryDate: e.target.value })}
                className="w-full px-4 py-2.5 rounded-xl text-[13px] transition-all"
                style={{
                  background: 'rgba(248, 250, 252, 0.9)',
                  border: '1px solid rgba(220, 236, 246, 0.6)',
                  color: '#081B40',
                }}
              />
            </div>
          </div>

          <div>
            <label className="text-[12px] font-semibold mb-2 block" style={{ color: '#4A6B8A' }}>Notas</label>
            <textarea
              value={formData.notes}
              onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
              className="w-full px-4 py-2.5 rounded-xl text-[13px] transition-all resize-none"
              style={{
                background: 'rgba(248, 250, 252, 0.9)',
                border: '1px solid rgba(220, 236, 246, 0.6)',
                color: '#081B40',
              }}
              rows={3}
              placeholder="Notas adicionales..."
            />
          </div>
        </form>

        {/* Modal Footer */}
        <div className="flex gap-3 p-6 border-t border-slate-100">
          <button 
            type="button"
            onClick={onClose}
            className="flex-1 px-4 py-2.5 rounded-full text-[13px] font-semibold transition-all hover:shadow-md"
            style={{
              background: 'rgba(248, 250, 252, 0.9)',
              color: '#4A6B8A',
            }}
          >
            Cancelar
          </button>
          <button 
            type="submit"
            onClick={handleSubmit}
            className="flex-1 px-4 py-2.5 rounded-full text-[13px] font-semibold transition-all hover:shadow-lg"
            style={{
              background: 'linear-gradient(135deg, #4A90E8 0%, #3E83DE 100%)',
              color: '#FFFFFF',
              boxShadow: '0 2px 8px rgba(74, 144, 232, 0.3)',
            }}
          >
            Crear Orden
          </button>
        </div>
      </div>
    </div>
  );
}
