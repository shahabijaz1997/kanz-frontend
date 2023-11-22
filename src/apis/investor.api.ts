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

export const getInvitees = (inviteeID:any ,token: string, filters :any) => {
  const queryParameters = new URLSearchParams();
  if (filters !== "All"){
    queryParameters.append("status", filters.toLowerCase());
  }
  const apiUrl = `${ENV.API_URL}/${ENV.API_VERSION}/invitees/${inviteeID}/invites?${queryParameters.toString()}`;
  return axios.get(apiUrl, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
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

  export const getFollowedSyndicates = (token: string) => {
  const queryParameters = new URLSearchParams();
  queryParameters.append("followed", "true");
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
    return axios.post(`${ENV.API_URL}/${ENV.API_VERSION}/syndicates/${syndicateID}/syndicate_members`, payload, {
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

