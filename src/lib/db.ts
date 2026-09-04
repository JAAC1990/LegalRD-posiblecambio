/**
 * ====================================================================
 * LEGAL RD — SISTEMA OPERATIVO JURÍDICO DOMINICANO
 * ====================================================================
 * Módulo: Conexión Prisma ORM con Manejo Resiliente de Fallos
 * Ruta: src/lib/db.ts
 * Ámbito Legal: Capa de Persistencia de Datos
 * 
 * PROPÓSITO:
 * Instancia singleton de Prisma Client con mecanismo de fallback tolerante a fallos cuando la base de datos PostgreSQL local se encuentra en pausa o desconectada.
 * 
 * FUNDAMENTOS NORMATIVOS:
 * Prisma Client 6.x y PostgreSQL.
 * 
 * REGLA FUNDAMENTAL DE PRESERVACIÓN ACUMULATIVA:
 * Este archivo forma parte del ecosistema integral de Legal RD.
 * No se permite eliminar, simplificar ni alterar la lógica preexistente.
 * ====================================================================
 */

import { PrismaClient } from "@prisma/client";

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined;
};

export const db =
  globalForPrisma.prisma ??
  new PrismaClient({
    log: process.env.NODE_ENV === "development" ? ["error", "warn"] : ["error"],
  });

if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = db;
