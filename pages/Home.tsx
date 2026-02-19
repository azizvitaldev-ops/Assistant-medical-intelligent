
import React from 'react';
import { Link } from 'react-router-dom';
import { 
  MessageSquare, 
  ShieldCheck, 
  Clock, 
  Activity, 
  ArrowRight, 
  Zap, 
  Search, 
  ClipboardCheck,
  Stethoscope,
  HeartPulse,
  Brain,
  Thermometer,
  Mail
} from 'lucide-react';
import { APP_NAME } from '../constants';

const Home: React.FC = () => {
  const currentYear = new Date().getFullYear();

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col">
      {/* Hero Section */}
      <div className="relative overflow-hidden bg-white border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-24 flex flex-col lg:flex-row items-center">
          <div className="lg:w-1/2 space-y-8 text-center lg:text-left z-10">
            {/* 1. Badge Gemini AI */}
            <div className="inline-flex items-center space-x-2 px-4 py-1.5 bg-blue-50 text-blue-700 rounded-full text-sm font-bold border border-blue-200 mb-2 animate-in fade-in slide-in-from-top-4 duration-700">
              <span className="flex h-2 w-2 rounded-full bg-blue-600 animate-pulse"></span>
              <span>✨ Propulsé par Gemini AI</span>
            </div>
            
            <h1 className="text-4xl lg:text-6xl font-extrabold text-slate-900 tracking-tight leading-tight">
              Votre santé mérite une <span className="text-blue-600">réponse rapide</span> et intelligente.
            </h1>
            <p className="text-xl text-slate-600 max-w-2xl mx-auto lg:mx-0">
              Évaluez vos symptômes en quelques minutes avec notre assistant médical intelligent. Une orientation claire pour votre tranquillité d'esprit.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start space-y-4 sm:space-y-0 sm:space-x-4">
              <Link 
                to="/assistant" 
                className="w-full sm:w-auto px-8 py-4 bg-blue-600 text-white rounded-xl font-bold text-lg hover:bg-blue-700 transition-all shadow-xl shadow-blue-200 flex items-center justify-center space-x-2 transform hover:-translate-y-1"
              >
                <span>Démarrer le triage</span>
                <ArrowRight size={20} />
              </Link>
              <Link 
                to="/about" 
                className="w-full sm:w-auto px-8 py-4 bg-white text-blue-700 border-2 border-blue-300 rounded-xl font-bold text-lg hover:bg-blue-50 hover:border-blue-400 transition-all flex items-center justify-center"
              >
                En savoir plus
              </Link>
            </div>
            <p className="text-sm text-red-500 font-medium italic">
              * Outil de triage informatif, ne remplace pas une consultation médicale.
            </p>
          </div>
          
          <div className="lg:w-1/2 mt-12 lg:mt-0 relative flex justify-center">
            <div className="relative w-64 h-64 md:w-80 md:h-80 bg-blue-100 rounded-full flex items-center justify-center animate-pulse opacity-70">
            </div>
            <div className="absolute inset-0 flex items-center justify-center">
               <Activity size={100} className="text-blue-600 animate-bounce [animation-duration:3s]" />
            </div>
            <div className="absolute top-0 right-10 bg-white p-4 rounded-2xl shadow-xl border border-slate-100 animate-bounce [animation-duration:3.5s]">
               <ShieldCheck size={32} className="text-green-500" />
            </div>
            <div className="absolute bottom-10 left-10 bg-white p-4 rounded-2xl shadow-xl border border-slate-100 animate-bounce [animation-duration:4.5s]">
               <Clock size={32} className="text-orange-500" />
            </div>
          </div>
        </div>
      </div>

      {/* 3. Section Statistiques Clés */}
      <div className="bg-slate-100 py-10 border-b border-slate-200 no-print">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <StatItem value="3" label="Niveaux d'urgence" />
            <StatItem value="< 5 min" label="Durée d'évaluation" showSeparator />
            <StatItem value="100%" label="Privé & Local" showSeparator />
            <StatItem value="24/7" label="Disponible" showSeparator />
          </div>
        </div>
      </div>

      {/* Feature Cards Section (Existing style) */}
      <div className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <FeatureCard 
              icon={<MessageSquare className="text-blue-600" size={32} />}
              title="Conversation Naturelle"
              description="Exprimez vos symptômes avec vos propres mots, l'IA comprend le langage naturel."
            />
            <FeatureCard 
              icon={<Activity className="text-red-600" size={32} />}
              title="Évaluation de Gravité"
              description="Un score d'urgence est attribué selon les protocoles de triage standards."
            />
            <FeatureCard 
              icon={<ShieldCheck className="text-green-600" size={32} />}
              title="Sécurisé & Privé"
              description="Vos échanges restent stockés localement sur votre appareil. Confidentialité totale."
            />
          </div>
        </div>
      </div>

      {/* 4. Section Comment ça marche */}
      <div className="py-24 bg-slate-50 border-y border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-extrabold text-slate-900 sm:text-4xl mb-4">Comment ça marche ?</h2>
            <p className="text-slate-600 max-w-2xl mx-auto">Un processus simple et rapide pour obtenir une évaluation claire de votre situation.</p>
          </div>
          
          <div className="flex flex-col md:flex-row items-center justify-between gap-8 relative">
            <div className="hidden lg:block absolute top-1/2 left-0 w-full h-0.5 border-t-2 border-dashed border-blue-200 -z-0"></div>
            
            <StepItem 
              number="1"
              icon={<MessageSquare size={24} />}
              title="Décrivez vos symptômes"
              desc="Répondez aux questions simples de l'assistant sur votre état actuel."
            />
            <div className="hidden lg:block z-10"><ArrowRight className="text-blue-300" /></div>
            <StepItem 
              number="2"
              icon={<Activity size={24} />}
              title="L'IA analyse"
              desc="Gemini évalue la gravité de vos symptômes en temps réel."
            />
            <div className="hidden lg:block z-10"><ArrowRight className="text-blue-300" /></div>
            <StepItem 
              number="3"
              icon={<ShieldCheck size={24} />}
              title="Obtenez un résultat"
              desc="Un niveau d'urgence clair avec une recommandation adaptée."
            />
          </div>
        </div>
      </div>

      {/* 5. Section Cas d'usage / Exemples */}
      <div className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-extrabold text-slate-900 mb-4">Exemples de triage</h2>
            <p className="text-slate-600 max-w-2xl mx-auto">Découvrez comment l'assistant réagit selon la gravité des symptômes décrits.</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <ExampleCard 
              title="Douleur thoracique intense"
              desc="Sensation d'écrasement dans la poitrine depuis 10 minutes."
              level="Urgence Critique"
              rec="Appelez le 15 immédiatement"
              color="red"
            />
            <ExampleCard 
              title="Fièvre à 39°C persistante"
              desc="Température élevée depuis 2 jours avec forte fatigue."
              level="Urgence Modérée"
              rec="Consultez un médecin sous 24h"
              color="orange"
            />
            <ExampleCard 
              title="Léger mal de tête"
              desc="Pression légère sur les tempes sans autre signe associé."
              level="Faible Urgence"
              rec="Repos et hydratation recommandés"
              color="green"
            />
          </div>
        </div>
      </div>

      {/* 6. Footer Standardisé */}
      <footer className="bg-white border-t border-slate-200 pt-16 pb-12 no-print mt-auto">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-12">
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
                <li><Link to="/" className="hover:text-blue-600 transition-colors flex items-center gap-2">Accueil</Link></li>
                <li><Link to="/assistant" className="hover:text-blue-600 transition-colors flex items-center gap-2">Assistant de triage</Link></li>
                <li><Link to="/history" className="hover:text-blue-600 transition-colors flex items-center gap-2">Mon Historique</Link></li>
                <li><Link to="/about" className="hover:text-blue-600 transition-colors flex items-center gap-2">À propos du projet</Link></li>
              </ul>
            </div>
            
            <div>
              <h4 className="text-slate-900 font-bold mb-6 text-sm uppercase tracking-widest">Contact & Aide</h4>
              <div className="space-y-4">
                <a href="mailto:contact@medical-ia.fr" className="flex items-center space-x-3 text-sm text-slate-600 hover:text-blue-600 transition-colors">
                  <Mail size={18} className="text-slate-400" />
                  <span>contact@medical-ia.fr</span>
                </a>
                <div className="p-4 bg-slate-50 rounded-2xl border border-slate-100">
                  <p className="text-[10px] text-slate-400 italic">
                    Note : Outil de triage informatif — Ne remplace pas un médecin. En cas d'urgence, appelez le 15.
                  </p>
                </div>
              </div>
            </div>
          </div>
          
          <div className="pt-8 border-t border-slate-100 flex flex-col md:flex-row justify-between items-center gap-6">
            <p className="text-xs text-slate-400 font-medium">
              © {currentYear} {APP_NAME}. Tous droits réservés.
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

// --- Sub-components ---

const StatItem = ({ value, label, showSeparator = false }: { value: string, label: string, showSeparator?: boolean }) => (
  <div className={`text-center relative ${showSeparator ? 'md:before:content-[""] md:before:absolute md:before:left-[-1rem] md:before:top-1/4 md:before:h-1/2 md:before:w-[1px] md:before:bg-slate-300' : ''}`}>
    <div className="text-2xl md:text-3xl font-black text-blue-600 mb-1">{value}</div>
    <div className="text-xs md:text-sm font-medium text-slate-600 uppercase tracking-wide">{label}</div>
  </div>
);

const FeatureCard = ({ icon, title, description }: { icon: React.ReactNode, title: string, description: string }) => (
  <div className="bg-white p-8 rounded-3xl border border-slate-100 shadow-sm hover:shadow-xl hover:shadow-blue-50/50 transition-all transform hover:-translate-y-1">
    <div className="mb-6 inline-block p-3 bg-slate-50 rounded-2xl">{icon}</div>
    <h3 className="text-xl font-bold text-slate-900 mb-3">{title}</h3>
    <p className="text-slate-600 leading-relaxed text-sm">{description}</p>
  </div>
);

const StepItem = ({ number, icon, title, desc }: { number: string, icon: React.ReactNode, title: string, desc: string }) => (
  <div className="bg-white p-8 rounded-3xl border border-slate-200 shadow-sm flex flex-col items-center text-center relative z-10 w-full max-w-[300px]">
    <div className="absolute -top-4 bg-blue-600 text-white w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm shadow-lg shadow-blue-200">
      {number}
    </div>
    <div className="bg-blue-50 p-4 rounded-2xl text-blue-600 mb-4">{icon}</div>
    <h4 className="font-bold text-slate-900 mb-2">{title}</h4>
    <p className="text-xs text-slate-500 leading-relaxed">{desc}</p>
  </div>
);

const ExampleCard = ({ title, desc, level, rec, color }: { title: string, desc: string, level: string, rec: string, color: 'red' | 'orange' | 'green' }) => {
  const styles = {
    red: "bg-red-50 border-red-200 text-red-700 badge:bg-red-600",
    orange: "bg-orange-50 border-orange-200 text-orange-700 badge:bg-orange-600",
    green: "bg-green-50 border-green-200 text-green-700 badge:bg-green-600",
  };

  const badgeColor = color === 'red' ? 'bg-red-600' : color === 'orange' ? 'bg-orange-500' : 'bg-green-600';

  return (
    <div className={`p-6 rounded-3xl border ${styles[color]} shadow-sm flex flex-col h-full`}>
      <div className={`inline-block self-start px-2 py-1 ${badgeColor} text-white rounded text-[10px] font-bold uppercase mb-4`}>
        {level}
      </div>
      <h4 className="font-black text-slate-900 mb-2">{title}</h4>
      <p className="text-slate-600 text-sm mb-4 italic flex-1">"{desc}"</p>
      <div className="pt-4 border-t border-current border-opacity-10">
        <p className="text-xs font-bold">Recommandation :</p>
        <p className="text-xs">{rec}</p>
      </div>
    </div>
  );
};

export default Home;
