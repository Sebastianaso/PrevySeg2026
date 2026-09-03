import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Bell, 
  MessageSquare, 
  Edit3, 
  Settings, 
  Users, 
  FileText, 
  HelpCircle, 
  Layers, 
  BookOpen, 
  LogOut, 
  User as UserIcon, 
  ChevronDown, 
  Home, 
  ShieldCheck, 
  ExternalLink,
  Sliders,
  FolderKanban,
  Lock,
  SlidersHorizontal,
  ShieldAlert,
  GraduationCap,
  Briefcase,
  Sparkles,
  Award,
  KeyRound,
  FileCheck2,
  Video,
  UploadCloud,
  Clock,
  Menu,
  X,
  ChevronRight,
  CheckCircle2,
  LayoutDashboard
} from 'lucide-react';

import CoursesView from './views/CoursesView';
import SettingsView from './views/SettingsView';
import ParticipantsView from './views/ParticipantsView';
import ReportsView from './views/ReportsView';
import QuestionBankView from './views/QuestionBankView';
import ContentBankView from './views/ContentBankView';
import PersonalAreaView from './views/PersonalAreaView';
import MyCoursesView from './views/MyCoursesView';
import AdminGeneralView from './views/AdminGeneralView';
import SiteAdminView from './views/SiteAdminView';
import ExtraCoursesView from './views/ExtraCoursesView';
import JobBoardView from './views/JobBoardView';
import CourseClassroomView from './views/CourseClassroomView';
import CertificateApprovalView from './views/CertificateApprovalView';
import TeacherPortalView from './views/TeacherPortalView';

