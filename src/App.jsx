import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import AboutUs from './components/AboutUs';
import Services from './components/Services';
import AdmissionSection from './components/AdmissionSection';
import ExecutionSection from './components/ExecutionSection';
import StatsSection from './components/StatsSection';
import ExperiencesSection from './components/ExperiencesSection';
import ContactFooter from './components/ContactFooter';
import NetworkBackground from './components/NetworkBackground';
import ScrollToTop from './components/ScrollToTop';
import LMSLayout from './lms/LMSLayout';
import { supabase, logoutUser } from './config/supabase';
import { 
  ContactModal, 
  PlatformModal, 
  SearchModal, 
  ArticleModal, 
  EnrollmentModal 
} from './components/Modals';

function App() {
  const [isContactOpen, setIsContactOpen] = useState(false);
  const [isEnrollmentOpen, setIsEnrollmentOpen] = useState(false);
  const [isPlatformOpen, setIsPlatformOpen] = useState(false);
  const [platformModalMode, setPlatformModalMode] = useState('login');
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [selectedArticle, setSelectedArticle] = useState(null);
  const [selectedCourse, setSelectedCourse] = useState('');
  
  // Estado de usuario autenticado en LMS y pestaña inicial
  const [currentLMSUser, setCurrentLMSUser] = useState(null);
  const [lmsInitialTab, setLmsInitialTab] = useState('area-personal');
  const [authChecking, setAuthChecking] = useState(true);

  // Escuchar y verificar sesión activa en Supabase Auth al cargar
  useEffect(() => {
    let mounted = true;

    async function checkSession() {
      try {
        const { data: { session } } = await supabase.auth.getSession();
        if (session?.user && mounted) {
          const { data: profile } = await supabase
            .from('users')
            .select('*')
            .eq('id', session.user.id)
            .single();

          if (profile && mounted) {
            const enriched = {
              ...profile,
              user: profile.rut,
              cargo: profile.rol === 'ADMIN' 
                ? 'Director Ejecutivo / Administrador OTEC' 
                : profile.rol === 'TEACHER' 
                ? 'Docente Instructor SPD' 
                : 'Estudiante / Alumno Regular',
            };
            setCurrentLMSUser(enriched);
            setLmsInitialTab(profile.rol === 'ADMIN' ? 'ajustes-sitio' : profile.rol === 'TEACHER' ? 'docente-panel' : 'area-personal');
          }
        }
      } catch (err) {
        console.error('Error verificando sesión:', err);
      } finally {
        if (mounted) setAuthChecking(false);
      }
    }

    checkSession();

    const { data: { subscription } } = supabase.auth.onAuthStateChange(async (event, session) => {
      if (event === 'SIGNED_OUT') {
        setCurrentLMSUser(null);
      }
    });

    return () => {
      mounted = false;
      subscription?.unsubscribe();
    };
  }, []);

  const handleOpenContactWithCourse = (courseName) => {
    setSelectedCourse(courseName || '');
    setIsContactOpen(true);
  };

  const handleOpenEnrollmentWithCourse = (courseName) => {
    setSelectedCourse(courseName || '');
    setIsEnrollmentOpen(true);
  };

  const handleOpenPlatform = (mode = 'login') => {
    setPlatformModalMode(mode);
    setIsPlatformOpen(true);
  };

  const handleLearnMore = () => {
    const servicesElement = document.getElementById('servicios');
    if (servicesElement) {
      servicesElement.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleLoginSuccess = (userData, targetTab = 'area-personal') => {
    setCurrentLMSUser(userData);
    setLmsInitialTab(targetTab || (userData.rol === 'ADMIN' ? 'ajustes-sitio' : userData.rol === 'TEACHER' ? 'docente-panel' : 'area-personal'));
  };

  const handleLogout = async () => {
    await logoutUser();
    setCurrentLMSUser(null);
  };

  // Si el usuario está autenticado en la plataforma virtual, mostramos el LMS Layout completo
  if (currentLMSUser) {
    return (
      <LMSLayout
        currentUser={currentLMSUser}
        initialTab={lmsInitialTab}
        onLogout={handleLogout}
        onReturnHome={() => setCurrentLMSUser(null)}
      />
    );
  }

  return (
    <div className="relative min-h-screen bg-slate-50 text-slate-900 flex flex-col selection:bg-[#0284c7] selection:text-white">
      
      {/* Dynamic Network Node Canvas Background */}
      <NetworkBackground />

      {/* 1. Header (Sticky Top Bar + Main Navigation with react-scroll) */}
      <Header 
        onOpenPlatform={() => handleOpenPlatform('login')}
        onOpenSearch={() => setIsSearchOpen(true)}
        onOpenEnrollment={() => handleOpenEnrollmentWithCourse('')}
      />

      {/* Main Page Layout */}
      <main className="flex-grow relative z-10">
        
        {/* Section #inicio (Hero) */}
        <Hero 
          onOpenContact={() => handleOpenContactWithCourse('')}
          onOpenEnrollment={() => handleOpenEnrollmentWithCourse('')}
        />

        {/* Section #quienes-somos (About Us: Misión, Visión, Valores) */}
        <AboutUs />

        {/* Section #servicios (Programas de Formación, Cursos & Tramos Franquicia SENCE) */}
        <Services 
          onSelectCourse={(course) => handleOpenEnrollmentWithCourse(course)}
        />

        {/* Section #admision (Ficha de Inscripción Digital Oficial con Abono 50% y Validación WhatsApp) */}
        <AdmissionSection 
          defaultSelectedCourse={selectedCourse}
          onOpenPlatform={() => handleOpenPlatform('login')}
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
        onOpenEnrollmentModal={() => handleOpenEnrollmentWithCourse('')}
      />

      {/* Floating Scroll To Top Button */}
      <ScrollToTop />

      {/* Interactive Modals */}
      <EnrollmentModal
        isOpen={isEnrollmentOpen}
        onClose={() => setIsEnrollmentOpen(false)}
        defaultCourse={selectedCourse}
      />

      <ContactModal 
        isOpen={isContactOpen} 
        onClose={() => setIsContactOpen(false)}
        defaultCourse={selectedCourse}
      />

      <PlatformModal 
        isOpen={isPlatformOpen} 
        initialMode={platformModalMode}
        onClose={() => setIsPlatformOpen(false)}
        onLoginSuccess={handleLoginSuccess}
      />

      <SearchModal 
        isOpen={isSearchOpen} 
        onClose={() => setIsSearchOpen(false)}
        onSelectCourse={(course) => handleOpenEnrollmentWithCourse(course)}
      />

      <ArticleModal 
        article={selectedArticle} 
        onClose={() => setSelectedArticle(null)}
        onOpenContact={() => handleOpenEnrollmentWithCourse(selectedArticle?.category || '')}
      />

    </div>
  );
}

export default App;
