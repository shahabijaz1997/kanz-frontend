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

export const getStartupDeals = (token: string, filters : any, searchQuery:string, currentPage:number) => {
  const queryParameters = new URLSearchParams();
  queryParameters.append("deal_type", "startup");
  queryParameters.append("page", currentPage.toString());
  if (filters !== "all"){
    queryParameters.append("status", filters.toLowerCase());
  }
  if (searchQuery.trim() !== "") {
    queryParameters.append("search", searchQuery);
  }
  const apiUrl = `${ENV.API_URL}/${ENV.API_VERSION}/deals?${queryParameters.toString()}`;
  return axios.get(apiUrl, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};
export const getPropertyDeals = (token: string, filters : any, searchQuery:string, currentPage:number) => {
  const queryParameters = new URLSearchParams();
  queryParameters.append("page", currentPage.toString());
  queryParameters.append("deal_type", "property");
  if (filters !== "all"){
    queryParameters.append("status", filters.toLowerCase());
  }
  if (searchQuery.trim() !== "") {
    queryParameters.append("search", searchQuery);
  }
  const apiUrl = `${ENV.API_URL}/${ENV.API_VERSION}/deals?${queryParameters.toString()}`;
  return axios.get(apiUrl, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};
 
export const getDealsforsyndicate = (token: string, filters:any, searchQuery:any, currentPage:number ) => {

  const queryParameters = new URLSearchParams();
  queryParameters.append("page", currentPage.toString());
  if (filters !== "all"){
    queryParameters.append("deal_type", filters.toLowerCase());
  }
  if (searchQuery.trim() !== "") {
    queryParameters.append("search", searchQuery);
  }
  const apiUrl = `${ENV.API_URL}/${ENV.API_VERSION}/syndicates/deals?${queryParameters.toString()}`;
  return axios.get(apiUrl, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });



};

export const getInvitedDeals = (inviteeId: any, token: any, filters: any, searchQuery: string, currentPage:number) => {
  const queryParameters = new URLSearchParams();
  queryParameters.append("page", currentPage.toString());
  if (filters !== "all") {
    queryParameters.append("status", filters.toLowerCase());
  }
  if (searchQuery.trim() !== "") {
    queryParameters.append("search", searchQuery);
  }
  const apiUrl = `${ENV.API_URL}/${ENV.API_VERSION}/invitees/${inviteeId}/invites?${queryParameters.toString()}`;
  return axios.get(apiUrl, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};


export const getLiveDeals = ( token:any, filters:any, searchQuery:string, currentPage:number) => {
  const queryParameters = new URLSearchParams();
  console.log(filters)
  queryParameters.append("page", currentPage.toString());
  if (filters !== "all"){
  queryParameters.append("deal_type", filters.toLowerCase());
  }
  if (searchQuery.trim() !== "") {
    queryParameters.append("search", searchQuery);
  }
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
export const getFundraiserInvestors = (token: string, currentPage:number, searchQuery:string) => {
  const queryParameters = new URLSearchParams();
  if (searchQuery.trim() !== "") {
    queryParameters.append("search", searchQuery);
  }
  queryParameters.append("page", currentPage.toString());
  const apiUrl = `${ENV.API_URL}/${ENV.API_VERSION}/fund_raisers/investors?${queryParameters.toString()}`;
  return axios.get(apiUrl, {
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
export const getInterestedDealSyndicates = (dealId: number, token: string, currentPage:number) => {
  const queryParameters = new URLSearchParams();
  queryParameters.append("page", currentPage.toString());
  queryParameters.append("status", "interested");
  const apiUrl = `${ENV.API_URL}/${ENV.API_VERSION}/deals/${dealId}/invites?${queryParameters.toString()}`;
  return axios.get(
    apiUrl,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
};
export const getInvitedDealSyndicates = (dealId: number, token: string, currentPage:number) => {
  const queryParameters = new URLSearchParams();
  queryParameters.append("page", currentPage.toString());
  const apiUrl = `${ENV.API_URL}/${ENV.API_VERSION}/deals/${dealId}/invites?${queryParameters.toString()}`;
  return axios.get(
    apiUrl,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
};
export const getSharedInvestors = (dealId: number, token: string, currentPage:number) => {
  const queryParameters = new URLSearchParams();
  queryParameters.append("page", currentPage.toString());
  queryParameters.append("invite_type", "investment");
  const apiUrl = `${ENV.API_URL}/${ENV.API_VERSION}/deals/${dealId}/invites?${queryParameters.toString()}`;
  return axios.get(
    apiUrl,
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
  token: string,
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
