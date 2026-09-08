import conflictImg from '../assets/images/course_conflict_resolution_1788545038374.jpg';
import portImg from '../assets/images/course_port_security_1788545050484.jpg';
import agricultureImg from '../assets/images/course_agriculture.jpg';
import foodImg from '../assets/images/course_gastronomy.jpg';
import aestheticImg from '../assets/images/course_aesthetic.jpg';
import elderlyImg from '../assets/images/course_elderly_care.jpg';
import bankCashierImg from '../assets/images/course_bank_cashier.jpg';

import securityGuardsImg from '../assets/images/security_guards.jpg';
import securitySupervisorImg from '../assets/images/security_supervisor.jpg';
import cctvOperatorImg from '../assets/images/cctv_operator.jpg';
import cyberImg from '../assets/images/course_cybersecurity_1788545064007.jpg';

// =========================================================================
// CATÁLOGO OFICIAL EXCLUSIVO DE PREVYSEG
// Estructurado estrictamente según la especificación del usuario.
// Cada curso cuenta con: disponible, cupos, fecha_inicio y fecha_termino.
// =========================================================================

export const DEFAULT_COURSES = [
  // =======================================================================
  // 1. ESCUELA DE OFICIOS (SOLO LOS CURSOS SOLICITADOS POR EL USUARIO)
  // =======================================================================
  
  // --- DESARROLLO DE HABILIDADES LABORALES ---
  {
    id: 'of-01',
    school: 'oficios',
    category: 'Desarrollo de Habilidades Laborales',
    title: 'Resolución de conflictos y manejo de situaciones difíciles',
    duration: '40 Horas Online Asíncrona',
    modality: 'Online Asíncrona (Plataforma 24/7)',
    price: '$95.000 CLP',
    depositPrice: '$47.500 CLP (50%)',
    priceDetail: 'Código SENCE Franquicia Tributaria',
    disponible: true,
    cupos: 25,
    fecha_inicio: '15 de Octubre, 2026',
    fecha_termino: '15 de Noviembre, 2026',
    badgeText: '40 Horas Asíncrono',
    highlight: 'Habilidades Blandas',
    image: conflictImg,
    description: 'Estrategias de negociación, contención emocional, mediación de controversias laborales y resolución constructiva de problemas en entornos de trabajo exigentes.'
  },
  {
    id: 'of-02',
    school: 'oficios',
    category: 'Desarrollo de Habilidades Laborales',
    title: 'Técnicas de manejo de resolución de conflictos',
    duration: '8 Horas Presencial',
    modality: 'Presencial Intensivo en Sede',
    price: '$55.000 CLP',
    depositPrice: '$27.500 CLP (50%)',
    priceDetail: 'Taller Práctico Dinámico',
    disponible: true,
    cupos: 15,
    fecha_inicio: '24 de Octubre, 2026',
    fecha_termino: '24 de Octubre, 2026',
    badgeText: '8 Horas Presencial',
    highlight: 'Jornada Intensiva',
    image: conflictImg,
    description: 'Taller práctico con dinámicas de rol y simulación para el manejo asertivo del estrés, control de crisis interpersonal y resolución pacífica en equipos.'
  },

  // --- ÁREA AGROPECUARIA ---
  {
    id: 'of-03',
    school: 'oficios',
    category: 'Área Agropecuaria',
    title: 'Manejo y uso de plaguicidas agrícolas',
    duration: '40 Horas',
    modality: 'Semipresencial (Teoría + Campo)',
    price: '$120.000 CLP',
    depositPrice: '$60.000 CLP (50%)',
    priceDetail: 'Normativa SAG & Seremi de Salud',
    disponible: true,
    cupos: 20,
    fecha_inicio: '20 de Octubre, 2026',
    fecha_termino: '22 de Noviembre, 2026',
    badgeText: 'Norma SAG & Salud',
    highlight: 'Alta Demanda Valle Azapa',
    image: agricultureImg,
    description: 'Protocolos de dosificación segura, equipos de protección personal (EPP), calibración de pulverizadores, almacenamiento regulado y primeros auxilios ante intoxicaciones.'
  },

  // --- ÁREA LOGÍSTICA Y OPERACIONES ---
  {
    id: 'of-04',
    school: 'oficios',
    category: 'Área Logística y Operaciones',
    title: 'Operaciones básicas de carga, descarga y protocolos de seguridad en recintos portuarios',
    duration: '50 Horas',
    modality: 'Semipresencial con Terreno Portuario',
    price: '$140.000 CLP',
    depositPrice: '$70.000 CLP (50%)',
    priceDetail: 'Normativa Portuaria Directemar / TPA',
    disponible: true,
    cupos: 18,
    fecha_inicio: '18 de Octubre, 2026',
    fecha_termino: '25 de Noviembre, 2026',
    badgeText: 'Operación Portuaria',
    highlight: 'Inserción Puertos TPA',
    image: portImg,
    description: 'Técnicas de estiba y desestiba, manejo de cargas críticas en muelles, señalética de maniobras, uso de eslingas y protocolos de seguridad portuaria internacional.'
  },

  // --- ÁREA ALIMENTACIÓN ---
  {
    id: 'of-05',
    school: 'oficios',
    category: 'Área Alimentación',
    title: 'Procedimientos de higiene, seguridad y prevención de riesgos en procesos de manipulación de alimentos',
    duration: '40 Horas',
    modality: 'Online + Taller Higiénico',
    price: '$85.000 CLP',
    depositPrice: '$42.500 CLP (50%)',
    priceDetail: 'Acreditación Sanitaria Seremi de Salud',
    disponible: true,
    cupos: 25,
    fecha_inicio: '12 de Octubre, 2026',
    fecha_termino: '12 de Noviembre, 2026',
    badgeText: 'Manipulación Higiénica',
    highlight: 'Carné Sanitario',
    image: foodImg,
    description: 'Buenas Prácticas de Manufactura (BPM), control de puntos críticos (HACCP), prevención de contaminación cruzada, cadena de frío y desinfección en cocinas e industrias.'
  },

  // --- ÁREA ESTÉTICA Y SERVICIOS ---
  {
    id: 'of-06',
    school: 'oficios',
    category: 'Área Estética y Servicios',
    title: 'Técnicas de depilación con cera miel',
    duration: '30 Horas Prácticas',
    modality: 'Presencial en Taller Estético',
    price: '$90.000 CLP',
    depositPrice: '$45.000 CLP (50%)',
    priceDetail: 'Incluye Set de Insumos Prácticos',
    disponible: true,
    cupos: 12,
    fecha_inicio: '26 de Octubre, 2026',
    fecha_termino: '18 de Noviembre, 2026',
    badgeText: 'Cera Miel & Cuidados',
    highlight: 'Emprendimiento Rápido',
    image: aestheticImg,
    description: 'Anatomía de la piel y folículo piloso, temperatura adecuada de cera, técnicas de extracción sin dolor, asepsia profesional y tratamientos post-depilatorios calmantes.'
  },
  {
    id: 'of-07',
    school: 'oficios',
    category: 'Área Estética y Servicios',
    title: 'Técnicas de manicure',
    duration: '35 Horas Prácticas',
    modality: 'Presencial en Taller Estético',
    price: '$95.000 CLP',
    depositPrice: '$47.500 CLP (50%)',
    priceDetail: 'Esmaltado Permanente & Limpieza',
    disponible: true,
    cupos: 14,
    fecha_inicio: '27 de Octubre, 2026',
    fecha_termino: '20 de Noviembre, 2026',
    badgeText: 'Manicure Profesional',
    highlight: 'Alta Salida Laboral',
    image: aestheticImg,
    description: 'Manicure rusa y tradicional, limado anatómico, retiro higiénico de cutícula, preparación de la uña natural, esmaltado semipermanente y diseños en tendencia.'
  },
  {
    id: 'of-08',
    school: 'oficios',
    category: 'Área Estética y Servicios',
    title: 'Técnicas de maquillaje carnaval',
    duration: '30 Horas Prácticas',
    modality: 'Presencial Especializado',
    price: '$90.000 CLP',
    depositPrice: '$45.000 CLP (50%)',
    priceDetail: 'Pigmentos, Glitter & Fijación',
    disponible: true,
    cupos: 15,
    fecha_inicio: '02 de Noviembre, 2026',
    fecha_termino: '28 de Noviembre, 2026',
    badgeText: 'Carnaval con la Fuerza del Sol',
    highlight: 'Tradición Macro Zona Norte',
    image: aestheticImg,
    description: 'Técnicas de maquillaje artístico resistente al agua y sudor, aplicación de pedrería y glitter, difuminados de alta pigmentación para bailarines de carnavales y eventos.'
  },

  // --- ÁREA DE SALUD ---
  {
    id: 'of-09',
    school: 'oficios',
    category: 'Área de Salud',
    title: 'Cuidado adulto mayor y personas postradas',
    duration: '60 Horas Teórico-Prácticas',
    modality: 'Semipresencial con Prácticas Asistidas',
    price: '$130.000 CLP',
    depositPrice: '$65.000 CLP (50%)',
    priceDetail: 'Formación Asistencial y Ética',
    disponible: true,
    cupos: 16,
    fecha_inicio: '16 de Octubre, 2026',
    fecha_termino: '30 de Noviembre, 2026',
    badgeText: 'Geriatría & Cuidados',
    highlight: 'Vocación Asistencial',
    image: elderlyImg,
    description: 'Movilización de personas postradas, prevención de úlceras por presión (escaras), administración asistida de medicamentos orales, higiene en cama y signos vitales.'
  },

  // --- ÁREA DE ADMINISTRACIÓN ---
  {
    id: 'of-10',
    school: 'oficios',
    category: 'Área de Administración',
    title: 'Cajero bancario, administración de condominios',
    duration: '50 Horas',
    modality: 'Online Sincrónico + Simulador',
    price: '$110.000 CLP',
    depositPrice: '$55.000 CLP (50%)',
    priceDetail: 'Simulador de Cajas & Ley de Copropiedad',
    disponible: true,
    cupos: 22,
    fecha_inicio: '19 de Octubre, 2026',
    fecha_termino: '28 de Noviembre, 2026',
    badgeText: 'Cajas & Copropiedad',
    highlight: 'Banca y Edificios',
    image: bankCashierImg,
    description: 'Detección de billetes y documentos falsificados, arqueo de caja, cuadratura diaria, gestión de gastos comunes y administración conforme a la Nueva Ley de Copropiedad Inmobiliaria.'
  },

  // =======================================================================
  // 2. ESCUELA DE SEGURIDAD (SOLO LOS CURSOS SOLICITADOS POR EL USUARIO)
  // =======================================================================

  // --- FORMACIÓN INICIAL ---
  {
    id: 'seg-01',
    school: 'seguridad',
    category: 'Formación Inicial',
    title: 'Formación de guardias de seguridad',
    duration: '90 Horas Cronológicas',
    modality: 'Presencial y Práctica en Terreno',
    price: '$120.000 CLP',
    depositPrice: '$60.000 CLP (50%)',
    priceDetail: 'Examen Oficial SPD / Carabineros OS-10',
    disponible: true,
    cupos: 30,
    fecha_inicio: '14 de Octubre, 2026',
    fecha_termino: '20 de Noviembre, 2026',
    badgeText: 'Credencial OS-10 SPD',
    highlight: 'Iniciación Obligatoria',
    image: securityGuardsImg,
    description: 'Programa oficial exigido por la Ley 21.659. Prepara al alumno en legislación de seguridad privada, primeros auxilios, defensa personal y preparación para el examen ante la Autoridad Fiscalizadora.'
  },
  {
    id: 'seg-02',
    school: 'seguridad',
    category: 'Formación Inicial',
    title: 'Formación de vigilantes privados',
    duration: '100 Horas',
    modality: 'Presencial con Instrucción de Tiro',
    price: '$190.000 CLP',
    depositPrice: '$95.000 CLP (50%)',
    priceDetail: 'Instrucción con Porte de Armas Regulado',
    disponible: true,
    cupos: 15,
    fecha_inicio: '21 de Octubre, 2026',
    fecha_termino: '04 de Diciembre, 2026',
    badgeText: 'Alta Seguridad & Armamento',
    highlight: 'Banca & Valores',
    image: securitySupervisorImg,
    description: 'Instrucción especializada para entidades bancarias, transporte de caudales y recintos estratégicos de alto riesgo, con polígono de tiro y protocolos de defensa armada.'
  },
  {
    id: 'seg-03',
    school: 'seguridad',
    category: 'Formación Inicial',
    title: 'Formación de guardia de seguridad marítimo portuario',
    duration: '90 Horas',
    modality: 'Presencial / Recintos Portuarios',
    price: '$130.000 CLP',
    depositPrice: '$65.000 CLP (50%)',
    priceDetail: 'Código PBIP y Directemar',
    disponible: true,
    cupos: 20,
    fecha_inicio: '19 de Octubre, 2026',
    fecha_termino: '27 de Noviembre, 2026',
    badgeText: 'Acreditación Directemar',
    highlight: 'Puertos del Norte',
    image: portImg,
    description: 'Instrucción en resguardo y control de accesos en muelles, terminales marítimos y recintos portuarios de la Macro Zona Norte bajo las directivas de la Autoridad Marítima.'
  },
  {
    id: 'seg-04',
    school: 'seguridad',
    category: 'Formación Inicial',
    title: 'Formación para porteros, nocheros, rondines u otro de similar carácter',
    duration: '50 Horas',
    modality: 'Online Asíncrono + Prácticas',
    price: '$95.000 CLP',
    depositPrice: '$47.500 CLP (50%)',
    priceDetail: 'Acreditación SENCE & Certificación OTEC',
    disponible: true,
    cupos: 25,
    fecha_inicio: '15 de Octubre, 2026',
    fecha_termino: '15 de Noviembre, 2026',
    badgeText: 'Control de Accesos',
    highlight: 'Rápida Inserción',
    image: conflictImg,
    description: 'Manejo de libro de novedades, rondas nocturnas perimetrales, control de accesos peatonales y vehiculares, y protocolos ante emergencias en condominios y empresas.'
  },

  // --- PERFECCIONAMIENTO ---
  {
    id: 'seg-05',
    school: 'seguridad',
    category: 'Perfeccionamiento',
    title: 'Perfeccionamiento de guardias de seguridad',
    duration: '36 Horas',
    modality: 'Semipresencial (Reentrenamiento Trienal)',
    price: '$90.000 CLP',
    depositPrice: '$45.000 CLP (50%)',
    priceDetail: 'Revalidación Oficial Trienal SPD',
    disponible: true,
    cupos: 35,
    fecha_inicio: '12 de Octubre, 2026',
    fecha_termino: '05 de Noviembre, 2026',
    badgeText: 'Renovación Trienal',
    highlight: 'Revalidación Rápida',
    image: securityGuardsImg,
    description: 'Actualización jurídica de la Ley 21.659, reentrenamiento físico, primeros auxilios actualizados y preparación inmediata para renovar la credencial oficial ante la SPD.'
  },
  {
    id: 'seg-06',
    school: 'seguridad',
    category: 'Perfeccionamiento',
    title: 'Perfeccionamiento de guardia de seguridad marítimo portuario',
    duration: '40 Horas',
    modality: 'Presencial / Código PBIP',
    price: '$100.000 CLP',
    depositPrice: '$50.000 CLP (50%)',
    priceDetail: 'Revalidación Directemar',
    disponible: true,
    cupos: 20,
    fecha_inicio: '20 de Octubre, 2026',
    fecha_termino: '10 de Noviembre, 2026',
    badgeText: 'Actualización Portuaria',
    highlight: 'Terminales TPA',
    image: portImg,
    description: 'Revisión y actualización de protocolos de inspección de naves, verificación de contenedores y resguardo de faenas portuarias para guardias con vigencia por expirar.'
  },
  {
    id: 'seg-07',
    school: 'seguridad',
    category: 'Perfeccionamiento',
    title: 'Perfeccionamiento para porteros, nocheros, rondines u otro de similar carácter',
    duration: '30 Horas',
    modality: 'Online Flexible',
    price: '$75.000 CLP',
    depositPrice: '$37.500 CLP (50%)',
    priceDetail: 'Certificación OTEC Continua',
    disponible: true,
    cupos: 25,
    fecha_inicio: '16 de Octubre, 2026',
    fecha_termino: '06 de Noviembre, 2026',
    badgeText: 'Actualización Periódica',
    highlight: 'Flexibilidad de Turno',
    image: conflictImg,
    description: 'Reentrenamiento en técnicas preventivas, resolución de incidentes vecinales, ciberseguridad básica para conserjerías y primeros auxilios en recintos residenciales.'
  },

  // --- TECNOLOGÍA Y SISTEMAS DE SEGURIDAD (CURSOS DE ESPECIALIZACIÓN) ---
  {
    id: 'seg-08',
    school: 'seguridad',
    category: 'Tecnología y Sistemas de Seguridad',
    title: 'Técnicas de operación de circuitos cerrados de televisión (CCTV codificado por SENCE)',
    duration: '60 Horas',
    modality: 'Online Sincrónico + Software VMS',
    price: '$140.000 CLP',
    depositPrice: '$70.000 CLP (50%)',
    priceDetail: 'Codificación SENCE Oficial',
    disponible: true,
    cupos: 18,
    fecha_inicio: '19 de Octubre, 2026',
    fecha_termino: '28 de Noviembre, 2026',
    badgeText: 'CCTV SENCE',
    highlight: 'Especialización Tecnológica',
    image: cctvOperatorImg,
    description: 'Operación avanzada de software VMS, cámaras domo PTZ, reconocimiento de matrículas y rostros, resguardo de evidencia digital y trazabilidad forense para salas de control.'
  },
  {
    id: 'seg-09',
    school: 'seguridad',
    category: 'Tecnología y Sistemas de Seguridad',
    title: 'Técnicas de operación CCTV y alarmas de seguridad privada',
    duration: '65 Horas',
    modality: 'Semipresencial con Paneles de Alarma',
    price: '$150.000 CLP',
    depositPrice: '$75.000 CLP (50%)',
    priceDetail: 'Sistemas Electrónicos Integrados',
    disponible: true,
    cupos: 16,
    fecha_inicio: '26 de Octubre, 2026',
    fecha_termino: '05 de Diciembre, 2026',
    badgeText: 'CCTV & Alarmas IP',
    highlight: 'Sistemas Integrales',
    image: cyberImg,
    description: 'Integración de centrales de alarma perimetral e interior, sensores infrarrojos, barreras fotoeléctricas, televigilancia IP y gestión de respuesta ante intrusiones.'
  },
  {
    id: 'seg-10',
    school: 'seguridad',
    category: 'Tecnología y Sistemas de Seguridad',
    title: 'Supervisor de seguridad privada',
    duration: '120 Horas',
    modality: '100% Online Aula Virtual',
    price: '$180.000 CLP',
    depositPrice: '$90.000 CLP (50%)',
    priceDetail: 'Liderazgo & Directivas SPD',
    disponible: true,
    cupos: 20,
    fecha_inicio: '15 de Octubre, 2026',
    fecha_termino: '15 de Diciembre, 2026',
    badgeText: 'Rango de Jefatura',
    highlight: 'Gestión y Mando',
    image: securitySupervisorImg,
    description: 'Planificación de turnos y cuadrantes, confección de Directivas de Funcionamiento conforme a la Ley 21.659, supervisión operativa en terreno y liderazgo de equipos de guardias.'
  }
];

