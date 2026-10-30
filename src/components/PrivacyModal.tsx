import React, { useEffect } from 'react';
import { X, ShieldCheck } from 'lucide-react';
import { COMPANY_CONFIG } from '../config/company';

interface PrivacyModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const PrivacyModal: React.FC<PrivacyModalProps> = ({ isOpen, onClose }) => {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-xs animate-in fade-in duration-150">
      <div 
        className="bg-white rounded-xl max-w-2xl w-full max-h-[85vh] flex flex-col shadow-2xl border border-slate-200"
        role="dialog"
        aria-modal="true"
        aria-labelledby="privacy-modal-title"
      >
        {/* Modal Header */}
        <div className="p-6 border-b border-slate-200 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-5 h-5 text-sky-800" />
            <h3 id="privacy-modal-title" className="text-lg font-bold text-slate-900">
              Política de Privacidade e Proteção de Dados (LGPD)
            </h3>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-slate-400 hover:text-slate-700 rounded-md hover:bg-slate-100 transition-colors"
            aria-label="Fechar modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 overflow-y-auto space-y-4 text-xs sm:text-sm text-slate-600 leading-relaxed">
          <p>
            Esta Política de Privacidade descreve como a <strong>{COMPANY_CONFIG.brandName}</strong> realiza a coleta, o armazenamento e o tratamento de dados pessoais em conformidade com a <strong>Lei Geral de Proteção de Dados (Lei nº 13.709/2018 - LGPD)</strong>.
          </p>

          <h4 className="font-bold text-slate-900 text-sm pt-2">
            1. Dados Coletados e Finalidade
          </h4>
          <p>
            Coletamos exclusivamente as informações estritamente necessárias para a elaboração de diagnósticos operacionais e apresentação de propostas comerciais de gestão de viagens corporativas:
          </p>
          <ul className="list-disc pl-5 space-y-1">
            <li>Nome completo, cargo e nome da empresa;</li>
            <li>E-mail corporativo e telefone de contato / WhatsApp;</li>
            <li>Cidade, estado e volume estimado de viagens da empresa;</li>
            <li>Necessidades específicas assinaladas pelo solicitante.</li>
          </ul>

          <h4 className="font-bold text-slate-900 text-sm pt-2">
            2. Base Legal para o Tratamento
          </h4>
          <p>
            O tratamento desses dados fundamenta-se nos procedimentos preliminares relacionados a contrato do qual o titular seja parte, a pedido do titular dos dados (Artigo 7º, inciso V da LGPD), bem como no legítimo interesse e consentimento livre e informado fornecido no formulário.
          </p>

          <h4 className="font-bold text-slate-900 text-sm pt-2">
            3. Não Compartilhamento e Sigilo Comercial
          </h4>
          <p>
            A <strong>{COMPANY_CONFIG.brandName}</strong> não vende, aluga ou compartilha os dados de contato com empresas de publicidade terceiras. As informações são utilizadas exclusivamente pela nossa equipe comercial interna para atendimento direto à sua demanda empresarial.
          </p>

          <h4 className="font-bold text-slate-900 text-sm pt-2">
            4. Direitos do Titular (Art. 18 da LGPD)
          </h4>
          <p>
            Você pode, a qualquer momento, solicitar a confirmação da existência de tratamento, o acesso aos seus dados, a correção de dados incompletos ou a eliminação dos seus dados da nossa base de contatos, entrando em contato através do e-mail <strong>{COMPANY_CONFIG.email}</strong>.
          </p>

          <h4 className="font-bold text-slate-900 text-sm pt-2">
            5. Segurança da Informação
          </h4>
          <p>
            Adotamos medidas técnicas e organizacionais adequadas para proteger os dados pessoais contra acessos não autorizados, perdas ou alterações ilícitas.
          </p>
        </div>

        {/* Modal Footer */}
        <div className="p-4 border-t border-slate-200 bg-slate-50 flex justify-end">
          <button
            onClick={onClose}
            className="px-5 py-2.5 text-xs font-semibold uppercase tracking-wider text-white bg-slate-900 hover:bg-slate-800 rounded-md transition-colors"
          >
            Entendido e Fechar
          </button>
        </div>
      </div>
    </div>
  );
};
