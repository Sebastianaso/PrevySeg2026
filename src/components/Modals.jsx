import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
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
  BookOpen,
  Sparkles
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
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
      <motion.div 
        initial={{ opacity: 0, scale: 0.92, y: 15 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.92, y: 15 }}
        transition={{ duration: 0.3, ease: 'easeOut' }}
        className="bg-gradient-to-b from-[#18191c] via-[#141518] to-[#101113] border border-white/15 w-full max-w-lg rounded-3xl shadow-2xl p-6 sm:p-8 relative backdrop-blur-2xl"
      >

        {/* Close button */}
        <motion.button
          whileHover={{ scale: 1.1, rotate: 90 }}
          whileTap={{ scale: 0.9 }}
          onClick={onClose}
          className="absolute top-4 right-4 text-slate-400 hover:text-white p-2 rounded-full hover:bg-white/10 transition-colors cursor-pointer"
        >
          <X size={20} />
        </motion.button>

        {isSubmitted ? (
          <div className="py-8 text-center space-y-5">
            <div className="w-16 h-16 bg-emerald-500/20 text-[#22c55e] rounded-full flex items-center justify-center mx-auto border border-emerald-500/40 shadow-lg shadow-emerald-950/50">
              <CheckCircle size={36} />
            </div>

            <div className="space-y-2">
              <h3 className="text-2xl font-black text-white">¡Mensaje Preparado con Éxito!</h3>
              <p className="text-slate-300 text-xs sm:text-sm max-w-md mx-auto leading-relaxed">
                Tu mensaje para <strong className="text-white">PrevySeg</strong> ha sido transferido al WhatsApp oficial <strong className="text-emerald-400 font-mono">+56 9 7869 1869</strong>.
              </p>
            </div>

            <div className="p-4 bg-[#121315]/90 rounded-2xl border border-white/10 text-left text-xs space-y-1.5 font-mono text-slate-300 shadow-inner">
              <div><strong className="text-slate-500">De:</strong> {formData.nombre} ({formData.telefono})</div>
              <div><strong className="text-slate-500">Para:</strong> +56 9 7869 1869 (WhatsApp PrevySeg)</div>
              <div><strong className="text-slate-500">Curso:</strong> {formData.curso}</div>
            </div>

            <div className="space-y-2.5 pt-2">
              <motion.a
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                href={whatsappLink}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full bg-gradient-to-r from-[#22c55e] to-emerald-600 hover:from-emerald-500 hover:to-emerald-700 text-gray-950 font-black py-3.5 px-4 rounded-xl shadow-xl shadow-emerald-950/50 flex items-center justify-center gap-2 transition-all cursor-pointer text-xs sm:text-sm border border-emerald-300"
              >
                <Send size={16} />
                <span>Abrir WhatsApp (+56 9 7869 1869)</span>
              </motion.a>

              <div className="flex gap-2">
                <button
                  type="button"
                  onClick={handleReset}
                  className="flex-1 border border-white/10 hover:bg-white/5 text-slate-300 py-2.5 rounded-xl text-xs font-semibold cursor-pointer transition-colors"
                >
                  Enviar otro mensaje
                </button>
                <button
                  type="button"
                  onClick={onClose}
                  className="flex-1 bg-slate-800 hover:bg-slate-700 text-white py-2.5 rounded-xl text-xs font-semibold cursor-pointer transition-colors"
                >
                  Cerrar
                </button>
              </div>
            </div>
          </div>
        ) : (
          <div>
            <div className="space-y-1.5 mb-6">
              <div className="inline-flex items-center gap-1.5 text-[#00c2b2] text-xs font-bold uppercase tracking-wider">
                <Sparkles size={13} />
                <span>Contacto y Matrículas</span>
              </div>
              <h3 className="text-2xl font-black text-white tracking-tight">
                Envíanos Tu Consulta
              </h3>
              <p className="text-xs text-slate-400">
                Completa tus datos y nos comunicaremos contigo a la brevedad por WhatsApp o correo.
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">Nombre Completo</label>
                <input
                  type="text"
                  required
                  placeholder="Ej: Juan Pérez Morales"
                  value={formData.nombre}
                  onChange={(e) => setFormData({ ...formData, nombre: e.target.value })}
                  className="w-full bg-[#121315] border border-white/10 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:ring-2 focus:ring-cyan-500/40 focus:border-cyan-500 transition-all"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">Correo Electrónico</label>
                  <input
                    type="email"
                    required
                    placeholder="juan.perez@gmail.com"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full bg-[#121315] border border-white/10 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:ring-2 focus:ring-cyan-500/40 focus:border-cyan-500 transition-all"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">Teléfono / Celular</label>
                  <input
                    type="tel"
                    required
                    placeholder="+56 9 1234 5678"
                    value={formData.telefono}
                    onChange={(e) => setFormData({ ...formData, telefono: e.target.value })}
                    className="w-full bg-[#121315] border border-white/10 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:ring-2 focus:ring-cyan-500/40 focus:border-cyan-500 transition-all"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">Programa de Interés</label>
                <select
                  value={formData.curso}
                  onChange={(e) => setFormData({ ...formData, curso: e.target.value })}
                  className="w-full bg-[#121315] border border-white/10 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:ring-2 focus:ring-cyan-500/40 focus:border-cyan-500 transition-all"
                >
                  <option value="_2_66_2026 Resolución de Conflictos y Manejo de Situaciones Difíciles Código Sence: 1238088725">_2_66_2026 Resolución de Conflictos y Manejo de Situaciones Difíciles Código Sence: 1238088725</option>
                  <option value="Operador de Central de Cámaras de Televigilancia. C.C.T.V.">Operador de Central de Cámaras de Televigilancia. C.C.T.V.</option>
                  <option value="Curso de formación Guardia de Seguridad">Curso de formación Guardia de Seguridad</option>
                  <option value="Formación de Supervisor de Seguridad Privada *ONLINE*">Formación de Supervisor de Seguridad Privada *ONLINE*</option>
                  <option value="Capacitación ITIC">Capacitación ITIC</option>
                  <option value="Asistencia Curso - Código Sence: 1238087964 ID Acción: 6731273">Asistencia Curso - Código Sence: 1238087964 ID Acción: 6731273</option>
                  <option value="Otro">Otro requerimiento o capacitación para empresas</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">Mensaje o Consulta (Opcional)</label>
                <textarea
                  rows="3"
                  placeholder="Escribe aquí si necesitas financiamiento SENCE, fechas especiales o cotización por grupo de trabajadores..."
                  value={formData.mensaje}
                  onChange={(e) => setFormData({ ...formData, mensaje: e.target.value })}
                  className="w-full bg-[#121315] border border-white/10 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:ring-2 focus:ring-cyan-500/40 focus:border-cyan-500 transition-all resize-none"
                ></textarea>
              </div>

              <motion.button
                whileHover={{ scale: 1.03, boxShadow: '0 0 20px rgba(16, 185, 129, 0.4)' }}
                whileTap={{ scale: 0.97 }}
                type="submit"
                className="w-full bg-gradient-to-r from-[#10b981] to-emerald-600 hover:from-emerald-500 hover:to-emerald-700 text-white font-bold py-3.5 px-4 rounded-xl shadow-xl flex items-center justify-center gap-2 transition-all cursor-pointer border border-emerald-400/30"
              >
                <Send size={16} />
                <span>Enviar Consulta</span>
              </motion.button>
            </form>
          </div>
        )}

      </motion.div>
    </div>
  );
};


