/** @type {import('tailwindcss').Config} */
import defaultTheme from 'tailwindcss/defaultTheme'

export default {
    content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
    darkMode: 'class',
    theme: {
        extend: {
            aspectRatio: {
                '4/5': '4 / 5',
                '5/4': '5 / 4',
            },
            borderRadius: {
                '2.5xl': '1.25rem',
            },
            borderWidth: {
                0.5: '0.5px',
                1.5: '1.5px',
            },
            fontFamily: {
                logo: ['Sofia', ...defaultTheme.fontFamily.sans],
                heading: ['Montserrat', ...defaultTheme.fontFamily.sans],
            },
            lineHeight: {
                4.5: '18px',
            },
            margin: {
                'navbar-left': '73px',
                'navbar-left-open': '245px',
            },
            maxWidth: {
                login: '350px',
            },
            padding: {
                13: '3.25rem' /* 52px */,
            },
            scrollMargin: {
                header: '61px',
            },
            width: {
                'navbar-left-open': '245px',
                58: '14.5rem',
            },
        },
    },
    plugins: [],
}
