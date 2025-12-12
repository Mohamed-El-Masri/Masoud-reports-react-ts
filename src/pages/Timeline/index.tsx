import { useTranslation } from 'react-i18next';

const Timeline = () => {
  const { t } = useTranslation();
  return (
    <div className="page-container">
      <h1 className="heading-1">{t('nav.timeline')}</h1>
      <p className="mt-4 text-gray-600">صفحة الخط الزمني - قريباً...</p>
    </div>
  );
};

export default Timeline;
