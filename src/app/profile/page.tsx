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

    if (!isClient) return null; // Avoid hydration mismatch

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
                    <label>Programming Languages (comma separated)</label>
                    <input
                        className={styles.input}
                        value={profile.languages_programming.join(", ")}
                        onChange={(e) => setProfile({ languages_programming: e.target.value.split(",").map(s => s.trim()) })}
                    />
                </div>

                <div className={styles.formGroup}>
                    <label>Technologies / Tools (comma separated)</label>
                    <input
                        className={styles.input}
                        value={profile.technologies_possible.join(", ")}
                        onChange={(e) => setProfile({ technologies_possible: e.target.value.split(",").map(s => s.trim()) })}
                    />
                </div>
            </div>

            <div className={styles.section}>
                <h2 className={styles.sectionTitle}>Experience Bullet Bank</h2>
                <p style={{ color: "var(--text-muted)", marginBottom: "1rem" }}>
                    This is the core collection of all things you've done. AI will pick and rewrite from here based on the target job.
                </p>

                {profile.experience_master.map((exp, idx) => (
                    <div key={idx} style={{ marginBottom: "2rem", paddingBottom: "1rem", borderBottom: "1px dashed var(--border)" }}>
                        <div className={styles.row}>
                            <div className={styles.col}>
                                <div className={styles.formGroup}>
                                    <label>Title</label>
                                    <input
                                        className={styles.input}
                                        value={exp.title}
                                        onChange={(e) => {
                                            const newExps = [...profile.experience_master];
                                            newExps[idx].title = e.target.value;
                                            setProfile({ experience_master: newExps });
                                        }}
                                    />
                                </div>
                            </div>
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
                                    <label>Period</label>
                                    <input
                                        className={styles.input}
                                        value={exp.period}
                                        onChange={(e) => {
                                            const newExps = [...profile.experience_master];
                                            newExps[idx].period = e.target.value;
                                            setProfile({ experience_master: newExps });
                                        }}
                                    />
                                </div>
                            </div>
                        </div>
                        <div className={styles.formGroup}>
                            <label>Base Description</label>
                            <input
                                className={styles.input}
                                value={exp.base_description}
                                onChange={(e) => {
                                    const newExps = [...profile.experience_master];
                                    newExps[idx].base_description = e.target.value;
                                    setProfile({ experience_master: newExps });
                                }}
                            />
                        </div>
                        <div className={styles.formGroup}>
                            <label>Bullets (The Bank)</label>
                            <div className={styles.arrayInput}>
                                {exp.bullet_bank.map((bullet, bIdx) => (
                                    <div key={bIdx} className={styles.arrayItem}>
                                        <input
                                            className={styles.input}
                                            value={bullet}
                                            onChange={(e) => {
                                                const newExps = [...profile.experience_master];
                                                newExps[idx].bullet_bank[bIdx] = e.target.value;
                                                setProfile({ experience_master: newExps });
                                            }}
                                        />
                                        <button
                                            className={`${styles.btnSm} ${styles.btnRemove}`}
                                            onClick={() => {
                                                const newExps = [...profile.experience_master];
                                                newExps[idx].bullet_bank.splice(bIdx, 1);
                                                setProfile({ experience_master: newExps });
                                            }}
                                        >
                                            Delete
                                        </button>
                                    </div>
                                ))}
                                <button
                                    className={styles.btnSm}
                                    style={{ alignSelf: "flex-start", marginTop: "0.5rem" }}
                                    onClick={() => {
                                        const newExps = [...profile.experience_master];
                                        newExps[idx].bullet_bank.push("New bullet achievement...");
                                        setProfile({ experience_master: newExps });
                                    }}
                                >
                                    + Add Bullet
                                </button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

        </div>
    );
}
