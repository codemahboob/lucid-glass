import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        ink: "#14201A",
        paper: "#EFEDE4",
        mist: "#E4EEE7",
        bamboo: "#B8925A",
        "bamboo-light": "#D6B583",
        sage: "#7C9070",
        "sage-dark": "#576A4E",
        clay: "#CB6B4A",
      },
      fontFamily: {
        display: ["var(--font-fraunces)", "serif"],
        body: ["var(--font-inter)", "sans-serif"],
        mono: ["var(--font-mono)", "monospace"],
      },
      letterSpacing: {
        widest2: "0.28em",
      },
      keyframes: {
        fadeUp: {
          "0%": { opacity: "0", transform: "translateY(14px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        tagline: {
          "0%, 28%": { opacity: "1", transform: "translateY(0)" },
          "33%, 100%": { opacity: "0", transform: "translateY(-8px)" },
        },
      },
      animation: {
        fadeUp: "fadeUp 0.9s cubic-bezier(0.16,1,0.3,1) both",
      },
    },
  },
  plugins: [],
};
export default config;
