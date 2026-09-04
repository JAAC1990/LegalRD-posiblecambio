/**
 * ====================================================================
 * LEGAL RD — SISTEMA OPERATIVO JURÍDICO DOMINICANO
 * ====================================================================
 * Módulo: Directorio y Mapa Jurisdiccional de la República Dominicana
 * Ruta: src/lib/data/directory.ts
 * Ámbito Legal: Organización Judicial Dominicana (Ley 821 de Organización Judicial)
 * 
 * PROPÓSITO:
 * Base de datos geo-jurisdiccional con sedes, palacios de justicia, salas de la SCJ, Tribunal Constitucional, oficinas del Registro Inmobiliario, ONAPI y fiscalías con datos de contacto, horarios y servicios.
 * 
 * FUNDAMENTOS NORMATIVOS:
 * Ley 821 de Organización Judicial, Ley 108-05 de Registro Inmobiliario, Ley 137-11 del TC, Resolución 001-2021 de la SCJ.
 * 
 * REGLA FUNDAMENTAL DE PRESERVACIÓN ACUMULATIVA:
 * Este archivo forma parte del ecosistema integral de Legal RD.
 * No se permite eliminar, simplificar ni alterar la lógica preexistente.
 * ====================================================================
 */

// Directorio y Mapa Judicial de Instituciones de la República Dominicana

/**
 * Tipo: `EntityCategory`
 * Define los valores admitidos para EntityCategory según las reglas del dominio dominicano.
 */
export type EntityCategory = 'TRIBUNAL' | 'FISCALIA' | 'REGISTRO' | 'NOTARIA' | 'ENTIDAD_REGULADORA' | 'MEDIACION';

/**
 * Interfaz: `JudicialEntityItem`
 * Modela la estructura de datos para JudicialEntityItem en el ecosistema jurídico de Legal RD.
 */
export interface JudicialEntityItem {
  id: string;
  name: string;
  category: EntityCategory;
  categoryLabel: string;
  department: string;
  district: string;
  city: string;
  address: string;
  phone: string;
  email: string;
  schedule: string;
  coordinates: {
    lat: number;
    lng: number;
  };
  servicesProvided: string[];
  competenceSummary: string;
}

/**
 * Catálogo Maestro / Constante: `DOMINICAN_JUDICIAL_ENTITIES`
 * Datos estructurados y verificados del ordenamiento jurídico de la República Dominicana.
 */
