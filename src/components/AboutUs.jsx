import React from 'react';
import { motion } from 'framer-motion';
import { 
  PieChart, 
  BarChart3, 
  SlidersHorizontal, 
  Star 
} from 'lucide-react';

const AboutUs = () => {
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

  return (
    <section id="quienes-somos" className="relative py-24 px-4 sm:px-8 bg-gradient-to-b from-[#18191c] via-[#141518] to-[#18191c] border-t border-white/10 overflow-hidden">
      <div className="max-w-7xl mx-auto relative z-10">

        {/* Section Header */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center max-w-2xl mx-auto mb-16 space-y-3"
        >
          <span className="text-[#00c2b2] text-xs font-bold tracking-widest uppercase">
            Nuestra Identidad Institucional
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            Pilares de <span className="text-[#0284c7]">PrevySeg</span>
          </h2>
        </motion.div>

        {/* Top Horizontal Bar with 3 Colored Stars */}
        <div className="relative mb-16 hidden md:block">
          <div className="absolute top-1/2 left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-white/15 to-transparent -translate-y-1/2"></div>
          <div className="relative flex justify-around items-center max-w-5xl mx-auto">
            {cards.map((card, idx) => (
              <motion.div 
                key={idx}
                initial={{ scale: 0 }}
                whileInView={{ scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.15, duration: 0.4 }}
                className="bg-[#18191c] p-2.5 rounded-full border border-white/15 shadow-xl shadow-black/60 backdrop-blur-md"
              >
                <Star size={20} className={`${card.starColor}`} />
              </motion.div>
            ))}
          </div>
        </div>

        {/* 3 Circular Pillars Grid with Framer Motion */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-10">
          {cards.map((card, index) => {
            const IconComp = card.icon;
            return (
              <motion.div 
                key={card.title}
                initial={{ opacity: 0, y: 25 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.45, delay: index * 0.1 }}
                whileHover={{ y: -6, scale: 1.02 }}
                className={`flex flex-col items-center text-center p-8 rounded-3xl bg-[#151619]/90 backdrop-blur-xl border border-white/10 hover:border-white/20 transition-all duration-300 group shadow-xl ${card.shadowHover}`}
              >
                {/* Mobile star indicator */}
                <div className="md:hidden mb-4">
                  <Star size={20} className={`${card.starColor}`} />
                </div>

                {/* Circular Icon Container */}
                <div className={`w-24 h-24 rounded-2xl flex items-center justify-center mb-6 ${card.circleBg} group-hover:scale-110 transition-transform duration-300 shadow-xl`}>
                  <IconComp size={40} className={card.iconColor} />
                </div>

                {/* Title */}
                <h3 className="text-2xl font-bold text-white mb-4 tracking-wide group-hover:text-white transition-colors">
                  {card.title}
                </h3>

                {/* Text */}
                <p className="text-slate-300 text-sm sm:text-base leading-relaxed max-w-xs font-normal">
                  {card.text}
                </p>
              </motion.div>
            );
          })}
        </div>

      </div>
    </section>
  );
};

export default AboutUs;
