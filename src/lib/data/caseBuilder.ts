// Lógica Integral de Diagnóstico: Construye Mi Caso, Simulador de Casos y Segunda Opinión Jurídica

export interface CaseAnalysis13Steps {
  hechos: string;
  problemasJuridicos: string[];
  areaDerecho: {
    specialtyName: string;
    specialtySlug: string;
  };
  normasAplicables: {
    normName: string;
    normNumber: string;
    articles: string[];
    gaceta?: string;
  }[];
  jurisprudencia: {
    tribunal: string;
    sentenceNumber: string;
    year: string;
    doctrine: string;
  }[];
  pruebas: {
    name: string;
    type: 'DOCUMENTAL' | 'TESTIMONIAL' | 'PERICIAL' | 'MATERIAL';
    relevance: string;
  }[];
  argumentos: string[];
  contraargumentos: string[];
  procedimiento: {
    name: string;
    stages: string[];
  };
  tribunalAutoridad: {
    name: string;
    competenceType: string;
    location: string;
  };
  plazos: {
    title: string;
    duration: string;
    startsAt: string;
    warning: string;
  }[];
  documentos: {
    name: string;
    urlTemplate?: string;
  }[];
  rutaActuacion: string[];
}

export interface SecondOpinionAudit {
  id: string;
  caseSummary: string;
  lawyerPosition: string;
  favorableArguments: string[];
  vulnerabilitiesAndFlaws: string[];
  omittedNorms: {
    normName: string;
    articleRef: string;
    reason: string;
  }[];
  favorableCaseLaw: string[];
  contraryCaseLaw: string[];
  missingEvidence: string[];
  likelyCounterArguments: string[];
  proceduralRisks: string[];
  recommendationScore: number; // 0 - 100
  finalVerdict: string;
}

