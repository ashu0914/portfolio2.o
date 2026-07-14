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
        background: "#0a0a0f",
        surface: "#12121a",
        "surface-light": "#1a1a2e",
        accent: "#60a5fa",
        "accent-purple": "#a78bfa",
        "accent-cyan": "#22d3ee",
        "text-primary": "#ffffff",
        "text-muted": "#a0a0b0",
        "text-subtle": "#6b6b80",
        "glass-bg": "rgba(255, 255, 255, 0.03)",
        "glass-border": "rgba(255, 255, 255, 0.08)",
        "glass-hover": "rgba(255, 255, 255, 0.06)",
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
        glow: "0 0 20px rgba(96, 165, 250, 0.15)",
        "glow-lg": "0 0 40px rgba(96, 165, 250, 0.2)",
        "glow-purple": "0 0 20px rgba(167, 139, 250, 0.15)",
        "glow-cyan": "0 0 20px rgba(34, 211, 238, 0.15)",
        glass: "0 8px 32px rgba(0, 0, 0, 0.3)",
      },
      animation: {
        "float": "float 6s ease-in-out infinite",
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
          "0%, 100%": { opacity: "0.4" },
          "50%": { opacity: "1" },
        },
        gradientShift: {
          "0%, 100%": { backgroundPosition: "0% 50%" },
          "50%": { backgroundPosition: "100% 50%" },
        },
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic": "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
        "glass-gradient": "linear-gradient(135deg, rgba(255,255,255,0.05) 0%, rgba(255,255,255,0.01) 100%)",
      },
    },
  },
  plugins: [],
};

export default config;
