/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
    './node_modules/flowbite/**/*.js',
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
      },
      fontFamily: {
        cairo: "var(--font-cairo)", // Add this line
      },
    },
  },
  plugins: [require('flowbite/plugin')],
};
