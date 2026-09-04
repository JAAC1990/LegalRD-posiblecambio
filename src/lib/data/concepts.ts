// Fichas Jurídicas de Conceptos del Derecho Dominicano

export interface LegalConceptItem {
  id: string;
  slug: string;
  name: string;
  specialtySlug: string;
  specialtyName: string;
  definition: string;
  legalBasis: {
    normName: string;
    normNumber: string;
    articleRef: string;
    gacetaRef?: string;
  }[];
  types?: {
    name: string;
    description: string;
    legalBasis: string;
  }[];
  deadlinesRules?: {
    title: string;
    duration: string;
    startsAt: string;
    interruptionRules: string;
    suspensionRules: string;
    legalRef: string;
  };
  keyCaseLaw: {
    court: string;
    sentenceNumber: string;
    year: string;
    summary: string;
  }[];
  frequentMistakes: string[];
  practicalChecklist: string[];
  relatedProcedures: {
    name: string;
    url: string;
  }[];
  relatedArticles: {
    normSlug: string;
    articleNum: number;
    label: string;
  }[];
}

export const DOMINICAN_LEGAL_CONCEPTS: LegalConceptItem[] = [
  {
    id: 'con-1',
    slug: 'prescripcion',
    name: 'La Prescripción (Extintiva y Adquisitiva)',
    specialtySlug: 'derecho-civil',
    specialtyName: 'Derecho Civil',
    definition: 'Medio legal mediante el cual, por el transcurso de cierto tiempo y bajo las condiciones determinadas por la ley, se adquiere un derecho real (usucapión o prescripción adquisitiva) o se extingue una acción o derecho de crédito (prescripción extintiva o liberatoria).',
    legalBasis: [
      { normName: 'Código Civil Dominicano', normNumber: 'Artículos 2219 al 2281', articleRef: 'Arts. 2219-2281 CC' },
      { normName: 'Código de Trabajo', normNumber: 'Ley 16-92', articleRef: 'Arts. 701-705 CT' },
      { normName: 'Código Procesal Penal', normNumber: 'Ley 76-02 / Ley 10-15', articleRef: 'Arts. 45-51 CPP' },
    ],
    types: [
      { name: 'Prescripción Extintiva Civil Ordinaria', description: 'Extingue las acciones personales u obligaciones contractuales tras el transcurso de 20 años bajo el régimen reformado (antiguamente 30 años en el Código Civil napoleónico).', legalBasis: 'Art. 2262 Código Civil' },
      { name: 'Prescripciones Breves Laborales', description: 'Plazo perentorio de un mes para reclamar prestaciones por desahucio/despido (Art. 701 CT); dos meses para reclamación de horas extras y salarios ordinarios (Art. 702 CT); y tres meses para accidentes de trabajo (Art. 703 CT).', legalBasis: 'Arts. 701-703 Código de Trabajo' },
      { name: 'Prescripción de la Acción Penal', description: 'Plazo igual al máximo de la pena imponible para crímenes sancionados con prisión; no menor de 3 años para delitos y 1 año para contravenciones.', legalBasis: 'Art. 45 Código Procesal Penal' },
      { name: 'Prescripción Adquisitiva Inmobiliaria (Usucapión)', description: 'Inadmisible de pleno derecho sobre terrenos registrados con Certificado de Título conforme al principio de imprescriptibilidad inmobiliaria.', legalBasis: 'Art. 7 y 8 Ley 108-05' },
    ],
    deadlinesRules: {
      title: 'Régimen de Cómputo y Preclusión',
      duration: 'Varía según la materia: 1 mes (laboral), 1 a 10 años (penal), 20 años (civil ordinario).',
      startsAt: 'Desde el momento en que la acción queda expedita o el derecho es exigible (en materia laboral, desde la terminación del contrato).',
      interruptionRules: 'Se interrumpe por citación judicial formal, mandamiento de pago notificado o reconocimiento expreso de deuda por el obligado.',
      suspensionRules: 'Se suspende a favor de menores no emancipados y personas bajo tutela legal hasta que cesa la incapacidad.',
      legalRef: 'Arts. 2242 y ss. Código Civil; Art. 704 Código de Trabajo',
    },
    keyCaseLaw: [
      {
        court: 'Suprema Corte de Justicia — Sala Civil',
        sentenceNumber: 'SCJ-SC-2022-0941',
        year: '2022',
        summary: 'La prescripción extintiva no puede ser suplida de oficio por los jueces de fondo en materia civil ordinaria, debiendo ser invocada expresamente como excepción perentoria por la parte interesada.',
      },
      {
        court: 'Suprema Corte de Justicia — Sala Laboral',
        sentenceNumber: 'SCJ-TS-2023-0488',
        year: '2023',
        summary: 'El plazo de prescripción de un mes del Art. 701 del Código de Trabajo se computa de fecha a fecha y comienza al día siguiente a la expiración del preaviso o terminación de labores.',
      },
    ],
    frequentMistakes: [
      'Confundir prescripción adquisitiva con terrenos registrados (en RD los terrenos con Certificado de Título NO prescriben jamás conforme a la Ley 108-05).',
      'No invocar la prescripción en la primera audiencia de conclusiones al fondo o antes de toda defensa al fondo cuando se trate de materia civil.',
      'Calcular el mes laboral en 30 días en lugar de fecha a fecha legal.',
    ],
    practicalChecklist: [
      'Determinar la fecha exacta en que la obligación o el hecho generador fue legalmente exigible.',
      'Verificar si existieron actos interruptivos (notificaciones de alguacil, actos de demanda, abonos de pago).',
      'Comprobar si el deudor goza de alguna causal de suspensión legal (minoridad, interdicción).',
      'Proponer la excepción de prescripción formalmente en el escrito de defensa o conclusiones.',
    ],
    relatedProcedures: [
      { name: 'Procedimiento de Demanda Laboral', url: '/procedimientos' },
      { name: 'Cálculo de Plazos Procesales', url: '/calculadora-plazos' },
    ],
    relatedArticles: [
      { normSlug: 'codigo-de-trabajo-ley-16-92', articleNum: 701, label: 'Art. 701 CT: Prescripción de un mes' },
      { normSlug: 'codigo-de-trabajo-ley-16-92', articleNum: 80, label: 'Art. 80 CT: Auxilio de Cesantía' },
    ],
  },
  {
    id: 'con-2',
    slug: 'desahucio',
    name: 'El Desahucio Laboral',
    specialtySlug: 'derecho-laboral',
    specialtyName: 'Derecho Laboral',
    definition: 'Acto jurídico unilateral mediante el cual una de las partes de un contrato de trabajo por tiempo indefinido decide ponerle fin sin alegar justa causa, con la obligación de otorgar preaviso o pagar su equivalente pecuniario, e indemnizar al trabajador con el auxilio de cesantía si quien lo ejerce es el empleador.',
    legalBasis: [
      { normName: 'Código de Trabajo', normNumber: 'Ley 16-92', articleRef: 'Arts. 75-86 CT' },
      { normName: 'Reglamento de Aplicación', normNumber: 'Decreto 258-93', articleRef: 'Arts. 18-24' },
    ],
    types: [
      { name: 'Desahucio ejercido por el Empleador', description: 'Obliga a comunicar el desahucio por escrito al trabajador y a la Secretaría/Ministerio de Trabajo dentro de las 48 horas, generando la obligación de pagar preaviso y cesantía en un plazo de 10 días.', legalBasis: 'Arts. 75, 77, 86 Código de Trabajo' },
      { name: 'Desahucio ejercido por el Trabajador (Renuncia)', description: 'El trabajador notifica su voluntad de cesar en el empleo; debe cumplir el preaviso al empleador y no genera derecho al auxilio de cesantía.', legalBasis: 'Arts. 75 y 78 Código de Trabajo' },
    ],
    deadlinesRules: {
      title: 'Plazos de Pago y Notificación',
      duration: '10 días calendarios para el pago total de prestaciones (Art. 86 CT); 48 horas para comunicar al Ministerio de Trabajo (Art. 77 CT).',
      startsAt: 'Desde la fecha de efectividad de la terminación de la relación laboral.',
      interruptionRules: 'La falta de pago en el plazo de 10 días genera el recargo de un día de salario ordinario por cada día de retardo.',
      suspensionRules: 'No surte efecto si se ejerce durante el período de suspensión legal del contrato de trabajo (maternidad, descanso médico, vacaciones).',
      legalRef: 'Arts. 75, 77, 84, 86 Código de Trabajo',
    },
    keyCaseLaw: [
      {
        court: 'Suprema Corte de Justicia — Tercera Sala',
        sentenceNumber: 'SCJ-TS-2023-1120',
        year: '2023',
        summary: 'El desahucio es un derecho soberano que no admite debate sobre motivos subjetivos; sin embargo, no puede ejercerse en fraude a los fueros especiales de protección como la maternidad (Art. 232 CT) o el fuero sindical.',
      },
      {
        court: 'Suprema Corte de Justicia — Tercera Sala',
        sentenceNumber: 'SCJ-TS-2022-0310',
        year: '2022',
        summary: 'La sanción del Art. 86 (un día de salario por día de retardo) corre de pleno derecho a partir del undécimo día posterior a la terminación, siempre que el empleador haya omitido el pago total de las sumas adeudadas.',
      },
    ],
    frequentMistakes: [
      'Ejercer el desahucio contra una trabajadora embarazada o en licencia postnatal (genera la indemnización agravada de 5 meses de salario del Art. 233 CT).',
      'No remitir la constancia de notificación al Departamento de Trabajo en el plazo de 48 horas.',
      'Superar los 10 días de plazo para pagar la liquidación sin ofrecer formalmente la consignación en la Colecturía de Rentas Internas.',
    ],
    practicalChecklist: [
      'Verificar que el trabajador no se encuentre en fuero especial (maternidad, sindicato, suspensión médica).',
      'Redactar la carta de desahucio indicando si se otorga preaviso o se compensará en dinero.',
      'Hacer firmar recibo al trabajador con fecha y hora exacta.',
      'Notificar a la Representación Local del Ministerio de Trabajo dentro de 48 horas (Formulario DGT-4 o comunicación formal).',
      'Efectuar el pago total dentro de los 10 días posteriores.',
    ],
    relatedProcedures: [
      { name: 'Cálculo de Liquidación Laboral', url: '/asistente-ia' },
      { name: 'Calculadora de Plazos Procesales', url: '/calculadora-plazos' },
    ],
    relatedArticles: [
      { normSlug: 'codigo-de-trabajo-ley-16-92', articleNum: 75, label: 'Art. 75 CT: Definición de Desahucio' },
      { normSlug: 'codigo-de-trabajo-ley-16-92', articleNum: 76, label: 'Art. 76 CT: Plazos de Preaviso' },
      { normSlug: 'codigo-de-trabajo-ley-16-92', articleNum: 80, label: 'Art. 80 CT: Escala de Cesantía' },
      { normSlug: 'codigo-de-trabajo-ley-16-92', articleNum: 86, label: 'Art. 86 CT: Sanción por Pago Tardío' },
    ],
  },
  {
    id: 'con-3',
    slug: 'astreinte',
    name: 'El Astreinte (Condenación Conminatoria)',
    specialtySlug: 'derecho-procesal-civil',
    specialtyName: 'Derecho Procesal Civil',
    definition: 'Condenación pecuniaria de carácter conminatorio y accesorio, fijada por el juez para compeler al deudor de una obligación de hacer o no hacer al cumplimiento efectivo de una resolución judicial, tasada por cada día o fracción de tiempo de retraso.',
    legalBasis: [
      { normName: 'Ley sobre Procedimiento Civil', normNumber: 'Ley 834 de 1978', articleRef: 'Arts. 48-52' },
      { normName: 'Ley Orgánica del Tribunal Constitucional', normNumber: 'Ley 137-11', articleRef: 'Art. 93' },
      { normName: 'Código Procesal Civil', normNumber: 'Arts. 1382 CC en conjunción con jurisprudencia SCJ', articleRef: 'Doctrina SCJ' },
    ],
    types: [
      { name: 'Astreinte Provisional', description: 'Fijado provisionalmente por el tribunal para ejercer presión sobre el obligado; puede ser modificado, reducido o suprimido al momento de la liquidación definitiva según la conducta del deudor.', legalBasis: 'Art. 49 Ley 834 de 1978' },
      { name: 'Astreinte Definitivo', description: 'Cifra inmutable calculada sobre la base del retardo efectivo; no puede ser disminuido salvo fuerza mayor justificada.', legalBasis: 'Art. 50 Ley 834 de 1978' },
      { name: 'Astreinte en Acción Constitucional de Amparo', description: 'Herramienta coercitiva privilegiada del Juez de Amparo para exigir a autoridades públicas la restitución inmediata del derecho fundamental vulnerado.', legalBasis: 'Art. 93 Ley 137-11' },
    ],
    deadlinesRules: {
      title: 'Efectividad y Liquidación',
      duration: 'Exigible tras la notificación formal de la sentencia conminatoria al obligado.',
      startsAt: 'Desde la fecha fijada por el juez en el dispositivo de la sentencia o a partir de la notificación del acto de alguacil.',
      interruptionRules: 'Cesa cuando el obligado acredita ante el tribunal haber ejecutado integralmente la orden judicial impuesta.',
      suspensionRules: 'Fuerza mayor o imposibilidad absoluta de ejecución debidamente verificada en juicio.',
      legalRef: 'Arts. 48-53 Ley 834 de 1978; Sentencia TC/0438/17',
    },
    keyCaseLaw: [
      {
        court: 'Tribunal Constitucional',
        sentenceNumber: 'TC/0438/17',
        year: '2017',
        summary: 'El astreinte no constituye una indemnización de daños y perjuicios a favor del acreedor, sino una medida coercitiva judicial; sus fondos pueden ser destinados total o parcialmente a favor del acreedor o de entidades de bien social según determine el juzgador.',
      },
      {
        court: 'Suprema Corte de Justicia — Salas Reunidas',
        sentenceNumber: 'SCJ-SR-2021-0024',
        year: '2021',
        summary: 'Para proceder a la ejecución forzosa del astreinte, es indispensable un juicio previo de liquidación donde se fije la suma líquida y exigible resultante de los días de desacato comprobado.',
      },
    ],
    frequentMistakes: [
      'Intentar embargar bienes del deudor directamente con la sentencia que impone el astreinte provisional sin haber obtenido previamente la sentencia de liquidación de astreinte.',
      'Confundir astreinte con daños y perjuicios moratorios contractuales.',
      'No intimar y notificar la sentencia que contiene la conminación antes de computar los días de retardo.',
    ],
    practicalChecklist: [
      'Obtener sentencia firme o con ejecución provisional que ordene la obligación de hacer bajo apercibimiento de astreinte.',
      'Notificar la sentencia formalmente mediante acto de alguacil con intimación a cumplir en plazo perentorio.',
      'Constatar notarialmente o judicialmente el vencimiento y persistencia del desacato.',
      'Introducir demanda en liquidación de astreinte ante el mismo tribunal que dictó la medida.',
    ],
    relatedProcedures: [
      { name: 'Procedimiento de Acción de Amparo', url: '/procedimientos' },
      { name: 'Rutas Jurídicas de Litigio', url: '/rutas-juridicas' },
    ],
    relatedArticles: [
      { normSlug: 'constitucion-republica-dominicana', articleNum: 69, label: 'Art. 69 Constitución: Tutela Judicial Efectiva' },
      { normSlug: 'constitucion-republica-dominicana', articleNum: 72, label: 'Art. 72 Constitución: Acción de Amparo' },
    ],
  },
  {
    id: 'con-4',
    slug: 'litis-derechos-registrados',
    name: 'Litis sobre Derechos Registrados',
    specialtySlug: 'derecho-inmobiliario',
    specialtyName: 'Derecho Inmobiliario',
    definition: 'Proceso contradictorio introducido ante la Jurisdicción Inmobiliaria que tiene por objeto dirimir controversias sobre un derecho real inmobiliario registrado o susceptible de registro sobre un inmueble que cuente con mensura catastral aprobada.',
    legalBasis: [
      { normName: 'Ley de Registro Inmobiliario', normNumber: 'Ley 108-05', articleRef: 'Arts. 28-31' },
      { normName: 'Reglamento de los Tribunales de Tierras', normNumber: 'Resolución SCJ 1737-2007', articleRef: 'Arts. 125-144' },
    ],
    types: [
      { name: 'Demanda en Nulidad de Transferencia o Título', description: 'Acción para invalidar un contrato de venta, donación o certificado de título emitido fraudulentamente.', legalBasis: 'Art. 31 Ley 108-05' },
      { name: 'Demanda en Cancelación de Hipoteca o Privilegio', description: 'Controversia destinada a ordenar la cancelación registral de una carga inscrita en el Registro de Títulos.', legalBasis: 'Art. 29 Ley 108-05' },
      { name: 'Conflicto de Linderos o Ocupación Ilegal', description: 'Litigio entre parcelas colindantes registradas para restablecer las coordenadas perimetrales.', legalBasis: 'Art. 30 Ley 108-05' },
    ],
    deadlinesRules: {
      title: 'Notificación y Fijación de Audiencias',
      duration: 'Notificación de la demanda a la contraparte en la octava franca de ley; depósito ante el Tribunal de Tierras en el plazo de 3 días posteriores.',
      startsAt: 'Desde la fecha del acto de emplazamiento de alguacil.',
      interruptionRules: 'La no notificación y depósito oportuno caduca el apoderamiento procesal inmobiliario.',
      suspensionRules: 'Apertura de procedimiento penal por falsedad que incida directamente sobre la legitimidad del título litigioso.',
      legalRef: 'Arts. 28-32 Ley 108-05; Reglamento de Tribunales de Tierras',
    },
    keyCaseLaw: [
      {
        court: 'Suprema Corte de Justicia — Tercera Sala (Tierras)',
        sentenceNumber: 'SCJ-TS-2023-0189',
        year: '2023',
        summary: 'La competencia del Tribunal de Tierras de Jurisdicción Original es de orden público absoluto en materia de litis sobre derechos registrados; los tribunales civiles ordinarios carecen de competencia para estatuir sobre derechos de propiedad amparados en certificados de título.',
      },
    ],
    frequentMistakes: [
      'Apoderar a la Cámara Civil ordinaria en lugar del Tribunal de Tierras de Jurisdicción Original territorialmente competente.',
      'No solicitar oportunamente la inscripción de la anotación de demanda (litis sobre derechos registrados) en el Registro de Títulos para evitar transferencias a terceros adquirientes de buena fe.',
      'Omitir la notificación a los acreedores hipotecarios que tengan derechos inscritos sobre el inmueble.',
    ],
    practicalChecklist: [
      'Obtener Certificación del Estado Jurídico del Inmueble (IPI e Hipotecas) ante el Registro de Títulos.',
      'Redactar la instancia motivada de Litis sobre Derechos Registrados.',
      'Emplazar formalmente a la demandada mediante ministerial habilitado.',
      'Depositar el expediente ante el Tribunal de Tierras de Jurisdicción Original de la demarcación territorial de la parcela.',
      'Solicitar y registrar el Bloqueo Registral o Anotación de Litis ante el Registrador de Títulos.',
    ],
    relatedProcedures: [
      { name: 'Procedimiento de Deslinde Inmobiliario', url: '/procedimientos' },
      { name: 'Guía de Trámites en Registro Inmobiliario', url: '/tramites' },
    ],
    relatedArticles: [
      { normSlug: 'constitucion-republica-dominicana', articleNum: 51, label: 'Art. 51 Constitución: Derecho de Propiedad' },
    ],
  },
  {
    id: 'con-5',
    slug: 'tutela-judicial-efectiva',
    name: 'Tutela Judicial Efectiva y Debido Proceso',
    specialtySlug: 'derecho-constitucional',
    specialtyName: 'Derecho Constitucional',
    definition: 'Principio y derecho fundamental consagrado en el Artículo 69 de la Constitución que garantiza a toda persona el acceso expedito a tribunales independientes, a ser oída en plazo razonable, a la presunción de inocencia, al derecho de defensa irrestricto y a una resolución judicial motivada y susceptible de ejecución.',
    legalBasis: [
      { normName: 'Constitución de la República Dominicana', normNumber: 'Constitución 2015/2024', articleRef: 'Art. 69' },
      { normName: 'Ley Orgánica del Tribunal Constitucional', normNumber: 'Ley 137-11', articleRef: 'Arts. 7, 53, 70' },
      { normName: 'Convención Americana sobre Derechos Humanos', normNumber: 'Pacto de San José', articleRef: 'Arts. 8 y 25' },
    ],
    types: [
      { name: 'Acceso a la Justicia', description: 'Garantía de gratuidad de acceso a la jurisdicción e imposibilidad de condicionar el reclamo a fianzas desproporcionadas (ej. supresión de la fianza judicatum solvi).', legalBasis: 'Art. 69.1 Constitución' },
      { name: 'Derecho a la Defensa y Asistencia Letrada', description: 'Garantía inviolable de contar con abogado público o privado en todas las etapas procesales.', legalBasis: 'Art. 69.4 Constitución' },
      { name: 'Plazo Razonable', description: 'Derecho a ser juzgado sin dilaciones indebidas; su vulneración en materia penal puede provocar la extinción de la acción.', legalBasis: 'Art. 69.3 Constitución y Art. 8 CPP' },
      { name: 'Motivación Suficiente de las Sentencias', description: 'Deber ineludible de los jueces de fundar lógica y legalmente toda decisión jurisdiccional.', legalBasis: 'Art. 69.10 Constitución' },
    ],
    deadlinesRules: {
      title: 'Plazo Razonable y Caducidades',
      duration: 'En materia penal, plazo máximo de duración del proceso de 3 años ampliable hasta 4 años bajo circunstancias tasadas (Art. 148 CPP).',
      startsAt: 'Desde la imposición de una medida de coerción o la notificación de la acusación formal.',
      interruptionRules: 'Las dilaciones atribuibles a la defensa del imputado no computan a los fines del plazo razonable.',
      suspensionRules: 'Declaratoria de rebeldía o tramitación de incidentes de incompetencia ante órganos superiores.',
      legalRef: 'Art. 69 Constitución; Art. 148 Código Procesal Penal',
    },
    keyCaseLaw: [
      {
        court: 'Tribunal Constitucional',
        sentenceNumber: 'TC/0123/18',
        year: '2018',
        summary: 'El deber de motivación es un elemento estructural del debido proceso; una sentencia que omita responder pedimentos cardinales o carezca de razonamiento fáctico-jurídico viola la tutela judicial y es susceptible de nulidad mediante revisión constitucional.',
      },
    ],
    frequentMistakes: [
      'Considerar que el debido proceso sólo rige en materia penal (es de aplicación obligatoria en materia administrativa, civil, laboral, fiscal e inmobiliaria).',
      'Confundir tutela judicial efectiva con el derecho a obtener una sentencia favorable (la tutela garantiza un proceso equitativo, no un resultado preconcebido).',
    ],
    practicalChecklist: [
      'Verificar que en toda actuación administrativa o judicial se notificaron los cargos con anterioridad suficiente.',
      'Asegurar el ejercicio del derecho a ser oído antes de la imposición de cualquier sanción.',
      'Revisar que la decisión final conteste todos los medios y argumentos expuestos por las partes.',
    ],
    relatedProcedures: [
      { name: 'Acción de Amparo Constitucional', url: '/procedimientos' },
      { name: 'Rutas Jurídicas', url: '/rutas-juridicas' },
    ],
    relatedArticles: [
      { normSlug: 'constitucion-republica-dominicana', articleNum: 69, label: 'Art. 69 Constitución: Tutela Judicial' },
      { normSlug: 'constitucion-republica-dominicana', articleNum: 72, label: 'Art. 72 Constitución: Acción de Amparo' },
    ],
  },
];

export async function getAllLegalConcepts(): Promise<LegalConceptItem[]> {
  return DOMINICAN_LEGAL_CONCEPTS;
}

export async function getLegalConceptBySlug(slug: string): Promise<LegalConceptItem | null> {
  return DOMINICAN_LEGAL_CONCEPTS.find((c) => c.slug === slug) || null;
}
