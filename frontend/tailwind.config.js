/** @type {import('tailwindcss').Config} */
module.exports = {

  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],

  theme: {
    extend: {
      colors: {
        'bg-start': '#000000',
        'bg-end': '#36454F',
      },
      
      gradientColorStops: {
        'bg-start': 'var(--bg-start)',
        'bg-end': 'var(--bg-end)',
      },

      fontFamily: {
        'roboto': ['Roboto', 'sans-serif'],
        'montserrat': ['Montserrat', 'sans-serif']
      },

      animation: {
        'pulse-slow': 'pulse 3s cubic-bezier(0.5, 0, 0.5, 1) infinite;'
      }
    },
  },
  plugins: [

  ],
}
