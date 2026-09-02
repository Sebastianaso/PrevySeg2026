import React from 'react';
import { motion } from 'framer-motion';
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
    <section className="py-24 px-4 sm:px-8 bg-gradient-to-b from-[#18191c] via-[#141518] to-[#18191c] relative overflow-hidden border-t border-white/10">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
        
        {/* Left Column: Cyan Checkmarks & Button with Framer Motion */}
        <motion.div 
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="lg:col-span-7 space-y-8 text-left"
        >
          
          <div className="space-y-3">
            <span className="text-[#00c2b2] text-xs font-bold tracking-widest uppercase flex items-center gap-2">
              <Zap size={14} className="text-amber-400 animate-pulse" />
              Excelencia y Compromiso Formativo
            </span>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white leading-tight">
              Garantizamos Estándares de <span className="text-[#0284c7]">Seguridad y Confianza</span>
            </h2>
            <p className="text-slate-300 text-base leading-relaxed pt-2">
              En <strong className="text-white">PrevySeg</strong> formamos guardias y vigilantes con una preparación rigurosa y actualizada conforme a las exigencias normativas vigentes en Chile.
            </p>
          </div>

          {/* Cyan Checkmarks List */}
          <div className="space-y-3.5 pt-2">
            {checkmarks.map((item, index) => (
              <motion.div 
                key={index}
                initial={{ opacity: 0, x: -15 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.35, delay: index * 0.06 }}
                className="flex items-start gap-3.5 group p-2.5 rounded-xl hover:bg-white/5 transition-colors"
              >
                <div className="mt-0.5 flex-shrink-0">
                  <CheckCircle2 size={19} className="text-[#00c2b2] group-hover:scale-110 group-hover:text-teal-300 transition-all" />
                </div>
                <p className="text-slate-200 text-sm sm:text-base leading-relaxed font-medium">
                  {item}
                </p>
              </motion.div>
            ))}
          </div>

          {/* Action Button */}
          <div className="pt-3">
            <motion.button
              whileHover={{ scale: 1.04, boxShadow: '0 0 25px rgba(0, 194, 178, 0.4)' }}
              whileTap={{ scale: 0.96 }}
              onClick={onLearnMore}
              className="bg-gradient-to-r from-[#00c2b2] to-teal-400 hover:from-teal-400 hover:to-teal-500 text-gray-950 font-extrabold text-xs uppercase tracking-widest py-4 px-8 rounded-xl shadow-xl shadow-teal-950/50 transition-all duration-200 flex items-center gap-3 cursor-pointer group"
            >
              <span>Conocer Metodología</span>
              <ArrowRight size={16} className="group-hover:translate-x-1.5 transition-transform" />
            </motion.button>
          </div>
        </motion.div>

        {/* Right Column: Square Promotional Image */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.95, x: 30 }}
          whileInView={{ opacity: 1, scale: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="lg:col-span-5 flex justify-center"
        >
          <div className="relative w-full max-w-md">
            {/* Ambient Cyan/Blue Glow */}
            <div className="absolute -inset-2 bg-gradient-to-tr from-[#0284c7]/40 to-[#00c2b2]/40 rounded-3xl blur-2xl opacity-40"></div>
            
            {/* Image Container */}
            <div className="relative rounded-2xl overflow-hidden border border-white/15 shadow-2xl bg-slate-900 aspect-square">
              <img
                src={promoImg}
                alt="Oficial de Seguridad Privada PrevySeg"
                className="w-full h-full object-cover transform hover:scale-105 transition-transform duration-700"
              />
              {/* Floating Stat Badge */}
              <motion.div 
                whileHover={{ y: -2 }}
                className="absolute bottom-4 left-4 right-4 bg-[#0d0e10]/85 backdrop-blur-xl p-4 rounded-xl border border-white/15 shadow-2xl flex items-center gap-4"
              >
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#0284c7]/30 to-[#00c2b2]/30 border border-cyan-400/40 flex items-center justify-center text-[#00c2b2] flex-shrink-0 shadow-md">
                  <Award size={24} />
                </div>
                <div>
                  <div className="text-white font-bold text-sm">15+ Años de Liderazgo</div>
                  <div className="text-slate-400 text-xs">Formando a los mejores profesionales de Arica</div>
                </div>
              </motion.div>
            </div>
          </div>
        </motion.div>

      </div>
    </section>
  );
};

export default ExecutionSection;
