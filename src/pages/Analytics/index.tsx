import { useTranslation } from 'react-i18next';

const Analytics = () => {
  const { t } = useTranslation();
  return (
    <div className="page-container">
      <h1 className="heading-1">{t('nav.analytics')}</h1>
      <p className="mt-4 text-gray-600">صفحة التحليلات والبحث المتقدم - قريباً...</p>
    </div>
  );
};

export default Analytics;
