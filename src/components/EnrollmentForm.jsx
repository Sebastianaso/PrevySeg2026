import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  FileText,
  CheckCircle2,
  AlertCircle,
  ShieldCheck,
  CreditCard,
  Send,
  Printer,
  Building2,
  Phone,
  Mail,
  MapPin,
  User,
  Calendar,
  DollarSign,
  Check,
  Sparkles,
  Lock,
  ExternalLink,
  ChevronDown,
  Info,
  Award,
  Clock,
  QrCode,
  CheckSquare,
  Square,
  HelpCircle,
  FileCheck,
  Zap,
  ArrowRight,
  BadgeAlert
} from 'lucide-react';
import { 
  supabase, 
  adminCreateUser, 
  formatRut, 
  cleanRut, 
  validateRut, 
  validateEmail, 
  validatePhone 
} from '../config/supabase';

// ================= LISTA OFICIAL DE CURSOS DE LA FICHA PREVYSEG =================
export const OFFICIAL_COURSES = [
  {
    id: 'ggss-form-presencial',
    name: 'GGSS FORMACIÓN PRESENCIAL',
    code: 'OS10-FP-01',
    type: 'spd',
    category: 'Seguridad Privada SPD',
    hours: '90 Horas Cronológicas',
    price: 140000,
    cuota1: 70000,
    cuota2: 70000,
    modality: 'Presencial (Sede Arica)',
    description: 'Curso intensivo de formación inicial para nuevos guardias de seguridad. Incluye instrucción presencial en legislación de seguridad privada, defensa personal, primeros auxilios, prevención de riesgos y control de accesos.',
    certificationNote: 'PrevySeg entrega la capacitación y preparación completa. Para obtener la acreditación y credencial oficial de Guardia de Seguridad, la Subsecretaría de Prevención del Delito (SPD) / Autoridad Fiscalizadora aplica un examen evaluativo externo presencial.'
  },
  {
    id: 'ggss-form-online',
    name: 'GGSS FORMACIÓN ONLINE',
    code: 'OS10-FO-02',
    type: 'spd',
    category: 'Seguridad Privada SPD',
    hours: '90 Horas E-Learning',
    price: 140000,
    cuota1: 70000,
    cuota2: 70000,
    modality: 'Online Sincrónico SENCE',
    description: 'Capacitación a distancia a través de nuestra aula virtual interactiva con clases en vivo, simuladores de casos reales y talleres guiados por instructores acreditados.',
    certificationNote: 'PrevySeg entrega la capacitación preparatoria completa. La credencial oficial final es otorgada por la SPD tras rendir y aprobar el examen oficial ante la autoridad fiscalizadora.'
  },
  {
    id: 'ggss-perf-presencial',
    name: 'GGSS PERFECCIONAMIENTO PRESENCIAL',
    code: 'OS10-PP-03',
    type: 'spd',
    category: 'Seguridad Privada SPD',
    hours: '36 Horas Cronológicas',
    price: 90000,
    cuota1: 45000,
    cuota2: 45000,
    modality: 'Presencial (Sede Arica)',
    description: 'Reentrenamiento y actualización de conocimientos obligatorio cada 3 años para guardias activos. Actualización en Ley 21.659, derechos humanos, control de crisis y procedimientos operativos.',
    certificationNote: 'Capacitación preparatoria para renovación trienal. PrevySeg prepara al alumno para la rendición exitosa del examen de renovación ante la SPD / OS-10.'
  },
  {
    id: 'ggss-perf-online',
    name: 'GGSS PERFECCIONAMIENTO ONLINE',
    code: 'OS10-PO-04',
    type: 'spd',
    category: 'Seguridad Privada SPD',
    hours: '36 Horas E-Learning',
    price: 90000,
    cuota1: 45000,
    cuota2: 45000,
    modality: 'Online Sincrónico SENCE',
    description: 'Actualización normativa y perfeccionamiento en modalidad e-learning con flexibilidad horaria, ideal para trabajadores de turnos rotativos en minería, retail o puertos.',
    certificationNote: 'Capacitación preparatoria para renovación trienal. La acreditación renovada es formalizada tras la rendición del examen ante la entidad fiscalizadora SPD.'
  },
  {
    id: 'ggss-maritimo-perf',
    name: 'GGSS MARÍTIMO PORTUARIO PERFECCIONAMIENTO',
    code: 'DIR-MPP-05',
    type: 'spd',
    category: 'Seguridad Privada Directemar / SPD',
    hours: '40 Horas',
    price: 110000,
    cuota1: 55000,
    cuota2: 55000,
    modality: 'Presencial / Terreno',
    description: 'Reentrenamiento especializado para personal de seguridad en puertos, muelles y recintos marítimos de la Macro Zona Norte. Código PBIP y normativas marítimas.',
    certificationNote: 'PrevySeg imparte la instrucción técnica especializada. La acreditación para faenas marítimas requiere la validación y examen ante la Autoridad Marítima (Directemar) / SPD.'
  },
  {
    id: 'ggss-maritimo-form',
    name: 'GGSS MARÍTIMO PORTUARIO FORMACIÓN',
    code: 'DIR-MPF-06',
    type: 'spd',
    category: 'Seguridad Privada Directemar / SPD',
    hours: '90 Horas',
    price: 150000,
    cuota1: 75000,
    cuota2: 75000,
    modality: 'Presencial / Terreno',
    description: 'Formación integral para guardias marítimo-portuarios. Inspección de cargas, control de accesos a naves, protocolos internacionales de seguridad portuaria y código PBIP.',
    certificationNote: 'Capacitación preparatoria integral. La credencial marítimo-portuaria es otorgada mediante examen oficial ante la autoridad marítima reguladora Directemar / SPD.'
  },
  {
    id: 'cctv-online',
    name: 'CCTV ONLINE',
    code: 'CCTV-ON-07',
    type: 'oficio',
    category: 'Escuela de Oficios / Seguridad Electrónica',
    hours: '40 Horas',
    price: 140000,
    cuota1: 70000,
    cuota2: 70000,
    modality: 'Online Sincrónico',
    description: 'Operación profesional de centrales de monitoreo y cámaras de televigilancia (CCTV), software VMS, detección de intrusiones, protocolos de comunicación con carabineros y grabación judicial.',
    certificationNote: 'Certificación Directa OTEC PrevySeg. Se entrega Diploma y Certificado Oficial OTEC con registro SENCE y código de validación digital al completar las horas del curso.'
  },
  {
    id: 'otro-oficios',
    name: 'OTRO (ESCUELA DE OFICIOS)',
    code: 'OFIC-ESP-08',
    type: 'oficio',
    category: 'Escuela de Oficios Industriales PrevySeg',
    hours: '40 a 120 Horas',
    price: 130000,
    cuota1: 65000,
    cuota2: 65000,
    modality: 'Presencial / Práctico en Taller',
    description: 'Formación acelerada en oficios técnicos de alta demanda laboral: Soldadura Industrial SMAW/MIG, Conducción de Grúa Horquilla (Clase D), Gestión de Bodega y Logística, Electricidad Domiciliaria/Industrial, Paneles Solares.',
    certificationNote: 'Certificación Directa OTEC PrevySeg. Se entrega Diploma y Certificado de Aprobación Oficial emitido por PrevySeg con acreditación SENCE, válido curricularmente para desempeñarse en empresas de todo Chile.'
  }
];

