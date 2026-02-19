
import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Assistant from './pages/Assistant';
import History from './pages/History';
import About from './pages/About';

const App: React.FC = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-1">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/assistant" element={<Assistant />} />
          <Route path="/history" element={<History />} />
          <Route path="/about" element={<About />} />
        </Routes>
      </main>
      
      {/* Sticky Bottom Warning */}
      <div className="no-print sticky bottom-0 z-40 bg-slate-900 text-white py-2 px-4 text-center text-[10px] md:text-xs">
        <p className="max-w-4xl mx-auto opacity-90">
          ⚠️ <strong>Avertissement :</strong> Cet assistant utilise l'IA pour le triage uniquement. 
          Il ne remplace pas un professionnel de santé. En cas d'urgence, composez le <strong>15 (SAMU)</strong>.
        </p>
      </div>
    </div>
  );
};

export default App;
