import { useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const staff = [
  { id: 'josy', name: 'Josy', color: '#3B82F6' },
  { id: 'yael', name: 'Yael', color: '#10B981' }
];

export function ScheduleScreen() {
  const [currentDate, setCurrentDate] = useState(new Date());

  const weekStart = new Date(currentDate);
  weekStart.setDate(currentDate.getDate() - currentDate.getDay());

  const weekDays = Array.from({ length: 7 }, (_, i) => {
    const date = new Date(weekStart);
    date.setDate(weekStart.getDate() + i);
    return date;
  });

  const days = ['Dom', 'Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb'];

  return (
    <div className="max-w-[1600px] mx-auto">
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-slate-900">Horario</h1>
        <p className="text-sm text-slate-600 mt-1">Gestiona los turnos del equipo.</p>
      </div>

      <div
        className="bg-white/90 backdrop-blur-sm rounded-2xl p-6 shadow-sm"
        data-workspace="schedule-panel"
      >
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-2">
            <button
              onClick={() => {
                const d = new Date(currentDate);
                d.setDate(d.getDate() - 7);
                setCurrentDate(d);
              }}
              className="p-2 hover:bg-slate-100 rounded-lg"
            >
              <ChevronLeft size={20} />
            </button>
            <button
              onClick={() => {
                const d = new Date(currentDate);
                d.setDate(d.getDate() + 7);
                setCurrentDate(d);
              }}
              className="p-2 hover:bg-slate-100 rounded-lg"
            >
              <ChevronRight size={20} />
            </button>
            <h2 className="text-lg font-bold ml-2">
              {weekStart.toLocaleDateString('es-ES', { month: 'long', year: 'numeric' })}
            </h2>
          </div>
          <button
            onClick={() => setCurrentDate(new Date())}
            className="px-4 py-2 bg-slate-100 rounded-lg text-sm font-medium hover:bg-slate-200"
          >
            Hoy
          </button>
        </div>

        <div className="grid grid-cols-8 gap-2">
          <div></div>
          {weekDays.map((date, i) => (
            <div key={i} className="text-center py-2">
              <p className="text-xs text-slate-500">{days[i]}</p>
              <p className="text-lg font-bold">{date.getDate()}</p>
            </div>
          ))}

          {staff.map(person => (
            <>
              <div key={person.id} className="flex items-center gap-2 py-4">
                <div
                  className="w-8 h-8 rounded-full flex items-center justify-center text-white text-sm font-bold"
                  style={{ backgroundColor: person.color }}
                >
                  {person.name[0]}
                </div>
                <span className="text-sm font-semibold">{person.name}</span>
              </div>
              {weekDays.map((date, i) => {
                const isWeekend = i === 0 || i === 6;
                const shift = person.id === 'josy' ? 'matutino' : 'vespertino';
                
                return (
                  <button
                    key={`${person.id}-${i}`}
                    disabled={isWeekend}
                    className={`py-4 rounded-lg text-xs font-semibold transition-all ${
                      isWeekend
                        ? 'bg-slate-50 text-slate-300 cursor-not-allowed'
                        : 'hover:scale-105'
                    }`}
                    style={{
                      backgroundColor: isWeekend ? undefined : `${person.color}20`,
                      color: isWeekend ? undefined : person.color
                    }}
                  >
                    {isWeekend ? '—' : shift === 'matutino' ? 'Mat' : 'Ves'}
                  </button>
                );
              })}
            </>
          ))}
        </div>
      </div>
    </div>
  );
}
