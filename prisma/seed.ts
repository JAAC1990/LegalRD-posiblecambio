import { PrismaClient, RoleType, NormType, NormStatus, RelationType } from "@prisma/client";
import * as bcrypt from "bcryptjs";

const prisma = new PrismaClient();

async function main() {
  console.log("Iniciando carga de datos iniciales (Seed DEMO para Legal RD)...");

  // 1. Crear las 19 Especialidades Jurídicas Dominicanas
  const specialtiesData = [
    { name: "Derecho Laboral", slug: "derecho-laboral", description: "Código de Trabajo (Ley 16-92), contratos, desahucio, prestaciones y jurisprudencia laboral.", iconName: "Briefcase", displayOrder: 1 },
    { name: "Derecho Penal", slug: "derecho-penal", description: "Código Penal, tipos penales, sanciones, medidas y doctrina punitiva.", iconName: "ShieldAlert", displayOrder: 2 },
    { name: "Derecho Procesal Penal", slug: "derecho-procesal-penal", description: "Código Procesal Penal (Ley 76-02), medidas de coerción y juicio oral.", iconName: "Gavel", displayOrder: 3 },
    { name: "Derecho Civil", slug: "derecho-civil", description: "Código Civil, obligaciones, contratos, responsabilidad civil y derechos reales.", iconName: "BookOpen", displayOrder: 4 },
    { name: "Derecho Procesal Civil", slug: "derecho-procesal-civil", description: "Código de Procedimiento Civil, demandas, embargos y recursos judiciales.", iconName: "FileText", displayOrder: 5 },
    { name: "Derecho de Familia", slug: "derecho-de-familia", description: "Régimen matrimonial, filiación, adopción, tutela y derecho de menores (Ley 136-03).", iconName: "Users", displayOrder: 6 },
    { name: "Derecho Inmobiliario", slug: "derecho-inmobiliario", description: "Ley 108-05 de Registro Inmobiliario, deslindes, transferencias y títulos de propiedad.", iconName: "Home", displayOrder: 7 },
    { name: "Derecho Comercial", slug: "derecho-comercial", description: "Código de Comercio, actos de comercio, títulos valores y contratos mercantiles.", iconName: "Store", displayOrder: 8 },
    { name: "Derecho Societario", slug: "derecho-societario", description: "Ley 479-08 de Sociedades Comerciales y Empresas Individuales de Responsabilidad Limitada.", iconName: "Building", displayOrder: 9 },
    { name: "Derecho Tributario", slug: "derecho-tributario", description: "Código Tributario (Ley 11-92), impuestos internos (ITBIS, ISR) y deberes formales.", iconName: "Receipt", displayOrder: 10 },
    { name: "Derecho Administrativo", slug: "derecho-administrativo", description: "Ley 107-13 de los Derechos de las Personas en sus Relaciones con la Administración.", iconName: "Landmark", displayOrder: 11 },
    { name: "Derecho Constitucional", slug: "derecho-constitucional", description: "Constitución Dominicana, garantías de derechos fundamentales y amparo.", iconName: "Scale", displayOrder: 12 },
    { name: "Derecho Migratorio", slug: "derecho-migratorio", description: "Ley General de Migración 285-04, residencias, visados y estatuto de extranjeros.", iconName: "Globe", displayOrder: 13 },
    { name: "Derecho de Tránsito", slug: "derecho-de-transito", description: "Ley 63-17 de Movilidad, Transporte Terrestre, Tránsito y Seguridad Vial.", iconName: "Car", displayOrder: 14 },
    { name: "Derecho Bancario y Financiero", slug: "derecho-bancario", description: "Ley 183-02 Monetaria y Financiera, intermediación cambiaria y regulación bancaria.", iconName: "Coins", displayOrder: 15 },
    { name: "Derecho de Propiedad Intelectual", slug: "propiedad-intelectual", description: "Ley 20-00 sobre Propiedad Industrial y Ley 65-00 sobre Derecho de Autor.", iconName: "Award", displayOrder: 16 },
    { name: "Derecho Ambiental", slug: "derecho-ambiental", description: "Ley General sobre Medio Ambiente y Recursos Naturales 64-00.", iconName: "Trees", displayOrder: 17 },
    { name: "Derecho de Sucesiones", slug: "derecho-de-sucesiones", description: "Partición de herencia, testamentos, legados y reserva hereditaria.", iconName: "Scroll", displayOrder: 18 },
    { name: "Derecho Internacional Privado", slug: "internacional-privado", description: "Ley 544-14 sobre Derecho Internacional Privado y competencia judicial internacional.", iconName: "Compass", displayOrder: 19 },
  ];

  for (const spec of specialtiesData) {
    await prisma.specialty.upsert({
      where: { slug: spec.slug },
      update: spec,
      create: spec,
    });
  }
  console.log("✓ 19 Especialidades jurídicas dominicanas registradas con éxito.");

  // 2. Crear Fuentes Oficiales
  const fuenteGaceta = await prisma.legalSource.upsert({
    where: { id: "fuente-gaceta-oficial" },
    update: {},
    create: {
      id: "fuente-gaceta-oficial",
      name: "Gaceta Oficial de la República Dominicana",
      institution: "Consultoría Jurídica del Poder Ejecutivo",
      url: "https://www.consultoria.gov.do",
      officialRef: "Órgano oficial del Estado Dominicano",
      description: "Fuente primaria oficial de leyes, decretos y reglamentos.",
    },
  });

  // 3. Crear Tribunales
  await prisma.court.upsert({
    where: { name: "Suprema Corte de Justicia" },
    update: {},
    create: {
      name: "Suprema Corte de Justicia",
      acronym: "SCJ",
      chamber: "Tercera Sala (Laboral y Tierras)",
      jurisdiction: "Nacional",
    },
  });

  await prisma.court.upsert({
    where: { name: "Tribunal Constitucional" },
    update: {},
    create: {
      name: "Tribunal Constitucional",
      acronym: "TC",
      chamber: "Pleno",
      jurisdiction: "Nacional",
    },
  });

  // 4. Crear Usuarios de Prueba (SuperAdmin, Abogado, Estudiante)
  const passwordHash = await bcrypt.hash("AdminLegalRD2026!", 10);

  const superAdmin = await prisma.user.upsert({
    where: { email: "admin@legalrd.do" },
    update: {},
    create: {
      email: "admin@legalrd.do",
      passwordHash,
      fullName: "Lic. Administrador Principal",
      roleType: RoleType.SUPER_ADMIN,
      isActive: true,
      isVerified: true,
    },
  });

  await prisma.user.upsert({
    where: { email: "abogado@legalrd.do" },
    update: {},
    create: {
      email: "abogado@legalrd.do",
      passwordHash,
      fullName: "Lic. Carlos Santana (Abogado)",
      roleType: RoleType.LAWYER,
      isActive: true,
      isVerified: true,
    },
  });

  await prisma.user.upsert({
    where: { email: "estudiante@legalrd.do" },
    update: {},
    create: {
      email: "estudiante@legalrd.do",
      passwordHash,
      fullName: "Ana Morales (Estudiante de Derecho)",
      roleType: RoleType.STUDENT,
      isActive: true,
      isVerified: true,
    },
  });

  // 5. Norma DEMO: Código de Trabajo (Ley 16-92)
  const specLaboral = await prisma.specialty.findUnique({ where: { slug: "derecho-laboral" } });
  if (specLaboral) {
    const codigoTrabajo = await prisma.legalNorm.upsert({
      where: { slug: "codigo-de-trabajo-ley-16-92" },
      update: {},
      create: {
        number: "16-92",
        name: "Código de Trabajo de la República Dominicana",
        shortName: "Código de Trabajo",
        slug: "codigo-de-trabajo-ley-16-92",
        normType: NormType.CODE,
        status: NormStatus.VIGENTE,
        specialtyId: specLaboral.id,
        sourceId: fuenteGaceta.id,
        promulgationDate: new Date("1992-05-29"),
        publicationDate: new Date("1992-05-31"),
        summary: "Cuerpo normativo rector de las relaciones laborales entre empleadores y trabajadores en la República Dominicana.",
        remarks: "Promulgado mediante Gaceta Oficial No. 9836.",
        createdById: superAdmin.id,
      },
    });

    await prisma.article.upsert({
      where: {
        normId_articleNumber_articleNumberSub: {
          normId: codigoTrabajo.id,
          articleNumber: 1,
          articleNumberSub: "",
        },
      },
      update: {},
      create: {
        normId: codigoTrabajo.id,
        articleNumber: 1,
        articleNumberSub: "",
        displayNumber: "Art. 1",
        title: "Definición del Contrato de Trabajo",
        content: "El contrato de trabajo es aquel por el cual una persona se obliga, mediante una retribución, a prestar un servicio personal a otra, bajo la dependencia y dirección inmediata o delegada de ésta.",
        status: NormStatus.VIGENTE,
        keywords: ["contrato de trabajo", "subordinación", "retribución"],
        createdById: superAdmin.id,
      },
    });

    await prisma.article.upsert({
      where: {
        normId_articleNumber_articleNumberSub: {
          normId: codigoTrabajo.id,
          articleNumber: 80,
          articleNumberSub: "",
        },
      },
      update: {},
      create: {
        normId: codigoTrabajo.id,
        articleNumber: 80,
        articleNumberSub: "",
        displayNumber: "Art. 80",
        title: "Auxilio de Cesantía por Desahucio",
        content: "El empleador que ejerza el desahucio debe pagar al trabajador un auxilio de cesantía cuyo importe se fijará de acuerdo con las reglas siguientes: 1. Después de un trabajo continuo no menor de tres meses ni mayor de seis, una suma igual a seis días de salario ordinario; 2. Después de un trabajo continuo no menor de seis meses ni mayor de un año, una suma igual a trece días de salario ordinario; 3. Después de un trabajo continuo no menor de un año ni mayor de cinco, una suma igual a veintiún días de salario ordinario por cada año de servicio prestado; 4. Después de un trabajo continuo no menor de cinco años, una suma igual a veintitrés días de salario ordinario por cada año de servicio prestado.",
        status: NormStatus.VIGENTE,
        keywords: ["desahucio", "cesantía", "prestaciones laborales"],
        createdById: superAdmin.id,
      },
    });
  }

  console.log("✓ Base de datos sembrada con datos DEMO iniciales exitosamente.");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });