import { useState } from 'react';
import { FileText, Calendar, Filter, Download, Printer, CheckCircle, Clock, Link2 } from 'lucide-react';
import Card from '@/components/ui/Card';
import Button from '@/components/ui/Button';
import Badge from '@/components/ui/Badge';
import { mockQSData } from '@/data/mockReportsData';
import { formatCurrency, formatNumber } from '@/utils/helpers';

const QSSummaryReport = () => {
  const [selectedStatus, setSelectedStatus] = useState('all');
  const [selectedType, setSelectedType] = useState('all');
  const [selectedProject, setSelectedProject] = useState('all');

  // Filter data
  const filteredData = mockQSData.filter(qs => {
    if (selectedStatus !== 'all' && qs.status !== selectedStatus) return false;
    if (selectedType !== 'all' && qs.type !== selectedType) return false;
    if (selectedProject !== 'all' && qs.project !== selectedProject) return false;
    return true;
  });

  // Calculate statistics
  const totalQS = filteredData.length;
  const totalAmount = filteredData.reduce((sum, qs) => sum + qs.totalAmount, 0);
  const totalQuantity = filteredData.reduce((sum, qs) => sum + qs.quantity, 0);
  const approvedCount = filteredData.filter(qs => qs.status === 'Approved').length;
  const linkedCount = filteredData.filter(qs => qs.linkedCertificate).length;

  // Get unique values
  const projects = [...new Set(mockQSData.map(qs => qs.project))];
  const types = [...new Set(mockQSData.map(qs => qs.type))];

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'Approved':
        return <Badge variant="success">معتمد</Badge>;
      case 'Pending':
        return <Badge variant="warning">قيد المراجعة</Badge>;
      case 'Rejected':
        return <Badge variant="error">مرفوض</Badge>;
      default:
        return <Badge variant="default">{status}</Badge>;
    }
  };

  const getTypeBadge = (type: string) => {
    const typeMap: Record<string, { label: string; variant: 'info' | 'success' | 'warning' | 'error' | 'default' }> = {
      'Excavation': { label: 'حفر', variant: 'info' },
      'Concrete': { label: 'خرسانة', variant: 'success' },
      'Earthworks': { label: 'أعمال ترابية', variant: 'warning' },
      'Roads': { label: 'طرق', variant: 'default' },
      'Steel': { label: 'حديد', variant: 'error' },
    };
    const typeInfo = typeMap[type] || { label: type, variant: 'default' as const };
    return <Badge variant={typeInfo.variant}>{typeInfo.label}</Badge>;
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
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-purple-50 rounded-lg">
            <FileText className="w-6 h-6 text-purple-600" />
          </div>
          <div>
            <h1 className="heading-1">تقرير ملخص الكميات (QS)</h1>
            <p className="text-sm text-gray-500">عرض وتحليل كشوفات الكميات للمشاريع</p>
          </div>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" onClick={handlePrint}>
            <Printer className="w-4 h-4 ml-2" />
            طباعة
          </Button>
          <Button onClick={handleExport}>
            <Download className="w-4 h-4 ml-2" />
            تصدير Excel
          </Button>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-3 sm:gap-4 mb-4 sm:mb-6">
        <Card className="bg-gradient-to-br from-purple-50 to-purple-100 border-purple-200">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-sm text-purple-600 font-medium mb-1">إجمالي الكشوف</p>
              <p className="text-2xl font-bold text-purple-900">{formatNumber(totalQS)}</p>
            </div>
            <div className="p-2 bg-purple-200 rounded-lg">
              <FileText className="w-5 h-5 text-purple-700" />
            </div>
          </div>
        </Card>

        <Card className="bg-gradient-to-br from-green-50 to-green-100 border-green-200">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-sm text-green-600 font-medium mb-1">إجمالي المبالغ</p>
              <p className="text-2xl font-bold text-green-900">{formatCurrency(totalAmount)}</p>
            </div>
            <div className="p-2 bg-green-200 rounded-lg">
              <FileText className="w-5 h-5 text-green-700" />
            </div>
          </div>
        </Card>

        <Card className="bg-gradient-to-br from-blue-50 to-blue-100 border-blue-200">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-sm text-blue-600 font-medium mb-1">إجمالي الكميات</p>
              <p className="text-2xl font-bold text-blue-900">{formatNumber(totalQuantity)}</p>
            </div>
            <div className="p-2 bg-blue-200 rounded-lg">
              <FileText className="w-5 h-5 text-blue-700" />
            </div>
          </div>
        </Card>

        <Card className="bg-gradient-to-br from-teal-50 to-teal-100 border-teal-200">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-sm text-teal-600 font-medium mb-1">المعتمدة</p>
              <p className="text-2xl font-bold text-teal-900">{formatNumber(approvedCount)}</p>
            </div>
            <div className="p-2 bg-teal-200 rounded-lg">
              <CheckCircle className="w-5 h-5 text-teal-700" />
            </div>
          </div>
        </Card>

        <Card className="bg-gradient-to-br from-indigo-50 to-indigo-100 border-indigo-200">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-sm text-indigo-600 font-medium mb-1">المربوطة بمستخلصات</p>
              <p className="text-2xl font-bold text-indigo-900">{formatNumber(linkedCount)}</p>
            </div>
            <div className="p-2 bg-indigo-200 rounded-lg">
              <Link2 className="w-5 h-5 text-indigo-700" />
            </div>
          </div>
        </Card>
      </div>

      {/* Filters */}
      <Card className="mb-6">
        <div className="flex items-center gap-2 mb-4">
          <Filter className="w-4 h-4 text-gray-500" />
          <h3 className="font-semibold text-gray-700">الفلاتر</h3>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 md:gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">المشروع</label>
            <select
              value={selectedProject}
              onChange={(e) => setSelectedProject(e.target.value)}
              className="input-field"
            >
              <option value="all">جميع المشاريع</option>
              {projects.map(project => (
                <option key={project} value={project}>{project}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">نوع العمل</label>
            <select
              value={selectedType}
              onChange={(e) => setSelectedType(e.target.value)}
              className="input-field"
            >
              <option value="all">جميع الأنواع</option>
              {types.map(type => (
                <option key={type} value={type}>{type}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">الحالة</label>
            <select
              value={selectedStatus}
              onChange={(e) => setSelectedStatus(e.target.value)}
              className="input-field"
            >
              <option value="all">جميع الحالات</option>
              <option value="Approved">معتمد</option>
              <option value="Pending">قيد المراجعة</option>
              <option value="Rejected">مرفوض</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">الفترة الزمنية</label>
            <div className="flex gap-2">
              <input type="date" className="input-field flex-1" />
            </div>
          </div>
        </div>
      </Card>

      {/* Data Table */}
      <Card>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="px-4 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                  رقم الكشف
                </th>
                <th className="px-4 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                  التاريخ
                </th>
                <th className="px-4 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                  المشروع
                </th>
                <th className="px-4 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                  الوصف
                </th>
                <th className="px-4 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                  النوع
                </th>
                <th className="px-4 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                  الكمية
                </th>
                <th className="px-4 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                  الوحدة
                </th>
                <th className="px-4 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                  سعر الوحدة
                </th>
                <th className="px-4 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                  الإجمالي
                </th>
                <th className="px-4 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                  الحالة
                </th>
                <th className="px-4 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                  المستخلص المرتبط
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredData.map((qs) => (
                <tr key={qs.id} className="hover:bg-gray-50 transition-colors">
                  <td className="px-4 py-3 whitespace-nowrap">
                    <span className="text-sm font-medium text-purple-600">{qs.qsNumber}</span>
                  </td>
                  <td className="px-4 py-3 whitespace-nowrap">
                    <div className="flex items-center text-sm text-gray-600">
                      <Calendar className="w-4 h-4 ml-1" />
                      {qs.date}
                    </div>
                  </td>
                  <td className="px-4 py-3">
                    <span className="text-sm text-gray-900">{qs.project}</span>
                  </td>
                  <td className="px-4 py-3">
                    <span className="text-sm text-gray-600">{qs.description}</span>
                  </td>
                  <td className="px-4 py-3 whitespace-nowrap">
                    {getTypeBadge(qs.type)}
                  </td>
                  <td className="px-4 py-3 whitespace-nowrap">
                    <span className="text-sm font-semibold text-gray-900">{formatNumber(qs.quantity)}</span>
                  </td>
                  <td className="px-4 py-3 whitespace-nowrap">
                    <span className="text-sm text-gray-600">{qs.unit}</span>
                  </td>
                  <td className="px-4 py-3 whitespace-nowrap">
                    <span className="text-sm text-gray-900">{formatCurrency(qs.unitPrice)}</span>
                  </td>
                  <td className="px-4 py-3 whitespace-nowrap">
                    <span className="text-sm font-semibold text-green-600">{formatCurrency(qs.totalAmount)}</span>
                  </td>
                  <td className="px-4 py-3 whitespace-nowrap">
                    {getStatusBadge(qs.status)}
                  </td>
                  <td className="px-4 py-3 whitespace-nowrap">
                    {qs.linkedCertificate ? (
                      <div className="flex items-center text-sm text-blue-600 font-medium">
                        <Link2 className="w-3 h-3 ml-1" />
                        {qs.linkedCertificate}
                      </div>
                    ) : (
                      <span className="text-sm text-gray-400">-</span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {filteredData.length === 0 && (
          <div className="text-center py-12">
            <FileText className="w-12 h-12 text-gray-300 mx-auto mb-4" />
            <p className="text-gray-500">لا توجد بيانات متاحة</p>
          </div>
        )}
      </Card>
    </div>
  );
};

export default QSSummaryReport;
