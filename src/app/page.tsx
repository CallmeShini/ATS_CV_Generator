import Link from "next/link";
import { ArrowRight, FileText, Crosshair } from "lucide-react";

export default function Home() {
  return (
    <div className="min-h-screen bg-[var(--bg)] text-[var(--fg)]">

      {/* ── MASTHEAD ────────────────────────────────────── */}
      <header className="border-b-[8px] border-[var(--fg)]">
        <div className="max-w-6xl mx-auto px-6 md:px-8 lg:px-12">


          {/* Title */}
          <div className="py-16 md:py-24 text-center">
            <h1 className="text-6xl sm:text-7xl lg:text-9xl font-display font-black tracking-tighter leading-none">
              Currículo
            </h1>
            <h1 className="text-6xl sm:text-7xl lg:text-9xl font-display font-black tracking-tighter leading-none italic">
              Maker
            </h1>
            <p className="font-mono text-xs uppercase tracking-[0.3em] text-[var(--muted-foreground)] mt-6">
              Motor de Otimização ATS com Inteligência Artificial
            </p>
          </div>

        </div>
      </header>

      {/* ── MAIN CONTENT ────────────────────────────────── */}
      <main className="max-w-6xl mx-auto px-6 md:px-8 lg:px-12 py-24 md:py-32">

        {/* Hero Section */}
        <section className="mb-24 md:mb-32">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-0">

            {/* Left — 8 cols */}
            <div className="lg:col-span-8 lg:pr-16 lg:border-r border-[var(--fg)]">
              <p className="font-mono text-xs uppercase tracking-widest text-[var(--muted-foreground)] mb-6">Análise principal</p>
              <h2 className="font-display text-4xl lg:text-6xl font-black tracking-tighter leading-[0.95] mb-8">
                Seu perfil, cirurgicamente otimizado para cada vaga.
              </h2>
              <p className="font-body text-lg leading-relaxed text-[var(--muted-foreground)] mb-10 max-w-2xl drop-cap">
                Tradução agressiva e hiper-focada das suas capacidades como desenvolvedor para um formato impenetrável por filtros ATS. Do perfil master ao PDF final — sem vazamento de dados, sem alucinação de IA.
              </p>
              <Link
                href="/profile"
                className="inline-flex items-center gap-3 bg-[var(--fg)] text-[var(--bg)] px-8 py-4 font-mono text-sm font-medium uppercase tracking-widest hover:bg-[var(--bg)] hover:text-[var(--fg)] border-2 border-[var(--fg)] transition-colors duration-100 no-underline focus-visible:outline focus-visible:outline-3 focus-visible:outline-[var(--fg)] focus-visible:outline-offset-3"
              >
                Iniciar Perfil
                <ArrowRight size={16} strokeWidth={1.5} />
              </Link>
            </div>

            {/* Right — 4 cols — Steps */}
            <div className="lg:col-span-4 lg:pl-16 mt-12 lg:mt-0 flex flex-col justify-between gap-12">
              {[
                { step: "01", title: "Master Profile", desc: "Banco completo de suas habilidades, experiências e conquistas." },
                { step: "02", title: "Motor de Busca", desc: "Extrai keywords ocultas em vagas e molda seu currículo para o match." },
                { step: "03", title: "Exportar PDF", desc: "Renderiza documento ATS-safe pronto para os filtros de RH." },
              ].map((item) => (
                <div key={item.step}>
                  <p className="font-mono text-xs uppercase tracking-widest text-[var(--muted-foreground)] mb-2">{item.step}</p>
                  <h3 className="font-display font-bold text-2xl tracking-tight mb-2">{item.title}</h3>
                  <p className="font-body text-sm text-[var(--muted-foreground)] leading-relaxed">{item.desc}</p>
                </div>
              ))}
            </div>

          </div>
        </section>

        {/* ── THIN DIVIDER ─────────────────────────── */}
        <hr className="hr-hairline mb-24 md:mb-32" />

        {/* ── NAVIGATION GRID ─────────────────────────── */}
        <section>
          <p className="font-mono text-xs uppercase tracking-widest text-[var(--muted-foreground)] mb-8">Módulos</p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-0 border-t-2 border-l-2 border-[var(--fg)]">

            {/* Card 1 — Profile */}
            <Link
              href="/profile"
              className="group border-r-2 border-b-2 border-[var(--fg)] p-8 md:p-10 transition-colors duration-100 hover:bg-[var(--fg)] hover:text-[var(--bg)] no-underline"
            >
              <div className="border-2 border-current h-12 w-12 flex items-center justify-center mb-8">
                <FileText size={20} strokeWidth={1.5} />
              </div>
              <p className="font-mono text-xs uppercase tracking-widest text-[var(--muted-foreground)] group-hover:text-[var(--border-light)] mb-3">Seção 01</p>
              <h3 className="font-display font-bold text-2xl tracking-tight mb-4">Editar Perfil</h3>
              <p className="font-body text-sm leading-relaxed opacity-60">
                Base de dados completa — nome, contato, experiências, domínios e stack tecnológico.
              </p>
              <span className="inline-flex items-center gap-2 font-mono text-xs uppercase tracking-widest mt-6">
                Abrir →
              </span>
            </Link>

            {/* Card 2 — Match */}
            <Link
              href="/match"
              className="group border-r-2 border-b-2 border-[var(--fg)] p-8 md:p-10 relative transition-colors duration-100 hover:bg-[var(--fg)] hover:text-[var(--bg)] no-underline"
            >
              <div className="border-2 border-current h-12 w-12 flex items-center justify-center mb-8">
                <Crosshair size={20} strokeWidth={1.5} />
              </div>
              <p className="font-mono text-xs uppercase tracking-widest text-[var(--muted-foreground)] group-hover:text-[var(--border-light)] mb-3">Seção 02</p>
              <h3 className="font-display font-bold text-2xl tracking-tight mb-4">Analisar Vaga</h3>
              <p className="font-body text-sm leading-relaxed opacity-60">
                Motor semântico IA extrai keywords e monta o payload JSON otimizado.
              </p>
              <span className="inline-flex items-center gap-2 font-mono text-xs uppercase tracking-widest mt-6">
                Iniciar →
              </span>
            </Link>

            {/* Card 3 — Generate */}
            <Link
              href="/generate"
              className="group border-r-2 border-b-2 border-[var(--fg)] p-8 md:p-10 transition-colors duration-100 hover:bg-[var(--fg)] hover:text-[var(--bg)] no-underline"
            >
              <div className="border-2 border-current h-12 w-12 flex items-center justify-center mb-8">
                <FileText size={20} strokeWidth={1.5} />
              </div>
              <p className="font-mono text-xs uppercase tracking-widest text-[var(--muted-foreground)] group-hover:text-[var(--border-light)] mb-3">Seção 03</p>
              <h3 className="font-display font-bold text-2xl tracking-tight mb-4">Gerar PDF</h3>
              <p className="font-body text-sm leading-relaxed opacity-60">
                Renderize documento ATS editorial pronto para impressão e envio.
              </p>
              <span className="inline-flex items-center gap-2 font-mono text-xs uppercase tracking-widest mt-6">
                Gerar →
              </span>
            </Link>

          </div>
        </section>

      </main>

      {/* ── FOOTER ──────────────────────────────────── */}
      <footer className="bg-[var(--fg)] text-[var(--bg)] mt-auto relative texture-invert">

        {/* Main footer grid */}
        <div className="max-w-6xl mx-auto px-6 md:px-8 lg:px-12 py-16 md:py-20 relative z-10">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-16">

            {/* Col 1 — Brand */}
            <div>
              <p className="font-display font-bold text-2xl tracking-tight mb-4">Currículo Maker</p>
              <p className="font-body text-sm leading-relaxed opacity-60 mb-6">
                Motor de otimização ATS com inteligência artificial. Gere currículos cirurgicamente moldados para cada vaga.
              </p>
              <p className="font-mono text-xs uppercase tracking-widest opacity-40">
                Idealizado por Shini
              </p>
            </div>

            {/* Col 2 — Navigation */}
            <div>
              <p className="font-mono text-xs uppercase tracking-widest opacity-40 mb-6">Navegação</p>
              <nav className="flex flex-col gap-3">
                <Link href="/profile" className="font-body text-sm hover:opacity-60 transition-opacity duration-100 no-underline text-[var(--bg)]">
                  Master Profile →
                </Link>
                <Link href="/match" className="font-body text-sm hover:opacity-60 transition-opacity duration-100 no-underline text-[var(--bg)]">
                  Job Matcher →
                </Link>
                <Link href="/generate" className="font-body text-sm hover:opacity-60 transition-opacity duration-100 no-underline text-[var(--bg)]">
                  Gerar PDF →
                </Link>
              </nav>
            </div>

            {/* Col 3 — Info */}
            <div>
              <p className="font-mono text-xs uppercase tracking-widest opacity-40 mb-6">Informações</p>
              <div className="flex flex-col gap-3 font-body text-sm">
                <p className="opacity-80">🔓 Código aberto no GitHub</p>
                <p className="opacity-80">🛡️ Não coletamos seus dados</p>
                <p className="opacity-80">⚡ Processamento 100% client-side</p>
                <p className="opacity-60 text-xs mt-2">
                  Groq LLM para análise semântica. Nenhum dado pessoal é armazenado em nossos servidores.
                </p>
              </div>
            </div>

          </div>
        </div>

        {/* Bottom bar */}
        <div className="border-t border-white/10 relative z-10">
          <div className="max-w-6xl mx-auto px-6 md:px-8 lg:px-12 py-4 flex flex-col sm:flex-row justify-between items-center gap-2">
            <p className="font-mono text-[10px] uppercase tracking-widest opacity-30">
              © {new Date().getFullYear()} Currículo Maker — Todos os direitos reservados
            </p>
            <p className="font-mono text-[10px] uppercase tracking-widest opacity-30">
              v4.0 — ATS Engine
            </p>
          </div>
        </div>

      </footer>

    </div>
  );
}
