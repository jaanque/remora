"use client";

import { useState, useMemo, useEffect } from "react";
import { type DocItem } from "./types";
import { fetchDocsClient, filterDocs } from "./docs-client";

export const DOCS_PER_PAGE = 15;

export function useDocs(initialDocs?: DocItem[]) {
  const [docs, setDocs] = useState<DocItem[]>(initialDocs ?? []);
  const [isLoading, setIsLoading] = useState<boolean>(!initialDocs || initialDocs.length === 0);
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    if (initialDocs && initialDocs.length > 0) {
      setDocs(initialDocs);
      setIsLoading(false);
      return;
    }

    let isMounted = true;
    async function load() {
      try {
        const data = await fetchDocsClient();
        if (isMounted) {
          setDocs(data);
        }
      } catch (err) {
        console.error("Error cargando documentaciones:", err);
      } finally {
        if (isMounted) setIsLoading(false);
      }
    }

    load();

    return () => {
      isMounted = false;
    };
  }, [initialDocs]);

  // Al buscar, reinicia automáticamente a la página 1
  useEffect(() => {
    setCurrentPage(1);
  }, [searchQuery]);

  const filteredDocs = useMemo(() => {
    return filterDocs(docs, searchQuery);
  }, [docs, searchQuery]);

  const totalPages = useMemo(() => {
    return Math.max(1, Math.ceil(filteredDocs.length / DOCS_PER_PAGE));
  }, [filteredDocs.length]);

  const paginatedDocs = useMemo(() => {
    const start = (currentPage - 1) * DOCS_PER_PAGE;
    return filteredDocs.slice(start, start + DOCS_PER_PAGE);
  }, [filteredDocs, currentPage]);

  return {
    docs,
    filteredDocs,
    paginatedDocs,
    isLoading,
    searchQuery,
    setSearchQuery,
    currentPage,
    setCurrentPage,
    totalPages,
    totalCount: filteredDocs.length,
    pageSize: DOCS_PER_PAGE,
  };
}
