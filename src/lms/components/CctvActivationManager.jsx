import React, { useState, useEffect, useCallback } from 'react';
import { 
  Shield, 
  UserCheck, 
  UserX, 
  Clock, 
  Calendar, 
  FileText, 
  AlertCircle, 
  CheckCircle2, 
  RefreshCw, 
  Sparkles, 
  Lock, 
  BookOpen, 
  Users,
  Eye,
  Info,
  History,
  Check,
  UserPlus,
  ArrowRight,
  Archive,
  ThumbsUp,
  XCircle,
  Zap,
  Phone,
  Mail,
  Send
} from 'lucide-react';
import { 
  supabase, 
  getCctvActiveStatus, 
  activateCctvStudent, 
  deactivateCctvStudent,
  getCctvApprovalList,
  approveCctvRequest,
  rejectCctvRequest,
  requestCctvApproval,
  incorporateCctvStudent,
  getCourseParticipantHistory
} from '../../config/supabase';

const CctvActivationManager = ({ course, onStatusChange }) => {
  const [approvalData, setApprovalData] = useState({
    pending_requests: [],
    approved_applicants: [],
    active_status: null
  });
  const [historyList, setHistoryList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [toastMessage, setToastMessage] = useState({ text: '', type: '' });

  // Modal para simular nueva postulación si se desea probar
  const [showSimulateModal, setShowSimulateModal] = useState(false);
  const [simName, setSimName] = useState('');
  const [simRut, setSimRut] = useState('');
  const [simEmail, setSimEmail] = useState('');
  const [simPhone, setSimPhone] = useState('+56 9 ');
  const [simNotes, setSimNotes] = useState('Postulante solicita evaluación y visto bueno para cursar CCTV');

  const loadData = useCallback(async () => {
    setLoading(true);
    try {
      // 1. Obtener lista completa de solicitudes pendientes, aprobados y alumno activo
      const listData = await getCctvApprovalList(course?.id);
      setApprovalData(listData || { pending_requests: [], approved_applicants: [], active_status: null });
      
      if (onStatusChange && listData?.active_status) {
        onStatusChange(listData.active_status);
      }

      // 2. Obtener registro histórico permanente de auditoría
      const history = await getCourseParticipantHistory(course?.id);
      setHistoryList(history || []);
    } catch (err) {
      console.error('Error al cargar datos del curso CCTV:', err);
    } finally {
      setLoading(false);
    }
  }, [course?.id, onStatusChange]);

  useEffect(() => {
    loadData();
  }, [course?.id]);

  const showToast = (text, type = 'success') => {
    setToastMessage({ text, type });
    setTimeout(() => setToastMessage({ text: '', type: '' }), 5000);
  };

  const activeStatus = approvalData.active_status;
  const pendingRequests = approvalData.pending_requests || [];
  const approvedApplicants = approvalData.approved_applicants || [];
  const activeStudents = (activeStatus?.active_students && activeStatus.active_students.length > 0)
    ? activeStatus.active_students
    : (activeStatus?.has_active && activeStatus.student_name ? [activeStatus] : []);

  // =========================================================================
  // ACCIONES ADMINISTRATIVAS: VISTO BUENO Y APROBACIÓN
  // =========================================================================

  // 1. Dar el Visto Bueno y Aceptar Solicitud
  const handleApprove = async (request, incorporateNow = false) => {
    if (!request?.request_id) return;

    setSubmitting(true);
    try {
      const res = await approveCctvRequest(
        request.request_id,
        'Administrador OTEC',
        'Visto bueno otorgado tras validación curricular',
        incorporateNow
      );

      if (incorporateNow) {
        showToast(`✓ ¡Visto bueno otorgado a ${request.nombre} e incorporado inmediatamente a su autoestudio individual por 30 días!`, 'success');
      } else {
        showToast(`✓ ¡Visto bueno otorgado a ${request.nombre}! Ha quedado aceptado en la lista para iniciar su autoestudio individual.`, 'success');
      }
      await loadData();
    } catch (err) {
      console.error('Error al aprobar solicitud:', err);
      showToast(err.message || 'Error al aprobar solicitud en la base de datos.', 'error');
    } finally {
      setSubmitting(false);
    }
  };

  // 2. Rechazar Solicitud
  const handleReject = async (request) => {
    if (!request?.request_id) return;
    const reason = window.prompt(
      `¿Deseas rechazar la solicitud de ${request.nombre}?\nIngresa el motivo (opcional):`,
      'No cumple con los requisitos de ingreso'
    );
    if (reason === null) return;

    setSubmitting(true);
    try {
      await rejectCctvRequest(request.request_id, reason);
      showToast(`Solicitud de ${request.nombre} rechazada.`, 'info');
      await loadData();
    } catch (err) {
      console.error('Error al rechazar solicitud:', err);
      showToast(err.message || 'Error al rechazar.', 'error');
    } finally {
      setSubmitting(false);
    }
  };

  // 3. Incorporar postulante que YA TIENE el Visto Bueno (Periodo Individual de 30 Días)
  const handleIncorporateApproved = async (applicant) => {
    if (!applicant?.user_id) {
      showToast('Error: El alumno no tiene un ID de usuario registrado en la base de datos.', 'error');
      return;
    }

    setSubmitting(true);
    try {
      const res = await incorporateCctvStudent(applicant.user_id, course?.id);
      showToast(`✓ ¡${res.student_name} incorporado exitosamente a su autoestudio individual por 30 días!`, 'success');
      await loadData();
    } catch (err) {
      console.error('Error al incorporar alumno:', err);
      showToast(err.message || 'Error al incorporar alumno en la base de datos.', 'error');
    } finally {
      setSubmitting(false);
    }
  };

  // 4. Desactivar alumno activo específico y archivar en historial
  const handleDeactivate = async (activationId, studentName) => {
    if (!activationId) return;
    if (!window.confirm(`¿Seguro que deseas dar de baja el acceso CCTV de ${studentName}? Su periodo de 30 días terminará y quedará registrado en el historial de auditoría.`)) return;

    setSubmitting(true);
    try {
      await deactivateCctvStudent(activationId);
      showToast(`Acceso CCTV de ${studentName} finalizado y registrado en auditoría.`, 'info');
      await loadData();
    } catch (err) {
      console.error('Error al desactivar:', err);
      showToast(err.message || 'Error al desactivar.', 'error');
    } finally {
      setSubmitting(false);
    }
  };

  // 5. Extender 30 días adicionales para un alumno específico
  const handleExtend30Days = async (userId, studentName) => {
    if (!userId) return;
    setSubmitting(true);
    try {
      await activateCctvStudent(course?.id, userId);
      showToast(`✓ Periodo extendido exitosamente por 30 días adicionales para ${studentName}.`, 'success');
      await loadData();
    } catch (err) {
      console.error('Error al extender periodo:', err);
      showToast(err.message || 'Error al extender vigencia.', 'error');
    } finally {
      setSubmitting(false);
    }
  };

  // 6. Simular nueva solicitud de estudiante para probar el flujo de aprobación
  const handleCreateApplicantRequest = async (e) => {
    e.preventDefault();
    if (!simName || !simRut) {
      alert('Por favor ingresa nombre y RUT del estudiante.');
      return;
    }

    setSubmitting(true);
    try {
      const res = await requestCctvApproval({
        rut: simRut.trim(),
        nombre: simName.trim(),
        email: simEmail.trim() || null,
        telefono: simPhone.trim() || null,
        notas: simNotes.trim() || 'Solicitud de estudiante ingresada'
      });

      showToast(`✓ ¡Solicitud creada exitosamente para ${simName}! Aparece ahora en la sección de Solicitudes Pendientes para dar el visto bueno.`, 'success');
      setShowSimulateModal(false);
      setSimName('');
      setSimRut('');
      setSimEmail('');
      setSimPhone('+56 9 ');
      await loadData();
    } catch (err) {
      console.error('Error al crear solicitud:', err);
      showToast(err.message || 'Error al registrar solicitud.', 'error');
    } finally {
      setSubmitting(false);
    }
  };

  const calculateDaysPercent = (days) => {
    const totalDays = 30;
    const remaining = Math.max(0, Math.min(30, days || 0));
    return Math.round((remaining / totalDays) * 100);
  };

  return (
    <div className="bg-gradient-to-br from-slate-900 via-sky-950 to-slate-900 border-2 border-sky-400/40 rounded-3xl p-6 sm:p-8 text-white shadow-xl relative overflow-hidden space-y-6">
      
      {/* Luces de fondo decorativas */}
      <div className="absolute -right-20 -top-20 w-80 h-80 bg-sky-500/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -left-20 -bottom-20 w-80 h-80 bg-teal-500/10 rounded-full blur-3xl pointer-events-none" />

      {/* ========================================================================= */}
      {/* 1. HEADER DEL PANEL DE GESTIÓN Y VISTO BUENO CCTV                         */}
      {/* ========================================================================= */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 border-b border-sky-800/40 pb-5">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-2xl bg-sky-500/20 border border-sky-400/40 flex items-center justify-center text-sky-300 shadow-inner flex-shrink-0">
            <Shield size={24} />
          </div>
          <div>
            <div className="flex flex-wrap items-center gap-2">
              <span className="text-[10px] font-black uppercase tracking-widest bg-sky-400/20 text-sky-200 px-2.5 py-0.5 rounded-full border border-sky-400/30">
                Gestión Especial CCTV
              </span>
              <span className="text-[10px] font-bold text-amber-300 bg-amber-400/15 px-2 py-0.5 rounded-full border border-amber-400/30">
                1 Alumno a la Vez • 30 Días de Autoestudio
              </span>
              <span className="text-[10px] font-bold text-emerald-300 bg-emerald-400/15 px-2 py-0.5 rounded-full border border-emerald-400/30">
                Flujo de Aprobación & Visto Bueno
              </span>
            </div>
            <h3 className="text-lg sm:text-xl font-bold text-white mt-1">
              Solicitudes de Aprobación, Visto Bueno e Incorporación CCTV
            </h3>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => setShowSimulateModal(true)}
            className="text-xs text-emerald-300 hover:text-white bg-emerald-950/60 hover:bg-emerald-900 border border-emerald-500/40 px-3 py-1.5 rounded-xl flex items-center gap-1.5 transition-all cursor-pointer font-semibold"
            title="Simular nueva solicitud de un estudiante que pide CCTV"
          >
            <UserPlus size={13} />
            <span>+ Simular Solicitud Estudiante</span>
          </button>

          <button
            type="button"
            onClick={loadData}
            disabled={loading || submitting}
            className="text-xs text-sky-300 hover:text-white bg-sky-900/40 hover:bg-sky-800/60 border border-sky-700/50 px-3 py-1.5 rounded-xl flex items-center gap-1.5 transition-all cursor-pointer"
          >
            <RefreshCw size={13} className={loading ? 'animate-spin' : ''} />
            <span>Sincronizar BD</span>
          </button>
        </div>
      </div>

      {/* Alerta de notificación / Toast */}
      {toastMessage.text && (
        <div className={`p-3.5 rounded-2xl text-xs flex items-center gap-2.5 animate-in fade-in ${
          toastMessage.type === 'error'
            ? 'bg-rose-500/20 border border-rose-400/40 text-rose-200'
            : 'bg-emerald-500/20 border border-emerald-400/40 text-emerald-200'
        }`}>
          {toastMessage.type === 'error' ? <AlertCircle size={16} /> : <CheckCircle2 size={16} />}
          <span className="font-semibold">{toastMessage.text}</span>
        </div>
      )}

      {/* Resumen rápido de contadores */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
        <div className="p-3 rounded-2xl bg-amber-950/40 border border-amber-500/30 flex items-center justify-between">
          <div className="flex items-center gap-2 text-amber-300">
            <Clock size={16} />
            <span className="font-bold">Pendientes de Visto Bueno:</span>
          </div>
          <span className="text-base font-black text-amber-300 px-2 py-0.5 rounded-lg bg-amber-500/20">
            {pendingRequests.length}
          </span>
        </div>

        <div className="p-3 rounded-2xl bg-teal-950/40 border border-teal-500/30 flex items-center justify-between">
          <div className="flex items-center gap-2 text-teal-300">
            <ThumbsUp size={16} />
            <span className="font-bold">Con Visto Bueno Aprobado:</span>
          </div>
          <span className="text-base font-black text-teal-300 px-2 py-0.5 rounded-lg bg-teal-500/20">
            {approvedApplicants.length}
          </span>
        </div>

        <div className="p-3 rounded-2xl bg-sky-950/40 border border-sky-500/30 flex items-center justify-between">
          <div className="flex items-center gap-2 text-sky-300">
            <Users size={16} />
            <span className="font-bold">Cursando Individualmente:</span>
          </div>
          <span className="text-base font-black text-sky-300 px-2 py-0.5 rounded-lg bg-sky-500/20">
            {activeStudents.length} Alumno(s) Activo(s)
          </span>
        </div>
      </div>

      {/* ========================================================================= */}
      {/* SECCIÓN 1: 📥 SOLICITUDES PENDIENTES DE APROBACIÓN ("DAR EL VISTO BUENO") */}
      {/* ========================================================================= */}
      <div className="bg-slate-800/90 border-2 border-amber-500/40 rounded-2xl p-5 sm:p-6 space-y-4 shadow-xl">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2">
          <div>
            <div className="flex items-center gap-2">
              <span className="w-3 h-3 rounded-full bg-amber-400 animate-ping" />
              <h4 className="text-sm sm:text-base font-bold text-amber-300 flex items-center gap-2">
                <Clock size={18} />
                <span>Solicitudes de Estudiantes Pendientes de Aprobación</span>
              </h4>
            </div>
            <p className="text-xs text-slate-300 mt-1">
              Aquí aparecen los alumnos que solicitan el curso CCTV. <strong>Debes aceptar y dar el visto bueno</strong> para que puedan ser incorporados.
            </p>
          </div>

          <span className="text-xs font-black px-3 py-1 rounded-xl bg-amber-500/20 text-amber-300 border border-amber-500/40">
            {pendingRequests.length} Solicitud(es) en Espera
          </span>
        </div>

        {loading ? (
          <div className="py-6 text-center text-slate-400 text-xs flex items-center justify-center gap-2">
            <RefreshCw size={14} className="animate-spin text-amber-400" />
            <span>Consultando solicitudes pendientes en PostgreSQL...</span>
          </div>
        ) : pendingRequests.length === 0 ? (
          <div className="p-6 rounded-2xl bg-slate-900/60 border border-dashed border-slate-700 text-center space-y-2">
            <div className="w-10 h-10 rounded-full bg-slate-800 text-emerald-400 flex items-center justify-center mx-auto">
              <CheckCircle2 size={20} />
            </div>
            <p className="text-xs font-bold text-slate-200">
              No hay solicitudes pendientes de aprobación en este momento
            </p>
            <p className="text-[11px] text-slate-400 max-w-md mx-auto">
              Cuando un estudiante solicite el curso CCTV desde su aula o matrícula web, aparecerá aquí inmediatamente con la opción de <strong>Aceptar y dar el visto bueno</strong>.
            </p>
            <button
              type="button"
              onClick={() => setShowSimulateModal(true)}
              className="mt-2 text-xs font-bold text-amber-300 bg-amber-950 hover:bg-amber-900 border border-amber-600/50 px-3.5 py-1.5 rounded-xl transition-all cursor-pointer inline-flex items-center gap-1.5"
            >
              <UserPlus size={13} />
              <span>Simular Solicitud de un Estudiante</span>
            </button>
          </div>
        ) : (
          <div className="space-y-3">
            {pendingRequests.map((req) => (
              <div 
                key={req.request_id}
                className="p-4 rounded-2xl bg-slate-900/90 border border-amber-400/40 hover:border-amber-400 transition-all flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4 shadow-lg"
              >
                <div className="space-y-1.5">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="font-bold text-white text-sm">
                      {req.nombre}
                    </span>
                    <span className="text-[11px] font-mono text-amber-300 bg-amber-950/70 border border-amber-500/30 px-2 py-0.5 rounded-md font-bold">
                      RUT: {req.rut}
                    </span>
                    <span className="text-[10px] font-black uppercase tracking-wider px-2 py-0.5 rounded bg-amber-500/20 text-amber-300 border border-amber-500/40">
                      PENDIENTE DE VISTO BUENO
                    </span>
                  </div>

                  <div className="flex flex-wrap items-center gap-3 text-xs text-slate-300">
                    {req.email && (
                      <span className="flex items-center gap-1">
                        <Mail size={12} className="text-slate-400" />
                        <span>{req.email}</span>
                      </span>
                    )}
                    {req.telefono && (
                      <span className="flex items-center gap-1">
                        <Phone size={12} className="text-slate-400" />
                        <span>{req.telefono}</span>
                      </span>
                    )}
                    <span className="text-slate-500">•</span>
                    <span className="text-slate-400">
                      Solicitado el: <strong className="text-slate-200">{req.fecha_solicitud ? new Date(req.fecha_solicitud).toLocaleString('es-CL') : 'Recientemente'}</strong>
                    </span>
                  </div>

                  {req.notas && (
                    <p className="text-[11px] text-slate-400 italic bg-slate-950/60 p-2 rounded-lg border border-slate-800">
                      Mensaje / Nota: "{req.notas}"
                    </p>
                  )}
                </div>

                {/* BOTONES DE ACCIÓN: ACEPTAR Y DAR VISTO BUENO */}
                <div className="flex flex-wrap items-center gap-2 w-full lg:w-auto justify-end">
                  <button
                    type="button"
                    onClick={() => handleReject(req)}
                    disabled={submitting}
                    className="px-3 py-2 text-xs font-bold rounded-xl bg-slate-800 hover:bg-rose-950 hover:text-rose-300 text-slate-300 border border-slate-700 transition-all cursor-pointer flex items-center gap-1.5 disabled:opacity-50"
                    title="Rechazar solicitud"
                  >
                    <XCircle size={14} />
                    <span>Rechazar</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => handleApprove(req, false)}
                    disabled={submitting}
                    className="px-4 py-2 text-xs font-bold rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white shadow-md transition-all cursor-pointer flex items-center gap-1.5 disabled:opacity-50 font-sans"
                    title="Acepta al alumno y otorga el visto bueno para que quede listo en lista de espera"
                  >
                    <Check size={15} />
                    <span>✓ Aceptar y Dar Visto Bueno</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => handleApprove(req, true)}
                    disabled={submitting}
                    className="px-4 py-2 text-xs font-black rounded-xl bg-gradient-to-r from-sky-500 to-[#0284c7] hover:from-sky-400 hover:to-sky-600 text-white shadow-md transition-all cursor-pointer flex items-center gap-1.5 disabled:opacity-50"
                    title="Otorga visto bueno e incorpora inmediatamente como el alumno activo por 30 días"
                  >
                    <Zap size={14} />
                    <span>Visto Bueno e Incorporar Ahora</span>
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* ========================================================================= */}
      {/* SECCIÓN 2: 🎓 POSTULANTES ACEPTADOS CON VISTO BUENO (PARA INCORPORAR)    */}
      {/* ========================================================================= */}
      <div className="bg-slate-800/80 border border-teal-500/40 rounded-2xl p-5 sm:p-6 space-y-4">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2">
          <div>
            <h4 className="text-sm sm:text-base font-bold text-teal-300 flex items-center gap-2">
              <UserCheck size={18} />
              <span>Postulantes Aceptados con Visto Bueno Oficial</span>
            </h4>
            <p className="text-xs text-slate-300 mt-1">
              Estos alumnos ya cuentan con el <strong>Visto Bueno de la administración</strong>. Puedes incorporarlos individualmente (1 a la vez) para que inicien su periodo de 30 días.
            </p>
          </div>

          <span className="text-xs font-bold px-3 py-1 rounded-xl bg-teal-500/20 text-teal-300 border border-teal-500/30">
            {approvedApplicants.length} Alumnos Habilitables
          </span>
        </div>

        {approvedApplicants.length === 0 ? (
          <div className="p-5 rounded-2xl bg-slate-900/50 border border-dashed border-slate-700 text-center text-xs text-slate-400">
            Aún no hay alumnos con visto bueno en lista de espera. Revisa las solicitudes pendientes arriba y pulsa "Aceptar y Dar Visto Bueno".
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-3 max-h-72 overflow-y-auto pr-1">
            {approvedApplicants.map((app) => {
              const isAlreadyActive = activeStudents.some(s => s.user_id === app.user_id || s.student_rut === app.rut);

              return (
                <div
                  key={app.request_id || app.user_id}
                  className={`p-4 rounded-xl border transition-all flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 ${
                    isAlreadyActive
                      ? 'bg-emerald-950/40 border-emerald-500/60'
                      : 'bg-slate-900/80 border-slate-700 hover:border-teal-500/50'
                  }`}
                >
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-white text-xs sm:text-sm">
                        {app.nombre}
                      </span>
                      <span className="text-[10px] font-mono text-slate-400 bg-slate-800 px-2 py-0.5 rounded">
                        {app.rut}
                      </span>
                      {isAlreadyActive ? (
                        <span className="text-[9px] font-black uppercase px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 flex items-center gap-1">
                          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                          CURSANDO AHORA (INDIVIDUAL)
                        </span>
                      ) : (
                        <span className="text-[9px] font-bold uppercase px-2 py-0.5 rounded bg-teal-500/20 text-teal-300 border border-teal-500/30">
                          ✓ VISTO BUENO APROBADO
                        </span>
                      )}
                    </div>
                    <p className="text-[11px] text-slate-400">
                      Visto Bueno: <strong className="text-teal-300">{app.visto_bueno_by || 'Administrador OTEC'}</strong> {app.visto_bueno_at ? `(${new Date(app.visto_bueno_at).toLocaleDateString('es-CL')})` : ''} {app.email ? `• ${app.email}` : ''}
                    </p>
                  </div>

                  <div className="flex items-center gap-2 w-full sm:w-auto justify-end">
                    {isAlreadyActive ? (
                      <span className="text-xs text-emerald-400 font-bold flex items-center gap-1">
                        <Check size={14} />
                        <span>En curso activo (30 días)</span>
                      </span>
                    ) : (
                      <button
                        type="button"
                        onClick={() => handleIncorporateApproved(app)}
                        disabled={submitting}
                        className="bg-gradient-to-r from-[#0284c7] to-sky-600 hover:from-sky-500 hover:to-sky-700 text-white font-bold text-xs px-4 py-2 rounded-xl shadow-md transition-all flex items-center gap-1.5 cursor-pointer disabled:opacity-50"
                      >
                        <UserCheck size={14} />
                        <span>Incorporar a Autoestudio (30 Días)</span>
                      </button>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* ========================================================================= */}
      {/* SECCIÓN 3: 👤 ALUMNOS CON AUTOESTUDIO INDIVIDUAL ACTIVO                   */}
      {/* ========================================================================= */}
      <div className="bg-slate-800/90 border border-sky-500/30 rounded-2xl p-5 sm:p-6 space-y-4 shadow-lg">
        <div className="flex items-center justify-between">
          <span className="text-xs font-bold uppercase tracking-wider text-sky-300 flex items-center gap-1.5">
            <Users size={14} />
            <span>Alumnos con Autoestudio Individual Activo:</span>
          </span>
          <span className="text-[11px] text-sky-300 font-semibold px-2.5 py-0.5 rounded-full bg-sky-950 border border-sky-500/30">
            {activeStudents.length} Alumno(s) Cursando en Paralelo
          </span>
        </div>

        {loading ? (
          <div className="py-4 text-center text-slate-400 text-xs flex items-center justify-center gap-2">
            <RefreshCw size={14} className="animate-spin text-sky-400" />
            <span>Consultando estado...</span>
          </div>
        ) : activeStudents.length > 0 ? (
          <div className="space-y-3">
            {activeStudents.map((student) => (
              <div key={student.activation_id || student.user_id} className="bg-sky-950/70 border border-sky-400/50 rounded-2xl p-4 sm:p-5 space-y-4">
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-2xl bg-emerald-500/20 border border-emerald-400/50 flex items-center justify-center text-emerald-300 font-black text-base flex-shrink-0">
                      {student.student_name ? student.student_name.slice(0, 2).toUpperCase() : 'AL'}
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <h4 className="font-bold text-white text-sm sm:text-base">
                          {student.student_name}
                        </h4>
                        <span className="bg-emerald-500 text-slate-950 text-[10px] font-black uppercase px-2.5 py-0.5 rounded-full flex items-center gap-1 shadow-xs">
                          <span className="w-1.5 h-1.5 rounded-full bg-slate-950 animate-ping" />
                          <span>CURSANDO AHORA (INDIVIDUAL)</span>
                        </span>
                      </div>
                      <p className="text-xs text-slate-300 mt-0.5 font-mono">
                        RUT: {student.student_rut} {student.student_email ? `• ${student.student_email}` : ''}
                      </p>
                    </div>
                  </div>

                  {/* Botones de acción del alumno activo */}
                  <div className="flex items-center gap-2 w-full sm:w-auto justify-end">
                    <button
                      type="button"
                      onClick={() => handleExtend30Days(student.user_id, student.student_name)}
                      disabled={submitting}
                      className="px-3.5 py-2 text-xs font-bold rounded-xl bg-sky-600 hover:bg-sky-500 text-white transition-all cursor-pointer flex items-center gap-1 shadow-sm disabled:opacity-50"
                      title="Extiende 30 días adicionales a partir de hoy"
                    >
                      <RefreshCw size={13} />
                      <span>Extender +30 Días</span>
                    </button>
                    <button
                      type="button"
                      onClick={() => handleDeactivate(student.activation_id, student.student_name)}
                      disabled={submitting}
                      className="px-3.5 py-2 text-xs font-bold rounded-xl bg-rose-600/80 hover:bg-rose-500 text-white transition-all cursor-pointer flex items-center gap-1 shadow-sm disabled:opacity-50"
                      title="Finaliza el periodo individual del alumno y archiva el registro en el historial"
                    >
                      <UserX size={13} />
                      <span>Dar de Baja</span>
                    </button>
                  </div>
                </div>

                {/* Cronograma y cuenta regresiva */}
                <div className="pt-3 border-t border-sky-800/50 space-y-2">
                  <div className="flex justify-between items-center text-xs">
                    <span className="text-slate-300 flex items-center gap-1">
                      <Clock size={13} className="text-amber-400" />
                      <span>Vigencia Individual de 30 Días:</span>
                      <strong className="text-amber-300 ml-1 font-bold">
                        Quedan {student.days_remaining} días y {student.hours_remaining || 0} hrs
                      </strong>
                    </span>
                    <span className="text-[11px] text-slate-400">
                      Fecha límite: <strong className="text-white">{student.expires_at ? new Date(student.expires_at).toLocaleDateString('es-CL', { day: '2-digit', month: 'long', year: 'numeric' }) : '30 días'}</strong>
                    </span>
                  </div>

                  <div className="w-full h-2.5 bg-slate-900/90 rounded-full overflow-hidden border border-slate-700">
                    <div 
                      className={`h-full transition-all duration-500 ${
                        student.days_remaining > 10 ? 'bg-gradient-to-r from-emerald-500 to-sky-400' : 'bg-gradient-to-r from-amber-500 to-rose-500'
                      }`}
                      style={{ width: `${calculateDaysPercent(student.days_remaining)}%` }}
                    />
                  </div>

                  <p className="text-[11px] text-slate-400 italic">
                    * Acceso individual activo a los 5 manuales técnicos en su portal de estudiante.
                  </p>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="p-5 rounded-2xl bg-slate-900/60 border border-slate-700/60 text-center space-y-2">
            <div className="w-10 h-10 rounded-full bg-slate-800 text-slate-400 flex items-center justify-center mx-auto">
              <Lock size={20} />
            </div>
            <p className="text-sm font-bold text-slate-200">
              Actualmente no hay alumnos en autoestudio activo
            </p>
            <p className="text-xs text-slate-400 max-w-md mx-auto">
              Los alumnos aprobados pueden ser incorporados en cualquier momento para iniciar su propio periodo individual de 30 días.
            </p>
          </div>
        )}
      </div>

      {/* ========================================================================= */}
      {/* SECCIÓN 4: 📜 REGISTRO HISTÓRICO PERMANENTE DE AUDITORÍA                  */}
      {/* ========================================================================= */}
      <div className="bg-slate-800/80 border border-slate-700/80 rounded-2xl p-5 sm:p-6 space-y-4">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2 border-b border-slate-700 pb-3">
          <div>
            <h4 className="text-sm font-bold text-white flex items-center gap-2">
              <History size={16} className="text-amber-400" />
              <span>Registro Histórico Permanente de Auditoría (Trazabilidad):</span>
            </h4>
            <p className="text-xs text-slate-400 mt-0.5">
              Registro inmutable en PostgreSQL: almacena la trazabilidad de todos los alumnos que han cursado CCTV.
            </p>
          </div>

          <span className="text-[11px] font-mono text-slate-400 bg-slate-900 px-2.5 py-1 rounded-lg border border-slate-700">
            {historyList.length} Registros de Auditoría
          </span>
        </div>

        {historyList.length === 0 ? (
          <p className="text-xs text-slate-400 text-center py-4 italic">
            Aún no se registran movimientos históricos en este curso.
          </p>
        ) : (
          <div className="overflow-x-auto max-h-60 overflow-y-auto pr-1">
            <table className="w-full text-left border-collapse text-xs">
              <thead>
                <tr className="border-b border-slate-700 text-[10px] font-bold uppercase text-slate-400 tracking-wider">
                  <th className="py-2 px-3">Alumno</th>
                  <th className="py-2 px-3">RUT</th>
                  <th className="py-2 px-3">Acción Registrada</th>
                  <th className="py-2 px-3">Fecha Inicio</th>
                  <th className="py-2 px-3">Fecha Fin</th>
                  <th className="py-2 px-3">Notas de Auditoría</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/60 text-[11px]">
                {historyList.map((h) => (
                  <tr key={h.id} className="hover:bg-slate-900/50 transition-colors">
                    <td className="py-2 px-3 font-semibold text-white">
                      {h.user_name}
                    </td>
                    <td className="py-2 px-3 font-mono text-slate-300">
                      {h.user_rut}
                    </td>
                    <td className="py-2 px-3">
                      <span className={`px-2 py-0.5 rounded text-[9px] font-bold ${
                        h.action === 'INCORPORADO'
                          ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30'
                          : h.action === 'REEMPLAZADO'
                          ? 'bg-amber-500/20 text-amber-300 border border-amber-500/30'
                          : 'bg-slate-700 text-slate-300'
                      }`}>
                        {h.action}
                      </span>
                    </td>
                    <td className="py-2 px-3 text-slate-300">
                      {h.enrolled_at ? new Date(h.enrolled_at).toLocaleDateString('es-CL') : '-'}
                    </td>
                    <td className="py-2 px-3 text-slate-400">
                      {h.ended_at ? new Date(h.ended_at).toLocaleDateString('es-CL') : 'Vigente'}
                    </td>
                    <td className="py-2 px-3 text-slate-400 max-w-xs truncate" title={h.notes}>
                      {h.notes || 'Registro oficial OTEC'}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* ========================================================================= */}
      {/* MODAL: SIMULACIÓN DE NUEVA SOLICITUD CCTV                                  */}
      {/* ========================================================================= */}
      {showSimulateModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/75 backdrop-blur-sm animate-in fade-in">
          <div className="bg-slate-900 border border-amber-400/50 w-full max-w-md rounded-3xl p-6 shadow-2xl space-y-4 text-white">
            <div className="flex justify-between items-start">
              <div>
                <h4 className="text-base font-bold text-white flex items-center gap-2">
                  <UserPlus size={18} className="text-amber-400" />
                  <span>Registrar Solicitud de Alumno (CCTV)</span>
                </h4>
                <p className="text-xs text-slate-400 mt-0.5">
                  Ingresa un alumno que solicita el curso. Quedará en <strong>Pendiente de Visto Bueno</strong>.
                </p>
              </div>
              <button
                type="button"
                onClick={() => setShowSimulateModal(false)}
                className="text-slate-400 hover:text-white text-lg p-1"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleCreateApplicantRequest} className="space-y-3 text-xs">
              <div>
                <label className="block text-slate-300 font-semibold mb-1">Nombre Completo del Estudiante *</label>
                <input
                  type="text"
                  required
                  placeholder="Ej: Marcelo Morales Peña"
                  value={simName}
                  onChange={(e) => setSimName(e.target.value)}
                  className="w-full bg-slate-800 border border-slate-700 rounded-xl px-3 py-2 text-white focus:outline-none focus:border-amber-400"
                />
              </div>

              <div>
                <label className="block text-slate-300 font-semibold mb-1">RUT *</label>
                <input
                  type="text"
                  required
                  placeholder="17.890.123-4"
                  value={simRut}
                  onChange={(e) => setSimRut(e.target.value)}
                  className="w-full bg-slate-800 border border-slate-700 rounded-xl px-3 py-2 text-white font-mono focus:outline-none focus:border-amber-400"
                />
              </div>

              <div>
                <label className="block text-slate-300 font-semibold mb-1">Teléfono Móvil (Opcional)</label>
                <input
                  type="text"
                  placeholder="+56 9 1234 5678"
                  value={simPhone}
                  onChange={(e) => setSimPhone(e.target.value)}
                  className="w-full bg-slate-800 border border-slate-700 rounded-xl px-3 py-2 text-white focus:outline-none focus:border-amber-400"
                />
              </div>

              <div>
                <label className="block text-slate-300 font-semibold mb-1">Correo Electrónico (Opcional)</label>
                <input
                  type="email"
                  placeholder="marcelo.morales@gmail.com"
                  value={simEmail}
                  onChange={(e) => setSimEmail(e.target.value)}
                  className="w-full bg-slate-800 border border-slate-700 rounded-xl px-3 py-2 text-white focus:outline-none focus:border-amber-400"
                />
              </div>

              <div>
                <label className="block text-slate-300 font-semibold mb-1">Motivo / Nota de la Solicitud</label>
                <textarea
                  rows={2}
                  value={simNotes}
                  onChange={(e) => setSimNotes(e.target.value)}
                  className="w-full bg-slate-800 border border-slate-700 rounded-xl px-3 py-2 text-white focus:outline-none focus:border-amber-400"
                />
              </div>

              <div className="pt-3 flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setShowSimulateModal(false)}
                  className="px-4 py-2 rounded-xl text-slate-300 hover:text-white bg-slate-800 cursor-pointer"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  disabled={submitting}
                  className="px-5 py-2 rounded-xl bg-amber-500 hover:bg-amber-400 font-bold text-slate-950 shadow cursor-pointer disabled:opacity-50 flex items-center gap-1.5"
                >
                  <Send size={13} />
                  <span>{submitting ? 'Enviando...' : 'Enviar Solicitud a Revisión'}</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
};

export default CctvActivationManager;
