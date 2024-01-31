import axios from "axios";
import { getEnv } from "../env";

const ENV = getEnv();


export const getBlogs = () => {
    return axios.get(`${ENV.API_URL}/${ENV.API_VERSION}/blogs`); 
}
export const showBlog = (slug:any) => {
    return axios.get(`${ENV.API_URL}/${ENV.API_VERSION}/blogs/${slug}`); 
}