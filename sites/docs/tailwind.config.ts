/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{astro,html,js,jsx,ts,tsx}'],
  theme: {
    extend: {
      colors: {
        base: '#1e1e2e',
        mantle: '#181825',
        crust: '#11111b',
        surface: {
          0: '#313244',
          1: '#45475a',
          2: '#585b70',
        },
        overlay: {
          0: '#6c7086',
          1: '#7f849c',
          2: '#9399b2',
        },
        text: '#cdd6f4',
        subtext: {
          0: '#a6adc8',
          1: '#bac2de',
        },
        mauve: '#cba6f7',
        pink: '#f5c2e7',
        blue: '#89b4fa',
        green: '#a6e3a1',
        red: '#f38ba8',
        yellow: '#f9e2af',
        peach: '#fab387',
        sky: '#89dcfe',
        teal: '#94e2d5',
        lavender: '#b4befe',
      },
      fontFamily: {
        pixel: ['"Press Start 2P"', 'monospace'],
        mono: ['"JetBrains Mono"', 'monospace'],
        sans: ['"Inter"', 'system-ui', 'sans-serif'],
      },
      boxShadow: {
        'neon-mauve': '0 0 10px #cba6f7, 0 0 40px rgba(203,166,247,0.3)',
        'neon-pink': '0 0 10px #f5c2e7, 0 0 40px rgba(245,194,231,0.3)',
        'neon-blue': '0 0 10px #89b4fa, 0 0 40px rgba(137,180,250,0.3)',
        'neon-green': '0 0 10px #a6e3a1, 0 0 40px rgba(166,227,161,0.3)',
      },
      animation: {
        'glow-pulse': 'glow-pulse 2s ease-in-out infinite',
        scanline: 'scanline 8s linear infinite',
      },
      keyframes: {
        'glow-pulse': {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0.7' },
        },
        scanline: {
          '0%': { transform: 'translateY(-100%)' },
          '100%': { transform: 'translateY(100%)' },
        },
      },
    },
  },
  plugins: [],
}
