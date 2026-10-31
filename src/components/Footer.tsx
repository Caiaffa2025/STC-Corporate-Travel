import React from 'react';
import { COMPANY_CONFIG, getWhatsAppLink } from '../config/company';
import { MessageSquare, Mail, Phone, Clock, ShieldCheck, Database, Lock } from 'lucide-react';

interface FooterProps {
  onOpenPrivacyModal: () => void;
  onOpenAdmin?: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onOpenPrivacyModal, onOpenAdmin }) => {
  const currentYear = new Date().getFullYear();

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    const target = document.querySelector(href);
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <footer className="bg-slate-900 text-slate-400 text-xs border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14 lg:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10">
          {/* Brand info */}
          <div className="lg:col-span-5 space-y-4">
            <div className="flex items-center gap-2">
              <div className="w-7 h-7 rounded bg-amber-400 flex items-center justify-center text-slate-950 font-black text-[11px] tracking-wider">
                STC
              </div>
              <span className="font-extrabold text-sm tracking-tight text-white uppercase">
                {COMPANY_CONFIG.brandName}
              </span>
            </div>
            
            <p className="text-slate-400 text-xs sm:text-sm leading-relaxed max-w-sm">
              Solução de gestão terceirizada de viagens corporativas. Centralizamos passagens aéreas, reservas hoteleiras, políticas de aprovação e controle financeiro de ponta a ponta para PMEs brasileiras.
            </p>

            <div className="flex items-center gap-2 text-slate-300 text-xs pt-1">
              <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0" />
              <span>Tratamento de dados em total conformidade com a LGPD (Lei nº 13.709/18).</span>
            </div>
          </div>

          {/* Navigation Links */}
          <div className="lg:col-span-3 space-y-3">
            <div className="text-white font-bold uppercase tracking-wider text-xs">
              Navegação
            </div>
            <ul className="space-y-2">
              <li>
                <a
                  href="#inicio"
                  onClick={(e) => handleNavClick(e, '#inicio')}
                  className="hover:text-white transition-colors"
                >
                  Início
                </a>
              </li>
              <li>
                <a
                  href="#diferenciais-stc"
                  onClick={(e) => handleNavClick(e, '#diferenciais-stc')}
                  className="hover:text-white transition-colors text-amber-400 font-medium"
                >
                  Diferenciais STC
                </a>
              </li>
              <li>
                <a
                  href="#solucoes"
                  onClick={(e) => handleNavClick(e, '#solucoes')}
                  className="hover:text-white transition-colors"
                >
                  Soluções Corporativas
                </a>
              </li>
              <li>
                <a
                  href="#como-funciona"
                  onClick={(e) => handleNavClick(e, '#como-funciona')}
                  className="hover:text-white transition-colors"
                >
                  Como Funciona
                </a>
              </li>
              <li>
                <a
                  href="#beneficios"
                  onClick={(e) => handleNavClick(e, '#beneficios')}
                  className="hover:text-white transition-colors"
                >
                  Benefícios para a Empresa
                </a>
              </li>
              <li>
                <a
                  href="#planos"
                  onClick={(e) => handleNavClick(e, '#planos')}
                  className="hover:text-white transition-colors"
                >
                  Modelos de Contratação
                </a>
              </li>
              <li>
                <a
                  href="#contato"
                  onClick={(e) => handleNavClick(e, '#contato')}
                  className="hover:text-white transition-colors"
                >
                  Solicitar Proposta
                </a>
              </li>
              <li>
                <button
                  type="button"
                  onClick={onOpenPrivacyModal}
                  className="hover:text-white transition-colors text-left text-amber-300"
                >
                  Política de Privacidade
                </button>
              </li>
            </ul>
          </div>

          {/* Commercial Contact Information */}
          <div className="lg:col-span-4 space-y-3">
            <div className="text-white font-bold uppercase tracking-wider text-xs">
              Canais Comerciais
            </div>

            <ul className="space-y-2.5">
              <li className="flex items-start gap-2.5">
                <Mail className="w-4 h-4 text-sky-400 shrink-0 mt-0.5" />
                <span>
                  <strong className="text-slate-300 block">E-mail:</strong>
                  <a href={`mailto:${COMPANY_CONFIG.email}`} className="hover:text-white transition-colors">
                    {COMPANY_CONFIG.email}
                  </a>
                </span>
              </li>

              <li className="flex items-start gap-2.5">
                <MessageSquare className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                <span>
                  <strong className="text-slate-300 block">WhatsApp Comercial:</strong>
                  <a
                    href={getWhatsAppLink()}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-white transition-colors text-emerald-400 font-medium"
                  >
                    {COMPANY_CONFIG.whatsappDisplay}
                  </a>
                </span>
              </li>

              <li className="flex items-start gap-2.5">
                <Phone className="w-4 h-4 text-slate-400 shrink-0 mt-0.5" />
                <span>
                  <strong className="text-slate-300 block">Central de Atendimento:</strong>
                  <a href="tel:+5511984937529" className="hover:text-white transition-colors">
                    {COMPANY_CONFIG.phoneDisplay}
                  </a>
                </span>
              </li>

              <li className="flex items-start gap-2.5">
                <Clock className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                <span>
                  <strong className="text-slate-300 block">Horário de Atendimento:</strong>
                  <span>{COMPANY_CONFIG.businessHours}</span>
                </span>
              </li>
            </ul>
          </div>
        </div>

        {/* Legal & Copyright */}
        <div className="mt-12 pt-8 border-t border-slate-800 flex flex-col md:flex-row items-center justify-between gap-4 text-slate-500">
          <p>
            © {currentYear} {COMPANY_CONFIG.brandName}. Todos os direitos reservados.
          </p>
          <div className="flex flex-wrap items-center gap-4 sm:gap-6">
            {onOpenAdmin && (
              <button
                onClick={onOpenAdmin}
                className="hover:text-amber-400 transition-colors flex items-center gap-1.5 text-amber-300 font-semibold cursor-pointer"
                title="Acesso com senha invisível (1966)"
              >
                <Lock className="w-3.5 h-3.5" />
                <span>Painel do Administrador (Área Restrita)</span>
              </button>
            )}
            <button
              onClick={onOpenPrivacyModal}
              className="hover:text-slate-300 transition-colors cursor-pointer"
            >
              Privacidade (LGPD)
            </button>
            <a
              href="#inicio"
              onClick={(e) => handleNavClick(e, '#inicio')}
              className="hover:text-slate-300 transition-colors"
            >
              Voltar ao topo ↑
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};
