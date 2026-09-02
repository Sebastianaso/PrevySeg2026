import React from 'react';
import { 
  Award, 
  ShieldCheck, 
  CheckCircle2, 
  Building2, 
  HelpCircle,
  FileCheck2
} from 'lucide-react';

export const SenceTramosSection = () => {
  const tramos = [
    {
      pct: '100% SENCE',
      utm: 'Hasta 25 UTM',
      desc: 'Financiamiento total sin costo para la empresa en remuneraciones hasta 25 UTM.',
      isHighlighted: false,
      borderClass: 'border-gray-800 bg-[#121316] hover:border-gray-700',
      textClass: 'text-white'
    },
    {
      pct: '50% SENCE',
      utm: '25 a 50 UTM',
      desc: 'Cubre el 50% del valor hora SENCE para trabajadores en tramo medio.',
      isHighlighted: true,
      borderClass: 'border-[#00c2b2] bg-[#00c2b2]/10 shadow-lg shadow-teal-950/40',
      textClass: 'text-[#00c2b2]'
    },
    {
      pct: '15% SENCE',
      utm: 'Sobre 50 UTM',
      desc: 'Aporte del 15% imputable al impuesto corporativo para rentas superiores.',
      isHighlighted: false,
      borderClass: 'border-gray-800 bg-[#121316] hover:border-gray-700',
      textClass: 'text-white'
    },
    {
      pct: 'Pago Directo',
      utm: 'Desc. Volumen',
      desc: 'Convenios corporativos y aranceles preferenciales por cantidad de alumnos.',
      isHighlighted: false,
      borderClass: 'border-gray-800 bg-[#121316] hover:border-gray-700',
      textClass: 'text-white'
    }
  ];

  return (
    <div className="bg-[#121316] border border-gray-800/80 rounded-3xl p-6 sm:p-8 mt-12 space-y-6">
      
      {/* Section Subheader */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 border-b border-gray-800/80 pb-5">
        <div className="space-y-1">
          <div className="inline-flex items-center gap-2 px-3 py-0.5 rounded-full bg-sky-500/20 text-[#38bdf8] text-[11px] font-bold border border-sky-500/30">
            <Award size={13} />
            <span>Afiliación y Registro OTEC SENCE #1238088725</span>
          </div>
          <h3 className="text-lg sm:text-xl font-black text-white tracking-tight">
            Tramo de Franquicia Tributaria SENCE:
          </h3>
          <p className="text-xs sm:text-sm text-gray-400">
            Beneficio tributario normado por la Ley N° 19.518 que permite a las empresas capacitar a sus guardias y personal de seguridad deduciendo los costos de sus impuestos.
          </p>
        </div>

        <div className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-gray-900 border border-gray-800 text-xs text-gray-300 flex-shrink-0">
          <ShieldCheck size={16} className="text-[#00c2b2]" />
          <span className="font-semibold">NCh 2728 Certificada</span>
        </div>
      </div>

      {/* 4 Tramos Cards Grid (matching screenshot) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {tramos.map((tramo, idx) => (
          <div
            key={idx}
            className={`p-5 rounded-2xl border transition-all duration-300 flex flex-col justify-between group hover:-translate-y-1 ${tramo.borderClass}`}
          >
            <div className="space-y-1.5">
              <h4 className={`text-lg sm:text-xl font-black tracking-tight ${tramo.textClass}`}>
                {tramo.pct}
              </h4>
              <div className="text-xs font-mono font-bold text-gray-400">
                {tramo.utm}
              </div>
            </div>

            <p className="text-[11px] text-gray-400 leading-relaxed pt-3 border-t border-gray-800/60 mt-3">
              {tramo.desc}
            </p>
          </div>
        ))}
      </div>

      {/* Footer Info Note */}
      <div className="flex items-center gap-2 text-[11px] text-gray-400 pt-1">
        <CheckCircle2 size={14} className="text-emerald-400 flex-shrink-0" />
        <span>Todos los cursos de PrevySeg cuentan con código SENCE activo y registro validado ante Carabineros de Chile OS-10.</span>
      </div>

    </div>
  );
};

export default SenceTramosSection;
