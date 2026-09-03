# 📘 Especificación de Requerimientos de Software (SRS / ERS)
## Ecosistema Digital PrevySeg 2026

**Código Documental:** `ERS-PREVYSEG-2026-V2.0`  
**Organización:** PrevySeg Capacitaciones Ltda. (OTEC Registro SENCE N° 1238088725 • Norma NCh 2728:2015)  
**Estándar de Ingeniería:** ISO/IEC/IEEE 29148:2018 / IEEE Std 830-1998  
**Fecha de Emisión:** Septiembre 2026  
**Estado:** Aprobado para Producción y Certificación de Calidad  

---

## 🗂️ 1. Control de Versiones del Documento

| Versión | Fecha | Autor / Rol | Descripción del Cambio | Aprobador |
| :---: | :---: | :--- | :--- | :---: |
| **v1.0.0** | 01/09/2026 | Equipo Frontend | Levantamiento inicial de requerimientos para portal web y vitrina de cursos. | PM / OTEC |
| **v1.5.0** | 08/09/2026 | Equipo Fullstack | Especificación funcional del Campus Virtual LMS, autenticación con RUT y roles RBAC. | Dir. Académica |
| **v1.9.0** | 15/09/2026 | Ingeniería de Software | Incorporación de Bolsa de Empleo Regional de Arica y Panel de Visto Bueno Administrativo. | Dir. Académica |
| **v2.0.0** | 22/09/2026 | Ingeniero Líder TI | Reescritura formal integral bajo estándar ISO/IEC/IEEE 29148:2018. Depuración a 6 cursos SENCE, despacho automático de diplomas por correo y confidencialidad Ley 19.628. | Dirección OTEC |

---

## 🎯 2. Introducción y Fundamentos de Ingeniería

### 2.1 Propósito
Formalizar, delimitar y describir de manera rigurosa y verificable la totalidad de los requerimientos funcionales, restricciones técnicas y atributos de calidad de la plataforma web corporativa y campus virtual del Organismo Técnico de Capacitación (OTEC) PrevySeg Ltda.

### 2.2 Alcance del Sistema (System Scope)
1. **Portal Web Corporativo:** Vitrina académica oficial con los 6 programas activos autorizados por SENCE y Carabineros OS-10, buscador en tiempo real, matriz informativa de tramos de franquicia tributaria SENCE y cotización vía WhatsApp Business (+56 9 7869 1869).
2. **Núcleo de Autenticación y Control de Acceso (RBAC):** Autenticación con RUT chileno (algoritmo Módulo 11) y segregación de perfiles entre ESTUDIANTE y ADMINISTRADOR.
3. **Campus Virtual LMS (Estudiante):** Área personal con avance porcentual, vista Mis Cursos, bolsa de empleo regional en Arica con postulación directa, cursos de especialización con 15% de descuento y descarga de diplomas oficiales.
4. **Consola de Administración y Despacho (Admin):** Panel de control con 15 categorías desplegables, tabla dinámica de participantes, panel de validación de Visto Bueno administrativo y despacho automático de diplomas en PDF por correo electrónico.

### 2.3 Marco Regulatorio
- **Ley N° 19.518:** Estatuto de Capacitación y Empleo (Franquicia Tributaria SENCE).
- **Decreto Ley N° 3.607 / D.S. N° 93:** Seguridad Privada y acreditaciones OS-10 de Carabineros de Chile.
- **Norma Chilena NCh 2728:2015:** Sistema de Gestión de Calidad para OTEC.
- **Ley N° 19.628:** Protección de la Vida Privada (Confidencialidad absoluta de notas numéricas).

---

## 👥 3. Matriz de Actores y Caracterización de Usuarios

| Actor / Rol | Perfil y Competencias | Responsabilidad en el Sistema |
| :--- | :--- | :--- |
| **Administrador Académico** | Personal OTEC con conocimientos informáticos y normativos. | Auditar cumplimiento, otorgar Visto Bueno, emitir diplomas, gestionar participantes y configurar el LMS. |
| **Estudiante / Guardia OS-10** | Alumno matriculado en cursos de seguridad o especializaciones. | Acceder a contenidos, postular a la bolsa de empleo de Arica y descargar su diploma de idoneidad. |
| **Empresa / Cliente Corporativo** | Encargados de RRHH, capacitación y prevención de riesgos. | Consultar oferta SENCE, revisar tramos de franquicia y solicitar cotizaciones vía WhatsApp. |
| **Público General / Postulante** | Personas naturales interesadas en certificar su credencial OS-10. | Explorar cursos, leer publicaciones técnicas y solicitar matrícula. |

---

## ⚙️ 4. Especificación Detallada de Requerimientos Funcionales (RF)

