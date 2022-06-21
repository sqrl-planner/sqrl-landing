const iOSHeight = require("@rvxlab/tailwind-plugin-ios-full-height")

module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'tahiti': {
          100: '#cffafe',
          200: '#a5f3fc',
          300: '#67e8f9',
          400: '#22d3ee',
          500: '#06b6d4',
          600: '#0891b2',
          700: '#0e7490',
          800: '#155e75',
          900: '#164e63',
      },
        'tahiti-700-light': '#3b90ad',
        'tahiti-pale': '#92f5e2',
      }
    },
  },
  plugins: [iOSHeight],
  'darkMode': 'class',
}
