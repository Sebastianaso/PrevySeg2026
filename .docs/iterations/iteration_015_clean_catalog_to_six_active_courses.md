# Iteración 015: Depuración del Catálogo a los 6 Cursos Activos

**Fecha:** 2026-09-02  
**Estado:** Completado / Desplegado  
**Tipo:** Refinamiento de Oferta Académica / Catálogo  

---

## 🎯 Objetivo
Depurar el catálogo general de cursos en la plataforma pública y el campus virtual LMS, eliminando definitivamente los cursos comentados o descartados, dejando exclusivamente los **6 cursos activos autorizados**.

---

## 📚 Lista de los 6 Cursos Activos

1. **`_2_66_2026 Resolución de Conflictos y Manejo de Situaciones Difíciles Código Sence: 1238088725`**
   - Categoría: *Seguridad Privada* | Arancel: `$85.000 CLP` (*o Franquicia SENCE 100%*)

2. **`Operador de Central de Cámaras de Televigilancia. C.C.T.V.`**
   - Categoría: *Seguridad Privada* | Arancel: `$140.000 CLP` (*Certificación Oficial OS-10*)

3. **`Curso de formación Guardia de Seguridad`**
   - Categoría: *Seguridad Privada* | Arancel: `$120.000 CLP` (*Acreditado OS-10 de Carabineros*)

4. **`Formación de Supervisor de Seguridad Privada *ONLINE*`**
   - Categoría: *Seguridad Privada* | Arancel: `$180.000 CLP` (*Nivel Superior y Gestión OS-10*)

5. **`Capacitación ITIC`**
   - Categoría: *Sistemas internos* | Arancel: `$75.000 CLP` (*Tecnologías de Información*)

6. **`Asistencia Curso - Código Sence: 1238087964 ID Acción: 6731273`**
   - Categoría: *Asistencias* | Arancel: `$60.000 CLP` (*Módulo de Registro y Control*)

---

## 🛠️ Archivos Actualizados
- `src/components/Services.jsx` (`COURSES_DATA` y categorías depuradas).
- `src/components/Modals.jsx` (`SearchModal` y `ContactModal` sincronizados).
- `src/lms/views/ExtraCoursesView.jsx` (`EXTRA_COURSES_DATA` depurado a los 6 programas).
- `src/lms/views/CertificateApprovalView.jsx` (Alineación de cursos de alumnos).
- `scripts/generate_requirements_doc.cjs` y `Requerimientos_Funcionales_y_No_Funcionales_PrevySeg.docx`.
- `Carta_Gantt_PrevySeg_2026.xlsx` (Hito v1.9.4 registrado).

---

## 🧪 Validación y Pruebas
- `npm run build`: Compilación en 936ms con **0 errores**.
