/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./app/**/*.{js,jsx,ts,tsx}', './components/**/*.{js,jsx,ts,tsx}'],
  presets: [require('nativewind/preset')],
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#f0f0ff',
          100: '#e0e0ff',
          200: '#c7c7fd',
          300: '#a5a5fc',
          400: '#8180f8',
          500: '#6366f1',
          600: '#5254e9',
          700: '#4644d1',
          800: '#3c3aaf',
          900: '#353290',
        },
      },
      fontFamily: {
        display: ['System'],
      },
    },
  },
  plugins: [],
};
