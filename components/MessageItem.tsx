
import React from 'react';
import { Role, Message } from '../types';
import { User, Bot } from 'lucide-react';

interface MessageItemProps {
  message: Message;
}

const MessageItem: React.FC<MessageItemProps> = ({ message }) => {
  const isBot = message.role === Role.MODEL;

  return (
    <div className={`flex w-full mb-4 ${isBot ? 'justify-start' : 'justify-end'}`}>
      <div className={`flex max-w-[85%] md:max-w-[75%] ${isBot ? 'flex-row' : 'flex-row-reverse'}`}>
        <div className={`flex-shrink-0 flex items-end mb-1 ${isBot ? 'mr-2' : 'ml-2'}`}>
          <div className={`w-8 h-8 rounded-full flex items-center justify-center ${isBot ? 'bg-blue-100 text-blue-600' : 'bg-slate-200 text-slate-600'}`}>
            {isBot ? <Bot size={18} /> : <User size={18} />}
          </div>
        </div>
        <div className={`p-4 rounded-2xl text-sm leading-relaxed shadow-sm ${
          isBot 
            ? 'bg-white border border-slate-200 text-slate-800 rounded-bl-none' 
            : 'bg-blue-600 text-white rounded-br-none'
        }`}>
          <div className="whitespace-pre-wrap">{message.text}</div>
          <div className={`text-[10px] mt-2 opacity-50 ${isBot ? 'text-slate-500' : 'text-blue-100'}`}>
            {new Date(message.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MessageItem;
