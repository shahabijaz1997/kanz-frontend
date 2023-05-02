module.exports = {
    mode: 'jit',
    purge: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'],
    darkMode: false, // or 'media' or 'class'
    theme: {
        fontFamily: {
            sans: ['Roboto', 'sans-serif'],
        },
        screens: {
            'screen1200': { 'max': '1200px' },
            'screen1024': { 'max': '1024px' },
            'screen991': { 'max': '991px' },
            'screen800': { 'max': '800px' },
            'screen500': { 'max': '500px' }
        },
        extend: {},
    },
    variants: {
        extend: {},
    },
    plugins: [],
}
