import React from 'react';

/**
 * =========================================================================
 * PREVYSEG 2026 - IDENTIDADES VISUALES Y LOGOS OFICIALES DE ESCUELAS
 * 1. ESCUELA DE SEGURIDAD PRIVADA & PREVENCIÓN (Acreditada SPD & SENCE)
 * 2. ESCUELA DE OFICIOS INDUSTRIALES & LOGÍSTICA (Alta Empleabilidad & SENCE)
 * =========================================================================
 */

// -------------------------------------------------------------
// 1. EMBLEMA CIRCULAR / ESCUDO: ESCUELA DE SEGURIDAD PRIVADA (PALETA OFICIAL BROCHURE PDF)
// -------------------------------------------------------------
export const SecuritySchoolEmblem = ({ className = "w-16 h-16", showGlow = true }) => {
  return (
    <div className={`relative inline-flex items-center justify-center flex-shrink-0 ${className}`}>
      {showGlow && (
        <div className="absolute inset-0 bg-[#00C4D8]/20 rounded-full blur-xl animate-pulse pointer-events-none" />
      )}
      <svg 
        viewBox="0 0 200 200" 
        className="w-full h-full drop-shadow-xl"
        fill="none" 
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          {/* Degradado Azul Petróleo / Midnight Navy Profundo del Tríptico */}
          <linearGradient id="secShieldGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#0B2032" />
            <stop offset="50%" stopColor="#071626" />
            <stop offset="100%" stopColor="#040D18" />
          </linearGradient>

          {/* Degradado Turquesa Petróleo / Cyan Eléctrico del Tríptico */}
          <linearGradient id="secCyanGrad" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#00C4D8" />
            <stop offset="50%" stopColor="#0A7D8C" />
            <stop offset="100%" stopColor="#00E5FF" />
          </linearGradient>

          {/* Degradado Cintas Geométricas (Turquesa / Teal / Petrol) */}
          <linearGradient id="secTealRibbon" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#00C4D8" />
            <stop offset="40%" stopColor="#009688" />
            <stop offset="100%" stopColor="#094B5C" />
          </linearGradient>

          {/* Sombra de relieve */}
          <filter id="secShadow" x="-20%" y="-20%" width="140%" height="140%">
            <feDropShadow dx="0" dy="4" stdDeviation="4" floodColor="#000000" floodOpacity="0.5" />
          </filter>
        </defs>

        {/* Anillo Exterior de Precisión / Radar Geométrico */}
        <circle cx="100" cy="100" r="94" stroke="url(#secCyanGrad)" strokeWidth="2.5" strokeDasharray="5 3" opacity="0.9" />
        <circle cx="100" cy="100" r="88" stroke="#ffffff" strokeWidth="1" opacity="0.3" />

        {/* Silueta Base del Escudo Heráldico */}
        <path 
          d="M100 16 L168 44 C168 114 138 162 100 184 C62 162 32 114 32 44 Z" 
          fill="url(#secShieldGrad)" 
          stroke="url(#secCyanGrad)" 
          strokeWidth="3.5" 
          strokeLinejoin="round"
          filter="url(#secShadow)"
        />

        {/* Borde Interno con Resplandor Turquesa Petróleo */}
        <path 
          d="M100 25 L158 49 C158 110 132 150 100 171 C68 150 42 110 42 49 Z" 
          fill="none" 
          stroke="url(#secTealRibbon)" 
          strokeWidth="2.2" 
          opacity="0.95"
        />

        {/* Cintas Geométricas Anguladas Internas (Inspiradas en el diseño del PDF) */}
        <path d="M48 65 L100 100 L152 65" stroke="#00C4D8" strokeWidth="1.5" opacity="0.35" fill="none" />
        <path d="M56 82 L100 112 L144 82" stroke="#009688" strokeWidth="1.2" opacity="0.3" fill="none" />

        {/* Estrella de Guardia de Seguridad (8 puntas) */}
        <g transform="translate(100, 88)">
          {/* Destello circular turquesa */}
          <circle cx="0" cy="0" r="28" fill="#00C4D8" opacity="0.15" />
          
          {/* Estrella de alta visibilidad */}
          <path 
            d="M0 -34 L7 -10 L31 -10 L12 4 L19 28 L0 14 L-19 28 L-12 4 L-31 -10 L-7 -10 Z" 
            fill="url(#secTealRibbon)" 
            stroke="#ffffff" 
            strokeWidth="1.2"
          />

          {/* Ojo / Círculo Central de Monitoreo CCTV */}
          <circle cx="0" cy="0" r="10" fill="#071626" stroke="#00C4D8" strokeWidth="2.5" />
          <circle cx="0" cy="0" r="4.5" fill="#00E5FF" />
          <circle cx="1.5" cy="-1.5" r="1.5" fill="#ffffff" />
        </g>

        {/* Laureles de Acreditación Oficial */}
        <g stroke="url(#secCyanGrad)" strokeWidth="2.2" strokeLinecap="round" fill="none">
          {/* Rama izquierda */}
          <path d="M56 122 C50 135 62 152 78 160" />
          <path d="M52 128 C56 126 60 128 62 132" fill="#00C4D8" />
          <path d="M58 138 C62 136 67 139 68 143" fill="#00C4D8" />
          <path d="M68 148 C72 147 76 150 77 154" fill="#00C4D8" />

          {/* Rama derecha */}
          <path d="M144 122 C150 135 138 152 122 160" />
          <path d="M148 128 C144 126 140 128 138 132" fill="#00C4D8" />
          <path d="M142 138 C138 136 133 139 132 143" fill="#00C4D8" />
          <path d="M132 148 C128 147 124 150 123 154" fill="#00C4D8" />
        </g>

        {/* Cinta Inferior con texto SPD • OS-10 */}
        <path d="M70 166 L100 174 L130 166 L126 176 L100 182 L74 176 Z" fill="url(#secTealRibbon)" />
        <text 
          x="100" 
          y="173" 
          textAnchor="middle" 
          fill="#FFFFFF" 
          fontSize="7.5" 
          fontWeight="900" 
          fontFamily="system-ui, -apple-system, sans-serif" 
          letterSpacing="1.2"
        >
          SPD • OS-10
        </text>
      </svg>
    </div>
  );
};

