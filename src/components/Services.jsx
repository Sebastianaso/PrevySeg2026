import React, { useState } from 'react';
import { 
  ArrowRight,
  BookOpen
} from 'lucide-react';
import cctvOperatorImg from '../assets/images/cctv_operator.jpg';
import securityGuardsImg from '../assets/images/security_guards.jpg';
import securitySupervisorImg from '../assets/images/security_supervisor.jpg';
import blogCctvImg from '../assets/images/blog_cctv.jpg';
import blogPortImg from '../assets/images/blog_port_security.jpg';
import SenceTramosSection from './SenceTramosSection';

// Dynamic Pattern Cover Component matching Moodle LMS screenshots
const CourseCover = ({ item }) => {
  if (item.image) {
    return (
      <div className="relative aspect-[16/10] overflow-hidden bg-gray-900">
        <img 
          src={item.image} 
          alt={item.title} 
          className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-500"
          loading="lazy"
        />
        {/* Top-Left Category Badge */}
        <div className="absolute top-3 left-3">
          <span className="inline-block bg-[#0f2942]/95 backdrop-blur-sm text-white text-[11px] font-bold px-3 py-1 rounded-md shadow-md border border-white/10">
            {item.category}
          </span>
        </div>
      </div>
    );
  }

  // Geometric Pattern Renderers matching screenshot covers
  let patternBg = 'bg-gray-800';
  let patternSvg = null;

  if (item.coverType === 'pattern-grey') {
    patternBg = 'bg-gradient-to-br from-slate-700 via-gray-800 to-slate-900';
    patternSvg = (
      <svg className="absolute inset-0 w-full h-full opacity-30" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <pattern id="poly-grey" width="60" height="60" patternUnits="userSpaceOnUse">
            <polygon points="0,0 30,0 15,30" fill="#94a3b8" opacity="0.3" />
            <polygon points="30,0 60,0 45,30" fill="#cbd5e1" opacity="0.2" />
            <polygon points="15,30 45,30 30,60" fill="#64748b" opacity="0.4" />
            <polygon points="45,30 75,30 60,60" fill="#94a3b8" opacity="0.3" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#poly-grey)" />
      </svg>
    );
  } else if (item.coverType === 'pattern-blue-circles') {
    patternBg = 'bg-gradient-to-br from-blue-700 via-sky-800 to-blue-900';
    patternSvg = (
      <svg className="absolute inset-0 w-full h-full opacity-35" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <pattern id="circles-blue" width="50" height="50" patternUnits="userSpaceOnUse">
            <circle cx="25" cy="25" r="20" fill="none" stroke="#ffffff" strokeWidth="4" opacity="0.4" />
            <circle cx="25" cy="25" r="10" fill="none" stroke="#ffffff" strokeWidth="3" opacity="0.5" />
            <circle cx="0" cy="0" r="15" fill="none" stroke="#ffffff" strokeWidth="4" opacity="0.3" />
            <circle cx="50" cy="50" r="15" fill="none" stroke="#ffffff" strokeWidth="4" opacity="0.3" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#circles-blue)" />
      </svg>
    );
  } else if (item.coverType === 'pattern-blue-hex') {
    patternBg = 'bg-gradient-to-br from-sky-600 via-blue-700 to-blue-900';
    patternSvg = (
      <svg className="absolute inset-0 w-full h-full opacity-40" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <pattern id="hex-blue" width="56" height="100" patternUnits="userSpaceOnUse">
            <path d="M28 0 L56 16 L56 48 L28 64 L0 48 L0 16 Z" fill="none" stroke="#ffffff" strokeWidth="2" opacity="0.35" />
            <path d="M28 50 L56 66 L56 98 L28 114 L0 98 L0 66 Z" fill="none" stroke="#ffffff" strokeWidth="2" opacity="0.35" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#hex-blue)" />
      </svg>
    );
  } else if (item.coverType === 'pattern-pink') {
    patternBg = 'bg-gradient-to-br from-pink-500 via-rose-600 to-pink-700';
    patternSvg = (
      <svg className="absolute inset-0 w-full h-full opacity-35" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <pattern id="tri-pink" width="40" height="40" patternUnits="userSpaceOnUse">
            <polygon points="0,0 40,0 20,40" fill="#ffffff" opacity="0.25" />
            <polygon points="20,40 60,40 40,80" fill="#ffffff" opacity="0.15" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#tri-pink)" />
      </svg>
    );
  } else if (item.coverType === 'pattern-light-grey') {
    patternBg = 'bg-gradient-to-br from-gray-700 via-gray-800 to-gray-900';
    patternSvg = (
      <svg className="absolute inset-0 w-full h-full opacity-25" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <pattern id="dots-light" width="20" height="20" patternUnits="userSpaceOnUse">
            <circle cx="10" cy="10" r="2" fill="#ffffff" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#dots-light)" />
      </svg>
    );
  } else if (item.coverType === 'pattern-green-hex') {
    patternBg = 'bg-gradient-to-br from-emerald-700 via-teal-800 to-emerald-950';
    patternSvg = (
      <svg className="absolute inset-0 w-full h-full opacity-40" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <pattern id="hex-green" width="56" height="100" patternUnits="userSpaceOnUse">
            <path d="M28 0 L56 16 L56 48 L28 64 L0 48 L0 16 Z" fill="none" stroke="#ffffff" strokeWidth="2" opacity="0.35" />
            <path d="M28 50 L56 66 L56 98 L28 114 L0 98 L0 66 Z" fill="none" stroke="#ffffff" strokeWidth="2" opacity="0.35" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#hex-green)" />
      </svg>
    );
  }

  return (
    <div className={`relative aspect-[16/10] overflow-hidden ${patternBg} flex items-center justify-center`}>
      {patternSvg}
      {/* Top-Left Category Badge */}
      <div className="absolute top-3 left-3 z-10">
        <span className="inline-block bg-[#0f2942] text-white text-[11px] font-bold px-3 py-1 rounded-md shadow-md border border-white/10">
          {item.category}
        </span>
      </div>
    </div>
  );
};

