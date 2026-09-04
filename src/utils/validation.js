/**
 * Módulo de Validaciones y Criptografía de PrevySeg OTEC
 * 
 * Incluye:
 * - Algoritmo Módulo 11 oficial para Cédula de Identidad / RUT Chileno.
 * - Formateador dinámico de RUT en tiempo real (XX.XXX.XXX-X).
 * - Sanitizador y normalizador de RUT.
 * - Validador de correos electrónicos corporativos y personales.
 * - Validador y formateador de teléfonos chilenos (+56 9 XXXX XXXX).
 * - Validador de robustez y complejidad de contraseñas.
 */

/**
 * Limpia un RUT eliminando puntos, guiones y espacios en blanco.
 * Ej: "15.692.858-5" -> "156928585"
 * @param {string} rut
 * @returns {string}
 */
export const cleanRut = (rut = '') => {
  if (!rut) return '';
  return String(rut).replace(/[^0-9kK]/g, '').trim().toLowerCase();
};

/**
 * Formatea un RUT mientras el usuario escribe, agregando puntos y guión.
 * Ej: "156928585" -> "15.692.858-5"
 * Ej: "1234567k" -> "1.234.567-K"
 * @param {string} rut
 * @returns {string}
 */
export const formatRut = (rut = '') => {
  if (!rut) return '';
  
  // Limpiar caracteres inválidos
  const clean = String(rut).replace(/[^0-9kK]/g, '').toUpperCase();
  if (!clean) return '';
  
  // Si solo tiene 1 caracter, devolverlo
  if (clean.length <= 1) return clean;
  
  // Extraer cuerpo y dígito verificador
  const dv = clean.slice(-1);
  const body = clean.slice(0, -1);
  
  // Formatear cuerpo con puntos
  let formattedBody = '';
  let count = 0;
  for (let i = body.length - 1; i >= 0; i--) {
    formattedBody = body[i] + formattedBody;
    count++;
    if (count === 3 && i > 0) {
      formattedBody = '.' + formattedBody;
      count = 0;
    }
  }
  
  return `${formattedBody}-${dv}`;
};

/**
 * Calcula el Dígito Verificador (DV) oficial de un cuerpo de RUT mediante el algoritmo Módulo 11.
 * @param {string|number} rutBody
 * @returns {string} Dígito verificador ('0'-'9' o 'K')
 */
export const calculateRutDv = (rutBody) => {
  const cleanBody = String(rutBody).replace(/[^0-9]/g, '');
  if (!cleanBody) return '';
  
  let sum = 0;
  let multiplier = 2;
  
  for (let i = cleanBody.length - 1; i >= 0; i--) {
    sum += parseInt(cleanBody[i], 10) * multiplier;
    multiplier = multiplier === 7 ? 2 : multiplier + 1;
  }
  
  const remainder = 11 - (sum % 11);
  if (remainder === 11) return '0';
  if (remainder === 10) return 'K';
  return String(remainder);
};

/**
 * Valida un RUT chileno (longitud, formato y algoritmo Módulo 11).
 * @param {string} rut
 * @param {Object} options
 * @param {boolean} options.strictDv - Si es true, valida el dígito verificador matemáticamente.
 * @returns {{ isValid: boolean, error: string|null, formatted: string, clean: string, expectedDv: string|null }}
 */
export const validateRut = (rut = '', { strictDv = true } = {}) => {
  const clean = cleanRut(rut);
  
  if (!clean) {
    return {
      isValid: false,
      error: 'El RUT es obligatorio.',
      formatted: '',
      clean: '',
      expectedDv: null
    };
  }
  
  if (clean.length < 7 || clean.length > 9) {
    return {
      isValid: false,
      error: 'El RUT debe contener entre 7 y 9 caracteres (cuerpo + dígito verificador).',
      formatted: formatRut(clean),
      clean,
      expectedDv: null
    };
  }
  
  const body = clean.slice(0, -1);
  const dv = clean.slice(-1).toUpperCase();
  
  if (!/^[0-9]+$/.test(body)) {
    return {
      isValid: false,
      error: 'El cuerpo del RUT debe contener exclusivamente números.',
      formatted: formatRut(clean),
      clean,
      expectedDv: null
    };
  }
  
  if (!/^[0-9K]$/.test(dv)) {
    return {
      isValid: false,
      error: 'El dígito verificador debe ser un número o la letra K.',
      formatted: formatRut(clean),
      clean,
      expectedDv: null
    };
  }
  
  const expectedDv = calculateRutDv(body);
  
  if (strictDv && dv !== expectedDv) {
    return {
      isValid: false,
      error: `Dígito verificador incorrecto. El DV calculado para ${body} es "${expectedDv}".`,
      formatted: formatRut(clean),
      clean,
      expectedDv
    };
  }
  
  return {
    isValid: true,
    error: null,
    formatted: formatRut(clean),
    clean,
    expectedDv
  };
};

