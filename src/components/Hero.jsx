import React, { useEffect, useRef } from 'react';
import { Link as ScrollLink } from 'react-scroll';
import { motion } from 'framer-motion';
import { ArrowRight, ShieldCheck, Award, Sparkles, CheckCircle2 } from 'lucide-react';
import gsap from 'gsap';
import heroImg from '../assets/images/graduacion_prevyseg.png';

const Hero = ({ onOpenContact, onOpenEnrollment }) => {
  const titleRef = useRef(null);
  const descRef = useRef(null);
  const ctaRef = useRef(null);
  const imageCardRef = useRef(null);
  const containerRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });

      // Badge slide in
      tl.fromTo(
        '.hero-badge',
        { opacity: 0, y: -20, scale: 0.9 },
        { opacity: 1, y: 0, scale: 1, duration: 0.4 }
      );

      // Title words stagger with 3D perspective
      if (titleRef.current) {
        const words = titleRef.current.querySelectorAll('.hero-word');
        tl.fromTo(
          words,
          { opacity: 0, y: 35, rotateX: -30 },
          { opacity: 1, y: 0, rotateX: 0, duration: 0.4, stagger: 0.05 },
          '-=0.2'
        );
      }

      // Shimmer gradient text
      tl.fromTo(
        '.hero-gradient-text',
        { backgroundPosition: '100% 0%' },
        { backgroundPosition: '0% 0%', duration: 0.7, ease: 'power2.inOut' },
        '-=0.3'
      );

      // Description fade up
      tl.fromTo(
        descRef.current,
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.5 },
        '-=0.4'
      );

      // Buttons stagger
      tl.fromTo(
        '.hero-cta-btn',
        { opacity: 0, y: 25, scale: 0.95 },
        { opacity: 1, y: 0, scale: 1, duration: 0.4, stagger: 0.1 },
        '-=0.3'
      );

      // Trust badges
      tl.fromTo(
        '.hero-trust-badge',
        { opacity: 0, x: -15 },
        { opacity: 1, x: 0, duration: 0.4, stagger: 0.1 },
        '-=0.2'
      );

      // Image card entrance
      tl.fromTo(
        imageCardRef.current,
        { opacity: 0, scale: 0.92, x: 40 },
        { opacity: 1, scale: 1, x: 0, duration: 0.8, ease: 'power3.out' },
        '-=0.6'
      );

      // Subtle mouse move parallax on image
      const handleMouseMove = (e) => {
        const { clientX, clientY } = e;
        const xPercent = (clientX / window.innerWidth - 0.5) * 2;
        const yPercent = (clientY / window.innerHeight - 0.5) * 2;
        gsap.to(imageCardRef.current, {
          x: xPercent * 10,
          y: yPercent * 10,
          duration: 0.8,
          ease: 'power1.out'
        });
      };

      window.addEventListener('mousemove', handleMouseMove);
      return () => window.removeEventListener('mousemove', handleMouseMove);
    }, containerRef);

    return () => ctx.revert();
  }, []);
  return (
    <section 
      ref={containerRef}
      id="inicio" 
      className="relative min-h-[85vh] flex items-center justify-center py-16 lg:py-24 px-4 sm:px-8 overflow-hidden bg-gradient-to-b from-white via-slate-50 to-white"
    >
      {/* Ambient background glows */}
      <div className="absolute top-1/4 left-10 w-96 h-96 bg-sky-500/10 rounded-full blur-3xl pointer-events-none animate-float" />
      <div className="absolute bottom-10 right-10 w-96 h-96 bg-teal-500/10 rounded-full blur-3xl pointer-events-none animate-float" style={{ animationDelay: '2.5s' }} />

      <div className="max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center relative z-10">
        
        {/* Left Content Column */}
        <div className="lg:col-span-6 flex flex-col justify-center text-left space-y-6">
          
          {/* Badge */}
          <div className="hero-badge inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-sky-50 border border-sky-200 text-sky-800 text-xs font-semibold w-fit shadow-sm">
            <Award size={14} className="text-[#0284c7] animate-pulse" />
            <span>Acreditación Oficial SPD (Prevención del Delito) & SENCE NCh 2728</span>
          </div>

          {/* Main Hero Title */}
          <h1 
            ref={titleRef}
            className="text-4xl sm:text-5xl lg:text-[3.25rem] font-extrabold text-slate-900 leading-tight tracking-tight"
            style={{ perspective: '800px' }}
          >
            <span className="hero-word inline-block">Escuela</span>{' '}
            <span className="hero-word inline-block">de</span>{' '}
            <span className="hero-word inline-block">Seguridad</span>{' '}
            <span className="hero-word inline-block">Privada</span>{' '}
            <span className="hero-word inline-block text-slate-400">&</span>{' '}
            <br className="hidden sm:inline" />
            <span className="hero-word hero-gradient-text inline-block text-transparent bg-clip-text bg-gradient-to-r from-[#0284c7] via-sky-600 to-[#00c2b2] font-black">
              Escuela
            </span>{' '}
            <span className="hero-word hero-gradient-text inline-block text-transparent bg-clip-text bg-gradient-to-r from-[#0284c7] via-sky-600 to-[#00c2b2] font-black">
              de
            </span>{' '}
            <span className="hero-word hero-gradient-text inline-block text-transparent bg-clip-text bg-gradient-to-r from-[#0284c7] via-sky-600 to-[#00c2b2] font-black">
              Oficios
            </span>
          </h1>

          {/* Description */}
          <p 
            ref={descRef}
            className="text-slate-600 text-base sm:text-lg leading-relaxed max-w-xl font-normal"
          >
            <strong className="font-bold text-slate-900">PREVYSEG CAPACITACIONES</strong>, líder en formación acelerada y empleabilidad en la Macro Zona Norte. Capacitación 100% online y semipresencial para <span className="text-[#0284c7] font-semibold">Arica, Iquique, Antofagasta y Calama</span> con credencial oficial SPD y oficios industriales de rápida colocación.
          </p>

          {/* Call to Actions */}
          <div ref={ctaRef} className="flex flex-wrap items-center gap-4 pt-2">
            <ScrollLink
              to="admision"
              spy={true}
              smooth={true}
              offset={-85}
              duration={500}
              onClick={() => window.dispatchEvent(new CustomEvent('open-admission'))}
              className="group hero-cta-btn"
            >
              <button
                className="bg-gradient-to-r from-[#00c2b2] to-teal-500 hover:from-teal-500 hover:to-teal-600 text-white font-black text-sm px-7 py-3.5 rounded-xl shadow-lg shadow-teal-500/20 border border-teal-400 transition-all duration-200 flex items-center gap-2 cursor-pointer hover:scale-105 active:scale-95"
              >
                <Sparkles size={16} />
                <span>Llenar Ficha (Abono 50%)</span>
                <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
              </button>
            </ScrollLink>

            <ScrollLink
              to="servicios"
              spy={true}
              smooth={true}
              offset={-85}
              duration={500}
              className="group hero-cta-btn"
            >
              <button
                className="bg-gradient-to-r from-[#0284c7] to-[#0369a1] hover:from-sky-500 hover:to-sky-700 text-white font-bold text-sm px-6 py-3.5 rounded-xl shadow-lg shadow-sky-500/20 border border-sky-400/30 transition-all duration-200 flex items-center gap-2 cursor-pointer hover:scale-105 active:scale-95"
              >
                <span>Explorar Cursos</span>
              </button>
            </ScrollLink>

            <ScrollLink
              to="contacto"
              spy={true}
              smooth={true}
              offset={-85}
              duration={500}
              className="hero-cta-btn"
            >
              <button
                className="bg-white hover:bg-slate-50 border border-slate-200 hover:border-sky-300 text-slate-700 font-semibold text-sm px-5 py-3.5 rounded-xl transition-all duration-200 cursor-pointer flex items-center gap-2 shadow-sm hover:scale-105 active:scale-95"
              >
                <ShieldCheck size={16} className="text-[#0284c7]" />
                <span>Contacto</span>
              </button>
            </ScrollLink>
          </div>

          {/* Trust badges */}
          <div className="pt-6 border-t border-slate-200 flex flex-wrap items-center gap-6 text-xs text-slate-500 font-medium">
            <div className="hero-trust-badge flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-[#00c2b2] shadow-sm shadow-teal-400 animate-ping" />
              <span className="text-slate-700 font-medium">Credencial SPD Oficial</span>
            </div>
            <div className="hero-trust-badge flex items-center gap-2">
              <CheckCircle2 size={14} className="text-[#0284c7]" />
              <span className="text-slate-700 font-medium">Arica • Iquique • Antofagasta</span>
            </div>
            <div className="hero-trust-badge flex items-center gap-2">
              <Sparkles size={14} className="text-amber-500" />
              <span className="text-slate-700 font-medium">Declaración Jurada en 1 Hoja</span>
            </div>
          </div>
        </div>

        {/* Right Media Column */}
        <div className="lg:col-span-6 flex justify-center lg:justify-end">
          <div ref={imageCardRef} className="relative group w-full max-w-xl hero-image-card">
            {/* Background Glow */}
            <div className="absolute -inset-1.5 bg-gradient-to-r from-[#0284c7] via-cyan-400 to-[#00c2b2] rounded-2xl blur-xl opacity-20 group-hover:opacity-40 transition duration-700"></div>
            
            {/* Main Image Frame */}
            <div className="relative rounded-2xl overflow-hidden border border-slate-200 shadow-2xl bg-white hover:-translate-y-1 transition-transform duration-300">
              <img
                src={heroImg}
                alt="Grupo de egresados y titulados de Prevyseg Capacitaciones"
                className="w-full h-auto object-cover transform group-hover:scale-105 transition duration-700 block"
                loading="eager"
              />
              {/* Badge footer */}
              <div className="bg-white/95 backdrop-blur-md px-4 py-3 border-t border-slate-200 flex items-center justify-between text-xs text-slate-800">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                  <span className="font-semibold text-slate-800">Ceremonia de Certificación y Graduación</span>
                </div>
                <span className="text-[#0284c7] font-extrabold bg-sky-50 px-2.5 py-1 rounded-md border border-sky-200">PrevySeg Arica</span>
              </div>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
};

export default Hero;