// -------------------------------------------------------------
// 2. LOGO COMPLETO HORIZONTAL: ESCUELA DE SEGURIDAD PRIVADA
// -------------------------------------------------------------
export const SecuritySchoolLogo = ({ 
  className = "h-14", 
  variant = "light", // "light" (fondo claro) | "dark" (fondo oscuro)
  showSubtitle = true 
}) => {
  const isDark = variant === "dark";

  return (
    <div className={`inline-flex items-center gap-3.5 select-none ${className}`}>
      <SecuritySchoolEmblem className="w-12 h-12 sm:w-14 sm:h-14" showGlow={isDark} />
      <div className="flex flex-col justify-center">
        {/* PrevySeg Logo Typography from Brochure */}
        <div className="flex items-center gap-2 leading-none mb-1">
          <div className="flex items-baseline tracking-tight font-black">
            <span className={`text-base sm:text-lg ${isDark ? 'text-white' : 'text-[#071626]'}`}>
              Prevy
            </span>
            <span className="text-base sm:text-lg font-light text-[#00C4D8] ml-0.5 tracking-normal">
              Seg
            </span>
          </div>
          <span className="text-[9px] font-extrabold uppercase px-1.5 py-0.5 rounded bg-[#0A7D8C]/15 text-[#00A896] border border-[#0A7D8C]/30">
            SPD / SENCE
          </span>
        </div>

        {/* Nombre Principal de la Escuela (Exacto al Brochure) */}
        <span className={`text-sm sm:text-base font-black tracking-tight uppercase leading-tight ${
          isDark ? 'text-white' : 'text-[#071626]'
        }`}>
          ESCUELA DE SEGURIDAD PRIVADA
        </span>

        {/* Bajada oficial del Tríptico */}
        {showSubtitle && (
          <span className={`text-[10px] sm:text-[11px] font-medium tracking-wide mt-0.5 ${
            isDark ? 'text-[#00E5FF]/80' : 'text-[#0A7D8C]'
          }`}>
            Formación Oficial OS-10 • Vigilancia • CCTV • Ley 21.659
          </span>
        )}
      </div>
    </div>
  );
};



