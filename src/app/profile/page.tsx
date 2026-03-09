"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useMasterProfile } from "../../store/useMasterProfile";
import styles from "./page.module.css";

export default function ProfilePage() {
    const { profile, setProfile } = useMasterProfile();
    const [isClient, setIsClient] = useState(false);

    useEffect(() => {
        setIsClient(true);
    }, []);

    if (!isClient) return null;

    return (
        <div className={styles.container}>
            <header className={styles.header}>
                <h1 className={styles.title}>Master Profile Editor</h1>
                <Link href="/" className={styles.navBtn}>← Back Dashboard</Link>
            </header>

            <div className={styles.section}>
                <h2 className={styles.sectionTitle}>Basic Information</h2>

                <div className={styles.row}>
                    <div className={styles.col}>
                        <div className={styles.formGroup}>
                            <label>Full Name</label>
                            <input
                                className={styles.input}
                                value={profile.name}
                                onChange={(e) => setProfile({ name: e.target.value })}
                            />
                        </div>
                    </div>
                    <div className={styles.col}>
                        <div className={styles.formGroup}>
                            <label>Location</label>
                            <input
                                className={styles.input}
                                value={profile.location}
                                onChange={(e) => setProfile({ location: e.target.value })}
                            />
                        </div>
                    </div>
                </div>

                <div className={styles.row}>
                    <div className={styles.col}>
                        <div className={styles.formGroup}>
                            <label>Email</label>
                            <input
                                className={styles.input}
                                value={profile.email}
                                onChange={(e) => setProfile({ email: e.target.value })}
                            />
                        </div>
                    </div>
                    <div className={styles.col}>
                        <div className={styles.formGroup}>
                            <label>LinkedIn</label>
                            <input
                                className={styles.input}
                                value={profile.linkedin}
                                onChange={(e) => setProfile({ linkedin: e.target.value })}
                            />
                        </div>
                    </div>
                </div>

                <div className={styles.formGroup}>
                    <label>Target Positioning</label>
                    <input
                        className={styles.input}
                        value={profile.target_positioning}
                        onChange={(e) => setProfile({ target_positioning: e.target.value })}
                    />
                </div>

                <div className={styles.formGroup}>
                    <label>Professional Summary</label>
                    <textarea
                        className={styles.textarea}
                        value={profile.professional_summary_base}
                        onChange={(e) => setProfile({ professional_summary_base: e.target.value })}
                    />
                </div>
            </div>

            <div className={styles.section}>
                <h2 className={styles.sectionTitle}>Domains & Skills</h2>
                <div className={styles.formGroup}>
                    <label>Core Domains (comma separated)</label>
                    <input
                        className={styles.input}
                        value={profile.core_domains.join(", ")}
                        onChange={(e) => setProfile({ core_domains: e.target.value.split(",").map(s => s.trim()) })}
                    />
                </div>

                <div className={styles.formGroup}>
                    <label>Custom Tech Skills (comma separated overrides)</label>
                    <input
                        className={styles.input}
                        value={profile.technologies_possible.join(", ")}
                        onChange={(e) => setProfile({ technologies_possible: e.target.value.split(",").map(s => s.trim()).filter(Boolean) })}
                    />
                </div>
            </div>

            <div className={styles.section}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
                    <h2 className={styles.sectionTitle} style={{ margin: 0 }}>Experience Log</h2>
                    <button
                        className={styles.btnSm}
                        onClick={() => {
                            const newExps = [...profile.experience_master];
                            newExps.unshift({
                                company: "New Company",
                                role: "Job Title",
                                start_date: "Month YYYY",
                                end_date: "Present",
                                description: "Brief role description.",
                                technologies: [],
                                achievements: ["New achievement..."]
                            });
                            setProfile({ experience_master: newExps });
                        }}
                    >
                        + Add Experience
                    </button>
                </div>
                <p style={{ color: "var(--fg-pencil)", opacity: 0.8, marginBottom: "1.5rem" }}>
                    Track all career roles here. AI will extract and tailor the best matches for your resume.
                </p>

                {profile.experience_master.map((exp, idx) => (
                    <div key={idx} style={{ marginBottom: "2.5rem", paddingBottom: "1.5rem", borderBottom: "3px dashed var(--muted-paper)" }}>
                        <div className={styles.row}>
                            <div className={styles.col}>
                                <div className={styles.formGroup}>
                                    <label>Company</label>
                                    <input
                                        className={styles.input}
                                        value={exp.company}
                                        onChange={(e) => {
                                            const newExps = [...profile.experience_master];
                                            newExps[idx].company = e.target.value;
                                            setProfile({ experience_master: newExps });
                                        }}
                                    />
                                </div>
                            </div>
                            <div className={styles.col}>
                                <div className={styles.formGroup}>
                                    <label>Role</label>
                                    <input
                                        className={styles.input}
                                        value={exp.role}
                                        onChange={(e) => {
                                            const newExps = [...profile.experience_master];
                                            newExps[idx].role = e.target.value;
                                            setProfile({ experience_master: newExps });
                                        }}
                                    />
                                </div>
                            </div>
                        </div>
                        <div className={styles.row}>
                            <div className={styles.col}>
                                <div className={styles.formGroup}>
                                    <label>Start Date</label>
                                    <input
                                        className={styles.input}
                                        value={exp.start_date}
                                        onChange={(e) => {
                                            const newExps = [...profile.experience_master];
                                            newExps[idx].start_date = e.target.value;
                                            setProfile({ experience_master: newExps });
                                        }}
                                    />
                                </div>
                            </div>
                            <div className={styles.col}>
                                <div className={styles.formGroup}>
                                    <label>End Date</label>
                                    <input
                                        className={styles.input}
                                        value={exp.end_date}
                                        onChange={(e) => {
                                            const newExps = [...profile.experience_master];
                                            newExps[idx].end_date = e.target.value;
                                            setProfile({ experience_master: newExps });
                                        }}
                                    />
                                </div>
                            </div>
                        </div>
                        <div className={styles.formGroup}>
                            <label>General Description</label>
                            <textarea
                                className={styles.textarea}
                                style={{ minHeight: '80px' }}
                                value={exp.description}
                                onChange={(e) => {
                                    const newExps = [...profile.experience_master];
                                    newExps[idx].description = e.target.value;
                                    setProfile({ experience_master: newExps });
                                }}
                            />
                        </div>

                        <div className={styles.formGroup}>
                            <label>Technologies Used (comma separated)</label>
                            <input
                                className={styles.input}
                                value={exp.technologies.join(", ")}
                                onChange={(e) => {
                                    const newExps = [...profile.experience_master];
                                    newExps[idx].technologies = e.target.value.split(",").map(t => t.trim()).filter(Boolean);
                                    setProfile({ experience_master: newExps });
                                }}
                            />
                        </div>

                        <div className={styles.formGroup}>
                            <label>Achievements (Bullet Points)</label>
                            <div className={styles.arrayInput}>
                                {exp.achievements.map((achiev, aIdx) => (
                                    <div key={aIdx} className={styles.arrayItem}>
                                        <textarea
                                            className={styles.textarea}
                                            style={{ minHeight: "60px", flex: 1 }}
                                            value={achiev}
                                            onChange={(e) => {
                                                const newExps = [...profile.experience_master];
                                                newExps[idx].achievements[aIdx] = e.target.value;
                                                setProfile({ experience_master: newExps });
                                            }}
                                        />
                                        <button
                                            className={`${styles.btnSm} ${styles.btnRemove}`}
                                            onClick={() => {
                                                const newExps = [...profile.experience_master];
                                                newExps[idx].achievements.splice(aIdx, 1);
                                                setProfile({ experience_master: newExps });
                                            }}
                                        >
                                            X
                                        </button>
                                    </div>
                                ))}
                                <button
                                    className={styles.btnSm}
                                    style={{ alignSelf: "flex-start", marginTop: "0.5rem" }}
                                    onClick={() => {
                                        const newExps = [...profile.experience_master];
                                        newExps[idx].achievements.push("");
                                        setProfile({ experience_master: newExps });
                                    }}
                                >
                                    + Add Achievement
                                </button>
                            </div>
                        </div>

                        <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '1rem' }}>
                            <button
                                className={`${styles.btnSm} ${styles.btnRemove}`}
                                onClick={() => {
                                    const newExps = [...profile.experience_master];
                                    newExps.splice(idx, 1);
                                    setProfile({ experience_master: newExps });
                                }}
                            >
                                Delete Experience Block
                            </button>
                        </div>
                    </div>
                ))}
            </div>

        </div>
    );
}
