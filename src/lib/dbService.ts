import { 
  collection, 
  doc, 
  setDoc, 
  getDoc, 
  getDocs, 
  query, 
  orderBy, 
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
};

const CONFIG_DOC_ID = 'current_settings';

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
