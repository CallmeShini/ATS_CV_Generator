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
        <div className="min-h-screen bg-neo-bg text-neo-fg font-body flex flex-col overflow-x-hidden pt-0 print:pt-0 print:bg-white print:text-black">

            {/* ── HEADER ──────────────────────────────── */}
            <header className="border-b-4 border-neo-fg bg-neo-secondary sticky top-0 z-40 print:hidden">
                <div className="max-w-7xl mx-auto px-6 md:px-8 lg:px-12 flex items-center justify-between py-4">
                    <div className="flex items-center gap-6">
                        <Link href="/match" className="inline-flex items-center gap-2 font-black uppercase tracking-widest hover:text-white hover:bg-neo-accent px-3 py-1 border-2 border-transparent hover:border-neo-fg transition-all">
                            <ArrowLeft size={18} strokeWidth={3} />
                            Motor de Match
                        </Link>
                        <span className="text-neo-fg border-l-4 border-neo-fg h-6"></span>
                        <Link href="/" className="inline-flex items-center gap-2 font-black uppercase tracking-widest hover:text-white hover:bg-neo-accent px-3 py-1 border-2 border-transparent hover:border-neo-fg transition-all">
                            Dashboard
                            <ArrowRight size={18} strokeWidth={3} />
                        </Link>
                    </div>
                    <div className="border-4 border-neo-fg bg-white px-3 py-1 neo-shadow-sm -rotate-1 font-display font-black text-lg tracking-tight hidden sm:block uppercase">
                        Renderizador ATS
                    </div>
                </div>
            </header>

            {/* ── CONTENT ─────────────────────────────── */}
            <div className="max-w-7xl mx-auto px-6 md:px-8 lg:px-12 py-10 md:py-16 flex-grow flex flex-col w-full print:p-0 print:max-w-full">

                {/* Title */}
                <div className="mb-10 print:hidden">
                    <div className="inline-block bg-neo-accent border-4 border-neo-fg text-white px-4 py-2 mb-4 rotate-1 neo-shadow-sm">
                        <p className="font-black text-sm uppercase tracking-widest">Motor de renderização</p>
                    </div>
                    <h1 className="font-display font-black text-6xl lg:text-8xl tracking-tighter leading-[0.85] uppercase text-stroke-2">
                        Gerar Currículo
                    </h1>
                </div>

                {/* Two-Pane Layout */}
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-0 border-4 border-neo-fg flex-grow min-h-0 neo-shadow-lg bg-white texture-grid print:block print:border-0 print:shadow-none print:bg-transparent print:texture-none">

                    {/* LEFT PANE — 5 cols — JSON Input */}
                    <div className="lg:col-span-5 border-b-4 lg:border-b-0 lg:border-r-4 border-neo-fg flex flex-col bg-white print:hidden">

                        {/* Label — Strong */}
                        <div className="border-b-4 border-neo-fg px-6 py-4 bg-neo-fg text-white flex justify-between items-center relative">
                            <p className="font-black text-lg uppercase tracking-widest relative z-10 text-neo-secondary">1. Entrada</p>
                            <span className="font-bold text-xs uppercase tracking-widest opacity-80">Payload JSON Otimizado</span>
                        </div>

                        {/* Textarea */}
                        <div className="p-6 flex-grow flex flex-col relative group">
                            <textarea
                                className="w-full flex-grow min-h-[300px] bg-neo-bg border-4 border-neo-fg p-6 font-mono text-xs leading-relaxed resize-none focus:outline-none neo-shadow-inner transition-shadow placeholder:text-neo-fg/40 placeholder:font-bold"
                                placeholder="COLE AQUI O JSON GERADO PELO MOTOR DE BUSCA..."
                                value={jsonInput}
                                onChange={e => setJsonInput(e.target.value)}
                            />
                        </div>

                        {/* Error */}
                        {error && (
                            <div className="mx-6 mb-4 border-4 border-neo-fg bg-[#ffe1e1] p-4 font-black -rotate-1 relative neo-shadow-sm">
                                <div className="absolute -top-3 -right-3 bg-red-500 text-white font-mono text-xs px-2 py-1 border-2 border-neo-fg transform rotate-6">ERRO</div>
                                <p className="font-bold text-sm text-red-700 tracking-wide uppercase">
                                    {error}
                                </p>
                            </div>
                        )}

                        {/* Actions */}
                        <div className="border-t-4 border-neo-fg p-6 bg-neo-muted">
                            <button
                                className="w-full inline-flex items-center justify-center gap-3 bg-neo-fg text-white px-6 py-5 font-black text-xl uppercase tracking-widest hover:bg-neo-accent border-4 border-neo-fg transition-colors disabled:opacity-50 disabled:pointer-events-none neo-shadow-md neo-push focus:outline-none flex-wrap"
                                onClick={handleGenerate}
                                disabled={isGenerating || !jsonInput.trim()}
                            >
                                <Play size={28} strokeWidth={3} className={isGenerating ? "animate-pulse" : ""} />
                                {isGenerating ? "RENDERIZANDO..." : "RENDERIZAR CURRÍCULO"}
                            </button>
                        </div>
                    </div>

                    {/* RIGHT PANE — 7 cols — Preview */}
                    <div className="lg:col-span-7 flex flex-col bg-neo-bg z-10 relative print:bg-white print:z-auto">

                        {/* Label with toggle — Strong */}
                        <div className="border-b-4 border-neo-fg px-6 py-4 bg-neo-fg text-white flex justify-between items-center relative print:hidden">
                            <p className="font-black text-lg uppercase tracking-widest relative z-10 text-neo-accent">2. Saída</p>
                            {generatedData && (
                                <div className="flex gap-2 relative z-10">
                                    <button
                                        onClick={() => setViewMode("preview")}
                                        className={`inline-flex items-center gap-1 border-4 px-3 py-1 font-black text-xs uppercase tracking-widest transition-colors duration-100 ${viewMode === 'preview' ? 'bg-neo-accent text-white border-neo-fg neo-shadow-sm' : 'bg-transparent text-white border-transparent hover:bg-white hover:text-neo-fg hover:border-neo-fg'}`}
                                    >
                                        <Eye size={14} strokeWidth={3} /> VISUAL
                                    </button>
                                    <button
                                        onClick={() => setViewMode("json")}
                                        className={`inline-flex items-center gap-1 border-4 px-3 py-1 font-black text-xs uppercase tracking-widest transition-colors duration-100 ${viewMode === 'json' ? 'bg-neo-accent text-white border-neo-fg neo-shadow-sm' : 'bg-transparent text-white border-transparent hover:bg-white hover:text-neo-fg hover:border-neo-fg'}`}
                                    >
                                        <Terminal size={14} strokeWidth={3} /> JSON
                                    </button>
                                </div>
                            )}
                        </div>

                        {/* Preview Content */}
                        <div className="flex-grow relative bg-neo-bg min-h-[500px] print:min-h-0 print:bg-white p-6 print:p-0">
                            {isGenerating ? (
                                <div className="absolute inset-0 flex items-center justify-center bg-white border-4 border-neo-fg m-6 neo-shadow-lg print:hidden">
                                    <p className="font-black text-2xl uppercase tracking-widest animate-pulse">
                                        Renderizando Documento...
                                    </p>
                                </div>
                            ) : generatedData ? (
                                viewMode === "preview" ? (
                                    <div className="h-full w-full overflow-y-auto bg-white border-0 sm:border-4 border-neo-fg sm:neo-shadow-lg print:border-0 print:shadow-none print:overflow-visible">
                                        <ResumePreview data={generatedData} masterData={profile} />
                                    </div>
                                ) : (
                                    <div className="h-full w-full overflow-y-auto bg-white border-4 border-neo-fg neo-shadow-lg print:hidden p-6">
                                        <pre className="font-mono text-sm leading-relaxed whitespace-pre-wrap font-bold selection:bg-neo-accent selection:text-white">
                                            {JSON.stringify(generatedData, null, 2)}
                                        </pre>
                                    </div>
                                )
                            ) : (
                                <div className="absolute inset-0 flex flex-col items-center justify-center p-8 text-center bg-neo-muted print:hidden m-6 border-4 border-neo-fg neo-shadow-lg">
                                    <div className="bg-white border-4 border-neo-fg p-12 max-w-md rotate-1 relative">
                                        <div className="absolute -bottom-6 -left-6 bg-neo-accent border-4 border-neo-fg p-3 -rotate-6 neo-shadow-sm">
                                            <Play size={32} strokeWidth={3} className="text-white" />
                                        </div>
                                        <p className="font-display font-black text-3xl mb-4 uppercase">Aguardando Input</p>
                                        <p className="font-bold text-lg text-neo-fg/80">
                                            O documento renderizado aparecerá aqui após inserir o JSON e clicar em renderizar.
                                        </p>
                                    </div>
                                </div>
                            )}
                        </div>

                        {/* Status Bar */}
                        <div className="border-t-4 border-neo-fg flex items-center gap-4 px-6 py-3 bg-white z-20 relative print:hidden">
                            <span className="font-black text-sm uppercase tracking-widest">
                                {generatedData ? "Documento renderizado com sucesso" : "Aguardando input JSON"}
                            </span>
                            <div className="ml-auto font-bold text-xs uppercase bg-neo-accent text-white border-2 border-neo-fg px-2 py-1 hidden sm:block">
                                ATS Compliance v1.0
                            </div>
                        </div>

                    </div>

                </div>

            </div>

        </div>
    );
}
