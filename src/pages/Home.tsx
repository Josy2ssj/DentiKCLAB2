import PendingTasks from '../components/widgets/PendingTasks';
import QuickAccess from '../components/widgets/QuickAccess';
import WorkTypes from '../components/widgets/WorkTypes';
import { MusicWidget } from '../components/widgets/MusicWidget';
import { Timeline } from '../components/Timeline';
import { RecentOrders } from '../components/RecentOrders';

export function Home() {
  return (
    <div 
      className="mx-auto h-full flex flex-col"
      style={{ 
        maxWidth: '100%',
        paddingBottom: 'clamp(12px, 2vh, 24px)',
      }}
    >
      {/* Top Widgets Row - 4 compact widgets */}
      <div
        className="grid grid-cols-1 lg:grid-cols-4 shrink-0"
        style={{
          gap: 'clamp(10px, 1.5vh, 16px)',
          marginBottom: 'clamp(16px, 2.5vh, 24px)',
        }}
      >
        {/* Task List */}
        <div className="min-w-0">
          <PendingTasks />
        </div>

        {/* Quick Access */}
        <div className="min-w-0">
          <QuickAccess />
        </div>

        {/* Work Types */}
        <div className="min-w-0">
          <WorkTypes />
        </div>

        {/* Music Widget */}
        <div className="min-w-0">
          <MusicWidget />
        </div>
      </div>

      {/* Main Content: Timeline + Recent Orders */}
      <div
        className="grid grid-cols-1 lg:grid-cols-12 flex-1 min-h-0"
        style={{
          gap: 'clamp(10px, 1.5vh, 16px)',
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
