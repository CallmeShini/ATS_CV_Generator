"use client";

import { useState } from "react";
import Link from "next/link";
import { useMasterProfile } from "../../store/useMasterProfile";
import { ArrowLeft, ArrowRight, Crosshair, Cpu, Check, Copy } from "lucide-react";

export default function MatchPage() {
    const { profile } = useMasterProfile();
    const [jobDescription, setJobDescription] = useState("");
    const [generatedJson, setGeneratedJson] = useState("");
    const [isGenerating, setIsGenerating] = useState(false);
    const [workerStatus, setWorkerStatus] = useState<string>("Pronto para conectar");
    const [isCopied, setIsCopied] = useState(false);

    const generateMatch = async () => {
        setIsGenerating(true);
        setWorkerStatus("Conectando ao Motor Groq...");

        try {
            const response = await fetch('/api/match', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ jobDescription, userProfile: profile })
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.error || `HTTP ${response.status}`);
            }

            setWorkerStatus("Construindo Payload JSON...");
            const data = await response.json();
            setGeneratedJson(JSON.stringify(data.payload, null, 2));
            setWorkerStatus("Sincronização Concluída.");

        } catch (err: any) {
            console.error("Match error:", err);
            setWorkerStatus(`Erro: ${err.message}`);
            setGeneratedJson(JSON.stringify({ error: err.message }, null, 2));
        } finally {
            setIsGenerating(false);
            setTimeout(() => setWorkerStatus("Aguardando próximo prompt"), 3000);
        }
    };

    const copyToClipboard = () => {
        navigator.clipboard.writeText(generatedJson);
        setIsCopied(true);
        setTimeout(() => setIsCopied(false), 2000);
    };

    return (
        <div className="min-h-screen bg-[var(--bg)] text-[var(--fg)] flex flex-col">

            {/* ── HEADER ──────────────────────────────── */}
            <header className="border-b-[4px] border-[var(--fg)] sticky top-0 z-40 bg-[var(--bg)]">
                <div className="max-w-6xl mx-auto px-6 md:px-8 lg:px-12 flex items-center justify-between py-4">
                    <div className="flex items-center gap-6">
                        <Link href="/" className="inline-flex items-center gap-2 font-mono text-xs uppercase tracking-widest no-underline hover:underline">
                            <ArrowLeft size={14} strokeWidth={1.5} />
                            Dashboard
                        </Link>
                        <span className="text-[var(--border-light)]">|</span>
                        <Link href="/generate" className="inline-flex items-center gap-2 font-mono text-xs uppercase tracking-widest no-underline hover:underline">
                            Gerador
                            <ArrowRight size={14} strokeWidth={1.5} />
                        </Link>
                    </div>
                    <span className="font-display font-bold text-lg tracking-tight hidden sm:block">Job Matcher</span>
                </div>
            </header>

            {/* ── CONTENT ─────────────────────────────── */}
            <div className="max-w-6xl mx-auto px-6 md:px-8 lg:px-12 py-24 md:py-32 flex-grow flex flex-col">

                {/* Title */}
                <div className="mb-12">
                    <p className="font-mono text-xs uppercase tracking-widest text-[var(--muted-foreground)] mb-4">Motor semântico IA</p>
                    <h1 className="font-display font-black text-5xl lg:text-8xl tracking-tighter leading-none">
                        Job Matcher
                    </h1>
                </div>

                <hr className="hr-thick mb-12" />

                {/* Two-Pane Layout */}
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-0 border-2 border-[var(--fg)] flex-grow min-h-0">

                    {/* LEFT PANE — 5 cols */}
                    <div className="lg:col-span-5 border-b-2 lg:border-b-0 lg:border-r-2 border-[var(--fg)] flex flex-col">

                        {/* Label — Inverted */}
                        <div className="border-b border-[var(--fg)] px-6 py-3 bg-[var(--fg)] text-[var(--bg)] relative texture-invert">
                            <p className="font-mono text-xs uppercase tracking-widest relative z-10">Entrada — Descrição da Vaga</p>
                        </div>

                        {/* Textarea */}
                        <div className="p-6 flex-grow flex flex-col">
                            <textarea
                                className="w-full flex-grow min-h-[250px] bg-transparent border-b-2 border-[var(--fg)] p-2 font-body text-sm leading-relaxed resize-y placeholder:text-[var(--muted-foreground)] placeholder:italic focus:border-b-[4px] focus:outline-none"
                                placeholder="Cole aqui a descrição completa da vaga..."
                                value={jobDescription}
                                onChange={(e) => setJobDescription(e.target.value)}
                            />
                        </div>

                        {/* Actions */}
                        <div className="border-t-2 border-[var(--fg)] p-4 flex flex-col gap-3">
                            <button
                                className="w-full inline-flex items-center justify-center gap-3 bg-[var(--fg)] text-[var(--bg)] px-6 py-4 font-mono text-xs uppercase tracking-widest hover:bg-[var(--bg)] hover:text-[var(--fg)] border-2 border-[var(--fg)] transition-colors duration-100 disabled:opacity-30 disabled:pointer-events-none focus-visible:outline focus-visible:outline-3 focus-visible:outline-[var(--fg)] focus-visible:outline-offset-3"
                                onClick={generateMatch}
                                disabled={!jobDescription || isGenerating}
                            >
                                <Crosshair size={14} strokeWidth={1.5} />
                                {isGenerating ? "Analisando..." : "Analisar & Compatibilizar"}
                            </button>

                            {generatedJson && (
                                <button
                                    className="w-full inline-flex items-center justify-center gap-2 border-2 border-[var(--fg)] bg-transparent px-4 py-3 font-mono text-xs uppercase tracking-widest hover:bg-[var(--fg)] hover:text-[var(--bg)] transition-colors duration-100 focus-visible:outline focus-visible:outline-3 focus-visible:outline-[var(--fg)] focus-visible:outline-offset-3"
                                    onClick={copyToClipboard}
                                >
                                    {isCopied ? <Check size={12} strokeWidth={1.5} /> : <Copy size={12} strokeWidth={1.5} />}
                                    {isCopied ? "Copiado!" : "Copiar JSON"}
                                </button>
                            )}
                        </div>

                        {/* Info */}
                        <div className="border-t border-[var(--border-light)] px-6 py-3">
                            <p className="font-body text-xs text-[var(--muted-foreground)] leading-relaxed">
                                O motor Serverless usará IA (LLM via Groq) para extrair keywords e mapear seu Profile Master num esquema ATS-friendly.
                            </p>
                        </div>
                    </div>

                    {/* RIGHT PANE — 7 cols */}
                    <div className="lg:col-span-7 flex flex-col">

                        {/* Label — Inverted */}
                        <div className="border-b border-[var(--fg)] px-6 py-3 bg-[var(--fg)] text-[var(--bg)] relative texture-invert">
                            <p className="font-mono text-xs uppercase tracking-widest relative z-10">Saída — JSON Otimizado ATS</p>
                        </div>

                        {/* Output */}
                        <div className="flex-grow relative bg-[var(--bg)] min-h-[300px]">
                            {generatedJson ? (
                                <pre className="p-6 font-mono text-xs leading-relaxed h-full overflow-auto max-h-[700px] whitespace-pre-wrap">
                                    {generatedJson}
                                </pre>
                            ) : (
                                <div className="absolute inset-0 flex flex-col items-center justify-center p-8 text-center">
                                    <div className="border-2 border-dashed border-[var(--border-light)] p-10 max-w-sm">
                                        <p className="font-display font-bold text-xl mb-3">Aguardando dados</p>
                                        <p className="font-body text-sm text-[var(--muted-foreground)]">A estrutura JSON otimizada aparecerá aqui após análise.</p>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>

                </div>

                {/* Status Bar */}
                <div className="border-2 border-[var(--fg)] border-t-0 flex items-center gap-4 px-4 py-2 bg-[var(--muted)]">
                    <Cpu size={12} strokeWidth={1.5} className={`flex-shrink-0 ${isGenerating ? 'animate-pulse' : ''}`} />
                    <span className="font-mono text-[10px] uppercase tracking-widest">
                        {workerStatus}
                    </span>
                    <span className="ml-auto font-mono text-[10px] text-[var(--muted-foreground)] hidden sm:block">
                        Motor GROQ v3.1 | Latência: &lt;1500ms
                    </span>
                </div>

            </div>

        </div>
    );
}
