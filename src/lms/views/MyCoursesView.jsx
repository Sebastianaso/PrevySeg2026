import React, { useState } from 'react';
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

const MyCoursesView = ({ onSelectCourse, isEditMode }) => {
  const [statusFilter, setStatusFilter] = useState('todos');
  const [searchQuery, setSearchQuery] = useState('');
  const [sortOrder, setSortOrder] = useState('nombre');
  const [viewMode, setViewMode] = useState('tarjeta'); // 'tarjeta' | 'lista' | 'resumen'
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
    <div className="space-y-8 animate-in fade-in duration-200">
      
      {/* 1. Encabezado: Título "Mis cursos" a la izquierda y dos botones de acción a la derecha */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-white tracking-tight">
            Mis cursos
          </h1>
          <p className="text-xs sm:text-sm text-gray-400 mt-1">
            Visualiza y administra tus programas formativos activos y acreditados por SENCE.
          </p>
        </div>

        {/* Botones de acción a la derecha */}
        <div className="flex items-center gap-3 w-full sm:w-auto">
          <button
            onClick={() => alert("Abriendo panel de gestión y asignación de cohortes SENCE...")}
            className="flex-1 sm:flex-none border border-gray-700 hover:border-gray-500 hover:bg-gray-800 text-gray-200 text-xs font-semibold px-4 py-2.5 rounded-xl transition-all cursor-pointer flex items-center justify-center gap-2 shadow-sm"
          >
            <Settings size={14} className="text-gray-400" />
            <span>Gestionar cursos</span>
          </button>

          <button
            onClick={() => alert("Abriendo asistente para crear un nuevo curso...")}
            className="flex-1 sm:flex-none bg-[#0284c7] hover:bg-[#0369a1] active:scale-95 text-white text-xs font-bold px-5 py-2.5 rounded-xl shadow-lg shadow-sky-950/40 transition-all cursor-pointer flex items-center justify-center gap-2"
          >
            <Plus size={15} />
            <span>Crear curso</span>
          </button>
        </div>
      </div>

      {/* 2. Contenedor Vista general: Tarjeta oscura con el subtítulo "Vista general de curso" */}
      <div className="bg-[#121316] rounded-2xl border border-gray-800 p-6 sm:p-8 space-y-6 shadow-xl">
        
        <div className="flex items-center justify-between border-b border-gray-800 pb-4">
          <h2 className="text-lg font-bold text-white tracking-wide flex items-center gap-2">
            <BookOpen size={18} className="text-[#0284c7]" />
            <span>Vista general de curso</span>
          </h2>
          <span className="text-xs text-gray-500">
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
              className="w-full bg-[#18191c] border border-gray-700/80 rounded-xl px-3.5 py-2.5 text-xs text-gray-200 focus:outline-none focus:border-[#0284c7]"
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
              className="w-full bg-[#18191c] border border-gray-700/80 rounded-xl pl-9 pr-3.5 py-2.5 text-xs text-white placeholder-gray-500 focus:outline-none focus:border-[#0284c7]"
            />
            <Search size={15} className="absolute left-3 top-3 text-gray-400" />
          </div>

          {/* Desplegable: "Ordenar por nombre del curso" */}
          <div className="sm:col-span-3">
            <select
              value={sortOrder}
              onChange={(e) => setSortOrder(e.target.value)}
              className="w-full bg-[#18191c] border border-gray-700/80 rounded-xl px-3.5 py-2.5 text-xs text-gray-200 focus:outline-none focus:border-[#0284c7]"
            >
              <option value="nombre">Ordenar por nombre del curso</option>
              <option value="acceso">Ordenar por último acceso</option>
            </select>
          </div>

          {/* Selector de vista: "Tarjeta" / "Lista" / "Resumen" */}
          <div className="sm:col-span-2">
            <select
              value={viewMode}
              onChange={(e) => setViewMode(e.target.value)}
              className="w-full bg-[#18191c] border border-gray-700/80 rounded-xl px-3 py-2.5 text-xs text-gray-200 focus:outline-none focus:border-[#0284c7]"
            >
              <option value="tarjeta">Vista: Tarjeta</option>
              <option value="lista">Vista: Lista</option>
              <option value="resumen">Vista: Resumen</option>
            </select>
          </div>

        </div>

        {/* 3. Cuadrícula de Tarjetas de Curso (Replicando la tarjeta con patrón azul superior) */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 pt-2">
          {filteredCourses.map((course) => (
            <div
              key={course.id}
              className="bg-[#18191c] rounded-2xl overflow-hidden border border-gray-800 hover:border-gray-700 transition-all duration-300 shadow-xl flex flex-col justify-between group hover:-translate-y-1"
            >
              {/* Imagen superior con patrón de círculos azules abstractos / foto con badge */}
              <div className="relative aspect-[16/9] bg-gradient-to-tr from-sky-950 via-blue-900 to-slate-900 overflow-hidden">
                
                {/* Patrón SVG decorativo de círculos y red azul en la cabecera */}
                <svg className="absolute inset-0 w-full h-full opacity-30" xmlns="http://www.w3.org/2000/svg">
                  <defs>
                    <radialGradient id={`blueGrad-${course.id}`} cx="50%" cy="50%" r="50%">
                      <stop offset="0%" stopColor="#0284c7" stopOpacity="0.8" />
                      <stop offset="100%" stopColor="#0f172a" stopOpacity="0.2" />
                    </radialGradient>
                  </defs>
                  <circle cx="20%" cy="30%" r="60" fill={`url(#blueGrad-${course.id})`} />
                  <circle cx="80%" cy="70%" r="90" fill={`url(#blueGrad-${course.id})`} />
                  <circle cx="50%" cy="50%" r="40" fill="none" stroke="#38bdf8" strokeWidth="1" strokeDasharray="4 4" />
                </svg>

                <img
                  src={course.image}
                  alt={course.title}
                  className="w-full h-full object-cover mix-blend-overlay opacity-60 group-hover:scale-105 transition-transform duration-500"
                />

                {/* Etiqueta de categoría "Seguridad Privada" en azul */}
                <div className="absolute top-3 left-3">
                  <span className="bg-[#0284c7] text-white text-[10px] font-black uppercase tracking-wider px-2.5 py-1 rounded-full shadow-md border border-sky-400/40">
                    {course.category}
                  </span>
                </div>

                {/* Botón de tres puntos (opciones) en la esquina inferior derecha de la imagen */}
                <div className="absolute bottom-2.5 right-2.5">
                  <button
                    onClick={() => setActiveCourseOptions(activeCourseOptions === course.id ? null : course.id)}
                    className="p-1.5 rounded-full bg-black/70 hover:bg-black text-gray-300 hover:text-white border border-white/10 backdrop-blur-sm transition-colors cursor-pointer"
                    title="Opciones del curso"
                  >
                    <MoreVertical size={16} />
                  </button>

                  {activeCourseOptions === course.id && (
                    <div className="absolute right-0 bottom-8 w-44 bg-[#121316] border border-gray-700 rounded-xl shadow-2xl p-1.5 z-30 text-xs space-y-1 animate-in fade-in">
                      <button onClick={() => { onSelectCourse(course); setActiveCourseOptions(null); }} className="w-full text-left px-2.5 py-1.5 rounded hover:bg-gray-800 text-gray-200 flex items-center gap-2 cursor-pointer">
                        <BookOpen size={12} /> <span>Abrir curso</span>
                      </button>
                      <button onClick={() => { alert(`Descargando programa curricular de: ${course.title}`); setActiveCourseOptions(null); }} className="w-full text-left px-2.5 py-1.5 rounded hover:bg-gray-800 text-gray-200 flex items-center gap-2 cursor-pointer">
                        <FolderKanban size={12} /> <span>Ver sílabo SENCE</span>
                      </button>
                      <button onClick={() => { alert(`Marcando como favorito: ${course.title}`); setActiveCourseOptions(null); }} className="w-full text-left px-2.5 py-1.5 rounded hover:bg-gray-800 text-[#00c2b2] flex items-center gap-2 cursor-pointer">
                        <CheckCircle size={12} /> <span>Fijar en destacados</span>
                      </button>
                    </div>
                  )}
                </div>
              </div>

              {/* Contenido de la Tarjeta con título truncado */}
              <div className="p-5 space-y-4 flex-1 flex flex-col justify-between">
                <div className="space-y-2">
                  <h3 
                    onClick={() => onSelectCourse && onSelectCourse(course)}
                    className="text-sm font-bold text-white group-hover:text-[#38bdf8] transition-colors leading-snug line-clamp-2 cursor-pointer"
                    title={course.title}
                  >
                    {course.title}
                  </h3>
                  <p className="text-[11px] text-gray-400">
                    {course.cohort}
                  </p>
                </div>

                {/* Barra de progreso y botón de ingreso */}
                <div className="space-y-3 pt-2 border-t border-gray-800">
                  <div className="space-y-1">
                    <div className="flex justify-between text-[10px] font-semibold text-gray-400">
                      <span>{course.progress}% completado</span>
                      <span className="font-mono text-gray-500">{course.senceCode}</span>
                    </div>
                    <div className="w-full h-1.5 bg-gray-800 rounded-full overflow-hidden">
                      <div
                        className={`h-full rounded-full ${
                          course.progress === 100 ? 'bg-emerald-500' : 'bg-[#0284c7]'
                        }`}
                        style={{ width: `${course.progress}%` }}
                      ></div>
                    </div>
                  </div>

                  <button
                    onClick={() => onSelectCourse && onSelectCourse(course)}
                    className="w-full bg-[#0284c7]/20 hover:bg-[#0284c7] text-[#38bdf8] hover:text-white border border-[#0284c7]/40 hover:border-transparent text-xs font-bold py-2 rounded-lg transition-all duration-200 flex items-center justify-center gap-2 cursor-pointer"
                  >
                    <span>Entrar al Aula Virtual</span>
                    <ExternalLink size={13} />
                  </button>
                </div>
              </div>

            </div>
          ))}
        </div>

      </div>

    </div>
  );
};

export default MyCoursesView;
