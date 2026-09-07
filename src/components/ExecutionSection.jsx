import React, { useEffect, useRef } from 'react';
import { CheckCircle2, ChevronRight, Award, Zap } from 'lucide-react';
import promoImg from '../assets/images/security_promo.jpg';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const ExecutionSection = ({ onLearnMore }) => {
  const sectionRef = useRef(null);

  const checkmarks = [
    'Instructores certificados con amplia trayectoria en Fuerzas de Orden y Seguridad',
    'Infraestructura moderna con salas equipadas y simuladores de CCTV en tiempo real',
    'Acreditación oficial válida ante la SPD (Subsecretaría de Prevención del Delito) y Autoridad Marítima (Directemar)',
    'Metodología teórico-práctica con enfoque en resolución de conflictos y emergencias',
    'Bolsa de trabajo activa con alta tasa de empleabilidad en empresas de Arica',
    'Asesoría integral en la tramitación y renovación de credenciales profesionales',
  ];

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Badge and Heading animation
      gsap.fromTo('.exec-heading',
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 0.8, ease: 'power3.out', scrollTrigger: { trigger: '.exec-heading', start: 'top 85%', once: true } }
      );

      // Checkmarks stagger animation
      gsap.fromTo('.exec-check',
        { opacity: 0, x: -30, rotateX: 45 },
        { opacity: 1, x: 0, rotateX: 0, duration: 0.6, stagger: 0.1, ease: 'back.out(1.5)', scrollTrigger: { trigger: '.exec-check-container', start: 'top 80%', once: true } }
      );

      // Button animation
      gsap.fromTo('.exec-btn',
        { opacity: 0, scale: 0.8 },
        { opacity: 1, scale: 1, duration: 0.6, ease: 'back.out(1.5)', scrollTrigger: { trigger: '.exec-btn', start: 'top 90%', once: true } }
      );

      // Right image container animation
      gsap.fromTo('.exec-img-container',
        { opacity: 0, scale: 0.9, rotation: -2 },
        { opacity: 1, scale: 1, rotation: 0, duration: 1, ease: 'power3.out', scrollTrigger: { trigger: '.exec-img-container', start: 'top 75%', once: true } }
      );

      // Floating badge animation
      gsap.fromTo('.exec-floating-badge',
        { opacity: 0, y: 50 },
        { opacity: 1, y: 0, duration: 0.8, delay: 0.5, ease: 'elastic.out(1, 0.5)', scrollTrigger: { trigger: '.exec-img-container', start: 'top 75%', once: true } }
      );

      // Floating animation loop for the badge
      gsap.to('.exec-floating-badge', {
        y: -10,
        duration: 2,
        ease: 'sine.inOut',
        yoyo: true,
        repeat: -1,
        delay: 1.5
      });
      
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="py-24 px-4 sm:px-8 bg-white relative overflow-hidden border-t border-slate-100">
      
      {/* Decorative Background Elements */}
      <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-sky-500/5 rounded-full blur-[120px] pointer-events-none -translate-y-1/2 translate-x-1/3" />
      <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-teal-500/5 rounded-full blur-[100px] pointer-events-none translate-y-1/3 -translate-x-1/3" />

      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20 items-center relative z-10">
        
        {/* Left Column: Text & Checkmarks */}
        <div className="lg:col-span-7 space-y-10 text-left">
          
          <div className="exec-heading space-y-5">
            <div className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-sky-50 text-[#0284c7] text-xs font-black tracking-widest uppercase border border-sky-200 shadow-sm">
              <Zap size={14} className="text-amber-500 animate-pulse" />
              <span>Excelencia y Compromiso Formativo</span>
            </div>
            
            <h2 className="text-4xl sm:text-5xl lg:text-[3.5rem] font-extrabold text-slate-900 leading-[1.1] tracking-tight">
              Garantizamos Estándares de <br/>
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#0284c7] to-[#00c2b2] relative">
                Seguridad y Confianza
                <svg className="absolute -bottom-2 left-0 w-full h-3 text-[#00c2b2]/30 opacity-70" viewBox="0 0 200 9" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M2 7C49.5 2 103 -1.5 198 7" stroke="currentColor" strokeWidth="3" strokeLinecap="round"/></svg>
              </span>
            </h2>
            
            <p className="text-slate-500 text-lg sm:text-xl leading-relaxed max-w-2xl font-medium">
              En <strong className="text-[#0284c7] font-black">PrevySeg</strong> formamos guardias y vigilantes con una preparación rigurosa y actualizada conforme a las exigencias normativas vigentes en Chile.
            </p>
          </div>

          {/* Checkmarks List */}
          <div className="exec-check-container grid grid-cols-1 gap-4">
            {checkmarks.map((item, index) => (
              <div 
                key={index}
                className="exec-check flex items-start gap-4 group p-4 rounded-2xl bg-white border border-slate-100 hover:border-sky-200 shadow-sm hover:shadow-xl hover:shadow-sky-500/5 transition-all duration-300 cursor-default"
              >
                <div className="mt-1 flex-shrink-0 w-8 h-8 rounded-full bg-sky-50 flex items-center justify-center group-hover:bg-[#0284c7] group-hover:scale-110 transition-all duration-300">
                  <CheckCircle2 size={18} className="text-[#0284c7] group-hover:text-white transition-colors" />
                </div>
                <p className="text-slate-700 text-base leading-relaxed font-semibold group-hover:text-slate-900 transition-colors">
                  {item}
                </p>
              </div>
            ))}
          </div>

          {/* Action Button */}
          <div className="exec-btn pt-4">
            <button
              onClick={onLearnMore}
              className="group relative inline-flex items-center justify-center gap-3 px-8 py-4 font-bold text-white transition-all duration-300 bg-gradient-to-r from-[#0284c7] to-[#00c2b2] rounded-2xl shadow-xl shadow-sky-500/25 hover:shadow-2xl hover:shadow-teal-500/40 hover:-translate-y-1 overflow-hidden cursor-pointer"
            >
              <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-out" />
              <span className="relative z-10 text-sm tracking-widest uppercase">Conocer Metodología</span>
              <ChevronRight size={20} className="relative z-10 group-hover:translate-x-1.5 transition-transform duration-300" />
            </button>
          </div>
        </div>

        {/* Right Column: Promotional Image with Glassmorphism */}
        <div className="lg:col-span-5 flex justify-center relative">
          <div className="exec-img-container relative w-full max-w-lg aspect-[4/5] rounded-[2.5rem] p-3 bg-white/50 backdrop-blur-sm border border-white/20 shadow-2xl">
            
            {/* Ambient Glow Behind Image */}
            <div className="absolute -inset-4 bg-gradient-to-tr from-[#0284c7]/20 to-[#00c2b2]/20 rounded-[3rem] blur-3xl opacity-50 -z-10" />
            
            {/* Image Wrapper */}
            <div className="relative w-full h-full rounded-[2rem] overflow-hidden border border-slate-200/50 group">
              <img
                src={promoImg}
                alt="Oficial de Seguridad Privada PrevySeg"
                className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-[1.5s] ease-out"
              />
              {/* Overlay Gradient */}
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-slate-950/20 to-transparent opacity-60 group-hover:opacity-40 transition-opacity duration-700" />
            </div>

            {/* Floating Stat Badge */}
            <div className="exec-floating-badge absolute -bottom-8 -left-8 right-8 sm:right-auto sm:w-[320px] bg-white/95 backdrop-blur-2xl p-5 rounded-3xl border-2 border-white shadow-[0_20px_50px_rgba(2,132,199,0.15)] flex items-center gap-5 z-20">
              <div className="relative">
                <div className="absolute inset-0 bg-sky-500/20 animate-ping rounded-xl" />
                <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-[#0284c7] to-[#00c2b2] flex items-center justify-center text-white relative z-10 shadow-lg">
                  <Award size={28} />
                </div>
              </div>
              <div className="flex-1">
                <div className="text-slate-900 font-black text-lg">15+ Años de Liderazgo</div>
                <div className="text-slate-500 text-sm font-medium leading-tight mt-0.5">Formando a los mejores profesionales de Arica</div>
              </div>
            </div>

          </div>
        </div>

      </div>
    </section>
  );
};

export default ExecutionSection;
