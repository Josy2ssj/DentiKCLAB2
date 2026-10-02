import { useState } from 'react';
import { ChevronLeft, ChevronRight, Plus, X, Calendar, Clock, Users, Download, FileText } from 'lucide-react';

interface Shift {
  id: string;
  personId: string;
  date: string;
  type: 'matutino' | 'vespertino' | 'extra' | 'libre';
  notes?: string;
}

const staff = [
  { id: 'josy', name: 'Josy', color: '#4A90E8' },
  { id: 'yael', name: 'Yael', color: '#10B981' }
];

const shiftColors = {
  matutino: { bg: 'rgba(74, 144, 232, 0.15)', text: '#4A90E8', border: '#4A90E8', label: 'Turno Matutino', time: '08:00 – 14:00' },
  vespertino: { bg: 'rgba(16, 185, 129, 0.15)', text: '#10B981', border: '#10B981', label: 'Turno Vespertino', time: '14:00 – 20:00' },
  extra: { bg: 'rgba(245, 158, 11, 0.15)', text: '#F59E0B', border: '#F59E0B', label: 'Turno Extra', time: '20:00 – 02:00' },
  libre: { bg: 'rgba(139, 92, 246, 0.15)', text: '#8B5CF6', border: '#8B5CF6', label: 'Día libre', time: '' }
};

