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
export const getTransactions = (token: string ,query : string, currentPage:number) => {
    return axios.get(
      `${ENV.API_URL}/${ENV.API_VERSION}/transactions`,
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