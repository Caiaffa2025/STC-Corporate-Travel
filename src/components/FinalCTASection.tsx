import React from 'react';
import { ArrowRight, MessageSquare } from 'lucide-react';
import { COMPANY_CONFIG, getWhatsAppLink } from '../config/company';

interface FinalCTASectionProps {
  onOpenLeadForm: () => void;
}

export const FinalCTASection: React.FC<FinalCTASectionProps> = ({ onOpenLeadForm }) => {
  return (
    <section className="py-20 md:py-28 bg-[#0B192C] text-white relative overflow-hidden">
      {/* Subtle background mesh */}
      <div 
        className="absolute inset-0 pointer-events-none opacity-10"
        style={{
          backgroundImage: `radial-gradient(#ffffff 1px, transparent 1px)`,
          backgroundSize: '32px 32px',
        }}
      />

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
        <div className="text-xs uppercase tracking-widest text-amber-300 font-semibold mb-4">
          Próximo Passo Estratégico
        </div>

        <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white tracking-tight leading-tight text-balance max-w-4xl mx-auto">
          Sua equipe precisa de mais tempo para cuidar do negócio.
        </h2>

        <p className="mt-6 text-lg sm:text-xl text-slate-300 max-w-2xl mx-auto leading-relaxed font-normal">
          Deixe a organização das viagens corporativas mais simples, estruturada e transparente.
        </p>

        {/* Buttons */}
        <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
          <button
            onClick={onOpenLeadForm}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-4 text-xs sm:text-sm font-bold uppercase tracking-wider text-slate-950 bg-amber-400 hover:bg-amber-300 rounded-md transition-all shadow-md hover:shadow-lg cursor-pointer whitespace-nowrap"
          >
            <span>Solicitar Diagnóstico Gratuito</span>
            <ArrowRight className="w-4 h-4" />
          </button>

          <a
            href={getWhatsAppLink(COMPANY_CONFIG.diagnosticWhatsAppMessage)}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-4 text-xs sm:text-sm font-bold uppercase tracking-wider text-white bg-slate-800/90 hover:bg-slate-700/90 border border-slate-700 rounded-md transition-colors whitespace-nowrap"
          >
            <MessageSquare className="w-4 h-4 text-emerald-400" />
            <span>Falar pelo WhatsApp</span>
          </a>
        </div>

        <p className="mt-6 text-xs text-slate-400">
          Atendimento para pequenas e médias empresas em todo o território nacional.
        </p>
      </div>
    </section>
  );
};
