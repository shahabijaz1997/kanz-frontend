import axios from "axios";
import { getEnv } from "../env";

const ENV = getEnv();

export const getCountries = (token: string) => {
    return axios.get(`${ENV.API_URL}/${ENV.API_VERSION}/countries`,{
        headers: {
            Authorization: `Bearer ${token}`
        },
    });
};