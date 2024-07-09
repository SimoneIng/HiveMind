/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'selector', 
  content: [
    "./src/**/*.{html,ts}"
  ],
  theme: {
    extend: {
      colors: {
        light: {

        },
        // Tema Scuro
        dark: {

        }
      },
      fontFamily: {
          mono: ['"Ubuntu Mono"', 'monospace'],
      }
    }, 
  }, 
  plugins: [],
}

