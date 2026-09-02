# Iteración 010: Integración del Catálogo Oficial de 11 Cursos SENCE en Inicio y Aula Virtual

**Fecha:** 2026-09-02  
**Estado:** Completado / Desplegado  
**Tipo:** Feature / Catálogo Académico & LMS  

---

## 🎯 Objetivo
Actualizar la oferta formativa pública y de la plataforma de estudiantes (LMS) incorporando los 11 cursos oficiales de las plataformas autorizadas por SENCE y OS-10 de Carabineros, manteniendo el formato visual limpio sin descripciones extensas, con portadas temáticas (fotográficas y patrones geométricos Moodle) y con precios destacados en el pie de cada tarjeta.

---

## 🛠️ Implementaciones Realizadas

### 1. Actualización de Catálogo Público (`src/components/Services.jsx`)
- Incorporación de los 11 programas oficiales:
  1. `_2_66_2026 - Resolución de Conflictos y Manejo de Situaciones Difíciles Código Sence: 1238088725 - Registro Único Sence: 6750652` ($85.000 CLP)
  2. `1_65_2025 - Resolución de Conflictos y Manejo de Situaciones Difíciles Código Sence: 1238088725 - Código Curso: 6745745` ($85.000 CLP)
  3. `(código 1-56) Operador de Central de Cámaras de Televigilancia. C.C.T.V.` ($140.000 CLP)
  4. `Técnicas De Operación De Circuitos Cerrados De Televisión - Código SENCE : 1238087964` ($130.000 CLP)
  5. `Curso de formación Guardia de Seguridad online` ($120.000 CLP)
  6. `Formación de Supervisor de Seguridad Privada` ($180.000 CLP)
  7. `Curso de Supervisor de Seguridad Marítimo Portuario` ($195.000 CLP)
  8. `TECNICAS DEL MANEJO DEL GANADO DE CAMÉLIDOS SUDAMERICANOS` ($95.000 CLP)
  9. `Capacitación ITIC` ($75.000 CLP)
  10. `_1 Asistencia Curso - Código Sence: 1238087964 ID Acción: 6731273` ($60.000 CLP)
  11. `Original - Resolución de Conflictos y Manejo de Situaciones Difíciles` ($85.000 CLP)
- Filtros por categoría: *Seguridad Privada, Agrícola, Sistemas internos, Asistencias, Originales*.
- Botón de acción directa con vinculación al formulario de WhatsApp.

### 2. Sincronización en el Campus Virtual LMS (`src/lms/views/ExtraCoursesView.jsx` y `src/lms/views/CoursesView.jsx`)
- Mismo catálogo oficial disponible para los alumnos con su modalidad, carga horaria, arancel preferencial y código SENCE.
- Modal interactivo de postulación y matrícula directa.

### 3. Sincronización en Modales de Búsqueda y Contacto (`src/components/Modals.jsx`)
- `ContactModal` y `SearchModal` actualizados con los 11 cursos para auto-completado y cotización directa.

### 4. Generación de Carta Gantt en Excel (`Carta_Gantt_PrevySeg_2026.xlsx`)
- Planificación a 1 mes con todas las fases, hitos, changelog de versiones e iteraciones con gráficos de Gantt interactivos.

---

## 🧪 Validación y Pruebas
- `npm run build`: Compilación limpia en 356ms con 0 errores.
- Rutas públicas y privadas probadas en entorno local.
