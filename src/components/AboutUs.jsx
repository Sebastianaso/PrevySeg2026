import React from 'react';
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
      circleBg: 'bg-[#0284c7]/20 border-2 border-[#0284c7]',
      iconColor: 'text-[#0284c7]',
      text: 'Formar y capacitar integralmente a profesionales de seguridad privada con los más altos estándares técnicos y éticos, brindando herramientas que aseguren un desempeño eficiente y comprometido con la ley.',
      dummyText: 'Understanding your options is an. Let agents help guide. From that point of the connection.'
    },
    {
      title: 'Visión',
      icon: BarChart3,
      starColor: 'text-[#16a34a] fill-[#16a34a]',
      circleBg: 'bg-[#16a34a]/20 border-2 border-[#16a34a]',
      iconColor: 'text-[#16a34a]',
      text: 'Ser el Organismo Técnico de Capacitación líder y de referencia en Arica y la Región Norte, reconocidos por la excelencia pedagógica, tecnología aplicada y alta empleabilidad de nuestros alumnos.',
      dummyText: 'Understanding your options is an. Let agents help guide. From that point of the connection.'
    },
    {
      title: 'Valores',
      icon: SlidersHorizontal,
      starColor: 'text-[#f59e0b] fill-[#f59e0b]',
      circleBg: 'bg-[#f59e0b]/20 border-2 border-[#f59e0b]',
      iconColor: 'text-[#f59e0b]',
      text: 'Compromiso con la legalidad, integridad, disciplina, vocación de servicio y constante actualización profesional como pilares fundamentales en cada programa de instrucción.',
      dummyText: 'Understanding your options is an. Let agents help guide. From that point of the connection.'
    },
  ];

  return (
    <section id="quienes-somos" className="relative py-20 px-4 sm:px-8 bg-[#18191c]/80 border-t border-gray-800/40">
      <div className="max-w-7xl mx-auto">

        {/* Top Horizontal Bar with 3 Colored Stars */}
        <div className="relative mb-16 hidden md:block">
          <div className="absolute top-1/2 left-0 right-0 h-1 bg-gray-800 -translate-y-1/2 rounded-full"></div>
          <div className="relative flex justify-around items-center max-w-5xl mx-auto">
            {cards.map((card, idx) => (
              <div key={idx} className="bg-[#18191c] p-2 rounded-full border border-gray-700/60 shadow-lg">
                <Star size={20} className={`${card.starColor}`} />
              </div>
            ))}
          </div>
        </div>

        {/* 3 Circular Pillars Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 md:gap-8 lg:gap-12">
          {cards.map((card, index) => {
            const IconComp = card.icon;
            return (
              <div 
                key={card.title} 
                className="flex flex-col items-center text-center p-6 rounded-2xl bg-gray-900/40 border border-gray-800/50 hover:border-gray-700/80 transition-all duration-300 group hover:-translate-y-1.5 shadow-lg"
              >
                {/* Mobile star indicator */}
                <div className="md:hidden mb-4">
                  <Star size={20} className={`${card.starColor}`} />
                </div>

                {/* Circular Icon Container */}
                <div className={`w-24 h-24 rounded-full flex items-center justify-center mb-6 ${card.circleBg} group-hover:scale-110 transition-transform duration-300 shadow-md`}>
                  <IconComp size={40} className={card.iconColor} />
                </div>

                {/* Title */}
                <h3 className="text-2xl font-bold text-white mb-4 tracking-wide group-hover:text-[#00c2b2] transition-colors">
                  {card.title}
                </h3>

                {/* Text */}
                <p className="text-gray-300 text-sm sm:text-base leading-relaxed max-w-xs">
                  {card.text}
                </p>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};

export default AboutUs;
