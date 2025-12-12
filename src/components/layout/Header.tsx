import { useTranslation } from 'react-i18next';
import { useAuthStore } from '@stores/authStore';
import { useUIStore } from '@stores/uiStore';
import { Menu, Moon, Sun, LogOut, RefreshCw } from 'lucide-react';

const Header = () => {
  const { t } = useTranslation();
  const user = useAuthStore(state => state.user);
  const logout = useAuthStore(state => state.logout);
  const { theme, toggleTheme, toggleSidebar } = useUIStore();

  return (
    <header className="sticky top-0 z-10 border-b border-gray-200 bg-white dark:border-gray-800 dark:bg-gray-900">
      <div className="flex h-14 sm:h-16 items-center justify-between px-3 sm:px-4 md:px-6">
        {/* Right Side */}
        <div className="flex items-center gap-3">
          {/* Mobile Menu Toggle */}
          <button
            onClick={toggleSidebar}
            className="rounded-lg p-2 hover:bg-gray-100 dark:hover:bg-gray-800 lg:hidden"
          >
            <Menu className="h-5 w-5" />
          </button>

          {/* Page Title will be here or breadcrumb */}
          <div>
            <h1 className="text-lg font-semibold text-gray-900 dark:text-white">
              {t('common.appName')}
            </h1>
          </div>
        </div>

        {/* Left Side */}
        <div className="flex items-center gap-2">
          {/* Refresh */}
          <button
            onClick={() => window.location.reload()}
            className="rounded-lg p-2 hover:bg-gray-100 dark:hover:bg-gray-800"
            title={t('common.refresh')}
          >
            <RefreshCw className="h-5 w-5" />
          </button>

          {/* Theme Toggle */}
          <button
            onClick={toggleTheme}
            className="rounded-lg p-2 hover:bg-gray-100 dark:hover:bg-gray-800"
            title={theme === 'light' ? 'الوضع الداكن' : 'الوضع النهاري'}
          >
            {theme === 'light' ? <Moon className="h-5 w-5" /> : <Sun className="h-5 w-5" />}
          </button>

          {/* User Info */}
          {user && (
            <div className="hidden items-center gap-2 rounded-lg bg-gray-100 px-3 py-2 dark:bg-gray-800 md:flex">
              <div className="h-8 w-8 rounded-full bg-primary-600 text-white flex items-center justify-center text-sm font-medium">
                {user.name.charAt(0)}
              </div>
              <div className="text-right">
                <p className="text-sm font-medium text-gray-900 dark:text-white">{user.name}</p>
                <p className="text-xs text-gray-500 dark:text-gray-400">{user.role}</p>
              </div>
            </div>
          )}

          {/* Logout */}
          <button
            onClick={logout}
            className="rounded-lg p-2 text-error-600 hover:bg-error-50 dark:hover:bg-error-900/20"
            title={t('nav.logout')}
          >
            <LogOut className="h-5 w-5" />
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;
