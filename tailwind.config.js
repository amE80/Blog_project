/** @type {import('tailwindcss').Config} */
const { colors: defaultColors } = require('tailwindcss/defaultTheme')

module.exports = {
  content: ["./index.html", "./src/**/*.{html,js,vue}"],
  theme: {
    extend: {
      fontFamily: {
        headline: ["Oswald"],
        main: ["OpenSans"],
        mainB: ["OpenSansB"]
      },
      colors: {
        'mainRed': "#800000",
        'cream': "#ffebcd",
        'bloodRed' : "#880808",
        },
    },
    debugScreens: {
      position: ["top", "left"],
    },

    boxShadow: {
      "4xl":
        " inset 0 8px 8px -8px rgba(0, 0, 0,0.7) , inset 0 -8px 8px -8px rgba(0, 0, 0,0.7)",
    },
   
  },
  plugins: [require("tailwindcss-debug-screens")],
};
