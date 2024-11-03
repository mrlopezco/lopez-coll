// @ts-check
const { fontFamily } = require('tailwindcss/defaultTheme')
const colors = require('tailwindcss/colors')

/** @type {import("tailwindcss/types").Config } */
module.exports = {
  content: [
    './node_modules/pliny/**/*.js',
    './app/**/*.{js,ts,jsx,tsx}',
    './pages/**/*.{js,ts,tsx}',
    './components/**/*.{js,ts,tsx}',
    './layouts/**/*.{js,ts,tsx}',
    './data/**/*.mdx',
  ],
  darkMode: 'class',
  theme: {
    extend: {
      lineHeight: {
        11: '2.75rem',
        12: '3rem',
        13: '3.25rem',
        14: '3.5rem',
      },
      fontFamily: {
        sans: ['var(--font-space-grotesk)', ...fontFamily.sans],
      },
      boxShadow: {
        nextjs: '0 8px 20px rgb(0,0,0,0.12)',
        'nextjs-dark': '0 8px 20px rgb(255,255,255,0.12)',
      },
      colors: {
        primary: {
          50: '#eff4ff',
          100: '#dce6fd',
          200: '#c1d3fc',
          300: '#96b8fa',
          400: '#7aa2f7', // lighter blue
          500: '#34c7a9', // green
          600: '#1f7765', // darker green
          700: '#85ddcb', // lighter green
          800: '#ade8dc', // lighter lighter green
          900: '#212e87',
          950: '#191f52',
        },
        gray: colors.gray,
        dark: '#1A1B26',
      },
      zIndex: {
        60: '60',
        70: '70',
        80: '80',
      },
      typography: ({ theme }) => ({
        DEFAULT: {
          css: {
            a: {
              color: theme('colors.primary.500'),
              transition: 'color 0.3s ease', // Add transition property
              '&:hover': {
                color: theme('colors.primary.600'),
              },
              code: { color: theme('colors.primary.400') },
            },
            'h1,h2': {
              fontWeight: '700',
              letterSpacing: theme('letterSpacing.tight'),
            },
            h3: {
              fontWeight: '600',
            },
            code: {
              color: theme('colors.indigo.500'),
            },
          },
        },
        invert: {
          css: {
            a: {
              color: theme('colors.primary.500'),
              transition: 'color 0.3s ease', // Add transition property
              '&:hover': {
                color: theme('colors.primary.700'),
              },
              code: { color: theme('colors.primary.400') },
            },
            'h1,h2,h3,h4,h5,h6': {
              color: theme('colors.gray.100'),
            },
          },
        },
      }),
    },
  },
  plugins: [require('@tailwindcss/forms'), require('@tailwindcss/typography')],
}
