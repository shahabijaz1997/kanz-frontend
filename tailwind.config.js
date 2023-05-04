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
        extend: {
            boxShadow: {
                'cs-1': '0px 3px 8px rgba(0, 0, 0, 0.06), 0px 3px 7px rgba(0, 0, 0, 0.04)'
            },
        },
    },
    variants: {
        extend: {},
    },
    plugins: [],
}
