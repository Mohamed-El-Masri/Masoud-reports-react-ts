import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import Card, { CardHeader, CardTitle, CardContent } from '@components/ui/Card';
import Button from '@components/ui/Button';
import { Download, FileText, Filter, Calendar } from 'lucide-react';

const ProjectProgressReport = () => {
  const { t } = useTranslation();
  const [filters, setFilters] = useState({
    dateFrom: '',
    dateTo: '',
    projectId: '',
  });

  // Mock data
  const mockData = [
    {
      projectName: 'مشروع الطريق الرئيسي',
      plannedValue: 5000000,
      executedValue: 4250000,
      completionPercentage: 85,
      status: 'Active',
    },
    {
      projectName: 'مشروع الجسر',
      plannedValue: 3000000,
      executedValue: 1950000,
      completionPercentage: 65,
      status: 'Active',
    },
    {
      projectName: 'مشروع الساحة',
      plannedValue: 1500000,
      executedValue: 675000,
      completionPercentage: 45,
      status: 'Active',
    },
  ];

  const handleExport = (format: 'pdf' | 'excel' | 'csv') => {
    console.log(`Exporting as ${format}`);
    // TODO: Implement export functionality
  };

  return (
    <div className="page-container">
      {/* Header */}
      <div className="mb-6">
        <h1 className="heading-1 mb-2">{t('reports.projectProgress.title')}</h1>
        <p className="text-gray-600 dark:text-gray-400">
          {t('reports.projectProgress.description')}
        </p>
      </div>

      {/* Filters */}
      <Card className="mb-6">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Filter className="h-5 w-5" />
            {t('filters.title')}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
            {/* Date From */}
            <div>
              <label className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300">
                {t('filters.dateRange')} - {t('common.from')}
              </label>
              <div className="relative">
                <input
                  type="date"
                  value={filters.dateFrom}
                  onChange={e => setFilters({ ...filters, dateFrom: e.target.value })}
                  className="input-focus block w-full rounded-lg border border-gray-300 bg-gray-50 p-3 text-sm text-gray-900 dark:border-gray-700 dark:bg-gray-800 dark:text-white"
                />
                <Calendar className="pointer-events-none absolute end-3 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400" />
              </div>
            </div>

            {/* Date To */}
            <div>
              <label className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300">
                {t('filters.dateRange')} - {t('common.to')}
              </label>
              <div className="relative">
                <input
                  type="date"
                  value={filters.dateTo}
                  onChange={e => setFilters({ ...filters, dateTo: e.target.value })}
                  className="input-focus block w-full rounded-lg border border-gray-300 bg-gray-50 p-3 text-sm text-gray-900 dark:border-gray-700 dark:bg-gray-800 dark:text-white"
                />
                <Calendar className="pointer-events-none absolute end-3 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400" />
              </div>
            </div>

            {/* Project */}
            <div>
              <label className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300">
                {t('filters.project')}
              </label>
              <select
                value={filters.projectId}
                onChange={e => setFilters({ ...filters, projectId: e.target.value })}
                className="input-focus block w-full rounded-lg border border-gray-300 bg-gray-50 p-3 text-sm text-gray-900 dark:border-gray-700 dark:bg-gray-800 dark:text-white"
              >
                <option value="">الكل</option>
                <option value="1">مشروع الطريق الرئيسي</option>
                <option value="2">مشروع الجسر</option>
                <option value="3">مشروع الساحة</option>
              </select>
            </div>
          </div>

          <div className="mt-4 flex gap-2">
            <Button variant="primary">
              <Filter className="h-4 w-4" />
              {t('filters.apply')}
            </Button>
            <Button variant="outline">{t('filters.reset')}</Button>
          </div>
        </CardContent>
      </Card>

      {/* Export Actions */}
      <div className="mb-4 flex flex-wrap gap-2">
        <Button variant="outline" size="sm" onClick={() => handleExport('pdf')}>
          <FileText className="h-4 w-4" />
          {t('export.pdf')}
        </Button>
        <Button variant="outline" size="sm" onClick={() => handleExport('excel')}>
          <Download className="h-4 w-4" />
          {t('export.excel')}
        </Button>
        <Button variant="outline" size="sm" onClick={() => handleExport('csv')}>
          <Download className="h-4 w-4" />
          {t('export.csv')}
        </Button>
      </div>

      {/* Report Table */}
      <Card>
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="border-b border-gray-200 bg-gray-50 dark:border-gray-700 dark:bg-gray-800">
                <tr>
                  <th className="px-6 py-3 text-start font-semibold text-gray-900 dark:text-white">
                    اسم المشروع
                  </th>
                  <th className="px-6 py-3 text-start font-semibold text-gray-900 dark:text-white">
                    القيمة المخططة
                  </th>
                  <th className="px-6 py-3 text-start font-semibold text-gray-900 dark:text-white">
                    القيمة المنفذة
                  </th>
                  <th className="px-6 py-3 text-start font-semibold text-gray-900 dark:text-white">
                    نسبة الإنجاز
                  </th>
                  <th className="px-6 py-3 text-start font-semibold text-gray-900 dark:text-white">
                    الحالة
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                {mockData.map((row, index) => (
                  <tr
                    key={index}
                    className="hover:bg-gray-50 dark:hover:bg-gray-800"
                  >
                    <td className="px-6 py-4 font-medium text-gray-900 dark:text-white">
                      {row.projectName}
                    </td>
                    <td className="px-6 py-4 text-gray-700 dark:text-gray-300">
                      {new Intl.NumberFormat('ar-EG', {
                        style: 'currency',
                        currency: 'EGP',
                      }).format(row.plannedValue)}
                    </td>
                    <td className="px-6 py-4 text-gray-700 dark:text-gray-300">
                      {new Intl.NumberFormat('ar-EG', {
                        style: 'currency',
                        currency: 'EGP',
                      }).format(row.executedValue)}
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        <div className="h-2 w-32 overflow-hidden rounded-full bg-gray-200 dark:bg-gray-700">
                          <div
                            className="h-full bg-primary-600"
                            style={{ width: `${row.completionPercentage}%` }}
                          ></div>
                        </div>
                        <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                          {row.completionPercentage}%
                        </span>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span className="badge bg-success-100 text-success-700 dark:bg-success-900/20 dark:text-success-400">
                        {row.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ProjectProgressReport;
