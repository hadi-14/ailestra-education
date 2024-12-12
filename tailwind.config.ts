import aspectRatio from '@tailwindcss/aspect-ratio';
import tailwindcssAnimate from 'tailwindcss-animate';
import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: ['class'],
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        background: 'hsl(var(--background))',
        foreground: 'hsl(var(--foreground))',
        card: {
          DEFAULT: 'hsl(var(--card))',
          foreground: 'hsl(var(--card-foreground))',
        },
        popover: {
          DEFAULT: 'hsl(var(--popover))',
          foreground: 'hsl(var(--popover-foreground))',
        },
        primary: {
          DEFAULT: 'hsl(var(--primary))',
          foreground: 'hsl(var(--primary-foreground))',
        },
        secondary: {
          DEFAULT: 'hsl(var(--secondary))',
          foreground: 'hsl(var(--secondary-foreground))',
        },
        muted: {
          DEFAULT: 'hsl(var(--muted))',
          foreground: 'hsl(var(--muted-foreground))',
        },
        accent: {
          DEFAULT: 'hsl(var(--accent))',
          foreground: 'hsl(var(--accent-foreground))',
        },
        destructive: {
          DEFAULT: 'hsl(var(--destructive))',
          foreground: 'hsl(var(--destructive-foreground))',
        },
        border: 'hsl(var(--border))',
        input: 'hsl(var(--input))',
        ring: 'hsl(var(--ring))',
        chart: {
          '1': 'hsl(var(--chart-1))',
          '2': 'hsl(var(--chart-2))',
          '3': 'hsl(var(--chart-3))',
          '4': 'hsl(var(--chart-4))',
          '5': 'hsl(var(--chart-5))',
        },
      },
      borderRadius: {
        lg: 'var(--radius)',
        md: 'calc(var(--radius) - 2px)',
        sm: 'calc(var(--radius) - 4px)',
      },
      keyframes: {
		stickyEntry: {
		  '0%': { transform: 'translateY(-20%)', opacity: '0' },
		  '60%': { transform: 'translateY(5%)', opacity: '0.9' },
		  '100%': { transform: 'translateY(0)', opacity: '1' },
		},
		stickyExit: {
		  '0%': { transform: 'translateY(0)', opacity: '1' },
		  '50%': { transform: 'translateY(-5%)', opacity: '0.8' },
		  '100%': { transform: 'translateY(-20%)', opacity: '0' },
		},
	  },
	  
      animation: {
        stickyEntry: 'stickyEntry 0.5s ease-out',
        stickyExit: 'stickyExit 0.5s ease-in',

      },
    },
  },
  plugins: [aspectRatio, tailwindcssAnimate],
};

export default config;
