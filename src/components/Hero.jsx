import React, { useEffect, useRef, useState, useCallback } from 'react';
import { Link as ScrollLink } from 'react-scroll';
import { 
  ArrowRight, 
  ShieldCheck, 
  Award, 
  Sparkles, 
  CheckCircle2, 
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  Shield,
  Wrench,
  GraduationCap,
  FileText
} from 'lucide-react';
import gsap from 'gsap';

// Imágenes para el carrusel de fondo según la escuela
import heroImg from '../assets/images/hero_graduation.jpg';
import securityGuards from '../assets/images/security_guards.jpg';
import securitySupervisor from '../assets/images/security_supervisor.jpg';
import cctvOperator from '../assets/images/cctv_operator.jpg';
import securityPromo from '../assets/images/security_promo.jpg';
import portImg from '../assets/images/course_port_security_1788545050484.jpg';
import cyberImg from '../assets/images/course_cybersecurity_1788545064007.jpg';
import agricultureImg from '../assets/images/course_agriculture.jpg';
import aestheticImg from '../assets/images/course_aesthetic.jpg';
import elderlyImg from '../assets/images/course_elderly_care.jpg';
import bankCashierImg from '../assets/images/course_bank_cashier.jpg';
import foodImg from '../assets/images/course_gastronomy.jpg';
import conflictImg from '../assets/images/course_conflict_resolution_1788545038374.jpg';

const SECURITY_SLIDES = [
  { img: securityGuards, title: 'Formación de Guardias de Seguridad (Ley 21.659)', tag: 'Acreditación Oficial SPD' },
  { img: securitySupervisor, title: 'Formación de Vigilantes Privados (Banca y Valores)', tag: 'Alta Seguridad' },
  { img: portImg, title: 'Formación de Seguridad Marítimo Portuaria (Directemar)', tag: 'Código PBIP TPA' },
  { img: cctvOperator, title: 'Operador de CCTV Codificado por SENCE', tag: 'Tecnología & Sistemas' },
  { img: cyberImg, title: 'CCTV y Alarmas de Seguridad Privada', tag: 'Sistemas Electrónicos' },
  { img: heroImg, title: 'Supervisor de Seguridad Privada', tag: 'Liderazgo y Turnos SPD' }
];

const TRADES_SLIDES = [
  { img: conflictImg, title: 'Resolución de Conflictos y Situaciones Difíciles', tag: 'Habilidades Laborales' },
  { img: agricultureImg, title: 'Manejo y Uso de Plaguicidas Agrícolas (Norma SAG)', tag: 'Área Agropecuaria' },
  { img: portImg, title: 'Operaciones Portuarias de Carga, Descarga y Seguridad', tag: 'Logística y Operaciones' },
  { img: foodImg, title: 'Higiene, Seguridad y Manipulación de Alimentos', tag: 'Área Alimentación' },
  { img: aestheticImg, title: 'Técnicas de Depilación, Manicure y Maquillaje Carnaval', tag: 'Estética & Servicios' },
  { img: elderlyImg, title: 'Cuidado Adulto Mayor y Personas Postradas', tag: 'Área de Salud' },
  { img: bankCashierImg, title: 'Cajero Bancario y Administración de Condominios', tag: 'Área Administración' }
];

