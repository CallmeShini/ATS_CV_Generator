"use client";

import { useState } from "react";
import Link from "next/link";
import { useMasterProfile } from "../../store/useMasterProfile";
import styles from "./page.module.css";
import ResumePreview from "../../components/ResumeTemplate/ResumePreview"; // We will build this

export default function GeneratePage() {
    const { profile } = useMasterProfile();

    const [jsonInput, setJsonInput] = useState("");
    const [isGenerating, setIsGenerating] = useState(false);
    const [generatedData, setGeneratedData] = useState<any>(null);
    const [error, setError] = useState<string | null>(null);
    const [viewMode, setViewMode] = useState<"preview" | "json">("preview");

    const handleGenerate = () => {
        setIsGenerating(true);
        setError(null);
        setGeneratedData(null);

        try {
            const data = JSON.parse(jsonInput);
            setGeneratedData(data);
        } catch (err: any) {
            setError("Invalid JSON format. Please ensure the input is valid JSON.");
        } finally {
            setIsGenerating(false);
        }
    };

    return (
        <div className={styles.container}>
            <header className={styles.header}>
                <h1 className={styles.title}>Tailor Resume (Manual JSON Mode)</h1>
                <Link href="/" className="btn" style={{ padding: "0.5rem 1rem", border: "1px solid var(--border)", borderRadius: "6px" }}>← Back</Link>
            </header>

            <div className={styles.splitView}>
                <div className={styles.leftPane}>
                    <h2>Generate via JSON</h2>
                    <p style={{ color: "var(--text-muted)", fontSize: "0.9rem", marginBottom: "1rem" }}>
                        Paste the previously generated or manually tailored JSON object here. This skips the AI API call.
                    </p>
                    <div className={styles.formGroup}>
                        <label>JSON Input</label>
                        <textarea
                            className={styles.textarea}
                            placeholder="Paste JSON here..."
                            value={jsonInput}
                            onChange={e => setJsonInput(e.target.value)}
                        />
                    </div>
                    <button
                        className={styles.btnPrimary}
                        onClick={handleGenerate}
                        disabled={isGenerating || !jsonInput.trim()}
                    >
                        Render Resume
                    </button>

                    {error && <p style={{ color: "red", marginTop: "1rem" }}>{error}</p>}
                </div>

                <div className={styles.rightPane}>
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                        <h2>Result Preview</h2>
                        {generatedData && (
                            <div>
                                <button
                                    onClick={() => setViewMode("preview")}
                                    style={{ marginRight: "0.5rem", fontWeight: viewMode === "preview" ? "bold" : "normal" }}
                                >
                                    Document
                                </button>
                                <button
                                    onClick={() => setViewMode("json")}
                                    style={{ fontWeight: viewMode === "json" ? "bold" : "normal" }}
                                >
                                    Raw JSON / Diff
                                </button>
                            </div>
                        )}
                    </div>
                    <div className={styles.previewContainer}>
                        {isGenerating ? (
                            <p>Loading...</p>
                        ) : generatedData ? (
                            viewMode === "preview" ? (
                                <ResumePreview data={generatedData} masterData={profile} />
                            ) : (
                                <pre className={styles.pre}>{JSON.stringify(generatedData, null, 2)}</pre>
                            )
                        ) : (
                            <p style={{ color: "var(--text-muted)" }}>Paste the tailored JSON and render to preview.</p>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}
