import React from 'react';
import { motion } from 'framer-motion';
import { Award, Users, ShieldCheck, Building2 } from 'lucide-react';

const StatsSection = () => {
  const stats = [
    {
      number: '+15',
      label: 'Años de Experiencia',
      detail: 'Liderando en la ciudad de Arica',
      icon: Award,
      color: 'text-[#0284c7]',
      border: 'border-sky-500/30',
      bg: 'bg-sky-500/15',
    },
    {
      number: '+5.000',
      label: 'Alumnos Egresados',
      detail: 'Certificados y en funciones activas',
      icon: Users,
      color: 'text-[#00c2b2]',
      border: 'border-teal-500/30',
      bg: 'bg-teal-500/15',
    },
    {
      number: '100%',
      label: 'Acreditación Oficial',
      detail: 'Cursos aprobados por SENCE y OS-10',
      icon: ShieldCheck,
      color: 'text-[#22c55e]',
      border: 'border-emerald-500/30',
      bg: 'bg-emerald-500/15',
    },
    {
      number: '+50',
      label: 'Empresas Aliadas',
      detail: 'Convenios laborales en la región',
      icon: Building2,
      color: 'text-[#f59e0b]',
      border: 'border-amber-500/30',
      bg: 'bg-amber-500/15',
    },
  ];

  return (
    <section className="py-16 px-4 sm:px-8 bg-gradient-to-r from-[#141518] via-[#121316] to-[#141518] text-white border-y border-white/10 shadow-2xl relative z-10 backdrop-blur-xl">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((stat, idx) => {
            const IconComp = stat.icon;
            return (
              <motion.div 
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: idx * 0.08 }}
                whileHover={{ y: -4, scale: 1.02 }}
                className="flex items-center gap-5 p-5 rounded-2xl bg-[#16171a]/90 backdrop-blur-md border border-white/10 shadow-xl hover:shadow-2xl hover:border-cyan-500/30 transition-all duration-300"
              >
                <div className={`w-14 h-14 rounded-2xl flex items-center justify-center ${stat.bg} ${stat.color} ${stat.border} border flex-shrink-0 shadow-lg`}>
                  <IconComp size={28} />
                </div>
                <div>
                  <div className="text-3xl sm:text-4xl font-black tracking-tight text-white">
                    {stat.number}
                  </div>
                  <div className="text-sm font-bold text-slate-200 leading-tight">
                    {stat.label}
                  </div>
                  <div className="text-xs text-slate-400 font-medium">
                    {stat.detail}
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default StatsSection;
