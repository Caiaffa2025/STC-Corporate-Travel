import { 
  collection, 
  doc, 
  setDoc, 
  getDoc, 
  getDocs, 
  query, 
  where,
  limit 
} from 'firebase/firestore';
import { db } from './firebase';
import { COMPANY_CONFIG } from '../config/company';
import { DEFAULT_IMAGES } from '../assets/images';

export interface LandingPageData {
  brandName: string;
  tagline: string;
  heroHeadline: string;
  heroSubtitle: string;
  heroManifesto: string;
  whatsappNumber: string;
  whatsappDisplay: string;
  email: string;
  phoneDisplay: string;
  // Imagens configuráveis com garantia de exibição em produção
  heroImageUrl?: string;
  aircraftImageUrl?: string;
  hotelSuiteImageUrl?: string;
  vipLoungeImageUrl?: string;
  meetingImageUrl?: string;
  hotelTravelerImageUrl?: string;
  // Marca d'água de aeronave em cor bem clarinha no fundo da landing page
  aircraftWatermarkEnabled?: boolean;
  aircraftWatermarkIntensity?: 'ultra-light' | 'light' | 'medium';
  updatedAt?: string;
}

export interface PageChangeRecord {
  id: string;
  title: string;
  description: string;
  savedAt: string;
  changedFields?: string[];
}

export interface StoredLead {
  id: string;
  name: string;
  company: string;
  role: string;
  email: string;
  phone: string;
  cityState: string;
  monthlyTrips: string;
  needs: string[];
  challenges?: string;
  planInterest?: string;
  createdAt: string;
}

// ==========================================
// MODELOS PARA FUNCIONÁRIOS E SOLICITAÇÕES
// ==========================================

export interface Employee {
  id: string;
  name: string;
  email: string;
  department: string; // Comercial, TI, Área Técnica, Diretoria, Financeiro
  role: string;
  password?: string;
  createdAt: string;
}

export type TravelRequestType = 'flight' | 'hotel' | 'flight_and_hotel';
export type TravelStatus = 'Pendente' | 'Aprovado' | 'Rejeitado' | 'Concluído' | 'Cancelado';
export type TravelPriority = 'Baixa' | 'Normal' | 'Alta' | 'Urgente';

export interface TravelRequest {
  id: string; // Ex: STC-8429
  employeeId: string;
  employeeName: string;
  department: string;
  type: TravelRequestType;
  title: string;
  origin?: string;
  destination: string;
  departureDate: string;
  departureTime?: string;
  returnDate?: string;
  returnTime?: string;
  flightClass?: 'Econômica' | 'Executiva';
  hotelName?: string;
  hotelCheckIn?: string;
  hotelCheckOut?: string;
  reason: string; // Motivo da viagem
  priority: TravelPriority;
  estimatedCost: number; // Custo estimado informado pelo funcionário
  approvedCost?: number; // Custo aprovado pelo gestor
  status: TravelStatus; // Pendente, Aprovado, Rejeitado, Concluído, Cancelado
  managerNotes?: string; // Justificativa / observação do gestor
  createdAt: string;
  updatedAt: string;
}

export const INITIAL_LANDING_DATA: LandingPageData = {
  brandName: COMPANY_CONFIG.brandName,
  tagline: COMPANY_CONFIG.brandTagline,
  heroHeadline: 'Sua empresa viaja. Nós cuidamos de toda a gestão.',
  heroSubtitle: 'Tecnologia, organização e gestão especializada para empresas que precisam viajar.',
  heroManifesto: 'Assumimos a gestão das viagens corporativas da sua empresa, desde a solicitação até a reserva, administração e controle financeiro. Tudo centralizado em uma plataforma exclusiva PARA CADA EMPRESA, com acompanhamento e transparência.',
  whatsappNumber: COMPANY_CONFIG.whatsappNumber,
  whatsappDisplay: COMPANY_CONFIG.whatsappDisplay,
  email: COMPANY_CONFIG.email,
  phoneDisplay: COMPANY_CONFIG.phoneDisplay,
  heroImageUrl: DEFAULT_IMAGES.heroAirport,
  aircraftImageUrl: DEFAULT_IMAGES.jetAircraft,
  hotelSuiteImageUrl: DEFAULT_IMAGES.hotelSuite,
  vipLoungeImageUrl: DEFAULT_IMAGES.vipLounge,
  meetingImageUrl: DEFAULT_IMAGES.businessMeeting,
  hotelTravelerImageUrl: DEFAULT_IMAGES.hotelTraveler,
  aircraftWatermarkEnabled: true,
  aircraftWatermarkIntensity: 'light',
};

