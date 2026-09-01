import React from 'react';
import { Calendar, ArrowRight, Tag, BookOpen } from 'lucide-react';
import blogCctv from '../assets/images/blog_cctv.jpg';
import blogPort from '../assets/images/blog_port_security.jpg';
import blogFirstAid from '../assets/images/blog_first_aid.jpg';

const ExperiencesSection = ({ onReadArticle }) => {
  const articles = [
    {
      id: 1,
      image: blogCctv,
      category: 'Tecnología & CCTV',
      date: '15 Agosto, 2026',
      title: 'Taller Práctico de Operación de Circuitos Cerrados y Alarmas',
      summary: 'Alumnos del curso de especialización realizaron simulaciones en tiempo real de monitoreo y detección temprana de incidentes.',
      readTime: '4 min de lectura',
    },
    {
      id: 2,
      image: blogPort,
      category: 'Seguridad Marítima',
      date: '28 Julio, 2026',
      title: 'Certificación de Guardia Marítimo Portuario en el Puerto de Arica',
      summary: 'Nuevos egresados concluyen con éxito la instrucción orientada a terminales marítimos bajo estándares Directemar.',
      readTime: '5 min de lectura',
    },
    {
      id: 3,
      image: blogFirstAid,
      category: 'Capacitación Integral',
      date: '10 Junio, 2026',
      title: 'Protocolos de Primeros Auxilios y Respuesta a Emergencias Médicas',
      summary: 'Jornada intensiva de RCP y control de crisis para personal de vigilancia privada y control de accesos.',
      readTime: '3 min de lectura',
    },
  ];

  return (
    <section className="py-24 px-4 sm:px-8 bg-[#161719] relative border-t border-gray-800/50">
      <div className="max-w-7xl mx-auto space-y-16">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <span className="text-[#00c2b2] text-xs font-bold tracking-widest uppercase flex items-center justify-center gap-2">
            <BookOpen size={14} />
            Actividades y Novedades
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight">
            Experiencias y <span className="text-[#0284c7]">Testimonios</span>
          </h2>
          <p className="text-gray-300 text-base sm:text-lg">
            Mantente informado con nuestras últimas actividades formativas, ceremonias y actualizaciones del sector de seguridad privada.
          </p>
        </div>

        {/* 3 Blog Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {articles.map((item) => (
            <article
              key={item.id}
              className="bg-[#121316] rounded-2xl overflow-hidden border border-gray-800/80 hover:border-gray-700 transition-all duration-300 shadow-xl flex flex-col group hover:-translate-y-1.5"
            >
              {/* Card Image */}
              <div className="relative overflow-hidden aspect-[16/10] bg-gray-900">
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-500"
                  loading="lazy"
                />
                <div className="absolute top-3 left-3 bg-[#0284c7]/90 backdrop-blur-sm text-white text-[11px] font-bold px-3 py-1 rounded-full flex items-center gap-1.5 shadow-md">
                  <Tag size={12} />
                  <span>{item.category}</span>
                </div>
              </div>

              {/* Card Body */}
              <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
                <div className="space-y-3">
                  {/* Meta Date */}
                  <div className="flex items-center gap-2 text-xs text-gray-400 font-medium">
                    <Calendar size={13} className="text-[#00c2b2]" />
                    <span>{item.date}</span>
                    <span>•</span>
                    <span>{item.readTime}</span>
                  </div>

                  {/* Title */}
                  <h3 className="text-lg sm:text-xl font-bold text-white group-hover:text-[#00c2b2] transition-colors leading-snug line-clamp-2">
                    {item.title}
                  </h3>

                  {/* Summary */}
                  <p className="text-gray-400 text-xs sm:text-sm leading-relaxed line-clamp-3">
                    {item.summary}
                  </p>
                </div>

                {/* Read more button */}
                <div className="pt-4 border-t border-gray-800/60">
                  <button
                    onClick={() => onReadArticle(item)}
                    className="text-xs uppercase tracking-wider font-bold text-[#0284c7] group-hover:text-sky-300 flex items-center gap-2 group-hover:translate-x-1 transition-all cursor-pointer"
                  >
                    <span>Leer Artículo Completo</span>
                    <ArrowRight size={14} />
                  </button>
                </div>
              </div>
            </article>
          ))}
        </div>

      </div>
    </section>
  );
};

export default ExperiencesSection;
