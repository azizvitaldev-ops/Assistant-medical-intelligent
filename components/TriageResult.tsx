
import React from 'react';
import { UrgencyLevel } from '../types';
import { AlertTriangle, CheckCircle, AlertCircle, FileText } from 'lucide-react';

interface TriageResultProps {
  urgency: UrgencyLevel;
  recommendation: string;
  onPrint: () => void;
}

const TriageResult: React.FC<TriageResultProps> = ({ urgency, recommendation, onPrint }) => {
  if (urgency === UrgencyLevel.UNKNOWN) return null;

  const getStyle = () => {
    switch (urgency) {
      case UrgencyLevel.CRITICAL:
        return {
          bg: 'bg-red-50',
          border: 'border-red-200',
          text: 'text-red-700',
          icon: <AlertCircle className="text-red-500" size={24} />
        };
      case UrgencyLevel.MODERATE:
        return {
          bg: 'bg-orange-50',
          border: 'border-orange-200',
          text: 'text-orange-700',
          icon: <AlertTriangle className="text-orange-500" size={24} />
        };
      case UrgencyLevel.LOW:
      default:
        return {
          bg: 'bg-green-50',
          border: 'border-green-200',
          text: 'text-green-700',
          icon: <CheckCircle className="text-green-500" size={24} />
        };
    }
  };

  const style = getStyle();

  return (
    <div className={`m-4 p-5 rounded-xl border-2 ${style.bg} ${style.border} animate-in fade-in slide-in-from-bottom-4 duration-500`}>
      <div className="flex items-start space-x-3">
        <div className="flex-shrink-0 mt-1">
          {style.icon}
        </div>
        <div className="flex-1">
          <h3 className={`font-bold text-lg mb-1 ${style.text}`}>
            Résultat du Triage
          </h3>
          <p className="font-semibold text-slate-800 mb-2">
            Niveau : {urgency}
          </p>
          <p className="text-slate-600 text-sm leading-relaxed mb-4">
            {recommendation}
          </p>
          <button 
            onClick={onPrint}
            className="no-print flex items-center space-x-2 bg-white px-3 py-2 rounded-lg border border-slate-200 text-slate-600 text-xs font-medium hover:bg-slate-50 transition-colors"
          >
            <FileText size={14} />
            <span>Exporter en PDF</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default TriageResult;
