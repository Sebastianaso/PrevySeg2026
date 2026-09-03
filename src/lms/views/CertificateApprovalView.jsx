import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
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
    category: 'Seguridad Privada SPD (Subsecretaría de Prevención del Delito)',
    hours: '90 Horas Cronológicas',
    completionDate: '01 Septiembre, 2026',
    attendance: '100% Asistencia Registrada',
    requirementsStatus: 'Documentación Legal Completa (4to Medio, Antecedentes, Médico)',
    status: 'APROBADO', // 'PENDIENTE' | 'APROBADO'
    certificateCode: 'PREVY-2026-SPD-0987',
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
    approvedBy: 'Sebastián Araya (Coordinador SPD)',
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
    <div className="space-y-8">
      
      {/* Header */}
      <motion.div 
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-gradient-to-r from-blue-950/90 via-slate-900 to-gray-900 p-6 sm:p-8 rounded-3xl border border-sky-500/30 shadow-2xl flex flex-col md:flex-row justify-between items-start md:items-center gap-6 backdrop-blur-xl"
      >
        <div className="space-y-2">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#0284c7]/20 text-[#38bdf8] text-xs font-bold border border-[#0284c7]/30">
            <Award size={14} />
            <span>Panel Administrativo de Verificación y Emisión</span>
          </div>
          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-white tracking-tight">
            Aprobación y Emisión de Certificados Oficiales
          </h1>
          <p className="text-xs sm:text-sm text-slate-300 max-w-2xl leading-relaxed">
            Al otorgar el <strong>visto bueno administrativo</strong>, se emite el certificado oficial de cumplimiento y se despacha automáticamente una <strong>copia digital en PDF al correo del estudiante</strong> registrado en la plataforma.
          </p>
        </div>

        {/* Action success alert */}
        {actionSuccessMsg && (
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-emerald-950/90 border border-emerald-500 text-emerald-300 text-xs font-bold p-3.5 rounded-2xl flex items-center gap-2.5 shadow-xl backdrop-blur-md"
          >
            <CheckCircle2 size={16} />
            <span>{actionSuccessMsg}</span>
          </motion.div>
        )}
      </motion.div>

      {/* Filter and Search Bar */}
      <div className="flex flex-col sm:flex-row justify-between items-center gap-4 bg-[#121316]/80 p-4 rounded-2xl border border-white/10 backdrop-blur-md">
        <div className="flex items-center gap-2 w-full sm:w-auto">
          {['TODOS', 'PENDIENTE', 'APROBADO'].map(st => (
            <motion.button
              key={st}
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.96 }}
              onClick={() => setFilterStatus(st)}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer border ${
                filterStatus === st
                  ? 'bg-gradient-to-r from-[#00c2b2] to-teal-400 text-gray-950 border-teal-300 shadow-md shadow-teal-950/40'
                  : 'bg-slate-800/80 text-slate-400 hover:text-white border-white/5'
              }`}
            >
              {st === 'TODOS' ? 'Todos' : st === 'PENDIENTE' ? 'Pendientes de Aprobación' : 'Emitidos / Despachados'}
            </motion.button>
          ))}
        </div>

        <div className="relative w-full sm:w-80">
          <input
            type="text"
            placeholder="Buscar por RUT, correo o alumno..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full bg-[#18191c] border border-white/10 rounded-xl pl-10 pr-4 py-2 text-xs text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-cyan-500/40 focus:border-cyan-500 transition-all"
          />
          <Search size={15} className="absolute left-3.5 top-2.5 text-slate-400" />
        </div>
      </div>

      {/* Table of Students for Approval & Email Dispatch */}
      <motion.div 
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.35 }}
        className="bg-gradient-to-b from-[#151619] to-[#111214] rounded-3xl border border-white/10 overflow-hidden shadow-2xl backdrop-blur-xl"
      >
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-[#0f1012] border-b border-white/10 text-slate-400 uppercase tracking-wider text-[10px] font-bold">
              <tr>
                <th className="py-4 px-6">Alumno & Correo de Recepción</th>
                <th className="py-4 px-6">Capacitación Finalizada</th>
                <th className="py-4 px-4">Cumplimiento SENCE</th>
                <th className="py-4 px-4">Estado & Despacho</th>
                <th className="py-4 px-6 text-right">Acciones de Aprobación</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5 text-slate-300">
              {filtered.map((item) => (
                <tr key={item.id} className="hover:bg-white/5 transition-colors">
                  
                  {/* Student & Email */}
                  <td className="py-4 px-6">
                    <div className="font-bold text-white text-sm">{item.studentName}</div>
                    <div className="font-mono text-slate-400 text-[11px]">{item.rut}</div>
                    <div className="text-[11px] text-sky-400 flex items-center gap-1 mt-0.5 font-mono">
                      <Mail size={11} />
                      <span>{item.studentEmail}</span>
                    </div>
                  </td>

                  {/* Course */}
                  <td className="py-4 px-6 max-w-xs">
                    <div className="font-semibold text-slate-200 line-clamp-2">{item.course}</div>
                    <div className="text-[10px] text-slate-400 font-mono mt-0.5">SENCE: {item.senceCode} • {item.hours}</div>
                  </td>

                  {/* Compliance */}
                  <td className="py-4 px-4">
                    <div className="text-emerald-400 font-bold flex items-center gap-1">
                      <CheckCircle2 size={13} />
                      <span>{item.attendance}</span>
                    </div>
                    <div className="text-[10px] text-slate-400">{item.requirementsStatus}</div>
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
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => setSelectedForPreview(item)}
                      className="px-3 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-bold cursor-pointer transition-colors inline-flex items-center gap-1.5 border border-white/10"
                    >
                      <Eye size={13} />
                      <span>Ver Diploma</span>
                    </motion.button>

                    {item.status === 'PENDIENTE' ? (
                      <motion.button
                        whileHover={{ scale: 1.05, boxShadow: '0 0 15px rgba(0, 194, 178, 0.4)' }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => handleApproveAndDispatchEmail(item)}
                        className="px-3.5 py-1.5 rounded-xl bg-gradient-to-r from-[#00c2b2] to-teal-400 hover:from-teal-400 hover:to-teal-500 text-gray-950 text-xs font-black cursor-pointer transition-all inline-flex items-center gap-1.5 shadow-md shadow-teal-950/40"
                      >
                        <UserCheck size={14} />
                        <span>Dar Visto Bueno & Enviar</span>
                      </motion.button>
                    ) : (
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => handleApproveAndDispatchEmail(item)}
                        className="px-3 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-sky-300 hover:text-white text-xs font-bold cursor-pointer transition-colors inline-flex items-center gap-1.5 border border-white/10"
                        title="Reenviar copia digital por correo"
                      >
                        <Send size={12} />
                        <span>Reenviar Correo</span>
                      </motion.button>
                    )}
                  </td>

                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </motion.div>

      {/* MODAL DE DESPACHO DE CORREO AUTOMÁTICO */}
      <AnimatePresence>
        {selectedForEmailModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md">
            <motion.div 
              initial={{ opacity: 0, scale: 0.92, y: 15 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.92, y: 15 }}
              transition={{ duration: 0.25 }}
              className="bg-gradient-to-b from-[#18191c] via-[#141518] to-[#101113] border border-sky-500/40 w-full max-w-lg rounded-3xl shadow-2xl p-6 sm:p-8 relative backdrop-blur-2xl"
            >
              <motion.button
                whileHover={{ scale: 1.1, rotate: 90 }}
                whileTap={{ scale: 0.9 }}
                onClick={() => {
                  setSelectedForEmailModal(null);
                  setEmailSentSuccess(false);
                }}
                className="absolute top-4 right-4 text-slate-400 hover:text-white p-2 rounded-full hover:bg-white/10 transition-colors cursor-pointer"
              >
                <X size={20} />
              </motion.button>

              {isSendingEmail ? (
                <div className="py-10 text-center space-y-4">
                  <div className="w-14 h-14 border-4 border-[#00c2b2] border-t-transparent rounded-full animate-spin mx-auto"></div>
                  <h3 className="text-lg font-bold text-white">Generando y Despachando Certificado Digital...</h3>
                  <p className="text-xs text-slate-400">
                    Enviando desde <strong className="text-sky-400 font-mono">{SENDER_EMAIL_DEFAULT}</strong> hacia <strong className="text-teal-300 font-mono">{selectedForEmailModal.studentEmail}</strong>...
                  </p>
                </div>
              ) : emailSentSuccess ? (
                <div className="py-6 text-center space-y-5">
                  <div className="w-16 h-16 bg-emerald-500/20 text-emerald-400 rounded-full flex items-center justify-center mx-auto animate-bounce border border-emerald-500/40">
                    <CheckCircle2 size={36} />
                  </div>
                  
                  <div className="space-y-1">
                    <h3 className="text-xl font-black text-white">¡Visto Bueno y Correo Enviado!</h3>
                    <p className="text-xs text-slate-300">
                      Se ha enviado la copia digital oficial del diploma a la casilla del estudiante.
                    </p>
                  </div>

                  {/* Email dispatch details */}
                  <div className="bg-[#121315] p-4 rounded-2xl border border-white/10 text-left text-xs space-y-2 font-mono text-slate-300 shadow-inner">
                    <div className="flex justify-between border-b border-white/10 pb-1.5 text-[11px]">
                      <span className="text-slate-500">De (Remitente):</span>
                      <span className="text-sky-300">{SENDER_EMAIL_DEFAULT}</span>
                    </div>
                    <div className="flex justify-between border-b border-white/10 pb-1.5 text-[11px]">
                      <span className="text-slate-500">Para (Recepción):</span>
                      <span className="text-emerald-300 font-bold">{selectedForEmailModal.studentEmail}</span>
                    </div>
                    <div className="flex justify-between border-b border-white/10 pb-1.5 text-[11px]">
                      <span className="text-slate-500">Asunto:</span>
                      <span className="text-white">🎓 Certificado Oficial - {selectedForEmailModal.course}</span>
                    </div>
                    <div className="flex justify-between text-[11px] pt-0.5">
                      <span className="text-slate-500">Adjunto:</span>
                      <span className="text-sky-400 font-bold">Diploma_Oficial_{selectedForEmailModal.certificateCode}.pdf</span>
                    </div>
                  </div>

                  <motion.button
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.97 }}
                    type="button"
                    onClick={() => {
                      setSelectedForEmailModal(null);
                      setEmailSentSuccess(false);
                    }}
                    className="w-full bg-gradient-to-r from-[#0284c7] to-[#0369a1] text-white font-bold py-3 px-4 rounded-xl text-xs cursor-pointer transition-colors shadow-lg shadow-sky-950/50"
                  >
                    Entendido / Cerrar
                  </motion.button>
                </div>
              ) : null}
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* MODAL DE PREVISUALIZACIÓN DE DIPLOMA OFICIAL */}
      <AnimatePresence>
        {selectedForPreview && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md">
            <motion.div 
              initial={{ opacity: 0, scale: 0.92, y: 15 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.92, y: 15 }}
              transition={{ duration: 0.25 }}
              className="bg-gradient-to-b from-[#18191c] via-[#141518] to-[#101113] border border-sky-500/50 w-full max-w-3xl rounded-3xl shadow-2xl overflow-hidden p-6 sm:p-8 relative max-h-[94vh] overflow-y-auto backdrop-blur-2xl"
            >
              
              <motion.button
                whileHover={{ scale: 1.1, rotate: 90 }}
                whileTap={{ scale: 0.9 }}
                onClick={() => setSelectedForPreview(null)}
                className="absolute top-4 right-4 text-slate-400 hover:text-white p-2 rounded-full hover:bg-white/10 transition-colors z-20 cursor-pointer"
              >
                <X size={20} />
              </motion.button>

              {/* Official Diploma Frame */}
              <div className="bg-[#121316] border-2 border-[#0284c7]/50 rounded-3xl p-6 sm:p-8 relative shadow-2xl text-white space-y-6 overflow-hidden">
                
                {/* Header OTEC */}
                <div className="flex flex-col sm:flex-row justify-between items-center pb-6 border-b border-white/10 gap-4 text-center sm:text-left">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-[#0284c7] to-[#00c2b2] flex items-center justify-center text-white font-black text-xl shadow-lg">
                      PS
                    </div>
                    <div>
                      <h3 className="text-xl font-black tracking-tight">PREVYSEG CAPACITACIONES</h3>
                      <p className="text-[11px] text-slate-400 uppercase font-semibold">
                        Organismo Técnico de Capacitación • NCh 2728 • SENCE
                      </p>
                    </div>
                  </div>

                  <div className="text-right">
                    <span className="text-[11px] text-slate-400 block">Registro Oficial OTEC</span>
                    <span className="text-xs font-mono font-bold text-sky-400">N° 1238088725</span>
                  </div>
                </div>

                {/* Certificate Body */}
                <div className="space-y-4 text-center sm:text-left">
                  <p className="text-xs uppercase text-slate-400 font-semibold tracking-wider">
                    El Organismo Técnico de Capacitación PrevySeg certifica formalmente que:
                  </p>
                  <h4 className="text-2xl sm:text-3xl font-black text-[#00c2b2]">
                    {selectedForPreview.studentName}
                  </h4>
                  <p className="text-xs font-mono text-slate-300">
                    RUT: <strong className="text-white font-bold">{selectedForPreview.rut}</strong> • Correo: <strong className="text-sky-300">{selectedForPreview.studentEmail}</strong>
                  </p>

                  <p className="text-xs text-slate-300 pt-2 leading-relaxed">
                    Ha completado satisfactoriamente la totalidad de las horas de instrucción, contenidos teóricos y prácticos exigidos conforme al <strong>Decreto Ley N° 3.607</strong> y normativa de la <strong>SPD (Subsecretaría de Prevención del Delito)</strong>, acreditando que <strong>se encuentra debidamente capacitado(a) para desempeñarse en el área de:</strong>
                  </p>

                  <div className="p-4 bg-black/40 rounded-2xl border border-white/10">
                    <h5 className="text-base sm:text-lg font-extrabold text-white">
                      {selectedForPreview.course}
                    </h5>
                    <p className="text-xs text-sky-400 font-semibold mt-1">
                      Código SENCE: {selectedForPreview.senceCode} • Carga Horaria: {selectedForPreview.hours}
                    </p>
                  </div>
                </div>

                {/* Metadata Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2 text-xs">
                  <div className="bg-slate-900/60 p-3 rounded-xl border border-white/10">
                    <span className="text-slate-500 block text-[10px] font-bold uppercase">Fecha de Finalización</span>
                    <span className="text-white font-semibold">{selectedForPreview.completionDate}</span>
                  </div>
                  <div className="bg-slate-900/60 p-3 rounded-xl border border-white/10">
                    <span className="text-slate-500 block text-[10px] font-bold uppercase">Acreditación Académica</span>
                    <span className="text-emerald-400 font-bold">Aprobado y Capacitado ✓</span>
                  </div>
                  <div className="bg-slate-900/60 p-3 rounded-xl border border-white/10">
                    <span className="text-slate-500 block text-[10px] font-bold uppercase">Código Registro</span>
                    <span className="text-white font-mono">{selectedForPreview.certificateCode}</span>
                  </div>
                </div>

                {/* Signatures & Footer */}
                <div className="pt-6 border-t border-white/10 flex flex-col sm:flex-row justify-between items-center gap-6">
                  
                  <div className="flex items-center gap-3 bg-white p-2.5 rounded-2xl text-gray-950">
                    <div className="w-14 h-14 bg-slate-100 border border-slate-300 rounded flex items-center justify-center text-slate-800">
                      <QrCode size={42} />
                    </div>
                    <div className="text-[10px] leading-tight space-y-0.5">
                      <strong className="block font-black text-slate-900">CERTIFICADO OFICIAL</strong>
                      <span className="text-slate-600 font-mono text-[9px] block">OTEC PrevySeg</span>
                      <span className="text-emerald-700 font-bold block">✓ Visto Bueno Dirección</span>
                    </div>
                  </div>

                  <div className="flex gap-6 text-center text-[11px] text-slate-400">
                    <div className="space-y-1">
                      <div className="w-32 border-b border-slate-600 pb-1 font-serif italic text-sky-300 text-xs">
                        Ashley Adaros G.
                      </div>
                      <span className="block text-[10px] font-bold text-slate-300">Director Académico</span>
                      <span className="block text-[9px] text-slate-500">PrevySeg OTEC</span>
                    </div>

                    <div className="space-y-1">
                      <div className="w-32 border-b border-slate-600 pb-1 font-serif italic text-teal-300 text-xs">
                        Sebastián Araya O.
                      </div>
                      <span className="block text-[10px] font-bold text-slate-300">Coordinador SPD (Subsecretaría de Prevención del Delito)</span>
                      <span className="block text-[9px] text-slate-500">Instructor Acreditado</span>
                    </div>
                  </div>

                </div>

              </div>

              {/* Actions */}
              <div className="flex justify-end gap-3 pt-4">
                <button
                  type="button"
                  onClick={() => setSelectedForPreview(null)}
                  className="px-4 py-2.5 rounded-xl border border-white/10 text-slate-300 hover:bg-white/5 text-xs font-semibold cursor-pointer transition-colors"
                >
                  Cerrar
                </button>

                <motion.button
                  whileHover={{ scale: 1.04 }}
                  whileTap={{ scale: 0.96 }}
                  type="button"
                  onClick={handlePrint}
                  className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-[#0284c7] to-[#0369a1] text-white text-xs font-bold shadow-lg shadow-sky-950/50 flex items-center gap-2 cursor-pointer border border-sky-400/30"
                >
                  <Printer size={15} />
                  <span>Imprimir / Guardar Copia PDF</span>
                </motion.button>
              </div>

            </motion.div>
          </div>
        )}
      </AnimatePresence>

    </div>
  );
};
export default CertificateApprovalView;
