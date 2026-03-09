"use client";

import { MasterProfile } from "@/models/masterProfile";
import { Download } from "lucide-react";

interface ResumePreviewProps {
    data: any;
    masterData: MasterProfile;
}

/*
 * ATS Resume Preview — pixel-perfect match to PIRATE KING Resume - White template.
 * Font: Times New Roman throughout. Tight spacing. Blue section headings + blue links.
 */
export default function ResumePreview({ data, masterData }: ResumePreviewProps) {
    const handlePrint = () => {
        const originalTitle = document.title;
        document.title = "Curriculo";
        window.print();
        document.title = originalTitle;
    };

    // Normalize field names across both API schemas (Match vs Generate)
    const summary = data.professional_summary || data.summary || masterData.professional_summary_base;
    const skills = data.selected_skills || data.skills_ranked || [];
    const experiences = data.selected_experiences || data.experience_selected || [];
    const education = data.education || [];
    const projects = data.projects_selected || [];
    const certifications = data.certifications || [];

    // Style constants matching PIRATE KING template
    const FONT = "'Times New Roman', Times, serif";
    const BLUE = "#2B6CB0";
    const GRAY_LINE = "#C0C0C0";

    return (
        <div className="flex flex-col h-full bg-[var(--bg)] text-[var(--fg)]">
            {/* Newsprint Toolbar — hidden when printing */}
            <div className="print:hidden sticky top-0 z-10 bg-[var(--bg)] border-b border-[var(--fg)] px-4 py-2 flex items-center gap-4">
                <button
                    onClick={handlePrint}
                    className="inline-flex items-center gap-2 bg-[var(--fg)] text-[var(--bg)] px-4 py-2 font-sans text-xs font-bold uppercase tracking-widest hover:bg-white hover:text-[var(--fg)] border border-[var(--fg)] transition-all duration-200"
                >
                    <Download className="w-4 h-4" strokeWidth={1.5} />
                    Exportar PDF (Padrão ATS)
                </button>
                <p className="font-mono text-[10px] text-[var(--neutral-500)] uppercase tracking-widest">
                    Ajuste as margens para &quot;Nenhuma&quot; na caixa de impressão
                </p>
            </div>

            {/* ═══════════════════════════════════════════════════════════
                A4 Paper — PIRATE KING Resume White template clone
                All styling is inline to guarantee print fidelity.
               ═══════════════════════════════════════════════════════════ */}
            <div
                className="mx-auto bg-white text-black w-full max-w-[210mm] min-h-[297mm] shadow-2xl print:shadow-none print:m-0 print:w-auto print:min-h-0"
                style={{
                    fontFamily: FONT,
                    fontSize: "10pt",
                    lineHeight: 1.35,
                    padding: "24px 32px",
                    color: "#000",
                }}
            >
                {/* ── HEADER ───────────────────────────────── */}
                <header style={{ textAlign: "center", marginBottom: "6px" }}>
                    {/* Name */}
                    <h1 style={{
                        fontFamily: FONT,
                        fontSize: "22pt",
                        fontWeight: 400,
                        letterSpacing: "0.15em",
                        textTransform: "uppercase",
                        margin: "0 0 4px 0",
                        fontVariant: "small-caps",
                    }}>
                        {masterData.name}
                    </h1>

                    {/* Contact row */}
                    <div style={{
                        fontFamily: FONT,
                        fontSize: "9pt",
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        gap: "8px",
                        flexWrap: "wrap",
                    }}>
                        {masterData.linkedin && (
                            <>
                                <a href={masterData.linkedin} target="_blank" rel="noreferrer" style={{ color: BLUE, textDecoration: "underline" }}>
                                    LinkedIn
                                </a>
                                <span style={{ color: "#666" }}>|</span>
                            </>
                        )}
                        {masterData.location && (
                            <>
                                <span>{masterData.location}</span>
                                <span style={{ color: "#666" }}>|</span>
                            </>
                        )}
                        {masterData.email && (
                            <>
                                <a href={`mailto:${masterData.email}`} style={{ color: BLUE, textDecoration: "underline" }}>
                                    {masterData.email}
                                </a>
                                <span style={{ color: "#666" }}>|</span>
                            </>
                        )}
                        {masterData.github && (
                            <a href={masterData.github} target="_blank" rel="noreferrer" style={{ color: BLUE, textDecoration: "underline" }}>
                                GitHub
                            </a>
                        )}
                    </div>
                </header>

                {/* ── SUMMARY / SOBRE ─────────────────────── */}
                {summary && (
                    <section style={{ marginBottom: "8px" }}>
                        <SectionHeading text="Summary" blue={BLUE} line={GRAY_LINE} font={FONT} />
                        <p style={{ margin: 0, fontSize: "9.5pt", lineHeight: 1.4, textAlign: "justify" }}>
                            {summary}
                        </p>
                    </section>
                )}

                {/* ── SKILLS ───────────────────────────────── */}
                {skills.length > 0 && (
                    <section style={{ marginBottom: "8px" }}>
                        <SectionHeading text="Skills" blue={BLUE} line={GRAY_LINE} font={FONT} />
                        <ul style={{ margin: 0, padding: "0 0 0 16px", fontSize: "9.5pt", lineHeight: 1.4 }}>
                            <li style={{ marginBottom: "1px" }}>
                                {skills.join(" | ")}
                            </li>
                        </ul>
                    </section>
                )}

                {/* ── EXPERIENCE ───────────────────────────── */}
                {experiences.length > 0 && (
                    <section style={{ marginBottom: "8px" }}>
                        <SectionHeading text="Experience" blue={BLUE} line={GRAY_LINE} font={FONT} />
                        {experiences.map((job: any, idx: number) => (
                            <div key={idx} style={{ marginBottom: idx < experiences.length - 1 ? "8px" : 0 }}>
                                {/* Role + Company + Location + Date row */}
                                <div style={{
                                    display: "flex",
                                    justifyContent: "space-between",
                                    alignItems: "baseline",
                                    fontSize: "10pt",
                                    marginBottom: "1px",
                                }}>
                                    <div>
                                        <span style={{ fontWeight: 700 }}>{job.role || job.title}</span>
                                        {job.company && (
                                            <>
                                                {" "}
                                                <span style={{ fontWeight: 700, color: BLUE, textDecoration: "underline" }}>{job.company}</span>
                                            </>
                                        )}
                                        {job.location && (
                                            <span style={{ marginLeft: "12px", color: "#333" }}>{job.location}</span>
                                        )}
                                    </div>
                                    <span style={{ whiteSpace: "nowrap", fontWeight: 400, color: "#000", fontSize: "9.5pt" }}>
                                        {job.start_date}{job.end_date ? ` - ${job.end_date}` : job.period ? ` - ${job.period}` : ""}
                                    </span>
                                </div>

                                {/* Description line (if present) */}
                                {job.description && !job.achievements?.length && !job.bullets?.length && (
                                    <p style={{ margin: "0 0 2px 16px", fontSize: "9.5pt", lineHeight: 1.35 }}>
                                        {job.description}
                                    </p>
                                )}

                                {/* Bullet points */}
                                {(job.achievements || job.bullets || []).length > 0 && (
                                    <ul style={{ margin: "0", padding: "0 0 0 16px", fontSize: "9.5pt", lineHeight: 1.4 }}>
                                        {(job.achievements || job.bullets || []).map((bullet: string, bIdx: number) => (
                                            <li key={bIdx} style={{ marginBottom: "1px" }}>
                                                {bullet}
                                            </li>
                                        ))}
                                    </ul>
                                )}
                            </div>
                        ))}
                    </section>
                )}

                {/* ── EDUCATION ────────────────────────────── */}
                {education.length > 0 && (
                    <section style={{ marginBottom: "8px" }}>
                        <SectionHeading text="Education" blue={BLUE} line={GRAY_LINE} font={FONT} />
                        {education.map((edu: any, idx: number) => (
                            <div key={idx} style={{ marginBottom: "4px" }}>
                                <div style={{
                                    display: "flex",
                                    justifyContent: "space-between",
                                    alignItems: "baseline",
                                    fontSize: "10pt",
                                }}>
                                    <div>
                                        <span style={{ fontWeight: 700 }}>{edu.degree}</span>
                                        {edu.institution && (
                                            <>
                                                {"  "}
                                                <span style={{ fontWeight: 700, color: BLUE, textDecoration: "underline", marginLeft: "16px" }}>{edu.institution}</span>
                                            </>
                                        )}
                                        {edu.location && (
                                            <span style={{ marginLeft: "12px", color: "#333" }}>{edu.location}</span>
                                        )}
                                    </div>
                                    <span style={{ whiteSpace: "nowrap", fontSize: "9.5pt" }}>
                                        {edu.period}
                                    </span>
                                </div>
                                {edu.major && (
                                    <p style={{ margin: "0 0 0 16px", fontSize: "9pt", lineHeight: 1.3 }}>
                                        • {edu.major}
                                    </p>
                                )}
                            </div>
                        ))}
                    </section>
                )}

                {/* ── PROJECTS ────────────────────────────── */}
                {projects.length > 0 && (
                    <section style={{ marginBottom: "8px" }}>
                        <SectionHeading text="Projects" blue={BLUE} line={GRAY_LINE} font={FONT} />
                        <ul style={{ margin: 0, padding: "0 0 0 16px", fontSize: "9.5pt", lineHeight: 1.4 }}>
                            {projects.map((proj: any, idx: number) => (
                                <li key={idx} style={{ marginBottom: "2px" }}>
                                    <span style={{ fontWeight: 700, color: BLUE }}>{proj.name}</span>
                                    {": "}
                                    {proj.relevance_reason || (proj.tags || []).join(", ")}
                                </li>
                            ))}
                        </ul>
                    </section>
                )}

                {/* ── CERTIFICATIONS ─────────────────────── */}
                {certifications.length > 0 && (
                    <section style={{ marginBottom: "8px" }}>
                        <SectionHeading text="Certifications" blue={BLUE} line={GRAY_LINE} font={FONT} />
                        <ul style={{ margin: 0, padding: "0 0 0 16px", fontSize: "9.5pt", lineHeight: 1.4 }}>
                            {certifications.map((cert: string, idx: number) => (
                                <li key={idx} style={{ marginBottom: "1px" }}>{cert}</li>
                            ))}
                        </ul>
                    </section>
                )}

            </div>
        </div>
    );
}

/* ─── Shared section heading component ─── */
function SectionHeading({ text, blue, line, font }: { text: string; blue: string; line: string; font: string }) {
    return (
        <h2 style={{
            fontFamily: font,
            fontSize: "12pt",
            fontWeight: 700,
            color: blue,
            borderBottom: `1px solid ${line}`,
            paddingBottom: "2px",
            marginBottom: "4px",
            marginTop: "0",
        }}>
            {text}
        </h2>
    );
}