| Código | Módulo | Nombre | Descripción Técnica | Prioridad | Actor |
| :---: | :--- | :--- | :--- | :---: | :--- |
| **RF-01** | Portal Público | Catálogo Oficial de Cursos SENCE | Despliegue de los 6 programas oficiales activos autorizados con portada, arancel en CLP y categoría. | **Must Have** | Público / Empresas |
| **RF-02** | Portal Público | Filtrado Instantáneo por Área | Segmentación en memoria (React State) por Seguridad Privada, Sistemas Internos y Asistencias. | **Should Have** | Público / Alumnos |
| **RF-03** | Comercial | Cotización Directa por WhatsApp | Envío de datos del formulario directamente a la API de WhatsApp (+56 9 7869 1869). | **Must Have** | Público / Empresas |
| **RF-04** | Normativo | Tramos de Franquicia SENCE | Exposición de los 4 tramos normativos (100% Hasta 25 UTM, 50%, 15% y Pago Directo) sin notas ni precios variables. | **Must Have** | Empresas / RRHH |
| **RF-05** | Búsqueda | Motor de Búsqueda Global | Búsqueda substring en vivo accesible desde la barra superior sobre títulos y códigos SENCE. | **Should Have** | Público General |
| **RF-06** | Blog | Centro de Publicaciones Técnicas | Despliegue de artículos sobre seguridad física y portuaria en modales de lectura extendida. | **Could Have** | Público General |
| **RF-07** | Seguridad | Autenticación Segura y RBAC | Validación de RUT con Módulo 11 y segregación estricta entre rol ADMINISTRADOR y ESTUDIANTE. | **Must Have** | Admin / Alumno |
| **RF-08** | Campus LMS | Dashboard y Área Personal Alumno | Panel con avance porcentual, línea de tiempo, estado de matrícula SENCE y banner de diploma emitido. | **Must Have** | Estudiante |
| **RF-09** | Campus LMS | Vista Centralizada 'Mis Cursos' | Listado individual de cursos matriculados con barra de avance porcentual e inicio de módulos. | **Must Have** | Estudiante |
| **RF-10** | Servicios | Bolsa de Empleo Regional de Arica | Portal exclusivo de ofertas laborales en seguridad con filtros por jornada (Completa, 4x4, Part-Time). | **Should Have** | Estudiante / Egresado |
| **RF-11** | Servicios | Postulación Curricular Directa | Envío de postulación con RUT y perfil acreditado a empresas colaboradoras de Arica. | **Should Have** | Estudiante |
| **RF-12** | Servicios | Capacitaciones Extras con Descuento | Catálogo de especializaciones con 15% de descuento preferencial aplicado para alumnos. | **Could Have** | Estudiante |
| **RF-13** | Certificación | Panel de Visto Bueno Administrativo | Vista para validar requisitos legales, otorgar visto bueno y autorizar emisión de certificados. | **Must Have** | Administrador |
| **RF-14** | Certificación | Despacho Automático por Correo | Envío automático de diploma PDF vía email (`///CORREO REMITENTE///` a `///CORREO DE RECEPCION///`). | **Must Have** | Sistema / Admin |
| **RF-15** | Certificación | Diploma Oficial Digital de Idoneidad | Generación de certificado en PDF con sellos SENCE, QR y sin notas numéricas (Ley 19.628). | **Must Have** | Estudiante / Empresa |
| **RF-16** | Admin | Consola de Administración (15 Cat.) | Panel administrativo completo con 15 categorías desplegables y buscador en vivo. | **Should Have** | Administrador |
| **RF-17** | OTEC Admin | Gestión Dinámica de Participantes | Nómina de estudiantes con filtros SENCE, búsqueda por RUT y exportación de asistencias. | **Must Have** | Administrador / SENCE |

---

## 🛡️ 5. Especificación de Requerimientos No Funcionales (RNF - ISO/IEC 25010)

| Código | Categoría ISO 25010 | Descripción y Criterio de Calidad | Métrica de Aceptación |
| :---: | :--- | :--- | :--- |
| **RNF-01** | Eficiencia de Desempeño | Tiempo de carga inicial (FCP) inferior a 1.5s y TTFB < 200ms en redes estándar. | FCP ≤ 1.5s \| TTFB ≤ 200ms |
| **RNF-02** | Confiabilidad | Disponibilidad operacional ininterrumpida del 99.8% mensual (24/7/365). | Uptime ≥ 99.8% (SLA) |
| **RNF-03** | Seguridad & Privacidad | Confidencialidad estricta Ley N° 19.628. Cero exposición de notas numéricas en diplomas. | 0% notas en certificados |
| **RNF-04** | Seguridad (RBAC) | Aislamiento 100% de rutas administrativas mediante guardas de navegación. | 100% rutas protegidas |
| **RNF-05** | Usabilidad (UI/UX) | Diseño responsivo adaptativo (desde 360px a 4K) con contraste WCAG 2.1 Nivel AA. | Contraste ≥ 4.5:1 \| Mobile First |
| **RNF-06** | Compatibilidad | Renderizado uniforme en Chrome, Firefox, Edge, Safari y Opera (escritorio y móvil). | 100% navegadores estándar |
| **RNF-07** | Normativa SENCE | Cumplimiento estricto de trazabilidad y auditoría bajo la Norma NCh 2728:2015. | Auditoría SENCE 100% conforme |
| **RNF-08** | Legal OS-10 | Ajuste de programas de seguridad al Decreto Ley N° 3.607 de Carabineros de Chile. | 100% programas oficiales OS-10 |
| **RNF-09** | Mantenibilidad | Arquitectura modular desacoplada en React 19 con 0 advertencias de linting. | Código desacoplado sin lints |
| **RNF-10** | Interoperabilidad | Despacho de correo desacoplado con marcadores `///CORREO REMITENTE///` y `///CORREO DE RECEPCION///`. | Compatibilidad SMTP / Webhook |
| **RNF-11** | Portabilidad | Generación de diplomas en formato vectorial estándar PDF/A imprimibles a 300 DPI. | PDF vectorial de alta fidelidad |
| **RNF-12** | Gestión de Cambios | Versionamiento en Git con commits descriptivos en español vinculados a la Carta Gantt. | Trazabilidad 100% en GitHub |
| **RNF-13** | Integridad de Datos | Validación y sanitización estricta de todos los formularios contra ataques XSS. | 0 vulnerabilidades de inyección |
| **RNF-14** | Tolerancia a Fallos | Captura de excepciones en tiempo de ejecución con React Error Boundaries. | 0 pantallas blancas en errores |

