# OTEC PREVYSEG SpA — DOCUMENTACIÓN TÉCNICA MAESTRA & CARTA GANTT

> **Plataforma Web Integral, Entorno Virtual de Aprendizaje (LMS) Multi-Rol y Sistema de Auditoría en Tiempo Real**  
> **Sede Central:** Arica y Parinacota, Chile  
> **RUT Institucional:** 76.543.210-K  
> **Versión Oficial:** v2.4.0 — Release de Entrega y Fiscalización (Septiembre 2026)  
> **Ingeniero Líder / Autor:** Sebastián Acuña (`Sebastianaso`)  

---

## 🔗 Respaldo y Trazabilidad en GitHub

Para verificar la autenticidad, trazabilidad histórica de commits y respaldo continuo de desarrollo, consulte el repositorio oficial en GitHub:

* **Repositorio Oficial:** [https://github.com/Sebastianaso/PrevySeg2026](https://github.com/Sebastianaso/PrevySeg2026)
* **Propietario / Autor:** `Sebastianaso` (Sebastian Acuña)
* **Rama Principal:** `main`
* **Mecanismo de Respaldo:** Control de versiones Git con commits fechados paso a paso para cada vista, módulo, script de base de datos y subsanación de demandas.

---

## 1. Introducción y Objetivos del Proyecto

El proyecto **PREVYSEG 2026** corresponde al desarrollo de una plataforma tecnológica integral para el Organismo Técnico de Capacitación (OTEC) PrevySeg SpA. Imparte formación en dos áreas reguladas:
1. **Escuela de Seguridad Privada:** Regulada por el Departamento OS-10 de Carabineros de Chile y la Subsecretaría de Prevención del Delito (SPD) bajo el Decreto N° 867.
2. **Escuela de Oficios y Cursos SENCE:** Cursos técnicos bajo franquicia tributaria SENCE y norma chilena de calidad NCh 2728.

### Objetivos Principales
* **Portal Público Interactivo:** Catálogo de 20 cursos con switcher dinámico de escuelas, temarios y buscador.
* **Matrícula y Abono 50% Atómico:** Validación estricta de RUT chileno (Módulo 11), cálculo de abono y reserva de cupo en PostgreSQL.
* **Campus Virtual LMS Multi-Rol:** Entornos específicos para Administrador OTEC, Docente Instructor, Estudiante Regular y Empresa Empleadora.
* **Módulo de Auditoría y Fiscalización:** Gráficos de asistencia SENCE (umbral 75%), libro de calificaciones SPD (60% teórico / 40% práctico) y consola de Live Logs alimentada por Supabase Realtime sin datos simulados.

---

## 2. Arquitectura de Software y Stack Tecnológico

| Capa / Componente | Tecnología | Propósito y Justificación Técnica |
| :--- | :--- | :--- |
| **Frontend Core** | React 19.2 + Vite 8 | Renderizado reactivo de alto rendimiento, modularidad y carga ultrarrápida (HMR < 50ms). |
| **Diseño y Estilos** | Tailwind CSS 4.3 + CSS Vanilla | Interfaz corporativa responsiva, diseño limpio, alto contraste y micro-animaciones. |
| **Animaciones** | Framer Motion 13 + GSAP 3 | Despliegue animado de gráficos SVG, transiciones de rutas y modales interactivos. |
| **Base de Datos** | PostgreSQL 15 (AWS sa-east-1) | Motor relacional ACID en la nube con soporte JSONB, transacciones seguras y RLS. |
| **BaaS & Auth** | Supabase Cloud + Supabase Auth | Autenticación robusta, WebSockets en vivo y funciones RPC con `SECURITY DEFINER`. |
| **Ciberseguridad** | Bcrypt Hashing Dinámico | Cifrado no reversible de contraseñas. Ninguna clave se almacena en texto plano. |
| **Archivos & Exportación** | ExcelJS 4.4 + Docx 9.7 | Generación cliente/servidor de planillas Gantt (.xlsx), actas Word (.docx) y CSVs. |
| **Repositorio** | Git + GitHub | Control de versiones: [https://github.com/Sebastianaso/PrevySeg2026](https://github.com/Sebastianaso/PrevySeg2026). |

---

## 3. Especificación Exhaustiva de Roles de Usuario

### A. Administrador OTEC / Director Ejecutivo (`ADMIN`)
* **Responsabilidad:** Control total institucional, gestión de matrícula, configuración de la plataforma y fiscalización.
* **Vistas Habilitadas:**
  * `AdminGeneralView.jsx`: Métricas globales, ingresos por abonos y accesos rápidos.
  * `SiteAdminView.jsx`: Parámetros de la plataforma, mantenimiento y personalizaciones.
  * `SettingsView.jsx`: Conmutador de modalidades (presencial / online) por curso y asignación de docentes.
  * `ParticipantsView.jsx`: Padrón completo de usuarios, reseteo de claves con Bcrypt y gestión de roles.
  * `CertificateApprovalView.jsx`: Validación de requisitos, emisión de diplomas digitales con código único de verificación.
  * `ReportsView.jsx`: Acceso a los 6 informes de auditoría, marcas SENCE y consola de logs.
  * `QuestionBankView.jsx` & `ContentBankView.jsx`: Repositorios institucionales de reactivos y materiales.

### B. Docente Instructor SPD (`TEACHER` / `DOCENTE`)
* **Responsabilidad:** Docencia, seguimiento académico de cohortes y reporte de notas oficiales.
* **Vistas Habilitadas:**
  * `TeacherPortalView.jsx`:
    * Libro de Notas y Calificaciones Oficiales SENCE/SPD.
    * Publicación de comunicados y avisos urgentes a la clase.
    * Repositorio de materiales didácticos (subida y gestión de guías en PDF y videos).
    * Bandeja de mensajería para resolver dudas de alumnos.

### C. Estudiante / Alumno Regular (`STUDENT` / `ALUMNO`)
* **Responsabilidad:** Cursado de actividades, visualización de clases e-learning y evaluaciones.
* **Vistas Habilitadas:**
  * `PersonalAreaView.jsx`: Resumen de cursos matriculados, porcentaje de avance y avisos.
  * `StudentLiveClassesView.jsx`: Enlaces e ingresos a sesiones sincrónicas en vivo.
  * `CourseClassroomView.jsx`: Aula virtual interactiva con temario modular, lecciones y visor multimedia.
  * `JobBoardView.jsx`: Consulta de ofertas laborales exclusivas y postulación con perfil validado.

### D. Empresa / Empleador (`EMPRESA` / `EMPLOYER`)
* **Responsabilidad:** Reclutamiento de personal calificado (guardias OS-10 y operadores CCTV).
* **Vistas Habilitadas:**
  * `EmployerPortalView.jsx`: Publicación de avisos de empleo, visualización de postulaciones y validación de estado de certificación OS-10 de los egresados.

---

## 4. Detalle Meticuloso de Vistas y Componentes

### 4.1 Portal Público
* `src/components/Hero.jsx`: Portada con switcher dinámico de escuelas (Escuela de Seguridad Privada vs Escuela de Oficios), carrusel fotográfico, textos de impacto y accesos directos a postulaciones.
* `src/components/AboutUs.jsx`: Acreditaciones legales de OTEC PrevySeg SpA, Norma Chilena NCh 2728, certificaciones SENCE, aval de Carabineros OS-10 y SPD.
* `src/components/Services.jsx`: Catálogo comercial de los 20 cursos. Filtros dinámicos por categorías, horas pedagógicas, modalidad (presencial/virtual) y precios.
* `src/components/SchoolDetailModal.jsx`: Ficha técnica de cada escuela con malla de competencias, requisitos de admisión y salida laboral.
* `src/components/RegistrationModal.jsx`: Ficha oficial de matrícula con validación en vivo de RUT chileno (Módulo 11), cálculo automático del abono 50% y guardado atómico en PostgreSQL.
* `src/components/ContactModal.jsx`: Formulario de consulta con selector de cursos y derivación directa.
* `src/components/Footer.jsx`: Datos de contacto de sede Arica, acreditaciones y mapa del sitio.

### 4.2 Campus Virtual LMS
* `src/lms/LMSLayout.jsx`: Marco maestro que gobierna la sesión del usuario, renderiza la barra lateral según el rol activo y gestiona el modo edición.
* `src/lms/views/ReportsView.jsx` **(Módulo de Auditoría y Fiscalización)**:
  * **Apartado 1 (Registro de accesos y asistencia sincrónica SENCE):** Gráfico de cumplimiento frente al umbral legal del 75%, horas acreditadas y tabla de marcas horarias oficiales exportable a CSV.
  * **Apartado 2 (Informe de finalización y aprobación):** Gráfico circular de estado de alumnos (Aprobados, Cursando, Pendientes) y distribución de avance por tramos.
  * **Apartado 3 (Libro de calificaciones SPD):** Histograma de notas en escala chilena 1.0 a 7.0, gráfico de ponderaciones 60% Teórico / 40% Práctico y planilla oficial descargable.
  * **Apartado 4 (Live Logs del sistema):** Stream en vivo de eventos reales en PostgreSQL vía Supabase Realtime con buscador por RUT, filtros de categoría y exportación de bitácora.
  * **Apartado 5 (Participación por módulo):** Gráficos de interacciones y completitud curricular en M1, M2, M3 y M4.
  * **Apartado 6 (Auditoría técnica SENCE & SPD):** Score oficial de conformidad (99.2%), matriz de controles de infraestructura y acta técnica para fiscalizadores.
* `src/lms/views/ExtraCoursesView.jsx`: Módulo especializado para el curso de Televigilancia CCTV con régimen de autoaprendizaje documental de 30 días, visto bueno administrativo, exclusividad de cupo individual e historial de alumnos.

---

## 5. Base de Datos PostgreSQL y Esquema de Tablas

| Nombre de Tabla | Propósito y Descripción | Llaves y Restricciones |
| :--- | :--- | :--- |
| `public.users` | Padrón de usuarios: rut, nombre, email, rol, encrypted_password. | PK: `id (UUID)`. Cifrado Bcrypt. |
| `public.courses` | Catálogo de cursos: titulo, codigo_sence, modalidad, precio, school, activo. | PK: `id (UUID)`. Sincronizado con SENCE. |
| `public.enrollments` | Matrículas: user_id, course_id, estado, progreso, abono_inicial. | FK: `users(id)`, `courses(id)`. |
| `public.escuela_seguridad` | Padrón formal de la Escuela de Seguridad con estado de abono 50%. | FK: `user_id`. Regla 1 alumno = 1 curso. |
| `public.escuela_oficio` | Padrón formal de la Escuela de Oficios SENCE con modalidad y arancel. | FK: `user_id`. Regla 1 alumno = 1 curso. |
| `public.cctv_approval_requests`| Solicitudes de visto bueno para capacitación individual CCTV. | Unique: `(rut, curso_id)`. |
| `public.cctv_special_activations`| Control del alumno activo en CCTV (1 solo a la vez) con vigencia de 30 días.| FK: `user_id`, `course_id`. |
| `public.course_participant_history`| Archivo histórico inmutable de transiciones (INCORPORADO / REEMPLAZADO). | Auditoría histórica SENCE. |
| `public.audit_logs` | Bitácora unificada de eventos en vivo para la consola de fiscalización. | Index: `created_at DESC`, `category`. |
| `public.certificates` | Registro de diplomas emitidos con hash de verificación y URL del PDF. | Emisión exclusiva de administradores. |
| `public.jobs` | Ofertas de empleo para guardias OS-10 y operadores de cámaras. | Vinculado a empresas acreditadas. |

---

## 6. Etapas del Desarrollo, Insumos de la Empresa y Subsanación de Demandas

De acuerdo a la **Carta Gantt oficial** generada en el archivo `Carta_Gantt_Desarrollo_PrevySeg_2026.xlsx`, el proyecto abarca 8 etapas estructuradas:

### Resumen de Etapas e Insumos Necesarios de la Empresa:

1. **Etapa 1: Levantamiento, Planificación e Insumos del Cliente**
   * *Actividades:* Definición de alcance, marco legal SENCE/SPD y arquitectura inicial.
   * *Insumos de la Empresa:* Manuales de procedimiento NCh 2728, organigrama OTEC y resoluciones exentas.
2. **Etapa 2: Diseño de Arquitectura, UX/UI y Prototipado**
   * *Actividades:* Wireframes, sistema de diseño Tailwind y modelado PostgreSQL.
   * *Insumos de la Empresa:* Logotipos vectoriales, manual de marca corporativo y fotografías de sedes.
3. **Etapa 3: Desarrollo Core Frontend y Portal Público**
   * *Actividades:* Landing page, catálogo de los 20 cursos y fichas modales.
   * *Insumos de la Empresa:* Fichas curriculares oficiales, temarios y valores arancelarios.
4. **Etapa 4: Backend, Supabase PostgreSQL y Seguridad Bcrypt**
   * *Actividades:* Despliegue de esquemas, hash Bcrypt, validación Módulo 11 y abono 50%.
   * *Insumos de la Empresa:* Cuentas bancarias de la institución y credenciales de Supabase Cloud.
5. **Etapa 5: Plataforma LMS Multi-Rol (Aula Virtual y Paneles)**
   * *Actividades:* Paneles de Administrador, Docente, Alumno y Empresa.
   * *Insumos de la Empresa:* Material didáctico en PDF/video, pautas docentes y convenios laborales.
6. **Etapa 6: Auditoría, Trazabilidad SENCE, Calificaciones SPD y Logs**
   * *Actividades:* Módulo de fiscalización, marcas horarias y libro de calificaciones SPD.
   * *Insumos de la Empresa:* Pauta de ponderación 60/40 de Carabineros OS-10 y exigencias SENCE.
7. **Etapa 7: Subsanar Demandas del Cliente o Mandatario (Observaciones Resueltas)**
   * *Demanda 1:* **Regla estricta 1 alumno = 1 curso activo** (subsanada en backend PostgreSQL y frontend).
   * *Demanda 2:* **Flujo especial CCTV con visto bueno, 30 días e historial** (subsanada al 100%).
   * *Demanda 3:* **Gráficos en cada apartado de Auditoría y Live Logs reales** (subsanada al 100%).
   * *Insumos de la Empresa:* Listado formal de observaciones y feedback de la contraparte técnica.
8. **Etapa 8: Control de Calidad, Despliegue y Transferencia Tecnológica**
   * *Actividades:* Pruebas E2E, generación de Carta Gantt en Excel (.xlsx), documentación técnica en Word (.docx) y deploy en Vercel.
   * *Insumos de la Empresa:* Visto bueno final de entrega y confirmación de dominio web.

---

## 7. Archivos Entregables Generados

1. **Carta Gantt Oficial en Excel:**  
   📁 `Carta_Gantt_Desarrollo_PrevySeg_2026.xlsx`  
   *Contiene la programación en días, calendario de Septiembre 2026, columna explícita de "Insumos Necesarios de la Empresa / Mandatario", fase de "Subsanar Demandas del Cliente" y hoja de vinculación a GitHub.*
2. **Documentación Técnica Maestra en Word:**  
   📁 `Documentacion_Tecnica_Maestra_PrevySeg_2026.docx`  
   *Documento ejecutivo formal con tablas de especificación de roles, vistas, arquitectura, base de datos y firma de responsabilidad técnica.*
3. **Documentación Markdown en Repositorio:**  
   📁 `docs/DOCUMENTACION_TECNICA_MAESTRA_PREVYSEG_2026.md`  
   *Archivo legible directamente en el repositorio de GitHub.*
4. **Repositorio Oficial de GitHub:**  
   🔗 [https://github.com/Sebastianaso/PrevySeg2026](https://github.com/Sebastianaso/PrevySeg2026)
