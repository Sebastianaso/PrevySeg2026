import React, { useState, useRef, useEffect } from 'react';
import { 
  PieChart, 
  BarChart3, 
  SlidersHorizontal, 
  Star,
  ArrowRight
} from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const AboutUs = () => {
  const sectionRef = useRef(null);
  const scrollRef = useRef(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [hoveredCard, setHoveredCard] = useState(null);

  const cards = [
    {
      title: 'Misión',
      icon: PieChart,
      color: '#0A4DA2',
      lightBg: 'rgba(10, 77, 162, 0.04)',
      stat: '+15 Años',
      statLabel: 'Trayectoria',
      text: 'Formar y capacitar integralmente a profesionales de seguridad privada con los más altos estándares técnicos y éticos, brindando herramientas que aseguren un desempeño eficiente y comprometido con la ley.'
    },
    {
      title: 'Visión',
      icon: BarChart3,
      color: '#00A896',
      lightBg: 'rgba(0, 168, 150, 0.04)',
      stat: '98%',
      statLabel: 'Aprobación',
      text: 'Ser el Organismo Técnico de Capacitación líder y de referencia en Arica y la Región Norte, reconocidos por la excelencia pedagógica, tecnología aplicada y alta empleabilidad de nuestros alumnos.'
    },
    {
      title: 'Valores',
      icon: SlidersHorizontal,
      color: '#F2A900',
      lightBg: 'rgba(242, 169, 0, 0.04)',
      stat: '100%',
      statLabel: 'Legalidad',
      text: 'Compromiso con la legalidad, integridad, disciplina, vocación de servicio y constante actualización profesional como pilares fundamentales en cada programa de instrucción.'
    },
  ];

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Header entrance animation
      gsap.fromTo('.about-title',
        { opacity: 0, y: 40 },
        { 
          opacity: 1, y: 0, duration: 0.8, ease: 'power3.out',
          scrollTrigger: { trigger: '.about-title', start: 'top 85%', once: true }
        }
      );

      // Staggered cards entrance
      gsap.fromTo('.about-card',
        { opacity: 0, y: 50, scale: 0.95 },
        { 
          opacity: 1, y: 0, scale: 1, duration: 0.7, stagger: 0.15, ease: 'power3.out',
          scrollTrigger: { trigger: '.about-cards-container', start: 'top 80%', once: true }
        }
      );

      // Connecting line animation
      gsap.fromTo('.about-line',
        { scaleX: 0 },
        { 
          scaleX: 1, duration: 1, ease: 'power2.out',
          scrollTrigger: { trigger: '.about-line', start: 'top 85%', once: true }
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const handleScroll = () => {
    if (scrollRef.current) {
      const scrollLeft = scrollRef.current.scrollLeft;
      const cardWidth = scrollRef.current.offsetWidth * 0.85;
      const index = Math.round(scrollLeft / cardWidth);
      setActiveIndex(Math.min(Math.max(index, 0), cards.length - 1));
    }
  };

  const scrollToCard = (index) => {
    if (scrollRef.current) {
      const cardWidth = scrollRef.current.offsetWidth * 0.85;
      scrollRef.current.scrollTo({
        left: index * cardWidth,
        behavior: 'smooth'
      });
      setActiveIndex(index);
    }
  };

  return (
    <section 
      ref={sectionRef}
      id="quienes-somos" 
      className="relative py-28 px-4 sm:px-8 bg-white overflow-hidden border-t border-slate-100"
    >
      {/* Decorative background elements */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-slate-200 to-transparent" />
      <div className="absolute top-20 right-[5%] w-[400px] h-[400px] bg-sky-500/5 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute bottom-20 left-[5%] w-[300px] h-[300px] bg-teal-500/5 rounded-full blur-[100px] pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10">

        {/* Section Header */}
        <div className="about-title text-center max-w-2xl mx-auto mb-20 space-y-4">
          <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-sky-50 text-[#0284c7] text-xs font-bold tracking-widest uppercase border border-sky-100 shadow-sm">
            <Star size={12} className="fill-[#0284c7]" />
            Nuestra Identidad Institucional
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 tracking-tight">
            Pilares de{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#0284c7] to-[#00c2b2]">
              PrevySeg
            </span>
          </h2>
          <p className="text-slate-500 text-base sm:text-lg max-w-lg mx-auto leading-relaxed">
            Más de 15 años formando profesionales de excelencia en seguridad privada y oficios industriales.
          </p>
        </div>

        {/* Decorative connecting line (Desktop) */}
        <div className="about-line relative mb-16 hidden md:block origin-left">
          <div className="absolute top-1/2 left-[8%] right-[8%] h-[2px] bg-gradient-to-r from-[#0A4DA2] via-[#00A896] to-[#F2A900] -translate-y-1/2 rounded-full" />
          <div className="relative flex justify-around items-center max-w-5xl mx-auto">
            {cards.map((card, idx) => (
              <div 
                key={idx}
                className="relative bg-white p-3 rounded-full shadow-lg border-2 transition-all duration-300"
                style={{ borderColor: card.color }}
              >
                <div 
                  className="w-3 h-3 rounded-full"
                  style={{ backgroundColor: card.color }}
                />
              </div>
            ))}
          </div>
        </div>

        {/* Cards Container */}
        <div 
          ref={scrollRef}
          onScroll={handleScroll}
          className="about-cards-container flex md:grid md:grid-cols-3 flex-nowrap md:flex-wrap overflow-x-auto md:overflow-visible snap-x snap-mandatory scroll-smooth gap-6 lg:gap-8 pb-6 md:pb-0 px-4 md:px-0 -mx-4 md:mx-0 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]"
        >
          {cards.map((card, index) => {
            const IconComp = card.icon;
            const isHovered = hoveredCard === index;
            return (
              <div 
                key={card.title}
                className="about-card w-[85vw] sm:w-[70vw] md:w-auto flex-shrink-0 md:flex-shrink snap-center"
                onMouseEnter={() => setHoveredCard(index)}
                onMouseLeave={() => setHoveredCard(null)}
              >
                <div 
                  className="relative flex flex-col items-center text-center p-8 lg:p-10 rounded-3xl border-2 transition-all duration-500 cursor-pointer group overflow-hidden h-full"
                  style={{
                    borderColor: isHovered ? card.color : '#e2e8f0',
                    backgroundColor: isHovered ? card.lightBg : '#ffffff',
                    boxShadow: isHovered
                      ? `0 20px 40px -12px ${card.color}25, 0 0 0 1px ${card.color}20`
                      : '0 4px 6px -1px rgba(0,0,0,0.04)',
                    transform: isHovered ? 'translateY(-8px)' : 'translateY(0)',
                  }}
                >
                  {/* Top accent line */}
                  <div 
                    className="absolute top-0 left-1/2 -translate-x-1/2 h-1 rounded-b-full transition-all duration-500"
                    style={{ 
                      backgroundColor: card.color,
                      width: isHovered ? '60%' : '0%',
                    }}
                  />

                  {/* Icon Container */}
                  <div 
                    className="w-20 h-20 rounded-2xl flex items-center justify-center mb-6 transition-all duration-500 relative"
                    style={{ 
                      backgroundColor: `${card.color}15`,
                      transform: isHovered ? 'scale(1.1) rotate(-3deg)' : 'scale(1)',
                    }}
                  >
                    <IconComp 
                      size={36} 
                      style={{ color: card.color }}
                      className="transition-all duration-300"
                    />
                  </div>

                  {/* Title */}
                  <h3 
                    className="text-2xl font-bold mb-3 tracking-wide transition-colors duration-300"
                    style={{ color: isHovered ? card.color : '#0f172a' }}
                  >
                    {card.title}
                  </h3>

                  {/* Stat badge */}
                  <div 
                    className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold mb-4 transition-all duration-300"
                    style={{
                      backgroundColor: `${card.color}15`,
                      color: card.color,
                    }}
                  >
                    <span className="text-sm font-extrabold">{card.stat}</span>
                    <span className="text-[10px] uppercase tracking-wider opacity-70">{card.statLabel}</span>
                  </div>

                  {/* Text */}
                  <p className="text-slate-500 text-sm sm:text-[15px] leading-relaxed max-w-xs">
                    {card.text}
                  </p>

                  {/* Bottom CTA */}
                  <div 
                    className="mt-6 flex items-center gap-1.5 text-xs font-semibold transition-all duration-300"
                    style={{ 
                      color: card.color,
                      opacity: isHovered ? 1 : 0,
                      transform: isHovered ? 'translateY(0)' : 'translateY(8px)',
                    }}
                  >
                    <span>Conocer más</span>
                    <ArrowRight size={13} />
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Indicadores de Paginación para Móviles (Dots) */}
        <div className="flex md:hidden justify-center items-center gap-2 pt-4">
          {cards.map((card, idx) => (
            <button
              key={idx}
              onClick={() => scrollToCard(idx)}
              aria-label={`Ir al pilar ${card.title}`}
              className="h-2 rounded-full transition-all duration-300 cursor-pointer"
              style={{
                width: activeIndex === idx ? '24px' : '8px',
                backgroundColor: activeIndex === idx ? card.color : '#cbd5e1',
              }}
            />
          ))}
        </div>

      </div>
    </section>
  );
};

export default AboutUs;
