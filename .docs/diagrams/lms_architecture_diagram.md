# 🎓 Diagrama de Arquitectura del LMS (Plataforma Virtual)

Este diagrama detalla la arquitectura de la **Plataforma Virtual (LMS)** de PrevySeg, su compuerta de autenticación estricta con credenciales SENCE y la conexión con el estado dinámico de participantes y endpoints de backend.

```mermaid
flowchart TB
    subgraph Landing["🌐 Sitio Público PrevySeg"]
        NavButton["Botón 'PLATAFORMA VIRTUAL'"]
    end

    subgraph AuthGate["🔐 Compuerta de Acceso & Autenticación"]
        LoginModal["PlatformModal.jsx"]
        Validation{"¿Credenciales Válidas?<br/>15692858-5: 15692858<br/>21778425-5: 21778425"}
        StateAuth["handleLoginSuccess(userData)"]
    end

    subgraph LMSPanel["📊 Panel de Administración LMS (LMSLayout.jsx)"]
        TopNav["Barra Superior Negra (#0f1012)<br/><i>Logo + Enlaces + Notificaciones + Perfil + Switch Modo Edición</i>"]
        SubNav["Submenú Azul (bg-blue-900 / #1e3a8a)<br/><i>Pestañas de Navegación</i>"]

        subgraph LMSViews["📑 Vistas del Sistema"]
            CoursesV["CoursesView.jsx<br/><i>(Catálogo de Cursos SENCE)</i>"]
            SettingsV["SettingsView.jsx<br/><i>(Configuración y Editor TinyMCE)</i>"]
            ParticipantsV["ParticipantsView.jsx<br/><i>(Tabla Dinámica + Filtro A-Z)</i>"]
            ReportsV["ReportsView.jsx<br/><i>(Informes y Auditoría SENCE)</i>"]
            QuestionsV["QuestionBankView.jsx<br/><i>(Banco de Preguntas & Dropzone SCORM)</i>"]
            ContentV["ContentBankView.jsx<br/><i>(Banco de Contenido Didáctico)</i>"]
        end
    end

    subgraph DataLayer["🔌 Capa de Conexión a Base de Datos"]
        HookEffect["useEffect(fetchParticipantes)"]
        DynamicState["useState: [participantes, setParticipantes]"]
        CommentHook["/////AGREGAR BASE DE DATOS/DOMINIO AQUI///"]
        BackendAPI["Endpoint: /api/v1/cursos/participantes"]
    end

    %% Relaciones de flujo
    NavButton --> LoginModal
    LoginModal --> Validation
    Validation -- "No" --> ErrorToast["Alerta de credenciales inválidas"]
    Validation -- "Sí" --> StateAuth
    StateAuth --> LMSPanel
    
    LMSPanel --> TopNav
    LMSPanel --> SubNav
    SubNav --> LMSViews

    ParticipantsV --> DynamicState
    DynamicState --> HookEffect
    HookEffect --> CommentHook
    CommentHook --> BackendAPI
```
