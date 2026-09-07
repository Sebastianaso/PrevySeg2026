import React, { useState, useEffect, useRef } from 'react';
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

// New Generated Course Images
import conflictImg from '../assets/images/course_conflict_resolution_1788545038374.jpg';
import portImg from '../assets/images/course_port_security_1788545050484.jpg';
import cyberImg from '../assets/images/course_cybersecurity_1788545064007.jpg';
import forkliftImg from '../assets/images/course_forklift_1788545102116.jpg';
import logisticsImg from '../assets/images/course_logistics_1788545116792.jpg';
import electricalImg from '../assets/images/course_electrical_1788545127954.jpg';
import weldingImg from '../assets/images/course_welding_1788545200802.jpg';
import solarImg from '../assets/images/course_solar_1788545243947.jpg';
import mechanicImg from '../assets/images/course_mechanic_1788545261840.jpg';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import SenceTramosSection from './SenceTramosSection';

gsap.registerPlugin(ScrollTrigger);

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
    image: conflictImg,
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
    image: portImg,
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
    image: cyberImg,
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
    image: forkliftImg,
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
    image: logisticsImg,
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
    image: electricalImg,
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
    image: weldingImg,
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
    image: solarImg,
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
    image: mechanicImg,
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

  const sectionRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Header Animation
      gsap.fromTo('.services-header',
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 0.8, ease: 'power3.out', scrollTrigger: { trigger: '.services-header', start: 'top 85%', once: true } }
      );

      // School Selector Animation
      gsap.fromTo('.services-school-selector',
        { opacity: 0, scale: 0.95, y: 20 },
        { opacity: 1, scale: 1, y: 0, duration: 0.6, delay: 0.2, ease: 'back.out(1.2)', scrollTrigger: { trigger: '.services-header', start: 'top 85%', once: true } }
      );

      // Categories Animation
      gsap.fromTo('.services-category-pill',
        { opacity: 0, y: 15 },
        { opacity: 1, y: 0, duration: 0.4, stagger: 0.05, ease: 'power2.out', scrollTrigger: { trigger: '.services-school-selector', start: 'top 90%', once: true } }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section id="servicios" ref={sectionRef} className="py-24 px-4 sm:px-8 bg-white relative border-t border-slate-100 overflow-hidden">
      
      {/* Decorative Blur Backgrounds */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-brand-DEFAULT/5 rounded-full blur-[100px] pointer-events-none -translate-y-1/2 translate-x-1/2" />
      <div className="absolute top-40 left-0 w-[400px] h-[400px] bg-teal-vibrant/5 rounded-full blur-[80px] pointer-events-none -translate-x-1/2" />

      <div className="max-w-7xl mx-auto space-y-12 relative z-10">
        
        {/* Section Header */}
        {/* Section Header */}
        <div className="services-header text-center max-w-3xl mx-auto space-y-6">
          <div className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-brand-DEFAULT/10 border border-brand-DEFAULT/20 text-brand-DEFAULT text-xs font-black tracking-widest uppercase shadow-sm">
            <Shield size={14} />
            <span>Oferta Académica & Formación Acreditada SENCE</span>
          </div>
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-navy-dark tracking-tight leading-[1.1]">
            Programas y <br className="hidden sm:block" />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-DEFAULT to-teal-vibrant">
              Especializaciones
            </span>
          </h2>
          <p className="text-slate-500 text-lg sm:text-xl leading-relaxed max-w-2xl mx-auto font-medium">
            Formación intensiva de rápida empleabilidad para combatir la desocupación regional en Arica y la Macro Zona Norte.
          </p>
        </div>

        {/* 1. MÓDULO A: SELECTOR PRINCIPAL DE ESCUELA (Seguridad Privada vs Escuela de Oficios) */}
        {/* 1. MÓDULO A: SELECTOR PRINCIPAL DE ESCUELA (Seguridad Privada vs Escuela de Oficios) */}
        <div className="services-school-selector max-w-3xl mx-auto p-2 bg-slate-50/80 backdrop-blur-md rounded-3xl border border-slate-200/60 shadow-xl shadow-slate-200/50 flex flex-col sm:flex-row gap-2 relative">
          
          {/* Active Highlight Pill Background */}
          <div 
            className="absolute top-2 bottom-2 rounded-2xl transition-all duration-500 ease-out hidden sm:block bg-white shadow-md border border-slate-100"
            style={{
              width: activeSchool === 'todos' ? '25%' : (activeSchool === 'seguridad' ? '37.5%' : '37.5%'),
              left: activeSchool === 'todos' ? '0.5rem' : (activeSchool === 'seguridad' ? 'calc(25% + 0.75rem)' : 'calc(62.5% + 1rem)'),
            }}
          />

          {/* Opción 1: Todos */}
          <button
            onClick={() => {
              setActiveSchool('todos');
              setSelectedCategory('Todos');
            }}
            className={`relative z-10 sm:w-1/4 py-3.5 px-4 rounded-2xl text-xs font-bold transition-all duration-300 cursor-pointer flex items-center justify-center gap-2 ${
              activeSchool === 'todos'
                ? 'text-brand-DEFAULT sm:bg-transparent bg-white shadow-md sm:shadow-none sm:border-transparent border border-slate-200'
                : 'text-slate-500 hover:text-slate-800'
            }`}
          >
            <Sparkles size={16} className={activeSchool === 'todos' ? 'text-brand-DEFAULT' : 'text-slate-400'} />
            <span>Todos</span>
          </button>

          {/* Opción 2: Escuela de Seguridad Privada */}
          <button
            onClick={() => {
              setActiveSchool('seguridad');
              setSelectedCategory('Todos');
            }}
            className={`relative z-10 sm:w-[37.5%] py-3.5 px-4 rounded-2xl text-xs font-black transition-all duration-300 cursor-pointer flex items-center justify-center gap-2 ${
              activeSchool === 'seguridad'
                ? 'text-navy-dark sm:bg-transparent bg-white shadow-md sm:shadow-none sm:border-transparent border border-slate-200'
                : 'text-slate-500 hover:text-slate-800'
            }`}
          >
            <Shield size={16} className={activeSchool === 'seguridad' ? 'text-brand-DEFAULT' : 'text-slate-400'} />
            <span>Escuela de Seguridad</span>
            <span className={`text-[9px] px-2 py-0.5 rounded-full border transition-colors ${
              activeSchool === 'seguridad'
                ? 'bg-brand-DEFAULT/10 text-brand-DEFAULT border-brand-DEFAULT/20'
                : 'bg-slate-100 text-slate-400 border-slate-200'
            }`}>SPD</span>
          </button>

          {/* Opción 3: Escuela de Oficios */}
          <button
            onClick={() => {
              setActiveSchool('oficios');
              setSelectedCategory('Todos');
            }}
            className={`relative z-10 sm:w-[37.5%] py-3.5 px-4 rounded-2xl text-xs font-black transition-all duration-300 cursor-pointer flex items-center justify-center gap-2 ${
              activeSchool === 'oficios'
                ? 'text-amber-600 sm:bg-transparent bg-white shadow-md sm:shadow-none sm:border-transparent border border-slate-200'
                : 'text-slate-500 hover:text-slate-800'
            }`}
          >
            <Wrench size={16} className={activeSchool === 'oficios' ? 'text-amber-500' : 'text-slate-400'} />
            <span>Escuela de Oficios</span>
            <span className={`text-[9px] px-2 py-0.5 rounded-full border transition-colors ${
              activeSchool === 'oficios'
                ? 'bg-amber-100 text-amber-700 border-amber-200'
                : 'bg-slate-100 text-slate-400 border-slate-200'
            }`}>30 Días</span>
          </button>
        </div>

        {/* 2. Sub-Filter Pills por Área/Categoría */}
        {/* 2. Sub-Filter Pills por Área/Categoría */}
        <div className="flex flex-wrap items-center justify-center gap-2 pt-2 relative z-10">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`services-category-pill px-5 py-2.5 rounded-xl text-xs font-bold transition-all duration-300 cursor-pointer border ${
                selectedCategory === cat
                  ? 'bg-navy-dark text-white border-navy-dark shadow-lg shadow-navy-dark/20 scale-105'
                  : 'bg-white text-slate-500 border-slate-200 hover:border-slate-300 hover:text-slate-800 hover:bg-slate-50 hover:shadow-sm'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

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
                className="rounded-3xl overflow-hidden bg-white border border-slate-200 shadow-md hover:shadow-2xl hover:border-brand-light/50 transition-all duration-300 flex flex-col justify-between group"
              >
                <div>
                  {/* 1. Cover Visual */}
                  <CourseCover item={course} />

                  {/* 2. Course Title & Badges */}
                  <div className="p-6 space-y-3">
                    <div className="flex items-center justify-between gap-2">
                      <span className="text-[11px] font-semibold text-slate-500 flex items-center gap-1">
                        <Clock size={12} className="text-[#0284c7]" />
                        <span>{course.duration}</span>
                      </span>
                      {course.highlight && (
                        <span className="text-[10px] font-bold text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200">
                          {course.highlight}
                        </span>
                      )}
                    </div>

                    <h3 className="text-sm sm:text-base font-bold text-navy-dark leading-snug group-hover:text-brand-DEFAULT transition-colors line-clamp-3">
                      {course.title}
                    </h3>
                  </div>
                </div>

                {/* 3. Price & Action Row */}
                <div className="p-6 pt-4 border-t border-slate-100 bg-slate-50/70 flex items-center justify-between gap-3">
                  <div>
                    <div className="text-[10px] uppercase font-bold tracking-wider text-slate-500">
                      Arancel Oficial:
                    </div>
                    <div className="text-lg sm:text-xl font-black text-brand-DEFAULT tracking-tight">
                      {course.price}
                    </div>
                    <div className="text-[11px] font-semibold text-emerald-600">
                      {course.priceDetail}
                    </div>
                  </div>

                  <motion.button
                    whileHover={{ scale: 1.05, boxShadow: '0 0 15px rgba(2, 132, 199, 0.3)' }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => onSelectCourse(course.title)}
                    className="bg-gradient-to-r from-brand-DEFAULT to-brand-dark hover:from-brand-light hover:to-brand-DEFAULT text-white text-xs font-bold py-2.5 px-4 rounded-xl shadow-md flex items-center gap-1.5 transition-all cursor-pointer flex-shrink-0 group/btn border border-brand-light/30"
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
