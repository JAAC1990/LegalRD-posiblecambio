// Motor de Cómputo de Plazos Procesales de la República Dominicana

export type DeadlineType = 'HABIL' | 'CALENDARIO' | 'FRANCO' | 'MESES_FECHA_A_FECHA';

export interface DeadlineCatalogItem {
  id: string;
  code: string;
  name: string;
  specialtySlug: string;
  specialtyName: string;
  matter: string;
  calculationType: DeadlineType;
  defaultDays?: number;
  defaultMonths?: number;
  legalBasis: string;
  gacetaRef?: string;
  triggerEvent: string;
  description: string;
  criticalWarnings: string[];
  applicableRules: string[];
  remedyAction: string;
}

export interface DeadlineCalculationResult {
  catalogItem: DeadlineCatalogItem;
  startDate: string;
  calculatedDueDate: string;
  totalDaysAdded: number;
  calculationTypeDescription: string;
  isExpired: boolean;
  daysRemaining: number;
  warnings: string[];
  legalFormula: string;
}

export const DOMINICAN_DEADLINE_CATALOG: DeadlineCatalogItem[] = [
  // 1. Materia Laboral
  {
    id: 'plazo-lab-1',
    code: 'LAB-PAGO-PRESTACIONES',
    name: 'Plazo para Pago de Prestaciones Laborales (Cesantía y Preaviso)',
    specialtySlug: 'derecho-laboral',
    specialtyName: 'Derecho Laboral',
    matter: 'Terminación del Contrato de Trabajo',
    calculationType: 'CALENDARIO',
    defaultDays: 10,
    legalBasis: 'Artículo 86 del Código de Trabajo (Ley 16-92)',
    triggerEvent: 'Fecha en que se hace efectiva la terminación del contrato de trabajo por desahucio.',
    description: 'El empleador dispone de diez (10) días continuos a contar de la terminación para pagar la totalidad del auxilio de cesantía y la compensación de preaviso.',
    criticalWarnings: [
      'Si el empleador no paga dentro de los 10 días, incurre de pleno derecho en la penalidad de un día de salario ordinario por cada día de retardo.',
      'El plazo corre a partir del día siguiente a la efectividad de la terminación del contrato.',
    ],
    applicableRules: [
      'Cómputo en días continuos/calendarios sin exclusión de fines de semana ni festivos.',
      'La consignación en la Colecturía de Rentas Internas detiene el curso del Art. 86 si se realiza dentro del plazo.',
    ],
    remedyAction: 'Demanda laboral por cobro de prestaciones e indemnización por retardo (Art. 86 CT) ante el Juzgado de Trabajo.',
  },
  {
    id: 'plazo-lab-2',
    code: 'LAB-PRESCRIPCION-PRESTACIONES',
    name: 'Prescripción de la Acción en Reclamación de Prestaciones Laborales',
    specialtySlug: 'derecho-laboral',
    specialtyName: 'Derecho Laboral',
    matter: 'Prescripción Extintiva Laboral',
    calculationType: 'MESES_FECHA_A_FECHA',
    defaultMonths: 1,
    legalBasis: 'Artículo 701 del Código de Trabajo (Ley 16-92)',
    triggerEvent: 'Fecha de terminación del contrato o vencimiento del período de preaviso.',
    description: 'Las acciones originadas en el desahucio, dimisión o despido prescriben en el término de un (1) mes contado de fecha a fecha.',
    criticalWarnings: [
      'Plazo perentorio fatal: Si no se apodera al tribunal o no se interrumpe mediante citación formal o queja ante el Ministerio de Trabajo, la acción se extingue definitivamente.',
      'Se cuenta de fecha a fecha (ej. de 15 de marzo a 15 de abril).',
    ],
    applicableRules: [
      'La reclamación por ante la Representación Local del Trabajo interrumpe el plazo de prescripción (Art. 704 CT).',
    ],
    remedyAction: 'Interposición de demanda ante el Juzgado de Trabajo o formalización de queja ante el Ministerio de Trabajo.',
  },

  // 2. Materia Procesal Civil
  {
    id: 'plazo-civ-1',
    code: 'CIV-OCTAVA-FRANCA',
    name: 'Plazo de la Octava Franca de Ley (Emplazamiento Ordinario)',
    specialtySlug: 'derecho-procesal-civil',
    specialtyName: 'Derecho Procesal Civil',
    matter: 'Demandas en Primera Instancia',
    calculationType: 'FRANCO',
    defaultDays: 8,
    legalBasis: 'Artículo 61 y 1033 del Código de Procedimiento Civil de la República Dominicana',
    triggerEvent: 'Fecha en que el ministerial (alguacil) notifica el acto de emplazamiento.',
    description: 'Plazo legal para que la parte demandada constituya abogado e instrumente sus defensas procesales ante la Cámara Civil y Comercial.',
    criticalWarnings: [
      'Es un plazo estrictamente franco: No se cuenta el día de la notificación (dies a quo) ni el día del vencimiento (dies ad quem).',
      'Si el último día del cómputo vence en sábado, domingo o día feriado, se prorroga de pleno derecho hasta el siguiente día hábil.',
      'Si el demandado reside a más de 30 km del tribunal, aplican los plazos por razón de la distancia (Art. 1033 CPC).',
    ],
    applicableRules: [
      'Regla del plazo franco: 8 días netos libres entre la notificación y la exigibilidad.',
      'Aumento por la distancia: 1 día adicional por cada 30 kilómetros de distancia.',
    ],
    remedyAction: 'Constitución de abogado mediante acto de notificación de ministerial y depósito de escrito de defensa.',
  },
  {
    id: 'plazo-civ-2',
    code: 'CIV-RECURSO-CASACION',
    name: 'Plazo para el Recurso de Casación (Ley 2-23)',
    specialtySlug: 'derecho-procesal-civil',
    specialtyName: 'Derecho Procesal Civil',
    matter: 'Recurso Extraordinario ante la Suprema Corte de Justicia',
    calculationType: 'HABIL',
    defaultDays: 20,
    legalBasis: 'Artículo 10 de la Ley No. 2-23 sobre el Recurso de Casación (G.O. 11094)',
    triggerEvent: 'Fecha de la notificación de la sentencia recurrida dictada en última instancia.',
    description: 'Plazo perentorio para interponer el recurso de casación ante las Salas de la Suprema Corte de Justicia bajo la nueva Ley 2-23.',
    criticalWarnings: [
      'CAMBIO HISTÓRICO: La Ley 2-23 redujo el antiguo plazo de 30 días de la Ley 3726 a veinte (20) días hábiles.',
      'No se computan sábados, domingos ni días feriados oficiales en la República Dominicana.',
      'El memorial de casación debe depositarse con copia digital en la plataforma del Poder Judicial.',
    ],
    applicableRules: [
      'Días hábiles judiciales de acuerdo con el calendario oficial del Consejo del Poder Judicial.',
      'Depósito conjunto del memorial y constancia de notificación si procede.',
    ],
    remedyAction: 'Depósito del memorial de casación firmado por abogado legalmente habilitado ante la Secretaría General de la SCJ.',
  },

  // 3. Materia Procesal Penal
  {
    id: 'plazo-pen-1',
    code: 'PEN-REVISION-MEDIDAS-COERCION',
    name: 'Revisión Obligatoria de la Prisión Preventiva (Art. 239 CPP)',
    specialtySlug: 'derecho-procesal-penal',
    specialtyName: 'Derecho Procesal Penal',
    matter: 'Garantías Procesales de la Libertad',
    calculationType: 'MESES_FECHA_A_FECHA',
    defaultMonths: 3,
    legalBasis: 'Artículo 239 del Código Procesal Penal (Ley 76-02 modificado por Ley 10-15)',
    triggerEvent: 'Fecha de la resolución judicial que impuso o ratificó la medida de coerción privativa de libertad.',
    description: 'El juez de la instrucción tiene la obligación de examinar oficiosamente cada tres (3) meses la procedencia de mantener o cesar la prisión preventiva.',
    criticalWarnings: [
      'El juez debe fijar audiencia de oficio sin necesidad de solicitud previa de la defensa.',
      'Si el tribunal omite fijar la revisión, la defensa puede solicitar la revisión a instancia de parte en cualquier momento.',
    ],
    applicableRules: [
      'Revisión oficiosa y contradictoria con presencia obligatoria del Ministerio Público y el imputado con su defensor.',
    ],
    remedyAction: 'Interposición de solicitud urgente de revisión de medida de coerción ante el Juez de la Instrucción apoderado.',
  },

  // 4. Materia Constitucional
  {
    id: 'plazo-const-1',
    code: 'CONST-ACCION-AMPARO',
    name: 'Plazo para la Interposición de la Acción de Amparo',
    specialtySlug: 'derecho-constitucional',
    specialtyName: 'Derecho Constitucional',
    matter: 'Protección de Derechos Fundamentales',
    calculationType: 'CALENDARIO',
    defaultDays: 30,
    legalBasis: 'Artículo 70 de la Ley No. 137-11 Orgánica del Tribunal Constitucional',
    triggerEvent: 'Fecha en que el afectado conoció o debió conocer el acto u omisión lesivo del derecho fundamental.',
    description: 'La acción de amparo debe ser incoada dentro de los treinta (30) días continuos contados a partir del hecho vulnerador.',
    criticalWarnings: [
      'Caducidad de orden público: Si transcurren más de 30 días continuos, la acción resulta inadmisible por extemporánea.',
      'Excepción: No prescribe si se trata de una vulneración continua en el tiempo (ej. detención ilegal o falta de suministro continuo de medicamentos vitales).',
    ],
    applicableRules: [
      'Días continuos sin importar sábados ni domingos salvo que el último día sea inhábil.',
    ],
    remedyAction: 'Depósito de instancia de amparo ante el Juez de Primera Instancia afín a la materia vulnerada.',
  },

  // 5. Materia Inmobiliaria
  {
    id: 'plazo-inmob-1',
    code: 'INMOB-RECURSO-RECONSIDERACION',
    name: 'Recurso Jerárquico / Reconsideración Registral',
    specialtySlug: 'derecho-inmobiliario',
    specialtyName: 'Derecho Inmobiliario',
    matter: 'Actuaciones ante el Registro de Títulos y Mensuras Catastrales',
    calculationType: 'HABIL',
    defaultDays: 15,
    legalBasis: 'Artículo 76 y 77 de la Ley No. 108-05 de Registro Inmobiliario',
    triggerEvent: 'Fecha de notificación del rechazo o calificación registral adversa.',
    description: 'Plazo para recurrir en reconsideración ante el Registrador de Títulos o Director de Mensuras que emitió la resolución denegatoria.',
    criticalWarnings: [
      'Si no se ejerce en 15 días hábiles, la calificación registral adquiere la autoridad de cosa irrevocablemente resuelta en sede administrativa.',
    ],
    applicableRules: [
      'Cómputo en días hábiles conforme al horario de servicio de la Jurisdicción Inmobiliaria.',
    ],
    remedyAction: 'Depósito de escrito fundamentado de reconsideración en la recepción de la oficina registral correspondiente.',
  },
];

