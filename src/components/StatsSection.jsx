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
      border: 'border-sky-200',
      bg: 'bg-sky-50',
    },
    {
      number: '+5.000',
      label: 'Alumnos Egresados',
      detail: 'Certificados y en funciones activas',
      icon: Users,
      color: 'text-teal-600',
      border: 'border-teal-200',
      bg: 'bg-teal-50',
    },
    {
      number: '100%',
      label: 'Acreditación Oficial',
      detail: 'Cursos aprobados por SENCE y SPD (Subsecretaría de Prevención del Delito)',
      icon: ShieldCheck,
      color: 'text-emerald-600',
      border: 'border-emerald-200',
      bg: 'bg-emerald-50',
    },
    {
      number: '+50',
      label: 'Empresas Aliadas',
      detail: 'Convenios laborales en la región',
      icon: Building2,
      color: 'text-amber-600',
      border: 'border-amber-200',
      bg: 'bg-amber-50',
    },
  ];

  return (
    <section className="py-16 px-4 sm:px-8 bg-slate-50 border-y border-slate-200 shadow-sm relative z-10">
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
                className="flex items-center gap-5 p-5 rounded-2xl bg-white border border-slate-200 shadow-md hover:shadow-xl hover:border-sky-300 transition-all duration-300"
              >
                <div className={`w-14 h-14 rounded-2xl flex items-center justify-center ${stat.bg} ${stat.color} ${stat.border} border flex-shrink-0 shadow-sm`}>
                  <IconComp size={28} />
                </div>
                <div>
                  <div className="text-3xl sm:text-4xl font-black tracking-tight text-slate-900">
                    {stat.number}
                  </div>
                  <div className="text-sm font-bold text-slate-800 leading-tight">
                    {stat.label}
                  </div>
                  <div className="text-xs text-slate-500 font-medium">
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
