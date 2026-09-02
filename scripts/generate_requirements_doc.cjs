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
  NumberFormat
} = require('docx');

async function createRequirementsDoc() {
  const primaryColor = "0284C7"; // Cyan/Blue PrevySeg
  const secondaryColor = "00C2B2"; // Teal PrevySeg
  const darkBg = "121316";
  const lightGrayBg = "F1F5F9";
  const headerBg = "0F172A"; // Slate 900
  const borderColor = "CBD5E1";

  // Table cell helper
  const createCell = (text, options = {}) => {
    const { 
      isHeader = false, 
      width = null, 
      bgColor = isHeader ? headerBg : null, 
      textColor = isHeader ? "FFFFFF" : "0F172A",
      bold = isHeader,
      align = AlignmentType.LEFT,
      colSpan = 1,
      rowSpan = 1
    } = options;

    return new TableCell({
      width: width ? { size: width, type: WidthType.PERCENTAGE } : undefined,
      shading: bgColor ? { fill: bgColor, type: ShadingType.CLEAR } : undefined,
      columnSpan: colSpan,
      rowSpan: rowSpan,
      margins: { top: 120, bottom: 120, left: 150, right: 150 },
      borders: {
        top: { style: BorderStyle.SINGLE, size: 1, color: borderColor },
        bottom: { style: BorderStyle.SINGLE, size: 1, color: borderColor },
        left: { style: BorderStyle.SINGLE, size: 1, color: borderColor },
        right: { style: BorderStyle.SINGLE, size: 1, color: borderColor },
      },
      children: [
        new Paragraph({
          alignment: align,
          spacing: { line: 240 },
          children: [
            new TextRun({
              text: text,
              bold: bold,
              color: textColor,
              size: isHeader ? 19 : 18,
              font: "Calibri"
            })
          ]
        })
      ]
    });
  };

  // Heading helper
  const createHeading = (title, level = HeadingLevel.HEADING_1) => {
    return new Paragraph({
      heading: level,
      spacing: { before: 300, after: 150 },
      children: [
        new TextRun({
          text: title,
          bold: true,
          color: primaryColor,
          size: level === HeadingLevel.HEADING_1 ? 32 : level === HeadingLevel.HEADING_2 ? 26 : 22,
          font: "Calibri"
        })
      ]
    });
  };

  const createParagraph = (text, bold = false, italic = false, size = 20) => {
    return new Paragraph({
      spacing: { after: 120, line: 276 },
      children: [
        new TextRun({
          text: text,
          bold: bold,
          italics: italic,
          color: "334155",
          size: size,
          font: "Calibri"
        })
      ]
    });
  };

  // Requirements Data
  const functionalRequirements = [
    {
      code: "RF-01",
      name: "Catálogo Oficial de Cursos y Especializaciones",
      desc: "El sistema debe desplegar la oferta académica compuesta por los 11 programas oficiales autorizados por SENCE y OS-10 de Carabineros, presentando tarjetas visuales con portadas geométricas/fotográficas, categoría, títulos oficiales sin descripciones extensas y arancel al pie.",
      priority: "Alta",
      actor: "Público General / Empresas",
      acceptance: "Renderizado responsivo en grilla de los 11 cursos con datos de precio y categoría."
    },
    {
      code: "RF-02",
      name: "Filtrado Dinámico de Cursos por Categoría",
      desc: "El usuario podrá filtrar el catálogo según las categorías: Seguridad Privada, Agrícola, Sistemas Internos, Asistencias y Originales, actualizando la vista de inmediato sin recargar la página.",
      priority: "Media",
      actor: "Público General / Empresas",
      acceptance: "Filtrado instantáneo en cliente (React) al hacer clic en las píldoras de categoría."
    },
    {
      code: "RF-03",
      name: "Modal de Contacto y Matrícula con WhatsApp",
      desc: "El sistema debe permitir abrir un modal de inscripción pre-cargado con el curso seleccionado, permitiendo al usuario enviar un mensaje pre-formateado al canal de WhatsApp oficial (+56 9 7869 1869).",
      priority: "Alta",
      actor: "Público General / Empresas",
      acceptance: "Apertura de ventana de WhatsApp Web / App con el mensaje y datos del curso seleccionado."
    },
    {
      code: "RF-04",
      name: "Sección Informativa de Franquicia Tributaria SENCE",
      desc: "La página principal debe exponer los 4 tramos normativos de Franquicia SENCE (100% SENCE Hasta 25 UTM, 50% SENCE 25 a 50 UTM, 15% SENCE Sobre 50 UTM, Pago Directo Desc. Volumen), sin mostrar precios numéricos variables.",
      priority: "Alta",
      actor: "Empresas / Personas",
      acceptance: "Visualización de las 4 tarjetas con su descripción normativa y acreditación OTEC NCh 2728."
    },
    {
      code: "RF-05",
      name: "Buscador Global en Tiempo Real",
      desc: "Modal de búsqueda accesible desde el encabezado que permita buscar cursos por título, código SENCE o área formativa con resultados interactivos.",
      priority: "Media",
      actor: "Público General",
      acceptance: "Filtrado en vivo en modal con enlaces directos para solicitar inscripción."
    },
    {
      code: "RF-06",
      name: "Visor de Artículos Técnicos y Noticias",
      desc: "Sección de experiencias con tarjetas de artículos sobre seguridad física, portuaria y primeros auxilios, abriendo modales de lectura extendida.",
      priority: "Baja",
      actor: "Público General",
      acceptance: "Lectura completa en modal con botón de consulta comercial relacionado."
    },
    {
      code: "RF-07",
      name: "Autenticación Segura y Control de Acceso (RBAC)",
      desc: "Módulo de inicio de sesión con validación de RUT y contraseña, direccionando al usuario a su rol correspondiente (ADMINISTRADOR vs ESTUDIANTE).",
      priority: "Crítica",
      actor: "Administradores / Alumnos",
      acceptance: "Validación de credenciales y renderizado condicional del layout LMS según rol."
    },
    {
      code: "RF-08",
      name: "Área Personal del Estudiante",
      desc: "Panel de control del alumno con línea de tiempo académica, estado de matrícula SENCE activa 2026, accesos rápidos a cursos recientes y avisos de diplomas emitidos.",
      priority: "Alta",
      actor: "Estudiante",
      acceptance: "Visualización del porcentaje de avance del alumno y banner de certificado si está aprobado."
    },
    {
      code: "RF-09",
      name: "Aula Virtual Interactiva y Reproductor de Clases",
      desc: "Entorno de aprendizaje con reproductor multimedia de clases HD, barra de progreso por lección, temario estructurado en acordeón de 4 módulos y pestañas de recursos.",
      priority: "Crítica",
      actor: "Estudiante",
      acceptance: "Navegación interactiva por lecciones y cálculo de porcentaje completado en tiempo real."
    },
    {
      code: "RF-10",
      name: "Descarga de Material y Manuales de Estudio",
      desc: "Pestaña dentro del aula virtual para descargar manuales oficiales en PDF (Manual OS-10 Edición 2026, Guía de Emergencias y Protocolos de Seguridad).",
      priority: "Media",
      actor: "Estudiante",
      acceptance: "Descarga directa de documentos oficiales en formato PDF."
    },
    {
      code: "RF-11",
      name: "Simulador de Examen Teórico OS-10",
      desc: "Evaluación interactiva con formato oficial de Carabineros de Chile, temporizador de 15 minutos, selección múltiple y retroalimentación inmediata.",
      priority: "Alta",
      actor: "Estudiante",
      acceptance: "Evaluación y retroalimentación privada y confidencial para el estudiante."
    },
    {
      code: "RF-12",
      name: "Copia Digital de Diploma Oficial para el Estudiante",
      desc: "El estudiante podrá visualizar y descargar una copia oficial de su certificado digital emitido por Dirección Académica, acreditando que cumplió el programa y está debidamente capacitado, resguardando la confidencialidad (sin notas numéricas).",
      priority: "Alta",
      actor: "Estudiante",
      acceptance: "Diploma con sellos SENCE, código QR, firma digital y botón de descarga en PDF."
    },
    {
      code: "RF-13",
      name: "Catálogo de Capacitaciones Extras con Descuento Alumno",
      desc: "Sección exclusiva para estudiantes con los 11 cursos oficiales aplicando un 15% de descuento preferencial de fidelización con botón de inscripción.",
      priority: "Media",
      actor: "Estudiante",
      acceptance: "Cálculo automático de aranceles con 15% de descuento y contacto directo."
    },
    {
      code: "RF-14",
      name: "Bolsa de Empleo y Postulaciones Regionales",
      desc: "Plataforma de intermediación laboral con ofertas de seguridad en Arica, filtro por jornada y formulario de postulación curricular en línea.",
      priority: "Media",
      actor: "Estudiante",
      acceptance: "Postulación con datos del perfil del alumno y confirmación de recepción."
    },
    {
      code: "RF-15",
      name: "Panel Administrativo de Visto Bueno y Emisión de Diplomas",
      desc: "Vista exclusiva para administradores donde se listan alumnos con cursos completados y requisitos legales validados, permitiendo otorgar el 'Visto Bueno' formal.",
      priority: "Crítica",
      actor: "Administrador",
      acceptance: "Cambio de estado a 'Aprobado & Emitido' y emisión inmediata del certificado digital."
    },
    {
      code: "RF-16",
      name: "Despacho Automático de Diplomas por Correo Electrónico",
      desc: "Al otorgar el visto bueno, el sistema despachará automáticamente un correo electrónico con el diploma en PDF adjunto desde '///CORREO REMITENTE///' hacia '///CORREO DE RECEPCION///' del alumno.",
      priority: "Alta",
      actor: "Sistema / Administrador",
      acceptance: "Ejecución del servicio de correo con registro de hora exacta y botón de reenvío."
    },
    {
      code: "RF-17",
      name: "Administración del Sitio, Usuarios y Matrículas",
      desc: "Módulo administrativo para gestionar participantes, bancos de preguntas, bancos de contenidos, informes de asistencia SENCE y configuración del campus.",
      priority: "Alta",
      actor: "Administrador",
      acceptance: "Edición en tiempo real de registros y descarga de informes de gestión."
    }
  ];

  const nonFunctionalRequirements = [
    {
      code: "RNF-01",
      name: "Rendimiento y Tiempo de Respuesta",
      category: "Eficiencia & Rendimiento",
      desc: "El tiempo de carga inicial del portal público y campus virtual no debe superar los 1.5 segundos en conexiones de banda ancha y redes 4G/5G. Las transiciones entre vistas deben ser instantáneas.",
      metric: "Tiempo de carga < 1.5s / TTFB < 200ms"
    },
    {
      code: "RNF-02",
      name: "Disponibilidad y Confiabilidad",
      category: "Disponibilidad",
      desc: "La plataforma debe garantizar una disponibilidad operativa mínima del 99.8% mensual (24/7/365), permitiendo a los alumnos acceder a sus clases y diplomas en cualquier horario.",
      metric: "Uptime ≥ 99.8%"
    },
    {
      code: "RNF-03",
      name: "Confidencialidad y Protección de Datos",
      category: "Seguridad & Privacidad",
      desc: "Estricta confidencialidad de puntajes y datos personales conforme a la Ley N° 19.628. Los diplomas emitidos no expondrán calificaciones numéricas, certificando únicamente la idoneidad y capacitación satisfactoria.",
      metric: "Cero exposición de notas numéricas en certificados"
    },
    {
      code: "RNF-04",
      name: "Control de Acceso y Seguridad de Sesiones",
      category: "Seguridad",
      desc: "Las rutas y vistas de administración deben estar protegidas mediante verificación estricta de roles (RBAC). No se permitirá acceso no autenticado ni escalamiento de privilegios de alumnos.",
      metric: "Aislamiento 100% de vistas administrativas"
    },
    {
      code: "RNF-05",
      name: "Usabilidad y Diseño Responsivo (UI/UX)",
      category: "Usabilidad",
      desc: "Interfaz adaptativa con paleta de alto contraste en modo oscuro (#18191c), tipografía legible 'Inter' y navegación fluida garantizada en smartphones, tablets, laptops y computadores de escritorio.",
      metric: "100% Responsive Design (Mobile First & Desktop)"
    },
    {
      code: "RNF-06",
      name: "Compatibilidad Multi-Navegador",
      category: "Compatibilidad",
      desc: "Compatibilidad total y renderizado uniforme en Google Chrome, Microsoft Edge, Mozilla Firefox, Apple Safari y Opera en sistemas operativos Windows, macOS, Android e iOS.",
      metric: "Soporte de navegadores modernos (últimas 3 versiones)"
    },
    {
      code: "RNF-07",
      name: "Cumplimiento Normativo SENCE y NCh 2728",
      category: "Normativa & Calidad",
      desc: "Estructura académica, acreditación de asistencia y trazabilidad conforme a los estándares exigidos por el Servicio Nacional de Capacitación y Empleo (SENCE) y la norma de calidad NCh 2728:2015.",
      metric: "Alineación 100% con directivas SENCE OTEC"
    },
    {
      code: "RNF-08",
      name: "Conformidad con Normativa OS-10 Carabineros",
      category: "Legal & Seguridad Privada",
      desc: "Temarios, manuales y simuladores alineados estrictamente al Decreto Ley N° 3.607 y resoluciones de la Zona de Seguridad Privada OS-10 de Carabineros de Chile.",
      metric: "Cumplimiento del 100% del programa oficial OS-10"
    },
    {
      code: "RNF-09",
      name: "Modularidad y Arquitectura Desacoplada",
      category: "Mantenibilidad",
      desc: "Código estructurado en componentes modulares React (Vite), con separación clara entre lógica de negocio, interfaz de usuario y marcadores listos para conexión de base de datos PostgreSQL.",
      metric: "Bajo acoplamiento y alta cohesión de módulos"
    },
    {
      code: "RNF-10",
      name: "Trazabilidad de Despacho de Correo Electrónico",
      category: "Interoperabilidad",
      desc: "El subsistema de despacho de correos debe estructurar claramente los parámetros '///CORREO REMITENTE///' y '///CORREO DE RECEPCION///' para su conexión plug-and-play con servicios SMTP / Webhook.",
      metric: "Marcadores estandarizados en código fuente"
    },
    {
      code: "RNF-11",
      name: "Portabilidad de Certificados Digitales (PDF/A)",
      category: "Portabilidad",
      desc: "Los diplomas y certificados generados deben ser compatibles con el estándar de visualización e impresión PDF/A, preservando sellos, tipografías y firmas digitales en cualquier visor.",
      metric: "Generación de PDF estándar imprimible"
    },
    {
      code: "RNF-12",
      name: "Versionamiento y Gestión de Cambios",
      category: "Gestión de Configuración",
      desc: "Control de versiones centralizado en Git con commits descriptivos en idioma español y actualización correlativa de la Carta Gantt en Excel (Carta_Gantt_PrevySeg_2026.xlsx).",
      metric: "Trazabilidad completa en repositorio GitHub"
    }
  ];

  // Build Document Sections
  const doc = new Document({
    styles: {
      default: {
        document: {
          run: {
            font: "Calibri",
            size: 20,
            color: "334155"
          }
        }
      }
    },
    sections: [
      {
        properties: {
          page: {
            margin: { top: 1200, bottom: 1200, left: 1400, right: 1400 }
          }
        },
        headers: {
          default: new Header({
            children: [
              new Paragraph({
                alignment: AlignmentType.RIGHT,
                children: [
                  new TextRun({
                    text: "PREVYSEG CAPACITACIONES OTEC • ESPECIFICACIÓN DE REQUERIMIENTOS (ERS)",
                    size: 16,
                    color: "94A3B8",
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
                    text: "Página ",
                    size: 16,
                    color: "94A3B8"
                  }),
                  new TextRun({
                    children: [PageNumber.CURRENT],
                    size: 16,
                    color: "94A3B8"
                  }),
                  new TextRun({
                    text: " de ",
                    size: 16,
                    color: "94A3B8"
                  }),
                  new TextRun({
                    children: [PageNumber.TOTAL_PAGES],
                    size: 16,
                    color: "94A3B8"
                  })
                ]
              })
            ]
          })
        },
        children: [
          
          // ================= PORTADA INSTITUCIONAL PREVYSEG =================
          new Paragraph({
            alignment: AlignmentType.CENTER,
            spacing: { before: 400, after: 100 },
            children: [
              new TextRun({
                text: "PREVYSEG CAPACITACIONES",
                bold: true,
                size: 36,
                color: primaryColor,
                font: "Calibri"
              })
            ]
          }),
          new Paragraph({
            alignment: AlignmentType.CENTER,
            spacing: { after: 300 },
            children: [
              new TextRun({
                text: "ORGANISMO TÉCNICO DE CAPACITACIÓN • REGISTRO SENCE N° 1238088725 • NCh 2728",
                bold: true,
                size: 18,
                color: secondaryColor,
                font: "Calibri"
              })
            ]
          }),

          new Paragraph({
            alignment: AlignmentType.CENTER,
            spacing: { before: 300, after: 150 },
            children: [
              new TextRun({
                text: "DOCUMENTO DE ESPECIFICACIÓN DE REQUERIMIENTOS DE SOFTWARE (ERS / SRS)",
                bold: true,
                size: 28,
                color: "0F172A",
                font: "Calibri"
              })
            ]
          }),
          new Paragraph({
            alignment: AlignmentType.CENTER,
            spacing: { after: 400 },
            children: [
              new TextRun({
                text: "Requerimientos Funcionales y No Funcionales del Ecosistema Web & Campus Virtual LMS PrevySeg 2026",
                italics: true,
                size: 22,
                color: "475569",
                font: "Calibri"
              })
            ]
          }),

          // Metadata Box Table
          new Table({
            width: { size: 100, type: WidthType.PERCENTAGE },
            alignment: AlignmentType.CENTER,
            rows: [
              new TableRow({
                children: [
                  createCell("PROYECTO:", { isHeader: true, width: 30 }),
                  createCell("Plataforma Web Institucional y Campus Virtual LMS PrevySeg 2026", { width: 70 })
                ]
              }),
              new TableRow({
                children: [
                  createCell("ORGANIZACIÓN:", { isHeader: true }),
                  createCell("PrevySeg Capacitaciones Arica - Acreditado SENCE y Carabineros OS-10")
                ]
              }),
              new TableRow({
                children: [
                  createCell("AUTORES / RESPONSABLES:", { isHeader: true }),
                  createCell("Ashley Adaros (Director Académico) & Sebastián Araya (Coordinador OS-10)")
                ]
              }),
              new TableRow({
                children: [
                  createCell("VERSIÓN DEL SISTEMA:", { isHeader: true }),
                  createCell("v1.9.2 (Producción / Validado)")
                ]
              }),
              new TableRow({
                children: [
                  createCell("FECHA DE EMISIÓN:", { isHeader: true }),
                  createCell("02 de Septiembre, 2026")
                ]
              }),
              new TableRow({
                children: [
                  createCell("ESTADO DEL DOCUMENTO:", { isHeader: true }),
                  createCell("Aprobado para Implementación y Certificación de Calidad")
                ]
              })
            ]
          }),

          new Paragraph({ spacing: { before: 400, after: 200 } }),

          // ================= 1. INTRODUCCIÓN Y PROPÓSITO =================
          createHeading("1. Introducción y Propósito del Sistema"),
          createParagraph("El presente documento tiene por objetivo formalizar y detallar la totalidad de los Requerimientos Funcionales (RF) y Requerimientos No Funcionales (RNF) para la plataforma web y campus virtual de PrevySeg Capacitaciones."),
          createParagraph("El sistema tiene como propósito central ofrecer una experiencia integral de difusión académica, cotización corporativa con franquicia tributaria SENCE, aula virtual interactiva para formación de guardias de seguridad acreditados por el OS-10 de Carabineros de Chile, y un flujo de gestión administrativa para la validación y emisión de certificados oficiales con despacho digital."),

          // ================= 2. ALCANCE DEL PROYECTO =================
          createHeading("2. Alcance del Proyecto"),
          createParagraph("El alcance de la solución contempla cuatro módulos fundamentales:"),
          createParagraph("• Módulo Web Público: Vitrina académica de los 11 cursos oficiales, buscador en tiempo real, sección informativa de tramos de franquicia tributaria SENCE (100%, 50%, 15% y Pago Directo por UTM) y canal de contacto directo vía WhatsApp (+56 9 7869 1869)."),
          createParagraph("• Módulo de Autenticación y Seguridad (RBAC): Control de acceso con diferenciación estricta entre Administradores y Estudiantes mediante RUT y contraseña."),
          createParagraph("• Campus Virtual del Estudiante (LMS Alumno): Aula virtual con reproductor de video de clases, temarios modulares, manuales PDF descargables, simulador de examen teórico OS-10 confidencial, bolsa de empleo y descarga de diploma oficial."),
          createParagraph("• Panel de Administración y Despacho de Diplomas (LMS Admin): Sistema de validación y visto bueno académico con emisión de diplomas oficiales y despacho automático de copias digitales por correo electrónico (///CORREO REMITENTE/// hacia ///CORREO DE RECEPCION///)."),

          // ================= 3. ACTORES DEL SISTEMA =================
          createHeading("3. Actores y Perfiles de Usuario"),
          createParagraph("• Administrador Académico (Ashley / Sebastián): Usuario con máximos privilegios, responsable de gestionar participantes, cursos, otorgar el visto bueno y emitir diplomas oficiales."),
          createParagraph("• Estudiante / Guardia en Formación (Matías Silva): Usuario matriculado que accede al aula virtual, estudia los contenidos, realiza evaluaciones teóricas y descarga su copia digital de diploma una vez aprobado."),
          createParagraph("• Empresa / Cliente Corporativo: Encargados de recursos humanos y capacitación que consultan la franquicia SENCE y solicitan cotizaciones de cursos para sus trabajadores."),
          createParagraph("• Público General / Postulante: Personas naturales interesadas en certificar su credencial OS-10 o especializarse en seguridad privada."),

          // ================= 4. REQUERIMIENTOS FUNCIONALES =================
          createHeading("4. Requerimientos Funcionales (RF)"),
          createParagraph("Los Requerimientos Funcionales definen los servicios, comportamientos y funcionalidades específicas que el sistema ejecuta para responder a las necesidades de los usuarios."),

          // Tabla de Requerimientos Funcionales
          new Table({
            width: { size: 100, type: WidthType.PERCENTAGE },
            alignment: AlignmentType.CENTER,
            rows: [
              new TableRow({
                children: [
                  createCell("Código", { isHeader: true, width: 12 }),
                  createCell("Nombre del Requerimiento", { isHeader: true, width: 25 }),
                  createCell("Descripción Funcional", { isHeader: true, width: 38 }),
                  createCell("Prioridad", { isHeader: true, width: 12 }),
                  createCell("Actor", { isHeader: true, width: 13 })
                ]
              }),
              ...functionalRequirements.map((rf, idx) => {
                const bg = idx % 2 === 0 ? "FFFFFF" : lightGrayBg;
                return new TableRow({
                  children: [
                    createCell(rf.code, { bgColor: bg, bold: true, color: primaryColor }),
                    createCell(rf.name, { bgColor: bg, bold: true }),
                    createCell(rf.desc, { bgColor: bg }),
                    createCell(rf.priority, { bgColor: bg, bold: true, color: rf.priority === "Crítica" ? "DC2626" : rf.priority === "Alta" ? "D97706" : "0F172A" }),
                    createCell(rf.actor, { bgColor: bg })
                  ]
                });
              })
            ]
          }),

          new Paragraph({ spacing: { before: 300, after: 150 } }),

          // ================= 5. REQUERIMIENTOS NO FUNCIONALES =================
          createHeading("5. Requerimientos No Funcionales (RNF)"),
          createParagraph("Los Requerimientos No Funcionales establecen los atributos de calidad, rendimiento, seguridad, confiabilidad, mantenibilidad y restricciones normativas que rigen el funcionamiento del software."),

          // Tabla de Requerimientos No Funcionales
          new Table({
            width: { size: 100, type: WidthType.PERCENTAGE },
            alignment: AlignmentType.CENTER,
            rows: [
              new TableRow({
                children: [
                  createCell("Código", { isHeader: true, width: 12 }),
                  createCell("Nombre y Categoría", { isHeader: true, width: 25 }),
                  createCell("Descripción y Criterio de Calidad", { isHeader: true, width: 40 }),
                  createCell("Métrica de Cumplimiento", { isHeader: true, width: 23 })
                ]
              }),
              ...nonFunctionalRequirements.map((rnf, idx) => {
                const bg = idx % 2 === 0 ? "FFFFFF" : lightGrayBg;
                return new TableRow({
                  children: [
                    createCell(rnf.code, { bgColor: bg, bold: true, color: secondaryColor }),
                    createCell(`${rnf.name}\n(${rnf.category})`, { bgColor: bg, bold: true }),
                    createCell(rnf.desc, { bgColor: bg }),
                    createCell(rnf.metric, { bgColor: bg, bold: true, color: "0284C7" })
                  ]
                });
              })
            ]
          }),

          new Paragraph({ spacing: { before: 300, after: 150 } }),

          // ================= 6. MARCO LEGAL Y NORMATIVO =================
          createHeading("6. Trazabilidad Legal y Normativa"),
          createParagraph("El diseño y arquitectura de requerimientos de PrevySeg se encuentra estrictamente alineado a los tres pilares regulatorios de la República de Chile:"),
          createParagraph("1. Ley N° 19.518 (Estatuto de Capacitación y Empleo - SENCE): Soporte para la Franquicia Tributaria, imputación de costos al impuesto de primera categoría y control de horas cronológicas."),
          createParagraph("2. Decreto Ley N° 3.607 y Directivas OS-10 de Carabineros de Chile: Cumplimiento de mallas formativas, temarios técnicos, 90 horas para formación y 60 horas para perfeccionamiento, y exámenes teóricos estandarizados."),
          createParagraph("3. Norma Chilena NCh 2728:2015 para OTEC: Sistema de gestión de la calidad para organismos técnicos de capacitación, asegurando trazabilidad de certificados y satisfacción del estudiante."),
          createParagraph("4. Ley N° 19.628 sobre Protección de la Vida Privada: Garantía de confidencialidad absoluta sobre los puntajes y notas de los alumnos, emitiendo diplomas de acreditación de idoneidad y capacitación.")
        ]
      }
    ]
  });

  const buffer = await Packer.toBuffer(doc);
  const outputPath = path.join(__dirname, '..', 'Requerimientos_Funcionales_y_No_Funcionales_PrevySeg.docx');
  fs.writeFileSync(outputPath, buffer);
  console.log('Documento Word de Requerimientos generado con éxito en:', outputPath);
}

createRequirementsDoc().catch(console.error);
