export interface ParsedArticle {
  articleNumber: number;
  displayNumber: string;
  title: string | null;
  content: string;
  paragraphs: string[];
  structureLocation: string;
  confidence: 'ALTA' | 'MEDIA' | 'REVISAR';
}

export interface ParseResult {
  totalArticles: number;
  detectedStructure: {
    librosCount: number;
    titulosCount: number;
    capitulosCount: number;
  };
  articles: ParsedArticle[];
  warnings: string[];
  extractionSummary: string;
}

export function parseLegalText(rawText: string): ParseResult {
  const warnings: string[] = [];
  const articles: ParsedArticle[] = [];

  let currentLibro = '';
  let currentTitulo = '';
  let currentCapitulo = '';

  let librosCount = 0;
  let titulosCount = 0;
  let capitulosCount = 0;

  const lines = rawText.split(/\r?\n/);
  let currentArticleNumber: number | null = null;
  let currentArticleDisplay = '';
  let currentArticleTitle: string | null = null;
  let currentArticleLines: string[] = [];
  let currentParagraphs: string[] = [];

  const articleRegex = /^(?:Art[íi]culo|Art\.?)\s*(\d+)(?:[.\s-]+(.*))?$/i;
  const libroRegex = /^LIBRO\s+([IVXLCDM]+|[0-9]+|PRIMERO|SEGUNDO|TERCERO|CUARTO|QUINTO|SEXTO|S[EÉ]PTIMO|OCTAVO|NOVENO|D[EÉ]CIMO)(?:\s*[:.-]\s*(.*))?$/i;
  const tituloRegex = /^T[IÍ]TULO\s+([IVXLCDM]+|[0-9]+|PRIMERO|SEGUNDO|TERCERO|CUARTO|QUINTO|SEXTO|S[EÉ]PTIMO|OCTAVO|NOVENO|D[EÉ]CIMO)(?:\s*[:.-]\s*(.*))?$/i;
  const capituloRegex = /^CAP[IÍ]TULO\s+([IVXLCDM]+|[0-9]+|PRIMERO|SEGUNDO|TERCERO|CUARTO|QUINTO|SEXTO|S[EÉ]PTIMO|OCTAVO|NOVENO|D[EÉ]CIMO)(?:\s*[:.-]\s*(.*))?$/i;
  const parrafoRegex = /^(?:P[AÁ]RRAFO|P[AÁ]RR\.?)\s*(?:I|II|III|IV|V|VI|VII|VIII|IX|X|\d+|[UÚ]NICO)?[:.-]?\s*(.*)$/i;

  function commitCurrentArticle() {
    if (currentArticleNumber !== null) {
      const fullText = currentArticleLines.join('\n').trim();
      const structLoc = [currentLibro, currentTitulo, currentCapitulo].filter(Boolean).join(' > ') || 'Disposiciones Generales';

      articles.push({
        articleNumber: currentArticleNumber,
        displayNumber: currentArticleDisplay || `Art. ${currentArticleNumber}`,
        title: currentArticleTitle,
        content: fullText || 'Contenido normativo no detectado o en blanco.',
        paragraphs: currentParagraphs.length > 0 ? currentParagraphs : [fullText],
        structureLocation: structLoc,
        confidence: fullText.length > 20 ? 'ALTA' : 'REVISAR',
      });
    }
  }

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i].trim();
    if (!line) continue;

    // Detectar Libro
    if (libroRegex.test(line)) {
      currentLibro = line;
      librosCount++;
      continue;
    }

    // Detectar Título
    if (tituloRegex.test(line)) {
      currentTitulo = line;
      titulosCount++;
      continue;
    }

    // Detectar Capítulo
    if (capituloRegex.test(line)) {
      currentCapitulo = line;
      capitulosCount++;
      continue;
    }

    // Detectar inicio de nuevo Artículo
    const artMatch = line.match(articleRegex);
    if (artMatch) {
      commitCurrentArticle();

      currentArticleNumber = parseInt(artMatch[1], 10);
      currentArticleDisplay = `Art. ${currentArticleNumber}`;
      currentArticleLines = [];
      currentParagraphs = [];

      const remainingHeader = (artMatch[2] || '').trim();
      if (remainingHeader) {
        if (remainingHeader.length > 50 || remainingHeader.includes('.')) {
          currentArticleTitle = null;
          currentArticleLines.push(remainingHeader);
        } else {
          currentArticleTitle = remainingHeader;
        }
      } else {
        currentArticleTitle = null;
      }
      continue;
    }

    // Si estamos dentro de un artículo
    if (currentArticleNumber !== null) {
      if (parrafoRegex.test(line)) {
        currentParagraphs.push(line);
      }
      currentArticleLines.push(line);
    }
  }

  // Guardar el último artículo
  commitCurrentArticle();

  if (articles.length === 0) {
    warnings.push('No se detectaron artículos con los formatos estándar ("Artículo 1.-", "Art. 1", etc.).');
  }

  return {
    totalArticles: articles.length,
    detectedStructure: {
      librosCount,
      titulosCount,
      capitulosCount,
    },
    articles,
    warnings,
    extractionSummary: `Extracción completada con éxito. Se identificaron ${articles.length} artículos, ${librosCount} libros, ${titulosCount} títulos y ${capitulosCount} capítulos.`,
  };
}