// Funcionários padrão pré-cadastrados para teste imediato
export const DEFAULT_EMPLOYEES: Employee[] = [
  {
    id: 'emp-mariana',
    name: 'Mariana Costa',
    email: 'mariana.costa@empresa.com.br',
    department: 'Comercial',
    role: 'Gerente Comercial',
    password: '123',
    createdAt: new Date().toISOString(),
  },
  {
    id: 'emp-carlos',
    name: 'Carlos Silva',
    email: 'carlos.silva@empresa.com.br',
    department: 'TI',
    role: 'Líder Técnico de Sistemas',
    password: '123',
    createdAt: new Date().toISOString(),
  },
  {
    id: 'emp-roberto',
    name: 'Roberto Mendes',
    email: 'roberto.mendes@empresa.com.br',
    department: 'Área Técnica',
    role: 'Engenheiro de Campo',
    password: '123',
    createdAt: new Date().toISOString(),
  },
  {
    id: 'emp-beatriz',
    name: 'Beatriz Fernandes',
    email: 'beatriz.fernandes@empresa.com.br',
    department: 'Diretoria',
    role: 'Diretora de Operações',
    password: '123',
    createdAt: new Date().toISOString(),
  },
];

// Solicitações iniciais para demonstração realista do Dashboard
export const INITIAL_TRAVEL_REQUESTS: TravelRequest[] = [
  {
    id: 'STC-7412',
    employeeId: 'emp-mariana',
    employeeName: 'Mariana Costa',
    department: 'Comercial',
    type: 'flight_and_hotel',
    title: 'Fechamento de Contrato & Reunião com Cliente Regional',
    origin: 'São Paulo (CGH)',
    destination: 'Curitiba (CWB)',
    departureDate: '2026-11-10',
    departureTime: '08:30',
    returnDate: '2026-11-12',
    returnTime: '19:40',
    flightClass: 'Econômica',
    hotelName: 'Hotel Radisson Curitiba Batel',
    hotelCheckIn: '2026-11-10',
    hotelCheckOut: '2026-11-12',
    reason: 'Negociação presencial e assinatura de contrato com a diretoria do cliente.',
    priority: 'Normal',
    estimatedCost: 1850,
    approvedCost: 1620,
    status: 'Aprovado',
    managerNotes: 'Aprovado dentro da política de viagens. Tarifa com antecedência homologada.',
    createdAt: '2026-10-28T14:30:00.000Z',
    updatedAt: '2026-10-29T09:15:00.000Z',
  },
  {
    id: 'STC-8591',
    employeeId: 'emp-mariana',
    employeeName: 'Mariana Costa',
    department: 'Comercial',
    type: 'flight',
    title: 'Visita Comercial a Novos Leads e Prospecção',
    origin: 'São Paulo (GRU)',
    destination: 'Belo Horizonte (CNF)',
    departureDate: '2026-11-20',
    departureTime: '07:15',
    returnDate: '2026-11-21',
    returnTime: '20:10',
    flightClass: 'Econômica',
    reason: 'Rodada de demonstrações da plataforma para três empresas de grande porte.',
    priority: 'Alta',
    estimatedCost: 890,
    status: 'Pendente',
    createdAt: '2026-10-31T08:00:00.000Z',
    updatedAt: '2026-10-31T08:00:00.000Z',
  },
  {
    id: 'STC-6320',
    employeeId: 'emp-carlos',
    employeeName: 'Carlos Silva',
    department: 'TI',
    type: 'flight_and_hotel',
    title: 'Implantação de Servidores e Integração de API',
    origin: 'São Paulo (CGH)',
    destination: 'Rio de Janeiro (SDU)',
    departureDate: '2026-10-14',
    departureTime: '09:00',
    returnDate: '2026-10-16',
    returnTime: '18:00',
    flightClass: 'Econômica',
    hotelName: 'Novotel Porto Atlântico',
    hotelCheckIn: '2026-10-14',
    hotelCheckOut: '2026-10-16',
    reason: 'Configuração do ambiente de banco de dados e testes de carga presenciais.',
    priority: 'Urgente',
    estimatedCost: 2100,
    approvedCost: 1980,
    status: 'Concluído',
    managerNotes: 'Viagem finalizada com êxito. Comprovantes arquivados no financeiro.',
    createdAt: '2026-10-10T10:00:00.000Z',
    updatedAt: '2026-10-17T11:00:00.000Z',
  },
  {
    id: 'STC-9104',
    employeeId: 'emp-roberto',
    employeeName: 'Roberto Mendes',
    department: 'Área Técnica',
    type: 'hotel',
    title: 'Manutenção Preventiva de Equipamentos Industriais',
    destination: 'Campinas (SP)',
    departureDate: '2026-11-05',
    returnDate: '2026-11-07',
    hotelName: 'Meliá Campinas Hotel',
    hotelCheckIn: '2026-11-05',
    hotelCheckOut: '2026-11-07',
    reason: 'Atendimento técnico programado na fábrica do cliente.',
    priority: 'Normal',
    estimatedCost: 740,
    status: 'Pendente',
    createdAt: '2026-10-30T16:20:00.000Z',
    updatedAt: '2026-10-30T16:20:00.000Z',
  },
];

