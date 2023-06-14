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
        teal: {
          DEFAULT: '#038B91',
          light: '#2F9CA1',
        },
        green: {
          DEFAULT: '#4D9979',
          light: '#79CB65',
        },
        peach: {
          DEFAULT: '#FA9A5D',
          light: '#FFB47D',
        },
        yellow: {
          DEFAULT: '#FEBF10',
          light: '#FFEDBC',
        },
        grey: '#BCBCBC',
        red: '#FA1911',
      },
      boxShadow: {
        shadow: '-4px 4px rgba(0, 0, 0, 0.9)',
      },
      borderRadius: {
        round: '4px',
      },
      width: {
        8.5: '31px',
        25: '6.25rem',
        18: '4.5rem',
      },
      height: {
        8.5: '31px',
        18: '4.5rem',
        15: '3.75rem',
      },
      borderWidth: {
        3: '3px',
      },
    },
    plugins: [],
  },
};
