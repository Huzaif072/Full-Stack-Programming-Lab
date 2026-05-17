/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          orange:  '#f78c2a',
          dark:    '#1f1f1f',
          brown:   '#8b5d33',
          cream:   '#f4f4f4',
          warm:    '#c5c5c5',
          footer:  '#dedede',
          border:  '#d5d5d5',
          text:    '#3a3a3a',
          light:   '#fbfbfb',
        }
      },
      fontFamily: {
        display: ['var(--font-playfair)', 'Georgia', 'serif'],
      },
    },
  },
  plugins: [],
};
