import { useData } from '../contexts/DataContext';
import { FileText, CheckCircle2, ChevronRight, Clock, AlertCircle } from 'lucide-react';

export function Home() {
  const { orders, tasks } = useData();
  
  const pendingCount = orders.filter(o => o.status === 'pending').length;
  const deliveredThisWeek = orders.filter(o => o.status === 'delivered').length;

  return (
    <div className="max-w-[1600px] mx-auto">
      {/* Greeting */}
      <div className="mb-6">
        <p className="text-sm text-slate-500 mb-1">Martes, 29 de septiembre</p>
        <h1 className="text-3xl font-bold text-slate-900">Hola, Josy!</h1>
        <p className="text-sm text-slate-600 mt-1">Aquí tienes un resumen general de tu laboratorio.</p>
      </div>

      {/* Main Grid */}
      <div className="grid grid-cols-12 gap-4" style={{ minHeight: 'calc(100vh - 250px)' }}>
        {/* LEFT: Patient List */}
        <div className="col-span-4 bg-white/90 backdrop-blur-sm rounded-2xl p-4 shadow-sm" data-workspace="patient-list">
          <h2 className="font-bold text-lg mb-4">Pacientes</h2>
          <div className="space-y-2">
            {['María González', 'Juan Pérez', 'Ana López', 'Carlos Ruiz'].map((name, i) => (
              <div key={i} className="flex items-center gap-3 p-2 hover:bg-slate-50 rounded-lg cursor-pointer">
                <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center text-blue-600 font-semibold">
                  {name[0]}
                </div>
                <div className="flex-1">
                  <p className="font-medium text-sm">{name}</p>
                  <p className="text-xs text-slate-500">3 órdenes</p>
                </div>
                <ChevronRight size={16} className="text-slate-400" />
              </div>
            ))}
          </div>
        </div>

        {/* CENTER: Pending Tasks */}
        <div className="col-span-4 flex flex-col gap-4">
          {/* Notch amarillo - absolutely positioned */}
          <div className="relative" style={{ height: '76px', overflow: 'visible', zIndex: 0 }}>
            <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: '100px' }}>
              <div
                className="bg-gradient-to-br from-yellow-300 to-orange-400 rounded-t-2xl p-4 shadow-lg"
                style={{ height: '100px' }}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 bg-white/30 rounded-lg flex items-center justify-center">
                      <FileText size={16} className="text-orange-900" />
                    </div>
                    <span className="font-bold text-orange-900">Pendientes</span>
                    <span className="text-2xl font-extrabold text-orange-900">{pendingCount}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Clock size={12} className="text-orange-900" />
                    <span className="text-xs text-orange-900">Hoy</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Task List Widget */}
          <div className="bg-white/95 backdrop-blur-sm rounded-2xl p-4 shadow-sm flex-1" data-workspace="task-list">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2">
                <div className="w-6 h-6 bg-blue-100 rounded-lg flex items-center justify-center">
                  <FileText size={12} className="text-blue-600" />
                </div>
                <div>
                  <p className="font-semibold text-sm">Lista de tareas</p>
                  <p className="text-xs text-slate-500">Tus pendientes de hoy</p>
                </div>
              </div>
            </div>
            <div className="space-y-2">
              {tasks.slice(0, 4).map(task => (
                <div key={task.id} className="flex items-center gap-2 p-2 hover:bg-slate-50 rounded-lg">
                  <CheckCircle2 size={16} style={{ color: task.color }} />
                  <div className="flex-1">
                    <p className="text-sm font-medium">{task.title}</p>
                    <p className="text-xs text-slate-500">{task.subtitle}</p>
                  </div>
                  <span className="text-xs bg-slate-100 px-2 py-1 rounded">{task.time}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* RIGHT: Smart Stack */}
        <div className="col-span-4 flex flex-col gap-4">
          {/* Notch verde - absolutely positioned */}
          <div className="relative" style={{ height: '76px', overflow: 'visible', zIndex: 0 }}>
            <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: '100px' }}>
              <div
                className="bg-gradient-to-br from-emerald-300 to-teal-500 rounded-t-2xl p-4 shadow-lg"
                style={{ height: '100px' }}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 bg-white/30 rounded-lg flex items-center justify-center">
                      <CheckCircle2 size={16} className="text-emerald-900" />
                    </div>
                    <span className="font-bold text-emerald-900">Entregadas esta semana</span>
                    <span className="text-2xl font-extrabold text-emerald-900">{deliveredThisWeek}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Smart Stack Widget */}
          <div className="bg-white/95 backdrop-blur-sm rounded-2xl p-4 shadow-sm flex-1" data-workspace="smart-stack">
            <div className="flex items-center justify-between mb-3">
              <h3 className="font-semibold text-sm">Centro de control</h3>
              <div className="flex gap-1">
                <button className="w-6 h-6 bg-emerald-100 rounded flex items-center justify-center">
                  <FileText size={12} className="text-emerald-700" />
                </button>
              </div>
            </div>
            <div className="bg-slate-50 rounded-lg p-3">
              <p className="text-xs text-slate-600 mb-2">Nota rápida</p>
              <textarea
                placeholder="Escribe aquí tu nota..."
                className="w-full bg-white rounded p-2 text-sm border-0 focus:ring-2 focus:ring-blue-500"
                rows={3}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
