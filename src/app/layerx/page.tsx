"use client";

import { Heart, Share2 } from "lucide-react";
import axios from "axios";
import { Avatar, Spin } from "antd";
import { useEffect, useState } from "react";
import { AllNftsResponse, AllNftsResponseData } from "@/types/type";
import { Box, Image, Text } from "@chakra-ui/react";
import backgroundImage from "../../assets/background.png";

interface NftCardProps {
  nft: AllNftsResponseData;
}

function NFTCard({ nft }: NftCardProps) {
  return (
    <div className="bg-black border border-[#33A7FF]/10 rounded-xl overflow-hidden">
      {/* Tweet Image Container */}
      <div className="aspect-square w-full bg-black">
        <div className="w-full h-full flex items-center justify-center bg-black">
          <img
            src={nft.image_url}
            className="w-full h-full object-contain"
            alt={nft.name}
            loading="lazy"
          />
        </div>
      </div>

      {/* Card Footer */}
      <div className="p-4 border-t border-[#33A7FF]/10 bg-black">
        <div className="flex items-center justify-between">
          {/* User Info */}
          <div className="flex items-center space-x-2">
            <Avatar
              src={nft.owner.profile_picture}
              className="h-8 w-8 ring-1 ring-[#33A7FF]/20"
            />
            <div className="flex flex-col">
              <span className="text-sm font-medium text-white">
                {nft.name}
              </span>
              <span className="text-xs text-[#33A7FF]">
                @{nft.owner.twitter_username}
              </span>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex items-center space-x-4">
            <button className="text-white/60 hover:text-[#33A7FF] transition-colors">
              <Heart className="h-5 w-5" />
            </button>
            <button className="text-white/60 hover:text-[#33A7FF] transition-colors">
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
    }
  };

  useEffect(() => {
    fetchAllNfts(1, 9);
  }, []);

  return (
    <Box w="100%" display="flex" flexDirection="column" minHeight="100vh">

      <Box position="relative" w="100%" zIndex={0}>
        <Image
          src={backgroundImage.src}
          h="auto"
          objectFit="contain"
          position="absolute"
        />
        <Box position="relative" margin="36px 16px 36px 16px">
          <Box
            display="flex"
            justifyContent="center"
            alignItems="center"
            flexDirection="column"
          >
            <Text
              color="#33A7FF"
              fontSize="32px"
              fontStyle="normal"
              fontWeight="800"
              lineHeight="normal"
              fontFamily="Plus Jakarta Sans"
            >
              LayerX NFTs
            </Text>
          </Box>
        </Box>
        <Box margin="0px 16px 24px 16px" position="relative">
          {loading ? (
            <div className="flex items-center justify-center w-full min-h-[200px]">
              <Spin />
            </div>
          ) : (
            <div className="space-y-4">
              {allNfts &&
                allNfts.data?.length > 0 &&
                allNfts.data.map((nft) => (
                  <NFTCard key={nft.id} nft={nft} />
                ))}
            </div>
          )}
        </Box>
      </Box>
    </Box>
  );
}