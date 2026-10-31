import React from 'react';
import { DEFAULT_IMAGES } from '../assets/images';

interface AircraftBackgroundWatermarkProps {
  aircraftImageUrl?: string;
  intensity?: 'ultra-light' | 'light' | 'medium';
}

/**
 * Componente que renderiza uma aeronave corporativa em cor bem clarinha (marca d'água)
 * no fundo da landing page para destacar a identidade visual de aviação e viagens executivas,
 * mantendo a legibilidade de todos os textos e botões 100% impecável.
 */
export const AircraftBackgroundWatermark: React.FC<AircraftBackgroundWatermarkProps> = ({
  aircraftImageUrl = DEFAULT_IMAGES.jetAircraft,
  intensity = 'light',
}) => {
  // Ajuste de opacidade conforme intensidade
  const opacityConfig = {
    'ultra-light': {
      vector: 'opacity-[0.035]',
      photo: 'opacity-[0.03]',
      trails: 'opacity-[0.025]',
    },
    'light': {
      vector: 'opacity-[0.055]',
      photo: 'opacity-[0.045]',
      trails: 'opacity-[0.04]',
    },
    'medium': {
      vector: 'opacity-[0.08]',
      photo: 'opacity-[0.065]',
      trails: 'opacity-[0.06]',
    },
  }[intensity];

  return (
    <div
      className="fixed inset-0 pointer-events-none select-none z-0 overflow-hidden"
      aria-hidden="true"
    >
      {/* 1. AERONAVE REAL EM MARCA D'ÁGUA SUAVE (FOTO REAL BLENDADA NO TOPO/HERO) */}
      <div
        className={`absolute -top-12 right-0 w-[550px] sm:w-[750px] md:w-[950px] lg:w-[1150px] h-[500px] sm:h-[650px] md:h-[800px] ${opacityConfig.photo} transition-opacity duration-300`}
        style={{
          backgroundImage: `url(${aircraftImageUrl})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          filter: 'grayscale(100%) contrast(120%) brightness(110%)',
          maskImage: 'radial-gradient(ellipse 70% 60% at 75% 25%, black 20%, rgba(0,0,0,0.5) 50%, transparent 85%)',
          WebkitMaskImage: 'radial-gradient(ellipse 70% 60% at 75% 25%, black 20%, rgba(0,0,0,0.5) 50%, transparent 85%)',
        }}
      />

      {/* 2. SILHUETA VETORIAL PREMIUM DE UMA AERONAVE EXECUTIVA EM ÂNGULO DE DECOLAGEM */}
      <div className={`absolute top-20 sm:top-28 -right-10 sm:right-6 lg:right-20 w-[340px] sm:w-[500px] lg:w-[700px] h-auto text-sky-950 ${opacityConfig.vector} transition-opacity duration-300`}>
        <svg
          viewBox="0 0 1000 650"
          fill="currentColor"
          xmlns="http://www.w3.org/2000/svg"
          className="w-full h-auto drop-shadow-xs transform -rotate-6"
        >
          {/* Fuselagem Aerodinâmica de Jato Corporativo */}
          <path d="M150 360 C 250 330, 420 280, 680 230 C 780 210, 880 180, 940 160 C 970 150, 990 148, 995 152 C 998 155, 992 165, 960 185 C 890 230, 770 290, 650 340 C 490 405, 300 450, 180 440 C 140 435, 120 410, 130 385 Z" />
          
          {/* Asa Principal Direita com Winglet (Winglet aerodinâmico vertical) */}
          <path d="M500 270 L 320 60 C 315 50, 325 45, 335 48 L 410 80 L 590 250 Z" />
          <path d="M320 60 L 330 20 C 332 15, 340 16, 342 22 L 348 55 Z" />

          {/* Asa Principal Esquerda (Perspectiva inferior) */}
          <path d="M550 340 L 480 610 C 475 625, 460 625, 452 615 L 420 560 L 460 370 Z" />
          <path d="M480 610 L 490 645 C 492 650, 485 652, 480 647 L 465 620 Z" />

          {/* Estabilizador Horizontal (Empenagem de Cauda T-Tail Executiva) */}
          <path d="M170 360 L 70 290 C 60 282, 68 275, 78 278 L 190 315 Z" />
          <path d="M180 395 L 90 450 C 80 456, 75 448, 82 440 L 165 390 Z" />

          {/* Estabilizador Vertical (Leme de Cauda) */}
          <path d="M190 350 L 95 160 C 90 150, 102 145, 112 150 L 225 310 Z" />

          {/* Turbina a Jato Turbofan Esquerda */}
          <path d="M470 380 C 470 365, 520 355, 560 365 C 575 370, 575 385, 560 395 C 520 405, 470 395, 470 380 Z" />
          
          {/* Janelas da Cabine de Comando (Cockpit) */}
          <path d="M920 165 C 935 160, 950 157, 960 160 C 955 165, 940 170, 925 172 Z" fill="white" fillOpacity="0.4" />
        </svg>
      </div>

      {/* 3. LINHAS DE ROTA DE VOO SUAVES & PONTOS DE NAVEGAÇÃO (TRAIL) */}
      <svg
        className={`absolute inset-0 w-full h-full ${opacityConfig.trails} transition-opacity duration-300`}
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <linearGradient id="flightPathGrad" x1="0%" y1="100%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#0f172a" stopOpacity="0.2" />
            <stop offset="60%" stopColor="#0284c7" stopOpacity="0.8" />
            <stop offset="100%" stopColor="#38bdf8" stopOpacity="0.1" />
          </linearGradient>
        </defs>

        {/* Arco de Trajetória da Aeronave principal */}
        <path
          d="M -100 800 C 300 700, 600 450, 1050 180"
          fill="none"
          stroke="url(#flightPathGrad)"
          strokeWidth="1.5"
          strokeDasharray="6 8"
        />

        {/* Segundo Arco de Conexão Global Suave cruzando a tela */}
        <path
          d="M 50 250 C 400 350, 800 650, 1400 850"
          fill="none"
          stroke="#0f172a"
          strokeWidth="1"
          strokeDasharray="4 12"
        />

        {/* Pontos de Waypoint / Conexões Aéreas sutis */}
        <circle cx="320" cy="530" r="3" fill="#0284c7" opacity="0.6" />
        <circle cx="680" cy="380" r="3.5" fill="#0284c7" opacity="0.6" />
        <circle cx="890" cy="270" r="2.5" fill="#0284c7" opacity="0.4" />
      </svg>

      {/* 4. SEGUNDA AERONAVE SUBTIL NA PARTE INFERIOR (CRUZEIRO EM ALTA ALTITUDE) */}
      <div className={`hidden md:block absolute bottom-36 left-8 lg:left-24 w-[280px] lg:w-[380px] h-auto text-slate-800 ${opacityConfig.vector} transition-opacity duration-300`}>
        <svg
          viewBox="0 0 800 450"
          fill="currentColor"
          xmlns="http://www.w3.org/2000/svg"
          className="w-full h-auto transform rotate-12 opacity-80"
        >
          {/* Silhueta minimalista de avião comercial em rota */}
          <path d="M 100 240 C 200 220, 360 190, 560 160 C 650 145, 720 135, 750 130 C 760 128, 765 133, 755 140 C 700 170, 590 215, 480 250 C 350 290, 200 310, 120 300 C 95 295, 85 270, 100 240 Z" />
          <path d="M 400 200 L 260 70 C 255 65, 265 60, 275 62 L 340 85 L 480 180 Z" />
          <path d="M 440 250 L 390 410 C 385 418, 375 418, 370 412 L 350 375 L 380 265 Z" />
          <path d="M 130 250 L 60 200 C 52 195, 58 190, 65 192 L 150 220 Z" />
        </svg>
      </div>
    </div>
  );
};
