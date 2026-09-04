/**
 * ====================================================================
 * LEGAL RD — SISTEMA OPERATIVO JURÍDICO DOMINICANO
 * ====================================================================
 * Módulo: Gestor de Expedientes, Clientes y Despacho Profesional
 * Ruta: src/lib/data/caseFiles.ts
 * Ámbito Legal: Práctica Profesional del Abogado y Gestión Judicial
 * 
 * PROPÓSITO:
 * Estructuras de datos para administración de causas judiciales, control de estados procesales, balance financiero, clientes (con RNC/Cédula) y calendario de audiencias con alertas de caducidad.
 * 
 * FUNDAMENTOS NORMATIVOS:
 * Código de Procedimiento Civil, Ley 91 sobre el Colegio de Abogados de la RD (CARD).
 * 
 * REGLA FUNDAMENTAL DE PRESERVACIÓN ACUMULATIVA:
 * Este archivo forma parte del ecosistema integral de Legal RD.
 * No se permite eliminar, simplificar ni alterar la lógica preexistente.
 * ====================================================================
 */

// Gestor de Expedientes, Clientes, Audiencias y Tareas del Panel Profesional para Abogados

/**
 * Tipo: `CaseStatus`
 * Define los valores admitidos para CaseStatus según las reglas del dominio dominicano.
 */
export type CaseStatus = 'EN_TRAMITE' | 'EN_AUDIENCIA' | 'EN_ESTADO_DE_FALLO' | 'SENTENCIADO' | 'EN_EJECUCION' | 'ARCHIVADO';
/**
 * Tipo: `CasePriority`
 * Define los valores admitidos para CasePriority según las reglas del dominio dominicano.
 */
export type CasePriority = 'ALTA' | 'MEDIA' | 'URGENTE';

/**
 * Interfaz: `CaseDocumentAttached`
 * Modela la estructura de datos para CaseDocumentAttached en el ecosistema jurídico de Legal RD.
 */
export interface CaseDocumentAttached {
  id: string;
  name: string;
  category: 'DEMANDA' | 'NOTIFICACION' | 'PRUEBA' | 'SENTENCIA' | 'OTRO';
  uploadDate: string;
  fileSizeText: string;
  url?: string;
}

/**
 * Interfaz: `CaseHearingItem`
 * Modela la estructura de datos para CaseHearingItem en el ecosistema jurídico de Legal RD.
 */
export interface CaseHearingItem {
  id: string;
  hearingDate: string;
  time: string;
  courtName: string;
  chamber: string;
  purpose: string;
  isCompleted: boolean;
  outcomeNotes?: string;
}

/**
 * Interfaz: `CaseDeadlineAlert`
 * Modela la estructura de datos para CaseDeadlineAlert en el ecosistema jurídico de Legal RD.
 */
export interface CaseDeadlineAlert {
  id: string;
  title: string;
  dueDate: string;
  daysRemaining: number;
  isFatal: boolean;
  notes: string;
}

/**
 * Interfaz: `ClientProfile`
 * Modela la estructura de datos para ClientProfile en el ecosistema jurídico de Legal RD.
 */
export interface ClientProfile {
  id: string;
  fullName: string;
  clientType: 'PERSONA_FISICA' | 'EMPRESA';
  identificationNumber: string; // Cédula o RNC
  phone: string;
  email: string;
  address: string;
  activeCasesCount: number;
}

/**
 * Interfaz: `LawyerCaseFile`
 * Modela la estructura de datos para LawyerCaseFile en el ecosistema jurídico de Legal RD.
 */
export interface LawyerCaseFile {
  id: string;
  docketNumber: string; // Número de Rol o Expediente Judicial (ej. 033-2026-00412)
  title: string;
  clientId: string;
  clientName: string;
  opposingParty: string; // Contraparte
  opposingCounsel?: string; // Abogado de la contraparte
  specialtySlug: string;
  specialtyName: string;
  status: CaseStatus;
  priority: CasePriority;
  courtAssigned: string;
  presidingJudge?: string;
  openedAt: string;
  lastActivityAt: string;
  totalClaimAmountRD?: number;
  documents: CaseDocumentAttached[];
  hearings: CaseHearingItem[];
  deadlines: CaseDeadlineAlert[];
  linkedArticles: {
    normSlug: string;
    articleNum: number;
    label: string;
  }[];
  internalStrategyNotes: string;
}

