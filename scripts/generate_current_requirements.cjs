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

async function createCurrentSRS() {
  const COLOR_PRIMARY = "0F3B7A";      // Azul Marino Corporativo
  const COLOR_SECONDARY = "0284C7";    // Cyan / Azul PrevySeg
  const COLOR_TEAL = "0D9488";         // Teal Acento
  const COLOR_DARK_SLATE = "0F172A";   // Pizarra Oscuro
  const COLOR_TEXT = "1E293B";         // Texto Principal (Slate 800)
  const COLOR_MUTED = "64748B";        // Texto Secundario (Slate 500)
  const COLOR_BORDER = "CBD5E1";       // Borde Gris Claro
  const COLOR_BG_HEADER = "0F172A";    // Fondo Encabezados Tabla
  const COLOR_BG_LIGHT = "F8FAFC";     // Fondo Fila Alterna

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
          size: 26,
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
          size: 22,
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

  // Requerimientos Funcionales Actuales
  const functionalRequirements = [
    {
      code: "RF-01",
      module: "Portal Web Institucional",
      name: "Portal Web Oficial y Navegación Dinámica por Scroll",
      desc: "El sistema debe desplegar una plataforma web institucional responsiva y accesible que integre navegación por scroll suave (#inicio, #quienes-somos, #servicios, #contacto), barra de cabecera fija con branding oficial de OTEC PrevySeg, acreditaciones (SENCE, NCh 2728, Subsecretaría de Prevención del Delito SPD) y fondo animado interactivo de partículas en HTML5 Canvas.",
      inputs: "Navegación al sitio web público o interacción con enlaces del menú.",
      process: "Renderizado dinámico de componentes modulares con Vite y React 19, inicialización del motor gráfico en canvas y cálculo de posiciones de scroll con react-scroll.",
      outputs: "Interfaz visual institucional interactiva y adaptativa en desktop, tablet y dispositivos móviles.",
      actor: "Público General / Alumnos / Empresas Clientes",
      priority: "Must Have (Crítica)",
      acceptance: "Tiempo de carga < 1.5s, navegación fluida sin recargas completas y compatibilidad en navegadores modernos."
    },
    {
      code: "RF-02",
      module: "Portal Web / Switcher de Escuelas",
      name: "Selector Conmutable de Escuelas en Cabecera y Hero",
      desc: "El sistema debe proporcionar un conmutador interactivo bidireccional entre la 'Escuela de Seguridad Privada' y la 'Escuela de Oficios y Habilidades'. Al cambiar de escuela, el sistema debe adaptar de manera inmediata la temática visual (colores de acento), los textos promocionales, los botones de acción rápida ('Explorar Escuela Oficial', 'Inscribirme en Cursos') y el catálogo visible de cursos.",
      inputs: "Clic del usuario en los botones conmutables de escuela en la cabecera o sección Hero.",
      process: "Actualización de estado global en React (`activeSchool`), re-renderizado reactivo de la paleta de estilos y filtrado de la oferta formativa.",
      outputs: "Transformación visual y temática inmediata de la página web reflejando la escuela seleccionada.",
      actor: "Público General / Postulantes",
      priority: "Must Have (Crítica)",
      acceptance: "Conmutación en tiempo real (< 50ms) sin parpadeo y preservación de la escuela seleccionada durante la sesión."
    },
    {
      code: "RF-03",
      module: "Portal Web / Quiénes Somos",
      name: "Exposición de Misión Institucional, Visión y Pilares OTEC",
      desc: "El sistema debe exponer la Misión Institucional oficial y aprobada de PrevySeg: 'Ser la institución líder en capacitación y perfeccionamiento técnico-operativo en la Macro Zona Norte de Chile...', junto a la Visión estratégica, Valores corporativos (Rigor, Excelencia, Compromiso Ético) y los reconocimientos de las autoridades fiscalizadoras (SENCE, SPD Carabineros OS-10, Directemar, Seremi de Salud, SAG).",
      inputs: "Navegación o desplazamiento a la sección #quienes-somos.",
      process: "Renderizado estructurado de tarjetas de identidad institucional con diseño tipográfico corporativo.",
      outputs: "Presentación institucional fidedigna de los pilares corporativos.",
      actor: "Público General / Fiscalizadores SENCE",
      priority: "Must Have (Crítica)",
      acceptance: "Texto íntegro de la misión oficial desplegado con exactitud jurídica e institucional."
    },
    {
      code: "RF-04",
      module: "Portal Web / Estándares",
      name: "Sección de Ejecución y Estándares Adaptativa",
      desc: "El sistema debe desplegar una sección de estándares técnicos adaptable según la escuela activa: para Seguridad Privada debe destacar el cumplimiento de la Ley N° 21.659, examen oficial ante la SPD y protocolos OS-10; para Oficios debe resaltar la certificación de competencias laborales, prácticas en talleres de Arica y rápida inserción al mercado laboral.",
      inputs: "Cambio de la escuela activa (`activeSchool`).",
      process: "Renderizado condicional de los atributos técnicos, checklists de cumplimiento y tarjetas de valor.",
      outputs: "Bloque de garantías operativas coherente con el área de formación seleccionada.",
      actor: "Postulantes / Empresas Contratantes",
      priority: "Should Have (Alta)",
      acceptance: "Textos, iconos y badges 100% contextualizados a la escuela seleccionada."
    },
    {
      code: "RF-05",
      module: "Catálogo Académico",
      name: "Catálogo Oficial Exclusivo de 20 Cursos (10 Oficios y 10 Seguridad)",
      desc: "El sistema debe desplegar exclusivamente los 20 programas formativos vigentes: 10 cursos para la Escuela de Oficios (Resolución de conflictos 40h, Manejo resolución 8h, Plaguicidas 40h, Operación portuaria 50h, Manipulación alimentos 40h, Depilación cera miel 30h, Manicure 35h, Maquillaje carnaval 30h, Cuidado adulto mayor 60h, Cajero bancario 50h) y 10 cursos para la Escuela de Seguridad (Guardias seguridad 90h, Vigilantes privados 100h, Guardia marítimo 90h, Porteros/nocheros 50h, Perfeccionamiento guardias 36h, Perfeccionamiento marítimo 40h, Perfeccionamiento porteros 30h, Operación CCTV SENCE 60h, CCTV y alarmas 65h, Supervisor de seguridad 120h). Cada tarjeta debe mostrar cupos en tiempo real, horas, modalidad, arancel total y abono del 50%.",
      inputs: "Navegación a la sección #servicios o búsqueda en el catálogo.",
      process: "Lectura del repositorio estructurado `coursesData.js`, cálculo de precios y abonos, y renderizado en grilla responsiva.",
      outputs: "Tarjetas de curso interactivas con botón directo 'Inscribirme'.",
      actor: "Postulantes / Empresas",
      priority: "Must Have (Crítica)",
      acceptance: "Presencia exacta de los 20 cursos indicados, organizados por sus respectivas áreas, sin omisiones ni cursos adicionales."
    },
    {
      code: "RF-06",
      module: "Modales de Escuela",
      name: "Modal Inmersivo de Información y Malla Curricular por Escuela",
      desc: "El sistema debe proporcionar una vista modal inmersiva (`SchoolDetailModal.jsx`) para cada escuela, con pestañas de navegación para: 'Información General OTEC' (visión operativa, campo ocupacional, acreditaciones), 'Requisitos de Admisión' (certificados, edad, antecedentes), 'Malla Curricular' (listado de cursos de la escuela) y 'Preguntas Frecuentes'.",
      inputs: "Clic en el botón 'Explorar Escuela Oficial' o en los enlaces de escuela de la cabecera.",
      process: "Apertura de modal animado con Framer Motion, precarga de datos de la escuela seleccionada y tabs conmutables.",
      outputs: "Ventana emergente con desglose pedagógico y normativo completo de la escuela.",
      actor: "Postulantes / Alumnos",
      priority: "Should Have (Alta)",
      acceptance: "Navegación fluida entre pestañas, textos completos sin truncar y opción de inscribirse directamente en un curso desde la malla."
    },
    {
      code: "RF-07",
      module: "Buscador Global",
      name: "Búsqueda Predictiva de Cursos en Tiempo Real",
      desc: "El sistema debe proveer una herramienta modal de búsqueda predictiva en tiempo real que permita a los usuarios localizar cursos escribiendo términos clave (nombre, área, código SENCE, modalidad o requisitos).",
      inputs: "Entrada de texto del usuario en el campo de búsqueda modal.",
      process: "Filtrado en tiempo real sobre los 20 cursos oficiales mediante expresiones regulares y normalización fonética.",
      outputs: "Resultados inmediatos con tarjeta del curso y botón de matrícula directa.",
      actor: "Público General",
      priority: "Could Have (Media)",
      acceptance: "Búsqueda con latencia < 30ms y enlace directo a la ficha de inscripción con el curso preseleccionado."
    },
    {
      code: "RF-08",
      module: "Ficha de Inscripción",
      name: "Apertura Contextual de Ficha con Curso Preseleccionado",
      desc: "Al presionar el botón 'Inscribirme' en cualquier tarjeta del catálogo o malla curricular, el sistema debe abrir directamente la Ficha de Inscripción (`EnrollmentForm.jsx`) con dicho curso fijado como seleccionado en la Sección 1, mostrando de forma transparente su modalidad, horas, arancel total, Cuota N°1 (50% Reserva) y Cuota N°2 (50% Saldo al inicio), sin obligar al usuario a volver a seleccionarlo.",
      inputs: "Clic en el botón 'Inscribirme' de una tarjeta de curso.",
      process: "Paso de parámetros de curso (`defaultCourseName` y objeto de curso) al componente `EnrollmentForm`.",
      outputs: "Ficha de admisión abierta y lista para el llenado de datos personales.",
      actor: "Postulante",
      priority: "Must Have (Crítica)",
      acceptance: "Curso seleccionado pre-cargado con arancel, horas y modalidad exactos."
    },
    {
      code: "RF-09",
      module: "Ficha de Inscripción / Identidad",
      name: "Validación Rigurosa de Identidad y RUT Chileno con Algoritmo Módulo 11",
      desc: "El formulario de inscripción debe exigir y validar el RUT chileno mediante el algoritmo oficial de Módulo 11 (dígito verificador). El sistema debe formatear automáticamente el valor ingresado con puntos y guión (`XX.XXX.XXX-X`) e impedir el envío si el RUT resulta matemáticamente inválido o incompleto.",
      inputs: "Entrada del RUT en el campo correspondiente del formulario.",
      process: "Limpieza de caracteres especiales, cálculo ponderado de Módulo 11 del dígito verificador y formateo de máscara.",
      outputs: "Confirmación visual de RUT válido o mensaje de alerta de formato/dígito inválido.",
      actor: "Postulante",
      priority: "Must Have (Crítica)",
      acceptance: "Bloqueo efectivo de RUTs falsos o erróneos y normalización de mayúsculas en dígito 'K'."
    },
    {
      code: "RF-10",
      module: "Ficha de Inscripción / Cuenta",
      name: "Creación Integrada de Cuenta de Aula Virtual en la Ficha",
      desc: "El formulario de inscripción debe incorporar la Sección 2.1 'Crear Cuenta de Acceso al Aula Virtual', fijando el RUT del postulante como su nombre de usuario oficial de acceso y solicitando la creación y confirmación de su contraseña secreta (mínimo 4 caracteres), con botones interactivos para conmutar la visibilidad (mostrar/ocultar) y verificación en tiempo real de coincidencia entre ambas contraseñas.",
      inputs: "Campos de 'Crear Contraseña' y 'Confirmar Contraseña' en la ficha.",
      process: "Validación de longitud, validación de igualdad en tiempo real y preparación del payload de autenticación.",
      outputs: "Validación visual positiva y vinculación de credenciales a la cuenta del alumno.",
      actor: "Postulante",
      priority: "Must Have (Crítica)",
      acceptance: "Impedimento de envío si las contraseñas difieren o tienen menos de 4 caracteres."
    },
    {
      code: "RF-11",
      module: "Ficha de Inscripción / Abonos",
      name: "Pasarela de Abono Inicial del 50% (Cuota 1) y Pago Total (100%)",
      desc: "El sistema debe permitir al estudiante seleccionar entre abonar el 50% inicial correspondiente a la Cuota N°1 de Reserva oficial o cancelar el 100% del arancel. Además, debe soportar 3 medios de pago: Tarjeta de Débito/Crédito (Webpay Plus Transbank seguro), Transferencia Electrónica bancaria (Banco Santander / Banco Estado a nombre de OTEC PrevySeg SpA) o Pago Presencial en la sede institucional de Arica.",
      inputs: "Selección de opción de pago (cuota 50% o total) y medio de pago (tarjeta, transferencia, efectivo).",
      process: "Cálculo matemático de montos a pagar y renderizado dinámico de los datos bancarios o formulario de tarjeta.",
      outputs: "Desglose claro de saldo pendiente (50%) para el inicio de clases y comprobante de reserva.",
      actor: "Postulante",
      priority: "Must Have (Crítica)",
      acceptance: "Cálculo 100% exacto del 50% del valor del curso y presentación de datos bancarios oficiales."
    },
    {
      code: "RF-12",
      module: "Ficha de Inscripción / Soporte",
      name: "Buzón de Preguntas y Notificación Automatizada a WhatsApp",
      desc: "La ficha debe incluir un buzón de preguntas y dudas para requerimientos especiales y, al confirmar la ficha, generar un mensaje pre-formateado completo dirigido al WhatsApp Oficial de Admisiones (+56 9 8231 2128), conteniendo el código de solicitud, curso, modalidad, datos del alumno, estado de abono y aviso de cuenta de aula virtual creada.",
      inputs: "Comentarios del alumno en el buzón y confirmación de la ficha.",
      process: "Codificación URI del mensaje de texto oficial y generación del enlace a la API de WhatsApp.",
      outputs: "Mensaje listo para envío al equipo de admisiones de PrevySeg para coordinación de entrega de documentos.",
      actor: "Postulante / Admisiones",
      priority: "Should Have (Alta)",
      acceptance: "Mensaje estructurado con emojis y datos fidedignos sin truncamiento."
    },
    {
      code: "RF-13",
      module: "Ficha de Inscripción / Éxito",
      name: "Pantalla de Éxito con Código Único y Tarjeta de Credenciales Activas",
      desc: "Una vez procesado el abono y la matrícula, el sistema debe presentar una pantalla de confirmación con el código de expediente (`PS-XXXXXX`), el curso y escuela matriculada, la Tarjeta de Credenciales de Acceso (Usuario RUT y contraseña definida) y un botón de acción principal 'Ingresar a la Plataforma Virtual Ahora' que abre de inmediato la plataforma con el RUT precargado.",
      inputs: "Finalización exitosa del procedimiento de inscripción en base de datos.",
      process: "Generación de código pseudoaleatorio único, almacenamiento temporal de sesión y renderizado de credenciales.",
      outputs: "Pantalla de éxito con credenciales verificadas y acceso instantáneo al aula.",
      actor: "Alumno Matriculado",
      priority: "Must Have (Crítica)",
      acceptance: "Visualización de datos de acceso y redirección funcional al aula virtual con un solo clic."
    },
    {
      code: "RF-14",
      module: "Base de Datos / Persistencia",
      name: "Procesamiento Atómico de Matrícula en PostgreSQL (process_enrollment_registration)",
      desc: "El sistema debe ejecutar una transacción atómica mediante la función de base de datos `public.process_enrollment_registration` (SECURITY DEFINER) en Supabase PostgreSQL. Dicho procedimiento debe registrar/actualizar el usuario en `auth.users` y `public.users` (rol STUDENT), insertar la matrícula en `public.escuela_oficio` o `public.escuela_seguridad` con todos los datos del curso, horas, arancel, abono del 50%, estado 'MATRICULADO' y pago 'ABONO_50_CONFIRMADO', sincronizar `public.enrollments` y autenticar la sesión del alumno.",
      inputs: "Payload con RUT, nombre, email, teléfono, domicilio, contraseña, ID curso, escuela, arancel total y abono 50%.",
      process: "Transacción ACID en PostgreSQL que valida unicidad, limpia registros preliminares opuestos, inserta en tablas oficiales y genera hash Bcrypt de contraseña.",
      outputs: "Registro consolidado en la base de datos y token de sesión JWT activo.",
      actor: "Sistema Backend / Supabase PostgreSQL",
      priority: "Must Have (Crítica)",
      acceptance: "Inserción garantizada en la tabla de escuela correspondiente y confirmación de login sin errores de RLS."
    },
    {
      code: "RF-15",
      module: "Base de Datos / Reglas de Negocio",
      name: "Regla Institucional de Matrícula Única por Alumno",
      desc: "El sistema debe aplicar y salvaguardar la regla de negocio institucional de '1 alumno = 1 curso activo confirmado'. Mediante el trigger de base de datos `check_single_course_enrollment` y la restricción `UNIQUE (user_id, course_id)`, el sistema debe impedir que un estudiante mantenga múltiples cursos confirmados simultáneamente en distintas escuelas.",
      inputs: "Intento de registro o matrícula en una escuela.",
      process: "Comprobación en el trigger de base de datos de la existencia de matrículas previas con estado `ABONO_50_CONFIRMADO` en la escuela opuesta.",
      outputs: "Aprobación de matrícula o lanzamiento de excepción PostgreSQL descriptiva.",
      actor: "Motor de Base de Datos PostgreSQL",
      priority: "Must Have (Crítica)",
      acceptance: "Prevención estricta de doble matrícula confirmada para el mismo RUT en ambas escuelas."
    },
    {
      code: "RF-16",
      module: "Plataforma Virtual LMS",
      name: "Campus Virtual Multi-Rol con Control de Acceso RBAC",
      desc: "El sistema debe proveer una plataforma integral de gestión de aprendizaje (LMS) con arquitectura modular (`LMSLayout.jsx`), conmutación de temas, navegación lateral responsiva y control de acceso basado en roles para 4 perfiles: Estudiante (`STUDENT`), Docente (`TEACHER`), Empresa/Empleador (`EMPLOYER` / `EMPRESA`) y Administrador General OTEC (`ADMIN`).",
      inputs: "Inicio de sesión con RUT y contraseña a través de `PlatformModal.jsx`.",
      process: "Verificación en `auth.users`, consulta de perfil en `public.users` y enrutamiento a las vistas autorizadas según el rol.",
      outputs: "Acceso al entorno del campus virtual correspondiente con privilegios restringidos.",
      actor: "Usuarios de los 4 Roles Autorizados",
      priority: "Must Have (Crítica)",
      acceptance: "Aislamiento estricto de vistas: estudiantes no pueden acceder a herramientas administrativas ni docentes a ajustes del sitio."
    },
    {
      code: "RF-17",
      module: "LMS / Estudiante",
      name: "Área Personal del Estudiante y Resumen de Avance",
      desc: "El sistema debe proveer un dashboard principal para el estudiante (`PersonalAreaView.jsx`) que presente métricas de progreso porcentual, horas cronológicas cursadas, estado de pagos de cuotas (Cuota 1 Abono y Cuota 2 Saldo), notificaciones de la dirección académica y enlaces rápidos a sus clases.",
      inputs: "Navegación del alumno a la pestaña 'Área Personal'.",
      process: "Cálculo de métricas de avance y consulta de estado de matrícula en tiempo real.",
      outputs: "Dashboard con gráficos de progreso, indicadores de horas y avisos institucionales.",
      actor: "Estudiante",
      priority: "Must Have (Crítica)",
      acceptance: "Despliegue fidedigno del curso activo, abono registrado y porcentaje de avance curricular."
    },
    {
      code: "RF-18",
      module: "LMS / Estudiante",
      name: "Aula Virtual del Curso y Visualizador de Contenidos",
      desc: "El sistema debe incluir el aula virtual interactiva (`CourseClassroomView.jsx`) con temarios modulares, visualización de clases en video, material complementario en PDF descargable, cuestionarios de autoevaluación y registro de avance lección por lección.",
      inputs: "Selección de un curso matriculado en 'Mis Cursos'.",
      process: "Carga de la estructura de unidades temáticas y actualización del progreso al completar lecturas o lecciones.",
      outputs: "Entorno interactivo de e-learning adaptado a las normativas de capacitación a distancia SENCE.",
      actor: "Estudiante",
      priority: "Must Have (Crítica)",
      acceptance: "Reproducción fluida de contenidos y persistencia del avance del estudiante."
    },
    {
      code: "RF-19",
      module: "LMS / Estudiante",
      name: "Módulo de Clases en Vivo Sincrónicas con Registro de Asistencia",
      desc: "El sistema debe contar con un módulo de clases sincrónicas (`StudentLiveClassesView.jsx`) que informe sobre las videoconferencias programadas (Zoom, Google Meet, Teams), enlaces de acceso directo, docentes a cargo, registro automático de asistencia y repositorio de grabaciones anteriores.",
      inputs: "Acceso a la pestaña 'Clases en Vivo' por parte del estudiante.",
      process: "Consulta de sesiones programadas, validación de horario y registro de clic para control de asistencia digital.",
      outputs: "Listado de sesiones en vivo y botón de conexión directa.",
      actor: "Estudiante / Docente",
      priority: "Should Have (Alta)",
      acceptance: "Conexión funcional al enlace de la sala virtual y registro de fecha/hora de ingreso."
    },
    {
      code: "RF-20",
      module: "LMS / Bolsa de Trabajo",
      name: "Bolsa de Trabajo Regional de la Macro Zona Norte",
      desc: "El sistema debe integrar una bolsa de empleo regional (`JobBoardView.jsx`) enfocada en empresas del sector seguridad privada (guardias OS-10, operadores CCTV, vigilantes de faena) y oficios técnicos en Arica y Parinacota, permitiendo al estudiante postular con un solo clic adjuntando su perfil y capacitaciones aprobadas.",
      inputs: "Visualización de ofertas laborales y clic en 'Postular a la Vacante'.",
      process: "Registro de la postulación en la tabla `job_applications` vinculando al estudiante con la oferta y la empresa.",
      outputs: "Notificación de postulación exitosa y seguimiento del estado de la candidatura.",
      actor: "Estudiante / Empresa",
      priority: "Should Have (Alta)",
      acceptance: "Registro de postulación en base de datos y visibilidad para la empresa oferente."
    },
    {
      code: "RF-21",
      module: "LMS / Docente",
      name: "Panel de Instructor, Control de Asistencia y Evaluaciones",
      desc: "El sistema debe proporcionar a los docentes acreditados un panel especializado (`TeacherPortalView.jsx`) para administrar sus cursos asignados, visualizar la nómina de alumnos matriculados, registrar asistencia digital y asentar calificaciones según las exigencias del libro de clases digital de SENCE.",
      inputs: "Ingreso de calificaciones y marcas de asistencia por parte del profesor.",
      process: "Validación de rangos de notas (1.0 a 7.0) y almacenamiento en la base de datos.",
      outputs: "Libro de clases digitalizado con cálculo automático de promedios de aprobación.",
      actor: "Docente",
      priority: "Must Have (Crítica)",
      acceptance: "Cálculo matemático exacto de promedios y cumplimiento de los formatos exigidos por fiscalización SENCE."
    },
    {
      code: "RF-22",
      module: "LMS / Docente",
      name: "Banco de Preguntas y Simuladores de Examen Oficial SPD / OS-10",
      desc: "El sistema debe incorporar un Banco de Preguntas (`QuestionBankView.jsx`) y Banco de Contenidos (`ContentBankView.jsx`) que permita a los instructores crear y clasificar reactivos tipo test (opción múltiple, verdadero/falso) para la preparación del examen oficial ante la Autoridad Fiscalizadora OS-10 de Carabineros de Chile y la Subsecretaría de Prevención del Delito.",
      inputs: "Creación de reactivos pedagógicos con sus respuestas correctas y puntajes.",
      process: "Almacenamiento clasificado por materias (Legislación, Primeros Auxilios, Seguridad de Instalaciones, Defensa Personal).",
      outputs: "Simuladores de examen interactivos con retroalimentación instantánea para los estudiantes.",
      actor: "Docente / Alumno",
      priority: "Should Have (Alta)",
      acceptance: "Generación de exámenes aleatorios y cálculo inmediato del porcentaje de logro."
    },
    {
      code: "RF-23",
      module: "LMS / Empresa",
      name: "Portal de Empleadores, Reclutamiento y Franquicia Tributaria SENCE",
      desc: "El sistema debe brindar a las empresas aliadas un portal especializado (`EmployerPortalView.jsx`) para publicar ofertas de trabajo, buscar candidatos certificados de PrevySeg, revisar currículums vitae y solicitar cotizaciones para capacitación corporativa bajo la Franquicia Tributaria SENCE (Ley 19.518).",
      inputs: "Publicación de vacantes o solicitudes de cotización corporativa.",
      process: "Gestión de ofertas en base de datos y matching con perfiles de egresados idóneos.",
      outputs: "Publicación visible en la bolsa de trabajo y cotizaciones enviadas al área comercial.",
      actor: "Empresa / OTEC PrevySeg",
      priority: "Should Have (Alta)",
      acceptance: "Visualización de candidatos acreditados y cálculo orientativo de Franquicia SENCE."
    },
    {
      code: "RF-24",
      module: "LMS / Administrador OTEC",
      name: "Portal de Admisiones y Supervisión de Expedientes de Matrícula",
      desc: "El sistema debe proveer al Director OTEC y personal de admisiones un panel centralizado (`AdmissionPortalView.jsx`) para monitorear en tiempo real todas las inscripciones registradas en `escuela_oficio` y `escuela_seguridad`, verificar el estado de los abonos del 50%, validar antecedentes y gestionar la entrega de certificados.",
      inputs: "Consulta y filtrado de postulantes por RUT, escuela, curso o estado de matrícula.",
      process: "Consulta en tiempo real a las tablas relacionales de Supabase PostgreSQL.",
      outputs: "Tabla de expedientes de matrícula con acciones de validación y contacto directo.",
      actor: "Administrador General OTEC",
      priority: "Must Have (Crítica)",
      acceptance: "Visualización íntegra de los matriculados con sincronización en tiempo real."
    },
    {
      code: "RF-25",
      module: "LMS / Certificación",
      name: "Emisión de Diplomas Digitales con Código QR de Verificación Pública",
      desc: "El sistema debe incluir el módulo de Aprobación y Emisión de Certificados (`CertificateApprovalView.jsx`) para generar diplomas oficiales con identificación de OTEC PrevySeg, código de autorización SENCE, horas cronológicas del curso y un código QR único antifraude que permita a cualquier empleador o autoridad fiscalizadora verificar la autenticidad del documento en línea.",
      inputs: "Aprobación de la certificación por parte de la administración tras verificar nota >= 4.0 y asistencia >= 75%.",
      process: "Generación de token criptográfico único, renderizado de diploma en PDF y creación de código QR vinculado a endpoint público.",
      outputs: "Diploma digital en formato PDF descargable y verificable mediante escaneo de código QR.",
      actor: "Administrador / Alumno / Empleador",
      priority: "Must Have (Crítica)",
      acceptance: "Lectura exitosa del código QR desde cualquier smartphone dirigiendo a la validación oficial del certificado."
    },
    {
      code: "RF-26",
      module: "LMS / Administrador OTEC",
      name: "Gestión Dinámica de Catálogo de Cursos, Cupos y Fechas Oficiales",
      desc: "El sistema debe incorporar una herramienta de administración (`SiteAdminView.jsx` y `CourseManagerModal.jsx`) que permita al administrador OTEC ajustar en tiempo real los cupos disponibles, fechas de inicio y término, aranceles y disponibilidad de cada uno de los 20 cursos del catálogo, reflejándose inmediatamente en el portal público.",
      inputs: "Modificación de parámetros de curso desde el panel administrativo.",
      process: "Actualización en el almacenamiento estructurado y emisión de eventos de sincronización.",
      outputs: "Catálogo público actualizado al instante sin requerir nuevas compilaciones de código.",
      actor: "Administrador OTEC",
      priority: "Should Have (Alta)",
      acceptance: "Reflejo inmediato de cupos y fechas modificadas en la vista de inicio y ficha de inscripción."
    }
  ];

  // Requerimientos No Funcionales Actuales
  const nonFunctionalRequirements = [
    {
      code: "RNF-01",
      category: "Seguridad & Criptografía",
      name: "Cifrado de Contraseñas y Gestión de Credenciales",
      spec: "Todas las contraseñas de acceso deben almacenarse en la base de datos con hash unidireccional Blowfish Bcrypt (256 bits). El sistema nunca debe guardar claves en texto plano ni exponer credenciales en logs o respuestas de red.",
      metric: "Hash Bcrypt en auth.users con salt aleatorio en el 100% de los registros.",
      priority: "Crítica"
    },
    {
      code: "RNF-02",
      category: "Seguridad en Base de Datos",
      name: "Políticas de Seguridad a Nivel de Fila (RLS) y Funciones SECURITY DEFINER",
      spec: "La base de datos PostgreSQL en Supabase debe aplicar Row Level Security (RLS) en todas las tablas sensibles. Las operaciones de matrícula desde usuarios anónimos deben canalizarse obligatoriamente mediante Stored Procedures atómicos con privilegios controlados (`SECURITY DEFINER`).",
      metric: "100% de tablas públicas con RLS habilitado y procedimientos almacenados auditados.",
      priority: "Crítica"
    },
    {
      code: "RNF-03",
      category: "Privacidad de Datos",
      name: "Cumplimiento de la Ley Chilena N° 19.628 sobre Protección de la Vida Privada",
      spec: "El tratamiento de los datos personales (RUT, teléfonos, domicilios, medios de pago) debe ajustarse estrictamente a la legislación chilena sobre protección de datos personales, garantizando su uso exclusivo para fines académicos y administrativos de OTEC PrevySeg.",
      metric: "Cláusulas de protección visibles en la ficha y consentimiento explícito del postulante.",
      priority: "Crítica"
    },
    {
      code: "RNF-04",
      category: "Cumplimiento Normativo",
      name: "Alineación Estricta con la Ley N° 21.659 y Directivas SPD / OS-10",
      spec: "Los programas y mallas formativas de la Escuela de Seguridad Privada deben respetar los estándares de horas cronológicas, materias teóricas y polígonos de tiro exigidos por la nueva Ley de Seguridad Privada N° 21.659 y la Autoridad Fiscalizadora OS-10 de Carabineros de Chile.",
      metric: "100% de cursos de seguridad estructurados conforme a los decretos reglamentarios vigentes.",
      priority: "Crítica"
    },
    {
      code: "RNF-05",
      category: "Gestión de Calidad",
      name: "Cumplimiento de la Norma Chilena de Calidad NCh 2728:2015",
      spec: "Los procesos de diseño curricular, admisión, registro de asistencia, evaluación y certificación deben cumplir con los requisitos del Sistema de Gestión de Calidad para Organismos Técnicos de Capacitación (NCh 2728:2015).",
      metric: "Trazabilidad completa de expedientes, asistencia y calificaciones apta para auditorías de certificación.",
      priority: "Crítica"
    },
    {
      code: "RNF-06",
      category: "Rendimiento & Latencia",
      name: "Tiempos de Respuesta y Rendimiento de Carga",
      spec: "El portal público debe alcanzar una carga inicial en menos de 1.5 segundos en conexiones de banda ancha estándar. Las transacciones de matrícula y las búsquedas en catálogo deben responder en un tiempo inferior a 250 milisegundos.",
      metric: "First Contentful Paint (FCP) < 1.0s y Time to Interactive (TTI) < 1.5s.",
      priority: "Alta"
    },
    {
      code: "RNF-07",
      category: "Disponibilidad & Continuidad",
      name: "Alta Disponibilidad y Respaldo de Datos",
      spec: "La infraestructura alojada sobre Supabase y CDNs globales debe garantizar una disponibilidad del 99.9% (SLA), con respaldos automatizados continuos de la base de datos PostgreSQL que permitan recuperación ante desastres.",
      metric: "Uptime anual >= 99.9% y punto de recuperación de datos (RPO) < 24 horas.",
      priority: "Alta"
    },
    {
      code: "RNF-08",
      category: "Usabilidad & Accesibilidad",
      name: "Diseño Responsivo Multiplataforma y Mobile-First",
      spec: "El sistema debe adaptarse de forma óptima a resoluciones móviles (desde 360px), tablets y pantallas de escritorio (hasta 4K). La navegación debe mantener altos estándares de accesibilidad visual (WCAG 2.1 nivel AA), contrastes tipográficos y zonas de toque táctil cómodas.",
      metric: "100% de pantallas operables sin desbordamientos horizontales ni pérdida de funcionalidad.",
      priority: "Alta"
    },
    {
      code: "RNF-09",
      category: "Integridad Transaccional",
      name: "Propiedades ACID y Atomicidad en Base de Datos",
      spec: "Las operaciones de matrícula y creación de usuario deben ejecutarse bajo un estándar estricto de atomicidad: si falla la inserción en la escuela correspondiente o la creación de credenciales, la transacción completa debe ser revertida (`ROLLBACK`) impidiendo registros huérfanos.",
      metric: "0 registros inconsistentes o huérfanos entre users, escuela_oficio, escuela_seguridad y enrollments.",
      priority: "Crítica"
    },
    {
      code: "RNF-10",
      category: "Verificabilidad Antifraude",
      name: "Trazabilidad y Verificación Pública de Diplomas",
      spec: "Cada certificado emitido por el sistema debe contar con un identificador criptográfico único y un código QR funcional que dirija a un punto de verificación público de PrevySeg, permitiendo validar la identidad del graduado, fecha, curso y horas cronológicas.",
      metric: "Verificación de autenticidad accesible públicamente en < 1 segundo sin requerir inicio de sesión.",
      priority: "Alta"
    }
  ];

  // Generación del Documento DOCX
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
              spacing: { after: 120 },
              children: [
                new TextRun({
                  text: "PREVYSEG OTEC 2026 — ESPECIFICACIÓN FORMAL DE REQUERIMIENTOS (SRS ACTUAL)",
                  bold: true,
                  size: 15,
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
                new TextRun({
                  text: "Página ",
                  size: 16,
                  color: COLOR_MUTED,
                  font: "Calibri"
                }),
                new TextRun({
                  children: [PageNumber.CURRENT],
                  size: 16,
                  bold: true,
                  color: COLOR_PRIMARY,
                  font: "Calibri"
                }),
                new TextRun({
                  text: " de ",
                  size: 16,
                  color: COLOR_MUTED,
                  font: "Calibri"
                }),
                new TextRun({
                  children: [PageNumber.TOTAL_PAGES],
                  size: 16,
                  bold: true,
                  color: COLOR_PRIMARY,
                  font: "Calibri"
                })
              ]
            })
          ]
        })
      },
      children: [
        // Portada Formal
        new Paragraph({ spacing: { before: 800, after: 180 }, alignment: AlignmentType.CENTER, children: [
          new TextRun({ text: "ORGANISMO TÉCNICO DE CAPACITACIÓN PREVYSEG SPA", bold: true, size: 24, color: COLOR_SECONDARY, font: "Calibri" })
        ]}),
        new Paragraph({ spacing: { after: 240 }, alignment: AlignmentType.CENTER, children: [
          new TextRun({ text: "SISTEMA INTEGRAL DE GESTIÓN ACADÉMICA Y CAMPUS VIRTUAL 2026", bold: true, size: 34, color: COLOR_PRIMARY, font: "Calibri" })
        ]}),
        new Paragraph({ spacing: { after: 480 }, alignment: AlignmentType.CENTER, children: [
          new TextRun({ text: "ESPECIFICACIÓN FORMAL DE REQUERIMIENTOS DE SOFTWARE (IEEE 830 / ISO-IEC-IEEE 29148)", bold: true, size: 20, color: COLOR_TEAL, font: "Calibri" })
        ]}),
        new Paragraph({ spacing: { after: 600 }, alignment: AlignmentType.CENTER, children: [
          new TextRun({ text: "Estado del Proyecto: 100% Implementado y Vigente | Septiembre 2026", italic: true, size: 18, color: COLOR_MUTED, font: "Calibri" })
        ]}),

        // Ficha Técnica de la Portada
        new Table({
          width: { size: 100, type: WidthType.PERCENTAGE },
          borders: standardBorders,
          rows: [
            new TableRow({ children: [
              createCell("Parámetro del Proyecto", { isHeader: true, width: 35 }),
              createCell("Detalle Institucional Vigente", { isHeader: true, width: 65 })
            ]}),
            new TableRow({ children: [
              createCell("Entidad Titular", { bold: true }),
              createCell("Organismo Técnico de Capacitación PrevySeg SpA (Arica, Chile)")
            ]}),
            new TableRow({ children: [
              createCell("Sede Oficial", { bold: true }),
              createCell("Blanco Encalada N°666, 2do Piso, Arica — Región de Arica y Parinacota")
            ]}),
            new TableRow({ children: [
              createCell("Acreditaciones Oficiales", { bold: true }),
              createCell("SENCE (Franquicia Tributaria), NCh 2728:2015, Subsecretaría de Prevención del Delito SPD, Directemar, Seremi de Salud, SAG")
            ]}),
            new TableRow({ children: [
              createCell("Stack Tecnológico Base", { bold: true }),
              createCell("React 19, Vite, TailwindCSS v4, Framer Motion, Supabase PostgreSQL, GoTrue Auth")
            ]}),
            new TableRow({ children: [
              createCell("Capacidad Curricular", { bold: true }),
              createCell("20 Cursos Oficiales Activos (10 Escuela de Oficios / 10 Escuela de Seguridad Privada)")
            ]}),
            new TableRow({ children: [
              createCell("Roles del Sistema", { bold: true }),
              createCell("Estudiante (STUDENT), Docente (TEACHER), Empresa (EMPLOYER), Administrador OTEC (ADMIN)")
            ]}),
            new TableRow({ children: [
              createCell("Alcance del Documento", { bold: true }),
              createCell("Exclusivamente componentes, funciones y reglas vigentes en el proyecto actual.")
            ]})
          ]
        }),

        new Paragraph({ children: [new PageBreak()] }),

        // SECCIÓN 1: INTRODUCCIÓN
        createHeading1("1. INTRODUCCIÓN Y ALCANCE DEL SISTEMA"),
        createHeading2("1.1 Propósito del Documento"),
        createParagraph("El presente documento constituye la Especificación de Requerimientos de Software (SRS) formal del Sistema Integral PrevySeg 2026, redactado conforme a los lineamientos del estándar internacional IEEE 830 y la norma ISO/IEC/IEEE 29148. Su objetivo es definir de forma exhaustiva y verificable la totalidad de los requerimientos funcionales, requerimientos no funcionales, reglas de negocio y restricciones técnicas que operan activamente en la plataforma."),
        
        createHeading2("1.2 Alcance del Producto"),
        createParagraph("El sistema abarca el ecosistema digital completo de OTEC PrevySeg SpA, comprendiendo:"),
        createBullet("Portal Web Institucional:", "Con selector dinámico de escuelas (Seguridad Privada y Oficios), Misión Institucional, métricas oficiales y fondo animado."),
        createBullet("Catálogo Oficial de 20 Cursos:", "Desglosado en 10 programas de formación en seguridad privada y 10 especializaciones en oficios técnicos y habilidades."),
        createBullet("Ficha de Inscripción Digital y Abono 50%:", "Captura de postulantes, validación de RUT con algoritmo Módulo 11, creación de cuenta de aula virtual y pasarela de pago para abono de Cuota N°1 (Reserva)."),
        createBullet("Persistencia Atómica en PostgreSQL:", "Procedimiento almacenado process_enrollment_registration que sincroniza de forma atómica auth.users, public.users, escuela_oficio, escuela_seguridad y enrollments."),
        createBullet("Campus Virtual LMS Multi-Rol:", "Entorno de aprendizaje con control de acceso RBAC para Estudiantes, Docentes, Empresas y Administrador General OTEC."),
        createBullet("Bolsa de Empleo Regional & Certificación QR:", "Vinculación laboral directa en Arica y verificación pública antifraude de diplomas mediante códigos QR."),

        createHeading2("1.3 Definiciones, Siglas y Abreviaturas"),
        createBullet("OTEC:", "Organismo Técnico de Capacitación acreditado conforme a la Ley N° 19.518."),
        createBullet("SENCE:", "Servicio Nacional de Capacitación y Empleo (Ministerio del Trabajo y Previsión Social de Chile)."),
        createBullet("SPD / OS-10:", "Subsecretaría de Prevención del Delito y Prefectura de Seguridad Privada OS-10 de Carabineros de Chile."),
        createBullet("Directemar:", "Dirección General del Territorio Marítimo y de Marina Mercante de Chile."),
        createBullet("RUT:", "Rol Único Tributario (identificador nacional chileno validado por Módulo 11)."),
        createBullet("LMS:", "Learning Management System (Sistema de Gestión del Aprendizaje / Campus Virtual)."),
        createBullet("RBAC:", "Role-Based Access Control (Control de Acceso Basado en Roles: STUDENT, TEACHER, EMPLOYER, ADMIN)."),
        createBullet("Bcrypt:", "Algoritmo criptográfico de hashing adaptativo basado en el cifrador Blowfish."),

        new Paragraph({ children: [new PageBreak()] }),

        // SECCIÓN 2: DESCRIPCIÓN GENERAL
        createHeading1("2. DESCRIPCIÓN GENERAL Y ROLES DEL SISTEMA"),
        createHeading2("2.1 Perspectiva del Producto"),
        createParagraph("El sistema opera como una Single Page Application (SPA) de alto rendimiento desarrollada sobre React 19 y Vite, respaldada por una base de datos relacional PostgreSQL administrada mediante el servicio Cloud de Supabase. El sistema ofrece un portal de admisión público y un entorno protegido de aula virtual accesible mediante credenciales creadas durante el proceso de matrícula."),

        createHeading2("2.2 Clasificación de Actores y Roles de Usuario"),
        new Table({
          width: { size: 100, type: WidthType.PERCENTAGE },
          borders: standardBorders,
          rows: [
            new TableRow({ children: [
              createCell("Rol / Actor", { isHeader: true, width: 22 }),
              createCell("Código", { isHeader: true, width: 18 }),
              createCell("Descripción y Alcance de Privilegios en la Plataforma", { isHeader: true, width: 60 })
            ]}),
            new TableRow({ children: [
              createCell("Estudiante", { bold: true }),
              createCell("STUDENT", { bold: true }),
              createCell("Alumno regular matriculado en la Escuela de Oficios o Escuela de Seguridad. Acceso al Área Personal, Mis Cursos, Aula Virtual, Clases en Vivo sincrónicas, Bolsa de Empleo y perfil personal.")
            ]}),
            new TableRow({ children: [
              createCell("Docente / Instructor", { bold: true }),
              createCell("TEACHER", { bold: true }),
              createCell("Profesor acreditado ante SENCE o instructor habilitado por la SPD. Gestión de cursos a cargo, libro de clases digital, registro de asistencia, Banco de Preguntas y Banco de Contenido.")
            ]}),
            new TableRow({ children: [
              createCell("Empresa / Empleador", { bold: true }),
              createCell("EMPLOYER", { bold: true }),
              createCell("Organización empleadora de la Macro Zona Norte. Publicación de ofertas de trabajo en la Bolsa de Empleo, visualización de candidatos certificados y cotización de Franquicia Tributaria SENCE.")
            ]}),
            new TableRow({ children: [
              createCell("Administrador OTEC", { bold: true }),
              createCell("ADMIN", { bold: true }),
              createCell("Director Ejecutivo y Jefatura Académica de PrevySeg. Portal de Admisiones, supervisión de matriculados en escuela_oficio y escuela_seguridad, emisión de diplomas QR, gestor de cursos y reportes.")
            ]})
          ]
        }),

        new Paragraph({ children: [new PageBreak()] }),

        // SECCIÓN 3: REQUERIMIENTOS FUNCIONALES
        createHeading1("3. ESPECIFICACIÓN DE REQUERIMIENTOS FUNCIONALES (RF)"),
        createParagraph("A continuación se detallan los 26 requerimientos funcionales que rigen el funcionamiento del sistema actual, estructurados según sus módulos operativos:"),

        ...functionalRequirements.flatMap(rf => [
          createHeading2(`${rf.code}: ${rf.name}`),
          new Table({
            width: { size: 100, type: WidthType.PERCENTAGE },
            borders: standardBorders,
            rows: [
              new TableRow({ children: [
                createCell("Identificador", { bold: true, width: 25, bgColor: COLOR_BG_LIGHT }),
                createCell(rf.code, { bold: true, width: 25 }),
                createCell("Prioridad", { bold: true, width: 20, bgColor: COLOR_BG_LIGHT }),
                createCell(rf.priority, { bold: true, width: 30, textColor: rf.priority.includes("Crítica") ? "B91C1C" : "0F3B7A" })
              ]}),
              new TableRow({ children: [
                createCell("Módulo Funcional", { bold: true, bgColor: COLOR_BG_LIGHT }),
                createCell(rf.module, { colSpan: 3 })
              ]}),
              new TableRow({ children: [
                createCell("Actor(es) Principal(es)", { bold: true, bgColor: COLOR_BG_LIGHT }),
                createCell(rf.actor, { colSpan: 3 })
              ]}),
              new TableRow({ children: [
                createCell("Descripción Detallada", { bold: true, bgColor: COLOR_BG_LIGHT }),
                createCell(rf.desc, { colSpan: 3 })
              ]}),
              new TableRow({ children: [
                createCell("Entradas (Inputs)", { bold: true, bgColor: COLOR_BG_LIGHT }),
                createCell(rf.inputs, { colSpan: 3 })
              ]}),
              new TableRow({ children: [
                createCell("Procesamiento Interno", { bold: true, bgColor: COLOR_BG_LIGHT }),
                createCell(rf.process, { colSpan: 3 })
              ]}),
              new TableRow({ children: [
                createCell("Salidas (Outputs)", { bold: true, bgColor: COLOR_BG_LIGHT }),
                createCell(rf.outputs, { colSpan: 3 })
              ]}),
              new TableRow({ children: [
                createCell("Criterio de Aceptación", { bold: true, bgColor: COLOR_BG_LIGHT }),
                createCell(rf.acceptance, { colSpan: 3, bold: true })
              ]})
            ]
          }),
          new Paragraph({ spacing: { after: 160 }, children: [] })
        ]),

        new Paragraph({ children: [new PageBreak()] }),

        // SECCIÓN 4: REQUERIMIENTOS NO FUNCIONALES
        createHeading1("4. ESPECIFICACIÓN DE REQUERIMIENTOS NO FUNCIONALES (RNF)"),
        createParagraph("Los requerimientos no funcionales garantizan la calidad de servicio, seguridad criptográfica, cumplimiento de normativas de capacitación en Chile y robustez tecnológica:"),

        ...nonFunctionalRequirements.flatMap(rnf => [
          createHeading2(`${rnf.code}: ${rnf.name}`),
          new Table({
            width: { size: 100, type: WidthType.PERCENTAGE },
            borders: standardBorders,
            rows: [
              new TableRow({ children: [
                createCell("Código", { bold: true, width: 25, bgColor: COLOR_BG_LIGHT }),
                createCell(rnf.code, { bold: true, width: 25 }),
                createCell("Categoría", { bold: true, width: 20, bgColor: COLOR_BG_LIGHT }),
                createCell(rnf.category, { bold: true, width: 30 })
              ]}),
              new TableRow({ children: [
                createCell("Especificación Técnica", { bold: true, bgColor: COLOR_BG_LIGHT }),
                createCell(rnf.spec, { colSpan: 3 })
              ]}),
              new TableRow({ children: [
                createCell("Métrica de Cumplimiento", { bold: true, bgColor: COLOR_BG_LIGHT }),
                createCell(rnf.metric, { colSpan: 3, bold: true })
              ]}),
              new TableRow({ children: [
                createCell("Nivel de Criticidad", { bold: true, bgColor: COLOR_BG_LIGHT }),
                createCell(rnf.priority, { colSpan: 3, bold: true, textColor: rnf.priority === "Crítica" ? "B91C1C" : "0F3B7A" })
              ]})
            ]
          }),
          new Paragraph({ spacing: { after: 140 }, children: [] })
        ]),

        new Paragraph({ children: [new PageBreak()] }),

        // SECCIÓN 5: ARQUITECTURA DE DATOS
        createHeading1("5. ARQUITECTURA DE DATOS Y ESQUEMA POSTGRESQL"),
        createParagraph("La persistencia del sistema está modelada en Supabase PostgreSQL garantizando atomicidad, integridad referencial y seguridad RLS:"),
        createBullet("auth.users & auth.identities:", "Gestión de autenticación oficial Supabase GoTrue, hashes Bcrypt, estado email_verified = true y tokens de sesión."),
        createBullet("public.users:", "Perfiles consolidados con RUT formateado, nombre, email, teléfono, dirección en Arica, rol (STUDENT, TEACHER, EMPLOYER, ADMIN) y fecha de creación."),
        createBullet("public.escuela_oficio:", "Registro oficial de matrículas para los 10 cursos de la Escuela de Oficios, registrando curso_id, curso_nombre, modalidad, horas, monto_total, abono_50, estado_matricula = 'MATRICULADO' y estado_pago = 'ABONO_50_CONFIRMADO'."),
        createBullet("public.escuela_seguridad:", "Registro oficial de matrículas para los 10 cursos de la Escuela de Seguridad Privada, registrando curso_id, curso_nombre, modalidad, horas, monto_total, abono_50, estado_matricula = 'MATRICULADO' y estado_pago = 'ABONO_50_CONFIRMADO'."),
        createBullet("public.enrollments:", "Sincronización de matrículas activas en el LMS asociando user_id y course_id con restricción UNIQUE(user_id, course_id)."),
        createBullet("public.courses:", "Catálogo maestro sincronizado de cursos con horas, modalidad, cupos y precios."),
        createBullet("public.job_offers & public.job_applications:", "Módulo de vinculación laboral con vacantes activas y postulaciones de alumnos."),

        createHeading2("5.1 Procedimiento Atómico process_enrollment_registration"),
        createParagraph("Función PostgreSQL con privilegios `SECURITY DEFINER` que orquesta la transacción integral de matrícula y creación de usuario:"),
        createBullet("Paso 1 - Sanitización:", "Limpia y valida el formato del RUT con dígito verificador chileno."),
        createBullet("Paso 2 - Regla Institucional:", "Comprueba que el alumno no tenga ya una matrícula con abono confirmado en la otra escuela."),
        createBullet("Paso 3 - Cuenta de Usuario:", "Crea o actualiza el registro en auth.users con hash Bcrypt y lo sincroniza en public.users con rol STUDENT."),
        createBullet("Paso 4 - Matrícula Oficial:", "Inserta en public.escuela_oficio o public.escuela_seguridad según el curso seleccionado."),
        createBullet("Paso 5 - Sincronización LMS:", "Actualiza public.enrollments garantizando el acceso inmediato del alumno al aula virtual."),

        new Paragraph({ children: [new PageBreak()] }),

        // SECCIÓN 6: MATRIZ DE TRAZABILIDAD
        createHeading1("6. MATRIZ DE TRAZABILIDAD DE REQUERIMIENTOS"),
        createParagraph("Matriz de correspondencia entre los requerimientos funcionales, componentes de código y tablas de base de datos:"),

        new Table({
          width: { size: 100, type: WidthType.PERCENTAGE },
          borders: standardBorders,
          rows: [
            new TableRow({ children: [
              createCell("Req. ID", { isHeader: true, width: 12 }),
              createCell("Módulo / Requerimiento", { isHeader: true, width: 30 }),
              createCell("Componente(s) Frontend", { isHeader: true, width: 30 }),
              createCell("Persistencia / Tabla DB", { isHeader: true, width: 28 })
            ]}),
            new TableRow({ children: [
              createCell("RF-01", { bold: true }),
              createCell("Portal Web y Navegación"),
              createCell("App.jsx, Header.jsx, NetworkBackground.jsx"),
              createCell("Estático / SessionStorage")
            ]}),
            new TableRow({ children: [
              createCell("RF-02", { bold: true }),
              createCell("Switcher Conmutable de Escuelas"),
              createCell("Hero.jsx, Header.jsx, ExecutionSection.jsx"),
              createCell("React State (activeSchool)")
            ]}),
            new TableRow({ children: [
              createCell("RF-03", { bold: true }),
              createCell("Misión Oficial y Pilares"),
              createCell("AboutUs.jsx"),
              createCell("Configuración Institucional")
            ]}),
            new TableRow({ children: [
              createCell("RF-05", { bold: true }),
              createCell("Catálogo Oficial 20 Cursos"),
              createCell("Services.jsx, coursesData.js"),
              createCell("public.courses / localStorage")
            ]}),
            new TableRow({ children: [
              createCell("RF-06", { bold: true }),
              createCell("Modal Detalle de Escuela"),
              createCell("SchoolDetailModal.jsx"),
              createCell("Estructura de Datos OTEC")
            ]}),
            new TableRow({ children: [
              createCell("RF-08", { bold: true }),
              createCell("Ficha con Curso Preseleccionado"),
              createCell("EnrollmentForm.jsx, Modals.jsx"),
              createCell("Contexto de Navegación")
            ]}),
            new TableRow({ children: [
              createCell("RF-09", { bold: true }),
              createCell("Validación RUT Módulo 11"),
              createCell("EnrollmentForm.jsx, supabase.js"),
              createCell("Algoritmo Módulo 11")
            ]}),
            new TableRow({ children: [
              createCell("RF-10", { bold: true }),
              createCell("Creación Cuenta Aula Virtual"),
              createCell("EnrollmentForm.jsx (Sección 2.1)"),
              createCell("auth.users, public.users")
            ]}),
            new TableRow({ children: [
              createCell("RF-11", { bold: true }),
              createCell("Pasarela Abono 50% y Medios"),
              createCell("EnrollmentForm.jsx (Sección 3)"),
              createCell("Webpay / Cuentas Bancarias")
            ]}),
            new TableRow({ children: [
              createCell("RF-14", { bold: true }),
              createCell("Persistencia Atómica PostgreSQL"),
              createCell("supabase.js (processEnrollmentRegistration)"),
              createCell("public.process_enrollment_registration")
            ]}),
            new TableRow({ children: [
              createCell("RF-15", { bold: true }),
              createCell("Regla 1 Curso Activo por Alumno"),
              createCell("EnrollmentForm.jsx"),
              createCell("Trigger check_single_course_enrollment")
            ]}),
            new TableRow({ children: [
              createCell("RF-16", { bold: true }),
              createCell("Campus Virtual LMS Multi-Rol"),
              createCell("LMSLayout.jsx, PlatformModal.jsx"),
              createCell("auth.users, public.users (rol)")
            ]}),
            new TableRow({ children: [
              createCell("RF-17", { bold: true }),
              createCell("Área Personal Estudiante"),
              createCell("PersonalAreaView.jsx, MyCoursesView.jsx"),
              createCell("public.enrollments, escuela_*")
            ]}),
            new TableRow({ children: [
              createCell("RF-18", { bold: true }),
              createCell("Aula Virtual y Clases en Vivo"),
              createCell("CourseClassroomView.jsx, StudentLiveClassesView.jsx"),
              createCell("public.enrollments, zoom/meet")
            ]}),
            new TableRow({ children: [
              createCell("RF-20", { bold: true }),
              createCell("Bolsa de Trabajo Regional"),
              createCell("JobBoardView.jsx"),
              createCell("public.job_offers, job_applications")
            ]}),
            new TableRow({ children: [
              createCell("RF-21", { bold: true }),
              createCell("Panel Docente y Asistencia"),
              createCell("TeacherPortalView.jsx, QuestionBankView.jsx"),
              createCell("public.courses, question_banks")
            ]}),
            new TableRow({ children: [
              createCell("RF-23", { bold: true }),
              createCell("Portal Empresas y SENCE"),
              createCell("EmployerPortalView.jsx"),
              createCell("public.job_offers, users (EMPLOYER)")
            ]}),
            new TableRow({ children: [
              createCell("RF-24", { bold: true }),
              createCell("Portal Admisiones OTEC"),
              createCell("AdmissionPortalView.jsx"),
              createCell("public.escuela_oficio, escuela_seguridad")
            ]}),
            new TableRow({ children: [
              createCell("RF-25", { bold: true }),
              createCell("Emisión de Certificados QR"),
              createCell("CertificateApprovalView.jsx"),
              createCell("public.certificates (código QR)")
            ]}),
            new TableRow({ children: [
              createCell("RF-26", { bold: true }),
              createCell("Gestor Dinámico de Cursos"),
              createCell("SiteAdminView.jsx, CourseManagerModal.jsx"),
              createCell("public.courses, localStorage")
            ]})
          ]
        }),

        new Paragraph({ spacing: { before: 360, after: 120 }, alignment: AlignmentType.CENTER, children: [
          new TextRun({ text: "— FIN DE LA ESPECIFICACIÓN DE REQUERIMIENTOS PREVYSEG 2026 —", bold: true, size: 18, color: COLOR_PRIMARY, font: "Calibri" })
        ]})
      ]
    }]
  });

  const buffer = await Packer.toBuffer(doc);
  const docxPath = path.join(process.cwd(), 'Especificacion_Requerimientos_PrevySeg_2026_Actual.docx');
  fs.writeFileSync(docxPath, buffer);
  console.log(`✅ Archivo DOCX formal generado exitosamente: ${docxPath}`);
}

createCurrentSRS().catch(err => {
  console.error('Error generando documento DOCX:', err);
  process.exit(1);
});
