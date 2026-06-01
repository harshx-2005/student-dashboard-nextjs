import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        background: "#030303",
        surface: {
          DEFAULT: "#09090b",
          card: "#121214",
          border: "#1f1f23",
        },
        accent: {
          indigo: "#6366f1",
          purple: "#a855f7",
          cyan: "#06b6d4",
        },
      },
      fontFamily: {
        sans: ["var(--font-sans)", "Inter", "sans-serif"],
      },
      boxShadow: {
        glow: "0 0 20px rgba(99, 102, 241, 0.15)",
        "glow-cyan": "0 0 20px rgba(6, 182, 212, 0.15)",
        "glow-purple": "0 0 20px rgba(168, 85, 247, 0.15)",
      },
      animation: {
        "pulse-slow": "pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite",
        "mesh-slow": "mesh 10s ease infinite",
      },
      keyframes: {
        mesh: {
          "0%, 100%": {
            transform: "translate(0px, 0px) scale(1)",
          },
          "33%": {
            transform: "translate(30px, -50px) scale(1.1)",
          },
          "66%": {
            transform: "translate(-20px, 20px) scale(0.95)",
          },
        },
      },
    },
  },
  plugins: [],
};

export default config;
