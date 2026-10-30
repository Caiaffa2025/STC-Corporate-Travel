import React from 'react';
import { 
  Zap, 
  Wallet, 
  GitCommit, 
  PhoneCall, 
  LineChart, 
  Users2, 
  Info 
} from 'lucide-react';

export const BenefitsSection: React.FC = () => {
  const benefits = [
    {
      icon: Zap,
      title: 'Mais produtividade',
      desc: 'Menos trabalho operacional para a equipe interna, permitindo foco nas atividades-fim do negócio.',
    },
    {
      icon: Wallet,
      title: 'Maior controle financeiro',
      desc: 'Melhor visibilidade das despesas, dos orçamentos por centro de custo e conciliação de faturas.',
    },
    {
      icon: GitCommit,
      title: 'Processos padronizados',
      desc: 'Solicitações e aprovações organizadas, com histórico formal de cada viagem autorizada.',
    },
    {
      icon: PhoneCall,
      title: 'Mais praticidade',
      desc: 'Um ponto de contato para as demandas contratadas, sem múltiplos fornecedores desordenados.',
    },
    {
      icon: LineChart,
      title: 'Melhor planejamento',
      desc: 'Informações organizadas e relatórios periódicos para apoiar decisões futuras da diretoria.',
    },
    {
      icon: Users2,
      title: 'Atendimento personalizado',
      desc: 'Serviço adaptado à rotina, às preferências e às necessidades da empresa e dos viajantes.',
    },
  ];

  return (
    <section id="beneficios" className="py-16 md:py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl">
          <div className="text-xs uppercase tracking-widest text-slate-500 font-semibold mb-3">
            Ganhos para a Empresa
          </div>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-slate-950 tracking-tight text-balance">
            Sua empresa ganha controle, organização e tempo.
          </h2>
          <p className="mt-4 text-base sm:text-lg text-slate-600 leading-relaxed font-normal">
            Resultados práticos na rotina dos seus colaboradores e na previsibilidade das suas contas empresariais.
          </p>
        </div>

        {/* 6 Benefit Cards */}
        <div className="mt-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {benefits.map((item, index) => {
            const Icon = item.icon;
            return (
              <div
                key={index}
                className="p-6 rounded-xl border border-slate-200/90 bg-slate-50/50 hover:bg-white hover:border-slate-300 hover:shadow-xs transition-all flex flex-col"
              >
                <div className="w-10 h-10 rounded-md bg-white border border-slate-200 flex items-center justify-center text-slate-900 mb-4 shadow-2xs">
                  <Icon className="w-5 h-5 text-sky-800" />
                </div>
                <h3 className="text-base font-bold text-slate-900">
                  {item.title}
                </h3>
                <p className="mt-2 text-sm text-slate-600 leading-relaxed">
                  {item.desc}
                </p>
              </div>
            );
          })}
        </div>

        {/* Transparency note as strictly instructed in prompt */}
        <div className="mt-12 p-5 rounded-lg bg-slate-50 border border-slate-200 flex items-start gap-3">
          <Info className="w-5 h-5 text-slate-600 shrink-0 mt-0.5" />
          <div className="text-xs sm:text-sm text-slate-600 leading-relaxed">
            <strong className="text-slate-900 font-semibold block mb-0.5">
              Compromisso com a Transparência:
            </strong>
            A identificação de oportunidades de economia depende diretamente do perfil das viagens, da antecedência das solicitações, das políticas internas adotadas e das condições tarifárias disponíveis no mercado aéreo e hoteleiro.
          </div>
        </div>
      </div>
    </section>
  );
};
