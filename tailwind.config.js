/** @type {import('tailwindcss').Config} */
export default {
  content: [
            "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {

        screens:{
      sm:"200px",
      md:"768px",
      lg:"1024px",
      xl:"1280px",
      "2xl":"1536px",
    },
    extend: {},
  },
  plugins: [require("daisyui")],
}

