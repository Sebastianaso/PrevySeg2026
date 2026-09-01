# Iteración 005: Construcción de la Plataforma Virtual (LMS) y Conexión de Datos

**Fecha:** 2026-09-01  
**Estado:** Completado  
**Tipo:** Full Stack / Feature LMS  

---

## 🎯 Objetivo
Construir e integrar la **Plataforma Virtual (tipo LMS/Moodle)** conectada al frontend de PrevySeg, incluyendo la compuerta de acceso con autenticación estricta, layout con barra superior negra y submenú azul (`bg-blue-900`), vistas especializadas para administración de cursos, configuración con simulador TinyMCE, informes SENCE, banco de preguntas con filtros condicionales y tabla dinámica de participantes preparada para backend real.

---

## 🛠️ Implementaciones Realizadas

### 1. Puerta de Acceso (Login con Validación Estricta)
- Modificación de `PlatformModal.jsx` para autenticación con credenciales específicas:
  - **Usuario 1:** `15692858-5` | **Contraseña:** `15692858` (*Ashley Adaros Guzmán - Administrador / Instructor SENCE*).
  - **Usuario 2:** `21778425-5` | **Contraseña:** `21778425` (*Sebastián Araya Cortés - Docente / Supervisor OS-10*).
- Redirección automática al panel de administración LMS tras el inicio de sesión exitoso.

### 2. Estructura General del Panel (`LMSLayout.jsx`)
- **Barra Superior (Top Bar en fondo negro `#0f1012`)**:
  - Logo oficial PrevySeg con distintivo de LMS Virtual.
  - Enlaces: *Página Principal*, *Área personal*, *Mis cursos*, *Administración del sitio*.
  - Controles a la derecha: Campana de notificaciones con badge, mensajería interna, avatar de usuario con iniciales y menú desplegable, y switch reactivo de **Modo de edición** con ícono de lápiz.
- **Submenú Azul (`bg-blue-900` / `#1e3a8a`)**:
  - Pestañas activas: *Página Principal*, *Configuración*, *Participantes*, *Informes*, *Banco de preguntas*, *Banco de contenido*.

### 3. Vistas Especializadas
- **Página Principal de Cursos (`CoursesView.jsx`)**: Cuadrícula de tarjetas de cursos con patrones visuales, etiquetas azules de categoría, códigos SENCE y registros OTEC.
- **Configuración (`SettingsView.jsx`)**: Formulario con etiquetas a la izquierda e inputs a la derecha, selectores desplegables y simulador de editor enriquecido **TinyMCE** con toolbar completa.
- **Informes (`ReportsView.jsx`)**: Tarjeta con fondo oscuro y lista vertical de enlaces en color azul claro para marcas horarias SENCE, libro de calificaciones y registros en vivo.
- **Banco de Preguntas (`QuestionBankView.jsx`)**: Interfaz de búsqueda avanzada con selectores condicionales (*"Coincidir Cualquiera"* / *"Todas"*), filtros por categoría/tipo y área Drag & Drop para paquetes SCORM/XML.
- **Banco de Contenido (`ContentBankView.jsx`)**: Biblioteca de recursos H5P, PDFs normativos y videos didácticos.

### 4. Tabla de Participantes y Preparación de Backend (`ParticipantsView.jsx`)
- Tabla dinámica de alumnos con:
  - Estado: `const [participantes, setParticipantes] = useState([])`.
  - `useEffect` para fetch con latencia simulada.
  - Comentario crítico insertado en la lógica y endpoints:
    `/////AGREGAR BASE DE DATOS/DOMINIO AQUI///`
  - Buscador por nombre/RUT/email, filtro alfabético A-Z, badges de roles, grupos y último acceso.
  - Modal para matricular nuevos alumnos y exportación.

---

## 🧪 Validación y Pruebas
- Validación de build: `npm run build` completado con éxito en 660ms sin advertencias.
- Validación de flujo de login: comprobadas ambas credenciales válidas y bloqueo ante credenciales erróneas.
- Prueba de cambio entre pestañas del submenú azul y switch de modo de edición.
