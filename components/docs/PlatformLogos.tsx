import React from "react";

export function StripeLogo({ className = "w-8 h-8" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 32 32" fill="none" aria-hidden="true">
      <rect width="32" height="32" rx="8" fill="#635BFF" />
      <path
        d="M14.5 13.2c0-.9.8-1.3 2-1.3 1.8 0 3.7.6 5.1 1.4v-4.3c-1.6-.7-3.4-1-5.1-1-4.2 0-7 2.2-7 5.9 0 5.7 7.9 4.8 7.9 7.3 0 1.1-.9 1.5-2.2 1.5-1.9 0-4.3-.8-5.8-1.8v4.4c1.8.8 3.8 1.2 5.8 1.2 4.3 0 7.3-2.1 7.3-6 0-6.1-8-5.1-8-7.3z"
        fill="#FFFFFF"
      />
    </svg>
  );
}

export function GitHubLogo({ className = "w-8 h-8" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 32 32" fill="none" aria-hidden="true">
      <rect width="32" height="32" rx="8" fill="#181717" />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M16 7c-4.97 0-9 4.03-9 9 0 3.98 2.58 7.35 6.16 8.54.45.08.61-.2.61-.43v-1.53c-2.5.54-3.03-1.2-3.03-1.2-.41-1.04-1-1.32-1-1.32-.82-.56.06-.55.06-.55.9.06 1.38.93 1.38.93.8 1.38 2.1 0.98 2.62.75.08-.58.31-.98.57-1.2-2-.23-4.1-1-4.1-4.45 0-.99.35-1.79.93-2.42-.09-.23-.4-1.15.09-2.38 0 0 .76-.24 2.48.92a8.6 8.6 0 014.52 0c1.72-1.16 2.48-.92 2.48-.92.49 1.23.18 2.15.09 2.38.58.63.93 1.43.93 2.42 0 3.46-2.1 4.22-4.11 4.44.32.28.61.83.61 1.67v2.47c0 .24.16.52.62.43C22.42 23.35 25 19.98 25 16c0-4.97-4.03-9-9-9z"
        fill="#FFFFFF"
      />
    </svg>
  );
}

export function SupabaseLogo({ className = "w-8 h-8" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 32 32" fill="none" aria-hidden="true">
      <rect width="32" height="32" rx="8" fill="#1C1C1C" />
      <path
        d="M17.5 7L9 18.5h6L14.5 25l8.5-11.5h-6L17.5 7z"
        fill="#3ECF8E"
      />
    </svg>
  );
}

export function OpenAiLogo({ className = "w-8 h-8" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 32 32" fill="none" aria-hidden="true">
      <rect width="32" height="32" rx="8" fill="#10A37F" />
      <path
        d="M21.5 13.8a3.7 3.7 0 0 0-.3-3.1 3.8 3.8 0 0 0-4.1-1.8 3.8 3.8 0 0 0-3.5-2.2 3.8 3.8 0 0 0-3.6 2.5 3.8 3.8 0 0 0-2.5 1.8 3.8 3.8 0 0 0 .5 4.5 3.7 3.7 0 0 0 .3 3.1 3.8 3.8 0 0 0 4.1 1.8 3.8 3.8 0 0 0 3.5 2.2 3.8 3.8 0 0 0 3.6-2.5 3.8 3.8 0 0 0 2.5-1.8 3.8 3.8 0 0 0-.5-4.5zm-5.6 7.9a2.8 2.8 0 0 1-1.8-.7l.1-.1 3-1.7a.5.5 0 0 0 .3-.4v-4.2l1.3.7v3.5a2.8 2.8 0 0 1-2.9 2.9zm-6.1-2.6a2.8 2.8 0 0 1-.3-1.9l.1.1 3 1.7a.5.5 0 0 0 .5 0l3.7-2.1v1.5l-3.8 2.2a2.8 2.8 0 0 1-3.2-1.5zm-1.5-6.2a2.8 2.8 0 0 1 1.5-1.2v3.7a.5.5 0 0 0 .2.4l3.7 2.1-1.3.7-3.1-1.7a2.8 2.8 0 0 1-1-4zm10.4 2.4-3.7-2.1 1.3-.7 3.1 1.7a2.8 2.8 0 0 1-.4 5.1v-3.6a.5.5 0 0 0-.3-.4zm1.3-1.9-.1-.1-3-1.7a.5.5 0 0 0-.5 0L12.7 14v-1.5l3.8-2.2a2.8 2.8 0 0 1 4.2 2.9zM12 15.7l-1.3-.7v-3.5a2.8 2.8 0 0 1 4.6-2.2l-.1.1-3 1.7a.5.5 0 0 0-.2.4v4.2zm.7-1.5 1.6-.9 1.6.9v1.9l-1.6.9-1.6-.9z"
        fill="#FFFFFF"
      />
    </svg>
  );
}

