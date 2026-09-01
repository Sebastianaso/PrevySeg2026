import React from 'react';
import { Link as ScrollLink } from 'react-scroll';
import { ArrowRight, ShieldCheck, Award } from 'lucide-react';
import heroImg from '../assets/images/hero_graduation.jpg';

const Hero = ({ onOpenContact }) => {
  return (
    <section 
      id="inicio" 
      className="relative min-h-[82vh] flex items-center justify-center py-16 lg:py-24 px-4 sm:px-8 overflow-hidden"
    >
      <div className="max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center relative z-10">
        
        {/* Left Content Column */}
        <div className="lg:col-span-6 flex flex-col justify-center text-left space-y-6">
          
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-sky-950/70 border border-sky-500/30 text-sky-300 text-xs font-semibold w-fit backdrop-blur-sm">
            <Award size={14} className="text-[#00c2b2]" />
            <span>Acreditación Oficial SENCE & OS-10</span>
          </div>

          {/* Main Hero Title */}
          <h1 className="text-4xl sm:text-5xl lg:text-[3.25rem] font-extrabold text-white leading-tight tracking-tight">
            Organismo Técnico De Capacitación{' '}
            <span className="text-[#0284c7] font-black">Prevy</span>
            <span className="text-[#00c2b2] font-black">seg</span>
          </h1>

          {/* Description matching screenshot */}
          <p className="text-gray-300 text-base sm:text-lg leading-relaxed max-w-xl font-normal">
            <strong className="font-bold text-gray-100">PREVYSEG CAPACITACIONES</strong>, autorizada por{' '}
            <span className="text-[#00c2b2] font-semibold">SENCE</span>. Más de 15 años de experiencia en la ciudad de Arica preparando a los mejores profesionales en seguridad privada.
          </p>

          {/* Call to Actions */}
          <div className="flex flex-wrap items-center gap-4 pt-4">
            <ScrollLink
              to="servicios"
              spy={true}
              smooth={true}
              offset={-85}
              duration={500}
              className="bg-[#0284c7] hover:bg-[#0369a1] active:scale-95 text-white font-bold text-sm px-7 py-3.5 rounded shadow-lg shadow-sky-900/40 transition-all duration-200 flex items-center gap-2 cursor-pointer group"
            >
              <span>Ver Programas</span>
              <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
            </ScrollLink>

            <button
              onClick={onOpenContact}
              className="bg-gray-800/80 hover:bg-gray-700/80 border border-gray-700 hover:border-gray-500 text-gray-200 font-semibold text-sm px-6 py-3.5 rounded transition-all duration-200 cursor-pointer flex items-center gap-2 backdrop-blur-sm"
            >
              <ShieldCheck size={16} className="text-[#00c2b2]" />
              <span>Solicitar Información</span>
            </button>
          </div>

          {/* Trust badges */}
          <div className="pt-6 border-t border-gray-800/80 flex items-center gap-6 text-xs text-gray-400">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-[#00c2b2] animate-pulse"></div>
              <span>Matrículas Abiertas 2026</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-[#0284c7]"></div>
              <span>Arica y Región Norte</span>
            </div>
          </div>
        </div>

        {/* Right Media Column (Photo from screenshot) */}
        <div className="lg:col-span-6 flex justify-center lg:justify-end">
          <div className="relative group w-full max-w-xl">
            {/* Background Glow */}
            <div className="absolute -inset-1 bg-gradient-to-r from-[#0284c7] to-[#00c2b2] rounded-xl blur-lg opacity-25 group-hover:opacity-40 transition duration-500"></div>
            
            {/* Main Image Frame */}
            <div className="relative rounded-xl overflow-hidden border border-gray-700/80 shadow-2xl bg-gray-900">
              <img
                src={heroImg}
                alt="Grupo de egresados de Prevyseg Capacitaciones"
                className="w-full h-auto object-cover transform group-hover:scale-102 transition duration-700 aspect-[16/10]"
                loading="eager"
              />
              {/* Badge overlay on image */}
              <div className="absolute bottom-3 left-3 right-3 bg-black/70 backdrop-blur-md px-4 py-2.5 rounded-lg border border-white/10 flex items-center justify-between text-xs text-white">
                <span className="font-semibold text-gray-200">Ceremonia de Certificación y Graduación</span>
                <span className="text-[#00c2b2] font-bold">PrevySeg Arica</span>
              </div>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
};

export default Hero;
