import { useStore } from "@/store";
import { VoteToCompetition, VoteToCompetitionResponse } from "@/types/type";
import axios from "axios";

const SERVER_URL =
  process.env.REACT_APP_API_HOST || "https://api.layerx.baboons.tech";
// const accessToken = useStore((state) => state.accessToken);

// const accessToken =
//   "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ1c2VyX2lkIjoxMDQsIndhbGxldF9hZGRyZXNzIjpudWxsLCJlbWFpbCI6IiIsImV4cCI6MTc2MzE0OTI2MX0.LXWQMv8IsjMyVe-Ld26qYX0rb5IgEuwg4jSh97-8xvs";

const accessToken = localStorage.getItem("token");

export const addVoteToCompetingNfts = async (
  id: number,
  data: VoteToCompetition,
  //   accessToken: string,
): Promise<VoteToCompetitionResponse> => {
  try {
    const endPoint = `${SERVER_URL}/api/nfts/competition/${id}/vote/`;
    const res = await axios.post(endPoint, data, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
    });
    if (!res?.data)
      throw "Something went wrong while adding NFT to competition";
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
    const endPoint = `${SERVER_URL}/api/nfts/competitions/${id}`;
    const res = await axios.get(endPoint, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
    });
    if (!res?.data) throw "Something went wrong GetUser";
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
    const endPoint = `${SERVER_URL}/api/nfts/competition/${id}/unvote/`;
    const res = await axios.post(endPoint, data, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
    });
    if (!res?.data)
      throw "Something went wrong while adding NFT to competition";
    return res.data;
  } catch (err) {
    return Promise.reject(err);
  }
};
