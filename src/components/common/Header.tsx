import React from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Languages } from 'lucide-react';

const Header: React.FC = () => {
  const { t, i18n } = useTranslation();

  const handleLanguageChange = (lang: string) => {
    i18n.changeLanguage(lang);
  };

  return (
    <header className="bg-gray-800 text-white p-4">
      <nav className="flex justify-between items-center">
        <h1 className="text-xl font-bold">Geoscite</h1>
        <ul className="flex space-x-4">
          <li><Link to="/" className="hover:underline">{t('nav.home')}</Link></li>
          <li><Link to="/search" className="hover:underline">{t('nav.search')}</Link></li>
          <li><Link to="/map" className="hover:underline">{t('nav.map')}</Link></li>
          <li><Link to="/quiz" className="hover:underline">{t('nav.quiz')}</Link></li>
          <li><Link to="/games" className="hover:underline">{t('nav.games')}</Link></li>
          <li><Link to="/settings" className="hover:underline">{t('nav.settings')}</Link></li>
        </ul>
        <div className="flex items-center space-x-2">
          <Languages size={20} />
          <select
            onChange={(e) => handleLanguageChange(e.target.value)}
            className="bg-gray-700 text-white p-1"
            value={i18n.language}
          >
            <option value="en">EN</option>
            <option value="ru">RU</option>
            <option value="kz">KZ</option>
          </select>
        </div>
      </nav>
    </header>
  );
};

export default Header;
