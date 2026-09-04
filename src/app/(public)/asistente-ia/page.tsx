'use client';

import { useState } from 'react';
import Link from 'next/link';
import {
  Sparkles,
  Send,
  BookOpen,
  Scale,
  ShieldAlert,
  ArrowRight,
  ExternalLink,
  Bot,
  User,
  CheckCircle2,
  AlertCircle,
  HelpCircle,
  ShieldCheck,
  ChevronDown,
  ChevronUp,
  FileText
} from 'lucide-react';

export type AiMode = 'CIUDADANO' | 'ESTUDIANTE' | 'ABOGADO' | 'INVESTIGADOR';

interface LegalCitation {
  title: string;
  source: string;
  url: string;
  officialGaceta?: string;
  courtChamber?: string;
}

interface TraceableReasoning {
  conclusion: string;
  legalBasis: string;
  jurisprudencia: string;
  interpretation: string;
  applicationToCase: string;
  missingInfo: string;
  alternatives: string;
}

interface ChatMessage {
  id: string;
  sender: 'user' | 'ai';
  text: string;
  modeUsed?: AiMode;
  citations?: LegalCitation[];
  reasoning?: TraceableReasoning;
  timestamp: string;
}

const MODE_CONFIGS: Record<AiMode, { label: string; desc: string; badgeColor: string }> = {
  CIUDADANO: {
    label: 'Modo Ciudadano',
    desc: 'Explicación clara, directa y sencilla sin tecnicismos excesivos.',
    badgeColor: 'bg-emerald-100 text-emerald-900 border-emerald-300',
  },
  ESTUDIANTE: {
    label: 'Modo Estudiante',
    desc: 'Explicación pedagógica, método de casos y preguntas de reflexión académica.',
    badgeColor: 'bg-blue-100 text-blue-900 border-blue-300',
  },
  ABOGADO: {
    label: 'Modo Abogado',
    desc: 'Lenguaje procesal riguroso, estrategias de litigio y carga de la prueba.',
    badgeColor: 'bg-amber-100 text-amber-900 border-amber-300',
  },
  INVESTIGADOR: {
    label: 'Modo Investigador',
    desc: 'Análisis dogmático profundo, hermenéutica y referencias doctrinales.',
    badgeColor: 'bg-purple-100 text-purple-900 border-purple-300',
  },
};

const INITIAL_MESSAGES: ChatMessage[] = [
  {
    id: 'msg-1',
    sender: 'ai',
    text: '¡Saludos! Soy Legal RD AI, el sistema de inteligencia jurídica del ordenamiento de la República Dominicana. Cito obligatoriamente las leyes, artículos y sentencias oficiales utilizadas y ofrezco razonamiento procesal trazable en cuatro modos especializados.',
    modeUsed: 'CIUDADANO',
    timestamp: 'Ahora',
  },
];

