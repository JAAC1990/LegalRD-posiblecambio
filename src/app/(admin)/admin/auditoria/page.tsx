import Link from 'next/link';
import { History, ShieldCheck, User, Calendar, FileText, ArrowLeft } from 'lucide-react';

const DEMO_AUDIT_LOGS = [
  {
    id: 'log-1',
    userName: 'Lic. Administrador Principal',
    userRole: 'SUPER_ADMIN',
    action: 'ACTUALIZAR_ARTÍCULO',
    entity: 'Código de Trabajo (Ley 16-92)',
    detail: 'Modificación del Art. 80: Agregada escala reformada de cesantía conforme a la G.O. 9836.',
    date: '26/08/2026 23:45:10',
    ip: '192.168.100.79 (Local)',
  },
  {
    id: 'log-2',
    userName: 'Lic. Administrador Principal',
    userRole: 'SUPER_ADMIN',
    action: 'CREAR_ESPECIALIDAD',
    entity: 'Especialidades Jurídicas',
    detail: 'Registro oficial de las 19 ramas del Derecho Dominicano con sus iconos correspondientes.',
    date: '26/08/2026 23:40:02',
    ip: '192.168.100.79 (Local)',
  },
  {
    id: 'log-3',
    userName: 'Lic. Administrador Principal',
    userRole: 'SUPER_ADMIN',
    action: 'CATALOGAR_NORMA',
    entity: 'Ley 108-05 de Registro Inmobiliario',
    detail: 'Creación de ficha técnica de la ley con metadatos de Gaceta Oficial No. 10316.',
    date: '26/08/2026 23:35:15',
    ip: '192.168.100.79 (Local)',
  },
];

export default function AdminAuditoriaPage() {
  return (
    <div className="space-y-6 max-w-6xl">
      <div className="flex items-center gap-3">
        <Link
          href="/admin"
          className="p-2 rounded-xl text-slate-500 hover:text-slate-900 bg-white border border-slate-200"
        >
          <ArrowLeft className="w-4 h-4" />
        </Link>
        <div>
          <div className="flex items-center gap-2">
            <History className="w-6 h-6 text-rose-600" />
            <h1 className="text-2xl font-serif font-bold text-slate-900">
              Registro de Auditoría & Trazabilidad
            </h1>
          </div>
          <p className="text-xs text-slate-500 mt-1">
            Historial inmutable de modificaciones y acciones administrativas en el ordenamiento jurídico.
          </p>
        </div>
      </div>

      <div className="bg-white rounded-2xl border border-slate-200 shadow-xs overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse text-xs">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-200 text-slate-500 font-semibold uppercase tracking-wider">
                <th className="py-3.5 px-4">Fecha y Hora</th>
                <th className="py-3.5 px-4">Usuario</th>
                <th className="py-3.5 px-4">Acción</th>
                <th className="py-3.5 px-4">Registro Afectado</th>
                <th className="py-3.5 px-4">Detalle del Cambio</th>
                <th className="py-3.5 px-4">Dirección IP</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {DEMO_AUDIT_LOGS.map((log) => (
                <tr key={log.id} className="hover:bg-slate-50/80 transition-colors">
                  <td className="py-3.5 px-4 text-slate-400 font-mono">
                    {log.date}
                  </td>
                  <td className="py-3.5 px-4">
                    <div className="font-semibold text-slate-900">{log.userName}</div>
                    <span className="text-[10px] text-amber-700 bg-amber-50 px-1.5 py-0.5 rounded-md font-mono">
                      {log.userRole}
                    </span>
                  </td>
                  <td className="py-3.5 px-4 font-semibold text-slate-800">
                    {log.action}
                  </td>
                  <td className="py-3.5 px-4 text-slate-700 font-medium">
                    {log.entity}
                  </td>
                  <td className="py-3.5 px-4 text-slate-500 max-w-xs">
                    {log.detail}
                  </td>
                  <td className="py-3.5 px-4 font-mono text-[11px] text-slate-400">
                    {log.ip}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
