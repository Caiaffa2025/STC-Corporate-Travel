/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

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
  Image as ImageIcon,
  Lock,
  Unlock,
  KeyRound,
  FileText,
  Phone,
  Sparkles,
  ExternalLink,
  RotateCcw,
  Eye
} from 'lucide-react';
import { 
  LandingPageData, 
  PageChangeRecord, 
  StoredLead, 
  getLandingConfig, 
  saveLandingConfig, 
  getChangesHistory, 
  getAllLeadsFromFirestore,
  INITIAL_LANDING_DATA
} from '../lib/dbService';
import { CORPORATE_IMAGE_CATALOG, DEFAULT_IMAGES } from '../assets/images';

interface AdminEditorModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfigSaved: (updatedConfig: LandingPageData) => void;
}

const ADMIN_MASTER_PASSWORD = '1966';
const AUTH_STORAGE_KEY = 'stc_admin_auth_token';

export const AdminEditorModal: React.FC<AdminEditorModalProps> = ({
  isOpen,
  onClose,
  onConfigSaved,
}) => {
  // Authentication State
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(() => {
    return sessionStorage.getItem(AUTH_STORAGE_KEY) === ADMIN_MASTER_PASSWORD;
  });
  const [passwordInput, setPasswordInput] = useState('');
  const [authError, setAuthError] = useState<string | null>(null);

  // Panel State
  const [activeTab, setActiveTab] = useState<'images' | 'texts' | 'contacts' | 'history' | 'leads'>('images');
  const [formData, setFormData] = useState<LandingPageData>(INITIAL_LANDING_DATA);
  const [historyRecords, setHistoryRecords] = useState<PageChangeRecord[]>([]);
  const [leadsList, setLeadsList] = useState<StoredLead[]>([]);
  
  const [isLoading, setIsLoading] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [saveSuccessMessage, setSaveSuccessMessage] = useState<string | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  useEffect(() => {
    if (isOpen) {
      // Re-verify session storage
      const hasAuth = sessionStorage.getItem(AUTH_STORAGE_KEY) === ADMIN_MASTER_PASSWORD;
      setIsAuthenticated(hasAuth);
      setAuthError(null);
      setPasswordInput('');
      
      if (hasAuth) {
        loadData();
      }
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

  const handlePasswordSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (passwordInput.trim() === ADMIN_MASTER_PASSWORD) {
      sessionStorage.setItem(AUTH_STORAGE_KEY, ADMIN_MASTER_PASSWORD);
      setIsAuthenticated(true);
      setAuthError(null);
      setPasswordInput('');
      loadData();
    } else {
      setAuthError('Senha de acesso incorreta. Verifique suas credenciais.');
      setPasswordInput('');
    }
  };

  const handleLogout = () => {
    sessionStorage.removeItem(AUTH_STORAGE_KEY);
    setIsAuthenticated(false);
    setPasswordInput('');
    setAuthError(null);
  };

  const handleSave = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!formData) return;

    setIsSaving(true);
    setSaveSuccessMessage(null);
    setErrorMessage(null);

    try {
      const result = await saveLandingConfig(formData, 'Alterações de imagens, textos e contatos salvas pelo Administrador');
      setSaveSuccessMessage(`Alterações gravadas no Firestore com sucesso! (Protocolo: ${result.changeId})`);
      onConfigSaved(formData);

      // Refresh history list
      const history = await getChangesHistory();
      setHistoryRecords(history);
      
      setTimeout(() => setSaveSuccessMessage(null), 5000);
    } catch (err) {
      setErrorMessage('Falha ao salvar no banco de dados Firestore. Verifique sua conexão.');
    } finally {
      setIsSaving(false);
    }
  };

  const handleResetImageToDefault = (key: keyof LandingPageData, defaultVal: string) => {
    setFormData((prev) => ({
      ...prev,
      [key]: defaultVal,
    }));
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-950/85 backdrop-blur-xs animate-in fade-in duration-150">
      <div 
        className="bg-white rounded-2xl max-w-4xl w-full max-h-[92vh] flex flex-col shadow-2xl border border-slate-200 overflow-hidden"
        role="dialog"
        aria-modal="true"
      >
        {/* TOP BAR / HEADER */}
        <div className="p-4 sm:p-5 bg-slate-900 text-white border-b border-slate-800 flex items-center justify-between gap-4 shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-amber-400 text-slate-950 flex items-center justify-center font-bold shrink-0">
              {isAuthenticated ? <Unlock className="w-5 h-5 text-slate-950" /> : <Lock className="w-5 h-5 text-slate-950" />}
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-base sm:text-lg font-bold text-white tracking-tight">
                  {isAuthenticated ? 'Painel Administrativo STC' : 'Acesso Restrito ao Administrador'}
                </h3>
                {isAuthenticated && (
                  <span className="text-[10px] font-mono uppercase tracking-wider bg-emerald-950 text-emerald-400 px-2 py-0.5 rounded border border-emerald-800">
                    Autenticado (1966)
                  </span>
                )}
              </div>
              <p className="text-xs text-slate-400 mt-0.5">
                {isAuthenticated 
                  ? 'Gestão de imagens corporativas, textos, contatos e banco de dados na nuvem'
                  : 'Digite a senha invisível para desbloquear o gerenciamento da plataforma'}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {isAuthenticated && (
              <button
                onClick={handleLogout}
                className="px-3 py-1.5 rounded text-xs font-semibold uppercase tracking-wider bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white transition-colors"
                title="Bloquear painel"
              >
                Bloquear / Sair
              </button>
            )}
            <button
              onClick={onClose}
              className="p-2 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800 transition-colors"
              aria-label="Fechar painel"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* TELA DE AUTENTICAÇÃO (SENHA INVISÍVEL: 1966) */}
        {!isAuthenticated ? (
          <div className="p-6 sm:p-12 flex flex-col items-center justify-center text-center my-auto">
            <div className="w-16 h-16 rounded-2xl bg-slate-100 border border-slate-200 flex items-center justify-center text-slate-900 mb-4 shadow-inner">
              <KeyRound className="w-8 h-8 text-amber-500" />
            </div>

            <h4 className="text-xl font-extrabold text-slate-950 tracking-tight">
              Identificação do Administrador
            </h4>
            <p className="text-xs sm:text-sm text-slate-600 mt-1.5 max-w-md">
              Para adicionar ou alterar imagens, modificar textos e visualizar leads salvos no Firestore, digite a senha mestra abaixo.
            </p>

            <form onSubmit={handlePasswordSubmit} className="mt-6 w-full max-w-sm space-y-4">
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5 text-left">
                  Senha de Acesso (Invisível)
                </label>
                {/* Input com type="password" para manter a senha totalmente invisível */}
                <input
                  type="password"
                  autoFocus
                  required
                  value={passwordInput}
                  onChange={(e) => {
                    setPasswordInput(e.target.value);
                    if (authError) setAuthError(null);
                  }}
                  placeholder="••••"
                  className="w-full px-4 py-3 text-center text-lg tracking-widest font-mono rounded-lg border-2 border-slate-300 focus:border-slate-900 focus:outline-hidden text-slate-900 placeholder:text-slate-400 transition-colors"
                />
              </div>

              {authError && (
                <div className="p-3 rounded-lg bg-rose-50 border border-rose-200 text-rose-800 text-xs flex items-center justify-center gap-2">
                  <AlertCircle className="w-4 h-4 text-rose-600 shrink-0" />
                  <span>{authError}</span>
                </div>
              )}

              <button
                type="submit"
                className="w-full py-3 px-4 rounded-lg bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs uppercase tracking-wider transition-colors shadow-md cursor-pointer flex items-center justify-center gap-2"
              >
                <Unlock className="w-4 h-4 text-amber-400" />
                <span>Desbloquear Painel de Gestão</span>
              </button>

              <p className="text-[11px] text-slate-400">
                Acesso seguro e restrito à equipe gestora da STC Corporate Travel.
              </p>
            </form>
          </div>
        ) : (
          /* PAINEL ADMINISTRATIVO COMPLETO APÓS AUTENTICAÇÃO */
          <>
            {/* Navigation Tabs */}
            <div className="flex items-center gap-1 sm:gap-2 px-4 sm:px-6 pt-3 border-b border-slate-200 bg-slate-50 overflow-x-auto shrink-0">
              <button
                onClick={() => setActiveTab('images')}
                className={`pb-3 px-3 text-xs sm:text-sm font-semibold border-b-2 whitespace-nowrap transition-colors flex items-center gap-1.5 ${
                  activeTab === 'images'
                    ? 'border-slate-900 text-slate-950'
                    : 'border-transparent text-slate-500 hover:text-slate-900'
                }`}
              >
                <ImageIcon className="w-4 h-4 text-amber-600" />
                <span>Imagens da Landing Page</span>
              </button>

              <button
                onClick={() => setActiveTab('texts')}
                className={`pb-3 px-3 text-xs sm:text-sm font-semibold border-b-2 whitespace-nowrap transition-colors flex items-center gap-1.5 ${
                  activeTab === 'texts'
                    ? 'border-slate-900 text-slate-950'
                    : 'border-transparent text-slate-500 hover:text-slate-900'
                }`}
              >
                <FileText className="w-4 h-4" />
                <span>Textos & Manifesto</span>
              </button>

              <button
                onClick={() => setActiveTab('contacts')}
                className={`pb-3 px-3 text-xs sm:text-sm font-semibold border-b-2 whitespace-nowrap transition-colors flex items-center gap-1.5 ${
                  activeTab === 'contacts'
                    ? 'border-slate-900 text-slate-950'
                    : 'border-transparent text-slate-500 hover:text-slate-900'
                }`}
              >
                <Phone className="w-4 h-4" />
                <span>Contatos & Canais</span>
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
                <span>Histórico Firestore ({historyRecords.length})</span>
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
                <span>Leads Recebidos ({leadsList.length})</span>
              </button>
            </div>

            {/* Body Content */}
            <div className="p-4 sm:p-6 overflow-y-auto flex-grow space-y-6">
              {saveSuccessMessage && (
                <div className="p-4 rounded-lg bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs sm:text-sm flex items-start gap-2.5 animate-in fade-in">
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
                <div className="py-16 text-center text-slate-500 flex flex-col items-center justify-center gap-2">
                  <RefreshCw className="w-6 h-6 animate-spin text-slate-400" />
                  <span className="text-xs">Sincronizando com o banco de dados Firestore...</span>
                </div>
              ) : activeTab === 'images' ? (
                /* ABA 1: GERENCIADOR DE IMAGENS */
                <div className="space-y-6">
                  <div className="p-4 rounded-xl bg-slate-900 text-white border border-slate-800 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
                    <div>
                      <h4 className="text-sm font-bold text-amber-400 flex items-center gap-2">
                        <ImageIcon className="w-4 h-4" />
                        <span>Imagens Reais de Viagens Corporativas</span>
                      </h4>
                      <p className="text-xs text-slate-300 mt-0.5">
                        Altere as URLs abaixo ou escolha entre os presets corporativos STC (Aeronaves, Suítes 5★, Salas VIP, Reuniões e Aeroportos).
                      </p>
                    </div>
                    <span className="text-[11px] font-mono bg-slate-800 text-slate-300 px-2.5 py-1 rounded border border-slate-700 whitespace-nowrap">
                      Produção & Deploy Resilientes
                    </span>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {CORPORATE_IMAGE_CATALOG.map((item) => {
                      const fieldKey = item.key as keyof LandingPageData;
                      const currentValue = (formData[fieldKey] as string) || item.defaultUrl;

                      return (
                        <div 
                          key={item.key} 
                          className="p-4 rounded-xl border border-slate-200 bg-slate-50/60 hover:bg-white hover:border-slate-300 hover:shadow-xs transition-all flex flex-col justify-between"
                        >
                          <div>
                            <div className="flex items-center justify-between mb-2">
                              <div>
                                <span className="text-[10px] font-mono uppercase tracking-wider text-slate-500 bg-slate-200/60 px-2 py-0.5 rounded">
                                  {item.section}
                                </span>
                                <h5 className="text-sm font-bold text-slate-900 mt-1">
                                  {item.name}
                                </h5>
                              </div>

                              <button
                                type="button"
                                onClick={() => handleResetImageToDefault(fieldKey, item.defaultUrl)}
                                className="text-[11px] text-slate-500 hover:text-slate-900 flex items-center gap-1 cursor-pointer font-medium"
                                title="Restaurar imagem padrão"
                              >
                                <RotateCcw className="w-3 h-3" />
                                <span>Padrão</span>
                              </button>
                            </div>

                            {/* Preview Thumbnail */}
                            <div className="relative h-44 rounded-lg overflow-hidden border border-slate-200 bg-slate-900 my-3 group">
                              <img
                                src={currentValue}
                                alt={item.name}
                                className="w-full h-full object-cover object-center group-hover:scale-102 transition-transform duration-300"
                                onError={(e) => {
                                  (e.currentTarget as HTMLImageElement).src = item.defaultUrl;
                                }}
                              />
                              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/70 via-transparent to-transparent pointer-events-none" />
                              <div className="absolute bottom-2 left-2 right-2 text-[11px] text-slate-200 truncate">
                                {item.description}
                              </div>
                            </div>

                            {/* Input URL */}
                            <div className="mt-3">
                              <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-700 mb-1">
                                URL da Imagem (Web ou Local)
                              </label>
                              <input
                                type="text"
                                value={currentValue}
                                onChange={(e) => {
                                  setFormData({
                                    ...formData,
                                    [fieldKey]: e.target.value,
                                  });
                                }}
                                placeholder="https://exemplo.com/imagem.jpg ou /images/..."
                                className="w-full px-3 py-1.5 rounded-md border border-slate-300 text-xs text-slate-900 font-mono bg-white focus:ring-2 focus:ring-slate-900"
                              />
                            </div>
                          </div>

                          {/* Quick selection chips */}
                          <div className="mt-3 pt-2.5 border-t border-slate-200/80 flex items-center justify-between text-[11px] text-slate-500">
                            <span>Status: Ativa na Landing Page</span>
                            <span className="font-mono text-[10px] text-emerald-700 font-bold">● Carregando</span>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              ) : activeTab === 'texts' ? (
                /* ABA 2: TEXTOS & MANIFESTO */
                <div className="space-y-5">
                  <div className="bg-amber-50/70 border border-amber-200/70 p-3.5 rounded-lg text-xs text-amber-950 flex items-start gap-2">
                    <Sparkles className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
                    <span>
                      Modifique qualquer texto abaixo e clique em <strong>Salvar no Banco de Dados</strong>. A landing page atualizará instantaneamente.
                    </span>
                  </div>

                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1">
                      Nome da Empresa
                    </label>
                    <input
                      type="text"
                      value={formData.brandName}
                      onChange={(e) => setFormData({ ...formData, brandName: e.target.value })}
                      className="w-full px-3 py-2 rounded-md border border-slate-300 text-sm text-slate-900 focus:ring-2 focus:ring-slate-900 font-bold"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1">
                      Tagline / Frase de Identidade
                    </label>
                    <input
                      type="text"
                      value={formData.tagline}
                      onChange={(e) => setFormData({ ...formData, tagline: e.target.value })}
                      className="w-full px-3 py-2 rounded-md border border-slate-300 text-sm text-slate-900 focus:ring-2 focus:ring-slate-900"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1">
                      Título Principal do Hero (Primeira Dobra)
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
                      Manifesto Central da STC Corporate Travel (Card Escuro de Destaque)
                    </label>
                    <textarea
                      rows={4}
                      value={formData.heroManifesto}
                      onChange={(e) => setFormData({ ...formData, heroManifesto: e.target.value })}
                      className="w-full px-3 py-2 rounded-md border border-slate-300 text-sm text-slate-900 focus:ring-2 focus:ring-slate-900 leading-relaxed"
                    />
                    <span className="text-[11px] text-slate-500">
                      Este texto aparece com destaque visual prioritário no centro da primeira dobra.
                    </span>
                  </div>
                </div>
              ) : activeTab === 'contacts' ? (
                /* ABA 3: CONTATOS & CANAIS */
                <div className="space-y-5">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1">
                        WhatsApp Comercial (Exibição)
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
                      <span className="text-[11px] text-slate-500">Número da API: {formData.whatsappNumber}</span>
                    </div>

                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1">
                        Central de Atendimento Telefônico
                      </label>
                      <input
                        type="text"
                        value={formData.phoneDisplay}
                        onChange={(e) => setFormData({ ...formData, phoneDisplay: e.target.value })}
                        className="w-full px-3 py-2 rounded-md border border-slate-300 text-sm text-slate-900 focus:ring-2 focus:ring-slate-900"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1">
                      E-mail Comercial & Notificações
                    </label>
                    <input
                      type="email"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full px-3 py-2 rounded-md border border-slate-300 text-sm text-slate-900 focus:ring-2 focus:ring-slate-900"
                    />
                  </div>
                </div>
              ) : activeTab === 'history' ? (
                /* ABA 4: HISTÓRICO NO FIRESTORE */
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <h4 className="text-sm font-bold text-slate-900">
                      Registro de Alterações Salvas no Firestore
                    </h4>
                    <span className="text-xs text-slate-500 font-mono">
                      {historyRecords.length} gravações auditadas
                    </span>
                  </div>

                  {historyRecords.length === 0 ? (
                    <div className="p-8 text-center bg-slate-50 rounded-xl border border-slate-200 text-slate-500 text-xs">
                      Nenhuma alteração registrada ainda. Todas as gravações no banco aparecem aqui com data e hora.
                    </div>
                  ) : (
                    <div className="space-y-3">
                      {historyRecords.map((rec) => (
                        <div key={rec.id} className="p-4 rounded-xl border border-slate-200 bg-white hover:border-slate-300 transition-colors">
                          <div className="flex items-start justify-between gap-3">
                            <div>
                              <div className="flex items-center gap-2">
                                <span className="font-mono text-xs font-bold text-slate-900">{rec.id}</span>
                                <span className="text-[11px] text-slate-500">
                                  {new Date(rec.savedAt).toLocaleString('pt-BR')}
                                </span>
                              </div>
                              <p className="text-xs font-medium text-slate-800 mt-1">{rec.title}</p>
                              {rec.description && (
                                <p className="text-[11px] text-slate-500 mt-0.5">{rec.description}</p>
                              )}
                            </div>
                            <span className="shrink-0 text-[10px] font-mono px-2 py-0.5 bg-slate-100 rounded text-slate-700">
                              Nuvem Firestore
                            </span>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              ) : (
                /* ABA 5: LEADS RECEBIDOS */
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <h4 className="text-sm font-bold text-slate-900">
                      Leads e Cotações Recebidos na Landing Page
                    </h4>
                    <span className="text-xs text-slate-500 font-mono">
                      {leadsList.length} contatos registrados
                    </span>
                  </div>

                  {leadsList.length === 0 ? (
                    <div className="p-8 text-center bg-slate-50 rounded-xl border border-slate-200 text-slate-500 text-xs">
                      Nenhum lead recebido ainda. Quando um visitante enviar o formulário, ele é salvo no Firestore e exibido aqui.
                    </div>
                  ) : (
                    <div className="space-y-3">
                      {leadsList.map((lead) => {
                        const cleanPhone = lead.phone ? lead.phone.replace(/\D/g, '') : '';
                        const waLink = cleanPhone ? `https://wa.me/55${cleanPhone}` : null;

                        return (
                          <div key={lead.id} className="p-4 rounded-xl border border-slate-200 bg-white hover:shadow-xs transition-shadow">
                            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-100 pb-3 mb-3">
                              <div>
                                <span className="font-bold text-sm text-slate-950">{lead.name}</span>
                                <span className="text-xs text-slate-600 ml-2">({lead.company} · {lead.role})</span>
                              </div>
                              <span className="text-[11px] text-slate-500 font-mono">
                                {new Date(lead.createdAt).toLocaleString('pt-BR')}
                              </span>
                            </div>

                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-slate-600 mb-3">
                              <div>
                                <strong>E-mail:</strong> {lead.email}
                              </div>
                              <div>
                                <strong>WhatsApp:</strong> {lead.phone}
                              </div>
                              <div>
                                <strong>Localização:</strong> {lead.cityState}
                              </div>
                              <div>
                                <strong>Viagens/mês:</strong> {lead.monthlyTrips}
                              </div>
                            </div>

                            {lead.needs && lead.needs.length > 0 && (
                              <div className="text-xs text-slate-600 mb-3">
                                <span className="font-semibold">Demandas: </span>
                                {lead.needs.join(', ')}
                              </div>
                            )}

                            {waLink && (
                              <a
                                href={waLink}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-md bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-semibold uppercase tracking-wider transition-colors"
                              >
                                <span>Chamar no WhatsApp</span>
                                <ExternalLink className="w-3 h-3" />
                              </a>
                            )}
                          </div>
                        );
                      })}
                    </div>
                  )}
                </div>
              )}
            </div>

            {/* MODAL FOOTER */}
            <div className="p-4 sm:p-5 bg-slate-50 border-t border-slate-200 flex items-center justify-between gap-3 shrink-0">
              <div className="text-xs text-slate-500 flex items-center gap-1.5">
                <Database className="w-4 h-4 text-emerald-600" />
                <span className="hidden sm:inline">Persistência permanente no Firestore (Google Cloud)</span>
              </div>

              <div className="flex items-center gap-3">
                <button
                  type="button"
                  onClick={onClose}
                  className="px-4 py-2 text-xs font-semibold uppercase tracking-wider text-slate-600 hover:text-slate-900"
                >
                  Fechar
                </button>

                <button
                  type="button"
                  onClick={() => handleSave()}
                  disabled={isSaving}
                  className="px-6 py-2.5 rounded-md bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold uppercase tracking-wider flex items-center gap-2 shadow-sm cursor-pointer disabled:opacity-70 transition-colors"
                >
                  {isSaving ? (
                    <>
                      <RefreshCw className="w-4 h-4 animate-spin text-amber-400" />
                      <span>Gravando no Firestore...</span>
                    </>
                  ) : (
                    <>
                      <Save className="w-4 h-4 text-amber-400" />
                      <span>Salvar no Banco de Dados</span>
                    </>
                  )}
                </button>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};
