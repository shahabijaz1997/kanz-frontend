export const APP_ENV = process.env.REACT_APP_ENV || "STAGING";

export const getEnv = () => {
    const env = APP_ENV.trim().toUpperCase();
    switch (env) {
        case "DEV":
            return {
                API_URL: 'http://localhost:3001',
                API_VERSION: '1.0'
            };
            case "STAGING":
                return {
                    API_URL: 'https://limitless-refuge-86846.herokuapp.com',
                    API_VERSION: '1.0'
            };
        case "QA":
            return {

            };
        default:
            return {
            };
    }
};