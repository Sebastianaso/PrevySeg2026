# 🔄 Diagrama de Flujo de Interacción del Usuario (PrevySeg 2026)

Este documento describe el **viaje completo y la interacción de los usuarios** dentro de la plataforma PrevySeg, explicado con **lenguaje simple, intuitivo y sin tecnicismos** para presentaciones ejecutivas y académicas.

---

## 1. 🌟 Diagrama de Flujo Principal: ¿Cómo Interactúa una Persona con la Web?

```mermaid
flowchart TD
    %% Estilos amigables y accesibles
    classDef inicio fill:#0284c7,stroke:#0369a1,stroke-width:2px,color:#fff;
    classDef alumno fill:#0f766e,stroke:#0d9488,stroke-width:2px,color:#fff;
    classDef admin fill:#7c3aed,stroke:#6d28d9,stroke-width:2px,color:#fff;
    classDef exito fill:#16a34a,stroke:#15803d,stroke-width:2px,color:#fff;
    classDef decision fill:#f59e0b,stroke:#d97706,stroke-width:2px,color:#fff;

    INICIO(["1. La persona entra a la página web de PrevySeg"]):::inicio
    
    INICIO --> ELECCION{"¿Qué desea hacer?"}:::decision
    
    %% OPCION A: CONSULTAR
    ELECCION -->|"Conocer cursos o cotizar"| WEB_PUBLICA["Revisa los 6 Cursos de Seguridad y los descuentos SENCE"]:::inicio
    WEB_PUBLICA --> CONSULTA["Presiona 'Envíanos un Mensaje' y chatea directamente al WhatsApp de PrevySeg (+56 9 7869 1869)"]:::inicio
    
    %% OPCION B: INGRESAR AL AULA
    ELECCION -->|"Entrar a estudiar o administrar"| LOGIN["Presiona 'Plataforma Virtual' e ingresa su RUT y contraseña"]:::inicio
    
    LOGIN --> TIPO_USUARIO{"¿Quién está ingresando?"}:::decision
    
    %% FLUJO DEL ESTUDIANTE
    TIPO_USUARIO -->|"Es un Alumno"| PANEL_ALUMNO["Entra a su 'Área Personal' donde ve sus materias inscritas"]:::alumno
    
    PANEL_ALUMNO --> CLASES["Apreta su curso y entra al Aula Virtual:
    • Mira los videos de las clases en HD
    • Descarga los manuales y guías en PDF"]:::alumno
    
    CLASES --> EXAMEN["Rinde el Simulador de Examen de Guardia OS-10"]:::alumno
    
    EXAMEN --> NOTA{"¿Aprobó el examen?"}:::decision
    
    NOTA -->|"Menos del 75% (Reprobado)"| REINTENTO["El sistema le explica en qué se equivocó y le permite volver a repasar los módulos"]:::alumno
    REINTENTO --> EXAMEN
    
    NOTA -->|"75% o más (Aprobado)"| AVISO_ADMIN["¡Felicitaciones! El sistema avisa a la Dirección que el alumno completó el curso"]:::exito
    
    %% FLUJO DEL ADMINISTRADOR / DIRECTOR
    TIPO_USUARIO -->|"Es el Director / Administrador"| PANEL_ADMIN["Entra al Panel de Dirección y Gestión del Campus"]:::admin
    
    AVISO_ADMIN --> REVISION["El Director Académico revisa que el alumno completó todas las materias"]:::admin
    PANEL_ADMIN --> REVISION
    
    REVISION --> VISTO_BUENO["El Director presiona el botón:
    'Dar Visto Bueno y Aprobar'"]:::admin
    
    %% ENTREGA DEL DIPLOMA
    VISTO_BUENO --> ENVIO_CORREO["El sistema envía automáticamente un correo al estudiante con su diploma digital adjunto"]:::exito
    
    ENVIO_CORREO --> DESCARGA_DIPLOMA["El estudiante descarga su Diploma Oficial en PDF:
    • Certifica que está 100% capacitado para trabajar
    • Acreditado ante Carabineros OS-10 (Vigencia 3 años)
    • Resguarda sus notas personales de forma confidencial"]:::exito
    
    DESCARGA_DIPLOMA --> BOLSA_TRABAJO["El alumno puede postular a ofertas laborales en la Bolsa de Empleo de Arica"]:::exito
    
    BOLSA_TRABAJO --> FIN(["¡Proceso Terminado con Éxito!"]):::exito
```

