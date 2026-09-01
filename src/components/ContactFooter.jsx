import React from 'react';
import { 
  Phone, 
  MessageSquare, 
  MapPin, 
  Mail, 
  Send, 
  ExternalLink 
} from 'lucide-react';

const ContactFooter = ({ onOpenContactModal }) => {
  return (
    <footer id="contacto" className="relative bg-[#101113] text-white overflow-hidden pt-0">
      
      {/* 1. Multi-layer SVG Wave Separator matching Screenshot 4 & 5 */}
      <div className="w-full overflow-hidden leading-none relative z-10 -mt-1">
        <svg 
          viewBox="0 0 1440 160" 
          className="w-full h-16 sm:h-24 md:h-32 text-[#101113] preserve-3d"
          fill="none" 
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* Layer 1: Gray wave */}
          <path 
            d="M0,64 C280,140 440,20 720,80 C1000,140 1200,40 1440,90 L1440,0 L0,0 Z" 
            fill="#e5e7eb" 
            opacity="0.95"
          />
          {/* Layer 2: Dark Slate wave */}
          <path 
            d="M0,90 C320,160 560,40 840,110 C1120,180 1320,80 1440,110 L1440,160 L0,160 Z" 
            fill="#374151" 
            opacity="0.5"
          />
          {/* Layer 3: Dark Charcoal base wave */}
          <path 
            d="M0,110 C360,180 620,70 920,130 C1220,190 1360,110 1440,140 L1440,160 L0,160 Z" 
            fill="#101113" 
          />
        </svg>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-8 pt-8 pb-16 relative z-10">

        {/* 2. Heading Section */}
        <div className="text-center max-w-4xl mx-auto space-y-4">
          <div className="text-[#22c55e] font-extrabold text-sm sm:text-base tracking-wide uppercase">
            Contáctanos
          </div>
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-[2.6rem] font-extrabold text-white leading-tight">
            Para Mayor Información Sobre Nuestros Programas De Formación En Seguridad Privada,{' '}
            <span className="text-[#22c55e]">Comunícate Con Nosotros.</span>
          </h2>
        </div>

        {/* 3. Send Message CTA Button */}
        <div className="flex justify-center my-8">
          <button
            onClick={onOpenContactModal}
            className="bg-[#10b981] hover:bg-[#059669] active:scale-95 text-white font-bold text-sm sm:text-base py-3.5 px-8 rounded-lg shadow-xl shadow-emerald-950/40 transition-all duration-200 flex items-center gap-3 cursor-pointer group"
          >
            <Mail size={20} className="text-white group-hover:scale-110 transition-transform" />
            <span>Envíanos Un Mensaje</span>
          </button>
        </div>

        {/* 4. Contact Numbers & Info Row */}
        <div className="flex flex-wrap items-center justify-center gap-x-8 gap-y-3 text-xs sm:text-sm font-semibold text-gray-300 mb-12">
          <a 
            href="tel:+56982312128" 
            className="flex items-center gap-2 hover:text-[#00c2b2] transition-colors"
          >
            <Phone size={15} className="text-[#00c2b2]" />
            <span>Teléfono 1: +56 9 8231 2128</span>
          </a>
          <span className="text-gray-600 hidden md:inline">•</span>
          <a 
            href="tel:+56978691869" 
            className="flex items-center gap-2 hover:text-[#00c2b2] transition-colors"
          >
            <Phone size={15} className="text-[#00c2b2]" />
            <span>Teléfono 2: +56 9 7869 1869</span>
          </a>
          <span className="text-gray-600 hidden md:inline">•</span>
          <a 
            href="https://wa.me/56978691869" 
            target="_blank" 
            rel="noreferrer" 
            className="flex items-center gap-2 hover:text-[#22c55e] transition-colors"
          >
            <MessageSquare size={15} className="text-[#22c55e]" />
            <span>WhatsApp: +56 9 7869 1869</span>
          </a>
          <span className="text-gray-600 hidden md:inline">•</span>
          <div className="flex items-center gap-2 text-gray-300">
            <MapPin size={15} className="text-red-400" />
            <span>Blanco Encalada #666, Arica</span>
          </div>
        </div>

        {/* 5. Central Area with Vector Graphics and Google Maps */}
        <div className="relative grid grid-cols-1 lg:grid-cols-12 gap-8 items-center max-w-6xl mx-auto">
          
          {/* Left Vector Illustration: Mailbox with letters (as in screenshot) */}
          <div className="hidden lg:flex lg:col-span-3 justify-center items-center">
            <div className="w-56 h-56 relative animate-float">
              <svg viewBox="0 0 200 200" className="w-full h-full filter drop-shadow-xl">
                {/* Post */}
                <rect x="94" y="110" width="12" height="85" rx="4" fill="#cbd5e1" />
                {/* Mailbox base plate */}
                <rect x="80" y="185" width="40" height="8" rx="3" fill="#64748b" />
                {/* Mailbox Body */}
                <path d="M40 70 C40 45, 65 30, 110 30 C155 30, 160 55, 160 70 L160 115 L40 115 Z" fill="#10b981" />
                <rect x="40" y="70" width="120" height="45" rx="4" fill="#059669" />
                <circle cx="100" cy="92" r="5" fill="#fcd34d" />
                {/* Flag */}
                <rect x="150" y="45" width="6" height="30" fill="#f59e0b" />
                <polygon points="156,45 178,55 156,65" fill="#ef4444" />
                {/* Envelopes flying out */}
                <g transform="translate(15, 20) rotate(-15)">
                  <rect x="10" y="30" width="48" height="32" rx="3" fill="#ffffff" stroke="#cbd5e1" strokeWidth="1.5" />
                  <polyline points="10,30 34,48 58,30" fill="none" stroke="#94a3b8" strokeWidth="1.5" />
                </g>
                <g transform="translate(30, 10) rotate(10)">
                  <rect x="25" y="25" width="44" height="28" rx="3" fill="#ffffff" stroke="#cbd5e1" strokeWidth="1.5" />
                  <polyline points="25,25 47,40 69,25" fill="none" stroke="#94a3b8" strokeWidth="1.5" />
                  <line x1="30" y1="36" x2="42" y2="36" stroke="#00c2b2" strokeWidth="2" />
                </g>
                <g transform="translate(60, 5) rotate(25)">
                  <rect x="35" y="20" width="40" height="26" rx="3" fill="#ffffff" stroke="#cbd5e1" strokeWidth="1.5" />
                  <polyline points="35,20 55,34 75,20" fill="none" stroke="#94a3b8" strokeWidth="1.5" />
                </g>
              </svg>
            </div>
          </div>

          {/* Center: Google Maps Iframe */}
          <div className="lg:col-span-6 w-full">
            <div className="rounded-2xl overflow-hidden border-2 border-gray-700/80 shadow-2xl bg-gray-900 aspect-[16/10] relative">
              <iframe
                title="Ubicación PrevySeg Arica"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3782.9348007421113!2d-70.3226999238318!3d-18.47952878260662!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x915aa99014b2d87b%3A0x8673a5a7dcad9fa!2sManuel%20Blanco%20Encalada%20666%2C%20Arica%2C%20Arica%20y%20Parinacota!5e0!3m2!1ses!2scl!4v1710000000000!5m2!1ses!2scl"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen=""
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="w-full h-full"
              ></iframe>
            </div>
          </div>

          {/* Right Vector Illustration: Woman next to Chat Bubbles (as in screenshot) */}
          <div className="hidden lg:flex lg:col-span-3 justify-center items-center">
            <div className="w-56 h-56 relative animate-float">
              <svg viewBox="0 0 200 200" className="w-full h-full filter drop-shadow-xl">
                {/* Speech Bubble 1 (White) */}
                <rect x="25" y="45" width="70" height="42" rx="12" fill="#ffffff" />
                <path d="M40 87 L30 100 L55 87 Z" fill="#ffffff" />
                <line x1="38" y1="58" x2="80" y2="58" stroke="#cbd5e1" strokeWidth="3" strokeLinecap="round" />
                <line x1="38" y1="68" x2="68" y2="68" stroke="#cbd5e1" strokeWidth="3" strokeLinecap="round" />

                {/* Speech Bubble 2 (Blue) */}
                <circle cx="95" cy="115" r="34" fill="#0284c7" />
                <path d="M120 135 L135 150 L115 145 Z" fill="#0284c7" />
                <line x1="78" y1="110" x2="112" y2="110" stroke="#ffffff" strokeWidth="3.5" strokeLinecap="round" />
                <line x1="78" y1="120" x2="102" y2="120" stroke="#ffffff" strokeWidth="3.5" strokeLinecap="round" />

                {/* Woman character silhouette illustration */}
                {/* Hair Bun */}
                <circle cx="150" cy="50" r="10" fill="#1e293b" />
                {/* Head */}
                <circle cx="150" cy="62" r="12" fill="#fbbf24" />
                {/* Neck */}
                <rect x="147" y="74" width="6" height="8" fill="#f59e0b" />
                {/* Torso / Dress */}
                <path d="M138 82 C138 78, 162 78, 162 82 L168 140 L132 140 Z" fill="#0f172a" />
                {/* Arm pointing to chat */}
                <path d="M140 86 Q120 105 110 115" stroke="#f59e0b" strokeWidth="5" strokeLinecap="round" fill="none" />
                {/* Legs */}
                <line x1="144" y1="140" x2="144" y2="185" stroke="#1e293b" strokeWidth="5" strokeLinecap="round" />
                <line x1="156" y1="140" x2="156" y2="185" stroke="#1e293b" strokeWidth="5" strokeLinecap="round" />
              </svg>
            </div>
          </div>

        </div>

        {/* 6. Footer Brand and Copyright */}
        <div className="mt-16 pt-8 border-t border-gray-800 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-gray-400">
          <div className="flex flex-col sm:flex-row items-center gap-2 sm:gap-4">
            <span className="font-bold text-white text-base tracking-tight">
              <span className="text-[#0284c7]">Prevy</span>
              <span className="text-[#00c2b2]">Seg</span>
            </span>
            <span className="hidden sm:inline text-gray-600">|</span>
            <span>Organismo Técnico de Capacitación (OTEC)</span>
          </div>

          <div className="text-center md:text-right">
            <p>© {new Date().getFullYear()} PrevySeg Capacitaciones. Todos los derechos reservados. Arica, Chile.</p>
          </div>
        </div>

      </div>
    </footer>
  );
};

export default ContactFooter;
