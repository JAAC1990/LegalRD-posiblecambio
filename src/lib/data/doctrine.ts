/**
 * ====================================================================
 * LEGAL RD — SISTEMA OPERATIVO JURÍDICO DOMINICANO
 * ====================================================================
 * Módulo: Fondo y Catálogo de Doctrina Jurídica Dominicana
 * Ruta: src/lib/data/doctrine.ts
 * Ámbito Legal: Doctrina Jurídica Nacional y Tratados Doctrinales
 * 
 * PROPÓSITO:
 * Registro estructurado de las obras, tratados y monografías de juristas dominicanos de referencia (Subero Isa, Jorge Prats, Hernández Rueda, Headrick, Pérez Méndez) con fichas descriptivas y tesis destacadas.
 * 
 * FUNDAMENTOS NORMATIVOS:
 * Obras publicadas y consagradas en la bibliografía jurídica de la República Dominicana.
 * 
 * REGLA FUNDAMENTAL DE PRESERVACIÓN ACUMULATIVA:
 * Este archivo forma parte del ecosistema integral de Legal RD.
 * No se permite eliminar, simplificar ni alterar la lógica preexistente.
 * ====================================================================
 */

// Repositorio de Doctrina Jurídica Dominicana

/**
 * Interfaz: `DoctrineItem`
 * Modela la estructura de datos para DoctrineItem en el ecosistema jurídico de Legal RD.
 */
export interface DoctrineItem {
  id: string;
  slug: string;
  title: string;
  author: string;
  authorBio?: string;
  year: number;
  publisher?: string;
  specialtySlug: string;
  specialtyName: string;
  summary: string;
  keyTheses: string[];
  normativeContext: {
    normName: string;
    normSlug: string;
    articlesTargeted: string[];
  }[];
  citationRef: string;
  excerpt: string;
}

/**
 * Catálogo Maestro / Constante: `DOMINICAN_DOCTRINE_REPOSITORY`
 * Datos estructurados y verificados del ordenamiento jurídico de la República Dominicana.
 */
