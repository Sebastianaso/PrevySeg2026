# Iteración 008: Control de Acceso por Roles (RBAC), Capacitaciones Extras y Bolsa de Empleo

**Fecha:** 2026-09-01  
**Estado:** Completado  
**Tipo:** Full Stack / Feature LMS / RBAC  

---

## 🎯 Objetivo
Implementar un sistema integral de **Control de Acceso Basado en Roles (RBAC)** en el frontend, adaptando dinámicamente la navegación y las vistas disponibles entre el perfil **ADMIN** y el perfil **STUDENT**, e integrando dos nuevas vistas formativas y laborales para los alumnos: **Capacitaciones Extras** (catálogo de cursos con precios en CLP y días de cursada) y **Bolsa de Empleo** (estilo BNE con filtros avanzados y badge de certificación PrevySeg).

---

## 🛠️ Implementaciones Realizadas

### 1. Autenticación y Matriz de Roles (`PlatformModal.jsx` y `LMSLayout.jsx`)
- **Usuarios Administradores (`rol: ADMIN`):**
  - `15692858-5` | Pass: `15692858` (*Ashley Adaros Guzmán*)
  - `21778425-5` | Pass: `21778425` (*Sebastián Araya Cortés*)
  - *Menú habilitado:* Página Principal, Área personal, Mis cursos, Administración, Administración del sitio y Switch de Modo de edición.
- **Usuario Estudiante (`rol: STUDENT`):**
  - `21778425-6` | Pass: `21778425` o libre (*Matías Silva Lagos - Persona Natural*)
  - *Menú exclusivo:* **Área personal**, **Mis cursos**, **Capacitaciones Extras** y **Bolsa de empleo**.
  - Ocultamiento y bloqueo estricto ante cualquier intento de acceso a módulos administrativos.

### 2. Nueva Vista: Capacitaciones / Certificaciones Extras (`ExtraCoursesView.jsx`)
- Cuadrícula (Grid) interactiva de diplomados y certificaciones complementarias.
- Metadatos por tarjeta:
  - Título y descripción curricular.
  - **Precio formateado en CLP** (ej. *$150.000 CLP*, *$180.000 CLP*).
  - **Días de la semana** (ej. *Lunes y Miércoles*, *Martes y Jueves*, *Sábados Intensivo*).
  - **Fechas de inicio y término** con total de horas cronológicas.
  - Botones *"Inscribirse"* y *"Ver Detalles"* con modal de postulación rápida y métodos de financiamiento (Franquicia SENCE, Webpay, Beca Egresado).
- **Instrucción de Base de Datos:**
  - `useState` y `useEffect` con el comentario requerido: `/////AGREGAR BASE DE DATOS/DOMINIO AQUI///`.

### 3. Nueva Vista: Bolsa de Empleo (`JobBoardView.jsx`)
- Plataforma laboral exclusiva estilo BNE (Bolsa Nacional de Empleo) para el rubro de seguridad privada en la Región de Arica y Parinacota.
- **Barra Lateral Izquierda:** Filtros por tipo de guardia (OS-10, CCTV, Marítimo Portuario, Vigilante, Supervisor), turnos (4x4, 5x2, 6x1, 7x7) y ubicación.
- **Columna Principal de Ofertas:**
  - Tarjetas con Cargo, Empresa empleadora, Renta ofrecida líquida y detalles de la vacante.
  - **Badge Verde:** `"Requiere Certificación PrevySeg"`.
  - Botón interactivo *"Postular con mi Perfil PrevySeg"* con modal de envío de antecedentes y certificados.
- **Instrucción de Base de Datos:**
  - `useState` y `useEffect` con el comentario requerido: `/////AGREGAR BASE DE DATOS/DOMINIO AQUI///`.

---

## 🧪 Validación y Pruebas
- Validación de Login y segregación de menús:
  - Ingreso con `15692858-5` -> Menú Admin completo visible.
  - Ingreso con `21778425-6` -> Menú Student restringido con Capacitaciones Extras y Bolsa de Empleo.
- Build de producción: `npm run build` ejecutado en 335ms sin advertencias.
