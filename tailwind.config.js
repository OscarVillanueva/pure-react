const daysiUI = require('daisyui')

module.exports = {
  purge: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html', './dist/*.html'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      maxHeight: {
        "100": "46rem"
      }
    },
  },
  variants: {
    extend: {},
  },
  plugins: [
    daysiUI
  ],
  daysiui: {
    themes: [
      'bumblebee'
    ]
  }
}
