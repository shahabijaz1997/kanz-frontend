import axios from "axios";
import { getEnv } from "../env";

const ENV = getEnv();

export const signup = (payload: any) => {
    return axios.post(`${ENV.API_URL}/signup`, payload);
};

export const confirmToken = (payload: any) => {
    return axios.get(`${ENV.API_URL}/confirmation`, { params: payload});
};