/** @type {import('tailwindcss').Config} */
export default {
    content: ['./src/**/*.{html,js,svelte,ts}'],
    theme: {
        extend: {
            colors: {
                primary: "#C0C0C0"
            }
        },
        fontFamily: {
            primary: ["'Playfair Display'", "serif"]
        }
    },
    plugins: []
};