// -------------------------------------------------------------
// 2. EMBLEMA CIRCULAR: ESCUELA DE OFICIOS Y CURSOS SENCE (PALETA BROCHURE OFICIAL)
// -------------------------------------------------------------
export const TradesSchoolEmblem = ({ className = "w-16 h-16", showGlow = true }) => {
  return (
    <div className={`relative inline-flex items-center justify-center flex-shrink-0 ${className}`}>
      {showGlow && (
        <div className="absolute inset-0 bg-[#00A896]/20 rounded-full blur-xl animate-pulse pointer-events-none" />
      )}
      <svg 
        viewBox="0 0 200 200" 
        className="w-full h-full drop-shadow-xl"
        fill="none" 
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          {/* Degradado Azul Marino Profundo del Folleto de Oficios */}
          <linearGradient id="tradeNavyGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#0B2032" />
            <stop offset="50%" stopColor="#071626" />
            <stop offset="100%" stopColor="#040D18" />
          </linearGradient>

          {/* Degradado Turquesa / Teal Artesanal y Técnico */}
          <linearGradient id="tradeTealGrad" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#00C4D8" />
            <stop offset="50%" stopColor="#00A896" />
            <stop offset="100%" stopColor="#0A7D8C" />
          </linearGradient>

          {/* Degradado Aqua Eléctrico */}
          <linearGradient id="tradeAqua" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#00FFE0" />
            <stop offset="100%" stopColor="#00A896" />
          </linearGradient>

          {/* Sombra de relieve */}
          <filter id="tradeShadow" x="-20%" y="-20%" width="140%" height="140%">
            <feDropShadow dx="0" dy="4" stdDeviation="4" floodColor="#000000" floodOpacity="0.45" />
          </filter>
        </defs>

        {/* Anillo Exterior de Calibración Técnica */}
        <circle cx="100" cy="100" r="94" stroke="url(#tradeTealGrad)" strokeWidth="2.5" strokeDasharray="5 3" opacity="0.9" />
        <circle cx="100" cy="100" r="88" stroke="#ffffff" strokeWidth="1" opacity="0.3" />

        {/* Corona del Engranaje Técnico / Oficios */}
        <path 
          d="
            M92 12 H108 L110 26 C116 28 122 31 127 34 L140 25 L152 37 L143 50 C146 55 149 61 151 67 L165 69 V85 L151 87 C149 93 146 99 143 104 L152 117 L140 129 L127 120 C122 123 116 126 110 128 L108 142 H92 L90 128 C84 126 78 123 73 120 L60 129 L48 117 L57 104 C54 99 51 93 49 87 L35 85 V69 L49 67 C51 61 54 55 57 50 L48 37 L60 25 L73 34 C78 31 84 28 90 26 Z
          "
          transform="scale(1.2) translate(-17, -12)"
          fill="url(#tradeNavyGrad)"
          stroke="url(#tradeTealGrad)"
          strokeWidth="3.2"
          strokeLinejoin="round"
          filter="url(#tradeShadow)"
        />

        {/* Barras Diagonales Geométricas (Inspiradas en el diseño del folleto) */}
        <g opacity="0.4">
          <path d="M72 46 L82 36 L128 82 L118 92 Z" fill="#00C4D8" />
          <path d="M60 62 L70 52 L140 122 L130 132 Z" fill="#00A896" />
          <path d="M48 78 L58 68 L122 132 L112 142 Z" fill="#0A7D8C" />
        </g>

        {/* Disco Interno Metálico / Taller */}
        <circle cx="100" cy="100" r="54" fill="url(#tradeNavyGrad)" stroke="#00C4D8" strokeWidth="2.5" />
        <circle cx="100" cy="100" r="46" fill="#071626" stroke="#00A896" strokeWidth="1.5" opacity="0.95" />

        {/* Íconos Centrales de Oficios y Competencias Laborales */}
        <g transform="translate(100, 100)">
          {/* Resplandor aqua */}
          <circle cx="0" cy="0" r="24" fill="#00A896" opacity="0.2" />

          {/* Rayo Eléctrico / Chispa de Soldadura / Precisión Técnica */}
          <path 
            d="M-3 -26 L9 -3 L1 -3 L7 22 L-9 1 L-1 1 Z" 
            fill="url(#tradeAqua)" 
            stroke="#ffffff" 
            strokeWidth="1.2"
            filter="drop-shadow(0 0 6px #00C4D8)"
          />

          {/* Llave Mecánica / Herramienta Técnica de Oficios */}
          <path 
            d="M-22 -14 L-16 -8 L-8 -16 L-14 -22 C-19 -22 -22 -19 -22 -14 Z M-8 -16 L14 6 L10 10 L-12 -12 Z M10 10 L16 16 L22 10 L16 4 Z" 
            fill="#E0F2FE" 
            opacity="0.85"
          />

          {/* Casco y Protección Laboral */}
          <path 
            d="M-13 8 C-13 2 13 2 13 8 H16 V12 H-16 V8 Z" 
            fill="url(#tradeTealGrad)" 
            stroke="#ffffff" 
            strokeWidth="0.9"
          />
        </g>

        {/* Cinta Inferior con texto SENCE • NCH 2728 */}
        <path d="M64 164 L100 172 L136 164 L132 174 L100 180 L68 174 Z" fill="url(#tradeTealGrad)" />
        <text 
          x="100" 
          y="171" 
          textAnchor="middle" 
          fill="#FFFFFF" 
          fontSize="6.5" 
          fontWeight="900" 
          fontFamily="system-ui, -apple-system, sans-serif" 
          letterSpacing="1.1"
        >
          SENCE • NCH 2728
        </text>
      </svg>
    </div>
  );
};

