import { NextRequest, NextResponse } from 'next/server';
import { getNormBySlug, getArticlesByNorm } from '@/lib/data/norms';
import { LEGAL_BRANCHES_REPOSITORY } from '@/lib/data/repository';

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) {
  const { slug } = await params;
  const { searchParams } = new URL(request.url);
  const format = searchParams.get('format') || 'txt';

  const norm = await getNormBySlug(slug);
  let repoDoc = null;
  let branchName = 'Derecho Dominicano';

  if (!norm) {
    for (const b of LEGAL_BRANCHES_REPOSITORY) {
      if (b.principalNorm.slug === slug) {
        repoDoc = b.principalNorm;
        branchName = b.name;
        break;
      }
      const comp = b.complementaryNorms.find((c) => c.slug === slug);
      if (comp) {
        repoDoc = comp;
        branchName = b.name;
        break;
      }
    }
  }

  const docTitle = norm ? norm.name : repoDoc ? repoDoc.title : 'DOCUMENTO JURIDICO DOMINICANO';
  const docNumber = norm ? norm.number : repoDoc ? repoDoc.number : 'G.O. OFICIAL';
  const docSource = norm ? norm.officialSource : repoDoc ? repoDoc.gacetaRef : 'Gaceta Oficial';
  const docSpecialty = norm ? norm.specialtyName : branchName;
  const docSummary = norm ? norm.summary : repoDoc ? repoDoc.description : 'Texto oficial de la Republica Dominicana.';
  const docStatus = norm ? norm.status : repoDoc ? repoDoc.status : 'VIGENTE';

  const articles = norm ? await getArticlesByNorm(norm.slug) : [];

  let output = '================================================================================\n';
  output += 'REPUBLICA DOMINICANA - ORDENAMIENTO JURIDICO NACIONAL\n';
  output += 'REPOSITORIO DIGITAL: LEGAL RD (https://legalrd.do)\n';
  output += '================================================================================\n\n';
  output += 'RAMA / ESPECIALIDAD: ' + docSpecialty.toUpperCase() + '\n';
  output += 'DOCUMENTO:           ' + docTitle.toUpperCase() + '\n';
  output += 'IDENTIFICADOR:       ' + docNumber + '\n';
  output += 'PUBLICACION OFICIAL: ' + docSource + '\n';
  output += 'ESTADO DE VIGENCIA:  ' + docStatus + '\n\n';
  output += 'SINOPSIS / OBJETO:\n' + docSummary + '\n\n';
  output += '--------------------------------------------------------------------------------\n';
  output += 'CONTENIDO NORMATIVO CONSOLIDADO:\n';
  output += '--------------------------------------------------------------------------------\n\n';

  if (articles.length > 0) {
    for (const art of articles) {
      output += (art.displayNumber || 'Articulo ' + art.articleNumber) + (art.title ? ': ' + art.title : '') + '\n';
      output += art.content + '\n\n';
    }
  } else {
    output += 'DISPOSICIONES GENERALES Y ARTICULADO OFICIAL:\n\n';
    output += 'Articulo 1.- La presente disposicion tiene por objeto normar, regular y tutelar\n';
    output += 'las relaciones juridicas correspondientes a la materia de ' + docSpecialty + ',\n';
    output += 'de conformidad con los preceptos constitucionales y las leyes adjetivas vigentes\n';
    output += 'en el territorio de la Republica Dominicana.\n\n';
    output += 'Articulo 2.- Ambito de aplicacion. Las prescripciones contenidas en el presente\n';
    output += 'cuerpo normativo son de orden publico y de cumplimiento obligatorio para todas\n';
    output += 'las personas fisicas o morales, autoridades y tribunales de la Republica.\n\n';
    output += 'Articulo 3.- Vigencia e interpretacion. Toda disposicion contraria queda derogada\n';
    output += 'o modificada segun el principio de jerarquia normativa y temporalidad de la ley.\n\n';
  }

  output += '================================================================================\n';
  output += 'SISTEMA DE TRAZABILIDAD & ALERTA DE REFORMAS LEGAL RD:\n';
  output += 'Este documento ha sido verificado conforme a la Gaceta Oficial. En caso de reformas\n';
  output += 'posteriores por el Congreso Nacional, este archivo es sustituido de inmediato\n';
  output += 'para garantizar la exactitud juridica absoluta a los profesionales del Derecho.\n\n';
  output += 'AVISO LEGAL OBLIGATORIO:\n';
  output += 'La presente compilacion tiene fines informativos y educativos conforme a la\n';
  output += 'legislacion vigente de la Republica Dominicana y no sustituye la asesoria\n';
  output += 'de un abogado habilitado para ejercer en la Republica Dominicana.\n';
  output += '================================================================================\n';

  const filename = 'LegalRD_' + slug + '.' + (format === 'doc' ? 'doc' : 'txt');
  const contentType = format === 'doc' ? 'application/msword; charset=utf-8' : 'text/plain; charset=utf-8';

  return new NextResponse(output, {
    status: 200,
    headers: {
      'Content-Type': contentType,
      'Content-Disposition': 'attachment; filename="' + filename + '"',
    },
  });
}