import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Award, 
  Calendar, 
  Clock, 
  DollarSign, 
  CheckCircle2, 
  Sparkles, 
  ArrowRight, 
  BookOpen, 
  ShieldCheck, 
  Tag, 
  Search, 
  X,
  CreditCard
} from 'lucide-react';
import cctvOperatorImg from '../../assets/images/cctv_operator.jpg';
import securityGuardsImg from '../../assets/images/security_guards.jpg';
import securitySupervisorImg from '../../assets/images/security_supervisor.jpg';
import blogCctvImg from '../../assets/images/blog_cctv.jpg';
import blogPortImg from '../../assets/images/blog_port_security.jpg';

// Dynamic Pattern Cover Component matching Moodle LMS screenshots
const ExtraCourseCover = ({ item }) => {
  if (item.image) {
    return (
      <div className="relative aspect-[16/10] overflow-hidden bg-slate-100">
        <img 
          src={item.image} 
          alt={item.title} 
          className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-500"
          loading="lazy"
        />
        {/* Category Badge Top-Left */}
        <div className="absolute top-3 left-3 z-10">
          <span className="inline-block bg-[#0284c7] text-white text-[11px] font-bold px-3 py-1 rounded-md shadow-md">
            {item.category}
          </span>
        </div>

        {/* Highlight Tag Top-Right */}
        <div className="absolute top-3 right-3 z-10">
          <span className="bg-emerald-50 text-emerald-700 text-[10px] font-bold px-2.5 py-0.5 rounded-full border border-emerald-200 shadow-sm">
            {item.highlight}
          </span>
        </div>
      </div>
    );
  }

  let patternBg = 'bg-slate-100';
  let patternSvg = null;

  if (item.coverType === 'pattern-grey') {
    patternBg = 'bg-gradient-to-br from-slate-100 via-slate-200 to-slate-300';
    patternSvg = (
      <svg className="absolute inset-0 w-full h-full opacity-30" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <pattern id="extra-poly-grey" width="60" height="60" patternUnits="userSpaceOnUse">
            <polygon points="0,0 30,0 15,30" fill="#94a3b8" opacity="0.3" />
            <polygon points="30,0 60,0 45,30" fill="#cbd5e1" opacity="0.2" />
            <polygon points="15,30 45,30 30,60" fill="#64748b" opacity="0.4" />
            <polygon points="45,30 75,30 60,60" fill="#94a3b8" opacity="0.3" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#extra-poly-grey)" />
      </svg>
    );
  } else if (item.coverType === 'pattern-blue-circles') {
    patternBg = 'bg-gradient-to-br from-sky-100 via-blue-200 to-sky-300';
    patternSvg = (
      <svg className="absolute inset-0 w-full h-full opacity-35" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <pattern id="extra-circles-blue" width="50" height="50" patternUnits="userSpaceOnUse">
            <circle cx="25" cy="25" r="20" fill="none" stroke="#0284c7" strokeWidth="4" opacity="0.4" />
            <circle cx="25" cy="25" r="10" fill="none" stroke="#0284c7" strokeWidth="3" opacity="0.5" />
            <circle cx="0" cy="0" r="15" fill="none" stroke="#0284c7" strokeWidth="4" opacity="0.3" />
            <circle cx="50" cy="50" r="15" fill="none" stroke="#0284c7" strokeWidth="4" opacity="0.3" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#extra-circles-blue)" />
      </svg>
    );
  } else if (item.coverType === 'pattern-pink') {
    patternBg = 'bg-gradient-to-br from-rose-100 via-pink-200 to-rose-300';
    patternSvg = (
      <svg className="absolute inset-0 w-full h-full opacity-35" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <pattern id="extra-tri-pink" width="40" height="40" patternUnits="userSpaceOnUse">
            <polygon points="0,0 40,0 20,40" fill="#e11d48" opacity="0.25" />
            <polygon points="20,40 60,40 40,80" fill="#e11d48" opacity="0.15" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#extra-tri-pink)" />
      </svg>
    );
  } else {
    patternBg = 'bg-gradient-to-br from-slate-100 via-slate-200 to-slate-300';
  }

  return (
    <div className={`relative aspect-[16/10] overflow-hidden ${patternBg} flex items-center justify-center`}>
      {patternSvg}
      {/* Category Badge Top-Left */}
      <div className="absolute top-3 left-3 z-10">
        <span className="inline-block bg-[#0284c7] text-white text-[11px] font-bold px-3 py-1 rounded-md shadow-md">
          {item.category}
        </span>
      </div>

      {/* Highlight Tag Top-Right */}
      <div className="absolute top-3 right-3 z-10">
        <span className="bg-emerald-50 text-emerald-700 text-[10px] font-bold px-2.5 py-0.5 rounded-full border border-emerald-200 shadow-sm">
          {item.highlight}
        </span>
      </div>
    </div>
  );
};

