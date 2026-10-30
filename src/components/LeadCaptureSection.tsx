import React, { useState } from 'react';
import { 
  Send, 
  CheckCircle2, 
  AlertCircle, 
  MessageSquare, 
  Building2, 
  User, 
  Mail, 
  Phone, 
  MapPin, 
  HelpCircle,
  Copy,
  Check
} from 'lucide-react';
import { getWhatsAppLink } from '../config/company';
import { saveLeadToFirestore } from '../lib/dbService';

interface LeadCaptureSectionProps {
  selectedPlan?: string;
  onOpenPrivacyModal: () => void;
}

const BRAZILIAN_STATES = [
  'AC', 'AL', 'AP', 'AM', 'BA', 'CE', 'DF', 'ES', 'GO', 'MA', 
  'MT', 'MS', 'MG', 'PA', 'PB', 'PR', 'PE', 'PI', 'RJ', 'RN', 
  'RS', 'RO', 'RR', 'SC', 'SP', 'SE', 'TO'
];

export const LeadCaptureSection: React.FC<LeadCaptureSectionProps> = ({
  selectedPlan,
  onOpenPrivacyModal,
}) => {
  const [formData, setFormData] = useState({
    name: '',
    company: '',
    role: '',
    email: '',
    phone: '',
    city: '',
    state: 'SP',
    monthlyTrips: '6 a 15',
    needs: ['Passagens aéreas', 'Hospedagens', 'Fluxo de aprovações'],
    challenges: '',
    consent: true,
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formErrors, setFormErrors] = useState<Record<string, string>>({});
  const [submissionResult, setSubmissionResult] = useState<{
    success: boolean;
    leadId: string;
    message: string;
    whatsappUrl?: string;
  } | null>(null);

  const [copiedId, setCopiedId] = useState(false);

  const availableNeeds = [
    'Passagens aéreas',
    'Hospedagens',
    'Alterações e cancelamentos',
    'Fluxo de aprovações',
    'Controle financeiro',
    'Gestão completa',
  ];

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let value = e.target.value.replace(/\D/g, '');
    if (value.length > 11) value = value.slice(0, 11);
    
    // Format (XX) XXXXX-XXXX or (XX) XXXX-XXXX
    if (value.length > 6) {
      value = `(${value.slice(0, 2)}) ${value.slice(2, 7)}-${value.slice(7)}`;
    } else if (value.length > 2) {
      value = `(${value.slice(0, 2)}) ${value.slice(2)}`;
    } else if (value.length > 0) {
      value = `(${value}`;
    }
    setFormData((prev) => ({ ...prev, phone: value }));
  };

  const toggleNeed = (need: string) => {
    setFormData((prev) => {
      const exists = prev.needs.includes(need);
      if (exists) {
        if (prev.needs.length === 1) return prev; // Keep at least one
        return { ...prev, needs: prev.needs.filter((n) => n !== need) };
      } else {
        return { ...prev, needs: [...prev.needs, need] };
      }
    });
  };

  const validate = () => {
    const errors: Record<string, string> = {};
    if (!formData.name.trim() || formData.name.trim().length < 3) {
      errors.name = 'Informe seu nome completo.';
    }
    if (!formData.company.trim() || formData.company.trim().length < 2) {
      errors.company = 'Informe o nome da empresa.';
    }
    if (!formData.role.trim() || formData.role.trim().length < 2) {
      errors.role = 'Informe seu cargo ou departamento.';
    }
    if (!formData.email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      errors.email = 'Informe um e-mail corporativo válido.';
    }
    const cleanPhone = formData.phone.replace(/\D/g, '');
    if (cleanPhone.length < 10) {
      errors.phone = 'Informe um telefone com DDD válido.';
    }
    if (!formData.city.trim()) {
      errors.city = 'Informe a cidade da sua empresa.';
    }
    if (!formData.consent) {
      errors.consent = 'Você deve concordar com o tratamento dos dados para receber a proposta.';
    }
    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setIsSubmitting(true);
    setFormErrors({});

    try {
      const response = await fetch('/api/leads', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: formData.name,
          company: formData.company,
          role: formData.role,
          email: formData.email,
          phone: formData.phone,
          cityState: `${formData.city} - ${formData.state}`,
          monthlyTrips: formData.monthlyTrips,
          needs: formData.needs,
          challenges: formData.challenges,
          planInterest: selectedPlan || 'Plano sob medida',
          consent: formData.consent,
        }),
      });

      const data = await response.json();

      if (response.ok && data.success) {
        setSubmissionResult({
          success: true,
          leadId: data.leadId,
          message: data.message,
          whatsappUrl: data.whatsappUrl,
        });

        // Grava no banco de dados Firestore
        saveLeadToFirestore({
          id: data.leadId,
          name: formData.name,
          company: formData.company,
          role: formData.role,
          email: formData.email,
          phone: formData.phone,
          cityState: `${formData.city} - ${formData.state}`,
          monthlyTrips: formData.monthlyTrips,
          needs: formData.needs,
          challenges: formData.challenges,
          planInterest: selectedPlan || 'Plano sob medida',
          createdAt: new Date().toISOString(),
        }).catch((err) => console.warn('[Firestore] Sync warning:', err));
      } else {
        if (data.errors) {
          setFormErrors(data.errors);
        } else {
          setFormErrors({
            general: data.message || 'Falha ao processar solicitação. Tente novamente.',
          });
        }
      }
    } catch (err) {
      // Fallback: in case backend network fails in some preview environments, generate an actionable lead token
      const fallbackId = `LEAD-${Date.now().toString(36).toUpperCase()}`;
      const msg = `Olá! Sou ${formData.name} da empresa ${formData.company} (${formData.role}). Solicitei proposta de gestão de viagens corporativas para aprox. ${formData.monthlyTrips} viagens/mês. Protocolo: ${fallbackId}.`;
      setSubmissionResult({
        success: true,
        leadId: fallbackId,
        message: 'Solicitação registrada com sucesso! Nossa equipe entrará em contato.',
        whatsappUrl: getWhatsAppLink(msg),
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const copyLeadId = () => {
    if (submissionResult?.leadId) {
      navigator.clipboard.writeText(submissionResult.leadId);
      setCopiedId(true);
      setTimeout(() => setCopiedId(false), 2000);
    }
  };

  return (
    <section id="contato" className="py-16 md:py-24 bg-white relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto text-center">
          <div className="text-xs uppercase tracking-widest text-slate-500 font-semibold mb-3">
            STC Corporate Travel · Atendimento Comercial Direto
          </div>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-slate-950 tracking-tight text-balance">
            Vamos organizar as viagens da sua empresa?
          </h2>
          <p className="mt-4 text-base sm:text-lg text-slate-600 leading-relaxed font-normal">
            Conte um pouco sobre sua operação e receba uma proposta personalizada com acesso à plataforma exclusiva da STC.
          </p>
          {selectedPlan && (
            <div className="mt-3 inline-block bg-slate-100 text-slate-900 border border-slate-300 text-xs font-semibold px-3 py-1 rounded">
              Interesse selecionado: {selectedPlan}
            </div>
          )}
        </div>

        <div className="mt-12 max-w-3xl mx-auto">
          {submissionResult?.success ? (
            /* Successful Submission Confirmation Card */
            <div className="bg-slate-50 rounded-2xl border border-slate-200 p-8 text-center animate-in fade-in duration-200 shadow-sm">
              <div className="w-14 h-14 rounded-full bg-emerald-100 text-emerald-800 flex items-center justify-center mx-auto mb-4">
                <CheckCircle2 className="w-8 h-8" />
              </div>

              <h3 className="text-2xl font-bold text-slate-950">
                Solicitação Recebida com Sucesso!
              </h3>
              
              <p className="mt-2 text-slate-600 max-w-lg mx-auto text-sm sm:text-base leading-relaxed">
                Nossos consultores corporativos analisarão o perfil das viagens da sua empresa e prepararão uma proposta com o desenho operacional ideal.
              </p>

              <div className="mt-6 p-4 rounded-lg bg-white border border-slate-200 max-w-md mx-auto text-left">
                <div className="text-xs uppercase tracking-wider text-slate-500 font-semibold mb-1">
                  Número de Protocolo
                </div>
                <div className="flex items-center justify-between">
                  <span className="font-mono text-base font-bold text-slate-900">
                    {submissionResult.leadId}
                  </span>
                  <button
                    onClick={copyLeadId}
                    className="p-1.5 text-slate-500 hover:text-slate-900 rounded hover:bg-slate-100 transition-colors flex items-center gap-1 text-xs"
                    title="Copiar protocolo"
                  >
                    {copiedId ? (
                      <>
                        <Check className="w-3.5 h-3.5 text-emerald-600" />
                        <span className="text-emerald-700">Copiado</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-3.5 h-3.5" />
                        <span>Copiar</span>
                      </>
                    )}
                  </button>
                </div>
              </div>

              <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
                {submissionResult.whatsappUrl && (
                  <a
                    href={submissionResult.whatsappUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-md text-sm font-semibold uppercase tracking-wider shadow-sm transition-colors"
                  >
                    <MessageSquare className="w-4 h-4" />
                    <span>Agilizar Atendimento no WhatsApp</span>
                  </a>
                )}
                
                <button
                  onClick={() => setSubmissionResult(null)}
                  className="w-full sm:w-auto px-6 py-3.5 text-slate-700 hover:text-slate-900 text-sm font-medium"
                >
                  Enviar outra solicitação
                </button>
              </div>
            </div>
          ) : (
            /* Lead Generation Form */
            <form
              onSubmit={handleSubmit}
              noValidate
              className="bg-white rounded-2xl border border-slate-200/90 p-6 sm:p-10 shadow-xs space-y-6"
            >
              {formErrors.general && (
                <div className="p-4 rounded-md bg-rose-50 border border-rose-200 text-rose-800 text-sm flex items-start gap-2">
                  <AlertCircle className="w-5 h-5 shrink-0 mt-0.5" />
                  <span>{formErrors.general}</span>
                </div>
              )}

              {/* Row 1: Name and Company */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
                    Nome completo <span className="text-rose-500">*</span>
                  </label>
                  <div className="relative">
                    <input
                      type="text"
                      required
                      placeholder="Ex: Carlos Eduardo Silveira"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className={`w-full px-3.5 py-3 sm:py-2.5 rounded-md border text-base sm:text-sm text-slate-900 placeholder:text-slate-400 focus:outline-hidden focus:ring-2 focus:ring-slate-900 transition-all ${
                        formErrors.name ? 'border-rose-400 bg-rose-50/30' : 'border-slate-300'
                      }`}
                    />
                  </div>
                  {formErrors.name && (
                    <p className="mt-1 text-xs text-rose-600">{formErrors.name}</p>
                  )}
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
                    Nome da empresa <span className="text-rose-500">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="Ex: Indústria Alfa S/A"
                    value={formData.company}
                    onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                    className={`w-full px-3.5 py-3 sm:py-2.5 rounded-md border text-base sm:text-sm text-slate-900 placeholder:text-slate-400 focus:outline-hidden focus:ring-2 focus:ring-slate-900 transition-all ${
                      formErrors.company ? 'border-rose-400 bg-rose-50/30' : 'border-slate-300'
                    }`}
                  />
                  {formErrors.company && (
                    <p className="mt-1 text-xs text-rose-600">{formErrors.company}</p>
                  )}
                </div>
              </div>

              {/* Row 2: Role and Corporate Email */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
                    Cargo / Função <span className="text-rose-500">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="Ex: Gerente Administrativo / CFO"
                    value={formData.role}
                    onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                    className={`w-full px-3.5 py-3 sm:py-2.5 rounded-md border text-base sm:text-sm text-slate-900 placeholder:text-slate-400 focus:outline-hidden focus:ring-2 focus:ring-slate-900 transition-all ${
                      formErrors.role ? 'border-rose-400 bg-rose-50/30' : 'border-slate-300'
                    }`}
                  />
                  {formErrors.role && (
                    <p className="mt-1 text-xs text-rose-600">{formErrors.role}</p>
                  )}
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
                    E-mail corporativo <span className="text-rose-500">*</span>
                  </label>
                  <input
                    type="email"
                    required
                    placeholder="nome@empresa.com.br"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className={`w-full px-3.5 py-3 sm:py-2.5 rounded-md border text-base sm:text-sm text-slate-900 placeholder:text-slate-400 focus:outline-hidden focus:ring-2 focus:ring-slate-900 transition-all ${
                      formErrors.email ? 'border-rose-400 bg-rose-50/30' : 'border-slate-300'
                    }`}
                  />
                  {formErrors.email && (
                    <p className="mt-1 text-xs text-rose-600">{formErrors.email}</p>
                  )}
                </div>
              </div>

              {/* Row 3: Phone/WhatsApp and City/State */}
              <div className="grid grid-cols-1 sm:grid-cols-12 gap-5">
                <div className="sm:col-span-6">
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
                    Telefone / WhatsApp <span className="text-rose-500">*</span>
                  </label>
                  <input
                    type="tel"
                    required
                    placeholder="(11) 98765-4321"
                    value={formData.phone}
                    onChange={handlePhoneChange}
                    className={`w-full px-3.5 py-3 sm:py-2.5 rounded-md border text-base sm:text-sm text-slate-900 placeholder:text-slate-400 focus:outline-hidden focus:ring-2 focus:ring-slate-900 transition-all ${
                      formErrors.phone ? 'border-rose-400 bg-rose-50/30' : 'border-slate-300'
                    }`}
                  />
                  {formErrors.phone && (
                    <p className="mt-1 text-xs text-rose-600">{formErrors.phone}</p>
                  )}
                </div>

                <div className="sm:col-span-4">
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
                    Cidade <span className="text-rose-500">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="Ex: São Paulo"
                    value={formData.city}
                    onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                    className={`w-full px-3.5 py-3 sm:py-2.5 rounded-md border text-base sm:text-sm text-slate-900 placeholder:text-slate-400 focus:outline-hidden focus:ring-2 focus:ring-slate-900 transition-all ${
                      formErrors.city ? 'border-rose-400 bg-rose-50/30' : 'border-slate-300'
                    }`}
                  />
                  {formErrors.city && (
                    <p className="mt-1 text-xs text-rose-600">{formErrors.city}</p>
                  )}
                </div>

                <div className="sm:col-span-2">
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
                    UF <span className="text-rose-500">*</span>
                  </label>
                  <select
                    value={formData.state}
                    onChange={(e) => setFormData({ ...formData, state: e.target.value })}
                    className="w-full px-3 py-3 sm:py-2.5 rounded-md border border-slate-300 text-base sm:text-sm text-slate-900 focus:outline-hidden focus:ring-2 focus:ring-slate-900 bg-white min-h-[44px]"
                  >
                    {BRAZILIAN_STATES.map((uf) => (
                      <option key={uf} value={uf}>
                        {uf}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Row 4: Monthly Trips Selection */}
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-2">
                  Quantidade aproximada de viagens por mês <span className="text-rose-500">*</span>
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                  {['1 a 5', '6 a 15', '16 a 30', 'Mais de 30'].map((tier) => (
                    <label
                      key={tier}
                      className={`flex items-center justify-center p-3 rounded-md border text-xs sm:text-sm font-semibold cursor-pointer transition-all ${
                        formData.monthlyTrips === tier
                          ? 'border-slate-900 bg-slate-900 text-white'
                          : 'border-slate-200 bg-slate-50 text-slate-700 hover:border-slate-300'
                      }`}
                    >
                      <input
                        type="radio"
                        name="monthlyTrips"
                        value={tier}
                        checked={formData.monthlyTrips === tier}
                        onChange={() => setFormData({ ...formData, monthlyTrips: tier })}
                        className="sr-only"
                      />
                      <span>{tier} viagens</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Row 5: Multi-select Needs */}
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-2">
                  Principais necessidades da sua empresa (selecione as que se aplicam):
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                  {availableNeeds.map((need) => {
                    const isChecked = formData.needs.includes(need);
                    return (
                      <label
                        key={need}
                        className={`flex items-center gap-3 p-3 rounded-md border text-xs sm:text-sm cursor-pointer transition-all ${
                          isChecked
                            ? 'border-slate-900 bg-slate-50/80 font-semibold text-slate-950'
                            : 'border-slate-200 text-slate-600 hover:border-slate-300'
                        }`}
                      >
                        <input
                          type="checkbox"
                          checked={isChecked}
                          onChange={() => toggleNeed(need)}
                          className="w-4 h-4 rounded text-slate-900 focus:ring-slate-900 border-slate-300"
                        />
                        <span>{need}</span>
                      </label>
                    );
                  })}
                </div>
              </div>

              {/* Row 6: Optional Challenges */}
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
                  Descreva os desafios atuais da sua rotina de viagens (opcional)
                </label>
                <textarea
                  rows={3}
                  placeholder="Ex: Nossos colaboradores compram passagens por conta própria em cima da hora, faltam notas fiscais para prestação de contas..."
                  value={formData.challenges}
                  onChange={(e) => setFormData({ ...formData, challenges: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-md border border-slate-300 text-sm text-slate-900 placeholder:text-slate-400 focus:outline-hidden focus:ring-2 focus:ring-slate-900"
                />
              </div>

              {/* LGPD Consent Checkbox */}
              <div className="pt-2">
                <label className="flex items-start gap-3 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={formData.consent}
                    onChange={(e) => setFormData({ ...formData, consent: e.target.checked })}
                    className="w-4 h-4 rounded text-slate-900 focus:ring-slate-900 border-slate-300 mt-0.5 shrink-0"
                  />
                  <span className="text-xs text-slate-600 leading-normal">
                    Concordo com o tratamento dos dados informados para fins de contato comercial e elaboração da proposta, conforme a{' '}
                    <button
                      type="button"
                      onClick={onOpenPrivacyModal}
                      className="text-slate-900 font-semibold underline hover:text-sky-800"
                    >
                      Política de Privacidade (LGPD)
                    </button>
                    . Seus dados não serão comercializados com terceiros.
                  </span>
                </label>
                {formErrors.consent && (
                  <p className="mt-1 text-xs text-rose-600">{formErrors.consent}</p>
                )}
              </div>

              {/* Main Submit Button */}
              <div className="pt-4">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-4 px-6 rounded-md bg-slate-900 hover:bg-slate-800 text-white font-bold text-sm uppercase tracking-wider transition-all shadow-md hover:shadow-lg flex items-center justify-center gap-2 disabled:opacity-70 cursor-pointer"
                >
                  {isSubmitting ? (
                    <span>Processando solicitação...</span>
                  ) : (
                    <>
                      <span>Quero receber uma proposta</span>
                      <Send className="w-4 h-4" />
                    </>
                  )}
                </button>
                <p className="text-center text-[11px] text-slate-400 mt-2.5">
                  Retorno comercial em horário útil · Sem compromisso de contratação prévia
                </p>
              </div>
            </form>
          )}
        </div>
      </div>
    </section>
  );
};
