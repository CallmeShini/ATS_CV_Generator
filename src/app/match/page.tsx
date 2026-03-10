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
        <div className="min-h-screen bg-neo-bg text-neo-fg font-body flex flex-col overflow-x-hidden">

            {/* ── HEADER ──────────────────────────────── */}
            <header className="border-b-4 border-neo-fg bg-neo-secondary sticky top-0 z-40">
                <div className="max-w-7xl mx-auto px-6 md:px-8 lg:px-12 flex items-center justify-between py-4">
                    <div className="flex items-center gap-6">
                        <Link href="/" className="inline-flex items-center gap-2 font-black uppercase tracking-widest hover:text-white hover:bg-neo-accent px-3 py-1 border-2 border-transparent hover:border-neo-fg transition-all">
                            <ArrowLeft size={18} strokeWidth={3} />
                            Voltar
                        </Link>
                        <span className="text-neo-fg border-l-4 border-neo-fg h-6"></span>
                        <Link href="/generate" className="inline-flex items-center gap-2 font-black uppercase tracking-widest hover:text-white hover:bg-neo-accent px-3 py-1 border-2 border-transparent hover:border-neo-fg transition-all">
                            PDF
                            <ArrowRight size={18} strokeWidth={3} />
                        </Link>
                    </div>
                    <div className="border-4 border-neo-fg bg-white px-3 py-1 neo-shadow-sm -rotate-1 font-display font-black text-lg tracking-tight hidden sm:block uppercase">
                        Job Matcher
                    </div>
                </div>
            </header>

            {/* ── CONTENT ─────────────────────────────── */}
            <div className="max-w-7xl mx-auto px-6 md:px-8 lg:px-12 py-10 md:py-16 flex-grow flex flex-col w-full">

                {/* Title */}
                <div className="mb-10">
                    <div className="inline-block bg-neo-accent border-4 border-neo-fg text-white px-4 py-2 mb-4 rotate-1 neo-shadow-sm">
                        <p className="font-black text-sm uppercase tracking-widest">Motor de Otimização Semântica</p>
                    </div>
                    <h1 className="font-display font-black text-6xl lg:text-8xl tracking-tighter leading-[0.85] uppercase text-stroke-2">
                        JOB MATCHER
                    </h1>
                </div>

                {/* Two-Pane Layout */}
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-0 border-4 border-neo-fg flex-grow min-h-0 neo-shadow-lg bg-white texture-grid">

                    {/* LEFT PANE — 5 cols */}
                    <div className="lg:col-span-5 border-b-4 lg:border-b-0 lg:border-r-4 border-neo-fg flex flex-col bg-white">

                        {/* Label — Strong */}
                        <div className="border-b-4 border-neo-fg px-6 py-4 bg-neo-fg text-white flex justify-between items-center relative">
                            <p className="font-black text-lg uppercase tracking-widest relative z-10 text-neo-secondary">1. Entrada</p>
                            <span className="font-bold text-xs uppercase tracking-widest opacity-80">Link ou Texto</span>
                        </div>

                        {/* Textarea */}
                        <div className="p-6 flex-grow flex flex-col relative group">
                            <textarea
                                className="w-full flex-grow min-h-[300px] bg-neo-bg border-4 border-neo-fg p-6 font-bold text-lg leading-relaxed resize-none focus:outline-none neo-shadow-inner transition-shadow placeholder:text-neo-fg/40 placeholder:font-bold"
                                placeholder="COLE AQUI A DESCRIÇÃO DA VAGA REQUISITADA..."
                                value={jobDescription}
                                onChange={(e) => setJobDescription(e.target.value)}
                            />
                        </div>

                        {/* Actions */}
                        <div className="border-t-4 border-neo-fg p-6 bg-neo-muted">
                            <button
                                className="w-full inline-flex items-center justify-center gap-3 bg-neo-fg text-white px-6 py-5 font-black text-xl uppercase tracking-widest hover:bg-neo-accent border-4 border-neo-fg transition-colors disabled:opacity-50 disabled:pointer-events-none neo-shadow-md neo-push focus:outline-none flex-wrap"
                                onClick={generateMatch}
                                disabled={!jobDescription || isGenerating}
                            >
                                <Crosshair size={28} strokeWidth={3} className={isGenerating ? "animate-spin" : ""} />
                                {isGenerating ? "ANALISANDO..." : "COMPATIBILIZAR"}
                            </button>

                            {generatedJson && (
                                <button
                                    className="w-full mt-4 inline-flex items-center justify-center gap-2 border-4 border-neo-fg bg-white px-4 py-4 font-black text-lg uppercase tracking-widest hover:bg-neo-secondary transition-colors duration-100 neo-shadow-sm neo-push focus:outline-none"
                                    onClick={copyToClipboard}
                                >
                                    {isCopied ? <Check size={24} strokeWidth={3} /> : <Copy size={24} strokeWidth={3} />}
                                    {isCopied ? "MÁGICA COPIADA!" : "COPIAR JSON"}
                                </button>
                            )}
                        </div>
                    </div>

                    {/* RIGHT PANE — 7 cols */}
                    <div className="lg:col-span-7 flex flex-col bg-neo-bg z-10 relative">

                        {/* Label — Strong */}
                        <div className="border-b-4 border-neo-fg px-6 py-4 bg-neo-fg text-white flex justify-between items-center relative">
                            <p className="font-black text-lg uppercase tracking-widest relative z-10 text-neo-accent">2. Saída</p>
                            <span className="font-bold text-xs uppercase tracking-widest opacity-80">Payload JSON</span>
                        </div>

                        {/* Output */}
                        <div className="flex-grow relative min-h-[300px] bg-neo-bg">
                            {generatedJson ? (
                                <div className="absolute inset-0 p-6 overflow-auto">
                                    <pre className="font-mono text-sm leading-relaxed p-6 bg-white border-4 border-neo-fg neo-shadow-md border-opacity-100 h-full overflow-auto whitespace-pre-wrap font-bold selection:bg-neo-accent selection:text-white">
                                        {generatedJson}
                                    </pre>
                                </div>
                            ) : (
                                <div className="absolute inset-0 flex flex-col items-center justify-center p-8 text-center bg-neo-muted">
                                    <div className="bg-white border-4 border-neo-fg p-12 max-w-md neo-shadow-lg -rotate-1 relative">
                                        <div className="absolute -top-6 -right-6 bg-neo-secondary border-4 border-neo-fg p-3 rotate-12 neo-shadow-sm">
                                            <Crosshair size={32} strokeWidth={3} className="text-neo-fg" />
                                        </div>
                                        <p className="font-display font-black text-3xl mb-4 uppercase">Aguardando Missão</p>
                                        <p className="font-bold text-lg text-neo-fg/80">O motor Serverless usará IA (LLM via Groq) para extrair keywords e mapear seu Profile Master num esquema ATS-friendly.</p>
                                    </div>
                                </div>
                            )}
                        </div>

                        {/* Status Bar */}
                        <div className="border-t-4 border-neo-fg flex items-center gap-4 px-6 py-3 bg-white z-20 relative">
                            <Cpu size={24} strokeWidth={3} className={`flex-shrink-0 ${isGenerating ? 'animate-pulse text-neo-accent' : 'text-neo-fg'}`} />
                            <span className="font-black text-sm uppercase tracking-widest">
                                {workerStatus}
                            </span>
                            <div className="ml-auto font-bold text-xs uppercase bg-neo-secondary border-2 border-neo-fg px-2 py-1 hidden sm:block">
                                Motor GROQ v3.1
                            </div>
                        </div>

                    </div>

                </div>

            </div>

        </div>
    );
}
