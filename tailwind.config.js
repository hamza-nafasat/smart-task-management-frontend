/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: 'rgba(23, 162, 184, 1)'
      },
      backgroundImage: {
        linearGrad: 'linear-gradient(89.49deg, #92A3FF 8.79%, #55C8FF 99.54%)',
      }
    },
  },
  plugins: [],
};
