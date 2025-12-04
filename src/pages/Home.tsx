import React from 'react';
import { useTranslation } from 'react-i18next';

const Home: React.FC = () => {
  const { t } = useTranslation();

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">{t('welcome')}</h2>
      <p>Learn about archaeology through interactive maps, quizzes, and games.</p>
    </div>
  );
};

export default Home;
