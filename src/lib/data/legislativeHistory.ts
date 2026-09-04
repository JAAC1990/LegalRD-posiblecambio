// Historial Legislativo y Comparador de Reformas Normativas de la República Dominicana

export interface LegislativeChangeDiff {
  articleOrTopic: string;
  previousLawRef: string;
  previousText: string;
  currentLawRef: string;
  currentText: string;
  keyChangesSummary: string;
  practicalImpact: string;
}

export interface LegislativeTimelineMilestone {
  date: string;
  year: number;
  stageTitle: string;
  normNumber: string;
  gacetaRef: string;
  status: 'VIGENTE' | 'DEROGADA' | 'MODIFICADA' | 'HISTORICA';
  summary: string;
}

export interface LegislativeHistoryItem {
  id: string;
  slug: string;
  subjectTitle: string;
  specialtySlug: string;
  specialtyName: string;
  currentActiveNorm: string;
  previousReplacedNorm: string;
  overview: string;
  timeline: LegislativeTimelineMilestone[];
  diffComparisons: LegislativeChangeDiff[];
}

export const DOMINICAN_LEGISLATIVE_HISTORIES: LegislativeHistoryItem[] = [
  // 1. Reforma del Recurso de Casación (Ley 2-23 vs Ley 3726)
  {
    id: 'hist-casacion',
    slug: 'reforma-recurso-casacion-ley-2-23',
    subjectTitle: 'Reforma Integral del Recurso de Casación (Ley 2-23 vs. Ley 3726)',
    specialtySlug: 'derecho-procesal-civil',
    specialtyName: 'Derecho Procesal Civil / Casación',
    currentActiveNorm: 'Ley No. 2-23 sobre el Recurso de Casación (17 de enero de 2023)',
    previousReplacedNorm: 'Ley No. 3726 de Procedimiento de Casación del 29 de diciembre de 1953',
    overview: 'La Ley 2-23 transformó radicalmente el recurso extraordinario de casación ante la Suprema Corte de Justicia, derogando una norma centenaria para introducir el criterio de interés casacional, acortar plazos procesales e implementar la tramitación digital.',
    timeline: [
      {
        date: '29 de diciembre de 1953',
        year: 1953,
        stageTitle: 'Promulgación de la Ley 3726',
        normNumber: 'Ley 3726',
        gacetaRef: 'Gaceta Oficial No. 7644',
        status: 'DEROGADA',
        summary: 'Estableció el régimen clásico de casación civil y laboral con plazo de dos meses (luego reducido a 30 días) y cuantía mínima de salarios mínimos.',
      },
      {
        date: '10 de diciembre de 2008',
        year: 2008,
        stageTitle: 'Modificación Parcial por Ley 491-08',
        normNumber: 'Ley 491-08',
        gacetaRef: 'Gaceta Oficial No. 10501',
        status: 'DEROGADA',
        summary: 'Elevó el umbral económico de admisibilidad del recurso de casación a 200 salarios mínimos del sector público.',
      },
      {
        date: '17 de enero de 2023',
        year: 2023,
        stageTitle: 'Promulgación de la Nueva Ley Orgánica de Casación',
        normNumber: 'Ley 2-23',
        gacetaRef: 'Gaceta Oficial No. 11094',
        status: 'VIGENTE',
        summary: 'Derogó íntegramente la Ley 3726. Redujo los plazos a 20 días hábiles, introdujo la casación per saltum y la exigencia de interés casacional objetivo.',
      },
    ],
    diffComparisons: [
      {
        articleOrTopic: 'Plazo para la Interposición del Recurso',
        previousLawRef: 'Art. 5 Ley 3726 (Modificada por Ley 491-08)',
        previousText: 'El recurso de casación se interpondrá dentro de los treinta (30) días a contar de la notificación de la sentencia con copia del acta de notificación.',
        currentLawRef: 'Art. 10 Ley 2-23',
        currentText: 'El recurso de casación se interpondrá mediante memorial depositado en la secretaría general de la Suprema Corte de Justicia dentro de los veinte (20) días hábiles siguientes a la notificación de la sentencia.',
        keyChangesSummary: 'Reducción de 30 días continuos a 20 días hábiles (no se computan sábados, domingos ni días feriados).',
        practicalImpact: 'Otorga certidumbre procesal al excluir días no laborables de los tribunales pero acorta la ventana de preparación del memorial.',
      },
      {
        articleOrTopic: 'Criterio de Admisibilidad y Cuantía',
        previousLawRef: 'Art. 12 Ley 491-08',
        previousText: 'No serán susceptibles de casación las sentencias que contengan condenaciones que no excedan la cuantía de doscientos (200) salarios mínimos.',
        currentLawRef: 'Arts. 11 y 12 Ley 2-23',
        currentText: 'Se exige cincuenta (50) salarios mínimos para la materia civil ordinaria, o bien la concurrencia de INTERÉS CASACIONAL cuando la cuestión jurídica resulte novedosa, existan criterios contradictorios entre cortes o se vulnere doctrina sentada de la SCJ.',
        keyChangesSummary: 'Introducción del Interés Casacional como filtro rector sustantivo en lugar del mero monto económico.',
        practicalImpact: 'Permite que casos de baja cuantía lleguen a la Suprema Corte si entrañan una cuestión constitucional o jurídica de trascendencia nacional.',
      },
    ],
  },

  // 2. Reforma de los Actos del Estado Civil (Ley 4-23 vs Ley 659 de 1944)
  {
    id: 'hist-estado-civil',
    slug: 'reforma-actos-estado-civil-ley-4-23',
    subjectTitle: 'Ley Orgánica de los Actos del Estado Civil (Ley 4-23 vs. Ley 659)',
    specialtySlug: 'derecho-civil',
    specialtyName: 'Derecho Civil / Familia',
    currentActiveNorm: 'Ley No. 4-23 Orgánica de los Actos del Estado Civil (19 de enero de 2023)',
    previousReplacedNorm: 'Ley No. 659 sobre Actos del Estado Civil del 17 de julio de 1944',
    overview: 'Sustitución del régimen decimonónico de actas del estado civil por una plataforma registral moderna y digitalizada gestionada por la Junta Central Electoral (JCE), suprimiendo la duplicidad de libros físicos e instituyendo el número único de identidad desde el nacimiento.',
    timeline: [
      {
        date: '17 de julio de 1944',
        year: 1944,
        stageTitle: 'Promulgación de la Ley 659',
        normNumber: 'Ley 659',
        gacetaRef: 'Gaceta Oficial No. 6114',
        status: 'DEROGADA',
        summary: 'Régimen de dos libros manuscritos foliados por la Oficialía del Estado Civil y la Fiscalía.',
      },
      {
        date: '19 de enero de 2023',
        year: 2023,
        stageTitle: 'Promulgación de la Ley Orgánica 4-23',
        normNumber: 'Ley 4-23',
        gacetaRef: 'Gaceta Oficial No. 11096',
        status: 'VIGENTE',
        summary: 'Creación del Registro Civil Automatizado, Cédula de Identidad Única desde el nacimiento y simplificación de correcciones judiciales.',
      },
    ],
    diffComparisons: [
      {
        articleOrTopic: 'Identificación al Nacer (Número Único)',
        previousLawRef: 'Ley 659 de 1944',
        previousText: 'El acta de nacimiento sólo consignaba el número de libro, folio y acta. La persona no recibía número de cédula hasta cumplir los 18 años.',
        currentLawRef: 'Art. 67 Ley 4-23',
        currentText: 'A toda persona se le asignará desde el momento de su registro de nacimiento un Número Único de Identidad (NUI), el cual corresponderá al número definitivo de su documento de identidad y electoral al alcanzar la mayoría de edad.',
        keyChangesSummary: 'Fin de la disparidad entre acta de nacimiento y cédula: un único número de vida legal.',
        practicalImpact: 'Erradicación de suplantaciones de identidad y agilización inmediata de expedientes escolares y de seguridad social.',
      },
    ],
  },
];

export async function getAllLegislativeHistories(): Promise<LegislativeHistoryItem[]> {
  return DOMINICAN_LEGISLATIVE_HISTORIES;
}

export async function getLegislativeHistoryBySlug(slug: string): Promise<LegislativeHistoryItem | null> {
  return DOMINICAN_LEGISLATIVE_HISTORIES.find((h) => h.slug === slug) || null;
}