export function AnthropicLogo({ className = "w-8 h-8" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 32 32" fill="none" aria-hidden="true">
      <rect width="32" height="32" rx="8" fill="#D97706" />
      <path
        d="M19.9 9.3h-2.7l4.9 13.3h2.7zm-7.8 0L7.2 22.6h2.8l1-2.8h5.2l1 2.8h2.8L15.1 9.3zm-.3 8 1.7-4.7 1.7 4.7z"
        fill="#FFFFFF"
      />
    </svg>
  );
}

export function NextjsLogo({ className = "w-8 h-8" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 32 32" fill="none" aria-hidden="true">
      <rect width="32" height="32" rx="8" fill="#000000" />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M19.8 21.6 12.3 12h-1.8v8h1.6v-5.6l6.9 8.9c.3-.5.5-1.1.8-1.7zm1.7-1.3V12h-1.6v5.8l1.6 2.5z"
        fill="#FFFFFF"
      />
    </svg>
  );
}

export function DockerLogo({ className = "w-8 h-8" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 32 32" fill="none" aria-hidden="true">
      <rect width="32" height="32" rx="8" fill="#2496ED" />
      <path
        d="M24.7 15.6c-.3 0-.6 0-.8.1-.4-1.3-1.6-1.5-1.6-1.5-.7-.8-1.8-.7-2.6-.4-.8-1.2-2.3-.9-2.3-.9-2.5 0-3.5 2.1-3.7 2.6H8.2c-.4 0-.7.3-.7.7v1c0 3.3 2.6 6 5.9 6h7.5c2.9 0 5.3-2.1 5.7-5 .5-.2 1.3-.7 1.5-1.9-.9.1-1.7-.1-1.9-.3-.5-.4-.9-.8-1.5-.8zm-8.8-3.1h-1.4v-1.4h1.4v1.4zm-1.8 0h-1.4v-1.4h1.4v1.4zm3.6 0h-1.4v-1.4h1.4v1.4zm-3.6-1.8h-1.4V9.3h1.4v1.4zm1.8 0h-1.4V9.3h1.4v1.4zm1.8 0h-1.4V9.3h1.4v1.4zm1.8 1.8h-1.4v-1.4h1.4v1.4z"
        fill="#FFFFFF"
      />
    </svg>
  );
}

export function LinearLogo({ className = "w-8 h-8" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 32 32" fill="none" aria-hidden="true">
      <rect width="32" height="32" rx="8" fill="#5E6AD2" />
      <path
        d="M8.5 22.8a10.3 10.3 0 0 1 0-14.6l14.3 14.6a10.3 10.3 0 0 1-14.3 0z"
        fill="#FFFFFF"
        opacity="0.9"
      />
      <path
        d="M10.1 7.2a10.3 10.3 0 0 1 14.7 14.6L10.1 7.2z"
        fill="#FFFFFF"
      />
    </svg>
  );
}

export function PrismaLogo({ className = "w-8 h-8" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 32 32" fill="none" aria-hidden="true">
      <rect width="32" height="32" rx="8" fill="#2D3748" />
      <path d="M16 6.5l8.5 17.5h-17L16 6.5z" fill="#16A394" />
      <path d="M16 6.5l8.5 17.5H16V6.5z" fill="#0D9488" opacity="0.8" />
    </svg>
  );
}

