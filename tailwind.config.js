/**
 * @type {import('@types/tailwindcss/tailwind-config').TailwindConfig}
 */

module.exports = {
  content: [
    "./node_modules/flowbite/**/*.js",
    './pages/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    container: {
      center: true,
    },
    extend: {
      aspectRatio: {
        'small': ' 3 / 2',
        'sqar': '  2 / 2',
        'portarit': ' 3/ 4',
      },
    }
  },
  darkMode: ['class'],
  plugins: [require('@tailwindcss/aspect-ratio'),require('flowbite/plugin')],
}