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

  // Destaca a frase "PARA CADA EMPRESA" em amarelo conforme solicitado
  const renderHighlightedManifesto = (text: string) => {
    const parts = text.split(/(PARA CADA EMPRESA)/gi);
    return parts.map((part, index) => {
      if (part.toUpperCase() === 'PARA CADA EMPRESA') {
        return (
          <span
            key={index}
            className="text-amber-300 font-extrabold bg-amber-400/20 px-2 py-0.5 rounded border border-amber-400/50 shadow-sm underline decoration-amber-400 decoration-2 underline-offset-4 tracking-wide inline-block mx-0.5"
          >
            {part}
          </span>
        );
      }
      return <React.Fragment key={index}>{part}</React.Fragment>;
    });
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

      {/* Marca d'água de aeronave em cor bem clarinha no fundo do Hero */}
      <div 
        className="absolute -top-6 sm:top-6 right-0 lg:right-1/4 w-[380px] sm:w-[600px] lg:w-[820px] h-auto pointer-events-none select-none opacity-[0.05] text-slate-900 z-0 overflow-hidden transform -rotate-3 transition-opacity"
        aria-hidden="true"
      >
        <svg viewBox="0 0 1000 500" fill="currentColor" xmlns="http://www.w3.org/2000/svg" className="w-full h-auto">
          <path d="M120 310 C 220 280, 420 240, 680 190 C 780 170, 880 150, 940 130 C 970 120, 990 120, 995 125 C 998 128, 990 140, 960 160 C 880 210, 760 270, 640 315 C 480 375, 290 410, 160 400 C 120 395, 100 370, 110 345 Z" />
          <path d="M480 230 L 320 40 C 315 30, 325 25, 335 28 L 400 55 L 570 210 Z" />
          <path d="M520 290 L 460 520 C 455 532, 442 532, 435 522 L 405 475 L 440 315 Z" />
          <path d="M150 310 L 60 250 C 50 242, 58 235, 68 238 L 170 275 Z" />
          <path d="M160 345 L 80 390 C 70 396, 65 388, 72 380 L 145 340 Z" />
          <path d="M170 300 L 85 140 C 80 130, 92 125, 102 130 L 205 270 Z" />
        </svg>
      </div>

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
                <span className="text-xs text-amber-300 font-mono font-bold bg-amber-400/10 px-2 py-0.5 rounded border border-amber-400/30">
                  PARA CADA EMPRESA
                </span>
              </div>
              <p className="text-base sm:text-lg font-medium leading-relaxed text-slate-100">
                &ldquo;{renderHighlightedManifesto(manifesto)}&rdquo;
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
