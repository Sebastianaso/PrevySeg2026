import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  X, 
  Check, 
  Sliders, 
  Calendar, 
  Users, 
  Shield, 
  Wrench, 
  Sparkles, 
  RotateCcw,
  Save,
  Clock,
  CheckCircle2,
  AlertCircle
} from 'lucide-react';
import { getSavedCourses, updateCourseItem, resetCoursesToDefault } from '../data/coursesData';

const CourseManagerModal = ({ isOpen, onClose }) => {
  const [courses, setCourses] = useState([]);
  const [selectedSchool, setSelectedSchool] = useState('seguridad');
  const [editingId, setEditingId] = useState(null);
  const [editForm, setEditForm] = useState({
    disponible: true,
    cupos: 20,
    fecha_inicio: '',
    fecha_termino: ''
  });
  const [toastMessage, setToastMessage] = useState(null);

  useEffect(() => {
    if (isOpen) {
      setCourses(getSavedCourses());
    }
  }, [isOpen]);

  const showToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3000);
  };

  const filteredCourses = courses.filter(c => c.school === selectedSchool);

  const handleStartEdit = (course) => {
    setEditingId(course.id);
    setEditForm({
      disponible: course.disponible,
      cupos: course.cupos,
      fecha_inicio: course.fecha_inicio || '',
      fecha_termino: course.fecha_termino || ''
    });
  };

  const handleSave = (courseId) => {
    const updated = updateCourseItem(courseId, {
      disponible: editForm.disponible,
      cupos: Number(editForm.cupos),
      fecha_inicio: editForm.fecha_inicio.trim(),
      fecha_termino: editForm.fecha_termino.trim()
    });
    if (updated) {
      setCourses(updated);
      setEditingId(null);
      showToast('¡Curso actualizado exitosamente!');
    }
  };

  const handleQuickToggleAvailability = (course) => {
    const newStatus = !course.disponible;
    const updated = updateCourseItem(course.id, { disponible: newStatus });
    if (updated) {
      setCourses(updated);
      showToast(`Estado cambiado a: ${newStatus ? 'Disponible' : 'No Disponible'}`);
    }
  };

  const handleResetAll = () => {
    if (window.confirm('¿Deseas restablecer todos los cursos a sus valores iniciales?')) {
      const def = resetCoursesToDefault();
      if (def) {
        setCourses(def);
        setEditingId(null);
        showToast('Cursos restablecidos a valores de fábrica');
      }
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-md overflow-y-auto">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.95 }}
        className="bg-white rounded-3xl shadow-2xl w-full max-w-4xl max-h-[90vh] flex flex-col overflow-hidden border border-slate-200"
      >
        {/* Top Header */}
        <div className="p-6 bg-gradient-to-r from-[#071626] via-[#0A4DA2] to-[#00A896] text-white flex items-center justify-between">
          <div className="space-y-1">
            <div className="flex items-center gap-2 text-xs font-bold text-[#00FFE0]">
              <Sliders size={15} />
              <span>PANEL ADMINISTRATIVO OTEC PREVYSEG</span>
            </div>
            <h2 className="text-xl sm:text-2xl font-black">
              Gestor de Disponibilidad, Cupos y Fechas
            </h2>
            <p className="text-xs text-white/80">
              Modifica en tiempo real la disponibilidad, cantidad de vacantes y fechas de inicio/término de cada capacitación.
            </p>
          </div>

          <button
            onClick={onClose}
            className="w-9 h-9 rounded-full bg-white/10 hover:bg-white/25 flex items-center justify-center text-white transition-colors cursor-pointer"
          >
            <X size={20} />
          </button>
        </div>

        {/* School Tabs & Action Bar */}
        <div className="p-4 bg-slate-100 border-b border-slate-200 flex flex-wrap items-center justify-between gap-3">
          <div className="inline-flex p-1 bg-white rounded-2xl border border-slate-200 shadow-2xs gap-1">
            <button
              onClick={() => setSelectedSchool('seguridad')}
              className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                selectedSchool === 'seguridad'
                  ? 'bg-[#071626] text-[#00C4D8] shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <Shield size={14} />
              <span>Seguridad Privada ({courses.filter(c => c.school === 'seguridad').length})</span>
            </button>
            <button
              onClick={() => setSelectedSchool('oficios')}
              className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                selectedSchool === 'oficios'
                  ? 'bg-[#071626] text-[#00FFE0] shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <Wrench size={14} />
              <span>Oficios SENCE ({courses.filter(c => c.school === 'oficios').length})</span>
            </button>
          </div>

          <button
            onClick={handleResetAll}
            className="text-xs font-semibold text-slate-500 hover:text-red-600 flex items-center gap-1.5 px-3 py-1.5 rounded-lg hover:bg-red-50 transition-colors cursor-pointer"
            title="Restablecer cupos y fechas originales"
          >
            <RotateCcw size={13} />
            <span>Restablecer Fábrica</span>
          </button>
        </div>

        {/* Toast Notification */}
        {toastMessage && (
          <div className="bg-emerald-600 text-white text-xs font-bold py-2 px-4 text-center flex items-center justify-center gap-2 shadow-xs">
            <CheckCircle2 size={15} />
            <span>{toastMessage}</span>
          </div>
        )}

        {/* Course List */}
        <div className="p-6 overflow-y-auto space-y-4 flex-1 divide-y divide-slate-100">
          {filteredCourses.map((course) => {
            const isEditing = editingId === course.id;

            return (
              <div key={course.id} className="pt-4 first:pt-0">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 p-4 rounded-2xl bg-slate-50 hover:bg-slate-100/80 border border-slate-200 transition-all">
                  
                  {/* Left: Info */}
                  <div className="space-y-1.5 flex-1">
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="text-[10px] font-extrabold uppercase px-2 py-0.5 rounded bg-white text-slate-700 border border-slate-200">
                        {course.category}
                      </span>
                      <span className="text-[11px] font-semibold text-slate-500">
                        {course.duration}
                      </span>
                    </div>

                    <h4 className="text-sm font-bold text-slate-900 leading-snug">
                      {course.title}
                    </h4>

                    {/* Current Badges */}
                    <div className="flex flex-wrap items-center gap-3 pt-1 text-xs">
                      {/* Estado */}
                      <button
                        onClick={() => handleQuickToggleAvailability(course)}
                        className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-black cursor-pointer transition-transform hover:scale-105 ${
                          course.disponible
                            ? 'bg-emerald-100 text-emerald-800 border border-emerald-300'
                            : 'bg-rose-100 text-rose-800 border border-rose-300'
                        }`}
                        title="Haz clic para cambiar disponibilidad"
                      >
                        <span className={`w-2 h-2 rounded-full ${course.disponible ? 'bg-emerald-500 animate-pulse' : 'bg-rose-500'}`} />
                        <span>{course.disponible ? 'DISPONIBLE' : 'NO DISPONIBLE'}</span>
                      </button>

                      {/* Cupos */}
                      <span className="inline-flex items-center gap-1 text-slate-600 font-semibold">
                        <Users size={13} className="text-sky-600" />
                        <span><strong>{course.cupos}</strong> cupos restantes</span>
                      </span>

                      {/* Fechas */}
                      <span className="inline-flex items-center gap-1 text-slate-600 font-medium">
                        <Calendar size={13} className="text-amber-600" />
                        <span>{course.fecha_inicio} al {course.fecha_termino}</span>
                      </span>
                    </div>
                  </div>

                  {/* Right: Actions */}
                  <div className="flex items-center gap-2 flex-shrink-0">
                    <button
                      onClick={() => isEditing ? setEditingId(null) : handleStartEdit(course)}
                      className="px-3.5 py-2 rounded-xl text-xs font-bold bg-white hover:bg-[#071626] hover:text-white border border-slate-300 text-slate-700 shadow-2xs transition-all cursor-pointer"
                    >
                      {isEditing ? 'Cancelar' : 'Modificar'}
                    </button>
                  </div>
                </div>

                {/* Inline Editing Form */}
                <AnimatePresence>
                  {isEditing && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                      className="mt-3 p-5 rounded-2xl bg-blue-50/70 border border-blue-200 space-y-4 overflow-hidden"
                    >
                      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                        
                        {/* 1. Disponibilidad */}
                        <div className="space-y-1">
                          <label className="text-[11px] font-bold text-slate-700 uppercase">
                            Estado de Matrícula:
                          </label>
                          <div className="flex items-center gap-2 pt-1">
                            <button
                              type="button"
                              onClick={() => setEditForm({ ...editForm, disponible: !editForm.disponible })}
                              className={`w-full py-2 px-3 rounded-xl text-xs font-black flex items-center justify-center gap-2 cursor-pointer transition-all ${
                                editForm.disponible
                                  ? 'bg-emerald-600 text-white shadow-xs'
                                  : 'bg-rose-600 text-white shadow-xs'
                              }`}
                            >
                              <Check size={14} />
                              <span>{editForm.disponible ? 'Disponible' : 'No Disponible'}</span>
                            </button>
                          </div>
                        </div>

                        {/* 2. Cupos Restantes */}
                        <div className="space-y-1">
                          <label className="text-[11px] font-bold text-slate-700 uppercase">
                            Cupos Restantes:
                          </label>
                          <input
                            type="number"
                            min="0"
                            max="200"
                            value={editForm.cupos}
                            onChange={(e) => setEditForm({ ...editForm, cupos: e.target.value })}
                            className="w-full px-3 py-2 rounded-xl bg-white border border-slate-300 text-slate-900 text-xs font-bold focus:ring-2 focus:ring-[#0A4DA2] focus:outline-none"
                            placeholder="Ej: 15"
                          />
                        </div>

                        {/* 3. Fecha Inicio */}
                        <div className="space-y-1">
                          <label className="text-[11px] font-bold text-slate-700 uppercase">
                            Fecha de Inicio:
                          </label>
                          <input
                            type="text"
                            value={editForm.fecha_inicio}
                            onChange={(e) => setEditForm({ ...editForm, fecha_inicio: e.target.value })}
                            className="w-full px-3 py-2 rounded-xl bg-white border border-slate-300 text-slate-900 text-xs font-semibold focus:ring-2 focus:ring-[#0A4DA2] focus:outline-none"
                            placeholder="Ej: 15 de Octubre, 2026"
                          />
                        </div>

                        {/* 4. Fecha Término */}
                        <div className="space-y-1">
                          <label className="text-[11px] font-bold text-slate-700 uppercase">
                            Fecha de Término:
                          </label>
                          <input
                            type="text"
                            value={editForm.fecha_termino}
                            onChange={(e) => setEditForm({ ...editForm, fecha_termino: e.target.value })}
                            className="w-full px-3 py-2 rounded-xl bg-white border border-slate-300 text-slate-900 text-xs font-semibold focus:ring-2 focus:ring-[#0A4DA2] focus:outline-none"
                            placeholder="Ej: 20 de Noviembre, 2026"
                          />
                        </div>
                      </div>

                      <div className="flex justify-end gap-2 pt-2 border-t border-blue-200">
                        <button
                          type="button"
                          onClick={() => setEditingId(null)}
                          className="px-4 py-2 rounded-xl text-xs font-bold text-slate-600 hover:bg-slate-200 transition-colors cursor-pointer"
                        >
                          Cancelar
                        </button>
                        <button
                          type="button"
                          onClick={() => handleSave(course.id)}
                          className="px-5 py-2 rounded-xl text-xs font-black bg-[#0A4DA2] hover:bg-[#073570] text-white shadow-md flex items-center gap-1.5 cursor-pointer transition-all"
                        >
                          <Save size={14} />
                          <span>Guardar Cambios</span>
                        </button>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>

        {/* Bottom Footer */}
        <div className="p-4 bg-slate-50 border-t border-slate-200 flex items-center justify-between text-xs text-slate-500">
          <div className="flex items-center gap-1.5">
            <Sparkles size={14} className="text-[#00A896]" />
            <span>Los cambios se reflejan inmediatamente en las tarjetas de cursos y en la ficha de inscripción.</span>
          </div>
          <button
            onClick={onClose}
            className="px-5 py-2 rounded-xl bg-[#071626] text-white font-bold hover:bg-[#0B2032] transition-colors cursor-pointer"
          >
            Cerrar Gestor
          </button>
        </div>
      </motion.div>
    </div>
  );
};

export default CourseManagerModal;
