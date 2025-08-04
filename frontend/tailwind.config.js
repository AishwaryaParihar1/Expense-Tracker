/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: "class",
  content: ["./index.html", "./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#60449D", // Main purple brand color
        lightBg: "#f4f4f4", // Very light gray for light mode bg
        darkBg: "#1e1e2e", // Rich dark gray for dark mode bg
        lightText: "#1a1a1a", // Deep text for light mode
        darkText: "#f2f2f2", // Light text for dark mode
        lightCard: "#ffffff", // White card in light mode
        darkCard: "#2b2b3c", // Slight dark card in dark mode
        borderDark: "#3a3a4f", // For borders or outlines in dark mode
      },
      boxShadow: {
        primary: "0 4px 6px -1px rgba(96, 68, 157, 0.6), 0 2px 4px -1px rgba(96, 68, 157, 0.06)",
      },
      fontFamily: {
        openSans: ['"Tajawal"', "Arial", "Helvetica", "sans-serif"],
        cinzel: ['"Cinzel"', "serif"],
        archivo: ['"Archivo"', "sans-serif"],
      },
    },
  },
  plugins: [],
};
