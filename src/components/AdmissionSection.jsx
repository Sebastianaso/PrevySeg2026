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
    <section id="admision" className="py-20 px-4 sm:px-8 bg-slate-50 relative border-t border-slate-200 overflow-hidden">
      
      {/* Decorative Glow Elements */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-gradient-to-r from-teal-500/5 via-sky-500/5 to-transparent blur-[140px] pointer-events-none" />
      <div className="absolute bottom-10 right-10 w-96 h-96 bg-cyan-500/5 blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto space-y-12 relative z-10">
        
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
        </div>

        {/* ================= 2. FORMULARIO INTERACTIVO COMPLETO ================= */}
        <EnrollmentForm defaultCourseName={defaultSelectedCourse} />

      </div>

    </section>
  );
};

export default AdmissionSection;

