/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#f0f7ff',
          100: '#e0efff',
          200: '#bae2ff',
          300: '#7cc7ff',
          400: '#38a8ff',
          500: '#0088ff',
          600: '#0066ff',
          700: '#0052cc',
          800: '#0042a6',
          900: '#003380',
        },
        accent: {
          50: '#fff8f7',
          100: '#ffe8e5',
          200: '#ffc7c0',
          300: '#ff9f94',
          400: '#ff7563',
          500: '#ff4d33',
          600: '#ff2600',
          700: '#cc1e00',
          800: '#a61800',
          900: '#801300',
        },
        highlight: {
          50: '#fffdf0',
          100: '#fff8cc',
          200: '#fff199',
          300: '#ffe566',
          400: '#ffd833',
          500: '#ffcc00',
          600: '#cca300',
          700: '#997a00',
          800: '#665200',
          900: '#332900',
        },
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
        heading: ['Poppins', 'sans-serif'],
      },
      animation: {
        'fade-in': 'fadeIn 0.5s ease-in-out',
        'slide-up': 'slideUp 0.5s ease-in-out',
        'bounce-light': 'bounceLight 2s infinite',
        'pulse-light': 'pulseLight 2s infinite',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { transform: 'translateY(20px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        bounceLight: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-5px)' },
        },
        pulseLight: {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0.8' },
        },
      },
    },
  },
  plugins: [],
};