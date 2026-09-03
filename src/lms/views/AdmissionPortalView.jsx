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
  Download, 
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
  QrCode
} from 'lucide-react';

export const COURSES_LIST = [
  {
    id: 'ggss-form-presencial',
    name: 'GGSS FORMACIÓN PRESENCIAL',
    type: 'spd',
    category: 'Seguridad Privada SPD',
    hours: '90 Horas',
    price: 140000,
    cuota1: 70000,
    cuota2: 70000,
    modality: 'Presencial (Sede Arica)',
    description: 'Curso intensivo de formación para nuevos guardias de seguridad con instrucción presencial y talleres tácticos.'
  },
  {
    id: 'ggss-form-online',
    name: 'GGSS FORMACIÓN ONLINE',
    type: 'spd',
    category: 'Seguridad Privada SPD',
    hours: '90 Horas',
    price: 140000,
    cuota1: 70000,
    cuota2: 70000,
    modality: 'Online Sincrónico SENCE',
    description: 'Capacitación 100% online a través de nuestra aula virtual con clases en vivo y simuladores interactivos.'
  },
  {
    id: 'ggss-perf-presencial',
    name: 'GGSS PERFECCIONAMIENTO PRESENCIAL',
    type: 'spd',
    category: 'Seguridad Privada SPD',
    hours: '36 Horas',
    price: 90000,
    cuota1: 45000,
    cuota2: 45000,
    modality: 'Presencial (Sede Arica)',
    description: 'Reentrenamiento y renovación trienal obligatoria para guardias de seguridad acreditados en funciones.'
  },
  {
    id: 'ggss-perf-online',
    name: 'GGSS PERFECCIONAMIENTO ONLINE',
    type: 'spd',
    category: 'Seguridad Privada SPD',
    hours: '36 Horas',
    price: 90000,
    cuota1: 45000,
    cuota2: 45000,
    modality: 'Online Sincrónico SENCE',
    description: 'Actualización normativa y perfeccionamiento en modalidad e-learning para renovación de credencial.'
  },
  {
    id: 'ggss-maritimo-perf',
    name: 'GGSS MARÍTIMO PORTUARIO PERFECCIONAMIENTO',
    type: 'spd',
    category: 'Seguridad Privada Directemar / SPD',
    hours: '40 Horas',
    price: 110000,
    cuota1: 55000,
    cuota2: 55000,
    modality: 'Presencial / Terreno',
    description: 'Renovación de acreditación para guardias que operan en puertos, terminales y recintos bajo jurisdicción marítima.'
  },
  {
    id: 'ggss-maritimo-form',
    name: 'GGSS MARÍTIMO PORTUARIO FORMACIÓN',
    type: 'spd',
    category: 'Seguridad Privada Directemar / SPD',
    hours: '90 Horas',
    price: 150000,
    cuota1: 75000,
    cuota2: 75000,
    modality: 'Presencial / Terreno',
    description: 'Formación especializada en seguridad portuaria, control aduanero y código PBIP para terminales de la Macro Zona Norte.'
  },
  {
    id: 'cctv-online',
    name: 'CCTV ONLINE',
    type: 'oficio',
    category: 'Escuela de Oficios / Tecnología',
    hours: '40 Horas',
    price: 140000,
    cuota1: 70000,
    cuota2: 70000,
    modality: 'Online Sincrónico',
    description: 'Operación profesional de centrales de televigilancia, monitoreo IP, protocolos de alarma y grabación.'
  },
  {
    id: 'otro-oficios',
    name: 'OTRO (ESCUELA DE OFICIOS)',
    type: 'oficio',
    category: 'Escuela de Oficios PrevySeg',
    hours: '60 a 120 Horas',
    price: 130000,
    cuota1: 65000,
    cuota2: 65000,
    modality: 'Presencial / Práctico',
    description: 'Programas de capacitación en oficios técnicos: Soldadura Industrial, Manejo de Grúa Horquilla, Operador Logístico, etc.'
  }
];

export const REQUIRED_DOCUMENTS_FICHA = [
  { id: 1, name: 'FOTOCOPIA CI (AMBOS LADOS)', detail: 'Copia legible y vigente por ambos lados.' },
  { id: 2, name: 'CERT. ANTECEDENTES FINES ESPECIALES', detail: 'Emitido en línea con ClaveÚnica (Registro Civil).' },
  { id: 3, name: 'CERTIFICADO ESTUDIO 4° MEDIO (MINEDUC)', detail: 'Licencia de Enseñanza Media con código QR.' },
  { id: 4, name: 'CERTIFICADO MÉDICO', detail: 'Aptitud física compatible emitida por médico cirujano.' },
  { id: 5, name: 'CERTIFICADO PSICOLÓGICO O PSIQUIATRA', detail: 'Informe de idoneidad y estabilidad emocional.' },
  { id: 6, name: 'SITUACIÓN MILITAR AL DÍA (SI CORRESPONDE)', detail: 'Certificado DGMN para varones.' },
  { id: 7, name: 'CERTIFICADO DE RESIDENCIA DEFINITIVA (SI ES EXTRANJERO)', detail: 'Permanencia definitiva SERMIG.' },
  { id: 8, name: 'DECLARACIÓN JURADA SIMPLE LEY 21.659', detail: 'Formato oficial unificado de 1 sola hoja PrevySeg.' },
  { id: 9, name: 'CERTIFICADO VIGENCIA GGSS (REENTREAMIENTO)', detail: 'Para cursos de perfeccionamiento y renovación.' },
  { id: 10, name: 'CONTRATO DE TRABAJO Y SEGURO DE VIDA', detail: 'Exclusivo en caso de postulación patrocinada por empresa.' }
];

