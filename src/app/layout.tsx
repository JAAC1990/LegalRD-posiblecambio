/**
 * ====================================================================
 * LEGAL RD — SISTEMA OPERATIVO JURÍDICO DOMINICANO
 * ====================================================================
 * Módulo: Layout Raíz de la Plataforma Legal RD
 * Ruta: src/app/layout.tsx
 * Ámbito Legal: Infraestructura de Renderizado Next.js
 * 
 * PROPÓSITO:
 * Define fuentes tipográficas (Merriweather para estilo serif forense, Inter para interfaz), metadatos SEO globales y contenedor de la aplicación.
 * 
 * FUNDAMENTOS NORMATIVOS:
 * Next.js App Router Root Layout.
 * 
 * REGLA FUNDAMENTAL DE PRESERVACIÓN ACUMULATIVA:
 * Este archivo forma parte del ecosistema integral de Legal RD.
 * No se permite eliminar, simplificar ni alterar la lógica preexistente.
 * ====================================================================
 */

import type { Metadata } from "next";
import "./globals.css";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";

export const metadata: Metadata = {
  title: "Legal RD | Plataforma del Ordenamiento Jurídico Dominicano",
  description: "Consulta estructurada, organización, estudio y gestión de códigos, leyes, jurisprudencia y procedimientos de la República Dominicana.",
};

/**
 * Componente Principal de Vista: `RootLayout`
 * Renderiza la interfaz de usuario interactiva y coordina el flujo operativo del módulo.
 * @returns Elemento JSX representativo de la página o vista
 */
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es" className="h-full">
      <body className="flex flex-col min-h-screen bg-slate-50 text-slate-900 antialiased selection:bg-amber-100 selection:text-amber-900">
        <Navbar />
        <main className="flex-1 flex flex-col">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
