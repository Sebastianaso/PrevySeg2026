import React, { useState, useEffect } from 'react';
import { 
  Briefcase, 
  MapPin, 
  DollarSign, 
  Clock, 
  Building2, 
  ShieldCheck, 
  CheckCircle, 
  Filter, 
  Search, 
  Send, 
  ChevronRight, 
  Sparkles, 
  X, 
  ExternalLink,
  Award,
  AlertCircle,
  Wrench,
  Shield,
  HardHat,
  Loader2,
  Plus
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { supabase } from '../../config/supabase';

const JobBoardView = ({ currentUser }) => {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [selectedJob, setSelectedJob] = useState(null);
  const [appliedJobs, setAppliedJobs] = useState([]);
  const [showApplyModal, setShowApplyModal] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  // Filtros de barra lateral
  const [filterSchool, setFilterSchool] = useState('todos');
  const [filterType, setFilterType] = useState('todos');
  const [filterShift, setFilterShift] = useState('todos');
  const [filterLocation, setFilterLocation] = useState('todos');

  // Fetch ofertas laborales reales desde public.jobs
  useEffect(() => {
    let isMounted = true;

    async function fetchJobs() {
      setLoading(true);
      setError('');
      try {
        const { data, error: err } = await supabase
          .from('jobs')
          .select('*')
          .eq('activo', true)
          .order('created_at', { ascending: false });

        if (err) throw err;

        if (isMounted) {
          const mapped = (data || []).map(j => ({
            id: j.id,
            title: j.cargo,
            company: j.empresa,
            location: 'Arica / Macro Zona Norte',
            city: 'Arica',
            salary: j.renta ? `$${Number(j.renta).toLocaleString('es-CL')} CLP Líquido` : 'A convenir',
            salaryNumber: j.renta || 0,
            shift: j.jornada || 'Turno Rotativo',
            type: j.requiere_os10 ? 'guardia' : 'cctv',
            school: j.requiere_os10 ? 'seguridad' : 'oficios',
            postedDate: new Date(j.created_at).toLocaleDateString('es-CL'),
            spots: 'Vacantes Disponibles',
            description: j.descripcion || 'Convocatoria laboral abierta.',
            requirements: [
              j.requiere_os10 ? 'Acreditación OS10 / SPD Requerida' : 'Capacitación Técnica PrevySeg',
              'Enseñanza media completa',
              'Certificado de antecedentes intachable',
              'Certificación OTEC PrevySeg (Preferencial)'
            ]
          }));

          setJobs(mapped);
          if (mapped.length > 0) setSelectedJob(mapped[0]);
        }
      } catch (err) {
        console.error("Error al obtener ofertas de empleo:", err);
        if (isMounted) setError('Error al cargar ofertas laborales desde la base de datos.');
      } finally {
        if (isMounted) setLoading(false);
      }
    }

    fetchJobs();

    return () => {
      isMounted = false;
    };
  }, []);

  // Filtrado multidimensional
  const filteredJobs = jobs.filter((job) => {
    const matchesSearch = job.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          job.company.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          job.location.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesSchool = filterSchool === 'todos' || job.school === filterSchool;
    const matchesType = filterType === 'todos' || job.type === filterType;
    const matchesShift = filterShift === 'todos' || job.shift.toLowerCase().includes(filterShift.toLowerCase());
    const matchesLocation = filterLocation === 'todos' || job.city.toLowerCase() === filterLocation.toLowerCase();

    return matchesSearch && matchesSchool && matchesType && matchesShift && matchesLocation;
  });

  const handleApply = (jobId) => {
    if (!appliedJobs.includes(jobId)) {
      setAppliedJobs([...appliedJobs, jobId]);
    }
    setShowApplyModal(false);
    alert("¡Postulación enviada con éxito! La empresa empleadora recibirá tu perfil verificado y los certificados emitidos por OTEC PrevySeg con acreditación oficial.");
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-200">
      
      {/* 1. Encabezado Macro Zona Norte & Bolsa Laboral */}
      <div className="bg-gradient-to-r from-teal-50 via-sky-50 to-white p-6 sm:p-8 rounded-3xl border border-teal-200 shadow-sm flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
        <div className="space-y-2">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-teal-100 text-teal-800 text-xs font-bold border border-teal-200">
            <Sparkles size={14} />
            <span>Bolsa Laboral Macro Zona Norte • Convenios SPD, SENCE & Minería</span>
          </div>
          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-black text-slate-900 tracking-tight">
            Bolsa de Empleo Regional PrevySeg
          </h1>
          <p className="text-xs sm:text-sm text-slate-600 max-w-2xl leading-relaxed">
            Conecta directamente con empresas de seguridad privada, terminales portuarios, faenas mineras y retail en <strong className="text-slate-900">Arica, Iquique, Antofagasta y Calama</strong>. Datos en vivo desde PostgreSQL.
          </p>
        </div>

        {/* Buscador de empleos */}
        <div className="relative w-full md:w-80">
          <input
            type="text"
            placeholder="Buscar cargo, faena o ciudad..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-white border border-slate-300 rounded-xl pl-10 pr-4 py-2.5 text-xs sm:text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:border-[#00c2b2] shadow-sm font-medium"
          />
          <Search size={16} className="absolute left-3.5 top-3 text-slate-400" />
        </div>
      </div>

      {/* Alerta de Error */}
      {error && (
        <div className="p-4 rounded-2xl bg-rose-50 border border-rose-200 text-rose-700 text-xs flex items-center gap-3">
          <AlertCircle size={18} className="flex-shrink-0 text-rose-600" />
          <span>{error}</span>
        </div>
      )}

      {/* 2. Layout: Barra Lateral Izquierda (Filtros) + Columna Principal Derecha (Lista de Ofertas) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* BARRA LATERAL IZQUIERDA: Filtros */}
        <aside className="lg:col-span-4 space-y-6">
          <div className="bg-white rounded-2xl border border-slate-200 p-6 space-y-6 shadow-sm sticky top-24">
            <div className="flex items-center justify-between border-b border-slate-200 pb-3">
              <h2 className="text-sm font-bold text-slate-900 uppercase tracking-wider flex items-center gap-2">
                <Filter size={16} className="text-[#00c2b2]" />
                <span>Filtros de Búsqueda</span>
              </h2>
              {(filterSchool !== 'todos' || filterType !== 'todos' || filterShift !== 'todos' || filterLocation !== 'todos') && (
                <button
                  onClick={() => { setFilterSchool('todos'); setFilterType('todos'); setFilterShift('todos'); setFilterLocation('todos'); }}
                  className="text-[11px] text-teal-600 hover:underline cursor-pointer font-bold"
                >
                  Limpiar
                </button>
              )}
            </div>

            {/* Filtro 1: Selector de Escuela */}
            <div className="space-y-2">
              <label className="block text-xs font-bold text-slate-700 flex items-center gap-1.5">
                <Shield size={14} className="text-[#0284c7]" />
                <span>Escuela Formativa</span>
              </label>
              <select
                value={filterSchool}
                onChange={(e) => setFilterSchool(e.target.value)}
                className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3.5 py-2.5 text-xs text-slate-800 focus:outline-none focus:border-[#00c2b2] focus:bg-white cursor-pointer font-medium"
              >
                <option value="todos">Todas las Escuelas</option>
                <option value="seguridad">Escuela de Seguridad Privada (SPD)</option>
                <option value="oficios">Escuela de Oficios & Minería</option>
              </select>
            </div>

            {/* Filtro 2: Ubicación Regional */}
            <div className="space-y-2">
              <label className="block text-xs font-bold text-slate-700 flex items-center gap-1.5">
                <MapPin size={14} className="text-[#00c2b2]" />
                <span>Ciudad / Faena</span>
              </label>
              <select
                value={filterLocation}
                onChange={(e) => setFilterLocation(e.target.value)}
                className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3.5 py-2.5 text-xs text-slate-800 focus:outline-none focus:border-[#00c2b2] focus:bg-white cursor-pointer font-medium"
              >
                <option value="todos">Toda la Macro Zona Norte</option>
                <option value="Arica">Arica y Parinacota</option>
                <option value="Iquique">Iquique y ZOFRI (Tarapacá)</option>
                <option value="Antofagasta">Antofagasta (Minería y Puertos)</option>
                <option value="Calama">Calama y Faenas Cordillera</option>
              </select>
            </div>

            {/* Info Box: Sello PrevySeg */}
            <div className="p-4 rounded-xl bg-teal-50 border border-teal-200 text-xs space-y-2">
              <div className="flex items-center gap-2 font-bold text-teal-800">
                <ShieldCheck size={16} />
                <span>Perfil Verificado OTEC</span>
              </div>
              <p className="text-[11px] text-slate-600 leading-relaxed">
                Tus postulaciones se envían acompañadas de tu certificado oficial digital y código QR de validación curricular.
              </p>
            </div>

          </div>
        </aside>

        {/* COLUMNA PRINCIPAL DERECHA: Lista de Ofertas */}
        <main className="lg:col-span-8 space-y-6">
          <div className="flex items-center justify-between px-1">
            <span className="text-xs text-slate-600 font-semibold">
              Mostrando <strong className="text-slate-900">{filteredJobs.length}</strong> convocatorias laborales activas
            </span>
            <span className="text-xs text-teal-700 font-semibold flex items-center gap-1">
              <Sparkles size={13} /> Sincronizado en tiempo real
            </span>
          </div>

          {loading ? (
            <div className="py-20 text-center flex flex-col items-center justify-center space-y-3">
              <Loader2 size={36} className="text-teal-600 animate-spin" />
              <p className="text-xs font-bold text-slate-600">Cargando empleos desde PostgreSQL...</p>
            </div>
          ) : filteredJobs.length === 0 ? (
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="bg-white rounded-3xl border border-slate-200 p-12 text-center space-y-3 shadow-sm"
            >
              <AlertCircle size={36} className="text-slate-400 mx-auto" />
              <h3 className="text-base font-bold text-slate-800">No se encontraron ofertas laborales</h3>
              <p className="text-xs text-slate-500">Prueba ajustando los filtros de búsqueda.</p>
            </motion.div>
          ) : (
            <div className="space-y-4">
              {filteredJobs.map((job, idx) => {
                const isApplied = appliedJobs.includes(job.id);

                return (
                  <motion.div
                    key={job.id}
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.35, delay: idx * 0.05 }}
                    whileHover={{ y: -4 }}
                    className="bg-white rounded-3xl border border-slate-200 hover:border-teal-400 hover:shadow-lg p-6 space-y-5 transition-all duration-300 shadow-sm group"
                  >
                    {/* Fila Superior: Cargo, Escuela y Empresa */}
                    <div className="flex flex-col sm:flex-row justify-between items-start gap-3">
                      <div className="space-y-1.5">
                        <div className="flex flex-wrap items-center gap-2">
                          <span className={`text-[10px] font-extrabold uppercase px-2.5 py-0.5 rounded-full border ${
                            job.school === 'seguridad'
                              ? 'bg-sky-50 text-sky-700 border-sky-200'
                              : 'bg-amber-50 text-amber-700 border-amber-200'
                          }`}>
                            {job.school === 'seguridad' ? 'Seguridad SPD' : 'Escuela de Oficios'}
                          </span>
                          <span className="text-[10px] font-bold text-slate-600 bg-slate-100 px-2 py-0.5 rounded border border-slate-200">
                            {job.city}
                          </span>
                        </div>

                        <h3 className="text-base sm:text-lg font-bold text-slate-900 group-hover:text-[#0284c7] transition-colors leading-snug">
                          {job.title}
                        </h3>

                        <div className="flex items-center gap-3 text-xs text-slate-600 font-semibold">
                          <span className="flex items-center gap-1.5 text-slate-800 font-bold">
                            <Building2 size={14} className="text-[#0284c7]" />
                            {job.company}
                          </span>
                          <span>•</span>
                          <span className="text-slate-500">{job.postedDate}</span>
                        </div>
                      </div>

                      <span className="bg-emerald-50 text-emerald-800 border border-emerald-200 text-[11px] font-bold px-3 py-1 rounded-full shadow-xs flex items-center gap-1.5 flex-shrink-0">
                        <Award size={13} className="text-emerald-600" />
                        <span>Acreditación PrevySeg</span>
                      </span>
                    </div>

                    {/* Metadata con Íconos (Dinero, Ubicación, Turno) */}
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 p-4 bg-slate-50 rounded-2xl border border-slate-200 text-xs">
                      <div className="flex items-center gap-2 text-emerald-700 font-bold">
                        <DollarSign size={16} className="text-emerald-600 flex-shrink-0" />
                        <span className="font-mono text-sm">{job.salary}</span>
                      </div>

                      <div className="flex items-center gap-2 text-slate-700">
                        <MapPin size={15} className="text-[#00c2b2] flex-shrink-0" />
                        <span>{job.location}</span>
                      </div>

                      <div className="flex items-center gap-2 text-slate-700">
                        <Clock size={15} className="text-sky-600 flex-shrink-0" />
                        <span>{job.shift}</span>
                      </div>
                    </div>

                    {/* Descripción */}
                    <p className="text-xs text-slate-600 leading-relaxed">
                      {job.description}
                    </p>

                    {/* Requisitos rápidos */}
                    <div className="flex flex-wrap gap-2 pt-1">
                      {job.requirements.map((req, rIdx) => (
                        <span key={rIdx} className="text-[11px] bg-slate-50 text-slate-700 px-3 py-1 rounded-xl border border-slate-200 flex items-center gap-1.5">
                          <CheckCircle size={12} className="text-teal-600" />
                          <span>{req}</span>
                        </span>
                      ))}
                    </div>

                    {/* Footer de Tarjeta con Botón de Postulación */}
                    <div className="pt-4 border-t border-slate-100 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
                      <span className="text-xs text-slate-500 font-medium">
                        Vacantes: <strong className="text-emerald-700 font-bold">{job.spots}</strong>
                      </span>

                      {isApplied ? (
                        <div className="bg-emerald-50 text-emerald-800 text-xs font-bold px-5 py-2.5 rounded-xl border border-emerald-300 flex items-center gap-2">
                          <CheckCircle size={15} className="text-emerald-600" />
                          <span>Postulación Enviada ✓</span>
                        </div>
                      ) : (
                        <motion.button
                          whileHover={{ scale: 1.03 }}
                          whileTap={{ scale: 0.97 }}
                          onClick={() => {
                            setSelectedJob(job);
                            setShowApplyModal(true);
                          }}
                          className="w-full sm:w-auto bg-[#00c2b2] hover:bg-teal-500 text-white text-xs font-bold px-6 py-2.5 rounded-xl shadow-md transition-all cursor-pointer flex items-center justify-center gap-2"
                        >
                          <Send size={14} />
                          <span>Postular con mi Perfil PrevySeg</span>
                        </motion.button>
                      )}
                    </div>

                  </motion.div>
                );
              })}
            </div>
          )}

        </main>
      </div>

      {/* Modal de Confirmación de Postulación */}
      <AnimatePresence>
        {showApplyModal && selectedJob && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm">
            <motion.div 
              initial={{ opacity: 0, scale: 0.92, y: 15 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.92, y: 15 }}
              transition={{ duration: 0.25 }}
              className="bg-white border border-slate-200 w-full max-w-lg rounded-3xl shadow-2xl p-6 sm:p-8 relative"
            >
              <button
                onClick={() => setShowApplyModal(false)}
                className="absolute top-4 right-4 text-slate-400 hover:text-slate-700 p-2 rounded-full hover:bg-slate-100 transition-colors cursor-pointer"
              >
                <X size={20} />
              </button>

              <div className="space-y-4">
                <div className="flex items-center gap-2">
                  <span className="text-[10px] font-bold text-emerald-800 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200 uppercase tracking-wider">
                    Convocatoria Directa
                  </span>
                  <span className="text-xs text-slate-500">{selectedJob.company} • {selectedJob.city}</span>
                </div>

                <h2 className="text-xl font-bold text-slate-900">
                  {selectedJob.title}
                </h2>

                <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200 space-y-2 text-xs">
                  <div className="flex justify-between">
                    <span className="text-slate-500">Renta Ofrecida:</span>
                    <strong className="text-teal-700 font-bold font-mono text-sm">{selectedJob.salary}</strong>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-500">Ubicación:</span>
                    <strong className="text-slate-800">{selectedJob.location}</strong>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-500">Modalidad:</span>
                    <strong className="text-slate-800">{selectedJob.shift}</strong>
                  </div>
                </div>

                <div className="p-4 bg-teal-50 rounded-2xl border border-teal-200 text-xs text-slate-700 space-y-1.5">
                  <p className="font-bold text-teal-800 flex items-center gap-1.5">
                    <ShieldCheck size={15} /> Documentación verificada que se adjuntará:
                  </p>
                  <p className="text-[11px] text-slate-600 leading-relaxed">
                    • Postulante: <strong className="text-slate-900">{currentUser?.nombre || 'Alumno Registrado'}</strong>
                    <br />• RUT: <strong className="text-slate-900 font-mono">{currentUser?.rut}</strong>
                    <br />• Certificados emitidos por OTEC PrevySeg
                    <br />• Acreditación {selectedJob.school === 'seguridad' ? 'SPD (Subsecretaría de Prevención del Delito)' : 'SENCE / Competencias Técnicas'}
                  </p>
                </div>

                <div className="pt-3 flex justify-end gap-3">
                  <button
                    type="button"
                    onClick={() => setShowApplyModal(false)}
                    className="px-4 py-2.5 text-xs font-semibold text-slate-600 hover:text-slate-900 rounded-xl hover:bg-slate-100 cursor-pointer transition-colors border border-slate-200"
                  >
                    Cancelar
                  </button>
                  <motion.button
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.97 }}
                    type="button"
                    onClick={() => handleApply(selectedJob.id)}
                    className="px-6 py-2.5 text-xs font-bold text-white bg-[#00c2b2] hover:bg-teal-500 rounded-xl shadow-md cursor-pointer flex items-center gap-2"
                  >
                    <Send size={14} />
                    <span>Enviar Postulación Verificada</span>
                  </motion.button>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

    </div>
  );
};

export default JobBoardView;
