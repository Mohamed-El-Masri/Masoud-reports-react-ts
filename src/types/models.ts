// ==================== Base Types ====================
export interface BaseEntity {
  id: string;
  createdAt?: string;
  updatedAt?: string;
}

// ==================== User & Auth ====================
export interface User extends BaseEntity {
  email: string;
  name: string;
  role: UserRole;
  phone?: string;
  avatar?: string;
}

export enum UserRole {
  Admin = 'Admin',
  ProjectManager = 'ProjectManager',
  QS = 'QS',
  SiteEngineer = 'SiteEngineer',
  Accountant = 'Accountant',
  Viewer = 'Viewer',
}

export interface AuthResponse {
  token: string;
  refreshToken: string;
  user: User;
  expiresIn: number;
}

// ==================== Projects & Locations ====================
export interface Project extends BaseEntity {
  name: string;
  code: string;
  startDate?: string;
  endDate?: string;
  status: ProjectStatus;
  totalBudget?: number;
  totalExecuted?: number;
  completionPercentage?: number;
}

export enum ProjectStatus {
  Active = 'Active',
  Completed = 'Completed',
  OnHold = 'OnHold',
  Cancelled = 'Cancelled',
}

export interface Location extends BaseEntity {
  projectId: string;
  name: string;
  code: string;
  project?: Project;
}

// ==================== Items ====================
export interface Item extends BaseEntity {
  code: string;
  name: string;
  unit: string;
  basePrice: number;
  priceIncludesFuel: boolean;
  description?: string;
}

export interface ItemLocation extends BaseEntity {
  itemId: string;
  locationId: string;
  isOpen: boolean;
  openDate?: string;
  closeDate?: string | null;
  item?: Item;
  location?: Location;
}

// ==================== Execution ====================
export interface ExecutionRecord extends BaseEntity {
  projectId: string;
  itemLocationId: string;
  date: string;
  executedQuantity: number;
  notes?: string;
  equipmentAssignments?: EquipmentAssignment[];
  expenses?: Expense[];
  project?: Project;
  itemLocation?: ItemLocation;
}

export interface Expense extends BaseEntity {
  executionRecordId: string;
  description: string;
  amount: number;
  category: ExpenseCategory;
}

export enum ExpenseCategory {
  Labor = 'Labor',
  Material = 'Material',
  Equipment = 'Equipment',
  Fuel = 'Fuel',
  Other = 'Other',
}

// ==================== QS (Quantity Survey) ====================
export interface QS extends BaseEntity {
  projectId: string;
  qsNumber: string;
  type: QSType;
  date: string;
  status: QSStatus;
  items: QSItem[];
  totalValue?: number;
  notes?: string;
  project?: Project;
}

export enum QSType {
  Contract = 'Contract',
  Variation = 'Variation',
  Claim = 'Claim',
}

export enum QSStatus {
  Draft = 'Draft',
  Submitted = 'Submitted',
  Approved = 'Approved',
  Paid = 'Paid',
}

export interface QSItem extends BaseEntity {
  qsId: string;
  itemLocationId: string;
  quantity: number;
  unitPrice: number;
  totalValue: number;
  notes?: string;
  itemLocation?: ItemLocation;
}

// ==================== Equipment ====================
export interface Equipment extends BaseEntity {
  name: string;
  code: string;
  type: EquipmentType;
  ratePerHour?: number;
  ratePerDay?: number;
  rentIncludesFuel: boolean;
  fuelConsumptionRate?: number; // liters per hour
  status: EquipmentStatus;
}

export enum EquipmentType {
  Excavator = 'Excavator',
  Loader = 'Loader',
  Bulldozer = 'Bulldozer',
  Grader = 'Grader',
  Compactor = 'Compactor',
  Truck = 'Truck',
  Other = 'Other',
}

export enum EquipmentStatus {
  Available = 'Available',
  InUse = 'InUse',
  Maintenance = 'Maintenance',
  Retired = 'Retired',
}

export interface EquipmentAssignment extends BaseEntity {
  equipmentId: string;
  executionRecordId: string;
  usedHours?: number;
  usedDays?: number;
  fuelLitersUsed?: number;
  fuelInvoiceId?: string;
  cost?: number;
  equipment?: Equipment;
}

// ==================== Fuel ====================
export interface FuelInvoice extends BaseEntity {
  supplier: string;
  invoiceNumber: string;
  date: string;
  totalLiters: number;
  totalAmount: number;
  pricePerLiter: number;
  fileUrl?: string;
  allocatedLiters?: number;
  remainingLiters?: number;
}

// ==================== Certificates ====================
export interface Certificate extends BaseEntity {
  pcNumber: string;
  date: string;
  linkedQSIds: string[];
  linkedQSs?: QS[];
  additions: number;
  deductions: number;
  taxes: number;
  insurances: number;
  grossAmount: number;
  netPayable: number;
  status: CertificateStatus;
  notes?: string;
}

export enum CertificateStatus {
  Draft = 'Draft',
  Pending = 'Pending',
  Approved = 'Approved',
  Paid = 'Paid',
}

// ==================== KPIs & Dashboard ====================
export interface KPI {
  label: string;
  value: number | string;
  unit?: string;
  trend?: 'up' | 'down' | 'neutral';
  trendPercentage?: number;
  icon?: string;
  color?: string;
}

export interface DashboardData {
  kpis: {
    executedValue: number;
    outstandingQSValue: number;
    openItemsCount: number;
    fuelConsumptionMonthly: number;
    equipmentUtilization: number;
    netProfit: number;
  };
  charts: {
    projectProgress: ProjectProgressData[];
    itemsStatus: ItemsStatusData;
    fuelTrend: FuelTrendData[];
    costVsRevenue: CostRevenueData[];
  };
  alerts: Alert[];
}

export interface ProjectProgressData {
  projectName: string;
  completionPercentage: number;
  executedValue: number;
  plannedValue: number;
}

export interface ItemsStatusData {
  open: number;
  closed: number;
}

export interface FuelTrendData {
  month: string;
  consumption: number;
  cost: number;
}

export interface CostRevenueData {
  month: string;
  cost: number;
  revenue: number;
}

export interface Alert {
  id: string;
  type: 'info' | 'warning' | 'error' | 'success';
  title: string;
  message: string;
  date: string;
  read: boolean;
  action?: {
    label: string;
    link: string;
  };
}

// ==================== Reports ====================
export interface ReportFilter {
  dateFrom?: string;
  dateTo?: string;
  projectId?: string;
  locationId?: string;
  status?: string;
  type?: string;
}

export interface ReportData {
  title: string;
  generatedAt: string;
  filters: ReportFilter;
  data: any;
  summary?: any;
}

// ==================== Pagination ====================
export interface PaginatedResponse<T> {
  data: T[];
  page: number;
  pageSize: number;
  totalCount: number;
  totalPages: number;
}

// ==================== API Response ====================
export interface ApiResponse<T = any> {
  success: boolean;
  data?: T;
  message?: string;
  errors?: Record<string, string[]>;
}

export interface ApiError {
  message: string;
  statusCode: number;
  errors?: Record<string, string[]>;
}
