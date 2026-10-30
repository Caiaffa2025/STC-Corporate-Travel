import React, { useState } from 'react';
import { 
  Search, 
  MessageSquareOff, 
  SlidersHorizontal, 
  RotateCcw, 
  Receipt, 
  PieChart, 
  Clock, 
  AlertCircle 
} from 'lucide-react';

export const ProblemSection: React.FC = () => {
  const [estimatedTrips, setEstimatedTrips] = useState<number>(10);

  // Conservative benchmark: unmanaged trips take ~3.5 hours of internal operational time
  // (searching multiple sites, back-and-forth approval emails, resolving changes, manual expense reconciliation)
  const hoursPerTrip = 3.5;
  const totalMonthlyHours = Math.round(estimatedTrips * hoursPerTrip);

  const challenges = [
    {
      icon: Search,
      title: 'Pesquisar passagens e hotéis em diferentes plataformas',
      desc: 'Tempo gasto navegando em sites concorrentes, comparando regras de bagagem, horários e tarifas sem uma ferramenta unificada.',
    },
    {
      icon: MessageSquareOff,
      title: 'Administrar solicitações de viagem por e-mail e WhatsApp',
      desc: 'Demandas dispersas em conversas informais, sem histórico organizado, gerando ruídos e perda de prazos tarifários.',
    },
    {
      icon: SlidersHorizontal,
      title: 'Controlar aprovações e limites de orçamento',
      desc: 'Falta de fluxo formal de validação: compras sem consentimento prévio da liderança ou fora dos tetos de gastos previstos.',
    },
    {
      icon: RotateCcw,
      title: 'Resolver alterações, cancelamentos e imprevistos',
      desc: 'Colaboradores ou secretárias passando horas ao telefone com companhias aéreas e hotéis para remarcar ou solicitar no-show.',
    },
    {
      icon: Receipt,
      title: 'Organizar comprovantes, pagamentos e prestação de contas',
      desc: 'Notas fiscais perdidas, faturas de cartão corporativo desordenadas e demora para fechar o reembolso dos viajantes.',
    },
    {
      icon: PieChart,
      title: 'Consolidar informações para entender os gastos da empresa',
      desc: 'Planilhas manuais e dificuldade de saber com precisão quanto cada centro de custo ou projeto gastou com deslocamentos.',
    },
  ];

  return (
    <section className="py-16 md:py-24 bg-slate-100/60 border-y border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="max-w-3xl mx-auto text-center">
          <div className="text-xs uppercase tracking-widest text-slate-500 font-semibold mb-3">
            O Cenário Atual das Empresas
          </div>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-slate-950 tracking-tight text-balance">
            Quanto tempo sua equipe perde organizando viagens corporativas?
          </h2>
          <p className="mt-4 text-base text-slate-600 leading-relaxed">
            Em pequenas e médias empresas, a gestão de viagens frequentemente sobrecarrega secretárias, analistas financeiros ou o próprio viajante com tarefas operacionais repetitivas.
          </p>
        </div>

        {/* 6 Problem Cards */}
        <div className="mt-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {challenges.map((item, index) => {
            const Icon = item.icon;
            return (
              <div
                key={index}
                className="bg-white p-6 rounded-lg border border-slate-200/90 hover:border-slate-300 transition-colors shadow-2xs flex flex-col justify-between"
              >
                <div>
                  <div className="w-10 h-10 rounded bg-slate-50 border border-slate-200 flex items-center justify-center text-slate-800 mb-4">
                    <Icon className="w-5 h-5 text-sky-800" />
                  </div>
                  <h3 className="text-base font-bold text-slate-900 leading-snug">
                    {item.title}
                  </h3>
                  <p className="mt-2 text-sm text-slate-600 leading-relaxed">
                    {item.desc}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

        {/* Interactive Time-Lost Estimator Widget */}
        <div className="mt-12 bg-white rounded-xl border border-slate-200 p-6 md:p-8 shadow-xs">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-7">
              <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-amber-700">
                <Clock className="w-4 h-4 text-amber-600" />
                <span>Simulador de Sobrecarga Operacional</span>
              </div>
              <h3 className="text-xl font-bold text-slate-900 mt-2">
                Veja o impacto operacional das viagens na sua equipe
              </h3>
              <p className="text-sm text-slate-600 mt-2 leading-relaxed">
                Ajuste a quantidade aproximada de viagens que sua empresa realiza ao mês e veja a estimativa de horas administrativas envolvidas em cotações, aprovações, notas e imprevistos.
              </p>

              <div className="mt-6">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm font-semibold text-slate-800">
                    Viagens corporativas por mês:
                  </span>
                  <span className="text-base font-extrabold text-slate-950 px-3 py-1 bg-slate-100 rounded">
                    {estimatedTrips} viagens
                  </span>
                </div>
                <input
                  type="range"
                  min="2"
                  max="50"
                  step="1"
                  value={estimatedTrips}
                  onChange={(e) => setEstimatedTrips(Number(e.target.value))}
                  className="w-full h-3 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-slate-900 touch-pan-x my-2"
                />
                <div className="flex justify-between text-xs text-slate-500 mt-1">
                  <span>2 viagens/mês</span>
                  <span>25 viagens/mês</span>
                  <span>50+ viagens/mês</span>
                </div>
              </div>
            </div>

            <div className="lg:col-span-5 bg-slate-50 border border-slate-200/90 rounded-lg p-5 flex flex-col justify-center">
              <div className="text-xs uppercase tracking-wider text-slate-500 font-semibold">
                Estimativa de tempo interno dedicado
              </div>
              <div className="mt-2 flex items-baseline gap-2">
                <span className="text-4xl font-extrabold text-slate-950 font-mono tabular-nums">
                  ~{totalMonthlyHours}h
                </span>
                <span className="text-sm font-medium text-slate-600">por mês da equipe</span>
              </div>
              <p className="text-xs text-slate-500 mt-3 border-t border-slate-200 pt-3 leading-relaxed">
                São horas que assistentes, secretárias e gestores poderiam direcionar para atividades estratégicas, suporte aos clientes ou faturamento da empresa.
              </p>
            </div>
          </div>
        </div>

        {/* Section Closing Quote (exact requirement) */}
        <div className="mt-10 max-w-4xl mx-auto p-5 rounded-lg bg-amber-50/80 border border-amber-200/80 flex items-start gap-3.5">
          <AlertCircle className="w-5 h-5 text-amber-700 shrink-0 mt-0.5" />
          <p className="text-sm md:text-base text-amber-950 leading-relaxed font-medium">
            &ldquo;Quando cada viagem é tratada de maneira isolada, a operação pode ficar fragmentada, consumir horas de trabalho e dificultar o controle financeiro.&rdquo;
          </p>
        </div>
      </div>
    </section>
  );
};
