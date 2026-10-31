import React, { useState, useEffect } from 'react';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { CommercialDifferentialsSection } from './components/CommercialDifferentialsSection';
import { ProblemSection } from './components/ProblemSection';
import { SolutionsSection } from './components/SolutionsSection';
import { HowItWorksSection } from './components/HowItWorksSection';
import { BenefitsSection } from './components/BenefitsSection';
import { TargetAudienceSection } from './components/TargetAudienceSection';
import { TechDifferentiatorSection } from './components/TechDifferentiatorSection';
import { HiringModelSection } from './components/HiringModelSection';
import { LeadCaptureSection } from './components/LeadCaptureSection';
import { FAQSection } from './components/FAQSection';
import { FinalCTASection } from './components/FinalCTASection';
import { Footer } from './components/Footer';
import { FloatingWhatsApp } from './components/FloatingWhatsApp';
import { PrivacyModal } from './components/PrivacyModal';
import { AdminEditorModal } from './components/AdminEditorModal';
import { EmployeePortalModal } from './components/EmployeePortalModal';
import { PlatformAccessSection } from './components/PlatformAccessSection';
import { AircraftBackgroundWatermark } from './components/AircraftBackgroundWatermark';
import { ScrollRevealSection } from './components/ScrollRevealSection';
import { testConnection } from './lib/firebase';
import { getLandingConfig, LandingPageData, INITIAL_LANDING_DATA } from './lib/dbService';