const AdmissionPortalView = ({ currentUser }) => {
  // 1. Estado del Curso Seleccionado
  const [selectedCourseId, setSelectedCourseId] = useState('ggss-form-presencial');
  const [selectedOficioName, setSelectedOficioName] = useState('Técnicas de Soldadura Industrial SMAW / MIG');

  // 2. Estado de Datos del Alumno (Alumno Dependiente)
  const [formData, setFormData] = useState({
    nombre: currentUser?.nombre || '',
    rut: currentUser?.rut || currentUser?.user || '',
    fechaNacimiento: '1993-08-26',
    pais: 'Chile',
    telefono: '982312128',
    domicilio: 'Av. Robinson Rojas #4616, Arica',
    email: currentUser?.email || 'alumno.postulante@gmail.com',
    lugarTrabajo: 'Particular',
    condicionLaboral: 'particular', // 'particular' | 'empresa'
    empresaNombre: '',
    observaciones: 'Postulación para la próxima cohorte disponible.'
  });

  // 3. Estado de Abonos y Medios de Pago
  const [paymentOption, setPaymentOption] = useState('cuota1'); // 'cuota1' ($70.000) | 'total' ($140.000)
  const [paymentMethod, setPaymentMethod] = useState('tarjeta'); // 'tarjeta' | 'transferencia' | 'efectivo'
  const [cardData, setCardData] = useState({
    cardNumber: '•••• •••• •••• 4242',
    cardName: currentUser?.nombre || 'MARCO FRANCISCO NAHUELQUEO',
    cardExpiry: '12/28',
    cardCvv: '•••'
  });
  const [isProcessingPayment, setIsProcessingPayment] = useState(false);
  const [paymentSuccess, setPaymentSuccess] = useState(false);
  const [formSubmitted, setFormSubmitted] = useState(false);

  // Obtener detalles del curso seleccionado
  const selectedCourse = COURSES_LIST.find(c => c.id === selectedCourseId) || COURSES_LIST[0];
  const isSpdCourse = selectedCourse.type === 'spd';
  const currentAbonoAmount = paymentOption === 'cuota1' ? selectedCourse.cuota1 : selectedCourse.price;

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handlePayAbono = (e) => {
    e.preventDefault();
    setIsProcessingPayment(true);
    setTimeout(() => {
      setIsProcessingPayment(false);
      setPaymentSuccess(true);
    }, 1200);
  };

  const handlePrintForm = () => {
    window.print();
  };

  // Construir mensaje oficial para WhatsApp
  const whatsappPhone = "56982312128";
  const whatsappMessage = encodeURIComponent(
    `*FICHA DE INSCRIPCIÓN PREVYSEG OTEC*\n` +
    `----------------------------------------\n` +
    `*Curso:* ${selectedCourse.name} ${selectedCourseId === 'otro-oficios' ? `(${selectedOficioName})` : ''}\n` +
    `*Tipo Certificación:* ${isSpdCourse ? 'Capacitación Preparatoria Examen SPD' : 'Certificación Directa OTEC PrevySeg'}\n` +
    `*Alumno:* ${formData.nombre}\n` +
    `*RUT:* ${formData.rut}\n` +
    `*Teléfono:* ${formData.telefono}\n` +
    `*Correo:* ${formData.email}\n` +
    `*Domicilio:* ${formData.domicilio}\n` +
    `*Condición:* ${formData.condicionLaboral === 'particular' ? 'Particular' : `Empresa (${formData.empresaNombre})`}\n` +
    `*Abono Realizado:* $${currentAbonoAmount.toLocaleString('es-CL')} CLP (${paymentMethod.toUpperCase()})\n` +
    `*Estado Pago:* ${paymentSuccess ? 'PAGADO ONLINE ✓' : 'PENDIENTE DE CONFIRMACIÓN'}\n` +
    `----------------------------------------\n` +
    `¡Hola PrevySeg! He completado mi Ficha de Inscripción en la plataforma. Adjunto en este chat mis documentos para la validación de mi matrícula.`
  );

  const whatsappUrl = `https://api.whatsapp.com/send?phone=${whatsappPhone}&text=${whatsappMessage}`;

  return (
    <div className="space-y-8 animate-in fade-in duration-200 print:bg-white print:text-black print:p-0">
      
      {/* ================= HEADER INSTITUCIONAL (COPIA FIEL DE LA FICHA EN PAPEL) ================= */}
      <div className="bg-[#121316] rounded-3xl border border-white/10 shadow-2xl p-6 sm:p-8 backdrop-blur-xl space-y-6">
        
        {/* Banner superior de Ficha */}
        <div className="bg-[#18191c] p-4 rounded-2xl border border-white/10 flex flex-col md:flex-row justify-between items-center gap-4 text-center md:text-left">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-[#0284c7] via-[#00c2b2] to-teal-400 flex items-center justify-center text-gray-950 font-black text-2xl shadow-xl shadow-teal-950/40">
              PS
            </div>
            <div>
              <span className="text-[11px] font-black uppercase text-[#00c2b2] tracking-widest block">
                FICHA DE INSCRIPCIÓN OFICIAL
              </span>
              <h1 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
                PrevySeg
              </h1>
              <p className="text-xs text-slate-400">
                Organismo Técnico de Capacitación • Acreditado SENCE N° 1238088725
              </p>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <button
              onClick={handlePrintForm}
              className="px-4 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-bold border border-white/10 flex items-center gap-2 transition-all cursor-pointer shadow hover:border-cyan-400/40"
            >
              <Printer size={15} className="text-cyan-400" />
              <span>Imprimir / Guardar Ficha PDF</span>
            </button>

            <a
              href={whatsappUrl}
              target="_blank"
              rel="noreferrer"
              className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white text-xs font-bold flex items-center gap-2 shadow-lg shadow-emerald-950/50 transition-all cursor-pointer"
            >
              <Phone size={15} />
              <span>Enviar por WhatsApp</span>
            </a>
          </div>
        </div>

        {/* Info de contacto oficial extraída de la ficha */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs bg-black/40 p-4 rounded-2xl border border-white/5 text-slate-300">
          <div className="flex items-center gap-2">
            <MapPin size={15} className="text-[#00c2b2] flex-shrink-0" />
            <span><strong>Dir:</strong> Blanco Encalada N°666, 2do Piso, Arica</span>
          </div>
          <div className="flex items-center gap-2">
            <Phone size={15} className="text-sky-400 flex-shrink-0" />
            <span><strong>Tel / Cel:</strong> 222166822 • 982312128 • 991625422</span>
          </div>
          <div className="flex items-center gap-2">
            <Mail size={15} className="text-amber-400 flex-shrink-0" />
            <span><strong>Mail:</strong> prevyseg.capacitaciones@gmail.com</span>
          </div>
        </div>

        {/* ================= 1.- SECCIÓN CURSO ================= */}
        <div className="space-y-4 pt-2">
          <div className="flex items-center justify-between border-b border-white/10 pb-2">
            <h2 className="text-base sm:text-lg font-black text-white flex items-center gap-2">
              <span className="w-6 h-6 rounded-lg bg-[#00c2b2]/20 text-[#00c2b2] flex items-center justify-center text-xs font-black">
                1
              </span>
              <span>SELECCIÓN DEL CURSO</span>
            </h2>
            <span className="text-xs text-slate-400 font-mono">Seleccione el programa a cursar</span>
          </div>

          {/* Grid de 8 Cursos de la Ficha física */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
            {COURSES_LIST.map((c) => {
              const isSelected = selectedCourseId === c.id;
              return (
                <motion.div
                  key={c.id}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => setSelectedCourseId(c.id)}
                  className={`p-4 rounded-2xl border transition-all cursor-pointer flex flex-col justify-between gap-3 relative ${
                    isSelected
                      ? 'bg-gradient-to-b from-[#0e2c38] to-[#121a22] border-[#00c2b2] shadow-lg shadow-teal-950/60 ring-1 ring-[#00c2b2]'
                      : 'bg-[#18191c] border-white/10 hover:border-slate-600 hover:bg-slate-900/60'
                  }`}
                >
                  <div className="space-y-1.5">
                    <div className="flex items-start justify-between gap-2">
                      <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full uppercase ${
                        c.type === 'spd' ? 'bg-sky-500/20 text-sky-300' : 'bg-amber-500/20 text-amber-300'
                      }`}>
                        {c.category}
                      </span>
                      {isSelected && (
                        <div className="w-5 h-5 rounded-full bg-[#00c2b2] text-gray-950 flex items-center justify-center flex-shrink-0">
                          <Check size={12} className="stroke-[3]" />
                        </div>
                      )}
                    </div>
                    <h3 className="text-xs font-black text-white leading-snug">
                      {c.name}
                    </h3>
                    <p className="text-[11px] text-slate-400 leading-tight">
                      {c.modality} • {c.hours}
                    </p>
                  </div>

                  <div className="pt-2 border-t border-white/10 flex justify-between items-center text-xs">
                    <span className="text-slate-400 text-[10px]">Arancel Total:</span>
                    <span className="font-bold text-[#00c2b2] font-mono">${c.price.toLocaleString('es-CL')}</span>
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
              className="p-4 rounded-2xl bg-amber-950/40 border border-amber-500/40 space-y-2 text-xs"
            >
              <label className="font-bold text-amber-300 block">
                Especifique el Programa Técnico de la Escuela de Oficios:
              </label>
              <select
                value={selectedOficioName}
                onChange={(e) => setSelectedOficioName(e.target.value)}
                className="w-full bg-[#121315] border border-amber-500/40 rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none focus:ring-2 focus:ring-amber-400"
              >
                <option value="Técnicas de Soldadura Industrial SMAW / MIG">Técnicas de Soldadura Industrial SMAW / MIG</option>
                <option value="Operación y Manejo Seguro de Grúa Horquilla">Operación y Manejo Seguro de Grúa Horquilla</option>
                <option value="Técnicas de Operaciones Logísticas y Bodega">Técnicas de Operaciones Logísticas y Bodega</option>
                <option value="Electricidad Básica e Instalaciones Domiciliarias">Electricidad Básica e Instalaciones Domiciliarias</option>
                <option value="Mantenimiento Mecánico Básico Industrial">Mantenimiento Mecánico Básico Industrial</option>
              </select>
            </motion.div>
          )}

          {/* ================= AVISO DINÁMICO DE CERTIFICACIÓN SEGÚN EL TIPO DE CURSO ================= */}
          <AnimatePresence mode="wait">
            {isSpdCourse ? (
              <motion.div
                key="spd-warning"
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                className="p-5 rounded-2xl bg-gradient-to-r from-sky-950/80 via-slate-900 to-[#121316] border-2 border-sky-500/60 shadow-xl space-y-2.5"
              >
                <div className="flex items-center gap-2.5 text-sky-400 font-extrabold text-xs sm:text-sm">
                  <ShieldCheck size={20} className="text-[#38bdf8] flex-shrink-0" />
                  <span>AVISO NORMATIVO DE CAPACITACIÓN — SEGURIDAD PRIVADA SPD</span>
                </div>
                <p className="text-xs sm:text-sm text-slate-200 leading-relaxed">
                  En <strong className="text-white">PrevySeg</strong> entregamos la <strong>preparación y capacitación teórico-práctica completa</strong> exigida por la normativa vigente para desempeñarse como Guardia de Seguridad.
                  <br />
                  <strong className="text-amber-300">IMPORTANTE:</strong> PrevySeg <u>NO otorga de manera directa la credencial ni el certificado final de habilitación</u>. La credencial y acreditación oficial es emitida y otorgada exclusivamente por la <strong>Subsecretaría de Prevención del Delito (SPD)</strong> tras la rendición y aprobación de un examen evaluativo externo presencial ante la autoridad. En PrevySeg te preparamos al 100% para rendir dicho examen con éxito.
                </p>
                <div className="flex items-center gap-2 text-[11px] text-sky-300 font-mono pt-1">
                  <span>✓ Programa registrado y codificado bajo estándares SENCE y SPD</span>
                </div>
              </motion.div>
            ) : (
              <motion.div
                key="oficio-notice"
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                className="p-5 rounded-2xl bg-gradient-to-r from-emerald-950/80 via-slate-900 to-[#121316] border-2 border-emerald-500/60 shadow-xl space-y-2.5"
              >
                <div className="flex items-center gap-2.5 text-emerald-400 font-extrabold text-xs sm:text-sm">
                  <Award size={20} className="text-emerald-400 flex-shrink-0" />
                  <span>CERTIFICACIÓN DIRECTA OTEC PREVYSEG & SENCE</span>
                </div>
                <p className="text-xs sm:text-sm text-slate-200 leading-relaxed">
                  Este curso de la <strong className="text-white">Escuela de Oficios</strong> otorga <strong>Diploma y Certificado de Acreditación Oficial emitido directamente por PrevySeg OTEC</strong>, válido curricularmente para desempeñarse en empresas e industrias de todo el país, con registro oficial SENCE y código de validación digital.
                </p>
                <div className="flex items-center gap-2 text-[11px] text-emerald-300 font-mono pt-1">
                  <span>✓ Certificado y Diploma emitidos formalmente al completar las horas del curso</span>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

        </div>

        {/* ================= 2.- SECCIÓN ALUMNO DEPENDIENTE ================= */}
        <div className="space-y-4 pt-4 border-t border-white/10">
          <div className="flex items-center justify-between border-b border-white/10 pb-2">
            <h2 className="text-base sm:text-lg font-black text-white flex items-center gap-2">
              <span className="w-6 h-6 rounded-lg bg-[#00c2b2]/20 text-[#00c2b2] flex items-center justify-center text-xs font-black">
                2
              </span>
              <span>DATOS DEL ALUMNO / POSTULANTE</span>
            </h2>
            <span className="text-xs text-slate-400 font-mono">2.- ALUMNO DEPENDIENTE</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 text-xs">
            
            {/* Nombre Completo */}
            <div className="space-y-1.5 sm:col-span-2">
              <label className="font-bold text-slate-300 flex items-center gap-1.5">
                <User size={13} className="text-[#00c2b2]" />
                <span>NOMBRE COMPLETO *</span>
              </label>
              <input
                type="text"
                required
                name="nombre"
                placeholder="Ej. MARCO FRANCISCO NAHUELQUEO AILLAPÁN"
                value={formData.nombre}
                onChange={handleInputChange}
                className="w-full bg-[#18191c] border border-white/10 rounded-xl px-4 py-2.5 text-xs sm:text-sm text-white focus:outline-none focus:ring-2 focus:ring-[#00c2b2]"
              />
            </div>

            {/* RUT / Documento */}
            <div className="space-y-1.5">
              <label className="font-bold text-slate-300 flex items-center gap-1.5">
                <span>RUT / DOCUMENTO *</span>
              </label>
              <input
                type="text"
                required
                name="rut"
                placeholder="Ej. 18.643.817-5"
                value={formData.rut}
                onChange={handleInputChange}
                className="w-full bg-[#18191c] border border-white/10 rounded-xl px-4 py-2.5 text-xs sm:text-sm text-white font-mono focus:outline-none focus:ring-2 focus:ring-[#00c2b2]"
              />
            </div>

            {/* Fecha de Nacimiento */}
            <div className="space-y-1.5">
              <label className="font-bold text-slate-300 flex items-center gap-1.5">
                <Calendar size={13} className="text-sky-400" />
                <span>FECHA DE NACIMIENTO *</span>
              </label>
              <input
                type="date"
                required
                name="fechaNacimiento"
                value={formData.fechaNacimiento}
                onChange={handleInputChange}
                className="w-full bg-[#18191c] border border-white/10 rounded-xl px-4 py-2.5 text-xs sm:text-sm text-white focus:outline-none focus:ring-2 focus:ring-sky-400"
              />
            </div>

            {/* País */}
            <div className="space-y-1.5">
              <label className="font-bold text-slate-300">PAÍS DE NACIMIENTO *</label>
              <input
                type="text"
                name="pais"
                placeholder="Chile / Perú / Bolivia / Colombia"
                value={formData.pais}
                onChange={handleInputChange}
                className="w-full bg-[#18191c] border border-white/10 rounded-xl px-4 py-2.5 text-xs sm:text-sm text-white focus:outline-none focus:ring-2 focus:ring-sky-400"
              />
            </div>

            {/* Teléfono */}
            <div className="space-y-1.5">
              <label className="font-bold text-slate-300 flex items-center gap-1.5">
                <Phone size={13} className="text-emerald-400" />
                <span>TELÉFONO / WHATSAPP *</span>
              </label>
              <input
                type="tel"
                required
                name="telefono"
                placeholder="Ej. +56 9 9064 0464"
                value={formData.telefono}
                onChange={handleInputChange}
                className="w-full bg-[#18191c] border border-white/10 rounded-xl px-4 py-2.5 text-xs sm:text-sm text-white font-mono focus:outline-none focus:ring-2 focus:ring-emerald-400"
              />
            </div>

            {/* Domicilio */}
            <div className="space-y-1.5 sm:col-span-2">
              <label className="font-bold text-slate-300 flex items-center gap-1.5">
                <MapPin size={13} className="text-rose-400" />
                <span>DOMICILIO COMPLETO *</span>
              </label>
              <input
                type="text"
                required
                name="domicilio"
                placeholder="Ej. Av. Robinson Rojas #4616, Arica"
                value={formData.domicilio}
                onChange={handleInputChange}
                className="w-full bg-[#18191c] border border-white/10 rounded-xl px-4 py-2.5 text-xs sm:text-sm text-white focus:outline-none focus:ring-2 focus:ring-rose-400"
              />
            </div>

            {/* Correo Electrónico */}
            <div className="space-y-1.5">
              <label className="font-bold text-slate-300 flex items-center gap-1.5">
                <Mail size={13} className="text-amber-400" />
                <span>CORREO ELECTRÓNICO *</span>
              </label>
              <input
                type="email"
                required
                name="email"
                placeholder="ejemplo@gmail.com"
                value={formData.email}
                onChange={handleInputChange}
                className="w-full bg-[#18191c] border border-white/10 rounded-xl px-4 py-2.5 text-xs sm:text-sm text-white focus:outline-none focus:ring-2 focus:ring-amber-400"
              />
            </div>

            {/* Condición / Lugar de Trabajo */}
            <div className="space-y-1.5 sm:col-span-3 bg-black/30 p-3.5 rounded-xl border border-white/5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
              <div className="flex items-center gap-4">
                <span className="font-bold text-slate-200">LUGAR DE TRABAJO / CONDICIÓN:</span>
                <label className="flex items-center gap-1.5 text-slate-300 cursor-pointer">
                  <input
                    type="radio"
                    name="condicionLaboral"
                    value="particular"
                    checked={formData.condicionLaboral === 'particular'}
                    onChange={() => setFormData(prev => ({ ...prev, condicionLaboral: 'particular', empresaNombre: '' }))}
                  />
                  <span>Particular</span>
                </label>
                <label className="flex items-center gap-1.5 text-slate-300 cursor-pointer">
                  <input
                    type="radio"
                    name="condicionLaboral"
                    value="empresa"
                    checked={formData.condicionLaboral === 'empresa'}
                    onChange={() => setFormData(prev => ({ ...prev, condicionLaboral: 'empresa' }))}
                  />
                  <span>Empresa / Patrocinado</span>
                </label>
              </div>

              {formData.condicionLaboral === 'empresa' && (
                <input
                  type="text"
                  placeholder="Nombre de la empresa empleadora..."
                  value={formData.empresaNombre}
                  onChange={(e) => setFormData(prev => ({ ...prev, empresaNombre: e.target.value }))}
                  className="bg-[#18191c] border border-white/10 rounded-lg px-3 py-1.5 text-xs text-white w-full sm:w-64"
                />
              )}
            </div>

          </div>
        </div>

        {/* ================= 3.- SECCIÓN ABONOS & PASARELA DE PAGOS ================= */}
        <div className="space-y-5 pt-4 border-t border-white/10">
          <div className="flex items-center justify-between border-b border-white/10 pb-2">
            <h2 className="text-base sm:text-lg font-black text-white flex items-center gap-2">
              <span className="w-6 h-6 rounded-lg bg-[#00c2b2]/20 text-[#00c2b2] flex items-center justify-center text-xs font-black">
                3
              </span>
              <span>ABONOS Y MEDIOS DE PAGO</span>
            </h2>
            <span className="text-xs text-slate-400 font-mono">3.- ABONOS</span>
          </div>

          {/* Tabla de Cuotas según la Ficha */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            
            {/* Cuota 1 */}
            <div 
              onClick={() => setPaymentOption('cuota1')}
              className={`p-4 rounded-2xl border transition-all cursor-pointer flex items-center justify-between ${
                paymentOption === 'cuota1'
                  ? 'bg-sky-950/60 border-sky-400 ring-1 ring-sky-400'
                  : 'bg-[#18191c] border-white/10'
              }`}
            >
              <div>
                <span className="text-[10px] text-sky-400 font-bold uppercase tracking-wider block">
                  Cuota N°1 • Reserva de Cupo
                </span>
                <h4 className="text-sm font-bold text-white">ENTREGA DE DOCUMENTACIÓN</h4>
                <p className="text-[11px] text-slate-400">Abono inicial para validación y reserva SENCE</p>
              </div>
              <div className="text-right">
                <span className="text-xl font-black text-sky-300 font-mono">
                  ${selectedCourse.cuota1.toLocaleString('es-CL')}
                </span>
                <span className="text-[10px] text-slate-400 block">CLP</span>
              </div>
            </div>

            {/* Cuota 2 / Total */}
            <div 
              onClick={() => setPaymentOption('total')}
              className={`p-4 rounded-2xl border transition-all cursor-pointer flex items-center justify-between ${
                paymentOption === 'total'
                  ? 'bg-teal-950/60 border-teal-400 ring-1 ring-teal-400'
                  : 'bg-[#18191c] border-white/10'
              }`}
            >
              <div>
                <span className="text-[10px] text-teal-400 font-bold uppercase tracking-wider block">
                  Pago Total del Curso
                </span>
                <h4 className="text-sm font-bold text-white">CUOTA N°1 + CUOTA N°2 (INICIO)</h4>
                <p className="text-[11px] text-slate-400">Pago íntegro sin cuotas pendientes</p>
              </div>
              <div className="text-right">
                <span className="text-xl font-black text-[#00c2b2] font-mono">
                  ${selectedCourse.price.toLocaleString('es-CL')}
                </span>
                <span className="text-[10px] text-slate-400 block">CLP</span>
              </div>
            </div>

          </div>

          {/* Espacio para Medios de Pago (Integración Pasarela / Tarjetas / Transferencia) */}
          <div className="bg-[#16171a] p-6 rounded-2xl border border-white/10 space-y-5">
            <div className="flex flex-wrap items-center justify-between gap-3 border-b border-white/10 pb-3">
              <span className="text-xs font-bold text-slate-200 uppercase tracking-wider">
                Seleccione el Medio de Pago para el Abono:
              </span>
              <div className="flex gap-2">
                {[
                  { id: 'tarjeta', label: '💳 Tarjetas Débito / Crédito (Webpay)', icon: CreditCard },
                  { id: 'transferencia', label: '🏦 Transferencia Electrónica', icon: Building2 },
                  { id: 'efectivo', label: '💵 Pago Presencial en Sede', icon: DollarSign },
                ].map((m) => (
                  <button
                    key={m.id}
                    type="button"
                    onClick={() => setPaymentMethod(m.id)}
                    className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer border ${
                      paymentMethod === m.id
                        ? 'bg-[#0284c7] text-white border-sky-400 shadow-md'
                        : 'bg-black/30 text-slate-400 border-white/10 hover:text-white'
                    }`}
                  >
                    {m.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Opción 1: Tarjetas Webpay Plus */}
            {paymentMethod === 'tarjeta' && (
              <form onSubmit={handlePayAbono} className="space-y-4">
                <div className="p-4 bg-sky-950/30 rounded-xl border border-sky-500/30 flex items-center justify-between">
                  <div>
                    <span className="text-xs text-slate-400 block">Monto a pagar con Tarjeta:</span>
                    <span className="text-2xl font-black text-[#00c2b2] font-mono">
                      ${currentAbonoAmount.toLocaleString('es-CL')} CLP
                    </span>
                  </div>
                  <div className="text-right text-xs text-sky-300 font-mono">
                    Pasarela Segura Webpay Plus • Transbank
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 text-xs">
                  <div className="sm:col-span-2">
                    <label className="font-semibold text-slate-300 block mb-1">Número de Tarjeta</label>
                    <input
                      type="text"
                      value={cardData.cardNumber}
                      onChange={(e) => setCardData({ ...cardData, cardNumber: e.target.value })}
                      className="w-full bg-[#121315] border border-white/10 rounded-xl px-3.5 py-2 text-white font-mono focus:outline-none focus:border-[#00c2b2]"
                    />
                  </div>
                  <div>
                    <label className="font-semibold text-slate-300 block mb-1">Vencimiento</label>
                    <input
                      type="text"
                      value={cardData.cardExpiry}
                      onChange={(e) => setCardData({ ...cardData, cardExpiry: e.target.value })}
                      className="w-full bg-[#121315] border border-white/10 rounded-xl px-3.5 py-2 text-white font-mono focus:outline-none focus:border-[#00c2b2]"
                    />
                  </div>
                  <div>
                    <label className="font-semibold text-slate-300 block mb-1">CVV / CVC</label>
                    <input
                      type="text"
                      value={cardData.cardCvv}
                      onChange={(e) => setCardData({ ...cardData, cardCvv: e.target.value })}
                      className="w-full bg-[#121315] border border-white/10 rounded-xl px-3.5 py-2 text-white font-mono focus:outline-none focus:border-[#00c2b2]"
                    />
                  </div>
                </div>

                <div className="flex justify-between items-center pt-2">
                  <div className="flex items-center gap-2 text-xs text-slate-400">
                    <Lock size={14} className="text-emerald-400" />
                    <span>Transacción protegida por encriptación bancaria SSL 256 bits</span>
                  </div>

                  <motion.button
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.97 }}
                    type="submit"
                    disabled={isProcessingPayment || paymentSuccess}
                    className={`px-6 py-3 rounded-xl font-black text-xs sm:text-sm flex items-center gap-2 cursor-pointer shadow-lg transition-all ${
                      paymentSuccess
                        ? 'bg-emerald-600 text-white'
                        : 'bg-gradient-to-r from-[#00c2b2] to-teal-400 text-gray-950 hover:from-teal-400 hover:to-teal-500 shadow-teal-950/50'
                    }`}
                  >
                    {isProcessingPayment ? (
                      <span>Procesando Abono...</span>
                    ) : paymentSuccess ? (
                      <>
                        <CheckCircle2 size={16} />
                        <span>Abono de ${currentAbonoAmount.toLocaleString('es-CL')} Registrado con Éxito ✓</span>
                      </>
                    ) : (
                      <>
                        <CreditCard size={16} />
                        <span>Realizar Abono de ${currentAbonoAmount.toLocaleString('es-CL')} Online</span>
                      </>
                    )}
                  </motion.button>
                </div>
              </form>
            )}

            {/* Opción 2: Transferencia Bancaria */}
            {paymentMethod === 'transferencia' && (
              <div className="p-4 bg-slate-900/80 rounded-xl border border-white/10 space-y-3 text-xs">
                <h4 className="font-bold text-white text-sm">Datos para Transferencia Bancaria Oficial:</h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-slate-300 bg-black/40 p-3 rounded-lg border border-white/5 font-mono">
                  <div><strong>Banco:</strong> Banco Santander / Banco Estado</div>
                  <div><strong>Tipo de Cuenta:</strong> Cuenta Corriente</div>
                  <div><strong>N° Cuenta:</strong> 74-88921-01</div>
                  <div><strong>RUT Titular:</strong> 77.123.456-K</div>
                  <div><strong>Nombre Titular:</strong> OTEC PREVYSEG SPA</div>
                  <div><strong>Correo Comprobante:</strong> prevyseg.capacitaciones@gmail.com</div>
                </div>
                <p className="text-[11px] text-slate-400">
                  * Indique en el asunto de la transferencia su nombre y RUT. Luego envíe el comprobante al WhatsApp de Admisión.
                </p>
              </div>
            )}

            {/* Opción 3: Efectivo en Sede */}
            {paymentMethod === 'efectivo' && (
              <div className="p-4 bg-amber-950/30 rounded-xl border border-amber-500/30 text-xs text-slate-300 space-y-2">
                <h4 className="font-bold text-amber-300 text-sm">Pago Presencial en Sede Arica:</h4>
                <p>
                  Puede cancelar su abono o arancel total en efectivo o con tarjeta física en nuestras oficinas de atención:
                </p>
                <div className="font-bold text-white">
                  📍 Calle Blanco Encalada N° 666, 2do Piso, Arica (Horario de Atención: Lunes a Viernes de 09:00 a 19:00 hrs).
                </div>
              </div>
            )}

          </div>
        </div>

        {/* ================= 4.- DOCUMENTACIÓN Y GESTIÓN POR WHATSAPP ================= */}
        <div className="space-y-4 pt-4 border-t border-white/10">
          <div className="flex items-center justify-between border-b border-white/10 pb-2">
            <h2 className="text-base sm:text-lg font-black text-white flex items-center gap-2">
              <span className="w-6 h-6 rounded-lg bg-[#00c2b2]/20 text-[#00c2b2] flex items-center justify-center text-xs font-black">
                4
              </span>
              <span>DOCUMENTACIÓN Y CONTACTO VÍA WHATSAPP</span>
            </h2>
            <span className="text-xs text-slate-400 font-mono">4.- FECHA DE DOCUMENTACIÓN</span>
          </div>

          {/* Banner WhatsApp Exclusivo */}
          <div className="p-6 rounded-3xl bg-gradient-to-r from-emerald-950/70 via-slate-900 to-teal-950/70 border-2 border-emerald-500/50 shadow-2xl space-y-4">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div className="space-y-1">
                <span className="inline-block bg-emerald-900 text-emerald-300 text-[10px] font-black uppercase px-2.5 py-0.5 rounded-full border border-emerald-400/40">
                  Atención Directa & Rápida
                </span>
                <h3 className="text-lg sm:text-xl font-black text-white">
                  Envío y Validación de Documentos vía WhatsApp
                </h3>
                <p className="text-xs sm:text-sm text-slate-200 leading-relaxed max-w-2xl">
                  Para agilizar tu matrícula, <strong>no necesitas subir archivos pesados en este portal</strong>. Toda tu documentación la revisaremos directamente con nuestro equipo de admisión a través de WhatsApp.
                </p>
              </div>

              <motion.a
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                href={whatsappUrl}
                target="_blank"
                rel="noreferrer"
                className="px-6 py-3.5 rounded-2xl bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-400 hover:to-teal-400 text-gray-950 font-black text-xs sm:text-sm flex items-center gap-2.5 shadow-xl shadow-emerald-950/60 transition-all cursor-pointer flex-shrink-0"
              >
                <Phone size={18} />
                <span>Contactar por WhatsApp (+56 9 8231 2128)</span>
                <ExternalLink size={14} />
              </motion.a>
            </div>

            {/* Checklist de Documentos solicitados en la Ficha física */}
            <div className="pt-3 border-t border-white/10 space-y-2">
              <span className="text-[11px] font-bold text-slate-300 uppercase tracking-wider block">
                Lista de documentos a enviar por WhatsApp según la Ficha de Inscripción:
              </span>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                {REQUIRED_DOCUMENTS_FICHA.map((doc) => (
                  <div key={doc.id} className="flex items-start gap-2 bg-black/30 p-2 rounded-lg border border-white/5">
                    <CheckCircle2 size={14} className="text-emerald-400 mt-0.5 flex-shrink-0" />
                    <div>
                      <strong className="text-white text-[11px]">{doc.name}</strong>
                      <p className="text-[10px] text-slate-400">{doc.detail}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* ================= 5.- Y 6.- OBSERVACIONES & ENVÍO FINAL ================= */}
        <div className="space-y-4 pt-4 border-t border-white/10">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
            <div className="space-y-1.5">
              <label className="font-bold text-slate-300">5.- RETIRO DEL CURSO (SI APLICA):</label>
              <input
                type="text"
                placeholder="Escribir motivo del retiro de documento si corresponde..."
                className="w-full bg-[#18191c] border border-white/10 rounded-xl px-4 py-2.5 text-xs text-white"
              />
            </div>

            <div className="space-y-1.5">
              <label className="font-bold text-slate-300">6.- OBSERVACIONES GENERALES:</label>
              <input
                type="text"
                name="observaciones"
                value={formData.observaciones}
                onChange={handleInputChange}
                placeholder="Comentarios adicionales o solicitudes del postulante..."
                className="w-full bg-[#18191c] border border-white/10 rounded-xl px-4 py-2.5 text-xs text-white"
              />
            </div>
          </div>

          {/* Botones de Finalización */}
          <div className="pt-4 flex flex-col sm:flex-row justify-between items-center gap-4 bg-[#18191c] p-5 rounded-2xl border border-white/10">
            <div className="text-xs text-slate-400 text-center sm:text-left">
              Al enviar esta ficha declaras que los datos proporcionados son fidedignos para el registro SENCE y OTEC PrevySeg.
            </div>

            <div className="flex flex-wrap items-center gap-3">
              <button
                type="button"
                onClick={handlePrintForm}
                className="px-5 py-3 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-bold border border-white/10 flex items-center gap-2 cursor-pointer transition-all"
              >
                <Printer size={15} />
                <span>Imprimir Ficha</span>
              </button>

              <motion.a
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                href={whatsappUrl}
                target="_blank"
                rel="noreferrer"
                className="px-7 py-3.5 rounded-xl bg-gradient-to-r from-[#00c2b2] to-teal-400 hover:from-teal-400 hover:to-teal-500 text-gray-950 font-black text-xs sm:text-sm flex items-center gap-2 shadow-xl shadow-teal-950/50 cursor-pointer"
              >
                <Send size={16} />
                <span>Completar Inscripción y Notificar por WhatsApp</span>
              </motion.a>
            </div>
          </div>
        </div>

      </div>

    </div>
  );
};

export default AdmissionPortalView;
