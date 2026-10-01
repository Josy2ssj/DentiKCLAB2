import PatientList from '../components/widgets/PatientList';
import PendingTasks from '../components/widgets/PendingTasks';
import SmartStack from '../components/widgets/SmartStack';
import WorkTypes from '../components/widgets/WorkTypes';
import QuickAccess from '../components/widgets/QuickAccess';
import OrderStatusNotch from '../components/OrderStatusNotch';
import StatusWidgetStack from '../components/StatusWidgetStack';

export function Home() {
  const today = new Date();
  const days = ['Domingo', 'Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado'];
  const months = ['enero', 'febrero', 'marzo', 'abril', 'mayo', 'junio', 'julio', 'agosto', 'septiembre', 'octubre', 'noviembre', 'diciembre'];
  const dateStr = `${days[today.getDay()]}, ${today.getDate()} de ${months[today.getMonth()]}`;

  return (
    <div className="max-w-[1600px] mx-auto h-full flex flex-col">
      {/* Context Area: Greeting + Notches */}
      <div className="grid gap-3 sm:gap-4 grid-cols-1 lg:grid-cols-12 shrink-0 relative mb-4 lg:mb-5" style={{ isolation: 'isolate' }}>
        {/* LEFT: Greeting only */}
        <div className="lg:col-span-4 min-w-0">
          <div className="shrink-0">
            <p className="text-[12px] font-medium mb-0.5" style={{ color: '#7B8BA5' }}>
              {dateStr}
            </p>
            <h1 className="text-[24px] sm:text-[26px] lg:text-[28px] font-bold tracking-tight leading-tight" style={{ color: '#111A35' }}>
              Hola, Josy!
            </h1>
            <p className="text-[12px] mt-0.5" style={{ color: '#3D4F6F' }}>
              Aquí tienes un resumen general de tu laboratorio.
            </p>
          </div>
        </div>

        {/* CENTER: Pending Orders Notch (backplate only) */}
        <div className="lg:col-span-4 min-w-0 min-h-0 relative" style={{ zIndex: 0 }}>
          <OrderStatusNotch type="pending" compact />
        </div>

        {/* RIGHT: Weekly Delivered Notch (backplate only) */}
        <div className="lg:col-span-4 min-w-0 min-h-0 relative" style={{ zIndex: 0 }}>
          <OrderStatusNotch type="weekly-delivered" compact />
        </div>
      </div>

      {/* Workspace Frame: White Surfaces */}
      <div
        className="grid gap-3 sm:gap-4 grid-cols-1 lg:grid-cols-12 flex-1 min-h-0 relative"
        style={{
          gridTemplateRows: 'minmax(0, 1fr) minmax(0, 1fr)',
          zIndex: 1,
        }}
      >
        {/* LEFT: Patient List (full height) */}
        <div className="lg:col-span-4 lg:row-span-2 min-w-0 flex flex-col">
          <PatientList />
        </div>

        {/* CENTER TOP: Task List */}
        <div className="lg:col-span-4 min-w-0 min-h-0">
          <PendingTasks />
        </div>

        {/* RIGHT TOP: Smart Stack */}
        <div className="lg:col-span-4 min-w-0 min-h-0">
          <SmartStack />
        </div>

        {/* CENTER BOTTOM: Work Types */}
        <div className="lg:col-span-4 min-w-0 min-h-0">
          <WorkTypes />
        </div>

        {/* RIGHT BOTTOM: Quick Access */}
        <div className="lg:col-span-4 min-w-0 min-h-0">
          <QuickAccess />
        </div>
      </div>
    </div>
  );
}
