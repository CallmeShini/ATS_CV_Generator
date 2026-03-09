import { google } from "@ai-sdk/google";
import { generateObject } from "ai";
import { z } from "zod";
import { NextResponse } from "next/server";
import { MasterProfileSchema } from "@/models/masterProfile";

// This is a stateless processing endpoint
export const maxDuration = 60; // Allow sufficient LLM reasoning time

export async function POST(req: Request) {
    try {
        const { jobDescription, userProfile } = await req.json();

        if (!jobDescription || !userProfile) {
            return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
        }

        // We use gemini-2.5-flash as the default model. Fast, structured, inexpensive.
        const { object } = await generateObject({
            model: google("gemini-2.5-flash"),
            system: `You are an expert ATS Resume Optimization Engine.
You have been provided with a Candidate's complete Master Profile and a target Job Description.
Your goal is to output a strictly formatted JSON ATS resume payload that highlights exactly how the candidate's history fits the job requirements.

Core Directives:
1. ADDITIVE MATCHER: Do NOT delete the user's primary history. Always include all their education, projects, certifications, and core technologies. Do NOT just slice out 4 experiences randomly if they had 10.
2. RELEVANCE RANKING: You must reorder their experiences, putting the ones most highly matched to the core technologies of the Job Description at the top.
3. KEYWORDS: Read the job description carefully. Any specific tools, metrics, or frameworks mentioned must be explicitly tagged if the developer knows them.
4. SYNTHESIS: Return exactly the JSON object requested by the provided schema geometry. Let 'selected_skills' be a deduplicated list of their native skills + the JD keywords they match.`,
            prompt: `Job Description to Analyze: \n${jobDescription}\n\nCandidate Master Profile: \n${JSON.stringify(userProfile, null, 2)}`,
            schema: z.object({
                target_role: z.string().describe("The primary semantic role detected in the JD, e.g., Senior Frontend Engineer"),
                professional_summary: z.string().describe("An impactful 3-to-4 sentence summary of the candidate merged with the job's context."),
                keywords_detected: z.array(z.string()).describe("A list of explicit keywords you identified in the JD."),
                selected_skills: z.array(z.string()).describe("The finalized sorted list of tech skills to present, merging user skills with the JD hits."),
                selected_experiences: z.array(z.object({
                    company: z.string(),
                    role: z.string(),
                    start_date: z.string(),
                    end_date: z.string(),
                    description: z.string(),
                    technologies: z.array(z.string()),
                    achievements: z.array(z.string())
                })).describe("The candidate's jobs, ranked by semantic relevance to the JD."),
                education: z.any().describe("Pass through the exact array from the user's master profile."),
                projects_selected: z.any().describe("Pass through the exact array from the user's master profile."),
                certifications: z.any().describe("Pass through the exact array from the user's master profile."),
                optimization_notes: z.array(z.string()).describe("Return 2 notes explaining why you matched what you did.")
            })
        });

        // The AI SDK `object` contains the raw parsed data based exactly on the Zod schema provided above.
        return NextResponse.json({
            payload: object,
        });

    } catch (error: any) {
        console.error("Match Engine API Error:", error.message);
        return NextResponse.json({ error: "Internal Server Error executing match." }, { status: 500 });
    }
}
