/**
 * ====================================================================
 * LEGAL RD — SISTEMA OPERATIVO JURÍDICO DOMINICANO
 * ====================================================================
 * Módulo: Repositorio de Fuentes Oficiales y Enlaces Institucionales
 * Ruta: src/lib/data/sources.ts
 * Ámbito Legal: Transparencia y Seguridad Jurídica
 * 
 * PROPÓSITO:
 * Catálogo verificado de enlaces oficiales a la Suprema Corte de Justicia, Tribunal Constitucional, Consultoría Jurídica del Poder Ejecutivo y órganos registrales.
 * 
 * FUNDAMENTOS NORMATIVOS:
 * Fuentes primarias y oficiales del Estado Dominicano.
 * 
 * REGLA FUNDAMENTAL DE PRESERVACIÓN ACUMULATIVA:
 * Este archivo forma parte del ecosistema integral de Legal RD.
 * No se permite eliminar, simplificar ni alterar la lógica preexistente.
 * ====================================================================
 */

﻿export interface LegalSourceItem {
  id: string;
  sourceNumber: number;
  name: string;
  slug: string;
  hierarchyLevel: 'CONSTITUCIONAL' | 'LEGAL' | 'REGLAMENTARIO' | 'JURISDICCIONAL' | 'INTERNACIONAL' | 'TECNICO_ADMINISTRATIVO';
  hierarchyLabel: string;
  issuingAuthority: string;
  description: string;
  examples: {
    title: string;
    ref: string;
    link?: string;
  }[];
  bindingForce: string;
  iconName: string;
}

/**
 * Catálogo Maestro / Constante: `DOMINICAN_LEGAL_SOURCES`
 * Datos estructurados y verificados del ordenamiento jurídico de la República Dominicana.
 */
