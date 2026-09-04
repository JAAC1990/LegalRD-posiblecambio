// Comparador Internacional de Instituciones Jurídicas

export interface CountryComparisonDetail {
  countryName: string;
  countryCode: string;
  flagEmoji: string;
  normativeFamily: string; // ej: Romano-Germánico / Civil Law vs. Common Law
  governingNorm: string;
  similarities: string[];
  divergences: string[];
  keyDifferences: string;
}

export interface ComparativeInstitutionItem {
  id: string;
  slug: string;
  institutionName: string;
  specialtySlug: string;
  specialtyName: string;
  dominicanFramework: {
    governingNorm: string;
    description: string;
    sovereigntyNotice: string;
  };
  foreignComparisons: CountryComparisonDetail[];
  practicalInsights: string[];
}

export const DOMINICAN_COMPARATIVE_LAW: ComparativeInstitutionItem[] = [
  // 1. Recurso de Casación
  {
    id: 'comp-casacion',
    slug: 'recurso-casacion-comparado',
    institutionName: 'El Recurso Extraordinario de Casación',
    specialtySlug: 'derecho-procesal-civil',
    specialtyName: 'Derecho Procesal Civil',
    dominicanFramework: {
      governingNorm: 'Ley No. 2-23 sobre el Recurso de Casación (derogó la Ley 3726 de 1953)',
      description: 'En República Dominicana, la casación se interpone ante las Salas de la Suprema Corte de Justicia dentro de los 20 días hábiles. Se exige cuantía mínima de 50 salarios mínimos o la acreditación objetiva de "Interés Casacional".',
      sovereigntyNotice: 'ADVERTENCIA: La legislación y jurisprudencia foránea son estrictamente ilustrativas y carecen de fuerza vinculante en territorio dominicano salvo reenvío expreso de ley o tratados internacionales ratificados por el Congreso.',
    },
    foreignComparisons: [
      {
        countryName: 'España',
        countryCode: 'ES',
        flagEmoji: '🇪🇸',
        normativeFamily: 'Civil Law (Romano-Germánico)',
        governingNorm: 'Ley de Enjuiciamiento Civil (LEC 1/2000, reformada por RDL 5/2023)',
        similarities: [
          'Ambos ordenamientos adoptaron el criterio de "interés casacional" como filtro de admisión preferente.',
          'Naturaleza extraordinaria del recurso: no constituye una tercera instancia para revalorar pruebas.',
        ],
        divergences: [
          'En España se unificaron el recurso extraordinario por infracción procesal y el recurso de casación en una sola vía tras la reforma de 2023.',
          'El plazo español ante el Tribunal Supremo es de 20 días hábiles, igual que en RD tras la Ley 2-23.',
        ],
        keyDifferences: 'España eliminó la dualidad de recursos procesales y de fondo en el Tribunal Supremo; RD mantiene el recurso de casación unificado bajo causales tasadas de violación a la ley y contradicción jurisprudencial.',
      },
      {
        countryName: 'Estados Unidos',
        countryCode: 'US',
        flagEmoji: '🇺🇸',
        normativeFamily: 'Common Law',
        governingNorm: 'Certiorari ante la Corte Suprema de EE.UU. (28 U.S. Code § 1254)',
        similarities: [
          'Filtrado discrecional por relevancia jurídica e interés nacional.',
        ],
        divergences: [
          'No existe el recurso de casación clásico de tradición francesa. La revisión se efectúa mediante "Petition for Writ of Certiorari", de admisión puramente discrecional (Rule of Four).',
          'Enfoque preferente en la doctrina del precedente judicial vinculante (stare decisis).',
        ],
        keyDifferences: 'En EE.UU. la Corte Suprema no ejerce control nomofiláctico sobre la interpretación de leyes locales ordinarias (a cargo de las Cortes Supremas estatales), mientras la SCJ dominicana unifica la jurisprudencia civil, laboral y penal en todo el país.',
      },
      {
        countryName: 'México',
        countryCode: 'MX',
        flagEmoji: '🇲🇽',
        normativeFamily: 'Romano-Germánico / Constitucional',
        governingNorm: 'Juicio de Amparo Directo ante Tribunales Colegiados de Circuito',
        similarities: [
          'Revisión de legalidad y constitucionalidad de las sentencias definitivas.',
        ],
        divergences: [
          'En México la casación fue absorbida materialmente por el "Amparo Directo" o amparo-casación.',
          'En RD el Amparo (Ley 137-11) y la Casación (Ley 2-23) son vías procesales radicalmente separadas: el amparo no procede contra decisiones jurisdiccionales.',
        ],
        keyDifferences: 'En República Dominicana rige la prohibición expresa de interponer acción de amparo contra resoluciones judiciales firmes; la vía exclusiva para recurrir sentencias es el recurso ordinario y de casación.',
      },
    ],
    practicalInsights: [
      'Al litigar en República Dominicana, la invocación de doctrina española o francesa es admisible como fuente doctrinal persuasiva, pero debe subordinarse siempre al texto literal de la Ley 2-23.',
      'Citar sentencias foráneas sin identificar el artículo correspondiente del Código dominicano constituye un defecto de fundamentación en juicio.',
    ],
  },

  // 2. Auxilio de Cesantía y Terminación Laboral
  {
    id: 'comp-cesantia',
    slug: 'cesantia-laboral-comparada',
    institutionName: 'Indemnización por Despido y Auxilio de Cesantía',
    specialtySlug: 'derecho-laboral',
    specialtyName: 'Derecho Laboral',
    dominicanFramework: {
      governingNorm: 'Código de Trabajo Dominicano (Ley 16-92, Arts. 75 al 86)',
      description: 'Escala tarifada en el Art. 80 CT: de 6 a 23 días de salario por año de servicio, pagaderos dentro de los 10 días so pena de un día de salario diario adicional (Art. 86 CT). El desahucio es libre pero genera la cesantía obligatoria.',
      sovereigntyNotice: 'Régimen de orden público nacional (Principio V CT): No es renunciable ni sustituible por convenios privados que disminuyan el estándar de protección.',
    },
    foreignComparisons: [
      {
        countryName: 'Colombia',
        countryCode: 'CO',
        flagEmoji: '🇨🇴',
        normativeFamily: 'Civil Law',
        governingNorm: 'Código Sustantivo del Trabajo (Art. 249) y Ley 50 de 1990',
        similarities: [
          'Existe una figura denominada igualmente "Cesantías", equivalente a un mes de salario por cada año de servicios.',
        ],
        divergences: [
          'En Colombia las cesantías se consignan anualmente de forma obligatoria en un Fondo de Cesantías (administrado por entidades financieras privadas), donde el trabajador genera rendimientos.',
          'En RD las cesantías no se fondean anualmente en entidades externas sino que se pagan directamente al trabajador al término del contrato.',
        ],
        keyDifferences: 'El modelo colombiano es un ahorro obligatorio capitalizable en fondos de pensiones/cesantías; el modelo dominicano es una indemnización legal por contingencia de desempleo exigible al momento de la ruptura.',
      },
      {
        countryName: 'Estados Unidos',
        countryCode: 'US',
        flagEmoji: '🇺🇸',
        normativeFamily: 'Common Law',
        governingNorm: 'Doctrina de "At-Will Employment" (empleo a voluntad)',
        similarities: [
          'Libertad del empleador para cesar la relación sin alegar causa.',
        ],
        divergences: [
          'En EE.UU., bajo el régimen general de at-will employment, NO existe obligación federal de pagar indemnización por cesantía (severance pay) a menos que esté expresamente convenido en un contrato colectivo o individual.',
          'El trabajador desempleado acude al seguro estatal de desempleo (unemployment insurance) financiado con impuestos sobre nómina.',
        ],
        keyDifferences: 'En República Dominicana el auxilio de cesantía es de orden público legal indisponible; en EE.UU. no existe derecho legal general a la cesantía salvo acuerdo privado o despido discriminatorio prohibido por ley.',
      },
    ],
    practicalInsights: [
      'Empresas multinacionales que operan en República Dominicana frecuentemente cometen el error de asumir que el preaviso exime del pago de cesantía; en RD ambos conceptos son acumulativos cuando el empleador ejerce el desahucio.',
    ],
  },
];

export async function getAllComparativeInstitutions(): Promise<ComparativeInstitutionItem[]> {
  return DOMINICAN_COMPARATIVE_LAW;
}

export async function getComparativeInstitutionBySlug(slug: string): Promise<ComparativeInstitutionItem | null> {
  return DOMINICAN_COMPARATIVE_LAW.find((c) => c.slug === slug) || null;
}
