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
  HardHat
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

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
  const [filterSchool, setFilterSchool] = useState('todos');
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
          // ================= OFERTAS SEGURIDAD PRIVADA (SPD) =================
          {
            id: 'job-01',
            title: 'Guardia de Seguridad - Retail y Centros Comerciales (Registro SPD)',
            school: 'seguridad',
            company: 'Securitas Chile S.A.',
            location: 'Arica Centro (Mall Plaza)',
            city: 'Arica',
            salary: '$650.000 - $720.000 CLP Líquido',
            salaryNumber: 650000,
            shift: '4x4 Rotativo (Día y Noche)',
            type: 'guardia',
            postedDate: 'Publicado hoy',
            spots: '4 Vacantes disponibles',
            description: 'Control de accesos, prevención de pérdidas y atención de público en centro comercial de Arica. Se ofrece estabilidad laboral, colación y uniforme completo.',
            requirements: [
              'Credencial de Guardia vigente / Registro SPD',
              'Enseñanza media completa',
              'Certificado de antecedentes intachable',
              'Certificación OTEC PrevySeg (Preferencial)',
            ],
          },
          {
            id: 'job-02',
            title: 'Operador de Central de Monitoreo CCTV & Alarmas',
            school: 'seguridad',
            company: 'Prosegur Seguridad Privada',
            location: 'Iquique - Zona Franca (ZOFRI)',
            city: 'Iquique',
            salary: '$780.000 - $880.000 CLP Líquido',
            salaryNumber: 780000,
            shift: '5x2 Diurno (Lunes a Viernes)',
            type: 'cctv',
            postedDate: 'Hace 1 día',
            spots: '2 Vacantes',
            description: 'Operación y televigilancia de red de cámaras IP en recinto franco, gestión de incidentes en tiempo real y despacho de unidades de apoyo preventivo.',
            requirements: [
              'Curso de Operador CCTV / Seguridad Electrónica',
              'Manejo de sistemas VMS (HikCentral / Milestone)',
              'Certificación PrevySeg comprobable',
            ],
          },
          {
            id: 'job-03',
            title: 'Guardia de Seguridad Marítimo Portuario (Código PBIP)',
            school: 'seguridad',
            company: 'Empresa Portuaria Arica (TPA)',
            location: 'Terminal Puerto Arica',
            city: 'Arica',
            salary: '$820.000 - $920.000 CLP Líquido',
            salaryNumber: 820000,
            shift: '7x7 Turno Continuo',
            type: 'maritimo',
            postedDate: 'Hace 2 días',
            spots: '6 Vacantes',
            description: 'Control de ingreso y egreso de cargas internacionales, fiscalización en muelles y cumplimiento estricto del Código PBIP.',
            requirements: [
              'Curso Guardia Marítimo Portuario / Acreditación Directemar',
              'Acreditación PrevySeg aprobada',
              'Salud compatible con faenas portuarias',
            ],
          },
          {
            id: 'job-04',
            title: 'Supervisor de Seguridad Faena Minera Antofagasta',
            school: 'seguridad',
            company: 'Mining Security Solutions',
            location: 'Antofagasta - Faena Cordillera',
            city: 'Antofagasta',
            salary: '$1.100.000 - $1.300.000 CLP Líquido',
            salaryNumber: 1100000,
            shift: '7x7 Turno Minero con Campamento',
            type: 'supervisor',
            postedDate: 'Hace 3 días',
            spots: '3 Vacantes',
            description: 'Liderazgo operativo de dotación de guardias, control de garitas de acceso a mina y reportabilidad a jefatura de protección industrial.',
            requirements: [
              'Curso de Supervisor de Seguridad SPD / SENCE',
              'Licencia de conducir clase B al día',
              'Examen de altura física aprobado',
            ],
          },

          // ================= OFERTAS ESCUELA DE OFICIOS & MINERÍA =================
          {
            id: 'job-05',
            title: 'Operador de Grúa Horquilla - Centro de Distribución y Faena',
            school: 'oficios',
            company: 'Logística Minera & Industrial S.A.',
            location: 'Antofagasta - La Negra',
            city: 'Antofagasta',
            salary: '$850.000 - $950.000 CLP Líquido + Bonos',
            salaryNumber: 850000,
            shift: '4x4 Rotativo',
            type: 'grua',
            postedDate: 'Publicado hoy',
            spots: '5 Vacantes',
            description: 'Movilización de pallets, carga y descarga de camiones de alto tonelaje en bodega de insumos mineros y repuestos.',
            requirements: [
              'Licencia Clase D y Curso de Grúa Horquilla aprobado',
              'Certificación PrevySeg',
              'Hoja de vida de conductor intachable',
            ],
          },
          {
            id: 'job-06',
            title: 'Técnico Instalador Eléctrico SEC - Mantención de Campamento',
            school: 'oficios',
            company: 'Ingeniería y Montajes Calama Ltda.',
            location: 'Calama / Faena El Loa',
            city: 'Calama',
            salary: '$1.050.000 CLP Líquido + Alojamiento',
            salaryNumber: 1050000,
            shift: '14x14 Turno Faena',
            type: 'electricidad',
            postedDate: 'Hace 1 día',
            spots: '4 Vacantes',
            description: 'Mantenimiento eléctrico en tableros, líneas de baja y media tensión en instalaciones de faena minera.',
            requirements: [
              'Certificación Eléctrica SEC Clase D o Superior',
              'Curso de Electricidad PrevySeg',
              'Salud compatible con gran altitud geográfica',
            ],
          },
          {
            id: 'job-07',
            title: 'Encargado de Bodega y Control de Inventarios WMS',
            school: 'oficios',
            company: 'Distribuidora del Norte (ZOFRI)',
            location: 'Iquique - Barrio Industrial',
            city: 'Iquique',
            salary: '$750.000 - $820.000 CLP Líquido',
            salaryNumber: 750000,
            shift: '5x2 Lunes a Viernes',
            type: 'bodega',
            postedDate: 'Hace 2 días',
            spots: '2 Vacantes',
            description: 'Recepción de contenedores, picking, packing y despacho con sistemas de radiofrecuencia y software WMS.',
            requirements: [
              'Curso de Logística y Bodega WMS PrevySeg',
              'Manejo de Excel y software ERP básico',
              'Residencia en Iquique o Alto Hospicio',
            ],
          },
          {
            id: 'job-08',
            title: 'Soldador Estructural en Faena Agrícola y Packing',
            school: 'oficios',
            company: 'Agroservicios Azapa S.A.',
            location: 'Valle de Azapa - Arica',
            city: 'Arica',
            salary: '$890.000 CLP Líquido',
            salaryNumber: 890000,
            shift: '6x1 Diurno',
            type: 'soldadura',
            postedDate: 'Hace 3 días',
            spots: '2 Vacantes',
            description: 'Fabricación y reparación de estructuras metálicas, galpones y líneas de selección de frutas en packing exportador.',
            requirements: [
              'Curso de Soldadura al Arco / Calificación técnica',
              'Experiencia demostrable en soldadura plana y vertical',
              'Certificado PrevySeg preferencial',
            ],
          }
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
      <div className="bg-gradient-to-r from-teal-950 via-slate-900 to-sky-950 p-6 sm:p-8 rounded-3xl border border-teal-800/40 shadow-xl flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
        <div className="space-y-2">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-teal-500/20 text-[#00c2b2] text-xs font-bold border border-teal-500/30">
            <Sparkles size={14} />
            <span>Bolsa Laboral Macro Zona Norte • Convenios SPD, SENCE & Minería</span>
          </div>
          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-white tracking-tight">
            Bolsa de Empleo Regional PrevySeg
          </h1>
          <p className="text-xs sm:text-sm text-gray-300 max-w-2xl leading-relaxed">
            Conecta directamente con empresas de seguridad privada, terminales portuarios, faenas mineras y retail en <strong className="text-white">Arica, Iquique, Antofagasta y Calama</strong>. Tu perfil se envía con sello de verificación académica.
          </p>
        </div>

        {/* Buscador de empleos */}
        <div className="relative w-full md:w-80">
          <input
            type="text"
            placeholder="Buscar cargo, faena o ciudad..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-[#121315] border border-gray-700/80 rounded-xl pl-10 pr-4 py-2.5 text-xs sm:text-sm text-white placeholder-gray-500 focus:outline-none focus:border-[#00c2b2] shadow-inner"
          />
          <Search size={16} className="absolute left-3.5 top-3 text-gray-400" />
        </div>
      </div>

      {/* 2. Layout: Barra Lateral Izquierda (Filtros) + Columna Principal Derecha (Lista de Ofertas) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* BARRA LATERAL IZQUIERDA: Filtros (Escuela, Ciudad, Puesto, Turno) */}
        <aside className="lg:col-span-4 space-y-6">
          <div className="bg-[#121316] rounded-2xl border border-gray-800 p-6 space-y-6 shadow-xl sticky top-24">
            <div className="flex items-center justify-between border-b border-gray-800 pb-3">
              <h2 className="text-sm font-bold text-white uppercase tracking-wider flex items-center gap-2">
                <Filter size={16} className="text-[#00c2b2]" />
                <span>Filtros de Búsqueda</span>
              </h2>
              {(filterSchool !== 'todos' || filterType !== 'todos' || filterShift !== 'todos' || filterLocation !== 'todos') && (
                <button
                  onClick={() => { setFilterSchool('todos'); setFilterType('todos'); setFilterShift('todos'); setFilterLocation('todos'); }}
                  className="text-[11px] text-teal-400 hover:underline cursor-pointer"
                >
                  Limpiar
                </button>
              )}
            </div>

            {/* Filtro 1: Selector de Escuela */}
            <div className="space-y-2">
              <label className="block text-xs font-bold text-gray-300 flex items-center gap-1.5">
                <Shield size={14} className="text-[#0284c7]" />
                <span>Escuela Formativa</span>
              </label>
              <select
                value={filterSchool}
                onChange={(e) => setFilterSchool(e.target.value)}
                className="w-full bg-[#18191c] border border-gray-700/80 rounded-xl px-3.5 py-2.5 text-xs text-gray-200 focus:outline-none focus:border-[#00c2b2]"
              >
                <option value="todos">Todas las Escuelas</option>
                <option value="seguridad">Escuela de Seguridad Privada (SPD)</option>
                <option value="oficios">Escuela de Oficios & Minería</option>
              </select>
            </div>

            {/* Filtro 2: Ubicación Regional */}
            <div className="space-y-2">
              <label className="block text-xs font-bold text-gray-300 flex items-center gap-1.5">
                <MapPin size={14} className="text-[#00c2b2]" />
                <span>Ciudad / Faena</span>
              </label>
              <select
                value={filterLocation}
                onChange={(e) => setFilterLocation(e.target.value)}
                className="w-full bg-[#18191c] border border-gray-700/80 rounded-xl px-3.5 py-2.5 text-xs text-gray-200 focus:outline-none focus:border-[#00c2b2]"
              >
                <option value="todos">Toda la Macro Zona Norte</option>
                <option value="Arica">Arica y Parinacota</option>
                <option value="Iquique">Iquique y ZOFRI (Tarapacá)</option>
                <option value="Antofagasta">Antofagasta (Minería y Puertos)</option>
                <option value="Calama">Calama y Faenas Cordillera</option>
              </select>
            </div>

            {/* Filtro 3: Tipo de Puesto */}
            <div className="space-y-2">
              <label className="block text-xs font-bold text-gray-300 flex items-center gap-1.5">
                <Briefcase size={14} className="text-amber-400" />
                <span>Especialidad / Cargo</span>
              </label>
              <select
                value={filterType}
                onChange={(e) => setFilterType(e.target.value)}
                className="w-full bg-[#18191c] border border-gray-700/80 rounded-xl px-3.5 py-2.5 text-xs text-gray-200 focus:outline-none focus:border-[#00c2b2]"
              >
                <option value="todos">Todos los cargos</option>
                <option value="guardia">Guardia de Seguridad SPD</option>
                <option value="cctv">Operador CCTV / Monitoreo</option>
                <option value="maritimo">Seguridad Marítimo Portuario</option>
                <option value="supervisor">Supervisor de Seguridad</option>
                <option value="grua">Operador Grúa Horquilla</option>
                <option value="electricidad">Electricista SEC</option>
                <option value="bodega">Bodega & Logística WMS</option>
                <option value="soldadura">Soldador Estructural</option>
              </select>
            </div>

            {/* Filtro 4: Turnos */}
            <div className="space-y-2">
              <label className="block text-xs font-bold text-gray-300 flex items-center gap-1.5">
                <Clock size={14} className="text-sky-400" />
                <span>Modalidad de Turno</span>
              </label>
              <select
                value={filterShift}
                onChange={(e) => setFilterShift(e.target.value)}
                className="w-full bg-[#18191c] border border-gray-700/80 rounded-xl px-3.5 py-2.5 text-xs text-gray-200 focus:outline-none focus:border-[#00c2b2]"
              >
                <option value="todos">Todos los turnos</option>
                <option value="4x4">Turno 4x4 Rotativo</option>
                <option value="5x2">Turno 5x2 Diurno</option>
                <option value="7x7">Turno 7x7 Faena / Minería</option>
                <option value="14x14">Turno 14x14 Campamento</option>
                <option value="6x1">Turno 6x1</option>
              </select>
            </div>

            {/* Info Box: Sello PrevySeg */}
            <div className="p-4 rounded-xl bg-teal-950/40 border border-teal-500/30 text-xs space-y-2">
              <div className="flex items-center gap-2 font-bold text-teal-300">
                <ShieldCheck size={16} />
                <span>Perfil Verificado OTEC</span>
              </div>
              <p className="text-[11px] text-gray-300 leading-relaxed">
                Tus postulaciones se envían acompañadas de tu certificado oficial digital y código QR de validación curricular.
              </p>
            </div>

          </div>
        </aside>

        {/* COLUMNA PRINCIPAL DERECHA: Lista de Ofertas */}
        <main className="lg:col-span-8 space-y-6">
          <div className="flex items-center justify-between px-1">
            <span className="text-xs text-gray-400 font-semibold">
              Mostrando <strong className="text-white">{filteredJobs.length}</strong> convocatorias laborales en la Macro Zona Norte
            </span>
            <span className="text-xs text-[#00c2b2] font-semibold flex items-center gap-1">
              <Sparkles size={13} /> Convocatorias 2026
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
              <p className="text-xs text-slate-400">Prueba ajustando los filtros de escuela, ciudad o modalidad.</p>
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
                    whileHover={{ y: -4, scale: 1.008 }}
                    className="bg-gradient-to-b from-[#16171a] to-[#121316] rounded-3xl border border-white/10 hover:border-teal-500/40 hover:shadow-2xl hover:shadow-teal-950/40 p-6 space-y-5 transition-all duration-300 shadow-xl group"
                  >
                    {/* Fila Superior: Cargo, Escuela y Empresa */}
                    <div className="flex flex-col sm:flex-row justify-between items-start gap-3">
                      <div className="space-y-1.5">
                        <div className="flex flex-wrap items-center gap-2">
                          <span className={`text-[10px] font-extrabold uppercase px-2.5 py-0.5 rounded-full border ${
                            job.school === 'seguridad'
                              ? 'bg-sky-950 text-sky-300 border-sky-400/40'
                              : 'bg-amber-950 text-amber-300 border-amber-400/40'
                          }`}>
                            {job.school === 'seguridad' ? 'Seguridad SPD' : 'Escuela de Oficios'}
                          </span>
                          <span className="text-[10px] font-bold text-slate-400 bg-slate-800 px-2 py-0.5 rounded border border-white/10">
                            {job.city}
                          </span>
                        </div>

                        <h3 className="text-base sm:text-lg font-bold text-white group-hover:text-[#38bdf8] transition-colors leading-snug">
                          {job.title}
                        </h3>

                        <div className="flex items-center gap-3 text-xs text-slate-300 font-semibold">
                          <span className="flex items-center gap-1.5 text-slate-200">
                            <Building2 size={14} className="text-[#0284c7]" />
                            {job.company}
                          </span>
                          <span>•</span>
                          <span className="text-slate-400">{job.postedDate}</span>
                        </div>
                      </div>

                      {/* Badge Verde de Certificación */}
                      <span className="bg-emerald-950/90 text-emerald-300 border border-emerald-500/40 text-[11px] font-bold px-3 py-1 rounded-full shadow flex items-center gap-1.5 flex-shrink-0">
                        <Award size={13} className="text-emerald-400" />
                        <span>Acreditación PrevySeg</span>
                      </span>
                    </div>

                    {/* Metadata con Íconos (Dinero, Ubicación, Turno) */}
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 p-4 bg-[#18191c]/80 rounded-2xl border border-white/10 text-xs">
                      <div className="flex items-center gap-2 text-emerald-400 font-bold">
                        <DollarSign size={16} className="text-emerald-500 flex-shrink-0" />
                        <span className="font-mono text-sm">{job.salary}</span>
                      </div>

                      <div className="flex items-center gap-2 text-slate-300">
                        <MapPin size={15} className="text-[#00c2b2] flex-shrink-0" />
                        <span>{job.location}</span>
                      </div>

                      <div className="flex items-center gap-2 text-slate-300">
                        <Clock size={15} className="text-sky-400 flex-shrink-0" />
                        <span>{job.shift}</span>
                      </div>
                    </div>

                    {/* Descripción */}
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
                        Vacantes: <strong className="text-emerald-400 font-bold">{job.spots}</strong>
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
              <button
                onClick={() => setShowApplyModal(false)}
                className="absolute top-4 right-4 text-slate-400 hover:text-white p-2 rounded-full hover:bg-white/10 transition-colors cursor-pointer"
              >
                <X size={20} />
              </button>

              <div className="space-y-4">
                <div className="flex items-center gap-2">
                  <span className="text-[10px] font-bold text-emerald-300 bg-emerald-950/80 px-3 py-1 rounded-full border border-emerald-500/40 uppercase tracking-wider">
                    Convocatoria Directa
                  </span>
                  <span className="text-xs text-slate-400">{selectedJob.company} • {selectedJob.city}</span>
                </div>

                <h2 className="text-xl font-bold text-white">
                  {selectedJob.title}
                </h2>

                <div className="p-4 bg-[#121315] rounded-2xl border border-white/10 space-y-2 text-xs">
                  <div className="flex justify-between">
                    <span className="text-slate-400">Renta Ofrecida:</span>
                    <strong className="text-[#00c2b2] font-bold font-mono text-sm">{selectedJob.salary}</strong>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-400">Ubicación:</span>
                    <strong className="text-slate-200">{selectedJob.location}</strong>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-400">Modalidad:</span>
                    <strong className="text-slate-200">{selectedJob.shift}</strong>
                  </div>
                </div>

                <div className="p-4 bg-teal-950/30 rounded-2xl border border-teal-500/30 text-xs text-slate-300 space-y-1.5 shadow-inner">
                  <p className="font-bold text-teal-300 flex items-center gap-1.5">
                    <ShieldCheck size={15} /> Documentación verificada que se adjuntará:
                  </p>
                  <p className="text-[11px] text-slate-400 leading-relaxed">
                    • Postulante: <strong className="text-white">{currentUser?.nombre || 'Alumno Registrado'}</strong>
                    <br />• RUT: <strong className="text-white font-mono">{currentUser?.rut}</strong>
                    <br />• Certificados emitidos por OTEC PrevySeg
                    <br />• Acreditación {selectedJob.school === 'seguridad' ? 'SPD (Subsecretaría de Prevención del Delito)' : 'SENCE / Competencias Técnicas'}
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
