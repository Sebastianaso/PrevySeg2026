import React, { useState, useEffect } from 'react';
import { 
  Shield, 
  Clock, 
  Calendar, 
  FileText, 
  Download, 
  Eye, 
  CheckCircle2, 
  BookOpen, 
  AlertCircle, 
  Layers, 
  Check, 
  ExternalLink, 
  Lock, 
  Award,
  Sparkles,
  Info,
  Maximize2,
  X
} from 'lucide-react';
import { supabase } from '../../config/supabase';

// Los 5 Documentos Técnicos Oficiales de la Capacitación de Autoestudio CCTV
export const CCTV_STUDY_DOCUMENTS = [
  {
    id: 'doc-cctv-01',
    title: 'Manual Técnico de Operación de Centrales CCTV y Cámaras IP',
    subtitle: 'Fundamentos de Televigilancia, Topologías de Red y Gestión de Video VMS',
    category: 'Manual Principal de Estudio',
    pages: '85 páginas',
    code: 'MAN-CCTV-01-2026',
    size: '14.8 MB',
    filename: 'Manual_Operacion_CCTV_IP_PrevySeg_2026.pdf',
    description: 'Guía exhaustiva sobre arquitecturas de circuito cerrado de televisión, compresión H.264/H.265+, cámaras domo PTZ de alta velocidad, software de gestión de video (VMS), servidores de grabación NVR y diseño de almacenamiento en salas de control.',
    chapters: [
      {
        num: 1,
        title: 'Introducción a la Televigilancia y Sistemas de Video IP',
        content: 'Evolución desde el circuito cerrado analógico coaxial hasta los sistemas de video sobre IP. Componentes esenciales: sensores CMOS, lentes varifocales, iluminadores infrarrojos inteligentes (Smart IR) y alimentación PoE (Power over Ethernet).'
      },
      {
        num: 2,
        title: 'Topología de Redes y Protocolo ONVIF',
        content: 'Configuración de switches administrables con VLAN dedicadas para video perimetral. Estándares ONVIF Profile S (streaming), Profile G (almacenamiento) y Profile T (analítica de video avanzada).'
      },
      {
        num: 3,
        title: 'Operación Profesional de Software VMS (Video Management Software)',
        content: 'Matriz virtual de monitoreo, configuración de vistas multiventana (2x2, 3x3, 4x4), rondas de patrullaje virtual en domos PTZ (Presets y Tours), y gestión de grabaciones continuas vs grabaciones por evento.'
      },
      {
        num: 4,
        title: 'Cálculo de Ancho de Banda y Dimensionamiento de Almacenamiento',
        content: 'Fórmulas para determinar la tasa de bits (Bitrate CBR vs VBR) según resolución (1080p, 4K), tasa de cuadros (FPS) y días de retención legal exigidos por directivas de seguridad privada.'
      }
    ]
  },
  {
    id: 'doc-cctv-02',
    title: 'Protocolos de Respuesta ante Alarmas de Intrusión y Verificación de Video',
    subtitle: 'Procedimientos Operativos de Salas de Monitoreo conforme a Norma OS-10 y Ley 21.659',
    category: 'Protocolos Operativos',
    pages: '62 páginas',
    code: 'PROT-ALARM-02-2026',
    size: '9.4 MB',
    filename: 'Protocolos_Verificacion_Alarmas_CCTV_PrevySeg.pdf',
    description: 'Protocolos estandarizados para la recepción y verificación de señales de intrusión provenientes de paneles de alarma, validación mediante cámaras en tiempo real, descarte de falsas alarmas y enlace de emergencia con Carabineros de Chile.',
    chapters: [
      {
        num: 1,
        title: 'Clasificación de Señales de Alarma y Paneles de Control',
        content: 'Diferenciación entre alarmas de intrusión, botón de pánico / atraco (código silencioso), sabotaje perimetral (tamper) y fallas de comunicación. Zonas lógicas y retardos de entrada/salida.'
      },
      {
        num: 2,
        title: 'Protocolo de Verificación Visual de Video (Video-Verificación)',
        content: 'Técnica de inspección de pre y post-alarma mediante buffers de video de 15 segundos. Reglas estrictas para confirmar intrusión real antes de emitir alertas de nivel crítico.'
      },
      {
        num: 3,
        title: 'Coordinación y Despacho con Autoridades (Carabineros / CENCO)',
        content: 'Directiva de Funcionamiento para centrales receptoras de alarmas (CRA). Canales oficiales de comunicación, identificación de recinto protegido, reporte de dirección exacta y descripción fisonómica de sospechosos.'
      },
      {
        num: 4,
        title: 'Gestión y Registro en Libro Digital de Novedades',
        content: 'Bitácora cronológica inalterable de incidentes, foliación de eventos, motivos de activación y formalización de reportes para el mandante de seguridad.'
      }
    ]
  },
  {
    id: 'doc-cctv-03',
    title: 'Guía de Analítica de Video con Inteligencia Artificial y Detección Perimetral',
    subtitle: 'Configuración de Reglas IVS, Reconocimiento LPR y Mapas de Calor',
    category: 'Tecnología Avanzada',
    pages: '48 páginas',
    code: 'IA-ANALYTICS-03-2026',
    size: '12.1 MB',
    filename: 'Analitica_Video_Inteligencia_Artificial_CCTV.pdf',
    description: 'Implementación práctica de inteligencia artificial en salas de control: cruce de línea perimetral virtual (Tripwire), intrusión en zona acotada, detección de objetos abandonados o sustraídos y reconocimiento de placas patentes (LPR).',
    chapters: [
      {
        num: 1,
        title: 'Fundamentos de Deep Learning aplicado a Seguridad Electrónica',
        content: 'Clasificación de objetivos mediante redes neuronales convolucionales: discriminación exacta entre seres humanos, vehículos motorizados y falsos disparos provocados por animales, ramas o lluvia.'
      },
      {
        num: 2,
        title: 'Calibración de Reglas Perimetrales IVS (Intelligent Video Surveillance)',
        content: 'Diseño de polígonos virtuales de seguridad, umbrales de permanencia mínima (loitering / merodeo) y zonas de exclusión vehicular.'
      },
      {
        num: 3,
        title: 'Sistemas de Reconocimiento de Placas Patentes (LPR / ANPR)',
        content: 'Configuración de listas blancas y listas negras en accesos vehiculares, velocidad máxima de captura, iluminación infrarroja contra encandilamiento y alertas automáticas de autos con encargo por robo.'
      }
    ]
  },
  {
    id: 'doc-cctv-04',
    title: 'Compendio Legal: Resguardo de Evidencias Digitales y Cadena de Custodia',
    subtitle: 'Normativa SPD, Protección de Datos Personales y Embalaje de Grabaciones Forenses',
    category: 'Marco Jurídico y Normativo',
    pages: '36 páginas',
    code: 'LEG-EVID-04-2026',
    size: '6.5 MB',
    filename: 'Cadena_Custodia_Evidencias_Digitales_CCTV.pdf',
    description: 'Marco legal riguroso sobre la privacidad en televigilancia, resguardo de grabaciones de seguridad privada, límites éticos y legales en espacios públicos/privados y entrega formal de evidencias al Ministerio Público y Carabineros.',
    chapters: [
      {
        num: 1,
        title: 'Ley N° 21.659 y Regulaciones de la Subsecretaría de Prevención del Delito',
        content: 'Obligaciones del operador de televigilancia, prohibición de orientar cámaras hacia la intimidad de domicilios particulares y cartelería obligatoria de zona videovigilada.'
      },
      {
        num: 2,
        title: 'Cadena de Custodia de Evidencias de Video',
        content: 'Extracción segura de grabaciones con firma criptográfica digital (Hash SHA-256 / MD5 y marca de agua inviolable). Protocolo de embalaje, sellado y formulario de entrega a la Fiscalía.'
      },
      {
        num: 3,
        title: 'Responsabilidad Civil y Penal en la Fuga de Grabaciones',
        content: 'Sanciones legales ante la difusión no autorizada de videos de seguridad en redes sociales o medios de comunicación sin orden judicial competente.'
      }
    ]
  },
  {
    id: 'doc-cctv-05',
    title: 'Guía Práctica de Mantenimiento Preventivo y Diagnóstico de Fallas',
    subtitle: 'Checklist Diario de Operador, Sistemas UPS, Limpieza Óptica y Rotación de Grabación',
    category: 'Mantenimiento y Continuidad',
    pages: '40 páginas',
    code: 'MNT-OPER-05-2026',
    size: '8.2 MB',
    filename: 'Mantenimiento_Preventivo_Sistemas_CCTV_PrevySeg.pdf',
    description: 'Protocolos de mantenimiento técnico preventivo para operadores de central: verificación de continuidad operativa en fallas de energía eléctrica (UPS), revisión de pérdida de video (Video Loss) y diagnóstico de fallas en discos duros.',
    chapters: [
      {
        num: 1,
        title: 'Rutinario Diario de Apertura de Turno (Shift Handover)',
        content: 'Inspección de las 24 horas previas, verificación de sincronización horaria NTP (crucial para validez judicial) y chequeo de salud de discos en arreglo RAID.'
      },
      {
        num: 2,
        title: 'Sistemas de Energía Ininterrumpida (UPS) y Respaldo Eléctrico',
        content: 'Tiempos de autonomía en minutos de las baterías de respaldo ante corte intencional de suministro, conmutación automática de generadores diésel y protección contra sobretensiones.'
      },
      {
        num: 3,
        title: 'Diagnóstico Rápido de Pérdida de Enlace y Fallas de Visión Nocturna',
        content: 'Detección de problemas en cableado Cat6/fibra óptica, caída de tensión PoE, acumulación de suciedad en cúpulas de policarbonato y desenfoque térmico en lentes varifocales.'
      }
    ]
  }
];

