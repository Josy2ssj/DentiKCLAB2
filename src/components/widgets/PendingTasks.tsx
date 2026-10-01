import { FileText, Plus } from 'lucide-react';
import { useData } from '../../contexts/DataContext';

export default function PendingTasks() {
  const { tasks, toggleTask } = useData();
  const completedCount = tasks.filter(t => t.done).length;
  const totalCount = tasks.length;

  return (
    <div
      className="h-full flex flex-col"
      style={{
        background: 'rgba(255, 255, 255, 0.94)',
        borderRadius: '24px',
        backdropFilter: 'blur(8px)',
        boxShadow: '0 8px 32px rgba(17, 26, 53, 0.06), inset 0 1px 0 rgba(255, 255, 255, 0.9)',
        padding: 'clamp(12px, 2vh, 20px)',
      }}
    >
      {/* Header */}
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2">
          <div
            className="w-6 h-6 rounded-lg flex items-center justify-center"
            style={{ background: 'rgba(40, 120, 255, 0.1)' }}
          >
            <FileText size={12} style={{ color: '#2878FF' }} />
          </div>
          <div>
            <p className="text-[11px] font-semibold" style={{ color: '#111A35' }}>
              Lista de tareas
            </p>
            <p className="text-[9px]" style={{ color: '#7B8BA5' }}>
              Tus pendientes de hoy · {completedCount}/{totalCount}
            </p>
          </div>
        </div>
        <button
          className="w-6 h-6 rounded-full flex items-center justify-center"
          style={{
            background: 'linear-gradient(135deg, #2878FF 0%, #1D65E0 100%)',
            boxShadow: '0 2px 6px rgba(40, 120, 255, 0.25)',
            transition: 'all 150ms cubic-bezier(0.22, 1, 0.36, 1)',
          }}
          aria-label="Agregar tarea"
          onMouseEnter={(e) => {
            e.currentTarget.style.transform = 'scale(1.08)';
            e.currentTarget.style.boxShadow = '0 3px 8px rgba(40, 120, 255, 0.35)';
            const icon = e.currentTarget.querySelector('svg');
            if (icon) icon.style.transform = 'rotate(8deg)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform = 'scale(1)';
            e.currentTarget.style.boxShadow = '0 2px 6px rgba(40, 120, 255, 0.25)';
            const icon = e.currentTarget.querySelector('svg');
            if (icon) icon.style.transform = 'rotate(0deg)';
          }}
          onMouseDown={(e) => {
            e.currentTarget.style.transform = 'scale(0.93)';
          }}
          onMouseUp={(e) => {
            e.currentTarget.style.transform = 'scale(1.08)';
          }}
        >
          <Plus size={12} style={{ color: '#FFFFFF', transition: 'transform 150ms cubic-bezier(0.22, 1, 0.36, 1)' }} />
        </button>
      </div>

      {/* Task List */}
      <div className="flex-1 flex flex-col gap-1 overflow-y-auto">
        {tasks.map((task) => (
          <button
            key={task.id}
            onClick={() => toggleTask(task.id)}
            className="flex items-center gap-2 px-2 py-1.5 rounded-lg text-left w-full group"
            style={{ transition: 'all 160ms cubic-bezier(0.22, 1, 0.36, 1)' }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = '#F8FAFC';
              const timePill = e.currentTarget.querySelector('.task-time');
              if (timePill) (timePill as HTMLElement).style.background = '#E2E8F0';
              const colorBar = e.currentTarget.querySelector('.task-color-bar');
              if (colorBar) (colorBar as HTMLElement).style.opacity = '0.9';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = 'transparent';
              const timePill = e.currentTarget.querySelector('.task-time');
              if (timePill) (timePill as HTMLElement).style.background = '#F1F5F9';
              const colorBar = e.currentTarget.querySelector('.task-color-bar');
              if (colorBar) (colorBar as HTMLElement).style.opacity = '0.6';
            }}
            onMouseDown={(e) => {
              e.currentTarget.style.transform = 'scale(0.99)';
            }}
            onMouseUp={(e) => {
              e.currentTarget.style.transform = 'scale(1)';
            }}
          >
            {/* Checkbox */}
            <div className="shrink-0" style={{ transition: 'all 200ms cubic-bezier(0.22, 1, 0.36, 1)' }}>
              {task.done ? (
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" className="animate-fadeIn">
                  <circle cx="12" cy="12" r="10" fill={task.color} />
                  <path d="M8 12l2.5 2.5L16 9" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ animation: 'checkmark 300ms cubic-bezier(0.22, 1, 0.36, 1)' }} />
                </svg>
              ) : (
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
                  <circle cx="12" cy="12" r="9" stroke="#CBD5E1" strokeWidth="2" />
                </svg>
              )}
            </div>

            {/* Task Info */}
            <div className="flex-1 min-w-0">
              <p
                className="text-[11.5px] font-medium truncate"
                style={{
                  color: task.done ? '#7B8BA5' : '#111A35',
                  textDecoration: task.done ? 'line-through' : 'none',
                  transition: 'all 200ms cubic-bezier(0.22, 1, 0.36, 1)',
                }}
              >
                {task.title}
              </p>
              <p className="text-[9.5px]" style={{ color: '#7B8BA5', transition: 'all 200ms cubic-bezier(0.22, 1, 0.36, 1)' }}>
                {task.subtitle}
              </p>
            </div>

            {/* Time */}
            <span
              className="text-[9.5px] font-semibold px-1.5 py-0.5 rounded shrink-0 task-time"
              style={{ background: '#F1F5F9', color: '#3D4F6F', transition: 'background 160ms cubic-bezier(0.22, 1, 0.36, 1)' }}
            >
              {task.time}
            </span>

            {/* Color indicator */}
            <div
              className="w-0.5 h-4 rounded-full shrink-0 task-color-bar"
              style={{ background: task.color, opacity: 0.6, transition: 'opacity 160ms cubic-bezier(0.22, 1, 0.36, 1)' }}
            />
          </button>
        ))}
      </div>
    </div>
  );
}
