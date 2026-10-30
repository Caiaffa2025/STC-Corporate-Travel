/**
 * Configurações comerciais e de contato da empresa.
 * Todos os dados de contato podem ser personalizados facilmente através
 * de variáveis de ambiente ou editando os valores padrão abaixo.
 */

export const COMPANY_CONFIG = {
  brandName: 'STC Corporate Travel',
  brandShort: 'STC',
  brandTagline: 'Gestão inteligente de viagens corporativas',
  
  // Contato comercial
  whatsappNumber: import.meta.env.VITE_WHATSAPP_NUMBER || '5511984937529',
  whatsappDisplay: '(11) 98493-7529',
  email: import.meta.env.VITE_COMPANY_EMAIL || 'scaiaffa2014@gmail.com',
  phoneDisplay: '(11) 98493-7529',
  businessHours: 'Segunda a sexta-feira, das 08h às 19h (Horário de Brasília)',
  supportWindow: 'Suporte emergencial durante o período de viagem contratado',
  
  // Mensagens pré-configuradas para o WhatsApp
  defaultWhatsAppMessage: 'Olá! Gostaria de falar com a equipe da STC Corporate Travel sobre a gestão de viagens da minha empresa.',
  diagnosticWhatsAppMessage: 'Olá! Gostaria de solicitar um diagnóstico gratuito com a STC Corporate Travel.',
};

export function getWhatsAppLink(customMessage?: string, phone = COMPANY_CONFIG.whatsappNumber): string {
  const cleanPhone = phone.replace(/\D/g, '');
  const text = encodeURIComponent(customMessage || COMPANY_CONFIG.defaultWhatsAppMessage);
  return `https://wa.me/${cleanPhone}?text=${text}`;
}
