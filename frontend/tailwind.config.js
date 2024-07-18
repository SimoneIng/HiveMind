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
          text: "#022c22", 
          primary: "#059669", 
          linkHover: "#047857", 
          linkActive: "#065f46", 
        },
        // Tema Scuro
        dark: {
          text: "#ecfdf5", 
          primary: "#a7f3d0", 
          linkHover: "#6ee7b7", 
          linkActive: "#34d399",
        }
      },
      fontFamily: {
          mono: ['"Ubuntu Mono"', 'monospace'],
      }
    }, 
  }, 
  plugins: [],
}

