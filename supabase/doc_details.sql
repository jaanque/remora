-- ==============================================================================
-- REMORA - Tabla simplificada doc_details
-- ==============================================================================
-- Elimina la estructura anterior y crea la tabla exclusivamente con los campos solicitados:
-- id, slug, doc_id, oficialurl, githuburl, version, content

DROP TABLE IF EXISTS public.doc_details CASCADE;

CREATE TABLE public.doc_details (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  doc_id TEXT REFERENCES public.docs(id) ON DELETE CASCADE,
  slug TEXT NOT NULL UNIQUE,
  oficialurl TEXT,
  githuburl TEXT,
  version TEXT,
  content TEXT,
  created_at TIMESTAMPTZ DEFAULT timezone('utc'::text, now()) NOT NULL,
  updated_at TIMESTAMPTZ DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Índices para optimizar consultas por slug y doc_id
CREATE INDEX IF NOT EXISTS idx_doc_details_slug ON public.doc_details(slug);
CREATE INDEX IF NOT EXISTS idx_doc_details_doc_id ON public.doc_details(doc_id);

-- Habilitar Row Level Security (RLS) y lectura pública
ALTER TABLE public.doc_details ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Permitir lectura publica a doc_details"
  ON public.doc_details
  FOR SELECT
  TO anon, authenticated
  USING (true);

-- ==============================================================================
-- INSERTS CON LOS CAMPOS EXACTOS Y CONTENIDO
-- ==============================================================================

INSERT INTO public.doc_details (
  doc_id,
  slug,
  oficialurl,
  githuburl,
  version,
  content
)
VALUES
(
  (SELECT id FROM public.docs WHERE slug = 'stripe' LIMIT 1),
  'stripe',
  'https://docs.stripe.com',
  'https://github.com/stripe/stripe-node',
  'v2024-04-10',
  'Documentación oficial compilada para agentes de IA de Stripe.
Incluye especificaciones AST estructuradas para gestión de pagos, sesiones de Checkout, cobros recurrentes de suscripciones, idempotencia de peticiones y validación de firmas de webhooks con tolerancia a latencia.'
),
(
  (SELECT id FROM public.docs WHERE slug = 'supabase' LIMIT 1),
  'supabase',
  'https://supabase.com/docs',
  'https://github.com/supabase/supabase-js',
  'v2.45.0',
  'Esquema compilado de Supabase para agentes autónomos.
Cubre operaciones de PostgreSQL con Row Level Security (RLS), autenticación de usuarios (GoTrue), políticas de buckets de almacenamiento S3 y suscripciones WebSocket en tiempo real.'
),
(
  (SELECT id FROM public.docs WHERE slug = 'openai' LIMIT 1),
  'openai',
  'https://platform.openai.com/docs',
  'https://github.com/openai/openai-node',
  'v1.30.0',
  'Especificación técnica compilada de las APIs de OpenAI.
Optimizado para Structured Outputs (JSON Schema estricto), llamadas a funciones (Tool Calling), streaming con Server-Sent Events (SSE) y modelos de razonamiento.'
),
(
  (SELECT id FROM public.docs WHERE slug = 'anthropic' LIMIT 1),
  'anthropic',
  'https://docs.anthropic.com',
  'https://github.com/anthropics/anthropic-sdk-typescript',
  'v0.26.0',
  'Referencia técnica compilada para modelos Claude 3.5 Sonnet y Haiku.
Incluye especificaciones compactas para Prompt Caching de tokens, llamadas a herramientas en paralelo (Tool Use) y procesamiento de mensajes por lotes.'
),
(
  (SELECT id FROM public.docs WHERE slug = 'nextjs' LIMIT 1),
  'nextjs',
  'https://nextjs.org/docs',
  'https://github.com/vercel/next.js',
  'v15.0.0',
  'Compilación de Next.js App Router para agentes de código.
Estructura y reglas de React Server Components (RSC), mutaciones con Server Actions, directivas use client/use server, middlewares y Route Handlers.'
),
(
  (SELECT id FROM public.docs WHERE slug = 'docker' LIMIT 1),
  'docker',
  'https://docs.docker.com',
  'https://github.com/docker/cli',
  'v27.0.0',
  'Manual compilado de Docker Engine y Dockerfile para agentes DevOps.
Reglas sintácticas de multi-stage builds, directivas Compose v2, configuraciones de healthcheck y aislamiento de redes y volúmenes persistentes.'
),
(
  (SELECT id FROM public.docs WHERE slug = 'linear' LIMIT 1),
  'linear',
  'https://developers.linear.app/docs',
  'https://github.com/linear/linear',
  'v2024.1',
  'Esquema GraphQL compilado de la API de Linear para agentes de productividad.
Gestión programática de issues, ciclos de sprints, roadmaps de proyectos, estados de flujo de trabajo y entrega de eventos vía webhooks.'
),
(
  (SELECT id FROM public.docs WHERE slug = 'prisma' LIMIT 1),
  'prisma',
  'https://www.prisma.io/docs',
  'https://github.com/prisma/prisma',
  'v5.18.0',
  'Compilación de referencia para Prisma ORM.
Sintaxis de modelado en schema.prisma, métodos del cliente generado (CRUD, transacciones interactivas $transaction), migraciones declarativas y extensiones de cliente.'
),
(
  (SELECT id FROM public.docs WHERE slug = 'cloudflare' LIMIT 1),
  'cloudflare',
  'https://developers.cloudflare.com',
  'https://github.com/cloudflare/workers-sdk',
  'v3.0.0',
  'Referencia de Cloudflare Serverless Edge para agentes de IA.
Sintaxis y ciclo de vida de Workers, almacenamiento clave-valor (KV), base de datos relacional serverless (D1), object storage (R2) y base vectorial (Vectorize).'
),
(
  (SELECT id FROM public.docs WHERE slug = 'postgres' LIMIT 1),
  'postgres',
  'https://www.postgresql.org/docs',
  'https://github.com/postgres/postgres',
  'v16.0',
  'Especificación compilada de PostgreSQL para agentes.
Sintaxis avanzada de operadores JSONB, consultas recursivas CTE, funciones analíticas de ventana y optimización de índices B-tree y GIN.'
),
(
  (SELECT id FROM public.docs WHERE slug = 'redis' LIMIT 1),
  'redis',
  'https://redis.io/docs',
  'https://github.com/redis/redis',
  'v7.2.0',
  'Comandos compilados de Redis para agentes.
Operaciones en estructuras en memoria (Strings, Hashes, Lists, Sets, Sorted Sets), mensajería Pub/Sub, Streams, expiración de claves TTL y transacciones MULTI/EXEC.'
),
(
  (SELECT id FROM public.docs WHERE slug = 'github' LIMIT 1),
  'github',
  'https://docs.github.com/rest',
  'https://github.com/octokit/octokit.js',
  'v2022-11-28',
  'Compilación de la REST API y Webhooks de GitHub para agentes.
Automatización de Pull Requests, creación de ramas, gestión de issues, llamadas a la Checks API y disparo de flujos de trabajo de GitHub Actions.'
)
ON CONFLICT (slug) DO UPDATE SET
  doc_id = COALESCE(EXCLUDED.doc_id, doc_details.doc_id),
  oficialurl = EXCLUDED.oficialurl,
  githuburl = EXCLUDED.githuburl,
  version = EXCLUDED.version,
  content = EXCLUDED.content,
  updated_at = timezone('utc'::text, now());
