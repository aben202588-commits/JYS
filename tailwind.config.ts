import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./lib/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "#0B0E11", // Deep dark grey/black
        foreground: "#EAECEF", // Light grey, near white
        up: "#02C076",         // Professional Trading Green
        down: "#F84960",       // Coral Red
        accent: "#F0B90B",     // Binance Yellow
        success: "#02C076",
        danger: "#F84960",
      },
    },
  },
  plugins: [],
};

export default config;
