import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      colors: {
        /* Nero spaziale dello sfondo e scala di grigi freddi per testi e superfici. */
        ink: {
          1000: "#020309",
          950: "#05060E",
          900: "#0A0C18",
          850: "#0F1220",
          800: "#161A2A",
          700: "#232838",
          600: "#363C50",
          500: "#575E76",
          400: "#8A90A8",
          300: "#B2B7CB",
          200: "#D3D6E4",
          100: "#ECEEF5",
        },
        paper: {
          DEFAULT: "#F4F6FF",
          dim: "#D7DAEA",
        },
        /* Blu delle particelle: definito come variabile in globals.css,
           così cambiare l'accento del sito è una modifica di una riga. */
        accent: {
          DEFAULT: "rgb(var(--accent) / <alpha-value>)",
          ink: "rgb(var(--accent-ink) / <alpha-value>)",
          dim: "#3A52F5",
          aqua: "#7FA2FF",
        },
      },
      fontFamily: {
        sans: ["var(--font-sans)", "system-ui", "sans-serif"],
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
