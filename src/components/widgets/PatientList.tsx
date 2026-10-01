import { useState } from 'react';
import { Search, ChevronRight, SlidersHorizontal } from 'lucide-react';
import { useData } from '../../contexts/DataContext';

const tabs = ['Órdenes', 'Pacientes', 'Trabajos'];

export default function PatientList() {
  const [activeTab, setActiveTab] = useState('Pacientes');
  const [search, setSearch] = useState('');
  const { patients } = useData();

  const filteredPatients = patients.filter(p =>
    p.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div
      className="h-full flex flex-col p-4 relative overflow-hidden"
      style={{
        background: 'rgba(255, 255, 255, 0.85)',
        borderRadius: '24px',
        backdropFilter: 'blur(12px)',
        boxShadow: '0 8px 32px rgba(17, 26, 53, 0.05), 0 2px 8px rgba(17, 26, 53, 0.02), inset 0 1px 0 rgba(255, 255, 255, 0.8)',
      }}
    >
      {/* Segmented Control */}
      <div className="relative flex items-center gap-1 p-1 rounded-full mb-3" style={{ background: 'rgba(241, 245, 249, 0.8)' }}>
        {tabs.map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className="flex-1 py-1.5 px-3 rounded-full text-[12px] font-semibold transition-all duration-200"
            style={{
              background: activeTab === tab
                ? 'linear-gradient(135deg, #121A30 0%, #1C2942 100%)'
                : 'transparent',
              color: activeTab === tab ? '#FFFFFF' : '#4A5568',
              boxShadow: activeTab === tab ? '0 2px 6px rgba(17, 26, 53, 0.15)' : 'none',
            }}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Search */}
      <div className="relative flex items-center gap-2 mb-2.5">
        <div className="flex-1 flex items-center gap-2 px-3 py-1.5 rounded-xl" style={{ background: 'rgba(248, 250, 252, 0.9)' }}>
          <Search size={13} style={{ color: '#7B8BA5' }} />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Buscar paciente..."
            className="bg-transparent border-none outline-none text-[12px] w-full placeholder:text-[#7B8BA5]"
            style={{ color: '#111A35' }}
          />
        </div>
        <button
          className="flex items-center justify-center w-7 h-7 rounded-lg transition-all duration-150 hover:bg-gray-100"
          style={{ background: 'rgba(248, 250, 252, 0.9)' }}
          aria-label="Filtros"
        >
          <SlidersHorizontal size={13} style={{ color: '#7B8BA5' }} />
        </button>
      </div>

      {/* Patient List */}
      <div className="relative flex-1 flex flex-col overflow-y-auto">
        {filteredPatients.map((patient) => (
          <button
            key={patient.id}
            className="flex items-center gap-2.5 px-2.5 py-2 rounded-xl transition-all duration-150 hover:bg-[rgba(248,250,252,0.8)] group text-left w-full"
          >
            {/* Avatar */}
            <div
              className="w-9 h-9 rounded-full flex items-center justify-center text-[11px] font-bold shrink-0"
              style={{
                background: `${patient.color}15`,
                color: patient.color,
              }}
            >
              {patient.name.split(' ').map(n => n[0]).join('')}
            </div>

            {/* Info */}
            <div className="flex-1 min-w-0">
              <p className="text-[12.5px] font-semibold truncate" style={{ color: '#111A35' }}>
                {patient.name}
              </p>
              <p className="text-[10.5px] truncate" style={{ color: '#7B8BA5' }}>
                Última orden: {patient.lastOrder}
              </p>
            </div>

            {/* Order count + chevron */}
            <div className="flex items-center gap-1 shrink-0">
              <span className="text-[11px] font-medium" style={{ color: '#7B8BA5' }}>
                {patient.orderCount} {patient.orderCount === 1 ? 'orden' : 'órdenes'}
              </span>
              <ChevronRight
                size={13}
                className="opacity-0 group-hover:opacity-100 transition-opacity duration-150"
                style={{ color: '#7B8BA5' }}
              />
            </div>
          </button>
        ))}
      </div>

      {/* Bottom Action */}
      <button
        className="relative mt-2 flex items-center justify-center gap-1.5 py-2 rounded-full text-[12px] font-semibold transition-all duration-200 hover:bg-[rgba(219,234,254,0.4)]"
        style={{
          background: 'rgba(219, 234, 254, 0.3)',
          color: '#2878FF',
        }}
      >
        Ver todos los pacientes
        <ChevronRight size={13} />
      </button>
    </div>
  );
}
