import React from "react";
import { notFound } from "next/navigation";
import { DocsNavbar } from "@/components/layout/DocsNavbar";
import { Footer } from "@/components/layout/Footer";
import { renderPlatformLogo } from "@/components/docs/PlatformLogos";
import { DocInstallSnippet } from "@/components/docs/DocInstallSnippet";
import { fetchDocBySlugServer } from "@/logic/docs/docs-server";
import { getPlatformColor } from "@/logic/docs";

interface DocDetailPageProps {
  params: Promise<{
    slug: string;
  }>;
}

export async function generateMetadata({ params }: DocDetailPageProps) {
  const { slug } = await params;
  const doc = await fetchDocBySlugServer(slug);

  if (!doc) {
    return {
      title: "Documentación no encontrada — Remora",
    };
  }

  return {
    title: `${doc.name} — Remora Docs`,
    description: doc.description,
  };
}

export default async function DocDetailPage({ params }: DocDetailPageProps) {
  const { slug } = await params;
  const doc = await fetchDocBySlugServer(slug);

  if (!doc) {
    notFound();
  }

  const brand = getPlatformColor(doc.logo_key ?? doc.slug);
  const details = doc.details;

  const version = details?.version || doc.version;
  const installCommand = `remora add ${doc.slug}`;
  const content = details?.content;

  return (
    <main className="min-h-screen bg-[#f2f2f2] flex flex-col justify-between font-sans antialiased">
      {/* Brand selection color */}
      <style>{`
        ::selection {
          background-color: ${brand.primary} !important;
          color: #ffffff !important;
        }
      `}</style>

      {/* Docs Navbar */}
      <DocsNavbar
        docTitle={doc.name}
        backHref="/docs"
        backLabel="Volver a Docs"
        accentColor={brand.primary}
      />

      <div className="flex-1 max-w-2xl w-full mx-auto px-6 py-12 sm:py-16">
        {/* Header: Logo & Title */}
        <div className="flex items-center gap-3.5 mb-4">
          <div className="w-10 h-10 shrink-0 flex items-center justify-center">
            {renderPlatformLogo(doc.logo_key ?? doc.slug, "w-10 h-10")}
          </div>

          <div className="flex items-baseline gap-2.5">
            <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-neutral-950">
              {doc.name}
            </h1>
            {version && (
              <span className="text-xs text-neutral-400 font-normal select-none">
                {version}
              </span>
            )}
          </div>
        </div>

        {/* Short description */}
        <p className="text-[15px] sm:text-[16px] text-neutral-600 leading-relaxed mb-6">
          {doc.description}
        </p>

        {/* Agent Install Snippet */}
        <div className="mb-6">
          <DocInstallSnippet command={installCommand} />
        </div>

        {/* Detailed documentation content for agents */}
        {content && (
          <div className="mt-8 pt-6 border-t border-neutral-300/60">
            <div className="text-[14.5px] sm:text-[15px] text-neutral-800 leading-relaxed whitespace-pre-line">
              {content}
            </div>
          </div>
        )}
      </div>

      {/* Footer */}
      <Footer accentColor={brand.primary} lightColor={brand.light} />
    </main>
  );
}
