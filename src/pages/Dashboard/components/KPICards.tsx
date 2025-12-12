import { useTranslation } from 'react-i18next';
import Card, { CardContent } from '@components/ui/Card';
import { formatCurrency, formatNumber, formatPercentage } from '@utils/helpers';
import { TrendingUp, TrendingDown, Minus, DollarSign, FileText, Package, Fuel, Cog, PiggyBank } from 'lucide-react';
import type { DashboardData } from '@/types/models';

interface KPICardsProps {
  data?: DashboardData['kpis'];
}

const KPICards = ({ data }: KPICardsProps) => {
  const { t } = useTranslation();

  if (!data) {
    return null;
  }

  const kpis = [
    {
      label: t('dashboard.kpis.executedValue'),
      value: formatCurrency(data.executedValue),
      icon: DollarSign,
      color: 'text-success-600',
      bgColor: 'bg-success-50 dark:bg-success-900/20',
      trend: 'up' as const,
      trendValue: 12.5,
    },
    {
      label: t('dashboard.kpis.outstandingQS'),
      value: formatCurrency(data.outstandingQSValue),
      icon: FileText,
      color: 'text-warning-600',
      bgColor: 'bg-warning-50 dark:bg-warning-900/20',
      trend: 'neutral' as const,
    },
    {
      label: t('dashboard.kpis.openItems'),
      value: formatNumber(data.openItemsCount, 0),
      icon: Package,
      color: 'text-info-600',
      bgColor: 'bg-info-50 dark:bg-info-900/20',
      trend: 'down' as const,
      trendValue: 8.2,
    },
    {
      label: t('dashboard.kpis.fuelConsumption'),
      value: `${formatNumber(data.fuelConsumptionMonthly, 0)} لتر`,
      icon: Fuel,
      color: 'text-orange-600',
      bgColor: 'bg-orange-50 dark:bg-orange-900/20',
      trend: 'up' as const,
      trendValue: 5.1,
    },
    {
      label: t('dashboard.kpis.equipmentUtilization'),
      value: formatPercentage(data.equipmentUtilization),
      icon: Cog,
      color: 'text-purple-600',
      bgColor: 'bg-purple-50 dark:bg-purple-900/20',
      trend: 'up' as const,
      trendValue: 3.7,
    },
    {
      label: t('dashboard.kpis.netProfit'),
      value: formatCurrency(data.netProfit),
      icon: PiggyBank,
      color: 'text-primary-600',
      bgColor: 'bg-primary-50 dark:bg-primary-900/20',
      trend: 'up' as const,
      trendValue: 15.3,
    },
  ];

  const getTrendIcon = (trend: 'up' | 'down' | 'neutral') => {
    switch (trend) {
      case 'up':
        return <TrendingUp className="h-4 w-4" />;
      case 'down':
        return <TrendingDown className="h-4 w-4" />;
      default:
        return <Minus className="h-4 w-4" />;
    }
  };

  const getTrendColor = (trend: 'up' | 'down' | 'neutral') => {
    switch (trend) {
      case 'up':
        return 'text-success-600';
      case 'down':
        return 'text-error-600';
      default:
        return 'text-gray-600';
    }
  };

  return (
    <div className="mb-6 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {kpis.map((kpi, index) => {
        const Icon = kpi.icon;

        return (
          <Card key={index} hover className="transition-all duration-200">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div className="flex-1">
                  <p className="mb-1 text-sm font-medium text-gray-600 dark:text-gray-400">
                    {kpi.label}
                  </p>
                  <p className="text-2xl font-bold text-gray-900 dark:text-white">
                    {kpi.value}
                  </p>

                  {kpi.trendValue && (
                    <div className={`mt-2 flex items-center gap-1 text-sm ${getTrendColor(kpi.trend)}`}>
                      {getTrendIcon(kpi.trend)}
                      <span className="font-medium">{formatPercentage(kpi.trendValue, 1)}</span>
                      <span className="text-xs text-gray-500">عن الشهر السابق</span>
                    </div>
                  )}
                </div>

                <div className={`rounded-lg p-3 ${kpi.bgColor}`}>
                  <Icon className={`h-6 w-6 ${kpi.color}`} />
                </div>
              </div>
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
};

export default KPICards;
