import React, { useState } from 'react';
import { 
  Award, 
  CheckCircle2, 
  Clock, 
  Search, 
  Filter, 
  FileCheck2, 
  Download, 
  Send, 
  Eye, 
  X, 
  ShieldCheck, 
  UserCheck, 
  AlertCircle,
  QrCode,
  Printer,
  Mail,
  Check
} from 'lucide-react';

/////AGREGAR BASE DE DATOS/DOMINIO AQUI///
const API_BASE_URL = "/////AGREGAR BASE DE DATOS/DOMINIO AQUI///";
const SENDER_EMAIL_DEFAULT = "///CORREO REMITENTE///"; // Correo oficial emisor PrevySeg (ej: prevyseg.capacitaciones@gmail.com)

export const INITIAL_STUDENT_APPROVALS = [
  {
    id: 'app-01',
    rut: '21.778.425-6',
    studentName: 'Matías Silva Lagos',
    studentEmail: 'matias.silva.alumno@prevyseg.cl', // ///CORREO DE RECEPCION///
    course: 'Curso de formación Guardia de Seguridad',
    senceCode: '1238087964',
    category: 'Seguridad Privada OS-10',
    hours: '90 Horas Cronológicas',
    completionDate: '01 Septiembre, 2026',
    attendance: '100% Asistencia Registrada',
    requirementsStatus: 'Documentación Legal Completa (4to Medio, Antecedentes, Médico)',
    status: 'APROBADO', // 'PENDIENTE' | 'APROBADO'
    certificateCode: 'PREVY-2026-OS10-0987',
    approvedBy: 'Ashley Adaros (Director Académico)',
    approvalDate: '02 Septiembre, 2026',
    emailDispatched: true,
    emailDispatchedAt: '02/09/2026 10:15 hrs'
  },
  {
    id: 'app-02',
    rut: '18.442.119-3',
    studentName: 'Carlos Mendoza Rojas',
    studentEmail: 'carlos.mendoza.seg@gmail.com', // ///CORREO DE RECEPCION///
    course: 'Operador de Central de Cámaras de Televigilancia. C.C.T.V.',
    senceCode: '1238087964',
    category: 'Seguridad Privada',
    hours: '40 Horas',
    completionDate: '30 Agosto, 2026',
    attendance: '98% Asistencia Registrada',
    requirementsStatus: 'Documentación Validada',
    status: 'PENDIENTE',
    certificateCode: 'PREVY-2026-CCTV-0512',
    approvedBy: null,
    approvalDate: null,
    emailDispatched: false,
    emailDispatchedAt: null
  },
  {
    id: 'app-03',
    rut: '19.821.340-K',
    studentName: 'Valeska Torres Contreras',
    studentEmail: 'valeska.torres.arica@hotmail.com', // ///CORREO DE RECEPCION///
    course: 'Formación de Supervisor de Seguridad Privada *ONLINE*',
    senceCode: '1238088725',
    category: 'Seguridad Privada',
    hours: '60 Horas',
    completionDate: '28 Agosto, 2026',
    attendance: '100% Asistencia Registrada',
    requirementsStatus: 'Documentación Legal Completa',
    status: 'APROBADO',
    certificateCode: 'PREVY-2026-SUP-0331',
    approvedBy: 'Sebastián Araya (Coordinador OS-10)',
    approvalDate: '29 Agosto, 2026',
    emailDispatched: true,
    emailDispatchedAt: '29/08/2026 16:40 hrs'
  },
  {
    id: 'app-04',
    rut: '16.732.901-4',
    studentName: 'Rodrigo Fuentes Morales',
    studentEmail: 'rodrigo.fuentes.itic@gmail.com', // ///CORREO DE RECEPCION///
    course: 'Capacitación ITIC',
    senceCode: '123801204',
    category: 'Sistemas internos',
    hours: '20 Horas',
    completionDate: '25 Agosto, 2026',
    attendance: '100% Asistencia Registrada',
    requirementsStatus: 'Documentación TI Validada',
    status: 'PENDIENTE',
    certificateCode: 'PREVY-2026-ITIC-0209',
    approvedBy: null,
    approvalDate: null,
    emailDispatched: false,
    emailDispatchedAt: null
  }
];

