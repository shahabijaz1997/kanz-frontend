import axios from "axios";
import { getEnv } from "../env";

const ENV = getEnv();

export const getInvestmentPhilisophyQuestions = (stepId: number, token: string) => {
    return axios.get(`${ENV.API_URL}/philosophy?step=${stepId}`, {
        headers: {
            Authorization: `Bearer ${token}`
        },
    });
};