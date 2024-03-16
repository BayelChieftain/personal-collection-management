/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        'Caveat': ["Caveat", "sens-serif"],
        'Oswald': ["Oswald", "sens-serif"],
        'Alatsi': ['Alatsi', "sens-serif"],
        'NSans': ['Noto+Sans', "sens-serif"],
        'Poppins': ['Poppins', "sens-serif"],
      }
    },
  },
  plugins: [],
}

