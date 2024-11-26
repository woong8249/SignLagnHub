/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './index.html',
    './src/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      screens: {
        xsm: '360px',
        // sm: '640px',
        // md: '768px',
        // lg: '1024px',
        // xl: '1280px',
        // '2xl': '1536px',
      },
    },
  },
};

// font-thin: 100
// font-extralight: 200
// font-light: 300
// font-normal: 400
// font-medium: 500
// font-semibold: 600
// font-bold: 700
// font-extrabold: 800
// font-black: 900
