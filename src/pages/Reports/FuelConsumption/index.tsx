import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import Card from '@components/ui/Card';
import Button from '@components/ui/Button';
import { FileDown, Printer, Filter, TrendingUp, TrendingDown } from 'lucide-react';
import { formatNumber, formatCurrency } from '@utils/helpers';
import { mockFuelData } from '@/data/mockReportsData';

const FuelConsumptionReport = () => {
  const { t } = useTranslation();
  const [filters, setFilters] = useState({
    dateFrom: '',
    dateTo: '',
    equipment: '',
    project: '',
  });

  const totalQuantity = mockFuelData.reduce((sum, item) => sum + item.quantity, 0);
  const totalCost = mockFuelData.reduce((sum, item) => sum + item.totalCost, 0);
  const avgPrice = totalCost / totalQuantity;

  return (
    <div className="p-6">
      <div className="mb-6 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <h1 className="heading-2">{t('reports.fuelConsumption.title')}</h1>
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
          <p className="text-sm text-gray-600 dark:text-gray-400">إجمالي الكمية</p>
          <p className="text-2xl font-bold text-gray-900 dark:text-white">
            {formatNumber(totalQuantity)} لتر
          </p>
          <div className="mt-2 flex items-center gap-1 text-sm text-success-600">
            <TrendingUp className="h-4 w-4" />
            <span>+12% عن الشهر الماضي</span>
          </div>
        </Card>
        <Card className="p-4">
          <p className="text-sm text-gray-600 dark:text-gray-400">إجمالي التكلفة</p>
          <p className="text-2xl font-bold text-gray-900 dark:text-white">
            {formatCurrency(totalCost)}
          </p>
          <div className="mt-2 flex items-center gap-1 text-sm text-error-600">
            <TrendingUp className="h-4 w-4" />
            <span>+8% عن الشهر الماضي</span>
          </div>
        </Card>
        <Card className="p-4">
          <p className="text-sm text-gray-600 dark:text-gray-400">متوسط السعر</p>
          <p className="text-2xl font-bold text-primary-600">{avgPrice.toFixed(2)} ج.م/لتر</p>
          <div className="mt-2 flex items-center gap-1 text-sm text-success-600">
            <TrendingDown className="h-4 w-4" />
            <span>-3% عن الشهر الماضي</span>
          </div>
        </Card>
        <Card className="p-4">
          <p className="text-sm text-gray-600 dark:text-gray-400">عدد المعاملات</p>
          <p className="text-2xl font-bold text-gray-900 dark:text-white">{mockFuelData.length}</p>
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
            <label className="mb-1 block text-sm text-gray-700 dark:text-gray-300">المعدة</label>
            <select
              value={filters.equipment}
              onChange={e => setFilters({ ...filters, equipment: e.target.value })}
              className="w-full rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm dark:border-gray-700 dark:bg-gray-800"
            >
              <option value="">الكل</option>
              <option value="EQ-001">حفار كاتربيلر 320</option>
              <option value="EQ-002">لودر فولفو L90</option>
              <option value="EQ-003">شيول CAT D6</option>
            </select>
          </div>
          <div>
            <label className="mb-1 block text-sm text-gray-700 dark:text-gray-300">المشروع</label>
            <select
              value={filters.project}
              onChange={e => setFilters({ ...filters, project: e.target.value })}
              className="w-full rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm dark:border-gray-700 dark:bg-gray-800"
            >
              <option value="">الكل</option>
              <option value="project1">الرياض - المرحلة الأولى</option>
              <option value="project2">جدة - مشروع البحر</option>
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
                <th className="px-4 py-3 text-right text-sm font-semibold">التاريخ</th>
                <th className="px-4 py-3 text-right text-sm font-semibold">كود المعدة</th>
                <th className="px-4 py-3 text-right text-sm font-semibold">اسم المعدة</th>
                <th className="px-4 py-3 text-right text-sm font-semibold">نوع الوقود</th>
                <th className="px-4 py-3 text-right text-sm font-semibold">الكمية (لتر)</th>
                <th className="px-4 py-3 text-right text-sm font-semibold">سعر اللتر</th>
                <th className="px-4 py-3 text-right text-sm font-semibold">الإجمالي</th>
                <th className="px-4 py-3 text-right text-sm font-semibold">المشروع</th>
                <th className="px-4 py-3 text-right text-sm font-semibold">المشغّل</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
              {mockFuelData.map(item => (
                <tr key={item.id} className="hover:bg-gray-50 dark:hover:bg-gray-800/50">
                  <td className="px-4 py-3 text-sm font-medium">{item.date}</td>
                  <td className="px-4 py-3 text-sm">{item.equipmentCode}</td>
                  <td className="px-4 py-3 text-sm">{item.equipmentName}</td>
                  <td className="px-4 py-3 text-sm text-gray-600 dark:text-gray-400">{item.fuelType}</td>
                  <td className="px-4 py-3 text-sm font-medium">{formatNumber(item.quantity)}</td>
                  <td className="px-4 py-3 text-sm">{item.unitPrice.toFixed(2)} ج.م</td>
                  <td className="px-4 py-3 text-sm font-semibold">{formatCurrency(item.totalCost)}</td>
                  <td className="px-4 py-3 text-sm text-gray-600 dark:text-gray-400">{item.project}</td>
                  <td className="px-4 py-3 text-sm">{item.operator}</td>
                </tr>
              ))}
            </tbody>
            <tfoot className="border-t-2 border-gray-300 bg-gray-100 dark:border-gray-600 dark:bg-gray-800">
              <tr>
                <td colSpan={4} className="px-4 py-3 text-right text-sm font-bold">
                  الإجمالي
                </td>
                <td className="px-4 py-3 text-sm font-bold">{formatNumber(totalQuantity)} لتر</td>
                <td></td>
                <td className="px-4 py-3 text-sm font-bold text-primary-600">{formatCurrency(totalCost)}</td>
                <td colSpan={2}></td>
              </tr>
            </tfoot>
          </table>
        </div>
      </Card>
    </div>
  );
};

export default FuelConsumptionReport;
