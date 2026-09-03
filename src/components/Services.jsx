import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  ArrowRight,
  BookOpen,
  Sparkles,
  Shield,
  Wrench,
  Zap,
  HardHat,
  Truck,
  CheckCircle2,
  Clock,
  Award
} from 'lucide-react';
import cctvOperatorImg from '../assets/images/cctv_operator.jpg';
import securityGuardsImg from '../assets/images/security_guards.jpg';
import securitySupervisorImg from '../assets/images/security_supervisor.jpg';
import SenceTramosSection from './SenceTramosSection';

// Dynamic Pattern Cover Component
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
        <div className="absolute top-3 left-3 z-10 flex flex-col gap-1.5">
          <span className="inline-block bg-[#0f2942]/90 backdrop-blur-md text-white text-[10px] font-bold px-3 py-1 rounded-md shadow-md border border-white/15">
            {item.category}
          </span>
          {item.school && (
            <span className={`inline-block text-[9px] font-extrabold uppercase px-2 py-0.5 rounded shadow ${
              item.school === 'seguridad' 
                ? 'bg-sky-950/90 text-sky-300 border border-sky-400/40' 
                : 'bg-amber-950/90 text-amber-300 border border-amber-400/40'
            }`}>
              {item.school === 'seguridad' ? 'Seguridad SPD' : 'Escuela de Oficios'}
            </span>
          )}
        </div>
      </div>
    );
  }

  // Geometric Pattern Renderers
  let patternBg = 'bg-slate-800';
  let patternSvg = null;

  if (item.coverType === 'pattern-amber-hex') {
    patternBg = 'bg-gradient-to-br from-amber-700 via-orange-800 to-amber-950';
    patternSvg = (
      <svg className="absolute inset-0 w-full h-full opacity-35" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <pattern id="hex-amber" width="56" height="100" patternUnits="userSpaceOnUse">
            <path d="M28 0 L56 16 L56 48 L28 64 L0 48 L0 16 Z" fill="none" stroke="#ffffff" strokeWidth="2" opacity="0.35" />
            <path d="M28 50 L56 66 L56 98 L28 114 L0 98 L0 66 Z" fill="none" stroke="#ffffff" strokeWidth="2" opacity="0.35" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#hex-amber)" />
      </svg>
    );
  } else if (item.coverType === 'pattern-emerald') {
    patternBg = 'bg-gradient-to-br from-emerald-700 via-teal-800 to-emerald-950';
    patternSvg = (
      <svg className="absolute inset-0 w-full h-full opacity-35" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <pattern id="circles-emerald" width="50" height="50" patternUnits="userSpaceOnUse">
            <circle cx="25" cy="25" r="20" fill="none" stroke="#ffffff" strokeWidth="3" opacity="0.35" />
            <circle cx="25" cy="25" r="10" fill="none" stroke="#ffffff" strokeWidth="2" opacity="0.45" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#circles-emerald)" />
      </svg>
    );
  } else if (item.coverType === 'pattern-cyan') {
    patternBg = 'bg-gradient-to-br from-cyan-700 via-sky-800 to-slate-900';
    patternSvg = (
      <svg className="absolute inset-0 w-full h-full opacity-35" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <pattern id="dots-cyan" width="24" height="24" patternUnits="userSpaceOnUse">
            <circle cx="12" cy="12" r="3" fill="#ffffff" opacity="0.4" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#dots-cyan)" />
      </svg>
    );
  } else if (item.coverType === 'pattern-blue-hex') {
    patternBg = 'bg-gradient-to-br from-sky-600 via-blue-700 to-blue-900';
    patternSvg = (
      <svg className="absolute inset-0 w-full h-full opacity-40" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <pattern id="hex-blue" width="56" height="100" patternUnits="userSpaceOnUse">
            <path d="M28 0 L56 16 L56 48 L28 64 L0 48 L0 16 Z" fill="none" stroke="#ffffff" strokeWidth="2" opacity="0.35" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#hex-blue)" />
      </svg>
    );
  } else {
    patternBg = 'bg-gradient-to-br from-slate-700 via-gray-800 to-slate-900';
    patternSvg = (
      <svg className="absolute inset-0 w-full h-full opacity-30" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <pattern id="poly-grey" width="60" height="60" patternUnits="userSpaceOnUse">
            <polygon points="0,0 30,0 15,30" fill="#94a3b8" opacity="0.3" />
            <polygon points="30,0 60,0 45,30" fill="#cbd5e1" opacity="0.2" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#poly-grey)" />
      </svg>
    );
  }

  return (
    <div className={`relative aspect-[16/10] overflow-hidden ${patternBg} flex items-center justify-center`}>
      {patternSvg}
      {/* Top-Left Category Badge */}
      <div className="absolute top-3 left-3 z-10 flex flex-col gap-1.5">
        <span className="inline-block bg-[#0f2942]/90 backdrop-blur-md text-white text-[10px] font-bold px-3 py-1 rounded-md shadow-md border border-white/15">
          {item.category}
        </span>
        {item.school && (
          <span className={`inline-block text-[9px] font-extrabold uppercase px-2 py-0.5 rounded shadow ${
            item.school === 'seguridad' 
              ? 'bg-sky-950/90 text-sky-300 border border-sky-400/40' 
              : 'bg-amber-950/90 text-amber-300 border border-amber-400/40'
          }`}>
            {item.school === 'seguridad' ? 'Seguridad SPD' : 'Escuela de Oficios'}
          </span>
        )}
      </div>
    </div>
  );
};

