"use client";

import { useState } from "react";
import styles from "./resume.module.css";
import { MasterProfile } from "@/models/masterProfile";

interface ResumePreviewProps {
    data: any;
    masterData: MasterProfile;
}

export default function ResumePreview({ data, masterData }: ResumePreviewProps) {
    const [isDark, setIsDark] = useState(false);

    const handlePrint = () => {
        const originalTitle = document.title;
        document.title = "Resume"; // Short title just in case
        window.print();
        document.title = originalTitle;
    };

    return (
        <div>
            <div style={{ marginBottom: "1rem", display: "flex", gap: "1rem" }} className="no-print">
                <button
                    onClick={handlePrint}
                    style={{ padding: "0.5rem 1rem", background: "var(--primary)", color: "var(--background)", borderRadius: "4px", border: "none", cursor: "pointer" }}
                >
                    Export PDF (ATS Safe)
                </button>
            </div>

            <div className={`${styles.resumeWrapper}`}>
                {/* Header */}
                <header className={styles.headerArea}>
                    <h1 className={styles.name}>{masterData.name}</h1>
                    <div className={styles.contact}>
                        <span className={styles.contactItem} title="LinkedIn">
                            <span>💼</span>
                            <a href={masterData.linkedin} target="_blank" rel="noreferrer">LinkedIn</a>
                        </span>
                        <span className={styles.contactSep}>|</span>
                        <span className={styles.contactItem} title="Location">
                            <span>📍</span>
                            <span>{masterData.location}</span>
                        </span>
                        <span className={styles.contactSep}>|</span>
                        <span className={styles.contactItem} title="Email">
                            <span>✉️</span>
                            <a href={`mailto:${masterData.email}`}>{masterData.email}</a>
                        </span>
                        <span className={styles.contactSep}>|</span>
                        <span className={styles.contactItem} title="GitHub">
                            <span>💻</span>
                            <a href={masterData.github} target="_blank" rel="noreferrer">GitHub</a>
                        </span>
                    </div>
                </header>

                {/* Core Skills & Tech Stack */}
                <section className={styles.section}>
                    <h2 className={styles.sectionTitle}>Skills</h2>
                    <ul className={styles.skillList}>
                        {(() => {
                            const skills = data.selected_skills || [];
                            if (skills.length === 0) return null;
                            const chunkSize = Math.ceil(skills.length / 3) || 1;
                            const chunks = [];
                            for (let i = 0; i < skills.length; i += chunkSize) {
                                chunks.push(skills.slice(i, i + chunkSize));
                            }
                            return chunks.map((chunk, idx) => (
                                <li key={idx} className={styles.skillItem}>{chunk.join(" | ")}</li>
                            ));
                        })()}
                    </ul>
                </section>

                {/* Professional Experience */}
                <section className={styles.section}>
                    <h2 className={styles.sectionTitle}>Experience</h2>
                    {data.selected_experiences?.map((job: any, idx: number) => (
                        <div key={idx} className={styles.job}>
                            <div className={styles.jobHeader}>
                                <div className={styles.jobTitle}>{job.role || job.title}</div>
                                <div className={styles.jobCompany}>
                                    {job.company && <a href="#">{job.company}</a>}
                                </div>
                                <div className={styles.jobRight}>
                                    <span className={styles.jobLocation}>{job.location}</span>
                                    {job.location && <span style={{ margin: "0 0.5rem" }} />}
                                    <span className={styles.jobPeriod}>{job.start_date} {job.end_date ? `- ${job.end_date}` : job.period}</span>
                                </div>
                            </div>
                            <ul className={styles.bulletList}>
                                {(job.achievements || job.bullets || []).map((bullet: string, bIdx: number) => (
                                    <li key={bIdx}>{bullet}</li>
                                ))}
                            </ul>
                        </div>
                    ))}
                </section>

                {/* Education */}
                <section className={styles.section}>
                    <h2 className={styles.sectionTitle}>Education</h2>
                    {data.education?.map((edu: any, idx: number) => (
                        <div key={idx} className={styles.eduItem}>
                            <div className={styles.eduDegree}>{edu.degree}</div>
                            <div className={styles.eduInst}>
                                <strong>{edu.institution}</strong>
                            </div>
                            <div className={styles.eduPeriod}>{edu.period}</div>
                        </div>
                    ))}
                </section>

                {/* Projects */}
                {data.projects_selected && data.projects_selected.length > 0 && (
                    <section className={styles.section}>
                        <h2 className={styles.sectionTitle}>Projects</h2>
                        <ul className={styles.bulletListProject}>
                            {data.projects_selected.map((proj: any, idx: number) => {
                                // Logic to colorize the project name like the reference "COLORMAN"
                                const colors = ['#e6192b', '#f58231', '#ffe119', '#bfef45', '#3cb44b', '#42d4f4', '#4363d8', '#469990'];
                                let formattedName = <>{proj.name}</>;

                                if (proj.name === proj.name.toUpperCase() && proj.name.length <= 10) {
                                    formattedName = (
                                        <>
                                            {proj.name.split('').map((char: string, i: number) => (
                                                <span key={i} style={{ color: colors[i % colors.length] }}>{char}</span>
                                            ))}
                                        </>
                                    )
                                }

                                return (
                                    <li key={idx}>
                                        <strong>{formattedName}</strong>: {(proj.tags || []).join(", ") || proj.relevance_reason}
                                    </li>
                                );
                            })}
                        </ul>
                    </section>
                )}

                {/* Certifications (Mapped as Others) */}
                {data.certifications && data.certifications.length > 0 && (
                    <section className={styles.section}>
                        <h2 className={styles.sectionTitle}>Certifications</h2>
                        <ul className={styles.bulletListProject}>
                            {data.certifications?.map((cert: string, idx: number) => (
                                <li key={idx}>
                                    <strong>{cert}</strong>
                                </li>
                            ))}
                        </ul>
                    </section>
                )}
            </div>
        </div>
    );
}
