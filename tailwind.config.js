/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        'background': '#F3F9FF',
        'text-black': '#02004C',
        'keiken-blue': '#2196F3',
        'keiken-purple': '#5F43F0',
        'border-blue': '#DAE8F5',
      },
      fontFamily: {
        'roboto': ['Roboto', 'sans-serif'],
      },
      fontSize: {
        'xs': ['10px', '11.72px'],
        'base': ['16px', '18.75px'],
        'lg': ['20px', '23.44px'],
      },
      borderWidth: {
        '2': '2px',
        '1': '1px',
      },
      borderRadius: {
        'none-top': '5px 0px 0px 0px',
      },
      opacity: {
        '0': '0',
      },
      spacing: {
        '45': '45px', // for height and width
        '127': '127px',
        '650': '650px',
        '400': '400px',
      },
    },
  },
  plugins: [],
}

