# 📚 Documentación del Proyecto PrevySeg (.docs)

Bienvenido a la carpeta central de documentación del proyecto **PrevySeg** (Organismo Técnico de Capacitación).
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
│   └── routing_and_scroll_diagram.md      # Flujo de scroll suave y anclajes con offset
└── iterations/                            # Registro cronológico de iteraciones y updates
    ├── iteration_001_initial_scaffolding_and_setup.md
    ├── iteration_002_core_components_and_visual_layout.md
    ├── iteration_003_interactivity_modals_and_canvas.md
    └── iteration_004_git_setup_and_docs_structure.md
```

---

## 📐 Índice de Diagramas Mermaid

1. [Diagrama de Arquitectura](./diagrams/architecture_diagram.md): Vista global de capas (Presentación, Estilos, Iconografía, Lógica de Modales, Assets).
2. [Jerarquía de Componentes](./diagrams/component_hierarchy_diagram.md): Estructura del árbol React desde `App` hasta los componentes atómicos.
3. [Flujo de Interacción](./diagrams/interaction_flow_diagram.md): Eventos del usuario, triggers de modales y retroalimentación.
4. [Navegación y Scroll](./diagrams/routing_and_scroll_diagram.md): Comportamiento de `react-scroll` con offset negativo `-85px`.

---

## 📝 Registro Histórico de Iteraciones

| Iteración | Título | Fecha | Descripción |
|---|---|---|---|
| **001** | [Scaffolding Inicial y Configuración](./iterations/iteration_001_initial_scaffolding_and_setup.md) | 2026-09-01 | Configuración de Vite, React 19, Tailwind CSS v4, fuentes y assets. |
| **002** | [Componentes Visuales y Replicación Pixel-Perfect](./iterations/iteration_002_core_components_and_visual_layout.md) | 2026-09-01 | Construcción de Header, Hero, Quiénes Somos, Servicios, Ejecución, Estadísticas y Footer. |
| **003** | [Interactividad, Modales y Canvas](./iterations/iteration_003_interactivity_modals_and_canvas.md) | 2026-09-01 | Fondo de nodos interactivo, modales de plataforma virtual, contacto y buscador. |
| **004** | [Control de Versiones y Documentación](./iterations/iteration_004_git_setup_and_docs_structure.md) | 2026-09-01 | Creación de `.docs`, diagramas Mermaid y push al repositorio remoto en GitHub. |

---

## 📌 Guía para Futuras Iteraciones

Para registrar futuras actualizaciones:
1. Crear un nuevo archivo en `.docs/iterations/` con la nomenclatura `iteration_XXX_nombre_descriptivo.md`.
2. Incluir:
   - **Objetivo del cambio**.
   - **Archivos modificados o agregados**.
   - **Detalles técnicos de la implementación**.
   - **Validación y pruebas realizadas**.
3. Si el cambio altera la arquitectura o interacción, actualizar o agregar los diagramas correspondientes en `.docs/diagrams/`.
4. Actualizar la tabla de iteraciones en este `README.md`.
