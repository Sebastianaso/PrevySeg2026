import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Sparkles, 
  ChevronDown, 
  ChevronUp, 
  FileText, 
  CreditCard, 
  ShieldCheck, 
  CheckCircle2, 
  Zap, 
  PhoneCall, 
  FileSignature
} from 'lucide-react';
import EnrollmentForm from './EnrollmentForm';

const AdmissionSection = ({ defaultSelectedCourse = '', onOpenPlatform }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  // Auto-expand if a course was selected from another section
  useEffect(() => {
    if (defaultSelectedCourse) {
      setIsExpanded(true);
    }
  }, [defaultSelectedCourse]);

  // Global event listener to open admission form from header or hero links
  useEffect(() => {
    const handleOpenAdmission = () => setIsExpanded(true);
    window.addEventListener('open-admission', handleOpenAdmission);
    return () => window.removeEventListener('open-admission', handleOpenAdmission);
  }, []);

  const toggleExpand = () => {
    setIsExpanded(prev => !prev);
  };

  return (
    <section id="admision" className="py-20 px-4 sm:px-8 bg-slate-50 relative border-t border-slate-200 overflow-hidden">
      
      {/* Decorative Glow Elements */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-gradient-to-r from-teal-500/5 via-sky-500/5 to-transparent blur-[140px] pointer-events-none" />
      <div className="absolute bottom-10 right-10 w-96 h-96 bg-cyan-500/5 blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto space-y-10 relative z-10">
        
        {/* ================= 1. ENCABEZADO DE SECCIÓN ================= */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-teal-50 border border-teal-200 text-teal-800 text-xs font-black tracking-wide uppercase shadow-sm">
            <Sparkles size={14} className="text-teal-600" />
            <span>Ficha de Inscripción Digital • Convocatoria 2026</span>
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-slate-900 tracking-tight leading-tight">
            Portal de <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#0284c7] via-sky-600 to-[#00c2b2]">Admisión & Abono del 50%</span>
          </h2>

          <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
            Completa tu <strong className="text-slate-900">Ficha de Inscripción</strong> en línea basada en nuestro formato oficial, abona el <strong className="text-[#0284c7]">50% de tu cupo</strong> mediante tarjeta o transferencia, y nos pondremos en contacto contigo por <strong className="text-emerald-700">WhatsApp</strong> para la recepción de tus documentos.
          </p>

          {/* ================= BOTÓN PRINCIPAL: "INSCRIBIRSE" ================= */}
          <div className="pt-4 flex flex-col items-center justify-center gap-4">
            <motion.button
              type="button"
              id="btn-inscribirse-toggle"
              onClick={toggleExpand}
              whileHover={{ scale: 1.04, boxShadow: '0 10px 30px rgba(0, 194, 178, 0.35)' }}
              whileTap={{ scale: 0.96 }}
              className={`group relative inline-flex items-center gap-3 px-8 sm:px-10 py-4 rounded-2xl font-black text-base sm:text-lg transition-all duration-300 shadow-xl cursor-pointer select-none ${
                isExpanded
                  ? 'bg-slate-900 hover:bg-slate-800 text-white border border-slate-700 shadow-slate-900/20'
                  : 'bg-gradient-to-r from-[#00c2b2] via-teal-500 to-[#0284c7] hover:from-teal-500 hover:to-sky-600 text-white border border-teal-300/40 shadow-teal-500/30'
              }`}
            >
              {isExpanded ? (
                <>
                  <ChevronUp size={22} className="text-teal-400 group-hover:-translate-y-1 transition-transform" />
                  <span>Ocultar Ficha de Inscripción</span>
                </>
              ) : (
                <>
                  <FileSignature size={22} className="text-teal-100" />
                  <span className="tracking-wide">Inscribirse</span>
                  <ChevronDown size={22} className="text-white group-hover:translate-y-1 transition-transform animate-bounce" />
                </>
              )}
            </motion.button>

            {/* Quick Benefits Preview Tags */}
            {!isExpanded && (
              <motion.div 
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4 }}
                className="flex flex-wrap items-center justify-center gap-4 sm:gap-6 pt-2 text-xs text-slate-600 font-medium"
              >
                <div className="flex items-center gap-1.5 bg-white px-3 py-1.5 rounded-lg border border-slate-200 shadow-xs">
                  <Zap size={14} className="text-amber-500" />
                  <span>Proceso 100% Online</span>
                </div>
                <div className="flex items-center gap-1.5 bg-white px-3 py-1.5 rounded-lg border border-slate-200 shadow-xs">
                  <CreditCard size={14} className="text-[#0284c7]" />
                  <span>Abono 50% Tarjeta o Transferencia</span>
                </div>
                <div className="flex items-center gap-1.5 bg-white px-3 py-1.5 rounded-lg border border-slate-200 shadow-xs">
                  <ShieldCheck size={14} className="text-emerald-600" />
                  <span>Validación Oficial Inmediata</span>
                </div>
              </motion.div>
            )}
          </div>
        </div>

        {/* ================= 2. CONTENIDO DESPLEGABLE DE LA FICHA ================= */}
        <AnimatePresence>
          {isExpanded && (
            <motion.div
              key="admission-form-wrapper"
              initial={{ opacity: 0, height: 0, y: -20 }}
              animate={{ opacity: 1, height: 'auto', y: 0 }}
              exit={{ opacity: 0, height: 0, y: -20 }}
              transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
              className="overflow-hidden"
            >
              <div className="pt-2">
                <EnrollmentForm defaultCourseName={defaultSelectedCourse} />
              </div>

              {/* Botón inferior para cerrar o contraer */}
              <div className="text-center pt-8 pb-4">
                <button
                  type="button"
                  onClick={() => {
                    setIsExpanded(false);
                    const el = document.getElementById('admision');
                    if (el) el.scrollIntoView({ behavior: 'smooth' });
                  }}
                  className="inline-flex items-center gap-2 px-6 py-2.5 rounded-xl bg-white hover:bg-slate-100 text-slate-700 hover:text-slate-900 border border-slate-300 text-xs font-bold transition-all shadow-sm cursor-pointer"
                >
                  <ChevronUp size={16} />
                  <span>Cerrar Ficha de Admisión</span>
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

      </div>

    </section>
  );
};

export default AdmissionSection;

