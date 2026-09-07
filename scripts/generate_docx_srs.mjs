import fs from 'fs';
import path from 'path';
import {
  Document,
  Packer,
  Paragraph,
  TextRun,
  HeadingLevel,
  Table,
  TableRow,
  TableCell,
  WidthType,
  BorderStyle,
  AlignmentType,
  ShadingType,
  Header,
  Footer,
  PageNumber,
  NumberFormat
} from 'docx';

const NAVY = '0F2942'; // PrevySeg Navy
const GOLD = 'D4AF37'; // Gold
const LIGHT_GRAY = 'F8FAFC';
const BORDER_COLOR = 'CBD5E1';
const TEXT_DARK = '1E293B';
const TEXT_MUTED = '64748B';

function createCell(text, isHeader = false, widthPercent = null, customBg = null, bold = false, align = AlignmentType.LEFT) {
  return new TableCell({
    width: widthPercent ? { size: widthPercent, type: WidthType.PERCENTAGE } : undefined,
    shading: {
      type: ShadingType.CLEAR,
      fill: customBg || (isHeader ? NAVY : 'FFFFFF')
    },
    margins: {
      top: 120,
      bottom: 120,
      left: 150,
      right: 150
    },
    borders: {
      top: { style: BorderStyle.SINGLE, size: 1, color: BORDER_COLOR },
      bottom: { style: BorderStyle.SINGLE, size: 1, color: BORDER_COLOR },
      left: { style: BorderStyle.SINGLE, size: 1, color: BORDER_COLOR },
      right: { style: BorderStyle.SINGLE, size: 1, color: BORDER_COLOR }
    },
    children: [
      new Paragraph({
        alignment: align,
        children: [
          new TextRun({
            text: text,
            bold: isHeader || bold,
            color: isHeader ? 'FFFFFF' : TEXT_DARK,
            font: 'Calibri',
            size: isHeader ? 20 : 18
          })
        ]
      })
    ]
  });
}

