import { AllNftsResponse, HistoryResponse } from "@/types/type";
import { axios } from "..";
export const userLoginWallet = async (payload: {
  wallet_address: string;
  challenge: string;
  signature: string;
}): Promise<any> => {
  try {
    const endPoint = "/api/user/login_wallet/";
    const res = await axios.post<any>(endPoint, payload);
    if (!res?.data) throw "Something went wrong";
    return res.data;
  } catch (err) {
    console.log("error post wallet", err);
    return Promise.reject(err);
  }
};
export const getSignature = async (
  wallet_address: string | undefined,
): Promise<any> => {
  try {
    const endPoint = `/api/user/signature/?wallet_address=${wallet_address}`;
    const res = await axios.get(endPoint);
    return res.data;
  } catch (err) {
    console.log("error get signature", err);
    return Promise.reject(err);
  }
};

export const GetUser = async (): Promise<any> => {
  try {
    const endPoint = "/api/current/";
    const res = await axios.get<any>(endPoint);
    if (!res?.data) throw "Something went wrong GetUser";
    // console.log('GetUser>>', res.data);
    return res.data;
  } catch (err) {
    console.log("error get user", err);
    return Promise.reject(err);
  }
};

export const twitterLogin = async (tgId: string, tId: string): Promise<any> => {
  try {
    const endPoint = "/api/user/telegram/?tgId=" + tgId + "&tId=" + tId;
    const res = await axios.get<any>(endPoint);
    if (!res?.data) throw "Something went wrong GetUser";
    // console.log('GetUser>>', res.data);
    return res.data;
  } catch (err) {
    console.log("error get user", err);
    return Promise.reject(err);
  }
};
export const twitterSave = async (payload: any): Promise<any> => {
  try {
    const endPoint = "/api/user/telegram/";
    const res = await axios.post<any>(endPoint, payload);
    return res;
  } catch (err) {
    console.log("error get user", err);
    return Promise.reject(err);
  }
};

export const GetClients = async (): Promise<any> => {
  try {
    const endPoint = "/api/client/";
    const res = await axios.get<any>(endPoint);
    if (!res?.data) throw "Something went wrong GetInit";
    // console.log('GetUser>>', res.data);
    return res.data;
  } catch (err) {
    console.log("error get GetInit", err);
    return Promise.reject(err);
  }
};
export const GetSingleClient = async (id: string): Promise<any> => {
  try {
    const endPoint = "/api/client/?id=" + id;
    const res = await axios.get<any>(endPoint);
    if (!res?.data) throw "Something went wrong GetInit";
    // console.log('GetUser>>', res.data);
    return res.data;
  } catch (err) {
    console.log("error get GetInit", err);
    return Promise.reject(err);
  }
};
export const extensionLogin = async (auth: string): Promise<any> => {
  try {
    const endPoint = "/api/extension/";
    const res = await axios.post<any>(endPoint, { auth: auth });
    if (!res?.data) throw "Something went wrong GetUser";
    // console.log('GetUser>>', res.data);
    return res;
  } catch (err) {
    console.log("error get user", err);
    return Promise.reject(err);
  }
};
export const sendFund = async (
  client: string,
  hash: string,
  chainId: string | number,
  amount: string | number,
): Promise<any> => {
  try {
    const endPoint = "/api/funds/" + client + "/";
    const res = await axios.post<any>(endPoint, {
      hash: hash,
      chainId: chainId,
      amount: amount,
    });
    if (!res?.data) throw "Something went wrong GetUser";
    // console.log('GetUser>>', res.data);
    return res;
  } catch (err) {
    console.log("error get user", err);
    return Promise.reject(err);
  }
};
export const patchFund = async (client: string, hash: string): Promise<any> => {
  try {
    const endPoint = "/api/funds/" + client + "/";
    const res = await axios.patch<any>(endPoint, { hash: hash });
    if (!res?.data) throw "Something went wrong GetUser";
    // console.log('GetUser>>', res.data);
    return res;
  } catch (err) {
    console.log("error get user", err);
    return Promise.reject(err);
  }
};

export const getAllNfts = async (
  page: number,
  recordsPerPage: number,
): Promise<AllNftsResponse> => {
  try {
    const endPoint = `https://api.layerx.baboons.tech/api/nfts/?page=${page}&per_page=${recordsPerPage}`;
    const res = await axios.get(endPoint);
    if (!res?.data) throw "Something went wrong GetUser";
    return res.data;
  } catch (err) {
    return Promise.reject(err);
  }
};

export const getMyHistory = async (
  page: number,
  recordsPerPage: number,
): Promise<HistoryResponse> => {
  try {
    const endPoint = `https://api.layerx.baboons.tech/api/user/xp-history/?page=${page}&per_page=${recordsPerPage}`;
    const res = await axios.get(endPoint);
    console.log("historyyy", res);
    if (!res?.data) throw "Something went wrong History";
    return res.data;
  } catch (err) {
    return Promise.reject(err);
  }
};
