// Mock Dashboard Data
import { DashboardData } from '@/types/models';

export const mockDashboardData: DashboardData = {
  kpis: {
    executedValue: 18500000,
    outstandingQSValue: 3200000,
    openItemsCount: 45,
    fuelConsumptionMonthly: 5100,
    equipmentUtilization: 78.5,
    netProfit: 4300000,
  },
  charts: {
    projectProgress: [
      { 
        projectName: 'الرياض - المرحلة الأولى', 
        completionPercentage: 75,
        executedValue: 1850000,
        plannedValue: 2500000,
      },
      { 
        projectName: 'جدة - مشروع البحر', 
        completionPercentage: 60,
        executedValue: 1920000,
        plannedValue: 3200000,
      },
      { 
        projectName: 'الدمام - توسعة الميناء', 
        completionPercentage: 45,
        executedValue: 2025000,
        plannedValue: 4500000,
      },
      { 
        projectName: 'مكة - طريق الحرمين', 
        completionPercentage: 100,
        executedValue: 5800000,
        plannedValue: 5800000,
      },
      { 
        projectName: 'الرياض - برج الأعمال', 
        completionPercentage: 30,
        executedValue: 1950000,
        plannedValue: 6500000,
      },
    ],
    itemsStatus: {
      open: 45,
      closed: 82,
    },
    fuelTrend: [
      { month: 'يناير', consumption: 4200, cost: 10500 },
      { month: 'فبراير', consumption: 4800, cost: 12000 },
      { month: 'مارس', consumption: 5200, cost: 13000 },
      { month: 'أبريل', consumption: 4900, cost: 12250 },
      { month: 'مايو', consumption: 5500, cost: 13750 },
      { month: 'يونيو', consumption: 5100, cost: 12750 },
    ],
    costVsRevenue: [
      { month: 'يناير', cost: 1900000, revenue: 2400000 },
      { month: 'فبراير', cost: 2200000, revenue: 2800000 },
      { month: 'مارس', cost: 2500000, revenue: 3200000 },
      { month: 'أبريل', cost: 2300000, revenue: 2900000 },
      { month: 'مايو', cost: 2800000, revenue: 3500000 },
      { month: 'يونيو', cost: 2400000, revenue: 3100000 },
    ],
  },
  alerts: [
    {
      id: '1',
      type: 'warning',
      title: 'تأخر في التنفيذ',
      message: 'مشروع الرياض - المرحلة الأولى متأخر بـ 5 أيام عن الجدول الزمني',
      date: new Date().toISOString(),
      read: false,
    },
    {
      id: '2',
      type: 'error',
      title: 'تجاوز الميزانية',
      message: 'مشروع جدة تجاوز الميزانية المخططة بنسبة 8%',
      date: new Date().toISOString(),
      read: false,
    },
    {
      id: '3',
      type: 'info',
      title: 'مستخلص جديد',
      message: 'تم رفع مستخلص جديد لمشروع الدمام - قيمة 189,000 ج.م',
      date: new Date().toISOString(),
      read: false,
    },
    {
      id: '4',
      type: 'success',
      title: 'اعتماد مستخلص',
      message: 'تم اعتماد مستخلص مشروع مكة بقيمة 167,000 ج.م',
      date: new Date().toISOString(),
      read: true,
    },
  ],
};
