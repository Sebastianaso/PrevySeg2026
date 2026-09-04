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
      title: 'Manual de Procedimientos y Normativa SPD (Subsecretaría de Prevención del Delito)',
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
      <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h2 className="text-xl font-black text-slate-900 tracking-tight">Banco de Contenido y Recursos Didácticos</h2>
          <p className="text-xs text-slate-600 mt-1">
            Biblioteca de objetos de aprendizaje, actividades interactivas H5P y multimedia.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={() => alert("Añadir nuevo recurso didáctico...")}
            className="bg-sky-600 hover:bg-sky-700 active:scale-95 text-white text-xs font-bold px-4 py-2.5 rounded-xl shadow-sm flex items-center gap-2 transition-all cursor-pointer"
          >
            <Plus size={15} />
            <span>Añadir Contenido</span>
          </button>
        </div>
      </div>

      <div className="bg-white rounded-2xl border border-slate-200 p-4 sm:p-5 shadow-sm">
        <div className="relative max-w-md">
          <input
            type="text"
            placeholder="Buscar por título o formato de recurso..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full bg-slate-50 border border-slate-300 rounded-xl pl-10 pr-4 py-2.5 text-xs sm:text-sm text-slate-900 placeholder-slate-400 focus:bg-white focus:outline-none focus:border-sky-500 font-medium"
          />
          <Search size={16} className="absolute left-3.5 top-3 text-slate-400" />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {filtered.map((item) => (
          <div 
            key={item.id}
            className="p-5 rounded-2xl bg-white border border-slate-200 hover:border-sky-300 transition-all shadow-sm flex flex-col justify-between space-y-4 group"
          >
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-bold text-teal-800 bg-teal-50 border border-teal-200 px-2.5 py-0.5 rounded-full uppercase">
                  {item.type}
                </span>
                <span className="text-[10px] text-slate-500 font-mono">{item.size}</span>
              </div>
              <h4 className="text-sm font-bold text-slate-900 group-hover:text-sky-700 transition-colors leading-snug">
                {item.title}
              </h4>
              <p className="text-[11px] text-slate-500">
                Última actualización: {item.updated} • Por: <strong className="text-slate-700">{item.author}</strong>
              </p>
            </div>

            <div className="pt-3 border-t border-slate-100 flex items-center justify-between">
              <button 
                onClick={() => alert(`Previsualizando recurso interactivo: ${item.title}`)}
                className="text-xs font-bold text-sky-600 hover:underline flex items-center gap-1.5 cursor-pointer"
              >
                <Eye size={13} />
                <span>Previsualizar</span>
              </button>
              <div className="flex items-center gap-2 text-slate-400">
                <button className="p-1 hover:text-slate-800 rounded cursor-pointer transition-colors" title="Descargar"><Download size={14} /></button>
                <button className="p-1 hover:text-amber-600 rounded cursor-pointer transition-colors" title="Editar"><Edit3 size={14} /></button>
                <button className="p-1 hover:text-rose-600 rounded cursor-pointer transition-colors" title="Eliminar"><Trash2 size={14} /></button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ContentBankView;
