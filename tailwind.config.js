/** @type {import('tailwindcss').Config} */
export default {
  darkMode: "class",
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#6D5DFB",
        dark: "#0F172A",
        soft: "#111827",
        card: "#1E293B",
      },
      boxShadow: {
        glow: "0 0 40px rgba(109, 93, 251, 0.25)",
      },
    },
  },
  plugins: [],
};