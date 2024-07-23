module.exports = {
  purge: ['./src/**/*.{js,jsx,ts,tsx}', './index.html'],
  darkMode: "class", // or 'media' or 'class'
  theme: {
    extend: {
      colors: {
        'custom-beige': '#FFF9ED',
        'custom-soft-brown': '#EDD3BA',
        'custom-brown': '#CDA178',
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
};

