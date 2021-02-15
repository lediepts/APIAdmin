module.exports = {
  purge: ["./pages/**/*.{js,ts,jsx,tsx}", "./components/**/*.{js,ts,jsx,tsx}"],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      backgroundColor: ["active", "group-focus"],
      maxHeight: ["focus"],
      divideColor: ["group-hover"],
      opacity: ["disabled"],
      textColor: ["visited"],
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
};