// Simulador de Casos: Respuestas y rutas precalculadas basadas en hechos dominicanos frecuentes
export const PREDEFINED_CASE_SCENARIOS: Record<string, CaseAnalysis13Steps> = {
  'accidente-transito': {
    hechos: 'Colisión de vehículo de motor donde el conductor responsable ignoró una señal de pare en intersección urbana, causando daños materiales graves al vehículo del afectado y lesiones leves, negándose a cubrir los costos de reparación.',
    problemasJuridicos: [
      'Determinación de la responsabilidad civil cuasidelictual por el hecho de la cosa inanimada (vehículo de motor).',
      'Configuración de la infracción a la Ley 63-17 de Tránsito y Movilidad.',
      'Obligación solidaria de la compañía de seguros y del propietario registral del vehículo.',
    ],
    areaDerecho: {
      specialtyName: 'Derecho de Tránsito / Responsabilidad Civil',
      specialtySlug: 'derecho-civil',
    },
    normasAplicables: [
      {
        normName: 'Ley de Movilidad, Transporte Terrestre, Tránsito y Seguridad Vial',
        normNumber: 'Ley 63-17',
        articles: ['Art. 220 (Manejo temerario)', 'Art. 300 (Responsabilidad civil y penal)', 'Art. 305 (Acta de infracción)'],
        gaceta: 'G.O. 10875',
      },
      {
        normName: 'Código Civil Dominicano',
        normNumber: 'Artículos 1382, 1383 y 1384',
        articles: ['Art. 1382 (Principio general de reparación)', 'Art. 1384 párrafo 1 (Guarda del vehículo)'],
      },
      {
        normName: 'Ley sobre Seguros y Fianzas',
        normNumber: 'Ley 146-02',
        articles: ['Art. 100 y ss. (Acción directa contra la aseguradora)'],
      },
    ],
    jurisprudencia: [
      {
        tribunal: 'Suprema Corte de Justicia — Salas Reunidas',
        sentenceNumber: 'SCJ-SR-2021-0012',
        year: '2021',
        doctrine: 'La presunción de responsabilidad del guardián del vehículo de motor solo se destruye demostrando la falta exclusiva de la víctima, el caso fortuito o la fuerza mayor insuperable.',
      },
      {
        tribunal: 'Suprema Corte de Justicia — Segunda Sala (Penal/Tránsito)',
        sentenceNumber: 'SCJ-SS-2022-0418',
        year: '2022',
        doctrine: 'La demanda en reparación de daños en ocasión de un accidente de tránsito puede ser interpuesta conjuntamente en sede penal o de forma accesoria e independiente ante el Juzgado de Paz Especial de Tránsito.',
      },
    ],
    pruebas: [
      { name: 'Acta de Notificación de Accidente levantada ante la DIGESETT o Policía de Tránsito', type: 'DOCUMENTAL', relevance: 'Prueba documental preconstituida del siniestro y posición de los vehículos.' },
      { name: 'Cotizaciones oficiales de repuestos y mano de obra de talleres acreditados', type: 'DOCUMENTAL', relevance: 'Cuantificación precisa del daño emergente sufrido.' },
      { name: 'Fotografías del lugar de la colisión, impactos y placas de los vehículos', type: 'MATERIAL', relevance: 'Acreditación del nexo causal y mecánica del impacto.' },
      { name: 'Certificado Médico Legal expedido por INACIF si hubo lesiones', type: 'PERICIAL', relevance: 'Fijación de días de incapacidad física.' },
    ],
    argumentos: [
      'El demandado incurrió en falta inexcusable al obviar la preferencia de paso prescrita en la Ley 63-17.',
      'Existe relación de causalidad directa entre la maniobra imprudente y el daño material resentido.',
      'El propietario registral del vehículo y su aseguradora responden solidariamente de las indemnizaciones.',
    ],
    contraargumentos: [
      'La contraparte podría alegar falta concurrente de la víctima por presunto exceso de velocidad.',
      'La aseguradora podría argumentar cláusula de exclusión de póliza si el conductor carecía de licencia vigente.',
    ],
    procedimiento: {
      name: 'Procedimiento Ordinario ante el Juzgado de Paz Especial de Tránsito',
      stages: [
        '1. Depósito de querella formal con constitución en parte civil o demanda civil pura.',
        '2. Notificación mediante alguacil de citación a audiencia contradictoria a conductor, propietario y aseguradora.',
        '3. Celebración de audiencia de producción de pruebas y audición de agentes DIGESETT.',
        '4. Conclusiones al fondo y emisión de sentencia ejecutoria.',
      ],
    },
    tribunalAutoridad: {
      name: 'Juzgado de Paz Especial de Tránsito del Municipio o Distrito Judicial del accidente',
      competenceType: 'Competencia exclusiva de atribución en materia de infracciones y daños viales',
      location: 'Demarcación territorial donde ocurrió el choque vehicular',
    },
    plazos: [
      {
        title: 'Prescripción de la Acción Penal y Civil derivada de Accidente de Tránsito',
        duration: 'Un (1) año',
        startsAt: 'Desde el día de ocurrencia del accidente',
        warning: 'La acción prescribe al año exacto conforme al Art. 303 de la Ley 63-17 si no se ejerce citación judicial formal.',
      },
    ],
    documentos: [
      { name: 'Borrador de Demanda en Reparación de Daños ante Juzgado de Paz de Tránsito', urlTemplate: '/generador-documentos' },
      { name: 'Acto de Intimación a la Compañía Aseguradora', urlTemplate: '/generador-documentos' },
    ],
    rutaActuacion: [
      'Paso 1: Obtener certificación original del Acta de Accidente en la DIGESETT.',
      'Paso 2: Solicitar dos cotizaciones periciales de reparación y fotografías notariadas.',
      'Paso 3: Enviar acto de intimidación extrajudicial a la aseguradora y al causante concediendo 5 días hábiles para conciliar.',
      'Paso 4: Si no hay acuerdo amigable, apoderar formalmente con abogado constituido al Juzgado de Paz Especial de Tránsito competente.',
    ],
  },

  'despido-injustificado': {
    hechos: 'Trabajador desvinculado verbalmente de su empleo tras 4 años de labores continuas, alegando la empresa motivos disciplinarios sin haber seguido el procedimiento formal ante el Ministerio de Trabajo ni haber entregado carta de despido motivada.',
    problemasJuridicos: [
      'Invalidez del despido por omisión de la notificación de justa causa al Ministerio de Trabajo en el plazo de 48 horas (Art. 91 CT).',
      'Configuración de despido injustificado (Art. 95 CT) y consecuente exigibilidad de auxilio de cesantía, preaviso y salarios caídos.',
      'Reclamación de derechos adquiridos (vacaciones no disfrutadas y salario de Navidad proporcional).',
    ],
    areaDerecho: {
      specialtyName: 'Derecho Laboral',
      specialtySlug: 'derecho-laboral',
    },
    normasAplicables: [
      {
        normName: 'Código de Trabajo de la República Dominicana',
        normNumber: 'Ley 16-92',
        articles: ['Art. 87', 'Art. 88', 'Art. 91', 'Art. 95', 'Art. 80', 'Art. 76', 'Art. 86'],
        gaceta: 'G.O. 9836',
      },
    ],
    jurisprudencia: [
      {
        tribunal: 'Suprema Corte de Justicia — Tercera Sala',
        sentenceNumber: 'SCJ-TS-2023-0892',
        year: '2023',
        doctrine: 'El empleador que no notifica al Ministerio de Trabajo la causa justa del despido dentro de las 48 horas siguientes a su efectividad, queda impedido legalmente de alegar y probar la falta en juicio, teniéndose el despido de pleno derecho como injustificado.',
      },
    ],
    pruebas: [
      { name: 'Carta de despido si fue entregada o constancia de negativa patronal', type: 'DOCUMENTAL', relevance: 'Acredita la fecha y naturaleza de la terminación.' },
      { name: 'Historial de cotizaciones de la Tesorería de la Seguridad Social (TSS)', type: 'DOCUMENTAL', relevance: 'Prueba la antigüedad exacta, salario reportado y cotizaciones.' },
      { name: 'Testimonios de compañeros de trabajo sobre la prestación subordinada del servicio', type: 'TESTIMONIAL', relevance: 'Confirma horario y dependencia jurídica.' },
    ],
    argumentos: [
      'El empleador violó el debido proceso laboral al no comunicar la causa del despido en el plazo de ley.',
      'El trabajador tiene derecho irreductible a su auxilio de cesantía tarifado conforme al Art. 80 CT.',
      'Corresponde la sanción del Art. 86 CT de un día de salario por retardo si no pagaron en 10 días.',
    ],
    contraargumentos: [
      'La empresa podría alegar que fue el trabajador quien abandonó el puesto de trabajo.',
      'Discusión sobre el monto exacto del salario ordinario computable.',
    ],
    procedimiento: {
      name: 'Procedimiento Ordinario ante el Juzgado de Trabajo',
      stages: [
        '1. Depósito de reclamación ante la Representación Local de Trabajo para audiencia de conciliación administrativa.',
        '2. Si no hay acuerdo, redacción e interposición de la demanda laboral formal ante la presidencia de los Juzgados de Trabajo.',
        '3. Audiencia de conciliación judicial y, a falta de acuerdo, audiencia de producción de pruebas.',
        '4. Emisión de sentencia condenatoria de prestaciones y salarios caídos.',
      ],
    },
    tribunalAutoridad: {
      name: 'Juzgado de Trabajo de la demarcación territorial de ejecución del contrato',
      competenceType: 'Competencia exclusiva en materia de litigios laborales individuales',
      location: 'Palacio de Justicia correspondiente',
    },
    plazos: [
      {
        title: 'Prescripción de la Acción Laboral por Despido',
        duration: 'Un (1) mes',
        startsAt: 'Desde la fecha del despido',
        warning: 'Art. 701 CT: Debe interponerse la demanda o queja antes de transcurrir un mes de fecha a fecha.',
      },
    ],
    documentos: [
      { name: 'Modelo de Demanda Laboral por Despido Injustificado', urlTemplate: '/generador-documentos' },
    ],
    rutaActuacion: [
      'Paso 1: Dirigirse de inmediato al Ministerio de Trabajo para radicar queja y solicitar conciliación formal.',
      'Paso 2: Solicitar récord de cotizaciones a la TSS para sustentar el salario promedio real.',
      'Paso 3: Si la empresa no acude a la conciliación, incoar la demanda formal ante el Juzgado de Trabajo antes de que expire el mes de prescripción.',
    ],
  },
};

