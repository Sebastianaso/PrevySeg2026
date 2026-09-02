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
    if (theme === 'light') {
      root.classList.add('light');
      root.classList.remove('dark');
      root.setAttribute('data-theme', 'light');
    } else {
      root.classList.add('dark');
      root.classList.remove('light');
      root.setAttribute('data-theme', 'dark');
    }
  }, [theme]);

  const toggleTheme = () => {
    setTheme(prev => (prev === 'dark' ? 'light' : 'dark'));
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme, isDark: theme === 'dark' }}>
      {children}
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

// Reusable animated Theme Toggle Button
export const ThemeToggleBtn = ({ className = '', showLabel = false }) => {
  const { theme, toggleTheme, isDark } = useTheme();

  return (
    <motion.button
      whileHover={{ scale: 1.08 }}
      whileTap={{ scale: 0.92 }}
      onClick={toggleTheme}
      type="button"
      className={`relative inline-flex items-center gap-2 p-2 rounded-xl transition-all cursor-pointer select-none focus:outline-none focus:ring-2 focus:ring-[#00c2b2]/50 ${
        isDark
          ? 'bg-slate-800/80 hover:bg-slate-700 text-amber-300 border border-white/10 shadow-inner'
          : 'bg-slate-100 hover:bg-slate-200 text-slate-800 border border-slate-300 shadow-sm'
      } ${className}`}
      title={isDark ? 'Cambiar a Fondo Blanco (Modo Claro de Alto Contraste)' : 'Cambiar a Fondo Oscuro (Modo Nocturno)'}
      aria-label="Alternar modo de alto contraste claro u oscuro"
    >
      <AnimatePresence mode="wait" initial={false}>
        {isDark ? (
          <motion.div
            key="moon"
            initial={{ opacity: 0, rotate: -90, scale: 0.8 }}
            animate={{ opacity: 1, rotate: 0, scale: 1 }}
            exit={{ opacity: 0, rotate: 90, scale: 0.8 }}
            transition={{ duration: 0.2 }}
            className="flex items-center"
          >
            <Moon size={18} className="text-cyan-300" />
          </motion.div>
        ) : (
          <motion.div
            key="sun"
            initial={{ opacity: 0, rotate: 90, scale: 0.8 }}
            animate={{ opacity: 1, rotate: 0, scale: 1 }}
            exit={{ opacity: 0, rotate: -90, scale: 0.8 }}
            transition={{ duration: 0.2 }}
            className="flex items-center"
          >
            <Sun size={18} className="text-amber-500" />
          </motion.div>
        )}
      </AnimatePresence>

      {showLabel && (
        <span className="text-xs font-bold">
          {isDark ? 'Modo Oscuro' : 'Modo Claro'}
        </span>
      )}
    </motion.button>
  );
};

export default ThemeContext;
