import Link from 'next/link';
import { getAllClients } from '@/lib/data/caseFiles';
import { Users, Phone, Mail, MapPin, FolderKanban, ArrowRight, ArrowLeft } from 'lucide-react';

export default async function ClientesPage() {
  const clients = await getAllClients();

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8 w-full">
      {/* Botón Volver */}
      <Link
        href="/expedientes"
        className="inline-flex items-center gap-2 text-xs font-semibold text-slate-600 hover:text-slate-900 bg-white border border-slate-200 px-3.5 py-2 rounded-xl shadow-2xs hover:bg-slate-50 transition-colors w-fit"
      >
        <ArrowLeft className="w-4 h-4" />
        <span>Volver a Expedientes</span>
      </Link>

      {/* Cabecera */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-200 pb-6">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 border border-blue-200 text-blue-800 text-xs font-semibold uppercase tracking-wider mb-2">
            <Users className="w-3.5 h-3.5 text-blue-600" />
            <span>Gestión Profesional de Clientes</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-serif font-bold text-slate-900">
            Directorio de Clientes y Poderdantes
          </h1>
          <p className="text-xs sm:text-sm text-slate-500">
            Personas físicas y morales con contratos de representación y expedientes activos.
          </p>
        </div>
      </div>

      {/* Grid de Clientes */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {clients.map((cli) => (
          <div
            key={cli.id}
            className="p-6 rounded-3xl bg-white border border-slate-200 shadow-2xs hover:shadow-md transition-all flex flex-col justify-between space-y-4"
          >
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-slate-100 text-slate-700">
                  {cli.clientType.replace('_', ' ')}
                </span>
                <span className="text-xs font-bold text-amber-700 bg-amber-50 px-2 py-0.5 rounded-lg border border-amber-200">
                  {cli.activeCasesCount} {cli.activeCasesCount === 1 ? 'Expediente' : 'Expedientes'}
                </span>
              </div>

              <div>
                <h2 className="font-serif font-bold text-base text-slate-900 leading-snug">
                  {cli.fullName}
                </h2>
                <span className="text-xs text-slate-400 font-mono">
                  ID / RNC: {cli.identificationNumber}
                </span>
              </div>

              <div className="space-y-1.5 text-xs text-slate-600 pt-2 border-t border-slate-100">
                <p className="flex items-center gap-2">
                  <Phone className="w-3.5 h-3.5 text-slate-400" />
                  <span>{cli.phone}</span>
                </p>
                <p className="flex items-center gap-2">
                  <Mail className="w-3.5 h-3.5 text-slate-400" />
                  <span className="truncate">{cli.email}</span>
                </p>
                <p className="flex items-start gap-2">
                  <MapPin className="w-3.5 h-3.5 text-slate-400 shrink-0 mt-0.5" />
                  <span className="line-clamp-1">{cli.address}</span>
                </p>
              </div>
            </div>

            <Link
              href="/expedientes"
              className="w-full py-2 px-3 rounded-xl bg-slate-50 hover:bg-slate-100 border border-slate-200 text-xs font-semibold text-slate-800 flex items-center justify-between transition-colors"
            >
              <span>Ver Expedientes Vinculados</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}
