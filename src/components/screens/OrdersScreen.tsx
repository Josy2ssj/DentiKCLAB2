import { useData } from '../../contexts/DataContext';
import { Search, Plus } from 'lucide-react';
import OrderStatusNotch from '../OrderStatusNotch';

export function OrdersScreen() {
  const { orders } = useData();

  return (
    <div className="max-w-[1600px] mx-auto h-full flex flex-col">
      {/* Context Area: Header + Notches */}
      <div className="grid gap-3 sm:gap-4 grid-cols-1 lg:grid-cols-12 shrink-0 relative mb-4 lg:mb-5">
        {/* LEFT: Header */}
        <div className="lg:col-span-4 min-w-0">
          <div className="shrink-0">
            <h1 className="text-[26px] sm:text-[28px] lg:text-[32px] font-bold tracking-tight" style={{ color: '#111A35' }}>
              Órdenes
            </h1>
            <p className="text-[13px] mt-0.5" style={{ color: '#3D4F6F' }}>
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
      <div className="bg-white/90 backdrop-blur-sm rounded-2xl p-6 shadow-sm flex-1 min-h-0" data-workspace="orders-panel">
        <div className="flex items-center gap-4 mb-6">
          <div className="flex gap-2">
            <button className="px-4 py-2 bg-slate-900 text-white rounded-lg text-sm font-medium">Todas</button>
            <button className="px-4 py-2 bg-slate-100 text-slate-700 rounded-lg text-sm font-medium hover:bg-slate-200">Pendientes</button>
            <button className="px-4 py-2 bg-slate-100 text-slate-700 rounded-lg text-sm font-medium hover:bg-slate-200">En proceso</button>
          </div>
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
            <input
              type="text"
              placeholder="Buscar órdenes..."
              className="w-full pl-10 pr-4 py-2 bg-slate-100 rounded-lg border-0 focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <button className="flex items-center gap-2 px-4 py-2 bg-blue-500 text-white rounded-lg text-sm font-medium hover:bg-blue-600">
            <Plus size={16} />
            Nueva orden
          </button>
        </div>

        <div className="space-y-2">
          {orders.map(order => (
            <div key={order.id} className="flex items-center gap-4 p-4 hover:bg-slate-50 rounded-xl cursor-pointer">
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
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