export const COURSES_DATA = [
  {
    id: 1,
    title: '_2_66_2026 - Resolución de Conflictos y Manejo de Situaciones Difíciles Código Sence: 1238088725 - Registro Único Sence: 6750652',
    category: 'Seguridad Privada',
    coverType: 'pattern-grey',
    price: '$85.000 CLP',
    priceDetail: 'o Franquicia SENCE 100%'
  },
  {
    id: 2,
    title: '1_65_2025 - Resolución de Conflictos y Manejo de Situaciones Difíciles Código Sence: 1238088725 - Código Curso: 6745745',
    category: 'Seguridad Privada',
    coverType: 'pattern-blue-circles',
    price: '$85.000 CLP',
    priceDetail: 'o Franquicia SENCE 100%'
  },
  {
    id: 3,
    title: '(código 1-56) Operador de Central de Cámaras de Televigilancia. C.C.T.V.',
    category: 'Seguridad Privada',
    image: cctvOperatorImg,
    price: '$140.000 CLP',
    priceDetail: 'Certificación Oficial OS-10'
  },
  {
    id: 4,
    title: 'Técnicas De Operación De Circuitos Cerrados De Televisión - Código SENCE : 1238087964',
    category: 'Seguridad Privada',
    image: blogCctvImg,
    price: '$130.000 CLP',
    priceDetail: 'Código SENCE Disponible'
  },
  {
    id: 5,
    title: 'Curso de formación Guardia de Seguridad online',
    category: 'Seguridad Privada',
    image: securityGuardsImg,
    price: '$120.000 CLP',
    priceDetail: 'Acreditado OS-10 de Carabineros'
  },
  {
    id: 6,
    title: 'Formación de Supervisor de Seguridad Privada',
    category: 'Seguridad Privada',
    image: securitySupervisorImg,
    price: '$180.000 CLP',
    priceDetail: 'Nivel Superior y Gestión OS-10'
  },
  {
    id: 7,
    title: 'Curso de Supervisor de Seguridad Marítimo Portuario',
    category: 'Seguridad Privada',
    image: blogPortImg,
    price: '$195.000 CLP',
    priceDetail: 'Normativa Directemar / Puerto Arica'
  },
  {
    id: 8,
    title: 'TECNICAS DEL MANEJO DEL GANADO DE CAMÉLIDOS SUDAMERICANOS',
    category: 'Agricola',
    coverType: 'pattern-blue-hex',
    price: '$95.000 CLP',
    priceDetail: 'Especialización Agropecuaria'
  },
  {
    id: 9,
    title: 'Capacitación ITIC',
    category: 'Sistemas internos',
    coverType: 'pattern-pink',
    price: '$75.000 CLP',
    priceDetail: 'Tecnologías de Información'
  },
  {
    id: 10,
    title: '_1 Asistencia Curso - Código Sence: 1238087964 ID Acción: 6731273',
    category: 'Asistencias',
    coverType: 'pattern-light-grey',
    price: '$60.000 CLP',
    priceDetail: 'Módulo de Registro y Control'
  },
  {
    id: 11,
    title: 'Original - Resolución de Conflictos y Manejo de Situaciones Difíciles',
    category: 'Originales',
    coverType: 'pattern-green-hex',
    price: '$85.000 CLP',
    priceDetail: 'Programa Matriz Oficial'
  }
];

