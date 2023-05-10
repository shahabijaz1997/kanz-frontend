import axios from "axios";

export const signup = (payload: any) => {
    return axios.post(`http://localhost:3001/signup`, payload);
};