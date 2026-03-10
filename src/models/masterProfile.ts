import { z } from "zod";

export const EducationSchema = z.object({
    institution: z.string(),
    degree: z.string(),
    period: z.string(),
});

export const ExperienceSchema = z.object({
    company: z.string(),
    role: z.string(),
    start_date: z.string(),
    end_date: z.string(),
    description: z.string(),
    technologies: z.array(z.string()),
    achievements: z.array(z.string()),
});

export const ProjectSchema = z.object({
    name: z.string(),
    tags: z.array(z.string()),
});

export const MasterProfileSchema = z.object({
    name: z.string(),
    location: z.string(),
    email: z.string(),
    linkedin: z.string().url(),
    github: z.string().url(),
    behance: z.string().url().optional(),
    target_positioning: z.string(),
    professional_summary_base: z.string(),
    core_domains: z.array(z.string()),
    languages_programming: z.array(z.string()),
    technologies_possible: z.array(z.string()),
    human_languages: z.array(z.string()),
    certifications: z.array(z.string()),
    education: z.array(EducationSchema),
    experience_master: z.array(ExperienceSchema),
    project_bank: z.array(ProjectSchema),
});

export type Education = z.infer<typeof EducationSchema>;
export type Experience = z.infer<typeof ExperienceSchema>;
export type Project = z.infer<typeof ProjectSchema>;
export type MasterProfile = z.infer<typeof MasterProfileSchema>;
