import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Languages, MapPin, Search, Trophy, Gamepad2, Settings, Home } from 'lucide-react';

const Header: React.FC = () => {
  const { t, i18n } = useTranslation();
  const location = useLocation();

  const handleLanguageChange = (lang: string) => {
    i18n.changeLanguage(lang);
  };

  const navItems = [
    { path: '/', label: t('nav.home'), icon: Home },
    { path: '/search', label: t('nav.search'), icon: Search },
    { path: '/map', label: t('nav.map'), icon: MapPin },
    { path: '/quiz', label: t('nav.quiz'), icon: Trophy },
    { path: '/games', label: t('nav.games'), icon: Gamepad2 },
    { path: '/settings', label: t('nav.settings'), icon: Settings },
  ];

  return (
    <header className="bg-gradient-to-r from-amber-600 to-orange-600 shadow-lg">
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center">
            <Link to="/" className="text-2xl font-bold text-white hover:text-amber-100 transition-colors">
              🏛️ Geoscite
            </Link>
          </div>
          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-4">
              {navItems.map((item) => {
                const Icon = item.icon;
                const isActive = location.pathname === item.path;
                return (
                  <Link
                    key={item.path}
                    to={item.path}
                    className={`flex items-center px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                      isActive
                        ? 'bg-white text-amber-600'
                        : 'text-white hover:bg-white/10 hover:text-amber-100'
                    }`}
                  >
                    <Icon size={18} className="mr-2" />
                    {item.label}
                  </Link>
                );
              })}
            </div>
          </div>
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <Languages size={20} className="text-white" />
              <select
                onChange={(e) => handleLanguageChange(e.target.value)}
                className="bg-transparent border border-white text-white px-3 py-1 rounded-md focus:outline-none focus:ring-2 focus:ring-white"
                value={i18n.language}
              >
                <option value="en" className="text-black">EN</option>
                <option value="ru" className="text-black">RU</option>
                <option value="kz" className="text-black">KZ</option>
              </select>
            </div>
          </div>
        </div>
        {/* Mobile menu */}
        <div className="md:hidden">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = location.pathname === item.path;
              return (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`flex items-center px-3 py-2 rounded-md text-base font-medium ${
                    isActive
                      ? 'bg-white text-amber-600'
                      : 'text-white hover:bg-white/10 hover:text-amber-100'
                  }`}
                >
                  <Icon size={18} className="mr-2" />
                  {item.label}
                </Link>
              );
            })}
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Header;
