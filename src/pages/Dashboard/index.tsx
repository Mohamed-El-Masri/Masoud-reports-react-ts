import { useTranslation } from 'react-i18next';
import Card, { CardContent } from '@components/ui/Card';
import Loading from '@components/ui/Loading';
import { useDashboard } from '@hooks/useDashboard';
import KPICards from './components/KPICards';
import ChartsSection from './components/ChartsSection';
import AlertsSection from './components/AlertsSection';

const Dashboard = () => {
  const { t } = useTranslation();
  const { data, isLoading, error } = useDashboard();

  if (isLoading) {
    return <Loading fullScreen text={t('common.loading')} />;
  }

  if (error) {
    return (
      <div className="flex items-center justify-center h-full">
        <Card className="max-w-md">
          <CardContent className="text-center py-8">
            <p className="text-error-600">{t('errors.generic')}</p>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="page-container">
      {/* Header */}
      <div className="mb-6">
        <h1 className="heading-1 mb-2">{t('dashboard.title')}</h1>
        <p className="text-gray-600 dark:text-gray-400">
          {t('dashboard.welcome')} {new Date().toLocaleDateString('ar-EG', { dateStyle: 'full' })}
        </p>
      </div>

      {/* KPIs */}
      <KPICards data={data?.kpis} />

      {/* Charts */}
      <ChartsSection data={data?.charts} />

      {/* Alerts */}
      <AlertsSection alerts={data?.alerts || []} />
    </div>
  );
};

export default Dashboard;
