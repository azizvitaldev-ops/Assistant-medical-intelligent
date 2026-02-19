
import React, { useState, useEffect, useMemo } from 'react';
import { Link } from 'react-router-dom';
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
  Activity,
  ArrowRight,
  Mail,
  Stethoscope,
  ExternalLink
} from 'lucide-react';
import { Conversation, UrgencyLevel, Role } from '../types';
import { APP_NAME } from '../constants';

const History: React.FC = () => {
  const [history, setHistory] = useState<Conversation[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterLevel, setFilterLevel] = useState<UrgencyLevel | 'ALL'>('ALL');
  const [sortBy, setSortBy] = useState<'NEWEST' | 'OLDEST' | 'URGENCY_ASC' | 'URGENCY_DESC'>('NEWEST');
  const [selectedConversation, setSelectedConversation] = useState<Conversation | null>(null);

  const currentYear = new Date().getFullYear();

  // Load history on mount
  useEffect(() => {
    const historyJson = localStorage.getItem('medical_assistant_history');
    if (historyJson) {
      setHistory(JSON.parse(historyJson));
    }
  }, []);

  // Handle ESC key for Modal
  useEffect(() => {
    const handleEsc = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setSelectedConversation(null);
    };
    window.addEventListener('keydown', handleEsc);
    return () => window.removeEventListener('keydown', handleEsc);
  }, []);

  // Statistics Calculation
  const stats = useMemo(() => {
    return {
      total: history.length,
      critical: history.filter(c => c.urgency === UrgencyLevel.CRITICAL).length,
      moderate: history.filter(c => c.urgency === UrgencyLevel.MODERATE).length,
      low: history.filter(c => c.urgency === UrgencyLevel.LOW).length,
    };
  }, [history]);

  // Priority mapping for sorting
  const urgencyPriority = {
    [UrgencyLevel.CRITICAL]: 3,
    [UrgencyLevel.MODERATE]: 2,
    [UrgencyLevel.LOW]: 1,
    [UrgencyLevel.UNKNOWN]: 0,
  };

  // Filter and Sort Logic
  const processedHistory = useMemo(() => {
    let filtered = history.filter(c => {
      const matchesSearch = (c.title || '').toLowerCase().includes(searchTerm.toLowerCase()) ||
                            (c.urgency || '').toLowerCase().includes(searchTerm.toLowerCase());
      const matchesFilter = filterLevel === 'ALL' || c.urgency === filterLevel;
      return matchesSearch && matchesFilter;
    });

    return filtered.sort((a, b) => {
      switch (sortBy) {
        case 'OLDEST': return a.date - b.date;
        case 'URGENCY_ASC': return urgencyPriority[a.urgency] - urgencyPriority[b.urgency];
        case 'URGENCY_DESC': return urgencyPriority[b.urgency] - urgencyPriority[a.urgency];
        case 'NEWEST':
        default: return b.date - a.date;
      }
    });
  }, [history, searchTerm, filterLevel, sortBy]);

  const deleteConversation = (id: string, e?: React.MouseEvent) => {
    e?.stopPropagation();
    if (confirm("Voulez-vous supprimer cette consultation de l'historique ?")) {
      const updated = history.filter(c => c.id !== id);
      setHistory(updated);
      localStorage.setItem('medical_assistant_history', JSON.stringify(updated));
    }
  };

  const clearAllHistory = () => {
    if (confirm("Êtes-vous sûr de vouloir effacer TOUT votre historique ? Cette action est irréversible.")) {
      setHistory([]);
      localStorage.removeItem('medical_assistant_history');
    }
  };

  const exportCSV = () => {
    if (history.length === 0) return;
    
    const headers = ["Date", "Heure", "Titre", "Niveau d'urgence", "Messages"];
    const rows = history.map(c => [
      new Date(c.date).toLocaleDateString(),
      new Date(c.date).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      `"${c.title.replace(/"/g, '""')}"`,
      c.urgency,
      c.messages.length
    ]);

    const csvContent = [headers, ...rows].map(e => e.join(",")).join("\n");
    const blob = new Blob(["\ufeff" + csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.setAttribute("href", url);
    link.setAttribute("download", `historique_medical_${new Date().toISOString().split('T')[0]}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const getUrgencyBadge = (level: UrgencyLevel) => {
    switch (level) {
      case UrgencyLevel.CRITICAL:
        return <span className="flex items-center gap-1 px-2 py-1 bg-red-100 text-red-700 rounded text-[10px] font-bold uppercase"><AlertCircle size={12}/> Critique</span>;
      case UrgencyLevel.MODERATE:
        return <span className="flex items-center gap-1 px-2 py-1 bg-orange-100 text-orange-700 rounded text-[10px] font-bold uppercase"><AlertTriangle size={12}/> Modérée</span>;
      case UrgencyLevel.LOW:
        return <span className="flex items-center gap-1 px-2 py-1 bg-green-100 text-green-700 rounded text-[10px] font-bold uppercase"><CheckCircle size={12}/> Faible</span>;
      default:
        return <span className="px-2 py-1 bg-slate-100 text-slate-500 rounded text-[10px] font-bold uppercase tracking-wider">Inconnu</span>;
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col">
      <div className="max-w-6xl mx-auto px-4 py-12 flex-1 w-full">
        
        {/* Header with Global Actions */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-10">
          <div>
            <h1 className="text-3xl font-extrabold text-slate-900">Historique des consultations</h1>
            <p className="text-slate-500 mt-1">Gérez et consultez vos évaluations passées.</p>
          </div>
          
          {history.length > 0 && (
            <div className="flex items-center gap-3">
              <button 
                onClick={exportCSV}
                className="flex items-center space-x-2 px-4 py-2.5 bg-white border border-slate-200 text-slate-700 rounded-xl font-bold text-sm shadow-sm hover:bg-slate-50 transition-all"
              >
                <Download size={18} />
                <span className="hidden sm:inline">Exporter CSV</span>
              </button>
              <button 
                onClick={clearAllHistory}
                className="flex items-center space-x-2 px-4 py-2.5 bg-red-50 border border-red-100 text-red-600 rounded-xl font-bold text-sm hover:bg-red-100 transition-all"
              >
                <Trash2 size={18} />
                <span className="hidden sm:inline">Tout supprimer</span>
              </button>
            </div>
          )}
        </div>

        {/* Statistics Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-10">
          <StatCard title="Total" value={stats.total} icon={<Activity className="text-blue-500" />} color="bg-white" />
          <StatCard title="Critiques" value={stats.critical} icon={<AlertCircle className="text-red-500" />} color="bg-red-50" textColor="text-red-700" />
          <StatCard title="Modérées" value={stats.moderate} icon={<AlertTriangle className="text-orange-500" />} color="bg-orange-50" textColor="text-orange-700" />
          <StatCard title="Faibles" value={stats.low} icon={<CheckCircle className="text-green-500" />} color="bg-green-50" textColor="text-green-700" />
        </div>

        {history.length > 0 && (
          <div className="bg-white border border-slate-200 rounded-3xl p-6 mb-8 shadow-sm">
            <div className="flex flex-col lg:flex-row gap-4">
              {/* Search */}
              <div className="relative flex-1">
                <Search size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                <input
                  type="text"
                  placeholder="Rechercher par symptôme ou niveau..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-blue-500/20 transition-all"
                />
              </div>

              {/* Filters */}
              <div className="flex flex-wrap items-center gap-2">
                <Filter size={16} className="text-slate-400 mr-2 hidden sm:block" />
                <FilterButton label="Tous" active={filterLevel === 'ALL'} onClick={() => setFilterLevel('ALL')} />
                <FilterButton label="Faible" active={filterLevel === UrgencyLevel.LOW} onClick={() => setFilterLevel(UrgencyLevel.LOW)} color="green" />
                <FilterButton label="Modérée" active={filterLevel === UrgencyLevel.MODERATE} onClick={() => setFilterLevel(UrgencyLevel.MODERATE)} color="orange" />
                <FilterButton label="Critique" active={filterLevel === UrgencyLevel.CRITICAL} onClick={() => setFilterLevel(UrgencyLevel.CRITICAL)} color="red" />
              </div>

              {/* Sorting */}
              <div className="flex items-center space-x-2 border-t lg:border-t-0 lg:border-l border-slate-100 pt-4 lg:pt-0 lg:pl-4">
                <ArrowUpDown size={16} className="text-slate-400" />
                <select 
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value as any)}
                  className="bg-transparent text-sm font-bold text-slate-700 focus:outline-none cursor-pointer"
                >
                  <option value="NEWEST">Plus récent</option>
                  <option value="OLDEST">Plus ancien</option>
                  <option value="URGENCY_DESC">Urgence décroissante</option>
                  <option value="URGENCY_ASC">Urgence croissante</option>
                </select>
              </div>
            </div>
          </div>
        )}

        {processedHistory.length === 0 ? (
          <div className="bg-white border border-slate-200 rounded-[2.5rem] p-16 text-center shadow-sm">
            <div className="bg-slate-50 w-24 h-24 rounded-full flex items-center justify-center mx-auto mb-8 shadow-inner">
              <Clock size={40} className="text-slate-300" />
            </div>
            <h3 className="text-2xl font-bold text-slate-800 mb-3">Aucun historique trouvé</h3>
            <p className="text-slate-500 mb-10 max-w-sm mx-auto leading-relaxed">
              {history.length === 0 
                ? "Il est temps d'effectuer votre première évaluation médicale avec notre IA." 
                : "Aucune consultation ne correspond à vos critères actuels."}
            </p>
            <Link 
              to="/assistant" 
              className="inline-flex items-center px-10 py-4 bg-blue-600 text-white rounded-2xl font-bold hover:bg-blue-700 transition-all shadow-xl shadow-blue-100 group"
            >
              <span>Démarrer un triage</span>
              <ArrowRight size={20} className="ml-2 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {processedHistory.map((conv) => (
              <div 
                key={conv.id}
                onClick={() => setSelectedConversation(conv)}
                className="bg-white border border-slate-200 rounded-3xl p-6 hover:border-blue-400 hover:shadow-xl hover:shadow-blue-50/50 transition-all group cursor-pointer relative overflow-hidden"
              >
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex flex-wrap items-center gap-3 mb-4">
                      {getUrgencyBadge(conv.urgency)}
                      <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider flex items-center gap-1">
                        <Calendar size={12} />
                        {new Date(conv.date).toLocaleDateString()} • {new Date(conv.date).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                      </span>
                    </div>
                    <h3 className="text-lg font-bold text-slate-800 group-hover:text-blue-600 transition-colors line-clamp-1 mb-2">
                      {conv.title || "Consultation médicale"}
                    </h3>
                    <p className="text-sm text-slate-500 line-clamp-2 italic opacity-80">
                      "{conv.messages.find(m => m.role === Role.USER)?.text.slice(0, 80)}..."
                    </p>
                  </div>
                  <div className="flex flex-col items-end gap-10">
                    <button 
                      onClick={(e) => deleteConversation(conv.id, e)}
                      className="p-2 text-slate-300 hover:text-red-500 hover:bg-red-50 rounded-xl transition-all opacity-0 group-hover:opacity-100"
                    >
                      <Trash2 size={18} />
                    </button>
                    <div className="bg-slate-50 p-2.5 rounded-2xl text-slate-300 group-hover:bg-blue-600 group-hover:text-white transition-all transform group-hover:scale-110">
                      <ChevronRight size={20} />
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Conversation Detail Modal */}
      {selectedConversation && (
        <div 
          className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-md animate-in fade-in duration-300"
          onClick={() => setSelectedConversation(null)}
        >
          <div 
            className="bg-white w-full max-w-2xl max-h-[85vh] rounded-[2.5rem] shadow-2xl overflow-hidden flex flex-col animate-in zoom-in-95 duration-300"
            onClick={e => e.stopPropagation()}
          >
            {/* Modal Header */}
            <header className="px-8 py-6 bg-white border-b border-slate-100 flex items-center justify-between sticky top-0 z-10">
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-3 mb-2">
                   {getUrgencyBadge(selectedConversation.urgency)}
                   <span className="text-xs text-slate-400 font-bold uppercase tracking-widest">{new Date(selectedConversation.date).toLocaleString()}</span>
                </div>
                <h2 className="text-xl font-bold text-slate-900 truncate">{selectedConversation.title}</h2>
              </div>
              <button 
                onClick={() => setSelectedConversation(null)}
                className="p-3 bg-slate-50 hover:bg-slate-100 rounded-full transition-colors text-slate-500"
              >
                <X size={20} />
              </button>
            </header>

            {/* Modal Messages List */}
            <div className="flex-1 overflow-y-auto p-8 space-y-6 bg-slate-50/30">
              {selectedConversation.messages.map((msg, idx) => (
                <div key={idx} className={`flex ${msg.role === Role.USER ? 'justify-end' : 'justify-start'}`}>
                  <div className={`max-w-[85%] p-5 rounded-3xl shadow-sm text-sm leading-relaxed ${
                    msg.role === Role.USER 
                      ? 'bg-blue-600 text-white rounded-br-none' 
                      : 'bg-white border border-slate-200 text-slate-800 rounded-bl-none'
                  }`}>
                    <p className="whitespace-pre-wrap">{msg.text}</p>
                    <div className={`text-[10px] mt-2 font-bold uppercase tracking-tighter opacity-50 ${msg.role === Role.USER ? 'text-blue-100' : 'text-slate-400'}`}>
                      {new Date(msg.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Modal Footer Actions */}
            <footer className="px-8 py-6 bg-white border-t border-slate-100 flex flex-wrap items-center justify-between gap-4">
              <button 
                onClick={() => deleteConversation(selectedConversation.id)}
                className="flex items-center space-x-2 px-4 py-2 text-red-600 hover:bg-red-50 rounded-xl transition-colors text-sm font-bold"
              >
                <Trash2 size={18} />
                <span>Supprimer cette consultation</span>
              </button>
              <div className="flex items-center gap-3">
                <button 
                  onClick={() => window.print()}
                  className="flex items-center space-x-2 px-6 py-2.5 bg-slate-900 text-white hover:bg-slate-800 rounded-xl transition-all text-sm font-bold shadow-lg shadow-slate-200"
                >
                  <FileText size={18} />
                  <span>Imprimer en PDF</span>
                </button>
              </div>
            </footer>
          </div>
        </div>
      )}

      {/* Footer (Same as About page) */}
      <footer className="bg-white border-t border-slate-200 pt-16 pb-12 no-print mt-20">
        <div className="max-w-6xl mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-16 mb-16">
            <div>
              <Link to="/" className="flex items-center space-x-2 mb-6">
                <div className="bg-blue-600 p-2 rounded-lg text-white">
                  <Stethoscope size={24} />
                </div>
                <span className="text-2xl font-bold text-slate-900">{APP_NAME}</span>
              </Link>
              <p className="text-sm text-slate-500 leading-relaxed max-w-xs">
                Une technologie de pointe pour aider à l'orientation médicale et soulager le système de santé.
              </p>
            </div>
            
            <div className="md:col-span-1">
              <h4 className="text-slate-900 font-bold mb-6 text-sm uppercase tracking-widest">Navigation</h4>
              <ul className="space-y-4 text-sm text-slate-600">
                <li><Link to="/" className="hover:text-blue-600 transition-colors flex items-center gap-2"><ArrowRight size={14} className="text-slate-300" /> Accueil</Link></li>
                <li><Link to="/assistant" className="hover:text-blue-600 transition-colors flex items-center gap-2"><ArrowRight size={14} className="text-slate-300" /> Assistant</Link></li>
                <li><Link to="/history" className="hover:text-blue-600 transition-colors flex items-center gap-2 text-blue-600 font-bold"><ArrowRight size={14} /> Historique</Link></li>
                <li><Link to="/about" className="hover:text-blue-600 transition-colors flex items-center gap-2"><ArrowRight size={14} className="text-slate-300" /> À propos</Link></li>
              </ul>
            </div>
            
            <div>
              <h4 className="text-slate-900 font-bold mb-6 text-sm uppercase tracking-widest">Aide & Support</h4>
              <div className="space-y-4">
                <a href="mailto:support@assistant-medical.ia" className="flex items-center space-x-3 text-sm text-slate-600 hover:text-blue-600 transition-colors">
                  <Mail size={18} className="text-slate-400" />
                  <span>support@assistant-medical.ia</span>
                </a>
                <div className="p-4 bg-slate-50 rounded-2xl border border-slate-100">
                   <p className="text-[10px] text-slate-400 leading-tight italic">
                     Note : Nous ne stockons pas vos données médicales sur nos serveurs. Tout reste stocké localement sur votre navigateur.
                   </p>
                </div>
              </div>
            </div>
          </div>
          
          <div className="pt-8 border-t border-slate-100 flex flex-col md:flex-row justify-between items-center gap-6">
            <p className="text-xs text-slate-400 font-medium">
              © {currentYear} {APP_NAME}. Conçu avec rigueur pour votre santé.
            </p>
            <div className="flex items-center space-x-8 text-[10px] font-bold text-slate-400 uppercase tracking-widest">
              <a href="#" className="hover:text-slate-600">Mentions Légales</a>
              <a href="#" className="hover:text-slate-600">Confidentialité</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

// Sub-components
const StatCard = ({ title, value, icon, color, textColor = 'text-slate-800' }: { title: string, value: number, icon: React.ReactNode, color: string, textColor?: string }) => (
  <div className={`${color} border border-slate-100 p-6 rounded-3xl shadow-sm transition-all hover:shadow-md`}>
    <div className="flex items-center justify-between mb-2">
      <span className="text-xs font-bold text-slate-400 uppercase tracking-widest">{title}</span>
      {icon}
    </div>
    <div className={`text-3xl font-black ${textColor}`}>{value}</div>
  </div>
);

const FilterButton = ({ label, active, onClick, color = 'blue' }: { label: string, active: boolean, onClick: () => void, color?: 'blue' | 'red' | 'orange' | 'green' }) => {
  const colorStyles = {
    blue: active ? 'bg-blue-600 text-white shadow-lg shadow-blue-100' : 'bg-slate-100 text-slate-600 hover:bg-slate-200',
    red: active ? 'bg-red-600 text-white shadow-lg shadow-red-100' : 'bg-red-50 text-red-600 hover:bg-red-100',
    orange: active ? 'bg-orange-500 text-white shadow-lg shadow-orange-100' : 'bg-orange-50 text-orange-600 hover:bg-orange-100',
    green: active ? 'bg-green-600 text-white shadow-lg shadow-green-100' : 'bg-green-50 text-green-600 hover:bg-green-100',
  };

  return (
    <button 
      onClick={onClick}
      className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${colorStyles[color]}`}
    >
      {label}
    </button>
  );
};

export default History;
