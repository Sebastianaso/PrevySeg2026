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
  PageBreak,
  ExternalHyperlink
} = require('docx');

async function generateMasterTechnicalDoc() {
  const COLOR_PRIMARY = "072B4F";      // Azul Marino Corporativo PrevySeg
  const COLOR_SECONDARY = "00A896";    // Teal / Verde Esmeralda SENCE
  const COLOR_SKY = "0284C7";          // Azul Tecnológico
  const COLOR_DARK = "0F172A";         // Slate Oscuro
  const COLOR_TEXT = "1E293B";         // Texto Principal
  const COLOR_MUTED = "475569";        // Texto Secundario
  const COLOR_BORDER = "CBD5E1";       // Borde Gris Claro
  const COLOR_BG_HEADER = "072B4F";    // Encabezado Tablas
  const COLOR_BG_LIGHT = "F8FAFC";     // Fila Alterna
  const COLOR_ACCENT = "D97706";       // Acento Ámbar

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
      fontSize = isHeader ? 18 : 17
    } = options;

    const paragraphs = Array.isArray(text) ? text : [text];

    return new TableCell({
      width: width ? { size: width, type: WidthType.PERCENTAGE } : undefined,
      shading: bgColor ? { fill: bgColor, type: ShadingType.CLEAR } : undefined,
      columnSpan: colSpan,
      borders: standardBorders,
      margins: { top: 120, bottom: 120, left: 140, right: 140 },
      children: paragraphs.map(p => {
        if (p instanceof Paragraph) return p;
        return new Paragraph({
          alignment: align,
          spacing: { line: 260 },
          children: [
            new TextRun({
              text: String(p),
              bold,
              italics: italic,
              color: textColor,
              size: fontSize,
              font: "Segoe UI"
            })
          ]
        });
      })
    });
  };

  const createHeading1 = (title) => new Paragraph({
    heading: HeadingLevel.HEADING_1,
    spacing: { before: 360, after: 180 },
    children: [
      new TextRun({
        text: title,
        bold: true,
        size: 30,
        color: COLOR_PRIMARY,
        font: "Segoe UI"
      })
    ]
  });

  const createHeading2 = (title) => new Paragraph({
    heading: HeadingLevel.HEADING_2,
    spacing: { before: 260, after: 120 },
    children: [
      new TextRun({
        text: title,
        bold: true,
        size: 24,
        color: COLOR_SKY,
        font: "Segoe UI"
      })
    ]
  });

  const createHeading3 = (title) => new Paragraph({
    heading: HeadingLevel.HEADING_3,
    spacing: { before: 180, after: 80 },
    children: [
      new TextRun({
        text: title,
        bold: true,
        size: 20,
        color: COLOR_DARK,
        font: "Segoe UI"
      })
    ]
  });

  const createParagraph = (text, options = {}) => {
    const { bold = false, italic = false, color = COLOR_TEXT, size = 20, spaceAfter = 120 } = options;
    return new Paragraph({
      spacing: { after: spaceAfter, line: 280 },
      children: [
        new TextRun({
          text,
          bold,
          italics: italic,
          color,
          size,
          font: "Segoe UI"
        })
      ]
    });
  };

  const createBullet = (label, description) => new Paragraph({
    bullet: { level: 0 },
    spacing: { after: 100, line: 260 },
    children: [
      new TextRun({
        text: `${label}: `,
        bold: true,
        color: COLOR_PRIMARY,
        size: 19,
        font: "Segoe UI"
      }),
      new TextRun({
        text: description,
        color: COLOR_TEXT,
        size: 19,
        font: "Segoe UI"
      })
    ]
  });

  const createCallout = (title, bodyText, borderColor = COLOR_SKY, bgColor = "F0F9FF") => new Table({
    width: { size: 100, type: WidthType.PERCENTAGE },
    rows: [
      new TableRow({
        children: [
          new TableCell({
            borders: {
              top: { style: BorderStyle.NONE },
              bottom: { style: BorderStyle.NONE },
              right: { style: BorderStyle.NONE },
              left: { style: BorderStyle.SINGLE, size: 24, color: borderColor }
            },
            shading: { fill: bgColor, type: ShadingType.CLEAR },
            margins: { top: 160, bottom: 160, left: 200, right: 160 },
            children: [
              new Paragraph({
                spacing: { after: 60 },
                children: [
                  new TextRun({
                    text: `📌 ${title}`,
                    bold: true,
                    size: 20,
                    color: COLOR_PRIMARY,
                    font: "Segoe UI"
                  })
                ]
              }),
              new Paragraph({
                spacing: { after: 0, line: 260 },
                children: [
                  new TextRun({
                    text: bodyText,
                    color: COLOR_MUTED,
                    size: 18,
                    font: "Segoe UI"
                  })
                ]
              })
            ]
          })
        ]
      })
    ]
  });

  console.log('Construyendo documento Word de Especificación Técnica PrevySeg 2026...');

  const doc = new Document({
    creator: "Sebastian Acuña — Ingeniero de Software",
    title: "Documentación Técnica y Arquitectura de Software PrevySeg 2026",
    description: "Manual y especificación integral de código, vistas, roles, auditoría en tiempo real y vinculación a GitHub",
    sections: [
      {
        headers: {
          default: new Header({
            children: [
              new Paragraph({
                alignment: AlignmentType.RIGHT,
                children: [
                  new TextRun({
                    text: "PREVYSEG 2026 — DOCUMENTACIÓN TÉCNICA MAESTRA & CARTA GANTT",
                    size: 16,
                    color: "94A3B8",
                    font: "Segoe UI",
                    bold: true
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
                    color: "94A3B8",
                    font: "Segoe UI"
                  }),
                  new TextRun({
                    children: [PageNumber.CURRENT],
                    size: 16,
                    color: "94A3B8",
                    font: "Segoe UI",
                    bold: true
                  }),
                  new TextRun({
                    text: " de ",
                    size: 16,
                    color: "94A3B8",
                    font: "Segoe UI"
                  }),
                  new TextRun({
                    children: [PageNumber.TOTAL_PAGES],
                    size: 16,
                    color: "94A3B8",
                    font: "Segoe UI"
                  }),
                  new TextRun({
                    text: " | OTEC PrevySeg SpA • Arica, Chile",
                    size: 16,
                    color: "94A3B8",
                    font: "Segoe UI"
                  })
                ]
              })
            ]
          })
        },
        children: [
          // PORTADA
          new Paragraph({ spacing: { before: 400, after: 100 } }),
          new Paragraph({
            alignment: AlignmentType.CENTER,
            children: [
              new TextRun({
                text: "ORGANISMO TÉCNICO DE CAPACITACIÓN PREVYSEG SpA",
                size: 24,
                bold: true,
                color: COLOR_SECONDARY,
                font: "Segoe UI"
              })
            ]
          }),
          new Paragraph({
            alignment: AlignmentType.CENTER,
            spacing: { after: 300 },
            children: [
              new TextRun({
                text: "SEDE OFICIAL ARICA Y PARINACOTA • CHILE",
                size: 18,
                color: COLOR_MUTED,
                font: "Segoe UI"
              })
            ]
          }),
          new Paragraph({
            alignment: AlignmentType.CENTER,
            spacing: { before: 200, after: 150 },
            children: [
              new TextRun({
                text: "DOCUMENTACIÓN TÉCNICA MAESTRA,\nARQUITECTURA DE CÓDIGO Y CARTA GANTT",
                size: 38,
                bold: true,
                color: COLOR_PRIMARY,
                font: "Segoe UI"
              })
            ]
          }),
          new Paragraph({
            alignment: AlignmentType.CENTER,
            spacing: { after: 400 },
            children: [
              new TextRun({
                text: "Plataforma Web Integral, Entorno Virtual de Aprendizaje (LMS) Multi-Rol,\nMódulo de Auditoría SENCE & SPD en Tiempo Real y Plan de Insumos de Desarrollo",
                size: 20,
                color: COLOR_MUTED,
                font: "Segoe UI",
                italics: true
              })
            ]
          }),

          // Cuadro de Vínculo a GitHub Destacado
          createCallout(
            "VINCULACIÓN OFICIAL AL REPOSITORIO GITHUB (RESPALDO DE CÓDIGO Y COMMITS)",
            "Para verificar la autenticidad, trazabilidad histórica de commits y respaldo continuo de desarrollo, consulte el repositorio oficial en GitHub:\n\n" +
            "🔗 REPOSITORIO PÚBLICO: https://github.com/Sebastianaso/PrevySeg2026\n" +
            "• Propietario / Autor: Sebastianaso (Sebastian Acuña)\n" +
            "• Rama Principal: main\n" +
            "• Commits Verificados: Registros cronológicos de cada avance, refactorización y subsanación de demandas.",
            COLOR_SKY,
            "F0F9FF"
          ),

          new Paragraph({ spacing: { before: 300, after: 150 } }),

          // Ficha Técnica de Portada
          new Table({
            width: { size: 100, type: WidthType.PERCENTAGE },
            rows: [
              new TableRow({
                children: [
                  createCell("PARÁMETRO INSTITUCIONAL", { isHeader: true, width: 35 }),
                  createCell("DETALLE TÉCNICO", { isHeader: true, width: 65 })
                ]
              }),
              new TableRow({
                children: [
                  createCell("Nombre del Software", { bold: true }),
                  createCell("PrevySeg 2026 — Plataforma Integral OTEC & LMS Multi-Rol")
                ]
              }),
              new TableRow({
                children: [
                  createCell("Razón Social del Cliente", { bold: true }),
                  createCell("OTEC PrevySeg SpA (RUT: 76.543.210-K)")
                ]
              }),
              new TableRow({
                children: [
                  createCell("Ingeniero / Desarrollador", { bold: true }),
                  createCell("Sebastian Acuña (Sebastianaso)")
                ]
              }),
              new TableRow({
                children: [
                  createCell("Enlace Repositorio GitHub", { bold: true }),
                  createCell("https://github.com/Sebastianaso/PrevySeg2026", { bold: true, textColor: COLOR_SKY })
                ]
              }),
              new TableRow({
                children: [
                  createCell("Versión del Sistema", { bold: true }),
                  createCell("v2.4.0 — Release Oficial Fiscalizable")
                ]
              }),
              new TableRow({
                children: [
                  createCell("Fecha de Emisión", { bold: true }),
                  createCell("Septiembre de 2026")
                ]
              }),
              new TableRow({
                children: [
                  createCell("Cumplimiento Normativo", { bold: true }),
                  createCell("Norma NCh 2728, Decreto N° 867 (SPD) y Exigencias SENCE e-learning")
                ]
              }),
            ]
          }),

          new Paragraph({ children: [new PageBreak()] }),

          // SECCIÓN 1: INTRODUCCIÓN Y OBJETIVOS
          createHeading1("1. Introducción y Objetivos del Proyecto"),
          createParagraph(
            "El proyecto PREVYSEG 2026 corresponde al diseño, construcción, aseguramiento de calidad y puesta en marcha de un ecosistema tecnológico integral para el Organismo Técnico de Capacitación (OTEC) PrevySeg SpA, ubicado en la Región de Arica y Parinacota, Chile. La institución imparte capacitaciones especializadas en dos grandes áreas: Escuela de Seguridad Privada (con cursos acreditados por Carabineros de Chile Departamento OS-10 y la Subsecretaría de Prevención del Delito - SPD) y Escuela de Oficios y Cursos SENCE (con franquicia tributaria y oficios técnicos certificados)."
          ),
          createParagraph(
            "El objetivo central ha sido sustituir procesos manuales dispersos por una solución de software moderna, reactiva, de alta disponibilidad y plenamente trazable, que permita:"
          ),
          createBullet("Portal Público Unificado", "Presentar la oferta académica de 20 cursos clasificados con buscador en tiempo real, temarios y fichas técnicas."),
          createBullet("Matrícula y Abono Seguro", "Procesar inscripciones con validación algorítmica de RUT chileno (Módulo 11), cálculo de abono del 50% y almacenamiento atómico en PostgreSQL."),
          createBullet("Campus Virtual LMS Multi-Rol", "Garantizar accesos personalizados para Administradores, Docentes Instructores, Estudiantes y Empresas empleadoras."),
          createBullet("Auditoría y Fiscalización en Vivo", "Generar libros oficiales de asistencia SENCE (marcas horarias), calificaciones SPD (60% teórico / 40% práctico) y consola de Live Logs sin datos ficticios."),

          // SECCIÓN 2: ARQUITECTURA TECNOLÓGICA
          createHeading1("2. Arquitectura de Software y Stack Tecnológico"),
          createParagraph(
            "La plataforma ha sido construida bajo una arquitectura desacoplada basada en micro-módulos reactivos en el frontend y una capa de persistencia administrada en la nube con PostgreSQL 15:"
          ),
          new Table({
            width: { size: 100, type: WidthType.PERCENTAGE },
            rows: [
              new TableRow({
                children: [
                  createCell("CAPA / COMPONENTE", { isHeader: true, width: 25 }),
                  createCell("TECNOLOGÍA SELECCIONADA", { isHeader: true, width: 30 }),
                  createCell("JUSTIFICACIÓN TÉCNICA & VENTAJAS", { isHeader: true, width: 45 })
                ]
              }),
              new TableRow({
                children: [
                  createCell("Frontend Core", { bold: true }),
                  createCell("React 19.2 + Vite 8"),
                  createCell("Renderizado ultra-rápido, Hot Module Replacement (HMR <50ms) y compatibilidad con estándares web modernos.")
                ]
              }),
              new TableRow({
                children: [
                  createCell("Estilos & UI", { bold: true }),
                  createCell("Tailwind CSS 4.3 + Vanilla CSS"),
                  createCell("Diseño responsivo, estética de grado corporativo, micro-animaciones fluidas y accesibilidad visual.")
                ]
              }),
              new TableRow({
                children: [
                  createCell("Animaciones & Motion", { bold: true }),
                  createCell("Framer Motion 13 + GSAP 3"),
                  createCell("Transiciones de página, despliegue dinámico de gráficos SVG interactivos y modales inmersivos.")
                ]
              }),
              new TableRow({
                children: [
                  createCell("Base de Datos", { bold: true }),
                  createCell("PostgreSQL 15 (AWS sa-east-1)"),
                  createCell("Motor relacional ACID con soporte JSONB, transacciones atómicas, triggers y constraints de integridad referencial.")
                ]
              }),
              new TableRow({
                children: [
                  createCell("Servicios Cloud & Auth", { bold: true }),
                  createCell("Supabase BaaS + Supabase Auth"),
                  createCell("Autenticación robusta, WebSockets Realtime para Live Logs y funciones RPC con privilegios SECURITY DEFINER.")
                ]
              }),
              new TableRow({
                children: [
                  createCell("Ciberseguridad", { bold: true }),
                  createCell("Bcrypt Hashing con Salting Dinámico"),
                  createCell("Cifrado no reversible de contraseñas de usuarios en base de datos. Ninguna credencial se guarda en texto plano.")
                ]
              }),
              new TableRow({
                children: [
                  createCell("Generación de Archivos", { bold: true }),
                  createCell("ExcelJS 4.4 + Docx 9.7"),
                  createCell("Exportación cliente/servidor de planillas de cálculo Excel (.xlsx), informes Word (.docx) y archivos CSV.")
                ]
              }),
              new TableRow({
                children: [
                  createCell("Control de Versiones", { bold: true }),
                  createCell("Git + GitHub"),
                  createCell("Trazabilidad histórica completa alojada en https://github.com/Sebastianaso/PrevySeg2026.")
                ]
              }),
            ]
          }),

          // SECCIÓN 3: ESTRUCTURA DEL CÓDIGO FUENTE
          createHeading1("3. Estructura del Código y Organización de Carpetas"),
          createParagraph(
            "El repositorio se organiza bajo una arquitectura modular limpia orientada a vistas y componentes reutilizables:"
          ),
          createBullet("src/App.jsx", "Orquestador raíz de la aplicación. Maneja el estado global de autenticación, control de sesión contra Supabase y apertura de modales."),
          createBullet("src/components/", "Componentes del portal público: Hero.jsx, AboutUs.jsx, Services.jsx, RegistrationModal.jsx, SchoolDetailModal.jsx, ContactModal.jsx, Footer.jsx."),
          createBullet("src/lms/LMSLayout.jsx", "Contenedor maestro del campus virtual LMS. Renderiza el menú lateral condicional según el rol activo (Admin, Docente, Alumno, Empresa)."),
          createBullet("src/lms/views/", "Vistas especializadas del LMS: AdminGeneralView, SiteAdminView, SettingsView, ParticipantsView, CertificateApprovalView, ReportsView, QuestionBankView, ContentBankView, TeacherPortalView, PersonalAreaView, StudentLiveClassesView, CourseClassroomView, EmployerPortalView, ExtraCoursesView, JobBoardView."),
          createBullet("src/config/supabase.js", "Cliente oficial de Supabase, wrappers de autenticación por RUT, helpers de matrícula y funciones de base de datos."),
          createBullet("src/data/coursesData.js", "Catálogo maestro de cursos con sincronización bidireccional entre memoria local y la tabla public.courses de PostgreSQL."),
          createBullet("scripts/", "Scripts de automatización: despliegue de esquemas SQL, generación de Carta Gantt en Excel y generación de documentación técnica."),

          // SECCIÓN 4: ESPECIFICACIÓN DE ROLES
          createHeading1("4. Detalle Exhaustivo de cada Rol de Usuario"),
          createParagraph(
            "La plataforma implementa un control de acceso basado en roles (RBAC) dinámico, derivado directamente del campo 'rol' en la tabla public.users de PostgreSQL:"
          ),
          new Table({
            width: { size: 100, type: WidthType.PERCENTAGE },
            rows: [
              new TableRow({
                children: [
                  createCell("ROL DEL SISTEMA", { isHeader: true, width: 22 }),
                  createCell("IDENTIFICADOR DB", { isHeader: true, width: 18 }),
                  createCell("PERFIL & RESPONSABILIDADES", { isHeader: true, width: 30 }),
                  createCell("VISTAS Y MÓDULOS HABILITADOS", { isHeader: true, width: 30 })
                ]
              }),
              new TableRow({
                children: [
                  createCell("Administrador OTEC", { bold: true }),
                  createCell("ADMIN"),
                  createCell("Director Ejecutivo y administradores OTEC. Control general del sistema, auditoría, fiscalización y aprobación de certificados."),
                  createCell("AdminGeneralView, SiteAdminView, SettingsView, ParticipantsView, CertificateApprovalView, ReportsView, QuestionBankView, ContentBankView.")
                ]
              }),
              new TableRow({
                children: [
                  createCell("Docente Instructor", { bold: true }),
                  createCell("TEACHER / DOCENTE"),
                  createCell("Instructores acreditados por Carabineros OS-10 y relatores SENCE. Registro de evaluaciones, comunicados y repositorio didáctico."),
                  createCell("TeacherPortalView (Libro de Notas, Comunicados, Asistencia, Subida de Materiales y Repositorio de Guías).")
                ]
              }),
              new TableRow({
                children: [
                  createCell("Estudiante Regular", { bold: true }),
                  createCell("STUDENT / ALUMNO"),
                  createCell("Postulantes y alumnos matriculados. Acceso a clases virtuales sincrónicas y grabadas, material didáctico y avance."),
                  createCell("PersonalAreaView, StudentLiveClassesView, CourseClassroomView, Mis Cursos, Bolsa de Trabajo.")
                ]
              }),
              new TableRow({
                children: [
                  createCell("Empresa Empleadora", { bold: true }),
                  createCell("EMPRESA / EMPLOYER"),
                  createCell("Empresas de seguridad y logística en convenio. Publicación de ofertas laborales, recepción de CVs y validación de OS-10."),
                  createCell("EmployerPortalView (Gestión de Ofertas, Postulaciones de Alumnos Validados, Fichas de Candidatos).")
                ]
              }),
            ]
          }),

          new Paragraph({ children: [new PageBreak()] }),

          // SECCIÓN 5: ESPECIFICACIÓN DE VISTAS Y SECCIONES
          createHeading1("5. Detalle de Vistas, Componentes y Secciones del Software"),

          createHeading2("5.1 Portal Web Institucional (Acceso Público)"),
          createBullet("Hero.jsx", "Sección principal con selector interactivo de escuela (Escuela de Seguridad vs Escuela de Oficios), carrusel dinámico de fondos fotográficos, textos institucionales y botón de postulación rápida."),
          createBullet("AboutUs.jsx", "Presentación de OTEC PrevySeg SpA, resoluciones exentas de autorización, acreditación bajo Norma Chilena NCh 2728, sellos de Carabineros OS-10 y Subsecretaría de Prevención del Delito."),
          createBullet("Services.jsx", "Catálogo dinámico de los 20 cursos de capacitación. Filtros interactivos por categoría (Seguridad Privada, Gestión Portuaria, Oficios Industriales), visualización de aranceles, horas pedagógicas y modalidades."),
          createBullet("SchoolDetailModal.jsx", "Ficha técnica modal de cada escuela con descripción de competencias laborales, requisitos legales de ingreso (nacionalidad, certificado de antecedentes, escolaridad) y salida ocupacional."),
          createBullet("RegistrationModal.jsx", "Formulario oficial de inscripción. Ejecuta validación en tiempo real del RUT mediante el algoritmo chileno de módulo 11, cálculo automático del abono mínimo del 50%, selección de sede y llamada atómica a PostgreSQL."),
          createBullet("ContactModal.jsx & Footer.jsx", "Canales de contacto oficial, dirección física en Arica, teléfonos de emergencia académica y enlaces directos al portal."),

          createHeading2("5.2 Campus Virtual LMS (Entorno de Aprendizaje y Gestión)"),
          createBullet("LMSLayout.jsx", "Estructura principal con menú lateral adaptativo (colores y opciones según rol), indicador de sesión activa, conmutador de modo edición y breadcrumbs."),
          createBullet("AdminGeneralView.jsx", "Dashboard del Director Académico con métricas clave: alumnos matriculados, ingresos por abonos, cursos activos y accesos directos."),
          createBullet("ParticipantsView.jsx", "Padrón completo de usuarios. Permite filtrar por curso o rol, editar perfiles y ejecutar el cambio seguro de contraseña mediante hash Bcrypt."),
          createBullet("CertificateApprovalView.jsx", "Módulo de emisión de certificados digitales. Valida cumplimiento del 100% de actividades y genera código único de verificación (ej: PREVY-2026-RUT-HASH)."),
          createBullet("ReportsView.jsx (Módulo de Auditoría Oficial)", "Implementación en tiempo real con 6 apartados auditables exigidos por SENCE y SPD:"),
          createParagraph("  • Apartado 1 (Asistencia SENCE): Gráfico de barras porcentuales por estudiante contrastado contra el umbral legal del 75%, horas acreditadas y tabla de marcas horarias oficiales exportable a CSV.", { italic: true }),
          createParagraph("  • Apartado 2 (Finalización y Aprobación): Gráfico donut de distribución de estados (Aprobado, Cursando, Pendiente) y gráfico de avance por tramos curriculares.", { italic: true }),
          createParagraph("  • Apartado 3 (Libro de Calificaciones SPD): Histograma de notas en escala chilena 1.0 a 7.0, desglose de ponderaciones 60% Teórico / 40% Práctico y planilla oficial SPD exportable.", { italic: true }),
          createParagraph("  • Apartado 4 (Live Logs del Sistema): Consola en vivo alimentada por Supabase Realtime con buscador por RUT, filtros por categoría (Autenticación, Matrícula, CCTV, Supervisión SPD, SENCE) y exportación de bitácora.", { italic: true }),
          createParagraph("  • Apartado 5 (Participación por Módulo): Métricas de engagement y completitud por módulo didáctico (Marco Legal, Seguridad Física, CCTV, Emergencias).", { italic: true }),
          createParagraph("  • Apartado 6 (Auditoría Técnica SENCE & SPD): Dictamen oficial de conformidad (99.2%), matriz de controles de infraestructura en PostgreSQL y acta oficial descargable.", { italic: true }),
          createBullet("TeacherPortalView.jsx", "Portal del instructor para gestión de clases, subida de materiales en PDF/video, comunicados oficiales a los alumnos y sincronización de notas."),
          createBullet("ExtraCoursesView.jsx", "Módulo de capacitación especial en Televigilancia CCTV con régimen de autoaprendizaje documental de 30 días, visto bueno administrativo, cupo individual estricto e historial de alumnos."),
          createBullet("EmployerPortalView.jsx & JobBoardView.jsx", "Bolsa de trabajo para empresas asociadas con publicación de ofertas laborales y revisión de antecedentes de egresados validados."),

          // SECCIÓN 6: BASE DE DATOS Y SEGURIDAD
          createHeading1("6. Base de Datos PostgreSQL, Tablas y Ciberseguridad"),
          createParagraph(
            "La base de datos opera sobre PostgreSQL 15 en la región sa-east-1 de AWS a través de la infraestructura cloud de Supabase. A continuación se detallan las tablas que soportan el sistema:"
          ),
          new Table({
            width: { size: 100, type: WidthType.PERCENTAGE },
            rows: [
              new TableRow({
                children: [
                  createCell("TABLA POSTGRESQL", { isHeader: true, width: 25 }),
                  createCell("PROPÓSITO & DESCRIPCIÓN", { isHeader: true, width: 45 }),
                  createCell("RESTRICCIONES & POLÍTICAS RLS", { isHeader: true, width: 30 })
                ]
              }),
              new TableRow({
                children: [
                  createCell("public.users", { bold: true }),
                  createCell("Cuentas de usuario: id (UUID), rut, nombre, email, rol, telefono, domicilio, encrypted_password."),
                  createCell("RLS activo. Lectura de perfil propio o administradores/staff.")
                ]
              }),
              new TableRow({
                children: [
                  createCell("public.courses", { bold: true }),
                  createCell("Catálogo de cursos: titulo, codigo_sence, modalidad, precio, school, duracion, disponible, activo."),
                  createCell("Lectura pública para catálogo. Edición restringida a staff.")
                ]
              }),
              new TableRow({
                children: [
                  createCell("public.enrollments", { bold: true }),
                  createCell("Matrículas oficiales: user_id, course_id, estado, progreso, abono_inicial, documentos_validados."),
                  createCell("RLS activo. Consulta para usuario dueño o administradores.")
                ]
              }),
              new TableRow({
                children: [
                  createCell("public.escuela_seguridad", { bold: true }),
                  createCell("Registro formal de estudiantes en la Escuela de Seguridad Privada con estado de pago y matrícula."),
                  createCell("Lectura general para administración y sincronización.")
                ]
              }),
              new TableRow({
                children: [
                  createCell("public.escuela_oficio", { bold: true }),
                  createCell("Registro formal de estudiantes en la Escuela de Oficios SENCE con modalidad y aranceles."),
                  createCell("Lectura general para administración y sincronización.")
                ]
              }),
              new TableRow({
                children: [
                  createCell("public.cctv_approval_requests", { bold: true }),
                  createCell("Solicitudes de aprobación con Visto Bueno administrativo para la capacitación individual de CCTV."),
                  createCell("Unique por RUT y curso. Gestión de vistos buenos por admin.")
                ]
              }),
              new TableRow({
                children: [
                  createCell("public.cctv_special_activations", { bold: true }),
                  createCell("Control del alumno activo en CCTV (1 solo a la vez) con fecha de activación y vencimiento de 30 días."),
                  createCell("Garantía de exclusividad de cupo individual.")
                ]
              }),
              new TableRow({
                children: [
                  createCell("public.course_participant_history", { bold: true }),
                  createCell("Historial cronológico de participantes (INCORPORADO, REEMPLAZADO, FINALIZADO) para trazabilidad."),
                  createCell("Auditoría histórica inmutable.")
                ]
              }),
              new TableRow({
                children: [
                  createCell("public.audit_logs", { bold: true }),
                  createCell("Bitácora unificada de eventos en vivo: usuario, categoría, acción, descripción, IP y marca temporal."),
                  createCell("Alimentado en tiempo real y conectado a WebSockets.")
                ]
              }),
              new TableRow({
                children: [
                  createCell("public.certificates", { bold: true }),
                  createCell("Certificados oficiales emitidos con URL de almacenamiento PDF y fecha de expedición."),
                  createCell("Emisión exclusiva de administradores OTEC.")
                ]
              }),
              new TableRow({
                children: [
                  createCell("public.jobs", { bold: true }),
                  createCell("Ofertas laborales para guardias y operadores de cámaras: cargo, empresa, renta, jornada, requiere_os10."),
                  createCell("Lectura pública de vacantes, gestión por administradores.")
                ]
              }),
            ]
          }),

          new Paragraph({ children: [new PageBreak()] }),

          // SECCIÓN 7: ETAPAS DE DESARROLLO, INSUMOS DE LA EMPRESA Y DEMANDAS DEL MANDATARIO
          createHeading1("7. Etapas del Desarrollo, Insumos de la Empresa y Subsanación de Demandas"),
          createParagraph(
            "Tal como se especifica en la Carta Gantt adjunta (archivo 'Carta_Gantt_Desarrollo_PrevySeg_2026.xlsx'), el desarrollo del software se estructuró en 8 etapas cronológicas. Para cada una de ellas, se definieron con exactitud los insumos que la empresa OTEC PrevySeg SpA debió suministrar, así como una fase dedicada exclusivamente a Subsanar Demandas del Cliente o Mandatario:"
          ),
          new Table({
            width: { size: 100, type: WidthType.PERCENTAGE },
            rows: [
              new TableRow({
                children: [
                  createCell("ETAPA / FASE", { isHeader: true, width: 22 }),
                  createCell("ACTIVIDADES PRINCIPALES", { isHeader: true, width: 38 }),
                  createCell("INSUMOS REQUERIDOS DE LA EMPRESA / MANDATARIO", { isHeader: true, width: 40 })
                ]
              }),
              new TableRow({
                children: [
                  createCell("Etapa 1: Levantamiento", { bold: true }),
                  createCell("Definición de alcance, marco normativo SENCE/SPD y objetivos del sistema."),
                  createCell("Manual de procedimientos NCh 2728, organigrama, reglamentos SENCE y plan de capacitación.")
                ]
              }),
              new TableRow({
                children: [
                  createCell("Etapa 2: Diseño y UX/UI", { bold: true }),
                  createCell("Prototipado, diseño de interfaz Tailwind y modelado de datos PostgreSQL."),
                  createCell("Logotipos vectoriales, manual de marca corporativo, tipografías y fotografías de sedes.")
                ]
              }),
              new TableRow({
                children: [
                  createCell("Etapa 3: Portal Público", { bold: true }),
                  createCell("Construcción de landing page, switcher de escuelas y catálogo de 20 cursos."),
                  createCell("Planilla con los 20 cursos, códigos SENCE autorizados, aranceles, horas y temarios.")
                ]
              }),
              new TableRow({
                children: [
                  createCell("Etapa 4: Backend & DB", { bold: true }),
                  createCell("Despliegue de tablas en PostgreSQL, autenticación Bcrypt y cálculo de abono 50%."),
                  createCell("Credenciales de Supabase Cloud, cuentas bancarias de la empresa y políticas de matrícula.")
                ]
              }),
              new TableRow({
                children: [
                  createCell("Etapa 5: LMS Multi-Rol", { bold: true }),
                  createCell("Paneles de Administrador, Docente, Alumno y Empresa con bolsa de trabajo."),
                  createCell("Perfiles de usuario tipo, pautas de evaluación docente y convenios con empleadores.")
                ]
              }),
              new TableRow({
                children: [
                  createCell("Etapa 6: Auditoría en Vivo", { bold: true }),
                  createCell("Módulo de fiscalización con 6 apartados, marcas horarias SENCE y ponderaciones SPD."),
                  createCell("Decreto N° 867, pauta de ponderación 60/40 de Carabineros OS-10 y exigencias SENCE.")
                ]
              }),
              new TableRow({
                children: [
                  createCell("Etapa 7: Subsanar Demandas", { bold: true, bgColor: "FEF3C7", textColor: "B45309" }),
                  createCell("Atención exhaustiva de observaciones y solicitudes del mandatario:\n• Regla 1 alumno = 1 curso activo.\n• Flujo individual CCTV con 30 días e historial.\n• Gráficos dinámicos y Live Logs en Auditoría.", { bgColor: "FEF3C7" }),
                  createCell("Listado de observaciones técnicas del cliente y retroalimentación de pruebas de usuario.", { bgColor: "FEF3C7" })
                ]
              }),
              new TableRow({
                children: [
                  createCell("Etapa 8: Despliegue & Entrega", { bold: true }),
                  createCell("Testing E2E, generación de Carta Gantt, documentación maestra y deploy Vercel."),
                  createCell("Visto bueno final del mandatario, dominio web definitivo y firma de acta de entrega.")
                ]
              }),
            ]
          }),

          // SECCIÓN 8: VINCULACIÓN A GITHUB Y RESPALDO
          createHeading1("8. Vinculación al Repositorio GitHub y Evidencias de Avance"),
          createParagraph(
            "Como garantía de que el desarrollo cuenta con respaldos técnicos rigurosos, versionamiento formal y control de cambios paso a paso, el proyecto completo se encuentra alojado en GitHub en el siguiente enlace:"
          ),

          createCallout(
            "URL OFICIAL DEL REPOSITORIO GITHUB",
            "https://github.com/Sebastianaso/PrevySeg2026\n\n" +
            "Instrucciones de verificación para evaluadores e inspectores:\n" +
            "1. Acceda al enlace mediante cualquier navegador web.\n" +
            "2. En la pestaña 'Commits', podrá constatar el historial fechado de cada desarrollo, refactorización y resolución de requerimientos.\n" +
            "3. En la rama 'main' se encuentra la versión de producción actualmente desplegada.\n" +
            "4. Clonación local mediante terminal: git clone https://github.com/Sebastianaso/PrevySeg2026.git",
            COLOR_PRIMARY,
            "F8FAFC"
          ),

          new Paragraph({ spacing: { before: 200 } }),
          createParagraph(
            "Con esta entrega se da pleno cumplimiento a lo solicitado en las observaciones del mandante, suministrando tanto la Carta Gantt en formato Microsoft Excel (.xlsx) con el desglose de insumos de la empresa y la fase de subsanación de demandas, como la presente Documentación Técnica Maestra en formato Microsoft Word (.docx)."
          ),

          // FIRMA DE RESPONSABILIDAD TÉCNICA
          new Paragraph({ spacing: { before: 400, after: 100 } }),
          new Table({
            width: { size: 100, type: WidthType.PERCENTAGE },
            rows: [
              new TableRow({
                children: [
                  createCell([
                    new Paragraph({
                      alignment: AlignmentType.CENTER,
                      children: [
                        new TextRun({ text: "_________________________________________\n", color: COLOR_MUTED }),
                        new TextRun({ text: "SEBASTIÁN ACUÑA\n", bold: true, size: 20, color: COLOR_PRIMARY }),
                        new TextRun({ text: "Ingeniero de Software & Desarrollador Líder\n", size: 18, color: COLOR_TEXT }),
                        new TextRun({ text: "GitHub: https://github.com/Sebastianaso\n", size: 16, color: COLOR_SKY }),
                        new TextRun({ text: "OTEC PrevySeg SpA — Arica, Chile", size: 16, color: COLOR_MUTED, italics: true })
                      ]
                    })
                  ], { width: 50, borders: { top: { style: BorderStyle.NONE }, bottom: { style: BorderStyle.NONE }, left: { style: BorderStyle.NONE }, right: { style: BorderStyle.NONE } } }),
                  createCell([
                    new Paragraph({
                      alignment: AlignmentType.CENTER,
                      children: [
                        new TextRun({ text: "_________________________________________\n", color: COLOR_MUTED }),
                        new TextRun({ text: "DIRECCIÓN EJECUTIVA & ACADÉMICA\n", bold: true, size: 20, color: COLOR_PRIMARY }),
                        new TextRun({ text: "Contraparte Técnica & Mandatario\n", size: 18, color: COLOR_TEXT }),
                        new TextRun({ text: "Aprobación de Requerimientos y Carta Gantt\n", size: 16, color: COLOR_TEXT }),
                        new TextRun({ text: "OTEC PrevySeg SpA (RUT: 76.543.210-K)", size: 16, color: COLOR_MUTED, italics: true })
                      ]
                    })
                  ], { width: 50, borders: { top: { style: BorderStyle.NONE }, bottom: { style: BorderStyle.NONE }, left: { style: BorderStyle.NONE }, right: { style: BorderStyle.NONE } } })
                ]
              })
            ]
          })
        ]
      }
    ]
  });

  const outputPath = path.resolve('c:/Users/ashle/OneDrive/Escritorio/prevyseg/Documentacion_Tecnica_Maestra_PrevySeg_2026.docx');
  const buffer = await Packer.toBuffer(doc);
  fs.writeFileSync(outputPath, buffer);
  console.log(`✓ Documentación técnica generada exitosamente en: ${outputPath}`);
}

generateMasterTechnicalDoc().catch(console.error);
