import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "#fafaf9",
        surface: "#ffffff",
        "surface-alt": "#f5f5f4",
        border: "#e7e5e4",
        accent: "#6366f1",
        "accent-hover": "#4f46e5",
        "accent-purple": "#8b5cf6",
        "accent-cyan": "#06b6d4",
        "text-primary": "#1c1917",
        "text-secondary": "#44403c",
        "text-muted": "#78716c",
        "glass-bg": "rgba(255, 255, 255, 0.8)",
        "glass-border": "rgba(214, 211, 209, 0.6)",
        "glass-hover": "rgba(255, 255, 255, 0.92)",
      },
      fontFamily: {
        display: ["var(--font-space-grotesk)", "sans-serif"],
        body: ["var(--font-inter)", "sans-serif"],
        mono: ["var(--font-jetbrains)", "monospace"],
      },
      borderRadius: {
        "2xl": "16px",
        "3xl": "24px",
      },
      backdropBlur: {
        glass: "20px",
      },
      boxShadow: {
        glow: "0 4px 20px rgba(99, 102, 241, 0.12)",
        "glow-lg": "0 4px 40px rgba(99, 102, 241, 0.18)",
        "glow-purple": "0 4px 20px rgba(139, 92, 246, 0.12)",
        "glow-cyan": "0 4px 20px rgba(6, 182, 212, 0.12)",
        glass: "0 8px 32px rgba(0, 0, 0, 0.06)",
        "soft": "0 2px 15px rgba(0, 0, 0, 0.04)",
        "soft-lg": "0 4px 25px rgba(0, 0, 0, 0.08)",
      },
      animation: {
        float: "float 6s ease-in-out infinite",
        "float-slow": "float 8s ease-in-out infinite",
        "float-slower": "float 10s ease-in-out infinite",
        "pulse-glow": "pulseGlow 4s ease-in-out infinite",
        "gradient-shift": "gradientShift 8s ease-in-out infinite",
        "spin-slow": "spin 20s linear infinite",
      },
      keyframes: {
        float: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-20px)" },
        },
        pulseGlow: {
          "0%, 100%": { opacity: "0.3" },
          "50%": { opacity: "0.6" },
        },
        gradientShift: {
          "0%, 100%": { backgroundPosition: "0% 50%" },
          "50%": { backgroundPosition: "100% 50%" },
        },
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic": "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
        "glass-gradient": "linear-gradient(135deg, rgba(255,255,255,0.9) 0%, rgba(255,255,255,0.7) 100%)",
      },
    },
  },
  plugins: [],
};

export default config;
