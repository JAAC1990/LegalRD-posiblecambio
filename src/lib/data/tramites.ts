/**
 * ====================================================================
 * LEGAL RD — SISTEMA OPERATIVO JURÍDICO DOMINICANO
 * ====================================================================
 * Módulo: Guía Oficial de Trámites Jurídicos e Institucionales de la República Dominicana
 * Ruta: src/lib/data/tramites.ts
 * Ámbito Legal: Derecho Administrativo, Tributario, Corporativo y Registral Dominicano
 * 
 * PROPÓSITO:
 * Estructura detallada de pasos, requisitos, costos oficiales y ventanillas para trámites ante DGII, Registro de Títulos, ONAPI, Ministerio de Trabajo y Tesorería de la Seguridad Social (TSS).
 * 
 * FUNDAMENTOS NORMATIVOS:
 * Código Tributario (Ley 11-92, Art. 288), Ley 108-05 de Registro Inmobiliario, Ley 20-00 sobre Propiedad Industrial, Ley 87-01 sobre el Sistema Dominicano de Seguridad Social.
 * 
 * REGLA FUNDAMENTAL DE PRESERVACIÓN ACUMULATIVA:
 * Este archivo forma parte del ecosistema integral de Legal RD.
 * No se permite eliminar, simplificar ni alterar la lógica preexistente.
 * ====================================================================
 */

// Guía Integral de Trámites Jurídicos y Administrativos de la República Dominicana

/**
 * Interfaz: `TramiteOfficialItem`
 * Modela la estructura de datos para TramiteOfficialItem en el ecosistema jurídico de Legal RD.
 */
export interface TramiteOfficialItem {
  id: string;
  slug: string;
  title: string;
  institution: string;
  institutionCategory: 'DGII' | 'REGISTRO_INMOBILIARIO' | 'ONAPI' | 'PODER_JUDICIAL' | 'MINISTERIO_TRABAJO' | 'TSS' | 'PROCURADURIA';
  institutionLogo?: string;
  specialtySlug: string;
  specialtyName: string;
  legalBasis: string;
  estimatedDays: string;
  officialCostRD: string;
  isDigitalAvailable: boolean;
  officialPortalUrl: string;
  overview: string;
  prerequisites: string[];
  mandatoryDocuments: {
    name: string;
    isOriginal: boolean;
    copiesNeeded: number;
    observations?: string;
  }[];
  steps: {
    stepNumber: number;
    title: string;
    description: string;
    responsibleEntity: string;
  }[];
  officialForms: {
    formCode: string;
    title: string;
    downloadUrl?: string;
  }[];
  contactChannels: {
    phone: string;
    email: string;
    physicalAddress: string;
  };
}

/**
 * Catálogo Maestro / Constante: `DOMINICAN_OFFICIAL_TRAMITES`
 * Datos estructurados y verificados del ordenamiento jurídico de la República Dominicana.
 */
