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
import { LayoutDebugger } from './components/debug/LayoutDebugger';
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
    <div className="relative min-h-dvh w-full overflow-hidden">
      {/* Atmospheric Background */}
      <div className="app-background" />

      {/* App Shell */}
      <div className="relative z-10 flex h-dvh">
        {/* Adaptive Nav Rail */}
        <AdaptiveNavRail />

        {/* Main Content Area */}
        <div className="flex-1 flex flex-col min-h-dvh lg:pl-[72px]">
          {/* Top Header */}
          <TopHeader />

          {/* Page Content */}
          <main className="flex-1 px-4 sm:px-6 lg:px-8 xl:px-10 py-6 min-h-0 overflow-auto">
            {renderScreen()}
          </main>
        </div>
      </div>

      <SettingsModal />
      {/* LayoutDebugger deshabilitado - solo disponible en source para desarrollo */}
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