---

## 2. ⏱️ Diagrama de Secuencia: Paso a Paso entre el Alumno, la Plataforma y el Director

```mermaid
sequenceDiagram
    autonumber
    actor Alumno as 🎒 Estudiante
    participant Web as 💻 Plataforma PrevySeg
    actor Director as 👔 Director Académico
    participant Correo as ✉️ Correo Electrónico

    Alumno->>Web: Ingresa con su RUT y ve sus videos de clases
    Alumno->>Web: Rinde el examen de prueba de Guardia OS-10 (Obtiene 75% o más)
    Web-->>Alumno: Mensaje: "¡Curso Finalizado! Esperando Visto Bueno del Director"
    Web->>Director: Alerta en su panel: "El alumno Matías Silva completó el curso"
    
    Director->>Web: Revisa el cumplimiento y presiona "Dar Visto Bueno"
    
    critical Envío Automático
        Web->>Web: Genera el Diploma Oficial en PDF con firmas y timbres legales
        Web->>Correo: Despacha el Diploma al correo personal del alumno
        Correo-->>Alumno: Recibe notificación: "Tu Diploma PrevySeg está listo"
    end
    
    Alumno->>Web: Presiona "Descargar Copia Oficial (PDF)" para guardarlo o imprimirlo
```

---

## 3. 🌓 Diagrama del Botón de Accesibilidad (Modo Claro / Modo Oscuro)

```mermaid
flowchart TD
    BOTON["El usuario desliza el interruptor en la parte superior:
    ☀️ Sol  ◄───►  🌙 Luna"]

    BOTON --> ELECCION{"¿Hacia qué lado lo deslizó?"}

    ELECCION -->|"Hacia el Sol ☀️"| MODO_CLARO["FONDO BLANCO CON LETRAS NEGRAS:
    • Ideal para personas con baja visión o dificultad para leer
    • Perfecto para leer bajo la luz del sol en Arica"]

    ELECCION -->|"Hacia la Luna 🌙"| MODO_OSCURO["FONDO OSCURO CON LETRAS CLARAS:
    • Diseño nocturno moderno y elegante
    • Descansa los ojos en lugares con poca luz"]

    MODO_CLARO --> MEMORIA["La página recuerda tu preferencia para todas tus visitas"]
    MODO_OSCURO --> MEMORIA
```

---

## 4. 📝 Resumen Ejecutivo de los 5 Pasos Clave

1. **Paso 1 (Entrada y Asesoría):** Cualquier persona puede ver los cursos de Guardia de Seguridad, CCTV y Supervisores con financiamiento SENCE, y consultar dudas por WhatsApp en un clic.
2. **Paso 2 (Aula Virtual):** El estudiante entra con su RUT a ver sus videos de clases en alta definición y descarga sus manuales de estudio.
3. **Paso 3 (Evaluación OS-10):** El alumno practica con el simulador oficial de Carabineros OS-10; si no alcanza el 75%, el sistema le explica los errores para que vuelva a intentar.
4. **Paso 4 (Visto Bueno de Dirección):** El Director Académico revisa el expediente del alumno y otorga el visto bueno formal.
5. **Paso 5 (Diploma y Empleo):** El diploma digital oficial llega automáticamente al correo del alumno en PDF (sin notas confidenciales) y se habilita la postulación a la Bolsa de Empleo de Arica.
