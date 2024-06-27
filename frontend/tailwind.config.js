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
          background: '#FFFFF',
          text: '#E1DEE9',
          accentGreenLight: '#DFF2E1',
          accentGreenMedium: '#A5D6A7',
          accentBlueLight: '#E3F2FD',
          grayMedium: '#B0BEC5',
          navbar: '#FDF0D5',
        },
        // Tema Scuro
        dark: {
          background: '#8d99ae',
          text: '#FFFFFF',
          accentGreenDark: '#388E3C',
          accentGreenLight: '#66BB6A',
          accentBlueDark: '#1E88E5',
          grayDark: '#757575',
          navbar: '#073B4C',
        }
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
      }
    }, 
  }, 
  plugins: [],
}

