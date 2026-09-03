import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Users, 
  FileText, 
  UploadCloud, 
  MessageSquare, 
  CheckCircle2, 
  Clock, 
  Calendar, 
  Download, 
  Eye, 
  Send, 
  Plus, 
  Trash2, 
  Sparkles, 
  BookOpen, 
  Video, 
  Award, 
  AlertCircle, 
  HelpCircle, 
  Check, 
  X,
  Search,
  Filter,
  ShieldCheck,
  ChevronRight
} from 'lucide-react';

const TeacherPortalView = ({ currentUser, onSelectCourse, activeTab: propActiveTab, onTabChange }) => {
  // Pestaña activa del portal docente: 'interaccion' | 'archivos' | 'calificaciones' | 'asistencia'
  const [internalActiveTab, setInternalActiveTab] = useState('interaccion');
  const activeTab = propActiveTab || internalActiveTab;
  const setActiveTab = onTabChange || setInternalActiveTab;

  const [selectedCourseId, setSelectedCourseId] = useState('c1');
  const [searchQuery, setSearchQuery] = useState('');

  // Cursos asignados al docente
  const assignedCourses = [
    {
      id: 'c1',
      title: 'Curso de Formación Guardia de Seguridad (Credencial SPD)',
      codeSence: '1238088725',
      studentsCount: 24,
      attendanceAvg: 92,
      pendingMessages: 3,
      schedule: 'Lunes a Viernes 19:00 - 22:00 hrs',
      modality: 'Sincrónico Online + Práctica'
    },
    {
      id: 'c2',
      title: 'Operador de Central de Cámaras de Televigilancia (CCTV)',
      codeSence: '1238087964',
      studentsCount: 18,
      attendanceAvg: 88,
      pendingMessages: 1,
      schedule: 'Sábados 09:00 - 14:00 hrs',
      modality: 'E-learning Asincrónico / Taller'
    },
    {
      id: 'c3',
      title: 'Operador y Conducción Segura de Grúa Horquilla (Clase D)',
      codeSence: '1238090112',
      studentsCount: 15,
      attendanceAvg: 95,
      pendingMessages: 0,
      schedule: 'Martes y Jueves 18:30 - 21:30 hrs',
      modality: 'Escuela de Oficios'
    }
  ];

  const currentCourse = assignedCourses.find(c => c.id === selectedCourseId) || assignedCourses[0];

  // Estado de mensajes / foros de interacción con estudiantes
  const [messages, setMessages] = useState([
    {
      id: 1,
      student: 'Matías Silva Lagos',
      rut: '21.778.425-6',
      courseId: 'c1',
      date: 'Hoy, 14:20 hrs',
      topic: 'Consulta sobre Declaración Jurada SPD',
      message: 'Profesor, buenas tardes. Quería consultar si la declaración jurada en 1 sola hoja debe llevar firma ante notario o solo mi firma simple y huella.',
      status: 'pendiente', // 'pendiente' | 'respondido'
      response: ''
    },
    {
      id: 2,
      student: 'Camila Morales Valenzuela',
      rut: '19.845.120-K',
      courseId: 'c1',
      date: 'Hoy, 11:05 hrs',
      topic: 'Justificación inasistencia sesión de ayer',
      message: 'Estimado profesor, adjunto certificado médico por inasistencia al módulo de Legislación de ayer.',
      status: 'respondido',
      response: 'Recibido Camila. Tu justificación fue registrada en el libro de clases SENCE. Revisa la grabación de la clase.'
    },
    {
      id: 3,
      student: 'Rodrigo Fuentes Tapia',
      rut: '18.332.901-4',
      courseId: 'c1',
      date: 'Ayer, 18:40 hrs',
      topic: 'Duda examen teórico Módulo 2',
      message: 'Profesor, ¿cuántas preguntas tendrá el simulador de examen final de SPD (Subsecretaría de Prevención del Delito)?',
      status: 'pendiente',
      response: ''
    }
  ]);

  // Estado del modal de respuesta a alumno
  const [selectedMessage, setSelectedMessage] = useState(null);
  const [replyText, setReplyText] = useState('');

  // Estado de avisos a la clase
  const [announcements, setAnnouncements] = useState([
    {
      id: 1,
      title: '📢 Recordatorio: Examen de Legislación y Derechos Humanos',
      date: '02 de Septiembre, 2026',
      content: 'Estimados alumnos, este viernes a las 19:00 hrs se habilitará la evaluación del Módulo 1 en la plataforma.',
      author: currentUser?.nombre || 'Docente Titular'
    }
  ]);
  const [showNewAnnouncementModal, setShowNewAnnouncementModal] = useState(false);
  const [newAnnouncementTitle, setNewAnnouncementTitle] = useState('');
  const [newAnnouncementContent, setNewAnnouncementContent] = useState('');

  // Estado de archivos / materiales de estudio subidos por el profesor
  const [materials, setMaterials] = useState([
    {
      id: 1,
      title: 'Manual de Legislación de Seguridad Privada (Normativa SPD 2026).pdf',
      category: 'Guía Teórica',
      size: '4.2 MB',
      uploadDate: '01/09/2026',
      downloads: 24
    },
    {
      id: 2,
      title: 'Presentación PPT: Protocolos de Prevención de Riesgos y Control de Accesos.pdf',
      category: 'Diapositivas',
      size: '8.7 MB',
      uploadDate: '28/08/2026',
      downloads: 21
    },
    {
      id: 3,
      title: 'Formato Declaración Jurada Simple Unificada (1 Sola Hoja).pdf',
      category: 'Documentos Oficiales',
      size: '450 KB',
      uploadDate: '25/08/2026',
      downloads: 24
    },
    {
      id: 4,
      title: 'Guía Práctica: Primeros Auxilios y Manejo de Crisis en Faenas.pdf',
      category: 'Guía Práctica',
      size: '2.1 MB',
      uploadDate: '20/08/2026',
      downloads: 19
    }
  ]);
  const [newMaterialTitle, setNewMaterialTitle] = useState('');
  const [newMaterialCategory, setNewMaterialCategory] = useState('Guía Teórica');

  // Estado de calificaciones de alumnos
  const [grades, setGrades] = useState([
    { id: 1, name: 'Matías Silva Lagos', rut: '21.778.425-6', m1: 6.8, m2: 6.5, m3: 6.2, exam: 6.5, attendance: 95, status: 'Aprobado' },
    { id: 2, name: 'Camila Morales Valenzuela', rut: '19.845.120-K', m1: 6.0, m2: 5.8, m3: 6.2, exam: 6.0, attendance: 90, status: 'Aprobado' },
    { id: 3, name: 'Rodrigo Fuentes Tapia', rut: '18.332.901-4', m1: 5.2, m2: 5.5, m3: 5.0, exam: 5.3, attendance: 85, status: 'Aprobado' },
    { id: 4, name: 'Andrés Pizarro Castro', rut: '20.144.922-3', m1: 4.5, m2: 4.8, m3: 5.0, exam: 4.7, attendance: 82, status: 'En Observación' },
    { id: 5, name: 'Valentina Soto Henríquez', rut: '22.012.334-1', m1: 7.0, m2: 6.9, m3: 6.8, exam: 6.9, attendance: 100, status: 'Aprobado Sobresaliente' },
  ]);

  // Manejo de respuesta a mensajes de alumnos
  const handleSendReply = () => {
    if (!replyText.trim() || !selectedMessage) return;

    setMessages(messages.map(m => 
      m.id === selectedMessage.id 
        ? { ...m, status: 'respondido', response: replyText.trim() }
        : m
    ));

    setSelectedMessage(null);
    setReplyText('');
    alert("¡Respuesta enviada exitosamente al alumno! Se ha notificado a su buzón de mensajería.");
  };

  // Manejo de nuevo anuncio
  const handleCreateAnnouncement = (e) => {
    e.preventDefault();
    if (!newAnnouncementTitle || !newAnnouncementContent) return;

    const newA = {
      id: Date.now(),
      title: newAnnouncementTitle,
      date: 'Hoy, ' + new Date().toLocaleDateString('es-CL'),
      content: newAnnouncementContent,
      author: currentUser?.nombre || 'Docente Titular'
    };

    setAnnouncements([newA, ...announcements]);
    setNewAnnouncementTitle('');
    setNewAnnouncementContent('');
    setShowNewAnnouncementModal(false);
    alert("¡Comunicado publicado a la clase con éxito!");
  };

  // Manejo de subida de archivos
  const handleUploadMaterial = (fileName) => {
    const newDoc = {
      id: Date.now(),
      title: fileName || (newMaterialTitle.trim() ? `${newMaterialTitle}.pdf` : 'Material_Didactico_PrevySeg.pdf'),
      category: newMaterialCategory,
      size: '2.5 MB',
      uploadDate: new Date().toLocaleDateString('es-CL'),
      downloads: 0
    };

    setMaterials([newDoc, ...materials]);
    setNewMaterialTitle('');
    alert(`¡Archivo "${newDoc.title}" subido y disponible inmediatamente para los estudiantes!`);
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-200">
      
      {/* 1. Header Banner del Docente */}
      <div className="bg-gradient-to-r from-blue-950 via-slate-900 to-indigo-950 p-6 sm:p-8 rounded-3xl border border-blue-800/40 shadow-xl flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
        <div className="space-y-2">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-blue-500/20 text-sky-300 text-xs font-bold border border-blue-500/30">
            <ShieldCheck size={14} className="text-cyan-400" />
            <span>Panel de Instrucción Académica • SENCE & SPD</span>
          </div>
          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-white tracking-tight">
            Portal del Docente: <span className="text-[#38bdf8]">{currentUser?.nombre || 'Docente Instructor'}</span>
          </h1>
          <p className="text-xs sm:text-sm text-slate-300 max-w-2xl leading-relaxed">
            Gestión de clases sincrónicas, interacción directa con estudiantes, registro de asistencia digital y publicación de materiales didácticos.
          </p>
        </div>

        {/* Selector de Curso Asignado */}
        <div className="bg-[#121315]/90 p-4 rounded-2xl border border-white/15 min-w-[260px] space-y-1.5 shadow-lg">
          <label className="text-[10px] text-slate-400 font-bold uppercase tracking-wider block">
            Curso Activo en Instrucción:
          </label>
          <select
            value={selectedCourseId}
            onChange={(e) => setSelectedCourseId(e.target.value)}
            className="w-full bg-slate-900 border border-sky-500/40 text-xs font-bold text-white rounded-xl px-3 py-2 focus:outline-none focus:border-sky-400 cursor-pointer"
          >
            {assignedCourses.map(course => (
              <option key={course.id} value={course.id}>
                {course.title}
              </option>
            ))}
          </select>
          <div className="flex justify-between items-center text-[10px] text-slate-400 pt-1">
            <span>Código SENCE: <strong className="text-sky-300">{currentCourse.codeSence}</strong></span>
            <span>Alumnos: <strong className="text-emerald-400">{currentCourse.studentsCount}</strong></span>
          </div>
        </div>
      </div>

      {/* 2. Submenú de Navegación del Docente */}
      <div className="flex bg-[#121315] p-1.5 rounded-2xl border border-white/10 overflow-x-auto gap-1">
        <button
          onClick={() => setActiveTab('interaccion')}
          className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold transition-all cursor-pointer whitespace-nowrap ${
            activeTab === 'interaccion'
              ? 'bg-gradient-to-r from-[#0284c7] to-sky-600 text-white shadow-lg border border-sky-400/40'
              : 'text-slate-400 hover:text-white hover:bg-white/5'
          }`}
        >
          <MessageSquare size={15} />
          <span>Interacción & Mensajes con Alumnos</span>
          {messages.filter(m => m.status === 'pendiente').length > 0 && (
            <span className="bg-amber-500 text-gray-950 text-[10px] font-black px-2 py-0.2 rounded-full">
              {messages.filter(m => m.status === 'pendiente').length}
            </span>
          )}
        </button>

        <button
          onClick={() => setActiveTab('archivos')}
          className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold transition-all cursor-pointer whitespace-nowrap ${
            activeTab === 'archivos'
              ? 'bg-gradient-to-r from-[#0284c7] to-sky-600 text-white shadow-lg border border-sky-400/40'
              : 'text-slate-400 hover:text-white hover:bg-white/5'
          }`}
        >
          <UploadCloud size={15} />
          <span>Materiales & Repositorio de Archivos</span>
        </button>

        <button
          onClick={() => setActiveTab('calificaciones')}
          className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold transition-all cursor-pointer whitespace-nowrap ${
            activeTab === 'calificaciones'
              ? 'bg-gradient-to-r from-[#0284c7] to-sky-600 text-white shadow-lg border border-sky-400/40'
              : 'text-slate-400 hover:text-white hover:bg-white/5'
          }`}
        >
          <Award size={15} />
          <span>Calificaciones & Evaluaciones</span>
        </button>

        <button
          onClick={() => setActiveTab('asistencia')}
          className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold transition-all cursor-pointer whitespace-nowrap ${
            activeTab === 'asistencia'
              ? 'bg-gradient-to-r from-[#0284c7] to-sky-600 text-white shadow-lg border border-sky-400/40'
              : 'text-slate-400 hover:text-white hover:bg-white/5'
          }`}
        >
          <Clock size={15} />
          <span>Libro de Clases & Asistencia SENCE</span>
        </button>
      </div>

      {/* 3. CONTENIDO DE LA PESTAÑA ACTIVA */}
      <AnimatePresence mode="wait">
        
        {/* ================= PESTAÑA 1: INTERACCIÓN & MENSAJES ================= */}
        {activeTab === 'interaccion' && (
          <motion.div
            key="tab-interaccion"
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            className="space-y-6"
          >
            {/* Action Header: Publicar Comunicado Oficial */}
            <div className="p-6 rounded-3xl bg-gradient-to-r from-[#121316] via-[#16181c] to-[#121316] border border-white/10 shadow-xl flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
              <div className="space-y-1">
                <h3 className="text-base font-bold text-white flex items-center gap-2">
                  <Sparkles size={16} className="text-[#00c2b2]" />
                  <span>Tablón de Anuncios y Avisos a los Estudiantes</span>
                </h3>
                <p className="text-xs text-slate-400">
                  Publica recordatorios, fechas de evaluaciones o material complementario para todo el curso.
                </p>
              </div>

              <button
                onClick={() => setShowNewAnnouncementModal(true)}
                className="bg-gradient-to-r from-[#00c2b2] to-teal-400 hover:from-teal-400 hover:to-teal-500 text-gray-950 font-black text-xs px-5 py-2.5 rounded-xl shadow-lg flex items-center gap-2 cursor-pointer flex-shrink-0"
              >
                <Plus size={15} />
                <span>Publicar Comunicado Oficial</span>
              </button>
            </div>

            {/* Lista de Anuncios Publicados */}
            <div className="space-y-3">
              {announcements.map(item => (
                <div key={item.id} className="p-5 rounded-2xl bg-[#121316] border border-white/10 space-y-2">
                  <div className="flex justify-between items-start">
                    <h4 className="text-sm font-bold text-white">{item.title}</h4>
                    <span className="text-[10px] text-slate-400 bg-slate-800 px-2.5 py-0.5 rounded-full">{item.date}</span>
                  </div>
                  <p className="text-xs text-slate-300 leading-relaxed">{item.content}</p>
                  <div className="text-[10px] text-sky-400 font-semibold pt-1">
                    Emitido por: {item.author}
                  </div>
                </div>
              ))}
            </div>

            {/* Bandeja de Consultas de Estudiantes */}
            <div className="space-y-4 pt-4">
              <div className="flex items-center justify-between">
                <h3 className="text-base font-bold text-white flex items-center gap-2">
                  <MessageSquare size={16} className="text-sky-400" />
                  <span>Bandeja de Consultas y Preguntas de Alumnos</span>
                </h3>
                <span className="text-xs text-slate-400">
                  Mostrando {messages.length} mensajes
                </span>
              </div>

              <div className="space-y-3">
                {messages.map((msg) => (
                  <div
                    key={msg.id}
                    className={`p-5 rounded-2xl border transition-all duration-300 space-y-3 ${
                      msg.status === 'pendiente'
                        ? 'bg-gradient-to-b from-[#18191c] to-[#121315] border-amber-500/40 shadow-lg shadow-amber-950/10'
                        : 'bg-[#121316]/90 border-white/10'
                    }`}
                  >
                    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2">
                      <div className="flex items-center gap-2">
                        <span className="text-sm font-bold text-white">{msg.student}</span>
                        <span className="text-[11px] font-mono text-slate-400">({msg.rut})</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="text-[10px] text-slate-400">{msg.date}</span>
                        <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full border ${
                          msg.status === 'pendiente'
                            ? 'bg-amber-950 text-amber-300 border-amber-500/40'
                            : 'bg-emerald-950 text-emerald-300 border-emerald-500/40'
                        }`}>
                          {msg.status === 'pendiente' ? 'Pendiente de Respuesta' : 'Respondido'}
                        </span>
                      </div>
                    </div>

                    <div className="text-xs font-bold text-sky-300">
                      Asunto: {msg.topic}
                    </div>

                    <p className="text-xs text-slate-300 leading-relaxed bg-[#18191c]/80 p-3 rounded-xl border border-white/5">
                      "{msg.message}"
                    </p>

                    {msg.response && (
                      <div className="text-xs text-emerald-300 bg-emerald-950/30 p-3 rounded-xl border border-emerald-500/20 space-y-1">
                        <div className="font-bold flex items-center gap-1.5 text-emerald-400">
                          <CheckCircle2 size={13} /> Tu Respuesta:
                        </div>
                        <p className="text-slate-300">{msg.response}</p>
                      </div>
                    )}

                    {msg.status === 'pendiente' && (
                      <div className="flex justify-end pt-1">
                        <button
                          onClick={() => {
                            setSelectedMessage(msg);
                            setReplyText('');
                          }}
                          className="bg-gradient-to-r from-[#0284c7] to-sky-600 hover:from-sky-500 hover:to-sky-700 text-white font-bold text-xs px-4 py-2 rounded-xl shadow cursor-pointer flex items-center gap-1.5"
                        >
                          <Send size={13} />
                          <span>Responder al Alumno</span>
                        </button>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        )}

        {/* ================= PESTAÑA 2: MATERIALES & REPOSITORIO DE ARCHIVOS ================= */}
        {activeTab === 'archivos' && (
          <motion.div
            key="tab-archivos"
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            className="space-y-6"
          >
            {/* Upload Area for Teacher */}
            <div className="p-6 rounded-3xl bg-gradient-to-b from-[#16171a] to-[#121316] border border-sky-500/30 p-6 sm:p-8 space-y-4 shadow-xl">
              <div className="flex items-center gap-2">
                <span className="p-2 rounded-xl bg-sky-500/20 text-sky-400 border border-sky-500/40">
                  <UploadCloud size={20} />
                </span>
                <div>
                  <h3 className="text-base font-bold text-white">Subir Material Didáctico a la Clase</h3>
                  <p className="text-xs text-slate-400">Los estudiantes podrán descargar estos archivos desde su aula virtual.</p>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-12 gap-3 pt-2">
                <div className="sm:col-span-6">
                  <input
                    type="text"
                    placeholder="Título del documento (Ej: Guía Módulo 2 Normativa SPD)"
                    value={newMaterialTitle}
                    onChange={(e) => setNewMaterialTitle(e.target.value)}
                    className="w-full bg-[#18191c] border border-white/10 rounded-xl px-4 py-2.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-sky-400"
                  />
                </div>

                <div className="sm:col-span-3">
                  <select
                    value={newMaterialCategory}
                    onChange={(e) => setNewMaterialCategory(e.target.value)}
                    className="w-full bg-[#18191c] border border-white/10 rounded-xl px-3 py-2.5 text-xs text-slate-200 focus:outline-none focus:border-sky-400"
                  >
                    <option value="Guía Teórica">Guía Teórica</option>
                    <option value="Diapositivas">Diapositivas PPT</option>
                    <option value="Documentos Oficiales">Documentos Oficiales</option>
                    <option value="Guía Práctica">Guía Práctica</option>
                    <option value="Evaluación">Evaluación Modelo</option>
                  </select>
                </div>

                <div className="sm:col-span-3">
                  <label className="w-full bg-gradient-to-r from-[#0284c7] to-sky-600 hover:from-sky-500 hover:to-sky-700 text-white font-bold text-xs py-2.5 px-4 rounded-xl shadow cursor-pointer flex items-center justify-center gap-2 transition-all">
                    <UploadCloud size={14} />
                    <span>Seleccionar Archivo</span>
                    <input
                      type="file"
                      accept=".pdf,.doc,.docx,.ppt,.pptx,.jpg,.png"
                      className="hidden"
                      onChange={(e) => {
                        if (e.target.files?.[0]) {
                          handleUploadMaterial(e.target.files[0].name);
                        }
                      }}
                    />
                  </label>
                </div>
              </div>
            </div>

            {/* List of uploaded materials */}
            <div className="space-y-3">
              <h3 className="text-sm font-bold text-white flex items-center gap-2">
                <FileText size={16} className="text-[#00c2b2]" />
                <span>Archivos Disponibles para Alumnos en "{currentCourse.title}"</span>
              </h3>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {materials.map(mat => (
                  <div key={mat.id} className="p-5 rounded-2xl bg-[#121316] border border-white/10 hover:border-sky-500/40 transition-all flex flex-col justify-between gap-3 group">
                    <div className="space-y-1.5">
                      <div className="flex justify-between items-start gap-2">
                        <span className="text-xs font-bold text-white group-hover:text-sky-300 transition-colors leading-snug">
                          {mat.title}
                        </span>
                        <span className="text-[10px] bg-slate-800 text-slate-300 px-2 py-0.5 rounded border border-white/10 whitespace-nowrap">
                          {mat.category}
                        </span>
                      </div>
                      <div className="text-[11px] text-slate-400">
                        Tamaño: {mat.size} • Subido: {mat.uploadDate}
                      </div>
                    </div>

                    <div className="flex items-center justify-between pt-2 border-t border-white/10">
                      <span className="text-[11px] text-emerald-400 font-semibold flex items-center gap-1">
                        <CheckCircle2 size={12} /> {mat.downloads} descargas de alumnos
                      </span>
                      <button
                        onClick={() => alert(`Previsualizando ${mat.title}`)}
                        className="text-xs font-bold text-sky-400 hover:text-sky-300 flex items-center gap-1 cursor-pointer"
                      >
                        <Eye size={13} />
                        <span>Ver Archivo</span>
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        )}

        {/* ================= PESTAÑA 3: CALIFICACIONES & EVALUACIONES ================= */}
        {activeTab === 'calificaciones' && (
          <motion.div
            key="tab-calificaciones"
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            className="space-y-6"
          >
            <div className="p-6 rounded-3xl bg-[#121316] border border-white/10 space-y-4">
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <div>
                  <h3 className="text-base font-bold text-white">Libro de Notas y Calificaciones Oficiales</h3>
                  <p className="text-xs text-slate-400">Escala de 1.0 a 7.0. Nota mínima de aprobación SENCE: 4.0.</p>
                </div>
                <button
                  onClick={() => alert("¡Calificaciones guardadas y sincronizadas con el sistema SENCE!")}
                  className="bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white font-black text-xs px-5 py-2.5 rounded-xl shadow flex items-center gap-2 cursor-pointer"
                >
                  <CheckCircle2 size={15} />
                  <span>Sincronizar Notas con SENCE</span>
                </button>
              </div>

              {/* Grades Table */}
              <div className="overflow-x-auto">
                <table className="w-full text-xs text-left">
                  <thead className="bg-[#18191c] text-slate-300 uppercase text-[10px] tracking-wider border-b border-white/10">
                    <tr>
                      <th className="p-3.5">Estudiante</th>
                      <th className="p-3.5">RUT</th>
                      <th className="p-3.5 text-center">M1 (Legislación)</th>
                      <th className="p-3.5 text-center">M2 (Seguridad)</th>
                      <th className="p-3.5 text-center">M3 (Técnicas)</th>
                      <th className="p-3.5 text-center">Examen Final</th>
                      <th className="p-3.5 text-center">Asistencia</th>
                      <th className="p-3.5 text-center">Estado</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-white/5">
                    {grades.map(g => (
                      <tr key={g.id} className="hover:bg-white/5 transition-colors">
                        <td className="p-3.5 font-bold text-white">{g.name}</td>
                        <td className="p-3.5 font-mono text-slate-400">{g.rut}</td>
                        <td className="p-3.5 text-center font-bold text-sky-400">{g.m1}</td>
                        <td className="p-3.5 text-center font-bold text-sky-400">{g.m2}</td>
                        <td className="p-3.5 text-center font-bold text-sky-400">{g.m3}</td>
                        <td className="p-3.5 text-center font-black text-emerald-400 text-sm">{g.exam}</td>
                        <td className="p-3.5 text-center font-semibold text-slate-300">{g.attendance}%</td>
                        <td className="p-3.5 text-center">
                          <span className={`px-2.5 py-1 rounded-full text-[10px] font-bold border ${
                            g.status.includes('Aprobado')
                              ? 'bg-emerald-950 text-emerald-300 border-emerald-500/40'
                              : 'bg-amber-950 text-amber-300 border-amber-500/40'
                          }`}>
                            {g.status}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </motion.div>
        )}

        {/* ================= PESTAÑA 4: LIBRO DE CLASES & ASISTENCIA SENCE ================= */}
        {activeTab === 'asistencia' && (
          <motion.div
            key="tab-asistencia"
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            className="space-y-6"
          >
            <div className="p-6 rounded-3xl bg-[#121316] border border-white/10 space-y-4">
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <div>
                  <h3 className="text-base font-bold text-white flex items-center gap-2">
                    <Clock size={16} className="text-sky-400" />
                    <span>Control de Asistencia y Libro de Clases Digital SENCE</span>
                  </h3>
                  <p className="text-xs text-slate-400">Registro oficial exigido por SENCE. Asistencia mínima requerida: 85%.</p>
                </div>

                <div className="flex items-center gap-2">
                  <span className="text-xs font-bold text-emerald-400 bg-emerald-950/80 px-3 py-1 rounded-full border border-emerald-500/40">
                    Firma Digital Docente Validada ✓
                  </span>
                </div>
              </div>

              {/* Attendance Overview Card */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2">
                <div className="p-4 rounded-2xl bg-[#18191c] border border-white/10">
                  <div className="text-[10px] uppercase text-slate-400 font-bold">Total Horas Impartidas</div>
                  <div className="text-xl font-black text-white mt-1">45 / 90 Horas</div>
                  <div className="text-[11px] text-sky-400">Avance cronológico: 50%</div>
                </div>

                <div className="p-4 rounded-2xl bg-[#18191c] border border-white/10">
                  <div className="text-[10px] uppercase text-slate-400 font-bold">Asistencia Promedio Curso</div>
                  <div className="text-xl font-black text-emerald-400 mt-1">92.4%</div>
                  <div className="text-[11px] text-slate-400">Sobre el umbral mínimo (85%)</div>
                </div>

                <div className="p-4 rounded-2xl bg-[#18191c] border border-white/10">
                  <div className="text-[10px] uppercase text-slate-400 font-bold">Sesiones Realizadas</div>
                  <div className="text-xl font-black text-cyan-400 mt-1">15 Sesiones</div>
                  <div className="text-[11px] text-slate-400">Bitácora al día</div>
                </div>
              </div>
            </div>
          </motion.div>
        )}

      </AnimatePresence>

      {/* Modal para Responder a Alumno */}
      <AnimatePresence>
        {selectedMessage && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md">
            <motion.div
              initial={{ opacity: 0, scale: 0.94 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.94 }}
              className="bg-[#121316] border border-sky-500/40 w-full max-w-lg rounded-3xl shadow-2xl p-6 sm:p-8 relative space-y-4"
            >
              <button
                onClick={() => setSelectedMessage(null)}
                className="absolute top-4 right-4 text-slate-400 hover:text-white p-2 rounded-full hover:bg-white/10 cursor-pointer"
              >
                <X size={20} />
              </button>

              <div className="space-y-1">
                <span className="text-[10px] font-bold text-sky-400 bg-sky-950 px-2.5 py-0.5 rounded-full border border-sky-500/40 uppercase">
                  Respuesta a Consulta
                </span>
                <h3 className="text-lg font-bold text-white">
                  Responder a {selectedMessage.student}
                </h3>
                <p className="text-xs text-slate-400 font-mono">
                  RUT: {selectedMessage.rut} • Asunto: {selectedMessage.topic}
                </p>
              </div>

              <div className="p-3.5 bg-[#18191c] rounded-xl border border-white/10 text-xs text-slate-300">
                <span className="font-bold text-slate-400 block mb-1">Mensaje del Estudiante:</span>
                "{selectedMessage.message}"
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">Tu Respuesta / Retroalimentación:</label>
                <textarea
                  rows="4"
                  required
                  placeholder="Escribe aquí tu explicación técnica o indicaciones para el alumno..."
                  value={replyText}
                  onChange={(e) => setReplyText(e.target.value)}
                  className="w-full bg-[#18191c] border border-white/10 rounded-xl p-3 text-xs text-white focus:outline-none focus:border-sky-400 resize-none"
                />
              </div>

              <div className="flex justify-end gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => setSelectedMessage(null)}
                  className="px-4 py-2 text-xs font-semibold text-slate-400 hover:text-white rounded-xl cursor-pointer"
                >
                  Cancelar
                </button>
                <button
                  type="button"
                  onClick={handleSendReply}
                  className="px-6 py-2.5 text-xs font-black text-white bg-gradient-to-r from-[#0284c7] to-sky-600 hover:from-sky-500 hover:to-sky-700 rounded-xl shadow cursor-pointer flex items-center gap-1.5"
                >
                  <Send size={13} />
                  <span>Enviar Respuesta</span>
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Modal para Publicar Comunicado Oficial */}
      <AnimatePresence>
        {showNewAnnouncementModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md">
            <motion.div
              initial={{ opacity: 0, scale: 0.94 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.94 }}
              className="bg-[#121316] border border-teal-500/40 w-full max-w-lg rounded-3xl shadow-2xl p-6 sm:p-8 relative space-y-4"
            >
              <button
                onClick={() => setShowNewAnnouncementModal(false)}
                className="absolute top-4 right-4 text-slate-400 hover:text-white p-2 rounded-full hover:bg-white/10 cursor-pointer"
              >
                <X size={20} />
              </button>

              <div className="space-y-1">
                <span className="text-[10px] font-bold text-teal-300 bg-teal-950 px-2.5 py-0.5 rounded-full border border-teal-500/40 uppercase">
                  Comunicado Oficial a la Clase
                </span>
                <h3 className="text-lg font-bold text-white">
                  Publicar Aviso en "{currentCourse.title}"
                </h3>
              </div>

              <form onSubmit={handleCreateAnnouncement} className="space-y-3.5">
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">Título del Anuncio</label>
                  <input
                    type="text"
                    required
                    placeholder="Ej: Fechas de Examen Práctico / Grabación de Clase"
                    value={newAnnouncementTitle}
                    onChange={(e) => setNewAnnouncementTitle(e.target.value)}
                    className="w-full bg-[#18191c] border border-white/10 rounded-xl px-3.5 py-2 text-xs text-white focus:outline-none focus:border-teal-400"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">Detalle del Comunicado</label>
                  <textarea
                    rows="4"
                    required
                    placeholder="Escribe las instrucciones o información para todos los estudiantes inscritos..."
                    value={newAnnouncementContent}
                    onChange={(e) => setNewAnnouncementContent(e.target.value)}
                    className="w-full bg-[#18191c] border border-white/10 rounded-xl p-3 text-xs text-white focus:outline-none focus:border-teal-400 resize-none"
                  />
                </div>

                <div className="flex justify-end gap-3 pt-2">
                  <button
                    type="button"
                    onClick={() => setShowNewAnnouncementModal(false)}
                    className="px-4 py-2 text-xs font-semibold text-slate-400 hover:text-white rounded-xl cursor-pointer"
                  >
                    Cancelar
                  </button>
                  <button
                    type="submit"
                    className="px-6 py-2.5 text-xs font-black text-gray-950 bg-gradient-to-r from-[#00c2b2] to-teal-400 hover:from-teal-400 hover:to-teal-500 rounded-xl shadow cursor-pointer flex items-center gap-1.5"
                  >
                    <Send size={13} />
                    <span>Publicar a Toda la Clase</span>
                  </button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

    </div>
  );
};

export default TeacherPortalView;
