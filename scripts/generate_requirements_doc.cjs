const fs = require('fs');
const path = require('path');
const { 
  Document, 
  Packer, 
  Paragraph, 
  TextRun, 
  Table, 
  TableRow, 
  TableCell, 
  WidthType, 
  AlignmentType, 
  HeadingLevel, 
  BorderStyle, 
  ShadingType,
  Header,
  Footer,
  PageNumber,
  PageBreak
} = require('docx');

async function createFormalEngineeringRequirementsDoc() {
  // Paleta de Colores de Ingeniería PrevySeg
  const COLOR_PRIMARY = "0F3B7A";      // Azul Marino Corporativo / Ingeniería
  const COLOR_SECONDARY = "0284C7";    // Cyan / Azul Tecnológico PrevySeg
  const COLOR_TEAL = "0D9488";         // Teal Acentuado
  const COLOR_DARK_SLATE = "0F172A";   // Pizarra Oscuro (Encabezados)
  const COLOR_TEXT = "1E293B";         // Texto Principal (Slate 800)
  const COLOR_MUTED = "64748B";        // Texto Secundario (Slate 500)
  const COLOR_BORDER = "CBD5E1";       // Borde Gris Claro
  const COLOR_BG_HEADER = "0F172A";    // Fondo Encabezados Tabla
  const COLOR_BG_SUBHEADER = "1E293B"; // Fondo Sub-encabezados
  const COLOR_BG_LIGHT = "F8FAFC";     // Fondo Fila Alterna
  const COLOR_CRITICAL = "B91C1C";     // Rojo Prioridad Crítica
  const COLOR_HIGH = "C2410C";         // Naranja Prioridad Alta
  const COLOR_MEDIUM = "0369A1";       // Azul Prioridad Media

  const standardBorders = {
    top: { style: BorderStyle.SINGLE, size: 1, color: COLOR_BORDER },
    bottom: { style: BorderStyle.SINGLE, size: 1, color: COLOR_BORDER },
    left: { style: BorderStyle.SINGLE, size: 1, color: COLOR_BORDER },
    right: { style: BorderStyle.SINGLE, size: 1, color: COLOR_BORDER },
  };

  const createCell = (text, options = {}) => {
    const { 
      isHeader = false, 
      width = null, 
      bgColor = isHeader ? COLOR_BG_HEADER : null, 
      textColor = isHeader ? "FFFFFF" : COLOR_TEXT,
      bold = isHeader,
      italic = false,
      align = AlignmentType.LEFT,
      colSpan = 1,
      rowSpan = 1,
      fontSize = isHeader ? 18 : 17
    } = options;

    const paragraphs = Array.isArray(text) ? text : [text];

    return new TableCell({
      width: width ? { size: width, type: WidthType.PERCENTAGE } : undefined,
      shading: bgColor ? { fill: bgColor, type: ShadingType.CLEAR } : undefined,
      columnSpan: colSpan,
      rowSpan: rowSpan,
      margins: { top: 120, bottom: 120, left: 140, right: 140 },
      borders: standardBorders,
      children: paragraphs.map(pText => new Paragraph({
        alignment: align,
        spacing: { line: 240, after: 40 },
        children: [
          new TextRun({
            text: pText,
            bold: bold,
            italics: italic,
            color: textColor,
            size: fontSize,
            font: "Calibri"
          })
        ]
      }))
    });
  };

  const createHeading1 = (title) => {
    return new Paragraph({
      heading: HeadingLevel.HEADING_1,
      spacing: { before: 360, after: 160 },
      children: [
        new TextRun({
          text: title,
          bold: true,
          color: COLOR_PRIMARY,
          size: 28,
          font: "Calibri"
        })
      ]
    });
  };

  const createHeading2 = (title) => {
    return new Paragraph({
      heading: HeadingLevel.HEADING_2,
      spacing: { before: 240, after: 120 },
      children: [
        new TextRun({
          text: title,
          bold: true,
          color: COLOR_SECONDARY,
          size: 24,
          font: "Calibri"
        })
      ]
    });
  };

  const createHeading3 = (title) => {
    return new Paragraph({
      heading: HeadingLevel.HEADING_3,
      spacing: { before: 180, after: 80 },
      children: [
        new TextRun({
          text: title,
          bold: true,
          color: COLOR_DARK_SLATE,
          size: 20,
          font: "Calibri"
        })
      ]
    });
  };

  const createParagraph = (text, options = {}) => {
    const { bold = false, italic = false, size = 20, color = COLOR_TEXT, align = AlignmentType.LEFT, after = 120 } = options;
    return new Paragraph({
      alignment: align,
      spacing: { after: after, line: 276 },
      children: [
        new TextRun({
          text: text,
          bold: bold,
          italics: italic,
          color: color,
          size: size,
          font: "Calibri"
        })
      ]
    });
  };

  const createBullet = (boldPrefix, text) => {
    return new Paragraph({
      bullet: { level: 0 },
      spacing: { after: 80, line: 260 },
      children: [
        new TextRun({
          text: boldPrefix + " ",
          bold: true,
          color: COLOR_DARK_SLATE,
          size: 19,
          font: "Calibri"
        }),
        new TextRun({
          text: text,
          color: COLOR_TEXT,
          size: 19,
          font: "Calibri"
        })
      ]
    });
  };

  /* ==========================================================================
     REQUERIMIENTOS FUNCIONALES FORMALES (RF-01 A RF-17)
     ========================================================================== */
  const functionalRequirements = [
    {
      code: "RF-01",
      module: "Módulo Público / Catálogo",
      name: "Catálogo Oficial de Cursos SENCE y Especializaciones",
      desc: "El sistema debe desplegar el catálogo académico con los 6 programas de capacitación autorizados y vigentes por SENCE y la Prefectura de Seguridad Privada OS-10 de Carabineros de Chile. Cada tarjeta debe incluir portada gráfica, categoría, arancel en CLP, código referencial y botón de acción directa.",
      inputs: "Navegación al sitio web público o selección de filtro de área.",
      process: "Renderizado dinámico en cuadrícula adaptativa desde la estructura de datos `moodleCoursesData`, calculando badges de modalidad e información de financiamiento.",
      outputs: "Grilla responsiva de cursos con modal de detalle e inscripción.",
      actor: "Público General / Empresas Clientes",
      priority: "Must Have (Crítica)",
      acceptance: "Renderizado de exactamente los 6 cursos activos con metadatos oficiales y enlaces a WhatsApp sin errores de renderizado."
    },
    {
      code: "RF-02",
      module: "Módulo Público / Catálogo",
      name: "Mecanismo de Filtrado Instantáneo por Área Formativa",
      desc: "El sistema debe proveer controles interactivos (píldoras de filtrado) para segmentar la oferta académica entre las categorías: Seguridad Privada, Sistemas Internos, Asistencias y Todos los Cursos.",
      inputs: "Interacción del usuario mediante clic en la píldora de filtro deseada.",
      process: "Filtrado en memoria (React State) en tiempo real con latencia < 50ms sin recargar la página.",
      outputs: "Actualización inmediata del subconjunto de cursos visibles con animación fluida.",
      actor: "Público General / Alumnos",
      priority: "Should Have (Alta)",
      acceptance: "Filtrado estricto que oculta cursos no coincidentes y restaura la vista completa al pulsar 'Todos'."
    },
    {
      code: "RF-03",
      module: "Módulo Comercial / Contacto",
      name: "Enlace y Cotización Directa vía WhatsApp Business API",
      desc: "El sistema debe integrar el formulario modal de cotización y matrícula con la API de mensajería de WhatsApp (+56 9 7869 1869), enviando un mensaje pre-estructurado con los datos del curso, nombre, correo y RUT del solicitante.",
      inputs: "Formulario de contacto completado (Nombre, Teléfono, Correo, Curso seleccionado, Mensaje).",
      process: "Codificación URI del payload de texto y redirección al endpoint `https://api.whatsapp.com/send`.",
      outputs: "Apertura de la sesión de WhatsApp Web o aplicación nativa móvil con el mensaje listo para envío.",
      actor: "Público General / Empresas",
      priority: "Must Have (Crítica)",
      acceptance: "Transferencia 100% fidedigna de los campos del formulario al chat oficial sin truncamiento de caracteres."
    },
    {
      code: "RF-04",
      module: "Módulo Normativo / SENCE",
      name: "Matriz Informativa de Tramos de Franquicia Tributaria SENCE",
      desc: "El sistema debe exponer la estructura de imputación tributaria bajo la Ley N° 19.518, describiendo los 4 tramos normativos: 100% SENCE (Hasta 25 UTM), 50% SENCE (25 a 50 UTM), 15% SENCE (Sobre 50 UTM) y Pago Directo con descuento por volumen, sin divulgar valores paramétricos variables.",
      inputs: "Visualización de la sección 'Franquicia Tributaria SENCE' en la página de inicio.",
      process: "Renderizado estático de tarjetas normativas con acreditación OTEC NCh 2728:2015.",
      outputs: "Cuadrícula informativa con beneficios tributarios y llamada a cotización corporativa.",
      actor: "Empresas / Encargados de RRHH y Capacitación",
      priority: "Must Have (Crítica)",
      acceptance: "Despliegue claro de los 4 tramos legales y acreditación OTEC con enlace de consulta a WhatsApp."
    },
    {
      code: "RF-05",
      module: "Módulo Público / Búsqueda",
      name: "Motor de Búsqueda Global en Tiempo Real",
      desc: "El sistema debe proveer un modal de búsqueda global accesible desde la barra superior, permitiendo consultar cursos por palabra clave, código SENCE o temática formativa con resultados instantáneos.",
      inputs: "Cadena de texto ingresada en el input del buscador.",
      process: "Búsqueda substring insensible a mayúsculas/minúsculas y acentos sobre títulos y etiquetas.",
      outputs: "Lista de coincidencias con botón de acceso directo a ficha y cotización.",
      actor: "Público General / Estudiantes",
      priority: "Should Have (Alta)",
      acceptance: "Búsqueda interactiva que devuelve resultados en tiempo de ejecución sin peticiones sincrónicas al servidor."
    },
    {
      code: "RF-06",
      module: "Módulo Institucional / Blog",
      name: "Centro de Publicaciones Técnicas y Artículos de Seguridad",
      desc: "El sistema debe presentar artículos técnicos sobre protocolos de seguridad física, normativa OS-10, seguridad portuaria y primeros auxilios en modales de lectura extendida.",
      inputs: "Clic en tarjeta de publicación o experiencia técnica.",
      process: "Apertura de modal con renderizado de contenido tipográfico y botón de contacto asociado.",
      outputs: "Visor modal con texto completo, imágenes institucionales y cierre por tecla ESC o backdrop.",
      actor: "Público General / Postulantes",
      priority: "Could Have (Media)",
      acceptance: "Apertura limpia del modal con bloqueo de scroll de fondo y botón de cotización contextual."
    },
    {
      code: "RF-07",
      module: "Módulo de Seguridad / Auth",
      name: "Autenticación Segura y Control de Acceso Basado en Roles (RBAC)",
      desc: "El sistema debe autenticar a los usuarios mediante RUT chileno y contraseña, validando el formato del identificador y segregando el acceso entre el rol ADMINISTRADOR (acceso total a consola) y ESTUDIANTE (acceso exclusivo a su área y cursos).",
      inputs: "Credenciales de acceso: RUT (formato 12345678-K) y Contraseña.",
      process: "Validación sintáctica del RUT con algoritmo Módulo 11, contraste contra el almacén de identidades y generación del estado de sesión autenticado con asignación de rol RBAC.",
      outputs: "Redirección al layout LMS personalizado según rol o denegación con mensaje de error seguro.",
      actor: "Administradores / Estudiantes Matriculados",
      priority: "Must Have (Crítica)",
      acceptance: "Bloqueo absoluto de vistas administrativas para usuarios con rol ESTUDIANTE y prevención de accesos sin sesión."
    },
    {
      code: "RF-08",
      module: "Campus Virtual LMS / Alumno",
      name: "Dashboard y Área Personal del Estudiante",
      desc: "El sistema debe proveer al estudiante un panel de control con su estado de matrícula activa SENCE 2026, línea de tiempo de progreso formativo, cursos activos y banner de notificación de diplomas emitidos.",
      inputs: "Inicio de sesión exitoso con rol ESTUDIANTE.",
      process: "Cálculo del porcentaje de avance curricular, verificación de visto bueno administrativo y renderizado de la línea de tiempo.",
      outputs: "Vista de Área Personal con estadísticas de avance, accesos directos y estado de certificación.",
      actor: "Estudiante",
      priority: "Must Have (Crítica)",
      acceptance: "Cálculo matemático correcto de porcentajes de progreso y renderizado de banners condicionales."
    },
    {
      code: "RF-09",
      module: "Campus Virtual LMS / Alumno",
      name: "Vista Centralizada 'Mis Cursos' con Avance Curricular",
      desc: "El sistema debe listar los cursos en los que el estudiante se encuentra formalmente matriculado, mostrando tarjetas dinámicas con barra de progreso porcentual, código del programa y botón de acceso a contenidos.",
      inputs: "Navegación a la pestaña 'Mis Cursos' dentro del Campus Virtual.",
      process: "Consulta de cursos asociados al ID del alumno y renderizado de tarjetas curriculares.",
      outputs: "Grilla de cursos del alumno con indicadores visuales de completitud.",
      actor: "Estudiante",
      priority: "Must Have (Crítica)",
      acceptance: "Despliegue individualizado de los cursos con estado de avance exacto y enlace a la malla."
    },
    {
      code: "RF-10",
      module: "Campus Virtual LMS / Servicios",
      name: "Portal de Bolsa de Empleo Regional de Arica",
      desc: "El sistema debe ofrecer una bolsa laboral exclusiva para alumnos y egresados de PrevySeg con ofertas activas de empresas de seguridad y faenas de la Región de Arica y Parinacota, incluyendo filtros por jornada (Completa, Turnos 4x4, Part-Time).",
      inputs: "Acceso al módulo 'Bolsa de Empleo' desde el menú lateral del Campus.",
      process: "Carga de convocatorias laborales activas con requisitos de acreditación OS-10 y renta estimada.",
      outputs: "Catálogo de ofertas de empleo con botón de postulación en línea.",
      actor: "Estudiante / Egresado OS-10",
      priority: "Should Have (Alta)",
      acceptance: "Listado de vacantes actualizado con filtros operativos y formulario modal de postulación."
    },
    {
      code: "RF-11",
      module: "Campus Virtual LMS / Servicios",
      name: "Módulo de Postulación Curricular Directa a Ofertas Laborales",
      desc: "El estudiante podrá enviar su postulación a las vacantes laborales disponibles, cargando automáticamente sus datos de perfil (RUT, Nombre, Estado de Certificación OS-10) y registrando el interés ante la empresa reclutadora.",
      inputs: "Clic en 'Postular a esta Vacante' y confirmación en modal.",
      process: "Registro de postulación en estado 'Enviada' con timestamp y notificación de éxito.",
      outputs: "Confirmación visual en pantalla con código de seguimiento de postulación.",
      actor: "Estudiante",
      priority: "Should Have (Alta)",
      acceptance: "Bloqueo de postulaciones duplicadas para una misma vacante y confirmación inmediata."
    },
    {
      code: "RF-12",
      module: "Campus Virtual LMS / Servicios",
      name: "Catálogo de Fidelización y Capacitaciones Extras con Descuento",
      desc: "El sistema debe presentar a los estudiantes matriculados un catálogo de perfeccionamiento continuo con un 15% de descuento preferencial aplicado sobre el arancel oficial, facilitando su inscripción directa.",
      inputs: "Acceso a la vista 'Capacitaciones Extras' en el LMS.",
      process: "Cálculo automatizado del 15% de rebaja sobre el precio de lista y generación de botón de reserva.",
      outputs: "Tarjetas de cursos con precio normal tachado, precio con descuento y enlace comercial.",
      actor: "Estudiante",
      priority: "Could Have (Media)",
      acceptance: "Cálculo aritmético exacto del descuento y enlace directo con WhatsApp pre-configurado."
    },
    {
      code: "RF-13",
      module: "Panel Administrativo / Certificación",
      name: "Panel de Validación y Visto Bueno Administrativo para Diplomas",
      desc: "El sistema debe proveer al Administrador una vista para auditar a los alumnos que han cumplido con los requisitos formativos y legales, permitiendo otorgar el 'Visto Bueno' oficial para la emisión de diplomas.",
      inputs: "Selección del estudiante en estado 'Pendiente de Aprobación' y clic en 'Otorgar Visto Bueno'.",
      process: "Validación de requisitos normativos, cambio de estado a 'Aprobado & Emitido', generación del registro de certificación y disparo del flujo de despacho digital.",
      outputs: "Actualización inmediata del estado a 'Emitido' y habilitación de la descarga del diploma.",
      actor: "Administrador Académico",
      priority: "Must Have (Crítica)",
      acceptance: "Registro de fecha y hora exacta del visto bueno con actualización en tiempo real de la base de datos."
    },
    {
      code: "RF-14",
      module: "Panel Administrativo / Certificación",
      name: "Servicio de Despacho Automático de Diplomas PDF por Correo",
      desc: "Al conceder el visto bueno administrativo, el sistema debe ejecutar el despacho automatizado del diploma en formato PDF vía correo electrónico institucional, estructurando los marcadores `///CORREO REMITENTE///` hacia `///CORREO DE RECEPCION///` del alumno.",
      inputs: "Trigger automático originado por el evento de aprobación de diploma en RF-13.",
      process: "Composición del mensaje MIME con plantilla HTML institucional, adjunción del diploma PDF y envío vía SMTP / Webhook.",
      outputs: "Registro en bitácora del despacho con timestamp, estado 'Enviado' y opción de reenvío manual.",
      actor: "Sistema / Administrador",
      priority: "Must Have (Crítica)",
      acceptance: "Verificación de marcadores estandarizados en código fuente y registro en bitácora de envío."
    },
    {
      code: "RF-15",
      module: "Certificación Digital / Alumno",
      name: "Emisión de Certificado Digital de Idoneidad (Sin Calificaciones)",
      desc: "El sistema debe generar un diploma digital oficial en PDF para el alumno, acreditando su aprobación satisfactoria e idoneidad técnica conforme a la Ley N° 19.628 de Protección de Datos Personales, resguardando la confidencialidad sin exponer notas numéricas.",
      inputs: "Clic en 'Descargar Diploma' desde el Área Personal del estudiante aprobado.",
      process: "Generación vectorial del certificado con sellos SENCE, código QR de verificación, firmas de Dirección Académica y cláusula legal de idoneidad.",
      outputs: "Archivo PDF descargable e imprimible con estándar de calidad gráfica profesional.",
      actor: "Estudiante Aprobado / Empresa",
      priority: "Must Have (Crítica)",
      acceptance: "Comprobación estricta de que el documento no contiene notas numéricas, incorporando sellos y QR válidos."
    },
    {
      code: "RF-16",
      module: "Administración Global",
      name: "Consola de Administración del Sitio con 15 Categorías Desplegables",
      desc: "El sistema debe proveer una consola administrativa completa que replique la estructura de gestión de Moodle/LMS con 15 categorías expandibles (Usuarios, Cursos, Calificaciones, Extensiones, Seguridad, Servidor, Informes, etc.) y buscador en vivo.",
      inputs: "Navegación del Administrador a 'Administración del Sitio'.",
      process: "Renderizado jerárquico de categorías en acordeón con filtrado dinámico de opciones administrativas.",
      outputs: "Panel de control integral con accesos rápidos y configuración del sistema.",
      actor: "Administrador del Sistema",
      priority: "Should Have (Alta)",
      acceptance: "Despliegue de las 15 categorías con buscador en tiempo real y bloqueo para roles no administradores."
    },
    {
      code: "RF-17",
      module: "Administración Global / OTEC",
      name: "Gestión Dinámica de Participantes y Matrículas SENCE",
      desc: "El sistema debe gestionar la nómina de estudiantes matriculados en cada curso, permitiendo filtrar por estado de matrícula SENCE, buscar por RUT o nombre, y exportar la nómina de asistencia y participación para auditorías OTEC.",
      inputs: "Filtros de búsqueda o selección de curso en el módulo de participantes.",
      process: "Consulta estructurada de la tabla de participantes con cálculo de estado de avance curricular.",
      outputs: "Tabla dinámica con paginación, indicador de estado SENCE y acciones de gestión.",
      actor: "Administrador Académico / Auditor SENCE",
      priority: "Must Have (Crítica)",
      acceptance: "Despliegue dinámico de la nómina con actualización de registros en tiempo real."
    }
  ];

  /* ==========================================================================
     REQUERIMIENTOS NO FUNCIONALES FORMALES (ISO/IEC 25010)
     ========================================================================== */
  const nonFunctionalRequirements = [
    {
      code: "RNF-01",
      category: "Eficiencia de Desempeño",
      subcat: "Comportamiento Temporal",
      desc: "El tiempo de carga inicial de la aplicación (First Contentful Paint) no debe exceder los 1.5 segundos en conexiones de banda ancha estándar (10 Mbps) y redes 4G/5G. El Time to First Byte (TTFB) de los recursos estáticos no debe superar los 200 ms.",
      metric: "FCP ≤ 1.5 s | TTFB ≤ 200 ms | Lighthouse Performance ≥ 90/100"
    },
    {
      code: "RNF-02",
      category: "Confiabilidad & Disponibilidad",
      subcat: "Disponibilidad Operacional",
      desc: "La plataforma debe garantizar una disponibilidad de servicio mínima del 99.8% en régimen 24/7/365, con un tiempo máximo de indisponibilidad no planificada inferior a 1.44 horas al mes.",
      metric: "Disponibilidad (Uptime) ≥ 99.8% mensual (SLA)"
    },
    {
      code: "RNF-03",
      category: "Seguridad de la Información",
      subcat: "Confidencialidad & Privacidad",
      desc: "El sistema debe dar estricto cumplimiento a la Ley N° 19.628 sobre Protección de la Vida Privada. Las calificaciones numéricas de los alumnos tienen carácter confidencial y no deben exponerse públicamente ni en los diplomas de acreditación de idoneidad laboral.",
      metric: "0% de exposición de notas numéricas en certificados públicos y diplomas"
    },
    {
      code: "RNF-04",
      category: "Seguridad de la Información",
      subcat: "Control de Acceso (RBAC)",
      desc: "Todas las rutas y vistas administrativas deben estar resguardadas por verificación estricta de roles. Las sesiones deben expirar por inactividad tras 60 minutos y las credenciales deben procesarse bajo canales seguros HTTPS con TLS 1.3.",
      metric: "100% de rutas protegidas mediante guardas de navegación RBAC"
    },
    {
      code: "RNF-05",
      category: "Usabilidad & Accesibilidad",
      subcat: "Diseño Responsivo (UI/UX)",
      desc: "La interfaz de usuario debe adaptarse fluidamente a resoluciones móviles (desde 360px de ancho) hasta pantallas 4K, utilizando paleta cromática de alto contraste (#121316 / #0F3B7A / #0284C7) y tipografía legible 'Inter' conforme a WCAG 2.1 Nivel AA.",
      metric: "100% Responsivo | Contraste de texto ≥ 4.5:1 (WCAG AA)"
    },
    {
      code: "RNF-06",
      category: "Portabilidad & Compatibilidad",
      subcat: "Multi-Navegador",
      desc: "El sistema debe funcionar de manera idéntica y sin degradación visual ni funcional en las últimas tres versiones estables de Google Chrome, Mozilla Firefox, Microsoft Edge, Apple Safari y Opera, tanto en entornos de escritorio como móviles.",
      metric: "Compatibilidad garantizada en 100% de navegadores modernos estándar"
    },
    {
      code: "RNF-07",
      category: "Conformidad Normativa",
      subcat: "Estándar SENCE & NCh 2728",
      desc: "El diseño del sistema de información, gestión de matrículas y emisión de certificados debe satisfacer los requerimientos de auditoría y trazabilidad exigidos por el SENCE y la Norma Chilena de Calidad para OTEC NCh 2728:2015.",
      metric: "Cumplimiento del 100% de los criterios de auditoría SENCE / NCh 2728"
    },
    {
      code: "RNF-08",
      category: "Conformidad Legal",
      subcat: "Seguridad Privada OS-10",
      desc: "La estructura de los cursos de seguridad privada debe ajustarse a las disposiciones del Decreto Ley N° 3.607 y las directivas técnicas de la Prefectura de Seguridad Privada OS-10 de Carabineros de Chile.",
      metric: "Alineación total con las directivas curriculares OS-10 vigentes"
    },
    {
      code: "RNF-09",
      category: "Mantenibilidad & Arquitectura",
      subcat: "Modularidad del Código",
      desc: "El código fuente debe seguir una arquitectura modular basada en componentes desacoplados de React 19, con separación estricta entre capa de presentación, capa de estado y adaptadores de servicios externos.",
      metric: "Cohesión alta, acoplamiento bajo y 0 advertencias de linting (Oxlint/ESLint)"
    },
    {
      code: "RNF-10",
      category: "Interoperabilidad",
      subcat: "Despacho de Correo Electrónico",
      desc: "El subsistema de despacho de correos debe desacoplarse mediante marcadores estandarizados `///CORREO REMITENTE///` y `///CORREO DE RECEPCION///`, permitiendo su conexión plug-and-play con proveedores SMTP (SendGrid, AWS SES, Resend o Postfix).",
      metric: "Integración desacoplada con 100% de compatibilidad SMTP / REST"
    },
    {
      code: "RNF-11",
      category: "Portabilidad Documental",
      subcat: "Estándar PDF/A para Diplomas",
      desc: "Los certificados y diplomas generados deben respetar las directivas de formato PDF vectorial de alta fidelidad, asegurando su visualización e impresión exacta en cualquier dispositivo y visor sin pérdida de resolución.",
      metric: "Salida PDF vectorial estándar imprimible a 300 DPI"
    },
    {
      code: "RNF-12",
      category: "Gestión de Configuración",
      subcat: "Versionamiento & Trazabilidad",
      desc: "Todo el ciclo de vida del software debe estar versionado en Git mediante la convención de commits descriptivos en español, vinculados cronológicamente con la Carta Gantt maestra en Excel (`Carta_Gantt_PrevySeg_2026.xlsx`).",
      metric: "100% de trazabilidad entre commits de GitHub y WBS de la Carta Gantt"
    },
    {
      code: "RNF-13",
      category: "Integridad & Validación de Datos",
      subcat: "Sanitización de Entradas",
      desc: "Todas las entradas de datos provenientes de formularios (RUT, Nombres, Teléfonos, Correos, Textos de consulta) deben ser validadas y sanitizadas contra ataques de inyección XSS y caracteres maliciosos antes de ser procesadas o renderizadas.",
      metric: "0 vulnerabilidades de inyección XSS o Cross-Site Scripting"
    },
    {
      code: "RNF-14",
      category: "Recuperabilidad & Tolerancia a Fallos",
      subcat: "Manejo de Errores",
      desc: "El frontend debe implementar límites de error (React Error Boundaries) para capturar excepciones en tiempo de ejecución, desplegando mensajes amigables al usuario sin provocar pantallas blancas ni pérdida de estado de navegación.",
      metric: "100% de componentes críticos protegidos con Error Boundaries"
    }
  ];

  /* ==========================================================================
     CONSTRUCCIÓN DEL DOCUMENTO DOCX FORMAL
     ========================================================================== */
  const doc = new Document({
    styles: {
      default: {
        document: {
          run: {
            font: "Calibri",
            size: 20,
            color: COLOR_TEXT
          }
        }
      }
    },
    sections: [
      {
        properties: {
          page: {
            margin: { top: 1200, bottom: 1200, left: 1300, right: 1300 }
          }
        },
        headers: {
          default: new Header({
            children: [
              new Paragraph({
                alignment: AlignmentType.RIGHT,
                children: [
                  new TextRun({
                    text: "PREVYSEG OTEC • ESPECIFICACIÓN DE REQUERIMIENTOS DE SOFTWARE (ISO/IEC/IEEE 29148)",
                    size: 15,
                    color: COLOR_MUTED,
                    bold: true,
                    font: "Calibri"
                  })
                ]
              })
            ]
          })
        },
        footers: {
          default: new Footer({
            children: [
              new Paragraph({
                alignment: AlignmentType.RIGHT,
                children: [
                  new TextRun({
                    text: "Documento Confidencial • Versión 2.0 • Página ",
                    size: 15,
                    color: COLOR_MUTED
                  }),
                  new TextRun({
                    children: [PageNumber.CURRENT],
                    size: 15,
                    color: COLOR_MUTED,
                    bold: true
                  }),
                  new TextRun({
                    text: " de ",
                    size: 15,
                    color: COLOR_MUTED
                  }),
                  new TextRun({
                    children: [PageNumber.TOTAL_PAGES],
                    size: 15,
                    color: COLOR_MUTED,
                    bold: true
                  })
                ]
              })
            ]
          })
        },
        children: [

          // ==================================================================
          // PORTADA FORMAL DE INGENIERÍA DE SOFTWARE (SIN TABLAS)
          // ==================================================================
          new Paragraph({
            alignment: AlignmentType.CENTER,
            spacing: { before: 240, after: 60 },
            children: [
              new TextRun({
                text: "PREVYSEG CAPACITACIONES LTDA.",
                bold: true,
                size: 32,
                color: COLOR_PRIMARY,
                font: "Calibri"
              })
            ]
          }),
          new Paragraph({
            alignment: AlignmentType.CENTER,
            spacing: { after: 40 },
            children: [
              new TextRun({
                text: "ORGANISMO TÉCNICO DE CAPACITACIÓN (OTEC)",
                bold: true,
                size: 19,
                color: COLOR_TEAL,
                font: "Calibri"
              })
            ]
          }),
          new Paragraph({
            alignment: AlignmentType.CENTER,
            spacing: { after: 180 },
            children: [
              new TextRun({
                text: "Registro SENCE N° 1238088725 • Norma Chilena NCh 2728:2015",
                size: 17,
                color: COLOR_MUTED,
                font: "Calibri"
              })
            ]
          }),

          // Línea divisoria superior
          new Paragraph({
            alignment: AlignmentType.CENTER,
            spacing: { after: 300 },
            children: [
              new TextRun({
                text: "_______________________________________________________________________________",
                color: COLOR_BORDER,
                size: 16
              })
            ]
          }),

          // Título Central
          new Paragraph({
            alignment: AlignmentType.CENTER,
            spacing: { before: 180, after: 80 },
            children: [
              new TextRun({
                text: "ESPECIFICACIÓN DE REQUERIMIENTOS DE SOFTWARE",
                bold: true,
                size: 28,
                color: COLOR_DARK_SLATE,
                font: "Calibri"
              })
            ]
          }),
          new Paragraph({
            alignment: AlignmentType.CENTER,
            spacing: { after: 100 },
            children: [
              new TextRun({
                text: "(SRS / ERS)",
                bold: true,
                size: 24,
                color: COLOR_SECONDARY,
                font: "Calibri"
              })
            ]
          }),
          new Paragraph({
            alignment: AlignmentType.CENTER,
            spacing: { after: 160 },
            children: [
              new TextRun({
                text: "Ecosistema Digital: Portal Web Corporativo, Campus Virtual LMS,\nBolsa de Empleo Regional y Sistema de Acreditación Digital 2026",
                italics: true,
                size: 20,
                color: COLOR_MUTED,
                font: "Calibri"
              })
            ]
          }),
          new Paragraph({
            alignment: AlignmentType.CENTER,
            spacing: { after: 280 },
            children: [
              new TextRun({
                text: "Estándar de Ingeniería: ISO/IEC/IEEE 29148:2018 / IEEE Std 830-1998",
                bold: true,
                size: 17,
                color: COLOR_PRIMARY,
                font: "Calibri"
              })
            ]
          }),

          // Línea divisoria intermedia
          new Paragraph({
            alignment: AlignmentType.CENTER,
            spacing: { after: 260 },
            children: [
              new TextRun({
                text: "_______________________________________________________________________________",
                color: COLOR_BORDER,
                size: 16
              })
            ]
          }),

          // Bloque Formal de Datos de Control (Sin Tablas)
          new Paragraph({
            alignment: AlignmentType.LEFT,
            spacing: { before: 80, after: 60, line: 280 },
            indent: { left: 720 },
            children: [
              new TextRun({ text: "CÓDIGO DOCUMENTAL:        ", bold: true, color: COLOR_DARK_SLATE, size: 19 }),
              new TextRun({ text: "ERS-PREVYSEG-2026-V2.0", bold: true, color: COLOR_SECONDARY, size: 19 })
            ]
          }),
          new Paragraph({
            alignment: AlignmentType.LEFT,
            spacing: { after: 60, line: 280 },
            indent: { left: 720 },
            children: [
              new TextRun({ text: "SISTEMA / PROYECTO:          ", bold: true, color: COLOR_DARK_SLATE, size: 19 }),
              new TextRun({ text: "Plataforma Web Institucional & Campus Virtual LMS PrevySeg 2026", color: COLOR_TEXT, size: 19 })
            ]
          }),
          new Paragraph({
            alignment: AlignmentType.LEFT,
            spacing: { after: 60, line: 280 },
            indent: { left: 720 },
            children: [
              new TextRun({ text: "ORGANIZACIÓN TITULAR:    ", bold: true, color: COLOR_DARK_SLATE, size: 19 }),
              new TextRun({ text: "PrevySeg Capacitaciones Arica • Acreditación SENCE & Carabineros OS-10", color: COLOR_TEXT, size: 19 })
            ]
          }),
          new Paragraph({
            alignment: AlignmentType.LEFT,
            spacing: { after: 60, line: 280 },
            indent: { left: 720 },
            children: [
              new TextRun({ text: "RESPONSABLES TÉCNICOS:  ", bold: true, color: COLOR_DARK_SLATE, size: 19 }),
              new TextRun({ text: "Ashley Adaros (Director Académico) / Sebastián Araya (Coordinador OS-10 / TI)", color: COLOR_TEXT, size: 19 })
            ]
          }),
          new Paragraph({
            alignment: AlignmentType.LEFT,
            spacing: { after: 60, line: 280 },
            indent: { left: 720 },
            children: [
              new TextRun({ text: "ESTADO DE REVISIÓN:          ", bold: true, color: COLOR_DARK_SLATE, size: 19 }),
              new TextRun({ text: "Aprobado para Implementación y Auditoría de Calidad", bold: true, color: COLOR_TEAL, size: 19 })
            ]
          }),
          new Paragraph({
            alignment: AlignmentType.LEFT,
            spacing: { after: 200, line: 280 },
            indent: { left: 720 },
            children: [
              new TextRun({ text: "FECHA Y LUGAR:                    ", bold: true, color: COLOR_DARK_SLATE, size: 19 }),
              new TextRun({ text: "Septiembre de 2026 • Arica, Chile", color: COLOR_TEXT, size: 19 })
            ]
          }),

          // Salto de página para que el contenido inicie en página 2
          new Paragraph({
            children: [ new PageBreak() ]
          }),

          // ==================================================================
          // HISTORIAL DE VERSIONES DEL DOCUMENTO
          // ==================================================================
          createHeading2("Historial de Control de Versiones del Documento"),
          new Table({
            width: { size: 100, type: WidthType.PERCENTAGE },
            alignment: AlignmentType.CENTER,
            rows: [
              new TableRow({
                children: [
                  createCell("Versión", { isHeader: true, width: 14 }),
                  createCell("Fecha", { isHeader: true, width: 14 }),
                  createCell("Autor / Rol", { isHeader: true, width: 22 }),
                  createCell("Descripción Detallada del Cambio", { isHeader: true, width: 36 }),
                  createCell("Aprobador", { isHeader: true, width: 14 })
                ]
              }),
              new TableRow({
                children: [
                  createCell("v1.0.0", { bold: true }),
                  createCell("01/09/2026"),
                  createCell("Equipo Frontend"),
                  createCell("Levantamiento inicial de requerimientos para el portal web corporativo y vitrina de cursos."),
                  createCell("PM / OTEC")
                ]
              }),
              new TableRow({
                children: [
                  createCell("v1.5.0", { bold: true, bgColor: COLOR_BG_LIGHT }),
                  createCell("08/09/2026", { bgColor: COLOR_BG_LIGHT }),
                  createCell("Equipo Fullstack", { bgColor: COLOR_BG_LIGHT }),
                  createCell("Especificación funcional del Campus Virtual LMS, autenticación con RUT y roles RBAC.", { bgColor: COLOR_BG_LIGHT }),
                  createCell("Dir. Académica", { bgColor: COLOR_BG_LIGHT })
                ]
              }),
              new TableRow({
                children: [
                  createCell("v1.9.0", { bold: true }),
                  createCell("15/09/2026"),
                  createCell("Ingeniería de Software"),
                  createCell("Incorporación de Bolsa de Empleo Regional de Arica, Fidelización y Panel de Visto Bueno Administrativo."),
                  createCell("Dir. Académica")
                ]
              }),
              new TableRow({
                children: [
                  createCell("v2.0.0", { bold: true, bgColor: "EFF6FF", textColor: COLOR_SECONDARY }),
                  createCell("22/09/2026", { bgColor: "EFF6FF" }),
                  createCell("Ingeniero Líder TI", { bgColor: "EFF6FF" }),
                  createCell("Reescritura formal integral bajo estándar ISO/IEC/IEEE 29148:2018. Depuración a 6 cursos SENCE, eliminación de componentes redundantes, formalización de despacho por correo y confidencialidad Ley 19.628.", { bgColor: "EFF6FF" }),
                  createCell("Dirección OTEC", { bgColor: "EFF6FF", bold: true, textColor: COLOR_PRIMARY })
                ]
              })
            ]
          }),

          new Paragraph({ spacing: { before: 300, after: 150 } }),

          // ==================================================================
          // SECCIÓN 1: INTRODUCCIÓN Y FUNDAMENTOS DE INGENIERÍA
          // ==================================================================
          createHeading1("1. Introducción y Fundamentos del Documento"),
          
          createHeading2("1.1 Propósito"),
          createParagraph("El presente documento de Especificación de Requerimientos de Software (SRS / ERS) tiene como finalidad formalizar, delimitar y describir de manera rigurosa y verificable la totalidad de las necesidades funcionales, restricciones técnicas y atributos de calidad de la plataforma web y campus virtual del Organismo Técnico de Capacitación (OTEC) PrevySeg Ltda."),
          createParagraph("Este documento constituye el contrato técnico y base de ingeniería para el desarrollo, pruebas de aseguramiento de calidad (QA), auditorías de certificación SENCE / NCh 2728:2015 y despliegue continuo del sistema."),

          createHeading2("1.2 Alcance del Producto de Software"),
          createParagraph("La solución de software desarrollada para PrevySeg abarca un ecosistema digital compuesto por cuatro subsistemas integrados:"),
          createBullet("1. Portal Web Corporativo y Vitrina SENCE:", "Plataforma pública de difusión institucional, catálogo depurado de los 6 programas activos autorizados, calculadora informativa de tramos de Franquicia Tributaria SENCE e integración directa de cotizaciones comerciales a WhatsApp Business."),
          createBullet("2. Núcleo de Seguridad y Control de Acceso (RBAC):", "Mecanismo de autenticación estricta basado en RUT chileno con segregación de privilegios entre los roles ESTUDIANTE y ADMINISTRADOR."),
          createBullet("3. Campus Virtual del Estudiante (LMS Alumno):", "Entorno e-learning con panel de control, seguimiento de avance curricular por lecciones, bolsa de empleo regional en Arica con postulación en línea, catálogo de cursos de especialización con descuento y descarga de copias digitales de diplomas."),
          createBullet("4. Consola de Administración y Emisión de Diplomas (LMS Admin):", "Módulo de gestión académica con 15 categorías administrativas, nómina dinámica de participantes y panel de validación con 'Visto Bueno' para la emisión y despacho automático de diplomas en PDF por correo electrónico."),

          createHeading2("1.3 Glosario de Términos y Acrónimos"),
          createBullet("OTEC:", "Organismo Técnico de Capacitación, acreditado ante SENCE bajo la Norma Chilena NCh 2728:2015."),
          createBullet("SENCE:", "Servicio Nacional de Capacitación y Empleo de la República de Chile."),
          createBullet("OS-10:", "Prefectura de Seguridad Privada OS-10 de Carabineros de Chile, autoridad fiscalizadora del rubro."),
          createBullet("RBAC:", "Role-Based Access Control (Control de Acceso Basado en Roles)."),
          createBullet("SRS / ERS:", "Software Requirements Specification / Especificación de Requerimientos de Software."),
          createBullet("SPA:", "Single-Page Application (Aplicación web de página única)."),
          createBullet("UTM:", "Unidad Tributaria Mensual, parámetro monetario oficial utilizado en los tramos SENCE."),
          createBullet("PDF/A:", "Formato estándar internacional ISO 19005 para preservación digital de documentos a largo plazo."),
          createBullet("SLA:", "Service Level Agreement (Acuerdo de Nivel de Servicio)."),

          createHeading2("1.4 Marco Regulatorio y Referencias Normativas"),
          createParagraph("El diseño de requerimientos y la arquitectura del sistema dan estricto cumplimiento al marco legal vigente en la República de Chile:"),
          createBullet("• Ley N° 19.518:", "Estatuto de Capacitación y Empleo (Franquicia Tributaria SENCE)."),
          createBullet("• Decreto Ley N° 3.607 y D.S. N° 93:", "Normativa de Seguridad Privada y acreditaciones OS-10 de Carabineros."),
          createBullet("• Norma Chilena NCh 2728:2015:", "Sistema de Gestión de Calidad para Organismos Técnicos de Capacitación."),
          createBullet("• Ley N° 19.628:", "Protección de la Vida Privada y Datos Personales (Confidencialidad estricta de notas de los alumnos)."),
          createBullet("• ISO/IEC/IEEE 29148:2018:", "Systems and software engineering — Life cycle processes — Requirements engineering."),

          new Paragraph({ spacing: { before: 240, after: 120 } }),

          // ==================================================================
          // SECCIÓN 2: DESCRIPCIÓN GENERAL Y ARQUITECTURA
          // ==================================================================
          createHeading1("2. Descripción General del Sistema"),

          createHeading2("2.1 Perspectiva del Producto y Arquitectura de Capas"),
          createParagraph("La solución se estructura bajo una arquitectura de Cliente Ligero (Single-Page Application) construida en React 19 y empaquetada con Vite, garantizando un renderizado ultra-rápido, desacoplamiento de componentes y alta mantenibilidad."),
          createBullet("• Capa de Presentación (UI/UX):", "Componentes atómicos estilizados con Tailwind CSS v4, soporte para modo oscuro (#121316), glassmorphism y microinteracciones fluidas con Framer Motion."),
          createBullet("• Capa de Lógica de Negocio y Estado:", "Gestión de estado reactivo mediante React Hooks (`useState`, `useEffect`, `useMemo`), validación de reglas de negocio, cálculo de tramos SENCE y verificación algorítmica de RUT."),
          createBullet("• Capa de Integración Externa:", "Conexión a endpoints de WhatsApp Business API, servicios de generación de documentos PDF y marcadores estandarizados para despacho SMTP de correos electrónicos (`///CORREO REMITENTE///` a `///CORREO DE RECEPCION///`)."),

          createHeading2("2.2 Matriz de Actores y Caracterización de Usuarios"),
          new Table({
            width: { size: 100, type: WidthType.PERCENTAGE },
            alignment: AlignmentType.CENTER,
            rows: [
              new TableRow({
                children: [
                  createCell("Rol / Actor", { isHeader: true, width: 22 }),
                  createCell("Perfil y Competencias", { isHeader: true, width: 28 }),
                  createCell("Responsabilidades y Objetivos en el Sistema", { isHeader: true, width: 50 })
                ]
              }),
              new TableRow({
                children: [
                  createCell("Administrador Académico", { bold: true }),
                  createCell("Personal de gestión OTEC con conocimientos informáticos y normativos."),
                  createCell("Auditar el cumplimiento formativo de los alumnos, otorgar el Visto Bueno administrativo, emitir diplomas oficiales, gestionar participantes y configurar el LMS.")
                ]
              }),
              new TableRow({
                children: [
                  createCell("Estudiante / Guardia OS-10", { bold: true, bgColor: COLOR_BG_LIGHT }),
                  createCell("Usuario matriculado en cursos de seguridad privada o especializaciones.", { bgColor: COLOR_BG_LIGHT }),
                  createCell("Acceder al Campus Virtual, consultar temarios, postular a la bolsa de empleo regional de Arica y descargar su copia oficial del diploma de idoneidad.", { bgColor: COLOR_BG_LIGHT })
                ]
              }),
              new TableRow({
                children: [
                  createCell("Empresa / Cliente Corporativo", { bold: true }),
                  createCell("Encargados de RRHH, capacitación y prevención de riesgos de empresas."),
                  createCell("Consultar la oferta de 6 cursos SENCE, revisar los tramos de franquicia tributaria y solicitar cotizaciones masivas para sus trabajadores vía WhatsApp.")
                ]
              }),
              new TableRow({
                children: [
                  createCell("Público General / Postulante", { bold: true, bgColor: COLOR_BG_LIGHT }),
                  createCell("Personas naturales interesadas en certificar su credencial OS-10.", { bgColor: COLOR_BG_LIGHT }),
                  createCell("Buscar información académica, consultar artículos técnicos y contactar a la academia para formalizar matrícula.", { bgColor: COLOR_BG_LIGHT })
                ]
              })
            ]
          }),

          createHeading2("2.3 Restricciones de Diseño e Implementación"),
          createBullet("1. Confidencialidad Absoluta de Notas (Ley 19.628):", "Los certificados emitidos por el sistema deben certificar la condición de 'Capacitado e Idóneo' sin exhibir bajo ninguna circunstancia calificaciones numéricas."),
          createBullet("2. Catálogo Oficial Depurado:", "El catálogo público debe restringirse estrictamente a los 6 cursos autorizados vigentes, eliminando ofertas no regularizadas ante SENCE."),
          createBullet("3. Despacho Desacoplado de Correos:", "El sistema debe utilizar marcadores tipográficos estandarizados (`///CORREO REMITENTE///` y `///CORREO DE RECEPCION///`) para posibilitar su enlace inmediato con servidores SMTP o webhooks transaccionales."),

          new Paragraph({ spacing: { before: 240, after: 120 } }),

          // ==================================================================
          // SECCIÓN 3: ESPECIFICACIÓN DE REQUERIMIENTOS FUNCIONALES (RF)
          // ==================================================================
          createHeading1("3. Especificación Detallada de Requerimientos Funcionales (RF)"),
          createParagraph("A continuación se detallan los 17 Requerimientos Funcionales que rigen el comportamiento algorítmico y operativo del software:"),

          // Renderizado de cada RF con su ficha técnica de ingeniería
          ...functionalRequirements.flatMap((rf, index) => [
            createHeading2(`${rf.code}: ${rf.name}`),
            new Table({
              width: { size: 100, type: WidthType.PERCENTAGE },
              alignment: AlignmentType.CENTER,
              rows: [
                new TableRow({
                  children: [
                    createCell("CÓDIGO Y MÓDULO:", { isHeader: true, width: 28 }),
                    createCell(`${rf.code} — ${rf.module}`, { width: 72, bold: true, textColor: COLOR_SECONDARY })
                  ]
                }),
                new TableRow({
                  children: [
                    createCell("PRIORIDAD (MoSCoW):", { isHeader: true }),
                    createCell(rf.priority, { bold: true, textColor: rf.priority.includes("Crítica") ? COLOR_CRITICAL : rf.priority.includes("Alta") ? COLOR_HIGH : COLOR_MEDIUM })
                  ]
                }),
                new TableRow({
                  children: [
                    createCell("ACTOR PRINCIPAL:", { isHeader: true }),
                    createCell(rf.actor)
                  ]
                }),
                new TableRow({
                  children: [
                    createCell("DESCRIPCIÓN Y REGLA DE NEGOCIO:", { isHeader: true }),
                    createCell(rf.desc)
                  ]
                }),
                new TableRow({
                  children: [
                    createCell("ENTRADAS (INPUTS):", { isHeader: true }),
                    createCell(rf.inputs, { italic: true })
                  ]
                }),
                new TableRow({
                  children: [
                    createCell("PROCESAMIENTO:", { isHeader: true }),
                    createCell(rf.process)
                  ]
                }),
                new TableRow({
                  children: [
                    createCell("SALIDAS (OUTPUTS):", { isHeader: true }),
                    createCell(rf.outputs, { bold: true })
                  ]
                }),
                new TableRow({
                  children: [
                    createCell("CRITERIO DE ACEPTACIÓN / QA:", { isHeader: true, bgColor: COLOR_BG_SUBHEADER }),
                    createCell(rf.acceptance, { bgColor: COLOR_BG_LIGHT, bold: true, textColor: COLOR_TEAL })
                  ]
                })
              ]
            }),
            new Paragraph({ spacing: { before: 100, after: 120 } })
          ]),

          new Paragraph({ spacing: { before: 240, after: 120 } }),

          // ==================================================================
          // SECCIÓN 4: ESPECIFICACIÓN DE REQUERIMIENTOS NO FUNCIONALES (RNF)
          // ==================================================================
          createHeading1("4. Especificación de Requerimientos No Funcionales (ISO/IEC 25010)"),
          createParagraph("Los Requerimientos No Funcionales establecen las propiedades emergentes, directrices de calidad y restricciones de ingeniería del sistema:"),

          new Table({
            width: { size: 100, type: WidthType.PERCENTAGE },
            alignment: AlignmentType.CENTER,
            rows: [
              new TableRow({
                children: [
                  createCell("Código", { isHeader: true, width: 10 }),
                  createCell("Categoría ISO 25010", { isHeader: true, width: 22 }),
                  createCell("Descripción y Criterio de Calidad", { isHeader: true, width: 44 }),
                  createCell("Métrica / Umbral de Aceptación", { isHeader: true, width: 24 })
                ]
              }),
              ...nonFunctionalRequirements.map((rnf, idx) => {
                const bg = idx % 2 === 0 ? "FFFFFF" : COLOR_BG_LIGHT;
                return new TableRow({
                  children: [
                    createCell(rnf.code, { bgColor: bg, bold: true, textColor: COLOR_PRIMARY }),
                    createCell(`${rnf.category}\n(${rnf.subcat})`, { bgColor: bg, bold: true }),
                    createCell(rnf.desc, { bgColor: bg }),
                    createCell(rnf.metric, { bgColor: bg, bold: true, textColor: COLOR_SECONDARY })
                  ]
                });
              })
            ]
          }),

          new Paragraph({ spacing: { before: 300, after: 150 } }),

          // ==================================================================
          // SECCIÓN 5: MATRIZ DE TRAZABILIDAD DE REQUERIMIENTOS (RTM)
          // ==================================================================
          createHeading1("5. Matriz de Trazabilidad de Requerimientos (RTM)"),
          createParagraph("La Matriz de Trazabilidad asegura la correspondencia unívoca entre los requerimientos especificados, los módulos del sistema y los componentes implementados en el código fuente:"),

          new Table({
            width: { size: 100, type: WidthType.PERCENTAGE },
            alignment: AlignmentType.CENTER,
            rows: [
              new TableRow({
                children: [
                  createCell("Requerimiento", { isHeader: true, width: 14 }),
                  createCell("Módulo / Subsistema", { isHeader: true, width: 24 }),
                  createCell("Archivo / Componente en Repositorio", { isHeader: true, width: 34 }),
                  createCell("Método de Verificación", { isHeader: true, width: 28 })
                ]
              }),
              new TableRow({
                children: [
                  createCell("RF-01, RF-02", { bold: true }),
                  createCell("Portal Público"),
                  createCell("src/components/Services.jsx"),
                  createCell("Prueba funcional UI de catálogo y filtros")
                ]
              }),
              new TableRow({
                children: [
                  createCell("RF-03", { bold: true, bgColor: COLOR_BG_LIGHT }),
                  createCell("Comercial", { bgColor: COLOR_BG_LIGHT }),
                  createCell("src/components/ContactFooter.jsx, Modals.jsx", { bgColor: COLOR_BG_LIGHT }),
                  createCell("Prueba de integración URI WhatsApp", { bgColor: COLOR_BG_LIGHT })
                ]
              }),
              new TableRow({
                children: [
                  createCell("RF-04", { bold: true }),
                  createCell("Franquicia SENCE"),
                  createCell("src/components/SenceTramosSection.jsx"),
                  createCell("Inspección visual de tramos normativos")
                ]
              }),
              new TableRow({
                children: [
                  createCell("RF-07", { bold: true, bgColor: COLOR_BG_LIGHT }),
                  createCell("Seguridad / Auth", { bgColor: COLOR_BG_LIGHT }),
                  createCell("src/lms/LMSLayout.jsx, Modals.jsx", { bgColor: COLOR_BG_LIGHT }),
                  createCell("Prueba de penetración de roles RBAC", { bgColor: COLOR_BG_LIGHT })
                ]
              }),
              new TableRow({
                children: [
                  createCell("RF-08, RF-09", { bold: true }),
                  createCell("Campus Alumno"),
                  createCell("src/lms/views/PersonalAreaView.jsx, MyCoursesView.jsx"),
                  createCell("Prueba de cálculo de progreso curricular")
                ]
              }),
              new TableRow({
                children: [
                  createCell("RF-10, RF-11", { bold: true, bgColor: COLOR_BG_LIGHT }),
                  createCell("Bolsa de Empleo", { bgColor: COLOR_BG_LIGHT }),
                  createCell("src/lms/views/JobBoardView.jsx", { bgColor: COLOR_BG_LIGHT }),
                  createCell("Prueba de flujo de postulación laboral", { bgColor: COLOR_BG_LIGHT })
                ]
              }),
              new TableRow({
                children: [
                  createCell("RF-13, RF-14", { bold: true }),
                  createCell("Certificación Admin"),
                  createCell("src/lms/views/CertificateApprovalView.jsx"),
                  createCell("Prueba de Visto Bueno y disparo de email")
                ]
              }),
              new TableRow({
                children: [
                  createCell("RF-15", { bold: true, bgColor: COLOR_BG_LIGHT }),
                  createCell("Diploma Oficial", { bgColor: COLOR_BG_LIGHT }),
                  createCell("src/lms/views/CertificateApprovalView.jsx"),
                  createCell("Auditoría de confidencialidad sin notas", { bgColor: COLOR_BG_LIGHT })
                ]
              }),
              new TableRow({
                children: [
                  createCell("RF-16, RF-17", { bold: true }),
                  createCell("Admin Global"),
                  createCell("src/lms/views/SiteAdminView.jsx"),
                  createCell("Prueba de gestión de participantes y 15 cat.")
                ]
              })
            ]
          }),

          new Paragraph({ spacing: { before: 300, after: 150 } }),

          // ==================================================================
          // SECCIÓN 6: CUADRO FORMAL DE APROBACIÓN Y FIRMAS
          // ==================================================================
          createHeading1("6. Aprobación Formal y Validación de Ingeniería"),
          createParagraph("El presente documento de Especificación de Requerimientos de Software ha sido revisado y aprobado formalmente por los responsables técnicos y directivos del proyecto:"),

          new Table({
            width: { size: 100, type: WidthType.PERCENTAGE },
            alignment: AlignmentType.CENTER,
            rows: [
              new TableRow({
                children: [
                  createCell("ROL / CARGO", { isHeader: true, width: 33 }),
                  createCell("NOMBRE Y FIRMA", { isHeader: true, width: 34 }),
                  createCell("FECHA Y ESTADO", { isHeader: true, width: 33 })
                ]
              }),
              new TableRow({
                children: [
                  createCell("Ingeniero Líder de Software / TI", { bold: true }),
                  createCell("Sebastián Araya\nIngeniería en Informática"),
                  createCell("Septiembre 2026\n[ APROBADO TÉCNICAMENTE ]", { textColor: COLOR_TEAL, bold: true })
                ]
              }),
              new TableRow({
                children: [
                  createCell("Director Académico PrevySeg", { bold: true, bgColor: COLOR_BG_LIGHT }),
                  createCell("Ashley Adaros\nDirección OTEC PrevySeg", { bgColor: COLOR_BG_LIGHT }),
                  createCell("Septiembre 2026\n[ APROBADO INSTITUCIONAL ]", { bgColor: COLOR_BG_LIGHT, textColor: COLOR_PRIMARY, bold: true })
                ]
              }),
              new TableRow({
                children: [
                  createCell("Coordinación de Calidad NCh 2728 / SENCE", { bold: true }),
                  createCell("Comité de Aseguramiento de la Calidad"),
                  createCell("Septiembre 2026\n[ CONFORME AUDITORÍA ]", { textColor: COLOR_SECONDARY, bold: true })
                ]
              })
            ]
          }),

          new Paragraph({ spacing: { before: 200, after: 100 } }),
          createParagraph("© 2026 PrevySeg Capacitaciones Ltda. Arica, Chile. Todos los derechos reservados. Documento de Ingeniería bajo estándar ISO/IEC/IEEE 29148:2018.", { italic: true, size: 16, color: COLOR_MUTED, align: AlignmentType.CENTER })
        ]
      }
    ]
  });

  const buffer = await Packer.toBuffer(doc);
  const outputPath = path.join(__dirname, '..', 'Requerimientos_Funcionales_y_No_Funcionales_PrevySeg.docx');
  fs.writeFileSync(outputPath, buffer);
  console.log('Documento Word de Requerimientos generado con éxito en:', outputPath);
}

createFormalEngineeringRequirementsDoc().catch(console.error);
