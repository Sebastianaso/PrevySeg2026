import React, { useState } from 'react';
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
  FolderKanban
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

const LMSLayout = ({ currentUser, onLogout, onReturnHome }) => {
  // Navegación principal en barra superior: 'inicio' | 'area-personal' | 'mis-cursos' | 'administracion' | 'admin-sitio'
  const [mainNavTab, setMainNavTab] = useState('area-personal');
  
  // Sub-pestaña activa en "Administración del sitio": 'cursos' | 'configuracion' | 'participantes' | 'informes' | 'preguntas' | 'contenido'
  const [adminSubTab, setAdminSubTab] = useState('cursos');

  const [isEditMode, setIsEditMode] = useState(false);
  const [showUserDropdown, setShowUserDropdown] = useState(false);
  const [showNotifDropdown, setShowNotifDropdown] = useState(false);

  // Tabs del submenú azul (bg-blue-900) para "Administración del sitio"
  const adminSubTabs = [
    { id: 'cursos', label: 'Página Principal', icon: BookOpen },
    { id: 'configuracion', label: 'Configuración', icon: Settings },
    { id: 'participantes', label: 'Participantes', icon: Users },
    { id: 'informes', label: 'Informes', icon: FileText },
    { id: 'preguntas', label: 'Banco de preguntas', icon: HelpCircle },
    { id: 'contenido', label: 'Banco de contenido', icon: Layers },
  ];

  const handleSelectCourse = (course) => {
    setMainNavTab('admin-sitio');
    setAdminSubTab('participantes');
  };

  const handleNavigateFromAdminGeneral = (targetSubTab) => {
    setMainNavTab('admin-sitio');
    setAdminSubTab(targetSubTab);
  };

  const userInitials = currentUser?.nombre 
    ? currentUser.nombre.split(' ').map(n => n[0]).join('').substring(0, 2).toUpperCase()
    : 'AA';

  return (
    <div className="min-h-screen bg-[#18191c] text-white flex flex-col font-['Inter',sans-serif] selection:bg-[#00c2b2] selection:text-white">
      
      {/* 1. BARRA SUPERIOR (TOP BAR: Fondo Negro #0f1012) */}
      <header className="bg-[#0f1012] border-b border-gray-800 text-white sticky top-0 z-50 shadow-md">
        <div className="max-w-[1600px] mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
          
          {/* Left: Brand & Main Navigation Links */}
          <div className="flex items-center gap-6 sm:gap-8">
            <div 
              onClick={onReturnHome}
              className="flex items-center gap-2.5 cursor-pointer group select-none"
              title="Volver a la web pública de PrevySeg"
            >
              <div className="flex items-baseline text-2xl font-black tracking-tight">
                <span className="text-[#0284c7] group-hover:text-sky-400 transition-colors">Prevy</span>
                <span className="text-[#00c2b2] group-hover:text-teal-300 transition-colors">Seg</span>
              </div>
              <span className="bg-sky-950 text-sky-300 text-[10px] font-bold px-2 py-0.5 rounded border border-sky-800/60 hidden sm:inline-block">
                LMS Virtual
              </span>
            </div>

            {/* Enlaces de Navegación Principales */}
            <nav className="hidden lg:flex items-center space-x-1 text-xs font-semibold text-gray-300">
              <button 
                onClick={() => setMainNavTab('inicio')}
                className={`px-3 py-2 rounded-lg transition-colors cursor-pointer ${
                  mainNavTab === 'inicio' ? 'text-white bg-gray-800 font-bold' : 'hover:text-white hover:bg-gray-800/40'
                }`}
              >
                Página Principal
              </button>
              <button 
                onClick={() => setMainNavTab('area-personal')}
                className={`px-3 py-2 rounded-lg transition-colors cursor-pointer ${
                  mainNavTab === 'area-personal' ? 'text-white bg-gray-800 font-bold' : 'hover:text-white hover:bg-gray-800/40'
                }`}
              >
                Área personal
              </button>
              <button 
                onClick={() => setMainNavTab('mis-cursos')}
                className={`px-3 py-2 rounded-lg transition-colors cursor-pointer ${
                  mainNavTab === 'mis-cursos' ? 'text-white bg-gray-800 font-bold' : 'hover:text-white hover:bg-gray-800/40'
                }`}
              >
                Mis cursos
              </button>
              {/* Nueva pestaña solicitada: "Administración" */}
              <button 
                onClick={() => setMainNavTab('administracion')}
                className={`px-3 py-2 rounded-lg transition-colors cursor-pointer ${
                  mainNavTab === 'administracion' ? 'text-white bg-gray-800 font-bold' : 'hover:text-white hover:bg-gray-800/40'
                }`}
              >
                Administración
              </button>
              <button 
                onClick={() => setMainNavTab('admin-sitio')}
                className={`px-3 py-2 rounded-lg transition-colors cursor-pointer ${
                  mainNavTab === 'admin-sitio' ? 'text-white bg-gray-800 font-bold' : 'hover:text-white hover:bg-gray-800/40'
                }`}
              >
                Administración del sitio
              </button>
            </nav>
          </div>

          {/* Right: Controls, Notifications, Profile, Edit Mode Switch */}
          <div className="flex items-center gap-3 sm:gap-5">
            
            {/* Switch "Modo de edición" */}
            <div className="flex items-center gap-2 bg-gray-900/90 px-3 py-1.5 rounded-full border border-gray-700/80 shadow-sm">
              <span className="text-[11px] font-bold text-gray-300 hidden sm:inline select-none">
                Modo de edición
              </span>
              <button
                type="button"
                onClick={() => setIsEditMode(!isEditMode)}
                className={`relative inline-flex h-5 w-9 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none ${
                  isEditMode ? 'bg-[#0284c7]' : 'bg-gray-700'
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

            {/* Notifications Bell */}
            <div className="relative">
              <button
                onClick={() => setShowNotifDropdown(!showNotifDropdown)}
                className="p-2 text-gray-300 hover:text-white hover:bg-gray-800 rounded-full transition-colors relative cursor-pointer"
                title="Notificaciones"
              >
                <Bell size={18} />
                <span className="absolute top-1 right-1 w-2 h-2 bg-[#00c2b2] rounded-full ring-2 ring-[#0f1012]"></span>
              </button>

              {showNotifDropdown && (
                <div className="absolute right-0 mt-2 w-72 bg-[#18191c] border border-gray-700 rounded-xl shadow-2xl p-4 z-50 text-xs space-y-3 animate-in fade-in">
                  <div className="font-bold text-white pb-2 border-b border-gray-800 flex justify-between">
                    <span>Notificaciones SENCE</span>
                    <span className="text-[10px] text-[#00c2b2]">2 nuevas</span>
                  </div>
                  <div className="space-y-2">
                    <div className="p-2 rounded bg-gray-900 border border-gray-800">
                      <p className="font-semibold text-gray-200">Asistencia Sincronizada</p>
                      <p className="text-gray-400 text-[10px]">Marcación horaria OS-10 validada exitosamente.</p>
                    </div>
                    <div className="p-2 rounded bg-gray-900 border border-gray-800">
                      <p className="font-semibold text-gray-200">Nueva Evaluación</p>
                      <p className="text-gray-400 text-[10px]">3 alumnos enviaron examen de Legislación.</p>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Chat Icon */}
            <button
              onClick={() => alert("Abriendo mensajería instantánea del aula...")}
              className="p-2 text-gray-300 hover:text-white hover:bg-gray-800 rounded-full transition-colors hidden sm:inline-flex cursor-pointer"
              title="Mensajes"
            >
              <MessageSquare size={18} />
            </button>

            {/* User Profile Avatar with Initials */}
            <div className="relative">
              <button
                onClick={() => setShowUserDropdown(!showUserDropdown)}
                className="flex items-center gap-2 p-1.5 rounded-full hover:bg-gray-800 transition-colors cursor-pointer"
              >
                <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-[#0284c7] to-[#00c2b2] text-white font-bold text-xs flex items-center justify-center shadow-md">
                  {userInitials}
                </div>
                <div className="hidden md:block text-left text-xs">
                  <div className="font-bold text-gray-100 leading-tight">
                    {currentUser?.nombre || 'Usuario SENCE'}
                  </div>
                  <div className="text-[10px] text-[#00c2b2] font-mono leading-tight">
                    {currentUser?.rut || '15692858-5'}
                  </div>
                </div>
                <ChevronDown size={14} className="text-gray-400 hidden sm:block" />
              </button>

              {/* Profile Dropdown */}
              {showUserDropdown && (
                <div className="absolute right-0 mt-2 w-56 bg-[#18191c] border border-gray-700 rounded-2xl shadow-2xl p-2 z-50 text-xs space-y-1 animate-in fade-in">
                  <div className="px-3 py-2 border-b border-gray-800">
                    <div className="font-bold text-white">{currentUser?.nombre}</div>
                    <div className="text-[10px] text-gray-400">{currentUser?.email}</div>
                  </div>
                  <button onClick={() => { setMainNavTab('mis-cursos'); setShowUserDropdown(false); }} className="w-full text-left px-3 py-2 rounded-lg hover:bg-gray-800 text-gray-300 hover:text-white flex items-center gap-2 cursor-pointer">
                    <BookOpen size={14} /> <span>Mis Cursos Activos</span>
                  </button>
                  <button onClick={() => { setMainNavTab('area-personal'); setShowUserDropdown(false); }} className="w-full text-left px-3 py-2 rounded-lg hover:bg-gray-800 text-gray-300 hover:text-white flex items-center gap-2 cursor-pointer">
                    <UserIcon size={14} /> <span>Área Personal</span>
                  </button>
                  <button onClick={() => { onReturnHome(); setShowUserDropdown(false); }} className="w-full text-left px-3 py-2 rounded-lg hover:bg-gray-800 text-[#00c2b2] flex items-center gap-2 cursor-pointer">
                    <Home size={14} /> <span>Sitio Público PrevySeg</span>
                  </button>
                  <div className="pt-1 border-t border-gray-800">
                    <button 
                      onClick={() => { onLogout(); setShowUserDropdown(false); }}
                      className="w-full text-left px-3 py-2 rounded-lg hover:bg-red-950/50 text-red-400 font-semibold flex items-center gap-2 cursor-pointer"
                    >
                      <LogOut size={14} /> <span>Cerrar Sesión</span>
                    </button>
                  </div>
                </div>
              )}
            </div>

          </div>

        </div>

        {/* Mobile Navigation Row */}
        <div className="lg:hidden flex items-center justify-around border-t border-gray-800/80 px-2 py-2 text-[11px] font-semibold text-gray-300 overflow-x-auto">
          <button onClick={() => setMainNavTab('inicio')} className={`px-2 py-1 rounded ${mainNavTab === 'inicio' ? 'text-white bg-gray-800 font-bold' : ''}`}>Página Principal</button>
          <button onClick={() => setMainNavTab('area-personal')} className={`px-2 py-1 rounded ${mainNavTab === 'area-personal' ? 'text-white bg-gray-800 font-bold' : ''}`}>Área personal</button>
          <button onClick={() => setMainNavTab('mis-cursos')} className={`px-2 py-1 rounded ${mainNavTab === 'mis-cursos' ? 'text-white bg-gray-800 font-bold' : ''}`}>Mis cursos</button>
          <button onClick={() => setMainNavTab('administracion')} className={`px-2 py-1 rounded ${mainNavTab === 'administracion' ? 'text-white bg-gray-800 font-bold' : ''}`}>Administración</button>
          <button onClick={() => setMainNavTab('admin-sitio')} className={`px-2 py-1 rounded ${mainNavTab === 'admin-sitio' ? 'text-white bg-gray-800 font-bold' : ''}`}>Admin Sitio</button>
        </div>
      </header>

      {/* 2. SUBMENÚ AZUL (bg-blue-900 / #1e3a8a) CUANDO SE SELECCIONA "Administración del sitio" o "Página Principal" */}
      {(mainNavTab === 'admin-sitio' || mainNavTab === 'inicio') && (
        <div className="bg-[#1e3a8a] text-white border-b border-blue-950 shadow-md">
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
                    className={`flex items-center gap-2 px-4 py-3 text-xs font-bold uppercase tracking-wider rounded-t-lg transition-all cursor-pointer whitespace-nowrap border-b-2 ${
                      isActive 
                        ? 'bg-[#18191c] text-[#38bdf8] border-[#38bdf8] shadow-inner font-extrabold' 
                        : 'text-blue-200 hover:text-white hover:bg-blue-800/60 border-transparent'
                    }`}
                  >
                    <IconComponent size={15} />
                    <span>{tab.label}</span>
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      )}

      {/* 3. CONTENIDO PRINCIPAL DE LA VISTA ACTIVA */}
      <main className="flex-1 max-w-[1600px] w-full mx-auto p-4 sm:p-6 lg:p-8">
        
        {/* Breadcrumbs */}
        <div className="flex items-center gap-2 text-xs text-gray-400 mb-6">
          <button onClick={() => setMainNavTab('area-personal')} className="hover:text-[#38bdf8] flex items-center gap-1 cursor-pointer">
            <Home size={13} />
            <span>Inicio</span>
          </button>
          <span>/</span>
          <span className="text-gray-300 font-semibold uppercase text-[11px]">
            {mainNavTab === 'area-personal' && 'Área personal'}
            {mainNavTab === 'mis-cursos' && 'Mis cursos'}
            {mainNavTab === 'administracion' && 'Administración OTEC'}
            {(mainNavTab === 'admin-sitio' || mainNavTab === 'inicio') && (
              <>Administración del sitio / {adminSubTabs.find(t => t.id === adminSubTab)?.label}</>
            )}
          </span>
          {isEditMode && (
            <span className="ml-auto bg-amber-500/20 text-amber-300 text-[10px] font-bold px-2 py-0.5 rounded border border-amber-500/30 flex items-center gap-1">
              <Edit3 size={11} /> Modo Edición Activo
            </span>
          )}
        </div>

        {/* Renderizado de Vistas según la pestaña principal */}
        
        {/* Vista: Área Personal (image_ef434c.png) */}
        {mainNavTab === 'area-personal' && (
          <PersonalAreaView onSelectCourse={handleSelectCourse} />
        )}

        {/* Vista: Mis Cursos (image_ef45f7.png) */}
        {mainNavTab === 'mis-cursos' && (
          <MyCoursesView onSelectCourse={handleSelectCourse} isEditMode={isEditMode} />
        )}

        {/* Vista: Administración (Nueva pestaña) */}
        {mainNavTab === 'administracion' && (
          <AdminGeneralView onNavigateSubtab={handleNavigateFromAdminGeneral} />
        )}

        {/* Vista: Administración del Sitio / Página Principal (Con Submenú Azul) */}
        {(mainNavTab === 'admin-sitio' || mainNavTab === 'inicio') && (
          <>
            {adminSubTab === 'cursos' && (
              <CoursesView onSelectCourse={handleSelectCourse} isEditMode={isEditMode} />
            )}
            {adminSubTab === 'configuracion' && (
              <SettingsView isEditMode={isEditMode} />
            )}
            {adminSubTab === 'participantes' && (
              <ParticipantsView isEditMode={isEditMode} />
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

      </main>

      {/* Footer del LMS */}
      <footer className="bg-[#0f1012] border-t border-gray-800 text-gray-500 text-xs py-4 px-6 text-center">
        <div className="max-w-[1600px] mx-auto flex flex-col sm:flex-row justify-between items-center gap-2">
          <span>PrevySeg LMS - Integración SENCE & OS-10 de Carabineros de Chile</span>
          <span>© 2026 PrevySeg Capacitaciones Arica</span>
        </div>
      </footer>

    </div>
  );
};

export default LMSLayout;
