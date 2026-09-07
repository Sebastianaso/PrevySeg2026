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

async function generateCompleteProjectDoc() {
  const COLOR_PRIMARY = "072B4F";      // Azul Marino Corporativo PrevySeg
  const COLOR_SECONDARY = "00A896";    // Teal / Verde Esmeralda
  const COLOR_SKY = "0284C7";          // Azul Tecnológico
  const COLOR_DARK = "0F172A";         // Slate Oscuro
  const COLOR_TEXT = "1E293B";         // Texto Principal
  const COLOR_MUTED = "475569";        // Texto Secundario
  const COLOR_BORDER = "CBD5E1";       // Borde Gris Claro
  const COLOR_BG_HEADER = "072B4F";    // Encabezado Tablas
  const COLOR_BG_LIGHT = "F8FAFC";     // Fila Alterna
  const COLOR_ACCENT = "F2A900";       // Acento Dorado

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

  const createHeading1 = (title) => new Paragraph({
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

  const createHeading2 = (title) => new Paragraph({
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

  const createHeading3 = (title) => new Paragraph({
    heading: HeadingLevel.HEADING_3,
    spacing: { before: 180, after: 80 },
    children: [
      new TextRun({
        text: title,
        bold: true,
        color: COLOR_DARK,
        size: 20,
        font: "Calibri"
      })
    ]
  });

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
          size: size,
          color: color,
          font: "Calibri"
        })
      ]
    });
  };

  const createBullet = (boldPrefix, text) => new Paragraph({
    bullet: { level: 0 },
    spacing: { after: 60, line: 260 },
    children: [
      new TextRun({
        text: boldPrefix + " ",
        bold: true,
        size: 19,
        color: COLOR_DARK,
        font: "Calibri"
      }),
      new TextRun({
        text: text,
        size: 19,
        color: COLOR_TEXT,
        font: "Calibri"
      })
    ]
  });

  const createCodeBlock = (code) => {
    const lines = code.split('\n');
    return new Table({
      width: { size: 100, type: WidthType.PERCENTAGE },
      rows: [
        new TableRow({
          children: [
            new TableCell({
              shading: { fill: "F1F5F9", type: ShadingType.CLEAR },
              margins: { top: 120, bottom: 120, left: 140, right: 140 },
              borders: standardBorders,
              children: lines.map(line => new Paragraph({
                spacing: { line: 200, after: 20 },
                children: [
                  new TextRun({
                    text: line,
                    font: "Consolas",
                    size: 16,
                    color: "0F172A"
                  })
                ]
              }))
            })
          ]
        })
      ]
    });
  };

  // Contenido de las 5 Fases
  const docChildren = [
    // PORTADA
    createParagraph("ORGANISMO TÉCNICO DE CAPACITACIÓN PREVYSEG LTDA.", { bold: true, size: 22, color: COLOR_SECONDARY, align: AlignmentType.CENTER, after: 100 }),
    createParagraph("DOCUMENTACIÓN TÉCNICA, ESTRATÉGICA Y ARQUITECTURA DE SOFTWARE", { bold: true, size: 32, color: COLOR_PRIMARY, align: AlignmentType.CENTER, after: 200 }),
    createParagraph("Plataforma Digital Institucional, Portal de Admisión Digital & Campus Virtual LMS 2026", { italic: true, size: 22, color: COLOR_MUTED, align: AlignmentType.CENTER, after: 400 }),
    
    new Table({
      width: { size: 100, type: WidthType.PERCENTAGE },
      rows: [
        new TableRow({
          children: [
            createCell("PARÁMETRO DEL PROYECTO", { isHeader: true, width: 35 }),
            createCell("ESPECIFICACIÓN FORMAL DE INGENIERÍA", { isHeader: true, width: 65 })
          ]
        }),
        new TableRow({
          children: [
            createCell("Nombre del Sistema", { bold: true }),
            createCell("Ecosistema Digital y Campus Virtual LMS PrevySeg (v3.0 - 2026)")
          ]
        }),
        new TableRow({
          children: [
            createCell("Organización Patrocinante", { bold: true }),
            createCell("PrevySeg Capacitaciones Ltda. (OTEC Reg. SENCE N° 1238088725 • NCh 2728:2015)")
          ]
        }),
        new TableRow({
          children: [
            createCell("Marco Normativo", { bold: true }),
            createCell("Ley N° 21.659 / Subsecretaría de Prevención del Delito (SPD), Ley N° 19.518 (SENCE), Ley N° 19.628")
          ]
        }),
        new TableRow({
          children: [
            createCell("Stack Tecnológico Base", { bold: true }),
            createCell("React 19, Vite, Tailwind CSS v4, GSAP, Supabase (PostgreSQL 15, Auth Bcrypt, RLS), Node.js")
          ]
        }),
        new TableRow({
          children: [
            createCell("Metodología de Desarrollo", { bold: true }),
            createCell("Ágil Híbrida (Scrum / Scrumban con Sprints Quincenales e Integración Continua)")
          ]
        }),
        new TableRow({
          children: [
            createCell("Autores y Líderes Técnicos", { bold: true }),
            createCell("Líder de Proyecto, Arquitecto de Software Principal y Dirección General PrevySeg")
          ]
        })
      ]
    }),

    new Paragraph({ children: [new PageBreak()] }),

    // ÍNDICE / RESUMEN
    createHeading1("Tabla de Contenidos Ejecutiva"),
    createParagraph("El presente documento consolida la arquitectura integral de software, especificación de requisitos, modelado de sistemas, guías de diseño de interfaz y estrategias de aseguramiento de calidad correspondientes al proyecto Ecosistema Digital PrevySeg 2026."),
    createBullet("Fase 1:", "Planificación y Gestión del Proyecto (Project Charter, WBS/EDT, Cronograma, RACI, Matriz de Riesgos)."),
    createBullet("Fase 2:", "Especificación Formal de Requisitos (Requisitos Funcionales RF, No Funcionales RNF, Historias de Usuario con Gherkin)."),
    createBullet("Fase 3:", "Arquitectura, Modelado y Diagramas (Flujo BPMN, Casos de Uso, Secuencia Crítica, Estados, Clases, DER, C4 Contenedores y Despliegue)."),
    createBullet("Fase 4:", "Diseño de Interfaz de Usuario y Experiencia (User Flow, Wireframes Estructurales, Guía de Estilos y Accesibilidad WCAG)."),
    createBullet("Fase 5:", "Pruebas, Despliegue y Operación (Plan de Pruebas, Casos de Prueba, OpenAPI / YAML, Manual de Instalación Local y Servidor)."),

    new Paragraph({ children: [new PageBreak()] }),

    // ==========================================
    // FASE 1: PLANIFICACIÓN Y GESTIÓN
    // ==========================================
    createHeading1("Fase 1: Planificación y Gestión (Documentación Ejecutiva)"),
    createHeading2("1.1 Project Charter (Acta de Constitución del Proyecto)"),
    createParagraph("1.1.1 Justificación del Negocio y Objetivos SMART", { bold: true }),
    createParagraph("PrevySeg Capacitaciones Ltda. requiere resolver la dependencia histórica de procesos presenciales e intermediarios en papel para la captación, admisión, pago fraccionado y gestión curricular de sus cursos de Seguridad Privada y Escuela de Oficios. La promulgación de la Ley N° 21.659 de Seguridad Privada exige trazabilidad estricta y expedición controlada de antecedentes para los exámenes ante la Subsecretaría de Prevención del Delito (SPD - Carabineros OS-10)."),
    createBullet("Específico (S):", "Desarrollar y desplegar un portal web transaccional con Ficha de Inscripción Digital, sistema de Abono al 50% y un Campus Virtual LMS RBAC multirrol para la administración académica de 600+ alumnos anuales."),
    createBullet("Medible (M):", "Lograr una tasa de digitalización del 100% de expedientes de matrícula, reduciendo el tiempo medio de confirmación de inscripción de 72 horas a menos de 15 minutos."),
    createBullet("Alcanzable (A):", "Aprovechar la infraestructura BaaS de Supabase (PostgreSQL 15 con extensiones pgcrypto y RLS) y un frontend moderno y reactivo en React 19 / Vite."),
    createBullet("Relevante (R):", "Cumplir con los estándares de acreditación de la Norma Chilena NCh 2728:2015 para OTEC y los requisitos de Franquicia Tributaria SENCE (Ley 19.518)."),
    createBullet("Temporal (T):", "Completar la fase de construcción, certificación de seguridad y puesta en marcha en un plazo improrrogable de 8 semanas."),

    createParagraph("1.1.2 Alcance Preliminar (Inclusiones y Exclusiones)", { bold: true }),
    createBullet("Inclusiones Explícitas:", "Vitrina interactiva de cursos con diferenciación de acreditación SPD vs Oficios OTEC; Ficha Digital de Admisión con cálculo automático del 50% de abono; pasarelas de pago Webpay/Transferencia; derivación a WhatsApp Business (+56 9 8231 2128); Campus Virtual LMS con roles ADMIN, TEACHER y STUDENT; gestión de participantes con reseteo de claves encriptadas Bcrypt; módulo de emisión de diplomas protegidos sin notas visibles (Ley 19.628); y Bolsa de Empleos Regional."),
    createBullet("Exclusiones Explícitas:", "Toma física de exámenes de tiro o prácticos de seguridad (competencia indelegable de la autoridad fiscalizadora SPD/Carabineros OS-10); procesamiento directo de dinero sin intermediario bancario; y emisión de certificados SENCE sin la validación biométrica presencial obligatoria."),

    createParagraph("1.1.3 Presupuesto Estimado, Hitos y Stakeholders", { bold: true }),
    new Table({
      width: { size: 100, type: WidthType.PERCENTAGE },
      rows: [
        new TableRow({
          children: [
            createCell("Hito Principal", { isHeader: true, width: 30 }),
            createCell("Plazo de Entrega", { isHeader: true, width: 25 }),
            createCell("Presupuesto Asignado (CLP)", { isHeader: true, width: 25 }),
            createCell("Entregable Clave", { isHeader: true, width: 20 })
          ]
        }),
        new TableRow({
          children: [
            createCell("H1: Análisis, SRS y Arquitectura"),
            createCell("Semana 1 - 2"),
            createCell("$ 2.800.000"),
            createCell("SRS v3.0, DER y C4")
          ]
        }),
        new TableRow({
          children: [
            createCell("H2: Portal Web, Admisión & Abono 50%"),
            createCell("Semana 3 - 4"),
            createCell("$ 4.500.000"),
            createCell("Frontend Web & Pagos")
          ]
        }),
        new TableRow({
          children: [
            createCell("H3: Campus Virtual LMS & RBAC"),
            createCell("Semana 5 - 6"),
            createCell("$ 5.800.000"),
            createCell("LMS 3 Roles & Diplomas")
          ]
        }),
        new TableRow({
          children: [
            createCell("H4: QA, Seguridad Bcrypt & Deploy"),
            createCell("Semana 7 - 8"),
            createCell("$ 3.200.000"),
            createCell("Deploy Producción & Docs")
          ]
        }),
        new TableRow({
          children: [
            createCell("TOTAL ESTIMADO", { bold: true }),
            createCell("8 Semanas (2 Meses)", { bold: true }),
            createCell("$ 16.300.000 CLP", { bold: true }),
            createCell("Sistema Operativo 100%", { bold: true })
          ]
        })
      ]
    }),

    createHeading2("1.2 Estructura de Desglose del Trabajo (WBS / EDT)"),
    createParagraph("Descomposición jerárquica hasta nivel de paquetes de trabajo (Work Packages):"),
    createBullet("1.0 Ecosistema Digital PrevySeg", "Proyecto Matriz."),
    createBullet("  1.1 Dirección y Gestión de Proyecto:", "1.1.1 Project Charter; 1.1.2 Gestión de Riesgos; 1.1.3 Control de Cronograma y Sprints."),
    createBullet("  1.2 Especificación y Arquitectura:", "1.2.1 SRS según ISO/IEC/IEEE 29148; 1.2.2 Modelo de Datos DER; 1.2.3 Diagramas C4 y BPMN."),
    createBullet("  1.3 Portal Web Público & Front-Office:", "1.3.1 Hero y Vitrina de Programas; 1.3.2 Ficha Digital de Admisión; 1.3.3 Motor de Abono 50%; 1.3.4 Validador RUT Módulo 11."),
    createBullet("  1.4 Campus Virtual LMS (Back-Office Académico):", "1.4.1 Módulo Autenticación Supabase Auth; 1.4.2 Área Personal del Alumno; 1.4.3 Aula Virtual y Evaluaciones; 1.4.4 Consola Administrativa OTEC; 1.4.5 Panel Docente."),
    createBullet("  1.5 Integraciones y Seguridad:", "1.5.1 Criptografía Bcrypt 256-bit (pgcrypto); 1.5.2 Pasarela de Pagos Webpay Plus; 1.5.3 API WhatsApp Business."),
    createBullet("  1.6 Aseguramiento de Calidad y Puesta en Producción:", "1.6.1 Pruebas Unitarias y E2E; 1.6.2 Auditoría de Seguridad RLS; 1.6.3 Despliegue en Edge Cloud y Capacitación a Stakeholders."),

    createHeading2("1.3 Matriz RACI de Responsabilidades"),
    new Table({
      width: { size: 100, type: WidthType.PERCENTAGE },
      rows: [
        new TableRow({
          children: [
            createCell("Entregable / Paquete de Trabajo", { isHeader: true, width: 32 }),
            createCell("Project Manager", { isHeader: true, width: 17 }),
            createCell("Lead Software Eng.", { isHeader: true, width: 17 }),
            createCell("Fullstack Dev", { isHeader: true, width: 17 }),
            createCell("Dir. OTEC PrevySeg", { isHeader: true, width: 17 })
          ]
        }),
        new TableRow({
          children: [
            createCell("Project Charter & WBS"),
            createCell("A (Accountable)"),
            createCell("C (Consulted)"),
            createCell("I (Informed)"),
            createCell("R (Responsible)")
          ]
        }),
        new TableRow({
          children: [
            createCell("SRS & Arquitectura de Datos"),
            createCell("C (Consulted)"),
            createCell("A (Accountable)"),
            createCell("R (Responsible)"),
            createCell("C (Consulted)")
          ]
        }),
        new TableRow({
          children: [
            createCell("Portal Admisión & Abono 50%"),
            createCell("I (Informed)"),
            createCell("A (Accountable)"),
            createCell("R (Responsible)"),
            createCell("C (Consulted)")
          ]
        }),
        new TableRow({
          children: [
            createCell("Campus Virtual LMS & RBAC"),
            createCell("I (Informed)"),
            createCell("A (Accountable)"),
            createCell("R (Responsible)"),
            createCell("C (Consulted)")
          ]
        }),
        new TableRow({
          children: [
            createCell("Auditoría Seguridad Bcrypt & RLS"),
            createCell("I (Informed)"),
            createCell("R / A"),
            createCell("R (Responsible)"),
            createCell("I (Informed)")
          ]
        }),
        new TableRow({
          children: [
            createCell("Aceptación Final y Go-Live"),
            createCell("R (Responsible)"),
            createCell("C (Consulted)"),
            createCell("I (Informed)"),
            createCell("A (Accountable)")
          ]
        })
      ]
    }),

    createHeading2("1.4 Matriz de Riesgos (Top 5 Riesgos Técnicos y de Negocio)"),
    new Table({
      width: { size: 100, type: WidthType.PERCENTAGE },
      rows: [
        new TableRow({
          children: [
            createCell("ID", { isHeader: true, width: 8 }),
            createCell("Riesgo Identificado", { isHeader: true, width: 27 }),
            createCell("Prob. / Imp.", { isHeader: true, width: 17 }),
            createCell("Estrategia de Mitigación", { isHeader: true, width: 33 }),
            createCell("Responsable", { isHeader: true, width: 15 })
          ]
        }),
        new TableRow({
          children: [
            createCell("R-01"),
            createCell("Cambios regulatorios intempestivos en directrices de la SPD (Ley 21.659)."),
            createCell("Media / Alto"),
            createCell("Aislamiento de la lógica normativa en banderas parametrizables y avisos dinámicos en frontend."),
            createCell("Dir. Académica")
          ]
        }),
        new TableRow({
          children: [
            createCell("R-02"),
            createCell("Brechas de seguridad o fuga de contraseñas de alumnos/docentes."),
            createCell("Baja / Crítico"),
            createCell("Criptografía Blowfish Bcrypt 256-bit mediante stored procedures SECURITY DEFINER y RLS en Postgres."),
            createCell("Lead Eng.")
          ]
        }),
        new TableRow({
          children: [
            createCell("R-03"),
            createCell("Ingreso de RUTs falsificados o mal estructurados en admisiones."),
            createCell("Alta / Medio"),
            createCell("Validación estricta y formateo dinámico en vivo bajo algoritmo matemático Módulo 11 en cliente y base de datos."),
            createCell("Frontend Dev")
          ]
        }),
        new TableRow({
          children: [
            createCell("R-04"),
            createCell("Pérdida de comprobantes de pago o abonos transferidos manualmente."),
            createCell("Media / Alto"),
            createCell("Canalización automática con código de reserva único y enlace directo pre-poblado a WhatsApp de Admisión."),
            createCell("Fullstack Dev")
          ]
        }),
        new TableRow({
          children: [
            createCell("R-05"),
            createCell("Saturación o desconexión en evaluaciones del Campus Virtual."),
            createCell("Baja / Alto"),
            createCell("Persistencia local de progreso en navegador y fallback automático a caché sin pérdida de respuestas."),
            createCell("Fullstack Dev")
          ]
        })
      ]
    }),

    new Paragraph({ children: [new PageBreak()] }),

    // ==========================================
    // FASE 2: ESPECIFICACIÓN DE REQUISITOS (SRS)
    // ==========================================
    createHeading1("Fase 2: Especificación de Requisitos de Software (SRS / IEEE 830)"),
    createHeading2("2.1 Requisitos Funcionales (RF)"),
    createBullet("RF-01: Ficha Digital de Inscripción y Matrícula con Abono 50%:", "Entrada: Nombres, RUT, correo, fono, curso seleccionado y modalidad de pago. Procesamiento: Valida RUT con Módulo 11; detecta si el curso es SPD (aviso examen externo) u Oficio (certificación OTEC); calcula Cuota 1 (50%) y Cuota 2 (saldo restante). Salida: Registro en BD de matrículas, generación de credenciales y despacho a WhatsApp."),
    createBullet("RF-02: Autenticación Segura y Control de Acceso por Roles (RBAC):", "Entrada: Cédula de Identidad (RUT) y contraseña. Procesamiento: Hash Bcrypt contra tabla pública y auth.users con verificación de rol (ADMIN, TEACHER, STUDENT). Salida: Token JWT de sesión y redirección al área personal correspondiente."),
    createBullet("RF-03: Gestión y Emisión de Diplomas Oficiales:", "Entrada: Visto bueno de aprobación del Administrador OTEC. Procesamiento: Generación de certificado PDF con código de verificación QR, fecha y firmas, sin exposición de notas numéricas según Ley 19.628. Salida: Diploma oficial descargable por el alumno."),
    createBullet("RF-04: Administración de Participantes y Reseteo de Claves:", "Entrada: ID de participante y nueva contraseña en texto plano desde panel admin. Procesamiento: Llamada a procedimiento almacenado seguro public.change_user_password que computa extensions.crypt() con salt generado. Salida: Clave actualizada sin exposición en logs ni texto plano."),
    createBullet("RF-05: Calculadora de Franquicia Tributaria SENCE:", "Entrada: Remuneración bruta del trabajador y costo hora curso. Procesamiento: Clasificación en tramo 100%, 50% o 15% según valor UTM/UF legal. Salida: Monto imputable a franquicia y copago final de la empresa."),

    createHeading2("2.2 Requisitos No Funcionales (RNF) con Métricas Medibles"),
    createBullet("RNF-01: Rendimiento (Performance):", "Tiempo de carga inicial de página (First Contentful Paint) menor a 1.2 segundos y respuesta de APIs Supabase inferior a 250 ms bajo una concurrencia nominal de 50 usuarios simultáneos."),
    createBullet("RNF-02: Seguridad Criptográfica:", "Hashing de credenciales bajo algoritmo Blowfish Bcrypt con factor de costo 10 (256-bit); transporte cifrado TLS 1.3 con HSTS activo; políticas de Row Level Security (RLS) en todas las tablas de PostgreSQL."),
    createBullet("RNF-03: Disponibilidad y Confiabilidad:", "SLA de disponibilidad mínima del 99.8% mensual para el Campus Virtual, respaldos automáticos diarios de base de datos Point-In-Time Recovery (PITR)."),
    createBullet("RNF-04: Escalabilidad:", "Arquitectura Serverless y Edge capaz de soportar picos de 5.000 visitas diarias y 300 alumnos concurrentes en periodo de matrículas sin degradación de rendimiento."),

    createHeading2("2.3 Historias de Usuario en Formato Ágil y Criterios Gherkin"),
    createParagraph("Historia de Usuario HU-01: Inscripción con Abono del 50%", { bold: true }),
    createParagraph("Como postulante a un curso de seguridad o de oficios,\nQuiero completar mi inscripción online y pagar solo el 50% inicial,\nPara asegurar mi vacante sin tener que desembolsar el monto total de inmediato."),
    createCodeBlock(`Escenario: Inscripción exitosa con cálculo automático de cuotas
  Dado que el postulante está en la sección #admision del portal
  Cuando selecciona el curso "Guardia de Seguridad Privada OS-10" con arancel de $150.000
  Y completa sus datos con un RUT válido "18.432.119-4" y teléfono celular
  Entonces el sistema calcula automáticamente Cuota 1 = $75.000 y Cuota 2 = $75.000
  Y muestra el aviso obligatorio: "Acreditación externa ante la SPD requerida"
  Y al presionar "Enviar y Coordinar Abono" se abre WhatsApp con el mensaje pre-cargado`),

    createParagraph("Historia de Usuario HU-02: Reseteo Seguro de Contraseñas por Administrador", { bold: true }),
    createParagraph("Como Administrador del OTEC PrevySeg,\nQuiero resetear la clave de un alumno desde la consola de participantes,\nPara restablecer su acceso al campus de forma inmediata y encriptada."),
    createCodeBlock(`Escenario: Reseteo exitoso de clave de acceso
  Dado que el Administrador ha iniciado sesión en el LMS con rol "ADMIN"
  Cuando ingresa al módulo de Participantes y selecciona al alumno "18.432.119-4"
  Y escribe una nueva contraseña segura en el modal de reseteo
  Entonces el sistema ejecuta la función encriptada en base de datos con Bcrypt
  Y el alumno puede ingresar inmediatamente con su RUT y su nueva credencial`),

    new Paragraph({ children: [new PageBreak()] }),

    // ==========================================
    // FASE 3: ARQUITECTURA, MODELADO Y DIAGRAMAS
    // ==========================================
    createHeading1("Fase 3: Arquitectura, Modelado y Diagramas de Sistema"),
    createParagraph("A continuación se detallan las especificaciones lógicas y el código fuente textual editable en sintaxis Mermaid.js para cada vista arquitectónica del sistema."),

    createHeading2("3.1 Flujo de Procesos To-Be (BPMN 2.0 en Mermaid.js)"),
    createParagraph("Explica el ciclo integral desde que el postulante descubre la oferta académica, pasa por la verificación del 50% de abono, revisión documental ante la SPD o SENCE, hasta la certificación final."),
    createCodeBlock(`graph TD
    A([Inicio: Postulante ingresa al Portal]) --> B[Selecciona Programa de Formación]
    B --> C{¿Curso Seguridad SPD u Oficio?}
    C -->|Seguridad Privada| D[Aviso: Examen ante SPD / OS-10]
    C -->|Escuela de Oficios| E[Aviso: Certificación Directa OTEC]
    D --> F[Completa Ficha de Admisión Digital]
    E --> F
    F --> G[Validador RUT Módulo 11 y Datos]
    G --> H[Cálculo Automático Abono 50%]
    H --> I[Pago Cuota 1 vía Webpay o Transferencia]
    I --> J[Validación Documental WhatsApp Admisión]
    J --> K{¿Documentos Válidos?}
    K -->|No| L[Solicitud de Corrección al Postulante]
    L --> J
    K -->|Sí| M[Generación de Cuenta LMS con Bcrypt]
    M --> N[Alumno Cursa Lecciones en Aula Virtual]
    N --> O[Pago Cuota 2: 50% Restante]
    O --> P[Evaluación Final o Examen SPD]
    P --> Q[Emisión de Diploma Oficial sin Notas]
    Q --> R([Fin del Proceso])`),

    createHeading2("3.2 UML de Comportamiento: Casos de Uso"),
    createCodeBlock(`graph LR
    subgraph Actores
        POST((Postulante))
        ALUM((Estudiante))
        DOC((Docente))
        ADM((Administrador))
    end

    subgraph "Portal Público & Admisión"
        UC1[Inscribirse y Abonar 50%]
        UC2[Consultar Cursos y Tramos SENCE]
        UC3[Contactar vía WhatsApp]
    end

    subgraph "Campus Virtual LMS"
        UC4[Acceder a Lecciones y Material]
        UC5[Rendir Evaluaciones Online]
        UC6[Descargar Diploma Oficial]
        UC7[Gestionar Notas y Asistencia]
        UC8[Resetear Claves y Participantes]
        UC9[Aprobar Certificados OTEC]
    end

    POST --> UC1
    POST --> UC2
    POST --> UC3
    ALUM --> UC4
    ALUM --> UC5
    ALUM --> UC6
    DOC --> UC4
    DOC --> UC7
    ADM --> UC8
    ADM --> UC9`),

    createHeading2("3.3 Diagrama de Secuencia: Flujo Crítico de Admisión y Registro Bcrypt"),
    createCodeBlock(`sequenceDiagram
    autonumber
    actor P as Postulante
    participant UI as EnrollmentForm.jsx
    participant V as validation.js (Módulo 11)
    participant API as Supabase Client
    participant DB as PostgreSQL (pgcrypto)
    participant WA as WhatsApp Business

    P->>UI: Ingresa RUT, Nombres y Curso
    UI->>V: formatRut() y validateRut()
    V-->>UI: RUT Válido (true)
    UI->>UI: Calcula Cuota 1 (50%) y Cuota 2 (50%)
    P->>UI: Presiona "Confirmar Inscripción"
    UI->>API: rpc('admin_create_user', { rut, password, rol: 'STUDENT' })
    API->>DB: extensions.crypt(password, gen_salt('bf'))
    DB-->>DB: Inserta en auth.users, auth.identities y public.users
    DB-->>API: Usuario Creado Exitosamente
    API-->>UI: 200 OK (User ID)
    UI->>WA: Abre chat con mensaje pre-estructurado y código de matrícula
    WA-->>P: Coordinación de recepción de antecedentes`),

    createHeading2("3.4 Diagrama de Estados: Ciclo de Vida de la Matrícula"),
    createCodeBlock(`stateDiagram-v2
    [*] --> PRE_INSCRITO: Completa Ficha Web
    PRE_INSCRITO --> ABONO_PENDIENTE: Genera Plan 50%
    ABONO_PENDIENTE --> VALIDACION_DOCUMENTAL: Paga Cuota 1 (50%)
    VALIDACION_DOCUMENTAL --> MATRICULADO_ACTIVO: Documentos Aprobados SPD/OTEC
    VALIDACION_DOCUMENTAL --> RECHAZADO: Antecedentes Incompatibles
    MATRICULADO_ACTIVO --> EN_CURSO: Inicia Clases LMS
    EN_CURSO --> SALDO_PENDIENTE: Finaliza Contenidos
    SALDO_PENDIENTE --> APROBADO: Paga Cuota 2 y Aprueba Curso
    APROBADO --> CERTIFICADO_EMITIDO: Visto Bueno Administrador
    CERTIFICADO_EMITIDO --> [*]`),

    createHeading2("3.5 Modelo Entidad-Relación (DER Físico en Mermaid.js)"),
    createCodeBlock(`erDiagram
    USERS {
        uuid id PK
        string rut UK
        string email UK
        string nombre_completo
        string rol "ADMIN | TEACHER | STUDENT"
        string telefono
        string encrypted_password
        timestamp created_at
    }

    COURSES {
        uuid id PK
        string codigo_sence UK
        string nombre
        string tipo "SEGURIDAD_SPD | OFICIO_OTEC"
        integer arancel_total
        integer cuota_abono_50
        integer horas_cronologicas
        boolean activo
    }

    ENROLLMENTS {
        uuid id PK
        uuid user_id FK
        uuid course_id FK
        string estado "PRE_INSCRITO | ACTIVO | APROBADO"
        integer monto_abonado
        integer saldo_pendiente
        string comprobante_abono_url
        timestamp fecha_matricula
    }

    LESSONS {
        uuid id PK
        uuid course_id FK
        string titulo
        integer orden
        text contenido_markdown
        string video_url
    }

    CERTIFICATES {
        uuid id PK
        uuid enrollment_id FK
        string codigo_verificacion UK
        timestamp fecha_emision
        boolean aprobado_por_admin
        string hash_verificador
    }

    USERS ||--o{ ENROLLMENTS : "posee"
    COURSES ||--o{ ENROLLMENTS : "incluye"
    COURSES ||--o{ LESSONS : "contiene"
    ENROLLMENTS ||--o| CERTIFICATES : "origina"`),

    createHeading2("3.6 Diagrama de Contenedores C4"),
    createCodeBlock(`graph TB
    subgraph "C4: Nivel 2 - Diagrama de Contenedores Ecosistema PrevySeg"
        USER[Usuarios: Alumnos, Docentes y Admins] -->|HTTPS / TLS 1.3| SPA[Single Page Application: React 19 + Vite + Tailwind v4]
        SPA -->|REST / PostgREST| SUPA_REST[Supabase PostgREST API Gateway]
        SPA -->|Auth JWT| SUPA_AUTH[Supabase GoTrue Auth Service]
        SPA -->|WebSockets| SUPA_RT[Supabase Realtime Engine]
        
        SUPA_REST -->|SQL con RLS| PG[(PostgreSQL 15 Database + pgcrypto)]
        SUPA_AUTH -->|Stored Procedures Bcrypt| PG
        SPA -->|API Externa| WA_API[WhatsApp Business Webhook]
        SPA -->|Redirect / Webhook| WEBPAY[Pasarela Webpay Plus Transbank]
    end`),

    createHeading2("3.7 Diagrama de Despliegue de Infraestructura"),
    createCodeBlock(`graph LR
    subgraph "Cliente"
        NAV[Navegadores Web: Chrome, Safari, Edge, Móvil]
    end

    subgraph "Edge CDN & Hosting (Vercel / Cloudflare)"
        EDGE[Vercel Global Edge Network]
        STATIC[Assets Estáticos: JS, CSS, Imágenes WebP]
    end

    subgraph "Backend as a Service (Supabase Cloud AWS)"
        KONG[API Gateway Kong Reverse Proxy]
        AUTH_POD[GoTrue Auth Container]
        DB_POD[(PostgreSQL 15 Cluster con Réplica)]
        STOR_POD[S3 Compatible Object Storage]
    end

    NAV -->|HTTPS 443| EDGE
    EDGE --> STATIC
    NAV -->|API Requests TLS 1.3| KONG
    KONG --> AUTH_POD
    KONG --> DB_POD
    KONG --> STOR_POD`),

    new Paragraph({ children: [new PageBreak()] }),

    // ==========================================
    // FASE 4: DISEÑO DE INTERFAZ Y UX
    // ==========================================
    createHeading1("Fase 4: Diseño de Interfaz y Experiencia de Usuario (UI/UX)"),
    createHeading2("4.1 User Flow Principal (Recorrido del Postulante)"),
    createParagraph("Paso a paso del flujo de usuario:"),
    createBullet("Paso 1: Descubrimiento:", "El usuario ingresa al portal institucional, navega el Hero con fotografía real y visualiza el catálogo oficial de 6 cursos."),
    createBullet("Paso 2: Admisión Guiada:", "Hace clic en 'Inscribirse' en el curso deseado; el sistema despliega el acordeón interactivo de la Ficha de Admisión con scroll asistido."),
    createBullet("Paso 3: Validación en Vivo:", "Ingresa su RUT y ve el formateo instantáneo con puntos y guion. Si el curso es OS-10, lee el banner preventivo de evaluación ante la SPD."),
    createBullet("Paso 4: Plan de Abono 50%:", "Visualiza el desglose exacto: Cuota 1 a pagar hoy y Cuota 2 al inicio lectivo. Selecciona método de pago."),
    createBullet("Paso 5: Cierre y WhatsApp:", "El sistema genera la pre-matrícula y redirige al WhatsApp oficial con el resumen completo listo para enviar al ejecutivo."),

    createHeading2("4.2 Estructura de Wireframes de las 3 Pantallas Clave"),
    createParagraph("1. Pantalla Home & Portal de Admisión:", { bold: true }),
    createParagraph("[Header Sticky: Logo OTEC | Menú de Navegación | Botón Acceso Campus Virtual]\n[Hero Banner: Foto Graduación Real | Título Principal | Botones CTA 'Inscribirse' y 'Ver Cursos']\n[Catálogo de Cursos: Cards interactivas con Horas, Código SENCE, Arancel y Botón Matrícula]\n[Sección Admisión: Acordeón expansivo 'Inscribirse' con Ficha de 4 Pasos y Cálculo 50%]\n[Contacto & Footer: Mapa Google Maps, Teléfonos, WhatsApp y Enlaces Institucionales]"),
    
    createParagraph("2. Pantalla Campus Virtual - Área Personal del Alumno:", { bold: true }),
    createParagraph("[Top Bar: Avatar del Alumno | RUT | Notificaciones | Botón Cerrar Sesión]\n[Sidebar: Área Personal | Mis Cursos | Aula Virtual | Certificados | Bolsa de Trabajo]\n[Main Container: Tarjeta de Progreso Académico % | Lista de Cursos Activos | Calendario de Clases]\n[Módulo Diplomas: Vista previa de certificados aprobados sin notas numéricas | Botón PDF]"),

    createParagraph("3. Pantalla Consola Administrativa OTEC:", { bold: true }),
    createParagraph("[Sidebar Admin: Panel General | Admisión Digital | Participantes | Visto Bueno Diplomas | Ajustes]\n[Tabla de Participantes: Buscador por RUT/Nombre | Filtro de Estado | Botón 'Crear Alumno']\n[Acciones por Fila: Editar Perfil | Cambiar Rol | Modal 'Resetear Clave' con Bcrypt]\n[Módulo Aprobación: Selector de alumnos con 100% de asistencia | Switch de Aprobación Oficial]"),

    createHeading2("4.3 Guía de Estilos y Tokens de Diseño (Design System)"),
    createBullet("Navy Dark Corporativo:", "#072B4F - Utilizado en encabezados institucionales, footer y tarjetas premium."),
    createBullet("Teal Vibrant / Esmeralda:", "#00A896 - Utilizado en botones de acción principal, badges y confirmaciones."),
    createBullet("Sky Blue / Cyan:", "#0284C7 - Utilizado en enlaces activos, barras de progreso y acentos interactivos."),
    createBullet("Dark Slate Background:", "#0F172A - Utilizado en modales y contrastes de aula virtual."),
    createBullet("Tipografía Primaria:", "Inter / Open Sans (Cuerpo de texto, legible, 14px - 16px)."),
    createBullet("Tipografía de Titulares:", "Montserrat / System Sans (Titulares h1-h4 con pesos 700 a 900)."),
    createBullet("Accesibilidad (WCAG 2.1 AA):", "Contraste de texto mínimo de 4.5:1 para texto normal y 3:1 para titulares grandes contra cualquier fondo."),

    new Paragraph({ children: [new PageBreak()] }),

    // ==========================================
    // FASE 5: PRUEBAS, ENTREGA Y OPERACIÓN
    // ==========================================
    createHeading1("Fase 5: Pruebas, Entrega y Operación del Sistema"),
    createHeading2("5.1 Plan de Pruebas Integral (Testing Strategy)"),
    createBullet("Pruebas Unitarias (Frontend & Utils):", "Validación matemática de algoritmo Módulo 11 en validation.js, formateo de números telefónicos y cálculo exacto de cuotas 50%."),
    createBullet("Pruebas de Integración (Backend Supabase):", "Ejecución de stored procedures admin_create_user y change_user_password, comprobando el hashing efectivo mediante pgcrypto."),
    createBullet("Pruebas de Seguridad y Control de Acceso (RLS):", "Verificación de que un usuario con rol STUDENT no pueda consultar datos de otros alumnos ni modificar tablas de certificados."),
    createBullet("Pruebas de Carga y Rendimiento:", "Simulación de 100 peticiones concurrentes de inscripción digital con herramientas de benchmarking ligero asegurando tiempos < 500ms."),

    createHeading2("5.2 Casos de Prueba Representativos"),
    new Table({
      width: { size: 100, type: WidthType.PERCENTAGE },
      rows: [
        new TableRow({
          children: [
            createCell("Caso / ID", { isHeader: true, width: 12 }),
            createCell("Precondición", { isHeader: true, width: 23 }),
            createCell("Pasos de Ejecución", { isHeader: true, width: 35 }),
            createCell("Resultado Esperado", { isHeader: true, width: 30 })
          ]
        }),
        new TableRow({
          children: [
            createCell("CP-01: Validación de RUT"),
            createCell("Formulario de admisión abierto en pantalla."),
            createCell("1. Escribir '184321194' sin formato.\n2. Escribir un RUT con dígito verificador inválido '11.111.111-2'."),
            createCell("El primer RUT se formatea dinámicamente a '18.432.119-4' y se aprueba. El segundo muestra error visual inmediato.")
          ]
        }),
        new TableRow({
          children: [
            createCell("CP-02: Abono 50% Matemático"),
            createCell("Curso seleccionado con valor $150.000."),
            createCell("1. Verificar desglose de cuotas en pantalla de admisión.\n2. Confirmar que el abono inicial corresponde al 50% exacto."),
            createCell("Se calcula Cuota 1 = $75.000 y Cuota 2 = $75.000 de forma inmutable.")
          ]
        }),
        new TableRow({
          children: [
            createCell("CP-03: Reseteo Bcrypt"),
            createCell("Usuario admin logueado en consola."),
            createCell("1. Seleccionar participante.\n2. Abrir modal de reseteo e ingresar clave 'Prevy2026!'.\n3. Probar login con nueva clave."),
            createCell("Stored procedure retorna 200 OK, la BD almacena hash $2a$ y el usuario ingresa con éxito.")
          ]
        })
      ]
    }),

    createHeading2("5.3 Especificación de API (Endpoints OpenAPI / YAML)"),
    createParagraph("Definición de los 2 endpoints transaccionales más críticos del ecosistema:"),
    createCodeBlock(`openapi: 3.0.3
info:
  title: API de Gestión Académica y Admisiones PrevySeg
  version: 3.0.0
paths:
  /rest/v1/rpc/admin_create_user:
    post:
      summary: Creación Segura de Participante con Hash Bcrypt
      security:
        - BearerAuth: []
      requestBody:
        required: true
        content:
          application/json:
            schema:
              type: object
              required: [p_rut, p_email, p_nombre, p_password, p_rol]
              properties:
                p_rut: { type: string, example: "18.432.119-4" }
                p_email: { type: string, example: "alumno@prevyseg.cl" }
                p_nombre: { type: string, example: "Carlos Tapia Gómez" }
                p_password: { type: string, example: "PrevySeg2026*" }
                p_rol: { type: string, enum: [ADMIN, TEACHER, STUDENT] }
      responses:
        '200':
          description: Usuario creado exitosamente en Auth y Public
          content:
            application/json:
              schema:
                type: object
                properties:
                  id: { type: string, format: uuid }
                  status: { type: string, example: "SUCCESS" }
        '400':
          description: RUT duplicado o parámetros inválidos
        '500':
          description: Error interno de base de datos

  /rest/v1/enrollments:
    post:
      summary: Registro de Admisión con Cálculo de Abono 50%
      requestBody:
        required: true
        content:
          application/json:
            schema:
              type: object
              required: [user_id, course_id, monto_abonado]
              properties:
                user_id: { type: string, format: uuid }
                course_id: { type: string, format: uuid }
                monto_abonado: { type: integer, example: 75000 }
                saldo_pendiente: { type: integer, example: 75000 }
      responses:
        '201':
          description: Inscripción registrada satisfactoriamente
        '400':
          description: Monto no corresponde al 50% requerido`),

    createHeading2("5.4 Manual de Despliegue y Puesta en Marcha"),
    createParagraph("Instrucciones técnicas para instalación local y despliegue en servidor:"),
    createBullet("1. Requisitos de Entorno:", "Node.js versión 18.0.0 o superior (recomendado 20.x LTS), npm versión 9.x o superior, Git."),
    createBullet("2. Clonación y Dependencias:", "git clone https://github.com/Sebastianaso/PrevySeg2026.git && cd prevyseg && npm install"),
    createBullet("3. Variables de Entorno (.env.local):", "Configurar VITE_SUPABASE_URL y VITE_SUPABASE_ANON_KEY con las credenciales del proyecto Supabase."),
    createBullet("4. Ejecución en Desarrollo Local:", "npm run dev (Servidor disponible en http://localhost:5173)."),
    createBullet("5. Compilación de Producción:", "npm run build (Genera bundle minificado y optimizado en carpeta dist/)."),
    createBullet("6. Despliegue en Servidor / Vercel:", "Importar repositorio en Vercel, configurar las variables de entorno en el panel y ejecutar deploy automático mediante rama main.")
  ];

  const doc = new Document({
    creator: "Equipo de Arquitectura e Ingeniería de Software PrevySeg",
    title: "Documentación Técnica y Estratégica PrevySeg 2026",
    description: "Paquete completo de entregables de ingeniería de software para el ecosistema PrevySeg 2026",
    sections: [
      {
        properties: {
          page: {
            margin: {
              top: 1440,
              bottom: 1440,
              left: 1440,
              right: 1440,
            },
          },
        },
        headers: {
          default: new Header({
            children: [
              new Paragraph({
                alignment: AlignmentType.RIGHT,
                children: [
                  new TextRun({
                    text: "PrevySeg Capacitaciones OTEC | Documentación Técnica & Estratégica 2026",
                    size: 16,
                    color: "64748B",
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
                    color: "64748B",
                    font: "Calibri"
                  }),
                  new TextRun({
                    children: [PageNumber.CURRENT],
                    size: 16,
                    color: "64748B",
                    font: "Calibri"
                  }),
                  new TextRun({
                    text: " de ",
                    size: 16,
                    color: "64748B",
                    font: "Calibri"
                  }),
                  new TextRun({
                    children: [PageNumber.TOTAL_PAGES],
                    size: 16,
                    color: "64748B",
                    font: "Calibri"
                  })
                ]
              })
            ]
          })
        },
        children: docChildren
      }
    ]
  });

  const buffer = await Packer.toBuffer(doc);
  const outputPath = path.join(__dirname, '..', '.docs', 'Documentacion_Tecnica_Estrategica_PrevySeg_2026.docx');
  fs.writeFileSync(outputPath, buffer);
  console.log(`Documento generado con éxito en: ${outputPath}`);
}

generateCompleteProjectDoc().catch(err => {
  console.error("Error generando documento Word:", err);
  process.exit(1);
});
