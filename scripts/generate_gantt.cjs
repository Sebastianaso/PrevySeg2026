const ExcelJS = require('exceljs');
const path = require('path');

async function generateGanttChart() {
  const workbook = new ExcelJS.Workbook();
  workbook.creator = 'PrevySeg Project Management';
  workbook.lastModifiedBy = 'PrevySeg Team';
  workbook.created = new Date(2026, 8, 1);
  workbook.modified = new Date();

  // Color Palette Constants
  const NAVY_HEADER = '1E3A8A';
  const DARK_SLATE = '0F172A';
  const MEDIUM_SLATE = '1E293B';
  const LIGHT_BG = 'F8FAFC';
  const ACCENT_BLUE = '2563EB';
  const ACCENT_LIGHT_BLUE = 'DBEAFE';
  const SUCCESS_GREEN = '16A34A';
  const SUCCESS_LIGHT = 'DCFCE7';
  const WARNING_GOLD = 'D97706';
  const WARNING_LIGHT = 'FEF3C7';
  const PROGRESS_BLUE = '0284C7';
  const PROGRESS_LIGHT = 'E0F2FE';
  const PENDING_GRAY = '64748B';
  const PENDING_LIGHT = 'F1F5F9';
  const BORDER_COLOR = 'CBD5E1';
  const MILESTONE_BG = '78350F';
  const MILESTONE_FILL = 'F59E0B';

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

  /* ==========================================================================
     HOJA 1: CARTA GANTT (Cronograma Interactivo 1 Mes + Extensiones)
     ========================================================================== */
  const wsGantt = workbook.addWorksheet('Carta Gantt', {
    views: [{ state: 'frozen', xSplit: 5, ySplit: 8, showGridLines: true }]
  });

  // Base Date: 1 de Septiembre 2026
  const startDateBase = new Date(2026, 8, 1); // 1 Sep 2026

  // Title Banner
  wsGantt.mergeCells('A1:AK1');
  const titleCell = wsGantt.getCell('A1');
  titleCell.value = 'PREVYSEG 2026 — CRONOGRAMA MAESTRO Y CARTA GANTT (1 MES / 30 DÍAS + EXTENSIONES)';
  titleCell.font = { name: 'Segoe UI', size: 16, bold: true, color: { argb: 'FFFFFF' } };
  titleCell.alignment = { vertical: 'middle', horizontal: 'center' };
  titleCell.fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: DARK_SLATE } };
  wsGantt.getRow(1).height = 34;

  // Subtitle
  wsGantt.mergeCells('A2:AK2');
  const subCell = wsGantt.getCell('A2');
  subCell.value = 'Desarrollo de Plataforma Web Corporativa, Campus Virtual LMS, RBAC, Catálogos, Panel de Administración e Iteraciones';
  subCell.font = { name: 'Segoe UI', size: 11, italic: true, color: { argb: 'E2E8F0' } };
  subCell.alignment = { vertical: 'middle', horizontal: 'center' };
  subCell.fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: MEDIUM_SLATE } };
  wsGantt.getRow(2).height = 22;

  // KPI Summary Bar (Rows 4-5)
  wsGantt.mergeCells('A4:C4');
  wsGantt.getCell('A4').value = 'MÉTRICAS DEL PROYECTO:';
  wsGantt.getCell('A4').font = { name: 'Segoe UI', size: 10, bold: true, color: { argb: DARK_SLATE } };
  wsGantt.getCell('A4').alignment = { vertical: 'middle' };

  // KPI 1: Total Tareas
  wsGantt.mergeCells('D4:F4');
  wsGantt.getCell('D4').value = 'Total Tareas & Hitos';
  wsGantt.getCell('D4').font = { name: 'Segoe UI', size: 9, color: { argb: '475569' } };
  wsGantt.getCell('D4').alignment = { horizontal: 'center' };
  wsGantt.mergeCells('D5:F5');
  wsGantt.getCell('D5').value = { formula: 'COUNTA(C10:C45)' };
  wsGantt.getCell('D5').font = { name: 'Segoe UI', size: 14, bold: true, color: { argb: ACCENT_BLUE } };
  wsGantt.getCell('D5').alignment = { horizontal: 'center' };

  // KPI 2: Completadas
  wsGantt.mergeCells('G4:I4');
  wsGantt.getCell('G4').value = 'Tareas Completadas';
  wsGantt.getCell('G4').font = { name: 'Segoe UI', size: 9, color: { argb: '475569' } };
  wsGantt.getCell('G4').alignment = { horizontal: 'center' };
  wsGantt.mergeCells('G5:I5');
  wsGantt.getCell('G5').value = { formula: 'COUNTIF(I10:I45, "Completado")' };
  wsGantt.getCell('G5').font = { name: 'Segoe UI', size: 14, bold: true, color: { argb: SUCCESS_GREEN } };
  wsGantt.getCell('G5').alignment = { horizontal: 'center' };

  // KPI 3: En Progreso
  wsGantt.mergeCells('J4:L4');
  wsGantt.getCell('J4').value = 'En Progreso / Iteración';
  wsGantt.getCell('J4').font = { name: 'Segoe UI', size: 9, color: { argb: '475569' } };
  wsGantt.getCell('J4').alignment = { horizontal: 'center' };
  wsGantt.mergeCells('J5:L5');
  wsGantt.getCell('J5').value = { formula: 'COUNTIF(I10:I45, "En Progreso")' };
  wsGantt.getCell('J5').font = { name: 'Segoe UI', size: 14, bold: true, color: { argb: PROGRESS_BLUE } };
  wsGantt.getCell('J5').alignment = { horizontal: 'center' };

  // KPI 4: Hitos Clave
  wsGantt.mergeCells('M4:O4');
  wsGantt.getCell('M4').value = 'Hitos Principales';
  wsGantt.getCell('M4').font = { name: 'Segoe UI', size: 9, color: { argb: '475569' } };
  wsGantt.getCell('M4').alignment = { horizontal: 'center' };
  wsGantt.mergeCells('M5:O5');
  wsGantt.getCell('M5').value = { formula: 'COUNTIF(D10:D45, "*Hito*")' };
  wsGantt.getCell('M5').font = { name: 'Segoe UI', size: 14, bold: true, color: { argb: WARNING_GOLD } };
  wsGantt.getCell('M5').alignment = { horizontal: 'center' };

  // KPI 5: Avance Global Promedio
  wsGantt.mergeCells('P4:R4');
  wsGantt.getCell('P4').value = 'Avance Global Estimado';
  wsGantt.getCell('P4').font = { name: 'Segoe UI', size: 9, color: { argb: '475569' } };
  wsGantt.getCell('P4').alignment = { horizontal: 'center' };
  wsGantt.mergeCells('P5:R5');
  wsGantt.getCell('P5').value = { formula: 'AVERAGE(H10:H45)' };
  wsGantt.getCell('P5').numFmt = '0.0%';
  wsGantt.getCell('P5').font = { name: 'Segoe UI', size: 14, bold: true, color: { argb: DARK_SLATE } };
  wsGantt.getCell('P5').alignment = { horizontal: 'center' };

  // Format KPI box borders & backgrounds
  ['D4', 'D5', 'G4', 'G5', 'J4', 'J5', 'M4', 'M5', 'P4', 'P5'].forEach(cellRef => {
    const cell = wsGantt.getCell(cellRef);
    cell.fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: 'F8FAFC' } };
    cell.border = thinBorder;
  });

  // Row 7: Header Level 1 (Columns + Week Groupings)
  wsGantt.getRow(7).height = 24;
  wsGantt.getRow(8).height = 26;

  // Main task metadata headers
  const mainHeaders = [
    { col: 'A', title: 'WBS', width: 7 },
    { col: 'B', title: 'Fase / Módulo', width: 22 },
    { col: 'C', title: 'Tarea / Entregable / Hito', width: 44 },
    { col: 'D', title: 'Tipo', width: 14 },
    { col: 'E', title: 'Responsable', width: 18 },
    { col: 'F', title: 'F. Inicio', width: 12 },
    { col: 'G', title: 'F. Fin', width: 12 },
    { col: 'H', title: 'Días', width: 7 },
    { col: 'I', title: '% Avance', width: 11 },
    { col: 'J', title: 'Estado', width: 14 },
    { col: 'K', title: 'Dependencias', width: 13 }
  ];

  mainHeaders.forEach(h => {
    wsGantt.getColumn(h.col).width = h.width;
    wsGantt.mergeCells(`${h.col}7:${h.col}8`);
    const cell = wsGantt.getCell(`${h.col}7`);
    cell.value = h.title;
    cell.font = { name: 'Segoe UI', size: 10, bold: true, color: { argb: 'FFFFFF' } };
    cell.alignment = { vertical: 'middle', horizontal: 'center', wrapText: true };
    cell.fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: NAVY_HEADER } };
    cell.border = headerBorder;
  });

  // Week Groupings (Columns L to AK = 30 days of Month 1 + 5 buffer days)
  const totalDays = 35; // 30 days + 5 expansion days
  const daysInWeeks = [
    { name: 'SEMANA 1 (Días 1 - 7)', startCol: 12, endCol: 18, color: '1E3A8A' },
    { name: 'SEMANA 2 (Días 8 - 14)', startCol: 19, endCol: 25, color: '1D4ED8' },
    { name: 'SEMANA 3 (Días 15 - 21)', startCol: 26, endCol: 32, color: '2563EB' },
    { name: 'SEMANA 4 (Días 22 - 30)', startCol: 33, endCol: 41, color: '3B82F6' },
    { name: 'EXTENSIÓN / NUEVOS HITOS (Días 31 - 35)', startCol: 42, endCol: 46, color: '0D9488' }
  ];

  function getColLetter(colIndex) {
    let temp, letter = '';
    while (colIndex > 0) {
      temp = (colIndex - 1) % 26;
      letter = String.fromCharCode(temp + 65) + letter;
      colIndex = (colIndex - temp - 1) / 26;
    }
    return letter;
  }

  daysInWeeks.forEach(w => {
    const startLetter = getColLetter(w.startCol);
    const endLetter = getColLetter(w.endCol);
    wsGantt.mergeCells(`${startLetter}7:${endLetter}7`);
    const weekCell = wsGantt.getCell(`${startLetter}7`);
    weekCell.value = w.name;
    weekCell.font = { name: 'Segoe UI', size: 10, bold: true, color: { argb: 'FFFFFF' } };
    weekCell.alignment = { vertical: 'middle', horizontal: 'center' };
    weekCell.fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: w.color } };
    weekCell.border = headerBorder;
  });

  // Day columns (Row 8)
  for (let i = 1; i <= totalDays; i++) {
    const colIdx = 11 + i; // starts at col 12 (L)
    const colLetter = getColLetter(colIdx);
    wsGantt.getColumn(colLetter).width = 4.2;
    const dayCell = wsGantt.getCell(`${colLetter}8`);
    dayCell.value = `D${i}`;
    dayCell.font = { name: 'Segoe UI', size: 8, bold: true, color: { argb: i > 30 ? '0F766E' : '334155' } };
    dayCell.alignment = { vertical: 'middle', horizontal: 'center' };
    dayCell.fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: i > 30 ? 'CCFBF1' : (i % 2 === 0 ? 'F1F5F9' : 'E2E8F0') } };
    dayCell.border = thinBorder;
  }

  // Data Rows Definition
  // Each task has: wbs, phase, task, type, responsible, startDay, endDay, progress, status, deps, isMilestone, isPhaseHeader
  const tasksData = [
    // FASE 1
    {
      isPhaseHeader: true,
      title: 'FASE 1: LANDING PAGE CORPORATIVA Y EXPERIENCIA DE USUARIO (SEMANA 1)',
      color: '1E3A8A'
    },
    {
      wbs: '1.0',
      phase: 'Landing Page',
      task: '⭐ HITO 1: Landing Page Corporativa y Catálogos OS10 Operativos',
      type: 'Hito ⭐',
      responsible: 'PM / Fullstack',
      startDay: 7,
      endDay: 7,
      progress: 1.0,
      status: 'Completado',
      deps: '1.1, 1.2, 1.3',
      isMilestone: true
    },
    {
      wbs: '1.1',
      phase: 'Arquitectura Base',
      task: 'Setup inicial de Vite 8, React 19, Tailwind v4 y React Router',
      type: 'Configuración',
      responsible: 'Dev Frontend',
      startDay: 1,
      endDay: 2,
      progress: 1.0,
      status: 'Completado',
      deps: '-'
    },
    {
      wbs: '1.2',
      phase: 'Landing Page',
      task: 'Hero Section con llamados a la acción y Canvas Network Background',
      type: 'Desarrollo UI',
      responsible: 'Dev Frontend',
      startDay: 2,
      endDay: 3,
      progress: 1.0,
      status: 'Completado',
      deps: '1.1'
    },
    {
      wbs: '1.3',
      phase: 'Landing Page',
      task: 'Módulos de Cursos OS10 (Formación, Perfeccionamiento) & Modals interactivos',
      type: 'Desarrollo UI',
      responsible: 'Dev Frontend',
      startDay: 3,
      endDay: 4,
      progress: 1.0,
      status: 'Completado',
      deps: '1.2'
    },
    {
      wbs: '1.4',
      phase: 'Landing Page',
      task: 'Secciones Quiénes Somos, Métricas, Metodología de Ejecución y Testimonios',
      type: 'Desarrollo UI',
      responsible: 'UX / UI Dev',
      startDay: 4,
      endDay: 5,
      progress: 1.0,
      status: 'Completado',
      deps: '1.3'
    },
    {
      wbs: '1.5',
      phase: 'Iteración / Contacto',
      task: '🔄 ITERACIÓN: Conexión directa de Formulario de Contacto a WhatsApp (+56978691869)',
      type: 'Iteración',
      responsible: 'Fullstack Dev',
      startDay: 5,
      endDay: 6,
      progress: 1.0,
      status: 'Completado',
      deps: '1.4'
    },
    {
      wbs: '1.6',
      phase: 'QA & Responsive',
      task: 'Optimización Mobile, pruebas cross-browser y navegación fluida (ScrollToTop)',
      type: 'QA / Optimización',
      responsible: 'QA / Frontend',
      startDay: 6,
      endDay: 7,
      progress: 1.0,
      status: 'Completado',
      deps: '1.5'
    },

    // FASE 2
    {
      isPhaseHeader: true,
      title: 'FASE 2: CAMPUS VIRTUAL LMS & SISTEMA DE AUTENTICACIÓN (SEMANA 2)',
      color: '1D4ED8'
    },
    {
      wbs: '2.0',
      phase: 'Campus Virtual LMS',
      task: '⭐ HITO 2: Plataforma LMS con Autenticación, Dashboard y Visor de Cursos',
      type: 'Hito ⭐',
      responsible: 'PM / Fullstack',
      startDay: 14,
      endDay: 14,
      progress: 1.0,
      status: 'Completado',
      deps: '2.1, 2.2, 2.3, 2.4',
      isMilestone: true
    },
    {
      wbs: '2.1',
      phase: 'LMS Core',
      task: 'Maquetación de LMSLayout (Sidebar colapsable, Topbar, navegación dinámica)',
      type: 'Desarrollo UI',
      responsible: 'Dev Frontend',
      startDay: 8,
      endDay: 9,
      progress: 1.0,
      status: 'Completado',
      deps: '1.0'
    },
    {
      wbs: '2.2',
      phase: 'Seguridad / Auth',
      task: 'Sistema de Autenticación de Usuarios (Login modal, estado de sesión, logout)',
      type: 'Seguridad / Core',
      responsible: 'Fullstack Dev',
      startDay: 9,
      endDay: 10,
      progress: 1.0,
      status: 'Completado',
      deps: '2.1'
    },
    {
      wbs: '2.3',
      phase: 'LMS Estudiante',
      task: 'Desarrollo de Área Personal (PersonalAreaView) y Mis Cursos (MyCoursesView)',
      type: 'Desarrollo UI',
      responsible: 'Dev Frontend',
      startDay: 10,
      endDay: 11,
      progress: 1.0,
      status: 'Completado',
      deps: '2.2'
    },
    {
      wbs: '2.4',
      phase: 'LMS Contenido',
      task: 'Visor de Contenidos del Curso (CoursesView: Video, módulos, descargas)',
      type: 'Desarrollo UI',
      responsible: 'Dev Frontend',
      startDay: 11,
      endDay: 12,
      progress: 1.0,
      status: 'Completado',
      deps: '2.3'
    },
    {
      wbs: '2.5',
      phase: 'LMS Gestión',
      task: 'Tabla Dinámica de Participantes (ParticipantsView con filtros, notas y estados)',
      type: 'Desarrollo UI/Data',
      responsible: 'Fullstack Dev',
      startDay: 12,
      endDay: 14,
      progress: 1.0,
      status: 'Completado',
      deps: '2.4'
    },

    // FASE 3
    {
      isPhaseHeader: true,
      title: 'FASE 3: CONTROL DE ACCESO (RBAC), CAPACITACIONES EXTRAS Y BOLSA DE EMPLEO (SEMANA 3)',
      color: '2563EB'
    },
    {
      wbs: '3.0',
      phase: 'Módulos Avanzados',
      task: '⭐ HITO 3: Sistema RBAC (Student/Admin), Bolsa de Empleo y Capacitaciones',
      type: 'Hito ⭐',
      responsible: 'PM / Fullstack',
      startDay: 21,
      endDay: 21,
      progress: 1.0,
      status: 'Completado',
      deps: '3.1, 3.2, 3.3',
      isMilestone: true
    },
    {
      wbs: '3.1',
      phase: 'RBAC / Roles',
      task: '🔄 ITERACIÓN: Implementación de Roles (ADMIN vs STUDENT) y filtrado de menús',
      type: 'Iteración / RBAC',
      responsible: 'Fullstack Dev',
      startDay: 15,
      endDay: 16,
      progress: 1.0,
      status: 'Completado',
      deps: '2.0'
    },
    {
      wbs: '3.2',
      phase: 'Catálogo Extra',
      task: 'Módulo de Capacitaciones Extras (ExtraCoursesView con filtros, precios, SENCE)',
      type: 'Desarrollo UI/Data',
      responsible: 'Dev Frontend',
      startDay: 16,
      endDay: 18,
      progress: 1.0,
      status: 'Completado',
      deps: '3.1'
    },
    {
      wbs: '3.3',
      phase: 'Bolsa de Empleo',
      task: 'Portal de Bolsa de Empleo (JobBoardView: Vacantes de seguridad y postulación)',
      type: 'Desarrollo UI/Data',
      responsible: 'Dev Frontend',
      startDay: 18,
      endDay: 20,
      progress: 1.0,
      status: 'Completado',
      deps: '3.1'
    },
    {
      wbs: '3.4',
      phase: 'Bancos Académicos',
      task: 'Vistas de Banco de Contenidos, Banco de Preguntas y Ajustes de Cuenta',
      type: 'Desarrollo UI',
      responsible: 'Dev Frontend',
      startDay: 19,
      endDay: 21,
      progress: 1.0,
      status: 'Completado',
      deps: '3.2, 3.3'
    },

    // FASE 4
    {
      isPhaseHeader: true,
      title: 'FASE 4: ADMINISTRACIÓN DEL SITIO (15 MÓDULOS), REPORTES Y PREPARACIÓN BACKEND (SEMANA 4)',
      color: '3B82F6'
    },
    {
      wbs: '4.0',
      phase: 'Admin & Backend',
      task: '⭐ HITO 4: Panel de Administración 15 Módulos, Reportes y Marcadores BD',
      type: 'Hito ⭐',
      responsible: 'PM / Fullstack',
      startDay: 30,
      endDay: 30,
      progress: 1.0,
      status: 'Completado',
      deps: '4.1, 4.2, 4.3, 4.4',
      isMilestone: true
    },
    {
      wbs: '4.1',
      phase: 'Admin Panel',
      task: 'Panel de Administración del Sitio (SiteAdminView con 15 categorías desplegables)',
      type: 'Desarrollo Admin',
      responsible: 'Fullstack Dev',
      startDay: 22,
      endDay: 25,
      progress: 1.0,
      status: 'Completado',
      deps: '3.0'
    },
    {
      wbs: '4.2',
      phase: 'Analíticas',
      task: 'Módulo de Informes y Reportes de Rendimiento Académico (ReportsView)',
      type: 'Desarrollo UI/Data',
      responsible: 'Dev Frontend',
      startDay: 24,
      endDay: 26,
      progress: 1.0,
      status: 'Completado',
      deps: '4.1'
    },
    {
      wbs: '4.3',
      phase: 'Arquitectura BD',
      task: '🔄 ITERACIÓN: Estandarización de Endpoints y Marcadores Backend /////AGREGAR BD///',
      type: 'Iteración / Backend',
      responsible: 'Backend Dev',
      startDay: 26,
      endDay: 28,
      progress: 1.0,
      status: 'Completado',
      deps: '4.1, 4.2'
    },
    {
      wbs: '4.4',
      phase: 'Auditoría & QA',
      task: 'Pruebas E2E de Flujos de Usuario, consistencia visual y control de errores',
      type: 'QA & Testing',
      responsible: 'QA Tester',
      startDay: 28,
      endDay: 30,
      progress: 1.0,
      status: 'Completado',
      deps: '4.3'
    },
    {
      wbs: '4.5',
      phase: 'UI/UX & Temas',
      task: '🔄 ITERACIÓN: Modo Claro con Fondo Blanco Puro (#ffffff) y Modo Oscuro Original (#18191c)',
      type: 'Iteración / UI',
      responsible: 'Dev Frontend',
      startDay: 28,
      endDay: 30,
      progress: 1.0,
      status: 'Completado',
      deps: '4.4'
    },

    // FASE 5: NUEVAS INCORPORACIONES Y EXTENSIÓN PERSONALIZABLE
    {
      isPhaseHeader: true,
      title: 'FASE 5: PRÓXIMAS INCORPORACIONES, INTEGRACIÓN BACKEND Y NUEVAS ITERACIONES (EDITABLE)',
      color: '0D9488'
    },
    {
      wbs: '5.0',
      phase: 'Extensión Mes 1+',
      task: '⭐ HITO 5: Despliegue en Producción con Base de Datos Real y Pagos Online',
      type: 'Hito ⭐',
      responsible: 'PM / Arquitecto',
      startDay: 35,
      endDay: 35,
      progress: 0.15,
      status: 'En Progreso',
      deps: '5.1, 5.2, 5.3',
      isMilestone: true
    },
    {
      wbs: '5.1',
      phase: 'Backend & BD',
      task: '[NUEVA TAREA]: Conexión de API REST y Base de Datos PostgreSQL/Supabase en endpoints',
      type: 'Backend / BD',
      responsible: 'Backend Dev',
      startDay: 29,
      endDay: 33,
      progress: 0.25,
      status: 'En Progreso',
      deps: '4.3'
    },
    {
      wbs: '5.2',
      phase: 'Pasarela Pagos',
      task: '[NUEVA TAREA]: Integración de Pasarela de Pagos (Webpay Plus / Transbank / MercadoPago)',
      type: 'Integración',
      responsible: 'Fullstack Dev',
      startDay: 31,
      endDay: 34,
      progress: 0.10,
      status: 'Pendiente',
      deps: '5.1'
    },
    {
      wbs: '5.3',
      phase: 'Certificación QR',
      task: '[NUEVA TAREA]: Generador automático de Diplomas OS10 en PDF con Código QR de validación',
      type: 'Desarrollo',
      responsible: 'Fullstack Dev',
      startDay: 32,
      endDay: 35,
      progress: 0.0,
      status: 'Pendiente',
      deps: '5.1'
    },
    {
      wbs: '5.4',
      phase: 'Notificaciones',
      task: '[NUEVA TAREA]: Sistema de alertas de vencimiento de credenciales OS10 por Email/SMS',
      type: 'Desarrollo',
      responsible: 'Backend Dev',
      startDay: 33,
      endDay: 35,
      progress: 0.0,
      status: 'Pendiente',
      deps: '5.1'
    },
    {
      wbs: '5.5',
      phase: 'Personalizado',
      task: '[ESPACIO EDITABLE]: Agregue aquí su próximo requerimiento o iteración personalizada',
      type: 'A Definir',
      responsible: 'Por Asignar',
      startDay: 31,
      endDay: 35,
      progress: 0.0,
      status: 'Planificado',
      deps: '-'
    }
  ];

  let currentRow = 9;

  tasksData.forEach((item) => {
    if (item.isPhaseHeader) {
      // Phase banner row
      wsGantt.mergeCells(`A${currentRow}:AK${currentRow}`);
      const phaseCell = wsGantt.getCell(`A${currentRow}`);
      phaseCell.value = item.title;
      phaseCell.font = { name: 'Segoe UI', size: 10, bold: true, color: { argb: 'FFFFFF' } };
      phaseCell.alignment = { vertical: 'middle', indent: 1 };
      phaseCell.fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: item.color } };
      wsGantt.getRow(currentRow).height = 22;
      currentRow++;
      return;
    }

    const row = wsGantt.getRow(currentRow);
    row.height = 20;

    // Calculate Dates
    const dStart = new Date(startDateBase);
    dStart.setDate(startDateBase.getDate() + (item.startDay - 1));
    const dEnd = new Date(startDateBase);
    dEnd.setDate(startDateBase.getDate() + (item.endDay - 1));

    // Metadata Values
    row.getCell('A').value = item.wbs;
    row.getCell('B').value = item.phase;
    row.getCell('C').value = item.task;
    row.getCell('D').value = item.type;
    row.getCell('E').value = item.responsible;
    row.getCell('F').value = dStart;
    row.getCell('F').numFmt = 'dd/mm/yyyy';
    row.getCell('G').value = dEnd;
    row.getCell('G').numFmt = 'dd/mm/yyyy';
    
    // Formula for duration
    row.getCell('H').value = { formula: `G${currentRow}-F${currentRow}+1` };
    row.getCell('H').numFmt = '0';

    // Progress
    row.getCell('I').value = item.progress;
    row.getCell('I').numFmt = '0%';

    // Status
    row.getCell('J').value = item.status;
    row.getCell('K').value = item.deps;

    // Formatting metadata cells
    const isM = item.isMilestone;
    const isIter = item.task.includes('ITERACIÓN');

    ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K'].forEach(col => {
      const cell = row.getCell(col);
      cell.border = thinBorder;
      cell.font = {
        name: 'Segoe UI',
        size: 9,
        bold: isM,
        color: { argb: isM ? MILESTONE_BG : (isIter ? '1E3A8A' : '1E293B') }
      };

      if (['A', 'D', 'F', 'G', 'H', 'I', 'J', 'K'].includes(col)) {
        cell.alignment = { vertical: 'middle', horizontal: 'center' };
      } else {
        cell.alignment = { vertical: 'middle' };
      }

      if (isM) {
        cell.fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: WARNING_LIGHT } };
      } else if (isIter) {
        cell.fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: 'EFF6FF' } };
      } else if (currentRow % 2 === 0) {
        cell.fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: LIGHT_BG } };
      }
    });

    // Status specific color badges
    const statusCell = row.getCell('J');
    if (item.status === 'Completado') {
      statusCell.fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: SUCCESS_LIGHT } };
      statusCell.font = { name: 'Segoe UI', size: 9, bold: true, color: { argb: '166534' } };
    } else if (item.status === 'En Progreso') {
      statusCell.fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: PROGRESS_LIGHT } };
      statusCell.font = { name: 'Segoe UI', size: 9, bold: true, color: { argb: '0369A1' } };
    } else if (item.status === 'Pendiente') {
      statusCell.fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: PENDING_LIGHT } };
      statusCell.font = { name: 'Segoe UI', size: 9, color: { argb: '475569' } };
    }

    // Render Gantt Timeline Columns (L to AK)
    for (let day = 1; day <= totalDays; day++) {
      const colLetter = getColLetter(11 + day);
      const cell = row.getCell(colLetter);
      cell.border = thinBorder;

      if (day >= item.startDay && day <= item.endDay) {
        if (isM) {
          cell.value = '⭐';
          cell.alignment = { vertical: 'middle', horizontal: 'center' };
          cell.fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: MILESTONE_FILL } };
          cell.font = { name: 'Segoe UI', size: 10, bold: true };
        } else if (isIter) {
          cell.value = '🔄';
          cell.alignment = { vertical: 'middle', horizontal: 'center' };
          cell.fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: '93C5FD' } };
          cell.font = { name: 'Segoe UI', size: 8 };
        } else {
          // Normal task bar
          if (item.status === 'Completado') {
            cell.fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: '86EFAC' } };
          } else if (item.status === 'En Progreso') {
            cell.fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: '7DD3FC' } };
          } else {
            cell.fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: 'CBD5E1' } };
          }
        }
      } else {
        // Empty day background
        if (day > 30) {
          cell.fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: 'F0FDFA' } };
        } else if (day % 7 === 6 || day % 7 === 0) {
          // Weekend shading
          cell.fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: 'F1F5F9' } };
        }
      }
    }

    currentRow++;
  });

  // Add 5 Empty Pre-formatted rows for user additions
  for (let emptyIdx = 1; emptyIdx <= 5; emptyIdx++) {
    const row = wsGantt.getRow(currentRow);
    row.height = 20;
    row.getCell('A').value = `5.${5 + emptyIdx}`;
    row.getCell('B').value = 'Nueva Tarea / Módulo';
    row.getCell('C').value = `[Escriba aquí la descripción de su nueva tarea ${emptyIdx}]`;
    row.getCell('D').value = 'Desarrollo';
    row.getCell('E').value = 'Por Asignar';
    row.getCell('H').value = { formula: `IF(OR(F${currentRow}="",G${currentRow}=""),"",G${currentRow}-F${currentRow}+1)` };
    row.getCell('I').value = 0.0;
    row.getCell('I').numFmt = '0%';
    row.getCell('J').value = 'Planificado';
    row.getCell('K').value = '-';

    ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K'].forEach(col => {
      const cell = row.getCell(col);
      cell.border = thinBorder;
      cell.font = { name: 'Segoe UI', size: 9, italic: col === 'C', color: { argb: '64748B' } };
      if (['A', 'D', 'F', 'G', 'H', 'I', 'J', 'K'].includes(col)) {
        cell.alignment = { vertical: 'middle', horizontal: 'center' };
      } else {
        cell.alignment = { vertical: 'middle' };
      }
      cell.fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: 'F8FAFC' } };
    });

    for (let day = 1; day <= totalDays; day++) {
      const colLetter = getColLetter(11 + day);
      const cell = row.getCell(colLetter);
      cell.border = thinBorder;
      cell.fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: 'FFFFFF' } };
    }

    currentRow++;
  }

  // Legend at bottom of Gantt Sheet
  currentRow += 2;
  wsGantt.mergeCells(`A${currentRow}:C${currentRow}`);
  wsGantt.getCell(`A${currentRow}`).value = 'Simbología y Convenciones:';
  wsGantt.getCell(`A${currentRow}`).font = { name: 'Segoe UI', size: 10, bold: true, color: { argb: DARK_SLATE } };

  const legendItems = [
    { text: '⭐ Hito Clave / Entregable', fg: MILESTONE_FILL, textCol: '78350F' },
    { text: '🔄 Iteración / Refactor / Ajuste', fg: '93C5FD', textCol: '1E3A8A' },
    { text: '■ Tarea Completada (100%)', fg: '86EFAC', textCol: '166534' },
    { text: '■ Tarea En Progreso', fg: '7DD3FC', textCol: '0369A1' },
    { text: '■ Tarea Planificada / Pendiente', fg: 'CBD5E1', textCol: '475569' },
    { text: '■ Días de Extensión Mes 1+', fg: 'CCFBF1', textCol: '0F766E' }
  ];

  let legCol = 4; // D
  legendItems.forEach(leg => {
    const startL = getColLetter(legCol);
    const endL = getColLetter(legCol + 3);
    wsGantt.mergeCells(`${startL}${currentRow}:${endL}${currentRow}`);
    const cell = wsGantt.getCell(`${startL}${currentRow}`);
    cell.value = leg.text;
    cell.font = { name: 'Segoe UI', size: 8.5, bold: true, color: { argb: leg.textCol } };
    cell.alignment = { vertical: 'middle', horizontal: 'center' };
    cell.fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: leg.fg } };
    cell.border = thinBorder;
    legCol += 4;
  });


  /* ==========================================================================
     HOJA 2: HITOS Y ENTREGABLES CLAVE (Milestones Summary)
     ========================================================================== */
  const wsMilestones = workbook.addWorksheet('Hitos y Entregables', {
    views: [{ showGridLines: true }]
  });

  wsMilestones.mergeCells('A1:G1');
  const mTitle = wsMilestones.getCell('A1');
  mTitle.value = 'PREVYSEG 2026 — MATRIZ EJECUTIVA DE HITOS Y ENTREGABLES';
  mTitle.font = { name: 'Segoe UI', size: 15, bold: true, color: { argb: 'FFFFFF' } };
  mTitle.alignment = { vertical: 'middle', horizontal: 'center' };
  mTitle.fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: NAVY_HEADER } };
  wsMilestones.getRow(1).height = 32;

  const mHeaders = [
    { col: 'A', title: 'Hito #', width: 10 },
    { col: 'B', title: 'Nombre del Hito', width: 34 },
    { col: 'C', title: 'Fecha Límite', width: 14 },
    { col: 'D', title: 'Entregables Clave Verificables', width: 48 },
    { col: 'E', title: 'Criterios de Aceptación', width: 44 },
    { col: 'F', title: 'Estado', width: 14 },
    { col: 'G', title: 'Impacto / Valor de Negocio', width: 36 }
  ];

  wsMilestones.getRow(3).height = 24;
  mHeaders.forEach(h => {
    wsMilestones.getColumn(h.col).width = h.width;
    const cell = wsMilestones.getCell(`${h.col}3`);
    cell.value = h.title;
    cell.font = { name: 'Segoe UI', size: 10, bold: true, color: { argb: 'FFFFFF' } };
    cell.alignment = { vertical: 'middle', horizontal: 'center', wrapText: true };
    cell.fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: DARK_SLATE } };
    cell.border = headerBorder;
  });

  const milestonesData = [
    {
      id: 'HITO 1',
      name: 'Landing Page Corporativa & Catálogo OS10',
      date: '07/09/2026',
      deliverables: '• Header responsive + Hero + Canvas interactivo\n• Catálogo Cursos OS10 (Formación y Perfeccionamiento)\n• Modales detallados con precios, requisitos y fechas\n• Formulario de contacto conectado directo a WhatsApp API\n• Secciones Quiénes Somos, Métricas, Metodología y Footer',
      criteria: 'Aprobación visual 100% responsive en desktop/mobile, navegación fluida y envío correcto de mensajes a WhatsApp.',
      status: 'Completado',
      impact: 'Presencia digital profesional y canal de captación comercial directo para cursos de seguridad privada.'
    },
    {
      id: 'HITO 2',
      name: 'Campus Virtual LMS & Autenticación',
      date: '14/09/2026',
      deliverables: '• LMSLayout con Sidebar colapsable y navegación fluida\n• Sistema de Auth con Login modal y estado de sesión\n• Área Personal (PersonalAreaView) con resumen de avance\n• Mis Cursos (MyCoursesView) con tarjetas y progreso\n• Visor de Cursos (CoursesView) con videos y descargas\n• Tabla dinámica de Participantes con filtros y notas',
      criteria: 'Flujo de autenticación completo, navegación sin recargas, carga de materiales didácticos y control de alumnos.',
      status: 'Completado',
      impact: 'Plataforma educativa interactiva que permite impartir capacitaciones sincrónicas y asincrónicas.'
    },
    {
      id: 'HITO 3',
      name: 'Control RBAC, Bolsa Empleo y Cursos Extras',
      date: '21/09/2026',
      deliverables: '• RBAC: Control de roles STUDENT (Estudiante) y ADMIN\n• Filtrado dinámico de menú según rol activo + Role Switcher\n• Módulo de Capacitaciones Extras con códigos SENCE\n• Portal de Bolsa de Empleo en Seguridad con postulaciones\n• Vistas de Banco de Preguntas, Contenidos y Ajustes',
      criteria: 'Restricción de vistas administrativas a alumnos, catálogo extra filtrable por categoría y postulación funcional.',
      status: 'Completado',
      impact: 'Ampliación de la oferta académica, intermediación laboral para guardias y seguridad en el acceso por roles.'
    },
    {
      id: 'HITO 4',
      name: 'Panel de Administración (15 Módulos) & Backend',
      date: '30/09/2026',
      deliverables: '• SiteAdminView con 15 categorías desplegables de configuración\n• Módulo de Informes y Reportes de Rendimiento Académico\n• Marcadores y estandarización /////AGREGAR BD/DOMINIO AQUI///\n• URLs y endpoints REST preparados para backend\n• Suite de componentes y testing de rendimiento',
      criteria: 'Configuración granular del sitio operativa, informes exportables y arquitectura desacoplada lista para API REST.',
      status: 'Completado',
      impact: 'Control total del administrador sobre usuarios, cursos y servidor, con base técnica sólida para producción.'
    },
    {
      id: 'HITO 5',
      name: 'Despliegue Producción con BD Real & Pagos (Extensión)',
      date: '05/10/2026',
      deliverables: '• Conexión de API REST con Base de Datos PostgreSQL/Supabase\n• Pasarela de pagos Webpay Plus / Transbank / MercadoPago\n• Emisión de Certificados OS10 en PDF con Código QR\n• Notificaciones automáticas de vigencia de acreditaciones',
      criteria: 'Transacciones de pago exitosas, sincronización bidireccional con base de datos y validación pública de diplomas.',
      status: 'En Progreso',
      impact: 'Automatización total del ciclo comercial y emisión de certificaciones oficiales reconocidas.'
    }
  ];

  let mRowIdx = 4;
  milestonesData.forEach(m => {
    const row = wsMilestones.getRow(mRowIdx);
    row.getCell('A').value = m.id;
    row.getCell('B').value = m.name;
    row.getCell('C').value = m.date;
    row.getCell('D').value = m.deliverables;
    row.getCell('E').value = m.criteria;
    row.getCell('F').value = m.status;
    row.getCell('G').value = m.impact;

    ['A', 'B', 'C', 'D', 'E', 'F', 'G'].forEach(col => {
      const cell = row.getCell(col);
      cell.border = thinBorder;
      cell.font = { name: 'Segoe UI', size: 9.5, color: { argb: '1E293B' } };
      cell.alignment = {
        vertical: 'top',
        horizontal: ['A', 'C', 'F'].includes(col) ? 'center' : 'left',
        wrapText: true
      };

      if (mRowIdx % 2 === 0) {
        cell.fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: LIGHT_BG } };
      }
    });

    row.getCell('A').font = { name: 'Segoe UI', size: 10, bold: true, color: { argb: WARNING_GOLD } };
    row.getCell('A').fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: WARNING_LIGHT } };

    const statusCell = row.getCell('F');
    if (m.status === 'Completado') {
      statusCell.fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: SUCCESS_LIGHT } };
      statusCell.font = { name: 'Segoe UI', size: 9.5, bold: true, color: { argb: '166534' } };
    } else {
      statusCell.fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: PROGRESS_LIGHT } };
      statusCell.font = { name: 'Segoe UI', size: 9.5, bold: true, color: { argb: '0369A1' } };
    }

    mRowIdx++;
  });


  /* ==========================================================================
     HOJA 3: REGISTRO DE CAMBIOS E ITERACIONES (Changelog Detallado)
     ========================================================================== */
  const wsChanges = workbook.addWorksheet('Control de Cambios', {
    views: [{ showGridLines: true }]
  });

  wsChanges.mergeCells('A1:H1');
  const cTitle = wsChanges.getCell('A1');
  cTitle.value = 'PREVYSEG 2026 — REGISTRO HISTÓRICO DE CAMBIOS, ITERACIONES Y REFACTORIZACIONES';
  cTitle.font = { name: 'Segoe UI', size: 15, bold: true, color: { argb: 'FFFFFF' } };
  cTitle.alignment = { vertical: 'middle', horizontal: 'center' };
  cTitle.fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: NAVY_HEADER } };
  wsChanges.getRow(1).height = 32;

  const cHeaders = [
    { col: 'A', title: 'Iteración / Versión', width: 14 },
    { col: 'B', title: 'Fecha', width: 12 },
    { col: 'C', title: 'Componente / Archivo', width: 28 },
    { col: 'D', title: 'Tipo de Cambio', width: 18 },
    { col: 'E', title: 'Descripción Detallada del Cambio', width: 44 },
    { col: 'F', title: 'Motivo / Necesidad', width: 34 },
    { col: 'G', title: 'Impacto en el Sistema', width: 30 },
    { col: 'H', title: 'Estado', width: 14 }
  ];

  wsChanges.getRow(3).height = 24;
  cHeaders.forEach(h => {
    wsChanges.getColumn(h.col).width = h.width;
    const cell = wsChanges.getCell(`${h.col}3`);
    cell.value = h.title;
    cell.font = { name: 'Segoe UI', size: 10, bold: true, color: { argb: 'FFFFFF' } };
    cell.alignment = { vertical: 'middle', horizontal: 'center', wrapText: true };
    cell.fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: DARK_SLATE } };
    cell.border = headerBorder;
  });

  const changesData = [
    {
      ver: 'v1.0.0',
      date: '03/09/2026',
      file: 'Landing Page Completa (Components/*)',
      type: 'Nueva Funcionalidad',
      desc: 'Replicación y diseño moderno de la plataforma PrevySeg con Hero, Cursos OS10, Métricas, Quiénes Somos y Modales.',
      reason: 'Lanzamiento de presencia digital oficial y presentación de cursos de seguridad.',
      impact: 'Base estructural del sitio y captación de clientes.',
      status: 'Implementado'
    },
    {
      ver: 'v1.1.0',
      date: '08/09/2026',
      file: 'src/lms/LMSLayout.jsx, views/*',
      type: 'Nueva Funcionalidad',
      desc: 'Implementación completa del Campus Virtual LMS con navegación modular, visor de clases y gestión de participantes.',
      reason: 'Requerimiento de dictar cursos y evaluar alumnos online.',
      impact: 'Incorporación de plataforma e-learning operativa.',
      status: 'Implementado'
    },
    {
      ver: 'v1.2.0',
      date: '12/09/2026',
      file: 'src/lms/views/PersonalAreaView.jsx, MyCoursesView.jsx',
      type: 'Mejora UI / UX',
      desc: 'Creación de vistas de Área Personal y Mis Cursos con tarjetas de avance porcentual y acceso rápido a certificados.',
      reason: 'Facilitar la experiencia del estudiante y seguimiento de cursos.',
      impact: 'Mayor retención y usabilidad para alumnos inscritos.',
      status: 'Implementado'
    },
    {
      ver: 'v1.3.0',
      date: '18/09/2026',
      file: 'src/lms/views/SiteAdminView.jsx',
      type: 'Funcionalidad Core',
      desc: 'Implementación del panel de Administración del Sitio con 15 categorías desplegables (Usuarios, Cursos, Extensiones, etc.).',
      reason: 'Centralizar toda la configuración de la academia en una interfaz única.',
      impact: 'Autonomía administrativa completa para el operador.',
      status: 'Implementado'
    },
    {
      ver: 'v1.4.0',
      date: '22/09/2026',
      file: 'src/lms/LMSLayout.jsx, views/ExtraCoursesView.jsx, JobBoardView.jsx',
      type: 'Iteración / RBAC',
      desc: 'Implementación de control de acceso RBAC (ADMIN vs STUDENT), catálogo de Capacitaciones Extras y Bolsa de Empleo en Seguridad.',
      reason: 'Separación estricta de privilegios de estudiante y expansión de servicios laborales y formativos.',
      impact: 'Seguridad en vistas sensibles y nuevos flujos de valor para egresados.',
      status: 'Implementado'
    },
    {
      ver: 'v1.5.0',
      date: '28/09/2026',
      file: 'src/components/ContactFooter.jsx',
      type: 'Iteración / Integración',
      desc: 'Integración directa del formulario de contacto hacia WhatsApp API (+56 9 7869 1869) con mensaje pre-formateado.',
      reason: 'Agilizar la conversión comercial sin depender de servidores de correo intermedios.',
      impact: 'Atención inmediata de prospectos en el canal móvil oficial.',
      status: 'Implementado'
    },
    {
      ver: 'v1.6.0',
      date: '30/09/2026',
      file: 'src/lms/views/ExtraCoursesView.jsx, LMSLayout.jsx',
      type: 'Preparación Backend',
      desc: 'Estandarización de endpoints y comentarios /////AGREGAR BASE DE DATOS/DOMINIO AQUI/// para conexión con backend API.',
      reason: 'Dejar el código preparado para una transición fluida hacia bases de datos de producción.',
      impact: 'Facilidad de integración para desarrolladores backend.',
      status: 'Implementado'
    },
    {
      ver: 'v1.7.0',
      date: '02/09/2026',
      file: 'src/context/ThemeContext.jsx, components/ThemeToggle.jsx, NetworkBackground.jsx',
      type: 'Iteración / UI/UX',
      desc: 'Implementación de selector de temas: Modo Oscuro Original intacto (#18191c) y nuevo Modo Claro con fondo blanco puro (#ffffff) y alto contraste tipográfico.',
      reason: 'Permitir al usuario alternar a un fondo blanco puro sin alterar la identidad ni los colores originales del modo oscuro.',
      impact: 'Máxima versatilidad visual y legibilidad en entornos diurnos y nocturnos.',
      status: 'Implementado'
    },
    {
      ver: 'v1.8.0',
      date: '02/09/2026',
      file: 'src/components/Services.jsx, Modals.jsx, lms/views/CoursesView.jsx',
      type: 'Catálogo & Pricing',
      desc: 'Actualización total del catálogo de cursos con los 11 programas oficiales de la plataforma Moodle/SENCE, portadas visuales idénticas, títulos oficiales sin descripción y visualización de precios en la parte inferior.',
      reason: 'Alinear la oferta académica pública y del campus virtual con los cursos reales autorizados por SENCE y OS-10.',
      impact: 'Información transparente de costos, códigos SENCE y matrículas directas para personas y empresas.',
      status: 'Implementado'
    },
    {
      ver: 'v1.9.0',
      date: '02/09/2026',
      file: 'src/lms/views/CourseClassroomView.jsx, lms/LMSLayout.jsx',
      type: 'Aula Virtual & LMS',
      desc: 'Implementación del Aula Virtual interactiva con reproductor de clases, temarios modulares y simulador de examen teórico OS-10.',
      reason: 'Enriquecer la experiencia de estudio interactivo para el alumno.',
      impact: 'Mayor retención y preparación efectiva para el examen OS-10.',
      status: 'Implementado'
    },
    {
      ver: 'v1.9.1',
      date: '02/09/2026',
      file: 'src/components/SenceTramosSection.jsx, lms/views/CertificateApprovalView.jsx, PersonalAreaView.jsx',
      type: 'Workflow & Certificación',
      desc: 'Integración en portada de Tramos de Franquicia SENCE (100%, 50%, 15% y Pago Directo por UTM). Creación del panel de Visto Bueno Administrativo para emisión de diplomas oficiales y entrega de copia digital al estudiante sin notas confidenciales.',
      reason: 'Ajustar la visibilidad de beneficios SENCE en portada y asegurar el control administrativo de diplomas con estricta confidencialidad de notas.',
      impact: 'Flujo administrativo formal, confidencialidad resguardada y visualización clara de tramos tributarios en la web.',
      status: 'Implementado'
    },
    {
      ver: 'v1.9.2',
      date: '02/09/2026',
      file: 'src/lms/views/CertificateApprovalView.jsx',
      type: 'Notificación & Email Dispatch',
      desc: 'Integración del despacho automático de correo electrónico al otorgar el visto bueno administrativo del diploma con estructura ///CORREO REMITENTE/// y ///CORREO DE RECEPCION/// para enlace automático a base de datos.',
      reason: 'Asegurar que el estudiante reciba de inmediato su copia oficial digital en su casilla de correo personal.',
      impact: 'Entrega omnicanal de certificados (plataforma + email) y trazabilidad completa para la administración.',
      status: 'Implementado'
    },
    {
      ver: 'v2.0.0 (Futuro)',
      date: '05/10/2026',
      file: 'Backend API / Base de Datos / Webpay',
      type: 'Próxima Iteración Mayor',
      desc: 'Conexión a base de datos PostgreSQL en producción, pasarela de pagos Webpay Plus en cuotas y webhook de matriculación automática.',
      reason: 'Automatización total de pagos en línea y alta disponibilidad.',
      impact: 'Ecosistema 100% autosuficiente y transaccional.',
      status: 'En Planificación'
    }
  ];

  let cRowIdx = 4;
  changesData.forEach(c => {
    const row = wsChanges.getRow(cRowIdx);
    row.getCell('A').value = c.ver;
    row.getCell('B').value = c.date;
    row.getCell('C').value = c.file;
    row.getCell('D').value = c.type;
    row.getCell('E').value = c.desc;
    row.getCell('F').value = c.reason;
    row.getCell('G').value = c.impact;
    row.getCell('H').value = c.status;

    ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H'].forEach(col => {
      const cell = row.getCell(col);
      cell.border = thinBorder;
      cell.font = { name: 'Segoe UI', size: 9.5, color: { argb: '1E293B' } };
      cell.alignment = {
        vertical: 'top',
        horizontal: ['A', 'B', 'D', 'H'].includes(col) ? 'center' : 'left',
        wrapText: true
      };

      if (cRowIdx % 2 === 0) {
        cell.fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: LIGHT_BG } };
      }
    });

    row.getCell('A').font = { name: 'Segoe UI', size: 9.5, bold: true, color: { argb: ACCENT_BLUE } };

    const statusCell = row.getCell('H');
    if (c.status === 'Implementado') {
      statusCell.fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: SUCCESS_LIGHT } };
      statusCell.font = { name: 'Segoe UI', size: 9.5, bold: true, color: { argb: '166534' } };
    } else {
      statusCell.fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: WARNING_LIGHT } };
      statusCell.font = { name: 'Segoe UI', size: 9.5, bold: true, color: { argb: 'B45309' } };
    }

    cRowIdx++;
  });


  /* ==========================================================================
     HOJA 4: GUÍA DE USO Y PERSONALIZACIÓN (Instructions)
     ========================================================================== */
  const wsGuide = workbook.addWorksheet('Guía de Uso y Edición', {
    views: [{ showGridLines: true }]
  });

  wsGuide.mergeCells('A1:F1');
  const gTitle = wsGuide.getCell('A1');
  gTitle.value = 'GUÍA RÁPIDA: CÓMO MODIFICAR Y AGREGAR NUEVAS TAREAS A ESTA CARTA GANTT';
  gTitle.font = { name: 'Segoe UI', size: 15, bold: true, color: { argb: 'FFFFFF' } };
  gTitle.alignment = { vertical: 'middle', horizontal: 'center' };
  gTitle.fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: NAVY_HEADER } };
  wsGuide.getRow(1).height = 32;

  wsGuide.getColumn('A').width = 8;
  wsGuide.getColumn('B').width = 24;
  wsGuide.getColumn('C').width = 50;
  wsGuide.getColumn('D').width = 36;
  wsGuide.getColumn('E').width = 20;
  wsGuide.getColumn('F').width = 18;

  const instructions = [
    {
      paso: '1',
      tema: 'Agregar Nuevas Tareas',
      detalle: 'En la hoja "Carta Gantt", desplácese a la FASE 5 (filas 38 en adelante). Se han dejado 5 filas pre-configuradas listas para escribir su nueva tarea, responsable, fechas de inicio y fin.',
      tip: 'La columna "Días" calcula automáticamente la duración: =Fin - Inicio + 1.',
      ejemplo: 'Tarea: Integración Supabase Auth'
    },
    {
      paso: '2',
      tema: 'Pintar las Barras Gantt',
      detalle: 'Para marcar los días activos de su nueva tarea, seleccione las celdas de los días correspondientes (columnas L a AK) y aplique el color de relleno según su estado:\n• Verde (#86EFAC): Tarea Completada\n• Celeste (#7DD3FC): En Progreso\n• Gris (#CBD5E1): Planificada\n• Amarillo (#F59E0B) + "⭐": Hito Clave',
      tip: 'Puede usar "Copiar Formato" de Excel para pintar rápidamente varias celdas.',
      ejemplo: 'Relleno celeste para D31 a D34'
    },
    {
      paso: '3',
      tema: 'Actualizar Porcentajes',
      detalle: 'Cambie el valor en la columna "% Avance" (Columna I). Los indicadores KPI del encabezado calcularán automáticamente el promedio global del proyecto.',
      tip: 'Escriba números directos (ej: 0.5 para 50%, 1.0 para 100%).',
      ejemplo: '0.75 -> 75%'
    },
    {
      paso: '4',
      tema: 'Extender más allá del Mes 1',
      detalle: 'Las columnas AP a AK (Días 31 a 35) corresponden a la semana de extensión. Si necesita agregar más días, inserte nuevas columnas a la derecha y copie el formato del encabezado.',
      tip: 'Los paneles inmovilizados le permitirán desplazarse horizontalmente sin perder de vista los nombres de las tareas.',
      ejemplo: 'Insertar columna AL para Día 36'
    },
    {
      paso: '5',
      tema: 'Registrar Nuevas Iteraciones',
      detalle: 'Cuando agregue cambios importantes de código, regístrelos en la hoja "Control de Cambios" para mantener una trazabilidad profesional con su cliente o equipo.',
      tip: 'Mantenga al día la columna "Impacto en el Sistema".',
      ejemplo: 'v1.8.0 - Pasarela de pago Transbank'
    }
  ];

  wsGuide.getRow(3).height = 24;
  ['A', 'B', 'C', 'D', 'E'].forEach((col, idx) => {
    const headerTitles = ['Paso #', 'Acción / Tema', 'Instrucción Detallada', 'Consejo / Fórmula', 'Ejemplo'];
    const cell = wsGuide.getCell(`${col}3`);
    cell.value = headerTitles[idx];
    cell.font = { name: 'Segoe UI', size: 10, bold: true, color: { argb: 'FFFFFF' } };
    cell.alignment = { vertical: 'middle', horizontal: 'center' };
    cell.fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: DARK_SLATE } };
    cell.border = headerBorder;
  });

  let gRowIdx = 4;
  instructions.forEach(ins => {
    const row = wsGuide.getRow(gRowIdx);
    row.getCell('A').value = ins.paso;
    row.getCell('B').value = ins.tema;
    row.getCell('C').value = ins.detalle;
    row.getCell('D').value = ins.tip;
    row.getCell('E').value = ins.ejemplo;

    ['A', 'B', 'C', 'D', 'E'].forEach(col => {
      const cell = row.getCell(col);
      cell.border = thinBorder;
      cell.font = { name: 'Segoe UI', size: 9.5, color: { argb: '1E293B' } };
      cell.alignment = {
        vertical: 'top',
        horizontal: col === 'A' ? 'center' : 'left',
        wrapText: true
      };
      if (gRowIdx % 2 === 0) {
        cell.fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: LIGHT_BG } };
      }
    });

    row.getCell('A').font = { name: 'Segoe UI', size: 11, bold: true, color: { argb: ACCENT_BLUE } };
    row.getCell('B').font = { name: 'Segoe UI', size: 10, bold: true, color: { argb: DARK_SLATE } };

    gRowIdx++;
  });

  // Save Workbook
  const outputPath = path.join(__dirname, '..', 'Carta_Gantt_PrevySeg_2026.xlsx');
  await workbook.xlsx.writeFile(outputPath);
  console.log(`Carta Gantt generada con éxito en: ${outputPath}`);
}

generateGanttChart().catch(err => {
  console.error('Error generando Carta Gantt:', err);
  process.exit(1);
});