---

## 🔗 6. Matriz de Trazabilidad de Requerimientos (RTM)

| Requerimiento | Módulo del Sistema | Componente / Archivo en Repositorio | Verificación |
| :--- | :--- | :--- | :--- |
| **RF-01, RF-02** | Portal Público | [`src/components/Services.jsx`](file:///c:/Users/ashle/OneDrive/Escritorio/prevyseg/src/components/Services.jsx) | Inspección visual y prueba de filtros |
| **RF-03** | Comercial | [`src/components/ContactFooter.jsx`](file:///c:/Users/ashle/OneDrive/Escritorio/prevyseg/src/components/ContactFooter.jsx), [`src/components/Modals.jsx`](file:///c:/Users/ashle/OneDrive/Escritorio/prevyseg/src/components/Modals.jsx) | Prueba de enlace URI WhatsApp |
| **RF-04** | Franquicia SENCE | [`src/components/SenceTramosSection.jsx`](file:///c:/Users/ashle/OneDrive/Escritorio/prevyseg/src/components/SenceTramosSection.jsx) | Verificación de 4 tramos normativos |
| **RF-07** | Seguridad / RBAC | [`src/lms/LMSLayout.jsx`](file:///c:/Users/ashle/OneDrive/Escritorio/prevyseg/src/lms/LMSLayout.jsx), [`src/components/Modals.jsx`](file:///c:/Users/ashle/OneDrive/Escritorio/prevyseg/src/components/Modals.jsx) | Prueba de control de acceso por roles |
| **RF-08, RF-09** | Campus Alumno | [`src/lms/views/PersonalAreaView.jsx`](file:///c:/Users/ashle/OneDrive/Escritorio/prevyseg/src/lms/views/PersonalAreaView.jsx), [`src/lms/views/MyCoursesView.jsx`](file:///c:/Users/ashle/OneDrive/Escritorio/prevyseg/src/lms/views/MyCoursesView.jsx) | Prueba de cálculo de avance curricular |
| **RF-10, RF-11** | Bolsa de Empleo | [`src/lms/views/JobBoardView.jsx`](file:///c:/Users/ashle/OneDrive/Escritorio/prevyseg/src/lms/views/JobBoardView.jsx) | Prueba de postulación laboral |
| **RF-13, RF-14** | Certificación Admin | [`src/lms/views/CertificateApprovalView.jsx`](file:///c:/Users/ashle/OneDrive/Escritorio/prevyseg/src/lms/views/CertificateApprovalView.jsx) | Prueba de Visto Bueno y despacho email |
| **RF-15** | Diploma Oficial | [`src/lms/views/CertificateApprovalView.jsx`](file:///c:/Users/ashle/OneDrive/Escritorio/prevyseg/src/lms/views/CertificateApprovalView.jsx) | Auditoría de confidencialidad sin notas |
| **RF-16, RF-17** | Administración Sitio | [`src/lms/views/SiteAdminView.jsx`](file:///c:/Users/ashle/OneDrive/Escritorio/prevyseg/src/lms/views/SiteAdminView.jsx) | Prueba de 15 categorías y participantes |

---

## ✍️ 7. Cuadro Formal de Validación y Firmas de Ingeniería

| Cargo / Responsabilidad | Nombre y Profesión | Fecha y Estado |
| :--- | :--- | :---: |
| **Ingeniero Líder de Software / TI** | **Sebastián Araya** — Ingeniería en Informática | Septiembre 2026<br>✅ **[APROBADO TÉCNICAMENTE]** |
| **Director Académico PrevySeg** | **Ashley Adaros** — Dirección OTEC PrevySeg | Septiembre 2026<br>✅ **[APROBADO INSTITUCIONAL]** |
| **Comité de Calidad NCh 2728 / SENCE** | **Aseguramiento de Calidad OTEC** | Septiembre 2026<br>✅ **[CONFORME AUDITORÍA]** |
