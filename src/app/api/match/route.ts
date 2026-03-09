import { createGroq } from "@ai-sdk/groq";
import { generateText } from "ai";
import { NextResponse } from "next/server";

// This is a stateless processing endpoint
export const maxDuration = 60; // Allow sufficient LLM reasoning time

export async function POST(req: Request) {
    try {
        const { jobDescription, userProfile } = await req.json();

        if (!jobDescription || !userProfile) {
            return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
        }

        const groq = createGroq({
            apiKey: process.env.GROQ_API_KEY,
        });

        // We use Llama 3 70B via Groq using normal text generation requesting JSON to bypass strict schema limits
        const { text } = await generateText({
            model: groq("llama-3.3-70b-versatile"),
            system: `You are an expert ATS Resume Optimization Engine.
You have been provided with a Candidate's complete Master Profile and a target Job Description.
Your goal is to output a strictly formatted JSON ATS resume payload that highlights exactly how the candidate's history fits the job requirements.

Core Directives:
1. ADDITIVE MATCHER: Do NOT delete the user's primary history. Always include all their education, projects, certifications, and core technologies. Do NOT just slice out 4 experiences randomly if they had 10.
2. RELEVANCE RANKING: You must reorder their experiences, putting the ones most highly matched to the core technologies of the Job Description at the top.
3. KEYWORDS: Read the job description carefully. Any specific tools, metrics, or frameworks mentioned must be explicitly tagged if the developer knows them.
4. SYNTHESIS: Return exactly the JSON object requested. Let 'selected_skills' be a deduplicated list of their native skills + the JD keywords they match.

YOU MUST RETURN A VALID JSON DICTIONARY ONLY. DO NOT WRAP WITH \`\`\`json \`\`\`. Start exactly with { and end exactly with }.

The geometry of the JSON must perfectly match:
{
  "target_role": "string",
  "professional_summary": "string",
  "keywords_detected": ["string"],
  "selected_skills": ["string"],
  "selected_experiences": [{ "company": "string", "role": "string", "start_date": "string", "end_date": "string", "description": "string", "technologies": ["string"], "achievements": ["string"] }],
  "education": [],
  "projects_selected": [],
  "certifications": [],
  "optimization_notes": ["string"]
}`,
            prompt: `Job Description to Analyze: \n${jobDescription}\n\nCandidate Master Profile: \n${JSON.stringify(userProfile, null, 2)}`
        });

        // The AI SDK text contains raw json now, let's parse it
        const parsedPayload = JSON.parse(text);

        return NextResponse.json({
            payload: parsedPayload,
        });

    } catch (error: any) {
        console.error("Match Engine API Error:", error.message);
        return NextResponse.json({ error: "Internal Server Error executing match." }, { status: 500 });
    }
}
