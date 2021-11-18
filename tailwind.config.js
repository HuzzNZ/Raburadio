module.exports = {
  mode: 'jit',
  purge: ['./components/**/*.{js,jsx,ts,tsx}', './pages/**/*.{js,jsx,ts,tsx}'],
  darkMode: 'class', // or 'media' or 'class'
  theme: {
    extend: {
      colors: {
        background: {
          main: {
            light: "#ffffff",
            dark: "#232628"
          },
          sidebar: {
            light: "#e7e8ea",
            dark: '#303334'
          }
        },
        dark: {
          '50': '#292c2d',
          '100': '#313637',
          '150': '#393d3e',
          '200': '#424546',
        },
        gray: {
          '150': '#ebeced'
        },
        primary: "#ef4444",
        secondary: "#8b8b8b",
        instrumental: "#4264ff",
        radio: "#ff8a42"
      },
      spacing: {
        '26': '6.5rem',
        '138': '34.5rem',
        '140': '35rem',
        '144': '36rem',
        '192': '48rem'
      }
    },
    rotate: {
      '355': '355deg'
    },
    transitionProperty: ['hover'],
    fontSize: {
      'xxs': '.625rem',
      'xs': '.75rem',
      'sm': '.875rem',
      'base': '1rem',
      'lg': '1.125rem',
      'xl': '1.25rem',
      '2xl': '1.5rem',
      '3xl': '1.875rem',
      '4xl': '2.25rem',
      '5xl': '3rem',
      '6xl': '4rem',
      '7xl': '5rem'
    },
    backdropFilter: {
      'none': 'none',
      'blur': 'blur(12px)',
    }
  },
  maxWidth: {
    '1/2': '50%'
  },
  minWidth: {
    '12': '3rem'
  },
  variants: {
    extend: {},
  },
  plugins: [
    require('tailwindcss-filters'),
  ],
}
