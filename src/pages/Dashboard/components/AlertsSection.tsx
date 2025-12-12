import Card, { CardHeader, CardTitle, CardContent } from '@components/ui/Card';
import Badge from '@components/ui/Badge';
import { AlertTriangle, Info, AlertCircle, CheckCircle } from 'lucide-react';
import { formatDate } from '@utils/helpers';
import type { Alert } from '@/types/models';

interface AlertsSectionProps {
  alerts: Alert[];
}

const AlertsSection = ({ alerts }: AlertsSectionProps) => {
  const getAlertIcon = (type: Alert['type']) => {
    switch (type) {
      case 'error':
        return <AlertCircle className="h-5 w-5 text-error-600" />;
      case 'warning':
        return <AlertTriangle className="h-5 w-5 text-warning-600" />;
      case 'info':
        return <Info className="h-5 w-5 text-info-600" />;
      case 'success':
        return <CheckCircle className="h-5 w-5 text-success-600" />;
    }
  };

  const getAlertColor = (type: Alert['type']) => {
    switch (type) {
      case 'error':
        return 'border-error-200 bg-error-50 dark:border-error-800 dark:bg-error-900/20';
      case 'warning':
        return 'border-warning-200 bg-warning-50 dark:border-warning-800 dark:bg-warning-900/20';
      case 'info':
        return 'border-info-200 bg-info-50 dark:border-info-800 dark:bg-info-900/20';
      case 'success':
        return 'border-success-200 bg-success-50 dark:border-success-800 dark:bg-success-900/20';
    }
  };

  // Mock alerts if none provided
  const displayAlerts: Alert[] =
    alerts.length > 0
      ? alerts
      : [
          {
            id: '1',
            type: 'warning',
            title: 'بند مغلق بدون مقايسة',
            message: 'البند "حفر وردم" في الموقع A تم إغلاقه بدون ربطه بمقايسة',
            date: new Date().toISOString(),
            read: false,
          },
          {
            id: '2',
            type: 'info',
            title: 'مستخلص معلق',
            message: 'المستخلص رقم PC-2024-05 في انتظار الاعتماد',
            date: new Date().toISOString(),
            read: false,
          },
          {
            id: '3',
            type: 'warning',
            title: 'وقود غير مخصص',
            message: '1500 لتر من فاتورة الوقود #INV-2024-025 لم يتم تخصيصها',
            date: new Date().toISOString(),
            read: false,
          },
        ];

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <AlertTriangle className="h-5 w-5" />
          التنبيهات
          {displayAlerts.filter(a => !a.read).length > 0 && (
            <Badge variant="error" size="sm">
              {displayAlerts.filter(a => !a.read).length}
            </Badge>
          )}
        </CardTitle>
      </CardHeader>
      <CardContent>
        {displayAlerts.length === 0 ? (
          <div className="py-8 text-center text-gray-500">
            <CheckCircle className="mx-auto mb-2 h-12 w-12 text-success-500" />
            <p>لا توجد تنبيهات حالياً</p>
          </div>
        ) : (
          <div className="space-y-3">
            {displayAlerts.map(alert => (
              <div
                key={alert.id}
                className={`flex items-start gap-3 rounded-lg border p-4 ${getAlertColor(alert.type)}`}
              >
                <div className="shrink-0">{getAlertIcon(alert.type)}</div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between gap-2">
                    <h4 className="font-semibold text-gray-900 dark:text-white">{alert.title}</h4>
                    <span className="shrink-0 text-xs text-gray-500">
                      {formatDate(alert.date)}
                    </span>
                  </div>
                  <p className="mt-1 text-sm text-gray-700 dark:text-gray-300">{alert.message}</p>
                  {alert.action && (
                    <button className="mt-2 text-sm font-medium text-primary-600 hover:underline">
                      {alert.action.label}
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default AlertsSection;
