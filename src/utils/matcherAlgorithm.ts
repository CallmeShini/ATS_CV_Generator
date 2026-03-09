import { Experience } from "../models/masterProfile";

export interface MatchScore {
    experience: Experience;
    score: number;
    matchedKeywords: string[];
}

// 1. Synonyms Dictionary (Hardcoded ATS mappings)
const SYNONYMS: Record<string, string[]> = {
    "react": ["react", "react.js", "reactjs", "react js"],
    "node.js": ["node", "node.js", "nodejs", "node js"],
    "next.js": ["next", "next.js", "nextjs", "next js"],
    "vue": ["vue", "vue.js", "vuejs"],
    "aws": ["aws", "amazon web services", "amazon cloud"],
    "gcp": ["gcp", "google cloud platform", "google cloud"],
    "k8s": ["k8s", "kubernetes"],
    "ts": ["ts", "typescript"],
    "js": ["js", "javascript"],
    "c#": ["c#", "csharp", "c sharp"],
    "c++": ["c++", "cpp", "c plus plus"],
    "ui/ux": ["ui/ux", "ux/ui", "user interface", "user experience"],
    "qa": ["qa", "quality assurance"],
    "ml": ["ml", "machine learning"],
    "ai": ["ai", "artificial intelligence"],
    "llm": ["llm", "large language model", "llms"],
    "nlp": ["nlp", "natural language processing"],
};

/**
 * Normalizes a skill string by checking against the synonym dictionary.
 * It maps all known variations to their primary key (e.g., "ReactJS" -> "react")
 * If not found in dictionary, returns the original word in lower case.
 */
function normalizeSkill(skill: string): string {
    const sLower = skill.toLowerCase().trim();
    for (const [primary, variations] of Object.entries(SYNONYMS)) {
        if (variations.includes(sLower)) {
            return primary;
        }
    }
    return sLower;
}

/**
 * Advanced Matching Algorithm.
 * 1. Counts how many times a skill appears in the Job Description (Term Frequency).
 * 2. Checks synonyms for those skills to guarantee a hit.
 * 3. Scores User Experiences by multiplying the TF weights. 
 */
export function advancedMatch(
    jobDescription: string,
    userSkills: string[],
    preloadedSkills: string[],
    experiences: Experience[]
): {
    finalSkills: string[],
    scoredExperiences: MatchScore[]
} {
    const jdLower = jobDescription.toLowerCase();
    const TF_WEIGHTS: Record<string, number> = {};
    const detectedKeywords = new Set<string>();

    const allPotentialSkills = Array.from(new Set([...userSkills, ...preloadedSkills]));

    // Step 1: Term Frequency Calculation (How many times did the skill appear?)
    allPotentialSkills.forEach(skill => {
        const normalized = normalizeSkill(skill);
        // Get all variations to check in the JD
        const variations = SYNONYMS[normalized] || [normalized];

        let count = 0;
        variations.forEach(variation => {
            // Count occurrences using split
            // Escape special chars like C++ for regex
            const safeVar = variation.replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&');
            // Using a simple split approach to count occurrences roughly word-bounded
            const regex = new RegExp(`\\b${safeVar}\\b`, 'gi');
            const matches = jdLower.match(regex);
            if (matches) {
                count += matches.length;
            }
        });

        if (count > 0) {
            TF_WEIGHTS[normalized] = count;
            detectedKeywords.add(skill); // Return the original formatted skill to the user
        }
    });

    const finalSkillsList = Array.from(detectedKeywords);

    // Step 2: Score Experiences using TF weights + Exact Match Multipliers
    const scoredExperiences: MatchScore[] = experiences.map(exp => {
        let score = 0;
        const matchedInExp = new Set<string>();

        const expTextStr = [
            exp.role,
            exp.description,
            ...exp.technologies,
            ...exp.achievements
        ].join(" ").toLowerCase();

        finalSkillsList.forEach(rawSkill => {
            const normalized = normalizeSkill(rawSkill);
            const variations = SYNONYMS[normalized] || [normalized];
            const weight = TF_WEIGHTS[normalized] || 1;

            // Base increment for simply having the required skill in the experience block
            let hasSkill = false;

            variations.forEach(v => {
                if (expTextStr.includes(v)) {
                    hasSkill = true;
                }
            });

            if (hasSkill) {
                // Multiply presence by the Term Frequency from the JD.
                // If JD mentions AWS 5 times, an experience that has AWS gets 5 * 2 = 10 pts.
                score += (weight * 2);
                matchedInExp.add(rawSkill);
            }
        });

        // Boost if the Job Role strictly matches strings in the JD (Title overlap)
        if (jdLower.includes(exp.role.toLowerCase())) {
            score += 15; // Massive boost for title match
        }

        return {
            experience: exp,
            score: score,
            matchedKeywords: Array.from(matchedInExp)
        };
    });

    return {
        finalSkills: finalSkillsList,
        scoredExperiences: scoredExperiences
    };
}
