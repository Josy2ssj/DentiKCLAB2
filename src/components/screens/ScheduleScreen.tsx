import { useState } from 'react';
import { ChevronLeft, ChevronRight, Plus, X } from 'lucide-react';

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
  matutino: { bg: 'rgba(74, 144, 232, 0.15)', text: '#4A90E8', border: '#4A90E8' },
  vespertino: { bg: 'rgba(16, 185, 129, 0.15)', text: '#10B981', border: '#10B981' },
  extra: { bg: 'rgba(245, 158, 11, 0.15)', text: '#F59E0B', border: '#F59E0B' },
  libre: { bg: 'rgba(139, 92, 246, 0.15)', text: '#8B5CF6', border: '#8B5CF6' }
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
    <div className="max-w-[1600px] mx-auto h-full flex flex-col">
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-[26px] sm:text-[28px] lg:text-[32px] font-bold tracking-tight" style={{ color: '#10264A' }}>
          Horario
        </h1>
        <p className="text-[13px] mt-1" style={{ color: '#7B8BA5' }}>
          Gestiona los turnos del equipo.
        </p>
      </div>

      {/* Main Panel */}
      <div className="bg-white/90 backdrop-blur-sm rounded-2xl p-6 shadow-sm flex-1 min-h-0 flex flex-col" data-workspace="schedule-panel">
        {/* Navigation */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-2">
            <button
              onClick={() => navigateMonth('prev')}
              className="w-10 h-10 rounded-full flex items-center justify-center hover:bg-slate-100 transition-all"
            >
              <ChevronLeft size={20} className="text-slate-600" />
            </button>
            <h2 className="text-xl font-bold text-slate-900 min-w-[200px] text-center">
              {currentDate.toLocaleDateString('es-ES', { month: 'long', year: 'numeric' })}
            </h2>
            <button
              onClick={() => navigateMonth('next')}
              className="w-10 h-10 rounded-full flex items-center justify-center hover:bg-slate-100 transition-all"
            >
              <ChevronRight size={20} className="text-slate-600" />
            </button>
          </div>
          <button
            onClick={() => setCurrentDate(new Date())}
            className="px-4 py-2 bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-full text-sm font-medium hover:shadow-lg transition-all"
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
                <span className="text-xs font-semibold text-slate-500 uppercase">{day}</span>
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
                        ? 'border-blue-400 bg-blue-50 cursor-pointer hover:shadow-md'
                        : 'border-slate-200 bg-white cursor-pointer hover:border-blue-300 hover:shadow-sm'
                      : 'border-transparent bg-slate-50 cursor-default opacity-50'
                  }`}
                  style={{ minHeight: '100px' }}
                >
                  {/* Day Number */}
                  <div className="flex items-center justify-between mb-2">
                    <span className={`text-sm font-bold ${
                      isTodayDate ? 'text-blue-600' : isCurrent ? 'text-slate-900' : 'text-slate-400'
                    }`}>
                      {date.getDate()}
                    </span>
                    {isTodayDate && (
                      <span className="text-xs font-semibold text-blue-600 bg-blue-100 px-2 py-0.5 rounded-full">
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
                            className="flex items-center gap-1 px-2 py-1 rounded-lg text-xs font-medium"
                            style={{ 
                              backgroundColor: colors.bg, 
                              color: colors.text,
                              borderLeft: `3px solid ${colors.border}`
                            }}
                          >
                            <div 
                              className="w-4 h-4 rounded-full flex items-center justify-center text-white text-[10px] font-bold"
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
                      <div className="w-6 h-6 rounded-full bg-blue-500 flex items-center justify-center hover:bg-blue-600 transition-all">
                        <Plus size={14} className="text-white" />
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* Legend */}
        <div className="mt-6 pt-6 border-t border-slate-100">
          <h3 className="text-sm font-semibold text-slate-700 mb-3">Simbología</h3>
          <div className="flex gap-4 flex-wrap">
            {Object.entries(shiftColors).map(([type, colors]) => (
              <div key={type} className="flex items-center gap-2">
                <div 
                  className="w-4 h-4 rounded"
                  style={{ backgroundColor: colors.bg, borderLeft: `3px solid ${colors.border}` }}
                />
                <span className="text-xs font-medium text-slate-600 capitalize">
                  {type === 'matutino' ? 'Turno Matutino' : 
                   type === 'vespertino' ? 'Turno Vespertino' : 
                   type === 'extra' ? 'Turno Extra' : 'Día Libre'}
                </span>
              </div>
            ))}
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
            <h2 className="text-xl font-bold text-slate-900">Asignar Turno</h2>
            <p className="text-sm text-slate-500 mt-1 capitalize">{formattedDate}</p>
          </div>
          <button 
            onClick={onClose}
            className="w-8 h-8 rounded-full flex items-center justify-center hover:bg-slate-100 transition-all"
          >
            <X size={18} className="text-slate-500" />
          </button>
        </div>

        {/* Modal Content */}
        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          {/* Person Selection */}
          <div>
            <label className="text-sm font-medium text-slate-700 mb-2 block">Persona</label>
            <div className="grid grid-cols-2 gap-2">
              {staff.map(person => (
                <button
                  key={person.id}
                  type="button"
                  onClick={() => setSelectedPerson(person.id)}
                  className={`flex items-center gap-2 p-3 rounded-xl border-2 transition-all ${
                    selectedPerson === person.id 
                      ? 'border-blue-500 bg-blue-50' 
                      : 'border-slate-200 hover:border-slate-300'
                  }`}
                >
                  <div 
                    className="w-8 h-8 rounded-full flex items-center justify-center text-white text-sm font-bold"
                    style={{ backgroundColor: person.color }}
                  >
                    {person.name[0]}
                  </div>
                  <span className="text-sm font-medium text-slate-900">{person.name}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Shift Type */}
          <div>
            <label className="text-sm font-medium text-slate-700 mb-2 block">Tipo de Turno</label>
            <div className="grid grid-cols-2 gap-2">
              {Object.entries(shiftColors).map(([type, colors]) => (
                <button
                  key={type}
                  type="button"
                  onClick={() => setSelectedType(type as Shift['type'])}
                  className={`p-3 rounded-xl border-2 transition-all ${
                    selectedType === type 
                      ? 'border-blue-500' 
                      : 'border-slate-200 hover:border-slate-300'
                  }`}
                  style={{ 
                    backgroundColor: selectedType === type ? colors.bg : 'white'
                  }}
                >
                  <span className="text-sm font-medium capitalize" style={{ color: colors.text }}>
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
            <label className="text-sm font-medium text-slate-700 mb-2 block">Notas (opcional)</label>
            <textarea
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
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
            Asignar Turno
          </button>
        </div>
      </div>
    </div>
  );
}
