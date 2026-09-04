import { createClient } from '@supabase/supabase-js';
import { 
  cleanRut, 
  formatRut, 
  validateRut, 
  validateEmail, 
  validatePhone, 
  validatePassword,
  validatePasswordMatch 
} from '../utils/validation.js';

const supabaseUrl = (typeof import.meta !== 'undefined' && import.meta.env?.VITE_SUPABASE_URL) || 'https://clmamemnvttgdvebjnbw.supabase.co';
const supabaseAnonKey = (typeof import.meta !== 'undefined' && import.meta.env?.VITE_SUPABASE_ANON_KEY) || 'sb_publishable__6Wz6iIQr9iWg4aL0PRfhg_geJLzXLw';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

export { 
  cleanRut, 
  formatRut, 
  validateRut, 
  validateEmail, 
  validatePhone, 
  validatePassword, 
  validatePasswordMatch 
};

/**
 * Mapea el RUT normalizado al formato de correo interno seguro para Supabase Auth.
 * Ej: "15.692.858-5" -> "156928585@prevyseg.cl"
 */
export const rutToEmail = (rut = '') => {
  const cleaned = cleanRut(rut);
  return `${cleaned}@prevyseg.cl`;
};

/**
 * Inicia sesión usando RUT y Contraseña contra Supabase Auth y consulta public.users.
 */
export const loginWithRut = async (rut, password) => {
  const cleaned = cleanRut(rut);
  if (!cleaned) {
    throw new Error('Por favor ingresa tu RUT de usuario.');
  }

  const cleanPass = String(password || '').trim();
  if (!cleanPass) {
    throw new Error('Por favor ingresa tu contraseña de acceso.');
  }

  const email = rutToEmail(cleaned);

  const { data: authData, error: authError } = await supabase.auth.signInWithPassword({
    email,
    password: cleanPass,
  });

  if (authError) {
    throw new Error('RUT o contraseña incorrectos. Verifica tus datos o regístrate si eres alumno nuevo.');
  }

  if (!authData?.user) {
    throw new Error('No se pudo autenticar el usuario en el sistema.');
  }

  // Obtener perfil desde public.users
  const { data: profile, error: profError } = await supabase
    .from('users')
    .select('*')
    .eq('id', authData.user.id)
    .single();

  if (profError || !profile) {
    // Si no tiene perfil aún, usar la metadata de auth
    const fallbackUser = {
      id: authData.user.id,
      email: authData.user.email,
      rut: formatRut(cleaned) || cleaned,
      nombre: authData.user.user_metadata?.nombre || 'Usuario PrevySeg',
      rol: authData.user.user_metadata?.rol || 'STUDENT',
      telefono: authData.user.user_metadata?.telefono || '',
      cargo: authData.user.user_metadata?.rol === 'ADMIN' ? 'Administrador OTEC' : 'Alumno Regular',
    };
    return fallbackUser;
  }

  return {
    ...profile,
    user: profile.rut, // Compatibilidad con vistas previas
    cargo: profile.rol === 'ADMIN' 
      ? 'Director Ejecutivo / Administrador OTEC' 
      : profile.rol === 'TEACHER' 
      ? 'Docente Instructor SPD' 
      : 'Estudiante / Alumno Regular',
  };
};

/**
 * Registra un nuevo estudiante en Supabase Auth y public.users mediante el procedimiento seguro de base de datos con hash Bcrypt.
 */
