/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './stories/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        teal: '#038B91',
        green: '#4D9979',
        peach: '#FA9A5D',
        yellow: '#FEBF10',
        yellowLight: '#FFEDBC',
      },
      borderWidth: {
        3: '3px',
      },
      boxShadow: {
        brutalist: '-4px 4px 0px black',
      },
    },
  },
  plugins: [],
};
