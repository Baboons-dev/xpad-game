import {
  AddNftToCompetitionResponse,
  PostCompetitionCommentPayload,
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

export const addNftToFavorite = async (nftId: string) => {
  try {
    const endPoint = `api/nfts/${nftId}/like/`;
    const res = await axios.post<any>(endPoint);
    if (!res?.data) throw new Error('Something went wrong');
    return res.data;
  } catch (err: any) {
    console.error('Error:', err.response ? err.response.data : err.message);
    return Promise.reject(err);
  }
};

export const getNftDetails = async (tokenId: string): Promise<NftDetailsType> => {
  try {
    const endPoint = `/api/nfts/details`;
    const res = await axios.get(endPoint, {
      params: {
        token_id: tokenId,
      },
    });
    if (!res?.data) throw 'Something went wrong GetUser';
    return res.data;
  } catch (err) {
    return Promise.reject(err);
  }
};

export const addCompetitionComments = async (
  id: number,
  data: PostCompetitionCommentPayload
): Promise<any> => {
  try {
    const endPoint = `/api/nfts/competition/${id}/comments/`;
    const res = await axios.post(endPoint, data, {
      headers: {
        'Content-Type': 'application/json',
      },
    });
    if (!res?.data) throw 'Something went wrong while adding NFT to competition';
    return res.data;
  } catch (err) {
    return Promise.reject(err);
  }
};

export const getCompetitionComments = async (id: number): Promise<any> => {
  try {
    const endPoint = `/api/nfts/competition/${id}/comments`;
    const res = await axios.get(endPoint);
    if (!res?.data) throw 'Something went wrong GetUser';
    return res.data;
  } catch (err) {
    return Promise.reject(err);
  }
};

export const updateCompetitionComment = async (
  commentId: number,
  comment: string,
  selectedCompetitionId: number
): Promise<any> => {
  try {
    const endPoint = `/api/nfts/competition/comment/${commentId}/`;
    const res = await axios.put(
      endPoint,
      { comment: comment, competition: selectedCompetitionId },
      {
        headers: {
          'Content-Type': 'application/json',
        },
      }
    );
    if (!res?.data) throw 'Something went wrong while adding NFT to competition';
    return res.data;
  } catch (err) {
    return Promise.reject(err);
  }
};

export const deleteCompetitionComment = async (commentId: string): Promise<any> => {
  try {
    const endPoint = `/api/nfts/competition/comment/${commentId}/`;
    const res = await axios.delete(endPoint);
    return res.data;
  } catch (err) {
    return Promise.reject(err);
  }
};
