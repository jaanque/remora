import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Remora — Documentation Built Exclusively for AI Agents",
  description:
    "The documentation platform built exclusively for AI agents. Token-optimized, machine-native schemas so autonomous LLMs understand your codebase without burning context.",
  icons: {
    icon: "/icon.svg",
    shortcut: "/icon.svg",
    apple: "/icon.svg",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-[#f2f2f2] text-neutral-900 antialiased font-sans selection:bg-[#2496ED] selection:text-white">
        {children}
      </body>
    </html>
  );
}

