const fs = require('fs');
const path = require('path');
const {
  Document,
  Packer,
  Paragraph,
  TextRun,
  AlignmentType,
  HeadingLevel,
  Header,
  Footer,
  PageNumber,
  PageBreak
} = require('docx');

async function generatePortfolioCompleteDocx() {
  // Paleta de Colores Institucional Santo Tomás & PrevySeg
  const COLOR_ST_GREEN = "006837";    // Verde Institucional Santo Tomás
  const COLOR_ST_DARK = "004022";     // Verde Oscuro
  const COLOR_NAVY = "0F3B7A";        // Azul Corporativo PrevySeg
  const COLOR_CYAN = "0284C7";        // Cyan Tecnológico
  const COLOR_DARK_SLATE = "0F172A";  // Pizarra Oscura
  const COLOR_TEXT = "1E293B";        // Texto Principal
  const COLOR_MUTED = "64748B";       // Texto Secundario

  const createHeading1 = (title) => {
    return new Paragraph({
      heading: HeadingLevel.HEADING_1,
      spacing: { before: 360, after: 140 },
      children: [
        new TextRun({
          text: title,
          bold: true,
          color: COLOR_ST_GREEN,
          size: 24,
          font: "Calibri"
        })
      ]
    });
  };

  const createHeading2 = (title) => {
    return new Paragraph({
      heading: HeadingLevel.HEADING_2,
      spacing: { before: 240, after: 100 },
      children: [
        new TextRun({
          text: title,
          bold: true,
          color: COLOR_NAVY,
          size: 20,
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
          size: 18,
          font: "Calibri"
        })
      ]
    });
  };

  const createParagraph = (text, options = {}) => {
    const { bold = false, italic = false, size = 19, color = COLOR_TEXT, align = AlignmentType.LEFT, after = 100 } = options;
    return new Paragraph({
      alignment: align,
      spacing: { after: after, line: 260 },
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
      spacing: { after: 70, line: 250 },
      children: [
        new TextRun({
          text: boldPrefix + " ",
          bold: true,
          color: COLOR_DARK_SLATE,
          size: 18,
          font: "Calibri"
        }),
        new TextRun({
          text: text,
          color: COLOR_TEXT,
          size: 18,
          font: "Calibri"
        })
      ]
    });
  };

  const createReflectionItem = (questionNumber, questionTitle, responseText) => {
    return [
      new Paragraph({
        spacing: { before: 140, after: 60 },
        children: [
          new TextRun({
            text: questionNumber + ". " + questionTitle,
            bold: true,
            color: COLOR_ST_DARK,
            size: 18,
            font: "Calibri"
          })
        ]
      }),
      new Paragraph({
        spacing: { after: 120, line: 250 },
        children: [
          new TextRun({
            text: responseText,
            color: COLOR_TEXT,
            size: 18,
            font: "Calibri"
          })
        ]
      })
    ];
  };

  const doc = new Document({
    styles: {
      default: {
        document: {
          run: {
            font: "Calibri",
            size: 19,
            color: COLOR_TEXT
          }
        }
      }
    },
    sections: [{
      properties: {
        page: {
          margin: { top: 1440, bottom: 1440, left: 1440, right: 1440 }
        }
      },
      headers: {
        default: new Header({
          children: [
            new Paragraph({
              alignment: AlignmentType.RIGHT,
              spacing: { after: 100 },
              children: [
                new TextRun({
                  text: "SANTO TOMÁS | VICERRECTORÍA ACADÉMICA IP-CFT | PORTAFOLIO REFLEXIVO",
                  bold: true,
                  size: 14,
                  color: COLOR_MUTED,
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
                new TextRun({ text: "Prácticas Profesionales — Portafolio Reflexivo | Página ", size: 15, color: COLOR_MUTED, font: "Calibri" }),
                new TextRun({ children: [PageNumber.CURRENT], size: 15, bold: true, color: COLOR_ST_GREEN, font: "Calibri" }),
                new TextRun({ text: " de ", size: 15, color: COLOR_MUTED, font: "Calibri" }),
                new TextRun({ children: [PageNumber.TOTAL_PAGES], size: 15, bold: true, color: COLOR_ST_GREEN, font: "Calibri" })
              ]
            })
          ]
        })
      },
      children: [
        // ==========================================
        // PÁGINA 1: PORTADA FORMAL SANTO TOMÁS
        // ==========================================
        new Paragraph({
          spacing: { before: 300, after: 100 }, alignment: AlignmentType.CENTER, children: [
            new TextRun({ text: "INSTITUTO PROFESIONAL Y CENTRO DE FORMACIÓN TÉCNICA SANTO TOMÁS", bold: true, size: 22, color: COLOR_ST_GREEN, font: "Calibri" })
          ]
        }),
        new Paragraph({
          spacing: { after: 100 }, alignment: AlignmentType.CENTER, children: [
            new TextRun({ text: "VICERRECTORÍA ACADÉMICA — DIRECCIÓN DE DESARROLLO CURRICULAR", bold: true, size: 16, color: COLOR_MUTED, font: "Calibri" })
          ]
        }),
        new Paragraph({
          spacing: { after: 260 }, alignment: AlignmentType.CENTER, children: [
            new TextRun({ text: "PRÁCTICA PROFESIONAL — EVIDENCIA: PORTAFOLIO REFLEXIVO", bold: true, size: 26, color: COLOR_NAVY, font: "Calibri" })
          ]
        }),

        new Paragraph({
          spacing: { before: 180, after: 180 }, alignment: AlignmentType.CENTER, children: [
            new TextRun({
              text: "“SISTEMA INTEGRAL DE GESTIÓN ACADÉMICA, MATRÍCULA ATÓMICA Y CAMPUS VIRTUAL LMS PARA OTEC PREVYSEG SPA”",
              bold: true,
              size: 22,
              color: COLOR_DARK_SLATE,
              font: "Calibri"
            })
          ]
        }),

        new Paragraph({
          spacing: { after: 360 }, alignment: AlignmentType.CENTER, children: [
            new TextRun({ text: "Bitácora Técnica Integral y Portafolio de Competencias Profesionales", italic: true, size: 18, color: COLOR_CYAN, font: "Calibri" })
          ]
        }),

        createHeading2("DATOS INSTITUCIONALES Y DE IDENTIFICACIÓN:"),
        createBullet("Estudiante:", "Alumno en Práctica Profesional Santo Tomás"),
        createBullet("Carrera:", "Ingeniería en Informática / Técnico en Informática"),
        createBullet("Sede Santo Tomás:", "Sede Arica — Región de Arica y Parinacota"),
        createBullet("Asignatura:", "Práctica Profesional (Portafolio Reflexivo)"),
        createBullet("Centro de Práctica:", "Organismo Técnico de Capacitación PrevySeg SpA (OTEC)"),
        createBullet("Dirección del Centro:", "Blanco Encalada N° 666, 2do Piso, Arica, Chile"),
        createBullet("Acreditaciones OTEC:", "SENCE (Franquicia Tributaria), NCh 2728:2015, Subsecretaría de Prevención del Delito SPD, Directemar, Seremi de Salud, SAG"),
        createBullet("Docente Guía:", "Profesor Guía Institucional Santo Tomás"),
        createBullet("Supervisor Técnico:", "Director Ejecutivo / Jefatura OTEC PrevySeg SpA"),
        createBullet("Fecha de Entrega:", "Septiembre de 2026"),

        new Paragraph({ children: [new PageBreak()] }),

        // ==========================================
        // 2. INTRODUCCIÓN
        // ==========================================
        createHeading1("2. INTRODUCCIÓN"),
        createParagraph("El presente documento constituye el Portafolio Reflexivo y Bitácora Técnica de Práctica Profesional del estudiante de la carrera de Ingeniería en Informática del Instituto Profesional Santo Tomás, sede Arica. Este trabajo ha sido elaborado siguiendo estrictamente las directrices y pautas pedagógicas emanadas de la Vicerrectoría Académica y la Dirección de Desarrollo Curricular."),
        createParagraph("La práctica profesional fue desarrollada en el Organismo Técnico de Capacitación PrevySeg SpA, entidad regional acreditada ante el SENCE bajo la Norma Chilena de Calidad NCh 2728:2015 y autorizada por la Subsecretaría de Prevención del Delito (SPD) de Carabineros de Chile para impartir programas de seguridad privada regulados por la Ley N° 21.659. Asimismo, cuenta con resoluciones de Directemar para faenas portuarias, Seremi de Salud para manipulación de alimentos y el SAG para el manejo agropecuario de plaguicidas."),
        createParagraph("El objetivo central del proyecto encomendado fue el diseño, desarrollo, aseguramiento de la calidad y despliegue del nuevo ecosistema tecnológico de PrevySeg 2026, compuesto por:"),
        createBullet("Portal Web Corporativo:", "Con navegación reactiva por scroll, branding institucional y selector dinámico de escuelas."),
        createBullet("Catálogo Oficial de 20 Cursos:", "Desglosado exactamente en 10 programas de formación en seguridad privada y 10 programas en oficios y habilidades laborales de alta empleabilidad en Arica."),
        createBullet("Ficha de Inscripción Digital y Abono 50%:", "Captura de postulantes, validación algorítmica de RUT mediante Módulo 11, creación de cuenta de aula virtual con contraseña y pasarela de abonos multicanal (Webpay Plus, Transferencia bancaria oficial y Efectivo en sede)."),
        createBullet("Arquitectura de Persistencia Atómica en PostgreSQL:", "Implementación del procedimiento almacenado `process_enrollment_registration` (SECURITY DEFINER) en Supabase para erradicar registros huérfanos y aplicar la regla institucional de curso único activo."),
        createBullet("Campus Virtual LMS Multi-Rol:", "Plataforma e-learning con control de acceso basado en roles (RBAC) para Estudiantes, Docentes, Empresas y Administrador OTEC, incluyendo clases en vivo sincrónicas, bolsa de trabajo regional y diplomas con verificación QR antifraude."),

        new Paragraph({ children: [new PageBreak()] }),

        // ==========================================
        // 3. ACUERDO DE DESEMPEÑO
        // ==========================================
        createHeading1("3. DOCUMENTO ACUERDO DE DESEMPEÑO"),
        createParagraph("En el marco de la Práctica Profesional formalizada entre Santo Tomás y OTEC PrevySeg SpA, se establecieron los siguientes compromisos y competencias clave a desempeñar en el centro de práctica:"),

        createHeading2("Área 1: Arquitectura Frontend e Interfaz SPA"),
        createBullet("Competencias y Tareas Asignadas:", "Diseñar e implementar la interfaz responsiva con React 19, Vite, TailwindCSS v4 y Framer Motion. Integrar el Switcher conmutable entre la Escuela de Seguridad y la Escuela de Oficios, y desplegar el catálogo oficial de 20 cursos."),
        createBullet("Criterio de Evaluación y Entrega:", "Carga veloz (< 1.5s), 0 errores de compilación con Vite, interfaz adaptativa mobile/desktop y navegación fluida por scroll."),

        createHeading2("Área 2: Base de Datos y Persistencia Transaccional"),
        createBullet("Competencias y Tareas Asignadas:", "Modelar el esquema relacional en PostgreSQL (Supabase), crear Stored Procedures atómicos en PL/pgSQL con privilegios controlados y triggers institucionales para salvaguardar la regla de 1 curso activo por alumno."),
        createBullet("Criterio de Evaluación y Entrega:", "Consistencia ACID garantizada, 0 registros huérfanos y mitigación total de bloqueos por políticas RLS."),

        createHeading2("Área 3: Seguridad, Criptografía y Roles RBAC"),
        createBullet("Competencias y Tareas Asignadas:", "Implementar el sistema de identidad basado en RUT con verificación por Módulo 11, encriptación de claves con Blowfish Bcrypt, control de acceso por roles (STUDENT, TEACHER, EMPLOYER, ADMIN) y sesiones JWT."),
        createBullet("Criterio de Evaluación y Entrega:", "Protección ante inyecciones y accesos no autorizados, cumplimiento Ley N° 19.628 de protección de datos personales."),

        createHeading2("Área 4: Campus Virtual LMS y Servicios Conectados"),
        createBullet("Competencias y Tareas Asignadas:", "Desarrollar las vistas del aula virtual del estudiante, conexión sincrónica a clases Zoom/Meet, bolsa de trabajo regional de Arica y generación de certificados digitales con código QR antifraude."),
        createBullet("Criterio de Evaluación y Entrega:", "Operatividad completa del ciclo de vida académico: admisión, pago 50%, estudio, evaluación y certificación oficial."),

        new Paragraph({ children: [new PageBreak()] }),

        // ==========================================
        // 4. IBASEPE
        // ==========================================
        createHeading1("4. IBASEPE — ACUERDO FORMATIVO DE APRENDIZAJE"),
        createParagraph("El Instrumento de Base para la Evaluación y Seguimiento de la Práctica (IBASEPE) fue concertado durante el primer mes entre el estudiante, el docente guía de Santo Tomás y el supervisor técnico de PrevySeg SpA. En él se diagnosticaron las brechas iniciales y se trazó el plan de refuerzo estructurado:"),

        createHeading2("Compromiso Formativo 1: Manejo Transaccional Avanzado en PostgreSQL"),
        createBullet("Tipo de Competencia:", "Específica de Carrera (Bases de Datos Relacionales)"),
        createBullet("Diagnóstico / Brecha Inicial:", "Dificultad inicial al gestionar llamadas secuenciales desde el cliente que fallaban por políticas RLS en Supabase, generando registros incompletos."),
        createBullet("Acciones Realizadas para Refuerzo:", "Profundizar en procedimientos PL/pgSQL transaccionales y funciones con privilegios `SECURITY DEFINER` para encapsular la matrícula de forma atómica."),
        createBullet("Medio Verificador de Cumplimiento:", "Stored Procedure `public.process_enrollment_registration` desplegado en Supabase y verificado con scripts de prueba automatizados."),

        createHeading2("Compromiso Formativo 2: Criptografía y Autenticación Segura con Bcrypt"),
        createBullet("Tipo de Competencia:", "Específica de Carrera (Seguridad Informática)"),
        createBullet("Diagnóstico / Brecha Inicial:", "Necesidad de sincronizar el motor GoTrue de Supabase Auth con credenciales basadas en RUT nacional y hashes seguros Bcrypt."),
        createBullet("Acciones Realizadas para Refuerzo:", "Estudiar la arquitectura de `auth.users` y `auth.identities`, implementando funciones criptográficas `extensions.crypt` con salt dinámico de factor 10."),
        createBullet("Medio Verificador de Cumplimiento:", "Script de prueba `test_enrollment_password_flow.mjs` validando login exitoso con RUT y contraseña."),

        createHeading2("Compromiso Formativo 3: Adaptabilidad a Exigencias Normativas Dinámicas"),
        createBullet("Tipo de Competencia:", "Competencia de Empleabilidad (Gestión Ágil y Adaptabilidad)"),
        createBullet("Diagnóstico / Brecha Inicial:", "Ajustar rápidamente los programas formativos y directivas a la nueva Ley N° 21.659 de Seguridad Privada y estatutos SENCE en plazos estrictos."),
        createBullet("Acciones Realizadas para Refuerzo:", "Depurar el catálogo oficial a 20 cursos (10 de oficios y 10 de seguridad) y planificar el ciclo de 30 días mediante una Carta Gantt WBS."),
        createBullet("Medio Verificador de Cumplimiento:", "Catálogo oficial depurado de 20 cursos y archivo Excel `Carta_Gantt_PrevySeg_2026_Actual.xlsx` con 35 actividades cumplidas."),

        createHeading2("Compromiso Formativo 4: Tratamiento Ético y Legal de Datos Personales"),
        createBullet("Tipo de Competencia:", "Competencia Sello Valórico (Santo Tomás)"),
        createBullet("Diagnóstico / Brecha Inicial:", "Comprender la responsabilidad jurídica en el resguardo de información de identificación personal y recaudación financiera."),
        createBullet("Acciones Realizadas para Refuerzo:", "Incorporar cláusulas de la Ley N° 19.628 en el formulario, diseñar un desglose transparente del abono del 50% y generar diplomas con QR antifraude."),
        createBullet("Medio Verificador de Cumplimiento:", "Formulario con cláusulas de protección de datos, pasarela de pago encriptada y diplomas digitales verificables con QR."),

        new Paragraph({ children: [new PageBreak()] }),

        // ==========================================
        // 5. EVIDENCIAS Y REFLEXIONES POR COMPETENCIA
        // ==========================================
        createHeading1("5. EVIDENCIAS Y REFLEXIÓN DE LAS EVIDENCIAS POR COMPETENCIA"),

        // COMPETENCIA 1
        createHeading2("5.1 Competencia Específica 1: Arquitectura Frontend, UI/UX y Catálogo de Escuelas"),
        createHeading3("A. Evidencia Visual"),
        createParagraph("Nombre de la Evidencia: Arquitectura de Interfaz SPA, Switcher de Escuelas y Catálogo Dinámico de 20 Cursos.", { bold: true }),
        createParagraph("Descripción Técnica de la Evidencia:"),
        createParagraph("Se diseñó y construyó la arquitectura frontend mediante una Single Page Application (SPA) en React 19 y Vite. La aplicación incorpora un canvas interactivo en HTML5 (`NetworkBackground.jsx`) que dibuja partículas y nodos en tiempo real simulando una red digital segura. En la barra superior (`Header.jsx`) y en la sección Hero (`Hero.jsx`) se integró el Switcher Conmutable de Escuelas, el cual conmuta el estado global `activeSchool` entre 'seguridad' y 'oficios'. Al conmutar, se actualiza reactivamente la paleta visual (Azul Marino institucional vs Teal Esmeralda), los títulos y se filtran dinámicamente los 20 cursos oficiales estructurados en `src/data/coursesData.js` (10 para Escuela de Oficios y 10 para Escuela de Seguridad Privada), cada uno con horas cronológicas, modalidad, cupos en tiempo real, arancel total y abono del 50%."),

        createHeading3("B. Evidencia Escrita"),
        createParagraph("Nombre de la Evidencia: Implementación Modular de Componentes React 19 y Estado Reactivo.", { bold: true }),
        createBullet("Contexto:", "Plataforma web oficial de OTEC PrevySeg desplegada en entorno web moderno, orientada a usuarios de la Macro Zona Norte con diversos niveles de alfabetización digital y navegación preferente desde smartphones."),
        createBullet("Objetivo:", "Garantizar una experiencia de usuario (UX) intuitiva y veloz (First Contentful Paint < 1.0s), permitiendo al postulante explorar las escuelas, filtrar cursos por áreas temáticas y acceder a la ficha de matrícula con el curso deseado preseleccionado en un solo clic."),
        createBullet("Relación con las Competencias:", "Demuestra dominio en programación con React 19, hooks avanzados (`useState`, `useEffect`, `useMemo`), diseño responsivo con TailwindCSS v4, renderizado dinámico y microinteracciones con Framer Motion."),
        createBullet("Presentación de Evidencia Escrita / Soporte de Código:", "Código fuente en `src/components/Hero.jsx`, `src/components/Services.jsx` y `src/data/coursesData.js` que implementa el conmutador dinámico de escuelas y el filtrado en tiempo real sin recargar la página."),

        createHeading3("C. Reflexiones en Torno a la Evidencia (Anexo N° 2)"),
        ...createReflectionItem(
          "1",
          "¿Qué conocimientos, habilidades, destrezas y actitudes he puesto en juego para desarrollar este trabajo?",
          "Apliqué conocimientos de JavaScript moderno (ES2024), ciclo de vida de React 19, física de partículas en Canvas 2D y diseño utilitario con TailwindCSS v4. Puse en juego destrezas de diseño UI/UX centrado en el usuario, adaptabilidad a la identidad corporativa de OTEC PrevySeg y una actitud de rigor técnico en la legibilidad tipográfica y responsividad móvil."
        ),
        ...createReflectionItem(
          "2",
          "¿Cuáles son las competencias de mi perfil de egreso que he puesto en juego?",
          "Puse en juego la competencia de 'Diseño y Desarrollo de Soluciones Web Interactivas', aplicando buenas prácticas de arquitectura frontend, modularización de componentes reutilizables, patrones de diseño de interfaz de usuario y optimización del rendimiento de carga en el navegador cliente."
        ),
        ...createReflectionItem(
          "3",
          "¿Qué nuevos conocimientos, habilidades, destrezas y actitudes reforcé o aprendí al realizar este trabajo?",
          "Aprendí a integrar TailwindCSS v4 con el compilador Vite para optimizar los tiempos de compilación a menos de 1 segundo. Aprendí a gestionar microinteracciones con Framer Motion sin degradar la tasa de cuadros por segundo (FPS) y reforcé mi capacidad para diseñar flujos de usuario simplificados que reducen la fricción."
        ),
        ...createReflectionItem(
          "4",
          "¿Qué desafíos personales me planteo?",
          "Me planteo el desafío de profundizar en micro-frontends y arquitecturas web guiadas por accesibilidad universal (norma WCAG 2.2 nivel AAA), logrando que plataformas educativas complejas sean plenamente utilizables por cualquier persona, incluyendo usuarios con discapacidades visuales o motrices."
        ),

        new Paragraph({ children: [new PageBreak()] }),

        // COMPETENCIA 2
        createHeading2("5.2 Competencia Específica 2: Persistencia Atómica en PostgreSQL y Reglas de Negocio"),
        createHeading3("A. Evidencia Visual"),
        createParagraph("Nombre de la Evidencia: Procedimiento Almacenado Atómico `process_enrollment_registration` y Esquema Relacional en PostgreSQL.", { bold: true }),
        createParagraph("Descripción Técnica de la Evidencia:"),
        createParagraph("Se diseñó y desplegó una arquitectura transaccional en Supabase PostgreSQL. Para resolver las restricciones de políticas RLS (Row Level Security) que bloqueaban a los postulantes anónimos al intentar insertar usuarios y matrículas desde el navegador cliente, se programó el Stored Procedure `public.process_enrollment_registration(...)` con privilegios `SECURITY DEFINER`. Esta función ejecuta en una única transacción atómica (ACID): la normalización del RUT con algoritmo Módulo 11; la verificación de la regla institucional de curso único activo mediante el trigger `check_single_course_enrollment()`; la creación o actualización en `auth.users` y `public.users` (rol STUDENT); la inserción en `public.escuela_oficio` o `public.escuela_seguridad` con arancel total, abono del 50%, estado 'MATRICULADO' y pago 'ABONO_50_CONFIRMADO'; y la sincronización en `public.enrollments` respaldada por la restricción `UNIQUE (user_id, course_id)`."),

        createHeading3("B. Evidencia Escrita"),
        createParagraph("Nombre de la Evidencia: Código del Procedimiento Almacenado SQL y Validación de Transaccionalidad.", { bold: true }),
        createBullet("Contexto:", "Base de datos relacional PostgreSQL en la nube AWS sa-east-1 mediante el servicio Supabase, gestionando expedientes académicos y pagos."),
        createBullet("Objetivo:", "Garantizar que ninguna matrícula quede incompleta por fallas de conexión o de cliente, erradicando registros huérfanos y haciendo cumplir la regla de 1 curso activo por estudiante."),
        createBullet("Relación con las Competencias:", "Evidencia dominio de SQL avanzado, modelado entidad-relación, triggers PL/pgSQL, transaccionalidad ACID y seguridad en bases de datos."),
        createBullet("Presentación de Evidencia Escrita / Soporte de Código:", "Definición DDL/DML de la función `public.process_enrollment_registration` y trigger `trg_check_single_course` alojados en `scripts/deploy_process_enrollment.mjs`, validando la inserción de matriculados con confirmación inmediata."),

        createHeading3("C. Reflexiones en Torno a la Evidencia (Anexo N° 2)"),
        ...createReflectionItem(
          "1",
          "¿Qué conocimientos, habilidades, destrezas y actitudes he puesto en juego para desarrollar este trabajo?",
          "Apliqué fundamentos de bases de datos relacionales: normalización en Tercera Forma Normal (3FN), transaccionalidad ACID, triggers PL/pgSQL y procedimientos almacenados con privilegios SECURITY DEFINER. Desarrollé destrezas para depurar políticas de seguridad RLS y resolver colisiones en restricciones de clave primaria y foránea."
        ),
        ...createReflectionItem(
          "2",
          "¿Cuáles son las competencias de mi perfil de egreso que he puesto en juego?",
          "Puse en práctica la competencia de 'Diseño e Implementación de Bases de Datos Corporativas', asegurando la consistencia, integridad referencial y alta disponibilidad de los registros académicos y financieros del organismo técnico de capacitación."
        ),
        ...createReflectionItem(
          "3",
          "¿Qué nuevos conocimientos, habilidades, destrezas y actitudes reforcé o aprendí al realizar este trabajo?",
          "Comprendí a fondo la interacción interna entre el motor GoTrue de Supabase y las tablas de datos públicas en PostgreSQL. Reforcé la actitud de anticipar fallos de red diseñando Stored Procedures que garantizan que las operaciones se completen íntegramente o se reviertan por completo (ROLLBACK)."
        ),
        ...createReflectionItem(
          "4",
          "¿Qué desafíos personales me planteo?",
          "Me planteo como desafío profesional dominar técnicas avanzadas de optimización de consultas SQL (EXPLAIN ANALYZE), particionamiento horizontal de tablas para millones de registros y replicación multirregión con tolerancia a fallos para infraestructuras críticas."
        ),

        new Paragraph({ children: [new PageBreak()] }),

        // COMPETENCIA 3
        createHeading2("5.3 Competencia Específica 3: Seguridad de la Información, Criptografía Bcrypt y RBAC"),
        createHeading3("A. Evidencia Visual"),
        createParagraph("Nombre de la Evidencia: Sistema de Autenticación RUT / Bcrypt y Matriz de Roles RBAC en Campus Virtual LMS.", { bold: true }),
        createParagraph("Descripción Técnica de la Evidencia:"),
        createParagraph("Se desarrolló el sistema de control de acceso basado en roles (RBAC) implementado en `src/lms/LMSLayout.jsx` y `src/config/supabase.js`. Para facilitar el acceso sin memorizar correos ficticios, el sistema adopta el **RUT chileno** como nombre de usuario. En la Ficha de Inscripción (`EnrollmentForm.jsx`), la Sección 2.1 exige al estudiante crear y confirmar una contraseña secreta de al menos 4 caracteres con visibilidad conmutada (ojo). En PostgreSQL, la contraseña se cifra con el algoritmo Blowfish Bcrypt (256-bit) con salt aleatorio mediante `extensions.crypt(p_password, extensions.gen_salt('bf', 10))`. El sistema gobierna el acceso para 4 perfiles autorizados: `STUDENT` (Área Personal, Mis Cursos, Aula Virtual, Clases en Vivo y Bolsa de Empleo), `TEACHER` (Panel docente, libro de clases digital, notas, asistencia SENCE y Banco de Preguntas SPD), `EMPLOYER` (Publicación de empleos, búsqueda de egresados y cotización SENCE) y `ADMIN` (Admisiones, expedientes de escuelas, certificados QR y reportes)."),

        createHeading3("B. Evidencia Escrita"),
        createParagraph("Nombre de la Evidencia: Script de Pruebas Automatizadas de Autenticación y Verificación de Sesión.", { bold: true }),
        createBullet("Contexto:", "Pruebas de integración E2E automatizadas para certificar que el sistema de autenticación sea invulnerable a inyecciones y suplantaciones antes del paso a producción."),
        createBullet("Objetivo:", "Comprobar que un postulante recién matriculado pueda iniciar sesión instantáneamente con su RUT y su contraseña, recibiendo el token JWT de sesión e ingresando a las vistas correspondientes a su rol."),
        createBullet("Relación con las Competencias:", "Demuestra competencias en seguridad informática, diseño de políticas de autorización, criptografía aplicada y control de identidades (IAM)."),
        createBullet("Presentación de Evidencia Escrita / Soporte de Código:", "Script de pruebas automatizadas `scripts/test_enrollment_password_flow.mjs`, validando la inserción de credenciales encriptadas y el inicio de sesión exitoso mediante `loginWithRut`."),

        createHeading3("C. Reflexiones en Torno a la Evidencia (Anexo N° 2)"),
        ...createReflectionItem(
          "1",
          "¿Qué conocimientos, habilidades, destrezas y actitudes he puesto en juego para desarrollar este trabajo?",
          "Apliqué principios de seguridad por diseño (Security by Design), criptografía asimétrica y hashing con salting (Bcrypt), gestión de tokens JWT (JSON Web Tokens) y diseño de matrices de autorización RBAC. Puse en juego destrezas analíticas para prevenir vulnerabilidades comunes del OWASP Top 10."
        ),
        ...createReflectionItem(
          "2",
          "¿Cuáles son las competencias de mi perfil de egreso que he puesto en juego?",
          "Puse en juego la competencia de 'Implementación de Protocolos de Seguridad y Control de Acceso', protegiendo la confidencialidad, autenticidad y trazabilidad de las acciones de los usuarios en el sistema de información corporativo."
        ),
        ...createReflectionItem(
          "3",
          "¿Qué nuevos conocimientos, habilidades, destrezas y actitudes reforcé o aprendí al realizar este trabajo?",
          "Aprendí a integrar autenticación basada en identidades nacionales (RUT) sobre motores estándar de correo electrónico, sin descuidar los estándares de GoTrue. Reforcé una actitud vigilante frente al manejo de datos confidenciales y contraseñas de alumnos."
        ),
        ...createReflectionItem(
          "4",
          "¿Qué desafíos personales me planteo?",
          "Me planteo el desafío de profundizar en arquitecturas de seguridad Zero-Trust, autenticación multifactor (MFA / WebAuthn con biometría FIDO2) y auditorías automatizadas de código estático para entornos en la nube."
        ),

        new Paragraph({ children: [new PageBreak()] }),

        // COMPETENCIA 4 (EMPLEABILIDAD)
        createHeading2("5.4 Competencia de Empleabilidad: Resolución de Problemas y Gestión Ágil de Proyectos"),
        createHeading3("A. Evidencia Visual"),
        createParagraph("Nombre de la Evidencia: Carta Gantt Técnica de 30 Días (WBS) y Matriz de Trazabilidad de Requerimientos.", { bold: true }),
        createParagraph("Descripción Técnica de la Evidencia:"),
        createParagraph("Se estructuró y generó la Carta Gantt oficial del proyecto (`Carta_Gantt_PrevySeg_2026_Actual.xlsx` y `.csv`), desglosada en una Estructura de Desglose del Trabajo (WBS) de 7 fases, 35 actividades técnicas y 7 hitos estratégicos de entrega a lo largo de un ciclo cronológico de 30 días en septiembre de 2026. Durante la práctica profesional, el estudiante enfrentó y resolvió problemas de alta complejidad: el bloqueo de consultas por políticas RLS en Supabase (resuelto mediante Stored Procedures con SECURITY DEFINER); la ambigüedad en sobrecargas de funciones SQL de creación de usuarios (resuelta mediante scripts de migración DDL); y la adaptación ágil ante cambios de requerimientos cuando la dirección solicitó segregar formalmente las escuelas y fijar exactamente 10 cursos por área formativa."),

        createHeading3("B. Evidencia Escrita"),
        createParagraph("Nombre de la Evidencia: Documento Formal de Requerimientos de Software (SRS IEEE 830) y Registro de Commits Git.", { bold: true }),
        createBullet("Contexto:", "Metodología ágil de desarrollo adaptativo con control de versiones Git, integración continua y revisiones periódicas con la jefatura técnica de OTEC PrevySeg."),
        createBullet("Objetivo:", "Documentar los 26 requerimientos funcionales y 10 no funcionales del sistema, garantizando que cada componente de software responda a una necesidad operativa real de la institución."),
        createBullet("Relación con las Competencias:", "Evidencia competencias de empleabilidad: comunicación técnica asertiva, resolución sistemática de problemas, adaptabilidad al cambio, planificación rigurosa y cumplimiento de compromisos laborales."),
        createBullet("Presentación de Evidencia Escrita / Soporte de Código:", "Documento formal `Especificacion_Requerimientos_PrevySeg_2026_Actual.docx` y registro cronológico de commits en Git (`git log`) que evidencian la evolución técnica del proyecto desde su génesis hasta el estado actual."),

        createHeading3("C. Reflexiones en Torno a la Evidencia (Anexo N° 2)"),
        ...createReflectionItem(
          "1",
          "¿Qué conocimientos, habilidades, destrezas y actitudes he puesto en juego para desarrollar este trabajo?",
          "Puse en juego habilidades de resolución analítica de problemas, depuración sistemática de software, control de versiones colaborativo con Git y planificación estructurada con WBS. Mantuve una actitud proactiva, orientada a resultados y capaz de trabajar bajo presión respetando los plazos de entrega."
        ),
        ...createReflectionItem(
          "2",
          "¿Cuáles son las competencias de mi perfil de egreso que he puesto en juego?",
          "Demostré la competencia de 'Gestión Ágil de Proyectos de Software y Resolución de Incidentes Críticos', coordinando plazos, versionamiento en Git y entregables documentados bajo estándares de la industria."
        ),
        ...createReflectionItem(
          "3",
          "¿Qué nuevos conocimientos, habilidades, destrezas y actitudes reforcé o aprendí al realizar este trabajo?",
          "Aprendí a interpretar y traducir solicitudes de negocio no técnicas en arquitecturas de software escalables. Reforcé mi tolerancia a la frustración y mi capacidad de negociar soluciones óptimas frente a restricciones de tiempo y tecnología."
        ),
        ...createReflectionItem(
          "4",
          "¿Qué desafíos personales me planteo?",
          "Me planteo como desafío perfeccionar el liderazgo de equipos de desarrollo bajo marcos Scrum/Kanban, obteniendo certificaciones de gestión técnica como PMP o Scrum Master para liderar proyectos de gran envergadura en la industria TI."
        ),

        new Paragraph({ children: [new PageBreak()] }),

        // COMPETENCIA 5 (SELLO VALÓRICO)
        createHeading2("5.5 Competencia de Sello Valórico: Ética Profesional, Transparencia y Responsabilidad Social"),
        createHeading3("A. Evidencia Visual"),
        createParagraph("Nombre de la Evidencia: Módulo de Transparencia de Abonos (50%), Cláusulas de Privacidad Ley N° 19.628 y Certificados Públicos con QR.", { bold: true }),
        createParagraph("Descripción Técnica de la Evidencia:"),
        createParagraph("El sistema incorpora salvaguardas éticas y sociales explícitas en cada interacción: 1) Transparencia financiera en la matrícula: la Sección 3 de la Ficha (`EnrollmentForm.jsx`) desglosa con exactitud el arancel, especificando que el abono del 50% inicial (Cuota N°1) está destinado a la apertura de expediente y reserva de cupo oficial SENCE, clarificando que el 50% restante (Cuota N°2) se cancela únicamente al iniciar las clases, evitando cualquier cobro abusivo o información engañosa; 2) Protección de datos personales (Ley N° 19.628): se integró un aviso informativo visible que garantiza que los datos personales y de contacto de los postulantes no serán compartidos ni comercializados a terceros; 3) Certificación verificable antifraude: el módulo de emisión de diplomas genera un código QR criptográfico único que permite a cualquier empleador comprobar si un guardia de seguridad u operario de oficio fue efectivamente capacitado y aprobado en PrevySeg, combatiendo la falsificación de credenciales en la región."),

        createHeading3("B. Evidencia Escrita"),
        createParagraph("Nombre de la Evidencia: Implementación de Cláusulas Legales y Generación de Códigos QR Verificables.", { bold: true }),
        createBullet("Contexto:", "Sector de la capacitación técnica y seguridad privada en la Región de Arica y Parinacota, donde la autenticidad de las certificaciones OS-10 y competencias laborales es crítica para la seguridad ciudadana y el cumplimiento legal de las empresas."),
        createBullet("Objetivo:", "Promover la justicia, la equidad en el acceso a la formación técnica y la probidad en la certificación de competencias de trabajadores."),
        createBullet("Relación con las Competencias:", "Se vincula directamente con los valores del Sello Santo Tomás: Ética Profesional, Búsqueda de la Verdad, Respeto por la Dignidad de la Persona y Solidaridad."),
        createBullet("Presentación de Evidencia Escrita / Soporte de Código:", "Código de validación en `src/components/EnrollmentForm.jsx` y módulo de aprobación de certificados en `src/lms/views/CertificateApprovalView.jsx` que implementan las garantías de protección de datos y validación pública."),

        createHeading3("C. Reflexiones en Torno a la Evidencia (Anexo N° 2)"),
        ...createReflectionItem(
          "1",
          "¿Qué conocimientos, habilidades, destrezas y actitudes he puesto en juego para desarrollar este trabajo?",
          "Apliqué conocimientos de legislación informática (Ley 19.628, Ley 21.659 y Ley 19.518 de SENCE), implementando algoritmos transparentes de cálculo financiero y mecanismos de verificación criptográfica. Mostré destreza para diseñar interfaces honestas y una actitud de respeto hacia la confianza del estudiante."
        ),
        ...createReflectionItem(
          "2",
          "¿Cuáles son las competencias de mi perfil de egreso que he puesto en juego?",
          "Puse en juego la competencia de 'Actuación Ética y Responsabilidad Social Profesional', asegurando que el software desarrollado no solo sea técnicamente eficiente, sino un instrumento de confianza y beneficio para la comunidad de trabajadores de Arica."
        ),
        ...createReflectionItem(
          "3",
          "¿Qué nuevos conocimientos, habilidades, destrezas y actitudes reforcé o aprendí al realizar este trabajo?",
          "Comprendí el rol trascendental del informático como custodio de la verdad digital y protector de la fe pública mediante herramientas antifraude como los códigos QR. Reforcé la convicción de que el código debe ser accesible, veraz y transparente."
        ),
        ...createReflectionItem(
          "4",
          "¿Qué desafíos personales me planteo?",
          "Me planteo el desafío ético permanente de diseñar sistemas con principios de equidad algorítmica, protegiendo la soberanía de los datos de los usuarios y contribuyendo activamente a la transformación digital ética y solidaria del país."
        ),

        new Paragraph({ children: [new PageBreak()] }),

        // =========================================================================
        // 6. BITÁCORA CRONOLÓGICA DE EVOLUCIÓN, MODIFICACIONES Y CAMBIOS TÉCNICOS
        // =========================================================================
        createHeading1("6. BITÁCORA CRONOLÓGICA DE EVOLUCIÓN, MODIFICACIONES Y CAMBIOS TÉCNICOS"),
        createParagraph("A continuación se presenta el registro histórico detallado de todas las modificaciones, refactorizaciones, decisiones de diseño, resolución de incidentes críticos y cambios arquitectónicos realizados en el proyecto PrevySeg 2026 desde su creación hasta el estado actual:"),

        // ETAPA 1
        createHeading2("Etapa 1: Setup Inicial, Arquitectura Base y Primer Prototipo LMS (01 de Septiembre, 2026)"),
        createBullet("Objetivo de la Etapa:", "Configurar el entorno de desarrollo, levantar la arquitectura de software base y crear el primer prototipo navegable."),
        createBullet("Commits Registrados:", "b210532, 2ecd706, 6834869, 3feaebd, de8bbd7, 12cad8f."),
        createBullet("Implementaciones Técnicas:", "Inicialización del proyecto con React 19, Vite y TailwindCSS. Construcción del componente de partículas `NetworkBackground.jsx`. Maquetación preliminar del portal corporativo y estructura base del Campus Virtual LMS con `LMSLayout.jsx`."),
        createBullet("Vistas Creadas:", "Área Personal (`PersonalAreaView`), Mis Cursos (`MyCoursesView`), Administración del Sitio con 15 categorías desplegables (`SiteAdminView`), y matriz RBAC preliminar para el rol `STUDENT`."),
        createBullet("Modificaciones y Enlaces:", "Conexión directa del formulario 'Envíanos un Mensaje' al número oficial de WhatsApp Business (+56 9 7869 1869)."),

        // ETAPA 2
        createHeading2("Etapa 2: Acreditación SENCE, Verificación QR y Matriz Curricular (02 de Septiembre, 2026)"),
        createBullet("Objetivo de la Etapa:", "Alinear la plataforma con las normativas legales de capacitación chilena (SENCE, Ley N° 19.518) y desarrollar herramientas de certificación pública."),
        createBullet("Commits Registrados:", "ad81de2, 89f2011, 600cceb, 578ce72, 7f3b9ca, 3faa278, 4740c8f."),
        createBullet("Implementaciones Técnicas:", "Integración de los primeros 11 cursos oficiales SENCE. Elaboración de la primera Carta Gantt a 1 mes. Creación del Verificador Público de Certificados OS-10 con generación dinámica de códigos QR antifraude."),
        createBullet("Módulos de Negocio:", "Simulador interactivo de Franquicia Tributaria SENCE para empresas (tramos 100%, 50% y 15%). Incorporación del panel de Visto Bueno administrativo para emisión de diplomas sin exponer notas privadas del alumno. Automatización del despacho de diplomas por correo electrónico."),
        createBullet("Primera Depuración Curricular:", "Depuración del catálogo a los 6 programas activos autorizados en dicha fase y generación del documento formal ERS v1.0."),

        // ETAPA 3
        createHeading2("Etapa 3: Diseño Visual, Animaciones y Pruebas de Accesibilidad / Temas (02 - 03 de Septiembre, 2026)"),
        createBullet("Objetivo de la Etapa:", "Refinar la experiencia de usuario (UI/UX) mediante microinteracciones avanzadas y evaluar modos de visualización."),
        createBullet("Commits Registrados:", "50ca377, ce9bf07, e8704f4, 4eca5b4, 8adbf82, 154d33f, 5e2884d, f35a5d0, 84b1430, f07582d."),
        createBullet("Implementaciones Técnicas:", "Instalación y configuración de `framer-motion`. Aplicación de estilos glassmorphism y skeleton loaders para carga asíncrona. Corrección del filtro de cursos para asegurar la visibilidad al seleccionar 'Todos'."),
        createBullet("Experimento de Modo Claro / Oscuro:", "Se diseñó e implementó un conmutador de temas con interruptor animado (Sol/Luna) y persistencia en localStorage para alternar entre modo oscuro y modo claro de alto contraste."),
        createBullet("Decisión de Refactorización y Retiro del Módulo de Temas (Commit 84b1430):", "Tras revisión con la jefatura de OTEC, se resolvió retirar el botón de cambio de color de fondo y fijar un diseño institucional sobrio, funcional y oscuro/slate. La dirección consideró que el modo claro generaba inconsistencias de contraste en proyectores y pantallas móviles de baja gama, prefiriendo una identidad visual unificada y profesional."),
        createBullet("Ajuste de Cronograma:", "Corrección de fórmulas de duración y anchos de columna en el archivo Excel de la Carta Gantt."),

        // ETAPA 4
        createHeading2("Etapa 4: Ficha de Inscripción Digital, Abono 50% y Criptografía Bcrypt (03 - 04 de Septiembre, 2026)"),
        createBullet("Objetivo de la Etapa:", "Digitalizar íntegramente el proceso de matrícula y fortalecer la seguridad criptográfica del sistema."),
        createBullet("Commits Registrados:", "085ad35, 35c4d31, 57f7822."),
        createBullet("Implementaciones Técnicas:", "Desarrollo del componente `EnrollmentForm.jsx`. Creación del sistema de cálculo de Cuota 1 (50% del arancel para apertura de expediente y reserva de cupo SENCE) y Cuota 2 (50% Saldo al inicio de clases)."),
        createBullet("Integración de Pasarela Multicanal:", "Soporte para pago mediante Webpay Plus Transbank, Transferencia bancaria oficial (Santander/Banco Estado) y Pago en sede física Arica. Incorporación del buzón de dudas del postulante."),
        createBullet("Criptografía Aplicada:", "Implementación del cifrado de contraseñas con Blowfish Bcrypt mediante la extensión `pgcrypto` de PostgreSQL. Creación del módulo de validación sintáctica de credenciales y actualización del documento formal SRS v3.0."),

        // ETAPA 5
        createHeading2("Etapa 5: Campus Virtual Avanzado, Clases Zoom y Módulo de Empresas (07 de Septiembre, 2026)"),
        createBullet("Objetivo de la Etapa:", "Expandir las capacidades del LMS para capacitación sincrónica y vinculación laboral con empresas."),
        createBullet("Commits Registrados:", "7bbb161, f43884d, ef4f95e, 6ea5bf8, 2a8065b, 6af0cd0, dc2dc99."),
        createBullet("Clases Sincrónicas:", "Implementación del módulo de aula virtual Zoom sincrónica (`StudentLiveClassesView.jsx`), gestión de salas virtuales y libro digital de asistencia para fiscalización SENCE."),
        createBullet("Portal de Empresas (`EMPLOYER` / `EMPRESA`):", "Creación de vistas para que empresas publiquen ofertas laborales directamente en la base de datos PostgreSQL, gestionen postulaciones de alumnos graduados y coticen cursos con Franquicia SENCE."),
        createBullet("Normalización en Base de Datos:", "Actualización de restricciones y tipos enum en PostgreSQL para unificar el rol `EMPRESA` / `EMPLOYER`."),
        createBullet("Distribución y Branding:", "Creación del script exportador portable de 1-clic (`scripts/serve_dist.cjs`) y actualización del logotipo oficial de PrevySeg en alta resolución."),

        // ETAPA 6
        createHeading2("Etapa 6: Reestructuración Integral de Escuelas, Matrícula Atómica y Estado Actual (08 de Septiembre, 2026)"),
        createBullet("Objetivo de la Etapa:", "Dar cumplimiento a los requerimientos definitivos de la dirección: segregación estricta de escuelas, depuración curricular a 20 cursos, creación de cuentas en la ficha y resolución definitiva de la persistencia en base de datos."),
        createBullet("Commits y Avances Finales:", "64f27bb y desarrollos de consolidación en producción."),
        createBullet("1. Switcher Conmutable de Escuelas en Vivo:", "Se implementó el conmutador dinámico en la cabecera y en el Hero principal, permitiendo alternar instantáneamente entre la 'Escuela de Seguridad Privada' y la 'Escuela de Oficios y Habilidades'. Cada escuela adapta su color de acento, sus copys, estándares de ejecución y catálogo visible."),
        createBullet("2. Depuración Curricular Estricta a 20 Cursos Oficiales:", "Se eliminaron todos los cursos genéricos o que no correspondían a la oferta aprobada (como carpintería u oficios obsoletos), fijando exactamente: 10 Cursos de Oficios (Resolución conflictos 40h, Manejo resolución 8h, Plaguicidas 40h, Operación portuaria 50h, Manipulación alimentos 40h, Depilación cera miel 30h, Manicure 35h, Maquillaje carnaval 30h, Cuidado adulto mayor 60h, Cajero bancario/copropiedad 50h) y 10 Cursos de Seguridad Privada (Guardias seguridad 90h, Vigilantes privados 100h, Guardia marítimo 90h, Porteros/nocheros 50h, Perfeccionamiento guardias 36h, Perfeccionamiento marítimo 40h, Perfeccionamiento porteros 30h, CCTV SENCE 60h, CCTV y alarmas 65h, Supervisor 120h)."),
        createBullet("3. Retiro del Botón de Admisión en el Header:", "Se eliminó el botón general de 'Ficha de Admisión' de la barra superior. La inscripción se canaliza ahora directamente desde el botón 'Inscribirme' de cada curso en el catálogo, abriendo la ficha con ese curso preseleccionado en la Sección 1 sin obligar al usuario a volver a buscarlo."),
        createBullet("4. Creación de Cuenta con Contraseña en la Misma Ficha:", "Se incorporó la Sección 2.1 en `EnrollmentForm.jsx`. El RUT ingresado por el alumno se fija automáticamente como su usuario oficial de acceso y se le solicita definir y confirmar una contraseña secreta (mínimo 4 caracteres con botón de ojo para ver/ocultar y validación de coincidencia en tiempo real)."),
        createBullet("5. Diagnóstico y Resolución del Fallo de Persistencia en PostgreSQL:", "Al probar la inscripción desde la web, los datos no se guardaban debido a: 1) Políticas RLS en `public.users` que bloqueaban consultas de usuarios anónimos; 2) Ausencia de restricción UNIQUE en `public.enrollments` que provocaba errores 42P10; 3) Un trigger institucional demasiado restrictivo que bloqueaba registros válidos; 4) Manejo silencioso de excepciones en el frontend que mostraba la pantalla de éxito aún ante fallos de base de datos. Para solucionarlo de raíz, se creó y desplegó el Stored Procedure `public.process_enrollment_registration(...)` con privilegios `SECURITY DEFINER`. Esta función orquesta en una transacción atómica: validación de RUT con Módulo 11, verificación de regla de 1 curso activo, creación de cuenta en `auth.users` y `public.users` (rol STUDENT con Bcrypt), inserción en `public.escuela_oficio` o `public.escuela_seguridad` con arancel total, abono del 50%, estado 'MATRICULADO' y pago 'ABONO_50_CONFIRMADO', y sincronización en `public.enrollments`. Se verificó exitosamente con scripts automatizados (`test_rpc_process_enrollment.mjs` y `test_rpc_seguridad.mjs`), logrando persistencia garantizada y sesión iniciada de inmediato."),

        new Paragraph({ children: [new PageBreak()] }),

        // ==========================================
        // 7. CONCLUSIÓN DEL PORTAFOLIO (ANEXO N° 3)
        // ==========================================
        createHeading1("7. CONCLUSIÓN DEL PORTAFOLIO (ANEXO N° 3)"),
        createParagraph("Al término de este proceso formativo de Práctica Profesional en OTEC PrevySeg SpA y tras haber completado la totalidad de las actividades contempladas en este Portafolio Reflexivo, se exponen las siguientes conclusiones ordenadas bajo los cuatro aspectos definidos en la pauta de evaluación de Santo Tomás:"),

        createHeading2("7.1 Conocimientos, Habilidades, Destrezas y Actitudes Desarrolladas o Reforzadas"),
        createParagraph("Durante el desarrollo del proyecto consolidé competencias prácticas avanzadas de la Ingeniería en Informática. En el ámbito del desarrollo de software, adquirí un dominio acabado del ecosistema contemporáneo de React 19, Vite, TailwindCSS v4 y Framer Motion, logrando interfaces de usuario fluidas, intuitivas y adaptativas. En el área de base de datos y backend, superé el paradigma de simples operaciones CRUD realizadas desde el cliente, aprendiendo a diseñar transacciones atómicas complejas en PostgreSQL, Stored Procedures en PL/pgSQL, triggers condicionales de validación y políticas de seguridad RLS."),
        createParagraph("Ejemplos concretos de este crecimiento fueron:"),
        createBullet("Procedimiento Atómico:", "La implementación de `process_enrollment_registration`, que resolvió definitivamente los bloqueos de permisos RLS e inconsistencias en la base de datos."),
        createBullet("Validación de Identidad:", "El desarrollo del algoritmo de validación de RUT bajo la norma oficial de Módulo 11."),
        createBullet("Seguridad Criptográfica:", "El cifrado de contraseñas con Blowfish Bcrypt para permitir el acceso al aula virtual."),
        createBullet("Gestión del Proyecto:", "La estructuración de una Carta Gantt técnica con 35 actividades ordenadas en WBS y 7 hitos estratégicos."),

        createHeading2("7.2 Contribución al Logro de las Competencias del Perfil de Egreso"),
        createParagraph("Esta experiencia práctica ha sido fundamental para consolidar las competencias específicas de mi perfil de egreso en Santo Tomás. Pude comprobar que el software profesional no se construye a partir de enunciados teóricos aislados, sino a partir de requerimientos organizacionales vivos, normativas gubernamentales exigentes (como la Ley N° 21.659 de Seguridad Privada y las directivas de la Subsecretaría de Prevención del Delito) y expectativas concretas de personas que buscan capacitarse para ingresar al mercado del trabajo."),
        createParagraph("Haber concebido, implementado, testeado y desplegado una plataforma integral que abarca desde la captación en el portal web hasta el aula virtual con clases en vivo y bolsa de empleo demuestra mi capacidad para desempeñarme competentemente en el ciclo de vida completo de un producto digital corporativo."),

        createHeading2("7.3 Desafíos Personales y Profesionales: Fortalezas y Áreas de Mejora"),
        createParagraph("A lo largo de la práctica enfrenté diversos desafíos técnicos y operativos: resolver sobrecargas de tipos de datos en funciones SQL, reestructurar el catálogo de cursos a exactamente 10 de oficios y 10 de seguridad privada conforme a las instrucciones de la jefatura, y garantizar la persistencia de matrículas sin fricción para el usuario."),
        createBullet("Fortalezas Identificadas:", "Capacidad analítica para diagnosticar fallos en arquitecturas complejas, perseverancia técnica para encontrar soluciones de fondo (como la migración a Stored Procedures SECURITY DEFINER) y un compromiso absoluto con la excelencia y los plazos fijados."),
        createBullet("Áreas de Mejora:", "Identifiqué la oportunidad de profundizar en la implementación de pruebas unitarias y de integración continuas desde el inicio del proyecto (TDD/CI-CD), así como en el monitoreo avanzado de rendimiento de consultas en bases de datos con gran concurrencia."),

        createHeading2("7.4 Vinculación con los Acuerdos Formativos del IBASEPE"),
        createParagraph("El desarrollo de las actividades mantuvo una correspondencia exacta con los acuerdos formalizados en el Acuerdo Formativo de Aprendizaje (IBASEPE). Las brechas identificadas al inicio de la práctica —vinculadas a la persistencia transaccional en PostgreSQL, el manejo seguro de identidades y contraseñas con Bcrypt y la adaptación a normativas de capacitación— fueron superadas con creces."),
        createParagraph("El sistema hoy en día opera con cero registros huérfanos, autenticación blindada basada en RUT, un catálogo oficial de 20 cursos depurados y un Campus Virtual operativo que genera valor real para OTEC PrevySeg y la comunidad de la Región de Arica y Parinacota. Esta experiencia no solo afianzó mis capacidades técnicas como informático, sino que reafirmó mi compromiso ético con la verdad, la probidad y el servicio a la sociedad, sello distintivo de mi formación en Santo Tomás."),

        new Paragraph({
          spacing: { before: 400, after: 120 }, alignment: AlignmentType.CENTER, children: [
            new TextRun({ text: "— FIN DEL PORTAFOLIO REFLEXIVO DE PRÁCTICA PROFESIONAL —", bold: true, size: 18, color: COLOR_ST_GREEN, font: "Calibri" })
          ]
        })
      ]
    }]
  });

  const buffer = await Packer.toBuffer(doc);
  const docxPath = path.join(process.cwd(), 'Portafolio_Reflexivo_Bitacora_Practica_PrevySeg_Santo_Tomas.docx');
  fs.writeFileSync(docxPath, buffer);
  console.log(`✅ Archivo DOCX completo (con Bitácora Histórica de Cambios) generado: ${docxPath}`);
}

generatePortfolioCompleteDocx().catch(err => {
  console.error('Error generando documento DOCX:', err);
  process.exit(1);
});