export const DOMINICAN_LEGAL_SOURCES: LegalSourceItem[] = [
  // 1. CONSTITUCIÓN
  {
    id: 'src-1',
    sourceNumber: 1,
    name: 'Constitución',
    slug: 'constitucion',
    hierarchyLevel: 'CONSTITUCIONAL',
    hierarchyLabel: 'Nivel Supremo (Bloque de Constitucionalidad)',
    issuingAuthority: 'Asamblea Nacional Revisora',
    description: 'Norma suprema y fundamental del ordenamiento jurídico de la República Dominicana. Todos los poderes públicos y las personas están obligados a someterse a ella (Art. 6).',
    bindingForce: 'Supremacía absoluta erga omnes y aplicación directa.',
    iconName: 'Scale',
    examples: [
      { title: 'Constitución Política de la República Dominicana (2015/2024)', ref: 'Gaceta Oficial No. 10805', link: '/normas/constitucion-republica-dominicana' },
    ],
  },
  // 2. LEYES
  {
    id: 'src-2',
    sourceNumber: 2,
    name: 'Leyes (Orgánicas y Ordinarias)',
    slug: 'leyes',
    hierarchyLevel: 'LEGAL',
    hierarchyLabel: 'Nivel Legal (Poder Legislativo)',
    issuingAuthority: 'Congreso Nacional (Senado y Cámara de Diputados) / Promulgación P.E.',
    description: 'Actos normativos generales de carácter obligatorio. Se dividen en Leyes Orgánicas (mayoría calificada de 2/3 para regular derechos fundamentales y estructura estatal) y Leyes Ordinarias (mayoría simple).',
    bindingForce: 'Obligatoria en todo el territorio nacional tras su publicación en la Gaceta Oficial.',
    iconName: 'BookOpen',
    examples: [
      { title: 'Ley 108-05 de Registro Inmobiliario', ref: 'G.O. 10316', link: '/normas/ley-108-05-registro-inmobiliario' },
      { title: 'Ley 107-13 de Procedimiento Administrativo', ref: 'G.O. 10722', link: '/normas/ley-107-13-procedimiento-administrativo' },
      { title: 'Ley 2-23 del Recurso de Casación', ref: 'G.O. 11094', link: '/buscar?q=Ley+2-23' },
    ],
  },
  // 3. CÓDIGOS
  {
    id: 'src-3',
    sourceNumber: 3,
    name: 'Códigos',
    slug: 'codigos',
    hierarchyLevel: 'LEGAL',
    hierarchyLabel: 'Nivel Legal Sustantivo & Adjetivo',
    issuingAuthority: 'Congreso Nacional',
    description: 'Cuerpos normativos sistemáticos y orgánicos que recopilan y articulan de manera exhaustiva una rama completa del Derecho.',
    bindingForce: 'Norma rectora y sistemática de la materia que regula.',
    iconName: 'Layers',
    examples: [
      { title: 'Código de Trabajo (Ley 16-92 - 738 Artículos)', ref: 'G.O. 9836', link: '/normas/codigo-de-trabajo-ley-16-92' },
      { title: 'Código Penal Dominicano', ref: 'Ley 74-25 / Dec-Ley 1884', link: '/repositorio?rama=derecho-penal' },
      { title: 'Código Procesal Penal (Ley 76-02)', ref: 'G.O. 10170', link: '/repositorio?rama=derecho-procesal-penal' },
      { title: 'Código Civil de la República Dominicana', ref: 'Dec-Ley 2213 de 1884', link: '/repositorio?rama=derecho-civil' },
    ],
  },
  // 4. DECRETOS
  {
    id: 'src-4',
    sourceNumber: 4,
    name: 'Decretos',
    slug: 'decretos',
    hierarchyLevel: 'REGLAMENTARIO',
    hierarchyLabel: 'Nivel Ejecutivo (Presidencia de la República)',
    issuingAuthority: 'Presidente de la República (Poder Ejecutivo)',
    description: 'Actos administrativos o normativos dictados por el Presidente de la República en ejercicio de sus atribuciones constitucionales de administración del Estado.',
    bindingForce: 'Fuerza vinculante subordinada a la ley.',
    iconName: 'Landmark',
    examples: [
      { title: 'Decreto 258-93 (Reglamento de Aplicación del Código de Trabajo)', ref: 'G.O. 9864', link: '/repositorio?rama=derecho-laboral' },
      { title: 'Decretos de Designación y Políticas Públicas Nacionales', ref: 'Poder Ejecutivo', link: '/buscar?q=decreto' },
    ],
  },
  // 5. REGLAMENTOS
  {
    id: 'src-5',
    sourceNumber: 5,
    name: 'Reglamentos',
    slug: 'reglamentos',
    hierarchyLevel: 'REGLAMENTARIO',
    hierarchyLabel: 'Nivel de Ejecución Normativa',
    issuingAuthority: 'Poder Ejecutivo / Órganos con Potestad Reglamentaria',
    description: 'Normas subordinadas a la ley que detallan los mecanismos prácticos, procedimientos y requisitos necesarios para la correcta ejecución de una ley.',
    bindingForce: 'Subordinada estrictamente al texto y espíritu de la ley habilitante.',
    iconName: 'FileText',
    examples: [
      { title: 'Reglamento General de Mensuras Catastrales', ref: 'Jurisdicción Inmobiliaria', link: '/repositorio?rama=derecho-inmobiliario' },
      { title: 'Reglamento General de Registro de Títulos', ref: 'Suprema Corte de Justicia', link: '/repositorio?rama=derecho-inmobiliario' },
    ],
  },
  // 6. RESOLUCIONES
  {
    id: 'src-6',
    sourceNumber: 6,
    name: 'Resoluciones',
    slug: 'resoluciones',
    hierarchyLevel: 'TECNICO_ADMINISTRATIVO',
    hierarchyLabel: 'Nivel Ministerial & Administrativo',
    issuingAuthority: 'Ministerios, Direcciones Generales, Cámaras Legislativas',
    description: 'Decisiones de carácter normativo o particular adoptadas por las máximas autoridades de las instituciones públicas sobre materias de su competencia específica.',
    bindingForce: 'Vinculante dentro del ámbito orgánico y funcional del ente emisor.',
    iconName: 'FileSignature',
    examples: [
      { title: 'Resoluciones del Comité Nacional de Salarios (Salario Mínimo)', ref: 'Ministerio de Trabajo', link: '/buscar?q=salario+minimo' },
      { title: 'Resoluciones Generales de la DGII (Normas Generales)', ref: 'DGII', link: '/buscar?q=DGII' },
    ],
  },
  // 7. ORDENANZAS
  {
    id: 'src-7',
    sourceNumber: 7,
    name: 'Ordenanzas',
    slug: 'ordenanzas',
    hierarchyLevel: 'TECNICO_ADMINISTRATIVO',
    hierarchyLabel: 'Nivel Municipal & Local',
    issuingAuthority: 'Concejos de Regidores (Ayuntamientos y Alcaldías)',
    description: 'Normas de alcance local expedidas por los gobiernos locales para regular el uso de suelo, planeamiento urbano, aseo urbano y arbitrios municipales.',
    bindingForce: 'Obligatoria en el territorio del municipio o distrito municipal correspondiente.',
    iconName: 'Building',
    examples: [
      { title: 'Ordenanzas Municipales sobre Uso de Suelo y Planeamiento Urbano', ref: 'Alcaldías Municipales (Ley 176-07)', link: '/buscar?q=ordenanza' },
    ],
  },
  // 8. TRATADOS
  {
    id: 'src-8',
    sourceNumber: 8,
    name: 'Tratados Internacionales',
    slug: 'tratados',
    hierarchyLevel: 'INTERNACIONAL',
    hierarchyLabel: 'Nivel Supranacional / Constitucional',
    issuingAuthority: 'Suscripción por el Presidente y Aprobación del Congreso Nacional',
    description: 'Acuerdos solemnes entre el Estado Dominicano y otros sujetos de Derecho Internacional. Los relativos a derechos humanos tienen rango constitucional (Art. 74.3).',
    bindingForce: 'Rango supralegal y constitucional (Tratados de Derechos Humanos).',
    iconName: 'Globe',
    examples: [
      { title: 'Convención Americana sobre Derechos Humanos (Pacto de San José)', ref: 'Rango Constitucional', link: '/especialidades/derechos-humanos' },
      { title: 'Tratado de Libre Comercio DR-CAFTA', ref: 'Congreso Nacional', link: '/buscar?q=tratado' },
    ],
  },
  // 9. CONVENIOS
  {
    id: 'src-9',
    sourceNumber: 9,
    name: 'Convenios Internacionales',
    slug: 'convenios',
    hierarchyLevel: 'INTERNACIONAL',
    hierarchyLabel: 'Nivel Internacional Bilateral & Multilateral',
    issuingAuthority: 'Organismos Multilaterales (OIT, ONU, OEA) ratificados por RD',
    description: 'Pactos formales adoptados por conferencias internacionales para uniformar estándares laborales, comerciales, ambientales o de cooperación jurídica.',
    bindingForce: 'Fuerza vinculante con primacía sobre normas ordinarias contrarias.',
    iconName: 'Compass',
    examples: [
      { title: 'Convenios de la Organización Internacional del Trabajo (OIT)', ref: 'Convenios Nos. 87, 98, 182 ratificados', link: '/normas/codigo-de-trabajo-ley-16-92' },
    ],
  },
  // 10. NORMAS ADMINISTRATIVAS
  {
    id: 'src-10',
    sourceNumber: 10,
    name: 'Normas Administrativas',
    slug: 'normas-administrativas',
    hierarchyLevel: 'TECNICO_ADMINISTRATIVO',
    hierarchyLabel: 'Nivel Administrativo General',
    issuingAuthority: 'Órganos Centralizados y Descentralizados del Estado',
    description: 'Directrices y disposiciones dictadas para regular el régimen interno, las tarifas, los plazos de trámites y la relación con los administrados (Ley 107-13).',
    bindingForce: 'Sujetas al principio de legalidad y control judicial ante el TSA.',
    iconName: 'FileText',
    examples: [
      { title: 'Manuales de Compras y Contrataciones Públicas (DGCP)', ref: 'Ley 340-06', link: '/especialidades/derecho-administrativo' },
    ],
  },
  // 11. JURISPRUDENCIA
  {
    id: 'src-11',
    sourceNumber: 11,
    name: 'Jurisprudencia',
    slug: 'jurisprudencia',
    hierarchyLevel: 'JURISDICCIONAL',
    hierarchyLabel: 'Nivel Jurisdiccional y Precedente',
    issuingAuthority: 'Suprema Corte de Justicia (SCJ) y Tribunal Constitucional (TC)',
    description: 'Criterios reiterados y uniformes emanados de las altas cortes al resolver casos contenciosos, que sirven como pauta obligatoria de interpretación legal.',
    bindingForce: 'Precedentes del TC son vinculantes para todos los poderes públicos (Art. 184 Const.). Jurisprudencia SCJ unifica la doctrina judicial.',
    iconName: 'Scale',
    examples: [
      { title: 'Doctrina SCJ sobre Cálculo de Cesantía y Subordinación', ref: 'Tercera Sala SCJ', link: '/jurisprudencia' },
      { title: 'Sentencias de Unificación de Criterios Doctrinales', ref: 'Salas Reunidas SCJ', link: '/jurisprudencia' },
    ],
  },
  // 12. SENTENCIAS
  {
    id: 'src-12',
    sourceNumber: 12,
    name: 'Sentencias Judiciales',
    slug: 'sentencias',
    hierarchyLevel: 'JURISDICCIONAL',
    hierarchyLabel: 'Decisiones Jurisdiccionales Definitivas',
    issuingAuthority: 'Tribunales de la República (Juzgados, Cortes, SCJ, TC)',
    description: 'Resoluciones que ponen fin al fondo de una litis, controversia o proceso penal, civil, laboral, de tierras o administrativo.',
    bindingForce: 'Autoridad de la cosa irrevocablemente juzgada entre las partes.',
    iconName: 'Gavel',
    examples: [
      { title: 'Sentencias Constitucionales de Amparo y Revisión', ref: 'Tribunal Constitucional', link: '/jurisprudencia' },
    ],
  },
  // 13. RESOLUCIONES JUDICIALES
  {
    id: 'src-13',
    sourceNumber: 13,
    name: 'Resoluciones Judiciales & Autos',
    slug: 'resoluciones-judiciales',
    hierarchyLevel: 'JURISDICCIONAL',
    hierarchyLabel: 'Nivel Procesal & Trámite Judicial',
    issuingAuthority: 'Jueces de Instrucción, Presidentes de Corte, Jueces de Ejecución',
    description: 'Decisiones judiciales que resuelven peticiones accesorias, medidas de coerción, incidentes del procedimiento o fijación de audiencias.',
    bindingForce: 'Eficacia procesal inmediata según la materia.',
    iconName: 'Scroll',
    examples: [
      { title: 'Autos de Apertura a Juicio y Medidas Cautelares', ref: 'Tribunales de Primera Instancia', link: '/procedimientos' },
    ],
  },
  // 14. REGLAMENTOS INSTITUCIONALES
  {
    id: 'src-14',
    sourceNumber: 14,
    name: 'Reglamentos Institucionales',
    slug: 'reglamentos-institucionales',
    hierarchyLevel: 'REGLAMENTARIO',
    hierarchyLabel: 'Nivel Orgánico Institucional',
    issuingAuthority: 'Consejo del Poder Judicial, JCE, Tribunal Superior Electoral, Defensor del Pueblo',
    description: 'Estatutos internos que regulan el funcionamiento administrativo, carrera judicial, régimen ético y organización de órganos autónomos constitucionales.',
    bindingForce: 'Obligatorio para los miembros y dependencias de la institución.',
    iconName: 'Building',
    examples: [
      { title: 'Reglamento de la Carrera Judicial y Disciplinario', ref: 'Consejo del Poder Judicial', link: '/especialidades/derecho-disciplinario' },
    ],
  },
  // 15. NORMATIVAS SECTORIALES
  {
    id: 'src-15',
    sourceNumber: 15,
    name: 'Normativas Sectoriales',
    slug: 'normativas-sectoriales',
    hierarchyLevel: 'TECNICO_ADMINISTRATIVO',
    hierarchyLabel: 'Nivel de Regulación Económica & Sectorial',
    issuingAuthority: 'Superintendencias y Agencias Reguladoras (SB, SIE, INDOTEL, SISALRIL, Pro Consumidor)',
    description: 'Reglamentaciones técnicas de supervisión y fiscalización en mercados regulados: banca, seguros, telecomunicaciones, energía y salud.',
    bindingForce: 'Obligatoria para todas las entidades y operadores del sector supervisado.',
    iconName: 'Zap',
    examples: [
      { title: 'Instructivos y Circulares de la Superintendencia de Bancos', ref: 'Superintendencia de Bancos', link: '/especialidades/derecho-bancario' },
      { title: 'Reglamentos de Protección al Usuario de Telecomunicaciones', ref: 'INDOTEL', link: '/especialidades/derecho-telecomunicaciones' },
    ],
  },
  // 16. DOCTRINA
  {
    id: 'src-16',
    sourceNumber: 16,
    name: 'Doctrina Jurídica',
    slug: 'doctrina',
    hierarchyLevel: 'TECNICO_ADMINISTRATIVO',
    hierarchyLabel: 'Fuente Auxiliar de Interpretación',
    issuingAuthority: 'Juristas, Tratadistas, Academias de Derecho y Universidad',
    description: 'Estudios sistemáticos, tratados y comentarios doctrinales elaborados por los juristas dominicanos para la interpretación científica de las leyes.',
    bindingForce: 'Fuente persuasiva de orientación e interpretación para jueces y abogados.',
    iconName: 'BookOpen',
    examples: [
      { title: 'Tratados de Derecho Civil, Laboral e Inmobiliario Dominicano', ref: 'Doctrina Nacional', link: '/intro' },
    ],
  },
  // 17. CIRCULARES
  {
    id: 'src-17',
    sourceNumber: 17,
    name: 'Circulares',
    slug: 'circulares',
    hierarchyLevel: 'TECNICO_ADMINISTRATIVO',
    hierarchyLabel: 'Directrices Internas Operativas',
    issuingAuthority: 'Direcciones Generales, Ministerios y Superintendencias',
    description: 'Comunicaciones formales de superiores jerárquicos que imparten instrucciones directas a los funcionarios para la aplicación uniforme de la normativa.',
    bindingForce: 'Obligatoriedad interna para el personal del organismo emisor.',
    iconName: 'FileSignature',
    examples: [
      { title: 'Circulares de la Dirección General de Aduanas y DGII', ref: 'DGA / DGII', link: '/buscar?q=circular' },
    ],
  },
  // 18. INSTRUCTIVOS
  {
    id: 'src-18',
    sourceNumber: 18,
    name: 'Instructivos y Guías de Trámite',
    slug: 'instructivos',
    hierarchyLevel: 'TECNICO_ADMINISTRATIVO',
    hierarchyLabel: 'Guías de Procedimiento Administrativo',
    issuingAuthority: 'Instituciones Públicas de Servicio al Ciudadano',
    description: 'Documentos didácticos que detallan el paso a paso, plazos y formularios requeridos para tramitar solicitudes, licencias y registros legales.',
    bindingForce: 'Guía vinculante para la tramitación de expedientes administrativos.',
    iconName: 'Scroll',
    examples: [
      { title: 'Instructivo para Registro de Títulos y Transferencias', ref: 'Registro Inmobiliario', link: '/procedimientos' },
    ],
  },
  // 19. NORMAS TÉCNICAS CON RELEVANCIA JURÍDICA
  {
    id: 'src-19',
    sourceNumber: 19,
    name: 'Normas Técnicas (NORDOM / INDOCAL)',
    slug: 'normas-tecnicas',
    hierarchyLevel: 'TECNICO_ADMINISTRATIVO',
    hierarchyLabel: 'Estándares Técnicos con Fuerza Legal',
    issuingAuthority: 'Instituto Dominicano para la Calidad (INDOCAL)',
    description: 'Especificaciones técnicas de cumplimiento obligatorio (Reglamentos Técnicos) que regulan la seguridad de productos, construcción, medio ambiente y metrología.',
    bindingForce: 'Obligatoria cuando son adoptadas mediante decreto o resolución ministerial.',
    iconName: 'Award',
    examples: [
      { title: 'Normas Dominicanas de Calidad (NORDOM)', ref: 'INDOCAL (Ley 166-12)', link: '/buscar?q=norma+tecnica' },
    ],
  },
];

/**
 * Función Operativa: `getAllLegalSources`
 * Procesa la lógica de negocio y reglas jurídicas correspondientes.
 */
export async function getAllLegalSources(): Promise<LegalSourceItem[]> {
  return DOMINICAN_LEGAL_SOURCES;
}

/**
 * Función Operativa: `getLegalSourceBySlug`
 * Procesa la lógica de negocio y reglas jurídicas correspondientes.
 */
export async function getLegalSourceBySlug(slug: string): Promise<LegalSourceItem | null> {
  const source = DOMINICAN_LEGAL_SOURCES.find((s) => s.slug === slug);
  return source || null;
}