import { useState } from 'react';
import { useData, Order } from '../../contexts/DataContext';
import { Search, Plus, X, ChevronRight, Edit2, Trash2 } from 'lucide-react';
import OrderStatusNotch from '../OrderStatusNotch';

type FilterType = 'all' | 'pending' | 'in_progress' | 'ready' | 'delivered';

export function OrdersScreen() {
  const { orders, addOrder, updateOrder, deleteOrder } = useData();
  const [activeFilter, setActiveFilter] = useState<FilterType>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
  const [showNewOrderModal, setShowNewOrderModal] = useState(false);
  const [showDetailPanel, setShowDetailPanel] = useState(false);

  // Filter orders
  const filteredOrders = orders.filter(order => {
    const matchesFilter = activeFilter === 'all' || order.status === activeFilter;
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

  return (
    <div className="max-w-[1600px] mx-auto h-full flex flex-col">
      {/* Context Area: Header + Notches */}
      <div className="grid gap-3 sm:gap-4 grid-cols-1 lg:grid-cols-12 shrink-0 relative mb-4 lg:mb-5" style={{ isolation: 'isolate' }}>
        {/* LEFT: Header */}
        <div className="lg:col-span-4 min-w-0">
          <div className="shrink-0">
            <h1 className="text-[26px] sm:text-[28px] lg:text-[32px] font-bold tracking-tight" style={{ color: '#10264A' }}>
              Órdenes
            </h1>
            <p className="text-[13px] mt-0.5" style={{ color: '#7B8BA5' }}>
              Gestiona las órdenes de trabajo del laboratorio.
            </p>
          </div>
        </div>

        {/* CENTER: Pending Orders Notch */}
        <div className="lg:col-span-4 min-w-0 min-h-0 relative" style={{ zIndex: 0 }}>
          <OrderStatusNotch type="pending" compact />
        </div>

        {/* RIGHT: Weekly Delivered Notch */}
        <div className="lg:col-span-4 min-w-0 min-h-0 relative" style={{ zIndex: 0 }}>
          <OrderStatusNotch type="weekly-delivered" compact />
        </div>
      </div>

      {/* Workspace Frame: Orders Panel */}
      <div className="bg-white/90 backdrop-blur-sm rounded-2xl p-6 shadow-sm flex-1 min-h-0 relative flex" style={{ zIndex: 1 }} data-workspace="orders-panel">
        {/* Main Content */}
        <div className={`flex-1 flex flex-col ${showDetailPanel ? 'mr-6' : ''}`}>
          {/* Toolbar */}
          <div className="flex items-center gap-4 mb-6">
            <div className="flex gap-2">
              <button 
                onClick={() => setActiveFilter('all')}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                  activeFilter === 'all' 
                    ? 'bg-gradient-to-r from-blue-500 to-blue-600 text-white shadow-md' 
                    : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                }`}
              >
                Todas
              </button>
              <button 
                onClick={() => setActiveFilter('pending')}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                  activeFilter === 'pending' 
                    ? 'bg-gradient-to-r from-blue-500 to-blue-600 text-white shadow-md' 
                    : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                }`}
              >
                Pendientes
              </button>
              <button 
                onClick={() => setActiveFilter('in_progress')}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                  activeFilter === 'in_progress' 
                    ? 'bg-gradient-to-r from-blue-500 to-blue-600 text-white shadow-md' 
                    : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                }`}
              >
                En proceso
              </button>
              <button 
                onClick={() => setActiveFilter('delivered')}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                  activeFilter === 'delivered' 
                    ? 'bg-gradient-to-r from-blue-500 to-blue-600 text-white shadow-md' 
                    : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                }`}
              >
                Entregadas
              </button>
            </div>
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Buscar órdenes..."
                className="w-full pl-10 pr-4 py-2 bg-slate-100 rounded-full border-0 focus:ring-2 focus:ring-blue-500 transition-all"
              />
            </div>
            <button 
              onClick={() => setShowNewOrderModal(true)}
              className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-full text-sm font-medium hover:shadow-lg transition-all"
            >
              <Plus size={16} />
              Nueva orden
            </button>
          </div>

          {/* Orders List */}
          <div className="flex-1 overflow-y-auto space-y-2">
            {filteredOrders.length === 0 ? (
              <div className="flex items-center justify-center h-32 text-slate-400">
                No se encontraron órdenes
              </div>
            ) : (
              filteredOrders.map(order => (
                <div 
                  key={order.id} 
                  onClick={() => handleOrderClick(order)}
                  className={`flex items-center gap-4 p-4 rounded-xl cursor-pointer transition-all ${
                    selectedOrder?.id === order.id 
                      ? 'bg-blue-50 border-2 border-blue-200' 
                      : 'hover:bg-slate-50 border-2 border-transparent'
                  }`}
                >
                  <div className="w-16">
                    <span className="text-xs font-mono font-semibold text-blue-600">{order.id}</span>
                  </div>
                  <div className="flex-1">
                    <p className="font-semibold text-sm">{order.patient}</p>
                    <p className="text-xs text-slate-500">{order.treatment} · {order.arch}</p>
                  </div>
                  <div className="w-32">
                    <p className="text-xs text-slate-600">{order.clinic}</p>
                    <p className="text-xs text-slate-500">{order.doctor}</p>
                  </div>
                  <div className="w-24">
                    <span className={`text-xs font-semibold px-2 py-1 rounded-full ${
                      order.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                      order.status === 'in_progress' ? 'bg-blue-100 text-blue-800' :
                      order.status === 'ready' ? 'bg-green-100 text-green-800' :
                      'bg-purple-100 text-purple-800'
                    }`}>
                      {order.status === 'pending' ? 'Pendiente' :
                       order.status === 'in_progress' ? 'En proceso' :
                       order.status === 'ready' ? 'Listo' : 'Entregado'}
                    </span>
                  </div>
                  <ChevronRight size={16} className="text-slate-400" />
                </div>
              ))
            )}
          </div>
        </div>

        {/* Detail Panel */}
        {showDetailPanel && selectedOrder && (
          <div className="w-96 bg-white rounded-2xl shadow-lg border border-slate-200 flex flex-col">
            {/* Panel Header */}
            <div className="flex items-center justify-between p-4 border-b border-slate-100">
              <div>
                <p className="text-xs font-mono text-blue-600">{selectedOrder.id}</p>
                <h3 className="text-lg font-bold text-slate-900">{selectedOrder.patient}</h3>
              </div>
              <button 
                onClick={() => setShowDetailPanel(false)}
                className="w-8 h-8 rounded-full flex items-center justify-center hover:bg-slate-100 transition-all"
              >
                <X size={18} className="text-slate-500" />
              </button>
            </div>

            {/* Panel Content */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4">
              {/* Status */}
              <div>
                <label className="text-xs font-medium text-slate-500 mb-1 block">Estado</label>
                <select 
                  value={selectedOrder.status}
                  onChange={(e) => handleUpdateOrder({ status: e.target.value as Order['status'] })}
                  className="w-full px-3 py-2 bg-slate-100 rounded-lg border-0 focus:ring-2 focus:ring-blue-500"
                >
                  <option value="pending">Pendiente</option>
                  <option value="in_progress">En proceso</option>
                  <option value="ready">Listo</option>
                  <option value="delivered">Entregado</option>
                </select>
              </div>

              {/* Treatment */}
              <div>
                <label className="text-xs font-medium text-slate-500 mb-1 block">Tratamiento</label>
                <p className="text-sm font-medium text-slate-900">{selectedOrder.treatment}</p>
                <p className="text-xs text-slate-500">{selectedOrder.arch}</p>
              </div>

              {/* Clinic & Doctor */}
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-xs font-medium text-slate-500 mb-1 block">Clínica</label>
                  <p className="text-sm text-slate-900">{selectedOrder.clinic}</p>
                </div>
                <div>
                  <label className="text-xs font-medium text-slate-500 mb-1 block">Doctor</label>
                  <p className="text-sm text-slate-900">{selectedOrder.doctor}</p>
                </div>
              </div>

              {/* Dates */}
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-xs font-medium text-slate-500 mb-1 block">Solicitada</label>
                  <p className="text-sm text-slate-900">{new Date(selectedOrder.requestedDate).toLocaleDateString('es-ES')}</p>
                </div>
                <div>
                  <label className="text-xs font-medium text-slate-500 mb-1 block">Entrega</label>
                  <p className="text-sm text-slate-900">{new Date(selectedOrder.deliveryDate).toLocaleDateString('es-ES')}</p>
                </div>
              </div>

              {/* Notes */}
              {selectedOrder.notes && (
                <div>
                  <label className="text-xs font-medium text-slate-500 mb-1 block">Notas</label>
                  <p className="text-sm text-slate-700 bg-slate-50 p-3 rounded-lg">{selectedOrder.notes}</p>
                </div>
              )}
            </div>

            {/* Panel Footer */}
            <div className="flex gap-2 p-4 border-t border-slate-100">
              <button className="flex-1 flex items-center justify-center gap-2 px-4 py-2 bg-slate-100 text-slate-700 rounded-full text-sm font-medium hover:bg-slate-200 transition-all">
                <Edit2 size={16} />
                Editar
              </button>
              <button 
                onClick={handleDeleteOrder}
                className="flex items-center justify-center gap-2 px-4 py-2 bg-red-50 text-red-600 rounded-full text-sm font-medium hover:bg-red-100 transition-all"
              >
                <Trash2 size={16} />
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
          <h2 className="text-xl font-bold text-slate-900">Nueva Orden</h2>
          <button 
            onClick={onClose}
            className="w-8 h-8 rounded-full flex items-center justify-center hover:bg-slate-100 transition-all"
          >
            <X size={18} className="text-slate-500" />
          </button>
        </div>

        {/* Modal Content */}
        <form onSubmit={handleSubmit} className="flex-1 overflow-y-auto p-6 space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="text-sm font-medium text-slate-700 mb-2 block">Paciente *</label>
              <input
                type="text"
                required
                value={formData.patient}
                onChange={(e) => setFormData({ ...formData, patient: e.target.value })}
                className="w-full px-3 py-2 bg-slate-100 rounded-lg border-0 focus:ring-2 focus:ring-blue-500"
                placeholder="Nombre del paciente"
              />
            </div>
            <div>
              <label className="text-sm font-medium text-slate-700 mb-2 block">Clínica *</label>
              <input
                type="text"
                required
                value={formData.clinic}
                onChange={(e) => setFormData({ ...formData, clinic: e.target.value })}
                className="w-full px-3 py-2 bg-slate-100 rounded-lg border-0 focus:ring-2 focus:ring-blue-500"
                placeholder="Nombre de la clínica"
              />
            </div>
          </div>

          <div>
            <label className="text-sm font-medium text-slate-700 mb-2 block">Doctor *</label>
            <input
              type="text"
              required
              value={formData.doctor}
              onChange={(e) => setFormData({ ...formData, doctor: e.target.value })}
              className="w-full px-3 py-2 bg-slate-100 rounded-lg border-0 focus:ring-2 focus:ring-blue-500"
              placeholder="Nombre del doctor"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="text-sm font-medium text-slate-700 mb-2 block">Tratamiento *</label>
              <input
                type="text"
                required
                value={formData.treatment}
                onChange={(e) => setFormData({ ...formData, treatment: e.target.value })}
                className="w-full px-3 py-2 bg-slate-100 rounded-lg border-0 focus:ring-2 focus:ring-blue-500"
                placeholder="Tipo de tratamiento"
              />
            </div>
            <div>
              <label className="text-sm font-medium text-slate-700 mb-2 block">Arcada</label>
              <select
                value={formData.arch}
                onChange={(e) => setFormData({ ...formData, arch: e.target.value })}
                className="w-full px-3 py-2 bg-slate-100 rounded-lg border-0 focus:ring-2 focus:ring-blue-500"
              >
                <option value="Superior">Superior</option>
                <option value="Inferior">Inferior</option>
                <option value="Ambos">Ambos</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="text-sm font-medium text-slate-700 mb-2 block">Fecha Solicitada *</label>
              <input
                type="date"
                required
                value={formData.requestedDate}
                onChange={(e) => setFormData({ ...formData, requestedDate: e.target.value })}
                className="w-full px-3 py-2 bg-slate-100 rounded-lg border-0 focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="text-sm font-medium text-slate-700 mb-2 block">Fecha de Entrega *</label>
              <input
                type="date"
                required
                value={formData.deliveryDate}
                onChange={(e) => setFormData({ ...formData, deliveryDate: e.target.value })}
                className="w-full px-3 py-2 bg-slate-100 rounded-lg border-0 focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>

          <div>
            <label className="text-sm font-medium text-slate-700 mb-2 block">Notas</label>
            <textarea
              value={formData.notes}
              onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
              className="w-full px-3 py-2 bg-slate-100 rounded-lg border-0 focus:ring-2 focus:ring-blue-500 resize-none"
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
            className="flex-1 px-4 py-2 bg-slate-100 text-slate-700 rounded-full text-sm font-medium hover:bg-slate-200 transition-all"
          >
            Cancelar
          </button>
          <button 
            type="submit"
            onClick={handleSubmit}
            className="flex-1 px-4 py-2 bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-full text-sm font-medium hover:shadow-lg transition-all"
          >
            Crear Orden
          </button>
        </div>
      </div>
    </div>
  );
}
