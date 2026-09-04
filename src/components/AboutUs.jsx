import React, { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  PieChart, 
  BarChart3, 
  SlidersHorizontal, 
  Star 
} from 'lucide-react';

const AboutUs = () => {
  const scrollRef = useRef(null);
  const [activeIndex, setActiveIndex] = useState(0);

  const cards = [
    {
      title: 'Misión',
      icon: PieChart,
      starColor: 'text-[#0284c7] fill-[#0284c7]',
      circleBg: 'bg-[#0284c7]/15 border-2 border-[#0284c7]',
      iconColor: 'text-[#0284c7]',
      shadowHover: 'hover:shadow-sky-500/20 hover:border-sky-500/40',
      text: 'Formar y capacitar integralmente a profesionales de seguridad privada con los más altos estándares técnicos y éticos, brindando herramientas que aseguren un desempeño eficiente y comprometido con la ley.'
    },
    {
      title: 'Visión',
      icon: BarChart3,
      starColor: 'text-[#22c55e] fill-[#22c55e]',
      circleBg: 'bg-[#22c55e]/15 border-2 border-[#22c55e]',
      iconColor: 'text-[#22c55e]',
      shadowHover: 'hover:shadow-emerald-500/20 hover:border-emerald-500/40',
      text: 'Ser el Organismo Técnico de Capacitación líder y de referencia en Arica y la Región Norte, reconocidos por la excelencia pedagógica, tecnología aplicada y alta empleabilidad de nuestros alumnos.'
    },
    {
      title: 'Valores',
      icon: SlidersHorizontal,
      starColor: 'text-[#f59e0b] fill-[#f59e0b]',
      circleBg: 'bg-[#f59e0b]/15 border-2 border-[#f59e0b]',
      iconColor: 'text-[#f59e0b]',
      shadowHover: 'hover:shadow-amber-500/20 hover:border-amber-500/40',
      text: 'Compromiso con la legalidad, integridad, disciplina, vocación de servicio y constante actualización profesional como pilares fundamentales en cada programa de instrucción.'
    },
  ];

  // Manejo de scroll para actualizar indicador de paginación en móviles
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
    <section id="quienes-somos" className="relative py-24 px-4 sm:px-8 bg-slate-50 border-t border-slate-200 overflow-hidden">
      <div className="max-w-7xl mx-auto relative z-10">

        {/* Section Header */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center max-w-2xl mx-auto mb-16 space-y-3"
        >
          <span className="text-[#0284c7] text-xs font-bold tracking-widest uppercase">
            Nuestra Identidad Institucional
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            Pilares de <span className="text-[#0284c7]">PrevySeg</span>
          </h2>
        </motion.div>

        {/* Top Horizontal Bar with 3 Colored Stars (Desktop) */}
        <div className="relative mb-16 hidden md:block">
          <div className="absolute top-1/2 left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-slate-300 to-transparent -translate-y-1/2"></div>
          <div className="relative flex justify-around items-center max-w-5xl mx-auto">
            {cards.map((card, idx) => (
              <motion.div 
                key={idx}
                initial={{ scale: 0 }}
                whileInView={{ scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.15, duration: 0.4 }}
                className="bg-white p-2.5 rounded-full border border-slate-200 shadow-lg shadow-slate-200"
              >
                <Star size={20} className={`${card.starColor}`} />
              </motion.div>
            ))}
          </div>
        </div>

        {/* 
          Contenedor Principal:
          - En móviles (<md): Flex con desplazamiento horizontal fluido, scroll snap nativo y scrollbar oculta.
          - En pantallas medianas/grandes (md: o lg:): Grid estático de 3 columnas.
        */}
        <div 
          ref={scrollRef}
          onScroll={handleScroll}
          className="flex md:grid md:grid-cols-3 flex-nowrap md:flex-wrap overflow-x-auto md:overflow-visible snap-x snap-mandatory scroll-smooth gap-6 lg:gap-10 pb-6 md:pb-0 px-4 md:px-0 -mx-4 md:mx-0 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]"
        >
          {cards.map((card, index) => {
            const IconComp = card.icon;
            return (
              <motion.div 
                key={card.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.15 }}
                whileHover={{ y: -6, scale: 1.02 }}
                className={`w-[85vw] sm:w-[70vw] md:w-auto flex-shrink-0 md:flex-shrink snap-center flex flex-col items-center text-center p-8 rounded-3xl bg-white border border-slate-200 hover:border-slate-300 transition-all duration-300 group shadow-xl shadow-slate-200/70 ${card.shadowHover}`}
              >
                {/* Mobile Star Header Indicator */}
                <div className="md:hidden mb-4">
                  <div className="bg-slate-50 p-2 rounded-full border border-slate-200 shadow-sm inline-block">
                    <Star size={18} className={`${card.starColor}`} />
                  </div>
                </div>

                {/* Circular Icon Container */}
                <div className={`w-24 h-24 rounded-2xl flex items-center justify-center mb-6 ${card.circleBg} group-hover:scale-110 transition-transform duration-300 shadow-md`}>
                  <IconComp size={40} className={card.iconColor} />
                </div>

                {/* Title */}
                <h3 className="text-2xl font-bold text-slate-900 mb-4 tracking-wide group-hover:text-[#0284c7] transition-colors">
                  {card.title}
                </h3>

                {/* Text */}
                <p className="text-slate-600 text-sm sm:text-base leading-relaxed max-w-xs font-normal">
                  {card.text}
                </p>
              </motion.div>
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
              className={`h-2 rounded-full transition-all duration-300 cursor-pointer ${
                activeIndex === idx 
                  ? 'w-6 bg-[#0284c7]' 
                  : 'w-2 bg-slate-300 hover:bg-slate-400'
              }`}
            />
          ))}
        </div>

      </div>
    </section>
  );
};

export default AboutUs;
