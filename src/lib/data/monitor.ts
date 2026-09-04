/**
 * ====================================================================
 * LEGAL RD — SISTEMA OPERATIVO JURÍDICO DOMINICANO
 * ====================================================================
 * Módulo: Monitor Jurídico de Gacetas Oficiales y Novedades Legislativas
 * Ruta: src/lib/data/monitor.ts
 * Ámbito Legal: Publicidad Normativa y Actualización Jurídica Continua
 * 
 * PROPÓSITO:
 * Seguimiento en tiempo real de publicaciones en la Gaceta Oficial, proyectos de ley en el Congreso Nacional y resoluciones administrativas de órganos estatales.
 * 
 * FUNDAMENTOS NORMATIVOS:
 * Gacetas Oficiales del Poder Ejecutivo, Resoluciones del Consejo del Poder Judicial.
 * 
 * REGLA FUNDAMENTAL DE PRESERVACIÓN ACUMULATIVA:
 * Este archivo forma parte del ecosistema integral de Legal RD.
 * No se permite eliminar, simplificar ni alterar la lógica preexistente.
 * ====================================================================
 */

// Monitor Jurídico de Actualizaciones, Reformas y Alertas Oficiales en República Dominicana

/**
 * Tipo: `AlertImpactLevel`
 * Define los valores admitidos para AlertImpactLevel según las reglas del dominio dominicano.
 */
export type AlertImpactLevel = 'ALTO_IMPACTO' | 'REFORMA_INTEGRAL' | 'PROCEDIMIENTO' | 'INFORMATIVO';

/**
 * Interfaz: `LegalMonitorUpdate`
 * Modela la estructura de datos para LegalMonitorUpdate en el ecosistema jurídico de Legal RD.
 */
export interface LegalMonitorUpdate {
  id: string;
  title: string;
  sourceType: 'LEY' | 'DECRETO' | 'RESOLUCION' | 'SENTENCIA_TC' | 'SENTENCIA_SCJ';
  officialNumber: string;
  gacetaRef: string;
  promulgationDate: string;
  effectiveDate: string;
  specialtySlug: string;
  specialtyName: string;
  impactLevel: AlertImpactLevel;
  summary: string;
  keyChanges: string[];
  affectedNorms: string[];
  urlAction?: string;
}

/**
 * Catálogo Maestro / Constante: `DOMINICAN_MONITOR_UPDATES`
 * Datos estructurados y verificados del ordenamiento jurídico de la República Dominicana.
 */
