import {
  AddNftToCompetitionResponse,
  VoteToCompetition,
  VoteToCompetitionResponse,
} from '@/types/type';
import axios from '../layerxClient';

export const addVoteToCompetingNfts = async (
  id: number,
  data: VoteToCompetition
): Promise<VoteToCompetitionResponse> => {
  try {
    const endPoint = `/api/nfts/competition/${id}/vote/`;
    const res = await axios.post(endPoint, data);
    if (!res?.data) throw 'Something went wrong while adding NFT to competition';
    return res.data;
  } catch (err) {
    return Promise.reject(err);
  }
};

export const getCompetitionDetails = async (id: number): Promise<any> => {
  try {
    const endPoint = `/api/nfts/competitions/${id}`;
    const res = await axios.get(endPoint);
    if (!res?.data) throw 'Something went wrong GetUser';
    return res.data;
  } catch (err) {
    return Promise.reject(err);
  }
};

export const removeVoteFromCompetingNfts = async (
  id: number,
  data: VoteToCompetition
): Promise<VoteToCompetitionResponse> => {
  try {
    const endPoint = `/api/nfts/competition/${id}/unvote/`;
    const res = await axios.post(endPoint, data);
    if (!res?.data) throw 'Something went wrong while adding NFT to competition';
    return res.data;
  } catch (err) {
    return Promise.reject(err);
  }
};

export const twitterSaveLayerX = async (payload: any): Promise<any> => {
  try {
    const endPoint = `/api/user/twitter-login/`;
    const res = await axios.post<any>(endPoint, payload);
    return res.data;
  } catch (err) {
    return Promise.reject(err);
  }
};

export const fetchMyNfts = async (
  page: number,
  take: number,
  walletAddress: string
): Promise<any> => {
  try {
    const endPoint = `/api/nfts/?page=${page}&per_page=${take}`;
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
  nftId: string
): Promise<AddNftToCompetitionResponse> => {
  try {
    const endPoint = `/api/nfts/competitions/${competitionId}/add-nft/`;

    const token = localStorage.getItem('token');
    const res = await axios.post(
      endPoint,
      { token_id: nftId },
      {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      }
    );
    if (!res?.data) throw 'Something went wrong while adding NFT to competition';
    return res.data;
  } catch (err) {
    return Promise.reject(err);
  }
};
