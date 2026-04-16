/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        navy: {
          DEFAULT: '#050d1a',
          mid: '#0a1628',
          light: '#0f2040',
          card: '#0d1f3a',
          600: '#0c1e38',
        },
        cyan: {
          DEFAULT: '#00c8ff',
          dim: '#0099cc',
          400: '#22d3ee',
        },
        enterprise: {
          green: '#00e5a0',
          purple: '#7c3aed',
        },
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        display: ['Space Grotesk', 'Inter', 'system-ui', 'sans-serif'],
        mono: ['JetBrains Mono', 'monospace'],
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic': 'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
        'hero-glow': 'radial-gradient(ellipse at 30% 50%, rgba(0,200,255,0.10) 0%, transparent 60%), radial-gradient(ellipse at 80% 20%, rgba(124,58,237,0.08) 0%, transparent 60%)',
      },
      animation: {
        'float': 'float 6s ease-in-out infinite',
        'pulse-glow': 'pulseGlow 3s ease-in-out infinite',
        'fade-up': 'fadeUp 0.6s ease forwards',
        'spin-slow': 'spin 20s linear infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-12px)' },
        },
        pulseGlow: {
          '0%, 100%': { boxShadow: '0 0 15px rgba(0,200,255,0.3)' },
          '50%': { boxShadow: '0 0 35px rgba(0,200,255,0.7)' },
        },
        fadeUp: {
          from: { opacity: '0', transform: 'translateY(20px)' },
          to: { opacity: '1', transform: 'translateY(0)' },
        }
      },
      boxShadow: {
        'cyan-sm': '0 0 15px rgba(0,200,255,0.25)',
        'cyan-md': '0 0 25px rgba(0,200,255,0.4)',
        'cyan-lg': '0 0 50px rgba(0,200,255,0.5)',
        'card': '0 4px 24px rgba(0,0,0,0.4)',
        'card-hover': '0 12px 40px rgba(0,0,0,0.5), 0 0 30px rgba(0,200,255,0.15)',
      },
      borderColor: {
        'glass': 'rgba(0,200,255,0.15)',
        'glass-hover': 'rgba(0,200,255,0.4)',
      },
      backdropBlur: {
        xs: '2px',
      },
    },
  },
  plugins: [],
}
