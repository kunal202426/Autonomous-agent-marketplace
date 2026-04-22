import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        ink: "#08111f",
        panel: "#0f172a",
        accent: "#38bdf8",
        success: "#22c55e",
        warn: "#f59e0b",
      },
    },
  },
  plugins: [],
};

export default config;