export const EXTRA_COURSES_DATA = [
  {
    id: 'extra-01',
    title: '_2_66_2026 Resolución de Conflictos y Manejo de Situaciones Difíciles Código Sence: 1238088725',
    category: 'Seguridad Privada',
    coverType: 'pattern-grey',
    price: '$85.000 CLP',
    priceNumber: 85000,
    priceDetail: 'o Franquicia SENCE 100%',
    days: 'Lunes y Miércoles',
    hours: '19:00 a 22:00 hrs',
    startDate: '15 Septiembre, 2026',
    endDate: '15 Octubre, 2026',
    totalHours: '24 Horas Sincrónicas',
    senceCode: 'Cod. SENCE: 1238088725',
    highlight: 'SENCE 2026',
    status: 'Disponible'
  },
  {
    id: 'extra-02',
    title: 'Operador de Central de Cámaras de Televigilancia. C.C.T.V.',
    category: 'Seguridad Privada',
    image: cctvOperatorImg,
    price: '$140.000 CLP',
    priceNumber: 140000,
    priceDetail: 'Certificación Oficial SPD (Subsecretaría de Prevención del Delito)',
    days: 'Sábados Intensivo',
    hours: '09:00 a 14:00 hrs',
    startDate: '05 Octubre, 2026',
    endDate: '07 Noviembre, 2026',
    totalHours: '40 Horas Teórico-Prácticas',
    senceCode: 'Cod. SENCE: 1-56',
    highlight: 'Alta Demanda',
    status: 'Disponible'
  },
  {
    id: 'extra-03',
    title: 'Curso de formación Guardia de Seguridad',
    category: 'Seguridad Privada',
    image: securityGuardsImg,
    price: '$120.000 CLP',
    priceNumber: 120000,
    priceDetail: 'Acreditado SPD (Subsecretaría de Prevención del Delito)',
    days: 'Lunes a Viernes',
    hours: '18:00 a 22:00 hrs',
    startDate: '12 Octubre, 2026',
    endDate: '12 Noviembre, 2026',
    totalHours: '90 Horas Cronológicas',
    senceCode: 'Acreditado SPD (Subsecretaría de Prevención del Delito)',
    highlight: 'Online SENCE',
    status: 'Disponible'
  },
  {
    id: 'extra-04',
    title: 'Formación de Supervisor de Seguridad Privada *ONLINE*',
    category: 'Seguridad Privada',
    image: securitySupervisorImg,
    price: '$180.000 CLP',
    priceNumber: 180000,
    priceDetail: 'Nivel Superior y Gestión SPD (Subsecretaría de Prevención del Delito)',
    days: 'Martes y Viernes',
    hours: '19:00 a 22:00 hrs',
    startDate: '20 Octubre, 2026',
    endDate: '30 Noviembre, 2026',
    totalHours: '60 Horas',
    senceCode: 'Nivel Superior SPD',
    highlight: 'Liderazgo & Gestión',
    status: 'Disponible'
  },
  {
    id: 'extra-05',
    title: 'Capacitación ITIC',
    category: 'Sistemas internos',
    coverType: 'pattern-pink',
    price: '$75.000 CLP',
    priceNumber: 75000,
    priceDetail: 'Tecnologías de Información',
    days: 'Jueves',
    hours: '19:00 a 22:00 hrs',
    startDate: '10 Noviembre, 2026',
    endDate: '01 Diciembre, 2026',
    totalHours: '20 Horas',
    senceCode: 'TI Interno',
    highlight: 'Uso Interno',
    status: 'Disponible'
  },
  {
    id: 'extra-06',
    title: 'Asistencia Curso - Código Sence: 1238087964 ID Acción: 6731273',
    category: 'Asistencias',
    coverType: 'pattern-grey',
    price: '$60.000 CLP',
    priceNumber: 60000,
    priceDetail: 'Módulo de Registro y Control',
    days: 'Flexible',
    hours: 'Asincrónico',
    startDate: 'Disponible Todo el Año',
    endDate: 'Flexible',
    totalHours: 'Módulo SENCE',
    senceCode: 'ID Acción: 6731273',
    highlight: 'Asistencia SENCE',
    status: 'Disponible'
  }
];