const CctvStudyPortal = ({ currentUser, cctvStatus }) => {
  const [completedDocs, setCompletedDocs] = useState(() => {
    try {
      const saved = localStorage.getItem(`prevyseg_cctv_read_${currentUser?.id || 'guest'}`);
      return saved ? JSON.parse(saved) : (cctvStatus?.completed_docs || []);
    } catch (e) {
      return [];
    }
  });

  const [activeReadingDoc, setActiveReadingDoc] = useState(null);
  const [activeChapterIndex, setActiveChapterIndex] = useState(0);

  const toggleDocComplete = (docId) => {
    let next;
    if (completedDocs.includes(docId)) {
      next = completedDocs.filter(id => id !== docId);
    } else {
      next = [...completedDocs, docId];
    }
    setCompletedDocs(next);
    try {
      localStorage.setItem(`prevyseg_cctv_read_${currentUser?.id || 'guest'}`, JSON.stringify(next));
    } catch (e) {}
  };

  const progressPercent = Math.round((completedDocs.length / CCTV_STUDY_DOCUMENTS.length) * 100);

  const daysRemaining = cctvStatus?.days_remaining ?? 30;
  const hoursRemaining = cctvStatus?.hours_remaining ?? 0;
  const expiresAtFormatted = cctvStatus?.expires_at 
    ? new Date(cctvStatus.expires_at).toLocaleDateString('es-CL', { day: '2-digit', month: 'long', year: 'numeric' })
    : '30 días desde la activación';

  const handleSimulateDownload = (doc) => {
    // Generar un blob de texto estructurado con el contenido técnico del manual para descarga real
    const content = `
================================================================================
INSTITUTO TÉCNICO DE CAPACITACIÓN PREVYSEG - SEDE ARICA / SEDE VIRTUAL
CURSO ESPECIAL DE AUTOAPRENDIZAJE: TÉCNICAS DE OPERACIÓN CCTV Y ALARMAS
================================================================================
DOCUMENTO TÉCNICO OFICIAL: ${doc.title}
CÓDIGO INSTITUCIONAL: ${doc.code} | EXTENSIÓN: ${doc.pages}
MODALIDAD: Autoestudio Asincrónico Documental (Sin Clases Virtuales ni Docente)
ALUMNO HABILITADO: ${currentUser?.nombre || cctvStatus?.student_name || 'Estudiante'} (RUT: ${currentUser?.rut || cctvStatus?.student_rut || 'Sin RUT'})
VIGENCIA DE ESTUDIO: 30 Días Corridos (Vence el ${expiresAtFormatted})
================================================================================

RESUMEN TÉCNICO:
${doc.description}

TEMARIO DE ESTUDIO Y CAPÍTULOS TÉCNICOS:
${doc.chapters.map(c => `
--------------------------------------------------------------------------------
CAPÍTULO ${c.num}: ${c.title}
--------------------------------------------------------------------------------
${c.content}
`).join('\n')}

================================================================================
CERTIFICACIÓN Y DERECHOS:
Documentación técnica oficial propiedad de OTEC PrevySeg.
Prohibida su reproducción sin autorización conforme a la Ley 17.336 de Propiedad Intelectual.
================================================================================
    `.trim();

    const blob = new Blob([content], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = doc.filename.replace('.pdf', '_Resumen_Tecnico.txt');
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);

    alert(`✓ Descargando material oficial de estudio: "${doc.title}"\nGuarda el archivo en tu equipo para tu estudio personal durante los 30 días de vigencia.`);
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-300">
      
      {/* 1. HERO BANNER: Modalidad Especial de Autoaprendizaje CCTV (30 Días) */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-slate-950 via-[#072448] to-slate-950 border-2 border-sky-400/40 text-white p-6 sm:p-8 lg:p-10 shadow-2xl">
        
        {/* Luces y efectos de fondo */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-sky-500/10 rounded-full blur-[100px] pointer-events-none" />
        <div className="absolute bottom-0 left-10 w-80 h-80 bg-teal-500/10 rounded-full blur-[100px] pointer-events-none" />

        <div className="relative z-10 space-y-6">
          
          {/* Badges de Modalidad Especial */}
          <div className="flex flex-wrap items-center gap-2.5">
            <span className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-sky-500/20 border border-sky-400/50 text-sky-200 text-xs font-black uppercase tracking-wider shadow-sm">
              <Shield size={14} className="text-sky-300" />
              <span>Modalidad Especial de Autoaprendizaje</span>
            </span>

            <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-amber-500/20 border border-amber-400/50 text-amber-300 text-xs font-bold uppercase tracking-wider">
              <Clock size={13} />
              <span>Vigencia: Quedan {daysRemaining} días ({hoursRemaining} hrs)</span>
            </span>

            <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-teal-500/20 border border-teal-400/40 text-teal-300 text-xs font-semibold">
              <BookOpen size={13} />
              <span>5 Manuales Oficiales Habilitados</span>
            </span>
          </div>

          {/* Título y Explicación de la Modalidad */}
          <div className="space-y-2 max-w-4xl">
            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-black text-white tracking-tight">
              Técnicas de Operación CCTV y Alarmas de Seguridad Privada
            </h1>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
              Esta capacitación especial funciona bajo el modelo de <strong className="text-sky-300">autoaprendizaje documental técnico individual</strong>. 
              No contempla conexión a clases virtuales sincrónicas ni requiere asistencia con profesor docente. Tienes un periodo estricto de <strong className="text-amber-300">30 días</strong> para revisar exhaustivamente los manuales, normativas y protocolos de televigilancia IP.
            </p>
          </div>

          {/* Banner Informativo de Acceso Individual */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-4 p-4 sm:p-5 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-sm items-center">
            
            <div className="md:col-span-8 flex items-center gap-3.5">
              <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-sky-500 to-teal-400 flex items-center justify-center text-slate-950 font-black text-lg shadow-sm flex-shrink-0">
                {currentUser?.nombre ? currentUser.nombre.slice(0, 2).toUpperCase() : 'AL'}
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <span className="text-xs font-bold text-white">
                    Alumno Habilitado: {currentUser?.nombre || cctvStatus?.student_name || 'Estudiante'}
                  </span>
                  <span className="text-[10px] font-mono text-sky-300 bg-sky-950/80 px-2 py-0.5 rounded border border-sky-800">
                    {currentUser?.rut || cctvStatus?.student_rut || ''}
                  </span>
                </div>
                <p className="text-[11px] text-slate-300 mt-0.5">
                  Fecha Límite de Estudio: <strong className="text-amber-300 font-semibold">{expiresAtFormatted}</strong> (Acceso exclusivo por 30 días)
                </p>
              </div>
            </div>

            <div className="md:col-span-4 flex flex-col justify-center border-t md:border-t-0 md:border-l border-white/10 pt-3 md:pt-0 md:pl-4">
              <div className="flex justify-between items-center text-xs mb-1.5">
                <span className="text-slate-300 font-semibold">Progreso de Estudio:</span>
                <span className="text-sky-300 font-black text-sm">{progressPercent}%</span>
              </div>
              <div className="w-full h-2 bg-slate-900 rounded-full overflow-hidden border border-slate-700">
                <div 
                  className="h-full bg-gradient-to-r from-teal-400 to-sky-400 transition-all duration-500"
                  style={{ width: `${progressPercent}%` }}
                />
              </div>
              <span className="text-[10px] text-slate-400 mt-1">
                {completedDocs.length} de {CCTV_STUDY_DOCUMENTS.length} documentos estudiados
              </span>
            </div>

          </div>

        </div>

      </div>

      {/* 2. REPOSITORIO DE DOCUMENTOS DE ESTUDIO TÉCNICO */}
      <div className="space-y-4">
        
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3">
          <div>
            <h2 className="text-xl font-bold text-slate-900 flex items-center gap-2">
              <BookOpen size={20} className="text-[#0284c7]" />
              <span>Biblioteca Documental Oficial de Estudio CCTV</span>
            </h2>
            <p className="text-xs text-slate-500 mt-0.5">
              Haz clic en "Leer en Pantalla" para abrir el visor interactivo o descarga cada archivo oficial en tu dispositivo.
            </p>
          </div>

          <span className="text-xs bg-sky-50 text-sky-800 font-bold px-3 py-1.5 rounded-xl border border-sky-200">
            5 Manuales Técnicos Sincronizados
          </span>
        </div>

        {/* Grilla de Documentos */}
        <div className="grid grid-cols-1 gap-4">
          {CCTV_STUDY_DOCUMENTS.map((doc, idx) => {
            const isCompleted = completedDocs.includes(doc.id);

            return (
              <div 
                key={doc.id}
                className={`bg-white rounded-2xl border transition-all p-5 sm:p-6 shadow-sm flex flex-col lg:flex-row justify-between items-start lg:items-center gap-5 hover:border-sky-300 ${
                  isCompleted ? 'border-emerald-300 bg-emerald-50/20' : 'border-slate-200'
                }`}
              >
                
                {/* Lado izquierdo: Información del documento */}
                <div className="flex items-start gap-4 flex-1">
                  
                  {/* Número / Icono */}
                  <div className={`w-12 h-12 rounded-2xl flex items-center justify-center font-black text-base flex-shrink-0 border ${
                    isCompleted 
                      ? 'bg-emerald-100 text-emerald-800 border-emerald-300' 
                      : 'bg-sky-50 text-sky-700 border-sky-200'
                  }`}>
                    {isCompleted ? <Check size={22} className="stroke-[3]" /> : (idx + 1)}
                  </div>

                  <div className="space-y-1.5 flex-1">
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="text-[10px] font-extrabold uppercase px-2 py-0.5 rounded bg-slate-100 text-slate-700 border border-slate-200">
                        {doc.category}
                      </span>
                      <span className="text-[10px] font-mono text-slate-500">
                        {doc.code}
                      </span>
                      <span className="text-[10px] text-slate-400">•</span>
                      <span className="text-[10px] font-semibold text-slate-600">
                        {doc.pages}
                      </span>
                      <span className="text-[10px] text-slate-400">•</span>
                      <span className="text-[10px] font-mono text-slate-500">
                        {doc.size}
                      </span>
                    </div>

                    <h3 className="text-base sm:text-lg font-bold text-slate-900 leading-snug">
                      {doc.title}
                    </h3>

                    <p className="text-xs text-slate-600 leading-relaxed max-w-3xl">
                      {doc.description}
                    </p>

                    {/* Temario resumido */}
                    <div className="flex flex-wrap gap-1.5 pt-1">
                      {doc.chapters.map((ch) => (
                        <span key={ch.num} className="text-[10.5px] bg-slate-50 text-slate-700 px-2 py-0.5 rounded-md border border-slate-200">
                          Cap. {ch.num}: {ch.title.split(':')[0]}
                        </span>
                      ))}
                    </div>
                  </div>

                </div>

                {/* Lado derecho: Acciones */}
                <div className="flex flex-wrap lg:flex-col items-stretch sm:items-center lg:items-end gap-2.5 w-full lg:w-auto flex-shrink-0 pt-3 lg:pt-0 border-t lg:border-t-0 border-slate-100">
                  
                  {/* Botón: Leer en Pantalla */}
                  <button
                    type="button"
                    onClick={() => {
                      setActiveReadingDoc(doc);
                      setActiveChapterIndex(0);
                    }}
                    className="flex-1 sm:flex-initial px-4 py-2.5 text-xs font-bold text-white bg-[#0284c7] hover:bg-sky-600 rounded-xl shadow-sm transition-all flex items-center justify-center gap-2 cursor-pointer"
                  >
                    <Eye size={15} />
                    <span>Leer en Pantalla</span>
                  </button>

                  {/* Botón: Descargar PDF */}
                  <button
                    type="button"
                    onClick={() => handleSimulateDownload(doc)}
                    className="flex-1 sm:flex-initial px-3.5 py-2 text-xs font-semibold text-slate-700 hover:text-slate-900 bg-slate-100 hover:bg-slate-200 rounded-xl transition-all flex items-center justify-center gap-1.5 cursor-pointer"
                    title="Descargar archivo oficial de estudio"
                  >
                    <Download size={14} className="text-slate-500" />
                    <span>Descargar PDF</span>
                  </button>

                  {/* Checkbox: Marcar como Leído */}
                  <button
                    type="button"
                    onClick={() => toggleDocComplete(doc.id)}
                    className={`flex-1 sm:flex-initial px-3 py-1.5 text-[11px] font-bold rounded-lg border transition-all flex items-center justify-center gap-1.5 cursor-pointer ${
                      isCompleted 
                        ? 'bg-emerald-50 text-emerald-800 border-emerald-300 hover:bg-emerald-100'
                        : 'bg-white text-slate-500 border-slate-300 hover:border-slate-400 hover:text-slate-700'
                    }`}
                  >
                    <CheckCircle2 size={13} className={isCompleted ? 'text-emerald-600' : 'text-slate-400'} />
                    <span>{isCompleted ? 'Estudiado ✓' : 'Marcar como Leído'}</span>
                  </button>

                </div>

              </div>
            );
          })}
        </div>

      </div>

      {/* 3. MODAL VISOR INTERACTIVO DE LECTURA DE DOCUMENTO */}
      {activeReadingDoc && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-slate-950/70 backdrop-blur-md animate-in fade-in">
          
          <div className="bg-white border border-slate-200 w-full max-w-4xl max-h-[90vh] rounded-3xl shadow-2xl flex flex-col overflow-hidden animate-in zoom-in-95">
            
            {/* Header del Visor */}
            <div className="p-5 sm:p-6 bg-slate-900 text-white flex justify-between items-start gap-4">
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <span className="text-[10px] font-black uppercase px-2 py-0.5 rounded bg-sky-500/20 text-sky-300 border border-sky-400/30">
                    {activeReadingDoc.category}
                  </span>
                  <span className="text-xs font-mono text-slate-400">
                    {activeReadingDoc.code} • {activeReadingDoc.pages}
                  </span>
                </div>
                <h3 className="text-base sm:text-xl font-bold text-white">
                  {activeReadingDoc.title}
                </h3>
                <p className="text-xs text-slate-300">
                  {activeReadingDoc.subtitle}
                </p>
              </div>

              <button
                type="button"
                onClick={() => setActiveReadingDoc(null)}
                className="p-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white transition-colors cursor-pointer"
              >
                <X size={18} />
              </button>
            </div>

            {/* Selector de Capítulos */}
            <div className="bg-slate-100 px-5 py-2.5 border-b border-slate-200 flex items-center gap-2 overflow-x-auto text-xs">
              <span className="text-slate-500 font-bold uppercase text-[10px] mr-2">Capítulos:</span>
              {activeReadingDoc.chapters.map((ch, idx) => (
                <button
                  key={ch.num}
                  type="button"
                  onClick={() => setActiveChapterIndex(idx)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all whitespace-nowrap cursor-pointer ${
                    activeChapterIndex === idx 
                      ? 'bg-[#0284c7] text-white shadow-xs' 
                      : 'text-slate-700 hover:bg-slate-200'
                  }`}
                >
                  Capítulo {ch.num}
                </button>
              ))}
            </div>

            {/* Contenido del Capítulo */}
            <div className="p-6 sm:p-8 overflow-y-auto flex-1 space-y-6 text-slate-800 text-sm leading-relaxed">
              
              <div className="border-b border-slate-100 pb-4">
                <span className="text-xs font-extrabold text-[#0284c7] uppercase tracking-wider block">
                  Capítulo {activeReadingDoc.chapters[activeChapterIndex]?.num}
                </span>
                <h4 className="text-lg font-bold text-slate-900 mt-1">
                  {activeReadingDoc.chapters[activeChapterIndex]?.title}
                </h4>
              </div>

              <div className="p-5 rounded-2xl bg-sky-50/70 border border-sky-200 text-sky-950 text-xs sm:text-sm leading-relaxed font-normal">
                {activeReadingDoc.chapters[activeChapterIndex]?.content}
              </div>

              <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-2 text-xs text-slate-600">
                <strong className="block text-slate-900 font-bold">Instrucciones para el Alumno:</strong>
                <p>
                  1. Lee con atención cada concepto técnico y toma notas en tu cuaderno de estudio.<br />
                  2. Una vez completada la lectura de todos los capítulos, marca este manual como <strong>"Estudiado"</strong> para acumular tu porcentaje de avance.<br />
                  3. Recuerda que tu habilitación tiene una duración de 30 días a partir de la fecha de activación.
                </p>
              </div>

            </div>

            {/* Footer del Visor */}
            <div className="p-4 sm:p-5 bg-slate-50 border-t border-slate-200 flex flex-col sm:flex-row justify-between items-center gap-3">
              <button
                type="button"
                onClick={() => handleSimulateDownload(activeReadingDoc)}
                className="text-xs font-bold text-slate-700 hover:text-slate-900 flex items-center gap-1.5 cursor-pointer"
              >
                <Download size={14} />
                <span>Descargar archivo completo ({activeReadingDoc.size})</span>
              </button>

              <div className="flex items-center gap-3">
                <button
                  type="button"
                  onClick={() => {
                    toggleDocComplete(activeReadingDoc.id);
                  }}
                  className={`px-4 py-2 rounded-xl text-xs font-bold cursor-pointer transition-all flex items-center gap-1.5 ${
                    completedDocs.includes(activeReadingDoc.id)
                      ? 'bg-emerald-100 text-emerald-800 border border-emerald-300'
                      : 'bg-emerald-600 hover:bg-emerald-500 text-white'
                  }`}
                >
                  <CheckCircle2 size={15} />
                  <span>{completedDocs.includes(activeReadingDoc.id) ? 'Marcado como Estudiado ✓' : 'Marcar Documento como Estudiado'}</span>
                </button>

                <button
                  type="button"
                  onClick={() => setActiveReadingDoc(null)}
                  className="px-4 py-2 rounded-xl text-xs font-semibold text-slate-600 hover:text-slate-900 bg-slate-200 hover:bg-slate-300 cursor-pointer"
                >
                  Cerrar Lector
                </button>
              </div>
            </div>

          </div>

        </div>
      )}

    </div>
  );
};

export default CctvStudyPortal;
