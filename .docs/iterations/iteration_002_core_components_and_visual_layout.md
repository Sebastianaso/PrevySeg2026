# Iteración 002: Construcción de Componentes Visuales y Replicación Pixel-Perfect

**Fecha:** 2026-09-01  
**Estado:** Completado  
**Tipo:** Feature / UI Design  

---

## 🎯 Objetivo
Desarrollar y modularizar cada uno de los componentes de la interfaz de usuario basados en las capturas de pantalla de referencia del proyecto PrevySeg.

---

## 🛠️ Componentes Construidos

1. **`Header.jsx` & `SocialIcons.jsx`**:
   - Barra superior azul fija con datos de contacto directos (`+56 9 7869 1869`, correo y dirección) e íconos de redes sociales.
   - Navbar principal con logo PrevySeg (*Prevy* en azul, *Seg* en cian), enlaces con `react-scroll`, buscador y botón de *Plataforma Virtual*.
   - Soporte completo para navegación responsiva móvil con menú lateral deslizable.

2. **`Hero.jsx` (#inicio)**:
   - Título principal con tipografía destacada y texto de acreditación SENCE con más de 15 años de experiencia en Arica.
   - Fotografía del grupo de alumnos con diplomas.

3. **`AboutUs.jsx` (#quienes-somos)**:
   - Divisor superior con 3 estrellas (azul, verde y ocre).
   - 3 Columnas circulares para **Misión**, **Visión** y **Valores** con íconos vectoriales SVG.

4. **`Services.jsx` (#servicios)**:
   - Bloque 1: *Programas De Formación* (Tarjetas de Formación Inicial y Perfeccionamiento con viñetas blancas).
   - Bloque 2: *Cursos De Especialización* (Tarjeta amplia de Tecnología y Sistemas de Seguridad).

5. **`ExecutionSection.jsx`**:
   - Dos columnas con lista de checkmarks en color cian (`#00c2b2`), botón *Learn More* e imagen promocional con insignia de liderazgo.

6. **`StatsSection.jsx`**:
   - Franja de contraste claro con 4 métricas numéricas con íconos de respaldo institucional.

7. **`ExperiencesSection.jsx`**:
   - Cuadrícula de 3 tarjetas de blog con metadatos de fecha, categoría y síntesis temática.

8. **`ContactFooter.jsx` (#contacto)**:
   - Separador superior SVG ondulado multicapa.
   - Botón destacado *Envíanos Un Mensaje*.
   - Datos telefónicos y WhatsApp.
   - Iframe interactivo de Google Maps de Arica.
   - Ilustraciones vectoriales personalizadas de buzón con cartas y silueta con globos de diálogo.

---

## 🧪 Pruebas y Validación
- Revisión de consistencia de paleta de colores, márgenes, contraste y tipografía.
- Verificación del comportamiento responsive en pantallas de 375px, 768px, 1024px y 1920px.
