import {
  AddNftToCompetitionResponse,
  VoteToCompetition,
  VoteToCompetitionResponse,
} from '@/types/type';
import axios from 'axios';

const SERVER_URL =
  process.env.REACT_APP_API_HOST || 'https://api.layerx.baboons.tech';

const accessToken =
  localStorage.getItem('token') ??
  'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ1c2VyX2lkIjo1LCJ3YWxsZXRfYWRkcmVzcyI6IjB4Nzg2ODkzM2EzNkZiNzc3MWY1ZDg3YzY1ODU3RjYzQzkyNjRkMjhhNCIsImV4cCI6MTc2MTU2NDMzOH0.BAPtuO7RVVUVDKAzG7WBi6NybfF2MtmtOCLakF8DCNQ';

export const addVoteToCompetingNfts = async (
  id: number,
  data: VoteToCompetition,
  //   accessToken: string,
): Promise<VoteToCompetitionResponse> => {
  try {
    // const accessToken =
    //   typeof window !== "undefined"
    //     ? localStorage.getItem("layerXToken")
    //     : null;

    // if (!accessToken) {
    //   throw new Error("Access token is not available");
    // }
    const endPoint = `${SERVER_URL}/api/nfts/competition/${id}/vote/`;
    const res = await axios.post(endPoint, data, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${accessToken}`,
      },
    });
    if (!res?.data)
      throw 'Something went wrong while adding NFT to competition';
    return res.data;
  } catch (err) {
    return Promise.reject(err);
  }
};

export const getCompetitionDetails = async (
  id: number,
  //   accessToken: string,
): Promise<any> => {
  try {
    // const accessToken =
    //   typeof window !== "undefined"
    //     ? localStorage.getItem("layerXToken")
    //     : null;

    // if (!accessToken) {
    //   throw new Error("Access token is not available");
    // }
    const endPoint = `${SERVER_URL}/api/nfts/competitions/${id}`;
    const res = await axios.get(endPoint, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${accessToken}`,
      },
    });
    if (!res?.data) throw 'Something went wrong GetUser';
    return res.data;
  } catch (err) {
    return Promise.reject(err);
  }
};

export const removeVoteFromCompetingNfts = async (
  id: number,
  data: VoteToCompetition,
  //   accessToken: string,
): Promise<VoteToCompetitionResponse> => {
  try {
    // const accessToken =
    //   typeof window !== "undefined"
    //     ? localStorage.getItem("layerXToken")
    //     : null;

    // if (!accessToken) {
    //   throw new Error("Access token is not available");
    // }
    const endPoint = `${SERVER_URL}/api/nfts/competition/${id}/unvote/`;
    const res = await axios.post(endPoint, data, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${accessToken}`,
      },
    });
    if (!res?.data)
      throw 'Something went wrong while adding NFT to competition';
    return res.data;
  } catch (err) {
    return Promise.reject(err);
  }
};

export const twitterSaveLayerX = async (payload: any): Promise<any> => {
  try {
    const endPoint = `${SERVER_URL}/api/user/twitter-login/`;
    const res = await axios.post<any>(endPoint, payload);
    return res.data;
  } catch (err) {
    return Promise.reject(err);
  }
};

export const fetchMyNfts = async (
  page: number,
  take: number,
  walletAddress: string,
): Promise<any> => {
  try {
    const endPoint = `${SERVER_URL}/api/nfts/?page=${page}&per_page=${take}`;
    const res = await axios.get(endPoint, {
      params: {
        address: walletAddress,
      },
    });

    return res.data;
  } catch (err) {
    return Promise.reject(err);
  }
};

export const addNftToCompetition = async (
  competitionId: number,
  nftId: string,
): Promise<AddNftToCompetitionResponse> => {
  try {
    const endPoint = `${SERVER_URL}/api/nfts/competitions/${competitionId}/add-nft/`;
    const res = await axios.post(
      endPoint,
      { token_id: nftId },
      {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${accessToken}`,
        },
      },
    );
    if (!res?.data)
      throw 'Something went wrong while adding NFT to competition';
    return res.data;
  } catch (err) {
    return Promise.reject(err);
  }
};
