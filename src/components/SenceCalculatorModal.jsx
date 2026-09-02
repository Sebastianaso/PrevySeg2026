import React, { useState } from 'react';
import { 
  X, 
  Calculator, 
  Building2, 
  Users, 
  FileText, 
  Download, 
  Send, 
  CheckCircle2, 
  Percent, 
  DollarSign, 
  Sparkles,
  HelpCircle,
  Briefcase,
  Layers
} from 'lucide-react';
import { COURSES_DATA } from './Services';

export const SenceCalculatorModal = ({ isOpen, onClose }) => {
  const [companyName, setCompanyName] = useState('');
  const [companyRut, setCompanyRut] = useState('');
  const [contactPhone, setContactPhone] = useState('');
  const [contactEmail, setContactEmail] = useState('');
  const [selectedCourseId, setSelectedCourseId] = useState(1);
  const [participantsCount, setParticipantsCount] = useState(10);
  const [senceBracket, setSenceBracket] = useState('100'); // '100' | '50' | '15' | '0'
  const [quoteGenerated, setQuoteGenerated] = useState(false);
  const [quoteNumber, setQuoteNumber] = useState('COT-2026-0842');

  if (!isOpen) return null;

  const currentCourse = COURSES_DATA.find(c => c.id === Number(selectedCourseId)) || COURSES_DATA[0];

  // Base price extraction
  const rawPriceStr = currentCourse.price.replace(/[^0-9]/g, '');
  const unitPrice = parseInt(rawPriceStr, 10) || 85000;

  // Total gross
  const totalGross = unitPrice * participantsCount;

  // Sence coverage calculation
  let sencePercentage = 1.0;
  if (senceBracket === '50') sencePercentage = 0.5;
  if (senceBracket === '15') sencePercentage = 0.15;
  if (senceBracket === '0') sencePercentage = 0.0;

  const senceCoveredAmount = Math.round(totalGross * sencePercentage);
  const netCompanyCost = totalGross - senceCoveredAmount;

  // Volume discount for direct pay (if bracket 0)
  let volumeDiscount = 0;
  if (senceBracket === '0') {
    if (participantsCount >= 20) volumeDiscount = Math.round(totalGross * 0.15);
    else if (participantsCount >= 10) volumeDiscount = Math.round(totalGross * 0.10);
    else if (participantsCount >= 5) volumeDiscount = Math.round(totalGross * 0.05);
  }

  const finalCostToPay = netCompanyCost - volumeDiscount;

  const formatCLP = (val) => `$${val.toLocaleString('es-CL')} CLP`;

  const handleGenerateQuote = (e) => {
    e.preventDefault();
    const randomCode = `COT-2026-${Math.floor(1000 + Math.random() * 9000)}`;
    setQuoteNumber(randomCode);
    setQuoteGenerated(true);
  };

  const handleSendWhatsAppQuote = () => {
    const targetWhatsAppNumber = '56978691869'; // WhatsApp oficial PrevySeg
    
    const whatsappMsg = `🏢 *¡Hola PrevySeg! Solicitud de Cotización Corporativa:*

📄 *N° Cotización:* ${quoteNumber}
🏢 *Empresa:* ${companyName.trim() || 'Empresa Cliente'} (RUT: ${companyRut.trim() || 'S/R'})
👤 *Contacto:* ${contactPhone.trim()} | ${contactEmail.trim()}
🎓 *Curso Seleccionado:* ${currentCourse.title}
👥 *N° Participantes:* ${participantsCount} trabajadores
📊 *Franquicia SENCE:* Tramo ${senceBracket}%
💰 *Inversión Total:* ${formatCLP(totalGross)}
🛡️ *Cobertura SENCE:* ${formatCLP(senceCoveredAmount)}
💵 *Costo Neto Empresa:* ${formatCLP(finalCostToPay)}

---
_Generado desde el Simulador SENCE & Cotizador Corporativo PrevySeg._`;

    const encodedUrl = `https://api.whatsapp.com/send?phone=${targetWhatsAppNumber}&text=${encodeURIComponent(whatsappMsg)}`;
    window.open(encodedUrl, '_blank', 'noopener,noreferrer');
  };

  const handlePrintQuote = () => {
    window.print();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-in fade-in duration-200">
      <div className="bg-[#18191c] border border-sky-500/40 w-full max-w-4xl rounded-3xl shadow-2xl overflow-hidden p-6 sm:p-8 relative max-h-[94vh] overflow-y-auto">
        
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-white p-2 rounded-full hover:bg-gray-800 transition-colors z-20 cursor-pointer"
          aria-label="Cerrar modal"
        >
          <X size={20} />
        </button>

        {/* Header */}
        <div className="space-y-2 mb-6 text-center sm:text-left">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-400 text-xs font-bold border border-emerald-500/30">
            <Calculator size={14} />
            <span>Simulador de Franquicia Tributaria SENCE y Cotizador Corporativo</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
            Calcula el Beneficio <span className="text-[#00c2b2]">SENCE 100%</span> para Empresas
          </h2>
          <p className="text-xs sm:text-sm text-gray-300">
            Optimiza el gasto tributario de tu organización y capacita a tu equipo de guardias con financiamiento hasta el 100%.
          </p>
        </div>

        {/* Interactive Calculator Form & Results Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* Left Column: Form Controls (7 cols) */}
          <form onSubmit={handleGenerateQuote} className="lg:col-span-7 space-y-5">
            
            {/* Empresa inputs */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-bold text-gray-300 mb-1">Nombre o Razón Social *</label>
                <input
                  type="text"
                  required
                  placeholder="Ej: Seguridad del Norte SpA"
                  value={companyName}
                  onChange={(e) => setCompanyName(e.target.value)}
                  className="w-full bg-[#121315] border border-gray-700 rounded-xl px-3.5 py-2.5 text-xs sm:text-sm text-white focus:outline-none focus:border-[#00c2b2]"
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-gray-300 mb-1">RUT Empresa *</label>
                <input
                  type="text"
                  required
                  placeholder="Ej: 76.543.210-K"
                  value={companyRut}
                  onChange={(e) => setCompanyRut(e.target.value)}
                  className="w-full bg-[#121315] border border-gray-700 rounded-xl px-3.5 py-2.5 text-xs sm:text-sm text-white focus:outline-none focus:border-[#00c2b2]"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-bold text-gray-300 mb-1">Teléfono / WhatsApp *</label>
                <input
                  type="tel"
                  required
                  placeholder="+56 9 1234 5678"
                  value={contactPhone}
                  onChange={(e) => setContactPhone(e.target.value)}
                  className="w-full bg-[#121315] border border-gray-700 rounded-xl px-3.5 py-2.5 text-xs sm:text-sm text-white focus:outline-none focus:border-[#00c2b2]"
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-gray-300 mb-1">Correo de Contacto *</label>
                <input
                  type="email"
                  required
                  placeholder="contacto@empresa.cl"
                  value={contactEmail}
                  onChange={(e) => setContactEmail(e.target.value)}
                  className="w-full bg-[#121315] border border-gray-700 rounded-xl px-3.5 py-2.5 text-xs sm:text-sm text-white focus:outline-none focus:border-[#00c2b2]"
                />
              </div>
            </div>

            {/* Course Selector */}
            <div>
              <label className="block text-xs font-bold text-gray-300 mb-1">Curso o Programa a Cotizar</label>
              <select
                value={selectedCourseId}
                onChange={(e) => setSelectedCourseId(e.target.value)}
                className="w-full bg-[#121315] border border-gray-700 rounded-xl px-3.5 py-2.5 text-xs sm:text-sm text-white focus:outline-none focus:border-[#00c2b2]"
              >
                {COURSES_DATA.map(c => (
                  <option key={c.id} value={c.id}>
                    {c.title} — ({c.price})
                  </option>
                ))}
              </select>
            </div>

            {/* Participants Slider */}
            <div className="space-y-2 p-4 bg-[#121315] rounded-2xl border border-gray-800">
              <div className="flex justify-between items-center text-xs">
                <span className="font-bold text-gray-300 flex items-center gap-1.5">
                  <Users size={15} className="text-[#0284c7]" />
                  Cantidad de Trabajadores a Capacitar:
                </span>
                <span className="text-base font-black text-[#00c2b2] font-mono">
                  {participantsCount} {participantsCount === 1 ? 'persona' : 'personas'}
                </span>
              </div>

              <input
                type="range"
                min="1"
                max="100"
                value={participantsCount}
                onChange={(e) => setParticipantsCount(Number(e.target.value))}
                className="w-full accent-[#00c2b2] cursor-pointer"
              />

              <div className="flex justify-between text-[10px] text-gray-500 font-mono">
                <span>1 persona</span>
                <span>25 pers.</span>
                <span>50 pers.</span>
                <span>100 pers.</span>
              </div>
            </div>

            {/* SENCE Tramo Selector */}
            <div className="space-y-2">
              <label className="block text-xs font-bold text-gray-300">
                Tramo de Franquicia Tributaria SENCE:
              </label>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                {[
                  { value: '100', label: '100% SENCE', sub: 'Hasta 25 UTM' },
                  { value: '50', label: '50% SENCE', sub: '25 a 50 UTM' },
                  { value: '15', label: '15% SENCE', sub: 'Sobre 50 UTM' },
                  { value: '0', label: 'Pago Directo', sub: 'Desc. Volumen' },
                ].map((t) => (
                  <button
                    key={t.value}
                    type="button"
                    onClick={() => setSenceBracket(t.value)}
                    className={`p-2.5 rounded-xl border text-left transition-all cursor-pointer ${
                      senceBracket === t.value
                        ? 'bg-sky-950/80 border-[#00c2b2] text-white shadow-md'
                        : 'bg-[#121315] border-gray-800 text-gray-400 hover:border-gray-700'
                    }`}
                  >
                    <div className="text-xs font-bold">{t.label}</div>
                    <div className="text-[10px] text-gray-500">{t.sub}</div>
                  </button>
                ))}
              </div>
            </div>

            <button
              type="submit"
              className="w-full bg-[#0284c7] hover:bg-[#0369a1] active:scale-95 text-white font-black py-3 px-4 rounded-xl shadow-lg shadow-sky-950/50 flex items-center justify-center gap-2 cursor-pointer transition-all text-xs sm:text-sm"
            >
              <FileText size={16} />
              <span>Generar y Ver Cotización Formal</span>
            </button>
          </form>

          {/* Right Column: Dynamic Quote Breakdown (5 cols) */}
          <div className="lg:col-span-5 space-y-4">
            
            {/* Live Financial Card */}
            <div className="bg-gradient-to-br from-sky-950/90 via-[#121316] to-[#18191c] border-2 border-sky-500/50 rounded-3xl p-6 shadow-2xl space-y-5 text-white">
              
              <div className="flex justify-between items-start pb-4 border-b border-gray-800">
                <div>
                  <span className="text-[10px] text-gray-400 uppercase tracking-wider font-bold block">Resumen Económico</span>
                  <h4 className="text-lg font-black text-white">Cotización Estimada</h4>
                </div>
                <div className="bg-[#00c2b2]/20 text-[#00c2b2] text-[10px] font-bold px-2.5 py-1 rounded-full border border-[#00c2b2]/40">
                  {senceBracket === '100' ? '100% Deducible' : `Tramo ${senceBracket}%`}
                </div>
              </div>

              {/* Breakdown Items */}
              <div className="space-y-3 text-xs">
                <div className="flex justify-between">
                  <span className="text-gray-400">Valor Unitario Curso:</span>
                  <span className="font-mono text-white">{currentCourse.price}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Total Participantes:</span>
                  <span className="font-mono text-white font-bold">{participantsCount} trabajadores</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Subtotal Arancel Bruto:</span>
                  <span className="font-mono text-white">{formatCLP(totalGross)}</span>
                </div>
                
                {senceCoveredAmount > 0 && (
                  <div className="flex justify-between text-emerald-400 font-bold bg-emerald-950/40 p-2 rounded-lg border border-emerald-500/30">
                    <span>Cobertura Franquicia SENCE:</span>
                    <span>- {formatCLP(senceCoveredAmount)}</span>
                  </div>
                )}

                {volumeDiscount > 0 && (
                  <div className="flex justify-between text-sky-400 font-bold bg-sky-950/40 p-2 rounded-lg border border-sky-500/30">
                    <span>Descuento por Volumen:</span>
                    <span>- {formatCLP(volumeDiscount)}</span>
                  </div>
                )}

                <div className="pt-3 border-t border-gray-800 flex justify-between items-baseline">
                  <div>
                    <span className="text-[11px] uppercase tracking-wider text-gray-400 font-bold block">
                      Costo Neto Empresa:
                    </span>
                    <span className="text-[10px] text-gray-500">
                      (Inversión real tras franquicia)
                    </span>
                  </div>
                  <div className="text-2xl font-black text-[#00c2b2] font-mono">
                    {formatCLP(finalCostToPay)}
                  </div>
                </div>
              </div>

              {/* Benefit Highlight Box */}
              <div className="p-3 bg-black/40 rounded-xl border border-gray-800 text-[11px] text-gray-300 space-y-1">
                <div className="text-emerald-400 font-bold flex items-center gap-1.5">
                  <CheckCircle2 size={13} />
                  <span>Beneficio Tributario Garantizado</span>
                </div>
                <p className="text-gray-400 leading-relaxed text-[10px]">
                  Imputable directamente contra el Impuesto de Primera Categoría (F22) conforme al Art. 36 Ley 19.518.
                </p>
              </div>

              {/* Action Buttons */}
              <div className="space-y-2 pt-2">
                <button
                  type="button"
                  onClick={handleSendWhatsAppQuote}
                  className="w-full bg-[#16a34a] hover:bg-[#15803d] active:scale-95 text-white font-black py-2.5 px-4 rounded-xl text-xs flex items-center justify-center gap-2 shadow-lg shadow-emerald-950/50 cursor-pointer transition-all"
                >
                  <Send size={15} />
                  <span>Enviar Cotización a WhatsApp (+56 9 7869 1869)</span>
                </button>

                <button
                  type="button"
                  onClick={handlePrintQuote}
                  className="w-full bg-gray-800 hover:bg-gray-700 active:scale-95 text-gray-300 font-bold py-2.5 px-4 rounded-xl text-xs flex items-center justify-center gap-2 border border-gray-700 cursor-pointer transition-all"
                >
                  <Download size={15} />
                  <span>Imprimir / Guardar PDF Formal</span>
                </button>
              </div>

            </div>

          </div>

        </div>

      </div>
    </div>
  );
};
export default SenceCalculatorModal;
