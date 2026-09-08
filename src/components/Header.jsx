import React, { useState, useEffect } from 'react';
import { Link as ScrollLink } from 'react-scroll';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Phone, 
  Mail, 
  MapPin, 
  Search, 
  Menu, 
  X,
  LogOut
} from 'lucide-react';
import { FacebookIcon, TwitterIcon, InstagramIcon, YoutubeIcon } from './SocialIcons';
import prevysegLogo from '../assets/images/prevyseg_logo.png';

// Icono de red/nodos idéntico al de Plataforma Virtual
const VirtualPlatformIcon = ({ className = "w-4 h-4 text-cyan-300" }) => (
  <svg 
    className={className} 
    viewBox="0 0 24 24" 
    fill="none" 
    stroke="currentColor" 
    strokeWidth="2.2" 
    strokeLinecap="round" 
    strokeLinejoin="round"
  >
    <circle cx="12" cy="12" r="2.8" fill="currentColor" />
    <circle cx="19" cy="6" r="2.2" fill="currentColor" />
    <circle cx="5" cy="8" r="2.2" fill="currentColor" />
    <circle cx="18" cy="18" r="2.2" fill="currentColor" />
    <line x1="12" y1="12" x2="19" y2="6" stroke="currentColor" strokeWidth="2" />
    <line x1="12" y1="12" x2="5" y2="8" stroke="currentColor" strokeWidth="2" />
    <line x1="12" y1="12" x2="18" y2="18" stroke="currentColor" strokeWidth="2" />
  </svg>
);

