import React, { createContext, useContext, useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sun, Moon } from 'lucide-react';

const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState(() => {
    try {
      const savedTheme = localStorage.getItem('prevyseg_theme');
      if (savedTheme === 'light' || savedTheme === 'dark') {
        return savedTheme;
      }
    } catch (e) {
      // Ignore localStorage errors
    }
    return 'dark'; // Dark mode default
  });

  useEffect(() => {
    try {
      localStorage.setItem('prevyseg_theme', theme);
    } catch (e) {}

    const root = document.documentElement;
    const body = document.body;

    if (theme === 'light') {
      root.classList.add('light');
      root.classList.remove('dark');
      root.setAttribute('data-theme', 'light');
      if (body) {
        body.classList.add('light');
        body.classList.remove('dark');
        body.setAttribute('data-theme', 'light');
      }
    } else {
      root.classList.add('dark');
      root.classList.remove('light');
      root.setAttribute('data-theme', 'dark');
      if (body) {
        body.classList.add('dark');
        body.classList.remove('light');
        body.setAttribute('data-theme', 'dark');
      }
    }
  }, [theme]);

  const toggleTheme = () => {
    setTheme(prev => (prev === 'dark' ? 'light' : 'dark'));
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme, isDark: theme === 'dark' }}>
      <div className={theme === 'light' ? 'light' : 'dark'} data-theme={theme}>
        {children}
      </div>
    </ThemeContext.Provider>
  );
};

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    return {
      theme: 'dark',
      toggleTheme: () => {},
      isDark: true
    };
  }
  return context;
};

// Reusable sliding Theme Switch Button with smooth spring animation
export const ThemeToggleBtn = ({ className = '', showLabel = false }) => {
  const { theme, toggleTheme, isDark } = useTheme();

  return (
    <div className={`inline-flex items-center gap-2 ${className}`}>
      <button
        onClick={(e) => {
          e.preventDefault();
          e.stopPropagation();
          toggleTheme();
        }}
        type="button"
        role="switch"
        aria-checked={!isDark}
        className={`w-16 h-8 rounded-full p-1 flex items-center cursor-pointer transition-colors duration-300 relative select-none focus:outline-none focus:ring-2 focus:ring-[#00c2b2]/60 ${
          isDark
            ? 'bg-slate-900/90 border border-cyan-500/40 shadow-inner justify-end'
            : 'bg-amber-100 border border-amber-300 shadow-inner justify-start'
        }`}
        title={isDark ? 'Tema actual: Oscuro. Haz clic para deslizar a Modo Claro (Fondo Blanco)' : 'Tema actual: Claro. Haz clic para deslizar a Modo Oscuro'}
        aria-label="Interruptor deslizable de modo claro u oscuro"
      >
        {/* Background indicator icons on both sides */}
        <div className="absolute inset-0 px-2 flex items-center justify-between pointer-events-none text-xs">
          <Sun 
            size={13} 
            className={`transition-opacity duration-300 ${isDark ? 'text-slate-600 opacity-40' : 'text-amber-500 opacity-90'}`} 
          />
          <Moon 
            size={13} 
            className={`transition-opacity duration-300 ${isDark ? 'text-cyan-300 opacity-90' : 'text-slate-400 opacity-40'}`} 
          />
        </div>

        {/* Sliding Thumb Knob */}
        <motion.div
          layout
          transition={{ type: "spring", stiffness: 600, damping: 32 }}
          className={`w-6 h-6 rounded-full flex items-center justify-center z-10 shadow-md ${
            isDark
              ? 'bg-gradient-to-tr from-cyan-400 to-teal-300 text-slate-950 shadow-cyan-500/50'
              : 'bg-gradient-to-tr from-amber-400 to-yellow-300 text-slate-950 shadow-amber-500/50'
          }`}
        >
          {isDark ? (
            <Moon size={13} className="text-slate-950 fill-slate-950" />
          ) : (
            <Sun size={13} className="text-slate-950 fill-slate-950" />
          )}
        </motion.div>
      </button>

      {showLabel && (
        <span className="text-xs font-bold select-none">
          {isDark ? 'Modo Oscuro' : 'Modo Claro'}
        </span>
      )}
    </div>
  );
};

export default ThemeContext;