const LMSLayout = ({ currentUser, onLogout, onReturnHome, initialTab }) => {
  // 1. Identificación estricta de Roles: Administrador, Profesor y Estudiante
  const userRole = (currentUser?.rol || '').toUpperCase();
  
  const isRoleAdmin = userRole === 'ADMIN' || 
                      currentUser?.rut?.includes('15692858') || 
                      currentUser?.user === '15692858-5' || 
                      currentUser?.cargo?.toLowerCase().includes('administrador') || 
                      currentUser?.cargo?.toLowerCase().includes('director');

  const isRoleTeacher = !isRoleAdmin && (
    userRole === 'TEACHER' || 
    userRole === 'DOCENTE' || 
    userRole === 'PROFESOR' || 
    currentUser?.rut?.includes('21778425-5') || 
    currentUser?.cargo?.toLowerCase().includes('docente') || 
    currentUser?.cargo?.toLowerCase().includes('profesor')
  );

  const isRoleStudent = !isRoleAdmin && !isRoleTeacher;

  // 2. Tab por defecto según el rol:
  const defaultTabForRole = isRoleAdmin 
    ? 'ajustes-sitio' 
    : isRoleTeacher 
    ? 'interaccion' 
    : (initialTab || 'area-personal');

  const [activeNavTab, setActiveNavTab] = useState(defaultTabForRole);
  
  // Estado del Aula Virtual Activa (para reproducir clases)
  const [activeClassroomCourse, setActiveClassroomCourse] = useState(null);

  const [isEditMode, setIsEditMode] = useState(false);
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);

  // 3. Definición de Menús Laterales Específicos para cada Rol con Iconos Intuitivos
  
  // A. MENÚ ADMINISTRADOR (Tema Morado / Indigo)
  const adminMenuItems = [
    { 
      id: 'ajustes-sitio', 
      label: 'Ajustes del Sitio', 
      desc: 'Parámetros y Plataforma',
      icon: SlidersHorizontal,
      color: 'text-purple-400'
    },
    { 
      id: 'configuracion', 
      label: 'Gestión de Cursos', 
      desc: 'Mallas y Programas SENCE',
      icon: BookOpen,
      color: 'text-sky-400'
    },
    { 
      id: 'participantes', 
      label: 'Usuarios y Alumnos', 
      desc: 'Matrículas y Roles',
      icon: Users,
      color: 'text-emerald-400'
    },
    { 
      id: 'certificados', 
      label: 'Emisión de Certificados', 
      desc: 'Acreditación SPD / SENCE',
      icon: Award,
      color: 'text-amber-400'
    },
    { 
      id: 'informes', 
      label: 'Informes & Auditoría', 
      desc: 'Asistencia y Marcación',
      icon: FileText,
      color: 'text-cyan-400'
    },
    { 
      id: 'preguntas', 
      label: 'Banco de Preguntas', 
      desc: 'Exámenes y Reactivos',
      icon: HelpCircle,
      color: 'text-pink-400'
    },
    { 
      id: 'contenido', 
      label: 'Banco de Contenido', 
      desc: 'Archivos y SCORM',
      icon: Layers,
      color: 'text-indigo-400'
    },
  ];

  // B. MENÚ PROFESOR / DOCENTE (Tema Azul Cielo / Marino)
  const teacherMenuItems = [
    { 
      id: 'interaccion', 
      label: 'Interacción con Alumnos', 
      desc: 'Consultas, Dudas y Avisos',
      icon: MessageSquare,
      color: 'text-sky-400'
    },
    { 
      id: 'archivos', 
      label: 'Materiales & Archivos', 
      desc: 'Subida de PDFs y Guías',
      icon: UploadCloud,
      color: 'text-teal-400'
    },
    { 
      id: 'calificaciones', 
      label: 'Calificaciones & Notas', 
      desc: 'Planilla Oficial SENCE',
      icon: Award,
      color: 'text-amber-400'
    },
    { 
      id: 'asistencia', 
      label: 'Libro de Clases SENCE', 
      desc: 'Control y Asistencia 85%',
      icon: Clock,
      color: 'text-emerald-400'
    },
    { 
      id: 'aula-vivo', 
      label: 'Aula Virtual en Vivo', 
      desc: 'Clase Sincrónica Online',
      icon: Video,
      color: 'text-cyan-400'
    },
  ];

  // C. MENÚ ESTUDIANTE / ALUMNO (Tema Verde Azulado / Esmeralda)
  const studentMenuItems = [
    { 
      id: 'area-personal', 
      label: 'Área Personal', 
      desc: 'Mi Resumen Académico',
      icon: LayoutDashboard,
      color: 'text-teal-400'
    },
    { 
      id: 'mis-cursos', 
      label: 'Mis Cursos', 
      desc: 'Aula Virtual & Avance',
      icon: BookOpen,
      color: 'text-sky-400'
    },
    { 
      id: 'capacitaciones-extras', 
      label: 'Capacitaciones Extras', 
      desc: 'Cursos Complementarios',
      icon: GraduationCap,
      color: 'text-indigo-400'
    },
    { 
      id: 'bolsa-empleo', 
      label: 'Bolsa de Empleo', 
      desc: 'Ofertas Macro Zona Norte',
      icon: Briefcase,
      color: 'text-emerald-400'
    },
  ];

  // Selección de items y estilos según el rol actual
  const currentMenuItems = isRoleAdmin 
    ? adminMenuItems 
    : isRoleTeacher 
    ? teacherMenuItems 
    : studentMenuItems;

  const roleStyles = isRoleAdmin ? {
    themeName: 'admin',
    badgeText: 'Panel Administrador OTEC',
    badgeClass: 'bg-purple-950/90 border-purple-500/40 text-purple-300',
    activeNavClass: 'bg-gradient-to-r from-purple-900/80 to-indigo-950 text-white border-purple-500/40 shadow-xl shadow-purple-950/60',
    activeIconBg: 'bg-purple-600 text-white shadow-md',
    avatarGradient: 'bg-gradient-to-tr from-purple-600 to-indigo-600',
    scrollbarThumb: '[&::-webkit-scrollbar-thumb]:bg-purple-900/60',
    tagText: 'text-purple-300 font-mono',
    breadcrumbColor: 'text-purple-400',
    statusTag: 'SENCE & SPD Conectado ✓'
  } : isRoleTeacher ? {
    themeName: 'teacher',
    badgeText: 'Panel Docente / Instructor',
    badgeClass: 'bg-sky-950/90 border-sky-500/40 text-sky-300',
    activeNavClass: 'bg-gradient-to-r from-sky-900/80 to-blue-950 text-white border-sky-500/40 shadow-xl shadow-sky-950/60',
    activeIconBg: 'bg-sky-600 text-white shadow-md',
    avatarGradient: 'bg-gradient-to-tr from-[#0284c7] to-sky-400',
    scrollbarThumb: '[&::-webkit-scrollbar-thumb]:bg-sky-900/60',
    tagText: 'text-sky-300 font-mono',
    breadcrumbColor: 'text-sky-400',
    statusTag: 'Firma Digital Docente Habilitada ✓'
  } : {
    themeName: 'student',
    badgeText: 'Portal del Estudiante',
    badgeClass: 'bg-teal-950/90 border-teal-500/40 text-teal-300',
    activeNavClass: 'bg-gradient-to-r from-teal-900/80 to-emerald-950 text-white border-teal-500/40 shadow-xl shadow-teal-950/60',
    activeIconBg: 'bg-teal-600 text-white shadow-md',
    avatarGradient: 'bg-gradient-to-tr from-[#00c2b2] to-emerald-500',
    scrollbarThumb: '[&::-webkit-scrollbar-thumb]:bg-teal-900/60',
    tagText: 'text-teal-300 font-mono',
    breadcrumbColor: 'text-teal-400',
    statusTag: 'ClaveÚnica & SENCE Alumno Activo ✓'
  };

  const handleSelectCourse = (course) => {
    setActiveClassroomCourse(course || 'Curso de formación Guardia de Seguridad online');
  };

  const handleSidebarItemClick = (itemId) => {
    if (itemId === 'aula-vivo') {
      setActiveClassroomCourse('Curso de Formación Guardia de Seguridad (Credencial SPD)');
      setActiveNavTab('aula-vivo');
    } else {
      setActiveClassroomCourse(null);
      setActiveNavTab(itemId);
    }
    setMobileSidebarOpen(false);
  };

  const userInitials = currentUser?.nombre 
    ? currentUser.nombre.split(' ').map(n => n[0]).join('').substring(0, 2).toUpperCase()
    : 'US';

  const activeItemLabel = currentMenuItems.find(i => i.id === activeNavTab)?.label || 'Panel';

  return (
    <div className="min-h-screen bg-[#141518] text-white flex flex-col lg:flex-row font-['Inter',sans-serif] selection:bg-[#00c2b2] selection:text-white">
      
      {/* ========================================================================= */}
      {/* 1. BARRA LATERAL IZQUIERDA UNIFICADA Y DESPLAZABLE (DESKTOP)             */}
      {/* ========================================================================= */}
      <aside className={`hidden lg:flex lg:flex-col w-72 bg-[#0d0e11] border-r border-white/10 sticky top-0 h-screen z-40 overflow-y-auto scroll-smooth p-5 shadow-2xl space-y-6 [&::-webkit-scrollbar]:w-1.5 ${roleStyles.scrollbarThumb} [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-track]:bg-transparent`}>
        
        {/* Header Institucional de la Barra Lateral */}
        <div className="space-y-3 pb-4 border-b border-white/10 flex-shrink-0">
          <div 
            onClick={onReturnHome}
            className="cursor-pointer select-none group"
            title="Volver al Sitio Web PrevySeg"
          >
            <div className="flex items-baseline text-2xl font-black tracking-tight">
              <span className="text-[#0284c7] group-hover:text-sky-400 transition-colors">Prevy</span>
              <span className="text-[#00c2b2] group-hover:text-teal-300 transition-colors">Seg</span>
            </div>
            <div className="text-[9px] font-bold text-slate-400 uppercase tracking-wider">
              Organismo Técnico De Capacitación
            </div>
          </div>

          <div className={`inline-flex items-center gap-2 px-3 py-1 rounded-full border text-[10px] font-black uppercase tracking-wider shadow ${roleStyles.badgeClass}`}>
            <ShieldCheck size={13} />
            <span>{roleStyles.badgeText}</span>
          </div>
        </div>

        {/* Lista de Menú Lateral del Rol con Iconos Claros */}
        <div className="space-y-1.5 flex-1">
          <div className="text-[10px] font-extrabold uppercase text-slate-500 tracking-wider px-3 pb-1">
            {isRoleAdmin ? 'Gestión OTEC & Auditoría' : isRoleTeacher ? 'Módulos de Instrucción' : 'Mi Portal Académico'}
          </div>

          {currentMenuItems.map((item) => {
            const IconComponent = item.icon;
            const isActive = activeNavTab === item.id && !activeClassroomCourse;
            const isAulaActive = item.id === 'aula-vivo' && activeClassroomCourse;

            return (
              <button
                key={item.id}
                onClick={() => handleSidebarItemClick(item.id)}
                className={`w-full flex items-center justify-between p-3 rounded-2xl text-xs font-bold transition-all cursor-pointer text-left group ${
                  (isActive || isAulaActive)
                    ? `${roleStyles.activeNavClass} border` 
                    : 'text-slate-400 hover:text-white hover:bg-white/5 border border-transparent'
                }`}
              >
                <div className="flex items-center gap-3">
                  <div className={`p-2 rounded-xl transition-colors ${
                    (isActive || isAulaActive) 
                      ? roleStyles.activeIconBg 
                      : 'bg-slate-900 text-slate-400 group-hover:text-white group-hover:bg-slate-800'
                  }`}>
                    <IconComponent size={16} />
                  </div>
                  <div>
                    <div className={`leading-tight ${(isActive || isAulaActive) ? 'text-white font-black' : 'text-slate-200'}`}>
                      {item.label}
                    </div>
                    <div className="text-[10px] text-slate-400 font-normal leading-tight">
                      {item.desc}
                    </div>
                  </div>
                </div>

                {(isActive || isAulaActive) && (
                  <ChevronRight size={14} className="opacity-80" />
                )}
              </button>
            );
          })}
        </div>

        {/* Footer de la Barra Lateral (Modo Edición para Admin + Perfil + Salida) */}
        <div className="pt-4 border-t border-white/10 space-y-3 flex-shrink-0">
          
          {/* Switch Modo Edición (Solo Administrador) */}
          {isRoleAdmin && (
            <div className="flex items-center justify-between bg-[#121316] p-2.5 rounded-2xl border border-white/10">
              <span className="text-[11px] font-bold text-slate-300 flex items-center gap-1.5">
                <Edit3 size={13} className="text-amber-400" />
                <span>Modo Edición</span>
              </span>
              <button
                type="button"
                onClick={() => setIsEditMode(!isEditMode)}
                className={`relative inline-flex h-5 w-9 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ${
                  isEditMode ? 'bg-purple-600' : 'bg-slate-700'
                }`}
              >
                <span
                  className={`pointer-events-none inline-block h-4 w-4 transform rounded-full bg-white shadow ring-0 transition duration-200 ${
                    isEditMode ? 'translate-x-4' : 'translate-x-0'
                  }`}
                />
              </button>
            </div>
          )}

          {/* Tarjeta de Perfil del Usuario */}
          <div className="flex items-center gap-2.5 p-2 bg-[#121316] rounded-2xl border border-white/10">
            <div className={`w-8 h-8 rounded-full ${roleStyles.avatarGradient} text-white font-bold text-xs flex items-center justify-center flex-shrink-0 shadow`}>
              {userInitials}
            </div>
            <div className="overflow-hidden text-left text-xs flex-1">
              <div className="font-bold text-white truncate">{currentUser?.nombre || 'Usuario PrevySeg'}</div>
              <div className={`text-[10px] font-mono truncate ${roleStyles.tagText}`}>{currentUser?.rut || '15692858-5'}</div>
            </div>
          </div>

          {/* Botones de Acción y Salida */}
          <div className="flex gap-2">
            <button
              onClick={onReturnHome}
              className="flex-1 bg-slate-900 hover:bg-slate-800 text-slate-300 hover:text-white p-2.5 rounded-xl text-[11px] font-bold border border-white/10 flex items-center justify-center gap-1.5 cursor-pointer transition-colors"
              title="Volver a la Web Pública"
            >
              <Home size={13} className="text-[#00c2b2]" />
              <span>Web Pública</span>
            </button>

            <button
              onClick={onLogout}
              className="bg-red-950/60 hover:bg-red-900/80 text-red-300 p-2.5 rounded-xl text-[11px] font-bold border border-red-500/30 flex items-center justify-center cursor-pointer transition-colors"
              title="Cerrar Sesión"
            >
              <LogOut size={14} />
            </button>
          </div>

        </div>

      </aside>

      {/* ========================================================================= */}
      {/* 2. HEADER MÓVIL (PANTALLAS PEQUEÑAS)                                      */}
      {/* ========================================================================= */}
      <header className="lg:hidden bg-[#0d0e11] border-b border-white/10 p-4 sticky top-0 z-50 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <button
            onClick={() => setMobileSidebarOpen(!mobileSidebarOpen)}
            className="p-2 bg-slate-800 rounded-xl text-slate-300 border border-white/10 cursor-pointer"
          >
            {mobileSidebarOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
          <div className="text-sm font-black text-white">
            <span className="text-[#0284c7]">Prevy</span><span className="text-[#00c2b2]">Seg</span>
          </div>
        </div>

        <div className={`text-[10px] font-bold px-2.5 py-1 rounded-full border ${roleStyles.badgeClass}`}>
          {activeItemLabel}
        </div>
      </header>

      {/* MENÚ MÓVIL DESPLEGABLE */}
      <AnimatePresence>
        {mobileSidebarOpen && (
          <motion.div 
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="lg:hidden bg-[#0d0e11] border-b border-white/10 p-4 space-y-2 z-40"
          >
            {currentMenuItems.map((item) => {
              const IconComponent = item.icon;
              const isActive = activeNavTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => handleSidebarItemClick(item.id)}
                  className={`w-full flex items-center gap-3 p-3 rounded-xl text-xs font-bold text-left ${
                    isActive ? roleStyles.activeNavClass : 'text-slate-300 hover:bg-slate-800'
                  }`}
                >
                  <IconComponent size={16} />
                  <span>{item.label}</span>
                </button>
              );
            })}
            <div className="pt-2 border-t border-white/10 flex justify-between gap-2">
              <button onClick={onReturnHome} className="flex-1 bg-slate-800 p-2.5 rounded-xl text-xs text-slate-300">Web Pública</button>
              <button onClick={onLogout} className="bg-red-950 p-2.5 rounded-xl text-xs text-red-300">Cerrar Sesión</button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ========================================================================= */}
      {/* 3. ÁREA DE CONTENIDO PRINCIPAL SEGÚN EL ROL                               */}
      {/* ========================================================================= */}
      <div className="flex-1 flex flex-col min-w-0">
        
        {/* Top Bar Superior del Área de Trabajo */}
        <div className="h-16 border-b border-white/10 bg-[#0f1012]/80 backdrop-blur-md px-6 sm:px-8 flex items-center justify-between sticky top-0 z-30">
          <div className="flex items-center gap-2 text-xs text-slate-400">
            <span className={`font-bold uppercase tracking-wider text-[10px] ${roleStyles.breadcrumbColor}`}>
              {isRoleAdmin ? 'Administración OTEC' : isRoleTeacher ? 'Instrucción Docente' : 'Campus Virtual'}
            </span>
            <span>/</span>
            <span className="text-white font-bold">
              {activeClassroomCourse ? 'Aula Virtual Sincrónica en Vivo' : activeItemLabel}
            </span>
          </div>

          <div className="flex items-center gap-3">
            {isEditMode && isRoleAdmin && (
              <span className="bg-amber-500/20 text-amber-300 text-[10px] font-bold px-2.5 py-1 rounded-full border border-amber-500/40 flex items-center gap-1">
                <Edit3 size={11} /> Edición Activa
              </span>
            )}
            <span className="text-[11px] font-mono text-emerald-400 bg-emerald-950/80 px-2.5 py-1 rounded-lg border border-emerald-500/30 hidden sm:inline-block">
              {roleStyles.statusTag}
            </span>
          </div>
        </div>

        {/* Vistas Dinámicas */}
        <main className="p-4 sm:p-6 lg:p-8 flex-1 max-w-[1500px] w-full mx-auto">
          <AnimatePresence mode="wait">
            
            {/* Reproductor de Aula Virtual si está activa */}
            {activeClassroomCourse ? (
              <motion.div
                key="classroom"
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                transition={{ duration: 0.25 }}
              >
                <CourseClassroomView 
                  courseTitle={activeClassroomCourse} 
                  onBack={() => setActiveClassroomCourse(null)} 
                />
              </motion.div>
            ) : isRoleAdmin ? (
              
              /* ================= 1. VISTAS DEL ADMINISTRADOR ================= */
              <motion.div
                key={`admin-${activeNavTab}`}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                transition={{ duration: 0.25 }}
              >
                {activeNavTab === 'ajustes-sitio' && (
                  <SiteAdminView currentUser={currentUser} />
                )}
                {activeNavTab === 'configuracion' && (
                  <SettingsView isEditMode={isEditMode} />
                )}
                {activeNavTab === 'participantes' && (
                  <ParticipantsView isEditMode={isEditMode} />
                )}
                {activeNavTab === 'certificados' && (
                  <CertificateApprovalView currentUser={currentUser} />
                )}
                {activeNavTab === 'informes' && (
                  <ReportsView isEditMode={isEditMode} />
                )}
                {activeNavTab === 'preguntas' && (
                  <QuestionBankView isEditMode={isEditMode} />
                )}
                {activeNavTab === 'contenido' && (
                  <ContentBankView isEditMode={isEditMode} />
                )}
              </motion.div>

            ) : isRoleTeacher ? (

              /* ================= 2. VISTAS DEL PROFESOR / DOCENTE ================= */
              <motion.div
                key={`teacher-${activeNavTab}`}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                transition={{ duration: 0.25 }}
              >
                <TeacherPortalView 
                  currentUser={currentUser} 
                  onSelectCourse={handleSelectCourse} 
                  activeTab={activeNavTab === 'aula-vivo' ? 'interaccion' : activeNavTab}
                  onTabChange={(tab) => setActiveNavTab(tab)}
                />
              </motion.div>

            ) : (

              /* ================= 3. VISTAS DEL ESTUDIANTE / ALUMNO ================= */
              <motion.div
                key={`student-${activeNavTab}`}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                transition={{ duration: 0.25 }}
              >
                {activeNavTab === 'area-personal' && (
                  <PersonalAreaView onSelectCourse={handleSelectCourse} />
                )}
                {activeNavTab === 'mis-cursos' && (
                  <MyCoursesView onSelectCourse={handleSelectCourse} isEditMode={false} />
                )}
                {activeNavTab === 'capacitaciones-extras' && (
                  <ExtraCoursesView currentUser={currentUser} />
                )}
                {activeNavTab === 'bolsa-empleo' && (
                  <JobBoardView currentUser={currentUser} />
                )}
              </motion.div>

            )}

          </AnimatePresence>
        </main>

        {/* Footer del LMS */}
        <footer className="bg-[#0d0e11] border-t border-white/10 text-slate-500 text-xs py-3.5 px-6 text-center">
          <span>PrevySeg LMS - Integración SENCE NCh 2728 & Subsecretaría de Prevención del Delito (SPD) • © 2026</span>
        </footer>

      </div>

    </div>
  );
};

export default LMSLayout;
