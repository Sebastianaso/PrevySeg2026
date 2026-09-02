import React from 'react';
import { 
  Award, 
  ArrowRight, 
  Edit3
} from 'lucide-react';
import { COURSES_DATA } from '../../components/Services';

const CoursesView = ({ onSelectCourse, isEditMode }) => {
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
            Catálogo Oficial de Cursos SENCE
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

      {/* Grid of Courses */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {COURSES_DATA.map((course) => (
          <div
            key={course.id}
            onClick={() => onSelectCourse(course.title)}
            className="bg-[#121316] border border-gray-800 hover:border-gray-700 rounded-2xl overflow-hidden shadow-lg transition-all duration-300 cursor-pointer flex flex-col justify-between group hover:-translate-y-1"
          >
            <div>
              {/* Category Badge Header */}
              <div className="bg-gray-900 p-3.5 border-b border-gray-800 flex justify-between items-center">
                <span className="text-[11px] font-bold bg-[#0f2942] text-white px-2.5 py-0.5 rounded border border-white/10">
                  {course.category}
                </span>
                <span className="text-xs font-bold text-[#00c2b2]">
                  {course.price}
                </span>
              </div>

              {/* Title Only */}
              <div className="p-5">
                <h3 className="text-sm font-semibold text-white leading-snug group-hover:text-[#00c2b2] transition-colors line-clamp-3">
                  {course.title}
                </h3>
              </div>
            </div>

            {/* Bottom Row */}
            <div className="p-4 pt-3 border-t border-gray-800 bg-gray-950/40 flex items-center justify-between">
              <span className="text-xs text-emerald-400 font-medium">
                {course.priceDetail}
              </span>
              <span className="text-xs font-bold text-[#0284c7] group-hover:text-sky-300 flex items-center gap-1 group-hover:translate-x-1 transition-transform">
                Ver Curso <ArrowRight size={13} />
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CoursesView;
