import { NavigationProvider } from './contexts/NavigationContext';
import { DataProvider } from './contexts/DataContext';
import { WorkspaceFrameProvider } from './contexts/WorkspaceFrameContext';
import { AdaptiveNavRail } from './components/AdaptiveNavRail';
import { TopHeader } from './components/TopHeader';
import { Home } from './pages/Home';
import { OrdersScreen } from './components/screens/OrdersScreen';
import { ScheduleScreen } from './components/screens/ScheduleScreen';
import { InventoryScreen } from './components/screens/InventoryScreen';
import { Capture3DScreen } from './components/screens/Capture3DScreen';
import { SettingsModal } from './components/shared/SettingsModal';
import { useNavigation } from './contexts/NavigationContext';

function AppContent() {
  const { activeSection } = useNavigation();

  const renderScreen = () => {
    switch (activeSection) {
      case 'home':
        return <Home />;
      case 'ordenes':
        return <OrdersScreen />;
      case 'horario':
        return <ScheduleScreen />;
      case 'inventario':
        return <InventoryScreen />;
      case 'captura3d':
        return <Capture3DScreen />;
      default:
        return <Home />;
    }
  };

  return (
    <div className="relative w-full h-dvh overflow-hidden">
      {/* Atmospheric Background */}
      <div className="app-background" />

      {/* App Shell */}
      <div className="relative z-10 flex h-dvh">
        {/* Adaptive Nav Rail */}
        <AdaptiveNavRail />

        {/* Main Content Area */}
        <div className="flex-1 flex flex-col h-dvh lg:pl-[72px] overflow-hidden">
          {/* Top Header */}
          <TopHeader />

          {/* Page Content - Scrollable */}
          <main className="flex-1 min-h-0 overflow-y-auto overflow-x-hidden">
            <div className="px-4 sm:px-6 lg:px-8 xl:px-10 py-6 min-h-full">
              {renderScreen()}
            </div>
          </main>
        </div>
      </div>

      <SettingsModal />
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
