import React from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { MapPin, Search, Trophy, Gamepad2, ChevronRight } from 'lucide-react';

const Home = () => {
  const { t } = useTranslation();

  const features = [
    {
      title: 'Explore Artifacts Map',
      description: 'Discover ancient sites around the world with interactive markers.',
      link: '/map',
      icon: MapPin,
      color: 'from-blue-500 to-cyan-500',
    },
    {
      title: 'AI Archaeology Search',
      description: 'Use smart search to explore archaeology topics and historical facts.',
      link: '/search',
      icon: Search,
      color: 'from-green-500 to-teal-500',
    },
    {
      title: 'Quiz Road Journey',
      description: 'Test your knowledge with progressive quizzes and earn badges.',
      link: '/quiz',
      icon: Trophy,
      color: 'from-purple-500 to-indigo-500',
    },
    {
      title: 'Fun Archaeology Games',
      description: 'Play engaging games like artifact matching and timeline challenges.',
      link: '/games',
      icon: Gamepad2,
      color: 'from-pink-500 to-rose-500',
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 to-orange-100">
      {/* Hero Section */}
      <div className="relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="text-center">
            <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6">
              <span className="inline-block transform hover:scale-105 transition-transform">
                🏛️ {t('welcome')}
              </span>
            </h1>
            <p className="text-xl md:text-2xl text-gray-600 mb-8 max-w-3xl mx-auto leading-relaxed">
              Embark on an archaeological adventure! Explore ancient civilizations, solve puzzles, and uncover the mysteries of the past through interactive learning.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                to="/map"
                className="bg-amber-600 hover:bg-amber-700 text-white font-bold py-3 px-8 rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center"
              >
                <MapPin className="mr-2" size={20} />
                Start Exploring
              </Link>
              <Link
                to="/quiz"
                className="bg-white hover:bg-gray-50 text-amber-600 font-bold py-3 px-8 rounded-lg shadow-lg border-2 border-amber-600 hover:border-amber-700 transition-all duration-300 flex items-center justify-center"
              >
                <Trophy className="mr-2" size={20} />
                Take a Quiz
              </Link>
            </div>
          </div>
        </div>

        {/* Decorative background elements */}
        <div className="absolute top-0 right-0 -mt-4 -mr-4 w-72 h-72 bg-amber-300 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse"></div>
        <div className="absolute bottom-0 left-0 -mb-4 -ml-4 w-96 h-96 bg-orange-300 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse"></div>
      </div>

      {/* Features Section */}
      <div className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Discover the Past
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Choose your learning path and dive into the fascinating world of archaeology through our interactive features.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature) => {
              const Icon = feature.icon;
              return (
                <div key={feature.title} className="group">
                  <Link to={feature.link} className="block">
                    <div className="bg-white rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 p-6 h-full">
                      <div className={`w-14 h-14 rounded-full bg-gradient-to-r ${feature.color} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
                        <Icon size={24} className="text-white" />
                      </div>
                      <h3 className="text-xl font-semibold text-gray-900 mb-2 group-hover:text-amber-600 transition-colors">
                        {feature.title}
                      </h3>
                      <p className="text-gray-600 mb-4 leading-relaxed">
                        {feature.description}
                      </p>
                      <div className="flex items-center text-amber-600 font-medium group-hover:text-amber-700 transition-colors">
                        <span>Explore</span>
                        <ChevronRight size={16} className="ml-1 transition-transform group-hover:translate-x-1" />
                      </div>
                    </div>
                  </Link>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Stats Section */}
      <div className="py-16 bg-gradient-to-r from-amber-600 to-orange-600">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-white">
              <div className="text-4xl font-bold mb-2">3</div>
              <div className="text-amber-100">Languages Supported</div>
            </div>
            <div className="text-white">
              <div className="text-4xl font-bold mb-2">10+</div>
              <div className="text-amber-100">Historical Sites</div>
            </div>
            <div className="text-white">
              <div className="text-4xl font-bold mb-2">∞</div>
              <div className="text-amber-100">Discoveries to Make</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
