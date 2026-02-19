
import React, { useState, useEffect, useMemo } from 'react';
import { Conversation, UrgencyLevel, Role } from '../types';
import { 
  Clock, 
  Calendar, 
  ChevronRight, 
  Trash2, 
  Search, 
  Filter, 
  ArrowUpDown, 
  X, 
  FileText, 
  Download,
  AlertCircle,
  CheckCircle,
  AlertTriangle,
  ExternalLink
} from 'lucide-react';
import { Link } from 'react-router-dom';

const History: React.FC = () => {
  const [history, setHistory] = useState<Conversation[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterLevel, setFilterLevel] = useState<UrgencyLevel | 'ALL'>('ALL');
  const [sortBy, setSortBy] = useState<'date' | 'urgency'>('date');
  const [selectedConversation, setSelectedConversation] = useState<Conversation | null>(null);

  useEffect(() => {
    const historyJson = localStorage.getItem('medical_assistant_history');
    if (historyJson) {
      setHistory(JSON.parse(historyJson));
    }
  }, []);

  const deleteConversation = (id: string, e?: React.MouseEvent) => {
    e?.preventDefault();
    e?.stopPropagation();
    if (confirm("Voulez-vous supprimer cette consultation de l'historique ?")) {
      const updated = history.filter(c => c.id !== id);
      setHistory(updated);
      localStorage.setItem('medical_assistant_history', JSON.stringify(updated));
      if (selectedConversation?.id === id) setSelectedConversation(null);
    }
  };

  const clearAllHistory = () => {
    if (confirm("Êtes-vous sûr de vouloir effacer tout votre historique de triage ? Cette action est irréversible.")) {
      setHistory([]);
      localStorage.removeItem('medical_assistant_history');
    }
  };

  // Stats calculation
  const stats = useMemo(() => {
    return {
      total: history.length,
      critical: history.filter(c => c.urgency === UrgencyLevel.CRITICAL).length,
      moderate: history.filter(c => c.urgency === UrgencyLevel.MODERATE).length,
      low: history.filter(c => c.urgency === UrgencyLevel.LOW).length,
    };
  }, [history]);

  // Filtering and Sorting
  const processedHistory = useMemo(() => {
    let result = history.filter(c => {
      const matchesSearch = c.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                            c.urgency.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesFilter = filterLevel === 'ALL' || c.urgency === filterLevel;
      return matchesSearch && matchesFilter;
    });

    result.sort((a, b) => {
      if (sortBy === 'date') {
        return b.date - a.date;
      } else {
        const priority = {
          [UrgencyLevel.CRITICAL]: 3,
          [UrgencyLevel.MODERATE]: 2,
          [UrgencyLevel.LOW]: 1,
          [UrgencyLevel.UNKNOWN]: 0,
        };
        return priority[b.urgency] - priority[a.urgency];
      }
    });

    return result;
  }, [history, searchTerm, filterLevel, sortBy]);

  const getUrgencyBadge = (level: UrgencyLevel) => {
    switch (level) {
      case UrgencyLevel.CRITICAL:
        return (
          <span className="flex items-center space-x-1 px-2 py-1 bg-red-100 text-red-700 rounded text-[10px] font-bold uppercase tracking-wider">
            <AlertCircle size={10} />
            <span>Critique</span>
          </span>
        );
      case UrgencyLevel.MODERATE:
        return (
          <span className="flex items-center space-x-1 px-2 py-1 bg-orange-100 text-orange-700 rounded text-[10px] font-bold uppercase tracking-wider">
            <AlertTriangle size={10} />
            <span>Modérée</span>
          </span>
        );
      case UrgencyLevel.LOW:
        return (
          <span className="flex items-center space-x-1 px-2 py-1 bg-green-100 text-green-700 rounded text-[10px] font-bold uppercase tracking-wider">
            <CheckCircle size={10} />
            <span>Faible</span>
          </span>
        );
      default:
        return <span className="px-2 py-1 bg-slate-100 text-slate-500 rounded text-[10px] font-bold uppercase tracking-wider">Inconnu</span>;
    }
  };

  return (
    <div className="max-w-6xl mx-auto px-4 py-8 md:py-12">
      {/* Header & Stats Bar */}
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-6">
        <div>
          <h1 className="text-3xl font-extrabold text-slate-900">Historique</h1>
          <p className="text-slate-500 mt-1">Gérez vos évaluations passées.</p>
        </div>

        {history.length > 0 && (
          <div className="flex items-center gap-2 md:gap-4 overflow-x-auto pb-2 md:pb-0 scrollbar-hide">
            <div className="bg-white border border-slate-200 px-4 py-2 rounded-xl flex items-center space-x-3 shadow-sm min-w-max">
              <span className="text-xs font-bold text-slate-400 uppercase tracking-widest">Total</span>
              <span className="text-lg font-black text-slate-800">{stats.total}</span>
            </div>
            <div className="bg-red-50 border border-red-100 px-4 py-2 rounded-xl flex items-center space-x-3 shadow-sm min-w-max">
              <span className="text-xs font-bold text-red-400 uppercase tracking-widest">Critique</span>
              <span className="text-lg font-black text-red-600">{stats.critical}</span>
            </div>
            <div className="bg-orange-50 border border-orange-100 px-4 py-2 rounded-xl flex items-center space-x-3 shadow-sm min-w-max">
              <span className="text-xs font-bold text-orange-400 uppercase tracking-widest">Modérée</span>
              <span className="text-lg font-black text-orange-600">{stats.moderate}</span>
            </div>
            <div className="bg-green-50 border border-green-100 px-4 py-2 rounded-xl flex items-center space-x-3 shadow-sm min-w-max">
              <span className="text-xs font-bold text-green-400 uppercase tracking-widest">Faible</span>
              <span className="text-lg font-black text-green-600">{stats.low}</span>
            </div>
          </div>
        )}
      </div>

      {history.length > 0 && (
        <div className="bg-white border border-slate-200 rounded-2xl p-4 mb-8 shadow-sm space-y-4">
          <div className="flex flex-col md:flex-row gap-4">
            {/* Search */}
            <div className="relative flex-1">
              <input
                type="text"
                placeholder="Rechercher par symptôme ou niveau..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/20 w-full transition-all"
              />
              <Search size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
            </div>

            {/* Filters */}
            <div className="flex items-center gap-2 overflow-x-auto pb-1 md:pb-0">
              <button 
                onClick={() => setFilterLevel('ALL')}
                className={`px-3 py-2 rounded-lg text-xs font-bold transition-all whitespace-nowrap ${filterLevel === 'ALL' ? 'bg-slate-900 text-white shadow-md' : 'bg-slate-100 text-slate-500 hover:bg-slate-200'}`}
              >
                Tous
              </button>
              <button 
                onClick={() => setFilterLevel(UrgencyLevel.CRITICAL)}
                className={`px-3 py-2 rounded-lg text-xs font-bold transition-all whitespace-nowrap ${filterLevel === UrgencyLevel.CRITICAL ? 'bg-red-600 text-white shadow-md' : 'bg-red-50 text-red-600 hover:bg-red-100'}`}
              >
                Critique
              </button>
              <button 
                onClick={() => setFilterLevel(UrgencyLevel.MODERATE)}
                className={`px-3 py-2 rounded-lg text-xs font-bold transition-all whitespace-nowrap ${filterLevel === UrgencyLevel.MODERATE ? 'bg-orange-500 text-white shadow-md' : 'bg-orange-50 text-orange-600 hover:bg-orange-100'}`}
              >
                Modérée
              </button>
              <button 
                onClick={() => setFilterLevel(UrgencyLevel.LOW)}
                className={`px-3 py-2 rounded-lg text-xs font-bold transition-all whitespace-nowrap ${filterLevel === UrgencyLevel.LOW ? 'bg-green-600 text-white shadow-md' : 'bg-green-50 text-green-600 hover:bg-green-100'}`}
              >
                Faible
              </button>
            </div>

            {/* Sorting & Clear */}
            <div className="flex items-center gap-2 border-l border-slate-100 pl-0 md:pl-4">
              <button 
                onClick={() => setSortBy(sortBy === 'date' ? 'urgency' : 'date')}
                className="flex items-center space-x-2 px-3 py-2 bg-slate-100 text-slate-600 rounded-lg hover:bg-slate-200 transition-all text-xs font-bold"
                title="Trier par"
              >
                <ArrowUpDown size={14} />
                <span>{sortBy === 'date' ? 'Plus récent' : 'Plus urgent'}</span>
              </button>
              <button 
                onClick={clearAllHistory}
                className="p-2 text-slate-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-all"
                title="Vider l'historique"
              >
                <Trash2 size={20} />
              </button>
            </div>
          </div>
        </div>
      )}

      {processedHistory.length === 0 ? (
        <div className="bg-white border border-slate-200 rounded-3xl p-16 text-center animate-in fade-in duration-500">
          <div className="bg-slate-50 w-24 h-24 rounded-full flex items-center justify-center mx-auto mb-8 shadow-inner">
            <Clock size={40} className="text-slate-300" />
          </div>
          <h3 className="text-2xl font-bold text-slate-800 mb-3">Aucun résultat</h3>
          <p className="text-slate-500 mb-10 max-w-sm mx-auto leading-relaxed">
            {history.length === 0 
              ? "Commencez une nouvelle consultation pour voir votre historique apparaître ici." 
              : "Aucune consultation ne correspond à vos filtres de recherche."}
          </p>
          <Link 
            to="/assistant" 
            className="inline-flex items-center px-8 py-4 bg-blue-600 text-white rounded-2xl font-bold hover:bg-blue-700 transition-all shadow-xl shadow-blue-100 group"
          >
            <span>Nouveau Triage</span>
            <ChevronRight size={20} className="ml-2 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {processedHistory.map((conv) => (
            <div 
              key={conv.id}
              onClick={() => setSelectedConversation(conv)}
              className="bg-white border border-slate-200 rounded-2xl p-6 hover:border-blue-300 hover:shadow-xl hover:shadow-blue-50/50 transition-all group cursor-pointer relative overflow-hidden"
            >
              <div className="flex items-start justify-between">
                <div className="flex-1 pr-4">
                  <div className="flex items-center space-x-3 mb-3">
                    {getUrgencyBadge(conv.urgency)}
                    <span className="text-[10px] text-slate-400 font-medium flex items-center space-x-1">
                      <Calendar size={10} />
                      <span>{new Date(conv.date).toLocaleDateString()} • {new Date(conv.date).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
                    </span>
                  </div>
                  <h3 className="text-lg font-bold text-slate-800 group-hover:text-blue-600 transition-colors line-clamp-1 mb-2">
                    {conv.title || "Consultation rapide"}
                  </h3>
                  <p className="text-sm text-slate-500 line-clamp-2 italic">
                    "{conv.messages[1]?.text.slice(0, 100) || "Pas de description"}{conv.messages[1]?.text.length > 100 ? '...' : ''}"
                  </p>
                </div>
                <div className="flex flex-col items-center justify-between h-full space-y-8">
                  <button 
                    onClick={(e) => deleteConversation(conv.id, e)}
                    className="p-2 text-slate-300 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors z-10"
                  >
                    <Trash2 size={18} />
                  </button>
                  <div className="bg-slate-50 p-2 rounded-full text-slate-300 group-hover:bg-blue-600 group-hover:text-white transition-all">
                    <ChevronRight size={18} />
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Conversation Detail Modal */}
      {selectedConversation && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-in fade-in duration-300">
          <div 
            className="bg-white w-full max-w-2xl max-h-[90vh] rounded-3xl shadow-2xl overflow-hidden flex flex-col animate-in zoom-in-95 slide-in-from-bottom-4 duration-400"
            onClick={e => e.stopPropagation()}
          >
            <header className="px-6 py-5 bg-white border-b border-slate-100 flex items-center justify-between">
              <div>
                <div className="flex items-center gap-3 mb-1">
                   {getUrgencyBadge(selectedConversation.urgency)}
                   <span className="text-xs text-slate-400 font-medium">{new Date(selectedConversation.date).toLocaleString()}</span>
                </div>
                <h2 className="text-xl font-bold text-slate-900 line-clamp-1">{selectedConversation.title}</h2>
              </div>
              <button 
                onClick={() => setSelectedConversation(null)}
                className="p-2 hover:bg-slate-100 rounded-full transition-colors"
              >
                <X size={24} className="text-slate-400" />
              </button>
            </header>

            <div className="flex-1 overflow-y-auto p-6 space-y-6 bg-slate-50/50">
              {selectedConversation.messages.map((msg, idx) => (
                <div key={idx} className={`flex ${msg.role === Role.USER ? 'justify-end' : 'justify-start'}`}>
                  <div className={`max-w-[85%] p-4 rounded-2xl text-sm leading-relaxed ${
                    msg.role === Role.USER 
                      ? 'bg-blue-600 text-white rounded-br-none' 
                      : 'bg-white border border-slate-200 text-slate-800 rounded-bl-none shadow-sm'
                  }`}>
                    <p className="whitespace-pre-wrap">{msg.text}</p>
                    <div className={`text-[10px] mt-2 opacity-50 ${msg.role === Role.USER ? 'text-blue-100' : 'text-slate-400'}`}>
                      {new Date(msg.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <footer className="px-6 py-4 bg-white border-t border-slate-100 flex items-center justify-between">
              <button 
                onClick={() => deleteConversation(selectedConversation.id)}
                className="flex items-center space-x-2 px-4 py-2 text-red-600 hover:bg-red-50 rounded-xl transition-colors text-sm font-bold"
              >
                <Trash2 size={16} />
                <span>Supprimer</span>
              </button>
              <div className="flex items-center space-x-3">
                <button 
                  onClick={() => window.print()}
                  className="flex items-center space-x-2 px-4 py-2 bg-slate-100 text-slate-600 hover:bg-slate-200 rounded-xl transition-colors text-sm font-bold"
                >
                  <FileText size={16} />
                  <span>Imprimer</span>
                </button>
                <Link 
                  to="/assistant" 
                  className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white hover:bg-blue-700 rounded-xl transition-colors text-sm font-bold shadow-lg shadow-blue-100"
                >
                  <ExternalLink size={16} />
                  <span>Nouvelle</span>
                </Link>
              </div>
            </footer>
          </div>
        </div>
      )}
    </div>
  );
};

export default History;
