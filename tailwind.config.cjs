/** @type {import('tailwindcss').Config} */
module.exports = {
  corePlugins: {
    preflight: false,
  },
  content: ['./src/**/*.{html,js,svelte,ts}'],
  theme: {
    extend: {
      colors: {
        primary: 'hsl(var(--color-primary) / <alpha-value>)',
        'primary-content': 'hsl(var(--color-primary-content) / <alpha-value>)',
        'base-content': 'hsl(var(--color-base-content) / <alpha-value>)',
      },
    },
  },
  plugins: [],
};
