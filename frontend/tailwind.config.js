/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'selector', 
  content: [
    "./src/**/*.{html,ts}"
  ],
  theme: {
    extend: {
      fontFamily: {
          mono: ['"Ubuntu Mono"', 'monospace'],
      }
    }, 
  }, 
  plugins: [],
}

