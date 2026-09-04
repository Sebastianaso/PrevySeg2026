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
      <div className="bg-gradient-to-r from-sky-50 via-teal-50 to-white p-6 sm:p-8 rounded-3xl border border-sky-200 shadow-sm flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
        <div className="space-y-2">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-sky-100 text-[#0284c7] text-xs font-bold border border-sky-200">
            <Award size={14} />
            <span>Organismo Técnico de Capacitación (OTEC)</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900">
            Catálogo Oficial de Cursos SENCE
          </h2>
          <p className="text-sm text-slate-600 max-w-2xl">
            Bienvenido al entorno virtual de formación. Selecciona un curso para gestionar participantes, revisar configuraciones del aula o consultar informes de avance.
          </p>
        </div>

        {isEditMode && (
          <button 
            onClick={() => alert("Crear nueva cohorte o curso SENCE")}
            className="bg-[#0284c7] hover:bg-[#0369a1] text-white text-xs font-bold px-5 py-3 rounded-xl shadow-md flex items-center gap-2 cursor-pointer flex-shrink-0"
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
            className="bg-white border border-slate-200 hover:border-sky-400 rounded-2xl overflow-hidden shadow-sm transition-all duration-300 cursor-pointer flex flex-col justify-between group hover:-translate-y-1 hover:shadow-md"
          >
            <div>
              {/* Category Badge Header */}
              <div className="bg-slate-50 p-3.5 border-b border-slate-200 flex justify-between items-center">
                <span className="text-[11px] font-bold bg-sky-50 text-sky-700 px-2.5 py-0.5 rounded border border-sky-200">
                  {course.category}
                </span>
                <span className="text-xs font-bold text-teal-700">
                  {course.price}
                </span>
              </div>

              {/* Title Only */}
              <div className="p-5">
                <h3 className="text-sm font-semibold text-slate-900 leading-snug group-hover:text-[#0284c7] transition-colors line-clamp-3">
                  {course.title}
                </h3>
              </div>
            </div>

            {/* Bottom Row */}
            <div className="p-4 pt-3 border-t border-slate-100 bg-slate-50/50 flex items-center justify-between">
              <span className="text-xs text-emerald-700 font-medium">
                {course.priceDetail}
              </span>
              <span className="text-xs font-bold text-[#0284c7] group-hover:text-sky-600 flex items-center gap-1 group-hover:translate-x-1 transition-transform">
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
