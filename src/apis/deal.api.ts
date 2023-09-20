import axios from "axios";
import { getEnv } from "../env";

const ENV = getEnv();
export const getDealQuestion = (params: any, token: string) => {
    return axios.get(`${ENV.API_URL}/${ENV.API_VERSION}/settings/stepper`, {
        headers: {
            Authorization: `Bearer ${token}`
        },
        params
    });
};