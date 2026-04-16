/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Brand Colors
        navy: {
          DEFAULT: '#050d1a',
          mid: '#0a1628',
          light: '#0f2040',
          card: '#0d1f3a',
        },
        cyan: {
          DEFAULT: '#00c8ff',
          dim: '#0099cc',
          light: '#00c8ff',
        },
        green: '#00e5a0',
        purple: '#7c3aed',
        white: '#ffffff',
        'off-white': '#e8f0fe',
        gray: {
          light: '#e8f0fe',
          mid: '#6b87a8',
          dark: '#3d5a7a',
        },
        text: {
          dim: '#6b87a8',
          muted: '#3d5a7a',
        },
      },
      fontFamily: {
        main: ['Space Grotesk', 'Inter', 'system-ui', 'sans-serif'],
        body: ['Inter', 'system-ui', 'sans-serif'],
        mono: ['JetBrains Mono', 'monospace'],
      },
      backgroundImage: {
        'gradient-primary': 'linear-gradient(135deg, #00c8ff 0%, #0055ff 100%)',
        'gradient-aurora': 'linear-gradient(135deg, #00c8ff 0%, #7c3aed 50%, #00e5a0 100%)',
        'gradient-glow-bg': 'radial-gradient(ellipse at 50% 0%, rgba(0, 200, 255, 0.12) 0%, transparent 70%)',
        'gradient-text': 'linear-gradient(135deg, #ffffff 0%, #00c8ff 60%, #7c3aed 100%)',
        'gradient-hero': 'radial-gradient(ellipse at 30% 50%, rgba(0, 200, 255, 0.08) 0%, transparent 60%), radial-gradient(ellipse at 80% 20%, rgba(124, 58, 237, 0.08) 0%, transparent 60%), radial-gradient(ellipse at 60% 80%, rgba(0, 229, 160, 0.05) 0%, transparent 50%)',
      },
      borderRadius: {
        '3xl': '1.5rem',
      },
      spacing: {
        '18': '4.5rem',
      },
      animation: {
        'fade-in': 'fadeIn 0.5s ease-in-out',
        'slide-up': 'slideUp 0.5s ease-out',
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
      },
      backdropBlur: {
        xs: '2px',
      },
    },
  },
  plugins: [],
}