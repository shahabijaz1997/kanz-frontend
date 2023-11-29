import axios from "axios";
import { getEnv } from "../env";

const ENV = getEnv();

export const getDealQuestion = (params: any, token: string) => {
  return axios.get(`${ENV.API_URL}/${ENV.API_VERSION}/settings/stepper`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
    params,
  });
};

export const getDeals = (token: string, filters : any) => {
  const queryParameters = new URLSearchParams();
  if (filters !== "All"){
    queryParameters.append("status", filters.toLowerCase());
  }
  const apiUrl = `${ENV.API_URL}/${ENV.API_VERSION}/deals?${queryParameters.toString()}`;
  return axios.get(apiUrl, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};
export const getNoFilterDeals = (token: string) => {
  const queryParameters = new URLSearchParams();
  return axios.get(`${ENV.API_URL}/${ENV.API_VERSION}/deals`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};
export const getDealsforsyndicate = (token: string, filters:any ) => {

  const queryParameters = new URLSearchParams();
  if (filters !== "All"){
    queryParameters.append("deal_type", filters.toLowerCase());
  }
  const apiUrl = `${ENV.API_URL}/${ENV.API_VERSION}/syndicates/deals?${queryParameters.toString()}`;
  return axios.get(apiUrl, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });



};

export const getInvitedDeals = (inviteeId:any, token:any, filters:any) => {
  const queryParameters = new URLSearchParams();
  if (filters !== "All")
  queryParameters.append("status", filters.toLowerCase());
  const apiUrl = `${ENV.API_URL}/${ENV.API_VERSION}/invitees/${inviteeId}/invites?${queryParameters.toString()}`;
  return axios.get(apiUrl, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};


export const getLiveDeals = (inviteeId:any, token:any, filters:any) => {
  const queryParameters = new URLSearchParams();
  if (filters !== "All")
  queryParameters.append("deal_type", filters.toLowerCase());
  const apiUrl = `${ENV.API_URL}/${ENV.API_VERSION}/syndicates/deals?status=live&${queryParameters.toString()}`;
  return axios.get(apiUrl, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const getDealDetail = (dealToken: string, token: string) => {
  return axios.get(`${ENV.API_URL}/${ENV.API_VERSION}/deals/${dealToken}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const getDealDocuments = (dealId: number, token: string) => {
  return axios.get(
    `${ENV.API_URL}/${ENV.API_VERSION}/deals/${dealId}/documents`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
};
export const getDealSyndicates = (dealId: number, token: string) => {
  return axios.get(
    `${ENV.API_URL}/${ENV.API_VERSION}/deals/${dealId}/invites`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
};
export const getSellingPoints = (dealId: number, token: string) => {
  return axios.get(
    `${ENV.API_URL}/${ENV.API_VERSION}/deals/${dealId}//unique_selling_points`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
};

export const getViewDealSyndicates = (
  dealId: number,
  syndicateId: number,
  token: string
) => {
  return axios.get(
    `${ENV.API_URL}/${ENV.API_VERSION}/deals/${dealId}/syndicates/${syndicateId}`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
};

export const postDealStep = (payload: any, token: string) => {
  return axios.post(`${ENV.API_URL}/${ENV.API_VERSION}/deals`, payload, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};
export const postInviteSyn = (payload: any, dealId: any, token: string) => {
  return axios.post(
    `${ENV.API_URL}/${ENV.API_VERSION}/deals/${dealId}/invites`,
    payload,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
};

export const onReviewDeal = (dealId: number, params: any, token: string) => {
  return axios.get(`${ENV.API_URL}/${ENV.API_VERSION}/deals/${dealId}/review`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
    params,
  });
};

export const submitDeal = (dealId: number, token: string) => {
  return axios.post(
    `${ENV.API_URL}/${ENV.API_VERSION}/deals/${dealId}/submit`,
    {},
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
};

export const addCommentOnDeal = (
  dealId: number,
  token: string,
  payload: any
) => {
  return axios.post(
    `${ENV.API_URL}/${ENV.API_VERSION}/deals/${dealId}/comments`,
    payload,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
};
export const signOff = (emptyObj: any, dealId: number, token: string) => {
  return axios.post(
    `${ENV.API_URL}/${ENV.API_VERSION}/deals/${dealId}/sign_off`,
    emptyObj,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
};

export const syndicateApprove = (
  payload: any,
  dealId: number,
  id: number,
  token: string
) => {
  return axios.put(
    `${ENV.API_URL}/${ENV.API_VERSION}/deals/${dealId}/invites/${id}`,
    payload,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
};
export const requestSyndication = (
  payload: any,
  dealId: number,
  token: string
) => {
  return axios.post(
    `${ENV.API_URL}/${ENV.API_VERSION}/deals/${dealId}/invites/request_syndication`,
    payload,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
};
