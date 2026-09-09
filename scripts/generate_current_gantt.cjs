const ExcelJS = require('exceljs');
const path = require('path');
const fs = require('fs');

async function generateCurrentGanttChart() {
  const workbook = new ExcelJS.Workbook();
  workbook.creator = 'PrevySeg OTEC - Dirección de Tecnología';
  workbook.lastModifiedBy = 'Equipo de Ingeniería PrevySeg';
  workbook.created = new Date(2026, 8, 1);
  workbook.modified = new Date();

  // Paleta de Colores Corporativa
  const DARK_SLATE = '0F172A';
  const MEDIUM_SLATE = '1E293B';
  const NAVY_HEADER = '1E3A8A';
  const ACCENT_BLUE = '0284C7';
  const ACCENT_TEAL = '0D9488';
  const SUCCESS_GREEN = '16A34A';
  const SUCCESS_LIGHT = 'DCFCE7';
  const LIGHT_BG = 'F8FAFC';
  const BORDER_COLOR = 'CBD5E1';
  const MILESTONE_FILL = 'F59E0B';
  const SUNDAY_FILL = 'F1F5F9';

  const thinBorder = {
    top: { style: 'thin', color: { argb: BORDER_COLOR } },
    left: { style: 'thin', color: { argb: BORDER_COLOR } },
    bottom: { style: 'thin', color: { argb: BORDER_COLOR } },
    right: { style: 'thin', color: { argb: BORDER_COLOR } }
  };

  const headerBorder = {
    top: { style: 'medium', color: { argb: DARK_SLATE } },
    left: { style: 'thin', color: { argb: '334155' } },
    bottom: { style: 'medium', color: { argb: DARK_SLATE } },
    right: { style: 'thin', color: { argb: '334155' } }
  };

  function getColLetter(colIndex) {
    let temp, letter = '';
    while (colIndex > 0) {
      temp = (colIndex - 1) % 26;
      letter = String.fromCharCode(temp + 65) + letter;
      colIndex = Math.floor((colIndex - temp - 1) / 26);
    }
    return letter;
  }

  // Calendario Septiembre 2026 (1 al 30)
  const startDateBase = new Date(2026, 8, 1); // 01/09/2026
  const dayLetters = ['M', 'X', 'J', 'V', 'S', 'D', 'L', 'M', 'X', 'J', 'V', 'S', 'D', 'L', 'M', 'X', 'J', 'V', 'S', 'D', 'L', 'M', 'X', 'J', 'V', 'S', 'D', 'L', 'M', 'X'];
  const sundays = [6, 13, 20, 27];

  function getDateForDay(dayNum) {
    const d = new Date(startDateBase);
    d.setDate(startDateBase.getDate() + (dayNum - 1));
    return d;
  }

  /* ==========================================================================
     HOJA 1: CARTA GANTT OFICIAL DEL PROYECTO ACTUAL
     ========================================================================== */
  const wsGantt = workbook.addWorksheet('Carta Gantt Actual', {
    views: [{ state: 'frozen', xSplit: 3, ySplit: 8, showGridLines: true }]
  });

  // Título Principal
  wsGantt.mergeCells('A1:AN1');
  const titleCell = wsGantt.getCell('A1');
  titleCell.value = 'PREVYSEG 2026 — CRONOGRAMA MAESTRO Y CARTA GANTT OFICIAL (ESTADO ACTUAL DEL PROYECTO)';
  titleCell.font = { name: 'Segoe UI', size: 14, bold: true, color: { argb: 'FFFFFF' } };
  titleCell.alignment = { vertical: 'middle', horizontal: 'center' };
  titleCell.fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: DARK_SLATE } };
  wsGantt.getRow(1).height = 32;

  // Subtítulo
  wsGantt.mergeCells('A2:AN2');
  const subCell = wsGantt.getCell('A2');
  subCell.value = 'Módulos Vigentes: Portal Web Institucional • Catálogos de Escuelas (Oficios y Seguridad) • Ficha de Inscripción y Abono 50% • Base de Datos Supabase PostgreSQL • Plataforma Virtual LMS Multi-Rol';
  subCell.font = { name: 'Segoe UI', size: 9.5, italic: true, color: { argb: 'E2E8F0' } };
  subCell.alignment = { vertical: 'middle', horizontal: 'center' };
  subCell.fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: MEDIUM_SLATE } };
  wsGantt.getRow(2).height = 20;

  // Tarjetas de Métricas KPIs (Filas 4 y 5)
  const kpis = [
    { label: 'Módulos Principales', val: '7 Módulos Vigentes', colStart: 'C', colEnd: 'D', color: ACCENT_BLUE },
    { label: 'Cursos Oficiales', val: '20 Cursos (10 Oficio / 10 Seg.)', colStart: 'E', colEnd: 'F', color: ACCENT_TEAL },
    { label: 'Perfiles de Usuario', val: '4 Roles (Est, Doc, Emp, Adm)', colStart: 'G', colEnd: 'H', color: '6366F1' },
    { label: 'Estado de Ejecución', val: '100% Implementado / Operativo', colStart: 'I', colEnd: 'J', color: SUCCESS_GREEN },
  ];

  wsGantt.mergeCells('A4:B4');
  wsGantt.getCell('A4').value = 'MÉTRICAS:';
  wsGantt.getCell('A4').font = { name: 'Segoe UI', size: 9.5, bold: true, color: { argb: DARK_SLATE } };
  wsGantt.getCell('A4').alignment = { vertical: 'middle', horizontal: 'center' };

  kpis.forEach(k => {
    wsGantt.mergeCells(`${k.colStart}4:${k.colEnd}4`);
    const lCell = wsGantt.getCell(`${k.colStart}4`);
    lCell.value = k.label;
    lCell.font = { name: 'Segoe UI', size: 8, color: { argb: '475569' } };
    lCell.alignment = { horizontal: 'center', vertical: 'middle' };
    lCell.fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: LIGHT_BG } };
    lCell.border = thinBorder;

    wsGantt.mergeCells(`${k.colStart}5:${k.colEnd}5`);
    const vCell = wsGantt.getCell(`${k.colStart}5`);
    vCell.value = k.val;
    vCell.font = { name: 'Segoe UI', size: 10, bold: true, color: { argb: k.color } };
    vCell.alignment = { horizontal: 'center', vertical: 'middle' };
    vCell.fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: LIGHT_BG } };
    vCell.border = thinBorder;
  });

  // Encabezados de Columnas (Filas 7 y 8)
  wsGantt.getRow(7).height = 22;
  wsGantt.getRow(8).height = 24;

  const metadataHeaders = [
    { col: 'A', title: 'WBS', width: 8 },
    { col: 'B', title: 'Fase / Módulo', width: 24 },
    { col: 'C', title: 'Actividad / Entregable / Componente Vigente', width: 50 },
    { col: 'D', title: 'Responsable', width: 18 },
    { col: 'E', title: 'F. Inicio', width: 12 },
    { col: 'F', title: 'F. Fin', width: 12 },
    { col: 'G', title: 'Días', width: 8 },
    { col: 'H', title: '% Avance', width: 10 },
    { col: 'I', title: 'Estado Actual', width: 15 }
  ];

  metadataHeaders.forEach(h => {
    wsGantt.getColumn(h.col).width = h.width;
    wsGantt.mergeCells(`${h.col}7:${h.col}8`);
    const cell = wsGantt.getCell(`${h.col}7`);
    cell.value = h.title;
    cell.font = { name: 'Segoe UI', size: 9.5, bold: true, color: { argb: 'FFFFFF' } };
    cell.alignment = { vertical: 'middle', horizontal: 'center', wrapText: true };
    cell.fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: NAVY_HEADER } };
    cell.border = headerBorder;
  });

  // 4 Bloques Semanales (Días 1 al 30)
  const weeks = [
    { name: 'SEMANA 1 (D1-D7) | ARQUITECTURA & BASE', startCol: 10, endCol: 16, color: '1E3A8A' },
    { name: 'SEMANA 2 (D8-D14) | PORTAL, CATÁLOGO & MODALES', startCol: 17, endCol: 23, color: '1D4ED8' },
    { name: 'SEMANA 3 (D15-D21) | FICHA, ABONOS & BASE DE DATOS', startCol: 24, endCol: 30, color: '0284C7' },
    { name: 'SEMANA 4 (D22-D30) | CAMPUS LMS & CERTIFICACIÓN', startCol: 31, endCol: 39, color: '0D9488' }
  ];

  weeks.forEach(w => {
    const startL = getColLetter(w.startCol);
    const endL = getColLetter(w.endCol);
    wsGantt.mergeCells(`${startL}7:${endL}7`);
    const cell = wsGantt.getCell(`${startL}7`);
    cell.value = w.name;
    cell.font = { name: 'Segoe UI', size: 8.5, bold: true, color: { argb: 'FFFFFF' } };
    cell.alignment = { vertical: 'middle', horizontal: 'center' };
    cell.fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: w.color } };
    cell.border = headerBorder;
  });

  // Días 1 al 30 (Fila 8)
  for (let d = 1; d <= 30; d++) {
    const colIdx = 9 + d;
    const colL = getColLetter(colIdx);
    wsGantt.getColumn(colL).width = 4.2;
    const dayCell = wsGantt.getCell(`${colL}8`);
    const dayTag = dayLetters[d - 1];
    dayCell.value = `D${d}\n${dayTag}`;
    dayCell.font = { name: 'Segoe UI', size: 7.5, bold: true, color: { argb: sundays.includes(d) ? 'DC2626' : '334155' } };
    dayCell.alignment = { vertical: 'middle', horizontal: 'center', wrapText: true };
    dayCell.fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: sundays.includes(d) ? 'FEE2E2' : 'F1F5F9' } };
    dayCell.border = thinBorder;
  }

  /* ==========================================================================
     DATASET DE TAREAS DEL PROYECTO ACTUAL (SOLO LO QUE PERMANECE)
     ========================================================================== */
  const tasksDataset = [
    // FASE 1
    {
      isPhaseHeader: true,
      title: '🏗️ FASE 1: ARQUITECTURA BASE, BRANDING CORPORATIVO Y SISTEMA REACT 19',
      color: '1E3A8A'
    },
    {
      wbs: '1.0',
      phase: 'Setup Inicial',
      task: '⭐ HITO 1: Arquitectura Base, Canvas de Red y Configuración React 19 / Vite',
      responsible: 'Tech Lead',
      startDay: 1,
      endDay: 2,
      progress: 1.0,
      status: 'Completado',
      isMilestone: true
    },
    {
      wbs: '1.1',
      phase: 'Infraestructura Frontend',
      task: 'Scaffolding con React 19, Vite, TailwindCSS v4 y Framer Motion',
      responsible: 'Frontend Lead',
      startDay: 1,
      endDay: 3,
      progress: 1.0,
      status: 'Completado'
    },
    {
      wbs: '1.2',
      phase: 'Diseño & Estilo',
      task: 'Sistema de diseño visual, paleta corporativa OTEC (Navy, Cyan, Slate) y tipografía',
      responsible: 'UI/UX Designer',
      startDay: 2,
      endDay: 4,
      progress: 1.0,
      status: 'Completado'
    },
    {
      wbs: '1.3',
      phase: 'Efectos Interactivos',
      task: 'Fondo interactivo de nodos y partículas en HTML5 Canvas (NetworkBackground)',
      responsible: 'Frontend Dev',
      startDay: 2,
      endDay: 4,
      progress: 1.0,
      status: 'Completado'
    },
    {
      wbs: '1.4',
      phase: 'Conectividad Supabase',
      task: 'Integración del SDK de Supabase, cliente singleton y variables de entorno seguras',
      responsible: 'Backend Dev',
      startDay: 3,
      endDay: 5,
      progress: 1.0,
      status: 'Completado'
    },

    // FASE 2
    {
      isPhaseHeader: true,
      title: '🌐 FASE 2: PORTAL INSTITUCIONAL & SWITCHER CONMUTABLE DE ESCUELAS',
      color: '1D4ED8'
    },
    {
      wbs: '2.0',
      phase: 'Portal Web',
      task: '⭐ HITO 2: Portal Web Oficial y Navegación Dinámica entre Escuelas Operativo',
      responsible: 'Fullstack Dev',
      startDay: 8,
      endDay: 8,
      progress: 1.0,
      status: 'Completado',
      isMilestone: true
    },
    {
      wbs: '2.1',
      phase: 'Navegación Sticky',
      task: 'Header corporativo con branding OTEC, logos oficiales SENCE/SPD y navegación fluida',
      responsible: 'Frontend Dev',
      startDay: 5,
      endDay: 7,
      progress: 1.0,
      status: 'Completado'
    },
    {
      wbs: '2.2',
      phase: 'Hero Section',
      task: 'Hero principal con Switcher conmutable (Escuela de Seguridad vs Escuela de Oficios)',
      responsible: 'Frontend Dev',
      startDay: 6,
      endDay: 8,
      progress: 1.0,
      status: 'Completado'
    },
    {
      wbs: '2.3',
      phase: 'Identidad Institucional',
      task: 'Sección Quiénes Somos con la Misión Institucional oficial de PrevySeg, Visión y Valores',
      responsible: 'Content / UX',
      startDay: 7,
      endDay: 9,
      progress: 1.0,
      status: 'Completado'
    },
    {
      wbs: '2.4',
      phase: 'Estándares Adaptativos',
      task: 'Sección de Ejecución adaptable según la escuela activa (OS-10/SPD vs Competencias Laborales)',
      responsible: 'Frontend Dev',
      startDay: 8,
      endDay: 10,
      progress: 1.0,
      status: 'Completado'
    },
    {
      wbs: '2.5',
      phase: 'Métricas & Blog',
      task: 'Panel de estadísticas (+15 años, +8.500 egresados, 98% empleabilidad) y Blog de experiencias',
      responsible: 'Frontend Dev',
      startDay: 9,
      endDay: 11,
      progress: 1.0,
      status: 'Completado'
    },
    {
      wbs: '2.6',
      phase: 'Contacto & Ubicación',
      task: 'Footer corporativo con información de sede Blanco Encalada 666 Arica y WhatsApp directo',
      responsible: 'Frontend Dev',
      startDay: 9,
      endDay: 11,
      progress: 1.0,
      status: 'Completado'
    },

    // FASE 3
    {
      isPhaseHeader: true,
      title: '📚 FASE 3: CATÁLOGO OFICIAL DE 20 CURSOS Y MODALES DE ESCUELA',
      color: '0284C7'
    },
    {
      wbs: '3.0',
      phase: 'Catálogo de Cursos',
      task: '⭐ HITO 3: Catálogo Oficial Exclusivo de 20 Cursos (10 Oficios y 10 Seguridad) Operativo',
      responsible: 'Content / Dev',
      startDay: 14,
      endDay: 14,
      progress: 1.0,
      status: 'Completado',
      isMilestone: true
    },
    {
      wbs: '3.1',
      phase: 'Escuela de Oficios',
      task: 'Implementación de los 10 Cursos Oficiales de Oficios (Habilidades, Agro, Logística, Alimentos, Estética, Salud, Cajas)',
      responsible: 'Fullstack Dev',
      startDay: 11,
      endDay: 13,
      progress: 1.0,
      status: 'Completado'
    },
    {
      wbs: '3.2',
      phase: 'Escuela de Seguridad',
      task: 'Implementación de los 10 Cursos Oficiales de Seguridad Privada (Guardias OS-10, Vigilantes, Marítimo, Porteros, Perfeccionamiento, CCTV, Supervisor)',
      responsible: 'Fullstack Dev',
      startDay: 12,
      endDay: 14,
      progress: 1.0,
      status: 'Completado'
    },
    {
      wbs: '3.3',
      phase: 'Tarjetas Interactivas',
      task: 'Componentes de tarjetas de curso con modalidad, horas, fechas de inicio/término, arancel y abono 50%',
      responsible: 'Frontend Dev',
      startDay: 13,
      endDay: 15,
      progress: 1.0,
      status: 'Completado'
    },
    {
      wbs: '3.4',
      phase: 'Modal de Escuela',
      task: 'Modal inmersivo de Escuela con pestañas de Info General OTEC, Requisitos de Admisión y Malla Curricular',
      responsible: 'Frontend Dev',
      startDay: 14,
      endDay: 16,
      progress: 1.0,
      status: 'Completado'
    },
    {
      wbs: '3.5',
      phase: 'Buscador Global',
      task: 'Modal de búsqueda predictiva en tiempo real por título, categoría o palabras clave de los 20 cursos',
      responsible: 'Frontend Dev',
      startDay: 14,
      endDay: 15,
      progress: 1.0,
      status: 'Completado'
    },

    // FASE 4
    {
      isPhaseHeader: true,
      title: '📝 FASE 4: FICHA DE INSCRIPCIÓN DIGITAL, AULA VIRTUAL Y ABONO 50%',
      color: '0D9488'
    },
    {
      wbs: '4.0',
      phase: 'Admisión & Abono',
      task: '⭐ HITO 4: Ficha de Inscripción Digital con Creación de Cuenta y Abono 50% Operativa',
      responsible: 'Fullstack Lead',
      startDay: 18,
      endDay: 18,
      progress: 1.0,
      status: 'Completado',
      isMilestone: true
    },
    {
      wbs: '4.1',
      phase: 'Formulario de Inscripción',
      task: 'Ficha oficial con asignación de curso contextual y validación de RUT chileno con dígito verificador',
      responsible: 'Frontend Dev',
      startDay: 15,
      endDay: 17,
      progress: 1.0,
      status: 'Completado'
    },
    {
      wbs: '4.2',
      phase: 'Creación de Cuenta Aula',
      task: 'Módulo de creación de cuenta: RUT como usuario y contraseña secreta con confirmación y visibilidad conmutada',
      responsible: 'Fullstack Dev',
      startDay: 16,
      endDay: 18,
      progress: 1.0,
      status: 'Completado'
    },
    {
      wbs: '4.3',
      phase: 'Pasarela de Abono 50%',
      task: 'Cálculo de Cuota 1 (50% Reserva) y Cuota 2 (50% Saldo) con opciones Webpay Plus, Transferencia bancaria y Efectivo',
      responsible: 'Fullstack Dev',
      startDay: 16,
      endDay: 18,
      progress: 1.0,
      status: 'Completado'
    },
    {
      wbs: '4.4',
      phase: 'Buzón de Consultas',
      task: 'Campo interactivo para dudas del postulante y aviso oficial de contacto WhatsApp para validación de documentos',
      responsible: 'Frontend Dev',
      startDay: 17,
      endDay: 18,
      progress: 1.0,
      status: 'Completado'
    },
    {
      wbs: '4.5',
      phase: 'Pantalla de Confirmación',
      task: 'Generación de código de expediente (PS-XXXXXX), tarjeta de credenciales y botón de ingreso inmediato a la plataforma',
      responsible: 'Frontend Dev',
      startDay: 17,
      endDay: 19,
      progress: 1.0,
      status: 'Completado'
    },

    // FASE 5
    {
      isPhaseHeader: true,
      title: '🗄️ FASE 5: PERSISTENCIA ATÓMICA EN POSTGRESQL & MOTOR SUPABASE',
      color: '4338CA'
    },
    {
      wbs: '5.0',
      phase: 'Base de Datos',
      task: '⭐ HITO 5: Base de Datos Relacional y Procedimiento Atómico process_enrollment_registration Operativo',
      responsible: 'DBA / Backend',
      startDay: 21,
      endDay: 21,
      progress: 1.0,
      status: 'Completado',
      isMilestone: true
    },
    {
      wbs: '5.1',
      phase: 'Esquema Relacional',
      task: 'Tablas maestras: public.users, escuela_oficio, escuela_seguridad, enrollments, courses, job_offers',
      responsible: 'DBA',
      startDay: 18,
      endDay: 20,
      progress: 1.0,
      status: 'Completado'
    },
    {
      wbs: '5.2',
      phase: 'Procedimiento Atómico',
      task: 'Stored Procedure process_enrollment_registration (SECURITY DEFINER) para inserción atómica y creación de cuenta',
      responsible: 'Backend Dev',
      startDay: 19,
      endDay: 21,
      progress: 1.0,
      status: 'Completado'
    },
    {
      wbs: '5.3',
      phase: 'Reglas Institucionales',
      task: 'Trigger institucional check_single_course_enrollment (1 curso activo por alumno) y constraint UNIQUE(user_id, course_id)',
      responsible: 'DBA',
      startDay: 19,
      endDay: 21,
      progress: 1.0,
      status: 'Completado'
    },
    {
      wbs: '5.4',
      phase: 'Autenticación GoTrue',
      task: 'Integración con auth.users, generación de hashes Blowfish Bcrypt, activación de email_verified y sesiones JWT',
      responsible: 'Backend Dev',
      startDay: 20,
      endDay: 22,
      progress: 1.0,
      status: 'Completado'
    },

    // FASE 6
    {
      isPhaseHeader: true,
      title: '🎓 FASE 6: PLATAFORMA LMS MULTI-ROL (ESTUDIANTE, DOCENTE, EMPRESA, ADMIN)',
      color: '059669'
    },
    {
      wbs: '6.0',
      phase: 'Campus Virtual',
      task: '⭐ HITO 6: Campus Virtual LMS Completo con Control de Acceso por Roles (RBAC) Operativo',
      responsible: 'Fullstack Lead',
      startDay: 26,
      endDay: 26,
      progress: 1.0,
      status: 'Completado',
      isMilestone: true
    },
    {
      wbs: '6.1',
      phase: 'Layout & Control RBAC',
      task: 'LMSLayout con navegación lateral, conmutador de temas y permisos según rol (STUDENT, TEACHER, EMPLOYER, ADMIN)',
      responsible: 'Frontend Lead',
      startDay: 21,
      endDay: 23,
      progress: 1.0,
      status: 'Completado'
    },
    {
      wbs: '6.2',
      phase: 'Portal Estudiante',
      task: 'Área Personal, Mis Cursos, Aula Virtual interactiva, Módulo de Clases en Vivo sincrónicas y Configuración de Perfil',
      responsible: 'Frontend Dev',
      startDay: 22,
      endDay: 24,
      progress: 1.0,
      status: 'Completado'
    },
    {
      wbs: '6.3',
      phase: 'Bolsa de Empleo Regional',
      task: 'Portal de empleo de Arica con ofertas en seguridad y oficios, postulación directa con perfil de alumno',
      responsible: 'Fullstack Dev',
      startDay: 23,
      endDay: 25,
      progress: 1.0,
      status: 'Completado'
    },
    {
      wbs: '6.4',
      phase: 'Portal Docente',
      task: 'Panel del instructor para control de asistencia, libro de clases digital, Banco de Preguntas y Banco de Contenidos',
      responsible: 'Fullstack Dev',
      startDay: 23,
      endDay: 25,
      progress: 1.0,
      status: 'Completado'
    },
    {
      wbs: '6.5',
      phase: 'Portal de Empresas',
      task: 'Panel para empleadores con publicación de vacantes, revisión de alumnos graduados y cotización de Franquicia SENCE',
      responsible: 'Fullstack Dev',
      startDay: 24,
      endDay: 26,
      progress: 1.0,
      status: 'Completado'
    },
    {
      wbs: '6.6',
      phase: 'Portal Administrador OTEC',
      task: 'Portal de Admisiones (monitoreo de escuela_oficio y escuela_seguridad), Directorio de Participantes y Gestor de Cursos',
      responsible: 'Fullstack Dev',
      startDay: 24,
      endDay: 26,
      progress: 1.0,
      status: 'Completado'
    },
    {
      wbs: '6.7',
      phase: 'Certificación Oficial',
      task: 'Módulo de Aprobación de Certificados y emisión de diplomas digitales con código QR de verificación pública',
      responsible: 'Fullstack Dev',
      startDay: 25,
      endDay: 27,
      progress: 1.0,
      status: 'Completado'
    },

    // FASE 7
    {
      isPhaseHeader: true,
      title: '🔒 FASE 7: CUMPLIMIENTO NORMATIVO (SENCE/SPD), PRUEBAS Y PRODUCCIÓN',
      color: '0F172A'
    },
    {
      wbs: '7.0',
      phase: 'Cierre & Producción',
      task: '⭐ HITO 7: Sistema Integral PrevySeg 2026 Auditado, Compilado y Listo para Producción',
      responsible: 'Tech Lead / QA',
      startDay: 30,
      endDay: 30,
      progress: 1.0,
      status: 'Completado',
      isMilestone: true
    },
    {
      wbs: '7.1',
      phase: 'Cumplimiento Legal',
      task: 'Auditoría de cumplimiento Ley 21.659 (Seguridad Privada), Directemar, Seremi de Salud, SAG y Ley 19.628 de Datos',
      responsible: 'Legal / QA',
      startDay: 27,
      endDay: 29,
      progress: 1.0,
      status: 'Completado'
    },
    {
      wbs: '7.2',
      phase: 'Pruebas Automatizadas',
      task: 'Pruebas E2E de registro de postulante, abono del 50%, persistencia atómica y validación de login con RUT',
      responsible: 'QA Engineer',
      startDay: 28,
      endDay: 30,
      progress: 1.0,
      status: 'Completado'
    },
    {
      wbs: '7.3',
      phase: 'Compilación y Despliegue',
      task: 'Generación de bundle de producción con Vite (npm run build limpio sin advertencias) y verificación en servidor',
      responsible: 'DevOps / Lead',
      startDay: 29,
      endDay: 30,
      progress: 1.0,
      status: 'Completado'
    }
  ];

  let currentRow = 9;

  tasksDataset.forEach(item => {
    if (item.isPhaseHeader) {
      wsGantt.mergeCells(`A${currentRow}:AN${currentRow}`);
      const hCell = wsGantt.getCell(`A${currentRow}`);
      hCell.value = item.title;
      hCell.font = { name: 'Segoe UI', size: 9.5, bold: true, color: { argb: 'FFFFFF' } };
      hCell.alignment = { vertical: 'middle', horizontal: 'left', indent: 1 };
      hCell.fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: item.color } };
      hCell.border = headerBorder;
      wsGantt.getRow(currentRow).height = 22;
      currentRow++;
      return;
    }

    const row = wsGantt.getRow(currentRow);
    row.height = 19;

    const dStart = getDateForDay(item.startDay);
    const dEnd = getDateForDay(item.endDay);

    row.getCell('A').value = item.wbs;
    row.getCell('B').value = item.phase;
    row.getCell('C').value = item.task;
    row.getCell('D').value = item.responsible;
    row.getCell('E').value = dStart;
    row.getCell('E').numFmt = 'dd/mm/yyyy';
    row.getCell('F').value = dEnd;
    row.getCell('F').numFmt = 'dd/mm/yyyy';

    const durationDays = item.isMilestone ? 1 : (item.endDay - item.startDay + 1);
    row.getCell('G').value = Number(durationDays);
    row.getCell('G').numFmt = '#,##0';

    row.getCell('H').value = Number(item.progress);
    row.getCell('H').numFmt = '0%';
    row.getCell('I').value = item.status;

    const isM = item.isMilestone;

    ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I'].forEach(col => {
      const cell = row.getCell(col);
      cell.border = thinBorder;
      cell.font = {
        name: 'Segoe UI',
        size: 8.5,
        bold: isM,
        color: { argb: isM ? '78350F' : '1E293B' }
      };

      if (['A', 'D', 'E', 'F', 'G', 'H', 'I'].includes(col)) {
        cell.alignment = { vertical: 'middle', horizontal: 'center' };
      } else {
        cell.alignment = { vertical: 'middle' };
      }

      if (isM) {
        cell.fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: SUCCESS_LIGHT } };
      } else if (currentRow % 2 === 0) {
        cell.fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: LIGHT_BG } };
      }
    });

    const statusCell = row.getCell('I');
    statusCell.fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: SUCCESS_LIGHT } };
    statusCell.font = { name: 'Segoe UI', size: 8.5, bold: true, color: { argb: '166534' } };

    // Dibujar cronograma gráfico
    for (let day = 1; day <= 30; day++) {
      const colL = getColLetter(9 + day);
      const cell = row.getCell(colL);
      cell.border = thinBorder;

      if (sundays.includes(day)) {
        cell.fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: SUNDAY_FILL } };
        continue;
      }

      if (day >= item.startDay && day <= item.endDay) {
        if (isM) {
          cell.value = '⭐';
          cell.alignment = { vertical: 'middle', horizontal: 'center' };
          cell.fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: SUCCESS_GREEN } };
          cell.font = { name: 'Segoe UI', size: 8, bold: true, color: { argb: 'FFFFFF' } };
        } else {
          // Barra de tarea completada en verde corporativo
          cell.fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: '86EFAC' } };
        }
      } else {
        cell.fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: 'F8FAFC' } };
      }
    }

    currentRow++;
  });

  // Fila Resumen Total
  const totalRow = wsGantt.getRow(currentRow);
  totalRow.height = 25;
  wsGantt.mergeCells(`A${currentRow}:F${currentRow}`);
  const totalLabelCell = wsGantt.getCell(`A${currentRow}`);
  totalLabelCell.value = 'TOTAL SISTEMA PREVYSEG 2026 (7 FASES / 100% OPERATIVO):';
  totalLabelCell.font = { name: 'Segoe UI', size: 9.5, bold: true, color: { argb: 'FFFFFF' } };
  totalLabelCell.alignment = { vertical: 'middle', horizontal: 'right' };
  totalLabelCell.fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: NAVY_HEADER } };
  totalLabelCell.border = headerBorder;

  const totalDaysCell = totalRow.getCell('G');
  totalDaysCell.value = 30;
  totalDaysCell.numFmt = '#,##0';
  totalDaysCell.font = { name: 'Segoe UI', size: 10, bold: true, color: { argb: 'FFFFFF' } };
  totalDaysCell.alignment = { vertical: 'middle', horizontal: 'center' };
  totalDaysCell.fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: DARK_SLATE } };
  totalDaysCell.border = headerBorder;

  const totalProgCell = totalRow.getCell('H');
  totalProgCell.value = 1.0;
  totalProgCell.numFmt = '0%';
  totalProgCell.font = { name: 'Segoe UI', size: 10, bold: true, color: { argb: 'FFFFFF' } };
  totalProgCell.alignment = { vertical: 'middle', horizontal: 'center' };
  totalProgCell.fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: SUCCESS_GREEN } };
  totalProgCell.border = headerBorder;

  const totalStatusCell = totalRow.getCell('I');
  totalStatusCell.value = '100% COMPLETADO';
  totalStatusCell.font = { name: 'Segoe UI', size: 8.5, bold: true, color: { argb: '166534' } };
  totalStatusCell.alignment = { vertical: 'middle', horizontal: 'center' };
  totalStatusCell.fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: SUCCESS_LIGHT } };
  totalStatusCell.border = headerBorder;

  for (let day = 1; day <= 30; day++) {
    const colL = getColLetter(9 + day);
    const cell = totalRow.getCell(colL);
    cell.border = thinBorder;
    if (sundays.includes(day)) {
      cell.fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: SUNDAY_FILL } };
    } else {
      cell.fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: '86EFAC' } };
    }
  }

  /* ==========================================================================
     HOJA 2: CATÁLOGO DE LOS 20 CURSOS VIGENTES
     ========================================================================== */
  const wsCourses = workbook.addWorksheet('Catálogo 20 Cursos Oficiales', {
    views: [{ showGridLines: true }]
  });

  wsCourses.mergeCells('A1:I1');
  const cTitle = wsCourses.getCell('A1');
  cTitle.value = 'PREVYSEG 2026 — CATÁLOGO OFICIAL EXCLUSIVO DE LOS 20 CURSOS ACTIVOS';
  cTitle.font = { name: 'Segoe UI', size: 13, bold: true, color: { argb: 'FFFFFF' } };
  cTitle.alignment = { vertical: 'middle', horizontal: 'center' };
  cTitle.fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: DARK_SLATE } };
  wsCourses.getRow(1).height = 28;

  const courseHeaders = [
    { col: 'A', title: 'ID Curso', width: 12 },
    { col: 'B', title: 'Escuela Oficial', width: 22 },
    { col: 'C', title: 'Área / Categoría', width: 28 },
    { col: 'D', title: 'Nombre Oficial del Curso', width: 46 },
    { col: 'E', title: 'Duración / Horas', width: 20 },
    { col: 'F', title: 'Modalidad de Dictado', width: 26 },
    { col: 'G', title: 'Arancel Total (CLP)', width: 18 },
    { col: 'H', title: 'Abono 50% Cuota 1', width: 18 },
    { col: 'I', title: 'Certificación / Código', width: 26 }
  ];

  wsCourses.getRow(3).height = 22;
  courseHeaders.forEach(h => {
    wsCourses.getColumn(h.col).width = h.width;
    const cell = wsCourses.getCell(`${h.col}3`);
    cell.value = h.title;
    cell.font = { name: 'Segoe UI', size: 9, bold: true, color: { argb: 'FFFFFF' } };
    cell.alignment = { vertical: 'middle', horizontal: 'center', wrapText: true };
    cell.fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: NAVY_HEADER } };
    cell.border = headerBorder;
  });

  const coursesList = [
    // 10 Oficios
    { id: 'of-01', school: 'Escuela de Oficios', cat: 'Desarrollo de Habilidades Laborales', name: 'Resolución de conflictos y manejo de situaciones difíciles', hours: '40 Horas', mod: 'Online Asíncrona (24/7)', price: 95000, dep: 47500, cert: 'SENCE Franquicia Tributaria' },
    { id: 'of-02', school: 'Escuela de Oficios', cat: 'Desarrollo de Habilidades Laborales', name: 'Técnicas de manejo de resolución de conflictos', hours: '8 Horas', mod: 'Presencial Intensivo en Sede', price: 55000, dep: 27500, cert: 'Certificación OTEC PrevySeg' },
    { id: 'of-03', school: 'Escuela de Oficios', cat: 'Área Agropecuaria', name: 'Manejo y uso de plaguicidas agrícolas', hours: '40 Horas', mod: 'Semipresencial (Teoría + Campo)', price: 120000, dep: 60000, cert: 'Normativa SAG & Seremi Salud' },
    { id: 'of-04', school: 'Escuela de Oficios', cat: 'Área Logística y Operaciones', name: 'Operaciones básicas de carga, descarga y protocolos de seguridad en recintos portuarios', hours: '50 Horas', mod: 'Semipresencial con Terreno Portuario', price: 140000, dep: 70000, cert: 'Normativa Portuaria Directemar / TPA' },
    { id: 'of-05', school: 'Escuela de Oficios', cat: 'Área Alimentación', name: 'Procedimientos de higiene, seguridad y prevención de riesgos en procesos de manipulación de alimentos', hours: '40 Horas', mod: 'Online + Taller Higiénico', price: 85000, dep: 42500, cert: 'Carné Seremi de Salud' },
    { id: 'of-06', school: 'Escuela de Oficios', cat: 'Área Estética y Servicios', name: 'Técnicas de depilación con cera miel', hours: '30 Horas', mod: 'Presencial en Taller Estético', price: 90000, dep: 45000, cert: 'Certificación OTEC PrevySeg' },
    { id: 'of-07', school: 'Escuela de Oficios', cat: 'Área Estética y Servicios', name: 'Técnicas de manicure', hours: '35 Horas', mod: 'Presencial en Taller Estético', price: 95000, dep: 47500, cert: 'Certificación OTEC PrevySeg' },
    { id: 'of-08', school: 'Escuela de Oficios', cat: 'Área Estética y Servicios', name: 'Técnicas de maquillaje carnaval', hours: '30 Horas', mod: 'Presencial Especializado', price: 90000, dep: 45000, cert: 'Certificación OTEC PrevySeg' },
    { id: 'of-09', school: 'Escuela de Oficios', cat: 'Área de Salud', name: 'Cuidado adulto mayor y personas postradas', hours: '60 Horas', mod: 'Semipresencial con Prácticas Asistidas', price: 130000, dep: 65000, cert: 'Asistencial Geriátrico OTEC' },
    { id: 'of-10', school: 'Escuela de Oficios', cat: 'Área de Administración', name: 'Cajero bancario, administración de condominios', hours: '50 Horas', mod: 'Online Sincrónico + Simulador', price: 110000, dep: 55000, cert: 'Bancaria & Ley Copropiedad' },

    // 10 Seguridad
    { id: 'seg-01', school: 'Escuela de Seguridad Privada', cat: 'Formación Inicial', name: 'Formación de guardias de seguridad', hours: '90 Horas', mod: 'Presencial y Práctica en Terreno', price: 120000, dep: 60000, cert: 'Credencial OS-10 / Examen SPD' },
    { id: 'seg-02', school: 'Escuela de Seguridad Privada', cat: 'Formación Inicial', name: 'Formación de vigilantes privados', hours: '100 Horas', mod: 'Presencial con Instrucción de Tiro', price: 190000, dep: 95000, cert: 'Porte de Armas Regulado Carabineros' },
    { id: 'seg-03', school: 'Escuela de Seguridad Privada', cat: 'Formación Inicial', name: 'Formación de guardia de seguridad marítimo portuario', hours: '90 Horas', mod: 'Presencial / Recintos Portuarios', price: 130000, dep: 65000, cert: 'Código PBIP & Directemar' },
    { id: 'seg-04', school: 'Escuela de Seguridad Privada', cat: 'Formación Inicial', name: 'Formación para porteros, nocheros, rondines u otro de similar carácter', hours: '50 Horas', mod: 'Online Asíncrono + Prácticas', price: 95000, dep: 47500, cert: 'Acreditación SENCE & OTEC' },
    { id: 'seg-05', school: 'Escuela de Seguridad Privada', cat: 'Perfeccionamiento', name: 'Perfeccionamiento de guardias de seguridad', hours: '36 Horas', mod: 'Semipresencial (Reentrenamiento)', price: 90000, dep: 45000, cert: 'Revalidación Trienal SPD' },
    { id: 'seg-06', school: 'Escuela de Seguridad Privada', cat: 'Perfeccionamiento', name: 'Perfeccionamiento de guardia de seguridad marítimo portuario', hours: '40 Horas', mod: 'Presencial / Código PBIP', price: 100000, dep: 50000, cert: 'Revalidación Directemar' },
    { id: 'seg-07', school: 'Escuela de Seguridad Privada', cat: 'Perfeccionamiento', name: 'Perfeccionamiento para porteros, nocheros, rondines u otro de similar carácter', hours: '30 Horas', mod: 'Online Flexible', price: 75000, dep: 37500, cert: 'Certificación OTEC Continua' },
    { id: 'seg-08', school: 'Escuela de Seguridad Privada', cat: 'Tecnología y Sistemas', name: 'Técnicas de operación de circuitos cerrados de televisión (CCTV codificado por SENCE)', hours: '60 Horas', mod: 'Online Sincrónico + Software VMS', price: 140000, dep: 70000, cert: 'Codificación SENCE Oficial' },
    { id: 'seg-09', school: 'Escuela de Seguridad Privada', cat: 'Tecnología y Sistemas', name: 'Técnicas de operación CCTV y alarmas de seguridad privada', hours: '65 Horas', mod: 'Semipresencial con Paneles de Alarma', price: 150000, dep: 75000, cert: 'Sistemas Electrónicos Integrados' },
    { id: 'seg-10', school: 'Escuela de Seguridad Privada', cat: 'Tecnología y Sistemas', name: 'Supervisor de seguridad privada', hours: '120 Horas', mod: '100% Online Aula Virtual', price: 180000, dep: 90000, cert: 'Rango Jefatura Ley 21.659' }
  ];

  let cRowIdx = 4;
  coursesList.forEach(c => {
    const row = wsCourses.getRow(cRowIdx);
    row.getCell('A').value = c.id;
    row.getCell('B').value = c.school;
    row.getCell('C').value = c.cat;
    row.getCell('D').value = c.name;
    row.getCell('E').value = c.hours;
    row.getCell('F').value = c.mod;
    row.getCell('G').value = c.price;
    row.getCell('G').numFmt = '$#,##0';
    row.getCell('H').value = c.dep;
    row.getCell('H').numFmt = '$#,##0';
    row.getCell('I').value = c.cert;

    ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I'].forEach(col => {
      const cell = row.getCell(col);
      cell.border = thinBorder;
      cell.font = { name: 'Segoe UI', size: 8.5, color: { argb: '1E293B' } };
      cell.alignment = {
        vertical: 'middle',
        horizontal: ['A', 'E', 'G', 'H'].includes(col) ? 'center' : 'left'
      };
      if (cRowIdx % 2 === 0) {
        cell.fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: LIGHT_BG } };
      }
    });

    cRowIdx++;
  });

  // Guardar archivo Excel
  const xlsxPath = path.join(process.cwd(), 'Carta_Gantt_PrevySeg_2026_Actual.xlsx');
  await workbook.xlsx.writeFile(xlsxPath);
  console.log(`✅ Archivo Excel generado: ${xlsxPath}`);

  // Guardar archivo CSV compatible
  const csvPath = path.join(process.cwd(), 'Carta_Gantt_PrevySeg_2026_Actual.csv');
  let csvContent = 'WBS;Fase / Modulo;Actividad / Entregable;Responsable;Fecha Inicio;Fecha Fin;Dias;Avance;Estado\n';
  tasksDataset.forEach(item => {
    if (item.isPhaseHeader) {
      csvContent += `"${item.title}";"";"";"";"";"";"";"";""\n`;
    } else {
      const dStart = `2026-09-${String(item.startDay).padStart(2, '0')}`;
      const dEnd = `2026-09-${String(item.endDay).padStart(2, '0')}`;
      const duration = item.isMilestone ? 1 : (item.endDay - item.startDay + 1);
      csvContent += `"${item.wbs}";"${item.phase}";"${item.task}";"${item.responsible}";"${dStart}";"${dEnd}";${duration};"100%";"${item.status}"\n`;
    }
  });
  fs.writeFileSync(csvPath, csvContent, 'utf8');
  console.log(`✅ Archivo CSV generado: ${csvPath}`);
}

generateCurrentGanttChart().catch(err => {
  console.error('Error generando Carta Gantt:', err);
  process.exit(1);
});
