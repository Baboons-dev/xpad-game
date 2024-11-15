"use client";

import { useStore } from "@/store";
import { AllNftsResponse } from "@/types/type";
import { Spin } from "antd";
import axios from "axios";
import { useEffect, useState } from "react";
import NFTCard from "./NFTCard";

export default function MyNFTs() {
  const [myNfts, setMyNfts] = useState<AllNftsResponse | null>();
  const [loading, setLoading] = useState<boolean>(false);
  const user = useStore((state) => state.user);

  const fetchMyNfts = async () => {
    setLoading(true);
    try {
      const res = await axios.get<AllNftsResponse>(
        `https://api.layerx.baboons.tech/api/nfts/my-nfts/`,
      );
      res && setMyNfts(res?.data);
      setLoading(false);
    } catch (error: any) {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (user) {
      fetchMyNfts();
    }
  }, [user]);

  if (!user) {
    return (
      <div className="text-center py-8">
        <p className="text-white/60">Please connect your wallet to view your NFTs</p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {loading ? (
        <div className="flex items-center justify-center w-full min-h-[200px]">
          <Spin />
        </div>
      ) : myNfts?.data?.length ? (
        myNfts.data.map((nft) => <NFTCard key={nft.id} nft={nft} />)
      ) : (
        <div className="text-center py-8">
          <p className="text-white/60">You don't have any NFTs yet</p>
        </div>
      )}
    </div>
  );
}