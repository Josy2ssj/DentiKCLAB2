import { useState } from 'react';
import { useData, InventoryItem } from '../../contexts/DataContext';
import { Search, Plus, X, Edit2, Trash2, Package, AlertTriangle } from 'lucide-react';

type CategoryFilter = 'all' | 'Materiales' | 'Acabado' | 'Impresión 3D' | 'Alineadores' | 'Limpieza';

export function InventoryScreen() {
  const { inventory, updateInventory } = useData();
  const [activeCategory, setActiveCategory] = useState<CategoryFilter>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedMaterial, setSelectedMaterial] = useState<InventoryItem | null>(null);
  const [showNewMaterialModal, setShowNewMaterialModal] = useState(false);
  const [showAdjustStockModal, setShowAdjustStockModal] = useState(false);

  // Filter materials
  const filteredMaterials = inventory.filter(item => {
    const matchesCategory = activeCategory === 'all' || item.category === activeCategory;
    const matchesSearch = searchQuery === '' || 
      item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.category.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  // Calculate statistics
  const totalMaterials = inventory.length;
  const categories = new Set(inventory.map(i => i.category)).size;
  const lowStockItems = inventory.filter(i => i.stock <= i.minStock);

  const handleAdjustStock = (itemId: string, newStock: number) => {
    updateInventory(itemId, newStock);
    setShowAdjustStockModal(false);
    setSelectedMaterial(null);
  };

  return (
    <div className="max-w-[1600px] mx-auto h-full flex flex-col">
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-[26px] sm:text-[28px] lg:text-[32px] font-bold tracking-tight" style={{ color: '#10264A' }}>
          Inventario
        </h1>
        <p className="text-[13px] mt-1" style={{ color: '#7B8BA5' }}>
          Control de materiales y stock del laboratorio.
        </p>
      </div>

      {/* Statistics Cards */}
      <div className="grid grid-cols-3 gap-4 mb-6">
        <div className="bg-white/90 backdrop-blur-sm rounded-2xl p-4 shadow-sm">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center">
              <Package size={20} className="text-blue-600" />
            </div>
            <div>
              <p className="text-xs text-slate-500">Total materiales</p>
              <p className="text-2xl font-bold text-slate-900">{totalMaterials}</p>
            </div>
          </div>
        </div>

        <div className="bg-white/90 backdrop-blur-sm rounded-2xl p-4 shadow-sm">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-purple-100 flex items-center justify-center">
              <Package size={20} className="text-purple-600" />
            </div>
            <div>
              <p className="text-xs text-slate-500">Categorías</p>
              <p className="text-2xl font-bold text-slate-900">{categories}</p>
            </div>
          </div>
        </div>

        <div className={`rounded-2xl p-4 shadow-sm ${lowStockItems.length > 0 ? 'bg-orange-50' : 'bg-white/90 backdrop-blur-sm'}`}>
          <div className="flex items-center gap-3">
            <div className={`w-10 h-10 rounded-full flex items-center justify-center ${lowStockItems.length > 0 ? 'bg-orange-100' : 'bg-slate-100'}`}>
              <AlertTriangle size={20} className={lowStockItems.length > 0 ? 'text-orange-600' : 'text-slate-400'} />
            </div>
            <div>
              <p className="text-xs text-slate-500">Stock bajo</p>
              <p className={`text-2xl font-bold ${lowStockItems.length > 0 ? 'text-orange-900' : 'text-slate-900'}`}>
                {lowStockItems.length}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Main Panel */}
      <div className="bg-white/90 backdrop-blur-sm rounded-2xl p-6 shadow-sm flex-1 min-h-0 flex flex-col">
        {/* Toolbar */}
        <div className="flex items-center gap-4 mb-6">
          <div className="flex gap-2 overflow-x-auto">
            <button 
              onClick={() => setActiveCategory('all')}
              className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-all ${
                activeCategory === 'all' 
                  ? 'bg-gradient-to-r from-blue-500 to-blue-600 text-white shadow-md' 
                  : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
              }`}
            >
              Todos
            </button>
            <button 
              onClick={() => setActiveCategory('Materiales')}
              className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-all ${
                activeCategory === 'Materiales' 
                  ? 'bg-gradient-to-r from-blue-500 to-blue-600 text-white shadow-md' 
                  : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
              }`}
            >
              Materiales
            </button>
            <button 
              onClick={() => setActiveCategory('Acabado')}
              className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-all ${
                activeCategory === 'Acabado' 
                  ? 'bg-gradient-to-r from-blue-500 to-blue-600 text-white shadow-md' 
                  : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
              }`}
            >
              Acabado
            </button>
            <button 
              onClick={() => setActiveCategory('Impresión 3D')}
              className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-all ${
                activeCategory === 'Impresión 3D' 
                  ? 'bg-gradient-to-r from-blue-500 to-blue-600 text-white shadow-md' 
                  : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
              }`}
            >
              Impresión 3D
            </button>
            <button 
              onClick={() => setActiveCategory('Alineadores')}
              className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-all ${
                activeCategory === 'Alineadores' 
                  ? 'bg-gradient-to-r from-blue-500 to-blue-600 text-white shadow-md' 
                  : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
              }`}
            >
              Alineadores
            </button>
            <button 
              onClick={() => setActiveCategory('Limpieza')}
              className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-all ${
                activeCategory === 'Limpieza' 
                  ? 'bg-gradient-to-r from-blue-500 to-blue-600 text-white shadow-md' 
                  : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
              }`}
            >
              Limpieza
            </button>
          </div>
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Buscar materiales..."
              className="w-full pl-10 pr-4 py-2 bg-slate-100 rounded-full border-0 focus:ring-2 focus:ring-blue-500 transition-all"
            />
          </div>
          <button 
            onClick={() => setShowNewMaterialModal(true)}
            className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-full text-sm font-medium hover:shadow-lg transition-all"
          >
            <Plus size={16} />
            Nuevo material
          </button>
        </div>

        {/* Materials Grid */}
        <div className="flex-1 overflow-y-auto">
          {filteredMaterials.length === 0 ? (
            <div className="flex items-center justify-center h-32 text-slate-400">
              No se encontraron materiales
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {filteredMaterials.map(item => {
                const isLowStock = item.stock <= item.minStock;
                return (
                  <div
                    key={item.id}
                    onClick={() => setSelectedMaterial(item)}
                    className={`p-4 rounded-xl border-2 cursor-pointer transition-all hover:shadow-md ${
                      isLowStock 
                        ? 'border-orange-200 bg-orange-50' 
                        : 'border-slate-200 bg-white hover:border-blue-300'
                    }`}
                  >
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex items-center gap-3">
                        <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                          isLowStock ? 'bg-orange-100' : 'bg-blue-100'
                        }`}>
                          <Package size={20} className={isLowStock ? 'text-orange-600' : 'text-blue-600'} />
                        </div>
                        <div>
                          <p className="font-semibold text-slate-900">{item.name}</p>
                          <p className="text-xs text-slate-500">{item.category}</p>
                        </div>
                      </div>
                      {isLowStock && (
                        <AlertTriangle size={16} className="text-orange-600" />
                      )}
                    </div>

                    <div className="flex items-end justify-between">
                      <div>
                        <p className="text-xs text-slate-500 mb-1">Stock actual</p>
                        <p className={`text-2xl font-bold ${isLowStock ? 'text-orange-600' : 'text-slate-900'}`}>
                          {item.stock}
                        </p>
                        <p className="text-xs text-slate-500">{item.unit}</p>
                      </div>
                      <div className="text-right">
                        <p className="text-xs text-slate-500 mb-1">Mínimo</p>
                        <p className="text-sm font-semibold text-slate-700">{item.minStock}</p>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>

      {/* Material Detail Modal */}
      {selectedMaterial && !showAdjustStockModal && (
        <MaterialDetailModal
          material={selectedMaterial}
          onClose={() => setSelectedMaterial(null)}
          onAdjustStock={() => setShowAdjustStockModal(true)}
        />
      )}

      {/* Adjust Stock Modal */}
      {showAdjustStockModal && selectedMaterial && (
        <AdjustStockModal
          material={selectedMaterial}
          onClose={() => setShowAdjustStockModal(false)}
          onAdjust={handleAdjustStock}
        />
      )}

      {/* New Material Modal */}
      {showNewMaterialModal && (
        <NewMaterialModal
          onClose={() => setShowNewMaterialModal(false)}
        />
      )}
    </div>
  );
}

// Material Detail Modal
function MaterialDetailModal({ 
  material, 
  onClose, 
  onAdjustStock 
}: { 
  material: InventoryItem; 
  onClose: () => void; 
  onAdjustStock: () => void;
}) {
  const isLowStock = material.stock <= material.minStock;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 animate-fadeIn">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md overflow-hidden">
        <div className="flex items-center justify-between p-6 border-b border-slate-100">
          <div className="flex items-center gap-3">
            <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${
              isLowStock ? 'bg-orange-100' : 'bg-blue-100'
            }`}>
              <Package size={24} className={isLowStock ? 'text-orange-600' : 'text-blue-600'} />
            </div>
            <div>
              <h2 className="text-xl font-bold text-slate-900">{material.name}</h2>
              <p className="text-sm text-slate-500">{material.category}</p>
            </div>
          </div>
          <button 
            onClick={onClose}
            className="w-8 h-8 rounded-full flex items-center justify-center hover:bg-slate-100 transition-all"
          >
            <X size={18} className="text-slate-500" />
          </button>
        </div>

        <div className="p-6 space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-slate-50 rounded-xl p-4">
              <p className="text-xs text-slate-500 mb-1">Stock actual</p>
              <p className={`text-3xl font-bold ${isLowStock ? 'text-orange-600' : 'text-slate-900'}`}>
                {material.stock}
              </p>
              <p className="text-xs text-slate-500">{material.unit}</p>
            </div>
            <div className="bg-slate-50 rounded-xl p-4">
              <p className="text-xs text-slate-500 mb-1">Stock mínimo</p>
              <p className="text-3xl font-bold text-slate-900">{material.minStock}</p>
              <p className="text-xs text-slate-500">{material.unit}</p>
            </div>
          </div>

          {isLowStock && (
            <div className="bg-orange-50 border-2 border-orange-200 rounded-xl p-4">
              <div className="flex items-center gap-2">
                <AlertTriangle size={20} className="text-orange-600" />
                <p className="text-sm font-medium text-orange-900">
                  Stock bajo - Se recomienda reabastecer
                </p>
              </div>
            </div>
          )}
        </div>

        <div className="flex gap-3 p-6 border-t border-slate-100">
          <button 
            onClick={onClose}
            className="flex-1 px-4 py-2 bg-slate-100 text-slate-700 rounded-full text-sm font-medium hover:bg-slate-200 transition-all"
          >
            Cerrar
          </button>
          <button 
            onClick={onAdjustStock}
            className="flex-1 px-4 py-2 bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-full text-sm font-medium hover:shadow-lg transition-all"
          >
            Ajustar Stock
          </button>
        </div>
      </div>
    </div>
  );
}

// Adjust Stock Modal
function AdjustStockModal({ 
  material, 
  onClose, 
  onAdjust 
}: { 
  material: InventoryItem; 
  onClose: () => void; 
  onAdjust: (itemId: string, newStock: number) => void;
}) {
  const [adjustment, setAdjustment] = useState(0);
  const [reason, setReason] = useState('');

  const newStock = material.stock + adjustment;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (newStock >= 0) {
      onAdjust(material.id, newStock);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 animate-fadeIn">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md overflow-hidden">
        <div className="flex items-center justify-between p-6 border-b border-slate-100">
          <div>
            <h2 className="text-xl font-bold text-slate-900">Ajustar Stock</h2>
            <p className="text-sm text-slate-500 mt-1">{material.name}</p>
          </div>
          <button 
            onClick={onClose}
            className="w-8 h-8 rounded-full flex items-center justify-center hover:bg-slate-100 transition-all"
          >
            <X size={18} className="text-slate-500" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          <div className="bg-slate-50 rounded-xl p-4">
            <p className="text-xs text-slate-500 mb-1">Stock actual</p>
            <p className="text-3xl font-bold text-slate-900">{material.stock} {material.unit}</p>
          </div>

          <div>
            <label className="text-sm font-medium text-slate-700 mb-2 block">Ajuste</label>
            <div className="flex items-center gap-3">
              <button
                type="button"
                onClick={() => setAdjustment(Math.max(-material.stock, adjustment - 1))}
                className="w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center hover:bg-slate-200 transition-all"
              >
                <span className="text-xl font-bold text-slate-600">-</span>
              </button>
              <input
                type="number"
                value={adjustment}
                onChange={(e) => setAdjustment(Number(e.target.value))}
                className="flex-1 px-4 py-2 bg-slate-100 rounded-lg border-0 focus:ring-2 focus:ring-blue-500 text-center text-lg font-bold"
              />
              <button
                type="button"
                onClick={() => setAdjustment(adjustment + 1)}
                className="w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center hover:bg-slate-200 transition-all"
              >
                <span className="text-xl font-bold text-slate-600">+</span>
              </button>
            </div>
          </div>

          <div className="bg-blue-50 rounded-xl p-4">
            <p className="text-xs text-slate-500 mb-1">Nuevo stock</p>
            <p className={`text-3xl font-bold ${newStock < 0 ? 'text-red-600' : 'text-blue-600'}`}>
              {newStock} {material.unit}
            </p>
          </div>

          <div>
            <label className="text-sm font-medium text-slate-700 mb-2 block">Razón (opcional)</label>
            <textarea
              value={reason}
              onChange={(e) => setReason(e.target.value)}
              className="w-full px-3 py-2 bg-slate-100 rounded-lg border-0 focus:ring-2 focus:ring-blue-500 resize-none"
              rows={2}
              placeholder="Razón del ajuste..."
            />
          </div>
        </form>

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
            disabled={newStock < 0}
            className="flex-1 px-4 py-2 bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-full text-sm font-medium hover:shadow-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Confirmar Ajuste
          </button>
        </div>
      </div>
    </div>
  );
}

// New Material Modal
function NewMaterialModal({ onClose }: { onClose: () => void }) {
  const { inventory } = useData();
  const [formData, setFormData] = useState({
    name: '',
    category: 'Materiales',
    stock: 0,
    minStock: 0,
    unit: 'unidades'
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: Implement addMaterial in DataContext
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 animate-fadeIn">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md overflow-hidden">
        <div className="flex items-center justify-between p-6 border-b border-slate-100">
          <h2 className="text-xl font-bold text-slate-900">Nuevo Material</h2>
          <button 
            onClick={onClose}
            className="w-8 h-8 rounded-full flex items-center justify-center hover:bg-slate-100 transition-all"
          >
            <X size={18} className="text-slate-500" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          <div>
            <label className="text-sm font-medium text-slate-700 mb-2 block">Nombre *</label>
            <input
              type="text"
              required
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className="w-full px-3 py-2 bg-slate-100 rounded-lg border-0 focus:ring-2 focus:ring-blue-500"
              placeholder="Nombre del material"
            />
          </div>

          <div>
            <label className="text-sm font-medium text-slate-700 mb-2 block">Categoría *</label>
            <select
              value={formData.category}
              onChange={(e) => setFormData({ ...formData, category: e.target.value })}
              className="w-full px-3 py-2 bg-slate-100 rounded-lg border-0 focus:ring-2 focus:ring-blue-500"
            >
              <option value="Materiales">Materiales</option>
              <option value="Acabado">Acabado</option>
              <option value="Impresión 3D">Impresión 3D</option>
              <option value="Alineadores">Alineadores</option>
              <option value="Limpieza">Limpieza</option>
            </select>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="text-sm font-medium text-slate-700 mb-2 block">Stock inicial *</label>
              <input
                type="number"
                required
                min="0"
                value={formData.stock}
                onChange={(e) => setFormData({ ...formData, stock: Number(e.target.value) })}
                className="w-full px-3 py-2 bg-slate-100 rounded-lg border-0 focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="text-sm font-medium text-slate-700 mb-2 block">Stock mínimo *</label>
              <input
                type="number"
                required
                min="0"
                value={formData.minStock}
                onChange={(e) => setFormData({ ...formData, minStock: Number(e.target.value) })}
                className="w-full px-3 py-2 bg-slate-100 rounded-lg border-0 focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>

          <div>
            <label className="text-sm font-medium text-slate-700 mb-2 block">Unidad *</label>
            <select
              value={formData.unit}
              onChange={(e) => setFormData({ ...formData, unit: e.target.value })}
              className="w-full px-3 py-2 bg-slate-100 rounded-lg border-0 focus:ring-2 focus:ring-blue-500"
            >
              <option value="unidades">Unidades</option>
              <option value="tubos">Tubos</option>
              <option value="rollos">Rollos</option>
              <option value="kg">Kilogramos</option>
              <option value="litros">Litros</option>
            </select>
          </div>
        </form>

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
            Crear Material
          </button>
        </div>
      </div>
    </div>
  );
}
