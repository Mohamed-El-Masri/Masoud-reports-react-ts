import { useState } from 'react';
import { DollarSign, Calendar, Filter, Download, Printer, CheckCircle, Users, Package, Truck } from 'lucide-react';
import Card from '@/components/ui/Card';
import Button from '@/components/ui/Button';
import Badge from '@/components/ui/Badge';
import { mockDirectCostsData } from '@/data/mockReportsData';
import { formatCurrency, formatNumber } from '@/utils/helpers';

const DirectCostsReport = () => {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedPaymentStatus, setSelectedPaymentStatus] = useState('all');
  const [selectedProject, setSelectedProject] = useState('all');

  // Filter data
  const filteredData = mockDirectCostsData.filter(cost => {
    if (selectedCategory !== 'all' && cost.category !== selectedCategory) return false;
    if (selectedPaymentStatus !== 'all' && cost.paymentStatus !== selectedPaymentStatus) return false;
    if (selectedProject !== 'all' && cost.project !== selectedProject) return false;
    return true;
  });

  // Calculate statistics
  const totalCosts = filteredData.reduce((sum, cost) => sum + cost.totalCost, 0);
  const laborCosts = filteredData.filter(c => c.category === 'Labor').reduce((sum, cost) => sum + cost.totalCost, 0);
  const materialCosts = filteredData.filter(c => c.category === 'Material').reduce((sum, cost) => sum + cost.totalCost, 0);
  const equipmentCosts = filteredData.filter(c => c.category === 'Equipment').reduce((sum, cost) => sum + cost.totalCost, 0);
  const paidCount = filteredData.filter(c => c.paymentStatus === 'Paid').length;

  // Get unique values
  const projects = [...new Set(mockDirectCostsData.map(cost => cost.project))];
  const categories = [...new Set(mockDirectCostsData.map(cost => cost.category))];

  const getCategoryBadge = (category: string) => {
    const categoryMap: Record<string, { label: string; variant: 'info' | 'success' | 'warning' | 'error' | 'default' }> = {
      'Labor': { label: 'عمالة', variant: 'info' },
      'Material': { label: 'مواد', variant: 'success' },
      'Equipment': { label: 'معدات', variant: 'warning' },
      'Fuel': { label: 'وقود', variant: 'error' },
      'Subcontractor': { label: 'مقاولي باطن', variant: 'default' },
    };
    const catInfo = categoryMap[category] || { label: category, variant: 'default' as const };
    return <Badge variant={catInfo.variant}>{catInfo.label}</Badge>;
  };

  const getPaymentStatusBadge = (status: string) => {
    switch (status) {
      case 'Paid':
        return <Badge variant="success">مدفوع</Badge>;
      case 'Partial':
        return <Badge variant="warning">مدفوع جزئياً</Badge>;
      case 'Unpaid':
        return <Badge variant="error">غير مدفوع</Badge>;
      default:
        return <Badge variant="default">{status}</Badge>;
    }
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
          <div className="p-2 bg-orange-50 rounded-lg">
            <DollarSign className="w-6 h-6 text-orange-600" />
          </div>
          <div>
            <h1 className="heading-1">تقرير التكاليف المباشرة</h1>
            <p className="text-sm text-gray-500">تحليل التكاليف المباشرة للمشاريع</p>
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
        <Card className="bg-gradient-to-br from-orange-50 to-orange-100 border-orange-200">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-sm text-orange-600 font-medium mb-1">إجمالي التكاليف</p>
              <p className="text-2xl font-bold text-orange-900">{formatCurrency(totalCosts)}</p>
            </div>
            <div className="p-2 bg-orange-200 rounded-lg">
              <DollarSign className="w-5 h-5 text-orange-700" />
            </div>
          </div>
        </Card>

        <Card className="bg-gradient-to-br from-blue-50 to-blue-100 border-blue-200">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-sm text-blue-600 font-medium mb-1">تكاليف العمالة</p>
              <p className="text-2xl font-bold text-blue-900">{formatCurrency(laborCosts)}</p>
            </div>
            <div className="p-2 bg-blue-200 rounded-lg">
              <Users className="w-5 h-5 text-blue-700" />
            </div>
          </div>
        </Card>

        <Card className="bg-gradient-to-br from-green-50 to-green-100 border-green-200">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-sm text-green-600 font-medium mb-1">تكاليف المواد</p>
              <p className="text-2xl font-bold text-green-900">{formatCurrency(materialCosts)}</p>
            </div>
            <div className="p-2 bg-green-200 rounded-lg">
              <Package className="w-5 h-5 text-green-700" />
            </div>
          </div>
        </Card>

        <Card className="bg-gradient-to-br from-amber-50 to-amber-100 border-amber-200">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-sm text-amber-600 font-medium mb-1">تكاليف المعدات</p>
              <p className="text-2xl font-bold text-amber-900">{formatCurrency(equipmentCosts)}</p>
            </div>
            <div className="p-2 bg-amber-200 rounded-lg">
              <Truck className="w-5 h-5 text-amber-700" />
            </div>
          </div>
        </Card>

        <Card className="bg-gradient-to-br from-teal-50 to-teal-100 border-teal-200">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-sm text-teal-600 font-medium mb-1">المدفوعات</p>
              <p className="text-2xl font-bold text-teal-900">{formatNumber(paidCount)}</p>
            </div>
            <div className="p-2 bg-teal-200 rounded-lg">
              <CheckCircle className="w-5 h-5 text-teal-700" />
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
            <label className="block text-sm font-medium text-gray-700 mb-2">الفئة</label>
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="input-field"
            >
              <option value="all">جميع الفئات</option>
              {categories.map(category => (
                <option key={category} value={category}>{category}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">حالة الدفع</label>
            <select
              value={selectedPaymentStatus}
              onChange={(e) => setSelectedPaymentStatus(e.target.value)}
              className="input-field"
            >
              <option value="all">جميع الحالات</option>
              <option value="Paid">مدفوع</option>
              <option value="Partial">مدفوع جزئياً</option>
              <option value="Unpaid">غير مدفوع</option>
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
                  التاريخ
                </th>
                <th className="px-4 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                  المشروع
                </th>
                <th className="px-4 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                  الفئة
                </th>
                <th className="px-4 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                  الوصف
                </th>
                <th className="px-4 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                  الكمية
                </th>
                <th className="px-4 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                  الوحدة
                </th>
                <th className="px-4 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                  تكلفة الوحدة
                </th>
                <th className="px-4 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                  الإجمالي
                </th>
                <th className="px-4 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                  المورد
                </th>
                <th className="px-4 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                  حالة الدفع
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredData.map((cost) => (
                <tr key={cost.id} className="hover:bg-gray-50 transition-colors">
                  <td className="px-4 py-3 whitespace-nowrap">
                    <div className="flex items-center text-sm text-gray-600">
                      <Calendar className="w-4 h-4 ml-1" />
                      {cost.date}
                    </div>
                  </td>
                  <td className="px-4 py-3">
                    <span className="text-sm text-gray-900">{cost.project}</span>
                  </td>
                  <td className="px-4 py-3 whitespace-nowrap">
                    {getCategoryBadge(cost.category)}
                  </td>
                  <td className="px-4 py-3">
                    <span className="text-sm text-gray-600">{cost.description}</span>
                  </td>
                  <td className="px-4 py-3 whitespace-nowrap">
                    <span className="text-sm font-semibold text-gray-900">{formatNumber(cost.quantity)}</span>
                  </td>
                  <td className="px-4 py-3 whitespace-nowrap">
                    <span className="text-sm text-gray-600">{cost.unit}</span>
                  </td>
                  <td className="px-4 py-3 whitespace-nowrap">
                    <span className="text-sm text-gray-900">{formatCurrency(cost.unitCost)}</span>
                  </td>
                  <td className="px-4 py-3 whitespace-nowrap">
                    <span className="text-sm font-bold text-orange-600">{formatCurrency(cost.totalCost)}</span>
                  </td>
                  <td className="px-4 py-3">
                    <span className="text-sm text-gray-600">{cost.supplier}</span>
                  </td>
                  <td className="px-4 py-3 whitespace-nowrap">
                    {getPaymentStatusBadge(cost.paymentStatus)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {filteredData.length === 0 && (
          <div className="text-center py-12">
            <DollarSign className="w-12 h-12 text-gray-300 mx-auto mb-4" />
            <p className="text-gray-500">لا توجد بيانات متاحة</p>
          </div>
        )}
      </Card>
    </div>
  );
};

export default DirectCostsReport;
