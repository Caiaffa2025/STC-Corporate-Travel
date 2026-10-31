import React from 'react';
import { motion } from 'framer-motion';
import { 
  FilePlus2, 
  UserCheck, 
  BadgeCheck, 
  Plane, 
  Building, 
  Layers, 
  Calculator, 
  ShieldCheck, 
  Users2, 
  Clock, 
  CheckCircle2, 
  XCircle, 
  CheckCheck, 
  Ban,
  Sparkles,
  ArrowRight
} from 'lucide-react';

export const HowItWorksSection: React.FC = () => {
  // 1. Os 3 Passos de Como Funciona com cores diferenciadas
  const steps = [
    {
      number: '01',
      title: 'Faça sua Solicitação',
      desc: "Acesse o sistema, clique em 'Nova Solicitação' e preencha os dados da sua viagem: destino, datas, horários e motivo.",
      icon: FilePlus2,
      tag: 'Passo 1 · Início Rápido',
      colorName: 'Âmbar Dourado',
      containerClasses: 'bg-amber-50/60 border-amber-300 hover:border-amber-400 hover:shadow-amber-100/50',
      badgeClasses: 'bg-amber-100 text-amber-900 border-amber-300',
      iconContainer: 'bg-amber-500 text-white shadow-amber-200',
      numberColor: 'text-amber-500',
      topBar: 'bg-amber-500',
    },
    {
      number: '02',
      title: 'Aguarde a Aprovação',
      desc: 'Sua solicitação é encaminhada automaticamente para o gestor responsável, que avaliará e aprovará ou rejeitará com justificativa.',
      icon: UserCheck,
      tag: 'Passo 2 · Alçada & Governança',
      colorName: 'Azul Celeste',
      containerClasses: 'bg-sky-50/60 border-sky-300 hover:border-sky-400 hover:shadow-sky-100/50',
      badgeClasses: 'bg-sky-100 text-sky-900 border-sky-300',
      iconContainer: 'bg-sky-600 text-white shadow-sky-200',
      numberColor: 'text-sky-600',
      topBar: 'bg-sky-600',
    },
    {
      number: '03',
      title: 'Viagem Confirmada',
      desc: 'Com a aprovação, você recebe a confirmação com todos os detalhes da viagem, custos aprovados e informações de hospedagem.',
      icon: BadgeCheck,
      tag: 'Passo 3 · Emissão & Vouchers',
      colorName: 'Verde Esmeralda',
      containerClasses: 'bg-emerald-50/60 border-emerald-300 hover:border-emerald-400 hover:shadow-emerald-100/50',
      badgeClasses: 'bg-emerald-100 text-emerald-900 border-emerald-300',
      iconContainer: 'bg-emerald-600 text-white shadow-emerald-200',
      numberColor: 'text-emerald-600',
      topBar: 'bg-emerald-600',
    },
  ];

  // 2. Os 6 Recursos com cores diferenciadas para cada tópico
  const resources = [
    {
      title: 'Passagens Aéreas',
      desc: 'Solicite voos nacionais com escolha de classe (econômica, executiva) e defina horários de ida e volta.',
      icon: Plane,
      category: 'Mobilidade Aérea',
      cardStyle: 'border-t-4 border-t-cyan-500 border-slate-200/90 bg-white hover:border-cyan-400 hover:shadow-md',
      iconBg: 'bg-cyan-50 text-cyan-600 border-cyan-200',
      badgeStyle: 'bg-cyan-50 text-cyan-700 border-cyan-200',
    },
    {
      title: 'Reserva de Hotéis',
      desc: 'Reserve hospedagem indicando o hotel preferido, datas de check-in e check-out com horários precisos.',
      icon: Building,
      category: 'Hospedagem Homologada',
      cardStyle: 'border-t-4 border-t-indigo-500 border-slate-200/90 bg-white hover:border-indigo-400 hover:shadow-md',
      iconBg: 'bg-indigo-50 text-indigo-600 border-indigo-200',
      badgeStyle: 'bg-indigo-50 text-indigo-700 border-indigo-200',
    },
    {
      title: 'Voo + Hotel',
      desc: 'Combine passagem e hospedagem em uma única solicitação, facilitando o planejamento completo da viagem.',
      icon: Layers,
      category: 'Pacote Integrado',
      cardStyle: 'border-t-4 border-t-amber-500 border-slate-200/90 bg-white hover:border-amber-400 hover:shadow-md',
      iconBg: 'bg-amber-50 text-amber-600 border-amber-200',
      badgeStyle: 'bg-amber-50 text-amber-800 border-amber-200',
    },
    {
      title: 'Controle de Custos',
      desc: 'Informe o custo estimado e acompanhe o custo aprovado. Total transparência no orçamento de viagens.',
      icon: Calculator,
      category: 'Finanças & Orçamento',
      cardStyle: 'border-t-4 border-t-emerald-500 border-slate-200/90 bg-white hover:border-emerald-400 hover:shadow-md',
      iconBg: 'bg-emerald-50 text-emerald-600 border-emerald-200',
      badgeStyle: 'bg-emerald-50 text-emerald-700 border-emerald-200',
    },
    {
      title: 'Aprovação Segura',
      desc: 'Fluxo de aprovação com prioridades (baixa, normal, alta, urgente) para garantir agilidade quando necessário.',
      icon: ShieldCheck,
      category: 'Governança & Prazos',
      cardStyle: 'border-t-4 border-t-rose-500 border-slate-200/90 bg-white hover:border-rose-400 hover:shadow-md',
      iconBg: 'bg-rose-50 text-rose-600 border-rose-200',
      badgeStyle: 'bg-rose-50 text-rose-700 border-rose-200',
    },
    {
      title: 'Por Departamento',
      desc: 'Organize as viagens por departamento: Área Técnica, Comercial, TI, Diretoria e muito mais.',
      icon: Users2,
      category: 'Gestão por Centros de Custo',
      cardStyle: 'border-t-4 border-t-purple-500 border-slate-200/90 bg-white hover:border-purple-400 hover:shadow-md',
      iconBg: 'bg-purple-50 text-purple-600 border-purple-200',
      badgeStyle: 'bg-purple-50 text-purple-700 border-purple-200',
    },
  ];

  // 3. Os 5 Status das Solicitações com cores diferenciadas
  const statusList = [
    {
      status: 'Pendente',
      label: 'Aguardando análise',
      icon: Clock,
      themeColor: 'bg-amber-500',
      cardBg: 'bg-gradient-to-b from-amber-50/80 to-amber-100/40 border-amber-300 text-amber-950',
      badge: 'bg-amber-500 text-white',
      dotColor: 'bg-amber-500',
      iconColor: 'text-amber-600',
      pulse: true,
    },
    {
      status: 'Aprovado',
      label: 'Confirmado',
      icon: CheckCircle2,
      themeColor: 'bg-emerald-500',
      cardBg: 'bg-gradient-to-b from-emerald-50/80 to-emerald-100/40 border-emerald-300 text-emerald-950',
      badge: 'bg-emerald-600 text-white',
      dotColor: 'bg-emerald-500',
      iconColor: 'text-emerald-600',
      pulse: false,
    },
    {
      status: 'Rejeitado',
      label: 'Não autorizado',
      icon: XCircle,
      themeColor: 'bg-rose-500',
      cardBg: 'bg-gradient-to-b from-rose-50/80 to-rose-100/40 border-rose-300 text-rose-950',
      badge: 'bg-rose-600 text-white',
      dotColor: 'bg-rose-500',
      iconColor: 'text-rose-600',
      pulse: false,
    },
    {
      status: 'Concluído',
      label: 'Viagem realizada',
      icon: CheckCheck,
      themeColor: 'bg-sky-500',
      cardBg: 'bg-gradient-to-b from-sky-50/80 to-sky-100/40 border-sky-300 text-sky-950',
      badge: 'bg-sky-600 text-white',
      dotColor: 'bg-sky-500',
      iconColor: 'text-sky-600',
      pulse: false,
    },
    {
      status: 'Cancelado',
      label: 'Cancelado',
      icon: Ban,
      themeColor: 'bg-slate-500',
      cardBg: 'bg-gradient-to-b from-slate-100/80 to-slate-200/40 border-slate-300 text-slate-800',
      badge: 'bg-slate-600 text-white',
      dotColor: 'bg-slate-500',
      iconColor: 'text-slate-600',
      pulse: false,
    },
  ];

  return (
    <section id="como-funciona" className="py-16 md:py-24 bg-slate-50/80 border-y border-slate-200 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 space-y-20">
        
        {/* PARTE 1: COMO FUNCIONA (3 PASSOS) */}
        <div>
          {/* Header */}
          <div className="max-w-3xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider text-slate-700 bg-white border border-slate-200 shadow-2xs mb-3">
              <span className="w-2 h-2 rounded-full bg-amber-500" />
              <span>Como funciona</span>
            </div>
            
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-slate-950 tracking-tight text-balance">
              Simples, rápido e eficiente
            </h2>
            
            <p className="mt-3 text-base sm:text-lg text-slate-600 leading-relaxed font-normal">
              Em apenas 3 passos você solicita, acompanha e confirma sua viagem corporativa.
            </p>
          </div>

          {/* 3 Steps Grid com cores diferenciadas */}
          <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8 relative">
            {steps.map((item, index) => {
              const Icon = item.icon;
              return (
                <motion.div
                  key={item.number}
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.15 }}
                  transition={{ duration: 0.55, delay: index * 0.1, ease: [0.22, 1, 0.36, 1] }}
                  className={`rounded-2xl border p-7 sm:p-8 shadow-xs relative flex flex-col justify-between overflow-hidden transition-all duration-300 ${item.containerClasses}`}
                >
                  {/* Color Header Bar */}
                  <div className={`absolute top-0 left-0 right-0 h-1.5 ${item.topBar}`} />

                  <div>
                    {/* Top Row: Number & Tag */}
                    <div className="flex items-center justify-between mb-6">
                      <div className="flex items-center gap-3">
                        <span className={`font-mono text-3xl sm:text-4xl font-extrabold tracking-tight ${item.numberColor}`}>
                          {item.number}
                        </span>
                        <div className={`w-11 h-11 rounded-xl flex items-center justify-center shadow-md ${item.iconContainer}`}>
                          <Icon className="w-5 h-5 text-white" />
                        </div>
                      </div>

                      <span className={`text-[11px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-md border ${item.badgeClasses}`}>
                        {item.tag}
                      </span>
                    </div>

                    <h3 className="text-xl font-bold text-slate-950 leading-snug">
                      {item.title}
                    </h3>

                    <p className="mt-3 text-sm text-slate-700 leading-relaxed font-medium">
                      {item.desc}
                    </p>
                  </div>

                  {/* Visual Step Indicator Bottom */}
                  <div className="mt-6 pt-4 border-t border-slate-200/60 flex items-center justify-between text-xs font-semibold text-slate-500">
                    <span className="flex items-center gap-1.5">
                      <span className={`w-2 h-2 rounded-full ${item.topBar}`} />
                      Etapa {index + 1} de 3
                    </span>
                    <span className="text-[11px] font-mono uppercase text-slate-400">
                      Fluxo STC
                    </span>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>

        {/* PARTE 2: RECURSOS (TUDO QUE VOCÊ PRECISA EM UM LUGAR) */}
        <div id="recursos" className="pt-8 border-t border-slate-200 scroll-mt-24">
          <div className="max-w-3xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider text-slate-700 bg-white border border-slate-200 shadow-2xs mb-3">
              <Sparkles className="w-3.5 h-3.5 text-amber-500" />
              <span>Recursos</span>
            </div>
            
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-slate-950 tracking-tight text-balance">
              Tudo que você precisa em um lugar
            </h2>
            
            <p className="mt-3 text-base text-slate-600 leading-relaxed">
              Módulos completos integrados em uma plataforma corporativa exclusiva para sua empresa:
            </p>
          </div>

          {/* 6 Recursos Cards com cores diferenciadas */}
          <div className="mt-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {resources.map((res, index) => {
              const Icon = res.icon;
              return (
                <motion.div
                  key={res.title}
                  initial={{ opacity: 0, y: 22 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.12 }}
                  transition={{ duration: 0.5, delay: index * 0.08, ease: [0.22, 1, 0.36, 1] }}
                  className={`p-6 sm:p-7 rounded-xl border shadow-2xs transition-all duration-300 flex flex-col justify-between ${res.cardStyle}`}
                >
                  <div>
                    {/* Header with Icon and Category Tag */}
                    <div className="flex items-center justify-between mb-4">
                      <div className={`w-11 h-11 rounded-xl border flex items-center justify-center shadow-2xs ${res.iconBg}`}>
                        <Icon className="w-5 h-5" />
                      </div>
                      <span className={`text-[11px] font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full border ${res.badgeStyle}`}>
                        {res.category}
                      </span>
                    </div>

                    <h3 className="text-lg font-bold text-slate-950 leading-snug">
                      {res.title}
                    </h3>

                    <p className="mt-2.5 text-sm text-slate-600 leading-relaxed">
                      {res.desc}
                    </p>
                  </div>

                  <div className="mt-5 pt-3 border-t border-slate-100 flex items-center justify-between text-xs font-semibold text-slate-500">
                    <span className="flex items-center gap-1.5 text-slate-700 font-medium">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                      Disponível na plataforma
                    </span>
                    <span className="text-[11px] font-mono text-slate-400">
                      STC Travel
                    </span>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>

        {/* PARTE 3: STATUS DAS SOLICITAÇÕES (ACOMPANHE CADA ETAPA) */}
        <div id="status-solicitacoes" className="pt-8 border-t border-slate-200 scroll-mt-24">
          <div className="max-w-3xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider text-slate-700 bg-white border border-slate-200 shadow-2xs mb-3">
              <span className="w-2 h-2 rounded-full bg-sky-500" />
              <span>Status das Solicitações</span>
            </div>
            
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-slate-950 tracking-tight text-balance">
              Acompanhe cada etapa
            </h2>
            
            <p className="mt-3 text-base text-slate-600 leading-relaxed">
              Visibilidade transparente e atualizações em tempo real do início ao fim de cada viagem corporativa:
            </p>
          </div>

          {/* 5 Status Badges / Cards com cores diferenciadas */}
          <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
            {statusList.map((st, index) => {
              const Icon = st.icon;
              return (
                <motion.div
                  key={st.status}
                  initial={{ opacity: 0, scale: 0.95, y: 18 }}
                  whileInView={{ opacity: 1, scale: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.15 }}
                  transition={{ duration: 0.45, delay: index * 0.08, ease: [0.22, 1, 0.36, 1] }}
                  className={`p-5 rounded-xl border shadow-2xs flex flex-col justify-between transition-all duration-300 hover:shadow-md ${st.cardBg}`}
                >
                  <div>
                    {/* Top Status Icon & Dot */}
                    <div className="flex items-center justify-between mb-3">
                      <div className="w-9 h-9 rounded-lg bg-white/90 border border-black/5 flex items-center justify-center shadow-2xs">
                        <Icon className={`w-5 h-5 ${st.iconColor}`} />
                      </div>
                      <div className="flex items-center gap-1.5">
                        {st.pulse ? (
                          <span className="relative flex h-2.5 w-2.5">
                            <span className={`animate-ping absolute inline-flex h-full w-full rounded-full opacity-75 ${st.dotColor}`} />
                            <span className={`relative inline-flex rounded-full h-2.5 w-2.5 ${st.dotColor}`} />
                          </span>
                        ) : (
                          <span className={`inline-block h-2.5 w-2.5 rounded-full ${st.dotColor}`} />
                        )}
                      </div>
                    </div>

                    <div className="flex items-center gap-2 mb-1">
                      <span className={`text-[11px] font-bold uppercase tracking-wider px-2 py-0.5 rounded ${st.badge}`}>
                        {st.status}
                      </span>
                    </div>

                    <h4 className="text-base font-extrabold text-slate-900 mt-2">
                      {st.status}
                    </h4>

                    <p className="text-xs font-semibold text-slate-700 mt-1 leading-snug">
                      {st.label}
                    </p>
                  </div>

                  <div className="mt-4 pt-2.5 border-t border-black/5 text-[11px] font-mono text-slate-500">
                    Etapa {index + 1}
                  </div>
                </motion.div>
              );
            })}
          </div>

          {/* Banner de Resumo da Gestão STC */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mt-10 p-6 sm:p-7 rounded-xl bg-slate-950 text-white border border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-6 shadow-xl"
          >
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-xl bg-amber-400 text-slate-950 flex items-center justify-center shrink-0 font-bold shadow-lg">
                <Sparkles className="w-6 h-6 text-slate-950" />
              </div>
              <div>
                <h4 className="text-base sm:text-lg font-bold text-white">
                  Controle total das viagens em um só painel
                </h4>
                <p className="text-xs sm:text-sm text-slate-300 mt-0.5">
                  Elimine trocas intermináveis de e-mails e mensagens no WhatsApp. Centralize suas demandas com governança e agilidade.
                </p>
              </div>
            </div>

            <a
              href="#contato"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-amber-400 hover:bg-amber-300 text-slate-950 font-bold text-xs uppercase tracking-wider transition-colors shrink-0 shadow-md cursor-pointer"
            >
              <span>Solicitar Demonstração</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </a>
          </motion.div>
        </div>

      </div>
    </section>
  );
};
