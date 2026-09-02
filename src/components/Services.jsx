import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  ArrowRight,
  BookOpen,
  Sparkles,
  Shield
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
      <div className="relative aspect-[16/10] overflow-hidden bg-slate-900">
        <img 
          src={item.image} 
          alt={item.title} 
          className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-500"
          loading="lazy"
        />
        {/* Top-Left Category Badge */}
        <div className="absolute top-3 left-3 z-10">
          <span className="inline-block bg-[#0f2942]/90 backdrop-blur-md text-white text-[11px] font-bold px-3 py-1 rounded-md shadow-md border border-white/15">
            {item.category}
          </span>
        </div>
      </div>
    );
  }

  // Geometric Pattern Renderers matching screenshot covers
  let patternBg = 'bg-slate-800';
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
        <span className="inline-block bg-[#0f2942]/90 backdrop-blur-md text-white text-[11px] font-bold px-3 py-1 rounded-md shadow-md border border-white/15">
          {item.category}
        </span>
      </div>
    </div>
  );
};

export const COURSES_DATA = [
  {
    id: 1,
    title: '_2_66_2026 Resolución de Conflictos y Manejo de Situaciones Difíciles Código Sence: 1238088725',
    category: 'Seguridad Privada',
    coverType: 'pattern-grey',
    price: '$85.000 CLP',
    priceDetail: 'o Franquicia SENCE 100%'
  },
  {
    id: 2,
    title: 'Operador de Central de Cámaras de Televigilancia. C.C.T.V.',
    category: 'Seguridad Privada',
    image: cctvOperatorImg,
    price: '$140.000 CLP',
    priceDetail: 'Certificación Oficial OS-10'
  },
  {
    id: 3,
    title: 'Curso de formación Guardia de Seguridad',
    category: 'Seguridad Privada',
    image: securityGuardsImg,
    price: '$120.000 CLP',
    priceDetail: 'Acreditado OS-10 de Carabineros'
  },
  {
    id: 4,
    title: 'Formación de Supervisor de Seguridad Privada *ONLINE*',
    category: 'Seguridad Privada',
    image: securitySupervisorImg,
    price: '$180.000 CLP',
    priceDetail: 'Nivel Superior y Gestión OS-10'
  },
  {
    id: 5,
    title: 'Capacitación ITIC',
    category: 'Sistemas internos',
    coverType: 'pattern-pink',
    price: '$75.000 CLP',
    priceDetail: 'Tecnologías de Información'
  },
  {
    id: 6,
    title: 'Asistencia Curso - Código Sence: 1238087964 ID Acción: 6731273',
    category: 'Asistencias',
    coverType: 'pattern-light-grey',
    price: '$60.000 CLP',
    priceDetail: 'Módulo de Registro y Control'
  }
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.08
    }
  }
};

const cardVariants = {
  hidden: { opacity: 0, y: 25 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.45, ease: 'easeOut' }
  }
};

const Services = ({ onSelectCourse }) => {
  const [selectedCategory, setSelectedCategory] = useState('Todos');

  const categories = ['Todos', 'Seguridad Privada', 'Sistemas internos', 'Asistencias'];

  const filteredCourses = selectedCategory === 'Todos'
    ? COURSES_DATA
    : COURSES_DATA.filter((c) => c.category === selectedCategory);

  return (
    <section id="servicios" className="py-24 px-4 sm:px-8 bg-gradient-to-b from-[#18191c] via-[#131416] to-[#18191c] relative border-t border-white/10">
      <div className="max-w-7xl mx-auto space-y-12">
        
        {/* Section Header */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center max-w-3xl mx-auto space-y-4"
        >
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-950/80 border border-emerald-500/40 text-emerald-300 text-xs font-semibold backdrop-blur-md shadow-lg shadow-emerald-950/40">
            <Shield size={14} className="text-emerald-400" />
            <span>Oferta Académica Vigente 2026</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight">
            Cursos <span className="text-[#00c2b2]">Disponibles</span>
          </h2>
          <p className="text-slate-300 text-base sm:text-lg leading-relaxed">
            Programas formativos y especializaciones acreditadas con financiamiento SENCE y certificación oficial de Carabineros OS-10.
          </p>
        </motion.div>

        {/* Filter Categories Bar */}
        <motion.div 
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4, delay: 0.1 }}
          className="flex flex-wrap items-center justify-center gap-2.5 pt-2"
        >
          {categories.map((cat) => (
            <motion.button
              key={cat}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setSelectedCategory(cat)}
              className={`px-5 py-2.5 rounded-xl text-xs font-bold transition-all cursor-pointer border ${
                selectedCategory === cat
                  ? 'bg-gradient-to-r from-[#00c2b2] to-teal-400 text-gray-950 border-teal-300 shadow-lg shadow-teal-500/25'
                  : 'bg-[#121315]/80 text-slate-300 hover:text-white hover:bg-slate-800/80 border-white/10 hover:border-cyan-500/30'
              }`}
            >
              {cat}
            </motion.button>
          ))}
        </motion.div>

        {/* Courses Grid: Framer Motion Staggered Grid */}
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8"
        >
          <AnimatePresence>
            {filteredCourses.map((course) => (
              <motion.div
                key={course.id}
                variants={cardVariants}
                layout
                whileHover={{ y: -6, scale: 1.015 }}
                transition={{ duration: 0.25 }}
                className="rounded-2xl overflow-hidden bg-gradient-to-b from-[#16171a] to-[#111214] border border-white/10 shadow-xl hover:shadow-2xl hover:shadow-cyan-500/15 hover:border-cyan-500/40 transition-all duration-300 flex flex-col justify-between group"
              >
                <div>
                  {/* 1. Course Visual Cover */}
                  <CourseCover item={course} />

                  {/* 2. Course Title */}
                  <div className="p-6">
                    <h3 className="text-sm sm:text-base font-bold text-white leading-snug group-hover:text-[#00c2b2] transition-colors line-clamp-3">
                      {course.title}
                    </h3>
                  </div>
                </div>

                {/* 3. Bottom Price & Action Row */}
                <div className="p-6 pt-4 border-t border-white/10 bg-black/30 flex items-center justify-between gap-3">
                  <div>
                    <div className="text-[10px] uppercase font-bold tracking-wider text-slate-400">
                      Arancel Oficial:
                    </div>
                    <div className="text-lg sm:text-xl font-black text-[#00c2b2] tracking-tight">
                      {course.price}
                    </div>
                    <div className="text-[11px] font-semibold text-emerald-400">
                      {course.priceDetail}
                    </div>
                  </div>

                  <motion.button
                    whileHover={{ scale: 1.05, boxShadow: '0 0 15px rgba(2, 132, 199, 0.4)' }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => onSelectCourse(course.title)}
                    className="bg-gradient-to-r from-[#0284c7] to-[#0369a1] hover:from-sky-500 hover:to-sky-700 text-white text-xs font-bold py-2.5 px-4 rounded-xl shadow-md flex items-center gap-1.5 transition-all cursor-pointer flex-shrink-0 group/btn border border-sky-400/30"
                  >
                    <span>Inscribirme</span>
                    <ArrowRight size={14} className="group-hover/btn:translate-x-1 transition-transform" />
                  </motion.button>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        {/* SENCE Tramos & Beneficios de Franquicia Tributaria */}
        <SenceTramosSection />

      </div>
    </section>
  );
};

export default Services;
