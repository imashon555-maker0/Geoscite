import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Header from './components/common/Header';
import Home from './pages/Home';
import MapPage from './pages/Map';
import QuizRoad from './pages/QuizRoad';

const App: React.FC = () => {
  return (
    <div className="App">
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/search" element={<div>Search Page</div>} />
        <Route path="/map" element={<MapPage />} />
        <Route path="/quiz" element={<QuizRoad />} />
        <Route path="/games" element={<div>Games Page</div>} />
       会議        <Route path="/settings" element={<div>Settings Page</div>} />
      </Routes>
    </div>
  );
};

export default App;
