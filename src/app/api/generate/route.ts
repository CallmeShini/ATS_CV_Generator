import { GoogleGenAI, Type, Schema } from "@google/genai";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
    try {
        const apiKey = process.env.GEMINI_API_KEY;
        if (!apiKey) {
            return NextResponse.json({ error: "GEMINI_API_KEY is not set" }, { status: 500 });
        }

        const ai = new GoogleGenAI({ apiKey });
        const { jobDescription, targetRole, targetCompany, masterProfile } = await req.json();

        const systemInstruction = `You are a Senior Software Engineer specializing in ATS resume personalization. 
Your task is to read the user's Master Profile and a target Job Description, and output a tailored resume in strict JSON format.

CRITICAL RULES:
1. TRUTHFULNESS: The Master Profile is your absolute source of truth. DO NOT invent experiences, metrics, technologies, tools, degrees, or certifications that are not explicitly stated in the Master Profile.
2. NO HALLUCINATION: You cannot claim "production experience" if the profile mentions "academic exposure".
3. ADAPTATION: Adapt the headline, professional summary, and rank the existing skills/bullets to align with the job description keywords and seniority.
4. REWRITING BULLETS: You may minimally rewrite the selected bullets from the "bullet_bank" to better highlight the intersection with the job description, but the core fact/achievement MUST remain identical.
5. DOMAIN RULES:
   - If AI/ML focused, prioritize AI Systems, LLM, Python, etc.
   - If CV focused, prioritize RGB-D, robotics, OpenCV, tracking, etc.
   - If Systems focused, prioritize C, C++, performance, infrastructure, etc.
   - If Game-tech focused, prioritize FiveM, Lua, real-time systems, etc.
   - If Cybersec focused, elevate red team and security certifications.`;

        const prompt = `
TARGET JOB DETAILS:
Role: ${targetRole || "Based on JD"}
Company: ${targetCompany || "Unknown"}
Job Description: 
${jobDescription}

===

USER MASTER PROFILE:
${JSON.stringify(masterProfile, null, 2)}

===
Generate the perfectly matched, ATS-optimized JSON resume.
`;

        const outputSchema: Schema = {
            type: Type.OBJECT,
            properties: {
                target_role: { type: Type.STRING },
                target_company: { type: Type.STRING },
                job_keywords: { type: Type.ARRAY, items: { type: Type.STRING } },
                headline: { type: Type.STRING },
                summary: { type: Type.STRING },
                skills_ranked: { type: Type.ARRAY, items: { type: Type.STRING } },
                experience_selected: {
                    type: Type.ARRAY,
                    items: {
                        type: Type.OBJECT,
                        properties: {
                            company: { type: Type.STRING },
                            title: { type: Type.STRING },
                            period: { type: Type.STRING },
                            location: { type: Type.STRING },
                            bullets: { type: Type.ARRAY, items: { type: Type.STRING } }
                        },
                        required: ["company", "title", "period", "location", "bullets"]
                    }
                },
                projects_selected: {
                    type: Type.ARRAY,
                    items: {
                        type: Type.OBJECT,
                        properties: {
                            name: { type: Type.STRING },
                            relevance_reason: { type: Type.STRING },
                            tags: { type: Type.ARRAY, items: { type: Type.STRING } }
                        },
                        required: ["name", "relevance_reason", "tags"]
                    }
                },
                education: {
                    type: Type.ARRAY,
                    items: {
                        type: Type.OBJECT,
                        properties: {
                            institution: { type: Type.STRING },
                            degree: { type: Type.STRING },
                            period: { type: Type.STRING }
                        },
                        required: ["institution", "degree", "period"]
                    }
                },
                certifications: { type: Type.ARRAY, items: { type: Type.STRING } }
            },
            required: [
                "target_role", "target_company", "job_keywords", "headline",
                "summary", "skills_ranked", "experience_selected",
                "projects_selected", "education", "certifications"
            ]
        };

        const response = await ai.models.generateContent({
            model: "gemini-2.5-pro",
            contents: prompt,
            config: {
                systemInstruction: systemInstruction,
                responseMimeType: "application/json",
                responseSchema: outputSchema,
                temperature: 0.2, // Low temperature for high factual consistency
            }
        });

        const resultText = response.text;
        if (!resultText) {
            throw new Error("No response returned from Gemini.");
        }

        const payload = JSON.parse(resultText);
        return NextResponse.json(payload);

    } catch (error: any) {
        console.error("Error generating resume:", error);
        return NextResponse.json({ error: error.message || "Failed to generate resume" }, { status: 500 });
    }
}
