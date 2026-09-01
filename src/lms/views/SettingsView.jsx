import React, { useState } from 'react';
import { 
  Save, 
  RotateCcw, 
  Bold, 
  Italic, 
  Underline, 
  List, 
  ListOrdered, 
  Link as LinkIcon, 
  Image as ImageIcon, 
  Code, 
  AlignLeft, 
  AlignCenter, 
  AlignRight, 
  ChevronDown, 
  ChevronRight,
  HelpCircle,
  CheckCircle2
} from 'lucide-react';

const SettingsView = () => {
  const [formData, setFormData] = useState({
    nombreCompleto: 'Curso de Formación de Guardias de Seguridad - OS10',
    nombreCorto: 'OS10-2026-AR-G1',
    categoria: 'Seguridad Privada / Cursos OS-10',
    visibilidad: 'Mostrar',
    fechaInicio: '2026-08-01',
    fechaFin: '2026-09-30',
    idSence: '123800456',
    codigoOtec: 'REG-2026-AR-091',
    formatoCurso: 'Temas por Unidades Didácticas',
    numeroSecciones: '6',
    limiteSubida: '64MB',
    resumen: 'Programa oficial de formación integral para guardias de seguridad acreditado por el Departamento OS-10 de Carabineros de Chile y codificado por SENCE. Incluye módulos de Legislación en Seguridad Privada, Prevención de Riesgos, Primeros Auxilios, Manejo de Crisis y Defensa Personal.',
  });

  const [savedSuccess, setSavedSuccess] = useState(false);
  const [openSections, setOpenSections] = useState({
    general: true,
    descripcion: true,
    formato: false,
    archivos: false,
  });

  const toggleSection = (section) => {
    setOpenSections({
      ...openSections,
      [section]: !openSections[section],
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 3000);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-gray-900/60 p-5 rounded-2xl border border-gray-800 backdrop-blur-md">
        <div>
          <h2 className="text-xl font-bold text-white tracking-wide">Editar la Configuración del Curso</h2>
          <p className="text-xs text-gray-400 mt-1">
            Ajustes generales, fechas de impartición, formato pedagógico y parámetros SENCE.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            type="submit"
            className="bg-[#0284c7] hover:bg-[#0369a1] active:scale-95 text-white text-xs font-bold px-5 py-2.5 rounded-lg shadow-lg flex items-center gap-2 transition-all cursor-pointer"
          >
            <Save size={15} />
            <span>Guardar Cambios y Mostrar</span>
          </button>
        </div>
      </div>

      {savedSuccess && (
        <div className="p-4 bg-emerald-950/70 border border-emerald-500/50 rounded-xl text-emerald-300 text-xs flex items-center gap-3 animate-in fade-in">
          <CheckCircle2 size={18} className="text-emerald-400" />
          <span>Configuración del curso guardada con éxito en los registros de la plataforma.</span>
        </div>
      )}

      {/* 1. SECCIÓN GENERAL */}
      <div className="bg-[#121316] rounded-2xl border border-gray-800 overflow-hidden shadow-xl">
        <button
          type="button"
          onClick={() => toggleSection('general')}
          className="w-full flex items-center justify-between p-4 sm:p-5 bg-[#18191c] hover:bg-gray-800/60 transition-colors text-left cursor-pointer border-b border-gray-800/80"
        >
          <div className="flex items-center gap-2 font-bold text-sm text-white">
            {openSections.general ? <ChevronDown size={18} className="text-[#00c2b2]" /> : <ChevronRight size={18} />}
            <span>General</span>
          </div>
          <span className="text-[11px] text-gray-500">Parámetros principales del curso</span>
        </button>

        {openSections.general && (
          <div className="p-6 sm:p-8 space-y-6 divide-y divide-gray-800/60">
            
            {/* Campo: Nombre Completo */}
            <div className="grid grid-cols-1 md:grid-cols-12 gap-4 items-center">
              <label className="md:col-span-4 text-xs font-bold text-gray-300 flex items-center gap-1.5">
                <span>Nombre completo del curso</span>
                <span className="text-red-400">*</span>
                <HelpCircle size={13} className="text-gray-500 hover:text-gray-300 cursor-pointer" title="Nombre oficial que aparecerá en diplomas y plataforma." />
              </label>
              <div className="md:col-span-8">
                <input
                  type="text"
                  required
                  value={formData.nombreCompleto}
                  onChange={(e) => setFormData({ ...formData, nombreCompleto: e.target.value })}
                  className="w-full bg-[#18191c] border border-gray-700/80 rounded-xl px-4 py-2.5 text-xs sm:text-sm text-white focus:outline-none focus:border-[#0284c7]"
                />
              </div>
            </div>

            {/* Campo: Nombre Corto */}
            <div className="grid grid-cols-1 md:grid-cols-12 gap-4 items-center pt-5">
              <label className="md:col-span-4 text-xs font-bold text-gray-300 flex items-center gap-1.5">
                <span>Nombre corto del curso</span>
                <span className="text-red-400">*</span>
              </label>
              <div className="md:col-span-8">
                <input
                  type="text"
                  required
                  value={formData.nombreCorto}
                  onChange={(e) => setFormData({ ...formData, nombreCorto: e.target.value })}
                  className="w-full bg-[#18191c] border border-gray-700/80 rounded-xl px-4 py-2.5 text-xs sm:text-sm text-white focus:outline-none focus:border-[#0284c7]"
                />
              </div>
            </div>

            {/* Campo: Categoría */}
            <div className="grid grid-cols-1 md:grid-cols-12 gap-4 items-center pt-5">
              <label className="md:col-span-4 text-xs font-bold text-gray-300">
                Categoría de cursos
              </label>
              <div className="md:col-span-8">
                <select
                  value={formData.categoria}
                  onChange={(e) => setFormData({ ...formData, categoria: e.target.value })}
                  className="w-full bg-[#18191c] border border-gray-700/80 rounded-xl px-4 py-2.5 text-xs sm:text-sm text-gray-200 focus:outline-none focus:border-[#0284c7]"
                >
                  <option value="Seguridad Privada / Cursos OS-10">Seguridad Privada / Cursos OS-10</option>
                  <option value="Perfeccionamiento de Guardias">Perfeccionamiento de Guardias</option>
                  <option value="Tecnología CCTV y Alarmas">Tecnología CCTV y Alarmas</option>
                  <option value="Seguridad Marítimo Portuaria">Seguridad Marítimo Portuaria</option>
                </select>
              </div>
            </div>

            {/* Campo: Visibilidad */}
            <div className="grid grid-cols-1 md:grid-cols-12 gap-4 items-center pt-5">
              <label className="md:col-span-4 text-xs font-bold text-gray-300">
                Visibilidad del curso
              </label>
              <div className="md:col-span-8">
                <select
                  value={formData.visibilidad}
                  onChange={(e) => setFormData({ ...formData, visibilidad: e.target.value })}
                  className="w-full bg-[#18191c] border border-gray-700/80 rounded-xl px-4 py-2.5 text-xs sm:text-sm text-gray-200 focus:outline-none focus:border-[#0284c7]"
                >
                  <option value="Mostrar">Mostrar (Visible para alumnos matriculados)</option>
                  <option value="Ocultar">Ocultar (Modo borrador en edición)</option>
                </select>
              </div>
            </div>

            {/* Fechas de inicio y fin */}
            <div className="grid grid-cols-1 md:grid-cols-12 gap-4 items-center pt-5">
              <label className="md:col-span-4 text-xs font-bold text-gray-300">
                Fechas de impartición
              </label>
              <div className="md:col-span-8 grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <span className="text-[10px] text-gray-500 block mb-1">Fecha de Inicio:</span>
                  <input
                    type="date"
                    value={formData.fechaInicio}
                    onChange={(e) => setFormData({ ...formData, fechaInicio: e.target.value })}
                    className="w-full bg-[#18191c] border border-gray-700/80 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-[#0284c7]"
                  />
                </div>
                <div>
                  <span className="text-[10px] text-gray-500 block mb-1">Fecha de Finalización:</span>
                  <input
                    type="date"
                    value={formData.fechaFin}
                    onChange={(e) => setFormData({ ...formData, fechaFin: e.target.value })}
                    className="w-full bg-[#18191c] border border-gray-700/80 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-[#0284c7]"
                  />
                </div>
              </div>
            </div>

            {/* Identificador SENCE */}
            <div className="grid grid-cols-1 md:grid-cols-12 gap-4 items-center pt-5">
              <label className="md:col-span-4 text-xs font-bold text-gray-300">
                Código SENCE y Registro OTEC
              </label>
              <div className="md:col-span-8 grid grid-cols-1 sm:grid-cols-2 gap-3">
                <input
                  type="text"
                  placeholder="Código SENCE (ej. 123800456)"
                  value={formData.idSence}
                  onChange={(e) => setFormData({ ...formData, idSence: e.target.value })}
                  className="w-full bg-[#18191c] border border-gray-700/80 rounded-xl px-3.5 py-2 text-xs text-white font-mono focus:outline-none focus:border-[#0284c7]"
                />
                <input
                  type="text"
                  placeholder="Registro OTEC"
                  value={formData.codigoOtec}
                  onChange={(e) => setFormData({ ...formData, codigoOtec: e.target.value })}
                  className="w-full bg-[#18191c] border border-gray-700/80 rounded-xl px-3.5 py-2 text-xs text-white font-mono focus:outline-none focus:border-[#0284c7]"
                />
              </div>
            </div>

          </div>
        )}
      </div>

      {/* 2. SECCIÓN DESCRIPCIÓN CON SIMULADOR TINYMCE */}
      <div className="bg-[#121316] rounded-2xl border border-gray-800 overflow-hidden shadow-xl">
        <button
          type="button"
          onClick={() => toggleSection('descripcion')}
          className="w-full flex items-center justify-between p-4 sm:p-5 bg-[#18191c] hover:bg-gray-800/60 transition-colors text-left cursor-pointer border-b border-gray-800/80"
        >
          <div className="flex items-center gap-2 font-bold text-sm text-white">
            {openSections.descripcion ? <ChevronDown size={18} className="text-[#00c2b2]" /> : <ChevronRight size={18} />}
            <span>Descripción del Curso (Editor TinyMCE)</span>
          </div>
          <span className="text-[11px] text-gray-500">Resumen y objetivos formativos</span>
        </button>

        {openSections.descripcion && (
          <div className="p-6 sm:p-8 space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-12 gap-4 items-start">
              <label className="md:col-span-3 text-xs font-bold text-gray-300 pt-2">
                Resumen del curso
              </label>
              
              {/* Simulador TinyMCE */}
              <div className="md:col-span-9 bg-[#18191c] border border-gray-700 rounded-xl overflow-hidden shadow-inner">
                {/* TinyMCE Toolbar */}
                <div className="bg-[#202227] px-3 py-2 border-b border-gray-700/80 flex flex-wrap items-center gap-1 text-gray-300 text-xs select-none">
                  <select className="bg-gray-800 border border-gray-700 rounded px-2 py-1 text-[11px] text-gray-200">
                    <option>Párrafo</option>
                    <option>Encabezado 1</option>
                    <option>Encabezado 2</option>
                    <option>Encabezado 3</option>
                  </select>

                  <div className="h-4 w-px bg-gray-700 mx-1"></div>

                  <button type="button" className="p-1 hover:bg-gray-700 rounded text-gray-300 hover:text-white" title="Negrita">
                    <Bold size={14} />
                  </button>
                  <button type="button" className="p-1 hover:bg-gray-700 rounded text-gray-300 hover:text-white" title="Cursiva">
                    <Italic size={14} />
                  </button>
                  <button type="button" className="p-1 hover:bg-gray-700 rounded text-gray-300 hover:text-white" title="Subrayado">
                    <Underline size={14} />
                  </button>

                  <div className="h-4 w-px bg-gray-700 mx-1"></div>

                  <button type="button" className="p-1 hover:bg-gray-700 rounded text-gray-300 hover:text-white" title="Lista con viñetas">
                    <List size={14} />
                  </button>
                  <button type="button" className="p-1 hover:bg-gray-700 rounded text-gray-300 hover:text-white" title="Lista numerada">
                    <ListOrdered size={14} />
                  </button>

                  <div className="h-4 w-px bg-gray-700 mx-1"></div>

                  <button type="button" className="p-1 hover:bg-gray-700 rounded text-gray-300 hover:text-white" title="Alinear a la izquierda">
                    <AlignLeft size={14} />
                  </button>
                  <button type="button" className="p-1 hover:bg-gray-700 rounded text-gray-300 hover:text-white" title="Centrar">
                    <AlignCenter size={14} />
                  </button>
                  <button type="button" className="p-1 hover:bg-gray-700 rounded text-gray-300 hover:text-white" title="Alinear a la derecha">
                    <AlignRight size={14} />
                  </button>

                  <div className="h-4 w-px bg-gray-700 mx-1"></div>

                  <button type="button" className="p-1 hover:bg-gray-700 rounded text-gray-300 hover:text-white" title="Insertar enlace">
                    <LinkIcon size={14} />
                  </button>
                  <button type="button" className="p-1 hover:bg-gray-700 rounded text-gray-300 hover:text-white" title="Insertar imagen">
                    <ImageIcon size={14} />
                  </button>
                  <button type="button" className="p-1 hover:bg-gray-700 rounded text-gray-300 hover:text-white" title="Código fuente HTML">
                    <Code size={14} />
                  </button>
                </div>

                {/* TinyMCE Textarea Area */}
                <textarea
                  rows="6"
                  value={formData.resumen}
                  onChange={(e) => setFormData({ ...formData, resumen: e.target.value })}
                  className="w-full bg-[#18191c] p-4 text-xs sm:text-sm text-gray-200 focus:outline-none resize-y leading-relaxed font-sans"
                ></textarea>

                {/* TinyMCE Status bar */}
                <div className="bg-[#202227] px-3 py-1 text-[10px] text-gray-500 border-t border-gray-800 flex justify-between">
                  <span>TinyMCE 6.8 (Integración SENCE LMS)</span>
                  <span>{formData.resumen.split(' ').length} palabras</span>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* 3. FORMATO Y ARCHIVOS */}
      <div className="bg-[#121316] rounded-2xl border border-gray-800 overflow-hidden shadow-xl">
        <button
          type="button"
          onClick={() => toggleSection('formato')}
          className="w-full flex items-center justify-between p-4 sm:p-5 bg-[#18191c] hover:bg-gray-800/60 transition-colors text-left cursor-pointer border-b border-gray-800/80"
        >
          <div className="flex items-center gap-2 font-bold text-sm text-white">
            {openSections.formato ? <ChevronDown size={18} className="text-[#00c2b2]" /> : <ChevronRight size={18} />}
            <span>Formato de Curso y Subida de Archivos</span>
          </div>
          <span className="text-[11px] text-gray-500">Estructura de módulos y cuotas</span>
        </button>

        {openSections.formato && (
          <div className="p-6 sm:p-8 space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-12 gap-4 items-center">
              <label className="md:col-span-4 text-xs font-bold text-gray-300">
                Formato del aula virtual
              </label>
              <div className="md:col-span-8">
                <select
                  value={formData.formatoCurso}
                  onChange={(e) => setFormData({ ...formData, formatoCurso: e.target.value })}
                  className="w-full bg-[#18191c] border border-gray-700/80 rounded-xl px-4 py-2.5 text-xs text-gray-200 focus:outline-none focus:border-[#0284c7]"
                >
                  <option value="Temas por Unidades Didácticas">Formato por Temas (Módulos SENCE)</option>
                  <option value="Formato Semanal">Formato Semanal</option>
                  <option value="Formato de Actividad Única">Actividad Única (Taller Express)</option>
                </select>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-12 gap-4 items-center">
              <label className="md:col-span-4 text-xs font-bold text-gray-300">
                Límite máximo de subida
              </label>
              <div className="md:col-span-8">
                <select
                  value={formData.limiteSubida}
                  onChange={(e) => setFormData({ ...formData, limiteSubida: e.target.value })}
                  className="w-full bg-[#18191c] border border-gray-700/80 rounded-xl px-4 py-2.5 text-xs text-gray-200 focus:outline-none focus:border-[#0284c7]"
                >
                  <option value="16MB">16 MB</option>
                  <option value="32MB">32 MB</option>
                  <option value="64MB">64 MB (Recomendado para tareas y videos)</option>
                  <option value="128MB">128 MB</option>
                </select>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Action Footer Buttons */}
      <div className="flex flex-wrap items-center justify-end gap-3 pt-4">
        <button
          type="button"
          onClick={() => alert("Cambios descartados")}
          className="px-5 py-2.5 rounded-lg border border-gray-700 text-gray-300 hover:bg-gray-800 text-xs font-semibold cursor-pointer"
        >
          Cancelar
        </button>
        <button
          type="submit"
          className="px-6 py-2.5 rounded-lg bg-[#0284c7] hover:bg-[#0369a1] active:scale-95 text-white text-xs font-bold shadow-lg transition-all cursor-pointer"
        >
          Guardar Cambios y Volver
        </button>
      </div>

    </form>
  );
};

export default SettingsView;
