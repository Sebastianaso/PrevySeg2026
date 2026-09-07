import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Briefcase, 
  Users, 
  Search, 
  Building2, 
  Plus, 
  MapPin, 
  DollarSign, 
  Clock, 
  ShieldCheck, 
  Wrench, 
  CheckCircle2, 
  ExternalLink, 
  PhoneCall, 
  MessageSquare, 
  Eye, 
  Trash2, 
  FileText, 
  Download, 
  Award, 
  AlertCircle, 
  Filter, 
  Sparkles, 
  Calendar, 
  ChevronRight, 
  X, 
  Send,
  Truck,
  Zap,
  HardHat,
  Flame,
  Check,
  Edit3,
  Bell,
  BellRing,
  CheckSquare,
  ListChecks,
  UserCheck,
  ArrowRight
} from 'lucide-react';
import { supabase } from '../../config/supabase';

const EmployerPortalView = ({ currentUser, onSelectCourse, activeTab: propActiveTab, onTabChange }) => {
  const [internalActiveTab, setInternalActiveTab] = useState('mis-ofertas');
  const activeTab = propActiveTab || internalActiveTab;
  const setActiveTab = onTabChange || setInternalActiveTab;

  // Filtro de área de negocio en las vistas
  const [areaFilter, setAreaFilter] = useState('todos'); // 'todos' | 'oficios' | 'seguridad'
  const [searchQuery, setSearchQuery] = useState('');

  // Modales
  const [showCreateJobModal, setShowCreateJobModal] = useState(false);
  const [selectedCandidate, setSelectedCandidate] = useState(null);
  const [selectedCertificateDoc, setSelectedCertificateDoc] = useState(null);

  // =========================================================================
  // 1. ESTADO DE OFERTAS LABORALES PUBLICADAS (Oficios + Seguridad)
  // =========================================================================
  const defaultJobs = [
    {
      id: 'job-emp-01',
      title: 'Operador de Grúa Horquilla - Centro Logístico y Faena Minera',
      area: 'oficios',
      category: 'Maquinaria Pesada & Conducción',
      company: 'Minería & Logística del Norte S.A.',
      location: 'Antofagasta / Calama',
      shift: 'Turno 7x7 Rotativo',
      salary: '$850.000 - $950.000 CLP Líquido',
      salaryNum: 900000,
      spots: 4,
      status: 'activa', // 'activa' | 'pausada'
      postedDate: '05/09/2026',
      applicantsCount: 6,
      requirements: [
        'Licencia de Conducir Clase D vigente',
        'Certificación de Operación Segura de Grúa Horquilla PrevySeg (NCh 2728)',
        'Hoja de vida del conductor intachable',
        'Salud compatible con gran altitud geográfica (faena minera)'
      ],
      benefits: [
        'Alojamiento en campamento minero y alimentación completa',
        'Buses de traslado desde Antofagasta, Calama e Iquique',
        'Bono por cumplimiento de metas y producción segura',
        'Seguro complementario de salud y dental'
      ],
      description: 'Requerimos operadores de grúa horquilla para carga, descarga y apilamiento seguro de pallets de insumos en bodega central y patio de faena minera.'
    },
    {
      id: 'job-emp-02',
      title: 'Guardia de Seguridad Privada OS-10 - Control de Acceso Faena Spence',
      area: 'seguridad',
      category: 'Seguridad Privada SPD',
      company: 'Minería & Logística del Norte S.A.',
      location: 'Sierra Gorda / Antofagasta',
      shift: 'Turno 4x4 Día/Noche',
      salary: '$780.000 - $880.000 CLP Líquido',
      salaryNum: 820000,
      spots: 8,
      status: 'activa',
      postedDate: '04/09/2026',
      applicantsCount: 12,
      requirements: [
        'Credencial de Guardia de Seguridad OS-10 / SPD vigente',
        'Enseñanza media completa acreditada',
        'Certificado de antecedentes fines especiales sin anotaciones',
        'Curso de Formación GGSS PrevySeg aprobado'
      ],
      benefits: [
        'Traslado ida y regreso desde la ciudad de origen',
        'Alimentación casino en faena',
        'Uniforme técnico completo de alta visibilidad para invierno/verano',
        'Estabilidad laboral y contrato indefinido'
      ],
      description: 'Responsable de la vigilancia de garitas de acceso, control de vehículos de carga, registro de visitantes y rondas perimetrales con radiocomunicación.'
    },
    {
      id: 'job-emp-03',
      title: 'Soldador Industrial Calificado MIG / Arco Manual - Maestranza Portuaria',
      area: 'oficios',
      category: 'Metalmecánica & Estructuras',
      company: 'Minería & Logística del Norte S.A.',
      location: 'Arica (Zona Industrial)',
      shift: 'Turno 5x2 (Lunes a Viernes 08:00 - 18:00 hrs)',
      salary: '$900.000 - $1.100.000 CLP Líquido',
      salaryNum: 1000000,
      spots: 3,
      status: 'activa',
      postedDate: '01/09/2026',
      applicantsCount: 4,
      requirements: [
        'Certificación en Soldadura Posición 3G o 4G PrevySeg / SENCE',
        'Manejo de procesos MIG (GMAW) y Arco Manual (SMAW)',
        'Uso de herramientas de corte y desbaste (esmeril angular)',
        'Compromiso con normas de autocuidado y trabajo en caliente'
      ],
      benefits: [
        'Almuerzo en casino de maestranza',
        'Ropa de trabajo ignífuga y EPP completo',
        'Posibilidad de horas extras pagadas al 50%',
        'Capacitación continua en procesos TIG'
      ],
      description: 'Fabricación, ensamble y reparación de tolvas, piping y estructuras metálicas de soporte para clientes mineros y terminales portuarios.'
    },
    {
      id: 'job-emp-04',
      title: 'Operador de Monitoreo Central CCTV e Inteligencia de Video',
      area: 'seguridad',
      category: 'Seguridad Electrónica & Telecomunicaciones',
      company: 'Minería & Logística del Norte S.A.',
      location: 'Arica / Teletrabajo Semipresencial',
      shift: 'Turno Rotativo 4x4 (12 hrs)',
      salary: '$680.000 - $780.000 CLP Líquido',
      salaryNum: 730000,
      spots: 2,
      status: 'activa',
      postedDate: '30/08/2026',
      applicantsCount: 5,
      requirements: [
        'Curso de Operador Central de Cámaras CCTV PrevySeg aprobado',
        'Manejo de software VMS (HikCentral, Milestone o Dahua DSS)',
        'Redacción fluida de minutas y preservación de evidencia digital',
        'Capacidad de trabajo bajo presión y atención sostenida'
      ],
      benefits: [
        'Bono nocturno y colación',
        'Sala de monitoreo climatizada con puestos ergonómicos',
        'Contrato directo con la empresa'
      ],
      description: 'Televigilancia activa de perímetros industriales, alertas tempranas de intrusión con analítica de IA y coordinación con patrullas de terreno.'
    },
    {
      id: 'job-emp-05',
      title: 'Técnico Instalador Eléctrico & Sistemas Solares Fotovoltaicos',
      area: 'oficios',
      category: 'Electricidad & Energías Renovables',
      company: 'Minería & Logística del Norte S.A.',
      location: 'Iquique / Pampa del Tamarugal',
      shift: 'Turno 7x7 Faena Terreno',
      salary: '$820.000 - $950.000 CLP Líquido',
      salaryNum: 880000,
      spots: 3,
      status: 'activa',
      postedDate: '26/08/2026',
      applicantsCount: 3,
      requirements: [
        'Certificación en Electricidad Industrial o Solar Fotovoltaica PrevySeg',
        'Conocimientos en conexionado de inversores y bancos de baterías',
        'Licencia de conducir Clase B (deseable)',
        'Certificación SEC Clase D (deseable)'
      ],
      benefits: [
        'Viáticos y traslados diarios en faena',
        'Campamento minero con todas las comodidades',
        'Capacitación en parques solares de gran escala'
      ],
      description: 'Montaje de estructuras, cableado solar en corriente continua y mantenimiento de paneles fotovoltaicos en plantas de energía renovable.'
    }
  ];

  const [jobs, setJobs] = useState(() => {
    try {
      const saved = localStorage.getItem('prevyseg_employer_jobs');
      if (saved) return JSON.parse(saved);
    } catch (e) {}
    return defaultJobs;
  });

  const saveJobsToStorage = (updated) => {
    setJobs(updated);
    try {
      localStorage.setItem('prevyseg_employer_jobs', JSON.stringify(updated));
      window.dispatchEvent(new Event('prevyseg_jobs_updated'));
    } catch (e) {}
  };

  // =========================================================================
  // 2. ESTADO DE POSTULANTES / ALUMNOS (Vinculados a las ofertas)
  // =========================================================================
  const defaultApplicants = [
    {
      id: 'app-01',
      jobId: 'job-emp-01',
      jobTitle: 'Operador de Grúa Horquilla - Centro Logístico',
      studentName: 'Matías Silva Lagos',
      rut: '21.778.425-6',
      age: 27,
      phone: '+56 9 8231 2128',
      email: 'matias.silva@prevyseg.cl',
      city: 'Arica',
      school: 'oficios',
      courseName: 'Operador y Conducción Segura de Grúa Horquilla (Clase D)',
      finalGrade: 6.8,
      attendanceRate: 98,
      certifiedStatus: 'Licencia Clase D Aprobada • Certificado SENCE NCh 2728 Validado',
      hasOs10: true,
      appliedDate: 'Ayer, 18:20 hrs',
      status: 'preseleccionado', // 'revision' | 'preseleccionado' | 'contratado' | 'descartado'
      notes: 'Excelente desempeño práctico en patio de maniobras. Experiencia previa de 6 meses en bodega retail.'
    },
    {
      id: 'app-02',
      jobId: 'job-emp-02',
      jobTitle: 'Guardia de Seguridad Privada OS-10 - Faena Spence',
      studentName: 'Camila Morales Valenzuela',
      rut: '19.845.120-K',
      age: 30,
      phone: '+56 9 7891 3241',
      email: 'camila.morales@prevyseg.cl',
      city: 'Antofagasta',
      school: 'seguridad',
      courseName: 'Curso de Formación Guardia de Seguridad (Credencial SPD)',
      finalGrade: 6.5,
      attendanceRate: 94,
      certifiedStatus: 'Credencial OS-10 Vigente • Certificado Acreditado SPD',
      hasOs10: true,
      appliedDate: 'Hoy, 10:15 hrs',
      status: 'revision',
      notes: 'Disponibilidad inmediata para turno 4x4 o 7x7. Examen psicológico SPD aprobado sin observaciones.'
    },
    {
      id: 'app-03',
      jobId: 'job-emp-03',
      jobTitle: 'Soldador Industrial Calificado MIG / Arco Manual',
      studentName: 'Rodrigo Fuentes Tapia',
      rut: '18.332.901-4',
      age: 33,
      phone: '+56 9 6542 1980',
      email: 'rodrigo.fuentes@prevyseg.cl',
      city: 'Arica',
      school: 'oficios',
      courseName: 'Soldadura Industrial Calificada en Posición 3G y 4G',
      finalGrade: 6.9,
      attendanceRate: 100,
      certifiedStatus: 'Calificación 3G SENCE Vigente • Certificado OTEC PrevySeg',
      hasOs10: false,
      appliedDate: '05/09/2026',
      status: 'preseleccionado',
      notes: 'Soldador técnico con alta prolijidad en probetas de tracción. Ha trabajado en faena Quebrada Blanca.'
    },
    {
      id: 'app-04',
      jobId: 'job-emp-04',
      jobTitle: 'Operador de Monitoreo Central CCTV',
      studentName: 'Valentina Soto Henríquez',
      rut: '22.012.334-1',
      age: 24,
      phone: '+56 9 9123 4455',
      email: 'valentina.soto@prevyseg.cl',
      city: 'Iquique',
      school: 'seguridad',
      courseName: 'Operador de Central de Cámaras de Televigilancia (CCTV)',
      finalGrade: 7.0,
      attendanceRate: 100,
      certifiedStatus: 'Operadora CCTV Acreditada • Mención Analítica de Video IA',
      hasOs10: true,
      appliedDate: '04/09/2026',
      status: 'contratado',
      notes: 'Mejor promedio de su generación en VMS Milestone. Manejo bilingüe básico.'
    },
    {
      id: 'app-05',
      jobId: 'job-emp-05',
      jobTitle: 'Técnico Instalador Eléctrico & Sistemas Solares',
      studentName: 'Andrés Pizarro Castro',
      rut: '20.144.922-3',
      age: 28,
      phone: '+56 9 8456 7120',
      email: 'andres.pizarro@prevyseg.cl',
      city: 'Calama',
      school: 'oficios',
      courseName: 'Electricidad Industrial y Mantenimiento de Tableros Eléctricos',
      finalGrade: 6.2,
      attendanceRate: 90,
      certifiedStatus: 'Certificado Electricidad OTEC • Cumplimiento Norma SEC',
      hasOs10: false,
      appliedDate: '03/09/2026',
      status: 'revision',
      notes: 'Interés en faenas mineras de la región. Posee EPP dieléctrico propio.'
    }
  ];

  const [applicants, setApplicants] = useState(() => {
    try {
      const saved = localStorage.getItem('prevyseg_job_applications');
      if (saved) return JSON.parse(saved);
    } catch (e) {}
    return defaultApplicants;
  });

  const saveApplicantsToStorage = (updated) => {
    setApplicants(updated);
    try {
      localStorage.setItem('prevyseg_job_applications', JSON.stringify(updated));
    } catch (e) {}
  };

  // =========================================================================
  // 2.1 NOTIFICACIONES EN TIEMPO REAL PARA EL EMPLEADOR
  // =========================================================================
  const defaultNotifications = [
    {
      id: 'notif-initial-1',
      type: 'new_application',
      title: '¡Nueva Postulación Recibida!',
      message: 'Matías Silva Lagos se ha postulado a la vacante "Operador de Grúa Horquilla - Centro Logístico y Faena Minera".',
      studentName: 'Matías Silva Lagos',
      studentRut: '21.778.425-6',
      studentPhone: '+56 9 8231 2128',
      studentEmail: 'matias.silva@prevyseg.cl',
      jobTitle: 'Operador de Grúa Horquilla - Centro Logístico y Faena Minera',
      jobId: 'job-emp-01',
      school: 'oficios',
      courseName: 'Operador y Conducción Segura de Grúa Horquilla (Clase D)',
      applicationId: 'app-01',
      timestamp: new Date().toISOString(),
      timeAgo: 'Hace 5 minutos',
      read: false
    }
  ];

  const [notifications, setNotifications] = useState(() => {
    try {
      const saved = localStorage.getItem('prevyseg_employer_notifications');
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) return parsed;
      }
    } catch (e) {}
    return defaultNotifications;
  });

  const [activeToast, setActiveToast] = useState(() => {
    try {
      const saved = localStorage.getItem('prevyseg_employer_notifications');
      if (saved) {
        const parsed = JSON.parse(saved);
        const unread = parsed.find(n => !n.read);
        if (unread) return unread;
      }
    } catch (e) {}
    return defaultNotifications[0];
  });

  const [showNotificationCenter, setShowNotificationCenter] = useState(false);

  // Estado del flujo de pasos del candidato seleccionado
  const [workflowState, setWorkflowState] = useState({
    step1Done: true,
    step2Done: false,
    step3Checks: { testTecnico: true, saludFaena: false, epp: false },
    step4Done: false
  });

  // Al abrir un candidato, sincronizar su workflow según el estado
  useEffect(() => {
    if (selectedCandidate) {
      const isPre = selectedCandidate.status === 'preseleccionado';
      const isHired = selectedCandidate.status === 'contratado';
      setWorkflowState({
        step1Done: true,
        step2Done: isPre || isHired,
        step3Checks: {
          testTecnico: true,
          saludFaena: isHired,
          epp: isHired
        },
        step4Done: isHired
      });
    }
  }, [selectedCandidate]);

  // Listener en tiempo real para nuevas notificaciones y cambios en aplicaciones
  useEffect(() => {
    const handleNewNotif = (e) => {
      const notif = e.detail;
      if (notif) {
        setNotifications(prev => [notif, ...prev.filter(n => n.id !== notif.id)]);
        setActiveToast(notif);
      }
    };

    const handleAppsUpdate = () => {
      try {
        const saved = localStorage.getItem('prevyseg_job_applications');
        if (saved) setApplicants(JSON.parse(saved));
      } catch (e) {}
    };

    const handleJobsUpdate = () => {
      try {
        const saved = localStorage.getItem('prevyseg_employer_jobs');
        if (saved) setJobs(JSON.parse(saved));
      } catch (e) {}
    };

    window.addEventListener('prevyseg_new_notification', handleNewNotif);
    window.addEventListener('prevyseg_applications_updated', handleAppsUpdate);
    window.addEventListener('prevyseg_jobs_updated', handleJobsUpdate);

    return () => {
      window.removeEventListener('prevyseg_new_notification', handleNewNotif);
      window.removeEventListener('prevyseg_applications_updated', handleAppsUpdate);
      window.removeEventListener('prevyseg_jobs_updated', handleJobsUpdate);
    };
  }, []);

  const handleOpenFromNotification = (notif) => {
    // Marcar como leída
    const updated = notifications.map(n => n.id === notif.id ? { ...n, read: true } : n);
    setNotifications(updated);
    try {
      localStorage.setItem('prevyseg_employer_notifications', JSON.stringify(updated));
    } catch (e) {}
    setActiveToast(null);

    // Buscar candidato
    let candidate = applicants.find(a => a.id === notif.applicationId || a.rut === notif.studentRut);
    if (!candidate) {
      candidate = {
        id: notif.applicationId || `app-${Date.now()}`,
        jobId: notif.jobId || 'job-emp-01',
        jobTitle: notif.jobTitle,
        studentName: notif.studentName,
        rut: notif.studentRut,
        age: 27,
        phone: notif.studentPhone || '+56 9 8231 2128',
        email: notif.studentEmail || 'matias.silva@prevyseg.cl',
        city: 'Arica',
        school: notif.school || 'oficios',
        courseName: notif.courseName || 'Operador de Grúa Horquilla (Clase D)',
        finalGrade: 6.8,
        attendanceRate: 98,
        certifiedStatus: notif.school === 'oficios'
          ? 'Licencia Clase D Aprobada • Certificado SENCE NCh 2728 Validado'
          : 'Credencial OS-10 Vigente • Certificado Acreditado SPD',
        hasOs10: notif.school !== 'oficios',
        appliedDate: 'Hoy recién',
        status: 'revision',
        notes: 'Postulación en tiempo real desde la Bolsa de Empleo PrevySeg.'
      };
    }
    setSelectedCandidate(candidate);
  };

  const handleDismissToast = (notifId) => {
    setActiveToast(null);
    const updated = notifications.map(n => n.id === notifId ? { ...n, read: true } : n);
    setNotifications(updated);
    try {
      localStorage.setItem('prevyseg_employer_notifications', JSON.stringify(updated));
    } catch (e) {}
  };

  // =========================================================================
  // 3. ESTADO DEL FORMULARIO DE NUEVA VACANTE
  // =========================================================================
  const [newJobForm, setNewJobForm] = useState({
    title: '',
    area: 'oficios',
    category: 'Maquinaria Pesada & Conducción',
    location: 'Arica / Macro Zona Norte',
    shift: 'Turno 7x7 Rotativo',
    salary: '$800.000 - $950.000 CLP Líquido',
    spots: 2,
    requirements: '',
    benefits: '',
    description: ''
  });

  const handleCreateJob = (e) => {
    e.preventDefault();
    if (!newJobForm.title.trim() || !newJobForm.description.trim()) {
      alert('Por favor completa los campos obligatorios del cargo.');
      return;
    }

    const createdJob = {
      id: `job-emp-${Date.now()}`,
      title: newJobForm.title,
      area: newJobForm.area,
      category: newJobForm.category,
      company: currentUser?.nombre || 'Minería & Logística del Norte S.A.',
      location: newJobForm.location,
      shift: newJobForm.shift,
      salary: newJobForm.salary,
      salaryNum: 800000,
      spots: Number(newJobForm.spots) || 1,
      status: 'activa',
      postedDate: 'Hoy, ' + new Date().toLocaleDateString('es-CL'),
      applicantsCount: 0,
      requirements: newJobForm.requirements.split('\n').filter(r => r.trim()).length > 0
        ? newJobForm.requirements.split('\n').filter(r => r.trim())
        : [
            newJobForm.area === 'seguridad' ? 'Credencial OS-10 / SPD vigente' : 'Certificación Técnica de Oficio PrevySeg',
            'Enseñanza media completa',
            'Disponibilidad para trabajar en turnos de faena'
          ],
      benefits: newJobForm.benefits.split('\n').filter(b => b.trim()).length > 0
        ? newJobForm.benefits.split('\n').filter(b => b.trim())
        : [
            'Alojamiento y alimentación en faena',
            'Traslados corporativos ida y vuelta',
            'Seguro de accidentes mutualidad'
          ],
      description: newJobForm.description
    };

    const updated = [createdJob, ...jobs];
    saveJobsToStorage(updated);

    // Guardar en Supabase PostgreSQL de manera asíncrona
    try {
      supabase.from('jobs').insert([{
        cargo: createdJob.title,
        empresa: createdJob.company,
        renta: createdJob.salaryNum || 850000,
        jornada: createdJob.shift,
        requiere_os10: createdJob.area === 'seguridad',
        descripcion: createdJob.description,
        activo: true
      }]).then(({ error }) => {
        if (error) console.warn("Aviso al registrar empleo en Supabase:", error.message);
      });
    } catch (e) {
      console.warn("Error de sincronización con Supabase jobs:", e);
    }

    setShowCreateJobModal(false);
    setNewJobForm({
      title: '',
      area: 'oficios',
      category: 'Maquinaria Pesada & Conducción',
      location: 'Arica / Macro Zona Norte',
      shift: 'Turno 7x7 Rotativo',
      salary: '$800.000 - $950.000 CLP Líquido',
      spots: 2,
      requirements: '',
      benefits: '',
      description: ''
    });
    alert(`✓ ¡Oferta laboral "${createdJob.title}" publicada con éxito! Ya está disponible en la Bolsa de Empleo para los estudiantes de PrevySeg.`);
  };

  const handleToggleJobStatus = (id) => {
    const updated = jobs.map(j => {
      if (j.id === id) {
        const nextStatus = j.status === 'activa' ? 'pausada' : 'activa';
        return { ...j, status: nextStatus };
      }
      return j;
    });
    saveJobsToStorage(updated);
  };

  const handleDeleteJob = (id) => {
    if (confirm('¿Deseas dar de baja esta oferta laboral? Dejará de mostrarse en la Bolsa de Empleo de los alumnos.')) {
      const updated = jobs.filter(j => j.id !== id);
      saveJobsToStorage(updated);
    }
  };

  const handleUpdateApplicantStatus = (applicantId, newStatus) => {
    const updated = applicants.map(a => a.id === applicantId ? { ...a, status: newStatus } : a);
    saveApplicantsToStorage(updated);
    if (selectedCandidate && selectedCandidate.id === applicantId) {
      setSelectedCandidate({ ...selectedCandidate, status: newStatus });
    }
  };

  // =========================================================================
  // 4. FILTRADO DE OFERTAS Y POSTULANTES
  // =========================================================================
  const filteredJobs = jobs.filter(j => {
    const matchesArea = areaFilter === 'todos' || j.area === areaFilter;
    const matchesSearch = j.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          j.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          j.location.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesArea && matchesSearch;
  });

  const filteredApplicants = applicants.filter(a => {
    const matchesArea = areaFilter === 'todos' || a.school === areaFilter;
    const matchesSearch = a.studentName.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          a.jobTitle.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          a.courseName.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesArea && matchesSearch;
  });

  // Métricas
  const totalJobsCount = jobs.length;
  const activeJobsCount = jobs.filter(j => j.status === 'activa').length;
  const totalApplicantsCount = applicants.length;
  const hiredCount = applicants.filter(a => a.status === 'contratado').length;
  const inInterviewCount = applicants.filter(a => a.status === 'preseleccionado').length;

  return (
    <div className="space-y-6 animate-in fade-in duration-200">

      {/* ========================================================================= */}
      {/* 0. BANNER DE NOTIFICACIÓN EN TIEMPO REAL: NUEVA POSTULACIÓN DE ALUMNO     */}
      {/* ========================================================================= */}
      <AnimatePresence>
        {activeToast && (
          <motion.div
            initial={{ opacity: 0, y: -20, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -20, scale: 0.98 }}
            className="bg-gradient-to-r from-amber-600 via-orange-600 to-amber-500 text-white p-4 sm:p-5 rounded-3xl shadow-xl shadow-amber-500/20 border border-amber-300/40 flex flex-col md:flex-row items-start md:items-center justify-between gap-4"
          >
            <div className="flex items-start sm:items-center gap-3.5">
              <div className="w-12 h-12 rounded-2xl bg-white/20 backdrop-blur-sm flex items-center justify-center flex-shrink-0 text-amber-100 shadow-inner">
                <BellRing className="animate-bounce" size={24} />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <span className="bg-white/25 text-white text-[10px] uppercase font-black px-2.5 py-0.5 rounded-full tracking-wide">
                    🔔 Postulación de Alumno en Tiempo Real
                  </span>
                  <span className="text-[11px] text-amber-100 font-medium">
                    {activeToast.timeAgo || 'Reciente'}
                  </span>
                </div>
                <h4 className="text-base font-black text-white mt-1 leading-tight">
                  ¡{activeToast.studentName} se ha inscrito a tu oferta laboral!
                </h4>
                <p className="text-xs text-amber-100/90 font-medium mt-0.5">
                  Vacante: <strong className="text-white font-bold">{activeToast.jobTitle}</strong> • {activeToast.courseName}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2 self-end md:self-center w-full md:w-auto justify-end">
              <button
                onClick={() => handleOpenFromNotification(activeToast)}
                className="bg-white text-slate-900 hover:bg-amber-50 font-black text-xs px-4 py-2.5 rounded-xl shadow-md flex items-center gap-2 cursor-pointer transition-all active:scale-95"
              >
                <Eye size={14} className="text-amber-600" />
                <span>Ver Ficha y Siguientes Pasos →</span>
              </button>
              <button
                onClick={() => handleDismissToast(activeToast.id)}
                className="p-2 text-white/70 hover:text-white hover:bg-white/10 rounded-xl cursor-pointer transition-colors"
                title="Descartar notificación"
              >
                <X size={18} />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Barra de Notificaciones y Alertas del Empleador */}
      <div className="flex items-center justify-between bg-white px-5 py-3 rounded-2xl border border-slate-200 shadow-2xs">
        <div className="flex items-center gap-3">
          <div className="relative">
            <button
              onClick={() => setShowNotificationCenter(!showNotificationCenter)}
              className="p-2 rounded-xl bg-amber-50 hover:bg-amber-100 text-amber-900 border border-amber-200 cursor-pointer flex items-center gap-2 text-xs font-bold transition-colors"
            >
              <Bell size={16} className="text-amber-600" />
              <span>Notificaciones de Alumnos</span>
              {notifications.filter(n => !n.read).length > 0 && (
                <span className="bg-rose-500 text-white text-[10px] font-black px-2 py-0.5 rounded-full">
                  {notifications.filter(n => !n.read).length} nuevas
                </span>
              )}
            </button>
          </div>
          <span className="text-xs text-slate-500 hidden sm:inline">
            Avisos automáticos cuando un estudiante postula desde la Bolsa de Empleo
          </span>
        </div>

        <div className="flex items-center gap-4 text-xs font-semibold text-slate-600">
          <span>Postulantes Activos: <strong className="text-slate-900">{totalApplicantsCount}</strong></span>
          <span>Contratados: <strong className="text-emerald-700 font-bold">{hiredCount}</strong></span>
        </div>
      </div>

      {/* Centro de Notificaciones Desplegable */}
      <AnimatePresence>
        {showNotificationCenter && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="bg-white rounded-2xl border border-slate-200 shadow-lg p-4 space-y-3 overflow-hidden"
          >
            <div className="flex items-center justify-between border-b border-slate-100 pb-2">
              <h4 className="text-xs font-black text-slate-900 uppercase tracking-wider flex items-center gap-2">
                <Bell size={14} className="text-amber-600" />
                <span>Historial de Notificaciones de Postulación</span>
              </h4>
              <button
                onClick={() => {
                  const allRead = notifications.map(n => ({ ...n, read: true }));
                  setNotifications(allRead);
                  try { localStorage.setItem('prevyseg_employer_notifications', JSON.stringify(allRead)); } catch(e){}
                }}
                className="text-[11px] font-bold text-teal-600 hover:underline cursor-pointer"
              >
                Marcar todas como leídas
              </button>
            </div>

            <div className="space-y-2 max-h-60 overflow-y-auto">
              {notifications.map(notif => (
                <div
                  key={notif.id}
                  className={`p-3 rounded-xl border transition-colors flex items-center justify-between gap-3 text-xs ${
                    notif.read ? 'bg-slate-50 border-slate-200 text-slate-600' : 'bg-amber-50/70 border-amber-200 text-slate-900 font-medium'
                  }`}
                >
                  <div className="flex items-center gap-2.5">
                    <span className={`w-2 h-2 rounded-full flex-shrink-0 ${notif.read ? 'bg-slate-300' : 'bg-amber-500'}`} />
                    <div>
                      <p className="font-bold text-slate-900">{notif.title} • <span className="font-semibold text-slate-600">{notif.studentName}</span></p>
                      <p className="text-[11px] text-slate-500">{notif.message}</p>
                    </div>
                  </div>
                  <button
                    onClick={() => handleOpenFromNotification(notif)}
                    className="bg-[#072B4F] hover:bg-slate-800 text-white font-bold text-[11px] px-3 py-1.5 rounded-lg flex items-center gap-1 cursor-pointer flex-shrink-0"
                  >
                    <span>Ver Ficha</span>
                    <ArrowRight size={12} />
                  </button>
                </div>
              ))}
              {notifications.length === 0 && (
                <p className="text-xs text-slate-400 py-3 text-center">No hay notificaciones registradas.</p>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence mode="wait">
        
        {/* ========================================================================= */}
        {/* 1. VISTA: MIS OFERTAS LABORALES (OFICIOS Y SEGURIDAD)                     */}
        {/* ========================================================================= */}
        {activeTab === 'mis-ofertas' && (
          <motion.div
            key="tab-mis-ofertas"
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            className="space-y-6"
          >
            {/* Header con Botón de Creación en la misma vista */}
            <div className="bg-gradient-to-r from-amber-50 via-orange-50 to-white p-6 sm:p-8 rounded-3xl border border-amber-200 shadow-sm flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
              <div className="space-y-2">
                <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-amber-100 text-amber-900 text-xs font-bold border border-amber-300">
                  <Briefcase size={14} className="text-amber-700" />
                  <span>Gestión de Vacantes • Escuela de Oficios & Seguridad Privada</span>
                </div>
                <h1 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
                  Mis Ofertas Laborales
                </h1>
                <p className="text-xs sm:text-sm text-slate-600 max-w-2xl leading-relaxed">
                  Publica y administra las vacantes laborales visibles para los estudiantes y egresados de PrevySeg en la Macro Zona Norte.
                </p>
              </div>

              {/* Botón para crear una oferta laboral en la misma vista */}
              <button
                onClick={() => setShowCreateJobModal(true)}
                className="bg-gradient-to-r from-[#d97706] to-amber-500 hover:from-amber-600 hover:to-amber-400 text-white font-black text-xs sm:text-sm py-3 px-6 rounded-2xl shadow-lg shadow-amber-500/20 flex items-center gap-2 cursor-pointer transition-all active:scale-95 border border-amber-300/40 flex-shrink-0"
              >
                <Plus size={18} />
                <span>Publicar Nueva Oferta</span>
              </button>
            </div>

            {/* Filtros de Área y Buscador en la misma vista */}
            <div className="flex flex-col sm:flex-row justify-between items-stretch sm:items-center gap-3 bg-white p-4 rounded-2xl border border-slate-200 shadow-2xs">
              <div className="flex items-center gap-1.5 overflow-x-auto">
                <span className="text-xs font-bold text-slate-500 mr-1 hidden sm:inline">Filtrar:</span>
                {[
                  { id: 'todos', label: '🌐 Todas las Áreas' },
                  { id: 'oficios', label: '🛠️ Escuela de Oficios' },
                  { id: 'seguridad', label: '🛡️ Seguridad SPD / OS-10' }
                ].map(pill => (
                  <button
                    key={pill.id}
                    onClick={() => setAreaFilter(pill.id)}
                    className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer whitespace-nowrap ${
                      areaFilter === pill.id
                        ? 'bg-[#072B4F] text-white shadow-xs'
                        : 'bg-slate-50 hover:bg-slate-100 text-slate-600 border border-slate-200'
                    }`}
                  >
                    {pill.label}
                  </button>
                ))}
              </div>

              <div className="relative min-w-[240px]">
                <Search size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                <input
                  type="text"
                  placeholder="Buscar cargo, oficio o faena..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-8.5 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-900 placeholder-slate-400 focus:outline-none focus:border-amber-500 focus:bg-white"
                />
              </div>
            </div>
            <div className="flex justify-between items-center">
              <h3 className="text-base font-black text-slate-900 flex items-center gap-2">
                <Briefcase size={17} className="text-[#d97706]" />
                <span>Ofertas Publicadas en Bolsa de Empleo PrevySeg ({filteredJobs.length})</span>
              </h3>
              <span className="text-xs text-slate-500">
                Sincronizado con el portal del estudiante
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              {filteredJobs.map(job => (
                <div
                  key={job.id}
                  className={`p-6 rounded-3xl border transition-all flex flex-col justify-between space-y-4 shadow-sm group ${
                    job.status === 'activa'
                      ? 'bg-white border-slate-200 hover:border-amber-400'
                      : 'bg-slate-50/80 border-slate-200 opacity-80'
                  }`}
                >
                  <div className="space-y-3">
                    {/* Tags Superiores */}
                    <div className="flex flex-wrap items-center justify-between gap-2">
                      <span className={`text-[10px] font-bold px-2.5 py-1 rounded-full uppercase border ${
                        job.area === 'oficios'
                          ? 'bg-amber-50 text-amber-800 border-amber-200'
                          : 'bg-sky-50 text-sky-800 border-sky-200'
                      }`}>
                        {job.area === 'oficios' ? '🛠️ Escuela de Oficios' : '🛡️ Seguridad Privada'} • {job.category}
                      </span>

                      <div className="flex items-center gap-2">
                        <span className={`text-[10px] font-black px-2 py-0.5 rounded uppercase ${
                          job.status === 'activa'
                            ? 'bg-emerald-100 text-emerald-800'
                            : 'bg-slate-200 text-slate-700'
                        }`}>
                          {job.status === 'activa' ? '● Activa en Bolsa' : 'Pausada'}
                        </span>
                      </div>
                    </div>

                    {/* Título y Empresa */}
                    <div>
                      <h4 className="text-base font-black text-slate-900 group-hover:text-[#072B4F] transition-colors leading-snug">
                        {job.title}
                      </h4>
                      <p className="text-xs text-slate-500 font-semibold mt-0.5">
                        {job.company} • Publicada el {job.postedDate}
                      </p>
                    </div>

                    {/* Fichas de Condiciones */}
                    <div className="grid grid-cols-2 gap-2 text-xs">
                      <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-200/80 space-y-0.5">
                        <span className="text-[10px] text-slate-400 font-bold uppercase flex items-center gap-1">
                          <MapPin size={11} /> Ubicación
                        </span>
                        <p className="font-bold text-slate-800 truncate">{job.location}</p>
                      </div>

                      <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-200/80 space-y-0.5">
                        <span className="text-[10px] text-slate-400 font-bold uppercase flex items-center gap-1">
                          <Clock size={11} /> Turno / Jornada
                        </span>
                        <p className="font-bold text-slate-800 truncate">{job.shift}</p>
                      </div>

                      <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-200/80 space-y-0.5 col-span-2">
                        <span className="text-[10px] text-slate-400 font-bold uppercase flex items-center gap-1">
                          <DollarSign size={11} /> Renta Líquida Ofrecida
                        </span>
                        <p className="font-black text-emerald-700 text-sm">{job.salary}</p>
                      </div>
                    </div>

                    {/* Requisitos y Beneficios preview */}
                    <div className="text-xs text-slate-600 line-clamp-2">
                      {job.description}
                    </div>

                    <div className="space-y-1">
                      <span className="text-[10px] uppercase font-bold text-slate-400">Requisitos Clave:</span>
                      <div className="flex flex-wrap gap-1.5">
                        {job.requirements.slice(0, 2).map((req, idx) => (
                          <span key={idx} className="text-[10px] bg-slate-100 text-slate-700 px-2 py-0.5 rounded border border-slate-200 truncate max-w-xs">
                            ✓ {req}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Acciones de la Oferta */}
                  <div className="pt-3 border-t border-slate-100 flex items-center justify-between gap-3">
                    <div className="text-xs font-bold text-sky-800 flex items-center gap-1.5">
                      <Users size={14} className="text-[#0284c7]" />
                      <span>{job.applicantsCount} alumnos postulantes</span>
                    </div>

                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => handleToggleJobStatus(job.id)}
                        className="p-2 rounded-xl text-xs font-bold bg-slate-100 hover:bg-slate-200 text-slate-700 cursor-pointer transition-colors"
                        title={job.status === 'activa' ? 'Pausar Oferta' : 'Reactivar Oferta'}
                      >
                        {job.status === 'activa' ? 'Pausar' : 'Activar'}
                      </button>

                      <button
                        onClick={() => {
                          setActiveTab('postulantes');
                          setSearchQuery(job.title);
                        }}
                        className="bg-[#072B4F] hover:bg-slate-800 text-white font-bold text-xs py-2 px-3 rounded-xl shadow-xs flex items-center gap-1.5 cursor-pointer transition-all active:scale-95"
                      >
                        <Users size={13} />
                        <span>Ver Postulantes</span>
                      </button>

                      <button
                        onClick={() => handleDeleteJob(job.id)}
                        className="p-2 text-rose-500 hover:text-rose-700 hover:bg-rose-50 rounded-xl cursor-pointer"
                        title="Eliminar Oferta"
                      >
                        <Trash2 size={15} />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {filteredJobs.length === 0 && (
              <div className="text-center py-16 bg-white rounded-3xl border border-dashed border-slate-300 space-y-3">
                <Briefcase size={36} className="mx-auto text-slate-300" />
                <h4 className="text-sm font-bold text-slate-700">No se encontraron ofertas laborales</h4>
                <p className="text-xs text-slate-500">Prueba cambiando el filtro de área o publica una nueva vacante para los estudiantes.</p>
                <button
                  onClick={() => setShowCreateJobModal(true)}
                  className="bg-[#d97706] text-white font-bold text-xs py-2 px-4 rounded-xl shadow cursor-pointer"
                >
                  + Crear Oferta Ahora
                </button>
              </div>
            )}
          </motion.div>
        )}

        {/* ========================================================================= */}
        {/* PESTAÑA 2: POSTULANTES & ALUMNOS (REVISIÓN DE CVS Y CERTIFICADOS)         */}
        {/* ========================================================================= */}
        {activeTab === 'postulantes' && (
          <motion.div
            key="tab-postulantes"
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            className="space-y-6"
          >
            {/* Header Dedicado de Postulantes */}
            <div className="bg-gradient-to-r from-sky-50 via-slate-50 to-white p-6 sm:p-8 rounded-3xl border border-sky-200 shadow-sm flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
              <div className="space-y-2">
                <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-sky-100 text-sky-900 text-xs font-bold border border-sky-300">
                  <Users size={14} className="text-sky-700" />
                  <span>Bandeja de Reclutamiento • Selección & Contratación</span>
                </div>
                <h1 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
                  Postulantes & Alumnos
                </h1>
                <p className="text-xs sm:text-sm text-slate-600 max-w-2xl leading-relaxed">
                  Revisa antecedentes curriculares, promedio de notas PrevySeg, acreditaciones oficiales SENCE/SPD y contacta directamente a los candidatos por WhatsApp.
                </p>
              </div>

              <div className="flex items-center gap-2 bg-white px-4 py-2.5 rounded-2xl border border-sky-200 shadow-xs flex-shrink-0">
                <Users size={18} className="text-[#0284c7]" />
                <span className="text-xs font-bold text-slate-700">
                  Total Postulaciones: <strong className="text-[#0284c7] font-black">{applicants.length}</strong>
                </span>
              </div>
            </div>

            {/* Filtros de Área y Buscador en la misma vista */}
            <div className="flex flex-col sm:flex-row justify-between items-stretch sm:items-center gap-3 bg-white p-4 rounded-2xl border border-slate-200 shadow-2xs">
              <div className="flex items-center gap-1.5 overflow-x-auto">
                <span className="text-xs font-bold text-slate-500 mr-1 hidden sm:inline">Filtrar:</span>
                {[
                  { id: 'todos', label: '🌐 Todos los Postulantes' },
                  { id: 'oficios', label: '🛠️ Escuela de Oficios' },
                  { id: 'seguridad', label: '🛡️ Seguridad SPD' }
                ].map(pill => (
                  <button
                    key={pill.id}
                    onClick={() => setAreaFilter(pill.id)}
                    className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer whitespace-nowrap ${
                      areaFilter === pill.id
                        ? 'bg-[#072B4F] text-white shadow-xs'
                        : 'bg-slate-50 hover:bg-slate-100 text-slate-600 border border-slate-200'
                    }`}
                  >
                    {pill.label}
                  </button>
                ))}
              </div>

              <div className="relative min-w-[240px]">
                <Search size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                <input
                  type="text"
                  placeholder="Buscar postulante, curso o RUT..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-8.5 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-900 placeholder-slate-400 focus:outline-none focus:border-sky-500 focus:bg-white"
                />
              </div>
            </div>

            <div className="flex justify-between items-center">
              <h3 className="text-base font-black text-slate-900 flex items-center gap-2">
                <Users size={17} className="text-[#0284c7]" />
                <span>Alumnos Postulantes a tus Ofertas ({filteredApplicants.length})</span>
              </h3>
              <span className="text-xs font-bold text-emerald-800 bg-emerald-50 px-3 py-1.5 rounded-xl border border-emerald-200">
                Acreditación NCh 2728 Validada ✓
              </span>
            </div>

            {/* Listado de Candidatos Postulantes */}
            <div className="space-y-3">
              {filteredApplicants.map(app => (
                <div
                  key={app.id}
                  className={`p-5 rounded-3xl border transition-all flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4 shadow-sm ${
                    app.status === 'preseleccionado'
                      ? 'bg-amber-50/50 border-amber-300'
                      : app.status === 'contratado'
                      ? 'bg-emerald-50/50 border-emerald-300'
                      : 'bg-white border-slate-200 hover:border-sky-300'
                  }`}
                >
                  {/* Ficha del Postulante */}
                  <div className="flex items-start gap-3.5 min-w-0 flex-1">
                    <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-[#072B4F] to-[#0284c7] text-white flex items-center justify-center font-black text-sm shadow-xs flex-shrink-0">
                      {app.studentName.split(' ').map(n => n[0]).slice(0, 2).join('')}
                    </div>

                    <div className="space-y-1 min-w-0 flex-1">
                      <div className="flex flex-wrap items-center gap-2">
                        <h4 className="text-sm font-black text-slate-900 truncate">
                          {app.studentName}
                        </h4>
                        <span className="text-xs font-mono text-slate-500">({app.rut})</span>
                        <span className="text-[10px] text-slate-500 bg-slate-100 px-2 py-0.5 rounded font-medium">
                          {app.age} años • {app.city}
                        </span>

                        <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full border ${
                          app.school === 'oficios'
                            ? 'bg-amber-100 text-amber-800 border-amber-300'
                            : 'bg-sky-100 text-sky-800 border-sky-300'
                        }`}>
                          {app.school === 'oficios' ? '🛠️ Escuela de Oficios' : '🛡️ Seguridad Privada'}
                        </span>
                      </div>

                      <p className="text-xs text-[#072B4F] font-bold">
                        Vacante: <span className="text-slate-800 font-semibold">{app.jobTitle}</span>
                      </p>

                      <div className="flex flex-wrap items-center gap-2 text-[11px] text-slate-600">
                        <span className="font-semibold text-teal-700 bg-teal-50 px-2 py-0.5 rounded border border-teal-200">
                          {app.courseName}
                        </span>
                        <span>Promedio: <strong className="text-slate-900">{app.finalGrade}</strong></span>
                        <span>Asistencia: <strong className="text-emerald-700">{app.attendanceRate}%</strong></span>
                        <span className="text-[10px] text-slate-400">Postulado: {app.appliedDate}</span>
                      </div>

                      <div className="text-[11px] font-semibold text-emerald-800 flex items-center gap-1 pt-0.5">
                        <CheckCircle2 size={13} className="text-emerald-600 flex-shrink-0" />
                        <span>{app.certifiedStatus}</span>
                      </div>
                    </div>
                  </div>

                  {/* Estado de Selección y Acciones */}
                  <div className="flex flex-wrap items-center gap-2.5 w-full lg:w-auto justify-end pt-2 lg:pt-0 border-t lg:border-t-0 border-slate-100">
                    {/* Selector de Estado */}
                    <div className="relative">
                      <select
                        value={app.status}
                        onChange={(e) => handleUpdateApplicantStatus(app.id, e.target.value)}
                        className={`text-xs font-bold py-2 px-3 rounded-xl border focus:outline-none cursor-pointer appearance-none pr-7 ${
                          app.status === 'preseleccionado'
                            ? 'bg-amber-100 text-amber-900 border-amber-300'
                            : app.status === 'contratado'
                            ? 'bg-emerald-100 text-emerald-900 border-emerald-300'
                            : app.status === 'descartado'
                            ? 'bg-slate-100 text-slate-600 border-slate-300'
                            : 'bg-sky-50 text-sky-900 border-sky-300'
                        }`}
                      >
                        <option value="revision">⏳ En Revisión</option>
                        <option value="preseleccionado">📞 Preseleccionado / Entrevista</option>
                        <option value="contratado">✓ Contratado</option>
                        <option value="descartado">✕ Descartado</option>
                      </select>
                      <span className="absolute right-2.5 top-1/2 -translate-y-1/2 pointer-events-none text-slate-500 text-[10px]">
                        ▼
                      </span>
                    </div>

                    {/* Botón Ver Expediente */}
                    <button
                      onClick={() => setSelectedCandidate(app)}
                      className="bg-white hover:bg-slate-100 text-slate-700 font-bold text-xs py-2 px-3.5 rounded-xl border border-slate-200 flex items-center gap-1.5 cursor-pointer shadow-2xs transition-colors"
                    >
                      <Eye size={13} className="text-[#0284c7]" />
                      <span>Ver Ficha</span>
                    </button>

                    {/* Botón Contactar por WhatsApp */}
                    <a
                      href={`https://wa.me/${app.phone.replace(/[^0-9]/g, '')}?text=Hola%20${encodeURIComponent(app.studentName)},%20te%20contactamos%20desde%20${encodeURIComponent(currentUser?.nombre || 'Minería & Logística del Norte')}%20respecto%20a%20tu%20postulación%20en%20PrevySeg%20para%20el%20cargo%20de%20${encodeURIComponent(app.jobTitle)}.`}
                      target="_blank"
                      rel="noreferrer"
                      className="bg-[#00A896] hover:bg-teal-600 text-white font-bold text-xs py-2 px-3.5 rounded-xl shadow-xs flex items-center gap-1.5 cursor-pointer transition-all active:scale-95"
                    >
                      <PhoneCall size={13} />
                      <span>Contactar WhatsApp</span>
                    </a>
                  </div>
                </div>
              ))}
            </div>

            {filteredApplicants.length === 0 && (
              <div className="text-center py-16 bg-white rounded-3xl border border-dashed border-slate-300 space-y-2">
                <Users size={36} className="mx-auto text-slate-300" />
                <h4 className="text-sm font-bold text-slate-700">No hay postulantes registrados con estos filtros</h4>
                <p className="text-xs text-slate-500">Los estudiantes que postulen a tus ofertas aparecerán automáticamente aquí.</p>
              </div>
            )}
          </motion.div>
        )}

        {/* ========================================================================= */}
        {/* 3. VISTA: BÚSQUEDA DE EGRESADOS (OFICIOS Y SEGURIDAD CERTIFICADOS)        */}
        {/* ========================================================================= */}
        {activeTab === 'talento' && (
          <motion.div
            key="tab-talento"
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            className="space-y-6"
          >
            {/* Header Dedicado de Egresados */}
            <div className="bg-gradient-to-r from-teal-50 via-slate-50 to-white p-6 sm:p-8 rounded-3xl border border-teal-200 shadow-sm flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
              <div className="space-y-2">
                <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-teal-100 text-teal-900 text-xs font-bold border border-teal-300">
                  <Search size={14} className="text-teal-700" />
                  <span>Directorio de Talento Acreditado PrevySeg</span>
                </div>
                <h1 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
                  Búsqueda de Egresados Certificados
                </h1>
                <p className="text-xs sm:text-sm text-slate-600 max-w-2xl leading-relaxed">
                  Encuentra egresados calificados de la Escuela de Oficios Industriales y Seguridad Privada SPD listos para incorporarse a faenas del norte del país.
                </p>
              </div>
            </div>

            {/* Filtros de Área y Buscador en la misma vista */}
            <div className="flex flex-col sm:flex-row justify-between items-stretch sm:items-center gap-3 bg-white p-4 rounded-2xl border border-slate-200 shadow-2xs">
              <div className="flex items-center gap-1.5 overflow-x-auto">
                <span className="text-xs font-bold text-slate-500 mr-1 hidden sm:inline">Filtrar:</span>
                {[
                  { id: 'todos', label: '🌐 Todas las Especialidades' },
                  { id: 'oficios', label: '🛠️ Escuela de Oficios' },
                  { id: 'seguridad', label: '🛡️ Seguridad SPD / OS-10' }
                ].map(pill => (
                  <button
                    key={pill.id}
                    onClick={() => setAreaFilter(pill.id)}
                    className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer whitespace-nowrap ${
                      areaFilter === pill.id
                        ? 'bg-[#072B4F] text-white shadow-xs'
                        : 'bg-slate-50 hover:bg-slate-100 text-slate-600 border border-slate-200'
                    }`}
                  >
                    {pill.label}
                  </button>
                ))}
              </div>

              <div className="relative min-w-[240px]">
                <Search size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                <input
                  type="text"
                  placeholder="Buscar por especialidad, nombre o ciudad..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-8.5 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-900 placeholder-slate-400 focus:outline-none focus:border-teal-500 focus:bg-white"
                />
              </div>
            </div>

            <div className="flex justify-between items-center">
              <div>
                <h3 className="text-base font-black text-slate-900 flex items-center gap-2">
                  <Search size={17} className="text-[#d97706]" />
                  <span>Directorio de Egresados Certificados PrevySeg (Contratación Inmediata)</span>
                </h3>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {[
                {
                  name: 'Carlos Mendoza Vera',
                  rut: '17.654.321-8',
                  area: 'oficios',
                  specialty: 'Operador de Grúa Horquilla (Clase D)',
                  city: 'Arica',
                  grade: 6.9,
                  experience: '1 año en centros de acopio y faena',
                  phone: '+56 9 8231 2128',
                  cert: 'Licencia D + Curso Seguridad PrevySeg'
                },
                {
                  name: 'Daniela Albornoz Garrido',
                  rut: '20.551.902-1',
                  area: 'seguridad',
                  specialty: 'Guardia de Seguridad Privada OS-10',
                  city: 'Antofagasta',
                  grade: 6.7,
                  experience: 'Disponibilidad para turnos 7x7 minero',
                  phone: '+56 9 8231 2128',
                  cert: 'Credencial SPD / OS-10 Vigente'
                },
                {
                  name: 'Felipe Carvajal Rozas',
                  rut: '19.123.876-5',
                  area: 'oficios',
                  specialty: 'Soldador Industrial Estructuras 3G',
                  city: 'Iquique',
                  grade: 6.8,
                  experience: 'Manejo en oxicorte y procesos MIG',
                  phone: '+56 9 8231 2128',
                  cert: 'Calificación 3G SENCE NCh 2728'
                },
                {
                  name: 'Héctor San Martín Poblete',
                  rut: '18.432.190-4',
                  area: 'seguridad',
                  specialty: 'Operador Central Monitoreo CCTV',
                  city: 'Calama',
                  grade: 7.0,
                  experience: 'Analítica de video e informes de incidentes',
                  phone: '+56 9 8231 2128',
                  cert: 'Certificado VMS Milestone + CCTV'
                },
                {
                  name: 'Constanza Ríos Sepúlveda',
                  rut: '21.098.765-2',
                  area: 'oficios',
                  specialty: 'Instaladora Eléctrica Industrial',
                  city: 'Arica',
                  grade: 6.6,
                  experience: 'Montaje de tableros y canalizaciones',
                  phone: '+56 9 8231 2128',
                  cert: 'Certificado Electricidad PrevySeg SEC'
                },
                {
                  name: 'Luis Valenzuela Jorquera',
                  rut: '16.890.123-9',
                  area: 'seguridad',
                  specialty: 'Supervisor de Seguridad Faenas Mineras',
                  city: 'Antofagasta',
                  grade: 6.9,
                  experience: 'Liderazgo de turnos de vigilancia 7x7',
                  phone: '+56 9 8231 2128',
                  cert: 'Diplomado Gestión de Seguridad Privada'
                }
              ]
              .filter(c => areaFilter === 'todos' || c.area === areaFilter)
              .filter(c => c.name.toLowerCase().includes(searchQuery.toLowerCase()) || c.specialty.toLowerCase().includes(searchQuery.toLowerCase()) || c.city.toLowerCase().includes(searchQuery.toLowerCase()))
              .map((c, idx) => (
                <div key={idx} className="p-5 rounded-3xl bg-white border border-slate-200 hover:border-teal-400 transition-all flex flex-col justify-between space-y-4 shadow-sm group">
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className={`text-[10px] font-bold px-2.5 py-0.5 rounded-full uppercase border ${
                        c.area === 'oficios' ? 'bg-amber-50 text-amber-800 border-amber-200' : 'bg-sky-50 text-sky-800 border-sky-200'
                      }`}>
                        {c.area === 'oficios' ? '🛠️ Oficios' : '🛡️ Seguridad SPD'}
                      </span>
                      <span className="text-[10px] text-emerald-800 font-bold bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                        Disponible Inmediato
                      </span>
                    </div>

                    <div>
                      <h4 className="text-sm font-black text-slate-900 group-hover:text-teal-700 transition-colors">
                        {c.name}
                      </h4>
                      <p className="text-xs text-[#072B4F] font-bold">{c.specialty}</p>
                      <p className="text-[11px] text-slate-500 font-mono">RUT: {c.rut} • {c.city}</p>
                    </div>

                    <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-200/80 text-[11px] space-y-1">
                      <div className="flex justify-between">
                        <span className="text-slate-500">Nota Egreso:</span>
                        <strong className="text-slate-900">{c.grade} / 7.0</strong>
                      </div>
                      <div className="text-slate-600 line-clamp-1">
                        <strong>Exp:</strong> {c.experience}
                      </div>
                    </div>

                    <div className="text-[10px] font-semibold text-emerald-800 flex items-center gap-1">
                      <CheckCircle2 size={12} className="text-emerald-600 flex-shrink-0" />
                      <span className="truncate">{c.cert}</span>
                    </div>
                  </div>

                  <a
                    href={`https://wa.me/${c.phone.replace(/[^0-9]/g, '')}?text=Hola%20${encodeURIComponent(c.name)},%20te%20contactamos%20desde%20${encodeURIComponent(currentUser?.nombre || 'Minería & Logística del Norte')}%20vimos%20tu%20perfil%20egresado%20en%20PrevySeg%20como%20${encodeURIComponent(c.specialty)}%20y%20nos%20gustaría%20invitarte%20a%20una%20entrevista.`}
                    target="_blank"
                    rel="noreferrer"
                    className="w-full bg-[#072B4F] hover:bg-slate-800 text-white font-bold text-xs py-2 px-3 rounded-xl flex items-center justify-center gap-1.5 cursor-pointer transition-colors shadow-2xs"
                  >
                    <Send size={12} />
                    <span>Invitar a Entrevista Laboral</span>
                  </a>
                </div>
              ))}
            </div>
          </motion.div>
        )}


      </AnimatePresence>

      {/* ========================================================================= */}
      {/* MODAL 1: PUBLICAR NUEVA OFERTA LABORAL (OFICIOS Y SEGURIDAD)              */}
      {/* ========================================================================= */}
      <AnimatePresence>
        {showCreateJobModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm overflow-y-auto">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="bg-white border border-slate-200 w-full max-w-2xl rounded-3xl shadow-2xl p-6 sm:p-8 relative space-y-5 my-8"
            >
              <button
                onClick={() => setShowCreateJobModal(false)}
                className="absolute top-5 right-5 text-slate-400 hover:text-slate-700 p-2 rounded-full hover:bg-slate-100 cursor-pointer"
              >
                <X size={20} />
              </button>

              <div className="space-y-1">
                <span className="text-[10px] font-bold text-amber-800 bg-amber-100 px-2.5 py-0.5 rounded-full uppercase border border-amber-300">
                  Bolsa de Empleo OTEC PrevySeg
                </span>
                <h3 className="text-xl font-black text-slate-900">
                  Publicar Nueva Convocatoria Laboral
                </h3>
                <p className="text-xs text-slate-500">
                  Los alumnos matriculados y egresados de PrevySeg podrán postular inmediatamente desde su portal.
                </p>
              </div>

              <form onSubmit={handleCreateJob} className="space-y-4 text-xs">
                
                {/* Selector de Área: Oficios vs Seguridad */}
                <div className="p-3 bg-slate-50 rounded-2xl border border-slate-200 space-y-1.5">
                  <label className="block font-bold text-slate-800 uppercase text-[10px] tracking-wider">
                    Área o Escuela de la Oferta:
                  </label>
                  <div className="grid grid-cols-2 gap-3">
                    <button
                      type="button"
                      onClick={() => setNewJobForm({ ...newJobForm, area: 'oficios', category: 'Maquinaria Pesada & Conducción' })}
                      className={`p-3 rounded-xl border text-left cursor-pointer transition-all ${
                        newJobForm.area === 'oficios'
                          ? 'bg-amber-500 text-white border-amber-600 shadow-xs font-bold'
                          : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-100'
                      }`}
                    >
                      <span className="text-xs font-black block">🛠️ Escuela de Oficios</span>
                      <span className="text-[10px] opacity-90 block">Grúa Horquilla, Soldadura, Electricidad, Logística</span>
                    </button>

                    <button
                      type="button"
                      onClick={() => setNewJobForm({ ...newJobForm, area: 'seguridad', category: 'Seguridad Privada SPD' })}
                      className={`p-3 rounded-xl border text-left cursor-pointer transition-all ${
                        newJobForm.area === 'seguridad'
                          ? 'bg-[#072B4F] text-white border-[#072B4F] shadow-xs font-bold'
                          : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-100'
                      }`}
                    >
                      <span className="text-xs font-black block">🛡️ Seguridad Privada</span>
                      <span className="text-[10px] opacity-90 block">Guardias OS-10, Central CCTV, Supervisores</span>
                    </button>
                  </div>
                </div>

                <div>
                  <label className="block font-bold text-slate-700 mb-1">Título del Cargo o Puesto:</label>
                  <input
                    type="text"
                    required
                    placeholder="Ej: Operador de Grúa Horquilla Faena Spence / Guardia OS-10 Turno 7x7"
                    value={newJobForm.title}
                    onChange={(e) => setNewJobForm({ ...newJobForm, title: e.target.value })}
                    className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3.5 py-2.5 text-xs text-slate-900 font-bold focus:outline-none focus:border-amber-500 focus:bg-white"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block font-bold text-slate-700 mb-1">Ubicación / Ciudad / Faena:</label>
                    <input
                      type="text"
                      required
                      placeholder="Ej: Arica / Faena Minera Antofagasta"
                      value={newJobForm.location}
                      onChange={(e) => setNewJobForm({ ...newJobForm, location: e.target.value })}
                      className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3.5 py-2 text-xs text-slate-900 focus:outline-none focus:border-amber-500 focus:bg-white"
                    />
                  </div>

                  <div>
                    <label className="block font-bold text-slate-700 mb-1">Régimen de Turno:</label>
                    <select
                      value={newJobForm.shift}
                      onChange={(e) => setNewJobForm({ ...newJobForm, shift: e.target.value })}
                      className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3 py-2 text-xs text-slate-800 focus:outline-none focus:border-amber-500 focus:bg-white cursor-pointer"
                    >
                      <option value="Turno 7x7 Rotativo">Turno 7x7 Rotativo (Faena Minera)</option>
                      <option value="Turno 4x4 Día/Noche">Turno 4x4 Día/Noche (12 horas)</option>
                      <option value="Turno 5x2 Lunes a Viernes">Turno 5x2 Lunes a Viernes (08:00 - 18:00 hrs)</option>
                      <option value="Turno 6x1 Rotativo">Turno 6x1 Rotativo (Mañana/Tarde/Noche)</option>
                      <option value="Jornada Completa 44 hrs">Jornada Completa 44 hrs</option>
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block font-bold text-slate-700 mb-1">Renta Líquida Ofrecida:</label>
                    <input
                      type="text"
                      required
                      placeholder="Ej: $850.000 - $950.000 CLP Líquido"
                      value={newJobForm.salary}
                      onChange={(e) => setNewJobForm({ ...newJobForm, salary: e.target.value })}
                      className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3.5 py-2 text-xs text-slate-900 font-bold focus:outline-none focus:border-amber-500 focus:bg-white"
                    />
                  </div>

                  <div>
                    <label className="block font-bold text-slate-700 mb-1">Cantidad de Vacantes:</label>
                    <input
                      type="number"
                      min="1"
                      max="50"
                      value={newJobForm.spots}
                      onChange={(e) => setNewJobForm({ ...newJobForm, spots: e.target.value })}
                      className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3.5 py-2 text-xs text-slate-900 font-bold focus:outline-none focus:border-amber-500 focus:bg-white"
                    />
                  </div>
                </div>

                <div>
                  <label className="block font-bold text-slate-700 mb-1">
                    Requisitos del Puesto (un requisito por línea):
                  </label>
                  <textarea
                    rows="3"
                    placeholder="Ej:&#10;Licencia de Conducir Clase D vigente&#10;Certificado Operación Grúa Horquilla PrevySeg&#10;Hoja de vida conductor sin faltas"
                    value={newJobForm.requirements}
                    onChange={(e) => setNewJobForm({ ...newJobForm, requirements: e.target.value })}
                    className="w-full bg-slate-50 border border-slate-300 rounded-xl p-3 text-xs text-slate-900 focus:outline-none focus:border-amber-500 focus:bg-white resize-none font-mono"
                  />
                </div>

                <div>
                  <label className="block font-bold text-slate-700 mb-1">
                    Beneficios Corporativos (un beneficio por línea):
                  </label>
                  <textarea
                    rows="2"
                    placeholder="Ej:&#10;Alojamiento en campamento y alimentación completa&#10;Buses de acercamiento desde Arica e Iquique"
                    value={newJobForm.benefits}
                    onChange={(e) => setNewJobForm({ ...newJobForm, benefits: e.target.value })}
                    className="w-full bg-slate-50 border border-slate-300 rounded-xl p-3 text-xs text-slate-900 focus:outline-none focus:border-amber-500 focus:bg-white resize-none font-mono"
                  />
                </div>

                <div>
                  <label className="block font-bold text-slate-700 mb-1">Descripción y Funciones del Puesto:</label>
                  <textarea
                    rows="3"
                    required
                    placeholder="Describe las tareas diarias, el entorno de trabajo y los objetivos del rol..."
                    value={newJobForm.description}
                    onChange={(e) => setNewJobForm({ ...newJobForm, description: e.target.value })}
                    className="w-full bg-slate-50 border border-slate-300 rounded-xl p-3 text-xs text-slate-900 focus:outline-none focus:border-amber-500 focus:bg-white resize-none"
                  />
                </div>

                <div className="flex justify-end gap-3 pt-2">
                  <button
                    type="button"
                    onClick={() => setShowCreateJobModal(false)}
                    className="px-4 py-2.5 text-xs font-semibold text-slate-600 hover:text-slate-900 rounded-xl cursor-pointer border border-slate-200"
                  >
                    Cancelar
                  </button>

                  <button
                    type="submit"
                    className="px-6 py-2.5 text-xs font-bold text-white bg-gradient-to-r from-[#d97706] to-amber-500 hover:from-amber-600 hover:to-amber-400 rounded-xl shadow cursor-pointer flex items-center gap-1.5 transition-all active:scale-95"
                  >
                    <Plus size={15} />
                    <span>Publicar Oferta en Bolsa de Empleo</span>
                  </button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* ========================================================================= */}
      {/* MODAL 2: EXPEDIENTE DEL CANDIDATO Y SIGUIENTES PASOS A SEGUIR             */}
      {/* ========================================================================= */}
      <AnimatePresence>
        {selectedCandidate && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm overflow-y-auto">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="bg-white border border-slate-200 w-full max-w-4xl max-h-[92vh] rounded-3xl shadow-2xl p-6 sm:p-8 relative space-y-6 overflow-y-auto my-6"
            >
              {/* Botón Cerrar */}
              <button
                onClick={() => setSelectedCandidate(null)}
                className="absolute top-5 right-5 text-slate-400 hover:text-slate-700 p-2 rounded-full hover:bg-slate-100 cursor-pointer transition-colors z-10"
              >
                <X size={20} />
              </button>

              {/* Encabezado del Postulante */}
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-slate-100 pb-5 pr-10">
                <div className="flex items-center gap-3.5">
                  <div className="w-14 h-14 rounded-2xl bg-gradient-to-tr from-[#072B4F] to-[#0284c7] text-white flex items-center justify-center font-black text-lg shadow-sm flex-shrink-0">
                    {selectedCandidate.studentName.split(' ').map(n => n[0]).slice(0, 2).join('')}
                  </div>
                  <div>
                    <div className="flex flex-wrap items-center gap-2">
                      <span className={`text-[10px] font-bold px-2.5 py-0.5 rounded-full uppercase border ${
                        selectedCandidate.school === 'oficios' ? 'bg-amber-100 text-amber-800 border-amber-300' : 'bg-sky-100 text-sky-800 border-sky-300'
                      }`}>
                        {selectedCandidate.school === 'oficios' ? '🛠️ Escuela de Oficios' : '🛡️ Seguridad Privada SPD'}
                      </span>
                      <span className="text-xs font-mono text-slate-500 font-semibold">
                        RUT: {selectedCandidate.rut}
                      </span>
                      <span className="text-[10px] bg-slate-100 text-slate-600 px-2 py-0.5 rounded font-medium">
                        {selectedCandidate.age} años • {selectedCandidate.city}
                      </span>
                    </div>
                    <h3 className="text-xl font-black text-slate-900 mt-1">
                      {selectedCandidate.studentName}
                    </h3>
                    <p className="text-xs text-[#072B4F] font-bold">
                      Postuló a la vacante: <span className="text-slate-800 font-semibold">{selectedCandidate.jobTitle}</span>
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <span className={`text-xs font-black px-3 py-1 rounded-xl border ${
                    selectedCandidate.status === 'contratado'
                      ? 'bg-emerald-100 text-emerald-800 border-emerald-300'
                      : selectedCandidate.status === 'preseleccionado'
                      ? 'bg-amber-100 text-amber-800 border-amber-300'
                      : selectedCandidate.status === 'descartado'
                      ? 'bg-rose-50 text-rose-700 border-rose-200'
                      : 'bg-sky-50 text-sky-800 border-sky-200'
                  }`}>
                    {selectedCandidate.status === 'contratado'
                      ? '✓ Alumno Contratado'
                      : selectedCandidate.status === 'preseleccionado'
                      ? '📞 Preseleccionado / Entrevista'
                      : selectedCandidate.status === 'descartado'
                      ? '✕ Postulación Descartada'
                      : '⏳ En Revisión Curricular'}
                  </span>
                </div>
              </div>

              {/* Layout de 2 Columnas: Expediente (Izq) vs Siguientes Pasos (Der) */}
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
                
                {/* COLUMNA IZQUIERDA (5 cols): Expediente Académico y Contacto */}
                <div className="lg:col-span-5 space-y-4">
                  {/* Ficha Académica OTEC */}
                  <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-3 text-xs">
                    <h4 className="font-black text-slate-900 uppercase tracking-wider text-[11px] flex items-center gap-1.5">
                      <Award size={14} className="text-[#072B4F]" />
                      <span>Rendimiento Académico PrevySeg</span>
                    </h4>

                    <div className="space-y-1">
                      <span className="text-[10px] text-slate-400 font-bold uppercase">Curso Aprobado:</span>
                      <p className="font-bold text-slate-800 leading-snug">{selectedCandidate.courseName}</p>
                    </div>

                    <div className="grid grid-cols-2 gap-2 pt-1">
                      <div className="p-2.5 bg-white rounded-xl border border-slate-200 shadow-2xs">
                        <span className="text-[10px] text-slate-400 font-bold">Promedio Calificaciones:</span>
                        <p className="font-black text-slate-900 text-base">{selectedCandidate.finalGrade} <span className="text-xs text-slate-400 font-normal">/ 7.0</span></p>
                        <span className="text-[9px] text-emerald-700 font-bold">Distinción Máxima</span>
                      </div>
                      <div className="p-2.5 bg-white rounded-xl border border-slate-200 shadow-2xs">
                        <span className="text-[10px] text-slate-400 font-bold">Asistencia Sincrónica:</span>
                        <p className="font-black text-emerald-700 text-base">{selectedCandidate.attendanceRate}%</p>
                        <span className="text-[9px] text-slate-500 font-medium">Cumplimiento SENCE</span>
                      </div>
                    </div>

                    <div className="p-3 bg-emerald-50 rounded-xl border border-emerald-200 text-emerald-900 space-y-0.5">
                      <p className="font-black text-[11px] flex items-center gap-1">
                        <CheckCircle2 size={13} className="text-emerald-600" />
                        <span>Acreditación Oficial Verificada</span>
                      </p>
                      <p className="text-[10px] text-emerald-800">{selectedCandidate.certifiedStatus}</p>
                    </div>

                    <div className="space-y-1">
                      <span className="text-[10px] text-slate-400 font-bold uppercase">Observación Docente:</span>
                      <p className="text-[11px] text-slate-600 italic bg-white p-2.5 rounded-xl border border-slate-200">
                        "{selectedCandidate.notes}"
                      </p>
                    </div>
                  </div>

                  {/* Datos de Contacto Directo */}
                  <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-2.5 text-xs">
                    <h4 className="font-black text-slate-900 uppercase tracking-wider text-[11px] flex items-center gap-1.5">
                      <Users size={14} className="text-[#00c2b2]" />
                      <span>Contacto Directo del Estudiante</span>
                    </h4>
                    
                    <div className="space-y-1.5 font-medium text-slate-700 text-[11px]">
                      <div className="flex justify-between items-center py-1 border-b border-slate-200/60">
                        <span className="text-slate-400">Teléfono Celular:</span>
                        <strong className="text-slate-900">{selectedCandidate.phone}</strong>
                      </div>
                      <div className="flex justify-between items-center py-1 border-b border-slate-200/60">
                        <span className="text-slate-400">Correo Electrónico:</span>
                        <strong className="text-slate-900 truncate max-w-[170px]">{selectedCandidate.email}</strong>
                      </div>
                      <div className="flex justify-between items-center py-1">
                        <span className="text-slate-400">Ciudad de Residencia:</span>
                        <strong className="text-slate-900">{selectedCandidate.city}, Macro Zona Norte</strong>
                      </div>
                    </div>
                  </div>

                  {/* Selector de Estado Manual */}
                  <div className="flex items-center justify-between p-3 rounded-xl bg-white border border-slate-200 text-xs">
                    <span className="font-bold text-slate-600">Cambiar Estado:</span>
                    <select
                      value={selectedCandidate.status}
                      onChange={(e) => handleUpdateApplicantStatus(selectedCandidate.id, e.target.value)}
                      className="text-xs font-bold py-1.5 px-3 rounded-lg border border-slate-300 bg-slate-50 cursor-pointer"
                    >
                      <option value="revision">⏳ En Revisión</option>
                      <option value="preseleccionado">📞 Preseleccionado / Entrevista</option>
                      <option value="contratado">✓ Contratado</option>
                      <option value="descartado">✕ Descartado</option>
                    </select>
                  </div>
                </div>

                {/* COLUMNA DERECHA (7 cols): PROTOCOLO Y SIGUIENTES PASOS */}
                <div className="lg:col-span-7 space-y-4">
                  <div className="bg-gradient-to-br from-amber-50/50 via-white to-sky-50/30 p-5 rounded-2xl border border-amber-200/80 shadow-xs space-y-4">
                    <div>
                      <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-amber-100 text-amber-900 text-[10px] font-bold mb-1">
                        <ListChecks size={12} className="text-amber-700" />
                        <span>Protocolo OTEC PrevySeg</span>
                      </div>
                      <h4 className="text-base font-black text-slate-900">
                        Siguientes Pasos a Seguir con el Estudiante Inscrito
                      </h4>
                      <p className="text-xs text-slate-500">
                        Sigue este flujo de 4 pasos para verificar, entrevistar y formalizar la contratación laboral del alumno:
                      </p>
                    </div>

                    {/* STEPPER DE 4 PASOS INTERACTIVOS */}
                    <div className="space-y-3 text-xs">
                      
                      {/* PASO 1: Validación PrevySeg */}
                      <div className={`p-3.5 rounded-2xl border transition-all space-y-2 ${
                        workflowState.step1Done 
                          ? 'bg-emerald-50/60 border-emerald-300' 
                          : 'bg-white border-slate-200'
                      }`}>
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <span className={`w-6 h-6 rounded-full flex items-center justify-center font-black text-xs ${
                              workflowState.step1Done ? 'bg-emerald-600 text-white' : 'bg-slate-200 text-slate-700'
                            }`}>
                              {workflowState.step1Done ? '✓' : '1'}
                            </span>
                            <strong className="text-slate-900 text-xs">
                              Paso 1: Validación Curricular & Antecedentes
                            </strong>
                          </div>
                          <span className="text-[10px] font-bold text-emerald-800 bg-emerald-100 px-2 py-0.5 rounded">
                            Verificado PrevySeg ✓
                          </span>
                        </div>
                        <p className="text-[11px] text-slate-600 leading-relaxed pl-8">
                          El perfil del estudiante cuenta con certificado de notas oficial ({selectedCandidate.finalGrade}/7.0), 
                          asistencia de {selectedCandidate.attendanceRate}% y antecedentes intachables validados para faenas industriales y mineras.
                        </p>
                      </div>

                      {/* PASO 2: Contacto Directo y Citación a Entrevista */}
                      <div className={`p-3.5 rounded-2xl border transition-all space-y-2.5 ${
                        workflowState.step2Done || selectedCandidate.status === 'preseleccionado' || selectedCandidate.status === 'contratado'
                          ? 'bg-amber-50/70 border-amber-300' 
                          : 'bg-white border-slate-200'
                      }`}>
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <span className={`w-6 h-6 rounded-full flex items-center justify-center font-black text-xs ${
                              workflowState.step2Done || selectedCandidate.status === 'preseleccionado' || selectedCandidate.status === 'contratado'
                                ? 'bg-amber-600 text-white' 
                                : 'bg-slate-200 text-slate-700'
                            }`}>
                              {workflowState.step2Done || selectedCandidate.status === 'preseleccionado' || selectedCandidate.status === 'contratado' ? '✓' : '2'}
                            </span>
                            <strong className="text-slate-900 text-xs">
                              Paso 2: Contacto Directo & Citación a Entrevista
                            </strong>
                          </div>
                          {(workflowState.step2Done || selectedCandidate.status === 'preseleccionado' || selectedCandidate.status === 'contratado') && (
                            <span className="text-[10px] font-bold text-amber-800 bg-amber-100 px-2 py-0.5 rounded">
                              Citado a Entrevista
                            </span>
                          )}
                        </div>
                        <p className="text-[11px] text-slate-600 pl-8">
                          Comunícate directamente con el alumno para coordinar fecha y modalidad de su entrevista laboral:
                        </p>

                        <div className="pl-8 flex flex-wrap items-center gap-2 pt-1">
                          <a
                            href={`https://wa.me/${selectedCandidate.phone.replace(/[^0-9]/g, '')}?text=Estimado/a%20${encodeURIComponent(selectedCandidate.studentName)},%20te%20contactamos%20desde%20${encodeURIComponent(currentUser?.nombre || 'Minería & Logística del Norte')}%20respecto%20a%20tu%20postulación%20en%20PrevySeg%20para%20la%20vacante%20"${encodeURIComponent(selectedCandidate.jobTitle)}".%20Revisamos%20tu%20excelente%20desempeño%20académico%20y%20nos%20gustaría%20citarte%20a%20una%20entrevista%20laboral.`}
                            target="_blank"
                            rel="noreferrer"
                            className="bg-[#00A896] hover:bg-teal-600 text-white font-bold text-[11px] py-2 px-3.5 rounded-xl shadow-xs flex items-center gap-1.5 cursor-pointer transition-all active:scale-95"
                          >
                            <PhoneCall size={13} />
                            <span>Citar por WhatsApp Web</span>
                          </a>

                          <button
                            onClick={() => {
                              handleUpdateApplicantStatus(selectedCandidate.id, 'preseleccionado');
                              setWorkflowState(prev => ({ ...prev, step2Done: true }));
                            }}
                            className="bg-amber-100 hover:bg-amber-200 text-amber-900 font-bold text-[11px] py-2 px-3.5 rounded-xl border border-amber-300 flex items-center gap-1.5 cursor-pointer transition-colors"
                          >
                            <UserCheck size={13} />
                            <span>Marcar como Preseleccionado</span>
                          </button>
                        </div>
                      </div>

                      {/* PASO 3: Evaluación Práctica / Examen de Ingreso a Faena */}
                      <div className={`p-3.5 rounded-2xl border transition-all space-y-2.5 ${
                        selectedCandidate.status === 'contratado' || (workflowState.step3Checks.testTecnico && workflowState.step3Checks.saludFaena)
                          ? 'bg-sky-50/70 border-sky-300'
                          : 'bg-white border-slate-200'
                      }`}>
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <span className={`w-6 h-6 rounded-full flex items-center justify-center font-black text-xs ${
                              selectedCandidate.status === 'contratado' || (workflowState.step3Checks.testTecnico && workflowState.step3Checks.saludFaena)
                                ? 'bg-sky-700 text-white' 
                                : 'bg-slate-200 text-slate-700'
                            }`}>
                              {selectedCandidate.status === 'contratado' ? '✓' : '3'}
                            </span>
                            <strong className="text-slate-900 text-xs">
                              Paso 3: Evaluación Técnica & Exámenes de Faena
                            </strong>
                          </div>
                          <span className="text-[10px] text-slate-500 font-semibold">
                            {selectedCandidate.school === 'oficios' ? 'Pruebas de Terreno' : 'Acreditación OS-10'}
                          </span>
                        </div>

                        <p className="text-[11px] text-slate-600 pl-8">
                          {selectedCandidate.school === 'oficios'
                            ? 'Verifica las competencias prácticas de maquinaria/herramientas y salud para gran altitud geográfica:'
                            : 'Verifica los requisitos normativos de la Ley de Seguridad Privada N° 21.659:'}
                        </p>

                        <div className="pl-8 space-y-1.5 text-[11px] text-slate-700 font-medium">
                          {selectedCandidate.school === 'oficios' ? (
                            <>
                              <label className="flex items-center gap-2 cursor-pointer hover:text-slate-900">
                                <input
                                  type="checkbox"
                                  checked={workflowState.step3Checks.testTecnico}
                                  onChange={(e) => setWorkflowState(prev => ({
                                    ...prev,
                                    step3Checks: { ...prev.step3Checks, testTecnico: e.target.checked }
                                  }))}
                                  className="w-3.5 h-3.5 rounded text-amber-600 cursor-pointer"
                                />
                                <span>Prueba técnica en terreno / simulador de maniobras</span>
                              </label>
                              <label className="flex items-center gap-2 cursor-pointer hover:text-slate-900">
                                <input
                                  type="checkbox"
                                  checked={workflowState.step3Checks.saludFaena}
                                  onChange={(e) => setWorkflowState(prev => ({
                                    ...prev,
                                    step3Checks: { ...prev.step3Checks, saludFaena: e.target.checked }
                                  }))}
                                  className="w-3.5 h-3.5 rounded text-amber-600 cursor-pointer"
                                />
                                <span>Examen de altura física (&gt; 3.000 msnm) y drogas/alcohol</span>
                              </label>
                              <label className="flex items-center gap-2 cursor-pointer hover:text-slate-900">
                                <input
                                  type="checkbox"
                                  checked={workflowState.step3Checks.epp}
                                  onChange={(e) => setWorkflowState(prev => ({
                                    ...prev,
                                    step3Checks: { ...prev.step3Checks, epp: e.target.checked }
                                  }))}
                                  className="w-3.5 h-3.5 rounded text-amber-600 cursor-pointer"
                                />
                                <span>Charla ODI (Derecho a Saber) y entrega de EPP reglamentario</span>
                              </label>
                            </>
                          ) : (
                            <>
                              <label className="flex items-center gap-2 cursor-pointer hover:text-slate-900">
                                <input
                                  type="checkbox"
                                  checked={workflowState.step3Checks.testTecnico}
                                  onChange={(e) => setWorkflowState(prev => ({
                                    ...prev,
                                    step3Checks: { ...prev.step3Checks, testTecnico: e.target.checked }
                                  }))}
                                  className="w-3.5 h-3.5 rounded text-sky-600 cursor-pointer"
                                />
                                <span>Credencial OS-10 / SPD vigente validada ante Carabineros</span>
                              </label>
                              <label className="flex items-center gap-2 cursor-pointer hover:text-slate-900">
                                <input
                                  type="checkbox"
                                  checked={workflowState.step3Checks.saludFaena}
                                  onChange={(e) => setWorkflowState(prev => ({
                                    ...prev,
                                    step3Checks: { ...prev.step3Checks, saludFaena: e.target.checked }
                                  }))}
                                  className="w-3.5 h-3.5 rounded text-sky-600 cursor-pointer"
                                />
                                <span>Test psicológico laboral aprobado para personal de seguridad</span>
                              </label>
                              <label className="flex items-center gap-2 cursor-pointer hover:text-slate-900">
                                <input
                                  type="checkbox"
                                  checked={workflowState.step3Checks.epp}
                                  onChange={(e) => setWorkflowState(prev => ({
                                    ...prev,
                                    step3Checks: { ...prev.step3Checks, epp: e.target.checked }
                                  }))}
                                  className="w-3.5 h-3.5 rounded text-sky-600 cursor-pointer"
                                />
                                <span>Inducción en Directiva de Funcionamiento y Radiocomunicaciones</span>
                              </label>
                            </>
                          )}
                        </div>
                      </div>

                      {/* PASO 4: Formalizar Contratación */}
                      <div className={`p-4 rounded-2xl border transition-all space-y-3 ${
                        selectedCandidate.status === 'contratado'
                          ? 'bg-gradient-to-r from-emerald-500 to-teal-600 text-white border-emerald-400 shadow-md'
                          : 'bg-white border-slate-200'
                      }`}>
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <span className={`w-6 h-6 rounded-full flex items-center justify-center font-black text-xs ${
                              selectedCandidate.status === 'contratado' ? 'bg-white text-emerald-800' : 'bg-slate-200 text-slate-700'
                            }`}>
                              {selectedCandidate.status === 'contratado' ? '✓' : '4'}
                            </span>
                            <strong className={selectedCandidate.status === 'contratado' ? 'text-white text-xs' : 'text-slate-900 text-xs'}>
                              Paso 4: Formalizar Contratación & Acreditación OTEC
                            </strong>
                          </div>
                        </div>

                        {selectedCandidate.status === 'contratado' ? (
                          <div className="space-y-1 pl-8 text-xs text-emerald-50">
                            <p className="font-bold text-white text-sm">
                              🎉 ¡Contratación Formalizada con Éxito!
                            </p>
                            <p className="text-[11px] text-emerald-100">
                              El estudiante <strong>{selectedCandidate.studentName}</strong> ya forma parte de tu empresa en la vacante "{selectedCandidate.jobTitle}".
                              La inserción laboral quedó registrada en el reporte de empleabilidad de OTEC PrevySeg.
                            </p>
                          </div>
                        ) : (
                          <div className="pl-8 space-y-3">
                            <p className="text-[11px] text-slate-600 leading-relaxed">
                              Una vez acordada la renta y fecha de inicio, formaliza la contratación para reportar la colocación laboral oficial ante PrevySeg y cerrar el proceso de selección.
                            </p>

                            <button
                              onClick={() => {
                                handleUpdateApplicantStatus(selectedCandidate.id, 'contratado');
                                alert(`🎉 ¡Felicitaciones! Has formalizado la contratación de ${selectedCandidate.studentName} para el cargo "${selectedCandidate.jobTitle}". La colocación laboral se ha registrado en el sistema PrevySeg.`);
                              }}
                              className="w-full bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white font-black text-xs py-3 px-4 rounded-xl shadow-md flex items-center justify-center gap-2 cursor-pointer transition-all active:scale-95"
                            >
                              <CheckCircle2 size={16} />
                              <span>✓ Formalizar Contratación Oficial del Alumno</span>
                            </button>
                          </div>
                        )}
                      </div>

                    </div>
                  </div>
                </div>

              </div>

              {/* Botón inferior para cerrar */}
              <div className="flex justify-end border-t border-slate-100 pt-4">
                <button
                  onClick={() => setSelectedCandidate(null)}
                  className="bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs py-2 px-5 rounded-xl cursor-pointer transition-colors"
                >
                  Cerrar Ficha
                </button>
              </div>

            </motion.div>
          </div>
        )}
      </AnimatePresence>

    </div>
  );
};

export default EmployerPortalView;
