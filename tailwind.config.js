/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class', // 👈 importante
  content: [
    "./index.html",
    "./src/**/*.{js,jsx,ts,tsx}",  // Asegúrate de que está esta línea
  ],
  theme: {
    extend: {},
  },
  plugins: [],
};