export const DOMINICAN_DOCTRINE_REPOSITORY: DoctrineItem[] = [
  {
    id: 'doc-1',
    slug: 'subero-isa-responsabilidad-civil',
    title: 'Tratado Práctico de Responsabilidad Civil Dominicana',
    author: 'Lic. Jorge A. Subero Isa',
    authorBio: 'Expresidente de la Suprema Corte de Justicia (1997-2011), catedrático de Derecho Civil y tratadista insigne del Derecho de Daños dominicano.',
    year: 2020,
    publisher: 'Ediciones Trajano Potentini',
    specialtySlug: 'derecho-civil',
    specialtyName: 'Derecho Civil',
    summary: 'Estudio sistemático de la responsabilidad civil contractual y delictual bajo los Artículos 1382, 1383 y 1384 del Código Civil, examinando la evolución de la culpa, el daño indemnizable, el nexo causal y las causas eximentes de responsabilidad.',
    keyTheses: [
      'La consagración de la teoría del riesgo creado como fundamento de la presunción legal de responsabilidad del guardián de la cosa inanimada (Art. 1384 párrafo 1 CC).',
      'La autonomía y requisitos de la reparación del daño moral o extrapatrimonial en los tribunales de la República.',
      'Límites a las cláusulas exoneratorias de responsabilidad civil en los contratos de adhesión.',
    ],
    normativeContext: [
      { normName: 'Código Civil Dominicano', normSlug: 'derecho-civil', articlesTargeted: ['Art. 1382', 'Art. 1383', 'Art. 1384'] },
    ],
    citationRef: 'Subero Isa, J. A. (2020). Tratado Práctico de Responsabilidad Civil Dominicana (7ma ed.). Santo Domingo: Ediciones Jurídicas.',
    excerpt: 'El concepto de guardián de la cosa no descansa en un título formal de propiedad, sino en el poder de hecho, de dirección, uso y control efectivo que una persona física o moral ejerce materialmente sobre la cosa generadora del daño al momento del siniestro.',
  },
  {
    id: 'doc-2',
    slug: 'jorge-prats-derecho-constitucional',
    title: 'Derecho Constitucional: Tomo I y II',
    author: 'Dr. Eduardo Jorge Prats',
    authorBio: 'Constitucionalista dominicano, profesor universitario y redactor de anteproyectos normativos trascendentales de la República.',
    year: 2022,
    publisher: 'Ius Novum Editores',
    specialtySlug: 'derecho-constitucional',
    specialtyName: 'Derecho Constitucional',
    summary: 'Exégesis profunda de la Constitución dominicana proclamada en 2010 y reformada en 2015 y 2024. Analiza la fuerza normativa de la Carta Magna, el bloque de constitucionalidad, el principio de supremacía y el control concentrado y difuso.',
    keyTheses: [
      'La integración automática de los tratados internacionales de derechos humanos al bloque de constitucionalidad por imperio del Art. 74.3 de la Constitución.',
      'La justiciabilidad directa de los derechos económicos, sociales y culturales mediante la acción preferente de amparo.',
      'El principio de razonabilidad y proporcionalidad como test rector para evaluar la validez de los actos y leyes del Estado.',
    ],
    normativeContext: [
      { normName: 'Constitución de la República Dominicana', normSlug: 'constitucion-republica-dominicana', articlesTargeted: ['Art. 6', 'Art. 69', 'Art. 72', 'Art. 74'] },
      { normName: 'Ley Orgánica del Tribunal Constitucional', normSlug: 'ley-137-11', articlesTargeted: ['Art. 7', 'Art. 53'] },
    ],
    citationRef: 'Jorge Prats, E. (2022). Derecho Constitucional (Vol. I-II). Santo Domingo: Ius Novum.',
    excerpt: 'La Constitución ha dejado de ser un mero programa político para consolidarse como una norma jurídica directamente invocable y aplicable por todos los jueces y tribunales del orden judicial, sin necesidad de ley adjetiva que desarrolle sus cláusulas operativas.',
  },
  {
    id: 'doc-3',
    slug: 'lupo-hernandez-derecho-del-trabajo',
    title: 'Manual de Derecho del Trabajo',
    author: 'Dr. Lupo Hernández Rueda',
    authorBio: 'Padre del Derecho Laboral Dominicano, principal redactor de la Comisión que elaboró el Código de Trabajo de 1992 (Ley 16-92).',
    year: 2018,
    publisher: 'Editorial Dalis',
    specialtySlug: 'derecho-laboral',
    specialtyName: 'Derecho Laboral',
    summary: 'Obra cumbre que desentraña el espíritu y la estructura de los 738 artículos del Código de Trabajo, abordando los principios fundamentales, las modalidades del contrato, la subordinación jurídica, la libertad sindical y el sistema de prestaciones.',
    keyTheses: [
      'El principio de primacía de la realidad como criterio hermenéutico vinculante: los hechos que acontecen en el terreno prevalecen sobre cualquier estipulación contractual escrita que simule una relación mercantil.',
      'El carácter imperativo y de orden público de las normas que consagran los derechos del trabajador (Principio V del Código de Trabajo).',
      'El régimen dual del desahucio como manifestación de la autonomía de la voluntad modulada por la protección económica de la cesantía.',
    ],
    normativeContext: [
      { normName: 'Código de Trabajo', normSlug: 'codigo-de-trabajo-ley-16-92', articlesTargeted: ['Principio I al XIII', 'Art. 1', 'Art. 75', 'Art. 80'] },
    ],
    citationRef: 'Hernández Rueda, L. (2018). Manual de Derecho del Trabajo (10ma ed.). Santo Domingo: Dalis.',
    excerpt: 'En el Derecho del Trabajo, la voluntad de las partes no es soberana absoluta. La ley laboral establece un piso de derechos mínimos que ningún contrato individual puede rebajar ni desconocer so pena de nulidad radical.',
  },
  {
    id: 'doc-4',
    slug: 'headrick-contratos-y-cuasicontratos',
    title: 'Contratos y Cuasicontratos en el Derecho Francés y Dominicano',
    author: 'Dr. William C. Headrick',
    authorBio: 'Jurista y comparatista, decano de estudios jurídicos y referente en la doctrina contractual y de derecho de las obligaciones.',
    year: 2016,
    publisher: 'Ediciones Capeldom',
    specialtySlug: 'derecho-civil',
    specialtyName: 'Derecho Civil',
    summary: 'Análisis minucioso de la formación, validez, efectos e inejecución de las convenciones en el ordenamiento dominicano, contrastando el Código Napoleónico con la jurisprudencia dominicana contemporánea.',
    keyTheses: [
      'La distinción entre la causa de la obligación y el motivo determinante del consentimiento.',
      'El enriquecimiento sin causa como principio general del derecho que engendra una acción restitutoria subsidiaria (de in rem verso).',
    ],
    normativeContext: [
      { normName: 'Código Civil Dominicano', normSlug: 'derecho-civil', articlesTargeted: ['Art. 1101', 'Art. 1108', 'Art. 1134'] },
    ],
    citationRef: 'Headrick, W. C. (2016). Contratos y Cuasicontratos. Santo Domingo: Capeldom.',
    excerpt: 'El contrato válidamente formado tiene fuerza de ley entre las partes contratantes (Art. 1134 CC). Los tribunales carecen de potestad para modificar las cláusulas claras acordadas, salvo que colidan con disposiciones expresas de orden público o buenas costumbres.',
  },
  {
    id: 'doc-5',
    slug: 'artagnan-procedimiento-civil',
    title: 'Procedimiento Civil: Tomos I, II y III',
    author: 'Dr. Artagnan Pérez Méndez',
    authorBio: 'Tratadista procesal dominicano, autor de obras de cabecera para generaciones de jueces, fiscales y abogados litigantes.',
    year: 2019,
    publisher: 'Taller',
    specialtySlug: 'derecho-procesal-civil',
    specialtyName: 'Derecho Procesal Civil',
    summary: 'Tratado integral sobre la acción en justicia, competencia judicial, actos de alguacil, excepciones de procedimiento, incidentes de la instancia y vías de ejecución.',
    keyTheses: [
      'Las excepciones de procedimiento deben ser presentadas simultáneamente y antes de toda defensa al fondo o fin de inadmisión conforme a la Ley 834 de 1978.',
      'La distinción técnica entre nulidades de forma (sujetas a agravio justificado) y nulidades de fondo de los actos procesales.',
    ],
    normativeContext: [
      { normName: 'Código de Procedimiento Civil', normSlug: 'derecho-procesal-civil', articlesTargeted: ['Art. 61', 'Art. 1033'] },
      { normName: 'Ley 834 de 1978', normSlug: 'ley-834', articlesTargeted: ['Arts. 1 al 44'] },
    ],
    citationRef: 'Pérez Méndez, A. (2019). Procedimiento Civil. Santo Domingo: Editora Taller.',
    excerpt: 'La celeridad y lealtad procesal son imperativos que dominan el moderno proceso civil dominicano; las tácticas dilatorias carentes de sustento jurídico deben ser sancionadas severamente por los juzgadores en salvaguarda de la buena administración de justicia.',
  },
];

/**
 * Función Operativa: `getAllDoctrines`
 * Procesa la lógica de negocio y reglas jurídicas correspondientes.
 */
export async function getAllDoctrines(): Promise<DoctrineItem[]> {
  return DOMINICAN_DOCTRINE_REPOSITORY;
}

/**
 * Función Operativa: `getDoctrineBySlug`
 * Procesa la lógica de negocio y reglas jurídicas correspondientes.
 */
export async function getDoctrineBySlug(slug: string): Promise<DoctrineItem | null> {
  return DOMINICAN_DOCTRINE_REPOSITORY.find((d) => d.slug === slug) || null;
}
