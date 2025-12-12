import { useState } from 'react';
import { FileCheck, Calendar, Filter, Download, Printer, CheckCircle, Clock } from 'lucide-react';
import Card from '@/components/ui/Card';
import Button from '@/components/ui/Button';
import Badge from '@/components/ui/Badge';
import { mockCertificatesData } from '@/data/mockReportsData';
import { formatCurrency, formatNumber } from '@/utils/helpers';

const CertificatesReport = () => {
  const [selectedStatus, setSelectedStatus] = useState('all');
  const [selectedPaymentStatus, setSelectedPaymentStatus] = useState('all');
  const [selectedProject, setSelectedProject] = useState('all');

  // Filter data
  const filteredData = mockCertificatesData.filter(cert => {
    if (selectedStatus !== 'all' && cert.status !== selectedStatus) return false;
    if (selectedPaymentStatus !== 'all' && cert.paymentStatus !== selectedPaymentStatus) return false;
    if (selectedProject !== 'all' && cert.project !== selectedProject) return false;
    return true;
  });

  // Calculate statistics
  const totalCertificates = filteredData.length;
  const totalAmount = filteredData.reduce((sum, cert) => sum + cert.amount, 0);
  const totalPaid = filteredData.reduce((sum, cert) => sum + cert.paidAmount, 0);
  const approvedCount = filteredData.filter(cert => cert.status === 'Approved').length;
  const pendingCount = filteredData.filter(cert => cert.status === 'Pending').length;

  // Get unique projects
  const projects = [...new Set(mockCertificatesData.map(cert => cert.project))];

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
          <div className="p-2 bg-blue-50 rounded-lg">
            <FileCheck className="w-6 h-6 text-blue-600" />
          </div>
          <div>
            <h1 className="heading-1">تقرير المستخلصات</h1>
            <p className="text-sm text-gray-500">عرض وإدارة المستخلصات المالية للمشاريع</p>
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
        <Card className="bg-gradient-to-br from-blue-50 to-blue-100 border-blue-200">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-sm text-blue-600 font-medium mb-1">إجمالي المستخلصات</p>
              <p className="text-2xl font-bold text-blue-900">{formatNumber(totalCertificates)}</p>
            </div>
            <div className="p-2 bg-blue-200 rounded-lg">
              <FileCheck className="w-5 h-5 text-blue-700" />
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
              <FileCheck className="w-5 h-5 text-green-700" />
            </div>
          </div>
        </Card>

        <Card className="bg-gradient-to-br from-purple-50 to-purple-100 border-purple-200">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-sm text-purple-600 font-medium mb-1">المبالغ المدفوعة</p>
              <p className="text-2xl font-bold text-purple-900">{formatCurrency(totalPaid)}</p>
            </div>
            <div className="p-2 bg-purple-200 rounded-lg">
              <CheckCircle className="w-5 h-5 text-purple-700" />
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

        <Card className="bg-gradient-to-br from-orange-50 to-orange-100 border-orange-200">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-sm text-orange-600 font-medium mb-1">قيد المراجعة</p>
              <p className="text-2xl font-bold text-orange-900">{formatNumber(pendingCount)}</p>
            </div>
            <div className="p-2 bg-orange-200 rounded-lg">
              <Clock className="w-5 h-5 text-orange-700" />
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
            <label className="block text-sm font-medium text-gray-700 mb-2">حالة الاعتماد</label>
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
                  رقم المستخلص
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
                  رقم QS
                </th>
                <th className="px-4 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                  المبلغ
                </th>
                <th className="px-4 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                  حالة الاعتماد
                </th>
                <th className="px-4 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                  المعتمد من
                </th>
                <th className="px-4 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                  حالة الدفع
                </th>
                <th className="px-4 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                  المبلغ المدفوع
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredData.map((cert) => (
                <tr key={cert.id} className="hover:bg-gray-50 transition-colors">
                  <td className="px-4 py-3 whitespace-nowrap">
                    <span className="text-sm font-medium text-blue-600">{cert.certificateNumber}</span>
                  </td>
                  <td className="px-4 py-3 whitespace-nowrap">
                    <div className="flex items-center text-sm text-gray-600">
                      <Calendar className="w-4 h-4 ml-1" />
                      {cert.date}
                    </div>
                  </td>
                  <td className="px-4 py-3">
                    <span className="text-sm text-gray-900">{cert.project}</span>
                  </td>
                  <td className="px-4 py-3">
                    <span className="text-sm text-gray-600">{cert.description}</span>
                  </td>
                  <td className="px-4 py-3 whitespace-nowrap">
                    <span className="text-sm font-medium text-gray-700">{cert.qsNumber}</span>
                  </td>
                  <td className="px-4 py-3 whitespace-nowrap">
                    <span className="text-sm font-semibold text-gray-900">{formatCurrency(cert.amount)}</span>
                  </td>
                  <td className="px-4 py-3 whitespace-nowrap">
                    {getStatusBadge(cert.status)}
                  </td>
                  <td className="px-4 py-3 whitespace-nowrap">
                    <span className="text-sm text-gray-600">{cert.approvedBy || '-'}</span>
                  </td>
                  <td className="px-4 py-3 whitespace-nowrap">
                    {getPaymentStatusBadge(cert.paymentStatus)}
                  </td>
                  <td className="px-4 py-3 whitespace-nowrap">
                    <span className="text-sm font-semibold text-green-600">{formatCurrency(cert.paidAmount)}</span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {filteredData.length === 0 && (
          <div className="text-center py-12">
            <FileCheck className="w-12 h-12 text-gray-300 mx-auto mb-4" />
            <p className="text-gray-500">لا توجد بيانات متاحة</p>
          </div>
        )}
      </Card>
    </div>
  );
};

export default CertificatesReport;
