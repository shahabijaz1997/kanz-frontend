import axios from "axios";
import { getEnv } from "../env";

const ENV = getEnv();


export const getBalance = (token: string) => {
    return axios.get(
      `${ENV.API_URL}/${ENV.API_VERSION}/wallet`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
  };
export const getTransactions = (token: string , currentPage:number) => {
  let queryParameters = new URLSearchParams();
  queryParameters.append("page", currentPage.toString());
    return axios.get(
      `${ENV.API_URL}/${ENV.API_VERSION}/transactions?${queryParameters.toString()}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
  };
  export const createTransaction = (payload: any, token: string) => {
    return axios.post(`${ENV.API_URL}/${ENV.API_VERSION}/transactions`, payload, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  };
  export const getCurrentConversionRate = ( token: string) => {
    return axios.get(`${ENV.API_URL}/${ENV.API_VERSION}/exchange_rate`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  };