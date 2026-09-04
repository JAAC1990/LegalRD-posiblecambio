'use client';

import { useState } from 'react';
import Link from 'next/link';
import { DOMINICAN_LEGAL_GRAPH, GraphNode, GraphEdge, GraphNodeType } from '@/lib/data/graphData';
import {
  GitFork,
  BookOpen,
  Scale,
  FileText,
  Layers,
  ArrowRight,
  ExternalLink,
  Sparkles,
  Search,
  Filter,
  Info
} from 'lucide-react';

const NODE_TYPE_LABELS: Record<GraphNodeType, { label: string; badgeColor: string }> = {
  CONCEPT: { label: 'Concepto Jurídico', badgeColor: 'bg-amber-100 text-amber-900 border-amber-300' },
  ARTICLE: { label: 'Artículo de Ley', badgeColor: 'bg-emerald-100 text-emerald-900 border-emerald-300' },
  NORM: { label: 'Código / Ley Matriz', badgeColor: 'bg-indigo-100 text-indigo-900 border-indigo-300' },
  CASE_LAW: { label: 'Jurisprudencia SCJ/TC', badgeColor: 'bg-purple-100 text-purple-900 border-purple-300' },
  PROCEDURE: { label: 'Procedimiento Judicial', badgeColor: 'bg-rose-100 text-rose-900 border-rose-300' },
  DOCUMENT: { label: 'Modelo / Documento', badgeColor: 'bg-blue-100 text-blue-900 border-blue-300' },
};

