import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Search, 
  ChevronDown, 
  ChevronRight, 
  Shield, 
  Bot, 
  BarChart3, 
  Award, 
  Sparkles, 
  FileText, 
  MapPin, 
  Globe, 
  MessageSquare, 
  CreditCard, 
  Home, 
  Smartphone, 
  Share2, 
  Lock, 
  CheckCircle2, 
  Sliders, 
  HelpCircle, 
  X, 
  Settings,
  ExternalLink,
  ChevronUp
} from 'lucide-react';

const SiteAdminView = ({ currentUser }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [expandedSections, setExpandedSections] = useState({
    general: true,
    ia: true,
    analitica: true,
    competencias: true,
    insignias: true,
    h5p: true,
    licencia: true,
    ubicacion: true,
    idioma: true,
    mensajeria: true,
    pagos: true,
    seguridad: true,
    pagina_principal: true,
    app_movil: true,
    moodlenet: true,
  });

  const [selectedSetting, setSelectedSetting] = useState(null);
  const [toastMessage, setToastMessage] = useState('');

  // Estructura completa de Administración del sitio basada en las 3 capturas de pantalla
  const adminCategories = [
    {
      id: 'general',
      title: 'General',
      subtitle: 'Ajustes del sitio',
      icon: Sliders,
      badge: 'Principal',
      items: [
        { name: 'Notificaciones', desc: 'Alertas del sistema, avisos de mantenimiento y notificaciones SENCE.' },
        { name: 'Registro', desc: 'Registro de la plataforma OTEC ante el directorio oficial.' },
        { name: 'Configuración de la encuesta externa', desc: 'Evaluaciones de satisfacción y retroalimentación de alumnos.' },
        { name: 'Opciones avanzadas', desc: 'Parámetros de rendimiento, caché y depuración del LMS.' },
        { name: 'Ajustes preestablecidos de administración del sitio', desc: 'Copia de seguridad y perfiles de configuración.' },
      ],
    },
    {
      id: 'ia',
      title: 'IA',
      subtitle: 'Inteligencia Artificial',
      icon: Bot,
      badge: 'Nuevo',
      items: [
        { name: 'Proveedores de IA', desc: 'Configurar modelos LLM y motores de asistencia pedagógica.' },
        { name: 'Disposiciones de IA', desc: 'Permisos de generación de contenido, resúmenes y asistencia en evaluaciones.' },
      ],
    },
    {
      id: 'analitica',
      title: 'Analítica',
      subtitle: 'Reportes y modelos predictivos',
      icon: BarChart3,
      items: [
        { name: 'Información del sitio', desc: 'Estadísticas de uso de CPU, almacenamiento y alumnos concurrentes.' },
        { name: 'Configuraciones de Analítica', desc: 'Métricas de retención y alertas tempranas de deserción académica.' },
        { name: 'Modelos analíticos', desc: 'Entrenamiento de algoritmos de progreso formativo.' },
      ],
    },
    {
      id: 'competencias',
      title: 'Competencias',
      subtitle: 'Marcos de cualificación',
      icon: Award,
      items: [
        { name: 'Configuración de las competencias', desc: 'Parámetros del marco de competencias laborales ChileValora.' },
        { name: 'Migrar marcos', desc: 'Traslado de competencias entre cursos y cohortes SPD (Subsecretaría de Prevención del Delito).' },
        { name: 'Importar marco de competencias', desc: 'Carga de estándares en formato CSV o JSON.' },
        { name: 'Exportar marco de competencias', desc: 'Descarga de rúbricas oficiales de evaluación.' },
        { name: 'Marcos de competencias', desc: 'Árbol de destrezas para Guardias y Vigilantes Privados.' },
      ],
    },
    {
      id: 'insignias',
      title: 'Insignias',
      subtitle: 'Badges y gamificación',
      icon: Award,
      items: [
        { name: 'Configuración de las insignias', desc: 'Requisitos para emisión de Open Badges.' },
        { name: 'Gestionar insignias', desc: 'Listado de condecoraciones por cursos completados.' },
        { name: 'Añadir una nueva insignia', desc: 'Crear nueva medalla digital con verificación criptográfica.' },
        { name: 'Gestionar mochilas', desc: 'Conexión con Badgr y plataformas externas de acreditación.' },
      ],
    },
    {
      id: 'h5p',
      title: 'H5P',
      subtitle: 'Contenido interactivo',
      icon: Sparkles,
      items: [
        { name: 'Visión general del H5P', desc: 'Librerías y tipos de actividades interactivas instaladas.' },
        { name: 'Gestionar tipos de contenido H5P', desc: 'Actualizar paquetes de video interactivo y simulaciones.' },
        { name: 'Configuraciones de H5P', desc: 'Almacenamiento y cuotas de exportación interactiva.' },
      ],
    },
    {
      id: 'licencia',
      title: 'Licencia',
      subtitle: 'Términos y propiedad intelectual',
      icon: FileText,
      items: [
        { name: 'Configuración de licencias', desc: 'Gestión de licencias Creative Commons y Copyright OTEC.' },
        { name: 'Gestor de licencias', desc: 'Registro de autores y derechos de autor en material didáctico.' },
      ],
    },
    {
      id: 'ubicacion',
      title: 'Ubicación',
      subtitle: 'Zona horaria y geolocalización',
      icon: MapPin,
      items: [
        { name: 'Ajustes de ubicación', desc: 'Zona horaria oficial de Chile Continental (UTC-3 / UTC-4) y Arica.' },
      ],
    },
    {
      id: 'idioma',
      title: 'Idioma',
      subtitle: 'Localización y traducciones',
      icon: Globe,
      items: [
        { name: 'Ajustes de idioma', desc: 'Configuración del idioma por defecto: Español Internacional / Chile.' },
        { name: 'Paquetes de idioma', desc: 'Instalación y actualización de diccionarios de traducción.' },
        { name: 'Personalización del idioma', desc: 'Modificación de cadenas de texto y terminología técnica SENCE.' },
      ],
    },
    {
      id: 'mensajeria',
      title: 'Mensajería',
      subtitle: 'Comunicaciones y avisos',
      icon: MessageSquare,
      items: [
        { name: 'Ajustes de mensajería', desc: 'Servidor de mensajería interna y chat alumno-docente.' },
        { name: 'Ajustes de notificación', desc: 'Canales de notificación vía correo electrónico y push.' },
        { name: 'Móvil', desc: 'Gateway SMS y notificaciones móviles para avisos urgentes.' },
      ],
    },
    {
      id: 'pagos',
      title: 'Pagos',
      subtitle: 'Pasarelas y aranceles',
      icon: CreditCard,
      items: [
        { name: 'Cuentas para pago', desc: 'Pasarelas de pago Webpay Plus, transferencia y franquicia tributaria SENCE.' },
      ],
    },
    {
      id: 'seguridad',
      title: 'Seguridad',
      subtitle: 'Protección y políticas de acceso',
      icon: Shield,
      badge: 'Crítico',
      items: [
        { name: 'Bloqueador de IP', desc: 'Lista negra y lista blanca de direcciones IP autorizadas.' },
        { name: 'Políticas de seguridad del sitio', desc: 'Requisitos de complejidad de contraseñas y expiración de sesiones.' },
        { name: 'Seguridad HTTP', desc: 'Cabeceras de seguridad SSL/TLS, HTTPS forzado y cookies seguras.' },
        { name: 'Notificaciones', desc: 'Alertas de intentos de acceso no autorizados.' },
      ],
    },
    {
      id: 'pagina_principal',
      title: 'Página principal del sitio',
      subtitle: 'Portada del aula virtual',
      icon: Home,
      items: [
        { name: 'Ajustes de la página principal del sitio', desc: 'Elementos visibles para usuarios no autenticados y matriculados.' },
      ],
    },
    {
      id: 'app_movil',
      title: 'App para dispositivos móviles',
      subtitle: 'Moodle Mobile y PWA',
      icon: Smartphone,
      items: [
        { name: 'Ajustes móviles', desc: 'Habilitar sincronización con la aplicación móvil oficial.' },
        { name: 'Suscripción a la aplicación de Moodle', desc: 'Gestión de planes y notificaciones push ilimitadas.' },
        { name: 'Autenticación Móvil', desc: 'Inicio de sesión mediante código QR y token biométrico.' },
        { name: 'Apariencia móvil', desc: 'Colores corporativos y logo PrevySeg en la aplicación móvil.' },
        { name: 'Características móviles', desc: 'Descarga de cursos para acceso offline.' },
      ],
    },
    {
      id: 'moodlenet',
      title: 'MoodleNet',
      subtitle: 'Red federada de recursos',
      icon: Share2,
      items: [
        { name: 'Ajustes de MoodleNet', desc: 'Conexión con la red comunitaria global de recursos educativos abiertos.' },
      ],
    },
  ];

  // Alternar expansión de una sección
  const toggleSection = (id) => {
    setExpandedSections(prev => ({ ...prev, [id]: !prev[id] }));
  };

  // Expandir / Colapsar todas
  const toggleAll = (expand) => {
    const nextState = {};
    adminCategories.forEach(cat => {
      nextState[cat.id] = expand;
    });
    setExpandedSections(nextState);
  };

  // Filtrado reactivo en vivo por búsqueda
  const filteredCategories = adminCategories.map(cat => {
    const matchesCategoryTitle = cat.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                                 cat.subtitle.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchedItems = cat.items.filter(item => 
      item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.desc.toLowerCase().includes(searchQuery.toLowerCase())
    );

    if (matchesCategoryTitle) {
      return cat;
    }

    if (matchedItems.length > 0) {
      return {
        ...cat,
        items: matchedItems,
      };
    }

    return null;
  }).filter(Boolean);

  const handleOpenSetting = (catTitle, item) => {
    setSelectedSetting({
      category: catTitle,
      name: item.name,
      desc: item.desc,
    });
  };

  const handleSaveSetting = () => {
    setToastMessage(`Ajuste "${selectedSetting?.name}" guardado exitosamente.`);
    setSelectedSetting(null);
    setTimeout(() => setToastMessage(''), 3000);
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-200">
      
      {/* 1. Header con Título "Administración del sitio" y Buscador con botón azul como en la captura */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 bg-white p-5 rounded-2xl border border-slate-200 shadow-sm">
        <div>
          <div className="flex items-center gap-2.5">
            <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
              Administración del sitio
            </h1>
            <span className="bg-purple-50 text-purple-700 text-[11px] font-bold px-3 py-0.5 rounded-full border border-purple-200 flex items-center gap-1">
              <Lock size={12} /> Rol Administrador
            </span>
          </div>
          <p className="text-xs text-slate-500 mt-1">
            Configuración global de la plataforma, políticas de seguridad, IA, analítica e integraciones.
          </p>
        </div>

        {/* Buscador superior derecho con botón azul como en Screenshot 1 */}
        <div className="flex items-center gap-2 w-full md:w-auto">
          <div className="relative flex-1 md:w-72">
            <input
              type="text"
              placeholder="Buscar"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-slate-50 border border-slate-300 rounded-l-xl px-3.5 py-2 text-xs text-slate-900 placeholder-slate-400 focus:outline-none focus:border-[#0284c7] focus:bg-white"
            />
          </div>
          <button
            onClick={() => {}}
            className="bg-[#0284c7] hover:bg-[#0369a1] text-white p-2.5 rounded-r-xl transition-colors cursor-pointer flex items-center justify-center shadow"
            title="Buscar ajuste"
          >
            <Search size={15} />
          </button>
        </div>
      </div>

      {toastMessage && (
        <div className="p-4 bg-emerald-50 border border-emerald-200 rounded-xl text-emerald-800 text-xs flex items-center gap-2.5 animate-in fade-in">
          <CheckCircle2 size={16} className="text-emerald-600" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Barra de Controles y Expansión */}
      <div className="flex justify-between items-center text-xs text-slate-500 px-1">
        <div>
          Mostrando <strong className="text-slate-800">{filteredCategories.length}</strong> módulos de administración
        </div>
        <div className="flex gap-2">
          <button
            onClick={() => toggleAll(true)}
            className="text-[11px] text-slate-700 hover:text-slate-900 px-2.5 py-1 rounded bg-slate-100 border border-slate-200 cursor-pointer hover:bg-slate-200"
          >
            Expandir todo
          </button>
          <button
            onClick={() => toggleAll(false)}
            className="text-[11px] text-slate-700 hover:text-slate-900 px-2.5 py-1 rounded bg-slate-100 border border-slate-200 cursor-pointer hover:bg-slate-200"
          >
            Colapsar todo
          </button>
        </div>
      </div>

      {/* 2. Lista de Filas y Cajas Expandibles con Framer Motion */}
      <div className="space-y-4">
        {filteredCategories.map((cat, idx) => {
          const IconComponent = cat.icon;
          const isExpanded = expandedSections[cat.id];

          return (
            <motion.div
              key={cat.id}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: idx * 0.03 }}
              className="bg-white rounded-3xl border border-slate-200 overflow-hidden shadow-sm transition-all duration-200"
            >
              {/* Encabezado de Categoría */}
              <button
                type="button"
                onClick={() => toggleSection(cat.id)}
                className="w-full flex items-center justify-between p-5 bg-white hover:bg-slate-50 transition-colors text-left cursor-pointer border-b border-slate-200 select-none group"
              >
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-2xl bg-sky-50 border border-sky-100 flex items-center justify-center text-[#0284c7] group-hover:scale-105 transition-transform flex-shrink-0 shadow-sm">
                    <IconComponent size={20} />
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <h3 className="text-base font-bold text-slate-900 group-hover:text-[#0284c7] transition-colors">
                        {cat.title}
                      </h3>
                      {cat.badge && (
                        <span className={`text-[10px] font-bold px-2.5 py-0.5 rounded-full uppercase tracking-wider ${
                          cat.badge === 'Crítico' 
                            ? 'bg-red-50 text-red-700 border border-red-200' 
                            : 'bg-teal-50 text-teal-700 border border-teal-200'
                        }`}>
                          {cat.badge}
                        </span>
                      )}
                    </div>
                    <p className="text-xs text-slate-500">
                      {cat.subtitle} • {cat.items.length} opciones configurables
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-2 text-slate-400">
                  <span className="text-xs font-semibold hidden sm:inline text-slate-600">
                    {isExpanded ? 'Ocultar' : 'Ver opciones'}
                  </span>
                  <div className="p-1 rounded-full bg-slate-100 text-slate-600 group-hover:bg-slate-200 transition-colors">
                    {isExpanded ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                  </div>
                </div>
              </button>

              {/* Contenido Expandible con AnimatePresence */}
              <AnimatePresence>
                {isExpanded && (
                  <motion.div 
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.25, ease: 'easeInOut' }}
                    className="overflow-hidden"
                  >
                    <div className="p-4 sm:p-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 bg-slate-50/70">
                      {cat.items.map((item, itemIdx) => (
                        <motion.div
                          key={itemIdx}
                          whileHover={{ scale: 1.02, x: 2 }}
                          onClick={() => handleOpenSetting(cat.title, item)}
                          className="p-3.5 rounded-2xl bg-white hover:bg-slate-50 border border-slate-200 hover:border-sky-400 transition-all duration-200 cursor-pointer flex flex-col justify-between group/item shadow-sm"
                        >
                          <div className="space-y-1">
                            <div className="text-xs sm:text-sm font-bold text-slate-800 group-hover/item:text-[#0284c7] transition-colors flex items-center justify-between">
                              <span>{item.name}</span>
                              <ChevronRight size={13} className="text-slate-400 group-hover/item:translate-x-1 group-hover/item:text-[#0284c7] transition-transform" />
                            </div>
                            <p className="text-[11px] text-slate-500 leading-snug">
                              {item.desc}
                            </p>
                          </div>
                          <div className="pt-2 mt-2 border-t border-slate-100 flex items-center justify-between text-[10px] text-slate-400 font-semibold">
                            <span>SENCE LMS</span>
                            <span className="text-[#00c2b2] opacity-0 group-hover/item:opacity-100 transition-opacity font-bold">Configurar →</span>
                          </div>
                        </motion.div>
                      ))}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          );
        })}
      </div>

      {/* 3. Modal Interactivo para Ajustes de Configuración */}
      <AnimatePresence>
        {selectedSetting && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
            <motion.div 
              initial={{ opacity: 0, scale: 0.92, y: 15 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.92, y: 15 }}
              transition={{ duration: 0.25 }}
              className="bg-white border border-slate-200 w-full max-w-lg rounded-3xl shadow-2xl p-6 sm:p-8 relative"
            >
              <motion.button
                whileHover={{ scale: 1.1, rotate: 90 }}
                whileTap={{ scale: 0.9 }}
                onClick={() => setSelectedSetting(null)}
                className="absolute top-4 right-4 text-slate-400 hover:text-slate-700 p-2 rounded-full hover:bg-slate-100 transition-colors cursor-pointer"
              >
                <X size={20} />
              </motion.button>

              <div className="space-y-4">
                <div className="flex items-center gap-2">
                  <span className="text-[10px] font-bold text-teal-800 bg-teal-50 border border-teal-200 px-3 py-1 rounded-full uppercase tracking-wider">
                    {selectedSetting.category}
                  </span>
                  <span className="text-xs text-slate-500">• Parámetro de Administración</span>
                </div>

                <h3 className="text-xl font-bold text-slate-900">
                  {selectedSetting.name}
                </h3>

                <p className="text-xs text-slate-600 leading-relaxed">
                  {selectedSetting.desc}
                </p>

                <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200 space-y-3">
                  <label className="block text-xs font-semibold text-slate-700">
                    Estado del Ajuste en el Servidor
                  </label>
                  <select className="w-full bg-white border border-slate-300 rounded-xl px-3.5 py-2 text-xs text-slate-900 focus:outline-none focus:ring-2 focus:ring-sky-500/40 focus:border-sky-500 transition-all cursor-pointer">
                    <option>Habilitado / Activo por defecto</option>
                    <option>Deshabilitado</option>
                    <option>Solo Administradores y Fiscalizadores SENCE</option>
                  </select>

                  <div className="pt-2">
                    <label className="block text-xs font-semibold text-slate-700 mb-1">
                      Comentario o Nota de Auditoría
                    </label>
                    <input
                      type="text"
                      placeholder="Ej. Parámetro verificado según estándar SPD"
                      className="w-full bg-white border border-slate-300 rounded-xl px-3.5 py-2 text-xs text-slate-900 focus:outline-none focus:ring-2 focus:ring-sky-500/40 focus:border-sky-500 transition-all"
                    />
                  </div>
                </div>

                <div className="pt-3 flex justify-end gap-3">
                  <button
                    type="button"
                    onClick={() => setSelectedSetting(null)}
                    className="px-4 py-2.5 text-xs font-semibold text-slate-600 hover:text-slate-900 rounded-xl hover:bg-slate-100 cursor-pointer transition-colors border border-slate-200"
                  >
                    Cancelar
                  </button>
                  <motion.button
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.97 }}
                    type="button"
                    onClick={handleSaveSetting}
                    className="px-5 py-2.5 text-xs font-bold text-white bg-[#0284c7] hover:bg-sky-600 rounded-xl shadow-md cursor-pointer"
                  >
                    Guardar Configuración
                  </motion.button>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

    </div>
  );
};

export default SiteAdminView;
