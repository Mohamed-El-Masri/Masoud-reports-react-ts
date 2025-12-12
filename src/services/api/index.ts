import { apiRequest } from './client';
import {
  DashboardData,
  ReportData,
  ReportFilter,
  Project,
  QS,
  Certificate,
  Equipment,
  FuelInvoice,
} from '@/types/models';

// ==================== Dashboard APIs ====================
export const dashboardApi = {
  // Get dashboard data
  getDashboardData: (filters?: ReportFilter) => 
    apiRequest<DashboardData>('get', '/dashboard', undefined, { params: filters }),

  // Get KPIs
  getKPIs: (filters?: ReportFilter) =>
    apiRequest<DashboardData['kpis']>('get', '/dashboard/kpis', undefined, { params: filters }),
};

// ==================== Reports APIs ====================
export const reportsApi = {
  // Project Progress Report
  getProjectProgressReport: (filters: ReportFilter) =>
    apiRequest<ReportData>('get', '/reports/project-progress', undefined, { params: filters }),

  // Equipment Utilization Report
  getEquipmentUtilizationReport: (filters: ReportFilter) =>
    apiRequest<ReportData>('get', '/reports/equipment-utilization', undefined, { params: filters }),

  // Fuel Consumption Report
  getFuelConsumptionReport: (filters: ReportFilter) =>
    apiRequest<ReportData>('get', '/reports/fuel-consumption', undefined, { params: filters }),

  // Certificates Report
  getCertificatesReport: (filters: ReportFilter) =>
    apiRequest<ReportData>('get', '/reports/certificates', undefined, { params: filters }),

  // QS Summary Report
  getQSSummaryReport: (filters: ReportFilter) =>
    apiRequest<ReportData>('get', '/reports/qs-summary', undefined, { params: filters }),

  // Direct Costs Report
  getDirectCostsReport: (filters: ReportFilter) =>
    apiRequest<ReportData>('get', '/reports/direct-costs', undefined, { params: filters }),

  // Profitability Report
  getProfitabilityReport: (filters: ReportFilter) =>
    apiRequest<ReportData>('get', '/reports/profitability', undefined, { params: filters }),

  // Export report
  exportReport: (reportType: string, format: 'pdf' | 'excel' | 'csv', filters: ReportFilter) =>
    apiRequest<Blob>(
      'post',
      `/reports/export/${reportType}`,
      { format, filters },
      { responseType: 'blob' }
    ),
};

// ==================== Projects APIs (Read-only) ====================
export const projectsApi = {
  // Get all projects
  getProjects: (filters?: any) =>
    apiRequest<Project[]>('get', '/projects', undefined, { params: filters }),

  // Get project by ID
  getProject: (id: string) =>
    apiRequest<Project>('get', `/projects/${id}`),
};

// ==================== QS APIs (Read-only) ====================
export const qsApi = {
  // Get all QS
  getQSList: (filters?: any) =>
    apiRequest<QS[]>('get', '/qs', undefined, { params: filters }),

  // Get QS by ID
  getQS: (id: string) =>
    apiRequest<QS>('get', `/qs/${id}`),
};

// ==================== Certificates APIs (Read-only) ====================
export const certificatesApi = {
  // Get all certificates
  getCertificates: (filters?: any) =>
    apiRequest<Certificate[]>('get', '/certificates', undefined, { params: filters }),

  // Get certificate by ID
  getCertificate: (id: string) =>
    apiRequest<Certificate>('get', `/certificates/${id}`),
};

// ==================== Equipment APIs (Read-only) ====================
export const equipmentApi = {
  // Get all equipment
  getEquipment: (filters?: any) =>
    apiRequest<Equipment[]>('get', '/equipment', undefined, { params: filters }),

  // Get equipment by ID
  getEquipmentById: (id: string) =>
    apiRequest<Equipment>('get', `/equipment/${id}`),
};

// ==================== Fuel APIs (Read-only) ====================
export const fuelApi = {
  // Get all fuel invoices
  getFuelInvoices: (filters?: any) =>
    apiRequest<FuelInvoice[]>('get', '/fuel-invoices', undefined, { params: filters }),

  // Get fuel invoice by ID
  getFuelInvoice: (id: string) =>
    apiRequest<FuelInvoice>('get', `/fuel-invoices/${id}`),
};

// ==================== Analytics APIs ====================
export const analyticsApi = {
  // Get analytics data
  getAnalytics: (filters?: ReportFilter) =>
    apiRequest<any>('get', '/analytics', undefined, { params: filters }),

  // Get timeline events
  getTimeline: (filters?: ReportFilter) =>
    apiRequest<any>('get', '/analytics/timeline', undefined, { params: filters }),
};

// Export all APIs
export const api = {
  dashboard: dashboardApi,
  reports: reportsApi,
  projects: projectsApi,
  qs: qsApi,
  certificates: certificatesApi,
  equipment: equipmentApi,
  fuel: fuelApi,
  analytics: analyticsApi,
};

export default api;