export const DOMINICAN_OFFICIAL_TRAMITES: TramiteOfficialItem[] = [
  // 1. DGII - Transferencia Inmobiliaria
  {
    id: 'tram-dgii-1',
    slug: 'transferencia-inmobiliaria-dgii',
    title: 'Pago de Impuesto por Transferencia Inmobiliaria (3%)',
    institution: 'Dirección General de Impuestos Internos (DGII)',
    institutionCategory: 'DGII',
    specialtySlug: 'derecho-tributario',
    specialtyName: 'Derecho Tributario / Inmobiliario',
    legalBasis: 'Ley No. 173-07 de Eficiencia Recaudatoria y Código Tributario (Ley 11-92)',
    estimatedDays: '3 a 5 días hábiles para liquidación',
    officialCostRD: '3% del valor del inmueble tasado o valor de venta consignado (el mayor de ambos) + RD$ 100.00 recibo Ley 33-91',
    isDigitalAvailable: true,
    officialPortalUrl: 'https://dgii.gov.do/servicios/bienesInmuebles/transferencia',
    overview: 'Trámite obligatorio para liquidar el 3% de impuesto de transferencia inmobiliaria ante la DGII previo al depósito de la venta en el Registro de Títulos competente.',
    prerequisites: [
      'Inmueble con designación catastral posicional definitiva y Registro de Título al día.',
      'Vendedor y Comprador al día en sus obligaciones tributarias (RNC/Cédula activa).',
      'Certificación de IPI al día expedida por la DGII.',
    ],
    mandatoryDocuments: [
      { name: 'Acto de Venta original notarizado y legalizado ante la Procuraduría General de la República', isOriginal: true, copiesNeeded: 3, observations: 'Debe contener la descripción catastral idéntica al Certificado de Título' },
      { name: 'Duplicado del Dueño del Certificado de Título original o copia fiel', isOriginal: false, copiesNeeded: 1 },
      { name: 'Copias legibles de Cédulas de Identidad de compradores y vendedores (o RNC si son personas morales)', isOriginal: false, copiesNeeded: 2 },
      { name: 'Formulario de Solicitud de Transferencia Inmobiliaria (FI-VBI-001)', isOriginal: true, copiesNeeded: 1 },
      { name: 'Tasación oficial de la DGII si el valor fiscal no está actualizado en sistema', isOriginal: false, copiesNeeded: 1 },
    ],
    steps: [
      { stepNumber: 1, title: 'Instrumentación del Acto de Venta', description: 'Redacción y firma ante Notario Público matriculado en el Colegio Dominicano de Notarios y legalización de firma en Procuraduría.', responsibleEntity: 'Notario Público y Partes' },
      { stepNumber: 2, title: 'Depósito ante Administración Local de la DGII o Portal Web', description: 'Presentación del expediente con el formulario FI-VBI-001 para la tasación y emisión del recibo de pago.', responsibleEntity: 'DGII' },
      { stepNumber: 3, title: 'Pago del 3% y Emisión de Recibo Oficial', description: 'Efectuar el pago en ventanilla bancaria autorizada o plataforma virtual y obtener el recibo con sello de descargo tributario.', responsibleEntity: 'Entidad Bancaria / DGII' },
      { stepNumber: 4, title: 'Remisión a Registro de Títulos', description: 'Anexar el recibo original de pago de la DGII al expediente de transferencia a depositar en el Registro de Títulos.', responsibleEntity: 'Abogado / Gestor' },
    ],
    officialForms: [
      { formCode: 'FI-VBI-001', title: 'Formulario de Liquidación de Transferencias Inmobiliarias', downloadUrl: '/repositorio' },
    ],
    contactChannels: {
      phone: '+1 (809) 689-3444',
      email: 'informacion@dgii.gov.do',
      physicalAddress: 'Av. México No. 48, Gazcue, Santo Domingo, D.N.',
    },
  },

  // 2. Registro Inmobiliario - Transferencia de Título
  {
    id: 'tram-ri-1',
    slug: 'transferencia-registro-titulos',
    title: 'Expedición de Nuevo Certificado de Título por Venta',
    institution: 'Registro Inmobiliario (Jurisdicción Inmobiliaria)',
    institutionCategory: 'REGISTRO_INMOBILIARIO',
    specialtySlug: 'derecho-inmobiliario',
    specialtyName: 'Derecho Inmobiliario',
    legalBasis: 'Ley No. 108-05 de Registro Inmobiliario y Reglamento del Registro de Títulos',
    estimatedDays: '15 a 30 días hábiles (según oficina registral)',
    officialCostRD: 'RD$ 2,000.00 a RD$ 3,500.00 en tasas por servicios registrales + Sellos de Ley 33-91',
    isDigitalAvailable: true,
    officialPortalUrl: 'https://ri.gob.do',
    overview: 'Registro formal de la transmisión de derechos reales inmobiliarios mediante la cancelación del Certificado de Título anterior y expedición del nuevo título a nombre del adquiriente.',
    prerequisites: [
      'Haber pagado previamente el impuesto de transferencia del 3% en la DGII.',
      'Duplicado del Dueño original disponible para su entrega y anulación.',
      'Inmueble sin bloqueos registrales, hipotecas vigentes no canceladas ni litis inscritas.',
    ],
    mandatoryDocuments: [
      { name: 'Duplicado del Dueño del Certificado de Título Original', isOriginal: true, copiesNeeded: 1, observations: 'Indispensable; si está extraviado debe agotarse previamente el trámite de duplicado por pérdida' },
      { name: 'Contrato de Venta original sellado por la DGII', isOriginal: true, copiesNeeded: 1 },
      { name: 'Recibo oficial de pago del 3% emitido por la DGII', isOriginal: true, copiesNeeded: 1 },
      { name: 'Certificación de IPI libre de deuda con vigencia no mayor a 30 días', isOriginal: true, copiesNeeded: 1 },
      { name: 'Comprobante de pago de tasas de servicio de la Jurisdicción Inmobiliaria', isOriginal: true, copiesNeeded: 1 },
    ],
    steps: [
      { stepNumber: 1, title: 'Solicitud de Turno Virtual o Presencial', description: 'Ingreso al portal de la Jurisdicción Inmobiliaria (RI Virtual) o cita presencial en la oficina registral de la demarcación.', responsibleEntity: 'Solicitante' },
      { stepNumber: 2, title: 'Calificación Registral del Expediente', description: 'El Registrador de Títulos examina la legalidad intrínseca y extrínseca de los actos depositados en virtud del principio de legalidad.', responsibleEntity: 'Registrador de Títulos' },
      { stepNumber: 3, title: 'Cancelación del Título Previo y Emisión del Nuevo', description: 'Inscripción del asiento registral en el folio real y emisión del Certificado de Título matrícula posicional a favor del comprador.', responsibleEntity: 'Registro de Títulos' },
      { stepNumber: 4, title: 'Entrega del Duplicado del Dueño', description: 'Retiro presencial o entrega digital segura al propietario o apoderado legal acreditado.', responsibleEntity: 'Ventanilla de Entrega RI' },
    ],
    officialForms: [
      { formCode: 'FORM-RI-TRANS-01', title: 'Solicitud de Actuaciones Registrales Inmobiliarias', downloadUrl: '/repositorio' },
    ],
    contactChannels: {
      phone: '+1 (809) 533-3118',
      email: 'contacto@ri.gob.do',
      physicalAddress: 'Av. Independencia esq. Enrique Jiménez Moya, Centro de los Héroes, Santo Domingo, D.N.',
    },
  },

  // 3. ONAPI - Registro de Nombre Comercial
  {
    id: 'tram-onapi-1',
    slug: 'registro-nombre-comercial-onapi',
    title: 'Registro de Nombre Comercial en la República Dominicana',
    institution: 'Oficina Nacional de la Propiedad Industrial (ONAPI)',
    institutionCategory: 'ONAPI',
    specialtySlug: 'derecho-propiedad-intelectual',
    specialtyName: 'Derecho de Propiedad Intelectual / Comercial',
    legalBasis: 'Ley No. 20-00 sobre Propiedad Industrial',
    estimatedDays: '1 a 2 días hábiles (Servicio Express en línea)',
    officialCostRD: 'RD$ 5,025.00 tarifa oficial estándar de registro por 10 años',
    isDigitalAvailable: true,
    officialPortalUrl: 'https://onapi.gob.do',
    overview: 'Protege el signo distintivo que identifica a una empresa o establecimiento mercantil en el territorio de la República Dominicana, otorgando exclusividad de uso por diez (10) años renovables.',
    prerequisites: [
      'Disponibilidad del nombre comercial en la base de datos fonética y denominativa de ONAPI.',
      'Identificación del titular (persona física con cédula o persona moral con RNC).',
    ],
    mandatoryDocuments: [
      { name: 'Formulario de Solicitud de Nombre Comercial firmado', isOriginal: true, copiesNeeded: 1 },
      { name: 'Copia de Cédula de Identidad o Pasaporte del titular solicitante', isOriginal: false, copiesNeeded: 1 },
      { name: 'Poder de representación si la solicitud es radicada por abogado o mandatario', isOriginal: true, copiesNeeded: 1 },
    ],
    steps: [
      { stepNumber: 1, title: 'Búsqueda Previa de Novedad Denominativa', description: 'Comprobación de que no existan nombres idénticos o semejantes en grado de confusión en la misma actividad económica.', responsibleEntity: 'ONAPI / Solicitante' },
      { stepNumber: 2, title: 'Radicación Electrónica en E-SERPI', description: 'Llenado del formulario digital, especificación precisa de la actividad comercial y carga de documentos de identidad.', responsibleEntity: 'Solicitante' },
      { stepNumber: 3, title: 'Pago de la Tasa Oficial con Tarjeta', description: 'Abono de los RD$ 5,025.00 a través de la pasarela de pagos segura de ONAPI.', responsibleEntity: 'Solicitante' },
      { stepNumber: 4, title: 'Examen de Forma y Fondo', description: 'Los examinadores de signos distintivos validan que el nombre no infrinja prohibiciones del Art. 115 Ley 20-00.', responsibleEntity: 'Examinador ONAPI' },
      { stepNumber: 5, title: 'Emisión y Descarga del Certificado de Registro', description: 'Generación del Certificado Oficial con firma digital y código de validación QR por 10 años.', responsibleEntity: 'ONAPI' },
    ],
    officialForms: [
      { formCode: 'FORM-ONAPI-SD-01', title: 'Solicitud Oficial de Signos Distintivos', downloadUrl: '/repositorio' },
    ],
    contactChannels: {
      phone: '+1 (809) 567-7474',
      email: 'servicioalusuario@onapi.gob.do',
      physicalAddress: 'Av. Los Próceres No. 11, Santo Domingo, D.N.',
    },
  },

  // 4. Ministerio de Trabajo - Planilla DGT-3
  {
    id: 'tram-mt-1',
    slug: 'registro-planilla-dgt3-trabajo',
    title: 'Registro de Planilla de Personal Fijo (Formulario DGT-3)',
    institution: 'Ministerio de Trabajo de la República Dominicana',
    institutionCategory: 'MINISTERIO_TRABAJO',
    specialtySlug: 'derecho-laboral',
    specialtyName: 'Derecho Laboral',
    legalBasis: 'Artículo 15 del Código de Trabajo (Ley 16-92) y Reglamento 258-93',
    estimatedDays: 'Inmediato (registro en el Sistema Integrado SIRLA)',
    officialCostRD: 'Gratuito ante el Ministerio de Trabajo (pago de aranceles de timbre según cantidad de empleados)',
    isDigitalAvailable: true,
    officialPortalUrl: 'https://sirla.mt.gob.do',
    overview: 'Obligación patronal de depositar anualmente entre el 1 y el 15 de enero la nómina completa del personal fijo, sueldos, cargos y jornadas laborales.',
    prerequisites: [
      'Empresa registrada en el Ministerio de Trabajo con Registro Patronal activo.',
      'Empleados registrados debidamente en la Tesorería de la Seguridad Social (TSS).',
    ],
    mandatoryDocuments: [
      { name: 'Planilla DGT-3 generada con la relación de todo el personal', isOriginal: true, copiesNeeded: 1 },
      { name: 'Copia del Certificado de Registro Mercantil de la Cámara de Comercio', isOriginal: false, copiesNeeded: 1 },
      { name: 'Constancia de Número de Registro Patronal', isOriginal: false, copiesNeeded: 1 },
    ],
    steps: [
      { stepNumber: 1, title: 'Ingreso al Sistema SIRLA del Ministerio', description: 'Acceso con usuario y clave de la empresa en la plataforma digital del Ministerio de Trabajo.', responsibleEntity: 'Empresa / Abogado Laboralista' },
      { stepNumber: 2, title: 'Carga de Nómina de Trabajadores', description: 'Importación del archivo de empleados con nombres, cédulas, cargos, sueldos y nacionalidad.', responsibleEntity: 'Empresa' },
      { stepNumber: 3, title: 'Validación del 80/20 de Nacionalidad Dominicana', description: 'El sistema verifica automáticamente que al menos el 80% de la plantilla sean ciudadanos dominicanos (Art. 135 Código de Trabajo).', responsibleEntity: 'Sistema SIRLA' },
      { stepNumber: 4, title: 'Firma Electrónica y Descarga de la Planilla Sellada', description: 'Emisión del recibo de cumplimiento anual para exhibición en el local comercial conforme al Art. 16 CT.', responsibleEntity: 'Ministerio de Trabajo' },
    ],
    officialForms: [
      { formCode: 'DGT-3', title: 'Planilla Oficial de Personal Fijo', downloadUrl: '/repositorio' },
    ],
    contactChannels: {
      phone: '+1 (809) 535-4404',
      email: 'sirla@mt.gob.do',
      physicalAddress: 'Av. Enrique Jiménez Moya No. 5, Centro de los Héroes, Santo Domingo, D.N.',
    },
  },
];

/**
 * Función Operativa: `getAllDominicanTramites`
 * Procesa la lógica de negocio y reglas jurídicas correspondientes.
 */
export async function getAllDominicanTramites(): Promise<TramiteOfficialItem[]> {
  return DOMINICAN_OFFICIAL_TRAMITES;
}

/**
 * Función Operativa: `getTramiteBySlug`
 * Procesa la lógica de negocio y reglas jurídicas correspondientes.
 */
export async function getTramiteBySlug(slug: string): Promise<TramiteOfficialItem | null> {
  return DOMINICAN_OFFICIAL_TRAMITES.find((t) => t.slug === slug) || null;
}
