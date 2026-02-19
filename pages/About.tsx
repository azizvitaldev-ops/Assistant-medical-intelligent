
import React from 'react';
import { 
  Info, 
  ShieldAlert, 
  Heart, 
  Stethoscope, 
  Mail, 
  Code, 
  Cpu, 
  Layers, 
  Github, 
  Linkedin, 
  ExternalLink,
  PhoneCall,
  Flame,
  Globe,
  CheckCircle2,
  AlertTriangle,
  Zap
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { APP_NAME } from '../constants';

const About: React.FC = () => {
  return (
    <div className="max-w-5xl mx-auto px-4 py-12 md:py-20">
      {/* Header Section */}
      <div className="text-center mb-20">
        <div className="inline-flex p-5 bg-blue-100 rounded-[2.5rem] text-blue-600 mb-8 shadow-xl shadow-blue-100/50 animate-in zoom-in duration-700">
          <Stethoscope size={56} />
        </div>
        <h1 className="text-4xl md:text-5xl font-black text-slate-900 mb-6 tracking-tight">{APP_NAME}</h1>
        <p className="text-xl text-slate-600 max-w-3xl mx-auto leading-relaxed">
          Une plateforme de triage médical expérimentale utilisant l'intelligence artificielle pour orienter les patients vers les soins appropriés.
        </p>
      </div>

      {/* Mission & Logic */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-20">
        <section className="bg-white p-8 rounded-3xl shadow-sm border border-slate-100 hover:shadow-md transition-shadow">
          <div className="flex items-center space-x-4 mb-6">
            <div className="bg-red-50 p-3 rounded-2xl text-red-500">
              <Heart size={24} />
            </div>
            <h2 className="text-2xl font-bold text-slate-800">Notre Mission</h2>
          </div>
          <p className="text-slate-600 leading-relaxed">
            Réduire l'incertitude face aux symptômes et désengorger les structures de soins en fournissant une première évaluation basée sur les protocoles de triage standards. Notre outil aide à identifier rapidement si une situation nécessite une intervention immédiate ou une simple surveillance.
          </p>
        </section>

        <section className="bg-white p-8 rounded-3xl shadow-sm border border-slate-100 hover:shadow-md transition-shadow">
          <div className="flex items-center space-x-4 mb-6">
            <div className="bg-blue-50 p-3 rounded-2xl text-blue-500">
              <Info size={24} />
            </div>
            <h2 className="text-2xl font-bold text-slate-800">Fonctionnement</h2>
          </div>
          <p className="text-slate-600 leading-relaxed">
            Propulsé par le modèle <strong>Gemini 3 Flash</strong> de Google, l'assistant pose des questions ciblées (symptômes, âge, douleur). Il analyse les réponses en temps réel pour détecter des mots-clés de gravité et classer l'urgence selon trois niveaux pédagogiques.
          </p>
        </section>
      </div>

      {/* Urgency Levels Explanation */}
      <section className="mb-20">
        <h2 className="text-2xl font-bold text-slate-900 mb-8 text-center flex items-center justify-center gap-3">
          <Zap className="text-blue-600" size={24} />
          Comprendre les niveaux d'urgence
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm text-center">
            <div className="w-12 h-12 bg-green-100 text-green-600 rounded-2xl flex items-center justify-center mx-auto mb-4">
              <CheckCircle2 size={24} />
            </div>
            <h3 className="font-bold text-green-700 mb-2">Faible Urgence</h3>
            <p className="text-sm text-slate-500">Symptômes mineurs ne nécessitant pas de soins immédiats. Surveillance à domicile et repos conseillés.</p>
          </div>
          <div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm text-center">
            <div className="w-12 h-12 bg-orange-100 text-orange-600 rounded-2xl flex items-center justify-center mx-auto mb-4">
              <AlertTriangle size={24} />
            </div>
            <h3 className="font-bold text-orange-700 mb-2">Urgence Modérée</h3>
            <p className="text-sm text-slate-500">Symptômes préoccupants. Une consultation médicale sous 24h à 48h est recommandée pour éviter toute aggravation.</p>
          </div>
          <div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm text-center">
            <div className="w-12 h-12 bg-red-100 text-red-600 rounded-2xl flex items-center justify-center mx-auto mb-4">
              <ShieldAlert size={24} />
            </div>
            <h3 className="font-bold text-red-700 mb-2">Urgence Critique</h3>
            <p className="text-sm text-slate-500">Situation grave engageant potentiellement le pronostic vital. Hospitalisation immédiate requise (Appelez le 15).</p>
          </div>
        </div>
      </section>

      {/* Emergency Contacts Section */}
      <section className="mb-20">
        <h2 className="text-2xl font-bold text-slate-900 mb-8 text-center">Contacts d'urgence</h2>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          <EmergencyContactCard number="15" label="SAMU" sub="Urgences médicales" color="blue" />
          <EmergencyContactCard number="18" label="POMPIERS" sub="Secours & incendies" color="red" />
          <EmergencyContactCard number="112" label="EUROPE" sub="Tous secours" color="slate" />
        </div>
      </section>

      {/* Tech Stack Section */}
      <section className="mb-20 bg-slate-900 rounded-[2.5rem] p-8 md:p-12 text-white relative overflow-hidden">
        <div className="absolute top-0 right-0 p-8 opacity-10">
          <Code size={120} />
        </div>
        <div className="relative z-10">
          <div className="flex items-center space-x-3 mb-8">
            <Layers className="text-blue-400" />
            <h2 className="text-2xl font-bold">Stack Technique</h2>
          </div>
          <div className="flex flex-wrap gap-4">
            <TechBadge icon={<Cpu size={14} />} label="Google Gemini 3 AI" color="bg-blue-600" />
            <TechBadge icon={<Layers size={14} />} label="React 19" color="bg-cyan-600" />
            <TechBadge icon={<Code size={14} />} label="Tailwind CSS" color="bg-sky-600" />
            <TechBadge icon={<ShieldAlert size={14} />} label="TypeScript" color="bg-blue-700" />
            <TechBadge icon={<Layers size={14} />} label="Lucide Icons" color="bg-indigo-600" />
          </div>
          <p className="mt-8 text-slate-400 text-sm max-w-xl">
            Cette application utilise les dernières technologies de web moderne et d'IA générative pour offrir une expérience fluide, sécurisée et intelligente.
          </p>
        </div>
      </section>

      {/* Author/Project Info */}
      <section className="mb-20 bg-white border border-slate-100 rounded-3xl p-8 shadow-sm flex flex-col md:flex-row items-center gap-8">
        <div className="bg-slate-100 w-24 h-24 rounded-full flex items-center justify-center shrink-0">
          <Code className="text-slate-400" size={40} />
        </div>
        <div className="flex-1 text-center md:text-left">
          <h3 className="text-xl font-bold text-slate-800 mb-2">À propos de ce projet</h3>
          <p className="text-slate-600 mb-6">
            Ce projet est une démonstration technologique réalisée pour illustrer l'intégration de l'IA dans le domaine de la santé. Il explore les possibilités de triage conversationnel autonome.
          </p>
          <div className="flex items-center justify-center md:justify-start space-x-4">
            <a href="#" className="flex items-center space-x-2 text-sm font-bold text-blue-600 hover:text-blue-700">
              <Github size={18} />
              <span>Voir sur GitHub</span>
            </a>
            <a href="#" className="flex items-center space-x-2 text-sm font-bold text-slate-600 hover:text-slate-700">
              <Linkedin size={18} />
              <span>LinkedIn</span>
            </a>
          </div>
        </div>
      </section>

      {/* Medical Disclaimer */}
      <div className="bg-red-50 border-l-4 border-red-500 p-8 rounded-r-3xl mb-20 shadow-sm">
        <div className="flex items-center space-x-4 mb-4">
          <div className="bg-red-100 p-2 rounded-xl text-red-600">
            <ShieldAlert size={32} />
          </div>
          <h2 className="text-2xl font-bold text-red-900">Avertissement Légal</h2>
        </div>
        <div className="text-red-800 space-y-4 leading-relaxed">
          <p className="font-bold text-lg">
            Cette application n'est pas un dispositif médical certifié.
          </p>
          <ul className="grid grid-cols-1 md:grid-cols-2 gap-4 list-none">
            <li className="flex gap-2">
              <div className="mt-1.5 w-1.5 h-1.5 bg-red-400 rounded-full shrink-0"></div>
              <span>L'intelligence artificielle peut produire des résultats imprécis ou erronés.</span>
            </li>
            <li className="flex gap-2">
              <div className="mt-1.5 w-1.5 h-1.5 bg-red-400 rounded-full shrink-0"></div>
              <span>Ces recommandations ne constituent pas un avis médical définitif.</span>
            </li>
            <li className="flex gap-2">
              <div className="mt-1.5 w-1.5 h-1.5 bg-red-400 rounded-full shrink-0"></div>
              <span>Ne retardez jamais une consultation réelle sur la base de ce triage.</span>
            </li>
            <li className="flex gap-2">
              <div className="mt-1.5 w-1.5 h-1.5 bg-red-400 rounded-full shrink-0"></div>
              <span>En cas de doute, contactez systématiquement un médecin.</span>
            </li>
          </ul>
        </div>
      </div>

      {/* Footer Navigation & Copyright */}
      <footer className="pt-12 border-t border-slate-200">
        <div className="flex flex-col md:flex-row justify-between items-center gap-8 mb-12">
          <div className="flex items-center space-x-2">
            <div className="bg-blue-600 p-2 rounded-lg text-white">
              <Stethoscope size={20} />
            </div>
            <span className="text-lg font-bold text-slate-800">{APP_NAME}</span>
          </div>
          
          <nav className="flex flex-wrap justify-center gap-6">
            <Link to="/" className="text-sm font-medium text-slate-500 hover:text-blue-600 transition-colors">Accueil</Link>
            <Link to="/assistant" className="text-sm font-medium text-slate-500 hover:text-blue-600 transition-colors">Assistant</Link>
            <Link to="/history" className="text-sm font-medium text-slate-500 hover:text-blue-600 transition-colors">Historique</Link>
            <Link to="/about" className="text-sm font-medium text-slate-500 hover:text-blue-600 transition-colors">À propos</Link>
          </nav>

          <div className="flex space-x-4">
            <a href="mailto:contact@medical-assistant.ai" className="p-2 text-slate-400 hover:text-blue-600 transition-colors">
              <Mail size={20} />
            </a>
          </div>
        </div>
        
        <div className="text-center text-slate-400 text-xs">
          <p>© {new Date().getFullYear()} {APP_NAME}. Développé pour la santé intelligente.</p>
        </div>
      </footer>
    </div>
  );
};

const EmergencyContactCard = ({ number, label, sub, color }: { number: string, label: string, sub: string, color: string }) => {
  const colors: Record<string, string> = {
    blue: 'bg-blue-600 text-white shadow-blue-200',
    red: 'bg-red-600 text-white shadow-red-200',
    slate: 'bg-slate-800 text-white shadow-slate-200'
  };

  return (
    <div className={`${colors[color]} p-6 rounded-3xl shadow-lg flex flex-col items-center text-center transform hover:-translate-y-1 transition-transform cursor-default`}>
      <PhoneCall size={24} className="mb-4 opacity-75" />
      <div className="text-4xl font-black mb-1">{number}</div>
      <div className="text-sm font-bold uppercase tracking-widest opacity-90">{label}</div>
      <div className="text-[10px] mt-2 opacity-75">{sub}</div>
    </div>
  );
};

const TechBadge = ({ icon, label, color }: { icon: React.ReactNode, label: string, color: string }) => (
  <div className={`${color} flex items-center space-x-2 px-4 py-2 rounded-xl text-xs font-bold text-white shadow-lg`}>
    {icon}
    <span>{label}</span>
  </div>
);

export default About;
