import { useQuery, UseQueryOptions } from '@tanstack/react-query';
import { DashboardData, ReportFilter } from '@/types/models';
import { mockDashboardData } from '@/data/mockDashboardData';

// Hook to get dashboard data
export const useDashboard = (filters?: ReportFilter, options?: UseQueryOptions<DashboardData>) => {
  return useQuery({
    queryKey: ['dashboard', filters],
    queryFn: async () => {
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 500));
      return mockDashboardData;
    },
    staleTime: 2 * 60 * 1000, // 2 minutes
    ...options,
  });
};

// Hook to get KPIs
export const useKPIs = (filters?: ReportFilter) => {
  return useQuery({
    queryKey: ['kpis', filters],
    queryFn: async () => {
      await new Promise(resolve => setTimeout(resolve, 300));
      return mockDashboardData.kpis;
    },
    staleTime: 1 * 60 * 1000, // 1 minute
  });
};
