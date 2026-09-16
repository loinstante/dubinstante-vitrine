/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        obsidian: {
          DEFAULT: '#0a0a0c',
          deep: '#060608',
        },
        surface: {
          dark: '#121218',
          sunk: '#1a1a22',
          hover: '#22222c',
        },
        border: {
          subtle: '#22222c',
          strong: '#2e2e3c',
        },
        accent: {
          DEFAULT: '#7c3aed',
          hover: '#6d28d9',
          soft: '#f5f3ff',
          dark: '#926bff',
          'dark-hover': '#a382ff',
          'dark-soft': '#1e182e',
        },
        audio: {
          green: '#12c582',
          amber: '#f3a400',
          red: '#ff4d66',
        },
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', '-apple-system', 'sans-serif'],
        mono: ['JetBrains Mono', 'Fira Code', 'monospace'],
      },
    },
  },
  plugins: [],
}
