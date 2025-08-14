import fluid, { extract, screens, fontSize } from 'fluid-tailwind';

/** @type {import('tailwindcss').Config} */
export default {
    darkMode: ['class'],
    content: { files: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'], extract },
  theme: {
  	extend: {
  		animation: {
  			scroll: 'scroll 10s linear infinite'
  		},
  		keyframes: {
  			scroll: {
  				'0%': {
  					transform: 'translateX(0%)'
  				},
  				'100%': {
  					transform: 'translateX(-50%)'
  				}
  			}
  		},
  		colors: {
  			cultark: {
  				green: '#A5F269',
  				blue: '#0F19D3',
  				orange: '#ED7837',
  				gray: '#2B2B2B',
  				white: '#F4F4F4',
  				'light-gray': '#DDDDDD',
  				'faded-white': '#F9F9F99E'
  			},
  			background: 'hsl(var(--background))',
  			foreground: 'hsl(var(--foreground))',
  			card: {
  				DEFAULT: 'hsl(var(--card))',
  				foreground: 'hsl(var(--card-foreground))'
  			},
  			popover: {
  				DEFAULT: 'hsl(var(--popover))',
  				foreground: 'hsl(var(--popover-foreground))'
  			},
  			primary: {
  				DEFAULT: 'hsl(var(--primary))',
  				foreground: 'hsl(var(--primary-foreground))'
  			},
  			secondary: {
  				DEFAULT: 'hsl(var(--secondary))',
  				foreground: 'hsl(var(--secondary-foreground))'
  			},
  			muted: {
  				DEFAULT: 'hsl(var(--muted))',
  				foreground: 'hsl(var(--muted-foreground))'
  			},
  			accent: {
  				DEFAULT: 'hsl(var(--accent))',
  				foreground: 'hsl(var(--accent-foreground))'
  			},
  			destructive: {
  				DEFAULT: 'hsl(var(--destructive))',
  				foreground: 'hsl(var(--destructive-foreground))'
  			},
  			border: 'hsl(var(--border))',
  			input: 'hsl(var(--input))',
  			ring: 'hsl(var(--ring))',
  			chart: {
  				'1': 'hsl(var(--chart-1))',
  				'2': 'hsl(var(--chart-2))',
  				'3': 'hsl(var(--chart-3))',
  				'4': 'hsl(var(--chart-4))',
  				'5': 'hsl(var(--chart-5))'
  			}
  		},
  		fontFamily: {
  			archivo: [
  				'Archivo',
  				'sans-serif'
  			],
  			manrope: [
  				'Manrope',
  				'sans-serif'
  			]
  		},
  		fontVariationSettings: {
  			archivo: 'wdth" 100',
  			'width-min': 'wdth" 50',
  			'width-normal': 'wdth" 100',
  			'width-max': 'wdth" 200'
  		},
  		fontSize: {},
  		gridTemplateColumns: {
  			'custom-3': '40% 60%',
  			'custom-2': '50% 50%',
  			'custom-1': '100%',
  			'inner-1': '57% 43%'
  		},
  		borderRadius: {
  			lg: 'var(--radius)',
  			md: 'calc(var(--radius) - 2px)',
  			sm: 'calc(var(--radius) - 4px)'
  		}
  	}
  },
  plugins: [
    fluid,
    function ({ addUtilities }) {
      const newUtilities = {
        '.text-width-min': {
          fontVariationSettings: '"wdth" 50',
        },
        '.text-width-normal': {
          fontVariationSettings: '"wdth" 100',
        },
        '.text-width-max': {
          fontVariationSettings: '"wdth" 200',
        },
      };

      addUtilities(newUtilities);
    },

    function ({ addUtilities }) {
      const newUtilities = {
        '.text-horizontal': {
          writingMode: 'horizontal-tb',
        },
        '.text-vertical-lr': {
          writingMode: 'vertical-lr',
        },
        '.text-vertical-rl': {
          writingMode: 'vertical-rl',
        },
      };

      addUtilities(newUtilities);
    },
      require("tailwindcss-animate")
],
};
