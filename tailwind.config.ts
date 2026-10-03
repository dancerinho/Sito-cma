import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      colors: {
        /* Nero profondo dello sfondo e scala di grigi per testi e superfici. */
        ink: {
          1000: "#040506",
          950: "#07080A",
          900: "#0C0E11",
          850: "#111418",
          800: "#181B20",
          700: "#252A31",
          600: "#3A4048",
          500: "#5A616B",
          400: "#8B929C",
          300: "#B3B9C1",
          200: "#D4D8DD",
          100: "#ECEDEF",
        },
        paper: {
          DEFAULT: "#F3F4F2",
          dim: "#DAD7CF",
        },
        /* Ciano del marchio: definito come variabile in globals.css,
           così cambiare l'accento del sito è una modifica di una riga. */
        accent: {
          DEFAULT: "rgb(var(--accent) / <alpha-value>)",
          ink: "rgb(var(--accent-ink) / <alpha-value>)",
          dim: "#1FA2FF",
          aqua: "#25E0C8",
        },
      },
      fontFamily: {
        sans: ["var(--font-sans)", "system-ui", "sans-serif"],
        serif: ["var(--font-serif)", "Georgia", "serif"],
        mono: ["var(--font-mono)", "ui-monospace", "monospace"],
      },
      fontSize: {
        "display-xl": ["clamp(2.75rem, 6.4vw, 5.5rem)", { lineHeight: "1", letterSpacing: "-0.045em" }],
        "display-lg": ["clamp(2.125rem, 4.4vw, 3.75rem)", { lineHeight: "1.04", letterSpacing: "-0.04em" }],
        "display-md": ["clamp(1.625rem, 2.6vw, 2.25rem)", { lineHeight: "1.1", letterSpacing: "-0.03em" }],
      },
      maxWidth: {
        content: "1280px",
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
        ping: {
          "0%": { transform: "scale(1)", opacity: "0.7" },
          "100%": { transform: "scale(2.6)", opacity: "0" },
        },
      },
      animation: {
        "spin-slow": "spin-slow 60s linear infinite",
        blink: "blink 2.4s ease-in-out infinite",
        ping: "ping 1.8s cubic-bezier(0, 0, 0.2, 1) infinite",
      },
    },
  },
  plugins: [],
};

export default config;
