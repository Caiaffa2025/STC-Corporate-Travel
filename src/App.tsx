import React, { useState } from 'react';
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

export default function App() {
  const [selectedPlan, setSelectedPlan] = useState<string | undefined>(undefined);
  const [isPrivacyModalOpen, setIsPrivacyModalOpen] = useState(false);

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
    <div className="min-h-screen bg-slate-50 flex flex-col font-sans text-slate-800 antialiased selection:bg-amber-100 selection:text-slate-900">
      {/* SEÇÃO 1: Menu Superior */}
      <Header onOpenLeadForm={() => handleOpenLeadForm()} />

      <main className="flex-grow">
        {/* SEÇÃO 2: Hero / Primeira Dobra com Manifesto STC */}
        <Hero onOpenLeadForm={() => handleOpenLeadForm()} />

        {/* OS 7 DIFERENCIAIS COMERCIAIS DA STC CORPORATE TRAVEL */}
        <CommercialDifferentialsSection onOpenLeadForm={() => handleOpenLeadForm()} />

        {/* SEÇÃO 3: O Problema do Cliente */}
        <ProblemSection />

        {/* SEÇÃO 4: Apresentação da Solução */}
        <SolutionsSection onSelectService={handleSelectService} />

        {/* SEÇÃO 5: Como Funciona */}
        <HowItWorksSection />

        {/* SEÇÃO 6: Benefícios para a Empresa */}
        <BenefitsSection />

        {/* SEÇÃO 7: Para Quem É o Serviço */}
        <TargetAudienceSection />

        {/* SEÇÃO 8: Diferencial Tecnológico */}
        <TechDifferentiatorSection />

        {/* SEÇÃO 9: Modelo de Contratação */}
        <HiringModelSection onSelectPlan={handleOpenLeadForm} />

        {/* SEÇÃO 10: Formulário de Captação de Leads */}
        <LeadCaptureSection 
          selectedPlan={selectedPlan}
          onOpenPrivacyModal={() => setIsPrivacyModalOpen(true)}
        />

        {/* SEÇÃO 11: Perguntas Frequentes */}
        <FAQSection />

        {/* SEÇÃO 12: CTA Final */}
        <FinalCTASection onOpenLeadForm={() => handleOpenLeadForm()} />
      </main>

      {/* SEÇÃO 13: Rodapé */}
      <Footer onOpenPrivacyModal={() => setIsPrivacyModalOpen(true)} />

      {/* Floating Elements & Modals */}
      <FloatingWhatsApp />
      <PrivacyModal 
        isOpen={isPrivacyModalOpen} 
        onClose={() => setIsPrivacyModalOpen(false)} 
      />
    </div>
  );
}
