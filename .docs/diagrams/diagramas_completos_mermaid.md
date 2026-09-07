# 📊 Diagramas Oficiales de Arquitectura y Procesos - PrevySeg 2026

**Proyecto:** Ecosistema Digital, Portal de Admisión Digital & Campus Virtual LMS PrevySeg  
**Formato:** Mermaid.js editable  
**Archivos individuales `.mmd`:** Ubicados en `/.docs/diagrams/mmd/`  
**Visor Web Interactivo:** Abrir con doble clic en `/.docs/diagrams/visor_diagramas.html`

---

## 1. Flujo de Procesos To-Be (BPMN 2.0)
*Archivo:* [01_flujo_procesos_bpmn.mmd](./mmd/01_flujo_procesos_bpmn.mmd)

```mermaid
graph TD
    A([Inicio: Postulante entra al Portal]) --> B[Selecciona Curso en Vitrina]
    B --> C{"¿Curso Seguridad SPD u Oficio?"}
    C -->|Seguridad Privada| D[Aviso: Examen ante SPD / OS-10]
    C -->|Escuela de Oficios| E[Aviso: Certificación Directa OTEC]
    D --> F[Completa Ficha de Admisión Digital]
    E --> F
    F --> G[Validación RUT Módulo 11 en tiempo real]
    G --> H[Cálculo Automático Cuota 1: 50%]
    H --> I[Pago de Abono vía Webpay o Transferencia]
    I --> J[Envío de Comprobante y Antecedentes a WhatsApp]
    J --> K{"¿Antecedentes Aprobados?"}
    K -->|No| L[Notificación de Subsanación al Postulante]
    L --> J
    K -->|Sí| M[Creación de Cuenta LMS con Hash Bcrypt]
    M --> N[Alumno Cursa Lecciones en Aula Virtual]
    N --> O[Pago Cuota 2: Saldo 50% Restante]
    O --> P[Evaluación Final de Competencias]
    P --> Q[Emisión de Diploma Oficial sin Notas]
    Q --> R([Fin del Proceso])
```

---

## 2. Diagrama de Casos de Uso (UML Comportamiento)
*Archivo:* [02_casos_de_uso.mmd](./mmd/02_casos_de_uso.mmd)

```mermaid
graph LR
    subgraph Actores
        P((Postulante))
        E((Estudiante))
        D((Docente))
        A((Administrador OTEC))
    end

    subgraph Portal["Portal Público & Admisión"]
        UC1["Inscribirse y Abonar 50%"]
        UC2["Calcular Franquicia SENCE"]
        UC3["Consultar por WhatsApp"]
    end

    subgraph LMS["Campus Virtual LMS"]
        UC4["Visualizar Clases y Contenidos"]
        UC5["Rendir Evaluaciones Online"]
        UC6["Descargar Diploma Oficial"]
        UC7["Gestionar Calificaciones"]
        UC8["Administrar Participantes & Claves"]
        UC9["Dar Visto Bueno a Certificados"]
    end

    P --> UC1
    P --> UC2
    P --> UC3
    E --> UC4
    E --> UC5
    E --> UC6
    D --> UC4
    D --> UC7
    A --> UC8
    A --> UC9
```

---

## 3. Diagrama de Secuencia: Flujo Crítico de Admisión con Bcrypt
*Archivo:* [03_secuencia_admision_bcrypt.mmd](./mmd/03_secuencia_admision_bcrypt.mmd)

```mermaid
sequenceDiagram
    autonumber
    actor Postulante
    participant Form as EnrollmentForm.jsx
    participant Val as validation.js
    participant Supa as Supabase Client
    participant PG as PostgreSQL (pgcrypto)
    participant WA as WhatsApp Business

    Postulante->>Form: Ingresa RUT, Correo y Selecciona Curso
    Form->>Val: formatRut(rut) y validateRut(rut)
    Val-->>Form: RUT Válido (true)
    Form->>Form: Calcula Cuota 1 (50%) y Cuota 2 (50%)
    Postulante->>Form: Hace clic en "Confirmar Inscripción"
    Form->>Supa: rpc('admin_create_user', { rut, password, rol: 'STUDENT' })
    Supa->>PG: extensions.crypt(password, gen_salt('bf'))
    PG-->>PG: Inserta en auth.users y public.users con hash Bcrypt
    PG-->>Supa: Registro Creado (200 OK)
    Supa-->>Form: Confirmación de Creación Exitosa
    Form->>WA: Redirige con mensaje estructurado y código de matrícula
    WA-->>Postulante: Ejecutivo recibe expediente para validar antecedentes
```

---

## 4. Diagrama de Estados: Ciclo de Vida de la Matrícula
*Archivo:* [04_estados_matricula.mmd](./mmd/04_estados_matricula.mmd)

```mermaid
stateDiagram-v2
    [*] --> PRE_INSCRITO: Completa Formulario Web
    PRE_INSCRITO --> ABONO_PENDIENTE: Plan 50% Generado
    ABONO_PENDIENTE --> VALIDACION_DOCUMENTAL: Pago Cuota 1 (50%)
    VALIDACION_DOCUMENTAL --> MATRICULADO_ACTIVO: Antecedentes Aprobados (SPD / OTEC)
    VALIDACION_DOCUMENTAL --> RECHAZADO: Antecedentes Incompatibles
    MATRICULADO_ACTIVO --> EN_CURSO: Acceso a Aula Virtual
    EN_CURSO --> SALDO_PENDIENTE: Finaliza Unidades Didácticas
    SALDO_PENDIENTE --> APROBADO: Pago Cuota 2 y Examen Rendido
    APROBADO --> CERTIFICADO_EMITIDO: Visto Bueno del Administrador
    CERTIFICADO_EMITIDO --> [*]
```