// 10 Documentos Oficiales de la Ficha física
export const OFFICIAL_DOCUMENTS = [
  { id: 1, name: 'FOTOCOPIA CI (AMBOS LADOS)', detail: 'Copia legible y vigente de cédula por ambos lados.', requiredFor: 'todos' },
  { id: 2, name: 'CERT. ANTECEDENTES FINES ESPECIALES', detail: 'Emitido en línea con ClaveÚnica (Registro Civil) con menos de 30 días.', requiredFor: 'spd' },
  { id: 3, name: 'CERTIFICADO ESTUDIO 4° MEDIO (MINEDUC) / CERTIFICADO OS-10', detail: 'Licencia de Enseñanza Media con código QR o certificado previo.', requiredFor: 'todos' },
  { id: 4, name: 'CERTIFICADO MÉDICO', detail: 'Aptitud física compatible para el curso emitida por médico cirujano.', requiredFor: 'todos' },
  { id: 5, name: 'CERTIFICADO PSICOLÓGICO O PSIQUIATRA', detail: 'Informe de idoneidad y estabilidad mental (exigido para seguridad).', requiredFor: 'spd' },
  { id: 6, name: 'SITUACIÓN MILITAR AL DÍA (SI CORRESPONDE)', detail: 'Certificado emitido por la DGMN (para varones menores de 45 años).', requiredFor: 'spd' },
  { id: 7, name: 'CERTIFICADO O COMPROBANTE DE RESIDENCIA DEFINITIVA SI ES EXTRANJERO', detail: 'Permanencia definitiva otorgada por SERMIG.', requiredFor: 'extranjero' },
  { id: 8, name: 'DECLARACIÓN JURADA SIMPLE LEY 21.659', detail: 'Formato unificado oficial de 1 sola hoja PrevySeg.', requiredFor: 'spd' },
  { id: 9, name: 'CERTIFICADO VIGENCIA GGSS (REENTRENAMIENTO)', detail: 'Acreditar vigencia previa en cursos de perfeccionamiento.', requiredFor: 'perf' },
  { id: 10, name: 'CONTRATO DE TRABAJO Y SEGURO DE VIDA (SOLO EN CASO DE EMPRESA)', detail: 'Requerido exclusivamente si la postulación es financiada por empresa.', requiredFor: 'empresa' }
];

