
import React, { useEffect, useRef } from 'react';
import { Message } from '../types';
import MessageItem from './MessageItem';
import { Bot, MessageSquare } from 'lucide-react';

interface ChatBoxProps {
  messages: Message[];
  isTyping: boolean;
}

const ChatBox: React.FC<ChatBoxProps> = ({ messages, isTyping }) => {
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, isTyping]);

  return (
    <div 
      ref={scrollRef}
      className="flex-1 overflow-y-auto p-4 md:p-6 space-y-4 scroll-smooth"
    >
      {messages.length === 0 && (
        <div className="flex flex-col items-center justify-center h-full text-slate-400 space-y-6 animate-in fade-in zoom-in duration-500">
          <div className="relative">
            <div className="bg-white p-8 rounded-full shadow-lg border border-slate-100 animate-bounce [animation-duration:3s]">
              <Bot size={64} className="text-blue-500" />
            </div>
            <div className="absolute -bottom-2 -right-2 bg-green-500 w-6 h-6 rounded-full border-4 border-white shadow-sm"></div>
          </div>
          <div className="text-center space-y-2">
            <h3 className="text-xl font-bold text-slate-700">Démarrer une consultation</h3>
            <p className="text-center max-w-xs font-medium text-slate-400">
              Je suis prêt à évaluer votre situation. Décrivez-moi votre symptôme principal.
            </p>
          </div>
        </div>
      )}
      
      {messages.map((msg) => (
        <MessageItem key={msg.id} message={msg} />
      ))}

      {isTyping && (
        <div className="flex justify-start mb-4 animate-in slide-in-from-left-2 duration-300">
          <div className="bg-white border border-slate-200 p-4 rounded-2xl rounded-bl-none shadow-sm flex items-center space-x-3">
             <Bot size={18} className="text-blue-400 animate-pulse" />
             <div className="flex space-x-1">
                <span className="w-1.5 h-1.5 bg-blue-300 rounded-full animate-bounce"></span>
                <span className="w-1.5 h-1.5 bg-blue-400 rounded-full animate-bounce [animation-delay:-0.15s]"></span>
                <span className="w-1.5 h-1.5 bg-blue-500 rounded-full animate-bounce [animation-delay:-0.3s]"></span>
             </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ChatBox;
