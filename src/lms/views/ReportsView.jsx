import React from 'react';
import { 
  FileText, 
  BarChart3, 
  Activity, 
  CheckSquare, 
  Award, 
  ExternalLink, 
  Clock, 
  Download,
  ShieldCheck
} from 'lucide-react';

const ReportsView = () => {
  const reportsList = [
    {
      id: 'rep-01',
      title: 'Registro de accesos y asistencia sincrónica SENCE',
      description: 'Informe con marcas horarias oficiales exigidas por la normativa SENCE para cursos e-learning.',
      icon: Clock,
    },
    {
      id: 'rep-02',
      title: 'Informe de finalización del curso y estado de aprobación',
      description: 'Resumen consolidado de alumnos que cumplen con el 100% de actividades y requisitos de evaluación.',
      icon: CheckSquare,
    },
    {
      id: 'rep-03',
      title: 'Libro de calificaciones del curso y ponderaciones OS-10',
      description: 'Planilla detallada con notas teóricas, exámenes prácticos y promedio final de la cohorte.',
      icon: Award,
    },
    {
      id: 'rep-04',
      title: 'Registros en vivo (Live logs del sistema)',
      description: 'Monitoreo en tiempo real de interacciones, descargas de material y envío de evaluaciones.',
      icon: Activity,
    },
    {
      id: 'rep-05',
      title: 'Participación en actividades y foros de debate',
      description: 'Métricas de participación individual por módulo didáctico.',
      icon: BarChart3,
    },
    {
      id: 'rep-06',
      title: 'Informe de auditoría técnica y supervisión SENCE',
      description: 'Reporte estandarizado para fiscalizadores de Carabineros de Chile y OTEC.',
      icon: ShieldCheck,
    },
  ];

  return (
    <div className="space-y-6">
      
      {/* Header */}
      <div className="bg-gray-900/60 p-5 rounded-2xl border border-gray-800 backdrop-blur-md flex justify-between items-center">
        <div>
          <h2 className="text-xl font-bold text-white tracking-wide">Informes y Auditoría del Curso</h2>
          <p className="text-xs text-gray-400 mt-1">
            Consulta registros de trazabilidad, libro de notas y reportes reglamentarios SENCE.
          </p>
        </div>

        <button 
          onClick={() => alert("Descargando paquete consolidado de informes en ZIP...")}
          className="bg-gray-800 hover:bg-gray-700 text-gray-200 text-xs font-semibold px-4 py-2.5 rounded-lg border border-gray-700 flex items-center gap-2 transition-all cursor-pointer"
        >
          <Download size={15} />
          <span>Descargar Todo (ZIP)</span>
        </button>
      </div>

      {/* Dark Card with Vertical List of Light Blue Links */}
      <div className="bg-[#121316] rounded-2xl border border-gray-800 p-6 sm:p-8 shadow-xl">
        <h3 className="text-sm font-bold text-gray-400 uppercase tracking-wider mb-6 pb-3 border-b border-gray-800">
          Informes Disponibles
        </h3>

        <div className="space-y-4">
          {reportsList.map((report) => {
            const IconComponent = report.icon;
            return (
              <div
                key={report.id}
                onClick={() => alert(`Generando informe: "${report.title}" para fiscalización SENCE.`)}
                className="p-4 rounded-xl bg-[#18191c] hover:bg-gray-800/80 border border-gray-800/80 hover:border-sky-500/40 transition-all cursor-pointer flex items-start justify-between group shadow-sm"
              >
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-xl bg-sky-950/60 border border-sky-600/30 flex items-center justify-center text-[#38bdf8] flex-shrink-0 mt-0.5 group-hover:scale-105 transition-transform">
                    <IconComponent size={20} />
                  </div>
                  <div>
                    {/* Light Blue Link Title matching prompt */}
                    <div className="text-sm sm:text-base font-semibold text-[#38bdf8] group-hover:text-[#7dd3fc] group-hover:underline transition-colors flex items-center gap-2">
                      <span>{report.title}</span>
                    </div>
                    <p className="text-xs text-gray-400 mt-1 leading-relaxed">
                      {report.description}
                    </p>
                  </div>
                </div>

                <div className="text-gray-500 group-hover:text-sky-400 transition-colors pt-1">
                  <ExternalLink size={16} />
                </div>
              </div>
            );
          })}
        </div>
      </div>

    </div>
  );
};

export default ReportsView;
