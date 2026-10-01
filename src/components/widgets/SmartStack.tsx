import { useState } from 'react';
import { StickyNote, Users, Music, ChevronLeft, ChevronRight, Send } from 'lucide-react';

const modules = [
  { id: 'note', label: 'Nota rápida', icon: StickyNote },
  { id: 'staff', label: 'Quién está hoy', icon: Users },
  { id: 'music', label: 'Música', icon: Music },
];

export default function SmartStack() {
  const [activeModule, setActiveModule] = useState(0);
  const [note, setNote] = useState('');

  const goNext = () => setActiveModule((prev) => (prev + 1) % modules.length);
  const goPrev = () => setActiveModule((prev) => (prev - 1 + modules.length) % modules.length);

  return (
    <div
      className="h-full flex flex-col p-4"
      style={{
        background: 'rgba(255, 255, 255, 0.94)',
        borderRadius: '24px',
        backdropFilter: 'blur(8px)',
        boxShadow: '0 8px 32px rgba(17, 26, 53, 0.06), inset 0 1px 0 rgba(255, 255, 255, 0.9)',
      }}
    >
      {/* Header */}
      <div className="flex items-center justify-between mb-3">
        <h3 className="text-[13px] font-bold" style={{ color: '#111A35' }}>
          Centro de control
        </h3>
        <button
          className="flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-semibold transition-all duration-150 hover:bg-[#F1F5F9]"
          style={{ color: '#3D4F6F' }}
        >
          Notas
        </button>
      </div>

      {/* Module Selector */}
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-1">
          {modules.map((mod, idx) => {
            const Icon = mod.icon;
            const isActive = idx === activeModule;
            return (
              <button
                key={mod.id}
                onClick={() => setActiveModule(idx)}
                className="flex items-center justify-center w-6 h-6 rounded-md transition-all duration-200"
                style={{
                  background: isActive ? 'rgba(46, 197, 165, 0.15)' : 'transparent',
                }}
                title={mod.label}
                aria-label={mod.label}
              >
                <Icon
                  size={12}
                  style={{ color: isActive ? '#064E3B' : '#7B8BA5' }}
                  strokeWidth={isActive ? 2.2 : 1.8}
                />
              </button>
            );
          })}
        </div>

        {/* Pagination */}
        <div className="flex items-center gap-0.5">
          <button
            onClick={goPrev}
            className="w-5 h-5 flex items-center justify-center rounded transition-all duration-150 hover:bg-[#F1F5F9] active:scale-95"
            aria-label="Anterior"
          >
            <ChevronLeft size={11} style={{ color: '#3D4F6F' }} />
          </button>
          <span className="text-[10px] font-semibold px-1" style={{ color: '#7B8BA5' }}>
            {activeModule + 1}/{modules.length}
          </span>
          <button
            onClick={goNext}
            className="w-5 h-5 flex items-center justify-center rounded transition-all duration-150 hover:bg-[#F1F5F9] active:scale-95"
            aria-label="Siguiente"
          >
            <ChevronRight size={11} style={{ color: '#3D4F6F' }} />
          </button>
        </div>
      </div>

      {/* Content */}
      <div className="flex-1">
        {activeModule === 0 && (
          <div className="flex flex-col h-full">
            <div className="mb-2">
              <p className="text-[11px] font-semibold" style={{ color: '#111A35' }}>
                Nota rápida
              </p>
              <p className="text-[9px]" style={{ color: '#7B8BA5' }}>
                Escribe y envía para guardar
              </p>
            </div>
            <div
              className="flex-1 relative rounded-lg p-2"
              style={{
                background: 'rgba(248, 250, 252, 0.9)',
                boxShadow: 'inset 0 1px 2px rgba(17, 26, 53, 0.03)',
              }}
            >
              <textarea
                value={note}
                onChange={(e) => setNote(e.target.value)}
                placeholder="Escribe aquí tu nota..."
                className="w-full h-full text-[11px] resize-none border-none outline-none placeholder:text-[#7B8BA5]"
                style={{ background: 'transparent', color: '#111A35' }}
              />
            </div>
            <div className="flex items-center justify-end mt-2">
              <button
                className="flex items-center justify-center w-6 h-6 rounded-full transition-all duration-200 hover:scale-105 active:scale-95 disabled:opacity-40"
                style={{
                  background: note.trim()
                    ? 'linear-gradient(135deg, #2878FF 0%, #1D65E0 100%)'
                    : '#E2E8F0',
                  boxShadow: note.trim() ? '0 2px 6px rgba(40, 120, 255, 0.25)' : 'none',
                }}
                aria-label="Guardar nota"
              >
                <Send size={10} style={{ color: '#FFFFFF' }} />
              </button>
            </div>
          </div>
        )}
        {activeModule === 1 && (
          <div className="text-center py-8">
            <p className="text-[11px]" style={{ color: '#7B8BA5' }}>
              Equipo de hoy
            </p>
          </div>
        )}
        {activeModule === 2 && (
          <div className="text-center py-8">
            <p className="text-[11px]" style={{ color: '#7B8BA5' }}>
              Reproductor de música
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
