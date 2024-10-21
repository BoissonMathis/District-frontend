module.exports = {
  purge: ["./src/**/*.{js,jsx,ts,tsx}", "./index.html"],
  darkMode: "class", // or 'media' or 'class'
  theme: {
    extend: {
      colors: {
        "custom-beige": "#FFF9ED",
        "custom-soft-brown": "#EDD3BA",
        "custom-brown": "#CDA178",
        "custom-gray-70": "rgba(229, 231, 235, 0.7)",
      },
      fontFamily: {
        sans: ["Roboto", "sans-serif"],
        heading: ["Open Sans", "sans-serif"],
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
};
