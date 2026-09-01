import React, { useState, useEffect } from 'react';
import { 
  Award, 
  Calendar, 
  Clock, 
  DollarSign, 
  CheckCircle2, 
  Sparkles, 
  ArrowRight, 
  BookOpen, 
  ShieldCheck, 
  Tag, 
  Search, 
  X,
  CreditCard
} from 'lucide-react';
import blogCctv from '../../assets/images/blog_cctv.jpg';
import promoImg from '../../assets/images/security_promo.jpg';
import blogPort from '../../assets/images/blog_port_security.jpg';
import blogFirstAid from '../../assets/images/blog_first_aid.jpg';
import heroGrad from '../../assets/images/hero_graduation.jpg';

/////AGREGAR BASE DE DATOS/DOMINIO AQUI///
const API_BASE_URL = "/////AGREGAR BASE DE DATOS/DOMINIO AQUI///";
const EXTRA_COURSES_ENDPOINT = `${API_BASE_URL}/api/v1/capacitaciones-extras`; /////AGREGAR BASE DE DATOS/DOMINIO AQUI///

const ExtraCoursesView = ({ currentUser }) => {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [selectedCourseForModal, setSelectedCourseForModal] = useState(null);
  const [enrollSuccess, setEnrollSuccess] = useState(false);

  // useEffect simulando fetch de capacitaciones extras desde Base de Datos
  useEffect(() => {
    const fetchExtraCourses = async () => {
      setLoading(true);
      try {
        /////AGREGAR BASE DE DATOS/DOMINIO AQUI///
        // En producción:
        // const response = await fetch(EXTRA_COURSES_ENDPOINT);
        // const data = await response.json();
        // setCourses(data);

        const mockCourses = [
          {
            id: 'extra-01',
            title: 'Diplomado en Supervisión y Liderazgo de Seguridad Privada',
            category: 'Supervisión & Liderazgo',
            price: '$180.000 CLP',
            priceNumber: 180000,
            days: 'Lunes y Miércoles',
            hours: '19:00 a 22:00 hrs',
            startDate: '15 Septiembre, 2026',
            endDate: '30 Octubre, 2026',
            totalHours: '60 Horas Sincrónicas',
            senceCode: 'Cod. SENCE: 123809912',
            image: promoImg,
            highlight: 'Alta demanda laboral',
            description: 'Especialización orientada a la gestión de turnos de vigilancia, resolución de crisis, confección de directivas de funcionamiento y liderazgo de equipos de guardias.',
          },
          {
            id: 'extra-02',
            title: 'Operador de Drones y Vigilancia Aérea Perimetral',
            category: 'Tecnología Avanzada',
            price: '$150.000 CLP',
            priceNumber: 150000,
            days: 'Martes y Jueves',
            hours: '18:30 a 21:30 hrs',
            startDate: '22 Septiembre, 2026',
            endDate: '24 Octubre, 2026',
            totalHours: '45 Horas Teórico-Prácticas',
            senceCode: 'Cod. SENCE: 123809950',
            image: blogCctv,
            highlight: 'Tecnología 2026',
            description: 'Entrenamiento certificado para pilotaje de RPAS en seguridad privada, patrullaje perimetral nocturno con cámaras térmicas y normativas DGAC.',
          },
          {
            id: 'extra-03',
            title: 'Defensa Personal Táctica y Control de Sujetos Hostiles',
            category: 'Tácticas & Defensa',
            price: '$85.000 CLP',
            priceNumber: 85000,
            days: 'Sábados Intensivo',
            hours: '09:00 a 14:00 hrs',
            startDate: '05 Octubre, 2026',
            endDate: '07 Noviembre, 2026',
            totalHours: '30 Horas Prácticas en Dojo',
            senceCode: 'Cod. SENCE: 123809988',
            image: heroGrad,
            highlight: 'Entrenamiento Físico',
            description: 'Técnicas no letales de neutralización, desarme de armas blancas, uso de esposas de seguridad y legítima defensa conforme a la ley chilena.',
          },
          {
            id: 'extra-04',
            title: 'Seguridad en Instalaciones Portuarias y Código PBIP',
            category: 'Seguridad Portuaria',
            price: '$210.000 CLP',
            priceNumber: 210000,
            days: 'Lunes, Miércoles y Viernes',
            hours: '19:00 a 21:30 hrs',
            startDate: '01 Octubre, 2026',
            endDate: '20 Noviembre, 2026',
            totalHours: '80 Horas Acreditadas',
            senceCode: 'Cod. SENCE: 123801299',
            image: blogPort,
            highlight: 'Certificación Directemar',
            description: 'Especialización según directrices internacionales de la OMI y Directemar para recintos aduaneros y terminales de carga en el Puerto de Arica.',
          },
          {
            id: 'extra-05',
            title: 'Primeros Auxilios Tácticos y Manejo de Trauma en Emergencias',
            category: 'Salud & Rescate',
            price: '$75.000 CLP',
            priceNumber: 75000,
            days: 'Sábados y Domingos',
            hours: '10:00 a 14:00 hrs',
            startDate: '12 Octubre, 2026',
            endDate: '26 Octubre, 2026',
            totalHours: '24 Horas con Certificado',
            senceCode: 'Cod. SENCE: 123804421',
            image: blogFirstAid,
            highlight: 'Certificación Cruz Roja',
            description: 'Protocolos de contención de hemorragias, reanimación cardiopulmonar con DEA y traslado de heridos en situaciones de desastre o asalto.',
          },
          {
            id: 'extra-06',
            title: 'Auditor Interno de Seguridad Física y Gestión de Riesgos',
            category: 'Gestión Normativa',
            price: '$160.000 CLP',
            priceNumber: 160000,
            days: 'Martes y Viernes',
            hours: '19:30 a 22:00 hrs',
            startDate: '20 Octubre, 2026',
            endDate: '30 Noviembre, 2026',
            totalHours: '50 Horas',
            senceCode: 'Cod. SENCE: 123808801',
            image: promoImg,
            highlight: 'Normas ISO / OTEC',
            description: 'Metodologías para evaluación de vulnerabilidades, matriz de riesgos en empresas e implementación de planes de contingencia aprobados por OS-10.',
          },
        ];

        setTimeout(() => {
          setCourses(mockCourses);
          setLoading(false);
        }, 300);

      } catch (error) {
        console.error("Error al obtener cursos extras:", error);
        setLoading(false);
      }
    };

    fetchExtraCourses();
  }, []);

  const filtered = courses.filter(c => 
    c.title.toLowerCase().includes(search.toLowerCase()) || 
    c.category.toLowerCase().includes(search.toLowerCase())
  );

  const handleEnrollSubmit = (e) => {
    e.preventDefault();
    setEnrollSuccess(true);
    setTimeout(() => {
      setEnrollSuccess(false);
      setSelectedCourseForModal(null);
      alert(`¡Inscripción exitosa en ${selectedCourseForModal.title}! Se ha enviado la confirmación y el cupón de pago a tu correo institucional.`);
    }, 1200);
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-200">
      
      {/* Encabezado Principal */}
      <div className="bg-gradient-to-r from-blue-950 via-slate-900 to-gray-900 p-6 sm:p-8 rounded-3xl border border-sky-900/40 shadow-xl flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
        <div className="space-y-2">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-sky-500/20 text-[#38bdf8] text-xs font-bold border border-sky-500/30">
            <Sparkles size={14} />
            <span>Catálogo Exclusivo para Alumnos PrevySeg</span>
          </div>
          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-white tracking-tight">
            Capacitaciones y Certificaciones Extras
          </h1>
          <p className="text-xs sm:text-sm text-gray-300 max-w-2xl leading-relaxed">
            Amplía tu currículum y perfil profesional con cursos de especialización técnica complementaria. Aplica a beneficios SENCE y descuentos preferenciales para alumnos.
          </p>
        </div>

        {/* Buscador de cursos */}
        <div className="relative w-full md:w-72">
          <input
            type="text"
            placeholder="Buscar por curso o área..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full bg-[#121315] border border-gray-700/80 rounded-xl pl-10 pr-4 py-2.5 text-xs sm:text-sm text-white placeholder-gray-500 focus:outline-none focus:border-[#0284c7] shadow-inner"
          />
          <Search size={16} className="absolute left-3.5 top-3 text-gray-400" />
        </div>
      </div>

      {/* Grid de Tarjetas de Cursos Extras */}
      {loading ? (
        <div className="py-20 text-center text-gray-400">
          <div className="inline-block w-8 h-8 border-2 border-[#0284c7] border-t-transparent rounded-full animate-spin mb-3"></div>
          <p className="text-sm">Cargando capacitaciones extras desde el servidor SENCE...</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filtered.map((course) => (
            <div
              key={course.id}
              className="bg-[#121316] rounded-2xl overflow-hidden border border-gray-800 hover:border-sky-500/40 transition-all duration-300 shadow-xl flex flex-col justify-between group hover:-translate-y-1"
            >
              {/* Media Header */}
              <div className="relative aspect-[16/9] bg-gray-950 overflow-hidden">
                <img
                  src={course.image}
                  alt={course.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 opacity-80"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#121316] via-transparent to-black/60"></div>
                
                {/* Category Badge */}
                <div className="absolute top-3 left-3">
                  <span className="bg-[#0284c7] text-white text-[10px] font-black uppercase tracking-wider px-2.5 py-1 rounded-full shadow border border-sky-400/40">
                    {course.category}
                  </span>
                </div>

                {/* Highlight Tag */}
                <div className="absolute top-3 right-3">
                  <span className="bg-emerald-950/80 backdrop-blur-sm text-emerald-300 text-[10px] font-bold px-2.5 py-0.5 rounded-full border border-emerald-500/40">
                    {course.highlight}
                  </span>
                </div>

                {/* Price pill */}
                <div className="absolute bottom-3 right-3 bg-black/85 backdrop-blur-md px-3 py-1 rounded-lg border border-white/10 text-white font-extrabold text-sm font-mono shadow-md">
                  {course.price}
                </div>
              </div>

              {/* Body */}
              <div className="p-6 space-y-4 flex-1 flex flex-col justify-between">
                <div className="space-y-3">
                  <h3 className="text-base font-bold text-white group-hover:text-[#38bdf8] transition-colors leading-snug">
                    {course.title}
                  </h3>

                  <p className="text-xs text-gray-400 leading-relaxed line-clamp-2">
                    {course.description}
                  </p>

                  {/* Course Details (Días, Horas, Inicio/Término) */}
                  <div className="space-y-2 pt-2 border-t border-gray-800/80 text-xs text-gray-300 font-medium">
                    
                    {/* Días de la semana */}
                    <div className="flex items-center gap-2 text-sky-300 font-semibold">
                      <Calendar size={14} className="text-[#0284c7] flex-shrink-0" />
                      <span>Días: <strong className="text-white font-bold">{course.days}</strong></span>
                    </div>

                    {/* Horarios */}
                    <div className="flex items-center gap-2 text-gray-400">
                      <Clock size={14} className="text-[#00c2b2] flex-shrink-0" />
                      <span>{course.hours} • ({course.totalHours})</span>
                    </div>

                    {/* Fechas de inicio y término */}
                    <div className="bg-[#18191c] p-2.5 rounded-xl border border-gray-800 text-[11px] flex justify-between items-center">
                      <div>
                        <span className="text-gray-500 block text-[10px]">Inicio:</span>
                        <strong className="text-gray-200">{course.startDate}</strong>
                      </div>
                      <div className="text-right">
                        <span className="text-gray-500 block text-[10px]">Término:</span>
                        <strong className="text-gray-200">{course.endDate}</strong>
                      </div>
                    </div>

                  </div>
                </div>

                {/* Botones de acción */}
                <div className="pt-4 border-t border-gray-800 flex items-center gap-2">
                  <button
                    onClick={() => setSelectedCourseForModal(course)}
                    className="flex-1 bg-[#0284c7] hover:bg-[#0369a1] active:scale-95 text-white text-xs font-bold py-2.5 px-4 rounded-xl shadow-lg transition-all cursor-pointer flex items-center justify-center gap-2"
                  >
                    <span>Inscribirse</span>
                    <ArrowRight size={14} />
                  </button>
                  <button
                    onClick={() => setSelectedCourseForModal(course)}
                    className="border border-gray-700 hover:border-gray-500 hover:bg-gray-800 text-gray-300 text-xs font-semibold py-2.5 px-3 rounded-xl transition-colors cursor-pointer"
                  >
                    Detalles
                  </button>
                </div>
              </div>

            </div>
          ))}
        </div>
      )}

      {/* Modal de Inscripción / Detalles */}
      {selectedCourseForModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in">
          <div className="bg-[#18191c] border border-gray-700 w-full max-w-lg rounded-2xl shadow-2xl p-6 sm:p-8 relative max-h-[90vh] overflow-y-auto">
            <button
              onClick={() => setSelectedCourseForModal(null)}
              className="absolute top-4 right-4 text-gray-400 hover:text-white p-2 rounded-full hover:bg-gray-800 transition-colors"
            >
              <X size={20} />
            </button>

            <div className="space-y-5">
              <div className="flex items-center gap-2">
                <span className="text-[10px] font-bold text-[#0284c7] bg-sky-950 px-2.5 py-0.5 rounded-full border border-sky-800 uppercase">
                  {selectedCourseForModal.category}
                </span>
                <span className="text-xs text-emerald-400 font-bold">{selectedCourseForModal.highlight}</span>
              </div>

              <h2 className="text-xl font-bold text-white leading-snug">
                {selectedCourseForModal.title}
              </h2>

              <div className="p-4 bg-[#121316] rounded-xl border border-gray-800 space-y-2 text-xs">
                <div className="flex justify-between">
                  <span className="text-gray-400">Valor de la capacitación:</span>
                  <strong className="text-lg font-black text-[#00c2b2] font-mono">{selectedCourseForModal.price}</strong>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Días de cursada:</span>
                  <strong className="text-gray-200">{selectedCourseForModal.days}</strong>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Horario:</span>
                  <strong className="text-gray-200">{selectedCourseForModal.hours}</strong>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Periodo académico:</span>
                  <strong className="text-gray-200">{selectedCourseForModal.startDate} - {selectedCourseForModal.endDate}</strong>
                </div>
              </div>

              <p className="text-xs text-gray-300 leading-relaxed">
                {selectedCourseForModal.description}
              </p>

              <form onSubmit={handleEnrollSubmit} className="space-y-4 pt-2 border-t border-gray-800">
                <div className="text-xs text-gray-400 font-semibold">
                  Postulando como alumno: <strong className="text-white">{currentUser?.nombre || 'Alumno Registrado'}</strong> ({currentUser?.rut})
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-[11px] text-gray-400 mb-1 font-semibold">Método de Financiamiento</label>
                    <select className="w-full bg-[#121315] border border-gray-700 rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-[#0284c7]">
                      <option>Franquicia Tributaria SENCE</option>
                      <option>Pago Directo (Webpay / Tarjeta)</option>
                      <option>Convenio Empresa</option>
                      <option>Beca Alumno Egresado (20% OFF)</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-[11px] text-gray-400 mb-1 font-semibold">Teléfono de Contacto</label>
                    <input
                      type="tel"
                      required
                      defaultValue="+56 9 7869 1869"
                      className="w-full bg-[#121315] border border-gray-700 rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-[#0284c7]"
                    />
                  </div>
                </div>

                <div className="pt-3 flex justify-end gap-3">
                  <button
                    type="button"
                    onClick={() => setSelectedCourseForModal(null)}
                    className="px-4 py-2 text-xs font-semibold text-gray-400 hover:text-white rounded-lg cursor-pointer"
                  >
                    Cerrar
                  </button>
                  <button
                    type="submit"
                    className="px-6 py-2.5 text-xs font-bold text-white bg-[#0284c7] hover:bg-[#0369a1] rounded-xl shadow-lg cursor-pointer flex items-center gap-2"
                  >
                    <CreditCard size={15} />
                    <span>Confirmar Postulación</span>
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};

export default ExtraCoursesView;
