/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        adcc: {
          bg: "#0B0C10",
          card: "#13141B",
          cardBorder: "#272935",
          red: "#E11D48",
          redHover: "#BE123C",
          gold: "#F59E0B",
          goldLight: "#FDE68A",
          green: "#10B981",
          gray: "#9CA3AF"
        }
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        display: ['Montserrat', 'Oswald', 'sans-serif']
      },
      boxShadow: {
        'glow-red': '0 0 25px rgba(225, 29, 72, 0.45)',
        'glow-gold': '0 0 25px rgba(245, 158, 11, 0.35)',
        'glow-green': '0 0 25px rgba(16, 185, 129, 0.45)'
      }
    },
  },
  plugins: [],
}
