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
            title: "Technical Systems Engineer",
            company: "Flama Studio",
            period: "2025",
            location: "Brazil",
            base_description: "Worked on technical infrastructures for immersive environments, interactive systems and real-time media workflows.",
            bullet_bank: [
                "Designed and implemented real-time visual and media pipelines used in immersive environments.",
                "Integrated hardware systems including cameras, lighting and media infrastructure with software-driven workflows.",
                "Developed automation processes to improve operational efficiency and system reliability.",
                "Supported system-level integration across software, visual systems and interactive technologies."
            ]
        },
        {
            title: "Senior Technical Director - Interactive Systems",
            company: "Metaversoexp / Grupo Flama",
            period: "2024 - 2025",
            location: "Brazil",
            base_description: "Led technical systems development for esports productions and immersive interactive environments.",
            bullet_bank: [
                "Architected real-time visual and media systems for large-scale productions.",
                "Designed workflows for capture, synchronization and real-time media processing.",
                "Integrated software systems with audiovisual hardware and stage infrastructure.",
                "Coordinated multidisciplinary technical teams across software, media engineering and production systems."
            ]
        },
        {
            title: "Software Engineer - Automation & Digital Systems",
            company: "CredutPay",
            period: "2025",
            location: "Brazil",
            base_description: "Worked on internal tools and workflow automation supporting digital operations and system integration.",
            bullet_bank: [
                "Developed internal automation tools to streamline content and operational workflows.",
                "Implemented software-driven pipelines for digital processing and publishing tasks.",
                "Built integrations between internal systems, analytics tools and digital platforms.",
                "Improved scalability and repeatability through process standardization and automation."
            ]
        },
        {
            title: "Researcher - Computer Vision & Autonomous Cinematography",
            company: "UNIPÊ",
            period: "2024 - 2025",
            location: "Brazil",
            base_description: "Research project exploring autonomous cinematography with robotic arms and RGB-D cameras.",
            bullet_bank: [
                "Prototyped autonomous camera systems using robotic manipulators and RGB-D sensors.",
                "Explored computer vision approaches for tracking, framing and automated capture.",
                "Studied real-time perception pipelines applied to robotic camera motion.",
                "Contributed technical insights to experimental research on automated cinematographic systems."
            ]
        },
        {
            title: "Game Developer - FiveM (Maps, Assets & Scripting)",
            company: "CFX.re",
            period: "2022 - 2023",
            location: "Brazil",
            base_description: "Developed gameplay systems, environments and technical content for custom GTA V servers.",
            bullet_bank: [
                "Built custom maps, environments and technical assets for multiplayer gameplay.",
                "Implemented gameplay mechanics and interactions using Lua scripting.",
                "Optimized systems and assets for performance, stability and player experience.",
                "Supported custom server identities through technical and gameplay-focused development."
            ]
        },
        {
            title: "Information Security Consultant - Red Team",
            company: "PBSoft",
            period: "2021 - 2022",
            location: "Brazil",
            base_description: "Performed security testing and vulnerability assessment for enterprise systems.",
            bullet_bank: [
                "Conducted vulnerability assessments using OWASP-aligned methodologies.",
                "Executed simulated attack scenarios and penetration testing activities.",
                "Worked with tools such as Burp Suite, Metasploit and OWASP ZAP.",
                "Produced technical findings to support remediation and security hardening."
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
