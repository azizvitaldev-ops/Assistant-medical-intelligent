
import React from 'react';
import { Link } from 'react-router-dom';
import { 
  Info, 
  ShieldAlert, 
  Heart, 
  Stethoscope, 
  Mail, 
  Github, 
  Linkedin, 
  Phone, 
  Cpu, 
  Code, 
  Zap, 
  Layers,
  AlertCircle,
  AlertTriangle,
  CheckCircle,
  ArrowRight
} from 'lucide-react';
import { APP_NAME } from '../constants';

const About: React.FC = () => {
  const currentYear = new Date().getFullYear();

  const techStack = [
    { name: 'Gemini AI', desc: 'Modèle de langage avancé de Google pour l\'analyse médicale.', icon: <Zap className="text-amber-500" size={24} /> },
    { name: 'React.js', desc: 'Bibliothèque UI moderne pour une interface fluide et réactive.', icon: <Layers className="text-blue-500" size={24} /> },
    { name: 'Tailwind CSS', desc: 'Framework utilitaire pour un design soigné et adaptatif.', icon: <Code className="text-cyan-500" size={24} /> },
    { name: 'TypeScript', desc: 'Typage statique pour une application robuste et maintenable.', icon: <Cpu className="text-blue-700" size={24} /> },
  ];

  const emergencyLevels = [
    { 
      level: 'Faible urgence', 
      color: 'bg-green-50 text-green-700 border-green-200', 
      icon: <CheckCircle size={20} />,
      desc: 'Symptômes bénins ne nécessitant pas de soins immédiats.',
      rec: 'Surveillance à domicile et repos.' 
    },
    { 
      level: 'Urgence modérée', 
      color: 'bg-orange-50 text-orange-700 border-orange-200', 
      icon: <AlertTriangle size={20} />,
      desc: 'Symptômes nécessitant une consultation médicale sous 24h.',
      rec: 'Contactez votre médecin traitant.' 
    },
    { 
      level: 'Urgence critique', 
      color: 'bg-red-50 text-red-700 border-red-200', 
      icon: <AlertCircle size={20} />,
      desc: 'Signes de gravité immédiate ou menace vitale.',
      rec: 'Appelez les urgences sans attendre.' 
    },
  ];

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col">
      <div className="max-w-5xl mx-auto px-4 py-12 flex-1">
        {/* Header Section */}
        <div className="text-center mb-16">
          <div className="inline-flex p-4 bg-blue-100 rounded-3xl text-blue-600 mb-6 shadow-sm">
            <Stethoscope size={48} />
          </div>
          <h1 className="text-4xl font-extrabold text-slate-900 mb-4">{APP_NAME}</h1>
          <p className="text-xl text-slate-600 max-w-2xl mx-auto">
            L'intelligence artificielle au service du triage médical pour une orientation plus rapide et efficace.
          </p>
        </div>

        {/* Mission & How it works */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
          <section className="bg-white p-8 rounded-3xl shadow-sm border border-slate-100 transform transition hover:shadow-md">
            <div className="flex items-center space-x-3 mb-6">
              <div className="p-2 bg-red-50 rounded-lg"><Heart className="text-red-500" size={24} /></div>
              <h2 className="text-2xl font-bold text-slate-800">Notre Mission</h2>
            </div>
            <p className="text-slate-600 leading-relaxed">
              L'objectif de cet assistant est de réduire l'incertitude face aux symptômes et de désengorger les urgences hospitalières en fournissant une première évaluation basée sur les protocoles de triage standards.
            </p>
          </section>

          <section className="bg-white p-8 rounded-3xl shadow-sm border border-slate-100 transform transition hover:shadow-md">
            <div className="flex items-center space-x-3 mb-6">
              <div className="p-2 bg-blue-50 rounded-lg"><Info className="text-blue-500" size={24} /></div>
              <h2 className="text-2xl font-bold text-slate-800">Comment ça marche ?</h2>
            </div>
            <p className="text-slate-600 leading-relaxed">
              Grâce à l'API Gemini de Google, notre agent conversationnel analyse vos réponses pour identifier des signes de gravité. Il évalue l'urgence selon trois niveaux de priorité établis.
            </p>
          </section>
        </div>

        {/* Niveaux d'urgence */}
        <div className="mb-16">
          <h2 className="text-2xl font-bold text-slate-800 mb-8 text-center">Comprendre les 3 niveaux d'urgence</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {emergencyLevels.map((item, idx) => (
              <div key={idx} className={`p-6 rounded-2xl border ${item.color} flex flex-col h-full`}>
                <div className="flex items-center gap-2 mb-4">
                  {item.icon}
                  <span className="font-bold uppercase tracking-wider text-sm">{item.level}</span>
                </div>
                <p className="text-sm font-medium mb-4 flex-1">{item.desc}</p>
                <div className="pt-4 border-t border-current border-opacity-10 text-xs font-bold italic">
                  Recommandation : {item.rec}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Stack Technique */}
        <div className="mb-16">
          <h2 className="text-2xl font-bold text-slate-800 mb-8 text-center">Stack Technique</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {techStack.map((tech, idx) => (
              <div key={idx} className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm hover:border-blue-300 transition-colors">
                <div className="mb-4">{tech.icon}</div>
                <h3 className="font-bold text-slate-900 mb-1">{tech.name}</h3>
                <p className="text-xs text-slate-500 leading-relaxed">{tech.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Avertissement & Numéros Visuels */}
        <div className="bg-white border border-red-100 rounded-3xl overflow-hidden mb-16 shadow-lg">
          <div className="bg-red-50 p-8 border-b border-red-100">
            <div className="flex items-center space-x-3 mb-4">
              <ShieldAlert className="text-red-600" size={32} />
              <h2 className="text-2xl font-bold text-red-900">Avertissement Médical</h2>
            </div>
            <div className="text-red-800 space-y-4 text-sm leading-relaxed">
              <p className="font-bold">
                Cette application est un outil de simulation et de triage informatif. Elle n'est pas un dispositif médical certifié.
              </p>
              <ul className="list-disc pl-5 space-y-2 opacity-90">
                <li>L'IA peut commettre des erreurs ou ne pas identifier certains symptômes graves.</li>
                <li>Les recommandations ne constituent pas une prescription ou un avis médical définitif.</li>
              </ul>
            </div>
          </div>
          <div className="p-8">
            <p className="text-slate-900 font-bold mb-6 text-center">En cas d'urgence vitale, contactez immédiatement :</p>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="bg-blue-600 p-6 rounded-2xl text-white text-center shadow-lg shadow-blue-100 transform transition hover:-translate-y-1">
                <Phone className="mx-auto mb-2 opacity-80" size={24} />
                <div className="text-3xl font-black">15</div>
                <div className="text-xs font-bold uppercase tracking-wider mt-1">SAMU</div>
              </div>
              <div className="bg-red-600 p-6 rounded-2xl text-white text-center shadow-lg shadow-red-100 transform transition hover:-translate-y-1">
                <Phone className="mx-auto mb-2 opacity-80" size={24} />
                <div className="text-3xl font-black">112</div>
                <div className="text-xs font-bold uppercase tracking-wider mt-1">Urgences Europe</div>
              </div>
              <div className="bg-orange-600 p-6 rounded-2xl text-white text-center shadow-lg shadow-orange-100 transform transition hover:-translate-y-1">
                <Phone className="mx-auto mb-2 opacity-80" size={24} />
                <div className="text-3xl font-black">18</div>
                <div className="text-xs font-bold uppercase tracking-wider mt-1">Pompiers</div>
              </div>
            </div>
          </div>
        </div>

        {/* Section Auteur */}
        <div className="max-w-2xl mx-auto bg-blue-50 border border-blue-100 rounded-3xl p-8 text-center mb-16 shadow-sm">
          <h2 className="text-xl font-bold text-blue-900 mb-2">À propos du projet</h2>
          <p className="text-blue-700 text-sm mb-6">Ce projet a été réalisé pour démontrer le potentiel de l'IA générative dans le domaine de l'assistance médicale de premier niveau.</p>
          <div className="flex flex-wrap justify-center gap-4">
            <a href="#" className="flex items-center space-x-2 bg-white text-slate-700 px-6 py-3 rounded-xl font-bold text-sm shadow-sm hover:shadow-md transition-all border border-blue-100">
              <Github size={18} />
              <span>GitHub</span>
            </a>
            <a href="#" className="flex items-center space-x-2 bg-blue-600 text-white px-6 py-3 rounded-xl font-bold text-sm shadow-lg shadow-blue-100 hover:bg-blue-700 transition-all">
              <Linkedin size={18} />
              <span>LinkedIn</span>
            </a>
          </div>
        </div>
      </div>

      {/* Footer Enrichi */}
      <footer className="bg-white border-t border-slate-200 pt-12 pb-8 no-print mt-auto">
        <div className="max-w-5xl mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-12">
            <div>
              <Link to="/" className="flex items-center space-x-2 mb-6">
                <div className="bg-blue-600 p-2 rounded-lg text-white">
                  <Stethoscope size={20} />
                </div>
                <span className="text-xl font-bold text-slate-900">{APP_NAME}</span>
              </Link>
              <p className="text-sm text-slate-500 leading-relaxed">
                Le triage intelligent pour une meilleure orientation des patients.
              </p>
            </div>
            
            <div className="md:col-span-1">
              <h4 className="text-slate-900 font-bold mb-6">Navigation</h4>
              <ul className="space-y-3 text-sm text-slate-600">
                <li><Link to="/" className="hover:text-blue-600 transition-colors flex items-center gap-2"><ArrowRight size={14} /> Accueil</Link></li>
                <li><Link to="/assistant" className="hover:text-blue-600 transition-colors flex items-center gap-2"><ArrowRight size={14} /> Assistant</Link></li>
                <li><Link to="/history" className="hover:text-blue-600 transition-colors flex items-center gap-2"><ArrowRight size={14} /> Historique</Link></li>
                <li><Link to="/about" className="hover:text-blue-600 transition-colors flex items-center gap-2 text-blue-600 font-bold"><ArrowRight size={14} /> À propos</Link></li>
              </ul>
            </div>
            
            <div>
              <h4 className="text-slate-900 font-bold mb-6">Contact & Support</h4>
              <div className="space-y-4">
                <a href="mailto:contact@assistant-medical.fr" className="flex items-center space-x-3 text-sm text-slate-600 hover:text-blue-600 transition-colors">
                  <Mail size={18} className="text-slate-400" />
                  <span>contact@assistant-medical.fr</span>
                </a>
                <div className="pt-2">
                   <p className="text-[10px] text-slate-400 italic">En cas d'urgence réelle, ne nous contactez pas par email. Appelez le 15 immédiatement.</p>
                </div>
              </div>
            </div>
          </div>
          
          <div className="pt-8 border-t border-slate-100 flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-xs text-slate-400 font-medium">
              © {currentYear} {APP_NAME}. Tous droits réservés.
            </p>
            <div className="flex items-center space-x-6 text-[10px] font-bold text-slate-400 uppercase tracking-widest">
              <a href="#" className="hover:text-slate-600">Mentions Légales</a>
              <a href="#" className="hover:text-slate-600">Confidentialité</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default About;