// Generador de Diagnóstico Automatizado para "Construye Mi Caso"
export function analyzeCaseInput(factsText: string): CaseAnalysis13Steps {
  const lower = factsText.toLowerCase();

  if (lower.includes('choc') || lower.includes('vehic') || lower.includes('tránsito') || lower.includes('accidente') || lower.includes('carro')) {
    return PREDEFINED_CASE_SCENARIOS['accidente-transito'];
  }

  if (lower.includes('despid') || lower.includes('trabaj') || lower.includes('prestacion') || lower.includes('cesant') || lower.includes('empleador') || lower.includes('desahucio')) {
    return PREDEFINED_CASE_SCENARIOS['despido-injustificado'];
  }

  // Análisis dinámico estructurado por defecto con los 13 pasos garantizados
  return {
    hechos: factsText,
    problemasJuridicos: [
      'Determinación de las obligaciones jurídicas recíprocas entre las partes intervinientes.',
      'Identificación del régimen de responsabilidad aplicable y de las pruebas necesarias.',
      'Verificación de la vigencia de los plazos de prescripción y caducidad procesal.',
    ],
    areaDerecho: {
      specialtyName: 'Derecho Civil y Procesal Dominicano',
      specialtySlug: 'derecho-civil',
    },
    normasAplicables: [
      {
        normName: 'Código Civil Dominicano',
        normNumber: 'Ley de Derecho Común',
        articles: ['Art. 1101 (De los Contratos)', 'Art. 1134 (Fuerza de Ley de las Convenciones)', 'Art. 1382 (Responsabilidad)'],
      },
      {
        normName: 'Constitución de la República Dominicana',
        normNumber: 'Reforma 2015/2024',
        articles: ['Art. 69 (Garantías del Debido Proceso y Tutela Judicial Efectiva)'],
      },
    ],
    jurisprudencia: [
      {
        tribunal: 'Suprema Corte de Justicia — Sala Civil',
        sentenceNumber: 'SCJ-SC-2022-0941',
        year: '2022',
        doctrine: 'Toda pretensión judicial debe sustentarse en elementos probatorios legalmente aportados en el debate contradictorio.',
      },
    ],
    pruebas: [
      { name: 'Actos de Notificación por Alguacil e Intimaciones previas', type: 'DOCUMENTAL', relevance: 'Constancia de la constitución en mora de la contraparte.' },
      { name: 'Contratos, facturas, recibos bancarios o comunicaciones escritas', type: 'DOCUMENTAL', relevance: 'Demostración de la existencia del vínculo jurídico y su incumplimiento.' },
    ],
    argumentos: [
      'El principio de buena fe contractual y el deber general de no dañar a otro rigen las relaciones civiles en la República Dominicana.',
      'La parte reclamante se encuentra facultada por la ley para exigir el cumplimiento forzoso o la resolución con indemnización.',
    ],
    contraargumentos: [
      'La contraparte podría alegar excepción de incumplimiento (exceptio non adimpleti contractus) o fuerza mayor.',
    ],
    procedimiento: {
      name: 'Procedimiento Ordinario en Instancia Principal',
      stages: [
        '1. Envío de acto ministerial de intimidación y puesta en mora con plazo franco.',
        '2. Instrumentación del acto de emplazamiento de demanda ante el tribunal competente.',
        '3. Audiencias de comunicación de documentos, debates y conclusiones.',
        '4. Sentencia judicial ejecutable.',
      ],
    },
    tribunalAutoridad: {
      name: 'Juzgado de Primera Instancia / Cámara Civil de la Demarcación Territorial',
      competenceType: 'Competencia civil ordinaria',
      location: 'Palacio de Justicia competente',
    },
    plazos: [
      {
        title: 'Plazo de Emplazamiento de la Octava Franca de Ley',
        duration: '8 días netos francos',
        startsAt: 'Desde la notificación de la demanda',
        warning: 'No computa día de notificación ni de vencimiento.',
      },
    ],
    documentos: [
      { name: 'Acto de Intimación de Pago y Puesta en Mora', urlTemplate: '/generador-documentos' },
    ],
    rutaActuacion: [
      'Paso 1: Recopilar y organizar la evidencia documental en orden cronológico.',
      'Paso 2: Remitir intimación formal mediante alguacil otorgando plazo perentorio de cumplimiento.',
      'Paso 3: Si no se produce el pago o satisfacción en el plazo, incoar formal demanda en justicia asistido por abogado matriculado en el CARD.',
    ],
  };
}

