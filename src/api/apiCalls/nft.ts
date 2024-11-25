import axios from '../layerxClient';

export const addTweetScreenShot = async (data: { tweet_url: string }) => {
  try {
    const endPoint = `/api/tweets/screenshot/`;
    const res = await axios.post<TweetScreenshotPayload>(endPoint, data, {
      headers: {
        'Content-Type': 'application/json',
      },
    });
    if (!res?.data) throw new Error('Something went wrong');
    return res.data;
  } catch (err: any) {
    console.error('Error:', err.response ? err.response.data : err.message);
    return Promise.reject(err);
  }
};
// {
//     "url": "/media/tweet_39617a1e-80e1-416c-816e-f0bc78026e10.png",
//     "image_cid": "bafybeigjwh4di5hq5zrggaevsb2mfksvl2qnpv6e4t6kqhqybltxsfbaeu",
//     "json_cid": "bafkreiambifodhzmh6mzvcotjvqwlepx3p7vbqj66sjc63yga3d4bou5oq"
// }

export const getAllNfts = async (
  page: number,
  recordsPerPage: number
): Promise<AllNftsResponse> => {
  try {
    const endPoint = `/api/nfts/?page=${page}&per_page=${recordsPerPage}`;
    const res = await axios.get(endPoint, {
      params: { collection: 'mytoken-10277' },
    });
    if (!res?.data) throw 'Something went wrong GetUser';
    return res.data;
  } catch (err) {
    return Promise.reject(err);
  }
};

export const getMyNfts = async (
  page: number,
  recordsPerPage: number,
  walletAddress: string
): Promise<AllNftsResponse> => {
  try {
    const endPoint = `/api/nfts/?page=${page}&per_page=${recordsPerPage}`;
    const res = await axios.get(endPoint, {
      params: { address: walletAddress },
    });
    if (!res?.data) throw 'Something went wrong GetUser';
    return res.data;
  } catch (err) {
    return Promise.reject(err);
  }
};

export const getMyFavoriteNfts = async (
  walletAddress: string,
  page: number,
  recordsPerPage: number
): Promise<AllFavNftsResponse> => {
  try {
    const endPoint = `/api/nfts/favorites/?wallet_address=${walletAddress}/?page=${page}&per_page=${recordsPerPage}`;
    const res = await axios.get(endPoint);
    return res.data;
  } catch (err) {
    return Promise.reject(err);
  }
};

export const getNftDetails = async (tokenId: string): Promise<NftDetailsType> => {
  try {
    const endPoint = `/api/nfts/details`;
    const res = await axios.get(endPoint, {
      params: {
        // address: walletAddress,
        token_id: tokenId,
      },
    });
    if (!res?.data) throw 'Something went wrong GetUser';
    return res.data;
  } catch (err) {
    return Promise.reject(err);
  }
};

export const saveNFT = async (transactionHash: `0x${string}`) => {
  try {
    const endPoint = `/api/nfts/save-nft/`;
    const res = await axios.post<saveNFTResponse>(
      endPoint,
      { transactionHash },
      {
        headers: {
          'Content-Type': 'application/json',
        },
      }
    );
    if (!res?.data) throw new Error('Something went wrong');
    return res.data;
  } catch (err: any) {
    console.error('Error:', err.response ? err.response.data : err.message);
    return Promise.reject(err);
  }
};

export const getLeaderBoardData = async (competitionId: number) => {
  try {
    const endPoint = `/api/nfts/competition/leaderboard/`;
    const res = await axios.get(endPoint, {
      params: {
        competition_id: competitionId,
      },
    });
    if (!res?.data) throw 'Something went wrong GetUser';
    return res.data;
  } catch (err) {
    return Promise.reject(err);
  }
};
