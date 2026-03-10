"use client";

import { useState } from "react";
import Link from "next/link";
import { useMasterProfile } from "../../store/useMasterProfile";
import ResumePreview from "../../components/ResumeTemplate/ResumePreview";
import { ArrowLeft, ArrowRight, Play, Terminal, Eye } from "lucide-react";

export default function GeneratePage() {
    const { profile } = useMasterProfile();

    const [jsonInput, setJsonInput] = useState("");
    const [isGenerating, setIsGenerating] = useState(false);
    const [generatedData, setGeneratedData] = useState<any>(null);
    const [error, setError] = useState<string | null>(null);
    const [viewMode, setViewMode] = useState<"preview" | "json">("preview");

    const handleGenerate = () => {
        setIsGenerating(true);
        setError(null);
        setGeneratedData(null);

        try {
            const data = JSON.parse(jsonInput);
            setGeneratedData(data);
        } catch (err: any) {
            setError("Formato JSON inválido. Verifique se copiou a estrutura corretamente.");
        } finally {
            setIsGenerating(false);
        }
    };

    return (
        <div className="min-h-screen bg-[var(--bg)] text-[var(--fg)] flex flex-col">

            {/* ── HEADER ──────────────────────────────── */}
            <header className="border-b-[4px] border-[var(--fg)] sticky top-0 z-40 bg-[var(--bg)] print:hidden">
                <div className="max-w-6xl mx-auto px-6 md:px-8 lg:px-12 flex items-center justify-between py-4">
                    <div className="flex items-center gap-6">
                        <Link href="/match" className="inline-flex items-center gap-2 font-mono text-xs uppercase tracking-widest no-underline hover:underline">
                            <ArrowLeft size={14} strokeWidth={1.5} />
                            Motor de Match
                        </Link>
                        <span className="text-[var(--border-light)]">|</span>
                        <Link href="/" className="inline-flex items-center gap-2 font-mono text-xs uppercase tracking-widest no-underline hover:underline">
                            Dashboard
                            <ArrowRight size={14} strokeWidth={1.5} />
                        </Link>
                    </div>
                    <span className="font-display font-bold text-lg tracking-tight hidden sm:block">Renderizador ATS</span>
                </div>
            </header>

            {/* ── CONTENT ─────────────────────────────── */}
            <div className="max-w-6xl mx-auto px-6 md:px-8 lg:px-12 py-24 md:py-32 flex-grow flex flex-col">

                {/* Title */}
                <div className="mb-12 print:hidden">
                    <p className="font-mono text-xs uppercase tracking-widest text-[var(--muted-foreground)] mb-4">Motor de renderização</p>
                    <h1 className="font-display font-black text-5xl lg:text-8xl tracking-tighter leading-none">
                        Gerar Currículo
                    </h1>
                </div>

                <hr className="hr-thick mb-12 print:hidden" />

                {/* Two-Pane Layout */}
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-0 border-2 border-[var(--fg)] flex-grow min-h-0 print:block print:border-0">

                    {/* LEFT PANE — 5 cols — JSON Input */}
                    <div className="lg:col-span-5 border-b-2 lg:border-b-0 lg:border-r-2 border-[var(--fg)] flex flex-col print:hidden">

                        {/* Label — Inverted */}
                        <div className="border-b border-[var(--fg)] px-6 py-3 bg-[var(--fg)] text-[var(--bg)] relative texture-invert">
                            <p className="font-mono text-xs uppercase tracking-widest relative z-10">Entrada — Payload JSON Otimizado</p>
                        </div>

                        {/* Textarea */}
                        <div className="p-6 flex-grow flex flex-col">
                            <textarea
                                className="w-full flex-grow min-h-[250px] bg-transparent border-b-2 border-[var(--fg)] p-2 font-mono text-xs leading-relaxed resize-y placeholder:text-[var(--muted-foreground)] placeholder:italic focus:border-b-[4px] focus:outline-none"
                                placeholder="Cole aqui o JSON gerado pelo Motor de Busca..."
                                value={jsonInput}
                                onChange={e => setJsonInput(e.target.value)}
                            />
                        </div>

                        {/* Error */}
                        {error && (
                            <div className="mx-6 mb-4 border-2 border-[var(--fg)] bg-[var(--muted)] p-4">
                                <p className="font-mono text-xs font-medium uppercase tracking-widest">
                                    ⚠ ERRO: {error}
                                </p>
                            </div>
                        )}

                        {/* Actions */}
                        <div className="border-t-2 border-[var(--fg)] p-4 flex flex-col gap-3">
                            <button
                                className="w-full inline-flex items-center justify-center gap-3 bg-[var(--fg)] text-[var(--bg)] px-6 py-4 font-mono text-xs uppercase tracking-widest hover:bg-[var(--bg)] hover:text-[var(--fg)] border-2 border-[var(--fg)] transition-colors duration-100 disabled:opacity-30 disabled:pointer-events-none focus-visible:outline focus-visible:outline-3 focus-visible:outline-[var(--fg)] focus-visible:outline-offset-3"
                                onClick={handleGenerate}
                                disabled={isGenerating || !jsonInput.trim()}
                            >
                                <Play size={14} strokeWidth={1.5} />
                                Renderizar Currículo
                            </button>
                        </div>

                        {/* Info */}
                        <div className="border-t border-[var(--border-light)] px-6 py-3">
                            <p className="font-body text-xs text-[var(--muted-foreground)] leading-relaxed">
                                Cole o objeto JSON gerado pelo Motor de Match. O sistema irá casar metadados com seu Master Profile para renderizar o documento final.
                            </p>
                        </div>
                    </div>

                    {/* RIGHT PANE — 7 cols — Preview */}
                    <div className="lg:col-span-7 flex flex-col">

                        {/* Label with toggle — Inverted */}
                        <div className="border-b border-[var(--fg)] px-6 py-3 bg-[var(--fg)] text-[var(--bg)] flex justify-between items-center print:hidden relative texture-invert">
                            <p className="font-mono text-xs uppercase tracking-widest relative z-10">Visualização do Documento</p>
                            {generatedData && (
                                <div className="flex gap-2 relative z-10">
                                    <button
                                        onClick={() => setViewMode("preview")}
                                        className={`inline-flex items-center gap-1 px-3 py-1 font-mono text-[10px] uppercase tracking-widest transition-colors duration-100 border ${viewMode === 'preview' ? 'bg-[var(--bg)] text-[var(--fg)] border-[var(--bg)]' : 'bg-transparent text-[var(--bg)] border-[var(--bg)] hover:bg-[var(--bg)] hover:text-[var(--fg)]'}`}
                                    >
                                        <Eye size={10} strokeWidth={1.5} /> Visual
                                    </button>
                                    <button
                                        onClick={() => setViewMode("json")}
                                        className={`inline-flex items-center gap-1 px-3 py-1 font-mono text-[10px] uppercase tracking-widest transition-colors duration-100 border ${viewMode === 'json' ? 'bg-[var(--bg)] text-[var(--fg)] border-[var(--bg)]' : 'bg-transparent text-[var(--bg)] border-[var(--bg)] hover:bg-[var(--bg)] hover:text-[var(--fg)]'}`}
                                    >
                                        <Terminal size={10} strokeWidth={1.5} /> JSON
                                    </button>
                                </div>
                            )}
                        </div>

                        {/* Preview Content */}
                        <div className="flex-grow relative bg-[var(--bg)] min-h-[500px]">
                            {isGenerating ? (
                                <div className="absolute inset-0 flex items-center justify-center">
                                    <p className="font-mono text-sm uppercase tracking-widest text-[var(--muted-foreground)]">
                                        Renderizando Documento...
                                    </p>
                                </div>
                            ) : generatedData ? (
                                viewMode === "preview" ? (
                                    <div className="h-full w-full overflow-y-auto bg-white">
                                        <ResumePreview data={generatedData} masterData={profile} />
                                    </div>
                                ) : (
                                    <pre className="p-6 font-mono text-xs leading-relaxed h-full overflow-auto max-h-[700px] whitespace-pre-wrap">
                                        {JSON.stringify(generatedData, null, 2)}
                                    </pre>
                                )
                            ) : (
                                <div className="absolute inset-0 flex flex-col items-center justify-center p-8 text-center">
                                    <div className="border-2 border-dashed border-[var(--border-light)] p-10 max-w-sm">
                                        <p className="font-display font-bold text-xl mb-3">Aguardando dados</p>
                                        <p className="font-body text-sm text-[var(--muted-foreground)]">
                                            O documento renderizado aparecerá aqui após inserir o JSON e clicar em renderizar.
                                        </p>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>

                </div>

                {/* Status Bar */}
                <div className="border-2 border-[var(--fg)] border-t-0 flex items-center gap-4 px-4 py-2 bg-[var(--muted)] print:hidden">
                    <span className="font-mono text-[10px] uppercase tracking-widest">
                        {generatedData ? "Documento renderizado com sucesso" : "Aguardando input JSON"}
                    </span>
                    <span className="ml-auto font-mono text-[10px] text-[var(--muted-foreground)] hidden sm:block">
                        ATS Compliance v1.0 | Formato A4
                    </span>
                </div>

            </div>

        </div>
    );
}