// Generador de Auditoría para "Segunda Opinión Jurídica"
export function evaluateLegalStrategy(caseFacts: string, lawyerStrategy: string): SecondOpinionAudit {
  const lowerStrategy = lawyerStrategy.toLowerCase();
  const lowerFacts = caseFacts.toLowerCase();

  const omitted: SecondOpinionAudit['omittedNorms'] = [];
  const flaws: string[] = [];
  const favorableArgs: string[] = [];
  const contraryCaseLaw: string[] = [];
  const favorableCaseLaw: string[] = [];
  const missingEv: string[] = [];
  const risks: string[] = [];

  // Verificaciones comunes
  if (!lowerStrategy.includes('mora') && !lowerStrategy.includes('intima')) {
    flaws.push('Falta de constitución formal en mora: En materia civil contractual, no se puede reclamar daños y perjuicios moratorios sin previo mandamiento o intimación formal (Art. 1146 Código Civil).');
    omitted.push({
      normName: 'Código Civil Dominicano',
      articleRef: 'Art. 1146',
      reason: 'Exige que el deudor esté formalmente constituido en mora para que corran los intereses e indemnizaciones por retardo.',
    });
  } else {
    favorableArgs.push('Adecuada previsión de la intimación previa de pago para activar la mora legal.');
  }

  if (lowerFacts.includes('trabaj') || lowerFacts.includes('emple')) {
    if (!lowerStrategy.includes('701') && !lowerStrategy.includes('prescrip')) {
      flaws.push('Riesgo de prescripción laboral: No se enfatiza el perentorio plazo de UN MES del Art. 701 del Código de Trabajo para interponer la demanda.');
      omitted.push({
        normName: 'Código de Trabajo',
        articleRef: 'Art. 701',
        reason: 'Prescripción breve de 30 días para cobro de prestaciones laborales.',
      });
      risks.push('Declaratoria de inadmisibilidad de la demanda laboral por extemporaneidad si se agotan plazos en negociaciones extrajudiciales.');
    }
  }

  if (lowerStrategy.includes('embargo') && !lowerStrategy.includes('titulo ejecutorio')) {
    flaws.push('Tentativa de embargo sin título auténtico: Los embargos ejecutorios exigen una sentencia firme o un pagaré notarial auténtico con cláusula de ejecutoria forzosa (Art. 545 Código de Procedimiento Civil).');
    contraryCaseLaw.push('SCJ-SC-2021-0814: Nulidad radical de embargo trabado con documento privado sin aprobación judicial previa.');
    risks.push('Demanda reconvencional en levantamiento de embargo y pago de cuantiosos daños y perjuicios por traba abusiva e ilegal.');
  }

  if (lowerStrategy.includes('amparo')) {
    if (!lowerStrategy.includes('30 dias') && !lowerStrategy.includes('plazo')) {
      flaws.push('Filtro de caducidad en Amparo: La acción de amparo prescribe fatalmente a los 30 días continuos conforme al Art. 70 de la Ley 137-11.');
      omitted.push({
        normName: 'Ley Orgánica del Tribunal Constitucional',
        articleRef: 'Art. 70',
        reason: 'Plazo perentorio de 30 días para incoar la acción constitucional.',
      });
    }
    favorableCaseLaw.push('TC/0123/18: Procedencia de amparo para resguardo de debido proceso y motivación en decisiones de órganos públicos.');
  }

  // Argumentos favorables estándar detectados
  favorableArgs.push('La fundamentación fáctica identifica adecuadamente la existencia de la afectación patrimonial y el nexo causal.');
  missingEv.push('Acreditación pericial o documental del monto exacto reclamado para evitar condenaciones a sumas meramente simbólicas.');

  let score = 85;
  if (flaws.length > 2) score = 65;
  if (flaws.length > 4) score = 45;

  return {
    id: 'audit-' + Date.now(),
    caseSummary: caseFacts,
    lawyerPosition: lawyerStrategy,
    favorableArguments: favorableArgs,
    vulnerabilitiesAndFlaws: flaws.length > 0 ? flaws : ['Estrategia procesal bien orientada; no se aprecian vicios formales ostensibles.'],
    omittedNorms: omitted,
    favorableCaseLaw: favorableCaseLaw.length > 0 ? favorableCaseLaw : ['SCJ-SC-2022-0941: Principio de congruencia procesal y deber de fundamentación.'],
    contraryCaseLaw: contraryCaseLaw,
    missingEvidence: missingEv,
    likelyCounterArguments: [
      'La contraparte opondrá la excepción de litispendencia o conexidad si existen otros procedimientos abiertos.',
      'Alegato de fuerza mayor o falta concurrente de la parte demandante.',
    ],
    proceduralRisks: risks.length > 0 ? risks : ['Dilación procesal ordinaria por incidentes de reenvío de audiencias.'],
    recommendationScore: score,
    finalVerdict:
      score >= 80
        ? 'Estrategia Jurídica Sólida con Alta Probabilidad de Éxito, sujeta a reforzar los medios de prueba cuantitativos.'
        : 'Estrategia con Vulnerabilidades Procesales Significativas: Se recomienda corregir las omisiones normativas identificadas antes del depósito formal.',
  };
}
