import React, { useState, useEffect } from 'react';
import { 
  Users, 
  Search, 
  Filter, 
  UserPlus, 
  Download, 
  Mail, 
  Calendar, 
  Shield, 
  MoreVertical, 
  Edit3, 
  Trash2, 
  CheckCircle2, 
  Clock,
  Sparkles,
  RefreshCw,
  AlertCircle,
  Lock,
  Key,
  Eye,
  EyeOff,
  ShieldCheck
} from 'lucide-react';
import { 
  supabase, 
  adminCreateUser, 
  changeUserPassword, 
  formatRut, 
  cleanRut, 
  validateRut, 
  validateEmail, 
  validatePhone, 
  validatePassword 
} from '../../config/supabase';

const ParticipantsView = ({ isEditMode }) => {
  const [participantes, setParticipantes] = useState([]);
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedLetter, setSelectedLetter] = useState('TODOS');
  const [selectedRole, setSelectedRole] = useState('TODOS');
  const [selectedCourse, setSelectedCourse] = useState('TODOS');
  const [selectedUsers, setSelectedUsers] = useState([]);
  const [showEnrollModal, setShowEnrollModal] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const [toastSuccess, setToastSuccess] = useState('');

  // Form state para nuevo participante
  const [newParticipant, setNewParticipant] = useState({
    nombre: '',
    email: '',
    rut: '',
    telefono: '',
    rol: 'STUDENT',
    password: '',
    course_id: '',
  });
  const [showNewUserPass, setShowNewUserPass] = useState(false);

  // Modal para cambiar contraseña
  const [showChangePassModal, setShowChangePassModal] = useState(false);
  const [selectedUserForPass, setSelectedUserForPass] = useState(null);
  const [newPasswordInput, setNewPasswordInput] = useState('');
  const [showNewPassField, setShowNewPassField] = useState(false);
  const [passChangeLoading, setPassChangeLoading] = useState(false);
  const [passChangeError, setPassChangeError] = useState('');

  const fetchParticipantes = async () => {
    setLoading(true);
    setErrorMsg('');
    try {
      // 1. Fetch available courses
      const { data: coursesData } = await supabase
        .from('courses')
        .select('id, titulo, codigo_sence')
        .order('titulo', { ascending: true });
      
      if (coursesData) {
        setCourses(coursesData);
        if (coursesData.length > 0 && !newParticipant.course_id) {
          setNewParticipant(prev => ({ ...prev, course_id: coursesData[0].id }));
        }
      }

      // 2. Fetch users with their enrollments and courses
      const { data: usersData, error: usersError } = await supabase
        .from('users')
        .select(`
          id,
          rut,
          nombre,
          email,
          rol,
          telefono,
          domicilio,
          created_at,
          enrollments (
            id,
            estado,
            progreso,
            abono_inicial,
            documentos_validados,
            courses (
              id,
              titulo,
              codigo_sence
            )
          )
        `)
        .order('created_at', { ascending: false });

      if (usersError) throw usersError;

      const formatted = (usersData || []).map(u => {
        const firstEnrollment = u.enrollments?.[0];
        const courseTitle = firstEnrollment?.courses?.titulo || (u.rol === 'ADMIN' ? 'Administración OTEC' : u.rol === 'TEACHER' ? 'Cuerpo Docente' : 'Sin curso asignado');
        const progreso = firstEnrollment?.progreso ?? (u.rol === 'ADMIN' || u.rol === 'TEACHER' ? 100 : 0);
        const estado = firstEnrollment?.estado || (u.rol === 'ADMIN' || u.rol === 'TEACHER' ? 'ACTIVO' : 'PENDIENTE');

        // Split name into first and last
        const parts = (u.nombre || 'Usuario').split(' ');
        const firstName = parts[0];
        const lastName = parts.slice(1).join(' ') || '';

        return {
          id: u.id,
          rawUser: u,
          nombre: firstName,
          apellido: lastName,
          fullName: u.nombre,
          email: u.email,
          rut: u.rut || 'Sin RUT',
          rol: u.rol === 'ADMIN' ? 'Administrador' : u.rol === 'TEACHER' || u.rol === 'DOCENTE' ? 'Profesor / Docente' : 'Estudiante',
          rawRole: u.rol,
          curso: courseTitle,
          courseId: firstEnrollment?.courses?.id,
          grupos: [courseTitle],
          ultimoAcceso: u.rol === 'ADMIN' ? 'En línea ahora' : 'Registrado recientemente',
          estado: estado,
          progreso: Number(progreso),
          enrollmentId: firstEnrollment?.id,
        };
      });

      setParticipantes(formatted);
    } catch (err) {
      console.error('Error al obtener participantes de la base de datos:', err);
      setErrorMsg(err.message || 'Error al conectar con la base de datos');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchParticipantes();
  }, []);

  const alphabet = ['TODOS', ...'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('')];

  const filteredParticipants = participantes.filter((p) => {
    const fullName = `${p.nombre} ${p.apellido}`.toLowerCase();
    const matchesSearch = 
      fullName.includes(searchQuery.toLowerCase()) ||
      p.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.rut.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesLetter = 
      selectedLetter === 'TODOS' || 
      (p.apellido && p.apellido.toUpperCase().startsWith(selectedLetter)) ||
      p.nombre.toUpperCase().startsWith(selectedLetter);

    const matchesRole = 
      selectedRole === 'TODOS' || 
      p.rol.toLowerCase().includes(selectedRole.toLowerCase());

    const matchesCourse = 
      selectedCourse === 'TODOS' || 
      (p.courseId === selectedCourse || p.curso.includes(selectedCourse));

    return matchesSearch && matchesLetter && matchesRole && matchesCourse;
  });

  const toggleSelectAll = () => {
    if (selectedUsers.length === filteredParticipants.length) {
      setSelectedUsers([]);
    } else {
      setSelectedUsers(filteredParticipants.map((p) => p.id));
    }
  };

  const toggleSelectUser = (id) => {
    if (selectedUsers.includes(id)) {
      setSelectedUsers(selectedUsers.filter(uid => uid !== id));
    } else {
      setSelectedUsers([...selectedUsers, id]);
    }
  };

  const handleEnrollSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    setErrorMsg('');

    if (!newParticipant.nombre || !newParticipant.nombre.trim()) {
      alert('Por favor ingresa el nombre completo del participante.');
      setSubmitting(false);
      return;
    }

    const cleanR = cleanRut(newParticipant.rut);
    if (!cleanR || cleanR.length < 7) {
      alert('Por favor ingresa un RUT válido con formato 12.345.678-9');
      setSubmitting(false);
      return;
    }

    if (newParticipant.email) {
      const emailCheck = validateEmail(newParticipant.email);
      if (!emailCheck.isValid) {
        alert(emailCheck.error || 'Correo electrónico no válido.');
        setSubmitting(false);
        return;
      }
    }

    if (newParticipant.password && newParticipant.password.trim().length > 0 && newParticipant.password.trim().length < 4) {
      alert('Si defines una contraseña personalizada, debe tener al menos 4 caracteres.');
      setSubmitting(false);
      return;
    }

    try {
      // Usar la función RPC segura de base de datos con hash Bcrypt
      await adminCreateUser({
        rut: formatRut(newParticipant.rut) || newParticipant.rut,
        nombre: newParticipant.nombre.trim(),
        email: newParticipant.email.trim(),
        rol: newParticipant.rol,
        telefono: newParticipant.telefono.trim(),
        password: newParticipant.password.trim() || null, // null defaults to clean RUT
        courseId: newParticipant.course_id || null,
      });

      setShowEnrollModal(false);
      setToastSuccess(`Usuario ${newParticipant.nombre} creado y encriptado exitosamente.`);
      setTimeout(() => setToastSuccess(''), 4000);

      setNewParticipant({
        nombre: '',
        email: '',
        rut: '',
        telefono: '',
        rol: 'STUDENT',
        password: '',
        course_id: courses[0]?.id || '',
      });
      await fetchParticipantes();
    } catch (err) {
      console.error('Error al crear usuario en base de datos:', err);
      alert(err.message || 'No se pudo completar la creación del usuario.');
    } finally {
      setSubmitting(false);
    }
  };

  const handleChangePasswordSubmit = async (e) => {
    e.preventDefault();
    if (!selectedUserForPass || !selectedUserForPass.id) return;
    
    if (!newPasswordInput || newPasswordInput.trim().length < 4) {
      setPassChangeError('La contraseña debe tener al menos 4 caracteres.');
      return;
    }

    setPassChangeLoading(true);
    setPassChangeError('');

    try {
      await changeUserPassword(selectedUserForPass.id, newPasswordInput.trim());
      setShowChangePassModal(false);
      setNewPasswordInput('');
      setSelectedUserForPass(null);
      setToastSuccess(`Contraseña de ${selectedUserForPass.fullName} actualizada y encriptada con Bcrypt.`);
      setTimeout(() => setToastSuccess(''), 4000);
    } catch (err) {
      console.error('Error al cambiar contraseña:', err);
      setPassChangeError(err.message || 'Error al actualizar contraseña.');
    } finally {
      setPassChangeLoading(false);
    }
  };

  const handleOpenPasswordModal = (user) => {
    setSelectedUserForPass(user);
    setNewPasswordInput('');
    setPassChangeError('');
    setShowChangePassModal(true);
  };

  const handleDeleteUser = async (user) => {
    if (!window.confirm(`¿Seguro que deseas desvincular a ${user.fullName} (${user.rut})?`)) return;

    try {
      if (user.enrollmentId) {
        await supabase.from('enrollments').delete().eq('id', user.enrollmentId);
      }
      await supabase.from('users').delete().eq('id', user.id);
      await fetchParticipantes();
    } catch (err) {
      alert('Error al desmatricular usuario: ' + err.message);
    }
  };

  return (
    <div className="space-y-6">
      
      {/* 1. Header y Botones de Acción */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-white p-5 rounded-2xl border border-slate-200 shadow-sm">
        <div>
          <div className="flex items-center gap-2">
            <h2 className="text-xl font-bold text-slate-900 tracking-wide">Participantes Matriculados</h2>
            <span className="bg-sky-50 text-[#0284c7] text-xs font-semibold px-2.5 py-0.5 rounded-full border border-sky-200">
              {participantes.length} Registrados en PostgreSQL
            </span>
            {isEditMode && (
              <span className="bg-amber-50 text-amber-700 text-[11px] font-bold px-2 py-0.5 rounded flex items-center gap-1 border border-amber-300">
                <Edit3 size={12} /> Modo Edición Activo
              </span>
            )}
          </div>
          <p className="text-xs text-slate-500 mt-1">
            Gestión en tiempo real de alumnos, docentes y coordinadores OTEC PrevySeg
          </p>
        </div>

        <div className="flex items-center gap-3 w-full sm:w-auto">
          <button
            onClick={fetchParticipantes}
            className="p-2.5 bg-slate-50 hover:bg-slate-100 text-slate-700 border border-slate-200 rounded-xl transition-all cursor-pointer"
            title="Recargar datos"
          >
            <RefreshCw size={15} className={loading ? 'animate-spin' : ''} />
          </button>

          <button
            onClick={() => setShowEnrollModal(true)}
            className="bg-[#0284c7] hover:bg-sky-600 active:scale-95 text-white text-xs font-bold px-4 py-2.5 rounded-xl shadow-md flex items-center justify-center gap-2 transition-all cursor-pointer flex-1 sm:flex-none"
          >
            <UserPlus size={15} />
            <span>Agregar Usuarios</span>
          </button>
          
          <button
            onClick={() => {
              const rows = [
                ['RUT', 'Nombre', 'Email', 'Rol', 'Curso', 'Progreso', 'Estado'],
                ...participantes.map(p => [p.rut, p.fullName, p.email, p.rol, p.curso, `${p.progreso}%`, p.estado])
              ];
              const csvContent = "data:text/csv;charset=utf-8," + rows.map(e => e.join(",")).join("\n");
              const encodedUri = encodeURI(csvContent);
              const link = document.createElement("a");
              link.setAttribute("href", encodedUri);
              link.setAttribute("download", `participantes_prevyseg_${new Date().toISOString().slice(0,10)}.csv`);
              document.body.appendChild(link);
              link.click();
              document.body.removeChild(link);
            }}
            className="bg-white hover:bg-slate-50 text-slate-700 text-xs font-semibold px-3.5 py-2.5 rounded-xl border border-slate-200 flex items-center justify-center gap-2 transition-all cursor-pointer shadow-sm"
            title="Exportar a CSV"
          >
            <Download size={15} />
            <span className="hidden md:inline">Exportar</span>
          </button>
        </div>
      </div>

      {errorMsg && (
        <div className="p-4 bg-red-50 border border-red-200 rounded-2xl flex items-center gap-3 text-xs text-red-700">
          <AlertCircle size={18} className="text-red-500 flex-shrink-0" />
          <span>{errorMsg}</span>
        </div>
      )}

      {/* 2. Barra de Filtros y Búsqueda */}
      <div className="bg-white p-4 sm:p-5 rounded-2xl border border-slate-200 space-y-4 shadow-sm">
        
        <div className="grid grid-cols-1 sm:grid-cols-12 gap-3">
          {/* Buscador */}
          <div className="sm:col-span-6 relative">
            <input
              type="text"
              placeholder="Buscar por nombre, apellido, RUT o correo electrónico..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-slate-50 border border-slate-200 rounded-xl pl-10 pr-4 py-2.5 text-xs sm:text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:border-[#0284c7] focus:bg-white transition-all"
            />
            <Search size={16} className="absolute left-3.5 top-3 text-slate-400" />
          </div>

          {/* Filtro Rol */}
          <div className="sm:col-span-3">
            <select
              value={selectedRole}
              onChange={(e) => setSelectedRole(e.target.value)}
              className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2.5 text-xs text-slate-800 focus:outline-none focus:border-[#0284c7] focus:bg-white cursor-pointer"
            >
              <option value="TODOS">Todos los Roles</option>
              <option value="Estudiante">Estudiantes</option>
              <option value="Profesor">Profesores / Docentes</option>
              <option value="Administrador">Administradores</option>
            </select>
          </div>

          {/* Filtro Curso */}
          <div className="sm:col-span-3">
            <select
              value={selectedCourse}
              onChange={(e) => setSelectedCourse(e.target.value)}
              className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2.5 text-xs text-slate-800 focus:outline-none focus:border-[#0284c7] focus:bg-white cursor-pointer"
            >
              <option value="TODOS">Todos los Cursos</option>
              {courses.map(c => (
                <option key={c.id} value={c.id}>{c.titulo}</option>
              ))}
            </select>
          </div>
        </div>

        {/* Filtro Alfabético A-Z */}
        <div className="pt-2 border-t border-slate-100 overflow-x-auto pb-1">
          <div className="flex items-center gap-1 min-w-max text-xs">
            <span className="text-[11px] font-semibold text-slate-500 mr-2 uppercase">Filtrar A-Z:</span>
            {alphabet.map((letter) => (
              <button
                key={letter}
                onClick={() => setSelectedLetter(letter)}
                className={`px-2 py-1 rounded text-xs font-semibold transition-all cursor-pointer ${
                  selectedLetter === letter
                    ? 'bg-[#0284c7] text-white font-bold shadow-sm'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
                }`}
              >
                {letter}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* 3. Tabla de Participantes Dinámica */}
      <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-200 text-[11px] font-bold text-slate-600 uppercase tracking-wider">
                <th className="py-3.5 px-4 w-10">
                  <input
                    type="checkbox"
                    checked={selectedUsers.length > 0 && selectedUsers.length === filteredParticipants.length}
                    onChange={toggleSelectAll}
                    className="rounded bg-white border-slate-300 text-[#0284c7] focus:ring-0 cursor-pointer"
                  />
                </th>
                <th className="py-3.5 px-4">Nombre / Apellido</th>
                <th className="py-3.5 px-4">Dirección de Correo</th>
                <th className="py-3.5 px-4">Rol</th>
                <th className="py-3.5 px-4">Programa Asignado</th>
                <th className="py-3.5 px-4">Estado</th>
                <th className="py-3.5 px-4 text-center">Progreso</th>
                {isEditMode && <th className="py-3.5 px-4 text-right">Acciones</th>}
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-xs">
              {loading ? (
                <tr>
                  <td colSpan={isEditMode ? 8 : 7} className="py-12 text-center text-slate-400">
                    <div className="inline-block w-6 h-6 border-2 border-[#0284c7] border-t-transparent rounded-full animate-spin mb-2"></div>
                    <div>Consultando PostgreSQL en Supabase...</div>
                  </td>
                </tr>
              ) : filteredParticipants.length > 0 ? (
                filteredParticipants.map((p) => {
                  const isSelected = selectedUsers.includes(p.id);

                  return (
                    <tr 
                      key={p.id} 
                      className={`hover:bg-slate-50/70 transition-colors ${
                        isSelected ? 'bg-sky-50' : ''
                      }`}
                    >
                      {/* Checkbox */}
                      <td className="py-3.5 px-4">
                        <input
                          type="checkbox"
                          checked={isSelected}
                          onChange={() => toggleSelectUser(p.id)}
                          className="rounded bg-white border-slate-300 text-[#0284c7] focus:ring-0 cursor-pointer"
                        />
                      </td>

                      {/* Nombre y Avatar */}
                      <td className="py-3.5 px-4">
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-[#0284c7] to-[#00c2b2] text-white font-bold flex items-center justify-center text-xs flex-shrink-0 shadow-sm">
                            {p.nombre.charAt(0)}{p.apellido ? p.apellido.charAt(0) : ''}
                          </div>
                          <div>
                            <div className="font-bold text-slate-900 hover:text-[#00c2b2] cursor-pointer transition-colors">
                              {p.fullName}
                            </div>
                            <div className="text-[10px] text-slate-500 font-mono">
                              RUT: {p.rut}
                            </div>
                          </div>
                        </div>
                      </td>

                      {/* Correo */}
                      <td className="py-3.5 px-4 text-slate-700">
                        <a href={`mailto:${p.email}`} className="hover:text-[#0284c7] flex items-center gap-1.5 font-mono text-[11px]">
                          <Mail size={12} className="text-slate-400" />
                          <span>{p.email}</span>
                        </a>
                      </td>

                      {/* Roles */}
                      <td className="py-3.5 px-4">
                        <span className={`inline-flex items-center px-2 py-0.5 rounded text-[10px] font-semibold border ${
                          p.rawRole === 'ADMIN'
                            ? 'bg-purple-50 text-purple-700 border-purple-200'
                            : p.rawRole === 'TEACHER' || p.rawRole === 'DOCENTE'
                            ? 'bg-indigo-50 text-indigo-700 border-indigo-200'
                            : 'bg-sky-50 text-sky-700 border-sky-200'
                        }`}>
                          {p.rol}
                        </span>
                      </td>

                      {/* Curso */}
                      <td className="py-3.5 px-4 text-slate-700">
                        <span className="text-xs font-medium text-slate-800">
                          {p.curso}
                        </span>
                      </td>

                      {/* Estado */}
                      <td className="py-3.5 px-4">
                        <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-semibold border ${
                          p.estado === 'COMPLETADO' || p.estado === 'APROBADO'
                            ? 'bg-emerald-50 text-emerald-700 border-emerald-200'
                            : p.estado === 'ACTIVO' || p.estado === 'EN_CURSO'
                            ? 'bg-blue-50 text-blue-700 border-blue-200'
                            : 'bg-amber-50 text-amber-700 border-amber-200'
                        }`}>
                          <span className={`w-1.5 h-1.5 rounded-full ${
                            p.estado === 'COMPLETADO' || p.estado === 'APROBADO' ? 'bg-emerald-500' : p.estado === 'ACTIVO' ? 'bg-blue-500' : 'bg-amber-500'
                          }`} />
                          {p.estado}
                        </span>
                      </td>

                      {/* Progreso */}
                      <td className="py-3.5 px-4 text-center">
                        <div className="w-full max-w-[80px] mx-auto">
                          <div className="text-[10px] font-bold text-slate-600 mb-1">{p.progreso}%</div>
                          <div className="w-full h-1.5 bg-slate-100 rounded-full overflow-hidden border border-slate-200">
                            <div 
                              className={`h-full rounded-full ${p.progreso === 100 ? 'bg-emerald-500' : 'bg-[#0284c7]'}`}
                              style={{ width: `${p.progreso}%` }}
                            ></div>
                          </div>
                        </div>
                      </td>

                      {/* Acciones en Modo Edición */}
                      {isEditMode && (
                        <td className="py-3.5 px-4 text-right">
                          <div className="flex items-center justify-end gap-1.5">
                            <button
                              onClick={() => handleOpenPasswordModal(p)}
                              className="p-1.5 text-slate-400 hover:text-[#0284c7] rounded-lg hover:bg-sky-50 cursor-pointer transition-colors"
                              title="Cambiar / Restablecer Contraseña (Bcrypt)"
                            >
                              <Key size={14} />
                            </button>
                            <button
                              onClick={() => handleDeleteUser(p)}
                              className="p-1.5 text-slate-400 hover:text-red-600 rounded-lg hover:bg-red-50 cursor-pointer transition-colors"
                              title="Desmatricular / Eliminar"
                            >
                              <Trash2 size={14} />
                            </button>
                          </div>
                        </td>
                      )}
                    </tr>
                  );
                })
              ) : (
                <tr>
                  <td colSpan={isEditMode ? 8 : 7} className="py-12 text-center text-slate-400">
                    No se encontraron participantes registrados con los criterios de búsqueda.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Footer de la Tabla */}
        <div className="bg-slate-50 px-4 py-3 border-t border-slate-200 flex flex-col sm:flex-row justify-between items-center text-xs text-slate-600 gap-2">
          <div>
            Mostrando <strong className="text-slate-900">{filteredParticipants.length}</strong> de <strong className="text-slate-900">{participantes.length}</strong> participantes en base de datos
          </div>
          {selectedUsers.length > 0 && (
            <div className="flex items-center gap-3">
              <span className="text-sky-700 font-semibold">{selectedUsers.length} seleccionados</span>
            </div>
          )}
        </div>
      </div>

      {/* 4. Modal Matricular / Agregar Nuevo Usuario con Encriptación */}
      {showEnrollModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-in fade-in">
          <div className="bg-white border border-slate-200 w-full max-w-lg rounded-3xl shadow-2xl p-6 sm:p-7 relative max-h-[92vh] overflow-y-auto">
            <h3 className="text-xl font-bold text-slate-900 mb-1">Agregar Nuevo Usuario</h3>
            <p className="text-xs text-slate-500 mb-5">
              Registra un nuevo usuario con credenciales encriptadas en la base de datos PostgreSQL de PrevySeg.
            </p>

            <form onSubmit={handleEnrollSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Nombre Completo *</label>
                <input
                  type="text"
                  required
                  placeholder="Ej. Andrés Morales Silva"
                  value={newParticipant.nombre}
                  onChange={(e) => setNewParticipant({ ...newParticipant, nombre: e.target.value })}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 text-xs text-slate-900 focus:outline-none focus:border-[#0284c7] focus:bg-white"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">RUT Chileno *</label>
                  <input
                    type="text"
                    required
                    placeholder="12.345.678-9"
                    value={newParticipant.rut}
                    onChange={(e) => setNewParticipant({ ...newParticipant, rut: formatRut(e.target.value) })}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 text-xs text-slate-900 font-mono focus:outline-none focus:border-[#0284c7] focus:bg-white"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Teléfono / WhatsApp</label>
                  <input
                    type="tel"
                    placeholder="+56 9 1234 5678"
                    value={newParticipant.telefono}
                    onChange={(e) => setNewParticipant({ ...newParticipant, telefono: e.target.value })}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 text-xs text-slate-900 focus:outline-none focus:border-[#0284c7] focus:bg-white"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Correo Electrónico</label>
                <input
                  type="email"
                  placeholder="usuario@gmail.com (opcional)"
                  value={newParticipant.email}
                  onChange={(e) => setNewParticipant({ ...newParticipant, email: e.target.value })}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 text-xs text-slate-900 focus:outline-none focus:border-[#0284c7] focus:bg-white"
                />
              </div>

              {/* Contraseña Inicial */}
              <div>
                <div className="flex justify-between items-center mb-1">
                  <label className="block text-xs font-semibold text-slate-700">Contraseña de Acceso</label>
                  <span className="text-[10px] text-slate-400">Por defecto: RUT del usuario</span>
                </div>
                <div className="relative">
                  <input
                    type={showNewUserPass ? 'text' : 'password'}
                    placeholder="Opcional (si se deja vacío, será su RUT)"
                    value={newParticipant.password}
                    onChange={(e) => setNewParticipant({ ...newParticipant, password: e.target.value })}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl pl-3.5 pr-8 py-2.5 text-xs text-slate-900 focus:outline-none focus:border-[#0284c7] focus:bg-white"
                  />
                  <button
                    type="button"
                    onClick={() => setShowNewUserPass(!showNewUserPass)}
                    className="absolute right-2.5 top-2.5 text-slate-400 hover:text-slate-600 cursor-pointer"
                  >
                    {showNewUserPass ? <EyeOff size={14} /> : <Eye size={14} />}
                  </button>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Rol</label>
                  <select
                    value={newParticipant.rol}
                    onChange={(e) => setNewParticipant({ ...newParticipant, rol: e.target.value })}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2.5 text-xs text-slate-800 focus:outline-none focus:border-[#0284c7] focus:bg-white cursor-pointer"
                  >
                    <option value="STUDENT">Estudiante</option>
                    <option value="TEACHER">Profesor / Docente</option>
                    <option value="ADMIN">Administrador OTEC</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Curso a Matricular</label>
                  <select
                    value={newParticipant.course_id}
                    onChange={(e) => setNewParticipant({ ...newParticipant, course_id: e.target.value })}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2.5 text-xs text-slate-800 focus:outline-none focus:border-[#0284c7] focus:bg-white cursor-pointer"
                  >
                    <option value="">-- Sin curso inicial --</option>
                    {courses.map(c => (
                      <option key={c.id} value={c.id}>{c.titulo}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="p-2.5 bg-sky-50 border border-sky-200 rounded-xl flex items-center gap-2 text-[11px] text-sky-900">
                <ShieldCheck size={16} className="text-[#0284c7] flex-shrink-0" />
                <span>La contraseña será encriptada automáticamente con <strong>Bcrypt</strong> en Supabase Auth y PostgreSQL.</span>
              </div>

              <div className="pt-4 border-t border-slate-200 flex justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setShowEnrollModal(false)}
                  className="px-4 py-2.5 text-xs font-semibold text-slate-600 hover:text-slate-900 rounded-xl cursor-pointer"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  disabled={submitting}
                  className="px-5 py-2.5 text-xs font-bold text-white bg-[#0284c7] hover:bg-sky-600 rounded-xl shadow cursor-pointer disabled:opacity-50"
                >
                  {submitting ? 'Guardando y Encriptando...' : 'Crear Usuario Encriptado'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* 5. Modal Cambiar / Restablecer Contraseña */}
      {showChangePassModal && selectedUserForPass && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-in fade-in">
          <div className="bg-white border border-slate-200 w-full max-w-md rounded-3xl shadow-2xl p-6 sm:p-7 relative">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-2xl bg-sky-50 text-[#0284c7] flex items-center justify-center border border-sky-200">
                <Key size={20} />
              </div>
              <div>
                <h3 className="text-lg font-bold text-slate-900">Cambiar Contraseña</h3>
                <p className="text-xs text-slate-500">
                  {selectedUserForPass.fullName} • <span className="font-mono">{selectedUserForPass.rut}</span>
                </p>
              </div>
            </div>

            {passChangeError && (
              <div className="p-3 bg-red-50 border border-red-200 rounded-xl text-xs text-red-600 mb-4">
                {passChangeError}
              </div>
            )}

            <form onSubmit={handleChangePasswordSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Nueva Contraseña *</label>
                <div className="relative">
                  <input
                    type={showNewPassField ? 'text' : 'password'}
                    required
                    placeholder="Mínimo 4 caracteres"
                    value={newPasswordInput}
                    onChange={(e) => setNewPasswordInput(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl pl-3.5 pr-8 py-2.5 text-xs text-slate-900 focus:outline-none focus:border-[#0284c7] focus:bg-white"
                  />
                  <button
                    type="button"
                    onClick={() => setShowNewPassField(!showNewPassField)}
                    className="absolute right-2.5 top-2.5 text-slate-400 hover:text-slate-600 cursor-pointer"
                  >
                    {showNewPassField ? <EyeOff size={14} /> : <Eye size={14} />}
                  </button>
                </div>
              </div>

              <div className="p-2.5 bg-teal-50 border border-teal-200 rounded-xl flex items-center gap-2 text-[11px] text-teal-900">
                <ShieldCheck size={16} className="text-teal-600 flex-shrink-0" />
                <span>La nueva clave será encriptada con <strong>Blowfish Bcrypt</strong>.</span>
              </div>

              <div className="pt-3 border-t border-slate-200 flex justify-end gap-3">
                <button
                  type="button"
                  onClick={() => {
                    setShowChangePassModal(false);
                    setSelectedUserForPass(null);
                  }}
                  className="px-4 py-2 text-xs font-semibold text-slate-600 hover:text-slate-900 rounded-xl cursor-pointer"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  disabled={passChangeLoading}
                  className="px-5 py-2 text-xs font-bold text-white bg-[#0284c7] hover:bg-sky-600 rounded-xl shadow cursor-pointer disabled:opacity-50"
                >
                  {passChangeLoading ? 'Actualizando...' : 'Guardar Nueva Clave'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Toast Notification */}
      {toastSuccess && (
        <div className="fixed bottom-6 right-6 z-50 bg-emerald-600 text-white text-xs font-bold px-4 py-3 rounded-2xl shadow-xl flex items-center gap-2 animate-in slide-in-from-bottom-5">
          <CheckCircle2 size={16} />
          <span>{toastSuccess}</span>
        </div>
      )}

    </div>
  );
};

export default ParticipantsView;
