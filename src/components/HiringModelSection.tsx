import React from 'react';
import { Check, ArrowRight, ShieldCheck, Star } from 'lucide-react';

interface HiringModelSectionProps {
  onSelectPlan: (planName: string) => void;
}

export const HiringModelSection: React.FC<HiringModelSectionProps> = ({ onSelectPlan }) => {
  const plans = [
    {
      name: 'Plano Essencial',
      badge: 'Início Ágil',
      description: 'Para empresas que precisam de apoio nas cotações e na organização das reservas.',
      idealFor: 'Empresas com volume pontual que buscam agilidade na compra de bilhetes e hotéis.',
      features: [
        'Cotação comparativa de passagens aéreas',
        'Pesquisa e reserva de hospedagens corporativas',
        'Envio de vouchers diretamente aos viajantes',
        'Atendimento em horário comercial',
        'Canal direto para solicitações da equipe',
      ],
      isPopular: false,
    },
    {
      name: 'Plano Gestão',
      badge: 'Mais Escolhido',
      description: 'Para empresas que precisam de suporte nas solicitações, aprovações, reservas, alterações e organização financeira.',
      idealFor: 'PMEs com rotina frequente de viagens que necessitam de governança e conciliação.',
      features: [
        'Tudo incluído no Plano Essencial',
        'Estruturação de formulário e fluxo de solicitações',
        'Gestão de alçadas e aprovações prévias com gestores',
        'Suporte completo para alterações e remarcações',
        'Acompanhamento de créditos e cancelamentos',
        'Organização de comprovantes e notas para o financeiro',
      ],
      isPopular: true,
    },
    {
      name: 'Plano Personalizado',
      badge: 'Operações Complexas',
      description: 'Para operações com maior volume de viagens, processos específicos e necessidade de relatórios ou ferramentas personalizadas.',
      idealFor: 'Médias empresas, indústrias ou equipes externas em expansão acelerada.',
      features: [
        'Tudo incluído no Plano Gestão',
        'Acordo de Nível de Serviço (SLA) customizado',
        'Relatórios gerenciais periódicos por centro de custo',
        'Desenho de política interna de viagens sob medida',
        'Gestão de múltiplos centros de custo e departamentos',
        'Atendimento prioritário com analista dedicado',
      ],
      isPopular: false,
    },
  ];

  return (
    <section id="planos" className="py-16 md:py-24 bg-slate-100/60 border-y border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto text-center">
          <div className="text-xs uppercase tracking-widest text-slate-500 font-semibold mb-3">
            Formatos de Atendimento
          </div>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-slate-950 tracking-tight text-balance">
            Uma solução adequada à realidade da sua empresa.
          </h2>
          <p className="mt-4 text-base text-slate-600 leading-relaxed">
            Formatamos o modelo de gestão conforme a frequência de viagens e as necessidades operacionais da sua equipe.
          </p>
        </div>

        {/* 3 Plans Grid (Responsive across mobile, tablet and desktop) */}
        <div className="mt-14 grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8 items-stretch">
          {plans.map((plan, index) => (
            <div
              key={index}
              className={`rounded-xl p-7 sm:p-8 flex flex-col justify-between transition-all ${
                plan.isPopular
                  ? 'bg-white border-2 border-slate-900 shadow-lg relative'
                  : 'bg-white border border-slate-200 shadow-2xs hover:border-slate-300'
              }`}
            >
              {plan.isPopular && (
                <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 bg-slate-900 text-amber-300 text-[11px] font-bold uppercase tracking-wider px-3 py-1 rounded-full flex items-center gap-1.5 shadow-xs">
                  <Star className="w-3 h-3 fill-amber-300 text-amber-300" />
                  <span>Recomendado para PMEs</span>
                </div>
              )}

              <div>
                <div className="flex items-center justify-between">
                  <h3 className="text-xl font-bold text-slate-950">{plan.name}</h3>
                  <span className="text-xs font-semibold text-slate-500">
                    {plan.badge}
                  </span>
                </div>

                <p className="mt-3 text-sm text-slate-700 leading-relaxed font-medium">
                  {plan.description}
                </p>

                <div className="mt-4 p-3 rounded-lg bg-slate-50 border border-slate-100 text-xs text-slate-600">
                  <strong className="text-slate-800 block mb-0.5">Indicado para:</strong>
                  {plan.idealFor}
                </div>

                <div className="mt-6 pt-6 border-t border-slate-100">
                  <div className="text-xs uppercase font-bold text-slate-400 tracking-wider mb-3">
                    Escopo de Serviços:
                  </div>
                  <ul className="space-y-3">
                    {plan.features.map((feature, fIndex) => (
                      <li key={fIndex} className="flex items-start gap-2.5 text-xs sm:text-sm text-slate-700">
                        <Check className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <div className="mt-8 pt-6 border-t border-slate-100">
                <button
                  onClick={() => onSelectPlan(plan.name)}
                  className={`w-full py-3 px-4 rounded-md text-xs font-semibold uppercase tracking-wider transition-all flex items-center justify-center gap-2 cursor-pointer ${
                    plan.isPopular
                      ? 'bg-slate-900 text-white hover:bg-slate-800 shadow-xs'
                      : 'bg-slate-100 text-slate-900 hover:bg-slate-200 border border-slate-200'
                  }`}
                >
                  <span>Solicitar proposta</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Informative Disclaimer as strictly required */}
        <div className="mt-12 max-w-3xl mx-auto p-4 rounded-lg bg-white border border-slate-200 text-center text-xs text-slate-600">
          <ShieldCheck className="w-4 h-4 text-slate-500 inline mr-1.5 -mt-0.5" />
          <span>
            O escopo, os prazos de atendimento, os limites operacionais e o investimento são definidos após o diagnóstico personalizado da empresa.
          </span>
        </div>
      </div>
    </section>
  );
};
