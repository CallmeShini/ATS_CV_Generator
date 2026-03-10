import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Currículo Maker — ATS Resume Generator",
  description: "Motor de otimização de currículos com IA para burlar filtros ATS.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR">
      <body className="antialiased min-h-screen flex flex-col">
        {children}
      </body>
    </html>
  );
}