// Función de cómputo de plazos procesales
export function computeDominicanDeadline(
  catalogId: string,
  startDateInput: string // formato YYYY-MM-DD
): DeadlineCalculationResult | null {
  const item = DOMINICAN_DEADLINE_CATALOG.find((d) => d.id === catalogId);
  if (!item) return null;

  const start = new Date(startDateInput + 'T00:00:00');
  if (isNaN(start.getTime())) return null;

  let current = new Date(start);
  let totalDaysAdded = 0;
  let formula = '';

  if (item.calculationType === 'CALENDARIO') {
    const days = item.defaultDays || 0;
    current.setDate(current.getDate() + days);
    totalDaysAdded = days;
    formula = `Fecha de inicio (${startDateInput}) + ${days} días continuos corridos (incluye fines de semana).`;
  } else if (item.calculationType === 'HABIL') {
    const days = item.defaultDays || 0;
    let added = 0;
    formula = `Fecha de inicio (${startDateInput}) + ${days} días hábiles judiciales (excluyendo sábados y domingos).`;
    while (added < days) {
      current.setDate(current.getDate() + 1);
      const dayOfWeek = current.getDay();
      if (dayOfWeek !== 0 && dayOfWeek !== 6) {
        // Día hábil (lunes a viernes)
        added++;
      }
      totalDaysAdded++;
    }
  } else if (item.calculationType === 'FRANCO') {
    // Plazo franco: no se cuenta dies a quo (+1), luego los días francos netos, y no se cuenta el dies ad quem (+1)
    const days = item.defaultDays || 8;
    formula = `Plazo Franco: Dies a quo excluido (Día 0) + ${days} días netos + Dies ad quem excluido (+1). Total = ${days + 2} días base, prorrogable si vence en inhábil.`;
    // Añadimos days + 2
    current.setDate(current.getDate() + (days + 2));
    totalDaysAdded = days + 2;
    // Si vence en sábado (6) o domingo (0), prorroga al lunes
    if (current.getDay() === 6) {
      current.setDate(current.getDate() + 2);
      totalDaysAdded += 2;
      formula += ' [Vencimiento cayó en sábado -> Se prorroga de pleno derecho al lunes siguiente].';
    } else if (current.getDay() === 0) {
      current.setDate(current.getDate() + 1);
      totalDaysAdded += 1;
      formula += ' [Vencimiento cayó en domingo -> Se prorroga de pleno derecho al lunes siguiente].';
    }
  } else if (item.calculationType === 'MESES_FECHA_A_FECHA') {
    const months = item.defaultMonths || 1;
    current.setMonth(current.getMonth() + months);
    formula = `Cómputo de fecha a fecha legal (${months} mes/meses desde ${startDateInput}).`;
    // Diferencia en días aproximada
    totalDaysAdded = Math.round((current.getTime() - start.getTime()) / (1000 * 60 * 60 * 24));
  }

  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const diffTime = current.getTime() - today.getTime();
  const daysRemaining = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  const isExpired = daysRemaining < 0;

  const dueIso = current.toISOString().split('T')[0];

  return {
    catalogItem: item,
    startDate: startDateInput,
    calculatedDueDate: dueIso,
    totalDaysAdded,
    calculationTypeDescription:
      item.calculationType === 'FRANCO'
        ? 'Plazo Franco (Art. 1033 CPC: no computa día de notificación ni vencimiento)'
        : item.calculationType === 'HABIL'
        ? 'Días Hábiles Judiciales (excluye sábados, domingos y feriados judiciales)'
        : item.calculationType === 'MESES_FECHA_A_FECHA'
        ? 'Meses de Fecha a Fecha (cómputo civil ordinario)'
        : 'Días Calendarios Continuos',
    isExpired,
    daysRemaining,
    warnings: item.criticalWarnings,
    legalFormula: formula,
  };
}
