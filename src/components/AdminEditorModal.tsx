import React, { useState, useEffect } from 'react';
import { 
  X, 
  Database, 
  Save, 
  History, 
  Users, 
  CheckCircle2, 
  AlertCircle, 
  RefreshCw, 
  MessageSquare,
  Sparkles,
  ExternalLink
} from 'lucide-react';
import { 
  LandingPageData, 
  PageChangeRecord, 
  StoredLead, 
  getLandingConfig, 
  saveLandingConfig, 
  getChangesHistory, 
  getAllLeadsFromFirestore 
} from '../lib/dbService';

interface AdminEditorModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfigSaved: (updatedConfig: LandingPageData) => void;
}

export const AdminEditorModal: React.FC<AdminEditorModalProps> = ({
  isOpen,
  onClose,
  onConfigSaved,
}) => {
  const [activeTab, setActiveTab] = useState<'content' | 'history' | 'leads'>('content');
  const [formData, setFormData] = useState<LandingPageData | null>(null);
  const [historyRecords, setHistoryRecords] = useState<PageChangeRecord[]>([]);
  const [leadsList, setLeadsList] = useState<StoredLead[]>([]);
  
  const [isLoading, setIsLoading] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [saveSuccessMessage, setSaveSuccessMessage] = useState<string | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  useEffect(() => {
    if (isOpen) {
      loadData();
    }
  }, [isOpen]);

  const loadData = async () => {
    setIsLoading(true);
    setErrorMessage(null);
    try {
      const config = await getLandingConfig();
      setFormData(config);

      const history = await getChangesHistory();
      setHistoryRecords(history);

      const leads = await getAllLeadsFromFirestore();
      setLeadsList(leads);
    } catch (err) {
      setErrorMessage('Erro ao carregar dados do Firestore.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData) return;

    setIsSaving(true);
    setSaveSuccessMessage(null);
    setErrorMessage(null);

    try {
      const result = await saveLandingConfig(formData, 'Alterações salvas via Painel de Gestão da Landing Page');
      setSaveSuccessMessage(`Alterações salvas no banco de dados Firestore com sucesso! (Protocolo: ${result.changeId})`);
      onConfigSaved(formData);

      // Refresh history
      const history = await getChangesHistory();
      setHistoryRecords(history);
      
      setTimeout(() => setSaveSuccessMessage(null), 5000);
    } catch (err) {
      setErrorMessage('Falha ao salvar no banco de dados Firestore. Verifique sua conexão.');
    } finally {
      setIsSaving(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-950/80 backdrop-blur-xs animate-in fade-in duration-150">
      <div 
        className="bg-white rounded-2xl max-w-4xl w-full max-h-[90vh] flex flex-col shadow-2xl border border-slate-200 overflow-hidden"
        role="dialog"
        aria-modal="true"
      >
        {/* Header */}
        <div className="p-5 sm:p-6 bg-slate-900 text-white border-b border-slate-800 flex items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-amber-400 text-slate-950 flex items-center justify-center font-bold">
              <Database className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-base sm:text-lg font-bold text-white">
                  Banco de Dados & Gestão da Landing Page
                </h3>
                <span className="text-[10px] font-mono uppercase tracking-wider bg-emerald-950 text-emerald-400 px-2 py-0.5 rounded border border-emerald-800">
                  Firestore Conectado
                </span>
              </div>
              <p className="text-xs text-slate-400 mt-0.5">
                Todas as alterações de textos, telefones e conteúdos são salvas no banco gratuito na nuvem
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800 transition-colors"
            aria-label="Fechar painel"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Navigation Tabs */}
        <div className="flex items-center gap-2 px-6 pt-4 border-b border-slate-200 bg-slate-50 overflow-x-auto">
          <button
            onClick={() => setActiveTab('content')}
            className={`pb-3 px-3 text-xs sm:text-sm font-semibold border-b-2 whitespace-nowrap transition-colors flex items-center gap-1.5 ${
              activeTab === 'content'
                ? 'border-slate-900 text-slate-950'
                : 'border-transparent text-slate-500 hover:text-slate-900'
            }`}
          >
            <Save className="w-4 h-4" />
            <span>Editar Conteúdos & Contatos</span>
          </button>

          <button
            onClick={() => setActiveTab('history')}
            className={`pb-3 px-3 text-xs sm:text-sm font-semibold border-b-2 whitespace-nowrap transition-colors flex items-center gap-1.5 ${
              activeTab === 'history'
                ? 'border-slate-900 text-slate-950'
                : 'border-transparent text-slate-500 hover:text-slate-900'
            }`}
          >
            <History className="w-4 h-4" />
            <span>Histórico de Alterações ({historyRecords.length})</span>
          </button>

          <button
            onClick={() => setActiveTab('leads')}
            className={`pb-3 px-3 text-xs sm:text-sm font-semibold border-b-2 whitespace-nowrap transition-colors flex items-center gap-1.5 ${
              activeTab === 'leads'
                ? 'border-slate-900 text-slate-950'
                : 'border-transparent text-slate-500 hover:text-slate-900'
            }`}
          >
            <Users className="w-4 h-4" />
            <span>Leads Recebidos no Banco ({leadsList.length})</span>
          </button>
        </div>

        {/* Body Content */}
        <div className="p-6 overflow-y-auto flex-grow space-y-6">
          {saveSuccessMessage && (
            <div className="p-4 rounded-lg bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs sm:text-sm flex items-start gap-2.5">
              <CheckCircle2 className="w-5 h-5 shrink-0 text-emerald-600 mt-0.5" />
              <span>{saveSuccessMessage}</span>
            </div>
          )}

          {errorMessage && (
            <div className="p-4 rounded-lg bg-rose-50 border border-rose-200 text-rose-800 text-xs sm:text-sm flex items-start gap-2.5">
              <AlertCircle className="w-5 h-5 shrink-0 text-rose-600 mt-0.5" />
              <span>{errorMessage}</span>
            </div>
          )}

          {isLoading ? (
            <div className="py-12 text-center text-slate-500 flex flex-col items-center justify-center gap-2">
              <RefreshCw className="w-6 h-6 animate-spin text-slate-400" />
              <span className="text-xs">Conectando ao banco de dados Firestore...</span>
            </div>
          ) : activeTab === 'content' && formData ? (
            <form onSubmit={handleSave} className="space-y-5">
              <div className="bg-amber-50/70 border border-amber-200/70 p-3.5 rounded-lg text-xs text-amber-950 flex items-start gap-2">
                <Sparkles className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
                <span>
                  Edite qualquer texto ou telefone abaixo e clique em <strong>Salvar no Banco de Dados</strong>. A landing page será atualizada imediatamente e os dados ficarão gravados na nuvem.
                </span>
              </div>

              {/* Contatos */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1">
                    WhatsApp Comercial (com DDD)
                  </label>
                  <input
                    type="text"
                    value={formData.whatsappDisplay}
                    onChange={(e) => {
                      const display = e.target.value;
                      const raw = '55' + display.replace(/\D/g, '');
                      setFormData({ ...formData, whatsappDisplay: display, whatsappNumber: raw });
                    }}
                    className="w-full px-3 py-2 rounded-md border border-slate-300 text-sm text-slate-900 focus:ring-2 focus:ring-slate-900"
                  />
                  <span className="text-[11px] text-slate-500">Número limpo para API: {formData.whatsappNumber}</span>
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1">
                    E-mail Comercial
                  </label>
                  <input
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full px-3 py-2 rounded-md border border-slate-300 text-sm text-slate-900 focus:ring-2 focus:ring-slate-900"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1">
                    Central de Atendimento (Telefone)
                  </label>
                  <input
                    type="text"
                    value={formData.phoneDisplay}
                    onChange={(e) => setFormData({ ...formData, phoneDisplay: e.target.value })}
                    className="w-full px-3 py-2 rounded-md border border-slate-300 text-sm text-slate-900 focus:ring-2 focus:ring-slate-900"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1">
                    Nome da Empresa
                  </label>
                  <input
                    type="text"
                    value={formData.brandName}
                    onChange={(e) => setFormData({ ...formData, brandName: e.target.value })}
                    className="w-full px-3 py-2 rounded-md border border-slate-300 text-sm text-slate-900 focus:ring-2 focus:ring-slate-900"
                  />
                </div>
              </div>

              {/* Textos Principais */}
              <div className="space-y-4 pt-2 border-t border-slate-200">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1">
                    Título Principal do Hero
                  </label>
                  <input
                    type="text"
                    value={formData.heroHeadline}
                    onChange={(e) => setFormData({ ...formData, heroHeadline: e.target.value })}
                    className="w-full px-3 py-2 rounded-md border border-slate-300 text-sm text-slate-900 focus:ring-2 focus:ring-slate-900 font-semibold"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1">
                    Subtítulo com Ênfase
                  </label>
                  <input
                    type="text"
                    value={formData.heroSubtitle}
                    onChange={(e) => setFormData({ ...formData, heroSubtitle: e.target.value })}
                    className="w-full px-3 py-2 rounded-md border border-slate-300 text-sm text-slate-900 focus:ring-2 focus:ring-slate-900"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1">
                    Manifesto Central (Card de Destaque)
                  </label>
                  <textarea
                    rows={3}
                    value={formData.heroManifesto}
                    onChange={(e) => setFormData({ ...formData, heroManifesto: e.target.value })}
                    className="w-full px-3 py-2 rounded-md border border-slate-300 text-sm text-slate-900 focus:ring-2 focus:ring-slate-900"
                  />
                </div>
              </div>

              <div className="pt-4 flex items-center justify-end gap-3">
                <button
                  type="button"
                  onClick={onClose}
                  className="px-4 py-2.5 text-xs font-semibold uppercase tracking-wider text-slate-600 hover:text-slate-900"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  disabled={isSaving}
                  className="px-6 py-2.5 rounded-md bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold uppercase tracking-wider flex items-center gap-2 shadow-xs cursor-pointer disabled:opacity-70"
                >
                  {isSaving ? (
                    <>
                      <RefreshCw className="w-4 h-4 animate-spin" />
                      <span>Salvando no Firestore...</span>
                    </>
                  ) : (
                    <>
                      <Save className="w-4 h-4" />
                      <span>Salvar no Banco de Dados</span>
                    </>
                  )}
                </button>
              </div>
            </form>
          ) : activeTab === 'history' ? (
            <div className="space-y-3">
              <div className="text-xs text-slate-500 mb-2">
                Registro de todas as versões e modificações persistidas no Firestore:
              </div>
              {historyRecords.length === 0 ? (
                <div className="p-8 text-center bg-slate-50 rounded-lg border border-slate-200 text-xs text-slate-500">
                  Nenhuma alteração registrada ainda. As edições salvas aparecerão aqui.
                </div>
              ) : (
                historyRecords.map((record) => (
                  <div key={record.id} className="p-4 rounded-lg bg-slate-50 border border-slate-200 text-xs space-y-1">
                    <div className="flex items-center justify-between">
                      <span className="font-bold text-slate-900 text-sm">{record.title}</span>
                      <span className="text-slate-400 font-mono">{record.id}</span>
                    </div>
                    <p className="text-slate-600">{record.description}</p>
                    <div className="text-[11px] text-slate-400 pt-1">
                      Salvo em: {new Date(record.savedAt).toLocaleString('pt-BR')}
                    </div>
                  </div>
                ))
              )}
            </div>
          ) : (
            <div className="space-y-4">
              <div className="text-xs text-slate-500 mb-2">
                Leads e solicitações recebidas em tempo real pelo formulário:
              </div>
              {leadsList.length === 0 ? (
                <div className="p-8 text-center bg-slate-50 rounded-lg border border-slate-200 text-xs text-slate-500">
                  Nenhum lead registrado no banco ainda.
                </div>
              ) : (
                <div className="divide-y divide-slate-200 border border-slate-200 rounded-lg overflow-hidden">
                  {leadsList.map((lead) => (
                    <div key={lead.id} className="p-4 bg-white hover:bg-slate-50 transition-colors flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="font-bold text-slate-900 text-sm">{lead.name}</span>
                          <span className="text-slate-500">({lead.role})</span>
                          <span className="px-2 py-0.5 rounded bg-slate-100 font-mono text-[10px] text-slate-700">
                            {lead.id}
                          </span>
                        </div>
                        <div className="text-slate-600 mt-1">
                          Empresa: <strong className="text-slate-800">{lead.company}</strong> · {lead.cityState} · {lead.monthlyTrips} viagens/mês
                        </div>
                        <div className="text-slate-500 text-[11px] mt-0.5">
                          {lead.email} · {lead.phone} · {new Date(lead.createdAt).toLocaleString('pt-BR')}
                        </div>
                      </div>

                      <div className="shrink-0 flex items-center gap-2">
                        <a
                          href={`https://wa.me/55${lead.phone.replace(/\D/g, '')}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="px-3 py-1.5 rounded bg-emerald-600 hover:bg-emerald-700 text-white font-medium flex items-center gap-1.5"
                        >
                          <MessageSquare className="w-3.5 h-3.5" />
                          <span>WhatsApp</span>
                        </a>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="p-4 bg-slate-100 border-t border-slate-200 flex items-center justify-between text-xs text-slate-500">
          <span>Banco: Google Cloud Firestore (Gen-Lang-Client) · Plano Gratuito</span>
          <button
            onClick={loadData}
            className="flex items-center gap-1 hover:text-slate-900 transition-colors cursor-pointer"
          >
            <RefreshCw className="w-3.5 h-3.5" />
            <span>Atualizar Dados</span>
          </button>
        </div>
      </div>
    </div>
  );
};
