/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        // Midnight Aurora palette
        midnight: {
          950: '#05060f',
          900: '#0a0c1c',
          800: '#11142a',
          700: '#1a1e3d',
        },
        aurora: {
          cyan: '#22d3ee',
          electric: '#06b6d4',
          violet: '#7c3aed',
          amber: '#f59e0b',
          warm: '#fb923c',
        },
        ink: {
          DEFAULT: '#e8eaf2',
          muted: '#9095a8',
          dim: '#5b5f72',
        },
      },
      fontFamily: {
        display: ['"Clash Display"', 'system-ui', 'sans-serif'],
        sans: ['Inter', 'system-ui', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'ui-monospace', 'monospace'],
      },
      animation: {
        'float': 'float 6s ease-in-out infinite',
        'pulse-slow': 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'shimmer': 'shimmer 2.5s linear infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-12px)' },
        },
        shimmer: {
          '0%': { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' },
        },
      },
    },
  },
  plugins: [],
}
