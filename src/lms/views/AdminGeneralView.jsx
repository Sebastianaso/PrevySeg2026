import React, { useState } from 'react';
import { 
  ShieldCheck, 
  Users, 
  BookOpen, 
  FileCheck, 
  Activity, 
  Server, 
  Award, 
  Download, 
  ChevronRight, 
  Database,
  Lock,
  Search,
  ExternalLink
} from 'lucide-react';

const AdminGeneralView = ({ onNavigateSubtab }) => {
  const [activeSubSection, setActiveSubSection] = useState('resumen');

  const adminStats = [
    { label: 'Total Alumnos SENCE', value: '5,240', detail: '+120 este mes', icon: Users, color: 'text-[#0284c7]', bg: 'bg-sky-950/60' },
    { label: 'Cursos Activos OS-10', value: '18', detail: '6 en fiscalización', icon: BookOpen, color: 'text-[#00c2b2]', bg: 'bg-teal-950/60' },
    { label: 'Tasa de Aprobación', value: '98.4%', detail: 'Estándar Directemar / OS-10', icon: Award, color: 'text-emerald-400', bg: 'bg-emerald-950/60' },
    { label: 'Estado del Servidor LMS', value: 'Operativo', detail: 'Latencia 18ms', icon: Activity, color: 'text-amber-400', bg: 'bg-amber-950/60' },
  ];

  const adminModules = [
    {
      id: 'usuarios',
      title: 'Gestión de Usuarios y Matrículas SENCE',
      description: 'Crear, suspender o editar perfiles de alumnos, docentes y fiscalizadores OS-10.',
      actionLabel: 'Ver Participantes',
      targetTab: 'participantes',
    },
    {
      id: 'cursos',
      title: 'Catálogo de Cursos y Estructura Curricular',
      description: 'Configurar cohortes, códigos SENCE, límites de subida y formato por temas didácticos.',
      actionLabel: 'Configurar Cursos',
      targetTab: 'configuracion',
    },
    {
      id: 'informes',
      title: 'Auditoría, Asistencia y Reportes Oficiales',
      description: 'Generar libros de notas, registros sincrónicos con marcas de tiempo y certificados.',
      actionLabel: 'Ver Informes',
      targetTab: 'informes',
    },
    {
      id: 'reactivos',
      title: 'Banco de Preguntas y Contenidos SCORM',
      description: 'Gestionar reactivos para exámenes oficiales y paquetes interactivos H5P.',
      actionLabel: 'Banco de Preguntas',
      targetTab: 'preguntas',
    },
  ];

  return (
    <div className="space-y-8 animate-in fade-in duration-200">
      
      {/* Encabezado */}
      <div className="bg-gray-900/60 p-6 rounded-2xl border border-gray-800 backdrop-blur-md flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
              Panel de Administración OTEC
            </h1>
            <span className="bg-purple-950/80 text-purple-300 text-xs font-bold px-3 py-0.5 rounded-full border border-purple-700/50">
              Superusuario
            </span>
          </div>
          <p className="text-xs sm:text-sm text-gray-400 mt-1">
            Control maestro de la plataforma virtual PrevySeg, fiscalización SENCE y Carabineros de Chile.
          </p>
        </div>

        <button 
          onClick={() => alert("Generando informe global de auditoría SENCE...")}
          className="bg-[#0284c7] hover:bg-[#0369a1] text-white text-xs font-bold px-4 py-2.5 rounded-xl shadow-lg flex items-center gap-2 cursor-pointer"
        >
          <Download size={15} />
          <span>Reporte Maestro (PDF)</span>
        </button>
      </div>

      {/* Tarjetas de Métricas de Administración */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {adminStats.map((stat, idx) => {
          const IconComp = stat.icon;
          return (
            <div key={idx} className="bg-[#121316] p-5 rounded-2xl border border-gray-800 shadow-xl flex items-center gap-4">
              <div className={`w-12 h-12 rounded-xl ${stat.bg} ${stat.color} flex items-center justify-center flex-shrink-0 border border-white/5`}>
                <IconComp size={24} />
              </div>
              <div>
                <div className="text-2xl font-black text-white">{stat.value}</div>
                <div className="text-xs font-semibold text-gray-300">{stat.label}</div>
                <div className="text-[10px] text-gray-500">{stat.detail}</div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Módulos de Administración Rápida */}
      <div className="bg-[#121316] rounded-2xl border border-gray-800 p-6 sm:p-8 space-y-6 shadow-xl">
        <h2 className="text-lg font-bold text-white tracking-wide border-b border-gray-800 pb-3">
          Módulos de Gestión y Configuración
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {adminModules.map((mod) => (
            <div 
              key={mod.id}
              className="p-5 rounded-xl bg-[#18191c] border border-gray-800/80 hover:border-gray-700 transition-all flex flex-col justify-between space-y-4 group"
            >
              <div className="space-y-2">
                <h3 className="text-base font-bold text-white group-hover:text-[#38bdf8] transition-colors">
                  {mod.title}
                </h3>
                <p className="text-xs text-gray-400 leading-relaxed">
                  {mod.description}
                </p>
              </div>

              <div className="pt-2 border-t border-gray-800 flex justify-end">
                <button
                  onClick={() => onNavigateSubtab && onNavigateSubtab(mod.targetTab)}
                  className="text-xs font-bold text-[#00c2b2] hover:text-teal-300 flex items-center gap-1.5 cursor-pointer"
                >
                  <span>{mod.actionLabel}</span>
                  <ChevronRight size={14} />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
};

export default AdminGeneralView;
