// Generador de Modelos y Borradores Jurídicos de la República Dominicana

export interface DocumentFieldDef {
  key: string;
  label: string;
  type: 'text' | 'textarea' | 'date' | 'number' | 'select';
  placeholder?: string;
  defaultValue?: string;
  options?: string[];
  required: boolean;
  helpText?: string;
}

export interface LegalDocumentTemplate {
  id: string;
  slug: string;
  title: string;
  category: 'CONTRATOS' | 'DEMANDAS' | 'INSTANCIAS' | 'MINISTERIALES' | 'LABORAL';
  specialtySlug: string;
  specialtyName: string;
  description: string;
  legalBasis: string;
  fields: DocumentFieldDef[];
  templateGenerator: (values: Record<string, string>) => string;
}

export const DOMINICAN_DOCUMENT_TEMPLATES: LegalDocumentTemplate[] = [
  // 1. Contrato de Alquiler de Vivienda
  {
    id: 'doc-alquiler-vivienda',
    slug: 'contrato-alquiler-vivienda',
    title: 'Contrato de Arrendamiento para Vivienda Familiar',
    category: 'CONTRATOS',
    specialtySlug: 'derecho-civil',
    specialtyName: 'Derecho Civil / Inmobiliario',
    description: 'Modelo formal ajustado a la legislación dominicana (Código Civil, Ley 4314 sobre Depósitos en el Banco Agrícola y Decreto 4807 sobre Alquileres).',
    legalBasis: 'Arts. 1708 y ss. del Código Civil Dominicano y Ley No. 4314 de 1955',
    fields: [
      { key: 'propietarioNombre', label: 'Nombre Completo del Propietario / Arrendador', type: 'text', placeholder: 'Ej. Juan Pérez Medina', required: true },
      { key: 'propietarioCedula', label: 'Cédula de Identidad del Propietario', type: 'text', placeholder: '001-0000000-0', required: true },
      { key: 'inquilinoNombre', label: 'Nombre Completo del Inquilino / Arrendatario', type: 'text', placeholder: 'Ej. María Rodríguez Santos', required: true },
      { key: 'inquilinoCedula', label: 'Cédula de Identidad del Inquilino', type: 'text', placeholder: '402-0000000-0', required: true },
      { key: 'fiadorNombre', label: 'Nombre del Garante / Fiador Solidario', type: 'text', placeholder: 'Ej. Carlos Sánchez Gómez', required: true },
      { key: 'fiadorCedula', label: 'Cédula de Identidad del Garante', type: 'text', placeholder: '001-1111111-1', required: true },
      { key: 'inmuebleDireccion', label: 'Dirección Exacta del Inmueble Alquilado', type: 'textarea', placeholder: 'Apartamento 3-B, Residencial Las Praderas, Calle Central No. 12, Santo Domingo, D.N.', required: true },
      { key: 'montoMensual', label: 'Precio de Alquiler Mensual (RD$)', type: 'number', placeholder: '25000', required: true },
      { key: 'depositoMeses', label: 'Número de Meses de Depósito en Garantía', type: 'number', placeholder: '2', required: true },
      { key: 'duracionContrato', label: 'Vigencia del Contrato', type: 'select', options: ['Un (1) año renovable', 'Dos (2) años renovables', 'Seis (6) meses'], required: true },
      { key: 'fechaFirma', label: 'Fecha de Suscripción', type: 'date', required: true },
      { key: 'ciudadFirma', label: 'Ciudad o Municipio de Firma', type: 'text', defaultValue: 'Santo Domingo, Distrito Nacional', required: true },
    ],
    templateGenerator: (v) => `CONTRATO DE ALQUILER DE VIVIENDA FAMILIAR

ENTRE:

De una parte, ${v.propietarioNombre || '[NOMBRE DEL PROPIETARIO]'}, dominicano(a), mayor de edad, titular de la Cédula de Identidad y Electoral No. ${v.propietarioCedula || '[CÉDULA]'}, quien en lo que sigue del presente contrato se denominará EL PROPIETARIO o ARRENDADOR;

De la segunda parte, ${v.inquilinoNombre || '[NOMBRE DEL INQUILINO]'}, dominicano(a), mayor de edad, titular de la Cédula de Identidad y Electoral No. ${v.inquilinoCedula || '[CÉDULA]'}, quien en lo sucesivo se denominará EL INQUILINO o ARRENDATARIO;

Y de la tercera parte, ${v.fiadorNombre || '[NOMBRE DEL FIADOR]'}, dominicano(a), mayor de edad, titular de la Cédula de Identidad y Electoral No. ${v.fiadorCedula || '[CÉDULA]'}, quien interviene como FIADOR SOLIDARIO Y MANCOMUNADO;

SE HA CONVENIDO Y PACTADO LO SIGUIENTE:

PRIMERO: EL PROPIETARIO cede en calidad de arrendamiento a favor de EL INQUILINO, quien acepta conforme, el siguiente inmueble: ${v.inmuebleDireccion || '[DIRECCIÓN DEL INMUEBLE]'}, destinado única y exclusivamente para vivienda familiar del INQUILINO y sus dependientes directos.

SEGUNDO: El precio convenido por concepto de arrendamiento mensual es de RD$ ${Number(v.montoMensual || 0).toLocaleString()} PESOS DOMINICANOS CON 00/100, pagaderos por adelantado dentro de los primeros cinco (5) días de cada mes calendario en la cuenta bancaria designada por EL PROPIETARIO.

TERCERO: El presente contrato tendrá una duración de ${v.duracionContrato || 'Un (1) año renovable'}, iniciando en fecha ${v.fechaFirma || '[FECHA]'}, renovable únicamente por acuerdo expreso y escrito entre las partes.

CUARTO: EL INQUILINO entrega en este acto a EL PROPIETARIO la suma correspondiente a ${v.depositoMeses || '2'} meses de depósito en concepto de garantía para responder de posibles deterioros físicos en el inmueble al término del contrato, cuyo fondo será depositado en el Banco Agrícola de la República Dominicana en estricto cumplimiento de la Ley No. 4314 de 1955.

QUINTO: EL FIADOR SOLIDARIO se compromete formalmente frente a EL PROPIETARIO a responder solidariamente de todas las obligaciones dimanantes del presente contrato, renunciando expresamente a los beneficios de orden y excusión.

SEXTO: Para lo no previsto en el presente contrato, las partes se remiten al derecho común dominicano, en especial al Código Civil y al Decreto 4807 de 1959.

Hecho y firmado de buena fe en dos (2) originales de un mismo tenor y efecto en la ciudad de ${v.ciudadFirma || 'Santo Domingo'}, República Dominicana, a los días del mes correspondiente del año de suscripción.


_______________________________          _______________________________
EL PROPIETARIO / ARRENDADOR               EL INQUILINO / ARRENDATARIO


_______________________________
EL FIADOR SOLIDARIO


LEGALIZACIÓN NOTARIAL DE FIRMAS
Yo, Notario Público de los del Número del Distrito Nacional, CERTIFICO que las firmas que anteceden fueron puestas libre y voluntariamente en mi presencia por los señores comparecientes, a quienes he identificado. Doy fe.`,
  },

  // 2. Demanda Laboral por Despido Injustificado
  {
    id: 'doc-demanda-laboral',
    slug: 'demanda-laboral-despido-prestaciones',
    title: 'Demanda Laboral en Cobro de Prestaciones por Despido Injustificado',
    category: 'DEMANDAS',
    specialtySlug: 'derecho-laboral',
    specialtyName: 'Derecho Laboral',
    description: 'Instancia formal de demanda ante el Juzgado de Trabajo apoderando al tribunal por despido injustificado (Art. 87 y 95 CT) y reclamando cesantía, preaviso y salarios caídos.',
    legalBasis: 'Arts. 87, 95, 486 y ss. del Código de Trabajo (Ley 16-92)',
    fields: [
      { key: 'demandanteNombre', label: 'Nombre del Trabajador Demandante', type: 'text', placeholder: 'Ej. Pedro Manuel Batista', required: true },
      { key: 'demandanteCedula', label: 'Cédula del Trabajador', type: 'text', placeholder: '001-0000000-0', required: true },
      { key: 'abogadoNombre', label: 'Nombre del Abogado Apoderado', type: 'text', placeholder: 'Lic. José Gabriel Peña', required: true },
      { key: 'abogadoMatricula', label: 'Matrícula del Colegio de Abogados (CARD)', type: 'text', placeholder: 'Mat. No. 45281-2015', required: true },
      { key: 'demandadaNombre', label: 'Nombre de la Empresa Empleadora Demandada', type: 'text', placeholder: 'Ej. Constructora del Caribe, S.R.L.', required: true },
      { key: 'demandadaRNC', label: 'RNC de la Empresa Demandada', type: 'text', placeholder: '1-31-00000-0', required: true },
      { key: 'cargoTrabajador', label: 'Puesto o Cargo que Desempeñaba', type: 'text', placeholder: 'Supervisor de Mantenimiento', required: true },
      { key: 'fechaIngreso', label: 'Fecha de Inicio de Labores', type: 'date', required: true },
      { key: 'fechaDespido', label: 'Fecha en que fue Despedido', type: 'date', required: true },
      { key: 'salarioMensual', label: 'Último Salario Mensual Devengado (RD$)', type: 'number', placeholder: '45000', required: true },
      { key: 'tribunalCompetente', label: 'Juzgado de Trabajo Competente', type: 'text', defaultValue: 'Presidencia de los Juzgados de Trabajo del Distrito Nacional', required: true },
    ],
    templateGenerator: (v) => `AL: HONORABLE JUEZ PRESIDENTE DE LOS JUZGADOS DE TRABAJO DE:
${v.tribunalCompetente || 'DEL DISTRITO NACIONAL'}

ASUNTO: DEMANDA LABORAL EN COBRO DE PRESTACIONES LABORALES, DAÑOS Y PERJUICIOS Y SALARIOS VENCIDOS POR DESPIDO INJUSTIFICADO.

DEMANDANTE: ${v.demandanteNombre || '[NOMBRE DEL TRABAJADOR]'}, titular de la Cédula No. ${v.demandanteCedula || '[CÉDULA]'}, con domicilio ad hoc en el estudio profesional de su abogado apoderado, ${v.abogadoNombre || '[ABOGADO]'}, matriculado en el Colegio de Abogados bajo el No. ${v.abogadoMatricula || '[CARD]'};

DEMANDADA: La entidad comercial ${v.demandadaNombre || '[EMPRESA DEMANDADA]'}, entidad organizada conforme a las leyes dominicanas, con RNC No. ${v.demandadaRNC || '[RNC]'};

HONORABLE MAGISTRADO:

El demandante, por mediación de su abogado constituido, tiene a bien exponer los siguientes hechos y motivos de derecho:

I. RELACIÓN FÁCTICA:
1. En fecha ${v.fechaIngreso || '[FECHA INGRESO]'}, el demandante inició una relación laboral subordinada por tiempo indefinido con la empresa demandada, desempeñando las funciones de ${v.cargoTrabajador || '[CARGO]'}, devengando como última retribución ordinaria la suma de RD$ ${Number(v.salarioMensual || 0).toLocaleString()} mensuales.
2. Es el caso que en fecha ${v.fechaDespido || '[FECHA DESPIDO]'}, la empresa demandada procedió a desvincular de forma unilateral e intempestiva al trabajador, sin haber notificado justa causa al Ministerio de Trabajo conforme al Art. 91 del Código de Trabajo, configurándose un DESPIDO INJUSTIFICADO Y ABUSIVO al tenor del Art. 95 de la Ley 16-92.

II. FUNDAMENTOS DE DERECHO:
- Art. 1 del Código de Trabajo: Existencia incontrovertible de relación laboral subordinada.
- Art. 87 y 95 del Código de Trabajo: La falta de justa causa comprobada en juicio obliga al empleador a pagar el auxilio de cesantía, preaviso y hasta seis (6) meses de salarios caídos a título de daños y perjuicios.
- Art. 86 del Código de Trabajo: Recargo legal de un día de salario por cada día de retardo a partir del décimo día de vencimiento.

POR TALES MOTIVOS, el demandante solicita formalmente:

PRIMERO: DECLARAR buena y válida la presente demanda laboral por haber sido interpuesta en tiempo oportuno y conforme al procedimiento.
SEGUNDO: En cuanto al fondo, DECLARAR INJUSTIFICADO el despido operado contra el señor ${v.demandanteNombre || '[TRABAJADOR]'}.
TERCERO: CONDENAR a la empresa ${v.demandadaNombre || '[EMPRESA]'} al pago íntegro a favor del demandante de:
  a) Auxilio de Cesantía (Art. 80 CT).
  b) Preaviso (Art. 76 CT).
  c) Salarios caídos por despido injustificado (Art. 95 CT).
  d) Proporción correspondiente de Vacaciones y Salario de Navidad (Art. 177 y 219 CT).
  e) Sanción moratoria del Art. 86 CT de un día de salario por cada día de retardo.
CUARTO: CONDENAR a la demandada al pago de las costas procesales con distracción a favor del abogado suscrito.

BAJO TODAS LAS RESERVAS DE LEY.
En la ciudad de Santo Domingo, Distrito Nacional, a la fecha del depósito formal.

________________________________________
${v.abogadoNombre || 'ABOGADO APODERADO'}
Matrícula CARD No. ${v.abogadoMatricula || '00000'}`,
  },

  // 3. Acto de Intimación de Pago y Puesta en Mora
  {
    id: 'doc-acto-mora-alguacil',
    slug: 'acto-intimacion-pago-alguacil',
    title: 'Acto de Intimación de Pago y Puesta en Mora (Alguacil)',
    category: 'MINISTERIALES',
    specialtySlug: 'derecho-procesal-civil',
    specialtyName: 'Derecho Procesal Civil',
    description: 'Acto de ministerial con intimación formal de pago en un plazo determinado bajo advertencia expresa de acciones judiciales y embargos ejecutorios.',
    legalBasis: 'Arts. 1139 y 1146 del Código Civil Dominicano y Ley 834 de 1978',
    fields: [
      { key: 'alguacilNombre', label: 'Nombre del Ministerial (Alguacil)', type: 'text', placeholder: 'Alguacil Ordinario de la Cámara Civil', required: true },
      { key: 'requirienteNombre', label: 'Nombre del Acreedor Requiriente', type: 'text', required: true },
      { key: 'requirienteCedula', label: 'Cédula o RNC del Acreedor', type: 'text', required: true },
      { key: 'deudorNombre', label: 'Nombre del Deudor Requerido', type: 'text', required: true },
      { key: 'deudorDireccion', label: 'Dirección donde se Notifica al Deudor', type: 'textarea', required: true },
      { key: 'montoAdeudado', label: 'Suma Adeudada (RD$)', type: 'number', required: true },
      { key: 'conceptoDeuda', label: 'Causa o Concepto de la Deuda', type: 'textarea', placeholder: 'Facturas comerciales impagadas y pagaré notarial vencido...', required: true },
      { key: 'plazoDias', label: 'Plazo Concedido para el Pago (Días)', type: 'number', defaultValue: '3', required: true },
    ],
    templateGenerator: (v) => `ACTO NÚMERO: ______________ / 2026.
EN LA CIUDAD DE SANTO DOMINGO, REPÚBLICA DOMINICANA.

A REQUERIMIENTO de: ${v.requirienteNombre || '[ACREEDOR]'}, titular de la Cédula/RNC No. ${v.requirienteCedula || '[IDENTIFICACIÓN]'}, quien tiene como abogado constituido al Licenciado debidamente apoderado con estudio profesional abierto;

YO, ${v.alguacilNombre || '[ALGUACIL]'}, Alguacil debidamente juramentado en ejercicio ministerial;

EXPRESAMENTE y en virtud del requerimiento que antecede, ME HE TRASLADADO dentro de mi jurisdicción a: ${v.deudorDireccion || '[DIRECCIÓN DEL DEUDOR]'}, y una vez allí, hablando personalmente con ___________________________ quien me declaró ser _________________ del requerido;

LE HE NOTIFICADO formalmente a: ${v.deudorNombre || '[NOMBRE DEL DEUDOR]'} lo siguiente:

QUE por medio del presente acto, MI REQUIRIENTE le INTIMA Y PONE EN MORA FORMAL para que dentro del plazo improrrogable de ${v.plazoDias || '3'} días francos contados a partir de la presente notificación, proceda a oblar y pagar en manos de mi requiriente la suma de:

RD$ ${Number(v.montoAdeudado || 0).toLocaleString()} PESOS DOMINICANOS CON 00/100,

Por concepto de: ${v.conceptoDeuda || '[CONCEPTO DE LA DEUDA]'}.

BAJO LA MÁS EXPRESA ADVERTENCIA de que si transcurrido dicho plazo no obtempera a efectuar el pago íntegro, mi requiriente procederá de inmediato y sin ulterior aviso al apoderamiento de las vías de ejecución forzosa correspondientes (incluyendo embargo ejecutivo, embargo inmobiliario o demanda judicial con reclamación de daños y perjuicios moratorios e intereses de ley).

Y a fin de que mi requerido no alegue ignorancia, así se lo he notificado, dejándole copia fiel y conforme del presente acto que consta de dos fojas escritas a máquina.

COSTO DEL ACTO: RD$ _____________________.


___________________________________________
EL ALGUACIL MINISTERIAL`,
  },
];

export async function getAllDocumentTemplates(): Promise<LegalDocumentTemplate[]> {
  return DOMINICAN_DOCUMENT_TEMPLATES;
}

export async function getDocumentTemplateBySlug(slug: string): Promise<LegalDocumentTemplate | null> {
  return DOMINICAN_DOCUMENT_TEMPLATES.find((t) => t.slug === slug) || null;
}
