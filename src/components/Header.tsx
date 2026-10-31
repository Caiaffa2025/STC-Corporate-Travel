import React, { useState, useEffect } from 'react';
import { COMPANY_CONFIG, getWhatsAppLink } from '../config/company';
import {
  Menu,
  X,
  ArrowUpRight,
  Lock,
  Phone,
  MessageSquare,
  ChevronRight,
  Home,
  Sparkles,
  Briefcase,
  Workflow,
  ShieldCheck,
  Layers,
  Mail,
  Plane,
} from 'lucide-react';

interface HeaderProps {
  onOpenLeadForm: (planName?: string) => void;
  onOpenAdmin?: () => void;
  onOpenEmployeePortal?: () => void;
}

export const Header: React.FC<HeaderProps> = ({ 
  onOpenLeadForm, 
  onOpenAdmin,
  onOpenEmployeePortal 
}) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Scroll detection to adjust header elevation
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Lock body scroll when mobile menu is open, and handle ESC key
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden';
      const handleKeyDown = (e: KeyboardEvent) => {
        if (e.key === 'Escape') {
          setMobileMenuOpen(false);
        }
      };
      window.addEventListener('keydown', handleKeyDown);
      return () => {
        document.body.style.overflow = '';
        window.removeEventListener('keydown', handleKeyDown);
      };
    } else {
      document.body.style.overflow = '';
    }
  }, [mobileMenuOpen]);

  const navLinks = [
    { label: 'Início', href: '#inicio', icon: Home },
    { label: 'Diferenciais', href: '#diferenciais-stc', icon: Sparkles },
    { label: 'Soluções', href: '#solucoes', icon: Briefcase },
    { label: 'Como Funciona', href: '#como-funciona', icon: Workflow },
    { label: 'Benefícios', href: '#beneficios', icon: ShieldCheck },
    { label: 'Planos', href: '#planos', icon: Layers },
    { label: 'Contato', href: '#contato', icon: Mail },
  ];

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    setMobileMenuOpen(false);
    const target = document.querySelector(href);
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-200 ${
          isScrolled
            ? 'bg-white/95 backdrop-blur-md shadow-xs border-b border-slate-200/80 py-2.5 sm:py-3'
            : 'bg-white border-b border-slate-100 py-3 sm:py-4'
        }`}
      >
        <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 flex items-center justify-between gap-2 sm:gap-4 lg:gap-8">
          {/* Zone 1: Brand Wordmark */}
          <a
            href="#inicio"
            onClick={(e) => handleNavClick(e, '#inicio')}
            className="flex items-center gap-2 text-slate-900 group shrink-0 select-none"
            aria-label="STC Corporate Travel - Ir para o início"
          >
            <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-md bg-slate-900 flex items-center justify-center text-amber-400 font-black text-xs sm:text-sm tracking-wider shadow-xs shrink-0 group-hover:scale-105 transition-transform">
              STC
            </div>
            <div className="flex flex-col">
              <span className="font-extrabold text-xs sm:text-sm md:text-base tracking-tight text-slate-900 group-hover:text-sky-800 transition-colors uppercase whitespace-nowrap">
                {COMPANY_CONFIG.brandName}
              </span>
              <span className="hidden sm:block text-[10px] text-slate-500 font-medium -mt-0.5 leading-tight">
                Gestão Terceirizada de Viagens
              </span>
            </div>
          </a>

          {/* Zone 2: Desktop Navigation Links (Responsive spacing for laptop and large screens) */}
          <nav className="hidden lg:flex items-center lg:gap-3 xl:gap-6 2xl:gap-7 text-xs xl:text-sm font-semibold text-slate-600">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={(e) => handleNavClick(e, link.href)}
                className="hover:text-slate-950 transition-colors whitespace-nowrap shrink-0 py-1 border-b-2 border-transparent hover:border-slate-900"
              >
                {link.label}
              </a>
            ))}
          </nav>

          {/* Zone 3: Desktop Action Buttons (2 Botões de Acesso: Solicitar Minha Viagem & Administrador) */}
          <div className="hidden lg:flex items-center gap-2 xl:gap-3 shrink-0">
            {onOpenEmployeePortal && (
              <button
                onClick={onOpenEmployeePortal}
                title="Portal do Colaborador (Acesse com Nome e Senha para solicitar sua viagem)"
                className="inline-flex items-center gap-1.5 px-3.5 xl:px-4 py-2 xl:py-2.5 text-xs font-bold uppercase tracking-wider text-slate-950 bg-amber-400 hover:bg-amber-300 rounded-md transition-all shadow-xs cursor-pointer active:scale-98"
              >
                <Plane className="w-3.5 h-3.5 text-slate-950 shrink-0" />
                <span>Solicitar Minha Viagem</span>
              </button>
            )}

            {onOpenAdmin && (
              <button
                onClick={onOpenAdmin}
                title="Painel do Administrador (Senha: 1966)"
                className="inline-flex items-center gap-1.5 px-3 py-2 xl:py-2.5 text-xs font-semibold text-slate-700 hover:text-slate-950 bg-slate-100 hover:bg-slate-200 border border-slate-200/80 rounded-md transition-colors whitespace-nowrap shrink-0 cursor-pointer"
              >
                <Lock className="w-3.5 h-3.5 text-amber-600 shrink-0" />
                <span>Administrador</span>
              </button>
            )}

            <button
              onClick={() => onOpenLeadForm()}
              className="inline-flex items-center gap-1 px-3 py-2 text-xs font-semibold text-slate-600 hover:text-slate-900 border border-slate-200/70 hover:border-slate-300 rounded-md transition-colors whitespace-nowrap shrink-0 cursor-pointer"
            >
              <span>Orçamento PME</span>
              <ArrowUpRight className="w-3 h-3 text-slate-500" />
            </button>
          </div>

          {/* Zone 4: Mobile & Tablet Actions & Toggle (< 1024px) */}
          <div className="flex lg:hidden items-center gap-1.5 sm:gap-2">
            {/* Quick Solicitar Minha Viagem Button on Tablet & Mobile */}
            {onOpenEmployeePortal && (
              <button
                onClick={onOpenEmployeePortal}
                className="inline-flex items-center gap-1 px-2.5 sm:px-3 py-1.5 sm:py-2 text-[11px] sm:text-xs font-bold uppercase tracking-wider text-slate-950 bg-amber-400 hover:bg-amber-300 rounded-md transition-colors cursor-pointer shadow-2xs whitespace-nowrap"
              >
                <Plane className="w-3.5 h-3.5 shrink-0" />
                <span>Solicitar Viagem</span>
              </button>
            )}

            {/* Admin Quick Icon */}
            {onOpenAdmin && (
              <button
                onClick={onOpenAdmin}
                className="p-1.5 sm:p-2 text-slate-700 hover:text-slate-950 hover:bg-slate-100 rounded-md transition-colors cursor-pointer"
                title="Área do Administrador (Senha: 1966)"
                aria-label="Administrador"
              >
                <Lock className="w-4 h-4 text-amber-600" />
              </button>
            )}

            {/* Hamburger Toggle Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="min-w-[42px] min-h-[42px] flex items-center justify-center text-slate-800 hover:text-slate-950 hover:bg-slate-100 rounded-md transition-colors cursor-pointer focus:outline-hidden focus:ring-2 focus:ring-slate-900"
              aria-label={mobileMenuOpen ? 'Fechar menu de navegação' : 'Abrir menu de navegação'}
              aria-expanded={mobileMenuOpen}
            >
              {mobileMenuOpen ? (
                <X className="w-6 h-6 text-slate-900" />
              ) : (
                <Menu className="w-6 h-6 text-slate-900" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile / Tablet Dropdown Drawer with Full Responsive UI */}
        {mobileMenuOpen && (
          <div className="lg:hidden">
            {/* Backdrop Overlay */}
            <div
              className="fixed inset-0 top-[57px] sm:top-[65px] bg-slate-950/60 backdrop-blur-xs z-40 transition-opacity"
              onClick={() => setMobileMenuOpen(false)}
              aria-hidden="true"
            />

            {/* Drawer Panel */}
            <div className="relative z-50 bg-white border-b border-slate-200 shadow-2xl max-h-[calc(100vh-65px)] overflow-y-auto">
              <div className="max-w-7xl mx-auto px-4 sm:px-6 py-4 space-y-4">
                {/* Navigation Links with icons and clean touch areas */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-1 pb-3 border-b border-slate-100">
                  {navLinks.map((link) => {
                    const IconComponent = link.icon;
                    return (
                      <a
                        key={link.href}
                        href={link.href}
                        onClick={(e) => handleNavClick(e, link.href)}
                        className="flex items-center justify-between px-3.5 py-3 rounded-lg text-slate-800 hover:text-slate-950 hover:bg-slate-50 active:bg-slate-100 font-medium text-sm sm:text-base transition-colors group"
                      >
                        <div className="flex items-center gap-3">
                          <IconComponent className="w-4 h-4 text-slate-500 group-hover:text-slate-900 transition-colors" />
                          <span>{link.label}</span>
                        </div>
                        <ChevronRight className="w-4 h-4 text-slate-400 group-hover:text-slate-900 transition-colors" />
                      </a>
                    );
                  })}
                </div>

                {/* Mobile Call-To-Action Actions */}
                <div className="space-y-2.5 pt-1">
                  {/* Primary CTA */}
                  {/* 2 Botões de Acesso no Menu Mobile */}
                  {onOpenEmployeePortal && (
                    <button
                      onClick={() => {
                        setMobileMenuOpen(false);
                        onOpenEmployeePortal();
                      }}
                      className="w-full flex items-center justify-center gap-2 px-4 py-3.5 text-sm font-bold uppercase tracking-wider text-slate-950 bg-amber-400 hover:bg-amber-300 rounded-xl shadow-md transition-all cursor-pointer"
                    >
                      <Plane className="w-4 h-4 text-slate-950" />
                      <span>Solicitar Minha Viagem (Portal)</span>
                    </button>
                  )}

                  <button
                    onClick={() => {
                      setMobileMenuOpen(false);
                      onOpenLeadForm();
                    }}
                    className="w-full flex items-center justify-center gap-2 px-4 py-3 text-sm font-bold uppercase tracking-wider text-white bg-slate-900 hover:bg-slate-800 rounded-xl shadow-sm active:scale-99 transition-all cursor-pointer"
                  >
                    <span>Solicitar Proposta Gratuita</span>
                    <ArrowUpRight className="w-4 h-4" />
                  </button>

                  {/* Direct WhatsApp Action */}
                  <a
                    href={getWhatsAppLink()}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={() => setMobileMenuOpen(false)}
                    className="w-full flex items-center justify-center gap-2 px-4 py-3 text-sm font-bold text-emerald-800 bg-emerald-50 hover:bg-emerald-100 border border-emerald-200 rounded-lg transition-colors"
                  >
                    <MessageSquare className="w-4 h-4 text-emerald-700" />
                    <span>WhatsApp: {COMPANY_CONFIG.whatsappDisplay}</span>
                  </a>

                  {/* Central de Atendimento & Admin */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-1">
                    <a
                      href={`tel:+5511984937529`}
                      className="flex items-center justify-center gap-2 px-3 py-2.5 text-xs font-semibold text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-lg transition-colors"
                    >
                      <Phone className="w-3.5 h-3.5 text-slate-600" />
                      <span>Ligar: {COMPANY_CONFIG.phoneDisplay}</span>
                    </a>

                    {onOpenAdmin && (
                      <button
                        onClick={() => {
                          setMobileMenuOpen(false);
                          onOpenAdmin();
                        }}
                        className="flex items-center justify-center gap-2 px-3 py-2.5 text-xs font-semibold text-slate-800 bg-slate-100 hover:bg-slate-200 border border-slate-200 rounded-lg transition-colors cursor-pointer"
                      >
                        <Lock className="w-3.5 h-3.5 text-amber-600" />
                        <span>Área Admin (Senha 1966)</span>
                      </button>
                    )}
                  </div>

                  {/* Business Hours Info */}
                  <div className="text-center pt-2 pb-1 text-[11px] text-slate-500">
                    <p>{COMPANY_CONFIG.businessHours}</p>
                    <p className="font-medium text-slate-600">{COMPANY_CONFIG.email}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </header>
    </>
  );
};

