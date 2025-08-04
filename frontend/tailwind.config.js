/** @type {import('tailwindcss').Config} */

module.exports = {
    darkMode: 'class', 
  content: [
    './index.html', 
    './src/**/*.{js,jsx,ts,tsx}', 
  ],
  theme: {
    extend: {
      colors: {
        purpleCustom: "#4c4a82",
        gold: "#d4af37",
      },
      fontFamily: {
        openSans: [ '"Tajawal", Arial, Helvetica, sans-serif'],
        cinzel: ['"Cinzel"', 'serif'],
        archivo:['"Archivo", sans-serif']
      },
    },
  },
  plugins: [],
};
