import React, { useState, useEffect } from 'react';
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
  Edit3,
  Loader2,
  AlertCircle
} from 'lucide-react';
import { supabase } from '../../config/supabase';
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

const MyCoursesView = ({ currentUser, onSelectCourse, isEditMode }) => {
  const [statusFilter, setStatusFilter] = useState('todos');
  const [searchQuery, setSearchQuery] = useState('');
  const [sortOrder, setSortOrder] = useState('nombre');
  const [viewMode, setViewMode] = useState('tarjeta');
  const [activeCourseOptions, setActiveCourseOptions] = useState(null);

  const [coursesList, setCoursesList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    let isMounted = true;

    async function fetchCourses() {
      setLoading(true);
      setError('');

      try {
        if (currentUser?.rol === 'ADMIN' || currentUser?.rol === 'TEACHER') {
          // Administradores y Docentes ven el catálogo completo de cursos
          const { data, error: err } = await supabase
            .from('courses')
            .select('*')
            .order('created_at', { ascending: false });

          if (err) throw err;
          if (isMounted) {
            setCoursesList(data.map(c => ({
              ...c,
              progress: 100,
              status: c.activo ? 'activo' : 'inactivo',
              senceCode: c.codigo_sence || '123800000',
              title: c.titulo,
              cohort: 'Cohorte Oficial 2026',
            })));
          }
        } else if (currentUser?.id) {
          // Estudiantes ven sus cursos matriculados
          const { data, error: err } = await supabase
            .from('enrollments')
            .select('*, courses(*)')
            .eq('user_id', currentUser.id);

          if (err) throw err;
          if (isMounted) {
            setCoursesList((data || []).map(enr => ({
              ...(enr.courses || {}),
              enrollmentId: enr.id,
              progress: enr.progreso || 0,
              status: enr.estado?.toLowerCase() || 'activo',
              senceCode: enr.courses?.codigo_sence || '123800000',
              title: enr.courses?.titulo || 'Curso',
              cohort: 'Cohorte Activa 2026',
            })));
          }
        }
      } catch (err) {
        console.error('Error fetching courses in MyCoursesView:', err);
        if (isMounted) setError('Error al cargar la lista de cursos desde el servidor.');
      } finally {
        if (isMounted) setLoading(false);
      }
    }

    fetchCourses();

    return () => {
      isMounted = false;
    };
  }, [currentUser?.id, currentUser?.rol]);

  const filteredCourses = coursesList.filter((c) => {
    const matchesSearch = (c.title || '').toLowerCase().includes(searchQuery.toLowerCase()) || (c.senceCode || '').includes(searchQuery);
    const matchesStatus = statusFilter === 'todos' || c.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  return (
    <div className="space-y-8 animate-in fade-in duration-200">
      
      {/* 1. Header principal */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-black text-slate-900 tracking-tight">
            {currentUser?.rol === 'ADMIN' ? 'Catálogo de Cursos OTEC' : 'Mis Cursos y Programas'}
          </h1>
          <p className="text-xs sm:text-sm text-slate-600 mt-1">
            {currentUser?.rol === 'ADMIN' 
              ? 'Gestión de programas académicos, códigos SENCE y modalidades formativas.' 
              : 'Accede a tus aulas virtuales, materiales de estudio y evaluaciones.'}
          </p>
        </div>

        <div className="flex items-center gap-3">
          {currentUser?.rol === 'ADMIN' && (
            <button 
              onClick={() => alert("Para crear nuevos cursos, ve a la pestaña 'Configuración del Curso' o 'Administración del Sitio'.")}
              className="bg-sky-600 hover:bg-sky-700 active:scale-95 text-white text-xs font-bold px-4 py-2.5 rounded-xl shadow-sm flex items-center gap-2 transition-all cursor-pointer"
            >
              <Plus size={15} />
              <span>Nuevo Curso</span>
            </button>
          )}
        </div>
      </div>

      {/* Alerta de Error */}
      {error && (
        <div className="p-4 rounded-2xl bg-rose-50 border border-rose-200 text-rose-700 text-xs flex items-center gap-3">
          <AlertCircle size={18} className="flex-shrink-0 text-rose-600" />
          <span>{error}</span>
        </div>
      )}

      {/* 2. Barra de Filtros, Búsqueda y Vistas */}
      <div className="bg-white rounded-3xl border border-slate-200 p-5 space-y-4 shadow-sm">
        
        <div className="flex flex-wrap items-center justify-between gap-4">
          
          {/* Selector de Estado */}
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold text-slate-700 uppercase">Filtro:</span>
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="bg-slate-50 border border-slate-300 rounded-xl px-3.5 py-2 text-xs font-medium text-slate-900 focus:outline-none focus:border-sky-500 focus:bg-white transition-all cursor-pointer"
            >
              <option value="todos">Todos los cursos ({coursesList.length})</option>
              <option value="activo">En Progreso / Activos</option>
              <option value="completado">Completados / Aprobados</option>
            </select>
          </div>

          {/* Selector de Orden */}
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold text-slate-700 uppercase">Ordenar:</span>
            <select
              value={sortOrder}
              onChange={(e) => setSortOrder(e.target.value)}
              className="bg-slate-50 border border-slate-300 rounded-xl px-3.5 py-2 text-xs font-medium text-slate-900 focus:outline-none focus:border-sky-500 focus:bg-white transition-all cursor-pointer"
            >
              <option value="nombre">Por nombre de curso</option>
              <option value="sence">Por código SENCE</option>
            </select>
          </div>

          {/* Conmutador de modo de vista */}
          <div className="flex items-center bg-slate-100 p-1 rounded-xl border border-slate-200">
            <button
              onClick={() => setViewMode('tarjeta')}
              className={`p-1.5 rounded-lg text-xs font-semibold flex items-center gap-1 transition-all cursor-pointer ${
                viewMode === 'tarjeta' ? 'bg-white text-sky-700 shadow-xs' : 'text-slate-500 hover:text-slate-900'
              }`}
              title="Vista de Tarjetas"
            >
              <LayoutGrid size={15} />
            </button>
            <button
              onClick={() => setViewMode('lista')}
              className={`p-1.5 rounded-lg text-xs font-semibold flex items-center gap-1 transition-all cursor-pointer ${
                viewMode === 'lista' ? 'bg-white text-sky-700 shadow-xs' : 'text-slate-500 hover:text-slate-900'
              }`}
              title="Vista de Lista"
            >
              <ListIcon size={15} />
            </button>
          </div>

        </div>

        {/* Buscador de Cursos */}
        <div className="relative">
          <input
            type="text"
            placeholder="Buscar por nombre de curso o código SENCE..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-slate-50 border border-slate-300 rounded-xl pl-11 pr-4 py-2.5 text-xs sm:text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:border-sky-500 focus:bg-white transition-all font-medium"
          />
          <Search size={16} className="absolute left-4 top-3 text-slate-400" />
        </div>

      </div>

      {/* 3. Grid / Lista de Cursos */}
      {loading ? (
        <div className="py-20 text-center flex flex-col items-center justify-center space-y-3">
          <Loader2 size={36} className="text-sky-600 animate-spin" />
          <p className="text-xs font-bold text-slate-600">Consultando base de datos Supabase...</p>
        </div>
      ) : filteredCourses.length === 0 ? (
        <div className="py-16 text-center bg-white rounded-3xl border border-slate-200 p-8 space-y-3 shadow-sm">
          <BookOpen size={36} className="mx-auto text-slate-400 stroke-1" />
          <h3 className="text-base font-bold text-slate-800">No se encontraron cursos</h3>
          <p className="text-xs text-slate-500">Prueba con otro término de búsqueda o cambia los filtros de estado.</p>
        </div>
      ) : (
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className={
            viewMode === 'tarjeta'
              ? 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'
              : 'space-y-4'
          }
        >
          {filteredCourses.map((course, idx) => {
            const imgChoice = idx % 4 === 0 ? heroGrad : idx % 4 === 1 ? promoImg : idx % 4 === 2 ? blogCctv : blogPort;
            const progress = course.progress || 0;

            return (
              <motion.div
                key={course.id}
                variants={cardVariants}
                whileHover={{ y: -4 }}
                onClick={() => onSelectCourse && onSelectCourse(course)}
                className="bg-white rounded-3xl overflow-hidden border border-slate-200 hover:border-sky-400 hover:shadow-lg transition-all duration-300 shadow-sm flex flex-col justify-between group cursor-pointer"
              >
                {/* Header de tarjeta con imagen */}
                <div className="relative aspect-[16/9] bg-slate-100 overflow-hidden">
                  <img
                    src={imgChoice}
                    alt={course.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent"></div>

                  <div className="absolute top-3 left-3">
                    <span className="bg-sky-600 text-white text-[10px] font-black uppercase tracking-wider px-3 py-1 rounded-full shadow-md">
                      {course.modalidad || 'SENCE'}
                    </span>
                  </div>

                  <div className="absolute bottom-2.5 right-2.5 text-[10px] bg-black/80 backdrop-blur-sm px-2.5 py-0.5 rounded-md text-white font-mono">
                    {course.senceCode ? `SENCE: ${course.senceCode}` : `$${Number(course.precio || 0).toLocaleString('es-CL')}`}
                  </div>
                </div>

                {/* Contenido de la tarjeta */}
                <div className="p-6 space-y-4 flex-1 flex flex-col justify-between">
                  <div className="space-y-2">
                    <h3 className="text-sm sm:text-base font-bold text-slate-900 group-hover:text-sky-700 transition-colors leading-snug line-clamp-2">
                      {course.title}
                    </h3>
                    <p className="text-xs text-slate-500 line-clamp-2">
                      {course.descripcion || 'Capacitación teórico-práctica con certificación oficial PrevySeg y acreditación SENCE.'}
                    </p>
                  </div>

                  {/* Barra de Progreso */}
                  <div className="space-y-1.5 pt-3 border-t border-slate-100">
                    <div className="flex justify-between text-xs font-semibold text-slate-600">
                      <span>Progreso:</span>
                      <span className="font-bold text-teal-700">{progress}%</span>
                    </div>
                    <div className="w-full h-2.5 bg-slate-100 rounded-full overflow-hidden p-0.5 border border-slate-200">
                      <div
                        className={`h-full rounded-full transition-all duration-500 ${
                          progress === 100 ? 'bg-emerald-500' : 'bg-sky-600'
                        }`}
                        style={{ width: `${progress}%` }}
                      />
                    </div>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </motion.div>
      )}

    </div>
  );
};

export default MyCoursesView;
