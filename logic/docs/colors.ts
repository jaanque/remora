/**
 * Retorna la paleta de color principal y complementaria asociada a cada plataforma/logo.
 */
export function getPlatformColor(logoKey?: string): { primary: string; light: string } {
  switch (logoKey?.toLowerCase()) {
    case "stripe":
      return { primary: "#635BFF", light: "#A29BFE" };
    case "github":
      return { primary: "#181717", light: "#8B949E" };
    case "supabase":
      return { primary: "#3ECF8E", light: "#86EFAC" };
    case "openai":
      return { primary: "#10A37F", light: "#6EE7B7" };
    case "anthropic":
      return { primary: "#D97706", light: "#FDE68A" };
    case "nextjs":
    case "vercel":
    case "resend":
      return { primary: "#000000", light: "#737373" };
    case "docker":
      return { primary: "#2496ED", light: "#70BEF8" };
    case "linear":
      return { primary: "#5E6AD2", light: "#A5B4FC" };
    case "prisma":
      return { primary: "#16A394", light: "#5EEAD4" };
    case "cloudflare":
      return { primary: "#F38020", light: "#FDBA74" };
    case "tailwind":
      return { primary: "#38BDF8", light: "#BAE6FD" };
    case "typescript":
      return { primary: "#3178C6", light: "#93C5FD" };
    case "postgres":
    case "postgresql":
      return { primary: "#336791", light: "#93C5FD" };
    case "redis":
      return { primary: "#D82C20", light: "#FCA5A5" };
    case "aws":
      return { primary: "#FF9900", light: "#FED7AA" };
    case "huggingface":
      return { primary: "#FFD21E", light: "#FEF08A" };
    default:
      return { primary: "#2496ED", light: "#70BEF8" };
  }
}

