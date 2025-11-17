/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#3B82F6',
        'navy': {
          50: '#f0f4f9',
          100: '#e1e8f0',
          200: '#c3d0e0',
          300: '#a5b8d0',
          400: '#8799bf',
          500: '#6980af',
          600: '#4a5fa3',
          700: '#1e3a8a',
          800: '#1e293b',
          900: '#0f172a',
        },
        'emerald': {
          50: '#f0fdf4',
          100: '#dcfce7',
          200: '#bbf7d0',
          300: '#86efac',
          400: '#4ade80',
          500: '#22c55e',
          600: '#16a34a',
          700: '#15803d',
          800: '#166534',
          900: '#145231',
        },
      },
    },
  },
  plugins: [
    require('@tailwindcss/forms'),
    require('@tailwindcss/typography'),
  ],
}
