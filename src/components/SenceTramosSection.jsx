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
      borderClass: 'border-white/10 bg-[#121315]/90 hover:border-emerald-500/40 hover:shadow-emerald-950/40',
      textClass: 'text-emerald-400'
    },
    {
      pct: '50% SENCE',
      utm: '25 a 50 UTM',
      desc: 'Cubre el 50% del valor hora SENCE para trabajadores en tramo medio.',
      isHighlighted: true,
      borderClass: 'border-[#00c2b2]/50 bg-gradient-to-b from-[#00c2b2]/15 to-[#121315] shadow-xl shadow-teal-950/50',
      textClass: 'text-[#00c2b2]'
    },
    {
      pct: '15% SENCE',
      utm: 'Sobre 50 UTM',
      desc: 'Aporte del 15% imputable al impuesto corporativo para rentas superiores.',
      isHighlighted: false,
      borderClass: 'border-white/10 bg-[#121315]/90 hover:border-sky-500/40 hover:shadow-sky-950/40',
      textClass: 'text-sky-400'
    },
    {
      pct: 'Pago Directo',
      utm: 'Desc. Volumen',
      desc: 'Convenios corporativos y aranceles preferenciales por cantidad de alumnos.',
      isHighlighted: false,
      borderClass: 'border-white/10 bg-[#121315]/90 hover:border-amber-500/40 hover:shadow-amber-950/40',
      textClass: 'text-amber-400'
    }
  ];

  return (
    <motion.div 
      initial={{ opacity: 0, y: 25 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      className="bg-gradient-to-br from-[#151619] via-[#121316] to-[#0e0f11] border border-white/10 rounded-3xl p-6 sm:p-8 mt-12 space-y-6 shadow-2xl backdrop-blur-xl"
    >
      
      {/* Section Subheader */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 border-b border-white/10 pb-5">
        <div className="space-y-1.5">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-sky-950/80 text-[#38bdf8] text-[11px] font-bold border border-sky-500/40 backdrop-blur-md">
            <Award size={13} className="text-cyan-400" />
            <span>Afiliación y Registro OTEC SENCE #1238088725</span>
          </div>
          <h3 className="text-lg sm:text-xl font-black text-white tracking-tight flex items-center gap-2">
            <span>Tramos de Franquicia Tributaria SENCE</span>
            <Sparkles size={16} className="text-amber-400" />
          </h3>
          <p className="text-xs sm:text-sm text-slate-400 max-w-3xl leading-relaxed">
            Beneficio tributario normado por la Ley N° 19.518 que permite a las empresas capacitar a sus guardias y personal de seguridad deduciendo los costos del impuesto a la renta.
          </p>
        </div>

        <div className="flex items-center gap-2 px-3.5 py-2 rounded-xl bg-slate-900/80 border border-white/10 text-xs text-slate-300 flex-shrink-0 shadow-md">
          <ShieldCheck size={16} className="text-[#00c2b2]" />
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
            className={`p-6 rounded-2xl border transition-all duration-300 flex flex-col justify-between group shadow-lg ${tramo.borderClass}`}
          >
            <div className="space-y-1.5">
              <h4 className={`text-xl sm:text-2xl font-black tracking-tight ${tramo.textClass}`}>
                {tramo.pct}
              </h4>
              <div className="text-xs font-mono font-bold text-slate-400">
                {tramo.utm}
              </div>
            </div>

            <p className="text-xs text-slate-400 leading-relaxed pt-3 border-t border-white/10 mt-4">
              {tramo.desc}
            </p>
          </motion.div>
        ))}
      </div>

      {/* Footer Info Note */}
      <div className="flex items-center gap-2 text-xs text-slate-400 pt-1">
        <CheckCircle2 size={15} className="text-emerald-400 flex-shrink-0" />
        <span>Todos los cursos de PrevySeg cuentan con código SENCE activo y registro validado ante Carabineros de Chile OS-10.</span>
      </div>

    </motion.div>
  );
};

export default SenceTramosSection;
