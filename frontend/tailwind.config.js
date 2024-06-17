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
          primary: '#4CAF50',
          secondary: '#81C784',
          background: '#FFFFFF',
          text: '#212121',
          warning: '#FF9800',
          success: '#388E3C',
        },
        dark: {
          primary: '#4CAF50',
          secondary: '#388E3C',
          background: '#121212',
          text: '#E0E0E0',
          warning: '#FF5722',
          success: '#1B5E20',
        },
      },
    }, 
  }, 
  plugins: [],
}