export const CertificateApprovalView = ({ currentUser }) => {
  const [approvals, setApprovals] = useState(INITIAL_STUDENT_APPROVALS);
  const [search, setSearch] = useState('');
  const [filterStatus, setFilterStatus] = useState('TODOS');
  const [selectedForPreview, setSelectedForPreview] = useState(null);
  const [selectedForEmailModal, setSelectedForEmailModal] = useState(null);
  const [isSendingEmail, setIsSendingEmail] = useState(false);
  const [emailSentSuccess, setEmailSentSuccess] = useState(false);
  const [actionSuccessMsg, setActionSuccessMsg] = useState('');

  const filtered = approvals.filter(item => {
    const matchesSearch = item.studentName.toLowerCase().includes(search.toLowerCase()) ||
                          item.rut.toLowerCase().includes(search.toLowerCase()) ||
                          item.course.toLowerCase().includes(search.toLowerCase()) ||
                          item.studentEmail.toLowerCase().includes(search.toLowerCase());
    const matchesStatus = filterStatus === 'TODOS' || item.status === filterStatus;
    return matchesSearch && matchesStatus;
  });

  // Función al dar el Visto Bueno administrativo y disparar el envío del correo
  const handleApproveAndDispatchEmail = (studentItem) => {
    setSelectedForEmailModal(studentItem);
    setIsSendingEmail(true);

    // Simulación del servicio de correo con ///CORREO REMITENTE/// y ///CORREO DE RECEPCION///
    setTimeout(() => {
      // Marcamos en el estado local como APROBADO y correo despachado
      setApprovals(prev => prev.map(item => {
        if (item.id === studentItem.id) {
          return {
            ...item,
            status: 'APROBADO',
            approvedBy: currentUser?.nombre || 'Ashley Adaros (Director Académico)',
            approvalDate: '02 Septiembre, 2026',
            emailDispatched: true,
            emailDispatchedAt: '02/09/2026 ' + new Date().toLocaleTimeString().slice(0, 5) + ' hrs'
          };
        }
        return item;
      }));

      setIsSendingEmail(false);
      setEmailSentSuccess(true);
      setActionSuccessMsg(`¡Visto bueno otorgado y correo enviado con éxito a ${studentItem.studentEmail}!`);
    }, 1200);
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-200">
      
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-950 via-slate-900 to-gray-900 p-6 sm:p-8 rounded-3xl border border-sky-900/40 shadow-xl flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
        <div className="space-y-2">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#0284c7]/20 text-[#38bdf8] text-xs font-bold border border-[#0284c7]/30">
            <Award size={14} />
            <span>Panel Administrativo de Verificación y Emisión</span>
          </div>
          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-white tracking-tight">
            Aprobación y Emisión de Certificados Oficiales
          </h1>
          <p className="text-xs sm:text-sm text-gray-300 max-w-2xl leading-relaxed">
            Al otorgar el <strong>visto bueno administrativo</strong>, se emite el certificado oficial de cumplimiento y se despacha automáticamente una <strong>copia digital en PDF al correo del estudiante</strong> registrado en la plataforma.
          </p>
        </div>

        {/* Action success alert */}
        {actionSuccessMsg && (
          <div className="bg-emerald-950/80 border border-emerald-500 text-emerald-300 text-xs font-bold p-3 rounded-xl flex items-center gap-2 animate-in fade-in shadow-lg">
            <CheckCircle2 size={16} />
            <span>{actionSuccessMsg}</span>
          </div>
        )}
      </div>

      {/* Filter and Search Bar */}
      <div className="flex flex-col sm:flex-row justify-between items-center gap-4 bg-[#121316] p-4 rounded-2xl border border-gray-800">
        <div className="flex items-center gap-2 w-full sm:w-auto">
          {['TODOS', 'PENDIENTE', 'APROBADO'].map(st => (
            <button
              key={st}
              onClick={() => setFilterStatus(st)}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                filterStatus === st
                  ? 'bg-[#00c2b2] text-gray-950 shadow'
                  : 'bg-gray-800 text-gray-400 hover:text-white'
              }`}
            >
              {st === 'TODOS' ? 'Todos' : st === 'PENDIENTE' ? 'Pendientes de Aprobación' : 'Emitidos / Despachados'}
            </button>
          ))}
        </div>

        <div className="relative w-full sm:w-80">
          <input
            type="text"
            placeholder="Buscar por RUT, correo o alumno..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full bg-[#18191c] border border-gray-700 rounded-xl pl-10 pr-4 py-2 text-xs text-white placeholder-gray-500 focus:outline-none focus:border-[#00c2b2]"
          />
          <Search size={15} className="absolute left-3.5 top-2.5 text-gray-400" />
        </div>
      </div>

      {/* Table of Students for Approval & Email Dispatch */}
      <div className="bg-[#121316] rounded-2xl border border-gray-800 overflow-hidden shadow-xl">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-[#0f1012] border-b border-gray-800 text-gray-400 uppercase tracking-wider text-[10px] font-bold">
              <tr>
                <th className="py-4 px-6">Alumno & Correo de Recepción</th>
                <th className="py-4 px-6">Capacitación Finalizada</th>
                <th className="py-4 px-4">Cumplimiento SENCE</th>
                <th className="py-4 px-4">Estado & Despacho</th>
                <th className="py-4 px-6 text-right">Acciones de Aprobación</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-800/60 text-gray-300">
              {filtered.map((item) => (
                <tr key={item.id} className="hover:bg-gray-800/30 transition-colors">
                  
                  {/* Student & Email */}
                  <td className="py-4 px-6">
                    <div className="font-bold text-white text-sm">{item.studentName}</div>
                    <div className="font-mono text-gray-400 text-[11px]">{item.rut}</div>
                    <div className="text-[11px] text-sky-400 flex items-center gap-1 mt-0.5 font-mono">
                      <Mail size={11} />
                      <span>{item.studentEmail}</span>
                    </div>
                  </td>

                  {/* Course */}
                  <td className="py-4 px-6 max-w-xs">
                    <div className="font-semibold text-gray-200 line-clamp-2">{item.course}</div>
                    <div className="text-[10px] text-gray-400 font-mono mt-0.5">SENCE: {item.senceCode} • {item.hours}</div>
                  </td>

                  {/* Compliance */}
                  <td className="py-4 px-4">
                    <div className="text-emerald-400 font-bold flex items-center gap-1">
                      <CheckCircle2 size={13} />
                      <span>{item.attendance}</span>
                    </div>
                    <div className="text-[10px] text-gray-400">{item.requirementsStatus}</div>
                  </td>

                  {/* Status & Email Dispatch Badge */}
                  <td className="py-4 px-4 space-y-1">
                    {item.status === 'APROBADO' ? (
                      <div>
                        <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 text-[10px] font-bold border border-emerald-500/40">
                          <CheckCircle2 size={12} />
                          <span>Aprobado & Emitido</span>
                        </span>
                        {item.emailDispatched && (
                          <div className="text-[10px] text-emerald-400 flex items-center gap-1 mt-1 font-mono">
                            <Mail size={10} />
                            <span>Enviado al correo</span>
                          </div>
                        )}
                      </div>
                    ) : (
                      <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-amber-500/20 text-amber-300 text-[10px] font-bold border border-amber-500/40">
                        <Clock size={12} />
                        <span>Pendiente Visto Bueno</span>
                      </span>
                    )}
                  </td>

                  {/* Actions */}
                  <td className="py-4 px-6 text-right space-x-2">
                    <button
                      onClick={() => setSelectedForPreview(item)}
                      className="px-3 py-1.5 rounded-lg bg-gray-800 hover:bg-gray-700 text-gray-200 text-xs font-bold cursor-pointer transition-colors inline-flex items-center gap-1.5"
                    >
                      <Eye size={13} />
                      <span>Ver Diploma</span>
                    </button>

                    {item.status === 'PENDIENTE' ? (
                      <button
                        onClick={() => handleApproveAndDispatchEmail(item)}
                        className="px-3.5 py-1.5 rounded-lg bg-[#00c2b2] hover:bg-[#08978a] active:scale-95 text-gray-950 text-xs font-black cursor-pointer transition-all inline-flex items-center gap-1.5 shadow-md shadow-teal-950/40"
                      >
                        <UserCheck size={14} />
                        <span>Dar Visto Bueno & Enviar</span>
                      </button>
                    ) : (
                      <button
                        onClick={() => handleApproveAndDispatchEmail(item)}
                        className="px-3 py-1.5 rounded-lg bg-gray-800 hover:bg-gray-700 text-sky-300 hover:text-white text-xs font-bold cursor-pointer transition-colors inline-flex items-center gap-1.5"
                        title="Reenviar copia digital por correo"
                      >
                        <Send size={12} />
                        <span>Reenviar Correo</span>
                      </button>
                    )}
                  </td>

                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* MODAL DE DESPACHO DE CORREO AUTOMÁTICO (///CORREO REMITENTE/// -> ///CORREO DE RECEPCION///) */}
      {selectedForEmailModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-in fade-in duration-200">
          <div className="bg-[#18191c] border-2 border-sky-500/60 w-full max-w-lg rounded-3xl shadow-2xl p-6 sm:p-8 relative">
            <button
              onClick={() => {
                setSelectedForEmailModal(null);
                setEmailSentSuccess(false);
              }}
              className="absolute top-4 right-4 text-gray-400 hover:text-white p-2 rounded-full hover:bg-gray-800 transition-colors cursor-pointer"
            >
              <X size={20} />
            </button>

            {isSendingEmail ? (
              <div className="py-10 text-center space-y-4">
                <div className="w-14 h-14 border-4 border-[#00c2b2] border-t-transparent rounded-full animate-spin mx-auto"></div>
                <h3 className="text-lg font-bold text-white">Generando y Despachando Certificado Digital...</h3>
                <p className="text-xs text-gray-400">
                  Enviando desde <strong className="text-sky-400 font-mono">{SENDER_EMAIL_DEFAULT}</strong> hacia <strong className="text-teal-300 font-mono">{selectedForEmailModal.studentEmail}</strong>...
                </p>
              </div>
            ) : emailSentSuccess ? (
              <div className="py-6 text-center space-y-5">
                <div className="w-16 h-16 bg-emerald-500/20 text-emerald-400 rounded-full flex items-center justify-center mx-auto animate-bounce">
                  <CheckCircle2 size={36} />
                </div>
                
                <div className="space-y-1">
                  <h3 className="text-xl font-black text-white">¡Visto Bueno y Correo Enviado!</h3>
                  <p className="text-xs text-gray-300">
                    Se ha enviado la copia digital oficial del diploma a la casilla del estudiante.
                  </p>
                </div>

                {/* Email dispatch details */}
                <div className="bg-[#121316] p-4 rounded-2xl border border-gray-800 text-left text-xs space-y-2 font-mono text-gray-300">
                  <div className="flex justify-between border-b border-gray-800 pb-1.5 text-[11px]">
                    <span className="text-gray-500">De (Remitente):</span>
                    <span className="text-sky-300">{SENDER_EMAIL_DEFAULT}</span>
                  </div>
                  <div className="flex justify-between border-b border-gray-800 pb-1.5 text-[11px]">
                    <span className="text-gray-500">Para (Recepción):</span>
                    <span className="text-emerald-300 font-bold">{selectedForEmailModal.studentEmail}</span>
                  </div>
                  <div className="flex justify-between border-b border-gray-800 pb-1.5 text-[11px]">
                    <span className="text-gray-500">Asunto:</span>
                    <span className="text-white">🎓 Certificado Oficial - {selectedForEmailModal.course}</span>
                  </div>
                  <div className="flex justify-between text-[11px] pt-0.5">
                    <span className="text-gray-500">Adjunto:</span>
                    <span className="text-sky-400 font-bold">Diploma_Oficial_{selectedForEmailModal.certificateCode}.pdf</span>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() => {
                    setSelectedForEmailModal(null);
                    setEmailSentSuccess(false);
                  }}
                  className="w-full bg-[#0284c7] hover:bg-[#0369a1] text-white font-bold py-2.5 px-4 rounded-xl text-xs cursor-pointer transition-colors"
                >
                  Entendido / Cerrar
                </button>
              </div>
            ) : null}
          </div>
        </div>
      )}

      {/* MODAL DE PREVISUALIZACIÓN DE DIPLOMA OFICIAL (SIN NOTAS / CONFIDENCIALIDAD TOTAL) */}
      {selectedForPreview && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-in fade-in duration-200">
          <div className="bg-[#18191c] border-2 border-sky-500/60 w-full max-w-3xl rounded-3xl shadow-2xl overflow-hidden p-6 sm:p-8 relative max-h-[94vh] overflow-y-auto">
            
            <button
              onClick={() => setSelectedForPreview(null)}
              className="absolute top-4 right-4 text-gray-400 hover:text-white p-2 rounded-full hover:bg-gray-800 transition-colors z-20 cursor-pointer"
            >
              <X size={20} />
            </button>

            {/* Official Diploma Frame */}
            <div className="bg-[#121316] border-2 border-[#0284c7]/50 rounded-3xl p-6 sm:p-8 relative shadow-2xl text-white space-y-6 overflow-hidden">
              
              {/* Header OTEC */}
              <div className="flex flex-col sm:flex-row justify-between items-center pb-6 border-b border-gray-800 gap-4 text-center sm:text-left">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-[#0284c7] to-[#00c2b2] flex items-center justify-center text-white font-black text-xl shadow-lg">
                    PS
                  </div>
                  <div>
                    <h3 className="text-xl font-black tracking-tight">PREVYSEG CAPACITACIONES</h3>
                    <p className="text-[11px] text-gray-400 uppercase font-semibold">
                      Organismo Técnico de Capacitación • NCh 2728 • SENCE
                    </p>
                  </div>
                </div>

                <div className="text-right">
                  <span className="text-[11px] text-gray-400 block">Registro Oficial OTEC</span>
                  <span className="text-xs font-mono font-bold text-sky-400">N° 1238088725</span>
                </div>
              </div>

              {/* Certificate Body (Sin puntaje, confidencialidad estricta) */}
              <div className="space-y-4 text-center sm:text-left">
                <p className="text-xs uppercase text-gray-400 font-semibold tracking-wider">
                  El Organismo Técnico de Capacitación PrevySeg certifica formalmente que:
                </p>
                <h4 className="text-2xl sm:text-3xl font-black text-white text-[#00c2b2]">
                  {selectedForPreview.studentName}
                </h4>
                <p className="text-xs font-mono text-gray-300">
                  RUT: <strong className="text-white font-bold">{selectedForPreview.rut}</strong> • Correo: <strong className="text-sky-300">{selectedForPreview.studentEmail}</strong>
                </p>

                <p className="text-xs text-gray-300 pt-2 leading-relaxed">
                  Ha completado satisfactoriamente la totalidad de las horas de instrucción, contenidos teóricos y prácticos exigidos conforme al <strong>Decreto Ley N° 3.607</strong> y normativa de Carabineros de Chile OS-10, acreditando que <strong>se encuentra debidamente capacitado(a) para desempeñarse en el área de:</strong>
                </p>

                <div className="p-4 bg-black/40 rounded-xl border border-gray-800">
                  <h5 className="text-base sm:text-lg font-extrabold text-white">
                    {selectedForPreview.course}
                  </h5>
                  <p className="text-xs text-sky-400 font-semibold mt-1">
                    Código SENCE: {selectedForPreview.senceCode} • Carga Horaria: {selectedForPreview.hours}
                  </p>
                </div>
              </div>

              {/* Metadata Grid (Sin nota numérica) */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2 text-xs">
                <div className="bg-gray-900/60 p-3 rounded-xl border border-gray-800">
                  <span className="text-gray-500 block text-[10px] font-bold uppercase">Fecha de Finalización</span>
                  <span className="text-white font-semibold">{selectedForPreview.completionDate}</span>
                </div>
                <div className="bg-gray-900/60 p-3 rounded-xl border border-gray-800">
                  <span className="text-gray-500 block text-[10px] font-bold uppercase">Acreditación Académica</span>
                  <span className="text-emerald-400 font-bold">Aprobado y Capacitado ✓</span>
                </div>
                <div className="bg-gray-900/60 p-3 rounded-xl border border-gray-800">
                  <span className="text-gray-500 block text-[10px] font-bold uppercase">Código Registro</span>
                  <span className="text-white font-mono">{selectedForPreview.certificateCode}</span>
                </div>
              </div>

              {/* Signatures & Footer */}
              <div className="pt-6 border-t border-gray-800 flex flex-col sm:flex-row justify-between items-center gap-6">
                
                <div className="flex items-center gap-3 bg-white p-2.5 rounded-xl text-gray-950">
                  <div className="w-14 h-14 bg-slate-100 border border-slate-300 rounded flex items-center justify-center text-slate-800">
                    <QrCode size={42} />
                  </div>
                  <div className="text-[10px] leading-tight space-y-0.5">
                    <strong className="block font-black text-slate-900">CERTIFICADO OFICIAL</strong>
                    <span className="text-slate-600 font-mono text-[9px] block">OTEC PrevySeg</span>
                    <span className="text-emerald-700 font-bold block">✓ Visto Bueno Dirección</span>
                  </div>
                </div>

                <div className="flex gap-6 text-center text-[11px] text-gray-400">
                  <div className="space-y-1">
                    <div className="w-32 border-b border-gray-600 pb-1 font-serif italic text-sky-300 text-xs">
                      Ashley Adaros G.
                    </div>
                    <span className="block text-[10px] font-bold text-gray-300">Director Académico</span>
                    <span className="block text-[9px] text-gray-500">PrevySeg OTEC</span>
                  </div>

                  <div className="space-y-1">
                    <div className="w-32 border-b border-gray-600 pb-1 font-serif italic text-teal-300 text-xs">
                      Sebastián Araya O.
                    </div>
                    <span className="block text-[10px] font-bold text-gray-300">Coordinador OS-10</span>
                    <span className="block text-[9px] text-gray-500">Instructor Acreditado</span>
                  </div>
                </div>

              </div>

            </div>

            {/* Actions */}
            <div className="flex justify-end gap-3 pt-4">
              <button
                type="button"
                onClick={() => setSelectedForPreview(null)}
                className="px-4 py-2 rounded-xl border border-gray-700 text-gray-300 hover:bg-gray-800 text-xs font-semibold cursor-pointer"
              >
                Cerrar
              </button>

              <button
                type="button"
                onClick={handlePrint}
                className="px-5 py-2 rounded-xl bg-[#0284c7] hover:bg-[#0369a1] text-white text-xs font-bold shadow flex items-center gap-2 cursor-pointer"
              >
                <Printer size={15} />
                <span>Imprimir / Guardar Copia PDF</span>
              </button>
            </div>

          </div>
        </div>
      )}

    </div>
  );
};
export default CertificateApprovalView;
