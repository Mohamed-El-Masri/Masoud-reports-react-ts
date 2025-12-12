import { useQuery, UseQueryOptions } from '@tanstack/react-query';
import { api } from '@services/api';
import { ReportData, ReportFilter } from '@/types/models';

// Hook for Project Progress Report
export const useProjectProgressReport = (
  filters: ReportFilter,
  options?: UseQueryOptions<ReportData>
) => {
  return useQuery({
    queryKey: ['report', 'project-progress', filters],
    queryFn: () => api.reports.getProjectProgressReport(filters),
    enabled: !!filters.dateFrom || !!filters.projectId,
    ...options,
  });
};

// Hook for Equipment Utilization Report
export const useEquipmentUtilizationReport = (
  filters: ReportFilter,
  options?: UseQueryOptions<ReportData>
) => {
  return useQuery({
    queryKey: ['report', 'equipment-utilization', filters],
    queryFn: () => api.reports.getEquipmentUtilizationReport(filters),
    ...options,
  });
};

// Hook for Fuel Consumption Report
export const useFuelConsumptionReport = (
  filters: ReportFilter,
  options?: UseQueryOptions<ReportData>
) => {
  return useQuery({
    queryKey: ['report', 'fuel-consumption', filters],
    queryFn: () => api.reports.getFuelConsumptionReport(filters),
    ...options,
  });
};

// Hook for Certificates Report
export const useCertificatesReport = (
  filters: ReportFilter,
  options?: UseQueryOptions<ReportData>
) => {
  return useQuery({
    queryKey: ['report', 'certificates', filters],
    queryFn: () => api.reports.getCertificatesReport(filters),
    ...options,
  });
};

// Hook for QS Summary Report
export const useQSSummaryReport = (
  filters: ReportFilter,
  options?: UseQueryOptions<ReportData>
) => {
  return useQuery({
    queryKey: ['report', 'qs-summary', filters],
    queryFn: () => api.reports.getQSSummaryReport(filters),
    ...options,
  });
};

// Hook for Direct Costs Report
export const useDirectCostsReport = (
  filters: ReportFilter,
  options?: UseQueryOptions<ReportData>
) => {
  return useQuery({
    queryKey: ['report', 'direct-costs', filters],
    queryFn: () => api.reports.getDirectCostsReport(filters),
    ...options,
  });
};

// Hook for Profitability Report
export const useProfitabilityReport = (
  filters: ReportFilter,
  options?: UseQueryOptions<ReportData>
) => {
  return useQuery({
    queryKey: ['report', 'profitability', filters],
    queryFn: () => api.reports.getProfitabilityReport(filters),
    ...options,
  });
};

// Generic hook for any report
export const useReport = (
  reportType: string,
  filters: ReportFilter,
  options?: UseQueryOptions<ReportData>
) => {
  return useQuery({
    queryKey: ['report', reportType, filters],
    queryFn: () => {
      switch (reportType) {
        case 'project-progress':
          return api.reports.getProjectProgressReport(filters);
        case 'equipment-utilization':
          return api.reports.getEquipmentUtilizationReport(filters);
        case 'fuel-consumption':
          return api.reports.getFuelConsumptionReport(filters);
        case 'certificates':
          return api.reports.getCertificatesReport(filters);
        case 'qs-summary':
          return api.reports.getQSSummaryReport(filters);
        case 'direct-costs':
          return api.reports.getDirectCostsReport(filters);
        case 'profitability':
          return api.reports.getProfitabilityReport(filters);
        default:
          throw new Error(`Unknown report type: ${reportType}`);
      }
    },
    ...options,
  });
};