/**
 * Valida una dirección de correo electrónico con expresión regular RFC 5322 simplificada.
 * @param {string} email
 * @returns {{ isValid: boolean, error: string|null }}
 */
export const validateEmail = (email = '') => {
  const trimmed = String(email).trim();
  if (!trimmed) {
    return { isValid: false, error: 'El correo electrónico es requerido.' };
  }
  
  // RFC 5322 compatible regex
  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  if (!emailRegex.test(trimmed)) {
    return { isValid: false, error: 'Formato de correo inválido (ejemplo: alumno@gmail.com).' };
  }
  
  return { isValid: true, error: null };
};

/**
 * Valida y normaliza un número de teléfono de contacto / WhatsApp.
 * @param {string} phone
 * @returns {{ isValid: boolean, error: string|null, formatted: string }}
 */
export const validatePhone = (phone = '') => {
  const trimmed = String(phone).trim();
  if (!trimmed) {
    return { isValid: false, error: 'El teléfono de contacto es requerido.', formatted: '' };
  }
  
  const digits = trimmed.replace(/[^0-9]/g, '');
  if (digits.length < 8) {
    return { 
      isValid: false, 
      error: 'El teléfono debe contener al menos 8 dígitos (ej: +56 9 8231 2128).',
      formatted: trimmed 
    };
  }
  
  // Formatear a estándar chileno si empieza con 569 o 9
  let formatted = trimmed;
  if (digits.startsWith('569') && digits.length === 11) {
    formatted = `+56 9 ${digits.slice(3, 7)} ${digits.slice(7)}`;
  } else if (digits.startsWith('9') && digits.length === 9) {
    formatted = `+56 9 ${digits.slice(1, 5)} ${digits.slice(5)}`;
  }
  
  return { isValid: true, error: null, formatted };
};

/**
 * Evalúa la robustez y seguridad de una contraseña.
 * Criterios evaluados:
 * - Longitud (mínimo 4 caracteres para accesibilidad, 6+ recomendada, 8+ óptima).
 * - Inclusión de minúsculas y mayúsculas.
 * - Inclusión de números.
 * - Inclusión de símbolos / caracteres especiales.
 * 
 * @param {string} password
 * @param {Object} options
 * @param {number} options.minLength - Longitud mínima permitida (por defecto 4).
 * @returns {{ isValid: boolean, score: number, label: string, color: string, barPercent: number, errors: string[] }}
 */
export const validatePassword = (password = '', { minLength = 4 } = {}) => {
  const pass = String(password);
  const errors = [];
  
  if (!pass || pass.length < minLength) {
    errors.push(`Debe tener al menos ${minLength} caracteres.`);
  }
  
  const hasLower = /[a-z]/.test(pass);
  const hasUpper = /[A-Z]/.test(pass);
  const hasDigit = /[0-9]/.test(pass);
  const hasSpecial = /[^A-Za-z0-9]/.test(pass);
  
  let score = 0;
  if (pass.length >= minLength) score += 1;
  if (pass.length >= 8) score += 1;
  if ((hasLower && hasUpper) || (hasLower && hasDigit) || (hasUpper && hasDigit)) score += 1;
  if (hasSpecial || (hasLower && hasUpper && hasDigit && pass.length >= 8)) score += 1;
  
  // Score 0: Muy Débil, 1: Débil, 2: Aceptable, 3: Segura, 4: Muy Segura
  const levels = [
    { score: 0, label: 'Muy Débil', color: 'bg-rose-500 text-rose-600', barPercent: 15 },
    { score: 1, label: 'Débil', color: 'bg-amber-500 text-amber-600', barPercent: 35 },
    { score: 2, label: 'Aceptable', color: 'bg-yellow-500 text-yellow-600', barPercent: 65 },
    { score: 3, label: 'Segura', color: 'bg-teal-500 text-teal-600', barPercent: 85 },
    { score: 4, label: 'Muy Segura', color: 'bg-emerald-600 text-emerald-600', barPercent: 100 },
  ];
  
  const level = levels[Math.min(score, 4)];
  
  return {
    isValid: errors.length === 0,
    score,
    label: level.label,
    color: level.color,
    barPercent: level.barPercent,
    errors
  };
};

/**
 * Valida la coincidencia exacta entre la contraseña y su confirmación.
 * @param {string} password
 * @param {string} confirmPassword
 * @returns {{ isValid: boolean, error: string|null }}
 */
export const validatePasswordMatch = (password = '', confirmPassword = '') => {
  if (!password || !confirmPassword) {
    return { isValid: false, error: 'Ambos campos de contraseña son requeridos.' };
  }
  if (password !== confirmPassword) {
    return { isValid: false, error: 'Las contraseñas no coinciden. Verifícalas cuidadosamente.' };
  }
  return { isValid: true, error: null };
};
