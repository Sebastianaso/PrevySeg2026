import React from 'react';
import { 
  BookOpen, 
  Clock, 
  Award, 
  Users, 
  ArrowRight, 
  Tag, 
  ShieldCheck, 
  ExternalLink,
  Edit3
} from 'lucide-react';
import heroGrad from '../../assets/images/hero_graduation.jpg';
import promoImg from '../../assets/images/security_promo.jpg';
import blogCctv from '../../assets/images/blog_cctv.jpg';
import blogPort from '../../assets/images/blog_port_security.jpg';

const CoursesView = ({ onSelectCourse, isEditMode }) => {
  const courses = [
    {
      id: 'crs-os10-formacion',
      title: 'Curso de Formación de Guardias de Seguridad - OS10',
      category: 'SEGURIDAD PRIVADA',
      senceCode: '123800456',
      registrationNumber: 'REG-2026-AR-091',
      hours: '90 Horas Cronológicas',
      enrolledCount: 32,
      activeCohort: 'Cohorte Agosto - Septiembre 2026',
      image: heroGrad,
      status: 'En progreso',
      badgeColor: 'bg-[#0284c7]',
    },
    {
      id: 'crs-os10-perfeccionamiento',
      title: 'Perfeccionamiento de Guardias de Seguridad - OS10',
      category: 'PERFECCIONAMIENTO',
      senceCode: '123800789',
      registrationNumber: 'REG-2026-AR-114',
      hours: '36 Horas Cronológicas',
      enrolledCount: 24,
      activeCohort: 'Cohorte Septiembre 2026',
      image: promoImg,
      status: 'Matrículas abiertas',
      badgeColor: 'bg-emerald-600',
    },
    {
      id: 'crs-cctv-tecnologia',
      title: 'Técnicas de Operación de Circuitos Cerrados de TV (CCTV)',
      category: 'TECNOLOGÍA & CCTV',
      senceCode: '123800992',
      registrationNumber: 'REG-2026-AR-205',
      hours: '60 Horas Cronológicas',
      enrolledCount: 18,
      activeCohort: 'Cohorte Especialización 2026',
      image: blogCctv,
      status: 'En progreso',
      badgeColor: 'bg-indigo-600',
    },
    {
      id: 'crs-maritimo-portuario',
      title: 'Guardia de Seguridad Marítimo Portuario (Directemar)',
      category: 'SEGURIDAD PORTUARIA',
      senceCode: '123801204',
      registrationNumber: 'REG-2026-AR-330',
      hours: '120 Horas Cronológicas',
      enrolledCount: 15,
      activeCohort: 'Cohorte Puerto Arica 2026',
      image: blogPort,
      status: 'Próximo inicio',
      badgeColor: 'bg-amber-600',
    },
  ];

  return (
    <div className="space-y-8">
      {/* Banner / Header */}
      <div className="bg-gradient-to-r from-blue-950/80 via-slate-900 to-gray-900 p-6 sm:p-8 rounded-3xl border border-blue-800/40 shadow-xl flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
        <div className="space-y-2">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-sky-500/20 text-[#38bdf8] text-xs font-bold border border-sky-500/30">
            <Award size={14} />
            <span>Organismo Técnico de Capacitación (OTEC)</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-white">
            Página Principal de Cursos SENCE
          </h2>
          <p className="text-sm text-gray-300 max-w-2xl">
            Bienvenido al entorno virtual de formación. Selecciona un curso para gestionar participantes, revisar configuraciones del aula o consultar informes de avance.
          </p>
        </div>

        {isEditMode && (
          <button 
            onClick={() => alert("Crear nueva cohorte o curso SENCE")}
            className="bg-[#0284c7] hover:bg-[#0369a1] text-white text-xs font-bold px-5 py-3 rounded-xl shadow-lg flex items-center gap-2 cursor-pointer flex-shrink-0"
          >
            <Edit3 size={15} />
            <span>Crear Nuevo Curso</span>
          </button>
        )}
      </div>

      {/* Grid de Tarjetas de Cursos */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8">
        {courses.map((course) => (
          <div
            key={course.id}
            className="bg-[#121316] rounded-2xl overflow-hidden border border-gray-800 hover:border-gray-700 transition-all duration-300 shadow-xl flex flex-col justify-between group hover:-translate-y-1"
          >
            {/* Top Media Frame */}
            <div className="relative aspect-[16/8] overflow-hidden bg-gray-950">
              <img
                src={course.image}
                alt={course.title}
                className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-500 opacity-80"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#121316] via-transparent to-black/60"></div>
              
              {/* Category Tag */}
              <div className="absolute top-4 left-4">
                <span className={`${course.badgeColor} text-white text-[10px] font-black tracking-wider uppercase px-3 py-1 rounded-full shadow-md`}>
                  {course.category}
                </span>
              </div>

              {/* Status Badge */}
              <div className="absolute top-4 right-4">
                <span className="bg-black/70 backdrop-blur-sm text-gray-200 text-[11px] font-semibold px-2.5 py-1 rounded-lg border border-white/10 flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-emerald-400"></span>
                  {course.status}
                </span>
              </div>
            </div>

            {/* Content Body */}
            <div className="p-6 space-y-4 flex-1 flex flex-col justify-between">
              <div className="space-y-3">
                <h3 className="text-xl font-bold text-white group-hover:text-[#00c2b2] transition-colors leading-snug">
                  {course.title}
                </h3>

                {/* Technical Metadata (Sence Code & Registration) */}
                <div className="grid grid-cols-2 gap-3 pt-2 text-xs border-y border-gray-800/80 py-3 text-gray-300 font-medium">
                  <div>
                    <span className="text-gray-500 block text-[10px] uppercase font-bold">Código SENCE:</span>
                    <strong className="text-gray-100 font-mono">{course.senceCode}</strong>
                  </div>
                  <div>
                    <span className="text-gray-500 block text-[10px] uppercase font-bold">N° Registro OTEC:</span>
                    <strong className="text-gray-100 font-mono">{course.registrationNumber}</strong>
                  </div>
                  <div className="flex items-center gap-1.5 text-gray-400">
                    <Clock size={13} className="text-[#0284c7]" />
                    <span>{course.hours}</span>
                  </div>
                  <div className="flex items-center gap-1.5 text-gray-400">
                    <Users size={13} className="text-[#00c2b2]" />
                    <span>{course.enrolledCount} Matriculados</span>
                  </div>
                </div>
              </div>

              {/* CTA */}
              <div className="pt-4 flex items-center justify-between">
                <span className="text-xs text-gray-500 font-medium">
                  {course.activeCohort}
                </span>
                <button
                  onClick={() => onSelectCourse(course)}
                  className="bg-[#0284c7] hover:bg-[#0369a1] active:scale-95 text-white text-xs font-bold px-4 py-2.5 rounded-lg shadow flex items-center gap-2 transition-all cursor-pointer"
                >
                  <span>Gestionar Curso</span>
                  <ArrowRight size={14} />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CoursesView;
