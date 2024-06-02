/** @type {import('tailwindcss').Config} */
export const content = [
  './views/**/*.ejs'
];
export const theme = {
  extend: {},
};
export const plugins = [
  require('@tailwindcss/forms'),
  require('@tailwindcss/typography'),
];