const Header = ({ onOpenPlatform, onOpenSearch, onOpenEnrollment, currentUser, onLogout }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { name: 'INICIO', to: 'inicio' },
    { name: 'QUIÉNES SOMOS', to: 'quienes-somos' },
    { name: 'ESCUELAS', to: 'escuelas' },
    { name: 'CONTACTO', to: 'contacto' },
  ];

  return (
    <header className="sticky top-0 z-50 w-full transition-all duration-300 shadow-xs">
      
      {/* 1. Top Bar Azul Marino PrevySeg (#072B4F) con Acreditación SPD & SENCE e información de contacto */}
      <div className="bg-[#072B4F] text-white py-2 px-4 sm:px-8 border-b border-white/10 text-xs">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-2">
          
          {/* Badge Acreditación y Redes Sociales */}
          <div className="flex items-center space-x-3 text-slate-200">
            <span className="bg-[#00A896]/20 text-[#00FFE0] text-[10px] font-extrabold uppercase px-2.5 py-1 rounded border border-[#00A896]/50 tracking-wider shadow-xs">
              ACREDITACIÓN SPD (SUBSECRETARÍA DE PREVENCIÓN DEL DELITO) & SENCE
            </span>
            <div className="h-3.5 w-px bg-white/20 hidden sm:block"></div>
            <motion.a 
              whileHover={{ scale: 1.15, color: '#38bdf8' }}
              href="https://facebook.com" 
              target="_blank" 
              rel="noreferrer" 
              aria-label="Facebook PrevySeg"
              className="text-white/80 hover:text-white transition-colors duration-200"
            >
              <FacebookIcon size={14} />
            </motion.a>
            <motion.a 
              whileHover={{ scale: 1.15, color: '#38bdf8' }}
              href="https://twitter.com" 
              target="_blank" 
              rel="noreferrer" 
              aria-label="Twitter PrevySeg"
              className="text-white/80 hover:text-white transition-colors duration-200"
            >
              <TwitterIcon size={14} />
            </motion.a>
            <motion.a 
              whileHover={{ scale: 1.15, color: '#38bdf8' }}
              href="https://instagram.com" 
              target="_blank" 
              rel="noreferrer" 
              aria-label="Instagram PrevySeg"
              className="text-white/80 hover:text-white transition-colors duration-200"
            >
              <InstagramIcon size={14} />
            </motion.a>
            <motion.a 
              whileHover={{ scale: 1.15, color: '#38bdf8' }}
              href="https://youtube.com" 
              target="_blank" 
              rel="noreferrer" 
              aria-label="YouTube PrevySeg"
              className="text-white/80 hover:text-white transition-colors duration-200"
            >
              <YoutubeIcon size={14} />
            </motion.a>
          </div>

          {/* Información de Contacto Superior */}
          <div className="flex flex-wrap items-center justify-center gap-x-3.5 gap-y-1 font-medium text-[11px] sm:text-xs text-white/90">
            <a 
              href="tel:+56978691869" 
              className="flex items-center gap-1.5 hover:text-[#00FFE0] transition-colors"
            >
              <Phone size={12} className="text-white fill-white" />
              <span className="font-semibold">+56 9 7869 1869</span>
            </a>
            <span className="text-white/30 hidden sm:inline">|</span>
            <a 
              href="mailto:prevyseg.capacitaciones@gmail.com" 
              className="flex items-center gap-1.5 hover:text-[#00FFE0] transition-colors"
            >
              <Mail size={12} className="text-white" />
              <span>prevyseg.capacitaciones@gmail.com</span>
            </a>
            <span className="text-white/30 hidden md:inline">|</span>
            <span className="flex items-center gap-1.5 text-white/90">
              <MapPin size={12} className="text-white" />
              <span>Blanco Encalada #666, Arica. Chile</span>
            </span>
          </div>
        </div>
      </div>

      {/* 2. Barra Principal de Navegación (Blanca, limpia, horizontal) */}
      <nav className={`bg-white border-b border-slate-200 transition-all duration-300 ${
        isScrolled ? 'py-2.5 shadow-md shadow-slate-900/5' : 'py-3'
      } px-4 sm:px-8`}>
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          
          {/* Logo PrevySeg */}
          <ScrollLink 
            to="inicio" 
            spy={true} 
            smooth={true} 
            offset={-90} 
            duration={500}
            className="cursor-pointer group flex items-center select-none py-0.5"
            title="PrevySeg - Organismos Técnicos de Capacitación"
          >
            <img 
              src={prevysegLogo} 
              alt="PrevySeg - Organismos Técnicos de Capacitación" 
              className="h-10 sm:h-12 w-auto object-contain transition-transform duration-200 group-hover:scale-105"
            />
          </ScrollLink>

          {/* Menú de Enlaces Desktop */}
          <div className="hidden lg:flex items-center space-x-6 xl:space-x-8 text-xs font-bold tracking-wider">
            {navItems.map((item) => (
              <ScrollLink
                key={item.name}
                to={item.to}
                spy={true}
                smooth={true}
                offset={-85}
                duration={500}
                onClick={() => {
                  if (item.to === 'admision') {
                    if (onOpenEnrollment) onOpenEnrollment('');
                    window.dispatchEvent(new CustomEvent('open-admission'));
                  }
                }}
                activeClass="text-[#0A4DA2] font-black"
                className="text-slate-700 hover:text-[#0A4DA2] cursor-pointer py-1 transition-colors duration-200 tracking-wider relative group"
              >
                {item.name}
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-[#0A4DA2] transition-all duration-300 group-hover:w-full" />
              </ScrollLink>
            ))}

            {/* Botón Circular de Búsqueda */}
            <motion.button
              whileHover={{ scale: 1.08 }}
              whileTap={{ scale: 0.94 }}
              onClick={onOpenSearch}
              className="w-9 h-9 rounded-full border border-slate-200 hover:border-[#0A4DA2]/40 text-slate-500 hover:text-[#0A4DA2] bg-slate-50 hover:bg-white flex items-center justify-center transition-colors cursor-pointer shadow-2xs"
              aria-label="Buscar cursos"
              title="Buscar cursos (Ctrl+K)"
            >
              <Search size={16} />
            </motion.button>

            {/* Botón Azul PLATAFORMA VIRTUAL */}
            <div className="flex items-center gap-2">
              <motion.button
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                onClick={onOpenPlatform}
                className="bg-[#0A4DA2] hover:bg-[#073570] text-white text-xs font-extrabold uppercase tracking-wider py-3 px-6 rounded-lg shadow-md shadow-[#0A4DA2]/25 border border-[#0A4DA2] transition-all duration-200 flex items-center gap-2.5 cursor-pointer"
                title="Ingresar a la Plataforma Virtual"
              >
                <VirtualPlatformIcon className="w-4 h-4 text-cyan-300" />
                <span>PLATAFORMA VIRTUAL</span>
                {currentUser && (
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping ml-1" title="Sesión activa" />
                )}
              </motion.button>

              {currentUser && onLogout && (
                <button
                  onClick={onLogout}
                  className="text-slate-400 hover:text-red-500 p-2 rounded-lg hover:bg-slate-100 transition-colors cursor-pointer"
                  title="Cerrar sesión activa"
                  aria-label="Cerrar sesión"
                >
                  <LogOut size={16} />
                </button>
              )}
            </div>

          </div>

          {/* Botones de Control para Dispositivos Móviles */}
          <div className="flex items-center gap-2 lg:hidden">
            <motion.button
              whileTap={{ scale: 0.9 }}
              onClick={onOpenSearch}
              className="w-9 h-9 flex items-center justify-center text-slate-600 hover:text-[#0A4DA2] rounded-lg border border-slate-200 bg-slate-50"
              aria-label="Buscar"
            >
              <Search size={18} />
            </motion.button>
            <motion.button
              whileTap={{ scale: 0.9 }}
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="w-9 h-9 flex items-center justify-center text-slate-700 hover:text-slate-900 rounded-lg border border-slate-200 bg-slate-50 focus:outline-none"
              aria-label="Abrir menú"
            >
              {mobileMenuOpen ? <X size={22} /> : <Menu size={22} />}
            </motion.button>
          </div>
        </div>

        {/* Menú Desplegable Móvil */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.25 }}
              className="lg:hidden mt-3 pt-3 border-t border-slate-200 flex flex-col space-y-2 pb-3 overflow-hidden bg-white/98 rounded-2xl p-3 shadow-lg"
            >
              {navItems.map((item) => (
                <ScrollLink
                  key={item.name}
                  to={item.to}
                  spy={true}
                  smooth={true}
                  offset={-85}
                  duration={500}
                  onClick={() => {
                    setMobileMenuOpen(false);
                    if (item.to === 'admision') {
                      if (onOpenEnrollment) onOpenEnrollment('');
                      window.dispatchEvent(new CustomEvent('open-admission'));
                    }
                  }}
                  activeClass="text-[#0A4DA2] font-black bg-blue-50"
                  className="text-slate-700 hover:text-[#0A4DA2] text-sm font-semibold tracking-wider px-3 py-2.5 rounded-lg transition-colors cursor-pointer hover:bg-slate-50"
                >
                  {item.name}
                </ScrollLink>
              ))}

              <div className="pt-2">
                <motion.button
                  whileTap={{ scale: 0.96 }}
                  onClick={() => {
                    setMobileMenuOpen(false);
                    onOpenPlatform();
                  }}
                  className="w-full bg-[#0A4DA2] hover:bg-[#073570] text-white text-xs font-extrabold uppercase tracking-wider py-3.5 px-4 rounded-lg shadow-md text-center flex items-center justify-center gap-2 cursor-pointer border border-[#0A4DA2]"
                >
                  <VirtualPlatformIcon className="w-4 h-4 text-cyan-300" />
                  <span>PLATAFORMA VIRTUAL</span>
                  {currentUser && (
                    <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping ml-1" />
                  )}
                </motion.button>
              </div>

              {currentUser && onLogout && (
                <div className="pt-1 text-center">
                  <button
                    onClick={() => {
                      setMobileMenuOpen(false);
                      onLogout();
                    }}
                    className="text-xs font-bold text-red-600 hover:text-red-700 py-1.5 cursor-pointer"
                  >
                    Cerrar sesión activa ({currentUser.user || currentUser.email})
                  </button>
                </div>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </nav>
    </header>
  );
};

export default Header;