async function generateDocx() {
  const doc = new Document({
    styles: {
      default: {
        document: {
          run: {
            font: 'Calibri',
            size: 22,
            color: TEXT_DARK
          }
        }
      }
    },
    sections: [
      {
        properties: {
          page: {
            margin: {
              top: 1440,
              bottom: 1440,
              left: 1440,
              right: 1440
            }
          }
        },
        headers: {
          default: new Header({
            children: [
              new Paragraph({
                alignment: AlignmentType.RIGHT,
                children: [
                  new TextRun({
                    text: 'PrevySeg Capacitaciones Ltda. | ERS-PREVYSEG-2026-V3.0',
                    size: 16,
                    color: TEXT_MUTED,
                    font: 'Calibri'
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
                alignment: AlignmentType.SPACE_BETWEEN,
                children: [
                  new TextRun({
                    text: 'Confidencial - Norma NCh 2728:2015 & SENCE',
                    size: 16,
                    color: TEXT_MUTED,
                    font: 'Calibri'
                  }),
                  new TextRun({
                    text: '    Página ',
                    size: 16,
                    color: TEXT_MUTED,
                    font: 'Calibri'
                  }),
                  new TextRun({
                    children: [PageNumber.CURRENT],
                    size: 16,
                    color: TEXT_MUTED,
                    font: 'Calibri'
                  }),
                  new TextRun({
                    text: ' de ',
                    size: 16,
                    color: TEXT_MUTED,
                    font: 'Calibri'
                  }),
                  new TextRun({
                    children: [PageNumber.TOTAL_PAGES],
                    size: 16,
                    color: TEXT_MUTED,
                    font: 'Calibri'
                  })
                ]
              })
            ]
          })
        },
        children: [
          // PORTADA / ENCABEZADO
          new Paragraph({
            alignment: AlignmentType.CENTER,
            spacing: { after: 200 },
            children: [
              new TextRun({
                text: 'PREVYSEG CAPACITACIONES LTDA.',
                bold: true,
                size: 28,
                color: NAVY,
                font: 'Calibri'
              })
            ]
          }),
          new Paragraph({
            alignment: AlignmentType.CENTER,
            spacing: { after: 100 },
            children: [
              new TextRun({
                text: 'ORGANISMO TÉCNICO DE CAPACITACIÓN (OTEC)',
                bold: true,
                size: 22,
                color: GOLD,
                font: 'Calibri'
              })
            ]
          }),
          new Paragraph({
            alignment: AlignmentType.CENTER,
            spacing: { after: 400 },
            children: [
              new TextRun({
                text: 'Registro SENCE N° 1238088725 • Certificación NCh 2728:2015',
                size: 18,
                color: TEXT_MUTED,
                italics: true
              })
            ]
          }),
          new Paragraph({
            alignment: AlignmentType.CENTER,
            spacing: { after: 200 },
            children: [
              new TextRun({
                text: 'ESPECIFICACIÓN DE REQUERIMIENTOS DE SOFTWARE (SRS / ERS)',
                bold: true,
                size: 32,
                color: NAVY
              })
            ]
          }),
          new Paragraph({
            alignment: AlignmentType.CENTER,
            spacing: { after: 400 },
            children: [
              new TextRun({
                text: 'Ecosistema Digital PrevySeg 2026 (Portal Web, Admisión & Campus Virtual LMS)',
                size: 22,
                color: TEXT_DARK
              })
            ]
          }),

          // METADATOS
          new Table({
            width: { size: 100, type: WidthType.PERCENTAGE },
            rows: [
              new TableRow({
                children: [
                  createCell('Código Documental', true, 30),
                  createCell('ERS-PREVYSEG-2026-V3.0', false, 70, null, true)
                ]
              }),
              new TableRow({
                children: [
                  createCell('Estándares Aplicados', true, 30),
                  createCell('ISO/IEC/IEEE 29148:2018 / IEEE Std 830-1998 / ISO/IEC 25010', false, 70)
                ]
              }),
              new TableRow({
                children: [
                  createCell('Fecha de Emisión', true, 30),
                  createCell('Septiembre 2026 (Versión Consolidada Post-Push)', false, 70)
                ]
              }),
              new TableRow({
                children: [
                  createCell('Repositorio GitHub', true, 30),
                  createCell('Sebastianaso/PrevySeg2026 (Rama main - Commit 57f7822)', false, 70)
                ]
              }),
              new TableRow({
                children: [
                  createCell('Estado de Aprobación', true, 30),
                  createCell('APROBADO PARA PRODUCCIÓN Y CERTIFICACIÓN SENCE', false, 70, 'DCFCE7', true)
                ]
              })
            ]
          }),

          new Paragraph({ spacing: { before: 400, after: 200 }, children: [] }),

          // SECCIÓN 1: CONTROL DE VERSIONES
          new Paragraph({
            heading: HeadingLevel.HEADING_1,
            spacing: { before: 300, after: 150 },
            children: [
              new TextRun({
                text: '1. Control de Versiones del Documento',
                bold: true,
                size: 24,
                color: NAVY
              })
            ]
          }),
          new Table({
            width: { size: 100, type: WidthType.PERCENTAGE },
            rows: [
              new TableRow({
                children: [
                  createCell('Versión', true, 12, null, true, AlignmentType.CENTER),
                  createCell('Fecha', true, 15, null, true, AlignmentType.CENTER),
                  createCell('Autor / Rol', true, 20),
                  createCell('Descripción del Cambio', true, 38),
                  createCell('Aprobador', true, 15)
                ]
              }),
              new TableRow({
                children: [
                  createCell('v1.0.0', false, 12, LIGHT_GRAY, true, AlignmentType.CENTER),
                  createCell('01/09/2026', false, 15, LIGHT_GRAY, false, AlignmentType.CENTER),
                  createCell('Equipo Frontend', false, 20, LIGHT_GRAY),
                  createCell('Levantamiento inicial de requerimientos para portal web y vitrina de cursos.', false, 38, LIGHT_GRAY),
                  createCell('PM / OTEC', false, 15, LIGHT_GRAY)
                ]
              }),
              new TableRow({
                children: [
                  createCell('v2.0.0', false, 12, null, true, AlignmentType.CENTER),
                  createCell('22/09/2026', false, 15, null, false, AlignmentType.CENTER),
                  createCell('Ingeniería Fullstack', false, 20),
                  createCell('Depuración a 6 cursos oficiales SENCE, emisión de diplomas y confidencialidad Ley 19.628.', false, 38),
                  createCell('Dirección OTEC', false, 15)
                ]
              }),
              new TableRow({
                children: [
                  createCell('v3.0.0', false, 12, 'EFF6FF', true, AlignmentType.CENTER),
                  createCell('04/09/2026', false, 15, 'EFF6FF', false, AlignmentType.CENTER),
                  createCell('Arquitecto TI & Seguridad', false, 20, 'EFF6FF'),
                  createCell('Actualización Integral: Encriptación Bcrypt 256-bit (pgcrypto) en BD, validación RUT Módulo 11 en vivo, cálculo abono 50% Cuota 1 y 2, aviso normativo SPD vs Oficios, reseteo de claves y soporte WhatsApp.', false, 38, 'EFF6FF', true),
                  createCell('Dirección General', false, 15, 'EFF6FF', true)
                ]
              })
            ]
          }),

          // SECCIÓN 2: INTRODUCCIÓN Y MARCO LEGAL
          new Paragraph({
            heading: HeadingLevel.HEADING_1,
            spacing: { before: 400, after: 150 },
            children: [
              new TextRun({
                text: '2. Introducción, Alcance y Marco Regulatorio',
                bold: true,
                size: 24,
                color: NAVY
              })
            ]
          }),
          new Paragraph({
            spacing: { after: 150 },
            children: [
              new TextRun({
                text: '2.1 Propósito del Sistema: ',
                bold: true,
                color: NAVY
              }),
              new TextRun({
                text: 'Formalizar los requerimientos funcionales, no funcionales y de seguridad criptográfica del Ecosistema PrevySeg 2026, abarcando el Portal Institucional, Ficha Digital de Admisión con abono del 50%, y el Campus Virtual LMS para el seguimiento curricular y emisión de certificados bajo estándares SENCE y SPD.'
              })
            ]
          }),
          new Paragraph({
            spacing: { after: 150 },
            children: [
              new TextRun({
                text: '2.2 Marco Regulatorio y Legal Aplicable:',
                bold: true,
                color: NAVY
              })
            ]
          }),
          new Paragraph({
            bullet: { level: 0 },
            children: [
              new TextRun({ text: 'Norma Chilena NCh 2728:2015: ', bold: true }),
              new TextRun({ text: 'Sistema de Gestión de la Calidad para Organismos Técnicos de Capacitación (OTEC).' })
            ]
          }),
          new Paragraph({
            bullet: { level: 0 },
            children: [
              new TextRun({ text: 'Ley N° 19.518: ', bold: true }),
              new TextRun({ text: 'Estatuto de Capacitación y Empleo (Franquicia Tributaria SENCE).' })
            ]
          }),
          new Paragraph({
            bullet: { level: 0 },
            children: [
              new TextRun({ text: 'Decreto Ley N° 3.607 y Ley N° 21.659: ', bold: true }),
              new TextRun({ text: 'Regulación de Seguridad Privada y acreditación de guardias fiscalizada por la Subsecretaría de Prevención del Delito (SPD) y Carabineros OS-10.' })
            ]
          }),
          new Paragraph({
            bullet: { level: 0 },
            spacing: { after: 300 },
            children: [
              new TextRun({ text: 'Ley N° 19.628: ', bold: true }),
              new TextRun({ text: 'Protección de la Vida Privada (Confidencialidad de calificaciones numéricas en diplomas públicos).' })
            ]
          }),

          // SECCIÓN 3: MATRIZ DE ACTORES
          new Paragraph({
            heading: HeadingLevel.HEADING_1,
            spacing: { before: 300, after: 150 },
            children: [
              new TextRun({
                text: '3. Matriz de Actores y Perfiles (RBAC)',
                bold: true,
                size: 24,
                color: NAVY
              })
            ]
          }),
          new Table({
            width: { size: 100, type: WidthType.PERCENTAGE },
            rows: [
              new TableRow({
                children: [
                  createCell('Actor / Rol', true, 25),
                  createCell('Descripción y Competencias', true, 35),
                  createCell('Responsabilidades Principales', true, 40)
                ]
              }),
              new TableRow({
                children: [
                  createCell('Administrador OTEC (ADMIN)', false, 25, LIGHT_GRAY, true),
                  createCell('Directorio y personal administrativo de PrevySeg.', false, 35, LIGHT_GRAY),
                  createCell('Gestión integral del LMS, administración de participantes, reseteo de contraseñas Bcrypt, visto bueno de diplomas y ajustes del sistema.', false, 40, LIGHT_GRAY)
                ]
              }),
              new TableRow({
                children: [
                  createCell('Docente / Instructor (TEACHER)', false, 25, null, true),
                  createCell('Profesores e instructores acreditados ante la SPD.', false, 35),
                  createCell('Impartición de clases, revisión de actividades, control de asistencia pedagógica y acompañamiento del alumno.', false, 40)
                ]
              }),
              new TableRow({
                children: [
                  createCell('Estudiante / Alumno (STUDENT)', false, 25, LIGHT_GRAY, true),
                  createCell('Postulantes matriculados en cursos de seguridad u oficios.', false, 35, LIGHT_GRAY),
                  createCell('Acceso al aula virtual, lecciones, descarga de material didáctico, postulación a bolsa de empleo y descarga de diplomas.', false, 40, LIGHT_GRAY)
                ]
              }),
              new TableRow({
                children: [
                  createCell('Postulante / Público General', false, 25, null, true),
                  createCell('Personas interesadas en capacitarse.', false, 35),
                  createCell('Llenado de Ficha de Inscripción, abono del 50%, consulta de requisitos documentales y contacto por WhatsApp.', false, 40)
                ]
              })
            ]
          }),

          // SECCIÓN 4: DIAGRAMAS Y ARQUITECTURA
          new Paragraph({
            heading: HeadingLevel.HEADING_1,
            spacing: { before: 400, after: 150 },
            children: [
              new TextRun({
                text: '4. Arquitectura y Diagramas de Procesos',
                bold: true,
                size: 24,
                color: NAVY
              })
            ]
          }),
          new Paragraph({
            spacing: { after: 150 },
            children: [
              new TextRun({
                text: '4.1 Flujo de Admisión y Criptografía Bcrypt:',
                bold: true,
                color: NAVY
              })
            ]
          }),
          new Paragraph({
            spacing: { after: 150 },
            children: [
              new TextRun({
                text: '1. El Postulante completa la Ficha Digital con validación en vivo de RUT (Módulo 11) y selecciona su curso.\n2. Si es curso de Guardia, se despliega el aviso obligatorio de Examen Presencial Externo SPD. Si es curso de Oficios, se indica Certificación Directa OTEC PrevySeg.\n3. Se calcula el Abono del 50% (Cuota 1 de reserva y Cuota 2 al inicio).\n4. Se crea la cuenta del alumno en PostgreSQL invocando la función `register_new_student` / `admin_create_user`, generando el hash Blowfish Bcrypt 256-bit mediante `pgcrypto.crypt` sin almacenar texto plano.\n5. Se redirige la confirmación a WhatsApp Oficial (+56 9 8231 2128) para la toma de los 10 documentos legales requeridos.'
              })
            ]
          }),

          // SECCIÓN 5: REQUERIMIENTOS FUNCIONALES
          new Paragraph({
            heading: HeadingLevel.HEADING_1,
            spacing: { before: 400, after: 150 },
            children: [
              new TextRun({
                text: '5. Matriz Detallada de Requerimientos Funcionales (RF)',
                bold: true,
                size: 24,
                color: NAVY
              })
            ]
          }),
          new Table({
            width: { size: 100, type: WidthType.PERCENTAGE },
            rows: [
              new TableRow({
                children: [
                  createCell('Código', true, 10, null, true, AlignmentType.CENTER),
                  createCell('Módulo', true, 15),
                  createCell('Requerimiento Funcional', true, 25),
                  createCell('Descripción Técnica y Criterio de Aceptación', true, 38),
                  createCell('Prioridad', true, 12, null, true, AlignmentType.CENTER)
                ]
              }),
              ...[
                { id: 'RF-01', mod: 'Admisión', name: 'Ficha de Inscripción Digital Oficial', desc: 'Captura datos personales y laborales del estudiante (Nombre completo, RUT, Fecha de Nacimiento, País, Teléfono, Domicilio, Correo, Condición Laboral y Empresa).', prio: 'Must Have' },
                { id: 'RF-02', mod: 'Admisión', name: 'Cálculo Dinámico del Abono 50%', desc: 'Desglose automático de Cuota N°1 (50% de reserva al inscribirse) y Cuota N°2 (saldo restante al inicio de clases) según arancel oficial.', prio: 'Must Have' },
                { id: 'RF-03', mod: 'Normativo', name: 'Diferenciación Explicativa SPD vs Oficios', desc: 'Aviso normativo claro: Cursos de Guardia requieren examen presencial ante la SPD; Cursos de Oficios otorgan certificación directa PrevySeg OTEC.', prio: 'Must Have' },
                { id: 'RF-04', mod: 'Admisión', name: 'Coordinación Documental por WhatsApp', desc: 'Generación de mensaje codificado URI a WhatsApp (+56 9 8231 2128) con código de solicitud y detalle de 10 documentos oficiales.', prio: 'Must Have' },
                { id: 'RF-05', mod: 'Admisión', name: 'Buzón de Preguntas o Dudas', desc: 'Formulario interactivo con aviso explícito de que el equipo se comunicará para orientar y solicitar documentos complementarios si fuese necesario.', prio: 'Should Have' },
                { id: 'RF-06', mod: 'Seguridad', name: 'Encriptación de Contraseñas (Bcrypt)', desc: 'Almacenamiento seguro de todas las contraseñas mediante hash Blowfish Bcrypt (256-bit, costo 10) usando pgcrypto en PostgreSQL. Cero texto plano.', prio: 'Must Have' },
                { id: 'RF-07', mod: 'Seguridad', name: 'Procedimiento register_new_student', desc: 'Función PL/pgSQL atómica para registrar al estudiante con clave encriptada, crear usuario en auth.users, auth.identities, public.users y matrícula inicial.', prio: 'Must Have' },
                { id: 'RF-08', mod: 'Seguridad', name: 'Procedimiento admin_create_user', desc: 'Función PL/pgSQL para creación de usuarios desde consola administrativa con rol asignable (ADMIN, TEACHER, STUDENT) y contraseña encriptada.', prio: 'Must Have' },
                { id: 'RF-09', mod: 'Seguridad', name: 'Procedimiento change_user_password', desc: 'Función PL/pgSQL para actualización segura y re-hasheo de contraseñas de usuarios en ambas tablas (auth.users y public.users).', prio: 'Must Have' },
                { id: 'RF-10', mod: 'Validación', name: 'Algoritmo Módulo 11 para RUT', desc: 'Validación estricta y matemática del dígito verificador del RUT chileno (calculateRutDv y validateRut).', prio: 'Must Have' },
                { id: 'RF-11', mod: 'Validación', name: 'Formateador Dinámico de RUT', desc: 'Formateo automático de inputs en vivo a estructura XX.XXX.XXX-X mientras el usuario escribe (formatRut).', prio: 'Must Have' },
                { id: 'RF-12', mod: 'Validación', name: 'Medidor de Fuerza de Clave', desc: 'Evaluación en tiempo real de la robustez de contraseñas con barra de progreso y 5 niveles visuales (Muy Débil a Muy Segura).', prio: 'Should Have' },
                { id: 'RF-13', mod: 'Seguridad', name: 'Modal de Acceso 1-Click Demo', desc: 'Plataforma modal con alternancia de visibilidad de clave (ojo/candado) y accesos rápidos pre-cargados para los 3 roles del sistema.', prio: 'Must Have' },
                { id: 'RF-14', mod: 'LMS Admin', name: 'Gestión de Participantes y Claves', desc: 'Tabla interactiva de alumnos con filtros por rol, curso, búsqueda por RUT, exportación y nuevo modal para Cambiar / Restablecer Contraseña (🔑).', prio: 'Must Have' },
                { id: 'RF-15', mod: 'LMS Alumno', name: 'Área Personal y Mis Cursos', desc: 'Panel de control del estudiante con avance curricular porcentual, estado SENCE y banner de certificados oficiales emitidos.', prio: 'Must Have' },
                { id: 'RF-16', mod: 'LMS Alumno', name: 'Aula Virtual y Lecciones', desc: 'Vista estructurada de módulos formativos, contenido pedagógico y cuestionarios interactivos.', prio: 'Must Have' },
                { id: 'RF-17', mod: 'Certificación', name: 'Visto Bueno Administrativo', desc: 'Panel de validación de requisitos legales para autorizar y emitir diplomas oficiales en PDF con sello SENCE y QR.', prio: 'Must Have' },
                { id: 'RF-18', mod: 'Certificación', name: 'Confidencialidad Ley N° 19.628', desc: 'Cero exposición de notas numéricas en los certificados y diplomas emitidos para salvaguardar la privacidad del estudiante.', prio: 'Must Have' },
                { id: 'RF-19', mod: 'Servicios', name: 'Bolsa de Empleo Regional Arica', desc: 'Catálogo de vacantes laborales en seguridad para la región de Arica y Parinacota con postulación curricular directa con RUT.', prio: 'Should Have' },
                { id: 'RF-20', mod: 'Comercial', name: 'Matriz de Tramos SENCE', desc: 'Exposición de tramos de franquicia tributaria (100% hasta 25 UTM, 50%, 15% y Pago Particular) para empresas y RRHH.', prio: 'Must Have' }
              ].map((rf, idx) =>
                new TableRow({
                  children: [
                    createCell(rf.id, false, 10, idx % 2 === 0 ? LIGHT_GRAY : null, true, AlignmentType.CENTER),
                    createCell(rf.mod, false, 15, idx % 2 === 0 ? LIGHT_GRAY : null),
                    createCell(rf.name, false, 25, idx % 2 === 0 ? LIGHT_GRAY : null, true),
                    createCell(rf.desc, false, 38, idx % 2 === 0 ? LIGHT_GRAY : null),
                    createCell(rf.prio, false, 12, idx % 2 === 0 ? LIGHT_GRAY : null, false, AlignmentType.CENTER)
                  ]
                })
              )
            ]
          }),

          // SECCIÓN 6: REQUERIMIENTOS NO FUNCIONALES
          new Paragraph({
            heading: HeadingLevel.HEADING_1,
            spacing: { before: 400, after: 150 },
            children: [
              new TextRun({
                text: '6. Matriz de Requerimientos No Funcionales (RNF - ISO/IEC 25010)',
                bold: true,
                size: 24,
                color: NAVY
              })
            ]
          }),
          new Table({
            width: { size: 100, type: WidthType.PERCENTAGE },
            rows: [
              new TableRow({
                children: [
                  createCell('Código', true, 12, null, true, AlignmentType.CENTER),
                  createCell('Dimensión ISO 25010', true, 25),
                  createCell('Requisito y Criterio de Calidad', true, 43),
                  createCell('Métrica Objetivo', true, 20)
                ]
              }),
              ...[
                { id: 'RNF-01', dim: 'Seguridad Criptográfica', req: 'Todas las contraseñas deben estar hasheadas con Blowfish Bcrypt ($2a$10$). Prohibido almacenar texto plano bajo cualquier condición.', metric: '100% claves con hash Bcrypt' },
                { id: 'RNF-02', dim: 'Integridad de Datos', req: 'Sincronización atómica e idempotente (ON CONFLICT) entre auth.users, auth.identities y public.users.', metric: '0 fallos de clave foránea' },
                { id: 'RNF-03', dim: 'Seguridad (RBAC)', req: 'Aislamiento estricto de vistas y acciones administrativas según el rol del usuario autenticado (ADMIN, TEACHER, STUDENT).', metric: '100% rutas protegidas' },
                { id: 'RNF-04', dim: 'Eficiencia de Rendimiento', req: 'Tiempo de renderizado inicial (FCP) inferior a 1.2 segundos y compilación limpia con Vite.', metric: 'FCP ≤ 1.2s • 0 errores build' },
                { id: 'RNF-05', dim: 'Disponibilidad Operacional', req: 'Disponibilidad del servicio 24/7/365 con un Acuerdo de Nivel de Servicio (SLA) del 99.8% mensual.', metric: 'Uptime ≥ 99.8%' },
                { id: 'RNF-06', dim: 'Usabilidad y Accesibilidad', req: 'Interfaz con contraste WCAG 2.1 Nivel AA (bg-slate-50, bg-white, text-slate-900), tipografía legible y respuesta en vivo.', metric: 'Ratio contraste ≥ 4.5:1' },
                { id: 'RNF-07', dim: 'Compatibilidad Cross-Browser', req: 'Funcionamiento garantizado en Chrome, Edge, Firefox, Safari y navegadores móviles Android/iOS.', metric: '100% navegadores estándar' },
                { id: 'RNF-08', dim: 'Mantenibilidad del Código', req: 'Arquitectura modular desacoplada en React con librerías dedicadas (supabase.js, validation.js).', metric: 'Código modular sin deuda' },
                { id: 'RNF-09', dim: 'Cumplimiento SENCE', req: 'Trazabilidad y auditoría de participantes bajo la Norma Chilena NCh 2728:2015.', metric: 'Auditoría SENCE 100% OK' },
                { id: 'RNF-10', dim: 'Privacidad Legal (Ley 19.628)', req: 'Certificados emitidos con acreditación cualitativa (APROBADO) sin notas numéricas.', metric: '0% notas en certificados' },
                { id: 'RNF-11', dim: 'Tolerancia a Fallos', req: 'Captura de excepciones en tiempo de ejecución con React Error Boundaries y mensajes amigables al usuario.', metric: '0 pantallas blancas' },
                { id: 'RNF-12', dim: 'Trazabilidad en Git', req: 'Registro histórico en Git con commits semánticos y descriptivos en español sincronizados en GitHub.', metric: 'Trazabilidad 100% en main' }
              ].map((rnf, idx) =>
                new TableRow({
                  children: [
                    createCell(rnf.id, false, 12, idx % 2 === 0 ? LIGHT_GRAY : null, true, AlignmentType.CENTER),
                    createCell(rnf.dim, false, 25, idx % 2 === 0 ? LIGHT_GRAY : null, true),
                    createCell(rnf.req, false, 43, idx % 2 === 0 ? LIGHT_GRAY : null),
                    createCell(rnf.metric, false, 20, idx % 2 === 0 ? LIGHT_GRAY : null, true)
                  ]
                })
              )
            ]
          }),

          // SECCIÓN 7: APROBACIÓN FORMAL
          new Paragraph({
            heading: HeadingLevel.HEADING_1,
            spacing: { before: 400, after: 150 },
            children: [
              new TextRun({
                text: '7. Aprobación y Validación Formal de Ingeniería',
                bold: true,
                size: 24,
                color: NAVY
              })
            ]
          }),
          new Table({
            width: { size: 100, type: WidthType.PERCENTAGE },
            rows: [
              new TableRow({
                children: [
                  createCell('Rol / Responsabilidad', true, 35),
                  createCell('Nombre y Especialidad', true, 35),
                  createCell('Estado y Validación', true, 30, null, true, AlignmentType.CENTER)
                ]
              }),
              new TableRow({
                children: [
                  createCell('Ingeniero Líder de Software / TI', false, 35, LIGHT_GRAY, true),
                  createCell('Sebastián Araya — Ingeniería Informática', false, 35, LIGHT_GRAY),
                  createCell('APROBADO TÉCNICAMENTE', false, 30, 'DCFCE7', true, AlignmentType.CENTER)
                ]
              }),
              new TableRow({
                children: [
                  createCell('Director Académico OTEC', false, 35, null, true),
                  createCell('Ashley Adaros — Dirección PrevySeg Ltda.', false, 35),
                  createCell('APROBADO INSTITUCIONAL', false, 30, 'DCFCE7', true, AlignmentType.CENTER)
                ]
              }),
              new TableRow({
                children: [
                  createCell('Aseguramiento Calidad NCh 2728 / SENCE', false, 35, LIGHT_GRAY, true),
                  createCell('Comité de Calidad y Auditoría OTEC', false, 35, LIGHT_GRAY),
                  createCell('CONFORME A NORMATIVA', false, 30, 'DCFCE7', true, AlignmentType.CENTER)
                ]
              })
            ]
          })
        ]
      }
    ]
  });

  const buffer = await Packer.toBuffer(doc);

  // Asegurar directorios
  const publicDocsDir = path.resolve('public', 'docs');
  const dotDocsDir = path.resolve('.docs');
  if (!fs.existsSync(publicDocsDir)) fs.mkdirSync(publicDocsDir, { recursive: true });
  if (!fs.existsSync(dotDocsDir)) fs.mkdirSync(dotDocsDir, { recursive: true });

  const fileName = 'Especificacion_Requerimientos_PrevySeg_2026.docx';
  fs.writeFileSync(path.join(publicDocsDir, fileName), buffer);
  fs.writeFileSync(path.join(dotDocsDir, fileName), buffer);
  fs.writeFileSync(path.resolve(fileName), buffer);

  console.log('✅ Archivo DOCX generado exitosamente en:');
  console.log(` - public/docs/${fileName} (Descargable desde navegador web en http://localhost:5173/docs/${fileName})`);
  console.log(` - .docs/${fileName}`);
  console.log(` - ${fileName} (Raíz del proyecto)`);
}

generateDocx().catch(err => {
  console.error('❌ Error generando DOCX:', err);
  process.exit(1);
});
