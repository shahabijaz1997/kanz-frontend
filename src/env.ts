export const APP_ENV = process.env.REACT_APP_ENV || "DEV";

export const getEnv = () => {
    const env = APP_ENV.trim().toUpperCase();
    switch (env) {
        case "DEV":
            return {
                API_URL: 'http://localhost:3001',
            };
        case "STAGING":
            return {
                API_URL: 'http://localhost:3001',
            };
        case "QA":
            return {

            };
        default:
            return {
            };
    }
};