export default function GrafoJuridicoPage() {
  const [selectedNodeId, setSelectedNodeId] = useState<string>('node-concept-resp-civil');
  const [filterType, setFilterType] = useState<string>('ALL');
  const [searchTerm, setSearchTerm] = useState<string>('');

  const selectedNode = DOMINICAN_LEGAL_GRAPH.nodes.find((n) => n.id === selectedNodeId) || DOMINICAN_LEGAL_GRAPH.nodes[0];

  // Conexiones salientes y entrantes del nodo seleccionado
  const connectedEdges = DOMINICAN_LEGAL_GRAPH.edges.filter(
    (e) => e.source === selectedNodeId || e.target === selectedNodeId
  );

  const connectedNodeIds = new Set<string>();
  connectedEdges.forEach((e) => {
    connectedNodeIds.add(e.source);
    connectedNodeIds.add(e.target);
  });
  connectedNodeIds.delete(selectedNodeId);

  const connectedNodes = DOMINICAN_LEGAL_GRAPH.nodes.filter((n) => connectedNodeIds.has(n.id));

  // Nodos filtrados para la cuadrícula interactiva
  const filteredNodes = DOMINICAN_LEGAL_GRAPH.nodes.filter((node) => {
    const matchesType = filterType === 'ALL' || node.nodeType === filterType;
    const matchesSearch =
      !searchTerm ||
      node.label.toLowerCase().includes(searchTerm.toLowerCase()) ||
      node.specialtyName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      node.details.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesType && matchesSearch;
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8 w-full">
      {/* Cabecera */}
      <div className="text-center max-w-3xl mx-auto space-y-4">
        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-purple-50 border border-purple-200 text-purple-800 text-xs font-semibold uppercase tracking-wider">
          <GitFork className="w-4 h-4 text-purple-600" />
          <span>Visualizador Transversal del Ordenamiento</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-serif font-bold text-slate-900">
          Grafo Jurídico Interactivo Dominicano
        </h1>
        <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
          Explora de forma visual las conexiones orgánicas entre Artículos, Leyes, Jurisprudencia, Conceptos Doctrinales, Procedimientos y Modelos Documentales.
        </p>
      </div>

      {/* Barra de Filtros y Búsqueda */}
      <div className="bg-white p-4 rounded-3xl border border-slate-200 shadow-xs flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="flex flex-wrap items-center gap-1.5 w-full md:w-auto">
          <button
            onClick={() => setFilterType('ALL')}
            className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-colors cursor-pointer ${
              filterType === 'ALL'
                ? 'bg-slate-900 text-white'
                : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
            }`}
          >
            Todos los Nodos ({DOMINICAN_LEGAL_GRAPH.nodes.length})
          </button>
          {(['CONCEPT', 'ARTICLE', 'NORM', 'CASE_LAW', 'PROCEDURE', 'DOCUMENT'] as GraphNodeType[]).map((t) => (
            <button
              key={t}
              onClick={() => setFilterType(t)}
              className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-colors cursor-pointer ${
                filterType === t
                  ? 'bg-slate-900 text-white'
                  : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
              }`}
            >
              {NODE_TYPE_LABELS[t].label}
            </button>
          ))}
        </div>

        <div className="relative w-full md:w-72">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5 pointer-events-none" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Filtrar por nombre o materia..."
            className="w-full pl-9 pr-4 py-1.5 text-xs rounded-xl border border-slate-200 focus:outline-hidden focus:ring-2 focus:ring-slate-900"
          />
        </div>
      </div>

      {/* Visualizador Principal: Panel Central y Explorador */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Lista de Nodos Disponibles (5 Columnas) */}
        <div className="lg:col-span-5 bg-white p-5 rounded-3xl border border-slate-200 shadow-xs space-y-4 max-h-[700px] overflow-y-auto">
          <h2 className="text-xs font-bold uppercase tracking-widest text-slate-500 flex items-center gap-1.5">
            <Layers className="w-4 h-4 text-amber-600" />
            <span>Nodos del Conocimiento ({filteredNodes.length})</span>
          </h2>

          <div className="space-y-2.5">
            {filteredNodes.map((node) => {
              const isSelected = node.id === selectedNodeId;
              const typeInfo = NODE_TYPE_LABELS[node.nodeType];

              return (
                <button
                  key={node.id}
                  onClick={() => setSelectedNodeId(node.id)}
                  className={`w-full text-left p-3.5 rounded-2xl border transition-all cursor-pointer flex flex-col gap-1.5 ${
                    isSelected
                      ? 'bg-amber-50/80 border-amber-400 shadow-xs'
                      : 'bg-white border-slate-200 hover:border-slate-300 hover:bg-slate-50/60'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className={`text-[10px] font-bold px-2 py-0.5 rounded-md border ${typeInfo.badgeColor}`}>
                      {typeInfo.label}
                    </span>
                    <span className="text-[10px] text-slate-400 font-medium">
                      {node.specialtyName}
                    </span>
                  </div>
                  <span className="font-serif font-bold text-sm text-slate-900">
                    {node.label}
                  </span>
                  <span className="text-[11px] text-slate-500 line-clamp-1">
                    {node.details}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Panel del Nodo Seleccionado y su Mapa de Relaciones (7 Columnas) */}
        <div className="lg:col-span-7 space-y-6">
          {/* Tarjeta del Nodo Activo */}
          <div className="bg-white p-6 sm:p-8 rounded-3xl border-2 border-slate-900 shadow-sm space-y-4">
            <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-100 pb-3">
              <span className={`text-xs font-bold px-3 py-1 rounded-full border ${NODE_TYPE_LABELS[selectedNode.nodeType].badgeColor}`}>
                {NODE_TYPE_LABELS[selectedNode.nodeType].label}
              </span>
              <span className="text-xs text-slate-500 font-medium">
                Rama: {selectedNode.specialtyName}
              </span>
            </div>

            <div className="space-y-2">
              <h3 className="font-serif font-extrabold text-2xl text-slate-900">
                {selectedNode.label}
              </h3>
              <p className="text-xs sm:text-sm text-slate-700 leading-relaxed font-serif bg-slate-50 p-4 rounded-2xl border border-slate-200/80">
                {selectedNode.details}
              </p>
            </div>

            {selectedNode.url && (
              <div className="pt-2 flex justify-end">
                <Link
                  href={selectedNode.url}
                  className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-amber-400 text-xs font-bold transition-colors"
                >
                  <span>Abrir Documento / Ficha Oficial</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </Link>
              </div>
            )}
          </div>

          {/* Relaciones Conectadas (Aristas) */}
          <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-xs space-y-4">
            <h4 className="text-xs font-bold uppercase tracking-widest text-slate-500 flex items-center gap-1.5">
              <GitFork className="w-4 h-4 text-purple-600" />
              <span>Conexiones Jurídicas Directas ({connectedEdges.length})</span>
            </h4>

            {connectedEdges.length === 0 ? (
              <p className="text-xs text-slate-400 italic">No hay conexiones registradas para este nodo.</p>
            ) : (
              <div className="space-y-3">
                {connectedEdges.map((edge) => {
                  const isSource = edge.source === selectedNodeId;
                  const otherNodeId = isSource ? edge.target : edge.source;
                  const otherNode = DOMINICAN_LEGAL_GRAPH.nodes.find((n) => n.id === otherNodeId);
                  if (!otherNode) return null;

                  return (
                    <div
                      key={edge.id}
                      className="p-4 rounded-2xl bg-slate-50 border border-slate-200/80 flex flex-col sm:flex-row sm:items-center justify-between gap-3"
                    >
                      <div className="space-y-1">
                        <div className="flex items-center gap-2 text-xs font-semibold">
                          <span className="text-amber-800 bg-amber-100/70 px-2 py-0.5 rounded-md text-[10px]">
                            {edge.relationLabel}
                          </span>
                          <span className="text-slate-400">→</span>
                          <span className="text-slate-900 font-serif font-bold">
                            {otherNode.label}
                          </span>
                        </div>
                        <p className="text-[11px] text-slate-500">
                          {otherNode.details}
                        </p>
                      </div>

                      <button
                        onClick={() => setSelectedNodeId(otherNode.id)}
                        className="self-end sm:self-center shrink-0 px-3 py-1.5 rounded-xl bg-white hover:bg-slate-100 border border-slate-300 text-[11px] font-bold text-slate-700 transition-colors cursor-pointer flex items-center gap-1"
                      >
                        <span>Navegar a este nodo</span>
                        <ArrowRight className="w-3 h-3" />
                      </button>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
