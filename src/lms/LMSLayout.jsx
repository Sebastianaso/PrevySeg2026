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
  Award
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

const LMSLayout = ({ currentUser, onLogout, onReturnHome }) => {
  // Verificación estricta de Roles (RBAC)
  const isStudent = currentUser?.rol === 'STUDENT' || currentUser?.rut?.includes('21778425-6');
  const isAdmin = !isStudent && (
    currentUser?.rol === 'ADMIN' || 
    currentUser?.rut?.includes('15692858') || 
    currentUser?.rut?.includes('21778425-5') ||
    currentUser?.rol?.toLowerCase().includes('administrador')
  );

  // Navegación principal en barra superior: 
  // Para ADMIN: 'inicio' | 'area-personal' | 'mis-cursos' | 'administracion' | 'admin-sitio'
  // Para STUDENT: 'area-personal' | 'mis-cursos' | 'capacitaciones-extras' | 'bolsa-empleo'
  const [mainNavTab, setMainNavTab] = useState('area-personal');
  
  // Sub-pestaña activa en "Administración del sitio": 'ajustes-sitio' | 'cursos' | 'configuracion' | 'participantes' | 'informes' | 'preguntas' | 'contenido' | 'certificados'
  const [adminSubTab, setAdminSubTab] = useState('ajustes-sitio');

  // Estado del Aula Virtual Activa (para reproducir clases)
  const [activeClassroomCourse, setActiveClassroomCourse] = useState(null);

  const [isEditMode, setIsEditMode] = useState(false);
  const [showUserDropdown, setShowUserDropdown] = useState(false);
  const [showNotifDropdown, setShowNotifDropdown] = useState(false);

  // Tabs del submenú azul para "Administración del sitio" (Solo para administradores)
  const adminSubTabs = [
    { id: 'ajustes-sitio', label: 'Ajustes del Sitio', icon: SlidersHorizontal },
    { id: 'cursos', label: 'Página Principal', icon: BookOpen },
    { id: 'configuracion', label: 'Configuración de Cursos', icon: Settings },
    { id: 'participantes', label: 'Participantes', icon: Users },
    { id: 'certificados', label: 'Emisión de Certificados', icon: Award },
    { id: 'informes', label: 'Informes', icon: FileText },
    { id: 'preguntas', label: 'Banco de preguntas', icon: HelpCircle },
    { id: 'contenido', label: 'Banco de contenido', icon: Layers },
  ];

  const handleSelectCourse = (course) => {
    setActiveClassroomCourse(course || 'Curso de formación Guardia de Seguridad online');
  };

  const handleNavigateFromAdminGeneral = (targetSubTab) => {
    setMainNavTab('admin-sitio');
    setAdminSubTab(targetSubTab);
  };

  const userInitials = currentUser?.nombre 
    ? currentUser.nombre.split(' ').map(n => n[0]).join('').substring(0, 2).toUpperCase()
    : 'US';

  return (
    <div className="min-h-screen bg-[#18191c] text-white flex flex-col font-['Inter',sans-serif] selection:bg-[#00c2b2] selection:text-white">
      
      {/* 1. BARRA SUPERIOR (TOP BAR con Glassmorphism) */}
      <header className="bg-[#0f1012]/90 backdrop-blur-xl border-b border-white/10 text-white sticky top-0 z-50 shadow-xl">
        <div className="max-w-[1600px] mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
          
          {/* Left: Brand & Main Navigation Links */}
          <div className="flex items-center gap-6 sm:gap-8">
            <motion.div 
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={onReturnHome}
              className="flex items-center gap-2.5 cursor-pointer group select-none"
              title="Volver a la web pública de PrevySeg"
            >
              <div className="flex items-baseline text-2xl font-black tracking-tight">
                <span className="text-[#0284c7] group-hover:text-sky-400 transition-colors">Prevy</span>
                <span className="text-[#00c2b2] group-hover:text-teal-300 transition-colors">Seg</span>
              </div>
              <span className={`text-[10px] font-bold px-2.5 py-0.5 rounded-full border hidden sm:inline-block shadow-sm ${
                isStudent ? 'bg-teal-950/80 text-teal-300 border-teal-500/40' : 'bg-sky-950/80 text-sky-300 border-sky-500/40'
              }`}>
                {isStudent ? 'Portal Alumno' : 'LMS Virtual'}
              </span>
            </motion.div>

            {/* Enlaces de Navegación Principales según Rol */}
            <nav className="hidden lg:flex items-center space-x-1.5 text-xs font-semibold text-slate-300">
              
              {/* VISTAS COMUNES */}
              {!isStudent && (
                <button 
                  onClick={() => setMainNavTab('inicio')}
                  className={`px-3.5 py-2 rounded-xl transition-all cursor-pointer ${
                    mainNavTab === 'inicio' ? 'text-white bg-slate-800 font-bold shadow-sm border border-white/10' : 'hover:text-white hover:bg-slate-800/40'
                  }`}
                >
                  Página Principal
                </button>
              )}

              <button 
                onClick={() => setMainNavTab('area-personal')}
                className={`px-3.5 py-2 rounded-xl transition-all cursor-pointer relative ${
                  mainNavTab === 'area-personal' ? 'text-white bg-slate-800 font-bold shadow-sm border border-white/10' : 'hover:text-white hover:bg-slate-800/40'
                }`}
              >
                Área personal
              </button>

              <button 
                onClick={() => setMainNavTab('mis-cursos')}
                className={`px-3.5 py-2 rounded-xl transition-all cursor-pointer relative ${
                  mainNavTab === 'mis-cursos' ? 'text-white bg-slate-800 font-bold shadow-sm border border-white/10' : 'hover:text-white hover:bg-slate-800/40'
                }`}
              >
                Mis cursos
              </button>

              {/* VISTAS EXCLUSIVAS DEL ALUMNO (STUDENT) */}
              {isStudent && (
                <>
                  <motion.button 
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.97 }}
                    onClick={() => setMainNavTab('capacitaciones-extras')}
                    className={`px-3.5 py-2 rounded-xl transition-all cursor-pointer flex items-center gap-1.5 ${
                      mainNavTab === 'capacitaciones-extras' ? 'text-white bg-[#0284c7]/30 border border-[#0284c7] font-bold shadow-lg shadow-sky-950/40' : 'hover:text-white hover:bg-slate-800/40 text-sky-300'
                    }`}
                  >
                    <GraduationCap size={15} />
                    <span>Capacitaciones Extras</span>
                  </motion.button>

                  <motion.button 
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.97 }}
                    onClick={() => setMainNavTab('bolsa-empleo')}
                    className={`px-3.5 py-2 rounded-xl transition-all cursor-pointer flex items-center gap-1.5 ${
                      mainNavTab === 'bolsa-empleo' ? 'text-white bg-[#00c2b2]/30 border border-[#00c2b2] font-bold shadow-lg shadow-teal-950/40' : 'hover:text-white hover:bg-slate-800/40 text-teal-300'
                    }`}
                  >
                    <Briefcase size={14} />
                    <span>Bolsa de empleo</span>
                  </motion.button>
                </>
              )}

              {/* VISTAS EXCLUSIVAS DE ADMINISTRADOR (ADMIN) */}
              {isAdmin && (
                <>
                  <button 
                    onClick={() => setMainNavTab('administracion')}
                    className={`px-3.5 py-2 rounded-xl transition-all cursor-pointer ${
                      mainNavTab === 'administracion' ? 'text-white bg-slate-800 font-bold shadow-sm border border-white/10' : 'hover:text-white hover:bg-slate-800/40'
                    }`}
                  >
                    Administración
                  </button>
                  
                  <motion.button 
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.97 }}
                    onClick={() => {
                      setMainNavTab('admin-sitio');
                      setAdminSubTab('ajustes-sitio');
                    }}
                    className={`px-3.5 py-2 rounded-xl transition-all cursor-pointer flex items-center gap-1.5 ${
                      mainNavTab === 'admin-sitio' ? 'text-white bg-purple-900/60 border border-purple-500/40 font-bold shadow-lg shadow-purple-950/40' : 'text-purple-300 hover:text-white hover:bg-purple-950/40'
                    }`}
                  >
                    <Lock size={12} className="text-purple-400" />
                    <span>Administración del sitio</span>
                  </motion.button>
                </>
              )}
            </nav>
          </div>

          {/* Right: Controls, Notifications, Profile, Edit Mode Switch */}
          <div className="flex items-center gap-3 sm:gap-5">
            
            {/* Switch "Modo de edición" (Solo para Administrador) */}
            {isAdmin && (
              <div className="flex items-center gap-2 bg-slate-900/90 px-3 py-1.5 rounded-full border border-white/10 shadow-sm">
                <span className="text-[11px] font-bold text-slate-300 hidden sm:inline select-none">
                  Modo de edición
                </span>
                <button
                  type="button"
                  onClick={() => setIsEditMode(!isEditMode)}
                  className={`relative inline-flex h-5 w-9 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none ${
                    isEditMode ? 'bg-[#0284c7]' : 'bg-slate-700'
                  }`}
                  role="switch"
                  aria-checked={isEditMode}
                >
                  <span
                    className={`pointer-events-none inline-block h-4 w-4 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out ${
                      isEditMode ? 'translate-x-4' : 'translate-x-0'
                    }`}
                  />
                </button>
              </div>
            )}

            {/* Notifications Bell */}
            <div className="relative">
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={() => setShowNotifDropdown(!showNotifDropdown)}
                className="p-2 text-slate-300 hover:text-white hover:bg-white/10 rounded-full transition-colors relative cursor-pointer"
                title="Notificaciones"
              >
                <Bell size={18} />
                <span className="absolute top-1 right-1 w-2 h-2 bg-[#00c2b2] rounded-full ring-2 ring-[#0f1012] animate-pulse"></span>
              </motion.button>

              <AnimatePresence>
                {showNotifDropdown && (
                  <motion.div 
                    initial={{ opacity: 0, scale: 0.95, y: 10 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.95, y: 10 }}
                    transition={{ duration: 0.2 }}
                    className="absolute right-0 mt-2 w-72 bg-gradient-to-b from-[#18191c] to-[#121315] border border-white/15 rounded-2xl shadow-2xl p-4 z-50 text-xs space-y-3 backdrop-blur-2xl"
                  >
                    <div className="font-bold text-white pb-2 border-b border-white/10 flex justify-between">
                      <span>{isStudent ? 'Avisos Académicos' : 'Notificaciones SENCE'}</span>
                      <span className="text-[10px] text-[#00c2b2] font-bold">2 nuevas</span>
                    </div>
                    <div className="space-y-2">
                      {isStudent ? (
                        <>
                          <div className="p-2.5 rounded-xl bg-slate-900/90 border border-white/10">
                            <p className="font-semibold text-slate-200">Nueva Oferta Laboral</p>
                            <p className="text-slate-400 text-[10px]">Guardia OS-10 en Mall Plaza Arica disponible.</p>
                          </div>
                          <div className="p-2.5 rounded-xl bg-slate-900/90 border border-white/10">
                            <p className="font-semibold text-slate-200">Clase Sincrónica</p>
                            <p className="text-slate-400 text-[10px]">Tu módulo de Legislación comienza hoy 19:00 hrs.</p>
                          </div>
                        </>
                      ) : (
                        <>
                          <div className="p-2.5 rounded-xl bg-slate-900/90 border border-white/10">
                            <p className="font-semibold text-slate-200">Asistencia Sincronizada</p>
                            <p className="text-slate-400 text-[10px]">Marcación horaria OS-10 validada exitosamente.</p>
                          </div>
                          <div className="p-2.5 rounded-xl bg-slate-900/90 border border-white/10">
                            <p className="font-semibold text-slate-200">Nueva Evaluación</p>
                            <p className="text-slate-400 text-[10px]">3 alumnos enviaron examen de Legislación.</p>
                          </div>
                        </>
                      )}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* User Profile Avatar with Initials */}
            <div className="relative">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setShowUserDropdown(!showUserDropdown)}
                className="flex items-center gap-2.5 p-1.5 rounded-full hover:bg-white/10 transition-colors cursor-pointer"
              >
                <div className={`w-8 h-8 rounded-full text-white font-bold text-xs flex items-center justify-center shadow-md ${
                  isStudent 
                    ? 'bg-gradient-to-tr from-[#00c2b2] to-emerald-500' 
                    : 'bg-gradient-to-tr from-[#0284c7] to-[#00c2b2]'
                }`}>
                  {userInitials}
                </div>
                <div className="hidden md:block text-left text-xs">
                  <div className="font-bold text-slate-100 leading-tight">
                    {currentUser?.nombre || 'Usuario Registrado'}
                  </div>
                  <div className="text-[10px] text-[#00c2b2] font-mono leading-tight">
                    {currentUser?.rut || '15692858-5'}
                  </div>
                </div>
                <ChevronDown size={14} className="text-slate-400 hidden sm:block" />
              </motion.button>

              {/* Profile Dropdown */}
              <AnimatePresence>
                {showUserDropdown && (
                  <motion.div 
                    initial={{ opacity: 0, scale: 0.95, y: 10 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.95, y: 10 }}
                    transition={{ duration: 0.2 }}
                    className="absolute right-0 mt-2 w-64 bg-gradient-to-b from-[#18191c] to-[#121315] border border-white/15 rounded-2xl shadow-2xl p-2.5 z-50 text-xs space-y-1 backdrop-blur-2xl"
                  >
                    <div className="px-3 py-2 border-b border-white/10">
                      <div className="font-bold text-white">{currentUser?.nombre}</div>
                      <div className="text-[10px] text-slate-400">{currentUser?.email}</div>
                      <span className={`inline-block mt-1 text-[10px] font-bold px-2 py-0.5 rounded-full border ${
                        isStudent 
                          ? 'text-teal-300 bg-teal-950/80 border-teal-500/40' 
                          : 'text-purple-300 bg-purple-950/80 border-purple-500/40'
                      }`}>
                        {currentUser?.cargo || (isStudent ? 'Estudiante' : 'Administrador')}
                      </span>
                    </div>

                    <button onClick={() => { setMainNavTab('area-personal'); setShowUserDropdown(false); }} className="w-full text-left px-3 py-2 rounded-xl hover:bg-white/5 text-slate-300 hover:text-white flex items-center gap-2 cursor-pointer transition-colors">
                      <UserIcon size={14} /> <span>Área Personal</span>
                    </button>

                    <button onClick={() => { setMainNavTab('mis-cursos'); setShowUserDropdown(false); }} className="w-full text-left px-3 py-2 rounded-xl hover:bg-white/5 text-slate-300 hover:text-white flex items-center gap-2 cursor-pointer transition-colors">
                      <BookOpen size={14} /> <span>Mis Cursos Activos</span>
                    </button>

                    {isStudent && (
                      <>
                        <button onClick={() => { setMainNavTab('capacitaciones-extras'); setShowUserDropdown(false); }} className="w-full text-left px-3 py-2 rounded-xl hover:bg-white/5 text-sky-300 hover:text-white flex items-center gap-2 cursor-pointer transition-colors">
                          <GraduationCap size={14} /> <span>Capacitaciones Extras</span>
                        </button>
                        <button onClick={() => { setMainNavTab('bolsa-empleo'); setShowUserDropdown(false); }} className="w-full text-left px-3 py-2 rounded-xl hover:bg-white/5 text-teal-300 hover:text-white flex items-center gap-2 cursor-pointer transition-colors">
                          <Briefcase size={14} /> <span>Bolsa de Empleo</span>
                        </button>
                      </>
                    )}

                    {isAdmin && (
                      <button onClick={() => { setMainNavTab('admin-sitio'); setAdminSubTab('ajustes-sitio'); setShowUserDropdown(false); }} className="w-full text-left px-3 py-2 rounded-xl hover:bg-purple-900/40 text-purple-300 hover:text-white flex items-center gap-2 cursor-pointer transition-colors">
                        <Lock size={14} /> <span>Ajustes del Sitio</span>
                      </button>
                    )}

                    <button onClick={() => { onReturnHome(); setShowUserDropdown(false); }} className="w-full text-left px-3 py-2 rounded-xl hover:bg-white/5 text-[#00c2b2] flex items-center gap-2 cursor-pointer transition-colors">
                      <Home size={14} /> <span>Sitio Público PrevySeg</span>
                    </button>

                    <div className="pt-1 border-t border-white/10">
                      <button 
                        onClick={() => { onLogout(); setShowUserDropdown(false); }}
                        className="w-full text-left px-3 py-2 rounded-xl hover:bg-red-950/60 text-red-400 font-semibold flex items-center gap-2 cursor-pointer transition-colors"
                      >
                        <LogOut size={14} /> <span>Cerrar Sesión</span>
                      </button>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

          </div>

        </div>

        {/* Mobile Navigation Row */}
        <div className="lg:hidden flex items-center justify-around border-t border-white/10 px-2 py-2 text-[11px] font-semibold text-slate-300 overflow-x-auto">
          <button onClick={() => setMainNavTab('area-personal')} className={`px-2.5 py-1 rounded-lg ${mainNavTab === 'area-personal' ? 'text-white bg-slate-800 font-bold' : ''}`}>Área personal</button>
          <button onClick={() => setMainNavTab('mis-cursos')} className={`px-2.5 py-1 rounded-lg ${mainNavTab === 'mis-cursos' ? 'text-white bg-slate-800 font-bold' : ''}`}>Mis cursos</button>
          
          {isStudent ? (
            <>
              <button onClick={() => setMainNavTab('capacitaciones-extras')} className={`px-2.5 py-1 rounded-lg ${mainNavTab === 'capacitaciones-extras' ? 'text-sky-300 bg-sky-950 font-bold' : ''}`}>Capacitaciones</button>
              <button onClick={() => setMainNavTab('bolsa-empleo')} className={`px-2.5 py-1 rounded-lg ${mainNavTab === 'bolsa-empleo' ? 'text-teal-300 bg-teal-950 font-bold' : ''}`}>Empleos</button>
            </>
          ) : (
            <>
              <button onClick={() => setMainNavTab('inicio')} className={`px-2.5 py-1 rounded-lg ${mainNavTab === 'inicio' ? 'text-white bg-slate-800 font-bold' : ''}`}>Página Principal</button>
              <button onClick={() => setMainNavTab('administracion')} className={`px-2.5 py-1 rounded-lg ${mainNavTab === 'administracion' ? 'text-white bg-slate-800 font-bold' : ''}`}>Administración</button>
              <button onClick={() => { setMainNavTab('admin-sitio'); setAdminSubTab('ajustes-sitio'); }} className={`px-2.5 py-1 rounded-lg ${mainNavTab === 'admin-sitio' ? 'text-purple-300 bg-purple-950 font-bold' : ''}`}>Admin Sitio</button>
            </>
          )}
        </div>
      </header>

      {/* 2. SUBMENÚ AZUL CON INDICADOR ACTIVO - EXCLUSIVO PARA ADMINISTRADORES */}
      {isAdmin && (mainNavTab === 'admin-sitio' || mainNavTab === 'inicio') && (
        <div className="bg-gradient-to-r from-[#1e3a8a] via-[#1d4ed8] to-[#1e3a8a] text-white border-b border-white/10 shadow-md">
          <div className="max-w-[1600px] mx-auto px-4 sm:px-6">
            <div className="flex items-center space-x-1 sm:space-x-2 overflow-x-auto py-1 scrollbar-none">
              {adminSubTabs.map((tab) => {
                const IconComponent = tab.icon;
                const isActive = adminSubTab === tab.id;

                return (
                  <button
                    key={tab.id}
                    onClick={() => {
                      setMainNavTab('admin-sitio');
                      setAdminSubTab(tab.id);
                    }}
                    className={`flex items-center gap-2 px-4 py-3 text-xs font-bold uppercase tracking-wider rounded-t-xl transition-all cursor-pointer whitespace-nowrap relative ${
                      isActive 
                        ? 'bg-[#18191c] text-[#38bdf8] shadow-inner font-extrabold' 
                        : 'text-blue-100 hover:text-white hover:bg-blue-800/60'
                    }`}
                  >
                    <IconComponent size={15} />
                    <span>{tab.label}</span>
                    {isActive && (
                      <motion.div 
                        layoutId="activeAdminTab"
                        className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#38bdf8] shadow-sm shadow-cyan-400"
                      />
                    )}
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      )}

      {/* 3. CONTENIDO PRINCIPAL DE LA VISTA ACTIVA CON ANIMACIÓN DE ENTRADA */}
      <main className="flex-1 max-w-[1600px] w-full mx-auto p-4 sm:p-6 lg:p-8">
        
        {/* Breadcrumbs */}
        <div className="flex items-center gap-2 text-xs text-slate-400 mb-6">
          <button onClick={() => setMainNavTab('area-personal')} className="hover:text-[#38bdf8] flex items-center gap-1 cursor-pointer">
            <Home size={13} />
            <span>Inicio</span>
          </button>
          <span>/</span>
          <span className="text-slate-300 font-semibold uppercase text-[11px]">
            {mainNavTab === 'area-personal' && 'Área personal'}
            {mainNavTab === 'mis-cursos' && 'Mis cursos'}
            {mainNavTab === 'capacitaciones-extras' && 'Capacitaciones Extras'}
            {mainNavTab === 'bolsa-empleo' && 'Bolsa de Empleo'}
            {mainNavTab === 'administracion' && 'Administración OTEC'}
            {(mainNavTab === 'admin-sitio' || mainNavTab === 'inicio') && (
              <>Administración del sitio / {adminSubTabs.find(t => t.id === adminSubTab)?.label}</>
            )}
          </span>
          
          {isEditMode && isAdmin && (
            <span className="ml-auto bg-amber-500/20 text-amber-300 text-[10px] font-bold px-2.5 py-0.5 rounded-full border border-amber-500/40 flex items-center gap-1">
              <Edit3 size={11} /> Modo Edición Activo
            </span>
          )}
        </div>

        {/* Control de Acceso: Bloqueo de seguridad si un Alumno intenta forzar acceso a rutas de administración */}
        {isStudent && (mainNavTab === 'admin-sitio' || mainNavTab === 'administracion') && (
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="py-16 text-center space-y-4 bg-slate-900/60 rounded-3xl border border-red-800/50 p-8 shadow-2xl backdrop-blur-xl"
          >
            <div className="w-16 h-16 rounded-full bg-red-950/80 border border-red-600/40 text-red-400 flex items-center justify-center mx-auto shadow-lg shadow-red-950/50">
              <ShieldAlert size={36} />
            </div>
            <h2 className="text-2xl font-bold text-white">Acceso Restringido</h2>
            <p className="text-sm text-slate-400 max-w-md mx-auto">
              Este apartado está reservado para la administración del OTEC. Como estudiante, puedes acceder a tus cursos, certificaciones extras y bolsa laboral.
            </p>
            <motion.button
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.96 }}
              onClick={() => setMainNavTab('area-personal')}
              className="bg-[#0284c7] hover:bg-[#0369a1] text-white text-xs font-bold px-5 py-2.5 rounded-xl shadow-lg transition-all cursor-pointer"
            >
              Volver a mi Área Personal
            </motion.button>
          </motion.div>
        )}

        {/* Renderizado de Vistas según la pestaña principal */}
        <AnimatePresence mode="wait">
          {activeClassroomCourse ? (
            <motion.div
              key="classroom"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.35 }}
            >
              <CourseClassroomView 
                courseTitle={activeClassroomCourse} 
                onBack={() => setActiveClassroomCourse(null)} 
              />
            </motion.div>
          ) : (
            <motion.div
              key={mainNavTab + (mainNavTab === 'admin-sitio' ? adminSubTab : '')}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.35 }}
            >
              {/* Vista: Área Personal */}
              {mainNavTab === 'area-personal' && (
                <PersonalAreaView onSelectCourse={handleSelectCourse} />
              )}

              {/* Vista: Mis Cursos */}
              {mainNavTab === 'mis-cursos' && (
                <MyCoursesView onSelectCourse={handleSelectCourse} isEditMode={isEditMode && isAdmin} />
              )}

              {/* Vista: Capacitaciones Extras (Para Alumnos) */}
              {mainNavTab === 'capacitaciones-extras' && (
                <ExtraCoursesView currentUser={currentUser} />
              )}

              {/* Vista: Bolsa de Empleo (Para Alumnos) */}
              {mainNavTab === 'bolsa-empleo' && (
                <JobBoardView currentUser={currentUser} />
              )}

              {/* Vistas de Administrador */}
              {isAdmin && (
                <>
                  {mainNavTab === 'administracion' && (
                    <AdminGeneralView onNavigateSubtab={handleNavigateFromAdminGeneral} />
                  )}

                  {(mainNavTab === 'admin-sitio' || mainNavTab === 'inicio') && (
                    <>
                      {adminSubTab === 'ajustes-sitio' && (
                        <SiteAdminView currentUser={currentUser} />
                      )}
                      {adminSubTab === 'cursos' && (
                        <CoursesView onSelectCourse={handleSelectCourse} isEditMode={isEditMode} />
                      )}
                      {adminSubTab === 'configuracion' && (
                        <SettingsView isEditMode={isEditMode} />
                      )}
                      {adminSubTab === 'participantes' && (
                        <ParticipantsView isEditMode={isEditMode} />
                      )}
                      {adminSubTab === 'certificados' && (
                        <CertificateApprovalView currentUser={currentUser} />
                      )}
                      {adminSubTab === 'informes' && (
                        <ReportsView isEditMode={isEditMode} />
                      )}
                      {adminSubTab === 'preguntas' && (
                        <QuestionBankView isEditMode={isEditMode} />
                      )}
                      {adminSubTab === 'contenido' && (
                        <ContentBankView isEditMode={isEditMode} />
                      )}
                    </>
                  )}
                </>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </main>

      {/* Footer del LMS */}
      <footer className="bg-[#0f1012] border-t border-white/10 text-slate-500 text-xs py-4 px-6 text-center">
        <div className="max-w-[1600px] mx-auto flex flex-col sm:flex-row justify-between items-center gap-2">
          <span>PrevySeg LMS - Integración SENCE & OS-10 de Carabineros de Chile</span>
          <span>© 2026 PrevySeg Capacitaciones Arica</span>
        </div>
      </footer>

    </div>
  );
};

export default LMSLayout;
