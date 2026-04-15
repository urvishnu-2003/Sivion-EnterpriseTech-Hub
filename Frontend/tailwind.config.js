/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        'main': ['Space Grotesk', 'Inter', 'system-ui', 'sans-serif'],
        'body': ['Inter', 'system-ui', 'sans-serif'],
      },
      colors: {
        'navy': '#031025',
        'navy-light': '#081d3f',
        'cyan': '#00c8ff',
        'cyan-light': '#22d7ff',
        'cyan-dark': '#00a8e8',
        'gray-light': '#f8fbff',
        'gray-mid': '#c7d9f8',
        'gray-dark': '#b8d6ff',
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic': 'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
    },
  },
  plugins: [],
}