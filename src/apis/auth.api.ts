import axiosInstance from './request-parser';
import { getEnv } from "../env";

const ENV = getEnv();

export const signin = (payload: any) => {
    return axiosInstance.post(`${ENV.API_URL}/login`, payload);
};

export const signup = (payload: any) => {
    return axiosInstance.post(`${ENV.API_URL}/signup`, payload);
};

export const logout = (token: string) => {
    return axiosInstance.delete(`${ENV.API_URL}/logout`, {
        headers: {
            Authorization: `Bearer ${token}`
        },
    });
};

export const confirmToken = (payload: any) => {
    return axiosInstance.get(`${ENV.API_URL}/confirmation`, { params: payload });
};

export const selectInvestorType = (payload: any, token: string) => {
    return axiosInstance.post(`${ENV.API_URL}/investor/type`, payload, {
        headers: {
            Authorization: `Bearer ${token}`
        },
    });
};

export const investmentAccridiation = (payload: any, token: string) => {
    return axiosInstance.post(`${ENV.API_URL}/investor/accreditation`, payload, {
        headers: {
            Authorization: `Bearer ${token}`
        },
    });
};


export const getInvestor = ( token: string) => {
    return axiosInstance.get(`${ENV.API_URL}/investor`,{
        headers: {
            Authorization: `Bearer ${token}`
        },
    });
};