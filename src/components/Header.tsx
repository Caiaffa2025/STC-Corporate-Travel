import React, { useState, useEffect } from 'react';
import { COMPANY_CONFIG } from '../config/company';
import { Menu, X, ArrowUpRight, Database } from 'lucide-react';

interface HeaderProps {
  onOpenLeadForm: (planName?: string) => void;
  onOpenAdmin?: () => void;
}

export const Header: React.FC<HeaderProps> = ({ onOpenLeadForm, onOpenAdmin }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { label: 'Início', href: '#inicio' },
    { label: 'Diferenciais', href: '#diferenciais-stc' },
    { label: 'Soluções', href: '#solucoes' },
    { label: 'Como Funciona', href: '#como-funciona' },
    { label: 'Benefícios', href: '#beneficios' },
    { label: 'Planos', href: '#planos' },
    { label: 'Contato', href: '#contato' },
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
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-200 ${
        isScrolled
          ? 'bg-white/95 backdrop-blur-md shadow-xs border-b border-slate-200/80 py-3'
          : 'bg-white border-b border-slate-100 py-4'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between gap-8">
        {/* Zone 1: Brand Wordmark */}
        <a
          href="#inicio"
          onClick={(e) => handleNavClick(e, '#inicio')}
          className="flex items-center gap-2 text-slate-900 group shrink-0"
        >
          <div className="w-8 h-8 rounded bg-slate-900 flex items-center justify-center text-amber-400 font-extrabold text-xs tracking-wider shadow-xs shrink-0">
            STC
          </div>
          <span className="font-extrabold text-xs sm:text-sm md:text-base tracking-tight text-slate-900 group-hover:text-sky-800 transition-colors uppercase truncate max-w-[170px] sm:max-w-none">
            {COMPANY_CONFIG.brandName}
          </span>
        </a>

        {/* Zone 2: Navigation Links (Clean single-line prose, subtle hover) */}
        <nav className="hidden lg:flex items-center gap-6 xl:gap-7 text-sm font-medium text-slate-600">
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

        {/* Zone 3: Primary Action CTA & Database Access */}
        <div className="hidden sm:flex items-center gap-2.5 shrink-0">
          {onOpenAdmin && (
            <button
              onClick={onOpenAdmin}
              title="Gerenciar Banco de Dados e Alterações"
              className="inline-flex items-center gap-1.5 px-3 py-2 text-xs font-semibold text-slate-700 hover:text-slate-950 bg-slate-100 hover:bg-slate-200 border border-slate-200 rounded-md transition-colors whitespace-nowrap shrink-0 cursor-pointer"
            >
              <Database className="w-3.5 h-3.5 text-amber-600" />
              <span className="hidden xl:inline">Banco de Dados</span>
            </button>
          )}

          <button
            onClick={() => onOpenLeadForm()}
            className="inline-flex items-center gap-2 px-4 md:px-5 py-2.5 text-xs font-semibold uppercase tracking-wider text-white bg-slate-900 rounded-md hover:bg-slate-800 transition-colors whitespace-nowrap shrink-0 shadow-xs cursor-pointer"
          >
            <span>Solicitar Proposta</span>
            <ArrowUpRight className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* Mobile menu toggle */}
        <div className="lg:hidden flex items-center gap-1.5 sm:gap-2">
          {onOpenAdmin && (
            <button
              onClick={onOpenAdmin}
              className="p-2 text-slate-700 hover:text-slate-950 rounded-md focus:outline-hidden"
              title="Banco de Dados"
            >
              <Database className="w-5 h-5 text-amber-600" />
            </button>
          )}
          <button
            onClick={() => onOpenLeadForm()}
            className="sm:hidden px-2.5 py-1.5 text-xs font-semibold text-white bg-slate-900 rounded-md whitespace-nowrap cursor-pointer"
          >
            Proposta
          </button>
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="min-w-[44px] min-h-[44px] flex items-center justify-center text-slate-700 hover:text-slate-950 rounded-md focus:outline-hidden cursor-pointer"
            aria-label="Abrir menu de navegação"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-white border-b border-slate-200 px-4 pt-3 pb-6 shadow-xl animate-in fade-in slide-in-from-top-2 duration-150">
          <div className="flex flex-col space-y-1">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={(e) => handleNavClick(e, link.href)}
                className="text-base font-medium text-slate-800 hover:text-slate-950 py-2.5 px-2 rounded hover:bg-slate-50 transition-colors border-b border-slate-100"
              >
                {link.label}
              </a>
            ))}
            <div className="pt-3 space-y-2">
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenLeadForm();
                }}
                className="w-full flex items-center justify-center gap-2 px-5 py-3.5 text-sm font-semibold uppercase tracking-wider text-white bg-slate-900 rounded-md hover:bg-slate-800 cursor-pointer shadow-xs"
              >
                <span>Solicitar Proposta</span>
                <ArrowUpRight className="w-4 h-4" />
              </button>

              {onOpenAdmin && (
                <button
                  onClick={() => {
                    setMobileMenuOpen(false);
                    onOpenAdmin();
                  }}
                  className="w-full flex items-center justify-center gap-2 px-4 py-2.5 text-xs font-semibold uppercase tracking-wider text-slate-800 bg-slate-100 border border-slate-200 rounded-md hover:bg-slate-200 cursor-pointer"
                >
                  <Database className="w-3.5 h-3.5 text-amber-600" />
                  <span>Gerenciar Banco de Dados</span>
                </button>
              )}

              <div className="text-center pt-2">
                <a
                  href={`tel:+5511984937529`}
                  className="text-xs font-medium text-slate-600 hover:text-slate-900"
                >
                  Central de Atendimento: {COMPANY_CONFIG.phoneDisplay}
                </a>
              </div>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};
