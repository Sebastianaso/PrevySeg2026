import React from 'react';
import { Award, Users, ShieldCheck, Building2 } from 'lucide-react';

const StatsSection = () => {
  const stats = [
    {
      number: '+15',
      label: 'Años de Experiencia',
      detail: 'Liderando en la ciudad de Arica',
      icon: Award,
      color: 'text-[#0284c7]',
      bg: 'bg-sky-500/10',
    },
    {
      number: '+5,000',
      label: 'Alumnos Egresados',
      detail: 'Certificados y en funciones activas',
      icon: Users,
      color: 'text-[#00c2b2]',
      bg: 'bg-teal-500/10',
    },
    {
      number: '100%',
      label: 'Acreditación Oficial',
      detail: 'Cursos aprobados por SENCE y OS-10',
      icon: ShieldCheck,
      color: 'text-[#16a34a]',
      bg: 'bg-emerald-500/10',
    },
    {
      number: '+50',
      label: 'Empresas Aliadas',
      detail: 'Convenios laborales en la región',
      icon: Building2,
      color: 'text-[#d97706]',
      bg: 'bg-amber-500/10',
    },
  ];

  return (
    <section className="py-16 px-4 sm:px-8 bg-gradient-to-r from-gray-100 via-slate-100 to-gray-200 text-gray-900 border-y border-gray-300 shadow-inner relative z-10">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {stats.map((stat, idx) => {
            const IconComp = stat.icon;
            return (
              <div 
                key={idx}
                className="flex items-center gap-5 p-4 rounded-xl bg-white/70 backdrop-blur-sm border border-gray-300/60 shadow-sm hover:shadow-md transition-shadow duration-300"
              >
                <div className={`w-14 h-14 rounded-2xl flex items-center justify-center ${stat.bg} ${stat.color} flex-shrink-0 shadow-inner`}>
                  <IconComp size={28} />
                </div>
                <div>
                  <div className="text-3xl sm:text-4xl font-black tracking-tight text-gray-950">
                    {stat.number}
                  </div>
                  <div className="text-sm font-bold text-gray-800 leading-tight">
                    {stat.label}
                  </div>
                  <div className="text-[11px] text-gray-600 font-medium">
                    {stat.detail}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default StatsSection;
