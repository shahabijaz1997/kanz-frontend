import axios from "axios";
import { getEnv } from "../env";

const ENV = getEnv();

export const selectInvestorType = (investorID: any, payload: any, token: string) => {
    return axios.post(`${ENV.API_URL}/${ENV.API_VERSION}/investors/${investorID}/investor_type`, payload, {
        headers: {
            Authorization: `Bearer ${token}`
        },
    });
};

export const investmentAccridiation = (investorID: any, payload: any, token: string) => {
    return axios.post(`${ENV.API_URL}/${ENV.API_VERSION}/investors/${investorID}/accreditation`, payload, {
        headers: {
            Authorization: `Bearer ${token}`
        },
    });
};

export const getAllDeals = ( token: string, filters :any, searchQuery:string, currentPage:number) => {
  const queryParameters = new URLSearchParams();
  if (filters !== "all"){
    queryParameters.append("deal_type", filters.toLowerCase());
  }
  queryParameters.append("page", currentPage.toString())
  if (searchQuery.trim() !== "") {
    queryParameters.append("search", searchQuery);
  }
  const apiUrl = `${ENV.API_URL}/${ENV.API_VERSION}/investors/deals?${queryParameters.toString()}`;
  return axios.get(apiUrl, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};
export const getCommitedDeals = ( token: string, filters :any, searchQuery:string, currentPage:number) => {
  const queryParameters = new URLSearchParams();
  queryParameters.append("page", currentPage.toString())
  if (filters !== "all"){
    queryParameters.append("deal_type", filters.toLowerCase());    
  }
  if (searchQuery.trim() !== "") {
    queryParameters.append("search", searchQuery);
  }
  const apiUrl = `${ENV.API_URL}/${ENV.API_VERSION}/investors/deals?invested=true&${queryParameters.toString()}`;
  return axios.get(apiUrl, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};
  export const getFollowedSyndicates = (token: string, searchQuery:string, currentPage:number, filters:any) => {
  const queryParameters = new URLSearchParams();
  queryParameters.append("page", currentPage.toString())
  queryParameters.append("mine", "true");
  queryParameters.append("status",filters.toString())
  if (searchQuery.trim() !== "") {
    queryParameters.append("search", searchQuery);
  }
    return axios.get(
      `${ENV.API_URL}/${ENV.API_VERSION}/syndicates/all?${queryParameters.toString()}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
  };
  export const getPendingSyndicates = (token: string, searchQuery:string, currentPage:number) => {
  const queryParameters = new URLSearchParams();
  queryParameters.append("page", currentPage.toString())
  queryParameters.append("pending", "true");
  if (searchQuery.trim() !== "") {
    queryParameters.append("search", searchQuery);
  }
    return axios.get(
      `${ENV.API_URL}/${ENV.API_VERSION}/syndicates/all?${queryParameters.toString()}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
  };


  export const postFollowSyndicate = (payload: any, syndicateID :any, token: string) => {
    return axios.post(`${ENV.API_URL}/${ENV.API_VERSION}/syndicates/${syndicateID}/invites`, payload, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  };


  export const postunFollowSyndicate = ( syndicateID :any, memeberId:any , token: string) => {
    return axios.delete(`${ENV.API_URL}/${ENV.API_VERSION}/syndicates/${syndicateID}/syndicate_members/${memeberId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  };

export const getInvestor = (investorID:any, token: string) => {
    return axios.get(`${ENV.API_URL}/${ENV.API_VERSION}/investors/${investorID}`, {
        headers: {
            Authorization: `Bearer ${token}`
        },
    });
};

export const getSyndicateInfo = (token: string, syndID:any) => {
    return axios.get(`${ENV.API_URL}/${ENV.API_VERSION}/syndicates/${syndID}`, {
        headers: {
            Authorization: `Bearer ${token}`
        },
    });
};

