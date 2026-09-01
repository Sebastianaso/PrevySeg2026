# 🛡️ Diagrama de Control de Acceso Basado en Roles (RBAC)

Este diagrama modela la separación de privilegios, vistas y flujos de datos entre el rol **ADMIN** y el rol **STUDENT** en la Plataforma Virtual PrevySeg.

```mermaid
flowchart TD
    Login["Compuerta de Login (PlatformModal.jsx)"]
    
    subgraph AuthLogic["Validación de RUT y Asignación de Roles"]
        CheckUser{"RUT Ingresado"}
        Admin1["15692858-5 / 15692858-8<br/><b>Ashley Adaros</b>"]
        Admin2["21778425-5<br/><b>Sebastián Araya</b>"]
        Student1["21778425-6<br/><b>Matías Silva (Persona Natural)</b>"]
    end

    CheckUser -->|15692858-5| Admin1
    CheckUser -->|21778425-5| Admin2
    CheckUser -->|21778425-6| Student1

    Admin1 --> RoleAdmin["Rol: ADMIN (Superusuario / Docente)"]
    Admin2 --> RoleAdmin
    Student1 --> RoleStudent["Rol: STUDENT (Estudiante)"]

    subgraph AdminExperience["Experiencia y Rutas de Administrador"]
        AdminNav["Menú Superior Completo:<br/>• Página Principal<br/>• Área personal<br/>• Mis cursos<br/>• Administración<br/>• Administración del sitio"]
        AdminViews["Vistas:<br/>• CoursesView (Catálogo SENCE)<br/>• SettingsView (Editor TinyMCE)<br/>• ParticipantsView (Tabla A-Z con endpoint)<br/>• ReportsView (Informes SENCE)<br/>• QuestionBankView (Dropzone SCORM)<br/>• ContentBankView (H5P)<br/>• SiteAdminView (15 Módulos Expandibles)"]
        EditSwitch["Switch Modo de Edición: HABILITADO"]
    end

    subgraph StudentExperience["Experiencia y Rutas de Estudiante"]
        StudentNav["Menú Superior Exclusivo Alumno:<br/>• Área personal<br/>• Mis cursos<br/>• 🎓 Capacitaciones Extras<br/>• 💼 Bolsa de empleo"]
        StudentViews["Vistas Especializadas:<br/>• PersonalAreaView (Timeline & Empty state)<br/>• MyCoursesView (Progreso del alumno)<br/>• ExtraCoursesView (Grid cursos con precios CLP)<br/>• JobBoardView (Filtros turno/zona + badge PrevySeg)"]
        SecurityBlock["Bloqueo Automático a Configuración y Administración"]
    end

    RoleAdmin --> AdminNav --> AdminViews
    AdminNav --> EditSwitch

    RoleStudent --> StudentNav --> StudentViews
    RoleStudent -.-> SecurityBlock

    subgraph BackendEndpoints["🔌 Endpoints con Comentario /////AGREGAR BASE DE DATOS/DOMINIO AQUI///"]
        EP1["Participantes: /api/v1/cursos/participantes"]
        EP2["Capacitaciones Extras: /api/v1/capacitaciones-extras"]
        EP3["Bolsa de Empleo: /api/v1/bolsa-empleo/ofertas"]
    end

    AdminViews --> EP1
    StudentViews --> EP2
    StudentViews --> EP3
```
