import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Calendar, 
  Search, 
  ChevronDown, 
  ClipboardList, 
  Clock, 
  BookOpen, 
  ArrowRight, 
  MoreVertical,
  CheckCircle2,
  CalendarCheck2,
  Flame,
  Award,
  Sparkles
} from 'lucide-react';
import heroGrad from '../../assets/images/hero_graduation.jpg';
import promoImg from '../../assets/images/security_promo.jpg';
import blogCctv from '../../assets/images/blog_cctv.jpg';

const PersonalAreaView = ({ onSelectCourse }) => {
  const [filterTimeframe, setFilterTimeframe] = useState('7dias');
  const [filterSort, setFilterSort] = useState('fecha');
  const [searchActivity, setSearchActivity] = useState('');

  // Cursos accedidos recientemente
  const recentCourses = [
    {
      id: 'crs-spd-formacion',
      title: 'Curso de Formación de Guardias de Seguridad - SPD (Subsecretaría de Prevención del Delito)',
      category: 'Seguridad Privada',
      code: 'SENCE: 123800456',
      progress: 85,
      lastAccess: 'Hace 15 minutos',
      image: heroGrad,
    },
    {
      id: 'crs-cctv-tecnologia',
      title: 'Técnicas de Operación de Circuitos Cerrados de TV (CCTV)',
      category: 'Tecnología & Sistemas',
      code: 'SENCE: 123800992',
      progress: 40,
      lastAccess: 'Ayer a las 17:30',
      image: blogCctv,
    },
    {
      id: 'crs-spd-perfeccionamiento',
      title: 'Perfeccionamiento de Guardias de Seguridad - SPD (Subsecretaría de Prevención del Delito)',
      category: 'Perfeccionamiento',
      code: 'SENCE: 123800789',
      progress: 100,
      lastAccess: 'Hace 3 días',
      image: promoImg,
    },
  ];

  return (
    <div className="space-y-8">
      
      {/* 1. Encabezado: Título grande "Área personal" */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-white tracking-tight">
            Área personal
          </h1>
          <p className="text-xs sm:text-sm text-slate-400 mt-1">
            Resumen de actividades formativas, evaluaciones pendientes y cursos en curso.
          </p>
        </div>

        {/* Badge de estado SENCE */}
        <div className="flex items-center gap-2 bg-emerald-950/80 border border-emerald-500/40 text-emerald-300 text-xs font-semibold px-4 py-2 rounded-full shadow-lg shadow-emerald-950/40 backdrop-blur-md">
          <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse"></span>
          <span>Matrícula SENCE Activa 2026</span>
        </div>
      </div>

      {/* Banner de Certificado Oficial Emitido */}
      <motion.div 
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="bg-gradient-to-r from-emerald-950/90 via-[#131416] to-[#121315] border border-emerald-500/40 p-6 rounded-3xl flex flex-col sm:flex-row items-center justify-between gap-5 shadow-2xl backdrop-blur-xl"
      >
        <div className="flex items-center gap-4">
          <div className="w-14 h-14 rounded-2xl bg-emerald-500/20 border border-emerald-500/40 text-emerald-400 flex items-center justify-center flex-shrink-0 shadow-lg shadow-emerald-950/50">
            <Award size={30} />
          </div>
          <div className="space-y-1">
            <div className="text-xs font-bold text-emerald-300 uppercase tracking-wider flex items-center gap-1.5">
              <CheckCircle2 size={14} />
              <span>Certificado Oficial Emitido por Dirección Académica</span>
            </div>
            <h3 className="text-base sm:text-lg font-bold text-white">
              Curso de formación Guardia de Seguridad online (SPD - Subsecretaría de Prevención del Delito)
            </h3>
            <p className="text-xs text-slate-400">
              Acreditación oficial conforme al Decreto Ley N° 3.607 y normativa SPD. Tu copia digital está lista para descarga.
            </p>
          </div>
        </div>

        <motion.button
          whileHover={{ scale: 1.05, boxShadow: '0 0 20px rgba(2, 132, 199, 0.4)' }}
          whileTap={{ scale: 0.95 }}
          onClick={() => alert("Descargando copia oficial de Certificado y Diploma en PDF (Acreditado y Capacitado)...")}
          className="bg-gradient-to-r from-[#0284c7] to-[#0369a1] hover:from-sky-500 hover:to-sky-700 text-white text-xs font-bold px-5 py-3 rounded-xl shadow-lg flex items-center gap-2 cursor-pointer flex-shrink-0 transition-all border border-sky-400/30"
        >
          <Award size={15} />
          <span>Descargar Diploma Oficial</span>
        </motion.button>
      </motion.div>

      {/* 2. Contenedor Línea de Tiempo */}
      <motion.div 
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.45, delay: 0.1 }}
        className="bg-gradient-to-b from-[#151619] to-[#111214] rounded-3xl border border-white/10 p-6 sm:p-8 space-y-6 shadow-2xl backdrop-blur-xl"
      >
        <div className="flex items-center justify-between border-b border-white/10 pb-4">
          <h2 className="text-lg font-bold text-white tracking-wide flex items-center gap-2">
            <Clock size={18} className="text-[#0284c7]" />
            <span>Línea de tiempo</span>
          </h2>
          <span className="text-xs text-slate-400">Planificación de tareas y exámenes</span>
        </div>

        {/* Controles de filtrado */}
        <div className="grid grid-cols-1 sm:grid-cols-12 gap-3">
          
          {/* Desplegable 1: Próximos 7 días */}
          <div className="sm:col-span-3">
            <select
              value={filterTimeframe}
              onChange={(e) => setFilterTimeframe(e.target.value)}
              className="w-full bg-[#121315] border border-white/10 rounded-xl px-4 py-2.5 text-xs text-slate-200 focus:outline-none focus:ring-2 focus:ring-sky-500/40 focus:border-sky-500 transition-all"
            >
              <option value="7dias">Próximos 7 días</option>
              <option value="30dias">Próximos 30 días</option>
              <option value="3meses">Próximos 3 meses</option>
              <option value="todos">Todos los plazos</option>
            </select>
          </div>

          {/* Desplegable 2: Ordenar por fecha */}
          <div className="sm:col-span-3">
            <select
              value={filterSort}
              onChange={(e) => setFilterSort(e.target.value)}
              className="w-full bg-[#121315] border border-white/10 rounded-xl px-4 py-2.5 text-xs text-slate-200 focus:outline-none focus:ring-2 focus:ring-sky-500/40 focus:border-sky-500 transition-all"
            >
              <option value="fecha">Ordenar por fecha</option>
              <option value="cursos">Ordenar por cursos</option>
            </select>
          </div>

          {/* Barra de búsqueda */}
          <div className="sm:col-span-6 relative">
            <input
              type="text"
              placeholder="Buscar por tipo o nombre de actividad..."
              value={searchActivity}
              onChange={(e) => setSearchActivity(e.target.value)}
              className="w-full bg-[#121315] border border-white/10 rounded-xl pl-11 pr-4 py-2.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-sky-500/40 focus:border-sky-500 transition-all"
            />
            <Search size={15} className="absolute left-4 top-3 text-slate-400" />
          </div>

        </div>

        {/* Estado vacío (Empty State) */}
        <div className="py-16 px-4 text-center rounded-2xl bg-[#121315]/60 border border-white/10 flex flex-col items-center justify-center space-y-4 shadow-inner">
          <div className="w-16 h-16 rounded-2xl bg-slate-800/80 border border-white/10 text-slate-400 flex items-center justify-center shadow-inner">
            <ClipboardList size={32} className="text-slate-400 stroke-1" />
          </div>
          
          <div className="space-y-1">
            <h3 className="text-base font-bold text-slate-200">
              No hay cursos actuales
            </h3>
            <p className="text-xs text-slate-400 max-w-sm">
              No tienes actividades pendientes que requieran una acción inmediata en el plazo seleccionado.
            </p>
          </div>
        </div>
      </motion.div>

      {/* 3. Sección inferior: Cursos accedidos recientemente */}
      <div className="space-y-5 pt-2">
        <div className="flex items-center justify-between">
          <h2 className="text-lg sm:text-xl font-bold text-white tracking-wide flex items-center gap-2">
            <BookOpen size={20} className="text-[#00c2b2]" />
            <span>Cursos accedidos recientemente</span>
          </h2>
          <span className="text-xs text-slate-400 hidden sm:inline">Registro cronológico de tus aulas</span>
        </div>

        {/* Grid de Cursos Recientes con Framer Motion */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {recentCourses.map((course, idx) => (
            <motion.div
              key={course.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: idx * 0.08 }}
              whileHover={{ y: -5, scale: 1.015 }}
              onClick={() => onSelectCourse && onSelectCourse(course)}
              className="bg-gradient-to-b from-[#16171a] to-[#121315] rounded-3xl overflow-hidden border border-white/10 hover:border-cyan-500/40 hover:shadow-2xl hover:shadow-cyan-500/15 transition-all duration-300 shadow-xl flex flex-col justify-between group cursor-pointer"
            >
              {/* Imagen con badge */}
              <div className="relative aspect-[16/9] bg-slate-950 overflow-hidden">
                <img
                  src={course.image}
                  alt={course.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 opacity-80"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#121315] via-transparent to-black/40"></div>
                
                <div className="absolute top-3 left-3">
                  <span className="bg-[#0284c7] text-white text-[10px] font-black uppercase tracking-wider px-3 py-1 rounded-full shadow-md border border-white/15">
                    {course.category}
                  </span>
                </div>

                <div className="absolute bottom-2.5 right-2.5 text-[10px] bg-black/80 backdrop-blur-sm px-2.5 py-0.5 rounded-md text-slate-300 font-mono border border-white/10">
                  {course.code}
                </div>
              </div>

              {/* Contenido */}
              <div className="p-6 space-y-4 flex-1 flex flex-col justify-between">
                <div className="space-y-2">
                  <h3 className="text-sm sm:text-base font-bold text-white group-hover:text-[#38bdf8] transition-colors leading-snug line-clamp-2">
                    {course.title}
                  </h3>
                  <div className="text-xs text-slate-400 flex items-center gap-1.5">
                    <Clock size={13} className="text-slate-500" />
                    <span>Último acceso: {course.lastAccess}</span>
                  </div>
                </div>

                {/* Barra de progreso */}
                <div className="space-y-1.5 pt-3 border-t border-white/10">
                  <div className="flex justify-between text-xs font-semibold text-slate-400">
                    <span>Progreso curricular</span>
                    <span className="text-[#00c2b2] font-bold">{course.progress}%</span>
                  </div>
                  <div className="w-full h-2.5 bg-slate-800 rounded-full overflow-hidden p-0.5 border border-white/5">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${course.progress}%` }}
                      transition={{ duration: 0.8, ease: 'easeOut' }}
                      className={`h-full rounded-full ${
                        course.progress === 100 ? 'bg-gradient-to-r from-emerald-500 to-teal-400 shadow-sm shadow-emerald-400' : 'bg-gradient-to-r from-[#0284c7] to-cyan-400 shadow-sm shadow-sky-400'
                      }`}
                    ></motion.div>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

    </div>
  );
};

export default PersonalAreaView;
