import { db } from '@/lib/db';
import { COMPLETE_LABOR_CODE_ARTICLES } from './labor_code_complete';

export interface LegalNormItem {
  id: string;
  number: string;
  name: string;
  shortName: string | null;
  slug: string;
  normType: string;
  status: string;
  specialtyName: string;
  specialtySlug: string;
  promulgationDate: string | null;
  publicationDate: string | null;
  effectiveDate: string | null;
  officialSource: string;
  summary: string;
  articlesCount: number;
  remarks?: string | null;
}

export interface ArticleItem {
  id: string;
  normSlug: string;
  normName: string;
  normNumber: string;
  articleNumber: number;
  articleNumberSub: string;
  displayNumber: string;
  title: string | null;
  content: string;
  status: string;
  keywords: string[];
  isKeyArticle?: boolean;
  libroStructure?: string;
  structureDesc?: string;
  versions?: ArticleVersionItem[];
  caseLaws?: {
    id: string;
    sentenceNumber: string;
    courtName: string;
    doctrine: string;
    judgmentDate: string;
  }[];
}

export interface ArticleVersionItem {
  id: string;
  versionNumber: number;
  previousContent: string;
  newContent: string;
  modificationDate: string;
  modifyingNormRef: string;
  reasonSummary: string | null;
}

export const DEMO_LEGAL_NORMS: LegalNormItem[] = [
  {
    id: 'norm-1',
    number: '16-92',
    name: 'Código de Trabajo de la República Dominicana',
    shortName: 'Código de Trabajo',
    slug: 'codigo-de-trabajo-ley-16-92',
    normType: 'CODE',
    status: 'VIGENTE',
    specialtyName: 'Derecho Laboral',
    specialtySlug: 'derecho-laboral',
    promulgationDate: '1992-05-29',
    publicationDate: '1992-05-31',
    effectiveDate: '1992-06-15',
    officialSource: 'Gaceta Oficial No. 9836',
    summary: 'Cuerpo normativo rector de las relaciones laborales individuales y colectivas entre empleadores y trabajadores.',
    articlesCount: 738,
    remarks: 'Texto oficial consolidado con 738 artículos organizados en Libros I al IX.',
  },
  {
    id: 'norm-2',
    number: '108-05',
    name: 'Ley de Registro Inmobiliario de la República Dominicana',
    shortName: 'Ley de Registro Inmobiliario',
    slug: 'ley-108-05-registro-inmobiliario',
    normType: 'LAW',
    status: 'VIGENTE',
    specialtyName: 'Derecho Inmobiliario',
    specialtySlug: 'derecho-inmobiliario',
    promulgationDate: '2005-03-23',
    publicationDate: '2005-04-02',
    effectiveDate: '2007-04-04',
    officialSource: 'Gaceta Oficial No. 10316',
    summary: 'Regula el registro de los derechos reales inmobiliarios, saneamiento, deslinde y organización de la Jurisdicción Inmobiliaria.',
    articlesCount: 132,
    remarks: 'Complementada por los Reglamentos Generales de Mensuras y Registro de Títulos.',
  },
  {
    id: 'norm-3',
    number: '107-13',
    name: 'Ley sobre los Derechos de las Personas en sus Relaciones con la Administración',
    shortName: 'Ley de Procedimiento Administrativo',
    slug: 'ley-107-13-procedimiento-administrativo',
    normType: 'LAW',
    status: 'VIGENTE',
    specialtyName: 'Derecho Administrativo',
    specialtySlug: 'derecho-administrativo',
    promulgationDate: '2013-08-06',
    publicationDate: '2013-08-08',
    effectiveDate: '2015-02-08',
    officialSource: 'Gaceta Oficial No. 10722',
    summary: 'Establece los principios rectores de la función administrativa, debido proceso administrativo y tutela judicial efectiva.',
    articlesCount: 65,
    remarks: 'Pilar fundamental de la justicia contenciosa administrativa.',
  },
  {
    id: 'norm-4',
    number: 'Const. 2015/2024',
    name: 'Constitución Política de la República Dominicana',
    shortName: 'Constitución Dominicana',
    slug: 'constitucion-republica-dominicana',
    normType: 'CONSTITUTION',
    status: 'VIGENTE',
    specialtyName: 'Derecho Constitucional',
    specialtySlug: 'derecho-constitucional',
    promulgationDate: '2015-06-13',
    publicationDate: '2015-06-14',
    effectiveDate: '2015-06-13',
    officialSource: 'Gaceta Oficial No. 10805',
    summary: 'Norma suprema del ordenamiento jurídico dominicano, proclama el Estado Social y Democrático de Derecho.',
    articlesCount: 277,
    remarks: 'Revisada y proclamada por la Asamblea Nacional Revisora.',
  },
  {
    id: 'norm-5',
    number: '479-08',
    name: 'Ley General de las Sociedades Comerciales y Empresas Individuales',
    shortName: 'Ley de Sociedades Comerciales',
    slug: 'ley-479-08-sociedades-comerciales',
    normType: 'LAW',
    status: 'MODIFICADA',
    specialtyName: 'Derecho Societario',
    specialtySlug: 'derecho-societario',
    promulgationDate: '2008-12-11',
    publicationDate: '2008-12-15',
    effectiveDate: '2009-06-19',
    officialSource: 'Gaceta Oficial No. 10498',
    summary: 'Régimen societario dominicano: SRL, Sociedades Anónimas, SAS y Empresas Individuales de Responsabilidad Limitada (EIRL).',
    articlesCount: 520,
    remarks: 'Modificada sustancialmente por la Ley 31-11.',
  },
];

export const DEMO_ARTICLES: Record<string, ArticleItem[]> = {
  'codigo-de-trabajo-ley-16-92': COMPLETE_LABOR_CODE_ARTICLES,
};

export async function getAllNorms(filterSpecialty?: string, filterType?: string): Promise<LegalNormItem[]> {
  let list = DEMO_LEGAL_NORMS;
  if (filterSpecialty) {
    list = list.filter((n) => n.specialtySlug === filterSpecialty);
  }
  if (filterType) {
    list = list.filter((n) => n.normType === filterType);
  }
  return list;
}

export async function getNormBySlug(slug: string): Promise<LegalNormItem | null> {
  const norm = DEMO_LEGAL_NORMS.find((n) => n.slug === slug);
  return norm || null;
}

export async function getArticlesByNorm(normSlug: string): Promise<ArticleItem[]> {
  return DEMO_ARTICLES[normSlug] || [];
}

export async function getArticleByNumber(normSlug: string, articleNumber: number): Promise<ArticleItem | null> {
  const articles = DEMO_ARTICLES[normSlug] || [];
  const found = articles.find((a) => a.articleNumber === articleNumber);
  return found || null;
}