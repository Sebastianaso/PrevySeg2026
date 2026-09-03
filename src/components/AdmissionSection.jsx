import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  FileCheck2, 
  ExternalLink, 
  Download, 
  UploadCloud, 
  CheckCircle2, 
  AlertCircle, 
  ShieldCheck, 
  KeyRound, 
  FileText, 
  Sparkles, 
  Eye, 
  Printer, 
  X, 
  Building2, 
  ChevronRight, 
  Lock, 
  ArrowRight, 
  Shield, 
  Zap, 
  Award, 
  Users, 
  Check,
  CreditCard,
  Phone,
  DollarSign
} from 'lucide-react';
import EnrollmentForm, { OFFICIAL_COURSES, OFFICIAL_DOCUMENTS } from './EnrollmentForm';

const AdmissionSection = ({ defaultSelectedCourse = '', onOpenPlatform }) => {
  return (
    <section id="admision" className="py-20 px-4 sm:px-8 bg-gradient-to-b from-[#18191c] via-[#101113] to-[#18191c] relative border-t border-white/10 overflow-hidden">
      
      {/* Decorative Glow Elements */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-gradient-to-r from-teal-500/10 via-sky-500/10 to-transparent blur-[140px] pointer-events-none" />
      <div className="absolute bottom-10 right-10 w-96 h-96 bg-cyan-500/10 blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto space-y-12 relative z-10">
        
        {/* ================= 1. ENCABEZADO DE SECCIÓN ================= */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#00c2b2]/20 border border-[#00c2b2]/50 text-[#00c2b2] text-xs font-black tracking-wide uppercase shadow-lg shadow-teal-950/50">
            <Sparkles size={14} className="animate-spin" />
            <span>Ficha de Inscripción Digital • Convocatoria 2026</span>
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight leading-tight">
            Portal de <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#38bdf8] via-[#00c2b2] to-teal-200">Admisión & Abono del 50%</span>
          </h2>

          <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
            Completa tu <strong className="text-white">Ficha de Inscripción</strong> en línea basada en nuestro formato oficial, abona el <strong className="text-[#00c2b2]">50% de tu cupo</strong> mediante tarjeta o transferencia, y nos pondremos en contacto contigo por <strong className="text-emerald-400">WhatsApp</strong> para la recepción de tus documentos.
          </p>
        </div>

        {/* ================= 2. FORMULARIO INTERACTIVO COMPLETO ================= */}
        <EnrollmentForm defaultCourseName={defaultSelectedCourse} />

      </div>

    </section>
  );
};

export default AdmissionSection;

