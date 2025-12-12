import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import Card from '@components/ui/Card';
import Button from '@components/ui/Button';
import { FileDown, Printer, Filter } from 'lucide-react';
import { formatNumber } from '@utils/helpers';

// Mock Data
const mockData = [
  {
    id: 1,
    equipmentName: 'حفار كاتربيلر 320',
    equipmentCode: 'EQ-001',
    type: 'Excavator',
    hoursUsed: 245,
    totalHours: 300,
    utilizationRate: 81.7,
    project: 'الرياض - المرحلة الأولى',
    status: 'Active',
    fuelCost: 12500,
    maintenanceCost: 3200,
  },
  {
    id: 2,
    equipmentName: 'لودر فولفو L90',
    equipmentCode: 'EQ-002',
    type: 'Loader',
    hoursUsed: 198,
    totalHours: 280,
    utilizationRate: 70.7,
    project: 'جدة - مشروع البحر',
    status: 'Active',
    fuelCost: 9800,
    maintenanceCost: 2100,
  },
  {
    id: 3,
    equipmentName: 'شيول CAT D6',
    equipmentCode: 'EQ-003',
    type: 'Bulldozer',
    hoursUsed: 167,
    totalHours: 250,
    utilizationRate: 66.8,
    project: 'الدمام - توسعة الميناء',
    status: 'Maintenance',
    fuelCost: 11200,
    maintenanceCost: 5400,
  },
  {
    id: 4,
    equipmentName: 'رافعة ليبهر LTM 1100',
    equipmentCode: 'EQ-004',
    type: 'Crane',
    hoursUsed: 89,
    totalHours: 200,
    utilizationRate: 44.5,
    project: 'الرياض - برج الأعمال',
    status: 'Active',
    fuelCost: 7500,
    maintenanceCost: 1800,
  },
  {
    id: 5,
    equipmentName: 'قلاب مرسيدس أكتروس',
    equipmentCode: 'EQ-005',
    type: 'Dump Truck',
    hoursUsed: 312,
    totalHours: 320,
    utilizationRate: 97.5,
    project: 'مكة - طريق الحرمين',
    status: 'Active',
    fuelCost: 18900,
    maintenanceCost: 4100,
  },
];

