<<<<<<< HEAD
/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        dark: {
          100: '#1E1E2E',
          200: '#252536',
          300: '#2D2D3F',
          400: '#353548',
          500: '#3E3E52',
        },
        accent: {
          purple: '#8A2BE2',
          blue: '#4169E1',
          pink: '#FF10F0'
        }
      },
      animation: {
        'float': 'float 6s ease-in-out infinite',
        'glow': 'glow 2s ease-in-out infinite alternate',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-20px)' },
        },
        glow: {
          '0%': { boxShadow: '0 0 5px #8A2BE2, 0 0 10px #8A2BE2, 0 0 15px #8A2BE2' },
          '100%': { boxShadow: '0 0 10px #4169E1, 0 0 20px #4169E1, 0 0 30px #4169E1' },
        }
      }
    },
  },
  plugins: [],
=======
/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        dark: {
          100: '#1E1E2E',
          200: '#252536',
          300: '#2D2D3F',
          400: '#353548',
          500: '#3E3E52',
        },
        accent: {
          purple: '#8A2BE2',
          blue: '#4169E1',
          pink: '#FF10F0'
        }
      },
      animation: {
        'float': 'float 6s ease-in-out infinite',
        'glow': 'glow 2s ease-in-out infinite alternate',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-20px)' },
        },
        glow: {
          '0%': { boxShadow: '0 0 5px #8A2BE2, 0 0 10px #8A2BE2, 0 0 15px #8A2BE2' },
          '100%': { boxShadow: '0 0 10px #4169E1, 0 0 20px #4169E1, 0 0 30px #4169E1' },
        }
      }
    },
  },
  plugins: [],
>>>>>>> 734fbeb581725ac365e00435a2cf9275fc3673fc
}