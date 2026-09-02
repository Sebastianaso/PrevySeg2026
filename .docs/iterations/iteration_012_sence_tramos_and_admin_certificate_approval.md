# Iteración 012: Tramos de Franquicia SENCE en Inicio y Flujo de Aprobación de Certificados en LMS

**Fecha:** 2026-09-02  
**Estado:** Completado / Desplegado  
**Tipo:** Feature / Certificación & Portada  

---

## 🎯 Objetivo
1. Incorporar en la página de inicio pública la sección de **Afiliación SENCE y Tramos de Franquicia Tributaria** con porcentajes y tramos UTM (*100% SENCE Hasta 25 UTM, 50% SENCE 25 a 50 UTM, 15% SENCE Sobre 50 UTM, Pago Directo Desc. Volumen*), sin calculadoras de precios.
2. Implementar en el LMS para la **Administración** el panel de **Visto Bueno y Emisión de Diplomas Oficiales** para verificar que los alumnos hayan finalizado sus cursos.
3. Entregar al **Estudiante** su copia oficial de diploma/certificado en PDF en su Área Personal y Aula Virtual, **respetando la confidencialidad de notas (sin puntajes numéricos)**, acreditando formalmente que cumplió el curso y se encuentra debidamente capacitado conforme al Decreto Ley N° 3.607 y OS-10.

---

## 🛠️ Implementaciones Realizadas

### 1. Portada Pública (`src/components/SenceTramosSection.jsx` y `Services.jsx`)
- Tarjetas idénticas a la referencia:
  - **100% SENCE** (*Hasta 25 UTM*)
  - **50% SENCE** (*25 a 50 UTM*) — Resaltado con marco cyan/teal.
  - **15% SENCE** (*Sobre 50 UTM*)
  - **Pago Directo** (*Desc. Volumen*)
- Mención de registro OTEC SENCE N° 1238088725 y acreditación NCh 2728.

### 2. Panel Administrativo de Aprobación (`src/lms/views/CertificateApprovalView.jsx`)
- Pestaña **"Emisión de Certificados"** dentro de Administración del Sitio.
- Tabla con alumnos que terminaron su curso, horas de asistencia y validación de requisitos legales.
- Botón **"Dar Visto Bueno"** que emite y transfiere el certificado digital al perfil del estudiante.

### 3. Copia Oficial del Diploma para el Alumno (`CourseClassroomView.jsx` y `PersonalAreaView.jsx`)
- Notificación y banner de diploma disponible en el Área Personal del estudiante (*Matías Silva Lagos*).
- Diploma oficial digital con sello OTEC, registro SENCE, carga horaria (90 hrs) y vigencia (3 años OS-10).
- **Confidencialidad Garantizada:** No se muestran notas numéricas; se certifica que el estudiante cumplió y está debidamente capacitado.

---

## 🧪 Validación y Pruebas
- `npm run build`: Compilación limpia en 386ms sin errores.
- Flujo administrativo y de estudiante probado en entorno local.
