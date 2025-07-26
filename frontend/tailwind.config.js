import daisyui from "daisyui";

/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{html,js,jsx}"],
  theme: {
    extend: {
      animation: {
        modal: "modal 0.5s",
      },
      keyframes: {
        modal: {
          from: {
            top: "-200px",
            opacity: "0",
          },
          to: {
            top: "0",
            opacity: "1",
          },
        },
      },
    },
  },
  plugins: [daisyui],
  daisyui: {
    themes: ["cupcake"],
  },
};
