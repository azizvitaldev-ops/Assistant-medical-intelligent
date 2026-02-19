
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
  ShieldIcon,
  Github,
  Twitter,
  Linkedin
} from 'lucide-react';
import { APP_NAME } from '../constants';

const Home: React.FC = () => {
  return (
    <div className="min-h-screen bg-slate-50 flex flex-col">
      {/* Hero Section */}
      <div className="relative overflow-hidden bg-white border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-24 flex flex-col lg:flex-row items-center">
          <div className="lg:w-1/2 space-y-8 text-center lg:text-left z-10">
            <div className="inline-flex items-center space-x-2 px-3 py-1 bg-blue-50 text-blue-600 rounded-full text-sm font-semibold border border-blue-100 mb-4 animate-fade-in">
              <Zap size={14} className="fill-blue-600" />
              <span>Propulsé par Google Gemini AI</span>
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
                className="w-full sm:w-auto px-8 py-4 bg-blue-600 text-white rounded-xl font-bold text-lg hover:bg-blue-700 transition-all shadow-lg shadow-blue-200 flex items-center justify-center space-x-2 transform hover:-translate-y-1"
              >
                <span>Démarrer le triage</span>
                <ArrowRight size={20} />
              </Link>
              <Link 
                to="/about" 
                className="w-full sm:w-auto px-8 py-4 bg-white text-blue-600 border-2 border-blue-100 rounded-xl font-bold text-lg hover:bg-blue-50 hover:border-blue-200 transition-all flex items-center justify-center"
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

      {/* Stats Section */}
      <div className="bg-blue-600 py-10 no-print">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center text-white">
            <div className="space-y-2">
              <div className="text-4xl font-black">3</div>
              <div className="text-blue-100 font-medium uppercase tracking-wider text-sm">Niveaux d'urgence</div>
            </div>
            <div className="space-y-2 border-y md:border-y-0 md:border-x border-blue-500/50 py-6 md:py-0">
              <div className="text-4xl font-black">&lt; 5 min</div>
              <div className="text-blue-100 font-medium uppercase tracking-wider text-sm">Temps d'évaluation</div>
            </div>
            <div className="space-y-2">
              <div className="text-4xl font-black">100%</div>
              <div className="text-blue-100 font-medium uppercase tracking-wider text-sm">Privé & Sécurisé</div>
            </div>
          </div>
        </div>
      </div>

      {/* How it works Section */}
      <div className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-extrabold text-slate-900 sm:text-4xl mb-4">Comment ça marche ?</h2>
            <p className="text-slate-600 max-w-2xl mx-auto">Un processus simple et rapide pour obtenir une évaluation claire de votre situation.</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 relative">
            <div className="hidden md:block absolute top-12 left-1/4 right-1/4 h-0.5 border-t-2 border-dashed border-blue-100 z-0"></div>
            
            <StepCard 
              number="01"
              icon={<MessageSquare size={24} />}
              title="Décrivez vos symptômes"
              description="Répondez aux questions de notre assistant sur votre douleur, sa durée et vos antécédents."
            />
            <StepCard 
              number="02"
              icon={<Search size={24} />}
              title="Analyse par l'IA"
              description="Notre modèle Gemini analyse vos réponses pour détecter des signes de gravité potentiels."
            />
            <StepCard 
              number="03"
              icon={<ClipboardCheck size={24} />}
              title="Obtenez un résultat"
              description="Recevez un niveau d'urgence immédiat et des recommandations sur la marche à suivre."
            />
          </div>
        </div>
      </div>

      {/* Use Cases / Examples Section */}
      <div className="py-24 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-extrabold text-slate-900 mb-4">Cas d'usage concrets</h2>
            <p className="text-slate-600">Découvrez comment l'assistant réagit selon la gravité des symptômes décrits.</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <UseCaseCard 
              scenario="Douleur thoracique intense et essoufflement soudain."
              level="Urgence Critique"
              color="red"
              action="Appelez immédiatement le 15 ou rendez-vous aux urgences."
            />
            <UseCaseCard 
              scenario="Légère toux, fatigue et nez qui coule depuis 2 jours."
              level="Faible Urgence"
              color="green"
              action="Surveillez l'évolution et consultez votre généraliste si besoin."
            />
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-slate-900 text-slate-300 py-12 mt-auto no-print">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12 border-b border-slate-800 pb-12">
            <div className="col-span-1 md:col-span-1">
              <Link to="/" className="flex items-center space-x-2 mb-6">
                <div className="bg-blue-600 p-2 rounded-lg text-white">
                  <Stethoscope size={20} />
                </div>
                <span className="text-xl font-bold text-white">{APP_NAME}</span>
              </Link>
              <p className="text-sm leading-relaxed text-slate-400">
                Solution de triage intelligente pour orienter les patients vers les soins appropriés grâce à l'IA.
              </p>
            </div>
            
            <div>
              <h4 className="text-white font-bold mb-6">Navigation</h4>
              <ul className="space-y-4 text-sm">
                <li><Link to="/" className="hover:text-blue-400 transition-colors">Accueil</Link></li>
                <li><Link to="/assistant" className="hover:text-blue-400 transition-colors">Démarrer le triage</Link></li>
                <li><Link to="/history" className="hover:text-blue-400 transition-colors">Mon Historique</Link></li>
                <li><Link to="/about" className="hover:text-blue-400 transition-colors">À propos</Link></li>
              </ul>
            </div>
            
            <div>
              <h4 className="text-white font-bold mb-6">Légal</h4>
              <ul className="space-y-4 text-sm">
                <li><a href="#" className="hover:text-blue-400 transition-colors">Mentions légales</a></li>
                <li><a href="#" className="hover:text-blue-400 transition-colors">Confidentialité</a></li>
                <li><a href="#" className="hover:text-blue-400 transition-colors">Conditions d'utilisation</a></li>
                <li><a href="#" className="hover:text-blue-400 transition-colors">Contact</a></li>
              </ul>
            </div>
            
            <div>
              <h4 className="text-white font-bold mb-6">Suivez-nous</h4>
              <div className="flex space-x-4">
                <a href="#" className="bg-slate-800 p-2 rounded-lg hover:bg-blue-600 transition-all"><Twitter size={20} /></a>
                <a href="#" className="bg-slate-800 p-2 rounded-lg hover:bg-blue-600 transition-all"><Linkedin size={20} /></a>
                <a href="#" className="bg-slate-800 p-2 rounded-lg hover:bg-blue-600 transition-all"><Github size={20} /></a>
              </div>
            </div>
          </div>
          
          <div className="flex flex-col md:flex-row justify-between items-center text-xs text-slate-500">
            <p>© 2024 {APP_NAME}. Développé pour la démonstration technologique.</p>
            <div className="flex items-center space-x-2 mt-4 md:mt-0">
              <ShieldIcon size={14} className="text-green-500" />
              <span>Données chiffrées localement</span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

const StepCard = ({ number, icon, title, description }: { number: string, icon: React.ReactNode, title: string, description: string }) => (
  <div className="relative z-10 flex flex-col items-center text-center">
    <div className="bg-blue-600 w-16 h-16 rounded-2xl flex items-center justify-center text-white mb-6 shadow-xl shadow-blue-200 ring-8 ring-white">
      {icon}
      <div className="absolute -top-2 -right-2 bg-slate-900 text-white text-[10px] font-bold w-6 h-6 rounded-full flex items-center justify-center border-2 border-white">
        {number}
      </div>
    </div>
    <h3 className="text-xl font-bold text-slate-900 mb-3">{title}</h3>
    <p className="text-slate-600 leading-relaxed text-sm">{description}</p>
  </div>
);

const UseCaseCard = ({ scenario, level, action, color }: { scenario: string, level: string, action: string, color: 'red' | 'green' }) => (
  <div className={`bg-white border-l-4 p-6 rounded-r-xl shadow-sm hover:shadow-md transition-shadow ${color === 'red' ? 'border-red-500' : 'border-green-500'}`}>
    <div className="mb-3">
      <span className="text-xs font-bold uppercase tracking-widest text-slate-400">Scénario</span>
      <p className="font-medium text-slate-800 mt-1 italic">"{scenario}"</p>
    </div>
    <div className="flex items-center justify-between pt-4 border-t border-slate-50">
      <div>
        <span className={`text-xs font-bold px-2 py-1 rounded ${color === 'red' ? 'bg-red-50 text-red-600' : 'bg-green-50 text-green-600'}`}>
          {level}
        </span>
      </div>
      <p className="text-xs text-slate-500 text-right max-w-[200px]">{action}</p>
    </div>
  </div>
);

export default Home;