export const registerStudent = async ({ rut, password, nombre, emailPersonal, telefono, ciudad, escuela }) => {
  const cleaned = cleanRut(rut);
  if (!cleaned || cleaned.length < 6) {
    throw new Error('El RUT ingresado no es válido. Debe tener al menos 7 caracteres.');
  }

  if (!nombre || !nombre.trim()) {
    throw new Error('El nombre completo es obligatorio.');
  }

  const cleanPass = password && password.trim() ? password.trim() : cleaned;
  if (cleanPass.length < 4) {
    throw new Error('La contraseña debe contener al menos 4 caracteres.');
  }

  // 1. Invocar procedimiento seguro en base de datos PostgreSQL
  const { data: regUser, error: rpcError } = await supabase.rpc('register_new_student', {
    p_rut: formatRut(cleaned) || String(rut).trim(),
    p_password: cleanPass,
    p_nombre: String(nombre).trim(),
    p_email: emailPersonal ? String(emailPersonal).trim() : '',
    p_telefono: telefono ? String(telefono).trim() : '',
    p_domicilio: ciudad ? `${ciudad}, Chile` : 'Arica, Chile',
    p_escuela: escuela || 'seguridad',
  });

  if (rpcError) {
    if (rpcError.message?.includes('ya se encuentra registrado')) {
      throw new Error('Este RUT ya se encuentra registrado en la plataforma. Por favor inicia sesión directamente con tu contraseña.');
    }
    throw new Error(rpcError.message || 'Error al registrar postulante en la base de datos.');
  }

  // 2. Iniciar sesión automáticamente para el nuevo estudiante
  try {
    const authEmail = rutToEmail(cleaned);
    const { data: authData } = await supabase.auth.signInWithPassword({
      email: authEmail,
      password: cleanPass,
    });
    if (authData?.user) {
      return {
        ...regUser,
        id: authData.user.id,
      };
    }
  } catch (signErr) {
    console.warn('Auto login after registration notice:', signErr);
  }

  return regUser;
};

/**
 * Crea un usuario desde el panel de Administración con contraseña encriptada (Bcrypt) y asignación opcional de curso.
 */
export const adminCreateUser = async ({ rut, nombre, email, rol = 'STUDENT', telefono = '', password = null, courseId = null }) => {
  const cleaned = cleanRut(rut);
  if (!cleaned || cleaned.length < 6) {
    throw new Error('El RUT ingresado no es válido.');
  }

  if (!nombre || !nombre.trim()) {
    throw new Error('El nombre completo es requerido.');
  }

  const formattedRut = formatRut(cleaned);
  const passToUse = password && password.trim() ? password.trim() : cleaned;

  const { data, error } = await supabase.rpc('admin_create_user', {
    p_rut: formattedRut,
    p_nombre: String(nombre).trim(),
    p_email: email ? String(email).trim() : '',
    p_rol: rol,
    p_telefono: telefono ? String(telefono).trim() : '',
    p_password: passToUse,
    p_course_id: courseId || null,
  });

  if (error) {
    if (error.message?.includes('ya se encuentra registrado')) {
      throw new Error(`El RUT ${formattedRut} ya se encuentra registrado en el sistema.`);
    }
    throw new Error(error.message || 'Error al crear usuario en la base de datos.');
  }

  return data;
};

/**
 * Cambia o actualiza la contraseña de un usuario de forma segura con hash Bcrypt.
 */
export const changeUserPassword = async (userId, newPassword) => {
  if (!userId) throw new Error('ID de usuario requerido.');
  if (!newPassword || newPassword.trim().length < 4) {
    throw new Error('La nueva contraseña debe tener al menos 4 caracteres.');
  }

  const { data, error } = await supabase.rpc('change_user_password', {
    p_user_id: userId,
    p_new_password: newPassword.trim(),
  });

  if (error) {
    throw new Error(error.message || 'Error al actualizar contraseña.');
  }

  return data;
};

/**
 * Comprueba si un RUT ya existe en el sistema.
 */
export const checkRutExists = async (rut) => {
  if (!rut) return false;
  const { data, error } = await supabase.rpc('check_rut_exists', {
    p_rut: String(rut).trim(),
  });
  if (error) return false;
  return Boolean(data);
};

/**
 * Cierra la sesión activa.
 */
export const logoutUser = async () => {
  await supabase.auth.signOut();
};
