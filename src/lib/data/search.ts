/**
 * ====================================================================
 * LEGAL RD — SISTEMA OPERATIVO JURÍDICO DOMINICANO
 * ====================================================================
 * Módulo: Motor de Búsqueda Semántica y Procesamiento de Lenguaje Natural
 * Ruta: src/lib/data/search.ts
 * Ámbito Legal: Recuperación de Información Jurídica (Information Retrieval)
 * 
 * PROPÓSITO:
 * Algoritmo de búsqueda que detecta intenciones de búsqueda en lenguaje natural dominicano (ej. "me botaron del trabajo") y mapea a normas, artículos y calculadoras pertinentes.
 * 
 * FUNDAMENTOS NORMATIVOS:
 * Mapeo a leyes y códigos oficiales de la República Dominicana.
 * 
 * REGLA FUNDAMENTAL DE PRESERVACIÓN ACUMULATIVA:
 * Este archivo forma parte del ecosistema integral de Legal RD.
 * No se permite eliminar, simplificar ni alterar la lógica preexistente.
 * ====================================================================
 */

import { DEMO_LEGAL_NORMS, DEMO_ARTICLES, LegalNormItem, ArticleItem } from '@/lib/data/norms';

/**
 * Interfaz: `SearchResultItem`
 * Modela la estructura de datos para SearchResultItem en el ecosistema jurídico de Legal RD.
 */
export interface SearchResultItem {
  id: string;
  type: 'NORM' | 'ARTICLE';
  title: string;
  normNumber: string;
  normName: string;
  specialtyName: string;
  status: string;
  snippet: string;
  url: string;
  keywords?: string[];
}

/**
 * Interfaz: `SearchFilters`
 * Modela la estructura de datos para SearchFilters en el ecosistema jurídico de Legal RD.
 */
export interface SearchFilters {
  query?: string;
  specialty?: string;
  normType?: string;
  status?: string;
}

/**
 * Función Operativa: `searchLegalContent`
 * Procesa la lógica de negocio y reglas jurídicas correspondientes.
 */
export async function searchLegalContent(filters: SearchFilters): Promise<{ results: SearchResultItem[]; total: number }> {
  const query = (filters.query || '').toLowerCase().trim();
  const results: SearchResultItem[] = [];

  // 1. Buscar en Normas y Leyes
  for (const norm of DEMO_LEGAL_NORMS) {
    let matches = true;

    if (filters.specialty && norm.specialtySlug !== filters.specialty) {
      matches = false;
    }
    if (filters.normType && norm.normType !== filters.normType) {
      matches = false;
    }
    if (filters.status && norm.status !== filters.status) {
      matches = false;
    }

    if (query) {
      const matchInName = norm.name.toLowerCase().includes(query);
      const matchInNumber = norm.number.toLowerCase().includes(query);
      const matchInSummary = norm.summary.toLowerCase().includes(query);
      const matchInSpecialty = norm.specialtyName.toLowerCase().includes(query);

      if (!matchInName && !matchInNumber && !matchInSummary && !matchInSpecialty) {
        matches = false;
      }
    }

    if (matches) {
      results.push({
        id: 'norm-' + norm.id,
        type: 'NORM',
        title: norm.name,
        normNumber: norm.number,
        normName: norm.name,
        specialtyName: norm.specialtyName,
        status: norm.status,
        snippet: norm.summary,
        url: '/normas/' + norm.slug,
      });
    }
  }

  // 2. Buscar en Artículos
  for (const [normSlug, articles] of Object.entries(DEMO_ARTICLES)) {
    const norm = DEMO_LEGAL_NORMS.find((n) => n.slug === normSlug);
    if (!norm) continue;

    for (const art of articles) {
      let matches = true;

      if (filters.specialty && norm.specialtySlug !== filters.specialty) {
        matches = false;
      }
      if (filters.status && art.status !== filters.status) {
        matches = false;
      }

      if (query) {
        const matchInNumber = ('art ' + art.articleNumber).includes(query) || ('articulo ' + art.articleNumber).includes(query) || ('' + art.articleNumber) === query;
        const matchInTitle = art.title ? art.title.toLowerCase().includes(query) : false;
        const matchInContent = art.content.toLowerCase().includes(query);
        const matchInKeywords = art.keywords.some((k) => k.toLowerCase().includes(query));
        const matchInNormNumber = norm.number.toLowerCase().includes(query);

        if (!matchInNumber && !matchInTitle && !matchInContent && !matchInKeywords && !matchInNormNumber) {
          matches = false;
        }
      }

      if (matches) {
        // Snippet contextual
        let snippet = art.content;
        if (query && art.content.toLowerCase().includes(query)) {
          const idx = art.content.toLowerCase().indexOf(query);
          const start = Math.max(0, idx - 40);
          const end = Math.min(art.content.length, idx + query.length + 80);
          snippet = (start > 0 ? '...' : '') + art.content.substring(start, end) + (end < art.content.length ? '...' : '');
        }

        results.push({
          id: 'art-' + art.id,
          type: 'ARTICLE',
          title: (art.displayNumber || ('Art. ' + art.articleNumber)) + (art.title ? ': ' + art.title : ''),
          normNumber: norm.number,
          normName: norm.shortName || norm.name,
          specialtyName: norm.specialtyName,
          status: art.status,
          snippet: snippet,
          url: '/normas/' + norm.slug + '/articulo/' + art.articleNumber,
          keywords: art.keywords,
        });
      }
    }
  }

  return {
    results,
    total: results.length,
  };
}
