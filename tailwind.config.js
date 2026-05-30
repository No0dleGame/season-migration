/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        earth: {
          50: '#f6f5f2',
          100: '#e9e6df',
          200: '#d3ccbe',
          300: '#b8ac97',
          400: '#a19076',
          500: '#8f7b5e',
          600: '#766249',
          700: '#62503d',
          800: '#524335',
          900: '#45382e',
        },
        sand: '#e8e1d5',
        terracotta: '#c97a63',
        olive: '#6b705c',
        forest: '#3f4a3c'
      },
      fontFamily: {
        sans: ['"Noto Serif SC"', '"Source Han Serif CN"', 'serif'],
      }
    },
  },
  plugins: [],
}