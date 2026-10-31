import React from 'react';
import { motion } from 'framer-motion';
import { 
  Plane, 
  Building, 
  CheckSquare, 
  RefreshCw, 
  Coins, 
  BarChart3,
  ShieldCheck
} from 'lucide-react';
import { DEFAULT_IMAGES } from '../assets/images';

interface SolutionsSectionProps {
  onSelectService: (serviceName: string) => void;
  meetingImage?: string;
}

export const SolutionsSection: React.FC<SolutionsSectionProps> = ({ 
  onSelectService,
  meetingImage = DEFAULT_IMAGES.businessMeeting,
}) => {
  const services = [
    {
      id: 'passagens',
      number: '01',
      icon: Plane,
      title: 'Gestão de passagens aéreas',
      desc: 'Cotação de opções, comparação de horários, tarifas e condições, conforme as políticas e necessidades da empresa.',
      details: 'Pesquisa detalhada em todas as cias aéreas, observando franquia de bagagem, flexibilidade tarifária e janelas de antecedência para evitar custos de última hora.',
    },
    {
      id: 'hospedagens',
      number: '02',
      icon: Building,
      title: 'Gestão de hospedagens',
      desc: 'Pesquisa e organização de hotéis de acordo com localização, orçamento, período e perfil do viajante.',
      details: 'Mapeamento de hotéis próximos ao local de reunião ou evento da sua equipe, verificando comodidades corporativas (Wi-Fi, café da manhã incluso e faturamento direto).',
    },
    {
      id: 'aprovacoes',
      number: '03',
      icon: CheckSquare,
      title: 'Solicitações e aprovações',
      desc: 'Organização do fluxo de pedidos de viagem, com informações padronizadas e encaminhamento para aprovação dos responsáveis.',
      details: 'Fim dos pedidos por conversas soltas. Cada viagem é registrada com justificativa, centro de custo e alçada de aprovação antes de qualquer emissão.',
    },
    {
      id: 'alteracoes',
      number: '04',
      icon: RefreshCw,
      title: 'Alterações e cancelamentos',
      desc: 'Acompanhamento das solicitações de remarcação e cancelamento, conforme as regras tarifárias e as condições dos fornecedores.',
      details: 'Gestão ativa de créditos de passagens canceladas e solicitação de reembolsos junto aos fornecedores, evitando desperdício de valores já pagos pela sua empresa.',
    },
    {
      id: 'financeiro',
      number: '05',
      icon: Coins,
      title: 'Controle financeiro',
      desc: 'Organização de despesas, comprovantes, pagamentos e informações para acompanhamento dos gastos com viagens.',
      details: 'Reunião e checagem de vouchers, faturas e comprovantes fiscais com conciliação clara para facilitar o trabalho do seu time financeiro e contábil.',
    },
    {
      id: 'relatorios',
      number: '06',
      icon: BarChart3,
      title: 'Relatórios gerenciais',
      desc: 'Consolidação dos dados de viagens, despesas por período, centro de custo ou colaborador, conforme os dados disponibilizados.',
      details: 'Visão periódica organizada dos gastos da empresa, permitindo identificar padrões, departamentos mais demandantes e apoiar decisões orçamentárias futuras.',
    },
  ];

  return (
    <section id="solucoes" className="py-16 md:py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="max-w-3xl">
          <div className="text-xs uppercase tracking-widest text-slate-500 font-semibold mb-3">
            Nossas Frentes de Atuação
          </div>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-slate-950 tracking-tight text-balance">
            Uma gestão profissional para todas as etapas da viagem.
          </h2>
          <p className="mt-4 text-base sm:text-lg text-slate-600 leading-relaxed font-normal">
            Atuamos como uma <strong className="text-slate-900 font-semibold">extensão operacional da equipe administrativa ou financeira</strong> da sua empresa, cuidando de cada detalhe com rigor processual, velocidade e responsabilidade.
          </p>
        </div>

        {/* Feature Visual Spotlight Banner */}
        <motion.div 
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.15 }}
          transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
          className="mt-10 rounded-xl overflow-hidden border border-slate-200 bg-slate-900 relative"
        >
          <div className="grid grid-cols-1 lg:grid-cols-12 items-center">
            <div className="lg:col-span-5 p-6 sm:p-8 lg:p-10 text-white z-10">
              <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-amber-300">
                <ShieldCheck className="w-4 h-4 text-amber-300" />
                <span>Extensão Operacional da sua Empresa</span>
              </div>
              <h3 className="text-xl sm:text-2xl font-bold mt-3 text-white leading-snug">
                Sem necessidade de contratar mais funcionários para o administrativo
              </h3>
              <p className="mt-3 text-sm text-slate-300 leading-relaxed">
                Você conta com uma equipe especializada em rotinas corporativas de deslocamento sem aumentar a folha de pagamento da sua empresa nem perder tempo com cotações manuais.
              </p>
            </div>
            <div className="lg:col-span-7 h-64 sm:h-80 lg:h-96 relative">
              <img
                src={meetingImage || DEFAULT_IMAGES.businessMeeting}
                alt="Equipe corporativa analisando relatórios e planos de viagem em sala de reuniões executiva"
                className="w-full h-full object-cover object-center"
                referrerPolicy="no-referrer"
                loading="lazy"
                onError={(e) => {
                  (e.currentTarget as HTMLImageElement).src = '/images/business-meeting.jpg';
                }}
              />
              <div className="absolute inset-0 bg-gradient-to-t lg:bg-gradient-to-r from-slate-900 via-slate-900/40 to-transparent" />
            </div>
          </div>
        </motion.div>

        {/* 6 Structured Service Cards (Bento-Grid style with clear numbering) */}
        <div className="mt-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service, index) => {
            const Icon = service.icon;
            return (
              <motion.div
                key={service.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.1 }}
                transition={{ duration: 0.5, delay: index * 0.07, ease: [0.22, 1, 0.36, 1] }}
                className="group p-6 sm:p-7 rounded-xl border border-slate-200/90 bg-slate-50/50 hover:bg-white hover:border-slate-300 hover:shadow-md transition-all flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-5">
                    <div className="w-11 h-11 rounded-lg bg-white border border-slate-200 flex items-center justify-center text-slate-900 shadow-2xs group-hover:border-slate-400 transition-colors">
                      <Icon className="w-5 h-5 text-sky-800" />
                    </div>
                    <span className="font-mono text-sm font-bold text-slate-500">
                      {service.number}
                    </span>
                  </div>

                  <h3 className="text-lg font-bold text-slate-950 group-hover:text-slate-900 transition-colors">
                    {service.title}
                  </h3>

                  <p className="mt-2.5 text-sm font-medium text-slate-700 leading-relaxed">
                    {service.desc}
                  </p>

                  <p className="mt-3 text-xs text-slate-500 leading-relaxed border-t border-slate-200/70 pt-3">
                    {service.details}
                  </p>
                </div>

                <div className="mt-5 pt-3">
                  <button
                    onClick={() => onSelectService(service.title)}
                    className="text-xs font-semibold uppercase tracking-wider text-slate-900 hover:text-sky-800 flex items-center gap-1.5 transition-colors cursor-pointer"
                  >
                    <span>Incluir na proposta</span>
                    <span aria-hidden="true">→</span>
                  </button>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