const Services = ({ onSelectCourse }) => {
  const [selectedCategory, setSelectedCategory] = useState('Todos');

  const categories = ['Todos', 'Seguridad Privada', 'Agricola', 'Sistemas internos', 'Asistencias', 'Originales'];

  const filteredCourses = selectedCategory === 'Todos'
    ? COURSES_DATA
    : COURSES_DATA.filter((c) => c.category === selectedCategory);

  return (
    <section id="servicios" className="py-24 px-4 sm:px-8 bg-[#16171a] relative border-t border-gray-800/60">
      <div className="max-w-7xl mx-auto space-y-12">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight">
            Cursos <span className="text-[#22c55e]">Disponibles</span>
          </h2>
          <p className="text-gray-300 text-base sm:text-lg leading-relaxed">
            Programas formativos y especializaciones acreditadas con financiamiento SENCE y certificación oficial.
          </p>
        </div>

        {/* Filter Categories Bar */}
        <div className="flex flex-wrap items-center justify-center gap-2 pt-2">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-4 py-2 rounded-full text-xs font-bold transition-all cursor-pointer ${
                selectedCategory === cat
                  ? 'bg-[#00c2b2] text-gray-950 shadow-lg shadow-teal-900/40'
                  : 'bg-gray-800/80 text-gray-300 hover:bg-gray-700 border border-gray-700'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Courses Grid: Visual + Title Only (No Description) + Price at the bottom */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {filteredCourses.map((course) => (
            <div
              key={course.id}
              className="rounded-2xl overflow-hidden bg-[#121316] border border-gray-800 shadow-xl hover:border-gray-700 transition-all duration-300 flex flex-col justify-between group hover:-translate-y-1.5"
            >
              <div>
                {/* 1. Course Visual Cover */}
                <CourseCover item={course} />

                {/* 2. Course Title (Sin descripción, solo título visual) */}
                <div className="p-5">
                  <h3 className="text-sm sm:text-base font-bold text-white leading-snug group-hover:text-[#00c2b2] transition-colors line-clamp-3">
                    {course.title}
                  </h3>
                </div>
              </div>

              {/* 3. Bottom Price & Action Row */}
              <div className="p-5 pt-3 border-t border-gray-800/80 bg-black/20 flex items-center justify-between gap-3">
                <div>
                  <div className="text-[10px] uppercase font-bold tracking-wider text-gray-400">
                    Valor del Curso:
                  </div>
                  <div className="text-lg sm:text-xl font-black text-[#00c2b2] tracking-tight">
                    {course.price}
                  </div>
                  <div className="text-[10px] font-semibold text-emerald-400">
                    {course.priceDetail}
                  </div>
                </div>

                <button
                  onClick={() => onSelectCourse(course.title)}
                  className="bg-[#0284c7] hover:bg-[#0369a1] active:scale-95 text-white text-xs font-bold py-2.5 px-4 rounded-lg shadow-md flex items-center gap-1.5 transition-all cursor-pointer flex-shrink-0 group/btn"
                >
                  <span>Inscribirme</span>
                  <ArrowRight size={14} className="group-hover/btn:translate-x-1 transition-transform" />
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* SENCE Tramos & Beneficios de Franquicia Tributaria (Afiliación oficial y tramos UTM) */}
        <SenceTramosSection />

      </div>
    </section>
  );
};

export default Services;
