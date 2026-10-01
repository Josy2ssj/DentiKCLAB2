import { NavigationProvider } from './contexts/NavigationContext';
import { DataProvider } from './contexts/DataContext';
import { WorkspaceFrameProvider } from './contexts/WorkspaceFrameContext';
import { AdaptiveNavRail } from './components/AdaptiveNavRail';
import { TopHeader } from './components/TopHeader';
import { Home } from './pages/Home';
import { OrdersScreen } from './pages/OrdersScreen';
import { ScheduleScreen } from './pages/ScheduleScreen';
import { InventoryScreen } from './pages/InventoryScreen';
import { Capture3DScreen } from './pages/Capture3DScreen';
import { SettingsModal } from './components/SettingsModal';
import { LayoutDebugger } from './components/debug/LayoutDebugger';
import { useNavigation } from './contexts/NavigationContext';

function AppContent() {
  const { activeSection } = useNavigation();

  const renderScreen = () => {
    switch (activeSection) {
      case 'home':
        return <Home />;
      case 'orders':
        return <OrdersScreen />;
      case 'schedule':
        return <ScheduleScreen />;
      case 'inventory':
        return <InventoryScreen />;
      case 'capture3d':
        return <Capture3DScreen />;
      default:
        return <Home />;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      <AdaptiveNavRail />
      <div className="lg:pl-20">
        <TopHeader />
        <main className="p-6">
          {renderScreen()}
        </main>
      </div>
      <SettingsModal />
      <LayoutDebugger />
    </div>
  );
}

export default function App() {
  return (
    <NavigationProvider>
      <DataProvider>
        <WorkspaceFrameProvider>
          <AppContent />
        </WorkspaceFrameProvider>
      </DataProvider>
    </NavigationProvider>
  );
}
