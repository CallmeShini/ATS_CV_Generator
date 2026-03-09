"use client";

import { useState } from "react";
import Link from "next/link";
import { useMasterProfile } from "../../store/useMasterProfile";
import { PRELOADED_SKILLS } from "../../constants/skills";
import styles from "../generate/page.module.css";
import profileStyles from "../profile/page.module.css";

export default function MatchPage() {
    const { profile } = useMasterProfile();
    const [jobDescription, setJobDescription] = useState("");
    const [generatedJson, setGeneratedJson] = useState("");
    const [isGenerating, setIsGenerating] = useState(false);

    // Flatten preloaded skills into a single array for keyword extraction
    const allPreloadedSkills = Object.values(PRELOADED_SKILLS).flat();

    const generateMatch = () => {
        setIsGenerating(true);
        setTimeout(() => {
            const jdLower = jobDescription.toLowerCase();

            // 1. Match skills
            const matchedSkills = new Set<string>();

            // Check against user's specific technologies
            profile.technologies_possible.forEach(skill => {
                if (jdLower.includes(skill.toLowerCase())) {
                    matchedSkills.add(skill);
                }
            });

            // Check against preloaded canonical skills
            allPreloadedSkills.forEach(skill => {
                if (jdLower.includes(skill.toLowerCase())) {
                    matchedSkills.add(skill);
                }
            });

            const finalSkillsList = Array.from(matchedSkills);

            // 2. Score and select top experiences
            const scoredExperiences = profile.experience_master.map(exp => {
                let score = 0;
                const expText = [
                    exp.role,
                    exp.description,
                    ...exp.technologies,
                    ...exp.achievements
                ].join(" ").toLowerCase();

                // Simple keyword density matching
                finalSkillsList.forEach(skill => {
                    const skillLower = skill.toLowerCase();
                    if (expText.includes(skillLower)) {
                        score += 3; // Give high weight if the experience mentions the required skill
                    }
                });

                if (jdLower.includes(exp.role.toLowerCase())) {
                    score += 10;
                }

                return { ...exp, _score: score };
            });

            // Sort by score and take the top ones (or all if they have some relevance, let's say max 4 for a 1-pager)
            const selectedExperiences = scoredExperiences
                .sort((a, b) => b._score - a._score)
                .slice(0, 4)
                .map(({ _score, ...rest }) => rest);

            const resultPayload = {
                target_role: profile.target_positioning, // This could be extracted from JD, using base for now
                keywords_detected: finalSkillsList,
                selected_skills: finalSkillsList,
                selected_experiences: selectedExperiences,
                optimization_notes: [
                    `Matched ${finalSkillsList.length} total keywords from JD.`,
                    `Selected top ${selectedExperiences.length} experiences based on density.`
                ]
            };

            setGeneratedJson(JSON.stringify(resultPayload, null, 2));
            setIsGenerating(false);
        }, 600); // Fake delay for UX feeling
    };

    return (
        <div className={styles.container}>
            <header className={styles.header}>
                <h1 className={styles.title}>Job Matcher Algorithm</h1>
                <div style={{ display: 'flex', gap: '1rem' }}>
                    <Link href="/" className={profileStyles.navBtn}>← Dashboard</Link>
                    <Link href="/generate" className={profileStyles.navBtn}>Go to Generator →</Link>
                </div>
            </header>

            <div className={styles.splitView}>
                <div className={styles.leftPane}>
                    <div className={styles.formGroup}>
                        <label>Paste the Job Description</label>
                        <textarea
                            className={styles.textarea}
                            placeholder="We are looking for a Senior Frontend Engineer with experience in React, Next.js..."
                            value={jobDescription}
                            onChange={(e) => setJobDescription(e.target.value)}
                        />
                    </div>
                    <button
                        className={styles.btnPrimary}
                        onClick={generateMatch}
                        disabled={!jobDescription || isGenerating}
                    >
                        {isGenerating ? "Analyzing..." : "Analyze & Match"}
                    </button>
                    <p style={{ color: "var(--fg-pencil)", opacity: 0.8, fontSize: "0.9rem" }}>
                        The local engine will cross-reference the JD with your Master Profile experiences and skills to form the ultimate ATS payload.
                    </p>
                </div>

                <div className={styles.rightPane}>
                    <div className={styles.formGroup} style={{ height: "100%" }}>
                        <label>Generated ATS Optimization JSON</label>
                        <div className={styles.previewContainer} style={{ height: "100%", margin: 0 }}>
                            {generatedJson ? (
                                <pre className={styles.pre} style={{ whiteSpace: 'pre-wrap' }}>
                                    {generatedJson}
                                </pre>
                            ) : (
                                <p style={{ color: "#aaa", textAlign: "center", marginTop: "40%" }}>
                                    Your tailored JSON structure will appear here. Paste it onto the Generator later.
                                </p>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
