# 🔄 Diagrama de Flujo de Interacción del Usuario

Este diagrama de secuencia ilustra el flujo de interacciones, eventos de click, activación de modales y retroalimentación interactiva dentro de la aplicación.

```mermaid
sequenceDiagram
    autonumber
    actor User as 👤 Usuario / Alumno
    participant Nav as 🧭 Header / Barra de Navegación
    participant Page as 📄 Secciones de la Página
    participant AppState as ⚡ Estado App.jsx
    participant Modal as 💬 Capa de Modales
    participant Canvas as 🌌 Canvas Nodos

    Note over User,Canvas: Carga inicial de la aplicación
    Canvas->>Canvas: Animación continua de partículas y conexiones
    
    %% Caso 1: Scroll Navegación
    User->>Nav: Click en enlace de menú ("SERVICIOS")
    Nav->>Page: react-scroll desplaza con animación suave (-85px offset)
    Page-->>User: Visualización exacta del título sin solapamiento
    
    %% Caso 2: Plataforma Virtual
    User->>Nav: Click en "PLATAFORMA VIRTUAL"
    Nav->>AppState: setIsPlatformOpen(true)
    AppState->>Modal: Renderiza PlatformModal
    User->>Modal: Ingresa RUT y Contraseña
    Modal-->>User: Validación y confirmación de credenciales SENCE
    User->>Modal: Click en "Cerrar"
    Modal->>AppState: setIsPlatformOpen(false)

    %% Caso 3: Consulta y Contacto
    User->>Page: Click en "Envíanos Un Mensaje" / "Solicitar Información"
    Page->>AppState: handleOpenContactWithCourse("Nombre del Curso")
    AppState->>Modal: Renderiza ContactModal con curso pre-seleccionado
    User->>Modal: Completa formulario y envía
    Modal-->>User: Muestra feedback de éxito con animación de confirmación
    Modal->>AppState: Cierre automático tras 2.8s

    %% Caso 4: Retorno arriba
    User->>Page: Scroll hacia abajo (>300px)
    Page->>AppState: Muestra botón flotante ScrollToTop
    User->>Page: Click en botón flotante
    Page->>Page: animateScroll.scrollToTop()
```
