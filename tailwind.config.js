/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{vue,js,ts,jsx,tsx}"],
  theme: {
    extend: {
      backgroundImage: {
        "home-page": "url('./assets/homepage.jpg')",
      },
      transitionDelay: {},
    },
  },
  plugins: [],
};
