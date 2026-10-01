import { useData } from '../../contexts/DataContext';
import { Search, Package, AlertTriangle } from 'lucide-react';

export function InventoryScreen() {
  const { inventory } = useData();

  const lowStockItems = inventory.filter(item => item.stock <= item.minStock);

  return (
    <div className="max-w-[1600px] mx-auto">
      <div className="mb-6">
        <h1 className="text-[26px] sm:text-[28px] lg:text-[32px] font-bold tracking-tight" style={{ color: '#10264A' }}>Inventario</h1>
        <p className="text-[13px] mt-1" style={{ color: '#7B8BA5' }}>Control de materiales y stock del laboratorio.</p>
      </div>

      <div className="grid grid-cols-3 gap-4 mb-6">
        <div className="bg-white/90 backdrop-blur-sm rounded-2xl p-4 shadow-sm">
          <p className="text-xs text-slate-500 mb-1">Total materiales</p>
          <p className="text-2xl font-bold">{inventory.length}</p>
        </div>
        <div className="bg-white/90 backdrop-blur-sm rounded-2xl p-4 shadow-sm">
          <p className="text-xs text-slate-500 mb-1">Categorías</p>
          <p className="text-2xl font-bold">{new Set(inventory.map(i => i.category)).size}</p>
        </div>
        <div className={`rounded-2xl p-4 shadow-sm ${lowStockItems.length > 0 ? 'bg-yellow-50' : 'bg-white/90 backdrop-blur-sm'}`}>
          <div className="flex items-center gap-2 mb-1">
            <AlertTriangle size={12} className={lowStockItems.length > 0 ? 'text-yellow-600' : 'text-slate-400'} />
            <p className="text-xs text-slate-500">Stock bajo</p>
          </div>
          <p className={`text-2xl font-bold ${lowStockItems.length > 0 ? 'text-yellow-900' : ''}`}>{lowStockItems.length}</p>
        </div>
      </div>

      <div className="bg-white/90 backdrop-blur-sm rounded-2xl p-6 shadow-sm">
        <div className="flex items-center gap-4 mb-6">
          <div className="flex gap-2">
            <button className="px-4 py-2 bg-slate-900 text-white rounded-lg text-sm font-medium">Todos</button>
            <button className="px-4 py-2 bg-slate-100 text-slate-700 rounded-lg text-sm font-medium hover:bg-slate-200">Materiales</button>
            <button className="px-4 py-2 bg-slate-100 text-slate-700 rounded-lg text-sm font-medium hover:bg-slate-200">Acabado</button>
          </div>
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
            <input
              type="text"
              placeholder="Buscar materiales..."
              className="w-full pl-10 pr-4 py-2 bg-slate-100 rounded-lg border-0 focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div>

        <div className="space-y-2">
          {inventory.map(item => {
            const isLow = item.stock <= item.minStock;
            return (
              <div key={item.id} className="flex items-center gap-3 p-3 hover:bg-slate-50 rounded-xl">
                <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${isLow ? 'bg-yellow-100' : 'bg-blue-100'}`}>
                  <Package size={14} className={isLow ? 'text-yellow-600' : 'text-blue-600'} />
                </div>
                <div className="flex-1">
                  <p className="text-sm font-semibold">{item.name}</p>
                  <p className="text-xs text-slate-500">{item.category}</p>
                </div>
                <div className="flex items-center gap-2">
                  <span className={`text-sm font-bold ${isLow ? 'text-yellow-600' : ''}`}>{item.stock}</span>
                  <span className="text-xs text-slate-500">{item.unit}</span>
                </div>
                <button className="px-3 py-1 bg-slate-100 rounded-lg text-xs font-medium hover:bg-slate-200 opacity-0 group-hover:opacity-100">
                  Editar
                </button>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
