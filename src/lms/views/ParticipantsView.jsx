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
  Sparkles
} from 'lucide-react';

/////AGREGAR BASE DE DATOS/DOMINIO AQUI///
const API_BASE_URL = "/////AGREGAR BASE DE DATOS/DOMINIO AQUI///";
const PARTICIPANTES_ENDPOINT = `${API_BASE_URL}/api/v1/cursos/participantes`; /////AGREGAR BASE DE DATOS/DOMINIO AQUI///

const ParticipantsView = ({ isEditMode }) => {
  // Estado dinámico para los participantes
  const [participantes, setParticipantes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedLetter, setSelectedLetter] = useState('TODOS');
  const [selectedRole, setSelectedRole] = useState('TODOS');
  const [selectedGroup, setSelectedGroup] = useState('TODOS');
  const [selectedUsers, setSelectedUsers] = useState([]);
  const [showEnrollModal, setShowEnrollModal] = useState(false);

  // Form state para nuevo participante
  const [newParticipant, setNewParticipant] = useState({
    nombre: '',
    apellido: '',
    email: '',
    rut: '',
    rol: 'Estudiante',
    grupo: 'Cohorte Agosto 2026 - Grupo A',
  });

  // useEffect simulando fetch a Base de Datos
  useEffect(() => {
    const fetchParticipantes = async () => {
      setLoading(true);
      try {
        /////AGREGAR BASE DE DATOS/DOMINIO AQUI///
        // En producción reemplazar esta simulación con:
        // const response = await fetch(PARTICIPANTES_ENDPOINT);
        // const data = await response.json();
        // setParticipantes(data);

        // Datos iniciales de demostración con estándar SENCE
        const mockData = [
          {
            id: 'usr-001',
            nombre: 'Carlos',
            apellido: 'Alvarez Morales',
            email: 'carlos.alvarez@prevyseg.cl',
            rut: '17.432.890-K',
            rol: 'Estudiante',
            grupos: ['Cohorte Agosto 2026 - Grupo A', 'SPD Diurno'],
            ultimoAcceso: 'Hace 8 minutos',
            estado: 'Activo',
            progreso: 85,
          },
          {
            id: 'usr-002',
            nombre: 'Beatriz',
            apellido: 'Bravo Silva',
            email: 'b.bravo.seguridad@gmail.com',
            rut: '18.921.340-2',
            rol: 'Estudiante',
            grupos: ['Cohorte Agosto 2026 - Grupo A'],
            ultimoAcceso: 'Hace 35 minutos',
            estado: 'Activo',
            progreso: 92,
          },
          {
            id: 'usr-003',
            nombre: 'Ashley',
            apellido: 'Adaros Guzmán',
            email: 'ashley.adaros@prevyseg.cl',
            rut: '15.692.858-5',
            rol: 'Profesor / Administrador',
            grupos: ['Coordinación Académica SENCE'],
            ultimoAcceso: 'En línea ahora',
            estado: 'Activo',
            progreso: 100,
          },
          {
            id: 'usr-004',
            nombre: 'Diego',
            apellido: 'Castillo Fuentes',
            email: 'diego.castillo99@hotmail.com',
            rut: '19.450.210-7',
            rol: 'Estudiante',
            grupos: ['Cohorte Agosto 2026 - Grupo B'],
            ultimoAcceso: 'Hace 2 horas',
            estado: 'Activo',
            progreso: 64,
          },
          {
            id: 'usr-005',
            nombre: 'Eduardo',
            apellido: 'Espinoza Riquelme',
            email: 'e.espinoza.arica@gmail.com',
            rut: '16.890.112-3',
            rol: 'Estudiante',
            grupos: ['SPD Marítimo Portuario'],
            ultimoAcceso: 'Ayer a las 18:40',
            estado: 'Activo',
            progreso: 48,
          },
          {
            id: 'usr-006',
            nombre: 'Francisca',
            apellido: 'Flores Valenzuela',
            email: 'fflores.seguridad@prevyseg.cl',
            rut: '20.123.876-1',
            rol: 'Estudiante',
            grupos: ['Cohorte Agosto 2026 - Grupo A'],
            ultimoAcceso: 'Hace 3 días',
            estado: 'Activo',
            progreso: 78,
          },
          {
            id: 'usr-007',
            nombre: 'Gonzalo',
            apellido: 'Gutiérrez Pérez',
            email: 'gonzalo.gutierrez@gmail.com',
            rut: '14.567.890-4',
            rol: 'Estudiante',
            grupos: ['CCTV Operadores SENCE'],
            ultimoAcceso: 'Hace 5 horas',
            estado: 'Activo',
            progreso: 100,
          },
          {
            id: 'usr-008',
            nombre: 'Sebastián',
            apellido: 'Araya Cortés',
            email: 'sebastian.araya@prevyseg.cl',
            rut: '21.778.425-5',
            rol: 'Profesor / Supervisor',
            grupos: ['Comisión Evaluadora SPD'],
            ultimoAcceso: 'En línea ahora',
            estado: 'Activo',
            progreso: 100,
          },
          {
            id: 'usr-009',
            nombre: 'Hugo',
            apellido: 'Hernández Muñoz',
            email: 'hugo.hernandez@outlook.cl',
            rut: '18.112.334-9',
            rol: 'Estudiante',
            grupos: ['Cohorte Agosto 2026 - Grupo B'],
            ultimoAcceso: 'Nunca',
            estado: 'Pendiente',
            progreso: 0,
          },
        ];

        // Simulamos latencia de red
        setTimeout(() => {
          setParticipantes(mockData);
          setLoading(false);
        }, 300);

      } catch (error) {
        console.error("Error al obtener participantes desde la base de datos:", error);
        setLoading(false);
      }
    };

    fetchParticipantes();
  }, []);

  // Alfabeto para filtro A-Z
  const alphabet = ['TODOS', ...'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('')];

  // Filtrado de participantes
  const filteredParticipants = participantes.filter((p) => {
    const fullName = `${p.nombre} ${p.apellido}`.toLowerCase();
    const matchesSearch = 
      fullName.includes(searchQuery.toLowerCase()) ||
      p.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.rut.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesLetter = 
      selectedLetter === 'TODOS' || 
      p.apellido.toUpperCase().startsWith(selectedLetter) ||
      p.nombre.toUpperCase().startsWith(selectedLetter);

    const matchesRole = 
      selectedRole === 'TODOS' || 
      p.rol.toLowerCase().includes(selectedRole.toLowerCase());

    const matchesGroup = 
      selectedGroup === 'TODOS' || 
      p.grupos.some(g => g.toLowerCase().includes(selectedGroup.toLowerCase()));

    return matchesSearch && matchesLetter && matchesRole && matchesGroup;
  });

  // Manejo de selección
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

  // Matricular nuevo usuario
  const handleEnrollSubmit = (e) => {
    e.preventDefault();
    const newUser = {
      id: `usr-${Date.now()}`,
      nombre: newParticipant.nombre,
      apellido: newParticipant.apellido,
      email: newParticipant.email,
      rut: newParticipant.rut,
      rol: newParticipant.rol,
      grupos: [newParticipant.grupo],
      ultimoAcceso: 'Nunca',
      estado: 'Activo',
      progreso: 0,
    };

    /////AGREGAR BASE DE DATOS/DOMINIO AQUI///
    // En producción enviar POST a PARTICIPANTES_ENDPOINT:
    // await fetch(PARTICIPANTES_ENDPOINT, { method: 'POST', body: JSON.stringify(newUser) });

    setParticipantes([newUser, ...participantes]);
    setShowEnrollModal(false);
    setNewParticipant({
      nombre: '',
      apellido: '',
      email: '',
      rut: '',
      rol: 'Estudiante',
      grupo: 'Cohorte Agosto 2026 - Grupo A',
    });
  };

  // Eliminar usuario seleccionado
  const handleDeleteUser = (id) => {
    if (window.confirm("¿Seguro que deseas desmatricular a este participante del curso?")) {
      /////AGREGAR BASE DE DATOS/DOMINIO AQUI///
      setParticipantes(participantes.filter(p => p.id !== id));
    }
  };

  return (
    <div className="space-y-6">
      
      {/* 1. Header y Botones de Acción */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-gray-900/60 p-5 rounded-2xl border border-gray-800 backdrop-blur-md">
        <div>
          <div className="flex items-center gap-2">
            <h2 className="text-xl font-bold text-white tracking-wide">Participantes Matriculados</h2>
            <span className="bg-[#0284c7]/20 text-[#38bdf8] text-xs font-semibold px-2.5 py-0.5 rounded-full border border-sky-500/30">
              {participantes.length} Total
            </span>
            {isEditMode && (
              <span className="bg-amber-500/20 text-amber-300 text-[11px] font-bold px-2 py-0.5 rounded flex items-center gap-1 border border-amber-500/40">
                <Edit3 size={12} /> Modo Edición Activo
              </span>
            )}
          </div>
          <p className="text-xs text-gray-400 mt-1">
            Curso: <strong className="text-gray-200">Formación de Guardias de Seguridad - SPD (Subsecretaría de Prevención del Delito) (SENCE: 123800456)</strong>
          </p>
        </div>

        <div className="flex items-center gap-3 w-full sm:w-auto">
          <button
            onClick={() => setShowEnrollModal(true)}
            className="bg-[#0284c7] hover:bg-[#0369a1] active:scale-95 text-white text-xs font-bold px-4 py-2.5 rounded-lg shadow-lg flex items-center justify-center gap-2 transition-all cursor-pointer flex-1 sm:flex-none"
          >
            <UserPlus size={15} />
            <span>Matricular Usuarios</span>
          </button>
          
          <button
            onClick={() => alert("Exportando lista oficial de asistencia y participantes en formato Excel SENCE...")}
            className="bg-gray-800 hover:bg-gray-700 text-gray-200 text-xs font-semibold px-3.5 py-2.5 rounded-lg border border-gray-700 flex items-center justify-center gap-2 transition-all cursor-pointer"
            title="Exportar a Excel"
          >
            <Download size={15} />
            <span className="hidden md:inline">Exportar</span>
          </button>
        </div>
      </div>

      {/* 2. Barra de Filtros y Búsqueda */}
      <div className="bg-[#121316] p-4 sm:p-5 rounded-2xl border border-gray-800 space-y-4">
        
        <div className="grid grid-cols-1 sm:grid-cols-12 gap-3">
          {/* Buscador */}
          <div className="sm:col-span-6 relative">
            <input
              type="text"
              placeholder="Buscar por nombre, apellido, RUT o correo electrónico..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-[#18191c] border border-gray-700/80 rounded-xl pl-10 pr-4 py-2.5 text-xs sm:text-sm text-white placeholder-gray-500 focus:outline-none focus:border-[#0284c7]"
            />
            <Search size={16} className="absolute left-3.5 top-3 text-gray-400" />
          </div>

          {/* Filtro Rol */}
          <div className="sm:col-span-3">
            <select
              value={selectedRole}
              onChange={(e) => setSelectedRole(e.target.value)}
              className="w-full bg-[#18191c] border border-gray-700/80 rounded-xl px-3 py-2.5 text-xs text-gray-200 focus:outline-none focus:border-[#0284c7]"
            >
              <option value="TODOS">Todos los Roles</option>
              <option value="Estudiante">Estudiantes</option>
              <option value="Profesor">Profesores / Instructores</option>
              <option value="Supervisor">Supervisores SENCE</option>
            </select>
          </div>

          {/* Filtro Grupo */}
          <div className="sm:col-span-3">
            <select
              value={selectedGroup}
              onChange={(e) => setSelectedGroup(e.target.value)}
              className="w-full bg-[#18191c] border border-gray-700/80 rounded-xl px-3 py-2.5 text-xs text-gray-200 focus:outline-none focus:border-[#0284c7]"
            >
              <option value="TODOS">Todos los Grupos</option>
              <option value="Grupo A">Grupo A - Diurno</option>
              <option value="Grupo B">Grupo B - Vespertino</option>
              <option value="Portuario">SPD Portuario</option>
              <option value="CCTV">CCTV SENCE</option>
            </select>
          </div>
        </div>

        {/* Filtro Alfabético A-Z */}
        <div className="pt-2 border-t border-gray-800/80 overflow-x-auto pb-1">
          <div className="flex items-center gap-1 min-w-max text-xs">
            <span className="text-[11px] font-semibold text-gray-400 mr-2 uppercase">Filtrar A-Z:</span>
            {alphabet.map((letter) => (
              <button
                key={letter}
                onClick={() => setSelectedLetter(letter)}
                className={`px-2 py-1 rounded text-xs font-semibold transition-all cursor-pointer ${
                  selectedLetter === letter
                    ? 'bg-[#0284c7] text-white font-bold shadow'
                    : 'text-gray-400 hover:text-white hover:bg-gray-800'
                }`}
              >
                {letter}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* 3. Tabla de Participantes Dinámica */}
      <div className="bg-[#121316] rounded-2xl border border-gray-800 overflow-hidden shadow-xl">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-[#18191c] border-b border-gray-800 text-[11px] font-bold text-gray-400 uppercase tracking-wider">
                <th className="py-3.5 px-4 w-10">
                  <input
                    type="checkbox"
                    checked={selectedUsers.length > 0 && selectedUsers.length === filteredParticipants.length}
                    onChange={toggleSelectAll}
                    className="rounded bg-gray-800 border-gray-700 text-[#0284c7] focus:ring-0 cursor-pointer"
                  />
                </th>
                <th className="py-3.5 px-4">Nombre / Apellido</th>
                <th className="py-3.5 px-4">Dirección de Correo</th>
                <th className="py-3.5 px-4">Roles</th>
                <th className="py-3.5 px-4">Grupos</th>
                <th className="py-3.5 px-4">Último Acceso</th>
                <th className="py-3.5 px-4 text-center">Progreso</th>
                {isEditMode && <th className="py-3.5 px-4 text-right">Acciones</th>}
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-800/60 text-xs">
              {loading ? (
                <tr>
                  <td colSpan={isEditMode ? 8 : 7} className="py-12 text-center text-gray-400">
                    <div className="inline-block w-6 h-6 border-2 border-[#0284c7] border-t-transparent rounded-full animate-spin mb-2"></div>
                    <div>Cargando participantes desde la base de datos...</div>
                  </td>
                </tr>
              ) : filteredParticipants.length > 0 ? (
                filteredParticipants.map((p) => {
                  const isSelected = selectedUsers.includes(p.id);
                  const isOnline = p.ultimoAcceso.includes('ahora') || p.ultimoAcceso.includes('minuto');

                  return (
                    <tr 
                      key={p.id} 
                      className={`hover:bg-gray-800/40 transition-colors ${
                        isSelected ? 'bg-sky-950/20' : ''
                      }`}
                    >
                      {/* Checkbox */}
                      <td className="py-3.5 px-4">
                        <input
                          type="checkbox"
                          checked={isSelected}
                          onChange={() => toggleSelectUser(p.id)}
                          className="rounded bg-gray-800 border-gray-700 text-[#0284c7] focus:ring-0 cursor-pointer"
                        />
                      </td>

                      {/* Nombre y Avatar */}
                      <td className="py-3.5 px-4">
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-[#0284c7] to-[#00c2b2] text-white font-bold flex items-center justify-center text-xs flex-shrink-0 shadow">
                            {p.nombre.charAt(0)}{p.apellido.charAt(0)}
                          </div>
                          <div>
                            <div className="font-bold text-gray-100 hover:text-[#00c2b2] cursor-pointer transition-colors">
                              {p.nombre} {p.apellido}
                            </div>
                            <div className="text-[10px] text-gray-500 font-mono">
                              RUT: {p.rut}
                            </div>
                          </div>
                        </div>
                      </td>

                      {/* Correo */}
                      <td className="py-3.5 px-4 text-gray-300">
                        <a href={`mailto:${p.email}`} className="hover:text-[#38bdf8] flex items-center gap-1.5">
                          <Mail size={12} className="text-gray-500" />
                          <span>{p.email}</span>
                        </a>
                      </td>

                      {/* Roles */}
                      <td className="py-3.5 px-4">
                        <span className={`inline-flex items-center px-2 py-0.5 rounded text-[10px] font-semibold border ${
                          p.rol.includes('Profesor') || p.rol.includes('Administrador')
                            ? 'bg-purple-900/30 text-purple-300 border-purple-700/50'
                            : 'bg-sky-900/30 text-sky-300 border-sky-700/50'
                        }`}>
                          {p.rol}
                        </span>
                      </td>

                      {/* Grupos */}
                      <td className="py-3.5 px-4 text-gray-300">
                        <div className="flex flex-wrap gap-1">
                          {p.grupos.map((g, gIdx) => (
                            <span key={gIdx} className="bg-gray-800 text-gray-300 px-2 py-0.5 rounded text-[10px]">
                              {g}
                            </span>
                          ))}
                        </div>
                      </td>

                      {/* Último Acceso */}
                      <td className="py-3.5 px-4 text-gray-300">
                        <div className="flex items-center gap-1.5">
                          <span className={`w-1.5 h-1.5 rounded-full ${isOnline ? 'bg-emerald-400 animate-pulse' : 'bg-gray-500'}`}></span>
                          <span>{p.ultimoAcceso}</span>
                        </div>
                      </td>

                      {/* Progreso */}
                      <td className="py-3.5 px-4 text-center">
                        <div className="w-full max-w-[80px] mx-auto">
                          <div className="text-[10px] font-bold text-gray-400 mb-1">{p.progreso}%</div>
                          <div className="w-full h-1.5 bg-gray-800 rounded-full overflow-hidden">
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
                          <div className="flex items-center justify-end gap-2">
                            <button
                              onClick={() => alert(`Editando permisos y calificaciones de ${p.nombre} ${p.apellido}`)}
                              className="p-1.5 text-gray-400 hover:text-sky-300 rounded hover:bg-gray-800 cursor-pointer"
                              title="Editar"
                            >
                              <Edit3 size={14} />
                            </button>
                            <button
                              onClick={() => handleDeleteUser(p.id)}
                              className="p-1.5 text-gray-400 hover:text-red-400 rounded hover:bg-gray-800 cursor-pointer"
                              title="Desmatricular"
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
                  <td colSpan={isEditMode ? 8 : 7} className="py-12 text-center text-gray-400">
                    No se encontraron participantes con los filtros seleccionados.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Footer de la Tabla */}
        <div className="bg-[#18191c] px-4 py-3 border-t border-gray-800 flex flex-col sm:flex-row justify-between items-center text-xs text-gray-400 gap-2">
          <div>
            Mostrando <strong className="text-gray-200">{filteredParticipants.length}</strong> de <strong className="text-gray-200">{participantes.length}</strong> participantes
          </div>
          {selectedUsers.length > 0 && (
            <div className="flex items-center gap-3">
              <span className="text-sky-300 font-semibold">{selectedUsers.length} seleccionados</span>
              <button 
                onClick={() => alert("Enviando mensaje masivo a los participantes seleccionados...")}
                className="text-xs text-[#00c2b2] hover:underline cursor-pointer"
              >
                Enviar Mensaje Masivo
              </button>
            </div>
          )}
        </div>
      </div>

      {/* 4. Modal Matricular Nuevo Usuario */}
      {showEnrollModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in">
          <div className="bg-[#18191c] border border-gray-700 w-full max-w-lg rounded-2xl shadow-2xl p-6 relative">
            <h3 className="text-xl font-bold text-white mb-1">Matricular Nuevo Participante</h3>
            <p className="text-xs text-gray-400 mb-6">
              El alumno recibirá sus credenciales de acceso al aula virtual automáticamente.
            </p>

            <form onSubmit={handleEnrollSubmit} className="space-y-4">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-gray-300 mb-1">Nombres *</label>
                  <input
                    type="text"
                    required
                    placeholder="Ej. Juan Andrés"
                    value={newParticipant.nombre}
                    onChange={(e) => setNewParticipant({ ...newParticipant, nombre: e.target.value })}
                    className="w-full bg-[#121315] border border-gray-700 rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-[#0284c7]"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-gray-300 mb-1">Apellidos *</label>
                  <input
                    type="text"
                    required
                    placeholder="Ej. Pérez Gómez"
                    value={newParticipant.apellido}
                    onChange={(e) => setNewParticipant({ ...newParticipant, apellido: e.target.value })}
                    className="w-full bg-[#121315] border border-gray-700 rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-[#0284c7]"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-gray-300 mb-1">RUT *</label>
                  <input
                    type="text"
                    required
                    placeholder="12.345.678-9"
                    value={newParticipant.rut}
                    onChange={(e) => setNewParticipant({ ...newParticipant, rut: e.target.value })}
                    className="w-full bg-[#121315] border border-gray-700 rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-[#0284c7]"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-gray-300 mb-1">Correo Electrónico *</label>
                  <input
                    type="email"
                    required
                    placeholder="juan.perez@correo.cl"
                    value={newParticipant.email}
                    onChange={(e) => setNewParticipant({ ...newParticipant, email: e.target.value })}
                    className="w-full bg-[#121315] border border-gray-700 rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-[#0284c7]"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-gray-300 mb-1">Rol en el Curso</label>
                  <select
                    value={newParticipant.rol}
                    onChange={(e) => setNewParticipant({ ...newParticipant, rol: e.target.value })}
                    className="w-full bg-[#121315] border border-gray-700 rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-[#0284c7]"
                  >
                    <option value="Estudiante">Estudiante</option>
                    <option value="Profesor sin permiso de edición">Profesor sin edición</option>
                    <option value="Profesor">Profesor Titular</option>
                    <option value="Supervisor SENCE">Supervisor SENCE</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-semibold text-gray-300 mb-1">Grupo Asignado</label>
                  <select
                    value={newParticipant.grupo}
                    onChange={(e) => setNewParticipant({ ...newParticipant, grupo: e.target.value })}
                    className="w-full bg-[#121315] border border-gray-700 rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-[#0284c7]"
                  >
                    <option value="Cohorte Agosto 2026 - Grupo A">Grupo A - Diurno</option>
                    <option value="Cohorte Agosto 2026 - Grupo B">Grupo B - Vespertino</option>
                    <option value="SPD Marítimo Portuario">SPD Marítimo Portuario</option>
                    <option value="CCTV Operadores SENCE">CCTV SENCE</option>
                  </select>
                </div>
              </div>

              <div className="pt-4 border-t border-gray-800 flex justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setShowEnrollModal(false)}
                  className="px-4 py-2 text-xs font-semibold text-gray-400 hover:text-white rounded-lg cursor-pointer"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 text-xs font-bold text-white bg-[#0284c7] hover:bg-[#0369a1] rounded-lg shadow cursor-pointer"
                >
                  Confirmar Matrícula
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
};

export default ParticipantsView;
