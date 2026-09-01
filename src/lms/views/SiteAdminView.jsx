import React, { useState } from 'react';
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
        { name: 'Migrar marcos', desc: 'Traslado de competencias entre cursos y cohortes OS-10.' },
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
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 bg-gray-900/60 p-5 rounded-2xl border border-gray-800 backdrop-blur-md shadow-xl">
        <div>
          <div className="flex items-center gap-2.5">
            <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
              Administración del sitio
            </h1>
            <span className="bg-purple-950/80 text-purple-300 text-[11px] font-bold px-3 py-0.5 rounded-full border border-purple-700/50 flex items-center gap-1">
              <Lock size={12} /> Rol Administrador
            </span>
          </div>
          <p className="text-xs text-gray-400 mt-1">
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
              className="w-full bg-[#18191c] border border-gray-700 rounded-l-xl px-3.5 py-2 text-xs text-white placeholder-gray-500 focus:outline-none focus:border-[#0284c7]"
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
        <div className="p-4 bg-emerald-950/80 border border-emerald-500/50 rounded-xl text-emerald-300 text-xs flex items-center gap-2.5 animate-in fade-in">
          <CheckCircle2 size={16} className="text-emerald-400" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Barra de Controles y Expansión */}
      <div className="flex justify-between items-center text-xs text-gray-400 px-1">
        <div>
          Mostrando <strong className="text-gray-200">{filteredCategories.length}</strong> módulos de administración
        </div>
        <div className="flex gap-2">
          <button
            onClick={() => toggleAll(true)}
            className="text-[11px] text-gray-300 hover:text-white px-2.5 py-1 rounded bg-gray-800/60 border border-gray-700 cursor-pointer"
          >
            Expandir todo
          </button>
          <button
            onClick={() => toggleAll(false)}
            className="text-[11px] text-gray-300 hover:text-white px-2.5 py-1 rounded bg-gray-800/60 border border-gray-700 cursor-pointer"
          >
            Colapsar todo
          </button>
        </div>
      </div>

      {/* 2. Lista de Filas y Cajas Expandibles (Replicando exactamente el contenido de las 3 imágenes con UI mejorada) */}
      <div className="space-y-4">
        {filteredCategories.map((cat) => {
          const IconComponent = cat.icon;
          const isExpanded = expandedSections[cat.id];

          return (
            <div
              key={cat.id}
              className="bg-[#121316] rounded-2xl border border-gray-800/90 overflow-hidden shadow-xl transition-all duration-200"
            >
              {/* Encabezado de Categoría (Fila Clickeable) */}
              <button
                type="button"
                onClick={() => toggleSection(cat.id)}
                className="w-full flex items-center justify-between p-5 bg-[#16171a] hover:bg-gray-800/40 transition-colors text-left cursor-pointer border-b border-gray-800/60 select-none group"
              >
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-xl bg-gray-900 border border-gray-700/80 flex items-center justify-center text-[#38bdf8] group-hover:scale-105 transition-transform flex-shrink-0 shadow-inner">
                    <IconComponent size={20} />
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <h3 className="text-base font-bold text-white group-hover:text-[#38bdf8] transition-colors">
                        {cat.title}
                      </h3>
                      {cat.badge && (
                        <span className={`text-[10px] font-bold px-2 py-0.2 rounded-full uppercase ${
                          cat.badge === 'Crítico' 
                            ? 'bg-red-950 text-red-300 border border-red-800' 
                            : 'bg-teal-950 text-teal-300 border border-teal-800'
                        }`}>
                          {cat.badge}
                        </span>
                      )}
                    </div>
                    <p className="text-[11px] text-gray-400">
                      {cat.subtitle} • {cat.items.length} opciones disponibles
                    </p>
                  </div>
                </div>

                <div className="text-gray-400 group-hover:text-white transition-colors p-1">
                  {isExpanded ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
                </div>
              </button>

              {/* Sub-items (Lista vertical de enlaces en color azul claro/blanco como en la captura) */}
              {isExpanded && (
                <div className="p-4 sm:p-6 bg-[#121316] space-y-2 divide-y divide-gray-800/40">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-2 pt-1">
                    {cat.items.map((item, idx) => (
                      <div
                        key={idx}
                        onClick={() => handleOpenSetting(cat.title, item)}
                        className="p-3 rounded-xl bg-[#18191c]/70 hover:bg-gray-800/80 border border-gray-800 hover:border-sky-500/40 transition-all cursor-pointer flex items-start justify-between group shadow-sm"
                      >
                        <div className="space-y-0.5">
                          {/* Enlace en texto azul claro matching screenshot */}
                          <div className="text-xs sm:text-sm font-semibold text-gray-100 group-hover:text-[#38bdf8] group-hover:underline transition-colors">
                            {item.name}
                          </div>
                          <p className="text-[11px] text-gray-400 leading-relaxed">
                            {item.desc}
                          </p>
                        </div>
                        <span className="text-gray-500 group-hover:text-sky-400 text-xs font-bold pt-0.5 ml-2 flex-shrink-0">
                          →
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* 3. Modal Interactivo para Ajustes de Configuración */}
      {selectedSetting && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in">
          <div className="bg-[#18191c] border border-gray-700 w-full max-w-lg rounded-2xl shadow-2xl p-6 sm:p-8 relative">
            <button
              onClick={() => setSelectedSetting(null)}
              className="absolute top-4 right-4 text-gray-400 hover:text-white p-2 rounded-full hover:bg-gray-800 transition-colors"
            >
              <X size={20} />
            </button>

            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <span className="text-[10px] font-bold text-[#00c2b2] bg-teal-950/80 border border-teal-800/60 px-2.5 py-0.5 rounded-full uppercase">
                  {selectedSetting.category}
                </span>
                <span className="text-xs text-gray-400">• Parámetro de Administración</span>
              </div>

              <h3 className="text-xl font-bold text-white">
                {selectedSetting.name}
              </h3>

              <p className="text-xs text-gray-300 leading-relaxed">
                {selectedSetting.desc}
              </p>

              <div className="p-4 bg-[#121316] rounded-xl border border-gray-700/80 space-y-3">
                <label className="block text-xs font-semibold text-gray-300">
                  Estado del Ajuste en el Servidor
                </label>
                <select className="w-full bg-[#18191c] border border-gray-700 rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-[#0284c7]">
                  <option>Habilitado / Activo por defecto</option>
                  <option>Deshabilitado</option>
                  <option>Solo Administradores y Fiscalizadores SENCE</option>
                </select>

                <div className="pt-2">
                  <label className="block text-xs font-semibold text-gray-300 mb-1">
                    Comentario o Nota de Auditoría
                  </label>
                  <input
                    type="text"
                    placeholder="Ej. Parámetro verificado según estándar OS-10"
                    className="w-full bg-[#18191c] border border-gray-700 rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-[#0284c7]"
                  />
                </div>
              </div>

              <div className="pt-3 flex justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setSelectedSetting(null)}
                  className="px-4 py-2 text-xs font-semibold text-gray-400 hover:text-white rounded-lg cursor-pointer"
                >
                  Cancelar
                </button>
                <button
                  type="button"
                  onClick={handleSaveSetting}
                  className="px-5 py-2 text-xs font-bold text-white bg-[#0284c7] hover:bg-[#0369a1] rounded-lg shadow cursor-pointer"
                >
                  Guardar Configuración
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};

export default SiteAdminView;
