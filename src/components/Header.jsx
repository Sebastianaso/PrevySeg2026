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
  ExternalLink,
  Sparkles
} from 'lucide-react';
import { FacebookIcon, TwitterIcon, InstagramIcon, YoutubeIcon } from './SocialIcons';

const Header = ({ onOpenPlatform, onOpenSearch }) => {
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
    { name: 'QUIENES SOMOS', to: 'quienes-somos' },
    { name: 'SERVICIOS', to: 'servicios' },
    { name: 'CONTACTO', to: 'contacto' },
  ];

  return (
    <header className="sticky top-0 z-50 w-full transition-all duration-300 shadow-2xl">
      {/* 1. Top Bar */}
      <div className="bg-gradient-to-r from-[#0284c7] via-[#0369a1] to-[#0284c7] text-white text-xs py-1.5 px-4 sm:px-8 border-b border-sky-400/30">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-2">
          {/* Social Icons */}
          <div className="flex items-center space-x-4">
            <motion.a 
              whileHover={{ scale: 1.2, rotate: 5 }}
              whileTap={{ scale: 0.9 }}
              href="https://facebook.com" 
              target="_blank" 
              rel="noreferrer" 
              aria-label="Facebook PrevySeg"
              className="hover:text-sky-200 transition-colors duration-200"
            >
              <FacebookIcon size={14} />
            </motion.a>
            <motion.a 
              whileHover={{ scale: 1.2, rotate: -5 }}
              whileTap={{ scale: 0.9 }}
              href="https://twitter.com" 
              target="_blank" 
              rel="noreferrer" 
              aria-label="Twitter PrevySeg"
              className="hover:text-sky-200 transition-colors duration-200"
            >
              <TwitterIcon size={14} />
            </motion.a>
            <motion.a 
              whileHover={{ scale: 1.2, rotate: 5 }}
              whileTap={{ scale: 0.9 }}
              href="https://instagram.com" 
              target="_blank" 
              rel="noreferrer" 
              aria-label="Instagram PrevySeg"
              className="hover:text-sky-200 transition-colors duration-200"
            >
              <InstagramIcon size={14} />
            </motion.a>
            <motion.a 
              whileHover={{ scale: 1.2, rotate: -5 }}
              whileTap={{ scale: 0.9 }}
              href="https://youtube.com" 
              target="_blank" 
              rel="noreferrer" 
              aria-label="YouTube PrevySeg"
              className="hover:text-sky-200 transition-colors duration-200"
            >
              <YoutubeIcon size={14} />
            </motion.a>
          </div>

          {/* Top Contact Info */}
          <div className="flex flex-wrap items-center justify-center gap-x-4 gap-y-1 font-medium text-[11px] sm:text-xs">
            <a 
              href="tel:+56978691869" 
              className="flex items-center gap-1.5 hover:text-sky-200 transition-colors"
            >
              <Phone size={12} className="text-white fill-white" />
              <span>+56 9 7869 1869</span>
            </a>
            <span className="text-sky-300/60 hidden sm:inline">|</span>
            <a 
              href="mailto:prevyseg.capacitaciones@gmail.com" 
              className="flex items-center gap-1.5 hover:text-sky-200 transition-colors"
            >
              <Mail size={12} className="text-white" />
              <span>prevyseg.capacitaciones@gmail.com</span>
            </a>
            <span className="text-sky-300/60 hidden md:inline">|</span>
            <span className="flex items-center gap-1.5 text-sky-100">
              <MapPin size={12} className="text-white" />
              <span>Blanco Encalada #666, Arica. Chile</span>
            </span>
          </div>
        </div>
      </div>

      {/* 2. Main Navigation Bar with Glassmorphism */}
      <nav className={`bg-[#18191c]/85 backdrop-blur-xl border-b border-white/10 transition-all duration-300 ${
        isScrolled ? 'py-2.5 shadow-xl shadow-black/40' : 'py-3.5'
      } px-4 sm:px-8`}>
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          {/* Brand Logo */}
          <ScrollLink 
            to="inicio" 
            spy={true} 
            smooth={true} 
            offset={-90} 
            duration={500}
            className="cursor-pointer group flex flex-col items-start select-none"
          >
            <div className="flex items-baseline text-2xl sm:text-3xl font-black tracking-tight">
              <span className="text-[#0284c7] group-hover:text-sky-400 transition-colors">Prevy</span>
              <span className="text-[#00c2b2] group-hover:text-teal-300 transition-colors">Seg</span>
            </div>
            <span className="text-[9px] tracking-wider uppercase text-slate-400 font-semibold -mt-1 group-hover:text-slate-300 transition-colors">
              Organismo Técnico De Capacitación
            </span>
          </ScrollLink>

          {/* Desktop Navigation Menu */}
          <div className="hidden lg:flex items-center space-x-7 text-xs font-bold tracking-wider">
            {navItems.map((item) => (
              <ScrollLink
                key={item.name}
                to={item.to}
                spy={true}
                smooth={true}
                offset={-85}
                duration={500}
                activeClass="text-[#00c2b2] border-b-2 border-[#00c2b2] pb-0.5"
                className="text-slate-300 hover:text-[#00c2b2] cursor-pointer py-1 transition-all duration-200 tracking-widest relative group"
              >
                {item.name}
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-[#00c2b2] transition-all duration-300 group-hover:w-full" />
              </ScrollLink>
            ))}

            {/* Search Icon Button */}
            <motion.button
              whileHover={{ scale: 1.1, backgroundColor: 'rgba(255, 255, 255, 0.08)' }}
              whileTap={{ scale: 0.92 }}
              onClick={onOpenSearch}
              className="text-slate-300 hover:text-[#00c2b2] p-2 rounded-full border border-white/10 hover:border-cyan-500/40 transition-colors cursor-pointer"
              aria-label="Buscar cursos"
              title="Buscar cursos (Ctrl+K)"
            >
              <Search size={15} />
            </motion.button>

            {/* Plataforma Virtual Button */}
            <motion.button
              whileHover={{ scale: 1.04, boxShadow: '0 0 20px rgba(2, 132, 199, 0.4)' }}
              whileTap={{ scale: 0.96 }}
              onClick={onOpenPlatform}
              className="bg-gradient-to-r from-[#0284c7] to-[#0369a1] hover:from-sky-500 hover:to-sky-700 text-white text-xs font-extrabold uppercase tracking-wider py-2.5 px-5 rounded-lg shadow-lg shadow-sky-950/50 border border-sky-400/30 transition-all duration-200 flex items-center gap-2 cursor-pointer"
            >
              <Sparkles size={13} className="text-cyan-300 animate-pulse" />
              <span>PLATAFORMA VIRTUAL</span>
            </motion.button>
          </div>

          {/* Mobile Hamburger Button */}
          <div className="flex items-center gap-2 lg:hidden">
            <motion.button
              whileTap={{ scale: 0.9 }}
              onClick={onOpenSearch}
              className="text-slate-300 hover:text-[#00c2b2] p-2 rounded-lg border border-white/10"
              aria-label="Buscar"
            >
              <Search size={18} />
            </motion.button>
            <motion.button
              whileTap={{ scale: 0.9 }}
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="text-slate-200 hover:text-white p-2 rounded-lg border border-white/10 focus:outline-none"
              aria-label="Abrir menú"
            >
              {mobileMenuOpen ? <X size={22} /> : <Menu size={22} />}
            </motion.button>
          </div>
        </div>

        {/* Mobile Menu Dropdown with Framer Motion */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.25 }}
              className="lg:hidden mt-3 pt-3 border-t border-white/10 flex flex-col space-y-2 pb-3 overflow-hidden"
            >
              {navItems.map((item) => (
                <ScrollLink
                  key={item.name}
                  to={item.to}
                  spy={true}
                  smooth={true}
                  offset={-85}
                  duration={500}
                  onClick={() => setMobileMenuOpen(false)}
                  activeClass="text-[#00c2b2] font-extrabold bg-white/5"
                  className="text-slate-200 hover:text-[#00c2b2] text-sm font-semibold tracking-wider px-3 py-2 rounded-lg transition-colors cursor-pointer"
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
                  className="w-full bg-gradient-to-r from-[#0284c7] to-[#0369a1] text-white text-xs font-bold uppercase tracking-wider py-3 px-4 rounded-lg shadow-lg text-center flex items-center justify-center gap-2 cursor-pointer border border-sky-400/30"
                >
                  <span>PLATAFORMA VIRTUAL</span>
                  <ExternalLink size={14} />
                </motion.button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>
    </header>
  );
};

export default Header;
