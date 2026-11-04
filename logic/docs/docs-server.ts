import { createClient } from "@/logic/supabase/server";
import { type DocItem, type DocDetailItem, type DocPlatform } from "./types";

/**
 * Obtiene todas las documentaciones desde Supabase en el Servidor (Server Components).
 * Exclusivo para entorno de servidor (usa cookies de next/headers).
 */
export async function fetchDocsServer(): Promise<DocItem[]> {
  try {
    const supabase = await createClient();
    const { data, error } = await supabase
      .from("docs")
      .select("*")
      .order("name", { ascending: true });

    if (error) {
      console.warn("Error en fetchDocsServer:", error.message);
      return [];
    }

    return (data as DocItem[]) ?? [];
  } catch (err) {
    console.warn("Fallo de conexión en fetchDocsServer:", err);
    return [];
  }
}

/**
 * Obtiene las plataformas activas para el marquee de la home en el Servidor.
 */
export async function fetchPlatformsServer(limit = 24): Promise<DocPlatform[]> {
  try {
    const supabase = await createClient();
    const { data, error } = await supabase
      .from("docs")
      .select("name, slug, logo_key")
      .order("is_popular", { ascending: false })
      .order("name", { ascending: true })
      .limit(limit);

    if (error) {
      console.warn("Error en fetchPlatformsServer:", error.message);
      return [];
    }

    return (data as DocPlatform[]) ?? [];
  } catch (err) {
    console.warn("Fallo en fetchPlatformsServer:", err);
    return [];
  }
}

/**
 * Obtiene una documentación específica por su slug desde el Servidor,
 * vinculando los detalles adicionales desde la tabla doc_details.
 */
export async function fetchDocBySlugServer(slug: string): Promise<DocItem | null> {
  try {
    const supabase = await createClient();
    const { data, error } = await supabase
      .from("docs")
      .select("*")
      .eq("slug", slug)
      .maybeSingle();

    if (error || !data) {
      return null;
    }

    let details: DocDetailItem | null = null;
    try {
      const { data: detailData } = await supabase
        .from("doc_details")
        .select("*")
        .eq("slug", slug)
        .maybeSingle();

      if (detailData) {
        details = detailData as DocDetailItem;
      }
    } catch {
      // Si la tabla no ha sido creada o falla, se mantiene fallback limpio
      details = null;
    }

    return {
      ...(data as DocItem),
      details,
    };
  } catch (err) {
    console.warn(`Fallo de conexión en fetchDocBySlugServer (${slug}):`, err);
    return null;
  }
}
