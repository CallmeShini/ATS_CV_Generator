import { create } from "zustand";
import { persist, createJSONStorage, StateStorage } from "zustand/middleware";
import { MasterProfile } from "../models/masterProfile";
import CryptoJS from "crypto-js";

// Add AES Encryption to local storage to prevent XSS sniffing
const ENCRYPTION_KEY = process.env.NEXT_PUBLIC_STORAGE_SECRET || "fallback-curriculo-secret-key-999";

const encryptedStorage: StateStorage = {
    getItem: (name: string) => {
        const str = localStorage.getItem(name);
        if (!str) return null;
        try {
            const bytes = CryptoJS.AES.decrypt(str, ENCRYPTION_KEY);
            const decrypted = bytes.toString(CryptoJS.enc.Utf8);
            return decrypted || null;
        } catch {
            return null;
        }
    },
    setItem: (name: string, value: string) => {
        const encrypted = CryptoJS.AES.encrypt(value, ENCRYPTION_KEY).toString();
        localStorage.setItem(name, encrypted);
    },
    removeItem: (name: string) => localStorage.removeItem(name),
};

const initialProfile: MasterProfile = {
    name: "John Doe",
    location: "City, State, Country",
    email: "johndoe@email.com",
    linkedin: "https://www.linkedin.com/in/johndoe",
    github: "https://github.com/johndoe",
    behance: "",
    target_positioning: "Software Engineer",
    professional_summary_base: "Detailed professional summary describing experiences, core technical skills, and career objectives.",
    core_domains: [
        "Software Engineering",
        "Frontend Development",
        "Backend Development"
    ],
    languages_programming: [
        "JavaScript", "TypeScript", "Python"
    ],
    technologies_possible: [
        "React", "Next.js", "Node.js", "Git"
    ],
    human_languages: [
        "English", "Spanish"
    ],
    certifications: [
        "AWS Certified Developer",
        "CS50"
    ],
    awards: [
        "1st Place Hackathon 2023"
    ],
    education: [
        {
            institution: "University Name",
            degree: "Bachelor's Degree in Computer Science",
            period: "2020 - 2024"
        }
    ],
    experience_master: [
        {
            company: "Tech Company",
            role: "Software Engineer",
            start_date: "Jan 2024",
            end_date: "Present",
            description: "Developed and maintained scaleable web applications.",
            technologies: ["React", "Node.js", "AWS"],
            achievements: [
                "Improved system performance by 30% through caching.",
                "Led the migration of legacy systems to modern architecture."
            ]
        },
        {
            company: "Agency Corp",
            role: "Junior Developer",
            start_date: "Jan 2023",
            end_date: "Dec 2023",
            description: "Supported the development of client-facing interfaces.",
            technologies: ["JavaScript", "HTML", "CSS"],
            achievements: [
                "Delivered 5+ web projects within tight deadlines.",
                "Implemented responsive design for mobile-first experiences."
            ]
        }
    ],
    project_bank: [
        {
            name: "E-commerce Platform",
            tags: ["React", "Stripe", "Next.js"]
        },
        {
            name: "Portfolio Website",
            tags: ["TailwindCSS", "UI/UX", "Vercel"]
        }
    ]
};

interface MasterProfileState {
    profile: MasterProfile;
    setProfile: (profile: Partial<MasterProfile>) => void;
    resetProfile: () => void;
}

export const useMasterProfile = create<MasterProfileState>()(
    persist(
        (set) => ({
            profile: initialProfile,
            setProfile: (updatedFields) =>
                set((state) => ({
                    profile: { ...state.profile, ...updatedFields },
                })),
            resetProfile: () => set({ profile: initialProfile }),
        }),
        {
            name: "master-profile-storage",
            storage: createJSONStorage(() => encryptedStorage),
        }
    )
);
