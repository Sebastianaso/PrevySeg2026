import React, { useState } from 'react';
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
  Award
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
      id: 'crs-os10-formacion',
      title: 'Curso de Formación de Guardias de Seguridad - OS10',
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
      id: 'crs-os10-perfeccionamiento',
      title: 'Perfeccionamiento de Guardias de Seguridad - OS10',
      category: 'Perfeccionamiento',
      code: 'SENCE: 123800789',
      progress: 100,
      lastAccess: 'Hace 3 días',
      image: promoImg,
    },
  ];

  return (
    <div className="space-y-8 animate-in fade-in duration-200">
      
      {/* 1. Encabezado: Título grande "Área personal" en la parte superior izquierda */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-white tracking-tight">
            Área personal
          </h1>
          <p className="text-xs sm:text-sm text-gray-400 mt-1">
            Resumen de actividades formativas, evaluaciones pendientes y cursos en curso.
          </p>
        </div>

        {/* Badge de estado SENCE */}
        <div className="flex items-center gap-2 bg-emerald-950/60 border border-emerald-500/40 text-emerald-300 text-xs font-semibold px-3.5 py-1.5 rounded-full">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
          <span>Matrícula SENCE Activa 2026</span>
        </div>
      </div>

      {/* 2. Contenedor Línea de Tiempo */}
      <div className="bg-[#121316] rounded-2xl border border-gray-800 p-6 sm:p-8 space-y-6 shadow-xl">
        <div className="flex items-center justify-between border-b border-gray-800 pb-4">
          <h2 className="text-lg font-bold text-white tracking-wide flex items-center gap-2">
            <Clock size={18} className="text-[#0284c7]" />
            <span>Línea de tiempo</span>
          </h2>
          <span className="text-xs text-gray-500">Planificación de tareas y exámenes</span>
        </div>

        {/* Controles de filtrado */}
        <div className="grid grid-cols-1 sm:grid-cols-12 gap-3">
          
          {/* Desplegable 1: Próximos 7 días */}
          <div className="sm:col-span-3">
            <select
              value={filterTimeframe}
              onChange={(e) => setFilterTimeframe(e.target.value)}
              className="w-full bg-[#18191c] border border-gray-700/80 rounded-xl px-3.5 py-2.5 text-xs text-gray-200 focus:outline-none focus:border-[#0284c7]"
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
              className="w-full bg-[#18191c] border border-gray-700/80 rounded-xl px-3.5 py-2.5 text-xs text-gray-200 focus:outline-none focus:border-[#0284c7]"
            >
              <option value="fecha">Ordenar por fecha</option>
              <option value="cursos">Ordenar por cursos</option>
            </select>
          </div>

          {/* Barra de búsqueda: Buscar por tipo o nombre de actividad */}
          <div className="sm:col-span-6 relative">
            <input
              type="text"
              placeholder="Buscar por tipo o nombre de actividad..."
              value={searchActivity}
              onChange={(e) => setSearchActivity(e.target.value)}
              className="w-full bg-[#18191c] border border-gray-700/80 rounded-xl pl-10 pr-4 py-2.5 text-xs text-white placeholder-gray-500 focus:outline-none focus:border-[#0284c7]"
            />
            <Search size={15} className="absolute left-3.5 top-3 text-gray-400" />
          </div>

        </div>

        {/* Estado vacío (Empty State) con ícono lucide-react y texto "No hay cursos actuales" */}
        <div className="py-16 px-4 text-center rounded-xl bg-[#18191c]/50 border border-gray-800/60 flex flex-col items-center justify-center space-y-4">
          <div className="w-16 h-16 rounded-2xl bg-gray-800/80 border border-gray-700/80 text-gray-400 flex items-center justify-center shadow-inner">
            <ClipboardList size={32} className="text-gray-400 stroke-1" />
          </div>
          
          <div className="space-y-1">
            <h3 className="text-base font-bold text-gray-200">
              No hay cursos actuales
            </h3>
            <p className="text-xs text-gray-500 max-w-sm">
              No tienes actividades pendientes que requieran una acción inmediata en el plazo seleccionado.
            </p>
          </div>
        </div>
      </div>

      {/* 3. Sección inferior: Título "Cursos accedidos recientemente" justo debajo */}
      <div className="space-y-5 pt-2">
        <div className="flex items-center justify-between">
          <h2 className="text-lg sm:text-xl font-bold text-white tracking-wide flex items-center gap-2">
            <BookOpen size={20} className="text-[#00c2b2]" />
            <span>Cursos accedidos recientemente</span>
          </h2>
          <span className="text-xs text-gray-400 hidden sm:inline">Registro cronológico de tus aulas</span>
        </div>

        {/* Grid de Cursos Recientes */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {recentCourses.map((course) => (
            <div
              key={course.id}
              onClick={() => onSelectCourse && onSelectCourse(course)}
              className="bg-[#121316] rounded-2xl overflow-hidden border border-gray-800 hover:border-sky-500/50 transition-all duration-300 shadow-xl flex flex-col justify-between group cursor-pointer hover:-translate-y-1"
            >
              {/* Imagen con badge */}
              <div className="relative aspect-[16/9] bg-gray-950 overflow-hidden">
                <img
                  src={course.image}
                  alt={course.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 opacity-80"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#121316] via-transparent to-black/40"></div>
                
                <div className="absolute top-3 left-3">
                  <span className="bg-[#0284c7] text-white text-[10px] font-black uppercase tracking-wider px-2.5 py-0.5 rounded-full shadow">
                    {course.category}
                  </span>
                </div>

                <div className="absolute bottom-2 right-2 text-[10px] bg-black/80 px-2 py-0.5 rounded text-gray-300 font-mono">
                  {course.code}
                </div>
              </div>

              {/* Contenido */}
              <div className="p-5 space-y-4 flex-1 flex flex-col justify-between">
                <div className="space-y-2">
                  <h3 className="text-sm font-bold text-white group-hover:text-[#38bdf8] transition-colors leading-snug line-clamp-2">
                    {course.title}
                  </h3>
                  <div className="text-[11px] text-gray-400 flex items-center gap-1.5">
                    <Clock size={12} className="text-gray-500" />
                    <span>Último acceso: {course.lastAccess}</span>
                  </div>
                </div>

                {/* Barra de progreso */}
                <div className="space-y-1.5 pt-2 border-t border-gray-800">
                  <div className="flex justify-between text-[11px] font-semibold text-gray-400">
                    <span>Progreso del alumno</span>
                    <span className="text-[#00c2b2] font-bold">{course.progress}%</span>
                  </div>
                  <div className="w-full h-2 bg-gray-800 rounded-full overflow-hidden">
                    <div
                      className={`h-full rounded-full transition-all duration-500 ${
                        course.progress === 100 ? 'bg-emerald-500' : 'bg-[#0284c7]'
                      }`}
                      style={{ width: `${course.progress}%` }}
                    ></div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
};

export default PersonalAreaView;
