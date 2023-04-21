/** @type {import('tailwindcss').Config} */
module.exports = {

  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],

  theme: {
    extend: {
      colors: {
        'bg-start': '#800080',
        'bg-end': '#40E0D0',
      },
      
      gradientColorStops: {
        'bg-start': 'var(--bg-start)',
        'bg-end': 'var(--bg-end)',
      },

      borderColor: {
        'custom': 'var(--border-color)'
      },

      textColor: {
        'custom': 'var(--border-color)'
      },

      fontFamily: {
        'roboto': ['Roboto', 'sans-serif'],
        'montserrat': ['Montserrat', 'sans-serif']
      },

      keyframes: {
        marquee: {
          "0%": { transform: "translateX(0)" },
          "100%": { transform: "translateX(-100%)" },
        },
      },

      animation: {
        'pulse-slow': 'pulse 3s cubic-bezier(0.5, 0, 0.5, 1) infinite',
        'bounce-slow': 'bounce 1s infinite cubic-bezier(.85, .01, .18, 1.01)',
        'marquee': 'marquee 10s linear infinite',
      }
    },
  },
  plugins: [

  ],
}
