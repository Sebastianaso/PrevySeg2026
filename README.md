# 🛡️ PrevySeg 2026 - Plataforma Académica & Bolsa de Empleo Regional

[![React 19](https://img.shields.io/badge/React-19.x-blue.svg?logo=react)](https://react.dev)
[![Vite](https://img.shields.io/badge/Vite-8.x-purple.svg?logo=vite)](https://vite.dev)
[![Tailwind CSS v4](https://img.shields.io/badge/Tailwind-CSS_v4-38bdf8.svg?logo=tailwindcss)](https://tailwindcss.com)
[![Supabase PostgreSQL](https://img.shields.io/badge/Database-PostgreSQL_15-336791.svg?logo=postgresql)](https://supabase.com)
[![Bcrypt Security](https://img.shields.io/badge/Security-Bcrypt_256--bit-emerald.svg)](https://en.wikipedia.org/wiki/Bcrypt)

Plataforma digital integral desarrollada para **OTEC PrevySeg Capacitaciones**, orientada a la formación, certificación oficial (SENCE & SPD) e intermediación laboral en la Macro Zona Norte de Chile (**Arica, Iquique, Antofagasta y Calama**).

---

## 📌 Ecosistema de la Plataforma

La aplicación integra 4 perfiles de usuario con interfaces totalmente desacopladas y autónomas:

1. **🏢 Portal de Empleadores / Empresas (`EMPRESA`):**
   - Publicación de convocatorias para la **Escuela de Oficios Industriales** (Grúa Horquilla, Soldadura 3G/4G, Electricidad) y **Seguridad Privada SPD** (Guardias OS-10, CCTV).
   - **Notificaciones en tiempo real** al momento en que un estudiante postula a una oferta laboral.
   - **Protocolo OTEC de 4 Pasos:** Validación de notas y certificados -> Citación por WhatsApp -> Exámenes de faena minera -> Formalización de la contratación.

2. **👑 Panel de Administración OTEC (`ADMIN`):**
   - Auditoría normativa SENCE y cumplimiento de la Ley de Seguridad Privada N° 21.659.
   - Emisión oficial de certificados con folio único, hash criptográfico y validación pública.
   - Administración institucional de usuarios con encriptación Bcrypt.

3. **👨‍🏫 Panel Docente / Instructor (`TEACHER`):**
   - Gestión integral de clases sincrónicas Zoom (ID, clave, switch de sesión en vivo).
   - Toma estricta de asistencia sincrónica obligatoria.
   - Repositorio unificado de materiales pedagógicos, evaluaciones y guías de estudio.

4. **🎓 Campus Virtual del Estudiante (`STUDENT`):**
   - Aula virtual con acceso a clases Zoom y material académico descargable.
   - Seguimiento del progreso formativo y calificaciones.
   - Acceso a la **Bolsa de Empleo Regional** con postulación respaldada por el OTEC.

---

## 🚀 Inicio Rápido

### Opción A: Ejecución con 1 Solo Clic (Windows)
1. Descarga o abre la carpeta del proyecto.
2. Haz doble clic en el archivo:
   👉 **`ABRIR_PREVYSEG.bat`**
3. Se abrirá automáticamente tu navegador web predeterminado en `http://localhost:4173/`.

### Opción B: Entorno de Desarrollo (Node.js)
```bash
# 1. Instalar dependencias
npm install

# 2. Iniciar servidor de desarrollo
npm run dev

# 3. Compilar versión para producción
npm run build
```

---

## 🔑 Credenciales de Demostración (1-Click Login)

En el modal de inicio de sesión (*"Acceso Alumnos"* / *"Aula Virtual"*) puedes presionar los accesos directos de 1-clic o usar las siguientes credenciales:

| Rol | RUT de Acceso | Contraseña | Perfil y Funciones Clave |
| :--- | :--- | :--- | :--- |
| **🏢 Empresa / Empleador** | `76.543.210-K` | `prevyseg2026` | Publicar ofertas, recibir postulantes y protocolo de contratación |
| **👑 Administrador OTEC** | `15.692.858-5` | `15692858` | Auditoría de certificaciones, participantes y parámetros |
| **👨‍🏫 Profesor / Docente** | `21.778.425-5` | `21778425` | Sala Zoom, asistencia sincrónica y materiales de clase |
| **🎓 Estudiante** | `21.778.425-6` | `21778425` | Aula virtual, clases en vivo y bolsa de trabajo regional |

---

## 📚 Documentación Técnica Detallada

Para consultar la arquitectura profunda, esquema de base de datos, políticas de seguridad y buenas prácticas de desarrollo:
- 📖 [**Manual de Arquitectura y Buenas Prácticas**](.docs/MANUAL_DE_ARQUITECTURA_Y_BUENAS_PRACTICAS.md)
- 📋 [**Especificación de Requerimientos de Software (SRS)**](.docs/SRS_Especificacion_Requerimientos_Software_PrevySeg.md)
- 📊 [**Visor Interactivo de Diagramas y Arquitectura**](.docs/diagrams/visor_diagramas.html)

---

## ⚖️ Licencia y Propiedad

© 2026 **PrevySeg Capacitaciones**. Todos los derechos reservados.  
**Propietario del Proyecto:** Sebastián Acuña (`Sebastianmotox21@gmail.com`).
