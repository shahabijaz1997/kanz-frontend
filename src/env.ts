export const APP_ENV = process.env.REACT_APP_ENV || "STAGING";

export const getEnv = () => {
    const env = APP_ENV.trim().toUpperCase();
    switch (env) {
        case "DEV":
            return {
                API_URL: 'http://localhost:3001',
                GOOGLE_API_KEY: process.env.REACT_APP_GOOGLE_API_KEY,
                LINKEDIN_API_KEY: process.env.REACT_APP_LINKEDIN_API_KEY,
                API_VERSION: '1.0'
            };
        case "STAGING":
            return {
                API_URL: 'https://kanz-staging-81f9fa8939e4.herokuapp.com',
                GOOGLE_API_KEY: process.env.REACT_APP_GOOGLE_API_KEY,
                LINKEDIN_API_KEY: process.env.REACT_APP_LINKEDIN_API_KEY,
                API_VERSION: '1.0'
            };
        case "QA":
            return {
                API_URL: 'https://kanz-financial-qa-655742173b06.herokuapp.com',
                GOOGLE_API_KEY: process.env.REACT_APP_GOOGLE_API_KEY,
                LINKEDIN_API_KEY: process.env.REACT_APP_LINKEDIN_API_KEY,
                API_VERSION: '1.0'
                
            };
        default:
            return {
            };
    }
};