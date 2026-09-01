import React from 'react';
import { CheckCircle2, ArrowRight, ShieldCheck, Award, Zap } from 'lucide-react';
import promoImg from '../assets/images/security_promo.jpg';

const ExecutionSection = ({ onLearnMore }) => {
  const checkmarks = [
    'Instructores certificados con amplia trayectoria en Fuerzas de Orden y Seguridad',
    'Infraestructura moderna con salas equipadas y simuladores de CCTV en tiempo real',
    'Acreditación oficial válida ante OS-10 de Carabineros de Chile y Autoridad Marítima (Directemar)',
    'Metodología teórico-práctica con enfoque en resolución de conflictos y emergencias',
    'Bolsa de trabajo activa con alta tasa de empleabilidad en empresas de Arica',
    'Asesoría integral en la tramitación y renovación de credenciales profesionales',
  ];

  return (
    <section className="py-24 px-4 sm:px-8 bg-[#18191c] relative overflow-hidden border-t border-gray-800/40">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
        
        {/* Left Column: Cyan Checkmarks & Button */}
        <div className="lg:col-span-7 space-y-8 text-left">
          
          <div className="space-y-3">
            <span className="text-[#00c2b2] text-xs font-bold tracking-widest uppercase flex items-center gap-2">
              <Zap size={14} />
              Excelencia y Compromiso Formativo
            </span>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white leading-tight">
              Garantizamos Estándares de <span className="text-[#0284c7]">Seguridad y Confianza</span>
            </h2>
            <p className="text-gray-300 text-base leading-relaxed pt-2">
              En <strong className="text-white">PrevySeg</strong> formamos guardias y vigilantes con una preparación rigurosa y actualizada conforme a las exigencias normativas vigentes en Chile.
            </p>
          </div>

          {/* Cyan Checkmarks List */}
          <div className="space-y-4 pt-2">
            {checkmarks.map((item, index) => (
              <div key={index} className="flex items-start gap-3.5 group">
                <div className="mt-1 flex-shrink-0">
                  <CheckCircle2 size={20} className="text-[#00c2b2] group-hover:scale-110 transition-transform" />
                </div>
                <p className="text-gray-200 text-sm sm:text-base leading-relaxed font-medium">
                  {item}
                </p>
              </div>
            ))}
          </div>

          {/* Action Button */}
          <div className="pt-4">
            <button
              onClick={onLearnMore}
              className="bg-[#00c2b2] hover:bg-[#08978a] active:scale-95 text-gray-900 font-extrabold text-xs uppercase tracking-widest py-4 px-8 rounded shadow-lg shadow-teal-900/30 transition-all duration-200 flex items-center gap-3 cursor-pointer group"
            >
              <span>Learn More</span>
              <ArrowRight size={16} className="group-hover:translate-x-1.5 transition-transform" />
            </button>
          </div>
        </div>

        {/* Right Column: Square Promotional Image */}
        <div className="lg:col-span-5 flex justify-center">
          <div className="relative w-full max-w-md">
            {/* Ambient Cyan/Blue Glow */}
            <div className="absolute -inset-2 bg-gradient-to-tr from-[#0284c7]/30 to-[#00c2b2]/30 rounded-3xl blur-xl"></div>
            
            {/* Image Container */}
            <div className="relative rounded-2xl overflow-hidden border border-gray-700 shadow-2xl bg-gray-900 aspect-square">
              <img
                src={promoImg}
                alt="Oficial de Seguridad Privada PrevySeg"
                className="w-full h-full object-cover transform hover:scale-105 transition-transform duration-700"
              />
              {/* Floating Floating Stat Badge */}
              <div className="absolute bottom-4 left-4 right-4 bg-gray-950/85 backdrop-blur-md p-4 rounded-xl border border-gray-700/60 shadow-xl flex items-center gap-4">
                <div className="w-12 h-12 rounded-xl bg-[#0284c7]/20 border border-[#0284c7]/50 flex items-center justify-center text-[#00c2b2] flex-shrink-0">
                  <Award size={24} />
                </div>
                <div>
                  <div className="text-white font-bold text-sm">15+ Años de Liderazgo</div>
                  <div className="text-gray-400 text-xs">Formando a los mejores profesionales de Arica</div>
                </div>
              </div>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
};

export default ExecutionSection;
