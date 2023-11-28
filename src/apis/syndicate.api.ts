import axios from "axios";
import { getEnv } from "../env";

const ENV = getEnv();

export const postSyndicateInformation = (payload: number, token: string) => {
  return axios.post(`${ENV.API_URL}/${ENV.API_VERSION}/syndicates`, payload, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};



export const getAllInvestors = ( dealId:any, token: string) => {
  return axios.get(
    `${ENV.API_URL}/${ENV.API_VERSION}/deals/${dealId}/investors`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
};

export const getGroupInvestors = ( token:any, filters:any) => {
  const queryParameters = new URLSearchParams();
  if (filters !== "all")
  queryParameters.append("connection", filters.toLowerCase());
  const apiUrl = `${ENV.API_URL}/${ENV.API_VERSION}/syndicate_members?${queryParameters.toString()}`;
  return axios.get(apiUrl, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const getAllSyndicates = (dealId: any, token: string) => {
  return axios.get(
    `${ENV.API_URL}/${ENV.API_VERSION}/deals/${dealId}/invites`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
};

export const getSyndicatetoInvite = (dealId: any, token: string) => {
  return axios.get(
    `${ENV.API_URL}/${ENV.API_VERSION}/deals/${dealId}/syndicates`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
};
export const getDealInvestors = (dealId: any, token: string) => {
  return axios.get(
    `${ENV.API_URL}/${ENV.API_VERSION}/deals/${dealId}/investments`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
};


export const getDealActivity = (dealId: any, token: string) => {
  return axios.get(
    `${ENV.API_URL}/${ENV.API_VERSION}/deals/${dealId}/activities`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
};

export const investSyndicate = (dealId:any, payload: any, token: string) => {
  return axios.post(`${ENV.API_URL}/${ENV.API_VERSION}/deals/${dealId}/investments`, payload, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const sharewithGroup = (dealId: any, token: string) => {
  return axios.post(
    `${ENV.API_URL}/${ENV.API_VERSION}/deals/${dealId}/invites/syndicate_group`,
    { 
      invite_type:"Share"
    },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
};


export const postInviteSyn = ( dealId: any, token: string) => {
  return axios.post(
    `${ENV.API_URL}/${ENV.API_VERSION}/deals/${dealId}/invites`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
};
export const getSyndicates = (token: string) => {
  return axios.get(
    `${ENV.API_URL}/${ENV.API_VERSION}/syndicates/all`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
};

export const getNonAddedInvestors = (token: string) => {
  const queryParameters = new URLSearchParams();
  queryParameters.append("filter", "not_a_member");
  const apiUrl = `${ENV.API_URL}/${ENV.API_VERSION}/investors?${queryParameters.toString()}`;
  return axios.get(apiUrl, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const getInvitedSyndicates = (userId: any, token: string) => {
  return axios.get(
    `${ENV.API_URL}/${ENV.API_VERSION}/users/${userId}/invites`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
};

export const getSyndicateInformation = (stepId: number, token: string) => {
  return axios.get(`${ENV.API_URL}/${ENV.API_VERSION}/syndicates/${stepId}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};


export const postAddInvestor = (payload: any, currSyndID:any, token: string) => {
  return axios.post(
    `${ENV.API_URL}/${ENV.API_VERSION}/syndicates/${currSyndID}/syndicate_members`,
    payload,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
};

export const delRemoveInvestor = (currSyndID: any, investorID:any, token: string) => {
  return axios.delete(
    `${ENV.API_URL}/${ENV.API_VERSION}/syndicates/${currSyndID}/syndicate_members/${investorID}`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
};