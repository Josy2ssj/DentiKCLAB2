import { useState } from 'react';
import { useData, InventoryItem } from '../../contexts/DataContext';
import { Search, Plus, X, Package, AlertTriangle, Info, Tag, Download, FileText, Settings } from 'lucide-react';

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

  // Calculate category counts
  const categoryCounts = inventory.reduce((acc, item) => {
    acc[item.category] = (acc[item.category] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  const handleAdjustStock = (itemId: string, newStock: number) => {
    updateInventory(itemId, newStock);
    setShowAdjustStockModal(false);
    setSelectedMaterial(null);
  };

  return (
    <div className="h-full flex flex-col" style={{ padding: 'clamp(16px, 3vh, 32px)' }}>
      {/* Header */}
      <div className="shrink-0 mb-6">
        <h1 className="text-[32px] font-bold tracking-tight" style={{ color: '#081B40' }}>
          Inventario
        </h1>
        <p className="text-[14px] mt-1" style={{ color: '#6B8CA5' }}>
          Control de materiales y stock del laboratorio.
        </p>
      </div>

      {/* Main Workspace */}
      <div className="flex-1 min-h-0 flex gap-6">
        {/* Left: Main Content */}
        <div className="flex-1 flex flex-col min-w-0">
          {/* Statistics Cards */}
          <div className="grid grid-cols-3 gap-4 mb-6">
            <div className="bg-white/90 backdrop-blur-sm rounded-2xl p-5 shadow-sm">
              <div className="flex items-center gap-3 mb-2">
                <div className="w-10 h-10 rounded-full flex items-center justify-center" style={{ background: 'rgba(74, 144, 232, 0.1)' }}>
                  <Package size={20} style={{ color: '#4A90E8' }} />
                </div>
              </div>
              <p className="text-[11px] font-medium mb-1" style={{ color: '#6B8CA5' }}>Total de materiales</p>
              <p className="text-[28px] font-bold" style={{ color: '#081B40' }}>{totalMaterials}</p>
            </div>

            <div className="bg-white/90 backdrop-blur-sm rounded-2xl p-5 shadow-sm">
              <div className="flex items-center gap-3 mb-2">
                <div className="w-10 h-10 rounded-full flex items-center justify-center" style={{ background: 'rgba(16, 185, 129, 0.1)' }}>
                  <Tag size={20} style={{ color: '#10B981' }} />
                </div>
              </div>
              <p className="text-[11px] font-medium mb-1" style={{ color: '#6B8CA5' }}>Categorías</p>
              <p className="text-[28px] font-bold" style={{ color: '#081B40' }}>{categories}</p>
            </div>

            <div className={`rounded-2xl p-5 shadow-sm ${lowStockItems.length > 0 ? 'bg-orange-50' : 'bg-white/90 backdrop-blur-sm'}`}>
              <div className="flex items-center gap-3 mb-2">
                <div className={`w-10 h-10 rounded-full flex items-center justify-center ${lowStockItems.length > 0 ? '' : ''}`}
                  style={{ background: lowStockItems.length > 0 ? 'rgba(245, 158, 11, 0.1)' : 'rgba(158, 204, 220, 0.1)' }}>
                  <AlertTriangle size={20} style={{ color: lowStockItems.length > 0 ? '#F59E0B' : '#9ECCDC' }} />
                </div>
              </div>
              <p className="text-[11px] font-medium mb-1" style={{ color: '#6B8CA5' }}>Stock bajo</p>
              <p className="text-[28px] font-bold" style={{ color: lowStockItems.length > 0 ? '#F59E0B' : '#081B40' }}>
                {lowStockItems.length}
              </p>
            </div>
          </div>

          {/* Main Panel */}
          <div className="bg-white/90 backdrop-blur-sm rounded-2xl p-6 shadow-sm flex-1 min-h-0 flex flex-col">
            {/* Toolbar */}
            <div className="flex items-center gap-3 mb-5 flex-wrap">
              <button 
                onClick={() => setActiveCategory('all')}
                className="px-4 py-2 rounded-full text-[13px] font-semibold transition-all"
                style={{
                  background: activeCategory === 'all' ? 'linear-gradient(135deg, #4A90E8 0%, #3E83DE 100%)' : 'rgba(248, 250, 252, 0.9)',
                  color: activeCategory === 'all' ? '#FFFFFF' : '#4A6B8A',
                  boxShadow: activeCategory === 'all' ? '0 2px 8px rgba(74, 144, 232, 0.25)' : 'none',
                }}
              >
                Todos
              </button>
              <button 
                onClick={() => setActiveCategory('Materiales')}
                className="px-4 py-2 rounded-full text-[13px] font-semibold transition-all"
                style={{
                  background: activeCategory === 'Materiales' ? 'linear-gradient(135deg, #4A90E8 0%, #3E83DE 100%)' : 'rgba(248, 250, 252, 0.9)',
                  color: activeCategory === 'Materiales' ? '#FFFFFF' : '#4A6B8A',
                  boxShadow: activeCategory === 'Materiales' ? '0 2px 8px rgba(74, 144, 232, 0.25)' : 'none',
                }}
              >
                Materiales
              </button>
              <button 
                onClick={() => setActiveCategory('Acabado')}
                className="px-4 py-2 rounded-full text-[13px] font-semibold transition-all"
                style={{
                  background: activeCategory === 'Acabado' ? 'linear-gradient(135deg, #4A90E8 0%, #3E83DE 100%)' : 'rgba(248, 250, 252, 0.9)',
                  color: activeCategory === 'Acabado' ? '#FFFFFF' : '#4A6B8A',
                  boxShadow: activeCategory === 'Acabado' ? '0 2px 8px rgba(74, 144, 232, 0.25)' : 'none',
                }}
              >
                Acabado
              </button>
              <button 
                onClick={() => setActiveCategory('Impresión 3D')}
                className="px-4 py-2 rounded-full text-[13px] font-semibold transition-all"
                style={{
                  background: activeCategory === 'Impresión 3D' ? 'linear-gradient(135deg, #4A90E8 0%, #3E83DE 100%)' : 'rgba(248, 250, 252, 0.9)',
                  color: activeCategory === 'Impresión 3D' ? '#FFFFFF' : '#4A6B8A',
                  boxShadow: activeCategory === 'Impresión 3D' ? '0 2px 8px rgba(74, 144, 232, 0.25)' : 'none',
                }}
              >
                Impresión 3D
              </button>
              <button 
                onClick={() => setActiveCategory('Alineadores')}
                className="px-4 py-2 rounded-full text-[13px] font-semibold transition-all"
                style={{
                  background: activeCategory === 'Alineadores' ? 'linear-gradient(135deg, #4A90E8 0%, #3E83DE 100%)' : 'rgba(248, 250, 252, 0.9)',
                  color: activeCategory === 'Alineadores' ? '#FFFFFF' : '#4A6B8A',
                  boxShadow: activeCategory === 'Alineadores' ? '0 2px 8px rgba(74, 144, 232, 0.25)' : 'none',
                }}
              >
                Alineadores
              </button>
              <button 
                onClick={() => setActiveCategory('Limpieza')}
                className="px-4 py-2 rounded-full text-[13px] font-semibold transition-all"
                style={{
                  background: activeCategory === 'Limpieza' ? 'linear-gradient(135deg, #4A90E8 0%, #3E83DE 100%)' : 'rgba(248, 250, 252, 0.9)',
                  color: activeCategory === 'Limpieza' ? '#FFFFFF' : '#4A6B8A',
                  boxShadow: activeCategory === 'Limpieza' ? '0 2px 8px rgba(74, 144, 232, 0.25)' : 'none',
                }}
              >
                Limpieza
              </button>
            </div>

            {/* Search + New Material */}
            <div className="flex items-center gap-3 mb-5">
              <div className="flex-1 relative">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2" size={18} style={{ color: '#6B8CA5' }} />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Buscar materiales..."
                  className="w-full pl-11 pr-4 py-2.5 rounded-full text-[13px] transition-all"
                  style={{
                    background: 'rgba(248, 250, 252, 0.9)',
                    border: '1px solid rgba(220, 236, 246, 0.6)',
                    color: '#081B40',
                  }}
                />
              </div>
              <button 
                onClick={() => setShowNewMaterialModal(true)}
                className="flex items-center gap-2 px-5 py-2.5 rounded-full text-[13px] font-semibold transition-all hover:shadow-lg"
                style={{
                  background: 'linear-gradient(135deg, #4A90E8 0%, #3E83DE 100%)',
                  color: '#FFFFFF',
                  boxShadow: '0 2px 8px rgba(74, 144, 232, 0.3)',
                }}
              >
                <Plus size={16} />
                Nuevo material
              </button>
            </div>

            {/* Materials Grid */}
            <div className="flex-1 overflow-y-auto">
              {filteredMaterials.length === 0 ? (
                <div className="flex items-center justify-center h-32 text-[13px]" style={{ color: '#6B8CA5' }}>
                  No se encontraron materiales
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                  {filteredMaterials.map(item => {
                    const isLowStock = item.stock <= item.minStock;
                    return (
                      <div
                        key={item.id}
                        onClick={() => setSelectedMaterial(item)}
                        className={`relative p-4 rounded-xl border-2 cursor-pointer transition-all hover:shadow-md ${
                          isLowStock 
                            ? '' 
                            : ''
                        }`}
                        style={{
                          borderColor: isLowStock ? 'rgba(245, 158, 11, 0.3)' : 'rgba(220, 236, 246, 0.6)',
                          background: isLowStock ? 'rgba(245, 158, 11, 0.05)' : 'rgba(255, 255, 255, 0.9)',
                        }}
                      >
                        {/* Decorative shape */}
                        <div 
                          className="absolute top-0 right-0 w-20 h-20 rounded-bl-full opacity-10"
                          style={{ 
                            background: isLowStock ? '#F59E0B' : '#4A90E8',
                          }}
                        />

                        <div className="relative">
                          <div className="flex items-start justify-between mb-3">
                            <div className="flex items-center gap-3">
                              <div className="w-10 h-10 rounded-lg flex items-center justify-center"
                                style={{ 
                                  background: isLowStock ? 'rgba(245, 158, 11, 0.1)' : 'rgba(74, 144, 232, 0.1)',
                                }}>
                                <Package size={20} style={{ color: isLowStock ? '#F59E0B' : '#4A90E8' }} />
                              </div>
                              <div>
                                <p className="text-[13px] font-semibold" style={{ color: '#081B40' }}>{item.name}</p>
                                <p className="text-[11px]" style={{ color: '#6B8CA5' }}>{item.category}</p>
                              </div>
                            </div>
                            {isLowStock && (
                              <AlertTriangle size={16} style={{ color: '#F59E0B' }} />
                            )}
                          </div>

                          <div className="flex items-end justify-between">
                            <div>
                              <p className="text-[10px] mb-1" style={{ color: '#6B8CA5' }}>Stock actual</p>
                              <p className="text-[24px] font-bold" style={{ color: isLowStock ? '#F59E0B' : '#081B40' }}>
                                {item.stock}
                              </p>
                              <p className="text-[10px]" style={{ color: '#6B8CA5' }}>{item.unit}</p>
                            </div>
                            <div className="text-right">
                              <p className="text-[10px] mb-1" style={{ color: '#6B8CA5' }}>Mínimo</p>
                              <p className="text-[14px] font-semibold" style={{ color: '#4A6B8A' }}>{item.minStock}</p>
                            </div>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Right: Tools Panel */}
        <div className="w-80 bg-white/90 backdrop-blur-sm rounded-2xl p-6 shadow-sm flex flex-col">
          {/* Information */}
          <div className="mb-6">
            <h3 className="text-[14px] font-bold mb-4" style={{ color: '#081B40' }}>Información</h3>
            <div className="space-y-3">
              <div className="flex items-center justify-between p-3 rounded-xl" style={{ background: 'rgba(248, 250, 252, 0.9)' }}>
                <span className="text-[12px]" style={{ color: '#4A6B8A' }}>Última actualización</span>
                <span className="text-[12px] font-semibold" style={{ color: '#081B40' }}>Hoy</span>
              </div>
              <div className="flex items-center justify-between p-3 rounded-xl" style={{ background: 'rgba(248, 250, 252, 0.9)' }}>
                <span className="text-[12px]" style={{ color: '#4A6B8A' }}>Valor total</span>
                <span className="text-[12px] font-semibold" style={{ color: '#081B40' }}>$12,450</span>
              </div>
            </div>
          </div>

          {/* Divider */}
          <div className="border-t border-slate-100 my-6"></div>

          {/* Categorías */}
          <div className="mb-6">
            <h3 className="text-[14px] font-bold mb-4" style={{ color: '#081B40' }}>Categorías</h3>
            <div className="space-y-2">
              {Object.entries(categoryCounts).map(([category, count]) => (
                <div key={category} className="flex items-center gap-3 p-2 rounded-lg hover:bg-slate-50 transition-all cursor-pointer">
                  <div className="w-2 h-2 rounded-full" style={{ background: '#4A90E8' }} />
                  <span className="text-[12px] flex-1" style={{ color: '#4A6B8A' }}>{category}</span>
                  <span className="text-[12px] font-semibold" style={{ color: '#081B40' }}>{count}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Divider */}
          <div className="border-t border-slate-100 my-6"></div>

          {/* Herramientas */}
          <div className="flex-1">
            <h3 className="text-[14px] font-bold mb-4" style={{ color: '#081B40' }}>Herramientas</h3>
            <div className="space-y-2">
              <button 
                onClick={() => setShowNewMaterialModal(true)}
                className="w-full flex items-center gap-3 p-3 rounded-xl text-left transition-all hover:shadow-md"
                style={{
                  background: 'linear-gradient(135deg, #4A90E8 0%, #3E83DE 100%)',
                  color: '#FFFFFF',
                }}
              >
                <Plus size={16} />
                <span className="text-[12px] font-semibold">Registrar material</span>
              </button>

              <button className="w-full flex items-center gap-3 p-3 rounded-xl text-left transition-all hover:shadow-sm"
                style={{
                  background: 'rgba(248, 250, 252, 0.9)',
                  color: '#4A6B8A',
                }}
              >
                <Settings size={16} />
                <span className="text-[12px] font-semibold">Ajustar stock</span>
              </button>

              <button className="w-full flex items-center gap-3 p-3 rounded-xl text-left transition-all hover:shadow-sm"
                style={{
                  background: 'rgba(248, 250, 252, 0.9)',
                  color: '#4A6B8A',
                }}
              >
                <Tag size={16} />
                <span className="text-[12px] font-semibold">Categorías</span>
              </button>

              <button className="w-full flex items-center gap-3 p-3 rounded-xl text-left transition-all hover:shadow-sm"
                style={{
                  background: 'rgba(248, 250, 252, 0.9)',
                  color: '#4A6B8A',
                }}
              >
                <Download size={16} />
                <span className="text-[12px] font-semibold">Importar / Exportar</span>
              </button>

              <button className="w-full flex items-center gap-3 p-3 rounded-xl text-left transition-all hover:shadow-sm"
                style={{
                  background: 'rgba(248, 250, 252, 0.9)',
                  color: '#4A6B8A',
                }}
              >
                <FileText size={16} />
                <span className="text-[12px] font-semibold">Generar reporte</span>
              </button>
            </div>
          </div>
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
            <div className="w-12 h-12 rounded-xl flex items-center justify-center"
              style={{ 
                background: isLowStock ? 'rgba(245, 158, 11, 0.1)' : 'rgba(74, 144, 232, 0.1)',
              }}>
              <Package size={24} style={{ color: isLowStock ? '#F59E0B' : '#4A90E8' }} />
            </div>
            <div>
              <h2 className="text-[18px] font-bold" style={{ color: '#081B40' }}>{material.name}</h2>
              <p className="text-[12px]" style={{ color: '#6B8CA5' }}>{material.category}</p>
            </div>
          </div>
          <button 
            onClick={onClose}
            className="w-8 h-8 rounded-full flex items-center justify-center hover:bg-slate-100 transition-all"
          >
            <X size={18} style={{ color: '#6B8CA5' }} />
          </button>
        </div>

        <div className="p-6 space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="rounded-xl p-4" style={{ background: 'rgba(248, 250, 252, 0.9)' }}>
              <p className="text-[11px] mb-1" style={{ color: '#6B8CA5' }}>Stock actual</p>
              <p className="text-[28px] font-bold" style={{ color: isLowStock ? '#F59E0B' : '#081B40' }}>
                {material.stock}
              </p>
              <p className="text-[11px]" style={{ color: '#6B8CA5' }}>{material.unit}</p>
            </div>
            <div className="rounded-xl p-4" style={{ background: 'rgba(248, 250, 252, 0.9)' }}>
              <p className="text-[11px] mb-1" style={{ color: '#6B8CA5' }}>Stock mínimo</p>
              <p className="text-[28px] font-bold" style={{ color: '#081B40' }}>{material.minStock}</p>
              <p className="text-[11px]" style={{ color: '#6B8CA5' }}>{material.unit}</p>
            </div>
          </div>

          {isLowStock && (
            <div className="rounded-xl p-4" style={{ background: 'rgba(245, 158, 11, 0.05)', border: '2px solid rgba(245, 158, 11, 0.2)' }}>
              <div className="flex items-center gap-2">
                <AlertTriangle size={20} style={{ color: '#F59E0B' }} />
                <p className="text-[12px] font-medium" style={{ color: '#F59E0B' }}>
                  Stock bajo - Se recomienda reabastecer
                </p>
              </div>
            </div>
          )}
        </div>

        <div className="flex gap-3 p-6 border-t border-slate-100">
          <button 
            onClick={onClose}
            className="flex-1 px-4 py-2.5 rounded-full text-[13px] font-semibold transition-all hover:shadow-md"
            style={{
              background: 'rgba(248, 250, 252, 0.9)',
              color: '#4A6B8A',
            }}
          >
            Cerrar
          </button>
          <button 
            onClick={onAdjustStock}
            className="flex-1 px-4 py-2.5 rounded-full text-[13px] font-semibold transition-all hover:shadow-lg"
            style={{
              background: 'linear-gradient(135deg, #4A90E8 0%, #3E83DE 100%)',
              color: '#FFFFFF',
              boxShadow: '0 2px 8px rgba(74, 144, 232, 0.3)',
            }}
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
            <h2 className="text-[18px] font-bold" style={{ color: '#081B40' }}>Ajustar Stock</h2>
            <p className="text-[12px] mt-1" style={{ color: '#6B8CA5' }}>{material.name}</p>
          </div>
          <button 
            onClick={onClose}
            className="w-8 h-8 rounded-full flex items-center justify-center hover:bg-slate-100 transition-all"
          >
            <X size={18} style={{ color: '#6B8CA5' }} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          <div className="rounded-xl p-4" style={{ background: 'rgba(248, 250, 252, 0.9)' }}>
            <p className="text-[11px] mb-1" style={{ color: '#6B8CA5' }}>Stock actual</p>
            <p className="text-[28px] font-bold" style={{ color: '#081B40' }}>{material.stock} {material.unit}</p>
          </div>

          <div>
            <label className="text-[12px] font-semibold mb-2 block" style={{ color: '#4A6B8A' }}>Ajuste</label>
            <div className="flex items-center gap-3">
              <button
                type="button"
                onClick={() => setAdjustment(Math.max(-material.stock, adjustment - 1))}
                className="w-10 h-10 rounded-full flex items-center justify-center transition-all hover:shadow-md"
                style={{ background: 'rgba(248, 250, 252, 0.9)' }}
              >
                <span className="text-[18px] font-bold" style={{ color: '#4A6B8A' }}>-</span>
              </button>
              <input
                type="number"
                value={adjustment}
                onChange={(e) => setAdjustment(Number(e.target.value))}
                className="flex-1 px-4 py-2 rounded-xl text-[14px] text-center font-bold transition-all"
                style={{
                  background: 'rgba(248, 250, 252, 0.9)',
                  border: '1px solid rgba(220, 236, 246, 0.6)',
                  color: '#081B40',
                }}
              />
              <button
                type="button"
                onClick={() => setAdjustment(adjustment + 1)}
                className="w-10 h-10 rounded-full flex items-center justify-center transition-all hover:shadow-md"
                style={{ background: 'rgba(248, 250, 252, 0.9)' }}
              >
                <span className="text-[18px] font-bold" style={{ color: '#4A6B8A' }}>+</span>
              </button>
            </div>
          </div>

          <div className="rounded-xl p-4" style={{ background: 'rgba(74, 144, 232, 0.05)' }}>
            <p className="text-[11px] mb-1" style={{ color: '#6B8CA5' }}>Nuevo stock</p>
            <p className="text-[28px] font-bold" style={{ color: newStock < 0 ? '#EF4444' : '#4A90E8' }}>
              {newStock} {material.unit}
            </p>
          </div>

          <div>
            <label className="text-[12px] font-semibold mb-2 block" style={{ color: '#4A6B8A' }}>Razón (opcional)</label>
            <textarea
              value={reason}
              onChange={(e) => setReason(e.target.value)}
              className="w-full px-4 py-2.5 rounded-xl text-[13px] transition-all resize-none"
              style={{
                background: 'rgba(248, 250, 252, 0.9)',
                border: '1px solid rgba(220, 236, 246, 0.6)',
                color: '#081B40',
              }}
              rows={2}
              placeholder="Razón del ajuste..."
            />
          </div>
        </form>

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
            disabled={newStock < 0}
            className="flex-1 px-4 py-2.5 rounded-full text-[13px] font-semibold transition-all hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
            style={{
              background: 'linear-gradient(135deg, #4A90E8 0%, #3E83DE 100%)',
              color: '#FFFFFF',
              boxShadow: '0 2px 8px rgba(74, 144, 232, 0.3)',
            }}
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
          <h2 className="text-[18px] font-bold" style={{ color: '#081B40' }}>Nuevo Material</h2>
          <button 
            onClick={onClose}
            className="w-8 h-8 rounded-full flex items-center justify-center hover:bg-slate-100 transition-all"
          >
            <X size={18} style={{ color: '#6B8CA5' }} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          <div>
            <label className="text-[12px] font-semibold mb-2 block" style={{ color: '#4A6B8A' }}>Nombre *</label>
            <input
              type="text"
              required
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className="w-full px-4 py-2.5 rounded-xl text-[13px] transition-all"
              style={{
                background: 'rgba(248, 250, 252, 0.9)',
                border: '1px solid rgba(220, 236, 246, 0.6)',
                color: '#081B40',
              }}
              placeholder="Nombre del material"
            />
          </div>

          <div>
            <label className="text-[12px] font-semibold mb-2 block" style={{ color: '#4A6B8A' }}>Categoría *</label>
            <select
              value={formData.category}
              onChange={(e) => setFormData({ ...formData, category: e.target.value })}
              className="w-full px-4 py-2.5 rounded-xl text-[13px] transition-all"
              style={{
                background: 'rgba(248, 250, 252, 0.9)',
                border: '1px solid rgba(220, 236, 246, 0.6)',
                color: '#081B40',
              }}
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
              <label className="text-[12px] font-semibold mb-2 block" style={{ color: '#4A6B8A' }}>Stock inicial *</label>
              <input
                type="number"
                required
                min="0"
                value={formData.stock}
                onChange={(e) => setFormData({ ...formData, stock: Number(e.target.value) })}
                className="w-full px-4 py-2.5 rounded-xl text-[13px] transition-all"
                style={{
                  background: 'rgba(248, 250, 252, 0.9)',
                  border: '1px solid rgba(220, 236, 246, 0.6)',
                  color: '#081B40',
                }}
              />
            </div>
            <div>
              <label className="text-[12px] font-semibold mb-2 block" style={{ color: '#4A6B8A' }}>Stock mínimo *</label>
              <input
                type="number"
                required
                min="0"
                value={formData.minStock}
                onChange={(e) => setFormData({ ...formData, minStock: Number(e.target.value) })}
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
            <label className="text-[12px] font-semibold mb-2 block" style={{ color: '#4A6B8A' }}>Unidad *</label>
            <select
              value={formData.unit}
              onChange={(e) => setFormData({ ...formData, unit: e.target.value })}
              className="w-full px-4 py-2.5 rounded-xl text-[13px] transition-all"
              style={{
                background: 'rgba(248, 250, 252, 0.9)',
                border: '1px solid rgba(220, 236, 246, 0.6)',
                color: '#081B40',
              }}
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
            Crear Material
          </button>
        </div>
      </div>
    </div>
  );
}
