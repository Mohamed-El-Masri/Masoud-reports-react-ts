import { useState } from 'react';
import { TrendingUp, TrendingDown, DollarSign, Filter, Download, Printer, Target, Percent, CheckCircle, Activity } from 'lucide-react';
import Card from '@/components/ui/Card';
import Button from '@/components/ui/Button';
import Badge from '@/components/ui/Badge';
import { mockProfitabilityData } from '@/data/mockReportsData';
import { formatCurrency } from '@/utils/helpers';

const ProfitabilityReport = () => {
  const [selectedStatus, setSelectedStatus] = useState('all');
  const [selectedProject, setSelectedProject] = useState('all');

  // Format compact currency for cards
  const formatCompactCurrency = (value: number): string => {
    if (value >= 1000000) {
      return `${(value / 1000000).toFixed(1)} م.ج`;
    } else if (value >= 1000) {
      return `${(value / 1000).toFixed(0)} ألف ج`;
    }
    return formatCurrency(value);
  };

  // Filter data
  const filteredData = mockProfitabilityData.filter(project => {
    if (selectedStatus !== 'all' && project.status !== selectedStatus) return false;
    if (selectedProject !== 'all' && project.project !== selectedProject) return false;
    return true;
  });

  // Calculate statistics
  const totalRevenue = filteredData.reduce((sum, p) => sum + p.totalRevenue, 0);
  const totalCosts = filteredData.reduce((sum, p) => sum + p.totalCosts, 0);
  const totalGrossProfit = filteredData.reduce((sum, p) => sum + p.grossProfit, 0);
  const totalNetProfit = filteredData.reduce((sum, p) => sum + p.netProfit, 0);
  const avgGrossMargin = filteredData.length > 0 
    ? filteredData.reduce((sum, p) => sum + p.grossMargin, 0) / filteredData.length 
    : 0;

  // Get unique projects
  const projects = [...new Set(mockProfitabilityData.map(p => p.project))];

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'Completed':
        return <Badge variant="success">مكتمل</Badge>;
      case 'In Progress':
        return <Badge variant="info">قيد التنفيذ</Badge>;
      case 'On Hold':
        return <Badge variant="warning">متوقف</Badge>;
      default:
        return <Badge variant="default">{status}</Badge>;
    }
  };

  const getProfitBadge = (netProfit: number) => {
    if (netProfit > 0) {
      return <Badge variant="success">ربح</Badge>;
    } else if (netProfit < 0) {
      return <Badge variant="error">خسارة</Badge>;
    } else {
      return <Badge variant="default">متعادل</Badge>;
    }
  };

  const getMarginColor = (margin: number) => {
    if (margin >= 20) return 'text-green-600';
    if (margin >= 10) return 'text-blue-600';
    if (margin >= 0) return 'text-orange-600';
    return 'text-red-600';
  };

  const handleExport = () => {
    // TODO: Implement Excel export
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="page-container">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-green-50 rounded-lg flex-shrink-0">
            <TrendingUp className="w-5 h-5 sm:w-6 sm:h-6 text-green-600" />
          </div>
          <div className="min-w-0">
            <h1 className="text-xl sm:text-2xl lg:text-3xl font-bold text-gray-900">تقرير الربحية</h1>
            <p className="text-xs sm:text-sm text-gray-500">تحليل الأداء المالي والربحية للمشاريع</p>
          </div>
        </div>
        <div className="flex gap-1.5 sm:gap-2 flex-shrink-0">
          <Button variant="outline" onClick={handlePrint} className="text-xs px-2 py-1.5 sm:px-4 sm:py-2">
            <Printer className="w-3 h-3 sm:w-4 sm:h-4 ml-1 sm:ml-2" />
            <span className="hidden xs:inline">طباعة</span>
          </Button>
          <Button onClick={handleExport} className="text-xs px-2 py-1.5 sm:px-4 sm:py-2">
            <Download className="w-3 h-3 sm:w-4 sm:h-4 ml-1 sm:ml-2" />
            <span className="hidden xs:inline">تصدير</span>
          </Button>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-3 sm:gap-4 mb-4 sm:mb-6">
        <Card className="bg-gradient-to-br from-blue-50 to-blue-100 border-blue-200 p-3 sm:p-4">
          <div className="flex flex-col gap-2">
            <div className="flex items-start justify-between gap-2">
              <p className="text-xs text-blue-600 font-medium leading-tight">إجمالي الإيرادات</p>
              <div className="p-1.5 bg-blue-200 rounded-lg flex-shrink-0">
                <DollarSign className="w-4 h-4 text-blue-700" />
              </div>
            </div>
            <p className="text-xl md:text-2xl font-bold text-blue-900" title={formatCurrency(totalRevenue)}>
              {formatCompactCurrency(totalRevenue)}
            </p>
          </div>
        </Card>

        <Card className="bg-gradient-to-br from-red-50 to-red-100 border-red-200 p-3 sm:p-4">
          <div className="flex flex-col gap-2">
            <div className="flex items-start justify-between gap-2">
              <p className="text-xs text-red-600 font-medium leading-tight">إجمالي التكاليف</p>
              <div className="p-1.5 bg-red-200 rounded-lg flex-shrink-0">
                <DollarSign className="w-4 h-4 text-red-700" />
              </div>
            </div>
            <p className="text-xl md:text-2xl font-bold text-red-900" title={formatCurrency(totalCosts)}>
              {formatCompactCurrency(totalCosts)}
            </p>
          </div>
        </Card>

        <Card className="bg-gradient-to-br from-green-50 to-green-100 border-green-200 p-3 sm:p-4">
          <div className="flex flex-col gap-2">
            <div className="flex items-start justify-between gap-2">
              <p className="text-xs text-green-600 font-medium leading-tight">الربح الإجمالي</p>
              <div className="p-1.5 bg-green-200 rounded-lg flex-shrink-0">
                <TrendingUp className="w-4 h-4 text-green-700" />
              </div>
            </div>
            <p className="text-xl md:text-2xl font-bold text-green-900" title={formatCurrency(totalGrossProfit)}>
              {formatCompactCurrency(totalGrossProfit)}
            </p>
          </div>
        </Card>

        <Card className="bg-gradient-to-br from-emerald-50 to-emerald-100 border-emerald-200 p-3 sm:p-4">
          <div className="flex flex-col gap-2">
            <div className="flex items-start justify-between gap-2">
              <p className="text-xs text-emerald-600 font-medium leading-tight">الربح الصافي</p>
              <div className="p-1.5 bg-emerald-200 rounded-lg flex-shrink-0">
                <Target className="w-4 h-4 text-emerald-700" />
              </div>
            </div>
            <p className={`text-xl md:text-2xl font-bold ${totalNetProfit >= 0 ? 'text-emerald-900' : 'text-red-900'}`} 
               title={formatCurrency(totalNetProfit)}>
              {formatCompactCurrency(totalNetProfit)}
            </p>
          </div>
        </Card>

        <Card className="bg-gradient-to-br from-purple-50 to-purple-100 border-purple-200 p-3 sm:p-4">
          <div className="flex flex-col gap-2">
            <div className="flex items-start justify-between gap-2">
              <p className="text-xs text-purple-600 font-medium leading-tight">متوسط الهامش</p>
              <div className="p-1.5 bg-purple-200 rounded-lg flex-shrink-0">
                <Percent className="w-4 h-4 text-purple-700" />
              </div>
            </div>
            <p className="text-xl md:text-2xl font-bold text-purple-900">
              {avgGrossMargin.toFixed(1)}%
            </p>
          </div>
        </Card>
      </div>

      {/* Filters */}
      <Card className="mb-6">
        <div className="flex items-center gap-2 mb-4">
          <Filter className="w-4 h-4 text-gray-500 flex-shrink-0" />
          <h3 className="font-semibold text-gray-700 text-sm md:text-base">الفلاتر</h3>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 md:gap-4">
          <div className="w-full">
            <label className="block text-xs md:text-sm font-medium text-gray-700 mb-2">المشروع</label>
            <select
              value={selectedProject}
              onChange={(e) => setSelectedProject(e.target.value)}
              className="w-full rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm focus:border-primary-500 focus:ring-2 focus:ring-primary-500 focus:ring-opacity-20 focus:outline-none"
            >
              <option value="all">جميع المشاريع</option>
              {projects.map(project => (
                <option key={project} value={project}>{project}</option>
              ))}
            </select>
          </div>

          <div className="w-full">
            <label className="block text-xs md:text-sm font-medium text-gray-700 mb-2">الحالة</label>
            <select
              value={selectedStatus}
              onChange={(e) => setSelectedStatus(e.target.value)}
              className="w-full rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm focus:border-primary-500 focus:ring-2 focus:ring-primary-500 focus:ring-opacity-20 focus:outline-none"
            >
              <option value="all">جميع الحالات</option>
              <option value="In Progress">قيد التنفيذ</option>
              <option value="Completed">مكتمل</option>
              <option value="On Hold">متوقف</option>
            </select>
          </div>

          <div className="w-full">
            <label className="block text-xs md:text-sm font-medium text-gray-700 mb-2">الترتيب</label>
            <select className="w-full rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm focus:border-primary-500 focus:ring-2 focus:ring-primary-500 focus:ring-opacity-20 focus:outline-none">
              <option value="profit">حسب الربحية</option>
              <option value="revenue">حسب الإيرادات</option>
              <option value="margin">حسب هامش الربح</option>
            </select>
          </div>
        </div>
      </Card>

      {/* Data Table */}
      <Card className="w-full">
        <div className="overflow-x-auto custom-scrollbar max-h-[70vh]">
          <table className="min-w-max divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="sticky right-0 z-10 bg-gray-50 px-2 py-2 text-right text-xs font-medium text-gray-500 uppercase tracking-tight whitespace-nowrap w-24">
                      المشروع
                    </th>
                    <th className="px-2 py-2 text-right text-xs font-medium text-gray-500 uppercase tracking-tight whitespace-nowrap leading-tight w-20">
                      قيمة العقد
                    </th>
                    <th className="px-2 py-2 text-right text-xs font-medium text-gray-500 uppercase tracking-tight whitespace-nowrap leading-tight w-20">
                      الإيرادات
                    </th>
                    <th className="px-2 py-2 text-right text-xs font-medium text-gray-500 uppercase tracking-tight leading-tight w-20">
                      التكاليف الإجمالية
                    </th>
                    <th className="px-2 py-2 text-right text-xs font-medium text-gray-500 uppercase tracking-tight leading-tight w-20">
                      التكاليف المباشرة
                    </th>
                    <th className="px-2 py-2 text-right text-xs font-medium text-gray-500 uppercase tracking-tight leading-tight w-20">
                      التكاليف غير المباشرة
                    </th>
                    <th className="px-2 py-2 text-right text-xs font-medium text-gray-500 uppercase tracking-tight whitespace-nowrap leading-tight w-20">
                      الربح الإجمالي
                    </th>
                    <th className="px-2 py-2 text-right text-xs font-medium text-gray-500 uppercase tracking-tight leading-tight w-16">
                      هامش الربح الإجمالي
                    </th>
                    <th className="px-2 py-2 text-right text-xs font-medium text-gray-500 uppercase tracking-tight whitespace-nowrap leading-tight w-20">
                      الربح الصافي
                    </th>
                    <th className="px-2 py-2 text-right text-xs font-medium text-gray-500 uppercase tracking-tight leading-tight w-16">
                      هامش الربح الصافي
                    </th>
                    <th className="px-2 py-2 text-right text-xs font-medium text-gray-500 uppercase tracking-tight whitespace-nowrap leading-tight w-16">
                      الحالة
                    </th>
                    <th className="px-2 py-2 text-right text-xs font-medium text-gray-500 uppercase tracking-tight whitespace-nowrap leading-tight w-20">
                      نسبة الإنجاز
                    </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredData.map((project) => (
                  <tr key={project.id} className="hover:bg-gray-50 transition-colors">
                    <td className="sticky right-0 z-10 bg-white px-2 py-2 whitespace-nowrap">
                        <span className="text-xs font-medium text-gray-900">{project.project}</span>
                      </td>
                      <td className="px-2 py-2 whitespace-nowrap">
                        <span className="text-xs text-gray-900">{formatCurrency(project.contractValue)}</span>
                      </td>
                      <td className="px-2 py-2 whitespace-nowrap">
                        <span className="text-xs font-semibold text-blue-600">{formatCurrency(project.totalRevenue)}</span>
                      </td>
                      <td className="px-2 py-2 whitespace-nowrap">
                        <span className="text-xs text-red-600">{formatCurrency(project.totalCosts)}</span>
                      </td>
                      <td className="px-2 py-2 whitespace-nowrap">
                        <span className="text-xs text-gray-600">{formatCurrency(project.directCosts)}</span>
                      </td>
                      <td className="px-2 py-2 whitespace-nowrap">
                        <span className="text-xs text-gray-600">{formatCurrency(project.indirectCosts)}</span>
                      </td>
                      <td className="px-2 py-2 whitespace-nowrap">
                        <span className="text-xs font-semibold text-green-600">{formatCurrency(project.grossProfit)}</span>
                      </td>
                      <td className="px-2 py-2 whitespace-nowrap">
                        <span className={`text-xs font-semibold ${getMarginColor(project.grossMargin)}`}>
                          {project.grossMargin.toFixed(1)}%
                        </span>
                      </td>
                      <td className="px-2 py-2 whitespace-nowrap">
                        <div className="flex items-center gap-1">
                          <span className={`text-xs font-bold ${project.netProfit >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                            {formatCurrency(project.netProfit)}
                          </span>
                          {getProfitBadge(project.netProfit)}
                        </div>
                      </td>
                      <td className="px-2 py-2 whitespace-nowrap">
                        <span className={`text-xs font-semibold ${getMarginColor(project.netMargin)}`}>
                          {project.netMargin.toFixed(1)}%
                        </span>
                      </td>
                      <td className="px-2 py-2 whitespace-nowrap">
                        {getStatusBadge(project.status)}
                      </td>
                      <td className="px-2 py-2 whitespace-nowrap">
                        <div className="flex items-center gap-2">
                          <div className="flex-1 bg-gray-200 rounded-full h-2 w-20">
                            <div
                              className={`h-2 rounded-full ${
                                project.completion === 100 ? 'bg-green-500' : 'bg-blue-500'
                              }`}
                              style={{ width: `${project.completion}%` }}
                            ></div>
                          </div>
                          <span className="text-xs font-medium text-gray-700">{project.completion}%</span>
                        </div>
                      </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {filteredData.length === 0 && (
            <div className="text-center py-12">
              <TrendingUp className="w-12 h-12 text-gray-300 mx-auto mb-4" />
              <p className="text-gray-500">لا توجد بيانات متاحة</p>
            </div>
          )}
      </Card>
    </div>
  );
};

export default ProfitabilityReport;
