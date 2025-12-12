import { useQuery } from '@tanstack/react-query';
import { api } from '@services/api';

// Hook to get projects
export const useProjects = (filters?: any) => {
  return useQuery({
    queryKey: ['projects', filters],
    queryFn: () => api.projects.getProjects(filters),
    staleTime: 5 * 60 * 1000, // 5 minutes - projects don't change often
  });
};

// Hook to get single project
export const useProject = (id: string) => {
  return useQuery({
    queryKey: ['project', id],
    queryFn: () => api.projects.getProject(id),
    enabled: !!id,
    staleTime: 5 * 60 * 1000,
  });
};

// Hook to get QS list
export const useQSList = (filters?: any) => {
  return useQuery({
    queryKey: ['qs-list', filters],
    queryFn: () => api.qs.getQSList(filters),
  });
};

// Hook to get certificates
export const useCertificates = (filters?: any) => {
  return useQuery({
    queryKey: ['certificates', filters],
    queryFn: () => api.certificates.getCertificates(filters),
  });
};

// Hook to get equipment
export const useEquipment = (filters?: any) => {
  return useQuery({
    queryKey: ['equipment', filters],
    queryFn: () => api.equipment.getEquipment(filters),
    staleTime: 5 * 60 * 1000,
  });
};

// Hook to get fuel invoices
export const useFuelInvoices = (filters?: any) => {
  return useQuery({
    queryKey: ['fuel-invoices', filters],
    queryFn: () => api.fuel.getFuelInvoices(filters),
  });
};
