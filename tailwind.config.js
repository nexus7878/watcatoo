/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        watcatoo: {
          bg: '#080A09',
          surface: '#101411',
          card: '#151A16',
          'card-hover': '#1B221D',
          primary: '#39E66B',
          secondary: '#20C45A',
          'text-primary': '#F5F7F5',
          'text-secondary': '#A0AAA2',
          border: '#262D28',
          'border-focus': 'rgba(57, 230, 107, 0.45)',
        }
      },
      fontFamily: {
        sans: ['Outfit', 'Inter', 'system-ui', '-apple-system', 'sans-serif'],
        display: ['Outfit', 'Inter', 'system-ui', 'sans-serif'],
      },
      boxShadow: {
        'subtle-glow': '0 0 20px -5px rgba(57, 230, 107, 0.25)',
        'hero-card': '0 20px 40px -15px rgba(0, 0, 0, 0.7)',
        'modal': '0 25px 60px -12px rgba(0, 0, 0, 0.85)',
      },
      backgroundImage: {
        'hero-gradient': 'linear-gradient(180deg, rgba(8, 10, 9, 0.3) 0%, rgba(8, 10, 9, 0.8) 70%, #080A09 100%)',
        'hero-radial': 'radial-gradient(circle at 60% 40%, rgba(57, 230, 107, 0.08) 0%, transparent 60%)',
        'card-gradient': 'linear-gradient(180deg, rgba(21, 26, 22, 0) 0%, rgba(21, 26, 22, 0.95) 100%)',
      }
    },
  },
  plugins: [],
}
