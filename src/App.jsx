import React, { useState } from 'react';
import { ThemeProvider } from './context/ThemeContext';
import Header from './components/Header';
import Hero from './components/Hero';
import AboutUs from './components/AboutUs';
import Services from './components/Services';
import ExecutionSection from './components/ExecutionSection';
import StatsSection from './components/StatsSection';
import ExperiencesSection from './components/ExperiencesSection';
import ContactFooter from './components/ContactFooter';
import NetworkBackground from './components/NetworkBackground';
import ScrollToTop from './components/ScrollToTop';
import LMSLayout from './lms/LMSLayout';
import { 
  ContactModal, 
  PlatformModal, 
  SearchModal, 
  ArticleModal 
} from './components/Modals';

function AppContent() {
  const [isContactOpen, setIsContactOpen] = useState(false);
  const [isPlatformOpen, setIsPlatformOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [selectedArticle, setSelectedArticle] = useState(null);
  const [selectedCourse, setSelectedCourse] = useState('');
  
  // Estado de usuario autenticado en LMS
  const [currentLMSUser, setCurrentLMSUser] = useState(null);

  const handleOpenContactWithCourse = (courseName) => {
    setSelectedCourse(courseName || '');
    setIsContactOpen(true);
  };

  const handleLearnMore = () => {
    const servicesElement = document.getElementById('servicios');
    if (servicesElement) {
      servicesElement.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleLoginSuccess = (userData) => {
    setCurrentLMSUser(userData);
  };

  // Si el usuario está autenticado en la plataforma virtual, mostramos el LMS Layout completo
  if (currentLMSUser) {
    return (
      <LMSLayout
        currentUser={currentLMSUser}
        onLogout={() => setCurrentLMSUser(null)}
        onReturnHome={() => setCurrentLMSUser(null)}
      />
    );
  }

  return (
    <div className="relative min-h-screen bg-[#18191c] text-white flex flex-col selection:bg-[#00c2b2] selection:text-white transition-colors duration-300">
      
      {/* Dynamic Network Node Canvas Background */}
      <NetworkBackground />

      {/* 1. Header (Sticky Top Bar + Main Navigation with react-scroll + Theme Switcher) */}
      <Header 
        onOpenPlatform={() => setIsPlatformOpen(true)}
        onOpenSearch={() => setIsSearchOpen(true)}
      />

      {/* Main Page Layout */}
      <main className="flex-grow relative z-10">
        
        {/* Section #inicio (Hero) */}
        <Hero 
          onOpenContact={() => handleOpenContactWithCourse('')}
        />

        {/* Section #quienes-somos (About Us: Misión, Visión, Valores) */}
        <AboutUs />

        {/* Section #servicios (Programas de Formación, Cursos & Tramos Franquicia SENCE) */}
        <Services 
          onSelectCourse={(course) => handleOpenContactWithCourse(course)}
        />

        {/* Execution Section (Cyan Checkmarks, Action, and Promo Image) */}
        <ExecutionSection 
          onLearnMore={handleLearnMore}
        />

        {/* Stats Section (Light Contrast 4 Indicators) */}
        <StatsSection />

        {/* Experiences Section (3 Blog/News Cards) */}
        <ExperiencesSection 
          onReadArticle={(article) => setSelectedArticle(article)}
        />

      </main>

      {/* Section #contacto & Footer */}
      <ContactFooter 
        onOpenContactModal={() => handleOpenContactWithCourse('')}
      />

      {/* Floating Scroll To Top Button */}
      <ScrollToTop />

      {/* Interactive Modals */}
      <ContactModal 
        isOpen={isContactOpen} 
        onClose={() => setIsContactOpen(false)}
        defaultCourse={selectedCourse}
      />

      <PlatformModal 
        isOpen={isPlatformOpen} 
        onClose={() => setIsPlatformOpen(false)}
        onLoginSuccess={handleLoginSuccess}
      />

      <SearchModal 
        isOpen={isSearchOpen} 
        onClose={() => setIsSearchOpen(false)}
        onSelectCourse={(course) => handleOpenContactWithCourse(course)}
      />

      <ArticleModal 
        article={selectedArticle} 
        onClose={() => setSelectedArticle(null)}
        onOpenContact={() => handleOpenContactWithCourse(selectedArticle?.category || '')}
      />

    </div>
  );
}

function App() {
  return (
    <ThemeProvider>
      <AppContent />
    </ThemeProvider>
  );
}

export default App;
