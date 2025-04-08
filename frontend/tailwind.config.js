/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'selector',
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./pages/Auth/**/*.{js,ts,jsx,tsx,mdx}",
    "./pages/Car_Models/**/*.{js,ts,jsx,tsx,mdx}",
    "./pages/Home/**/*.{js,ts,jsx,tsx,mdx}",
    "./pages/Products/**/*.{js,ts,jsx,tsx,mdx}",
    "./pages/Dashboard/**/*.{js,ts,jsx,tsx,mdx}",
    "./pages/Store/**/*.{js,ts,jsx,tsx,mdx}",
    "./Home/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./Home/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  mode: "jit",
  theme: {
    extend: {
      fontFamily: {
        inter: ["Inter", "sans-serif"],
      },
      colors: {
        "black-100": "#2B2C35",
        "blue": "#2997FF",
        "primary-blue": {
          DEFAULT: "#2B59FF",
          100: "#F5F8FF",
        },
        "secondary-orange": "#f79761",
        "light-white": {
          DEFAULT: "rgba(59,60,152,0.03)",
          100: "rgba(59,60,152,0.02)",
        },
        grey: {
          DEFAULT: "#86868b",
          100: "#94928d",
          200: "#afafaf",
          300: "#42424570",
        },
        zinc: "#101010",
        grey: "#747A88",
        'hover-blue': '#4320df',
        'light-blue': '#F9F8FF',
        'border-blue': '#D5CBFF',
        'text-blue': '#6652BE',
        'placeholder-blue': '#9284c8',
        'icon-blue': '#a395e0',
        'focus-blue': '#917DE8',
        'border-border': '#D5CBFF',
        "background": 'hsl(var(--background))',
        "foreground": 'hsl(var(--foreground))',
        "sidebar-background": 'hsl(var(--sidebar-background))',
        "sidebar-foreground": 'hsl(var(--sidebar-foreground))',
        "sidebar-primary": 'hsl(var(--sidebar-primary))',
        "sidebar-primary-foreground": 'hsl(var(--sidebar-primary-foreground))',
        "sidebar-accent": 'hsl(var(--sidebar-accent))',
        "sidebar-accent-foreground": 'hsl(var(--sidebar-accent-foreground))',
        "sidebar-border": 'hsl(var(--sidebar-border))',
        "sidebar-ring": 'hsl(var(--sidebar-ring))',
      },
      backgroundImage: {
        'pattern': "url('/pattern.png')",
        'hero-bg': "url('/hero-bg.png')"
      }
    },
  },
  plugins: [],
};
