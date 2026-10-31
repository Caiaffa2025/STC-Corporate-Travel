import React from 'react';
import { motion } from 'framer-motion';
import { 
  Plane, 
  Lock, 
  UserCheck, 
  ShieldCheck, 
  ArrowRight, 
  Layers, 
  CheckCircle2, 
  Clock,
  Sparkles
} from 'lucide-react';

interface PlatformAccessSectionProps {
  onOpenEmployeePortal: () => void;
  onOpenAdmin: () => void;
}

export const PlatformAccessSection: React.FC<PlatformAccessSectionProps> = ({
  onOpenEmployeePortal,
  onOpenAdmin,
}) => {
  return (
    <section id="plataforma-acesso" className="py-16 md:py-24 bg-white border-y border-slate-200 relative overflow-hidden">
      {/* Background architectural grid pattern */}
      <div 
        className="absolute inset-0 pointer-events-none opacity-[0.02]" 
        style={{
          backgroundImage: `radial-gradient(#0f172a 1px, transparent 1px)`,
          backgroundSize: '24px 24px',
        }}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="max-w-3xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider text-slate-700 bg-slate-100 border border-slate-200 mb-3 shadow-2xs">
            <Sparkles className="w-3.5 h-3.5 text-amber-500" />
            <span>Acesso Exclusivo à Plataforma</span>
          </div>

          <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-slate-950 tracking-tight text-balance">
            Dois canais de acesso integrados para sua empresa
          </h2>

          <p className="mt-3 text-base sm:text-lg text-slate-600 leading-relaxed font-normal">
            Os colaboradores solicitam viagens em tempo real e a liderança aprova com governança, transparência e controle orçamentário.
          </p>
        </div>

        {/* 2 Big Access Cards: Solicitar Minha Viagem & Administrador */}
        <div className="mt-12 grid grid-cols-1 lg:grid-cols-2 gap-8 items-stretch">
          
          {/* CARD 1: SOLICITAR MINHA VIAGEM (COLABORADORES) */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
            className="rounded-2xl border-2 border-amber-400 bg-gradient-to-b from-amber-50/50 via-white to-white p-7 sm:p-9 shadow-lg flex flex-col justify-between relative overflow-hidden group hover:shadow-xl transition-all"
          >
            <div className="absolute top-0 right-0 w-40 h-40 bg-amber-400/10 rounded-full blur-2xl pointer-events-none" />

            <div>
              <div className="flex items-center justify-between mb-5">
                <div className="w-12 h-12 rounded-xl bg-amber-400 text-slate-950 flex items-center justify-center font-bold shadow-md">
                  <Plane className="w-6 h-6 text-slate-950" />
                </div>

                <span className="text-[11px] font-bold uppercase tracking-wider px-3 py-1 rounded-full bg-amber-100 text-amber-900 border border-amber-300">
                  Acesso dos Funcionários
                </span>
              </div>

              <h3 className="text-2xl font-extrabold text-slate-950 leading-tight">
                Solicitar Minha Viagem
              </h3>

              <p className="mt-3 text-sm text-slate-700 leading-relaxed">
                Colaboradores cadastrados entram na plataforma com seu <strong>Nome e Senha</strong> e têm acesso imediato ao formulário de solicitações de suas viagens em tempo real.
              </p>

              {/* Functional Highlights */}
              <div className="mt-6 space-y-2.5 pt-4 border-t border-amber-200/60 text-xs text-slate-700 font-medium">
                <div className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <span><strong>Formulário em tempo real:</strong> escolha voos (econômica/executiva), hotéis ou pacote completo.</span>
                </div>
                <div className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <span><strong>Tudo gravado na sua Dashboard:</strong> acompanhe histórico, custos estimados e prazos.</span>
                </div>
                <div className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <span><strong>Notificação de aprovação:</strong> receba confirmações de bilhetes e vouchers direto na plataforma.</span>
                </div>
              </div>
            </div>

            <div className="mt-8 pt-5 border-t border-slate-100">
              <button
                type="button"
                onClick={onOpenEmployeePortal}
                className="w-full inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl font-bold text-xs uppercase tracking-wider text-slate-950 bg-amber-400 hover:bg-amber-300 transition-all shadow-md active:scale-98 cursor-pointer"
              >
                <Plane className="w-4 h-4 text-slate-950" />
                <span>Acessar: Solicitar Minha Viagem</span>
                <ArrowRight className="w-4 h-4" />
              </button>
              <p className="text-[11px] text-center text-slate-500 mt-2">
                Acesso com Nome e Senha pessoal cadastrada.
              </p>
            </div>
          </motion.div>

          {/* CARD 2: ADMINISTRADOR (GESTÃO & ALÇADAS) */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.55, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
            className="rounded-2xl border-2 border-slate-800 bg-slate-950 text-white p-7 sm:p-9 shadow-xl flex flex-col justify-between relative overflow-hidden group hover:border-slate-700 transition-all"
          >
            <div className="absolute top-0 right-0 w-40 h-40 bg-sky-900/20 rounded-full blur-2xl pointer-events-none" />

            <div>
              <div className="flex items-center justify-between mb-5">
                <div className="w-12 h-12 rounded-xl bg-slate-800 border border-slate-700 text-amber-400 flex items-center justify-center font-bold shadow-md">
                  <Lock className="w-6 h-6 text-amber-400" />
                </div>

                <span className="text-[11px] font-bold uppercase tracking-wider px-3 py-1 rounded-full bg-slate-800 text-amber-300 border border-amber-400/40">
                  Área de Gestão
                </span>
              </div>

              <h3 className="text-2xl font-extrabold text-white leading-tight">
                Administrador
              </h3>

              <p className="mt-3 text-sm text-slate-300 leading-relaxed">
                Painel exclusivo para a liderança e equipe financeira. Avalie pedidos, defina custos aprovados, gerencie colaboradores e configure os dados corporativos da plataforma.
              </p>

              {/* Functional Highlights */}
              <div className="mt-6 space-y-2.5 pt-4 border-t border-slate-800 text-xs text-slate-300 font-medium">
                <div className="flex items-start gap-2">
                  <ShieldCheck className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                  <span><strong>Alçada de Aprovação:</strong> aprove com teto de custo ou recuse com justificativa formal.</span>
                </div>
                <div className="flex items-start gap-2">
                  <UserCheck className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                  <span><strong>Gestão de Funcionários:</strong> cadastre novos viajantes e organize por departamento.</span>
                </div>
                <div className="flex items-start gap-2">
                  <Layers className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                  <span><strong>Edição da Landing Page:</strong> atualize textos, imagens e contatos salvos no Firestore.</span>
                </div>
              </div>
            </div>

            <div className="mt-8 pt-5 border-t border-slate-800">
              <button
                type="button"
                onClick={onOpenAdmin}
                className="w-full inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl font-bold text-xs uppercase tracking-wider text-slate-900 bg-white hover:bg-slate-100 transition-all shadow-md active:scale-98 cursor-pointer"
              >
                <Lock className="w-4 h-4 text-amber-600" />
                <span>Acessar: Administrador</span>
                <ArrowRight className="w-4 h-4" />
              </button>
              <p className="text-[11px] text-center text-slate-400 mt-2">
                Área protegida por senha de gestão (Senha: 1966).
              </p>
            </div>
          </motion.div>

        </div>

      </div>
    </section>
  );
};
