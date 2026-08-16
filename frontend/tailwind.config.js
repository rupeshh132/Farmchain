/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        heading: ['Fraunces', 'serif'],
        body: ['"Public Sans"', 'sans-serif'],
        mono: ['"IBM Plex Mono"', 'monospace'],
      },
      colors: {
        cream: 'var(--color-cream)',
        primary: 'var(--color-leaf-700)',
        'primary-light': 'var(--color-leaf-500)',
        soil: {
          950: '#261E16',
          900: 'var(--color-soil-900)',
          800: '#4A3B2C',
          700: 'var(--color-soil-700)',
          600: '#755F47',
          500: '#947B5F',
        },
        leaf: {
          700: 'var(--color-leaf-700)',
          500: 'var(--color-leaf-500)',
        },
        wheat: {
          50: '#FDFCF8',
          100: '#F9F6E8',
          200: '#F3EACF',
          400: 'var(--color-wheat-400)',
        },
        terracotta: {
          500: 'var(--color-terracotta-500)',
        },
        sky: {
          300: 'var(--color-sky-300)',
        },
        border: 'var(--color-border)',
      },
      keyframes: {
        'fade-in-up': {
          '0%': { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        shimmer: {
          '100%': { transform: 'translateX(100%)' },
        }
      },
      animation: {
        'fade-in-up': 'fade-in-up 0.8s ease-out forwards',
        shimmer: 'shimmer 1.5s infinite',
      }
    },
  },
  plugins: [],
}
