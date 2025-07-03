/** @type {import('tailwindcss').Config} */
import vueformPlugin from '@vueform/vueform/tailwind'

export default {
  important: "#app",
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
    "./node_modules/flowbite/**/*.js",
    './vueform.config.js',
    './node_modules/@vueform/vueform/themes/tailwind/**/*.vue',
    './node_modules/@vueform/vueform/themes/tailwind/**/*.js',
  ],
  plugins: [
    require('flowbite/plugin'),
    require('@tailwindcss/typography'),
    vueformPlugin
  ],
  darkMode: 'class',
  theme: {
    extend: {
      typography: {
        DEFAULT: {
          css: {
            maxWidth: '100%', // add required value here
          }
        }
      },
      themes: {
        dark: {
          bg: "#000"
        }
      },
      colors: {
        bg: "#fff",
        primary: {
          50: '#f0f9ff',
          "50": "#EBF5FF", "100": "#E1EFFE", "200": "#C3DDFD", "300": "#A4CAFE",
          "400": "#76A9FA", "500": "#3F83F8", "600": "#1C64F2", "700": "#1A56DB",
          "800": "#1E429F", "900": "#233876"
        },
        submit: '#1068bf',
      }
    },
    fontFamily: {
      'sans': [
        'Inter',
        'ui-sans-serif',
        'system-ui',
        '-apple-system',
        'Segoe UI',
        'Roboto',
        'Helvetica Neue',
        'Arial',
        'Noto Sans',
        'sans-serif',
        'Apple Color Emoji',
        'Segoe UI Emoji',
        'Segoe UI Symbol',
        'Noto Color Emoji'
      ],
      'body': [
        'Inter',
        'ui-sans-serif',
        'system-ui',
        '-apple-system',
        'Segoe UI',
        'Roboto',
        'Helvetica Neue',
        'Arial',
        'Noto Sans',
        'sans-serif',
        'Apple Color Emoji',
        'Segoe UI Emoji',
        'Segoe UI Symbol',
        'Noto Color Emoji'
      ]
    }
  }
}