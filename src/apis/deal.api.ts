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

export const getDeals = (token: string) => {
  return axios.get(`${ENV.API_URL}/${ENV.API_VERSION}/deals`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const getInvitedDeals = (inviteeId: any, token: string) => {
  console.log(getInvitedDeals);
  return axios.get(
    `${ENV.API_URL}/${ENV.API_VERSION}/invitees/${inviteeId}/invites`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
};

export const getDealDetail = (dealId: number, token: string) => {
  return axios.get(
    `${ENV.API_URL}/${ENV.API_VERSION}/deals/${dealId}/overview`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
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
export const signOff = (dealId: number, token: string) => {
  return axios.post(
    `${ENV.API_URL}/${ENV.API_VERSION}/deals/${dealId}/sign_off`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
};
