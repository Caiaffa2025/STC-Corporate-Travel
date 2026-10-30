import React, { useState } from 'react';
import { ChevronDown } from 'lucide-react';

export const FAQSection: React.FC = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const faqs = [
    {
      question: 'A gestão terceirizada é indicada para pequenas empresas?',
      answer:
        'Sim. O serviço pode ser dimensionado conforme o volume de viagens, a complexidade da operação e as necessidades da empresa.',
    },
    {
      question: 'Vocês trabalham com passagens aéreas e hotéis?',
      answer:
        'O serviço pode incluir cotação e organização de passagens e hospedagens, conforme o escopo contratado e os fornecedores disponíveis.',
    },
    {
      question: 'É possível estabelecer regras de aprovação?',
      answer:
        'Sim. O fluxo pode ser estruturado de acordo com as políticas internas, os limites de orçamento e os responsáveis definidos pela empresa.',
    },
    {
      question: 'Vocês cuidam de alterações e cancelamentos?',
      answer:
        'O acompanhamento pode ser incluído no contrato, respeitando as regras das tarifas e dos fornecedores.',
    },
    {
      question: 'Como é calculado o preço do serviço?',
      answer:
        'A proposta considera o volume de solicitações, a complexidade operacional, o nível de atendimento e os serviços contratados.',
    },
    {
      question: 'É possível personalizar os relatórios?',
      answer:
        'Os relatórios podem ser adaptados aos dados disponíveis e às necessidades de gestão definidas no projeto.',
    },
  ];

  const toggle = (idx: number) => {
    setOpenIndex(openIndex === idx ? null : idx);
  };

  return (
    <section className="py-16 md:py-24 bg-slate-100/60 border-y border-slate-200">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <div className="text-xs uppercase tracking-widest text-slate-500 font-semibold mb-3">
            Tire suas Dúvidas
          </div>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-slate-950 tracking-tight text-balance">
            Perguntas Frequentes
          </h2>
          <p className="mt-3 text-base text-slate-600">
            Respostas claras sobre como funciona o modelo de gestão terceirizada de viagens.
          </p>
        </div>

        {/* Accordion */}
        <div className="space-y-3">
          {faqs.map((faq, idx) => {
            const isOpen = openIndex === idx;
            return (
              <div
                key={idx}
                className="bg-white rounded-lg border border-slate-200 overflow-hidden transition-colors"
              >
                <button
                  type="button"
                  onClick={() => toggle(idx)}
                  className="w-full py-4 px-5 text-left flex items-center justify-between gap-4 font-semibold text-slate-900 hover:text-slate-950 focus:outline-hidden"
                  aria-expanded={isOpen}
                >
                  <span className="text-sm sm:text-base">{faq.question}</span>
                  <ChevronDown
                    className={`w-5 h-5 text-slate-400 shrink-0 transition-transform duration-200 ${
                      isOpen ? 'rotate-180 text-slate-800' : ''
                    }`}
                  />
                </button>
                {isOpen && (
                  <div className="px-5 pb-5 text-sm text-slate-600 leading-relaxed border-t border-slate-100 pt-3 animate-in fade-in duration-150">
                    {faq.answer}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
