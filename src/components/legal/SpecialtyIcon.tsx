/**
 * ====================================================================
 * LEGAL RD — SISTEMA OPERATIVO JURÍDICO DOMINICANO
 * ====================================================================
 * Módulo: Componente Selector de Iconos Jurídicos por Especialidad
 * Ruta: src/components/legal/SpecialtyIcon.tsx
 * Ámbito Legal: Interfaz de Usuario / Iconografía Legal
 * 
 * PROPÓSITO:
 * Mapea slugs de especialidades a iconos vectoriales de Lucide React con esquemas de colores adaptados a cada rama del Derecho.
 * 
 * FUNDAMENTOS NORMATIVOS:
 * Lucide React Icons.
 * 
 * REGLA FUNDAMENTAL DE PRESERVACIÓN ACUMULATIVA:
 * Este archivo forma parte del ecosistema integral de Legal RD.
 * No se permite eliminar, simplificar ni alterar la lógica preexistente.
 * ====================================================================
 */

﻿import {
  Briefcase,
  ShieldAlert,
  Gavel,
  BookOpen,
  FileText,
  Users,
  Home,
  Store,
  Building,
  Receipt,
  Landmark,
  Scale,
  Globe,
  Car,
  Coins,
  Award,
  Trees,
  Scroll,
  Compass,
  HeartPulse,
  FileSignature,
  Layers,
  Lock,
  Shield,
  ShieldCheck,
  UserCheck,
  Heart,
  Radio,
  Cpu,
  Ship,
  Plane,
  Zap,
  Mountain,
  Wheat,
  Vote,
  ShoppingBag,
  Target,
  Baby,
  RefreshCw,
  Truck,
  LucideIcon
} from 'lucide-react';

const ICON_MAP: Record<string, LucideIcon> = {
  Briefcase,
  ShieldAlert,
  Gavel,
  BookOpen,
  FileText,
  Users,
  Home,
  Store,
  Building,
  Receipt,
  Landmark,
  Scale,
  Globe,
  Car,
  Coins,
  Award,
  Trees,
  Scroll,
  Compass,
  HeartPulse,
  FileSignature,
  Layers,
  Lock,
  Shield,
  ShieldCheck,
  UserCheck,
  Heart,
  Radio,
  Cpu,
  Ship,
  Plane,
  Zap,
  Mountain,
  Wheat,
  Vote,
  ShoppingBag,
  Target,
  Baby,
  RefreshCw,
  Truck,
};

/**
 * Función Operativa: `SpecialtyIcon`
 * Procesa la lógica de negocio y reglas jurídicas correspondientes.
 */
export function SpecialtyIcon({ name, className = 'w-5 h-5' }: { name?: string | null; className?: string }) {
  const IconComponent = (name && ICON_MAP[name]) ? ICON_MAP[name] : Scale;
  return <IconComponent className={className} />;
}