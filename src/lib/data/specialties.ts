import { db } from '@/lib/db';

export interface SpecialtyItem {
  id: string;
  name: string;
  slug: string;
  description: string | null;
  iconName: string | null;
  displayOrder: number;
  groupCategory?: string;
  subtopics?: string[];
  normsCount?: number;
  caseLawsCount?: number;
  proceduresCount?: number;
}

export const INITIAL_DOMINICAN_SPECIALTIES: SpecialtyItem[] = [
  // 1. DERECHO CONSTITUCIONAL
  {
    id: 'spec-1',
    name: 'Derecho Constitucional',
    slug: 'derecho-constitucional',
    description: 'Constitución Dominicana de 2015/2024, garantías de derechos fundamentales, control constitucional, amparo y sentencias del Tribunal Constitucional.',
    iconName: 'Scale',
    displayOrder: 1,
    groupCategory: 'Derecho Público & Institucional',
    subtopics: ['Constitución', 'Derechos fundamentales', 'Garantías constitucionales', 'Organización del Estado', 'Poder Ejecutivo', 'Poder Legislativo', 'Poder Judicial', 'Ministerio Público', 'Tribunal Constitucional', 'Control constitucional', 'Acción directa de inconstitucionalidad', 'Amparo', 'Hábeas corpus', 'Hábeas data', 'Nacionalidad', 'Ciudadanía', 'Reforma constitucional', 'Régimen de excepción', 'Organización territorial'],
    normsCount: 1,
    caseLawsCount: 1,
    proceduresCount: 1,
  },
  // 2. DERECHO CIVIL
  {
    id: 'spec-2',
    name: 'Derecho Civil',
    slug: 'derecho-civil',
    description: 'Código Civil Dominicano, obligaciones, contratos, responsabilidad civil contractual y extracontractual, bienes, propiedad y derechos reales.',
    iconName: 'BookOpen',
    displayOrder: 2,
    groupCategory: 'Derecho Privado & Patrimonial',
    subtopics: ['Personas', 'Personalidad jurídica', 'Obligaciones', 'Contratos', 'Responsabilidad civil', 'Bienes', 'Propiedad', 'Posesión', 'Derechos reales', 'Sucesiones', 'Herencias', 'Donaciones', 'Prescripción', 'Nulidad', 'Actos jurídicos', 'Prueba', 'Responsabilidad contractual', 'Responsabilidad extracontractual'],
    normsCount: 1,
    caseLawsCount: 1,
    proceduresCount: 1,
  },
  // 3. DERECHO DE FAMILIA
  {
    id: 'spec-3',
    name: 'Derecho de Familia',
    slug: 'derecho-de-familia',
    description: 'Régimen matrimonial, divorcio (Ley 1306-Bis), filiación, patria potestad, régimen de visitas, alimentos, adopción y violencia intrafamiliar (Ley 24-97).',
    iconName: 'Users',
    displayOrder: 3,
    groupCategory: 'Derecho Privado & Personas',
    subtopics: ['Matrimonio', 'Divorcio', 'Separación', 'Filiación', 'Paternidad', 'Maternidad', 'Guarda', 'Custodia', 'Régimen de visitas', 'Autoridad parental', 'Alimentos', 'Adopción', 'Tutela', 'Curatela', 'Protección de menores'],
    normsCount: 1,
    caseLawsCount: 1,
    proceduresCount: 1,
  },
  // 4. DERECHO DE NIÑOS, NIÑAS Y ADOLESCENTES
  {
    id: 'spec-4',
    name: 'Derecho de Niños, Niñas y Adolescentes',
    slug: 'derecho-nna',
    description: 'Código para el Sistema de Protección de los Derechos de los Niños, Niñas y Adolescentes (Ley 136-03), tutela judicial y responsabilidad penal juvenil.',
    iconName: 'Baby',
    displayOrder: 4,
    groupCategory: 'Derecho Social & Especializado',
    subtopics: ['Derechos fundamentales', 'Protección integral', 'Responsabilidad penal adolescente', 'Guarda', 'Adopción', 'Alimentos', 'Restitución de derechos', 'Medidas de protección', 'Tribunales especializados'],
    normsCount: 1,
    caseLawsCount: 0,
    proceduresCount: 1,
  },
  // 5. DERECHO PENAL
  {
    id: 'spec-5',
    name: 'Derecho Penal',
    slug: 'derecho-penal',
    description: 'Código Penal / Ley 74-25, tipos penales, homicidios, estafas, delitos de alta tecnología (Ley 53-07), lavado de activos (Ley 155-17) y drogas (Ley 50-88).',
    iconName: 'ShieldAlert',
    displayOrder: 5,
    groupCategory: 'Derecho Penal & Punitivo',
    subtopics: ['Delitos contra la vida', 'Delitos contra la integridad física', 'Delitos contra la libertad', 'Delitos sexuales', 'Delitos contra el patrimonio', 'Robo', 'Hurto', 'Estafa', 'Abuso de confianza', 'Fraude', 'Falsificación', 'Amenazas', 'Violencia', 'Delitos contra la administración pública', 'Corrupción', 'Delitos contra la administración de justicia', 'Delitos informáticos', 'Crimen organizado', 'Narcotráfico', 'Lavado de activos', 'Terrorismo', 'Delitos ambientales', 'Delitos tributarios', 'Delitos electorales', 'Delitos de tránsito'],
    normsCount: 1,
    caseLawsCount: 1,
    proceduresCount: 1,
  },
  // 6. DERECHO PROCESAL PENAL
  {
    id: 'spec-6',
    name: 'Derecho Procesal Penal',
    slug: 'derecho-procesal-penal',
    description: 'Código Procesal Penal (Ley 76-02 / Ley 10-15), Ministerio Público (Ley 133-11), medidas de coerción, etapa preparatoria, juicio y recursos.',
    iconName: 'Gavel',
    displayOrder: 6,
    groupCategory: 'Derecho Procesal & Litigación',
    subtopics: ['Investigación', 'Denuncia', 'Querella', 'Ministerio Público', 'Policía Judicial', 'Arresto', 'Medidas de coerción', 'Prisión preventiva', 'Libertad', 'Audiencias', 'Etapa preparatoria', 'Acusación', 'Juicio', 'Recursos', 'Apelación', 'Casación', 'Revisión', 'Ejecución de sentencia', 'Derechos del imputado', 'Derechos de la víctima'],
    normsCount: 1,
    caseLawsCount: 1,
    proceduresCount: 1,
  },
  // 7. DERECHO PROCESAL CIVIL
  {
    id: 'spec-7',
    name: 'Derecho Procesal Civil',
    slug: 'derecho-procesal-civil',
    description: 'Código de Procedimiento Civil, Ley 2-23 de Casación, Ley 339-22 de Medios Digitales, Ley 834 de 1978, demandas, incidentes y embargos.',
    iconName: 'FileText',
    displayOrder: 7,
    groupCategory: 'Derecho Procesal & Litigación',
    subtopics: ['Demanda', 'Contestación', 'Notificaciones', 'Competencia', 'Jurisdicción', 'Medidas cautelares', 'Prueba', 'Incidentes', 'Sentencias', 'Recursos', 'Apelación', 'Casación', 'Ejecución', 'Embargos', 'Procedimientos especiales'],
    normsCount: 1,
    caseLawsCount: 1,
    proceduresCount: 1,
  },
  // 8. DERECHO INMOBILIARIO
  {
    id: 'spec-8',
    name: 'Derecho Inmobiliario',
    slug: 'derecho-inmobiliario',
    description: 'Ley 108-05 de Registro Inmobiliario, saneamiento, deslindes, transferencias, títulos de propiedad y litigios de tierras.',
    iconName: 'Home',
    displayOrder: 8,
    groupCategory: 'Derecho Patrimonial & Tierras',
    subtopics: ['Registro inmobiliario', 'Registro de títulos', 'Mensuras', 'Deslinde', 'Saneamiento', 'Transferencia', 'Hipotecas', 'Derechos reales', 'Posesión', 'Litigios inmobiliarios', 'Jurisdicción inmobiliaria', 'Tribunal de Tierras', 'Catastro', 'Mensuras catastrales'],
    normsCount: 1,
    caseLawsCount: 1,
    proceduresCount: 1,
  },
  // 9. DERECHO LABORAL
  {
    id: 'spec-9',
    name: 'Derecho Laboral',
    slug: 'derecho-laboral',
    description: 'Código de Trabajo (Ley 16-92), contratos de trabajo, desahucio, despido, auxilio de cesantía, horas extras, huelgas y doctrina SCJ.',
    iconName: 'Briefcase',
    displayOrder: 9,
    groupCategory: 'Derecho Social & Trabajo',
    subtopics: ['Contrato de trabajo', 'Empleo', 'Salarios', 'Jornada laboral', 'Descansos', 'Vacaciones', 'Suspensión', 'Terminación del contrato', 'Despido', 'Desahucio', 'Dimisión', 'Prestaciones laborales', 'Sindicatos', 'Huelgas', 'Conflictos laborales', 'Seguridad y salud ocupacional', 'Procedimiento laboral'],
    normsCount: 1,
    caseLawsCount: 1,
    proceduresCount: 1,
  },
  // 10. DERECHO DE SEGURIDAD SOCIAL
  {
    id: 'spec-10',
    name: 'Derecho de Seguridad Social',
    slug: 'derecho-seguridad-social',
    description: 'Sistema Dominicano de Seguridad Social (Ley 87-01), pensiones, seguro familiar de salud (ARS), riesgos laborales (IDOPPRIL) y TSS.',
    iconName: 'HeartPulse',
    displayOrder: 10,
    groupCategory: 'Derecho Social & Trabajo',
    subtopics: ['Sistema Dominicano de Seguridad Social', 'Pensiones', 'Salud', 'Riesgos laborales', 'Afiliación', 'Cotizaciones', 'Administradoras de fondos', 'ARS', 'TSS', 'Prestaciones'],
    normsCount: 1,
    caseLawsCount: 0,
    proceduresCount: 1,
  },
  // 11. DERECHO COMERCIAL / EMPRESARIAL
  {
    id: 'spec-11',
    name: 'Derecho Comercial / Empresarial',
    slug: 'derecho-comercial',
    description: 'Código de Comercio, actos de comercio, Ley 479-08 de Sociedades Comerciales (SRL, SA, SAS, EIRL), registro mercantil y contratos comerciales.',
    iconName: 'Store',
    displayOrder: 11,
    groupCategory: 'Derecho Corporativo & Mercantil',
    subtopics: ['Comerciante', 'Actos de comercio', 'Sociedades', 'SRL', 'SA', 'EIRL', 'Acciones', 'Accionistas', 'Administración societaria', 'Fusiones', 'Adquisiciones', 'Disolución', 'Liquidación', 'Registro Mercantil', 'Contratos comerciales', 'Títulos de crédito'],
    normsCount: 1,
    caseLawsCount: 0,
    proceduresCount: 1,
  },
  // 12. DERECHO DE REESTRUCTURACIÓN Y LIQUIDACIÓN
  {
    id: 'spec-12',
    name: 'Derecho de Reestructuración y Liquidación',
    slug: 'derecho-reestructuracion',
    description: 'Ley 141-15 de Reestructuración Mercantil y Liquidación Judicial de Empresas y Personas Físicas Comerciantes (Régimen de Quiebras).',
    iconName: 'RefreshCw',
    displayOrder: 12,
    groupCategory: 'Derecho Corporativo & Mercantil',
    subtopics: ['Reestructuración empresarial', 'Insolvencia', 'Acreedores', 'Deudores', 'Conciliación', 'Liquidación', 'Administrador concursal', 'Verificación de créditos', 'Procedimientos judiciales'],
    normsCount: 1,
    caseLawsCount: 0,
    proceduresCount: 1,
  },
  // 13. DERECHO TRIBUTARIO
  {
    id: 'spec-13',
    name: 'Derecho Tributario',
    slug: 'derecho-tributario',
    description: 'Código Tributario (Ley 11-92), ITBIS, Impuesto sobre la Renta (ISR), Selectivo al Consumo, deberes formales ante la DGII y fiscalización.',
    iconName: 'Receipt',
    displayOrder: 13,
    groupCategory: 'Derecho Público & Financiero',
    subtopics: ['Código Tributario', 'Impuesto sobre la Renta', 'ITBIS', 'Impuestos selectivos', 'Impuesto sobre activos', 'Retenciones', 'Comprobantes fiscales', 'Obligaciones tributarias', 'Fiscalización', 'Recursos administrativos', 'Recursos judiciales', 'Infracciones tributarias'],
    normsCount: 1,
    caseLawsCount: 0,
    proceduresCount: 1,
  },
  // 14. DERECHO ADUANERO
  {
    id: 'spec-14',
    name: 'Derecho Aduanero',
    slug: 'derecho-aduanero',
    description: 'Ley General de Aduanas (Ley 168-21), régimen de importación, exportación, aranceles, valoración aduanera y zonas francas (Ley 8-90).',
    iconName: 'Truck',
    displayOrder: 14,
    groupCategory: 'Derecho Público & Financiero',
    subtopics: ['Aduanas', 'Importación', 'Exportación', 'Aranceles', 'Valoración aduanera', 'Infracciones', 'Procedimientos aduaneros', 'Régimen de zonas francas'],
    normsCount: 1,
    caseLawsCount: 0,
    proceduresCount: 0,
  },
  // 15. DERECHO ADMINISTRATIVO
  {
    id: 'spec-15',
    name: 'Derecho Administrativo',
    slug: 'derecho-administrativo',
    description: 'Ley 107-13 de Derechos de las Personas ante la Administración, función pública (Ley 41-08), compras públicas (Ley 340-06) y Tribunal Superior Administrativo (TSA).',
    iconName: 'Landmark',
    displayOrder: 15,
    groupCategory: 'Derecho Público & Institucional',
    subtopics: ['Administración Pública', 'Actos administrativos', 'Procedimientos administrativos', 'Recursos administrativos', 'Contratación pública', 'Función pública', 'Responsabilidad patrimonial del Estado', 'Servicios públicos', 'Expropiación', 'Licencias', 'Permisos', 'Regulación'],
    normsCount: 1,
    caseLawsCount: 0,
    proceduresCount: 1,
  },
  // 16. DERECHO FINANCIERO
  {
    id: 'spec-16',
    name: 'Derecho Financiero',
    slug: 'derecho-financiero',
    description: 'Presupuesto General del Estado, Crédito Público, Tesorería Nacional, Contraloría General de la República y Cámara de Cuentas (Ley 10-04).',
    iconName: 'Coins',
    displayOrder: 16,
    groupCategory: 'Derecho Público & Financiero',
    subtopics: ['Presupuesto público', 'Crédito público', 'Tesorería', 'Control financiero', 'Cámara de Cuentas', 'Contraloría', 'Administración financiera del Estado'],
    normsCount: 0,
    caseLawsCount: 0,
    proceduresCount: 0,
  },
  // 17. DERECHO BANCARIO
  {
    id: 'spec-17',
    name: 'Derecho Bancario',
    slug: 'derecho-bancario',
    description: 'Ley Monetaria y Financiera (Ley 183-02), intermediación financiera, Superintendencia de Bancos, contratos bancarios y derechos del usuario financiero.',
    iconName: 'Building',
    displayOrder: 17,
    groupCategory: 'Derecho Corporativo & Mercantil',
    subtopics: ['Bancos', 'Intermediación financiera', 'Superintendencia de Bancos', 'Usuarios financieros', 'Productos financieros', 'Operaciones bancarias', 'Regulación bancaria'],
    normsCount: 1,
    caseLawsCount: 0,
    proceduresCount: 0,
  },
  // 18. DERECHO DE SEGUROS
  {
    id: 'spec-18',
    name: 'Derecho de Seguros',
    slug: 'derecho-de-seguros',
    description: 'Ley 146-02 sobre Seguros y Fianzas de la República Dominicana, pólizas, indemnizaciones, intermediación y Superintendencia de Seguros.',
    iconName: 'ShieldCheck',
    displayOrder: 18,
    groupCategory: 'Derecho Corporativo & Mercantil',
    subtopics: ['Contratos de seguros', 'Aseguradoras', 'Intermediarios', 'Pólizas', 'Reclamaciones', 'Superintendencia de Seguros', 'Seguros obligatorios'],
    normsCount: 0,
    caseLawsCount: 0,
    proceduresCount: 0,
  },
  // 19. DERECHO DEL CONSUMIDOR
  {
    id: 'spec-19',
    name: 'Derecho del Consumidor',
    slug: 'derecho-del-consumidor',
    description: 'Ley General de Protección de los Derechos del Consumidor o Usuario 358-05 (Pro Consumidor), garantías, contratos de adhesión y publicidad engañosa.',
    iconName: 'ShoppingBag',
    displayOrder: 19,
    groupCategory: 'Derecho Social & Especializado',
    subtopics: ['Derechos del consumidor', 'Proveedores', 'Garantías', 'Publicidad', 'Contratos de adhesión', 'Protección al consumidor', 'Reclamaciones', 'Prácticas abusivas'],
    normsCount: 1,
    caseLawsCount: 0,
    proceduresCount: 0,
  },
  // 20. DERECHO DE COMPETENCIA
  {
    id: 'spec-20',
    name: 'Derecho de Competencia',
    slug: 'derecho-de-competencia',
    description: 'Ley General de Defensa de la Competencia 42-08 (ProCompetencia), prohibición de monopolios, colusión y abuso de posición dominante.',
    iconName: 'Target',
    displayOrder: 20,
    groupCategory: 'Derecho Corporativo & Mercantil',
    subtopics: ['Libre competencia', 'Prácticas anticompetitivas', 'Abuso de posición dominante', 'Concentraciones económicas', 'Competencia desleal'],
    normsCount: 0,
    caseLawsCount: 0,
    proceduresCount: 0,
  },
  // 21. DERECHO DE PROPIEDAD INTELECTUAL
  {
    id: 'spec-21',
    name: 'Derecho de Propiedad Intelectual',
    slug: 'propiedad-intelectual',
    description: 'Propiedad Industrial (Ley 20-00 / ONAPI: marcas y patentes) y Derecho de Autor (Ley 65-00 / ONDA: obras, software y derechos conexos).',
    iconName: 'Award',
    displayOrder: 21,
    groupCategory: 'Derecho Privado & Patrimonial',
    subtopics: ['Marcas', 'Patentes', 'Diseños industriales', 'Nombres comerciales', 'Indicaciones geográficas', 'Obras', 'Derechos morales', 'Derechos patrimoniales', 'Licencias', 'Software', 'Obras digitales'],
    normsCount: 1,
    caseLawsCount: 0,
    proceduresCount: 1,
  },
  // 22. DERECHO INFORMÁTICO Y DIGITAL
  {
    id: 'spec-22',
    name: 'Derecho Informático y Digital',
    slug: 'derecho-informatico',
    description: 'Ley 53-07 sobre Crímenes de Alta Tecnología, Ley 126-02 de Comercio Electrónico y Firma Digital, Ley 172-13 de Protección de Datos Personales.',
    iconName: 'Cpu',
    displayOrder: 22,
    groupCategory: 'Derecho Tecnológico & Digital',
    subtopics: ['Delitos informáticos', 'Comercio electrónico', 'Firma digital', 'Documentos electrónicos', 'Protección de datos personales', 'Evidencia digital', 'Ciberseguridad', 'Contratos electrónicos', 'Plataformas digitales', 'Inteligencia artificial y regulación aplicable'],
    normsCount: 1,
    caseLawsCount: 0,
    proceduresCount: 0,
  },
  // 23. DERECHO DE TELECOMUNICACIONES
  {
    id: 'spec-23',
    name: 'Derecho de Telecomunicaciones',
    slug: 'derecho-telecomunicaciones',
    description: 'Ley General de Telecomunicaciones 153-98, INDOTEL, espectro radioeléctrico, concesiones de frecuencias y derechos de usuarios de telefonía/internet.',
    iconName: 'Radio',
    displayOrder: 23,
    groupCategory: 'Derecho Tecnológico & Digital',
    subtopics: ['Telecomunicaciones', 'Espectro radioeléctrico', 'Servicios de telecomunicaciones', 'Regulación', 'Usuarios', 'INDOTEL'],
    normsCount: 0,
    caseLawsCount: 0,
    proceduresCount: 0,
  },
  // 24. DERECHO ELECTORAL
  {
    id: 'spec-24',
    name: 'Derecho Electoral',
    slug: 'derecho-electoral',
    description: 'Ley Orgánica del Régimen Electoral 20-23, Ley 33-18 de Partidos Políticos, Junta Central Electoral (JCE) y Tribunal Superior Electoral (TSE).',
    iconName: 'Vote',
    displayOrder: 24,
    groupCategory: 'Derecho Público & Institucional',
    subtopics: ['Sistema electoral', 'Junta Central Electoral', 'Partidos políticos', 'Candidaturas', 'Campañas', 'Financiamiento', 'Delitos electorales', 'Tribunal Superior Electoral', 'Procesos electorales'],
    normsCount: 0,
    caseLawsCount: 0,
    proceduresCount: 0,
  },
  // 25. DERECHO MIGRATORIO
  {
    id: 'spec-25',
    name: 'Derecho Migratorio',
    slug: 'derecho-migratorio',
    description: 'Ley General de Migración 285-04, residencias provisionales y definitivas, visados, naturalización y régimen laboral de extranjeros.',
    iconName: 'Globe',
    displayOrder: 25,
    groupCategory: 'Derecho Público & Extranjería',
    subtopics: ['Entrada al país', 'Salida', 'Residencia', 'Visas', 'Naturalización', 'Extranjería', 'Deportación', 'Regularización', 'Migración laboral'],
    normsCount: 1,
    caseLawsCount: 0,
    proceduresCount: 1,
  },
  // 26. DERECHO INTERNACIONAL PÚBLICO
  {
    id: 'spec-26',
    name: 'Derecho Internacional Público',
    slug: 'internacional-publico',
    description: 'Tratados y convenios internacionales ratificados por el Congreso, relaciones diplomáticas (Convención de Viena), OEA, ONU y DDHH.',
    iconName: 'Globe',
    displayOrder: 26,
    groupCategory: 'Derecho Internacional & Tratados',
    subtopics: ['Tratados', 'Convenios', 'Relaciones internacionales', 'Organizaciones internacionales', 'Derechos humanos', 'Derecho diplomático', 'Derecho consular'],
    normsCount: 0,
    caseLawsCount: 0,
    proceduresCount: 0,
  },
  // 27. DERECHO INTERNACIONAL PRIVADO
  {
    id: 'spec-27',
    name: 'Derecho Internacional Privado',
    slug: 'internacional-privado',
    description: 'Ley 544-14 de Derecho Internacional Privado, conflicto de leyes, competencia judicial internacional y homologación de sentencias (Exequátur).',
    iconName: 'Compass',
    displayOrder: 27,
    groupCategory: 'Derecho Internacional & Tratados',
    subtopics: ['Conflicto de leyes', 'Matrimonios internacionales', 'Divorcios internacionales', 'Contratos internacionales', 'Reconocimiento de sentencias extranjeras', 'Exequátur', 'Nacionalidad'],
    normsCount: 1,
    caseLawsCount: 0,
    proceduresCount: 1,
  },
  // 28. DERECHO AMBIENTAL
  {
    id: 'spec-28',
    name: 'Derecho Ambiental',
    slug: 'derecho-ambiental',
    description: 'Ley General sobre Medio Ambiente y Recursos Naturales 64-00, áreas protegidas (Ley 202-04), aguas, licencias ambientales y delitos ecológicos.',
    iconName: 'Trees',
    displayOrder: 28,
    groupCategory: 'Derecho Regulatorio & Recursos',
    subtopics: ['Medio ambiente', 'Recursos naturales', 'Agua', 'Bosques', 'Áreas protegidas', 'Contaminación', 'Residuos', 'Impacto ambiental', 'Responsabilidad ambiental'],
    normsCount: 0,
    caseLawsCount: 0,
    proceduresCount: 0,
  },
  // 29. DERECHO AGRARIO
  {
    id: 'spec-29',
    name: 'Derecho Agrario',
    slug: 'derecho-agrario',
    description: 'Ley 5879 de Reforma Agraria, Instituto Agrario Dominicano (IAD), parcelas comuneras, contratos de arrendamiento rural y producción agropecuaria.',
    iconName: 'Wheat',
    displayOrder: 29,
    groupCategory: 'Derecho Regulatorio & Recursos',
    subtopics: ['Tierras agrícolas', 'Reforma agraria', 'Producción agropecuaria', 'Arrendamiento rural', 'Recursos naturales relacionados'],
    normsCount: 0,
    caseLawsCount: 0,
    proceduresCount: 0,
  },
  // 30. DERECHO MINERO
  {
    id: 'spec-30',
    name: 'Derecho Minero',
    slug: 'derecho-minero',
    description: 'Ley Minera 146-71, concesiones de exploración y explotación minera, Dirección General de Minería y regalías del Estado.',
    iconName: 'Mountain',
    displayOrder: 30,
    groupCategory: 'Derecho Regulatorio & Recursos',
    subtopics: ['Concesiones mineras', 'Exploración', 'Explotación', 'Recursos minerales', 'Obligaciones ambientales', 'Regulación minera'],
    normsCount: 0,
    caseLawsCount: 0,
    proceduresCount: 0,
  },
  // 31. DERECHO ENERGÉTICO
  {
    id: 'spec-31',
    name: 'Derecho Energético',
    slug: 'derecho-energetico',
    description: 'Ley General de Electricidad 125-01, Ley 57-07 de Incentivo a las Energías Renovables, Superintendencia de Electricidad (SIE) e hidrocarburos.',
    iconName: 'Zap',
    displayOrder: 31,
    groupCategory: 'Derecho Regulatorio & Recursos',
    subtopics: ['Electricidad', 'Hidrocarburos', 'Energías renovables', 'Generación', 'Distribución', 'Comercialización', 'Regulación energética'],
    normsCount: 0,
    caseLawsCount: 0,
    proceduresCount: 0,
  },
  // 32. DERECHO MARÍTIMO
  {
    id: 'spec-32',
    name: 'Derecho Marítimo',
    slug: 'derecho-maritimo',
    description: 'Ley de Comercio Marítimo 5-23, régimen de buques, puertos (APORDOM), transporte de carga marítima, abordajes y salvamento.',
    iconName: 'Ship',
    displayOrder: 32,
    groupCategory: 'Derecho Regulatorio & Transporte',
    subtopics: ['Transporte marítimo', 'Buques', 'Puertos', 'Navegación', 'Responsabilidad marítima', 'Comercio marítimo'],
    normsCount: 0,
    caseLawsCount: 0,
    proceduresCount: 0,
  },
  // 33. DERECHO AERONÁUTICO
  {
    id: 'spec-33',
    name: 'Derecho Aeronáutico',
    slug: 'derecho-aeronautico',
    description: 'Ley 491-06 de Aviación Civil de la República Dominicana, Instituto Dominicano de Aviación Civil (IDAC), aeropuertos y transporte aéreo.',
    iconName: 'Plane',
    displayOrder: 33,
    groupCategory: 'Derecho Regulatorio & Transporte',
    subtopics: ['Aviación civil', 'Aeropuertos', 'Aeronaves', 'Transporte aéreo', 'Seguridad aérea', 'Responsabilidad'],
    normsCount: 0,
    caseLawsCount: 0,
    proceduresCount: 0,
  },
  // 34. DERECHO DE TRANSPORTE Y TRÁNSITO
  {
    id: 'spec-34',
    name: 'Derecho de Transporte y Tránsito',
    slug: 'derecho-transporte-transito',
    description: 'Ley 63-17 de Movilidad, Transporte Terrestre, Tránsito y Seguridad Vial de la República Dominicana (INTRANT, DIGESETT y multas).',
    iconName: 'Car',
    displayOrder: 34,
    groupCategory: 'Derecho Regulatorio & Transporte',
    subtopics: ['Vehículos', 'Licencias', 'Matrículas', 'Accidentes', 'Infracciones', 'Multas', 'Transporte público', 'Responsabilidad por accidentes'],
    normsCount: 1,
    caseLawsCount: 0,
    proceduresCount: 0,
  },
  // 35. DERECHO SANITARIO
  {
    id: 'spec-35',
    name: 'Derecho Sanitario',
    slug: 'derecho-sanitario',
    description: 'Ley General de Salud 42-01, Ministerio de Salud Pública, habilitación de centros médicos, medicamentos, bioética y responsabilidad médica.',
    iconName: 'HeartPulse',
    displayOrder: 35,
    groupCategory: 'Derecho Social & Salud',
    subtopics: ['Salud pública', 'Centros médicos', 'Profesionales de la salud', 'Medicamentos', 'Productos sanitarios', 'Responsabilidad sanitaria'],
    normsCount: 0,
    caseLawsCount: 0,
    proceduresCount: 0,
  },
  // 36. DERECHO NOTARIAL
  {
    id: 'spec-36',
    name: 'Derecho Notarial',
    slug: 'derecho-notarial',
    description: 'Ley 140-15 del Notariado Dominicano, fe pública, actos auténticos, legalizaciones de firmas, protocolo notarial y Colegio Dominicano de Notarios.',
    iconName: 'FileSignature',
    displayOrder: 36,
    groupCategory: 'Derecho Profesional & Fe Pública',
    subtopics: ['Notarios', 'Actos notariales', 'Legalizaciones', 'Protocolos', 'Instrumentos públicos', 'Autenticaciones'],
    normsCount: 0,
    caseLawsCount: 0,
    proceduresCount: 0,
  },
  // 37. DERECHO REGISTRAL
  {
    id: 'spec-37',
    name: 'Derecho Registral',
    slug: 'derecho-registral',
    description: 'Ley 4-23 de Actos del Estado Civil, Registro Mercantil en Cámaras de Comercio, Registro de Títulos Inmobiliarios y publicidad registral.',
    iconName: 'Layers',
    displayOrder: 37,
    groupCategory: 'Derecho Profesional & Fe Pública',
    subtopics: ['Registro Civil', 'Registro Mercantil', 'Registro de Títulos', 'Registros administrativos', 'Publicidad registral'],
    normsCount: 1,
    caseLawsCount: 0,
    proceduresCount: 1,
  },
  // 38. DERECHO PENITENCIARIO
  {
    id: 'spec-38',
    name: 'Derecho Penitenciario',
    slug: 'derecho-penitenciario',
    description: 'Ley 113-21 que regula el Sistema Penitenciario y Correccional en la República Dominicana, ejecución de penas y Juez de Ejecución de la Pena.',
    iconName: 'Lock',
    displayOrder: 38,
    groupCategory: 'Derecho Penal & Punitivo',
    subtopics: ['Sistema penitenciario', 'Ejecución de penas', 'Derechos de personas privadas de libertad', 'Libertad condicional', 'Régimen penitenciario'],
    normsCount: 0,
    caseLawsCount: 0,
    proceduresCount: 0,
  },
  // 39. DERECHO MILITAR
  {
    id: 'spec-39',
    name: 'Derecho Militar',
    slug: 'derecho-militar',
    description: 'Ley Orgánica de las Fuerzas Armadas (Ley 139-13), Código de Justicia Militar, régimen disciplinario castrense e infracciones militares.',
    iconName: 'Shield',
    displayOrder: 39,
    groupCategory: 'Derecho de Seguridad & Defensa',
    subtopics: ['Fuerzas Armadas', 'Régimen disciplinario', 'Justicia militar', 'Infracciones militares'],
    normsCount: 0,
    caseLawsCount: 0,
    proceduresCount: 0,
  },
  // 40. DERECHO POLICIAL
  {
    id: 'spec-40',
    name: 'Derecho Policial',
    slug: 'derecho-policial',
    description: 'Ley Orgánica de la Policía Nacional (Ley 590-16), uso legítimo de la fuerza, régimen disciplinario, estatuto policial y actuaciones preventivas.',
    iconName: 'ShieldCheck',
    displayOrder: 40,
    groupCategory: 'Derecho de Seguridad & Defensa',
    subtopics: ['Policía Nacional', 'Régimen disciplinario', 'Actuaciones policiales', 'Uso de la fuerza', 'Responsabilidad'],
    normsCount: 0,
    caseLawsCount: 0,
    proceduresCount: 0,
  },
  // 41. DERECHO DISCIPLINARIO
  {
    id: 'spec-41',
    name: 'Derecho Disciplinario',
    slug: 'derecho-disciplinario',
    description: 'Régimen de faltas y sanciones disciplinarias en la Administración Pública (Ley 41-08), Poder Judicial, Ministerio Público y colegios profesionales.',
    iconName: 'UserCheck',
    displayOrder: 41,
    groupCategory: 'Derecho Público & Institucional',
    subtopics: ['Funcionarios públicos', 'Servidores públicos', 'Responsabilidad disciplinaria', 'Procedimientos disciplinarios', 'Sanciones'],
    normsCount: 0,
    caseLawsCount: 0,
    proceduresCount: 0,
  },
  // 42. DERECHOS HUMANOS
  {
    id: 'spec-42',
    name: 'Derechos Humanos',
    slug: 'derechos-humanos',
    description: 'Convención Americana sobre Derechos Humanos (Pacto de San José), Sistema Interamericano (Corte IDH y CIDH), Defensor del Pueblo (Ley 19-01).',
    iconName: 'Heart',
    displayOrder: 42,
    groupCategory: 'Derecho Internacional & Tratados',
    subtopics: ['Derechos civiles', 'Derechos políticos', 'Derechos económicos', 'Derechos sociales', 'Derechos culturales', 'Derechos colectivos', 'Sistema Interamericano', 'Tratados internacionales'],
    normsCount: 1,
    caseLawsCount: 1,
    proceduresCount: 1,
  },
];

