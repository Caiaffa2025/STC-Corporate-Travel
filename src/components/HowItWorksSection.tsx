import React from 'react';
import { FileText, GitFork, Luggage, TrendingUp } from 'lucide-react';

export const HowItWorksSection: React.FC = () => {
  const steps = [
    {
      step: 'Etapa 1',
      title: 'Entendemos sua operação',
      desc: 'Conhecemos a frequência das viagens, as necessidades dos colaboradores, as regras internas e o orçamento disponível.',
      icon: FileText,
      detail: 'Mapeamento do perfil dos viajantes, destinos habituais e preferências corporativas.',
    },
    {
      step: 'Etapa 2',
      title: 'Estruturamos o processo',
      desc: 'Definimos o fluxo de solicitações, as aprovações, os responsáveis e a forma de acompanhamento.',
      icon: GitFork,
      detail: 'Criação do canal ágil de pedidos e das alçadas de autorização pré-determinadas.',
    },
    {
      step: 'Etapa 3',
      title: 'Organizamos as viagens',
      desc: 'Apoiamos as cotações, reservas e alterações de acordo com os serviços contratados e as autorizações da empresa.',
      icon: Luggage,
      detail: 'Cotação comparativa, emissão ágil e envio de vouchers diretamente aos viajantes.',
    },
    {
      step: 'Etapa 4',
      title: 'Acompanhamos os resultados',
      desc: 'Organizamos as informações e apresentamos relatórios para facilitar o controle operacional e financeiro.',
      icon: TrendingUp,
      detail: 'Fechamento de faturas, conciliação e dados consolidados para a sua diretoria.',
    },
  ];

  return (
    <section id="como-funciona" className="py-16 md:py-24 bg-slate-100/60 border-y border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto text-center">
          <div className="text-xs uppercase tracking-widest text-slate-500 font-semibold mb-3">
            Passo a Passo Transparente
          </div>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-slate-950 tracking-tight text-balance">
            Simples para sua equipe. Organizado para sua empresa.
          </h2>
          <p className="mt-4 text-base text-slate-600 leading-relaxed">
            Implementação rápida e sem burocracia. Estruturamos uma rotina sob medida para o tamanho da sua demanda.
          </p>
        </div>

        {/* 4 Progressive Steps Grid */}
        <div className="mt-14 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 relative">
          {steps.map((item, index) => {
            const Icon = item.icon;
            return (
              <div
                key={index}
                className="bg-white rounded-xl p-6 border border-slate-200 shadow-2xs relative flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-xs font-bold uppercase tracking-wider text-amber-700 bg-amber-50 px-2.5 py-1 rounded border border-amber-200/60">
                      {item.step}
                    </span>
                    <div className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center text-slate-700">
                      <Icon className="w-4 h-4 text-sky-800" />
                    </div>
                  </div>

                  <h3 className="text-base font-bold text-slate-900 mt-2">
                    {item.title}
                  </h3>

                  <p className="mt-3 text-sm text-slate-600 leading-relaxed">
                    {item.desc}
                  </p>
                </div>

                <div className="mt-5 pt-3 border-t border-slate-100">
                  <p className="text-xs text-slate-500 leading-normal">
                    {item.detail}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
