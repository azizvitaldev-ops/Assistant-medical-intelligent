
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Stethoscope, History, Info, MessageSquare } from 'lucide-react';
import { APP_NAME } from '../constants';

const Navbar: React.FC = () => {
  const location = useLocation();

  const navItems = [
    { path: '/', label: 'Accueil', icon: <Stethoscope size={20} /> },
    { path: '/assistant', label: 'Assistant', icon: <MessageSquare size={20} /> },
    { path: '/history', label: 'Historique', icon: <History size={20} /> },
    { path: '/about', label: 'À propos', icon: <Info size={20} /> },
  ];

  return (
    <nav className="bg-white border-b border-slate-200 sticky top-0 z-50 no-print">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="flex items-center space-x-2">
              <div className="bg-blue-600 p-2 rounded-lg text-white">
                <Stethoscope size={24} />
              </div>
              <span className="text-xl font-bold text-slate-800 hidden sm:block">{APP_NAME}</span>
            </Link>
          </div>
          <div className="flex items-center space-x-1 sm:space-x-4">
            {navItems.map((item) => {
              const isActive = location.pathname === item.path;
              return (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`flex items-center space-x-1 px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                    isActive 
                      ? 'text-blue-600 bg-blue-50' 
                      : 'text-slate-600 hover:text-blue-600 hover:bg-slate-50'
                  }`}
                >
                  {item.icon}
                  <span className="hidden md:block">{item.label}</span>
                </Link>
              );
            })}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