export async function getAllSpecialties(): Promise<SpecialtyItem[]> {
  try {
    const list = await db.specialty.findMany({
      orderBy: { displayOrder: 'asc' },
      include: {
        _count: {
          select: {
            norms: true,
            caseLaws: true,
            procedures: true,
          },
        },
      },
    });

    if (list && list.length > 0) {
      return list.map((s) => {
        const initial = INITIAL_DOMINICAN_SPECIALTIES.find((i) => i.slug === s.slug);
        return {
          id: s.id,
          name: s.name,
          slug: s.slug,
          description: s.description || (initial ? initial.description : null),
          iconName: s.iconName || (initial ? initial.iconName : 'Scale'),
          displayOrder: s.displayOrder,
          groupCategory: initial?.groupCategory || 'Derecho Dominicano',
          subtopics: initial?.subtopics || [],
          normsCount: s._count.norms,
          caseLawsCount: s._count.caseLaws,
          proceduresCount: s._count.procedures,
        };
      });
    }
  } catch (error) {
    console.warn('DB offline or initializing, using initial Dominican specialties fallback');
  }

  return INITIAL_DOMINICAN_SPECIALTIES;
}

export async function getSpecialtyBySlug(slug: string): Promise<SpecialtyItem | null> {
  const fallback = INITIAL_DOMINICAN_SPECIALTIES.find((s) => s.slug === slug);
  if (!fallback) return null;

  try {
    const item = await db.specialty.findUnique({
      where: { slug },
      include: {
        _count: {
          select: {
            norms: true,
            caseLaws: true,
            procedures: true,
          },
        },
      },
    });

    if (item) {
      return {
        id: item.id,
        name: item.name,
        slug: item.slug,
        description: item.description || fallback.description,
        iconName: item.iconName || fallback.iconName,
        displayOrder: item.displayOrder,
        groupCategory: fallback.groupCategory,
        subtopics: fallback.subtopics,
        normsCount: item._count.norms,
        caseLawsCount: item._count.caseLaws,
        proceduresCount: item._count.procedures,
      };
    }
  } catch {
    // Fallback
  }

  return fallback;
}