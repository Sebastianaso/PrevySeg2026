const ExcelJS = require('exceljs');
const path = require('path');
const fs = require('fs');

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
  const SUCCESS_GREEN = '16A34A';
  const SUCCESS_LIGHT = 'DCFCE7';
  const PROGRESS_BLUE = '0284C7';
  const PROGRESS_LIGHT = 'E0F2FE';
  const WARNING_GOLD = 'D97706';
  const WARNING_LIGHT = 'FEF3C7';
  const BORDER_COLOR = 'CBD5E1';
  const MILESTONE_FILL = 'F59E0B';
  const SUNDAY_FILL = 'F1F5F9'; // Gris suave para domingos de descanso

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

  /* ==========================================================================
     CALENDARIO DE SEPTIEMBRE 2026 (DÍAS 1 AL 30)
     01/09/2026 es Martes.
     Domingos en Septiembre 2026: D6 (06/09), D13 (13/09), D20 (20/09), D27 (27/09)
     ========================================================================== */
  const startDateBase = new Date(2026, 8, 1); // 01 de Septiembre de 2026
  const dayLetters = ['M', 'X', 'J', 'V', 'S', 'D', 'L', 'M', 'X', 'J', 'V', 'S', 'D', 'L', 'M', 'X', 'J', 'V', 'S', 'D', 'L', 'M', 'X', 'J', 'V', 'S', 'D', 'L', 'M', 'X'];
  const sundays = [6, 13, 20, 27];

  function getDateForDay(dayNum) {
    const d = new Date(startDateBase);
    d.setDate(startDateBase.getDate() + (dayNum - 1));
    return d;
  }

  /* ==========================================================================
     HOJA 1: CARTA GANTT OFICIAL (4 VERSIONAMIENTOS PRINCIPALES DE GITHUB)
     ========================================================================== */
  const wsGantt = workbook.addWorksheet('Carta Gantt', {
    views: [{ state: 'frozen', xSplit: 3, ySplit: 8, showGridLines: true }]
  });

  // Título
  wsGantt.mergeCells('A1:AN1');
  const titleCell = wsGantt.getCell('A1');
  titleCell.value = 'PREVYSEG 2026 — CRONOGRAMA MAESTRO Y CARTA GANTT OFICIAL (HASTA FIN DE MES / 4 VERSIONES GITHUB)';
  titleCell.font = { name: 'Segoe UI', size: 14.5, bold: true, color: { argb: 'FFFFFF' } };
  titleCell.alignment = { vertical: 'middle', horizontal: 'center' };
  titleCell.fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: DARK_SLATE } };
  wsGantt.getRow(1).height = 32;

  // Subtítulo
  wsGantt.mergeCells('A2:AN2');
  const subCell = wsGantt.getCell('A2');
  subCell.value = 'Estructura Basada en los 4 Grandes Versionamientos de GitHub | Calendario Septiembre 2026 (D1 a D30) | Domingos Vacíos (Descanso)';
  subCell.font = { name: 'Segoe UI', size: 10, italic: true, color: { argb: 'E2E8F0' } };
  subCell.alignment = { vertical: 'middle', horizontal: 'center' };
  subCell.fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: MEDIUM_SLATE } };
  wsGantt.getRow(2).height = 20;

  // KPIs
  wsGantt.mergeCells('A4:B4');
  wsGantt.getCell('A4').value = 'MÉTRICAS:';
  wsGantt.getCell('A4').font = { name: 'Segoe UI', size: 10, bold: true, color: { argb: DARK_SLATE } };
  wsGantt.getCell('A4').alignment = { vertical: 'middle', horizontal: 'center' };

  wsGantt.mergeCells('C4:D4');
  wsGantt.getCell('C4').value = 'Releases GitHub';
  wsGantt.getCell('C4').font = { name: 'Segoe UI', size: 8.5, color: { argb: '475569' } };
  wsGantt.getCell('C4').alignment = { horizontal: 'center' };
  wsGantt.mergeCells('C5:D5');
  wsGantt.getCell('C5').value = '4 Versiones (v1.0 a v4.0)';
  wsGantt.getCell('C5').font = { name: 'Segoe UI', size: 12, bold: true, color: { argb: ACCENT_BLUE } };
  wsGantt.getCell('C5').alignment = { horizontal: 'center' };

  wsGantt.mergeCells('E4:F4');
  wsGantt.getCell('E4').value = 'Versión 1.0 (Sem 1)';
  wsGantt.getCell('E4').font = { name: 'Segoe UI', size: 8.5, color: { argb: '475569' } };
  wsGantt.getCell('E4').alignment = { horizontal: 'center' };
  wsGantt.mergeCells('E5:F5');
  wsGantt.getCell('E5').value = '100% Completado';
  wsGantt.getCell('E5').font = { name: 'Segoe UI', size: 12, bold: true, color: { argb: SUCCESS_GREEN } };
  wsGantt.getCell('E5').alignment = { horizontal: 'center' };

  wsGantt.mergeCells('G4:H4');
  wsGantt.getCell('G4').value = 'Versiones 2.0 a 4.0';
  wsGantt.getCell('G4').font = { name: 'Segoe UI', size: 8.5, color: { argb: '475569' } };
  wsGantt.getCell('G4').alignment = { horizontal: 'center' };
  wsGantt.mergeCells('G5:H5');
  wsGantt.getCell('G5').value = 'En Progreso (En Curso)';
  wsGantt.getCell('G5').font = { name: 'Segoe UI', size: 12, bold: true, color: { argb: WARNING_GOLD } };
  wsGantt.getCell('G5').alignment = { horizontal: 'center' };

  wsGantt.mergeCells('I4:J4');
  wsGantt.getCell('I4').value = 'Plazo Total';
  wsGantt.getCell('I4').font = { name: 'Segoe UI', size: 8.5, color: { argb: '475569' } };
  wsGantt.getCell('I4').alignment = { horizontal: 'center' };
  wsGantt.mergeCells('I5:J5');
  wsGantt.getCell('I5').value = '30 Días (01/09 al 30/09)';
  wsGantt.getCell('I5').font = { name: 'Segoe UI', size: 12, bold: true, color: { argb: PROGRESS_BLUE } };
  wsGantt.getCell('I5').alignment = { horizontal: 'center' };

  ['C4', 'C5', 'E4', 'E5', 'G4', 'G5', 'I4', 'I5'].forEach(ref => {
    const cell = wsGantt.getCell(ref);
    cell.fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: 'F8FAFC' } };
    cell.border = thinBorder;
  });

  // Encabezados de Columnas (Filas 7 y 8)
  wsGantt.getRow(7).height = 22;
  wsGantt.getRow(8).height = 24;

  const metadataHeaders = [
    { col: 'A', title: 'WBS', width: 8 },
    { col: 'B', title: 'Versión / Módulo', width: 22 },
    { col: 'C', title: 'Actividad / Entregable / Hito', width: 48 },
    { col: 'D', title: 'Responsable', width: 18 },
    { col: 'E', title: 'F. Inicio', width: 12 },
    { col: 'F', title: 'F. Fin', width: 12 },
    { col: 'G', title: 'Días', width: 9 },
    { col: 'H', title: '% Avance', width: 11 },
    { col: 'I', title: 'Estado', width: 15 }
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

  // 4 Bloques Semanales / Releases (Columnas J a AN = Días 1 al 30)
  const weeks = [
    { name: 'SEMANA 1 (D1-D7) | RELEASE v1.0.0', startCol: 10, endCol: 16, color: '1E3A8A' },
    { name: 'SEMANA 2 (D8-D14) | RELEASE v2.0.0', startCol: 17, endCol: 23, color: '1D4ED8' },
    { name: 'SEMANA 3 (D15-D21) | RELEASE v3.0.0', startCol: 24, endCol: 30, color: '2563EB' },
    { name: 'SEMANA 4 (D22-D30) | RELEASE v4.0.0', startCol: 31, endCol: 39, color: '3B82F6' }
  ];

  weeks.forEach(w => {
    const startL = getColLetter(w.startCol);
    const endL = getColLetter(w.endCol);
    wsGantt.mergeCells(`${startL}7:${endL}7`);
    const cell = wsGantt.getCell(`${startL}7`);
    cell.value = w.name;
    cell.font = { name: 'Segoe UI', size: 9, bold: true, color: { argb: 'FFFFFF' } };
    cell.alignment = { vertical: 'middle', horizontal: 'center' };
    cell.fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: w.color } };
    cell.border = headerBorder;
  });

  // Encabezados de Días 1 al 30 (Fila 8)
  for (let d = 1; d <= 30; d++) {
    const colIdx = 9 + d; // Day 1 = Col 10 (J)
    const colL = getColLetter(colIdx);
    wsGantt.getColumn(colL).width = 4.2;
    const dayCell = wsGantt.getCell(`${colL}8`);
    const dayTag = dayLetters[d - 1];
    dayCell.value = `D${d}\n${dayTag}`;
    dayCell.font = { name: 'Segoe UI', size: 7.5, bold: true, color: { argb: sundays.includes(d) ? 'DC2626' : '334155' } };
    dayCell.alignment = { vertical: 'middle', horizontal: 'center', wrapText: true };
    dayCell.fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: sundays.includes(d) ? 'FEE2E2' : (d <= 5 ? 'DCFCE7' : 'F1F5F9') } };
    dayCell.border = thinBorder;
  }

  /* ==========================================================================
     DATASET DE TAREAS Y LOS 4 GRANDES VERSIONAMIENTOS DE GITHUB
     ========================================================================== */
  const tasksDataset = [
    // =========================================================================
    // VERSIÓN 1.0 (v1.0.0): ARQUITECTURA, PORTAL WEB & CATÁLOGO SENCE
    // Commits clave: b210532, 12cad8f, 3faa278
    // =========================================================================
    {
      isPhaseHeader: true,
      title: '📦 VERSIÓN 1.0.0 — ARQUITECTURA BASE, PORTAL WEB CORPORATIVO & CATÁLOGO SENCE (DÍAS 1 AL 7) — [100% LISTO]',
      color: '1E3A8A'
    },
    {
      wbs: '1.0',
      phase: 'Release v1.0.0',
      task: '⭐ HITO 1: Release v1.0.0 - Portal Web y Catálogo SENCE Operativo (Presentación)',
      responsible: 'PM / Fullstack',
      startDay: 5,
      endDay: 5,
      progress: 1.0,
      status: 'Completado',
      isMilestone: true
    },
    {
      wbs: '1.1',
      phase: 'Planificación',
      task: 'Levantamiento de Requerimientos ERS (SENCE, OS-10, NCh 2728)',
      responsible: 'Analista / PM',
      startDay: 1,
      endDay: 2,
      progress: 1.0,
      status: 'Completado'
    },
    {
      wbs: '1.2',
      phase: 'Setup Inicial',
      task: 'Scaffolding con React 19, Vite, TailwindCSS y Canvas Background Interactivo',
      responsible: 'Dev Frontend',
      startDay: 1,
      endDay: 3,
      progress: 1.0,
      status: 'Completado'
    },
    {
      wbs: '1.3',
      phase: 'Landing Page',
      task: 'Hero Section, Badges de acreditación y Propuesta de Valor',
      responsible: 'Dev Frontend',
      startDay: 2,
      endDay: 4,
      progress: 1.0,
      status: 'Completado'
    },
    {
      wbs: '1.4',
      phase: 'Catálogo SENCE',
      task: 'Catálogo Oficial Depurado de los 6 Cursos Activos Autorizados',
      responsible: 'Dev Frontend',
      startDay: 3,
      endDay: 5,
      progress: 1.0,
      status: 'Completado'
    },
    {
      wbs: '1.5',
      phase: 'Contacto WhatsApp',
      task: 'Integración de Formulario y Cotizaciones directas al WhatsApp +56978691869',
      responsible: 'Fullstack Dev',
      startDay: 4,
      endDay: 5,
      progress: 1.0,
      status: 'Completado'
    },
    {
      wbs: '1.6',
      phase: 'Búsqueda & UI',
      task: 'Buscador Global en Tiempo Real y Sección Quiénes Somos / Métricas',
      responsible: 'UX/UI Dev',
      startDay: 4,
      endDay: 5,
      progress: 1.0,
      status: 'Completado'
    },

    // =========================================================================
    // VERSIÓN 2.0 (v2.0.0): CAMPUS VIRTUAL LMS & CONTROL DE ACCESO RBAC
    // Commits clave: 2ecd706, 6834869, 3feaebd, de8bbd7
    // =========================================================================
    {
      isPhaseHeader: true,
      title: '📦 VERSIÓN 2.0.0 — CAMPUS VIRTUAL LMS MOODLE-LIKE & MATRIZ DE ROLES RBAC (DÍAS 8 AL 14) — [EN PROGRESO]',
      color: '1D4ED8'
    },
    {
      wbs: '2.0',
      phase: 'Release v2.0.0',
      task: '⭐ HITO 2: Release v2.0.0 - Campus Virtual LMS y Espacio del Estudiante Operativo',
      responsible: 'PM / Fullstack',
      startDay: 12,
      endDay: 12,
      progress: 0.35,
      status: 'En Progreso',
      isMilestone: true
    },
    {
      wbs: '2.1',
      phase: 'Seguridad / Auth',
      task: 'Compuerta de Autenticación con RUT y Roles RBAC (Alumno vs Administrador)',
      responsible: 'Fullstack Dev',
      startDay: 8,
      endDay: 10,
      progress: 0.45,
      status: 'En Progreso'
    },
    {
      wbs: '2.2',
      phase: 'LMS Layout',
      task: 'Estructura LMSLayout con Topbar, navegación lateral y badges SENCE',
      responsible: 'Dev Frontend',
      startDay: 9,
      endDay: 11,
      progress: 0.40,
      status: 'En Progreso'
    },
    {
      wbs: '2.3',
      phase: 'Área Personal',
      task: 'Área Personal del Estudiante con Línea de Tiempo y seguimiento de progreso',
      responsible: 'Dev Frontend',
      startDay: 10,
      endDay: 12,
      progress: 0.30,
      status: 'En Progreso'
    },
    {
      wbs: '2.4',
      phase: 'Mis Cursos',
      task: 'Vista Mis Cursos con tarjetas de avance curricular e inicio de módulos',
      responsible: 'Dev Frontend',
      startDay: 10,
      endDay: 12,
      progress: 0.25,
      status: 'En Progreso'
    },
    {
      wbs: '2.5',
      phase: 'Administración',
      task: 'Panel de Administración del Sitio (15 Categorías) y Tabla Dinámica de Participantes',
      responsible: 'Fullstack Dev',
      startDay: 11,
      endDay: 12,
      progress: 0.20,
      status: 'En Progreso'
    },

    // =========================================================================
    // VERSIÓN 3.0 (v3.0.0): SERVICIOS ALUMNO & PORTAL BOLSA DE EMPLEO
    // Commits clave: de8bbd7, ad81de2, ce9bf07
    // =========================================================================
    {
      isPhaseHeader: true,
      title: '📦 VERSIÓN 3.0.0 — SERVICIOS AL ESTUDIANTE & PORTAL DE BOLSA DE EMPLEO REGIONAL (DÍAS 15 AL 21) — [EN PROGRESO]',
      color: '2563EB'
    },
    {
      wbs: '3.0',
      phase: 'Release v3.0.0',
      task: '⭐ HITO 3: Release v3.0.0 - Portal de Bolsa de Empleo Regional en Arica Operativo',
      responsible: 'PM / Fullstack',
      startDay: 19,
      endDay: 19,
      progress: 0.15,
      status: 'En Progreso',
      isMilestone: true
    },
    {
      wbs: '3.1',
      phase: 'Bolsa de Empleo',
      task: 'Portal de Bolsa de Empleo Regional en Arica con Filtros y Ofertas de Seguridad',
      responsible: 'Dev Frontend',
      startDay: 15,
      endDay: 17,
      progress: 0.20,
      status: 'En Progreso'
    },
    {
      wbs: '3.2',
      phase: 'Intermediación',
      task: 'Módulo de Postulación Directa y Notificación a Empresas de Seguridad',
      responsible: 'Fullstack Dev',
      startDay: 16,
      endDay: 18,
      progress: 0.15,
      status: 'En Progreso'
    },
    {
      wbs: '3.3',
      phase: 'Fidelización',
      task: 'Catálogo de Capacitaciones Extras con 15% de Descuento Exclusivo para Alumnos',
      responsible: 'Dev Frontend',
      startDay: 17,
      endDay: 19,
      progress: 0.10,
      status: 'En Progreso'
    },

    // =========================================================================
    // VERSIÓN 4.0 (v4.0.0): VISTO BUENO ADMIN, DESPACHO CORREO, SENCE & CIERRE ERS
    // Commits clave: 600cceb, 578ce72, 7f3b9ca, f07582d
    // =========================================================================
    {
      isPhaseHeader: true,
      title: '📦 VERSIÓN 4.0.0 — VISTO BUENO ADMIN, DESPACHO DIPLOMAS EMAIL, SENCE & CIERRE ERS (DÍAS 22 AL 30) — [EN PROGRESO]',
      color: '3B82F6'
    },
    {
      wbs: '4.0',
      phase: 'Release v4.0.0',
      task: '⭐ HITO 4: Release v4.0.0 - Emisión Oficial de Diplomas, SENCE y Cierre de Producción',
      responsible: 'PM / Arquitecto',
      startDay: 30,
      endDay: 30,
      progress: 0.05,
      status: 'En Progreso',
      isMilestone: true
    },
    {
      wbs: '4.1',
      phase: 'Visto Bueno Admin',
      task: 'Panel de Aprobación y Visto Bueno Administrativo para Emisión de Diplomas',
      responsible: 'Fullstack Dev',
      startDay: 22,
      endDay: 24,
      progress: 0.15,
      status: 'En Progreso'
    },
    {
      wbs: '4.2',
      phase: 'Despacho Correo',
      task: 'Despacho Automático de Diploma PDF (///CORREO REMITENTE/// -> ///CORREO DE RECEPCION///)',
      responsible: 'Fullstack Dev',
      startDay: 24,
      endDay: 26,
      progress: 0.10,
      status: 'En Progreso'
    },
    {
      wbs: '4.3',
      phase: 'Confidencialidad',
      task: 'Copia Oficial para el Alumno en PDF acreditando idoneidad (Sin notas numéricas)',
      responsible: 'Dev Frontend',
      startDay: 25,
      endDay: 28,
      progress: 0.10,
      status: 'En Progreso'
    },
    {
      wbs: '4.4',
      phase: 'Franquicia SENCE',
      task: 'Sección de Tramos de Franquicia SENCE (100%, 50%, 15% y Pago Directo por UTM)',
      responsible: 'Dev Frontend',
      startDay: 26,
      endDay: 29,
      progress: 0.15,
      status: 'En Progreso'
    },
    {
      wbs: '4.5',
      phase: 'Documentación ERS',
      task: 'Generación del Documento Word Oficial de Requerimientos ERS (17 RF y 12 RNF)',
      responsible: 'PM / QA',
      startDay: 28,
      endDay: 30,
      progress: 0.20,
      status: 'En Progreso'
    },
    {
      wbs: '4.6',
      phase: 'Despliegue GitHub',
      task: 'Versionamiento con commits en español, control de cambios y entrega final',
      responsible: 'PM / DevOps',
      startDay: 29,
      endDay: 30,
      progress: 0.10,
      status: 'En Progreso'
    }
  ];

  let currentRow = 9;

  tasksDataset.forEach((item) => {
    if (item.isPhaseHeader) {
      wsGantt.mergeCells(`A${currentRow}:AN${currentRow}`);
      const phaseCell = wsGantt.getCell(`A${currentRow}`);
      phaseCell.value = item.title;
      phaseCell.font = { name: 'Segoe UI', size: 9.5, bold: true, color: { argb: 'FFFFFF' } };
      phaseCell.alignment = { vertical: 'middle', indent: 1 };
      phaseCell.fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: item.color } };
      wsGantt.getRow(currentRow).height = 22;
      currentRow++;
      return;
    }

    const row = wsGantt.getRow(currentRow);
    row.height = 19;

    const dStart = getDateForDay(item.startDay);
    const dEnd = getDateForDay(item.endDay);

    // Metadata Values
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

      if (isM && item.status === 'Completado') {
        cell.fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: SUCCESS_LIGHT } };
      } else if (isM) {
        cell.fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: WARNING_LIGHT } };
      } else if (currentRow % 2 === 0) {
        cell.fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: LIGHT_BG } };
      }
    });

    const statusCell = row.getCell('I');
    if (item.status === 'Completado') {
      statusCell.fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: SUCCESS_LIGHT } };
      statusCell.font = { name: 'Segoe UI', size: 8.5, bold: true, color: { argb: '166534' } };
    } else {
      statusCell.fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: WARNING_LIGHT } };
      statusCell.font = { name: 'Segoe UI', size: 8.5, bold: true, color: { argb: '92400E' } };
    }

    // Dibujar cronología (Días 1 al 30, Columnas J a AN)
    for (let day = 1; day <= 30; day++) {
      const colL = getColLetter(9 + day);
      const cell = row.getCell(colL);
      cell.border = thinBorder;

      // Si es domingo -> DEJAR VACÍO / DESCANSO
      if (sundays.includes(day)) {
        cell.fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: SUNDAY_FILL } };
        continue;
      }

      if (day >= item.startDay && day <= item.endDay) {
        if (isM) {
          cell.value = '⭐';
          cell.alignment = { vertical: 'middle', horizontal: 'center' };
          cell.fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: item.status === 'Completado' ? SUCCESS_GREEN : MILESTONE_FILL } };
          cell.font = { name: 'Segoe UI', size: 9, bold: true, color: { argb: 'FFFFFF' } };
        } else {
          // Colores de barras: Semana 1 Verde (Listo), Semanas 2-4 Amarillo / Azul (En Progreso)
          let barColor = '86EFAC'; // Semana 1 Verde
          if (item.status === 'En Progreso') {
            if (day >= 8 && day <= 14) barColor = 'FDE68A'; // Semana 2 Amarillo
            else if (day >= 15 && day <= 21) barColor = 'BAE6FD'; // Semana 3 Celeste
            else if (day >= 22) barColor = 'DDD6FE'; // Semana 4 Púrpura suave
          }
          cell.fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: barColor } };
        }
      } else {
        cell.fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: day <= 7 ? 'F0FDF4' : 'F8FAFC' } };
      }
    }

    currentRow++;
  });

  // Fila Resumen Total
  const totalRow = wsGantt.getRow(currentRow);
  totalRow.height = 25;
  wsGantt.mergeCells(`A${currentRow}:F${currentRow}`);
  const totalLabelCell = wsGantt.getCell(`A${currentRow}`);
  totalLabelCell.value = 'PLAZO TOTAL MES DE SEPTIEMBRE (30 DÍAS / DOMINGOS DESCANSO):';
  totalLabelCell.font = { name: 'Segoe UI', size: 9.5, bold: true, color: { argb: 'FFFFFF' } };
  totalLabelCell.alignment = { vertical: 'middle', horizontal: 'right' };
  totalLabelCell.fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: NAVY_HEADER } };
  totalLabelCell.border = headerBorder;

  const totalDaysCell = totalRow.getCell('G');
  totalDaysCell.value = 30;
  totalDaysCell.numFmt = '#,##0';
  totalDaysCell.font = { name: 'Segoe UI', size: 10.5, bold: true, color: { argb: 'FFFFFF' } };
  totalDaysCell.alignment = { vertical: 'middle', horizontal: 'center' };
  totalDaysCell.fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: DARK_SLATE } };
  totalDaysCell.border = headerBorder;

  const totalProgCell = totalRow.getCell('H');
  totalProgCell.value = 0.40;
  totalProgCell.numFmt = '0%';
  totalProgCell.font = { name: 'Segoe UI', size: 10, bold: true, color: { argb: 'FFFFFF' } };
  totalProgCell.alignment = { vertical: 'middle', horizontal: 'center' };
  totalProgCell.fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: ACCENT_BLUE } };
  totalProgCell.border = headerBorder;

  const totalStatusCell = totalRow.getCell('I');
  totalStatusCell.value = 'v1.0 LISTA / EN CURSO';
  totalStatusCell.font = { name: 'Segoe UI', size: 8.5, bold: true, color: { argb: '1E3A8A' } };
  totalStatusCell.alignment = { vertical: 'middle', horizontal: 'center' };
  totalStatusCell.fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: 'DBEAFE' } };
  totalStatusCell.border = headerBorder;

  for (let day = 1; day <= 30; day++) {
    const colL = getColLetter(9 + day);
    const cell = totalRow.getCell(colL);
    cell.border = thinBorder;
    if (sundays.includes(day)) {
      cell.fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: SUNDAY_FILL } };
    } else {
      cell.fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: day <= 7 ? '86EFAC' : 'E2E8F0' } };
    }
  }


  /* ==========================================================================
     HOJA 2: HITOS Y VERSIONAMIENTOS GITHUB (LOS 4 RELEASES PRINCIPALES)
     ========================================================================== */
  const wsMilestones = workbook.addWorksheet('Hitos y Releases GitHub', {
    views: [{ showGridLines: true }]
  });

  wsMilestones.mergeCells('A1:H1');
  const mTitle = wsMilestones.getCell('A1');
  mTitle.value = 'PREVYSEG 2026 — MATRIZ DE LOS 4 GRANDES VERSIONAMIENTOS EN GITHUB';
  mTitle.font = { name: 'Segoe UI', size: 14, bold: true, color: { argb: 'FFFFFF' } };
  mTitle.alignment = { vertical: 'middle', horizontal: 'center' };
  mTitle.fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: DARK_SLATE } };
  wsMilestones.getRow(1).height = 30;

  const mHeaders = [
    { col: 'A', title: 'Versión', width: 12 },
    { col: 'B', title: 'Hito ID', width: 10 },
    { col: 'C', title: 'Nombre del Release / Hito', width: 34 },
    { col: 'D', title: 'Fecha Entrega', width: 14 },
    { col: 'E', title: 'Commits GitHub Relevantes', width: 28 },
    { col: 'F', title: 'Entregables Principales', width: 38 },
    { col: 'G', title: 'Estado', width: 14 },
    { col: 'H', title: 'Impacto en Producción', width: 26 }
  ];

  wsMilestones.getRow(3).height = 24;
  mHeaders.forEach(h => {
    wsMilestones.getColumn(h.col).width = h.width;
    const cell = wsMilestones.getCell(`${h.col}3`);
    cell.value = h.title;
    cell.font = { name: 'Segoe UI', size: 9.5, bold: true, color: { argb: 'FFFFFF' } };
    cell.alignment = { vertical: 'middle', horizontal: 'center', wrapText: true };
    cell.fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: NAVY_HEADER } };
    cell.border = headerBorder;
  });

  const milestonesData = [
    {
      ver: 'v1.0.0',
      id: 'M1',
      name: 'Arquitectura Base y Portal Web SENCE',
      date: '05/09/2026',
      commits: 'b210532, 12cad8f, 3faa278',
      deliverables: 'Landing Page, Hero, Catálogo 6 Cursos SENCE y WhatsApp Directo',
      status: 'Completado',
      impact: 'Presencia digital oficial y captación (Listo para presentación)'
    },
    {
      ver: 'v2.0.0',
      id: 'M2',
      name: 'Campus Virtual LMS y Matriz RBAC',
      date: '12/09/2026',
      commits: '2ecd706, 6834869, 3feaebd, de8bbd7',
      deliverables: 'Autenticación con RUT, Área Personal, Mis Cursos y Admin 15 Categorías',
      status: 'En Progreso',
      impact: 'Plataforma e-learning y gestión de participantes'
    },
    {
      ver: 'v3.0.0',
      id: 'M3',
      name: 'Portal de Bolsa de Empleo Regional',
      date: '19/09/2026',
      commits: 'de8bbd7, ad81de2, ce9bf07',
      deliverables: 'Bolsa de Empleo Arica, Postulación Directa y Catálogo Extras (-15%)',
      status: 'En Progreso',
      impact: 'Alta empleabilidad y vinculación laboral en Arica'
    },
    {
      ver: 'v4.0.0',
      id: 'M4',
      name: 'Visto Bueno Admin, Diplomas & Cierre ERS',
      date: '30/09/2026',
      commits: '600cceb, 578ce72, 7f3b9ca, f07582d',
      deliverables: 'Panel Visto Bueno, Despacho Diplomas PDF Email, Tramos SENCE y Word ERS',
      status: 'En Progreso',
      impact: 'Certificación oficial, trazabilidad y entrega final'
    }
  ];

  let mRowIdx = 4;
  milestonesData.forEach(m => {
    const row = wsMilestones.getRow(mRowIdx);
    row.getCell('A').value = m.ver;
    row.getCell('B').value = m.id;
    row.getCell('C').value = m.name;
    row.getCell('D').value = m.date;
    row.getCell('E').value = m.commits;
    row.getCell('F').value = m.deliverables;
    row.getCell('G').value = m.status;
    row.getCell('H').value = m.impact;

    ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H'].forEach(col => {
      const cell = row.getCell(col);
      cell.border = thinBorder;
      cell.font = { name: 'Segoe UI', size: 9, color: { argb: '1E293B' } };
      cell.alignment = {
        vertical: 'top',
        horizontal: ['A', 'B', 'D', 'E', 'G'].includes(col) ? 'center' : 'left',
        wrapText: true
      };
      if (mRowIdx % 2 === 0) {
        cell.fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: LIGHT_BG } };
      }
    });

    row.getCell('A').font = { name: 'Segoe UI', size: 9.5, bold: true, color: { argb: ACCENT_BLUE } };
    row.getCell('A').fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: 'EFF6FF' } };

    row.getCell('B').font = { name: 'Segoe UI', size: 9.5, bold: true, color: { argb: m.status === 'Completado' ? SUCCESS_GREEN : WARNING_GOLD } };
    row.getCell('B').fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: m.status === 'Completado' ? SUCCESS_LIGHT : WARNING_LIGHT } };

    const statusCell = row.getCell('G');
    if (m.status === 'Completado') {
      statusCell.fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: SUCCESS_LIGHT } };
      statusCell.font = { name: 'Segoe UI', size: 9, bold: true, color: { argb: '166534' } };
    } else {
      statusCell.fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: WARNING_LIGHT } };
      statusCell.font = { name: 'Segoe UI', size: 9, bold: true, color: { argb: '92400E' } };
    }

    mRowIdx++;
  });


  /* ==========================================================================
     HOJA 3: CONTROL DE CAMBIOS E ITERACIONES GITHUB
     ========================================================================== */
  const wsChanges = workbook.addWorksheet('Control de Cambios GitHub', {
    views: [{ showGridLines: true }]
  });

  wsChanges.mergeCells('A1:H1');
  const cTitle = wsChanges.getCell('A1');
  cTitle.value = 'PREVYSEG 2026 — REGISTRO HISTÓRICO DE COMMITS Y VERSIONES GITHUB';
  cTitle.font = { name: 'Segoe UI', size: 14, bold: true, color: { argb: 'FFFFFF' } };
  cTitle.alignment = { vertical: 'middle', horizontal: 'center' };
  cTitle.fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: NAVY_HEADER } };
  wsChanges.getRow(1).height = 30;

  const cHeaders = [
    { col: 'A', title: 'Versión', width: 12 },
    { col: 'B', title: 'Fecha', width: 12 },
    { col: 'C', title: 'Commit Hash', width: 14 },
    { col: 'D', title: 'Componente / Archivo', width: 28 },
    { col: 'E', title: 'Descripción del Cambio', width: 44 },
    { col: 'F', title: 'Motivo / Necesidad', width: 32 },
    { col: 'G', title: 'Impacto', width: 26 },
    { col: 'H', title: 'Estado', width: 14 }
  ];

  wsChanges.getRow(3).height = 24;
  cHeaders.forEach(h => {
    wsChanges.getColumn(h.col).width = h.width;
    const cell = wsChanges.getCell(`${h.col}3`);
    cell.value = h.title;
    cell.font = { name: 'Segoe UI', size: 9.5, bold: true, color: { argb: 'FFFFFF' } };
    cell.alignment = { vertical: 'middle', horizontal: 'center', wrapText: true };
    cell.fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: DARK_SLATE } };
    cell.border = headerBorder;
  });

  const changesData = [
    {
      ver: 'v1.0.0',
      date: '03/09/2026',
      hash: 'b210532',
      file: 'Landing Page Completa (Components/*)',
      desc: 'Lanzamiento de plataforma con Hero, Catálogo de 6 Cursos, Métricas y Modales.',
      reason: 'Presencia digital oficial y presentación de cursos de seguridad.',
      impact: 'Base estructural del sitio.',
      status: 'Implementado'
    },
    {
      ver: 'v1.0.0',
      date: '04/09/2026',
      hash: '12cad8f',
      file: 'src/components/ContactFooter.jsx, Modals.jsx',
      desc: 'Integración directa a WhatsApp (+56 9 7869 1869) con mensaje pre-cargado.',
      reason: 'Conversión comercial ágil de prospectos.',
      impact: 'Atención inmediata por WhatsApp.',
      status: 'Implementado'
    },
    {
      ver: 'v1.0.0',
      date: '05/09/2026',
      hash: '3faa278',
      file: 'src/components/Services.jsx, Modals.jsx',
      desc: 'Depuración y sincronización del catálogo a los 6 cursos activos autorizados.',
      reason: 'Alinear la plataforma con la oferta vigente autorizada.',
      impact: 'Catálogo conciso y consistente.',
      status: 'Implementado'
    },
    {
      ver: 'v2.0.0',
      date: '08/09/2026',
      hash: '2ecd706',
      file: 'src/lms/LMSLayout.jsx, views/*',
      desc: 'Implementación del Campus Virtual LMS con navegación modular y tabla de participantes.',
      reason: 'Dictar cursos y gestionar estudiantes en línea.',
      impact: 'Plataforma e-learning operativa.',
      status: 'En Progreso'
    },
    {
      ver: 'v2.0.0',
      date: '10/09/2026',
      hash: '6834869',
      file: 'src/lms/views/PersonalAreaView.jsx, MyCoursesView.jsx',
      desc: 'Área Personal y Mis Cursos con avance porcentual curricular.',
      reason: 'Facilitar seguimiento académico del alumno.',
      impact: 'Mayor usabilidad para estudiantes.',
      status: 'En Progreso'
    },
    {
      ver: 'v2.0.0',
      date: '11/09/2026',
      hash: '3feaebd',
      file: 'src/lms/views/SiteAdminView.jsx',
      desc: 'Panel de Administración del Sitio con 15 categorías desplegables y seguridad admin.',
      reason: 'Centralizar configuración de la academia.',
      impact: 'Autonomía administrativa completa.',
      status: 'En Progreso'
    },
    {
      ver: 'v3.0.0',
      date: '16/09/2026',
      hash: 'de8bbd7',
      file: 'src/lms/views/JobBoardView.jsx',
      desc: 'Bolsa de Empleo Regional en Arica y Capacitaciones Extras con 15% de descuento.',
      reason: 'Expansión de servicios laborales para egresados OS-10.',
      impact: 'Alta empleabilidad regional.',
      status: 'En Progreso'
    },
    {
      ver: 'v3.0.0',
      date: '18/09/2026',
      hash: 'ce9bf07',
      file: 'src/index.css, Components/*',
      desc: 'Refinamiento visual con Framer Motion, glassmorphism y microinteracciones.',
      reason: 'Asegurar una estética visual moderna y fluida.',
      impact: 'Experiencia de usuario premium.',
      status: 'En Progreso'
    },
    {
      ver: 'v4.0.0',
      date: '23/09/2026',
      hash: '600cceb',
      file: 'src/components/SenceTramosSection.jsx, CertificateApprovalView.jsx',
      desc: 'Tramos SENCE en inicio y Visto Bueno administrativo de diplomas sin notas numéricas.',
      reason: 'Información clara de beneficios tributarios y confidencialidad.',
      impact: 'Flujo formal de emisión.',
      status: 'En Progreso'
    },
    {
      ver: 'v4.0.0',
      date: '25/09/2026',
      hash: '578ce72',
      file: 'src/lms/views/CertificateApprovalView.jsx',
      desc: 'Despacho automático de diploma por correo electrónico (///CORREO REMITENTE/// a ///CORREO DE RECEPCION///).',
      reason: 'Entrega digital inmediata al estudiante.',
      impact: 'Trazabilidad y despacho omnicanal.',
      status: 'En Progreso'
    },
    {
      ver: 'v4.0.0',
      date: '28/09/2026',
      hash: '7f3b9ca',
      file: 'Requerimientos_Funcionales_y_No_Funcionales_PrevySeg.docx',
      desc: 'Documento Word oficial de Requerimientos ERS (17 RF y 12 RNF) con portada PrevySeg.',
      reason: 'Especificación formal de ingeniería del sistema.',
      impact: 'Documento ERS contractual completo.',
      status: 'En Progreso'
    },
    {
      ver: 'v4.0.0',
      date: '30/09/2026',
      hash: 'f07582d',
      file: 'Carta_Gantt_PrevySeg_2026.xlsx, .csv',
      desc: 'Cronograma Maestro consolidado con los 4 Releases de GitHub y cierre de proyecto.',
      reason: 'Control y seguimiento maestro de entregas.',
      impact: 'Cierre formal del proyecto.',
      status: 'En Progreso'
    }
  ];

  let cRowIdx = 4;
  changesData.forEach(c => {
    const row = wsChanges.getRow(cRowIdx);
    row.getCell('A').value = c.ver;
    row.getCell('B').value = c.date;
    row.getCell('C').value = c.hash;
    row.getCell('D').value = c.file;
    row.getCell('E').value = c.desc;
    row.getCell('F').value = c.reason;
    row.getCell('G').value = c.impact;
    row.getCell('H').value = c.status;

    ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H'].forEach(col => {
      const cell = row.getCell(col);
      cell.border = thinBorder;
      cell.font = { name: 'Segoe UI', size: 9, color: { argb: '1E293B' } };
      cell.alignment = {
        vertical: 'top',
        horizontal: ['A', 'B', 'C', 'H'].includes(col) ? 'center' : 'left',
        wrapText: true
      };
      if (cRowIdx % 2 === 0) {
        cell.fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: LIGHT_BG } };
      }
    });

    row.getCell('A').font = { name: 'Segoe UI', size: 9.5, bold: true, color: { argb: ACCENT_BLUE } };
    row.getCell('A').fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: 'EFF6FF' } };

    row.getCell('C').font = { name: 'Consolas', size: 9, color: { argb: '0369A1' } };

    const statusCell = row.getCell('H');
    if (c.status === 'Implementado') {
      statusCell.fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: SUCCESS_LIGHT } };
      statusCell.font = { name: 'Segoe UI', size: 9, bold: true, color: { argb: '166534' } };
    } else {
      statusCell.fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: WARNING_LIGHT } };
      statusCell.font = { name: 'Segoe UI', size: 9, bold: true, color: { argb: '92400E' } };
    }

    cRowIdx++;
  });

  // Guardar archivo Excel
  const outputPath = path.join(__dirname, '..', 'Carta_Gantt_PrevySeg_2026.xlsx');
  await workbook.xlsx.writeFile(outputPath);
  console.log('Carta Gantt generada con éxito en:', outputPath);

  // Exportar también archivo CSV
  let csvContent = 'PREVYSEG 2026 — CRONOGRAMA MAESTRO Y CARTA GANTT OFICIAL (HASTA FIN DE MES / 4 VERSIONES GITHUB)\n';
  csvContent += '"Estructura Basada en los 4 Grandes Versionamientos de GitHub | Calendario Septiembre 2026 (D1 a D30) | Domingos Vacíos"\n\n';
  csvContent += 'MÉTRICAS:,,Releases GitHub,,Versión 1.0 (Sem 1),,Versiones 2.0 a 4.0,,Plazo Total\n';
  csvContent += ',,4 Versiones (v1.0 a v4.0),,100% Completado,,En Progreso (En Curso),,30 Días (01/09 al 30/09)\n\n';
  csvContent += 'WBS,Versión / Módulo,Actividad / Entregable / Hito,Responsable,F. Inicio,F. Fin,Días,% Avance,Estado,SEMANA 1 (D1-D7),,,,,,,SEMANA 2 (D8-D14),,,,,,,SEMANA 3 (D15-D21),,,,,,,SEMANA 4 (D22-D30),,,,,,,,\n';
  csvContent += ',,,,,,,,,D1(M),D2(X),D3(J),D4(V),D5(S),D6(D),D7(L),D8(M),D9(X),D10(J),D11(V),D12(S),D13(D),D14(L),D15(M),D16(X),D17(J),D18(V),D19(S),D20(D),D21(L),D22(M),D23(X),D24(J),D25(V),D26(S),D27(D),D28(L),D29(M),D30(X)\n';

  tasksDataset.forEach(item => {
    if (item.isPhaseHeader) {
      csvContent += `"${item.title}"\n`;
      return;
    }
    const dStart = getDateForDay(item.startDay).toISOString().split('T')[0];
    const dEnd = getDateForDay(item.endDay).toISOString().split('T')[0];
    const dur = item.isMilestone ? 1 : (item.endDay - item.startDay + 1);
    const prog = `${Math.round(item.progress * 100)}%`;
    let rowStr = `${item.wbs},"${item.phase}","${item.task}","${item.responsible}",${dStart},${dEnd},${dur},${prog},${item.status}`;
    for (let d = 1; d <= 30; d++) {
      if (sundays.includes(d)) {
        rowStr += ',[DOMINGO]';
      } else if (d >= item.startDay && d <= item.endDay) {
        rowStr += item.isMilestone ? ',⭐' : ',█';
      } else {
        rowStr += ',';
      }
    }
    csvContent += rowStr + '\n';
  });

  const csvPath1 = path.join(__dirname, '..', 'Carta_Gantt_PrevySeg_2026.csv');
  const csvPath2 = path.join(__dirname, '..', 'Carta_Gantt_PrevySeg_2026(1).csv');
  fs.writeFileSync(csvPath1, csvContent, 'utf-8');
  fs.writeFileSync(csvPath2, csvContent, 'utf-8');
  console.log('Archivos CSV exportados correctamente.');
}

generateGanttChart().catch(console.error);
