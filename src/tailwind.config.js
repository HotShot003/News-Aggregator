/** @type {import('tailwindcss').Config} */
module.exports = {
  purge: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'], // Specify the paths to all of the views and components that use Tailwind CSS classes
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      colors: {
        // You can extend or override Tailwind's default color palette here
        primary: '#3490dc',
        secondary: '#ffed4a',
        danger: '#e3342f',
      },
      fontFamily: {
        // Extend or add custom fonts
        sans: ['Inter', 'Helvetica', 'Arial', 'sans-serif'],
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
};
