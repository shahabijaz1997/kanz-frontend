import axios from "axios";
import { getEnv } from "../env";

const ENV = getEnv();

export const selectInvestorType = (payload: any, token: string) => {
    return axios.post(`${ENV.API_URL}/${ENV.API_VERSION}/investors/type`, payload, {
        headers: {
            Authorization: `Bearer ${token}`
        },
    });
};

export const investmentAccridiation = (payload: any, token: string) => {
    return axios.post(`${ENV.API_URL}/${ENV.API_VERSION}/investors/accreditation`, payload, {
        headers: {
            Authorization: `Bearer ${token}`
        },
    });
};

export const getAllInvestors = (token: string) => {
    return axios.get(
      `${ENV.API_URL}/${ENV.API_VERSION}/syndicate_members`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
  };

export const getInvites = (token: string, filters :any) => {
    const queryParameters = new URLSearchParams();
    if (filters !== "All"){
      queryParameters.append("status", filters.toLowerCase());
    }
    const apiUrl = `${ENV.API_URL}/${ENV.API_VERSION}/invites?${queryParameters.toString()}`;
    return axios.get(apiUrl, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  };
  export const getCommittments = (token: string, filters :any) => {
    const queryParameters = new URLSearchParams();
    if (filters !== "All"){
      queryParameters.append("status", filters.toLowerCase());
    }
    const apiUrl = `${ENV.API_URL}/${ENV.API_VERSION}/committed?${queryParameters.toString()}`;
    return axios.get(apiUrl, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  };





export const getInvestor = (token: string) => {
    return axios.get(`${ENV.API_URL}/${ENV.API_VERSION}/investors`, {
        headers: {
            Authorization: `Bearer ${token}`
        },
    });
};