import axios from "axios";
import { getEnv } from "../env";

const ENV = getEnv();

export const postPropertyOwnerInformation = (payload: any, token: string) => {
    return axios.post(`${ENV.API_URL}/${ENV.API_VERSION}/property_owners`, payload, {
        headers: {
            Authorization: `Bearer ${token}`
        },
    });
};

export const getPropertyOwnerInformation = (stepId: number, token: string) => {
    return axios.get(`${ENV.API_URL}/${ENV.API_VERSION}/property_owners/${stepId}`, {
        headers: {
            Authorization: `Bearer ${token}`
        },
    });
};