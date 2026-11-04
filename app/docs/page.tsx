import { DocsDirectoryView } from "@/components/docs/DocsDirectoryView";
import { fetchDocsServer } from "@/logic/docs/docs-server";

export const metadata = {
  title: "Compiled Documentation — Remora",
  description:
    "Directorio de esquemas nativos y especificaciones compiladas para agentes de inteligencia artificial y LLMs.",
};

export default async function DocsPage() {
  const docs = await fetchDocsServer();
  return <DocsDirectoryView initialDocs={docs} />;
}
