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
        soil: {
          900: 'var(--color-soil-900)',
          700: 'var(--color-soil-700)',
        },
        leaf: {
          700: 'var(--color-leaf-700)',
          500: 'var(--color-leaf-500)',
        },
        wheat: {
          400: 'var(--color-wheat-400)',
        },
        terracotta: {
          500: 'var(--color-terracotta-500)',
        },
        sky: {
          300: 'var(--color-sky-300)',
        },
        border: 'var(--color-border)',
      }
    },
  },
  plugins: [],
}
