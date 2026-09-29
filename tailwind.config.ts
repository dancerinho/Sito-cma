import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      colors: {
        /* Grafite: base scura, neutra con una punta calda. */
        ink: {
          950: "#0A0B0D",
          900: "#101216",
          850: "#15181C",
          800: "#1C2025",
          700: "#282D33",
          600: "#3A4048",
          500: "#5A616B",
          400: "#8B929C",
          300: "#B3B9C1",
          200: "#D4D8DD",
          100: "#ECEDEF",
        },
        /* Carta: il bianco caldo dei testi. */
        paper: {
          DEFAULT: "#F2F0EB",
          dim: "#DAD7CF",
        },
        /* Ciano del marchio, usato solo per accenti puntuali. */
        accent: {
          DEFAULT: "#4CC9FF",
          dim: "#1FA2FF",
          aqua: "#25E0C8",
        },
      },
      fontFamily: {
        sans: ["var(--font-sans)", "system-ui", "sans-serif"],
        serif: ["var(--font-serif)", "Georgia", "serif"],
      },
      fontSize: {
        "display-xl": ["clamp(2.5rem, 6vw, 5.25rem)", { lineHeight: "1", letterSpacing: "-0.03em" }],
        "display-lg": ["clamp(2.125rem, 4.2vw, 3.75rem)", { lineHeight: "1.05", letterSpacing: "-0.025em" }],
        "display-md": ["clamp(1.75rem, 3vw, 2.5rem)", { lineHeight: "1.1", letterSpacing: "-0.02em" }],
      },
      maxWidth: {
        content: "1200px",
      },
      borderRadius: {
        sm: "2px",
        DEFAULT: "4px",
        lg: "8px",
      },
      transitionTimingFunction: {
        out: "cubic-bezier(0.22, 1, 0.36, 1)",
      },
      keyframes: {
        "spin-slow": {
          "0%": { transform: "rotate(0deg)" },
          "100%": { transform: "rotate(360deg)" },
        },
        blink: {
          "0%, 100%": { opacity: "1" },
          "50%": { opacity: "0.25" },
        },
      },
      animation: {
        "spin-slow": "spin-slow 60s linear infinite",
        blink: "blink 2.4s ease-in-out infinite",
      },
    },
  },
  plugins: [],
};

export default config;
