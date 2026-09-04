/**
 * ====================================================================
 * LEGAL RD — SISTEMA OPERATIVO JURÍDICO DOMINICANO
 * ====================================================================
 * Módulo: Índice de Documentos y Recursos Descargables
 * Ruta: src/lib/data/downloads.ts
 * Ámbito Legal: Gestión Documental
 * 
 * PROPÓSITO:
 * Estructuras de metadatos para archivos en formato PDF, Word y texto enriquecido para uso forense y académico.
 * 
 * FUNDAMENTOS NORMATIVOS:
 * Publicaciones oficiales dominicanas.
 * 
 * REGLA FUNDAMENTAL DE PRESERVACIÓN ACUMULATIVA:
 * Este archivo forma parte del ecosistema integral de Legal RD.
 * No se permite eliminar, simplificar ni alterar la lógica preexistente.
 * ====================================================================
 */

/**
 * Interfaz: `LegalDocumentDownload`
 * Modela la estructura de datos para LegalDocumentDownload en el ecosistema jurídico de Legal RD.
 */
export interface LegalDocumentDownload {
  id: string;
  slug: string;
  number: string;
  title: string;
  specialty: string;
  specialtySlug: string;
  normType: string;
  gacetaRef: string;
  promulgationDate: string;
  pagesCount: number;
  fileSizeText: string;
  description: string;
  downloadFormats: {
    format: 'TXT' | 'PDF' | 'DOCX';
    url: string;
    isOfficialGaceta?: boolean;
  }[];
}

/**
 * Catálogo Maestro / Constante: `OFFICIAL_DOWNLOAD_REPOSITORY`
 * Datos estructurados y verificados del ordenamiento jurídico de la República Dominicana.
 */
export const OFFICIAL_DOWNLOAD_REPOSITORY: LegalDocumentDownload[] = [
  {
    id: 'doc-16-92',
    slug: 'codigo-de-trabajo-ley-16-92',
    number: 'Ley 16-92',
    title: 'Código de Trabajo de la República Dominicana',
    specialty: 'Derecho Laboral',
    specialtySlug: 'derecho-laboral',
    normType: 'Código',
    gacetaRef: 'Gaceta Oficial No. 9836',
    promulgationDate: '29 de mayo de 1992',
    pagesCount: 168,
    fileSizeText: '1.4 MB',
    description: 'Texto consolidado del Código de Trabajo con todas sus reformas y reglamentos de aplicación (Dec. 258-93).',
    downloadFormats: [
      { format: 'TXT', url: '/api/export/codigo-de-trabajo-ley-16-92?format=txt' },
      { format: 'DOCX', url: '/api/export/codigo-de-trabajo-ley-16-92?format=doc' },
      { format: 'PDF', url: 'https://www.consultoria.gov.do', isOfficialGaceta: true },
    ],
  },
  {
    id: 'doc-108-05',
    slug: 'ley-108-05-registro-inmobiliario',
    number: 'Ley 108-05',
    title: 'Ley de Registro Inmobiliario de la República Dominicana',
    specialty: 'Derecho Inmobiliario',
    specialtySlug: 'derecho-inmobiliario',
    normType: 'Ley Ordinaria',
    gacetaRef: 'Gaceta Oficial No. 10316',
    promulgationDate: '23 de marzo de 2005',
    pagesCount: 54,
    fileSizeText: '620 KB',
    description: 'Norma rectora del saneamiento, deslinde, mensuras catastrales y registro de títulos de propiedad inmobiliaria.',
    downloadFormats: [
      { format: 'TXT', url: '/api/export/ley-108-05-registro-inmobiliario?format=txt' },
      { format: 'DOCX', url: '/api/export/ley-108-05-registro-inmobiliario?format=doc' },
      { format: 'PDF', url: 'https://www.consultoria.gov.do', isOfficialGaceta: true },
    ],
  },
  {
    id: 'doc-107-13',
    slug: 'ley-107-13-procedimiento-administrativo',
    number: 'Ley 107-13',
    title: 'Ley sobre Derechos de las Personas en sus Relaciones con la Administración',
    specialty: 'Derecho Administrativo',
    specialtySlug: 'derecho-administrativo',
    normType: 'Ley Ordinaria',
    gacetaRef: 'Gaceta Oficial No. 10722',
    promulgationDate: '6 de agosto de 2013',
    pagesCount: 38,
    fileSizeText: '480 KB',
    description: 'Estatuto de garantías del administrado, debido proceso administrativo y deberes de la administración pública.',
    downloadFormats: [
      { format: 'TXT', url: '/api/export/ley-107-13-procedimiento-administrativo?format=txt' },
      { format: 'DOCX', url: '/api/export/ley-107-13-procedimiento-administrativo?format=doc' },
      { format: 'PDF', url: 'https://www.consultoria.gov.do', isOfficialGaceta: true },
    ],
  },
  {
    id: 'doc-const',
    slug: 'constitucion-republica-dominicana',
    number: 'Const. 2015/2024',
    title: 'Constitución Política de la República Dominicana',
    specialty: 'Derecho Constitucional',
    specialtySlug: 'derecho-constitucional',
    normType: 'Constitución',
    gacetaRef: 'Gaceta Oficial No. 10805',
    promulgationDate: '13 de junio de 2015',
    pagesCount: 112,
    fileSizeText: '1.1 MB',
    description: 'Carta Magna y norma suprema del ordenamiento jurídico dominicano proclamada por la Asamblea Revisora.',
    downloadFormats: [
      { format: 'TXT', url: '/api/export/constitucion-republica-dominicana?format=txt' },
      { format: 'DOCX', url: '/api/export/constitucion-republica-dominicana?format=doc' },
      { format: 'PDF', url: 'https://www.consultoria.gov.do', isOfficialGaceta: true },
    ],
  },
  {
    id: 'doc-479-08',
    slug: 'ley-479-08-sociedades-comerciales',
    number: 'Ley 479-08',
    title: 'Ley General de las Sociedades Comerciales y Empresas Individuales',
    specialty: 'Derecho Societario',
    specialtySlug: 'derecho-societario',
    normType: 'Ley Ordinaria',
    gacetaRef: 'Gaceta Oficial No. 10498',
    promulgationDate: '11 de diciembre de 2008',
    pagesCount: 145,
    fileSizeText: '1.2 MB',
    description: 'Régimen de sociedades de responsabilidad limitada (SRL), sociedades anónimas, SAS y EIRL con reformas de la Ley 31-11.',
    downloadFormats: [
      { format: 'TXT', url: '/api/export/ley-479-08-sociedades-comerciales?format=txt' },
      { format: 'DOCX', url: '/api/export/ley-479-08-sociedades-comerciales?format=doc' },
      { format: 'PDF', url: 'https://www.consultoria.gov.do', isOfficialGaceta: true },
    ],
  },
];

/**
 * Función Operativa: `getAllDownloadableDocuments`
 * Procesa la lógica de negocio y reglas jurídicas correspondientes.
 */
export function getAllDownloadableDocuments(specialtySlug?: string) {
  if (specialtySlug) {
    return OFFICIAL_DOWNLOAD_REPOSITORY.filter((d) => d.specialtySlug === specialtySlug);
  }
  return OFFICIAL_DOWNLOAD_REPOSITORY;
}