// -------------------------------------------------------------
// 4. LOGO COMPLETO HORIZONTAL: OFICIOS Y CURSOS SENCE (ESTILO TRÍPTICO)
// -------------------------------------------------------------
export const TradesSchoolLogo = ({ 
  className = "h-14", 
  variant = "light", // "light" (fondo claro) | "dark" (fondo oscuro)
  showSubtitle = true 
}) => {
  const isDark = variant === "dark";

  return (
    <div className={`inline-flex items-center gap-3.5 select-none ${className}`}>
      <TradesSchoolEmblem className="w-12 h-12 sm:w-14 sm:h-14" showGlow={isDark} />
      <div className="flex flex-col justify-center">
        {/* PrevySeg Logo Typography from Brochure */}
        <div className="flex items-center gap-2 leading-none mb-1">
          <div className="flex items-baseline tracking-tight font-black">
            <span className={`text-base sm:text-lg ${isDark ? 'text-white' : 'text-[#071626]'}`}>
              Prevy
            </span>
            <span className="text-base sm:text-lg font-light text-[#00A896] ml-0.5 tracking-normal">
              Seg
            </span>
          </div>
          <span className="text-[9px] font-extrabold uppercase px-1.5 py-0.5 rounded bg-[#00A896]/15 text-[#008B8B] border border-[#00A896]/30">
            SENCE SGS NCh 2728
          </span>
        </div>

        {/* Nombre Principal de la Escuela (Exacto al Folleto Oficial) */}
        <span className={`text-sm sm:text-base font-black tracking-tight uppercase leading-tight ${
          isDark ? 'text-white' : 'text-[#071626]'
        }`}>
          OFICIOS Y CURSOS SENCE
        </span>

        {/* Bajada oficial del Tríptico */}
        {showSubtitle && (
          <span className={`text-[10px] sm:text-[11px] font-medium tracking-wide mt-0.5 ${
            isDark ? 'text-[#00FFE0]/80' : 'text-[#0A7D8C]'
          }`}>
            Capacitación en Oficios y Competencias Laborales
          </span>
        )}
      </div>
    </div>
  );
};

export default {
  SecuritySchoolEmblem,
  TradesSchoolEmblem,
  SecuritySchoolLogo,
  TradesSchoolLogo
};
