import React, { useState } from 'react';
import { MessageSquare, X } from 'lucide-react';
import { COMPANY_CONFIG, getWhatsAppLink } from '../config/company';

export const FloatingWhatsApp: React.FC = () => {
  const [showTooltip, setShowTooltip] = useState(true);

  return (
    <div className="fixed bottom-4 right-4 sm:bottom-6 sm:right-6 z-40 flex items-end gap-3 pointer-events-auto">
      {/* Tooltip bubble (can be closed without hiding the button, hidden on mobile) */}
      {showTooltip && (
        <div className="hidden md:flex items-center gap-2 bg-white text-slate-800 text-xs py-2 px-3.5 rounded-lg shadow-lg border border-slate-200 animate-in fade-in slide-in-from-right-3 duration-200 max-w-xs">
          <span>Precisa de uma proposta rápida para sua empresa? Fale conosco!</span>
          <button
            onClick={() => setShowTooltip(false)}
            className="text-slate-400 hover:text-slate-600 p-0.5 rounded cursor-pointer"
            aria-label="Fechar dica"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        </div>
      )}

      {/* Floating Button */}
      <a
        href={getWhatsAppLink()}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Falar com consultor de viagens corporativas pelo WhatsApp"
        className="w-12 h-12 sm:w-13 sm:h-13 rounded-full bg-emerald-500 hover:bg-emerald-600 text-white shadow-lg hover:shadow-xl flex items-center justify-center transition-all transform hover:scale-105 active:scale-95 focus:outline-hidden focus:ring-4 focus:ring-emerald-300"
      >
        <MessageSquare className="w-6 h-6 fill-current" />
      </a>
    </div>
  );
};
