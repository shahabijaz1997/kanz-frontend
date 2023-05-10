import axios from "axios";

export const signup = (payload: any) => {
    return axios.post(``, payload);
};