import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        robovm: {
          bg: '#0b1e3e',
          accent: '#d2618f',
          text: '#ffffff',
          'text-secondary': '#b0c4de',
          border: '#1a2f4f',
        },
      },
    },
  },
  plugins: [],
};
export default config;

