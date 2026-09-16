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
        // "Régie" palette — warm cinema studio
        ink: {
          DEFAULT: '#0B0A08',
          deep: '#070605',
        },
        surface: {
          dark: '#15130F',
          sunk: '#1E1A14',
          hover: '#28231B',
        },
        border: {
          subtle: '#2A241C',
          strong: '#3A3228',
        },
        accent: {
          DEFAULT: '#FFB020',
          hover: '#FFC24A',
          soft: '#FFB020',
          deep: '#C8821A',
        },
        rec: {
          DEFAULT: '#FF3B3B',
          dim: '#B82828',
        },
        audio: {
          green: '#12c582',
          amber: '#FFB020',
          red: '#FF3B3B',
        },
        warm: {
          50: '#FAF7F0',
          100: '#F2EDE2',
          200: '#E4DCC8',
        },
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', '-apple-system', 'sans-serif'],
        display: ['"Space Grotesk"', 'Inter', 'system-ui', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'Fira Code', 'monospace'],
      },
      letterSpacing: {
        tightest: '-0.04em',
      },
      maxWidth: {
        '7xl': '80rem',
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
