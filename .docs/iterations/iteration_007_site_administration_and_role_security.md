# Iteración 007: Administración del Sitio Completa y Control de Acceso por Roles

**Fecha:** 2026-09-01  
**Estado:** Completado  
**Tipo:** Security / Feature LMS  

---

## 🎯 Objetivo
Implementar la vista completa de **Administración del sitio** basada en las 3 capturas de pantalla de referencia (Moodle / SENCE), mejorando el diseño con filas y cajas expandibles interactivas, e implementando control estricto de acceso para que este apartado sea visible y accesible exclusivamente para usuarios con rol **Administrador** (RUTs: `15692858-8` / `15692858-5` y `21778425-5`).

---

## 🛠️ Implementaciones Realizadas

### 1. Control de Permisos y Seguridad por Roles (`LMSLayout.jsx`)
- Verificación estricta de credenciales de Administrador:
  - **Ashley Adaros Guzmán:** `15692858-5` / `15692858-8`
  - **Sebastián Araya Cortés:** `21778425-5`
- La pestaña *"Administración del sitio"* en la barra superior solo se muestra a usuarios con rol Administrador.
- En caso de acceso directo o intento no autorizado, se despliega una pantalla de bloqueo con advertencia de seguridad `ShieldAlert`.

### 2. Componente de Administración del Sitio (`SiteAdminView.jsx`)
- **Encabezado y Buscador**: Título *"Administración del sitio"* con badge de superusuario y barra de búsqueda en tiempo real con botón azul.
- **Categorías Replicadas con Cajas y Filas Expandibles**:
  1. **General / Ajustes del sitio**: *Notificaciones*, *Registro*, *Configuración de la encuesta externa*, *Opciones avanzadas*, *Ajustes preestablecidos de administración del sitio*.
  2. **IA (Inteligencia Artificial)**: *Proveedores de IA*, *Disposiciones de IA*.
  3. **Analítica**: *Información del sitio*, *Configuraciones de Analítica*, *Modelos analíticos*.
  4. **Competencias**: *Configuración de las competencias*, *Migrar marcos*, *Importar marco de competencias*, *Exportar marco de competencias*, *Marcos de competencias*.
  5. **Insignias**: *Configuración de las insignias*, *Gestionar insignias*, *Añadir una nueva insignia*, *Gestionar mochilas*.
  6. **H5P**: *Visión general del H5P*, *Gestionar tipos de contenido H5P*, *Configuraciones de H5P*.
  7. **Licencia**: *Configuración de licencias*, *Gestor de licencias*.
  8. **Ubicación**: *Ajustes de ubicación*.
  9. **Idioma**: *Ajustes de idioma*, *Paquetes de idioma*, *Personalización del idioma*.
  10. **Mensajería**: *Ajustes de mensajería*, *Ajustes de notificación*, *Móvil*.
  11. **Pagos**: *Cuentas para pago*.
  12. **Seguridad**: *Bloqueador de IP*, *Políticas de seguridad del sitio*, *Seguridad HTTP*, *Notificaciones*.
  13. **Página principal del sitio**: *Ajustes de la página principal del sitio*.
  14. **App para dispositivos móviles**: *Ajustes móviles*, *Suscripción a la aplicación de Moodle*, *Autenticación Móvil*, *Apariencia móvil*, *Características móviles*.
  15. **MoodleNet**: *Ajustes de MoodleNet*.

### 3. Modal Interactivo de Ajustes
- Al hacer clic en cualquier opción, se abre un modal de edición y prueba que permite configurar y guardar parámetros con feedback visual.

---

## 🧪 Validación y Pruebas
- Validación de permisos: acceso concedido para `15692858-5` y `21778425-5`.
- Filtrado dinámico: la barra de búsqueda filtra instantáneamente todas las categorías y sub-items.
- Build de producción: `npm run build` ejecutado en 312ms con cero errores.
