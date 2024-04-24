/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './components/**/*.{js,vue,ts}',
    './layouts/**/*.vue',
    './pages/**/*.vue',
    './plugins/**/*.{js,ts}',
    './nuxt.config.{js,ts}',
    './app.vue',
  ],
  theme: {
    extend: {
      colors: {
        'green': {
          100: '#E9F6F6',
          200: '#D4EEED',
          300: '#BEE5E3',
          400: '#A9DDDA',
          500: '#93D4D1',
          600: '#7ECBC8',
          700: '#69C3BF',
          800: '#53BAB5',
          900: '#3EB2AC',
          DEFAULT: '#28A9A3',
        },
        'gh-purple': {
          DEFAULT: '#5b64a8',
        },
        'base-navy': {
          DEFAULT: '#2f4259',
        },
        'kurokamome-yellow': {
          DEFAULT: '#ebad33',
        }
      }
    },
  },
  plugins: [
    // require('@tailwindcss/forms')
  ],
}
