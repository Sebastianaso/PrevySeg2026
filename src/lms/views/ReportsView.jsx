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
      title: 'Libro de calificaciones del curso y ponderaciones SPD (Subsecretaría de Prevención del Delito)',
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
      title: 'Informe de auditoría técnica y supervisión SENCE & SPD',
      description: 'Reporte estandarizado para fiscalizadores de la Subsecretaría de Prevención del Delito (SPD) y OTEC.',
      icon: ShieldCheck,
    },
  ];

  return (
    <div className="space-y-6">
      
      {/* Header */}
      <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h2 className="text-xl font-black text-slate-900 tracking-tight">Informes y Auditoría del Curso</h2>
          <p className="text-xs text-slate-600 mt-1">
            Consulta registros de trazabilidad, libro de notas y reportes reglamentarios SENCE.
          </p>
        </div>

        <button 
          onClick={() => alert("Descargando paquete consolidado de informes en ZIP...")}
          className="bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-bold px-4 py-2.5 rounded-xl border border-slate-300 flex items-center gap-2 transition-all cursor-pointer shadow-sm"
        >
          <Download size={15} className="text-sky-600" />
          <span>Descargar Todo (ZIP)</span>
        </button>
      </div>

      {/* Reports Card Container */}
      <div className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 shadow-sm">
        <h3 className="text-xs font-black text-slate-500 uppercase tracking-wider mb-6 pb-3 border-b border-slate-200">
          Informes Disponibles
        </h3>

        <div className="space-y-3">
          {reportsList.map((report) => {
            const IconComponent = report.icon;
            return (
              <div
                key={report.id}
                onClick={() => alert(`Generando informe: "${report.title}" para fiscalización SENCE.`)}
                className="p-4 rounded-xl bg-slate-50 hover:bg-sky-50/60 border border-slate-200 hover:border-sky-300 transition-all cursor-pointer flex items-start justify-between group shadow-sm"
              >
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-xl bg-sky-100 border border-sky-200 flex items-center justify-center text-sky-700 flex-shrink-0 mt-0.5 group-hover:scale-105 transition-transform shadow-xs">
                    <IconComponent size={20} />
                  </div>
                  <div>
                    <div className="text-sm sm:text-base font-bold text-slate-900 group-hover:text-sky-700 transition-colors flex items-center gap-2">
                      <span>{report.title}</span>
                    </div>
                    <p className="text-xs text-slate-600 mt-1 leading-relaxed">
                      {report.description}
                    </p>
                  </div>
                </div>

                <div className="text-slate-400 group-hover:text-sky-600 transition-colors pt-1">
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