export const DOMINICAN_JUDICIAL_ENTITIES: JudicialEntityItem[] = [
  // 1. Suprema Corte de Justicia y Consejo del Poder Judicial
  {
    id: 'ent-scj',
    name: 'Suprema Corte de Justicia de la República Dominicana',
    category: 'TRIBUNAL',
    categoryLabel: 'Tribunal de Casación / Máxima Instancia Ordinaria',
    department: 'Departamento Judicial del Distrito Nacional',
    district: 'Distrito Nacional',
    city: 'Santo Domingo',
    address: 'Av. Enrique Jiménez Moya esq. Juan de Dios Ventura Simó, Centro de los Héroes, Santo Domingo, D.N.',
    phone: '+1 (809) 533-3118',
    email: 'secretariageneral@poderjudicial.gob.do',
    schedule: 'Lunes a Viernes de 7:30 AM a 4:30 PM',
    coordinates: { lat: 18.4485, lng: -69.9254 },
    servicesProvided: [
      'Depósito y conocimiento de Recursos de Casación (Salas Civil, Penal, Laboral y de Tierras)',
      'Salas Reunidas para contradicción de criterios jurisprudenciales',
      'Atención a usuarios y consulta de sentencias del Boletín Judicial',
      'Plataforma de justicia digital y secretaría general',
    ],
    competenceSummary: 'Órgano jurisdiccional superior del Poder Judicial en materia ordinaria, competente para el recurso de casación en todo el territorio de la República Dominicana.',
  },

  // 2. Tribunal Constitucional
  {
    id: 'ent-tc',
    name: 'Tribunal Constitucional de la República Dominicana',
    category: 'TRIBUNAL',
    categoryLabel: 'Corte Constitucional / Control de Constitucionalidad',
    department: 'Sede Nacional',
    district: 'Distrito Nacional',
    city: 'Santo Domingo',
    address: 'Av. 27 de Febrero esq. Av. Luperón, Plaza de la Bandera, Santo Domingo Oeste',
    phone: '+1 (809) 274-4445',
    email: 'secretaria@tc.gob.do',
    schedule: 'Lunes a Viernes de 8:00 AM a 4:00 PM',
    coordinates: { lat: 18.4552, lng: -69.9765 },
    servicesProvided: [
      'Acciones directas de inconstitucionalidad contra leyes, decretos y reglamentos',
      'Recursos de revisión constitucional de decisiones jurisdiccionales (Art. 53 Ley 137-11)',
      'Recursos de revisión constitucional en materia de amparo',
      'Conflictos de competencia entre poderes públicos',
    ],
    competenceSummary: 'Órgano supremo de interpretación y control de la constitucionalidad; sus decisiones son definitivas e irrevocables y constituyen precedentes vinculantes para todos los poderes públicos.',
  },

  // 3. Palacio de Justicia de Ciudad Nueva
  {
    id: 'ent-pj-ciudad-nueva',
    name: 'Palacio de Justicia de Ciudad Nueva (Distrito Nacional)',
    category: 'TRIBUNAL',
    categoryLabel: 'Palacio de Justicia / Tribunales de Primera Instancia y Cortes',
    department: 'Departamento Judicial del Distrito Nacional',
    district: 'Distrito Nacional',
    city: 'Santo Domingo',
    address: 'Calle Fabio Fiallo No. 51, Ciudad Nueva, Santo Domingo, D.N.',
    phone: '+1 (809) 685-6111',
    email: 'distritonacional@poderjudicial.gob.do',
    schedule: 'Lunes a Viernes de 7:30 AM a 4:30 PM',
    coordinates: { lat: 18.4682, lng: -69.8931 },
    servicesProvided: [
      'Cámara Civil y Comercial de Primera Instancia del Distrito Nacional',
      'Corte de Apelación Civil y Penal del Distrito Nacional',
      'Tribunales Colegiados y Juzgados de la Instrucción en materia Penal',
      'Fiscalía del Distrito Nacional (sede principal)',
    ],
    competenceSummary: 'Principal sede judicial del Distrito Nacional para litigación civil ordinaria, comercial, medidas de coerción y juicios de fondo.',
  },

  // 4. Jurisdicción Inmobiliaria (Registro de Títulos y Mensuras Catastrales)
  {
    id: 'ent-ri-central',
    name: 'Sede Central del Registro Inmobiliario',
    category: 'REGISTRO',
    categoryLabel: 'Registro Inmobiliario / Tribunal Superior de Tierras',
    department: 'Departamento Judicial del Distrito Nacional',
    district: 'Distrito Nacional',
    city: 'Santo Domingo',
    address: 'Av. Independencia esq. Enrique Jiménez Moya, Centro de los Héroes, Santo Domingo, D.N.',
    phone: '+1 (809) 533-3118',
    email: 'contacto@ri.gob.do',
    schedule: 'Lunes a Viernes de 8:00 AM a 4:00 PM',
    coordinates: { lat: 18.4491, lng: -69.9248 },
    servicesProvided: [
      'Registro de Títulos del Distrito Nacional (emisión de Certificados de Título)',
      'Dirección Nacional de Registro de Títulos y Dirección Nacional de Mensuras Catastrales',
      'Tribunal Superior de Tierras del Departamento Central',
      'Tribunales de Tierras de Jurisdicción Original',
    ],
    competenceSummary: 'Órgano rector de los derechos inmobiliarios registrados, deslindes, transferencias de propiedad y saneamiento catastral en el Departamento Central.',
  },

  // 5. Palacio de Justicia de Santiago
  {
    id: 'ent-pj-santiago',
    name: 'Palacio de Justicia de Santiago (Federico Álvarez)',
    category: 'TRIBUNAL',
    categoryLabel: 'Palacio de Justicia Regional del Cibao',
    department: 'Departamento Judicial de Santiago',
    district: 'Distrito Judicial de Santiago',
    city: 'Santiago de los Caballeros',
    address: 'Av. 27 de Febrero esq. Carretera Luperón, Santiago de los Caballeros',
    phone: '+1 (809) 575-1111',
    email: 'santiago@poderjudicial.gob.do',
    schedule: 'Lunes a Viernes de 7:30 AM a 4:30 PM',
    coordinates: { lat: 19.4517, lng: -70.6970 },
    servicesProvided: [
      'Corte de Apelación de Santiago (Civil, Penal y Laboral)',
      'Juzgados de Primera Instancia y de Paz de Santiago',
      'Fiscalía de Santiago',
      'Centro de Mediación y Resolución Alternativa de Conflictos',
    ],
    competenceSummary: 'Sede cabecera del Departamento Judicial del Cibao Central para todas las ramas ordinarias del Derecho.',
  },

  // 6. Oficina Nacional de la Propiedad Industrial (ONAPI)
  {
    id: 'ent-onapi-central',
    name: 'Oficina Nacional de la Propiedad Industrial (ONAPI)',
    category: 'ENTIDAD_REGULADORA',
    categoryLabel: 'Registro de Marcas y Patentes',
    department: 'Sede Nacional',
    district: 'Distrito Nacional',
    city: 'Santo Domingo',
    address: 'Av. Los Próceres No. 11, Los Jardines del Norte, Santo Domingo, D.N.',
    phone: '+1 (809) 567-7474',
    email: 'servicioalusuario@onapi.gob.do',
    schedule: 'Lunes a Viernes de 8:00 AM a 4:00 PM',
    coordinates: { lat: 18.4902, lng: -69.9548 },
    servicesProvided: [
      'Registro de Nombres Comerciales, Marcas de Productos y Servicios',
      'Concesión de Patentes de Invención y Modelos de Utilidad',
      'Recursos de Reconsideración y oposición a registros de signos distintivos',
    ],
    competenceSummary: 'Entidad estatal autónoma encargada de la concesión y resguardo de la propiedad industrial en la República Dominicana.',
  },

  // 7. Procuraduría General de la República
  {
    id: 'ent-pgr-central',
    name: 'Procuraduría General de la República Dominicana',
    category: 'FISCALIA',
    categoryLabel: 'Ministerio Público / Acción Pública Penal',
    department: 'Sede Nacional',
    district: 'Distrito Nacional',
    city: 'Santo Domingo',
    address: 'Av. George Washington esq. Juan de Dios Ventura Simó, Centro de los Héroes',
    phone: '+1 (809) 533-3522',
    email: 'info@pgr.gob.do',
    schedule: 'Lunes a Viernes de 8:00 AM a 4:00 PM',
    coordinates: { lat: 18.4468, lng: -69.9261 },
    servicesProvided: [
      'Legalización de firmas notariales y apostilla de documentos judiciales',
      'Expedición de certificados de no antecedentes penales',
      'Dirección de persecución del Ministerio Público y del sistema penitenciario',
    ],
    competenceSummary: 'Máxima autoridad del Ministerio Público dominicano, encargada de la política criminal del Estado y de la legalización oficial de actos auténticos.',
  },
];

/**
 * Función Operativa: `getAllJudicialEntities`
 * Procesa la lógica de negocio y reglas jurídicas correspondientes.
 */
export async function getAllJudicialEntities(): Promise<JudicialEntityItem[]> {
  return DOMINICAN_JUDICIAL_ENTITIES;
}

/**
 * Función Operativa: `getJudicialEntityById`
 * Procesa la lógica de negocio y reglas jurídicas correspondientes.
 */
export async function getJudicialEntityById(id: string): Promise<JudicialEntityItem | null> {
  return DOMINICAN_JUDICIAL_ENTITIES.find((e) => e.id === id) || null;
}