const STORAGE_KEY = 'prevyseg_custom_courses_v2';

// Cargar cursos desde localStorage o fallback a los oficiales
export function getSavedCourses() {
  if (typeof window === 'undefined') return DEFAULT_COURSES;
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(DEFAULT_COURSES));
      return DEFAULT_COURSES;
    }
    const parsed = JSON.parse(raw);
    if (!Array.isArray(parsed) || parsed.length === 0) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(DEFAULT_COURSES));
      return DEFAULT_COURSES;
    }

    // Merge con datos por defecto para preservar imágenes y campos requeridos
    return DEFAULT_COURSES.map(defCourse => {
      const match = parsed.find(p => p.id === defCourse.id || p.title === defCourse.title);
      if (!match) return defCourse;
      return {
        ...defCourse,
        disponible: typeof match.disponible === 'boolean' ? match.disponible : defCourse.disponible,
        cupos: typeof match.cupos === 'number' ? match.cupos : (parseInt(match.cupos, 10) || defCourse.cupos),
        fecha_inicio: match.fecha_inicio || defCourse.fecha_inicio,
        fecha_termino: match.fecha_termino || defCourse.fecha_termino,
        price: match.price || defCourse.price,
        depositPrice: match.depositPrice || defCourse.depositPrice,
      };
    });
  } catch (e) {
    console.error('Error al leer cursos de localStorage:', e);
    return DEFAULT_COURSES;
  }
}

// Guardar actualizaciones de un curso
export function updateCourseItem(courseId, updates) {
  if (typeof window === 'undefined') return;
  try {
    const current = getSavedCourses();
    const updated = current.map(c => {
      if (c.id === courseId) {
        return { ...c, ...updates };
      }
      return c;
    });
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
    window.dispatchEvent(new CustomEvent('prevyseg-courses-updated', { detail: updated }));
    return updated;
  } catch (e) {
    console.error('Error guardando curso:', e);
  }
}

// Restablecer valores de fábrica
export function resetCoursesToDefault() {
  if (typeof window === 'undefined') return;
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(DEFAULT_COURSES));
    window.dispatchEvent(new CustomEvent('prevyseg-courses-updated', { detail: DEFAULT_COURSES }));
    return DEFAULT_COURSES;
  } catch (e) {
    console.error('Error al resetear cursos:', e);
  }
}