const CONFIG_DOC_ID = 'current_settings';
const LOCAL_STORAGE_EMPLOYEES_KEY = 'stc_employees_cache';
const LOCAL_STORAGE_REQUESTS_KEY = 'stc_travel_requests_cache';

/**
 * Carrega a configuração da Landing Page do Firestore
 */
export async function getLandingConfig(): Promise<LandingPageData> {
  try {
    const docRef = doc(db, 'landing_config', CONFIG_DOC_ID);
    const snap = await getDoc(docRef);
    if (snap.exists()) {
      return { ...INITIAL_LANDING_DATA, ...(snap.data() as LandingPageData) };
    }
  } catch (err) {
    console.warn('[DB] Fallback para configurações locais:', err);
  }
  return INITIAL_LANDING_DATA;
}

/**
 * Salva as alterações da Landing Page no banco de dados Firestore
 */
export async function saveLandingConfig(
  newData: Partial<LandingPageData>,
  changeSummary = 'Atualização geral de conteúdo e contatos'
): Promise<{ success: boolean; changeId: string }> {
  const changeId = `CHG-${Date.now().toString(36).toUpperCase()}`;
  const now = new Date().toISOString();

  const mergedData: LandingPageData = {
    ...INITIAL_LANDING_DATA,
    ...newData,
    updatedAt: now,
  };

  try {
    // 1. Salva configuração ativa
    const docRef = doc(db, 'landing_config', CONFIG_DOC_ID);
    await setDoc(docRef, mergedData, { merge: true });

    // 2. Registra histórico da alteração
    const changeRef = doc(db, 'page_changes', changeId);
    await setDoc(changeRef, {
      id: changeId,
      title: changeSummary,
      description: `Alteração salva no banco de dados Firestore em ${new Date().toLocaleString('pt-BR')}`,
      savedAt: now,
      changedFields: Object.keys(newData),
    });

    return { success: true, changeId };
  } catch (err) {
    console.error('[DB] Erro ao salvar configuração:', err);
    throw err;
  }
}

/**
 * Busca histórico de alterações salvas
 */
export async function getChangesHistory(): Promise<PageChangeRecord[]> {
  try {
    const q = query(collection(db, 'page_changes'), limit(25));
    const snap = await getDocs(q);
    const records: PageChangeRecord[] = [];
    snap.forEach((d) => records.push(d.data() as PageChangeRecord));
    return records.sort((a, b) => new Date(b.savedAt).getTime() - new Date(a.savedAt).getTime());
  } catch (err) {
    console.warn('[DB] Erro ao buscar histórico:', err);
    return [];
  }
}

/**
 * Salva lead no banco de dados Firestore
 */
export async function saveLeadToFirestore(lead: StoredLead): Promise<void> {
  try {
    const leadRef = doc(db, 'leads', lead.id);
    await setDoc(leadRef, lead);
  } catch (err) {
    console.warn('[DB] Erro ao salvar lead no Firestore:', err);
  }
}

/**
 * Busca todos os leads registrados
 */
export async function getAllLeadsFromFirestore(): Promise<StoredLead[]> {
  try {
    const q = query(collection(db, 'leads'), limit(50));
    const snap = await getDocs(q);
    const leads: StoredLead[] = [];
    snap.forEach((d) => leads.push(d.data() as StoredLead));
    return leads.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
  } catch (err) {
    console.warn('[DB] Erro ao buscar leads:', err);
    return [];
  }
}

// ==========================================
// SERVIÇOS DE FUNCIONÁRIOS (EMPLOYEES)
// ==========================================

