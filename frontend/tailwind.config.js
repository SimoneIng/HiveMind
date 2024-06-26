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
          background: '#F5F5F5',
          text: '#E1DEE9',
          accentGreenLight: '#DFF2E1',
          accentGreenMedium: '#A5D6A7',
          accentBlueLight: '#E3F2FD',
          grayMedium: '#B0BEC5',
          navbar: '#D5CFE1',
        },
        // Tema Scuro
        dark: {
          background: '#121212',
          text: '#FFFFFF',
          accentGreenDark: '#388E3C',
          accentGreenLight: '#66BB6A',
          accentBlueDark: '#1E88E5',
          grayDark: '#757575',
          navbar: '#1E1E1E',
        }
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
      }
    }, 
  }, 
  plugins: [],
}

