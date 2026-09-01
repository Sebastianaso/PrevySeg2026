import React, { useState } from 'react';
import { 
  Layers, 
  Search, 
  Plus, 
  UploadCloud, 
  Video, 
  FileText, 
  CheckCircle, 
  Eye, 
  Download, 
  Edit3, 
  Trash2,
  FolderKanban
} from 'lucide-react';

const ContentBankView = () => {
  const [search, setSearch] = useState('');

  const contents = [
    {
      id: 'cnt-01',
      title: 'Simulador Interactivo: Detección y Protocolo de Alarmas CCTV',
      type: 'Paquete H5P / Interactivo',
      size: '14.2 MB',
      updated: '28 Agosto, 2026',
      author: 'Ashley Adaros',
    },
    {
      id: 'cnt-02',
      title: 'Manual de Procedimientos y Normativa OS-10 Carabineros de Chile',
      type: 'Documento PDF Oficial',
      size: '4.8 MB',
      updated: '20 Agosto, 2026',
      author: 'Sebastián Araya',
    },
    {
      id: 'cnt-03',
      title: 'Video Demostrativo: Técnicas de Reducción y Defensa Personal',
      type: 'Video MP4 / HD',
      size: '48.5 MB',
      updated: '15 Agosto, 2026',
      author: 'Ashley Adaros',
    },
    {
      id: 'cnt-04',
      title: 'Guía Rápida de Primeros Auxilios y RCP en Recintos Privados',
      type: 'Presentación SCORM 1.2',
      size: '8.1 MB',
      updated: '10 Agosto, 2026',
      author: 'Sebastián Araya',
    },
  ];

  const filtered = contents.filter(c => c.title.toLowerCase().includes(search.toLowerCase()) || c.type.toLowerCase().includes(search.toLowerCase()));

  return (
    <div className="space-y-6">
      <div className="bg-gray-900/60 p-5 rounded-2xl border border-gray-800 backdrop-blur-md flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h2 className="text-xl font-bold text-white tracking-wide">Banco de Contenido y Recursos Didácticos</h2>
          <p className="text-xs text-gray-400 mt-1">
            Biblioteca de objetos de aprendizaje, actividades interactivas H5P y multimedia.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={() => alert("Añadir nuevo recurso didáctico...")}
            className="bg-[#0284c7] hover:bg-[#0369a1] active:scale-95 text-white text-xs font-bold px-4 py-2.5 rounded-lg shadow-lg flex items-center gap-2 transition-all cursor-pointer"
          >
            <Plus size={15} />
            <span>Añadir Contenido</span>
          </button>
        </div>
      </div>

      <div className="bg-[#121316] rounded-2xl border border-gray-800 p-4 sm:p-5">
        <div className="relative max-w-md">
          <input
            type="text"
            placeholder="Buscar por título o formato de recurso..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full bg-[#18191c] border border-gray-700/80 rounded-xl pl-10 pr-4 py-2.5 text-xs sm:text-sm text-white placeholder-gray-500 focus:outline-none focus:border-[#0284c7]"
          />
          <Search size={16} className="absolute left-3.5 top-3 text-gray-400" />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {filtered.map((item) => (
          <div 
            key={item.id}
            className="p-5 rounded-2xl bg-[#121316] border border-gray-800 hover:border-gray-700 transition-all shadow-lg flex flex-col justify-between space-y-4 group"
          >
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-bold text-[#00c2b2] bg-teal-950/60 border border-teal-800/40 px-2.5 py-0.5 rounded-full uppercase">
                  {item.type}
                </span>
                <span className="text-[10px] text-gray-500 font-mono">{item.size}</span>
              </div>
              <h4 className="text-sm font-bold text-white group-hover:text-[#38bdf8] transition-colors leading-snug">
                {item.title}
              </h4>
              <p className="text-[11px] text-gray-400">
                Última actualización: {item.updated} • Por: <strong className="text-gray-300">{item.author}</strong>
              </p>
            </div>

            <div className="pt-3 border-t border-gray-800 flex items-center justify-between">
              <button 
                onClick={() => alert(`Previsualizando recurso interactivo: ${item.title}`)}
                className="text-xs font-semibold text-[#38bdf8] hover:underline flex items-center gap-1.5 cursor-pointer"
              >
                <Eye size={13} />
                <span>Previsualizar</span>
              </button>
              <div className="flex items-center gap-2 text-gray-400">
                <button className="p-1 hover:text-white rounded cursor-pointer" title="Descargar"><Download size={14} /></button>
                <button className="p-1 hover:text-amber-300 rounded cursor-pointer" title="Editar"><Edit3 size={14} /></button>
                <button className="p-1 hover:text-red-400 rounded cursor-pointer" title="Eliminar"><Trash2 size={14} /></button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ContentBankView;
