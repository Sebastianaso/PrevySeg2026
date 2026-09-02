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
  AlertCircle
} from 'lucide-react';

/////AGREGAR BASE DE DATOS/DOMINIO AQUI///
const API_BASE_URL = "/////AGREGAR BASE DE DATOS/DOMINIO AQUI///";
const JOBS_ENDPOINT = `${API_BASE_URL}/api/v1/bolsa-empleo/ofertas`; /////AGREGAR BASE DE DATOS/DOMINIO AQUI///

const JobBoardView = ({ currentUser }) => {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedJob, setSelectedJob] = useState(null);
  const [appliedJobs, setAppliedJobs] = useState([]);
  const [showApplyModal, setShowApplyModal] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  // Filtros de barra lateral
  const [filterType, setFilterType] = useState('todos');
  const [filterShift, setFilterShift] = useState('todos');
  const [filterLocation, setFilterLocation] = useState('todos');

  // useEffect simulando fetch de ofertas laborales desde la Base de Datos
  useEffect(() => {
    const fetchJobs = async () => {
      setLoading(true);
      try {
        /////AGREGAR BASE DE DATOS/DOMINIO AQUI///
        // En producción:
        // const res = await fetch(JOBS_ENDPOINT);
        // const data = await res.json();
        // setJobs(data);

        const mockJobs = [
          {
            id: 'job-01',
            title: 'Guardia de Seguridad OS-10 - Retail y Centros Comerciales',
            company: 'Securitas Chile S.A.',
            location: 'Arica Centro (Mall Plaza)',
            salary: '$650.000 - $720.000 CLP Líquido',
            salaryNumber: 650000,
            shift: '4x4 Rotativo (Día y Noche)',
            type: 'os10',
            postedDate: 'Publicado hoy',
            spots: '4 Vacantes disponibles',
            description: 'Buscamos guardias de seguridad con curso OS-10 al día para control de accesos, prevención de pérdidas y atención de público en centro comercial de Arica. Se ofrece estabilidad laboral, colación y uniforme completo.',
            requirements: [
              'Curso OS-10 al día (Acreditado por Carabineros)',
              'Enseñanza media completa',
              'Certificado de antecedentes intachable',
              'Certificación OTEC PrevySeg (Preferencial)',
            ],
          },
          {
            id: 'job-02',
            title: 'Operador de Central de Monitoreo CCTV & Alarmas',
            company: 'Prosegur Seguridad Privada',
            location: 'Arica - Zona Industrial Chacalluta',
            salary: '$750.000 - $850.000 CLP Líquido',
            salaryNumber: 750000,
            shift: '5x2 Diurno (Lunes a Viernes)',
            type: 'cctv',
            postedDate: 'Hace 1 día',
            spots: '2 Vacantes',
            description: 'Operación y televigilancia de red de cámaras IP, gestión de incidentes en tiempo real y despacho de unidades de apoyo preventivo.',
            requirements: [
              'Curso de Operador CCTV / Seguridad Electrónica',
              'Manejo de sistemas VMS (HikCentral / Milestone)',
              'Certificación PrevySeg comprobable',
            ],
          },
          {
            id: 'job-03',
            title: 'Guardia de Seguridad Marítimo Portuario',
            company: 'Empresa Portuaria Arica (TPA)',
            location: 'Terminal Puerto Arica',
            salary: '$820.000 - $920.000 CLP Líquido',
            salaryNumber: 820000,
            shift: '7x7 Turno Continuo',
            type: 'maritimo',
            postedDate: 'Hace 2 días',
            spots: '6 Vacantes',
            description: 'Control de ingreso y egreso de cargas internacionales, fiscalización en muelles y cumplimiento estricto del Código de Protección de Buques e Instalaciones Portuarias (PBIP).',
            requirements: [
              'Curso Guardia Marítimo Portuario acreditado Directemar',
              'Acreditación PrevySeg aprobada',
              'Salud compatible con faenas portuarias',
            ],
          },
          {
            id: 'job-04',
            title: 'Vigilante Privado Bancario',
            company: 'BancoEstado / Red de Sucursales Norte',
            location: 'Arica y Parinacota',
            salary: '$950.000 - $1.100.000 CLP Líquido',
            salaryNumber: 950000,
            shift: '5x2 Bancario (08:30 a 16:30 hrs)',
            type: 'vigilante',
            postedDate: 'Hace 3 días',
            spots: '1 Vacante',
            description: 'Custodia y protección de valores, control de cajas y bóvedas en sucursal bancaria. Porte de armamento de servicio autorizado por OS-10.',
            requirements: [
              'Curso de Vigilante Privado (Decreto 1773)',
              'Idoneidad cívica y psicológica vigente',
              'Formación de egresado PrevySeg',
            ],
          },
          {
            id: 'job-05',
            title: 'Supervisor de Seguridad y Control de Faena Agrícola',
            company: 'Agrícola del Sol - Valle de Azapa',
            location: 'Valle de Azapa - Arica',
            salary: '$880.000 CLP Líquido + Bono de Desempeño',
            salaryNumber: 880000,
            shift: '6x1 Diurno',
            type: 'supervisor',
            postedDate: 'Hace 4 días',
            spots: '2 Vacantes',
            description: 'Supervisión de rondas perimetrales en packing, control de flota de transporte de exportación y coordinación de turnos de guardias.',
            requirements: [
              'Licencia de conducir clase B',
              'Curso de Supervisor de Seguridad SENCE',
              'Diplomado o Curso PrevySeg',
            ],
          },
        ];

        setTimeout(() => {
          setJobs(mockJobs);
          setSelectedJob(mockJobs[0]);
          setLoading(false);
        }, 300);

      } catch (error) {
        console.error("Error al obtener ofertas de empleo:", error);
        setLoading(false);
      }
    };

    fetchJobs();
  }, []);

  // Filtrado de ofertas
  const filteredJobs = jobs.filter((job) => {
    const matchesSearch = job.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          job.company.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          job.location.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesType = filterType === 'todos' || job.type === filterType;
    const matchesShift = filterShift === 'todos' || job.shift.toLowerCase().includes(filterShift.toLowerCase());
    const matchesLocation = filterLocation === 'todos' || job.location.toLowerCase().includes(filterLocation.toLowerCase());

    return matchesSearch && matchesType && matchesShift && matchesLocation;
  });

  const handleApply = (jobId) => {
    if (!appliedJobs.includes(jobId)) {
      setAppliedJobs([...appliedJobs, jobId]);
    }
    setShowApplyModal(false);
    alert("¡Postulación enviada con éxito! La empresa empleadora recibirá tu perfil verificado y los certificados emitidos por OTEC PrevySeg.");
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-200">
      
      {/* 1. Encabezado estilo Bolsa Nacional de Empleo (BNE) */}
      <div className="bg-gradient-to-r from-teal-950 via-slate-900 to-gray-900 p-6 sm:p-8 rounded-3xl border border-teal-800/40 shadow-xl flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
        <div className="space-y-2">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-teal-500/20 text-[#00c2b2] text-xs font-bold border border-teal-500/30">
            <Sparkles size={14} />
            <span>Bolsa Laboral Exclusiva • Convenio Empresas OS-10</span>
          </div>
          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-white tracking-tight">
            Bolsa de Empleo para Alumnos PrevySeg
          </h1>
          <p className="text-xs sm:text-sm text-gray-300 max-w-2xl leading-relaxed">
            Conecta directamente con empresas de seguridad privada, terminales portuarios y faenas mineras en la región de Arica y Parinacota. Tu perfil incluye verificación de tus cursos aprobados.
          </p>
        </div>

        {/* Buscador de empleos */}
        <div className="relative w-full md:w-80">
          <input
            type="text"
            placeholder="Buscar por cargo, empresa o zona..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-[#121315] border border-gray-700/80 rounded-xl pl-10 pr-4 py-2.5 text-xs sm:text-sm text-white placeholder-gray-500 focus:outline-none focus:border-[#00c2b2] shadow-inner"
          />
          <Search size={16} className="absolute left-3.5 top-3 text-gray-400" />
        </div>
      </div>

      {/* 2. Layout: Barra Lateral Izquierda (Filtros) + Columna Principal Derecha (Lista de Ofertas) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* BARRA LATERAL IZQUIERDA: Filtros (Tipo de guardia, Turnos, Ubicación) */}
        <aside className="lg:col-span-4 space-y-6">
          <div className="bg-[#121316] rounded-2xl border border-gray-800 p-6 space-y-6 shadow-xl sticky top-24">
            <div className="flex items-center justify-between border-b border-gray-800 pb-3">
              <h2 className="text-sm font-bold text-white uppercase tracking-wider flex items-center gap-2">
                <Filter size={16} className="text-[#00c2b2]" />
                <span>Filtros de Búsqueda</span>
              </h2>
              {(filterType !== 'todos' || filterShift !== 'todos' || filterLocation !== 'todos') && (
                <button
                  onClick={() => { setFilterType('todos'); setFilterShift('todos'); setFilterLocation('todos'); }}
                  className="text-[11px] text-teal-400 hover:underline cursor-pointer"
                >
                  Limpiar
                </button>
              )}
            </div>

            {/* Filtro 1: Tipo de Guardia / Especialidad */}
            <div className="space-y-2">
              <label className="block text-xs font-bold text-gray-300">
                Tipo de Puesto / Especialidad
              </label>
              <select
                value={filterType}
                onChange={(e) => setFilterType(e.target.value)}
                className="w-full bg-[#18191c] border border-gray-700/80 rounded-xl px-3.5 py-2.5 text-xs text-gray-200 focus:outline-none focus:border-[#00c2b2]"
              >
                <option value="todos">Todos los puestos</option>
                <option value="os10">Guardia de Seguridad OS-10</option>
                <option value="cctv">Operador CCTV / Monitoreo</option>
                <option value="maritimo">Guardia Marítimo Portuario</option>
                <option value="vigilante">Vigilante Privado Bancario</option>
                <option value="supervisor">Supervisor de Turno / Seguridad</option>
              </select>
            </div>

            {/* Filtro 2: Turnos y Jornadas */}
            <div className="space-y-2">
              <label className="block text-xs font-bold text-gray-300">
                Modalidad de Turnos
              </label>
              <select
                value={filterShift}
                onChange={(e) => setFilterShift(e.target.value)}
                className="w-full bg-[#18191c] border border-gray-700/80 rounded-xl px-3.5 py-2.5 text-xs text-gray-200 focus:outline-none focus:border-[#00c2b2]"
              >
                <option value="todos">Todos los turnos</option>
                <option value="4x4">Turno 4x4 Rotativo</option>
                <option value="5x2">Turno 5x2 Diurno</option>
                <option value="6x1">Turno 6x1</option>
                <option value="7x7">Turno 7x7 Continuo</option>
              </select>
            </div>

            {/* Filtro 3: Ubicación */}
            <div className="space-y-2">
              <label className="block text-xs font-bold text-gray-300">
                Ubicación
              </label>
              <select
                value={filterLocation}
                onChange={(e) => setFilterLocation(e.target.value)}
                className="w-full bg-[#18191c] border border-gray-700/80 rounded-xl px-3.5 py-2.5 text-xs text-gray-200 focus:outline-none focus:border-[#00c2b2]"
              >
                <option value="todos">Toda la región</option>
                <option value="Arica">Arica Urbano</option>
                <option value="Puerto">Puerto de Arica</option>
                <option value="Azapa">Valle de Azapa</option>
                <option value="Chacalluta">Zona Industrial Chacalluta</option>
              </select>
            </div>

            {/* Info Box: Ventaja de Certificación */}
            <div className="p-4 rounded-xl bg-teal-950/40 border border-teal-500/30 text-xs space-y-2">
              <div className="flex items-center gap-2 font-bold text-teal-300">
                <ShieldCheck size={16} />
                <span>Perfil Verificado PrevySeg</span>
              </div>
              <p className="text-[11px] text-gray-300 leading-relaxed">
                Tus postulaciones se envían con sello de validación directa OTEC, otorgándote prioridad en las entrevistas de selección.
              </p>
            </div>

          </div>
        </aside>

        {/* COLUMNA PRINCIPAL DERECHA: Lista de Ofertas Laborales */}
        <main className="lg:col-span-8 space-y-6">
          <div className="flex items-center justify-between px-1">
            <span className="text-xs text-gray-400 font-semibold">
              Mostrando <strong className="text-white">{filteredJobs.length}</strong> ofertas laborales disponibles
            </span>
            <span className="text-xs text-[#00c2b2] font-semibold flex items-center gap-1">
              <Sparkles size={13} /> Actualizado al día de hoy
            </span>
          </div>

          {loading ? (
            <div className="space-y-4">
              {[1, 2, 3].map((sk) => (
                <div key={sk} className="bg-slate-900/60 rounded-3xl border border-white/10 p-6 space-y-4 animate-pulse">
                  <div className="flex justify-between items-start">
                    <div className="space-y-2 w-2/3">
                      <div className="h-5 bg-slate-800/80 rounded w-3/4" />
                      <div className="h-3 bg-slate-800/80 rounded w-1/3" />
                    </div>
                    <div className="h-6 bg-slate-800/80 rounded-full w-36" />
                  </div>
                  <div className="h-12 bg-slate-800/80 rounded-2xl w-full" />
                  <div className="h-4 bg-slate-800/80 rounded w-5/6" />
                </div>
              ))}
            </div>
          ) : filteredJobs.length === 0 ? (
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="bg-[#121316] rounded-3xl border border-white/10 p-12 text-center space-y-3 shadow-xl"
            >
              <AlertCircle size={36} className="text-slate-500 mx-auto" />
              <h3 className="text-base font-bold text-slate-200">No se encontraron ofertas laborales</h3>
              <p className="text-xs text-slate-400">Prueba ajustando los filtros de búsqueda o ubicación.</p>
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
                    transition={{ duration: 0.35, delay: idx * 0.06 }}
                    whileHover={{ y: -4, scale: 1.008 }}
                    className="bg-gradient-to-b from-[#16171a] to-[#121316] rounded-3xl border border-white/10 hover:border-teal-500/40 hover:shadow-2xl hover:shadow-teal-950/40 p-6 space-y-5 transition-all duration-300 shadow-xl group"
                  >
                    {/* Fila Superior: Cargo, Empresa y Badge Verde */}
                    <div className="flex flex-col sm:flex-row justify-between items-start gap-4">
                      <div className="space-y-1.5">
                        <div className="flex items-center gap-2">
                          <h3 className="text-lg font-bold text-white group-hover:text-[#38bdf8] transition-colors leading-snug">
                            {job.title}
                          </h3>
                        </div>

                        <div className="flex items-center gap-3 text-xs text-slate-300 font-semibold">
                          <span className="flex items-center gap-1.5 text-slate-200">
                            <Building2 size={14} className="text-[#0284c7]" />
                            {job.company}
                          </span>
                          <span>•</span>
                          <span className="text-slate-400">{job.postedDate}</span>
                        </div>
                      </div>

                      {/* Badge Verde: "Requiere Certificación PrevySeg" */}
                      <span className="bg-emerald-950/90 text-emerald-300 border border-emerald-500/40 text-[11px] font-bold px-3 py-1 rounded-full shadow flex items-center gap-1.5 flex-shrink-0">
                        <Award size={13} className="text-emerald-400" />
                        <span>Requiere Certificación PrevySeg</span>
                      </span>
                    </div>

                    {/* Metadata con Íconos (Dinero, Ubicación, Turno) */}
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 p-4 bg-[#18191c]/80 rounded-2xl border border-white/10 text-xs">
                      
                      {/* Renta ofrecida */}
                      <div className="flex items-center gap-2 text-emerald-400 font-bold">
                        <DollarSign size={16} className="text-emerald-500 flex-shrink-0" />
                        <span className="font-mono text-sm">{job.salary}</span>
                      </div>

                      {/* Ubicación */}
                      <div className="flex items-center gap-2 text-slate-300">
                        <MapPin size={15} className="text-[#00c2b2] flex-shrink-0" />
                        <span>{job.location}</span>
                      </div>

                      {/* Turnos */}
                      <div className="flex items-center gap-2 text-slate-300">
                        <Clock size={15} className="text-sky-400 flex-shrink-0" />
                        <span>{job.shift}</span>
                      </div>

                    </div>

                    {/* Descripción de la oferta */}
                    <p className="text-xs text-slate-400 leading-relaxed">
                      {job.description}
                    </p>

                    {/* Requisitos rápidos */}
                    <div className="flex flex-wrap gap-2 pt-1">
                      {job.requirements.map((req, rIdx) => (
                        <span key={rIdx} className="text-[11px] bg-slate-800/80 text-slate-300 px-3 py-1 rounded-xl border border-white/10 flex items-center gap-1.5">
                          <CheckCircle size={12} className="text-[#00c2b2]" />
                          <span>{req}</span>
                        </span>
                      ))}
                    </div>

                    {/* Footer de Tarjeta con Botón de Postulación */}
                    <div className="pt-4 border-t border-white/10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
                      <span className="text-xs text-slate-400 font-medium">
                        Disponibilidad: <strong className="text-emerald-400 font-bold">{job.spots}</strong>
                      </span>

                      {isApplied ? (
                        <div className="bg-emerald-950/80 text-emerald-300 text-xs font-bold px-5 py-2.5 rounded-xl border border-emerald-500/40 flex items-center gap-2">
                          <CheckCircle size={15} />
                          <span>Postulación Enviada ✓</span>
                        </div>
                      ) : (
                        <motion.button
                          whileHover={{ scale: 1.04 }}
                          whileTap={{ scale: 0.96 }}
                          onClick={() => {
                            setSelectedJob(job);
                            setShowApplyModal(true);
                          }}
                          className="w-full sm:w-auto bg-gradient-to-r from-[#00c2b2] to-teal-400 hover:from-teal-400 hover:to-teal-500 text-gray-950 text-xs font-black px-6 py-2.5 rounded-xl shadow-lg shadow-teal-950/50 transition-all cursor-pointer flex items-center justify-center gap-2"
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
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md">
            <motion.div 
              initial={{ opacity: 0, scale: 0.92, y: 15 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.92, y: 15 }}
              transition={{ duration: 0.25 }}
              className="bg-gradient-to-b from-[#18191c] via-[#141518] to-[#101113] border border-white/15 w-full max-w-lg rounded-3xl shadow-2xl p-6 sm:p-8 relative backdrop-blur-2xl"
            >
              <motion.button
                whileHover={{ scale: 1.1, rotate: 90 }}
                whileTap={{ scale: 0.9 }}
                onClick={() => setShowApplyModal(false)}
                className="absolute top-4 right-4 text-slate-400 hover:text-white p-2 rounded-full hover:bg-white/10 transition-colors cursor-pointer"
              >
                <X size={20} />
              </motion.button>

              <div className="space-y-4">
                <div className="flex items-center gap-2">
                  <span className="text-[10px] font-bold text-emerald-300 bg-emerald-950/80 px-3 py-1 rounded-full border border-emerald-500/40 uppercase tracking-wider">
                    Oferta Laboral Directa
                  </span>
                  <span className="text-xs text-slate-400">{selectedJob.company}</span>
                </div>

                <h2 className="text-xl font-bold text-white">
                  {selectedJob.title}
                </h2>

                <div className="p-4 bg-[#121315] rounded-2xl border border-white/10 space-y-2 text-xs">
                  <div className="flex justify-between">
                    <span className="text-slate-400">Renta Líquida:</span>
                    <strong className="text-[#00c2b2] font-bold font-mono text-sm">{selectedJob.salary}</strong>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-400">Ubicación de Faena:</span>
                    <strong className="text-slate-200">{selectedJob.location}</strong>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-400">Jornada:</span>
                    <strong className="text-slate-200">{selectedJob.shift}</strong>
                  </div>
                </div>

                <div className="p-4 bg-teal-950/30 rounded-2xl border border-teal-500/30 text-xs text-slate-300 space-y-1.5 shadow-inner">
                  <p className="font-bold text-teal-300 flex items-center gap-1.5">
                    <ShieldCheck size={15} /> Datos que se adjuntarán automáticamente:
                  </p>
                  <p className="text-[11px] text-slate-400 leading-relaxed">
                    • Nombre: <strong className="text-white">{currentUser?.nombre || 'Alumno Registrado'}</strong>
                    <br />• RUT: <strong className="text-white font-mono">{currentUser?.rut}</strong>
                    <br />• Certificados emitidos por OTEC PrevySeg
                    <br />• Registro oficial ante la Dirección General de Carabineros (OS-10)
                  </p>
                </div>

                <div className="pt-3 flex justify-end gap-3">
                  <button
                    type="button"
                    onClick={() => setShowApplyModal(false)}
                    className="px-4 py-2.5 text-xs font-semibold text-slate-400 hover:text-white rounded-xl hover:bg-white/5 cursor-pointer transition-colors"
                  >
                    Cancelar
                  </button>
                  <motion.button
                    whileHover={{ scale: 1.04 }}
                    whileTap={{ scale: 0.96 }}
                    type="button"
                    onClick={() => handleApply(selectedJob.id)}
                    className="px-6 py-2.5 text-xs font-bold text-gray-950 bg-gradient-to-r from-[#00c2b2] to-teal-400 hover:from-teal-400 hover:to-teal-500 rounded-xl shadow-lg shadow-teal-950/50 cursor-pointer flex items-center gap-2"
                  >
                    <Send size={14} />
                    <span>Enviar Postulación Directa</span>
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
