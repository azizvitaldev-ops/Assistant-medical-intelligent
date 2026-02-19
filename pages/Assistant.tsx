
import React, { useState, useEffect, useCallback, useRef } from 'react';
import { createMedicalChat, sendMessageStream } from '../services/geminiService';
import { Role, Message, UrgencyLevel, Conversation } from '../types';
import ChatBox from '../components/ChatBox';
import InputBox from '../components/InputBox';
import TriageResult from '../components/TriageResult';
import { Chat } from '@google/genai';
import { Info, Phone, AlertTriangle, ShieldCheck, Activity, Bot, Thermometer, Zap, HeartPulse, Brain } from 'lucide-react';

const Assistant: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [isTyping, setIsTyping] = useState(false);
  const [chat, setChat] = useState<Chat | null>(null);
  const [urgency, setUrgency] = useState<UrgencyLevel>(UrgencyLevel.UNKNOWN);
  const [recommendation, setRecommendation] = useState('');
  const [conversationId] = useState(() => Date.now().toString());
  const initialized = useRef(false);

  // Suggested symptoms for quick start
  const suggestions = [
    { label: "Fièvre", icon: <Thermometer size={14} /> },
    { label: "Douleur à la poitrine", icon: <HeartPulse size={14} /> },
    { label: "Maux de tête", icon: <Brain size={14} /> },
    { label: "Difficulté à respirer", icon: <Zap size={14} /> }
  ];

  // Initialize Chat and Auto-Welcome
  useEffect(() => {
    if (initialized.current) return;
    initialized.current = true;

    const newChat = createMedicalChat();
    setChat(newChat);

    const welcomeMessage: Message = {
      id: 'welcome',
      role: Role.MODEL,
      text: "Bonjour ! Je suis votre assistant de triage médical. Quel est votre symptôme principal aujourd'hui ?\n\nPour m'aider, précisez également votre âge, votre sexe et depuis combien de temps vous ressentez cela.",
      timestamp: Date.now(),
    };
    setMessages([welcomeMessage]);
  }, []);

  const saveToHistory = useCallback((updatedMessages: Message[], level: UrgencyLevel, rec: string) => {
    const historyJson = localStorage.getItem('medical_assistant_history');
    let history: Conversation[] = historyJson ? JSON.parse(historyJson) : [];
    
    const existingIndex = history.findIndex(c => c.id === conversationId);
    const updatedConversation: Conversation = {
      id: conversationId,
      title: updatedMessages.find(m => m.role === Role.USER)?.text.slice(0, 30) || 'Consultation',
      messages: updatedMessages,
      urgency: level,
      date: Date.now()
    };

    if (existingIndex > -1) {
      history[existingIndex] = updatedConversation;
    } else {
      history.unshift(updatedConversation);
    }

    localStorage.setItem('medical_assistant_history', JSON.stringify(history.slice(0, 50)));
  }, [conversationId]);

  const extractEvaluation = (text: string) => {
    const lines = text.split('\n');
    let foundLevel: UrgencyLevel = UrgencyLevel.UNKNOWN;
    let foundRec = '';

    lines.forEach(line => {
      const lowerLine = line.toLowerCase();
      if (lowerLine.includes("niveau d'urgence") || lowerLine.includes("niveau :")) {
        if (lowerLine.includes("critique")) foundLevel = UrgencyLevel.CRITICAL;
        else if (lowerLine.includes("modérée") || lowerLine.includes("modere")) foundLevel = UrgencyLevel.MODERATE;
        else if (lowerLine.includes("faible")) foundLevel = UrgencyLevel.LOW;
      }
      if (lowerLine.includes("recommandation") || lowerLine.includes("action à suivre")) {
        foundRec = line.split(':')[1]?.trim() || '';
      }
    });

    if (foundLevel !== UrgencyLevel.UNKNOWN) {
      setUrgency(foundLevel);
      if (foundRec) setRecommendation(foundRec);
    }
    return { level: foundLevel, rec: foundRec };
  };

  const handleSendMessage = async (text: string) => {
    if (!chat) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      role: Role.USER,
      text,
      timestamp: Date.now(),
    };

    const newMessages = [...messages, userMessage];
    setMessages(newMessages);
    setIsTyping(true);

    try {
      let botText = '';
      const botMessageId = (Date.now() + 1).toString();
      
      const stream = sendMessageStream(chat, text);
      for await (const chunk of stream) {
        botText += chunk;
        setMessages(prev => {
          const others = prev.filter(m => m.id !== botMessageId);
          return [...others, {
            id: botMessageId,
            role: Role.MODEL,
            text: botText,
            timestamp: Date.now()
          }];
        });
      }

      const { level, rec } = extractEvaluation(botText);
      saveToHistory([...newMessages, { id: botMessageId, role: Role.MODEL, text: botText, timestamp: Date.now() }], level, rec);
    } catch (error) {
      console.error(error);
      const errorMessage: Message = {
        id: Date.now().toString(),
        role: Role.MODEL,
        text: "Désolé, une erreur est survenue lors de la communication avec l'assistant.",
        timestamp: Date.now(),
      };
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsTyping(false);
    }
  };

  const handleReset = () => {
    if (confirm("Voulez-vous vraiment recommencer la consultation ?")) {
      setMessages([]);
      setUrgency(UrgencyLevel.UNKNOWN);
      setRecommendation('');
      setChat(createMedicalChat());
      // Re-trigger welcome
      const welcome: Message = {
        id: 'welcome-' + Date.now(),
        role: Role.MODEL,
        text: "Bonjour ! Je suis votre assistant de triage médical. Quel est votre symptôme principal aujourd'hui ?",
        timestamp: Date.now(),
      };
      setMessages([welcome]);
    }
  };

  // Progress Calculation
  const userMessageCount = messages.filter(m => m.role === Role.USER).length;
  const progress = Math.min(100, (userMessageCount * 25) + (urgency !== UrgencyLevel.UNKNOWN ? 25 : 0));

  return (
    <div className="bg-slate-50 min-h-[calc(100vh-64px)] p-0 sm:p-4 md:p-6">
      <div className="max-w-7xl mx-auto flex flex-col lg:flex-row gap-6 h-full lg:h-[800px]">
        
        {/* Sidebar Info Panel */}
        <aside className="hidden lg:flex flex-col w-80 space-y-4 no-print">
          <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-200">
            <h3 className="font-bold text-slate-800 mb-4 flex items-center gap-2">
              <AlertTriangle className="text-orange-500" size={18} />
              Niveaux de Triage
            </h3>
            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <div className="w-4 h-4 rounded-full bg-red-500 mt-1 flex-shrink-0"></div>
                <div>
                  <p className="font-bold text-sm text-red-700">CRITIQUE</p>
                  <p className="text-xs text-slate-500">Urgence vitale. Hospitalisation immédiate requise.</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-4 h-4 rounded-full bg-orange-500 mt-1 flex-shrink-0"></div>
                <div>
                  <p className="font-bold text-sm text-orange-700">MODÉRÉE</p>
                  <p className="text-xs text-slate-500">Symptômes préoccupants. Consultation rapide recommandée.</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-4 h-4 rounded-full bg-green-500 mt-1 flex-shrink-0"></div>
                <div>
                  <p className="font-bold text-sm text-green-700">FAIBLE</p>
                  <p className="text-xs text-slate-500">Symptômes mineurs. Surveillance et repos.</p>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-200">
            <h3 className="font-bold text-slate-800 mb-4 flex items-center gap-2">
              <Phone className="text-blue-500" size={18} />
              Numéros d'Urgence
            </h3>
            <div className="space-y-3">
              <div className="flex justify-between items-center p-2 bg-slate-50 rounded-lg">
                <span className="text-sm font-medium">SAMU</span>
                <span className="text-blue-600 font-bold">15</span>
              </div>
              <div className="flex justify-between items-center p-2 bg-slate-50 rounded-lg">
                <span className="text-sm font-medium">Pompiers</span>
                <span className="text-red-600 font-bold">18</span>
              </div>
              <div className="flex justify-between items-center p-2 bg-slate-50 rounded-lg">
                <span className="text-sm font-medium">Appel d'urgence</span>
                <span className="text-slate-800 font-bold">112</span>
              </div>
            </div>
          </div>

          <div className="bg-blue-600 rounded-2xl p-6 text-white shadow-lg shadow-blue-100">
            <ShieldCheck className="mb-4 opacity-80" size={32} />
            <p className="text-sm font-medium leading-relaxed opacity-90">
              Vos données sont traitées en temps réel et stockées uniquement sur votre appareil pour garantir votre confidentialité.
            </p>
          </div>
        </aside>

        {/* Main Chat Area */}
        <div className="flex-1 flex flex-col bg-white shadow-xl sm:rounded-2xl border border-slate-200 overflow-hidden relative">
          
          {/* Enhanced Header with Progress */}
          <header className="px-6 py-4 bg-white border-b border-slate-100 no-print">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center space-x-3">
                <div className="bg-blue-100 p-2 rounded-xl text-blue-600 animate-pulse">
                  <Activity size={20} />
                </div>
                <div>
                  <h2 className="text-lg font-bold text-slate-800">Triage en cours</h2>
                  <p className="text-xs text-slate-500">Analyse intelligente des symptômes</p>
                </div>
              </div>
              <div className="hidden sm:block text-right">
                <span className="text-xs font-bold text-blue-600 uppercase tracking-wider">{progress}% Complété</span>
              </div>
            </div>
            {/* Progress Bar */}
            <div className="w-full bg-slate-100 h-1.5 rounded-full overflow-hidden">
              <div 
                className="bg-blue-600 h-full transition-all duration-500 ease-out shadow-[0_0_10px_rgba(37,99,235,0.3)]"
                style={{ width: `${progress}%` }}
              />
            </div>
          </header>

          <div className="flex-1 flex flex-col overflow-hidden relative bg-slate-50/30">
            <ChatBox messages={messages} isTyping={isTyping} />
            
            {/* Quick Suggestions Overlay */}
            {messages.length < 3 && !isTyping && (
              <div className="px-6 py-4 flex flex-wrap gap-2 animate-in fade-in slide-in-from-bottom-2 duration-700 no-print">
                {suggestions.map((s) => (
                  <button
                    key={s.label}
                    onClick={() => handleSendMessage(s.label)}
                    className="flex items-center space-x-2 bg-white px-4 py-2 rounded-full border border-slate-200 text-sm font-medium text-slate-600 hover:border-blue-500 hover:text-blue-600 hover:bg-blue-50 transition-all shadow-sm"
                  >
                    {s.icon}
                    <span>{s.label}</span>
                  </button>
                ))}
              </div>
            )}

            <TriageResult 
              urgency={urgency} 
              recommendation={recommendation} 
              onPrint={() => window.print()} 
            />
          </div>

          <InputBox 
            onSendMessage={handleSendMessage} 
            onReset={handleReset}
            disabled={isTyping} 
          />
        </div>
      </div>
    </div>
  );
};

export default Assistant;
