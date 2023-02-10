/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{html,js,vue}"],  theme: {
    extend: {},
  },
  plugins: [],
  theme: {
    boxShadow: {
      '4xl': ' inset 0 8px 8px -8px rgba(0, 0, 0,0.25) , inset 0 -8px 8px -8px rgba(0, 0, 0,0.25)',
 
    },
    colors: {
      transparent: 'transparent',
      current: 'currentColor',
      'narenji': '#ff5450',
      'abi': '#e0ffff'
    }
  }
}
