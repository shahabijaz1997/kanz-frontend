export const APP_ENV = process.env.REACT_APP_ENV || "STAGING";

export const getEnv = () => {
    const env = APP_ENV.trim().toUpperCase();
    switch (env) {
        case "DEV":
            return {
                API_URL: 'http://localhost:3001',
                GOOGLE_API_KEY: '20076641404-8jarp92hvugp1f79kjct3a207rhe6ioe.apps.googleusercontent.com',
                LINKEDIN_API_KEY: '78e3u46jrqg1rq',
                API_VERSION: '1.0',
                resendTries: 5
            };
        case "STAGING":
            return {
                API_URL: 'https://limitless-refuge-86846.herokuapp.com',
                GOOGLE_API_KEY: '20076641404-8jarp92hvugp1f79kjct3a207rhe6ioe.apps.googleusercontent.com',
                LINKEDIN_API_KEY: '78e3u46jrqg1rq',
                API_VERSION: '1.0',
                resendTries: 5
            };
        case "QA":
            return {

            };
        default:
            return {
            };
    }
};