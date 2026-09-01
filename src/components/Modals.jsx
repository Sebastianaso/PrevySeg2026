import React, { useState } from 'react';
import { 
  X, 
  Send, 
  User, 
  Lock, 
  Search, 
  CheckCircle, 
  ExternalLink, 
  Calendar, 
  ShieldCheck, 
  Phone, 
  Mail, 
  BookOpen 
} from 'lucide-react';
import { Link as ScrollLink } from 'react-scroll';

// 1. Modal Envíanos Un Mensaje (Envío directo a WhatsApp +56 9 7869 1869)
export const ContactModal = ({ isOpen, onClose, defaultCourse = '' }) => {
  const [formData, setFormData] = useState({
    nombre: '',
    email: '',
    telefono: '',
    curso: defaultCourse || 'Formación de Guardias de Seguridad',
    mensaje: '',
  });
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [whatsappLink, setWhatsappLink] = useState('');

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Destinatario oficial WhatsApp PrevySeg
    const targetWhatsAppNumber = '56978691869'; // +56 9 7869 1869
    
    const whatsappMessage = `👋 *¡Hola PrevySeg! Nueva Consulta Web:*

👤 *Nombre Completo:* ${formData.nombre.trim()}
📧 *Correo Electrónico:* ${formData.email.trim()}
📱 *Teléfono / WhatsApp:* ${formData.telefono.trim()}
🎓 *Programa de Interés:* ${formData.curso}
💬 *Mensaje o Consulta:*
${formData.mensaje.trim() || 'Deseo recibir información de fechas, requisitos y franquicia SENCE.'}

---
_Enviado desde el formulario oficial de Contacto Directo de PrevySeg._`;

    const encodedUrl = `https://api.whatsapp.com/send?phone=${targetWhatsAppNumber}&text=${encodeURIComponent(whatsappMessage)}`;
    setWhatsappLink(encodedUrl);
    
    // Abrir WhatsApp automáticamente en una pestaña nueva
    window.open(encodedUrl, '_blank', 'noopener,noreferrer');
    
    setIsSubmitted(true);
  };

  const handleReset = () => {
    setIsSubmitted(false);
    setFormData({
      nombre: '',
      email: '',
      telefono: '',
      curso: defaultCourse || 'Formación de Guardias de Seguridad',
      mensaje: '',
    });
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="bg-[#18191c] border border-gray-700 w-full max-w-lg rounded-2xl shadow-2xl overflow-hidden p-6 sm:p-8 relative">
        
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-white p-2 rounded-full hover:bg-gray-800 transition-colors"
        >
          <X size={20} />
        </button>

        {isSubmitted ? (
          <div className="py-8 text-center space-y-5">
            <div className="w-16 h-16 bg-emerald-500/20 text-[#22c55e] rounded-full flex items-center justify-center mx-auto animate-bounce">
              <CheckCircle size={36} />
            </div>
            
            <div className="space-y-2">
              <h3 className="text-2xl font-black text-white">¡Mensaje Preparado con Éxito!</h3>
              <p className="text-gray-300 text-xs sm:text-sm max-w-md mx-auto leading-relaxed">
                Tu mensaje para <strong className="text-white">PrevySeg</strong> ha sido transferido al WhatsApp oficial <strong className="text-emerald-400 font-mono">+56 9 7869 1869</strong>.
              </p>
            </div>

            <div className="p-3.5 bg-[#121315] rounded-xl border border-gray-800 text-left text-xs space-y-1 font-mono text-gray-300">
              <div><strong className="text-gray-500">De:</strong> {formData.nombre} ({formData.telefono})</div>
              <div><strong className="text-gray-500">Para:</strong> +56 9 7869 1869 (WhatsApp PrevySeg)</div>
              <div><strong className="text-gray-500">Curso:</strong> {formData.curso}</div>
            </div>

            <div className="space-y-2 pt-2">
              <a
                href={whatsappLink}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full bg-[#22c55e] hover:bg-[#16a34a] active:scale-95 text-gray-950 font-black py-3 px-4 rounded-xl shadow-lg shadow-emerald-950/40 flex items-center justify-center gap-2 transition-all cursor-pointer text-xs sm:text-sm"
              >
                <Send size={16} />
                <span>Abrir WhatsApp (+56 9 7869 1869)</span>
              </a>

              <div className="flex gap-2">
                <button
                  type="button"
                  onClick={handleReset}
                  className="flex-1 border border-gray-700 hover:bg-gray-800 text-gray-300 py-2.5 rounded-xl text-xs font-semibold cursor-pointer"
                >
                  Enviar otro mensaje
                </button>
                <button
                  type="button"
                  onClick={onClose}
                  className="flex-1 bg-gray-800 hover:bg-gray-700 text-white py-2.5 rounded-xl text-xs font-semibold cursor-pointer"
                >
                  Cerrar
                </button>
              </div>
            </div>
          </div>
        ) : (
          <div className="space-y-6">
            <div>
              <span className="text-[#22c55e] text-xs font-bold uppercase tracking-wider">Contacto Directo</span>
              <h3 className="text-2xl font-bold text-white mt-1">Envíanos Un Mensaje</h3>
              <p className="text-gray-400 text-xs mt-1">
                Consulta fechas de inicio, costos con código SENCE o requerimientos especiales. Se enviará a nuestro WhatsApp oficial: <strong className="text-emerald-400 font-mono">+56 9 7869 1869</strong>.
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-gray-300 mb-1">Nombre Completo *</label>
                <input
                  type="text"
                  required
                  placeholder="Ej. Carlos Morales"
                  value={formData.nombre}
                  onChange={(e) => setFormData({ ...formData, nombre: e.target.value })}
                  className="w-full bg-[#121315] border border-gray-700 rounded-lg px-3.5 py-2.5 text-sm text-white focus:outline-none focus:border-[#00c2b2] transition-colors"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-gray-300 mb-1">Correo Electrónico *</label>
                  <input
                    type="email"
                    required
                    placeholder="carlos@correo.cl"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full bg-[#121315] border border-gray-700 rounded-lg px-3.5 py-2.5 text-sm text-white focus:outline-none focus:border-[#00c2b2] transition-colors"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-gray-300 mb-1">Teléfono / WhatsApp *</label>
                  <input
                    type="tel"
                    required
                    placeholder="+56 9 1234 5678"
                    value={formData.telefono}
                    onChange={(e) => setFormData({ ...formData, telefono: e.target.value })}
                    className="w-full bg-[#121315] border border-gray-700 rounded-lg px-3.5 py-2.5 text-sm text-white focus:outline-none focus:border-[#00c2b2] transition-colors"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-300 mb-1">Programa de Interés</label>
                <select
                  value={formData.curso}
                  onChange={(e) => setFormData({ ...formData, curso: e.target.value })}
                  className="w-full bg-[#121315] border border-gray-700 rounded-lg px-3.5 py-2.5 text-sm text-white focus:outline-none focus:border-[#00c2b2] transition-colors"
                >
                  <option value="Formación de Guardias de Seguridad">Formación de Guardias de Seguridad</option>
                  <option value="Formación de Vigilantes Privados">Formación de Vigilantes Privados</option>
                  <option value="Formación Marítimo Portuario">Formación Guardia Marítimo Portuario</option>
                  <option value="Perfeccionamiento de Guardias">Perfeccionamiento de Guardias</option>
                  <option value="Operación de Circuitos Cerrados (CCTV SENCE)">Operación de CCTV y Alarmas (SENCE)</option>
                  <option value="Supervisor de Seguridad Privada">Supervisor de Seguridad Privada</option>
                  <option value="Otro">Otro requerimiento o capacitación para empresas</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-300 mb-1">Mensaje o Consulta</label>
                <textarea
                  rows="3"
                  placeholder="Escribe aquí tu consulta sobre requisitos, certificados o financiamiento..."
                  value={formData.mensaje}
                  onChange={(e) => setFormData({ ...formData, mensaje: e.target.value })}
                  className="w-full bg-[#121315] border border-gray-700 rounded-lg px-3.5 py-2.5 text-sm text-white focus:outline-none focus:border-[#00c2b2] transition-colors resize-none"
                ></textarea>
              </div>

              <button
                type="submit"
                className="w-full bg-[#10b981] hover:bg-[#059669] text-white font-bold py-3 px-4 rounded-lg shadow-lg flex items-center justify-center gap-2 transition-colors cursor-pointer"
              >
                <Send size={16} />
                <span>Enviar Consulta</span>
              </button>
            </form>
          </div>
        )}

      </div>
    </div>
  );
};


// 2. Modal Plataforma Virtual con Autenticación Estricta
export const PlatformModal = ({ isOpen, onClose, onLoginSuccess }) => {
  const [rut, setRut] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

  if (!isOpen) return null;

  const validUsers = [
    {
      user: '15692858-5',
      pass: '15692858',
      nombre: 'Ashley Adaros Guzmán',
      email: 'ashley.adaros@prevyseg.cl',
      rol: 'ADMIN',
      cargo: 'Administrador / Instructor SENCE',
    },
    {
      user: '21778425-5',
      pass: '21778425',
      nombre: 'Sebastián Araya Cortés',
      email: 'sebastian.araya@prevyseg.cl',
      rol: 'ADMIN',
      cargo: 'Administrador / Docente OS-10',
    },
    {
      user: '21778425-6',
      pass: '21778425',
      nombre: 'Matías Silva Lagos',
      email: 'matias.silva@alumnos.prevyseg.cl',
      rol: 'STUDENT',
      cargo: 'Estudiante (Persona Natural)',
    }
  ];

  const handleLogin = (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    setTimeout(() => {
      setLoading(false);
      
      // Normalizar entrada de RUT (quitar puntos o espacios)
      const cleanInputUser = rut.trim().replace(/\./g, '');
      const cleanPassword = password.trim();

      // Para el estudiante 21778425-6 permitir cualquier contraseña o 21778425
      let matched = validUsers.find((u) => u.user === cleanInputUser && u.pass === cleanPassword);
      
      if (!matched && cleanInputUser === '21778425-6') {
        matched = validUsers.find((u) => u.user === '21778425-6');
      }

      if (matched) {
        setSuccess(true);
        setTimeout(() => {
          setSuccess(false);
          onClose();
          if (onLoginSuccess) {
            onLoginSuccess(matched);
          }
        }, 700);
      } else {
        setError('Credenciales inválidas. Por favor verifica tu RUT y contraseña autorizada SENCE.');
      }
    }, 500);
  };

  const handleFillDemo = (demoUser, demoPass) => {
    setRut(demoUser);
    setPassword(demoPass);
    setError('');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="bg-[#18191c] border border-sky-600/40 w-full max-w-md rounded-2xl shadow-2xl p-6 sm:p-8 relative">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-white p-2 rounded-full hover:bg-gray-800 transition-colors"
        >
          <X size={20} />
        </button>

        <div className="text-center space-y-2 mb-6">
          <div className="w-14 h-14 bg-sky-500/20 text-[#0284c7] rounded-2xl flex items-center justify-center mx-auto border border-sky-500/30">
            <ShieldCheck size={32} />
          </div>
          <h3 className="text-2xl font-black text-white">
            <span className="text-[#0284c7]">Prevy</span>
            <span className="text-[#00c2b2]">Seg</span> Virtual
          </h3>
          <p className="text-xs text-gray-400">
            Portal del Alumno y Aula Virtual de Capacitaciones
          </p>
        </div>

        {success ? (
          <div className="py-8 text-center space-y-3">
            <div className="w-14 h-14 bg-emerald-500/20 text-emerald-400 rounded-full flex items-center justify-center mx-auto animate-bounce">
              <CheckCircle size={32} />
            </div>
            <h4 className="text-lg font-bold text-white">¡Acceso Autorizado!</h4>
            <p className="text-xs text-gray-300">Ingresando a la plataforma virtual...</p>
          </div>
        ) : (
          <form onSubmit={handleLogin} className="space-y-4">
            {error && (
              <div className="p-3 bg-red-950/70 border border-red-500/50 rounded-xl text-xs text-red-300">
                {error}
              </div>
            )}

            <div>
              <label className="block text-xs font-semibold text-gray-300 mb-1">RUT de Usuario</label>
              <div className="relative">
                <input
                  type="text"
                  required
                  placeholder="15692858-5 o 21778425-6"
                  value={rut}
                  onChange={(e) => setRut(e.target.value)}
                  className="w-full bg-[#121315] border border-gray-700 rounded-lg pl-10 pr-3.5 py-2.5 text-sm text-white focus:outline-none focus:border-[#0284c7] font-mono"
                />
                <User size={16} className="absolute left-3.5 top-3 text-gray-400" />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-gray-300 mb-1">Contraseña</label>
              <div className="relative">
                <input
                  type="password"
                  required
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full bg-[#121315] border border-gray-700 rounded-lg pl-10 pr-3.5 py-2.5 text-sm text-white focus:outline-none focus:border-[#0284c7]"
                />
                <Lock size={16} className="absolute left-3.5 top-3 text-gray-400" />
              </div>
            </div>

            {/* Quick Demo Credentials */}
            <div className="p-3 bg-gray-900/80 border border-gray-800 rounded-xl text-[11px] space-y-1.5">
              <span className="text-gray-400 font-bold block uppercase text-[10px]">Credenciales de Prueba Disponibles:</span>
              <div className="flex flex-col gap-1.5 text-gray-300">
                <button
                  type="button"
                  onClick={() => handleFillDemo('15692858-5', '15692858')}
                  className="text-left text-[#38bdf8] hover:underline flex justify-between cursor-pointer"
                >
                  <span>👑 Ashley Adaros (ADMIN)</span>
                  <span className="font-mono text-gray-400">15692858-5 / 15692858</span>
                </button>
                <button
                  type="button"
                  onClick={() => handleFillDemo('21778425-5', '21778425')}
                  className="text-left text-[#38bdf8] hover:underline flex justify-between cursor-pointer"
                >
                  <span>👑 Sebastián Araya (ADMIN)</span>
                  <span className="font-mono text-gray-400">21778425-5 / 21778425</span>
                </button>
                <button
                  type="button"
                  onClick={() => handleFillDemo('21778425-6', '21778425')}
                  className="text-left text-[#00c2b2] hover:underline flex justify-between cursor-pointer border-t border-gray-800 pt-1"
                >
                  <span>🎓 Matías Silva (STUDENT)</span>
                  <span className="font-mono text-gray-400">21778425-6 / cualquier pass</span>
                </button>
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-[#0284c7] hover:bg-[#0369a1] active:scale-95 text-white font-bold py-3 rounded-lg shadow-lg flex items-center justify-center gap-2 transition-all cursor-pointer"
            >
              {loading ? <span>Verificando en SENCE...</span> : <span>Ingresar al Panel Virtual</span>}
              <ExternalLink size={14} />
            </button>
          </form>
        )}

        <div className="mt-6 pt-4 border-t border-gray-800 text-center text-[11px] text-gray-500">
          Acreditado para formación en línea sincrónica y asincrónica SENCE.
        </div>
      </div>
    </div>
  );
};


// 3. Modal Buscador Rápido
export const SearchModal = ({ isOpen, onClose, onSelectCourse }) => {
  const [query, setQuery] = useState('');

  const coursesList = [
    { name: 'Formación de Guardias de Seguridad (OS-10)', category: 'Formación Inicial', target: 'servicios' },
    { name: 'Formación de Vigilantes Privados', category: 'Formación Inicial', target: 'servicios' },
    { name: 'Formación de Guardia de Seguridad Marítimo Portuario', category: 'Formación Inicial', target: 'servicios' },
    { name: 'Formación para Porteros, Nocheros y Rondines', category: 'Formación Inicial', target: 'servicios' },
    { name: 'Perfeccionamiento de Guardias de Seguridad', category: 'Perfeccionamiento', target: 'servicios' },
    { name: 'Perfeccionamiento de Guardia Marítimo Portuario', category: 'Perfeccionamiento', target: 'servicios' },
    { name: 'Perfeccionamiento de Porteros y Nocheros', category: 'Perfeccionamiento', target: 'servicios' },
    { name: 'Técnicas de Operación CCTV (SENCE)', category: 'Especialización', target: 'servicios' },
    { name: 'Operación de CCTV y Alarmas de Seguridad Privada', category: 'Especialización', target: 'servicios' },
    { name: 'Supervisor de Seguridad Privada', category: 'Especialización', target: 'servicios' },
  ];

  if (!isOpen) return null;

  const filtered = coursesList.filter((c) => 
    c.name.toLowerCase().includes(query.toLowerCase()) || 
    c.category.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center p-4 pt-20 bg-black/80 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="bg-[#18191c] border border-gray-700 w-full max-w-2xl rounded-2xl shadow-2xl p-6 relative">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-white p-2 rounded-full hover:bg-gray-800 transition-colors"
        >
          <X size={20} />
        </button>

        {/* Search input */}
        <div className="relative mb-6">
          <input
            type="text"
            autoFocus
            placeholder="Buscar cursos, especializaciones o requisitos..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="w-full bg-[#121315] border border-gray-700 rounded-xl pl-12 pr-4 py-3.5 text-base text-white focus:outline-none focus:border-[#00c2b2] shadow-inner"
          />
          <Search size={20} className="absolute left-4 top-4 text-gray-400" />
        </div>

        {/* Results */}
        <div className="space-y-2 max-h-80 overflow-y-auto pr-1">
          {filtered.length > 0 ? (
            filtered.map((item, idx) => (
              <div
                key={idx}
                onClick={() => {
                  onSelectCourse(item.name);
                  onClose();
                }}
                className="p-3.5 rounded-xl bg-gray-900/60 hover:bg-gray-800/80 border border-gray-800 hover:border-[#00c2b2]/40 transition-all cursor-pointer flex items-center justify-between group"
              >
                <div>
                  <div className="text-white text-sm font-semibold group-hover:text-[#00c2b2] transition-colors">
                    {item.name}
                  </div>
                  <div className="text-xs text-gray-400">
                    {item.category}
                  </div>
                </div>
                <span className="text-xs font-bold text-[#0284c7] group-hover:text-sky-300">
                  Ver detalle →
                </span>
              </div>
            ))
          ) : (
            <div className="text-center py-8 text-gray-400 text-sm">
              No se encontraron cursos que coincidan con "<span className="text-white">{query}</span>".
            </div>
          )}
        </div>
      </div>
    </div>
  );
};


// 4. Modal Artículo / Blog
export const ArticleModal = ({ article, onClose, onOpenContact }) => {
  if (!article) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="bg-[#18191c] border border-gray-700 w-full max-w-2xl rounded-2xl shadow-2xl overflow-hidden p-6 sm:p-8 relative max-h-[90vh] overflow-y-auto">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-white p-2 rounded-full hover:bg-gray-800 transition-colors z-10"
        >
          <X size={20} />
        </button>

        <div className="space-y-6">
          <div className="rounded-xl overflow-hidden aspect-[16/9]">
            <img src={article.image} alt={article.title} className="w-full h-full object-cover" />
          </div>

          <div className="space-y-2">
            <div className="flex items-center gap-3 text-xs text-gray-400">
              <span className="text-[#00c2b2] font-bold">{article.category}</span>
              <span>•</span>
              <span className="flex items-center gap-1"><Calendar size={12} /> {article.date}</span>
            </div>
            <h2 className="text-2xl font-bold text-white leading-snug">{article.title}</h2>
          </div>

          <p className="text-gray-300 text-sm sm:text-base leading-relaxed">
            {article.summary}
          </p>

          <p className="text-gray-300 text-sm sm:text-base leading-relaxed">
            En <strong className="text-white">PrevySeg Capacitaciones</strong> entregamos una preparación teórico-práctica con instructores de amplia experiencia, garantizando que cada estudiante adquiera las competencias requeridas por la normativa chilena vigente y las demandas de seguridad del entorno laboral en Arica.
          </p>

          <div className="pt-4 border-t border-gray-800 flex justify-end gap-3">
            <button
              onClick={onClose}
              className="px-5 py-2.5 rounded-lg border border-gray-700 text-gray-300 hover:bg-gray-800 text-xs font-semibold cursor-pointer"
            >
              Cerrar
            </button>
            <button
              onClick={() => {
                onClose();
                onOpenContact();
              }}
              className="px-5 py-2.5 rounded-lg bg-[#0284c7] hover:bg-[#0369a1] text-white text-xs font-bold cursor-pointer"
            >
              Consultar por este Curso
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
