"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useMasterProfile } from "../../store/useMasterProfile";
import { ArrowLeft, Plus, X, Trash2 } from "lucide-react";

export default function ProfilePage() {
    const { profile, setProfile } = useMasterProfile();
    const [isClient, setIsClient] = useState(false);

    useEffect(() => {
        setIsClient(true);
    }, []);

    if (!isClient) return null;

    return (
        <div className="min-h-screen bg-[var(--bg)] text-[var(--fg)]">

            {/* ── HEADER ──────────────────────────────── */}
            <header className="border-b-[4px] border-[var(--fg)] sticky top-0 z-40 bg-[var(--bg)]">
                <div className="max-w-6xl mx-auto px-6 md:px-8 lg:px-12 flex items-center justify-between py-4">
                    <Link
                        href="/"
                        className="inline-flex items-center gap-2 font-mono text-xs uppercase tracking-widest no-underline hover:underline"
                    >
                        <ArrowLeft size={14} strokeWidth={1.5} />
                        Dashboard
                    </Link>
                    <span className="font-display font-bold text-lg tracking-tight hidden sm:block">Master Profile</span>
                </div>
            </header>

            {/* ── CONTENT ─────────────────────────────── */}
            <div className="max-w-6xl mx-auto px-6 md:px-8 lg:px-12 py-24 md:py-32">

                {/* Title */}
                <div className="mb-16">
                    <p className="font-mono text-xs uppercase tracking-widest text-[var(--muted-foreground)] mb-4">Banco de dados</p>
                    <h1 className="font-display font-black text-5xl lg:text-8xl tracking-tighter leading-none mb-6">
                        Master Profile
                    </h1>
                    <p className="font-body text-lg text-[var(--muted-foreground)] max-w-xl">
                        Gerencie todos os seus dados, tecnologias e conquistas em um único banco.
                    </p>
                </div>

                <hr className="hr-thick mb-16" />

                {/* ── BASIC INFO ───────────────────────── */}
                <section className="mb-20">
                    <h2 className="font-display font-bold text-3xl tracking-tight mb-10 border-b-2 border-[var(--fg)] pb-4">
                        Informações Básicas
                    </h2>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-8 mb-8">
                        <InputField label="Nome Completo" value={profile.name} onChange={(v) => setProfile({ name: v })} placeholder="John Doe" />
                        <InputField label="Localização" value={profile.location} onChange={(v) => setProfile({ location: v })} placeholder="São Paulo, SP" />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-8 mb-8">
                        <InputField label="E-mail" value={profile.email} onChange={(v) => setProfile({ email: v })} placeholder="email@provedor.com" />
                        <InputField label="LinkedIn" value={profile.linkedin} onChange={(v) => setProfile({ linkedin: v })} placeholder="linkedin.com/in/usuario" />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-8 mb-8">
                        <InputField label="GitHub" value={profile.github || ""} onChange={(v) => setProfile({ github: v })} placeholder="github.com/usuario" />
                        <InputField label="Posicionamento Alvo" value={profile.target_positioning} onChange={(v) => setProfile({ target_positioning: v })} placeholder="Engenheiro Front-end Sênior" />
                    </div>

                    <div className="flex flex-col gap-2">
                        <label className="font-mono text-xs uppercase tracking-widest text-[var(--muted-foreground)]">Resumo Profissional (Master)</label>
                        <textarea
                            className="w-full border-b-2 border-[var(--fg)] bg-transparent px-1 py-3 font-body text-base leading-relaxed min-h-[160px] resize-y focus:border-b-[4px] focus:outline-none"
                            value={profile.professional_summary_base}
                            onChange={(e) => setProfile({ professional_summary_base: e.target.value })}
                            placeholder="Sua história principal. A IA cortará as partes irrelevantes depois."
                        />
                    </div>
                </section>

                <hr className="hr-thick mb-20" />

                {/* ── SKILLS ──────────────────────────── */}
                <section className="mb-20">
                    <h2 className="font-display font-bold text-3xl tracking-tight mb-10 border-b-2 border-[var(--fg)] pb-4">
                        Domínios & Tecnologias
                    </h2>

                    <div className="flex flex-col gap-8">
                        <InputField
                            label="Domínios Principais (Vírgula)"
                            value={profile.core_domains.join(", ")}
                            onChange={(v) => setProfile({ core_domains: v.split(",").map(s => s.trim()) })}
                            placeholder="Arquitetura Web, DevOps, Sistemas Distribuídos..."
                        />
                        <InputField
                            label="Stack Tecnológico (Vírgula)"
                            value={profile.technologies_possible.join(", ")}
                            onChange={(v) => setProfile({ technologies_possible: v.split(",").map(s => s.trim()).filter(Boolean) })}
                            placeholder="React, TypeScript, AWS, Node.js..."
                        />
                    </div>
                </section>

                <hr className="hr-thick mb-20" />

                {/* ── ACADEMIC & RECOGNITION ──────────────────────────── */}
                <section className="mb-20">
                    <h2 className="font-display font-bold text-3xl tracking-tight mb-10 border-b-2 border-[var(--fg)] pb-4">
                        Reconhecimento & Academia
                    </h2>

                    <div className="flex flex-col gap-8 mb-12">
                        <InputField
                            label="Certificações (Vírgula)"
                            value={profile.certifications?.join(", ") || ""}
                            onChange={(v) => setProfile({ certifications: v.split(",").map(s => s.trim()).filter(Boolean) })}
                            placeholder="AWS Cloud Practitioner, Certified Kubernetes Admin..."
                        />
                        <InputField
                            label="Premiações & Reconhecimento (Vírgula)"
                            value={profile.awards?.join(", ") || ""}
                            onChange={(v) => setProfile({ awards: v.split(",").map(s => s.trim()).filter(Boolean) })}
                            placeholder="1º Lugar Hackathon, Funcionário do Ano 2023..."
                        />
                    </div>

                    <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-6 border-b border-[var(--border-light)] pb-2">
                        <div>
                            <h3 className="font-display font-bold text-xl tracking-tight">Formação Acadêmica</h3>
                        </div>
                        <button
                            className="inline-flex items-center gap-1 font-mono text-xs uppercase tracking-widest hover:underline focus-visible:outline focus-visible:outline-3 focus-visible:outline-[var(--fg)] focus-visible:outline-offset-2"
                            onClick={() => {
                                const newEdu = [...(profile.education || [])];
                                newEdu.unshift({
                                    institution: "Nova Instituição",
                                    degree: "Diploma",
                                    period: "2020 - 2024"
                                });
                                setProfile({ education: newEdu });
                            }}
                        >
                            <Plus size={12} strokeWidth={1.5} />
                            Adicionar Formação
                        </button>
                    </div>

                    <div className="flex flex-col gap-6">
                        {(profile.education || []).map((edu, idx) => (
                            <article key={idx} className="border border-[var(--fg)] p-4 relative bg-[var(--bg)] flex flex-col md:flex-row gap-4 justify-between items-start md:items-center">
                                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 w-full">
                                    <InputField label="Instituição" value={edu.institution} size="sm"
                                        onChange={(v) => { const n = [...profile.education]; n[idx].institution = v; setProfile({ education: n }); }} />
                                    <InputField label="Grau" value={edu.degree} size="sm"
                                        onChange={(v) => { const n = [...profile.education]; n[idx].degree = v; setProfile({ education: n }); }} />
                                    <InputField label="Período" value={edu.period} size="sm" mono
                                        onChange={(v) => { const n = [...profile.education]; n[idx].period = v; setProfile({ education: n }); }} />
                                </div>
                                <button
                                    className="text-[var(--muted-foreground)] hover:text-[var(--fg)] transition-colors duration-100 flex-shrink-0 focus-visible:outline focus-visible:outline-3 focus-visible:outline-[var(--fg)] focus-visible:outline-offset-2"
                                    onClick={() => {
                                        const n = [...profile.education];
                                        n.splice(idx, 1);
                                        setProfile({ education: n });
                                    }}
                                    title="Deletar"
                                    aria-label="Deletar formação"
                                >
                                    <X size={16} strokeWidth={1.5} />
                                </button>
                            </article>
                        ))}
                    </div>
                </section>

                <hr className="hr-thick mb-20" />

                {/* ── EXPERIENCE ──────────────────────── */}
                <section className="mb-20">
                    <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-10 border-b-2 border-[var(--fg)] pb-4">
                        <div>
                            <h2 className="font-display font-bold text-3xl tracking-tight">Registro de Experiência</h2>
                            <p className="font-body text-sm text-[var(--muted-foreground)] mt-1">Documente todas as suas passagens. O motor combinará o que importa.</p>
                        </div>
                        <button
                            className="inline-flex items-center gap-2 bg-[var(--fg)] text-[var(--bg)] px-6 py-3 font-mono text-xs uppercase tracking-widest hover:bg-[var(--bg)] hover:text-[var(--fg)] border-2 border-[var(--fg)] transition-colors duration-100 flex-shrink-0 focus-visible:outline focus-visible:outline-3 focus-visible:outline-[var(--fg)] focus-visible:outline-offset-3"
                            onClick={() => {
                                const newExps = [...profile.experience_master];
                                newExps.unshift({
                                    company: "Nova Empresa",
                                    role: "Cargo",
                                    start_date: "Mês ANO",
                                    end_date: "Presente",
                                    description: "Descrição base.",
                                    technologies: [],
                                    achievements: ["Detalhe técnico de conquista..."]
                                });
                                setProfile({ experience_master: newExps });
                            }}
                        >
                            <Plus size={14} strokeWidth={1.5} />
                            Adicionar Registro
                        </button>
                    </div>

                    <div className="flex flex-col gap-10">
                        {profile.experience_master.map((exp, idx) => (
                            <article key={idx} className="border-2 border-[var(--fg)] relative">

                                {/* Experience Header — Inverted */}
                                <div className="bg-[var(--fg)] text-[var(--bg)] px-6 py-4 flex justify-between items-center relative texture-invert">
                                    <div className="relative z-10">
                                        <span className="font-display font-bold text-lg">{exp.role}</span>
                                        <span className="font-mono text-sm ml-4 opacity-60">{exp.company}</span>
                                    </div>
                                    <button
                                        className="text-[var(--bg)] hover:opacity-60 transition-opacity duration-100 relative z-10 focus-visible:outline focus-visible:outline-3 focus-visible:outline-[var(--bg)] focus-visible:outline-offset-2"
                                        onClick={() => {
                                            const newExps = [...profile.experience_master];
                                            newExps.splice(idx, 1);
                                            setProfile({ experience_master: newExps });
                                        }}
                                        title="Deletar Cargo"
                                        aria-label="Deletar cargo"
                                    >
                                        <Trash2 size={16} strokeWidth={1.5} />
                                    </button>
                                </div>

                                {/* Experience Form */}
                                <div className="p-6 md:p-8">
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-6 mb-8">
                                        <InputField label="Empresa" value={exp.company} size="sm"
                                            onChange={(v) => { const n = [...profile.experience_master]; n[idx].company = v; setProfile({ experience_master: n }); }} />
                                        <InputField label="Cargo" value={exp.role} size="sm"
                                            onChange={(v) => { const n = [...profile.experience_master]; n[idx].role = v; setProfile({ experience_master: n }); }} />
                                    </div>

                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-6 mb-8">
                                        <InputField label="Data de Início" value={exp.start_date} size="sm" mono
                                            onChange={(v) => { const n = [...profile.experience_master]; n[idx].start_date = v; setProfile({ experience_master: n }); }} />
                                        <InputField label="Data de Fim" value={exp.end_date} size="sm" mono
                                            onChange={(v) => { const n = [...profile.experience_master]; n[idx].end_date = v; setProfile({ experience_master: n }); }} />
                                    </div>

                                    <div className="flex flex-col gap-2 mb-8">
                                        <label className="font-mono text-xs uppercase tracking-widest text-[var(--muted-foreground)]">Resumo da Posição</label>
                                        <textarea
                                            className="w-full border-b-2 border-[var(--fg)] bg-transparent px-1 py-2 font-body text-sm leading-relaxed min-h-[80px] resize-y focus:border-b-[4px] focus:outline-none"
                                            value={exp.description}
                                            onChange={(e) => { const n = [...profile.experience_master]; n[idx].description = e.target.value; setProfile({ experience_master: n }); }}
                                        />
                                    </div>

                                    <InputField label="Tecnologias (Vírgula)" value={exp.technologies.join(", ")} size="sm" mono
                                        onChange={(v) => { const n = [...profile.experience_master]; n[idx].technologies = v.split(",").map(t => t.trim()).filter(Boolean); setProfile({ experience_master: n }); }} />

                                    {/* Achievements */}
                                    <div className="border-t border-[var(--border-light)] pt-6 mt-8">
                                        <div className="flex items-center justify-between mb-4">
                                            <label className="font-mono text-xs uppercase tracking-widest text-[var(--muted-foreground)]">Banco de Conquistas</label>
                                            <button
                                                className="inline-flex items-center gap-1 font-mono text-xs uppercase tracking-widest hover:underline focus-visible:outline focus-visible:outline-3 focus-visible:outline-[var(--fg)] focus-visible:outline-offset-2"
                                                onClick={() => { const n = [...profile.experience_master]; n[idx].achievements.push(""); setProfile({ experience_master: n }); }}
                                            >
                                                <Plus size={12} strokeWidth={1.5} />
                                                Somar
                                            </button>
                                        </div>

                                        <div className="flex flex-col gap-4">
                                            {exp.achievements.map((achiev, aIdx) => (
                                                <div key={aIdx} className="flex items-start gap-4">
                                                    <span className="font-mono text-xs text-[var(--muted-foreground)] mt-3 select-none w-6 flex-shrink-0">{String(aIdx + 1).padStart(2, '0')}</span>
                                                    <textarea
                                                        className="w-full border-b border-[var(--border-light)] bg-transparent px-1 py-2 font-body text-sm leading-relaxed min-h-[50px] resize-y focus:border-b-2 focus:border-[var(--fg)] focus:outline-none"
                                                        value={achiev}
                                                        onChange={(e) => { const n = [...profile.experience_master]; n[idx].achievements[aIdx] = e.target.value; setProfile({ experience_master: n }); }}
                                                    />
                                                    <button
                                                        className="mt-2 text-[var(--muted-foreground)] hover:text-[var(--fg)] transition-colors duration-100 flex-shrink-0 focus-visible:outline focus-visible:outline-3 focus-visible:outline-[var(--fg)] focus-visible:outline-offset-2"
                                                        title="Remover"
                                                        aria-label="Remover conquista"
                                                        onClick={() => { const n = [...profile.experience_master]; n[idx].achievements.splice(aIdx, 1); setProfile({ experience_master: n }); }}
                                                    >
                                                        <X size={14} strokeWidth={1.5} />
                                                    </button>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            </article>
                        ))}
                    </div>
                </section>

            </div>

        </div>
    );
}

/* ── Reusable Input Component ─────────────── */
function InputField({ label, value, onChange, placeholder, size = "base", mono = false }: {
    label: string;
    value: string;
    onChange: (v: string) => void;
    placeholder?: string;
    size?: "base" | "sm";
    mono?: boolean;
}) {
    return (
        <div className="flex flex-col gap-2">
            <label className="font-mono text-xs uppercase tracking-widest text-[var(--muted-foreground)]">{label}</label>
            <input
                className={`w-full border-b-2 border-[var(--fg)] bg-transparent px-1 py-2 focus:border-b-[4px] focus:outline-none ${mono ? 'font-mono' : 'font-body'} ${size === 'sm' ? 'text-sm' : 'text-base'}`}
                value={value}
                onChange={(e) => onChange(e.target.value)}
                placeholder={placeholder}
            />
        </div>
    );
}
