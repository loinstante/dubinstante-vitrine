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
        // DubInstante QSS Palette — dynamic tokens adapting to light and dark themes
        ink: {
          DEFAULT: 'rgb(var(--bg-main-rgb) / <alpha-value>)',
          deep: 'var(--bg-deep)',
        },
        surface: {
          DEFAULT: 'rgb(var(--bg-surface-rgb) / <alpha-value>)',
          dark: 'rgb(var(--bg-surface-rgb) / <alpha-value>)',
          sunk: 'rgb(var(--bg-sunk-rgb) / <alpha-value>)',
          hover: 'rgb(var(--bg-surface-hover-rgb) / <alpha-value>)',
        },
        border: {
          DEFAULT: 'rgb(var(--border-subtle-rgb) / <alpha-value>)',
          subtle: 'rgb(var(--border-subtle-rgb) / <alpha-value>)',
          strong: 'rgb(var(--border-strong-rgb) / <alpha-value>)',
          focus: 'rgb(var(--border-focus-rgb) / <alpha-value>)',
        },
        accent: {
          DEFAULT: 'rgb(var(--accent-rgb) / <alpha-value>)',
          hover: 'rgb(var(--accent-hover-rgb) / <alpha-value>)',
          press: 'rgb(var(--accent-press-rgb) / <alpha-value>)',
          soft: 'var(--accent-soft)',
          text: 'var(--accent-text)',
        },
        rec: {
          DEFAULT: 'rgb(var(--rec-rgb) / <alpha-value>)',
          dim: 'var(--rec-dim)',
          bg: 'var(--rec-bg)',
        },
        audio: {
          green: 'rgb(var(--success-rgb) / <alpha-value>)',
          amber: 'rgb(var(--warning-rgb) / <alpha-value>)',
          red: 'rgb(var(--danger-rgb) / <alpha-value>)',
        },
      },
      // Variantes "texte" des couleurs vives : mêmes classes (text-accent, text-rec…),
      // mais teintes qui passent WCAG AA sur les fonds du site. bg-/border- gardent la teinte d'origine.
      textColor: {
        accent: { DEFAULT: 'rgb(var(--accent-text-rgb) / <alpha-value>)' },
        rec: { DEFAULT: 'rgb(var(--rec-text-rgb) / <alpha-value>)' },
        audio: {
          green: 'rgb(var(--success-text-rgb) / <alpha-value>)',
          amber: 'rgb(var(--warning-text-rgb) / <alpha-value>)',
        },
      },
      fontFamily: {
        sans: ['"Inter Variable"', 'Inter', 'system-ui', '-apple-system', 'sans-serif'],
        display: ['"Manrope Variable"', 'Manrope', 'Inter', 'system-ui', 'sans-serif'],
        mono: ['"JetBrains Mono Variable"', '"JetBrains Mono"', 'Consolas', 'Fira Code', 'monospace'],
      },
      letterSpacing: {
        tightest: '-0.03em',
      },
      maxWidth: {
        '7xl': '80rem',
        '8xl': '85rem',
      },
      keyframes: {
        'fade-up': {
          '0%': { opacity: '0', transform: 'translateY(16px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        'fade-in': {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        'glow-pulse': {
          '0%, 100%': { opacity: '0.5', transform: 'scale(1)' },
          '50%': { opacity: '1', transform: 'scale(1.15)' },
        },
        'rec-blink': {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0.25' },
        },
        'scroll-x': {
          '0%': { transform: 'translateX(0)' },
          '100%': { transform: 'translateX(-50%)' },
        },
        'grain-shift': {
          '0%, 100%': { transform: 'translate(0, 0)' },
          '20%': { transform: 'translate(-2%, -3%)' },
          '40%': { transform: 'translate(1%, 2%)' },
          '60%': { transform: 'translate(-1%, 1%)' },
          '80%': { transform: 'translate(2%, -1%)' },
        },
        'headline-reveal': {
          '0%': { opacity: '0', transform: 'translateY(30px)', filter: 'blur(8px)' },
          '100%': { opacity: '1', transform: 'translateY(0)', filter: 'blur(0)' },
        },
        'halo-breathe': {
          '0%, 100%': { opacity: '0.35', transform: 'scale(1)' },
          '50%': { opacity: '0.55', transform: 'scale(1.08)' },
        },
      },
      animation: {
        'fade-up': 'fade-up 0.7s cubic-bezier(0.22, 1, 0.36, 1) both',
        'fade-in': 'fade-in 0.8s ease both',
        'glow-pulse': 'glow-pulse 2.4s ease-in-out infinite',
        'rec-blink': 'rec-blink 1.6s steps(1, end) infinite',
        'scroll-x': 'scroll-x 40s linear infinite',
        'grain-shift': 'grain-shift 8s steps(4) infinite',
        'headline-reveal': 'headline-reveal 1s cubic-bezier(0.22, 1, 0.36, 1) both',
        'halo-breathe': 'halo-breathe 6s ease-in-out infinite',
      },
    },
  },
  plugins: [],
};
