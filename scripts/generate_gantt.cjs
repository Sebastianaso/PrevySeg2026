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
  const SUCCESS_GREEN = '16A34A';
  const SUCCESS_LIGHT = 'DCFCE7';
  const PROGRESS_BLUE = '0284C7';
  const PROGRESS_LIGHT = 'E0F2FE';
  const WARNING_GOLD = 'D97706';
  const WARNING_LIGHT = 'FEF3C7';
  const BORDER_COLOR = 'CBD5E1';
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
     HOJA 1: CARTA GANTT (Cronograma Maestro de 30 Días - 4 Semanas)
     ========================================================================== */
  const wsGantt = workbook.addWorksheet('Carta Gantt', {
    views: [{ state: 'frozen', xSplit: 3, ySplit: 8, showGridLines: true }]
  });

  // Base Date: 1 de Septiembre 2026
  const startDateBase = new Date(2026, 8, 1); // 01/09/2026

  // Helper for column letters
  function getColLetter(colIndex) {
    let temp, letter = '';
    while (colIndex > 0) {
      temp = (colIndex - 1) % 26;
      letter = String.fromCharCode(temp + 65) + letter;
      colIndex = Math.floor((colIndex - temp - 1) / 26);
    }
    return letter;
  }

  // Title Banner
  wsGantt.mergeCells('A1:AN1');
  const titleCell = wsGantt.getCell('A1');
  titleCell.value = 'PREVYSEG 2026 — CRONOGRAMA MAESTRO Y CARTA GANTT OFICIAL (30 DÍAS / 4 SEMANAS)';
  titleCell.font = { name: 'Segoe UI', size: 15, bold: true, color: { argb: 'FFFFFF' } };
  titleCell.alignment = { vertical: 'middle', horizontal: 'center' };
  titleCell.fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: DARK_SLATE } };
  wsGantt.getRow(1).height = 32;

  // Subtitle
  wsGantt.mergeCells('A2:AN2');
  const subCell = wsGantt.getCell('A2');
  subCell.value = 'Cronología Completa de Planificación, Desarrollo Web, Catálogo SENCE, Campus Virtual LMS, Aulas Virtuales y Emisión de Diplomas';
  subCell.font = { name: 'Segoe UI', size: 10.5, italic: true, color: { argb: 'E2E8F0' } };
  subCell.alignment = { vertical: 'middle', horizontal: 'center' };
  subCell.fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: MEDIUM_SLATE } };
  wsGantt.getRow(2).height = 20;

  // KPI Summary Bar (Rows 4-5)
  wsGantt.mergeCells('A4:B4');
  wsGantt.getCell('A4').value = 'MÉTRICAS:';
  wsGantt.getCell('A4').font = { name: 'Segoe UI', size: 10, bold: true, color: { argb: DARK_SLATE } };
  wsGantt.getCell('A4').alignment = { vertical: 'middle', horizontal: 'center' };

  // KPI 1: Total Tareas
  wsGantt.mergeCells('C4:D4');
  wsGantt.getCell('C4').value = 'Total Actividades';
  wsGantt.getCell('C4').font = { name: 'Segoe UI', size: 8.5, color: { argb: '475569' } };
  wsGantt.getCell('C4').alignment = { horizontal: 'center' };
  wsGantt.mergeCells('C5:D5');
  wsGantt.getCell('C5').value = 24;
  wsGantt.getCell('C5').font = { name: 'Segoe UI', size: 13, bold: true, color: { argb: ACCENT_BLUE } };
  wsGantt.getCell('C5').alignment = { horizontal: 'center' };

  // KPI 2: Completadas
  wsGantt.mergeCells('E4:F4');
  wsGantt.getCell('E4').value = 'Tareas Ejecutadas';
  wsGantt.getCell('E4').font = { name: 'Segoe UI', size: 8.5, color: { argb: '475569' } };
  wsGantt.getCell('E4').alignment = { horizontal: 'center' };
  wsGantt.mergeCells('E5:F5');
  wsGantt.getCell('E5').value = 24;
  wsGantt.getCell('E5').font = { name: 'Segoe UI', size: 13, bold: true, color: { argb: SUCCESS_GREEN } };
  wsGantt.getCell('E5').alignment = { horizontal: 'center' };

  // KPI 3: Duración Total
  wsGantt.mergeCells('G4:H4');
  wsGantt.getCell('G4').value = 'Plazo de Ejecución';
  wsGantt.getCell('G4').font = { name: 'Segoe UI', size: 8.5, color: { argb: '475569' } };
  wsGantt.getCell('G4').alignment = { horizontal: 'center' };
  wsGantt.mergeCells('G5:H5');
  wsGantt.getCell('G5').value = '30 Días (4 Semanas)';
  wsGantt.getCell('G5').font = { name: 'Segoe UI', size: 12, bold: true, color: { argb: PROGRESS_BLUE } };
  wsGantt.getCell('G5').alignment = { horizontal: 'center' };

  // KPI 4: Avance Global
  wsGantt.mergeCells('I4:J4');
  wsGantt.getCell('I4').value = 'Avance del Proyecto';
  wsGantt.getCell('I4').font = { name: 'Segoe UI', size: 8.5, color: { argb: '475569' } };
  wsGantt.getCell('I4').alignment = { horizontal: 'center' };
  wsGantt.mergeCells('I5:J5');
  wsGantt.getCell('I5').value = '100.0%';
  wsGantt.getCell('I5').font = { name: 'Segoe UI', size: 13, bold: true, color: { argb: SUCCESS_GREEN } };
  wsGantt.getCell('I5').alignment = { horizontal: 'center' };

  ['C4', 'C5', 'E4', 'E5', 'G4', 'G5', 'I4', 'I5'].forEach(ref => {
    const cell = wsGantt.getCell(ref);
    cell.fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: 'F8FAFC' } };
    cell.border = thinBorder;
  });

  // Headers (Rows 7 & 8)
  wsGantt.getRow(7).height = 22;
  wsGantt.getRow(8).height = 24;

  const metadataHeaders = [
    { col: 'A', title: 'WBS', width: 7 },
    { col: 'B', title: 'Fase / Módulo', width: 20 },
    { col: 'C', title: 'Actividad / Entregable / Hito', width: 44 },
    { col: 'D', title: 'Responsable', width: 16 },
    { col: 'E', title: 'F. Inicio', width: 11 },
    { col: 'F', title: 'F. Fin', width: 11 },
    { col: 'G', title: 'Días', width: 6 },
    { col: 'H', title: '% Avance', width: 10 },
    { col: 'I', title: 'Estado', width: 13 }
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

  // 4 Weeks Groupings (Columns J to AN = 30 Days)
  // Col J is Index 10 -> Day 1 (10), Day 30 is Col 39 (Index 39 = AN)
  const weeks = [
    { name: 'SEMANA 1 (Días 1 al 7)', startCol: 10, endCol: 16, color: '1E3A8A' },
    { name: 'SEMANA 2 (Días 8 al 14)', startCol: 17, endCol: 23, color: '1D4ED8' },
    { name: 'SEMANA 3 (Días 15 al 21)', startCol: 24, endCol: 30, color: '2563EB' },
    { name: 'SEMANA 4 (Días 22 al 30)', startCol: 31, endCol: 39, color: '3B82F6' }
  ];

  weeks.forEach(w => {
    const startL = getColLetter(w.startCol);
    const endL = getColLetter(w.endCol);
    wsGantt.mergeCells(`${startL}7:${endL}7`);
    const cell = wsGantt.getCell(`${startL}7`);
    cell.value = w.name;
    cell.font = { name: 'Segoe UI', size: 9.5, bold: true, color: { argb: 'FFFFFF' } };
    cell.alignment = { vertical: 'middle', horizontal: 'center' };
    cell.fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: w.color } };
    cell.border = headerBorder;
  });

  // Day columns headers (Row 8, Days 1 to 30)
  for (let d = 1; d <= 30; d++) {
    const colIdx = 9 + d; // Day 1 = Col 10 (J)
    const colL = getColLetter(colIdx);
    wsGantt.getColumn(colL).width = 4.0;
    const dayCell = wsGantt.getCell(`${colL}8`);
    dayCell.value = `D${d}`;
    dayCell.font = { name: 'Segoe UI', size: 8, bold: true, color: { argb: '334155' } };
    dayCell.alignment = { vertical: 'middle', horizontal: 'center' };
    dayCell.fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: d % 2 === 0 ? 'F1F5F9' : 'E2E8F0' } };
    dayCell.border = thinBorder;
  }

  // 30-Day Tasks Dataset (Active and filled across all 4 weeks)
  const tasks30Days = [
    // ================= SEMANA 1 =================
    {
      isPhaseHeader: true,
      title: 'SEMANA 1: ARQUITECTURA, LANDING PAGE, CATÁLOGO SENCE Y CONTACTO (DÍAS 1 - 7)',
      color: '1E3A8A'
    },
    {
      wbs: '1.0',
      phase: 'Hito Semana 1',
      task: '⭐ HITO 1: Arquitectura Base y Portal Web Público Operativo',
      responsible: 'PM / Fullstack',
      startDay: 7,
      endDay: 7,
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
      task: 'Scaffolding con React 19, Vite, TailwindCSS y Canvas Background',
      responsible: 'Dev Frontend',
      startDay: 1,
      endDay: 3,
      progress: 1.0,
      status: 'Completado'
    },
    {
      wbs: '1.3',
      phase: 'Landing Page',
      task: 'Hero Section con propuesta de valor, badges y llamados a la acción',
      responsible: 'Dev Frontend',
      startDay: 2,
      endDay: 4,
      progress: 1.0,
      status: 'Completado'
    },
    {
      wbs: '1.4',
      phase: 'Catálogo Cursos',
      task: 'Catálogo de 6 Cursos Activos con portadas Moodle y aranceles al pie',
      responsible: 'Dev Frontend',
      startDay: 3,
      endDay: 5,
      progress: 1.0,
      status: 'Completado'
    },
    {
      wbs: '1.5',
      phase: 'Contacto Móvil',
      task: 'Integración de Formulario y Cotizaciones directas a WhatsApp (+56978691869)',
      responsible: 'Fullstack Dev',
      startDay: 4,
      endDay: 6,
      progress: 1.0,
      status: 'Completado'
    },
    {
      wbs: '1.6',
      phase: 'Búsqueda & UI',
      task: 'Buscador Global en Tiempo Real y Sección Quiénes Somos / Métricas',
      responsible: 'UX/UI Dev',
      startDay: 5,
      endDay: 7,
      progress: 1.0,
      status: 'Completado'
    },

    // ================= SEMANA 2 =================
    {
      isPhaseHeader: true,
      title: 'SEMANA 2: CAMPUS VIRTUAL LMS, AUTENTICACIÓN Y ÁREA DEL ALUMNO (DÍAS 8 - 14)',
      color: '1D4ED8'
    },
    {
      wbs: '2.0',
      phase: 'Hito Semana 2',
      task: '⭐ HITO 2: Campus Virtual LMS y Espacio del Estudiante Operativo',
      responsible: 'PM / Fullstack',
      startDay: 14,
      endDay: 14,
      progress: 1.0,
      status: 'Completado',
      isMilestone: true
    },
    {
      wbs: '2.1',
      phase: 'Seguridad / Auth',
      task: 'Sistema de Autenticación con RUT y Password (RBAC Student / Admin)',
      responsible: 'Fullstack Dev',
      startDay: 8,
      endDay: 10,
      progress: 1.0,
      status: 'Completado'
    },
    {
      wbs: '2.2',
      phase: 'LMS Layout',
      task: 'Estructura LMSLayout con Topbar, navegación lateral y badges SENCE',
      responsible: 'Dev Frontend',
      startDay: 9,
      endDay: 11,
      progress: 1.0,
      status: 'Completado'
    },
    {
      wbs: '2.3',
      phase: 'Área Personal',
      task: 'Área Personal del Estudiante con Línea de Tiempo y seguimiento de avance',
      responsible: 'Dev Frontend',
      startDay: 10,
      endDay: 12,
      progress: 1.0,
      status: 'Completado'
    },
    {
      wbs: '2.4',
      phase: 'Mis Cursos',
      task: 'Vista Mis Cursos con tarjetas de progreso curricular e inicio de clases',
      responsible: 'Dev Frontend',
      startDay: 11,
      endDay: 13,
      progress: 1.0,
      status: 'Completado'
    },
    {
      wbs: '2.5',
      phase: 'Gestión Inicial',
      task: 'Tabla Dinámica de Participantes y verificación de matrícula SENCE activa',
      responsible: 'Fullstack Dev',
      startDay: 12,
      endDay: 14,
      progress: 1.0,
      status: 'Completado'
    },

    // ================= SEMANA 3 =================
    {
      isPhaseHeader: true,
      title: 'SEMANA 3: AULA VIRTUAL INTERACTIVA, EXAMEN OS-10 Y SERVICIOS ALUMNO (DÍAS 15 - 21)',
      color: '2563EB'
    },
    {
      wbs: '3.0',
      phase: 'Hito Semana 3',
      task: '⭐ HITO 3: Aula Virtual Interactiva y Servicios Académicos Completos',
      responsible: 'PM / Fullstack',
      startDay: 21,
      endDay: 21,
      progress: 1.0,
      status: 'Completado',
      isMilestone: true
    },
    {
      wbs: '3.1',
      phase: 'Aula Virtual',
      task: 'Reproductor de Video de Clases HD con avance porcentual por lección',
      responsible: 'Dev Frontend',
      startDay: 15,
      endDay: 17,
      progress: 1.0,
      status: 'Completado'
    },
    {
      wbs: '3.2',
      phase: 'Temario Acordeón',
      task: 'Estructura modular de 4 módulos con contenidos teóricos y prácticos',
      responsible: 'Dev Frontend',
      startDay: 16,
      endDay: 18,
      progress: 1.0,
      status: 'Completado'
    },
    {
      wbs: '3.3',
      phase: 'Evaluación OS-10',
      task: 'Simulador de Examen Teórico OS-10 con temporizador y retroalimentación',
      responsible: 'Fullstack Dev',
      startDay: 17,
      endDay: 19,
      progress: 1.0,
      status: 'Completado'
    },
    {
      wbs: '3.4',
      phase: 'Fidelización',
      task: 'Catálogo de Capacitaciones Extras con 15% de descuento exclusivo alumno',
      responsible: 'Dev Frontend',
      startDay: 18,
      endDay: 20,
      progress: 1.0,
      status: 'Completado'
    },
    {
      wbs: '3.5',
      phase: 'Intermediación',
      task: 'Portal de Bolsa de Empleo Regional en Arica con postulación directa',
      responsible: 'Dev Frontend',
      startDay: 19,
      endDay: 21,
      progress: 1.0,
      status: 'Completado'
    },

    // ================= SEMANA 4 =================
    {
      isPhaseHeader: true,
      title: 'SEMANA 4: VISTO BUENO ADMIN, DESPACHO CORREO, SENCE Y CIERRE (DÍAS 22 - 30)',
      color: '3B82F6'
    },
    {
      wbs: '4.0',
      phase: 'Hito Final',
      task: '⭐ HITO 4: Emisión de Diplomas Oficiales y Cierre de Producción',
      responsible: 'PM / Arquitecto',
      startDay: 30,
      endDay: 30,
      progress: 1.0,
      status: 'Completado',
      isMilestone: true
    },
    {
      wbs: '4.1',
      phase: 'Visto Bueno Admin',
      task: 'Panel de Verificación y Visto Bueno Administrativo para Emisión de Diplomas',
      responsible: 'Fullstack Dev',
      startDay: 22,
      endDay: 24,
      progress: 1.0,
      status: 'Completado'
    },
    {
      wbs: '4.2',
      phase: 'Despacho Correo',
      task: 'Despacho Automático de Diploma PDF (///CORREO REMITENTE/// -> ///CORREO DE RECEPCION///)',
      responsible: 'Fullstack Dev',
      startDay: 24,
      endDay: 26,
      progress: 1.0,
      status: 'Completado'
    },
    {
      wbs: '4.3',
      phase: 'Confidencialidad',
      task: 'Copia Oficial para el Alumno en PDF acreditando idoneidad (Sin notas numéricas)',
      responsible: 'Dev Frontend',
      startDay: 25,
      endDay: 27,
      progress: 1.0,
      status: 'Completado'
    },
    {
      wbs: '4.4',
      phase: 'Franquicia SENCE',
      task: 'Sección de Tramos de Franquicia SENCE (100%, 50%, 15% y Pago Directo por UTM)',
      responsible: 'Dev Frontend',
      startDay: 26,
      endDay: 28,
      progress: 1.0,
      status: 'Completado'
    },
    {
      wbs: '4.5',
      phase: 'Documentación ERS',
      task: 'Generación del Documento Word Oficial de Requerimientos ERS (17 RF y 12 RNF)',
      responsible: 'PM / QA',
      startDay: 28,
      endDay: 29,
      progress: 1.0,
      status: 'Completado'
    },
    {
      wbs: '4.6',
      phase: 'Despliegue GitHub',
      task: 'Versionamiento con commits en español, control de cambios y entrega final',
      responsible: 'PM / DevOps',
      startDay: 29,
      endDay: 30,
      progress: 1.0,
      status: 'Completado'
    }
  ];

  let currentRow = 9;

  tasks30Days.forEach((item) => {
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

    const dStart = new Date(startDateBase);
    dStart.setDate(startDateBase.getDate() + (item.startDay - 1));
    const dEnd = new Date(startDateBase);
    dEnd.setDate(startDateBase.getDate() + (item.endDay - 1));

    // Metadata Values
    row.getCell('A').value = item.wbs;
    row.getCell('B').value = item.phase;
    row.getCell('C').value = item.task;
    row.getCell('D').value = item.responsible;
    row.getCell('E').value = dStart;
    row.getCell('E').numFmt = 'dd/mm/yyyy';
    row.getCell('F').value = dEnd;
    row.getCell('F').numFmt = 'dd/mm/yyyy';
    row.getCell('G').value = item.endDay - item.startDay + 1;
    row.getCell('H').value = item.progress;
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
        cell.fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: WARNING_LIGHT } };
      } else if (currentRow % 2 === 0) {
        cell.fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: LIGHT_BG } };
      }
    });

    const statusCell = row.getCell('I');
    if (item.status === 'Completado') {
      statusCell.fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: SUCCESS_LIGHT } };
      statusCell.font = { name: 'Segoe UI', size: 8.5, bold: true, color: { argb: '166534' } };
    }

    // Paint Gantt Timeline (Days 1 to 30, Cols J to AN)
    for (let day = 1; day <= 30; day++) {
      const colL = getColLetter(9 + day);
      const cell = row.getCell(colL);
      cell.border = thinBorder;

      if (day >= item.startDay && day <= item.endDay) {
        if (isM) {
          cell.value = '⭐';
          cell.alignment = { vertical: 'middle', horizontal: 'center' };
          cell.fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: MILESTONE_FILL } };
          cell.font = { name: 'Segoe UI', size: 9, bold: true };
        } else {
          // Color coding by week
          let barColor = '86EFAC'; // Week 1 Green
          if (day >= 8 && day <= 14) barColor = '7DD3FC'; // Week 2 Sky Blue
          if (day >= 15 && day <= 21) barColor = '93C5FD'; // Week 3 Blue
          if (day >= 22) barColor = '6EE7B7'; // Week 4 Emerald

          cell.fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: barColor } };
        }
      } else {
        // Weekend / empty shading
        if (day % 7 === 6 || day % 7 === 0) {
          cell.fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: 'F1F5F9' } };
        }
      }
    }

    currentRow++;
  });


  /* ==========================================================================
     HOJA 2: HITOS DEL PROYECTO
     ========================================================================== */
  const wsMilestones = workbook.addWorksheet('Hitos del Proyecto', {
    views: [{ showGridLines: true }]
  });

  wsMilestones.mergeCells('A1:G1');
  const mTitle = wsMilestones.getCell('A1');
  mTitle.value = 'PREVYSEG 2026 — MATRIZ EJECUTIVA DE HITOS Y ENTREGABLES';
  mTitle.font = { name: 'Segoe UI', size: 14, bold: true, color: { argb: 'FFFFFF' } };
  mTitle.alignment = { vertical: 'middle', horizontal: 'center' };
  mTitle.fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: DARK_SLATE } };
  wsMilestones.getRow(1).height = 30;

  const mHeaders = [
    { col: 'A', title: 'Hito ID', width: 10 },
    { col: 'B', title: 'Nombre del Hito', width: 34 },
    { col: 'C', title: 'Fecha Entrega', width: 14 },
    { col: 'D', title: 'Entregables Clave', width: 40 },
    { col: 'E', title: 'Criterio de Aceptación', width: 34 },
    { col: 'F', title: 'Estado', width: 14 },
    { col: 'G', title: 'Impacto', width: 26 }
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
      id: 'M1',
      name: 'Arquitectura Base y Portal Web Público',
      date: '07/09/2026',
      deliverables: 'Landing Page, Hero, Catálogo de 6 Cursos SENCE y WhatsApp Directo',
      criteria: '100% responsivo, navegación fluida y contacto operativo',
      status: 'Completado',
      impact: 'Presencia digital oficial y captación'
    },
    {
      id: 'M2',
      name: 'Campus Virtual LMS y Autenticación RBAC',
      date: '14/09/2026',
      deliverables: 'Autenticación con RUT, Área Personal, Línea de Tiempo y Mis Cursos',
      criteria: 'Validación de roles (Admin vs Alumno) sin fallas de sesión',
      status: 'Completado',
      impact: 'Entorno de aprendizaje operativo'
    },
    {
      id: 'M3',
      name: 'Aula Virtual Interactiva y Examen OS-10',
      date: '21/09/2026',
      deliverables: 'Reproductor de clases HD, temario de 4 módulos, simulador y bolsa de empleo',
      criteria: 'Simulador evaluativo y avance por lección funcional',
      status: 'Completado',
      impact: 'Preparación efectiva para examen OS-10'
    },
    {
      id: 'M4',
      name: 'Visto Bueno Admin y Despacho de Diplomas',
      date: '30/09/2026',
      deliverables: 'Panel de Aprobación, Despacho por correo y Copia PDF Alumno',
      criteria: 'Emisión con visto bueno y resguardo de confidencialidad',
      status: 'Completado',
      impact: 'Certificación oficial y trazabilidad'
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
      cell.font = { name: 'Segoe UI', size: 9, color: { argb: '1E293B' } };
      cell.alignment = {
        vertical: 'top',
        horizontal: ['A', 'C', 'F'].includes(col) ? 'center' : 'left',
        wrapText: true
      };
      if (mRowIdx % 2 === 0) {
        cell.fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: LIGHT_BG } };
      }
    });

    row.getCell('A').font = { name: 'Segoe UI', size: 9.5, bold: true, color: { argb: WARNING_GOLD } };
    row.getCell('A').fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: WARNING_LIGHT } };

    const statusCell = row.getCell('F');
    statusCell.fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: SUCCESS_LIGHT } };
    statusCell.font = { name: 'Segoe UI', size: 9, bold: true, color: { argb: '166534' } };

    mRowIdx++;
  });


  /* ==========================================================================
     HOJA 3: CONTROL DE CAMBIOS
     ========================================================================== */
  const wsChanges = workbook.addWorksheet('Control de Cambios', {
    views: [{ showGridLines: true }]
  });

  wsChanges.mergeCells('A1:H1');
  const cTitle = wsChanges.getCell('A1');
  cTitle.value = 'PREVYSEG 2026 — REGISTRO HISTÓRICO DE CAMBIOS E ITERACIONES';
  cTitle.font = { name: 'Segoe UI', size: 14, bold: true, color: { argb: 'FFFFFF' } };
  cTitle.alignment = { vertical: 'middle', horizontal: 'center' };
  cTitle.fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: NAVY_HEADER } };
  wsChanges.getRow(1).height = 30;

  const cHeaders = [
    { col: 'A', title: 'Versión', width: 12 },
    { col: 'B', title: 'Fecha', width: 12 },
    { col: 'C', title: 'Componente / Archivo', width: 28 },
    { col: 'D', title: 'Tipo de Cambio', width: 18 },
    { col: 'E', title: 'Descripción Detallada', width: 44 },
    { col: 'F', title: 'Motivo / Necesidad', width: 32 },
    { col: 'G', title: 'Impacto', width: 28 },
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
      file: 'Landing Page Completa (Components/*)',
      type: 'Nueva Funcionalidad',
      desc: 'Lanzamiento de la plataforma con Hero, Catálogo de Cursos, Métricas y Modales.',
      reason: 'Presencia digital oficial y presentación de cursos de seguridad.',
      impact: 'Base estructural del sitio.',
      status: 'Implementado'
    },
    {
      ver: 'v1.1.0',
      date: '08/09/2026',
      file: 'src/lms/LMSLayout.jsx, views/*',
      type: 'Campus LMS',
      desc: 'Implementación del Campus Virtual LMS con navegación modular y gestión de participantes.',
      reason: 'Dictar cursos y evaluar alumnos online.',
      impact: 'Plataforma e-learning operativa.',
      status: 'Implementado'
    },
    {
      ver: 'v1.2.0',
      date: '12/09/2026',
      file: 'src/lms/views/PersonalAreaView.jsx',
      type: 'Mejora UI / UX',
      desc: 'Área Personal y Mis Cursos con avance porcentual.',
      reason: 'Facilitar seguimiento del alumno.',
      impact: 'Mayor usabilidad para estudiantes.',
      status: 'Implementado'
    },
    {
      ver: 'v1.3.0',
      date: '18/09/2026',
      file: 'src/lms/views/SiteAdminView.jsx',
      type: 'Administración',
      desc: 'Panel de Administración del Sitio con 15 categorías desplegables.',
      reason: 'Centralizar configuración de la academia.',
      impact: 'Autonomía administrativa completa.',
      status: 'Implementado'
    },
    {
      ver: 'v1.4.0',
      date: '22/09/2026',
      file: 'src/lms/views/JobBoardView.jsx',
      type: 'Servicios Alumno',
      desc: 'Bolsa de Empleo Regional y Capacitaciones Extras con descuento.',
      reason: 'Expansión de servicios laborales para egresados.',
      impact: 'Alta empleabilidad en Arica.',
      status: 'Implementado'
    },
    {
      ver: 'v1.5.0',
      date: '28/09/2026',
      file: 'src/components/ContactFooter.jsx',
      type: 'Integración',
      desc: 'Integración directa a WhatsApp (+56 9 7869 1869) con mensaje pre-cargado.',
      reason: 'Conversión comercial ágil.',
      impact: 'Atención inmediata por WhatsApp.',
      status: 'Implementado'
    },
    {
      ver: 'v1.9.0',
      date: '02/09/2026',
      file: 'src/lms/views/CourseClassroomView.jsx',
      type: 'Aula Virtual',
      desc: 'Aula Virtual interactiva con reproductor HD, temarios y simulador OS-10.',
      reason: 'Enriquecer el aprendizaje del alumno.',
      impact: 'Preparación integral para examen oficial.',
      status: 'Implementado'
    },
    {
      ver: 'v1.9.1',
      date: '02/09/2026',
      file: 'src/components/SenceTramosSection.jsx',
      type: 'Tramos SENCE & Visto Bueno',
      desc: 'Tramos SENCE en inicio y Visto Bueno administrativo de diplomas sin notas.',
      reason: 'Información clara de beneficios tributarios y confidencialidad.',
      impact: 'Flujo formal de emisión.',
      status: 'Implementado'
    },
    {
      ver: 'v1.9.2',
      date: '02/09/2026',
      file: 'src/lms/views/CertificateApprovalView.jsx',
      type: 'Email Dispatch',
      desc: 'Despacho automático de diploma por correo electrónico (///CORREO REMITENTE/// a ///CORREO DE RECEPCION///).',
      reason: 'Entrega digital inmediata al alumno.',
      impact: 'Trazabilidad y entrega omnicanal.',
      status: 'Implementado'
    },
    {
      ver: 'v1.9.3',
      date: '02/09/2026',
      file: 'Requerimientos_Funcionales_y_No_Funcionales_PrevySeg.docx',
      type: 'Documentación ERS',
      desc: 'Documento Word oficial de Requerimientos ERS (17 RF y 12 RNF) con portada PrevySeg.',
      reason: 'Especificación formal del sistema.',
      impact: 'Documento de ingeniería completo.',
      status: 'Implementado'
    },
    {
      ver: 'v1.9.4',
      date: '02/09/2026',
      file: 'src/components/Services.jsx, Modals.jsx',
      type: 'Catálogo',
      desc: 'Depuración y sincronización del catálogo a los 6 cursos activos autorizados.',
      reason: 'Alinear la plataforma con la oferta vigente.',
      impact: 'Catálogo conciso y consistente.',
      status: 'Implementado'
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
      cell.font = { name: 'Segoe UI', size: 9, color: { argb: '1E293B' } };
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
    row.getCell('A').fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: 'EFF6FF' } };

    const statusCell = row.getCell('H');
    statusCell.fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: SUCCESS_LIGHT } };
    statusCell.font = { name: 'Segoe UI', size: 9, bold: true, color: { argb: '166534' } };

    cRowIdx++;
  });

  const outputPath = path.join(__dirname, '..', 'Carta_Gantt_PrevySeg_2026.xlsx');
  await workbook.xlsx.writeFile(outputPath);
  console.log('Carta Gantt generada con éxito en:', outputPath);
}

generateGanttChart().catch(console.error);
