import React, { useState } from 'react';
import { 
  ArrowLeft, 
  Play, 
  Pause, 
  CheckCircle2, 
  Circle, 
  BookOpen, 
  FileText, 
  Download, 
  Award, 
  HelpCircle, 
  Clock, 
  ChevronDown, 
  ChevronUp, 
  Sparkles, 
  ShieldCheck, 
  Volume2, 
  Maximize, 
  RotateCcw,
  Check,
  Send,
  AlertCircle
} from 'lucide-react';

export const CourseClassroomView = ({ courseTitle, onBack }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [activeTab, setActiveTab] = useState('contenido'); // 'contenido' | 'material' | 'examen' | 'certificado'
  const [activeLessonId, setActiveLessonId] = useState('2-3');
  const [expandedModules, setExpandedModules] = useState({ 1: true, 2: true, 3: false, 4: false });
  const [quizAnswers, setQuizAnswers] = useState({});
  const [quizSubmitted, setQuizSubmitted] = useState(false);
  const [quizScore, setQuizScore] = useState(0);

  const modules = [
    {
      id: 1,
      title: 'Módulo 1: Marco Legal y Normativa de Seguridad Privada',
      duration: '18 Horas',
      progress: 100,
      lessons: [
        { id: '1-1', title: '1.1 Decreto Ley 3.607 y Ley 19.303', duration: '25 min', completed: true },
        { id: '1-2', title: '1.2 Derechos y Deberes del Guardia OS-10', duration: '30 min', completed: true },
        { id: '1-3', title: '1.3 Quiz de Evaluación Normativa OS-10', duration: '15 min', completed: true },
      ]
    },
    {
      id: 2,
      title: 'Módulo 2: Técnicas Operativas y Resolución de Conflictos',
      duration: '24 Horas',
      progress: 66,
      lessons: [
        { id: '2-1', title: '2.1 Control de Accesos Peatonales y Vehiculares', duration: '40 min', completed: true },
        { id: '2-2', title: '2.2 Detección de Amenazas y Técnicas de Rondín', duration: '35 min', completed: true },
        { id: '2-3', title: '2.3 Resolución de Conflictos y Situaciones Difíciles', duration: '45 min', completed: false, isCurrent: true },
        { id: '2-4', title: '2.4 Taller de Comunicación Táctica y Radiocomunicación', duration: '30 min', completed: false },
      ]
    },
    {
      id: 3,
      title: 'Módulo 3: Primeros Auxilios, Emergencias y Evacuación',
      duration: '24 Horas',
      progress: 0,
      lessons: [
        { id: '3-1', title: '3.1 Reanimación Cardiopulmonar (RCP) y DEA', duration: '45 min', completed: false },
        { id: '3-2', title: '3.2 Protocolos de Evacuación ante Sismos y Tsunamis (Arica)', duration: '40 min', completed: false },
        { id: '3-3', title: '3.3 Manejo de Extintores y Control de Amagos de Incendio', duration: '35 min', completed: false },
      ]
    },
    {
      id: 4,
      title: 'Módulo 4: Evaluación Final y Certificación OS-10',
      duration: '24 Horas',
      progress: 0,
      lessons: [
        { id: '4-1', title: '4.1 Repaso General y Banco de Preguntas OS-10', duration: '60 min', completed: false },
        { id: '4-2', title: '4.2 Examen Teórico Final de Certificación', duration: '45 min', completed: false },
      ]
    }
  ];

  const quizQuestions = [
    {
      id: 'q1',
      question: '¿Cuál es el cuerpo legal principal que regula la Seguridad Privada en Chile?',
      options: [
        'Decreto Ley N° 3.607 y sus reglamentos complementarios.',
        'Código de Comercio de Chile.',
        'Ley de Tránsito N° 18.290.',
        'Decreto Supremo N° 594 de Salud.'
      ],
      correct: 0,
      explanation: 'El Decreto Ley 3.607 es la normativa matriz que establece las normas sobre vigilancia privada y funcionamiento de guardias de seguridad.'
    },
    {
      id: 'q2',
      question: 'Ante un delito flagrante en su lugar de trabajo, el Guardia de Seguridad debe:',
      options: [
        'Interrogar al sujeto y aplicarle sanciones disciplinarias.',
        'Retener al individuo y entregarlo inmediatamente a las autoridades (Carabineros/PDI).',
        'Dejar ir al sospechoso sin registrar el hecho.',
        'Perseguir al sospechoso fuera del recinto asignado indefinidamente.'
      ],
      correct: 1,
      explanation: 'Conforme al Código Procesal Penal, cualquier ciudadano o guardia puede detener a quien sea sorprendido en delito flagrante, debiendo entregarlo de inmediato a la policía.'
    },
    {
      id: 'q3',
      question: '¿Cuál es la vigencia oficial de la credencial de Guardia de Seguridad emitida por Carabineros OS-10?',
      options: [
        '1 año.',
        '2 años.',
        '3 años.',
        'Indefinida.'
      ],
      correct: 2,
      explanation: 'La acreditación de OS-10 tiene una vigencia legal de 3 años, tras los cuales se debe realizar el curso de Perfeccionamiento.'
    },
    {
      id: 'q4',
      question: 'En la técnica de resolución de conflictos, el primer paso para desescalar una situación agresiva es:',
      options: [
        'Uso de fuerza física inmediata.',
        'Escucha activa, tono calmado y mantenimiento de distancia de seguridad.',
        'Gritar órdenes con tono amenazante.',
        'Ignorar por completo a la persona molesta.'
      ],
      correct: 1,
      explanation: 'La comunicación asertiva, escucha activa y el control de la distancia evitan la confrontación física y calman al infractor.'
    }
  ];

  const toggleModule = (id) => {
    setExpandedModules(prev => ({ ...prev, [id]: !prev[id] }));
  };

  const handleSelectAnswer = (qId, optionIdx) => {
    if (quizSubmitted) return;
    setQuizAnswers(prev => ({ ...prev, [qId]: optionIdx }));
  };

  const handleQuizSubmit = (e) => {
    e.preventDefault();
    let score = 0;
    quizQuestions.forEach(q => {
      if (quizAnswers[q.id] === q.correct) score += 1;
    });
    setQuizScore(score);
    setQuizSubmitted(true);
  };

  const handleResetQuiz = () => {
    setQuizAnswers({});
    setQuizSubmitted(false);
    setQuizScore(0);
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-200">
      
      {/* Top Bar Navigation */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-[#121316] p-4 sm:p-5 rounded-2xl border border-gray-800">
        <div className="flex items-center gap-3">
          <button
            onClick={onBack}
            className="p-2.5 rounded-xl bg-gray-800 hover:bg-gray-700 text-gray-300 hover:text-white transition-colors cursor-pointer flex items-center gap-2 text-xs font-bold"
          >
            <ArrowLeft size={16} />
            <span>Volver a Mis Cursos</span>
          </button>
          <div className="h-6 w-px bg-gray-700 hidden sm:block"></div>
          <div>
            <span className="text-[10px] text-[#00c2b2] font-black uppercase tracking-wider block">
              Aula Virtual Oficial SENCE
            </span>
            <h1 className="text-sm sm:text-base font-bold text-white line-clamp-1">
              {courseTitle || 'Curso de formación Guardia de Seguridad online'}
            </h1>
          </div>
        </div>

        {/* Global Progress */}
        <div className="w-full sm:w-64 bg-gray-900 p-2.5 rounded-xl border border-gray-800 flex items-center gap-3">
          <div className="flex-1 space-y-1">
            <div className="flex justify-between text-[11px] font-bold">
              <span className="text-gray-400">Progreso Total:</span>
              <span className="text-[#00c2b2] font-mono">68%</span>
            </div>
            <div className="w-full h-2 bg-gray-800 rounded-full overflow-hidden">
              <div className="h-full bg-gradient-to-r from-[#0284c7] to-[#00c2b2] rounded-full" style={{ width: '68%' }}></div>
            </div>
          </div>
          <Award size={20} className="text-[#00c2b2] flex-shrink-0" />
        </div>
      </div>

      {/* Main Classroom Layout (Video + Syllabus) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Left Column (8 cols): Video Player + Tab Content */}
        <div className="lg:col-span-8 space-y-6">
          
          {/* HD Virtual Video Player Frame */}
          <div className="bg-black rounded-3xl overflow-hidden border-2 border-sky-950/80 shadow-2xl relative aspect-video flex flex-col justify-between group">
            
            {/* Top Video Overlay */}
            <div className="p-4 bg-gradient-to-b from-black/80 to-transparent flex justify-between items-center text-white z-10">
              <div className="space-y-0.5">
                <span className="text-[10px] text-sky-400 font-bold uppercase tracking-wider">Lección Actual 2.3</span>
                <h3 className="text-xs sm:text-sm font-bold text-white drop-shadow">
                  Resolución de Conflictos y Manejo de Situaciones Difíciles
                </h3>
              </div>
              <span className="text-[10px] bg-sky-500/20 text-[#38bdf8] font-mono px-2 py-0.5 rounded border border-sky-500/40">
                HD 1080p • OS-10
              </span>
            </div>

            {/* Center Play Button Simulator */}
            <div className="absolute inset-0 flex items-center justify-center">
              <button
                onClick={() => setIsPlaying(!isPlaying)}
                className="w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-[#00c2b2]/90 hover:bg-[#00c2b2] text-gray-950 flex items-center justify-center shadow-2xl hover:scale-110 transition-all cursor-pointer"
                aria-label={isPlaying ? 'Pausar clase' : 'Reproducir clase'}
              >
                {isPlaying ? <Pause size={32} /> : <Play size={32} className="translate-x-0.5" />}
              </button>
            </div>

            {/* Bottom Controls Bar */}
            <div className="p-4 bg-gradient-to-t from-black/90 via-black/50 to-transparent flex items-center gap-3 text-white z-10 text-xs">
              <button onClick={() => setIsPlaying(!isPlaying)} className="hover:text-[#00c2b2] transition-colors cursor-pointer">
                {isPlaying ? <Pause size={18} /> : <Play size={18} />}
              </button>
              
              <div className="flex-1 flex items-center gap-2">
                <span className="text-[10px] font-mono text-gray-300">14:22</span>
                <div className="flex-1 h-1.5 bg-gray-700 rounded-full overflow-hidden cursor-pointer">
                  <div className="h-full bg-[#00c2b2] rounded-full" style={{ width: '38%' }}></div>
                </div>
                <span className="text-[10px] font-mono text-gray-400">45:00</span>
              </div>

              <Volume2 size={16} className="text-gray-300 hover:text-white cursor-pointer" />
              <Maximize size={16} className="text-gray-300 hover:text-white cursor-pointer" />
            </div>
          </div>

          {/* Classroom Tabs Navigation */}
          <div className="flex flex-wrap gap-2 border-b border-gray-800 pb-2">
            {[
              { id: 'contenido', label: 'Contenido de la Clase', icon: BookOpen },
              { id: 'material', label: 'Material & Guías PDF', icon: FileText },
              { id: 'examen', label: 'Simulador Examen OS-10', icon: HelpCircle },
              { id: 'certificado', label: 'Certificación Digital', icon: Award },
            ].map(tab => {
              const IconComp = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`px-4 py-2.5 rounded-xl text-xs font-bold flex items-center gap-2 transition-all cursor-pointer ${
                    activeTab === tab.id
                      ? 'bg-[#00c2b2] text-gray-950 shadow-md'
                      : 'bg-[#121316] text-gray-400 hover:text-white border border-gray-800'
                  }`}
                >
                  <IconComp size={15} />
                  <span>{tab.label}</span>
                </button>
              );
            })}
          </div>

          {/* Tab 1: Contenido de la Clase */}
          {activeTab === 'contenido' && (
            <div className="bg-[#121316] p-6 rounded-3xl border border-gray-800 space-y-4 text-gray-300 text-xs sm:text-sm leading-relaxed">
              <h3 className="text-base sm:text-lg font-black text-white">
                Objetivos de Aprendizaje — Lección 2.3
              </h3>
              <p>
                En esta sesión aprenderás los protocolos estandarizados para intervenir en situaciones de tensión, identificar signos no verbales de hostilidad y aplicar técnicas de contención verbal sin recurrir a la fuerza física innecesaria.
              </p>

              <div className="p-4 bg-sky-950/30 rounded-2xl border border-sky-800/40 space-y-2">
                <h4 className="font-bold text-sky-300 flex items-center gap-2">
                  <ShieldCheck size={16} />
                  <span>Principios Clave de la Comunicación Táctica:</span>
                </h4>
                <ul className="list-disc pl-5 space-y-1 text-gray-300">
                  <li><strong>Distancia de Seguridad:</strong> Mantener un mínimo de 1.5 a 2 metros de distancia con el sujeto.</li>
                  <li><strong>Escucha Activa:</strong> Permitir el desahogo inicial sin interrumpir ni manifestar agresividad.</li>
                  <li><strong>Firmeza y Respeto:</strong> Explicar con claridad las normativas del recinto sin caer en provocaciones.</li>
                </ul>
              </div>
            </div>
          )}

          {/* Tab 2: Material Descargable */}
          {activeTab === 'material' && (
            <div className="bg-[#121316] p-6 rounded-3xl border border-gray-800 space-y-4">
              <h3 className="text-base sm:text-lg font-black text-white">
                Documentación y Manuales Oficiales
              </h3>
              
              <div className="space-y-3">
                {[
                  { name: 'Manual Oficial Guardia de Seguridad OS-10 (Edición 2026).pdf', size: '4.8 MB', date: 'Actualizado Agosto 2026' },
                  { name: 'Guía Práctica de Resolución de Conflictos y Crisis.pdf', size: '2.1 MB', date: 'PrevySeg OTEC' },
                  { name: 'Protocolo de Emergencias y Evacuación Arica.pdf', size: '1.5 MB', date: 'Normativa Regional' },
                ].map((doc, idx) => (
                  <div key={idx} className="p-4 bg-[#18191c] rounded-2xl border border-gray-800 flex items-center justify-between gap-3 hover:border-gray-700 transition-colors">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-xl bg-[#0284c7]/20 text-[#38bdf8] flex items-center justify-center flex-shrink-0">
                        <FileText size={20} />
                      </div>
                      <div>
                        <h4 className="text-xs sm:text-sm font-bold text-white">{doc.name}</h4>
                        <span className="text-[10px] text-gray-400">{doc.size} • {doc.date}</span>
                      </div>
                    </div>

                    <button 
                      onClick={() => alert(`Descargando ${doc.name}...`)}
                      className="p-2.5 rounded-xl bg-gray-800 hover:bg-gray-700 text-white cursor-pointer transition-colors"
                      title="Descargar archivo"
                    >
                      <Download size={16} />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Tab 3: Simulador de Examen OS-10 */}
          {activeTab === 'examen' && (
            <div className="bg-[#121316] p-6 rounded-3xl border border-gray-800 space-y-6">
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 pb-4 border-b border-gray-800">
                <div>
                  <h3 className="text-base sm:text-lg font-black text-white">
                    Simulador de Examen Teórico OS-10
                  </h3>
                  <p className="text-xs text-gray-400">
                    Preguntas de selección múltiple con formato oficial de Carabineros de Chile.
                  </p>
                </div>
                <div className="flex items-center gap-2 bg-black/40 px-3 py-1.5 rounded-xl border border-gray-800 text-xs text-sky-400 font-mono">
                  <Clock size={14} />
                  <span>Tiempo restante: 15:00</span>
                </div>
              </div>

              {quizSubmitted ? (
                <div className="space-y-6 animate-in zoom-in-95 duration-200">
                  <div className={`p-6 rounded-2xl border text-center space-y-3 ${
                    quizScore >= 3 
                      ? 'bg-emerald-950/60 border-emerald-500/50 text-emerald-200' 
                      : 'bg-amber-950/60 border-amber-500/50 text-amber-200'
                  }`}>
                    <div className="text-3xl font-black font-mono">
                      {quizScore} / {quizQuestions.length} Correctas ({Math.round((quizScore / quizQuestions.length) * 100)}%)
                    </div>
                    <p className="text-xs sm:text-sm font-medium">
                      {quizScore >= 3 
                        ? '¡Felicitaciones! Has superado el puntaje mínimo de aprobación OS-10 (Exigencia 75%).'
                        : 'Puntaje insuficiente. Te recomendamos repasar los módulos teóricos y volver a intentar.'}
                    </p>
                    <button
                      onClick={handleResetQuiz}
                      className="px-4 py-2 rounded-xl bg-gray-800 hover:bg-gray-700 text-white text-xs font-bold cursor-pointer"
                    >
                      Intentar Nuevamente
                    </button>
                  </div>

                  {/* Question details with explanations */}
                  <div className="space-y-4">
                    {quizQuestions.map((q, idx) => {
                      const isCorrect = quizAnswers[q.id] === q.correct;
                      return (
                        <div key={q.id} className="p-4 rounded-2xl bg-[#18191c] border border-gray-800 space-y-2 text-xs">
                          <div className="flex items-start justify-between gap-2">
                            <span className="font-bold text-white">Pregunta {idx + 1}: {q.question}</span>
                            <span className={`font-bold px-2 py-0.5 rounded text-[10px] ${
                              isCorrect ? 'bg-emerald-500/20 text-emerald-400' : 'bg-rose-500/20 text-rose-400'
                            }`}>
                              {isCorrect ? '✓ Correcta' : '✗ Incorrecta'}
                            </span>
                          </div>
                          <p className="text-gray-400 text-[11px]">
                            <strong className="text-gray-300">Explicación:</strong> {q.explanation}
                          </p>
                        </div>
                      );
                    })}
                  </div>
                </div>
              ) : (
                <form onSubmit={handleQuizSubmit} className="space-y-6">
                  {quizQuestions.map((q, idx) => (
                    <div key={q.id} className="p-4 bg-[#18191c] rounded-2xl border border-gray-800 space-y-3">
                      <h4 className="text-xs sm:text-sm font-bold text-white">
                        {idx + 1}. {q.question}
                      </h4>
                      <div className="space-y-2">
                        {q.options.map((opt, optIdx) => (
                          <button
                            key={optIdx}
                            type="button"
                            onClick={() => handleSelectAnswer(q.id, optIdx)}
                            className={`w-full text-left p-3 rounded-xl text-xs transition-all flex items-center justify-between cursor-pointer ${
                              quizAnswers[q.id] === optIdx
                                ? 'bg-sky-950/80 border border-[#00c2b2] text-white'
                                : 'bg-[#121315] border border-gray-800 text-gray-300 hover:border-gray-700'
                            }`}
                          >
                            <span>{opt}</span>
                            {quizAnswers[q.id] === optIdx && <Check size={14} className="text-[#00c2b2]" />}
                          </button>
                        ))}
                      </div>
                    </div>
                  ))}

                  <button
                    type="submit"
                    disabled={Object.keys(quizAnswers).length < quizQuestions.length}
                    className={`w-full py-3.5 px-4 rounded-xl font-black text-xs sm:text-sm flex items-center justify-center gap-2 shadow-lg transition-all ${
                      Object.keys(quizAnswers).length === quizQuestions.length
                        ? 'bg-[#00c2b2] hover:bg-[#08978a] text-gray-950 cursor-pointer'
                        : 'bg-gray-800 text-gray-500 cursor-not-allowed'
                    }`}
                  >
                    <Send size={15} />
                    <span>Finalizar y Evaluar Examen</span>
                  </button>
                </form>
              )}

            </div>
          )}

          {/* Tab 4: Certificación Digital */}
          {activeTab === 'certificado' && (
            <div className="bg-[#121316] p-6 sm:p-8 rounded-3xl border border-gray-800 text-center space-y-6">
              <div className="w-16 h-16 rounded-full bg-amber-500/20 text-amber-400 flex items-center justify-center mx-auto">
                <Award size={36} />
              </div>
              <div className="space-y-2 max-w-md mx-auto">
                <h3 className="text-xl font-black text-white">Diploma y Certificado de Acreditación</h3>
                <p className="text-xs text-gray-400">
                  Tu certificado digital se desbloquea al completar el 100% de las clases y aprobar el examen teórico.
                </p>
              </div>

              <div className="p-4 bg-[#18191c] rounded-2xl border border-gray-800 max-w-md mx-auto text-xs text-left space-y-2">
                <div className="flex justify-between">
                  <span className="text-gray-400">Estado de Acreditación:</span>
                  <span className="text-emerald-400 font-bold">En Proceso Final</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Código de Registro:</span>
                  <span className="text-white font-mono">PREVY-2026-OS10-0987</span>
                </div>
              </div>

              <button
                onClick={() => alert("Generando y descargando Diploma Oficial PrevySeg en PDF...")}
                className="bg-[#0284c7] hover:bg-[#0369a1] text-white font-bold py-3 px-6 rounded-xl text-xs shadow-lg flex items-center justify-center gap-2 mx-auto cursor-pointer"
              >
                <Download size={15} />
                <span>Descargar Diploma Oficial (PDF)</span>
              </button>
            </div>
          )}

        </div>

        {/* Right Column (4 cols): Course Syllabus & Modules Accordion */}
        <div className="lg:col-span-4 space-y-4">
          <div className="bg-[#121316] p-5 rounded-3xl border border-gray-800 space-y-4">
            <h3 className="text-sm font-black text-white uppercase tracking-wider flex items-center justify-between">
              <span>Temario del Curso</span>
              <span className="text-[10px] text-gray-400 font-normal">4 Módulos</span>
            </h3>

            {/* Modules list */}
            <div className="space-y-3">
              {modules.map((mod) => (
                <div key={mod.id} className="rounded-2xl border border-gray-800 overflow-hidden bg-[#18191c]">
                  <button
                    onClick={() => toggleModule(mod.id)}
                    className="w-full p-3.5 text-left flex items-center justify-between gap-2 hover:bg-gray-800/50 transition-colors cursor-pointer"
                  >
                    <div className="space-y-0.5">
                      <h4 className="text-xs font-bold text-white leading-snug">{mod.title}</h4>
                      <div className="flex items-center gap-2 text-[10px] text-gray-400">
                        <span>{mod.duration}</span>
                        <span>•</span>
                        <span className={mod.progress === 100 ? 'text-emerald-400 font-bold' : 'text-sky-400'}>
                          {mod.progress}% listo
                        </span>
                      </div>
                    </div>
                    {expandedModules[mod.id] ? <ChevronUp size={16} className="text-gray-400" /> : <ChevronDown size={16} className="text-gray-400" />}
                  </button>

                  {/* Lessons list */}
                  {expandedModules[mod.id] && (
                    <div className="p-2 pt-0 space-y-1 border-t border-gray-800/60">
                      {mod.lessons.map((les) => (
                        <div
                          key={les.id}
                          onClick={() => {
                            setActiveLessonId(les.id);
                            setIsPlaying(true);
                          }}
                          className={`p-2.5 rounded-xl text-xs flex items-center justify-between gap-2 cursor-pointer transition-colors ${
                            les.isCurrent
                              ? 'bg-[#00c2b2]/20 border border-[#00c2b2] text-white'
                              : 'hover:bg-gray-800 text-gray-300'
                          }`}
                        >
                          <div className="flex items-center gap-2 min-w-0">
                            {les.completed ? (
                              <CheckCircle2 size={14} className="text-emerald-400 flex-shrink-0" />
                            ) : les.isCurrent ? (
                              <Play size={14} className="text-[#00c2b2] flex-shrink-0" />
                            ) : (
                              <Circle size={14} className="text-gray-600 flex-shrink-0" />
                            )}
                            <span className="text-[11px] truncate">{les.title}</span>
                          </div>
                          <span className="text-[9px] font-mono text-gray-500 flex-shrink-0">{les.duration}</span>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>

          </div>
        </div>

      </div>

    </div>
  );
};
export default CourseClassroomView;
