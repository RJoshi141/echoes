import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        black: "#0a0908",
        "night-bordeaux": "#49111c",
        "white-smoke": "#f2f4f3",
        "dusty-taupe": "#a9927d",
        "stone-brown": "#5e503f",
      },
    },
  },
  plugins: [],
};
export default config;

