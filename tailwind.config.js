/** @type {import('tailwindcss').Config} */
export default {
  content: [
            "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {

        screens:{
      xs:"256px",    
      sm:"384px",
      md:"768px",
      lg:"1024px",
      xl:"1280px",
      "2xl":"1536px",
    },
    extend: {},
  },
  plugins: [require("daisyui")],
}