// 2. Modal Plataforma Virtual & Registro de Postulantes
export const PlatformModal = ({ isOpen, onClose, onLoginSuccess, initialMode = 'login' }) => {
  const [authMode, setAuthMode] = useState(initialMode || 'login'); // 'login' | 'register'
  
  // Login State
  const [rut, setRut] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

  // Register State
  const [regData, setRegData] = useState({
    nombre: '',
    rut: '',
    telefono: '',
    email: '',
    ciudad: 'Arica',
    escuela: 'seguridad',
  });

  if (!isOpen) return null;

  const validUsers = [
    {
      user: '15692858-5',
      pass: '15692858',
      nombre: 'Ashley Adaros',
      email: 'direccion@prevyseg.cl',
      rol: 'ADMIN',
      cargo: 'Director Ejecutivo / Administrador OTEC',
    },
    {
      user: '21778425-5',
      pass: '21778425',
      nombre: 'Sebastián Araya Cortés',
      email: 'docente.seguridad@prevyseg.cl',
      rol: 'TEACHER',
      cargo: 'Profesor / Docente Instructor SPD',
    },
    {
      user: '21778425-6',
      pass: '21778425',
      nombre: 'Matías Silva Lagos',
      email: 'matias.silva@alumnos.prevyseg.cl',
      rol: 'STUDENT',
      cargo: 'Estudiante / Alumno Regular',
    }
  ];

  const handleLogin = (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    setTimeout(() => {
      setLoading(false);

      const cleanInputUser = rut.trim().replace(/\./g, '');
      const cleanPassword = password.trim();

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
            const defaultTab = matched.rol === 'ADMIN' 
              ? 'ajustes-sitio' 
              : matched.rol === 'TEACHER' 
              ? 'docente-panel' 
              : 'portal-admision';
            onLoginSuccess(matched, defaultTab);
          }
        }, 600);
      } else {
        setError('Credenciales no encontradas. Si aún no eres alumno, regístrate en la pestaña "Registrar Postulante".');
      }
    }, 450);
  };

  const handleRegister = (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    if (!regData.nombre || !regData.rut || !regData.telefono || !regData.email) {
      setError('Por favor completa todos los campos requeridos.');
      setLoading(false);
      return;
    }

    setTimeout(() => {
      setLoading(false);
      const newStudent = {
        user: regData.rut.trim().replace(/\./g, ''),
        nombre: regData.nombre.trim(),
        email: regData.email.trim(),
        telefono: regData.telefono.trim(),
        ciudad: regData.ciudad,
        escuela: regData.escuela,
        rol: 'STUDENT',
        cargo: `Postulante ${regData.escuela === 'seguridad' ? 'Seguridad SPD' : 'Escuela de Oficios'} (${regData.ciudad})`,
      };

      setSuccess(true);
      setTimeout(() => {
        setSuccess(false);
        onClose();
        if (onLoginSuccess) {
          onLoginSuccess(newStudent, 'portal-admision');
        }
      }, 700);
    }, 500);
  };

  const handleFillDemo = (demoUser, demoPass) => {
    setRut(demoUser);
    setPassword(demoPass);
    setError('');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
      <motion.div 
        initial={{ opacity: 0, scale: 0.92, y: 15 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.92, y: 15 }}
        transition={{ duration: 0.3, ease: 'easeOut' }}
        className="bg-gradient-to-b from-[#18191c] via-[#141518] to-[#101113] border border-sky-500/30 w-full max-w-lg rounded-3xl shadow-2xl p-6 sm:p-8 relative backdrop-blur-2xl max-h-[92vh] overflow-y-auto"
      >
        <motion.button
          whileHover={{ scale: 1.1, rotate: 90 }}
          whileTap={{ scale: 0.9 }}
          onClick={onClose}
          className="absolute top-4 right-4 text-slate-400 hover:text-white p-2 rounded-full hover:bg-white/10 transition-colors cursor-pointer"
        >
          <X size={20} />
        </motion.button>

        <div className="text-center space-y-2 mb-6">
          <div className="w-14 h-14 bg-sky-500/20 text-[#0284c7] rounded-2xl flex items-center justify-center mx-auto border border-sky-500/40 shadow-lg shadow-sky-950/50">
            <ShieldCheck size={32} className="text-cyan-400" />
          </div>
          <h3 className="text-2xl font-black text-white">
            <span className="text-[#0284c7]">Prevy</span>
            <span className="text-[#00c2b2]">Seg</span> Virtual
          </h3>
          <p className="text-xs text-slate-400">
            Acceso para Administradores, Profesores y Estudiantes
          </p>
        </div>

        {/* Tab Switcher: Iniciar Sesión vs Registrar Postulante */}
        <div className="flex bg-[#121315] p-1.5 rounded-2xl border border-white/10 mb-6">
          <button
            type="button"
            onClick={() => { setAuthMode('login'); setError(''); }}
            className={`flex-1 py-2.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
              authMode === 'login'
                ? 'bg-slate-800 text-white shadow border border-white/15'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            Iniciar Sesión
          </button>
          <button
            type="button"
            onClick={() => { setAuthMode('register'); setError(''); }}
            className={`flex-1 py-2.5 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center justify-center gap-1.5 ${
              authMode === 'register'
                ? 'bg-gradient-to-r from-[#00c2b2] to-teal-400 text-gray-950 font-black shadow'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <Sparkles size={13} />
            <span>Registrar Postulante</span>
          </button>
        </div>

        {success ? (
          <div className="py-8 text-center space-y-3">
            <div className="w-14 h-14 bg-emerald-500/20 text-emerald-400 rounded-full flex items-center justify-center mx-auto animate-bounce border border-emerald-500/40">
              <CheckCircle size={32} />
            </div>
            <h4 className="text-lg font-bold text-white">
              {authMode === 'register' ? '¡Registro Exitoso!' : '¡Acceso Autorizado!'}
            </h4>
            <p className="text-xs text-slate-300">
              Ingresando al panel correspondiente...
            </p>
          </div>
        ) : authMode === 'login' ? (
          /* FORMULARIO DE INICIO DE SESIÓN */
          <form onSubmit={handleLogin} className="space-y-4">
            {error && (
              <div className="p-3 bg-red-950/70 border border-red-500/50 rounded-xl text-xs text-red-300">
                {error}
              </div>
            )}

            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">RUT de Usuario</label>
              <div className="relative">
                <input
                  type="text"
                  required
                  placeholder="15692858-5, 21778425-5 o 21778425-6"
                  value={rut}
                  onChange={(e) => setRut(e.target.value)}
                  className="w-full bg-[#121315] border border-white/10 rounded-xl pl-10 pr-3.5 py-2.5 text-sm text-white focus:outline-none focus:ring-2 focus:ring-sky-500/40 focus:border-sky-500 font-mono transition-all"
                />
                <User size={16} className="absolute left-3.5 top-3 text-slate-400" />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">Contraseña</label>
              <div className="relative">
                <input
                  type="password"
                  required
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full bg-[#121315] border border-white/10 rounded-xl pl-10 pr-3.5 py-2.5 text-sm text-white focus:outline-none focus:ring-2 focus:ring-sky-500/40 focus:border-sky-500 transition-all"
                />
                <Lock size={16} className="absolute left-3.5 top-3 text-slate-400" />
              </div>
            </div>

            {/* Quick Demo Credentials for the 3 Roles */}
            <div className="p-3.5 bg-[#121315]/80 border border-white/10 rounded-2xl text-[11px] space-y-2">
              <span className="text-slate-400 font-bold block uppercase text-[10px] tracking-wider">Demostración de los 3 Roles:</span>
              <div className="flex flex-col gap-1.5 text-slate-300">
                
                {/* 1. Administrador */}
                <button
                  type="button"
                  onClick={() => handleFillDemo('15692858-5', '15692858')}
                  className="text-left text-purple-300 hover:text-purple-200 hover:underline flex justify-between cursor-pointer p-1 rounded hover:bg-purple-950/40 border border-purple-500/20"
                >
                  <span>👑 Ashley Adaros (ADMINISTRADOR OTEC)</span>
                  <span className="font-mono text-slate-400">15692858-5</span>
                </button>

                {/* 2. Profesor / Docente */}
                <button
                  type="button"
                  onClick={() => handleFillDemo('21778425-5', '21778425')}
                  className="text-left text-sky-300 hover:text-sky-200 hover:underline flex justify-between cursor-pointer p-1 rounded hover:bg-sky-950/40 border border-sky-500/20"
                >
                  <span>👨‍🏫 Sebastián Araya (PROFESOR / DOCENTE)</span>
                  <span className="font-mono text-slate-400">21778425-5</span>
                </button>

                {/* 3. Estudiante */}
                <button
                  type="button"
                  onClick={() => handleFillDemo('21778425-6', '21778425')}
                  className="text-left text-teal-300 hover:text-teal-200 hover:underline flex justify-between cursor-pointer p-1 rounded hover:bg-teal-950/40 border border-teal-500/20"
                >
                  <span>🎓 Matías Silva (ESTUDIANTE / ALUMNO)</span>
                  <span className="font-mono text-slate-400">21778425-6</span>
                </button>

              </div>
            </div>

            <motion.button
              whileHover={{ scale: 1.03, boxShadow: '0 0 20px rgba(2, 132, 199, 0.4)' }}
              whileTap={{ scale: 0.97 }}
              type="submit"
              disabled={loading}
              className="w-full bg-gradient-to-r from-[#0284c7] to-[#0369a1] hover:from-sky-500 hover:to-sky-700 text-white font-bold py-3.5 rounded-xl shadow-xl flex items-center justify-center gap-2 transition-all cursor-pointer border border-sky-400/30"
            >
              {loading ? (
                <span className="flex items-center gap-2">
                  <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  <span>Verificando...</span>
                </span>
              ) : (
                <span>Ingresar al Portal</span>
              )}
              <ExternalLink size={14} />
            </motion.button>
          </form>
        ) : (
          /* FORMULARIO DE REGISTRO RÁPIDO DE POSTULANTE */
          <form onSubmit={handleRegister} className="space-y-3.5">
            {error && (
              <div className="p-3 bg-red-950/70 border border-red-500/50 rounded-xl text-xs text-red-300">
                {error}
              </div>
            )}

            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">Nombre y Apellidos</label>
              <input
                type="text"
                required
                placeholder="Ej: Carlos Vega Ramírez"
                value={regData.nombre}
                onChange={(e) => setRegData({ ...regData, nombre: e.target.value })}
                className="w-full bg-[#121315] border border-white/10 rounded-xl px-3.5 py-2 text-sm text-white focus:outline-none focus:border-teal-400 transition-all"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">RUT</label>
                <input
                  type="text"
                  required
                  placeholder="12345678-9"
                  value={regData.rut}
                  onChange={(e) => setRegData({ ...regData, rut: e.target.value })}
                  className="w-full bg-[#121315] border border-white/10 rounded-xl px-3.5 py-2 text-sm text-white font-mono focus:outline-none focus:border-teal-400 transition-all"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">Teléfono / WhatsApp</label>
                <input
                  type="tel"
                  required
                  placeholder="+56 9 8765 4321"
                  value={regData.telefono}
                  onChange={(e) => setRegData({ ...regData, telefono: e.target.value })}
                  className="w-full bg-[#121315] border border-white/10 rounded-xl px-3.5 py-2 text-sm text-white focus:outline-none focus:border-teal-400 transition-all"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">Correo Electrónico</label>
              <input
                type="email"
                required
                placeholder="postulante@gmail.com"
                value={regData.email}
                onChange={(e) => setRegData({ ...regData, email: e.target.value })}
                className="w-full bg-[#121315] border border-white/10 rounded-xl px-3.5 py-2 text-sm text-white focus:outline-none focus:border-teal-400 transition-all"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">Ciudad de Residencia</label>
                <select
                  value={regData.ciudad}
                  onChange={(e) => setRegData({ ...regData, ciudad: e.target.value })}
                  className="w-full bg-[#121315] border border-white/10 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-teal-400"
                >
                  <option value="Arica">Arica y Parinacota</option>
                  <option value="Iquique">Iquique (Tarapacá)</option>
                  <option value="Antofagasta">Antofagasta</option>
                  <option value="Calama">Calama</option>
                  <option value="Otra">Otra Región</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">Escuela de Interés</label>
                <select
                  value={regData.escuela}
                  onChange={(e) => setRegData({ ...regData, escuela: e.target.value })}
                  className="w-full bg-[#121315] border border-white/10 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-teal-400"
                >
                  <option value="seguridad">Escuela de Seguridad Privada (SPD)</option>
                  <option value="oficios">Escuela de Oficios (30 Días)</option>
                </select>
              </div>
            </div>

            <motion.button
              whileHover={{ scale: 1.03, boxShadow: '0 0 20px rgba(0, 194, 178, 0.4)' }}
              whileTap={{ scale: 0.97 }}
              type="submit"
              disabled={loading}
              className="w-full bg-gradient-to-r from-[#00c2b2] to-teal-400 hover:from-teal-400 hover:to-teal-500 text-gray-950 font-black py-3.5 rounded-xl shadow-xl flex items-center justify-center gap-2 transition-all cursor-pointer mt-2"
            >
              {loading ? (
                <span className="flex items-center gap-2">
                  <span className="w-4 h-4 border-2 border-gray-950 border-t-transparent rounded-full animate-spin" />
                  <span>Creando Cuenta...</span>
                </span>
              ) : (
                <span>Crear Cuenta & Acceder a Descargas</span>
              )}
              <Sparkles size={15} />
            </motion.button>
          </form>
        )}

        <div className="mt-5 pt-3 border-t border-white/10 text-center text-[10px] text-slate-400">
          Tus datos se encuentran resguardados bajo estricta reserva conforme a la Ley N° 19.628 y normativa SENCE.
        </div>
      </motion.div>
    </div>
  );
};


// 3. Modal Buscador Rápido
export const SearchModal = ({ isOpen, onClose, onSelectCourse }) => {
  const [query, setQuery] = useState('');

  const coursesList = [
    { name: '_2_66_2026 Resolución de Conflictos y Manejo de Situaciones Difíciles Código Sence: 1238088725', category: 'Seguridad Privada', price: '$85.000 CLP' },
    { name: 'Operador de Central de Cámaras de Televigilancia. C.C.T.V.', category: 'Seguridad Privada', price: '$140.000 CLP' },
    { name: 'Curso de formación Guardia de Seguridad', category: 'Seguridad Privada', price: '$120.000 CLP' },
    { name: 'Formación de Supervisor de Seguridad Privada *ONLINE*', category: 'Seguridad Privada', price: '$180.000 CLP' },
    { name: 'Capacitación ITIC', category: 'Sistemas internos', price: '$75.000 CLP' },
    { name: 'Asistencia Curso - Código Sence: 1238087964 ID Acción: 6731273', category: 'Asistencias', price: '$60.000 CLP' },
  ];

  if (!isOpen) return null;

  const filtered = coursesList.filter((c) =>
    c.name.toLowerCase().includes(query.toLowerCase()) ||
    c.category.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center p-4 pt-20 bg-black/80 backdrop-blur-md">
      <motion.div 
        initial={{ opacity: 0, scale: 0.95, y: -20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: -20 }}
        transition={{ duration: 0.25 }}
        className="bg-gradient-to-b from-[#18191c] via-[#141518] to-[#101113] border border-white/15 w-full max-w-2xl rounded-3xl shadow-2xl p-6 relative backdrop-blur-2xl"
      >
        <motion.button
          whileHover={{ scale: 1.1, rotate: 90 }}
          whileTap={{ scale: 0.9 }}
          onClick={onClose}
          className="absolute top-4 right-4 text-slate-400 hover:text-white p-2 rounded-full hover:bg-white/10 transition-colors cursor-pointer"
        >
          <X size={20} />
        </motion.button>

        {/* Search input */}
        <div className="relative mb-6">
          <input
            type="text"
            autoFocus
            placeholder="Buscar cursos, especializaciones o requisitos..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="w-full bg-[#121315] border border-white/10 rounded-2xl pl-12 pr-4 py-3.5 text-base text-white focus:outline-none focus:ring-2 focus:ring-cyan-500/40 focus:border-cyan-500 shadow-inner transition-all"
          />
          <Search size={20} className="absolute left-4 top-4 text-slate-400" />
        </div>

        {/* Results */}
        <div className="space-y-2 max-h-80 overflow-y-auto pr-1">
          {filtered.length > 0 ? (
            filtered.map((item, idx) => (
              <motion.div
                key={idx}
                whileHover={{ scale: 1.01, x: 3 }}
                onClick={() => {
                  onSelectCourse(item.name);
                  onClose();
                }}
                className="p-4 rounded-2xl bg-slate-900/60 hover:bg-slate-800/80 border border-white/10 hover:border-[#00c2b2]/40 transition-all cursor-pointer flex items-center justify-between group shadow-sm"
              >
                <div>
                  <div className="text-white text-sm font-semibold group-hover:text-[#00c2b2] transition-colors">
                    {item.name}
                  </div>
                  <div className="text-xs text-slate-400">
                    {item.category}
                  </div>
                </div>
                <span className="text-xs font-bold text-[#0284c7] group-hover:text-sky-300">
                  Ver detalle →
                </span>
              </motion.div>
            ))
          ) : (
            <div className="text-center py-8 text-slate-400 text-sm">
              No se encontraron cursos que coincidan con "<span className="text-white">{query}</span>".
            </div>
          )}
        </div>
      </motion.div>
    </div>
  );
};


// 4. Modal Artículo / Blog
export const ArticleModal = ({ article, onClose, onOpenContact }) => {
  if (!article) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
      <motion.div 
        initial={{ opacity: 0, scale: 0.92, y: 15 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.92, y: 15 }}
        transition={{ duration: 0.3 }}
        className="bg-gradient-to-b from-[#18191c] via-[#141518] to-[#101113] border border-white/15 w-full max-w-2xl rounded-3xl shadow-2xl overflow-hidden p-6 sm:p-8 relative max-h-[90vh] overflow-y-auto backdrop-blur-2xl"
      >
        <motion.button
          whileHover={{ scale: 1.1, rotate: 90 }}
          whileTap={{ scale: 0.9 }}
          onClick={onClose}
          className="absolute top-4 right-4 text-slate-400 hover:text-white p-2 rounded-full hover:bg-white/10 transition-colors z-10 cursor-pointer"
        >
          <X size={20} />
        </motion.button>

        <div className="space-y-6">
          <div className="rounded-2xl overflow-hidden aspect-[16/9] border border-white/10">
            <img src={article.image} alt={article.title} className="w-full h-full object-cover" />
          </div>

          <div className="space-y-2">
            <div className="flex items-center gap-3 text-xs text-slate-400">
              <span className="text-[#00c2b2] font-bold">{article.category}</span>
              <span>•</span>
              <span className="flex items-center gap-1"><Calendar size={12} /> {article.date}</span>
            </div>
            <h2 className="text-2xl font-bold text-white leading-snug">{article.title}</h2>
          </div>

          <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
            {article.summary}
          </p>

          <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
            En <strong className="text-white">PrevySeg Capacitaciones</strong> entregamos una preparación teórico-práctica con instructores de amplia experiencia, garantizando que cada estudiante adquiera las competencias requeridas por la normativa chilena vigente y las demandas de seguridad del entorno laboral en Arica.
          </p>

          <div className="pt-4 border-t border-white/10 flex justify-end gap-3">
            <button
              onClick={onClose}
              className="px-5 py-2.5 rounded-xl border border-white/10 text-slate-300 hover:bg-white/5 text-xs font-semibold cursor-pointer transition-colors"
            >
              Cerrar
            </button>
            <motion.button
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.96 }}
              onClick={() => {
                onClose();
                onOpenContact();
              }}
              className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-[#0284c7] to-[#0369a1] text-white text-xs font-bold cursor-pointer shadow-lg shadow-sky-950/50 border border-sky-400/30"
            >
              Consultar por este Curso
            </motion.button>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

// 5. Modal Ficha de Inscripción & Abono 50% (Pop-up directo)
import EnrollmentForm from './EnrollmentForm';

export const EnrollmentModal = ({ isOpen, onClose, defaultCourse = '' }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 bg-black/85 backdrop-blur-md overflow-y-auto">
      <motion.div 
        initial={{ opacity: 0, scale: 0.93, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.93, y: 20 }}
        transition={{ duration: 0.3, ease: 'easeOut' }}
        className="w-full max-w-5xl my-auto relative max-h-[94vh] overflow-y-auto rounded-3xl"
      >
        {/* Floating Close button */}
        <motion.button
          whileHover={{ scale: 1.1, rotate: 90 }}
          whileTap={{ scale: 0.9 }}
          onClick={onClose}
          className="sticky top-4 right-4 ml-auto z-50 bg-[#121316] text-slate-300 hover:text-white p-2.5 rounded-full border border-white/20 shadow-2xl hover:bg-red-950/80 hover:border-red-500/50 transition-all cursor-pointer flex items-center justify-center"
          title="Cerrar Ficha"
        >
          <X size={20} />
        </motion.button>

        <div className="-mt-12">
          <EnrollmentForm defaultCourseName={defaultCourse} onFinished={onClose} />
        </div>
      </motion.div>
    </div>
  );
};

