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
      className="h-full flex flex-col relative overflow-hidden"
      style={{
        background: 'rgba(255, 255, 255, 0.85)',
        borderRadius: '24px',
        backdropFilter: 'blur(12px)',
        boxShadow: '0 8px 32px rgba(17, 26, 53, 0.05), 0 2px 8px rgba(17, 26, 53, 0.02), inset 0 1px 0 rgba(255, 255, 255, 0.8)',
        padding: 'clamp(12px, 2vh, 20px)',
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
        <div 
          className="flex-1 flex items-center gap-2 px-3 py-1.5 rounded-xl" 
          style={{ 
            background: 'rgba(248, 250, 252, 0.9)',
            transition: 'all 160ms cubic-bezier(0.22, 1, 0.36, 1)',
          }}
          onFocus={(e) => {
            e.currentTarget.style.background = 'rgba(255, 255, 255, 0.95)';
            e.currentTarget.style.boxShadow = '0 0 0 2px rgba(40, 120, 255, 0.1)';
            const icon = e.currentTarget.querySelector('svg');
            if (icon) icon.style.color = '#2878FF';
          }}
          onBlur={(e) => {
            e.currentTarget.style.background = 'rgba(248, 250, 252, 0.9)';
            e.currentTarget.style.boxShadow = 'none';
            const icon = e.currentTarget.querySelector('svg');
            if (icon) icon.style.color = '#7B8BA5';
          }}
        >
          <Search size={13} style={{ color: '#7B8BA5', transition: 'color 160ms cubic-bezier(0.22, 1, 0.36, 1)' }} />
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
          className="flex items-center justify-center w-7 h-7 rounded-lg"
          style={{ 
            background: 'rgba(248, 250, 252, 0.9)',
            transition: 'all 150ms cubic-bezier(0.22, 1, 0.36, 1)',
          }}
          aria-label="Filtros"
          onMouseEnter={(e) => {
            e.currentTarget.style.background = 'rgba(241, 245, 249, 1)';
            e.currentTarget.style.transform = 'scale(1.05)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.background = 'rgba(248, 250, 252, 0.9)';
            e.currentTarget.style.transform = 'scale(1)';
          }}
          onMouseDown={(e) => {
            e.currentTarget.style.transform = 'scale(0.95)';
          }}
          onMouseUp={(e) => {
            e.currentTarget.style.transform = 'scale(1.05)';
          }}
        >
          <SlidersHorizontal size={13} style={{ color: '#7B8BA5' }} />
        </button>
      </div>

      {/* Patient List */}
      <div className="relative flex-1 flex flex-col overflow-y-auto">
        {filteredPatients.map((patient) => (
          <button
            key={patient.id}
            className="flex items-center gap-2.5 px-2.5 py-2 rounded-xl group text-left w-full"
            style={{ transition: 'all 160ms cubic-bezier(0.22, 1, 0.36, 1)' }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = 'rgba(219, 234, 254, 0.3)';
              const content = e.currentTarget.querySelector('.patient-content');
              if (content) (content as HTMLElement).style.transform = 'translateX(2px)';
              const avatar = e.currentTarget.querySelector('.patient-avatar');
              if (avatar) (avatar as HTMLElement).style.filter = 'saturate(1.2) brightness(1.05)';
              const count = e.currentTarget.querySelector('.patient-count');
              if (count) (count as HTMLElement).style.color = '#3D4F6F';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = 'transparent';
              const content = e.currentTarget.querySelector('.patient-content');
              if (content) (content as HTMLElement).style.transform = 'translateX(0)';
              const avatar = e.currentTarget.querySelector('.patient-avatar');
              if (avatar) (avatar as HTMLElement).style.filter = 'none';
              const count = e.currentTarget.querySelector('.patient-count');
              if (count) (count as HTMLElement).style.color = '#7B8BA5';
            }}
            onMouseDown={(e) => {
              e.currentTarget.style.transform = 'scale(0.995)';
            }}
            onMouseUp={(e) => {
              e.currentTarget.style.transform = 'scale(1)';
            }}
          >
            <div className="flex items-center gap-2.5 w-full patient-content" style={{ transition: 'transform 160ms cubic-bezier(0.22, 1, 0.36, 1)' }}>
              {/* Avatar */}
              <div
                className="w-9 h-9 rounded-full flex items-center justify-center text-[11px] font-bold shrink-0 patient-avatar"
                style={{
                  background: `${patient.color}15`,
                  color: patient.color,
                  transition: 'filter 160ms cubic-bezier(0.22, 1, 0.36, 1)',
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
                <span className="text-[11px] font-medium patient-count" style={{ color: '#7B8BA5', transition: 'color 160ms cubic-bezier(0.22, 1, 0.36, 1)' }}>
                  {patient.orderCount} {patient.orderCount === 1 ? 'orden' : 'órdenes'}
                </span>
              <ChevronRight
                size={13}
                className="opacity-0 group-hover:opacity-100 transition-opacity duration-150"
                style={{ color: '#7B8BA5' }}
              />
            </div>
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
