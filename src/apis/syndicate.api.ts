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

export const getGroupInvestors = ( token:any, filters:any, searchQuery:string, currentPage:number) => {
  const queryParameters = new URLSearchParams();
  queryParameters.append("page", currentPage.toString());
  if (filters !== "all")
  queryParameters.append("role", filters.toLowerCase());
  if (searchQuery.trim() !== "") {
    queryParameters.append("search", searchQuery);
  }
  const apiUrl = `${ENV.API_URL}/${ENV.API_VERSION}/syndicate_members?${queryParameters.toString()}`;
  return axios.get(apiUrl, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};
export const putAcceptInvite = (inviteID:any ,token:any) => {
  const apiUrl = `${ENV.API_URL}/${ENV.API_VERSION}/invites/${inviteID}/syndicate_members/accept_invite`;
  return axios.put(apiUrl, 
    {
      id:0
    }, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};
export const putChangeMemberRole = (investorID:any , payload:any,  token :string) => {
  const apiUrl = `${ENV.API_URL}/${ENV.API_VERSION}/syndicate_members/${investorID}`;
  return axios.put(apiUrl, payload, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};
export const getInvitesSent = ( token:any, filters:any, searchQuery:string, currentPage:number) => {
  const queryParameters = new URLSearchParams();
  queryParameters.append("page", currentPage.toString());
  if (filters !== "all")
  if (searchQuery.trim() !== "") {
    queryParameters.append("search", searchQuery);
  }
  const apiUrl = `${ENV.API_URL}/${ENV.API_VERSION}/syndicate_members/invites?${queryParameters.toString()}`;
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

export const getSyndicatetoInvite = (dealId: any , searchQuery:string, token: string) => {
  const queryParameters = new URLSearchParams();
  if (searchQuery.trim() !== "") {
    queryParameters.append("search", searchQuery);
  }
  const apiUrl = `${ENV.API_URL}/${ENV.API_VERSION}/deals/${dealId}/syndicates?${queryParameters.toString()}`;
  return axios.get(
   apiUrl,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
};
export const getDealInvestors = (dealId: any, token: string, currentPage:number) => {
  const queryParameters = new URLSearchParams();
  queryParameters.append("page", currentPage.toString());
  const apiUrl = `${ENV.API_URL}/${ENV.API_VERSION}/deals/${dealId}/investments?${queryParameters.toString()}`;
  return axios.get(
    apiUrl,
    {
      headers: {  
        Authorization: `Bearer ${token}`,
      },
    }
  );
};


export const getDealActivity = (dealId: any, token: string, currentPage:number) => {
  const queryParameters = new URLSearchParams();
  queryParameters.append("page", currentPage.toString());
  const apiUrl = `${ENV.API_URL}/${ENV.API_VERSION}/deals/${dealId}/activities?${queryParameters.toString()}`;
  return axios.get(
    apiUrl,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
};
export const getDownloadDocument = (documentID: any, token: string) => {
  return axios.get(
    `${ENV.API_URL}/${ENV.API_VERSION}/attachments/${documentID}/download`,
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
export const getSyndicates = (token: string, searchQuery:string, currentPage:number, filters:any) => {
  const queryParameters = new URLSearchParams();
  queryParameters.append("page", currentPage.toString());
  if (filters !== "all"){
    queryParameters.append("status", filters.toLowerCase());
  }
  if (searchQuery.trim() !== "") {
    queryParameters.append("search", searchQuery);
  }
  const apiUrl = `${ENV.API_URL}/${ENV.API_VERSION}/syndicates/all?${queryParameters.toString()}`;
  return axios.get(
      apiUrl,    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
};
export const getAppliedSyndicates = (token: string, searchQuery:string, currentPage:number, filters:any) => {
  const queryParameters = new URLSearchParams();
  if (filters !== "all"){
    queryParameters.append("status", filters.toLowerCase());
  }
  queryParameters.append("page", currentPage.toString());
  queryParameters.append("pending_invite", "true");
  if (searchQuery.trim() !== "") {
    queryParameters.append("search", searchQuery);
  }
  const apiUrl = `${ENV.API_URL}/${ENV.API_VERSION}/syndicates/all?${queryParameters.toString()}`;
  return axios.get(
      apiUrl,    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
};

export const getNonAddedInvestors = (token: string, searchQuery:any, currentPage:number, filters:any) => {
  const queryParameters = new URLSearchParams();
  if (filters !== "all"){
    queryParameters.append("role", filters.toLowerCase());
  }
  queryParameters.append("page", currentPage.toString());
  if (searchQuery.trim() !== "") {
    queryParameters.append("search", searchQuery);
  }
  const apiUrl = `${ENV.API_URL}/${ENV.API_VERSION}/syndicate_members/investors?${queryParameters.toString()}`;
  return axios.get(apiUrl, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};
export const getInvitedGroupInvestors = (token: string, searchQuery:any) => {
  const queryParameters = new URLSearchParams();
  if (searchQuery.trim() !== "") {
    queryParameters.append("search", searchQuery);
  }
  const apiUrl = `${ENV.API_URL}/${ENV.API_VERSION}/syndicate_members/invites?${queryParameters.toString()}`;
  return axios.get(apiUrl, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const postInviteInvestor = (payload: any, investorID :any, token: string) => {
  return axios.post(`${ENV.API_URL}/${ENV.API_VERSION}/syndicates/${investorID}/invites`, payload, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};


export const getInvestorInfo = (token: string, investorID:any) => {
  return axios.get(`${ENV.API_URL}/${ENV.API_VERSION}/syndicate_members/${investorID}`, {
      headers: {
          Authorization: `Bearer ${token}`
      },
  });
};
export const getInvestorAllInfo = (token: string, investorID:any) => {
  return axios.get(`${ENV.API_URL}/${ENV.API_VERSION}/investors/${investorID}/details`, {
      headers: {
          Authorization: `Bearer ${token}`
      },
  });
};
export const getMemberInfo = (token: string, investorID:any) => {
  return axios.get(`${ENV.API_URL}/${ENV.API_VERSION}/syndicate_members/${investorID}`, {
      headers: {
          Authorization: `Bearer ${token}`
      },
  });
};
export const getApplicationInvestorInfo = (token: string, investorID:any) => {
  return axios.get(`${ENV.API_URL}/${ENV.API_VERSION}/invites/${investorID}`, {
      headers: {
          Authorization: `Bearer ${token}`
      },
  });
};


export const getInvitedSyndicates = (userId: any, searchQuery:string, token: string, currentPage:number) => {
  const queryParameters = new URLSearchParams();
  queryParameters.append("invite_type", "syndication");
  queryParameters.append("page", currentPage.toString());
  if (searchQuery.trim() !== "") {
    queryParameters.append("search", searchQuery);
  }
  const apiUrl = `${ENV.API_URL}/${ENV.API_VERSION}/users/${userId}/invites?${queryParameters.toString()}`;
  return axios.get(
    apiUrl,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
};
export const getInvitedInvestors = (userId: any, searchQuery:string, token: string) => {
  const queryParameters = new URLSearchParams();
  queryParameters.append("invite_type", "investment");

  if (searchQuery.trim() !== "") {
    queryParameters.append("search", searchQuery);
  }
  const apiUrl = `${ENV.API_URL}/${ENV.API_VERSION}/users/${userId}/invites?${queryParameters.toString()}`;
  return axios.get(
    apiUrl,
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
export const getApplications = (token: string, searchQuery:string) => {
  const queryParameters = new URLSearchParams();
  if (searchQuery.trim() !== "") {
    queryParameters.append("search", searchQuery);
  }
  const apiUrl = `${ENV.API_URL}/${ENV.API_VERSION}/syndicate_members/applications?${queryParameters.toString()}`
  return axios.get(apiUrl, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};


export const postApproveRequest = (payload: any, investorID :any, token: string) => {
  return axios.post(`${ENV.API_URL}/${ENV.API_VERSION}/invites/${investorID}/syndicate_groups`, payload, {
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