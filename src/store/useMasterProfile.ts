import { create } from "zustand";
import { persist } from "zustand/middleware";
import { MasterProfile } from "../models/masterProfile";

const initialProfile: MasterProfile = {
    name: "Gabriel Rodrigues",
    location: "João Pessoa, Paraíba, Brazil",
    email: "gabbcodes@gmail.com",
    linkedin: "https://www.linkedin.com/in/gabbr",
    github: "https://github.com/CallmeShini",
    behance: "https://www.behance.net/kurtzco",
    target_positioning: "Software Engineer focused on AI & LLM Systems, Systems Programming, Computer Vision and Robotics",
    professional_summary_base: "Computer engineer and software developer focused on AI systems, low-level programming and intelligent automation. Experience building software pipelines combining machine learning, computer vision and real-time systems. Background includes cybersecurity, systems programming and experimental work with RGB-D cameras and robotics. Interested in intelligent systems involving perception, automation and autonomous decision-making.",
    core_domains: [
        "Software Engineering",
        "AI Systems",
        "LLM Systems",
        "Autonomous Agents",
        "Systems Programming",
        "Low-Level Development",
        "Computer Vision",
        "Robotics",
        "Cybersecurity",
        "Automation"
    ],
    languages_programming: [
        "C", "C++", "Python", "Lua", "JavaScript", "TypeScript", "Swift"
    ],
    technologies_possible: [
        "OpenCV", "PyTorch", "Git", "Linux", "REST APIs", "Node.js", "Docker", "Unity", "Unreal Engine"
    ],
    human_languages: [
        "Portuguese", "English", "Spanish", "Russian"
    ],
    certifications: [
        "Certified Ethical Hacker",
        "PEN-200",
        "Adobe Master Certification",
        "CyberOps Associate",
        "CS50: Introduction to Computer Science"
    ],
    education: [
        {
            institution: "Universidade Cruzeiro do Sul",
            degree: "Bachelor's Degree in Computer Science",
            period: "2020 - 2024"
        },
        {
            institution: "Harvard University",
            degree: "Computer Science Program",
            period: "2021 - 2023"
        },
        {
            institution: "Cisco Networking Academy",
            degree: "Cybersecurity",
            period: "2021"
        }
    ],
    experience_master: [
        {
            company: "Flama Studio",
            role: "Technical Systems Engineer",
            start_date: "Jan 2025",
            end_date: "Present",
            description: "Worked on technical infrastructures for immersive environments, interactive systems and real-time media workflows.",
            technologies: ["Hardware Integration", "Media Pipelines", "Automation"],
            achievements: [
                "Designed and implemented real-time visual and media pipelines used in immersive environments.",
                "Integrated hardware systems including cameras, lighting and media infrastructure with software-driven workflows.",
                "Developed automation processes to improve operational efficiency and system reliability."
            ]
        },
        {
            company: "Metaversoexp / Grupo Flama",
            role: "Senior Technical Director",
            start_date: "Jan 2024",
            end_date: "Dec 2024",
            description: "Led technical systems development for esports productions and immersive interactive environments.",
            technologies: ["Real-time Systems", "Esports Logistics", "Live Media Processing"],
            achievements: [
                "Architected real-time visual and media systems for large-scale productions.",
                "Designed workflows for capture, synchronization and real-time media processing.",
                "Coordinated multidisciplinary technical teams across software, media engineering and production systems."
            ]
        },
        {
            company: "CredutPay",
            role: "Software Engineer",
            start_date: "2024",
            end_date: "2024",
            description: "Worked on internal tools and workflow automation supporting digital operations and system integration.",
            technologies: ["Node.js", "Python", "Process Automation"],
            achievements: [
                "Developed internal automation tools to streamline content and operational workflows.",
                "Implemented software-driven pipelines for digital processing and publishing tasks.",
                "Improved scalability and repeatability through process standardization and automation."
            ]
        }
    ],
    project_bank: [
        {
            name: "AI Agent Experiments",
            tags: ["AI", "LLM", "Agents", "Automation"]
        },
        {
            name: "Computer Vision Tracking Systems",
            tags: ["Computer Vision", "Tracking", "OpenCV", "Perception"]
        },
        {
            name: "Low-Level Programming Experiments",
            tags: ["C", "Systems Programming", "Memory", "Performance"]
        },
        {
            name: "Automation Tools and AI Workflows",
            tags: ["Automation", "AI Workflows", "Tooling", "Integration"]
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
        }
    )
);
