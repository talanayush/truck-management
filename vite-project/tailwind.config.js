/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: { backgroundImage: { 'my-image' : "url('./assets/logix.jpg')", }, },
  },
  plugins: [
    require('daisyui'),
  ],
}

