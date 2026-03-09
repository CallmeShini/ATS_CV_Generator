"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { useMasterProfile } from "../../store/useMasterProfile";
import { PRELOADED_SKILLS } from "../../constants/skills";
import { advancedMatch, cosineSimilarity, MatchScore } from "../../utils/matcherAlgorithm";
import styles from "../generate/page.module.css";
import profileStyles from "../profile/page.module.css";

export default function MatchPage() {
    const { profile } = useMasterProfile();
    const [jobDescription, setJobDescription] = useState("");
    const [generatedJson, setGeneratedJson] = useState("");
    const [isGenerating, setIsGenerating] = useState(false);

    // ML Worker State
    const [workerStatus, setWorkerStatus] = useState<string>("Initializing Engine...");
    const [isWorkerReady, setIsWorkerReady] = useState(false);
    const worker = useRef<Worker | null>(null);
    const pendingTasks = useRef<Map<number, Function>>(new Map());
    const uidRef = useRef(1);

    // Flatten preloaded skills into a single array for keyword extraction
    const allPreloadedSkills = Object.values(PRELOADED_SKILLS).flat();

    useEffect(() => {
        if (!worker.current) {
            // Initialize Worker
            worker.current = new Worker(new URL('../../utils/mlWorker.ts', import.meta.url), {
                type: 'module'
            });

            worker.current.addEventListener('message', (event) => {
                const { status, progress, uid, embedding } = event.data;

                if (status === 'progress') {
                    if (progress && progress.status === 'init') {
                        setWorkerStatus(`Loading Neural Engine: ${progress.file} ...`);
                    } else if (progress && progress.status === 'downloading') {
                        setWorkerStatus(`Downloading ${progress.file}: ${Math.round(progress.progress)}%`);
                    } else if (progress && progress.status === 'done') {
                        setWorkerStatus(`Engine Synced.`);
                        setIsWorkerReady(true);
                        setTimeout(() => setWorkerStatus("Ready"), 500);
                    } else if (progress && progress.status === 'ready') {
                        setIsWorkerReady(true);
                        setWorkerStatus("Ready");
                    }
                } else if (status === 'complete') {
                    const resolve = pendingTasks.current.get(uid);
                    if (resolve) {
                        resolve(embedding);
                        pendingTasks.current.delete(uid);
                    }
                }
            });

            // Trigger background ML model preload immediately on mount!
            worker.current.postMessage({ action: 'load' });
        }

        return () => {
            if (worker.current) {
                worker.current.terminate();
                worker.current = null;
            }
        };
    }, []);

    const extractEmbedding = async (text: string): Promise<number[]> => {
        return new Promise((resolve) => {
            const uid = uidRef.current++;
            pendingTasks.current.set(uid, resolve);
            worker.current?.postMessage({ action: 'extract', uid, text });
        });
    };

    const generateMatch = async () => {
        setIsGenerating(true);
        setWorkerStatus("Parsing text heuristics...");

        // 1. Run literal TF-IDF matching first
        const { finalSkills, scoredExperiences } = advancedMatch(
            jobDescription,
            profile.technologies_possible,
            allPreloadedSkills,
            profile.experience_master
        );

        setWorkerStatus("Generating JD Embeddings...");

        // 2. Machine Learning: Embedding JD
        const jdEmbedding = await extractEmbedding(jobDescription);

        setWorkerStatus("Scoring Experiences Semantically...");

        // 3. Create Embeddings for Experiences and Merge Scores
        const semanticallyScored = await Promise.all(scoredExperiences.map(async (item: MatchScore) => {
            const expText = [
                item.experience.role,
                item.experience.description,
                ...item.experience.technologies,
                ...item.experience.achievements
            ].join(" ");

            const expEmbedding = await extractEmbedding(expText);
            const semanticScore = cosineSimilarity(jdEmbedding, expEmbedding);

            // Our similarity generally hovers around 0.10 to 1.0. 
            // We multiply by a massive constant to put semantic parity on the same level as TF hits
            // Example: 0.82 semantic * 50 = 41 bonus points for meaning exactly the same thing.
            const semanticBonus = semanticScore * 50;

            return {
                ...item,
                semanticSimilarity: semanticScore.toFixed(3),
                finalHybridScore: Math.round(item.score + semanticBonus)
            };
        }));

        // Sort by final Hybrid Score
        const topExperiences = semanticallyScored
            .sort((a, b) => b.finalHybridScore - a.finalHybridScore)
            .slice(0, 4)
            .map(item => ({
                ...item.experience,
                _matchAnalysis: `Hybrid Score: ${item.finalHybridScore} pts | TF: ${item.score} | Semantic: ${item.semanticSimilarity}. Hits: [${item.matchedKeywords.join(", ")}]`
            }));

        const resultPayload = {
            target_role: profile.target_positioning,
            keywords_detected: finalSkills,
            selected_skills: finalSkills,
            selected_experiences: topExperiences,
            education: profile.education,
            projects_selected: profile.project_bank,
            certifications: profile.certifications,
            optimization_notes: [
                `Scan: Matched ${finalSkills.length} total keywords from JD avoiding acronym mismatch.`,
                `Selected top ${topExperiences.length} experiences using Hybrid ML Scoring (TF-IDF + Cosine Similarity).`
            ]
        };

        setGeneratedJson(JSON.stringify(resultPayload, null, 2));
        setWorkerStatus("Ready");
        setIsGenerating(false);
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

                    <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginTop: "1rem", marginBottom: "1rem" }}>
                        <button
                            className={styles.btnPrimary}
                            onClick={generateMatch}
                            disabled={!jobDescription || isGenerating || !isWorkerReady}
                        >
                            {isGenerating ? "Analyzing..." : "Analyze & Match"}
                        </button>

                        <div style={{
                            padding: '0.4rem 0.8rem',
                            background: isWorkerReady ? 'var(--muted-paper)' : 'var(--accent-red)',
                            color: isWorkerReady ? 'var(--fg-pencil)' : '#fff',
                            border: '1px solid var(--border-pencil)',
                            borderRadius: 'var(--radius-wobbly)',
                            fontFamily: 'var(--font-patrick)',
                            fontSize: '0.9rem',
                            display: 'flex',
                            alignItems: 'center',
                            gap: '6px'
                        }}>
                            <span style={{
                                width: '8px',
                                height: '8px',
                                borderRadius: '50%',
                                background: isWorkerReady ? '#4ade80' : '#ffd700',
                                display: 'inline-block'
                            }}></span>
                            {workerStatus}
                        </div>
                    </div>

                    <p style={{ color: "var(--fg-pencil)", opacity: 0.8, fontSize: "0.9rem" }}>
                        The local engine will cross-reference the JD with your Master Profile experiences and skills using a mix of Term Frequency logic and Sentence-BERT Machine Learning semantic embeddings.
                    </p>
                </div>

                <div className={styles.rightPane}>
                    <div className={styles.formGroup} style={{ height: "100%" }}>
                        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "0.5rem" }}>
                            <label style={{ margin: 0 }}>Generated ATS Optimization JSON</label>
                            {generatedJson && (
                                <button
                                    className={styles.btnSm}
                                    onClick={() => {
                                        navigator.clipboard.writeText(generatedJson);
                                        const originalText = document.getElementById("copyBtn")?.innerText;
                                        if (document.getElementById("copyBtn")) {
                                            document.getElementById("copyBtn")!.innerText = "Copied!";
                                            setTimeout(() => {
                                                if (document.getElementById("copyBtn") && originalText) {
                                                    document.getElementById("copyBtn")!.innerText = "Copy JSON";
                                                }
                                            }, 2000);
                                        }
                                    }}
                                    id="copyBtn"
                                >
                                    Copy JSON
                                </button>
                            )}
                        </div>
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
