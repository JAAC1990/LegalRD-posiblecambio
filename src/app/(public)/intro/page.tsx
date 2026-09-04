import Link from 'next/link';
import {
  Scale,
  BookOpen,
  History,
  ShieldCheck,
  Award,
  Globe,
  Sparkles,
  ArrowRight,
  Landmark,
  FileText,
  Compass,
  CheckCircle2,
  Calendar
} from 'lucide-react';

export default function IntroDerechoPage() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-16 w-full">
      {/* 1. Cabecera Hero de la Introducción */}
      <section className="text-center max-w-4xl mx-auto space-y-6">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-50 border border-amber-200 text-amber-900 text-xs font-bold uppercase tracking-wider shadow-2xs">
          <Compass className="w-4 h-4 text-amber-600" />
          <span>Fundamentos & Memoria Histórica</span>
        </div>

        <h1 className="text-4xl sm:text-6xl font-serif font-extrabold text-slate-900 tracking-tight leading-tight">
          ¿Qué es el Derecho? <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-600 via-amber-700 to-amber-900">
            Naturaleza, Fines e Historia
          </span>
        </h1>

        <p className="text-sm sm:text-base text-slate-600 leading-relaxed max-w-3xl mx-auto font-serif">
          Una introducción rigurosa y didáctica al concepto del Derecho, sus corrientes filosóficas fundamentales y el recorrido histórico universal que dio origen al <strong>ordenamiento jurídico de la República Dominicana</strong>.
        </p>
      </section>

      {/* 2. Definición del Derecho & Tridimensionalismo */}
      <section className="bg-white rounded-3xl p-8 sm:p-12 border border-slate-200 shadow-sm space-y-8">
        <div className="space-y-3 border-b border-slate-100 pb-6">
          <span className="text-xs font-bold text-amber-600 uppercase tracking-widest block">
            Concepto Fundamental
          </span>
          <h2 className="text-2xl sm:text-3xl font-serif font-bold text-slate-900">
            Definición y Dimensión Filosófica del Derecho
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-sm text-slate-700 leading-relaxed font-serif">
          <div className="space-y-4">
            <h3 className="font-bold text-base text-slate-900 font-sans">
              Origen Etimológico y Significado
            </h3>
            <p>
              La palabra <strong>Derecho</strong> proviene del vocablo latino <em>directum</em>, que significa &quot;lo que está conforme a la regla, a la ley o a la norma; lo que es recto y no se desvía&quot;. En sentido objetivo, el Derecho es el <strong>conjunto de normas jurídicas coactivas, bilaterales y heterónomas</strong> dictadas por el poder soberano de una sociedad para regular la conducta externa de los seres humanos en sociedad.
            </p>
            <p>
              Ulpiano, jurisconsulto romano clásico, sintetizó los tres preceptos cardinales del Derecho (<em>Tria Iuris Praecepta</em>):
            </p>
            <ul className="space-y-1.5 pl-4 border-l-2 border-amber-400 italic text-slate-800 text-xs sm:text-sm font-sans">
              <li>1. <em>Honeste vivere</em>: Vivir honestamente.</li>
              <li>2. <em>Alterum non laedere</em>: No dañar a nadie.</li>
              <li>3. <em>Suum cuique tribuere</em>: Dar a cada uno lo que le corresponde.</li>
            </ul>
          </div>

          <div className="space-y-4">
            <h3 className="font-bold text-base text-slate-900 font-sans">
              Los Fines Supremos del Derecho
            </h3>
            <p>
              El Derecho no es un fin en sí mismo, sino un instrumento civilizatorio que persigue tres valores axiológicos esenciales:
            </p>
            <div className="space-y-3 font-sans text-xs">
              <div className="p-3.5 rounded-2xl bg-amber-50/60 border border-amber-200 space-y-1">
                <strong className="text-amber-900 block text-xs">1. La Justicia:</strong>
                <span className="text-slate-700">La constante y perpetua voluntad de atribuir a cada persona los derechos y deberes que le corresponden en equidad.</span>
              </div>
              <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200 space-y-1">
                <strong className="text-slate-900 block text-xs">2. La Seguridad Jurídica:</strong>
                <span className="text-slate-600">La certeza de que las leyes vigentes son conocidas, predecibles y aplicadas uniformemente sin arbitrariedad.</span>
              </div>
              <div className="p-3.5 rounded-2xl bg-emerald-50/60 border border-emerald-200 space-y-1">
                <strong className="text-emerald-900 block text-xs">3. El Bien Común y la Paz Social:</strong>
                <span className="text-slate-700">La creación de condiciones institucionales que permitan a todos los miembros de la comunidad desarrollarse plenamente.</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. Las Dos Grandes Corrientes Filosóficas */}
      <section className="space-y-6">
        <div className="text-center max-w-2xl mx-auto space-y-2">
          <span className="text-xs font-bold text-amber-600 uppercase tracking-widest">
            Teoría General del Derecho
          </span>
          <h2 className="text-2xl sm:text-3xl font-serif font-bold text-slate-900">
            Iusnaturalismo vs. Positivismo Jurídico
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="p-8 rounded-3xl bg-white border border-slate-200 shadow-2xs space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-2xl bg-amber-50 text-amber-700 flex items-center justify-center font-bold">
                <Sparkles className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-serif font-bold text-lg text-slate-900">El Iusnaturalismo (Derecho Natural)</h3>
                <span className="text-xs text-slate-400">Sócrates, Santo Tomás de Aquino, John Locke</span>
              </div>
            </div>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-serif">
              Sostiene que existen principios universales de justicia, moral y dignidad humana que son intrínsecos a la naturaleza del hombre y anteriores a cualquier ley escrita. Si una ley humana contradice flagrantemente el derecho natural, carece de validez moral (<em>Lex iniusta non est lex</em>).
            </p>
          </div>

          <div className="p-8 rounded-3xl bg-white border border-slate-200 shadow-2xs space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-2xl bg-blue-50 text-blue-700 flex items-center justify-center font-bold">
                <Landmark className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-serif font-bold text-lg text-slate-900">El Iuspositivismo (Derecho Positivo)</h3>
                <span className="text-xs text-slate-400">Hans Kelsen, H.L.A. Hart, Norberto Bobbio</span>
              </div>
            </div>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-serif">
              Postula que el único Derecho auténtico es aquel que ha sido formalmente creado y promulgado por el Estado mediante los procedimientos legislativos legalmente establecidos. Separa el Derecho de la moral para garantizar la certeza jurídica objetiva de la ley escrita.
            </p>
          </div>
        </div>
      </section>

      {/* 4. Evolución Histórica Universal: De Roma a Napoleón */}
      <section className="bg-slate-900 text-white rounded-3xl p-8 sm:p-12 space-y-8">
        <div className="space-y-2 border-b border-slate-800 pb-6">
          <span className="text-xs font-bold text-amber-400 uppercase tracking-widest block">
            Línea de Tiempo Universal
          </span>
          <h2 className="text-2xl sm:text-3xl font-serif font-bold text-white">
            De la Antigua Roma a la Codificación Francesa de 1804
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-xs text-slate-300">
          <div className="p-6 rounded-2xl bg-slate-800/80 border border-slate-700 space-y-3">
            <span className="text-amber-400 font-mono font-bold text-sm block">450 a.C. — 534 d.C.</span>
            <h3 className="font-serif font-bold text-base text-white">El Derecho Romano Clásico</h3>
            <p className="leading-relaxed">
              La Ley de las XII Tablas y la magna compilación del emperador Justiniano (<em>Corpus Iuris Civilis</em>) sentaron las instituciones jurídicas que rigen hoy en día: contrato, propiedad, obligaciones, personas, herencias y tribunales.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-slate-800/80 border border-slate-700 space-y-3">
            <span className="text-amber-400 font-mono font-bold text-sm block">Siglos XII — XVIII</span>
            <h3 className="font-serif font-bold text-base text-white">La Tradición Romano-Canónica</h3>
            <p className="leading-relaxed">
              El redescubrimiento del Derecho Romano en Bolonia y la influencia del Derecho Canónico consolidaron la familia jurídica romano-germánica (Derecho Civil Continental), basada en la supremacía de la ley escrita frente al precedente judicial.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-slate-800/80 border border-slate-700 space-y-3">
            <span className="text-amber-400 font-mono font-bold text-sm block">21 de marzo de 1804</span>
            <h3 className="font-serif font-bold text-base text-white">El Código Napoleónico</h3>
            <p className="leading-relaxed">
              Napoleón Bonaparte promulga el Código Civil Francés, consolidando los principios de la Revolución: libertad individual, igualdad formal ante la ley, laicismo del matrimonio y autonomía de la voluntad. Se convirtió en el modelo legal del mundo occidental.
            </p>
          </div>
        </div>
      </section>

      {/* 5. HISTORIA DEL DERECHO EN LA REPÚBLICA DOMINICANA */}
      <section className="bg-white rounded-3xl p-8 sm:p-12 border border-slate-200 shadow-sm space-y-10">
        <div className="space-y-3 border-b border-slate-100 pb-6">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-amber-50 text-amber-800 text-xs font-bold font-mono">
            <span>Evolución Jurídica Dominicana</span>
          </div>
          <h2 className="text-2xl sm:text-4xl font-serif font-bold text-slate-900">
            Formación Histórica del Ordenamiento Jurídico Dominicano
          </h2>
          <p className="text-xs sm:text-sm text-slate-600">
            La trayectoria jurídica de la República Dominicana es el resultado de una singular síntesis histórica:
          </p>
        </div>

        <div className="space-y-8 relative before:absolute before:inset-0 before:left-4 before:w-0.5 before:bg-slate-200 pl-10 sm:pl-12">
          {/* Hito 1 */}
          <div className="relative space-y-2">
            <div className="absolute -left-10 sm:-left-12 top-0.5 w-6 h-6 rounded-full bg-slate-900 text-amber-400 flex items-center justify-center text-xs font-bold ring-4 ring-white">
              1
            </div>
            <div className="flex flex-wrap items-center justify-between gap-2">
              <h3 className="font-serif font-bold text-lg text-slate-900">
                1492–1821: El Derecho Indiano y las Siete Partidas
              </h3>
              <span className="text-xs font-mono text-slate-400">Época Colonial Española</span>
            </div>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-serif">
              Durante la colonización castellana, Santo Domingo fue sede de la <strong>Real Audiencia (1511)</strong>, primer tribunal de justicia del Nuevo Mundo. Rigen la Recopilación de las Leyes de Indias y el derecho castellano de Las Siete Partidas de Alfonso X el Sabio.
            </p>
          </div>

          {/* Hito 2 */}
          <div className="relative space-y-2">
            <div className="absolute -left-10 sm:-left-12 top-0.5 w-6 h-6 rounded-full bg-slate-900 text-amber-400 flex items-center justify-center text-xs font-bold ring-4 ring-white">
              2
            </div>
            <div className="flex flex-wrap items-center justify-between gap-2">
              <h3 className="font-serif font-bold text-lg text-slate-900">
                1822–1844: La Recepción del Derecho Francés
              </h3>
              <span className="text-xs font-mono text-slate-400">Ocupación y Asimilación Codificada</span>
            </div>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-serif">
              Durante la ocupación haitiana de Jean Pierre Boyer, se introdujeron de forma obligatoria en la isla los <strong>cinco Códigos Napoleónicos</strong> (Código Civil, Código Penal, Código de Comercio, Código de Procedimiento Civil y Código de Instrucción Criminal). Los juristas dominicanos aprendieron y asimilaron la técnica y doctrina francesa.
            </p>
          </div>

          {/* Hito 3 */}
          <div className="relative space-y-2">
            <div className="absolute -left-10 sm:-left-12 top-0.5 w-6 h-6 rounded-full bg-slate-900 text-amber-400 flex items-center justify-center text-xs font-bold ring-4 ring-white">
              3
            </div>
            <div className="flex flex-wrap items-center justify-between gap-2">
              <h3 className="font-serif font-bold text-lg text-slate-900">
                6 de Noviembre de 1844: La Constitución de San Cristóbal
              </h3>
              <span className="text-xs font-mono text-slate-400">Nacimiento del Estado Dominicano</span>
            </div>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-serif">
              Tras la Proclama de Independencia del 27 de febrero de 1844 liderada por Juan Pablo Duarte y los Trinitarios, se reúne la Asamblea Constituyente en San Cristóbal y promulga la primera <strong>Constitución Política de la República Dominicana</strong>, instaurando un gobierno republicano, representativo y democrático con división tripartita de poderes.
            </p>
          </div>

          {/* Hito 4 */}
          <div className="relative space-y-2">
            <div className="absolute -left-10 sm:-left-12 top-0.5 w-6 h-6 rounded-full bg-slate-900 text-amber-400 flex items-center justify-center text-xs font-bold ring-4 ring-white">
              4
            </div>
            <div className="flex flex-wrap items-center justify-between gap-2">
              <h3 className="font-serif font-bold text-lg text-slate-900">
                1884: La Traducción y Dominicanización de los Códigos
              </h3>
              <span className="text-xs font-mono text-slate-400">Decreto-Ley 2213 de 1884</span>
            </div>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-serif">
              Durante el gobierno de Ulises Heureaux, el Congreso Nacional adopta formalmente la traducción oficial al español de los Códigos Franceses con adecuaciones nacionales, sentando las bases del <strong>Código Civil Dominicano</strong> y del sistema procesal que regiría por más de un siglo.
            </p>
          </div>

          {/* Hito 5 */}
          <div className="relative space-y-2">
            <div className="absolute -left-10 sm:-left-12 top-0.5 w-6 h-6 rounded-full bg-slate-900 text-amber-400 flex items-center justify-center text-xs font-bold ring-4 ring-white">
              5
            </div>
            <div className="flex flex-wrap items-center justify-between gap-2">
              <h3 className="font-serif font-bold text-lg text-slate-900">
                2010–2024: El Estado Social y Democrático de Derecho
              </h3>
              <span className="text-xs font-mono text-slate-400">Constitucionalización del Ordenamiento</span>
            </div>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-serif">
              La proclamación de la <strong>Constitución de 2010</strong> marca el hito moderno más trascendental: define a la República Dominicana como un <em>Estado Social y Democrático de Derecho</em> (Art. 7), crea el <strong>Tribunal Constitucional</strong>, introduce la tutela efectiva de los derechos fundamentales y consagra la fuerza normativa directa de la Constitución sobre todas las leyes y jueces del país.
            </p>
          </div>
        </div>
      </section>

      {/* 6. Pirámide de la Jerarquía Normativa Dominicana */}
      <section className="bg-slate-50 rounded-3xl p-8 sm:p-12 border border-slate-200 space-y-8">
        <div className="text-center max-w-2xl mx-auto space-y-2">
          <span className="text-xs font-bold text-amber-600 uppercase tracking-widest">
            Orden de Prelación Legal
          </span>
          <h2 className="text-2xl sm:text-3xl font-serif font-bold text-slate-900">
            Jerarquía del Ordenamiento Jurídico Dominicano
          </h2>
          <p className="text-xs text-slate-500">
            Conforme al Artículo 6 de la Constitución, la Carta Magna es la norma suprema a la que están subordinados todos los poderes públicos y personas:
          </p>
        </div>

        <div className="max-w-3xl mx-auto space-y-3 font-sans text-xs">
          <div className="p-4 rounded-2xl bg-amber-500 text-slate-950 font-bold text-center shadow-md">
            1. BLOQUE DE CONSTITUCIONALIDAD (Constitución 2015/2024 + Tratados Internacionales de DDHH)
          </div>
          <div className="p-3.5 rounded-2xl bg-slate-900 text-amber-300 font-semibold text-center mx-6 shadow-xs">
            2. LEYES ORGÁNICAS (Tribunal Constitucional, Poder Judicial, Ministerio Público, Régimen Electoral)
          </div>
          <div className="p-3.5 rounded-2xl bg-slate-800 text-white font-medium text-center mx-12">
            3. LEYES ORDINARIAS Y CÓDIGOS (Código de Trabajo 16-92, Ley 108-05, Código Civil, etc.)
          </div>
          <div className="p-3 rounded-2xl bg-slate-700 text-slate-200 text-center mx-16">
            4. DECRETOS Y REGLAMENTOS DEL PODER EJECUTIVO (Reglamento 258-93, Decretos Presidenciales)
          </div>
          <div className="p-3 rounded-2xl bg-slate-200 text-slate-700 text-center mx-20">
            5. RESOLUCIONES MINISTERIALES, NORMAS TÉCNICAS Y ACTOS ADMINISTRATIVOS
          </div>
        </div>
      </section>

      {/* 7. Llamado a la Acción para Explorar */}
      <section className="text-center space-y-4 pt-4">
        <h3 className="font-serif font-bold text-2xl text-slate-900">
          Explora la Legislación Dominicana en Vivo
        </h3>
        <div className="flex flex-wrap items-center justify-center gap-3">
          <Link
            href="/repositorio"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-slate-900 hover:bg-slate-800 text-amber-400 text-xs sm:text-sm font-bold shadow-md transition-all"
          >
            <span>Ver Repositorio de Descargas</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
          <Link
            href="/especialidades"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-white border border-slate-300 hover:bg-slate-50 text-slate-800 text-xs sm:text-sm font-semibold transition-all"
          >
            <span>Explorar las 19 Especialidades</span>
          </Link>
        </div>
      </section>
    </div>
  );
}