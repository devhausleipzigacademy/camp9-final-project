/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
      colors: {
        green: '#4D9979',
        yellow: '#FEBF10',
        tierblue: '#038b91',
      },
      boxShadow: {
        shadow: '-4px 4px rgba(0, 0, 0, 0.9)',
      },
      borderRadius: {
        round: '4px',
      },
      width: {
        8.5: '31px',
      },
      height: {
        8.5: '31px',
      },
    },
  },
  plugins: [],
};
