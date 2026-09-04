import React from 'react';
import { Link as ScrollLink } from 'react-scroll';
import { motion } from 'framer-motion';
import { ArrowRight, ShieldCheck, Award, Sparkles, CheckCircle2 } from 'lucide-react';
import heroImg from '../assets/images/hero_graduation.jpg';

const Hero = ({ onOpenContact, onOpenEnrollment }) => {
  return (
    <section 
      id="inicio" 
      className="relative min-h-[85vh] flex items-center justify-center py-16 lg:py-24 px-4 sm:px-8 overflow-hidden bg-gradient-to-b from-white via-slate-50 to-white"
    >
      {/* Ambient background glows */}
      <div className="absolute top-1/4 left-10 w-96 h-96 bg-sky-500/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 right-10 w-96 h-96 bg-teal-500/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center relative z-10">
        
        {/* Left Content Column with Framer Motion */}
        <motion.div 
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
          className="lg:col-span-6 flex flex-col justify-center text-left space-y-6"
        >
          
          {/* Badge */}
          <motion.div 
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.4 }}
            className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-sky-50 border border-sky-200 text-sky-800 text-xs font-semibold w-fit shadow-sm"
          >
            <Award size={14} className="text-[#0284c7] animate-pulse" />
            <span>Acreditación Oficial SPD (Prevención del Delito) & SENCE NCh 2728</span>
          </motion.div>

          {/* Main Hero Title */}
          <motion.h1 
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.5 }}
            className="text-4xl sm:text-5xl lg:text-[3.25rem] font-extrabold text-slate-900 leading-tight tracking-tight"
          >
            Escuela de Seguridad Privada &{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#0284c7] via-sky-600 to-[#00c2b2] font-black">
              Escuela de Oficios
            </span>
          </motion.h1>

          {/* Description */}
          <motion.p 
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.5 }}
            className="text-slate-600 text-base sm:text-lg leading-relaxed max-w-xl font-normal"
          >
            <strong className="font-bold text-slate-900">PREVYSEG CAPACITACIONES</strong>, líder en formación acelerada y empleabilidad en la Macro Zona Norte. Capacitación 100% online y semipresencial para <span className="text-[#0284c7] font-semibold">Arica, Iquique, Antofagasta y Calama</span> con credencial oficial SPD y oficios industriales de rápida colocación.
          </motion.p>

          {/* Call to Actions */}
          <motion.div 
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.5 }}
            className="flex flex-wrap items-center gap-4 pt-2"
          >
            <ScrollLink
              to="admision"
              spy={true}
              smooth={true}
              offset={-85}
              duration={500}
              className="group"
            >
              <motion.button
                whileHover={{ scale: 1.05, boxShadow: '0 0 25px rgba(0, 194, 178, 0.4)' }}
                whileTap={{ scale: 0.95 }}
                className="bg-gradient-to-r from-[#00c2b2] to-teal-500 hover:from-teal-500 hover:to-teal-600 text-white font-black text-sm px-7 py-3.5 rounded-xl shadow-lg shadow-teal-500/20 border border-teal-400 transition-all duration-200 flex items-center gap-2 cursor-pointer"
              >
                <Sparkles size={16} />
                <span>Llenar Ficha (Abono 50%)</span>
                <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
              </motion.button>
            </ScrollLink>

            <ScrollLink
              to="servicios"
              spy={true}
              smooth={true}
              offset={-85}
              duration={500}
              className="group"
            >
              <motion.button
                whileHover={{ scale: 1.04, boxShadow: '0 0 20px rgba(2, 132, 199, 0.3)' }}
                whileTap={{ scale: 0.96 }}
                className="bg-gradient-to-r from-[#0284c7] to-[#0369a1] hover:from-sky-500 hover:to-sky-700 text-white font-bold text-sm px-6 py-3.5 rounded-xl shadow-lg shadow-sky-500/20 border border-sky-400/30 transition-all duration-200 flex items-center gap-2 cursor-pointer"
              >
                <span>Explorar Cursos</span>
              </motion.button>
            </ScrollLink>

            <ScrollLink
              to="contacto"
              spy={true}
              smooth={true}
              offset={-85}
              duration={500}
            >
              <motion.button
                whileHover={{ scale: 1.04, borderColor: 'rgba(2, 132, 199, 0.5)' }}
                whileTap={{ scale: 0.96 }}
                className="bg-white hover:bg-slate-50 border border-slate-200 hover:border-sky-300 text-slate-700 font-semibold text-sm px-5 py-3.5 rounded-xl transition-all duration-200 cursor-pointer flex items-center gap-2 shadow-sm"
              >
                <ShieldCheck size={16} className="text-[#0284c7]" />
                <span>Contacto</span>
              </motion.button>
            </ScrollLink>
          </motion.div>


          {/* Trust badges */}
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6, duration: 0.5 }}
            className="pt-6 border-t border-slate-200 flex flex-wrap items-center gap-6 text-xs text-slate-500 font-medium"
          >
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-[#00c2b2] shadow-sm shadow-teal-400 animate-ping" />
              <span className="text-slate-700 font-medium">Credencial SPD Oficial</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle2 size={14} className="text-[#0284c7]" />
              <span className="text-slate-700 font-medium">Arica • Iquique • Antofagasta</span>
            </div>
            <div className="flex items-center gap-2">
              <Sparkles size={14} className="text-amber-500" />
              <span className="text-slate-700 font-medium">Declaración Jurada en 1 Hoja</span>
            </div>
          </motion.div>
        </motion.div>

        {/* Right Media Column */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.95, x: 30 }}
          animate={{ opacity: 1, scale: 1, x: 0 }}
          transition={{ duration: 0.7, ease: 'easeOut' }}
          className="lg:col-span-6 flex justify-center lg:justify-end"
        >
          <div className="relative group w-full max-w-xl">
            {/* Background Glow */}
            <div className="absolute -inset-1.5 bg-gradient-to-r from-[#0284c7] via-cyan-400 to-[#00c2b2] rounded-2xl blur-xl opacity-20 group-hover:opacity-40 transition duration-700"></div>
            
            {/* Main Image Frame */}
            <motion.div 
              whileHover={{ y: -4 }}
              transition={{ duration: 0.3 }}
              className="relative rounded-2xl overflow-hidden border border-slate-200 shadow-2xl bg-white"
            >
              <img
                src={heroImg}
                alt="Grupo de egresados de Prevyseg Capacitaciones"
                className="w-full h-auto object-cover transform group-hover:scale-105 transition duration-700 aspect-[16/10]"
                loading="eager"
              />
              {/* Badge overlay on image */}
              <div className="absolute bottom-3 left-3 right-3 bg-white/95 backdrop-blur-md px-4 py-3 rounded-xl border border-slate-200 flex items-center justify-between text-xs text-slate-800 shadow-lg">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-emerald-500" />
                  <span className="font-semibold text-slate-800">Ceremonia de Certificación y Graduación</span>
                </div>
                <span className="text-[#0284c7] font-extrabold bg-sky-50 px-2.5 py-1 rounded-md border border-sky-200">PrevySeg Arica</span>
              </div>
            </motion.div>
          </div>
        </motion.div>

      </div>
    </section>
  );
};

export default Hero;