export const COURSES_DATA = [
  // ================= ESCUELA DE SEGURIDAD PRIVADA (SPD) =================
  {
    id: 1,
    school: 'seguridad',
    title: 'Curso de Formación Guardia de Seguridad (Credencial SPD)',
    category: 'Seguridad Privada',
    image: securityGuardsImg,
    price: '$120.000 CLP',
    priceDetail: 'Acreditación Oficial SPD / SENCE',
    duration: '90 Horas Cronológicas',
    highlight: 'Rápida Inserción Laboral'
  },
  {
    id: 2,
    school: 'seguridad',
    title: 'Operador de Central de Cámaras de Televigilancia (C.C.T.V.)',
    category: 'Seguridad Privada',
    image: cctvOperatorImg,
    price: '$140.000 CLP',
    priceDetail: 'Certificación Oficial y VMS',
    duration: '60 Horas',
    highlight: 'Alta Demanda'
  },
  {
    id: 3,
    school: 'seguridad',
    title: 'Formación de Supervisor de Seguridad Privada *ONLINE*',
    category: 'Seguridad Privada',
    image: securitySupervisorImg,
    price: '$180.000 CLP',
    priceDetail: 'Gestión y Liderazgo Operativo SPD',
    duration: '120 Horas',
    highlight: 'Nivel Superior'
  },
  {
    id: 4,
    school: 'seguridad',
    title: '_2_66_2026 Resolución de Conflictos y Manejo de Crisis Código Sence: 1238088725',
    category: 'Seguridad Privada',
    coverType: 'pattern-grey',
    price: '$85.000 CLP',
    priceDetail: 'Franquicia SENCE 100%',
    duration: '40 Horas',
    highlight: 'SENCE Directo'
  },
  {
    id: 5,
    school: 'seguridad',
    title: 'Control de Acceso y Seguridad Marítimo Portuaria (PBIP)',
    category: 'Seguridad Privada',
    coverType: 'pattern-cyan',
    price: '$110.000 CLP',
    priceDetail: 'Faena Portuaria TPA Arica',
    duration: '45 Horas',
    highlight: 'Convenio Empresas'
  },
  {
    id: 6,
    school: 'seguridad',
    title: 'Capacitación en Sistemas Internos ITIC y Ciberseguridad',
    category: 'Sistemas internos',
    coverType: 'pattern-blue-hex',
    price: '$75.000 CLP',
    priceDetail: 'Tecnologías de la Información',
    duration: '30 Horas',
    highlight: 'E-learning'
  },

  // ================= ESCUELA DE OFICIOS (ALTA EMPLEABILIDAD) =================
  {
    id: 7,
    school: 'oficios',
    title: 'Operador y Conducción Segura de Grúa Horquilla (Clase D)',
    category: 'Operaciones & Logística',
    coverType: 'pattern-amber-hex',
    price: '$150.000 CLP',
    priceDetail: 'Salida Laboral Inmediata en Faenas',
    duration: '40 Horas Teórico-Prácticas',
    highlight: 'Top Empleabilidad'
  },
  {
    id: 8,
    school: 'oficios',
    title: 'Logística, Bodega y Gestión de Almacenamiento WMS',
    category: 'Operaciones & Logística',
    coverType: 'pattern-emerald',
    price: '$95.000 CLP',
    priceDetail: 'Franquicia SENCE e Inserción Directa',
    duration: '35 Horas',
    highlight: 'Retail & Puertos'
  },
  {
    id: 9,
    school: 'oficios',
    title: 'Instalaciones Eléctricas Domiciliarias e Industriales (SEC Clase D)',
    category: 'Técnico & Mantenimiento',
    coverType: 'pattern-amber-hex',
    price: '$180.000 CLP',
    priceDetail: 'Preparación para Certificación SEC',
    duration: '60 Horas',
    highlight: 'Oficio Calificado'
  },
  {
    id: 10,
    school: 'oficios',
    title: 'Soldadura al Arco Voltáico y Montaje Estructural en Faena',
    category: 'Técnico & Mantenimiento',
    coverType: 'pattern-grey',
    price: '$160.000 CLP',
    priceDetail: 'Norma AWS & Seguridad Industrial',
    duration: '50 Horas',
    highlight: 'Demanda Minera'
  },
  {
    id: 11,
    school: 'oficios',
    title: 'Instalación y Mantenimiento de Paneles Solares Fotovoltaicos',
    category: 'Energía & Sustentabilidad',
    coverType: 'pattern-cyan',
    price: '$135.000 CLP',
    priceDetail: 'Energías Renovables Norte Grande',
    duration: '40 Horas',
    highlight: 'Futuro Laboral'
  },
  {
    id: 12,
    school: 'oficios',
    title: 'Mantenimiento Mecánico Preventivo de Maquinaria Industrial',
    category: 'Técnico & Mantenimiento',
    coverType: 'pattern-emerald',
    price: '$120.000 CLP',
    priceDetail: 'Equipos de faenas y transporte',
    duration: '40 Horas',
    highlight: 'Rápida Salida'
  }
];

