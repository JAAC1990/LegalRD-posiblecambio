// Nodos y Relaciones Transversales para el Grafo Jurídico Interactivo Dominicano

export type GraphNodeType = 'NORM' | 'ARTICLE' | 'CONCEPT' | 'CASE_LAW' | 'PROCEDURE' | 'DOCUMENT';

export interface GraphNode {
  id: string;
  label: string;
  nodeType: GraphNodeType;
  specialtySlug: string;
  specialtyName: string;
  details: string;
  url?: string;
  colorClass: string;
}

export interface GraphEdge {
  id: string;
  source: string;
  target: string;
  relationLabel: string;
  description?: string;
}

export interface LegalGraphDataset {
  nodes: GraphNode[];
  edges: GraphEdge[];
}

export const DOMINICAN_LEGAL_GRAPH: LegalGraphDataset = {
  nodes: [
    // 1. Nodo Central: Responsabilidad Civil
    {
      id: 'node-concept-resp-civil',
      label: 'Responsabilidad Civil Delictual',
      nodeType: 'CONCEPT',
      specialtySlug: 'derecho-civil',
      specialtyName: 'Derecho Civil',
      details: 'Institución rectora de la obligación de reparar el daño injustamente causado a otro.',
      url: '/conceptos/prescripcion',
      colorClass: 'bg-amber-500 text-white border-amber-600',
    },
    // 2. Artículos Fundamentales
    {
      id: 'node-art-1382',
      label: 'Art. 1382 Código Civil',
      nodeType: 'ARTICLE',
      specialtySlug: 'derecho-civil',
      specialtyName: 'Derecho Civil',
      details: 'Cualquier hecho del hombre que causa a otro un daño, obliga a aquel por cuya culpa sucedió a repararlo.',
      url: '/normas/codigo-civil-dominicano',
      colorClass: 'bg-emerald-600 text-white border-emerald-700',
    },
    {
      id: 'node-art-1384',
      label: 'Art. 1384 Código Civil',
      nodeType: 'ARTICLE',
      specialtySlug: 'derecho-civil',
      specialtyName: 'Derecho Civil',
      details: 'Responsabilidad por el hecho de las cosas inanimadas y de las personas que están bajo cuidado.',
      url: '/normas/codigo-civil-dominicano',
      colorClass: 'bg-emerald-600 text-white border-emerald-700',
    },
    // 3. Norma Madre
    {
      id: 'node-norm-codigo-civil',
      label: 'Código Civil Dominicano',
      nodeType: 'NORM',
      specialtySlug: 'derecho-civil',
      specialtyName: 'Derecho Civil',
      details: 'Cuerpo normativo matriz de las obligaciones patrimoniales y contratos en RD.',
      url: '/normas/codigo-civil-dominicano',
      colorClass: 'bg-indigo-600 text-white border-indigo-700',
    },
    // 4. Jurisprudencia SCJ
    {
      id: 'node-caselaw-scj-dano',
      label: 'SCJ-SC-2022-0941',
      nodeType: 'CASE_LAW',
      specialtySlug: 'derecho-civil',
      specialtyName: 'Derecho Civil',
      details: 'Sentencia de la Sala Civil SCJ: Criterios de determinación del daño moral y carga probatoria del nexo causal.',
      url: '/jurisprudencia',
      colorClass: 'bg-purple-600 text-white border-purple-700',
    },
    // 5. Procedimiento
    {
      id: 'node-proc-demanda-civil',
      label: 'Procedimiento de Demanda en Daños y Perjuicios',
      nodeType: 'PROCEDURE',
      specialtySlug: 'derecho-procesal-civil',
      specialtyName: 'Derecho Procesal Civil',
      details: 'Emplazamiento en la octava franca ante la Cámara Civil y Comercial de Primera Instancia.',
      url: '/procedimientos',
      colorClass: 'bg-rose-600 text-white border-rose-700',
    },
    // 6. Modelo Documental
    {
      id: 'node-doc-acto-mora',
      label: 'Acto de Intimación y Puesta en Mora',
      nodeType: 'DOCUMENT',
      specialtySlug: 'derecho-procesal-civil',
      specialtyName: 'Derecho Procesal Civil',
      details: 'Acto ministerial previo indispensable para constituir en mora al causante del daño.',
      url: '/generador-documentos',
      colorClass: 'bg-blue-600 text-white border-blue-700',
    },

    // 7. Nodo Laboral: Desahucio y Cesantía
    {
      id: 'node-concept-desahucio',
      label: 'El Desahucio Laboral',
      nodeType: 'CONCEPT',
      specialtySlug: 'derecho-laboral',
      specialtyName: 'Derecho Laboral',
      details: 'Ruptura unilateral incausada del contrato de trabajo por tiempo indefinido.',
      url: '/conceptos/desahucio',
      colorClass: 'bg-amber-500 text-white border-amber-600',
    },
    {
      id: 'node-art-80-ct',
      label: 'Art. 80 Código de Trabajo',
      nodeType: 'ARTICLE',
      specialtySlug: 'derecho-laboral',
      specialtyName: 'Derecho Laboral',
      details: 'Escala legal tarifada del auxilio de cesantía según la antigüedad del trabajador.',
      url: '/normas/codigo-de-trabajo-ley-16-92/articulo/80',
      colorClass: 'bg-emerald-600 text-white border-emerald-700',
    },
    {
      id: 'node-art-86-ct',
      label: 'Art. 86 Código de Trabajo',
      nodeType: 'ARTICLE',
      specialtySlug: 'derecho-laboral',
      specialtyName: 'Derecho Laboral',
      details: 'Penalidad de un día de salario por cada día de retardo tras 10 días de vencimiento.',
      url: '/normas/codigo-de-trabajo-ley-16-92/articulo/86',
      colorClass: 'bg-emerald-600 text-white border-emerald-700',
    },
    {
      id: 'node-norm-codigo-trabajo',
      label: 'Código de Trabajo (Ley 16-92)',
      nodeType: 'NORM',
      specialtySlug: 'derecho-laboral',
      specialtyName: 'Derecho Laboral',
      details: '738 Artículos que regulan la relación empleador-trabajador en República Dominicana.',
      url: '/normas/codigo-de-trabajo-ley-16-92',
      colorClass: 'bg-indigo-600 text-white border-indigo-700',
    },
    {
      id: 'node-caselaw-scj-laboral',
      label: 'SCJ-TS-2023-1120',
      nodeType: 'CASE_LAW',
      specialtySlug: 'derecho-laboral',
      specialtyName: 'Derecho Laboral',
      details: 'Sentencia SCJ Tercera Sala: Incondicionalidad del auxilio de cesantía ante el ejercicio del desahucio patronal.',
      url: '/jurisprudencia',
      colorClass: 'bg-purple-600 text-white border-purple-700',
    },
    {
      id: 'node-proc-demanda-laboral',
      label: 'Demanda Laboral por Prestaciones',
      nodeType: 'PROCEDURE',
      specialtySlug: 'derecho-laboral',
      specialtyName: 'Derecho Laboral',
      details: 'Conciliación preliminar obligatoria y juicio de fondo ante el Juzgado de Trabajo.',
      url: '/procedimientos',
      colorClass: 'bg-rose-600 text-white border-rose-700',
    },
    {
      id: 'node-doc-demanda-prestaciones',
      label: 'Borrador de Demanda Laboral',
      nodeType: 'DOCUMENT',
      specialtySlug: 'derecho-laboral',
      specialtyName: 'Derecho Laboral',
      details: 'Instancia motivada de reclamación con liquidación detallada de cesantía y preaviso.',
      url: '/generador-documentos',
      colorClass: 'bg-blue-600 text-white border-blue-700',
    },

    // 8. Nodo Constitucional: Tutela Judicial y Amparo
    {
      id: 'node-concept-tutela',
      label: 'Tutela Judicial Efectiva',
      nodeType: 'CONCEPT',
      specialtySlug: 'derecho-constitucional',
      specialtyName: 'Derecho Constitucional',
      details: 'Garantía del Artículo 69 de la Constitución sobre debido proceso sustantivo.',
      url: '/conceptos/tutela-judicial-efectiva',
      colorClass: 'bg-amber-500 text-white border-amber-600',
    },
    {
      id: 'node-art-69-const',
      label: 'Art. 69 Constitución',
      nodeType: 'ARTICLE',
      specialtySlug: 'derecho-constitucional',
      specialtyName: 'Derecho Constitucional',
      details: 'Garantías mínimas del debido proceso y tutela judicial efectiva.',
      url: '/normas/constitucion-republica-dominicana',
      colorClass: 'bg-emerald-600 text-white border-emerald-700',
    },
    {
      id: 'node-art-72-const',
      label: 'Art. 72 Constitución',
      nodeType: 'ARTICLE',
      specialtySlug: 'derecho-constitucional',
      specialtyName: 'Derecho Constitucional',
      details: 'Acción de Amparo constitucional frente a actos manifiestamente arbitrarios.',
      url: '/normas/constitucion-republica-dominicana',
      colorClass: 'bg-emerald-600 text-white border-emerald-700',
    },
    {
      id: 'node-caselaw-tc',
      label: 'Sentencia TC/0123/18',
      nodeType: 'CASE_LAW',
      specialtySlug: 'derecho-constitucional',
      specialtyName: 'Derecho Constitucional',
      details: 'Criterio vinculante del Tribunal Constitucional sobre deber inexcusable de motivación.',
      url: '/jurisprudencia',
      colorClass: 'bg-purple-600 text-white border-purple-700',
    },
  ],

  edges: [
    // Conexiones Civiles
    { id: 'e-1', source: 'node-norm-codigo-civil', target: 'node-art-1382', relationLabel: 'Contiene' },
    { id: 'e-2', source: 'node-norm-codigo-civil', target: 'node-art-1384', relationLabel: 'Contiene' },
    { id: 'e-3', source: 'node-art-1382', target: 'node-concept-resp-civil', relationLabel: 'Fundamenta Legalmente' },
    { id: 'e-4', source: 'node-art-1384', target: 'node-concept-resp-civil', relationLabel: 'Regula Régimen de Cosas' },
    { id: 'e-5', source: 'node-concept-resp-civil', target: 'node-caselaw-scj-dano', relationLabel: 'Interpretada por SCJ' },
    { id: 'e-6', source: 'node-concept-resp-civil', target: 'node-proc-demanda-civil', relationLabel: 'Vía Procesal Aplicable' },
    { id: 'e-7', source: 'node-proc-demanda-civil', target: 'node-doc-acto-mora', relationLabel: 'Requiere Pieza Procesal' },

    // Conexiones Laborales
    { id: 'e-8', source: 'node-norm-codigo-trabajo', target: 'node-art-80-ct', relationLabel: 'Contiene' },
    { id: 'e-9', source: 'node-norm-codigo-trabajo', target: 'node-art-86-ct', relationLabel: 'Contiene' },
    { id: 'e-10', source: 'node-art-80-ct', target: 'node-concept-desahucio', relationLabel: 'Efecto Indemnizatorio' },
    { id: 'e-11', source: 'node-art-86-ct', target: 'node-concept-desahucio', relationLabel: 'Sanciona Retardo de Pago' },
    { id: 'e-12', source: 'node-concept-desahucio', target: 'node-caselaw-scj-laboral', relationLabel: 'Criterio Vinculante SCJ' },
    { id: 'e-13', source: 'node-concept-desahucio', target: 'node-proc-demanda-laboral', relationLabel: 'Litigio ante Tribunales' },
    { id: 'e-14', source: 'node-proc-demanda-laboral', target: 'node-doc-demanda-prestaciones', relationLabel: 'Documento Modelo' },

    // Conexiones Constitucionales
    { id: 'e-15', source: 'node-art-69-const', target: 'node-concept-tutela', relationLabel: 'Consagra Derecho Fundamental' },
    { id: 'e-16', source: 'node-art-72-const', target: 'node-concept-tutela', relationLabel: 'Mecanismo de Protección Rápida' },
    { id: 'e-17', source: 'node-concept-tutela', target: 'node-caselaw-tc', relationLabel: 'Precedente Constitucional' },
    { id: 'e-18', source: 'node-concept-tutela', target: 'node-proc-demanda-civil', relationLabel: 'Garantiza Debido Proceso en Juicio' },
    { id: 'e-19', source: 'node-concept-tutela', target: 'node-proc-demanda-laboral', relationLabel: 'Garantiza Tutela Efectiva Laboral' },
  ],
};

export async function getLegalGraphDataset(): Promise<LegalGraphDataset> {
  return DOMINICAN_LEGAL_GRAPH;
}
