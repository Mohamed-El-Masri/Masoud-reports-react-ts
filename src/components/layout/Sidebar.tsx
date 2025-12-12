import { Link, useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useUIStore } from '@stores/uiStore';
import { cn } from '@utils/helpers';
import {
  LayoutDashboard,
  FileText,
  BarChart3,
  Clock,
  ChevronLeft,
  Home,
} from 'lucide-react';

const Sidebar = () => {
  const { t } = useTranslation();
  const location = useLocation();
  const { sidebarOpen, sidebarCollapsed, toggleSidebarCollapsed, setSidebarOpen } = useUIStore();

  // Close sidebar on mobile when clicking a link
  const handleLinkClick = () => {
    if (window.innerWidth < 1024) { // lg breakpoint
      setSidebarOpen(false);
    }
  };

  const menuItems = [
    {
      title: t('nav.dashboard'),
      icon: LayoutDashboard,
      path: '/dashboard',
    },
    {
      title: t('nav.reports'),
      icon: FileText,
      path: '/reports',
      children: [
        { title: t('reports.projectProgress.title'), path: '/reports/project-progress' },
        { title: t('reports.equipmentUtilization.title'), path: '/reports/equipment-utilization' },
        { title: t('reports.fuelConsumption.title'), path: '/reports/fuel-consumption' },
        { title: t('reports.certificates.title'), path: '/reports/certificates' },
        { title: t('reports.qsSummary.title'), path: '/reports/qs-summary' },
        { title: t('reports.directCosts.title'), path: '/reports/direct-costs' },
        { title: t('reports.profitability.title'), path: '/reports/profitability' },
      ],
    },
    {
      title: t('nav.analytics'),
      icon: BarChart3,
      path: '/analytics',
    },
    {
      title: t('nav.timeline'),
      icon: Clock,
      path: '/timeline',
    },
  ];

  const isActivePath = (path: string) => location.pathname === path;
  const isParentActive = (parentPath: string) => location.pathname.startsWith(parentPath);

  return (
    <aside
      className={cn(
        'fixed top-0 bottom-0 right-0 z-30 bg-white dark:bg-gray-900',
        'border-l border-gray-200 dark:border-gray-800',
        'transition-transform duration-300 ease-in-out',
        'max-w-[85vw] sm:max-w-full',
        sidebarCollapsed ? 'w-20' : 'w-64',
        // Mobile: hide to the right when closed
        !sidebarOpen && 'translate-x-full lg:translate-x-0',
        sidebarOpen && 'translate-x-0'
      )}
    >
      {/* Logo */}
      <div className="flex h-16 items-center justify-between border-b border-gray-200 px-4 dark:border-gray-800">
        {!sidebarCollapsed && (
          <div className="flex items-center gap-2">
            <Home className="h-8 w-8 text-primary-600" />
            <div className="flex flex-col">
              <span className="text-sm font-bold text-gray-900 dark:text-white">
                {t('common.companyName')}
              </span>
              <span className="text-xs text-gray-500">التقارير</span>
            </div>
          </div>
        )}

        <button
          onClick={toggleSidebarCollapsed}
          className="hidden rounded-lg p-2 hover:bg-gray-100 dark:hover:bg-gray-800 lg:block"
        >
          <ChevronLeft
            className={cn(
              'h-5 w-5 transition-transform',
              sidebarCollapsed && 'rotate-180'
            )}
          />
        </button>
      </div>

      {/* Navigation */}
      <nav className="custom-scrollbar mt-4 h-[calc(100vh-5rem)] overflow-y-auto px-3">
        <ul className="space-y-1">
          {menuItems.map((item, index) => {
            const Icon = item.icon;
            const isActive = isActivePath(item.path);
            const hasChildren = item.children && item.children.length > 0;
            const parentActive = hasChildren && isParentActive(item.path);

            return (
              <li key={index}>
                {/* Parent Item */}
                {hasChildren ? (
                  <div
                    className={cn(
                      'flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors cursor-pointer',
                      parentActive
                        ? 'bg-primary-50 text-primary-700 dark:bg-primary-900/20 dark:text-primary-400'
                        : 'text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-800'
                    )}
                    title={sidebarCollapsed ? item.title : undefined}
                  >
                    <Icon className="h-5 w-5 shrink-0" />
                    {!sidebarCollapsed && <span>{item.title}</span>}
                  </div>
                ) : (
                  <Link
                    to={item.path}
                    onClick={handleLinkClick}
                    className={cn(
                      'flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors',
                      isActive
                        ? 'bg-primary-50 text-primary-700 dark:bg-primary-900/20 dark:text-primary-400'
                        : 'text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-800'
                    )}
                    title={sidebarCollapsed ? item.title : undefined}
                  >
                    <Icon className="h-5 w-5 shrink-0" />
                    {!sidebarCollapsed && <span>{item.title}</span>}
                  </Link>
                )}

                {/* Children */}
                {hasChildren && !sidebarCollapsed && (
                  <ul className="ms-3 mt-1 space-y-1 border-s-2 border-primary-200 ps-3 dark:border-primary-800">
                    {item.children!.map((child, childIndex) => (
                      <li key={childIndex}>
                        <Link
                          to={child.path}
                          onClick={handleLinkClick}
                          className={cn(
                            'block rounded-lg px-3 py-2 text-xs transition-colors',
                            isActivePath(child.path)
                              ? 'bg-primary-50 font-medium text-primary-700 dark:bg-primary-900/20 dark:text-primary-400'
                              : 'text-gray-600 hover:bg-gray-50 dark:text-gray-400 dark:hover:bg-gray-800/50'
                          )}
                        >
                          {child.title}
                        </Link>
                      </li>
                    ))}
                  </ul>
                )}
              </li>
            );
          })}
        </ul>
      </nav>
    </aside>
  );
};

export default Sidebar;
