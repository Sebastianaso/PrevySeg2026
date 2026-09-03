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
      <div className="bg-gray-900/60 p-5 rounded-2xl border border-gray-800 backdrop-blur-md flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h2 className="text-xl font-bold text-white tracking-wide">Banco de Preguntas y Reactivos SENCE</h2>
          <p className="text-xs text-gray-400 mt-1">
            Crea, importa y organiza reactivos para exámenes oficiales de certificación SPD (Subsecretaría de Prevención del Delito).
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={() => setShowCreateModal(true)}
            className="bg-[#0284c7] hover:bg-[#0369a1] active:scale-95 text-white text-xs font-bold px-4 py-2.5 rounded-lg shadow-lg flex items-center gap-2 transition-all cursor-pointer"
          >
            <Plus size={15} />
            <span>Crear Nueva Pregunta</span>
          </button>
        </div>
      </div>

      {/* 2. Advanced Search & Conditional Filters */}
      <div className="bg-[#121316] rounded-2xl border border-gray-800 p-6 space-y-6 shadow-xl">
        <h3 className="text-sm font-bold text-gray-300 uppercase tracking-wider flex items-center gap-2">
          <Filter size={15} className="text-[#00c2b2]" />
          <span>Filtros Avanzados de Reactivos</span>
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-12 gap-4">
          
          {/* Match Condition Selector ("Coincidir Cualquiera" / "Todas") */}
          <div className="sm:col-span-3">
            <label className="block text-[11px] font-semibold text-gray-400 mb-1.5 uppercase">
              Criterio de Coincidencia
            </label>
            <select
              value={matchCondition}
              onChange={(e) => setMatchCondition(e.target.value)}
              className="w-full bg-[#18191c] border border-gray-700/80 rounded-xl px-3 py-2.5 text-xs text-gray-200 focus:outline-none focus:border-[#0284c7]"
            >
              <option value="any">Coincidir Cualquiera (OR)</option>
              <option value="all">Coincidir Todas las Condiciones (AND)</option>
            </select>
          </div>

          {/* Categoría Selector */}
          <div className="sm:col-span-3">
            <label className="block text-[11px] font-semibold text-gray-400 mb-1.5 uppercase">
              Categoría
            </label>
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="w-full bg-[#18191c] border border-gray-700/80 rounded-xl px-3 py-2.5 text-xs text-gray-200 focus:outline-none focus:border-[#0284c7]"
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
            <label className="block text-[11px] font-semibold text-gray-400 mb-1.5 uppercase">
              Tipo de Reactivo
            </label>
            <select
              value={selectedType}
              onChange={(e) => setSelectedType(e.target.value)}
              className="w-full bg-[#18191c] border border-gray-700/80 rounded-xl px-3 py-2.5 text-xs text-gray-200 focus:outline-none focus:border-[#0284c7]"
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
            <label className="block text-[11px] font-semibold text-gray-400 mb-1.5 uppercase">
              Buscar en enunciado
            </label>
            <div className="relative">
              <input
                type="text"
                placeholder="Ej. fuerza, perimetral..."
                value={searchFilter}
                onChange={(e) => setSearchFilter(e.target.value)}
                className="w-full bg-[#18191c] border border-gray-700/80 rounded-xl pl-8 pr-3 py-2.5 text-xs text-white focus:outline-none focus:border-[#0284c7]"
              />
              <Search size={14} className="absolute left-2.5 top-3 text-gray-400" />
            </div>
          </div>

        </div>

        {/* Filter Action Buttons */}
        <div className="flex items-center justify-between pt-2 border-t border-gray-800">
          <div className="text-xs text-gray-400">
            Mostrando <strong className="text-white">{filteredQuestions.length}</strong> preguntas disponibles
          </div>

          <div className="flex gap-2">
            <button
              onClick={() => {
                setMatchCondition('any');
                setSelectedCategory('todas');
                setSelectedType('todas');
                setSearchFilter('');
              }}
              className="px-3.5 py-1.5 rounded-lg border border-gray-700 text-xs font-semibold text-gray-400 hover:text-white cursor-pointer"
            >
              Limpiar Filtros
            </button>
            <button
              onClick={() => alert("Filtros aplicados correctamente.")}
              className="px-4 py-1.5 rounded-lg bg-[#0284c7] hover:bg-[#0369a1] text-xs font-bold text-white shadow cursor-pointer"
            >
              Aplicar Filtros
            </button>
          </div>
        </div>
      </div>

      {/* 3. Questions Table */}
      <div className="bg-[#121316] rounded-2xl border border-gray-800 overflow-hidden shadow-xl">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse text-xs">
            <thead>
              <tr className="bg-[#18191c] border-b border-gray-800 text-[11px] font-bold text-gray-400 uppercase tracking-wider">
                <th className="py-3.5 px-4">Pregunta / Enunciado</th>
                <th className="py-3.5 px-4">Categoría</th>
                <th className="py-3.5 px-4">Tipo</th>
                <th className="py-3.5 px-4 text-center">Puntaje</th>
                <th className="py-3.5 px-4">Modificado</th>
                <th className="py-3.5 px-4 text-right">Acciones</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-800/60">
              {filteredQuestions.map((q) => (
                <tr key={q.id} className="hover:bg-gray-800/40 transition-colors">
                  <td className="py-3.5 px-4 font-semibold text-gray-100 max-w-sm">
                    <div className="flex items-center gap-2">
                      <HelpCircle size={15} className="text-[#0284c7] flex-shrink-0" />
                      <span className="hover:text-[#00c2b2] cursor-pointer">{q.title}</span>
                    </div>
                  </td>
                  <td className="py-3.5 px-4 text-gray-300">
                    <span className="bg-gray-800 px-2 py-0.5 rounded text-[10px] text-gray-300">
                      {q.category}
                    </span>
                  </td>
                  <td className="py-3.5 px-4 text-gray-300">
                    {q.type}
                  </td>
                  <td className="py-3.5 px-4 text-center font-mono font-bold text-[#00c2b2]">
                    {q.points} pts
                  </td>
                  <td className="py-3.5 px-4 text-gray-400 text-[11px]">
                    <div>{q.lastModified}</div>
                    <div className="text-gray-600 font-mono text-[10px]">Por: {q.author}</div>
                  </td>
                  <td className="py-3.5 px-4 text-right">
                    <div className="flex items-center justify-end gap-2 text-gray-400">
                      <button className="p-1 hover:text-sky-300 rounded cursor-pointer" title="Vista Previa">
                        <Eye size={14} />
                      </button>
                      <button className="p-1 hover:text-amber-300 rounded cursor-pointer" title="Editar">
                        <Edit3 size={14} />
                      </button>
                      <button className="p-1 hover:text-emerald-300 rounded cursor-pointer" title="Duplicar">
                        <Copy size={14} />
                      </button>
                      <button className="p-1 hover:text-red-400 rounded cursor-pointer" title="Eliminar">
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
      <div className="bg-[#121316] rounded-2xl border border-gray-800 p-6 sm:p-8 space-y-4 shadow-xl">
        <h3 className="text-sm font-bold text-white tracking-wide flex items-center gap-2">
          <UploadCloud size={18} className="text-[#0284c7]" />
          <span>Importar Banco de Preguntas y Contenido Multimedia (SCORM / Aiken / XML)</span>
        </h3>
        <p className="text-xs text-gray-400">
          Arrastra y suelta aquí archivos en formato Aiken (.txt), Moodle XML o paquetes interactivos SCORM 1.2 / 2004 para importar reactivos masivamente.
        </p>

        {/* Dropzone */}
        <div
          onDragOver={(e) => { e.preventDefault(); setIsDragOver(true); }}
          onDragLeave={() => setIsDragOver(false)}
          onDrop={handleDrop}
          className={`border-2 border-dashed rounded-2xl p-8 text-center transition-all cursor-pointer ${
            isDragOver 
              ? 'border-[#00c2b2] bg-teal-950/20 scale-101' 
              : 'border-gray-700/80 bg-[#18191c]/50 hover:border-gray-600'
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
          <div className="w-12 h-12 rounded-full bg-sky-950/70 text-[#38bdf8] flex items-center justify-center mx-auto mb-3 border border-sky-600/30">
            <UploadCloud size={24} />
          </div>
          <p className="text-xs sm:text-sm font-bold text-gray-200">
            Arrastra tus archivos aquí o <span className="text-[#38bdf8] underline">haz clic para examinar</span>
          </p>
          <p className="text-[11px] text-gray-500 mt-1">
            Formatos compatibles: .xml, .txt (Aiken), .zip (SCORM / H5P) hasta 64MB
          </p>
        </div>

        {uploadedFiles.length > 0 && (
          <div className="space-y-2 pt-2">
            <span className="text-[11px] font-bold text-gray-400 uppercase">Archivos Cargados Recientemente:</span>
            {uploadedFiles.map((file, idx) => (
              <div key={idx} className="p-2.5 rounded-lg bg-gray-900 border border-gray-800 flex items-center justify-between text-xs text-gray-300">
                <span className="flex items-center gap-2">
                  <FileText size={14} className="text-[#00c2b2]" />
                  {file}
                </span>
                <span className="text-[10px] text-emerald-400 font-semibold flex items-center gap-1">
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
