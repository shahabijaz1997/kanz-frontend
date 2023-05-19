import axios from "axios";
import { getEnv } from "../env";

const ENV = getEnv();

export const getInvestmentPhilisophyQuestions = (stepId: number, token: string) => {
    return axios.get(`${ENV.API_URL}/${ENV.API_VERSION}/philosophy?step=${stepId}`, {
        headers: {
            Authorization: `Bearer ${token}`
        },
    });
};

export const postInvestmentPhilisophyData = (payload: any, token: string) => {
    return axios.post(`${ENV.API_URL}/${ENV.API_VERSION}/philosophy`,payload, {
        headers: {
            Authorization: `Bearer ${token}`
        },
    });
};