export default function App() {
  const [selectedPlan, setSelectedPlan] = useState<string | undefined>(undefined);
  const [isPrivacyModalOpen, setIsPrivacyModalOpen] = useState(false);
  const [isAdminModalOpen, setIsAdminModalOpen] = useState(false);
  const [isEmployeePortalOpen, setIsEmployeePortalOpen] = useState(false);
  const [landingConfig, setLandingConfig] = useState<LandingPageData>(INITIAL_LANDING_DATA);

  useEffect(() => {
    // 1. Testa a conexão com o banco Firestore
    testConnection();

    // 2. Carrega configurações salvas no banco de dados
    getLandingConfig().then((data) => {
      if (data) {
        setLandingConfig(data);
      }
    });

    // 3. Suporte a link direto do administrador (#admin) e portal (#solicitar-viagem, #portal)
    const handleHash = () => {
      if (window.location.hash === '#admin') {
        setIsAdminModalOpen(true);
      } else if (window.location.hash === '#solicitar-viagem' || window.location.hash === '#portal' || window.location.hash === '#viagem') {
        setIsEmployeePortalOpen(true);
      }
    };
    handleHash();
    window.addEventListener('hashchange', handleHash);
    return () => window.removeEventListener('hashchange', handleHash);
  }, []);

  const handleOpenLeadForm = (planName?: string) => {
    if (planName) {
      setSelectedPlan(planName);
    }
    const contactSection = document.querySelector('#contato');
    if (contactSection) {
      contactSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleSelectService = (serviceName: string) => {
    setSelectedPlan(`Interesse em: ${serviceName}`);
    const contactSection = document.querySelector('#contato');
    if (contactSection) {
      contactSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col font-sans text-slate-800 antialiased selection:bg-amber-100 selection:text-slate-900 relative">
      {/* MARCA D'ÁGUA DE AERONAVE NO FUNDO DA LANDING PAGE (COR BEM CLARINHA) */}
      {landingConfig.aircraftWatermarkEnabled !== false && (
        <AircraftBackgroundWatermark
          aircraftImageUrl={landingConfig.aircraftImageUrl}
          intensity={landingConfig.aircraftWatermarkIntensity || 'light'}
        />
      )}

      {/* SEÇÃO 1: Menu Superior com acesso ao Banco de Dados e Painel Admin */}
      <Header 
        onOpenLeadForm={() => handleOpenLeadForm()} 
        onOpenAdmin={() => setIsAdminModalOpen(true)}
        onOpenEmployeePortal={() => setIsEmployeePortalOpen(true)}
      />

      <main className="flex-grow relative z-10">
        {/* SEÇÃO 2: Hero / Primeira Dobra com Manifesto STC e Imagem configurável */}
        <Hero 
          onOpenLeadForm={() => handleOpenLeadForm()} 
          onOpenEmployeePortal={() => setIsEmployeePortalOpen(true)}
          headline={landingConfig.heroHeadline}
          subtitle={landingConfig.heroSubtitle}
          manifesto={landingConfig.heroManifesto}
          heroImage={landingConfig.heroImageUrl}
        />

        {/* OS 7 DIFERENCIAIS COMERCIAIS DA STC CORPORATE TRAVEL */}
        <ScrollRevealSection>
          <CommercialDifferentialsSection onOpenLeadForm={() => handleOpenLeadForm()} />
        </ScrollRevealSection>

        {/* SEÇÃO 3: O Problema do Cliente */}
        <ScrollRevealSection>
          <ProblemSection />
        </ScrollRevealSection>

        {/* SEÇÃO 4: Apresentação da Solução com Reunião Executiva */}
        <ScrollRevealSection>
          <SolutionsSection 
            onSelectService={handleSelectService} 
            meetingImage={landingConfig.meetingImageUrl}
          />
        </ScrollRevealSection>

        {/* SEÇÃO 5: Como Funciona, Recursos e Status */}
        <ScrollRevealSection>
          <HowItWorksSection />
        </ScrollRevealSection>

        {/* SEÇÃO 5.1: 2 Botões de Acesso - Solicitar Minha Viagem & Administrador */}
        <ScrollRevealSection>
          <PlatformAccessSection 
            onOpenEmployeePortal={() => setIsEmployeePortalOpen(true)}
            onOpenAdmin={() => setIsAdminModalOpen(true)}
          />
        </ScrollRevealSection>

        {/* SEÇÃO 6: Benefícios para a Empresa */}
        <ScrollRevealSection>
          <BenefitsSection />
        </ScrollRevealSection>

        {/* SEÇÃO 7: Para Quem É o Serviço com Imagem de Check-in */}
        <ScrollRevealSection>
          <TargetAudienceSection 
            hotelTravelerImage={landingConfig.hotelTravelerImageUrl}
          />
        </ScrollRevealSection>

        {/* SEÇÃO 8: Diferencial Tecnológico */}
        <ScrollRevealSection>
          <TechDifferentiatorSection />
        </ScrollRevealSection>

        {/* SEÇÃO 9: Modelo de Contratação */}
        <ScrollRevealSection>
          <HiringModelSection onSelectPlan={handleOpenLeadForm} />
        </ScrollRevealSection>

        {/* SEÇÃO 10: Formulário de Captação de Leads */}
        <ScrollRevealSection>
          <LeadCaptureSection 
            selectedPlan={selectedPlan}
            onOpenPrivacyModal={() => setIsPrivacyModalOpen(true)}
          />
        </ScrollRevealSection>

        {/* SEÇÃO 11: Perguntas Frequentes */}
        <ScrollRevealSection>
          <FAQSection />
        </ScrollRevealSection>

        {/* SEÇÃO 12: CTA Final */}
        <ScrollRevealSection>
          <FinalCTASection onOpenLeadForm={() => handleOpenLeadForm()} />
        </ScrollRevealSection>
      </main>

      {/* SEÇÃO 13: Rodapé com link de Gestão do Banco de Dados */}
      <Footer 
        onOpenPrivacyModal={() => setIsPrivacyModalOpen(true)} 
        onOpenAdmin={() => setIsAdminModalOpen(true)}
      />

      {/* Floating Elements & Modals */}
      <FloatingWhatsApp />
      <PrivacyModal 
        isOpen={isPrivacyModalOpen} 
        onClose={() => setIsPrivacyModalOpen(false)} 
      />
      <AdminEditorModal
        isOpen={isAdminModalOpen}
        onClose={() => setIsAdminModalOpen(false)}
        onConfigSaved={(updated) => setLandingConfig(updated)}
      />
      <EmployeePortalModal
        isOpen={isEmployeePortalOpen}
        onClose={() => setIsEmployeePortalOpen(false)}
      />
    </div>
  );
}
