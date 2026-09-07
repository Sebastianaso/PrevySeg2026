import fs from 'fs';
import path from 'path';

const htmlContent = `<!DOCTYPE html>
<html lang="es">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Especificación de Requerimientos de Software - PrevySeg 2026</title>
  <script src="https://cdn.jsdelivr.net/npm/mermaid@10/dist/mermaid.min.js"></script>
  <style>
    :root {
      --primary: #0F2942;
      --gold: #D4AF37;
      --dark: #1E293B;
      --light: #F8FAFC;
      --border: #E2E8F0;
    }
    body {
      font-family: 'Segoe UI', system-ui, -apple-system, sans-serif;
      line-height: 1.6;
      color: var(--dark);
      background: #F1F5F9;
      margin: 0;
      padding: 40px 20px;
    }
    .document-container {
      max-width: 960px;
      margin: 0 auto;
      background: #FFFFFF;
      padding: 50px 60px;
      border-radius: 12px;
      box-shadow: 0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 8px 10px -6px rgba(0, 0, 0, 0.1);
    }
    .header-badge {
      display: inline-block;
      background: #EFF6FF;
      color: #1D4ED8;
      padding: 6px 14px;
      border-radius: 9999px;
      font-size: 13px;
      font-weight: 600;
      margin-bottom: 12px;
      border: 1px solid #BFDBFE;
    }
    h1 {
      color: var(--primary);
      font-size: 28px;
      margin-top: 0;
      margin-bottom: 8px;
      border-bottom: 3px solid var(--gold);
      padding-bottom: 12px;
    }
    h2 {
      color: var(--primary);
      font-size: 20px;
      margin-top: 36px;
      margin-bottom: 16px;
      border-bottom: 1px solid var(--border);
      padding-bottom: 8px;
    }
    h3 {
      color: #334155;
      font-size: 16px;
      margin-top: 24px;
      margin-bottom: 10px;
    }
    table {
      width: 100%;
      border-collapse: collapse;
      margin: 20px 0;
      font-size: 14px;
    }
    th, td {
      border: 1px solid var(--border);
      padding: 10px 14px;
      text-align: left;
    }
    th {
      background-color: var(--primary);
      color: #FFFFFF;
      font-weight: 600;
    }
    tr:nth-child(even) {
      background-color: var(--light);
    }
    .mermaid-box {
      background: #F8FAFC;
      border: 1px solid var(--border);
      border-radius: 8px;
      padding: 20px;
      margin: 20px 0;
      display: flex;
      justify-content: center;
    }
    .btn-download {
      display: inline-flex;
      align-items: center;
      gap: 8px;
      background: #0F2942;
      color: #FFFFFF;
      text-decoration: none;
      padding: 12px 24px;
      border-radius: 8px;
      font-weight: 600;
      font-size: 14px;
      box-shadow: 0 4px 6px -1px rgba(0,0,0,0.1);
      margin-right: 12px;
      margin-bottom: 20px;
    }
    .btn-download:hover {
      background: #1E3A5F;
    }
    .btn-print {
      display: inline-flex;
      align-items: center;
      gap: 8px;
      background: #D4AF37;
      color: #0F2942;
      text-decoration: none;
      padding: 12px 24px;
      border-radius: 8px;
      font-weight: 700;
      font-size: 14px;
      cursor: pointer;
      border: none;
      box-shadow: 0 4px 6px -1px rgba(0,0,0,0.1);
      margin-bottom: 20px;
    }
    @media print {
      body {
        background: #FFFFFF;
        padding: 0;
      }
      .document-container {
        box-shadow: none;
        padding: 0;
        max-width: 100%;
      }
      .no-print {
        display: none !important;
      }
    }
  </style>
</head>
<body>

  <div class="document-container">
    <div class="no-print" style="margin-bottom: 24px; display: flex; flex-wrap: wrap; gap: 12px;">
      <a href="./Especificacion_Requerimientos_PrevySeg_2026.docx" download class="btn-download">
        📄 Descargar Archivo Word (.docx)
      </a>
      <button onclick="window.print()" class="btn-print">
        🖨️ Imprimir / Guardar como PDF
      </button>
    </div>

    <div class="header-badge">CÓDIGO: ERS-PREVYSEG-2026-V3.0 • NORMA NCH 2728:2015</div>
    <h1>Especificación de Requerimientos de Software (SRS / ERS)</h1>
    <p style="font-size: 16px; color: #475569; margin-top: -4px;">
      <strong>Ecosistema Digital PrevySeg 2026</strong> | OTEC Registro SENCE N° 1238088725 • Estándar ISO/IEC/IEEE 29148:2018 & ISO/IEC 25010
    </p>

    <h2>1. Control de Versiones</h2>
    <table>
      <thead>
        <tr>
          <th>Versión</th>
          <th>Fecha</th>
          <th>Autor / Rol</th>
          <th>Descripción del Cambio</th>
          <th>Aprobador</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td><strong>v1.0.0</strong></td>
          <td>01/09/2026</td>
          <td>Equipo Frontend</td>
          <td>Levantamiento inicial de requerimientos para portal web y vitrina de cursos.</td>
          <td>PM / OTEC</td>
        </tr>
        <tr>
          <td><strong>v2.0.0</strong></td>
          <td>22/09/2026</td>
          <td>Ingeniería Fullstack</td>
          <td>Depuración a 6 cursos oficiales SENCE, emisión de diplomas y confidencialidad Ley 19.628.</td>
          <td>Dirección OTEC</td>
        </tr>
        <tr style="background-color: #EFF6FF;">
          <td><strong>v3.0.0</strong></td>
          <td>04/09/2026</td>
          <td>Arquitecto TI & Seguridad</td>
          <td><strong>Actualización Integral Post-Push (57f7822):</strong> Encriptación Bcrypt 256-bit (pgcrypto), validación RUT Módulo 11 en tiempo real, abono 50% (Cuota 1 y 2), aviso SPD vs Oficios, reseteo de claves y soporte WhatsApp.</td>
          <td>Dirección General</td>
        </tr>
      </tbody>
    </table>

    <h2>2. Diagramas de Arquitectura y Procesos</h2>
    
    <h3>2.1 Flujo de Admisión y Criptografía Bcrypt (PostgreSQL / Supabase)</h3>
    <div class="mermaid-box">
      <div class="mermaid">
graph TD
    P[Postulante / Alumno] -->|1. Completa Formulario| F[Ficha Digital de Inscripción]
    F -->|2. Formatea en vivo| V1[validation.js: formatRut & Modulo 11]
    F -->|3. Selecciona Curso| CURSO{Tipo Programa}
    CURSO -->|Seguridad SPD| N1[Aviso: Examen Externo SPD]
    CURSO -->|Escuela Oficios| N2[Aviso: Certificación Directa PrevySeg]
    F -->|4. Calcula Plan Abono| ABONO[Cuota 1: 50% / Cuota 2: Saldo]
    F -->|5. Confirma Inscripción| WA[WhatsApp Admisiones: +56 9 8231 2128]
    F -->|6. Invoca RPC Seguro| RPC1[public.admin_create_user / register_new_student]
    RPC1 -->|Genera Hash Bcrypt 256-bit| CRYPT[pgcrypto: extensions.crypt]
    CRYPT -->|Persiste| AU[(auth.users)]
    CRYPT -->|Persiste| PU[(public.users)]
      </div>
    </div>

    <h3>2.2 Diagrama de Estados del Alumno y Matrícula</h3>
    <div class="mermaid-box">
      <div class="mermaid">
stateDiagram-v2
    [*] --> Postulante_Registrado: Llenado Ficha Digital + Abono 50%
    Postulante_Registrado --> Documentacion_Pendiente: Derivación a WhatsApp (+56 9 8231 2128)
    Documentacion_Pendiente --> Alumno_Activo: Validación 10 Documentos
    Alumno_Activo --> En_Capacitacion: Acceso a Lecciones y Aulas en LMS
    En_Capacitacion --> Requisitos_Completados: Progreso 100% en Plataforma
    Requisitos_Completados --> Diploma_Emitido: Emisión PDF con Sello SENCE (Sin Notas)
    Diploma_Emitido --> [*]
      </div>
    </div>

    <h2>3. Matriz de Requerimientos Funcionales (RF)</h2>
    <table>
      <thead>
        <tr>
          <th>Código</th>
          <th>Módulo</th>
          <th>Requerimiento Funcional</th>
          <th>Descripción Técnica y Criterio de Aceptación</th>
          <th>Prioridad</th>
        </tr>
      </thead>
      <tbody>
        <tr><td><strong>RF-01</strong></td><td>Admisión</td><td><strong>Ficha Digital Oficial</strong></td><td>Captura datos personales y laborales del estudiante (RUT, Nombre, Teléfono, Empresa, etc.).</td><td>Must Have</td></tr>
        <tr><td><strong>RF-02</strong></td><td>Admisión</td><td><strong>Cálculo Abono 50%</strong></td><td>Desglose dinámico de Cuota N°1 (50% de reserva) y Cuota N°2 (saldo al inicio de clases).</td><td>Must Have</td></tr>
        <tr><td><strong>RF-03</strong></td><td>Normativo</td><td><strong>Diferenciación SPD vs Oficios</strong></td><td>Aviso normativo claro: Cursos de Guardia requieren examen presencial ante SPD; Oficios con certificación directa.</td><td>Must Have</td></tr>
        <tr><td><strong>RF-04</strong></td><td>Admisión</td><td><strong>Coordinación WhatsApp</strong></td><td>Mensaje codificado URI hacia WhatsApp (+56 9 8231 2128) con código y detalle de 10 documentos.</td><td>Must Have</td></tr>
        <tr><td><strong>RF-05</strong></td><td>Admisión</td><td><strong>Buzón de Preguntas / Dudas</strong></td><td>Formulario interactivo con aviso de contacto para orientación y requerimiento de documentos.</td><td>Should Have</td></tr>
        <tr><td><strong>RF-06</strong></td><td>Seguridad</td><td><strong>Encriptación Bcrypt (256-bit)</strong></td><td>Hasheo Blowfish Bcrypt ($2a$10$) mediante pgcrypto en PostgreSQL y Supabase Auth. Cero texto plano.</td><td>Must Have</td></tr>
        <tr><td><strong>RF-07</strong></td><td>Seguridad</td><td><strong>Procedimiento register_new_student</strong></td><td>Función PL/pgSQL atómica para registro seguro de usuarios y matrícula.</td><td>Must Have</td></tr>
        <tr><td><strong>RF-08</strong></td><td>Seguridad</td><td><strong>Procedimiento admin_create_user</strong></td><td>Función PL/pgSQL para creación de usuarios desde consola con rol asignable (ADMIN, TEACHER, STUDENT).</td><td>Must Have</td></tr>
        <tr><td><strong>RF-09</strong></td><td>Seguridad</td><td><strong>Procedimiento change_user_password</strong></td><td>Función PL/pgSQL para actualización segura y re-hasheo de contraseñas.</td><td>Must Have</td></tr>
        <tr><td><strong>RF-10</strong></td><td>Validación</td><td><strong>Algoritmo Módulo 11 RUT</strong></td><td>Validación matemática estricta del dígito verificador del RUT chileno.</td><td>Must Have</td></tr>
        <tr><td><strong>RF-11</strong></td><td>Validación</td><td><strong>Formateador Dinámico de RUT</strong></td><td>Formateo automático de inputs en vivo a estructura XX.XXX.XXX-X al escribir.</td><td>Must Have</td></tr>
        <tr><td><strong>RF-12</strong></td><td>Validación</td><td><strong>Medidor de Fuerza de Clave</strong></td><td>Evaluación en tiempo real de la robustez de contraseñas con 5 niveles visuales.</td><td>Should Have</td></tr>
        <tr><td><strong>RF-13</strong></td><td>Seguridad</td><td><strong>Modal de Acceso 1-Click Demo</strong></td><td>Plataforma modal con ver/ocultar clave y accesos demo para los 3 roles.</td><td>Must Have</td></tr>
        <tr><td><strong>RF-14</strong></td><td>LMS Admin</td><td><strong>Gestión Participantes & Claves</strong></td><td>Consola de alumnos con modal interactivo para Cambiar / Restablecer Contraseña (🔑).</td><td>Must Have</td></tr>
        <tr><td><strong>RF-15</strong></td><td>LMS Alumno</td><td><strong>Área Personal & Cursos</strong></td><td>Panel de control del estudiante con avance porcentual y estado SENCE.</td><td>Must Have</td></tr>
        <tr><td><strong>RF-16</strong></td><td>LMS Alumno</td><td><strong>Aula Virtual & Lecciones</strong></td><td>Visualización estructurada de módulos pedagógicos y evaluaciones.</td><td>Must Have</td></tr>
        <tr><td><strong>RF-17</strong></td><td>Certificación</td><td><strong>Visto Bueno Administrativo</strong></td><td>Panel de validación para emitir diplomas oficiales en PDF con sello SENCE y QR.</td><td>Must Have</td></tr>
        <tr><td><strong>RF-18</strong></td><td>Certificación</td><td><strong>Confidencialidad Ley 19.628</strong></td><td>Cero exposición de notas numéricas en certificados públicos.</td><td>Must Have</td></tr>
        <tr><td><strong>RF-19</strong></td><td>Servicios</td><td><strong>Bolsa de Empleo Regional</strong></td><td>Portal de ofertas laborales de seguridad en Arica con postulación con RUT.</td><td>Should Have</td></tr>
        <tr><td><strong>RF-20</strong></td><td>Comercial</td><td><strong>Matriz Tramos SENCE</strong></td><td>Exposición de los tramos de franquicia tributaria (100%, 50%, 15% y Particular).</td><td>Must Have</td></tr>
      </tbody>
    </table>

    <h2>4. Matriz de Requerimientos No Funcionales (RNF - ISO/IEC 25010)</h2>
    <table>
      <thead>
        <tr>
          <th>Código</th>
          <th>Dimensión ISO 25010</th>
          <th>Requisito y Criterio de Calidad</th>
          <th>Métrica Objetivo</th>
        </tr>
      </thead>
      <tbody>
        <tr><td><strong>RNF-01</strong></td><td>Seguridad Criptográfica</td><td>Hasheo Blowfish Bcrypt ($2a$10$) para 100% de contraseñas. Prohibido texto plano.</td><td>100% hashes Bcrypt</td></tr>
        <tr><td><strong>RNF-02</strong></td><td>Integridad de Datos</td><td>Sincronización atómica e idempotente (ON CONFLICT) entre auth y public users.</td><td>0 errores de clave</td></tr>
        <tr><td><strong>RNF-03</strong></td><td>Seguridad (RBAC)</td><td>Aislamiento estricto de vistas y funciones según rol (ADMIN, TEACHER, STUDENT).</td><td>100% rutas protegidas</td></tr>
        <tr><td><strong>RNF-04</strong></td><td>Rendimiento</td><td>Tiempo de renderizado inicial (FCP) inferior a 1.2s y compilación limpia con Vite.</td><td>FCP ≤ 1.2s</td></tr>
        <tr><td><strong>RNF-05</strong></td><td>Disponibilidad</td><td>Disponibilidad del servicio 24/7 con SLA del 99.8% mensual.</td><td>Uptime ≥ 99.8%</td></tr>
        <tr><td><strong>RNF-06</strong></td><td>Usabilidad / Accesibilidad</td><td>Contraste WCAG 2.1 AA (bg-slate-50, text-slate-900) y tipografía legible.</td><td>Ratio ≥ 4.5:1</td></tr>
        <tr><td><strong>RNF-07</strong></td><td>Compatibilidad</td><td>Funcionamiento garantizado en Chrome, Edge, Firefox, Safari y móviles.</td><td>100% estándar</td></tr>
        <tr><td><strong>RNF-08</strong></td><td>Mantenibilidad</td><td>Código modular desacoplado en React (supabase.js, validation.js).</td><td>Modular sin deuda</td></tr>
        <tr><td><strong>RNF-09</strong></td><td>Cumplimiento SENCE</td><td>Trazabilidad de participantes bajo Norma Chilena NCh 2728:2015.</td><td>Auditoría 100% OK</td></tr>
        <tr><td><strong>RNF-10</strong></td><td>Privacidad (Ley 19.628)</td><td>Certificados con acreditación cualitativa ("APROBADO") sin notas numéricas.</td><td>0% notas expuestas</td></tr>
        <tr><td><strong>RNF-11</strong></td><td>Tolerancia a Fallos</td><td>Captura de errores con React Error Boundaries y mensajes amigables.</td><td>0 pantallas blancas</td></tr>
        <tr><td><strong>RNF-12</strong></td><td>Trazabilidad Git</td><td>Commits semánticos y descriptivos en español sincronizados en GitHub.</td><td>100% en main</td></tr>
      </tbody>
    </table>

    <h2>5. Aprobación y Validación de Ingeniería</h2>
    <table>
      <thead>
        <tr>
          <th>Rol / Responsabilidad</th>
          <th>Nombre y Especialidad</th>
          <th>Estado y Validación</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td><strong>Ingeniero Líder de Software / TI</strong></td>
          <td>Sebastián Araya — Ingeniería Informática</td>
          <td style="color: #16A34A; font-weight: bold;">APROBADO TÉCNICAMENTE</td>
        </tr>
        <tr>
          <td><strong>Director Académico OTEC</strong></td>
          <td>Ashley Adaros — Dirección PrevySeg Ltda.</td>
          <td style="color: #16A34A; font-weight: bold;">APROBADO INSTITUCIONAL</td>
        </tr>
        <tr>
          <td><strong>Aseguramiento Calidad NCh 2728 / SENCE</strong></td>
          <td>Comité de Calidad y Auditoría OTEC</td>
          <td style="color: #16A34A; font-weight: bold;">CONFORME A NORMATIVA</td>
        </tr>
      </tbody>
    </table>
  </div>

  <script>
    mermaid.initialize({ startOnLoad: true, theme: 'neutral' });
  </script>
</body>
</html>`;

const publicDocsDir = path.resolve('public', 'docs');
fs.writeFileSync(path.join(publicDocsDir, 'Especificacion_Requerimientos_PrevySeg_2026.html'), htmlContent);
console.log('✅ Versión HTML imprimible generada en public/docs/Especificacion_Requerimientos_PrevySeg_2026.html');
