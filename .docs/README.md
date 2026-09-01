# 📚 Documentación del Proyecto PrevySeg (.docs)

Bienvenido a la carpeta central de documentación del proyecto **PrevySeg** (Organismo Técnico de Capacitación y Plataforma Virtual LMS).
Este directorio almacena el registro histórico de todas las iteraciones, actualizaciones técnicas, diagramas de arquitectura y flujos de interacción del sistema.

---

## 🗂️ Estructura del Directorio

```text
.docs/
├── README.md                              # Índice general de documentación y estándares
├── diagrams/                              # Diagramas de arquitectura y flujos en Mermaid
│   ├── architecture_diagram.md            # Diagrama de arquitectura de software y stack
│   ├── component_hierarchy_diagram.md     # Jerarquía del árbol de componentes de React
│   ├── interaction_flow_diagram.md        # Flujos de interacción del usuario y modales
│   ├── routing_and_scroll_diagram.md      # Flujo de scroll suave y anclajes con offset
│   ├── lms_architecture_diagram.md        # Arquitectura del LMS y flujo de datos SENCE
│   └── rbac_roles_diagram.md              # Matriz de roles RBAC (Admin vs Student)
└── iterations/                            # Registro cronológico de iteraciones y updates
    ├── iteration_001_initial_scaffolding_and_setup.md
    ├── iteration_002_core_components_and_visual_layout.md
    ├── iteration_003_interactivity_modals_and_canvas.md
    ├── iteration_004_git_setup_and_docs_structure.md
    ├── iteration_005_lms_virtual_platform_implementation.md
    ├── iteration_006_personal_area_my_courses_and_admin_views.md
    ├── iteration_007_site_administration_and_role_security.md
    ├── iteration_008_rbac_roles_extra_courses_and_job_board.md
    └── iteration_009_whatsapp_direct_contact_integration.md
```

---

## 📐 Índice de Diagramas Mermaid

1. [Diagrama de Arquitectura](./diagrams/architecture_diagram.md): Vista global de capas frontend de la landing page.
2. [Jerarquía de Componentes](./diagrams/component_hierarchy_diagram.md): Estructura del árbol React desde `App` hasta componentes visuales.
3. [Flujo de Interacción](./diagrams/interaction_flow_diagram.md): Eventos del usuario, triggers de modales y retroalimentación.
4. [Navegación y Scroll](./diagrams/routing_and_scroll_diagram.md): Comportamiento de `react-scroll` con offset negativo `-85px`.
5. [Arquitectura del LMS](./diagrams/lms_architecture_diagram.md): Arquitectura de la Plataforma Virtual, compuerta de autenticación y capas de datos.
6. [Matriz de Roles RBAC](./diagrams/rbac_roles_diagram.md): Control de acceso por roles (ADMIN vs STUDENT) y segregación de rutas.

---

## 📝 Registro Histórico de Iteraciones

| Iteración | Título | Fecha | Descripción |
|---|---|---|---|
| **001** | [Scaffolding Inicial y Configuración](./iterations/iteration_001_initial_scaffolding_and_setup.md) | 2026-09-01 | Configuración de Vite, React 19, Tailwind CSS v4, fuentes y assets. |
| **002** | [Componentes Visuales y Replicación](./iterations/iteration_002_core_components_and_visual_layout.md) | 2026-09-01 | Construcción de Header, Hero, Quiénes Somos, Servicios, Ejecución, Estadísticas y Footer. |
| **003** | [Interactividad, Modales y Canvas](./iterations/iteration_003_interactivity_modals_and_canvas.md) | 2026-09-01 | Fondo de nodos interactivo, modales de plataforma virtual, contacto y buscador. |
| **004** | [Control de Versiones y Documentación](./iterations/iteration_004_git_setup_and_docs_structure.md) | 2026-09-01 | Creación de `.docs`, diagramas Mermaid y push al repositorio remoto en GitHub. |
| **005** | [Plataforma Virtual (LMS) y Conexión de Datos](./iterations/iteration_005_lms_virtual_platform_implementation.md) | 2026-09-01 | Implementación del LMS Moodle-like, autenticación estricta, vistas, TinyMCE y tabla de participantes dinámica. |
| **006** | [Área Personal, Mis Cursos y Administración](./iterations/iteration_006_personal_area_my_courses_and_admin_views.md) | 2026-09-01 | Vistas especializadas de Área Personal (timeline y empty state), Mis Cursos (vista general y tarjetas con patrón azul) y pestaña Administración. |
| **007** | [Administración del Sitio Completa y Seguridad por Roles](./iterations/iteration_007_site_administration_and_role_security.md) | 2026-09-01 | Réplica exhaustiva de las 15 categorías de Administración del sitio con cajas expandibles, buscador en vivo y restricción exclusiva para administradores. |
| **008** | [Control de Roles RBAC, Capacitaciones Extras y Bolsa de Empleo](./iterations/iteration_008_rbac_roles_extra_courses_and_job_board.md) | 2026-09-01 | Separación dinámica de perfiles ADMIN y STUDENT (21778425-6), catálogo de capacitaciones con precios CLP y días, y bolsa laboral estilo BNE con filtros. |
| **009** | [Integración Directa con WhatsApp Oficial](./iterations/iteration_009_whatsapp_direct_contact_integration.md) | 2026-09-01 | Conexión del modal "Envíanos Un Mensaje" para transferir automáticamente el formulario completo al WhatsApp +56 9 7869 1869. |

---

## 📌 Guía para Futuras Iteraciones

Para registrar futuras actualizaciones:
1. Crear un nuevo archivo en `.docs/iterations/` con la nomenclatura `iteration_XXX_nombre_descriptivo.md`.
2. Incluir objetivo, archivos modificados, detalles técnicos y validación.
3. Actualizar la tabla de iteraciones en este `README.md`.
