import React, { useState } from 'react';
import { 
  HelpCircle, 
  Search, 
  Filter, 
  Plus, 
  UploadCloud, 
  FileText, 
  CheckCircle, 
  MoreVertical, 
  Edit3, 
  Trash2, 
  Copy, 
  Eye, 
  Layers,
  ChevronDown
} from 'lucide-react';

const QuestionBankView = () => {
  const [matchCondition, setMatchCondition] = useState('any'); // "any" o "all"
  const [selectedCategory, setSelectedCategory] = useState('todas');
  const [selectedType, setSelectedType] = useState('todas');
  const [searchFilter, setSearchFilter] = useState('');
  const [isDragOver, setIsDragOver] = useState(false);
  const [uploadedFiles, setUploadedFiles] = useState([]);
  const [showCreateModal, setShowCreateModal] = useState(false);

  // Preguntas de demostración para seguridad SPD (Subsecretaría de Prevención del Delito)
  const questions = [
    {
      id: 'q-01',
      title: 'Marco legal: Facultades del Guardia de Seguridad Privada',
      category: 'Legislación SPD (Subsecretaría de Prevención del Delito)',
      type: 'Opción múltiple',
      points: 2,
      lastModified: '25 Agosto, 2026',
      author: 'Ashley Adaros',
    },
    {
      id: 'q-02',
      title: 'Uso legítimo de la fuerza y legítima defensa en recintos privados',
      category: 'Legislación SPD (Subsecretaría de Prevención del Delito)',
      type: 'Verdadero / Falso',
      points: 1,
      lastModified: '22 Agosto, 2026',
      author: 'Sebastián Araya',
    },
    {
      id: 'q-03',
      title: 'Protocolo de actuación ante detección de intrusión perimetral en CCTV',
      category: 'Tecnología CCTV',
      type: 'Desarrollo / Ensayo',
      points: 5,
      lastModified: '18 Agosto, 2026',
      author: 'Ashley Adaros',
    },
    {
      id: 'q-04',
      title: 'Cadena de custodia y preservación del sitio del suceso',
      category: 'Criminalística Básica',
      type: 'Opción múltiple',
      points: 3,
      lastModified: '12 Agosto, 2026',
      author: 'Sebastián Araya',
    },
    {
      id: 'q-05',
      title: 'Protocolo RCP y maniobra de Heimlich en emergencias',
      category: 'Primeros Auxilios',
      type: 'Emparejamiento',
      points: 4,
      lastModified: '10 Agosto, 2026',
      author: 'Ashley Adaros',
    },
  ];

  const filteredQuestions = questions.filter((q) => {
    const matchesSearch = q.title.toLowerCase().includes(searchFilter.toLowerCase()) || q.category.toLowerCase().includes(searchFilter.toLowerCase());
    const matchesCategory = selectedCategory === 'todas' || q.category === selectedCategory;
    const matchesType = selectedType === 'todas' || q.type === selectedType;

    if (matchCondition === 'all') {
      return matchesSearch && matchesCategory && matchesType;
    } else {
      return matchesSearch || matchesCategory || matchesType;
    }
  });

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragOver(false);
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      const fileName = e.dataTransfer.files[0].name;
      setUploadedFiles([...uploadedFiles, fileName]);
      alert(`Archivo "${fileName}" cargado al Banco de Preguntas / Contenido SCORM.`);
    }
  };

  return (
    <div className="space-y-8">
      
      {/* 1. Header */}
      <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h2 className="text-xl font-black text-slate-900 tracking-tight">Banco de Preguntas y Reactivos SENCE</h2>
          <p className="text-xs text-slate-600 mt-1">
            Crea, importa y organiza reactivos para exámenes oficiales de certificación SPD (Subsecretaría de Prevención del Delito).
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={() => setShowCreateModal(true)}
            className="bg-sky-600 hover:bg-sky-700 active:scale-95 text-white text-xs font-bold px-4 py-2.5 rounded-xl shadow-sm flex items-center gap-2 transition-all cursor-pointer"
          >
            <Plus size={15} />
            <span>Crear Nueva Pregunta</span>
          </button>
        </div>
      </div>

      {/* 2. Advanced Search & Conditional Filters */}
      <div className="bg-white rounded-2xl border border-slate-200 p-6 space-y-6 shadow-sm">
        <h3 className="text-xs font-black text-slate-700 uppercase tracking-wider flex items-center gap-2">
          <Filter size={15} className="text-teal-600" />
          <span>Filtros Avanzados de Reactivos</span>
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-12 gap-4">
          
          {/* Match Condition Selector ("Coincidir Cualquiera" / "Todas") */}
          <div className="sm:col-span-3">
            <label className="block text-[11px] font-bold text-slate-600 mb-1.5 uppercase">
              Criterio de Coincidencia
            </label>
            <select
              value={matchCondition}
              onChange={(e) => setMatchCondition(e.target.value)}
              className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3 py-2.5 text-xs text-slate-900 focus:bg-white focus:outline-none focus:border-sky-500 font-medium"
            >
              <option value="any">Coincidir Cualquiera (OR)</option>
              <option value="all">Coincidir Todas las Condiciones (AND)</option>
            </select>
          </div>

          {/* Categoría Selector */}
          <div className="sm:col-span-3">
            <label className="block text-[11px] font-bold text-slate-600 mb-1.5 uppercase">
              Categoría
            </label>
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3 py-2.5 text-xs text-slate-900 focus:bg-white focus:outline-none focus:border-sky-500 font-medium"
            >
              <option value="todas">Todas las categorías</option>
              <option value="Legislación SPD (Subsecretaría de Prevención del Delito)">Legislación SPD (Subsecretaría de Prevención del Delito)</option>
              <option value="Tecnología CCTV">Tecnología CCTV</option>
              <option value="Criminalística Básica">Criminalística Básica</option>
              <option value="Primeros Auxilios">Primeros Auxilios</option>
            </select>
          </div>

          {/* Tipo de Pregunta */}
          <div className="sm:col-span-3">
            <label className="block text-[11px] font-bold text-slate-600 mb-1.5 uppercase">
              Tipo de Reactivo
            </label>
            <select
              value={selectedType}
              onChange={(e) => setSelectedType(e.target.value)}
              className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3 py-2.5 text-xs text-slate-900 focus:bg-white focus:outline-none focus:border-sky-500 font-medium"
            >
              <option value="todas">Todos los tipos</option>
              <option value="Opción múltiple">Opción múltiple</option>
              <option value="Verdadero / Falso">Verdadero / Falso</option>
              <option value="Desarrollo / Ensayo">Desarrollo / Ensayo</option>
              <option value="Emparejamiento">Emparejamiento</option>
            </select>
          </div>

          {/* Buscador de texto */}
          <div className="sm:col-span-3">
            <label className="block text-[11px] font-bold text-slate-600 mb-1.5 uppercase">
              Buscar en enunciado
            </label>
            <div className="relative">
              <input
                type="text"
                placeholder="Ej. fuerza, perimetral..."
                value={searchFilter}
                onChange={(e) => setSearchFilter(e.target.value)}
                className="w-full bg-slate-50 border border-slate-300 rounded-xl pl-8 pr-3 py-2.5 text-xs text-slate-900 placeholder-slate-400 focus:bg-white focus:outline-none focus:border-sky-500 font-medium"
              />
              <Search size={14} className="absolute left-2.5 top-3 text-slate-400" />
            </div>
          </div>

        </div>

        {/* Filter Action Buttons */}
        <div className="flex items-center justify-between pt-3 border-t border-slate-200">
          <div className="text-xs text-slate-600">
            Mostrando <strong className="text-slate-900 font-bold">{filteredQuestions.length}</strong> preguntas disponibles
          </div>

          <div className="flex gap-2">
            <button
              onClick={() => {
                setMatchCondition('any');
                setSelectedCategory('todas');
                setSelectedType('todas');
                setSearchFilter('');
              }}
              className="px-3.5 py-1.5 rounded-lg border border-slate-300 text-xs font-semibold text-slate-700 hover:bg-slate-100 cursor-pointer transition-colors"
            >
              Limpiar Filtros
            </button>
            <button
              onClick={() => alert("Filtros aplicados correctamente.")}
              className="px-4 py-1.5 rounded-lg bg-sky-600 hover:bg-sky-700 text-xs font-bold text-white shadow-sm cursor-pointer transition-colors"
            >
              Aplicar Filtros
            </button>
          </div>
        </div>
      </div>

      {/* 3. Questions Table */}
      <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse text-xs">
            <thead>
              <tr className="bg-slate-100/80 border-b border-slate-200 text-[11px] font-bold text-slate-700 uppercase tracking-wider">
                <th className="py-3.5 px-4">Pregunta / Enunciado</th>
                <th className="py-3.5 px-4">Categoría</th>
                <th className="py-3.5 px-4">Tipo</th>
                <th className="py-3.5 px-4 text-center">Puntaje</th>
                <th className="py-3.5 px-4">Modificado</th>
                <th className="py-3.5 px-4 text-right">Acciones</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filteredQuestions.map((q) => (
                <tr key={q.id} className="hover:bg-slate-50 transition-colors">
                  <td className="py-3.5 px-4 font-bold text-slate-900 max-w-sm">
                    <div className="flex items-center gap-2">
                      <HelpCircle size={15} className="text-sky-600 flex-shrink-0" />
                      <span className="hover:text-sky-700 cursor-pointer">{q.title}</span>
                    </div>
                  </td>
                  <td className="py-3.5 px-4 text-slate-700">
                    <span className="bg-slate-100 border border-slate-200 px-2 py-0.5 rounded text-[10px] text-slate-700 font-medium">
                      {q.category}
                    </span>
                  </td>
                  <td className="py-3.5 px-4 text-slate-700 font-medium">
                    {q.type}
                  </td>
                  <td className="py-3.5 px-4 text-center font-mono font-bold text-teal-700">
                    {q.points} pts
                  </td>
                  <td className="py-3.5 px-4 text-slate-600 text-[11px]">
                    <div className="font-medium text-slate-800">{q.lastModified}</div>
                    <div className="text-slate-400 font-mono text-[10px]">Por: {q.author}</div>
                  </td>
                  <td className="py-3.5 px-4 text-right">
                    <div className="flex items-center justify-end gap-2 text-slate-500">
                      <button className="p-1 hover:text-sky-700 rounded cursor-pointer transition-colors" title="Vista Previa">
                        <Eye size={14} />
                      </button>
                      <button className="p-1 hover:text-amber-600 rounded cursor-pointer transition-colors" title="Editar">
                        <Edit3 size={14} />
                      </button>
                      <button className="p-1 hover:text-teal-600 rounded cursor-pointer transition-colors" title="Duplicar">
                        <Copy size={14} />
                      </button>
                      <button className="p-1 hover:text-rose-600 rounded cursor-pointer transition-colors" title="Eliminar">
                        <Trash2 size={14} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* 4. Drag & Drop File Upload Box (SCORM, AIKEN, XML) */}
      <div className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 space-y-4 shadow-sm">
        <h3 className="text-sm font-black text-slate-900 tracking-tight flex items-center gap-2">
          <UploadCloud size={18} className="text-sky-600" />
          <span>Importar Banco de Preguntas y Contenido Multimedia (SCORM / Aiken / XML)</span>
        </h3>
        <p className="text-xs text-slate-600">
          Arrastra y suelta aquí archivos en formato Aiken (.txt), Moodle XML o paquetes interactivos SCORM 1.2 / 2004 para importar reactivos masivamente.
        </p>

        {/* Dropzone */}
        <div
          onDragOver={(e) => { e.preventDefault(); setIsDragOver(true); }}
          onDragLeave={() => setIsDragOver(false)}
          onDrop={handleDrop}
          className={`border-2 border-dashed rounded-2xl p-8 text-center transition-all cursor-pointer ${
            isDragOver 
              ? 'border-teal-500 bg-teal-50 scale-[1.01]' 
              : 'border-slate-300 bg-slate-50 hover:bg-sky-50/40 hover:border-sky-400'
          }`}
          onClick={() => {
            const input = document.createElement('input');
            input.type = 'file';
            input.onchange = (e) => {
              if (e.target.files[0]) {
                setUploadedFiles([...uploadedFiles, e.target.files[0].name]);
                alert(`Archivo "${e.target.files[0].name}" cargado exitosamente.`);
              }
            };
            input.click();
          }}
        >
          <div className="w-12 h-12 rounded-full bg-sky-100 text-sky-700 flex items-center justify-center mx-auto mb-3 border border-sky-200 shadow-xs">
            <UploadCloud size={24} />
          </div>
          <p className="text-xs sm:text-sm font-bold text-slate-800">
            Arrastra tus archivos aquí o <span className="text-sky-600 underline">haz clic para examinar</span>
          </p>
          <p className="text-[11px] text-slate-500 mt-1">
            Formatos compatibles: .xml, .txt (Aiken), .zip (SCORM / H5P) hasta 64MB
          </p>
        </div>

        {uploadedFiles.length > 0 && (
          <div className="space-y-2 pt-2">
            <span className="text-[11px] font-bold text-slate-600 uppercase">Archivos Cargados Recientemente:</span>
            {uploadedFiles.map((file, idx) => (
              <div key={idx} className="p-2.5 rounded-lg bg-slate-50 border border-slate-200 flex items-center justify-between text-xs text-slate-700">
                <span className="flex items-center gap-2 font-medium">
                  <FileText size={14} className="text-teal-600" />
                  {file}
                </span>
                <span className="text-[10px] text-emerald-700 font-bold flex items-center gap-1 bg-emerald-50 border border-emerald-200 px-2 py-0.5 rounded-full">
                  <CheckCircle size={12} /> Listo para procesar
                </span>
              </div>
            ))}
          </div>
        )}
      </div>

    </div>
  );
};

export default QuestionBankView;
