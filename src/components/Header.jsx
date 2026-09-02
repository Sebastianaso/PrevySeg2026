import React, { useState, useEffect } from 'react';
import { Link as ScrollLink } from 'react-scroll';
import { 
  Phone, 
  Mail, 
  MapPin, 
  Search, 
  Menu, 
  X,
  ExternalLink
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
    <header className="sticky top-0 z-50 w-full transition-all duration-300 shadow-xl">
      {/* 1. Top Blue Bar */}
      <div className="bg-[#0284c7] text-white text-xs py-1.5 px-4 sm:px-8 border-b border-sky-400/30">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-2">
          {/* Social Icons */}
          <div className="flex items-center space-x-4">
            <a 
              href="https://facebook.com" 
              target="_blank" 
              rel="noreferrer" 
              aria-label="Facebook PrevySeg"
              className="hover:text-sky-200 transition-colors duration-200"
            >
              <FacebookIcon size={14} />
            </a>
            <a 
              href="https://twitter.com" 
              target="_blank" 
              rel="noreferrer" 
              aria-label="Twitter PrevySeg"
              className="hover:text-sky-200 transition-colors duration-200"
            >
              <TwitterIcon size={14} />
            </a>
            <a 
              href="https://instagram.com" 
              target="_blank" 
              rel="noreferrer" 
              aria-label="Instagram PrevySeg"
              className="hover:text-sky-200 transition-colors duration-200"
            >
              <InstagramIcon size={14} />
            </a>
            <a 
              href="https://youtube.com" 
              target="_blank" 
              rel="noreferrer" 
              aria-label="YouTube PrevySeg"
              className="hover:text-sky-200 transition-colors duration-200"
            >
              <YoutubeIcon size={14} />
            </a>
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

      {/* 2. Main Navigation Bar */}
      <nav className={`bg-[#18191c]/95 backdrop-blur-md border-b border-gray-800/60 transition-all duration-300 ${
        isScrolled ? 'py-3' : 'py-4'
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
            <span className="text-[9px] tracking-wider uppercase text-gray-400 font-semibold -mt-1">
              Organismo Técnico De Capacitación
            </span>
          </ScrollLink>

          {/* Desktop Navigation Menu */}
          <div className="hidden lg:flex items-center space-x-8 text-xs font-bold tracking-wider">
            {navItems.map((item) => (
              <ScrollLink
                key={item.name}
                to={item.to}
                spy={true}
                smooth={true}
                offset={-85}
                duration={500}
                activeClass="text-[#00c2b2] border-b-2 border-[#00c2b2]"
                className="text-gray-300 hover:text-[#00c2b2] cursor-pointer py-1 transition-all duration-200 tracking-widest"
              >
                {item.name}
              </ScrollLink>
            ))}

            {/* Search Icon Button */}
            <button
              onClick={onOpenSearch}
              className="text-gray-300 hover:text-[#00c2b2] p-1.5 rounded-full hover:bg-gray-800/60 transition-colors cursor-pointer"
              aria-label="Buscar cursos"
              title="Buscar cursos"
            >
              <Search size={16} />
            </button>

            {/* Search Icon Button */}
            <button
              onClick={onOpenSearch}
              className="text-gray-300 hover:text-[#00c2b2] p-1.5 rounded-full hover:bg-gray-800/60 transition-colors cursor-pointer"
              aria-label="Buscar cursos"
              title="Buscar cursos"
            >
              <Search size={16} />
            </button>

            {/* Plataforma Virtual Button */}
            <button
              onClick={onOpenPlatform}
              className="bg-[#0284c7] hover:bg-[#0369a1] active:scale-95 text-white text-xs font-bold uppercase tracking-wider py-2.5 px-5 rounded shadow-lg shadow-sky-900/30 transition-all duration-200 flex items-center gap-2 cursor-pointer"
            >
              <span>PLATAFORMA VIRTUAL</span>
            </button>
          </div>

          {/* Mobile Hamburger Button */}
          <div className="flex items-center gap-3 lg:hidden">
            <button
              onClick={onOpenSearch}
              className="text-gray-300 hover:text-[#00c2b2] p-2"
              aria-label="Buscar"
            >
              <Search size={18} />
            </button>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="text-gray-200 hover:text-white p-2 rounded focus:outline-none"
              aria-label="Abrir menú"
            >
              {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile Menu Dropdown */}
        {mobileMenuOpen && (
          <div className="lg:hidden mt-4 pt-4 border-t border-gray-800 flex flex-col space-y-3 pb-4 animate-in fade-in slide-in-from-top-4 duration-200">
            {navItems.map((item) => (
              <ScrollLink
                key={item.name}
                to={item.to}
                spy={true}
                smooth={true}
                offset={-85}
                duration={500}
                onClick={() => setMobileMenuOpen(false)}
                activeClass="text-[#00c2b2] font-extrabold"
                className="text-gray-200 hover:text-[#00c2b2] text-sm font-semibold tracking-wider px-2 py-1.5 rounded transition-colors cursor-pointer"
              >
                {item.name}
              </ScrollLink>
            ))}

            <div className="pt-2">
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenPlatform();
                }}
                className="w-full bg-[#0284c7] hover:bg-[#0369a1] text-white text-xs font-bold uppercase tracking-wider py-3 px-4 rounded shadow-md text-center flex items-center justify-center gap-2 cursor-pointer"
              >
                <span>PLATAFORMA VIRTUAL</span>
                <ExternalLink size={14} />
              </button>
            </div>
          </div>
        )}
      </nav>
    </header>
  );
};

export default Header;
