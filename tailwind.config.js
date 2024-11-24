/** @type {import('tailwindcss').Config} */
// const defaultTheme = require("tailwindcss/defaultTheme");
import defaultTheme from "tailwindcss/defaultTheme";

export default {
    content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
    theme: {
        extend: {
            fontFamily: {
                logo: ["Sofia", ...defaultTheme.fontFamily.sans],
                heading: ["Montserrat", ...defaultTheme.fontFamily.sans],
                sans: ["Roboto", ...defaultTheme.fontFamily.sans],
            },
        },
    },
    plugins: [],
};
