/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./data/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        graphite: "#121417",
        charcoal: "#1A1D21",
        slateBorder: "#2A2E35",
        amberCopper: "#D97706",
        offWhite: "#F1F5F9",
        coldGray: "#94A3B8",
      },
    },
  },
  plugins: [],
};