---

## 5. Diagrama de Clases del Dominio
*Archivo:* [05_clases_dominio.mmd](./mmd/05_clases_dominio.mmd)

```mermaid
classDiagram
    class Usuario {
        +UUID id
        +String rut
        +String email
        +String nombreCompleto
        +String rol
        +String passwordHash
        +validarRut() Boolean
        +verificarPassword(String input) Boolean
    }

    class Curso {
        +UUID id
        +String codigoSence
        +String nombre
        +String tipoNormativo
        +Integer arancelTotal
        +Integer horasCronologicas
        +calcularCuotaAbono() Integer
    }

    class Matricula {
        +UUID id
        +String estado
        +Integer montoAbonado
        +Integer saldoPendiente
        +DateTime fechaMatricula
        +registrarAbono(Integer monto) Void
    }

    class Certificado {
        +UUID id
        +String codigoVerificacion
        +DateTime fechaEmision
        +Boolean aprobadoAdmin
        +generarDocumentoPDF() Byte[]
    }

    Usuario "1" <-- "*" Matricula : realizada por
    Curso "1" <-- "*" Matricula : corresponde a
    Matricula "1" <-- "0..1" Certificado : emite
```

---

## 6. Modelo Entidad-Relación Físico (DER)
*Archivo:* [06_modelo_entidad_relacion_der.mmd](./mmd/06_modelo_entidad_relacion_der.mmd)

```mermaid
erDiagram
    USERS {
        uuid id PK
        string rut UK
        string email UK
        string nombre_completo
        string rol "ADMIN | TEACHER | STUDENT"
        string telefono
        string encrypted_password
        timestamp created_at
    }

    COURSES {
        uuid id PK
        string codigo_sence UK
        string nombre
        string tipo "SEGURIDAD_SPD | OFICIO_OTEC"
        integer arancel_total
        integer cuota_abono_50
        integer horas_cronologicas
        boolean activo
    }

    ENROLLMENTS {
        uuid id PK
        uuid user_id FK
        uuid course_id FK
        string estado "PRE_INSCRITO | ACTIVO | APROBADO"
        integer monto_abonado
        integer saldo_pendiente
        string comprobante_abono_url
        timestamp fecha_matricula
    }

    LESSONS {
        uuid id PK
        uuid course_id FK
        string titulo
        integer orden
        text contenido_markdown
        string video_url
    }

    CERTIFICATES {
        uuid id PK
        uuid enrollment_id FK
        string codigo_verificacion UK
        timestamp fecha_emision
        boolean aprobado_por_admin
        string hash_verificador
    }

    USERS ||--o{ ENROLLMENTS : "posee"
    COURSES ||--o{ ENROLLMENTS : "incluye"
    COURSES ||--o{ LESSONS : "contiene"
    ENROLLMENTS ||--o| CERTIFICATES : "origina"
```

---

## 7. Diagrama de Contenedores (C4 Model - Nivel 2)
*Archivo:* [07_c4_contenedores.mmd](./mmd/07_c4_contenedores.mmd)

```mermaid
graph TB
    subgraph C4["C4: Nivel 2 - Diagrama de Contenedores PrevySeg"]
        USER["Usuarios Web: Alumnos, Docentes, Admins"] -->|HTTPS / TLS 1.3| SPA["Single Page Application: React 19 + Vite + Tailwind v4"]
        SPA -->|REST / PostgREST| API_REST["Supabase PostgREST API Gateway"]
        SPA -->|Auth JWT & Bcrypt| AUTH_SVC["Supabase GoTrue Auth Service"]
        SPA -->|WebSockets WSS| RT_SVC["Supabase Realtime Engine"]
        
        API_REST -->|SQL con Row Level Security| DB[("PostgreSQL 15 Cluster + pgcrypto")]
        AUTH_SVC -->|Stored Procedures Bcrypt| DB
        SPA -->|HTTPS Webhook| WA["WhatsApp Business API"]
        SPA -->|Redirect / Token| WEBPAY["Pasarela Webpay Plus Transbank"]
    end
```

---

## 8. Diagrama de Despliegue de Infraestructura
*Archivo:* [08_despliegue_infraestructura.mmd](./mmd/08_despliegue_infraestructura.mmd)

```mermaid
graph LR
    subgraph Clientes["Clientes"]
        NAV["Navegadores Modernos: Chrome, Edge, Safari, Móvil"]
    end

    subgraph Edge["Edge CDN & Static Hosting (Vercel Global Network)"]
        EDGE_SRV["Vercel Global Edge Points of Presence"]
        STATIC["Assets Compilados: HTML, CSS, Bundles JS, WebP"]
    end

    subgraph BaaS["BaaS Cloud Infrastructure (Supabase AWS us-east-1)"]
        KONG["Kong API Gateway Reverse Proxy"]
        AUTH_POD["GoTrue Auth Service Docker Container"]
        PG_POD[("PostgreSQL 15 Primary con Réplicas")]
        S3_POD["S3 Object Storage: Diplomas y Comprobantes"]
    end

    NAV -->|HTTPS Port 443| EDGE_SRV
    EDGE_SRV --> STATIC
    NAV -->|API Requests TLS 1.3 / Port 443| KONG
    KONG --> AUTH_POD
    KONG --> PG_POD
    KONG --> S3_POD
```