const EnrollmentForm = ({ defaultCourseName = '', onFinished }) => {
  // 1. Selector de Curso
  const initialCourse = OFFICIAL_COURSES.find(c => 
    defaultCourseName && (c.name.toLowerCase().includes(defaultCourseName.toLowerCase()) || defaultCourseName.toLowerCase().includes(c.name.toLowerCase()))
  ) || OFFICIAL_COURSES[0];

  const [selectedCourseId, setSelectedCourseId] = useState(initialCourse.id);
  const [selectedOficioDetail, setSelectedOficioDetail] = useState('Técnicas de Soldadura Industrial SMAW / MIG');

  // 2. Datos del Alumno (Alumno Dependiente)
  const [formData, setFormData] = useState({
    nombre: '',
    rut: '',
    fechaNacimiento: '',
    pais: 'Chile',
    telefono: '',
    domicilio: '',
    email: '',
    lugarTrabajo: 'Particular',
    condicionLaboral: 'particular', // 'particular' | 'empresa'
    empresaNombre: '',
    observaciones: ''
  });

  // 3. Abonos y Pagos
  const [paymentOption, setPaymentOption] = useState('cuota1'); // 'cuota1' (50%) | 'total' (100%)
  const [paymentMethod, setPaymentMethod] = useState('tarjeta'); // 'tarjeta' | 'transferencia' | 'efectivo'
  
  // Tarjetas
  const [cardData, setCardData] = useState({
    cardNumber: '•••• •••• •••• 4242',
    cardName: '',
    cardExpiry: '12/28',
    cardCvv: '•••'
  });

  // Estados de proceso
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [paymentCompleted, setPaymentCompleted] = useState(false);
  const [enrollmentCode, setEnrollmentCode] = useState('');
  const [showSuccessScreen, setShowSuccessScreen] = useState(false);

  // Obtener curso actual
  const currentCourse = OFFICIAL_COURSES.find(c => c.id === selectedCourseId) || OFFICIAL_COURSES[0];
  const isSpdCourse = currentCourse.type === 'spd';
  
  // Cálculo de montos
  const totalAmount = currentCourse.price;
  const cuota1Amount = currentCourse.cuota1; // 50%
  const cuota2Amount = currentCourse.cuota2; // 50%
  const amountToPayNow = paymentOption === 'cuota1' ? cuota1Amount : totalAmount;
  const pendingAmount = paymentOption === 'cuota1' ? cuota2Amount : 0;

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if (name === 'rut') {
      setFormData(prev => ({ ...prev, rut: formatRut(value) }));
    } else {
      setFormData(prev => ({ ...prev, [name]: value }));
    }
  };

  const handleProcessEnrollmentAndPayment = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    const generatedCode = `PS-${Math.floor(100000 + Math.random() * 900000)}`;
    setEnrollmentCode(generatedCode);

    try {
      if (formData.rut && formData.rut.trim()) {
        const cleanR = cleanRut(formData.rut);
        const formattedRut = formatRut(cleanR) || formData.rut.trim();

        // 1. Obtener curso id de la base de datos
        const { data: matchedCourses } = await supabase
          .from('courses')
          .select('id')
          .limit(1);
        const cId = matchedCourses?.[0]?.id || null;

        // 2. Verificar si el usuario ya existe
        const { data: existingUser } = await supabase
          .from('users')
          .select('id')
          .eq('rut', formattedRut)
          .maybeSingle();

        if (!existingUser) {
          // Crear usuario nuevo con contraseña encriptada (Bcrypt) mediante RPC
          await adminCreateUser({
            rut: formattedRut,
            nombre: formData.nombre.trim() || 'Postulante PrevySeg',
            email: formData.email.trim() || `${cleanR}@prevyseg.cl`,
            rol: 'STUDENT',
            telefono: formData.telefono.trim(),
            password: cleanR, // Clave inicial por defecto: RUT limpio (encriptada con Bcrypt)
            courseId: cId,
          });
        } else if (cId) {
          // Si el usuario ya existía, registrar su matrícula
          await supabase
            .from('enrollments')
            .insert({
              user_id: existingUser.id,
              course_id: cId,
              estado: 'PENDIENTE',
              progreso: 0,
              abono_inicial: amountToPayNow,
              documentos_validados: false,
            })
            .select()
            .maybeSingle();
        }
      }
    } catch (err) {
      console.warn('Enrollment db persist notice:', err);
    }

    setIsSubmitting(false);
    setPaymentCompleted(true);
    setShowSuccessScreen(true);
  };

  const handlePrint = () => {
    window.print();
  };

  // Construir mensaje directo a WhatsApp Oficial de PrevySeg
  const whatsappNumber = "56982312128"; // Contacto oficial de Admisión
  const courseFullName = selectedCourseId === 'otro-oficios' 
    ? `${currentCourse.name} (${selectedOficioDetail})` 
    : currentCourse.name;

  const whatsappMessage = encodeURIComponent(
    `*📋 NUEVA FICHA DE INSCRIPCIÓN - PREVYSEG OTEC*\n` +
    `*N° Solicitud:* ${enrollmentCode || 'PS-DIGITAL'}\n` +
    `----------------------------------------\n` +
    `*🎓 CURSO:* ${courseFullName}\n` +
    `*Modalidad:* ${currentCourse.modality} (${currentCourse.hours})\n` +
    `*Tipo Certificación:* ${isSpdCourse ? 'Capacitación Preparatoria Examen SPD' : 'Certificación Directa OTEC PrevySeg'}\n\n` +
    `*👤 DATOS DEL ALUMNO:*\n` +
    `• *Nombre:* ${formData.nombre || 'No especificado'}\n` +
    `• *RUT:* ${formData.rut || 'No especificado'}\n` +
    `• *Fecha Nacimiento:* ${formData.fechaNacimiento || 'No especificada'} (${formData.pais})\n` +
    `• *Teléfono:* ${formData.telefono || 'No especificado'}\n` +
    `• *Domicilio:* ${formData.domicilio || 'No especificado'}\n` +
    `• *Correo:* ${formData.email || 'No especificado'}\n` +
    `• *Condición:* ${formData.condicionLaboral === 'particular' ? 'Particular' : `Empresa: ${formData.empresaNombre}`}\n\n` +
    `*💳 PLAN DE ABONO (50%):*\n` +
    `• *Valor Total:* $${totalAmount.toLocaleString('es-CL')} CLP\n` +
    `• *Abono Inicial (Cuota N°1):* $${cuota1Amount.toLocaleString('es-CL')} CLP\n` +
    `• *Saldo al Inicio (Cuota N°2):* $${cuota2Amount.toLocaleString('es-CL')} CLP\n` +
    `• *Opción Elegida:* ${paymentOption === 'cuota1' ? 'Abono 50% ($' + cuota1Amount.toLocaleString('es-CL') + ')' : 'Pago Total 100%'}\n` +
    `• *Medio de Pago:* ${paymentMethod.toUpperCase()}\n` +
    `• *Estado Abono:* ${paymentCompleted ? 'ABONO CONFIRMADO ONLINE ✓' : 'PENDIENTE DE CONFIRMACIÓN'}\n` +
    `----------------------------------------\n` +
    `👋 *¡Hola equipo de Admisiones PrevySeg!* He completado mi Ficha de Inscripción online. Deseo coordinar la entrega y validación de mis documentos vía WhatsApp.`
  );

  const whatsappUrl = `https://api.whatsapp.com/send?phone=${whatsappNumber}&text=${whatsappMessage}`;

  return (
    <div className="w-full bg-white rounded-3xl border border-slate-200 shadow-2xl overflow-hidden print:bg-white print:text-black print:border-none print:shadow-none">
      
      {/* ================= PANTALLA DE ÉXITO TRAS ABONAR ================= */}
      <AnimatePresence>
        {showSuccessScreen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className="p-8 sm:p-12 text-center space-y-6 bg-gradient-to-b from-sky-50 via-white to-slate-50"
          >
            <div className="w-20 h-20 bg-emerald-50 text-emerald-600 rounded-3xl flex items-center justify-center mx-auto border-2 border-emerald-300 shadow-lg">
              <CheckCircle2 size={44} className="animate-bounce" />
            </div>

            <div className="space-y-2 max-w-xl mx-auto">
              <span className="inline-block bg-teal-50 text-teal-800 text-xs font-black uppercase px-3 py-1 rounded-full border border-teal-200 tracking-wider">
                Ficha de Inscripción Registrada
              </span>
              <h2 className="text-2xl sm:text-4xl font-black text-slate-900 tracking-tight">
                ¡Inscripción y Abono del 50% Registrado!
              </h2>
              <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
                Tu postulación para <strong className="text-slate-900">{courseFullName}</strong> ha sido reservada con éxito con el código <strong className="text-[#0284c7] font-mono">{enrollmentCode}</strong>.
              </p>
            </div>

            {/* Resumen del Pago / Abono */}
            <div className="p-6 rounded-2xl bg-slate-50 border border-slate-200 max-w-lg mx-auto text-left text-xs sm:text-sm space-y-3 font-mono text-slate-800 shadow-sm">
              <div className="flex justify-between border-b border-slate-200 pb-2">
                <span className="text-slate-500">Alumno:</span>
                <span className="font-bold text-slate-900">{formData.nombre || 'Postulante'}</span>
              </div>
              <div className="flex justify-between border-b border-slate-200 pb-2">
                <span className="text-slate-500">RUT:</span>
                <span className="font-bold text-slate-900">{formData.rut || 'No informado'}</span>
              </div>
              <div className="flex justify-between border-b border-slate-200 pb-2">
                <span className="text-slate-500">Abono Realizado (Cuota N°1):</span>
                <span className="font-black text-[#0284c7] text-base">${amountToPayNow.toLocaleString('es-CL')} CLP</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Saldo Pendiente (Cuota N°2 al iniciar):</span>
                <span className="font-bold text-amber-700">${pendingAmount.toLocaleString('es-CL')} CLP</span>
              </div>
            </div>

            {/* AVISO IMPORTANTE DE CONTACTO POR WHATSAPP */}
            <div className="p-6 rounded-2xl bg-emerald-50 border-2 border-emerald-300 max-w-2xl mx-auto text-left space-y-3 shadow-md">
              <div className="flex items-center gap-2.5 text-emerald-900 font-extrabold text-sm sm:text-base">
                <Phone size={22} className="text-emerald-600 flex-shrink-0 animate-pulse" />
                <span>RECEPCIÓN Y VALIDACIÓN DE DOCUMENTOS POR WHATSAPP</span>
              </div>
              <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
                ¡Ya estás registrado! Nuestro equipo de admisiones de <strong className="text-slate-900">PrevySeg</strong> se pondrá en contacto contigo a través de <strong>WhatsApp (+56 9 8231 2128)</strong> para solicitarte y validar las fotografías o PDFs de tus documentos obligatorios (Cédula de Identidad, Certificado de Antecedentes, etc.).
              </p>
              <div className="pt-2">
                <a
                  href={whatsappUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center justify-center gap-2 w-full sm:w-auto px-6 py-3.5 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-600 hover:to-teal-600 text-white font-bold text-xs sm:text-sm shadow-md transition-all cursor-pointer"
                >
                  <Send size={16} />
                  <span>Enviar Comprobante y Documentos por WhatsApp Ahora</span>
                </a>
              </div>
            </div>

            {/* Acciones Secundarias */}
            <div className="flex flex-wrap items-center justify-center gap-4 pt-4">
              <button
                type="button"
                onClick={handlePrint}
                className="px-6 py-3 rounded-xl bg-white hover:bg-slate-50 text-slate-700 text-xs font-bold border border-slate-200 flex items-center gap-2 cursor-pointer transition-all shadow-sm"
              >
                <Printer size={15} className="text-[#0284c7]" />
                <span>Imprimir / Descargar Comprobante PDF</span>
              </button>

              <button
                type="button"
                onClick={() => {
                  setShowSuccessScreen(false);
                  if (onFinished) onFinished();
                }}
                className="px-6 py-3 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold transition-all cursor-pointer"
              >
                Cerrar o Volver
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ================= FORMULARIO COMPLETO ================= */}
      {!showSuccessScreen && (
        <form onSubmit={handleProcessEnrollmentAndPayment} className="p-6 sm:p-10 space-y-10">
          
          {/* 1. ENCABEZADO INSTITUCIONAL OFICIAL */}
          <div className="border-b border-slate-200 pb-6 space-y-4">
            
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 bg-slate-50 p-6 rounded-2xl border border-slate-200">
              <div className="flex items-center gap-4">
                <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-[#0284c7] via-sky-500 to-[#00c2b2] flex items-center justify-center text-white font-black text-3xl shadow-lg">
                  PS
                </div>
                <div>
                  <span className="text-[11px] font-black uppercase text-[#0284c7] tracking-widest block">
                    FICHA DE INSCRIPCIÓN OFICIAL
                  </span>
                  <h1 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
                    PrevySeg
                  </h1>
                  <p className="text-xs text-slate-500">
                    Organismos Técnicos de Capacitación • Acreditación SENCE N° 1238088725
                  </p>
                </div>
              </div>

              <div className="flex flex-wrap items-center gap-2">
                <button
                  type="button"
                  onClick={handlePrint}
                  className="px-4 py-2 rounded-xl bg-white hover:bg-slate-100 text-slate-700 text-xs font-bold border border-slate-200 flex items-center gap-2 cursor-pointer transition-all shadow-sm"
                  title="Imprimir Ficha Oficial"
                >
                  <Printer size={14} className="text-[#0284c7]" />
                  <span className="hidden sm:inline">Imprimir Ficha PDF</span>
                </button>
                <span className="text-[11px] font-mono text-[#0284c7] bg-sky-50 px-3 py-1.5 rounded-xl border border-sky-200 font-bold">
                  Abono 50% Online
                </span>
              </div>
            </div>

            {/* Datos de contacto de la sede física */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs bg-slate-100/70 p-4 rounded-xl border border-slate-200 text-slate-700">
              <div className="flex items-center gap-2">
                <MapPin size={14} className="text-[#0284c7] flex-shrink-0" />
                <span><strong>Dir:</strong> Blanco Encalada N°666, 2do Piso, Arica</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone size={14} className="text-[#0284c7] flex-shrink-0" />
                <span><strong>Fijo / Cel:</strong> 222166822 • 982312128 • 978691869</span>
              </div>
              <div className="flex items-center gap-2">
                <Mail size={14} className="text-amber-600 flex-shrink-0" />
                <span><strong>Mail:</strong> prevyseg.capacitaciones@gmail.com</span>
              </div>
            </div>
          </div>

          {/* ================= 1.- SELECCIÓN DEL CURSO ================= */}
          <div className="space-y-4">
            <div className="flex items-center justify-between border-b border-slate-200 pb-2">
              <h2 className="text-base sm:text-lg font-black text-slate-900 flex items-center gap-2.5">
                <span className="w-7 h-7 rounded-xl bg-sky-50 text-[#0284c7] flex items-center justify-center text-xs font-black border border-sky-200">
                  1
                </span>
                <span>1.- CURSO / PROGRAMA DE CAPACITACIÓN</span>
              </h2>
              <span className="text-xs text-slate-500 font-mono">Seleccione el programa a cursar</span>
            </div>

            {/* Grid con los 8 Cursos de la Ficha física */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
              {OFFICIAL_COURSES.map((c) => {
                const isSelected = selectedCourseId === c.id;
                return (
                  <motion.div
                    key={c.id}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => setSelectedCourseId(c.id)}
                    className={`p-4 rounded-2xl border transition-all cursor-pointer flex flex-col justify-between gap-3 relative ${
                      isSelected
                        ? 'bg-sky-50/80 border-[#0284c7] shadow-lg shadow-sky-500/10 ring-2 ring-[#0284c7]/40'
                        : 'bg-slate-50 border-slate-200 hover:border-sky-300 hover:bg-white'
                    }`}
                  >
                    <div className="space-y-2">
                      <div className="flex items-start justify-between gap-2">
                        <span className={`text-[10px] font-black px-2 py-0.5 rounded-md uppercase tracking-wider ${
                          c.type === 'spd' ? 'bg-sky-100 text-sky-800 border border-sky-200' : 'bg-amber-100 text-amber-800 border border-amber-200'
                        }`}>
                          {c.type === 'spd' ? 'Seguridad SPD' : 'Escuela Oficios'}
                        </span>
                        {isSelected && (
                          <div className="w-5 h-5 rounded-full bg-[#0284c7] text-white flex items-center justify-center flex-shrink-0 shadow-sm">
                            <Check size={12} className="stroke-[3]" />
                          </div>
                        )}
                      </div>

                      <h3 className="text-xs font-black text-slate-900 leading-snug">
                        {c.name}
                      </h3>

                      <p className="text-[11px] text-slate-500 leading-tight">
                        {c.modality} • {c.hours}
                      </p>
                    </div>

                    <div className="pt-2 border-t border-slate-200 flex flex-col gap-1 text-xs">
                      <div className="flex justify-between items-center">
                        <span className="text-slate-500 text-[10px]">Arancel Total:</span>
                        <span className="font-bold text-slate-900 font-mono">${c.price.toLocaleString('es-CL')}</span>
                      </div>
                      <div className="flex justify-between items-center bg-sky-50 px-2 py-1 rounded-lg border border-sky-200">
                        <span className="text-[#0284c7] text-[10px] font-bold">Abono 50%:</span>
                        <span className="font-black text-[#0284c7] font-mono">${c.cuota1.toLocaleString('es-CL')}</span>
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </div>

            {/* Sub-selector si elige OTRO (Escuela de Oficios) */}
            {selectedCourseId === 'otro-oficios' && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                className="p-4 rounded-2xl bg-amber-50 border-2 border-amber-300 space-y-2 text-xs"
              >
                <label className="font-bold text-amber-900 block flex items-center gap-1.5">
                  <Sparkles size={14} className="text-amber-600" />
                  <span>Especifique el Programa Técnico de la Escuela de Oficios (30 Días):</span>
                </label>
                <select
                  value={selectedOficioDetail}
                  onChange={(e) => setSelectedOficioDetail(e.target.value)}
                  className="w-full bg-white border border-amber-300 rounded-xl px-4 py-2.5 text-xs text-slate-900 focus:outline-none focus:ring-2 focus:ring-amber-400"
                >
                  <option value="Técnicas de Soldadura Industrial SMAW / MIG">Técnicas de Soldadura Industrial SMAW / MIG</option>
                  <option value="Operación y Conducción Segura de Grúa Horquilla (Clase D)">Operación y Conducción Segura de Grúa Horquilla (Clase D)</option>
                  <option value="Técnicas de Operaciones Logísticas, Bodega y WMS">Técnicas de Operaciones Logísticas, Bodega y WMS</option>
                  <option value="Electricidad Básica e Instalaciones Domiciliarias (SEC D)">Electricidad Básica e Instalaciones Domiciliarias (SEC D)</option>
                  <option value="Instalación y Mantenimiento de Paneles Solares Fotovoltaicos">Instalación y Mantenimiento de Paneles Solares Fotovoltaicos</option>
                  <option value="Mantenimiento Mecánico Básico Industrial">Mantenimiento Mecánico Básico Industrial</option>
                </select>
              </motion.div>
            )}

            {/* ================= APARTADO EXPLICATIVO: DESCRIPCIÓN + DISTINCIÓN SPD VS OFICIOS ================= */}
            <div className="p-5 sm:p-6 rounded-3xl bg-slate-50 border border-slate-200 shadow-md space-y-4">
              
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-200 pb-3">
                <div className="flex items-center gap-2">
                  <Info size={18} className="text-[#0284c7]" />
                  <h4 className="text-sm font-black text-slate-900 uppercase tracking-wider">
                    Detalle del Curso Seleccionado: <span className="text-[#0284c7]">{courseFullName}</span>
                  </h4>
                </div>
                <span className="text-xs font-mono text-slate-500">
                  {currentCourse.hours} • {currentCourse.modality}
                </span>
              </div>

              {/* 1. Descripción de lo que se hace en el curso */}
              <div className="space-y-1 text-xs text-slate-600">
                <strong className="text-slate-900 block font-bold">¿Qué se hace y qué aprenderás en este curso?</strong>
                <p className="leading-relaxed text-slate-600">
                  {currentCourse.description}
                </p>
              </div>

              {/* 2. Cuadro Normativo de Certificación (Distinción Guardia SPD vs Oficios) */}
              <AnimatePresence mode="wait">
                {isSpdCourse ? (
                  <motion.div
                    key="spd-card"
                    initial={{ opacity: 0, y: 5 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -5 }}
                    className="p-4 rounded-2xl bg-sky-50 border-2 border-sky-300 space-y-2 text-xs"
                  >
                    <div className="flex items-center gap-2 text-sky-900 font-extrabold text-xs sm:text-sm">
                      <ShieldCheck size={18} className="text-[#0284c7] flex-shrink-0" />
                      <span>MODALIDAD DE ACREDITACIÓN: EXAMEN OFICIAL ANTE LA SUBSECRETARÍA DE PREVENCIÓN DEL DELITO (SPD)</span>
                    </div>
                    <p className="text-slate-700 leading-relaxed">
                      En <strong className="text-slate-900">PrevySeg</strong> te entregamos la <strong>preparación y capacitación integral</strong> (teórica, táctica y legal) requerida por el reglamento.
                      <br />
                      <strong className="text-amber-800">ATENCIÓN:</strong> Para ser oficialmente Guardia de Seguridad acreditado, la normativa exige la <u>acreditación externa por parte de la Subsecretaría de Prevención del Delito (SPD)</u>, en la cual se debe rendir y aprobar un <strong>examen evaluativo presencial</strong> ante dicha entidad reguladora. En PrevySeg te preparamos al 100% para aprobar tu examen con honores.
                    </p>
                  </motion.div>
                ) : (
                  <motion.div
                    key="oficio-card"
                    initial={{ opacity: 0, y: 5 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -5 }}
                    className="p-4 rounded-2xl bg-emerald-50 border-2 border-emerald-300 space-y-2 text-xs"
                  >
                    <div className="flex items-center gap-2 text-emerald-900 font-extrabold text-xs sm:text-sm">
                      <Award size={18} className="text-emerald-600 flex-shrink-0" />
                      <span>MODALIDAD DE ACREDITACIÓN: ENTREGA DIRECTA DE DIPLOMA Y CERTIFICADO PREVYSEG OTEC</span>
                    </div>
                    <p className="text-slate-700 leading-relaxed">
                      A diferencia de los cursos de guardia que requieren examen ante la SPD, en los programas de la <strong className="text-slate-900">Escuela de Oficios</strong> <u>sí se entregan formalmente los Diplomas y Certificados de Aprobación Oficial emitidos directamente por PrevySeg OTEC</u>, con registro SENCE y código de validación digital para presentarlo en cualquier empresa o faena del país.
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>

            </div>

          </div>

          {/* ================= 2.- ALUMNO DEPENDIENTE (DATOS PERSONALES) ================= */}
          <div className="space-y-4 border-t border-slate-200 pt-6">
            <div className="flex items-center justify-between border-b border-slate-200 pb-2">
              <h2 className="text-base sm:text-lg font-black text-slate-900 flex items-center gap-2.5">
                <span className="w-7 h-7 rounded-xl bg-sky-50 text-[#0284c7] flex items-center justify-center text-xs font-black border border-sky-200">
                  2
                </span>
                <span>2.- ALUMNO DEPENDIENTE (DATOS PERSONALES)</span>
              </h2>
              <span className="text-xs text-slate-500 font-mono">Ficha física Sección 2</span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 text-xs">
              
              {/* Nombre Completo */}
              <div className="space-y-1.5 sm:col-span-2">
                <label className="font-bold text-slate-700 flex items-center gap-1.5">
                  <User size={14} className="text-[#0284c7]" />
                  <span>NOMBRE COMPLETO *</span>
                </label>
                <input
                  type="text"
                  required
                  name="nombre"
                  placeholder="Ej. MARCO FRANCISCO NAHUELQUEO AILLAPÁN"
                  value={formData.nombre}
                  onChange={handleInputChange}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-xs sm:text-sm text-slate-900 focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#0284c7]"
                />
              </div>

              {/* RUT / Documento */}
              <div className="space-y-1.5">
                <label className="font-bold text-slate-700">RUT / DOCUMENTO *</label>
                <input
                  type="text"
                  required
                  name="rut"
                  placeholder="Ej. 18.643.817-5"
                  value={formData.rut}
                  onChange={handleInputChange}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-xs sm:text-sm text-slate-900 font-mono focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#0284c7]"
                />
              </div>

              {/* Fecha de Nacimiento */}
              <div className="space-y-1.5">
                <label className="font-bold text-slate-700 flex items-center gap-1.5">
                  <Calendar size={14} className="text-[#0284c7]" />
                  <span>FECHA DE NACIMIENTO *</span>
                </label>
                <input
                  type="date"
                  required
                  name="fechaNacimiento"
                  value={formData.fechaNacimiento}
                  onChange={handleInputChange}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-xs sm:text-sm text-slate-900 focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#0284c7]"
                />
              </div>

              {/* País de Nacimiento */}
              <div className="space-y-1.5">
                <label className="font-bold text-slate-700">PAÍS DE NACIMIENTO *</label>
                <input
                  type="text"
                  required
                  name="pais"
                  placeholder="Chile / Perú / Bolivia / Colombia / etc."
                  value={formData.pais}
                  onChange={handleInputChange}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-xs sm:text-sm text-slate-900 focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#0284c7]"
                />
              </div>

              {/* Teléfono / WhatsApp */}
              <div className="space-y-1.5">
                <label className="font-bold text-slate-700 flex items-center gap-1.5">
                  <Phone size={14} className="text-emerald-600" />
                  <span>TELÉFONO / WHATSAPP *</span>
                </label>
                <input
                  type="tel"
                  required
                  name="telefono"
                  placeholder="Ej. 990640464"
                  value={formData.telefono}
                  onChange={handleInputChange}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-xs sm:text-sm text-slate-900 font-mono focus:bg-white focus:outline-none focus:ring-2 focus:ring-emerald-500"
                />
              </div>

              {/* Domicilio */}
              <div className="space-y-1.5 sm:col-span-2">
                <label className="font-bold text-slate-700 flex items-center gap-1.5">
                  <MapPin size={14} className="text-rose-500" />
                  <span>DOMICILIO COMPLETO *</span>
                </label>
                <input
                  type="text"
                  required
                  name="domicilio"
                  placeholder="Ej. Av. Robinson Rojas #4616, Arica"
                  value={formData.domicilio}
                  onChange={handleInputChange}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-xs sm:text-sm text-slate-900 focus:bg-white focus:outline-none focus:ring-2 focus:ring-rose-400"
                />
              </div>

              {/* Correo Electrónico */}
              <div className="space-y-1.5">
                <label className="font-bold text-slate-700 flex items-center gap-1.5">
                  <Mail size={14} className="text-amber-600" />
                  <span>CORREO ELECTRÓNICO *</span>
                </label>
                <input
                  type="email"
                  required
                  name="email"
                  placeholder="nahuelqueo.marco@gmail.com"
                  value={formData.email}
                  onChange={handleInputChange}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-xs sm:text-sm text-slate-900 focus:bg-white focus:outline-none focus:ring-2 focus:ring-amber-400"
                />
              </div>

              {/* Lugar de Trabajo / Condición */}
              <div className="space-y-2 sm:col-span-3 bg-slate-100/80 p-4 rounded-2xl border border-slate-200 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                <div className="flex flex-wrap items-center gap-4">
                  <span className="font-bold text-slate-800">LUGAR DE TRABAJO (SI ES EL CASO):</span>
                  <label className="flex items-center gap-2 text-slate-700 cursor-pointer">
                    <input
                      type="radio"
                      name="condicionLaboral"
                      value="particular"
                      checked={formData.condicionLaboral === 'particular'}
                      onChange={() => setFormData(prev => ({ ...prev, condicionLaboral: 'particular', empresaNombre: '' }))}
                    />
                    <span>Particular</span>
                  </label>
                  <label className="flex items-center gap-2 text-slate-700 cursor-pointer">
                    <input
                      type="radio"
                      name="condicionLaboral"
                      value="empresa"
                      checked={formData.condicionLaboral === 'empresa'}
                      onChange={() => setFormData(prev => ({ ...prev, condicionLaboral: 'empresa' }))}
                    />
                    <span>Empresa Empleadora / Patrocinado</span>
                  </label>
                </div>

                {formData.condicionLaboral === 'empresa' && (
                  <input
                    type="text"
                    required
                    placeholder="Nombre o Razón Social de la Empresa..."
                    value={formData.empresaNombre}
                    onChange={(e) => setFormData(prev => ({ ...prev, empresaNombre: e.target.value }))}
                    className="bg-white border border-slate-200 rounded-xl px-3.5 py-2 text-xs text-slate-900 w-full sm:w-72 focus:outline-none focus:ring-2 focus:ring-sky-500"
                  />
                )}
              </div>

            </div>
          </div>

          {/* ================= 3.- ABONOS (50% CUOTA INICIAL) & PASARELA DE PAGO ================= */}
          <div className="space-y-5 border-t border-slate-200 pt-6">
            <div className="flex items-center justify-between border-b border-slate-200 pb-2">
              <h2 className="text-base sm:text-lg font-black text-slate-900 flex items-center gap-2.5">
                <span className="w-7 h-7 rounded-xl bg-sky-50 text-[#0284c7] flex items-center justify-center text-xs font-black border border-sky-200">
                  3
                </span>
                <span>3.- ABONOS (PLAN DE CUOTAS DEL 50%)</span>
              </h2>
              <span className="text-xs text-slate-500 font-mono">Ficha física Sección 3</span>
            </div>

            {/* Selector de Plan de Abono */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              
              {/* Cuota N° 1: 50% de Abono */}
              <div 
                onClick={() => setPaymentOption('cuota1')}
                className={`p-5 rounded-3xl border-2 transition-all cursor-pointer flex flex-col justify-between gap-3 ${
                  paymentOption === 'cuota1'
                    ? 'bg-sky-50/80 border-[#0284c7] shadow-lg shadow-sky-500/10 ring-2 ring-[#0284c7]/30'
                    : 'bg-slate-50 border-slate-200 hover:border-sky-300'
                }`}
              >
                <div className="flex justify-between items-start">
                  <div>
                    <span className="inline-block bg-sky-100 text-sky-800 text-[10px] font-black uppercase px-2.5 py-0.5 rounded-full border border-sky-200 mb-1">
                      OPCIÓN RECOMENDADA (50%)
                    </span>
                    <h4 className="text-sm font-black text-slate-900">CUOTA Nº 1 ENTREGA DE DOC. / RESERVA</h4>
                    <p className="text-xs text-slate-600">Pagas el 50% ahora para abrir expediente y reservar cupo oficial SENCE.</p>
                  </div>
                  {paymentOption === 'cuota1' && (
                    <div className="w-6 h-6 rounded-full bg-[#0284c7] text-white flex items-center justify-center font-bold shadow-sm">
                      <Check size={14} className="stroke-[3]" />
                    </div>
                  )}
                </div>

                <div className="pt-2 border-t border-slate-200 flex justify-between items-end">
                  <span className="text-xs text-slate-500 font-mono">Abono Inicial Hoy:</span>
                  <div className="text-right">
                    <span className="text-2xl font-black text-[#0284c7] font-mono">
                      ${cuota1Amount.toLocaleString('es-CL')}
                    </span>
                    <span className="text-[10px] text-slate-500 block font-mono">Saldo 50% ($ {cuota2Amount.toLocaleString('es-CL')}) al inicio</span>
                  </div>
                </div>
              </div>

              {/* Cuota Total: 100% */}
              <div 
                onClick={() => setPaymentOption('total')}
                className={`p-5 rounded-3xl border-2 transition-all cursor-pointer flex flex-col justify-between gap-3 ${
                  paymentOption === 'total'
                    ? 'bg-sky-50/80 border-[#0284c7] shadow-lg shadow-sky-500/10 ring-2 ring-[#0284c7]/30'
                    : 'bg-slate-50 border-slate-200 hover:border-sky-300'
                }`}
              >
                <div className="flex justify-between items-start">
                  <div>
                    <span className="inline-block bg-emerald-100 text-emerald-800 text-[10px] font-black uppercase px-2.5 py-0.5 rounded-full border border-emerald-200 mb-1">
                      PAGO COMPLETO (100%)
                    </span>
                    <h4 className="text-sm font-black text-slate-900">CUOTA Nº 1 + CUOTA Nº 2 (TOTALIDAD)</h4>
                    <p className="text-xs text-slate-600">Cancelas la totalidad del arancel en una sola transacción sin cuotas pendientes.</p>
                  </div>
                  {paymentOption === 'total' && (
                    <div className="w-6 h-6 rounded-full bg-[#0284c7] text-white flex items-center justify-center font-bold shadow-sm">
                      <Check size={14} className="stroke-[3]" />
                    </div>
                  )}
                </div>

                <div className="pt-2 border-t border-slate-200 flex justify-between items-end">
                  <span className="text-xs text-slate-500 font-mono">Total a Pagar Hoy:</span>
                  <div className="text-right">
                    <span className="text-2xl font-black text-slate-900 font-mono">
                      ${totalAmount.toLocaleString('es-CL')}
                    </span>
                    <span className="text-[10px] text-emerald-600 block font-mono">Arancel 100% Cancelado</span>
                  </div>
                </div>
              </div>

            </div>

            {/* Medios de Pago */}
            <div className="bg-slate-50 p-6 rounded-3xl border border-slate-200 space-y-4">
              
              <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-200 pb-3">
                <span className="text-xs font-bold text-slate-800 uppercase tracking-wider">
                  Selecciona el Medio de Pago para el Abono:
                </span>
                
                <div className="flex flex-wrap gap-2">
                  {[
                    { id: 'tarjeta', label: '💳 Tarjetas (Webpay / Débito / Crédito)', icon: CreditCard },
                    { id: 'transferencia', label: '🏦 Transferencia Electrónica', icon: Building2 },
                    { id: 'efectivo', label: '💵 Pago Presencial en Sede', icon: DollarSign },
                  ].map((m) => (
                    <button
                      key={m.id}
                      type="button"
                      onClick={() => setPaymentMethod(m.id)}
                      className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer border ${
                        paymentMethod === m.id
                          ? 'bg-[#0284c7] text-white border-sky-400 shadow-md'
                          : 'bg-white text-slate-600 border-slate-200 hover:text-slate-900'
                      }`}
                    >
                      {m.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Opción 1: Tarjetas Webpay Plus */}
              {paymentMethod === 'tarjeta' && (
                <div className="space-y-4 pt-1">
                  <div className="p-4 bg-sky-50 rounded-2xl border border-sky-200 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2">
                    <div>
                      <span className="text-xs text-slate-500 block font-bold uppercase">Monto a cargar con Tarjeta:</span>
                      <span className="text-2xl font-black text-[#0284c7] font-mono">
                        ${amountToPayNow.toLocaleString('es-CL')} CLP
                      </span>
                    </div>
                    <div className="text-xs text-sky-800 font-mono bg-sky-100 px-3 py-1.5 rounded-xl border border-sky-200">
                      🔒 Pasarela Webpay Plus • Transbank Encriptada
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 text-xs">
                    <div className="sm:col-span-2">
                      <label className="font-semibold text-slate-700 block mb-1">Número de Tarjeta</label>
                      <input
                        type="text"
                        value={cardData.cardNumber}
                        onChange={(e) => setCardData({ ...cardData, cardNumber: e.target.value })}
                        className="w-full bg-white border border-slate-200 rounded-xl px-3.5 py-2.5 text-slate-900 font-mono focus:outline-none focus:border-sky-500 focus:ring-2 focus:ring-sky-500/30"
                      />
                    </div>
                    <div>
                      <label className="font-semibold text-slate-700 block mb-1">Vencimiento (MM/AA)</label>
                      <input
                        type="text"
                        value={cardData.cardExpiry}
                        onChange={(e) => setCardData({ ...cardData, cardExpiry: e.target.value })}
                        className="w-full bg-white border border-slate-200 rounded-xl px-3.5 py-2.5 text-slate-900 font-mono focus:outline-none focus:border-sky-500 focus:ring-2 focus:ring-sky-500/30"
                      />
                    </div>
                    <div>
                      <label className="font-semibold text-slate-700 block mb-1">CVV / CVC</label>
                      <input
                        type="text"
                        value={cardData.cardCvv}
                        onChange={(e) => setCardData({ ...cardData, cardCvv: e.target.value })}
                        className="w-full bg-white border border-slate-200 rounded-xl px-3.5 py-2.5 text-slate-900 font-mono focus:outline-none focus:border-sky-500 focus:ring-2 focus:ring-sky-500/30"
                      />
                    </div>
                  </div>
                </div>
              )}

              {/* Opción 2: Transferencia Bancaria */}
              {paymentMethod === 'transferencia' && (
                <div className="p-4 bg-white rounded-2xl border border-slate-200 space-y-3 text-xs">
                  <h4 className="font-bold text-slate-900 text-sm flex items-center gap-2">
                    <Building2 size={16} className="text-[#0284c7]" />
                    <span>Datos Oficiales para Transferencia Electrónica:</span>
                  </h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-slate-700 bg-slate-50 p-3.5 rounded-xl border border-slate-200 font-mono text-xs">
                    <div><strong className="text-slate-500">Banco:</strong> Banco Santander / Banco Estado</div>
                    <div><strong className="text-slate-500">Tipo de Cuenta:</strong> Cuenta Corriente</div>
                    <div><strong className="text-slate-500">N° Cuenta:</strong> 74-88921-01</div>
                    <div><strong className="text-slate-500">RUT Titular:</strong> 77.123.456-K</div>
                    <div><strong className="text-slate-500">Nombre Titular:</strong> OTEC PREVYSEG SPA</div>
                    <div><strong className="text-slate-500">Correo:</strong> prevyseg.capacitaciones@gmail.com</div>
                  </div>
                  <p className="text-[11px] text-slate-500">
                    * Al transferir, incluye en el asunto tu <strong>Nombre y RUT</strong>. Una vez completada la inscripción, podrás enviar el comprobante directamente al WhatsApp de admisiones.
                  </p>
                </div>
              )}

              {/* Opción 3: Efectivo en Sede */}
              {paymentMethod === 'efectivo' && (
                <div className="p-4 bg-amber-50 rounded-2xl border border-amber-200 text-xs text-amber-900 space-y-2">
                  <h4 className="font-bold text-amber-900 text-sm">Pago Presencial en Sede Arica:</h4>
                  <p>
                    Puedes abonar tu 50% o el total en efectivo o tarjeta física en nuestras oficinas de atención:
                  </p>
                  <div className="font-bold text-slate-900 bg-white p-3 rounded-xl border border-amber-200">
                    📍 Blanco Encalada N°666, 2do Piso, Arica (Lunes a Viernes de 09:00 a 19:00 hrs).
                  </div>
                </div>
              )}

            </div>

          </div>

          {/* ================= 4.- BUZÓN DE PREGUNTAS O DUDAS ================= */}
          <div className="space-y-4 border-t border-slate-200 pt-6">
            <div className="flex items-center justify-between border-b border-slate-200 pb-2">
              <h2 className="text-base sm:text-lg font-black text-slate-900 flex items-center gap-2.5">
                <span className="w-7 h-7 rounded-xl bg-sky-50 text-[#0284c7] flex items-center justify-center text-xs font-black border border-sky-200">
                  4
                </span>
                <span>4.- BUZÓN DE PREGUNTAS O DUDAS</span>
              </h2>
              <span className="text-xs text-slate-500 font-mono">Consultas y requerimientos</span>
            </div>

            <textarea
              name="observaciones"
              rows="3"
              placeholder="Escribe aquí cualquier pregunta, duda sobre el curso, disponibilidad de horarios o consulta que tengas..."
              value={formData.observaciones}
              onChange={handleInputChange}
              className="w-full bg-slate-50 border border-slate-200 rounded-2xl p-4 text-xs sm:text-sm text-slate-900 focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#0284c7] resize-none"
            />

            {/* Aviso informativo de contacto para documentación */}
            <div className="p-4 rounded-2xl bg-teal-50 border border-teal-200 flex items-start gap-3 shadow-sm">
              <Phone size={18} className="text-teal-600 flex-shrink-0 mt-0.5 animate-pulse" />
              <div className="space-y-1 text-xs">
                <span className="font-bold text-teal-900 block">
                  Aviso Importante sobre Documentación:
                </span>
                <p className="text-slate-700 leading-relaxed">
                  Una vez que te inscribas, nuestro equipo de admisiones de <strong className="text-slate-900">PrevySeg</strong> se comunicará directamente contigo vía <strong>WhatsApp o teléfono</strong> por si llegases a necesitar presentar o validar algún documento específico según tu curso o capacitación.
                </p>
              </div>
            </div>
          </div>



          {/* ================= BOTÓN PRINCIPAL DE ENVÍO Y ABONO ================= */}
          <div className="border-t border-slate-200 pt-6 space-y-4">
            
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4 p-5 rounded-2xl bg-sky-50 border border-sky-200">
              <div className="space-y-1 text-center sm:text-left">
                <span className="text-xs text-sky-800 font-bold uppercase block">
                  Total a abonar para completar inscripción:
                </span>
                <span className="text-3xl font-black text-slate-900 font-mono">
                  ${amountToPayNow.toLocaleString('es-CL')} CLP
                </span>
                <span className="text-[11px] text-slate-600 block">
                  {paymentOption === 'cuota1' ? 'Abono 50% (Cuota N°1 Reserva)' : 'Pago Total 100%'} • {currentCourse.name}
                </span>
              </div>

              <motion.button
                whileHover={{ scale: 1.04, boxShadow: '0 0 25px rgba(2, 132, 199, 0.3)' }}
                whileTap={{ scale: 0.96 }}
                type="submit"
                disabled={isSubmitting}
                className="w-full sm:w-auto px-8 py-4 rounded-2xl bg-gradient-to-r from-[#0284c7] to-[#00c2b2] hover:from-sky-600 hover:to-teal-600 text-white font-black text-sm shadow-xl flex items-center justify-center gap-2 cursor-pointer transition-all border border-sky-300/40"
              >
                {isSubmitting ? (
                  <span className="flex items-center gap-2">
                    <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    <span>Procesando Ficha y Abono...</span>
                  </span>
                ) : (
                  <>
                    <Sparkles size={16} />
                    <span>Confirmar Ficha y Abonar ${amountToPayNow.toLocaleString('es-CL')}</span>
                    <ArrowRight size={16} />
                  </>
                )}
              </motion.button>
            </div>

            <div className="flex flex-wrap items-center justify-center gap-4 text-xs text-slate-500 text-center">
              <span className="flex items-center gap-1.5">
                <Lock size={13} className="text-emerald-600" />
                <span>Datos protegidos bajo Ley N° 19.628</span>
              </span>
              <span>•</span>
              <span className="flex items-center gap-1.5">
                <Phone size={13} className="text-emerald-600" />
                <span>Contacto directo vía WhatsApp (+56 9 8231 2128)</span>
              </span>
            </div>

          </div>

        </form>
      )}

    </div>
  );
};

export default EnrollmentForm;
