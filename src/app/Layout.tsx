import { Outlet } from 'react-router-dom';
import Sidebar from '@components/layout/Sidebar';
import Header from '@components/layout/Header';
import { useUIStore } from '@stores/uiStore';
import { cn } from '@utils/helpers';

const Layout = () => {
  const { sidebarOpen, sidebarCollapsed } = useUIStore();

  return (
    <div className="flex min-h-screen bg-gray-50 dark:bg-gray-950 overflow-x-hidden" dir="rtl">
      {/* Sidebar */}
      <Sidebar />

      {/* Main Content Area */}
      <div className={cn(
        "flex flex-1 flex-col min-h-screen transition-all duration-300 w-full",
        "lg:ms-64",
        sidebarCollapsed && "lg:ms-20"
      )}>
        {/* Header */}
        <Header />

        {/* Page Content */}
        <main className="flex-1 overflow-x-hidden overflow-y-auto bg-gray-50 dark:bg-gray-950">
          <Outlet />
        </main>
      </div>

      {/* Overlay for mobile */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 z-20 bg-black/50 lg:hidden"
          onClick={() => useUIStore.getState().setSidebarOpen(false)}
        />
      )}
    </div>
  );
};

export default Layout;
