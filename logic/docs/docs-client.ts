import { createClient } from "@/logic/supabase/client";
import { type DocItem, type DocPlatform } from "./types";

/**
 * Obtiene todas las documentaciones desde Supabase en el Navegador (Client Components).
 */
export async function fetchDocsClient(): Promise<DocItem[]> {
  try {
    const supabase = createClient();
    const { data, error } = await supabase
      .from("docs")
      .select("*")
      .order("name", { ascending: true });

    if (error) {
      console.warn("Error en fetchDocsClient:", error.message);
      return [];
    }

    return (data as DocItem[]) ?? [];
  } catch (err) {
    console.warn("Fallo de conexión en fetchDocsClient:", err);
    return [];
  }
}

/**
 * Obtiene las plataformas activas para el marquee de la home.
 */
export async function fetchPlatformsClient(limit = 24): Promise<DocPlatform[]> {
  try {
    const supabase = createClient();
    const { data, error } = await supabase
      .from("docs")
      .select("name, slug, logo_key")
      .order("is_popular", { ascending: false })
      .order("name", { ascending: true })
      .limit(limit);

    if (error) {
      console.warn("Error en fetchPlatformsClient:", error.message);
      return [];
    }

    return (data as DocPlatform[]) ?? [];
  } catch {
    return [];
  }
}

/**
 * Filtra la lista de documentaciones según la consulta de búsqueda.
 */
export function filterDocs(docs: DocItem[], query: string): DocItem[] {
  if (!query.trim()) return docs;

  const q = query.toLowerCase().trim();
  return docs.filter((doc) => {
    const matchName = doc.name?.toLowerCase().includes(q);
    const matchDesc = doc.description?.toLowerCase().includes(q);
    const matchTags = Array.isArray(doc.tags)
      ? doc.tags.some((t) => t.toLowerCase().includes(q))
      : false;
    return matchName || matchDesc || matchTags;
  });
}

/**
 * Genera la URL pública del endpoint compilado de una documentación.
 */
export function getDocEndpointUrl(slug: string): string {
  return `https://api.remora.dev/v1/docs/${slug}.json`;
}