const Services = ({ onSelectCourse }) => {
  // Selector de Escuela: 'todos' | 'seguridad' | 'oficios'
  const [activeSchool, setActiveSchool] = useState('todos');
  const [selectedCategory, setSelectedCategory] = useState('Todos');

  // Filtrado por Escuela
  const schoolFilteredCourses = activeSchool === 'todos' 
    ? COURSES_DATA 
    : COURSES_DATA.filter(c => c.school === activeSchool);

  // Categorías dinámicas según la escuela seleccionada
  const categories = ['Todos', ...new Set(schoolFilteredCourses.map(c => c.category))];

  // Filtrado final por categoría
  const finalCourses = selectedCategory === 'Todos'
    ? schoolFilteredCourses
    : schoolFilteredCourses.filter(c => c.category === selectedCategory);

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
            <span>Oferta Académica & Formación Acreditada SENCE 2026</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight">
            Programas y <span className="text-[#00c2b2]">Especializaciones</span>
          </h2>
          <p className="text-slate-300 text-base sm:text-lg leading-relaxed">
            Formación intensiva de rápida empleabilidad para combatir la desocupación regional en Arica y la Macro Zona Norte (Iquique, Antofagasta y Calama).
          </p>
        </motion.div>

        {/* 1. MÓDULO A: SELECTOR PRINCIPAL DE ESCUELA (Seguridad Privada vs Escuela de Oficios) */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="max-w-3xl mx-auto p-2 bg-[#121316] rounded-3xl border border-white/15 shadow-2xl flex flex-col sm:flex-row gap-2"
        >
          {/* Opción 1: Todos */}
          <button
            onClick={() => {
              setActiveSchool('todos');
              setSelectedCategory('Todos');
            }}
            className={`flex-1 py-3 px-4 rounded-2xl text-xs font-bold transition-all cursor-pointer flex items-center justify-center gap-2 ${
              activeSchool === 'todos'
                ? 'bg-slate-800 text-white shadow-lg border border-white/20'
                : 'text-slate-400 hover:text-white hover:bg-white/5'
            }`}
          >
            <Sparkles size={15} className="text-teal-400" />
            <span>Todos los Cursos</span>
          </button>

          {/* Opción 2: Escuela de Seguridad Privada */}
          <button
            onClick={() => {
              setActiveSchool('seguridad');
              setSelectedCategory('Todos');
            }}
            className={`flex-[1.4] py-3.5 px-4 rounded-2xl text-xs font-black transition-all cursor-pointer flex items-center justify-center gap-2 border ${
              activeSchool === 'seguridad'
                ? 'bg-gradient-to-r from-[#0284c7] to-sky-600 text-white border-sky-300 shadow-xl shadow-sky-950/60'
                : 'text-slate-300 hover:text-white bg-[#151619] border-white/5 hover:border-sky-500/30'
            }`}
          >
            <Shield size={16} className="text-cyan-300" />
            <span>Escuela de Seguridad Privada</span>
            <span className="text-[10px] bg-sky-950/80 text-sky-200 px-2 py-0.5 rounded-full border border-sky-400/40">SPD</span>
          </button>

          {/* Opción 3: Escuela de Oficios */}
          <button
            onClick={() => {
              setActiveSchool('oficios');
              setSelectedCategory('Todos');
            }}
            className={`flex-[1.4] py-3.5 px-4 rounded-2xl text-xs font-black transition-all cursor-pointer flex items-center justify-center gap-2 border ${
              activeSchool === 'oficios'
                ? 'bg-gradient-to-r from-amber-500 to-orange-600 text-gray-950 border-amber-300 shadow-xl shadow-amber-950/60'
                : 'text-slate-300 hover:text-white bg-[#151619] border-white/5 hover:border-amber-500/30'
            }`}
          >
            <Wrench size={16} className="text-amber-400" />
            <span>Escuela de Oficios</span>
            <span className="text-[10px] bg-amber-950/80 text-amber-300 px-2 py-0.5 rounded-full border border-amber-400/40">30 Días</span>
          </button>
        </motion.div>

        {/* 2. Sub-Filter Pills por Área/Categoría */}
        <motion.div 
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="flex flex-wrap items-center justify-center gap-2 pt-2"
        >
          {categories.map((cat) => (
            <motion.button
              key={cat}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setSelectedCategory(cat)}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer border ${
                selectedCategory === cat
                  ? 'bg-gradient-to-r from-[#00c2b2] to-teal-400 text-gray-950 border-teal-300 shadow-lg shadow-teal-500/25'
                  : 'bg-[#121315]/80 text-slate-300 hover:text-white hover:bg-slate-800/80 border-white/10 hover:border-cyan-500/30'
              }`}
            >
              {cat}
            </motion.button>
          ))}
        </motion.div>

        {/* 3. Grid de Cursos Responsivo */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          <AnimatePresence mode="popLayout">
            {finalCourses.map((course) => (
              <motion.div
                key={course.id}
                layout
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.3 }}
                whileHover={{ y: -6, scale: 1.015 }}
                className="rounded-3xl overflow-hidden bg-gradient-to-b from-[#16171a] to-[#111214] border border-white/10 shadow-xl hover:shadow-2xl hover:shadow-cyan-500/15 hover:border-cyan-500/40 transition-all duration-300 flex flex-col justify-between group"
              >
                <div>
                  {/* 1. Cover Visual */}
                  <CourseCover item={course} />

                  {/* 2. Course Title & Badges */}
                  <div className="p-6 space-y-3">
                    <div className="flex items-center justify-between gap-2">
                      <span className="text-[11px] font-semibold text-slate-400 flex items-center gap-1">
                        <Clock size={12} className="text-[#00c2b2]" />
                        <span>{course.duration}</span>
                      </span>
                      {course.highlight && (
                        <span className="text-[10px] font-bold text-emerald-300 bg-emerald-950/80 px-2 py-0.5 rounded-full border border-emerald-500/30">
                          {course.highlight}
                        </span>
                      )}
                    </div>

                    <h3 className="text-sm sm:text-base font-bold text-white leading-snug group-hover:text-[#00c2b2] transition-colors line-clamp-3">
                      {course.title}
                    </h3>
                  </div>
                </div>

                {/* 3. Price & Action Row */}
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
        </div>

        {/* 4. SENCE Tramos & Beneficios de Franquicia Tributaria */}
        <SenceTramosSection />

      </div>
    </section>
  );
};

export default Services;