/**
 * Catálogo Maestro / Constante: `DEMO_CLIENTS`
 * Datos estructurados y verificados del ordenamiento jurídico de la República Dominicana.
 */
export const DEMO_CLIENTS: ClientProfile[] = [
  {
    id: 'cli-1',
    fullName: 'Ingeniería & Estructuras del Cibao, S.R.L.',
    clientType: 'EMPRESA',
    identificationNumber: '1-30-88451-2',
    phone: '+1 (809) 581-2244',
    email: 'administracion@estructurecibao.do',
    address: 'Av. Juan Pablo Duarte No. 88, Santiago de los Caballeros',
    activeCasesCount: 2,
  },
  {
    id: 'cli-2',
    fullName: 'Dra. Carmen Altagracia Castillo Méndez',
    clientType: 'PERSONA_FISICA',
    identificationNumber: '001-1458291-7',
    phone: '+1 (829) 555-9122',
    email: 'carmen.castillo@correo.do',
    address: 'Calle Las Damas No. 14, Gazcue, Santo Domingo, D.N.',
    activeCasesCount: 1,
  },
  {
    id: 'cli-3',
    fullName: 'Logística Portuaria Dominicana, S.A.',
    clientType: 'EMPRESA',
    identificationNumber: '1-01-44582-9',
    phone: '+1 (809) 533-8800',
    email: 'legal@logistica.com.do',
    address: 'Av. Abraham Lincoln No. 1012, Piantini, Santo Domingo, D.N.',
    activeCasesCount: 1,
  },
];

/**
 * Catálogo Maestro / Constante: `DEMO_LAWYER_CASES`
 * Datos estructurados y verificados del ordenamiento jurídico de la República Dominicana.
 */