export async function getRegisteredEmployees(): Promise<Employee[]> {
  try {
    const snap = await getDocs(collection(db, 'employees'));
    if (!snap.empty) {
      const list: Employee[] = [];
      snap.forEach((d) => list.push(d.data() as Employee));
      localStorage.setItem(LOCAL_STORAGE_EMPLOYEES_KEY, JSON.stringify(list));
      return list;
    }
  } catch (err) {
    console.warn('[DB] Usando cache local de funcionários:', err);
  }

  // Fallback para cache local ou lista padrão
  const cached = localStorage.getItem(LOCAL_STORAGE_EMPLOYEES_KEY);
  if (cached) {
    try {
      return JSON.parse(cached);
    } catch {
      // ignore
    }
  }

  // Inicializa com funcionários padrão
  localStorage.setItem(LOCAL_STORAGE_EMPLOYEES_KEY, JSON.stringify(DEFAULT_EMPLOYEES));
  return DEFAULT_EMPLOYEES;
}

export async function saveEmployee(employee: Employee): Promise<void> {
  try {
    const empRef = doc(db, 'employees', employee.id);
    await setDoc(empRef, employee);
  } catch (err) {
    console.warn('[DB] Falha ao salvar funcionário no Firestore, persistindo localmente:', err);
  }

  // Atualiza cache local
  const current = await getRegisteredEmployees();
  const index = current.findIndex((e) => e.id === employee.id);
  if (index >= 0) {
    current[index] = employee;
  } else {
    current.push(employee);
  }
  localStorage.setItem(LOCAL_STORAGE_EMPLOYEES_KEY, JSON.stringify(current));
}

// ==========================================
// SERVIÇOS DE SOLICITAÇÕES (TRAVEL REQUESTS)
// ==========================================

export async function getAllTravelRequests(): Promise<TravelRequest[]> {
  try {
    const snap = await getDocs(collection(db, 'travel_requests'));
    if (!snap.empty) {
      const list: TravelRequest[] = [];
      snap.forEach((d) => list.push(d.data() as TravelRequest));
      list.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
      localStorage.setItem(LOCAL_STORAGE_REQUESTS_KEY, JSON.stringify(list));
      return list;
    }
  } catch (err) {
    console.warn('[DB] Usando cache local de solicitações:', err);
  }

  const cached = localStorage.getItem(LOCAL_STORAGE_REQUESTS_KEY);
  if (cached) {
    try {
      return JSON.parse(cached);
    } catch {
      // ignore
    }
  }

  // Inicializa dados de demonstração
  localStorage.setItem(LOCAL_STORAGE_REQUESTS_KEY, JSON.stringify(INITIAL_TRAVEL_REQUESTS));
  return INITIAL_TRAVEL_REQUESTS;
}

export async function getEmployeeTravelRequests(employeeId: string, employeeName?: string): Promise<TravelRequest[]> {
  const all = await getAllTravelRequests();
  return all.filter((r) => {
    if (r.employeeId && r.employeeId === employeeId) return true;
    if (employeeName && r.employeeName.toLowerCase() === employeeName.toLowerCase()) return true;
    return false;
  });
}

export async function saveTravelRequest(request: TravelRequest): Promise<void> {
  try {
    const reqRef = doc(db, 'travel_requests', request.id);
    await setDoc(reqRef, request);
  } catch (err) {
    console.warn('[DB] Falha ao salvar solicitação no Firestore, salvando localmente:', err);
  }

  // Atualiza cache local
  const all = await getAllTravelRequests();
  const index = all.findIndex((r) => r.id === request.id);
  if (index >= 0) {
    all[index] = request;
  } else {
    all.unshift(request);
  }
  localStorage.setItem(LOCAL_STORAGE_REQUESTS_KEY, JSON.stringify(all));
}

export async function updateTravelRequestStatus(
  requestId: string,
  status: TravelStatus,
  approvedCost?: number,
  managerNotes?: string
): Promise<void> {
  const all = await getAllTravelRequests();
  const index = all.findIndex((r) => r.id === requestId);
  if (index >= 0) {
    const updated: TravelRequest = {
      ...all[index],
      status,
      approvedCost: approvedCost !== undefined ? approvedCost : all[index].approvedCost,
      managerNotes: managerNotes !== undefined ? managerNotes : all[index].managerNotes,
      updatedAt: new Date().toISOString(),
    };
    all[index] = updated;
    localStorage.setItem(LOCAL_STORAGE_REQUESTS_KEY, JSON.stringify(all));

    try {
      const reqRef = doc(db, 'travel_requests', requestId);
      await setDoc(reqRef, updated, { merge: true });
    } catch (err) {
      console.warn('[DB] Falha ao atualizar solicitação no Firestore:', err);
    }
  }
}
