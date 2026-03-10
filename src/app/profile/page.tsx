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
        <div className="min-h-screen bg-neo-bg text-neo-fg font-body overflow-x-hidden pb-32">

            {/* ── HEADER ──────────────────────────────── */}
            <header className="border-b-4 border-neo-fg bg-neo-secondary sticky top-0 z-40">
                <div className="max-w-7xl mx-auto px-6 md:px-8 lg:px-12 flex items-center justify-between py-4">
                    <Link
                        href="/"
                        className="inline-flex items-center gap-2 font-black uppercase tracking-widest hover:text-white hover:bg-neo-accent px-3 py-1 border-2 border-transparent hover:border-neo-fg transition-all"
                    >
                        <ArrowLeft size={20} strokeWidth={3} />
                        Voltar
                    </Link>
                    <div className="border-4 border-neo-fg bg-white px-3 py-1 neo-shadow-sm rotate-1 font-display font-black text-lg tracking-tight hidden sm:block">
                        Master Profile
                    </div>
                </div>
            </header>

            {/* ── CONTENT ─────────────────────────────── */}
            <div className="max-w-7xl mx-auto px-6 md:px-8 lg:px-12 py-16 md:py-24">

                {/* Title */}
                <div className="mb-16">
                    <div className="inline-block bg-neo-muted border-4 border-neo-fg px-4 py-2 mb-6 -rotate-1 neo-shadow-sm">
                        <p className="font-black text-sm uppercase tracking-widest text-neo-fg">Banco de Dados Pessoal</p>
                    </div>
                    <h1 className="font-display font-black text-6xl lg:text-8xl tracking-tighter leading-[0.85] mb-6 uppercase text-stroke-2">
                        MASTER PROFILE
                    </h1>
                    <p className="font-bold text-xl md:text-2xl leading-snug bg-white border-4 border-neo-fg p-6 neo-shadow-md max-w-2xl">
                        Gerencie todos os seus dados, tecnologias e conquistas em um único banco. A IA cuidará do resto.
                    </p>
                </div>

                <hr className="hr-thick mb-16" />

                {/* ── BASIC INFO ───────────────────────── */}
                <section className="mb-20">
                    <div className="inline-block bg-neo-accent border-4 border-neo-fg text-white px-4 py-2 mb-8 neo-shadow-sm rotate-1">
                        <h2 className="font-display font-black text-3xl tracking-tight uppercase">Informações Básicas</h2>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
                        <InputField label="Nome Completo" value={profile.name} onChange={(v) => setProfile({ name: v })} placeholder="John Doe" />
                        <InputField label="Localização" value={profile.location} onChange={(v) => setProfile({ location: v })} placeholder="São Paulo, SP" />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
                        <InputField label="E-mail" value={profile.email} onChange={(v) => setProfile({ email: v })} placeholder="email@provedor.com" />
                        <InputField label="LinkedIn" value={profile.linkedin} onChange={(v) => setProfile({ linkedin: v })} placeholder="linkedin.com/in/usuario" />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
                        <InputField label="GitHub" value={profile.github || ""} onChange={(v) => setProfile({ github: v })} placeholder="github.com/usuario" />
                        <InputField label="Posicionamento Alvo" value={profile.target_positioning} onChange={(v) => setProfile({ target_positioning: v })} placeholder="Engenheiro Front-end Sênior" />
                    </div>

                    <div className="flex flex-col gap-2 relative mt-4 group">
                        <label className="font-black text-sm uppercase tracking-widest absolute -top-3 left-4 bg-neo-secondary px-2 border-2 border-neo-fg z-10 transition-transform group-focus-within:-translate-y-1">Resumo Profissional (Master)</label>
                        <textarea
                            className="w-full border-4 border-neo-fg bg-white p-6 font-bold text-lg leading-relaxed min-h-[160px] resize-y neo-shadow-md focus:neo-shadow-lg transition-shadow focus:outline-none"
                            value={profile.professional_summary_base}
                            onChange={(e) => setProfile({ professional_summary_base: e.target.value })}
                            placeholder="Sua história principal. A IA cortará as partes irrelevantes depois."
                        />
                    </div>
                </section>

                <hr className="hr-thick mb-20" />

                {/* ── SKILLS ──────────────────────────── */}
                <section className="mb-20">
                    <div className="inline-block bg-neo-secondary border-4 border-neo-fg px-4 py-2 mb-8 neo-shadow-sm -rotate-1">
                        <h2 className="font-display font-black text-3xl tracking-tight uppercase">Domínios & Tecnologias</h2>
                    </div>

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
                    <div className="inline-block bg-neo-muted border-4 border-neo-fg px-4 py-2 mb-8 neo-shadow-sm rotate-2">
                        <h2 className="font-display font-black text-3xl tracking-tight uppercase">Reconhecimento & Academia</h2>
                    </div>

                    <div className="flex flex-col gap-8 mb-16">
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

                    <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-8 border-b-4 border-neo-fg pb-4">
                        <div>
                            <h3 className="font-display font-black text-2xl tracking-tight uppercase bg-white border-2 border-neo-fg px-3 py-1 inline-block -rotate-1">Formação Acadêmica</h3>
                        </div>
                        <button
                            className="inline-flex items-center gap-2 bg-neo-accent text-white px-4 py-2 font-black text-sm uppercase tracking-widest border-2 border-neo-fg neo-shadow-sm neo-push flex-shrink-0"
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
                            <Plus size={18} strokeWidth={3} />
                            Adicionar Formação
                        </button>
                    </div>

                    <div className="flex flex-col gap-8">
                        {(profile.education || []).map((edu, idx) => (
                            <article key={idx} className="border-4 border-neo-fg p-6 bg-white neo-shadow-md neo-lift flex flex-col xl:flex-row gap-6 justify-between items-start xl:items-center relative">
                                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full">
                                    <InputField label="Instituição" value={edu.institution}
                                        onChange={(v) => { const n = [...profile.education]; n[idx].institution = v; setProfile({ education: n }); }} />
                                    <InputField label="Grau" value={edu.degree}
                                        onChange={(v) => { const n = [...profile.education]; n[idx].degree = v; setProfile({ education: n }); }} />
                                    <InputField label="Período" value={edu.period}
                                        onChange={(v) => { const n = [...profile.education]; n[idx].period = v; setProfile({ education: n }); }} />
                                </div>
                                <button
                                    className="absolute -top-4 -right-4 bg-neo-fg text-white p-2 border-2 border-neo-fg hover:bg-neo-accent transition-colors neo-shadow-sm neo-push flex-shrink-0"
                                    onClick={() => {
                                        const n = [...profile.education];
                                        n.splice(idx, 1);
                                        setProfile({ education: n });
                                    }}
                                    title="Deletar Formação"
                                    aria-label="Deletar formação"
                                >
                                    <Trash2 size={20} strokeWidth={2} />
                                </button>
                            </article>
                        ))}
                    </div>
                </section>

                <hr className="hr-thick mb-20" />

                {/* ── EXPERIENCE ──────────────────────── */}
                <section className="mb-20">
                    <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12 border-b-4 border-neo-fg pb-6">
                        <div>
                            <div className="inline-block bg-white border-4 border-neo-fg p-3 mb-2 -rotate-1 neo-shadow-sm">
                                <h2 className="font-display font-black text-3xl tracking-tight uppercase">Registro de Experiência</h2>
                            </div>
                            <p className="font-bold text-lg text-neo-fg/80 mt-2">Documente todas as suas passagens. O motor combinará o que importa e descartará o resto.</p>
                        </div>
                        <button
                            className="inline-flex items-center gap-2 bg-neo-fg text-white px-6 py-4 font-black text-lg uppercase tracking-widest border-4 border-neo-fg hover:bg-neo-accent transition-colors neo-shadow-md neo-push flex-shrink-0"
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
                            <Plus size={24} strokeWidth={3} />
                            Adicionar Registro
                        </button>
                    </div>

                    <div className="flex flex-col gap-12">
                        {profile.experience_master.map((exp, idx) => (
                            <article key={idx} className="border-4 border-neo-fg bg-white neo-shadow-lg relative texture-grid">

                                {/* Experience Header */}
                                <div className="bg-neo-fg text-white px-6 md:px-8 py-5 flex flex-col md:flex-row justify-between items-start md:items-center relative border-b-4 border-neo-fg">
                                    <div className="relative z-10 flex flex-col gap-1">
                                        <span className="font-display font-black text-2xl uppercase tracking-tight text-neo-secondary">{exp.role}</span>
                                        <span className="font-bold text-lg">{exp.company}</span>
                                    </div>
                                    <button
                                        className="absolute top-4 right-4 md:static mt-2 md:mt-0 bg-white text-neo-fg p-2 border-2 border-neo-fg hover:bg-neo-accent hover:text-white transition-colors neo-push focus:outline-none"
                                        onClick={() => {
                                            const newExps = [...profile.experience_master];
                                            newExps.splice(idx, 1);
                                            setProfile({ experience_master: newExps });
                                        }}
                                        title="Deletar Cargo"
                                        aria-label="Deletar cargo"
                                    >
                                        <Trash2 size={24} strokeWidth={2.5} />
                                    </button>
                                </div>

                                {/* Experience Form */}
                                <div className="p-6 md:p-8 bg-white/95">
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
                                        <InputField label="Empresa" value={exp.company}
                                            onChange={(v) => { const n = [...profile.experience_master]; n[idx].company = v; setProfile({ experience_master: n }); }} />
                                        <InputField label="Cargo" value={exp.role}
                                            onChange={(v) => { const n = [...profile.experience_master]; n[idx].role = v; setProfile({ experience_master: n }); }} />
                                    </div>

                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
                                        <InputField label="Data de Início" value={exp.start_date}
                                            onChange={(v) => { const n = [...profile.experience_master]; n[idx].start_date = v; setProfile({ experience_master: n }); }} />
                                        <InputField label="Data de Fim" value={exp.end_date}
                                            onChange={(v) => { const n = [...profile.experience_master]; n[idx].end_date = v; setProfile({ experience_master: n }); }} />
                                    </div>

                                    <div className="flex flex-col gap-2 relative mt-4 group mb-8">
                                        <label className="font-black text-sm uppercase tracking-widest absolute -top-3 left-4 bg-neo-secondary px-2 border-2 border-neo-fg z-10 transition-transform group-focus-within:-translate-y-1">Resumo da Posição</label>
                                        <textarea
                                            className="w-full border-4 border-neo-fg bg-white p-6 font-bold text-base leading-relaxed min-h-[100px] resize-y neo-shadow-sm focus:neo-shadow-md transition-shadow focus:outline-none"
                                            value={exp.description}
                                            onChange={(e) => { const n = [...profile.experience_master]; n[idx].description = e.target.value; setProfile({ experience_master: n }); }}
                                        />
                                    </div>

                                    <InputField label="Tecnologias (Vírgula)" value={exp.technologies.join(", ")}
                                        onChange={(v) => { const n = [...profile.experience_master]; n[idx].technologies = v.split(",").map(t => t.trim()).filter(Boolean); setProfile({ experience_master: n }); }} />

                                    {/* Achievements */}
                                    <div className="border-t-4 border-neo-fg pt-8 mt-10">
                                        <div className="flex items-center justify-between mb-8">
                                            <div className="bg-neo-muted border-4 border-neo-fg px-3 py-1 rotate-1 neo-shadow-sm">
                                                <h4 className="font-black text-xl uppercase tracking-widest">Banco de Conquistas</h4>
                                            </div>
                                            <button
                                                className="inline-flex items-center gap-2 bg-neo-accent text-white px-4 py-2 font-black text-sm uppercase tracking-widest border-2 border-neo-fg neo-shadow-sm neo-push flex-shrink-0"
                                                onClick={() => { const n = [...profile.experience_master]; n[idx].achievements.push(""); setProfile({ experience_master: n }); }}
                                            >
                                                <Plus size={18} strokeWidth={3} />
                                                Adicionar Fato
                                            </button>
                                        </div>

                                        <div className="flex flex-col gap-6">
                                            {exp.achievements.map((achiev, aIdx) => (
                                                <div key={aIdx} className="flex flex-col md:flex-row items-stretch gap-4 bg-white border-2 border-neo-fg p-4 neo-shadow-sm relative">
                                                    <div className="bg-neo-secondary border-2 border-neo-fg w-10 h-10 flex items-center justify-center font-black flex-shrink-0 self-start md:self-center shrink-0">
                                                        {aIdx + 1}
                                                    </div>
                                                    <textarea
                                                        className="w-full border-2 border-neo-fg bg-white px-4 py-3 font-bold text-sm leading-relaxed min-h-[60px] resize-y focus:outline-none focus:border-neo-accent focus:neo-shadow-sm transition-all"
                                                        value={achiev}
                                                        onChange={(e) => { const n = [...profile.experience_master]; n[idx].achievements[aIdx] = e.target.value; setProfile({ experience_master: n }); }}
                                                    />
                                                    <button
                                                        className="bg-white text-neo-fg border-2 border-neo-fg p-2 hover:bg-neo-accent hover:text-white transition-colors neo-push flex-shrink-0 self-end md:self-center mt-2 md:mt-0"
                                                        title="Remover"
                                                        aria-label="Remover conquista"
                                                        onClick={() => { const n = [...profile.experience_master]; n[idx].achievements.splice(aIdx, 1); setProfile({ experience_master: n }); }}
                                                    >
                                                        <Trash2 size={20} strokeWidth={2} />
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
function InputField({ label, value, onChange, placeholder }: {
    label: string;
    value: string;
    onChange: (v: string) => void;
    placeholder?: string;
}) {
    return (
        <div className="flex flex-col gap-2 relative mt-4 group">
            <label className="font-black text-sm uppercase tracking-widest absolute -top-3 left-4 bg-neo-secondary px-2 border-2 border-neo-fg z-10 transition-transform group-focus-within:-translate-y-1">
                {label}
            </label>
            <input
                className="w-full border-4 border-neo-fg bg-white px-4 pt-5 pb-3 font-bold text-lg neo-shadow-sm focus:neo-shadow-md transition-shadow focus:outline-none"
                value={value}
                onChange={(e) => onChange(e.target.value)}
                placeholder={placeholder}
            />
        </div>
    );
}
