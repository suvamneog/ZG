/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        background: '#000000',
        foreground: '#ffffff',
        primary: {
          DEFAULT: '#FFD700',
          foreground: '#000000'
        },
        secondary: {
          DEFAULT: '#1a1a1a',
          foreground: '#ffffff'
        },
        accent: {
          DEFAULT: '#FFD700',
          foreground: '#000000'
        },
        muted: {
          DEFAULT: '#262626',
          foreground: '#a3a3a3'
        }
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif']
      },
      keyframes: {
        "accordion-down": {
          from: { height: 0 },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: 0 },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
      }
    },
  },
  plugins: [],
}