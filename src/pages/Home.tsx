import PendingTasks from '../components/widgets/PendingTasks';
import QuickAccess from '../components/widgets/QuickAccess';
import WorkTypes from '../components/widgets/WorkTypes';
import { MusicWidget } from '../components/widgets/MusicWidget';
import { Timeline } from '../components/Timeline';
import { RecentOrders } from '../components/RecentOrders';

export function Home() {
  const today = new Date();
  const days = ['Domingo', 'Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado'];
  const months = ['enero', 'febrero', 'marzo', 'abril', 'mayo', 'junio', 'julio', 'agosto', 'septiembre', 'octubre', 'noviembre', 'diciembre'];
  const dateStr = `${days[today.getDay()]}, ${today.getDate()} de ${months[today.getMonth()]}`;

  return (
    <div 
      className="mx-auto h-full flex flex-col"
      style={{ 
        maxWidth: 'clamp(1200px, 90vw, 1800px)',
        paddingBottom: 'clamp(16px, 3vh, 32px)',
      }}
    >
      {/* Context Area: Greeting */}
      <div 
        className="shrink-0 relative"
        style={{ 
          marginBottom: 'clamp(12px, 2vh, 20px)',
        }}
      >
        <div>
          <p className="text-[12px] font-medium mb-0.5" style={{ color: '#7B8BA5' }}>
            {dateStr}
          </p>
          <h1 className="text-[24px] sm:text-[26px] lg:text-[28px] font-bold tracking-tight leading-tight" style={{ color: '#111A35' }}>
            Hola, Josy!
          </h1>
          <p className="text-[12px] mt-0.5" style={{ color: '#3D4F6F' }}>
            Centro operativo del laboratorio
          </p>
        </div>
      </div>

      {/* Top Widgets Row */}
      <div
        className="grid grid-cols-1 lg:grid-cols-4 shrink-0"
        style={{
          gap: 'clamp(12px, 2vh, 20px)',
          marginBottom: 'clamp(12px, 2vh, 20px)',
        }}
      >
        {/* Task List */}
        <div className="min-w-0" style={{ height: '280px' }}>
          <PendingTasks />
        </div>

        {/* Quick Access */}
        <div className="min-w-0" style={{ height: '280px' }}>
          <QuickAccess />
        </div>

        {/* Work Types */}
        <div className="min-w-0" style={{ height: '280px' }}>
          <WorkTypes />
        </div>

        {/* Music Widget */}
        <div className="min-w-0" style={{ height: '280px' }}>
          <MusicWidget />
        </div>
      </div>

      {/* Main Content: Timeline + Recent Orders */}
      <div
        className="grid grid-cols-1 lg:grid-cols-12 flex-1 min-h-0"
        style={{
          gap: 'clamp(12px, 2vh, 20px)',
        }}
      >
        {/* Timeline (8 columns) */}
        <div className="lg:col-span-8 min-w-0 min-h-0">
          <Timeline />
        </div>

        {/* Recent Orders (4 columns) */}
        <div className="lg:col-span-4 min-w-0 min-h-0">
          <RecentOrders />
        </div>
      </div>
    </div>
  );
}
