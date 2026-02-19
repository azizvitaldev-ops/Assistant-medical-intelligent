
import React, { useState, KeyboardEvent } from 'react';
import { Send, RefreshCw } from 'lucide-react';

interface InputBoxProps {
  onSendMessage: (message: string) => void;
  onReset: () => void;
  disabled: boolean;
}

const InputBox: React.FC<InputBoxProps> = ({ onSendMessage, onReset, disabled }) => {
  const [text, setText] = useState('');

  const handleSend = () => {
    if (text.trim() && !disabled) {
      onSendMessage(text.trim());
      setText('');
    }
  };

  const handleKeyDown = (e: KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div className="p-4 bg-white border-t border-slate-200 no-print">
      <div className="max-w-4xl mx-auto flex space-x-3">
        <button
          onClick={onReset}
          className="p-3 text-slate-500 hover:text-blue-600 hover:bg-blue-50 rounded-xl transition-all border border-slate-200"
          title="Recommencer"
        >
          <RefreshCw size={22} />
        </button>
        <div className="relative flex-1">
          <textarea
            value={text}
            onChange={(e) => setText(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Décrivez vos symptômes..."
            className="w-full pl-4 pr-12 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all resize-none h-[50px] max-h-[150px]"
            disabled={disabled}
          />
          <button
            onClick={handleSend}
            disabled={!text.trim() || disabled}
            className={`absolute right-2 bottom-2 p-1.5 rounded-lg transition-all ${
              !text.trim() || disabled
                ? 'text-slate-300'
                : 'text-white bg-blue-600 hover:bg-blue-700 shadow-md shadow-blue-200'
            }`}
          >
            <Send size={20} />
          </button>
        </div>
      </div>
      <p className="text-[10px] text-center text-slate-400 mt-2 italic">
        Cet assistant ne remplace pas un médecin. En cas d'urgence vitale, contactez le 15 (SAMU).
      </p>
    </div>
  );
};

export default InputBox;
