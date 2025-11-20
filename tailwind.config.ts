import type { Config } from 'tailwindcss';

const config: Config = {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      colors: {
        gaming: {
          dark: '#0a0e27',
          darker: '#050816',
          purple: '#8b5cf6',
          'purple-neon': '#a78bfa',
          blue: '#3b82f6',
          'blue-neon': '#60a5fa',
          green: '#10b981',
          'green-neon': '#34d399',
          red: '#ef4444',
          'red-neon': '#f87171',
          cyan: '#06b6d4',
          'cyan-neon': '#22d3ee',
        },
      },
      animation: {
        'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'pulse-neon': 'pulseNeon 2s ease-in-out infinite',
        'glow': 'glow 2s ease-in-out infinite alternate',
        'fade-in': 'fadeIn 0.5s ease-in',
        'slide-up': 'slideUp 0.3s ease-out',
        'float': 'float 3s ease-in-out infinite',
        'shimmer': 'shimmer 2s linear infinite',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { transform: 'translateY(10px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        pulseNeon: {
          '0%, 100%': { 
            opacity: '1',
            boxShadow: '0 0 20px currentColor, 0 0 40px currentColor, 0 0 60px currentColor',
          },
          '50%': { 
            opacity: '0.8',
            boxShadow: '0 0 10px currentColor, 0 0 20px currentColor, 0 0 30px currentColor',
          },
        },
        glow: {
          '0%': { 
            boxShadow: '0 0 5px currentColor, 0 0 10px currentColor, 0 0 15px currentColor',
          },
          '100%': { 
            boxShadow: '0 0 10px currentColor, 0 0 20px currentColor, 0 0 30px currentColor, 0 0 40px currentColor',
          },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        shimmer: {
          '0%': { backgroundPosition: '-1000px 0' },
          '100%': { backgroundPosition: '1000px 0' },
        },
      },
      backgroundImage: {
        'gaming-gradient': 'linear-gradient(135deg, #0a0e27 0%, #1a1f3a 50%, #2a1f3a 100%)',
        'gaming-gradient-2': 'linear-gradient(135deg, #1e1b4b 0%, #312e81 50%, #4338ca 100%)',
        'neon-gradient': 'linear-gradient(135deg, #8b5cf6 0%, #3b82f6 50%, #06b6d4 100%)',
      },
    },
  },
  plugins: [],
};

export default config;