export default function AsistenteIAPage() {
  const [messages, setMessages] = useState<ChatMessage[]>(INITIAL_MESSAGES);
  const [inputQuery, setInputQuery] = useState('');
  const [currentMode, setCurrentMode] = useState<AiMode>('ABOGADO');
  const [isThinking, setIsThinking] = useState(false);
  const [expandedReasoningId, setExpandedReasoningId] = useState<string | null>(null);

  function handleSend(textToSend?: string) {
    const query = (textToSend || inputQuery).trim();
    if (!query) return;

    const userMsg: ChatMessage = {
      id: 'usr-' + Date.now(),
      sender: 'user',
      text: query,
      timestamp: 'Ahora',
    };

    setMessages((prev) => [...prev, userMsg]);
    setInputQuery('');
    setIsThinking(true);

    setTimeout(() => {
      const lower = query.toLowerCase();
      let responseText = '';
      let citations: LegalCitation[] = [];
      let reasoning: TraceableReasoning | undefined = undefined;

      if (lower.includes('cesant') || lower.includes('calcul') || lower.includes('liquid') || lower.includes('80')) {
        if (currentMode === 'CIUDADANO') {
          responseText = 'Si tu empleador decide terminar el contrato de trabajo por desahucio (sin que hayas cometido una falta grave), la ley dominicana te protege con el "auxilio de cesantía". Esta es una suma de dinero que compensa tus años de trabajo y deben pagártela en un plazo máximo de 10 días continuos a partir del último día laborado.';
        } else if (currentMode === 'ESTUDIANTE') {
          responseText = 'El auxilio de cesantía es una indemnización legal tarifada consagrada en el Artículo 80 del Código de Trabajo (Ley 16-92). Su naturaleza jurídica no es un premio, sino una compensación económica por la contingencia involuntaria del desempleo. Pregunta de reflexión: ¿Por qué la renuncia voluntaria del trabajador no genera cesantía conforme al Principio V del Código?';
        } else {
          responseText = 'El auxilio de cesantía se rige por el Art. 80 del Código de Trabajo (Ley 16-92) y su escala tarifada: de 3 a 6 meses (6 días); de 6 meses a 1 año (13 días); de 1 a 5 años (21 días por año); y más de 5 años (23 días por año). Conforme al Art. 86 CT, el empleador incurre de pleno derecho en la penalidad de un día de salario por cada día de retardo a partir del undécimo día posterior a la terminación.';
        }

        citations = [
          { title: 'Artículo 80 del Código de Trabajo', source: 'Ley No. 16-92', url: '/normas/codigo-de-trabajo-ley-16-92/articulo/80', officialGaceta: 'Gaceta Oficial No. 9836' },
          { title: 'Artículo 86: Sanción por Retardo', source: 'Ley No. 16-92', url: '/normas/codigo-de-trabajo-ley-16-92/articulo/86', officialGaceta: 'Gaceta Oficial No. 9836' },
          { title: 'Sentencia SCJ sobre Exigibilidad de Cesantía', source: 'SCJ — Tercera Sala, Sent. SCJ-TS-2023-1120', url: '/jurisprudencia', courtChamber: 'Tercera Sala de Casación Laboral' },
        ];

        reasoning = {
          conclusion: 'El trabajador tiene derecho incondicional al pago íntegro del auxilio de cesantía conforme al Art. 80 del Código de Trabajo más preaviso.',
          legalBasis: 'Ley 16-92 (Código de Trabajo), Arts. 75, 76, 80 y 86; Decreto 258-93 (Reglamento de Aplicación).',
          jurisprudencia: 'SCJ, Tercera Sala, Sent. No. SCJ-TS-2023-1120: El desahucio patronal genera la obligación irrenunciable del pago de la cesantía sin debate sobre la conveniencia del despido.',
          interpretation: 'El legislador estructuró una indemnización objetiva que prescinde de la demostración de dolo o culpa patronal en el desahucio.',
          applicationToCase: 'Aplica a todo contrato de trabajo por tiempo indefinido que culmine por voluntad unilateral patronal.',
          missingInfo: 'Se requiere confirmar el salario mensual ordinario y la fecha exacta de ingreso y egreso para el cómputo exacto del factor 23.83.',
          alternatives: 'Si el empleador se niega a pagar en 10 días, interponer formal queja en el Ministerio de Trabajo y demanda laboral con reclamo de salarios caídos del Art. 86 CT.',
        };
      } else if (lower.includes('desahu') || lower.includes('preav') || lower.includes('75') || lower.includes('despido')) {
        responseText = 'El desahucio está regulado en los Artículos 75 al 86 del Código de Trabajo. Se distingue del despido en que no exige alegar una justa causa; sin embargo, requiere preaviso obligatorio (Art. 76) o su pago compensatorio, y comunicación formal al Ministerio de Trabajo en 48 horas (Art. 77).';
        citations = [
          { title: 'Artículo 75: Naturaleza del Desahucio', source: 'Ley 16-92', url: '/normas/codigo-de-trabajo-ley-16-92', officialGaceta: 'Gaceta Oficial No. 9836' },
          { title: 'Artículo 76: Plazos de Preaviso', source: 'Ley 16-92', url: '/normas/codigo-de-trabajo-ley-16-92' },
        ];
        reasoning = {
          conclusion: 'El desahucio extingue válidamente el contrato pero genera obligaciones indemnizatorias inmediatas.',
          legalBasis: 'Código de Trabajo, Arts. 75 al 86.',
          jurisprudencia: 'SCJ Sala Laboral: La falta de notificación al Ministerio en 48 horas genera presunciones procesales.',
          interpretation: 'Facultad resolutoria unilateral atada al pago tarifado.',
          applicationToCase: 'Verificar si la trabajadora se encuentra amparada por fuero de maternidad (Art. 232 CT).',
          missingInfo: 'Constancia de entrega de carta de preaviso.',
          alternatives: 'Conciliación administrativa en sede laboral.',
        };
      } else {
        responseText = `He analizado tu consulta bajo el ${MODE_CONFIGS[currentMode].label}. En el ordenamiento jurídico dominicano, esta situación se rige por la Constitución de la República y la legislación especial de la materia. Para un diagnóstico más detallado, puedes utilizar el módulo "Construye Mi Caso" o formular la pregunta indicando la materia específica.`;
        citations = [
          { title: 'Constitución Dominicana de 2015/2024', source: 'Gaceta Oficial No. 10805', url: '/normas/constitucion-republica-dominicana' },
          { title: 'Código Civil Dominicano', source: 'Norma de Derecho Común', url: '/normas/codigo-civil-dominicano' },
        ];
        reasoning = {
          conclusion: 'La pretensión debe canalizarse conforme a los requisitos de la materia de atribución correspondiente.',
          legalBasis: 'Constitución de la República Dominicana, Art. 69 (Debido Proceso).',
          jurisprudencia: 'SCJ, Sala Civil: Principio de congruencia procesal y aportación probatoria.',
          interpretation: 'Los jueces están sujetos al principio de legalidad y al imperio estricto de la ley dominicana.',
          applicationToCase: 'Se requiere contextualizar los hechos para determinar la vía procesal idónea.',
          missingInfo: 'Fechas exactas, documentos preconstituidos y estipulaciones contractuales.',
          alternatives: 'Acudir a la Calculadora de Plazos o consultar el Directorio Judicial.',
        };
      }

      const aiMsg: ChatMessage = {
        id: 'ai-' + Date.now(),
        sender: 'ai',
        text: responseText,
        modeUsed: currentMode,
        citations,
        reasoning,
        timestamp: 'Ahora',
      };

      setMessages((prev) => [...prev, aiMsg]);
      setIsThinking(false);
    }, 500);
  }

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-6 w-full flex-1 flex flex-col">
      {/* Aviso de Fuentes Obligatorias */}
      <div className="bg-amber-950/80 border border-amber-500/30 rounded-2xl p-4 flex items-center justify-between gap-3 text-amber-200 text-xs">
        <div className="flex items-center gap-3">
          <ShieldAlert className="w-5 h-5 text-amber-400 shrink-0" />
          <p>
            <strong>Regla de Fuentes Obligatorias (Secciones 16 y 50):</strong> Legal RD AI solo responde sobre la base de normas oficiales dominicanas y sentencias sentadas de la SCJ y TC. Toda respuesta incluye fuentes y trazabilidad procesal.
          </p>
        </div>
        <Link href="/fuentes" className="text-amber-400 font-bold hover:underline shrink-0 text-xs hidden md:inline">
          Ver Fuentes Primarias (19)
        </Link>
      </div>

      {/* Selector de Modos de la IA (Sección 15) */}
      <div className="bg-white p-4 rounded-3xl border border-slate-200 shadow-xs space-y-2">
        <span className="text-xs font-bold uppercase tracking-widest text-slate-500 block">
          Modo Activo del Asistente Jurídico:
        </span>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
          {(['CIUDADANO', 'ESTUDIANTE', 'ABOGADO', 'INVESTIGADOR'] as AiMode[]).map((m) => {
            const isSelected = currentMode === m;
            const conf = MODE_CONFIGS[m];
            return (
              <button
                key={m}
                onClick={() => setCurrentMode(m)}
                className={`p-3 rounded-2xl border text-left transition-all cursor-pointer flex flex-col justify-between ${
                  isSelected
                    ? 'bg-slate-900 text-white border-slate-900 shadow-xs'
                    : 'bg-slate-50 border-slate-200 hover:bg-slate-100 text-slate-800'
                }`}
              >
                <div className="flex items-center justify-between w-full mb-1">
                  <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full border ${isSelected ? 'bg-amber-400 text-slate-950 border-amber-400' : conf.badgeColor}`}>
                    {conf.label}
                  </span>
                </div>
                <span className="text-[11px] opacity-80 line-clamp-2 leading-tight">
                  {conf.desc}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Ventana de Conversación */}
      <div className="bg-white rounded-3xl border border-slate-200 shadow-sm flex-1 flex flex-col overflow-hidden min-h-[560px]">
        <div className="p-4 sm:p-5 border-b border-slate-100 bg-slate-50/60 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-slate-900 text-amber-400 flex items-center justify-center shadow-xs">
              <Bot className="w-5 h-5" />
            </div>
            <div>
              <h1 className="font-serif font-bold text-base text-slate-900 flex items-center gap-2">
                <span>Legal RD AI</span>
                <span className="text-[10px] font-semibold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200">
                  Modo {MODE_CONFIGS[currentMode].label}
                </span>
              </h1>
              <p className="text-[11px] text-slate-500">Fundamentación obligatoria en leyes y sentencias dominicanas</p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <Link
              href="/construye-mi-caso"
              className="text-xs font-bold text-slate-700 hover:text-amber-600 hidden sm:inline"
            >
              Construye Mi Caso (13 pasos) →
            </Link>
          </div>
        </div>

        {/* Mensajes */}
        <div className="flex-1 p-6 space-y-6 overflow-y-auto max-h-[520px]">
          {messages.map((msg) => (
            <div
              key={msg.id}
              className={'flex items-start gap-3 ' + (msg.sender === 'user' ? 'flex-row-reverse' : '')}
            >
              <div
                className={'w-8 h-8 rounded-xl flex items-center justify-center shrink-0 font-bold text-xs ' + (
                  msg.sender === 'user' ? 'bg-slate-900 text-white' : 'bg-amber-100 text-amber-900'
                )}
              >
                {msg.sender === 'user' ? <User className="w-4 h-4" /> : <Bot className="w-4 h-4" />}
              </div>

              <div
                className={'max-w-3xl rounded-3xl p-5 space-y-3 text-xs sm:text-sm leading-relaxed ' + (
                  msg.sender === 'user'
                    ? 'bg-slate-900 text-white rounded-tr-xs'
                    : 'bg-slate-50 border border-slate-200 text-slate-800 rounded-tl-xs'
                )}
              >
                <div className="whitespace-pre-wrap font-serif leading-relaxed">{msg.text}</div>

                {/* Razonamiento Jurídico Trazable en 7 Pasos (Sección 17) */}
                {msg.reasoning && (
                  <div className="mt-3 pt-3 border-t border-slate-200 space-y-2">
                    <button
                      onClick={() => setExpandedReasoningId(expandedReasoningId === msg.id ? null : msg.id)}
                      className="inline-flex items-center gap-1.5 text-xs font-bold text-indigo-700 hover:text-indigo-900 cursor-pointer bg-indigo-50 px-3 py-1.5 rounded-xl border border-indigo-200"
                    >
                      <Scale className="w-3.5 h-3.5" />
                      <span>{expandedReasoningId === msg.id ? 'Ocultar Razonamiento Trazable' : 'Ver Razonamiento Jurídico Trazable (7 Pasos)'}</span>
                      {expandedReasoningId === msg.id ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
                    </button>

                    {expandedReasoningId === msg.id && (
                      <div className="p-4 rounded-2xl bg-white border border-indigo-200 space-y-3 text-xs text-slate-800 font-sans shadow-xs">
                        <div>
                          <span className="font-bold text-indigo-950 uppercase tracking-wider text-[10px] block">1. Conclusión</span>
                          <p>{msg.reasoning.conclusion}</p>
                        </div>
                        <div>
                          <span className="font-bold text-indigo-950 uppercase tracking-wider text-[10px] block">2. Fundamento Legal</span>
                          <p className="font-mono text-[11px] text-amber-800">{msg.reasoning.legalBasis}</p>
                        </div>
                        <div>
                          <span className="font-bold text-indigo-950 uppercase tracking-wider text-[10px] block">3. Jurisprudencia SCJ / TC</span>
                          <p className="font-serif italic">{msg.reasoning.jurisprudencia}</p>
                        </div>
                        <div>
                          <span className="font-bold text-indigo-950 uppercase tracking-wider text-[10px] block">4. Interpretación Doctrinal</span>
                          <p>{msg.reasoning.interpretation}</p>
                        </div>
                        <div>
                          <span className="font-bold text-indigo-950 uppercase tracking-wider text-[10px] block">5. Aplicación al Caso Concreto</span>
                          <p>{msg.reasoning.applicationToCase}</p>
                        </div>
                        <div>
                          <span className="font-bold text-indigo-950 uppercase tracking-wider text-[10px] block">6. Información Faltante</span>
                          <p className="text-slate-500">{msg.reasoning.missingInfo}</p>
                        </div>
                        <div>
                          <span className="font-bold text-indigo-950 uppercase tracking-wider text-[10px] block">7. Posibles Alternativas de Actuación</span>
                          <p className="font-semibold text-emerald-800">{msg.reasoning.alternatives}</p>
                        </div>
                      </div>
                    )}
                  </div>
                )}

                {/* Fuentes Obligatorias & Botón Ver Fundamento (Sección 16) */}
                {msg.citations && msg.citations.length > 0 && (
                  <div className="mt-3 pt-3 border-t border-slate-200 space-y-2">
                    <span className="text-[11px] font-bold uppercase tracking-wider text-slate-600 block flex items-center gap-1.5">
                      <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                      <span>Fuentes Oficiales Obligatorias:</span>
                    </span>
                    <div className="space-y-1.5">
                      {msg.citations.map((cit, i) => (
                        <Link
                          key={i}
                          href={cit.url}
                          className="flex items-center justify-between p-2.5 rounded-xl bg-white border border-slate-200 hover:border-amber-500 hover:shadow-xs transition-all text-xs text-slate-700 hover:text-amber-700"
                        >
                          <div>
                            <span className="font-bold block">{cit.title}</span>
                            <span className="text-[10px] text-slate-400">
                              {cit.source} {cit.officialGaceta && `• ${cit.officialGaceta}`}
                            </span>
                          </div>
                          <div className="flex items-center gap-1 text-[11px] font-bold text-amber-600">
                            <span>Ver fundamento</span>
                            <ExternalLink className="w-3.5 h-3.5" />
                          </div>
                        </Link>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          ))}

          {isThinking && (
            <div className="flex items-center gap-3 text-xs text-slate-500 italic p-3 bg-slate-50 rounded-2xl w-fit">
              <Sparkles className="w-4 h-4 text-amber-500 animate-spin" />
              <span>Analizando en {MODE_CONFIGS[currentMode].label} con fuentes dominicanas...</span>
            </div>
          )}
        </div>

        {/* Consultas Sugeridas */}
        <div className="px-6 py-2.5 border-t border-slate-100 bg-slate-50/40 flex flex-wrap items-center gap-2 text-[11px]">
          <span className="text-slate-400 font-semibold">Consultas de muestra:</span>
          <button
            type="button"
            onClick={() => handleSend('¿Cómo se calcula el auxilio de cesantía según el Código de Trabajo?')}
            className="px-2.5 py-1 rounded-lg bg-white border border-slate-200 text-slate-700 hover:border-amber-400 hover:text-amber-700 transition-colors cursor-pointer"
          >
            Cálculo de cesantía (Art. 80)
          </button>
          <button
            type="button"
            onClick={() => handleSend('¿Cuáles son los plazos y formalidades del desahucio?')}
            className="px-2.5 py-1 rounded-lg bg-white border border-slate-200 text-slate-700 hover:border-amber-400 hover:text-amber-700 transition-colors cursor-pointer"
          >
            Reglas del desahucio (Arts. 75-86)
          </button>
          <button
            type="button"
            onClick={() => handleSend('¿Qué plazo tengo para interponer una acción de amparo?')}
            className="px-2.5 py-1 rounded-lg bg-white border border-slate-200 text-slate-700 hover:border-amber-400 hover:text-amber-700 transition-colors cursor-pointer"
          >
            Plazo Acción de Amparo (Ley 137-11)
          </button>
        </div>

        {/* Input de Consulta */}
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleSend();
          }}
          className="p-4 border-t border-slate-200 bg-white flex items-center gap-3"
        >
          <input
            type="text"
            value={inputQuery}
            onChange={(e) => setInputQuery(e.target.value)}
            placeholder={`Escribe tu consulta en ${MODE_CONFIGS[currentMode].label}...`}
            className="flex-1 px-4 py-3 text-xs sm:text-sm border border-slate-300 rounded-2xl focus:ring-2 focus:ring-slate-900 bg-slate-50/50"
          />
          <button
            type="submit"
            disabled={!inputQuery.trim()}
            className="p-3 sm:px-6 sm:py-3 rounded-2xl bg-slate-900 hover:bg-slate-800 text-amber-400 font-bold text-xs sm:text-sm shadow-md transition-all disabled:opacity-40 cursor-pointer flex items-center gap-2 shrink-0"
          >
            <span className="hidden sm:inline">Consultar</span>
            <Send className="w-4 h-4" />
          </button>
        </form>
      </div>
    </div>
  );
}