const ExtraCoursesView = ({ currentUser }) => {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('Todos');
  const [selectedCourseForModal, setSelectedCourseForModal] = useState(null);
  const [enrollSuccess, setEnrollSuccess] = useState(false);

  const categories = ['Todos', 'Seguridad Privada', 'Sistemas internos', 'Asistencias'];

  useEffect(() => {
    // Simulando carga desde endpoint / Base de datos
    setTimeout(() => {
      setCourses(EXTRA_COURSES_DATA);
      setLoading(false);
    }, 200);
  }, []);

  const filtered = courses.filter(c => {
    const matchesSearch = c.title.toLowerCase().includes(search.toLowerCase()) || 
                          c.category.toLowerCase().includes(search.toLowerCase());
    const matchesCategory = selectedCategory === 'Todos' || c.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const handleEnrollSubmit = (e) => {
    e.preventDefault();
    setEnrollSuccess(true);
    setTimeout(() => {
      setEnrollSuccess(false);
      setSelectedCourseForModal(null);
      alert(`¡Inscripción exitosa en ${selectedCourseForModal.title}! Se ha enviado la confirmación y el cupón de pago a tu correo institucional.`);
    }, 1200);
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-200">
      
      {/* Encabezado Principal */}
      <div className="bg-gradient-to-r from-sky-50 via-teal-50 to-white p-6 sm:p-8 rounded-3xl border border-sky-200 shadow-sm flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
        <div className="space-y-2">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-sky-100 text-[#0284c7] text-xs font-bold border border-sky-200">
            <Sparkles size={14} />
            <span>Catálogo Exclusivo para Alumnos PrevySeg</span>
          </div>
          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-slate-900 tracking-tight">
            Capacitaciones y Certificaciones Extras
          </h1>
          <p className="text-xs sm:text-sm text-slate-600 max-w-2xl leading-relaxed">
            Amplía tu currículum y perfil profesional con cursos de especialización técnica complementaria. Aplica a beneficios SENCE y descuentos preferenciales para alumnos.
          </p>
        </div>

        {/* Buscador de cursos */}
        <div className="relative w-full md:w-72">
          <input
            type="text"
            placeholder="Buscar por curso o código SENCE..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full bg-white border border-slate-300 rounded-xl pl-10 pr-4 py-2.5 text-xs sm:text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:border-[#0284c7] shadow-sm"
          />
          <Search size={16} className="absolute left-3.5 top-3 text-slate-400" />
        </div>
      </div>

      {/* Filter Categories Bar */}
      <div className="flex flex-wrap items-center gap-2">
        {categories.map((cat) => (
          <motion.button
            key={cat}
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            onClick={() => setSelectedCategory(cat)}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer border ${
              selectedCategory === cat
                ? 'bg-[#00c2b2] text-white border-transparent shadow-sm'
                : 'bg-white text-slate-700 hover:text-slate-900 hover:bg-slate-50 border-slate-200'
            }`}
          >
            {cat}
          </motion.button>
        ))}
      </div>

      {/* Grid de Tarjetas de Cursos Extras con Skeleton Loader */}
      {loading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {[1, 2, 3, 4, 5, 6].map((sk) => (
            <div key={sk} className="bg-white rounded-3xl overflow-hidden border border-slate-200 p-4 space-y-4 animate-pulse shadow-sm">
              <div className="aspect-[16/10] bg-slate-100 rounded-2xl w-full" />
              <div className="h-4 bg-slate-200 rounded w-3/4" />
              <div className="h-3 bg-slate-200 rounded w-1/2" />
              <div className="pt-4 flex justify-between items-center border-t border-slate-100">
                <div className="h-5 bg-slate-200 rounded w-20" />
                <div className="h-8 bg-slate-200 rounded-xl w-24" />
              </div>
            </div>
          ))}
        </div>
      ) : (
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.4 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8"
        >
          {filtered.map((course, idx) => (
            <motion.div
              key={course.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.35, delay: idx * 0.07 }}
              whileHover={{ y: -6 }}
              className="bg-white rounded-3xl overflow-hidden border border-slate-200 hover:border-sky-400 hover:shadow-lg transition-all duration-300 shadow-sm flex flex-col justify-between group"
            >
              <div>
                {/* 1. Cover Visual */}
                <ExtraCourseCover item={course} />

                {/* 2. Course Title */}
                <div className="p-6">
                  <h3 className="text-sm sm:text-base font-bold text-slate-900 group-hover:text-[#0284c7] transition-colors leading-snug line-clamp-3">
                    {course.title}
                  </h3>
                </div>
              </div>

              {/* 3. Bottom Price & Enrollment Button */}
              <div className="p-6 pt-3 border-t border-slate-100 bg-slate-50/50 flex items-center justify-between gap-3">
                <div>
                  <div className="text-[10px] uppercase font-bold tracking-wider text-slate-500">
                    Valor Alumno:
                  </div>
                  <div className="text-lg sm:text-xl font-black text-teal-700 tracking-tight">
                    {course.price}
                  </div>
                  <div className="text-[11px] font-semibold text-emerald-700">
                    {course.priceDetail}
                  </div>
                </div>

                <motion.button
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  onClick={() => setSelectedCourseForModal(course)}
                  className="bg-gradient-to-r from-[#0284c7] to-[#0369a1] hover:from-sky-600 hover:to-sky-700 text-white text-xs font-bold py-2.5 px-4 rounded-xl shadow-md flex items-center gap-1.5 transition-all cursor-pointer flex-shrink-0 group/btn"
                >
                  <span>Inscribirme</span>
                  <ArrowRight size={14} className="group-hover/btn:translate-x-1 transition-transform" />
                </motion.button>
              </div>
            </motion.div>
          ))}
        </motion.div>
      )}

      {/* MODAL INTERACTIVO DE INSCRIPCIÓN & PAGO PARA EL ALUMNO */}
      <AnimatePresence>
        {selectedCourseForModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
          <motion.div 
            initial={{ opacity: 0, scale: 0.92, y: 15 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.92, y: 15 }}
            transition={{ duration: 0.25 }}
            className="bg-white border border-slate-200 w-full max-w-xl rounded-3xl shadow-2xl overflow-hidden p-6 sm:p-8 relative max-h-[92vh] overflow-y-auto"
          >
            <motion.button
              whileHover={{ scale: 1.1, rotate: 90 }}
              whileTap={{ scale: 0.9 }}
              onClick={() => setSelectedCourseForModal(null)}
              className="absolute top-4 right-4 text-slate-400 hover:text-slate-700 p-2 rounded-full hover:bg-slate-100 transition-colors z-10 cursor-pointer"
            >
              <X size={20} />
            </motion.button>

            {enrollSuccess ? (
              <div className="py-12 text-center space-y-4">
                <div className="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto animate-bounce">
                  <CheckCircle2 size={36} />
                </div>
                <h3 className="text-2xl font-black text-slate-900">¡Inscripción Confirmada!</h3>
                <p className="text-xs sm:text-sm text-slate-600 max-w-sm mx-auto">
                  Has sido matriculado satisfactoriamente en <strong className="text-slate-900">{selectedCourseForModal.title}</strong>.
                </p>
              </div>
            ) : (
              <form onSubmit={handleEnrollSubmit} className="space-y-6">
                <div>
                  <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-sky-50 text-[#0284c7] text-[11px] font-bold border border-sky-200 mb-2">
                    <Tag size={12} />
                    <span>{selectedCourseForModal.category}</span>
                  </div>
                  <h2 className="text-lg sm:text-xl font-black text-slate-900 leading-snug">
                    {selectedCourseForModal.title}
                  </h2>
                </div>

                {/* Price Summary Banner */}
                <div className="p-4 rounded-xl bg-gradient-to-r from-sky-50 to-teal-50 border border-sky-200 flex items-center justify-between">
                  <div>
                    <span className="text-[11px] text-slate-500 font-semibold block uppercase">Arancel con Descuento Alumno</span>
                    <span className="text-2xl font-black text-teal-700">{selectedCourseForModal.price}</span>
                  </div>
                  <div className="text-right">
                    <span className="text-[11px] text-emerald-700 font-bold block">✓ Código SENCE Activo</span>
                    <span className="text-[11px] text-slate-500">{selectedCourseForModal.totalHours}</span>
                  </div>
                </div>

                {/* Info Grid */}
                <div className="grid grid-cols-2 gap-3 text-xs bg-slate-50 p-4 rounded-xl border border-slate-200">
                  <div className="space-y-1">
                    <span className="text-slate-500 block font-semibold">Horario de Clases:</span>
                    <span className="text-slate-900 font-medium">{selectedCourseForModal.days} ({selectedCourseForModal.hours})</span>
                  </div>
                  <div className="space-y-1">
                    <span className="text-slate-500 block font-semibold">Fecha de Inicio:</span>
                    <span className="text-slate-900 font-medium">{selectedCourseForModal.startDate}</span>
                  </div>
                </div>

                {/* Student info */}
                <div className="space-y-3 pt-2">
                  <div className="text-xs font-bold text-slate-700 uppercase tracking-wider">
                    Datos del Postulante:
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                    <div className="bg-slate-50 p-2.5 rounded-lg border border-slate-200">
                      <span className="text-slate-500 block text-[10px]">Nombre Alumno</span>
                      <span className="text-slate-900 font-bold">{currentUser?.nombre || 'Matías Silva Lagos'}</span>
                    </div>
                    <div className="bg-slate-50 p-2.5 rounded-lg border border-slate-200">
                      <span className="text-slate-500 block text-[10px]">RUT Alumno</span>
                      <span className="text-slate-900 font-mono font-bold">{currentUser?.user || '21778425-6'}</span>
                    </div>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="pt-4 border-t border-slate-200 flex justify-end gap-3">
                  <button
                    type="button"
                    onClick={() => setSelectedCourseForModal(null)}
                    className="px-4 py-2.5 rounded-xl border border-slate-200 text-slate-700 hover:bg-slate-50 text-xs font-semibold cursor-pointer transition-colors"
                  >
                    Cancelar
                  </button>
                  <motion.button
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.97 }}
                    type="submit"
                    className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-[#00c2b2] to-teal-500 hover:from-teal-500 hover:to-teal-600 text-white text-xs font-black shadow-md flex items-center gap-2 cursor-pointer"
                  >
                    <CheckCircle2 size={16} />
                    <span>Confirmar Postulación</span>
                  </motion.button>
                </div>
              </form>
            )}
          </motion.div>
        </div>
      )}
      </AnimatePresence>

    </div>
  );
};

export default ExtraCoursesView;