export const DOMINICAN_MONITOR_UPDATES: LegalMonitorUpdate[] = [
  {
    id: 'mon-1',
    title: 'Nueva Ley de Casación No. 2-23 deroga íntegramente la Ley 3726',
    sourceType: 'LEY',
    officialNumber: 'Ley No. 2-23',
    gacetaRef: 'Gaceta Oficial No. 11094',
    promulgationDate: '17 de enero de 2023',
    effectiveDate: '17 de enero de 2023',
    specialtySlug: 'derecho-procesal-civil',
    specialtyName: 'Derecho Procesal Civil / Casación',
    impactLevel: 'REFORMA_INTEGRAL',
    summary: 'Reforma radical del recurso de casación ante la Suprema Corte de Justicia: plazos reducidos a 20 días hábiles e introducción del criterio de interés casacional.',
    keyChanges: [
      'Plazo de interposición fijado en 20 días hábiles judiciales.',
      'Exigencia de interés casacional objetivo para casos de relevancia o contradicción jurisprudencial.',
      'Tramitación obligatoria en formato digital a través del portal del Poder Judicial.',
    ],
    affectedNorms: ['Ley 3726 de 1953 (Derogada Total)', 'Código de Procedimiento Civil'],
    urlAction: '/historial/reforma-recurso-casacion-ley-2-23',
  },
  {
    id: 'mon-2',
    title: 'Ley Orgánica No. 4-23 de los Actos del Estado Civil',
    sourceType: 'LEY',
    officialNumber: 'Ley No. 4-23',
    gacetaRef: 'Gaceta Oficial No. 11096',
    promulgationDate: '19 de enero de 2023',
    effectiveDate: '19 de enero de 2023',
    specialtySlug: 'derecho-civil',
    specialtyName: 'Derecho Civil / Familia',
    impactLevel: 'ALTO_IMPACTO',
    summary: 'Modernización del registro civil dominicano, asignación del Número Único de Identidad (NUI) desde el nacimiento y digitalización de actas.',
    keyChanges: [
      'Asignación inmediata de número único de identidad al inscribir el nacimiento.',
      'Desaparición de los dos libros manuscritos; registro digitalizado en la JCE.',
      'Procedimiento expedito de rectificación de errores puramente materiales sin juicio ordinario.',
    ],
    affectedNorms: ['Ley 659 de 1944 (Derogada Total)', 'Código Civil Dominicano'],
    urlAction: '/historial/reforma-actos-estado-civil-ley-4-23',
  },
  {
    id: 'mon-3',
    title: 'Sentencia Hito del Tribunal Constitucional sobre Motivación de Sentencias',
    sourceType: 'SENTENCIA_TC',
    officialNumber: 'Sentencia TC/0123/18',
    gacetaRef: 'Boletín del Tribunal Constitucional',
    promulgationDate: '14 de junio de 2018',
    effectiveDate: 'Inmediata y vinculante',
    specialtySlug: 'derecho-constitucional',
    specialtyName: 'Derecho Constitucional',
    impactLevel: 'ALTO_IMPACTO',
    summary: 'El TC ratifica que la falta de motivación o la motivación aparente de una sentencia judicial viola la tutela judicial efectiva (Art. 69 Const.) y acarrea su anulación.',
    keyChanges: [
      'Deber inexcusable de los jueces de responder todas las conclusiones de las partes.',
      'Prohibición de fórmulas genéricas o abstractas que no valoren las pruebas depositadas.',
    ],
    affectedNorms: ['Constitución de la República (Art. 69)', 'Ley 137-11'],
    urlAction: '/jurisprudencia',
  },
  {
    id: 'mon-4',
    title: 'Ley No. 339-22 sobre el Uso de Medios Digitales en el Poder Judicial',
    sourceType: 'LEY',
    officialNumber: 'Ley No. 339-22',
    gacetaRef: 'Gaceta Oficial No. 11075',
    promulgationDate: '29 de julio de 2022',
    effectiveDate: 'Vigente con despliegue progresivo',
    specialtySlug: 'derecho-tecnologico-digital',
    specialtyName: 'Derecho Tecnológico / Procesal',
    impactLevel: 'PROCEDIMIENTO',
    summary: 'Habilita legalmente las audiencias virtuales, la firma digital cualificada para sentencias y el buzón judicial electrónico para el depósito de demandas y recursos.',
    keyChanges: [
      'Validez probatoria plena del expediente judicial electrónico y firma digital de jueces.',
      'Posibilidad de celebrar audiencias virtuales previa anuencia o por ordenanza justificada.',
    ],
    affectedNorms: ['Código de Procedimiento Civil', 'Ley 834 de 1978'],
    urlAction: '/normas',
  },
];

/**
 * Función Operativa: `getAllMonitorUpdates`
 * Procesa la lógica de negocio y reglas jurídicas correspondientes.
 */
export async function getAllMonitorUpdates(): Promise<LegalMonitorUpdate[]> {
  return DOMINICAN_MONITOR_UPDATES;
}

/**
 * Función Operativa: `getMonitorUpdatesBySpecialty`
 * Procesa la lógica de negocio y reglas jurídicas correspondientes.
 */
export async function getMonitorUpdatesBySpecialty(specialtySlug: string): Promise<LegalMonitorUpdate[]> {
  return DOMINICAN_MONITOR_UPDATES.filter((u) => u.specialtySlug === specialtySlug);
}
