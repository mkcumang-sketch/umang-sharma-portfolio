import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./app/**/*.{js,ts,jsx,tsx,mdx}", "./components/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      colors: {
        graphite: "#0a0a0c",
        paper: "#f5f5f2",
        muted: "#96969b",
        surface: "#121215",
        line: "rgba(255,255,255,0.10)",
      },
    },
  },
  plugins: [],
};
export default config;