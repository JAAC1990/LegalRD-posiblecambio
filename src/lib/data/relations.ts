export type RelationType = 'MODIFIES' | 'REPEALS' | 'REGULATES' | 'COMPLEMENTS' | 'DEPENDS_ON' | 'CITES';

export interface LegalRelationItem {
  id: string;
  sourceNorm: {
    slug: string;
    number: string;
    name: string;
    type: string;
    date: string;
  };
  targetNorm: {
    slug: string;
    number: string;
    name: string;
    type: string;
    statusEffect: 'DEROGADA_TOTAL' | 'MODIFICADA_PARCIAL' | 'REGLAMENTADA' | 'COMPLEMENTADA';
  };
  relationType: RelationType;
  relationLabel: string;
  description: string;
  articlesAffected?: string[];
  officialGacetaRef: string;
  branchSlug: string;
  branchName: string;
}

export const DOMINICAN_LEGAL_RELATIONS: LegalRelationItem[] = [
  // 1. Ley 2-23 deroga Ley 3726 sobre Casación
  {
    id: 'rel-1',
    sourceNorm: {
      slug: 'ley-2-23-casacion',
      number: 'Ley 2-23',
      name: 'Ley sobre el Recurso de Casación',
      type: 'LEY',
      date: '2023-01-17',
    },
    targetNorm: {
      slug: 'ley-3726-casacion-historica',
      number: 'Ley 3726 de 1953',
      name: 'Antigua Ley sobre Procedimiento de Casación',
      type: 'LEY_DEROGADA',
      statusEffect: 'DEROGADA_TOTAL',
    },
    relationType: 'REPEALS',
    relationLabel: 'Deroga y Sustituye Íntegramente',
    description: 'La Ley 2-23 modernizó el recurso de casación ante la SCJ, reduciendo plazos, digitalizando trámites y derogando totalmente la centenaria Ley 3726.',
    articlesAffected: ['Todos los artículos de la Ley 3726'],
    officialGacetaRef: 'Gaceta Oficial No. 11094',
    branchSlug: 'derecho-procesal-civil',
    branchName: 'Derecho Procesal Civil',
  },
  // 2. Ley 4-23 deroga Ley 659 de Actos del Estado Civil
  {
    id: 'rel-2',
    sourceNorm: {
      slug: 'ley-4-23-estado-civil',
      number: 'Ley 4-23',
      name: 'Ley Orgánica de los Actos del Estado Civil',
      type: 'LEY_ORGANICA',
      date: '2023-01-20',
    },
    targetNorm: {
      slug: 'ley-659-estado-civil-historica',
      number: 'Ley 659 de 1944',
      name: 'Antigua Ley sobre Actos del Estado Civil',
      type: 'LEY_DEROGADA',
      statusEffect: 'DEROGADA_TOTAL',
    },
    relationType: 'REPEALS',
    relationLabel: 'Deroga y Sustituye Íntegramente',
    description: 'Sustituye el régimen de registro de nacimientos, matrimonios y defunciones, incorporando el número único de identidad desde el nacimiento.',
    articlesAffected: ['Totalidad de la Ley 659'],
    officialGacetaRef: 'Gaceta Oficial No. 11095',
    branchSlug: 'derecho-civil',
    branchName: 'Derecho Civil & Registral',
  },
  // 3. Reglamento 258-93 reglamenta el Código de Trabajo
  {
    id: 'rel-3',
    sourceNorm: {
      slug: 'reglamento-258-93-trabajo',
      number: 'Reglamento 258-93',
      name: 'Reglamento para la Aplicación del Código de Trabajo',
      type: 'DECRETO_REGLAMENTARIO',
      date: '1993-10-01',
    },
    targetNorm: {
      slug: 'codigo-de-trabajo-ley-16-92',
      number: 'Ley 16-92',
      name: 'Código de Trabajo de la República Dominicana',
      type: 'CODIGO',
      statusEffect: 'REGLAMENTADA',
    },
    relationType: 'REGULATES',
    relationLabel: 'Reglamenta y Detalla Procedimientos',
    description: 'Establece el divisor 23.83 para el cálculo del salario diario promedio, trámites de desahucio, inspección y planillas DGT-3 y DGT-4.',
    articlesAffected: ['Arts. 80, 86, 147, 177, 219, 223'],
    officialGacetaRef: 'Gaceta Oficial No. 9864',
    branchSlug: 'derecho-laboral',
    branchName: 'Derecho Laboral',
  },
  // 4. Ley 10-15 modifica el Código Procesal Penal
  {
    id: 'rel-4',
    sourceNorm: {
      slug: 'ley-10-15-reforma-cpp',
      number: 'Ley 10-15',
      name: 'Ley de Reforma Integral del Código Procesal Penal',
      type: 'LEY',
      date: '2015-02-10',
    },
    targetNorm: {
      slug: 'codigo-procesal-penal-ley-76-02',
      number: 'Ley 76-02',
      name: 'Código Procesal Penal de la República Dominicana',
      type: 'CODIGO',
      statusEffect: 'MODIFICADA_PARCIAL',
    },
    relationType: 'MODIFIES',
    relationLabel: 'Modifica Sustancialmente Artículos',
    description: 'Reformó más de 100 artículos del CPP sobre plazos máximos de prisión preventiva, procedimiento abreviado y facultades de la víctima.',
    articlesAffected: ['Arts. 70, 85, 226, 234, 241, 381, 417'],
    officialGacetaRef: 'Gaceta Oficial No. 10791',
    branchSlug: 'derecho-procesal-penal',
    branchName: 'Derecho Procesal Penal',
  },
  // 5. Ley 31-11 modifica la Ley 479-08 de Sociedades
  {
    id: 'rel-5',
    sourceNorm: {
      slug: 'ley-31-11-sociedades',
      number: 'Ley 31-11',
      name: 'Ley de Modificación a la Ley de Sociedades Comerciales',
      type: 'LEY',
      date: '2011-02-11',
    },
    targetNorm: {
      slug: 'ley-479-08-sociedades-comerciales',
      number: 'Ley 479-08',
      name: 'Ley General de las Sociedades Comerciales y EIRL',
      type: 'LEY',
      statusEffect: 'MODIFICADA_PARCIAL',
    },
    relationType: 'MODIFIES',
    relationLabel: 'Modifica y Flexibiliza Capitales',
    description: 'Eliminó el capital mínimo obligatorio para las Sociedades de Responsabilidad Limitada (SRL) y simplificó la gobernanza de las SAS.',
    articlesAffected: ['Arts. 91, 144, 154, 300, 311'],
    officialGacetaRef: 'Gaceta Oficial No. 10605',
    branchSlug: 'derecho-comercial',
    branchName: 'Derecho Societario & Mercantil',
  },
  // 6. Ley 1-21 modifica el Código Civil sobre Matrimonio Infantil
  {
    id: 'rel-6',
    sourceNorm: {
      slug: 'ley-1-21-prohibicion-matrimonio-infantil',
      number: 'Ley 1-21',
      name: 'Ley de Prohibición del Matrimonio Infantil en RD',
      type: 'LEY',
      date: '2021-01-06',
    },
    targetNorm: {
      slug: 'codigo-civil-dominicano',
      number: 'Dec-Ley 2213',
      name: 'Código Civil de la República Dominicana',
      type: 'CODIGO',
      statusEffect: 'MODIFICADA_PARCIAL',
    },
    relationType: 'MODIFIES',
    relationLabel: 'Modifica y Suprime Dispensas de Edad',
    description: 'Eliminó definitivamente la posibilidad de dispensa judicial para contraer matrimonio a personas menores de 18 años.',
    articlesAffected: ['Arts. 144, 145, 148 del Código Civil'],
    officialGacetaRef: 'Gaceta Oficial No. 11004',
    branchSlug: 'derecho-de-familia',
    branchName: 'Derecho de Familia',
  },
  // 7. Ley 51-07 modifica la Ley 108-05 de Registro Inmobiliario
  {
    id: 'rel-7',
    sourceNorm: {
      slug: 'ley-51-07-reforma-inmobiliaria',
      number: 'Ley 51-07',
      name: 'Ley de Modificación a la Ley de Registro Inmobiliario',
      type: 'LEY',
      date: '2007-04-23',
    },
    targetNorm: {
      slug: 'ley-108-05-registro-inmobiliario',
      number: 'Ley 108-05',
      name: 'Ley de Registro Inmobiliario',
      type: 'LEY',
      statusEffect: 'MODIFICADA_PARCIAL',
    },
    relationType: 'MODIFIES',
    relationLabel: 'Modifica Plazos y Procedimientos de Deslinde',
    description: 'Adecuó las competencias de los Jueces de la Jurisdicción Inmobiliaria y clarificó el régimen del deslinde contradictorio.',
    articlesAffected: ['Arts. 10, 11, 25, 47, 80'],
    officialGacetaRef: 'Gaceta Oficial No. 10416',
    branchSlug: 'derecho-inmobiliario',
    branchName: 'Derecho Inmobiliario',
  },
  // 8. Ley 155-17 complementa el Código Penal
  {
    id: 'rel-8',
    sourceNorm: {
      slug: 'ley-155-17-lavado-activos',
      number: 'Ley 155-17',
      name: 'Ley contra el Lavado de Activos y Financiamiento del Terrorismo',
      type: 'LEY_ESPECIAL',
      date: '2017-06-01',
    },
    targetNorm: {
      slug: 'codigo-penal-dominicano',
      number: 'Ley 74-25 / Dec-Ley 1884',
      name: 'Código Penal Dominicano',
      type: 'CODIGO',
      statusEffect: 'COMPLEMENTADA',
    },
    relationType: 'COMPLEMENTS',
    relationLabel: 'Complementa con Tipos Penales Especiales',
    description: 'Establece obligaciones de prevención a sujetos obligados financieros y no financieros (abogados, notarios) e incorpora sanciones autónomas.',
    articlesAffected: ['Régimen penal especial'],
    officialGacetaRef: 'Gaceta Oficial No. 10884',
    branchSlug: 'derecho-penal',
    branchName: 'Derecho Penal',
  },
];

export async function getAllLegalRelations(): Promise<LegalRelationItem[]> {
  return DOMINICAN_LEGAL_RELATIONS;
}