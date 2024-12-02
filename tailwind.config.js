/** @type {import('tailwindcss').Config} */
export default {
  content:  ['./src/**/*.{html,js,svelte,ts}'],
  daisyui: {
    themes: [
      "light",
      "dark",
      {
        mytheme: {
          
"primary": "#fbbf24",
          
"secondary": "#86efac",
          
"accent": "#f59e0b",
          
"neutral": "#374151",
          
"base-100": "#181818",
          
"info": "#49b1ff",
          
"success": "#589d00",
          
"warning": "#f78f00",
          
"error": "#ff0059",
          },
        },
      ],
    },
  plugins: [
    require('daisyui'),
  ],
}

