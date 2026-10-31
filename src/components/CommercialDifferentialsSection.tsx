import React from 'react';
import { 
  Laptop, 
  PlaneTakeoff, 
  CheckCircle2, 
  ShoppingCart, 
  RefreshCw, 
  BarChart3, 
  Headphones, 
  ArrowRight,
  ShieldCheck
} from 'lucide-react';

interface CommercialDifferentialsSectionProps {
  onOpenLeadForm: () => void;
}

export const CommercialDifferentialsSection: React.FC<CommercialDifferentialsSectionProps> = ({
  onOpenLeadForm,
}) => {
  const differentials = [
    {
      number: '01',
      title: 'Plataforma própria com acesso do cliente',
      description: 'Ambiente exclusivo e parametrizado para sua empresa registrar solicitações, acompanhar status de viagens e acessar relatórios em um só lugar.',
      icon: Laptop,
      highlight: 'Exclusiva PARA CADA EMPRESA',
    },
    {
      number: '02',
      title: 'Gestão de passagens aéreas e hotéis',
      description: 'Cotação comparativa em múltiplos fornecedores, tarifas corporativas, seleção de voos estratégicos e hospedagens convenientes.',
      icon: PlaneTakeoff,
      highlight: 'Pesquisa multicanal',
    },
    {
      number: '03',
      title: 'Organização de solicitações e aprovações',
      description: 'Fluxo padronizado com alçadas de autorização pré-configuradas. Zero viagens emitidas sem a concordância do gestor responsável.',
      icon: CheckCircle2,
      highlight: 'Governança e política interna',
    },
    {
      number: '04',
      title: 'Administração de compras e reservas',
      description: 'Operação integral de emissão, vouchers enviados diretamente aos passageiros e centralização de faturas para a sua contabilidade.',
      icon: ShoppingCart,
      highlight: 'Agilidade de ponta a ponta',
    },
    {
      number: '05',
      title: 'Acompanhamento de alterações',
      description: 'Resolução rápida de remarcações, cancelamentos, no-show e recuperação ativa de créditos junto às companhias aéreas.',
      icon: RefreshCw,
      highlight: 'Suporte a imprevistos',
    },
    {
      number: '06',
      title: 'Controle financeiro e relatórios',
      description: 'Consolidação periódica de custos por centro de custo, colaborador e projeto, garantindo prestação de contas precisa.',
      icon: BarChart3,
      highlight: 'Visibilidade para a diretoria',
    },
    {
      number: '07',
      title: 'Atendimento especializado',
      description: 'Equipe consultiva focada no perfil corporativo de pequenas e médias empresas brasileiras, com suporte ágil por WhatsApp e e-mail.',
      icon: Headphones,
      highlight: 'Consultores dedicados',
    },
  ];

  return (
    <section id="diferenciais-stc" className="py-16 md:py-24 bg-slate-900 text-white relative overflow-hidden">
      {/* Decorative subtle ambient lights */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-sky-950/40 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-amber-950/20 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header with exact requested phrases */}
        <div className="max-w-3xl">
          <div className="text-xs uppercase tracking-widest text-amber-400 font-bold mb-3 flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-amber-400" />
            <span>Diferenciais Comerciais STC Corporate Travel</span>
          </div>

          <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-white tracking-tight leading-tight text-balance">
            Gestão inteligente de viagens corporativas.
          </h2>

          <p className="mt-4 text-base sm:text-lg text-slate-300 font-medium leading-relaxed">
            Tecnologia, organização e gestão especializada para empresas que precisam viajar.
          </p>

          <p className="mt-2 text-sm text-slate-400 leading-relaxed">
            Conheça os 7 pilares comerciais que transformam a rotina de deslocamentos da sua empresa em um processo estruturado, econômico e sem estresse operacional:
          </p>
        </div>

        {/* 7 Commercial Differentials Grid + CTA Card (8 cards total, 4x2 on desktop, 2x4 on tablet) */}
        <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {differentials.map((diff, index) => {
            const Icon = diff.icon;
            const isFeatured = index === 0; // First item: Plataforma própria com acesso do cliente
            return (
              <div
                key={diff.number}
                className={`p-5 sm:p-6 rounded-xl border transition-all flex flex-col justify-between ${
                  isFeatured
                    ? 'bg-slate-800/95 border-amber-400/80 shadow-lg ring-1 ring-amber-400/40'
                    : 'bg-slate-950/70 border-slate-800 hover:border-slate-700 hover:bg-slate-950'
                }`}
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <div className="w-10 h-10 rounded-lg bg-slate-800 border border-slate-700 flex items-center justify-center text-amber-400 shadow-inner">
                      <Icon className="w-5 h-5 text-amber-400" />
                    </div>
                    <span className="font-mono text-sm font-bold text-amber-400 bg-amber-950/60 px-2.5 py-0.5 rounded border border-amber-800/60">
                      {diff.number}
                    </span>
                  </div>

                  <div className={`text-[11px] font-bold uppercase tracking-wider mb-1 ${
                    isFeatured ? 'text-amber-300 font-extrabold' : 'text-slate-400'
                  }`}>
                    {diff.highlight}
                  </div>

                  <h3 className="text-base sm:text-lg font-bold text-white leading-snug">
                    {diff.title}
                  </h3>

                  <p className="mt-2.5 text-xs sm:text-sm text-slate-300 leading-relaxed">
                    {diff.description}
                  </p>
                </div>

                <div className="mt-5 pt-3 border-t border-slate-800/80">
                  <span className="text-[11px] font-semibold text-slate-400 flex items-center gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                    Garantido no escopo STC
                  </span>
                </div>
              </div>
            );
          })}

          {/* Quick summary card linking to Proposal */}
          <div className="p-6 sm:p-7 rounded-xl border border-amber-400/50 bg-gradient-to-br from-slate-900 to-slate-950 flex flex-col justify-between">
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-amber-400">
                Próximo Passo
              </span>
              <h3 className="text-lg font-bold text-white mt-2 leading-snug">
                Sua empresa pronta para uma gestão profissional de viagens
              </h3>
              <p className="mt-2 text-xs sm:text-sm text-slate-300 leading-relaxed">
                Solicite uma demonstração da plataforma exclusiva e receba uma proposta estruturada para as demandas da sua equipe.
              </p>
            </div>

            <div className="mt-6 pt-4">
              <button
                onClick={onOpenLeadForm}
                className="w-full inline-flex items-center justify-center gap-2 px-5 py-3 text-xs font-bold uppercase tracking-wider text-slate-950 bg-amber-400 hover:bg-amber-300 rounded-md transition-colors cursor-pointer"
              >
                <span>Solicitar Proposta STC</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