export function CloudflareLogo({ className = "w-8 h-8" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 32 32" fill="none" aria-hidden="true">
      <rect width="32" height="32" rx="8" fill="#F38020" />
      <path
        d="M20.2 13.5a4.2 4.2 0 0 0-3.7-2.3 4.3 4.3 0 0 0-4.2 3.5 3 3 0 0 0-2.8 3c0 .1 0 .2.1.3a2.3 2.3 0 0 0 .9 4.5h11a3.2 3.2 0 0 0 3.2-3.2c0-1.6-1.2-2.9-2.7-3.1-.3-1.6-1-2.4-1.8-2.7z"
        fill="#FFFFFF"
      />
    </svg>
  );
}

export function TailwindLogo({ className = "w-8 h-8" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 32 32" fill="none" aria-hidden="true">
      <rect width="32" height="32" rx="8" fill="#0B1120" />
      <path
        d="M16 11.5c-2.4 0-3.9 1.2-4.5 3.6 1-.9 2-1.2 3-.9.6.2 1 .6 1.5 1.1 1 1 2.1 2.2 4.5 2.2 2.4 0 3.9-1.2 4.5-3.6-1 .9-2 1.2-3 .9-.6-.2-1-.6-1.5-1.1-1-1-2.1-2.2-4.5-2.2zm-4.5 5.5c-2.4 0-3.9 1.2-4.5 3.6 1-.9 2-1.2 3-.9.6.2 1 .6 1.5 1.1 1 1 2.1 2.2 4.5 2.2 2.4 0 3.9-1.2 4.5-3.6-1 .9-2 1.2-3 .9-.6-.2-1-.6-1.5-1.1-1-1-2.1-2.2-4.5-2.2z"
        fill="#38BDF8"
      />
    </svg>
  );
}

export function TypeScriptLogo({ className = "w-8 h-8" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 32 32" fill="none" aria-hidden="true">
      <rect width="32" height="32" rx="8" fill="#3178C6" />
      <path
        d="M10 13h7v2.5h-2.2V23h-2.6v-7.5H10V13zm8.8 6.2c.7.5 1.5.8 2.4.8.8 0 1.3-.3 1.3-.7 0-.5-.4-.7-1.4-1-1.6-.5-2.6-1.3-2.6-2.6 0-1.6 1.3-2.8 3.3-2.8 1.1 0 2.1.3 2.8.8l-.8 2c-.6-.4-1.3-.6-2-.6-.7 0-1.1.3-1.1.7 0 .4.4.6 1.3.9 1.7.5 2.7 1.3 2.7 2.7 0 1.7-1.3 2.9-3.5 2.9-1.3 0-2.5-.4-3.3-1l.9-2.1z"
        fill="#FFFFFF"
      />
    </svg>
  );
}

export function PostgresLogo({ className = "w-8 h-8" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 32 32" fill="none" aria-hidden="true">
      <rect width="32" height="32" rx="8" fill="#336791" />
      <path
        d="M16 8c-3.8 0-6.2 2.5-6.2 6.5 0 2.8 1.4 5.2 3.6 6.1v2.9h2.3v-2.2h.6v2.2h2.3v-2.9c2.2-.9 3.6-3.3 3.6-6.1C22.2 10.5 19.8 8 16 8zm0 10.5c-2.3 0-4-1.7-4-4s1.7-4 4-4 4 1.7 4 4-1.7 4-4 4z"
        fill="#FFFFFF"
      />
    </svg>
  );
}

export function RedisLogo({ className = "w-8 h-8" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 32 32" fill="none" aria-hidden="true">
      <rect width="32" height="32" rx="8" fill="#D82C20" />
      <path
        d="M8.5 12.5L16 8l7.5 4.5-7.5 4.5-7.5-4.5zm0 3.5L16 20.5l7.5-4.5v3.5L16 24l-7.5-4.5V16z"
        fill="#FFFFFF"
      />
    </svg>
  );
}

