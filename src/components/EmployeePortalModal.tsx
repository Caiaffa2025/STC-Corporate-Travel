import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  X, 
  Plane, 
  Building, 
  Layers, 
  Calendar, 
  Clock, 
  User, 
  Lock, 
  PlusCircle, 
  CheckCircle2, 
  AlertCircle, 
  ArrowRight, 
  FileText, 
  ShieldCheck, 
  Sparkles, 
  LogOut, 
  RefreshCw, 
  CheckCheck, 
  XCircle, 
  Ban, 
  ChevronRight,
  Briefcase,
  DollarSign,
  Tag,
  Hotel
} from 'lucide-react';
import { 
  Employee, 
  TravelRequest, 
  TravelRequestType, 
  TravelPriority, 
  TravelStatus,
  getRegisteredEmployees, 
  saveEmployee, 
  getEmployeeTravelRequests, 
  saveTravelRequest,
  DEFAULT_EMPLOYEES
} from '../lib/dbService';

interface EmployeePortalModalProps {
  isOpen: boolean;
  onClose: () => void;
  defaultTab?: 'dashboard' | 'new-request';
}

const AUTH_EMPLOYEE_KEY = 'stc_current_logged_employee';

export const EmployeePortalModal: React.FC<EmployeePortalModalProps> = ({
  isOpen,
  onClose,
  defaultTab = 'dashboard',
}) => {
  // Estado de Autenticação do Funcionário
  const [currentEmployee, setCurrentEmployee] = useState<Employee | null>(() => {
    const saved = localStorage.getItem(AUTH_EMPLOYEE_KEY);
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch {
        return null;
      }
    }
    return null;
  });

  const [registeredEmployees, setRegisteredEmployees] = useState<Employee[]>(DEFAULT_EMPLOYEES);
  const [loginIdentifier, setLoginIdentifier] = useState('');
  const [loginPassword, setLoginPassword] = useState('');
  const [loginError, setLoginError] = useState<string | null>(null);

  // Registro de novo funcionário (caso não esteja na lista)
  const [isRegistering, setIsRegistering] = useState(false);
  const [newEmpName, setNewEmpName] = useState('');
  const [newEmpEmail, setNewEmpEmail] = useState('');
  const [newEmpDept, setNewEmpDept] = useState('Comercial');
  const [newEmpRole, setNewEmpRole] = useState('');
  const [newEmpPassword, setNewEmpPassword] = useState('');

  // Estado do Dashboard do Funcionário
  const [activeTab, setActiveTab] = useState<'dashboard' | 'new-request'>('dashboard');
  const [requests, setRequests] = useState<TravelRequest[]>([]);
  const [isLoadingRequests, setIsLoadingRequests] = useState(false);
  const [filterStatus, setFilterStatus] = useState<string>('todos');

  // Estado do Formulário de Nova Solicitação de Viagem
  const [reqType, setReqType] = useState<TravelRequestType>('flight_and_hotel');
  const [reqTitle, setReqTitle] = useState('');
  const [reqOrigin, setReqOrigin] = useState('São Paulo (CGH)');
  const [reqDestination, setReqDestination] = useState('');
  const [reqDepartureDate, setReqDepartureDate] = useState('');
  const [reqDepartureTime, setReqDepartureTime] = useState('08:00');
  const [reqReturnDate, setReqReturnDate] = useState('');
  const [reqReturnTime, setReqReturnTime] = useState('19:00');
  const [reqFlightClass, setReqFlightClass] = useState<'Econômica' | 'Executiva'>('Econômica');
  const [reqHotelName, setReqHotelName] = useState('');
  const [reqReason, setReqReason] = useState('');
  const [reqDepartment, setReqDepartment] = useState('');
  const [reqPriority, setReqPriority] = useState<TravelPriority>('Normal');
  const [reqEstimatedCost, setReqEstimatedCost] = useState<string>('1500');
  const [isSubmittingReq, setIsSubmittingReq] = useState(false);
  const [submitSuccessProtocol, setSubmitSuccessProtocol] = useState<string | null>(null);

  // Carrega funcionários e solicitações ao abrir
  useEffect(() => {
    if (isOpen) {
      getRegisteredEmployees().then((emps) => {
        setRegisteredEmployees(emps);
      });
      if (defaultTab) {
        setActiveTab(defaultTab);
      }
    }
  }, [isOpen, defaultTab]);

  useEffect(() => {
    if (currentEmployee) {
      loadEmployeeRequests(currentEmployee.id, currentEmployee.name);
      setReqDepartment(currentEmployee.department);
    }
  }, [currentEmployee]);

  const loadEmployeeRequests = async (empId: string, empName: string) => {
    setIsLoadingRequests(true);
    try {
      const data = await getEmployeeTravelRequests(empId, empName);
      setRequests(data);
    } finally {
      setIsLoadingRequests(false);
    }
  };

  // Login do Funcionário com Nome e Senha
  const handleLogin = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    setLoginError(null);

    const term = loginIdentifier.trim().toLowerCase();
    const pass = loginPassword.trim();

    if (!term || !pass) {
      setLoginError('Por favor, informe seu Nome/E-mail e Senha.');
      return;
    }

    // Busca o funcionário cadastrado pelo nome ou e-mail
    const matched = registeredEmployees.find((emp) => {
      const nameMatch = emp.name.toLowerCase() === term || emp.name.toLowerCase().includes(term);
      const emailMatch = emp.email.toLowerCase() === term;
      return nameMatch || emailMatch;
    });

    if (!matched) {
      setLoginError('Funcionário não localizado. Verifique o nome ou utilize um dos funcionários pré-cadastrados abaixo.');
      return;
    }

    if (matched.password && matched.password !== pass) {
      setLoginError('Senha incorreta para este funcionário. (Dica de demonstração: senha "123")');
      return;
    }

    // Login com sucesso
    setCurrentEmployee(matched);
    localStorage.setItem(AUTH_EMPLOYEE_KEY, JSON.stringify(matched));
    setLoginPassword('');
    setLoginError(null);
  };

  // Login rápido de demonstração (1 clique)
  const handleQuickLogin = (emp: Employee) => {
    setCurrentEmployee(emp);
    localStorage.setItem(AUTH_EMPLOYEE_KEY, JSON.stringify(emp));
    setLoginIdentifier(emp.name);
    setLoginPassword('');
    setLoginError(null);
  };

  // Logout
  const handleLogout = () => {
    setCurrentEmployee(null);
    localStorage.removeItem(AUTH_EMPLOYEE_KEY);
    setRequests([]);
    setActiveTab('dashboard');
    setSubmitSuccessProtocol(null);
  };

  // Cadastro de Novo Funcionário
  const handleRegisterNewEmployee = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newEmpName.trim() || !newEmpPassword.trim()) {
      alert('Informe ao menos o Nome e a Senha do funcionário.');
      return;
    }

    const newEmp: Employee = {
      id: `emp-${Date.now().toString(36)}`,
      name: newEmpName.trim(),
      email: newEmpEmail.trim() || `${newEmpName.toLowerCase().replace(/\s+/g, '.')}@empresa.com.br`,
      department: newEmpDept,
      role: newEmpRole.trim() || 'Colaborador',
      password: newEmpPassword.trim(),
      createdAt: new Date().toISOString(),
    };

    await saveEmployee(newEmp);
    setRegisteredEmployees((prev) => [...prev, newEmp]);
    setCurrentEmployee(newEmp);
    localStorage.setItem(AUTH_EMPLOYEE_KEY, JSON.stringify(newEmp));
    setIsRegistering(false);
  };

  // Envio de Nova Solicitação de Viagem em Tempo Real
  const handleSubmitNewRequest = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!currentEmployee) return;

    if (!reqDestination.trim()) {
      alert('Por favor, informe a cidade ou aeroporto de destino.');
      return;
    }
    if (!reqDepartureDate) {
      alert('Por favor, selecione a data de ida.');
      return;
    }
    if (!reqReason.trim()) {
      alert('Por favor, descreva o motivo da viagem.');
      return;
    }

    setIsSubmittingReq(true);
    const protocolNumber = `STC-${Math.floor(1000 + Math.random() * 9000)}`;
    const now = new Date().toISOString();

    const titleAuto = reqTitle.trim() || `${reqType === 'flight' ? 'Voo' : reqType === 'hotel' ? 'Hospedagem' : 'Voo + Hotel'} para ${reqDestination}`;

    const newRequest: TravelRequest = {
      id: protocolNumber,
      employeeId: currentEmployee.id,
      employeeName: currentEmployee.name,
      department: reqDepartment || currentEmployee.department,
      type: reqType,
      title: titleAuto,
      origin: reqType !== 'hotel' ? reqOrigin : undefined,
      destination: reqDestination.trim(),
      departureDate: reqDepartureDate,
      departureTime: reqDepartureTime,
      returnDate: reqReturnDate || undefined,
      returnTime: reqReturnDate ? reqReturnTime : undefined,
      flightClass: reqType !== 'hotel' ? reqFlightClass : undefined,
      hotelName: reqType !== 'flight' ? (reqHotelName.trim() || 'Hotel Corporativo Conveniado') : undefined,
      hotelCheckIn: reqType !== 'flight' ? reqDepartureDate : undefined,
      hotelCheckOut: reqType !== 'flight' ? (reqReturnDate || reqDepartureDate) : undefined,
      reason: reqReason.trim(),
      priority: reqPriority,
      estimatedCost: Number(reqEstimatedCost) || 0,
      status: 'Pendente',
      createdAt: now,
      updatedAt: now,
    };

    try {
      await saveTravelRequest(newRequest);
      setRequests((prev) => [newRequest, ...prev]);
      setSubmitSuccessProtocol(protocolNumber);
      
      // Limpa formulário
      setReqTitle('');
      setReqDestination('');
      setReqDepartureDate('');
      setReqReturnDate('');
      setReqHotelName('');
      setReqReason('');
      
      // Redireciona para visualização do dashboard
      setTimeout(() => {
        setActiveTab('dashboard');
      }, 1500);
    } catch (err) {
      alert('Erro ao registrar a solicitação. Tente novamente.');
    } finally {
      setIsSubmittingReq(false);
    }
  };

  // Filtro de solicitações no Dashboard
  const filteredRequests = requests.filter((r) => {
    if (filterStatus === 'todos') return true;
    return r.status.toLowerCase() === filterStatus.toLowerCase();
  });

  // Estatísticas do Funcionário
  const stats = {
    total: requests.length,
    pendentes: requests.filter((r) => r.status === 'Pendente').length,
    aprovadas: requests.filter((r) => r.status === 'Aprovado').length,
    rejeitadas: requests.filter((r) => r.status === 'Rejeitado').length,
    concluidas: requests.filter((r) => r.status === 'Concluído').length,
  };

  const getStatusBadge = (status: TravelStatus) => {
    switch (status) {
      case 'Pendente':
        return (
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-xs font-bold bg-amber-100 text-amber-900 border border-amber-300">
            <Clock className="w-3.5 h-3.5 text-amber-600 animate-pulse" />
            <span>Pendente · Aguardando análise</span>
          </span>
        );
      case 'Aprovado':
        return (
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-xs font-bold bg-emerald-100 text-emerald-900 border border-emerald-300">
            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
            <span>Aprovado · Confirmado</span>
          </span>
        );
      case 'Rejeitado':
        return (
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-xs font-bold bg-rose-100 text-rose-900 border border-rose-300">
            <XCircle className="w-3.5 h-3.5 text-rose-600" />
            <span>Rejeitado · Não autorizado</span>
          </span>
        );
      case 'Concluído':
        return (
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-xs font-bold bg-sky-100 text-sky-900 border border-sky-300">
            <CheckCheck className="w-3.5 h-3.5 text-sky-600" />
            <span>Concluído · Viagem realizada</span>
          </span>
        );
      case 'Cancelado':
        return (
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-xs font-bold bg-slate-100 text-slate-800 border border-slate-300">
            <Ban className="w-3.5 h-3.5 text-slate-500" />
            <span>Cancelado</span>
          </span>
        );
      default:
        return null;
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-950/70 backdrop-blur-sm flex items-center justify-center p-3 sm:p-5">
      <div 
        className="relative w-full max-w-5xl bg-white rounded-2xl shadow-2xl border border-slate-200 overflow-hidden flex flex-col max-h-[92vh]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Top Header Bar */}
        <div className="px-5 py-4 sm:px-6 bg-slate-900 text-white flex items-center justify-between border-b border-slate-800 shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-amber-400 text-slate-950 flex items-center justify-center font-bold shadow-md shrink-0">
              <Plane className="w-5 h-5 text-slate-950" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="font-bold text-base sm:text-lg text-white">
                  Portal do Funcionário · Solicitar Minha Viagem
                </h3>
                <span className="hidden sm:inline-block text-[11px] font-mono px-2 py-0.5 rounded bg-amber-400/20 text-amber-300 border border-amber-400/40">
                  Tempo Real
                </span>
              </div>
              <p className="text-xs text-slate-300">
                {currentEmployee 
                  ? `Conectado como ${currentEmployee.name} (${currentEmployee.department})`
                  : 'Acesse com seu Nome e Senha para registrar e acompanhar suas viagens.'}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {currentEmployee && (
              <button
                onClick={handleLogout}
                title="Sair da conta"
                className="inline-flex items-center gap-1 px-3 py-1.5 text-xs font-semibold rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white transition-colors cursor-pointer border border-slate-700"
              >
                <LogOut className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">Sair</span>
              </button>
            )}
            <button
              onClick={onClose}
              className="p-2 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Modal Body */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6 bg-slate-50">
          
          {/* TELA DE LOGIN DO FUNCIONÁRIO (SE NÃO ESTIVER AUTENTICADO) */}
          {!currentEmployee ? (
            <div className="max-w-xl mx-auto my-4 space-y-6">
              {!isRegistering ? (
                <div className="bg-white rounded-2xl p-6 sm:p-8 border border-slate-200 shadow-md">
                  <div className="text-center mb-6">
                    <div className="w-14 h-14 rounded-2xl bg-sky-50 border border-sky-200 text-sky-700 mx-auto flex items-center justify-center mb-3 shadow-inner">
                      <User className="w-7 h-7 text-sky-800" />
                    </div>
                    <h4 className="text-xl font-extrabold text-slate-950">
                      Entrar na Minha Dashboard de Viagens
                    </h4>
                    <p className="text-sm text-slate-600 mt-1">
                      Informe seu nome ou e-mail corporativo e sua senha cadastrada.
                    </p>
                  </div>

                  {loginError && (
                    <div className="mb-5 p-3 rounded-xl bg-rose-50 border border-rose-200 text-rose-800 text-xs flex items-center gap-2">
                      <AlertCircle className="w-4 h-4 shrink-0 text-rose-600" />
                      <span>{loginError}</span>
                    </div>
                  )}

                  <form onSubmit={handleLogin} className="space-y-4">
                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
                        Nome ou E-mail do Colaborador:
                      </label>
                      <div className="relative">
                        <User className="w-4 h-4 absolute left-3 top-3.5 text-slate-400" />
                        <input
                          type="text"
                          value={loginIdentifier}
                          onChange={(e) => setLoginIdentifier(e.target.value)}
                          placeholder="Ex: Mariana Costa ou mariana@empresa.com.br"
                          className="w-full pl-9 pr-3 py-2.5 rounded-lg border border-slate-300 text-sm focus:ring-2 focus:ring-slate-900 focus:border-slate-900 bg-white"
                          required
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
                        Senha:
                      </label>
                      <div className="relative">
                        <Lock className="w-4 h-4 absolute left-3 top-3.5 text-slate-400" />
                        <input
                          type="password"
                          value={loginPassword}
                          onChange={(e) => setLoginPassword(e.target.value)}
                          placeholder="Digite sua senha (padrão de demonstração: 123)"
                          className="w-full pl-9 pr-3 py-2.5 rounded-lg border border-slate-300 text-sm focus:ring-2 focus:ring-slate-900 focus:border-slate-900 bg-white"
                          required
                        />
                      </div>
                    </div>

                    <button
                      type="submit"
                      className="w-full py-3 px-4 rounded-xl font-bold text-xs uppercase tracking-wider text-slate-950 bg-amber-400 hover:bg-amber-300 transition-colors shadow-sm cursor-pointer flex items-center justify-center gap-2"
                    >
                      <span>Acessar Minha Dashboard</span>
                      <ArrowRight className="w-4 h-4" />
                    </button>
                  </form>

                  {/* Demonstração rápida com 1 clique */}
                  <div className="mt-8 pt-6 border-t border-slate-200">
                    <span className="text-xs font-bold uppercase tracking-wider text-slate-500 block mb-3 text-center">
                      Ou acesse em 1 clique com um colaborador de teste:
                    </span>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                      {registeredEmployees.slice(0, 4).map((emp) => (
                        <button
                          key={emp.id}
                          type="button"
                          onClick={() => handleQuickLogin(emp)}
                          className="p-3 text-left rounded-xl border border-slate-200 bg-slate-50/80 hover:bg-slate-100 hover:border-slate-300 transition-all flex items-center justify-between group cursor-pointer"
                        >
                          <div>
                            <div className="text-xs font-bold text-slate-900 group-hover:text-sky-800">
                              {emp.name}
                            </div>
                            <div className="text-[11px] text-slate-500">
                              {emp.department} · {emp.role}
                            </div>
                          </div>
                          <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-white text-slate-600 border border-slate-200">
                            Entrar →
                          </span>
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="mt-6 text-center">
                    <button
                      type="button"
                      onClick={() => setIsRegistering(true)}
                      className="text-xs font-semibold text-sky-800 hover:text-sky-950 underline underline-offset-4 cursor-pointer"
                    >
                      Não encontrou seu nome? Cadastre um novo funcionário
                    </button>
                  </div>
                </div>
              ) : (
                /* Cadastro de Novo Funcionário */
                <div className="bg-white rounded-2xl p-6 sm:p-8 border border-slate-200 shadow-md">
                  <div className="flex items-center justify-between mb-5">
                    <h4 className="text-lg font-extrabold text-slate-950">
                      Cadastrar Novo Funcionário
                    </h4>
                    <button
                      type="button"
                      onClick={() => setIsRegistering(false)}
                      className="text-xs text-slate-500 hover:text-slate-800 cursor-pointer"
                    >
                      Voltar ao Login
                    </button>
                  </div>

                  <form onSubmit={handleRegisterNewEmployee} className="space-y-4">
                    <div>
                      <label className="block text-xs font-bold uppercase text-slate-700 mb-1">
                        Nome Completo:
                      </label>
                      <input
                        type="text"
                        value={newEmpName}
                        onChange={(e) => setNewEmpName(e.target.value)}
                        placeholder="Ex: João Silva"
                        className="w-full px-3 py-2 rounded-lg border border-slate-300 text-sm"
                        required
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold uppercase text-slate-700 mb-1">
                        Departamento:
                      </label>
                      <select
                        value={newEmpDept}
                        onChange={(e) => setNewEmpDept(e.target.value)}
                        className="w-full px-3 py-2 rounded-lg border border-slate-300 text-sm bg-white"
                      >
                        <option value="Comercial">Comercial</option>
                        <option value="TI">TI & Sistemas</option>
                        <option value="Área Técnica">Área Técnica & Operações</option>
                        <option value="Diretoria">Diretoria Executiva</option>
                        <option value="Financeiro">Financeiro & Contábil</option>
                        <option value="Outro">Outro Departamento</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-xs font-bold uppercase text-slate-700 mb-1">
                        Cargo / Função:
                      </label>
                      <input
                        type="text"
                        value={newEmpRole}
                        onChange={(e) => setNewEmpRole(e.target.value)}
                        placeholder="Ex: Analista de Negócios"
                        className="w-full px-3 py-2 rounded-lg border border-slate-300 text-sm"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold uppercase text-slate-700 mb-1">
                        Senha de Acesso:
                      </label>
                      <input
                        type="password"
                        value={newEmpPassword}
                        onChange={(e) => setNewEmpPassword(e.target.value)}
                        placeholder="Crie uma senha de acesso"
                        className="w-full px-3 py-2 rounded-lg border border-slate-300 text-sm"
                        required
                      />
                    </div>

                    <button
                      type="submit"
                      className="w-full py-2.5 rounded-xl font-bold text-xs uppercase tracking-wider text-slate-950 bg-amber-400 hover:bg-amber-300 transition-colors cursor-pointer"
                    >
                      Concluir Cadastro e Entrar
                    </button>
                  </form>
                </div>
              )}
            </div>
          ) : (
            /* =================================================== */
            /* DASHBOARD DO FUNCIONÁRIO LOGADO & FORMULÁRIO */
            /* =================================================== */
            <div className="space-y-6">
              
              {/* Employee Header & Status Card */}
              <div className="p-4 sm:p-6 rounded-2xl bg-white border border-slate-200 shadow-xs flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-xl bg-slate-900 text-amber-400 font-extrabold text-lg flex items-center justify-center shadow-md">
                    {currentEmployee.name.charAt(0)}
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <h4 className="text-base sm:text-lg font-extrabold text-slate-950">
                        {currentEmployee.name}
                      </h4>
                      <span className="text-[11px] font-bold px-2 py-0.5 rounded bg-sky-100 text-sky-800 border border-sky-200">
                        {currentEmployee.department}
                      </span>
                    </div>
                    <p className="text-xs text-slate-500 mt-0.5">
                      {currentEmployee.role} · {currentEmployee.email}
                    </p>
                  </div>
                </div>

                {/* Navigation Tabs between Dashboard and New Request */}
                <div className="flex items-center gap-2 w-full md:w-auto">
                  <button
                    onClick={() => {
                      setActiveTab('dashboard');
                      setSubmitSuccessProtocol(null);
                    }}
                    className={`flex-1 md:flex-initial px-4 py-2.5 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center justify-center gap-2 ${
                      activeTab === 'dashboard'
                        ? 'bg-slate-900 text-white shadow-xs'
                        : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                    }`}
                  >
                    <Layers className="w-4 h-4" />
                    <span>Minhas Solicitações ({requests.length})</span>
                  </button>

                  <button
                    onClick={() => {
                      setActiveTab('new-request');
                      setSubmitSuccessProtocol(null);
                    }}
                    className={`flex-1 md:flex-initial px-4 py-2.5 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center justify-center gap-2 ${
                      activeTab === 'new-request'
                        ? 'bg-amber-400 text-slate-950 shadow-md font-extrabold'
                        : 'bg-amber-100/70 text-amber-900 hover:bg-amber-200/80'
                    }`}
                  >
                    <PlusCircle className="w-4 h-4" />
                    <span>+ Nova Solicitação</span>
                  </button>
                </div>
              </div>

              {/* Success Notification if a request was just created */}
              {submitSuccessProtocol && (
                <div className="p-4 rounded-xl bg-emerald-50 border border-emerald-300 text-emerald-900 flex items-center justify-between gap-3 shadow-xs">
                  <div className="flex items-center gap-3">
                    <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
                    <div>
                      <p className="text-sm font-bold">
                        Solicitação enviada com sucesso! Protocolo: #{submitSuccessProtocol}
                      </p>
                      <p className="text-xs text-emerald-700">
                        O gestor responsável foi notificado e sua solicitação já está gravada em sua dashboard em tempo real.
                      </p>
                    </div>
                  </div>
                  <button
                    onClick={() => setSubmitSuccessProtocol(null)}
                    className="text-xs font-semibold text-emerald-800 underline cursor-pointer"
                  >
                    Fechar
                  </button>
                </div>
              )}

              {/* ABA 1: MINHAS SOLICITAÇÕES / DASHBOARD DO FUNCIONÁRIO */}
              {activeTab === 'dashboard' && (
                <div className="space-y-6">
                  {/* Summary Metric Counters */}
                  <div className="grid grid-cols-2 sm:grid-cols-5 gap-3">
                    <div className="p-3.5 rounded-xl bg-white border border-slate-200 text-center shadow-2xs">
                      <div className="text-[11px] font-bold uppercase tracking-wider text-slate-500">Total</div>
                      <div className="text-xl font-extrabold text-slate-950 mt-1">{stats.total}</div>
                    </div>
                    <div className="p-3.5 rounded-xl bg-amber-50/80 border border-amber-200 text-center shadow-2xs">
                      <div className="text-[11px] font-bold uppercase tracking-wider text-amber-700">Pendentes</div>
                      <div className="text-xl font-extrabold text-amber-800 mt-1">{stats.pendentes}</div>
                    </div>
                    <div className="p-3.5 rounded-xl bg-emerald-50/80 border border-emerald-200 text-center shadow-2xs">
                      <div className="text-[11px] font-bold uppercase tracking-wider text-emerald-700">Aprovadas</div>
                      <div className="text-xl font-extrabold text-emerald-800 mt-1">{stats.aprovadas}</div>
                    </div>
                    <div className="p-3.5 rounded-xl bg-rose-50/80 border border-rose-200 text-center shadow-2xs">
                      <div className="text-[11px] font-bold uppercase tracking-wider text-rose-700">Rejeitadas</div>
                      <div className="text-xl font-extrabold text-rose-800 mt-1">{stats.rejeitadas}</div>
                    </div>
                    <div className="p-3.5 rounded-xl bg-sky-50/80 border border-sky-200 text-center shadow-2xs col-span-2 sm:col-span-1">
                      <div className="text-[11px] font-bold uppercase tracking-wider text-sky-700">Concluídas</div>
                      <div className="text-xl font-extrabold text-sky-800 mt-1">{stats.concluidas}</div>
                    </div>
                  </div>

                  {/* Filter & Refresh Bar */}
                  <div className="flex flex-wrap items-center justify-between gap-3 bg-white p-3.5 rounded-xl border border-slate-200">
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-bold text-slate-700 uppercase">Filtrar por Status:</span>
                      <select
                        value={filterStatus}
                        onChange={(e) => setFilterStatus(e.target.value)}
                        className="px-2.5 py-1.5 rounded-lg border border-slate-200 text-xs font-semibold text-slate-800 bg-slate-50"
                      >
                        <option value="todos">Todos os Status</option>
                        <option value="Pendente">Pendentes</option>
                        <option value="Aprovado">Aprovados</option>
                        <option value="Rejeitado">Rejeitados</option>
                        <option value="Concluído">Concluídos</option>
                        <option value="Cancelado">Cancelados</option>
                      </select>
                    </div>

                    <button
                      onClick={() => currentEmployee && loadEmployeeRequests(currentEmployee.id, currentEmployee.name)}
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold transition-colors cursor-pointer"
                    >
                      <RefreshCw className={`w-3.5 h-3.5 ${isLoadingRequests ? 'animate-spin' : ''}`} />
                      <span>Atualizar em Tempo Real</span>
                    </button>
                  </div>

                  {/* Requests Cards List */}
                  {filteredRequests.length === 0 ? (
                    <div className="p-10 text-center bg-white rounded-2xl border border-slate-200">
                      <Plane className="w-10 h-10 text-slate-300 mx-auto mb-3" />
                      <h5 className="text-base font-bold text-slate-800">
                        Nenhuma solicitação encontrada
                      </h5>
                      <p className="text-xs text-slate-500 mt-1">
                        Você ainda não possui viagens gravadas com este filtro.
                      </p>
                      <button
                        onClick={() => setActiveTab('new-request')}
                        className="mt-4 inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs font-bold uppercase tracking-wider text-slate-950 bg-amber-400 hover:bg-amber-300 transition-colors cursor-pointer"
                      >
                        <PlusCircle className="w-4 h-4" />
                        <span>Fazer Minha Primeira Solicitação</span>
                      </button>
                    </div>
                  ) : (
                    <div className="space-y-4">
                      {filteredRequests.map((req) => (
                        <div
                          key={req.id}
                          className="p-5 rounded-2xl bg-white border border-slate-200 hover:border-slate-300 transition-all shadow-2xs space-y-3"
                        >
                          {/* Row 1: Protocol, Type & Status */}
                          <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-100 pb-3">
                            <div className="flex items-center gap-2">
                              <span className="font-mono text-xs font-extrabold px-2.5 py-1 rounded bg-slate-900 text-amber-400">
                                #{req.id}
                              </span>
                              <span className="text-xs font-bold uppercase tracking-wider text-slate-500">
                                {req.type === 'flight' && '✈️ Passagem Aérea'}
                                {req.type === 'hotel' && '🏨 Hospedagem'}
                                {req.type === 'flight_and_hotel' && '✈️+🏨 Voo + Hotel'}
                              </span>
                              <span className="text-xs text-slate-400">·</span>
                              <span className="text-xs text-slate-500 font-medium">
                                Prioridade: <strong className="text-slate-700">{req.priority}</strong>
                              </span>
                            </div>

                            <div>
                              {getStatusBadge(req.status)}
                            </div>
                          </div>

                          {/* Row 2: Trip Title & Details */}
                          <div className="grid grid-cols-1 md:grid-cols-12 gap-3 items-center">
                            <div className="md:col-span-8">
                              <h5 className="text-base font-extrabold text-slate-950">
                                {req.title}
                              </h5>
                              <div className="flex flex-wrap items-center gap-y-1 gap-x-4 text-xs text-slate-600 mt-1.5">
                                {req.origin && (
                                  <span className="font-medium">
                                    <strong>Origem:</strong> {req.origin}
                                  </span>
                                )}
                                <span>
                                  <strong>Destino:</strong> {req.destination}
                                </span>
                                <span>
                                  <strong>Ida:</strong> {req.departureDate} {req.departureTime && `às ${req.departureTime}`}
                                </span>
                                {req.returnDate && (
                                  <span>
                                    <strong>Volta:</strong> {req.returnDate} {req.returnTime && `às ${req.returnTime}`}
                                  </span>
                                )}
                                {req.hotelName && (
                                  <span className="text-indigo-700 font-medium">
                                    <strong>Hotel:</strong> {req.hotelName}
                                  </span>
                                )}
                              </div>

                              <p className="text-xs text-slate-500 mt-2 bg-slate-50 p-2.5 rounded-lg border border-slate-100">
                                <strong>Motivo informado:</strong> {req.reason}
                              </p>
                            </div>

                            {/* Row 3: Costs and Approval Feed */}
                            <div className="md:col-span-4 bg-slate-50 p-3.5 rounded-xl border border-slate-200/80 flex flex-col justify-between">
                              <div className="text-xs space-y-1">
                                <div className="flex justify-between">
                                  <span className="text-slate-500">Custo Estimado:</span>
                                  <span className="font-bold text-slate-900">
                                    R$ {req.estimatedCost.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                                  </span>
                                </div>
                                {req.approvedCost !== undefined && (
                                  <div className="flex justify-between pt-1 border-t border-slate-200 text-emerald-800 font-bold">
                                    <span>Custo Aprovado:</span>
                                    <span>R$ {req.approvedCost.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}</span>
                                  </div>
                                )}
                              </div>

                              {req.managerNotes && (
                                <div className="mt-2 text-[11px] text-slate-600 bg-white p-2 rounded border border-slate-200">
                                  <strong className="text-slate-800 block mb-0.5">Parecer da Gestão:</strong>
                                  {req.managerNotes}
                                </div>
                              )}
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              )}

              {/* ABA 2: FORMULÁRIO DE SOLICITAÇÃO DE VIAGEM EM TEMPO REAL */}
              {activeTab === 'new-request' && (
                <div className="bg-white rounded-2xl p-6 sm:p-8 border border-slate-200 shadow-md">
                  <div className="max-w-3xl mb-6">
                    <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-[11px] font-bold uppercase tracking-wider text-amber-800 bg-amber-100 border border-amber-300 mb-2">
                      <Sparkles className="w-3.5 h-3.5 text-amber-600" />
                      <span>Formulário em Tempo Real</span>
                    </div>
                    <h4 className="text-xl font-extrabold text-slate-950">
                      Preencha os Detalhes da sua Próxima Viagem
                    </h4>
                    <p className="text-sm text-slate-600 mt-1">
                      Todas as informações serão registradas diretamente na sua dashboard e encaminhadas para alçada de aprovação da STC.
                    </p>
                  </div>

                  <form onSubmit={handleSubmitNewRequest} className="space-y-6">
                    {/* Seletor de Tipo de Viagem */}
                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-2">
                        1. Tipo de Solicitação:
                      </label>
                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                        <button
                          type="button"
                          onClick={() => setReqType('flight_and_hotel')}
                          className={`p-3.5 rounded-xl border text-left transition-all cursor-pointer flex items-center gap-3 ${
                            reqType === 'flight_and_hotel'
                              ? 'bg-amber-50 border-amber-400 ring-2 ring-amber-400/30 text-slate-950 font-bold'
                              : 'bg-white border-slate-200 text-slate-700 hover:border-slate-300'
                          }`}
                        >
                          <div className="w-9 h-9 rounded-lg bg-amber-400 text-slate-950 flex items-center justify-center font-bold shrink-0">
                            <Layers className="w-4 h-4" />
                          </div>
                          <div>
                            <div className="text-xs font-bold">Voo + Hotel</div>
                            <div className="text-[11px] text-slate-500 font-normal">Pacote completo</div>
                          </div>
                        </button>

                        <button
                          type="button"
                          onClick={() => setReqType('flight')}
                          className={`p-3.5 rounded-xl border text-left transition-all cursor-pointer flex items-center gap-3 ${
                            reqType === 'flight'
                              ? 'bg-sky-50 border-sky-400 ring-2 ring-sky-400/30 text-slate-950 font-bold'
                              : 'bg-white border-slate-200 text-slate-700 hover:border-slate-300'
                          }`}
                        >
                          <div className="w-9 h-9 rounded-lg bg-sky-600 text-white flex items-center justify-center font-bold shrink-0">
                            <Plane className="w-4 h-4" />
                          </div>
                          <div>
                            <div className="text-xs font-bold">Passagem Aérea</div>
                            <div className="text-[11px] text-slate-500 font-normal">Apenas aéreo</div>
                          </div>
                        </button>

                        <button
                          type="button"
                          onClick={() => setReqType('hotel')}
                          className={`p-3.5 rounded-xl border text-left transition-all cursor-pointer flex items-center gap-3 ${
                            reqType === 'hotel'
                              ? 'bg-indigo-50 border-indigo-400 ring-2 ring-indigo-400/30 text-slate-950 font-bold'
                              : 'bg-white border-slate-200 text-slate-700 hover:border-slate-300'
                          }`}
                        >
                          <div className="w-9 h-9 rounded-lg bg-indigo-600 text-white flex items-center justify-center font-bold shrink-0">
                            <Building className="w-4 h-4" />
                          </div>
                          <div>
                            <div className="text-xs font-bold">Reserva de Hotel</div>
                            <div className="text-[11px] text-slate-500 font-normal">Apenas hospedagem</div>
                          </div>
                        </button>
                      </div>
                    </div>

                    {/* Origem e Destino */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      {reqType !== 'hotel' && (
                        <div>
                          <label className="block text-xs font-bold uppercase text-slate-700 mb-1">
                            Cidade / Aeroporto de Origem:
                          </label>
                          <input
                            type="text"
                            value={reqOrigin}
                            onChange={(e) => setReqOrigin(e.target.value)}
                            placeholder="Ex: São Paulo (CGH) ou Curitiba"
                            className="w-full px-3.5 py-2.5 rounded-lg border border-slate-300 text-sm focus:ring-2 focus:ring-slate-900"
                            required
                          />
                        </div>
                      )}

                      <div className={reqType === 'hotel' ? 'sm:col-span-2' : ''}>
                        <label className="block text-xs font-bold uppercase text-slate-700 mb-1">
                          Cidade de Destino: *
                        </label>
                        <input
                          type="text"
                          value={reqDestination}
                          onChange={(e) => setReqDestination(e.target.value)}
                          placeholder="Ex: Rio de Janeiro, Curitiba, Brasília, Belo Horizonte"
                          className="w-full px-3.5 py-2.5 rounded-lg border border-slate-300 text-sm focus:ring-2 focus:ring-slate-900"
                          required
                        />
                      </div>
                    </div>

                    {/* Datas e Horários */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
                      <div>
                        <label className="block text-xs font-bold uppercase text-slate-700 mb-1">
                          Data de Ida / Check-in: *
                        </label>
                        <input
                          type="date"
                          value={reqDepartureDate}
                          onChange={(e) => setReqDepartureDate(e.target.value)}
                          className="w-full px-3 py-2 rounded-lg border border-slate-300 text-sm"
                          required
                        />
                      </div>

                      {reqType !== 'hotel' && (
                        <div>
                          <label className="block text-xs font-bold uppercase text-slate-700 mb-1">
                            Horário Preferido (Ida):
                          </label>
                          <input
                            type="time"
                            value={reqDepartureTime}
                            onChange={(e) => setReqDepartureTime(e.target.value)}
                            className="w-full px-3 py-2 rounded-lg border border-slate-300 text-sm"
                          />
                        </div>
                      )}

                      <div>
                        <label className="block text-xs font-bold uppercase text-slate-700 mb-1">
                          Data de Volta / Check-out:
                        </label>
                        <input
                          type="date"
                          value={reqReturnDate}
                          onChange={(e) => setReqReturnDate(e.target.value)}
                          className="w-full px-3 py-2 rounded-lg border border-slate-300 text-sm"
                        />
                      </div>

                      {reqType !== 'hotel' && (
                        <div>
                          <label className="block text-xs font-bold uppercase text-slate-700 mb-1">
                            Horário Preferido (Volta):
                          </label>
                          <input
                            type="time"
                            value={reqReturnTime}
                            onChange={(e) => setReqReturnTime(e.target.value)}
                            className="w-full px-3 py-2 rounded-lg border border-slate-300 text-sm"
                          />
                        </div>
                      )}
                    </div>

                    {/* Especificidades de Hotel ou Classe */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      {reqType !== 'hotel' && (
                        <div>
                          <label className="block text-xs font-bold uppercase text-slate-700 mb-1">
                            Classe do Voo:
                          </label>
                          <select
                            value={reqFlightClass}
                            onChange={(e) => setReqFlightClass(e.target.value as any)}
                            className="w-full px-3 py-2 rounded-lg border border-slate-300 text-sm bg-white"
                          >
                            <option value="Econômica">Classe Econômica (Padrão Corporativo)</option>
                            <option value="Executiva">Classe Executiva</option>
                          </select>
                        </div>
                      )}

                      {reqType !== 'flight' && (
                        <div className={reqType === 'hotel' ? 'sm:col-span-2' : ''}>
                          <label className="block text-xs font-bold uppercase text-slate-700 mb-1">
                            Hotel Preferido ou Padrão de Hospedagem:
                          </label>
                          <input
                            type="text"
                            value={reqHotelName}
                            onChange={(e) => setReqHotelName(e.target.value)}
                            placeholder="Ex: Ibis, Radisson, Novotel ou próximo ao cliente"
                            className="w-full px-3.5 py-2 rounded-lg border border-slate-300 text-sm"
                          />
                        </div>
                      )}
                    </div>

                    {/* Motivo da Viagem */}
                    <div>
                      <label className="block text-xs font-bold uppercase text-slate-700 mb-1">
                        Motivo / Justificativa da Viagem: *
                      </label>
                      <textarea
                        value={reqReason}
                        onChange={(e) => setReqReason(e.target.value)}
                        placeholder="Ex: Reunião de fechamento de contrato comercial com diretoria do cliente e alinhamento do projeto."
                        rows={3}
                        className="w-full px-3.5 py-2.5 rounded-lg border border-slate-300 text-sm focus:ring-2 focus:ring-slate-900"
                        required
                      />
                    </div>

                    {/* Departamento, Prioridade e Custo Estimado */}
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                      <div>
                        <label className="block text-xs font-bold uppercase text-slate-700 mb-1">
                          Departamento:
                        </label>
                        <select
                          value={reqDepartment}
                          onChange={(e) => setReqDepartment(e.target.value)}
                          className="w-full px-3 py-2 rounded-lg border border-slate-300 text-sm bg-white"
                        >
                          <option value="Comercial">Comercial</option>
                          <option value="TI">TI & Sistemas</option>
                          <option value="Área Técnica">Área Técnica</option>
                          <option value="Diretoria">Diretoria</option>
                          <option value="Financeiro">Financeiro</option>
                        </select>
                      </div>

                      <div>
                        <label className="block text-xs font-bold uppercase text-slate-700 mb-1">
                          Prioridade de Aprovação:
                        </label>
                        <select
                          value={reqPriority}
                          onChange={(e) => setReqPriority(e.target.value as any)}
                          className="w-full px-3 py-2 rounded-lg border border-slate-300 text-sm bg-white font-semibold"
                        >
                          <option value="Baixa">Baixa</option>
                          <option value="Normal">Normal</option>
                          <option value="Alta">Alta</option>
                          <option value="Urgente">Urgente</option>
                        </select>
                      </div>

                      <div>
                        <label className="block text-xs font-bold uppercase text-slate-700 mb-1">
                          Custo Estimado (R$):
                        </label>
                        <div className="relative">
                          <span className="absolute left-3 top-2.5 text-xs font-bold text-slate-400">R$</span>
                          <input
                            type="number"
                            min="0"
                            step="50"
                            value={reqEstimatedCost}
                            onChange={(e) => setReqEstimatedCost(e.target.value)}
                            placeholder="1500"
                            className="w-full pl-9 pr-3 py-2 rounded-lg border border-slate-300 text-sm"
                          />
                        </div>
                      </div>
                    </div>

                    {/* Submit Button */}
                    <div className="pt-4 border-t border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-4">
                      <div className="text-xs text-slate-500 flex items-center gap-1.5">
                        <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />
                        <span>Sua solicitação será salva no banco e gravada na sua dashboard em tempo real.</span>
                      </div>

                      <button
                        type="submit"
                        disabled={isSubmittingReq}
                        className="w-full sm:w-auto px-8 py-3 rounded-xl font-bold text-xs uppercase tracking-wider text-slate-950 bg-amber-400 hover:bg-amber-300 active:scale-98 transition-all shadow-md cursor-pointer flex items-center justify-center gap-2"
                      >
                        {isSubmittingReq ? (
                          <>
                            <RefreshCw className="w-4 h-4 animate-spin" />
                            <span>Gravando Solicitação...</span>
                          </>
                        ) : (
                          <>
                            <span>Enviar Solicitação de Viagem</span>
                            <ArrowRight className="w-4 h-4" />
                          </>
                        )}
                      </button>
                    </div>
                  </form>
                </div>
              )}

            </div>
          )}

        </div>
      </div>
    </div>
  );
};
