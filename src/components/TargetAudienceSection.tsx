import React from 'react';
import { 
  Building2, 
  Briefcase, 
  Factory, 
  Wrench, 
  FileCheck2, 
  MapPin, 
  Check 
} from 'lucide-react';

export const TargetAudienceSection: React.FC = () => {
  const audiences = [
    {
      icon: Building2,
      title: 'Pequenas e médias empresas',
      desc: 'Que não têm um departamento exclusivo de viagens ou mobilidade corporativa e precisam profissionalizar a rotina.',
    },
    {
      icon: Briefcase,
      title: 'Equipes comerciais externas',
      desc: 'Vendedores, executivos de contas e diretores que visitam clientes, participam de feiras e fecham negócios em todo o Brasil.',
    },
    {
      icon: Factory,
      title: 'Indústrias e empresas de equipamentos',
      desc: 'Operações que demandam envio ágil de equipes para fábricas parceiras, instalações fabris e fornecedores.',
    },
    {
      icon: Wrench,
      title: 'Técnicos em atendimento de campo',
      desc: 'Profissionais de manutenção, suporte e implantação que viajam sob demanda com prazos curtos e rotas flexíveis.',
    },
    {
      icon: FileCheck2,
      title: 'Consultorias e prestadores de serviços',
      desc: 'Escritórios de auditoria, engenharia, TI e gestão que alocam especialistas em projetos presenciais nos clientes.',
    },
    {
      icon: MapPin,
      title: 'Recepção de parceiros e colaboradores',
      desc: 'Empresas que recebem clientes estratégicos, investidores ou membros de filiais vindos de outras capitais.',
    },
  ];

  return (
    <section className="py-16 md:py-24 bg-slate-100/60 border-y border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl">
          <div className="text-xs uppercase tracking-widest text-slate-500 font-semibold mb-3">
            Público-Alvo
          </div>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-slate-950 tracking-tight text-balance">
            Ideal para empresas que precisam viajar sem complicar a operação.
          </h2>
          <p className="mt-4 text-base sm:text-lg text-slate-600 leading-relaxed font-normal">
            Se sua empresa realiza viagens com frequência e precisa organizar melhor as solicitações, reservas, alterações e despesas, a gestão terceirizada pode ser uma alternativa para sua operação.
          </p>
        </div>

        {/* 6 Target Audiences Grid */}
        <div className="mt-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {audiences.map((item, index) => {
            const Icon = item.icon;
            return (
              <div
                key={index}
                className="bg-white p-6 rounded-xl border border-slate-200 hover:border-slate-300 transition-colors shadow-2xs flex flex-col justify-between"
              >
                <div>
                  <div className="w-10 h-10 rounded-lg bg-slate-50 border border-slate-200 flex items-center justify-center text-slate-800 mb-4">
                    <Icon className="w-5 h-5 text-sky-800" />
                  </div>
                  <h3 className="text-base font-bold text-slate-900">
                    {item.title}
                  </h3>
                  <p className="mt-2 text-sm text-slate-600 leading-relaxed">
                    {item.desc}
                  </p>
                </div>
                <div className="mt-4 pt-3 border-t border-slate-100 flex items-center gap-1.5 text-xs text-emerald-700 font-medium">
                  <Check className="w-3.5 h-3.5" />
                  <span>Fluxo sob medida</span>
                </div>
              </div>
            );
          })}
        </div>

        {/* Visual card banner with hospitality traveler */}
        <div className="mt-12 rounded-xl overflow-hidden border border-slate-200 bg-white shadow-xs">
          <div className="grid grid-cols-1 lg:grid-cols-12 items-center">
            <div className="lg:col-span-5 h-64 sm:h-80 lg:h-96 relative">
              <img
                src="/src/assets/images/hotel_business_traveler_1793393037477.jpg"
                alt="Executiva em hotel corporativo com mala e suporte ágil"
                className="w-full h-full object-cover object-center"
                referrerPolicy="no-referrer"
                loading="lazy"
              />
            </div>
            <div className="lg:col-span-7 p-6 sm:p-8 lg:p-10">
              <span className="text-xs uppercase tracking-widest text-slate-500 font-semibold">
                Rotina Corporativa Sem Sobrecarga
              </span>
              <h3 className="text-xl sm:text-2xl font-bold text-slate-950 mt-2">
                O viajante descansa e foca no compromisso. A empresa tem controle financeiro total.
              </h3>
              <p className="text-sm text-slate-600 mt-3 leading-relaxed">
                Cada reserva é confirmada respeitando as políticas da empresa, com comprovantes enviados para o departamento financeiro e vouchers acessíveis no celular do colaborador.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
