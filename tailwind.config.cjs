/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/*/*.jsx"],
  theme: {
    extend: {
      transitionProperty: {
        relativeProps: 'top, left, right, bottom,width, height, margin, padding, transform',
      }
    },
    fontFamily: {
      sans: ['Inter', 'sans-serif'],
      serif: ['Cormorant Garamond', 'serif'],
      serif2: ['Domine', 'serif'],
      mono: ['Roboto Mono', 'monospace']
    },
    colors: {
      green: '#1A8917',
      red: '#FF6464',
      white: '#fff',
      black: '#000',
      extremelightGray: '#E6E6E6',
      extremelightGray2: '#F2F2F2',
      lightGray: '#757575',
      darkGray: '#4A4A4A',
      blue: '#346FA5',
      yellow: '#FFC017',
    },
  },
  plugins: [
    require('@tailwindcss/typography'),

  ],
};