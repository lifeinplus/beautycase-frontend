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
            margin: {
                navbar: '73px',
                'navbar-open': '245px',
            },
            maxWidth: {
                login: '350px',
            },
            padding: {
                13: '3.25rem' /* 52px */,
                navbar: '73px',
                'navbar-open': '245px',
            },
            scrollMargin: {
                header: '61px',
            },
            spacing: {
                'safe-top': 'env(safe-area-inset-top)',
                'safe-bottom': 'env(safe-area-inset-bottom)',
                'safe-left': 'env(safe-area-inset-left)',
                'safe-right': 'env(safe-area-inset-right)',
            },
            width: {
                'navbar-open': '245px',
                58: '14.5rem',
            },
        },
    },
    plugins: [],
}
