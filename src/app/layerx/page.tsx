"use client";

import { Heart, Share2 } from "lucide-react";
import axios from "axios";
import { Avatar, Badge, Spin } from "antd";
import { useEffect, useState } from "react";
import { AllNftsResponse, AllNftsResponseData } from "@/types/type";
import { getAllNfts } from "@/api/apiCalls/user";

interface NftCardProps {
  nft: AllNftsResponseData;
}

function NFTCard(props: NftCardProps) {
  const { nft } = props;
  return (
    <div className="overflow-hidden bg-card border-border hover:border-brand-lime/50 transition-colors">
      <div className="aspect-square relative overflow-hidden">
        <img
          src={nft.image_url}
          // alt={nft.title}
          className="object-cover w-full h-full hover:scale-110 transition-transform duration-300"
        />
        <Badge className="absolute top-4 right-4 bg-background/80 backdrop-blur-sm text-brand-lime border-brand-lime">
          Ethereum
          {/* {nft.network} */}
        </Badge>
      </div>
      <div className="p-4">
        <div className="flex items-center justify-between mb-3">
          <h3 className="font-semibold text-lg text-brand-white truncate">
            {nft?.name}
          </h3>
          <span className="text-brand-lime font-medium shrink-0 ml-2">
            {/* price */}
            {/* {nft.price} */}
          </span>
        </div>
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2 min-w-0">
            <Avatar
              className="h-8 w-8 shrink-0"
              src={nft.owner.profile_picture}
            ></Avatar>
            <span className="text-sm text-muted truncate">
              {nft.owner?.twitter_username}
            </span>
          </div>
          <div className="flex items-center space-x-3 shrink-0 ml-2">
            <button className="text-muted hover:text-brand-lime transition-colors">
              <Heart className="h-5 w-5" />
            </button>
            <button className="text-muted hover:text-brand-lime transition-colors">
              <Share2 className="h-5 w-5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function LayerXPage() {
  const [allNfts, setAllNfts] = useState<AllNftsResponse | null>();

  const [loading, setLoading] = useState<boolean>(false);

  const fetchAllNfts = async (page: number, recordsPerPage: number) => {
    setLoading(true);
    try {
      const res = await axios.get<AllNftsResponse>(
        `https://api.layerx.baboons.tech/api/nfts/?page=${page}&per_page=${recordsPerPage}`,
      );
      res && setAllNfts(res?.data);
      setLoading(false);
    } catch (error: any) {
      setLoading(false);
      console.log("error", error);
    }
  };

  useEffect(() => {
    fetchAllNfts(1, 9);
  }, []);

  useEffect(() => {
    console.log("allNfts", allNfts);
  }, [allNfts]);

  return (
    <main className="min-h-screen bg-background p-4 sm:p-6">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-8 sm:mb-12">
          <h1 className="text-3xl sm:text-4xl font-bold mb-3 sm:mb-4 text-brand-lime">
            Featured NFTs
          </h1>
          <p className="text-muted max-w-2xl mx-auto text-sm sm:text-base">
            Discover unique digital assets created by talented artists across
            multiple networks
          </p>
        </div>

        {loading ? (
          <div className="flex items-center justify-center w-full">
            <Spin />
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 sm:gap-6">
            {allNfts &&
              allNfts.data?.length > 0 &&
              allNfts.data.map((nft) => <NFTCard key={nft.id} nft={nft} />)}
          </div>
        )}
      </div>
    </main>
  );
}