export const DEMO_LAWYER_CASES: LawyerCaseFile[] = [
  {
    id: 'exp-2026-001',
    docketNumber: '033-2026-00412',
    title: 'Demanda Laboral por Despido Injustificado y Cobro de Prestaciones',
    clientId: 'cli-2',
    clientName: 'Dra. Carmen Altagracia Castillo Méndez',
    opposingParty: 'Centro Médico Metropolitano, S.A.',
    opposingCounsel: 'Lic. Rafael Antonio Troncoso (CARD 18452)',
    specialtySlug: 'derecho-laboral',
    specialtyName: 'Derecho Laboral',
    status: 'EN_AUDIENCIA',
    priority: 'URGENTE',
    courtAssigned: 'Segunda Sala del Juzgado de Trabajo del Distrito Nacional',
    presidingJudge: 'Mag. Altagracia Guzmán López',
    openedAt: '12 de enero de 2026',
    lastActivityAt: '28 de febrero de 2026',
    totalClaimAmountRD: 1850000,
    documents: [
      { id: 'doc-1', name: 'Acto de Demanda Laboral Notificado por Alguacil', category: 'DEMANDA', uploadDate: '15/01/2026', fileSizeText: '1.4 MB' },
      { id: 'doc-2', name: 'Historial de Salarios y Aportes a la TSS', category: 'PRUEBA', uploadDate: '16/01/2026', fileSizeText: '420 KB' },
      { id: 'doc-3', name: 'Carta de Despido sin Causa Justa', category: 'PRUEBA', uploadDate: '16/01/2026', fileSizeText: '280 KB' },
    ],
    hearings: [
      {
        id: 'aud-1',
        hearingDate: '2026-03-24',
        time: '09:00 AM',
        courtName: 'Segunda Sala del Juzgado de Trabajo del D.N.',
        chamber: 'Sala 3',
        purpose: 'Audiencia de Producción y Discusión de Pruebas Testimoniales',
        isCompleted: false,
        outcomeNotes: 'Llevar a los dos testigos citados por acto de ministerial.',
      },
      {
        id: 'aud-2',
        hearingDate: '2026-02-10',
        time: '09:30 AM',
        courtName: 'Segunda Sala del Juzgado de Trabajo del D.N.',
        chamber: 'Sala 3',
        purpose: 'Audiencia de Conciliación Judicial Preliminar',
        isCompleted: true,
        outcomeNotes: 'No hubo acuerdo conciliatorio entre las partes; se ordenó la apertura a debates.',
      },
    ],
    deadlines: [
      {
        id: 'plazo-1',
        title: 'Depósito de Escrito Ampliatorio de Conclusiones',
        dueDate: '2026-03-20',
        daysRemaining: 15,
        isFatal: true,
        notes: 'Plazo judicial concedido para presentar balance pormenorizado del Art. 86 CT.',
      },
    ],
    linkedArticles: [
      { normSlug: 'codigo-de-trabajo-ley-16-92', articleNum: 80, label: 'Art. 80 CT: Auxilio de Cesantía' },
      { normSlug: 'codigo-de-trabajo-ley-16-92', articleNum: 86, label: 'Art. 86 CT: Sanción por Retardo' },
      { normSlug: 'codigo-de-trabajo-ley-16-92', articleNum: 95, label: 'Art. 95 CT: Salarios Caídos' },
    ],
    internalStrategyNotes: 'La empresa demandada no remitió la comunicación de las 48 horas al Ministerio de Trabajo; solicitar al tribunal que aplique la presunción irrefragable de despido injustificado (Art. 91 CT).',
  },
  {
    id: 'exp-2026-002',
    docketNumber: '104-2025-01890',
    title: 'Litis sobre Derechos Registrados y Demanda en Nulidad de Venta',
    clientId: 'cli-1',
    clientName: 'Ingeniería & Estructuras del Cibao, S.R.L.',
    opposingParty: 'Desarrollos Residenciales del Norte, S.R.L. y Agrimensor P.M.',
    opposingCounsel: 'Dra. Yocasta Beras',
    specialtySlug: 'derecho-inmobiliario',
    specialtyName: 'Derecho Inmobiliario',
    status: 'EN_TRAMITE',
    priority: 'ALTA',
    courtAssigned: 'Tribunal de Tierras de Jurisdicción Original de Santiago',
    presidingJudge: 'Mag. Porfirio Hernández',
    openedAt: '20 de noviembre de 2025',
    lastActivityAt: '15 de febrero de 2026',
    totalClaimAmountRD: 14500000,
    documents: [
      { id: 'doc-inm-1', name: 'Instancia Formal de Litis sobre Derechos Registrados', category: 'DEMANDA', uploadDate: '22/11/2025', fileSizeText: '2.1 MB' },
      { id: 'doc-inm-2', name: 'Certificación de Estado Jurídico con Bloqueo Registral', category: 'PRUEBA', uploadDate: '01/12/2025', fileSizeText: '890 KB' },
      { id: 'doc-inm-3', name: 'Informe Técnico Pericial de Mensura Catastral', category: 'PRUEBA', uploadDate: '10/01/2026', fileSizeText: '4.8 MB' },
    ],
    hearings: [
      {
        id: 'aud-inm-1',
        hearingDate: '2026-04-14',
        time: '10:00 AM',
        courtName: 'Tribunal de Tierras de Jurisdicción Original de Santiago',
        chamber: 'Sala de Audiencias No. 1',
        purpose: 'Audiencia de Sometimiento de Pruebas Periciales',
        isCompleted: false,
        outcomeNotes: 'Interrogatorio al perito agrimensor designado de oficio.',
      },
    ],
    deadlines: [
      {
        id: 'plazo-inm-1',
        title: 'Notificación de Documentos Nuevos a los Colindantes',
        dueDate: '2026-03-31',
        daysRemaining: 26,
        isFatal: true,
        notes: 'Notificación por ministerio de alguacil en la octava franca.',
      },
    ],
    linkedArticles: [
      { normSlug: 'constitucion-republica-dominicana', articleNum: 51, label: 'Art. 51 Constitución: Derecho de Propiedad' },
    ],
    internalStrategyNotes: 'La transferencia impugnada adolece de falsedad en la firma del poderdante; el peritaje caligráfico oficial del INACIF favorece íntegramente la tesis de nuestra demanda.',
  },
];

/**
 * Función Operativa: `getAllLawyerCases`
 * Procesa la lógica de negocio y reglas jurídicas correspondientes.
 */
export async function getAllLawyerCases(): Promise<LawyerCaseFile[]> {
  return DEMO_LAWYER_CASES;
}

/**
 * Función Operativa: `getLawyerCaseById`
 * Procesa la lógica de negocio y reglas jurídicas correspondientes.
 */
export async function getLawyerCaseById(id: string): Promise<LawyerCaseFile | null> {
  return DEMO_LAWYER_CASES.find((c) => c.id === id) || null;
}

/**
 * Función Operativa: `getAllClients`
 * Procesa la lógica de negocio y reglas jurídicas correspondientes.
 */
export async function getAllClients(): Promise<ClientProfile[]> {
  return DEMO_CLIENTS;
}
