/** @type {import('tailwindcss').Config} */

// const {colors:defaultColors} = require('tailwindcss/defaultTheme')
// const colors ={
//   ...defaultColors,
//   ...{
//     "custom-yellow":{
//       "500": "#edae0a",
//     },
//   },
// }
module.exports = {
  content: ["./index.html", "./src/**/*.{html,js,vue}"],
  theme: {
    extend: {
      fontFamily: {
        headline: ["Oswald"],
        main: ["OpenSans"],
        mainB: ["OpenSansB"]
      },
    },
    debugScreens: {
      position: ["top", "left"],
    },

    boxShadow: {
      "4xl":
        " inset 0 8px 8px -8px rgba(0, 0, 0,0.7) , inset 0 -8px 8px -8px rgba(0, 0, 0,0.7)",
    },
    colors: {
      brwn: "#800000",
      crm: "#ffebcd",
      gray: "rgba(0,0,0,0.6)",
      lightGray: "rgba(0,0,0,0.3)",
      red : "#880808",
      black : '#000',
      white : '#fff',
    },
  },
  plugins: [require("tailwindcss-debug-screens")],
};
