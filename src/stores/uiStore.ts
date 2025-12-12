import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface UIState {
  // Theme
  theme: 'light' | 'dark';
  
  // Language
  language: 'ar' | 'en';
  
  // Sidebar
  sidebarOpen: boolean;
  sidebarCollapsed: boolean;
  
  // Filters
  savedFilters: Record<string, any>;
  
  // Actions
  setTheme: (theme: 'light' | 'dark') => void;
  toggleTheme: () => void;
  setLanguage: (language: 'ar' | 'en') => void;
  setSidebarOpen: (open: boolean) => void;
  toggleSidebar: () => void;
  setSidebarCollapsed: (collapsed: boolean) => void;
  toggleSidebarCollapsed: () => void;
  saveFilter: (key: string, filter: any) => void;
  getFilter: (key: string) => any;
  clearFilter: (key: string) => void;
}

export const useUIStore = create<UIState>()(
  persist(
    (set, get) => ({
      theme: 'light',
      language: 'ar',
      sidebarOpen: true,
      sidebarCollapsed: false,
      savedFilters: {},

      setTheme: (theme) => {
        document.documentElement.classList.toggle('dark', theme === 'dark');
        set({ theme });
      },

      toggleTheme: () => {
        const newTheme = get().theme === 'light' ? 'dark' : 'light';
        document.documentElement.classList.toggle('dark', newTheme === 'dark');
        set({ theme: newTheme });
      },

      setLanguage: (language) => set({ language }),

      setSidebarOpen: (open) => set({ sidebarOpen: open }),

      toggleSidebar: () => set((state) => ({ sidebarOpen: !state.sidebarOpen })),

      setSidebarCollapsed: (collapsed) => set({ sidebarCollapsed: collapsed }),

      toggleSidebarCollapsed: () =>
        set((state) => ({ sidebarCollapsed: !state.sidebarCollapsed })),

      saveFilter: (key, filter) =>
        set((state) => ({
          savedFilters: {
            ...state.savedFilters,
            [key]: filter,
          },
        })),

      getFilter: (key) => get().savedFilters[key],

      clearFilter: (key) =>
        set((state) => {
          const { [key]: _, ...rest } = state.savedFilters;
          return { savedFilters: rest };
        }),
    }),
    {
      name: 'ui-storage',
    }
  )
);
