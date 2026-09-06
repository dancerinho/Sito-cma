import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: "class",
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      colors: {
        /* Blu oceano profondo: base scura del sito. */
        ink: {
          950: "#02080F",
          900: "#04121F",
          850: "#06192A",
          800: "#082134",
          700: "#0E3049",
          600: "#164463",
          500: "#255F86",
          400: "#5389AD",
          300: "#96BFDA",
          200: "#CBE5F5",
          100: "#E6F3FB",
        },
        paper: {
          DEFAULT: "#F1FAFF",
          dim: "#DCEDF8",
        },
        /* Accento oceano: dal blu profondo al turchese di superficie. */
        accent: {
          DEFAULT: "#1FA2FF",
          light: "#6FE0FF",
          dim: "#0B6FC4",
          deep: "#0A3D77",
          aqua: "#25E0C8",
          soft: "rgba(31, 162, 255, 0.12)",
        },
      },
      fontFamily: {
        sans: ["var(--font-sans)", "system-ui", "sans-serif"],
        display: ["var(--font-display)", "var(--font-sans)", "system-ui", "sans-serif"],
        mono: ["var(--font-mono)", "monospace"],
      },
      fontSize: {
        "display-xl": ["clamp(2.75rem, 6vw, 5.25rem)", { lineHeight: "1.02", letterSpacing: "-0.03em" }],
        "display-lg": ["clamp(2.25rem, 4.5vw, 3.75rem)", { lineHeight: "1.05", letterSpacing: "-0.025em" }],
        "display-md": ["clamp(1.75rem, 3vw, 2.5rem)", { lineHeight: "1.1", letterSpacing: "-0.02em" }],
      },
      maxWidth: {
        content: "1280px",
      },
      borderRadius: {
        sm: "6px",
        DEFAULT: "10px",
        lg: "16px",
        xl: "22px",
      },
      boxShadow: {
        subtle: "0 1px 0 0 rgba(255,255,255,0.05) inset, 0 12px 32px -16px rgba(0,0,0,0.6)",
        glow: "0 0 0 1px rgba(31,162,255,0.28), 0 8px 40px -8px rgba(31,162,255,0.45)",
        aqua: "0 0 0 1px rgba(37,224,200,0.25), 0 10px 44px -10px rgba(37,224,200,0.35)",
      },
      backgroundImage: {
        "grid-fade":
          "linear-gradient(to bottom, rgba(241,250,255,0) 0%, rgba(2,8,15,1) 92%)",
        "ocean-text":
          "linear-gradient(100deg, #6FE0FF 0%, #1FA2FF 38%, #25E0C8 68%, #6FE0FF 100%)",
      },
      transitionTimingFunction: {
        premium: "cubic-bezier(0.16, 1, 0.3, 1)",
      },
      keyframes: {
        "fade-up": {
          "0%": { opacity: "0", transform: "translateY(14px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        marquee: {
          "0%": { transform: "translateX(0)" },
          "100%": { transform: "translateX(-50%)" },
        },
        /* Correnti oceaniche: le macchie di gradiente si spostano lentamente. */
        "current-a": {
          "0%, 100%": { transform: "translate3d(-6%, -4%, 0) scale(1)" },
          "50%": { transform: "translate3d(8%, 6%, 0) scale(1.18)" },
        },
        "current-b": {
          "0%, 100%": { transform: "translate3d(6%, 5%, 0) scale(1.12)" },
          "50%": { transform: "translate3d(-7%, -6%, 0) scale(0.92)" },
        },
        "current-c": {
          "0%, 100%": { transform: "translate3d(0, 3%, 0) scale(0.95)" },
          "33%": { transform: "translate3d(-9%, -5%, 0) scale(1.2)" },
          "66%": { transform: "translate3d(9%, 2%, 0) scale(1.05)" },
        },
        "gradient-pan": {
          "0%, 100%": { backgroundPosition: "0% 50%" },
          "50%": { backgroundPosition: "100% 50%" },
        },
        "caustic-drift": {
          "0%": { backgroundPosition: "0 0, 0 0" },
          "100%": { backgroundPosition: "180px 120px, -140px 90px" },
        },
        float: {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-10px)" },
        },
        "pulse-ring": {
          "0%": { opacity: "0.55", transform: "scale(0.92)" },
          "70%": { opacity: "0", transform: "scale(1.35)" },
          "100%": { opacity: "0", transform: "scale(1.35)" },
        },
        shimmer: {
          "0%": { transform: "translateX(-120%)" },
          "100%": { transform: "translateX(220%)" },
        },
        "draw-in": {
          "0%": { strokeDashoffset: "1400", opacity: "0" },
          "20%": { opacity: "1" },
          "100%": { strokeDashoffset: "0", opacity: "1" },
        },
        "spin-slow": {
          "0%": { transform: "rotate(0deg)" },
          "100%": { transform: "rotate(360deg)" },
        },
      },
      animation: {
        "fade-up": "fade-up 0.7s cubic-bezier(0.16,1,0.3,1) both",
        marquee: "marquee 28s linear infinite",
        "current-a": "current-a 22s ease-in-out infinite",
        "current-b": "current-b 28s ease-in-out infinite",
        "current-c": "current-c 34s ease-in-out infinite",
        "gradient-pan": "gradient-pan 14s ease-in-out infinite",
        "caustic-drift": "caustic-drift 40s linear infinite",
        float: "float 7s ease-in-out infinite",
        "pulse-ring": "pulse-ring 3.2s cubic-bezier(0.16,1,0.3,1) infinite",
        shimmer: "shimmer 2.4s ease-in-out infinite",
        "draw-in": "draw-in 2.6s cubic-bezier(0.16,1,0.3,1) both",
        "spin-slow": "spin-slow 48s linear infinite",
      },
    },
  },
  plugins: [],
};

export default config;
