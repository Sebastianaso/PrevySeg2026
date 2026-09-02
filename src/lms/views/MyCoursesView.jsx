import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Plus, 
  Settings, 
  Search, 
  ChevronDown, 
  MoreVertical, 
  BookOpen, 
  Clock, 
  CheckCircle, 
  FolderKanban, 
  LayoutGrid, 
  List as ListIcon, 
  AlignJustify,
  ExternalLink,
  Edit3
} from 'lucide-react';
import heroGrad from '../../assets/images/hero_graduation.jpg';
import promoImg from '../../assets/images/security_promo.jpg';
import blogCctv from '../../assets/images/blog_cctv.jpg';
import blogPort from '../../assets/images/blog_port_security.jpg';

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
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.4, ease: 'easeOut' }
  }
};

const MyCoursesView = ({ onSelectCourse, isEditMode }) => {
  const [statusFilter, setStatusFilter] = useState('todos');
  const [searchQuery, setSearchQuery] = useState('');
  const [sortOrder, setSortOrder] = useState('nombre');
  const [viewMode, setViewMode] = useState('tarjeta');
  const [activeCourseOptions, setActiveCourseOptions] = useState(null);

  const courses = [
    {
      id: 'crs-os10-01',
      title: 'Curso de Formación de Guardias de Seguridad - OS10 (SENCE: 123800456)',
      category: 'Seguridad Privada',
      senceCode: '123800456',
      progress: 85,
      status: 'en_progreso',
      cohort: 'Cohorte Agosto 2026 - Grupo Diurno A',
      instructor: 'Ashley Adaros',
      image: heroGrad,
    },
    {
      id: 'crs-os10-02',
      title: 'Perfeccionamiento de Guardias de Seguridad - OS10 (SENCE: 123800789)',
      category: 'Seguridad Privada',
      senceCode: '123800789',
      progress: 100,
      status: 'en_progreso',
      cohort: 'Cohorte Septiembre 2026',
      instructor: 'Sebastián Araya',
      image: promoImg,
    },
    {
      id: 'crs-cctv-03',
      title: 'Técnicas de Operación de Circuitos Cerrados de TV (CCTV) SENCE',
      category: 'Seguridad Privada',
      senceCode: '123800992',
      progress: 42,
      status: 'en_progreso',
      cohort: 'Especialización Tecnológica 2026',
      instructor: 'Ashley Adaros',
      image: blogCctv,
    },
    {
      id: 'crs-port-04',
      title: 'Guardia de Seguridad Marítimo Portuario Directemar Arica',
      category: 'Seguridad Privada',
      senceCode: '123801204',
      progress: 15,
      status: 'futuros',
      cohort: 'Terminal Puerto Arica 2026',
      instructor: 'Sebastián Araya',
      image: blogPort,
    },
  ];

  const filteredCourses = courses.filter((c) => {
    const matchesSearch = c.title.toLowerCase().includes(searchQuery.toLowerCase()) || c.senceCode.includes(searchQuery);
    const matchesStatus = statusFilter === 'todos' || c.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  return (
    <div className="space-y-8">
      
      {/* 1. Encabezado */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-white tracking-tight">
            Mis cursos
          </h1>
          <p className="text-xs sm:text-sm text-slate-400 mt-1">
            Visualiza y administra tus programas formativos activos y acreditados por SENCE.
          </p>
        </div>

        {/* Botones de acción a la derecha */}
        <div className="flex items-center gap-3 w-full sm:w-auto">
          <motion.button
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            onClick={() => alert("Abriendo panel de gestión y asignación de cohortes SENCE...")}
            className="flex-1 sm:flex-none border border-white/10 hover:border-white/20 hover:bg-white/5 text-slate-200 text-xs font-semibold px-4 py-2.5 rounded-xl transition-all cursor-pointer flex items-center justify-center gap-2 shadow-sm"
          >
            <Settings size={14} className="text-slate-400" />
            <span>Gestionar cursos</span>
          </motion.button>

          <motion.button
            whileHover={{ scale: 1.03, boxShadow: '0 0 20px rgba(2, 132, 199, 0.4)' }}
            whileTap={{ scale: 0.97 }}
            onClick={() => alert("Abriendo asistente para crear un nuevo curso...")}
            className="flex-1 sm:flex-none bg-gradient-to-r from-[#0284c7] to-[#0369a1] hover:from-sky-500 hover:to-sky-700 text-white text-xs font-bold px-5 py-2.5 rounded-xl shadow-lg shadow-sky-950/40 transition-all cursor-pointer flex items-center justify-center gap-2 border border-sky-400/30"
          >
            <Plus size={15} />
            <span>Crear curso</span>
          </motion.button>
        </div>
      </div>

      {/* 2. Contenedor Vista general */}
      <motion.div 
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.45 }}
        className="bg-gradient-to-b from-[#151619] to-[#111214] rounded-3xl border border-white/10 p-6 sm:p-8 space-y-6 shadow-2xl backdrop-blur-xl"
      >
        
        <div className="flex items-center justify-between border-b border-white/10 pb-4">
          <h2 className="text-lg font-bold text-white tracking-wide flex items-center gap-2">
            <BookOpen size={18} className="text-[#0284c7]" />
            <span>Vista general de curso</span>
          </h2>
          <span className="text-xs text-slate-400">
            {filteredCourses.length} cursos encontrados
          </span>
        </div>

        {/* Controles de filtrado en línea */}
        <div className="grid grid-cols-1 sm:grid-cols-12 gap-3 items-center">
          
          {/* Desplegable: "Todos" (Estado) */}
          <div className="sm:col-span-3">
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="w-full bg-[#121315] border border-white/10 rounded-xl px-3.5 py-2.5 text-xs text-slate-200 focus:outline-none focus:ring-2 focus:ring-sky-500/40 focus:border-sky-500 transition-all"
            >
              <option value="todos">Todos</option>
              <option value="en_progreso">En progreso</option>
              <option value="futuros">Futuros</option>
              <option value="pasados">Pasados</option>
              <option value="destacados">Destacados</option>
            </select>
          </div>

          {/* Barra de búsqueda */}
          <div className="sm:col-span-4 relative">
            <input
              type="text"
              placeholder="Buscar en mis cursos..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-[#121315] border border-white/10 rounded-xl pl-9 pr-3.5 py-2.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-sky-500/40 focus:border-sky-500 transition-all"
            />
            <Search size={15} className="absolute left-3 top-3 text-slate-400" />
          </div>

          {/* Desplegable: "Ordenar por nombre del curso" */}
          <div className="sm:col-span-3">
            <select
              value={sortOrder}
              onChange={(e) => setSortOrder(e.target.value)}
              className="w-full bg-[#121315] border border-white/10 rounded-xl px-3.5 py-2.5 text-xs text-slate-200 focus:outline-none focus:ring-2 focus:ring-sky-500/40 focus:border-sky-500 transition-all"
            >
              <option value="nombre">Ordenar por nombre del curso</option>
              <option value="acceso">Ordenar por último acceso</option>
            </select>
          </div>

          {/* Selector de vista */}
          <div className="sm:col-span-2">
            <select
              value={viewMode}
              onChange={(e) => setViewMode(e.target.value)}
              className="w-full bg-[#121315] border border-white/10 rounded-xl px-3 py-2.5 text-xs text-slate-200 focus:outline-none focus:ring-2 focus:ring-sky-500/40 focus:border-sky-500 transition-all"
            >
              <option value="tarjeta">Vista: Tarjeta</option>
              <option value="lista">Vista: Lista</option>
              <option value="resumen">Vista: Resumen</option>
            </select>
          </div>

        </div>

        {/* 3. Cuadrícula de Tarjetas de Curso con Framer Motion Staggered Grid */}
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 pt-2"
        >
          {filteredCourses.map((course) => (
            <motion.div
              key={course.id}
              variants={cardVariants}
              whileHover={{ y: -6, scale: 1.015 }}
              transition={{ duration: 0.25 }}
              className="bg-gradient-to-b from-[#18191c] to-[#121315] rounded-3xl overflow-hidden border border-white/10 hover:border-cyan-500/40 hover:shadow-2xl hover:shadow-cyan-500/15 transition-all duration-300 shadow-xl flex flex-col justify-between group"
            >
              {/* Imagen superior */}
              <div className="relative aspect-[16/9] bg-gradient-to-tr from-sky-950 via-blue-900 to-slate-900 overflow-hidden">
                <img
                  src={course.image}
                  alt={course.title}
                  className="w-full h-full object-cover mix-blend-overlay opacity-60 group-hover:scale-105 transition-transform duration-500"
                />

                <div className="absolute top-3 left-3">
                  <span className="bg-[#0284c7] text-white text-[10px] font-black uppercase tracking-wider px-3 py-1 rounded-full shadow-md border border-sky-400/40">
                    {course.category}
                  </span>
                </div>

                <div className="absolute bottom-2.5 right-2.5">
                  <button
                    onClick={() => setActiveCourseOptions(activeCourseOptions === course.id ? null : course.id)}
                    className="p-1.5 rounded-full bg-black/70 hover:bg-black text-slate-300 hover:text-white border border-white/10 backdrop-blur-sm transition-colors cursor-pointer"
                    title="Opciones del curso"
                  >
                    <MoreVertical size={16} />
                  </button>

                  <AnimatePresence>
                    {activeCourseOptions === course.id && (
                      <motion.div 
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.95 }}
                        className="absolute right-0 bottom-8 w-48 bg-gradient-to-b from-[#18191c] to-[#121315] border border-white/15 rounded-2xl shadow-2xl p-2 z-30 text-xs space-y-1 backdrop-blur-2xl"
                      >
                        <button onClick={() => { onSelectCourse(course); setActiveCourseOptions(null); }} className="w-full text-left px-3 py-2 rounded-xl hover:bg-white/5 text-slate-200 flex items-center gap-2 cursor-pointer transition-colors">
                          <BookOpen size={12} /> <span>Abrir curso</span>
                        </button>
                        <button onClick={() => { alert(`Descargando programa curricular de: ${course.title}`); setActiveCourseOptions(null); }} className="w-full text-left px-3 py-2 rounded-xl hover:bg-white/5 text-slate-200 flex items-center gap-2 cursor-pointer transition-colors">
                          <FolderKanban size={12} /> <span>Ver sílabo SENCE</span>
                        </button>
                        <button onClick={() => { alert(`Marcando como favorito: ${course.title}`); setActiveCourseOptions(null); }} className="w-full text-left px-3 py-2 rounded-xl hover:bg-white/5 text-[#00c2b2] flex items-center gap-2 cursor-pointer transition-colors">
                          <CheckCircle size={12} /> <span>Fijar en destacados</span>
                        </button>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </div>

              {/* Contenido */}
              <div className="p-6 space-y-4 flex-1 flex flex-col justify-between">
                <div className="space-y-2">
                  <h3 
                    onClick={() => onSelectCourse && onSelectCourse(course)}
                    className="text-sm sm:text-base font-bold text-white group-hover:text-[#38bdf8] transition-colors leading-snug line-clamp-2 cursor-pointer"
                    title={course.title}
                  >
                    {course.title}
                  </h3>
                  <p className="text-xs text-slate-400">
                    {course.cohort}
                  </p>
                </div>

                {/* Barra de progreso y botón de ingreso */}
                <div className="space-y-3 pt-3 border-t border-white/10">
                  <div className="space-y-1.5">
                    <div className="flex justify-between text-xs font-semibold text-slate-400">
                      <span>{course.progress}% completado</span>
                      <span className="font-mono text-slate-500">{course.senceCode}</span>
                    </div>
                    <div className="w-full h-2 bg-slate-800 rounded-full overflow-hidden p-0.5 border border-white/5">
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: `${course.progress}%` }}
                        transition={{ duration: 0.8 }}
                        className={`h-full rounded-full ${
                          course.progress === 100 ? 'bg-gradient-to-r from-emerald-500 to-teal-400 shadow-sm shadow-emerald-400' : 'bg-gradient-to-r from-[#0284c7] to-cyan-400 shadow-sm shadow-sky-400'
                        }`}
                      ></motion.div>
                    </div>
                  </div>

                  <motion.button
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.97 }}
                    onClick={() => onSelectCourse && onSelectCourse(course)}
                    className="w-full bg-[#0284c7]/20 hover:bg-[#0284c7] text-[#38bdf8] hover:text-white border border-[#0284c7]/40 hover:border-transparent text-xs font-bold py-2.5 rounded-xl transition-all duration-200 flex items-center justify-center gap-2 cursor-pointer shadow-md"
                  >
                    <span>Entrar al Aula Virtual</span>
                    <ExternalLink size={13} />
                  </motion.button>
                </div>
              </div>

            </motion.div>
          ))}
        </motion.div>

      </motion.div>

    </div>
  );
};

export default MyCoursesView;
