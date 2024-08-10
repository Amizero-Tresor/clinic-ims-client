/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Quicksand', 'ui-sans-serif', 'system-ui'],
      },
      colors: {
        blue: '#1B60AC',
        darkBlue: '#043973'
      },
    },
  },
  plugins: [],
}