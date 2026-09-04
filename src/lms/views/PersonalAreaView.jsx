import React, { useState, useEffect } from 'react';
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
  Sparkles,
  AlertCircle,
  Loader2
} from 'lucide-react';
import { supabase } from '../../config/supabase';
import heroGrad from '../../assets/images/hero_graduation.jpg';
import promoImg from '../../assets/images/security_promo.jpg';
import blogCctv from '../../assets/images/blog_cctv.jpg';

const PersonalAreaView = ({ currentUser, onSelectCourse }) => {
  const [filterTimeframe, setFilterTimeframe] = useState('7dias');
  const [filterSort, setFilterSort] = useState('fecha');
  const [searchActivity, setSearchActivity] = useState('');

  const [enrollments, setEnrollments] = useState([]);
  const [certificates, setCertificates] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    let isMounted = true;

    async function loadStudentData() {
      if (!currentUser?.id) {
        setLoading(false);
        return;
      }
      setLoading(true);
      setError('');

      try {
        // 1. Cargar matrículas con sus cursos relacionados
        const { data: enrData, error: enrError } = await supabase
          .from('enrollments')
          .select('*, courses(*)')
          .eq('user_id', currentUser.id);

        if (enrError) throw enrError;

        // 2. Cargar certificados emitidos
        const { data: certData, error: certError } = await supabase
          .from('certificates')
          .select('*, courses(*)')
          .eq('user_id', currentUser.id);

        if (certError) throw certError;

        if (isMounted) {
          setEnrollments(enrData || []);
          setCertificates(certData || []);
        }
      } catch (err) {
        console.error('Error cargando área personal:', err);
        if (isMounted) setError('No se pudieron cargar tus cursos asignados.');
      } finally {
        if (isMounted) setLoading(false);
      }
    }

    loadStudentData();

    return () => {
      isMounted = false;
    };
  }, [currentUser?.id]);

  const latestCertificate = certificates.length > 0 ? certificates[0] : null;

  const filteredEnrollments = enrollments.filter(e => {
    const title = e.courses?.titulo?.toLowerCase() || '';
    return title.includes(searchActivity.toLowerCase());
  });

  return (
    <div className="space-y-8 animate-in fade-in duration-200">
      
      {/* 1. Encabezado: Título grande "Área personal" */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-black text-slate-900 tracking-tight">
            Área personal
          </h1>
          <p className="text-xs sm:text-sm text-slate-600 mt-1">
            Bienvenido, <strong className="text-slate-900">{currentUser?.nombre || 'Estudiante'}</strong> • RUT: <span className="font-mono">{currentUser?.rut || 'Sin registrar'}</span>
          </p>
        </div>

        {/* Badge de estado SENCE */}
        <div className="flex items-center gap-2 bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-bold px-4 py-2 rounded-full shadow-xs">
          <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse"></span>
          <span>Matrícula SENCE Activa 2026</span>
        </div>
      </div>

      {/* Alerta de Error si ocurre */}
      {error && (
        <div className="p-4 rounded-2xl bg-rose-50 border border-rose-200 text-rose-700 text-xs flex items-center gap-3">
          <AlertCircle size={18} className="flex-shrink-0 text-rose-600" />
          <span>{error}</span>
        </div>
      )}

      {/* Banner de Certificado Oficial Emitido (Dinámico si existe) */}
      {latestCertificate ? (
        <motion.div 
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="bg-gradient-to-r from-emerald-50 via-teal-50 to-white border border-emerald-200 p-6 rounded-3xl flex flex-col sm:flex-row items-center justify-between gap-5 shadow-sm"
        >
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 rounded-2xl bg-emerald-100 border border-emerald-300 text-emerald-700 flex items-center justify-center flex-shrink-0 shadow-xs">
              <Award size={30} />
            </div>
            <div className="space-y-1">
              <div className="text-xs font-bold text-emerald-800 uppercase tracking-wider flex items-center gap-1.5">
                <CheckCircle2 size={14} className="text-emerald-600" />
                <span>Certificado Oficial Emitido por Dirección Académica</span>
              </div>
              <h3 className="text-base sm:text-lg font-bold text-slate-900">
                {latestCertificate.courses?.titulo || 'Curso de formación Guardia de Seguridad'}
              </h3>
              <p className="text-xs text-slate-600">
                Acreditación oficial conforme al Decreto Ley N° 3.607 y normativa SPD. Emitido el {new Date(latestCertificate.fecha_emision).toLocaleDateString('es-CL')}.
              </p>
            </div>
          </div>

          <motion.a
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            href={latestCertificate.url_pdf || '#'}
            target="_blank"
            rel="noreferrer"
            className="bg-gradient-to-r from-[#0284c7] to-[#0369a1] hover:from-sky-600 hover:to-sky-700 text-white text-xs font-bold px-5 py-3 rounded-xl shadow-md flex items-center gap-2 cursor-pointer flex-shrink-0 transition-all"
          >
            <Award size={15} />
            <span>Descargar Diploma Oficial (PDF)</span>
          </motion.a>
        </motion.div>
      ) : (
        <div className="bg-white border border-slate-200 p-5 rounded-3xl flex items-center justify-between shadow-xs">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-sky-50 border border-sky-200 text-sky-700 flex items-center justify-center">
              <Award size={20} />
            </div>
            <div>
              <h4 className="text-xs font-bold text-slate-800">Estado de Titulación y Certificados</h4>
              <p className="text-[11px] text-slate-500">Completa el 100% de tus módulos y evaluaciones para habilitar tu diploma digital.</p>
            </div>
          </div>
        </div>
      )}

      {/* 2. Contenedor Línea de Tiempo & Actividades */}
      <motion.div 
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.45, delay: 0.1 }}
        className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 space-y-6 shadow-sm"
      >
        <div className="flex items-center justify-between border-b border-slate-200 pb-4">
          <h2 className="text-lg font-bold text-slate-900 tracking-wide flex items-center gap-2">
            <Clock size={18} className="text-[#0284c7]" />
            <span>Línea de tiempo y actividades</span>
          </h2>
          <span className="text-xs text-slate-500 font-medium">Planificación de tareas y exámenes</span>
        </div>

        {/* Controles de filtrado */}
        <div className="grid grid-cols-1 sm:grid-cols-12 gap-3">
          
          <div className="sm:col-span-3">
            <select
              value={filterTimeframe}
              onChange={(e) => setFilterTimeframe(e.target.value)}
              className="w-full bg-slate-50 border border-slate-300 rounded-xl px-4 py-2.5 text-xs text-slate-800 focus:outline-none focus:ring-2 focus:ring-sky-500/40 focus:border-sky-500 focus:bg-white transition-all cursor-pointer font-medium"
            >
              <option value="7dias">Próximos 7 días</option>
              <option value="30dias">Próximos 30 días</option>
              <option value="3meses">Próximos 3 meses</option>
              <option value="todos">Todos los plazos</option>
            </select>
          </div>

          <div className="sm:col-span-3">
            <select
              value={filterSort}
              onChange={(e) => setFilterSort(e.target.value)}
              className="w-full bg-slate-50 border border-slate-300 rounded-xl px-4 py-2.5 text-xs text-slate-800 focus:outline-none focus:ring-2 focus:ring-sky-500/40 focus:border-sky-500 focus:bg-white transition-all cursor-pointer font-medium"
            >
              <option value="fecha">Ordenar por fecha</option>
              <option value="cursos">Ordenar por cursos</option>
            </select>
          </div>

          {/* Barra de búsqueda */}
          <div className="sm:col-span-6 relative">
            <input
              type="text"
              placeholder="Buscar curso matriculado..."
              value={searchActivity}
              onChange={(e) => setSearchActivity(e.target.value)}
              className="w-full bg-slate-50 border border-slate-300 rounded-xl pl-11 pr-4 py-2.5 text-xs text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-sky-500/40 focus:border-sky-500 focus:bg-white transition-all font-medium"
            />
            <Search size={15} className="absolute left-4 top-3 text-slate-400" />
          </div>

        </div>

        {/* Estado de carga */}
        {loading ? (
          <div className="py-16 text-center flex flex-col items-center justify-center space-y-3">
            <Loader2 size={32} className="text-sky-600 animate-spin" />
            <p className="text-xs text-slate-500 font-medium">Cargando tus cursos desde la base de datos...</p>
          </div>
        ) : filteredEnrollments.length === 0 ? (
          /* Estado vacío (Empty State) */
          <div className="py-16 px-4 text-center rounded-2xl bg-slate-50 border border-slate-200 flex flex-col items-center justify-center space-y-4">
            <div className="w-16 h-16 rounded-2xl bg-white border border-slate-200 text-slate-400 flex items-center justify-center shadow-xs">
              <ClipboardList size={32} className="text-slate-400 stroke-1" />
            </div>
            
            <div className="space-y-1">
              <h3 className="text-base font-bold text-slate-800">
                No se encontraron matrículas activas
              </h3>
              <p className="text-xs text-slate-500 max-w-sm">
                Inscríbete en un programa desde la Ficha de Inscripción o contacta a admisión.
              </p>
            </div>
          </div>
        ) : (
          /* Listado de cursos matriculados */
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredEnrollments.map((enr) => {
              const crs = enr.courses || {};
              const progress = enr.progreso || 0;
              return (
                <div 
                  key={enr.id}
                  onClick={() => onSelectCourse && onSelectCourse(crs)}
                  className="p-5 rounded-2xl bg-slate-50 border border-slate-200 hover:border-sky-300 hover:bg-sky-50/30 transition-all cursor-pointer flex flex-col justify-between space-y-4 group"
                >
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className={`text-[10px] font-bold px-2.5 py-0.5 rounded-full uppercase ${
                        enr.estado === 'COMPLETADO' ? 'bg-emerald-100 text-emerald-800 border border-emerald-200' : 'bg-sky-100 text-sky-800 border border-sky-200'
                      }`}>
                        {enr.estado || 'ACTIVO'}
                      </span>
                      <span className="text-[10px] text-slate-500 font-mono">
                        {crs.codigo_sence ? `SENCE: ${crs.codigo_sence}` : crs.modalidad}
                      </span>
                    </div>

                    <h4 className="text-sm font-bold text-slate-900 group-hover:text-sky-700 transition-colors line-clamp-2">
                      {crs.titulo || 'Curso sin título'}
                    </h4>

                    <p className="text-xs text-slate-600 line-clamp-2">
                      {crs.descripcion || 'Capacitación oficial PrevySeg.'}
                    </p>
                  </div>

                  <div className="space-y-1.5 pt-3 border-t border-slate-200">
                    <div className="flex justify-between text-xs font-semibold text-slate-700">
                      <span>Progreso:</span>
                      <span className="font-bold text-teal-700">{progress}%</span>
                    </div>
                    <div className="w-full h-2 bg-slate-200 rounded-full overflow-hidden">
                      <div 
                        className={`h-full rounded-full transition-all duration-500 ${
                          progress === 100 ? 'bg-emerald-500' : 'bg-sky-600'
                        }`}
                        style={{ width: `${progress}%` }}
                      />
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </motion.div>

      {/* 3. Sección inferior: Cursos asignados */}
      <div className="space-y-5 pt-2">
        <div className="flex items-center justify-between">
          <h2 className="text-lg sm:text-xl font-bold text-slate-900 tracking-wide flex items-center gap-2">
            <BookOpen size={20} className="text-[#00c2b2]" />
            <span>Cursos en tu malla curricular ({enrollments.length})</span>
          </h2>
          <span className="text-xs text-slate-500 hidden sm:inline">Registro oficial en base de datos PostgreSQL</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {enrollments.map((enr, idx) => {
            const course = enr.courses || {};
            const progress = enr.progreso || 0;
            const imgChoice = idx % 3 === 0 ? heroGrad : idx % 3 === 1 ? blogCctv : promoImg;

            return (
              <motion.div
                key={enr.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: idx * 0.08 }}
                whileHover={{ y: -5 }}
                onClick={() => onSelectCourse && onSelectCourse(course)}
                className="bg-white rounded-3xl overflow-hidden border border-slate-200 hover:border-sky-400 hover:shadow-lg transition-all duration-300 shadow-sm flex flex-col justify-between group cursor-pointer"
              >
                <div className="relative aspect-[16/9] bg-slate-100 overflow-hidden">
                  <img
                    src={imgChoice}
                    alt={course.titulo}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent"></div>
                  
                  <div className="absolute top-3 left-3">
                    <span className="bg-[#0284c7] text-white text-[10px] font-black uppercase tracking-wider px-3 py-1 rounded-full shadow-md">
                      {course.modalidad || 'SENCE'}
                    </span>
                  </div>

                  <div className="absolute bottom-2.5 right-2.5 text-[10px] bg-black/75 backdrop-blur-sm px-2.5 py-0.5 rounded-md text-white font-mono">
                    {course.codigo_sence ? `SENCE: ${course.codigo_sence}` : `$${Number(course.precio || 0).toLocaleString('es-CL')}`}
                  </div>
                </div>

                <div className="p-6 space-y-4 flex-1 flex flex-col justify-between">
                  <div className="space-y-2">
                    <h3 className="text-sm sm:text-base font-bold text-slate-900 group-hover:text-[#0284c7] transition-colors leading-snug line-clamp-2">
                      {course.titulo}
                    </h3>
                    <div className="text-xs text-slate-500 flex items-center gap-1.5">
                      <Clock size={13} className="text-slate-400" />
                      <span>Estado: <strong className="text-slate-800">{enr.estado}</strong></span>
                    </div>
                  </div>

                  <div className="space-y-1.5 pt-3 border-t border-slate-100">
                    <div className="flex justify-between text-xs font-semibold text-slate-600">
                      <span>Progreso curricular</span>
                      <span className="text-[#00c2b2] font-bold">{progress}%</span>
                    </div>
                    <div className="w-full h-2.5 bg-slate-100 rounded-full overflow-hidden p-0.5 border border-slate-200">
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: `${progress}%` }}
                        transition={{ duration: 0.8, ease: 'easeOut' }}
                        className={`h-full rounded-full ${
                          progress === 100 ? 'bg-gradient-to-r from-emerald-500 to-teal-500' : 'bg-gradient-to-r from-[#0284c7] to-cyan-500'
                        }`}
                      ></motion.div>
                    </div>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>

    </div>
  );
};

export default PersonalAreaView;
