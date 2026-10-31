import React from 'react';
import { Plane, Building, Coffee, ArrowRight, ShieldCheck } from 'lucide-react';
import { DEFAULT_IMAGES } from '../assets/images';

interface CorporateTravelGallerySectionProps {
  onOpenLeadForm: () => void;
  aircraftImage?: string;
  hotelSuiteImage?: string;
  vipLoungeImage?: string;
}

export const CorporateTravelGallerySection: React.FC<CorporateTravelGallerySectionProps> = ({
  onOpenLeadForm,
  aircraftImage = DEFAULT_IMAGES.jetAircraft,
  hotelSuiteImage = DEFAULT_IMAGES.hotelSuite,
  vipLoungeImage = DEFAULT_IMAGES.vipLounge,
}) => {
  const galleries = [
    {
      title: 'Logística Aérea & Frotas Comerciais',
      subtitle: 'Passagens & Voos Estratégicos',
      description:
        'Cotações ágeis em todas as companhias aéreas com opções de horários inteligentes, bagagem inclusa e gestão ativa de bilhetes e conexões.',
      image: aircraftImage || DEFAULT_IMAGES.jetAircraft,
      fallback: '/images/jet-aircraft.jpg',
      alt: 'Aeronave corporativa executiva moderna em pátio de aeroporto sob o pôr do sol',
      badge: 'Aviação Comercial & Executiva',
      icon: Plane,
    },
    {
      title: 'Hospedagem Corporativa de Alto Padrão',
      subtitle: 'Hotéis e Suítes de Negócios',
      description:
        'Seleção de hotéis corporativos próximos aos seus compromissos, com mesa de trabalho, Wi-Fi de alta velocidade e faturamento direto com a empresa.',
      image: hotelSuiteImage || DEFAULT_IMAGES.hotelSuite,
      fallback: '/images/hotel-suite.jpg',
      alt: 'Suíte executiva contemporânea em hotel 5 estrelas com vista panorâmica para a cidade e mesa de trabalho',
      badge: 'Rede Hoteleira Homologada',
      icon: Building,
    },
    {
      title: 'Experiência em Aeroportos & Salas VIP',
      subtitle: 'Tranquilidade e Produtividade',
      description:
        'Ambiente adequado para o colaborador trabalhar ou descansar durante conexões, garantindo pontualidade e bem-estar nas viagens.',
      image: vipLoungeImage || DEFAULT_IMAGES.vipLounge,
      fallback: '/images/vip-lounge.jpg',
      alt: 'Sala VIP executiva moderna em aeroporto internacional com vista ampla para pista e aeronaves',
      badge: 'Conforto em Trânsito',
      icon: Coffee,
    },
  ];

  return (
    <section className="py-16 md:py-24 bg-white border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl">
          <div className="text-xs uppercase tracking-widest text-slate-500 font-bold mb-3 flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-sky-800" />
            <span>Padrão de Atendimento STC Corporate Travel</span>
          </div>

          <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-slate-950 tracking-tight text-balance">
            Da decolagem ao check-in: imagens reais da experiência da sua equipe.
          </h2>

          <p className="mt-4 text-base sm:text-lg text-slate-600 leading-relaxed font-normal">
            Aeronaves, hotéis convenientes e suporte ágil em aeroportos para que seus executivos e colaboradores viajem com total tranquilidade e foco nos negócios.
          </p>
        </div>

        {/* 3 Real Travel Visual Cards */}
        <div className="mt-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {galleries.map((item, index) => {
            const Icon = item.icon;
            return (
              <div
                key={index}
                className="group rounded-xl overflow-hidden border border-slate-200 bg-white hover:border-slate-300 hover:shadow-lg transition-all flex flex-col justify-between"
              >
                <div>
                  {/* Real Image with fallback and smooth aspect ratio */}
                  <div className="relative h-60 sm:h-64 overflow-hidden bg-slate-900">
                    <img
                      src={item.image}
                      alt={item.alt}
                      className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
                      referrerPolicy="no-referrer"
                      loading="lazy"
                      onError={(e) => {
                        (e.currentTarget as HTMLImageElement).src = item.fallback;
                      }}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent pointer-events-none" />
                    
                    <div className="absolute top-3 left-3 bg-slate-950/85 backdrop-blur-md text-amber-300 text-[11px] font-bold uppercase tracking-wider px-2.5 py-1 rounded border border-white/10 flex items-center gap-1.5">
                      <Icon className="w-3.5 h-3.5 text-amber-300" />
                      <span>{item.badge}</span>
                    </div>

                    <div className="absolute bottom-3 left-3 right-3 text-white">
                      <div className="text-xs font-semibold text-slate-300 uppercase tracking-wider">
                        {item.subtitle}
                      </div>
                      <div className="text-sm sm:text-base font-bold text-white">
                        {item.title}
                      </div>
                    </div>
                  </div>

                  {/* Body description */}
                  <div className="p-5 sm:p-6">
                    <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                      {item.description}
                    </p>
                  </div>
                </div>

                <div className="px-5 pb-5 sm:px-6 sm:pb-6 pt-0">
                  <button
                    onClick={onOpenLeadForm}
                    className="w-full py-2.5 px-3 rounded-md bg-slate-50 hover:bg-slate-100 text-slate-900 text-xs font-bold uppercase tracking-wider border border-slate-200 flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
                  >
                    <span>Cotar com a STC</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
