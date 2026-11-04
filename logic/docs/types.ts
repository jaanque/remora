import React from "react";

export type DocCategory =
  | "all"
  | "ai"
  | "backend"
  | "frameworks"
  | "cloud"
  | "payments"
  | "tools";

export interface DocDetailItem {
  id?: string;
  doc_id?: string;
  slug: string;
  official_url?: string;
  officialurl?: string;
  github_url?: string;
  githuburl?: string;
  version?: string;
  content?: string;
  created_at?: string;
  updated_at?: string;
}

export interface DocItem {
  id: string;
  name: string;
  category: DocCategory;
  categoryLabel?: string;
  category_label?: string;
  description: string;
  logo?: React.ReactNode;
  logoKey?: string;
  logo_key?: string;
  tokenSaving?: string;
  token_saving?: string;
  endpointsCount?: number;
  endpoints_count?: number;
  slug: string;
  tags?: string[];
  version?: string;
  isPopular?: boolean;
  is_popular?: boolean;
  details?: DocDetailItem | null;
  created_at?: string;
  updated_at?: string;
}

export interface DocPlatform {
  name: string;
  slug: string;
  logo_key?: string;
}

export const CATEGORIES: { id: DocCategory; label: string }[] = [
  { id: "all", label: "Todas" },
  { id: "ai", label: "AI & Modelos" },
  { id: "frameworks", label: "Frameworks" },
  { id: "backend", label: "Backend & DB" },
  { id: "cloud", label: "Cloud & DevOps" },
  { id: "payments", label: "Pagos & Facturación" },
  { id: "tools", label: "Herramientas" },
];

