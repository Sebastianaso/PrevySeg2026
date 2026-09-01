# 🏛️ Diagrama de Arquitectura de Software

Este diagrama detalla la arquitectura del sistema frontend de **PrevySeg**, ilustrando la interacción entre la capa de presentación en React, la biblioteca de estilos Tailwind CSS, los motores de navegación, la lógica de modales y los recursos estáticos.

```mermaid
flowchart TB
    subgraph Client["🖥️ Navegador Web del Cliente"]
        DOM["DOM / HTML5 Canvas"]
    end

    subgraph AppCore["⚛️ Capa de Aplicación React (Vite)"]
        Main["main.jsx"]
        App["App.jsx (Estado Global de Modales)"]
        
        subgraph Components["🧩 Componentes Modulares"]
            HeaderComp["Header.jsx (TopBar + Navbar)"]
            HeroComp["Hero.jsx (#inicio)"]
            AboutComp["AboutUs.jsx (#quienes-somos)"]
            ServicesComp["Services.jsx (#servicios)"]
            ExecComp["ExecutionSection.jsx"]
            StatsComp["StatsSection.jsx"]
            ExpComp["ExperiencesSection.jsx"]
            FooterComp["ContactFooter.jsx (#contacto)"]
            NetCanvas["NetworkBackground.jsx (Canvas Node Network)"]
            ScrollTop["ScrollToTop.jsx (Sticky Action)"]
        end

        subgraph ModalsLayer["💬 Capa de Diálogos y Modales"]
            ContactMod["ContactModal (Formulario / SENCE)"]
            PlatformMod["PlatformModal (Aula Virtual Alumno)"]
            SearchMod["SearchModal (Filtro Reactivo de Cursos)"]
            ArticleMod["ArticleModal (Lector de Noticias)"]
        end
    end

    subgraph StylingAndAssets["🎨 Estilos, Fuentes e Iconografía"]
        TailwindCSS["Tailwind CSS v4 (@tailwindcss/vite)"]
        IndexCSS["index.css (Tokens, Glassmorphism, Keyframes)"]
        GoogleFonts["Google Fonts (Montserrat & Inter)"]
        LucideIcons["Lucide React Icons"]
        SocialSVG["SocialIcons.jsx (Custom SVG)"]
        ImagesDir["Assets / Images (WebP / JPG Optimizados)"]
    end

    subgraph NavigationLayer["🧭 Capa de Navegación y Scroll"]
        ReactScroll["react-scroll (ScrollLink con offset -85px)"]
        GoogleMaps["Google Maps Iframe (Arica, Chile)"]
    end

    %% Relaciones
    Main --> App
    App --> Components
    App --> ModalsLayer
    Components --> StylingAndAssets
    Components --> NavigationLayer
    NetCanvas --> DOM
    AppCore --> DOM
```
