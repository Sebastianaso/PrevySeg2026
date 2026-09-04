import React from 'react';
import { motion } from 'framer-motion';
import { 
  Award, 
  ShieldCheck, 
  CheckCircle2, 
  Building2, 
  HelpCircle,
  FileCheck2,
  Sparkles
} from 'lucide-react';

export const SenceTramosSection = () => {
  const tramos = [
    {
      pct: '100% SENCE',
      utm: 'Hasta 25 UTM',
      desc: 'Financiamiento total sin costo para la empresa en remuneraciones hasta 25 UTM.',
      isHighlighted: false,
      borderClass: 'border-slate-200 bg-white hover:border-emerald-500/40 hover:shadow-emerald-500/10',
      textClass: 'text-emerald-600'
    },
    {
      pct: '50% SENCE',
      utm: '25 a 50 UTM',
      desc: 'Cubre el 50% del valor hora SENCE para trabajadores en tramo medio.',
      isHighlighted: true,
      borderClass: 'border-[#0284c7] bg-gradient-to-b from-sky-50 to-white shadow-xl shadow-sky-500/10',
      textClass: 'text-[#0284c7]'
    },
    {
      pct: '15% SENCE',
      utm: 'Sobre 50 UTM',
      desc: 'Aporte del 15% imputable al impuesto corporativo para rentas superiores.',
      isHighlighted: false,
      borderClass: 'border-slate-200 bg-white hover:border-sky-500/40 hover:shadow-sky-500/10',
      textClass: 'text-sky-600'
    },
    {
      pct: 'Pago Directo',
      utm: 'Desc. Volumen',
      desc: 'Convenios corporativos y aranceles preferenciales por cantidad de alumnos.',
      isHighlighted: false,
      borderClass: 'border-slate-200 bg-white hover:border-amber-500/40 hover:shadow-amber-500/10',
      textClass: 'text-amber-600'
    }
  ];

  return (
    <motion.div 
      initial={{ opacity: 0, y: 25 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      className="bg-slate-50 border border-slate-200 rounded-3xl p-6 sm:p-8 mt-12 space-y-6 shadow-xl"
    >
      
      {/* Section Subheader */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 border-b border-slate-200 pb-5">
        <div className="space-y-1.5">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-sky-50 text-[#0284c7] text-[11px] font-bold border border-sky-200">
            <Award size={13} className="text-[#0284c7]" />
            <span>Afiliación y Registro OTEC SENCE #1238088725</span>
          </div>
          <h3 className="text-lg sm:text-xl font-black text-slate-900 tracking-tight flex items-center gap-2">
            <span>Tramos de Franquicia Tributaria SENCE</span>
            <Sparkles size={16} className="text-amber-500" />
          </h3>
          <p className="text-xs sm:text-sm text-slate-600 max-w-3xl leading-relaxed">
            Beneficio tributario normado por la Ley N° 19.518 que permite a las empresas capacitar a sus guardias y personal de seguridad deduciendo los costos del impuesto a la renta.
          </p>
        </div>

        <div className="flex items-center gap-2 px-3.5 py-2 rounded-xl bg-white border border-slate-200 text-xs text-slate-700 flex-shrink-0 shadow-sm">
          <ShieldCheck size={16} className="text-[#0284c7]" />
          <span className="font-semibold">NCh 2728 Certificada</span>
        </div>
      </div>

      {/* 4 Tramos Cards Grid with Staggered Framer Motion */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {tramos.map((tramo, idx) => (
          <motion.div
            key={idx}
            whileHover={{ y: -4, scale: 1.02 }}
            transition={{ duration: 0.2 }}
            className={`p-6 rounded-2xl border transition-all duration-300 flex flex-col justify-between group shadow-md ${tramo.borderClass}`}
          >
            <div className="space-y-1.5">
              <h4 className={`text-xl sm:text-2xl font-black tracking-tight ${tramo.textClass}`}>
                {tramo.pct}
              </h4>
              <div className="text-xs font-mono font-bold text-slate-500">
                {tramo.utm}
              </div>
            </div>

            <p className="text-xs text-slate-600 leading-relaxed pt-3 border-t border-slate-100 mt-4">
              {tramo.desc}
            </p>
          </motion.div>
        ))}
      </div>

      {/* Footer Info Note */}
      <div className="flex items-center gap-2 text-xs text-slate-600 pt-1">
        <CheckCircle2 size={15} className="text-emerald-600 flex-shrink-0" />
        <span>Todos los cursos de PrevySeg cuentan con código SENCE activo y registro validado ante la Subsecretaría de Prevención del Delito (SPD).</span>
      </div>

    </motion.div>
  );
};

export default SenceTramosSection;
