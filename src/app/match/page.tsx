"use client";

import { useState } from "react";
import Link from "next/link";
import { useMasterProfile } from "../../store/useMasterProfile";
import styles from "../generate/page.module.css";
import profileStyles from "../profile/page.module.css";

export default function MatchPage() {
    const { profile } = useMasterProfile();
    const [jobDescription, setJobDescription] = useState("");
    const [generatedJson, setGeneratedJson] = useState("");
    const [isGenerating, setIsGenerating] = useState(false);
    const [workerStatus, setWorkerStatus] = useState<string>("Ready");

    const generateMatch = async () => {
        setIsGenerating(true);
        setWorkerStatus("Connecting to Cloud Engine...");

        try {
            const response = await fetch('/api/match', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    jobDescription,
                    userProfile: profile
                })
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.error || `HTTP ${response.status}`);
            }

            setWorkerStatus("Constructing JSON Payload...");
            const data = await response.json();

            // The API returns the strictly typed Zod object as 'payload'
            setGeneratedJson(JSON.stringify(data.payload, null, 2));
            setWorkerStatus("Sync Complete.");

        } catch (err: any) {
            console.error("Match error:", err);
            setWorkerStatus(`Engine Error: ${err.message}`);
            setGeneratedJson(JSON.stringify({ error: err.message }, null, 2));
        } finally {
            setIsGenerating(false);
            setTimeout(() => setWorkerStatus("Ready"), 3000);
        }
    };

    return (
        <div className={styles.container}>
            <header className={styles.header}>
                <h1 className={styles.title}>Cloud Matcher Engine</h1>
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
                            disabled={!jobDescription || isGenerating}
                        >
                            {isGenerating ? "Analyzing..." : "Analyze & Match"}
                        </button>

                        <div style={{
                            padding: '0.4rem 0.8rem',
                            background: 'transparent',
                            color: 'var(--foreground)',
                            border: '1px solid var(--border)',
                            fontFamily: 'var(--font-mono)',
                            fontSize: '0.75rem',
                            display: 'flex',
                            alignItems: 'center',
                            gap: '6px',
                            textTransform: 'uppercase'
                        }}>
                            <span style={{
                                width: '8px',
                                height: '8px',
                                background: isGenerating ? 'var(--foreground)' : 'var(--muted-foreground)',
                                display: 'inline-block'
                            }}></span>
                            {workerStatus}
                        </div>
                    </div>

                    <p style={{ color: "var(--muted-foreground)", fontSize: "0.875rem", fontFamily: "var(--font-body)", lineHeight: 1.5 }}>
                        The Serverless engine will securely analyze the JD, cross-reference it statelessly with your localStorage profile, and map the outputs into our strict V1 ATS schema format.
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
                                <p style={{ color: "var(--muted-foreground)", textAlign: "center", marginTop: "40%", fontFamily: 'var(--font-body)' }}>
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