export function VercelLogo({ className = "w-8 h-8" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 32 32" fill="none" aria-hidden="true">
      <rect width="32" height="32" rx="8" fill="#000000" />
      <path d="M16 9l7.5 13.5h-15L16 9z" fill="#FFFFFF" />
    </svg>
  );
}

export function AwsLogo({ className = "w-8 h-8" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 32 32" fill="none" aria-hidden="true">
      <rect width="32" height="32" rx="8" fill="#232F3E" />
      <path
        d="M11.5 16.5c0 .8.5 1.5 1.3 1.5.7 0 1.2-.5 1.2-1.5v-3.5h1.5v3.5c0 1.8-1.1 2.8-2.7 2.8-1.6 0-2.7-1-2.7-2.8v-3.5h1.4v3.5zm9-3.5l-1.8 5.8h-1.4l-1.3-4.2-1.3 4.2h-1.4l-1.8-5.8h1.5l1 3.8 1.3-3.8h1.4l1.3 3.8 1-3.8h1.5zm-11 7c4.5 2 9.5 2 13 0 .3-.2.6 0 .5.3-.8 1.2-6.5 3.2-13.8.3-.3-.2-.1-.5.3-.6z"
        fill="#FF9900"
      />
    </svg>
  );
}

export function HuggingFaceLogo({ className = "w-8 h-8" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 32 32" fill="none" aria-hidden="true">
      <rect width="32" height="32" rx="8" fill="#FFD21E" />
      <circle cx="12" cy="15" r="2" fill="#000000" />
      <circle cx="20" cy="15" r="2" fill="#000000" />
      <path d="M13 19c.8 1.2 2 1.8 3 1.8s2.2-.6 3-1.8" stroke="#000000" strokeWidth="1.8" strokeLinecap="round" />
    </svg>
  );
}

export function ResendLogo({ className = "w-8 h-8" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 32 32" fill="none" aria-hidden="true">
      <rect width="32" height="32" rx="8" fill="#000000" />
      <path
        d="M9 11h14v10H9V11zm2 2l5 3.5 5-3.5v-1l-5 3.5L11 12v1z"
        fill="#FFFFFF"
      />
    </svg>
  );
}

export function renderPlatformLogo(
  logoKey?: string,
  className: string = "w-8 h-8"
): React.ReactNode {
  switch (logoKey?.toLowerCase()) {
    case "stripe":
      return <StripeLogo className={className} />;
    case "github":
      return <GitHubLogo className={className} />;
    case "supabase":
      return <SupabaseLogo className={className} />;
    case "openai":
      return <OpenAiLogo className={className} />;
    case "anthropic":
      return <AnthropicLogo className={className} />;
    case "nextjs":
      return <NextjsLogo className={className} />;
    case "docker":
      return <DockerLogo className={className} />;
    case "linear":
      return <LinearLogo className={className} />;
    case "prisma":
      return <PrismaLogo className={className} />;
    case "cloudflare":
      return <CloudflareLogo className={className} />;
    case "tailwind":
      return <TailwindLogo className={className} />;
    case "typescript":
      return <TypeScriptLogo className={className} />;
    case "postgres":
    case "postgresql":
      return <PostgresLogo className={className} />;
    case "redis":
      return <RedisLogo className={className} />;
    case "vercel":
      return <VercelLogo className={className} />;
    case "aws":
      return <AwsLogo className={className} />;
    case "huggingface":
      return <HuggingFaceLogo className={className} />;
    case "resend":
      return <ResendLogo className={className} />;
    default:
      return (
        <div
          className={`${className} rounded-lg bg-neutral-200/90 border border-neutral-300 flex items-center justify-center font-bold text-neutral-600 text-[11px] uppercase tracking-wider select-none`}
        >
          {logoKey ? logoKey.slice(0, 2) : "DOC"}
        </div>
      );
  }
}

export { getPlatformColor } from "@/logic/docs/colors";



