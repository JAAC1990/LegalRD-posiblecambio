// Laboratorio de Casos Hipotéticos para Estudiantes de Derecho (Modo Universidad)

export interface CaseLabStepQuestion {
  stepNumber: number;
  stepTitle: string;
  prompt: string;
  options: {
    id: string;
    text: string;
    isCorrect: boolean;
    feedback: string;
  }[];
  pedagogicalTip: string;
}

export interface HypotheticalCaseItem {
  id: string;
  slug: string;
  title: string;
  difficulty: 'PRINCIPIANTE' | 'INTERMEDIO' | 'AVANZADO';
  specialtySlug: string;
  specialtyName: string;
  factsScenario: string;
  learningObjectives: string[];
  steps: CaseLabStepQuestion[];
  finalLegalVerdictSummary: string;
  normativeBasis: string[];
}

export const DOMINICAN_CASE_LAB_SCENARIOS: HypotheticalCaseItem[] = [
  {
    id: 'lab-case-1',
    slug: 'caso-desahucio-embarazada',
    title: 'Caso Hipotético: El Desahucio de la Colaboradora en Estado de Gestación',
    difficulty: 'INTERMEDIO',
    specialtySlug: 'derecho-laboral',
    specialtyName: 'Derecho Laboral y Protección Social',
    factsScenario: 'La licenciada Altagracia Pérez se desempeña como contadora senior en "Distribuidora Caribe, S.A." desde hace 3 años. En fecha 5 de enero de 2026, la trabajadora comunicó por escrito a su empleador su estado de embarazo de 12 semanas, adjuntando certificado médico. En fecha 20 de febrero de 2026, la gerencia de la empresa le notifica mediante carta formal el ejercicio del desahucio patronal, ofreciéndole pagar la cesantía y el preaviso correspondiente conforme a los Artículos 76 y 80 del Código de Trabajo, argumentando "reestructuración interna de la nómina".',
    learningObjectives: [
      'Identificar la naturaleza de orden público del fuero maternal en la República Dominicana.',
      'Diferenciar entre despido, desahucio y terminación nula de pleno derecho.',
      'Calcular e invocar la indemnización especial agravada del Artículo 233 del Código de Trabajo.',
    ],
    steps: [
      {
        stepNumber: 1,
        stepTitle: '1. Identificación del Problema Jurídico Central',
        prompt: '¿Cuál es el vicio o problema jurídico sustancial en la actuación del empleador?',
        options: [
          {
            id: 'opt-1a',
            text: 'El empleador no puede ejercer el desahucio porque la trabajadora goza de fuero especial de maternidad de orden público que prohíbe el desahucio durante el embarazo.',
            isCorrect: true,
            feedback: '¡Correcto! El Artículo 232 del Código de Trabajo prohíbe taxativamente el desahucio contra la mujer embarazada durante el período de gestación y hasta tres meses después del parto.',
          },
          {
            id: 'opt-1b',
            text: 'El empleador actuó correctamente porque el desahucio es un derecho unilateral libre siempre que pague las prestaciones ordinarias del Art. 80.',
            isCorrect: false,
            feedback: 'Incorrecto. Si bien el desahucio es una facultad general patronal, el legislador dominicano estableció una excepción absoluta de orden público en favor de la maternidad (Art. 232 CT).',
          },
          {
            id: 'opt-1c',
            text: 'El único error del empleador fue no pagar la liquidación el mismo día de la carta.',
            isCorrect: false,
            feedback: 'Incorrecto. El vicio radica en la nulidad sustantiva del desahucio mismo, no meramente en el plazo de pago.',
          },
        ],
        pedagogicalTip: 'Recuerda: Los derechos de la maternidad están protegidos tanto por el Art. 55 de la Constitución como por el Título II del Libro IV del Código de Trabajo.',
      },
      {
        stepNumber: 2,
        stepTitle: '2. Norma Jurídica Aplicable y Sanción Especial',
        prompt: '¿Qué norma y sanción legal indemnizatoria corresponde aplicar a la empresa demandada?',
        options: [
          {
            id: 'opt-2a',
            text: 'Artículo 233 del Código de Trabajo: Pago de cesantía, preaviso y una indemnización adicional equivalente a cinco (5) meses de salario ordinario.',
            isCorrect: true,
            feedback: '¡Exacto! El Art. 233 CT estipula expresamente que el empleador que viole la prohibición del Art. 232 pagará a la trabajadora, además de las prestaciones de desahucio, una suma equivalente a 5 meses de salario ordinario.',
          },
          {
            id: 'opt-2b',
            text: 'Sólo el salario de Navidad proporcional del Art. 219 CT.',
            isCorrect: false,
            feedback: 'Incorrecto. El salario de Navidad es un derecho adquirido corriente, no la indemnización por violación al fuero maternal.',
          },
          {
            id: 'opt-2c',
            text: 'Aplicación de la Ley 87-01 de Seguridad Social sin sanciones laborales.',
            isCorrect: false,
            feedback: 'Incorrecto. La Seguridad Social cubre los subsidios de maternidad, pero la indemnización sancionatoria contra el empleador es de sede laboral estricta (Art. 233 CT).',
          },
        ],
        pedagogicalTip: 'La indemnización de 5 meses del Art. 233 CT es acumulativa con el auxilio de cesantía y el preaviso ordinarios.',
      },
      {
        stepNumber: 3,
        stepTitle: '3. Tribunal Competente y Acción Idónea',
        prompt: '¿Ante qué tribunal debe interponerse la demanda y qué acción procesal debe incoarse?',
        options: [
          {
            id: 'opt-3a',
            text: 'Juzgado de Trabajo de la jurisdicción donde se prestaban los servicios, mediante Demanda Laboral en Reclamación de Prestaciones e Indemnización Especial por Maternidad.',
            isCorrect: true,
            feedback: '¡Correcto! Los Juzgados de Trabajo tienen competencia de atribución exclusiva en virtud del Art. 480 del Código de Trabajo.',
          },
          {
            id: 'opt-3b',
            text: 'Juzgado de Paz Ordinario en atribuciones civiles.',
            isCorrect: false,
            feedback: 'Incorrecto. Los Juzgados de Paz carecen de competencia para conocer de demandas de prestaciones laborales de empleados privados.',
          },
          {
            id: 'opt-3c',
            text: 'Tribunal Superior Administrativo (TSA).',
            isCorrect: false,
            feedback: 'Incorrecto. El TSA solo conoce de conflictos de servidores públicos regidos por la Ley 41-08 de Función Pública, no de empleados del sector privado.',
          },
        ],
        pedagogicalTip: 'La competencia territorial se rige por el lugar donde se ejecuta la labor subordinada o el domicilio de la empresa demandada (Art. 482 CT).',
      },
      {
        stepNumber: 4,
        stepTitle: '4. Pruebas Cardinales a Aportar',
        prompt: '¿Cuáles son las piezas probatorias indispensables para garantizar el fallo favorable?',
        options: [
          {
            id: 'opt-4a',
            text: 'Copia recibida de la notificación de embarazo entregada al empleador + Certificado médico de gestación + Carta patronal de desahucio + Récord de TSS.',
            isCorrect: true,
            feedback: '¡Brillante! Esta combinación demuestra: 1) Conocimiento fehaciente previo del empleador sobre el embarazo; 2) Ejercicio del desahucio en violación al fuero; y 3) Antigüedad y salario devengado.',
          },
          {
            id: 'opt-4b',
            text: 'Únicamente dos testigos que afirmen que la vieron en el pasillo de la empresa.',
            isCorrect: false,
            feedback: 'Insuficiente. La prueba documental del aviso previo de embarazo es cardinal según la jurisprudencia de la Suprema Corte de Justicia.',
          },
        ],
        pedagogicalTip: 'La SCJ ha sentado jurisprudencia en el sentido de que el empleador debe tener conocimiento formal del embarazo antes de ejercer el desahucio para que proceda la penalidad de los 5 meses.',
      },
    ],
    finalLegalVerdictSummary: 'La trabajadora tiene derecho al cobro íntegro de su Auxilio de Cesantía (Art. 80 CT), Preaviso (Art. 76 CT), la indemnización especial de Cinco (5) Meses de Salario Ordinario (Art. 233 CT), más la sanción moratoria del Art. 86 CT si el empleador no obla el pago dentro de los 10 días de la terminación.',
    normativeBasis: [
      'Constitución de la República Dominicana, Art. 55.',
      'Código de Trabajo (Ley 16-92), Arts. 76, 80, 86, 231, 232, 233, 480.',
      'SCJ, 3ra Sala, Sent. No. SCJ-TS-2022-0450.',
    ],
  },
];

export async function getAllCaseLabScenarios(): Promise<HypotheticalCaseItem[]> {
  return DOMINICAN_CASE_LAB_SCENARIOS;
}

export async function getCaseLabScenarioBySlug(slug: string): Promise<HypotheticalCaseItem | null> {
  return DOMINICAN_CASE_LAB_SCENARIOS.find((c) => c.slug === slug) || null;
}
