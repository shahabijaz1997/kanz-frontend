import axios from "axios";
import { getEnv } from "../env";

const ENV = getEnv();

export const signin = (payload: any) => {
    return axios.post(`${ENV.API_URL}/login`, payload);
};

export const signup = (payload: any) => {
    return axios.post(`${ENV.API_URL}/signup`, payload);
};

export const logout = (token: string) => {
    return axios.delete(`${ENV.API_URL}/logout`, {
        headers: {
            Authorization: `Bearer ${token}`
        },
    });
};

export const confirmToken = (payload: any) => {
    return axios.get(`${ENV.API_URL}/confirmation`, { params: payload });
};

export const resendConfirmToken = (payload: any, token: string) => {
    return axios.post(`${ENV.API_URL}/confirmation`, payload, {
        headers: {
            Authorization: `Bearer ${token}`
        },
    });
};