import React from 'react';
import { 
  Brain, 
  Binoculars, 
  Shield, 
  Tv, 
  Check, 
  ArrowRight 
} from 'lucide-react';

const Services = ({ onSelectCourse }) => {
  const formationCards = [
    {
      title: 'Formación Inicial',
      icon: Brain,
      iconBg: 'bg-[#0284c7]/25 text-[#0284c7]',
      items: [
        'Formación de Guardias de Seguridad',
        'Formación de Vigilantes Privados',
        'Formación de Guardia de Seguridad Marítimo Portuario',
        'Formación para Porteros, Nocheros, Rondines u otro de similar carácter',
      ],
    },
    {
      title: 'Perfeccionamiento',
      icon: Binoculars,
      iconBg: 'bg-[#e11d48]/25 text-[#fb7185]',
      items: [
        'Perfeccionamiento de Guardias de Seguridad',
        'Perfeccionamiento de Guardia de Seguridad Marítimo Portuario',
        'Perfeccionamiento de Porteros, Nocheros, Rondines u otro de similar carácter.',
      ],
    },
  ];

  const specializationCourses = [
    {
      category: 'Tecnología y Sistemas de Seguridad',
      icon: Brain,
      iconBg: 'bg-[#0284c7]/25 text-[#0284c7]',
      items: [
        'Técnicas de Operación de Circuitos Cerrados de Televisión (CCTV codificado por SENCE)',
        'Técnicas de Operación de CCTV y Alarmas de Seguridad Privada',
        'Supervisor de seguridad Privada',
      ],
    },
  ];

  return (
    <section id="servicios" className="py-24 px-4 sm:px-8 bg-[#16171a] relative">
      <div className="max-w-7xl mx-auto space-y-20">

        {/* 1. PROGRAMAS DE FORMACIÓN */}
        <div className="space-y-12">
          {/* Header */}
          <div className="text-center max-w-3xl mx-auto space-y-4">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight">
              Programas De <span className="text-[#22c55e]">Formación</span>
            </h2>
            <p className="text-gray-300 text-base sm:text-lg leading-relaxed">
              Nuestros programas están orientados a la preparación de personal para desempeñarse en el área de seguridad privada.
            </p>
          </div>

          {/* Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-10">
            {formationCards.map((card, idx) => {
              const IconComponent = card.icon;
              return (
                <div
                  key={idx}
                  className="bg-[#121316] rounded-3xl p-8 sm:p-10 border border-gray-800/80 hover:border-gray-700 transition-all duration-300 shadow-2xl flex flex-col justify-between group"
                >
                  <div className="space-y-6">
                    {/* Top Icon */}
                    <div className={`w-16 h-16 rounded-2xl flex items-center justify-center ${card.iconBg} mb-4 shadow-inner group-hover:scale-105 transition-transform duration-200`}>
                      <IconComponent size={34} />
                    </div>

                    {/* Card Title */}
                    <h3 className="text-2xl font-bold text-white tracking-wide">
                      {card.title}
                    </h3>

                    {/* Items with white dot bullet points as in screenshot */}
                    <ul className="space-y-4 pt-2">
                      {card.items.map((item, itemIdx) => (
                        <li key={itemIdx} className="flex items-start gap-3.5 text-gray-300 text-sm sm:text-base leading-snug">
                          <span className="w-2.5 h-2.5 rounded-full bg-white flex-shrink-0 mt-1.5 shadow-sm shadow-white/40"></span>
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Action Link */}
                  <div className="pt-8 border-t border-gray-800/60 mt-6">
                    <button
                      onClick={() => onSelectCourse(card.title)}
                      className="text-xs uppercase tracking-wider font-bold text-[#00c2b2] hover:text-teal-300 flex items-center gap-2 group-hover:translate-x-1 transition-all cursor-pointer"
                    >
                      <span>Consultar Requisitos y Fechas</span>
                      <ArrowRight size={14} />
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* 2. CURSOS DE ESPECIALIZACIÓN */}
        <div className="space-y-12 pt-8">
          {/* Header */}
          <div className="text-center max-w-3xl mx-auto space-y-4">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight">
              Cursos De <span className="text-[#22c55e]">Especialización</span>
            </h2>
            <p className="text-gray-300 text-base sm:text-lg leading-relaxed">
              Programas orientados a fortalecer habilidades específicas dentro del ámbito de la seguridad privada.
            </p>
          </div>

          {/* Wide Specialization Card */}
          <div className="max-w-5xl mx-auto">
            {specializationCourses.map((spec, sIdx) => {
              const IconComp = spec.icon;
              return (
                <div
                  key={sIdx}
                  className="bg-[#121316] rounded-3xl p-8 sm:p-12 border border-gray-800/80 hover:border-gray-700 transition-all duration-300 shadow-2xl group"
                >
                  <div className="space-y-6">
                    {/* Top Icon */}
                    <div className={`w-16 h-16 rounded-2xl flex items-center justify-center ${spec.iconBg} mb-4 group-hover:scale-105 transition-transform duration-200`}>
                      <IconComp size={34} />
                    </div>

                    {/* Title */}
                    <h3 className="text-2xl sm:text-3xl font-bold text-white tracking-wide">
                      {spec.category}
                    </h3>

                    {/* Items list with white dot bullet markers */}
                    <ul className="space-y-4 pt-2">
                      {spec.items.map((item, itemIdx) => (
                        <li key={itemIdx} className="flex items-start gap-3.5 text-gray-300 text-sm sm:text-base leading-snug">
                          <span className="w-2.5 h-2.5 rounded-full bg-white flex-shrink-0 mt-1.5 shadow-sm shadow-white/40"></span>
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>

                    {/* Action button */}
                    <div className="pt-6">
                      <button
                        onClick={() => onSelectCourse(spec.category)}
                        className="bg-[#0284c7] hover:bg-[#0369a1] text-white text-xs font-bold uppercase tracking-wider py-3 px-6 rounded shadow-lg transition-all duration-200 cursor-pointer flex items-center gap-2"
                      >
                        <span>Solicitar Cupo y Cotización</span>
                        <ArrowRight size={14} />
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

      </div>
    </section>
  );
};

export default Services;
