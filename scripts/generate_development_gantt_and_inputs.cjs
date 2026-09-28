const ExcelJS = require('exceljs');
const path = require('path');
const fs = require('fs');

async function generateDevelopmentGantt() {
  const workbook = new ExcelJS.Workbook();
  workbook.creator = 'PrevySeg OTEC - Dirección de Ingeniería';
  workbook.lastModifiedBy = 'Sebastian Acuña (Ingeniero a Cargo)';
  workbook.created = new Date(2026, 7, 1);
  workbook.modified = new Date();

  // Paleta de Colores Corporativa
  const DARK_NAVY = '072B4F';      // Azul Marino Institucional
  const SLATE_HEADER = '0F172A';   // Slate Oscuro
  const ACCENT_SKY = '0284C7';     // Azul Tecnológico
  const ACCENT_TEAL = '0D9488';    // Verde Teal / SENCE
  const SUCCESS_GREEN = '16A34A';  // Verde Aprobado
  const WARNING_AMBER = 'D97706';  // Ámbar En Curso / Insumo
  const PURPLE_SPD = '6D28D9';     // Morado SPD
  const LIGHT_BG = 'F8FAFC';       // Fondo claro
  const BORDER_COLOR = 'CBD5E1';   // Bordes suaves
  const SUNDAY_FILL = 'F1F5F9';    // Fines de semana

  const thinBorder = {
    top: { style: 'thin', color: { argb: BORDER_COLOR } },
    left: { style: 'thin', color: { argb: BORDER_COLOR } },
    bottom: { style: 'thin', color: { argb: BORDER_COLOR } },
    right: { style: 'thin', color: { argb: BORDER_COLOR } }
  };

  const headerBorder = {
    top: { style: 'medium', color: { argb: DARK_NAVY } },
    left: { style: 'thin', color: { argb: '334155' } },
    bottom: { style: 'medium', color: { argb: DARK_NAVY } },
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

  // Actividades agrupadas por Etapas de Desarrollo (incluyendo insumos de la empresa y subsanar demandas del cliente)
  const activities = [
    // ETAPA 1
    {
      wbs: '1.0',
      phase: 'ETAPA 1: LEVANTAMIENTO, PLANIFICACIÓN E INSUMOS DEL CLIENTE',
      name: 'Fase de Inicio, Levantamiento Técnico y Definición de Insumos',
      inputs: 'Definición de objetivos institucionales OTEC, organigrama y alcance',
      resp: 'Jefe de Proyecto / OTEC PrevySeg',
      startDay: 1, endDay: 4, days: 4, pct: 100, status: 'COMPLETADO', isHeader: true, color: '1E3A8A'
    },
    {
      wbs: '1.1',
      phase: 'ETAPA 1',
      name: 'Levantamiento de Requisitos del Sistema y Marco Regulatorio SENCE/SPD',
      inputs: 'Manuales de procedimiento interno, acreditación NCh 2728 y normativas SENCE',
      resp: 'Analista de Sistemas / Mandatario OTEC',
      startDay: 1, endDay: 2, days: 2, pct: 100, status: 'COMPLETADO', color: '0284C7'
    },
    {
      wbs: '1.2',
      phase: 'ETAPA 1',
      name: 'Recepción y Catalogación de Insumos Institucionales de la Empresa',
      inputs: 'Logotipos vectoriales, manual de marca, paleta de colores, fotografías de sedes',
      resp: 'Diseñador UI / Contraparte Empresa',
      startDay: 2, endDay: 3, days: 2, pct: 100, status: 'COMPLETADO', color: '0284C7'
    },
    {
      wbs: '1.3',
      phase: 'ETAPA 1',
      name: 'Formalización de Malla Curricular, Precios y Modalidades de Cursos',
      inputs: 'Planilla con códigos SENCE vigentes, valores por curso, horas pedagógicas y sedes',
      resp: 'Dirección Académica OTEC',
      startDay: 3, endDay: 4, days: 2, pct: 100, status: 'COMPLETADO', color: '0284C7'
    },

    // ETAPA 2
    {
      wbs: '2.0',
      phase: 'ETAPA 2: DISEÑO DE ARQUITECTURA, UX/UI Y PROTOTIPADO',
      name: 'Fase de Diseño Técnico, Modelado de Datos y Prototipos',
      inputs: 'Aprobación de wireframes iniciales y definición de flujo de usuario',
      resp: 'Arquitecto de Software / UX Lead',
      startDay: 5, endDay: 8, days: 4, pct: 100, status: 'COMPLETADO', isHeader: true, color: '0F766E'
    },
    {
      wbs: '2.1',
      phase: 'ETAPA 2',
      name: 'Diseño del Sistema de Diseño UI (Design System) y Estilos Tailwind',
      inputs: 'Guía de estilo corporativa aprobada por la gerencia de PrevySeg',
      resp: 'Diseñador Frontend',
      startDay: 5, endDay: 6, days: 2, pct: 100, status: 'COMPLETADO', color: '0D9488'
    },
    {
      wbs: '2.2',
      phase: 'ETAPA 2',
      name: 'Modelado Entidad-Relación de Base de Datos PostgreSQL',
      inputs: 'Definición de campos requeridos para postulantes, matrículas y fiscalización',
      resp: 'Ingeniero de Base de Datos',
      startDay: 6, endDay: 7, days: 2, pct: 100, status: 'COMPLETADO', color: '0D9488'
    },
    {
      wbs: '2.3',
      phase: 'ETAPA 2',
      name: 'Configuración de Repositorio GitHub y Pipeline de Integración Continua',
      inputs: 'Cuentas institucionales, permisos de acceso al repositorio en GitHub',
      resp: 'DevOps / Sebastian Acuña',
      startDay: 7, endDay: 8, days: 2, pct: 100, status: 'COMPLETADO', color: '0D9488'
    },

    // ETAPA 3
    {
      wbs: '3.0',
      phase: 'ETAPA 3: DESARROLLO CORE FRONTEND Y PORTAL PÚBLICO',
      name: 'Construcción del Portal Web Institucional y Catálogos Comerciales',
      inputs: 'Textos corporativos de bienvenida, misión, visión e imágenes HD',
      resp: 'Ingeniero Frontend React 19',
      startDay: 8, endDay: 13, days: 6, pct: 100, status: 'COMPLETADO', isHeader: true, color: '1E3A8A'
    },
    {
      wbs: '3.1',
      phase: 'ETAPA 3',
      name: 'Desarrollo de Hero Interactivo con Switcher de Escuelas (Oficio / Seguridad)',
      inputs: 'Banners promocionales y textos comerciales de cursos destacados',
      resp: 'Ingeniero Frontend',
      startDay: 8, endDay: 9, days: 2, pct: 100, status: 'COMPLETADO', color: '0284C7'
    },
    {
      wbs: '3.2',
      phase: 'ETAPA 3',
      name: 'Módulo de Catálogo Dinámico con Filtros por Categoría y Modalidades',
      inputs: 'Fichas técnicas completas de los 20 cursos ofrecidos por PrevySeg',
      resp: 'Ingeniero Frontend',
      startDay: 9, endDay: 11, days: 3, pct: 100, status: 'COMPLETADO', color: '0284C7'
    },
    {
      wbs: '3.3',
      phase: 'ETAPA 3',
      name: 'Ficha de Detalle de Cursos (Modal interactivo con requisitos y temario)',
      inputs: 'Temarios oficiales de cursos de Seguridad OS-10 y Oficios SENCE',
      resp: 'Ingeniero Frontend',
      startDay: 11, endDay: 13, days: 3, pct: 100, status: 'COMPLETADO', color: '0284C7'
    },

    // ETAPA 4
    {
      wbs: '4.0',
      phase: 'ETAPA 4: BACKEND, SUPABASE POSTGRESQL Y SEGURIDAD BCRYPT',
      name: 'Implementación del Backend en la Nube, API y Procedimientos Almacenados',
      inputs: 'Credenciales del proyecto Supabase Cloud y claves de servicio encriptadas',
      resp: 'Ingeniero Backend & Seguridad',
      startDay: 12, endDay: 17, days: 6, pct: 100, status: 'COMPLETADO', isHeader: true, color: '6D28D9'
    },
    {
      wbs: '4.1',
      phase: 'ETAPA 4',
      name: 'Despliegue de Tablas Maestras: users, courses, enrollments, escuelas',
      inputs: 'Definición de tipos de datos, restricciones y reglas de negocio',
      resp: 'Ingeniero Backend',
      startDay: 12, endDay: 14, days: 3, pct: 100, status: 'COMPLETADO', color: '7C3AED'
    },
    {
      wbs: '4.2',
      phase: 'ETAPA 4',
      name: 'Sistema de Autenticación con Hash Bcrypt y Validación de RUT Módulo 11',
      inputs: 'Política de seguridad de contraseñas y algoritmo chileno de RUT',
      resp: 'Especialista en Ciberseguridad',
      startDay: 14, endDay: 16, days: 3, pct: 100, status: 'COMPLETADO', color: '7C3AED'
    },
    {
      wbs: '4.3',
      phase: 'ETAPA 4',
      name: 'Implementación de Procedimiento Atómico de Matrícula y Abono 50%',
      inputs: 'Procedimiento formal de pago: cuentas bancarias y abonos iniciales',
      resp: 'Ingeniero Backend',
      startDay: 15, endDay: 17, days: 3, pct: 100, status: 'COMPLETADO', color: '7C3AED'
    },

    // ETAPA 5
    {
      wbs: '5.0',
      phase: 'ETAPA 5: PLATAFORMA LMS MULTI-ROL (AULA VIRTUAL Y PANELES)',
      name: 'Desarrollo de la Plataforma de Capacitación y Gestión de Roles',
      inputs: 'Perfiles de usuarios tipo (Administrador, Docente, Alumno, Empresa)',
      resp: 'Equipo Fullstack PrevySeg',
      startDay: 16, endDay: 22, days: 7, pct: 100, status: 'COMPLETADO', isHeader: true, color: '1E3A8A'
    },
    {
      wbs: '5.1',
      phase: 'ETAPA 5',
      name: 'Panel de Administración General y Administración del Sitio (SiteAdmin)',
      inputs: 'Definición de funciones de control académico y parámetros de plataforma',
      resp: 'Ingeniero Frontend',
      startDay: 16, endDay: 18, days: 3, pct: 100, status: 'COMPLETADO', color: '0284C7'
    },
    {
      wbs: '5.2',
      phase: 'ETAPA 5',
      name: 'Portal del Docente Instructor SPD (Libro de notas, comunicados y repositorio)',
      inputs: 'Pauta de evaluación docente y asignaturas de la malla de Seguridad',
      resp: 'Ingeniero Fullstack',
      startDay: 18, endDay: 20, days: 3, pct: 100, status: 'COMPLETADO', color: '0284C7'
    },
    {
      wbs: '5.3',
      phase: 'ETAPA 5',
      name: 'Portal del Estudiante, Aula Virtual y Reproductor de Clases E-learning',
      inputs: 'Contenidos interactivos SCORM, guías en PDF y videos formativos',
      resp: 'Ingeniero Frontend',
      startDay: 19, endDay: 21, days: 3, pct: 100, status: 'COMPLETADO', color: '0284C7'
    },
    {
      wbs: '5.4',
      phase: 'ETAPA 5',
      name: 'Portal de Empresas y Bolsa de Empleo con Postulaciones Validadas',
      inputs: 'Convenios con empresas de seguridad privada y perfiles laborales requeridos',
      resp: 'Ingeniero Fullstack',
      startDay: 20, endDay: 22, days: 3, pct: 100, status: 'COMPLETADO', color: '0284C7'
    },

    // ETAPA 6
    {
      wbs: '6.0',
      phase: 'ETAPA 6: AUDITORÍA, TRAZABILIDAD SENCE, CALIFICACIONES SPD Y LOGS',
      name: 'Módulo de Fiscalización Oficial, Gráficos en Tiempo Real y Live Logs',
      inputs: 'Requerimientos específicos de marcas horarias SENCE y ponderaciones SPD',
      resp: 'Equipo de Ingeniería & Auditoría',
      startDay: 21, endDay: 26, days: 6, pct: 100, status: 'COMPLETADO', isHeader: true, color: '0F766E'
    },
    {
      wbs: '6.1',
      phase: 'ETAPA 6',
      name: 'Motor de Auditoría en Tiempo Real con RPC PostgreSQL (get_audit_aggregated_data)',
      inputs: 'Esquema de eventos auditables y sincronización con servidor horario oficial',
      resp: 'Ingeniero Backend',
      startDay: 21, endDay: 23, days: 3, pct: 100, status: 'COMPLETADO', color: '0D9488'
    },
    {
      wbs: '6.2',
      phase: 'ETAPA 6',
      name: 'Desarrollo de Gráficos de Asistencia SENCE y Cumplimiento de Umbral 75%',
      inputs: 'Reglamento SENCE de cursos sincrónicos y asincrónicos e-learning',
      resp: 'Ingeniero Frontend',
      startDay: 22, endDay: 24, days: 3, pct: 100, status: 'COMPLETADO', color: '0D9488'
    },
    {
      wbs: '6.3',
      phase: 'ETAPA 6',
      name: 'Planilla Oficial de Calificaciones SPD con Ponderación 60% Teórico / 40% Práctico',
      inputs: 'Decreto N° 867 y pauta oficial de Carabineros OS-10 para guardias',
      resp: 'Ingeniero Fullstack',
      startDay: 23, endDay: 25, days: 3, pct: 100, status: 'COMPLETADO', color: '0D9488'
    },
    {
      wbs: '6.4',
      phase: 'ETAPA 6',
      name: 'Consola de Live Logs en Tiempo Real y Exportación de Libros Reglamentarios',
      inputs: 'Formatos estandarizados de actas de supervisión técnica SENCE & SPD',
      resp: 'Ingeniero Fullstack',
      startDay: 24, endDay: 26, days: 3, pct: 100, status: 'COMPLETADO', color: '0D9488'
    },

    // ETAPA 7
    {
      wbs: '7.0',
      phase: 'ETAPA 7: SUBSANAR DEMANDAS DEL CLIENTE O MANDATARIO',
      name: 'Fase de Atención y Subsanación Integral de Observaciones del Mandatario',
      inputs: 'Listado formal de observaciones, solicitudes de ajuste y feedback del cliente',
      resp: 'Equipo de Desarrollo / Contraparte Mandatario',
      startDay: 25, endDay: 28, days: 4, pct: 100, status: 'COMPLETADO', isHeader: true, color: 'B45309'
    },
    {
      wbs: '7.1',
      phase: 'ETAPA 7',
      name: 'Subsanación de Reglas de Negocio de Matrícula (Regla estricta 1 alumno = 1 curso)',
      inputs: 'Demanda del mandante: evitar doble inscripción simultánea en distintas escuelas',
      resp: 'Ingeniero Backend & Frontend',
      startDay: 25, endDay: 26, days: 2, pct: 100, status: 'COMPLETADO', color: 'D97706'
    },
    {
      wbs: '7.2',
      phase: 'ETAPA 7',
      name: 'Ajuste del Flujo Especial de CCTV (Visto Bueno, Cupo Individual 30 Días e Historial)',
      inputs: 'Demanda del mandante: régimen de autoestudio documental sin profesor con 1 cupo',
      resp: 'Ingeniero Fullstack',
      startDay: 26, endDay: 27, days: 2, pct: 100, status: 'COMPLETADO', color: 'D97706'
    },
    {
      wbs: '7.3',
      phase: 'ETAPA 7',
      name: 'Subsanación de Módulo de Auditoría: Gráficos por Apartado y Live Logs Reales',
      inputs: 'Demanda del mandante: visualización gráfica en cada informe con datos reales',
      resp: 'Ingeniero Fullstack',
      startDay: 27, endDay: 28, days: 2, pct: 100, status: 'COMPLETADO', color: 'D97706'
    },

    // ETAPA 8
    {
      wbs: '8.0',
      phase: 'ETAPA 8: CONTROL DE CALIDAD, DESPLIEGUE Y TRANSFERENCIA',
      name: 'Pruebas Finales, Despliegue en la Nube y Documentación Técnica de Entrega',
      inputs: 'Visto bueno final del cliente, credenciales de producción y dominio web',
      resp: 'Líder de Proyecto / DevOps',
      startDay: 27, endDay: 30, days: 4, pct: 100, status: 'COMPLETADO', isHeader: true, color: '0F172A'
    },
    {
      wbs: '8.1',
      phase: 'ETAPA 8',
      name: 'Testing Integral E2E, Validación de Certificados y Pruebas de Rendimiento',
      inputs: 'Casos de prueba de usuario final para todas las vistas y roles del LMS',
      resp: 'QA Engineer',
      startDay: 27, endDay: 28, days: 2, pct: 100, status: 'COMPLETADO', color: '334155'
    },
    {
      wbs: '8.2',
      phase: 'ETAPA 8',
      name: 'Generación de Documentación Técnica Maestra, Manuales de Usuario y Carta Gantt',
      inputs: 'Plantilla institucional de entrega y registro de evidencias de código',
      resp: 'Ingeniero de Documentación',
      startDay: 28, endDay: 29, days: 2, pct: 100, status: 'COMPLETADO', color: '334155'
    },
    {
      wbs: '8.3',
      phase: 'ETAPA 8',
      name: 'Despliegue a Producción Vercel, Sincronización GitHub y Acta de Entrega Final',
      inputs: 'Aprobación formal del mandatario para la entrega oficial del software',
      resp: 'DevOps / Sebastian Acuña',
      startDay: 29, endDay: 30, days: 2, pct: 100, status: 'COMPLETADO', color: '334155'
    },
  ];

  /* ==========================================================================
     HOJA 1: CARTA GANTT OFICIAL CON INSUMOS Y CALENDARIO
     ========================================================================== */
  const wsGantt = workbook.addWorksheet('Carta Gantt de Desarrollo', {
    views: [{ state: 'frozen', xSplit: 4, ySplit: 8, showGridLines: true }]
  });

  // Título Principal
  wsGantt.mergeCells('A1:AN1');
  const titleCell = wsGantt.getCell('A1');
  titleCell.value = 'OTEC PREVYSEG 2026 — CARTA GANTT MAESTRA DE DESARROLLO Y PLAN DE TRABAJO';
  titleCell.font = { name: 'Segoe UI', size: 14, bold: true, color: { argb: 'FFFFFF' } };
  titleCell.alignment = { vertical: 'middle', horizontal: 'center' };
  titleCell.fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: DARK_NAVY } };
  wsGantt.getRow(1).height = 32;

  // Subtítulo con enlace de GitHub
  wsGantt.mergeCells('A2:AN2');
  const subCell = wsGantt.getCell('A2');
  subCell.value = 'Etapas del Desarrollo de Software Web • Insumos Requeridos de la Empresa • Subsanar Demandas del Mandatario • Respaldo GitHub: https://github.com/Sebastianaso/PrevySeg2026';
  subCell.font = { name: 'Segoe UI', size: 9.5, italic: true, color: { argb: 'E2E8F0' } };
  subCell.alignment = { vertical: 'middle', horizontal: 'center' };
  subCell.fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: SLATE_HEADER } };
  wsGantt.getRow(2).height = 20;

  // Fila de Metadatos
  wsGantt.mergeCells('A3:D3');
  wsGantt.getCell('A3').value = 'ORGANISMO TÉCNICO: OTEC PrevySeg SpA';
  wsGantt.getCell('A3').font = { name: 'Segoe UI', size: 9, bold: true, color: { argb: '334155' } };

  wsGantt.mergeCells('E3:J3');
  wsGantt.getCell('E3').value = 'REPOSITORIO GITHUB: https://github.com/Sebastianaso/PrevySeg2026';
  wsGantt.getCell('E3').font = { name: 'Segoe UI', size: 9, bold: true, color: { argb: '0284C7' } };

  wsGantt.mergeCells('K3:P3');
  wsGantt.getCell('K3').value = 'ESTADO GLOBAL: 100% CUMPLIDO';
  wsGantt.getCell('K3').font = { name: 'Segoe UI', size: 9, bold: true, color: { argb: '16A34A' } };

  wsGantt.mergeCells('Q3:AN3');
  wsGantt.getCell('Q3').value = 'PERÍODO EJECUTIVO: Septiembre 2026 (30 Días Calendario)';
  wsGantt.getCell('Q3').font = { name: 'Segoe UI', size: 9, bold: true, color: { argb: '475569' } };
  wsGantt.getRow(3).height = 18;

  // Encabezados de Columnas Principales
  const headers = [
    { col: 1, label: 'WBS', width: 8 },
    { col: 2, label: 'Etapa / Fase del Proyecto', width: 28 },
    { col: 3, label: 'Actividad Ejecutada del Software', width: 44 },
    { col: 4, label: 'Insumos Necesarios de la Empresa / Mandatario', width: 48 },
    { col: 5, label: 'Responsable', width: 22 },
    { col: 6, label: 'Inicio', width: 12 },
    { col: 7, label: 'Fin', width: 12 },
    { col: 8, label: 'Días', width: 8 },
    { col: 9, label: '% Avance', width: 11 },
    { col: 10, label: 'Estado', width: 14 }
  ];

  headers.forEach(h => {
    wsGantt.getColumn(h.col).width = h.width;
    wsGantt.mergeCells(7, h.col, 8, h.col);
    const cell = wsGantt.getCell(7, h.col);
    cell.value = h.label;
    cell.font = { name: 'Segoe UI', size: 9, bold: true, color: { argb: 'FFFFFF' } };
    cell.alignment = { vertical: 'middle', horizontal: 'center', wrapText: true };
    cell.fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: DARK_NAVY } };
    cell.border = headerBorder;
  });

  // Encabezado del Calendario de Días (Columnas 11 a 40 -> 30 días de Septiembre)
  wsGantt.mergeCells('K6:AN6');
  const monthHeader = wsGantt.getCell('K6');
  monthHeader.value = 'CRONOGRAMA DE EJECUCIÓN TEMPORAL — SEPTIEMBRE 2026 (DÍAS 1 AL 30)';
  monthHeader.font = { name: 'Segoe UI', size: 9, bold: true, color: { argb: 'FFFFFF' } };
  monthHeader.alignment = { vertical: 'middle', horizontal: 'center' };
  monthHeader.fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: '1E3A8A' } };
  wsGantt.getRow(6).height = 18;

  const dayLetters = ['M', 'X', 'J', 'V', 'S', 'D', 'L', 'M', 'X', 'J', 'V', 'S', 'D', 'L', 'M', 'X', 'J', 'V', 'S', 'D', 'L', 'M', 'X', 'J', 'V', 'S', 'D', 'L', 'M', 'X'];
  const sundays = [6, 13, 20, 27];

  for (let d = 1; d <= 30; d++) {
    const colIdx = 10 + d;
    wsGantt.getColumn(colIdx).width = 4.2;

    const numCell = wsGantt.getCell(7, colIdx);
    numCell.value = d;
    numCell.font = { name: 'Segoe UI', size: 8, bold: true, color: { argb: 'FFFFFF' } };
    numCell.alignment = { vertical: 'middle', horizontal: 'center' };
    numCell.fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: '334155' } };
    numCell.border = thinBorder;

    const letCell = wsGantt.getCell(8, colIdx);
    letCell.value = dayLetters[d - 1];
    letCell.font = { name: 'Segoe UI', size: 7.5, bold: true, color: { argb: sundays.includes(d) ? 'EF4444' : 'E2E8F0' } };
    letCell.alignment = { vertical: 'middle', horizontal: 'center' };
    letCell.fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: sundays.includes(d) ? '1E293B' : '475569' } };
    letCell.border = thinBorder;
  }
  wsGantt.getRow(7).height = 18;
  wsGantt.getRow(8).height = 16;

  // Llenar Filas de Actividades
  let currentRow = 9;

  activities.forEach(act => {
    wsGantt.getRow(currentRow).height = act.isHeader ? 24 : 22;

    const cWbs = wsGantt.getCell(currentRow, 1);
    cWbs.value = act.wbs;
    cWbs.alignment = { vertical: 'middle', horizontal: 'center' };
    cWbs.font = { name: 'Segoe UI', size: 8.5, bold: act.isHeader, color: { argb: act.isHeader ? 'FFFFFF' : '0F172A' } };

    const cPhase = wsGantt.getCell(currentRow, 2);
    cPhase.value = act.phase;
    cPhase.alignment = { vertical: 'middle', horizontal: 'left' };
    cPhase.font = { name: 'Segoe UI', size: 8.5, bold: act.isHeader, color: { argb: act.isHeader ? 'FFFFFF' : '334155' } };

    const cName = wsGantt.getCell(currentRow, 3);
    cName.value = act.name;
    cName.alignment = { vertical: 'middle', horizontal: 'left' };
    cName.font = { name: 'Segoe UI', size: 8.5, bold: act.isHeader, color: { argb: act.isHeader ? 'FFFFFF' : '0F172A' } };

    const cInputs = wsGantt.getCell(currentRow, 4);
    cInputs.value = act.inputs;
    cInputs.alignment = { vertical: 'middle', horizontal: 'left' };
    cInputs.font = { name: 'Segoe UI', size: 8, italic: !act.isHeader, bold: act.isHeader, color: { argb: act.isHeader ? 'FFFFFF' : '475569' } };

    const cResp = wsGantt.getCell(currentRow, 5);
    cResp.value = act.resp;
    cResp.alignment = { vertical: 'middle', horizontal: 'left' };
    cResp.font = { name: 'Segoe UI', size: 8, color: { argb: act.isHeader ? 'FFFFFF' : '334155' } };

    const cStart = wsGantt.getCell(currentRow, 6);
    cStart.value = `0${act.startDay}/09/2026`.slice(-10);
    cStart.alignment = { vertical: 'middle', horizontal: 'center' };
    cStart.font = { name: 'Segoe UI', size: 8, color: { argb: act.isHeader ? 'FFFFFF' : '334155' } };

    const cEnd = wsGantt.getCell(currentRow, 7);
    cEnd.value = `${act.endDay < 10 ? '0' : ''}${act.endDay}/09/2026`;
    cEnd.alignment = { vertical: 'middle', horizontal: 'center' };
    cEnd.font = { name: 'Segoe UI', size: 8, color: { argb: act.isHeader ? 'FFFFFF' : '334155' } };

    const cDays = wsGantt.getCell(currentRow, 8);
    cDays.value = act.days;
    cDays.alignment = { vertical: 'middle', horizontal: 'center' };
    cDays.font = { name: 'Segoe UI', size: 8.5, bold: true, color: { argb: act.isHeader ? 'FFFFFF' : '0F172A' } };

    const cPct = wsGantt.getCell(currentRow, 9);
    cPct.value = `${act.pct}%`;
    cPct.alignment = { vertical: 'middle', horizontal: 'center' };
    cPct.font = { name: 'Segoe UI', size: 8.5, bold: true, color: { argb: act.isHeader ? 'FFFFFF' : '16A34A' } };

    const cStatus = wsGantt.getCell(currentRow, 10);
    cStatus.value = act.status;
    cStatus.alignment = { vertical: 'middle', horizontal: 'center' };
    cStatus.font = { name: 'Segoe UI', size: 8, bold: true, color: { argb: act.isHeader ? 'FFFFFF' : '15803D' } };

    // Si es cabecera de fase, pintar toda la fila con su color distintivo
    if (act.isHeader) {
      for (let c = 1; c <= 10; c++) {
        const cell = wsGantt.getCell(currentRow, c);
        cell.fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: act.color } };
        cell.border = thinBorder;
      }
    } else {
      for (let c = 1; c <= 10; c++) {
        const cell = wsGantt.getCell(currentRow, c);
        cell.fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: currentRow % 2 === 0 ? 'F8FAFC' : 'FFFFFF' } };
        cell.border = thinBorder;
      }
    }

    // Pintar la barra de Gantt en las columnas de días (11 a 40)
    for (let d = 1; d <= 30; d++) {
      const colIdx = 10 + d;
      const cell = wsGantt.getCell(currentRow, colIdx);
      cell.border = thinBorder;

      const isSunday = sundays.includes(d);

      if (d >= act.startDay && d <= act.endDay) {
        // Celda dentro del plazo de la actividad
        cell.fill = {
          type: 'pattern',
          pattern: 'solid',
          fgColor: { argb: act.isHeader ? act.color : (act.color || '0284C7') }
        };
        // Agregar marca en el día final
        if (d === act.endDay && !act.isHeader) {
          cell.value = '✓';
          cell.font = { name: 'Segoe UI', size: 7, bold: true, color: { argb: 'FFFFFF' } };
          cell.alignment = { vertical: 'middle', horizontal: 'center' };
        }
      } else {
        // Celda fuera de plazo
        if (isSunday) {
          cell.fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: SUNDAY_FILL } };
        } else {
          cell.fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: 'FFFFFF' } };
        }
      }
    }

    currentRow++;
  });

  /* ==========================================================================
     HOJA 2: MATRIZ DE INSUMOS DE LA EMPRESA Y SUBSANACIÓN DE DEMANDAS
     ========================================================================== */
  const wsInputs = workbook.addWorksheet('Insumos de Empresa & Demandas', {
    views: [{ showGridLines: true }]
  });

  wsInputs.mergeCells('A1:G1');
  const t2 = wsInputs.getCell('A1');
  t2.value = 'MATRIZ DETALLADA DE INSUMOS REQUERIDOS DE LA EMPRESA Y SUBSANACIÓN DE DEMANDAS';
  t2.font = { name: 'Segoe UI', size: 13, bold: true, color: { argb: 'FFFFFF' } };
  t2.alignment = { vertical: 'middle', horizontal: 'center' };
  t2.fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: DARK_NAVY } };
  wsInputs.getRow(1).height = 30;

  wsInputs.mergeCells('A2:G2');
  const st2 = wsInputs.getCell('A2');
  st2.value = 'Catálogo de recursos provistos por el mandante OTEC PrevySeg y resolución de observaciones del cliente';
  st2.font = { name: 'Segoe UI', size: 9, italic: true, color: { argb: 'E2E8F0' } };
  st2.alignment = { vertical: 'middle', horizontal: 'center' };
  st2.fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: SLATE_HEADER } };
  wsInputs.getRow(2).height = 20;

  const inputHeaders = [
    { col: 1, label: 'ID', width: 8 },
    { col: 2, label: 'Categoría / Tipo de Insumo', width: 24 },
    { col: 3, label: 'Insumo Requerido de la Empresa', width: 44 },
    { col: 4, label: 'Propósito en el Software', width: 44 },
    { col: 5, label: 'Responsable de Entrega', width: 24 },
    { col: 6, label: 'Fecha de Entrega', width: 16 },
    { col: 7, label: 'Estado de Recepción', width: 18 }
  ];

  inputHeaders.forEach(h => {
    wsInputs.getColumn(h.col).width = h.width;
    const c = wsInputs.getCell(4, h.col);
    c.value = h.label;
    c.font = { name: 'Segoe UI', size: 9, bold: true, color: { argb: 'FFFFFF' } };
    c.alignment = { vertical: 'middle', horizontal: 'center' };
    c.fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: DARK_NAVY } };
    c.border = headerBorder;
  });
  wsInputs.getRow(4).height = 24;

  const companyInputs = [
    {
      id: 'INS-01',
      cat: 'Identidad Corporativa',
      name: 'Logotipo Oficial, Paleta Cromática y Manual de Marca',
      purpose: 'Configuración visual del portal, navbar, footer, sellos y certificaciones',
      resp: 'Gerencia General PrevySeg',
      date: '02/09/2026',
      status: 'RECEPCIONADO 100%'
    },
    {
      id: 'INS-02',
      cat: 'Reglamentario SENCE',
      name: 'Malla Curricular, Códigos SENCE y Horas Pedagógicas',
      purpose: 'Carga de los 20 cursos en base de datos PostgreSQL y parametrización',
      resp: 'Dirección Académica OTEC',
      date: '03/09/2026',
      status: 'RECEPCIONADO 100%'
    },
    {
      id: 'INS-03',
      cat: 'Comercial & Pagos',
      name: 'Estructura de Aranceles, Cuenta Bancaria y Abono 50%',
      purpose: 'Implementación del procedimiento seguro de cálculo y reserva de cupo',
      resp: 'Administración y Finanzas',
      date: '04/09/2026',
      status: 'RECEPCIONADO 100%'
    },
    {
      id: 'INS-04',
      cat: 'Normativo SPD / OS-10',
      name: 'Pauta de Ponderaciones 60% Teórico / 40% Práctico SPD',
      purpose: 'Generación del Libro de Calificaciones y actas de fiscalización',
      resp: 'Docente Titular / Instructor SPD',
      date: '07/09/2026',
      status: 'RECEPCIONADO 100%'
    },
    {
      id: 'INS-05',
      cat: 'Contenidos E-learning',
      name: 'Material Didáctico SCORM, PDFs y Módulos Formativos',
      purpose: 'Alimentación del Aula Virtual interactiva y banco de preguntas',
      resp: 'Cuerpo Docente PrevySeg',
      date: '10/09/2026',
      status: 'RECEPCIONADO 100%'
    },
    {
      id: 'INS-06',
      cat: 'Empresas & Empleo',
      name: 'Convenios de Contratación y Ofertas Laborales Vigentes',
      purpose: 'Publicación de vacantes activas en el Portal de Empleadores',
      resp: 'Área de Selección y RRHH',
      date: '14/09/2026',
      status: 'RECEPCIONADO 100%'
    },
    {
      id: 'INS-07',
      cat: 'DEMANDA MANDATARIO 1',
      name: 'Regla de Negocio Estricta: 1 Alumno = 1 Solo Curso Activo',
      purpose: 'Subsanación técnica: validación en PostgreSQL que impide doble matrícula',
      resp: 'Mandatario / Auditoría OTEC',
      date: '25/09/2026',
      status: 'SUBSANADO 100%'
    },
    {
      id: 'INS-08',
      cat: 'DEMANDA MANDATARIO 2',
      name: 'Flujo Especial CCTV: 1 Alumno a la vez, 30 Días e Historial',
      purpose: 'Subsanación técnica: sistema de visto bueno y archivo de participantes',
      resp: 'Mandatario / Dirección OTEC',
      date: '26/09/2026',
      status: 'SUBSANADO 100%'
    },
    {
      id: 'INS-09',
      cat: 'DEMANDA MANDATARIO 3',
      name: 'Gráficos por Apartado en Auditoría y Live Logs en Tiempo Real',
      purpose: 'Subsanación técnica: dashboard con gráficos SVG, marcas SENCE y logs BD',
      resp: 'Mandatario / Evaluador Técnico',
      date: '28/09/2026',
      status: 'SUBSANADO 100%'
    },
  ];

  let rRow = 5;
  companyInputs.forEach(item => {
    wsInputs.getRow(rRow).height = 22;
    wsInputs.getCell(rRow, 1).value = item.id;
    wsInputs.getCell(rRow, 1).alignment = { vertical: 'middle', horizontal: 'center' };
    wsInputs.getCell(rRow, 1).font = { name: 'Segoe UI', size: 8.5, bold: true };

    wsInputs.getCell(rRow, 2).value = item.cat;
    wsInputs.getCell(rRow, 2).alignment = { vertical: 'middle', horizontal: 'left' };
    wsInputs.getCell(rRow, 2).font = { name: 'Segoe UI', size: 8.5, bold: item.cat.includes('DEMANDA') };

    wsInputs.getCell(rRow, 3).value = item.name;
    wsInputs.getCell(rRow, 3).alignment = { vertical: 'middle', horizontal: 'left' };
    wsInputs.getCell(rRow, 3).font = { name: 'Segoe UI', size: 8.5, bold: item.cat.includes('DEMANDA') };

    wsInputs.getCell(rRow, 4).value = item.purpose;
    wsInputs.getCell(rRow, 4).alignment = { vertical: 'middle', horizontal: 'left' };
    wsInputs.getCell(rRow, 4).font = { name: 'Segoe UI', size: 8 };

    wsInputs.getCell(rRow, 5).value = item.resp;
    wsInputs.getCell(rRow, 5).alignment = { vertical: 'middle', horizontal: 'left' };
    wsInputs.getCell(rRow, 5).font = { name: 'Segoe UI', size: 8 };

    wsInputs.getCell(rRow, 6).value = item.date;
    wsInputs.getCell(rRow, 6).alignment = { vertical: 'middle', horizontal: 'center' };
    wsInputs.getCell(rRow, 6).font = { name: 'Segoe UI', size: 8.5 };

    wsInputs.getCell(rRow, 7).value = item.status;
    wsInputs.getCell(rRow, 7).alignment = { vertical: 'middle', horizontal: 'center' };
    wsInputs.getCell(rRow, 7).font = { name: 'Segoe UI', size: 8.5, bold: true, color: { argb: '15803D' } };

    for (let c = 1; c <= 7; c++) {
      const cell = wsInputs.getCell(rRow, c);
      cell.fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: item.cat.includes('DEMANDA') ? 'FEF3C7' : (rRow % 2 === 0 ? 'F8FAFC' : 'FFFFFF') } };
      cell.border = thinBorder;
    }
    rRow++;
  });

  /* ==========================================================================
     HOJA 3: RESPALDO GITHUB Y CONTROL DE VERSIONES
     ========================================================================== */
  const wsGit = workbook.addWorksheet('Respaldo GitHub & Versiones', {
    views: [{ showGridLines: true }]
  });

  wsGit.mergeCells('A1:F1');
  const tg = wsGit.getCell('A1');
  tg.value = 'RESPALDO OFICIAL DE DESARROLLO EN GITHUB — PREVYSEG 2026';
  tg.font = { name: 'Segoe UI', size: 13, bold: true, color: { argb: 'FFFFFF' } };
  tg.alignment = { vertical: 'middle', horizontal: 'center' };
  tg.fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: DARK_NAVY } };
  wsGit.getRow(1).height = 30;

  wsGit.mergeCells('A3:F3');
  wsGit.getCell('A3').value = 'ENLACE AL REPOSITORIO OFICIAL (CÓDIGO FUENTE Y COMMITS):';
  wsGit.getCell('A3').font = { name: 'Segoe UI', size: 10, bold: true, color: { argb: '0F172A' } };

  wsGit.mergeCells('A4:F4');
  const urlCell = wsGit.getCell('A4');
  urlCell.value = 'https://github.com/Sebastianaso/PrevySeg2026';
  urlCell.font = { name: 'Segoe UI', size: 12, bold: true, underline: true, color: { argb: '0284C7' } };
  urlCell.alignment = { vertical: 'middle', horizontal: 'left' };
  wsGit.getRow(4).height = 24;

  const gitDetails = [
    ['Parámetro', 'Valor / Detalle'],
    ['Propietario / Cuenta GitHub', 'Sebastianaso (Sebastian Acuña)'],
    ['Nombre del Repositorio', 'PrevySeg2026'],
    ['Rama Principal de Producción', 'main'],
    ['Visibilidad', 'Público / Accesible para Fiscalización'],
    ['Stack de Tecnologías', 'React 19, Vite, Tailwind CSS 4, PostgreSQL, Supabase Cloud, Framer Motion, ExcelJS, Docx'],
    ['Mecanismo de Respaldo', 'Git Version Control con registro cronológico de commits y hashes SHA'],
    ['Servidor de Base de Datos', 'AWS sa-east-1 (São Paulo) Pooler Supabase PostgreSQL'],
    ['Despliegue Web', 'Vercel Edge Network CI/CD automatizado'],
  ];

  wsGit.getColumn(1).width = 30;
  wsGit.getColumn(2).width = 70;

  let gRow = 6;
  gitDetails.forEach((row, i) => {
    wsGit.getRow(gRow).height = 22;
    const c1 = wsGit.getCell(gRow, 1);
    const c2 = wsGit.getCell(gRow, 2);

    c1.value = row[0];
    c2.value = row[1];

    c1.font = { name: 'Segoe UI', size: 9, bold: i === 0, color: { argb: i === 0 ? 'FFFFFF' : '0F172A' } };
    c2.font = { name: 'Segoe UI', size: 9, bold: i === 0, color: { argb: i === 0 ? 'FFFFFF' : '334155' } };

    c1.fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: i === 0 ? DARK_NAVY : (gRow % 2 === 0 ? 'F8FAFC' : 'FFFFFF') } };
    c2.fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: i === 0 ? DARK_NAVY : (gRow % 2 === 0 ? 'F8FAFC' : 'FFFFFF') } };

    c1.border = thinBorder;
    c2.border = thinBorder;
    gRow++;
  });

  const outputPath = path.resolve('c:/Users/ashle/OneDrive/Escritorio/prevyseg/Carta_Gantt_Desarrollo_PrevySeg_2026.xlsx');
  await workbook.xlsx.writeFile(outputPath);
  console.log(`✓ Carta Gantt generada exitosamente en: ${outputPath}`);
}

generateDevelopmentGantt().catch(console.error);
