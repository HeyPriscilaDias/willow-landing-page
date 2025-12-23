import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ["var(--font-inter)"],
        heading: ["var(--font-poppins)"],
      },
      spacing: {
        '5': '20px',   // Mobile horizontal padding
        '10': '40px',  // Tablet horizontal padding
        '16': '64px',  // Desktop horizontal padding
        '20': '80px',  // Mobile section padding
        '30': '120px', // Desktop section padding
      },
      borderRadius: {
        'button': '8px',  // Buttons (matches rounded-lg)
        'card': '12px',   // Cards
      },
      boxShadow: {
        'subtle': '0 1px 3px 0 rgb(0 0 0 / 0.1)',
      },
      colors: {
        heading: "#03120F",
        primary: "#252B37",
        secondary: "#535862",
        "status-good": "#062F29",
        "content-link": "#0278A2",
        'page-bg': '#F8FAFC',
        'card-bg': '#FFFFFF',
      },
    },
  },
  plugins: [],
};

export default config;
