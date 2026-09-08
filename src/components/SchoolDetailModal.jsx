import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  X, 
  Shield, 
  Wrench, 
  Clock, 
  CheckCircle2, 
  Award, 
  BookOpen, 
  FileText, 
  UserCheck, 
  GraduationCap, 
  ChevronRight, 
  Calendar, 
  DollarSign, 
  Info, 
  LogIn, 
  ArrowRight,
  Sparkles,
  Search,
  Check,
  AlertTriangle,
  HelpCircle,
  ExternalLink
} from 'lucide-react';
import { SecuritySchoolEmblem, TradesSchoolEmblem } from './logos/SchoolLogos';
import { COURSES_DATA } from './Services';

// Módulos y temarios detallados para cada curso por escuela
const SYLLABUS_DETAILS = {
  // ================= SEGURIDAD PRIVADA =================
  'seg-01': {
    modules: [
      'Módulo 1: Legislación de Seguridad Privada (Ley N° 21.659 y decretos complementarios)',
      'Módulo 2: Prevención de Riesgos y Primeros Auxilios de Emergencia en el Puesto de Trabajo',
      'Módulo 3: Técnicas de Control de Accesos, Identificación de Personas y Resguardo Perimetral',
      'Módulo 4: Defensa Personal Aplicada y Reducción No Letal de Sujetos Conflictivos',
      'Módulo 5: Ética Profesional, Manejo de Crisis, Derechos Humanos y Preparación para el Examen SPD'
    ],
    requirements: [
      'Cédula de Identidad chilena vigente (ambos lados)',
      'Certificado de Antecedentes para Fines Especiales (sin anotaciones penales)',
      'Certificado de Estudios: Licencia de Enseñanza Media completa (Mineduc)',
      'Certificado Médico y Psicológico de aptitud física para funciones de seguridad'
    ],
    examType: 'Examen Externo Presencial ante la Subsecretaría de Prevención del Delito (SPD) / Carabineros OS-10'
  },
  'seg-02': {
    modules: [
      'Módulo 1: Marco Normativo de Transporte de Valores y Entidades Bancarias',
      'Módulo 2: Armamento y Tiro Práctico Regulado conforme a la Ley de Armas',
      'Módulo 3: Tácticas de Protección de Activos Críticos y Valores en Tránsito',
      'Módulo 4: Protocolos de Comunicación Segura y Coordinación Operativa Policial',
      'Módulo 5: Gestión de Incidentes de Alto Impacto y Procedimientos Anti-Asalto'
    ],
    requirements: [
      'Haber cumplido con el Servicio Militar o contar con instrucción previa homologada',
      'Licencia de Enseñanza Media',
      'Certificado de Antecedentes para Fines Especiales sin anotaciones',
      'Evaluación psiquiátrica y psicotécnica rigurosa para porte de armas'
    ],
    examType: 'Examen Oficial Teórico-Práctico de Tiro y Seguridad ante la Autoridad Fiscalizadora'
  },
  'seg-03': {
    modules: [
      'Módulo 1: Código PBIP (Protección de Buques e Instalaciones Portuarias)',
      'Módulo 2: Legislación Marítima y Atribuciones de la Autoridad Marítima (Directemar)',
      'Módulo 3: Inspección de Cargas, Contenedores y Detección de Contrabando en Terminales',
      'Módulo 4: Seguridad y Supervivencia en Faenas Portuarias e Industriales'
    ],
    requirements: [
      'Licencia de Enseñanza Media',
      'Certificado de Antecedentes limpio',
      'Certificado médico apto para faenas marítimas'
    ],
    examType: 'Examen Oficial ante la Dirección General del Territorio Marítimo (Directemar)'
  },
  'seg-04': {
    modules: [
      'Módulo 1: Libro de Novedades y Registro de Visitas en Comunidades y Edificios',
      'Módulo 2: Rondas Perimetrales y Manejo Seguro de Puntos Ciegos',
      'Módulo 3: Primeros Auxilios y Evacuación ante Incendios y Sismos',
      'Módulo 4: Comunicación con Carabineros y Plan Cuadrante'
    ],
    requirements: ['Cédula de Identidad vigente', 'Certificado de Antecedentes', 'Enseñanza básica completa'],
    examType: 'Certificación OTEC PrevySeg con Reconocimiento SENCE'
  },
  'seg-05': {
    modules: [
      'Módulo 1: Actualizaciones Jurisprudenciales de la Ley 21.659',
      'Módulo 2: Actualización en Derechos Humanos y Protocolos de Detención Ciudadana',
      'Módulo 3: Reentrenamiento en Primeros Auxilios y Reanimación Cardiopulmonar (RCP)',
      'Módulo 4: Simulacros de Examen Teórico SPD para Renovación de Tarjeta'
    ],
    requirements: ['Tarjeta de Guardia OS-10 previa (vencida o por vencer)', 'Certificado de Antecedentes al día'],
    examType: 'Rendición de Examen Trienal de Renovación ante la SPD'
  },
  'seg-06': {
    modules: [
      'Módulo 1: Actualización de Normas PBIP y Procedimientos Portuarios TPA',
      'Módulo 2: Control de Accesos y Detección de Ilícitos en Faenas Portuarias',
      'Módulo 3: Revalidación de Credencial Directemar'
    ],
    requirements: ['Credencial Marítima previa', 'Certificado de Antecedentes'],
    examType: 'Revalidación ante la Autoridad Marítima Directemar'
  },
  'seg-07': {
    modules: [
      'Módulo 1: Reentrenamiento en Seguridad de Instalaciones Nocturnas',
      'Módulo 2: Protocolos de Actuación y Enlace con Centrales de Emergencia',
      'Módulo 3: Manejo Seguro de Llaves, Portones y Sistemas de Acceso'
    ],
    requirements: ['Cédula de Identidad', 'Certificado de Antecedentes'],
    examType: 'Certificación Directa OTEC PrevySeg'
  },
  'seg-08': {
    modules: [
      'Módulo 1: Arquitectura de Sistemas de Televigilancia y Centrales de Monitoreo',
      'Módulo 2: Operación Profesional de Cámaras PTZ, Fijas y Domos Térmicos',
      'Módulo 3: Software VMS de Gestión de Video y Búsqueda Forense de Evidencias',
      'Módulo 4: Cadena de Custodia de Grabaciones y Protocolos Legales'
    ],
    requirements: ['Licencia de Enseñanza Media', 'Conocimientos básicos de computación'],
    examType: 'Certificación Oficial SENCE OTEC PrevySeg'
  },
  'seg-09': {
    modules: [
      'Módulo 1: Sensores Perimetrales, Microondas, Infrarrojos y Barreras Fotoeléctricas',
      'Módulo 2: Integración de Centrales de Alarma con Sistemas CCTV y Monitoreo Remoto',
      'Módulo 3: Control y Depuración de Falsas Alarmas y Verificación por Video',
      'Módulo 4: Pautas Técnicas de Despacho de Seguridad'
    ],
    requirements: ['Licencia de Enseñanza Media', 'Certificado de Antecedentes'],
    examType: 'Certificación SENCE OTEC PrevySeg'
  },
  'seg-10': {
    modules: [
      'Módulo 1: Ley 21.659 y Responsabilidades Legales del Supervisor de Seguridad',
      'Módulo 2: Elaboración y Presentación de Directivas de Funcionamiento ante la Autoridad',
      'Módulo 3: Gestión y Liderazgo de Turnos Operativos de Vigilancia',
      'Módulo 4: Análisis de Vulnerabilidades y Planes de Continuidad de Operaciones'
    ],
    requirements: ['Enseñanza Media completa', 'Experiencia en seguridad privada', 'Certificado de Antecedentes'],
    examType: 'Certificación de Competencias de Supervisor OTEC PrevySeg'
  },

  // ================= OFICIOS Y HABILIDADES =================
  'of-01': {
    modules: [
      'Módulo 1: Psicología del Conflicto y Dinámicas de Tensión Laboral',
      'Módulo 2: Comunicación Asertiva, Escucha Activa y Lenguaje No Verbal',
      'Módulo 3: Técnicas de Negociación Basada en Principios y Mediación',
      'Módulo 4: Contención Emocional y Manejo de Clientes o Usuarios Hostiles'
    ],
    requirements: ['Cédula de Identidad', 'Mayor de 18 años', 'Acceso a internet'],
    examType: 'Certificación Laboral OTEC PrevySeg con Código SENCE'
  },
  'of-02': {
    modules: [
      'Módulo 1: Identificación Rápida de Detonantes de Conflicto en Terreno',
      'Módulo 2: Desescalamiento Verbal y Protocolos de Seguridad Personal',
      'Módulo 3: Talleres Prácticos y Roleplaying de Situaciones Reales',
      'Módulo 4: Cierre Asertivo de Acuerdos y Seguimiento Laboral'
    ],
    requirements: ['Cédula de Identidad', 'Asistencia 100% presencial'],
    examType: 'Certificado de Taller Práctico Intensivo OTEC PrevySeg'
  },
  'of-03': {
    modules: [
      'Módulo 1: Toxicología, Clasificación y Etiquetado de Plaguicidas según SAG',
      'Módulo 2: Manejo de EPP (Equipos de Protección Personal) y Triple Lavado',
      'Módulo 3: Calibración de Pulverizadores y Técnicas de Aplicación en Campo',
      'Módulo 4: Primeros Auxilios y Protocolos ante Intoxicaciones Químicas'
    ],
    requirements: ['Cédula de Identidad', 'Mayor de 18 años', 'Salud compatible con campo'],
    examType: 'Certificación Preparatoria para Credencial de Aplicador SAG'
  },
  'of-04': {
    modules: [
      'Módulo 1: Seguridad y Salud en el Trabajo Portuario y Código PBIP',
      'Módulo 2: Técnicas de Carga, Descarga, Trincaje y Desestiba en Muelles',
      'Módulo 3: Uso Seguro de Eslingas, Grilletes, Estrobos y Señales de Grúa',
      'Módulo 4: Manejo de Cargas Peligrosas (Código IMDG) en Recintos Portuarios'
    ],
    requirements: ['Cédula de Identidad', 'Mayor de 18 años', 'Salud compatible con faena'],
    examType: 'Certificación de Competencias Laborales OTEC PrevySeg'
  },
  'of-05': {
    modules: [
      'Módulo 1: Microbiología Básica, Enfermedades Transmitidas por Alimentos (ETA)',
      'Módulo 2: Buenas Prácticas de Manufactura (BPM) y Cadena de Frío',
      'Módulo 3: Control de Puntos Críticos (HACCP), Limpieza y Sanitización',
      'Módulo 4: Prevención de Riesgos en Cocinas y Plantas de Procesamiento'
    ],
    requirements: ['Cédula de Identidad vigente', 'Exámenes médicos básicos de manipulador'],
    examType: 'Certificación Oficial para Carnet de Manipulación Seremi de Salud'
  },
  'of-06': {
    modules: [
      'Módulo 1: Fisiología de la Piel, Folículo Piloso y Ciclo de Crecimiento',
      'Módulo 2: Preparación, Calentamiento Seguro y Propiedades de la Cera Miel',
      'Módulo 3: Protocolo Técnico de Depilación en Rostro, Brazos, Piernas y Zona Íntima',
      'Módulo 4: Asepsia, Bioseguridad y Tratamientos Calmantes Post-Depilación'
    ],
    requirements: ['Cédula de Identidad', 'Mayor de 18 años'],
    examType: 'Diploma de Competencia Práctica OTEC PrevySeg'
  },
  'of-07': {
    modules: [
      'Módulo 1: Anatomía de la Uña, Afecciones Comunes y Esterilización de Instrumental',
      'Módulo 2: Manicure Clásica, Limado Anatómico y Tratamiento de Cutícula',
      'Módulo 3: Técnicas de Esmaltado Permanente con Lámpara UV/LED',
      'Módulo 4: Cuidado de la Uña Natural y Retiro Higiénico de Esmalte'
    ],
    requirements: ['Cédula de Identidad', 'Mayor de 18 años'],
    examType: 'Diploma de Competencia Práctica OTEC PrevySeg'
  },
  'of-08': {
    modules: [
      'Módulo 1: Teoría del Color, Preparación de la Piel y Fijación de Larga Duración',
      'Módulo 2: Técnicas de Sombreado de Alto Impacto y Delineados Artísticos',
      'Módulo 3: Adherencia Segura de Pedrería, Glitter, Plumas y Apliques',
      'Módulo 4: Maquillaje Resistente a la Transpiración y Retiro Seguro'
    ],
    requirements: ['Cédula de Identidad', 'Mayor de 18 años'],
    examType: 'Diploma de Competencia Práctica OTEC PrevySeg'
  },
  'of-09': {
    modules: [
      'Módulo 1: Gerontología Básica y Cambios Biopsicosociales en el Envejecimiento',
      'Módulo 2: Técnicas Ergonómicas de Movilización y Prevención de Úlceras (Escaras)',
      'Módulo 3: Aseo y Confort en Cama, Control de Signos Vitales y Alimentación Asistida',
      'Módulo 4: Administración Asistida de Medicamentos y Primeros Auxilios en el Hogar'
    ],
    requirements: ['Cédula de Identidad', 'Mayor de 18 años', 'Vocación de cuidado'],
    examType: 'Certificación Asistencial OTEC PrevySeg con Respaldo SENCE'
  },
  'of-10': {
    modules: [
      'Módulo 1: Nueva Ley de Copropiedad Inmobiliaria N° 21.442 y Reglamento de Copropiedad',
      'Módulo 2: Procedimientos de Caja, Detección de Billetes Falsos y Arqueo Cuadrado',
      'Módulo 3: Cálculo y Facturación de Gastos Comunes, Fondos de Reserva y Multas',
      'Módulo 4: Atención a Copropietarios, Proveedores y Solución de Controversias'
    ],
    requirements: ['Licencia de Enseñanza Media', 'Conocimientos básicos de computación y matemáticas'],
    examType: 'Certificación OTEC PrevySeg de Cajero y Administrador de Condominios'
  }
};

