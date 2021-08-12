const tailwindcss = require('tailwindcss');
const presetEnv = require('postcss-preset-env');

module.exports = {
  plugins: [
    presetEnv,
    tailwindcss,
  ],
};