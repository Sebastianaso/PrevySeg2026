# 📍 Diagrama de Navegación y Offset de Scroll

Este diagrama muestra cómo funciona el sistema de anclas con `react-scroll` y compensación de altura del encabezado fijo para asegurar que los títulos de sección nunca queden ocultos debajo del navbar sticky.

```mermaid
graph TD
    subgraph Viewport["🖥️ Pantalla del Usuario"]
        StickyHeader["Fixed Header (Height ~80px-90px)<br/><b>Top: 0 | Z-Index: 50</b>"]
        VisibleContent["Área Visible de Contenido"]
    end

    subgraph MenuLinks["🔗 Enlaces react-scroll"]
        L1["Link: INICIO (to='inicio', offset=-85)"]
        L2["Link: QUIENES SOMOS (to='quienes-somos', offset=-85)"]
        L3["Link: SERVICIOS (to='servicios', offset=-85)"]
        L4["Link: CONTACTO (to='contacto', offset=-85)"]
    end

    subgraph Targets["🎯 Secciones Destino"]
        S1["#inicio<br/><i>(Hero Section)</i>"]
        S2["#quienes-somos<br/><i>(About Us)</i>"]
        S3["#servicios<br/><i>(Programas & Cursos)</i>"]
        S4["#contacto<br/><i>(Footer & Map)</i>"]
    end

    L1 -->|Desplazamiento compensado| S1
    L2 -->|Desplazamiento compensado| S2
    L3 -->|Desplazamiento compensado| S3
    L4 -->|Desplazamiento compensado| S4

    StickyHeader -.->|Superpuesto en top-0| VisibleContent
```