const SchoolDetailModal = ({ 
  school, 
  isOpen, 
  onClose, 
  onSelectCourse, 
  onEnterStudentView, 
  currentUser 
}) => {
  const [selectedCategory, setSelectedCategory] = useState('Todos');
  const [searchQuery, setSearchQuery] = useState('');
  const [expandedCourseId, setExpandedCourseId] = useState(null);

  if (!isOpen || !school) return null;

  const isSecurity = school === 'seguridad';
  const schoolCourses = COURSES_DATA.filter(c => c.school === school);

  // Obtener categorías únicas
  const categories = ['Todos', ...new Set(schoolCourses.map(c => c.category))];

  // Filtrado de cursos
  const filteredCourses = schoolCourses.filter(course => {
    const matchesCat = selectedCategory === 'Todos' || course.category === selectedCategory;
    const matchesSearch = !searchQuery.trim() || 
      course.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      course.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCat && matchesSearch;
  });

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-50 overflow-y-auto bg-slate-950/80 backdrop-blur-md flex items-center justify-center p-3 sm:p-6"
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          transition={{ duration: 0.3 }}
          className="relative w-full max-w-6xl bg-white rounded-3xl shadow-2xl overflow-hidden flex flex-col max-h-[92vh] border border-slate-200"
        >
          {/* ================= ENCABEZADO DE LA ESCUELA ================= */}
          <div className={`relative px-6 py-8 sm:px-10 sm:py-10 text-white overflow-hidden ${
            isSecurity
              ? 'bg-gradient-to-br from-[#071626] via-[#0B2032] to-[#0A7D8C]'
              : 'bg-gradient-to-br from-[#071626] via-[#0B2032] to-[#008B8B]'
          }`}>
            
            {/* Decoración geométrica de fondo */}
            <div className="absolute top-0 right-0 w-96 h-96 opacity-15 pointer-events-none overflow-hidden">
              <svg viewBox="0 0 200 200" className="w-full h-full" fill="none">
                <circle cx="100" cy="100" r="80" stroke="white" strokeWidth="1.5" strokeDasharray="6 6" />
                <path d="M40 0 L200 160 L200 190 L10 0 Z" fill={isSecurity ? '#00C4D8' : '#00FFE0'} />
              </svg>
            </div>

            {/* Botón de Cierre */}
            <button
              type="button"
              onClick={onClose}
              className="absolute top-5 right-5 w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-all cursor-pointer backdrop-blur-sm z-20 border border-white/10"
              aria-label="Cerrar ventana"
            >
              <X size={20} />
            </button>

            <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
              <div className="flex items-center gap-5">
                {isSecurity ? (
                  <SecuritySchoolEmblem className="w-20 h-20 sm:w-24 sm:h-24 flex-shrink-0" />
                ) : (
                  <TradesSchoolEmblem className="w-20 h-20 sm:w-24 sm:h-24 flex-shrink-0" />
                )}
                
                <div className="space-y-1.5">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className={`text-[10px] sm:text-xs font-black tracking-widest uppercase px-3 py-1 rounded-full border ${
                      isSecurity 
                        ? 'bg-[#00C4D8]/20 text-[#00E5FF] border-[#00C4D8]/40' 
                        : 'bg-[#00FFE0]/20 text-[#00FFE0] border-[#00A896]/40'
                    }`}>
                      {isSecurity ? 'PREVYSEG • LEY N° 21.659' : 'PREVYSEG • CÓDIGO SENCE'}
                    </span>
                    <span className="text-[10px] sm:text-xs font-bold px-2.5 py-0.5 rounded-full bg-white/10 text-white border border-white/20">
                      Norma Calidad NCh 2728 SGS
                    </span>
                  </div>

                  <h2 className="text-2xl sm:text-4xl font-black tracking-tight leading-tight text-white">
                    {isSecurity ? 'Escuela de Seguridad Privada' : 'Escuela de Oficios y Cursos SENCE'}
                  </h2>

                  <p className="text-xs sm:text-sm text-slate-200 max-w-2xl leading-relaxed">
                    {isSecurity 
                      ? 'Capacitación técnica y táctica preparatoria conforme a la Ley 21.659. Acreditación oficial ante la Subsecretaría de Prevención del Delito (SPD) y Carabineros OS-10.'
                      : 'Cursos técnicos y de oficios prácticos en talleres de alta tecnología con certificación directa OTEC PrevySeg con validez nacional SENCE para mejorar la empleabilidad laboral.'
                    }
                  </p>
                </div>
              </div>

              {/* Botón destacado: ENTRAR A LA VISTA DE ESTUDIANTE */}
              <div className="flex-shrink-0 flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
                <button
                  type="button"
                  onClick={() => {
                    onClose();
                    if (onEnterStudentView) onEnterStudentView();
                  }}
                  className="px-6 py-3.5 rounded-2xl bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-600 hover:to-teal-600 text-white font-black text-xs sm:text-sm shadow-xl flex items-center justify-center gap-2 cursor-pointer transition-all hover:scale-[1.02]"
                >
                  <GraduationCap size={18} />
                  <span>{currentUser ? 'Ir a Mi Aula Virtual (Estudiante)' : 'Ingresar como Alumno / Aula Virtual'}</span>
                  <ArrowRight size={15} />
                </button>
              </div>
            </div>

            {/* Aviso de Regla de Negocio: 1 Estudiante = 1 Curso */}
            <div className="mt-6 pt-4 border-t border-white/15 flex flex-wrap items-center justify-between gap-3 text-[11px] sm:text-xs text-white/90">
              <div className="flex items-center gap-2">
                <CheckCircle2 size={15} className={isSecurity ? 'text-[#00C4D8]' : 'text-[#00FFE0]'} />
                <span><strong>Regla de Certificación:</strong> Cada estudiante pertenece a un único curso activo para garantizar una atención y evaluación rigurosa.</span>
              </div>
              <span className="font-mono text-white/70">
                {schoolCourses.length} Capacitaciones Oficiales Disponibles
              </span>
            </div>
          </div>

          {/* ================= BARRA DE BÚSQUEDA Y FILTROS ================= */}
          <div className="p-4 sm:p-6 bg-slate-50 border-b border-slate-200 flex flex-col md:flex-row gap-4 justify-between items-stretch md:items-center">
            
            {/* Categorías */}
            <div className="flex items-center gap-2 overflow-x-auto pb-1 md:pb-0">
              {categories.map(category => (
                <button
                  key={category}
                  type="button"
                  onClick={() => setSelectedCategory(category)}
                  className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer whitespace-nowrap ${
                    selectedCategory === category
                      ? isSecurity
                        ? 'bg-[#071626] text-white shadow-sm'
                        : 'bg-[#00A896] text-white shadow-sm'
                      : 'bg-white text-slate-600 hover:bg-slate-100 border border-slate-200'
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>

            {/* Buscador de cursos */}
            <div className="relative min-w-[260px]">
              <Search size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Buscar por nombre o contenido..."
                className="w-full pl-9 pr-4 py-2 rounded-xl bg-white border border-slate-200 text-xs text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-[#0284c7] shadow-sm"
              />
            </div>
          </div>

          {/* ================= CONTENIDO: LISTADO DE CAPACITACIONES CON DESCRIPCIONES ================= */}
          <div className="p-6 sm:p-8 overflow-y-auto space-y-6 flex-grow">
            
            {filteredCourses.length === 0 ? (
              <div className="text-center py-16 text-slate-400 space-y-3">
                <BookOpen size={44} className="mx-auto text-slate-300" />
                <p className="text-sm font-semibold text-slate-600">No se encontraron capacitaciones con ese filtro.</p>
                <button
                  type="button"
                  onClick={() => { setSelectedCategory('Todos'); setSearchQuery(''); }}
                  className="px-4 py-2 rounded-xl bg-slate-100 text-slate-700 text-xs font-bold cursor-pointer hover:bg-slate-200"
                >
                  Restablecer filtros
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {filteredCourses.map(course => {
                  const syllabus = SYLLABUS_DETAILS[course.id] || null;
                  const isExpanded = expandedCourseId === course.id;

                  return (
                    <div 
                      key={course.id}
                      className={`rounded-2xl border transition-all duration-300 overflow-hidden flex flex-col justify-between bg-white shadow-sm hover:shadow-md ${
                        isSecurity ? 'border-slate-200 hover:border-[#0A7D8C]' : 'border-slate-200 hover:border-[#00A896]'
                      }`}
                    >
                      <div>
                        {/* Cabecera del Curso con Imagen */}
                        <div className="relative h-44 w-full overflow-hidden bg-slate-900">
                          <img 
                            src={course.image} 
                            alt={course.title}
                            className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500 opacity-90"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent" />
                          
                          {/* Badges superiores */}
                          <div className="absolute top-3 left-3 right-3 flex justify-between items-start">
                            <span className="text-[10px] font-black tracking-wider uppercase px-2.5 py-1 rounded-lg bg-black/60 backdrop-blur-md text-white border border-white/20">
                              {course.badgeText}
                            </span>
                            <span className="text-[10px] font-extrabold px-2.5 py-1 rounded-lg bg-[#0284c7] text-white shadow">
                              {course.duration}
                            </span>
                          </div>

                          {/* Título en la imagen */}
                          <div className="absolute bottom-3 left-3 right-3">
                            <span className="text-[10px] font-bold uppercase tracking-wider text-sky-300 block mb-1">
                              {course.category}
                            </span>
                            <h3 className="text-base sm:text-lg font-black text-white leading-snug drop-shadow-sm">
                              {course.title}
                            </h3>
                          </div>
                        </div>

                        {/* Descripción y Detalles */}
                        <div className="p-5 space-y-4">
                          <p className="text-xs text-slate-600 leading-relaxed">
                            {course.description}
                          </p>

                          {/* Disponibilidad y Fechas de Inicio/Término */}
                          <div className="flex flex-wrap items-center gap-2">
                            {course.disponible && course.cupos > 0 ? (
                              <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] font-black bg-emerald-50 text-emerald-700 border border-emerald-200">
                                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                                <span>DISPONIBLE • {course.cupos} vacantes restantes</span>
                              </span>
                            ) : (
                              <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] font-black bg-rose-50 text-rose-700 border border-rose-200">
                                <span className="w-1.5 h-1.5 rounded-full bg-rose-500" />
                                <span>CUPOS AGOTADOS / NO DISPONIBLE</span>
                              </span>
                            )}

                            <span className="inline-flex items-center gap-1 text-[10px] font-semibold text-slate-600 bg-slate-100 px-2 py-0.5 rounded border border-slate-200">
                              <Calendar size={11} className="text-[#0A4DA2]" />
                              <span>{course.fecha_inicio} al {course.fecha_termino}</span>
                            </span>
                          </div>

                          {/* Precios & Abono 50% */}
                          <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 flex items-center justify-between text-xs">
                            <div>
                              <span className="text-[10px] uppercase font-bold text-slate-600 block">Arancel Oficial</span>
                              <span className="font-extrabold text-slate-900 text-sm">{course.price}</span>
                            </div>
                            <div className="text-right">
                              <span className="text-[10px] uppercase font-black text-[#0284c7] block">Abono Inicial (50%)</span>
                              <span className="font-black text-[#0284c7] text-sm">{course.depositPrice}</span>
                            </div>
                          </div>

                          {/* Ficha Desplegable de Temario y Requisitos */}
                          {syllabus && (
                            <div>
                              <button
                                type="button"
                                onClick={() => setExpandedCourseId(isExpanded ? null : course.id)}
                                className="w-full py-2 px-3 rounded-xl bg-slate-100/80 hover:bg-slate-100 text-slate-700 text-xs font-bold flex items-center justify-between transition-colors cursor-pointer"
                              >
                                <span className="flex items-center gap-1.5">
                                  <BookOpen size={14} className="text-[#0284c7]" />
                                  <span>{isExpanded ? 'Ocultar Temario y Requisitos' : 'Ver Temario Oficial y Requisitos'}</span>
                                </span>
                                <span className="text-[11px] text-[#0284c7] font-semibold">
                                  {isExpanded ? '▲ Menos' : '▼ Detallar'}
                                </span>
                              </button>

                              {isExpanded && (
                                <motion.div
                                  initial={{ opacity: 0, height: 0 }}
                                  animate={{ opacity: 1, height: 'auto' }}
                                  exit={{ opacity: 0, height: 0 }}
                                  className="mt-3 p-4 rounded-xl bg-sky-50/60 border border-sky-100 text-xs space-y-3.5"
                                >
                                  {/* Módulos */}
                                  <div>
                                    <h4 className="font-bold text-slate-900 flex items-center gap-1.5 mb-2">
                                      <FileText size={13} className="text-[#0284c7]" />
                                      <span>Módulos Formativos (Plan de Estudio):</span>
                                    </h4>
                                    <ul className="space-y-1.5 pl-4 list-disc text-slate-700">
                                      {syllabus.modules.map((mod, idx) => (
                                        <li key={idx} className="leading-tight">{mod}</li>
                                      ))}
                                    </ul>
                                  </div>

                                  {/* Requisitos */}
                                  <div>
                                    <h4 className="font-bold text-slate-900 flex items-center gap-1.5 mb-1.5">
                                      <UserCheck size={13} className="text-emerald-600" />
                                      <span>Requisitos de Admisión:</span>
                                    </h4>
                                    <ul className="space-y-1 pl-4 list-disc text-slate-700">
                                      {syllabus.requirements.map((req, idx) => (
                                        <li key={idx} className="leading-tight">{req}</li>
                                      ))}
                                    </ul>
                                  </div>

                                  {/* Tipo de Examen */}
                                  <div className="pt-2 border-t border-sky-200/60 text-[11px] text-slate-600">
                                    <strong className="text-slate-800">Tipo de Certificación: </strong>
                                    <span>{syllabus.examType}</span>
                                  </div>
                                </motion.div>
                              )}
                            </div>
                          )}
                        </div>
                      </div>

                      {/* Botones de Acción */}
                      <div className="p-5 pt-0 flex items-center gap-2">
                        {/* Botón 1: Inscribirme */}
                        <button
                          type="button"
                          disabled={!course.disponible || course.cupos <= 0}
                          onClick={() => {
                            if (course.disponible && course.cupos > 0) {
                              onClose();
                              if (onSelectCourse) onSelectCourse(course.title);
                            }
                          }}
                          className={`flex-1 py-2.5 px-4 rounded-xl text-xs font-black text-white flex items-center justify-center gap-1.5 transition-all shadow ${
                            !course.disponible || course.cupos <= 0
                              ? 'bg-slate-300 text-slate-500 cursor-not-allowed shadow-none'
                              : isSecurity 
                              ? 'bg-gradient-to-r from-[#071626] to-[#0A7D8C] hover:brightness-110 cursor-pointer' 
                              : 'bg-gradient-to-r from-[#071626] to-[#00A896] hover:brightness-110 cursor-pointer'
                          }`}
                        >
                          <span>{course.disponible && course.cupos > 0 ? 'Inscribirme (Abono 50%)' : 'Sin Cupos Disponibles'}</span>
                          <ChevronRight size={14} />
                        </button>

                        {/* Botón 2: Ver Aula de Alumno */}
                        <button
                          type="button"
                          onClick={() => {
                            onClose();
                            if (onEnterStudentView) onEnterStudentView(course);
                          }}
                          className="px-3.5 py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold flex items-center gap-1.5 cursor-pointer transition-colors"
                          title="Acceder como alumno de este curso"
                        >
                          <GraduationCap size={15} className="text-[#0284c7]" />
                          <span className="hidden sm:inline">Aula Virtual</span>
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}

          </div>

          {/* ================= PIE DE LA VENTANA ================= */}
          <div className="p-4 sm:p-5 bg-slate-50 border-t border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-slate-600">
            <div className="flex items-center gap-2">
              <Info size={15} className="text-[#0284c7] flex-shrink-0" />
              <span>Para dudas o convalidaciones: WhatsApp Oficial de Admisión <strong>+56 9 8231 2128</strong></span>
            </div>
            
            <button
              type="button"
              onClick={onClose}
              className="px-5 py-2 rounded-xl bg-white hover:bg-slate-100 text-slate-700 font-bold border border-slate-200 cursor-pointer shadow-sm"
            >
              Cerrar Ventana
            </button>
          </div>

        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default SchoolDetailModal;
