import React, { createContext, useContext, useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Sun, Moon } from 'lucide-react';

const ThemeContext = createContext();

const LIGHT_MODE_CSS = `
  /* Global page background and high-contrast text */
  html, body, #root, .min-h-screen, main, section, footer {
    background-color: #f8fafc !important;
    color: #0f172a !important;
  }
  
  /* Sticky header & navigation */
  header, nav {
    background-color: rgba(255, 255, 255, 0.96) !important;
    border-color: #e2e8f0 !important;
    color: #0f172a !important;
    box-shadow: 0 4px 20px -2px rgba(0, 0, 0, 0.06) !important;
  }

  /* All dark cards, panels and containers converted to clean white */
  div[class*="bg-[#"],
  div[class*="bg-slate-9"],
  div[class*="bg-gray-9"],
  div[class*="bg-black"],
  div[class*="bg-gray-950"],
  div[class*="bg-slate-950"],
  section[class*="bg-[#"],
  article[class*="bg-[#"],
  aside[class*="bg-[#"] {
    background-color: #ffffff !important;
    color: #0f172a !important;
    border-color: #e2e8f0 !important;
    box-shadow: 0 4px 15px -2px rgba(0, 0, 0, 0.05);
  }

  /* Deactivate dark background gradients in light mode */
  div[class*="from-[#"],
  div[class*="to-[#"],
  div[class*="via-[#"],
  section[class*="from-[#"],
  section[class*="to-[#"],
  section[class*="via-[#"] {
    background-image: none !important;
    background-color: #ffffff !important;
  }

  /* Text color transformations for WCAG 2.1 AAA high contrast */
  .text-white,
  [class*="text-white"],
  [class*="text-slate-100"],
  [class*="text-slate-200"],
  [class*="text-gray-100"],
  [class*="text-gray-200"] {
    color: #0f172a !important;
  }

  .text-slate-300,
  .text-slate-400,
  .text-gray-300,
  .text-gray-400,
  [class*="text-slate-300"],
  [class*="text-slate-400"] {
    color: #334155 !important;
  }

  .text-slate-500,
  .text-gray-500,
  [class*="text-slate-500"] {
    color: #64748b !important;
  }

  /* Accessible accent colors on white background */
  [class*="text-[#00c2b2]"] {
    color: #0d9488 !important;
  }

  [class*="text-[#38bdf8]"] {
    color: #0284c7 !important;
  }

  .text-emerald-400,
  .text-emerald-300 {
    color: #047857 !important;
  }

  /* Form inputs & dropdowns */
  input, select, textarea {
    background-color: #ffffff !important;
    color: #0f172a !important;
    border-color: #cbd5e1 !important;
  }

  input::placeholder, textarea::placeholder {
    color: #94a3b8 !important;
  }

  /* Preserve primary gradient buttons with crisp contrast */
  button[class*="bg-gradient-to-r"],
  a[class*="bg-gradient-to-r"] {
    background-image: inherit !important;
    color: #ffffff !important;
  }

  button[class*="bg-gradient-to-r"] span,
  a[class*="bg-gradient-to-r"] span {
    color: #ffffff !important;
  }

  [class*="bg-gradient-to-r from-[#00c2b2]"] span,
  [class*="bg-[#00c2b2]"] span {
    color: #0f172a !important;
  }

  /* Badges & Pills */
  [class*="bg-emerald-950"] {
    background-color: #ecfdf5 !important;
    border-color: #a7f3d0 !important;
    color: #065f46 !important;
  }

  [class*="bg-sky-950"] {
    background-color: #f0f9ff !important;
    border-color: #bae6fd !important;
    color: #0369a1 !important;
  }

  [class*="bg-teal-950"] {
    background-color: #f0fdfa !important;
    border-color: #99f6e4 !important;
    color: #0f766e !important;
  }

  [class*="bg-purple-950"],
  [class*="bg-purple-900"] {
    background-color: #faf5ff !important;
    border-color: #e9d5ff !important;
    color: #6b21a8 !important;
  }

  /* Subtle light borders */
  [class*="border-white"],
  [class*="border-gray-8"],
  [class*="border-gray-7"] {
    border-color: #e2e8f0 !important;
  }

  /* Secondary buttons */
  .bg-slate-800,
  [class*="bg-slate-800"],
  [class*="bg-gray-800"] {
    background-color: #f1f5f9 !important;
    color: #1e293b !important;
    border-color: #cbd5e1 !important;
  }

  /* Backdrop overlays */
  [class*="bg-black/8"] {
    background-color: rgba(15, 23, 42, 0.65) !important;
  }

  /* Scrollbar in Light Mode */
  ::-webkit-scrollbar-track {
    background: #f1f5f9;
  }

  ::-webkit-scrollbar-thumb {
    background: #cbd5e1;
  }
`;

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
    let existingStyle = document.getElementById('prevyseg-theme-dynamic-styles');

    if (theme === 'light') {
      root.classList.add('light');
      root.classList.remove('dark');
      root.setAttribute('data-theme', 'light');
      if (body) {
        body.classList.add('light');
        body.classList.remove('dark');
        body.setAttribute('data-theme', 'light');
      }
      if (!existingStyle) {
        const styleEl = document.createElement('style');
        styleEl.id = 'prevyseg-theme-dynamic-styles';
        styleEl.innerHTML = LIGHT_MODE_CSS;
        document.head.appendChild(styleEl);
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
      if (existingStyle) {
        existingStyle.remove();
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
