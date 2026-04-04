/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'code-blue': '#00f3ff',
        'code-purple': '#b026ff',
        'code-gold': '#ffd700',
        'code-dark': '#0a0a0f',
        'code-panel': 'rgba(20, 20, 30, 0.7)',
        'code-darker': '#050508',
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
        gaming: ['Orbitron', 'sans-serif'],
      },
      animation: {
        'glow-pulse': 'glow 2s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'slide-up': 'slideUp 0.3s ease-out',
        'fade-in': 'fadeIn 0.5s ease-out',
        'bar-fill': 'barFill 1s ease-out forwards',
        'pulse-fast': 'pulse 1s cubic-bezier(0.4, 0, 0.6, 1) infinite'
      },
      keyframes: {
        glow: {
          '0%, 100%': { boxShadow: '0 0 10px #00f3ff, 0 0 20px #00f3ff' },
          '50%': { boxShadow: '0 0 20px #00f3ff, 0 0 40px #00f3ff' },
        },
        slideUp: {
          '0%': { transform: 'translateY(20px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        barFill: {
          '0%': { width: '0%' },
        }
      }
    },
  },
  plugins: [],
}
