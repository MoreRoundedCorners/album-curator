/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js,jsx}"],
  theme: {
    extend: {
      colors: {
        black: "#191624",
      },
      animation: {
        slideup: "slideup 1s ease-in-out",
        slidedown: "slidedown 1s ease-in-out",
        slideleft: "slideleft 1s ease-in-out",
        slideright: "slideright 1s ease-in-out",
        wave: "wave 1.2s linear infinite",
        slowfade: "slowfade 2.2s ease-in-out",
        bounce: "bounce 2s ease-in-out",
        "bounce-slow": "bounce 2s ease-in-out",
        "bounce-back": "bounce-back 1.5s ease-out",
      },
      keyframes: {
        slowfade: {
          from: { opacity: 0 },
          to: { opacity: 1 },
        },
        slideup: {
          from: { opacity: 0, transform: "translateY(25%)" },
          to: { opacity: 1, transform: "none" },
        },
        slidedown: {
          from: { opacity: 0, transform: "translateY(-25%)" },
          to: { opacity: 1, transform: "none" },
        },
        slideleft: {
          from: { opacity: 0, transform: "translateX(-20px)" },
          to: { opacity: 1, transform: "translateX(0)" },
        },
        slideright: {
          from: { opacity: 0, transform: "translateX(20px)" },
          to: { opacity: 1, transform: "translateX(0)" },
        },
        wave: {
          "0%": { transform: "scale(0)" },
          "50%": { transform: "scale(1)" },
          "100%": { transform: "scale(0)" },
        },
        bounce: {
          "0%": { opacity: 0, transform: "translateY(-25%)" },
          "25%": { opacity: 1, transform: "translateY(0)" },
          "50%": { opacity: 1, transform: "translateY(0)" },
          "100%": { opacity: 2, transform: "translateY(0)" },
          animationFillMode: "forward", // keep the final state after the animation is finished
          animationDuration: "2s", // set the animation duration to 2 seconds
        },
        // fadein: {
        //   from: { opacity: 0 },
        //   to: { opacity: 1 },
        // },
      },
    },
  },
  plugins: [],
};
