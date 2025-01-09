/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        theme: {
          primary: "rgb(194, 232, 217)",
          secondary: 'rgb(222, 222, 222)',
          highlight: 'rgb(255, 127, 0)',
        }
      },
      fontFamily: {
        customHeading: 'Trebuchet MS',
        customPara: 'Cambria',
        customParaTwo: "Cochin",
        playwrite: 'Playwrite NG Modern, serif',
        bebas: 'Bebas Neue, serif',
      }

    },
  },
  plugins: [],
}