const EquipmentUtilizationReport = () => {
  const { t } = useTranslation();
  const [filters, setFilters] = useState({
    dateFrom: '',
    dateTo: '',
    equipmentType: '',
    status: '',
  });

  const avgUtilization = mockData.reduce((sum, item) => sum + item.utilizationRate, 0) / mockData.length;
  const totalFuelCost = mockData.reduce((sum, item) => sum + item.fuelCost, 0);
  const totalMaintenanceCost = mockData.reduce((sum, item) => sum + item.maintenanceCost, 0);

  return (
    <div className="page-container">
      <div className="mb-6 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <h1 className="heading-2">{t('reports.equipmentUtilization.title')}</h1>
        <div className="flex gap-2">
          <Button variant="outline" size="sm">
            <FileDown className="me-2 h-4 w-4" />
            تصدير Excel
          </Button>
          <Button variant="outline" size="sm">
            <Printer className="me-2 h-4 w-4" />
            طباعة
          </Button>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="mb-4 sm:mb-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
        <Card className="p-4">
          <p className="text-sm text-gray-600 dark:text-gray-400">إجمالي المعدات</p>
          <p className="text-2xl font-bold text-gray-900 dark:text-white">{mockData.length}</p>
        </Card>
        <Card className="p-4">
          <p className="text-sm text-gray-600 dark:text-gray-400">متوسط الاستخدام</p>
          <p className="text-2xl font-bold text-primary-600">{avgUtilization.toFixed(1)}%</p>
        </Card>
        <Card className="p-4">
          <p className="text-sm text-gray-600 dark:text-gray-400">تكلفة الوقود</p>
          <p className="text-2xl font-bold text-gray-900 dark:text-white">
            {formatNumber(totalFuelCost)} ج.م
          </p>
        </Card>
        <Card className="p-4">
          <p className="text-sm text-gray-600 dark:text-gray-400">تكلفة الصيانة</p>
          <p className="text-2xl font-bold text-gray-900 dark:text-white">
            {formatNumber(totalMaintenanceCost)} ج.م
          </p>
        </Card>
      </div>

      {/* Filters */}
      <Card className="mb-6 p-4">
        <div className="mb-3 flex items-center gap-2">
          <Filter className="h-5 w-5 text-gray-500" />
          <h3 className="font-semibold">الفلاتر</h3>
        </div>
        <div className="grid gap-4 md:grid-cols-4">
          <div>
            <label className="mb-1 block text-sm text-gray-700 dark:text-gray-300">من تاريخ</label>
            <input
              type="date"
              value={filters.dateFrom}
              onChange={e => setFilters({ ...filters, dateFrom: e.target.value })}
              className="w-full rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm dark:border-gray-700 dark:bg-gray-800"
            />
          </div>
          <div>
            <label className="mb-1 block text-sm text-gray-700 dark:text-gray-300">إلى تاريخ</label>
            <input
              type="date"
              value={filters.dateTo}
              onChange={e => setFilters({ ...filters, dateTo: e.target.value })}
              className="w-full rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm dark:border-gray-700 dark:bg-gray-800"
            />
          </div>
          <div>
            <label className="mb-1 block text-sm text-gray-700 dark:text-gray-300">نوع المعدة</label>
            <select
              value={filters.equipmentType}
              onChange={e => setFilters({ ...filters, equipmentType: e.target.value })}
              className="w-full rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm dark:border-gray-700 dark:bg-gray-800"
            >
              <option value="">الكل</option>
              <option value="Excavator">حفارات</option>
              <option value="Loader">لودرات</option>
              <option value="Bulldozer">شيولات</option>
              <option value="Crane">رافعات</option>
              <option value="Dump Truck">قلابات</option>
            </select>
          </div>
          <div>
            <label className="mb-1 block text-sm text-gray-700 dark:text-gray-300">الحالة</label>
            <select
              value={filters.status}
              onChange={e => setFilters({ ...filters, status: e.target.value })}
              className="w-full rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm dark:border-gray-700 dark:bg-gray-800"
            >
              <option value="">الكل</option>
              <option value="Active">نشط</option>
              <option value="Maintenance">صيانة</option>
              <option value="Idle">متوقف</option>
            </select>
          </div>
        </div>
      </Card>

      {/* Data Table */}
      <Card>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="border-b border-gray-200 bg-gray-50 dark:border-gray-700 dark:bg-gray-800">
              <tr>
                <th className="px-4 py-3 text-right text-sm font-semibold">الكود</th>
                <th className="px-4 py-3 text-right text-sm font-semibold">اسم المعدة</th>
                <th className="px-4 py-3 text-right text-sm font-semibold">النوع</th>
                <th className="px-4 py-3 text-right text-sm font-semibold">ساعات العمل</th>
                <th className="px-4 py-3 text-right text-sm font-semibold">نسبة الاستخدام</th>
                <th className="px-4 py-3 text-right text-sm font-semibold">المشروع</th>
                <th className="px-4 py-3 text-right text-sm font-semibold">تكلفة الوقود</th>
                <th className="px-4 py-3 text-right text-sm font-semibold">الصيانة</th>
                <th className="px-4 py-3 text-right text-sm font-semibold">الحالة</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
              {mockData.map(item => (
                <tr key={item.id} className="hover:bg-gray-50 dark:hover:bg-gray-800/50">
                  <td className="px-4 py-3 text-sm font-medium">{item.equipmentCode}</td>
                  <td className="px-4 py-3 text-sm">{item.equipmentName}</td>
                  <td className="px-4 py-3 text-sm text-gray-600 dark:text-gray-400">{item.type}</td>
                  <td className="px-4 py-3 text-sm">
                    {item.hoursUsed} / {item.totalHours} ساعة
                  </td>
                  <td className="px-4 py-3 text-sm">
                    <div className="flex items-center gap-2">
                      <div className="h-2 w-20 overflow-hidden rounded-full bg-gray-200 dark:bg-gray-700">
                        <div
                          className={`h-full ${
                            item.utilizationRate >= 80
                              ? 'bg-success-500'
                              : item.utilizationRate >= 60
                              ? 'bg-warning-500'
                              : 'bg-error-500'
                          }`}
                          style={{ width: `${item.utilizationRate}%` }}
                        />
                      </div>
                      <span className="font-medium">{item.utilizationRate.toFixed(1)}%</span>
                    </div>
                  </td>
                  <td className="px-4 py-3 text-sm text-gray-600 dark:text-gray-400">{item.project}</td>
                  <td className="px-4 py-3 text-sm">{formatNumber(item.fuelCost)} ج.م</td>
                  <td className="px-4 py-3 text-sm">{formatNumber(item.maintenanceCost)} ج.م</td>
                  <td className="px-4 py-3 text-sm">
                    <span
                      className={`inline-flex rounded-full px-2 py-1 text-xs font-medium ${
                        item.status === 'Active'
                          ? 'bg-success-100 text-success-700 dark:bg-success-900/20 dark:text-success-400'
                          : item.status === 'Maintenance'
                          ? 'bg-warning-100 text-warning-700 dark:bg-warning-900/20 dark:text-warning-400'
                          : 'bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-gray-400'
                      }`}
                    >
                      {item.status === 'Active' ? 'نشط' : item.status === 'Maintenance' ? 'صيانة' : 'متوقف'}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
};

export default EquipmentUtilizationReport;
