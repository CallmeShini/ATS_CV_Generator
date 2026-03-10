import Link from "next/link";
import { ArrowRight, FileText, Crosshair, Star } from "lucide-react";

export default function Home() {
  return (
    <div className="min-h-screen bg-neo-bg text-neo-fg font-body overflow-x-hidden">

      {/* ── MASTHEAD / NAVIGATION ────────────────────────────────────── */}
      <header className="border-b-4 border-neo-fg bg-neo-secondary sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-6 md:px-8 lg:px-12 flex justify-between items-center py-4">
          <div className="border-4 border-neo-fg bg-white px-4 py-2 neo-shadow-sm rotate-1">
            <span className="font-display font-black text-xl uppercase tracking-tighter">Currículo ATS</span>
          </div>

          <nav className="hidden md:flex gap-6">
            <Link href="/profile" className="font-bold uppercase tracking-widest hover:bg-neo-accent hover:text-white px-3 py-1 border-2 border-transparent hover:border-neo-fg transition-all">Master Profile</Link>
            <Link href="/match" className="font-bold uppercase tracking-widest hover:bg-neo-accent hover:text-white px-3 py-1 border-2 border-transparent hover:border-neo-fg transition-all">Job Matcher</Link>
            <Link href="/generate" className="font-bold uppercase tracking-widest hover:bg-neo-accent hover:text-white px-3 py-1 border-2 border-transparent hover:border-neo-fg transition-all">Exportar PDF</Link>
          </nav>
        </div>
      </header>

      {/* ── HERO SECTION ────────────────────────────────── */}
      <main className="max-w-7xl mx-auto px-6 md:px-8 lg:px-12 py-16 md:py-24 relative">

        {/* Floating Decoration */}
        <Star className="absolute top-10 right-10 md:right-32 w-16 h-16 fill-neo-accent stroke-neo-fg stroke-[3px] animate-spin-slow opacity-80" />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">

          {/* Left Hero Content */}
          <div className="lg:col-span-7 relative z-10">
            <div className="inline-block bg-neo-muted border-4 border-neo-fg px-4 py-2 mb-8 -rotate-2 neo-shadow-sm">
              <p className="font-black text-sm uppercase tracking-widest">Motor de Otimização ATS</p>
            </div>

            <h1 className="text-6xl sm:text-7xl lg:text-8xl font-display font-black tracking-tighter leading-[0.85] mb-6 uppercase">
              DESTRUA <br />
              <span className="text-neo-accent text-stroke-2">FILTROS</span> DE RH.
            </h1>

            <p className="font-bold text-xl md:text-2xl leading-snug mb-10 max-w-xl bg-white border-4 border-neo-fg p-6 neo-shadow-md">
              O seu perfil, cirurgicamente moldado para o algoritmo da vaga. Pare de ser ignorado por robôs.
            </p>

            <Link
              href="/profile"
              className="inline-flex items-center justify-center gap-3 bg-neo-accent text-white px-10 py-5 font-black text-xl lg:text-2xl uppercase tracking-widest border-4 border-neo-fg neo-shadow-lg neo-push w-full sm:w-auto"
            >
              Criar Perfil
              <ArrowRight size={28} strokeWidth={3} className="text-neo-fg" />
            </Link>
          </div>

          {/* Right Hero Visuals / Steps */}
          <div className="lg:col-span-5 flex flex-col gap-6 relative">
            <div className="absolute -inset-4 bg-neo-fg opacity-5 texture-halftone -z-10 translate-x-4 translate-y-4"></div>

            <div className="bg-white border-4 border-neo-fg p-6 neo-shadow-md neo-lift rotate-1">
              <div className="flex items-center gap-4 mb-3">
                <span className="bg-neo-secondary border-2 border-neo-fg rounded-full w-10 h-10 flex items-center justify-center font-black text-lg">1</span>
                <h3 className="font-black text-2xl uppercase tracking-tight">Master Profile</h3>
              </div>
              <p className="font-bold text-neo-fg/70">Banco massivo com todo seu histórico e tecnologias.</p>
            </div>

            <div className="bg-white border-4 border-neo-fg p-6 neo-shadow-md neo-lift -rotate-1 relative">
              <div className="absolute -top-4 -right-4 bg-neo-accent text-white border-4 border-neo-fg px-3 py-1 font-black text-xs uppercase rotate-12 neo-shadow-sm">A Mágica</div>
              <div className="flex items-center gap-4 mb-3">
                <span className="bg-neo-secondary border-2 border-neo-fg rounded-full w-10 h-10 flex items-center justify-center font-black text-lg">2</span>
                <h3 className="font-black text-2xl uppercase tracking-tight">Job Matcher</h3>
              </div>
              <p className="font-bold text-neo-fg/70">Extrai keywords de vagas e funde com seu perfil via ATS Engine.</p>
            </div>

            <div className="bg-white border-4 border-neo-fg p-6 neo-shadow-md neo-lift rotate-2">
              <div className="flex items-center gap-4 mb-3">
                <span className="bg-neo-secondary border-2 border-neo-fg rounded-full w-10 h-10 flex items-center justify-center font-black text-lg">3</span>
                <h3 className="font-black text-2xl uppercase tracking-tight">Exportar PDF</h3>
              </div>
              <p className="font-bold text-neo-fg/70">Gere um documento limpo, legível e impossível do ATS falhar.</p>
            </div>

          </div>
        </div>
      </main>

      <hr className="hr-thick my-12" />

      {/* ── MODULES ─────────────────────────── */}
      <section className="bg-neo-muted border-y-4 border-neo-fg py-24 relative texture-grid">
        <div className="max-w-7xl mx-auto px-6 md:px-8 lg:px-12 relative z-10">

          <div className="mb-16">
            <h2 className="font-black text-5xl md:text-7xl uppercase tracking-tighter text-center bg-white border-4 border-neo-fg py-4 neo-shadow-md inline-block mx-auto transform -rotate-1">
              Acesso aos Módulos
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-12">

            {/* Card 1 */}
            <Link href="/profile" className="block group">
              <div className="h-full bg-white border-4 border-neo-fg p-8 neo-shadow-lg neo-lift flex flex-col items-start transition-all">
                <div className="bg-neo-secondary border-4 border-neo-fg p-4 mb-6 neo-shadow-sm group-hover:rotate-12 transition-transform">
                  <FileText size={32} strokeWidth={2.5} className="text-neo-fg" />
                </div>
                <h3 className="font-black text-3xl uppercase tracking-tight mb-4 group-hover:text-neo-accent transition-colors">Setup Inicial</h3>
                <p className="font-bold text-lg leading-snug mb-8 flex-grow">
                  Coloque literalmente tudo que já fez. Deixe o motor cortar a gordura depois.
                </p>
                <div className="w-full bg-neo-fg text-white text-center py-3 font-black uppercase tracking-widest border-2 border-neo-fg group-hover:bg-neo-accent group-hover:text-neo-fg transition-colors">
                  Acessar Banco →
                </div>
              </div>
            </Link>

            {/* Card 2 */}
            <Link href="/match" className="block group">
              <div className="h-full bg-white border-4 border-neo-fg p-8 neo-shadow-lg neo-lift flex flex-col items-start transition-all relative">
                <div className="absolute top-4 right-4 text-6xl opacity-10 font-display font-black">ATS</div>
                <div className="bg-neo-accent border-4 border-neo-fg p-4 mb-6 neo-shadow-sm group-hover:-rotate-12 transition-transform">
                  <Crosshair size={32} strokeWidth={2.5} className="text-white" />
                </div>
                <h3 className="font-black text-3xl uppercase tracking-tight mb-4 group-hover:text-neo-accent transition-colors">Otimizar Target</h3>
                <p className="font-bold text-lg leading-snug mb-8 flex-grow">
                  Cole o link da vaga. Deixe a engine fundir suas skills e cuspir o currículo perfeito.
                </p>
                <div className="w-full bg-neo-fg text-white text-center py-3 font-black uppercase tracking-widest border-2 border-neo-fg group-hover:bg-neo-accent group-hover:text-neo-fg transition-colors">
                  Iniciar Crawler →
                </div>
              </div>
            </Link>

            {/* Card 3 */}
            <Link href="/generate" className="block group">
              <div className="h-full bg-white border-4 border-neo-fg p-8 neo-shadow-lg neo-lift flex flex-col items-start transition-all">
                <div className="bg-neo-muted border-4 border-neo-fg p-4 mb-6 neo-shadow-sm group-hover:rotate-6 transition-transform">
                  <FileText size={32} strokeWidth={2.5} className="text-neo-fg" />
                </div>
                <h3 className="font-black text-3xl uppercase tracking-tight mb-4 group-hover:text-neo-accent transition-colors">Render final</h3>
                <p className="font-bold text-lg leading-snug mb-8 flex-grow">
                  Baixe o PDF. Formato careta, chato e estruturado que os robôs do Gupy amam ler.
                </p>
                <div className="w-full bg-neo-fg text-white text-center py-3 font-black uppercase tracking-widest border-2 border-neo-fg group-hover:bg-neo-accent group-hover:text-neo-fg transition-colors">
                  Compilar PDF →
                </div>
              </div>
            </Link>

          </div>
        </div>
      </section>

      {/* ── FOOTER ──────────────────────────────────── */}
      <footer className="bg-neo-fg text-white border-t-8 border-neo-accent pt-16 pb-8 relative overflow-hidden">

        {/* Massive background text */}
        <div className="absolute top-0 left-0 w-full overflow-hidden whitespace-nowrap pointer-events-none opacity-5">
          <h2 className="font-display font-black text-[15rem] leading-none uppercase">CURRÍCULO MAKER</h2>
        </div>

        <div className="max-w-7xl mx-auto px-6 md:px-8 lg:px-12 relative z-10">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">

            <div className="lg:col-span-2">
              <div className="inline-block bg-neo-secondary text-neo-fg font-black text-2xl uppercase tracking-tighter px-4 py-2 border-4 border-neo-fg rotate-2 mb-6">
                Currículo ATS
              </div>
              <p className="font-bold text-xl max-w-sm mb-6">
                Ferramenta open-source para destruir os processos seletivos automatizados modernos.
              </p>
              <div className="flex gap-4">
                <span className="bg-white text-neo-fg font-bold text-xs uppercase px-2 py-1 border-2 border-neo-fg">Open-Source</span>
                <span className="bg-neo-accent text-neo-fg font-bold text-xs uppercase px-2 py-1 border-2 border-neo-fg">Client-Side</span>
              </div>
            </div>

            <div>
              <h4 className="font-black text-lg uppercase tracking-widest mb-6 border-b-4 border-neo-accent pb-2 inline-block">Módulos</h4>
              <nav className="flex flex-col gap-4 font-bold text-lg">
                <Link href="/profile" className="hover:text-neo-secondary hover:translate-x-2 transition-transform w-fit">Master Profile</Link>
                <Link href="/match" className="hover:text-neo-accent hover:translate-x-2 transition-transform w-fit">Job Matcher</Link>
                <Link href="/generate" className="hover:text-neo-muted hover:translate-x-2 transition-transform w-fit">Gerador PDF</Link>
              </nav>
            </div>

            <div>
              <h4 className="font-black text-lg uppercase tracking-widest mb-6 border-b-4 border-neo-accent pb-2 inline-block">Tech</h4>
              <ul className="flex flex-col gap-4 font-bold text-lg opacity-70">
                <li>Next.js + React</li>
                <li>Tailwind CSS</li>
                <li>Groq AI</li>
                <li>Google Gemini</li>
              </ul>
            </div>

          </div>

          <div className="flex flex-col md:flex-row justify-between items-center pt-8 border-t-4 border-white/20 font-bold uppercase tracking-widest text-sm">
            <p>Made for the community.</p>
            <p>v4.0 — ATS Engine Mode</p>
          </div>
        </div>
      </footer>

    </div>
  );
}