export function ScheduleScreen() {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [shifts, setShifts] = useState<Shift[]>([]);
  const [selectedDay, setSelectedDay] = useState<string | null>(null);
  const [showAssignModal, setShowAssignModal] = useState(false);

  // Generate calendar days for the month
  const getDaysInMonth = () => {
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const days: Date[] = [];

    // Add empty cells for days before the first day of the month
    const startPadding = firstDay.getDay();
    for (let i = 0; i < startPadding; i++) {
      days.push(new Date(year, month, -startPadding + i + 1));
    }

    // Add all days of the month
    for (let i = 1; i <= lastDay.getDate(); i++) {
      days.push(new Date(year, month, i));
    }

    // Add empty cells to complete the grid (up to 42 days = 6 weeks)
    const endPadding = 42 - days.length;
    for (let i = 0; i < endPadding; i++) {
      days.push(new Date(year, month + 1, i + 1));
    }

    return days;
  };

  const daysInMonth = getDaysInMonth();
  const dayNames = ['Dom', 'Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb'];

  const getShiftsForDay = (date: Date) => {
    const dateStr = date.toISOString().split('T')[0];
    return shifts.filter(s => s.date === dateStr);
  };

  const isCurrentMonth = (date: Date) => {
    return date.getMonth() === currentDate.getMonth();
  };

  const isToday = (date: Date) => {
    const today = new Date();
    return date.toDateString() === today.toDateString();
  };

  const navigateMonth = (direction: 'prev' | 'next') => {
    const newDate = new Date(currentDate);
    if (direction === 'prev') {
      newDate.setMonth(newDate.getMonth() - 1);
    } else {
      newDate.setMonth(newDate.getMonth() + 1);
    }
    setCurrentDate(newDate);
  };

  const handleDayClick = (date: Date) => {
    if (!isCurrentMonth(date)) return;
    const dateStr = date.toISOString().split('T')[0];
    setSelectedDay(dateStr);
    setShowAssignModal(true);
  };

  const handleAssignShift = (personId: string, type: Shift['type'], notes?: string) => {
    if (!selectedDay) return;

    const newShift: Shift = {
      id: `shift-${Date.now()}`,
      personId,
      date: selectedDay,
      type,
      notes
    };

    setShifts([...shifts, newShift]);
    setShowAssignModal(false);
    setSelectedDay(null);
  };

  const handleRemoveShift = (shiftId: string) => {
    setShifts(shifts.filter(s => s.id !== shiftId));
  };

  return (
    <div className="h-full flex flex-col" style={{ padding: 'clamp(16px, 3vh, 32px)' }}>
      {/* Header */}
      <div className="shrink-0 mb-6">
        <h1 className="text-[32px] font-bold tracking-tight" style={{ color: '#081B40' }}>
          Horario
        </h1>
        <p className="text-[14px] mt-1" style={{ color: '#6B8CA5' }}>
          Gestiona los turnos del equipo.
        </p>
      </div>

      {/* Main Workspace */}
      <div className="flex-1 min-h-0 flex gap-6">
        {/* Left: Calendar */}
        <div className="flex-1 bg-white/90 backdrop-blur-sm rounded-2xl p-6 shadow-sm flex flex-col min-w-0">
          {/* Navigation */}
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-2">
              <button
                onClick={() => navigateMonth('prev')}
                className="w-10 h-10 rounded-full flex items-center justify-center hover:bg-slate-100 transition-all"
              >
                <ChevronLeft size={20} style={{ color: '#4A6B8A' }} />
              </button>
              <h2 className="text-[20px] font-bold min-w-[200px] text-center" style={{ color: '#081B40' }}>
                {currentDate.toLocaleDateString('es-ES', { month: 'long', year: 'numeric' })}
              </h2>
              <button
                onClick={() => navigateMonth('next')}
                className="w-10 h-10 rounded-full flex items-center justify-center hover:bg-slate-100 transition-all"
              >
                <ChevronRight size={20} style={{ color: '#4A6B8A' }} />
              </button>
            </div>
            <button
              onClick={() => setCurrentDate(new Date())}
              className="px-5 py-2 rounded-full text-[13px] font-semibold transition-all hover:shadow-lg"
              style={{
                background: 'linear-gradient(135deg, #4A90E8 0%, #3E83DE 100%)',
                color: '#FFFFFF',
                boxShadow: '0 2px 8px rgba(74, 144, 232, 0.3)',
              }}
            >
              Hoy
            </button>
          </div>

          {/* Calendar Grid */}
          <div className="flex-1 flex flex-col">
            {/* Day Names */}
            <div className="grid grid-cols-7 gap-2 mb-2">
              {dayNames.map(day => (
                <div key={day} className="text-center py-2">
                  <span className="text-[11px] font-semibold uppercase" style={{ color: '#6B8CA5' }}>{day}</span>
                </div>
              ))}
            </div>

            {/* Days Grid */}
            <div className="grid grid-cols-7 gap-2 flex-1">
              {daysInMonth.map((date, index) => {
                const dayShifts = getShiftsForDay(date);
                const isCurrent = isCurrentMonth(date);
                const isTodayDate = isToday(date);

                return (
                  <div
                    key={index}
                    onClick={() => handleDayClick(date)}
                    className={`relative p-2 rounded-xl border-2 transition-all ${
                      isCurrent 
                        ? isTodayDate
                          ? 'cursor-pointer hover:shadow-md'
                          : 'cursor-pointer hover:shadow-sm'
                        : 'cursor-default opacity-50'
                    }`}
                    style={{
                      minHeight: '100px',
                      borderColor: isTodayDate ? '#4A90E8' : isCurrent ? 'rgba(220, 236, 246, 0.6)' : 'transparent',
                      background: isTodayDate ? 'rgba(74, 144, 232, 0.05)' : isCurrent ? 'rgba(255, 255, 255, 0.9)' : 'rgba(248, 250, 252, 0.5)',
                    }}
                  >
                    {/* Day Number */}
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-[14px] font-bold" style={{
                        color: isTodayDate ? '#4A90E8' : isCurrent ? '#081B40' : '#9EC5E0'
                      }}>
                        {date.getDate()}
                      </span>
                      {isTodayDate && (
                        <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full" style={{
                          background: 'rgba(74, 144, 232, 0.1)',
                          color: '#4A90E8',
                        }}>
                          Hoy
                        </span>
                      )}
                    </div>

                    {/* Shifts */}
                    {isCurrent && dayShifts.length > 0 && (
                      <div className="space-y-1">
                        {dayShifts.map(shift => {
                          const person = staff.find(s => s.id === shift.personId);
                          const colors = shiftColors[shift.type];
                          return (
                            <div
                              key={shift.id}
                              className="flex items-center gap-1 px-2 py-1 rounded-lg text-[11px] font-medium"
                              style={{ 
                                backgroundColor: colors.bg, 
                                color: colors.text,
                                borderLeft: `3px solid ${colors.border}`
                              }}
                            >
                              <div 
                                className="w-4 h-4 rounded-full flex items-center justify-center text-white text-[9px] font-bold"
                                style={{ backgroundColor: person?.color }}
                              >
                                {person?.name[0]}
                              </div>
                              <span className="flex-1 truncate">
                                {shift.type === 'matutino' ? 'Mat' : 
                                 shift.type === 'vespertino' ? 'Ves' : 
                                 shift.type === 'extra' ? 'Extra' : 'Libre'}
                              </span>
                              <button
                                onClick={(e) => {
                                  e.stopPropagation();
                                  handleRemoveShift(shift.id);
                                }}
                                className="w-4 h-4 rounded-full flex items-center justify-center hover:bg-white/50 transition-all"
                              >
                                <X size={10} />
                              </button>
                            </div>
                          );
                        })}
                      </div>
                    )}

                    {/* Add Button */}
                    {isCurrent && dayShifts.length === 0 && (
                      <div className="absolute bottom-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity">
                        <div className="w-6 h-6 rounded-full flex items-center justify-center transition-all"
                          style={{
                            background: 'linear-gradient(135deg, #4A90E8 0%, #3E83DE 100%)',
                          }}
                        >
                          <Plus size={14} className="text-white" />
                        </div>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Right: Tools Panel */}
        <div className="w-80 bg-white/90 backdrop-blur-sm rounded-2xl p-6 shadow-sm flex flex-col">
          {/* Simbología */}
          <div className="mb-6">
            <h3 className="text-[14px] font-bold mb-4" style={{ color: '#081B40' }}>Simbología</h3>
            <div className="space-y-3">
              {Object.entries(shiftColors).map(([type, colors]) => (
                <div key={type} className="flex items-center gap-3">
                  <div 
                    className="w-8 h-8 rounded-lg flex items-center justify-center"
                    style={{ backgroundColor: colors.bg, borderLeft: `3px solid ${colors.border}` }}
                  >
                    <Clock size={14} style={{ color: colors.text }} />
                  </div>
                  <div className="flex-1">
                    <div className="text-[12px] font-semibold" style={{ color: colors.text }}>
                      {colors.label}
                    </div>
                    {colors.time && (
                      <div className="text-[10px]" style={{ color: '#6B8CA5' }}>
                        {colors.time}
                      </div>
                    )}
                  </div>
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
                onClick={() => setShowAssignModal(true)}
                className="w-full flex items-center gap-3 p-3 rounded-xl text-left transition-all hover:shadow-md"
                style={{
                  background: 'linear-gradient(135deg, #4A90E8 0%, #3E83DE 100%)',
                  color: '#FFFFFF',
                }}
              >
                <Plus size={16} />
                <span className="text-[12px] font-semibold">Asignar turno</span>
              </button>

              <button className="w-full flex items-center gap-3 p-3 rounded-xl text-left transition-all hover:shadow-sm"
                style={{
                  background: 'rgba(248, 250, 252, 0.9)',
                  color: '#4A6B8A',
                }}
              >
                <Users size={16} />
                <span className="text-[12px] font-semibold">Asignación múltiple</span>
              </button>

              <button className="w-full flex items-center gap-3 p-3 rounded-xl text-left transition-all hover:shadow-sm"
                style={{
                  background: 'rgba(248, 250, 252, 0.9)',
                  color: '#4A6B8A',
                }}
              >
                <Calendar size={16} />
                <span className="text-[12px] font-semibold">Intercambiar turnos</span>
              </button>

              <button className="w-full flex items-center gap-3 p-3 rounded-xl text-left transition-all hover:shadow-sm"
                style={{
                  background: 'rgba(248, 250, 252, 0.9)',
                  color: '#4A6B8A',
                }}
              >
                <FileText size={16} />
                <span className="text-[12px] font-semibold">Plantillas de horarios</span>
              </button>

              <button className="w-full flex items-center gap-3 p-3 rounded-xl text-left transition-all hover:shadow-sm"
                style={{
                  background: 'rgba(248, 250, 252, 0.9)',
                  color: '#4A6B8A',
                }}
              >
                <Download size={16} />
                <span className="text-[12px] font-semibold">Exportar calendario</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Assign Shift Modal */}
      {showAssignModal && selectedDay && (
        <AssignShiftModal
          date={selectedDay}
          onClose={() => {
            setShowAssignModal(false);
            setSelectedDay(null);
          }}
          onAssign={handleAssignShift}
        />
      )}
    </div>
  );
}

// Assign Shift Modal Component
function AssignShiftModal({ 
  date, 
  onClose, 
  onAssign 
}: { 
  date: string; 
  onClose: () => void; 
  onAssign: (personId: string, type: Shift['type'], notes?: string) => void;
}) {
  const [selectedPerson, setSelectedPerson] = useState(staff[0].id);
  const [selectedType, setSelectedType] = useState<Shift['type']>('matutino');
  const [notes, setNotes] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onAssign(selectedPerson, selectedType, notes || undefined);
  };

  const formattedDate = new Date(date).toLocaleDateString('es-ES', { 
    weekday: 'long', 
    year: 'numeric', 
    month: 'long', 
    day: 'numeric' 
  });

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 animate-fadeIn">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md overflow-hidden">
        {/* Modal Header */}
        <div className="flex items-center justify-between p-6 border-b border-slate-100">
          <div>
            <h2 className="text-[18px] font-bold" style={{ color: '#081B40' }}>Asignar Turno</h2>
            <p className="text-[12px] mt-1 capitalize" style={{ color: '#6B8CA5' }}>{formattedDate}</p>
          </div>
          <button 
            onClick={onClose}
            className="w-8 h-8 rounded-full flex items-center justify-center hover:bg-slate-100 transition-all"
          >
            <X size={18} style={{ color: '#6B8CA5' }} />
          </button>
        </div>

        {/* Modal Content */}
        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          {/* Person Selection */}
          <div>
            <label className="text-[12px] font-semibold mb-2 block" style={{ color: '#4A6B8A' }}>Persona</label>
            <div className="grid grid-cols-2 gap-2">
              {staff.map(person => (
                <button
                  key={person.id}
                  type="button"
                  onClick={() => setSelectedPerson(person.id)}
                  className={`flex items-center gap-2 p-3 rounded-xl border-2 transition-all ${
                    selectedPerson === person.id 
                      ? '' 
                      : 'hover:border-slate-300'
                  }`}
                  style={{
                    borderColor: selectedPerson === person.id ? '#4A90E8' : 'rgba(220, 236, 246, 0.6)',
                    background: selectedPerson === person.id ? 'rgba(74, 144, 232, 0.05)' : 'white',
                  }}
                >
                  <div 
                    className="w-8 h-8 rounded-full flex items-center justify-center text-white text-[12px] font-bold"
                    style={{ backgroundColor: person.color }}
                  >
                    {person.name[0]}
                  </div>
                  <span className="text-[13px] font-medium" style={{ color: '#081B40' }}>{person.name}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Shift Type */}
          <div>
            <label className="text-[12px] font-semibold mb-2 block" style={{ color: '#4A6B8A' }}>Tipo de Turno</label>
            <div className="grid grid-cols-2 gap-2">
              {Object.entries(shiftColors).map(([type, colors]) => (
                <button
                  key={type}
                  type="button"
                  onClick={() => setSelectedType(type as Shift['type'])}
                  className={`p-3 rounded-xl border-2 transition-all ${
                    selectedType === type 
                      ? '' 
                      : 'hover:border-slate-300'
                  }`}
                  style={{ 
                    borderColor: selectedType === type ? colors.border : 'rgba(220, 236, 246, 0.6)',
                    backgroundColor: selectedType === type ? colors.bg : 'white'
                  }}
                >
                  <span className="text-[12px] font-medium capitalize" style={{ color: colors.text }}>
                    {type === 'matutino' ? 'Matutino' : 
                     type === 'vespertino' ? 'Vespertino' : 
                     type === 'extra' ? 'Extra' : 'Libre'}
                  </span>
                </button>
              ))}
            </div>
          </div>

          {/* Notes */}
          <div>
            <label className="text-[12px] font-semibold mb-2 block" style={{ color: '#4A6B8A' }}>Notas (opcional)</label>
            <textarea
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
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
            Asignar Turno
          </button>
        </div>
      </div>
    </div>
  );
}
