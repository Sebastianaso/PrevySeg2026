import React from 'react';
import { motion } from 'framer-motion';
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
    <footer id="contacto" className="relative bg-slate-900 text-white overflow-hidden pt-0 border-t border-slate-200">
      
      {/* 1. Multi-layer SVG Wave Separator matching Screenshot 4 & 5 */}
      <div className="w-full overflow-hidden leading-none relative z-10 -mt-1">
        <svg 
          viewBox="0 0 1440 160" 
          className="w-full h-16 sm:h-24 md:h-32 text-slate-900 preserve-3d"
          fill="none" 
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* Layer 1: Slate-50 wave from section above */}
          <path 
            d="M0,64 C280,140 440,20 720,80 C1000,140 1200,40 1440,90 L1440,0 L0,0 Z" 
            fill="#f8fafc" 
            opacity="1"
          />
          {/* Layer 2: Slate wave */}
          <path 
            d="M0,90 C320,160 560,40 840,110 C1120,180 1320,80 1440,110 L1440,160 L0,160 Z" 
            fill="#334155" 
            opacity="0.4"
          />
          {/* Layer 3: Dark Slate base wave */}
          <path 
            d="M0,110 C360,180 620,70 920,130 C1220,190 1360,110 1440,140 L1440,160 L0,160 Z" 
            fill="#0f172a" 
          />
        </svg>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-8 pt-8 pb-16 relative z-10">

        {/* 2. Heading Section */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center max-w-4xl mx-auto space-y-4"
        >
          <div className="text-[#22c55e] font-extrabold text-sm sm:text-base tracking-wide uppercase">
            Contáctanos
          </div>
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-[2.6rem] font-extrabold text-white leading-tight">
            Para Mayor Información Sobre Nuestros Programas De Formación En Seguridad Privada,{' '}
            <span className="text-[#22c55e]">Comunícate Con Nosotros.</span>
          </h2>
        </motion.div>

        {/* 3. Send Message CTA Button */}
        <div className="flex justify-center my-8">
          <motion.button
            whileHover={{ scale: 1.05, boxShadow: '0 0 25px rgba(16, 185, 129, 0.4)' }}
            whileTap={{ scale: 0.95 }}
            onClick={onOpenContactModal}
            className="bg-gradient-to-r from-[#10b981] to-emerald-600 hover:from-emerald-500 hover:to-emerald-700 text-white font-bold text-sm sm:text-base py-3.5 px-8 rounded-xl shadow-xl shadow-emerald-950/50 transition-all duration-200 flex items-center gap-3 cursor-pointer group border border-emerald-400/30"
          >
            <Mail size={20} className="text-white group-hover:scale-110 transition-transform" />
            <span>Envíanos Un Mensaje</span>
          </motion.button>
        </div>

        {/* 4. Contact Numbers & Info Row */}
        <motion.div 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="flex flex-wrap items-center justify-center gap-x-8 gap-y-3 text-xs sm:text-sm font-semibold text-slate-300 mb-12"
        >
          <a 
            href="tel:+56982312128" 
            className="flex items-center gap-2 hover:text-[#00c2b2] transition-colors p-1.5 rounded-lg hover:bg-white/5"
          >
            <Phone size={15} className="text-[#00c2b2]" />
            <span>Teléfono 1: +56 9 8231 2128</span>
          </a>
          <span className="text-slate-600 hidden md:inline">•</span>
          <a 
            href="tel:+56978691869" 
            className="flex items-center gap-2 hover:text-[#00c2b2] transition-colors p-1.5 rounded-lg hover:bg-white/5"
          >
            <Phone size={15} className="text-[#00c2b2]" />
            <span>Teléfono 2: +56 9 7869 1869</span>
          </a>
          <span className="text-slate-600 hidden md:inline">•</span>
          <a 
            href="https://wa.me/56978691869" 
            target="_blank" 
            rel="noreferrer" 
            className="flex items-center gap-2 hover:text-[#22c55e] transition-colors p-1.5 rounded-lg hover:bg-white/5"
          >
            <MessageSquare size={15} className="text-[#22c55e]" />
            <span>WhatsApp: +56 9 7869 1869</span>
          </a>
          <span className="text-slate-600 hidden md:inline">•</span>
          <div className="flex items-center gap-2 text-slate-300 p-1.5">
            <MapPin size={15} className="text-rose-400" />
            <span>Blanco Encalada #666, Arica</span>
          </div>
        </motion.div>

        {/* 5. Central Area with Vector Graphics and Google Maps */}
        <div className="relative grid grid-cols-1 lg:grid-cols-12 gap-8 items-center max-w-6xl mx-auto">
          
          {/* Left Vector Illustration: Mailbox with letters */}
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
            <div className="rounded-2xl overflow-hidden border border-white/15 shadow-2xl bg-slate-900 aspect-[16/10] relative">
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

          {/* Right Vector Illustration: Person on Mobile chatting */}
          <div className="hidden lg:flex lg:col-span-3 justify-center items-center">
            <div className="w-56 h-56 relative animate-float" style={{ animationDelay: '1.5s' }}>
              <svg viewBox="0 0 200 200" className="w-full h-full filter drop-shadow-xl">
                {/* Big Smartphone Frame */}
                <rect x="50" y="20" width="100" height="160" rx="14" fill="#1e293b" stroke="#cbd5e1" strokeWidth="3" />
                <rect x="56" y="32" width="88" height="136" rx="6" fill="#0f172a" />
                <circle cx="100" cy="26" r="2.5" fill="#64748b" />
                {/* Chat bubble 1 */}
                <rect x="64" y="45" width="55" height="20" rx="6" fill="#0284c7" />
                <line x1="70" y1="52" x2="105" y2="52" stroke="#ffffff" strokeWidth="2" strokeLinecap="round" />
                <line x1="70" y1="58" x2="95" y2="58" stroke="#ffffff" strokeWidth="2" strokeLinecap="round" />
                {/* Chat bubble 2 */}
                <rect x="80" y="75" width="55" height="20" rx="6" fill="#10b981" />
                <line x1="86" y1="82" x2="125" y2="82" stroke="#ffffff" strokeWidth="2" strokeLinecap="round" />
                <line x1="86" y1="88" x2="110" y2="88" stroke="#ffffff" strokeWidth="2" strokeLinecap="round" />
                {/* Chat bubble 3 */}
                <rect x="64" y="105" width="55" height="20" rx="6" fill="#00c2b2" />
                <line x1="70" y1="112" x2="105" y2="112" stroke="#ffffff" strokeWidth="2" strokeLinecap="round" />
                <line x1="70" y1="118" x2="90" y2="118" stroke="#ffffff" strokeWidth="2" strokeLinecap="round" />
              </svg>
            </div>
          </div>

        </div>

        {/* 6. Footer Copyright */}
        <div className="mt-16 pt-8 border-t border-white/10 text-center text-xs text-slate-400">
          <p>© {new Date().getFullYear()} PrevySeg Capacitaciones OTEC. Todos los derechos reservados. Arica, Chile.</p>
        </div>

      </div>
    </footer>
  );
};

export default ContactFooter;
