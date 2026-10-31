import React from 'react';
import { ArrowRight, Compass, ShieldCheck, UserCheck, Quote, Sparkles } from 'lucide-react';
import { DEFAULT_IMAGES } from '../assets/images';

interface HeroProps {
  onOpenLeadForm: () => void;
  headline?: string;
  subtitle?: string;
  manifesto?: string;
  heroImage?: string;
}

export const Hero: React.FC<HeroProps> = ({ 
  onOpenLeadForm,
  headline = 'Sua empresa viaja. Nós cuidamos de toda a gestão.',
  subtitle = 'Tecnologia, organização e gestão especializada para empresas que precisam viajar.',
  manifesto = 'Assumimos a gestão das viagens corporativas da sua empresa, desde a solicitação até a reserva, administração e controle financeiro. Tudo centralizado em uma plataforma exclusiva PARA CADA EMPRESA, com acompanhamento e transparência.',
  heroImage = DEFAULT_IMAGES.heroAirport,
}) => {
  const scrollToSolutions = (e: React.MouseEvent) => {
    e.preventDefault();
    const target = document.querySelector('#diferenciais-stc');
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="inicio" className="relative pt-28 pb-16 md:pt-34 md:pb-20 bg-white overflow-hidden">
      {/* Background architectural grid pattern */}
      <div 
        className="absolute inset-0 pointer-events-none opacity-[0.03]" 
        style={{
          backgroundImage: `radial-gradient(#0f172a 1px, transparent 1px)`,
          backgroundSize: '24px 24px',
        }}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-8 items-center">
          {/* Left Column: Value Proposition, Manifesto & CTAs */}
          <div className="lg:col-span-7 flex flex-col justify-center">
            {/* Tagline / Kicker com destaque */}
            <div className="flex items-center gap-2 text-xs uppercase tracking-widest text-slate-600 font-bold mb-3">
              <span className="w-2 h-2 rounded-full bg-amber-500" />
              <span>STC Corporate Travel · Gestão inteligente de viagens corporativas</span>
            </div>

            <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-slate-950 tracking-tight leading-[1.15] text-balance">
              {headline}
            </h1>

            {/* Subtítulo com ênfase solicitada */}
            <div className="mt-4 p-3.5 rounded-lg bg-slate-50 border border-slate-200 text-slate-900 font-semibold text-base sm:text-lg leading-snug">
              {subtitle}
            </div>

            <p className="mt-3 text-sm sm:text-base text-slate-600 leading-relaxed font-normal">
              Terceirize a organização das viagens corporativas da sua empresa e tenha mais controle sobre passagens aéreas, hospedagens, alterações, aprovações e despesas com visibilidade total.
            </p>

            {/* MANIFESTO CENTRAL COM MÁXIMA VISIBILIDADE E ÊNFASE NO TEXTO */}
            <div className="mt-6 p-5 sm:p-6 rounded-xl bg-slate-950 text-white border-2 border-slate-800 shadow-xl relative overflow-hidden">
              <div className="absolute top-0 left-0 w-2 h-full bg-amber-400" />
              <div className="flex items-center justify-between mb-2">
                <span className="text-[11px] font-bold uppercase tracking-wider text-amber-400 flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                  Compromisso STC Corporate Travel
                </span>
                <span className="text-xs text-slate-400 font-mono">Plataforma Exclusiva</span>
              </div>
              <p className="text-base sm:text-lg font-medium leading-relaxed text-slate-100">
                &ldquo;{manifesto}&rdquo;
              </p>
            </div>

            {/* CTAs */}
            <div className="mt-8 flex flex-col sm:flex-row items-stretch sm:items-center gap-4">
              <button
                onClick={onOpenLeadForm}
                className="inline-flex items-center justify-center gap-2 px-7 py-3.5 text-sm font-semibold uppercase tracking-wider text-white bg-slate-900 rounded-md hover:bg-slate-800 transition-all shadow-sm hover:shadow cursor-pointer whitespace-nowrap"
              >
                <span>Solicitar uma proposta</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <a
                href="#diferenciais-stc"
                onClick={scrollToSolutions}
                className="inline-flex items-center justify-center px-7 py-3.5 text-sm font-semibold uppercase tracking-wider text-slate-800 bg-slate-100 hover:bg-slate-200 border border-slate-200 rounded-md transition-colors whitespace-nowrap"
              >
                Ver os 7 Diferenciais
              </a>
            </div>

            {/* Three key differentials below buttons */}
            <div className="mt-10 pt-6 border-t border-slate-200/80 grid grid-cols-1 sm:grid-cols-3 gap-6">
              <div className="flex items-start gap-3">
                <div className="p-2 rounded bg-slate-100 text-slate-900 shrink-0">
                  <Compass className="w-5 h-5 text-sky-800" />
                </div>
                <div>
                  <h3 className="text-sm font-bold text-slate-900">Gestão centralizada</h3>
                  <p className="text-xs text-slate-500 mt-0.5 leading-snug">
                    Todas as solicitações e fornecedores em um canal unificado.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="p-2 rounded bg-slate-100 text-slate-900 shrink-0">
                  <ShieldCheck className="w-5 h-5 text-sky-800" />
                </div>
                <div>
                  <h3 className="text-sm font-bold text-slate-900">Controle de despesas</h3>
                  <p className="text-xs text-slate-500 mt-0.5 leading-snug">
                    Comprovantes, pagamentos e regras orçamentárias respeitadas.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="p-2 rounded bg-slate-100 text-slate-900 shrink-0">
                  <UserCheck className="w-5 h-5 text-sky-800" />
                </div>
                <div>
                  <h3 className="text-sm font-bold text-slate-900">Atendimento especializado</h3>
                  <p className="text-xs text-slate-500 mt-0.5 leading-snug">
                    Suporte dedicado adaptado à rotina da sua equipe.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Executive Airport Photography */}
          <div className="lg:col-span-5 relative">
            <div className="relative rounded-xl overflow-hidden border border-slate-200 shadow-xl bg-slate-900">
              <img
                src={heroImage || DEFAULT_IMAGES.heroAirport}
                alt="Executiva em trânsito em aeroporto corporativo com bagagem de mão e notebook"
                className="w-full h-[440px] sm:h-[500px] lg:h-[540px] object-cover object-center"
                referrerPolicy="no-referrer"
                loading="eager"
                onError={(e) => {
                  (e.currentTarget as HTMLImageElement).src = '/images/hero-airport.jpg';
                }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/85 via-transparent to-transparent pointer-events-none" />
              
              {/* Contextual caption overlay */}
              <div className="absolute bottom-4 left-4 right-4 p-4 rounded-lg bg-slate-950/90 backdrop-blur-md border border-white/10 text-white">
                <p className="text-xs font-semibold uppercase tracking-wider text-amber-300">
                  STC Corporate Travel · Solução Dedicada
                </p>
                <p className="text-sm font-medium mt-1 text-slate-200">
                  Plataforma exclusiva para sua empresa, com governança operacional e controle financeiro em tempo real.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