const Hero = ({ 
  onOpenContact, 
  onOpenEnrollment, 
  onOpenSchoolDetail,
  activeSchool = 'seguridad',
  onSwitchSchool 
}) => {
  const sectionRef = useRef(null);
  const titleRef = useRef(null);
  const descRef = useRef(null);
  const ctaRef = useRef(null);
  const badgesRef = useRef(null);
  const overlayRef = useRef(null);
  
  const [currentBg, setCurrentBg] = useState(0);

  const activeSlides = activeSchool === 'seguridad' ? SECURITY_SLIDES : TRADES_SLIDES;

  // Navegación de slides
  const nextSlide = useCallback(() => {
    setCurrentBg((prev) => (prev + 1) % activeSlides.length);
  }, [activeSlides.length]);

  const prevSlide = useCallback(() => {
    setCurrentBg((prev) => (prev - 1 + activeSlides.length) % activeSlides.length);
  }, [activeSlides.length]);

  // Rotación automática cada 6 segundos
  useEffect(() => {
    const timer = setInterval(() => {
      nextSlide();
    }, 6000);
    return () => clearInterval(timer);
  }, [nextSlide]);

  // Reset slide index al cambiar de escuela
  useEffect(() => {
    setCurrentBg(0);
  }, [activeSchool]);

  // Animaciones de entrada con GSAP
  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });

      tl.fromTo(
        overlayRef.current,
        { opacity: 0 },
        { opacity: 1, duration: 0.4 }
      );

      tl.fromTo(
        '.hero-switcher-box',
        { opacity: 0, y: -20 },
        { opacity: 1, y: 0, duration: 0.4 },
        '-=0.2'
      );

      tl.fromTo(
        '.hero-badge',
        { opacity: 0, y: -15, scale: 0.95 },
        { opacity: 1, y: 0, scale: 1, duration: 0.35 },
        '-=0.15'
      );

      tl.fromTo(
        '.hero-title-text',
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 0.45 },
        '-=0.1'
      );
    }, sectionRef);

    return () => ctx.revert();
  }, [activeSchool]);

  const isSecurity = activeSchool === 'seguridad';

  return (
    <section
      ref={sectionRef}
      id="inicio"
      className="relative min-h-[90vh] lg:min-h-screen flex items-center justify-center overflow-hidden pt-20 pb-16"
      style={{ backgroundColor: '#071626' }}
    >
      {/* Carrusel de Fondo Fotográfico */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        {activeSlides.map((slide, idx) => (
          <div
            key={slide.title}
            className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
              idx === currentBg ? 'opacity-100 scale-100' : 'opacity-0 scale-105'
            }`}
            style={{
              backgroundImage: `url(${slide.img})`,
              backgroundPosition: 'center',
              backgroundSize: 'cover',
              transition: 'opacity 1s ease-in-out, transform 8s ease-out',
            }}
          />
        ))}
      </div>

      {/* Degradado Superpuesto Oficial adaptado a la Escuela */}
      <div
        ref={overlayRef}
        className="absolute inset-0 z-[1] transition-all duration-700"
        style={{
          background: isSecurity
            ? 'linear-gradient(135deg, rgba(7,22,38,0.95) 0%, rgba(10,43,79,0.88) 45%, rgba(10,125,140,0.78) 100%)'
            : 'linear-gradient(135deg, rgba(7,22,38,0.95) 0%, rgba(11,32,50,0.88) 45%, rgba(0,168,150,0.78) 100%)',
        }}
      />

      {/* Malla decorativa sutil */}
      <div
        className="absolute inset-0 z-[2] opacity-[0.04] pointer-events-none"
        style={{
          backgroundImage:
            'linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)',
          backgroundSize: '60px 60px',
        }}
      />

      {/* Flechas de navegación del carrusel */}
      <button
        onClick={prevSlide}
        aria-label="Slide anterior"
        className="hidden md:flex absolute left-4 top-1/2 -translate-y-1/2 z-20 w-11 h-11 rounded-full bg-white/10 hover:bg-white/20 backdrop-blur-md border border-white/20 text-white/80 hover:text-white items-center justify-center transition-all duration-200 cursor-pointer hover:scale-110 active:scale-95 shadow-lg"
      >
        <ChevronLeft size={22} />
      </button>

      <button
        onClick={nextSlide}
        aria-label="Siguiente slide"
        className="hidden md:flex absolute right-4 top-1/2 -translate-y-1/2 z-20 w-11 h-11 rounded-full bg-white/10 hover:bg-white/20 backdrop-blur-md border border-white/20 text-white/80 hover:text-white items-center justify-center transition-all duration-200 cursor-pointer hover:scale-110 active:scale-95 shadow-lg"
      >
        <ChevronRight size={22} />
      </button>

      {/* ========== CONTENIDO PRINCIPAL ========== */}
      <div className="relative z-10 max-w-7xl mx-auto w-full px-4 sm:px-8 py-16 lg:py-24">
        <div className="max-w-3xl">

          {/* =========================================================================
              1. BOTONES INTERCAMBIABLES DE SELECCIÓN DE ESCUELA (SOLICITUD EXPLÍCITA)
          ========================================================================= */}
          <div className="hero-switcher-box mb-6 inline-flex p-1.5 rounded-2xl bg-black/50 backdrop-blur-xl border border-white/25 shadow-2xl gap-1.5">
            
            {/* Botón Escuela de Seguridad */}
            <button
              type="button"
              onClick={() => {
                if (onSwitchSchool) onSwitchSchool('seguridad');
                window.dispatchEvent(new CustomEvent('switch-school', { detail: 'seguridad' }));
              }}
              className={`flex items-center gap-2.5 px-4 sm:px-6 py-2.5 sm:py-3 rounded-xl text-xs sm:text-sm font-black transition-all duration-300 cursor-pointer ${
                isSecurity
                  ? 'bg-gradient-to-r from-[#00C4D8] to-[#0A7D8C] text-[#071626] shadow-xl shadow-[#00C4D8]/30 scale-[1.03] ring-2 ring-white/40'
                  : 'text-white/70 hover:text-white hover:bg-white/10'
              }`}
            >
              <Shield size={18} className={isSecurity ? 'text-[#071626]' : 'text-[#00C4D8]'} />
              <span>Escuela de Seguridad Privada</span>
              <span className={`text-[10px] px-2 py-0.5 rounded-md font-extrabold uppercase ${
                isSecurity ? 'bg-black/20 text-[#071626]' : 'bg-white/10 text-white/60'
              }`}>
                SPD
              </span>
            </button>

            {/* Botón Escuela de Oficios */}
            <button
              type="button"
              onClick={() => {
                if (onSwitchSchool) onSwitchSchool('oficios');
                window.dispatchEvent(new CustomEvent('switch-school', { detail: 'oficios' }));
              }}
              className={`flex items-center gap-2.5 px-4 sm:px-6 py-2.5 sm:py-3 rounded-xl text-xs sm:text-sm font-black transition-all duration-300 cursor-pointer ${
                !isSecurity
                  ? 'bg-gradient-to-r from-[#00FFE0] to-[#00A896] text-[#071626] shadow-xl shadow-[#00FFE0]/30 scale-[1.03] ring-2 ring-white/40'
                  : 'text-white/70 hover:text-white hover:bg-white/10'
              }`}
            >
              <Wrench size={18} className={!isSecurity ? 'text-[#071626]' : 'text-[#00FFE0]'} />
              <span>Escuela de Oficios SENCE</span>
              <span className={`text-[10px] px-2 py-0.5 rounded-md font-extrabold uppercase ${
                !isSecurity ? 'bg-black/20 text-[#071626]' : 'bg-white/10 text-white/60'
              }`}>
                NCh 2728
              </span>
            </button>
          </div>

          {/* Badge Acreditación específico de la Escuela */}
          <div className="hero-badge inline-flex items-center gap-2.5 px-4 py-2 rounded-full bg-white/10 border border-white/20 backdrop-blur-md text-white/90 text-xs font-semibold mb-6 shadow-lg">
            <Award size={15} className={isSecurity ? 'text-[#00C4D8]' : 'text-[#00FFE0]'} />
            <span className="tracking-wide">
              {isSecurity
                ? 'Acreditación Oficial SPD (Prevención del Delito) • Carabineros OS-10 • Ley 21.659'
                : 'Norma Chilena NCh 2728:2015 SGS • Registro SENCE N°A-4721 • Certificación Directa OTEC'}
            </span>
          </div>

          {/* Título Principal de la Escuela Seleccionada */}
          <h1
            ref={titleRef}
            className="hero-title-text text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-black leading-[1.1] tracking-tight mb-6 text-white"
            style={{ textShadow: '0 2px 25px rgba(0,0,0,0.6)' }}
          >
            {isSecurity ? (
              <>
                <span>Escuela de</span>{' '}
                <span 
                  className="text-transparent bg-clip-text"
                  style={{
                    backgroundImage: 'linear-gradient(90deg, #00C4D8, #00FFE0, #00C4D8)',
                  }}
                >
                  Seguridad Privada
                </span>
              </>
            ) : (
              <>
                <span>Escuela de</span>{' '}
                <span 
                  className="text-transparent bg-clip-text"
                  style={{
                    backgroundImage: 'linear-gradient(90deg, #00FFE0, #00A896, #00FFE0)',
                  }}
                >
                  Oficios Industriales
                </span>
              </>
            )}
          </h1>

          {/* Descripción específica de la Escuela */}
          <p
            ref={descRef}
            className="text-white/85 text-base sm:text-lg lg:text-xl leading-relaxed max-w-2xl mb-10"
            style={{ textShadow: '0 1px 8px rgba(0,0,0,0.4)' }}
          >
            {isSecurity ? (
              <>
                <strong className="font-bold text-white">PrevySeg Capacitaciones:</strong> Formación y perfeccionamiento técnico-legal riguroso para Guardias de Seguridad, Vigilantes Privados, Seguridad Portuaria (Directemar) y Supervisores, con preparación de excelencia para el examen oficial de la Autoridad Fiscalizadora.
              </>
            ) : (
              <>
                <strong className="font-bold text-white">PrevySeg Capacitaciones:</strong> Formación en Resolución de Conflictos, Área Agropecuaria (Plaguicidas SAG), Operaciones Portuarias, Manipulación de Alimentos, Estética, Cuidado Adulto Mayor y Cajero Bancario con certificación directa OTEC PrevySeg con validez nacional SENCE.
              </>
            )}
          </p>

          {/* Botones de Acción (Call to Action) */}
          <div ref={ctaRef} className="flex flex-wrap items-center gap-3.5 mb-10">
            
            {/* Botón 1: Ver catálogo de capacitaciones de esta escuela */}
            <ScrollLink 
              to="servicios" 
              spy 
              smooth 
              offset={-80} 
              duration={500}
              className="group"
            >
              <button 
                type="button"
                className={`hero-cta-btn font-black text-sm px-7 py-4 rounded-xl shadow-2xl transition-all duration-300 flex items-center gap-2.5 cursor-pointer hover:scale-[1.03] active:scale-[0.97] ${
                  isSecurity
                    ? 'bg-gradient-to-r from-[#00C4D8] to-[#0A7D8C] text-[#071626] hover:brightness-110 shadow-[#00C4D8]/40'
                    : 'bg-gradient-to-r from-[#00FFE0] to-[#00A896] text-[#071626] hover:brightness-110 shadow-[#00FFE0]/40'
                }`}
              >
                <span>{isSecurity ? 'Ver Capacitaciones de Seguridad' : 'Ver Capacitaciones de Oficios'}</span>
                <ArrowRight size={17} className="group-hover:translate-x-1.5 transition-transform duration-300" />
              </button>
            </ScrollLink>

            {/* Botón 2: Abrir ventana con descripciones y temarios */}
            <button 
              type="button"
              onClick={() => {
                if (onOpenSchoolDetail) onOpenSchoolDetail(activeSchool);
              }}
              className="hero-cta-btn bg-[#071626]/90 hover:bg-[#0B2032] backdrop-blur-md text-white font-bold text-sm px-6 py-4 rounded-xl border border-white/20 transition-all duration-300 flex items-center gap-2 cursor-pointer hover:scale-[1.03] active:scale-[0.97] shadow-lg shadow-[#071626]/50"
            >
              <FileText size={16} className={isSecurity ? 'text-[#00C4D8]' : 'text-[#00FFE0]'} />
              <span>Temarios Oficiales & Requisitos</span>
            </button>
          </div>

          {/* Badges de Confianza / Garantías */}
          <div ref={badgesRef} className="flex flex-wrap items-center gap-6 text-xs text-white/60 font-medium">
            <div className="hero-trust-badge flex items-center gap-2">
              <span className={`w-2 h-2 rounded-full animate-pulse ${isSecurity ? 'bg-[#00C4D8]' : 'bg-[#00FFE0]'}`} />
              <span className="text-white/80">
                {isSecurity ? 'Credencial Oficial SPD' : 'Diploma Directo PrevySeg OTEC'}
              </span>
            </div>
            <div className="hero-trust-badge flex items-center gap-2">
              <CheckCircle2 size={14} className={isSecurity ? 'text-[#00C4D8]' : 'text-[#00FFE0]'} />
              <span className="text-white/80">Arica • Iquique • Antofagasta</span>
            </div>
            <div className="hero-trust-badge flex items-center gap-2">
              <Sparkles size={14} className="text-amber-400" />
              <span className="text-white/80">Abono Inicial 50% para Matrícula</span>
            </div>
          </div>

          {/* Pill informativa del carrusel */}
          <div className="mt-8 inline-flex items-center gap-3 px-3.5 py-1.5 rounded-full bg-black/40 backdrop-blur-md border border-white/10 text-white/70 text-xs">
            <span className={`w-1.5 h-1.5 rounded-full ${isSecurity ? 'bg-[#00C4D8]' : 'bg-[#00FFE0]'}`} />
            <span className="font-semibold text-white/90">
              {String(currentBg + 1).padStart(2, '0')} / {String(activeSlides.length).padStart(2, '0')}
            </span>
            <span className="text-white/40">•</span>
            <span className="text-white/85 truncate max-w-[260px] sm:max-w-md">
              {activeSlides[currentBg].title}
            </span>
          </div>

        </div>
      </div>
    </section>
  );
};

export default Hero;
