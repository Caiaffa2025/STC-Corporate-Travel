/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

// Importações diretas de assets gerenciadas pelo Vite (garantem inclusão permanente no build de produção)
import heroAirportBundled from './images/hero_executive_airport_1793393036141.jpg';
import jetAircraftBundled from './images/corporate_jet_aircraft_1793395401238.jpg';
import hotelSuiteBundled from './images/luxury_business_hotel_suite_1793395401882.jpg';
import vipLoungeBundled from './images/corporate_vip_airport_lounge_1793395401401.jpg';
import businessMeetingBundled from './images/corporate_business_meeting_1793393036973.jpg';
import hotelTravelerBundled from './images/hotel_business_traveler_1793393037477.jpg';

/**
 * URLs de fallback estáticas servidas a partir de /public/images/
 * Garantem funcionamento imediato mesmo se caminhos dinâmicos forem injetados pelo Firestore.
 */
export const DEFAULT_IMAGES = {
  heroAirport: heroAirportBundled || '/images/hero-airport.jpg',
  jetAircraft: jetAircraftBundled || '/images/jet-aircraft.jpg',
  hotelSuite: hotelSuiteBundled || '/images/hotel-suite.jpg',
  vipLounge: vipLoungeBundled || '/images/vip-lounge.jpg',
  businessMeeting: businessMeetingBundled || '/images/business-meeting.jpg',
  hotelTraveler: hotelTravelerBundled || '/images/hotel-traveler.jpg',
};

/**
 * Catálogo de imagens corporativas de alta resolução disponíveis para o Administrador
 */
export const CORPORATE_IMAGE_CATALOG = [
  {
    key: 'heroImageUrl',
    name: 'Imagem Principal (Hero)',
    section: 'Topo da Landing Page',
    defaultUrl: DEFAULT_IMAGES.heroAirport,
    description: 'Executiva moderna em trânsito com mala de bordo e notebook no terminal',
  },
  {
    key: 'aircraftImageUrl',
    name: 'Logística Aérea & Aeronaves',
    section: 'Galeria Corporativa',
    defaultUrl: DEFAULT_IMAGES.jetAircraft,
    description: 'Aeronave corporativa executiva moderna em pátio de aeroporto sob o pôr do sol',
  },
  {
    key: 'hotelSuiteImageUrl',
    name: 'Hospedagem Corporativa',
    section: 'Galeria Corporativa',
    defaultUrl: DEFAULT_IMAGES.hotelSuite,
    description: 'Suíte executiva contemporânea em hotel 5 estrelas com mesa de trabalho e vista panorâmica',
  },
  {
    key: 'vipLoungeImageUrl',
    name: 'Salas VIP & Aeroportos',
    section: 'Galeria Corporativa',
    defaultUrl: DEFAULT_IMAGES.vipLounge,
    description: 'Sala VIP executiva moderna com poltronas confortáveis e vista ampla para aeronaves',
  },
  {
    key: 'meetingImageUrl',
    name: 'Reunião Executiva & Gestão',
    section: 'Apresentação da Solução',
    defaultUrl: DEFAULT_IMAGES.businessMeeting,
    description: 'Equipe corporativa analisando relatórios e planos de viagem em sala executiva',
  },
  {
    key: 'hotelTravelerImageUrl',
    name: 'Viajante Corporativo & Check-in',
    section: 'Público-Alvo',
    defaultUrl: DEFAULT_IMAGES.hotelTraveler,
    description: 'Executiva em hotel corporativo com mala e suporte ágil',
  },
];
