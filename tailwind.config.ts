import type { Config } from "tailwindcss";

const config: Config = {
    content: [
        "./src/**/*.{js,ts,jsx,tsx,mdx}",
    ],
    theme: {
        extend: {
            colors: {
                "neo-bg": "#FFFDF5",
                "neo-fg": "#000000",
                "neo-accent": "#FF6B6B",
                "neo-secondary": "#FFD93D",
                "neo-muted": "#C4B5FD",
            },
            fontFamily: {
                sans: ['"Space Grotesk"', 'sans-serif'],
            },
            keyframes: {
                'spin-slow': {
                    '0%': { transform: 'rotate(0deg)' },
                    '100%': { transform: 'rotate(360deg)' },
                }
            },
            animation: {
                'spin-slow': 'spin-slow 10s linear infinite',
            }
        },
    },
    plugins: [],
};

export default config;
