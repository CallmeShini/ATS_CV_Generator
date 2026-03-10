import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Currículo ATS",
  description: "Gerador de currículos otimizado para sistemas ATS com foco em conversão e recrutamento técnico.",
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
